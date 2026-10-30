"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Keeps anchored sections clear of the fixed 80px header
const HEADER_OFFSET = "top 80px";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        smoothTouch: false,
      });

      // Native hash jumps don't work inside the smoothed wrapper, so route same-page anchors through the smoother
      const onClick = (e: MouseEvent) => {
        const link = (e.target as Element).closest<HTMLAnchorElement>("a[href*='#']");
        if (!link || link.pathname !== window.location.pathname || !link.hash) return;
        const target = document.querySelector(link.hash);
        if (!target) return;
        e.preventDefault();
        smoother.scrollTo(target, true, HEADER_OFFSET);
        history.pushState(null, "", link.hash);
      };
      document.addEventListener("click", onClick);

      // Arriving from another page with a hash, e.g. /#projects
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) smoother.scrollTo(target, false, HEADER_OFFSET);
      }

      return () => {
        document.removeEventListener("click", onClick);
        smoother.kill();
      };
    });

    return () => mm.revert();
  });

  // Page heights change on client-side navigation
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
