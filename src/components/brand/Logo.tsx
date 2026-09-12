import { asset } from "@/lib/paths";
import { site } from "@/data/site";

/**
 * Logotipo de La Cafebrería.
 *
 * PROCEDENCIA Y LÍMITE. El único original disponible es el que viaja incrustado
 * en la carta 2026: un ráster de 236×231 px. Se aisló del fondo por relleno de
 * inundación desde los bordes, conservando la crema de las letras interiores.
 *
 * No se ha vectorizado: a esa resolución los trazos de la caligrafía miden
 * tres píxeles y cualquier calco sería un dibujo parecido, no el logotipo. Un
 * logotipo es identidad legal; «parecido» es incorrecto. Se usa el ráster tal
 * cual y se muestra como mucho a 118 px, donde conserva nitidez en pantallas
 * 2×. Para usarlo más grande hace falta el vector original del cliente.
 */
export function Logo({
  size = 44,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset("/brand/logo-cafebreria.png")}
      alt={`${site.nombre} — logotipo`}
      width={size}
      height={Math.round((size * 231) / 236)}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      style={{ width: size, height: "auto" }}
    />
  );
}

/**
 * Marca tipográfica para cuando el logotipo va acompañado de su nombre
 * (cabecera, pie). El logotipo lleva el `alt`; el texto queda como apoyo
 * visual y se oculta del árbol de accesibilidad para no duplicar el nombre.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`leading-[1.05] ${className}`}>
      <span className="block font-display text-[0.95rem] font-bold tracking-tight text-espresso">
        La Cafebrería
      </span>
      <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-ink-dim">
        Quito
      </span>
    </span>
  );
}
