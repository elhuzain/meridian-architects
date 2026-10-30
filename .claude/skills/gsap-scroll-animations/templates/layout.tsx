// Root layout wiring (app/layout.tsx). Merge into the existing layout; keep fonts, metadata, etc.
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Fixed elements (header, modals, toasts) must stay outside the smoothed content */}
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
