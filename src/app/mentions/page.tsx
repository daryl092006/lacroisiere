"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Éditeur du site",
    content: [
      "Le site <strong>lacroisiere.bj</strong> est édité par :",
      "<strong>Résidence La Croisière</strong><br/>Société à Responsabilité Limitée (SARL)<br/>Siège social : Quartier Haie Vive, Cotonou, Bénin",
      "Email : <a href='mailto:contact@lacroisiere.bj' class='text-[#233D8C] underline'>contact@lacroisiere.bj</a><br/>Téléphone : +229 00 00 00 00",
    ]
  },
  {
    title: "2. Directeur de la publication",
    content: [
      "Le directeur de la publication est le représentant légal de la Résidence La Croisière."
    ]
  },
  {
    title: "3. Hébergement",
    content: [
      "Le site est hébergé par :<br/><strong>Vercel Inc.</strong><br/>340 Pine Street, Suite 700, San Francisco, CA 94104, États-Unis<br/>Site : <a href='https://vercel.com' target='_blank' rel='noopener noreferrer' class='text-[#233D8C] underline'>vercel.com</a>"
    ]
  },
  {
    title: "4. Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, photographies, illustrations, logos, vidéos) est protégé par le droit d'auteur et appartient à la Résidence La Croisière ou à ses partenaires.",
      "Toute reproduction, représentation, modification ou publication, totale ou partielle, est strictement interdite sans l'autorisation écrite préalable de la Résidence La Croisière.",
    ]
  },
  {
    title: "5. Données personnelles",
    content: [
      "La Résidence La Croisière s'engage à respecter la confidentialité des données personnelles transmises via ce site, conformément aux lois applicables en République du Bénin.",
      "Les données collectées (nom, prénom, email, téléphone) sont exclusivement utilisées pour traiter vos demandes de réservation ou de contact. Elles ne sont jamais cédées à des tiers.",
      "Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : <a href='mailto:contact@lacroisiere.bj' class='text-[#233D8C] underline'>contact@lacroisiere.bj</a>",
    ]
  },
  {
    title: "6. Cookies",
    content: [
      "Ce site utilise des cookies techniques nécessaires à son bon fonctionnement ainsi que des cookies analytiques permettant d'améliorer votre expérience de navigation.",
      "Vous pouvez à tout moment gérer vos préférences via le panneau de gestion accessible depuis le footer du site."
    ]
  },
  {
    title: "7. Limitation de responsabilité",
    content: [
      "La Résidence La Croisière s'efforce d'assurer l'exactitude et la mise à jour des informations disponibles sur ce site. Elle ne peut garantir l'exhaustivité ou l'absence d'erreurs des informations publiées.",
      "La Résidence La Croisière ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site."
    ]
  },
  {
    title: "8. Droit applicable",
    content: [
      "Le présent site et ses mentions légales sont soumis au droit béninois. En cas de litige, les tribunaux compétents de Cotonou, Bénin, seront seuls compétents."
    ]
  }
];

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-40 pb-20 px-6 md:px-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="mb-12 block">
            <Image src="/la_croisiere_logo.png" alt="Logo La Croisière" width={200} height={56} className="h-10 w-auto" />
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] block mb-4">Transparence &amp; Légal</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-slate-900 leading-tight">
              Mentions<br /><em className="italic">Légales.</em>
            </h1>
            <p className="text-slate-500 mt-6 text-sm font-light">Dernière mise à jour : Juillet 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto space-y-16">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="border-t border-slate-100 pt-12"
            >
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#233D8C] mb-6">{s.title}</h2>
              <div className="space-y-4">
                {s.content.map((p, j) => (
                  <p key={j} className="text-slate-600 font-light leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-[#233D8C] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/cookies" className="hover:text-[#233D8C] transition-colors">Cookies</Link>
            <Link href="/cgv" className="hover:text-[#233D8C] transition-colors">CGV</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
