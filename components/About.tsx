import Image from "next/image";

const facts = [
  { label: "Founded", value: "2004" },
  { label: "Built projects", value: "120+" },
  { label: "Architects & engineers", value: "38" },
];

export default function About() {
  return (
    <section id="studio" className="section scroll-mt-20 bg-concrete">
      <div className="container-site">
        <div className="grid-site gap-y-16">
          <figure className="col-span-12 flex flex-col md:col-span-6 lg:col-span-5">
            <div data-animate="reveal" className="media aspect-4/5 md:aspect-auto md:min-h-[480px] md:flex-1">
              {/* Taller than the frame so the parallax shift never shows an edge */}
              <div data-speed="auto" className="absolute inset-x-0 -top-[10%] h-[120%]">
                <Image
                  src="/studio/workshop-floor.jpg"
                  alt="An architect cutting parts for a timber model on the studio workshop floor"
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption data-animate="fade" data-delay="0.8" className="meta mt-4">The studio, workshop floor</figcaption>
          </figure>

          <div className="col-span-12 self-end md:col-span-6 lg:col-span-6 lg:col-start-7">
            <h2 data-animate="fade-up">A studio where architecture and engineering share one desk</h2>

            <div data-animate="stagger" data-delay="0.15" className="mt-stack space-y-6">
              <p className="copy">
                For two decades we have worked across disciplines, with
                architects and structural engineers designing side by side from
                the first sketch. The result is buildings where form and
                structure are the same decision.
              </p>
              <p className="copy">
                We favour honest materials, careful detailing and spaces that
                age well. Every project is measured against the site it sits on
                and the people who will use it for decades to come.
              </p>
            </div>

            <dl data-animate="stagger" className="mt-16 grid grid-cols-3 gap-gutter border-t border-line pt-8">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="meta">{fact.label}</dt>
                  <dd className="mt-3 text-h2">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <a href="#team" data-animate="fade-up" className="link-underline mt-12 inline-block text-ink">
              Meet the team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
