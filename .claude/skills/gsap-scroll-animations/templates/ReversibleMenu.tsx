"use client";

// Pattern for interactive open/close animations (mobile menus, drawers, accordions).
// One paused timeline: opening plays it, closing reverses it from wherever it is, so
// toggling mid-animation turns around smoothly. Adapt markup and classes to the project.

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function ReversibleMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline>(null);
  const openRef = useRef(open);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        (context) => {
          // Reduced motion: same timeline at zero duration, so it still opens and closes
          const speed = context.conditions?.reduce ? 0 : 1;
          const panel = panelRef.current;

          timeline.current = gsap
            .timeline({
              paused: true,
              onStart: () => gsap.set(panel, { visibility: "visible" }),
              onReverseComplete: () => gsap.set(panel, { visibility: "hidden" }),
            })
            .fromTo(
              panel,
              { clipPath: "inset(0% 0% 100% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 * speed, ease: "power3.inOut" },
            )
            .fromTo(
              "li",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.6 * speed, stagger: 0.06 * speed, ease: "power2.out" },
              "-=0.35",
            );

          // Keep the current state if the timeline is rebuilt (media query change) while open
          if (openRef.current) timeline.current.progress(1);
        },
      );

      return () => mm.revert();
    },
    { scope: panelRef },
  );

  useEffect(() => {
    openRef.current = open;
    if (open) timeline.current?.play();
    else timeline.current?.reverse();

    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Keep the smoothed page still behind the overlay
    ScrollSmoother.get()?.paused(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      ScrollSmoother.get()?.paused(false);
    };
  }, [open]);

  return (
    <>
      <button type="button" aria-expanded={open} aria-controls="menu-panel" onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : "Menu"}
      </button>

      {/* Always mounted so the timeline can reverse; invisible (and out of the tab order) until opened */}
      <nav ref={panelRef} id="menu-panel" aria-label="Primary" style={{ visibility: "hidden" }}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
