"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Users, 
  Maximize2, 
  X,
  Star,
  CheckCircle2,
  Wifi,
  Tv,
  Wind,
  Coffee,
  ShieldCheck,
  Car
} from 'lucide-react';
import { APARTMENTS, Apartment } from '@/data/apartments';

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

export default function ApartmentsPage() {
  const [activeCollection, setActiveCollection] = useState("All");
  const [selectedApt, setSelectedApt] = useState<Apartment | null>(null);

  const filteredApartments = activeCollection === "All" 
    ? APARTMENTS 
    : APARTMENTS.filter(apt => apt.collection === activeCollection);

  const collections = ["All", "The Crown Jewels", "The Modern Classics", "The Studios"];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. EDITORIAL HERO */}
      <section className="relative pt-48 pb-32 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-black uppercase tracking-[0.5em] text-[#233D8C]">The Collections</motion.span>
          <h1 className="text-6xl md:text-8xl font-serif font-light italic text-slate-900">
            Choisissez votre <br /> <span className="text-[#233D8C]">Sanctuaire</span>.
          </h1>
        </div>
      </section>

      {/* 2. REFINED FILTERING */}
      <section className="sticky top-20 z-[80] bg-white/80 backdrop-blur-md border-y border-slate-100 py-6 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar">
          {collections.map((col) => (
            <button
              key={col}
              onClick={() => setActiveCollection(col)}
              className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all px-6 py-2 rounded-full
                ${activeCollection === col ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}
              `}
            >
              {col}
            </button>
          ))}
        </div>
      </section>

      {/* 3. THE CATALOG */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {filteredApartments.map((apt, idx) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedApt(apt)}
              className="group cursor-pointer space-y-10"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-slate-100">
                <Image src={apt.image} alt={apt.name} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500" />
                <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <div className="flex gap-4 mb-4">
                    {apt.features.map(feat => (
                      <FeatureIcon key={feat} name={feat} className="w-4 h-4 text-white/80" />
                    ))}
                  </div>
                  <div className="flex gap-6 mb-4">
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">{apt.capacity} Pers.</span></div>
                    <div className="flex items-center gap-2"><Maximize2 className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">{apt.sqm} m²</span></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-white pb-1">Explorer la suite</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-3xl font-serif text-slate-900">{apt.name}</h3>
                  <p className="text-slate-400 font-light text-sm italic">{apt.collection}</p>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">À partir de</span>
                  <span className="text-2xl font-serif text-[#233D8C]">{apt.price.toLocaleString()} FCFA</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. THE SLIDE-OVER (DRAWER) */}
      <AnimatePresence>
        {selectedApt && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedApt(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="fixed right-0 top-0 h-full w-full lg:w-[75%] bg-white z-[101] shadow-2xl overflow-y-auto no-scrollbar"
            >
              <button onClick={() => setSelectedApt(null)} className="fixed right-8 top-8 z-[102] w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:bg-slate-900 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>

              <div className="min-h-screen">
                <div className="relative h-[65vh]">
                  <Image src={selectedApt.image} alt={selectedApt.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white space-y-6 px-6">
                      {selectedApt.type === "Luxury" && <div className="flex justify-center gap-2 mb-4 text-amber-400">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}</div>}
                      <h2 className="text-5xl md:text-9xl font-serif italic leading-none">{selectedApt.name}</h2>
                      <div className="w-20 h-px bg-white/30 mx-auto mt-8" />
                    </div>
                  </div>
                </div>

                <div className="max-w-4xl mx-auto px-8 py-32 space-y-32">
                  <div className="space-y-16">
                    <div className="space-y-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#233D8C]">The Narrative</span>
                      <h3 className="text-5xl font-serif text-slate-900 leading-tight italic">"{selectedApt.history}"</h3>
                    </div>
                    <p className="text-xl text-slate-500 font-light leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-slate-900">
                      {selectedApt.story}
                    </p>
                  </div>

                  <div className="bg-slate-900 p-16 rounded-sm text-white space-y-12 shadow-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#233D8C]">Excellence & Privilèges</span>
                    <div className="grid grid-cols-1 gap-8">
                      {selectedApt.advantages.map((adv, i) => (
                        <div key={i} className="flex items-center gap-6 group">
                          <div className="w-8 h-px bg-[#233D8C] transition-all group-hover:w-12" />
                          <span className="text-xl font-serif italic text-white/70 group-hover:text-white transition-colors">{adv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VISUAL AMENITIES GRID */}
                  <div className="space-y-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#233D8C]">À votre disposition</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {selectedApt.features.map((feat: string, i: number) => (
                        <div key={i} className="flex flex-col items-center gap-4 bg-slate-50 p-8 rounded-sm border border-slate-100 group hover:border-[#233D8C]/30 transition-all">
                          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-[#233D8C]">
                            <FeatureIcon name={feat} className="w-6 h-6" />
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 text-center">
                            {feat === 'wifi' ? 'Wifi Fibre' : feat === 'tv' ? 'Smart TV 4K' : feat === 'ac' ? 'Climatisation' : feat === 'coffee' ? 'Café Nespresso' : feat === 'safe' ? 'Coffre-fort' : 'Parking privé'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 pt-16 border-t border-slate-100">
                    {Object.entries(selectedApt.composition).map(([zone, items]) => (
                      <div key={zone} className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#233D8C]">
                          {zone === 'sleeping' ? 'Sleeping Sanctuary' : zone === 'wellness' ? 'Wellness Experience' : zone === 'living' ? 'Living Art' : 'Muted Connectivity'}
                        </h4>
                        <div className="space-y-4">
                          {items.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-slate-500 font-light text-sm italic">
                              <div className="w-1 h-1 bg-slate-200 rounded-full" /> {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-16 rounded-sm flex flex-col md:flex-row justify-between items-center gap-10 border border-slate-100">
                    <div className="text-center md:text-left space-y-2">
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Tarif par nuit</span>
                      <span className="text-4xl font-serif italic text-[#233D8C]">{selectedApt.price.toLocaleString()} FCFA</span>
                    </div>
                    <button className="w-full md:w-auto px-16 py-6 bg-[#233D8C] hover:bg-black transition-all text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl active:scale-95">
                      Vérifier la disponibilité
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
