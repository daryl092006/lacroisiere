"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Star, Crown, Gift, Car, MapPin, Utensils, Sparkles, Phone,
  ChevronRight, ChevronDown, Calendar, Clock, Users, Bell,
  Shield, TrendingUp, Award, Zap, Music, Wine, Wifi,
  Shirt, Package, ArrowRight, Check, Plus, X, Camera,
  MessageSquare, Heart, Coffee
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type LoyaltyTier = "Bronze" | "Silver" | "Gold" | "Diamond";

interface ServiceRequest {
  id: string;
  type: string;
  icon: React.ReactNode;
  label: string;
  status: "pending" | "confirmed" | "done";
  date: string;
  detail: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TIERS: { name: LoyaltyTier; min: number; color: string; bg: string; perks: string[] }[] = [
  {
    name: "Bronze",
    min: 0,
    color: "#CD7F32",
    bg: "from-amber-900/20 to-amber-700/10",
    perks: ["5% de remise sur les séjours", "Accès prioritaire aux offres", "Petit-déjeuner offert 1×/an"]
  },
  {
    name: "Silver",
    min: 500,
    color: "#A8A9AD",
    bg: "from-slate-400/20 to-slate-200/10",
    perks: ["10% de remise", "Late check-out gratuit", "Bouteille de bienvenue", "2 nuits offertes/an"]
  },
  {
    name: "Gold",
    min: 1500,
    color: "#D4AF37",
    bg: "from-yellow-600/20 to-yellow-400/10",
    perks: ["15% de remise", "Surclassement garanti", "Transfert aéroport offert", "Conciergerie dédiée"]
  },
  {
    name: "Diamond",
    min: 4000,
    color: "#B9F2FF",
    bg: "from-cyan-400/20 to-blue-300/10",
    perks: ["20% de remise", "Suite premium garantie", "Chauffeur privé illimité", "Accès VIP exclusif", "Chef privé sur demande"]
  }
];

const CONCIERGE_SERVICES = [
  {
    id: "chauffeur",
    icon: Car,
    label: "Chauffeur privé",
    description: "Transfert aéroport, déplacements VIP, excursions",
    color: "#233D8C",
    bg: "bg-blue-50",
    fields: ["Date et heure", "Lieu de départ", "Destination", "Nombre de passagers"]
  },
  {
    id: "guide",
    icon: Camera,
    label: "Guide touristique",
    description: "Visites guidées personnalisées de l'île et de ses trésors",
    color: "#2E7D5A",
    bg: "bg-emerald-50",
    fields: ["Date souhaitée", "Durée (demi-journée / journée)", "Centres d'intérêt", "Langue"]
  },
  {
    id: "restaurant",
    icon: Utensils,
    label: "Réservation restaurant",
    description: "Sélection des meilleures tables, menus gastronomiques",
    color: "#7C3AED",
    bg: "bg-violet-50",
    fields: ["Date et heure", "Restaurant souhaité", "Nombre de couverts", "Régime alimentaire"]
  },
  {
    id: "spa",
    icon: Sparkles,
    label: "Spa & Bien-être",
    description: "Massages, soins, accès spa, yoga sur la plage",
    color: "#DB2777",
    bg: "bg-pink-50",
    fields: ["Date et heure", "Soin souhaité", "Durée", "Préférences"]
  },
  {
    id: "wine",
    icon: Wine,
    label: "Cave à vins & Champagne",
    description: "Sélection de grands crus, dégustation privée en chambre",
    color: "#92400E",
    bg: "bg-amber-50",
    fields: ["Date de livraison", "Occasion", "Budget", "Préférences"]
  },
  {
    id: "music",
    icon: Music,
    label: "Entertainment & Musique",
    description: "Musique live, DJ privé, soirées thématiques",
    color: "#1D4ED8",
    bg: "bg-blue-50",
    fields: ["Date et heure", "Type d'animation", "Durée", "Ambiance souhaitée"]
  },
  {
    id: "transfer",
    icon: Package,
    label: "Livraison & Shopping",
    description: "Courses, shopping de luxe, livraison de produits locaux",
    color: "#065F46",
    bg: "bg-emerald-50",
    fields: ["Date de livraison", "Articles souhaités", "Budget", "Adresse de livraison"]
  },
  {
    id: "butler",
    icon: Coffee,
    label: "Service majordome",
    description: "Un majordome dédié pour toutes vos demandes exclusives",
    color: "#374151",
    bg: "bg-slate-50",
    fields: ["Heure de disponibilité", "Type de service", "Durée", "Notes spéciales"]
  }
];

const MOCK_RESERVATIONS = [
  { id: "RES-2026-0081", apt: "Suite Royale Horizon", checkin: "14 Juin 2026", checkout: "21 Juin 2026", nights: 7, status: "upcoming", points: 350 },
  { id: "RES-2026-0044", apt: "Studio Premium Lagon", checkin: "02 Avr 2026", checkout: "05 Avr 2026", nights: 3, status: "done", points: 150 },
  { id: "RES-2025-0198", apt: "Suite Royale Horizon", checkin: "15 Déc 2025", checkout: "22 Déc 2025", nights: 7, status: "done", points: 350 },
];

const MOCK_HISTORY = [
  { label: "Séjour Suite Royale Horizon (7 nuits)", points: +350, date: "Juin 2026" },
  { label: "Bonus fidélité anniversaire", points: +200, date: "Mai 2026" },
  { label: "Réservation Studio Premium", points: +150, date: "Avr 2026" },
  { label: "Bon de réduction utilisé", points: -100, date: "Avr 2026" },
  { label: "Séjour Suite Royale (7 nuits)", points: +350, date: "Déc 2025" },
  { label: "Parrainage ami accepté", points: +100, date: "Nov 2025" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: LoyaltyTier }) {
  const t = TIERS.find(t => t.name === tier)!;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
      style={{ color: t.color, background: `${t.color}20`, border: `1px solid ${t.color}40` }}
    >
      <Crown className="w-3 h-3" />
      {tier}
    </span>
  );
}

