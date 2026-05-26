"use client";

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Trash2,
    Tag,
    Calendar,
    Percent,
    CheckCircle2,
    XCircle
} from 'lucide-react';

const INITIAL_OFFERS = [
    { id: 1, title: 'Séjour Longue Durée', discount: '20%', code: 'LONG20', status: 'active', end: '31 Déc 2026' },
    { id: 2, title: 'Early Bird Cotonou', discount: '15%', code: 'EARLY15', status: 'active', end: '15 Juin 2026' },
    { id: 3, title: 'Weekend Romantique', discount: '10%', code: 'LOVE10', status: 'expired', end: '14 Fév 2026' },
];

export default function AdminOffers() {
    const [offers, setOffers] = useState(INITIAL_OFFERS);

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 mb-2 italic">Offres & Promotions</h1>
                    <p className="text-slate-500 font-light">Créez et gérez les remises pour vos clients.</p>
                </div>
                <button className="bg-[#233D8C] text-white px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#233D8C]/20">
                    <Plus className="w-4 h-4" /> Nouvelle Promo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-[#233D8C]/5 transition-colors" />

                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[#233D8C]/5 flex items-center justify-center text-[#233D8C]">
                                    <Percent className="w-6 h-6" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${offer.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {offer.status}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{offer.title}</h3>
                                <p className="text-3xl font-black text-[#233D8C]">{offer.discount} <span className="text-xs font-medium text-slate-400">de remise</span></p>
                            </div>

                            <div className="pt-6 border-t border-slate-50 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Code promo</span>
                                    <span className="font-mono font-bold bg-slate-50 px-2 py-1 rounded">{offer.code}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Expire le</span>
                                    <div className="flex items-center gap-2 text-slate-900 font-medium">
                                        <Calendar className="w-4 h-4 text-[#233D8C]" />
                                        {offer.end}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#233D8C] transition-all">
                                    Modifier
                                </button>
                                <button className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
