"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Wifi,
  Wind,
  Users,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Coffee,
  ShieldCheck,
  Star,
  Tv,
  Car
} from 'lucide-react';
import Link from 'next/link';

interface ApartmentComposition {
  sleeping: string[];
  wellness: string[];
  living: string[];
  tech: string[];
}

interface ApartmentTemplateProps {
  name: string;
  type: string;
  history: string;
  story: string;
  advantages: string[];
  features: string[];
  composition: ApartmentComposition;
  sqm: number;
  capacity: number;
  price: number;
  image?: string;
}

const FeatureIcon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'wifi': return <Wifi className={className} />;
    case 'tv': return <Tv className={className} />;
    case 'ac': return <Wind className={className} />;
    case 'coffee': return <Coffee className={className} />;
    case 'safe': return <ShieldCheck className={className} />;
    case 'parking': return <Car className={className} />;
    default: return null;
  }
};

export default function ApartmentTemplate({
  name,
  type,
  history,
  story,
  advantages,
  features,
  composition,
  sqm,
  capacity,
  price,
  image
}: ApartmentTemplateProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={image || "/hero.png"}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-8 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/apartments" className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.6em] text-white/60 hover:text-white transition-all mb-12 group">
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-2" /> Retour à la collection
              </Link>
              <div className="flex justify-center gap-3 mb-6">
                {type === "Luxury" && [1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />)}
              </div>
              <h1 className="text-6xl md:text-9xl font-serif font-light italic leading-none">{name}</h1>
              <div className="w-20 h-px bg-white/30 mx-auto mt-12" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE STORY (ASIMMETRIC) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-7 space-y-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="absolute -left-16 top-0 hidden lg:block [writing-mode:vertical-lr] rotate-180 text-[9px] font-black uppercase tracking-[0.8em] text-[#233D8C]/20">
                THE NARRATIVE
              </span>
              <h2 className="text-5xl font-serif font-light mb-12 leading-tight text-slate-900">
                {history}
              </h2>
              <div className="max-w-xl space-y-8">
                <p className="text-slate-500 text-xl leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-slate-900">
                  {story}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-16 rounded-sm text-white space-y-12"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#233D8C]">Excellence & Privilèges</span>
              <div className="grid grid-cols-1 gap-8">
                {advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-8 h-px bg-[#233D8C] mt-3" />
                    <span className="text-lg font-serif italic text-white/80">{adv}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* VISUAL AMENITIES GRID (MAIN CONTENT) */}
            <div className="space-y-16 py-16">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#233D8C]">Équipements & Confort</span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {features.map((feat, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 bg-slate-50 p-10 rounded-sm border border-slate-100 group hover:border-[#233D8C]/30 transition-all text-center">
                    <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-sm text-[#233D8C]">
                      <FeatureIcon name={feat} className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {feat === 'wifi' ? 'Wifi Fibre' : feat === 'tv' ? 'Smart TV 4K' : feat === 'ac' ? 'Climatisation' : feat === 'coffee' ? 'Café Nespresso' : feat === 'safe' ? 'Coffre-fort' : 'Parking privé'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-24 border-t border-slate-100 pt-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                {Object.entries(composition).map(([zone, items], idx) => (
                  <motion.div key={zone} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-8">
                      {zone === 'sleeping' ? 'The Sleeping Sanctuary' : zone === 'wellness' ? 'The Wellness Experience' : zone === 'living' ? 'The Living Art' : 'Muted Connectivity'}
                    </h3>
                    <div className="space-y-4">
                      {items.map((item: string, i) => (
                        <div key={i} className="flex items-center gap-4 text-slate-500 font-light text-sm italic">
                          <div className="w-1 h-1 bg-slate-200 rounded-full" /> {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-16">
              <div className="flex justify-between items-center bg-slate-50 p-10 rounded-sm">
                <div className="space-y-1">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-slate-400 text-center">Capacité</span>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#233D8C]" />
                    <span className="text-2xl font-serif italic">{capacity} Pers.</span>
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="space-y-1 text-right">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-slate-400 text-center">Espace</span>
                  <div className="flex items-center gap-3 justify-end">
                    <Maximize2 className="w-5 h-5 text-[#233D8C]" />
                    <span className="text-2xl font-serif italic">{sqm} m²</span>
                  </div>
                </div>
              </div>


              <div className="p-1 border border-slate-200 rounded-sm">
                <div className="bg-slate-900 text-white p-12 space-y-10">
                  <div className="flex justify-between items-end border-b border-white/10 pb-10">
                    <div className="space-y-2">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-white/40">Tarification Directe</span>
                      <span className="text-4xl font-serif italic">{price.toLocaleString()} FCFA</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">/ Nuit</span>
                  </div>

                  <button className="group w-full bg-white text-slate-900 py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-[#233D8C] hover:text-white flex items-center justify-center gap-4">
                    Réserver mon séjour
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[9px] text-white/20 uppercase tracking-widest font-black">
                    <span>Best Price</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <span>Free Wi-Fi</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <span>No Fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="bg-slate-50 py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-12 gap-8">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="col-span-12 md:col-span-8 aspect-[16/9] relative overflow-hidden rounded-sm shadow-2xl">
              <Image src="/hero.png" alt="Gallery" fill className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-12 md:col-span-4 aspect-square relative overflow-hidden rounded-sm shadow-xl md:-translate-y-20 bg-white p-2">
              <div className="relative w-full h-full">
                <Image src="/room.png" alt="Gallery" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 text-center border-t border-slate-100">
        <h3 className="text-[10px] font-black uppercase tracking-[0.8em] text-[#233D8C] mb-12">Next Steps</h3>
        <p className="text-4xl md:text-6xl font-serif italic text-slate-900 mb-16 px-6">Prêt à vivre l'expérience <br /> <span className="text-[#233D8C]">{name}</span> ?</p>
        <Link href="/apartments" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-[#233D8C] pb-2 hover:text-[#233D8C] transition-colors">
          Voir d'autres appartements
        </Link>
      </section>
    </main>
  );
}
