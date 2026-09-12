#!/usr/bin/env python3
"""Verifica la integridad del catálogo de medios.

- Toda variante declarada en `src/data/media.json` existe en `public/media`.
- Todo slug de imagen referenciado por el código existe en el manifiesto.
- Todo archivo del directorio de marca referenciado por el código existe.
"""
import json, re, pathlib, sys

root = pathlib.Path(__file__).resolve().parent.parent
manifest = json.loads((root / "src/data/media.json").read_text())
media_dir = root / "public/media"

missing = [v["file"] for e in manifest.values() for v in e["sizes"]
           if not (media_dir / v["file"]).exists()]

refs: set[str] = set()
for f in list((root / "src").rglob("*.ts")) + list((root / "src").rglob("*.tsx")):
    if f.name == "media.json":
        continue
    t = f.read_text()
    refs.update(re.findall(r'\bhero:\s*"([a-z0-9-]+)"', t))
    refs.update(re.findall(r'\bimage=["\{]"?([a-z0-9-]+)"', t))
    refs.update(re.findall(r'\bslug=\{?"([a-z0-9-]+)"', t))
    for m in re.finditer(r"\bgallery:\s*\[([^\]]*)\]", t, re.S):
        refs.update(re.findall(r'"([a-z0-9-]+)"', m.group(1)))
    for m in re.finditer(r'\bslug:\s*"([a-z0-9-]+)",\s*label:', t):
        refs.add(m.group(1))

unknown = sorted(r for r in refs if r not in manifest)
orphans = sorted(k for k in manifest if k not in refs)

# Assets de marca escritos a mano con asset("/brand/…"): comprobar que existen.
brand_refs: set[str] = set()
for f in list((root / "src").rglob("*.ts")) + list((root / "src").rglob("*.tsx")):
    brand_refs.update(re.findall(r'asset\(\s*"(/brand/[^"]+)"', f.read_text()))
missing_brand = sorted(b for b in brand_refs if not (root / "public" / b.lstrip("/")).exists())

print(f"variantes en manifiesto : {sum(len(e['sizes']) for e in manifest.values())}")
print(f"faltantes en disco      : {missing or 'ninguna'}")
print(f"slugs referenciados     : {len(refs)}")
print(f"slugs desconocidos      : {unknown or 'ninguno'}")
print(f"assets de marca         : {len(brand_refs)} · faltantes: {missing_brand or 'ninguno'}")
print(f"slugs sin usar          : {orphans or 'ninguno'}")
sys.exit(1 if (missing or unknown or missing_brand) else 0)
