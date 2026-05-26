"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Home,
    MessageSquare,
    Tag,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { label: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
        { label: 'Appartements', href: '/admin/apartments', icon: Home },
        { label: 'Commentaires', href: '/admin/reviews', icon: MessageSquare },
        { label: 'Promotions', href: '/admin/offers', icon: Tag },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* SIDEBAR */}
            <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 flex flex-col
      `}>
                {/* Branding */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#233D8C] flex items-center justify-center shrink-0">
                        <span className="font-serif italic font-bold">C</span>
                    </div>
                    {isSidebarOpen && (
                        <span className="ml-3 font-serif font-medium tracking-wider text-xl">Croisière <span className="text-xs opacity-40 uppercase tracking-[0.2em] font-sans">Staff</span></span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-10 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center px-4 py-3 rounded-xl transition-all group
                ${pathname === item.href ? 'bg-[#233D8C] text-white shadow-lg shadow-[#233D8C]/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}
              `}
                        >
                            <item.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                            {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                            {pathname === item.href && isSidebarOpen && (
                                <div className="ml-auto w-1 h-3 rounded-full bg-white/40" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link href="/admin/settings" className="flex items-center px-4 py-3 text-slate-400 hover:text-white transition-colors">
                        <Settings className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                        {isSidebarOpen && <span className="text-sm">Paramètres</span>}
                    </Link>
                    <Link href="/" className="flex items-center px-4 py-3 text-red-400 hover:text-white transition-colors">
                        <LogOut className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                        {isSidebarOpen && <span className="text-sm">Quitter</span>}
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* TOP BAR */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#233D8C]/20 focus:border-[#233D8C] transition-all w-64"
                            />
                        </div>

                        <button className="relative p-2 text-slate-400 hover:text-[#233D8C] transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-[1px] bg-slate-200" />

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900">Admin Staff</p>
                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Gestionnaire</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                AS
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
