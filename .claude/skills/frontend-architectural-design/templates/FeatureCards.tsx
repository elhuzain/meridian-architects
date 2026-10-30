// Services-style section: heading with an intro aligned right, then tall cards that share
// hairline borders (not boxed cards). Each card has a thin line icon at the top over a faint
// drafting grid that fades out before the text, and title + description at the bottom.

import type { ReactNode } from "react";

const items: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Architecture",
    description: "One or two sentences describing this service.",
    icon: (
      <>
        <path d="M3 35h34" />
        <path d="M7 35V15l13-9 13 9v20" />
        <path d="M17 35v-9h6v9" />
      </>
    ),
  },
  {
    title: "Structural engineering",
    description: "One or two sentences describing this service.",
    icon: (
      <>
        <path d="M3 29h34" />
        <path d="M5 29l7-14h16l7 14" />
        <path d="M12 15l4 14 4-14 4 14 4-14" />
      </>
    ),
  },
  {
    title: "Interior design",
    description: "One or two sentences describing this service.",
    icon: (
      <>
        <rect x="5" y="5" width="30" height="30" />
        <path d="M5 21h13v14" />
        <path d="M26 5v11h9" />
      </>
    ),
  },
  {
    title: "Urban planning",
    description: "One or two sentences describing this service.",
    icon: (
      <>
        <rect x="5" y="5" width="12" height="12" />
        <rect x="23" y="5" width="12" height="18" />
        <rect x="5" y="23" width="12" height="12" />
        <rect x="23" y="29" width="12" height="6" />
      </>
    ),
  },
];

export default function FeatureCards() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-site">
        <div className="grid-site gap-y-8">
          <h2 className="col-span-12 md:col-span-7 lg:col-span-6">Services across the life of a building</h2>
          <p className="copy col-span-12 self-end md:col-span-5 lg:col-span-4 lg:col-start-9">
            A short intro connecting the services.
          </p>
        </div>

        <ul className="mt-20 grid grid-cols-1 border-t border-l border-line md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.title}
              className="relative flex min-h-90 flex-col justify-between border-r border-b border-line p-8 transition-colors duration-700 ease-arch hover:bg-concrete md:min-h-120 lg:p-10"
            >
              {/* Drafting grid in the empty top of the card, faded out before the text */}
              <span
                aria-hidden
                className="bg-grid pointer-events-none absolute inset-0 [--grid-size:40px] mask-[linear-gradient(to_bottom,black,transparent_55%)]"
              />

              <svg
                aria-hidden
                viewBox="0 0 40 40"
                className="relative size-10 text-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="square"
              >
                {item.icon}
              </svg>

              <div className="relative">
                <h3>{item.title}</h3>
                <p className="copy mt-6">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
