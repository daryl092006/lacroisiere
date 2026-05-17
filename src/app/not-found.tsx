"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-6xl font-serif text-[#233D8C] mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8 font-light">Cette page semble introuvable.</p>
      <Link 
        href="/" 
        className="bg-[#233D8C] text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-black transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
