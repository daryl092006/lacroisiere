"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Share2 } from 'lucide-react';
import { useTranslation } from "@/i18n/client";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-12">
          {/* BRAND */}
          {/* ⚠️ NE SOUS AUCUN PRÉTEXTE MODIFIER CE BLOC LOGO : Les marges négatives (-my-8, -ml-4) et dimensions (220px) sont parfaitement calibrées pour annuler la transparence du fichier icon.png */}
          <div className="space-y-4">
            <div className="flex items-center -ml-4 -my-8">
              <Image 
                src="/icon.png" 
                alt="Logo La Croisière" 
                width={220} 
                height={220} 
                className="object-contain"
                priority
              />
            </div>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              L'excellence de l'hospitalité à Cotonou. Des appartements meublés premium pour vos séjours d'exception.
            </p>
            <div className="flex items-center gap-6 text-slate-400">
              <Share2 className="w-5 h-5 hover:text-[#233D8C] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link href="/apartments" className="hover:text-[#233D8C] transition-colors">Nos Appartements</Link></li>
              <li><Link href="/experience" className="hover:text-[#233D8C] transition-colors">L'Expérience</Link></li>
              <li><Link href="/gallery" className="hover:text-[#233D8C] transition-colors">Galerie</Link></li>
              <li><Link href="/contact" className="hover:text-[#233D8C] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Légal</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link href="/mentions" className="hover:text-[#233D8C] transition-colors">Mentions Légales</Link></li>
              <li><Link href="/cookies" className="hover:text-[#233D8C] transition-colors">Politique de Cookies</Link></li>
              <li><Link href="/cgv" className="hover:text-[#233D8C] transition-colors">CGV</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Contact</h4>
            <ul className="space-y-6 text-sm text-slate-500 font-light">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#233D8C] flex-shrink-0" />
                <span>Cotonou, Bénin<br />Quartier Haie Vive</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#233D8C] flex-shrink-0" />
                <span>+229 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#233D8C] flex-shrink-0" />
                <span>contact@lacroisiere-residence.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Résidence La Croisière. Tous droits réservés.
          </p>
          <p className="text-[10px] text-slate-300 font-medium uppercase tracking-widest">
            Designed by Denis GANGNITO
          </p>
        </div>
      </div>
    </footer>
  );
}
