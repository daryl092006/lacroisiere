"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/client";
import { fetchApprovedReviews, type Review } from "@/lib/contentService";
import { useCurrency } from "@/context/CurrencyContext";
import {
  Calendar, Users, ArrowRight, MapPin, Phone, Mail, Globe,
  ChevronDown, Star, ShieldCheck, Zap, Waves, Layout,
  Quote, CheckCircle2, User, Menu, X, ChevronRight, ChevronLeft,
  Sun, Wind, Utensils, Sparkles
} from "lucide-react";

const ROOFTOP_IMAGES = [
  "/Rooftop Jour.pdf_9.jpg",
  "/Rooftop Jour.pdf_9 (1).jpg",
  "/Rooftop Jour.pdf_9 (2).jpg",
  "/Rooftop Jour.pdf_9 (3).jpg",
  "/Rooftop Jour.pdf_9 (4).jpg",
  "/Rooftop Jour.pdf_9 (5).jpg",
  "/Rooftop Jour.pdf_9 (6).jpg",
  "/Rooftop Jour.pdf_9 (8).jpg",
];

function RooftopSection() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + ROOFTOP_IMAGES.length) % ROOFTOP_IMAGES.length);
  const next = () => setIdx((i) => (i + 1) % ROOFTOP_IMAGES.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FEATURES = [
    { icon: Sun,       label: "Vue panoramique 360°",     desc: "Depuis le sommet, embrassez toute la ville et l'horizon de l'Atlantique." },
    { icon: Utensils,  label: "Bar & Cuisine en plein air", desc: "Cocktails signature, snacking gastronomique et soirées thématiques." },
    { icon: Wind,      label: "Terrasse lounge",            desc: "Transats, bain à remous et espace détente sous les étoiles." },
    { icon: Sparkles,  label: "Privatisation disponible",   desc: "Événements privés, mariages, séminaires en altitude." },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* ── Full-bleed photo ── */}
      <div className="relative h-[80vh] min-h-[560px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={ROOFTOP_IMAGES[idx]}
              alt={`Rooftop La Croisière ${idx + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* ── Text overlay ── */}
        <div className="absolute inset-0 flex items-center px-8 md:px-20">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 block mb-4"
            >
              Expérience unique · Au sommet
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif italic text-white leading-tight mb-6"
            >
              Le Rooftop
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-sm"
            >
              Au dernier étage de la résidence, un espace suspendu entre ciel et ville — panorama époustouflant, bar lounge et terrasse privatisable.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/experience"
                className="bg-white text-slate-900 px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.25em] hover:bg-[#233D8C] hover:text-white transition-all shadow-2xl"
              >
                Découvrir l'expérience
              </Link>
              <Link
                href="/gallery"
                className="border border-white/40 text-white px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.25em] hover:border-white hover:bg-white/10 transition-all"
              >
                Voir la galerie
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Slider controls ── */}
        <div className="absolute bottom-6 right-8 flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {ROOFTOP_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all ${
                  i === idx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Photo counter ── */}
        <div className="absolute top-6 right-8 text-white/40 text-[11px] font-black tracking-[0.3em]">
          {String(idx + 1).padStart(2, "0")} / {String(ROOFTOP_IMAGES.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Features strip ── */}
      <div className="bg-[#0F1C3F] py-14 px-8 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <div className="text-white font-black text-sm mb-1">{f.label}</div>
                  <div className="text-white/40 text-[12px] font-light leading-relaxed">{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const HERO_IMAGES = [
  "/media__1780420130272.jpg",
  "/media__1780420130290.jpg",
  "/media__1780420130306.jpg",
  "/media__1780420130420.jpg",
  "/media__1780420130445.jpg"
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();

  // Reviews from Supabase
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    fetchApprovedReviews(2).then(setReviews).catch(() => {});
  }, []);

  // Hero Slideshow State
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Booking State
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [arrivalInput, setArrivalInput] = useState("");
  const [departureInput, setDepartureInput] = useState("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [activeTab, setActiveTab] = useState<"arrival" | "departure" | "guests" | null>(null);

  // Dynamic Popover Positioning
  const [popoverPosition, setPopoverPosition] = useState<"top" | "bottom">("bottom");
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (activeTab && widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        // Popover needs ~450px. If not enough space below, but space exists above -> open UP
        if (spaceBelow < 450 && rect.top > spaceBelow) {
          setPopoverPosition("top");
        } else {
          setPopoverPosition("bottom");
        }
      }
    };

    updatePosition();

    if (activeTab) {
      window.addEventListener("scroll", updatePosition, { passive: true });
      window.addEventListener("resize", updatePosition, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [activeTab]);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  } as const;

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#233D8C] selection:text-white font-sans overflow-x-hidden transition-colors duration-300">

      {/* 2. HERO */}
      {/* ⚠️ NE SOUS AUCUN PRÉTEXTE MODIFIER CE BLOC HERO : Les dimensions (h-screen), l'overlay (bg-black/40) et les animations d'introduction sont validés définitivement. */}
      <section className="relative h-screen w-full flex flex-col items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroImageIndex}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2, ease: "easeInOut" },
                scale: { duration: 6, ease: "linear" }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={HERO_IMAGES[heroImageIndex]}
                alt={`Hero ${heroImageIndex}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        <div className="relative z-20 text-center text-white px-6 pt-56 md:pt-72">
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

      {/* 3. WIDGET — LUXURY WHITE & CENTERED CARD */}
      <div className="hidden lg:block relative z-40 -mt-16 px-6" ref={widgetRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md shadow-[0_32px_96px_rgba(0,0,0,0.16)] border-t-[3px] border-[#233D8C] border-x border-b border-slate-100 relative"
          data-booking-widget
        >
          <div className="flex flex-row items-stretch">
            {/* FIELD 1: ARRIVAL */}
            <div className="relative flex-1 group">
              <div
                onClick={() => setActiveTab('arrival')}
                className={`px-10 py-7 border-r border-slate-100 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer h-full flex flex-col justify-center ${activeTab === 'arrival' ? 'bg-slate-50' : ''}`}
              >
                <div className="flex items-center gap-2 text-[#233D8C] mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t('Index.booking.arrival')}</span>
                </div>
                <div className={`font-normal text-sm transition-colors ${!arrivalDate ? 'text-slate-400' : 'text-slate-900 group-hover:text-[#233D8C]'}`}>
                  {arrivalInput || t('Index.booking.choose')}
                </div>
                <motion.div
                  animate={{ scaleX: activeTab === 'arrival' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#233D8C] origin-left"
                />
              </div>

              {/* CALENDAR POPOVER - Beautiful centered double calendar */}
              {/* ⚠️ NE SOUS AUCUN PRÉTEXTE MODIFIER CE BLOC CALENDRIER : La logique de basculement dynamique (top/bottom) au défilement et la croix de fermeture ont été validées pour l'UX. */}
              <AnimatePresence>
                {(activeTab === 'arrival' || activeTab === 'departure') && (
                  <motion.div
                    initial={{ opacity: 0, y: popoverPosition === 'top' ? -15 : 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: popoverPosition === 'top' ? -15 : 15 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute left-0 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] p-8 z-[100] rounded-sm w-[720px] border border-slate-100 ${popoverPosition === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
                      }`}
                  >
                    {/* NAVIGATION & CLOSE HEADER */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const now = new Date();
                            const minDate = new Date(now.getFullYear(), now.getMonth(), 1);
                            const prevDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
                            if (prevDate >= minDate) {
                              setViewDate(prevDate);
                            }
                          }}
                          disabled={new Date(viewDate.getFullYear(), viewDate.getMonth(), 1) <= new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                          className="p-1.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-[#233D8C] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed border border-slate-100"
                          aria-label="Mois précédent"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
                          }}
                          className="p-1.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-[#233D8C] transition-colors cursor-pointer border border-slate-100"
                          aria-label="Mois suivant"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveTab(null); }}
                        className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-[#233D8C] transition-colors cursor-pointer"
                        aria-label="Fermer le calendrier"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex gap-10">
                      {[0, 1].map((offset) => {
                        const monthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
                        const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                        const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
                        const startDay = (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay() + 6) % 7;
                        const today = new Date(); today.setHours(0, 0, 0, 0);

                        return (
                          <div key={offset} className="flex-1">
                            <h4 className="text-center font-serif italic text-slate-800 text-base mb-5 capitalize">{monthName}</h4>
                            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black text-slate-400 mb-3 px-1">
                              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, idx) => <div key={idx}>{d}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-y-1">
                              {[...Array(startDay)].map((_, i) => <div key={`empty-${i}`} />)}
                              {[...Array(daysInMonth)].map((_, i) => {
                                const day = i + 1;
                                const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
                                const isPast = date < today;
                                const isArrival = arrivalDate?.toDateString() === date.toDateString();
                                const isDeparture = departureDate?.toDateString() === date.toDateString();
                                const isSelected = isArrival || isDeparture;
                                const effectiveDeparture = departureDate || (activeTab === "departure" ? hoveredDate : null);
                                const isInRange = arrivalDate && effectiveDeparture && (
                                  (date > arrivalDate && date < effectiveDeparture) ||
                                  (date < arrivalDate && date > effectiveDeparture)
                                );
                                return (
                                  <button
                                    key={i}
                                    disabled={isPast}
                                    onMouseEnter={() => !isPast && setHoveredDate(date)}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (isPast) return;
                                      if (!arrivalDate || (arrivalDate && departureDate)) {
                                        setArrivalDate(date);
                                        setArrivalInput(date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }));
                                        setDepartureDate(null);
                                        setDepartureInput("");
                                        setActiveTab("departure");
                                      } else if (date.getTime() === arrivalDate.getTime()) {
                                        setArrivalDate(null);
                                        setArrivalInput("");
                                      } else if (date < arrivalDate) {
                                        setArrivalDate(date);
                                        setArrivalInput(date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }));
                                      } else {
                                        setDepartureDate(date);
                                        setDepartureInput(date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }));
                                        setActiveTab(null);
                                      }
                                    }}
                                    className={`relative h-9 w-full text-xs transition-all flex items-center justify-center font-medium
                                      ${isPast ? 'text-slate-200 cursor-not-allowed' : 'text-slate-700 cursor-pointer'} 
                                      ${isSelected ? 'bg-[#233D8C] text-white font-black rounded-sm' : ''} 
                                      ${isInRange && !isSelected ? 'bg-[#233D8C]/10 text-[#233D8C]' : ''}
                                      ${!isSelected && !isInRange && !isPast ? 'hover:bg-slate-100 hover:text-slate-900' : ''}
                                    `}
                                  >
                                    <span className="relative z-10">{day}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#233D8C]">
                        {arrivalDate && departureDate
                          ? `${Math.round((departureDate.getTime() - arrivalDate.getTime()) / 86400000)} nuit${Math.round((departureDate.getTime() - arrivalDate.getTime()) / 86400000) > 1 ? 's' : ''} sélectionnée${Math.round((departureDate.getTime() - arrivalDate.getTime()) / 86400000) > 1 ? 's' : ''}`
                          : activeTab === 'arrival' ? 'Sélectionnez votre date d\'arrivée' : 'Sélectionnez votre date de départ'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setArrivalDate(null); setDepartureDate(null); setArrivalInput(''); setDepartureInput(''); }}
                        className="text-sm font-normal text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        Effacer
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FIELD 2: DEPARTURE */}
            <div className="relative flex-1 group">
              <div
                onClick={() => setActiveTab('departure')}
                className={`px-10 py-7 border-r border-slate-100 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer h-full flex flex-col justify-center ${activeTab === 'departure' ? 'bg-slate-50' : ''}`}
              >
                <div className="flex items-center gap-2 text-[#233D8C] mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t('Index.booking.departure')}</span>
                </div>
                <div className={`font-normal text-sm transition-colors ${!departureDate ? 'text-slate-400' : 'text-slate-900 group-hover:text-[#233D8C]'}`}>
                  {departureInput || t('Index.booking.choose')}
                </div>
                <motion.div
                  animate={{ scaleX: activeTab === 'departure' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#233D8C] origin-left"
                />
              </div>
            </div>

            {/* FIELD 3: GUESTS */}
            <div className="relative flex-1 group">
              <div
                onClick={() => setActiveTab('guests')}
                className={`px-10 py-7 border-r border-slate-100 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer h-full flex flex-col justify-center ${activeTab === 'guests' ? 'bg-slate-50' : ''}`}
              >
                <div className="flex items-center gap-2 text-[#233D8C] mb-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t('Index.booking.guests')}</span>
                </div>
                <div className="font-normal text-sm text-slate-900 group-hover:text-[#233D8C] transition-colors">
                  {adults + children} {t('Index.booking.persons')}{infants > 0 ? `, ${infants} bébés` : ""}
                </div>
                <motion.div
                  animate={{ scaleX: activeTab === 'guests' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#233D8C] origin-left"
                />
              </div>

              {/* GUESTS POPOVER */}
              <AnimatePresence>
                {activeTab === 'guests' && (
                  <motion.div
                    initial={{ opacity: 0, y: popoverPosition === 'top' ? -15 : 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: popoverPosition === 'top' ? -15 : 15 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute right-0 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] p-8 z-[100] rounded-sm w-[350px] border border-slate-100 ${popoverPosition === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
                      }`}
                  >
                    {/* CLOSE BUTTON */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveTab(null); }}
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-[#233D8C] transition-colors cursor-pointer"
                      aria-label="Fermer les voyageurs"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="space-y-5 mt-2">
                      {[
                        { id: 'adults', label: 'Adultes', sub: '13 ans et plus', count: adults, setter: setAdults, min: 1 },
                        { id: 'children', label: 'Enfants', sub: '2-12 ans', count: children, setter: setChildren, min: 0 },
                        { id: 'infants', label: 'Bébés', sub: '-2 ans', count: infants, setter: setInfants, min: 0 }
                      ].map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                          <div>
                            <span className="block text-sm font-bold text-slate-950 font-serif">{cat.label}</span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black">{cat.sub}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={(e) => { e.stopPropagation(); cat.setter(Math.max(cat.min, cat.count - 1)); }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#233D8C] hover:text-white hover:border-[#233D8C] transition-all font-light text-lg cursor-pointer">-</button>
                            <span className="text-sm font-black w-4 text-center text-slate-900">{cat.count}</span>
                            <button onClick={(e) => { e.stopPropagation(); cat.setter(cat.count + 1); }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#233D8C] hover:text-white hover:border-[#233D8C] transition-all font-light text-lg cursor-pointer">+</button>
                          </div>
                        </div>
                      ))}
                      <button onClick={(e) => { e.stopPropagation(); setActiveTab(null); }} className="w-full bg-[#233D8C] text-white py-3.5 text-xs font-semibold capitalize tracking-[0.15em] hover:bg-black transition-all cursor-pointer">Confirmer</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA BUTTON — FULL HEIGHT SECTION */}
            <Link
              href={`/apartments?arrival=${arrivalDate?.toISOString() || ''}&departure=${departureDate?.toISOString() || ''}&adults=${adults}&children=${children}&infants=${infants}`}
              className="group relative overflow-hidden bg-[#233D8C] text-white px-12 transition-all duration-300 hover:bg-black flex items-center justify-center gap-3 shrink-0"
            >
              <span className="relative z-10 text-xs font-semibold capitalize tracking-[0.15em]">{t('Index.booking.check')}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 4. ABOUT */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">{t('Index.about.badge')}</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight mb-8 text-slate-900">
              {t('Index.about.title')} <span className="italic">{t('Index.about.italic')}</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl font-normal">
              {t('Index.about.text')}
            </p>
            <Link href="/difference" className="group inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-[#233D8C]">
              <span>En savoir plus sur notre philosophie</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl"><Image src="/exterior.png" alt="Exterior" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl mt-12"><Image src="/room.png" alt="Room" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
          </div>
        </div>
      </section>

      {/* 5. ESPACES & SERVICES — Luxury Asymmetrical Layout */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left side: Premium typography & list of services */}
            <div className="lg:col-span-6 space-y-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#233D8C] block mb-4">Services & Équipements</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 leading-[1.15] mb-6">
                  Le confort absolu,<br />
                  <em className="italic text-[#233D8C]">sans aucun compromis.</em>
                </h2>
                <p className="text-slate-500 text-sm font-light leading-relaxed max-w-md">
                  Chaque espace et équipement a été pensé pour vous offrir le raffinement d'un établissement 4 étoiles tout en préservant l'autonomie et l'intimité de votre propre chez-soi.
                </p>
              </div>

              {/* Minimalist Grid of Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 border-t border-slate-100 pt-10">
                {[
                  { icon: Waves, label: "Piscine privée", desc: "Espace de baignade et de détente pour nos seuls résidents." },
                  { icon: Users, label: "Espace Executive", desc: "Salle de réunion équipée de technologie 4K et fibre dédiée." },
                  { icon: Sparkles, label: "Conciergerie", desc: "Chauffeur privé, réservations et services sur-mesure 24/7." },
                  { icon: ShieldCheck, label: "Autonomie 24/7", desc: "Groupe électrogène puissant et réserve d'eau autonome." },
                  { icon: Zap, label: "Fibre optique", desc: "Réseau internet ultra-rapide disponible dans toute la résidence." },
                  { icon: Layout, label: "Parking privé", desc: "Garage intérieur sécurisé par contrôle d'accès numérique." }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#233D8C]/5 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#233D8C]" />
                        </div>
                        <h3 className="font-serif italic text-base text-slate-900">{item.label}</h3>
                      </div>
                      <p className="text-slate-400 text-[12px] font-light leading-relaxed pl-11">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex flex-wrap gap-6 items-center">
                <Link
                  href="/contact?type=meeting-room"
                  className="bg-[#233D8C] text-white px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.25em] hover:bg-black transition-all shadow-lg"
                >
                  Réserver la salle de réunion
                </Link>
                <Link
                  href="/experience"
                  className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-[#233D8C]"
                >
                  <span>Explorer l'expérience complète</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right side: Large Immersive Image collage (Luxury feel) */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/Rooftop Jour.pdf_9 (3).jpg"
                  alt="Espaces Résidence La Croisière"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Floating badge inside the image */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70 block mb-2">Prestige & Business</span>
                  <h4 className="text-xl font-serif italic mb-1">Salle de réunion Silicon Valley</h4>
                  <p className="text-white/60 text-xs font-light">35m² · Écran interactif 85" · Visioconférence 4K</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. APARTMENTS */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">{t('Index.apartments.badge')}</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light">{t('Index.apartments.title')}</h2>
          </div>
          <Link href="/apartments" className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-slate-900 pb-2 hover:text-[#233D8C] hover:border-[#233D8C] transition-colors">{t('Index.apartments.viewAll')}</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { img: "/living.png", title: t('Index.apartments.items.royal.title'), basePrice: 150000 },
            { img: "/room.png", title: t('Index.apartments.items.executive.title'), basePrice: 95000 },
            { img: "/hero.png", title: t('Index.apartments.items.premium.title'), basePrice: 65000 }
          ].map((apt, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-6">
                <Image src={apt.img} alt={apt.title} fill className="object-cover group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
              </div>
              <h3 className="text-lg font-serif text-slate-900 mb-1">{apt.title}</h3>
              <p className="text-xs text-slate-500 font-black uppercase tracking-widest" suppressHydrationWarning>
                {mounted ? (
                  <>
                    {i18n.language === 'en' ? 'From' : 'À partir de'} {formatPrice(apt.basePrice)}
                  </>
                ) : (
                  `À partir de ${apt.basePrice.toLocaleString("fr-FR")} FCFA`
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6.5. GALLERY PREVIEW */}
      <section className="bg-white py-32 text-slate-900 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">Immersion Visuelle</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900">Découvrez nos espaces en images.</h2>
            </div>
            <Link href="/gallery" className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-[#233D8C] pb-2 text-[#233D8C] hover:text-black hover:border-black transition-colors">
              Ouvrir la galerie
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square relative rounded-sm overflow-hidden group"><Image src="/living.png" alt="Gallery 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" /></div>
            <div className="aspect-square relative rounded-sm overflow-hidden group"><Image src="/room.png" alt="Gallery 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" /></div>
            <div className="aspect-square relative rounded-sm overflow-hidden group hidden md:block"><Image src="/exterior.png" alt="Gallery 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" /></div>
            <div className="aspect-square relative rounded-sm overflow-hidden group hidden md:block"><Image src="/hero.png" alt="Gallery 4" fill className="object-cover group-hover:scale-110 transition-transform duration-700" /></div>
          </div>
        </div>
      </section>

      {/* ═══ ROOFTOP SECTION ═══ */}
      <RooftopSection />

      {/* 7. REVIEWS (PREMIUM STYLE) */}
      <section className="bg-slate-50 text-slate-900 py-40 relative overflow-hidden border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-32 items-center">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-6 mb-12">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-3xl font-serif border-l border-slate-200 pl-6">4.9/5</span>
              </div>
              <h2 className="text-5xl font-serif font-light mb-12 leading-tight text-slate-900">{t('Index.reviews.title')}</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light mb-10">
                {t('Index.reviews.subtitle')}
              </p>
              <Link href="/reviews" className="inline-flex items-center gap-4 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-sm font-black text-[10px] uppercase tracking-[0.2em] transition-colors border border-slate-200 shadow-sm">
                Lire le Livre d'Or
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
              {(reviews && reviews.length > 0
                ? reviews.slice(0, 2).map((r) => ({ name: r.author_name, text: r.content_fr, role: r.author_role || '' }))
                : [
                    { name: t('Index.reviews.items.marc.name'), text: t('Index.reviews.items.marc.text'), role: t('Index.reviews.items.marc.role') },
                    { name: t('Index.reviews.items.sarah.name'), text: t('Index.reviews.items.sarah.text'), role: t('Index.reviews.items.sarah.role') }
                  ]
              ).map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="bg-white p-12 border border-slate-100 rounded-sm hover:shadow-md transition-all duration-300"
                >
                  <Quote className="w-10 h-10 text-[#233D8C]/20 mb-10" />
                  <p className="text-xl font-serif font-light leading-relaxed mb-12 italic text-slate-700">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-950 mb-2">{review.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#233D8C]">{review.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. LOCATION PREVIEW */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square md:aspect-video lg:aspect-square relative rounded-sm overflow-hidden bg-slate-100 flex items-center justify-center">
              {/* Map placeholder or actual map image */}
              <Image src="/exterior.png" alt="Map Location" fill className="object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#233D8C] text-white rounded-full flex items-center justify-center shadow-2xl">
                  <MapPin className="w-8 h-8" />
                </div>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">Emplacement Idéal</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-8 leading-tight">Au cœur de Cotonou,<br />proche de l'essentiel.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light">
                Située dans l'un des quartiers les plus prisés, la Résidence La Croisière vous offre un accès rapide aux centres d'affaires, aux restaurants gastronomiques et aux plages.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center justify-between border-b border-slate-100 pb-2"><span className="text-sm font-bold text-slate-900">Aéroport International</span><span className="text-xs text-slate-500 uppercase tracking-widest">15 min</span></li>
                <li className="flex items-center justify-between border-b border-slate-100 pb-2"><span className="text-sm font-bold text-slate-900">Centre Ville</span><span className="text-xs text-slate-500 uppercase tracking-widest">5 min</span></li>
                <li className="flex items-center justify-between border-b border-slate-100 pb-2"><span className="text-sm font-bold text-slate-900">Plage Fidjrossè</span><span className="text-xs text-slate-500 uppercase tracking-widest">10 min</span></li>
              </ul>
              <Link href="/location" className="inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-sm font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#233D8C] transition-colors">
                Voir la carte détaillée
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 8. SPECIAL OFFERS */}
      <section className="bg-slate-50 py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">{t('Index.offers.badge')}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900">{t('Index.offers.title')}</h2>
            </div>
            <Link href="/offers" className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-slate-900 pb-2 hover:text-[#233D8C] hover:border-[#233D8C] transition-colors">
              Voir toutes nos offres
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              {...fadeIn}
              className="bg-white p-12 rounded-sm shadow-sm border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-serif text-slate-900 mb-4">{t('Index.offers.items.longstay.title')}</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-8">{t('Index.offers.items.longstay.desc')}</p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest w-fit hover:bg-[#233D8C] transition-colors">
                {t('Index.offers.items.longstay.cta')}
              </button>
            </motion.div>
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-white p-12 rounded-sm shadow-sm border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-serif text-slate-900 mb-4">{t('Index.offers.items.weekend.title')}</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-8">{t('Index.offers.items.weekend.desc')}</p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest w-fit hover:bg-[#233D8C] transition-colors">
                {t('Index.offers.items.weekend.cta')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8.2. CONCIERGERIE & SERVICES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-6 block">L'Art de Recevoir</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-8 leading-tight">Conciergerie <br />& Services Exclusifs.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light">
                À La Croisière, votre confort est notre seule priorité. Notre équipe dédiée est à votre entière disposition pour anticiper le moindre de vos désirs et transformer votre séjour en une expérience inoubliable.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="border-l-2 border-[#233D8C] pl-4">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Chauffeur Privé</h4>
                  <p className="text-xs text-slate-500">Transferts aéroport & ville</p>
                </div>
                <div className="border-l-2 border-[#233D8C] pl-4">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Chef à Domicile</h4>
                  <p className="text-xs text-slate-500">Gastronomie sur-mesure</p>
                </div>
                <div className="border-l-2 border-[#233D8C] pl-4">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Bien-être</h4>
                  <p className="text-xs text-slate-500">Massages & Soins en chambre</p>
                </div>
                <div className="border-l-2 border-[#233D8C] pl-4">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Excursions</h4>
                  <p className="text-xs text-slate-500">Découverte du Bénin</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 aspect-square relative rounded-sm overflow-hidden shadow-2xl">
              <Image src="/living.png" alt="Conciergerie" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-[#233D8C]/10 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* 8.5. CORPORATE & PARTNERS PREVIEW */}
      <section className="py-32 bg-[#233D8C] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/exterior.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-6 block">B2B, Entreprises & Institutions</span>
          <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">Devenez partenaire privilégié.</h2>
          <p className="text-blue-100 text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Vous cherchez un pied-à-terre de haut standing régulier pour vos cadres dirigeants, vos délégations ou vos expatriés à Cotonou ? Bénéficiez de nos tarifs négociés, d'une facturation centralisée et d'une discrétion absolue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/corporate" className="inline-flex items-center justify-center gap-4 bg-white text-[#233D8C] px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-100 transition-colors w-full sm:w-auto">
              Découvrir nos offres B2B
            </Link>
            <Link href="/partners" className="inline-flex items-center justify-center gap-4 bg-transparent border border-white/30 text-white px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-colors w-full sm:w-auto">
              Réseau de partenaires
            </Link>
          </div>
        </div>
      </section>

      {/* 9. PARTNERS */}
      {/* ⚠️ NE SOUS AUCUN PRÉTEXTE MODIFIER CETTE SECTION "PARTENAIRES" : Le carrousel infini (marquee) avec les icônes svg/png et ses animations sont verrouillés dans la charte visuelle officielle. */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16">
          <div className="text-center">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#233D8C] mb-4">{t('Index.partners.title')}</h2>
            <div className="w-12 h-px bg-slate-200 mx-auto mb-4" />
            <p className="text-sm text-slate-600 uppercase tracking-[0.2em] font-light">{t('Index.partners.subtitle')}</p>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden py-10">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center gap-20 whitespace-nowrap min-w-max px-10"
          >
            {[
              { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg", h: 50 },
              { name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Booking.com_Logo.svg", h: 45 },
              { name: "Expedia", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Expedia_Logo_2023.svg", h: 50 },
              { name: "Numerica", logo: "https://numericacenter.com/wp-content/themes/numericacenter/images/logo-Numerica-center.png", h: 100 },
              { name: "ESCEN", logo: "https://escen.university/wa_res/images/normal/LOGO_ESCEN_(2).png?t=b1b2f445_e288_4b56_b229_ee53aef7a2fb", h: 120 },
              // Duplication pour le loop infini
              { name: "Airbnb 2", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg", h: 50 },
              { name: "Booking.com 2", logo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Booking.com_Logo.svg", h: 45 },
              { name: "Expedia 2", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Expedia_Logo_2023.svg", h: 50 },
              { name: "Numerica 2", logo: "https://numericacenter.com/wp-content/themes/numericacenter/images/logo-Numerica-center.png", h: 100 },
              { name: "ESCEN 2", logo: "https://escen.university/wa_res/images/normal/LOGO_ESCEN_(2).png?t=b1b2f445_e288_4b56_b229_ee53aef7a2fb", h: 120 }
            ].map((partner, i) => (
              <div key={i} className="flex items-center justify-center transition-transform hover:scale-110 duration-500 mx-10">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={300}
                  height={partner.h}
                  className="w-auto object-contain"
                  style={{ height: `${partner.h}px` }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. MODALS (PORTAL-LIKE) */}
      {/* 9. MODALS (ZEN EXPERIENCE - MOBILE ONLY) */}
      <div className="lg:hidden">
        <AnimatePresence>
          {activeTab && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveTab(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
              />

              <motion.div
                initial={typeof window !== 'undefined' && window.innerWidth < 1024 ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
                animate={typeof window !== 'undefined' && window.innerWidth < 1024 ? { y: 0 } : { opacity: 1, scale: 1 }}
                exit={typeof window !== 'undefined' && window.innerWidth < 1024 ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={`
                z-[9999] bg-white shadow-2xl
                fixed inset-0 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-2xl lg:w-full lg:max-w-4xl
                flex flex-col overflow-hidden
              `}
              >
                {/* HEADER */}
                <div className="px-8 py-6 flex justify-between items-center border-b border-slate-50 shrink-0">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">
                      {activeTab === 'guests' ? 'Voyageurs' : 'Choisir vos dates'}
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                      {arrivalDate && departureDate
                        ? `${arrivalDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} — ${departureDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`
                        : 'Sélectionnez votre séjour'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab(null)}
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                  {activeTab !== 'guests' ? (
                    <div className="relative">
                      {/* QUICK YEAR SELECTOR */}
                      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-50 px-8 py-8 shrink-0 flex items-center justify-center gap-16">
                        {[2026, 2027, 2028].map((y) => (
                          <button
                            key={y}
                            onClick={() => {
                              const target = new Date(y, y === 2026 ? 4 : 0, 1);
                              setViewDate(target);
                              const container = document.querySelector('.custom-scrollbar');
                              if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`text-sm font-black uppercase tracking-[0.4em] transition-all ${viewDate.getFullYear() === y ? 'text-[#233D8C] scale-110' : 'text-slate-300 hover:text-slate-500'}`}
                          >
                            {y}
                          </button>
                        ))}
                      </div>

                      <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                          {[0, 1, 2, 3, 4, 5].map((offset) => {
                            const monthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
                            const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                            const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
                            const startDay = (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay() + 6) % 7;

                            return (
                              <div key={offset} className="space-y-8">
                                <h4 className="text-xl font-serif text-slate-900 capitalize text-center mb-6">{monthName}</h4>
                                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-300 mb-4">
                                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, idx) => <div key={idx}>{d}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-y-1">
                                  {[...Array(startDay)].map((_, i) => <div key={`empty-${i}`} />)}
                                  {[...Array(daysInMonth)].map((_, i) => {
                                    const day = i + 1;
                                    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
                                    const isArrival = arrivalDate?.toDateString() === date.toDateString();
                                    const isDeparture = departureDate?.toDateString() === date.toDateString();
                                    const isSelected = isArrival || isDeparture;
                                    const effectiveDeparture = departureDate || (activeTab === "departure" ? hoveredDate : null);
                                    const isInRange = arrivalDate && effectiveDeparture && (
                                      (date > arrivalDate && date < effectiveDeparture) ||
                                      (date < arrivalDate && date > effectiveDeparture)
                                    );

                                    return (
                                      <button
                                        key={i}
                                        onMouseEnter={() => setHoveredDate(date)}
                                        onClick={() => {
                                          if (!arrivalDate || (arrivalDate && departureDate)) {
                                            setArrivalDate(date);
                                            setArrivalInput(date.toLocaleDateString('fr-FR'));
                                            setDepartureDate(null);
                                            setDepartureInput("");
                                            setActiveTab("departure");
                                          } else if (date.getTime() === arrivalDate.getTime()) {
                                            setArrivalDate(null);
                                            setArrivalInput("");
                                          } else if (date < arrivalDate) {
                                            setArrivalDate(date);
                                            setArrivalInput(date.toLocaleDateString('fr-FR'));
                                          } else {
                                            setDepartureDate(date);
                                            setDepartureInput(date.toLocaleDateString('fr-FR'));
                                            setActiveTab("guests");
                                          }
                                        }}
                                        className={`relative h-12 w-full text-sm transition-all flex items-center justify-center group ${isSelected ? 'text-white z-20' : 'text-slate-700 hover:bg-slate-50 rounded-full'} ${isInRange ? 'text-[#233D8C]' : ''}`}
                                      >
                                        {isInRange && <div className="absolute inset-y-1 left-0 right-0 bg-[#233D8C]/5 z-0" />}
                                        {isSelected && <motion.div layoutId="selection-zen" className="absolute inset-1 bg-[#233D8C] rounded-full z-10 shadow-lg shadow-blue-900/20" />}
                                        {isArrival && effectiveDeparture && date < effectiveDeparture && <div className="absolute inset-y-1 left-1/2 right-0 bg-[#233D8C]/5 -z-10" />}
                                        {isDeparture && arrivalDate && date > arrivalDate && <div className="absolute inset-y-1 left-0 right-1/2 bg-[#233D8C]/5 -z-10" />}
                                        <span className="relative z-30 font-medium">{day}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 max-w-lg mx-auto w-full space-y-12">
                      {[
                        { id: 'adults', label: 'Adultes', sub: '13 ans et plus', count: adults, setter: setAdults, min: 1 },
                        { id: 'children', label: 'Enfants', sub: 'De 2 à 12 ans', count: children, setter: setChildren, min: 0 },
                        { id: 'infants', label: 'Bébés', sub: 'Moins de 2 ans', count: infants, setter: setInfants, min: 0 }
                      ].map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between">
                          <div>
                            <span className="block text-base font-serif text-slate-900">{cat.label}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{cat.sub}</span>
                          </div>
                          <div className="flex items-center gap-8">
                            <button
                              onClick={() => cat.setter(Math.max(cat.min, cat.count - 1))}
                              className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#233D8C] hover:text-white hover:border-[#233D8C] transition-all"
                            >
                              <span className="text-xl font-light">-</span>
                            </button>
                            <span className="text-xl font-serif w-6 text-center">{cat.count}</span>
                            <button
                              onClick={() => cat.setter(cat.count + 1)}
                              className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#233D8C] hover:text-white hover:border-[#233D8C] transition-all"
                            >
                              <span className="text-xl font-light">+</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FOOTER ACTION BAR */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6 shrink-0">
                  <div className="flex-1 hidden sm:block">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-slate-900">{arrivalDate ? arrivalDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Arrivée'}</span>
                      </div>
                      <div className="w-4 h-[1px] bg-slate-200" />
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">{departureDate ? departureDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Départ'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 w-full sm:w-auto">
                    {activeTab === 'guests' && (
                      <button
                        onClick={() => setActiveTab('arrival')}
                        className="px-6 py-4 rounded-full border border-slate-200 text-xs font-semibold capitalize tracking-[0.15em] hover:bg-white transition-colors"
                      >
                        Retour
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (activeTab !== 'guests' && arrivalDate && departureDate) {
                          setActiveTab('guests');
                        } else if (activeTab === 'guests') {
                          setActiveTab(null);
                        }
                      }}
                      disabled={!arrivalDate || (!departureDate && activeTab !== 'guests')}
                      className={`flex-1 sm:flex-none px-12 py-4 rounded-full font-semibold text-xs capitalize tracking-[0.15em] transition-all shadow-xl
                      ${(!arrivalDate || !departureDate) ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-[#233D8C] text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98]'}
                    `}
                    >
                      {activeTab === 'guests' ? 'Vérifier la disponibilité' : 'Suivant'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      {/* 10. STICKY MOBILE BOOKING BAR */}
      <AnimatePresence>
        {!activeTab && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full p-4 z-[50] lg:hidden"
          >
            <button
              onClick={() => setActiveTab('arrival')}
              className="w-full bg-[#233D8C] text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
            >
              <Calendar className="w-4 h-4" />
              {t('Navigation.book')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
