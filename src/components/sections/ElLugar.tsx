import { BookOpen, Coffee, Dices, Sunrise } from "lucide-react";
import { DottedRule } from "@/components/brand/Marks";

/**
 * Qué es La Cafebrería.
 *
 * Cuatro afirmaciones, todas respaldadas: los desayunos todo el día y el café
 * de especialidad constan en la carta (incluido el paquete de origen único);
 * los libros y los juegos los declara el cliente. No se afirma nada sobre el
 * origen de la marca, los años de operación ni el tostador del café: no consta.
 */
const RASGOS = [
  {
    Icon: Sunrise,
    titulo: "Desayunos a cualquier hora",
    texto:
      "La carta lo dice sin letra pequeña: breakfast all day. Tostadas de pan campesino, pancakes y huevos a las ocho de la mañana o a las cuatro de la tarde.",
  },
  {
    Icon: Coffee,
    titulo: "Café de especialidad",
    texto:
      "Espresso, V60, prensa francesa y vietnamita. El mismo café de origen único que servimos se vende en paquete, en granos o molido, para llevárselo a casa.",
  },
  {
    Icon: BookOpen,
    titulo: "Café y librería en una palabra",
    texto:
      "Cafebrería: eso es exactamente lo que hay. Libros al alcance de la mesa para quedarse leyendo mientras se enfría la segunda taza.",
  },
  {
    Icon: Dices,
    titulo: "Mesas para quedarse",
    texto:
      "Juegos sobre la mesa y sitio para conversar, trabajar o no hacer nada. El desayuno es la excusa; la permanencia es el punto.",
  },
];

export function ElLugar() {
  return (
    <section id="el-lugar" className="scroll-mt-[calc(var(--header-h)+24px)] py-20 sm:py-24">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">El lugar</p>
          <h2 className="mt-3 text-h2">
            Un desayuno, un café y una razón para no mirar el reloj
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-dim">
            La Cafebrería está en el Edificio Ases, en Catalina Aldaz y Av. Portugal.
            Se viene a desayunar y se acaba leyendo.
          </p>
        </div>

        <DottedRule className="my-10" />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RASGOS.map(({ Icon, titulo, texto }) => (
            <li key={titulo} className="card card-interactive p-6">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-espresso"
              >
                <Icon size={21} />
              </span>
              <h3 className="mt-4 text-[1.12rem] font-bold leading-snug text-espresso">{titulo}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
