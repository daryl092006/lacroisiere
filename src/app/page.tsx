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

  // Booking State
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [arrivalInput, setArrivalInput] = useState("");
  const [departureInput, setDepartureInput] = useState("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState(new Date(2026, 4, 1));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [activeTab, setActiveTab] = useState<"arrival" | "departure" | "guests" | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  } as const;

  return (
    <div className="relative min-h-screen bg-white selection:bg-[#233D8C] selection:text-white font-sans overflow-x-hidden">

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
        className="hidden lg:block relative z-40 -mt-12 px-6"
        whileHover="hover"
        initial="initial"
      >
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm flex flex-col lg:flex-row border border-slate-100 relative">
          <div className="flex-1 flex lg:rounded-l-sm">
            {/* FIELD 1: ARRIVAL */}
            <div className="relative flex-1 group">
              <div 
                onClick={() => setActiveTab('arrival')}
                className={`px-10 py-8 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer h-full ${activeTab === 'arrival' ? 'bg-slate-50' : ''}`}
              >
                <div className="flex items-center gap-3 text-[#233D8C] mb-2">
                  <Calendar className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">{t('Index.booking.arrival')}</span>
                </div>
                <div className={`font-serif text-xl ${!arrivalDate ? 'text-slate-400' : 'text-slate-900'}`}>
                  {arrivalInput || t('Index.booking.choose')}
                </div>
                <motion.div 
                  animate={{ width: activeTab === 'arrival' ? "100%" : 0 }}
                  className="absolute bottom-0 left-0 h-[3px] bg-[#233D8C] z-10"
                />
              </div>

              {/* CALENDAR POPOVER - Positioned relative to Arrival */}
              <AnimatePresence>
                {(activeTab === 'arrival' || activeTab === 'departure') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-4 bg-white shadow-2xl p-8 z-[100] rounded-sm hidden lg:block w-[700px]"
                  >
                    <div className="flex gap-12">
                      {[0, 1].map((offset) => {
                        const monthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
                        const monthName = monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                        const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
                        const startDay = (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay() + 6) % 7;

                        return (
                          <div key={offset} className="flex-1">
                            <h4 className="text-center text-sm mb-6 text-slate-900 capitalize font-serif">{monthName}</h4>
                            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black text-slate-400 mb-4 px-2">
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
                                    onClick={(e) => {
                                      e.stopPropagation();
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
                                        setActiveTab(null);
                                      }
                                    }}
                                    className={`relative h-10 w-full text-[11px] transition-all flex items-center justify-center group ${isSelected ? 'text-white z-20' : 'text-slate-700'} ${isInRange ? 'text-[#233D8C]' : ''}`}
                                  >
                                    {isInRange && <div className="absolute inset-y-0.5 left-0 right-0 bg-[#233D8C]/5 z-0" />}
                                    {isSelected && <motion.div layoutId="selection-desktop" className="absolute inset-1 bg-[#233D8C] rounded-full z-10" />}
                                    {isArrival && effectiveDeparture && date < effectiveDeparture && <div className="absolute inset-y-0.5 left-1/2 right-0 bg-[#233D8C]/5 -z-10" />}
                                    {isDeparture && arrivalDate && date > arrivalDate && <div className="absolute inset-y-0.5 left-0 right-1/2 bg-[#233D8C]/5 -z-10" />}
                                    <span className="relative z-30">{day}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FIELD 2: DEPARTURE */}
            <div className="relative flex-1 group">
              <div 
                onClick={() => setActiveTab('departure')}
                className={`px-10 py-8 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer h-full ${activeTab === 'departure' ? 'bg-slate-50' : ''}`}
              >
                <div className="flex items-center gap-3 text-[#233D8C] mb-2">
                  <Calendar className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">{t('Index.booking.departure')}</span>
                </div>
                <div className={`font-serif text-xl ${!departureDate ? 'text-slate-400' : 'text-slate-900'}`}>
                  {departureInput || t('Index.booking.choose')}
                </div>
                <motion.div 
                  animate={{ width: activeTab === 'departure' ? "100%" : 0 }}
                  className="absolute bottom-0 left-0 h-[3px] bg-[#233D8C] z-10"
                />
              </div>
            </div>

            {/* FIELD 3: GUESTS */}
            <div className="relative flex-1 group">
              <div 
                onClick={() => setActiveTab('guests')}
                className={`px-10 py-8 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer h-full ${activeTab === 'guests' ? 'bg-slate-50' : ''}`}
              >
                <div className="flex items-center gap-3 text-[#233D8C] mb-2">
                  <Users className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">{t('Index.booking.guests')}</span>
                </div>
                <div className="font-serif text-xl text-slate-900">
                  {adults + children} {t('Index.booking.persons')}{infants > 0 ? `, ${infants} bébés` : ""}
                </div>
                <motion.div 
                  animate={{ width: activeTab === 'guests' ? "100%" : 0 }}
                  className="absolute bottom-0 left-0 h-[3px] bg-[#233D8C] z-10"
                />
              </div>

              {/* GUESTS POPOVER - Perfectly aligned to this field */}
              <AnimatePresence>
                {activeTab === 'guests' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 bg-white shadow-2xl p-8 z-[100] rounded-sm hidden lg:block w-[350px]"
                  >
                    <div className="space-y-6">
                      {[
                        { id: 'adults', label: 'Adultes', sub: '13 ans et plus', count: adults, setter: setAdults, min: 1 },
                        { id: 'children', label: 'Enfants', sub: '2-12 ans', count: children, setter: setChildren, min: 0 },
                        { id: 'infants', label: 'Bébés', sub: '-2 ans', count: infants, setter: setInfants, min: 0 }
                      ].map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between">
                          <div>
                            <span className="block text-xs font-bold text-slate-900">{cat.label}</span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-widest">{cat.sub}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button onClick={(e) => { e.stopPropagation(); cat.setter(Math.max(cat.min, cat.count - 1)); }} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#233D8C] hover:text-white">-</button>
                            <span className="text-sm font-serif w-4 text-center">{cat.count}</span>
                            <button onClick={(e) => { e.stopPropagation(); cat.setter(cat.count + 1); }} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#233D8C] hover:text-white">+</button>
                          </div>
                        </div>
                      ))}
                      <button onClick={(e) => { e.stopPropagation(); setActiveTab(null); }} className="w-full bg-[#233D8C] text-white py-3 text-[9px] font-black uppercase tracking-widest rounded-sm">Confirmer</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <motion.button 
            whileHover="hover"
            initial="initial"
            className="relative bg-[#233D8C] text-white px-12 py-8 lg:py-0 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all flex-shrink-0 lg:rounded-r-sm overflow-hidden"
          >
            {t('Index.booking.check')}
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
              {t('Index.about.desc')}
            </p>
            <button className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-[#233D8C]">
              <span>En savoir plus</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-4">{t('Index.amenities.badge')}</span>
            <h2 className="text-4xl font-serif font-light">{t('Index.amenities.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Layout className="w-8 h-8" />, label: t('Index.amenities.items.rooftop.label'), desc: t('Index.amenities.items.rooftop.desc') },
              { icon: <Waves className="w-8 h-8" />, label: t('Index.amenities.items.pool.label'), desc: t('Index.amenities.items.pool.desc') },
              { icon: <Users className="w-8 h-8" />, label: t('Index.amenities.items.concierge.label'), desc: t('Index.amenities.items.concierge.desc') },
              { icon: <Zap className="w-8 h-8" />, label: t('Index.amenities.items.autonomy.label'), desc: t('Index.amenities.items.autonomy.desc') }
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
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">{t('Index.apartments.badge')}</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light">{t('Index.apartments.title')}</h2>
          </div>
          <button className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-slate-900 pb-2">{t('Index.apartments.viewAll')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { img: "/living.png", title: t('Index.apartments.items.royal.title'), price: t('Index.apartments.items.royal.price') },
            { img: "/room.png", title: t('Index.apartments.items.executive.title'), price: t('Index.apartments.items.executive.price') },
            { img: "/hero.png", title: t('Index.apartments.items.premium.title'), price: t('Index.apartments.items.premium.price') }
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
              <h2 className="text-5xl font-serif font-light mb-12 leading-tight text-white/90">{t('Index.reviews.title')}</h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
                {t('Index.reviews.subtitle')}
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { name: t('Index.reviews.items.marc.name'), text: t('Index.reviews.items.marc.text'), role: t('Index.reviews.items.marc.role') },
                { name: t('Index.reviews.items.sarah.name'), text: t('Index.reviews.items.sarah.text'), role: t('Index.reviews.items.sarah.role') }
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
      {/* 8. SPECIAL OFFERS */}
      ...
      {/* 9. PARTNERS (NEW - FINISHING P1) */}
      <section className="py-24 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col items-center gap-12">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Ils nous font confiance</span>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              {/* On pourra remplacer par de vrais logos plus tard */}
              <div className="text-xl font-serif font-bold text-slate-900 tracking-tighter italic">BOO<span className="text-[#233D8C]">KING</span></div>
              <div className="text-xl font-serif font-bold text-slate-900 tracking-tighter">AIR<span className="text-[#233D8C]">BNB</span></div>
              <div className="text-xl font-serif font-bold text-slate-900 tracking-tighter italic">EXP<span className="text-[#233D8C]">EDIA</span></div>
              <div className="text-xl font-serif font-bold text-slate-900 tracking-tighter">CORP<span className="text-[#233D8C]">ORATE</span></div>
              <div className="text-xl font-serif font-bold text-slate-900 tracking-tighter italic">TRAVEL<span className="text-[#233D8C]">AGENCY</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-32 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">{t('Index.offers.badge')}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900">{t('Index.offers.title')}</h2>
            </div>
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

      {/* 9. PARTNERS */}
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
                      className="px-6 py-4 rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
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
                    className={`flex-1 sm:flex-none px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl
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
