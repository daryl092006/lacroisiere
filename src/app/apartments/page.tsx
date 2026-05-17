"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, MapPin, Search, ArrowRight, CheckCircle2, Star } from "lucide-react";

// Mock Data pour les appartements (Vitrine des 14)
const APARTMENTS = [
  { id: "suite-royale", name: "Suite Royale", capacity: 2, size: 45, price: 150, available: true, img: "/living.png", type: "Suite Signature" },
  { id: "loft-saphir", name: "Loft Saphir", capacity: 4, size: 85, price: 250, available: true, img: "/room.png", type: "Loft 2 Chambres" },
  { id: "penthouse-diamant", name: "Penthouse Diamant", capacity: 6, size: 150, price: 450, available: false, img: "/hero.png", type: "Penthouse" },
  { id: "suite-emeraude", name: "Suite Émeraude", capacity: 2, size: 50, price: 135, available: true, img: "/exterior.png", type: "Suite Deluxe" },
  { id: "villa-rubis", name: "Villa Rubis", capacity: 8, size: 200, price: 600, available: true, img: "/living.png", type: "Villa Privée" },
  { id: "studio-nacre", name: "Studio Nacre", capacity: 2, size: 35, price: 90, available: true, img: "/room.png", type: "Studio Premium" },
];

export default function ApartmentsPage() {
  const [priceRange, setPriceRange] = useState(500);
  const [capacity, setCapacity] = useState("Tous");

  const filteredApartments = APARTMENTS.filter(a => a.price <= priceRange);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">Notre Collection</span>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-6">Trouvez l'appartement parfait pour votre séjour.</h1>
          <p className="text-slate-500 font-light text-lg">14 espaces d'exception conçus pour votre confort absolu à Cotonou.</p>
        </motion.div>
      </div>

      {/* FILTER BAR (LUXURY) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white p-6 md:p-8 rounded-sm shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-8"
        >
          
          {/* Dates */}
          <div className="flex-1 w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Dates du séjour</label>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <Calendar className="w-4 h-4 text-[#233D8C]" />
              <input type="text" placeholder="Arrivée - Départ" className="w-full text-sm font-serif italic outline-none bg-transparent placeholder:text-slate-300 text-slate-900" readOnly />
            </div>
          </div>

          {/* Capacité */}
          <div className="flex-1 w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Capacité</label>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <Users className="w-4 h-4 text-[#233D8C]" />
              <select className="w-full text-sm font-serif italic outline-none bg-transparent cursor-pointer text-slate-900" value={capacity} onChange={(e) => setCapacity(e.target.value)}>
                <option value="Tous">Tous les voyageurs</option>
                <option value="1-2">1 à 2 personnes</option>
                <option value="3-4">3 à 4 personnes</option>
                <option value="5+">5 personnes et +</option>
              </select>
            </div>
          </div>

          {/* Prix Max */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block">Prix max</label>
              <span className="text-xs font-bold text-[#233D8C]">{priceRange}€</span>
            </div>
            <input 
              type="range" min="50" max="1000" step="50" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))} 
              className="w-full accent-[#233D8C] h-1 bg-slate-200 rounded-full appearance-none cursor-pointer" 
            />
          </div>

          {/* Bouton */}
          <button className="w-full md:w-auto bg-[#233D8C] text-white px-10 py-5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors shrink-0 flex items-center justify-center gap-3">
            <Search className="w-4 h-4" /> Rechercher
          </button>
        </motion.div>
      </div>

      {/* APARTMENTS GRID (AIRBNB LUXE STYLE) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredApartments.map((apt, i) => (
              <motion.div 
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex flex-col cursor-pointer"
              >
                {/* IMAGE BLOCK */}
                <Link href={`/apartments/${apt.id}`} className="block relative w-full aspect-[4/5] overflow-hidden rounded-xl mb-5">
                  <Image src={apt.img} alt={apt.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  
                  {/* BADGE DISPO */}
                  <div className="absolute top-4 left-4 z-10">
                    {apt.available ? (
                      <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                        Disponible
                      </span>
                    ) : (
                      <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                        Indisponible
                      </span>
                    )}
                  </div>
                </Link>

                {/* CONTENT BLOCK (MINIMALIST) */}
                <Link href={`/apartments/${apt.id}`} className="flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-serif font-medium text-slate-900">{apt.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>4.9</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 text-sm font-light mb-1">{apt.size} m² • {apt.capacity} voyageurs</p>
                  
                  <div className="mt-2">
                    <span className="text-base font-medium text-slate-900">{apt.price}€</span>
                    <span className="text-slate-500 text-sm font-light"> / nuit</span>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
        
        {filteredApartments.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-light">
            Aucun appartement ne correspond à vos critères de prix.
          </div>
        )}
      </div>
    </div>
  );
}