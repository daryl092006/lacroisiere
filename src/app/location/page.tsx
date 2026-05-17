"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Plane, Coffee, Building2, Palmtree, ArrowRight } from "lucide-react";

const LANDMARKS = [
  {
    category: "Transports & Connectivité",
    icon: <Plane className="w-5 h-5" />,
    items: [
      { name: "Aéroport International (COO)", time: "10 min", distance: "4.5 km" },
      { name: "Port Autonome de Cotonou", time: "15 min", distance: "6 km" },
    ]
  },
  {
    category: "Loisirs & Plages",
    icon: <Palmtree className="w-5 h-5" />,
    items: [
      { name: "Plage de Fidjrossè", time: "5 min", distance: "2 km" },
      { name: "Route des Pêches", time: "8 min", distance: "3.5 km" },
      { name: "Place des Martyrs", time: "12 min", distance: "5 km" },
    ]
  },
  {
    category: "Gastronomie & Shopping",
    icon: <Coffee className="w-5 h-5" />,
    items: [
      { name: "Restaurants de la Haie Vive", time: "2 min", distance: "500 m" },
      { name: "Centre Commercial Erevan", time: "5 min", distance: "1.8 km" },
    ]
  },
  {
    category: "Quartier d'Affaires",
    icon: <Building2 className="w-5 h-5" />,
    items: [
      { name: "Palais des Congrès", time: "15 min", distance: "7 km" },
      { name: "Ministères et Ambassades", time: "10 min", distance: "4 km" },
    ]
  }
];

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#233D8C] selection:text-white pb-24">
      {/* CINEMATIC HERO */}
      <section className="relative h-[50vh] md:h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/exterior.png" 
          alt="Localisation La Croisière" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/40 to-black/60" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 mt-16"
        >
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/80 mb-6 block drop-shadow-md">
            Cartes et Repères
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 drop-shadow-lg">
            Au cœur de Cotonou
          </h1>
          <p className="max-w-xl mx-auto text-white/90 font-light text-lg">
            Située dans le prestigieux quartier de la Haie Vive, La Croisière vous offre un accès privilégié aux points névralgiques de la capitale économique.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 -mt-16 relative z-20 mb-24">
        <div className="bg-white p-2 rounded-xl shadow-2xl border border-slate-100 flex flex-col lg:flex-row gap-2">
          
          {/* MAP PLACEHOLDER / EMBED */}
          <div className="flex-1 h-[500px] lg:h-auto min-h-[500px] bg-slate-100 rounded-lg overflow-hidden relative group">
            {/* Using a Google Maps embed for the Haie Vive area in Cotonou */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.840673322045!2d2.3920155!3d6.3533446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023545b7367cd2d%3A0x6b45508a8f4c1e4c!2sHaie%20Vive%2C%20Cotonou%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-all duration-700 group-hover:filter-none"
            ></iframe>
            
            {/* OVERLAY BEFORE INTERACTION */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors duration-700">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-xl flex items-center gap-3 transform group-hover:-translate-y-4 group-hover:opacity-0 transition-all duration-500">
                <MapPin className="w-5 h-5 text-[#233D8C]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Explorer la carte</span>
              </div>
            </div>
          </div>

          {/* LANDMARKS LIST */}
          <div className="w-full lg:w-[450px] bg-[#F9F9F8] p-8 md:p-10 rounded-lg">
            <h3 className="text-2xl font-serif text-slate-900 mb-8">Points d'intérêt</h3>
            
            <div className="space-y-8">
              {LANDMARKS.map((section, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-4 text-[#233D8C]">
                    {section.icon}
                    <h4 className="text-[10px] font-black uppercase tracking-widest">{section.category}</h4>
                  </div>
                  <ul className="space-y-4">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex justify-between items-center group">
                        <span className="text-sm font-medium text-slate-600 group-hover:text-[#233D8C] transition-colors">{item.name}</span>
                        <div className="text-right">
                          <span className="text-sm font-serif text-slate-900 block">{item.time}</span>
                          <span className="text-[10px] text-slate-400 font-light block">{item.distance}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {idx !== LANDMARKS.length - 1 && <div className="w-full h-px bg-slate-200 mt-6" />}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CHAUFFEUR SERVICE */}
      <section className="max-w-4xl mx-auto px-6 md:px-16 text-center">
        <div className="border border-slate-200 p-12 md:p-16 rounded-xl bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Plane className="w-48 h-48" />
          </div>
          <h2 className="text-3xl font-serif text-slate-900 mb-4 relative z-10">Service Navette & Chauffeur Privé</h2>
          <p className="text-slate-500 font-light mb-8 max-w-lg mx-auto relative z-10">
            Pour un séjour sans la moindre contrainte, notre conciergerie organise vos transferts depuis l'aéroport ainsi que vos déplacements privés dans Cotonou, à bord de véhicules premium.
          </p>
          <button className="bg-[#233D8C] text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-black transition-colors flex items-center gap-4 mx-auto relative z-10">
            Organiser mon transfert <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}