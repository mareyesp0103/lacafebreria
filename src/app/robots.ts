import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

/**
 * La vista previa se sirve bajo subdirectorio y no debe indexarse: competiría
 * con el dominio definitivo y expondría contenido aún sin validar por el
 * cliente. En el dominio final, sin `NEXT_PUBLIC_BASE_PATH`, se indexa normal.
 */
const esVistaPrevia = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

export default function robots(): MetadataRoute.Robots {
  if (esVistaPrevia) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
