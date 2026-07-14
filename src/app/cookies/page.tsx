"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie } from "lucide-react";

const cookieTypes = [
  {
    name: "Cookies essentiels",
    badge: "Toujours actifs",
    badgeColor: "bg-emerald-50 text-emerald-700",
    desc: "Ces cookies sont indispensables au bon fonctionnement du site. Ils permettent la navigation, la gestion de vos préférences de langue et de devise, et ne peuvent pas être désactivés.",
    examples: ["Session utilisateur", "Préférence de langue", "Préférence de devise"]
  },
  {
    name: "Cookies analytiques",
    badge: "Optionnels",
    badgeColor: "bg-amber-50 text-amber-700",
    desc: "Ces cookies nous aident à comprendre comment vous interagissez avec le site afin d'améliorer votre expérience. Les données collectées sont anonymisées et agrégées.",
    examples: ["Pages visitées", "Durée de visite", "Provenance du trafic"]
  },
  {
    name: "Cookies de performance",
    badge: "Optionnels",
    badgeColor: "bg-blue-50 text-blue-700",
    desc: "Ces cookies permettent de mesurer les performances du site et d'identifier d'éventuels problèmes techniques afin de vous offrir une expérience optimale.",
    examples: ["Temps de chargement", "Erreurs de navigation", "Compatibilité navigateur"]
  }
];

export default function PolitiqueCookies() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-40 pb-20 px-6 md:px-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="mb-12 block">
            <Image src="/la_croisiere_logo.png" alt="Logo La Croisière" width={200} height={56} className="h-10 w-auto" />
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] block mb-4">Confidentialité &amp; Données</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-slate-900 leading-tight">
              Politique de<br /><em className="italic">Cookies.</em>
            </h1>
            <p className="text-slate-500 mt-6 text-sm font-light">Dernière mise à jour : Juillet 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto space-y-16">
          
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-slate-100 pt-12">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#233D8C] mb-6">Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p className="text-slate-600 font-light leading-relaxed">
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone ou tablette) lors de votre visite sur notre site. Il permet au site de mémoriser vos préférences et d&apos;améliorer votre expérience de navigation.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-slate-100 pt-12">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#233D8C] mb-10">Types de cookies utilisés</h2>
            <div className="space-y-8">
              {cookieTypes.map((type, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 border border-slate-100 rounded-sm hover:border-[#233D8C]/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <Cookie className="w-5 h-5 text-[#233D8C]" />
                      <h3 className="font-bold text-slate-900 text-base">{type.name}</h3>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${type.badgeColor}`}>
                      {type.badge}
                    </span>
                  </div>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-5">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((ex, j) => (
                      <span key={j} className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                        {ex}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-slate-100 pt-12">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#233D8C] mb-6">Gérer vos préférences</h2>
            <p className="text-slate-600 font-light leading-relaxed mb-6">
              Vous pouvez à tout moment modifier vos préférences en matière de cookies en cliquant sur le bouton ci-dessous ou depuis la section &quot;Gestion des Cookies&quot; dans le footer du site.
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event("open-cookie-banner"))}
              className="inline-flex items-center gap-3 bg-[#233D8C] text-white px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors cursor-pointer"
            >
              <Cookie className="w-4 h-4" />
              Gérer mes cookies
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-slate-100 pt-12">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#233D8C] mb-6">Contact</h2>
            <p className="text-slate-600 font-light leading-relaxed">
              Pour toute question relative à notre politique de cookies, contactez-nous à :<br />
              <a href="mailto:contact@lacroisiere.bj" className="text-[#233D8C] underline">contact@lacroisiere.bj</a>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-[#233D8C] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/mentions" className="hover:text-[#233D8C] transition-colors">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-[#233D8C] transition-colors">CGV</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
