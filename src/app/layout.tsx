import type { Metadata, Viewport } from "next";
import { Bitter, Karla } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { localBusinessSchema } from "@/lib/schema";
import { asset } from "@/lib/paths";
import { site } from "@/data/site";

/**
 * TIPOGRAFÍA — dos familias, una por rol.
 *
 * Bitter (slab serif) para titulares y cifras de display. La carta impresa no
 * usa una didone de alto contraste sino un slab pesado y cálido; Bitter es la
 * traducción honesta de ese gesto. Se evita a propósito Playfair Display, que
 * es lo que toda plantilla de restaurante trae por defecto.
 *
 * Karla (grotesca humanista) para navegación, descripciones y precios. Tiene
 * carácter sin sonar corporativa y mantiene legibilidad a 14–16 px, que es
 * donde vive casi todo el contenido de una carta.
 */
const bitter = Bitter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bitter",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.nombreCompleto,
    template: `%s · ${site.nombre}`,
  },
  description: site.descripcion,
  applicationName: site.nombre,
  keywords: [
    "desayunos Quito",
    "brunch Quito",
    "café de especialidad Quito",
    "cafetería Catalina Aldaz",
    "pan de jamón Quito",
    "cachitos Quito",
    "cafetería con libros Quito",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_EC",
    siteName: site.nombre,
    title: site.nombreCompleto,
    description: site.descripcion,
    url: site.url,
  },
  icons: {
    icon: [{ url: asset("/brand/favicon-32.png"), sizes: "32x32", type: "image/png" }],
    apple: [{ url: asset("/brand/apple-icon.png"), sizes: "180x180" }],
  },
  robots: process.env.NEXT_PUBLIC_BASE_PATH
    ? // La vista previa bajo subdirectorio no debe indexarse ni competir con
      // el dominio definitivo.
      { index: false, follow: false }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f2ea",
  width: "device-width",
  initialScale: 1,
  // No se limita el zoom: la persona debe poder ampliar la carta.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-EC" className={`${bitter.variable} ${karla.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // El JSON-LD se genera de `src/data`, no se escribe a mano: así no
          // puede desincronizarse de los precios publicados.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <a
          href="#contenido"
          className="btn btn-dark sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
