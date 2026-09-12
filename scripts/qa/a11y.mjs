import { chromium } from 'playwright';
import fs from 'fs';
import { createRequire } from 'node:module';
// Resolución del navegador y del servidor: se pueden sobrescribir por entorno.
// CHROMIUM_PATH apunta al binario de Chromium; sin él se usa el que Playwright
// haya instalado. BASE_URL debe servir la exportación estática de `out/`.
const CHROMIUM = process.env.CHROMIUM_PATH;
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const launchOptions = CHROMIUM ? { executablePath: CHROMIUM } : {};

const axe = fs.readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

// Rutas a auditar. Se pasan por entorno para que el verificador no quede
// atado a un proyecto concreto: ROUTES="/,/carta/,/no-existe/".
const urls = (process.env.ROUTES ?? '/')
  .split(',').map(r => r.trim()).filter(Boolean);

const b = await chromium.launch(launchOptions);
let total=0;
for (const [w,h,tag] of [[1440,900,'desk'],[390,844,'mob']]) {
  const ctx = await b.newContext({viewport:{width:w,height:h}});
  for (const u of urls) {
    const p = await ctx.newPage();
    await p.goto(BASE+u,{waitUntil:'domcontentloaded'});
    await p.waitForLoadState('networkidle');
    await p.evaluate(async()=>{const s=innerHeight*0.9;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);});
    await p.waitForTimeout(500);
    await p.addScriptTag({content:axe});
    const r = await p.evaluate(async()=>{
      const res = await window.axe.run(document, {runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}});
      return res.violations.map(v=>({id:v.id, impact:v.impact, n:v.nodes.length,
        help:v.help, sample:v.nodes.slice(0,2).map(n=>n.html.slice(0,140))}));
    });
    if (r.length) {
      total += r.length;
      console.log(`\n## ${tag} ${u}`);
      r.forEach(v=>{ console.log(` [${v.impact}] ${v.id} (${v.n}) — ${v.help}`); v.sample.forEach(s=>console.log(`     ${s}`)); });
    }
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(total? `\nTOTAL: ${total} tipos de violación` : 'axe: sin violaciones');
