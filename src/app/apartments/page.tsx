"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, MapPin, Search, ArrowRight, CheckCircle2, Star, X, Info } from "lucide-react";
import { APARTMENTS, Apartment } from "@/data/apartments";
import { fetchApartments } from "@/lib/apartments";

// Simple mock availability logic without a database
// This function returns true if the apartment is considered "available" for the given dates
// For the demo, we'll make it deterministic based on the ID and the month
const checkMockAvailability = (id: string, arrival: Date | null, departure: Date | null) => {
  if (!arrival || !departure) return true;

  // We want to show some "booked" apartments to make it realistic
  // Rules for mock:
  // 1. Suite Royale is always available (premium experience)
  if (id === "suite-royale") return true;

  // 2. Others are booked if they have '3' in their ID and it's a weekend (Sat/Sun)
  const isWeekend = arrival.getDay() === 0 || arrival.getDay() === 6 || departure.getDay() === 0 || departure.getDay() === 6;
  if (id.includes("3") && isWeekend) return false;

  // 3. Some specific IDs are booked in May 2026 (the view date in the app)
  if (arrival.getMonth() === 4 && arrival.getFullYear() === 2026) {
    const bookedIds = ["suite-ivoire", "suite-ebene", "suite-topaze"];
    if (bookedIds.includes(id)) return false;
  }

  return true;
};

