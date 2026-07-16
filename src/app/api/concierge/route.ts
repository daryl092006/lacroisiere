import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { serviceId, serviceName, formData } = body;

        if (!serviceId || !formData) {
            return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
        }

        // 1. Vérifier si l'utilisateur est connecté
        const supabaseAuth = createRouteHandlerClient({ cookies });
        const { data: { session } } = await supabaseAuth.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Vous devez être connecté' }, { status: 401 });
        }

        // 2. Récupérer le customer_id
        const { data: customer } = await supabase
            .from('customers')
            .select('id, first_name, last_name, email')
            .eq('auth_user_id', session.user.id)
            .single();

        if (!customer) {
            return NextResponse.json({ error: 'Profil client introuvable' }, { status: 404 });
        }

        // 3. Préparer les détails de la requête
        let detailsText = `Service demandé : ${serviceName || serviceId}\n\n`;
        for (const [key, value] of Object.entries(formData)) {
            detailsText += `${key} : ${value}\n`;
        }

        // 4. Insérer dans la table concierge_requests
        const { data: newRequest, error: insertError } = await supabase
            .from('concierge_requests')
            .insert({
                customer_id: customer.id,
                details: detailsText,
                status: 'new'
            })
            .select('id')
            .single();

        if (insertError) {
            console.error('Erreur insertion concierge:', insertError);
            return NextResponse.json({ error: 'Erreur lors de la sauvegarde de la demande.' }, { status: 500 });
        }

        // 5. Envoyer un email à l'administration
        if (resend) {
            const adminEmail = process.env.ADMIN_EMAIL || 'conciergerie@lacroisiere.bj';
            
            await resend.emails.send({
                from: 'Résidence La Croisière <onboarding@resend.dev>',
                to: adminEmail,
                subject: `Nouvelle demande de conciergerie : ${serviceName || serviceId}`,
                html: `
                    <h2>Nouvelle demande de conciergerie</h2>
                    <p><strong>Client :</strong> ${customer.first_name} ${customer.last_name} (${customer.email})</p>
                    <p><strong>Service :</strong> ${serviceName || serviceId}</p>
                    <hr/>
                    <h3>Détails :</h3>
                    <pre style="font-family: inherit;">${detailsText}</pre>
                `
            });
        }

        return NextResponse.json({ success: true, message: 'Demande envoyée avec succès', id: newRequest.id });

    } catch (error) {
        console.error('Erreur API Concierge:', error);
        return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
    }
}
