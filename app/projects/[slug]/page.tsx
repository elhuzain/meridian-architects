import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

// Only projects with page content get a route; others 404 until written
const published = projects.filter((project) => project.details);

export const dynamicParams = false;

export function generateStaticParams() {
  return published.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = published.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Meridian Architects`,
    description: project.details?.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = published.find((p) => p.slug === slug);
  if (!project?.details) notFound();

  const { details, credit } = project;
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <main>
      {/* Title */}
      <section className="container-site pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="grid-site gap-y-8">
          <h1 data-animate="fade-up" className="col-span-12 lg:col-span-8">{project.title}</h1>
          <p data-animate="fade-up" className="meta col-span-12 self-end lg:col-span-3 lg:col-start-10 lg:text-right">
            {project.location}, {project.year}
          </p>
        </div>
      </section>

      {/* Lead image */}
      <figure className="container-site">
        <div data-animate="reveal" data-delay="0.3" className="media aspect-4/5 md:aspect-video lg:aspect-[21/9]">
          {project.image && (
            // Taller than the frame so the parallax shift never shows an edge
            <div data-speed="auto" className="absolute inset-x-0 -top-[10%] h-[120%]">
              <Image
                src={project.image}
                alt={`${project.title}, ${project.location}`}
                fill
                priority
                sizes="(min-width: 1440px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
        {credit && (
          <figcaption data-animate="fade" data-delay="1.2" className="meta mt-4 normal-case tracking-normal">
            Demo image:{" "}
            <a href={credit.source} target="_blank" rel="noopener noreferrer" className="link-underline">
              photo by {credit.author}
            </a>{" "}
            (
            <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
              {credit.license}
            </a>
            ), via Wikimedia Commons
          </figcaption>
        )}
      </figure>

      {/* Facts and description */}
      <section className="section container-site">
        <div className="grid-site gap-y-16">
          <dl data-animate="stagger" className="col-span-12 border-t border-line lg:col-span-4">
            {details.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 border-b border-line py-4"
              >
                <dt className="meta pt-1">{fact.label}</dt>
                <dd className="text-[0.9375rem] font-light">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p data-animate="fade-up" className="text-lead text-ink">{details.summary}</p>
            <div data-animate="stagger" data-delay="0.15" className="mt-stack space-y-6">
              {details.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="copy">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other projects */}
      <section aria-labelledby="other-projects" className="section bg-concrete">
        <div className="container-site">
          <h2 id="other-projects" data-animate="fade-up">Other projects</h2>

          <ul data-animate="stagger" className="mt-16 grid grid-cols-1 gap-x-gutter gap-y-16 md:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/projects/${other.slug}`} className="group block">
                  <div className="media aspect-4/5">
                    {other.image && (
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-1000 ease-arch group-hover:scale-[1.025]"
                      />
                    )}
                  </div>

                  <div className="mt-6 border-t border-line pt-4">
                    <h3 className="transition-colors duration-500 ease-arch group-hover:text-accent">
                      {other.title}
                    </h3>
                    <p className="meta mt-3">
                      {other.location}, {other.year}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
