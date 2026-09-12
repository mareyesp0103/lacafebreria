import Link from "next/link";
import { LeafMark } from "@/components/brand/Marks";
import { Precio } from "@/components/menu/Precio";
import { carta, destacados, totalPlatos } from "@/data/menu";

const NOMBRE_SECCION = Object.fromEntries(
  carta.map((s) => [s.id, s.nav]),
) as Record<string, string>;

/**
 * Los cuatro platos que abren la carta.
 *
 * El criterio es explícito y verificable, no gusto personal: la propia carta
 * marca la tostada de huevo pochado como «la favorita de todos»; el tigrillo
 * es el plato ecuatoriano de la casa; el cachito y el pan de jamón son lo que
 * no se encuentra en otra cafetería de Quito. Ninguno se presenta como
 * «el más vendido»: esa cifra no la tenemos.
 */
export function Destacados() {
  return (
    <section className="on-dark py-20 sm:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">Empieza por aquí</p>
            <h2 className="mt-3 text-h2">Lo que no se encuentra en otra parte</h2>
          </div>
          <Link href="/carta/" className="btn btn-primary">
            Ver las {totalPlatos} referencias
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {destacados.map(({ seccion, plato }) => (
            <li
              key={plato.nombre}
              className="flex flex-col rounded-lg border border-ink-invert/15 bg-espresso-deep p-6"
            >
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-amber">
                {NOMBRE_SECCION[seccion]}
              </p>
              <h3 className="mt-2 flex items-center gap-2 font-display text-[1.3rem] font-bold leading-snug text-ink-invert">
                {plato.veggie && <LeafMark size={17} className="text-mint" />}
                {plato.nombre}
              </h3>
              {plato.descripcion && (
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-ink-invert/80">
                  {plato.descripcion}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink-invert/20 pt-4">
                {plato.insignia ? (
                  <span className="text-[0.82rem] font-semibold italic text-mint">
                    {plato.insignia}
                  </span>
                ) : (
                  <span />
                )}
                <Precio datos={plato.precios} sobreOscuro />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
