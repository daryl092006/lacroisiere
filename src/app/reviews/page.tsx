"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight, CheckCircle2 } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Jean-Michel & Sophie",
    location: "Paris, France",
    date: "Mars 2026",
    rating: 5,
    title: "Une parenthèse enchantée",
    text: "Notre séjour à la Suite Royale a dépassé toutes nos attentes. L'attention aux détails, de la qualité de la literie jusqu'au service de conciergerie personnalisé, est digne des plus grands palaces parisiens.",
    featured: true,
  },
  {
    id: 2,
    name: "Arthur M.",
    location: "Genève, Suisse",
    date: "Février 2026",
    rating: 5,
    title: "Le nouveau standard",
    text: "En déplacement professionnel fréquent à Cotonou, j'ai enfin trouvé un lieu qui allie le confort technologique dont j'ai besoin (Wi-Fi irréprochable) et une discrétion absolue.",
    featured: false,
  },
  {
    id: 3,
    name: "Famille Diop",
    location: "Dakar, Sénégal",
    date: "Janvier 2026",
    rating: 5,
    title: "Chaleur humaine",
    text: "Au-delà des installations magnifiques et de la piscine sur le toit qui a ravi nos enfants, c'est l'accueil de l'équipe que nous retiendrons. Un professionnalisme rare couplé à une véritable chaleur humaine.",
    featured: false,
  },
  {
    id: 4,
    name: "Isabelle T.",
    location: "Montréal, Canada",
    date: "Novembre 2025",
    rating: 5,
    title: "Havre de paix",
    text: "La décoration est sublime. Se réveiller dans la Suite Émeraude avec la lumière filtrant à travers les voilages est un bonheur. C'est un véritable havre de paix.",
    featured: true,
  },
  {
    id: 5,
    name: "Marc & Elena",
    location: "Bruxelles, Belgique",
    date: "Octobre 2025",
    rating: 4,
    title: "Merveilleux séjour",
    text: "Prestations haut de gamme, matériaux nobles et propreté clinique. L'insonorisation est bluffante pour un appartement en centre-ville.",
    featured: false,
  },
  {
    id: 6,
    name: "Dr. Oumarou",
    location: "Abidjan, Côte d'Ivoire",
    date: "Septembre 2025",
    rating: 5,
    title: "Quintessence du confort",
    text: "Tout a été pensé pour le confort absolu du résident. Le service est invisible mais toujours présent quand on en a besoin. Une maîtrise parfaite.",
    featured: false,
  }
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] selection:bg-[#233D8C] selection:text-white pb-24">
      {/* CINEMATIC HERO */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/hero.png" 
          alt="Livre d'or La Croisière" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 mt-16"
        >
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/80 mb-6 block drop-shadow-md">
            Livre d'Or
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 drop-shadow-lg">
            La parole est à nos invités
          </h1>
          <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md w-fit mx-auto px-6 py-3 rounded-full border border-white/20">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="ml-2 text-sm font-bold">4.9/5</span>
            <span className="text-sm font-light text-white/80 ml-1">Basé sur 200+ avis</span>
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION TO ADD RICHNESS */}
      <section className="max-w-5xl mx-auto px-6 -mt-12 relative z-20 mb-20">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
          <div className="text-center flex-1 border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0">
            <div className="text-4xl font-serif text-[#233D8C] mb-2">98%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">De satisfaction</div>
          </div>
          <div className="text-center flex-1 border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0">
            <div className="text-4xl font-serif text-[#233D8C] mb-2">#1</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Choix d'excellence à Cotonou</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-4xl font-serif text-[#233D8C] mb-2">24/7</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Conciergerie</div>
          </div>
        </div>
      </section>

      {/* MASONRY GRID OF REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={review.id} 
              className={`p-10 rounded-xl flex flex-col h-full ${review.featured ? 'bg-[#233D8C] text-white' : 'bg-white text-slate-900'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-2 transition-transform duration-500`}
            >
              <div className="flex justify-between items-start mb-6">
                <Quote className={`w-8 h-8 ${review.featured ? 'text-white/20' : 'text-[#233D8C]/10'}`} />
                {review.rating === 5 && (
                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 ${review.featured ? 'bg-white/10 text-white' : 'bg-green-50 text-green-700'}`}>
                    <CheckCircle2 className="w-3 h-3" /> Vérifié
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className={`w-4 h-4 ${index < review.rating ? 'fill-current' : ''} ${review.featured ? (index < review.rating ? 'text-yellow-400' : 'text-white/20') : (index < review.rating ? 'text-[#233D8C]' : 'text-slate-200')}`} 
                  />
                ))}
              </div>

              <h3 className="text-xl font-serif mb-4 line-clamp-1">{review.title}</h3>
              <p className={`font-light leading-relaxed mb-8 flex-grow ${review.featured ? 'text-white/80' : 'text-slate-600'}`}>
                "{review.text}"
              </p>

              <div className={`pt-6 border-t mt-auto ${review.featured ? 'border-white/10' : 'border-slate-100'}`}>
                <div className="font-bold text-sm uppercase tracking-widest mb-1">{review.name}</div>
                <div className={`text-[10px] uppercase tracking-widest ${review.featured ? 'text-white/50' : 'text-slate-400'}`}>
                  {review.location} • {review.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 text-center">
        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xl">
          <div className="absolute inset-0 bg-[#233D8C]/5 pattern-grid-lg opacity-50" />
          <div className="relative p-12 md:p-20 z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Avez-vous séjourné parmi nous ?</h2>
            <p className="text-slate-500 font-light mb-10 max-w-lg mx-auto text-lg">
              Vos retours sont le cœur battant de notre excellence. Prenez un instant pour partager l'histoire de votre séjour à La Croisière.
            </p>
            <button className="bg-[#233D8C] text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-black transition-colors flex items-center gap-4 mx-auto shadow-lg hover:shadow-2xl">
              Laisser un témoignage <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}