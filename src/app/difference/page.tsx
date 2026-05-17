"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Zap, HeartHandshake, Sparkles, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/client";

import Image from "next/image";

export default function DifferencePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">Notre Philosophie</span>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-8 leading-tight">
            Ni un hôtel impersonnel.<br/>Ni un simple Airbnb.
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            Nous avons simplement pris le meilleur des deux mondes. L'intimité d'un vrai chez-soi, couplée à l'exigence et la sécurité d'un service premium.
          </p>
        </motion.div>
      </div>

      {/* EDITORIAL SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <img src="/living.png" alt="L'art de vivre" className="object-cover w-full h-full" />
            <div className="absolute inset-0 border border-black/10 rounded-sm"></div>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">L'Origine</span>
            <h2 className="text-4xl font-serif font-light text-slate-900 mb-8 leading-tight">
              L'indépendance de l'appartement.<br/>L'excellence de l'hôtel.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
              La Résidence La Croisière est née d'un constat simple : lors de longs séjours, une chambre d'hôtel devient vite contraignante, tandis qu'un appartement classique manque cruellement de services et de garanties.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light">
              Nous avons créé 14 unités uniques où chaque détail a été pensé pour vous offrir un espace de vie généreux, équipé d'une vraie cuisine, tout en vous garantissant un service de ménage, une conciergerie dédiée et une sécurité absolue.
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-px bg-[#233D8C]"></div>
              <span className="text-sm font-serif italic text-slate-500">La Direction</span>
            </div>
          </div>
        </div>
      </div>

      {/* ARGUMENTS */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Home />, title: "Comme chez vous", desc: "Des appartements spacieux et équipés où l'on se sent vivre, pas juste dormir." },
            { icon: <Zap />, title: "Autonomie Totale", desc: "Groupe électrogène de pointe et réserves d'eau : ici, la notion de coupure n'existe pas." },
            { icon: <ShieldCheck />, title: "Conciergerie VIP", desc: "Une assistance discrète et un service de conciergerie haut de gamme pour répondre à toutes vos demandes." },
            { icon: <Sparkles />, title: "Service de Nettoyage", desc: "Un entretien rigoureux et professionnel, exactement comme dans les plus grands établissements." }
          ].map((arg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-10 rounded-sm border border-slate-100 text-center hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 mx-auto flex items-center justify-center text-[#233D8C] mb-8 group-hover:bg-[#233D8C] group-hover:text-white transition-colors">{arg.icon}</div>
              <h3 className="text-lg font-serif text-slate-900 mb-4">{arg.title}</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">{arg.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOCUS 0 COUPURE */}
      <div className="bg-slate-900 text-white py-32 mb-32 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <img src="/exterior.png" alt="Infrastructure" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">Tranquillité d'esprit</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">La Garantie "Zéro Coupure"</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8 font-light">
              Au Bénin, la continuité de service est un luxe que nous avons rendu standard. La Résidence La Croisière dispose de ses propres infrastructures industrielles en arrière-plan.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D8C] flex items-center justify-center shrink-0 mt-1"><Zap className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-lg font-serif mb-1">Groupe Électrogène Relais</h4>
                  <p className="text-white/60 text-sm font-light">Basculement automatique instantané en cas de défaillance du réseau électrique public.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D8C] flex items-center justify-center shrink-0 mt-1"><ShieldCheck className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-lg font-serif mb-1">Réserves d'Eau Haute Capacité</h4>
                  <p className="text-white/60 text-sm font-light">Système de surpression garantissant un débit constant 24h/24.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="max-w-5xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">En toute transparence</span>
          <h2 className="text-4xl font-serif font-light text-slate-900">Le Comparatif</h2>
        </div>
        
        <div className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50">
            <div className="col-span-1 p-4 md:p-6"></div>
            <div className="col-span-1 p-4 md:p-6 text-center border-l border-slate-100 text-slate-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest">Hôtel<br className="md:hidden" /> Standard</div>
            <div className="col-span-1 p-4 md:p-6 text-center border-l border-slate-100 text-slate-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest">Airbnb<br className="md:hidden" /> Classique</div>
            <div className="col-span-1 p-4 md:p-6 text-center border-l-2 border-[#233D8C] bg-[#233D8C] text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest">Résidence<br className="md:hidden" /> La Croisière</div>
          </div>

          {[
            { label: "Intimité d'un vrai chez-soi", hotel: false, airbnb: true, us: true },
            { label: "Cuisine entièrement équipée", hotel: false, airbnb: true, us: true },
            { label: "Garantie 0 coupure (Groupe électrogène)", hotel: true, airbnb: false, us: true },
            { label: "Service de Conciergerie VIP", hotel: true, airbnb: false, us: true },
            { label: "Service de nettoyage rigoureux", hotel: true, airbnb: false, us: true },
            { label: "Espaces généreux et liberté", hotel: false, airbnb: true, us: true },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 p-4 md:p-6 text-xs md:text-sm font-medium text-slate-700 flex items-center leading-tight">{row.label}</div>
              <div className="col-span-1 p-4 md:p-6 border-l border-slate-100 flex items-center justify-center">
                {row.hotel ? <Check className="text-slate-300 w-5 h-5" /> : <X className="text-slate-200 w-5 h-5" />}
              </div>
              <div className="col-span-1 p-4 md:p-6 border-l border-slate-100 flex items-center justify-center">
                {row.airbnb ? <Check className="text-slate-300 w-5 h-5" /> : <X className="text-slate-200 w-5 h-5" />}
              </div>
              <div className="col-span-1 p-4 md:p-6 border-l-2 border-[#233D8C] bg-blue-50/30 flex items-center justify-center">
                <Check className="text-[#233D8C] w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link 
          href="/apartments"
          className="inline-flex items-center gap-4 bg-[#233D8C] text-white px-8 md:px-12 py-4 md:py-5 rounded-sm font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-colors"
        >
          <Sparkles className="w-4 h-4" /> Voir nos appartements <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}