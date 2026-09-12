import Link from "next/link";
import { Instagram, Link2, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { contacto, DATOS_ACTUALIZADOS, site } from "@/data/site";
import { avisoIva } from "@/data/menu";
import { telefonoHref } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="on-dark border-t border-espresso-deep">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo size={62} />
          <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink-invert/80">
            Desayunos todo el día, café de especialidad, libros y juegos.
            En Catalina Aldaz y Av. Portugal.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-amber">
            Dónde estamos
          </h2>
          <address className="not-italic text-[0.95rem] leading-relaxed text-ink-invert/85">
            {contacto.direccion.edificio}
            <br />
            {contacto.direccion.calle}
            <br />
            {contacto.direccion.ciudad}, {contacto.direccion.pais}
          </address>
          <a
            href={contacto.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-amber underline underline-offset-4 hover:text-ink-invert"
          >
            <MapPin size={15} aria-hidden="true" />
            Abrir en Google Maps
          </a>
        </div>

        <div>
          <h2 className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-amber">
            Escríbenos
          </h2>
          <ul className="space-y-2.5 text-[0.95rem]">
            <li>
              <a
                href={telefonoHref}
                className="inline-flex items-center gap-2 text-ink-invert/85 hover:text-amber"
              >
                <Phone size={15} aria-hidden="true" />
                <span className="tabular">{contacto.telefono}</span>
              </a>
            </li>
            <li>
              <a
                href={contacto.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ink-invert/85 hover:text-amber"
              >
                <Instagram size={15} aria-hidden="true" />
                {contacto.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={contacto.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ink-invert/85 hover:text-amber"
              >
                <Link2 size={15} aria-hidden="true" />
                Todos nuestros enlaces
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-amber">
            El sitio
          </h2>
          <ul className="space-y-2.5 text-[0.95rem]">
            <li>
              <Link href="/carta/" className="text-ink-invert/85 hover:text-amber">
                La carta completa
              </Link>
            </li>
            <li>
              <Link href="/#el-lugar" className="text-ink-invert/85 hover:text-amber">
                Qué es La Cafebrería
              </Link>
            </li>
            <li>
              <Link href="/#donde-estamos" className="text-ink-invert/85 hover:text-amber">
                Cómo llegar
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-invert/15">
        <div className="shell flex flex-col gap-2 py-6 text-[0.83rem] text-ink-invert/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nombre}. {avisoIva}
          </p>
          <p>
            Precios y datos de la carta 2026 · revisados el{" "}
            <time dateTime={DATOS_ACTUALIZADOS}>
              {new Date(DATOS_ACTUALIZADOS + "T12:00:00Z").toLocaleDateString("es-EC", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </p>
        </div>
      </div>
    </footer>
  );
}
