"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#studio", label: "Studio" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact", cta: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline>(null);
  const openRef = useRef(open);

  // One paused timeline: opening plays it, closing reverses it from wherever it is
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const speed = context.conditions?.reduce ? 0 : 1;
          const menu = menuRef.current;

          timeline.current = gsap
            .timeline({
              paused: true,
              onStart: () => gsap.set(menu, { visibility: "visible" }),
              onReverseComplete: () => gsap.set(menu, { visibility: "hidden" }),
            })
            // Panel wipes down from under the header
            .fromTo(
              menu,
              { clipPath: "inset(0% 0% 100% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 * speed, ease: "power3.inOut" },
            )
            // Links rise in one after another as the panel finishes
            .fromTo(
              "li",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.6 * speed, stagger: 0.06 * speed, ease: "power2.out" },
              "-=0.35",
            );

          // Keep the current state if the timeline is rebuilt while open
          if (openRef.current) timeline.current.progress(1);
        },
      );

      return () => mm.revert();
    },
    { scope: menuRef },
  );

  useEffect(() => {
    openRef.current = open;
    if (open) timeline.current?.play();
    else timeline.current?.reverse();

    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    ScrollSmoother.get()?.paused(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      ScrollSmoother.get()?.paused(false);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" aria-label="Meridian Architects, home">
          <Logo size="sm" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-12 text-[0.9375rem] font-light text-ink">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={link.cta ? "btn" : "link"}>
                  {link.label}
                  {link.cta && (
                    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.25}>
                      <path d="M2 8h12M9 3l5 5-5 5" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="meta text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Always mounted so the timeline can reverse; hidden (and out of the tab order) until opened */}
      <nav
        ref={menuRef}
        id="mobile-menu"
        aria-label="Primary"
        className="invisible fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-paper md:hidden"
      >
        <ul className="container-site pt-8">
          {links.map((link, i) => (
            <li key={link.href} className="border-b border-line">
              <a href={link.href} onClick={() => setOpen(false)} className="flex items-baseline gap-8 py-6">
                <span className="meta w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-h2">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
