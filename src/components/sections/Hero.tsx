import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LeafMark } from "@/components/brand/Marks";
import { Precio } from "@/components/menu/Precio";
import { carta, destacados } from "@/data/menu";
import { consumo, contacto, reputacion } from "@/data/site";

/**
 * Apertura.
 *
 * Un solo mensaje. «Desayunos para quedarse un capítulo más» hace tres cosas a
 * la vez —nombra el producto, promete la permanencia y mantiene el registro
 * literario sin decir «libros»—, así que las otras opciones no aparecen en
 * pantalla compitiendo con ella.
 *
 * Sin fotografía: el material del cliente no trae ninguna y poner banco de
 * imágenes sería inventar el local. El peso visual lo llevan el display, el
 * logotipo y una ficha con tres platos reales de la carta, que además es
 * información útil y no decoración.
 */
const NOMBRE_SECCION = Object.fromEntries(carta.map((s) => [s.id, s.nav])) as Record<string, string>;

/** Primera frase completa: recortar por líneas parte palabras a media sílaba. */
function primeraFrase(texto: string): string {
  const corte = texto.indexOf(". ");
  return corte === -1 ? texto : texto.slice(0, corte + 1);
}

export function Hero() {
  const muestra = destacados.slice(0, 3);

  return (
    <section className="paper-grain relative overflow-hidden border-b border-line">
      <div className="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <p className="eyebrow">
            <LeafMark size={15} />
            Cafetería, desayunos y brunch · Quito
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.5rem,7.2vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-espresso">
            Desayunos para quedarse
            <br className="hidden sm:block" />{" "}
            <span className="relative inline-block">
              un capítulo más
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-3 left-0 h-2.5 w-full text-amber"
              >
                <path
                  d="M2 8c48-5 96-6 148-4 50 2 100 4 148 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-dim">
            Café de especialidad, desayunos todo el día, cachitos y pan de jamón.
            Con libros y juegos en la mesa de al lado, en Catalina Aldaz y Av. Portugal.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/carta/" className="btn btn-primary">
              Ver la carta
            </Link>
            <a
              href={contacto.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <MapPin size={17} aria-hidden="true" />
              Cómo llegar
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
            {reputacion.confirmado && (
              <div>
                <dt className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-ink-dim">
                  En {reputacion.fuente}
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 font-display text-[1.35rem] font-bold text-espresso">
                  <Star size={17} className="fill-amber text-amber" aria-hidden="true" />
                  <span className="tabular">{reputacion.puntuacion.toFixed(1)}</span>
                  <span className="text-[0.9rem] font-semibold text-ink-dim">
                    · {reputacion.resenas} reseñas
                  </span>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-ink-dim">
                Consumo por persona
              </dt>
              <dd className="mt-1 font-display text-[1.35rem] font-bold tabular text-espresso">
                ${consumo.min}–${consumo.max}
              </dd>
            </div>
            <div>
              <dt className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-ink-dim">
                Desayunos
              </dt>
              <dd className="mt-1 font-display text-[1.35rem] font-bold text-espresso">Todo el día</dd>
            </div>
          </dl>
        </div>

        {/* Ficha: tres platos reales de la carta. Sustituye a la fotografía
            que no existe, y a diferencia de una imagen de banco, informa. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-12 hidden h-48 w-48 rounded-full bg-amber/25 blur-2xl lg:block"
          />
          <div className="card relative p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">De nuestra carta</p>
                <h2 className="mt-1.5 font-display text-[1.5rem] font-bold text-espresso">
                  Para empezar el día
                </h2>
              </div>
              <Logo size={58} className="shrink-0" priority />
            </div>

            <ul className="mt-6">
              {muestra.map(({ seccion, plato }) => (
                <li
                  key={plato.nombre}
                  className="grid grid-cols-[1fr_auto] items-start gap-4 border-t border-line py-4"
                >
                  <div className="min-w-0">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-amber-deep">
                      {NOMBRE_SECCION[seccion]}
                    </p>
                    <h3 className="mt-0.5 flex items-center gap-1.5 text-[1.02rem] font-bold leading-snug text-espresso">
                      {plato.veggie && <LeafMark size={15} className="text-teal-fill" />}
                      {plato.nombre}
                    </h3>
                    {plato.descripcion && (
                      <p className="mt-1 text-[0.9rem] leading-snug text-ink-dim">
                        {primeraFrase(plato.descripcion)}
                      </p>
                    )}
                  </div>
                  <div className="justify-self-end">
                    <Precio datos={plato.precios} />
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/carta/"
              className="mt-5 inline-flex items-center gap-1.5 border-t-0 text-[0.94rem] font-bold text-terracotta-text underline underline-offset-4 hover:text-espresso"
            >
              Ver la carta completa
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
