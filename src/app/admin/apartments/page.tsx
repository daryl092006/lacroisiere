"use client";

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    LayoutGrid,
    List as ListIcon,
    X,
    Check,
    Building2,
    CircleDot,
    Home,
    Users,
    Bed,
    Bath,
    Wifi,
    Wind,
    Coffee,
    Tv,
    UtensilsCrossed,
    Baby,
    Car,
    Waves,
    Dumbbell,
    Shield,
    Sun,
    ClipboardList,
    Briefcase
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const AMENITIES_LIST = [
    { id: 'wifi', label: 'WiFi Haut Débit', icon: Wifi },
    { id: 'ac', label: 'Climatisation', icon: Wind },
    { id: 'coffee', label: 'Machine Café', icon: Coffee },
    { id: 'tv', label: 'Smart TV', icon: Tv },
    { id: 'kitchen', label: 'Cuisine Équipée', icon: UtensilsCrossed },
    { id: 'parking', label: 'Parking Gratuit', icon: Car },
    { id: 'pool', label: 'Accès Piscine', icon: Waves },
    { id: 'gym', label: 'Salle de Sport', icon: Dumbbell },
    { id: 'security', label: 'Sécurité 24/7', icon: Shield },
    { id: 'balcony', label: 'Balcon Privé', icon: Sun },
    { id: 'housekeeping', label: 'Ménage Inclus', icon: ClipboardList },
    { id: 'workspace', label: 'Espace Travail', icon: Briefcase },
];

const INITIAL_APARTMENTS = [
    {
        id: 1,
        name: 'Suite Panoramique',
        type: 'Luxury',
        price: 450000,
        status: 'Occupé',
        image: '/exterior.png',
        capacity: { adults: 2, children: 1, babies: 1 },
        bedrooms: 2,
        bathrooms: 1,
        amenities: ['wifi', 'ac', 'tv', 'kitchen', 'security', 'parking', 'pool']
    },
    {
        id: 2,
        name: 'Studio Zen',
        type: 'Premium',
        price: 120000,
        status: 'Libre',
        image: '/exterior.png',
        capacity: { adults: 2, children: 0, babies: 0 },
        bedrooms: 1,
        bathrooms: 1,
        amenities: ['wifi', 'ac', 'coffee', 'workspace', 'security']
    },
    {
        id: 3,
        name: 'Appartement Business',
        type: 'Premium',
        price: 180000,
        status: 'Nettoyage',
        image: '/exterior.png',
        capacity: { adults: 2, children: 0, babies: 0 },
        bedrooms: 1,
        bathrooms: 1,
        amenities: ['wifi', 'ac', 'tv', 'kitchen', 'workspace', 'parking', 'security']
    },
];

