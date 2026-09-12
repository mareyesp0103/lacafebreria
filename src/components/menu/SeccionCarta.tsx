import { LeafMark } from "@/components/brand/Marks";
import { Precio } from "@/components/menu/Precio";
import { precio as fmt, type Grupo, type Plato, type Seccion } from "@/data/menu";

/**
 * Una fila de plato.
 *
 * El nivel del encabezado se calcula, no se fija: las secciones con subtítulo
 * («Caliente», «Frío», «Extras») introducen un h3 y el plato baja a h4; las que
 * no lo tienen —bebidas, cachitos, postres— dejarían un salto h2→h4 si el
 * nivel estuviera cableado.
 */
function Fila({ plato, nivel }: { plato: Plato; nivel: 3 | 4 }) {
  const H = (nivel === 3 ? "h3" : "h4") as "h3" | "h4";
  return (
    <li className="grid grid-cols-[1fr_auto] items-start gap-x-5 gap-y-2 border-b border-line py-5 last:border-b-0">
      <div className="min-w-0">
        <H className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[1.12rem] font-bold leading-snug text-espresso sm:text-[1.2rem]">
          {plato.veggie && (
            <LeafMark className="shrink-0 text-teal-fill" size={17} />
          )}
          <span>{plato.nombre}</span>
          {plato.veggie && <span className="sr-only">(vegetariano)</span>}
          {plato.insignia && (
            <span className="note note-amber !py-1 !text-[0.74rem] !font-bold uppercase !tracking-wide">
              {plato.insignia}
            </span>
          )}
        </H>
        {plato.descripcion && (
          <p className="mt-1.5 max-w-[58ch] text-[0.96rem] leading-relaxed text-ink-dim">
            {plato.descripcion}
          </p>
        )}
      </div>
      <div className="justify-self-end pt-0.5">
        <Precio datos={plato.precios} />
      </div>
    </li>
  );
}

function BloqueGrupo({ grupo }: { grupo: Grupo }) {
  // Sin subtítulo de grupo no hay h3 que lo anteceda: el plato ocupa ese nivel.
  const nivelPlato = grupo.titulo ? 4 : 3;
  return (
    <div>
      {grupo.titulo && (
        <h3 className="mb-1 mt-10 font-display text-[1.35rem] font-bold uppercase tracking-tight text-espresso first:mt-0">
          {grupo.titulo}
          {grupo.tituloEn && (
            <span className="ml-2 align-middle text-[0.75rem] font-bold uppercase tracking-[0.18em] text-terracotta-text">
              {grupo.tituloEn}
            </span>
          )}
        </h3>
      )}
      <ul className="mt-3">
        {grupo.platos.map((p) => (
          <Fila key={p.nombre} plato={p} nivel={nivelPlato} />
        ))}
      </ul>
    </div>
  );
}

/**
 * Una sección de la carta.
 *
 * La retícula reproduce la del impreso: la categoría en display grande a la
 * izquierda con su definición de diccionario, la lista de platos a la derecha.
 * En móvil la columna de título pasa arriba y la lista debajo, que es el orden
 * de lectura correcto.
 */
export function SeccionCarta({ seccion }: { seccion: Seccion }) {
  return (
    <section
      id={seccion.id}
      aria-labelledby={`${seccion.id}-titulo`}
      className="scroll-mt-[calc(var(--header-h)+84px)] py-12 sm:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+96px)] lg:self-start lg:text-right">
          <h2 id={`${seccion.id}-titulo`} className="display-stack">
            <span className="block">{seccion.titulo[0]}</span>
            <span className="block">{seccion.titulo[1]}</span>
          </h2>

          {seccion.definicion && (
            <p className="definition mt-5 lg:ml-auto">
              {seccion.marca && <span className="gram">{seccion.marca} </span>}
              {seccion.definicion}
            </p>
          )}

          {seccion.extras && seccion.extras.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2 lg:justify-end">
              {seccion.extras.map((e) => (
                <li key={e.texto}>
                  <span className="note">
                    {e.texto}
                    {e.valor !== undefined && (
                      <strong className="tabular font-bold">
                        {e.texto.startsWith("Paquete") ? ` ${fmt(e.valor)}` : ` +${fmt(e.valor)}`}
                      </strong>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="min-w-0">
          {seccion.nota && (
            <p className="note note-amber mb-7 !flex !items-start !text-left">{seccion.nota}</p>
          )}
          {seccion.grupos.map((g, i) => (
            <BloqueGrupo key={g.titulo ?? i} grupo={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
