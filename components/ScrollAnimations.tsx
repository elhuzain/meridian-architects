"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Animates any element marked with data-animate, so sections can stay
  server components. Initial hidden states live in globals.css.

  data-animate="fade-up"  fades and rises; neighbours entering together run in sequence
  data-animate="fade"     fades only, for small details
  data-animate="stagger"  animates the element's direct children one after another
  data-animate="reveal"   wipes an image frame open from the bottom
  data-delay="0.6"        optional extra delay in seconds
*/

const START = "top 85%";
const EASE = "power2.out";

const delayOf = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);

export default function ScrollAnimations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-animate='fade-up']", { y: 24 });
        ScrollTrigger.batch("[data-animate='fade-up']", {
          start: START,
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: EASE,
              delay: (i, el) => delayOf(el) + i * 0.12,
            }),
        });

        ScrollTrigger.batch("[data-animate='fade']", {
          start: START,
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              autoAlpha: 1,
              duration: 1.2,
              ease: EASE,
              delay: (i, el) => delayOf(el) + i * 0.08,
            }),
        });

        gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((group) => {
          gsap.fromTo(
            group.children,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: EASE,
              stagger: 0.12,
              delay: delayOf(group),
              scrollTrigger: { trigger: group, start: START, once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-animate='reveal']").forEach((frame) => {
          gsap.fromTo(
            frame,
            { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "power3.inOut",
              delay: delayOf(frame),
              scrollTrigger: { trigger: frame, start: START, once: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    // Re-scan after client-side navigation to pick up the new page's elements
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
