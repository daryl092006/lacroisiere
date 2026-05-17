"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Clock, GlassWater, Building2 } from "lucide-react";

const OFFERS = [
  {
    id: "long-sejour",
    title: "Résidence Prolongée",
    subtitle: "Séjours de 14 nuits et plus",
    description: "Faites de La Croisière votre résidence secondaire. Conçue pour les expatriés et les cadres en mission, cette offre vous garantit les meilleurs tarifs et des services de conciergerie dédiés pour vous sentir instantanément chez vous, loin de chez vous.",
    price: "-20%",
    priceLabel: "sur le Tarif Flexible",
    perks: [
      "Surclassement garanti selon disponibilité",
      "Transferts aéroport aller-retour offerts",
      "Service de pressing inclus (2 pièces/jour)",
      "Accès prioritaire au centre d'affaires"
    ],
    image: "/room.png",
    icon: <Clock className="w-5 h-5" />
  },
  {
    id: "escapade",
    title: "Escapade Romantique",
    subtitle: "Le temps d'un week-end",
    description: "Célébrez l'amour dans une atmosphère d'élégance absolue. Nous préparons votre suite avec des attentions délicates pour transformer votre séjour à Cotonou en un souvenir inoubliable.",
    price: "À partir de 350€",
    priceLabel: "par nuit, pour deux",
    perks: [
      "Bouteille de Champagne à l'arrivée",
      "Décoration florale de la chambre",
      "Petit-déjeuner royal servi en suite",
      "Départ tardif garanti jusqu'à 15h"
    ],
    image: "/living.png",
    icon: <GlassWater className="w-5 h-5" />
  },
  {
    id: "early-bird",
    title: "Réservation Anticipée",
    subtitle: "Réservez 30 jours à l'avance",
    description: "L'anticipation a ses privilèges. En planifiant votre séjour à la Résidence La Croisière plus d'un mois à l'avance, vous bénéficiez de conditions tarifaires exceptionnelles pour profiter pleinement de l'expérience.",
    price: "-15%",
    priceLabel: "sur votre séjour",
    perks: [
      "Tarif préférentiel exclusif",
      "Accès illimité à la piscine sur le toit",
      "Un soin relaxant offert (30 min)",
      "Wi-Fi très haut débit inclus"
    ],
    image: "/hero.png",
    icon: <Sparkles className="w-5 h-5" />
  }
];

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#233D8C] selection:text-white pb-24">
      {/* CINEMATIC HERO */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/hero.png" 
          alt="Offres La Croisière" 
          fill 
          className="object-cover scale-105" 
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 mt-16"
        >
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/90 mb-6 block drop-shadow-md">
            Privilèges
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 drop-shadow-lg">
            Offres & Expériences
          </h1>
          <p className="max-w-xl mx-auto text-white/90 font-light text-lg drop-shadow-md">
            Découvrez nos collections d'offres pensées pour sublimer votre séjour. Des attentions sur-mesure pour répondre à vos exigences les plus élevées.
          </p>
        </motion.div>
      </section>

      {/* OFFERS LIST */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-24">
        <div className="flex flex-col gap-24 md:gap-32">
          {OFFERS.map((offer, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={offer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-stretch`}
              >
                {/* IMAGE HALF */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-0 rounded-sm overflow-hidden shadow-2xl group">
                  <Image 
                    src={offer.image} 
                    alt={offer.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)]" 
                  />
                  <div className="absolute inset-0 bg-[#233D8C]/0 group-hover:bg-[#233D8C]/10 transition-colors duration-700" />
                </div>

                {/* CONTENT HALF */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center py-6">
                  <div className="flex items-center gap-3 text-[#233D8C] mb-6">
                    {offer.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest">{offer.subtitle}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">{offer.title}</h2>
                  
                  <p className="text-slate-500 font-light text-lg leading-relaxed mb-10">
                    {offer.description}
                  </p>

                  {/* PERKS */}
                  <div className="space-y-4 mb-12">
                    {offer.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#233D8C]" />
                        </div>
                        <span className="text-slate-700 font-medium text-sm">{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* PRICE & CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-slate-100 mt-auto">
                    <div>
                      <div className="text-3xl font-serif text-slate-900">{offer.price}</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{offer.priceLabel}</div>
                    </div>
                    
                    <button className="bg-slate-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#233D8C] transition-colors flex items-center gap-3 shadow-lg hover:shadow-2xl">
                      Réserver cette offre <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CORPORATE BANNER */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 mt-12 text-center">
        <div className="bg-[#F9F9F8] p-12 md:p-20 rounded-xl border border-slate-100">
          <Building2 className="w-10 h-10 text-[#233D8C] mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-slate-900 mb-4">Contrats Entreprises & B2B</h2>
          <p className="text-slate-500 font-light mb-8 max-w-xl mx-auto text-lg">
            Vous souhaitez loger vos collaborateurs en mission à Cotonou ? Contactez notre service commercial pour découvrir nos tarifs Corporate exclusifs et nos facilités de facturation.
          </p>
          <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 border-b border-slate-900 pb-1 hover:text-[#233D8C] hover:border-[#233D8C] transition-all flex items-center gap-2 mx-auto group">
            Contactez le service commercial <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
}