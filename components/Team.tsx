import Image from "next/image";

type Member = {
  name: string;
  role: string;
  linkedin: string;
  /** Path under /public, e.g. "/team/elena-varga.jpg" */
  image?: string;
};

const members: Member[] = [
  {
    name: "Elena Varga",
    role: "Founding partner, architect",
    linkedin: "https://www.linkedin.com/",
    image: "/team/elena-varga.jpg",
  },
  {
    name: "Tomas Lindqvist",
    role: "Partner, structural engineer",
    linkedin: "https://www.linkedin.com/",
    image: "/team/tomas-lindqvist.jpg",
  },
];

export default function Team() {
  return (
    <section id="team" className="section scroll-mt-20">
      <div className="container-site">
        <div className="grid-site gap-y-16">
          <div className="col-span-12 lg:col-span-4">
            <h2 data-animate="fade-up">The people behind the studio</h2>
            <p data-animate="fade-up" className="copy mt-stack">
              The studio is led by an architect and an engineer who have worked
              together since its founding, sharing responsibility for every
              project from the first sketch to completion.
            </p>
          </div>

          <ul data-animate="stagger" className="col-span-12 grid grid-cols-1 gap-x-gutter gap-y-16 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {members.map((member) => (
              <li key={member.name} className="group">
                <div className="media aspect-4/5">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale transition-[filter] duration-700 ease-arch group-focus-within:grayscale-0 group-hover:grayscale-0"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`Portrait placeholder for ${member.name}`}
                      className="size-full"
                    />
                  )}
                </div>

                <div className="mt-6 flex items-start justify-between gap-6 border-t border-line pt-4">
                  <div>
                    <h3>{member.name}</h3>
                    <p className="meta mt-3">{member.role}</p>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="flex size-10 shrink-0 items-center justify-center border border-ink text-ink transition-colors duration-300 ease-arch hover:bg-ink hover:text-paper"
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.25}
                    >
                      <path d="M4.5 3.5v1.5" />
                      <path d="M4.5 8v8.5" />
                      <path d="M9 16.5V8" />
                      <path d="M9 12c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4v4.5" />
                    </svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
