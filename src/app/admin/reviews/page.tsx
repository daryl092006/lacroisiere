"use client";

import React, { useState } from 'react';
import {
    CheckCircle2,
    XCircle,
    Clock,
    Star,
    User,
    MessageSquare,
    Filter,
    ShieldCheck
} from 'lucide-react';

const INITIAL_REVIEWS = [
    { id: 1, author: 'Jean Dupont', date: '25 Mai 2026', content: 'Un séjour inoubliable, la vue est magnifique !', rating: 5, status: 'approved' },
    { id: 2, author: 'Marie-Claire K.', date: '24 Mai 2026', content: 'Très bel appartement, mais un peu de bruit le soir.', rating: 4, status: 'pending' },
    { id: 3, author: 'Marc-Aurèle', date: '22 Mai 2026', content: 'Service impeccable, je recommande vivement.', rating: 5, status: 'pending' },
    { id: 4, author: 'Ines B.', date: '20 Mai 2026', content: 'La climatisation fuyait un peu au début mais le staff a été réactif.', rating: 3, status: 'rejected' },
];

export default function AdminReviews() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);

    const updateStatus = (id: number, newStatus: string) => {
        setReviews(prev => prev.map(rev => rev.id === id ? { ...rev, status: newStatus } : rev));
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-serif text-slate-900 mb-2 italic">Modération des Avis</h1>
                <p className="text-slate-500 font-light text-lg">Approuvez ou gérez les retours d'expérience de vos clients.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* STATS OVERVIEW */}
                <div className="w-full lg:w-80 space-y-6 shrink-0">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Aperçu</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-600">Total Avis</span>
                                <span className="text-lg font-bold">128</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-600">Attente</span>
                                <span className="text-lg font-bold text-amber-500">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-600">Moyenne</span>
                                <div className="flex items-center gap-1 font-bold text-slate-900">
                                    4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#233D8C] p-8 rounded-3xl text-white shadow-xl shadow-[#233D8C]/20">
                        <ShieldCheck className="w-10 h-10 mb-6 text-white/40" />
                        <h3 className="text-xl font-serif mb-4 leading-tight italic">Confiance & <br />Transparence.</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Publier des avis honnêtes renforce la crédibilité de La Croisière.</p>
                    </div>
                </div>

                {/* REVIEWS LIST */}
                <div className="flex-1 space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:border-[#233D8C]/20 transition-all">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#233D8C]">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{review.author}</p>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{review.date}</p>
                                        </div>
                                        <div className="flex items-center gap-0.5 ml-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 font-light leading-relaxed italic">"{review.content}"</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {review.status === 'pending' ? (
                                        <>
                                            <button
                                                onClick={() => updateStatus(review.id, 'approved')}
                                                className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4" /> Approuver
                                            </button>
                                            <button
                                                onClick={() => updateStatus(review.id, 'rejected')}
                                                className="bg-red-50 text-red-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
                                            >
                                                <XCircle className="w-4 h-4" /> Refuser
                                            </button>
                                        </>
                                    ) : (
                                        <div className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${review.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {review.status === 'approved' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                            {review.status === 'approved' ? 'Modéré - Public' : 'Rejeté'}
                                            <button onClick={() => updateStatus(review.id, 'pending')} className="ml-2 text-slate-400 hover:text-slate-900 underline underline-offset-4">Changer</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
