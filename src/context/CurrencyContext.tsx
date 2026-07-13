"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyType = "XOF" | "EUR" | "USD" | "GBP" | "CAD" | "NGN" | "GHS" | "MAD" | "TND" | "DZD" | "ZAR" | "AED" | "CHF";

interface CurrencyContextProps {
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (priceInXof: number) => string;
  isLoading: boolean;
  rates: Record<CurrencyType, number>;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

// Default fallback rates from XOF (1 XOF = ...)
const DEFAULT_RATES: Record<CurrencyType, number> = {
  XOF: 1,
  EUR: 1 / 655.957,
  USD: 1 / 600,
  GBP: 1 / 760,
  CAD: 1 / 440,
  NGN: 2.5,
  GHS: 0.025,
  MAD: 0.015,
  TND: 0.005,
  DZD: 0.22,
  ZAR: 0.03,
  AED: 0.006,
  CHF: 0.0015,
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyType>("XOF");
  const [rates, setRates] = useState<Record<CurrencyType, number>>(DEFAULT_RATES);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize currency from localStorage & Geolocation API fallback
  useEffect(() => {
    const saved = localStorage.getItem("preferred_currency") as CurrencyType;
    if (saved && ["XOF", "EUR", "USD", "GBP", "CAD", "NGN", "GHS", "MAD", "TND", "DZD", "ZAR", "AED", "CHF"].includes(saved)) {
      setCurrencyState(saved);
    } else {
      // Auto-detect country & currency via geolocation
      fetch("https://ipapi.co/json/")
        .then((r) => r.json())
        .then((data) => {
          if (data && data.country_code) {
            const country = data.country_code.toUpperCase();
            const countryToCurrency: Record<string, CurrencyType> = {
              BJ: "XOF", CI: "XOF", SN: "XOF", TG: "XOF", NE: "XOF", BF: "XOF", ML: "XOF", GW: "XOF", CM: "XOF", GA: "XOF", TD: "XOF", CF: "XOF", CG: "XOF", GQ: "XOF",
              FR: "EUR", BE: "EUR", DE: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", PT: "EUR", FI: "EUR", AT: "EUR", GR: "EUR", IE: "EUR", LU: "EUR",
              US: "USD",
              GB: "GBP",
              CA: "CAD",
              MA: "MAD",
              TN: "TND",
              DZ: "DZD",
              ZA: "ZAR",
              AE: "AED",
              CH: "CHF",
              NG: "NGN",
              GH: "GHS",
            };
            const detectedCurrency = countryToCurrency[country];
            if (detectedCurrency) {
              setCurrencyState(detectedCurrency);
              localStorage.setItem("preferred_currency", detectedCurrency);
            }
          }
        })
        .catch((err) => console.warn("[Currency] Failed to detect geolocation for currency default:", err));
    }
  }, []);

  // Fetch live exchange rates from XOF
  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/XOF");
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data = await res.json();
        if (data && data.rates) {
          const fetchedRates: Record<CurrencyType, number> = {
            XOF: 1,
            EUR: data.rates.EUR || DEFAULT_RATES.EUR,
            USD: data.rates.USD || DEFAULT_RATES.USD,
            GBP: data.rates.GBP || DEFAULT_RATES.GBP,
            CAD: data.rates.CAD || DEFAULT_RATES.CAD,
            NGN: data.rates.NGN || DEFAULT_RATES.NGN,
            GHS: data.rates.GHS || DEFAULT_RATES.GHS,
            MAD: data.rates.MAD || DEFAULT_RATES.MAD,
            TND: data.rates.TND || DEFAULT_RATES.TND,
            DZD: data.rates.DZD || DEFAULT_RATES.DZD,
            ZAR: data.rates.ZAR || DEFAULT_RATES.ZAR,
            AED: data.rates.AED || DEFAULT_RATES.AED,
            CHF: data.rates.CHF || DEFAULT_RATES.CHF,
          };
          setRates(fetchedRates);
        }
      } catch (err) {
        console.warn("[Currency] Failed to fetch live exchange rates, using fallback rates.", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRates();
  }, []);

  const setCurrency = (c: CurrencyType) => {
    setCurrencyState(c);
    localStorage.setItem("preferred_currency", c);
  };

  const formatPrice = (priceInXof: number): string => {
    const multiplier = rates[currency] || DEFAULT_RATES[currency] || 1;
    const converted = priceInXof * multiplier;

    if (currency === "XOF") {
      return `${Math.round(converted).toLocaleString("fr-FR")} FCFA`;
    }

    const localeMap: Record<CurrencyType, string> = {
      XOF: "fr-FR",
      EUR: "fr-FR",
      USD: "en-US",
      GBP: "en-GB",
      CAD: "en-CA",
      NGN: "en-NG",
      GHS: "en-GH",
      MAD: "ar-MA",
      TND: "ar-TN",
      DZD: "ar-DZ",
      ZAR: "en-ZA",
      AED: "ar-AE",
      CHF: "fr-CH",
    };

    const currencyMap: Record<CurrencyType, string> = {
      XOF: "XOF",
      EUR: "EUR",
      USD: "USD",
      GBP: "GBP",
      CAD: "CAD",
      NGN: "NGN",
      GHS: "GHS",
      MAD: "MAD",
      TND: "TND",
      DZD: "DZD",
      ZAR: "ZAR",
      AED: "AED",
      CHF: "CHF",
    };

    const isDinar = currency === "TND" || currency === "DZD";

    return new Intl.NumberFormat(localeMap[currency] || "fr-FR", {
      style: "currency",
      currency: currencyMap[currency] || "EUR",
      maximumFractionDigits: isDinar ? 3 : (currency === "EUR" || currency === "USD" || currency === "GBP" || currency === "CAD" || currency === "CHF" ? 0 : 2),
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, isLoading, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
