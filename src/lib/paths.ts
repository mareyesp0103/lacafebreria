/**
 * Prefijo de ruta del despliegue.
 *
 * En un dominio propio el sitio vive en la raíz y esto queda vacío. En una
 * vista previa servida bajo un subdirectorio (por ejemplo GitHub Pages, en
 * `/websites/`), `NEXT_PUBLIC_BASE_PATH` lleva ese prefijo.
 *
 * Next añade el prefijo automáticamente a `<Link>` y a las rutas, pero no a
 * los `src` de un `<img>` escrito a mano: para esos hay que usar `asset()`.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Antepone el prefijo de despliegue a una ruta absoluta de `public/`. */
export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