export default function AdminApartments() {
    const [apartments, setApartments] = useState(INITIAL_APARTMENTS);
    const [isListView, setIsListView] = useState(true);
    const [editingApt, setEditingApt] = useState<any>(null);
    const [inlinePriceId, setInlinePriceId] = useState<number | null>(null);

    const handleUpdateApartment = (updatedApt: any) => {
        setApartments(prev => prev.map(apt => apt.id === updatedApt.id ? updatedApt : apt));
        setEditingApt(null);
    };

    const handlePriceChange = (id: number, newPrice: number) => {
        setApartments(prev => prev.map(apt => apt.id === id ? { ...apt, price: newPrice } : apt));
    };

    return (
        <div className="space-y-10">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 mb-2 italic">Gestion des Appartements</h1>
                    <p className="text-slate-500 font-light">Gérez les tarifs, la composition et les équipements.</p>
                </div>
                <button className="bg-[#233D8C] text-white px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#233D8C]/20">
                    <Plus className="w-4 h-4" /> Ajouter un appartement
                </button>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-full outline-none focus:border-[#233D8C]/30"
                    />
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl font-bold text-[10px] uppercase text-slate-400">
                    <span className="px-3">Affichage :</span>
                    <button onClick={() => setIsListView(true)} className={`p-2 rounded-lg ${isListView ? 'bg-white shadow-sm text-[#233D8C]' : 'hover:text-slate-600'}`}><ListIcon className="w-4 h-4" /></button>
                    <button onClick={() => setIsListView(false)} className={`p-2 rounded-lg ${!isListView ? 'bg-white shadow-sm text-[#233D8C]' : 'hover:text-slate-600'}`}><LayoutGrid className="w-4 h-4" /></button>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                            <th className="px-8 py-5">Appartement</th>
                            <th className="px-8 py-5 text-center">Capacité</th>
                            <th className="px-8 py-5 text-center">Config</th>
                            <th className="px-8 py-5">Prix / Nuit</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {apartments.map((apt) => (
                            <tr key={apt.id} className="group hover:bg-slate-50 transition-colors text-sm">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl relative overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                                            <Image src={apt.image} alt={apt.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 leading-none mb-1">{apt.name}</p>
                                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-black tracking-tighter">{apt.type}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <div className="flex items-center justify-center gap-3 text-slate-400">
                                        <div className="flex flex-col items-center"><Users className="w-4 h-4 mb-0.5 text-slate-900" /><span className="text-[10px] font-bold">{apt.capacity.adults}</span></div>
                                        <div className="flex flex-col items-center"><Baby className="w-4 h-4 mb-0.5 text-slate-400" /><span className="text-[10px] font-bold">{apt.capacity.children + apt.capacity.babies}</span></div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <div className="flex items-center justify-center gap-3 text-slate-400">
                                        <div className="flex flex-col items-center"><Bed className="w-4 h-4 mb-0.5" /><span className="text-[10px] font-bold">{apt.bedrooms}</span></div>
                                        <div className="flex flex-col items-center"><Bath className="w-4 h-4 mb-0.5" /><span className="text-[10px] font-bold">{apt.bathrooms}</span></div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 group/price cursor-pointer" onClick={() => setInlinePriceId(apt.id)}>
                                        <p className="font-black text-slate-900">{apt.price.toLocaleString()} F</p>
                                        <Edit2 className="w-3 h-3 text-slate-300 opacity-0 group-hover/price:opacity-100" />
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${apt.status === 'Libre' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                        <span className="text-xs font-medium">{apt.status}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setEditingApt(apt)} className="p-2 hover:bg-white rounded-lg text-[#233D8C] transition-all shadow-sm border border-slate-100"><Edit2 className="w-4 h-4" /></button>
                                        <button className="p-2 hover:bg-white rounded-lg text-red-400 transition-all shadow-sm border border-slate-100"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {editingApt && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingApt(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#233D8C] text-white flex items-center justify-center shadow-lg shadow-[#233D8C]/20"><Edit2 className="w-6 h-6" /></div>
                                    <div><h2 className="text-2xl font-serif italic text-slate-900 leading-none">Modifier la composition</h2><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Édition des caractéristiques techniques</p></div>
                                </div>
                                <button onClick={() => setEditingApt(null)} className="p-3 hover:bg-white rounded-full text-slate-300 hover:text-slate-900 transition-all"><X className="w-6 h-6" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <form id="edit-apt-form" className="space-y-10" onSubmit={(e: any) => {
                                    e.preventDefault();
                                    const fd = new FormData(e.target);
                                    const selectedAmenities = AMENITIES_LIST.filter(a => fd.get(`amenity-${a.id}`)).map(a => a.id);
                                    handleUpdateApartment({
                                        ...editingApt,
                                        name: fd.get('name'),
                                        price: parseInt(fd.get('price') as string),
                                        status: fd.get('status'),
                                        capacity: {
                                            adults: parseInt(fd.get('adults') as string),
                                            children: parseInt(fd.get('children') as string),
                                            babies: parseInt(fd.get('babies') as string),
                                        },
                                        bedrooms: parseInt(fd.get('bedrooms') as string),
                                        bathrooms: parseInt(fd.get('bathrooms') as string),
                                        amenities: selectedAmenities
                                    });
                                }}>

                                    {/* SECTION 1: INFOS GÉNÉRALES */}
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#233D8C] flex items-center gap-2"><Home className="w-4 h-4" /> Informations de base</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Nom de la suite</label><input name="name" defaultValue={editingApt.name} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:border-[#233D8C] transition-all outline-none" required /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Prix par nuit (FCFA)</label><input name="price" type="number" defaultValue={editingApt.price} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black text-[#233D8C] outline-none" required /></div>
                                        </div>
                                    </div>

                                    {/* SECTION 2: CAPACITÉ D'ACCUEIL */}
                                    <div className="space-y-6 pt-4 border-t border-slate-50">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#233D8C] flex items-center gap-2"><Users className="w-4 h-4" /> Capacité & Composition</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Adultes</label><input name="adults" type="number" defaultValue={editingApt.capacity.adults} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm outline-none" /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Enfants</label><input name="children" type="number" defaultValue={editingApt.capacity.children} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm outline-none" /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Bébés</label><input name="babies" type="number" defaultValue={editingApt.capacity.babies} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm outline-none" /></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Chambres</label><div className="relative"><Bed className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" /><input name="bedrooms" type="number" defaultValue={editingApt.bedrooms} className="w-full pl-10 pr-4 py-3 bg-slate-100/50 rounded-xl text-sm outline-none font-bold" /></div></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Salles de bains</label><div className="relative"><Bath className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" /><input name="bathrooms" type="number" defaultValue={editingApt.bathrooms} className="w-full pl-10 pr-4 py-3 bg-slate-100/50 rounded-xl text-sm outline-none font-bold" /></div></div>
                                            <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-slate-400 pl-1">Disponibilité</label><select name="status" defaultValue={editingApt.status} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm outline-none appearance-none font-medium"><option>Libre</option><option>Occupé</option><option>Nettoyage</option></select></div>
                                        </div>
                                    </div>

                                    {/* SECTION 3: ÉQUIPEMENTS (WIFI, etc) */}
                                    <div className="space-y-6 pt-4 border-t border-slate-50">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#233D8C] flex items-center gap-2"><Wifi className="w-4 h-4" /> Équipements inclus</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {AMENITIES_LIST.map((amenity) => (
                                                <label key={amenity.id} className="flex items-center p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-[#233D8C]/20 transition-all cursor-pointer group">
                                                    <input
                                                        name={`amenity-${amenity.id}`}
                                                        type="checkbox"
                                                        defaultChecked={editingApt.amenities.includes(amenity.id)}
                                                        className="w-5 h-5 rounded-lg border-slate-200 text-[#233D8C] focus:ring-[#233D8C]"
                                                    />
                                                    <div className="ml-4 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-[#233D8C] transition-colors"><amenity.icon className="w-4 h-4" /></div>
                                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors uppercase text-[10px] tracking-widest">{amenity.label}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="p-8 bg-slate-900 flex gap-4">
                                <button type="button" onClick={() => setEditingApt(null)} className="flex-1 py-4 text-[10px] font-black uppercase text-white/40 hover:text-white transition-colors">Annuler</button>
                                <button form="edit-apt-form" type="submit" className="flex-[2] bg-white text-[#233D8C] py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#233D8C] hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Enregistrer les modifications</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
