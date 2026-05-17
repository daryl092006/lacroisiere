"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Wifi, Wind, Tv, Coffee, Bath, Star, ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ApartmentDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const name = resolvedParams.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#233D8C] selection:text-white">
      {/* 1. HERO GALLERY (LUXURY STYLE) */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link href="/apartments" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#233D8C] transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Retour à la collection
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">Suite Signature</span>
              <h1 className="text-5xl md:text-7xl font-serif font-light text-slate-900 leading-tight">{name}</h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">À partir de</span>
              <div className="text-3xl font-serif text-slate-900">250€ <span className="text-sm text-slate-400 font-sans italic">/ nuit</span></div>
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[50vh] md:h-[70vh]">
            <div className="col-span-4 md:col-span-2 row-span-2 relative rounded-sm overflow-hidden group">
              <Image src="/living.png" alt="Main view" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="col-span-2 md:col-span-1 row-span-1 relative rounded-sm overflow-hidden group hidden md:block">
              <Image src="/room.png" alt="Bedroom view" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="col-span-2 md:col-span-1 row-span-1 relative rounded-sm overflow-hidden group hidden md:block">
              <Image src="/exterior.png" alt="Bathroom view" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="col-span-4 md:col-span-2 row-span-1 relative rounded-sm overflow-hidden group hidden md:block">
              <Image src="/hero.png" alt="Kitchen view" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-white transition-colors shadow-xl">
                Voir les 12 photos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT & STICKY WIDGET */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          {/* MAIN CONTENT (LEFT) */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-6 border-b border-slate-200 pb-8 mb-12">
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-[#233D8C]" /><span className="font-serif text-lg">4 Voyageurs</span></div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#233D8C]" /><span className="font-serif text-lg">85 m²</span></div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-2"><span className="font-serif text-lg">Étage 2</span></div>
            </div>

            <div className="mb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">L'Histoire du lieu</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light mb-6">Le {name} redéfinit le concept du luxe urbain. Conçu avec des matériaux nobles et baigné de lumière naturelle, cet espace ouvert offre une fluidité de mouvement exceptionnelle.</p>
              <p className="text-slate-600 text-lg leading-relaxed font-light">La décoration fusionne subtilement l'artisanat local et le minimalisme contemporain.</p>
            </div>

            <div className="mb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Équipements Premium</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {[
                  { icon: <Wifi />, label: "Wi-Fi Haut Débit" },
                  { icon: <Wind />, label: "Climatisation" },
                  { icon: <Tv />, label: "Smart TV 4K" },
                  { icon: <Coffee />, label: "Machine Nespresso" },
                  { icon: <Bath />, label: "Produits d'accueil" },
                  { icon: <CheckCircle2 />, label: "Ménage quotidien" }
                ].map((eq, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#233D8C]">{eq.icon}</div>
                    <span className="text-sm font-medium text-slate-700">{eq.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STICKY WIDGET (RIGHT) */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-32 bg-white p-8 rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.08)] border border-slate-100">
              <div className="mb-8 pb-8 border-b border-slate-100">
                <div className="text-3xl font-serif text-slate-900 mb-2">250€ <span className="text-sm font-sans italic text-slate-400">/ nuit</span></div>
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Disponible à vos dates
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="border border-slate-200 rounded-sm flex flex-col">
                  <div className="flex border-b border-slate-200">
                    <div className="flex-1 p-4 border-r border-slate-200">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Arrivée</label>
                      <div className="text-sm font-serif italic">14 Mai 2026</div>
                    </div>
                    <div className="flex-1 p-4">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Départ</label>
                      <div className="text-sm font-serif italic">18 Mai 2026</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Voyageurs</label>
                    <div className="text-sm font-serif italic">2 Personnes</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#233D8C] text-white py-5 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl hover:shadow-2xl">
                Réserver cet appartement
              </button>
              <p className="text-center text-xs text-slate-400 mt-4 font-light">Aucun montant ne sera débité (paiement sur place)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}