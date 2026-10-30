import type { ReactNode } from "react";

const services: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Architecture",
    description:
      "From feasibility studies to completed buildings, we design civic, residential and workplace architecture rooted in its site.",
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
    description:
      "Our engineers shape the structure alongside the architecture, finding the clearest and most economical way for a building to stand.",
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
    description:
      "Interiors considered as part of the whole, with materials, light and joinery detailed to the same standard as the shell.",
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
    description:
      "Masterplans and public spaces that connect buildings to streets, landscape and the life of the neighbourhood around them.",
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

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-site">
        <div className="grid-site gap-y-8">
          <h2 data-animate="fade-up" className="col-span-12 md:col-span-7 lg:col-span-6">
            Services across the life of a building
          </h2>
          <p data-animate="fade-up" className="copy col-span-12 self-end md:col-span-5 lg:col-span-4 lg:col-start-9">
            Four disciplines under one roof, so that design and delivery stay
            connected from the first sketch to the final detail.
          </p>
        </div>

        <ul data-animate="stagger" className="mt-20 grid grid-cols-1 border-t border-l border-line md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li
              key={service.title}
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
                {service.icon}
              </svg>

              <div className="relative">
                <h3>{service.title}</h3>
                <p className="copy mt-6">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
