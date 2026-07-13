"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Wifi, Wind, Tv, Coffee, Bath, Star, ChevronLeft, ArrowRight, CheckCircle2, X, Shield, Info, Smartphone } from "lucide-react";
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

    if (arr) setArrival(new Date(arr));
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
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Link href="/apartments" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#233D8C] transition-colors mb-12">
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
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
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
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 bg-white p-10 rounded-3xl shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">
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

              <div className="space-y-4 mb-10">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  <div className="flex divide-x divide-slate-100">
                    <div className="flex-1 p-5">
                      <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">{t('ApartmentDetail.checkin')}</label>
                      <div className="text-sm font-bold text-slate-900">{arrival ? arrival.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : t('ApartmentDetail.notDefined')}</div>
                    </div>
                    <div className="flex-1 p-5">
                      <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">{t('ApartmentDetail.checkout')}</label>
                      <div className="text-sm font-bold text-slate-900">{departure ? departure.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : t('ApartmentDetail.notDefined')}</div>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">{t('ApartmentDetail.guestsLabel')}</label>
                      <div className="text-sm font-bold text-slate-900">{adults} {adults > 1 ? t('ApartmentDetail.adultsPlural') : t('ApartmentDetail.adults')}</div>
                    </div>
                    <Users className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>

              {available ? (
                <button className="w-full bg-[#233D8C] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                  {t('ApartmentDetail.bookBtn')}
                </button>
              ) : (
                <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4">
                  <Info className="w-5 h-5 text-rose-500 shrink-0" />
                  <p className="text-xs text-rose-800 leading-relaxed font-medium">{t('ApartmentDetail.bookedMessage')} <Link href="/apartments" className="underline font-black">{t('ApartmentDetail.otherDates')}</Link></p>
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
