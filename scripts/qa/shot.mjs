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
    p.on('console', m => { if (m.type()==='error' && name!=='404') problems.push(`CONSOLE ${tag} ${name}: ${m.text().slice(0,160)}`); });
    await p.goto(BASE+url, {waitUntil:'domcontentloaded'});
      await p.reload({waitUntil:'networkidle'});
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
    await p.close();
  }
  await ctx.close();
}
await browser.close();
console.log(problems.length? problems.join('\n') : 'sin problemas');
