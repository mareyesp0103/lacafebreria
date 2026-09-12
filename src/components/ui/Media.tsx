import { media } from "@/lib/media";

interface Props {
  /** Slug del manifiesto de medios. */
  slug: string;
  alt: string;
  className?: string;
  /** Atributo `sizes`; por defecto asume ancho completo del contenedor. */
  sizes?: string;
  /** Las imágenes sobre el pliegue deben cargarse con prioridad. */
  priority?: boolean;
  /** Relación de aspecto forzada, p. ej. "16 / 9". Reserva espacio y evita CLS. */
  ratio?: string;
  /** Posición del recorte cuando se fuerza la relación de aspecto. */
  position?: string;
}

/**
 * Imagen responsive sobre variantes WebP pregeneradas.
 *
 * Siempre declara `width`/`height` (o `aspect-ratio`) para reservar el espacio
 * antes de la descarga y mantener CLS en cero.
 */
export function Media({
  slug,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  ratio,
  position = "center",
}: Props) {
  const m = media(slug);
  if (!m) return null;

  return (
    <img
      src={m.src}
      srcSet={m.srcSet}
      sizes={sizes}
      alt={alt}
      width={m.width}
      height={m.height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      // eslint-disable-next-line @next/next/no-img-element
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      style={ratio ? { aspectRatio: ratio, objectFit: "cover", objectPosition: position, width: "100%", height: "100%" } : undefined}
    />
  );
}
