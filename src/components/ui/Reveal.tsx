"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos, para escalonar elementos de una misma retícula. */
  delay?: number;
  /** Distancia del desplazamiento de entrada, en píxeles. */
  y?: number;
  as?: "div" | "li" | "article" | "section";
}

/**
 * Aparición al entrar en viewport. Sólo anima `opacity` y `transform`,
 * que la GPU compone sin provocar reflow ni desplazamiento de layout.
 * Con movimiento reducido el contenido se muestra directamente.
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
