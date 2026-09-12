import Link from "next/link";
import { BookOpen, MapPin, MessageCircle } from "lucide-react";
import { contacto } from "@/data/site";
import { whatsapp } from "@/lib/whatsapp";

/**
 * Barra de acciones fija en móvil.
 *
 * Tres destinos, no más: son las tres preguntas que decide alguien con el
 * teléfono en la mano —qué hay, dónde está, cómo pregunto—. El cuerpo reserva
 * su altura con `--bar-h` y el área segura del dispositivo, para que nunca
 * tape el final del contenido ni el control que tiene el foco (WCAG 2.4.11).
 */
export function MobileBar() {
  const acciones = [
    { href: "/carta/", label: "La carta", Icon: BookOpen, externo: false },
    { href: contacto.mapsUrl, label: "Cómo llegar", Icon: MapPin, externo: true },
    { href: whatsapp("general"), label: "WhatsApp", Icon: MessageCircle, externo: true },
  ];

  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 border-t border-line-strong bg-paper md:hidden"
      style={{
        zIndex: "var(--z-bar)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -6px 20px -14px rgb(87 53 26 / 0.5)",
      }}
    >
      <ul className="grid grid-cols-3">
        {acciones.map(({ href, label, Icon, externo }) => {
          const contenido = (
            <>
              <Icon size={19} aria-hidden="true" />
              <span className="text-[0.75rem] font-semibold leading-none">{label}</span>
            </>
          );
          const clases =
            "flex min-h-[64px] flex-col items-center justify-center gap-1.5 text-espresso " +
            "transition-colors hover:bg-paper-2";
          return (
            <li key={label}>
              {externo ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
                  {contenido}
                </a>
              ) : (
                <Link href={href} className={clases}>
                  {contenido}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
