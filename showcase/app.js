const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selected=DATA.cases[0].id;
function showCase(id,focus=false){
 const c=DATA.cases.find(c=>c.id===id); if(!c)return; selected=id;
 $('case-detail').innerHTML='<p class="eyebrow">'+esc(c.tag)+' / '+esc(c.period)+'</p><h2>'+esc(c.title)+'</h2><p class="lead">'+esc(c.lead)+'</p><p class="tiny">真实记录的公开重构 · 非逐字对话</p><div class="turning"><p class="tiny">原来的卡点</p><p>'+esc(c.before)+'</p></div>'+
 c.sections.map(([h,p])=>'<section class="case-step" style="padding:0;border:0"><h3>'+esc(h)+'</h3><p>'+esc(p)+'</p></section>').join('')+
 '<div class="turning"><p class="tiny">发生了什么变化</p><p>'+esc(c.after)+'</p></div><div class="result"><strong>这次能说明什么</strong><p style="margin:10px 0 0">'+esc(c.result)+'</p></div><div class="case-step"><h3>值得带走的经验</h3><p>'+esc(c.lesson)+'</p></div><p class="source-note">依据身份：'+c.evidence.map(e=>'<a href="#'+e+'">'+e+'</a>').join('')+' · 原件不随作品公开。</p>';
 for(const b of document.querySelectorAll('.case-btn'))b.setAttribute('aria-pressed',b.dataset.id===id);
 if(focus){$('case-detail').focus({preventScroll:true});$('case-detail').scrollIntoView({block:'start',behavior:'auto'});}
}
function listCases(){
 const q=$('search').value.trim().toLowerCase();
 const found=DATA.cases.filter(c=>JSON.stringify(c).toLowerCase().includes(q));
 $('case-list').innerHTML=found.map(c=>'<button type="button" class="case-btn" data-id="'+c.id+'" aria-pressed="'+(c.id===selected)+'"><i class="case-num">'+c.id.slice(0,2)+'</i><span><small>'+esc(c.tag)+'</small>'+esc(c.title)+'</span></button>').join('');
 $('search-status').textContent=found.length?found.length+' 段实践'+(q?'符合查询':'，按兴趣阅读'):'没有找到。试试“回顾”“表达”或“研究”。';
 for(const b of document.querySelectorAll('.case-btn'))b.addEventListener('click',()=>showCase(b.dataset.id,true));
}
$('search').addEventListener('input',listCases); listCases(); showCase(selected);
$('evidence-list').innerHTML=DATA.evidence.map(e=>'<details id="'+e.id+'"><summary>'+e.id+' / '+esc(e.title)+'</summary><p>'+esc(e.kind)+' · '+esc(e.period)+'</p><p>'+esc(e.support)+'</p></details>').join('');
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#E"]');if(a){const el=document.querySelector(a.getAttribute('href'));if(el)el.open=true;}});
const demos=[
{id:'resource',title:'资源要赶得上机会',question:'为什么增援更多，事情反而未必更容易？',summary:'资源配置应计入原方向机会成本、转移摩擦、时滞与到位时有效性。',
paragraphs:['假设一个小组负责维护已有服务，另一个小组准备上线新功能。新功能看起来更重要，于是想把维护人员全部调过去。','但新人需要熟悉工作，交接也要时间。旧服务若因此出问题，新功能还会失去原来的基础。','所以，不只比较“人给了谁”，还要比较：人到位后能做什么，机会是否还在，以及原来的地方失去什么。'],
expression:'把资源送到更重要的地方，还要赶得上它有用的时候。',source:'公开合成团队情境，用来演示实际案例02的资源调配区别。不是用户真实项目，表达为展示稿，不登记为用户批准。'},
{id:'context',title:'取回与重建的区别',question:'是少了一份资料，还是任务的前提变了？',summary:'RETRIEVE补入相关信息；REBUILD依据新前提重组工作上下文，并保留仍有效的成果。',
paragraphs:['你正在比较两种旅行路线，忘了其中一条的交通时间。找回那份资料，就能继续比较：这是取回。','后来同行者不能长距离步行。原来以徒步景点为中心的安排不再合适。你需要重新组织路线，而不只是多找一张地图：这是重建。','重建不等于把一切清空。已经核对的开放时间、预算和交通信息，仍可能有用。'],
expression:'缺一份材料，先找回来；前提变了，就重新摆好桌上的东西。',source:'旅行情境为本作品合成示例，解释记录中已修复的Context阅读问题；不是产品能力声明，也不是完整课程。'},
{id:'learning',title:'学习不是同一种收获',question:'一本书、一项工具和一次体验，要留下同一种成果吗？',summary:'学习投入应由目的、缺口、迁移留存与反馈方式共同组织，避免单一职业产出标准。',
paragraphs:['你读一本小说，可能是为了更细地感受别人的生活；学一个工具，是为了把自己的想法做出来；研究一个行业，则是为了看懂变化。','如果都用“能否立即增加收入”验收，前一种价值会先消失。如果都只问“有没有兴趣”，实际资格或交付要求又可能被忽略。','先弄清这次为什么学，再判断应该留下什么。不同收获可以互相补充，不必排列成同一种等级。'],
expression:'不是每一次学习，都要交出同一种答案。',source:'依据案例01的方法方向合成，不引用个人背景。展示稿不是已验证模型，也不替用户规定学习目的。'}
];
let topic=0,mode='review';
const modes=[['system','系统摘要'],['review','人的回顾'],['expression','可复述表达']];
function drawDemo(){
 const d=demos[topic];
 $('topic-buttons').innerHTML=demos.map((x,i)=>'<button type="button" data-topic="'+i+'" aria-pressed="'+(i===topic)+'">'+esc(x.title)+'</button>').join('');
 $('mode-buttons').innerHTML=modes.map(([k,n])=>'<button type="button" data-mode="'+k+'" aria-pressed="'+(k===mode)+'">'+n+'</button>').join('');
 $('demo-content').innerHTML=mode==='system'?'<p class="eyebrow">FOR CONTINUITY</p><h3>给下一次系统取用</h3><p>'+esc(d.summary)+'</p><p class="tiny">它便于识别判断，但不一定能让忘掉背景的人重新理解。</p>':mode==='review'?'<p class="eyebrow">FOR UNDERSTANDING</p><h3>'+esc(d.question)+'</h3>'+d.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join(''):'<p class="eyebrow">FOR REMEMBERING & SHARING</p><h3>理解之后，留下能讲出来的话</h3><blockquote id="expression-text">'+esc(d.expression)+'</blockquote><p class="tiny">合成展示稿。完整推理留在“人的回顾”，表达不代替论证。</p>';
 $('source-detail').textContent=d.source;
 $('copy').hidden=mode!=='expression';
 $('copy-status').textContent='';
 for(const b of document.querySelectorAll('[data-topic]'))b.onclick=()=>{topic=Number(b.dataset.topic);drawDemo();};
 for(const b of document.querySelectorAll('[data-mode]'))b.onclick=()=>{mode=b.dataset.mode;drawDemo();};
}
drawDemo();
$('source').onclick=()=>{const open=$('source-detail').hidden;$('source-detail').hidden=!open;$('source').setAttribute('aria-expanded',open);};
$('bridge').onclick=()=>{const open=$('bridge-detail').hidden;$('bridge-detail').hidden=!open;$('bridge').setAttribute('aria-expanded',open);$('bridge').textContent=open?'收起这条联系 ↑':'展开这条联系 ↓';};
$('copy').onclick=async()=>{
 const text=demos[topic].expression;
 try{if(!navigator.clipboard?.writeText)throw Error('unavailable');await navigator.clipboard.writeText(text);$('copy-status').textContent='表达已复制。';}
 catch{const el=$('expression-text');if(el){const range=document.createRange();range.selectNodeContents(el);const s=window.getSelection();s.removeAllRanges();s.addRange(range);$('copy-status').textContent='浏览器未允许自动复制，已选中原句，请手动复制。';}}
};
try{const v=localStorage.getItem('pwm-showcase-theme');if(v==='dark')document.documentElement.dataset.theme=v;}catch{}
$('theme').onclick=()=>{const v=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=v;try{localStorage.setItem('pwm-showcase-theme',v);}catch{}};
