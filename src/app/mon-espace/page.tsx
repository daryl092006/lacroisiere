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
import { useTranslation } from "@/i18n/client";

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

// ─── Static data (non-translatable) ──────────────────────────────────────────

const TIERS_META: { name: LoyaltyTier; min: number; color: string; bg: string }[] = [
  { name: "Bronze", min: 0,    color: "#CD7F32", bg: "from-amber-900/20 to-amber-700/10" },
  { name: "Silver", min: 500,  color: "#A8A9AD", bg: "from-slate-400/20 to-slate-200/10" },
  { name: "Gold",   min: 1500, color: "#D4AF37", bg: "from-yellow-600/20 to-yellow-400/10" },
  { name: "Diamond",min: 4000, color: "#B9F2FF", bg: "from-cyan-400/20 to-blue-300/10" },
];

const CONCIERGE_SERVICE_IDS = [
  { id: "chauffeur", icon: Car,         color: "#233D8C", bg: "bg-blue-50",    fields: ["Date et heure", "Lieu de départ", "Destination", "Nombre de passagers"] },
  { id: "guide",     icon: Camera,      color: "#2E7D5A", bg: "bg-emerald-50", fields: ["Date souhaitée", "Durée (demi-journée / journée)", "Centres d'intérêt", "Langue"] },
  { id: "restaurant",icon: Utensils,    color: "#7C3AED", bg: "bg-violet-50",  fields: ["Date et heure", "Restaurant souhaité", "Nombre de couverts", "Régime alimentaire"] },
  { id: "spa",       icon: Sparkles,    color: "#DB2777", bg: "bg-pink-50",    fields: ["Date et heure", "Soin souhaité", "Durée", "Préférences"] },
  { id: "wine",      icon: Wine,        color: "#92400E", bg: "bg-amber-50",   fields: ["Date de livraison", "Occasion", "Budget", "Préférences"] },
  { id: "music",     icon: Music,       color: "#1D4ED8", bg: "bg-blue-50",    fields: ["Date et heure", "Type d'animation", "Durée", "Ambiance souhaitée"] },
  { id: "transfer",  icon: Package,     color: "#065F46", bg: "bg-emerald-50", fields: ["Date de livraison", "Articles souhaités", "Budget", "Adresse de livraison"] },
  { id: "butler",    icon: Coffee,      color: "#374151", bg: "bg-slate-50",   fields: ["Heure de disponibilité", "Type de service", "Durée", "Notes spéciales"] },
];

const MOCK_RESERVATIONS = [
  { id: "RES-2026-0081", apt: "Suite Royale Horizon", checkin: "14 Juin 2026", checkout: "21 Juin 2026", nights: 7, status: "upcoming", points: 350 },
  { id: "RES-2026-0044", apt: "Studio Premium Lagon", checkin: "02 Avr 2026", checkout: "05 Avr 2026", nights: 3, status: "done", points: 150 },
  { id: "RES-2025-0198", apt: "Suite Royale Horizon", checkin: "15 Déc 2025", checkout: "22 Déc 2025", nights: 7, status: "done", points: 350 },
];

