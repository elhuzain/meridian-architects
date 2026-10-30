import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Architecture & Engineering",
  description: "Architecture and engineering studio.",
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
