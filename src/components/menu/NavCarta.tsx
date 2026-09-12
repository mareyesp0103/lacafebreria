"use client";

import { useEffect, useRef, useState } from "react";
import { carta } from "@/data/menu";

/**
 * Navegación por secciones de la carta.
 *
 * Son seis secciones y sesenta referencias: no hace falta buscador ni filtros,
 * hace falta poder saltar. Los chips son enlaces de ancla reales, así que
 * funcionan sin JavaScript, se pueden abrir en otra pestaña y quedan en el
 * historial. El resaltado por desplazamiento es un añadido que sólo cambia
 * `aria-current`; si el observador no se activa, el componente sigue sirviendo.
 *
 * El chip activo se centra en su carril horizontal, que en móvil es lo que
 * evita que la sección en la que estás quede fuera de pantalla.
 */
export function NavCarta() {
  const [activa, setActiva] = useState<string>(carta[0].id);
  const carril = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const secciones = carta
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);
    if (secciones.length === 0) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiva(visible.target.id);
      },
      // La banda superior de lectura: una sección cuenta como actual cuando
      // su comienzo ha pasado el header y aún no ha salido por arriba.
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pista = carril.current;
    const chip = pista?.querySelector<HTMLElement>(`[data-id="${activa}"]`);
    if (!pista || !chip) return;

    // Se desplaza EL CARRIL, no el elemento. `chip.scrollIntoView()` sube por
    // todos los contenedores con desplazamiento hasta el documento, y en
    // Chromium eso cancela el desplazamiento suave que acaba de iniciar el
    // clic en el ancla: se pulsaba «Postres» y la página se quedaba donde
    // estaba. Moviendo sólo la pista horizontal, el salto de la página llega.
    const destino = chip.offsetLeft - (pista.clientWidth - chip.offsetWidth) / 2;
    pista.scrollTo({
      left: Math.max(0, destino),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [activa]);

  return (
    <div
      className="sticky border-b border-line bg-paper/95 backdrop-blur-sm"
      style={{ top: "var(--header-h)", zIndex: "calc(var(--z-header) - 1)" }}
    >
      <nav aria-label="Secciones de la carta" className="shell">
        <ul
          ref={carril}
          className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {carta.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-id={s.id}
                className="section-chip"
                {...(activa === s.id ? { "aria-current": "true" as const } : {})}
              >
                {s.nav}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
