import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper pour formater la date au format iCal (YYYYMMDD)
function formatICalDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0].replace(/-/g, '');
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const apartment_slug = searchParams.get('apartment_slug');

    if (!apartment_slug) {
        return new NextResponse("Missing apartment_slug", { status: 400 });
    }

    try {
        // 1. Trouver l'ID de l'appartement à partir du slug
        const { data: aptData, error: aptError } = await supabase
            .from('apartments')
            .select('id, name')
            .eq('slug', apartment_slug)
            .single();

        if (aptError || !aptData) {
            return new NextResponse("Apartment not found", { status: 404 });
        }

        // 2. Récupérer toutes les réservations validées pour cet appartement
        const { data: bookings, error: bookingsError } = await supabase
            .from('bookings')
            .select('reference, check_in_date, check_out_date, created_at')
            .eq('apartment_id', aptData.id)
            .in('status', ['confirmed', 'checked_in', 'pending']);

        if (bookingsError) {
            console.error("Erreur de récupération des réservations:", bookingsError);
            return new NextResponse("Error fetching bookings", { status: 500 });
        }

        // 3. Générer le fichier iCal (ICS)
        let icalContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Residence La Croisiere//Booking Calendar//FR',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            `X-WR-CALNAME:${aptData.name} - Résidence La Croisière`,
            `X-WR-TIMEZONE:Africa/Porto-Novo`
        ];

        if (bookings) {
            for (const booking of bookings) {
                const checkIn = formatICalDate(booking.check_in_date);
                // Dans iCal, la date de fin (DTEND) est exclusive, donc c'est parfait car le client part le matin du check_out_date
                const checkOut = formatICalDate(booking.check_out_date); 
                const timestamp = new Date(booking.created_at).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

                icalContent.push('BEGIN:VEVENT');
                icalContent.push(`UID:${booking.reference}@lacroisiere.bj`);
                icalContent.push(`DTSTAMP:${timestamp}`);
                icalContent.push(`DTSTART;VALUE=DATE:${checkIn}`);
                icalContent.push(`DTEND;VALUE=DATE:${checkOut}`);
                icalContent.push(`SUMMARY:Réservé (${booking.reference})`);
                icalContent.push('STATUS:CONFIRMED');
                icalContent.push('END:VEVENT');
            }
        }

        icalContent.push('END:VCALENDAR');

        return new NextResponse(icalContent.join('\r\n'), {
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': `attachment; filename="${apartment_slug}-calendar.ics"`,
            },
        });

    } catch (error) {
        console.error('Erreur API iCal:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
