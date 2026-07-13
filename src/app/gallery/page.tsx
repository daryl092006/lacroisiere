"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const GALLERY_IMAGES = [
  { id: 1, src: "/hero.png", category: "Appartements", span: "md:col-span-2 md:row-span-2", title: "Suite Royale - Séjour" },
  { id: 2, src: "/living.png", category: "Espaces", span: "md:col-span-1 md:row-span-1", title: "Le Grand Salon" },
  { id: 3, src: "/exterior.png", category: "Espaces", span: "md:col-span-1 md:row-span-1", title: "Architecture Extérieure" },
  { id: 4, src: "/room.png", category: "Appartements", span: "md:col-span-1 md:row-span-1", title: "Chambre Signature" },
  { id: 5, src: "/living.png", category: "Expérience", span: "md:col-span-2 md:row-span-1", title: "Espace Détente" },
  { id: 6, src: "/exterior.png", category: "Espaces", span: "md:col-span-1 md:row-span-1", title: "Le Rooftop" },
  { id: 7, src: "/hero.png", category: "Appartements", span: "md:col-span-1 md:row-span-1", title: "Vue Panoramique" },
  { id: 8, src: "/room.png", category: "Expérience", span: "md:col-span-1 md:row-span-1", title: "Confort Absolu" },
];

const CATEGORIES = ["Tout voir", "Appartements", "Espaces", "Expérience"];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("Tout voir");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeTab === "Tout voir" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 transition-colors duration-300">
      {/* HEADER EDITORIAL */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#233D8C] mb-6 block">Le Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-slate-900 mb-8">Un regard sur l'excellence</h1>
          <p className="text-slate-500 font-light text-lg max-w-2xl mx-auto mb-16">
            Explorez les moindres détails de nos espaces, conçus pour allier esthétique, confort et perfection architecturale.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-b border-slate-200 pb-8">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-[9px] font-black uppercase tracking-[0.3em] pb-3 transition-colors relative cursor-pointer ${activeTab === cat ? 'text-[#233D8C]' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {cat}
                {activeTab === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#233D8C]" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* LUXURY MASONRY GRID */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {filteredImages.map((img, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              key={img.id} 
              onClick={() => setSelectedImage(img.src)}
              className={`relative overflow-hidden group cursor-pointer rounded-sm ${activeTab === "Tout voir" ? img.span : "md:col-span-1 md:row-span-1"}`}
            >
              <Image 
                src={img.src} 
                alt={img.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)]" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/70 block mb-2">{img.category}</span>
                    <h3 className="text-2xl font-serif text-white">{img.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-full max-w-6xl max-h-[85vh] p-6"
          >
            <Image 
              src={selectedImage} 
              alt="Fullscreen view" 
              fill 
              className="object-contain" 
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}