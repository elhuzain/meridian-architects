"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#studio", label: "Studio" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" aria-label="Meridian Architects, home">
          <Logo size="sm" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-12 text-[0.9375rem] font-light text-ink">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link">
                  {link.label}
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

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="fixed inset-x-0 top-20 bottom-0 animate-reveal overflow-y-auto bg-paper md:hidden"
        >
          <ul className="container-site pt-8">
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-8 py-6"
                >
                  <span className="meta w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-h2">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
