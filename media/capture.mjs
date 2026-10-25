// npm install playwright; npx playwright install chromium; node capture.mjs
// Optional PLAYWRIGHT_EXECUTABLE_PATH selects an existing Chromium installation.
import { chromium } from 'playwright';
import { mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
const out = process.env.OUTPUT_DIR || path.dirname(new URL(import.meta.url).pathname);
await mkdir(out, { recursive: true });
const url='https://reasoncommons.com/explainers/01-bottleneck/index.html';
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH} : {})});
const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,recordVideo:{dir:path.join(out,'raw'),size:{width:1440,height:900}}});
const page=await context.newPage();
const started=Date.now();
await page.goto(url,{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.waitForTimeout(500);
const trimStart=(Date.now()-started)/1000;
await page.screenshot({path:path.join(out,'screenshot.png')});
const stops=await page.evaluate(()=>{
 const triggers=[...document.querySelectorAll('.scroll-item')].slice(0,2).map(section=>[...section.querySelectorAll('.trigger')].map(e=>Math.round(e.getBoundingClientRect().top+scrollY+270)));
 const flows=[...document.querySelectorAll('section.flow')].slice(0,2).map(e=>Math.round(e.getBoundingClientRect().top+scrollY-90));
 const end=document.querySelector('section.statement');
 return [0,...triggers[0].slice(1),...flows,...triggers[1],Math.round(end.getBoundingClientRect().top+scrollY)];
});
await page.waitForTimeout(3000);
for (let i=1;i<stops.length;i++){
 await page.evaluate(async target=>{
  const from=scrollY,start=performance.now(),duration=900;
  await new Promise(resolve=>{function tick(now){const p=Math.min(1,(now-start)/duration);const ease=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;scrollTo(0,from+(target-from)*ease);if(p<1)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
 },stops[i]);
 await page.waitForTimeout(i===stops.length-1 ? 3200 : 1900);
 if(i===stops.length-3)await page.screenshot({path:path.join(out,'stations.png')});
}
const video=page.video();
await context.close();
const videoPath=await video.path();
await browser.close();
await rename(videoPath,path.join(out,'raw.webm'));
await writeFile(path.join(out,'metadata.json'),JSON.stringify({url,title:'The Wrong Queue',credit:'Reason Commons / Life Itself',captured:new Date().toISOString(),viewport:{width:1440,height:900},trimStart,stops,description:'A real scrolling excerpt: the clinic introduction and the five-station bottleneck reveal. Silent; no page content altered.'},null,2));
console.log(JSON.stringify({trimStart,stops}));
