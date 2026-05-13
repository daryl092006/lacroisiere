"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Construction } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-12 flex justify-center">
          <Image
            src="/icon.png"
            alt="Logo La Croisière"
            width={200}
            height={60}
            className="h-10 w-auto"
            style={{ height: "auto" }}
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-[#233D8C] text-[10px] font-black uppercase tracking-widest mb-8">
          <Construction className="w-4 h-4" />
          En cours de finition
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-6">
          {title}
        </h1>
        
        <p className="text-slate-500 text-lg font-light mb-12 leading-relaxed">
          Nous préparons une expérience digitale à la hauteur du prestige de notre résidence. 
          Cette section sera bientôt disponible pour vous offrir le meilleur de La Croisière.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/"
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#233D8C] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          
          <div className="h-px w-12 bg-slate-100 hidden sm:block" />
          
          <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">
            Ouverture prochaine
          </span>
        </div>
      </motion.div>

      {/* Éléments décoratifs discrets */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#233D8C] to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </div>
  );
}
