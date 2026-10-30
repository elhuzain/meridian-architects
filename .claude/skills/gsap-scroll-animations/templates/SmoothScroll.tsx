"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Where anchored sections land: "top <fixed header height>px". Use "top top" without a fixed header.
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
        // Enables data-speed / data-lag parallax on any element
        effects: true,
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

  // On client-side navigation, start the new page at the top and re-measure.
  // A layout effect so it runs before ScrollAnimations builds the new page's triggers.
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother && !window.location.hash) smoother.scrollTop(0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
