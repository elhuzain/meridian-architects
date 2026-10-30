import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";
import SmoothScroll from "@/components/SmoothScroll";
import { defaultImage, siteDescription, siteName, siteTitle } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute base for Open Graph image URLs; set NEXT_PUBLIC_SITE_URL in production
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: siteTitle, template: `%s — ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "elhuzain", url: "https://elhuzain.com" }],
  creator: "elhuzain",
  keywords: ["architecture", "structural engineering", "interior design", "urban planning", "demo"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_GB",
    url: "/",
    title: siteTitle,
    description: siteDescription,
    images: [defaultImage],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: [defaultImage.url] },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Fixed elements must stay outside the smoothed content */}
        <Header />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
        {/* After SmoothScroll: ScrollSmoother must exist before any ScrollTriggers */}
        <ScrollAnimations />
        <noscript>
          <style>{`[data-animate], [data-animate] > * { visibility: visible !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
