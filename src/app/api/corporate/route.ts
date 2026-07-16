import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { company_name, contact_name, email, phone, sector, needs, start_date, end_date, estimated_persons } = body;

        if (!company_name || !contact_name || !email) {
            return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
        }

        // 1. Insérer dans Supabase
        const { error: dbError } = await supabase.from('corporate_requests').insert({
            company_name,
            contact_name,
            email,
            phone,
            sector,
            needs,
            start_date,
            end_date,
            estimated_persons
        });

        if (dbError) {
            console.error('Erreur DB Corporate:', dbError);
            return NextResponse.json({ error: 'Erreur lors de la sauvegarde.' }, { status: 500 });
        }

        // 2. Envoyer un email via Resend
        if (process.env.RESEND_API_KEY) {
            const emailDest = process.env.ADMIN_EMAIL || 'corporate@lacroisiere.bj';
            await resend.emails.send({
                from: 'Résidence La Croisière <onboarding@resend.dev>', // Ou adresse vérifiée
                to: emailDest,
                subject: `Nouvelle demande Corporate : ${company_name}`,
                html: `
                    <h2>Nouvelle demande Corporate (B2B)</h2>
                    <p><strong>Entreprise :</strong> ${company_name}</p>
                    <p><strong>Contact :</strong> ${contact_name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
                    <p><strong>Secteur :</strong> ${sector || 'Non renseigné'}</p>
                    <p><strong>Personnes estimées :</strong> ${estimated_persons || 'Non renseigné'}</p>
                    <p><strong>Date de début :</strong> ${start_date || 'Non renseignée'}</p>
                    <p><strong>Date de fin :</strong> ${end_date || 'Non renseignée'}</p>
                    <hr />
                    <p><strong>Besoins :</strong></p>
                    <p>${(needs || '').replace(/\n/g, '<br/>')}</p>
                `
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erreur API Corporate:', error);
        return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
    }
}