function ProgressToNext({ current, tier }: { current: number; tier: LoyaltyTier }) {
  const idx = TIERS.findIndex(t => t.name === tier);
  const next = TIERS[idx + 1];
  if (!next) return (
    <div className="text-[11px] text-slate-400 font-medium mt-1">
      ✦ Niveau maximum atteint — Félicitations !
    </div>
  );
  const pct = Math.min(100, ((current - TIERS[idx].min) / (next.min - TIERS[idx].min)) * 100);
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
        <span>{current} pts</span>
        <span>{next.name} à {next.min} pts</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${TIERS[idx].color}, ${next.color})` }}
        />
      </div>
      <div className="text-[10px] text-slate-400 mt-1">{Math.round(pct)}% vers {next.name}</div>
    </div>
  );
}

function ServiceCard({
  service,
  onRequest
}: {
  service: typeof CONCIERGE_SERVICES[0];
  onRequest: (id: string) => void;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-slate-100 rounded-xl p-6 cursor-pointer group"
      onClick={() => onRequest(service.id)}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.bg}`}
        style={{ color: service.color }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-black text-slate-900 text-sm tracking-wide mb-1">{service.label}</h3>
      <p className="text-[12px] text-slate-400 font-light leading-relaxed mb-4">{service.description}</p>
      <button
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
        style={{ color: service.color }}
      >
        Demander
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MonEspacePage() {
  // Mock user data (will be replaced by Supabase auth)
  const user = { name: "Alexandre Moreau", email: "alexandre.m@email.com", points: 850, tier: "Silver" as LoyaltyTier };

  const [activeTab, setActiveTab] = useState<"dashboard" | "fidelite" | "conciergerie" | "reservations">("dashboard");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [expandedRes, setExpandedRes] = useState<string | null>(null);

  const currentTierData = TIERS.find(t => t.name === user.tier)!;
  const selectedService = CONCIERGE_SERVICES.find(s => s.id === activeService);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(activeService);
    setTimeout(() => {
      setActiveService(null);
      setFormData({});
      setSubmitted(null);
    }, 3000);
  };

  const TABS = [
    { id: "dashboard", label: "Vue d'ensemble", icon: TrendingUp },
    { id: "fidelite", label: "Fidélité & Points", icon: Award },
    { id: "conciergerie", label: "Conciergerie", icon: Sparkles },
    { id: "reservations", label: "Mes Séjours", icon: Calendar },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero Header ── */}
      <div
        className="relative pt-32 pb-16 px-6 md:px-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F1C3F 0%, #233D8C 60%, #1a2d6a 100%)" }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <TierBadge tier={user.tier} />
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Membre fidèle</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-2">
                Bonjour, {user.name.split(" ")[0]}
              </h1>
              <p className="text-white/50 font-light text-sm">{user.email}</p>
            </div>

            {/* Points Widget */}
            <div
              className="flex items-center gap-6 px-8 py-5 rounded-2xl border border-white/10"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Solde de points</div>
                <div className="text-4xl font-black text-white">{user.points.toLocaleString()}</div>
                <div className="text-[10px] text-white/30 mt-1">points disponibles</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Valeur</div>
                <div className="text-2xl font-black" style={{ color: currentTierData.color }}>
                  {(user.points * 0.1).toFixed(0)}€
                </div>
                <div className="text-[10px] text-white/30 mt-1">en avantages</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-10 border-b border-white/10">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                    active ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <AnimatePresence mode="wait">

          {/* ═══════════════════════════════════════ DASHBOARD ═══════════════════ */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Cards row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Statut fidélité */}
                <div className={`rounded-2xl p-6 border border-slate-100 bg-gradient-to-br ${currentTierData.bg} relative overflow-hidden`}>
                  <Crown className="w-8 h-8 mb-4" style={{ color: currentTierData.color }} />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Statut</div>
                  <div className="text-2xl font-black text-slate-900">{user.tier}</div>
                  <ProgressToNext current={user.points} tier={user.tier} />
                </div>

                {/* Prochain avantage */}
                <div className="rounded-2xl p-6 border border-slate-100 bg-white">
                  <Gift className="w-8 h-8 text-violet-500 mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Prochain avantage</div>
                  <div className="text-lg font-black text-slate-900 mb-1">Accès statut Gold</div>
                  <div className="text-[12px] text-slate-400">650 points restants</div>
                  <button
                    onClick={() => setActiveTab("fidelite")}
                    className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-violet-500 flex items-center gap-1"
                  >
                    Voir les avantages <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Prochain séjour */}
                <div className="rounded-2xl p-6 border border-slate-100 bg-white">
                  <Calendar className="w-8 h-8 text-[#233D8C] mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Prochain séjour</div>
                  <div className="text-lg font-black text-slate-900 mb-1">Suite Royale Horizon</div>
                  <div className="text-[12px] text-slate-400">14 – 21 Juin 2026 · 7 nuits</div>
                  <button
                    onClick={() => setActiveTab("conciergerie")}
                    className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#233D8C] flex items-center gap-1"
                  >
                    Ajouter des services <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Quick Services */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Services rapides</h2>
                  <button
                    onClick={() => setActiveTab("conciergerie")}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-[#233D8C] flex items-center gap-1"
                  >
                    Tous les services <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CONCIERGE_SERVICES.slice(0, 4).map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.button
                        key={s.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setActiveTab("conciergerie"); setActiveService(s.id); }}
                        className="bg-white border border-slate-100 rounded-xl p-5 flex flex-col items-center gap-3 text-center hover:shadow-lg transition-shadow"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}
                          style={{ color: s.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-700">{s.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Recent History */}
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Activité récente</h2>
                <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
                  {MOCK_HISTORY.slice(0, 4).map((h, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-slate-800">{h.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{h.date}</div>
                      </div>
                      <div className={`text-sm font-black ${h.points > 0 ? "text-emerald-600" : "text-rose-500"}`}>
                        {h.points > 0 ? "+" : ""}{h.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════ FIDÉLITÉ ════════════════════ */}
          {activeTab === "fidelite" && (
            <motion.div
              key="fidelite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Current status */}
              <div
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${currentTierData.color}22, ${currentTierData.color}08)`, border: `1px solid ${currentTierData.color}30` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Crown className="w-8 h-8" style={{ color: currentTierData.color }} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Votre statut actuel</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-2">{user.tier}</div>
                    <div className="text-slate-500 font-light text-sm">Membre depuis Novembre 2025</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Solde total</div>
                    <div className="text-5xl font-black" style={{ color: currentTierData.color }}>{user.points}</div>
                    <div className="text-sm text-slate-400 mt-1">points cumulés</div>
                  </div>
                </div>
                <ProgressToNext current={user.points} tier={user.tier} />
              </div>

              {/* All tiers */}
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Niveaux du programme</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {TIERS.map((tier) => {
                    const isCurrent = tier.name === user.tier;
                    const isUnlocked = user.points >= tier.min;
                    return (
                      <div
                        key={tier.name}
                        className={`rounded-2xl p-6 border-2 transition-all ${
                          isCurrent
                            ? "shadow-xl"
                            : isUnlocked
                            ? "opacity-80"
                            : "opacity-40 grayscale"
                        }`}
                        style={{
                          borderColor: isCurrent ? tier.color : "transparent",
                          background: isCurrent
                            ? `linear-gradient(135deg, ${tier.color}20, ${tier.color}05)`
                            : "white",
                          boxShadow: isCurrent ? `0 0 40px ${tier.color}25` : undefined
                        }}
                      >
                        <Crown className="w-6 h-6 mb-3" style={{ color: tier.color }} />
                        <div className="text-lg font-black text-slate-900 mb-0.5">{tier.name}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                          {tier.min === 0 ? "Dès l'inscription" : `Dès ${tier.min} pts`}
                        </div>
                        <div className="space-y-2">
                          {tier.perks.map((p) => (
                            <div key={p} className="flex items-start gap-2 text-[12px] text-slate-600">
                              <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                              {p}
                            </div>
                          ))}
                        </div>
                        {isCurrent && (
                          <div
                            className="mt-5 text-center text-[10px] font-black uppercase tracking-[0.2em] py-2 rounded-full"
                            style={{ background: `${tier.color}20`, color: tier.color }}
                          >
                            ✦ Statut actuel
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* How to earn */}
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Comment gagner des points ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { icon: Calendar, label: "Séjour", desc: "50 points par nuit passée à la résidence", color: "#233D8C" },
                    { icon: Heart, label: "Parrainage", desc: "100 points pour chaque ami parrainé", color: "#DB2777" },
                    { icon: MessageSquare, label: "Avis client", desc: "25 points pour un avis Google ou TripAdvisor", color: "#059669" },
                    { icon: Zap, label: "Réservation directe", desc: "+20% de points vs réservation via agence", color: "#D97706" },
                    { icon: Gift, label: "Bonus anniversaire", desc: "200 points offerts chaque année", color: "#7C3AED" },
                    { icon: Star, label: "Séjour prolongé", desc: "Bonus x2 pour 7 nuits ou plus", color: "#DC2626" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="bg-white border border-slate-100 rounded-xl p-5 flex gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                          style={{ background: `${item.color}15`, color: item.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900 mb-0.5">{item.label}</div>
                          <div className="text-[12px] text-slate-400 font-light">{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Full history */}
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Historique des points</h2>
                <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
                  {MOCK_HISTORY.map((h, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-slate-800">{h.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{h.date}</div>
                      </div>
                      <div className={`text-sm font-black px-3 py-1 rounded-full ${
                        h.points > 0
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-rose-600 bg-rose-50"
                      }`}>
                        {h.points > 0 ? "+" : ""}{h.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════ CONCIERGERIE ════════════════ */}
          {activeTab === "conciergerie" && (
            <motion.div
              key="conciergerie"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Services exclusifs</div>
                  <h2 className="text-3xl font-serif italic text-slate-900">Votre Conciergerie</h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 bg-white border border-slate-100 rounded-full px-4 py-2">
                  <Phone className="w-3.5 h-3.5" />
                  Disponible 24h/24 · 7j/7
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {CONCIERGE_SERVICES.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onRequest={(id) => setActiveService(id)}
                  />
                ))}
              </div>

              {/* Emergency Call */}
              <div className="mt-8 bg-[#0F1C3F] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-base">Ligne directe conciergerie</div>
                    <div className="text-white/40 text-[12px]">Pour toute demande urgente ou personnalisée</div>
                  </div>
                </div>
                <a
                  href="tel:+262692000000"
                  className="bg-white text-[#0F1C3F] px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  Appeler maintenant
                </a>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════ RÉSERVATIONS ════════════════ */}
          {activeTab === "reservations" && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Historique complet</div>
                  <h2 className="text-3xl font-serif italic text-slate-900">Mes Séjours</h2>
                </div>
                <Link
                  href="/apartments"
                  className="bg-[#233D8C] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Nouvelle réservation
                </Link>
              </div>

              {MOCK_RESERVATIONS.map((res) => {
                const isExpanded = expandedRes === res.id;
                const isUpcoming = res.status === "upcoming";
                return (
                  <div key={res.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <button
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                      onClick={() => setExpandedRes(isExpanded ? null : res.id)}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isUpcoming ? "bg-blue-50" : "bg-slate-50"}`}>
                          <Calendar className={`w-5 h-5 ${isUpcoming ? "text-[#233D8C]" : "text-slate-300"}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-black text-slate-900 text-sm">{res.apt}</div>
                          <div className="text-[12px] text-slate-400">{res.checkin} → {res.checkout} · {res.nights} nuits</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                            isUpcoming
                              ? "bg-blue-50 text-[#233D8C]"
                              : "bg-emerald-50 text-emerald-700"
                          }`}>
                            {isUpcoming ? "À venir" : "Terminé"}
                          </div>
                        </div>
                        <div className="text-[11px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                          +{res.points} pts
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-slate-50"
                        >
                          <div className="px-6 py-5 bg-slate-50/50 flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Détails</div>
                              <div className="space-y-2 text-sm">
                                <div className="flex gap-2"><span className="text-slate-400 w-24">Référence</span><span className="font-medium">{res.id}</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">Arrivée</span><span className="font-medium">{res.checkin}</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">Départ</span><span className="font-medium">{res.checkout}</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">Durée</span><span className="font-medium">{res.nights} nuits</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">Points gagnés</span><span className="font-black text-amber-600">+{res.points} pts</span></div>
                              </div>
                            </div>
                            {isUpcoming && (
                              <div className="flex flex-col gap-3">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Actions</div>
                                <button
                                  onClick={() => setActiveTab("conciergerie")}
                                  className="bg-[#233D8C] text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-black transition-colors"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Ajouter des services
                                </button>
                                <button className="border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-colors">
                                  Modifier le séjour
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Service Request Modal ── */}
      <AnimatePresence>
        {activeService && selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm"
              onClick={() => { setActiveService(null); setFormData({}); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed z-[210] inset-0 flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden">
                {/* Header */}
                <div
                  className="px-8 py-6 flex items-center justify-between"
                  style={{ background: `linear-gradient(135deg, ${selectedService.color}15, ${selectedService.color}05)` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedService.bg}`}
                      style={{ color: selectedService.color }}
                    >
                      {<selectedService.icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="font-black text-slate-900">{selectedService.label}</div>
                      <div className="text-[11px] text-slate-400">{selectedService.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveService(null); setFormData({}); }}
                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                {/* Form or success */}
                {submitted === activeService ? (
                  <div className="px-8 py-12 text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="font-black text-slate-900 text-lg mb-2">Demande envoyée !</div>
                    <div className="text-slate-400 text-sm">Notre équipe vous contactera sous 30 minutes.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                    {selectedService.fields.map((field) => (
                      <div key={field}>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1.5">{field}</label>
                        <input
                          type="text"
                          placeholder={`Votre ${field.toLowerCase()}`}
                          value={formData[field] || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                          style={{ "--tw-ring-color": selectedService.color } as React.CSSProperties}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1.5">Notes supplémentaires</label>
                      <textarea
                        rows={3}
                        placeholder="Précisez vos attentes..."
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:opacity-90 mt-2"
                      style={{ background: selectedService.color }}
                    >
                      Envoyer la demande
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
