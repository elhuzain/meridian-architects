import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

// Stand-in until the dedicated hero image is ready
const featured = projects.find((p) => p.slug === "river-pavilion") ?? projects[0];

const cornerMarks = ["-top-4 -left-4", "-top-4 -right-4", "-bottom-4 -left-4", "-bottom-4 -right-4"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Blueprint grid behind the panel, faded out before the next section */}
      <span
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,black_75%,transparent)]"
      />

      <div className="relative container-site pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="relative">
          {/* Registration marks on the panel corners */}
          {cornerMarks.map((position) => (
            <svg
              key={position}
              aria-hidden
              viewBox="0 0 32 32"
              className={`absolute z-10 size-8 text-ink/40 ${position}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path d="M16 0V32M0 16H32" />
              <circle cx="16" cy="16" r="5" />
            </svg>
          ))}

          <div className="media relative min-h-150 md:aspect-16/10 lg:aspect-video">
            {featured.image && (
              <Image
                src={featured.image}
                alt={`${featured.title}, ${featured.location}`}
                fill
                priority
                sizes="(min-width: 1440px) 1280px, 100vw"
                className="object-cover"
              />
            )}

            {/* Soft dark overlay so the text stays legible over the photo */}
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/45 to-ink/5" />

            <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-16">
              <div className="grid w-full grid-cols-12 gap-x-gutter gap-y-12">
                <div className="col-span-12 lg:col-span-8">
                  <h1 className="text-paper text-7xl!">Architecture that holds its ground, shaped by light and structure</h1>
                  <p className="mt-stack max-w-[52ch] text-body text-paper/80">
                    We are an architecture and engineering studio designing civic, residential and workplace
                    buildings. Each project begins with the site and ends with a structure built to last for
                    generations.
                  </p>
                  <a
                    href="#projects"
                    className="btn mt-10 border-paper bg-paper text-ink hover:bg-transparent hover:text-paper"
                  >
                    View our work
                    <span aria-hidden>→</span>
                  </a>
                </div>

                <Link
                  href={`/projects/${featured.slug}`}
                  className="col-span-12 self-end border-t border-paper/25 pt-4 text-right text-paper transition-colors duration-500 ease-arch hover:text-paper/70 lg:col-span-3 lg:col-start-10"
                >
                  <span className="block text-lg font-light">{featured.title}</span>
                  <span className="mt-2 block text-meta tracking-[0.16em] text-paper/70 uppercase">
                    {featured.location}, {featured.year}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
