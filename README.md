# La Cafebrería UIO — sitio web

Sitio de **La Cafebrería UIO**, cafetería de desayunos, brunch y café de
especialidad en Quito (Catalina Aldaz N34-77 y Av. Portugal, Edificio Ases).

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion.
Se compila a HTML estático (`output: "export"`), así que se despliega en
cualquier hosting de archivos sin runtime de Node.

```bash
npm install
npm run dev          # desarrollo en http://localhost:3000
npm run build        # exportación estática en out/
npm run serve        # sirve out/ en http://localhost:4321
```

---

## Qué se publica y qué no

**Todo el contenido proviene de la carta oficial** (*Menú La Cafebrería 2026*)
y de los datos que facilitó el cliente. No se inventaron horarios,
promociones, delivery, reservas, testimonios, reconocimientos ni el origen de
la marca.

El PDF de la carta **no tiene capa de texto**: son cuatro imágenes planas de
1022×1754. No hay ninguna cifra que se pueda citar de un volcado de texto, así
que las 61 referencias se leyeron de recortes ampliados al 200–300 % y se
contrastaron dos veces contra el original.

Las cuatro páginas de la carta quedan archivadas en `fuente/carta-2026/` y los
recortes de verificación se regeneran con `npm run qa:carta`, para que
cualquiera pueda repetir la comprobación sin el PDF original.

Del texto descriptivo sólo se corrigió ortografía inequívoca —`provarás`,
`increibles`, `clasico`, `sóla`, `esta disponible`—. **Ningún nombre de
producto se tocó**: `Capuccino`, `Mocaccino`, `Afogatto`, `Ricota`, `Capressa`
e `Iced Mocca` son los nombres del establecimiento, no erratas.

### Lo que falta y quién lo tiene que dar

| Dato | Estado | Dónde se activa |
|---|---|---|
| **Horario de atención** | No entregado | `horario` en `src/data/site.ts`: poner `confirmado: true` y rellenar `dias`. El bloque «Antes de venir» y el `openingHours` del JSON-LD aparecen solos |
| **Fotografías** | No hay ninguna | Ver «Cuando lleguen las fotos» |
| **Logotipo vectorial** | Sólo ráster de 236×231 px | Ver `src/components/brand/Logo.tsx` |
| **Ficha de Google / coordenadas** | No entregada | `contacto.mapsUrl` en `site.ts`; al tenerla, añadir `geo` en `src/lib/schema.ts` |
| **Dominio** | No contratado | `site.url` en `site.ts` |

Los datos que cambian solos —puntuación, número de reseñas, rango de consumo—
se publican **con su fecha** y llevan `confirmado`. Si se pone en `false`, la
interfaz muestra «Información sujeta a actualización» en lugar del dato.

---

## Dónde se toca cada cosa

**El contenido no vive en los componentes.** Para actualizar el sitio se edita
un archivo de datos, no una vista.

| Archivo | Qué contiene |
|---|---|
| `src/data/site.ts` | Nombre, dirección, teléfono, WhatsApp, redes, horario, reputación, rango de consumo, mensajes prellenados |
| `src/data/menu.ts` | Las 61 referencias de la carta con precio, descripción, tamaños y tono de pastilla |
| `src/lib/schema.ts` | JSON-LD `CafeOrCoffeeShop` + `Menu`, generado de los dos anteriores |
| `src/app/globals.css` | Tokens de color, tipografía, componentes base |

**Cambiar un precio**: `src/data/menu.ts`, y subir `DATOS_ACTUALIZADOS` en
`site.ts`. El precio se propaga a la carta, al resumen, al rango publicado y al
JSON-LD sin tocar nada más.

**Cambiar el teléfono**: `contacto` en `site.ts`. Aparece en el pie, en
«Antes de venir», en la barra móvil y en los datos estructurados desde ahí.

---

## Sistema visual

Los colores están **medidos del material del cliente**, no elegidos:

