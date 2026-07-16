import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
        }

        // 1. Insérer dans Supabase
        const { error: dbError } = await supabase.from('contact_messages').insert({
            name,
            email,
            phone,
            subject,
            message
        });

        if (dbError) {
            console.error('Erreur DB:', dbError);
            return NextResponse.json({ error: 'Erreur lors de la sauvegarde.' }, { status: 500 });
        }

        // 2. Envoyer un email via Resend
        if (process.env.RESEND_API_KEY) {
            const emailDest = process.env.ADMIN_EMAIL || 'contact@lacroisiere.bj';
            await resend.emails.send({
                from: 'Résidence La Croisière <onboarding@resend.dev>', // Ou adresse vérifiée
                to: emailDest,
                subject: `Nouveau message de contact : ${subject || 'Sans objet'}`,
                html: `
                    <h2>Nouveau message de contact</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
                    <p><strong>Sujet :</strong> ${subject || 'Non renseigné'}</p>
                    <hr />
                    <p><strong>Message :</strong></p>
                    <p>${message.replace(/\n/g, '<br/>')}</p>
                `
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erreur API Contact:', error);
        return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
    }
}
