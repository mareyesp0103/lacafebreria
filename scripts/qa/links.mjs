import { chromium } from 'playwright';
// Resolución del navegador y del servidor: se pueden sobrescribir por entorno.
// CHROMIUM_PATH apunta al binario de Chromium; sin él se usa el que Playwright
// haya instalado. BASE_URL debe servir la exportación estática de `out/`.
const CHROMIUM = process.env.CHROMIUM_PATH;
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const launchOptions = CHROMIUM ? { executablePath: CHROMIUM } : {};


const b = await chromium.launch(launchOptions);
const ctx = await b.newContext({viewport:{width:1440,height:900}});
const seen=new Set(), queue=['/'], bad=[], ext=new Set(), assets=new Set();
while(queue.length){
  const u=queue.shift(); if(seen.has(u)) continue; seen.add(u);
  const p=await ctx.newPage();
  const res=await p.goto(BASE+u,{waitUntil:'networkidle'}).catch(e=>({status:()=>0,err:e.message}));
  if(!res || res.status()>=400){ bad.push(`${u} -> ${res?res.status():'ERR'}`); await p.close(); continue; }
  await p.evaluate(async()=>{const s=innerHeight*0.9;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}});
  // Espera a que las imágenes diferidas terminen de cargar antes de juzgarlas:
  // `naturalWidth === 0` en una imagen aún en vuelo no significa que esté rota.
  await p.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 15000 })
    .catch(() => {});
  const {links, imgs} = await p.evaluate(()=>({
    links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),
    imgs:[...document.images].map(i=>({src:i.getAttribute('src'), ok:i.naturalWidth>0, alt:i.getAttribute('alt')})),
  }));
  imgs.forEach(i=>{ assets.add(i.src); if(!i.ok) bad.push(`IMG rota en ${u}: ${i.src}`); if(i.alt===null) bad.push(`IMG sin alt en ${u}: ${i.src}`); });
  links.forEach(h=>{
    if(!h) return;
    if(h.startsWith('http')||h.startsWith('mailto:')||h.startsWith('tel:')){ ext.add(h.split('?')[0]); return; }
    if(h.startsWith('#')) return;
    const path=h.split('?')[0].split('#')[0];
    if(!seen.has(path)) queue.push(path);
  });
  await p.close();
}
console.log(`páginas visitadas: ${seen.size}`);
console.log(`imágenes distintas: ${assets.size}`);
console.log(`enlaces externos:\n  ${[...ext].join('\n  ')}`);
console.log(bad.length? `\nPROBLEMAS:\n  ${bad.join('\n  ')}` : '\nsin enlaces ni imágenes rotas');
await b.close();
