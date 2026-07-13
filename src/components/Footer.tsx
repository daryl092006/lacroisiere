"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Share2 } from 'lucide-react';
import { useTranslation } from "@/i18n/client";
import { useEffect, useState } from 'react';
import { fetchContactSettings, type ContactSettings } from '@/lib/contentService';

export default function Footer() {
  const { t } = useTranslation();
  const [contact, setContact] = useState<ContactSettings | null>(null);

  useEffect(() => {
    fetchContactSettings().then(setContact).catch(() => {});
  }, []);

  const phone = contact?.phone_main || '+229 00 00 00 00';
  const email = contact?.email_main || 'contact@lacroisiere-residence.com';
  const address = contact?.address_line1 || 'Quartier Haie Vive';
  const city = contact?.city || 'Cotonou';

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-12">
          {/* BRAND */}
          <div className="space-y-6">
            <div className="flex items-center min-h-[40px] pt-1">
              <Image 
                src="/la_croisiere_logo.png" 
                alt="Logo La Croisière" 
                width={240} 
                height={68} 
                className="h-14 w-auto object-contain -ml-2"
                priority
              />
            </div>
            <p className="text-slate-600 text-sm font-light leading-relaxed">
              L&apos;excellence de l&apos;hospitalité à {city}. Des appartements meublés premium pour vos séjours d&apos;exception.
            </p>
            <div className="flex items-center gap-6 text-slate-400">
              <Share2 className="w-5 h-5 hover:text-[#233D8C] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 pt-2">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-600 font-light">
              <li><Link href="/apartments" className="hover:text-[#233D8C] transition-colors">Nos Appartements</Link></li>
              <li><Link href="/experience" className="hover:text-[#233D8C] transition-colors">L&apos;Expérience</Link></li>
              <li><Link href="/gallery" className="hover:text-[#233D8C] transition-colors">Galerie</Link></li>
              <li><Link href="/contact" className="hover:text-[#233D8C] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 pt-2">Légal</h4>
            <ul className="space-y-4 text-sm text-slate-600 font-light">
              <li><Link href="/mentions" className="hover:text-[#233D8C] transition-colors">Mentions Légales</Link></li>
              <li><Link href="/cookies" className="hover:text-[#233D8C] transition-colors">Politique de Cookies</Link></li>
              <li><Link href="/cgv" className="hover:text-[#233D8C] transition-colors">CGV</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 pt-2">Contact</h4>
            <ul className="space-y-6 text-sm text-slate-600 font-light">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#233D8C] flex-shrink-0" />
                <span>{city}, {contact?.country || 'Bénin'}<br />{address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#233D8C] flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:underline hover:text-[#233D8C] transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#233D8C] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline hover:text-[#233D8C] transition-colors">{email}</a>
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
