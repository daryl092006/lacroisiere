import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

function generateBookingReference() {
    const year = new Date().getFullYear();
    const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RES-${year}-${randomString}`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { apartment_slug, arrival, departure, adults, children, customer, specialRequests } = body;

        if (!apartment_slug || !arrival || !departure || !customer?.firstName || !customer?.email) {
            return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
        }

        // 1. Fetch apartment info
        const { data: aptData, error: aptError } = await supabase
            .from('apartments')
            .select('id, base_price, name')
            .eq('slug', apartment_slug)
            .single();

        if (aptError || !aptData) {
            return NextResponse.json({ error: 'Appartement introuvable.' }, { status: 404 });
        }

        // 2. Check Availability
        const { data: isAvailable, error: availError } = await supabase.rpc('check_apartment_availability', {
            p_apartment_id: aptData.id,
            p_check_in: arrival.split('T')[0],
            p_check_out: departure.split('T')[0]
        });

        if (availError || !isAvailable) {
            return NextResponse.json({ error: 'L\'appartement n\'est plus disponible pour ces dates.' }, { status: 400 });
        }

        // 3. Pricing Calculation
        const checkIn = new Date(arrival);
        const checkOut = new Date(departure);
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const total_nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (total_nights <= 0) {
            return NextResponse.json({ error: 'Les dates sont invalides.' }, { status: 400 });
        }

        const base_price_per_night = aptData.base_price || 0;
        const subtotal = total_nights * base_price_per_night;
        const total_amount = subtotal; // Pas de taxes ou frais supplémentaires pour le moment
        const reference = generateBookingReference();

        // 4. Create or update Customer
        let customerId;
        const { data: existingCustomer } = await supabase
            .from('customers')
            .select('id')
            .eq('email', customer.email)
            .single();

        if (existingCustomer) {
            customerId = existingCustomer.id;
        } else {
            const { data: newCustomer, error: customerError } = await supabase
                .from('customers')
                .insert({
                    first_name: customer.firstName,
                    last_name: customer.lastName,
                    email: customer.email,
                    phone: customer.phone
                })
                .select('id')
                .single();

            if (customerError) {
                return NextResponse.json({ error: 'Erreur création client.' }, { status: 500 });
            }
            customerId = newCustomer.id;
        }

        // 5. Create Booking
        console.log('--- DEBUG BOOKING INSERT ---');
        console.log('Generated reference:', reference);
        console.log('Apartment ID:', aptData.id);
        console.log('Customer ID:', customerId);
        console.log('----------------------------');

        const { data: bookingData, error: bookingError } = await supabase
            .from('bookings')
            .insert({
                reference,
                apartment_id: aptData.id,
                customer_id: customerId,
                check_in_date: arrival.split('T')[0],
                check_out_date: departure.split('T')[0],
                adults,
                children,
                base_price_per_night,
                total_nights,
                subtotal,
                total_amount,
                special_requests: specialRequests,
                status: 'pending',
                payment_status: 'unpaid'
            })
            .select('id')
            .single();

        if (bookingError) {
            console.error('Booking Error:', bookingError);
            return NextResponse.json({ error: 'Erreur lors de la réservation.' }, { status: 500 });
        }

        // 5.5. Award Points (e.g. 50 points per night)
        const pointsEarned = total_nights * 50;
        await supabase
            .from('loyalty_transactions')
            .insert({
                customer_id: customerId,
                booking_id: bookingData.id,
                points: pointsEarned,
                description_fr: `Réservation ${reference} (${total_nights} nuits)`,
                description_en: `Booking ${reference} (${total_nights} nights)`
            });

        // 6. Send Emails
        if (process.env.RESEND_API_KEY) {
            const adminEmail = process.env.ADMIN_EMAIL || 'booking@lacroisiere.bj';
            
            // Notification Admin
            await resend.emails.send({
                from: 'Résidence La Croisière <onboarding@resend.dev>',
                to: adminEmail,
                subject: `Nouvelle réservation : ${reference} (${aptData.name})`,
                html: `
                    <h2>Nouvelle demande de réservation</h2>
                    <p><strong>Référence :</strong> ${reference}</p>
                    <p><strong>Client :</strong> ${customer.firstName} ${customer.lastName} (${customer.email})</p>
                    <p><strong>Appartement :</strong> ${aptData.name}</p>
                    <p><strong>Dates :</strong> Du ${arrival.split('T')[0]} au ${departure.split('T')[0]} (${total_nights} nuits)</p>
                    <p><strong>Voyageurs :</strong> ${adults} adultes, ${children} enfants</p>
                    <p><strong>Montant Total :</strong> ${total_amount} FCFA</p>
                    <hr/>
                    <p><strong>Demandes spéciales :</strong> ${specialRequests || 'Aucune'}</p>
                `
            });

            // Confirmation Client
            await resend.emails.send({
                from: 'Résidence La Croisière <onboarding@resend.dev>',
                to: customer.email,
                subject: `Votre demande de réservation à Résidence La Croisière (${reference})`,
                html: `
                    <h2>Bonjour ${customer.firstName},</h2>
                    <p>Nous avons bien reçu votre demande de réservation pour <strong>${aptData.name}</strong>.</p>
                    <p>Vos dates : du <strong>${arrival.split('T')[0]}</strong> au <strong>${departure.split('T')[0]}</strong>.</p>
                    <p>Notre équipe va examiner votre demande et vous contactera très prochainement pour finaliser la réservation.</p>
                    <br/>
                    <p>À très bientôt,<br/>L'équipe Résidence La Croisière</p>
                `
            });
        }

        return NextResponse.json({ success: true, reference });

    } catch (error) {
        console.error('Erreur API Bookings:', error);
        return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
    }
}
