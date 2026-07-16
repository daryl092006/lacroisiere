import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { reference, email } = body;

        if (!reference || !email) {
            return NextResponse.json({ error: 'Référence et email obligatoires' }, { status: 400 });
        }

        // 1. Vérifier si l'utilisateur est connecté
        const supabaseAuth = createRouteHandlerClient({ cookies });
        const { data: { session } } = await supabaseAuth.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Vous devez être connecté pour revendiquer une réservation' }, { status: 401 });
        }

        // 2. Chercher la réservation
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .select(`
                id, 
                customer_id,
                customers(email)
            `)
            .eq('reference', reference)
            .single();

        if (bookingError || !booking) {
            return NextResponse.json({ error: 'Réservation introuvable avec cette référence.' }, { status: 404 });
        }

        const customer = booking.customers as any;

        // 3. Vérifier que l'email renseigné correspond à l'email de la réservation
        if (customer.email.toLowerCase() !== email.toLowerCase()) {
            return NextResponse.json({ error: 'Les informations fournies ne correspondent pas.' }, { status: 403 });
        }

        // 4. Mettre à jour la réservation avec le customer_id de l'utilisateur connecté
        // Récupérer le customer_id du compte connecté
        const { data: loggedInCustomer } = await supabase
            .from('customers')
            .select('id')
            .eq('auth_user_id', session.user.id)
            .single();

        if (!loggedInCustomer) {
            return NextResponse.json({ error: 'Profil client introuvable.' }, { status: 404 });
        }

        // Si la réservation est déjà liée à ce compte
        if (booking.customer_id === loggedInCustomer.id) {
            return NextResponse.json({ error: 'Cette réservation est déjà liée à votre compte.' }, { status: 400 });
        }

        // Lier la réservation (Update booking.customer_id)
        const { error: updateError } = await supabase
            .from('bookings')
            .update({ customer_id: loggedInCustomer.id })
            .eq('id', booking.id);

        if (updateError) {
            console.error('Erreur liaison réservation:', updateError);
            return NextResponse.json({ error: 'Impossible de lier la réservation.' }, { status: 500 });
        }

        // 5. Transférer également les points de fidélité associés à cette réservation
        await supabase
            .from('loyalty_transactions')
            .update({ customer_id: loggedInCustomer.id })
            .eq('booking_id', booking.id);

        return NextResponse.json({ success: true, message: 'Réservation liée avec succès.' });

    } catch (error) {
        console.error('Erreur API Claim:', error);
        return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
    }
}
