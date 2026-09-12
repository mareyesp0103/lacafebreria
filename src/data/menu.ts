/**
 * LA CARTA — contenido íntegro de «Menú La Cafebrería 2026».
 *
 * PROCEDENCIA. El PDF entregado no tiene capa de texto: son cuatro imágenes
 * planas (1022×1754). No hay cifra que se pueda citar de un `text.txt`, así
 * que cada precio y cada descripción se leyó de recortes ampliados al 200–300 %
 * y se contrastó dos veces contra el original. Los recortes de verificación
 * quedan en `build/zoom/` del repositorio de trabajo.
 *
 * QUÉ SE RESPETÓ LITERALMENTE
 *   · Nombres de producto, incluida su grafía propia (Capuccino, Mocaccino,
 *     Afogatto, Ricota, Capressa, Iced Mocca). Son nombres, no erratas.
 *   · Precios, tamaños y condiciones.
 *   · El color de cada pastilla de precio, que en el impreso distingue
 *     variante y familia.
 *
 * QUÉ SE CORRIGIÓ
 *   Sólo ortografía inequívoca del texto descriptivo, que en una web comercial
 *   no debe publicarse con erratas: provarás→probarás, increibles→increíbles,
 *   clasico→clásico, sóla→sola, esta disponible→está disponible.
 *   Ningún nombre de producto se tocó. Ninguna descripción cambió de sentido.
 *
 * QUÉ NO EXISTE EN LA FUENTE
 *   Fotografías (el PDF no contiene ninguna), alérgenos por plato, calorías,
 *   disponibilidad por horario y origen del café de especialidad. No se
 *   inventa nada de eso.
 */

/** Tono de la pastilla de precio; replica el color del impreso. */
export type Tono = "amber" | "terracotta" | "mint" | "teal" | "plano";

export interface Precio {
  /** Tamaño o variante: «30 cm», «50 cm». Vacío si el plato tiene precio único. */
  etiqueta?: string;
  valor: number;
  tono?: Tono;
}

export interface Plato {
  nombre: string;
  descripcion?: string;
  /** Traducción de la carta impresa. Disponible para una futura versión en inglés. */
  descripcionEn?: string;
  precios: Precio[];
  /** Marcado con la hoja en el impreso. */
  veggie?: boolean;
  /** Lo que la propia carta señala como favorito o insignia. */
  insignia?: string;
}

export interface Grupo {
  /** Subtítulo dentro de la sección: «Caliente», «Frío». */
  titulo?: string;
  tituloEn?: string;
  platos: Plato[];
}

export interface Seccion {
  id: string;
  /** Nombre corto para la navegación. */
  nav: string;
  /** Título de display, partido en dos como en el impreso: «CACHI-» / «TOS». */
  titulo: [string, string];
  /** La marca gramatical del impreso: «(1. m. Ven.)». */
  marca?: string;
  /** La definición de diccionario que acompaña a la marca. */
  definicion?: string;
  /** Aviso propio de la sección, tal como aparece en la carta. */
  nota?: string;
  /** Complemento con precio suelto: leche vegetal, gelato extra, paquete de café. */
  extras?: { texto: string; valor?: number; tono?: Tono }[];
  grupos: Grupo[];
}

