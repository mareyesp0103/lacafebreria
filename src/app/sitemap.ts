import type { MetadataRoute } from "next";
import { DATOS_ACTUALIZADOS, site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const modificado = new Date(`${DATOS_ACTUALIZADOS}T12:00:00Z`);
  return [
    { url: `${site.url}/`, lastModified: modificado, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/carta/`, lastModified: modificado, changeFrequency: "monthly", priority: 0.9 },
  ];
}
