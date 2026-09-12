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
   * Enlace de búsqueda por dirección, no por identificador de ficha: no
   * disponemos del place_id ni de las coordenadas verificadas del local.
   * Sustituir por el enlace corto de la ficha de Google cuando el cliente
   * lo facilite — y sólo entonces añadir `geo` al JSON-LD.
   */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("La Cafebrería UIO, Catalina Aldaz N34-77 y Av. Portugal, Quito"),
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
 * HORARIO — no facilitado.
 *
 * El cliente no entregó horario y la carta no lo contiene. Inventarlo sería
 * el peor error posible en una cafetería: manda a alguien a una puerta
 * cerrada. Queda vacío y la interfaz deriva a WhatsApp.
 *
 * Para publicarlo: poner `confirmado: true` y rellenar `dias`. La ficha
 * `openingHours` del JSON-LD sólo se emite cuando `confirmado` es true.
 */
export const horario = {
  confirmado: false,
  /** { dias: ["Mo","Tu"], abre: "07:30", cierra: "19:00" } */
  dias: [] as { dias: string[]; abre: string; cierra: string }[],
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