const MOCK_HISTORY = [
  { label: "Séjour Suite Royale Horizon (7 nuits)", points: +350, date: "Juin 2026" },
  { label: "Bonus fidélité anniversaire",           points: +200, date: "Mai 2026" },
  { label: "Réservation Studio Premium",            points: +150, date: "Avr 2026" },
  { label: "Bon de réduction utilisé",              points: -100, date: "Avr 2026" },
  { label: "Séjour Suite Royale (7 nuits)",         points: +350, date: "Déc 2025" },
  { label: "Parrainage ami accepté",                points: +100, date: "Nov 2025" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TierBadge({ tier, color }: { tier: LoyaltyTier; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
      style={{ color, background: `${color}20`, border: `1px solid ${color}40` }}
    >
      <Crown className="w-3 h-3" />
      {tier}
    </span>
  );
}

function ProgressToNext({ current, tier, toNextLabel }: { current: number; tier: LoyaltyTier; toNextLabel: string }) {
  const idx = TIERS_META.findIndex(t => t.name === tier);
  const next = TIERS_META[idx + 1];
  const t = TIERS_META[idx];
  if (!next) return (
    <div className="text-[11px] text-slate-400 font-medium mt-1">
      ✦ Niveau maximum atteint — Félicitations !
    </div>
  );
  const pct = Math.min(100, ((current - t.min) / (next.min - t.min)) * 100);
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
          style={{ background: `linear-gradient(90deg, ${t.color}, ${next.color})` }}
        />
      </div>
      <div className="text-[10px] text-slate-400 mt-1">{Math.round(pct)}{toNextLabel} {next.name}</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MonEspacePage() {
  const { t } = useTranslation();

  // Mock user data (will be replaced by Supabase auth)
  const user = { name: "Alexandre Moreau", email: "alexandre.m@email.com", points: 850, tier: "Silver" as LoyaltyTier };

  const [activeTab, setActiveTab] = useState<"dashboard" | "fidelite" | "conciergerie" | "reservations">("dashboard");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [expandedRes, setExpandedRes] = useState<string | null>(null);

  const currentTierMeta = TIERS_META.find(t => t.name === user.tier)!;
  const selectedServiceMeta = CONCIERGE_SERVICE_IDS.find(s => s.id === activeService);

  // Build translated services list
  const conciergeServices = CONCIERGE_SERVICE_IDS.map(s => ({
    ...s,
    label: t(`MonEspace.concierge.services.${s.id}.label`),
    description: t(`MonEspace.concierge.services.${s.id}.description`),
  }));

  const selectedService = conciergeServices.find(s => s.id === activeService);

  // Build translated tiers list
  const TIERS = TIERS_META.map(tier => ({
    ...tier,
    perks: t(`MonEspace.tiers.${tier.name}.perks`, { returnObjects: true }) as string[],
  }));

  // Build earn points
  const earnPoints = t('MonEspace.earnPoints', { returnObjects: true }) as { label: string; desc: string }[];
  const earnIcons = [Calendar, Heart, MessageSquare, Zap, Gift, Star];

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
    { id: "dashboard",    label: t('MonEspace.tabs.dashboard'),    icon: TrendingUp },
    { id: "fidelite",     label: t('MonEspace.tabs.fidelite'),     icon: Award },
    { id: "conciergerie", label: t('MonEspace.tabs.conciergerie'), icon: Sparkles },
    { id: "reservations", label: t('MonEspace.tabs.reservations'), icon: Calendar },
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

        <div className="w-full mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <TierBadge tier={user.tier} color={currentTierMeta.color} />
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">{t('MonEspace.loyalMember')}</span>
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
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">{t('MonEspace.pointsBalance')}</div>
                <div className="text-4xl font-black text-white">{user.points.toLocaleString()}</div>
                <div className="text-[10px] text-white/30 mt-1">{t('MonEspace.pointsAvailable')}</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">{t('MonEspace.value')}</div>
                <div className="text-2xl font-black" style={{ color: currentTierMeta.color }}>
                  {(user.points * 0.1).toFixed(0)}€
                </div>
                <div className="text-[10px] text-white/30 mt-1">{t('MonEspace.inAdvantages')}</div>
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
      <div className="w-full mx-auto px-6 md:px-16 py-12">
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
                <div className={`rounded-2xl p-6 border border-slate-100 bg-gradient-to-br ${currentTierMeta.bg} relative overflow-hidden`}>
                  <Crown className="w-8 h-8 mb-4" style={{ color: currentTierMeta.color }} />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{t('MonEspace.dashboard.status')}</div>
                  <div className="text-2xl font-black text-slate-900">{user.tier}</div>
                  <ProgressToNext current={user.points} tier={user.tier} toNextLabel={t('MonEspace.fidelite.toNext')} />
                </div>

                {/* Prochain avantage */}
                <div className="rounded-2xl p-6 border border-slate-100 bg-white">
                  <Gift className="w-8 h-8 text-violet-500 mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{t('MonEspace.dashboard.nextPerk')}</div>
                  <div className="text-lg font-black text-slate-900 mb-1">Accès statut Gold</div>
                  <div className="text-[12px] text-slate-400">650 points restants</div>
                  <button
                    onClick={() => setActiveTab("fidelite")}
                    className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-violet-500 flex items-center gap-1"
                  >
                    {t('MonEspace.dashboard.seePerks')} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Prochain séjour */}
                <div className="rounded-2xl p-6 border border-slate-100 bg-white">
                  <Calendar className="w-8 h-8 text-[#233D8C] mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{t('MonEspace.dashboard.nextStay')}</div>
                  <div className="text-lg font-black text-slate-900 mb-1">Suite Royale Horizon</div>
                  <div className="text-[12px] text-slate-400">14 – 21 Juin 2026 · 7 nuits</div>
                  <button
                    onClick={() => setActiveTab("conciergerie")}
                    className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#233D8C] flex items-center gap-1"
                  >
                    {t('MonEspace.dashboard.addServices')} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Quick Services */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('MonEspace.dashboard.quickServices')}</h2>
                  <button
                    onClick={() => setActiveTab("conciergerie")}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-[#233D8C] flex items-center gap-1"
                  >
                    {t('MonEspace.dashboard.allServices')} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {conciergeServices.slice(0, 4).map((s) => {
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
                <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">{t('MonEspace.dashboard.recentActivity')}</h2>
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
                style={{ background: `linear-gradient(135deg, ${currentTierMeta.color}22, ${currentTierMeta.color}08)`, border: `1px solid ${currentTierMeta.color}30` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Crown className="w-8 h-8" style={{ color: currentTierMeta.color }} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{t('MonEspace.fidelite.currentStatus')}</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-2">{user.tier}</div>
                    <div className="text-slate-500 font-light text-sm">{t('MonEspace.fidelite.memberSince')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{t('MonEspace.fidelite.totalBalance')}</div>
                    <div className="text-5xl font-black" style={{ color: currentTierMeta.color }}>{user.points}</div>
                    <div className="text-sm text-slate-400 mt-1">{t('MonEspace.fidelite.pointsCumulated')}</div>
                  </div>
                </div>
                <ProgressToNext current={user.points} tier={user.tier} toNextLabel={t('MonEspace.fidelite.toNext')} />
              </div>

              {/* All tiers */}
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">{t('MonEspace.fidelite.levels')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {TIERS.map((tier) => {
                    const isCurrent = tier.name === user.tier;
                    const isUnlocked = user.points >= tier.min;
                    return (
                      <div
                        key={tier.name}
                        className={`rounded-2xl p-6 border-2 transition-all ${
                          isCurrent ? "shadow-xl" : isUnlocked ? "opacity-80" : "opacity-40 grayscale"
                        }`}
                        style={{
                          borderColor: isCurrent ? tier.color : "transparent",
                          background: isCurrent ? `linear-gradient(135deg, ${tier.color}20, ${tier.color}05)` : "white",
                          boxShadow: isCurrent ? `0 0 40px ${tier.color}25` : undefined
                        }}
                      >
                        <Crown className="w-6 h-6 mb-3" style={{ color: tier.color }} />
                        <div className="text-lg font-black text-slate-900 mb-0.5">{tier.name}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                          {tier.min === 0 ? t('MonEspace.fidelite.fromStart') : t('MonEspace.fidelite.fromPoints', { min: tier.min })}
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
                            ✦ {t('MonEspace.fidelite.currentTier')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* How to earn */}
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">{t('MonEspace.fidelite.howToEarn')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {earnPoints.map((item, idx) => {
                    const Icon = earnIcons[idx];
                    const colors = ["#233D8C", "#DB2777", "#059669", "#D97706", "#7C3AED", "#DC2626"];
                    const color = colors[idx];
                    return (
                      <div key={item.label} className="bg-white border border-slate-100 rounded-xl p-5 flex gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                          style={{ background: `${color}15`, color }}
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
                <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">{t('MonEspace.fidelite.history')}</h2>
                <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
                  {MOCK_HISTORY.map((h, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-slate-800">{h.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{h.date}</div>
                      </div>
                      <div className={`text-sm font-black px-3 py-1 rounded-full ${
                        h.points > 0 ? "text-emerald-700 bg-emerald-50" : "text-rose-600 bg-rose-50"
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
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">{t('MonEspace.concierge.exclusiveServices')}</div>
                  <h2 className="text-3xl font-serif italic text-slate-900">{t('MonEspace.concierge.title')}</h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 bg-white border border-slate-100 rounded-full px-4 py-2">
                  <Phone className="w-3.5 h-3.5" />
                  {t('MonEspace.concierge.available247')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {conciergeServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.id}
                      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-slate-100 rounded-xl p-6 cursor-pointer group"
                      onClick={() => setActiveService(service.id)}
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
                        {t('MonEspace.concierge.request')}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Emergency Call */}
              <div className="mt-8 bg-[#0F1C3F] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-base">{t('MonEspace.concierge.directLine')}</div>
                    <div className="text-white/40 text-[12px]">{t('MonEspace.concierge.directLineDesc')}</div>
                  </div>
                </div>
                <a
                  href="tel:+22900000000"
                  className="bg-white text-[#0F1C3F] px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  {t('MonEspace.concierge.callNow')}
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
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">{t('MonEspace.reservations.fullHistory')}</div>
                  <h2 className="text-3xl font-serif italic text-slate-900">{t('MonEspace.reservations.title')}</h2>
                </div>
                <Link
                  href="/apartments"
                  className="bg-[#233D8C] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t('MonEspace.reservations.newBooking')}
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
                          <div className="text-[12px] text-slate-400">{res.checkin} → {res.checkout} · {res.nights} {t('MonEspace.reservations.nights')}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                            isUpcoming ? "bg-blue-50 text-[#233D8C]" : "bg-emerald-50 text-emerald-700"
                          }`}>
                            {isUpcoming ? t('MonEspace.reservations.upcoming') : t('MonEspace.reservations.done')}
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
                              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">{t('MonEspace.reservations.details')}</div>
                              <div className="space-y-2 text-sm">
                                <div className="flex gap-2"><span className="text-slate-400 w-24">{t('MonEspace.reservations.reference')}</span><span className="font-medium">{res.id}</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">{t('MonEspace.reservations.arrival')}</span><span className="font-medium">{res.checkin}</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">{t('MonEspace.reservations.departure')}</span><span className="font-medium">{res.checkout}</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">{t('MonEspace.reservations.duration')}</span><span className="font-medium">{res.nights} {t('MonEspace.reservations.nights')}</span></div>
                                <div className="flex gap-2"><span className="text-slate-400 w-24">{t('MonEspace.reservations.pointsEarned')}</span><span className="font-black text-amber-600">+{res.points} pts</span></div>
                              </div>
                            </div>
                            {isUpcoming && (
                              <div className="flex flex-col gap-3">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{t('MonEspace.reservations.actions')}</div>
                                <button
                                  onClick={() => setActiveTab("conciergerie")}
                                  className="bg-[#233D8C] text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-black transition-colors"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  {t('MonEspace.reservations.addServices')}
                                </button>
                                <button className="border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-colors">
                                  {t('MonEspace.reservations.editStay')}
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
                    <div className="font-black text-slate-900 text-lg mb-2">{t('MonEspace.modal.requestSent')}</div>
                    <div className="text-slate-400 text-sm">{t('MonEspace.modal.requestSentDesc')}</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                    {selectedServiceMeta?.fields.map((field) => (
                      <div key={field}>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1.5">{field}</label>
                        <input
                          type="text"
                          value={formData[field] || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#233D8C]/20 focus:border-[#233D8C] transition-all"
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="w-full mt-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors"
                      style={{ background: selectedService.color }}
                    >
                      {t('MonEspace.modal.submit')}
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
