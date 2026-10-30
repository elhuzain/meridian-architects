import type { Metadata } from "next";

export const siteName = "Meridian Architects";
export const siteTitle = `${siteName} — Architecture & engineering studio`;
export const siteDescription =
  "Meridian Architects is a fictional architecture and engineering studio designing civic, residential and workplace buildings. A demo website by elhuzain.";

export const defaultImage = {
  url: "/projects/river-pavilion.jpg",
  width: 1920,
  height: 1280,
  alt: "River Pavilion at dusk",
};

type Image = typeof defaultImage;

// Next.js replaces (not merges) openGraph/twitter set by a page, so every page builds the full set here
export function pageMetadata({
  title,
  description,
  path,
  image = defaultImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: Image;
}): Metadata {
  const fullTitle = `${title} — ${siteName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
