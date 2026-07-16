"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { 
  MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, CheckCircle2, 
  Building, Calendar as CalendarIcon, Sparkles, X, ChevronLeft, ChevronRight,
  CreditCard, ShieldAlert, BadgeHelp, Info
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { fetchContactSettings, type ContactSettings } from "@/lib/contentService";

// Types for contact info passed from server
interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  whatsapp: string | null;
}

function ContactForm({ contact }: { contact: ContactInfo }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Pre-fill type from query parameters (e.g. ?type=meeting-room)
  const [requestType, setRequestType] = useState("general");

  // Date selection states (for meeting room reservation)
  const [activeTab, setActiveTab] = useState<"arrival" | "departure" | null>(null);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState(new Date(2026, 4, 1));
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = searchParams.get("type");
    if (t === "meeting-room") {
      setRequestType("meeting-room");
    } else if (t === "corporate") {
      setRequestType("corporate");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const subject = fd.get("subject") as string;
    const userMessage = fd.get("message") as string;

    // Card details
    const cardNumber = fd.get("card_number") as string;
    const cardExpiry = fd.get("card_expiry") as string;
    const cardCvv = fd.get("card_cvv") as string;

    let finalMessage = userMessage;

    if (requestType === "meeting-room") {
      finalMessage = `--- RÉSERVATION SALLE DE RÉUNION ---
Début : ${arrivalDate ? arrivalDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "Non spécifié"}
Fin : ${departureDate ? departureDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "Non spécifié"}

Message client :
${userMessage}

--- EMPREINTE BANCAIRE (GARANTIE) ---
Numéro de carte : ${cardNumber || "Non spécifié"}
Expiration : ${cardExpiry || "Non spécifiée"}
CVV : ${cardCvv || "Non spécifié"}`;
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject: requestType === "meeting-room" ? `[Réservation Salle] ${subject}` : subject,
        message: finalMessage,
      })
    });

    const result = await response.json();

    setLoading(false);
    if (!response.ok) {
      console.error("Error sending contact message:", result.error);
      setErrorMsg("Une erreur s'est produite lors de l'envoi de votre réservation. Veuillez réessayer.");
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col lg:flex-row" ref={widgetRef}>
      {/* LEFT: INFO */}
      <div className="w-full lg:w-2/5 bg-[#233D8C] p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
        <Building className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
        <div className="relative z-10 space-y-12">
          <div>
            <h3 className="text-3xl font-serif mb-6">Contact & Réservations</h3>
            <p className="text-white/80 font-light text-sm leading-relaxed">
              Une question sur nos séjours ? Un besoin spécifique pour vos événements professionnels ou la réservation de notre salle de réunion ? Notre service client vous répond sous quelques heures.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-white/70 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Adresse</h4>
                <p className="text-sm font-light leading-relaxed">{contact.city}, Bénin<br />{contact.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-white/70 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Téléphone & WhatsApp</h4>
                <p className="text-sm font-light">{contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-white/70 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Email</h4>
                <p className="text-sm font-light">{contact.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-white/70 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Horaires de réception</h4>
                <p className="text-sm font-light">24h/24 · 7j/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 relative z-10 hidden lg:block">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Garantie & Sécurité de pointe</span>
          </div>
        </div>
      </div>

      {/* RIGHT: FORM */}
      <div className="w-full lg:w-3/5 p-12 md:p-16 bg-white">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif text-slate-900 mb-4">Réservation Garantie</h3>
            <p className="text-slate-500 font-light max-w-sm mb-8">
              Votre demande de réservation a été enregistrée avec succès. Vos coordonnées bancaires ont été validées à titre de garantie. Aucun montant n'a été prélevé.
            </p>
            <button onClick={() => setSubmitted(false)} className="text-xs font-black uppercase tracking-widest text-[#233D8C] border-b-2 border-[#233D8C] pb-1 hover:text-black hover:border-black transition-colors">
              Faire une autre demande
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {errorMsg && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold uppercase tracking-wider">
                {errorMsg}
              </div>
            )}

            {/* Request Type Selector Tabs */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Type de demande</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                {[
                  { id: "general", label: "Générale" },
                  { id: "meeting-room", label: "Salle de réunion" },
                  { id: "corporate", label: "Corporate / Pro" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRequestType(tab.id)}
                    className={`py-3.5 text-[10px] font-black uppercase tracking-wider rounded transition-all ${requestType === tab.id ? 'bg-[#233D8C] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DATES PICKER (Only visible for Meeting Room request) */}
            {requestType === "meeting-room" && (
              <div className="space-y-4 border-b border-slate-100 pb-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#233D8C]">Sélectionnez les dates de réservation *</label>
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Arrival Date Box */}
                  <div 
                    onClick={() => setActiveTab(activeTab === "arrival" ? null : "arrival")}
                    className={`p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors ${activeTab === "arrival" ? "border-[#233D8C] bg-slate-50/50" : "border-slate-100"}`}
                  >
                    <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Début</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#233D8C]" />
                      {arrivalDate ? arrivalDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "Choisir date"}
                    </span>
                  </div>

                  {/* Departure Date Box */}
                  <div 
                    onClick={() => setActiveTab(activeTab === "departure" ? null : "departure")}
                    className={`p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors ${activeTab === "departure" ? "border-[#233D8C] bg-slate-50/50" : "border-slate-100"}`}
                  >
                    <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Fin</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#233D8C]" />
                      {departureDate ? departureDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "Choisir date"}
                    </span>
                  </div>

                </div>

                {/* Calendar Inline Container */}
                <AnimatePresence>
                  {activeTab && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border border-slate-100 rounded-xl p-5 bg-slate-50/30"
                    >
                      <div className="flex gap-10">
                        {[0, 1].map((offset) => {
                          const monthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
                          const monthName = monthDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
                          const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
                          const startDay = (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay() + 6) % 7;

                          return (
                            <div key={offset} className="flex-1">
                              <div className="flex justify-between items-center mb-4 px-2">
                                <span className="font-serif italic text-sm text-slate-900 capitalize">{monthName}</span>
                                {offset === 0 && (
                                  <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="text-slate-400 hover:text-slate-900"><ChevronLeft className="w-4 h-4" /></button>
                                )}
                                {offset === 1 && (
                                  <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="text-slate-400 hover:text-slate-900"><ChevronRight className="w-4 h-4" /></button>
                                )}
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                                {["lu", "ma", "me", "je", "ve", "sa", "di"].map(d => <span key={d}>{d}</span>)}
                              </div>
                              <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                  const day = i + 1;
                                  const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
                                  const isSelected = (arrivalDate && date.getTime() === arrivalDate.getTime()) || (departureDate && date.getTime() === departureDate.getTime());
                                  const isInRange = arrivalDate && departureDate && date > arrivalDate && date < departureDate;

                                  return (
                                    <button
                                      key={day}
                                      type="button"
                                      onClick={() => {
                                        if (activeTab === "arrival") {
                                          setArrivalDate(date);
                                          setDepartureDate(null);
                                          setActiveTab("departure");
                                        } else {
                                          if (arrivalDate && date < arrivalDate) {
                                            setArrivalDate(date);
                                          } else {
                                            setDepartureDate(date);
                                            setActiveTab(null);
                                          }
                                        }
                                      }}
                                      className={`h-8 w-full text-[11px] rounded transition-all flex items-center justify-center font-bold ${isSelected ? "bg-[#233D8C] text-white" : isInRange ? "bg-[#233D8C]/10 text-[#233D8C]" : "hover:bg-slate-100 text-slate-700"}`}
                                    >
                                      {day}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* General Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Votre Nom & Prénom *</label>
                <input name="name" required type="text" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Adresse Email *</label>
                <input name="email" required type="email" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="john@domain.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Téléphone / WhatsApp *</label>
                <input name="phone" required type="tel" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder="+229 ..." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Sujet *</label>
                <input name="subject" required type="text" className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder={requestType === "meeting-room" ? "Réservation de la salle de réunion Silicon Valley" : "Demande d'information"} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Détails de la demande *</label>
              <textarea name="message" required rows={4} className="border-b border-slate-200 py-3 focus:outline-none focus:border-[#233D8C] transition-colors bg-transparent resize-none placeholder:text-slate-300 placeholder:font-light placeholder:italic" placeholder={requestType === "meeting-room" ? "Précisez vos tranches horaires ainsi que le nombre de participants..." : "Écrivez votre message ici..."} />
            </div>

            {/* BANK CARD GUARANTEE BLOCK (Paiement non débité) */}
            {requestType === "meeting-room" && (
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/60 space-y-6">
                <div className="flex items-start gap-4">
                  <CreditCard className="w-5 h-5 text-[#233D8C] shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                      Garantie Bancaire requise
                    </h4>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      Afin de valider la réservation, merci de renseigner vos coordonnées de carte. **Aucun prélèvement n'est effectué maintenant**. Il s'agit uniquement d'une empreinte de garantie. Le règlement se fera sur place.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="md:col-span-1 flex flex-col gap-1.5">
                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Numéro de Carte *</label>
                    <input name="card_number" required type="text" maxLength={19} className="bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#233D8C] text-xs" placeholder="4000 1234 5678 9010" />
                  </div>
                  <div className="flex gap-4 md:col-span-2">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Expiration *</label>
                      <input name="card_expiry" required type="text" maxLength={5} className="bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#233D8C] text-xs text-center" placeholder="MM/AA" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">CVV / Code *</label>
                      <input name="card_cvv" required type="password" maxLength={4} className="bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-[#233D8C] text-xs text-center" placeholder="•••" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[10px] text-[#233D8C] font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Connexion sécurisée SSL 256 bits</span>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="mt-4 bg-slate-900 text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#233D8C] transition-colors flex items-center justify-center gap-4 shadow-lg w-full md:w-auto self-start cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed">
              {loading ? "Envoi en cours..." : <>Confirmer la réservation <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [contact, setContact] = useState<ContactSettings | null>(null);

  useEffect(() => {
    fetchContactSettings().then(setContact).catch(() => {});
  }, []);

  const contactInfo: ContactInfo = {
    phone: contact?.phone_main || '+229 00 00 00 00',
    email: contact?.email_main || 'contact@lacroisiere-residence.com',
    address: contact?.address_line1 || 'Quartier résidentiel Haie Vive',
    city: contact?.city || 'Cotonou',
    whatsapp: contact?.phone_whatsapp || null,
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] selection:bg-[#233D8C] selection:text-white pb-24">
      {/* Cinematic Header */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/exterior.png" 
          alt="Contact La Croisière" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        
        <div className="relative z-10 text-center text-white px-6 mt-16">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80 mb-4 block">Nous Contacter</span>
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 leading-tight">Une escale à votre écoute</h1>
        </div>
      </section>

      {/* Main Section */}
      <section className="w-full mx-auto px-6 md:px-16 -mt-16 relative z-20">
        <Suspense fallback={<div className="bg-white p-20 rounded-2xl shadow-xl text-center font-light text-slate-500">Chargement du formulaire...</div>}>
          <ContactForm contact={contactInfo} />
        </Suspense>
      </section>
    </main>
  );
}

