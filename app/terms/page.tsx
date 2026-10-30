import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms and conditions",
  description: "Terms for the Meridian Architects demo website: a fictional studio, demo content and credited third-party photography.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      updated="30 October 2026"
      intro="This website is a demo project. Meridian Architects does not exist, and nothing on this site is an offer of services, a contract or professional advice."
      sections={[
        {
          heading: "Purpose of this site",
          paragraphs: [
            "This site is a portfolio demonstration of web design and development. It imitates the website of an architecture and engineering studio so that its layout, typography and interactions can be shown in a realistic context.",
          ],
        },
        {
          heading: "Fictional content",
          paragraphs: [
            "The studio name, team members, roles, biographies, project names, locations, dates, clients, figures and descriptions are invented. Any resemblance to real people or organisations is coincidental.",
            "The team portraits and the studio workshop image are AI-generated and do not show real people.",
          ],
        },
        {
          heading: "Project photographs",
          paragraphs: [
            "The project photographs are real buildings photographed by third parties and used under the Creative Commons Attribution-ShareAlike 4.0 licence via Wikimedia Commons. They are not the work of this fictional studio, and the names and descriptions given to them here are fictional.",
            "Each photograph is credited with its author, source and licence where it appears. All rights in those photographs remain with their authors under the terms of that licence.",
          ],
        },
        {
          heading: "No services or advice",
          paragraphs: [
            "No architectural, engineering or other professional services are offered through this site, and no agreement can be formed by using it. Nothing on this site should be relied on as professional, technical or legal advice.",
          ],
        },
        {
          heading: "No warranty",
          paragraphs: [
            "The site is provided as is, for demonstration purposes, without any warranty. To the extent permitted by law, the developer accepts no liability for any use of, or reliance on, its content.",
          ],
        },
        {
          heading: "External links",
          paragraphs: [
            "Links to other websites are provided for convenience and credit. The developer is not responsible for the content or policies of those sites.",
          ],
        },
      ]}
    />
  );
}
