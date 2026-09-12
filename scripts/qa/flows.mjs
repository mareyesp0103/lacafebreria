import { chromium } from 'playwright';

// Verificación de flujos de La Cafebrería. Los tres primeros bloques valen
// para cualquier sitio; del cuarto en adelante son propios de este.
const CHROMIUM = process.env.CHROMIUM_PATH;
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const launchOptions = CHROMIUM ? { executablePath: CHROMIUM } : {};

const b = await chromium.launch(launchOptions);
const log = [];
let fallos = 0;
const check = (ok, texto) => { if (!ok) fallos++; log.push(`${ok ? 'OK  ' : 'FALLA'} ${texto}`); };

/** Espera a que el desplazamiento suave termine antes de medir posiciones. */
const scrollQuieto = (p) => p.waitForFunction(() => new Promise((resolve) => {
  let previo = -1, quietos = 0;
  const tic = () => {
    if (Math.abs(window.scrollY - previo) < 1) { if (++quietos > 3) return resolve(true); }
    else quietos = 0;
    previo = window.scrollY;
    requestAnimationFrame(tic);
  };
  requestAnimationFrame(tic);
}), null, { timeout: 8000 });

// --- 1 · Movimiento reducido: el contenido debe verse SIN animar -----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  const visible = await p.evaluate(() => {
    const els = [...document.querySelectorAll('main li, main article, main section > div')];
    return els.length > 0 && els.every(e => +getComputedStyle(e).opacity > 0.9);
  });
  check(visible, 'movimiento reducido: todo el contenido queda visible');
  await ctx.close();
}

// --- 2 · Teclado: salto al contenido y foco visible -------------------------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  const r = await p.evaluate(() => ({
    texto: document.activeElement?.textContent?.trim(),
    grosor: parseFloat(getComputedStyle(document.activeElement).outlineWidth),
  }));
  check(/Saltar al contenido/i.test(r.texto ?? ''), `primer tab = "${r.texto}"`);
  check(r.grosor >= 2, `foco visible con ${r.grosor}px de filete`);
  await ctx.close();
}

// --- 3 · Sin desbordamiento horizontal en ningún ancho ---------------------
{
  for (const [w, h] of [[320, 700], [390, 844], [768, 1024], [1440, 900]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    for (const ruta of ['/', '/carta/']) {
      const p = await ctx.newPage();
      await p.goto(BASE + ruta, { waitUntil: 'networkidle' });
      const desborde = await p.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth);
      check(desborde <= 0, `${ruta} a ${w}px: desbordamiento horizontal = ${desborde}px`);
      await p.close();
    }
    await ctx.close();
  }
}

// --- 4 · La barra fija de móvil no tapa el final del contenido -------------
//   WCAG 2.4.11: ningún elemento fijo puede ocultar el control enfocado.
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  // El último enlace del pie, enfocado, debe quedar por encima de la barra.
  await p.evaluate(() => {
    const enlaces = [...document.querySelectorAll('footer a')];
    const ultimo = enlaces[enlaces.length - 1];
    ultimo?.focus();
    ultimo?.scrollIntoView({ block: 'end' });
  });
  await scrollQuieto(p);
  const r = await p.evaluate(() => {
    const barra = document.querySelector('nav[aria-label="Acciones rápidas"]');
    if (!barra) return { hay: false };
    const enlaces = [...document.querySelectorAll('footer a')];
    const ultimo = enlaces[enlaces.length - 1];
    return {
      hay: true,
      alto: barra.getBoundingClientRect().height,
      reserva: parseFloat(getComputedStyle(document.body).paddingBottom),
      tapado: ultimo.getBoundingClientRect().bottom > barra.getBoundingClientRect().top,
    };
  });
  check(r.hay, 'existe la barra de acciones en móvil');
  check(r.reserva >= r.alto, `el cuerpo reserva ${r.reserva}px para una barra de ${r.alto}px`);
  check(!r.tapado, 'el último enlace enfocado del pie no queda bajo la barra');
  await ctx.close();
}

// --- 5 · Objetivos táctiles de la barra: 44×44 como mínimo ----------------
{
  const ctx = await b.newContext({ viewport: { width: 320, height: 700 } });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: 'networkidle' });
  const pequenos = await p.evaluate(() => {
    const sel = 'nav[aria-label="Acciones rápidas"] a';
    return [...document.querySelectorAll(sel)]
      .map(e => ({ t: e.textContent.trim(), r: e.getBoundingClientRect() }))
      .filter(x => x.r.width < 44 || x.r.height < 44)
      .map(x => `${x.t} ${Math.round(x.r.width)}×${Math.round(x.r.height)}`);
  });
  check(pequenos.length === 0, `objetivos táctiles por debajo de 44px: ${pequenos.join(', ') || 'ninguno'}`);
  await ctx.close();
}

// --- 6 · Navegación de la carta: el ancla no queda bajo el header ----------
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(BASE + '/carta/', { waitUntil: 'networkidle' });
  await p.locator('nav[aria-label="Secciones de la carta"] a', { hasText: 'Postres' }).click();
  await scrollQuieto(p);
  const r = await p.evaluate(() => {
    const titulo = document.getElementById('postres-titulo');
    const header = document.querySelector('header');
    const chips = document.querySelector('nav[aria-label="Secciones de la carta"]');
    const tope = (header?.getBoundingClientRect().bottom ?? 0)
      + (chips?.getBoundingClientRect().height ?? 0);
    return { top: titulo?.getBoundingClientRect().top ?? -1, tope, alto: innerHeight };
  });
  check(
    r.top >= 0 && r.top < r.alto,
    `el ancla lleva el título de Postres dentro del viewport (top ${Math.round(r.top)}px de ${r.alto}px)`,
  );
  check(r.top >= r.tope - 4, `el título no queda bajo el header ni los chips (tope ${Math.round(r.tope)}px)`);
  await ctx.close();
}

// --- 7 · Los precios no se rompen en dos líneas en móvil estrecho ----------
{
  const ctx = await b.newContext({ viewport: { width: 320, height: 700 } });
  const p = await ctx.newPage();
  await p.goto(BASE + '/carta/', { waitUntil: 'networkidle' });
  const rotos = await p.evaluate(() =>
    [...document.querySelectorAll('.price, .price-chip')]
      .filter(e => e.getBoundingClientRect().height > 48)
      .map(e => e.textContent.trim()));
  check(rotos.length === 0, `precios partidos en varias líneas: ${rotos.join(', ') || 'ninguno'}`);
  await ctx.close();
}

await b.close();
console.log(log.join('\n'));
console.log(fallos ? `\n${fallos} comprobación(es) fallidas` : '\nflujos: todo correcto');
if (fallos) process.exitCode = 1;
