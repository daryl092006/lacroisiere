"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Construction } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ComingSoon({ title }: { title: string }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-12 flex justify-center">
          <Link href="/">
            <Image
              src="/favicon.png"
              alt="Logo Résidence La Croisière"
              width={220}
              height={60}
              className="h-10 w-auto"
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-[#233D8C] text-[10px] font-black uppercase tracking-widest mb-8">
          <Construction className="w-4 h-4" />
          {t('ComingSoon.badge')}
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-6">
          {title}
        </h1>
        
        <p className="text-slate-500 text-lg font-light mb-12 leading-relaxed">
          {t('ComingSoon.text')}
        </p>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link 
            href="/"
            className="group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 border border-slate-900 transition-all duration-300 shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('ComingSoon.backHome')}
          </Link>
          
          <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">
            {t('ComingSoon.nextOpening')}
          </span>
        </div>
      </motion.div>

      {/* Éléments décoratifs discrets */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#233D8C] to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#233D8C] to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </div>
  );
}
