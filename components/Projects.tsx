import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

// Staggered placement per position, so the grid reads as a composed spread
const layouts = [
  { item: "md:col-span-7", media: "md:aspect-4/5" },
  { item: "md:col-span-4 md:col-start-9 md:mt-48", media: "md:aspect-4/5" },
  { item: "md:col-span-5 md:col-start-2", media: "md:aspect-4/5" },
  { item: "md:col-span-6 md:col-start-7 md:self-center", media: "md:aspect-3/2" },
];

export default function Projects() {
  return (
    <section id="projects" className="section scroll-mt-20 bg-concrete">
      <div className="container-site">
        <h2 data-animate="fade-up">Selected projects</h2>

        <ul className="grid-site mt-20 gap-y-20 md:gap-y-32">
          {projects.map((project, i) => {
            const layout = layouts[i % layouts.length];
            return (
              <li key={project.slug} className={`col-span-12 ${layout.item}`}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div data-animate="reveal" className={`media aspect-4/5 ${layout.media}`}>
                    {project.image ? (
                      // Taller than the frame so the parallax shift never shows an edge
                      <div data-speed="auto" className="absolute inset-x-0 -top-[10%] h-[120%]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 768px) 60vw, 100vw"
                          className="object-cover transition-transform duration-1000 ease-arch group-hover:scale-[1.025]"
                        />
                      </div>
                    ) : (
                      <div role="img" aria-label={`${project.title} image placeholder`} className="size-full" />
                    )}
                  </div>

                  <div data-animate="fade-up" data-delay="0.5" className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-line pt-4">
                    <h3 className="transition-colors duration-500 ease-arch group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="meta">
                      {project.location}, {project.year}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Demo imagery: CC BY-SA requires visible attribution */}
        <p data-animate="fade" className="meta mt-24 max-w-[80ch] normal-case tracking-normal">
          Demo images via Wikimedia Commons:{" "}
          {projects
            .filter((project) => project.credit)
            .map((project, i, list) => (
              <span key={project.slug}>
                <a href={project.credit!.source} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {project.title}
                </a>{" "}
                by {project.credit!.author} (
                <a href={project.credit!.licenseUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {project.credit!.license}
                </a>
                ){i < list.length - 1 ? ", " : "."}
              </span>
            ))}
        </p>
      </div>
    </section>
  );
}
