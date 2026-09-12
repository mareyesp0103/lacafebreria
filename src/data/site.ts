/**
 * DATOS DEL NEGOCIO — fuente única.
 *
 * Todo lo que puede cambiar sin tocar el diseño vive aquí: contacto, redes,
 * reputación, rango de consumo y horario. Ningún componente repite un teléfono,
 * una dirección ni una cifra.
 *
 * REGLA DE VERACIDAD
 * Nada de este archivo se inventa. Lo que el cliente no ha confirmado se
 * marca `confirmado: false` y la interfaz lo muestra como
 * «Información sujeta a actualización» en lugar de rellenarlo.
 */

/** Etiqueta única para todo dato sin confirmar. No duplicar el texto. */
export const SIN_CONFIRMAR = "Información sujeta a actualización";

/** Fecha de la última revisión de los datos de este archivo. */
export const DATOS_ACTUALIZADOS = "2026-09-12";

export const site = {
  nombre: "La Cafebrería UIO",
  nombreCorto: "La Cafebrería",
  /** Como aparece en el buscador y en el título del documento. */
  nombreCompleto: "La Cafebrería UIO — Desayunos & Cafetería en Quito",
  categoria: "Cafetería, desayunos y brunch",
  ciudad: "Quito",
  pais: "Ecuador",
  /** Dominio definitivo. Cambiar al contratarlo; afecta a canónicas y JSON-LD. */
  url: "https://lacafebreriauio.com",
  descripcion:
    "Café de especialidad, desayunos todo el día, cachitos, pan de jamón y postres " +
    "en un lugar con libros y juegos para quedarse. Catalina Aldaz y Av. Portugal, Quito.",
} as const;

export const contacto = {
  /** Formato local para mostrar. */
  telefono: "098 315 3560",
  /** Formato E.164 para enlaces tel: y wa.me. */
  telefonoE164: "+593983153560",
  whatsapp: "593983153560",
  direccion: {
    edificio: "Edificio Ases",
    calle: "Catalina Aldaz N34-77 y Av. Portugal",
    ciudad: "Quito",
    pais: "Ecuador",
    /** Una línea, para pies y datos estructurados. */
    completa: "Edificio Ases, Catalina Aldaz N34-77 y Av. Portugal, Quito, Ecuador",
  },
  /**
   * Enlace corto de la ficha real de Google, facilitado por el cliente
   * (2026-09-12). Resuelve al local exacto, no a una búsqueda por dirección.
   *
   * Sigue sin publicarse `geo` en el JSON-LD: el enlace corto no expone
   * latitud y longitud, y no se van a estimar de un mapa.
   */
  mapsUrl: "https://maps.app.goo.gl/7Yr8scym4HKpq6EU8",
  instagram: "https://www.instagram.com/lacafebreriauio/",
  instagramHandle: "@lacafebreriauio",
  linktree: "https://linktr.ee/lacafreuio",
} as const;

/**
 * Reputación. Cifras de referencia facilitadas por el cliente: cambian solas
 * con el tiempo, así que se muestran con su fecha y nunca como algo vivo.
 * No se reproduce el texto de ninguna reseña: son de sus autores.
 */
export const reputacion = {
  confirmado: true,
  puntuacion: 4.9,
  escala: 5,
  resenas: 294,
  fuente: "Google",
  /** Fecha en que el cliente facilitó estas cifras. */
  fecha: "2026-09-12",
} as const;

/**
 * Consumo medio por persona, facilitado por el cliente como referencia.
 * No es una tarifa: los precios exactos viven en `menu.ts`, tomados de la carta.
 */
export const consumo = {
  confirmado: true,
  min: 5,
  max: 10,
  moneda: "USD",
} as const;

/**
 * HORARIO — facilitado por el cliente el 2026-09-12.
 *
 * Con `confirmado: true` la interfaz publica la tabla, marca el día de hoy y
 * dice si está abierto ahora; el JSON-LD emite `openingHoursSpecification`.
 * Poniéndolo en `false` todo eso desaparece y el bloque deriva a WhatsApp: es
 * preferible no decir nada a mandar a alguien a una puerta cerrada.
 *
 * `dias` lleva los nombres de schema.org, que `lib/schema.ts` consume tal cual.
 * `etiqueta` es lo que se lee en pantalla. Horas en formato 24 h.
 */
export const horario = {
  confirmado: true,
  /** Fecha en que el cliente facilitó estos horarios. */
  fecha: "2026-09-12",
  /** Zona del local: fija cuál es «hoy» sin depender de dónde esté quien mira. */
  zona: "America/Guayaquil",
  dias: [
    { dias: ["Monday"], etiqueta: "Lunes", abre: "08:00", cierra: "18:00" },
    {
      dias: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      etiqueta: "Martes a viernes",
      abre: "08:00",
      cierra: "19:00",
    },
    { dias: ["Saturday"], etiqueta: "Sábado", abre: "08:00", cierra: "17:00" },
    { dias: ["Sunday"], etiqueta: "Domingo", abre: "09:00", cierra: "13:00" },
  ] as { dias: string[]; etiqueta: string; abre: string; cierra: string }[],
} as const;

/**
 * Servicios. Sólo lo que consta en el material entregado.
 * `delivery`, `reservas` y `pedidos en línea` NO constan: quedan en false y
 * no se mencionan en ninguna parte del sitio.
 */
export const servicios = {
  consumoEnLocal: true,
  cafeDeEspecialidad: true,   // la carta vende el paquete de origen único
  libros: true,               // la marca es «Cafebrería»; el cliente lo declara
  juegos: true,               // declarado por el cliente
  encargoPanDeJamon: true,    // la carta: «AGENDA TÚ PAN DE JAMÓN» + teléfono
  delivery: false,
  reservas: false,
  pedidoEnLinea: false,
} as const;

/** Mensajes prellenados de WhatsApp, por contexto. */
export const whatsappMensajes = {
  general: "Hola, les escribo desde la página web de La Cafebrería.",
  panDeJamon:
    "Hola, quisiera encargar un pan de jamón de La Cafebrería. " +
    "¿Me confirman tamaños disponibles y tiempo de anticipación?",
  horario: "Hola, ¿me confirman el horario de atención de hoy en La Cafebrería?",
  temporada: "Hola, ¿cuál es el cachito de temporada que tienen hoy?",
  cafe: "Hola, quisiera consultar por el paquete de café de especialidad de origen único.",
} as const;
