import type { Metadata } from "next";
import { siteConfig } from "./site-config";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/home-hero.webp",
): Metadata {
  return {
    title: { absolute: title + " | " + siteConfig.personName },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title + " | " + siteConfig.personName,
      description,
      url: path,
      locale: "tr_TR",
      type: "website",
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
