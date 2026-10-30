import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How the Meridian Architects demo website handles data: no cookies, no tracking, and a contact form that sends nothing.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="30 October 2026"
      intro="This website is a demo project. Meridian Architects is not a real company, and this site does not collect, store or share any personal data."
      sections={[
        {
          heading: "A demonstration, not a business",
          paragraphs: [
            "This site was built to demonstrate web design and development. The studio, its team, its projects, clients and contact details are fictional. There is no organisation behind it that could act as a controller of your personal data.",
          ],
        },
        {
          heading: "The contact form",
          paragraphs: [
            "The enquiry form is for demonstration only. When you press “Send enquiry”, the form clears and shows a confirmation message in your browser. Nothing you type is sent anywhere, saved or read by anyone.",
            "Please do not use the form, the email address or the phone number shown on this site to try to reach a real architecture practice. They are placeholders.",
          ],
        },
        {
          heading: "Cookies, tracking and analytics",
          paragraphs: [
            "This site sets no cookies and does not use local storage. It includes no analytics, advertising or tracking scripts, and no embedded third-party content.",
            "Fonts and images are served from this site itself, so viewing a page does not send requests to font or image services.",
          ],
        },
        {
          heading: "Hosting",
          paragraphs: [
            "Like any website, the server that hosts this demo may keep standard technical logs, such as IP addresses and the pages requested, for security and operation. These logs are kept by the hosting provider under its own policies and are not used for any purpose related to this demo.",
          ],
        },
        {
          heading: "Links to other websites",
          paragraphs: [
            "This site links to external websites, including Wikimedia Commons for image credits, social networks and the developer’s website. Those sites have their own privacy policies, which apply once you follow a link.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "If the site ever starts collecting data, for example by connecting the contact form to a real service, this policy will be updated before that happens.",
          ],
        },
      ]}
    />
  );
}
