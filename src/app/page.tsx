"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Users, ArrowRight, MapPin, Phone, Mail, Globe, 
  ChevronDown, Star, ShieldCheck, Zap, Waves, Layout, 
  Quote, CheckCircle2, User, Menu, X, ChevronRight
} from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    
    // Vérification initiale au chargement pour éviter la disparition au rafraîchissement
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { 
      label: "Nos appartements", 
      id: "appartements",
      links: [
        { label: "Voir tous les appartements", href: "/appartements" },
        { label: "Vérifier les disponibilités", href: "/appartements" }
      ]
    },
    { 
      label: "Expérience", 
      id: "experience",
      links: [
        { label: "Pourquoi nous choisir", href: "/experience" },
        { label: "Galerie Photos", href: "/experience" },
        { label: "Avis Clients", href: "/experience" }
      ]
    },
    { 
      label: "Infos pratiques", 
      id: "infos",
      links: [
        { label: "Carte & Repères", href: "/infos" },
        { label: "Nos Offres", href: "/infos" },
        { label: "Espace Entreprises", href: "/infos" },
        { label: "Nos Partenaires", href: "/infos" }
      ]
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

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
          <div className="flex items-center">
            <Image
              src="/icon.png"
              alt="Logo"
              width={80}
              height={80}
              className={`h-5 md:h-7 w-auto transition-all duration-500 ${isScrolled ? "brightness-100" : "brightness-0 invert"}`}
              style={{ height: "auto" }}
              priority
            />
          </div>
          
          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${
            isScrolled ? "text-slate-600" : "text-white"
          }`}>
            <a href="#" className="hover:text-[#233D8C] transition-colors">Accueil</a>
            
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
              Mon Espace
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:block bg-[#233D8C] text-white px-6 py-2.5 rounded-sm text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-black shadow-lg">
              Réserver
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
              <Image src="/icon.png" alt="Logo" width={180} height={60} className="h-10 w-auto" style={{ height: "auto" }} />
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-10">
              <a href="#" className="text-3xl font-serif text-slate-900">Accueil</a>
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
                  Réserver
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
              Votre appartement <br /><span className="italic">d'exception au Bénin.</span>
            </h1>
            <div className="w-16 h-[1px] bg-white/60 mx-auto mb-12" />
            <p className="max-w-xl mx-auto text-[10px] font-black uppercase tracking-[0.4em] text-white/80 mb-12">
              Le prestige résidentiel à Cotonou.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. WIDGET */}
      <div className="relative z-40 -mt-12 px-6">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col lg:flex-row border border-slate-100">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
            {[
              { label: "Arrivée", icon: <Calendar className="w-4 h-4" />, val: "Choisir une date" },
              { label: "Départ", icon: <Calendar className="w-4 h-4" />, val: "Choisir une date" },
              { label: "Voyageurs", icon: <Users className="w-4 h-4" />, val: "2 Personnes" }
            ].map((field, i) => (
              <div key={i} className="px-10 py-8 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 text-[#233D8C] mb-2">
                  {field.icon} <span className="text-[10px] font-black uppercase tracking-widest">{field.label}</span>
                </div>
                <span className="text-slate-900 font-serif text-xl">{field.val}</span>
              </div>
            ))}
          </div>
          <button className="bg-[#233D8C] text-white px-12 py-8 lg:py-0 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all">
            Vérifier la Disponibilité
          </button>
        </div>
      </div>

      {/* 4. ABOUT */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeIn}>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">Héritage & Vision</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight mb-8 text-slate-900">L'art de vivre à la Croisière.</h2>
            <p className="text-slate-900 font-serif text-xl italic mb-6 leading-relaxed">"L'intimité d'un chez-soi, le raffinement d'un service 4 étoiles."</p>
            <p className="text-slate-700 font-normal leading-relaxed mb-10 text-lg">La Résidence La Croisière est une escale de prestige composée de 14 unités uniques au cœur de Cotonou. Elle offre un cadre sécurisé et luxueux pour les voyageurs d'affaires et de loisirs. Notre ambition est de redéfinir l'hospitalité au Bénin en alliant modernité architecturale et chaleur humaine.</p>
            <button className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
              En savoir plus sur nous <div className="w-8 h-px bg-slate-900 group-hover:w-12 transition-all" />
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

      {/* 7. REVIEWS */}
      <section className="bg-[#233D8C] text-white py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-6"><div className="flex text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}</div><span className="text-2xl font-serif">4.9 / 5</span></div>
              <h2 className="text-4xl font-serif font-light mb-8">Ce que nos hôtes disent de nous.</h2>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Marc T.", text: "Une expérience incroyable. Le personnel est aux petits soins." },
                { name: "Sarah L.", text: "Sécurité et confort au top." },
                { name: "Jean-Philippe", text: "On se sent comme à la maison." }
              ].map((review, i) => (
                <div key={i} className="bg-white/5 p-8 border border-white/10 rounded-sm">
                  <Quote className="w-8 h-8 text-white/20 mb-6" />
                  <p className="text-sm font-light leading-relaxed mb-8 italic">"{review.text}"</p>
                  <span className="text-[10px] font-black uppercase tracking-widest">{review.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <Image src="/icon.png" alt="Logo" width={240} height={80} className="h-16 md:h-20 w-auto mb-10" style={{ height: "auto" }} />
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
