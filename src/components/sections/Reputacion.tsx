import { Star } from "lucide-react";
import { contacto, reputacion, SIN_CONFIRMAR } from "@/data/site";

/**
 * Reputación.
 *
 * Se publica la puntuación agregada con su fecha y su fuente, y se enlaza a
 * Google para leer las reseñas allí. NO se reproduce el texto de ninguna:
 * son de sus autores y copiarlas sin permiso no es nuestro. Tampoco se
 * presenta como un dato vivo: es la foto del día en que el cliente la
 * facilitó, y así se dice.
 */
export function Reputacion() {
  if (!reputacion.confirmado) {
    return null;
  }

  const fecha = new Date(`${reputacion.fecha}T12:00:00Z`).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section aria-labelledby="reputacion-titulo" className="border-t border-line py-14">
      <div className="shell flex flex-col items-center gap-5 text-center">
        <p
          className="flex items-center gap-1"
          role="img"
          aria-label={`${reputacion.puntuacion} sobre ${reputacion.escala} estrellas`}
        >
          {Array.from({ length: reputacion.escala }, (_, i) => (
            <Star
              key={i}
              size={22}
              aria-hidden="true"
              className={
                i < Math.round(reputacion.puntuacion)
                  ? "fill-amber text-amber"
                  : "text-line-strong"
              }
            />
          ))}
        </p>

        <h2 id="reputacion-titulo" className="text-h2">
          <span className="tabular">{reputacion.puntuacion.toFixed(1)}</span> sobre{" "}
          {reputacion.escala} en {reputacion.fuente}
        </h2>

        <p className="max-w-lg text-[1rem] leading-relaxed text-ink-dim">
          Con{" "}
          <strong className="tabular font-bold text-espresso">{reputacion.resenas} reseñas</strong>{" "}
          a {fecha}. La puntuación cambia sola, así que la publicamos con su fecha:{" "}
          {SIN_CONFIRMAR.toLowerCase()}.
        </p>

        <a
          href={contacto.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.95rem] font-bold text-terracotta-text underline underline-offset-4 hover:text-espresso"
        >
          Leer las reseñas en Google
        </a>
      </div>
    </section>
  );
}
