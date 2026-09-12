# La Cafebrería UIO — reglas del proyecto

Contexto para cualquiera que retome este sitio. Lo genérico está en
`docs/REUSABLE_LEARNINGS.md` del repositorio; aquí sólo lo que es de este
cliente.

## Regla que manda sobre todas

**No se publica nada que no conste en el material del cliente.** La carta 2026
y la ficha de datos son la única fuente. Si algo no está ahí, no se rellena: se
marca `confirmado: false` en `src/data/site.ts` y la interfaz muestra
«Información sujeta a actualización».

Esto no es celo burocrático. Es una cafetería: un horario inventado manda a
alguien a una puerta cerrada y quema la visita que el sitio existe para
producir.

Concretamente, **no existen y no se mencionan**: horario, delivery, reservas,
pedido en línea, promociones, testimonios, premios, año de fundación, origen
del café más allá de «origen único», ni plazo de anticipación del pan de jamón.

## La carta es un ráster

El PDF entregado no tiene capa de texto: cuatro imágenes planas de 1022×1754,
sin vectores. No se puede citar ninguna cifra de un `text.txt` porque no lo
hay. Las 61 referencias se leyeron de recortes ampliados y se contrastaron dos
veces contra el original.

**Si el cliente entrega una carta nueva, repetir ese proceso**, no editar
precios sueltos de memoria:

```bash
python3 .claude/skills/brand-asset-extraction/scripts/pdf_extract.py carta.pdf --out build/source
# y recortes ampliados por bloque antes de tocar src/data/menu.ts
```

## Nombres de producto: intocables

`Capuccino`, `Mocaccino`, `Afogatto`, `Ricota`, `Capressa`, `Iced Mocca`,
`Iced american coffee` se escriben como en la carta. Son los nombres del
establecimiento. Corregirlos «bien» rompe la correspondencia con lo que pide
el cliente en la barra.

Sí se corrigió ortografía del texto **descriptivo** (`provarás`, `increibles`,
`clasico`, `sóla`, `esta disponible`): eso es texto de venta, no un nombre.

## El logotipo no se calca

Sólo existe el ráster de 236×231 px incrustado en la carta, aislado en
`public/brand/logo-cafebreria.png`. **No vectorizar a ojo.** A esa resolución
los trazos de la caligrafía miden tres píxeles; cualquier calco sería un dibujo
parecido, y un logotipo es identidad legal. Se muestra a 118 px como máximo,
donde el ráster aguanta en pantallas 2×.

Para usarlo más grande hace falta el vector original del cliente. Hasta
entonces, el display tipográfico lleva el peso de la marca.

Las formas genéricas del impreso —la rama veggie, la mancha, el filete
punteado— sí están redibujadas en `src/components/brand/Marks.tsx`. Redibujar
una rama es legítimo; redibujar la caligrafía de la marca no.

## El color se mide, no se elige

Todos los tokens salen de muestrear el material. Antes de añadir cualquier
color nuevo:

```bash
python3 .claude/skills/brand-asset-extraction/scripts/contrast.py --find-fill "#nuevo"
```

Y verificarlo **contra el fondo real** (`#F7F2EA` papel, `#F1E9DD` papel-2), no
contra blanco. Esa fue la causa de la primera tanda de violaciones de axe: el
ámbar de texto se derivó contra blanco (4.50) y sobre el papel crema daba 4.04.

Regla que se repite en cada acento: **el color de marca no aprueba AA como
relleno con texto blanco encima**. Ámbar da 2.08:1. Por eso el precio va en
espresso sobre ámbar, como en el impreso.

## Sin fotografía, a propósito

No hay ninguna imagen del local, los platos o el equipo. **No poner banco de
imágenes**: sería inventar el sitio. El diseño es editorial y tipográfico
justamente por eso, y esa decisión es además lo que lo diferencia de la
plantilla de restaurante con foto de latte genérico.

La tubería de `responsive_images.py` y `ui/Media.tsx` está montada y espera. Al
llegar las fotos entran en huecos que ya existen, sin rediseñar.

## Conversión

La acción de mayor valor es el **pan de jamón por encargo** ($4.70 a $31.99
frente a $2.60 de un cachito), y la carta misma pide gestionarlo por teléfono:
«AGENDA TÚ PAN DE JAMÓN». Por eso tiene bloque propio y mensaje de WhatsApp
propio.

Los mensajes prellenados viven en `whatsappMensajes` de `site.ts`, uno por
contexto. Un enlace desnudo a wa.me abre una conversación en blanco y obliga a
redactar; prellenar el motivo baja la fricción y al local le llega una consulta
que ya dice a qué viene.

## Antes de entregar

```bash
npm run build && npm run serve
BASE_URL=http://localhost:4321 ROUTES="/,/carta/,/no-existe/" \
  npm run qa:a11y && npm run qa:links && npm run qa:flows && npm run qa:media
```

Cero violaciones de axe es el criterio de parada, y **nunca se consigue
silenciando la herramienta**: nada de `aria-hidden` sobre contenido real, ni
quitar indicadores de foco, ni desactivar reglas. Un informe en verde obtenido
así es peor que el informe en rojo.
