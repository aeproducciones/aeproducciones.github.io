import type { Metadata } from "next";

export const siteUrl = "https://produccionesae.com";

export const socialImage = {
  url: `${siteUrl}/brand/ae-producciones-social-preview.png`,
  width: 1200,
  height: 630,
  alt: "AE Producciones · Música en vivo y producción para eventos.",
};

export function pageUrl(path: string): string {
  return new URL(`${path.replace(/\/$/, "")}/`, siteUrl).href;
}

export function pageMetadata(
  path: string,
  metadata: {
    title: string;
    description: string;
    robots?: Metadata["robots"];
  },
): Metadata {
  return {
    ...metadata,
    alternates: { canonical: pageUrl(path) },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: pageUrl(path),
      siteName: "AE Producciones",
      locale: "es_MX",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [socialImage],
    },
  };
}
