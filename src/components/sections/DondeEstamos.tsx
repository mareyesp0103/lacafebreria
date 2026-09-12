import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Horario } from "@/components/sections/Horario";
import { contacto, horario, SIN_CONFIRMAR } from "@/data/site";
import { telefonoHref, whatsapp } from "@/lib/whatsapp";

/**
 * Cómo llegar, cuándo y cómo preguntar.
 *
 * El horario ocupa su propia tarjeta porque es la pregunta que trae a alguien
 * a la página de una cafetería. Si `horario.confirmado` fuese false, ese bloque
 * desaparece y en su lugar queda la derivación a WhatsApp: es preferible no
 * decir nada a mandar a alguien a una puerta cerrada.
 *
 * No hay mapa incrustado: el enlace corto de la ficha de Google no expone
 * latitud y longitud, y un iframe con coordenadas estimadas de mirar un mapa
 * señalaría un portal que no es. El enlace abre la ficha real.
 */
export function DondeEstamos() {
  return (
    <section
      id="donde-estamos"
      className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-line bg-paper-2 py-20 sm:py-24"
    >
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Dónde estamos</p>
          <h2 className="mt-3 text-h2">Catalina Aldaz y Av. Portugal</h2>

          <address className="mt-6 not-italic">
            <p className="font-display text-[1.3rem] font-bold leading-snug text-espresso">
              {contacto.direccion.edificio}
            </p>
            <p className="mt-1 text-[1.05rem] text-ink-dim">
              {contacto.direccion.calle}
              <br />
              {contacto.direccion.ciudad}, {contacto.direccion.pais}
            </p>
          </address>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={contacto.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MapPin size={17} aria-hidden="true" />
              Abrir en Google Maps
            </a>
            <a
              href={whatsapp("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>

          <dl className="mt-9 space-y-5 border-t border-line pt-7">
            {/* `dt` y `dd` deben ser hijos DIRECTOS del `dl` o de un único `div`
                envolvente. Con el icono en su propia columna de la retícula, el
                par queda al nivel correcto sin anidar un segundo contenedor. */}
            <div className="grid grid-cols-[auto_1fr] gap-x-3.5">
              <Phone
                size={19}
                className="row-span-2 mt-1 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <dt className="text-[0.95rem] font-bold text-espresso">Teléfono y WhatsApp</dt>
              <dd className="col-start-2 mt-0.5">
                <a
                  href={telefonoHref}
                  className="tabular text-[1.05rem] font-semibold text-espresso underline underline-offset-4 hover:text-terracotta-text"
                >
                  {contacto.telefono}
                </a>
              </dd>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-3.5">
              <Instagram
                size={19}
                className="row-span-2 mt-1 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <dt className="text-[0.95rem] font-bold text-espresso">En Instagram</dt>
              <dd className="col-start-2 mt-0.5 text-[0.95rem] text-ink-dim">
                <a
                  href={contacto.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-espresso underline underline-offset-4 hover:text-terracotta-text"
                >
                  {contacto.instagramHandle}
                </a>{" "}
                — lo del día, antes que en ningún sitio.
              </dd>
            </div>
          </dl>
        </div>

        <div className="card h-fit p-7 sm:p-8">
          <h3 className="flex items-center gap-2.5 text-[1.2rem] font-bold text-espresso">
            <Clock size={20} className="shrink-0 text-terracotta" aria-hidden="true" />
            Horario
          </h3>

          <div className="mt-5">
            {horario.confirmado && horario.dias.length > 0 ? (
              <Horario />
            ) : (
              <p className="text-[0.98rem] leading-relaxed text-ink-dim">
                {SIN_CONFIRMAR}.{" "}
                <a
                  href={whatsapp("horario")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-terracotta-text underline underline-offset-4 hover:text-espresso"
                >
                  Pregúntanos por WhatsApp
                </a>{" "}
                y te confirmamos el de hoy.
              </p>
            )}
          </div>

          <p className="mt-6 border-t border-line pt-5 text-[0.88rem] leading-relaxed text-ink-dim">
            ¿Vienes en una fecha especial?{" "}
            <a
              href={whatsapp("horario")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-terracotta-text underline underline-offset-4 hover:text-espresso"
            >
              Escríbenos
            </a>{" "}
            y te confirmamos el horario de ese día.
          </p>
        </div>
      </div>
    </section>
  );
}
