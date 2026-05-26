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
  ArrowRight,
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use a default theme for server-side and pre-hydration
  const isTransparentNavPage = pathname === '/' || pathname === '/location';
  const navTextTheme = (!mounted || isScrolled || !isTransparentNavPage) ? "text-slate-900" : "text-white";
  const navBrandTheme = (!mounted || isScrolled || !isTransparentNavPage) ? "brightness-100" : "brightness-0 invert";
  const navBgTheme = (!mounted || isScrolled || !isTransparentNavPage) ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent";

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
        { label: t('Navigation.whyUs'), href: "/difference" },
        { label: t('Navigation.gallery'), href: "/gallery" },
        { label: t('Navigation.reviews'), href: "/reviews" }
      ]
    },
    {
      label: t('Navigation.infos'),
      id: "infos",
      links: [
        { label: t('Navigation.map'), href: "/location" },
        { label: t('Navigation.offers'), href: "/offers" },
        { label: "Espace Business", href: "/corporate" }
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
                src="/favicon.png"
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

            <Link href="/client" className="flex items-center gap-2 hover:text-[#233D8C] transition-colors group">
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
            <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden p-2 transition-colors ${navTextTheme}`}>
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (PREMIUM DARK RE-DESIGN) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[190] bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm z-[200] bg-white text-slate-900 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-8 border-b border-white/5">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="brightness-100 opacity-80">
                  <Image src="/favicon.png" alt="Logo" width={140} height={140} className="w-[120px] object-contain" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-10 px-8 custom-scrollbar">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="group py-4 flex items-center justify-between border-b border-white/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-2xl font-serif italic text-slate-900 group-hover:text-[#233D8C] transition-colors">Accueil</span>
                    <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-all" />
                  </Link>

                  {menuItems.map((item, idx) => {
                    const isExpanded = activeMenu === `mobile-${item.id}`;
                    return (
                      <div key={item.id} className="flex flex-col border-b border-white/5">
                        <button
                          onClick={() => setActiveMenu(isExpanded ? null : `mobile-${item.id}`)}
                          className="w-full py-6 flex items-center justify-between text-left group"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">{`0${idx + 1}`}</span>
                            <span className="text-xl font-medium tracking-widest uppercase hover:text-[#233D8C] transition-colors">{item.label}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="text-slate-200"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-5 pb-8 pl-4 border-l border-slate-100">
                                {item.links.map((link) => (
                                  <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-light text-slate-500 hover:text-[#233D8C] transition-colors flex items-center justify-between group/link"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {link.label}
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  <Link
                    href="/client"
                    className="group py-8 flex items-center justify-between border-b border-slate-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <User className="w-5 h-5 text-slate-300" />
                      <span className="text-lg font-medium tracking-widest uppercase text-slate-900">{t('Navigation.clientSpace')}</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-slate-50 mt-auto border-t border-slate-100">
                <div className="flex items-center gap-8 mb-8 text-slate-400">
                  <Phone className="w-5 h-5 hover:text-[#233D8C] transition-colors cursor-pointer" />
                  <Mail className="w-5 h-5 hover:text-[#233D8C] transition-colors cursor-pointer" />
                  <Globe className="w-5 h-5 hover:text-[#233D8C] transition-colors cursor-pointer" />
                </div>
                <Link
                  href="/apartments"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#233D8C] text-white py-5 rounded-sm font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#1a2d6a] transition-all"
                >
                  <Calendar className="w-4 h-4 text-white/60" />
                  {t('Navigation.book')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
