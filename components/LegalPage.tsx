type Section = { heading: string; paragraphs: string[] };

type Props = {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

export default function LegalPage({ title, updated, intro, sections }: Props) {
  return (
    <main className="container-site pt-32 pb-section md:pt-40">
      <div className="grid-site gap-y-8">
        <h1 data-animate="fade-up" className="col-span-12 lg:col-span-8">
          {title}
        </h1>
        <p data-animate="fade-up" className="meta col-span-12 self-end lg:col-span-3 lg:col-start-10 lg:text-right">
          Last updated {updated}
        </p>
      </div>

      <div className="grid-site mt-20 gap-y-16 md:mt-28">
        {/* Demo notice, set apart with hairlines */}
        <p
          data-animate="fade-up"
          className="col-span-12 border-y border-line py-8 text-lead text-ink lg:col-span-7 lg:col-start-5"
        >
          {intro}
        </p>

        <div className="col-span-12 space-y-16 lg:col-span-7 lg:col-start-5">
          {sections.map((section, i) => (
            <section key={section.heading} data-animate="fade-up" className="grid grid-cols-[3rem_1fr] gap-x-6">
              <span className="meta pt-2">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-h3">{section.heading}</h2>
                <div className="mt-6 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
