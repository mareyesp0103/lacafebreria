import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { NavCarta } from "@/components/menu/NavCarta";
import { SeccionCarta } from "@/components/menu/SeccionCarta";
import { DottedRule } from "@/components/brand/Marks";
import { avisoAlergias, avisoIva, carta, rangoCarta, totalPlatos } from "@/data/menu";
import { DATOS_ACTUALIZADOS, site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { whatsapp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "La carta",
  description:
    `Carta completa de ${site.nombre}: desayunos todo el día, café de especialidad, ` +
    `cachitos, pan de jamón, bebidas y postres. ${totalPlatos} referencias con precios, ` +
    "IVA incluido.",
  alternates: { canonical: "/carta/" },
  openGraph: {
    title: `La carta · ${site.nombre}`,
    description: `${totalPlatos} referencias con precio, de $${rangoCarta.min.toFixed(2)} a $${rangoCarta.max.toFixed(2)}.`,
    url: "/carta/",
  },
};

export default function Carta() {
  const fecha = new Date(`${DATOS_ACTUALIZADOS}T12:00:00Z`).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema()) }}
      />

      <header className="paper-grain border-b border-line">
        <div className="shell py-12 sm:py-16">
          <nav aria-label="Migas de pan" className="mb-6">
            <ol className="flex items-center gap-2 text-[0.86rem] text-ink-dim">
              <li>
                <Link href="/" className="underline underline-offset-4 hover:text-espresso">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-espresso">
                La carta
              </li>
            </ol>
          </nav>

          <h1 className="text-h1">La carta</h1>
          <p className="mt-4 max-w-[52ch] text-[1.08rem] leading-relaxed text-ink-dim">
            {totalPlatos} referencias, de ${rangoCarta.min.toFixed(2)} a $
            {rangoCarta.max.toFixed(2)}. {avisoIva} Precios tomados de la carta 2026 y
            revisados el <time dateTime={DATOS_ACTUALIZADOS}>{fecha}</time>.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={whatsapp("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Preguntar por WhatsApp
            </a>
            <Link href="/#donde-estamos" className="btn btn-ghost">
              Cómo llegar
            </Link>
          </div>
        </div>
      </header>

      <NavCarta />

      <div className="shell">
        {carta.map((seccion, i) => (
          <div key={seccion.id}>
            {i > 0 && <DottedRule />}
            <SeccionCarta seccion={seccion} />
          </div>
        ))}
      </div>

      <aside className="border-t border-line bg-paper-2 py-12">
        <div className="shell">
          <p className="mx-auto flex max-w-2xl items-start gap-3.5 text-[1rem] leading-relaxed text-ink">
            <AlertTriangle
              size={22}
              className="mt-0.5 shrink-0 text-terracotta"
              aria-hidden="true"
            />
            <span>{avisoAlergias}</span>
          </p>
        </div>
      </aside>
    </>
  );
}
