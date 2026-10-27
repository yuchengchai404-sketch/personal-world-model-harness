import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const here = path.dirname(fileURLToPath(import.meta.url));
const read = p => fs.readFileSync(path.join(here,p),'utf8');
const data = JSON.parse(read('content.json'));
const ids = new Set(data.cases.map(c=>c.id));
const evidence = new Set(data.evidence.map(e=>e.id));
assert.equal(ids.size, data.cases.length);
assert.equal(evidence.size, data.evidence.length);
for (const c of data.cases) {
  assert(c.sections.length >= 3 && c.lead && c.result && c.lesson);
  for (const id of c.evidence) assert(evidence.has(id), 'Missing evidence '+id);
}
const css=read('style.css');
const js=read('app.js');
const json=JSON.stringify(data).replace(/</g,'\\u003c');
const html=read('shell.html').replace('/* INLINE_STYLE */',()=>css)
.replace('/* INLINE_DATA */',()=>'const DATA = '+json+';')
.replace('/* INLINE_APP */',()=>js);
fs.mkdirSync(path.join(here,'dist'),{recursive:true});
fs.writeFileSync(path.join(here,'dist/index.html'),html);
const dir=path.join(here,'cases');
fs.mkdirSync(dir,{recursive:true});
for (const c of data.cases) {
 const sections=c.sections.map(([h,p])=>'## '+h+'\n\n'+p+'\n').join('\n');
 const refs=c.evidence.map(id=>'['+id+'](../evidence.md#'+id.toLowerCase()+')').join(' · ');
 const text='# '+c.title+'\n\n'+c.tag+' · '+c.period+'\n\n'+
 '依据真实记录公开重构；不是原始对话逐字稿。\n\n'+c.lead+'\n\n'+
 '## 这次要解决什么\n\n'+c.question+'\n\n'+
 '## 原来的卡点\n\n'+c.before+'\n\n'+sections+
 '\n## 发生了什么变化\n\n'+c.after+'\n\n'+
 '## 结果与未完成的证明\n\n'+c.result+'\n\n'+
 '## 值得带走的经验\n\n'+c.lesson+'\n\n'+
 '依据身份：'+refs+'。原件保存在私有工作区，未随作品公开。\n\n[返回作品导览](../README.md)\n';
 fs.writeFileSync(path.join(dir,c.id+'.md'),text);
}
const intro='# 实践依据与公开重构\n\n本作品把真实运行经验整理为可公开阅读的案例。维护者回查了下列原始讨论资产、制作记录、试稿和外部报告；它们并非全部公开附件。\n\n'+
'这些是项目作者的可追溯案例陈述，不是读者可独立下载原始数据复算的研究论文。外部评审同样属于 AI 评审，不是第三方人类认证。未公开私人对话、个人经历细节、账号连接及第三方全文。\n\n'+
'案例中的前后概括是公开重构，不冒充原文。展厅的学习/表达互动为合成演示，不是私有产品截图或新效果实验。原版本日期、检查日期和本作品整理日期分别标注。\n\n';
const body=data.evidence.map(e=>'## '+e.id+'\n\n**'+e.title+'** · '+e.period+'\n\n材料：'+e.kind+'。\n\n支持范围：'+e.support+'。\n').join('\n');
fs.writeFileSync(path.join(here,'evidence.md'),intro+body+'\n[返回作品导览](README.md)\n');
console.log(JSON.stringify({cases:data.cases.length,evidence:data.evidence.length,htmlBytes:Buffer.byteLength(html),generated:'dist/index.html and case reading files'}));