function ApartmentsContent() {
  const searchParams = useSearchParams();

  // State from URL or defaults
  const [arrival, setArrival] = useState<Date | null>(null);
  const [departure, setDeparture] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [priceRange, setPriceRange] = useState(300000); // FCFA
  const [capacity, setCapacity] = useState("Tous");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const [apartmentsList, setApartmentsList] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchApartments();
        if (data && data.length > 0) {
          setApartmentsList(data);
        } else {
          setApartmentsList(APARTMENTS);
        }
      } catch (err: any) {
        if (err?.message?.includes('Failed to fetch') || (typeof window !== 'undefined' && !window.navigator.onLine)) {
          console.warn("Network offline: Using local mock fallback for apartments listing.");
        } else {
          console.error("Failed to load apartments from Supabase:", err);
        }
        setApartmentsList(APARTMENTS);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const arr = searchParams.get("arrival");
    const dep = searchParams.get("departure");
    const ad = searchParams.get("adults");
    const ch = searchParams.get("children");
    const type = searchParams.get("type");

    if (arr) setArrival(new Date(arr));
    if (dep) setDeparture(new Date(dep));
    if (ad) setAdults(parseInt(ad));
    if (ch) setChildren(parseInt(ch));
    if (type) setTypeFilter(type);
  }, [searchParams]);

  const totalGuests = adults + children;

  const filteredApartments = apartmentsList.filter(apt => {
    // 1. Price check
    if (apt.price > priceRange) return false;

    // 2. Capacity check
    if (totalGuests > 0 && apt.capacity < totalGuests) return false;

    // 3. Type Filter
    if (typeFilter && apt.type !== typeFilter) return false;

    // 4. User Filter Capacity (Dropdown)
    if (capacity !== "Tous") {
      if (capacity === "1-2" && apt.capacity > 2) return false;
      if (capacity === "3-4" && (apt.capacity < 3 || apt.capacity > 4)) return false;
      if (capacity === "5+" && apt.capacity < 5) return false;
    }

    return true;
  });

  // Sort by availability first
  const sortedApartments = [...filteredApartments].sort((a, b) => {
    const aAvail = checkMockAvailability(a.id, arrival, departure);
    const bAvail = checkMockAvailability(b.id, arrival, departure);
    if (aAvail && !bAvail) return -1;
    if (!aAvail && bAvail) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-32 pb-24 transition-colors duration-300">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#233D8C] mb-4 block">Notre Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-slate-900 mb-6 leading-tight">
            Visez l'exceptionnel <br /><span className="italic">à Cotonou.</span>
          </h1>
          <p className="text-slate-500 font-light text-lg max-w-xl">
            {arrival && departure
              ? `Disponibilités pour votre séjour du ${arrival.toLocaleDateString('fr-FR')} au ${departure.toLocaleDateString('fr-FR')}.`
              : "Parcourez nos 14 résidences de prestige et trouvez votre prochain pied-à-terre."}
          </p>
        </motion.div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-20 sticky top-24 z-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col lg:flex-row items-center gap-6"
        >
          {/* Summary Info */}
          <div className="flex flex-wrap items-center gap-8 flex-1 w-full px-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Période</span>
              <div className="flex items-center gap-2 text-slate-900 font-serif italic">
                <Calendar className="w-3.5 h-3.5 text-[#233D8C]" />
                <span>{arrival ? arrival.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : 'Choisir'} — {departure ? departure.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : 'Choisir'}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Voyageurs</span>
              <div className="flex items-center gap-2 text-slate-900 font-serif italic">
                <Users className="w-3.5 h-3.5 text-[#233D8C]" />
                <span>{totalGuests} Personne{totalGuests > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-[200px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Prix max / nuit</span>
                <span className="text-[10px] font-black text-[#233D8C]">{priceRange.toLocaleString()} FCFA</span>
              </div>
              <input
                type="range" min="50000" max="500000" step="10000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#233D8C]"
              />
            </div>
          </div>

          <div className="h-12 w-px bg-slate-100 hidden lg:block" />

          <Link href="/" className="px-8 py-4 bg-[#233D8C] hover:bg-black text-white rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer">
            Modifier la recherche
          </Link>
        </motion.div>
      </div>

      {/* APARTMENTS GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse flex flex-col">
                <div className="aspect-[4/5] bg-slate-100 rounded-2xl mb-6 w-full" />
                <div className="h-6 bg-slate-100 rounded w-2/3 mb-2" />
                <div className="h-4 bg-slate-100 rounded w-1/3 mb-6" />
                <div className="h-10 bg-slate-100 rounded w-full mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {sortedApartments.map((apt, i) => {
              const isAvailable = checkMockAvailability(apt.id, arrival, departure);
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`group flex flex-col ${!isAvailable ? 'opacity-80' : ''}`}
                >
                  {/* IMAGE BLOCK */}
                  <Link href={`/apartments/${apt.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 shadow-sm">
                    <Image src={apt.image} alt={apt.name} fill className={`object-cover transition-transform duration-1000 ease-out ${isAvailable ? 'group-hover:scale-110' : 'grayscale-[0.5]'}`} />

                    {/* OVERLAYS */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />

                    <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                      {isAvailable ? (
                        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Disponible</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                          <X className="w-3 h-3 text-white/60" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white">Réservé</span>
                        </div>
                      )}

                      <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{apt.type}</span>
                      </div>
                    </div>

                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px]">
                        <div className="px-6 py-3 bg-white/95 rounded-sm shadow-2xl border border-slate-100">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Complet sur vos dates</span>
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-2xl font-serif text-slate-900 mb-1 group-hover:text-[#233D8C] transition-colors">{apt.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{apt.collection}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-black text-slate-900 leading-none">4.9</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-500 text-sm font-light mb-6">
                      <span className="flex items-center gap-1.5"><Layout className="w-4 h-4 text-slate-300" /> 28/{apt.sqm} m²</span>
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-300" /> {apt.capacity} Voyageurs</span>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">À partir de</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-medium text-slate-900">{apt.price.toLocaleString()}</span>
                          <span className="text-xs text-slate-500 font-light italic">FCFA / nuit</span>
                        </div>
                      </div>

                      <Link
                        href={`/apartments/${apt.id}`}
                        className={`h-12 px-6 flex items-center gap-3 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest
                        ${isAvailable
                            ? 'bg-slate-900 text-white hover:bg-[#233D8C] shadow-lg shadow-slate-200'
                            : 'bg-slate-50 text-slate-300 cursor-not-allowed'}
                      `}
                      >
                        {isAvailable ? (
                          <>Voir l'Offre <ArrowRight className="w-3.5 h-3.5" /></>
                        ) : (
                          <>Indisponible</>
                        )}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && sortedApartments.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-slate-100 rounded-3xl">
            <Info className="w-12 h-12 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-serif text-slate-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-slate-500 font-light max-w-sm mx-auto">Essayez d'ajuster vos critères de prix ou de capacité pour découvrir d'autres options.</p>
            <button onClick={() => setPriceRange(500000)} className="mt-8 text-[#233D8C] text-[10px] font-black uppercase tracking-widest hover:underline">Réinitialiser les filtres</button>
          </div>
        )}
      </div>
    </div>
  );
}

const Layout = ({ className, children }: { className?: string; children?: any }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

export default function ApartmentsPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-slate-400 font-serif italic text-xl">Charmantes résidences en cours de chargement...</div>}>
      <ApartmentsContent />
    </Suspense>
  );
}