export const carta: Seccion[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "desayunos",
    nav: "Desayunos",
    titulo: ["BREAKFAST", "ALL DAY"],
    nota: "Todos los desayunos incluyen café americano o jugo de frutas.",
    grupos: [
      {
        platos: [
          {
            nombre: "Pancakes",
            veggie: true,
            descripcion:
              "¡Los pancakes más esponjosos que probarás jamás! Acompañados de frutos del bosque, miel de maple y mantequilla.",
            descripcionEn:
              "The fluffiest pancakes you will ever taste! Accompanied by berries, maple syrup and butter.",
            precios: [{ valor: 10.99, tono: "terracotta" }],
          },
          {
            nombre: "Tostada de huevo pochado",
            insignia: "La favorita de todos",
            descripcion:
              // «¡La favorita de todos!» va en `insignia`, no repetido aquí.
              "Pan campesino con cama de aguacate, tocino crujiente, crema holandesa y un huevo pochado.",
            descripcionEn:
              "Peasant bread with a bed of avocado, crispy bacon, hollandaise cream and a poached egg. Everyone's favorite!",
            precios: [{ valor: 11.99, tono: "amber" }],
          },
          {
            nombre: "Tostada de tigrillo",
            descripcion:
              "El mejor homenaje a la comida ecuatoriana en una tostada. Pan campesino, tigrillo de verde y maduro con trozos de fritada, bañado en una irresistible salsa de queso azul, y coronado con un huevo frito de codorniz más sal prieta.",
            descripcionEn:
              "The best tribute to Ecuadorian food in a toast. Peasant bread, green and ripe tigrillo with fried pieces, bathed in an irresistible blue cheese sauce, and topped with a fried quail egg plus brown salt.",
            precios: [{ valor: 11.99, tono: "amber" }],
          },
          {
            nombre: "Tostada ibérica",
            descripcion:
              "Lo mejor del Mediterráneo en un plato. Pan campesino combinado con dos increíbles quesos: ibérico y mozzarella; rúcula fresca, jamón serrano y aceitunas.",
            descripcionEn:
              "The best of the Mediterranean on a plate. Peasant bread combined with two incredible cheeses: Iberian and mozzarella; fresh arugula, serrano ham and olives.",
            precios: [{ valor: 11.99, tono: "amber" }],
          },
          {
            nombre: "Tostada capressa",
            veggie: true,
            descripcion:
              "Pan campesino, tomates cherrys salteados, albahaca frita, queso mozzarella y reducción de balsámico dulce.",
            descripcionEn:
              "Peasant bread, sautéed cherry tomatoes, fried basil, mozzarella cheese and sweet balsamic reduction.",
            precios: [{ valor: 11.99, tono: "amber" }],
          },
        ],
      },
      {
        titulo: "Para picar",
        platos: [
          {
            nombre: "Mini tostadas",
            descripcion: "Seis deliciosas mini tostadas variadas, ideales para dos. No incluye bebida.",
            descripcionEn: "Six delicious assorted mini toasts, ideal for two. Does not include drink.",
            precios: [{ valor: 12.99, tono: "terracotta" }],
          },
        ],
      },
      {
        titulo: "Extras",
        platos: [
          { nombre: "Porción de pan", precios: [{ valor: 1.5 }] },
          { nombre: "Porción de huevos", precios: [{ valor: 2.99 }] },
          { nombre: "Porción de tocino", precios: [{ valor: 1.5 }] },
          { nombre: "Porción de aguacate", precios: [{ valor: 0.99 }] },
          { nombre: "Porción de queso", precios: [{ valor: 1.5 }] },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "cafe",
    nav: "Café",
    titulo: ["CA-", "FÉ"],
    marca: "(1. m.)",
    definicion:
      "Bebida de los Dioses que se hace por infusión con la semilla tostada y molida del cafeto.",
    extras: [
      { texto: "Paquete de nuestro café de especialidad de origen único, en granos o molido", valor: 14.99 },
      { texto: "Leche vegetal", valor: 1.2 },
    ],
    grupos: [
      {
        titulo: "Caliente",
        tituloEn: "Hot coffee",
        platos: [
          { nombre: "Espresso simple", precios: [{ valor: 2.4 }] },
          { nombre: "Espresso doble", precios: [{ valor: 2.99 }] },
          { nombre: "Americano simple", precios: [{ valor: 2.6 }] },
          { nombre: "Americano doble", precios: [{ valor: 2.99 }] },
          { nombre: "Capuccino", precios: [{ valor: 3.7 }] },
          { nombre: "Mocaccino", precios: [{ valor: 4.2 }] },
          { nombre: "Latte", precios: [{ valor: 3.7 }] },
          { nombre: "Flat white", precios: [{ valor: 3.99 }] },
          { nombre: "Vietnamita", precios: [{ valor: 3.2 }] },
          { nombre: "Macchiato", precios: [{ valor: 2.7 }] },
          { nombre: "Afogatto", precios: [{ valor: 4.99 }] },
          { nombre: "Filtrado en V60", descripcion: "Café filtrado.", precios: [{ valor: 4.99 }] },
          { nombre: "Prensa francesa", precios: [{ valor: 3.99 }] },
        ],
      },
      {
        titulo: "Frío",
        tituloEn: "Ice coffee",
        platos: [
          { nombre: "Iced american coffee", precios: [{ valor: 3.7 }] },
          { nombre: "Iced mocca", precios: [{ valor: 4.2 }] },
          { nombre: "Iced latte", precios: [{ valor: 3.99 }] },
          { nombre: "Iced mint coffee", precios: [{ valor: 4.2 }] },
          {
            nombre: "Orange doppio",
            descripcion: "Jugo de naranja recién exprimido + espresso doble.",
            descripcionEn: "Freshly squeezed orange juice and a double espresso.",
            precios: [{ valor: 4.99 }],
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "bebidas",
    nav: "Bebidas",
    titulo: ["otras", "BEBIDAS"],
    grupos: [
      {
        platos: [
          { nombre: "Chocolate de la casa", precios: [{ valor: 4.6 }] },
          {
            nombre: "Limonada de coco",
            descripcionEn: "Coconut milkshake, lemonade with condensed milk.",
            precios: [{ valor: 3.99 }],
          },
          {
            nombre: "Infusiones y té",
            descripcion: "Fríos o calientes, pregunta por nuestras opciones.",
            precios: [{ valor: 3.99 }],
          },
          { nombre: "Milkshake chocorramo", precios: [{ valor: 5.8 }] },
          {
            nombre: "Jugo de frutas",
            descripcion: "Pregunta por nuestros sabores.",
            precios: [{ valor: 2.99 }],
          },
          { nombre: "Jugo de naranja", precios: [{ valor: 3.5 }] },
          { nombre: "Coca-Cola / Sprite", precios: [{ valor: 2.3 }] },
          { nombre: "Agua sin gas", precios: [{ valor: 1.99 }] },
          { nombre: "Agua con gas", precios: [{ valor: 2.5 }] },
          { nombre: "Copa de tinto", precios: [{ valor: 5.8 }] },
          { nombre: "Copa de vino hervido", precios: [{ valor: 5.8 }] },
          { nombre: "Botella de vino", precios: [{ valor: 29.9 }] },
          { nombre: "Cerveza nacional", precios: [{ valor: 2.9 }] },
          { nombre: "Cerveza importada", precios: [{ valor: 3.9 }] },
          {
            nombre: "Cerveza artesanal",
            descripcion: "Pregunta por cervezas BANDIDOS.",
            precios: [{ valor: 6.99 }],
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "cachitos",
    nav: "Cachitos",
    titulo: ["CACHI-", "TOS"],
    marca: "(1. m. Ven.)",
    definicion:
      "Panecillo de masa suave relleno de muchísimo sabor; bañado con un dulce toque de panela.",
    nota: "¡Pregunta por nuestro cachito de temporada!",
    grupos: [
      {
        platos: [
          {
            nombre: "Clásico",
            descripcion: "Jamón ahumado y tocino.",
            descripcionEn: "Smoked ham and bacon.",
            precios: [{ valor: 2.6 }],
          },
          {
            nombre: "Queso crema",
            descripcion: "Jamón ahumado, tocino y queso crema.",
            descripcionEn: "Smoked ham, bacon and cream cheese.",
            precios: [{ valor: 2.99 }],
          },
          {
            nombre: "Ricota y espinacas",
            veggie: true,
            descripcionEn: "Ricotta and spinach.",
            precios: [{ valor: 2.99 }],
          },
          {
            nombre: "Ricota, espinacas y tocino",
            descripcionEn: "Ricotta, spinach and bacon.",
            precios: [{ valor: 2.99 }],
          },
          {
            nombre: "Pizza",
            descripcion: "Jamón ahumado, tocino, queso fresco, albahaca y tomates cherrys salteados.",
            descripcionEn: "Smoked ham, bacon, cheese, basil and cherry tomatoes.",
            precios: [{ valor: 2.99 }],
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "pan-de-jamon",
    nav: "Pan de jamón",
    titulo: ["PAN de", "JAMÓN"],
    marca: "(1. m. Ven.)",
    definicion:
      "Pan relleno de jamón, pasas y aceitunas verdes. Tradicionalmente típico en navidad; en La Cafre está disponible TODO EL AÑO.",
    nota: "Agenda tu pan de jamón por WhatsApp.",
    grupos: [
      {
        platos: [
          {
            nombre: "Mini pan",
            descripcion: "El clásico de siempre en tamaño personal.",
            descripcionEn: "The usual classic in personal size.",
            precios: [{ valor: 4.7 }],
          },
          {
            nombre: "Clásico",
            descripcion: "Jamón ahumado, tocino, aceitunas y pasas.",
            descripcionEn: "Smoked ham, bacon, olives and raisins.",
            precios: [
              { etiqueta: "30 cm", valor: 15.99, tono: "amber" },
              { etiqueta: "50 cm", valor: 24.99, tono: "amber" },
            ],
          },
          {
            nombre: "Especial",
            descripcion: "Jamón ahumado, tocino, aceitunas, pasas y queso crema.",
            descripcionEn: "Smoked ham, bacon, olives and cream cheese.",
            precios: [
              { etiqueta: "30 cm", valor: 17.99, tono: "mint" },
              { etiqueta: "50 cm", valor: 26.99, tono: "mint" },
            ],
          },
          {
            nombre: "Hojaldre",
            descripcion: "El pan de jamón clásico en nuestra masa de hojaldre.",
            descripcionEn: "The classic ham bread in our puff pastry dough.",
            precios: [{ etiqueta: "50 cm", valor: 31.99, tono: "terracotta" }],
          },
          {
            nombre: "Veggie",
            veggie: true,
            descripcion: "Mozzarella, pimiento morrón, aceitunas y queso crema.",
            descripcionEn: "Mozzarella, bell pepper, olives and cream cheese.",
            precios: [{ etiqueta: "50 cm", valor: 27.99, tono: "teal" }],
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "postres",
    nav: "Postres",
    titulo: ["POS-", "TRES"],
    marca: "(1. m.)",
    definicion:
      "Plato reconfortante de sabor dulce servido al final de una comida. Nuestra abuelita dice que va directo al corazón y no a la barriga.",
    extras: [{ texto: "Gelato extra", valor: 1.3 }],
    grupos: [
      {
        platos: [
          {
            nombre: "Brookie",
            descripcion:
              "Mitad brownie y mitad galleta de ChocoChips; servido caliente con una porción de gelato de vainilla.",
            descripcionEn: "Half brownie and half ChocoChips cookie; served hot with a portion of vanilla gelato.",
            precios: [{ valor: 5.6 }],
          },
          {
            nombre: "Tarta de queso vasca",
            descripcion:
              "Honrando una de las recetas vascas más aclamadas, nuestra versión de la Tarta La Viña. Su textura cremosa y deliciosa no tienen comparación. Pídela sola o con topping de caramelo salado o frutos rojos.",
            descripcionEn:
              "Honoring one of the most popular Basque recipes, our version of the La Viña Cake. Order it alone or with salted caramel or red fruits topping.",
            precios: [{ valor: 5.2 }],
          },
          {
            nombre: "Pie de pecanas",
            descripcion:
              "Un clásico del sur de Estados Unidos directo a tu paladar. Te lo sugerimos caliente y con un extra de gelato.",
            descripcionEn:
              "A classic from the American South straight to your palate. We suggest it hot and with an extra gelato.",
            precios: [{ valor: 5.7 }],
          },
          {
            nombre: "Alfajor",
            descripcion:
              "El típico alfajor argentino, relleno del más exquisito manjar de leche. Disfrútalo en nuestras presentaciones: cobertura de chocolate blanco o negro.",
            descripcionEn:
              "The typical Argentine alfajor, stuffed with the most exquisite milk delicacy. White or dark chocolate coverage.",
            precios: [{ valor: 2.6 }],
          },
          {
            nombre: "Rosquitas",
            descripcion:
              "Deliciosas roscas canarias hechas con la receta de nuestra abuelita. Su glaseado de limón y su toque anisado las hace irresistibles.",
            descripcionEn:
              "Delicious Canarian rings made with our grandmother's recipe. Its lemon glaze and anised touch make them irresistible.",
            precios: [{ valor: 0.6 }],
          },
          {
            nombre: "Galleta choco chips",
            descripcion: "Rellena de chispas, trozos de chocolate semiamargo y nueces. ¡Te la recomendamos calientita!",
            descripcionEn: "Filled with sprinkles, semisweet chocolate pieces and nuts. We recommend it warm!",
            precios: [{ valor: 2.99 }],
          },
          {
            nombre: "Galleta avena y pasas",
            descripcion: "Avena, nueces y pasas; el clásico que no podía dejar de estar presente.",
            descripcionEn: "Oats, nuts and raisins; the classic that could not stop being present.",
            precios: [{ valor: 2.99 }],
          },
        ],
      },
    ],
  },
];

/** Aviso al pie de la carta impresa. Se publica literal: es información de seguridad. */
export const avisoAlergias =
  "Si sufres alergia o intolerancia a cualquier alimento, por favor comunícaselo a nuestro equipo inmediatamente.";

/** Aviso fiscal de la carta impresa. */
export const avisoIva = "Nuestros precios ya incluyen IVA.";

/* ------------------------------------------------------------------ */
/* Selecciones derivadas — se calculan de `carta`, no se duplican.      */
/* ------------------------------------------------------------------ */

function buscar(seccionId: string, nombre: string): Plato {
  const seccion = carta.find((s) => s.id === seccionId);
  const plato = seccion?.grupos.flatMap((g) => g.platos).find((p) => p.nombre === nombre);
  if (!plato) throw new Error(`Plato no encontrado en la carta: ${seccionId} / ${nombre}`);
  return plato;
}

/**
 * Los cuatro que abren el sitio. Criterio explícito, no gusto:
 * la propia carta señala la tostada de huevo pochado como «la favorita de
 * todos»; el cachito y el pan de jamón son lo que no se encuentra en otra
 * cafetería de Quito; el tigrillo es el plato ecuatoriano de la casa.
 */
export const destacados = [
  { seccion: "desayunos", plato: buscar("desayunos", "Tostada de huevo pochado") },
  { seccion: "desayunos", plato: buscar("desayunos", "Tostada de tigrillo") },
  { seccion: "cachitos", plato: buscar("cachitos", "Clásico") },
  { seccion: "pan-de-jamon", plato: buscar("pan-de-jamon", "Clásico") },
] as const;

/** Total de referencias publicadas, para el texto de la carta. */
export const totalPlatos = carta.reduce(
  (n, s) => n + s.grupos.reduce((m, g) => m + g.platos.length, 0),
  0,
);

/** Precio mínimo y máximo publicados. Alimentan el JSON-LD y el resumen. */
export const rangoCarta = (() => {
  const valores = carta.flatMap((s) => s.grupos.flatMap((g) => g.platos.flatMap((p) => p.precios.map((x) => x.valor))));
  return { min: Math.min(...valores), max: Math.max(...valores) };
})();

/** Formatea un precio en el formato de la carta: $2.60 */
export function precio(valor: number): string {
  return `$${valor.toFixed(2)}`;
}
