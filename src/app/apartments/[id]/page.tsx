"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, MapPin, Wifi, Wind, Tv, Coffee, Bath, Star, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, X, Shield, Info, Smartphone } from "lucide-react";
import { APARTMENTS, Apartment } from "@/data/apartments";
import { fetchApartmentBySlug } from "@/lib/apartments";
import { useTranslation } from "@/i18n/client";
import { useCurrency } from "@/context/CurrencyContext";

function ApartmentDetailContent({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  const [arrival, setArrival] = useState<Date | null>(null);
  const [departure, setDeparture] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  
  // Interactive States
  const [activeTab, setActiveTab] = useState<'arrival' | 'departure' | 'guests' | null>(null);
  const [viewDate, setViewDate] = useState<Date>(new Date(2026, 6, 1)); // Juillet 2026
  const [childrenCount, setChildrenCount] = useState(0);
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleBookingClick = async () => {
    if (step === 'select') {
      if (!arrival || !departure) {
        setActiveTab('arrival');
        return;
      }
      setStep('form');
      return;
    }

    if (step === 'form') {
      if (!clientForm.firstName || !clientForm.lastName || !clientForm.email || !clientForm.phone) {
        setSubmitError("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      setSubmitting(true);
      setSubmitError(null);

      try {
        const { supabase } = await import('@/lib/supabase');
        
        if (!apartment) return;
        // 1. Fetch real apartment UUID based on slug/id
        const { data: aptData, error: aptError } = await supabase
          .from('apartments')
          .select('id')
          .eq('slug', apartment.id)
          .single();

        if (aptError || !aptData) {
          throw new Error("Impossible de trouver l'identifiant de la suite.");
        }

        // 2. Create customer record in customers table
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .insert({
            first_name: clientForm.firstName,
            last_name: clientForm.lastName,
            email: clientForm.email,
            phone: clientForm.phone
          })
          .select('id')
          .single();

        if (customerError) {
          throw new Error(customerError.message || "Erreur lors de la création de la fiche client.");
        }

        if (!arrival || !departure) {
          throw new Error("Veuillez sélectionner vos dates d'arrivée et de départ.");
        }

        // 3. Create booking record linking to created customer UUID
        const { error: bookingError } = await supabase
          .from('bookings')
          .insert({
            apartment_id: aptData.id,
            check_in_date: arrival.toISOString().split('T')[0],
            check_out_date: departure.toISOString().split('T')[0],
            adults: adults,
            children: childrenCount,
            customer_id: customerData.id,
            special_requests: clientForm.specialRequests,
            status: 'pending'
          });

        if (bookingError) {
          throw new Error(bookingError.message || "Erreur lors de l'enregistrement de la réservation.");
        }

        setStep('success');
      } catch (err: any) {
        console.error("Booking error details:", err);
        setSubmitError(err.message || "Une erreur est survenue lors de votre demande. Veuillez réessayer.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchApartmentBySlug(id);
        if (data) {
          setApartment(data);
        } else {
          setApartment(APARTMENTS.find(a => a.id === id) || null);
        }
      } catch (err) {
        console.error("Failed to load apartment details from Supabase", err);
        setApartment(APARTMENTS.find(a => a.id === id) || null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    const arr = searchParams.get("arrival");
    const dep = searchParams.get("departure");
    const ad = searchParams.get("adults");

    if (arr) {
      const d = new Date(arr);
      setArrival(d);
      setViewDate(d);
    } else {
      setViewDate(new Date());
    }
    if (dep) setDeparture(new Date(dep));
    if (ad) setAdults(parseInt(ad));
  }, [searchParams]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-[#233D8C] animate-spin mb-4" />
          <p className="text-slate-400 font-serif italic text-sm">{t('ApartmentDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="text-4xl font-serif mb-4">{t('ApartmentDetail.notFound')}</h1>
        <p className="text-slate-500 mb-8">{t('ApartmentDetail.notFoundDesc')}</p>
        <Link href="/apartments" className="text-[#233D8C] font-black text-xs uppercase tracking-widest border-b-2 border-[#233D8C] pb-1">{t('ApartmentDetail.backToListShort')}</Link>
      </div>
    );
  }

  // Mock availability check (must match the one in ApartmentsPage)
  const isAvailable = (id: string, arrival: Date | null, departure: Date | null) => {
    if (!arrival || !departure) return true;
    if (id === "suite-royale") return true;
    const isWeekend = arrival.getDay() === 0 || arrival.getDay() === 6 || departure.getDay() === 0 || departure.getDay() === 6;
    if (id.includes("3") && isWeekend) return false;
    if (arrival.getMonth() === 4 && arrival.getFullYear() === 2026) {
      const bookedIds = ["suite-ivoire", "suite-ebene", "suite-topaze"];
      if (bookedIds.includes(id)) return false;
    }
    return true;
  };

  const available = isAvailable(apartment.id, arrival, departure);

  return (
    <div className="min-h-screen bg-white selection:bg-[#233D8C] selection:text-white">
      {/* 1. HERO GALLERY */}
      <section className="relative pt-32 pb-12">
        <div className="w-full mx-auto px-6 md:px-16">
          <Link href={`/apartments?arrival=${arrival ? arrival.toISOString() : ''}&departure=${departure ? departure.toISOString() : ''}&adults=${adults}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#233D8C] transition-colors mb-12">
            <ChevronLeft className="w-4 h-4" /> {t('ApartmentDetail.backToList')}
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C]">{apartment.type}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{apartment.collection}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif font-light text-slate-900 leading-[0.9] tracking-tighter">{apartment.name}</h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2">{t('ApartmentDetail.perNight')}</span>
              <div className="text-4xl font-serif text-slate-900 leading-none">{formatPrice(apartment.price)}</div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 h-[60vh] md:h-[75vh]">
            <div className="col-span-12 md:col-span-8 relative rounded-2xl overflow-hidden group shadow-2xl">
              <Image src={apartment.image} alt={apartment.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" priority />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="col-span-4 hidden md:flex flex-col gap-4">
              <div className="flex-1 relative rounded-2xl overflow-hidden group shadow-lg">
                <Image src="/room.png" alt="Detail 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden group shadow-lg">
                <Image src="/exterior.png" alt="Detail 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT & STICKY BOOKING */}
      <section className="w-full mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* DETAILED INFO (LEFT) */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-10 border-b border-slate-50 pb-12 mb-12">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('ApartmentDetail.surface')}</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#233D8C]"><Smartphone className="w-5 h-5 rotate-90" /></div>
                  <span className="font-serif text-2xl">{apartment.sqm} m²</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('ApartmentDetail.capacity')}</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#233D8C]"><Users className="w-5 h-5" /></div>
                  <span className="font-serif text-2xl">{apartment.capacity} {t('ApartmentDetail.travelers')}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('ApartmentDetail.rating')}</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500"><Star className="w-5 h-5 fill-current" /></div>
                  <span className="font-serif text-2xl">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-8">{t('ApartmentDetail.experience')}</h2>
                <p className="text-slate-600 text-xl leading-relaxed font-light mb-8 font-serif italic">
                  {i18n.language === 'en' 
                    ? (apartment.description_short_en || apartment.description_short_fr || apartment.desc) 
                    : (apartment.description_short_fr || apartment.desc)}
                </p>
                <div className="h-px w-20 bg-[#233D8C]/20 mb-8" />
                <p className="text-slate-500 text-lg leading-relaxed font-light mb-10">
                  {i18n.language === 'en' 
                    ? (apartment.story_en || apartment.story_fr || apartment.story) 
                    : (apartment.story_fr || apartment.story)}
                </p>

                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-3">
                  <Info className="w-4 h-4 text-[#233D8C]" /> {t('ApartmentDetail.highlights')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apartment.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-12">{t('ApartmentDetail.residenceDetails')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-6">{t('ApartmentDetail.premiumEquip')}</h4>
                    <div className="space-y-4">
                      {apartment.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#233D8C] group-hover:bg-[#233D8C]/5 transition-colors">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-light text-slate-600 capitalize">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-6">{t('ApartmentDetail.spaceDetail')}</h4>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-bold text-slate-900 block mb-2">{t('ApartmentDetail.sleepingArea')}</span>
                        <p className="text-xs text-slate-400 leading-loose">{apartment.composition.sleeping.join(" • ")}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-900 block mb-2">{t('ApartmentDetail.technology')}</span>
                        <p className="text-xs text-slate-400 leading-loose">{apartment.composition.tech.join(" • ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STICKY BOOKING WIDGET (RIGHT) */}
          <div className="lg:col-span-5 relative z-30">
            <div className="sticky top-32 bg-white p-10 rounded-3xl shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] border border-slate-100">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#233D8C]" />

              <div className="mb-10 flex justify-between items-start">
                <div>
                  <div className="text-4xl font-serif text-slate-900 mb-1">{formatPrice(apartment.price)}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('ApartmentDetail.totalPerNight')}</span>
                </div>
                {available ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{t('ApartmentDetail.available')}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full">
                    <X className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{t('ApartmentDetail.booked')}</span>
                  </div>
                )}
              </div>

              {/* DATE SELECTOR & CALENDAR INLINE IN THE CARD */}
              <div className="space-y-4 mb-8">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100 relative">
                  
                  {/* Arrival / Departure Buttons */}
                  <div className="flex divide-x divide-slate-100">
                    <div 
                      onClick={() => setActiveTab(activeTab === 'arrival' ? null : 'arrival')}
                      className={`flex-1 p-5 cursor-pointer hover:bg-slate-100/50 transition-colors ${activeTab === 'arrival' ? 'bg-slate-100/80' : ''}`}
                    >
                      <label className="text-[8px] font-black uppercase tracking-widest text-[#233D8C] block mb-1">{t('ApartmentDetail.checkin')}</label>
                      <div className="text-sm font-bold text-slate-900">
                        {arrival ? arrival.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : t('Index.booking.choose')}
                      </div>
                    </div>
                    <div 
                      onClick={() => setActiveTab(activeTab === 'departure' ? null : 'departure')}
                      className={`flex-1 p-5 cursor-pointer hover:bg-slate-100/50 transition-colors ${activeTab === 'departure' ? 'bg-slate-100/80' : ''}`}
                    >
                      <label className="text-[8px] font-black uppercase tracking-widest text-[#233D8C] block mb-1">{t('ApartmentDetail.checkout')}</label>
                      <div className="text-sm font-bold text-slate-900">
                        {departure ? departure.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : t('Index.booking.choose')}
                      </div>
                    </div>
                  </div>

                  {/* Travelers select */}
                  <div 
                    onClick={() => setActiveTab(activeTab === 'guests' ? null : 'guests')}
                    className={`p-5 flex justify-between items-center cursor-pointer hover:bg-slate-100/50 transition-colors ${activeTab === 'guests' ? 'bg-slate-100/80' : ''}`}
                  >
                    <div>
                      <label className="text-[8px] font-black uppercase tracking-widest text-[#233D8C] block mb-1">{t('ApartmentDetail.guestsLabel')}</label>
                      <div className="text-sm font-bold text-slate-900">
                        {adults} {adults > 1 ? t('ApartmentDetail.adultsPlural') : t('ApartmentDetail.adults')}
                        {childrenCount > 0 ? `, ${childrenCount} enfant(s)` : ''}
                      </div>
                    </div>
                    <Users className="w-4 h-4 text-[#233D8C]/50" />
                  </div>

                  {/* ─── DOUBLE CALENDAR INLINE POPOVER ─── */}
                  <AnimatePresence>
                    {(activeTab === 'arrival' || activeTab === 'departure') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white p-6 border-t border-slate-100 w-full z-50 overflow-hidden"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#233D8C]">
                            {activeTab === 'arrival' ? 'Sélectionner l\'arrivée' : 'Sélectionner le départ'}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
                                const min = new Date(); min.setDate(1); min.setHours(0,0,0,0);
                                if (prev >= min) setViewDate(prev);
                              }}
                              className="p-1 rounded hover:bg-slate-100"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
                              }}
                              className="p-1 rounded hover:bg-slate-100"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setActiveTab(null); }}
                              className="p-1 rounded hover:bg-slate-100 ml-2"
                            >
                              <X className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                        </div>

                        {/* Calendar Days */}
                        <div>
                          {(() => {
                            const monthName = viewDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                            const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
                            const startDay = (new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay() + 6) % 7;
                            const today = new Date(); today.setHours(0,0,0,0);

                            return (
                              <div>
                                <h4 className="text-center font-serif italic text-slate-800 text-sm mb-3 capitalize">{monthName}</h4>
                                <div className="grid grid-cols-7 gap-1 text-center text-[8px] font-black text-slate-400 mb-2">
                                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, idx) => <div key={idx}>{d}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                  {[...Array(startDay)].map((_, i) => <div key={`empty-${i}`} />)}
                                  {[...Array(daysInMonth)].map((_, i) => {
                                    const day = i + 1;
                                    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                                    const isPast = date < today;
                                    const isArr = arrival?.toDateString() === date.toDateString();
                                    const isDep = departure?.toDateString() === date.toDateString();
                                    const isSelected = isArr || isDep;
                                    const isInRange = arrival && departure && date > arrival && date < departure;

                                    return (
                                      <button
                                        key={day}
                                        type="button"
                                        disabled={isPast}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (activeTab === 'arrival') {
                                            setArrival(date);
                                            if (departure && date >= departure) setDeparture(null);
                                            setActiveTab('departure');
                                          } else {
                                            if (arrival && date > arrival) {
                                              setDeparture(date);
                                              setActiveTab(null);
                                            } else {
                                              setArrival(date);
                                              setDeparture(null);
                                            }
                                          }
                                        }}
                                        className={`h-8 rounded-lg text-xs flex items-center justify-center transition-all ${
                                          isPast 
                                            ? 'text-slate-200 cursor-not-allowed' 
                                            : isSelected
                                              ? 'bg-[#233D8C] text-white font-black'
                                              : isInRange
                                                ? 'bg-[#233D8C]/10 text-[#233D8C] font-semibold'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                      >
                                        {day}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ─── GUESTS COUNTER POPOVER ─── */}
                  <AnimatePresence>
                    {activeTab === 'guests' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white p-6 border-t border-slate-100 w-full z-50 space-y-4 overflow-hidden"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#233D8C]">Voyageurs</span>
                          <button onClick={(e) => { e.stopPropagation(); setActiveTab(null); }} className="p-1 rounded hover:bg-slate-100">
                            <X className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>

                        {/* Adults count */}
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <div className="text-xs font-bold text-slate-900">Adultes</div>
                            <div className="text-[10px] text-slate-400">Âge 13+</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setAdults(Math.max(1, adults - 1)); }}
                              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#233D8C]"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{adults}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setAdults(Math.min(apartment.capacity, adults + 1)); }}
                              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#233D8C]"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children count */}
                        <div className="flex items-center justify-between py-2 border-t border-slate-100">
                          <div>
                            <div className="text-xs font-bold text-slate-900">Enfants</div>
                            <div className="text-[10px] text-slate-400">Âge 2-12</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setChildrenCount(Math.max(0, childrenCount - 1)); }}
                              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#233D8C]"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{childrenCount}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setChildrenCount(Math.min(4, childrenCount + 1)); }}
                              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#233D8C]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {arrival && departure && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-5 bg-[#233D8C]/5 rounded-2xl border border-[#233D8C]/10 space-y-3 overflow-hidden"
                  >
                    <div className="flex justify-between items-center text-xs font-medium text-slate-600">
                      <span>Détail du séjour</span>
                      <span className="font-bold text-[#233D8C]">
                        {Math.round((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24))} nuit(s)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">
                        {formatPrice(apartment.price)} × {Math.round((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24))} nuits
                      </span>
                      <span className="font-black text-slate-900">
                        {formatPrice(apartment.price * Math.round((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24)))}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* ─── CLIENT INFORMATION FORM INLINE ─── */}
              <AnimatePresence>
                {step === 'form' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 mb-8 pt-4 border-t border-slate-100 overflow-hidden"
                  >
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#233D8C] block mb-2">Vos informations</span>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Prénom"
                          required
                          value={clientForm.firstName}
                          onChange={(e) => setClientForm({ ...clientForm, firstName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#233D8C] transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Nom"
                          required
                          value={clientForm.lastName}
                          onChange={(e) => setClientForm({ ...clientForm, lastName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#233D8C] transition-all"
                        />
                      </div>
                    </div>

                    <input
                      type="email"
                      placeholder="Adresse e-mail"
                      required
                      value={clientForm.email}
                      onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#233D8C] transition-all"
                    />

                    <input
                      type="tel"
                      placeholder="Numéro de téléphone (ex: +229 ...)"
                      required
                      value={clientForm.phone}
                      onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#233D8C] transition-all"
                    />

                    <textarea
                      placeholder="Demandes spéciales (en option)"
                      rows={2}
                      value={clientForm.specialRequests}
                      onChange={(e) => setClientForm({ ...clientForm, specialRequests: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#233D8C] transition-all resize-none"
                    />

                    {submitError && (
                      <div className="text-[10px] font-bold text-rose-500 bg-rose-50 p-3 rounded-lg border border-rose-100 leading-relaxed">
                        {submitError}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── SUCCESS SCREEN INLINE ─── */}
              <AnimatePresence>
                {step === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="font-serif italic text-base text-emerald-900">Demande Envoyée !</h4>
                    <p className="text-[11px] text-emerald-700 leading-relaxed font-light">
                      Votre demande de séjour a bien été enregistrée dans notre système. Notre équipe de conciergerie va vous contacter sous peu.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* BOOKING ACTION BUTTON */}
              {available && step !== 'success' && (
                <button
                  type="button"
                  onClick={handleBookingClick}
                  disabled={submitting}
                  className="w-full bg-[#233D8C] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50"
                >
                  {submitting 
                    ? "Traitement..." 
                    : step === 'select'
                      ? (arrival && departure ? "Continuer" : "Choisir mes dates")
                      : "Valider ma demande"
                  }
                </button>
              )}

              {!available && (
                <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4">
                  <Info className="w-5 h-5 text-rose-500 shrink-0" />
                  <p className="text-xs text-rose-800 leading-relaxed font-medium">
                    {t('ApartmentDetail.bookedMessage')}{' '}
                    <span 
                      onClick={() => { setArrival(null); setDeparture(null); setStep('select'); }}
                      className="underline font-black cursor-pointer"
                    >
                      {t('ApartmentDetail.otherDates')}
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">{t('ApartmentDetail.securePayment')}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">{t('ApartmentDetail.bookingNote')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ApartmentDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-slate-400 font-serif italic text-xl">L'Espace se prépare...</div>}>
      <ApartmentDetailContent id={resolvedParams.id} />
    </Suspense>
  );
}
