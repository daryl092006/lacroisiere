"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Briefcase, FileText, Wifi, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const BENEFITS = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Tarifs Négociés",
    desc: "Bénéficiez de remises exclusives et de tarifs bloqués toute l'année pour vos collaborateurs en mission à Cotonou."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Facturation Centralisée",
    desc: "Simplifiez votre comptabilité avec notre système de facturation mensuelle globale et détaillée par collaborateur."
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "Business Ready",
    desc: "Fibre optique ultra haut débit, espaces de travail ergonomiques en chambre et accès à nos salles de réunion équipées."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Sécurité & Discrétion",
    desc: "Résidence sécurisée 24/7, accès contrôlés et discrétion absolue garantie pour vos cadres dirigeants et VIP."
  }
];

export default function CorporatePage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const company_name = fd.get("company_name") as string;
    const sector = fd.get("sector") as string;
    const contact_name = fd.get("contact_name") as string;
    const contact_role = fd.get("contact_role") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const needs = fd.get("needs") as string;

    const { error } = await supabase.from("corporate_requests").insert({
      company_name,
      sector,
      contact_name,
      contact_role,
      email,
      phone,
      needs,
    });

    setLoading(false);
    if (error) {
      console.error("Error sending corporate request:", error);
      setErrorMsg("Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.");
    } else {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] selection:bg-[#233D8C] selection:text-white pb-24">
      {/* HERO B2B */}
      <section className="relative h-[50vh] md:h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/living.png" 
          alt="Espace Business La Croisière" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 mt-16 max-w-4xl"
        >
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/80 mb-6 block drop-shadow-md">
            Espace Entreprises
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 drop-shadow-lg leading-tight">
            L'excellence au service de vos affaires
          </h1>
          <p className="text-white/80 font-light text-lg">
            La solution d'hébergement premium pour les multinationales, ambassades et institutions opérant au Bénin.
          </p>
        </motion.div>
      </section>

      {/* INTRODUCTION & STATS */}
      <section className="w-full mx-auto px-6 md:px-16 -mt-12 relative z-20 mb-24">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-serif text-[#233D8C] mb-2">+50</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Entreprises partenaires</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-serif text-[#233D8C] mb-2">100%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Confidentialité garantie</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-serif text-[#233D8C] mb-2">24/7</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Assistance dédiée</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="w-full mx-auto px-6 md:px-16 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6">Vos Avantages Corporate</h2>
          <p className="text-slate-500 font-light max-w-2xl mx-auto">
            Nous avons conçu une offre B2B sur-mesure pour répondre aux exigences administratives et de confort des grandes entreprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-xl border border-slate-100 hover:shadow-xl transition-shadow duration-500 group"
            >
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-[#233D8C] mb-8 group-hover:scale-110 transition-transform duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="w-full mx-auto px-6 md:px-16" id="form-section">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col lg:flex-row">
          
          {/* LEFT: INFO */}
          <div className="w-full lg:w-2/5 bg-[#233D8C] p-12 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
            <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-6">Devenir Partenaire</h3>
              <p className="text-white/80 font-light mb-12">
                Prenez contact avec notre direction commerciale pour mettre en place un contrat cadre adapté aux besoins de votre organisation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-light">Réponse sous 24h ouvrées</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-light">Proposition tarifaire sur-mesure</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="w-full lg:w-3/5 p-12 md:p-16 bg-white">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif text-slate-900 mb-4">Demande reçue avec succès</h3>
                <p className="text-slate-500 font-light max-w-sm mb-8">
                  Votre demande corporate a été enregistrée. Notre direction commerciale vous contactera sous 24h ouvrées.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-xs font-black uppercase tracking-widest text-[#233D8C] border-b-2 border-[#233D8C] pb-1 hover:text-black hover:border-black transition-colors">
                  Envoyer une autre demande
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {errorMsg && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold uppercase tracking-wider">
                    {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nom de l'entreprise *</label>
                    <input name="company_name" required type="text" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="Ex: Groupe Bolloré" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Secteur d'activité</label>
                    <input name="sector" type="text" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="Ex: Logistique" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Votre Nom & Prénom *</label>
                    <input name="contact_name" required type="text" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Fonction</label>
                    <input name="contact_role" type="text" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="DRH / Travel Manager" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email professionnel *</label>
                    <input name="email" required type="email" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="contact@entreprise.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Téléphone *</label>
                    <input name="phone" required type="tel" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="+229 ..." />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Besoins estimés</label>
                  <textarea name="needs" rows={3} className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent resize-none placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="Ex: Hébergement pour 3 cadres expatriés pour une durée de 6 mois..." />
                </div>

                <button type="submit" disabled={loading} className="mt-4 bg-slate-900 text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#233D8C] transition-colors flex items-center justify-center gap-4 shadow-lg w-full md:w-auto self-start cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed">
                  {loading ? "Envoi en cours..." : <>Envoyer la demande <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}