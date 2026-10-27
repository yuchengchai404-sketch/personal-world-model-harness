import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.dirname(here);
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.name==='.git'?[]:e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const data=JSON.parse(fs.readFileSync(path.join(here,'content.json'),'utf8'));
const generated=['dist/index.html','evidence.md',...data.cases.map(c=>'cases/'+c.id+'.md')];
const before=generated.map(p=>fs.readFileSync(path.join(here,p),'utf8'));
execFileSync(process.execPath,[path.join(here,'build.mjs')],{stdio:'pipe'});
generated.forEach((p,i)=>assert.equal(fs.readFileSync(path.join(here,p),'utf8'),before[i],'Stale generated output: '+p));
const html=fs.readFileSync(path.join(here,'dist/index.html'),'utf8');
for(const [,js] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(js);
assert(!/<(?:script|img|link|iframe)[^>]+(?:src|href)=["']https?:/i.test(html),'Remote page dependency');
assert(!/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/.test(html),'Network operation');
assert(!/INLINE_(STYLE|DATA|APP)/.test(html),'Unexpanded placeholder');
for(const c of data.cases)assert(html.includes(c.title));
const leaks=[/[A-Z]:[\\/](?:Users|Documents)[\\/]/i,/\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,})\b/,/\b(?:tunnel_|plugin_asdk_app_)[a-f0-9]{20,}/i];
for(const p of walk(here).filter(p=>/\.(?:json|md|html|css|js|mjs)$/.test(p)&&!p.endsWith('check.mjs'))){
 const text=fs.readFileSync(p,'utf8');
 for(const re of leaks)assert(!re.test(text),'Possible private identifier in '+path.relative(root,p));
}
let links=0;
for(const p of walk(root).filter(p=>p.endsWith('.md'))){
 const raw=fs.readFileSync(p,'utf8');
 const body=raw.replace(/\x60{3}[\s\S]*?\x60{3}/g,'');
 for(const m of body.matchAll(/\[[^\]]*\]\((<[^>]+>|[^)\n]+)\)/g)){
  let dest=m[1].replace(/^<|>$/g,'').split('#')[0];
  if(!dest||/^(?:[a-z]+:|\/\/)/i.test(dest))continue;
  dest=decodeURIComponent(dest);
  assert(fs.existsSync(path.resolve(path.dirname(p),dest)),'Broken link in '+path.relative(root,p)+': '+dest);
  links++;
 }
}
console.log(JSON.stringify({cases:data.cases.length,evidence:data.evidence.length,relativeLinks:links,generatedConsistency:true,inlineJavaScriptSyntax:true,noExternalDependencies:true,identifierScan:'passed'}));
