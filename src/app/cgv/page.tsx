"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const sections = [
  {
    title: "1. Objet",
    content: [
      "Les présentes Conditions Générales de Vente (CGV) régissent toutes les réservations effectuées auprès de la Résidence La Croisière, que ce soit via le site internet, par téléphone ou par email.",
      "Toute réservation implique l'acceptation pleine et entière des présentes CGV par le client."
    ]
  },
  {
    title: "2. Réservation",
    content: [
      "La réservation est confirmée à réception d'un acompte de 30% du montant total du séjour ou d'une confirmation écrite de notre équipe selon le mode de réservation choisi.",
      "Un email de confirmation vous sera envoyé dans les 24 heures suivant votre demande, avec tous les détails de votre séjour."
    ]
  },
  {
    title: "3. Tarifs",
    content: [
      "Les tarifs affichés sur le site sont indiqués en Francs CFA (XOF) par nuit et sont susceptibles de varier en fonction de la période, de la durée du séjour et des offres en cours.",
      "Les conversions dans d'autres devises (EUR, USD, GBP, etc.) sont données à titre indicatif et basées sur des taux de change en temps réel. Le paiement final s'effectue en XOF ou selon l'accord convenu avec notre équipe."
    ]
  },
  {
    title: "4. Modalités de paiement",
    content: [
      "Le paiement s'effectue directement à la résidence lors de votre check-in. Nous acceptons les règlements par :<br/>• Espèces (XOF, EUR, USD)<br/>• Virement bancaire (coordonnées communiquées sur demande)<br/>• Mobile Money (MTN, Moov)<br/>• Carte bancaire (selon disponibilité à l'arrivée)",
      "Aucun prépaiement en ligne n'est actuellement requis. La demande de réservation via le site ne constitue pas une transaction financière."
    ]
  },
  {
    title: "5. Annulation et modification",
    content: [
      "<strong>Annulation gratuite</strong> : jusqu'à 72h avant la date d'arrivée prévue.",
      "<strong>Annulation tardive</strong> : En cas d'annulation dans les 72h précédant l'arrivée, une nuit de séjour pourra être facturée à titre de dédit.",
      "<strong>Non-présentation (No-show)</strong> : En cas de non-présentation sans annulation préalable, le montant de la première nuit sera dû.",
      "Toute modification de réservation (dates, nombre de personnes) est soumise à disponibilité et doit être demandée par email ou téléphone."
    ]
  },
  {
    title: "6. Check-in / Check-out",
    content: [
      "<strong>Check-in</strong> : à partir de 14h00. En cas d'arrivée anticipée, nous ferons notre possible pour vous accueillir selon disponibilité.",
      "<strong>Check-out</strong> : avant 11h00. Un départ tardif peut être arrangé sur demande, sous réserve de disponibilité et peut faire l'objet d'une facturation additionnelle."
    ]
  },
  {
    title: "7. Obligations du client",
    content: [
      "Le client s'engage à utiliser les appartements et les équipements avec soin et à en respecter le règlement intérieur communiqué lors du check-in.",
      "Tout dommage causé aux équipements ou à la propriété sera facturé au client. Fumer est strictement interdit dans tous les appartements.",
      "Le nombre d'occupants ne peut excéder la capacité déclarée lors de la réservation."
    ]
  },
  {
    title: "8. Responsabilité",
    content: [
      "La Résidence La Croisière décline toute responsabilité en cas de vol ou de dommages aux effets personnels du client survenus dans l'enceinte de la résidence.",
      "Un coffre-fort est mis à disposition dans chaque appartement. Il est conseillé aux clients de l'utiliser pour leurs objets de valeur."
    ]
  },
  {
    title: "9. Droit applicable et litiges",
    content: [
      "Les présentes CGV sont soumises au droit béninois. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents de Cotonou seront saisis."
    ]
  }
];

const highlights = [
  "Annulation gratuite jusqu'à 72h avant",
  "Paiement sécurisé à votre arrivée",
  "Modification possible selon disponibilité",
  "Confirmation sous 24h garantie"
];

export default function CGV() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-40 pb-20 px-6 md:px-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="mb-12 block">
            <Image src="/la_croisiere_logo.png" alt="Logo La Croisière" width={200} height={56} className="h-10 w-auto" />
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] block mb-4">Réservation &amp; Séjour</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-slate-900 leading-tight">
              Conditions<br /><em className="italic">Générales de Vente.</em>
            </h1>
            <p className="text-slate-500 mt-6 text-sm font-light">Dernière mise à jour : Juillet 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 px-6 md:px-16 bg-[#233D8C]">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 text-white"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
              <span className="text-sm font-light">{h}</span>
            </motion.div>
          ))}
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
              transition={{ duration: 0.6, delay: i * 0.04 }}
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

      {/* CTA */}
      <section className="py-16 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-sm font-bold text-slate-900 mb-1">Une question sur votre réservation ?</p>
            <a href="mailto:contact@lacroisiere.bj" className="text-[#233D8C] text-sm font-light underline">contact@lacroisiere.bj</a>
          </div>
          <Link href="/apartments" className="shrink-0 bg-[#233D8C] text-white px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors">
            Voir nos appartements
          </Link>
        </div>
      </section>

      <section className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-[#233D8C] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/mentions" className="hover:text-[#233D8C] transition-colors">Mentions légales</Link>
            <Link href="/cookies" className="hover:text-[#233D8C] transition-colors">Cookies</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
