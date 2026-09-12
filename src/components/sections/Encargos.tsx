import { MessageCircle } from "lucide-react";
import { LeafMark } from "@/components/brand/Marks";
import { Precio } from "@/components/menu/Precio";
import { carta } from "@/data/menu";
import { whatsapp } from "@/lib/whatsapp";

const PAN = carta.find((s) => s.id === "pan-de-jamon")!;

/**
 * Pan de jamón por encargo.
 *
 * Es la conversión de mayor valor del sitio —de $4.70 a $31.99 frente a los
 * $2.60 de un cachito— y la única que la carta pide explícitamente gestionar
 * por teléfono: «AGENDA TÚ PAN DE JAMÓN». Por eso tiene su propio bloque y su
 * propio mensaje prellenado, en vez de quedar enterrada en la carta.
 *
 * No se promete plazo de anticipación ni disponibilidad: no constan. El
 * mensaje de WhatsApp los pregunta en lugar de afirmarlos.
 */
export function Encargos() {
  const platos = PAN.grupos[0].platos;

  return (
    <section className="border-t border-line py-20 sm:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <p className="eyebrow">Por encargo</p>
          <h2 className="mt-3 text-h2">Pan de jamón, todo el año</h2>
          <p className="definition mt-5 !max-w-[46ch] !text-[1.02rem]">
            <span className="gram">{PAN.marca} </span>
            {PAN.definicion}
          </p>
          <a
            href={whatsapp("panDeJamon")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-7"
          >
            <MessageCircle size={17} aria-hidden="true" />
            Agendar por WhatsApp
          </a>
          <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-ink-dim">
            Te confirmamos tamaños disponibles y con cuánta anticipación hay que pedirlo.
          </p>
        </div>

        <ul className="min-w-0">
          {platos.map((plato) => (
            <li
              key={plato.nombre}
              className="grid grid-cols-[1fr_auto] items-start gap-x-5 gap-y-3 border-b border-line py-5 first:border-t"
            >
              <div className="min-w-0">
                <h3 className="flex items-center gap-2 text-[1.15rem] font-bold leading-snug text-espresso">
                  {plato.veggie && <LeafMark size={16} className="text-teal-fill" />}
                  {plato.nombre}
                  {plato.veggie && <span className="sr-only">(vegetariano)</span>}
                </h3>
                {plato.descripcion && (
                  <p className="mt-1.5 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-dim">
                    {plato.descripcion}
                  </p>
                )}
              </div>
              <div className="justify-self-end">
                <Precio datos={plato.precios} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
