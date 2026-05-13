"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/client";
import { 
  Calendar, Users, ArrowRight, MapPin, Phone, Mail, Globe, 
  ChevronDown, Star, ShieldCheck, Zap, Waves, Layout, 
  Quote, CheckCircle2, User, Menu, X, ChevronRight
} from "lucide-react";

export default function Home() {
  const { t, i18n } = useTranslation();
  
  // Local state for the dropdown UI, initialized with i18n.language
  const [currentLang, setCurrentLang] = useState(i18n.language || "fr");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Sync local state when i18n language changes
  useEffect(() => {
    if (i18n.language && i18n.language !== currentLang) {
      setCurrentLang(i18n.language);
    }
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    setLangMenuOpen(false);
  };

  const menuItems = [
    { 
      label: t('Navigation.apartments'), 
      id: "appartements",
      links: [
        { label: t('Navigation.viewAll'), href: "/appartements" },
        { label: t('Navigation.checkAvail'), href: "/appartements" }
      ]
    },
    { 
      label: t('Navigation.experience'), 
      id: "experience",
      links: [
        { label: t('Navigation.whyUs'), href: "/experience" },
        { label: t('Navigation.gallery'), href: "/experience" },
        { label: t('Navigation.reviews'), href: "/experience" }
      ]
    },
    { 
      label: t('Navigation.infos'), 
      id: "infos",
      links: [
        { label: t('Navigation.map'), href: "/infos" },
        { label: t('Navigation.offers'), href: "/infos" },
        { label: t('Navigation.business'), href: "/infos" },
        { label: t('Navigation.partners'), href: "/infos" }
      ]
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  } as const;

  return (
    <div className="relative min-h-screen bg-white selection:bg-[#233D8C] selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. NAVIGATION */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-16 ${
          isScrolled ? "bg-white py-2 shadow-xl border-b border-slate-100" : "bg-transparent py-3"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/icon.png"
              alt="Logo"
              width={80}
              height={80}
              className={`h-5 md:h-7 w-auto transition-all duration-500 ${isScrolled ? "brightness-100" : "brightness-0 invert"}`}
              style={{ height: "auto" }}
              priority
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${
            isScrolled ? "text-slate-600" : "text-white"
          }`}>
            <a href="#" className="hover:text-[#233D8C] transition-colors">{t('Navigation.home')}</a>
            
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="relative h-full py-4 cursor-pointer"
                onMouseEnter={() => setActiveMenu(item.id)}
              >
                <div className="flex items-center gap-2 hover:text-[#233D8C] transition-colors">
                  {item.label}
                  <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === item.id ? "rotate-180" : ""}`} />
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
                          <Link key={link.label} href={link.href} className="hover:text-[#233D8C] transition-all whitespace-nowrap">
                            {link.label}
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
            <div 
              className="relative py-4 cursor-pointer"
              onMouseEnter={() => setLangMenuOpen(true)}
              onMouseLeave={() => setLangMenuOpen(false)}
            >
              <div className="flex items-center gap-2 hover:text-[#233D8C] transition-colors uppercase">
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang}</span>
              </div>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-sm p-3 min-w-[80px] border border-slate-100"
                  >
                    <div className="flex flex-col gap-3 text-slate-900 tracking-widest text-[10px] font-black">
                      <button onClick={() => switchLanguage("fr")} className={`hover:text-[#233D8C] text-left ${currentLang === "fr" ? "text-[#233D8C]" : ""}`}>FR</button>
                      <button onClick={() => switchLanguage("en")} className={`hover:text-[#233D8C] text-left ${currentLang === "en" ? "text-[#233D8C]" : ""}`}>EN</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:block bg-[#233D8C] text-white px-6 py-2.5 rounded-sm text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-black shadow-lg">
              {t('Navigation.book')}
            </button>
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
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[200] bg-white p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/icon.png" alt="Logo" width={180} height={60} className="h-10 w-auto" style={{ height: "auto" }} />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-10">
              <a href="#" className="text-3xl font-serif text-slate-900">{t('Navigation.home')}</a>
              {menuItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#233D8C]">{item.label}</span>
                  <div className="flex flex-col gap-4 pl-4 border-l border-slate-100">
                    {item.links.map((link) => (
                      <Link key={link.label} href={link.href} className="text-lg text-slate-700 font-light flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                        {link.label} <ChevronRight className="w-4 h-4 text-slate-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-12 pt-12 border-t border-slate-100">
                <button className="w-full bg-[#233D8C] text-white py-6 rounded-sm font-black text-xs uppercase tracking-[0.3em]">
                  {t('Navigation.book')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO */}
      <section className="relative h-screen w-full flex flex-col items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 12 }} className="relative w-full h-full">
            <Image src="/hero.png" alt="Hero" fill className="object-cover" sizes="100vw" priority />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </div>
        <div className="relative z-20 text-center text-white px-6 pt-48 md:pt-56">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.9] tracking-tighter mb-12">
              {t('Index.hero.title')} <br /><span className="italic">{t('Index.hero.italic')}</span>
            </h1>
            <div className="w-16 h-[1px] bg-white/60 mx-auto mb-12" />
            <p className="max-w-xl mx-auto text-[10px] font-black uppercase tracking-[0.4em] text-white/80 mb-12">
              {t('Index.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. WIDGET */}
      <motion.div 
        className="relative z-40 -mt-12 px-6"
        whileHover="hover"
        initial="initial"
      >
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col lg:flex-row border border-slate-100 relative">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
            {[
              { label: t('Index.booking.arrival'), icon: <Calendar className="w-4 h-4" />, val: t('Index.booking.choose') },
              { label: t('Index.booking.departure'), icon: <Calendar className="w-4 h-4" />, val: t('Index.booking.choose') },
              { label: t('Index.booking.guests'), icon: <Users className="w-4 h-4" />, val: t('Index.booking.persons') }
            ].map((field, i) => (
              <motion.div 
                key={i} 
                whileHover="hover"
                initial="initial"
                className="relative px-10 py-8 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 text-[#233D8C] mb-2">
                  {field.icon} <span className="text-[10px] font-black uppercase tracking-widest">{field.label}</span>
                </div>
                <span className="text-slate-900 font-serif text-xl">{field.val}</span>
                
                {/* Barre individuelle pour cette case */}
                <motion.div 
                  variants={{
                    initial: { width: 0 },
                    hover: { width: "100%" }
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 h-[3px] bg-[#233D8C] z-10"
                />
              </motion.div>
            ))}
          </div>
          
          <motion.button 
            whileHover="hover"
            initial="initial"
            className="relative bg-[#233D8C] text-white px-12 py-8 lg:py-0 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all flex-shrink-0"
          >
            {t('Index.booking.check')}
            
            {/* Barre spécifique pour le bouton */}
            <motion.div 
              variants={{
                initial: { width: 0 },
                hover: { width: "100%" }
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 h-[3px] bg-white z-10"
            />
          </motion.button>
        </div>
      </motion.div>

      {/* 4. ABOUT */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeIn}>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">{t('Index.about.badge')}</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight mb-8 text-slate-900">
              {t('Index.about.title')} <span className="italic">{t('Index.about.italic')}</span>
            </h2>
            <p className="text-slate-900 font-serif text-xl italic mb-6 leading-relaxed">"{t('Index.about.quote')}"</p>
            <p className="text-slate-700 font-normal leading-relaxed mb-10 text-lg">{t('Index.about.text')}</p>
            <button className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
              {t('Index.about.cta')} <div className="w-8 h-px bg-slate-900 group-hover:w-12 transition-all" />
            </button>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl"><Image src="/exterior.png" alt="Exterior" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl mt-12"><Image src="/room.png" alt="Room" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
          </div>
        </div>
      </section>

      {/* 5. AMENITIES */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-4">Le Confort Absolu</span>
            <h2 className="text-4xl font-serif font-light">Équipements Signature</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Layout className="w-8 h-8" />, label: "Rooftop Lounge", desc: "Vue panoramique sur la ville" },
              { icon: <Waves className="w-8 h-8" />, label: "Piscine Privée", desc: "Détente & sérénité assurées" },
              { icon: <Users className="w-8 h-8" />, label: "Conciergerie 24/7", desc: "Un service attentif et discret" },
              { icon: <Zap className="w-8 h-8" />, label: "Autonomie Totale", desc: "Groupe électrogène & fibre haut débit" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#233D8C] mb-6 shadow-sm border border-slate-100 group-hover:bg-[#233D8C] group-hover:text-white transition-all">{item.icon}</div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-2">{item.label}</h3>
                <p className="text-xs text-slate-500 font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. APARTMENTS */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">Collections</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light">Une Signature pour chaque séjour.</h2>
          </div>
          <button className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-slate-900 pb-2">Voir tous nos appartements</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { img: "/living.png", title: "Suite Royale", price: "À partir de 150.000 FCFA" },
            { img: "/room.png", title: "Appartement Executive", price: "À partir de 120.000 FCFA" },
            { img: "/hero.png", title: "Studio Premium", price: "À partir de 80.000 FCFA" }
          ].map((apt, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-6">
                <Image src={apt.img} alt={apt.title} fill className="object-cover group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
              </div>
              <h3 className="text-lg font-serif text-slate-900 mb-1">{apt.title}</h3>
              <p className="text-xs text-slate-500 font-black uppercase tracking-widest">{apt.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REVIEWS (PREMIUM STYLE) */}
      <section className="bg-slate-900 text-white py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-32 items-center">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-6 mb-12">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-3xl font-serif border-l border-white/20 pl-6">4.9/5</span>
              </div>
              <h2 className="text-5xl font-serif font-light mb-12 leading-tight text-white/90">L'expérience vécue par nos hôtes.</h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
                La satisfaction de nos résidents est notre plus grande ferté.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { name: "Marc Traoré", text: "Une expérience incroyable. Le personnel est aux petits soins et le cadre est tout simplement sublime.", role: "CEO Tech Africa" },
                { name: "Sarah Lawson", text: "Sécurité et confort au top. On se sent vraiment comme chez soi avec les services d'un palace.", role: "Architecte" }
              ].map((review, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="bg-white/[0.03] p-12 border border-white/10 rounded-sm hover:bg-white/[0.05] transition-colors"
                >
                  <Quote className="w-10 h-10 text-[#233D8C] mb-10 opacity-50" />
                  <p className="text-xl font-serif font-light leading-relaxed mb-12 italic text-white/80">
                    "{review.text}"
                  </p>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white mb-2">{review.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#233D8C]">{review.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <Link href="/">
              <Image src="/icon.png" alt="Logo" width={240} height={80} className="h-16 md:h-20 w-auto mb-10" style={{ height: "auto" }} />
            </Link>
            <p className="text-slate-800 font-normal text-base leading-relaxed">
              L'excellence hôtelière au Bénin. <br />
              Une expérience unique pour vos séjours d'affaires et de loisirs à Cotonou.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#233D8C]">Contactez-nous</span>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4 text-slate-900"><MapPin className="w-6 h-6 text-[#233D8C]" /><span className="text-sm">Cotonou, Bénin</span></div>
                <div className="flex items-center gap-4 text-slate-900"><Phone className="w-6 h-6 text-[#233D8C]" /><span className="text-sm">+229 XX XX XX XX</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12 border-t border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
          &copy; 2026 Résidence La Croisière — Tous droits réservés
        </div>
      </footer>
    </div>
  );
}
