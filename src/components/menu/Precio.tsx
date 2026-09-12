import { precio as fmt, type Precio as PrecioDato } from "@/data/menu";

const TONO = {
  amber: "price-chip",
  terracotta: "price-chip price-chip-terracotta",
  mint: "price-chip price-chip-mint",
  teal: "price-chip price-chip-teal",
  plano: "price",
} as const;

/**
 * Precio de un plato.
 *
 * La carta impresa usa dos tratamientos y aquí se conservan, porque distinguen
 * información: precio suelto alineado a la derecha para lo que se pide sin
 * elegir, y pastilla de color para lo que tiene variantes de tamaño. El color
 * de cada pastilla es el que el impreso asigna a esa variante, no una decisión
 * nueva.
 *
 * Contraste verificado en cada combinación: espresso sobre ámbar 5.22:1,
 * blanco sobre terracota 4.52:1, tinta sobre menta 10.54:1, blanco sobre teal
 * 4.53:1. Blanco sobre ámbar daría 2.08:1 y no se usa nunca.
 *
 * `sobreOscuro` sólo cambia el precio SIN pastilla, que por defecto va en
 * espresso y desaparecería sobre el bloque marrón. Las pastillas llevan su
 * propio fondo y funcionan igual en los dos contextos.
 */
export function Precio({
  datos,
  sobreOscuro = false,
}: {
  datos: PrecioDato[];
  sobreOscuro?: boolean;
}) {
  const conEtiqueta = datos.some((d) => d.etiqueta);
  const planoColor = sobreOscuro ? "text-ink-invert" : "text-espresso";

  if (!conEtiqueta) {
    const uno = datos[0];
    const tono = uno.tono ?? "plano";
    return tono === "plano" ? (
      <span className={`price ${planoColor}`}>{fmt(uno.valor)}</span>
    ) : (
      <span className={TONO[tono]}>{fmt(uno.valor)}</span>
    );
  }

  return (
    <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
      {datos.map((d) => (
        <li key={d.etiqueta ?? d.valor} className="flex items-center gap-1.5">
          <span className={`font-display text-[1.05rem] font-bold leading-none ${planoColor}`}>
            {d.etiqueta}
          </span>
          <span className={TONO[d.tono ?? "amber"]}>{fmt(d.valor)}</span>
        </li>
      ))}
    </ul>
  );
}