| Token | Hex | De dónde sale |
|---|---|---|
| `espresso` | `#57351A` | Mancha del logotipo — 36.436 px de relleno plano |
| `ámbar` | `#E5A93D` | Pastilla de precio «30 cm» |
| `terracota` | `#C16826` | Pastilla «hojaldre» y «pancakes» |
| `teal` | `#5EA3A4` | Pastilla «veggie» |
| `menta` | `#B5D5C6` | Pastilla «especial» |
| `oro` | `#CA9F3E` | La «C» del logotipo |

Cada acento tiene **dos tokens**: identidad (fondos, bordes, display) y relleno
o texto (con contraste verificado). Ningún color de marca aprueba 4.5:1 con
texto blanco encima: el ámbar da 2.08:1, así que el precio va en espresso sobre
ámbar (5.22:1), como en el impreso.

Las variantes de texto se derivaron **contra el fondo real** (`#F7F2EA` y
`#F1E9DD`), no contra blanco. Medido contra blanco, el ámbar daba 4.50 y sobre
el papel crema se quedaba en 4.04.

**Tipografía**: Bitter (slab serif) para titulares y precios de display, Karla
(grotesca humanista) para navegación, descripciones y datos. Se evitó Playfair
Display a propósito: es el ajuste por defecto de toda plantilla de restaurante
y el impreso no usa una didone, usa un slab pesado.

---

## Verificación

```bash
npm run build && npm run serve       # en otra terminal
export BASE_URL=http://localhost:4321
export ROUTES="/,/carta/,/no-existe/"
export CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome  # si aplica
npm run qa:a11y && npm run qa:links && npm run qa:flows && npm run qa:media
npm run qa:carta                      # recortes para cotejar precios a mano
```

Estado en la última ejecución: **axe sin violaciones** (escritorio y móvil, tres
rutas), sin enlaces ni imágenes rotas, y las 18 comprobaciones de flujo en verde
—movimiento reducido, salto al contenido, foco visible, cero desbordamiento
horizontal a 320/390/768/1440, la barra fija no tapa el control enfocado,
objetivos táctiles ≥44 px, el ancla de la carta aterriza bajo la cabecera y
ningún precio se parte en dos líneas—.

---

## Cuando lleguen las fotos

El sitio está construido **sin fotografía a propósito**: el material del cliente
no trae ninguna y poner banco de imágenes sería inventar el local. El peso
visual lo llevan el display, el logotipo y fichas con platos reales.

La tubería de imágenes ya está montada y espera:

```bash
python3 ../../.claude/skills/brand-asset-extraction/scripts/responsive_images.py \
    fotos/ --out public/media --manifest src/data/media.json --map nombres.json
```

Eso genera tres anchos en WebP y el manifiesto con las dimensiones reales, para
reservar espacio y mantener CLS en cero. `src/components/ui/Media.tsx` las
resuelve por slug. No hace falta rediseñar nada: las fotos entran en los huecos
que ya existen.

---

## Despliegue

Sin variables de entorno el sitio compila para la raíz de un dominio, con
`robots.txt` e `index, follow` normales. Con `NEXT_PUBLIC_BASE_PATH` se sirve
bajo subdirectorio y se bloquea la indexación, para vistas previas.

### Vista previa en GitHub Pages

`.github/workflows/preview.yml` publica el sitio en cada push a `main`. Hay que
activarlo **una sola vez** en el repositorio:

**Settings → Pages → Build and deployment → Source: «GitHub Actions»**

La vista previa queda en `https://<usuario>.github.io/lacafebreria/`. Como se
sirve bajo subdirectorio, el build usa `NEXT_PUBLIC_BASE_PATH` para prefijar
rutas y assets, y publica con `noindex` para no competir con el dominio
definitivo ni exponer contenido aún sin validar por el cliente.

### Producción

En el dominio final no hace falta ninguna variable: sin `NEXT_PUBLIC_BASE_PATH`
el sitio se compila para servirse en la raíz, con `robots.txt` e `index, follow`
normales. La exportación de `out/` sirve en Vercel, Netlify o cualquier hosting
estático. Antes de publicar en producción, poner el dominio real en `site.url`
de `src/data/site.ts`: de ahí salen las canónicas, el sitemap y el JSON-LD.
