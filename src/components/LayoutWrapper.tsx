"use client";

import { usePathname } from 'next/navigation';
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <>
            <Preloader />
            {!isAdmin && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!isAdmin && <Footer />}
        </>
    );
}
