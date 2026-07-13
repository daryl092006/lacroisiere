"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, ChevronRight, Check } from "lucide-react";
import { useTranslation } from "@/i18n/client";

export default function CookieBanner() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Cookie preference states
  const [prefAnalytics, setPrefAnalytics] = useState(true);
  const [prefMarketing, setPrefMarketing] = useState(true);

  const currentLang = i18n.language || "fr";

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsCustomizing(false);
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-banner", handleOpen);
    return () => window.removeEventListener("open-cookie-banner", handleOpen);
  }, []);

  const saveConsent = (status: "accepted" | "declined" | "custom", analytics = true, marketing = true) => {
    localStorage.setItem("cookie_consent", status);
    localStorage.setItem("cookie_pref_analytics", String(analytics));
    localStorage.setItem("cookie_pref_marketing", String(marketing));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent("accepted", true, true);
  };

  const handleDeclineAll = () => {
    saveConsent("declined", false, false);
  };

  const handleSaveCustom = () => {
    saveConsent("custom", prefAnalytics, prefMarketing);
  };

  const content = {
    fr: {
      title: "LE RESPECT DE VOTRE VIE PRIVÉE EST UNE PRIORITÉ POUR NOUS",
      desc: "Vous pouvez modifier vos choix à tout moment en cliquant sur \"Gérer les cookies\" ou obtenir plus d'informations via notre Politique de Cookies. Nous et nos partenaires utilisons des cookies ou technologies similaires pour assurer le bon fonctionnement et la sécurité du site, améliorer votre expérience, vous proposer des publicités et contenus personnalisés, réaliser des statistiques et mesures d'audience pour évaluer leurs performances, et partager du contenu sur les réseaux sociaux. En sélectionnant \"Accepter et fermer\", vous acceptez tous les cookies. En sélectionnant \"Refuser les cookies\", seuls les cookies nécessaires au fonctionnement du site seront déposés.",
      btnManage: "Gérer les cookies",
      btnDecline: "Refuser les cookies",
      btnAccept: "Accepter et fermer",
      customizeTitle: "Personnaliser vos préférences de cookies",
      customizeDesc: "Activez ou désactivez les cookies par finalité selon vos préférences.",
      catNecessary: "Cookies Nécessaires (Obligatoires)",
      catNecessaryDesc: "Indispensables au fonctionnement du site et à la sécurisation de votre navigation.",
      catAnalytics: "Cookies de Mesure d'Audience & Performance",
      catAnalyticsDesc: "Nous permettent de comprendre l'utilisation du site afin d'optimiser l'ergonomie.",
      catMarketing: "Cookies Marketing & Réseaux Sociaux",
      catMarketingDesc: "Utilisés pour vous présenter des contenus et offres pertinents sur d'autres plateformes.",
      btnBack: "Retour",
      btnSave: "Enregistrer mes choix",
    },
    en: {
      title: "RESPECT FOR YOUR PRIVACY IS A PRIORITY FOR US",
      desc: "You can change your choices at any time by clicking on \"Manage cookies\" or get more information via our Cookie Policy. We and our partners use cookies or similar technologies to ensure the proper functioning and security of the site, improve your experience, offer you personalized advertising and content, produce statistics and audience measurements to evaluate their performance, and share content on social networks. By selecting \"Accept and close,\" you accept all cookies. By selecting \"Decline cookies,\" only cookies necessary for the site's operation will be placed.",
      btnManage: "Manage cookies",
      btnDecline: "Decline cookies",
      btnAccept: "Accept and close",
      customizeTitle: "Customize your cookie preferences",
      customizeDesc: "Enable or disable cookies by purpose according to your preferences.",
      catNecessary: "Necessary Cookies (Required)",
      catNecessaryDesc: "Essential for the operation of the website and securing your navigation.",
      catAnalytics: "Audience Measurement & Performance Cookies",
      catAnalyticsDesc: "Allow us to understand website usage to optimize the browsing experience.",
      catMarketing: "Marketing & Social Media Cookies",
      catMarketingDesc: "Used to present you with relevant content and offers on other platforms.",
      btnBack: "Back",
      btnSave: "Save my choices",
    },
  };

  const t = currentLang === "en" ? content.en : content.fr;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-slate-900">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white max-w-xl w-full rounded-sm shadow-2xl border border-slate-100 flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Logo area */}
            <div className="pt-8 pb-4 flex justify-center border-b border-slate-50 bg-slate-50/50 shrink-0">
              <Image
                src="/la_croisiere_logo.png"
                alt="Résidence La Croisière Logo"
                width={180}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {!isCustomizing ? (
                /* Primary View */
                <div className="flex flex-col items-center gap-4 text-center">
                  <h4 className="text-xs font-black uppercase tracking-[0.15em] text-slate-900 leading-relaxed max-w-md">
                    {t.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-500 font-normal text-justify">
                    {t.desc}
                  </p>
                </div>
              ) : (
                /* Customize View */
                <div className="flex flex-col gap-6">
                  <div className="text-center pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-black uppercase tracking-[0.15em] text-slate-900 mb-1">
                      {t.customizeTitle}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-normal">
                      {t.customizeDesc}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Category: Necessary */}
                    <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-sm flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-[11px] font-bold tracking-wide uppercase text-slate-800 block mb-0.5">
                          {t.catNecessary}
                        </span>
                        <p className="text-[10px] leading-relaxed text-slate-400 font-normal">
                          {t.catNecessaryDesc}
                        </p>
                      </div>
                      <div className="w-10 h-6 bg-slate-200 rounded-full p-0.5 flex items-center justify-end cursor-not-allowed opacity-60">
                        <div className="w-5 h-5 bg-[#233D8C] rounded-full flex items-center justify-center text-white text-[9px]">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Category: Analytics */}
                    <div className="p-4 bg-white border border-slate-100 rounded-sm flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-[11px] font-bold tracking-wide uppercase text-slate-800 block mb-0.5">
                          {t.catAnalytics}
                        </span>
                        <p className="text-[10px] leading-relaxed text-slate-400 font-normal">
                          {t.catAnalyticsDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => setPrefAnalytics(!prefAnalytics)}
                        className={`w-10 h-6 rounded-full p-0.5 transition-all duration-300 cursor-pointer flex items-center ${
                          prefAnalytics ? "bg-[#233D8C] justify-end" : "bg-slate-200 justify-start"
                        }`}
                      >
                        <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>

                    {/* Category: Marketing */}
                    <div className="p-4 bg-white border border-slate-100 rounded-sm flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-[11px] font-bold tracking-wide uppercase text-slate-800 block mb-0.5">
                          {t.catMarketing}
                        </span>
                        <p className="text-[10px] leading-relaxed text-slate-400 font-normal">
                          {t.catMarketingDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => setPrefMarketing(!prefMarketing)}
                        className={`w-10 h-6 rounded-full p-0.5 transition-all duration-300 cursor-pointer flex items-center ${
                          prefMarketing ? "bg-[#233D8C] justify-end" : "bg-slate-200 justify-start"
                        }`}
                      >
                        <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons area */}
            <div className="border-t border-slate-100 p-6 bg-slate-50/50 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center shrink-0">
              {!isCustomizing ? (
                <>
                  <button
                    onClick={() => setIsCustomizing(true)}
                    className="flex-1 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer text-center"
                  >
                    {t.btnManage}
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    className="flex-1 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer text-center"
                  >
                    {t.btnDecline}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-[#233D8C] text-white px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md cursor-pointer text-center"
                  >
                    {t.btnAccept}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsCustomizing(false)}
                    className="flex-1 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer text-center"
                  >
                    {t.btnBack}
                  </button>
                  <button
                    onClick={handleSaveCustom}
                    className="flex-1 bg-[#233D8C] text-white px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md cursor-pointer text-center"
                  >
                    {t.btnSave}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
