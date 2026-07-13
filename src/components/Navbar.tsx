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
  Mail,
  Sun,
  Briefcase
} from 'lucide-react';
import { useTranslation } from "@/i18n/client";
import { usePathname } from 'next/navigation';
import { useCurrency, CurrencyType } from "@/context/CurrencyContext";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
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
  const isTransparent = mounted && !isScrolled && isTransparentNavPage;
  const navTextTheme = (!mounted || isScrolled || !isTransparentNavPage) ? "text-slate-900" : "text-white";
  const navLogoSrc = isTransparent ? "/la_croisiere_logo_blanc.png" : "/la_croisiere_logo.png";
  const navBgTheme = (!mounted || isScrolled || !isTransparentNavPage) ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent";

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const menuItems = [
    {
      label: t('Navigation.apartments') || 'Nos appartements',
      fallback: 'Nos appartements',
      id: "appartements",
      links: [
        { label: t('Navigation.viewAll') || 'Voir tous les appartements', href: "/apartments" },
        { label: "Suites Royales", href: "/apartments?type=Luxury" },
        { label: "Studios Premium", href: "/apartments?type=Premium" }
      ]
    },
    {
      label: t('Navigation.experience') || 'Expérience',
      fallback: 'Expérience',
      id: "experience",
      links: [
        { label: t('Navigation.whyUs') || 'Pourquoi nous choisir', href: "/difference" },
        { label: t('Navigation.gallery') || 'Galerie', href: "/gallery" },
        { label: t('Navigation.reviews') || 'Avis clients', href: "/reviews" }
      ]
    },
    {
      label: t('Navigation.infos') || 'Infos pratiques',
      fallback: 'Infos pratiques',
      id: "infos",
      links: [
        { label: t('Navigation.map') || 'Plan', href: "/location" },
        { label: t('Navigation.offers') || 'Offres', href: "/offers" }
      ]
    }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 ${navBgTheme}`}
        suppressHydrationWarning
      >
        <div className="w-full px-6 md:px-12 flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/" className="relative z-50 flex items-center h-12 shrink-0">
            <Image
              src={navLogoSrc}
              alt="Logo Résidence La Croisière"
              width={240}
              height={68}
              className="h-8 md:h-11 w-auto object-contain transition-all duration-500"
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className={`hidden lg:flex items-center justify-center flex-1 gap-8 xl:gap-12 text-xs font-semibold capitalize tracking-[0.15em] ${navTextTheme}`}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative h-full py-4 cursor-pointer group"
                onMouseEnter={() => setActiveMenu(item.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="flex items-center gap-2 hover:text-[#233D8C] transition-colors" suppressHydrationWarning>
                  {mounted ? item.label : item.fallback}
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </div>

                <AnimatePresence>
                  {activeMenu === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-sm p-4 min-w-[220px] border border-slate-100 flex flex-col gap-3 text-slate-900"
                    >
                      {item.links.map((link, subIdx) => (
                        <Link
                          key={subIdx}
                          href={link.href}
                          onClick={() => setActiveMenu(null)}
                          className="hover:text-[#233D8C] transition-colors text-[11px] font-semibold tracking-wider capitalize"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link href="/corporate" className="hover:text-[#233D8C] transition-colors" suppressHydrationWarning>
              {mounted ? (t('Navigation.business') || 'Espace Entreprises') : 'Espace Entreprises'}
            </Link>

            <Link href="/mon-espace" className="flex items-center gap-2 hover:text-[#233D8C] transition-colors group">
              <User className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span suppressHydrationWarning>{mounted ? (t('Navigation.clientSpace') || 'Espace Client') : 'Espace Client'}</span>
            </Link>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-6">
            <Link href="/apartments" className="hidden sm:block bg-[#233D8C] text-white px-6 py-2.5 rounded-sm text-xs font-semibold tracking-[0.15em] capitalize transition-all hover:bg-black shadow-lg" suppressHydrationWarning>
              {mounted ? (t('Navigation.book') || 'Réserver') : 'Réserver'}
            </Link>

            {/* Currency Selector */}
            <div className={`hidden lg:block relative py-4 cursor-pointer group ${navTextTheme}`}>
              <div className="flex items-center gap-2 hover:text-[#233D8C] transition-colors capitalize text-xs font-semibold tracking-[0.15em]">
                <span className="text-[10px] opacity-60">DEV:</span>
                <span suppressHydrationWarning>{currency === "XOF" ? "CFA" : currency}</span>
              </div>
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-sm p-4 min-w-[130px] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="flex flex-col gap-3 text-slate-900 tracking-wider text-[11px] font-semibold">
                  {(["XOF", "EUR", "USD", "GBP", "CAD", "NGN", "GHS", "MAD", "TND", "DZD", "ZAR", "AED", "CHF"] as CurrencyType[]).map((c) => (
                    <button
                      key={c}
                      suppressHydrationWarning
                      onClick={() => setCurrency(c)}
                      className={`hover:text-[#233D8C] text-left transition-colors cursor-pointer ${currency === c ? "text-[#233D8C] font-black" : ""}`}
                    >
                      {c === "XOF" ? "XOF (FCFA)" : `${c} (${c === "EUR" ? "€" : c === "USD" ? "$" : c === "GBP" ? "£" : c === "CAD" ? "CA$" : c === "NGN" ? "₦" : c === "GHS" ? "₵" : c === "MAD" ? "DH" : c === "TND" ? "DT" : c === "DZD" ? "DA" : c === "ZAR" ? "R" : c === "AED" ? "AED" : "CHF"})`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className={`hidden lg:block relative py-4 cursor-pointer group ${navTextTheme}`}>
              <div className="flex items-center gap-2 hover:text-[#233D8C] transition-colors capitalize text-xs font-semibold tracking-[0.15em]">
                <Globe className="w-3.5 h-3.5" />
                <span suppressHydrationWarning>{mounted ? currentLang : 'fr'}</span>
              </div>
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-sm p-3 min-w-[80px] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="flex flex-col gap-3 text-slate-900 tracking-widest text-[11px] font-semibold">
                  <button suppressHydrationWarning onClick={() => switchLanguage("fr")} className={`hover:text-[#233D8C] text-left ${mounted && currentLang === "fr" ? "text-[#233D8C]" : ""}`}>FR</button>
                  <button suppressHydrationWarning onClick={() => switchLanguage("en")} className={`hover:text-[#233D8C] text-left ${mounted && currentLang === "en" ? "text-[#233D8C]" : ""}`}>EN</button>
                </div>
              </div>
            </div>

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
              <div className="flex justify-between items-center px-8 py-8 border-b border-slate-100">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image src="/la_croisiere_logo.png" alt="Logo" width={200} height={56} className="h-8 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-10 px-8 custom-scrollbar">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="group py-4 flex items-center justify-between border-b border-slate-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-sm font-semibold tracking-[0.15em] capitalize text-slate-900 group-hover:text-[#233D8C] transition-colors">Accueil</span>
                    <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-all" />
                  </Link>

                  {menuItems.map((item, idx) => {
                    const isExpanded = activeMenu === `mobile-${item.id}`;
                    return (
                      <div key={item.id} className="flex flex-col border-b border-slate-100">
                        <button
                          onClick={() => setActiveMenu(isExpanded ? null : `mobile-${item.id}`)}
                          className="w-full py-6 flex items-center justify-between text-left group cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold tracking-[0.15em] capitalize text-slate-900 hover:text-[#233D8C] transition-colors">{item.label}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="text-slate-200"
                          >
                            <ChevronDown className="w-4 h-4 group-hover:text-slate-400 transition-colors" />
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
                              <div className="pl-4 pb-6 flex flex-col gap-4 text-slate-500 border-l-2 border-[#233D8C]/20 ml-1 mt-2">
                                {item.links.map((link, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-[#233D8C] text-xs font-semibold tracking-wider capitalize transition-colors"
                                  >
                                    {link.label}
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
                    href="/corporate"
                    className="group py-6 flex items-center justify-between border-b border-slate-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <Briefcase className="w-5 h-5 text-slate-300" />
                      <span className="text-sm font-semibold tracking-[0.15em] capitalize text-slate-900">{t('Navigation.business') || 'Espace Entreprises'}</span>
                    </div>
                  </Link>

                  <Link
                    href="/mon-espace"
                    className="group py-6 flex items-center justify-between border-b border-slate-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <User className="w-5 h-5 text-slate-300" />
                      <span className="text-sm font-semibold tracking-[0.15em] capitalize text-slate-900">{t('Navigation.clientSpace')}</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-slate-50 mt-auto border-t border-slate-100">
                {/* Currency selector on mobile */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Devise :</span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-end text-xs font-bold">
                    {(["XOF", "EUR", "USD", "GBP", "CAD", "NGN", "GHS", "MAD", "TND", "DZD", "ZAR", "AED", "CHF"] as CurrencyType[]).map((c, i) => (
                      <React.Fragment key={c}>
                        {i > 0 && <span className="text-slate-200">|</span>}
                        <button
                          onClick={() => setCurrency(c)}
                          className={`hover:text-[#233D8C] cursor-pointer transition-colors ${currency === c ? "text-[#233D8C] font-black" : "text-slate-400 font-medium"}`}
                        >
                          {c === "XOF" ? "CFA" : c}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8 text-slate-400">
                  <div className="flex items-center gap-8">
                    <Phone className="w-5 h-5 hover:text-[#233D8C] transition-colors cursor-pointer" />
                    <Mail className="w-5 h-5 hover:text-[#233D8C] transition-colors cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <button onClick={() => switchLanguage("fr")} className={`hover:text-[#233D8C] cursor-pointer ${currentLang === "fr" ? "text-[#233D8C] font-black" : "text-slate-400"}`}>FR</button>
                    <span className="text-slate-300">|</span>
                    <button onClick={() => switchLanguage("en")} className={`hover:text-[#233D8C] cursor-pointer ${currentLang === "en" ? "text-[#233D8C] font-black" : "text-slate-400"}`}>EN</button>
                  </div>
                </div>

                <Link
                  href="/apartments"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#233D8C] text-white py-5 rounded-sm font-semibold text-xs capitalize tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-[#1a2d6a] transition-all"
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
