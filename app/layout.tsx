import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { QuickContact } from "@/components/quick-contact";
import { siteConfig } from "@/lib/site-config";
const playfair = localFont({
  src: [
    {
      path: "../public/fonts/playfair-display-variable.ttf",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../public/fonts/playfair-display-italic-variable.ttf",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});
const manrope = localFont({
  src: "../public/fonts/manrope-variable.ttf",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.siteName, template: "%s | Utku Karakoç" },
  description: siteConfig.description,
  robots: { index: siteConfig.allowIndexing, follow: siteConfig.allowIndexing },
  icons: { icon: "/brand/uk-mark.webp", apple: "/brand/uk-mark.webp" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body
        className={playfair.variable + " " + manrope.variable + " font-sans"}
      >
        <a href="#main-content" className="skip-link">
          Ana içeriğe geç
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <QuickContact />
      </body>
    </html>
  );
}
