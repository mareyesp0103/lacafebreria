import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { contacto, horario, SIN_CONFIRMAR } from "@/data/site";
import { telefonoHref, whatsapp } from "@/lib/whatsapp";

/**
 * Cómo llegar y cómo preguntar.
 *
 * El horario NO está en el material entregado. Publicar uno inventado es el
 * error más caro que puede cometer el sitio de una cafetería: manda a alguien
 * a una puerta cerrada y quema la visita. Mientras no esté confirmado, el
 * bloque dice que está sujeto a actualización y deriva a WhatsApp, que es
 * donde de verdad se resuelve.
 *
 * Tampoco hay mapa incrustado: sin las coordenadas verificadas del local, un
 * iframe apuntaría a una posición aproximada. El enlace de Maps busca por la
 * dirección completa, que sí consta.
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
        </div>

        <div className="card p-7 sm:p-8">
          <h3 className="text-[1.2rem] font-bold text-espresso">Antes de venir</h3>

          {/* `dt` y `dd` deben ser hijos DIRECTOS del `dl` o de un único `div`
              envolvente. Con el icono en una columna propia de la retícula, el
              par queda al nivel correcto sin anidar un segundo contenedor. */}
          <dl className="mt-5 space-y-5">
            <div className="grid grid-cols-[auto_1fr] gap-x-3.5">
              <Clock
                size={19}
                className="row-span-2 mt-1 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <dt className="text-[0.95rem] font-bold text-espresso">Horario</dt>
              <dd className="col-start-2 mt-0.5 text-[0.95rem] leading-relaxed text-ink-dim">
                  {horario.confirmado && horario.dias.length > 0 ? (
                    <ul>
                      {horario.dias.map((t) => (
                        <li key={t.dias.join()} className="tabular">
                          {t.dias.join(", ")}: {t.abre}–{t.cierra}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
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
                    </>
                  )}
              </dd>
            </div>

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
      </div>
    </section>
  );
}
