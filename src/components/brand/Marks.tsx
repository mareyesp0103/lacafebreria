/**
 * Signos gráficos de la carta, redibujados como SVG.
 *
 * No son adornos inventados: los tres existen en el impreso y hacen un trabajo
 * concreto. La rama marca lo vegetariano, la mancha es el contenedor del
 * logotipo reutilizado como fondo, y el filete punteado separa las secciones.
 * Son formas genéricas —una rama, una mancha—, no el logotipo: redibujarlas es
 * legítimo; calcar la caligrafía de la marca no lo sería.
 */

/** Rama de dos hojas. En la carta señala los platos vegetarianos. */
export function LeafMark({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Tallo y dos hojas abiertas. A 15–17 px las formas cerradas del trazado
          anterior se empastaban y el signo se leía como un garabato; con dos
          hojas simétricas y separadas se reconoce al tamaño al que se usa. */}
      <path d="M12 21V9" />
      <path d="M12 12.5C12 8.9 9.4 6.2 5.5 5.5 4.8 9.4 7.2 12.5 12 12.5Z" />
      <path d="M12 10C12 6.4 14.6 3.7 18.5 3 19.2 6.9 16.8 10 12 10Z" />
    </svg>
  );
}

/**
 * La mancha orgánica que contiene el logotipo, como forma suelta.
 * Trazada del contorno real del blob; sirve de fondo para números y viñetas.
 */
export function BlobMark({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        fill="currentColor"
        d="M52.4 2.1c12.9-.6 24.6 5.2 33.1 14.6 8.9 9.8 13.4 22.7 12.2 35.6-1.1 12.4-7.6 23.9-17.4 31.6-9.5 7.4-21.7 11-33.6 9.8-12.6-1.3-24.6-7.9-32.3-18C7.1 65.8 3.5 52.6 5.8 40.3 8 28.4 15.4 17.8 25.6 10.6 33.6 4.9 42.6 2.5 52.4 2.1Z"
      />
    </svg>
  );
}

/** Filete punteado: el separador de secciones de la carta. */
export function DottedRule({ className = "" }: { className?: string }) {
  return <div className={`dotted-rule ${className}`} role="presentation" />;
}

/**
 * Vapor sobre una taza. Tres hilos con retardos distintos.
 * Decorativo y respetuoso con `prefers-reduced-motion`, que anula la animación
 * en `globals.css`.
 */
export function SteamMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 34"
      width="40"
      height="34"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {[
        { x: 12, delay: "0s" },
        { x: 20, delay: "0.6s" },
        { x: 28, delay: "1.2s" },
      ].map((s) => (
        <path
          key={s.x}
          d={`M${s.x} 26 C${s.x - 3} 21, ${s.x + 3} 17, ${s.x} 11`}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{
            animation: "steam-rise 3.2s ease-in-out infinite",
            animationDelay: s.delay,
            opacity: 0,
          }}
        />
      ))}
    </svg>
  );
}
