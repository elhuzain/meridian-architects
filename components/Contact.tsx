import ContactForm from "@/components/ContactForm";
import { socials } from "@/lib/socials";

export default function Contact() {
  return (
    <section id="contact" className="section section-dark scroll-mt-20">
      <div className="container-site">
        <div className="grid-site gap-y-20">
          <div className="col-span-12 lg:col-span-5">
            <h2 data-animate="fade-up">Let’s build something that lasts</h2>
            <p data-animate="fade-up" className="copy mt-stack">
              Whether you have a site, a brief or only an idea, we would like to
              hear about it. Tell us a little about your project and we will
              arrange a first conversation.
            </p>

            <dl data-animate="stagger" className="mt-16 grid sm:grid-cols-2 gap-gutter">
              <div>
                <dt className="meta">Email</dt>
                <dd className="mt-3">
                  <a href="mailto:studio@meridian.example" className="link-underline">
                    studio@meridian.example
                  </a>
                </dd>
              </div>
              <div>
                <dt className="meta">Phone</dt>
                <dd className="mt-3">
                  <a href="tel:+41000000000" className="link-underline">
                    +41 00 000 00 00
                  </a>
                </dd>
              </div>
            </dl>

            <ul aria-label="Social links" data-animate="stagger" className="mt-16 border-t border-line">
              {socials.map((social) => (
                <li key={social.label} className="border-b border-line">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-demo-link
                    className="flex items-center justify-between py-5 transition-colors duration-300 ease-arch hover:text-accent"
                  >
                    {social.label}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
