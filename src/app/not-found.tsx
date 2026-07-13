"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#233D8C]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-10">
        
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/la_croisiere_logo.png"
              alt="Logo Résidence La Croisière"
              width={280}
              height={80}
              className="h-12 w-auto"
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        {/* Big Premium 404 Text */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-serif font-light tracking-tighter text-[#233D8C]/20 select-none">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif italic text-slate-900 leading-tight">
            Une escale imprévue.
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed max-w-sm mx-auto">
            La page que vous cherchez a peut-être été déplacée, ou son adresse a temporairement changé.
          </p>
        </div>

        {/* Sleek CTA Button */}
        <div className="pt-4">
          <Link 
            href="/"
            className="group inline-flex items-center gap-3 px-10 py-4.5 bg-[#233D8C] text-white rounded-sm text-[10px] font-black uppercase tracking-[0.25em] hover:bg-black transition-all duration-300 shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
        </div>

      </div>

      {/* Discrete subtle line decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#233D8C]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#233D8C]/20 to-transparent" />
    </div>
  );
}
