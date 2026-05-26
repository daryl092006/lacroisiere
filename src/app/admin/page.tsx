"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Home,
    Star,
    ArrowUpRight,
    ArrowDownRight,
    CalendarCheck,
    Tag
} from 'lucide-react';

const STATS = [
    { label: 'Revenu Mensuel', value: '12.5M FCFA', icon: TrendingUp, trend: '+12.5%', isPositive: true },
    { label: 'Occupants Actuels', value: '18', icon: Users, trend: '+2', isPositive: true },
    { label: 'Appartements Libres', value: '4', icon: Home, trend: '-1', isPositive: false },
    { label: 'Note Moyenne', value: '4.9/5', icon: Star, trend: 'stable', isPositive: true },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-serif text-slate-900 mb-2">Bonjour, Staff !</h1>
                <p className="text-slate-500 font-light italic">Voici ce qui se passe à La Croisière aujourd'hui.</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#233D8C]">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.trend === 'stable' ? null : stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* RECENT ACTIVITY */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-xl font-serif text-slate-900 italic">Réservations Récentes</h2>
                        <button className="text-xs font-black uppercase tracking-widest text-[#233D8C]">Voir tout</button>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                                    <th className="px-8 py-4">Client</th>
                                    <th className="px-8 py-4">Appartement</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Montant</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-900">Jean Dupont</p>
                                        <p className="text-xs text-slate-400">il y a 2h</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-600 italic">Suite Royale #402</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">Confirmé</span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-sm text-[#233D8C]">450 000 FCFA</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-900">Marie-Claire K.</p>
                                        <p className="text-xs text-slate-400">il y a 5h</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-600 italic">Studio Zen #105</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full">En attente</span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-sm text-[#233D8C]">120 000 FCFA</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="space-y-6">
                    <div className="bg-[#233D8C] rounded-3xl p-8 text-white shadow-xl shadow-[#233D8C]/20 shrink-0">
                        <CalendarCheck className="w-10 h-10 mb-6 text-white/40" />
                        <h3 className="text-2xl font-serif mb-4 italic leading-tight">Prochaine <br />arrivée.</h3>
                        <p className="text-white/60 text-sm mb-6 leading-relaxed">M. Traoré arrive demain à 14h00. Navette aéroport demandée.</p>
                        <button className="w-full bg-white text-[#233D8C] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Gérer l'arrivée</button>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Actions Rapides</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <button className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left group">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 group-hover:text-[#233D8C]">
                                    <Home className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium">Ajouter un appart</span>
                            </button>
                            <button className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left group">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 group-hover:text-[#233D8C]">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium">Créer une promo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
