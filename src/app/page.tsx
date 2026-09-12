import { Hero } from "@/components/sections/Hero";
import { ElLugar } from "@/components/sections/ElLugar";
import { Destacados } from "@/components/sections/Destacados";
import { Encargos } from "@/components/sections/Encargos";
import { Reputacion } from "@/components/sections/Reputacion";
import { DondeEstamos } from "@/components/sections/DondeEstamos";

/**
 * Orden de la página: el recorrido de alguien que todavía no ha decidido.
 *
 *   1. Qué es y por qué venir           → Hero
 *   2. Qué lo hace distinto             → El lugar
 *   3. Qué voy a comer y cuánto cuesta  → Destacados
 *   4. Qué puedo encargar               → Pan de jamón
 *   5. ¿Me fío?                         → Reputación
 *   6. Dónde y cómo pregunto            → Dónde estamos
 *
 * La carta completa vive en su propia ruta, indexable: es la página que la
 * gente busca por su cuenta y la que Google puede mostrar como resultado.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ElLugar />
      <Destacados />
      <Encargos />
      <Reputacion />
      <DondeEstamos />
    </>
  );
}
