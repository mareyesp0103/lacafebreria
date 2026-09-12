import { carta, rangoCarta, type Seccion } from "@/data/menu";
import { consumo, contacto, horario, reputacion, servicios, site } from "@/data/site";

/**
 * Datos estructurados para búsqueda local.
 *
 * Regla: sólo se emite lo que está confirmado. Un `openingHours` inventado o
 * un `aggregateRating` sin respaldo son motivo de penalización y, peor, mandan
 * a alguien a una puerta cerrada. Si el dato no existe, la propiedad no sale.
 */

function ratingSchema() {
  if (!reputacion.confirmado) return {};
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reputacion.puntuacion,
      bestRating: reputacion.escala,
      reviewCount: reputacion.resenas,
    },
  };
}

function horarioSchema() {
  if (!horario.confirmado || horario.dias.length === 0) return {};
  return {
    openingHoursSpecification: horario.dias.map((t) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: t.dias,
      opens: t.abre,
      closes: t.cierra,
    })),
  };
}

function seccionSchema(seccion: Seccion) {
  return {
    "@type": "MenuSection",
    name: seccion.titulo.join(" ").replace(/-\s/, ""),
    hasMenuItem: seccion.grupos.flatMap((grupo) =>
      grupo.platos.map((plato) => ({
        "@type": "MenuItem",
        name: plato.nombre,
        ...(plato.descripcion ? { description: plato.descripcion } : {}),
        ...(plato.veggie ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
        offers: plato.precios.map((p) => ({
          "@type": "Offer",
          price: p.valor.toFixed(2),
          priceCurrency: "USD",
          ...(p.etiqueta ? { name: p.etiqueta } : {}),
        })),
      })),
    ),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}/#negocio`,
    name: site.nombre,
    description: site.descripcion,
    url: site.url,
    telephone: contacto.telefonoE164,
    image: `${site.url}/brand/icon-192.png`,
    servesCuisine: ["Desayunos", "Brunch", "Café de especialidad", "Repostería"],
    priceRange: `$${consumo.min}–$${consumo.max}`,
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contacto.direccion.edificio}, ${contacto.direccion.calle}`,
      addressLocality: contacto.direccion.ciudad,
      addressCountry: "EC",
    },
    hasMap: contacto.mapsUrl,
    sameAs: [contacto.instagram, contacto.linktree],
    // No se declara `acceptsReservations`, `hasDeliveryMethod` ni `geo`:
    // ninguno consta en el material entregado.
    ...(servicios.consumoEnLocal ? { publicAccess: true } : {}),
    ...ratingSchema(),
    ...horarioSchema(),
    hasMenu: {
      "@type": "Menu",
      "@id": `${site.url}/carta/#carta`,
      name: `Carta de ${site.nombre}`,
      url: `${site.url}/carta/`,
      inLanguage: "es-EC",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: rangoCarta.min.toFixed(2),
        highPrice: rangoCarta.max.toFixed(2),
      },
      hasMenuSection: carta.map(seccionSchema),
    },
  };
}

/** Migas para la ruta de la carta. */
export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Carta", item: `${site.url}/carta/` },
    ],
  };
}
