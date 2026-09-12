#!/usr/bin/env python3
"""Regenera los recortes ampliados con los que se verificó la carta.

POR QUÉ EXISTE
El PDF entregado por el cliente no tiene capa de texto: son cuatro imágenes
planas. Ningún precio se puede citar de un volcado de texto, así que los 61
que hay en `src/data/menu.ts` se leyeron de recortes ampliados al 200 %.

Este script reproduce esos recortes desde las páginas archivadas en
`fuente/carta-2026/`, para que la verificación sea repetible por cualquiera y
no dependa de un directorio de trabajo que ya no existe.

    python3 scripts/verificar-carta.py            # a build/verificacion/
    python3 scripts/verificar-carta.py --zoom 3   # más aumento

Requiere pillow.
"""
import argparse
import pathlib
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Falta pillow:  pip install pillow")

RAIZ = pathlib.Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "fuente/carta-2026"

# Bloques por página, en fracciones del ancho y alto. Cada uno cubre una
# columna de precios completa; juntos abarcan las 61 referencias.
BLOQUES = {
    "01-cachitos":   (1, 0.35, 0.18, 1.00, 0.53),
    "01-pan-jamon":  (1, 0.35, 0.55, 1.00, 0.98),
    "02-cafe-notas": (2, 0.05, 0.15, 0.40, 0.52),
    "02-caliente":   (2, 0.38, 0.01, 1.00, 0.36),
    "02-frio":       (2, 0.38, 0.36, 1.00, 0.54),
    "02-bebidas":    (2, 0.38, 0.55, 1.00, 1.00),
    "03-desayunos":  (3, 0.10, 0.18, 1.00, 0.45),
    "03-picar":      (3, 0.10, 0.45, 1.00, 1.00),
    "04-postres-a":  (4, 0.40, 0.03, 1.00, 0.40),
    "04-postres-b":  (4, 0.40, 0.40, 1.00, 1.00),
}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--out", default=str(RAIZ / "build/verificacion"))
    ap.add_argument("--zoom", type=int, default=2, help="factor de ampliación (2 por defecto)")
    args = ap.parse_args()

    destino = pathlib.Path(args.out)
    destino.mkdir(parents=True, exist_ok=True)

    faltan = [p for p in range(1, 5) if not (FUENTE / f"pagina-{p}.jpg").exists()]
    if faltan:
        return print(f"Faltan páginas en {FUENTE}: {faltan}") or 1

    for nombre, (pagina, x0, y0, x1, y1) in BLOQUES.items():
        im = Image.open(FUENTE / f"pagina-{pagina}.jpg")
        w, h = im.size
        recorte = im.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))
        recorte = recorte.resize(
            (recorte.width * args.zoom, recorte.height * args.zoom), Image.LANCZOS
        )
        salida = destino / f"{nombre}.png"
        recorte.save(salida)
        print(f"{nombre:16s} página {pagina}  ->  {salida.name}  {recorte.size[0]}×{recorte.size[1]}")

    print(f"\n{len(BLOQUES)} recortes en {destino}")
    print("Comparar cada precio contra src/data/menu.ts antes de publicar un cambio.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
