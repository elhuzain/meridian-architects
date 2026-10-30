import Link from "next/link";
import Logo from "@/components/Logo";
import { projects } from "@/lib/projects";
import { socials } from "@/lib/socials";

const legal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms and conditions", href: "/terms" },
];

const linkClass = "link text-[0.9375rem] font-light";

export default function Footer() {
  return (
    <footer className="section-dark">
      <div className="container-site">
        <div data-animate="stagger" className="grid-site gap-y-12 border-t border-line pt-20 pb-24">
          <Link href="/" aria-label="Meridian Architects, home" className="col-span-12 self-start justify-self-start lg:col-span-4">
            <Logo />
          </Link>

          <nav aria-labelledby="footer-projects" className="col-span-12 sm:col-span-4 lg:col-span-3 lg:col-start-6">
            <h2 id="footer-projects" className="meta">
              Projects
            </h2>
            <ul className="mt-6 space-y-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={linkClass}>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-social" className="col-span-12 sm:col-span-4 lg:col-span-2 lg:col-start-9">
            <h2 id="footer-social" className="meta">
              Follow
            </h2>
            <ul className="mt-6 space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-legal" className="col-span-12 sm:col-span-4 lg:col-span-2 lg:col-start-11">
            <h2 id="footer-legal" className="meta">
              Legal
            </h2>
            <ul className="mt-6 space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden
          data-animate="fade-up"
          className="text-[clamp(3.5rem,13vw,12rem)] leading-[0.85] font-extralight tracking-[-0.04em]"
        >
          Meridian
        </p>

        <div className="meta mt-10 flex flex-wrap justify-between gap-4 border-t border-line py-8">
          <p>© {new Date().getFullYear()} Meridian Architects</p>
          <p>Architecture & engineering</p>
        </div>

        <p className="border-t border-line py-6 text-meta tracking-normal text-muted">
          Built by{" "}
          <a href="https://elhuzain.com" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
            elhuzain
          </a>
        </p>
      </div>
    </footer>
  );
}
