import type { MetadataRoute } from "next";
import { formatPages, solutionPages } from "@/app/content/es";
import { pageUrl } from "@/app/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/es",
    "/es/soluciones",
    ...Object.keys(solutionPages).map((slug) => `/es/soluciones/${slug}`),
    "/es/servicios",
    "/es/royal-music",
    ...Object.keys(formatPages).map((slug) => `/es/royal-music/${slug}`),
    "/es/portafolio",
    "/es/nosotros",
    "/es/solicitar-propuesta",
  ];

  return paths.map((path) => ({ url: pageUrl(path) }));
}
