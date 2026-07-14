"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Zap, HeartHandshake, Sparkles, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/client";

import Image from "next/image";

export default function DifferencePage() {
  const { t } = useTranslation();

  const args = (t('Difference.args', { returnObjects: true }) as { title: string; desc: string }[]);
  const compRows = (t('Difference.compRows', { returnObjects: true }) as string[]);

  const argIcons = [<Home key="home" />, <Zap key="zap" />, <ShieldCheck key="shield" />, <Sparkles key="spark" />];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">{t('Difference.badge')}</span>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-8 leading-tight">
            {t('Difference.h1line1')}<br/>{t('Difference.h1line2')}
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            {t('Difference.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* EDITORIAL SECTION */}
      <div className="w-full mx-auto px-6 md:px-16 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <img src="/living.png" alt="L'art de vivre" className="object-cover w-full h-full" />
            <div className="absolute inset-0 border border-black/10 rounded-sm"></div>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">{t('Difference.originBadge')}</span>
            <h2 className="text-4xl font-serif font-light text-slate-900 mb-8 leading-tight">
              {t('Difference.originTitle1')}<br/>{t('Difference.originTitle2')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
              {t('Difference.originP1')}
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light">
              {t('Difference.originP2')}
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-px bg-[#233D8C]"></div>
              <span className="text-sm font-serif italic text-slate-500">{t('Difference.originSign')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ARGUMENTS */}
      <div className="w-full mx-auto px-6 md:px-16 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {args.map((arg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-10 rounded-sm border border-slate-100 text-center hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 mx-auto flex items-center justify-center text-[#233D8C] mb-8 group-hover:bg-[#233D8C] group-hover:text-white transition-colors">{argIcons[i]}</div>
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
        <div className="w-full mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">{t('Difference.zeroCutBadge')}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">{t('Difference.zeroCutTitle')}</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8 font-light">
              {t('Difference.zeroCutText')}
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D8C] flex items-center justify-center shrink-0 mt-1"><Zap className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-lg font-serif mb-1">{t('Difference.generatorTitle')}</h4>
                  <p className="text-white/60 text-sm font-light">{t('Difference.generatorDesc')}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D8C] flex items-center justify-center shrink-0 mt-1"><ShieldCheck className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-lg font-serif mb-1">{t('Difference.waterTitle')}</h4>
                  <p className="text-white/60 text-sm font-light">{t('Difference.waterDesc')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="w-full mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">{t('Difference.compBadge')}</span>
          <h2 className="text-4xl font-serif font-light text-slate-900">{t('Difference.compTitle')}</h2>
        </div>

        <div className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50">
            <div className="col-span-1 p-4 md:p-6"></div>
            <div className="col-span-1 p-4 md:p-6 text-center border-l border-slate-100 text-slate-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest">{t('Difference.compColHotel')}</div>
            <div className="col-span-1 p-4 md:p-6 text-center border-l border-slate-100 text-slate-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest">{t('Difference.compColAirbnb')}</div>
            <div className="col-span-1 p-4 md:p-6 text-center border-l-2 border-[#233D8C] bg-[#233D8C] text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest">{t('Difference.compColUs')}</div>
          </div>

          {[
            { hotel: false, airbnb: true, us: true },
            { hotel: false, airbnb: true, us: true },
            { hotel: true, airbnb: false, us: true },
            { hotel: true, airbnb: false, us: true },
            { hotel: true, airbnb: false, us: true },
            { hotel: false, airbnb: true, us: true },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 p-4 md:p-6 text-xs md:text-sm font-medium text-slate-700 flex items-center leading-tight">{compRows[i]}</div>
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
          <Sparkles className="w-4 h-4" /> {t('Difference.ctaBtn')} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}