import { chromium } from 'playwright';
import fs from 'fs';
// Resolución del navegador y del servidor: se pueden sobrescribir por entorno.
// CHROMIUM_PATH apunta al binario de Chromium; sin él se usa el que Playwright
// haya instalado. BASE_URL debe servir la exportación estática de `out/`.
const CHROMIUM = process.env.CHROMIUM_PATH;
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const launchOptions = CHROMIUM ? { executablePath: CHROMIUM } : {};

const OUT = process.env.SHOT_DIR ?? '.qa-shots';
fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
const pages = (process.env.ROUTES ?? '/')
  .split(',').map(r => r.trim()).filter(Boolean)
  .map(r => [r === '/' ? 'home' : r.replace(/^\/|\/$/g, '').replace(/\//g, '-'), r]);
const browser = await chromium.launch(launchOptions);
const problems=[];
for (const [w,h,tag] of [[1440,900,'desk'],[390,844,'mob']]) {
  const ctx = await browser.newContext({viewport:{width:w,height:h}, deviceScaleFactor:1});
  for (const [name,url] of pages) {
    const p = await ctx.newPage();
    p.on('pageerror', e => problems.push(`ERR ${tag} ${name}: ${e.message}`));
    // Una ruta inexistente registra en consola el 404 que se le pidió provocar:
    // no es un defecto. Se descarta por el ESTADO de la respuesta, no por el
    // nombre de la ruta, que cada proyecto escribe a su manera.
    //
    // Los mensajes se acumulan y se deciden al cerrar la página: la consola
    // habla durante la navegación, cuando todavía no se conoce el estado.
    const consola = [];
    p.on('console', m => { if (m.type()==='error') consola.push(m.text().slice(0,160)); });
    const res = await p.goto(BASE+url, {waitUntil:'networkidle'});
    const esperado404 = (res?.status() ?? 200) >= 400;
    const total = await p.evaluate(()=>document.body.scrollHeight);
    const step = Math.round(h*0.92);
    const shots = Math.min(9, Math.ceil(total/step));
    for (let i=0;i<shots;i++){
      await p.evaluate(y=>window.scrollTo(0,y), i*step);
      await p.waitForTimeout(i===0?900:750);
      await p.screenshot({path:`${OUT}/${tag}-${name}-${String(i).padStart(2,'0')}.png`});
    }
    // desbordamiento horizontal (ignora lo recortado por un ancestro con overflow oculto)
    const of = await p.evaluate(() => {
      const vw = document.documentElement.clientWidth, bad=[];
      document.querySelectorAll('body *').forEach(el => {
        const r = el.getBoundingClientRect();
        if (!(r.width>0 && (r.right>vw+1.5 || r.left<-1.5))) return;
        const cs = getComputedStyle(el);
        if (cs.position==='fixed' || cs.visibility==='hidden' || cs.opacity==='0') return;
        for (let a=el.parentElement; a; a=a.parentElement)
          if (getComputedStyle(a).overflowX !== 'visible') return;
        bad.push(`${el.tagName.toLowerCase()}.${(el.className+'').slice(0,60)} right=${Math.round(r.right)}`);
      });
      return { scrollW: document.documentElement.scrollWidth, vw, bad: bad.slice(0,5) };
    });
    if (of.scrollW > of.vw+1) problems.push(`OVERFLOW ${tag} ${name}: ${of.scrollW}>${of.vw}\n    ${of.bad.join('\n    ')}`);
    if (!esperado404) consola.forEach(t => problems.push(`CONSOLE ${tag} ${name}: ${t}`));
    await p.close();
  }
  await ctx.close();
}
await browser.close();
console.log(problems.length? problems.join('\n') : 'sin problemas');
