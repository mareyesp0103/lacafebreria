import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="paper-grain">
      <div className="shell flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
        <Logo size={84} />
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="mt-3 text-h1">Esta página se quedó sin capítulo</h1>
        <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-dim">
          La dirección que buscabas no existe o cambió de sitio. La carta, en cambio,
          sigue donde siempre.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/carta/" className="btn btn-primary">
            Ver la carta
          </Link>
          <Link href="/" className="btn btn-ghost">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
