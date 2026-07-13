import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { CurrencyProvider } from "@/context/CurrencyContext";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Résidence La Croisière | Appartements Meublés Premium au Bénin",
  description: "Découvrez l'exceptionnel à la Résidence La Croisière. Appartements de luxe, rooftop, piscine et service 4 étoiles pour vos séjours au Bénin.",
  icons: {
    icon: '/favicon.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CurrencyProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <CookieBanner />
        </CurrencyProvider>
      </body>
    </html>
  );
}
