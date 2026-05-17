"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Globe, 
  User, 
  ChevronDown, 
  ChevronRight,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { useTranslation } from "@/i18n/client";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const currentLang = i18n.language || "fr";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force dark text only on the listing page (light background)
  const isListingPage = pathname === '/apartments';
  const navTextTheme = (isScrolled || isListingPage) ? "text-slate-900" : "text-white";
  const navBrandTheme = (isScrolled || isListingPage) ? "brightness-100" : "brightness-0 invert";
  const navBgTheme = (isScrolled || isListingPage) ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-100" : "bg-transparent";

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const menuItems = [
    {
      label: t('Navigation.apartments'),
      id: "appartements",
      links: [
        { label: t('Navigation.viewAll'), href: "/apartments" },
        { label: "Suites Royales", href: "/apartments?type=Luxury" },
        { label: "Studios Premium", href: "/apartments?type=Premium" }
      ]
    },
    {
      label: t('Navigation.experience'),
      id: "experience",
      links: [
        { label: t('Navigation.whyUs'), href: "/#experience" },
        { label: t('Navigation.gallery'), href: "/gallery" },
        { label: t('Navigation.reviews'), href: "/#reviews" }
      ]
    },
    {
      label: t('Navigation.infos'),
      id: "infos",
      links: [
        { label: t('Navigation.map'), href: "/contact" },
        { label: t('Navigation.offers'), href: "/offers" },
        { label: "Espace Business", href: "/business" }
      ]
    }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-16 py-4 ${navBgTheme}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          {/* ⚠️ NE SOUS AUCUN PRÉTEXTE MODIFIER CE BLOC LOGO : Les marges négatives (-my-12) et dimensions (220px) sont parfaitement calibrées pour annuler la transparence du fichier icon.png sans casser la hauteur de la navbar */}
          <Link href="/" className="relative z-50 flex items-center h-12">
            <div className="-ml-4 -my-12">
              <Image 
                src="/icon.png" 
                alt="Logo Résidence La Croisière" 
                width={220} 
                height={220} 
                className={`w-[160px] md:w-[220px] object-contain transition-all duration-500 ${navBrandTheme}`}
                priority
              />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className={`hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] ${navTextTheme}`}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative h-full py-4 cursor-pointer group"
                onMouseEnter={() => setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="flex items-center gap-2 hover:text-[#233D8C] transition-colors">
                  {item.label}
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </div>

                <AnimatePresence>
                  {activeMenu === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-sm p-6 min-w-[240px] border border-slate-100"
                    >
                      <div className="flex flex-col gap-4 text-slate-900 lowercase first-letter:uppercase tracking-widest text-[10px] font-black">
                        {item.links.map((link) => (
                          <Link key={link.label} href={link.href} className="hover:text-[#233D8C] transition-all flex items-center justify-between group/link">
                            {link.label}
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link href="/mon-espace" className="flex items-center gap-2 hover:text-[#233D8C] transition-colors group">
              <User className="w-3 h-3 group-hover:scale-110 transition-transform" />
              {t('Navigation.clientSpace')}
            </Link>

            {/* Language Selector */}
            <div className="relative py-4 cursor-pointer group">
              <div className="flex items-center gap-2 hover:text-[#233D8C] transition-colors uppercase">
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang}</span>
              </div>
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-sm p-3 min-w-[80px] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="flex flex-col gap-3 text-slate-900 tracking-widest text-[10px] font-black">
                  <button onClick={() => switchLanguage("fr")} className={`hover:text-[#233D8C] text-left ${currentLang === "fr" ? "text-[#233D8C]" : ""}`}>FR</button>
                  <button onClick={() => switchLanguage("en")} className={`hover:text-[#233D8C] text-left ${currentLang === "en" ? "text-[#233D8C]" : ""}`}>EN</button>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-6">
            <Link href="/apartments" className="hidden sm:block bg-[#233D8C] text-white px-8 py-3 rounded-sm text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-black shadow-lg">
              {t('Navigation.book')}
            </Link>
            <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-slate-900" : "text-white"}`}>
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col p-10 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 h-10">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <div className="-ml-4 -my-12">
                  <Image src="/icon.png" alt="Logo" width={220} height={220} className="w-[180px] object-contain" />
                </div>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-full">
                <X className="w-8 h-8 text-slate-900" />
              </button>
            </div>

            <div className="flex flex-col gap-12">
              <Link href="/" className="text-4xl font-serif text-slate-900 italic" onClick={() => setMobileMenuOpen(false)}>{t('Navigation.home')}</Link>
              {menuItems.map((item) => (
                <div key={item.id} className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C]">{item.label}</span>
                  <div className="flex flex-col gap-6 pl-4 border-l border-slate-100">
                    {item.links.map((link) => (
                      <Link 
                        key={link.label} 
                        href={link.href} 
                        className="text-2xl text-slate-700 font-light flex items-center justify-between"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label} <ChevronRight className="w-5 h-5 text-slate-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-12 space-y-8">
              <div className="flex items-center gap-8 text-slate-400">
                <Phone className="w-5 h-5" />
                <Mail className="w-5 h-5" />
                <Globe className="w-5 h-5" />
              </div>
              <button className="w-full bg-[#233D8C] text-white py-6 rounded-sm font-black text-xs uppercase tracking-[0.3em]">
                {t('Navigation.book')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
