import mediaManifest from "@/data/media.json";
import { asset } from "@/lib/paths";

interface Variant {
  w: number;
  h: number;
  file: string;
}
interface Entry {
  w: number;
  h: number;
  sizes: Variant[];
}

const manifest = mediaManifest as Record<string, Entry>;

export interface ResolvedMedia {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  aspect: number;
}

/**
 * Resuelve un slug del manifiesto a las variantes WebP pregeneradas.
 * Las variantes se producen en el build de assets, no en tiempo de ejecución:
 * el sitio es una exportación estática y no usa el optimizador de Next.
 */
export function media(slug: string): ResolvedMedia | null {
  const entry = manifest[slug];
  if (!entry) return null;
  const variants = [...entry.sizes].sort((a, b) => a.w - b.w);
  const largest = variants[variants.length - 1];
  return {
    src: asset(`/media/${largest.file}`),
    srcSet: variants.map((v) => `${asset(`/media/${v.file}`)} ${v.w}w`).join(", "),
    width: largest.w,
    height: largest.h,
    aspect: largest.w / largest.h,
  };
}

export function hasMedia(slug: string): boolean {
  return slug in manifest;
}
