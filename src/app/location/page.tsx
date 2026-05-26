"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Plane, Coffee, Building2, Palmtree, ArrowRight, ShieldCheck, Car } from "lucide-react";

const LANDMARKS = [
  {
    category: "Transports & Connectivité",
    icon: <Plane className="w-5 h-5" />,
    items: [
      { name: "Aéroport International (COO)", time: "10 min", distance: "4.5 km" },
    ]
  },
  {
    category: "Loisirs & Plages",
    icon: <Palmtree className="w-5 h-5" />,
    items: [
      { name: "Plage de Fidjrossè", time: "5 min", distance: "2 km" },
      { name: "Route des Pêches", time: "8 min", distance: "3.5 km" },
    ]
  },
  {
    category: "Gastronomie & Shopping",
    icon: <Coffee className="w-5 h-5" />,
    items: [
      { name: "Restaurants de la Haie Vive", time: "2 min", distance: "500 m" },
      { name: "Centre Commercial Erevan", time: "8 min", distance: "2.5 km" },
    ]
  },
  {
    category: "Quartier d'Affaires",
    icon: <Building2 className="w-5 h-5" />,
    items: [
      { name: "Palais des Congrès", time: "12 min", distance: "6 km" },
    ]
  }
];

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#233D8C] selection:text-white pb-32">
      {/* CINEMATIC HERO */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/exterior.png"
          alt="Localisation La Croisière"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <h1 className="text-6xl md:text-8xl font-serif font-light text-white mb-8 leading-tight">
              Au cœur de <br /><span className="italic">l'Excellence.</span>
            </h1>
            <p className="max-w-xl mx-auto text-white/90 font-light text-xl leading-relaxed">
              La Croisière bénéficie d'un emplacement stratégique dans le quartier de la Haie Vive, mêlant quiétude résidentielle et dynamisme urbain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAP & LIST (CLEAN WHITE LAYOUT) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 relative z-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-stretch">

          {/* MAP */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 min-h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.840673322045!2d2.3920155!3d6.3533446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023545b7367cd2d%3A0x6b45508a8f4c1e4c!2sHaie%20Vive%2C%20Cotonou%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
            ></iframe>

            <div className="absolute bottom-6 left-6 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#233D8C] flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">La Résidence</span>
                  <span className="text-sm font-bold text-slate-900 uppercase">Haie Vive, Cotonou</span>
                </div>
              </div>
            </div>
          </div>

          {/* LIST */}
          <div className="bg-slate-50/50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-3xl font-serif text-slate-900 border-l-4 border-[#233D8C] pl-6 mb-12 uppercase tracking-tighter">Points d'intérêt</h3>

            <div className="space-y-12">
              {LANDMARKS.map((section) => (
                <div key={section.category} className="group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#233D8C] transition-all group-hover:bg-[#233D8C] group-hover:text-white shadow-sm">
                      {section.icon}
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#233D8C]">{section.category}</h4>
                  </div>
                  <ul className="space-y-6">
                    {section.items.map((item) => (
                      <li key={item.name} className="flex justify-between items-end border-b border-slate-200 pb-4">
                        <span className="text-sm font-medium text-slate-600 italic">{item.name}</span>
                        <div className="text-right">
                          <span className="text-sm font-serif text-slate-900 block font-black">{item.time}</span>
                          <span className="text-[10px] text-slate-400 block uppercase tracking-widest mt-0.5">{item.distance}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PRESTIGE (LIGHT CONTRAST) */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col items-start text-left max-w-lg">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-[#233D8C] mb-10">
                <Plane className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-serif text-slate-900 mb-6 italic leading-tight">Navette <br />Aéroportuaire</h2>
              <p className="text-slate-500 font-light text-lg mb-10 leading-relaxed">
                Prise en charge personnalisée dès votre atterrissage. Un chauffeur privé vous attend pour vous conduire à la résidence dans le plus grand confort.
              </p>
              <button className="bg-[#233D8C] text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-black transition-all shadow-xl hover:-translate-y-1">
                Réserver un accueil
              </button>
            </div>

            <div className="flex flex-col items-start text-left max-w-lg">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center text-[#233D8C] mb-10">
                <Car className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-serif text-slate-900 mb-6 italic leading-tight">Déplacements <br />Sur Mesure</h2>
              <p className="text-slate-500 font-light text-lg mb-10 leading-relaxed">
                Besoin d'un chauffeur pour la journée ou pour une réunion spécifique ? Notre conciergerie met à votre disposition des véhicules de prestige.
              </p>
              <button className="border-2 border-[#233D8C] text-[#233D8C] px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#233D8C] hover:text-white transition-all">
                Tous nos services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white shadow-lg border border-slate-50">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">Établissement Hautement Sécurisé</span>
        </div>
      </section>
    </main>
  );
}
