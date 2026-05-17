"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n/client";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
    // Simuler un temps de chargement pour l'élégance ou attendre le chargement réel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative">
            {/* Logo avec animation de pulsation et d'apparition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeOut"
              }}
              className="relative z-10"
            >
              <Image
                src="/favicon.png"
                alt="La Croisière Logo"
                width={300}
                height={100}
                className="h-14 md:h-16 w-auto"
                style={{ height: "auto" }}
                priority
              />
            </motion.div>

            {/* Cercle de chargement discret autour du logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 -m-8 rounded-full border border-slate-100"
            />
            
            <motion.div
              animate={{ 
                rotate: 360 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 -m-8 rounded-full border-t border-[#233D8C]"
            />
          </div>

          {/* Tagline de chargement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-16 text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]"
          >
            {mounted && t('Preloader.tagline')}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
