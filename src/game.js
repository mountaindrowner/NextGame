'use strict';
const VER=typeof GAME_VERSION!=='undefined'?GAME_VERSION:'DEV';
try{document.getElementById('ver').textContent='v'+VER}catch(e){}
// ============ BONFIRE BASH — a Dojo Boy Advanced fighting game ============
const W=256,H=192,GY=176,XMIN=26,XMAX=230,GRAV=0.3;
const $=id=>document.getElementById(id);
const cv=$('screen'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t;
let frameNo=0;

// ---------------- SETTINGS ----------------
const SET={diff:1,music:true,sound:true,voice:true};
let SHOWBOX=false;// pause menu: draw hurtboxes (blue) and every hit check (red)
try{Object.assign(SET,JSON.parse(localStorage.getItem('worlddojo')||'{}'))}catch(e){}
function saveSet(){try{localStorage.setItem('worlddojo',JSON.stringify(SET))}catch(e){}}
// records & badges (kept in this browser)
const REC=(()=>{let r={};try{r=JSON.parse(localStorage.getItem('worlddojo_rec')||'{}')}catch(e){}r.ch=r.ch||{};r.badges=r.badges||{};r.trials=r.trials||{};return r})();
function saveRec(){try{localStorage.setItem('worlddojo_rec',JSON.stringify(REC))}catch(e){}}
function rc(id){return REC.ch[id]||(REC.ch[id]={w:0,l:0,clear:0,combo:0})}
const BADGES=[['first','FIRST VICTORY','WIN A MATCH'],['perfect','FLAWLESS','WIN A ROUND UNTOUCHED'],['combo5','COMBO ARTIST','LAND A 5-HIT COMBO'],
  ['super','SUPER FINISH','KO WITH A SUPER'],['throw','HANDS ON','LAND A THROW'],['tech','SLIPPERY','BREAK A THROW'],['clear','CHAMPION','CLEAR ARCADE'],
  ['hard','IRON WILL','CLEAR ARCADE ON HARD'],['trials','STUDENT','CLEAR A FIGHTER\'S TRIALS'],['allclear','WORLD CHAMPION','CLEAR ARCADE WITH EVERYONE']];
let TOAST=null;
function badge(k){if(REC.badges[k])return;REC.badges[k]=1;saveRec();const b=BADGES.find(x=>x[0]===k);if(b)TOAST={s:b[1],l:170};try{SFX.ok()}catch(e){}}

// ---------------- FONT ----------------
const FD={A:'01110 10001 10001 11111 10001 10001 10001',B:'11110 10001 10001 11110 10001 10001 11110',C:'01110 10001 10000 10000 10000 10001 01110',D:'11110 10001 10001 10001 10001 10001 11110',E:'11111 10000 10000 11110 10000 10000 11111',F:'11111 10000 10000 11110 10000 10000 10000',G:'01110 10001 10000 10111 10001 10001 01111',H:'10001 10001 10001 11111 10001 10001 10001',I:'01110 00100 00100 00100 00100 00100 01110',J:'00111 00010 00010 00010 00010 10010 01100',K:'10001 10010 10100 11000 10100 10010 10001',L:'10000 10000 10000 10000 10000 10000 11111',M:'10001 11011 10101 10101 10001 10001 10001',N:'10001 10001 11001 10101 10011 10001 10001',O:'01110 10001 10001 10001 10001 10001 01110',P:'11110 10001 10001 11110 10000 10000 10000',Q:'01110 10001 10001 10001 10101 10010 01101',R:'11110 10001 10001 11110 10100 10010 10001',S:'01111 10000 10000 01110 00001 00001 11110',T:'11111 00100 00100 00100 00100 00100 00100',U:'10001 10001 10001 10001 10001 10001 01110',V:'10001 10001 10001 10001 10001 01010 00100',W:'10001 10001 10001 10101 10101 10101 01010',X:'10001 10001 01010 00100 01010 10001 10001',Y:'10001 10001 01010 00100 00100 00100 00100',Z:'11111 00001 00010 00100 01000 10000 11111',
'0':'01110 10001 10011 10101 11001 10001 01110','1':'00100 01100 00100 00100 00100 00100 01110','2':'01110 10001 00001 00010 00100 01000 11111','3':'11111 00010 00100 00010 00001 10001 01110','4':'00010 00110 01010 10010 11111 00010 00010','5':'11111 10000 11110 00001 00001 10001 01110','6':'00110 01000 10000 11110 10001 10001 01110','7':'11111 00001 00010 00100 01000 01000 01000','8':'01110 10001 10001 01110 10001 10001 01110','9':'01110 10001 10001 01111 00001 00010 01100',
'!':'00100 00100 00100 00100 00100 00000 00100','?':'01110 10001 00001 00010 00100 00000 00100','.':'00000 00000 00000 00000 00000 01100 01100',',':'00000 00000 00000 00000 01100 00100 01000',':':'00000 01100 01100 00000 01100 01100 00000',"'":'00100 00100 01000 00000 00000 00000 00000','"':'01010 01010 00000 00000 00000 00000 00000','-':'00000 00000 00000 11111 00000 00000 00000','/':'00001 00010 00010 00100 01000 01000 10000','(':'00010 00100 01000 01000 01000 00100 00010',')':'01000 00100 00010 00010 00010 00100 01000','+':'00000 00100 00100 11111 00100 00100 00000','>':'01000 00100 00010 00001 00010 00100 01000','<':'00010 00100 01000 10000 01000 00100 00010','*':'00000 10101 01110 11111 01110 10101 00000','=':'00000 00000 11111 00000 11111 00000 00000','#':'00100 01110 11111 11111 01110 00100 00000','^':'00100 01110 11111 00100 00100 00100 00000','_':'00000 00000 00000 00000 00000 00000 11111'};
const GL={};for(const k in FD)GL[k]=FD[k].split(' ').map(r=>parseInt(r,2));
const FIRE=['#fffbc0','#ffe66a','#ffc93a','#ffa22a','#ff7a1e','#f0501c','#c8301a'];
const ICE=['#ffffff','#d8f4ff','#a8e2ff','#7ac8ff','#4aa0ff','#3a74e8','#2a4ac0'];
let TA=null;// text audit (tools/text_audit.js): records every text and box drawn in a frame
function textW(s,sc=1){return String(s).length*6*sc-sc}
function drawText(s,x,y,col='#fff',sc=1,o={}){
  s=String(s).toUpperCase();
  if(o.align==='center')x-=textW(s,sc)/2;else if(o.align==='right')x-=textW(s,sc);
  x=Math.round(x);y=Math.round(y);
  if(TA){const m=ctx.getTransform();TA.t.push({s,x:x+m.e,y:y+m.f,w:textW(s,sc),h:7*sc,nb:TA.b.length,miss:[...s].filter(ch=>ch!==' '&&ch!=='É'&&!GL[ch]).join('')})}
  const pass=(dx,dy,c,grad)=>{for(let i=0;i<s.length;i++){let ch=s[i],acc=false;if(ch==='É'){ch='E';acc=true}const g=GL[ch];if(!g)continue;const gx=x+i*6*sc+dx;
    for(let r=0;r<7;r++){const bits=g[r];if(!bits)continue;ctx.fillStyle=grad?grad[r]:c;for(let b=0;b<5;b++)if(bits&(16>>b))ctx.fillRect(gx+b*sc,y+r*sc+dy,sc,sc)}
    if(acc){ctx.fillStyle=grad?grad[0]:c;ctx.fillRect(gx+2*sc,y-2*sc+dy,sc,sc);ctx.fillRect(gx+3*sc,y-3*sc+dy,sc,sc)}}};
  if(o.outline){const w=o.ow||1;for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1],[0,2],[1,2]])pass(dx*w,dy*w,o.outline)}
  else if(o.shadow!==false)pass(1,1,o.shadow||'#000');
  pass(0,0,col,o.grad);
}
function wrap(s,n){const out=[];let line='';for(const w of s.split(' ')){if((line+' '+w).trim().length>n){out.push(line);line=w}else line=(line+' '+w).trim()}if(line)out.push(line);return out}

// ---------------- INPUT ----------------
const KEYS=['up','down','left','right','a','b','start','select','tap','jump'];
const held={},prev={},pressed={},latch={},touchHeld={},keyHeld={},mouseHeld={};
KEYS.forEach(k=>{held[k]=prev[k]=pressed[k]=latch[k]=false});
// player 2 (2-player mode): its own keys and gamepad
const held2={},prev2={},pressed2={},latch2={},keyHeld2={};KEYS.forEach(k=>{held2[k]=prev2[k]=pressed2[k]=latch2[k]=false});
let TWO=false;// (local 2 players was removed; online fills the player-2 input slots)
function setTwo(v){if(TWO===v)return;TWO=v;for(const k of KEYS){keyHeld[k]=keyHeld2[k]=false}}
function padState(g){const o={};if(!g)return o;const b=i=>!!(g.buttons[i]&&g.buttons[i].pressed),ax=g.axes||[];
  o.left=b(14)||ax[0]<-.5;o.right=b(15)||ax[0]>.5;o.up=b(12)||ax[1]<-.5;o.down=b(13)||ax[1]>.5;o.a=b(0)||b(3)||b(5)||b(7);o.b=b(1)||b(3)||b(5)||b(7);o.jump=b(2)||b(4);o.start=b(9);o.select=b(8);return o}
function pollInput(){const gp=navigator.getGamepads?[...navigator.getGamepads()].filter(Boolean):[];
  const g1=padState(gp[0]),g2={};
  for(const k of KEYS){const h=!!(touchHeld[k]||keyHeld[k]||mouseHeld[k]||g1[k]);pressed[k]=(h&&!prev[k])||latch[k];latch[k]=false;held[k]=h;prev[k]=h;
    const h2=!!(keyHeld2[k]||g2[k]);pressed2[k]=(h2&&!prev2[k])||latch2[k];latch2[k]=false;held2[k]=h2;prev2[k]=h2}
  if(scene===Fight){held.up=held.up||held.jump;pressed.up=pressed.up||pressed.jump}}
const anyPress=()=>pressed.start||pressed.a||pressed.tap;
const els={dpad:$('dpad'),A:$('bA'),B:$('bB'),SP:$('bSp'),J:$('bJ'),sel:$('bSel'),sta:$('bSta')};
let TOUCHY=false;// last input came from a touch screen: buttons get a longer buffer and A+B window
function hitTest(x,y,out){
  const q=cv.getBoundingClientRect();if(x>q.left&&x<q.right&&y>q.top&&y<q.bottom){out.tap=true;return}
  const r=els.dpad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=x-cx,dy=y-cy,R=r.width/2,d=Math.hypot(dx,dy);
  if(d<R*1.4){if(d>R*0.15){const sec=Math.round(Math.atan2(dy,dx)/(Math.PI/4));
    ({0:['right'],1:['right','down'],2:['down'],3:['down','left'],4:['left'],'-4':['left'],'-3':['up','left'],'-2':['up'],'-1':['up','right']})[sec].forEach(k=>out[k]=true)}return}
  {let best=null,bd=1e9;for(const[el,k]of[[els.A,'a'],[els.B,'b'],[els.SP,'sp'],[els.J,'jump']]){if(!el)continue;const p=el.getBoundingClientRect(),R=p.width/2,dd=Math.hypot(x-p.left-R,y-p.top-R);if(dd<R*1.35&&dd<bd){bd=dd;best=k}}
    if(best){if(best==='sp'){out.a=out.b=true;out.sp=true}else out[best]=true;return}}
  for(const[el,k]of[[els.sel,'select'],[els.sta,'start']]){const p=el.getBoundingClientRect();if(x>p.left-14&&x<p.right+14&&y>p.top-16&&y<p.bottom+16){out[k]=true;return}}
}
function applyPointer(store,out){store.sp=!!out.sp;for(const k of KEYS){if(out[k]&&!store[k]){latch[k]=true;if(k!=='tap'&&navigator.vibrate)try{navigator.vibrate(6)}catch(e){}}store[k]=!!out[k]}updateVis()}
function onTouch(e){e.preventDefault();unlockAudio();TOUCHY=true;const out={};for(const t of e.touches)hitTest(t.clientX,t.clientY,out);applyPointer(touchHeld,out)}
['touchstart','touchmove','touchend','touchcancel'].forEach(ev=>document.addEventListener(ev,onTouch,{passive:false}));
let mDown=false;
document.addEventListener('mousedown',e=>{mDown=true;unlockAudio();const o={};hitTest(e.clientX,e.clientY,o);applyPointer(mouseHeld,o)});
document.addEventListener('mousemove',e=>{if(!mDown)return;const o={};hitTest(e.clientX,e.clientY,o);applyPointer(mouseHeld,o)});
document.addEventListener('mouseup',()=>{mDown=false;applyPointer(mouseHeld,{})});
const KM={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right',KeyJ:'b',KeyK:'a',KeyZ:'b',KeyX:'a',KeyC:'sp',KeyL:'sp',KeyV:'jump',KeyI:'jump',Enter:'start',Space:'start',ShiftRight:'select',Backspace:'select'};
function keyRoute(c){return KM[c]?[1,KM[c]]:null}
// SP (special) key = A+B in one press
document.addEventListener('keydown',e=>{const r=keyRoute(e.code);if(!r)return;e.preventDefault();unlockAudio();TOUCHY=false;const[pl,k0]=r;
  for(const k of k0==='sp'?['a','b']:[k0]){if(pl===1){if(!keyHeld[k])latch[k]=true;keyHeld[k]=true}else{if(!keyHeld2[k])latch2[k]=true;keyHeld2[k]=true}}updateVis()});
document.addEventListener('keyup',e=>{const r=keyRoute(e.code);if(!r)return;for(const k of r[1]==='sp'?['a','b']:[r[1]]){if(r[0]===1)keyHeld[k]=false;else keyHeld2[k]=false}updateVis()});
document.addEventListener('contextmenu',e=>e.preventDefault());
function updateVis(){const h=k=>touchHeld[k]||keyHeld[k]||mouseHeld[k];
  els.dpad.className='btn'+(h('up')?' u':'')+(h('down')?' d':'')+(h('left')?' l':'')+(h('right')?' r':'');
  const sp=!!(touchHeld.sp||mouseHeld.sp);if(els.SP)els.SP.classList.toggle('on',sp);els.A.classList.toggle('on',!!h('a')&&!sp);els.B.classList.toggle('on',!!h('b')&&!sp);if(els.J)els.J.classList.toggle('on',!!h('jump'));els.sel.classList.toggle('on',!!h('select'));els.sta.classList.toggle('on',!!h('start'))}

// ---------------- AUDIO ----------------
const AU={ctx:null};
function unlockAudio(){
  if(AU.ctx){if(AU.ctx.state==='suspended')AU.ctx.resume();return}
  try{const C=window.AudioContext||window.webkitAudioContext;AU.ctx=new C();
    AU.master=AU.ctx.createGain();AU.master.gain.value=0.55;AU.master.connect(AU.ctx.destination);
    AU.sfx=AU.ctx.createGain();AU.sfx.connect(AU.master);AU.mus=AU.ctx.createGain();AU.mus.gain.value=0.3;AU.mus.connect(AU.master);
    const len=AU.ctx.sampleRate,buf=AU.ctx.createBuffer(1,len,len),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;AU.noise=buf;
    if(typeof MUSIC!=='undefined')setTimeout(()=>Object.keys(MUSIC).filter(k=>k.startsWith('voice_')).forEach(decodeVoice),0);
    if(window.speechSynthesis){const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}
  }catch(e){}
}
function osc(type,f,t,dur,vol,dest,f2,sus){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t+dur);
  g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(vol,t+0.004);if(sus)g.gain.setValueAtTime(vol,t+dur*0.7);g.gain.exponentialRampToValueAtTime(0.0008,t+dur);o.connect(g);g.connect(dest);o.start(t);o.stop(t+dur+0.03)}
function nz(t,dur,vol,f1,f2,ft,dest){const c=AU.ctx,s=c.createBufferSource();s.buffer=AU.noise;const fl=c.createBiquadFilter();fl.type=ft||'lowpass';fl.frequency.setValueAtTime(f1,t);fl.frequency.exponentialRampToValueAtTime(Math.max(30,f2),t+dur);fl.Q.value=ft==='bandpass'?1.2:0.7;
  const g=c.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.0008,t+dur);s.connect(fl);fl.connect(g);g.connect(dest);s.start(t,Math.random()*0.5);s.stop(t+dur+0.03)}
function T(type,f,dur,vol=.2,f2=null,delay=0){if(!AU.ctx||!SET.sound)return;osc(type,f,AU.ctx.currentTime+delay,dur,vol,AU.sfx,f2)}
function N(dur,vol=.3,f1=2000,f2=400,ft='lowpass',delay=0){if(!AU.ctx||!SET.sound)return;nz(AU.ctx.currentTime+delay,dur,vol,f1,f2,ft,AU.sfx)}
const SFX={
  move:()=>T('square',988,.035,.09),
  ok:()=>{T('square',784,.06,.12);T('square',1568,.12,.12,null,.06)},
  back:()=>{T('square',523,.06,.1);T('square',330,.1,.1,null,.05)},
  start:()=>{[523,659,784,1047].forEach((f,i)=>T('square',f,.09,.12,null,i*.06))},
  ding:()=>{T('sine',1046,.9,.35);T('sine',1568,1.2,.25,null,.11);T('triangle',2093,.5,.08,null,.11)},
  whoosh:()=>N(.09,.22,4000,900,'bandpass'),
  whooshH:()=>N(.16,.28,2600,300,'bandpass'),
  hitL:()=>{N(.03,.5,9000,3000,'highpass');N(.08,.45,3500,300);T('square',300,.05,.18,110);T('sine',140,.09,.38,60)},
  hit:()=>{N(.025,.55,8000,2500,'highpass');N(.12,.55,3000,200);T('square',220,.08,.22,70);T('sine',110,.16,.5,40)},
  heavy:()=>{N(.03,.6,7000,2000,'highpass');N(.22,.7,2500,120);T('square',160,.14,.28,45);T('sine',80,.28,.6,30);T('sine',52,.5,.5,28,.04)},
  burst:()=>{T('sawtooth',180,.4,.2,900);N(.4,.5,400,6000,'bandpass');T('sine',60,.5,.6,30)},
  block:()=>{T('square',1500,.05,.14,900);N(.05,.2,7000,3000,'highpass')},
  jump:()=>T('square',260,.12,.07,620),
  land:()=>N(.06,.2,500,120),
  thud:()=>{N(.25,.6,900,60);T('sine',70,.3,.6,30)},
  special:()=>{[392,523,659,784,1047].forEach((f,i)=>T('square',f,.07,.1,null,i*.035));N(.3,.18,800,6000,'bandpass')},
  rush:()=>{T('sawtooth',120,.35,.14,900);N(.35,.25,500,5000,'bandpass')},
  star:()=>{T('triangle',1800,.18,.12,2600);N(.15,.12,8000,3000,'highpass')},
  spin:()=>{for(let i=0;i<4;i++)N(.08,.2,1200+i*500,3000,'bandpass',i*.08)},
  grab:()=>{T('square',180,.1,.2,120);N(.08,.3,1500,500)},
  slam:()=>{N(.5,.9,2000,40);T('sine',60,.5,.8,25);T('square',110,.2,.25,40)},
  ko:()=>{N(.6,.8,3000,60);T('sawtooth',440,1.3,.18,40);T('sine',90,.6,.6,30)},
  tick:()=>T('square',1320,.05,.12),
  lock:()=>{T('square',1760,.04,.08);T('square',2349,.05,.08,null,.07);T('square',1760,.04,.06,null,.14)},
  flash:()=>{N(.05,.5,9000,6000,'highpass');T('square',3200,.03,.12);N(.35,.35,6000,800,'bandpass',.03);T('sine',220,.25,.3,60,.02)},
  superS:()=>{[262,330,392,523,659,784,1047].forEach((f,i)=>T('sawtooth',f,.12,.09,null,i*.05));N(.6,.3,300,6000,'bandpass');T('sine',70,.8,.6,40)},
  taser:()=>{T('square',2400,.05,.1,1800);N(.12,.25,8000,3000,'highpass')},
  zap:()=>{for(let i=0;i<6;i++)T('square',1200+Math.random()*1800,.03,.08,null,i*.04);N(.3,.2,7000,2500,'bandpass')},
  cuff:()=>{T('square',2200,.03,.14);T('square',1600,.04,.12,null,.06);N(.05,.25,9000,5000,'highpass',.06)},
  laser:()=>{T('sawtooth',880,.35,.12,1760);T('square',1320,.3,.08,2200,.02);N(.35,.18,6000,2000,'bandpass')},
  bass:()=>{T('sawtooth',62,.45,.45,32);T('sine',44,.7,.7,28);N(.35,.55,700,60)},
  mic:()=>{T('square',900,.28,.1,420);T('sawtooth',230,.32,.14,340);N(.3,.28,3200,700,'bandpass')},
  coin:()=>{[1976,2637,3136,2637,3520].forEach((f,i)=>T('square',f,.06,.08,null,i*.05))},
  parry:()=>{T('square',1760,.06,.12,2600);T('triangle',2637,.25,.12,null,.03);N(.06,.2,9000,5000,'highpass')},
  rewind:()=>{T('sawtooth',1400,.5,.09,180);T('square',900,.45,.05,120,.05);N(.5,.12,4000,800,'bandpass')},
  bless:()=>{[523,659,784,1047,1319].forEach((f,i)=>T('sine',f,.9,.09,null,i*.07));T('triangle',262,1.2,.12)},
  cheer:()=>{N(1.6,.22,900,2400,'bandpass');N(1.2,.12,2000,3500,'bandpass',.2);for(let i=0;i<10;i++)N(.035,.18,5000,2500,'highpass',.1+Math.random()*1.2)},
  bell:()=>{T('triangle',1318,.5,.2);T('triangle',1975,.5,.1,null,.02)},
};
// ---------------- VOICE: recorded lines (assets/voice, made by tools/voices.py) ----------------
// A line with a clip plays the clip; anything else falls back to the browser's speech.
const VOX={buf:{},cur:{}};
function decodeVoice(k){if(VOX.buf[k]||!AU.ctx||typeof MUSIC==='undefined'||!MUSIC[k])return VOX.buf[k];
  const raw=atob(MUSIC[k].split(',')[1]),u=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)u[i]=raw.charCodeAt(i);
  return VOX.buf[k]=AU.ctx.decodeAudioData(u.buffer).then(b=>VOX.buf[k]=b).catch(()=>null)}
function playVoice(key,ch='ann',delay=0){const k='voice_'+key;if(!SET.voice||!AU.ctx||typeof MUSIC==='undefined'||!MUSIC[k])return false;
  const go=b=>{if(!b||!b.duration)return;if(VOX.cur[ch]){try{VOX.cur[ch].stop()}catch(e){}}
    if(!VOX.g){VOX.g=AU.ctx.createGain();VOX.g.gain.value=1.3;VOX.g.connect(AU.master)}
    const src=AU.ctx.createBufferSource();src.buffer=b;src.connect(VOX.g);src.start(AU.ctx.currentTime+delay);VOX.cur[ch]=src;(VOX.log||(VOX.log=[])).push(key);if(VOX.log.length>60)VOX.log.shift()};
  const b=VOX.buf[k]||decodeVoice(k);if(b&&b.duration)go(b);else Promise.resolve(b).then(go);return true}
const vdur=k=>{const b=VOX.buf['voice_'+k];return b&&b.duration?b.duration:0.9};
function sayName(id){if(!playVoice('ann_name_'+id))say(CH[id].name.replace('É','E').toLowerCase(),1,0.6)}
function sayVs(a,b){if(!playVoice('ann_name_'+a,'vs1')){say(`${CH[a].name.toLowerCase()} versus ${CH[b].name.toLowerCase()}`,1,0.55);return}
  const d1=vdur('ann_name_'+a)+0.05;playVoice('ann_versus','vs2',d1);playVoice('ann_name_'+b,'vs3',d1+vdur('ann_versus')+0.05)}
function fighterVoice(f,line,delay=0){if(!playVoice(f.c.id+'_'+line,'f'+f.side,delay)&&line!=='win'&&line!=='ko'&&!f.cpu)
  say((line==='super'?SUPER_NAME[f.c.id]:line==='sp2'?f.c.sp2Name:f.c.spName).replace('É','e').toLowerCase(),1.1,0.65)}
function say(t,rate=0.95,pitch=0.6){if(playVoice('ann_'+String(t).toLowerCase().replace(/[^a-z ]/g,'').trim().replace(/ +/g,'_')))return;
  if(!SET.voice||!window.speechSynthesis)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=rate;u.pitch=pitch;u.volume=1;speechSynthesis.speak(u)}catch(e){}}

// ---------------- MUSIC ----------------
const NI={C:0,'C#':1,D:2,'D#':3,E:4,F:5,'F#':6,G:7,'G#':8,A:9,'A#':10,B:11};
function nf(n,tr){const m=n.match(/^([A-G]#?)(\d)$/);if(!m)return 0;return 440*Math.pow(2,(12*(+m[2]+1)+NI[m[1]]+tr-69)/12)}
const SONGS={
  title:{bpm:112,lt:0,lead:'A4 - - - C5 - E5 - A5 - - - G5 - E5 - F5 - - - E5 - D5 - E5 - - - - - . . A4 - - - C5 - E5 - A5 - - - B5 - C6 - B5 - - - G5 - - - A5 - - - - - . .',
    bass:'A2 . A2 . A3 . A2 . A2 . A2 . A3 . A2 . F2 . F2 . F3 . F2 . G2 . G2 . G3 . G2 . A2 . A2 . A3 . A2 . A2 . A2 . A3 . A2 . E2 . E2 . E3 . E2 . E2 . E2 . G#2 . B2 .',drum:'k...s...k.k.s..h'},
  select:{bpm:140,lt:-12,lead:'C5 . E5 . G5 . E5 . F5 . A5 . G5 . E5 . D5 . F5 . A5 . F5 . G5 - - - . . . .',bass:'C3 . G2 . C3 . G2 . F2 . C3 . F2 . C3 . D3 . A2 . D3 . A2 . G2 . D3 . G2 . B2 .',drum:'k.h.s.h.k.h.s.hh'},
  fight:{bpm:158,lt:-12,lead:'E5 - . E5 G5 - E5 - D5 - B4 - D5 - E5 - E5 - . E5 G5 - A5 - B5 - A5 - G5 - F#5 - E5 - . E5 G5 - E5 - D5 - B4 - D5 - G5 - F#5 - - - D5 - - - E5 - - - . . . . B5 - A5 - G5 - A5 - B5 - - - E5 - - - C6 - B5 - A5 - G5 - A5 - - - - - . . B5 - A5 - G5 - A5 - B5 - - - E6 - - - D6 - B5 - G5 - A5 - B5 - - - - - . .',
    bass:'E2 . E3 . E2 . E3 . E2 . E3 . D3 . E3 . C2 . C3 . C2 . C3 . D2 . D3 . D2 . D3 . E2 . E3 . E2 . E3 . E2 . E3 . D3 . E3 . B1 . B2 . B1 . B2 . E2 . E3 . E2 . E3 . G2 . G3 . G2 . G3 . E2 . E3 . E2 . E3 . A2 . A3 . A2 . A3 . D2 . D3 . D2 . D3 . G2 . G3 . G2 . G3 . E2 . E3 . E2 . E3 . C2 . C3 . D2 . D3 . B1 . B2 . B1 . B2 .',drum:'k.h.s.h.kkh.s.hh'},
  win:{bpm:150,lt:0,once:true,lead:'C5 E5 G5 C6 - - G5 C6 - - - - . . . .',bass:'C3 - - - - - G2 C3 - - - - . . . .',drum:'k...k.k.s.......'},
  lose:{bpm:84,lt:0,once:true,lead:'E4 - D#4 - D4 - C#4 - - - - - . . . .',bass:'A2 - G#2 - G2 - F#2 - - - - - . . . .',drum:'................'},
  ending:{bpm:96,lt:0,lead:'A4 - - - C5 - E5 - A5 - - - G5 - E5 - F5 - - - E5 - D5 - E5 - - - - - . . A4 - - - C5 - E5 - A5 - - - B5 - C6 - B5 - - - G5 - - - A5 - - - - - . .',
    bass:'A2 - - - A2 - - - F2 - - - G2 - - - A2 - - - A2 - - - E2 - - - E2 - - -',drum:'k.......s.......'},
};
const MUS={s:null,name:null};
// Recorded stage songs (assets/music/<stage>.mp3 + loop points), played looped through the music bus.
const TRACK={buf:{},src:null,id:null,gain:null};
function trackData(id){return typeof MUSIC!=='undefined'&&MUSIC['music_'+id]&&typeof ASSET_DATA!=='undefined'&&ASSET_DATA['music_'+id]}
function playTrack(id){if(TRACK.id===id&&TRACK.src)return true;if(!trackData(id))return false;stopTrack();stopMusic();TRACK.id=id;
  const go=()=>{if(TRACK.id!==id||!AU.ctx)return;const L=ASSET_DATA['music_'+id],b=TRACK.buf[id];if(!b||TRACK.src)return;
    if(!TRACK.gain){TRACK.gain=AU.ctx.createGain();TRACK.gain.connect(AU.master)}TRACK.gain.gain.value=SET.music?0.5:0;
    const src=AU.ctx.createBufferSource();src.buffer=b;src.loop=true;src.loopStart=L.loopStart;src.loopEnd=Math.min(L.loopEnd,b.duration);src.connect(TRACK.gain);src.start();TRACK.src=src};
  if(TRACK.buf[id])go();else if(AU.ctx){const raw=atob(MUSIC['music_'+id].split(',')[1]),u8=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)u8[i]=raw.charCodeAt(i);
    AU.ctx.decodeAudioData(u8.buffer).then(b=>{TRACK.buf[id]=b;go()}).catch(()=>{})}
  return true}
function stopTrack(){if(TRACK.src){try{TRACK.src.stop()}catch(e){}TRACK.src.disconnect();TRACK.src=null}TRACK.id=null}
function stageMusic(stage){if(!playTrack(stage))playMusic('fight',CH[stage].tr)}
function playMusic(name,tr=0){if((name==='title'||name==='select')&&playTrack(name))return;if(MUS.name===name&&MUS.tr===tr&&MUS.s)return;stopTrack();const s=SONGS[name];MUS.name=name;MUS.tr=tr;MUS.step=0;MUS.next=AU.ctx?AU.ctx.currentTime+0.06:0;
  MUS.s={...s,L:s.lead.split(/\s+/),B:s.bass.split(/\s+/),D:s.drum.split('')}}
function stopMusic(){MUS.s=null;MUS.name=null;stopTrack()}
function drum(c,t){if(c==='k'){osc('sine',150,t,.12,.55,AU.mus,40)}else if(c==='s'){nz(t,.1,.32,2200,900,'bandpass',AU.mus)}else if(c==='h'){nz(t,.03,.12,9000,6000,'highpass',AU.mus)}}
function musicTick(){if(!AU.ctx||!MUS.s)return;const s=MUS.s,sd=60/s.bpm/4,now=AU.ctx.currentTime;if(MUS.next<now-0.3)MUS.next=now+0.05;
  while(MUS.next<now+0.15){const i=MUS.step,t=MUS.next;
    if(SET.music){const run=(arr,j)=>{let n=1;while(arr[(j+n)%arr.length]==='-'&&n<16)n++;return n};
      const l=s.L[i%s.L.length];if(l&&l!=='-'&&l!=='.')osc('square',nf(l,s.lt+MUS.tr),t,run(s.L,i%s.L.length)*sd*0.95,0.11,AU.mus,null,true);
      const b=s.B[i%s.B.length];if(b&&b!=='-'&&b!=='.')osc('triangle',nf(b,MUS.tr),t,run(s.B,i%s.B.length)*sd*0.9,0.32,AU.mus,null,true);
      drum(s.D[i%s.D.length],t)}
    MUS.step++;MUS.next+=sd;if(s.once&&MUS.step>=s.L.length){MUS.s=null;break}}}
document.addEventListener('visibilitychange',()=>{if(!AU.ctx)return;if(document.hidden)AU.ctx.suspend();else AU.ctx.resume()});

// ---------------- CHARACTERS ----------------
const CH={
  karl:{id:'karl',name:'PAPA-LÉGUAS',nick:'',style:'KARATE',country:'BRAZIL',flag:'br',ht:"6'0\" (183 CM)",wt:'165 LB (75 KG)',
    speed:1.25,power:1.0,def:1.0,jump:1.0,stats:[5,3,3],special:'rush',spName:'LÉGUA RUSH',special2:'step',sp2Name:'LÉGUA STEP',tr:0,
    col:{skin:'#e0965c',glove:'#2c2a44',leg:'#e9e7f3',foot:'#f6f6f6',aura:'#ffd23a'},sh:.72,hip:.5,
    quote:"TOO SLOW! THEY DON'T CALL ME PAPA-LÉGUAS FOR NOTHING!",lose:'I RAN OUT OF ROAD...',stageName:'CROSSROADS DOJO'},
  ivan:{id:'ivan',name:'IVAN',nick:'THE BEAR',style:'SAMBO',country:'RUSSIA',flag:'ru',ht:"6'2\" (188 CM)",wt:'215 LB (98 KG)',
    speed:0.82,power:1.3,def:1.1,jump:0.88,stats:[2,5,4],special:'slam',spName:'BEAR SLAM',special2:'charge',sp2Name:'IRON CHARGE',tr:-5,
    col:{skin:'#e3a272',glove:'#2e2f4a',leg:'#2b3168',foot:'#2c3a8a',aura:'#ff4a3a'},sh:.75,hip:.5,
    quote:'IN MY GYM, THE FLOOR IS MY FRIEND. SAY HELLO TO IT.',lose:'NEXT TIME... I BRING BIGGER BEAR.',stageName:'IRON GYM'},
  vizor:{id:'vizor',name:'VIZOR',nick:'THE WATCHER',style:'TECH BRAWLER',country:'UNKNOWN',countryLabel:'ORIGIN',flag:'unk',ht:"5'11\" (180 CM)",wt:'190 LB (86 KG)',
    speed:1.04,power:1.06,def:1.0,jump:1.0,stats:[3,4,4],special:'flash',spName:'SHUTTER FLASH',special2:'replay',sp2Name:'INSTANT REPLAY',tr:1,
    col:{skin:'#c98a5e',glove:'#25232f',leg:'#3d5a96',foot:'#f0f0f0',aura:'#3ae8ff'},sh:.72,hip:.5,
    quote:"SMILE. YOU'RE ON CAMERA... AND YOU JUST GOT CAPTURED.",lose:'SIGNAL... LOST.',stageName:'CONTROL ROOM'},
  padre:{id:'padre',name:'SAMSON',nick:'THE SHEPHERD',style:'SACRED BOXING',country:'THE PARISH',countryLabel:'ORIGIN',flag:'cross',ht:"5'10\" (178 CM)",wt:'185 LB (84 KG)',
    speed:0.94,power:1.12,def:1.08,jump:0.95,stats:[2,5,4],special:'tome',spName:'HOLY TOME',special2:'bless',sp2Name:'BENEDICTION',tr:-2,
    col:{skin:'#d89a6a',glove:'#1c1a24',leg:'#24222e',foot:'#1a1820',aura:'#ffd96a'},sh:.72,hip:.5,
    quote:'THE LORD IS MY SHEPHERD. YOU, MY SON, ARE A LOST SHEEP.',lose:'FORGIVE ME... I GOT CARRIED AWAY.',stageName:'OLD CHAPEL'},
  zeke:{id:'zeke',name:'ZEKE',nick:'THE STRIKE',style:'BOWLING BRAWLER',country:'THE LANES',countryLabel:'ORIGIN',flag:'pin',ht:"5'9\" (175 CM)",wt:'205 LB (93 KG)',
    speed:0.96,power:1.1,def:1.05,jump:0.95,stats:[3,4,4],special:'strike',spName:'STRIKE BALL',special2:'split',sp2Name:'SPLIT SHOT',tr:1,
    col:{skin:'#c98a5e',glove:'#1c1a24',leg:'#24222e',foot:'#f0f0f0',aura:'#d04aff'},sh:.72,hip:.5,
    quote:"THAT'S A STRIKE! YOU WERE ALWAYS JUST ONE MORE PIN TO ME.",lose:'GUTTER BALL...',stageName:'STRIKE LANES'},
  hecky:{id:'hecky',name:'HECKY XAVIER',nick:'THE CLOSER',style:'DAPPER BOXING',country:'PENTHOUSE',countryLabel:'ORIGIN',flag:'tie',ht:"5'10\" (178 CM)",wt:'160 LB (73 KG)',
    speed:1.12,power:1.0,def:0.98,jump:1.02,stats:[4,3,3],special:'takeover',spName:'HOSTILE TAKEOVER',special2:'powersuit',sp2Name:'POWER SUIT',special3:'laser',sp3Name:'LASER GLARE',tr:2,skin2:'heckyfox',
    col:{skin:'#e8a878',glove:'#e8a878',leg:'#f0eef6',foot:'#1a1820',aura:'#ffd23a'},sh:.72,hip:.5,
    quote:"DON'T TAKE IT PERSONALLY. IT'S JUST BUSINESS.",lose:"I'LL HAVE MY LAWYERS CALL YOU.",stageName:'PENTHOUSE'},
  lawslie:{id:'lawslie',name:'LAWSLIE',nick:'THE LAW',style:'POLICE DEFENSE',country:'PRECINCT 9',countryLabel:'ORIGIN',flag:'badge',ht:"5'3\" (160 CM)",wt:'120 LB (54 KG)',
    speed:1.02,power:0.98,def:1.04,jump:1.0,stats:[3,3,5],special:'taser',spName:'TASER',special2:'cuff',sp2Name:"CUFF 'EM",tr:0,
    col:{skin:'#d89a6a',glove:'#1c1a24',leg:'#283068',foot:'#1a1820',aura:'#5ab4ff'},sh:.72,hip:.5,
    quote:'YOU HAVE THE RIGHT TO REMAIN SILENT. I SUGGEST YOU USE IT.',lose:'OFFICER DOWN... CALL IT IN.',stageName:'PRECINCT 9'},
  rex:{id:'rex',name:'MARCUS',nick:'THE LOW END',style:'BASS BRAWLER',country:'MAIN STAGE',countryLabel:'ORIGIN',flag:'crown',ht:"5'8\" (173 CM)",wt:'200 LB (91 KG)',
    speed:0.78,power:1.1,def:1.04,jump:0.92,stats:[1,4,4],special:'bassdrop',spName:'BASS DROP',special2:'miccheck',sp2Name:'MIC CHECK',tr:0,
    col:{skin:'#c98a5e',glove:'#1c1a24',leg:'#3d5a96',foot:'#f0f0f0',aura:'#ff4a6a'},sh:.72,hip:.5,
    quote:"THANK YOU, GOOD NIGHT! YOU'VE BEEN A GREAT OPENING ACT.",lose:'ENCORE... LATER...',stageName:'MAIN STAGE'},
  kai:{id:'kai',name:'DEVANTÉ',nick:'THE CROWN',style:'STREETBALL',country:'THE COURTS',countryLabel:'ORIGIN',flag:'hoop',ht:"6'3\" (191 CM)",wt:'185 LB (84 KG)',
    speed:1.08,power:0.98,def:0.96,jump:1.12,stats:[4,3,3],special:'bounce',spName:'BOUNCE PASS',special2:'crossover',sp2Name:'ANKLE BREAKER',tr:0,
    col:{skin:'#e0a070',glove:'#1c1a24',leg:'#24202e',foot:'#f0f0f0',aura:'#ffb43a'},sh:.72,hip:.5,
    quote:"THAT'S GAME. YOU NEVER HAD A CHANCE ON MY COURT.",lose:'FOUL... THAT WAS A FOUL...',stageName:'STREET COURT'},
};
const ORDER=['karl','ivan','vizor','padre','zeke','hecky','lawslie','rex','kai'];
// ---- archetypes: every fighter plays differently (health, reach, movement, chains) and has one unique trait ----
const ARCH={
  karl:{type:'RUSHDOWN',trait:'FAST DASH, 4-HIT CHAINS',hp:92,chain:4,dash:1.3,reach:1},
  ivan:{type:'GRAPPLER',trait:'ARMORED KICK, MOST HP',hp:118,dash:.8,armor:true,reach:1},
  vizor:{type:'ZONER',trait:'LONG REACH',hp:98,reach:1.25},
  padre:{type:'POWERHOUSE',trait:'COUNTERS KNOCK DOWN',hp:106,heavy:true,reach:1.05},
  zeke:{type:'HIGH/LOW ZONER',trait:'BLOCKED BALL: RELOAD',hp:100,spare:true,reach:1},
  hecky:{type:'TECH RUSHDOWN',trait:'PARRY: TAP FWD ON HIT',hp:98,parry:true,reach:1.18,hh:1.35,dash:1.2},
  lawslie:{type:'ENFORCER',trait:'NO CHIP, BLOCK = METER',hp:100,enforcer:true,reach:1},
  kai:{type:'HIGH FLYER',trait:'DOUBLE JUMP, BIG HOPS',hp:96,dj:true,reach:1},
  rex:{type:'LONG-RANGE',trait:'HUGE REACH, BEAT = +DMG',hp:104,rhythm:true,amp:true,reach:1.4,slow:2,dash:.7}};
const arch=c=>ARCH[c.id]||{};
// RHYTHM trait: a steady 128-ish bpm beat on the shared frame counter (same on both sides online)
const BEAT=28,onBeat=()=>{const m=frameNo%BEAT;return m<4||m>BEAT-4};
const SUPER_NAME={"karl": "MIL LÉGUAS", "ivan": "SIBERIAN STORM", "vizor": "FULL EXPOSURE", "padre": "FINAL SERMON", "zeke": "PERFECT GAME", "hecky": "GOLDEN PARACHUTE", "lawslie": "FULL ARREST", "rex": "STAGE DIVE", "kai": "FAST BREAK"};
const ENDING={"kai": "DEVANTE TOOK THE BONFIRE BASH TROPHY TO THE STREET COURT AND RAN A MIDNIGHT TOURNAMENT. NOBODY COULD GUARD HIM. NOBODY EVER WILL.", "rex": "MARCUS PLAYED THE BONFIRE BASH VICTORY SHOW TO A SOLD-OUT CROWD. THE CROWN STAYED ON FOR THE ENCORE, AND THE ENCORE, AND THE ENCORE.", "lawslie": "OFFICER LAWSLIE CLOSED THE BONFIRE BASH CASE FILE: EVERY FIGHTER BOOKED, EVERY TROPHY ACCOUNTED FOR. THE CHIEF MADE HER DETECTIVE BY MORNING.", "hecky": "HECKY XAVIER BOUGHT THE BONFIRE BASH TOURNAMENT THE NEXT MORNING. NEXT YEAR'S TROPHY IS GOLD-PLATED, AND SO IS THE PENTHOUSE.", "zeke": "ZEKE BOWLED A PERFECT 300 AT THE CHAMPIONS PARTY, THEN BOUGHT EVERYONE NACHOS. THE STRIKE LANES ARE NOW THE MOST FAMOUS ALLEY ON EARTH.", "karl": "PAPA-LEGUAS RAN STRAIGHT FROM THE FINAL FIGHT TO HIS DOJO AND HUNG UP A SIGN: EVERYONE WELCOME. JUST KEEP UP.", "ivan": "IVAN CARRIED THE TROPHY HOME ON ONE SHOULDER. THE IRON GYM HAS A NEW RULE: NOBODY LEAVES WITHOUT A BEAR HUG.", "vizor": "VIZOR REPLAYED EVERY FIGHT FRAME BY FRAME. THE FOOTAGE BECAME THE MOST WATCHED VIDEO ON EARTH.", "padre": "SAMSON RANG THE OLD CHAPEL BELL FOR THE FIRST TIME IN YEARS. EVEN HIS RIVALS CAME TO LISTEN."};
// combo trials: each step is the move that must hit, in order, inside one combo
const TRIALS={karl:[['jab','kick'],['jab','jab','kick','sp1'],['jab','kick','super']],
  ivan:[['jab','kick'],['jkick','jab','kick'],['cjab','sweep']],
  vizor:[['jab','kick'],['jab','kick','sp1'],['jab','kick','super']],padre:[['jab','kick'],['jab','kick','sp1'],['cjab','cjab','sweep']],
  zeke:[['jab','kick'],['jab','kick','sp1'],['jab','kick','super']],
  hecky:[['jab','kick'],['cjab','jab','kick','sp1'],['jab','kick','super']],
  lawslie:[['jab','kick'],['jab','kick','sp1'],['jab','kick','super']],
  rex:[['jab','kick'],['jab','kick','sp2'],['jab','kick','super']],
  kai:[['jab','kick'],['jab','kick','sp1'],['jab','kick','super']]};
const TKEY={jab:'A',kick:'B',cjab:'DN+A',sweep:'DN+B',jpunch:'JUMP+A',jkick:'JUMP+B',sp1:'SP',sp2:'DN+SP',sp3:'BK+SP',super:'FWD+SP',throw:'FWD+B'};
const TNAME={jab:'JAB',kick:'KICK',cjab:'LOW JAB',sweep:'SWEEP',jpunch:'JUMP PUNCH',jkick:'JUMP KICK',sp1:'SPECIAL',sp2:'SPECIAL 2',super:'SUPER',throw:'THROW'};
// bread-and-butter combos shown in the pause menu
const BNB={karl:'JAB, JAB, KICK > SP',ivan:'JUMP KICK, JAB, KICK',vizor:'JAB, KICK > SP',padre:'JAB, KICK > SP (OVERHEAD)',zeke:'JAB, KICK > SP',hecky:'LOW JAB, JAB, KICK > SP',lawslie:'JAB, KICK > SP (TASER)',rex:'JAB, KICK > DN+SP',kai:'JAB, KICK > SP'};
// cooldown (frames) per special; second specials are stronger tools with longer cooldowns
const SPCD={rush:75,shuriken:75,slam:110,spin:75,flash:110,tome:75,strike:75,split:120,takeover:70,powersuit:720,laser:130,taser:80,cuff:240,bassdrop:80,miccheck:150,bounce:80,crossover:200,step:80,counter:110,charge:120,rising:70,replay:480,bless:600};
const IMG={};
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function silhouette(img,color){const c=mk(img.width,img.height),x=c.getContext('2d');x.drawImage(img,0,0);x.globalCompositeOperation='source-in';x.fillStyle=color;x.fillRect(0,0,c.width,c.height);return c}
function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0,l=(mx+mn)/2;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6}return[h,s,l]}
function hsl2rgb(h,s,l){if(!s)return[l*255,l*255,l*255];const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q,f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p};return[f(h+1/3)*255,f(h)*255,f(h-1/3)*255]}
function altVersion(img){const c=mk(img.width,img.height),x=c.getContext('2d');x.drawImage(img,0,0);const d=x.getImageData(0,0,c.width,c.height),p=d.data;
  for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;let[h,s,l]=rgb2hsl(p[i],p[i+1],p[i+2]);if(l<0.13)continue;const skin=h>=0.015&&h<=0.12&&s>0.22&&l>0.25&&l<0.82;
    if(skin)continue;if(s>0.18)h=(h+0.42)%1;else if(l>0.5){h=0.0;s=0.55;l*=0.72}else{h=0.6;s=0.35}
    const[r,g,b]=hsl2rgb(h,s,l);p[i]=r;p[i+1]=g;p[i+2]=b}x.putImageData(d,0,0);return c}
function loadAssets(){return Promise.all(Object.entries(ASSETS).map(([k,src])=>new Promise(res=>{const i=new Image();i.onload=()=>{IMG[k]=i;res()};i.onerror=res;i.src=src}))).then(()=>{
  for(const id of ORDER){const c=CH[id],s=IMG[id+'_spr'];c.spr=s;c.white=silhouette(s,'#ffffff');c.blue=silhouette(s,'#5aa8ff');c.auraS=silhouette(s,c.col.aura);
    c.alt=altVersion(s);c.H=s.height;c.por=IMG[id+'_por'];c.porm=IMG[id+'_porm'];c.pors=IMG[id+'_pors'];c.head=IMG[id+'_head'];c.logo=IMG[id+'_logo'];c.stage=IMG[id+'_stage'];
    c.porDark=silhouette(c.porm,'#0a0a18');
    const an=sliceAnims(id);if(an){c.anim=an.A;c.H=an.H}}
  for(const id in FOES){const c=FOES[id],s=IMG[id+'_spr'],an=sliceAnims(id);if(!s||!an)continue;c.spr=s;c.white=silhouette(s,'#ffffff');c.blue=silhouette(s,'#5aa8ff');c.auraS=silhouette(s,c.col.aura);c.alt=altVersion(s);c.anim=an.A;c.H=an.H}
  // alternate costumes: a full second sprite set (assets/fighters/<skin>/) that plays as the same fighter
  for(const id of ORDER){const c=CH[id],k=c.skin2;if(!k)continue;const an=sliceAnims(k);if(!an)continue;
    const s2={...c,skinKey:k,anim:an.A,H:an.H};for(const n of['por','porm','pors','head','spr'])if(IMG[k+'_'+n])s2[n==='spr'?'spr':n]=IMG[k+'_'+n];
    s2.white=silhouette(s2.spr,'#ffffff');s2.blue=silhouette(s2.spr,'#5aa8ff');s2.auraS=silhouette(s2.spr,c.col.aura);s2.alt=altVersion(s2.spr);s2.porDark=silhouette(s2.porm,'#0a0a18');CH[k]=s2}})}
// the character data a player is actually using (their costume, if they picked one)
const skinned=(id,i)=>RUN&&RUN.skin&&RUN.skin[i]&&CH[id].skin2&&CH[CH[id].skin2]?CH[CH[id].skin2]:CH[id];
// PixelLab frame animations: assets/fighters/<id>/<anim>.png strips + meta.json
function sliceAnims(id){const m=typeof ASSET_DATA!=='undefined'&&ASSET_DATA['fighters_'+id+'_meta'];if(!m)return null;const A={};
  for(const[k,a]of Object.entries(m.anims)){const img=IMG['fighters_'+id+'_'+k];if(!img)continue;const fr=[];
    for(let i=0;i<a.n;i++){const c=mk(a.w,a.h);c.getContext('2d').drawImage(img,i*a.w,0,a.w,a.h,0,0,a.w,a.h);fr.push(c)}A[k]={...a,fr}}
  return Object.keys(A).length?{H:m.H,A}:null}
const FXC=new Map();
function fxCache(img){let m=FXC.get(img);if(!m){m={};FXC.set(img,m)}return m}
function sil(img,col){const m=fxCache(img);return m[col]||(m[col]=silhouette(img,col))}
// recolour a henchman: rotate the hue of clothes and hair, keep skin tones and outlines; 'whiten' turns dark clothes light
function hueOf(img,deg,sat=1,whiten=false){const m=fxCache(img),k='h'+deg+'s'+sat+(whiten?'w':'');if(m[k])return m[k];const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);
  const D=x.getImageData(0,0,c.width,c.height),d=D.data;
  for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const r=d[i]/255,g=d[i+1]/255,b=d[i+2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,dl=mx-mn;
    let h=0,s2=0;if(dl>0){s2=dl/(1-Math.abs(2*l-1)||1);h=mx===r?((g-b)/dl+6)%6:mx===g?(b-r)/dl+2:(r-g)/dl+4;h*=60}
    if(h<=52&&s2>.12&&l>.1&&l<.93)continue;// skin, including its shadows
    if(l<.07)continue;// outline
    let H2=(h+deg)%360,S2=Math.min(1,s2*sat),L2=l;if(whiten&&s2<.3&&l<.42){L2=.5+l*.9;S2=.18;H2=215}
    const q=L2<.5?L2*(1+S2):L2+S2-L2*S2,p=2*L2-q,f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p};
    d[i]=f(H2/360+1/3)*255;d[i+1]=f(H2/360)*255;d[i+2]=f(H2/360-1/3)*255}
  x.putImageData(D,0,0);return m[k]=c}
function altOf(img){const m=fxCache(img);return m.alt||(m.alt=altVersion(img))}

function drawFlag(code,x,y){x|=0;y|=0;ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,16,12);
  if(code==='br'){ctx.fillStyle='#1f9a3a';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd72a';for(let r=0;r<5;r++){const w=2+r*2;ctx.fillRect(x+7-w/2-1,y+r,w+2,1);ctx.fillRect(x+7-w/2-1,y+9-r,w+2,1)}ctx.fillStyle='#2a3a9a';ctx.fillRect(x+5,y+3,4,4);ctx.fillRect(x+6,y+2,2,6);ctx.fillRect(x+4,y+4,6,2)}
  else if(code==='jp'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,10);ctx.fillStyle='#d01c2a';ctx.fillRect(x+5,y+2,4,6);ctx.fillRect(x+4,y+3,6,4)}
  else if(code==='badge'){ctx.fillStyle='#1c2450';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd23a';ctx.fillRect(x+5,y+1,4,1);ctx.fillRect(x+4,y+2,6,5);ctx.fillRect(x+5,y+7,4,1);ctx.fillRect(x+6,y+8,2,1);ctx.fillStyle='#1c2450';ctx.fillRect(x+6,y+4,2,1)}
  else if(code==='tie'){ctx.fillStyle='#e8e6ee';ctx.fillRect(x,y,14,10);ctx.fillStyle='#1a1820';ctx.fillRect(x+6,y+1,2,2);ctx.fillRect(x+5,y+3,4,5);ctx.fillRect(x+6,y+8,2,1);ctx.fillStyle='#ffd23a';ctx.fillRect(x+1,y+1,1,8);ctx.fillRect(x+12,y+1,1,8)}
  else if(code==='pin'){ctx.fillStyle='#2a1640';ctx.fillRect(x,y,14,10);ctx.fillStyle='#fff';ctx.fillRect(x+6,y+1,2,2);ctx.fillRect(x+5,y+3,4,6);ctx.fillRect(x+6,y+9,2,1);ctx.fillStyle='#e02a2a';ctx.fillRect(x+5,y+4,4,1)}
  else if(code==='hoop'){ctx.fillStyle='#2a1640';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ff8a2a';ctx.fillRect(x+4,y+1,6,8);ctx.fillRect(x+3,y+2,8,6);ctx.fillStyle='#3a1a08';ctx.fillRect(x+6,y+1,1,8);ctx.fillRect(x+3,y+5,8,1)}
  else if(code==='crown'){ctx.fillStyle='#3a1030';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd23a';ctx.fillRect(x+3,y+5,8,3);ctx.fillRect(x+3,y+2,1,3);ctx.fillRect(x+6,y+2,2,3);ctx.fillRect(x+10,y+2,1,3);ctx.fillStyle='#e02a2a';ctx.fillRect(x+6,y+6,2,1)}
  else if(code==='cross'){ctx.fillStyle='#4a1626';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd23a';ctx.fillRect(x+6,y+1,2,8);ctx.fillRect(x+3,y+3,8,2)}
  else if(code==='unk'){ctx.fillStyle='#2a2f3a';ctx.fillRect(x,y,14,10);ctx.fillStyle='#3ae8ff';ctx.fillRect(x+5,y+2,4,1);ctx.fillRect(x+8,y+3,1,2);ctx.fillRect(x+6,y+5,2,1);ctx.fillRect(x+6,y+6,1,1);ctx.fillRect(x+6,y+8,1,1)}
  else if(code==='ru'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,4);ctx.fillStyle='#2a48b0';ctx.fillRect(x,y+3,14,4);ctx.fillStyle='#d0202a';ctx.fillRect(x,y+7,14,3)}}
function drawMirror(img,x,y){ctx.save();ctx.translate(x+img.width,y);ctx.scale(-1,1);ctx.drawImage(img,0,0);ctx.restore()}
function box(x,y,w,h,bg='rgba(10,10,30,.82)',bd='#ffd23a'){if(TA){const m=ctx.getTransform();TA.b.push({x:x+m.e,y:y+m.f,w,h})}ctx.fillStyle=bd;ctx.fillRect(x-1,y-1,w+2,h+2);ctx.fillStyle='#000';ctx.fillRect(x,y,w,h);ctx.fillStyle=bg;ctx.fillRect(x+1,y+1,w-2,h-2)}
function stripes(t,c1,c2){ctx.fillStyle=c1;ctx.fillRect(0,0,W,H);ctx.fillStyle=c2;for(let i=-H;i<W+H;i+=16){ctx.beginPath();const o=(i+t*0.5)%(W+H*2)-H;ctx.moveTo(o,0);ctx.lineTo(o+8,0);ctx.lineTo(o+8-H,H);ctx.lineTo(o-H,H);ctx.fill()}}

// ---------------- SCENES ----------------
let scene=null;const fade={a:0,dir:0,cb:null};
function go(s,...a){CEL.stop();scene=s;s.t=0;s.enter&&s.enter(...a)}
// ---------------- CELEBRATION (confetti + fireworks) ----------------
const CONF=['#ff4a5a','#ffd23a','#3ae8ff','#5ad86a','#ff8ad8','#ffffff','#9a7aff'];
const CEL={parts:[],fw:[],on:false,t:0,k:1,
  start(k=1){this.stop();this.on=true;this.t=0;this.k=k;SFX.cheer()},
  burst(n=40){for(let i=0;i<n;i++){const a=rnd(-2.6,-0.5);this.parts.push({x:W/2+rnd(-30,30),y:H*.55,vx:Math.cos(a)*rnd(1,3.2),vy:Math.sin(a)*rnd(2,4),r:rnd(0,6),vr:rnd(-.3,.3),c:CONF[i%CONF.length],w:rnd(2,4)|0,ph:rnd(0,6),g:.07})}},
  stop(){this.on=false;this.parts=[];this.fw=[]},
  rocket(){const x=rnd(28,W-28),y=rnd(18,74),c=CONF[(Math.random()*CONF.length)|0],n=22+((Math.random()*10)|0);
    for(let i=0;i<n;i++){const a=i/n*Math.PI*2,v=rnd(1.1,1.9);this.fw.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:rnd(28,42)|0,c:Math.random()<.25?'#fff':c})}
    if(AU.ctx&&SET.sound){N(.18,.22,2500,500);for(let i=0;i<5;i++)N(.03,.08,6000,3000,'highpass',.08+Math.random()*.4)}},
  update(){for(const p of this.parts){p.vy=p.g?p.vy+p.g:p.vy;if(p.g&&p.vy>1.2){p.g=0;p.vy=rnd(.6,1.2)}p.x+=p.vx+Math.sin(this.t*.1+p.ph)*.35;p.vx*=.98;p.y+=p.vy;p.r+=p.vr}
    this.parts=this.parts.filter(p=>p.y<H+6);
    for(const f of this.fw){f.x+=f.vx;f.y+=f.vy;f.vy+=.035;f.vx*=.975;f.vy*=.975;f.l--}this.fw=this.fw.filter(f=>f.l>0);
    if(!this.on)return;this.t++;
    if(this.t<600)for(let i=0;i<this.k*1.5;i++)if(Math.random()<.8)this.parts.push({x:rnd(-10,W+10),y:-4,vx:rnd(-.3,.3),vy:rnd(.55,1.3),r:rnd(0,6),vr:rnd(-.25,.25),c:CONF[(Math.random()*CONF.length)|0],w:rnd(2,4)|0,ph:rnd(0,6)});
    if(this.t%Math.round(34/this.k)===8)this.rocket()},
  draw(){for(const f of this.fw){ctx.globalAlpha=Math.min(1,f.l/14);ctx.fillStyle=f.c;ctx.fillRect(f.x|0,f.y|0,2,2)}ctx.globalAlpha=1;
    for(const p of this.parts){ctx.fillStyle=p.c;const h=Math.max(1,Math.round(Math.abs(Math.cos(p.r))*p.w));ctx.fillRect(Math.round(p.x),Math.round(p.y),p.w,h)}}};
function goFade(fn,spd=0.1){if(fade.dir)return;fade.dir=1;fade.cb=fn;fade.spd=spd}

const Power={update(){if(ASSETS_READY&&(anyPress()||pressed.b||pressed.select)){$('led').classList.add('on');go(Boot)}},
  draw(){ctx.fillStyle='#16181c';ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(255,255,255,.02)';for(let y=0;y<H;y+=3)ctx.fillRect(0,y,W,1);
    if(!ASSETS_READY){drawText('LOADING...',128,92,'#556',1,{align:'center',shadow:false});return}
    if((this.t>>5)&1)drawText('PRESS START',128,90,'#4a5260',1,{align:'center',shadow:false});drawText('BONFIRE BASH  V'+VER,128,120,'#3c4350',1,{align:'center',shadow:false});drawText('TAP ANY BUTTON TO POWER ON',128,176,'#2c3038',1,{align:'center',shadow:false})}};

const Boot={update(){if(this.t===74)SFX.ding();if(this.t>160||(this.t>20&&anyPress()))goFade(()=>go(Intro))},
  draw(){ctx.fillStyle='#ebe9e1';ctx.fillRect(0,0,W,H);const y=Math.min(74,-24+this.t*1.35);
    drawText('DOJO BOY',128,y,'#2a2a6a',3,{align:'center',shadow:false});
    if(this.t>74){drawText('ADVANCED',128,y+25,'#8b2d6b',2,{align:'center',shadow:false});ctx.fillStyle='#8b2d6b';ctx.fillRect(70,y+43,116,1);
      drawText('PIXEL FIGHT SYSTEM',128,y+47,'#2d3a8b',1,{align:'center',shadow:false});ctx.fillStyle='#2d3a8b';ctx.fillRect(70,y+57,116,1);drawText('BONFIRE BASH V'+VER,128,y+63,'#2a2a6a',1,{align:'center',shadow:false})}}};

const Intro={enter(){this.slam=-1},
  update(){const t=this.t;if(t>10&&anyPress()){goFade(()=>go(Title));return}
    if(t===20||t===70||t===120)SFX.thud();
    if(t>=190&&t<410){const k=Math.floor((t-190)/22);if(k!==this.slam&&k<ORDER.length){this.slam=k;SFX.heavy();SFX.whooshH()}}
    if(t===400)say('Bonfire Bash!',1,0.5);
    if(t===430)goFade(()=>go(Title),0.06)},
  draw(){const t=this.t;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
    if(t<185){const NW=['','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN'][ORDER.length]||ORDER.length,lines=[[NW+' FIGHTERS.',20],[NW+' STYLES.',70],['ONE CHAMPION.',120]];
      lines.forEach(([s,st],i)=>{if(t>=st){const a=Math.min(1,(t-st)/8);ctx.globalAlpha=a;drawText(s,128,62+i*24,i===2?'#fff':'#bbb',i===2?2:1,i===2?{align:'center',grad:FIRE,outline:'#400'}:{align:'center'});ctx.globalAlpha=1}});return}
    const cols=['#7a1a1a','#2a1a5a','#1a2a6a','#1a5a2a','#14324a'],N=ORDER.length,PW=W/N;
    for(let i=0;i<N;i++){const st=190+i*22;if(t<st)continue;const p=Math.min(1,(t-st)/8),c=CH[ORDER[i]],x0=Math.round(i*PW),pw=Math.round((i+1)*PW)-x0;
      ctx.save();ctx.beginPath();ctx.rect(x0,0,pw,H);ctx.clip();ctx.fillStyle=cols[i%cols.length];ctx.fillRect(x0,0,pw,H);
      ctx.fillStyle='rgba(255,255,255,.07)';for(let y=(t*2)%12;y<H;y+=12)ctx.fillRect(x0,y,pw,4);
      const dir=i%2?1:-1,ox=(1-p)*80*dir,img=c.porm;ctx.drawImage(img,Math.round(x0+pw/2-img.width/2+ox),H-img.height-18);
      if(t-st<4){ctx.fillStyle='rgba(255,255,255,.8)';ctx.fillRect(x0,0,pw,H)}ctx.restore();
      if(p>=1){const lg=c.logo,lw=pw-4;ctx.drawImage(lg,0,0,lg.width,lg.height,x0+2,H-28,lw,Math.round(lg.height*lw/lg.width))}}
    ctx.fillStyle='#000';for(let i=1;i<N;i++)ctx.fillRect(Math.round(i*PW)-1,0,2,H);
    if(t>395){ctx.fillStyle=`rgba(255,255,255,${Math.min(1,(t-395)/12)})`;ctx.fillRect(0,0,W,H)}}};

const Title={enter(){setTwo(false);this.ph='press';this.sel=0;this.petals=Array.from({length:18},()=>({x:rnd(0,W),y:rnd(0,H),v:rnd(.3,.8),s:rnd(0,6)}));playMusic('title')},
  items:['STORY','ARCADE','VERSUS CPU','ONLINE','TRAINING','TRIALS','RECORDS','OPTIONS'],
  update(){if(this.ph==='press'){if(anyPress()){SFX.start();this.ph='menu';say('Bonfire Bash',1,0.5)}return}
    const n=this.items.length;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
    if(pressed.b){this.ph='press';SFX.back()}
    if(pressed.a||pressed.start){SFX.ok();const s=this.sel;const it=this.items[s];if(it==='OPTIONS')go(Options);else if(it==='RECORDS')go(Records);else if(it==='ONLINE'){Online.ph='menu';goFade(()=>go(Online))}else goFade(()=>go(Select,{STORY:'story',ARCADE:'arcade','VERSUS CPU':'vs',TRAINING:'training',TRIALS:'trials'}[it]))}},
  draw(){const t=this.t;ctx.drawImage(CH.karl.stage,0,0);ctx.fillStyle='rgba(8,6,24,.55)';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ffc0d8';for(const p of this.petals){p.y+=p.v;p.x+=Math.sin((t+p.s*30)/30)*0.4-0.2;if(p.y>H){p.y=-4;p.x=rnd(0,W)}ctx.fillRect(p.x|0,p.y|0,2,2)}
    ORDER.forEach((id,i)=>{const im=CH[id].pors;ctx.drawImage(im,Math.round(-8+i*W/ORDER.length),H-im.height)});
    ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(0,H-6,W,6);
    const bob=Math.round(Math.sin(t/20)*1.5);
    drawText('BONFIRE',128,10+bob,'#fff',4,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});
    drawText('BASH',128,42+bob,'#fff',5,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});
    ctx.fillStyle='#d0301a';ctx.fillRect(64,80+bob,128,2);
    drawText('PIXEL FIGHTERS',128,86,'#ffe66a',1,{align:'center'});
    {const v='VERSION '+VER,w=textW(v)+8;ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(W-w-2,H-12,w,11);drawText(v,W-6,H-10,'#ffe66a',1,{align:'right',shadow:false})}
    if(this.ph==='press'){if((t>>4)&1)drawText('PRESS START',128,100,'#fff',1,{align:'center',outline:'#000'})}
    else{box(80,95,96,this.items.length*10+5);this.items.forEach((s,i)=>{const on=i===this.sel;drawText((on?'> ':'  ')+s,86,99+i*10,on?'#ffe66a':'#aab',1)})}}};

const Options={enter(){this.sel=0},
  rows(){return[['DIFFICULTY',['EASY','NORMAL','HARD'][SET.diff]],['MUSIC',SET.music?'ON':'OFF'],['SOUND FX',SET.sound?'ON':'OFF'],['ANNOUNCER',SET.voice?'ON':'OFF'],['BACK','']]},
  update(){const n=5;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
    const ch=pressed.left?-1:pressed.right||pressed.a?1:0;
    if(pressed.b||((pressed.a||pressed.start)&&this.sel===4)){saveSet();SFX.back();go(Title);Title.ph='menu';Title.sel=Title.items.indexOf('OPTIONS');return}
    if(ch){if(this.sel===0)SET.diff=(SET.diff+3+ch)%3;if(this.sel===1){SET.music=!SET.music;if(TRACK.gain)TRACK.gain.gain.value=SET.music?0.5:0}if(this.sel===2)SET.sound=!SET.sound;if(this.sel===3){SET.voice=!SET.voice;if(SET.voice)say('Announcer on')}SFX.move();saveSet()}},
  draw(){stripes(this.t,'#14123a','#1b1848');drawText('OPTIONS',128,16,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});box(30,46,196,108);
    this.rows().forEach(([k,v],i)=>{const on=i===this.sel,y=58+i*18;drawText((on?'> ':'  ')+k,40,y,on?'#ffe66a':'#aab');if(v)drawText((on?'< ':'')+v+(on?' >':''),214,y,on?'#fff':'#889',1,{align:'right'})});
    drawText('LEFT/RIGHT: CHANGE   B: BACK',128,172,'#778',1,{align:'center'});drawText('BONFIRE BASH V'+VER,128,182,'#556',1,{align:'center',shadow:false})}};

// ---------------- SELECT ----------------
let RUN=null;
const Select={enter(mode){this.mode=mode;setTwo(mode==='2p');this.ph='p1';this.det=0;this.dt=0;this.cur=this.cur||0;this.p1=null;this.done=0;this.slide=20;this.alt=[false,false];this.skin=[false,false];playMusic('select')},
  solo(){return this.mode==='arcade'||this.mode==='trials'||this.mode==='story'},
  // browse a big grid; A opens the fighter's full card (det); A again confirms, B goes back to the grid
  update(){if(this.done){if(++this.done>50){goFade(()=>this.finish())}return}
    const P=pressed,N=ORDER.length,pi=this.ph==='p1'?0:1,C=3;
    if(!this.det){
      if(P.left){this.cur=(this.cur+N-1)%N;this.slide=16;SFX.move()}if(P.right){this.cur=(this.cur+1)%N;this.slide=16;SFX.move()}
      if(P.up){this.cur=(this.cur-C+N*C)%N;this.slide=16;SFX.move()}if(P.down){this.cur=(this.cur+C)%N;this.slide=16;SFX.move()}}
    if(P.select&&CH[ORDER[this.cur]].skin2&&CH[CH[ORDER[this.cur]].skin2]){this.skin[pi]=!this.skin[pi];SFX.move()}
    else if(P.select&&rc(ORDER[this.cur]).clear>0){this.alt[pi]=!this.alt[pi];SFX.move()}// unlocked by clearing arcade
    if(P.b){SFX.back();if(this.det){this.det=0;return}if(this.ph==='p2'){this.ph='p1';this.cur=ORDER.indexOf(this.p1)}else goFade(()=>{go(Title);Title.ph='menu'});return}
    if(P.a||P.start){const id=ORDER[this.cur];
      if(!this.det){this.det=1;this.dt=0;SFX.ok();sayName(id);return}
      SFX.start();this.det=1;
      if(this.ph==='p1'){this.p1=id;if(!this.solo()){this.ph='p2';this.det=0;this.cur=(this.cur+1)%ORDER.length}else this.done=1}else{this.p2=id;this.done=1}}
    if(this.det)this.dt=Math.min(8,(this.dt||0)+1);if(this.slide>0)this.slide-=2},
  finish(){const alt=[this.alt[0]&&rc(this.p1).clear>0,!!(this.p2&&this.alt[1]&&rc(this.p2).clear>0)],skin=[this.skin[0]&&!!CH[this.p1].skin2,!!(this.p2&&this.skin[1]&&CH[this.p2].skin2)];
    if(this.mode==='story'){startStory(this.p1,alt,skin);return}
    if(this.mode==='arcade'){const opp=ORDER.filter(i=>i!==this.p1).sort(()=>Math.random()-.5);RUN={mode:'arcade',p1:this.p1,ladder:opp,idx:0,cont:0,alt,skin}}
    else if(this.mode==='trials')RUN={mode:'trials',p1:this.p1,ladder:[this.p1==='ivan'?'karl':'ivan'],idx:0,cont:0,alt,skin};
    else RUN={mode:this.mode,p1:this.p1,ladder:[this.p2],idx:0,cont:0,alt,skin,score:[0,0]};
    if(this.mode==='training'||this.mode==='trials')startFight();else go(VS)},
  draw(){const t=this.t,id=ORDER[this.cur],c=CH[id],pi=this.ph==='p1'?0:1,sk=c.skin2&&this.skin[pi]&&CH[c.skin2]?CH[c.skin2]:c,A=arch(c);stripes(t,'#120f30','#191540');
    const title=this.ph==='p1'?'SELECT YOUR FIGHTER':'CHOOSE YOUR OPPONENT';drawText(title,128,4,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});ctx.fillStyle='#d0301a';ctx.fillRect(40,13,176,1);
    const unl=rc(id).clear>0,hint=c.skin2&&CH[c.skin2]?'SELECT: '+(this.skin[pi]?'FOX SKIN':'COSTUME 1'):unl?'SELECT: COLOR '+(this.alt[pi]?'2':'1'):'';
    const stats=(x,y,gap)=>['SPD','PWR','DEF'].forEach((k,j)=>{const yy=y+j*gap;drawText(k,x,yy,'#99a',1,{shadow:false});for(let q=0;q<5;q++){ctx.fillStyle=q<c.stats[j]?'#ffd23a':'#333';ctx.fillRect(x+21+q*5,yy+1,4,5)}});
    if(!this.det){
      // left: the highlighted fighter, a medium portrait over the basics
      ctx.save();ctx.beginPath();ctx.rect(2,17,100,108);ctx.clip();const sg=ctx.createRadialGradient(52,70,4,52,70,70);sg.addColorStop(0,c.col.aura+'55');sg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sg;ctx.fillRect(2,17,100,108);
      const pm=sk.porm,px=Math.round(52-pm.width/2-this.slide),py=125-pm.height;if(this.ph==='p2')drawMirror(pm,px,py);else ctx.drawImage(pm,px,py);ctx.restore();
      ctx.fillStyle='#d0301a';ctx.fillRect(2,125,100,1);
      drawText(c.name,52,129,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});drawText(A.type||c.style,52,139,'#7aff8a',1,{align:'center',shadow:false});
      stats(18,150,9);
      drawText('A: DETAILS',52,181,'#ffe66a',1,{align:'center',outline:'#000'});
      // right: the roster grid, as big as the space allows
      const N=ORDER.length,C=3,R=Math.ceil(N/C),gx=106,gy=17,gw=148,gh=173,cw=Math.floor((gw-(C-1)*3)/C),ch=Math.floor((gh-(R-1)*3)/R);
      ORDER.forEach((oid,i)=>{const on=i===this.cur,x=gx+(i%C)*(cw+3),y=gy+Math.floor(i/C)*(ch+3),o=CH[oid],ps=(o.skin2&&this.skin[pi]&&on&&CH[o.skin2]?CH[o.skin2]:o).pors;
        ctx.fillStyle=on?(this.ph==='p1'?'#ff3a3a':'#3aa0ff'):'#000';ctx.fillRect(x-1,y-1,cw+2,ch+2);ctx.fillStyle='#1c1838';ctx.fillRect(x,y,cw,ch);
        const sw=Math.min(cw,ps.width),sh=Math.min(ch,ps.height);ctx.drawImage(ps,Math.round((ps.width-sw)/2),0,sw,sh,x+Math.round((cw-sw)/2),y,sw,sh);
        if(!on){ctx.fillStyle='rgba(8,6,24,.42)';ctx.fillRect(x,y,cw,ch)}
        if(this.ph==='p2'&&oid===this.p1){ctx.fillStyle='#e03030';ctx.fillRect(x,y+ch-8,13,8);drawText('1P',x+1,y+ch-8,'#fff',1,{shadow:false})}
        if(rc(oid).clear>0)drawText('*',x+cw-6,y+1,'#ffd23a',1,{outline:'#000'});
        if(on&&((t>>3)&1)){ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.strokeRect(x-1.5,y-1.5,cw+3,ch+3)}});
      if(hint)drawText(hint,4,17,'#ffe66a',1,{outline:'#000'});
      return}
    // full card: the portrait shrinks to the corner, the details take the screen
    const k=Math.min(1,(this.dt||8)/8),ox=Math.round((1-k)*30);
    ctx.globalAlpha=k;ctx.fillStyle='#000';ctx.fillRect(3,17,68,84);ctx.fillStyle=c.col.aura;ctx.fillRect(4,18,66,82);
    const ps=sk.pors;ctx.save();ctx.beginPath();ctx.rect(4,18,66,82);ctx.clip();if(this.ph==='p2')drawMirror(ps,4+Math.round((66-ps.width)/2),18);else ctx.drawImage(ps,4+Math.round((66-ps.width)/2),18);ctx.restore();
    if(this.done&&this.done<8){ctx.globalAlpha=.7;ctx.drawImage(silhouette(ps,'#fff'),4+Math.round((66-ps.width)/2),18);ctx.globalAlpha=k}
    drawText(this.ph==='p1'?'1P':({vs:'CPU',training:'DUMMY'}[this.mode]||'2P'),37,104,this.ph==='p1'?'#ff5a5a':'#5ab4ff',1,{align:'center',outline:'#000'});
    stats(6,118,10);
    drawText('A: CONFIRM',37,160,'#ffe66a',1,{align:'center',outline:'#000'});drawText('B: BACK',37,170,'#aab',1,{align:'center',outline:'#000'});
    const X=78+ox;ctx.drawImage(c.logo,X,17);drawFlag(c.flag,238,21);drawText(c.nick,X+2,55,'#ffe66a',1,{outline:'#000'});
    const rows=[['STYLE',c.style],['FROM',c.country],['TYPE',A.type||'-'],['HEIGHT',c.ht.replace(/ \(.*\)/,'')],['WEIGHT',c.wt.replace(/ \(.*\)/,'')]];
    const lines=[];if(A.trait)for(const l of wrap(A.trait,28))lines.push({s:l,c:'#7aff8a'});
    lines.push({k:'SP',s:c.spName,c:'#ff9a6a'});if(c.sp2Name)lines.push({k:'DN+SP',s:c.sp2Name,c:'#7ad8ff'});if(c.sp3Name)lines.push({k:'BK+SP',s:c.sp3Name,c:'#ff7a8a'});
    lines.push({k:'SUPER',s:SUPER_NAME[c.id]||'-',c:'#ff8ad8'});
    const bh=8+rows.length*9+4+lines.length*9;box(X,65,254-X,bh);
    rows.forEach(([kk,v],i)=>{const y=69+i*9;drawText(kk,X+4,y,'#99a',1,{shadow:false});drawText(':',X+46,y,'#99a',1,{shadow:false});drawText(v,X+52,y,'#fff',1,{shadow:false})});
    const y0=69+rows.length*9+4;ctx.fillStyle='#3a3460';ctx.fillRect(X+4,y0-3,254-X-8,1);
    lines.forEach((l,i)=>{const y=y0+i*9;if(l.k){drawText(l.k,X+4,y,l.c,1,{shadow:false});drawText(l.s,X+42,y,l.c,1,{shadow:false})}else drawText(l.s,X+4,y,l.c,1,{shadow:false})});
    if(hint)drawText(hint,X+4,Math.min(183,65+bh+5),'#ffe66a',1,{outline:'#000'});
    ctx.globalAlpha=1}};

// ---------------- VS SCREEN ----------------
const VS={enter(){this.a=skinned(RUN.p1,0);this.b=skinned(RUN.ladder[RUN.idx],1);playMusic('select');sayVs(this.a.id,this.b.id)},
  update(){if(this.t===14)SFX.heavy();if(this.t===40)SFX.slam();if(this.t>190||(this.t>40&&anyPress()))goFade(()=>startFight())},
  draw(){const t=this.t;ctx.fillStyle='#5a0c12';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0c1c5a';ctx.beginPath();ctx.moveTo(150,0);ctx.lineTo(W,0);ctx.lineTo(W,H);ctx.lineTo(106,H);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.06)';for(let y=(t*3)%10;y<H;y+=10)ctx.fillRect(0,y,W,3);
    const p=Math.min(1,t/14),ea=1-Math.pow(1-p,3),a=this.a.por,b=this.b.por;
    ctx.drawImage(a,Math.round(-130+130*ea)-8,H-a.height);drawMirror(b,Math.round(W+130-130*ea-b.width+8),H-b.height);
    ctx.drawImage(this.a.logo,4,4);ctx.drawImage(this.b.logo,W-this.b.logo.width-4,4);
    if(t>=40){const s=t<46?7-(t-40)*0.3:5;drawText('VS',128,74-s*3.5,'#fff',Math.round(s),{align:'center',grad:FIRE,outline:'#200',ow:1});if(t<44){ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillRect(0,0,W,H)}}
    if(RUN.mode==='arcade')drawText(`STAGE ${RUN.idx+1}/${RUN.ladder.length}`,128,170,'#fff',1,{align:'center',outline:'#000'});
    drawText(this.b.stageName,128,182,'#ffe66a',1,{align:'center',outline:'#000'})}};

// ---------------- FIGHT ENGINE ----------------
// a normal that whiffs (hits nothing, not even a block) recovers 3 frames slower: mashing is punishable
const WHIFF=3;
const ATK={
  jab:{s:4,a:4,r:10,dmg:4,reach:48,hy:.7,hh:16,stun:15,bs:9,kb:2,limb:'arm',lv:'mid'},
  kick:{s:7,a:5,r:16,dmg:7,reach:60,hy:.5,hh:18,stun:19,bs:11,kb:3,limb:'leg',lv:'mid'},
  cjab:{s:4,a:4,r:10,dmg:4,reach:46,hy:.62,hh:14,stun:14,bs:8,kb:1.8,limb:'arm',lv:'mid',crouch:true},
  sweep:{s:8,a:6,r:20,dmg:8,reach:62,hy:.1,hh:14,stun:0,bs:12,kb:2,limb:'leg',lv:'low',knock:true,crouch:true},
  jpunch:{s:3,a:10,r:0,dmg:6,reach:44,hy:.42,hh:22,stun:17,bs:9,kb:2,limb:'arm',lv:'high',air:true},
  jkick:{s:4,a:12,r:0,dmg:8,reach:52,hy:.22,hh:22,stun:19,bs:10,kb:2.6,limb:'leg',lv:'high',air:true},
};
let F=null,atkId=0;
class Fighter{constructor(id,side,cpu,alt){const c=CH[id];this.c=c;this.side=side;this.cpu=cpu;this.alt=alt;this.img=alt?c.alt:c.spr;this.H=c.H;
  this.x=side?180:76;this.y=0;this.vx=0;this.vy=0;this.face=side?-1:1;this.hp=this.mhp=(ARCH[c.id]&&ARCH[c.id].hp)||100;this.trail=this.mhp;this.state='idle';this.st=0;this.atk=null;this.ast=0;
  this.stun=0;this.crouch=false;this.inv=0;this.combo=0;this.comboT=0;this.spCD=0;this.spCD2=0;this.spCD3=0;this.meter=0;this.flash=0;this.hist=[];this.ghosts=[];this.lastA=-99;this.lastB=-99;this.ai={t:0,dur:0,plan:null};this.sp=null;this.hitDone=false}
  get h(){return this.crouch?this.H*(arch(this.c).crouchH||.7):this.H}
  hurt(){const hw=(HBX[this.c.id]&&HBX[this.c.id].hw)||15;return{x1:this.x-hw,x2:this.x+hw,y1:this.y,y2:this.y+this.h}}}
// hitboxes measured from each fighter's own sprites (tools/hitboxes.py): reach to the fist/foot + 4 px, and the height band the limb covers
const HBX=(typeof ASSET_DATA!=='undefined'&&ASSET_DATA.hitboxes)||{};
const ground=f=>f.y<=0&&f.state!=='jump'&&f.state!=='knock';
const canAct=f=>['idle','walk','crouch'].includes(f.state)||(f.state==='land'&&f.st>2);
const overlap=(a,b)=>a.x1<b.x2&&a.x2>b.x1&&a.y1<b.y2&&a.y2>b.y1;
function phaseOf(f){const a=f.atk;if(!a)return null;const t=a.air?f.ast:f.st;return t<a.s?'start':t<a.s+a.a?'active':'rec'}
function setS(f,s){if(f.state!==s){f.state=s;f.st=0}}
function qcb(h){let st=0;for(let i=Math.max(0,h.length-16);i<h.length;i++){const d=h[i];if(st===0&&d===2)st=1;else if(st===1&&(d===1||d===4))st=d===4?3:2;else if(st===2&&d===4)st=3}return st===3}
function qcf(h){let st=0;for(let i=Math.max(0,h.length-16);i<h.length;i++){const d=h[i];if(st===0&&d===2)st=1;else if(st===1&&(d===3||d===6))st=d===6?3:2;else if(st===2&&d===6)st=3}return st===3}
// ---- input & cancel rules ----
// BUF: a button pressed up to this many frames early still comes out (input buffer).
// CHAIN: normals that can be cancelled into other normals once they connect (hit or block).
// Any grounded normal except the sweep can also be cancelled into the special once it connects.
const BUF=7,MAXCHAIN=3,CHAIN={jab:['jab','cjab','kick','sweep'],cjab:['cjab','jab','sweep','kick'],jpunch:['jkick']};
function cancelOk(f){const a=f.atk;if(!a||!f.hitDone)return false;const t=a.air?f.ast:f.st;return t>=a.s&&t<a.s+a.a+Math.max(6,a.r)}
function burst(f,o){f.burstOK=false;f.state=f.y>0?'jump':'idle';f.st=0;f.stun=0;f.vy=f.y>0?2:0;f.atk=null;f.inv=30;f.jug=0;f.vx=0;
  const dir=o.x>=f.x?1:-1;o.combo=0;o.comboT=0;o.ips=false;o.atk=null;o.sp=null;o.state='hurt';o.st=0;o.stun=22;o.vx=dir*4.2;o.hurtK='mid';
  F.hitstop=8;F.shake=7;SFX.burst();addText('BURST!',f.x,GY-f.y-f.H-12,'#3ae8ff');
  for(let i=0;i<24;i++){const a=i/24*Math.PI*2;F.parts.push({x:f.x+Math.cos(a)*10,y:GY-f.y-f.H*.5+Math.sin(a)*10,vx:Math.cos(a)*3,vy:Math.sin(a)*3,l:18,c:i%2?'#3ae8ff':'#ffffff',g:0})}}
function control(f,o,inp){
  const fwd=f.face>0?inp.r:inp.l,back=f.face>0?inp.l:inp.r,upE=inp.u&&!f.pu;f.pu=inp.u;
  f.hist.push(inp.d?(fwd?3:back?1:2):inp.u?(fwd?9:back?7:8):fwd?6:back?4:5);if(f.hist.length>24)f.hist.shift();
  if(inp.aP){f.lastA=frameNo;f.bufA=frameNo}if(inp.bP){f.lastB=frameNo;f.bufB=frameNo}
  const tch=TOUCHY&&!f.cpu&&!NET.lock&&f.side===0&&!TWO,BF=tch?BUF+4:BUF;// touch: 11-frame buffer, 6-frame A+B window
  const bA=frameNo-(f.bufA??-99)<=BF,bB=frameNo-(f.bufB??-99)<=BF,btn=bA||bB,use=()=>{f.bufA=f.bufB=-99};
  const both=Math.abs(f.lastA-f.lastB)<=(tch?6:4)&&frameNo-Math.max(f.lastA,f.lastB)<=BF;
  // BURST: A or B (buffered, so a press during hit-stop counts) breaks out of a detected loop
  if(f.burstOK){if(!['hurt','knock'].includes(f.state)||!o.ips||o.state==='slamming'||(o.sp&&o.sp.kind==='super'))f.burstOK=false;else if(btn){use();burst(f,o);return}}
  const wantSp2=!(f.cuffed>0)&&f.c.special2&&(inp.sp2||(btn&&both&&inp.d)||(inp.bP&&qcb(f.hist)));
  const wantSp3=!(f.cuffed>0)&&!wantSp2&&f.c.special3&&(inp.sp3||(btn&&both&&back&&!inp.d));
  const wantSp=!(f.cuffed>0)&&!wantSp2&&!wantSp3&&(inp.sp||(btn&&both)||((inp.aP||inp.bP)&&qcf(f.hist)));
  // double-tap dash detection (edges of forward/back)
  const fe=fwd&&!f.pf,be=back&&!f.pb;f.pf=fwd;f.pb=back;
  let dash=0;if(f.cpu)dash=inp.dash||0;else{if(fe){dash=frameNo-(f.tapF??-99)<=10?1:0;f.tapF=frameNo}if(be){dash=frameNo-(f.tapB??-99)<=10?-1:dash;f.tapB=frameNo}}
  f.holdBack=!!back&&!inp.u;f.holdDown=!!inp.d;
  // throw break: press A or B while being grabbed, before the throw goes off
  if(f.state==='grabbed'){if(btn&&o.state==='throwing'&&o.thr===f&&o.st<15){use();techThrow(o,f)}return}
  // super: forward + A+B with a full meter
  const cuffed=f.cuffed>0,wantSup=!cuffed&&f.meter>=100&&(inp.sup||(btn&&both&&fwd&&!inp.d));
  if(f.state==='attack'){const a=f.atk;
    if(wantSup&&(f.st<5||cancelOk(f))){use();startSpecial(f,o,3);return}
    // A+B pressed together: the first button's normal is cancelled straight into the special (kara cancel),
    // or any connected normal is special-cancelled.
    if(wantSp&&f.spCD<=0&&a.name!=='sweep'&&(f.st<5||cancelOk(f))){use();startSpecial(f,o);return}
    if(wantSp2&&f.spCD2<=0&&a.name!=='sweep'&&(f.st<5||cancelOk(f))){use();startSpecial(f,o,2);return}
    if(wantSp3&&f.spCD3<=0&&a.name!=='sweep'&&(f.st<5||cancelOk(f))){use();startSpecial(f,o,4);return}
    if(btn&&cancelOk(f)&&(f.chain||0)<(arch(f.c).chain||MAXCHAIN)){const want=bA?(inp.d?'cjab':'jab'):(inp.d?'sweep':'kick');
      if((CHAIN[a.name]||[]).includes(want)){use();f.chain=(f.chain||0)+1;startAtk(f,want);return}}
    return}
  if(f.state==='jump'&&upE&&arch(f.c).dj&&!f.dj&&f.st>5&&!f.atk){f.dj=1;f.vy=4.8;f.vx=(fwd?1:back?-1:0)*f.face*1.9*f.c.speed;SFX.jump();f.ghosts.push({x:f.x,y:f.y,l:12});return}
  if(f.state==='jump'){if(btn){if(!f.atk){use();startAtk(f,bB?'jkick':'jpunch')}else if(bB&&cancelOk(f)&&f.atk.name==='jpunch'){use();startAtk(f,'jkick')}}return}
  if(!canAct(f))return;
  f.chain=0;
  if(wantSup){use();startSpecial(f,o,3);return}
  if(wantSp2&&f.spCD2<=0){use();startSpecial(f,o,2);return}
  if(wantSp3&&f.spCD3<=0){use();startSpecial(f,o,4);return}
  if(wantSp&&f.spCD<=0){use();startSpecial(f,o);return}
  // throw: forward or back + B right next to a grounded opponent who isn't reeling
  if(bB&&(fwd||back)&&!inp.d&&canThrow(f,o)){use();startThrow(f,o,!!back);return}
  if(bA){use();startAtk(f,inp.d?'cjab':'jab');return}
  if(bB){use();startAtk(f,inp.d?'sweep':'kick');return}
  if(dash&&!inp.d&&!inp.u){setS(f,'dash');f.st=0;f.dashDir=dash;f.vx=f.face*dash*(dash>0?4.6:4.0)*Math.min(1.15,f.c.speed)*(arch(f.c).dash||1);f.crouch=false;if(dash<0)f.inv=7;SFX.whoosh();dust(f.x,3);return}
  if(inp.u){setS(f,'prejump');f.crouch=false;f.jdir=fwd?1:back?-1:0;f.vx=0;return}
  if(inp.d){f.crouch=true;setS(f,'crouch');f.vx=0;return}
  f.crouch=false;
  if(fwd){setS(f,'walk');f.vx=f.face*1.35*f.c.speed*(f.buff>0?1.2:1)}else if(back){setS(f,'walk');f.vx=-f.face*1.05*f.c.speed}else{setS(f,'idle');f.vx=0}}
function startAtk(f,n){f.atk={...ATK[n],name:n,id:++atkId};f.atk.reach*=arch(f.c).reach||1;f.atk.hh*=arch(f.c).hh||1;
  {const m=HBX[f.c.id]&&HBX[f.c.id].moves[n];if(m){f.atk.tip=m.reach-6;f.atk.reach=arch(f.c).amp?Math.max(m.reach,f.atk.reach):m.reach;f.atk.y1=m.y1;f.atk.y2=m.y2}}if(arch(f.c).slow){f.atk.s+=arch(f.c).slow;f.atk.r+=2}f.hitDone=false;if(f.atk.air)f.ast=0;else{f.state='attack';f.st=0;f.vx=0;f.crouch=!!f.atk.crouch}
  (n==='kick'||n==='sweep'||n==='jkick'?SFX.whooshH:SFX.whoosh)()}
const canThrow=(f,o)=>Math.abs(o.x-f.x)<48&&o.y<=0&&f.y<=0&&o.inv<=0&&!(o.throwInv>0)&&['idle','walk','crouch','attack','land','dash','prejump'].includes(o.state)&&!(o.state==='attack'&&phaseOf(o)==='active');
function startThrow(f,o,back){f.state='throwing';f.st=0;f.vx=0;f.atk=null;f.crouch=false;f.thBack=back;f.thr=null;f.thrId=++atkId;SFX.whoosh()}
function techThrow(a,d){a.thr=null;a.grabbed=null;for(const f of[a,d]){f.state='block';f.st=0;f.stun=14;f.vx=-f.face*3.2;f.rot=0;f.y=0;f.throwInv=30}
  addText('THROW BREAK!',(a.x+d.x)/2,GY-a.H-12,'#7ad8ff');sparks((a.x+d.x)/2,GY-a.H*.6,'#ffffff',10);SFX.block();F.hitstop=6;if(!d.cpu)badge('tech')}
function startSpecial(f,o,which=1){if(which===3)return startSuper(f,o);const kind=which===4?f.c.special3:which===2?f.c.special2:f.c.special,name=which===4?f.c.sp3Name:which===2?f.c.sp2Name:f.c.spName;
  const R=(f.rep||(f.rep={}))[kind]||{n:-1,t:-999};R.n=frameNo-R.t<300?R.n+1:0;R.t=frameNo;f.rep[kind]=R;
  f.state='special';f.st=0;f.vx=0;f.crouch=false;f.atk=null;f.sp={kind,two:which===2,hits:0,last:-99,id:++atkId,dim:Math.max(.55,1-.15*R.n)};
  if(which===4)f.spCD3=SPCD[kind]||120;else if(which===2)f.spCD2=SPCD[kind]||90;else f.spCD=SPCD[kind]||75;
  if(kind==='strike')f.spCD2=Math.max(f.spCD2||0,40);if(kind==='split')f.spCD=Math.max(f.spCD||0,40);// Zeke: no instant low -> overhead switch
  F.superFlash=10;F.superBy=f;SFX.special();addText(name+'!',f.x,GY-f.H-14,f.c.col.aura);
  if(kind==='step')f.inv=20;if(kind==='rising')f.inv=7;if(kind==='takeover')f.inv=9;if(kind==='powersuit')f.inv=16;if(kind==='replay'){f.inv=24;f.sp.path=(f.rh||[]).slice(-90).reverse();SFX.rewind()}
  if(kind==='charge')f.sp.armor=1;
  fighterVoice(f,which===4?'sp3':which===2?'sp2':'sp1')}
// ---- SUPER: cinematic freeze, then a dash that locks into a 6-hit flurry ----
function startSuper(f,o){f.meter=0;f.state='special';f.st=0;f.vx=0;f.crouch=false;f.atk=null;f.sp={kind:'super',hits:0,last:-99,id:++atkId};
  F.cine={by:f,t:0,n:46};f.inv=18;SFX.superS();fighterVoice(f,'super')}
function trialHit(att,tag,id){const T=F.trial;if(!T||T.clear||T.done)return;const seq=TRIALS[att.c.id][T.i];if(!seq||id===T.lastId)return;T.lastId=id;
  if(att.combo<=1)T.step=0;
  if(seq[T.step]===tag){T.step++;if(T.step>=seq.length){T.clear=80;SFX.start();CEL.burst(30);addText('CLEAR!',att.x,GY-att.H-14,'#7aff8a')}}else T.step=seq[0]===tag?1:0}
// ---- per-fighter supers: each one has its own move, built from that fighter's kit ----
const SH=(f,o,dmg,x={})=>applyHit(f,o,{dmg,stun:60,bs:12,kb:0,lv:'mid',tag:'super',minScale:.7,...x},o.x-f.face*8,GY-o.y-o.H*.6);
const KO_D=o=>o.ko||['ko','knock','down','rise'].includes(o.state);
const canGrab=o=>o.y<=2&&o.inv<=0&&!['down','rise','ko','knock','grabbed','hurt'].includes(o.state);
function grab(f,o,s,t){s.ph='hold';s.t0=t;o.state='grabbed';o.st=0;o.atk=null;o.sp=null;o.crouch=false;o.vx=0;f.vx=0;f.inv=240;SFX.grab();F.hitstop=6}
function supEnd(f,s,t,n=24){if(s.ph!=='end'){s.ph='end';s.t0=t}if(t-s.t0>=n){f.inv=0;endSpecial(f)}}
const SUPERS={
  karl(f,o,s,t){const fc=f.face;// MIL LEGUAS: dash in, then afterimage blinks through the opponent from both sides
    if(!s.ph){s.pa='walk';s.loop=1;s.pf=Math.floor(t/1.4);if(t<22){f.vx=fc*7;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:12});
        const r=tryHit(f,o,{x1:fc>0?f.x:f.x-48,x2:fc>0?f.x+48:f.x,y1:f.y+f.H*.15,y2:f.y+f.H*.95},{dmg:4,stun:60,bs:16,kb:0,lv:'mid',chip:3,tag:'super',minScale:.7});
        if(r==='hit'){s.ph='blink';s.t0=t;s.hits=1;f.vx=0;f.inv=90}else if(r==='block'){f.vx=-fc*2;supEnd(f,s,t)}}else supEnd(f,s,t);return}
    if(s.ph==='blink'){f.vx=0;o.vx=0;s.loop=0;s.pa=s.hits%2?'kick':'punch';s.pf=akOf(f.c,s.pa).pk;const k=t-s.t0;
      if(k>0&&k%7===0&&s.hits<6){f.ghosts.push({x:f.x,y:f.y,l:16});const side=f.x<o.x?1:-1;let nx=clamp(o.x+side*30,XMIN,XMAX);if(Math.abs(nx-o.x)<20)nx=clamp(o.x-side*30,XMIN,XMAX);
        f.x=nx;f.face=o.x>f.x?1:-1;const fin=s.hits===5;SH(f,o,fin?12:4,fin?{knock:true,heavy:true,kb:3.6}:{});SFX.whoosh();s.hits++;
        if(fin){F.shake=10;F.camFlash=5;supEnd(f,s,t)}else if(KO_D(o))supEnd(f,s,t)}return}
    s.pa='punch';s.pf=99;f.vx*=.8;supEnd(f,s,t)},
  ivan(f,o,s,t){const fc=f.face;// SIBERIAN STORM: grab, then three slams side to side
    if(!s.ph){s.pa='special';s.pf=Math.min(8,t);f.vx=t<8?fc*2.5:0;
      if(t>=2&&t<=12&&canGrab(o)&&overlap({x1:fc>0?f.x:f.x-56,x2:fc>0?f.x+56:f.x,y1:f.y+10,y2:f.y+f.H*.9},o.hurt()))grab(f,o,s,t);else if(t>34)supEnd(f,s,t,0);return}
    if(s.ph==='hold'){const T=22,e=t-s.t0,k=Math.floor(e/T),p=(e%T)/T,dir=k%2?-1:1;f.vx=0;
      if(k<3){o.x=f.x+fc*dir*30*Math.cos(Math.PI*p);o.y=Math.sin(Math.PI*p)*(k===2?92:64);o.rot=-fc*dir*Math.PI*p*1.2;s.pa='win';s.pf=Math.round(p*8);
        if(e%T===T-1){o.y=0;o.rot=0;o.x=clamp(o.x,XMIN,XMAX);const fin=k===2;SH(f,o,fin?12:7,{unblockable:true,...(fin?{knock:true,heavy:true,kb:3}:{})});
          F.shake=fin?12:7;F.hitstop=fin?12:6;SFX.slam();dust(o.x,10);sparks(o.x,GY-6,'#fff',fin?16:8);
          if(fin||KO_D(o)){o.rot=0;supEnd(f,s,t)}else{o.state='grabbed';o.st=0}}}return}
    s.pa='win';s.pf=8;supEnd(f,s,t)},
  vizor(f,o,s,t){// FULL EXPOSURE: reticle locks on wherever the opponent is, five camera-flash shots
    if(!s.ph){s.ph='shoot';s.t0=t;s.hits=0}
    if(s.ph==='shoot'){const k=t-s.t0;s.pa='special';s.pf=k%8<3&&k>5?5:4;s.tx=o.x;s.ty=GY-o.y-o.h*.55;
      if(k>=6&&(k-6)%8===0&&s.hits<5){const fin=s.hits===4;if(!(o.inv>0)&&!['down','rise','ko'].includes(o.state)){
          applyHit(f,o,{dmg:fin?12:4,stun:30,bs:10,kb:fin?3:0.2,lv:'mid',chip:2,tag:'super',minScale:.7,...(fin?{knock:true,heavy:true}:{})},o.x,GY-o.y-o.H*.6)}
        F.camFlash=fin?8:3;SFX.flash();s.hits++;if(fin)supEnd(f,s,t)}return}
    s.pa='special';s.pf=8;supEnd(f,s,t,20)},
  padre(f,o,s,t){const fc=f.face;// FINAL SERMON: kneel and pray while pillars of light fall on the opponent, then heal
    s.pa='special2';s.pf=kf(t,[[0,0],[10,4],[52,7],[62,8]]);s.pil=s.pil||[];
    for(let i=0;i<4;i++)if(t===6+i*9){const x=clamp(lerp(f.x+fc*36,o.x,(i+1)/4),XMIN,XMAX);s.pil.push({x,t0:t,i});SFX.lock()}
    for(const P of s.pil){const k=t-P.t0;if(k===7){SFX.flash();F.shake=Math.max(F.shake,P.i===3?6:2)}
      if(k>=7&&k<12&&!P.hit){const fin=P.i===3;if(tryHit(f,o,{x1:P.x-15,x2:P.x+15,y1:-4,y2:220},{dmg:fin?12:7,stun:30,bs:12,kb:fin?3:0.4,lv:'high',chip:2,tag:'super',minScale:.7,...(fin?{knock:true,heavy:true}:{})}))P.hit=1}}
    if(t===58){const g=Math.min(10,f.mhp-f.hp);if(g>0){f.hp+=g;f.trail=Math.max(f.trail,f.hp);addText('+'+Math.round(g),f.x,GY-f.H-6,'#ffe66a')}SFX.bless()}
    if(t>=66)endSpecial(f)},
  zeke(f,o,s,t){const fc=f.face;// PERFECT GAME: a giant bowling ball that rolls through for four hits
    s.pa='special';s.pf=kf(t,[[0,0],[10,7],[30,8]]);
    if(t===10){F.proj.push({kind:'giant',x:f.x+fc*24,y:15,r:15,vx:fc*4.4,owner:f,rot:0,life:160,lv:'low',multi:4,hits:0,tag:'super'});SFX.whooshH();F.shake=4;dust(f.x+fc*26,8)}
    if(t>=32)endSpecial(f)},
  hecky(f,o,s,t){const fc=f.face;// GOLDEN PARACHUTE: launch, hold them up with an eye laser, cash out
    if(!s.ph){s.pa='special';s.pf=kf(t,[[0,0],[5,2],[7,3],[11,4],[30,7]]);f.vx=t<9?fc*3.6:f.vx*.6;
      if(t>=6&&t<14){const r=tryHit(f,o,{x1:fc>0?f.x-4:f.x-44,x2:fc>0?f.x+44:f.x+4,y1:f.y+f.H*.2,y2:f.y+f.H*1.25},{dmg:8,stun:30,bs:12,kb:1,lv:'mid',knock:true,launch:true,heavy:true,tag:'super',minScale:.7});
        if(r==='hit'){s.ph='laser';s.t0=t+8;s.hits=0;f.inv=120}else if(r==='block')supEnd(f,s,t)}else if(t>30)supEnd(f,s,t,0);return}
    if(s.ph==='laser'){f.vx=0;s.pa=f.c.anim&&f.c.anim.special3?'special3':'special';s.pf=7;const k=t-s.t0;s.lx=o.x;s.ly=GY-o.y-o.H*.5;
      if(k>=0&&k%5===0&&s.hits<6){if(k===0)SFX.laser();if(o.hp>0){const fin=s.hits===5;
          SH(f,o,fin?10:3,{unblockable:true,...(fin?{knock:true,heavy:true,kb:3}:{kb:0})});
          if(fin){for(let i=0;i<30;i++)F.parts.push({x:o.x+rnd(-10,10),y:GY-o.y-o.H*.5,vx:rnd(-3,3),vy:rnd(-4,0),l:rnd(20,34)|0,c:i%3?'#ffd23a':'#fff3a0',g:.15});SFX.coin();F.camFlash=4;F.shake=8;addText('CASHED OUT!',o.x,GY-o.y-o.H-14,'#ffd23a');supEnd(f,s,t)}
          else{o.state='knock';o.vy=Math.max(o.vy,1.5);o.vx=0;o.y=Math.max(o.y,8)}}s.hits++}
      if(KO_D(o)&&o.ko)supEnd(f,s,t);return}
    s.pa=f.c.anim&&f.c.anim.special3?'special3':'special';s.pf=8;supEnd(f,s,t,20)},
  lawslie(f,o,s,t){const fc=f.face;// FULL ARREST: charging grab, three taser zaps, takedown, cuffed for 8 seconds
    if(!s.ph){s.pa='walk';s.loop=1;s.pf=Math.floor(t/1.4);if(t<16){f.vx=fc*6.5;if(t%3===0)f.ghosts.push({x:f.x,y:f.y,l:10});
        if(canGrab(o)&&overlap({x1:fc>0?f.x:f.x-44,x2:fc>0?f.x+44:f.x,y1:f.y+8,y2:f.y+f.H},o.hurt())){grab(f,o,s,t);SFX.cuff()}}else{f.vx*=.7;if(t>30)supEnd(f,s,t,0)}return}
    if(s.ph==='hold'){const k=t-s.t0;s.loop=0;o.x=clamp(f.x+fc*28,XMIN,XMAX);o.y=0;
      if(k<10){s.pa='special2';s.pf=kf(k,[[0,2],[10,6]])}else{s.pa='special';s.pf=(k>>2)&1?7:6}
      if(k===10||k===18||k===26){SH(f,o,4,{unblockable:true});o.zap=24;SFX.zap();if(!KO_D(o)){o.state='grabbed';o.st=0}}
      if(k===40){SH(f,o,12,{unblockable:true,knock:true,heavy:true,kb:3});if(o.hp>0){o.cuffed=480;addText('ARRESTED!',o.x,GY-o.H-16,'#c8d0e0')}SFX.cuff();F.shake=8;supEnd(f,s,t)}
      else if(o.ko)supEnd(f,s,t);return}
    s.pa='special2';s.pf=99;s.loop=0;supEnd(f,s,t)},
  kai(f,o,s,t){const fc=f.face;// FAST BREAK: a dribble drive, pop them into the air, then an alley-oop slam dunk
    if(!s.ph){s.pa='special2';s.loop=1;s.pf=Math.floor(t/1.5);if(t<24){f.vx=fc*6.2;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:12});
        const r=tryHit(f,o,{x1:fc>0?f.x:f.x-44,x2:fc>0?f.x+44:f.x,y1:f.y+8,y2:f.y+f.H*.9},{dmg:5,stun:60,bs:14,kb:0,lv:'mid',chip:3,tag:'super',minScale:.7});
        if(r==='hit'){s.ph='pop';s.t0=t;f.vx=0;f.inv=150;SFX.whooshH()}else if(r==='block'){f.vx=-fc*2;supEnd(f,s,t)}}else{f.vx*=.7;supEnd(f,s,t)}return}
    if(s.ph==='pop'){const k=t-s.t0;s.loop=0;f.vx=0;s.pa='special';s.pf=Math.min(6,k/2);o.vx=0;o.state='grabbed';o.x=f.x+fc*26;o.y=Math.sin(Math.min(1,k/18)*Math.PI/2)*72;o.rot=-fc*k*.08;
      if(k>=8){s.fly=1;f.y=Math.sin(Math.min(1,(k-8)/14)*Math.PI/2)*84;f.x=clamp(f.x+fc*1.2,XMIN,XMAX)}
      if(k===22){s.ph='dunk';s.t0=t;s.fly=0}return}
    if(s.ph==='dunk'){const k=t-s.t0;s.pa=f.c.anim&&f.c.anim.airpunch?'airpunch':'punch';s.pf=99;f.vy=-7;o.y=Math.max(0,o.y-7);o.x=f.x+fc*20;
      if(o.y<=0||k>12){o.y=0;o.rot=0;SH(f,o,16,{unblockable:true,knock:true,heavy:true,kb:2.4});F.shake=12;F.hitstop=14;SFX.slam();dust(o.x,14);sparks(o.x,GY-8,'#ffb43a',18);addText('SLAM DUNK!',o.x,GY-o.H-16,'#ffb43a');s.ph='end';s.t0=t}return}
    s.fly=0;s.pa='win';s.pf=Math.min(8,(t-s.t0)/3);supEnd(f,s,t,26)},
  rex(f,o,s,t){// STAGE DIVE: a homing leap, a crash-down smash, then a four-note bass jam and a big finish
    s.rings=s.rings||[];
    if(!s.ph){const T=32;if(s.x0==null){s.x0=f.x;s.tx=o.x;f.inv=40}s.fly=1;s.tx+=clamp(o.x-s.tx,-.8,.8);const p=Math.min(1,t/T);
      f.x=clamp(lerp(s.x0,s.tx,p),XMIN,XMAX);f.y=Math.sin(p*Math.PI)*74;f.vy=0;f.vx=0;if(Math.abs(o.x-f.x)>6)f.face=o.x>f.x?1:-1;
      const j=akOf(f.c,'jump');s.pa='jump';s.pf=p<.45?j.rise:p<.6?j.apex:j.fall;if(t%3===0)f.ghosts.push({x:f.x,y:f.y,l:10});
      if(t>=T){f.y=0;s.fly=0;F.shake=10;SFX.slam();SFX.bass();dust(f.x,12);s.rings.push(t);
        const r=tryHit(f,o,{x1:f.x-34,x2:f.x+34,y1:-2,y2:f.H*1.1},{dmg:8,stun:60,bs:14,kb:0,lv:'mid',unblockable:true,tag:'super',minScale:.7});// can't block a stage dive: get out of the way
        if(r==='hit'){s.ph='jam';s.t0=t;s.hits=0;f.inv=150;f.face=o.x>=f.x?1:-1}else{s.ph='end';s.t0=t}}return}
    if(s.ph==='jam'){const k=t-s.t0;f.vx=0;o.vx=0;s.pa='special';s.pf=k%10<4?6:7;
      if(k>0&&k%10===0&&s.hits<5){const fin=s.hits===4;SH(f,o,fin?11:3,{unblockable:true,...(fin?{knock:true,heavy:true,kb:3.6}:{})});SFX.bass();s.rings.push(t);F.shake=fin?10:4;s.hits++;
        if(fin){F.camFlash=6;addText('ENCORE!',o.x,GY-o.H-16,'#ff4a6a');supEnd(f,s,t)}else if(KO_D(o))supEnd(f,s,t);else{o.state='hurt';o.stun=30}}return}
    s.fly=0;s.pa='special';s.pf=8;supEnd(f,s,t,20)}};
function updateSuper(f,o){const S=SUPERS[f.c.id];if(S)return S(f,o,f.sp,f.st);return updateSuperGeneric(f,o)}
function updateSuperGeneric(f,o){const s=f.sp,t=f.st;
  if(!s.hits){if(t<22){f.vx=f.face*6.4;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:12});
      const hb={x1:f.face>0?f.x:f.x-48,x2:f.face>0?f.x+48:f.x,y1:f.y+f.H*.15,y2:f.y+f.H*.95};
      const r=tryHit(f,o,hb,{dmg:5,stun:40,bs:16,kb:0.3,lv:'mid',chip:3,tag:'super',minScale:.7});
      if(r==='hit'){s.hits=1;s.last=t;f.vx=0}else if(r==='block'){s.hits=99;f.vx=-f.face*2}}
    else{f.vx*=.7;if(t>=34)endSpecial(f)}return}
  if(s.hits>=99){f.vx*=.8;if(t>=40)endSpecial(f);return}
  f.vx=0;if(o.state==='hurt'){o.x=clamp(f.x+f.face*34,XMIN,XMAX);o.vx=0}
  if(s.hits<6&&t-s.last>=5&&(o.state==='hurt')){const fin=s.hits===5,cx=o.x-f.face*10,cy=GY-o.H*.6;
    applyHit(f,o,{dmg:fin?11:4,stun:30,bs:10,kb:fin?3.8:0,lv:'mid',knock:fin,heavy:fin,tag:'super',minScale:.7},cx,cy);s.hits++;s.last=t;
    if(fin){F.shake=10;F.camFlash=5;SFX.slam()}}
  if((s.hits>=6&&t-s.last>=18)||t>110)endSpecial(f)}
function updateSpecial(f,o){const s=f.sp,t=f.st;if(s.kind==='super')return updateSuper(f,o);if(s.two)return updateSpecial2(f,o);
  if(s.kind==='rush'){if(t<7){f.vx=0}else if(t<26){f.vx=s.hits?f.face*1.4:f.face*6.6;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:10});if(t===7)SFX.rush();
      if(s.hits<3&&t-s.last>=6){const hb={x1:f.face>0?f.x:f.x-44,x2:f.face>0?f.x+44:f.x,y1:f.y+f.H*.25,y2:f.y+f.H*.85};const fin=s.hits===2;
        const r=tryHit(f,o,hb,{dmg:fin?8:5,stun:22,bs:10,kb:fin?3:0.8,lv:'mid',chip:1,knock:fin,heavy:fin});if(r){s.hits++;s.last=t;if(r==='block'){s.hits=3;f.vx=-f.face*2;f.st=Math.max(t,24)}}}}
    else{f.vx*=.8;if(t>=36)endSpecial(f)}}
  else if(s.kind==='shuriken'){if(t===9){if(!F.proj.some(p=>p.owner===f)){F.proj.push({x:f.x+f.face*22,y:f.y+f.H*.66,vx:f.face*4.4,owner:f,rot:0,life:90});SFX.star()}}if(t>=30)endSpecial(f)}
  else if(s.kind==='slam'){if(t>=5&&t<=10&&!s.hits){const hb={x1:f.face>0?f.x:f.x-45,x2:f.face>0?f.x+45:f.x,y1:f.y+10,y2:f.y+f.H*.9};
      if(o.y<=2&&o.inv<=0&&!['down','rise','ko','knock','grabbed','hurt'].includes(o.state)&&overlap(hb,o.hurt())){s.hits=1;SFX.grab();f.state='slamming';f.st=0;f.slam={T:30,dmg:14,back:true,h:64,kind:'grab'};o.state='grabbed';o.st=0;o.atk=null;o.sp=null;o.crouch=false;f.grabbed=o;F.hitstop=6}}
    if(t>=44)endSpecial(f)}// a whiffed Bear Slam leaves Ivan open
  else if(s.kind==='spin'){f.y=Math.max(0,Math.sin(Math.min(1,t/36)*Math.PI)*10);f.vx=t>3&&t<32?f.face*3.1:f.vx*.8;
    if(t>3&&t<32&&s.hits<3&&t-s.last>=9){const hb={x1:f.x-48,x2:f.x+48,y1:f.y+f.H*.2,y2:f.y+f.H*.95};const fin=s.hits===2;
      const r=tryHit(f,o,hb,{dmg:fin?7:4,stun:20,bs:10,kb:fin?3:1,lv:'mid',chip:1,knock:fin,heavy:fin});if(r){s.hits++;s.last=t;if(r==='block')s.hits=3}}
    if(t%6===0&&t<32)SFX.whoosh();if(t>=42){f.y=0;endSpecial(f)}}
  else if(s.kind==='tome'){// Holy Tome: overhead book smash — crouch-blocking doesn't stop it
    if(t===6)SFX.whooshH();
    if(t>=14&&t<18&&!s.hits){const hb={x1:f.face>0?f.x:f.x-56,x2:f.face>0?f.x+56:f.x,y1:f.y,y2:f.y+f.H*1.1};
      const r=tryHit(f,o,hb,{dmg:12,stun:22,bs:12,kb:2.2,lv:'high',chip:2,heavy:true});if(r){s.hits=1;F.shake=Math.max(F.shake,4);
        const cx=f.x+f.face*40;for(let i=0;i<14;i++)F.parts.push({x:cx+rnd(-6,6),y:GY-rnd(0,8),vx:rnd(-2.2,2.2),vy:rnd(-3,-1),l:rnd(14,24)|0,c:Math.random()<.5?'#ffd23a':'#fff3a0',g:.12})}}
    if(t===14&&!s.hits){F.shake=Math.max(F.shake,2);dust(f.x+f.face*40,6)}
    if(t>=34)endSpecial(f)}
  else if(s.kind==='strike'){// Strike Ball: a bowling ball rolled along the floor (low: block crouching)
    if(t===10&&!F.proj.some(p=>p.owner===f)){F.proj.push({kind:'ball',x:f.x+f.face*22,y:5,vx:f.face*3.6,owner:f,rot:0,life:110,lv:'low',dmg:9,kb:2.6,knock:true,tag:'sp1'});SFX.whooshH();dust(f.x+f.face*22,4)}
    if(t>=28)endSpecial(f)}
  else if(s.kind==='takeover'){// Hostile Takeover: rising uppercut that LAUNCHES the opponent for a juggle
    if(t<3)f.vx=0;else if(t<13&&!s.hits){f.vx=f.face*6.4;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:10})}else f.vx*=.6;if(t===3)SFX.whooshH();
    if(t>=4&&t<15&&!s.hits){const hb={x1:f.face>0?f.x-4:f.x-46,x2:f.face>0?f.x+46:f.x+4,y1:f.y+f.H*.3,y2:f.y+f.H*1.25};
      if(tryHit(f,o,hb,{dmg:9,stun:20,bs:12,kb:1,lv:'mid',knock:true,launch:true,heavy:true}))s.hits=1}
    if(t>=30)endSpecial(f)}
  else if(s.kind==='laser'){// Laser Glare: eye beams across the screen at head height, 3 hits (crouch under it, or block standing)
    if(t===3)SFX.lock();if(t===9)SFX.laser();
    if(t>=9&&t<27){s.ey=f.y+f.H*.86;s.end=f.face>0?W+8:-8;
      if(s.hits<3&&t-s.last>=5){const hb={x1:f.face>0?f.x+8:-8,x2:f.face>0?W+8:f.x-8,y1:s.ey-5,y2:s.ey+5},fin=s.hits===2;
        const r=tryHit(f,o,hb,{dmg:fin?6:5,stun:18,bs:10,kb:fin?2.6:1.2,lv:'mid',chip:1,tag:'sp3',...(fin?{knock:true,heavy:true}:{})});if(r){s.hits++;s.last=t;s.end=o.x;if(r==='block')s.hits=3}}
      if(Math.abs(o.x-f.x)>0&&o.y+o.h>s.ey-5&&o.y<s.ey+5&&!['down','ko'].includes(o.state))s.end=o.x}
    if(t>=34)endSpecial(f)}
  else if(s.kind==='taser'){// Taser: short-range prongs; a hit stuns for a long time (free follow-up)
    if(t===8&&!F.proj.some(p=>p.owner===f)){F.proj.push({kind:'prong',x:f.x+f.face*24,y:f.H*.6,vx:f.face*6.2,owner:f,rot:0,life:17,lv:'mid',dmg:7,stun:46,kb:0.6,tag:'sp1'});SFX.taser()}
    if(t>=30)endSpecial(f)}
  else if(s.kind==='bassdrop'){// Bass Drop: slams a power note; twin shockwaves roll along the floor BOTH ways across the stage (low: block crouching, or jump)
    if(t===10&&!F.proj.some(p=>p.owner===f&&p.kind==='quake')){SFX.bass();F.shake=Math.max(F.shake,5);dust(f.x-20,5);dust(f.x+20,5);
      for(const d of[1,-1])F.proj.push({kind:'quake',x:f.x+d*20,y:4,vx:d*3,owner:f,rot:0,life:80,lv:'low',dmg:10,stun:22,kb:2.4,knock:true,tag:'sp1'})}
    if(t>=38)endSpecial(f)}
  else if(s.kind==='bounce'){// Bounce Pass: a bouncing basketball; on a hit it rebounds to Kai (catch it = quick recharge)
    if(t===10&&!F.proj.some(p=>p.owner===f&&p.kind==='bball')){F.proj.push({kind:'bball',x:f.x+f.face*20,y:f.H*.5,vx:f.face*4.1,vy:-1.2,owner:f,rot:0,life:150,lv:'mid',dmg:8,stun:22,kb:2.2,tag:'sp1',bounces:0});SFX.whoosh()}
    if(t>=28)endSpecial(f)}
  else if(s.kind==='flash'){// Shutter Flash: lock a reticle on the target zone, then the flash hits whatever is inside it
    if(t===4){const d=(o.x-f.x)*f.face;s.lx=f.x+f.face*clamp(d>20?d:80,34,128);SFX.lock()}
    if(t===18){SFX.flash();F.camFlash=7;const hb={x1:s.lx-18,x2:s.lx+18,y1:4,y2:f.H*1.05};
      tryHit(f,o,hb,{dmg:8,stun:22,bs:12,kb:2.2,lv:'mid',chip:1,heavy:true})}
    if(t>=38)endSpecial(f)}}
function endSpecial(f){f.sp=null;f.state='idle';f.st=0;f.vx=0}
function updateSpecial2(f,o){const s=f.sp,t=f.st;
  if(s.kind==='step'){// Légua Step: invincible blur dash straight through the opponent
    if(t<4)f.vx=0;else if(t<17){f.vx=f.face*7.4;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:12});if(t===4)SFX.rush()}else f.vx*=.7;if(t>=24)endSpecial(f)}
  else if(s.kind==='counter'){// Shadow Counter: a stance; getting hit triggers the counter (see applyHit)
    if(s.trig!=null){const k=t-s.trig;if(k===7&&!s.hits){const hb={x1:f.face>0?f.x:f.x-50,x2:f.face>0?f.x+50:f.x,y1:f.y+f.H*.2,y2:f.y+f.H};
        if(tryHit(f,o,hb,{dmg:12,stun:24,bs:12,kb:3,lv:'mid',knock:true,heavy:true}))s.hits=1}
      if(k>=24)endSpecial(f)}
    else if(t>=34)endSpecial(f)}
  else if(s.kind==='charge'){// Iron Charge: armored shoulder tackle, absorbs one hit (see applyHit)
    if(t<8)f.vx=0;else if(t<30){f.vx=f.face*4.3;if(t%3===0)dust(f.x,1);
      if(!s.hits){const hb={x1:f.face>0?f.x:f.x-44,x2:f.face>0?f.x+44:f.x,y1:f.y+f.H*.25,y2:f.y+f.H*.9};
        const r=tryHit(f,o,hb,{dmg:11,stun:24,bs:14,kb:3.4,lv:'mid',chip:2,knock:true,heavy:true});if(r){s.hits=1;f.vx=r==='block'?-f.face*1.5:f.face*1}}}
    else f.vx*=.75;if(t>=40)endSpecial(f)}
  else if(s.kind==='rising'){// Martelo: invincible rising kick, the anti-air
    f.y=t<26?Math.sin(Math.min(1,t/26)*Math.PI)*46:0;f.vx=t<14?f.face*1.6:f.vx*.8;
    if(t>=3&&t<15&&!s.hits){const hb={x1:f.face>0?f.x-6:f.x-44,x2:f.face>0?f.x+44:f.x+6,y1:f.y+f.H*.3,y2:f.y+f.H*1.3};
      if(tryHit(f,o,hb,{dmg:11,stun:22,bs:12,kb:2.4,lv:'mid',knock:true,heavy:true}))s.hits=1}
    if(t===4)SFX.whooshH();if(t>=36){f.y=0;endSpecial(f)}}
  else if(s.kind==='replay'){// Instant Replay: rewind position and recent damage
    const P=s.path;if(P.length){const i=Math.min(P.length-1,Math.floor(t*4.5));f.x=clamp(P[i].x,XMIN,XMAX);f.y=0}
    if(t===20){const then=P.length?P[P.length-1].hp:f.hp;const gain=Math.min(15,Math.max(0,then-f.hp));if(gain>0){f.hp+=gain;f.trail=f.hp;addText('+'+Math.round(gain),f.x,GY-f.H-4,'#3ae8ff')}SFX.ok()}
    if(t>=26)endSpecial(f)}
  else if(s.kind==='split'){// Split Shot: a ball lobbed high that drops from above (overhead: block standing)
    if(t===16&&!F.proj.some(p=>p.owner===f)){const x0=f.x+f.face*16,y0=f.H*.6,vy=4.6,g=0.2,T=(vy+Math.sqrt(vy*vy+2*g*(y0-4)))/g,d=clamp(Math.abs(o.x-x0),40,150);
      F.proj.push({kind:'lob',x:x0,y:y0,vx:f.face*d/T,vy,g,owner:f,rot:0,life:140,lv:'high',dmg:9,stun:24,kb:2,tag:'sp2',lx:x0+f.face*d});SFX.whoosh()}
    if(t>=36)endSpecial(f)}
  else if(s.kind==='cuff'){// Cuffed!: a lunging grab; cuffed opponents can't use specials or super for 5 seconds
    if(t<4)f.vx=0;else if(t<12)f.vx=f.face*3.4;else f.vx*=.6;
    if(t>=4&&t<=12&&!s.hits){const hb={x1:f.face>0?f.x:f.x-46,x2:f.face>0?f.x+46:f.x,y1:f.y+10,y2:f.y+f.H*.9};
      if(o.y<=2&&o.inv<=0&&!['down','rise','ko','knock','grabbed','hurt'].includes(o.state)&&overlap(hb,o.hurt())){s.hits=1;f.vx=0;
        applyHit(f,o,{dmg:8,stun:34,bs:0,kb:1,lv:'mid',unblockable:true,tag:'sp2'},o.x-f.face*8,GY-o.H*.5);if(o.hp>0){o.cuffed=300;SFX.cuff();addText('CUFFED!',o.x,GY-o.H-14,'#c8d0e0')}F.hitstop=10}}
    if(t>=34)endSpecial(f)}
  else if(s.kind==='miccheck'){// Mic Check: a sound wave that bats enemy projectiles back and blasts the opponent across the screen
    if(t===10&&!F.proj.some(p=>p.owner===f&&p.kind==='wave')){F.proj.push({kind:'wave',x:f.x+f.face*20,y:f.H*.72,vx:f.face*5,owner:f,rot:0,life:44,lv:'mid',dmg:7,stun:20,kb:3,knock:true,tag:'sp2'});SFX.mic()}
    if(t>=30)endSpecial(f)}
  else if(s.kind==='crossover'){// Ankle Breaker: crossover dribble through the opponent; crossing them breaks their ankles (long stumble)
    if(t<8){f.vx=0;if(t===1)s.side=Math.sign(o.x-f.x)||f.face}else if(t<20){f.vx=f.face*6.6;f.inv=Math.max(f.inv,2);if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:10});if(t===8)SFX.rush()
      if(!s.hits&&Math.sign(o.x-f.x)!==s.side&&o.y<=2&&!['down','rise','ko','knock','grabbed'].includes(o.state)&&Math.abs(o.x-f.x)<40){s.hits=1;
        applyHit(f,o,{dmg:3,stun:46,bs:0,kb:0,lv:'mid',unblockable:true,tag:'sp2'},o.x,GY-o.H*.3);o.hurtK='low';addText('ANKLES BROKEN!',o.x,GY-o.H-16,'#ffb43a');F.hitstop=8}}
    else{f.vx*=.7;if(t===20)f.face=-f.face}
    if(t>=30){f.face=o.x>f.x?1:-1;endSpecial(f)}}
  else if(s.kind==='powersuit'){// Power Suit: a 7-second power-up (+25% damage, faster)
    if(t===12){f.buff=420;SFX.bless();addText('POWER UP!',f.x,GY-f.H-14,'#ffd23a')}if(t>=24)endSpecial(f)}
  else if(s.kind==='bless'){// Benediction: pray to heal; any hit interrupts it
    if(t>8&&t<70){f.hp=Math.min(f.mhp,f.hp+0.26);f.trail=Math.max(f.trail,f.hp);if(t%3===0)F.parts.push({x:f.x+rnd(-16,16),y:GY-rnd(0,f.H*.8),vx:0,vy:rnd(-1.2,-.5),l:rnd(14,26)|0,c:Math.random()<.5?'#fff3a0':'#ffd23a',g:0})}
    if(t===10)SFX.bless();if(t>=78)endSpecial(f)}}
function updateSlam(f,o){const S=f.slam||{T:30,dmg:17,back:true,h:64},t=f.st,T=S.T;
  if(t<=T){const p=t/T,th=Math.PI*p;if(S.back){o.x=f.x+f.face*30*Math.cos(th);o.rot=-f.face*Math.PI*p*1.2}else{o.x=f.x+f.face*(30+44*p);o.rot=f.face*Math.PI*p}o.y=Math.sin(th)*S.h}
  if(t===T){o.y=0;o.rot=0;const dmg=S.dmg*f.c.power/o.c.def*(S.kind==='grab'&&f.sp&&f.sp.dim||1);if(F.trial&&f===F.p1)trialHit(f,S.kind==='throw'?'throw':'sp1',f.sp?f.sp.id:f.thrId);if(S.kind==='throw'&&!f.cpu)badge('throw');
    f.meter=Math.min(100,f.meter+12);o.meter=Math.min(100,o.meter+6);o.hp=Math.max(F.training?1:0,o.hp-dmg);F.shake=9;F.hitstop=12;SFX.slam();dust(o.x,10);sparks(o.x,GY-6,'#fff',14);
    o.x=clamp(o.x,XMIN,XMAX);if(S.back)f.face=-f.face;f.combo=1;o.flash=6;if(o.hp<=0){o.state='ko';o.st=0;F.onKO(f,o)}else{o.state='down';o.st=0}}
  if(t>=T+18){f.state='idle';f.st=0;f.sp=null;f.grabbed=null;f.slam=null}}
const JUGGLE=2,SCALE=[1,1,.85,.75,.65,.55,.5];
function tryHit(att,def,hb,d){if(SHOWBOX)(F.dbg||(F.dbg=[])).push({...hb,f:frameNo});if(def.inv>0||['down','ko','rise','grabbed'].includes(def.state)||F.phase!=='play')return false;
  if(def.state==='knock'&&(def.jug||0)>=JUGGLE)return false;if(!overlap(hb,def.hurt()))return false;
  const cx=(Math.max(hb.x1,def.x-15)+Math.min(hb.x2,def.x+15))/2,cy=GY-(Math.max(hb.y1,def.y)+Math.min(hb.y2,def.y+def.h))/2;return applyHit(att,def,d,cx,cy)}
function applyHit(att,def,d,cx,cy){const push=def.x>=att.x?1:-1,A=arch(def.c);
  // GRAPPLER trait: the start of the kick absorbs one hit
  if(A.armor&&def.state==='attack'&&def.atk&&def.atk.name==='kick'&&phaseOf(def)==='start'&&def.armorId!==def.atk.id&&d.tag!=='super'){def.armorId=def.atk.id;
    def.hp=Math.max(1,def.hp-d.dmg*att.c.power/def.c.def*.5);def.flash=4;F.hitstop=7;sparks(cx,cy,'#ff9a3a',10);SFX.block();addText('ARMOR!',def.x,GY-def.H-10,'#ff9a3a');return'hit'}
  // TECHNICIAN trait: tap forward just before a hit lands to parry it (CPU parries now and then)
  if(A.parry&&!d.unblockable&&def.y<=0&&['idle','walk','crouch','block'].includes(def.state)&&d.tag!=='super'&&
     (def.cpu?Math.random()<lerp(.04,.3,[0.15,0.45,0.75][SET.diff]):frameNo-(def.tapF??-99)<=8)){def.tapF=-99;
    def.state='idle';def.st=0;def.stun=0;def.vx=0;def.meter=Math.min(100,def.meter+8);F.hitstop=14;sparks(cx,cy,'#7ad8ff',12);SFX.parry();
    addText('PARRY!',def.x,GY-def.H-10,'#7ad8ff');return'block'}
  const ds=def.state==='special'&&def.sp;
  if(ds&&def.sp.kind==='counter'&&def.sp.trig==null&&def.st>=2&&def.st<=28){// Shadow Counter triggers: vanish and reappear behind the attacker
    def.sp.trig=def.st;def.inv=20;for(let i=0;i<12;i++)F.parts.push({x:def.x+rnd(-12,12),y:GY-rnd(0,def.H),vx:rnd(-1,1),vy:rnd(-1,.2),l:rnd(14,24)|0,c:'#6a5a8a',g:0,dust:1});
    def.x=clamp(att.x-att.face*30,XMIN,XMAX);def.face=att.x>def.x?1:-1;F.hitstop=8;SFX.lock();addText('COUNTER!',def.x,GY-def.H-10,def.c.col.aura);return'block'}
  if(ds&&def.sp.kind==='charge'&&def.sp.armor>0&&def.st<32){def.sp.armor--;const dm=d.dmg*att.c.power/def.c.def*.5;def.hp=Math.max(1,def.hp-dm);def.flash=4;F.hitstop=7;
    sparks(cx,cy,'#ff9a3a',10);SFX.block();addText('ARMOR!',def.x,GY-def.H-10,'#ff9a3a');return'hit'}
  const canBlock=!d.unblockable&&def.holdBack&&def.y<=0&&['idle','walk','crouch','block'].includes(def.state)&&(d.lv==='low'?def.crouch:d.lv==='high'?!def.crouch:true);
  const dim=d.tag==='super'?1:d.dim!=null?d.dim:(att.state==='special'&&att.sp&&att.sp.dim)||1;
  if(d.tag!=='super'){att.meter=Math.min(100,att.meter+(canBlock?3:d.heavy?10:7));def.meter=Math.min(100,def.meter+(canBlock?2:5))}
  if(canBlock){def.state='block';def.st=0;def.stun=d.bs;def.vx=push*Math.max(1.5,d.kb);if(A.enforcer)def.meter=Math.min(100,def.meter+6);else def.hp=Math.max(1,def.hp-(d.chip||0));F.hitstop=4;SFX.block();sparks(cx,cy,'#7ac8ff',6);
    if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*1.6;return'block'}
  let dmg=d.dmg*att.c.power/def.c.def*(att.buff>0?1.25:1)*dim*(att.shadow?1.15:1);if(att.cpu)dmg*=[0.75,0.95,1.1][SET.diff];
  if(arch(att.c).rhythm&&onBeat()){dmg*=1.25;if(!F.texts.some(x=>x.s==='ON BEAT!'&&x.l>34))addText('ON BEAT!',def.x,GY-def.y-def.H-20,'#ff4a6a')}
  const inCombo=(def.state==='hurt'&&def.stun>0)||def.state==='knock';
  if(inCombo)att.combo++;else att.combo=1;
  // INFINITE PROTECTION (Skullgirls-style): the same move landing for a 4th time in one combo is a loop;
  // sparks turn blue and the defender can BURST out with A or B
  if(!inCombo){att.cseq={};att.ips=false}
  {const key=d.tag||(att.state==='special'&&att.sp?(att.sp.two?'sp2':'sp1'):att.atk?att.atk.name:'?'),iid=d.tid||(att.sp&&att.sp.id)||(att.atk&&att.atk.id);
    if(key!=='super'){const m=att.cseq||(att.cseq={}),q=m[key]||(m[key]={n:0,id:null});if(q.id!==iid){q.n++;q.id=iid}
      if(q.n>=4&&!att.ips){att.ips=true;def.burstOK=true;addText('LOOP! PRESS A/B: BURST',def.x,GY-def.H-24,'#3ae8ff')}}}att.comboT=60;if(att.combo>=2)addCombo(att);
  dmg*=d.minScale?Math.max(d.minScale,SCALE[Math.min(SCALE.length-1,att.combo-1)]):SCALE[Math.min(SCALE.length-1,att.combo-1)];
  if(!att.cpu&&F.p1){const r=rc(att.c.id);if(att.combo>r.combo){r.combo=att.combo;saveRec()}if(att.combo>=5)badge('combo5')}
  if(F.trial&&att===F.p1)trialHit(att,d.tag||(att.state==='special'&&att.sp?(att.sp.two?'sp2':'sp1'):att.atk?att.atk.name:'?'),d.tid||(att.sp&&att.sp.id)||(att.atk&&att.atk.id));
  // counter hit: tagging an opponent during their attack's start-up
  const counter=!inCombo&&((def.state==='attack'&&phaseOf(def)==='start')||(def.state==='special'&&def.st<8));
  if(counter){dmg*=1.2;d={...d,stun:(d.stun||0)+8,...(arch(att.c).heavy&&att.atk&&(att.atk.name==='kick'||att.atk.name==='sweep')?{knock:true,heavy:true}:{})};addText('COUNTER!',def.x,GY-def.H-10,'#ff5a5a');SFX.block()}
  if(def.state==='knock'||def.y>0)def.jug=(def.jug||0)+1;
  def.hp=Math.max(0,def.hp-dmg);def.atk=null;def.sp=null;def.flash=4;def.crouch=d.lv==='low'?false:def.crouch&&def.state==='crouch';
  if(F.training){if(att===F.p1){if(att.combo===1)F.tDmg=0;F.tDmg+=dmg;F.tHits=att.combo;F.tBest=Math.max(F.tBest,att.combo)}def.hp=Math.max(1,def.hp)}
  if(def.hp<=0){def.state='knock';def.st=0;def.ko=true;def.vy=4.2;def.vx=push*2.6;def.y=Math.max(def.y,1);F.onKO(att,def)}
  else if(d.knock||def.y>0){def.state='knock';def.st=0;def.vy=d.launch?6.6:3.8;def.vx=push*(d.launch?0.9:2.4);def.y=Math.max(def.y,1);def.stun=1}
  else{def.state='hurt';def.st=0;def.stun=d.stun;def.vx=push*d.kb;
    const rel=(GY-cy-def.y)/Math.max(1,def.h);def.hurtK=def.crouch?'crouch':d.lv==='low'||d.crouch||rel<.3?'low':rel>.62?'high':'mid'}
  if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*d.kb*0.7;
  // hit feel: the freeze scales with the damage that landed (heavier = longer), plus shake and a 3-tier sound
  F.hitstop=clamp(Math.round(4+dmg*.7),5,12);if(d.heavy)F.hitstop=Math.max(F.hitstop,10);F.shake=d.heavy?5:dmg>=7?3:2;
  sparks(cx,cy,att.ips?'#3ae8ff':'#ffe66a',d.heavy?14:8);F.hitFx.push({x:cx,y:cy,l:8,big:!!d.heavy,ips:!!att.ips});(d.heavy||dmg>=9?SFX.heavy:dmg>=5?SFX.hit:SFX.hitL)();
  if(!att.cpu&&navigator.vibrate)try{navigator.vibrate(d.heavy?40:18)}catch(e){}
  return'hit'}
function updateF(f,o){f.st++;if(f.buff>0){f.buff--;if(frameNo%4===0)F.parts.push({x:f.x+rnd(-14,14),y:GY-f.y-rnd(4,f.H),vx:0,vy:-.6,l:16,c:Math.random()<.5?'#ffd23a':'#fff3a0',g:0})}if(f.spCD>0)f.spCD--;if(f.spCD2>0)f.spCD2--;if(f.spCD3>0)f.spCD3--;if(f.cuffed>0)f.cuffed--;if(f.zap>0){f.zap--;if(f.zap%3===0)F.parts.push({x:f.x+rnd(-12,12),y:GY-f.y-rnd(8,f.H),vx:rnd(-1,1),vy:rnd(-1,1),l:8,c:Math.random()<.5?'#fff':'#7ad8ff',g:0})}if(f.throwInv>0)f.throwInv--;
  if(!(f.state==='special'&&f.sp&&f.sp.kind==='replay')){(f.rh||(f.rh=[])).push({x:f.x,hp:f.hp});if(f.rh.length>100)f.rh.shift()}if(f.flash>0)f.flash--;if(f.inv>0)f.inv--;if(f.comboT>0&&--f.comboT===0)f.combo=0;
  f.trail=f.trail>f.hp?Math.max(f.hp,f.trail-0.4):f.hp;f.ghosts.forEach(g=>g.l--);f.ghosts=f.ghosts.filter(g=>g.l>0);
  switch(f.state){
    case'prejump':if(f.st>=3){f.state='jump';f.st=0;f.vy=5.4*f.c.jump;f.vx=f.jdir*f.face*1.8*f.c.speed;SFX.jump()}break;
    case'jump':if(f.atk){f.ast++;if(phaseOf(f)==='active'&&!f.hitDone){const a=f.atk,cy=f.y+f.H*a.hy;if(tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:a.y1!=null?f.y+a.y1:cy-a.hh/2,y2:a.y1!=null?f.y+a.y2:cy+a.hh/2},{...a,heavy:false}))f.hitDone=true}}break;
    case'land':f.vx=0;if(f.st>=5)setS(f,'idle');break;
    case'dash':f.vx*=0.88;if(f.st>=(f.dashDir>0?13:15)){f.vx=0;setS(f,'idle')}break;
    case'attack':{const a=f.atk,ph=phaseOf(f);if(ph==='active'&&!f.hitDone){const h=f.H*(a.crouch?.7:1),cy=f.y+h*a.hy;
        if(tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:a.y1!=null?f.y+a.y1:cy-a.hh/2,y2:a.y1!=null?f.y+a.y2:cy+a.hh/2},a))f.hitDone=true}
      f.vx*=.75;if(f.st>=a.s+a.a+a.r+(f.hitDone?0:WHIFF)){f.atk=null;f.state=a.crouch&&f.holdDown?'crouch':'idle';f.st=0;if(f.state==='idle')f.crouch=false}}break;
    case'hurt':f.vx*=.86;if(--f.stun<=0){f.state='idle';f.st=0}break;
    case'block':f.vx*=.84;if(--f.stun<=0){f.state=f.crouch?'crouch':'idle';f.st=0}break;
    case'down':f.vx*=.8;if(f.st>=40){f.state='rise';f.st=0;f.inv=14}break;
    case'rise':if(f.st>=12){f.state='idle';f.st=0;f.inv=8;f.stun=0}break;
    case'special':updateSpecial(f,o);break;
    case'slamming':f.vx=0;updateSlam(f,o);break;
    case'throwing':f.vx=0;
      if(f.st===4){if(canThrow(f,o)){f.thr=o;f.grabbed=o;o.state='grabbed';o.st=0;o.atk=null;o.sp=null;o.crouch=false;o.vx=0;o.rot=0;SFX.grab();F.hitstop=4}}
      if(f.thr){o.x=clamp(f.x+f.face*28,XMIN,XMAX);o.y=0;if(f.st>=15){f.state='slamming';f.st=0;f.slam={T:22,dmg:10,back:f.thBack,h:40,kind:'throw'};f.thr=null}}
      else if(f.st>=24)setS(f,'idle');break;
    case'ko':case'win':f.vx*=.85;break;}
  if(f.state!=='grabbed'&&f.state!=='slamming'&&!(f.state==='special'&&f.sp&&(f.sp.kind==='spin'||f.sp.kind==='rising'||f.sp.fly))){
    if(f.y>0||f.vy!==0){f.vy-=GRAV;f.y+=f.vy}
    if(f.y<=0&&f.vy<=0&&(f.state==='jump'||f.state==='knock'||f.vy<0)){f.y=0;f.vy=0;
      if(f.state==='jump'){f.state='land';f.st=0;f.dj=0;f.atk=null;SFX.land();dust(f.x,4)}
      else if(f.state==='knock'){f.state=f.ko?'ko':'down';f.st=0;f.jug=0;f.vx*=.4;F.shake=Math.max(F.shake,3);SFX.thud();dust(f.x,8)}}}
  if(f.state!=='grabbed')f.x=clamp(f.x+f.vx,XMIN,XMAX);
  if(['idle','walk','crouch','prejump','land'].includes(f.state)&&Math.abs(o.x-f.x)>3)f.face=o.x>f.x?1:-1}
const passing=f=>f.state==='special'&&f.sp&&(f.sp.kind==='step'||f.sp.kind==='crossover'||(f.sp.kind==='counter'&&f.sp.trig!=null));
function separate(a,b){if(a.state==='grabbed'||b.state==='grabbed'||a.state==='slamming'||b.state==='slamming'||passing(a)||passing(b))return;if(Math.abs(a.y-b.y)>a.H*.7)return;
  const minD=40,dx=b.x-a.x;if(Math.abs(dx)>=minD)return;const s=dx===0?a.face:Math.sign(dx),ov=(minD-Math.abs(dx))/2;
  a.x-=s*ov;b.x+=s*ov;if(a.x<XMIN){b.x+=XMIN-a.x;a.x=XMIN}if(a.x>XMAX){b.x-=a.x-XMAX;a.x=XMAX}if(b.x<XMIN){a.x+=XMIN-b.x;b.x=XMIN}if(b.x>XMAX){a.x-=b.x-XMAX;b.x=XMAX}}
function updateGiant(p,o){p.x+=p.vx;p.rot+=p.vx*0.07;p.life--;if(frameNo%4===0)dust(p.x,1);
  if(frameNo-(p.last??-99)>=6&&p.hits<p.multi){const fin=p.hits===p.multi-1,R2=p.r;
    const r=tryHit(p.owner,o,{x1:p.x-R2,x2:p.x+R2,y1:p.y-R2,y2:p.y+R2},{dmg:fin?12:5,stun:34,bs:10,kb:fin?3.4:0.5,lv:'low',chip:2,tag:'super',minScale:.7,...(fin?{knock:true,heavy:true}:{})});
    if(r){p.hits++;p.last=frameNo;SFX.thud();if(r==='hit')o.vx=p.vx*.9;
      if(fin){p.life=0;F.shake=9;addText('STRIKE!',o.x,GY-o.H-16,'#d04aff');SFX.slam();
        for(let i=0;i<10;i++)F.parts.push({x:p.x+rnd(-6,6),y:GY-rnd(4,20),vx:rnd(-3.5,3.5),vy:rnd(-5,-2),l:rnd(26,40)|0,c:i%3?'#ffffff':'#e02a2a',g:.18,pin:1})}}}}
function updateProj(){for(const p of F.proj){if(p.dim==null)p.dim=(p.owner.sp&&p.owner.sp.dim)||1;if(p.kind==='giant'){updateGiant(p,p.owner===F.p1?F.p2:F.p1);continue}
    if(p.kind==='wave')for(const q of F.proj)if(q.owner!==p.owner&&q.kind!=='giant'&&q.kind!=='wave'&&q.life>0&&Math.abs(q.x-p.x)<16&&q.y<p.y+24){// Mic Check bats it back
      if(q.kind==='prong')q.life=0;else{q.owner=p.owner;q.vx=-q.vx*1.2;q.id=null;q.life=Math.max(q.life,60)}sparks(q.x,GY-q.y,'#ff4a6a',10);SFX.parry();addText('REFLECT!',q.x,GY-q.y-14,'#ff4a6a')}
    p.x+=p.vx;if(p.kind==='quake'&&frameNo%4===0)dust(p.x,1);
    if(p.kind==='bball'){p.vy-=.32;p.y+=p.vy;if(p.y<=5&&p.vy<0){p.y=5;p.vy=Math.max(3.2,-p.vy*.82);p.bounces++;SFX.land()}
      if(p.ret){const ow=p.owner;p.vx=Math.sign(ow.x-p.x)*4.6;if(Math.abs(ow.x-p.x)<14){p.life=0;ow.spCD=Math.min(ow.spCD,18);addText('CAUGHT!',ow.x,GY-ow.H-14,'#ffb43a');SFX.ok()}continue}}p.rot+=p.kind?p.vx*0.14:0.5;p.life--;const o=p.owner===F.p1?F.p2:F.p1;
    if(p.g){p.y+=p.vy;p.vy-=p.g;if(p.y<=4&&p.vy<0){p.life=0;dust(p.x,8);SFX.land();F.shake=Math.max(F.shake,2)}}
    const R2=p.kind?7:6,RY=p.kind==='wave'?15:p.kind==='quake'?10:R2,r=tryHit(p.owner,o,{x1:p.x-R2,x2:p.x+R2,y1:p.y-RY,y2:p.y+RY},{dmg:p.dmg||9,stun:p.stun||18,bs:12,kb:p.kb||2.4,lv:p.lv||'mid',chip:2,knock:!!p.knock,heavy:!!p.knock,tag:p.tag||'sp1',dim:p.dim,tid:p.id||(p.id=++atkId)});
    if(r==='block'&&p.kind==='ball'&&arch(p.owner.c).spare){p.owner.spCD=Math.min(p.owner.spCD,25);addText('SPARE!',p.owner.x,GY-p.owner.H-14,'#d04aff');SFX.ok()}
    if(r&&p.kind==='bball'){p.ret=true;p.vy=Math.max(p.vy,3);if(r==='hit')SFX.thud()}
    else if(r&&p.kind==='quake'){p.life=0;if(r==='hit')sparks(p.x,GY-p.y-4,'#5ae0ff',8)}
    else if(r&&p.kind==='wave'){p.life=0;if(r==='hit')o.vx=Math.sign(p.vx)*5.2}
    else if(r&&p.kind==='prong'){p.life=0;if(r==='hit'){o.zap=46;SFX.zap()}}
    else if(r){p.life=0;if(r==='hit'&&p.kind){SFX.thud();for(let i=0;i<6;i++)F.parts.push({x:p.x,y:GY-p.y,vx:rnd(-2,2),vy:rnd(-3,-1),l:rnd(12,20)|0,c:i%2?'#ffffff':'#e02a2a',g:.15})}}}
  if(F.proj.length===2&&F.proj.some(p=>p.kind==='giant')){const g=F.proj.find(p=>p.kind==='giant'),q=F.proj.find(p=>p!==g);if(q&&Math.abs(g.x-q.x)<g.r+6&&Math.abs(g.y-q.y)<g.r+8){q.life=0;sparks(q.x,GY-q.y,'#fff',8)}}
  else if(F.proj.length===2&&!F.proj.some(p=>p.kind==='wave')&&Math.abs(F.proj[0].x-F.proj[1].x)<10&&Math.abs(F.proj[0].y-F.proj[1].y)<14){sparks(F.proj[0].x,GY-F.proj[0].y,'#fff',10);SFX.block();
    // HIGH/LOW ZONER trait: a bowling ball smashes through any other projectile
    F.proj.forEach(p=>{const other=F.proj.find(q=>q!==p);if(!(arch(p.owner.c).heavyBalls&&p.kind&&!(other&&other.kind)))p.life=0})}
  F.proj=F.proj.filter(p=>p.life>0&&p.x>-10&&p.x<W+10)}
// FX
function sparks(x,y,col,n){for(let i=0;i<n;i++){const a=rnd(0,Math.PI*2),v=rnd(1,3.2);F.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,l:rnd(10,20)|0,c:Math.random()<.5?'#fff':col,g:0.12})}}
function dust(x,n){for(let i=0;i<n;i++)F.parts.push({x:x+rnd(-12,12),y:GY-1,vx:rnd(-1,1),vy:rnd(-1,-.2),l:rnd(12,22)|0,c:'#d8cbb0',g:0.02,dust:1})}
function addText(s,x,y,c){F.texts.push({s,x:clamp(x,40,216),y,c,l:50})}
function addCombo(att){F.comboShow={side:att.side,n:att.combo,l:70}}

// ---- CPU: SF6-style decks of cards (after Capcom's CEDEC 2024 talk) ----
// 1. Perception: the CPU reacts to what it SAW a few frames ago (reaction time ~270 ms easy, ~85 ms hard).
// 2. It picks the deck for the situation (anti-air, defend, punish, wake-up, close / mid / far range),
//    then draws one card from that deck by weight; difficulty shifts the weights.
// 3. Execution ability: tricky cards (specials, combos, anti-airs) are rolled; a fumbled special comes out as a jab.
// 4. Pressure: getting hit and falling behind raises an internal meter that makes its execution sloppier.
const SUP_RANGE={kai:120,ivan:50,lawslie:110,vizor:230,zeke:220,padre:230,karl:130,rex:190};
function aiSnap(o){return{x:o.x,y:o.y,vy:o.vy,state:o.state,st:o.st,atk:o.atk,ph:phaseOf(o),sp:o.sp,crouch:o.crouch}}
function drawCard(cards){let t=0;for(const c of cards)if(c[0]>0)t+=c[0];let r=Math.random()*t;for(const c of cards){if(c[0]<=0)continue;if((r-=c[0])<=0){c[1]();return c[2]}}return null}
function aiInput(f,o){const inp={l:0,r:0,u:0,d:0,aP:0,bP:0,sp:0,sp2:0,sp3:0,sup:0},ai=f.ai;
  const L=clamp([0.15,0.45,0.75][SET.diff]+(RUN&&RUN.mode==='arcade'?RUN.idx*0.1:0),0,1);
  // perception (reaction delay)
  const seen=ai.seen||(ai.seen=[]);seen.push(aiSnap(o));const RT=Math.round(lerp(16,5,L));while(seen.length>RT+1)seen.shift();const O=seen[0];
  // pressure: rises when hit or behind on health; execution gets sloppier under pressure
  if(ai.hp!=null&&f.hp<ai.hp)ai.pr=Math.min(1,(ai.pr||0)+.1);ai.hp=f.hp;
  const behind=clamp((o.hp/o.mhp-f.hp/f.mhp)*1.6,0,1);ai.pr=clamp((ai.pr||0)+(behind-(ai.pr||0))*.01,0,1);
  const EXEC=ai.ex=clamp(lerp(.72,.97,L)-.28*ai.pr,.35,1),exec=()=>{const ok=Math.random()<EXEC;ai.fumbles=(ai.fumbles||0)+(ok?0:1);return ok};
  const card=(deck,cards)=>{ai.deck=deck;ai.card=drawCard(cards);(ai.log||(ai.log={}))[deck]=(ai.log[deck]||0)+1;return inp};
  const SPC=k=>()=>{if(exec())inp[k]=1;else inp.aP=1};// a special card: fumbled = a stray jab
  const dist=Math.abs(O.x-f.x),tw=O.x>f.x?'r':'l',aw=tw==='r'?'l':'r',sp=f.c.special,s2=f.c.special2,s3=f.c.special3;
  const rdy=f.spCD<=0,rdy2=!!s2&&f.spCD2<=0,rdy3=!!s3&&f.spCD3<=0,wait=Math.round(lerp(26,6,L)),plan=(p,d)=>()=>{ai.plan=p;ai.dur=d};
  const hold=k=>()=>{inp[k]=1},both=(x,y)=>()=>{inp[x]=1;inp[y]=1},rage=1+ai.pr;// under pressure it gets reckless
  ai.crouchy=ai.crouchy??Math.random()<.4;const supOK=f.meter>=100&&!(f.cuffed>0),incoming=F.proj.find(p=>p.owner===o&&Math.abs(p.x-f.x)<120&&Math.sign(p.vx)===Math.sign(f.x-p.x));
  // burst out of a detected loop
  if(f.burstOK&&Math.random()<lerp(.03,.2,L)){inp.aP=1;return inp}
  // throw tech
  if(f.state==='grabbed'){if(o.state==='throwing'&&ai.tg!==o.thrId){ai.tg=o.thrId;ai.tech=Math.random()<lerp(.08,.6,L)*EXEC/.9;ai.tdel=1+((Math.random()*7)|0)}
    if(ai.tech&&--ai.tdel===0)inp.aP=1;return inp}
  // CONFIRM: my normal connected -> chain, cancel into a special or super (one execution roll per combo)
  if(f.state==='attack'&&f.hitDone&&cancelOk(f)&&o.state==='hurt'){const n=f.atk.name;
    if(ai.cid!==f.atk.id){ai.cid=f.atk.id;ai.go=Math.random()<lerp(0.15,0.9,L)&&exec();ai.sup=supOK&&!['ivan','lawslie'].includes(f.c.id)&&Math.random()<lerp(.2,.8,L)}
    if(ai.sup){inp.sup=1;return inp}
    if(ai.go){if(n==='jab'){if((f.chain||0)<1&&Math.random()<.35)inp.aP=1;else inp.bP=1}else if(n==='cjab'){inp.d=1;if(Math.random()<.5)inp.aP=1;else inp.bP=1}
      else if(n==='kick'){if(f.c.id==='rex'&&rdy2)inp.sp2=1;else if(rdy&&sp!=='slam'&&sp!=='bassdrop')inp.sp=1}}
    return inp}
  // AIR
  if(f.state==='jump'){if(arch(f.c).dj&&!f.dj&&f.vy<1&&f.st>6&&Math.random()<.05){inp.u=1;inp[tw]=1;return inp}
    if(!f.atk&&dist<60&&f.vy<1.5&&Math.random()<0.15+L*0.5)inp.bP=1;return inp}
  // follow-up on a hit I can see
  if(canAct(f)&&o.state==='hurt'&&dist<48&&Math.random()<L*0.35){Math.random()<.5?inp.aP=1:inp.bP=1;return inp}
  // ANTI-AIR deck: one decision per jump, fired when they come down in range
  if(canAct(f)&&O.state==='jump'&&dist<100){const id=frameNo-O.st;
    if(ai.aa!==id){ai.aa=id;ai.aaMove=null;const cards=[[lerp(.35,.1,L),()=>{},'let it land'],[lerp(.2,.4,L),plan('guard',22),'block'],[.12+.25*L,()=>{ai.aaMove='kick'},'standing kick'],[.08+.15*L,()=>{ai.aaMove='jump'},'air-to-air']];
      if(s2==='rising'&&rdy2)cards.push([lerp(.1,.9,L),()=>{ai.aaMove='sp2'},'martelo']);
      if(sp==='takeover'&&rdy)cards.push([lerp(.1,.8,L),()=>{ai.aaMove='sp'},'hostile takeover']);
      if(s3==='laser'&&rdy3)cards.push([.1+.2*L,()=>{ai.aaMove='sp3'},'laser glare']);
      card('antiair',cards)}
    if(ai.aaMove&&O.vy<1.5&&dist<(ai.aaMove==='kick'?72:ai.aaMove==='jump'?90:85)){const m=ai.aaMove;ai.aaMove=null;
      if(m==='jump'){inp.u=1;inp[tw]=1}else if(exec()){if(m==='kick')inp.bP=1;else inp[m]=1}return inp}
    if(ai.aaMove)return inp}
  // DEFEND deck: one decision per threat (an attack, a special, a projectile)
  const oa=O.atk&&O.state==='attack'&&O.ph!=='rec'&&dist<O.atk.reach+22;
  const threat=oa||(O.state==='special'&&dist<(O.sp&&O.sp.kind==='flash'?135:90)&&O.sp&&!['shuriken','strike','split','bassdrop'].includes(O.sp.kind))||(O.state==='jump'&&dist<70&&O.vy<1)||(incoming&&Math.abs(incoming.x-f.x)<75);
  if(threat&&canAct(f)){const tid=(O.atk&&O.atk.id)||(O.sp&&O.sp.id)||(incoming&&(incoming.id||'p'))||'j'+Math.floor(frameNo/40);
    if(ai.tid!==tid){ai.tid=tid;ai.react=null;
      // read high vs low: a coin-flip-ish guess when it's close, a reliable read when there's time to see it coming
      const eta=incoming&&!oa?Math.abs(incoming.x-f.x)/Math.max(.5,Math.abs(incoming.vx)):O.atk?Math.max(0,O.atk.s-O.st):8;
      ai.read=Math.random()<clamp(lerp(.5,.78,L)+clamp((eta-RT)/50,0,.2)-.1*ai.pr,.3,.95);const cards=[[lerp(.85,.18,L),()=>{ai.react='eat'},'eat it'],[lerp(.15,.82,L),()=>{ai.react='block'},'block']];
      if(incoming&&s2==='miccheck'&&rdy2)cards.push([lerp(.1,.9,L),()=>{ai.react='sp2'},'reflect']);
      if(incoming&&incoming.lv==='low')cards.push([.05+.3*L,()=>{ai.react='jump'},'jump it']);
      if(oa&&dist<60)cards.push([.03+.08*L,()=>{ai.react='back'},'backdash']);
      if(oa&&O.ph==='start'&&s2==='counter'&&rdy2)cards.push([lerp(.03,.5,L),()=>{ai.react='sp2'},'shadow counter']);
      if(oa&&O.ph==='start'&&sp==='takeover'&&rdy&&dist<70)cards.push([.03+.2*L,()=>{ai.react='sp'},'reversal']);
      card('defend',cards)}
    const R=ai.react;
    if(R==='block'){inp[aw]=1;const lo=(O.atk&&O.atk.lv==='low')||(O.sp&&O.sp.kind==='bassdrop')||(incoming&&incoming.lv==='low'),
        hi=(O.atk&&O.atk.lv==='high')||(O.sp&&O.sp.kind==='tome')||(incoming&&incoming.lv==='high');
      if(lo||hi?(ai.read?lo:hi):ai.crouchy)inp.d=1;return inp}
    if(R==='jump'){ai.react='done';inp.u=1;return inp}
    if(R==='back'){ai.react='done';inp.dash=-1;return inp}
    if(R==='sp'||R==='sp2'){ai.react='done';if(exec())inp[R]=1;return inp}}
  // keep walking / guarding for the planned time
  if(ai.dur>0){ai.dur--;const p=ai.plan;if(p==='walkF')inp[tw]=1;else if(p==='walkB'||p==='guard')inp[aw]=1;else if(p==='crouch')inp.d=1;return inp}
  if(!canAct(f))return inp;
  const C=[];// the deck being built
  // PUNISH deck: they whiffed or are recovering close by
  if(dist<75&&((O.state==='attack'&&O.ph==='rec')||(O.state==='special'&&O.sp&&O.sp.kind!=='super'&&O.st>22)||O.state==='land')){
    const pid=(O.atk&&O.atk.id)||(O.sp&&O.sp.id)||'land'+(frameNo-O.st);if(ai.pid!==pid){ai.pid=pid;
      C.push([lerp(.6,.1,L),()=>{},'too slow'],[dist<60?.4:.1,hold('bP'),'kick'],[.25,hold('aP'),'jab']);
      if(rdy)C.push([.3,SPC('sp'),'special']);if(supOK)C.push([.25+.3*L,SPC('sup'),'super']);if(canThrow(f,o))C.push([.25,()=>{inp.bP=1;inp[tw]=1},'throw']);
      return card('punish',C)}}
  // WAKE-UP deck: they're down
  if(O.state==='down'||O.state==='rise'){if(dist>60)return card('wakeup',[[1,plan('walkF',10),'approach']]);
    return card('wakeup',[[.5,plan('guard',12),'guard'],[.15+.25*L,()=>{if(O.state==='rise'&&O.st>6){inp.d=1;inp.aP=1}else{ai.plan='crouch';ai.dur=4}},'meaty low jab'],[.1,plan('walkB',10),'back off']])}
  // SUPER card in any range deck when it reaches
  if(supOK&&dist<(SUP_RANGE[f.c.id]||90)&&O.state!=='jump'&&O.state!=='hurt')C.push([.03+.12*L,SPC('sup'),'super']);
  // fighter cards that matter at every range
  if(s2==='replay'&&rdy2&&f.rh&&f.rh.length>=90&&f.rh[f.rh.length-90].hp-f.hp>12)C.push([.5,SPC('sp2'),'instant replay']);
  if(s2==='bless'&&rdy2&&dist>115&&f.hp<f.mhp*.8)C.push([.4,SPC('sp2'),'benediction']);
  if(s2==='powersuit'&&rdy2&&dist>100)C.push([.2,SPC('sp2'),'power suit']);
  if(arch(f.c).amp){// LONG-RANGE: poke at the tip, zone, back off
    if(rdy&&dist>90)C.push([.2+.15*L,SPC('sp'),'bass drop']);if(dist>64&&dist<88&&O.y<=0)C.push([.3+.25*L,hold('bP'),'tip kick']);
    if(dist<50)C.push([.2+.15*L,()=>{inp.dash=-1},'backdash']);if(dist>130)C.push([1,plan('guard',8+wait/2),'hold space']);
    if(rdy2&&dist>90)C.push([.05,SPC('sp2'),'mic check'])}
  if(dist>110){// FAR deck
    C.push([1,plan('walkF',14+wait),'walk in'],[.12*rage,both('u',tw),'jump in'],[.07*(.5+L),()=>{inp.dash=1},'dash in']);
    if(rdy&&sp==='bounce')C.push([.6,SPC('sp'),'bounce pass']);if(rdy&&(sp==='shuriken'||sp==='strike'))C.push([(sp==='strike'?.55:.8)*(ai.lastBall==='strike'?.4:1),()=>{SPC('sp')();ai.lastBall='strike'},'projectile']);if(rdy&&sp==='rush'&&dist<150)C.push([.4*rage,SPC('sp'),'rush']);
    if(rdy3&&s3==='laser'&&O.state!=='crouch')C.push([.15+.15*L,SPC('sp3'),'laser glare']);if(rdy2&&s2==='split'&&dist<150)C.push([(.15+.2*L)*(ai.lastBall==='strike'?3:1),()=>{SPC('sp2')();ai.lastBall='split'},'split shot']);
    if(rdy2&&s2==='charge'&&dist<140)C.push([.1+.1*L,SPC('sp2'),'iron charge']);return card('far',C)}
  if(dist>58){// MID deck (footsies)
    C.push([.32,plan('walkF',10+wait/2),'walk in'],[.12*rage,both('u',tw),'jump in'],[.08,plan('walkB',10),'walk back'],[.22,plan('guard',wait),'guard']);
    if(dist<64)C.push([.14,hold('bP'),'poke']);if(rdy&&!['slam','bassdrop','shuriken','strike'].includes(sp))C.push([.12*rage,SPC('sp'),'special']);
    if(rdy&&sp==='flash'&&dist<125)C.push([.3,SPC('sp'),'shutter flash']);if(rdy&&sp==='taser'&&dist<115)C.push([.06+.08*L,SPC('sp'),'taser']);
    if(rdy&&sp==='takeover'&&dist<105&&O.state!=='attack')C.push([.03+.05*L,SPC('sp'),'takeover rush']);
    if(rdy2&&s2==='charge')C.push([.06+.1*L,SPC('sp2'),'iron charge']);if(rdy2&&s2==='split')C.push([(.08+.1*L)*(ai.lastBall==='strike'?3:1),()=>{SPC('sp2')();ai.lastBall='split'},'split shot']);
    if(rdy&&sp==='strike')C.push([(.1+.1*L)*(ai.lastBall==='split'?3:1),()=>{SPC('sp')();ai.lastBall='strike'},'strike ball']);
    if(rdy3&&s3==='laser'&&O.state!=='crouch')C.push([.06+.08*L,SPC('sp3'),'laser glare']);
    return card('mid',C)}
  // CLOSE deck (pressure)
  C.push([.28,hold('aP'),'jab'],[.2,hold('bP'),'kick'],[.12,both('d','bP'),'sweep'],[.07,both('d','aP'),'low jab'],[.1,plan('walkB',12),'back off'],[.16,plan('guard',wait),'guard']);
  if(rdy&&sp==='slam')C.push([.32*(0.5+L),SPC('sp'),'bear slam']);if(rdy&&!['shuriken','slam','bassdrop'].includes(sp))C.push([.07*rage,SPC('sp'),'special']);
  if(canThrow(f,o))C.push([(O.state==='crouch'||O.state==='idle'?.5:.2)*(0.4+L),()=>{inp.bP=1;inp[tw]=1},'throw']);
  if(rdy2&&s2==='cuff'&&!['hurt','jump'].includes(O.state))C.push([.2+.3*L,SPC('sp2'),"cuff 'em"]);if(rdy2&&s2==='crossover'&&O.state!=='attack'&&O.y<=0)C.push([.06+.12*L,SPC('sp2'),'ankle breaker']);if(rdy2&&s2==='step'&&O.state!=='attack')C.push([.05+.1*L,SPC('sp2'),'legua step']);
  return card('close',C)}

// ---- FIGHT SCENE ----
function startFight(){const opp=RUN.ladder[RUN.idx];go(Fight,{p1:RUN.p1,p2:opp,stage:opp})}
const DUMMY=['STAND','BLOCK','LOW BLOCK','CROUCH'];
const Fight={enter(cfg){this.cfg=cfg;this.wins=[0,0];this.round=1;this.draws=0;this.meters=null;this.trial=null;F=this;stageMusic(cfg.stage);this.startRound()},
  startRound(){const c=this.cfg,m=RUN&&RUN.mode;this.two=m==='2p'||m==='online';this.online=m==='online';this.training=m==='training'||m==='trials';this.trial=m==='trials'?(this.trial||{i:0,step:0,clear:0}):null;
    this.tDmg=0;this.tHits=0;this.tBest=this.tBest||0;this.inLog=[];
    const a1=!!(RUN&&RUN.alt&&RUN.alt[0]),a2=c.p1===c.p2?!a1:!!(RUN&&RUN.alt&&RUN.alt[1]);
    const k1=skinned(c.p1,0),k2=skinned(c.p2,1);this.p1=new Fighter(k1.skinKey||c.p1,0,false,a1);this.p2=new Fighter(k2.skinKey||c.p2,1,!this.two,c.p1===c.p2&&k1!==k2?false:a2);if(this.meters){this.p1.meter=this.meters[0];this.p2.meter=this.meters[1]}
    // story mode: carry the super meter into the boss duel; the final boss is your own SHADOW (tougher, hits harder)
    if(RUN&&RUN.mode==='story'){if(RUN.meter)this.p1.meter=RUN.meter;if(RUN.shadow){this.p2.shadow=true;this.p2.alt=false;this.p2.hp=this.p2.mhp=this.p2.trail=Math.round(this.p2.mhp*1.25)}}
    this.cine=null;this.proj=[];this.parts=[];this.texts=[];this.hitFx=[];
    this.time=60;this.tf=0;this.phase='intro';this.pt=0;this.hitstop=0;this.shake=0;this.slow=0;this.superFlash=0;this.camFlash=0;this.comboShow=null;this.paused=false;this.winner=-1;this.banner=null;
    const final=this.wins[0]===1&&this.wins[1]===1;setTimeout(()=>say(final?'Final round':`Round ${['one','two','three','four','five'][this.round-1]||this.round}`),200);SFX.bell()},
  onKO(att,def){if(this.phase!=='play')return;if(!att.cpu&&!this.training&&att.state==='special'&&att.sp&&att.sp.kind==='super')badge('super');this.phase='ko';this.pt=0;this.slow=50;this.koSide=att.side;SFX.ko();this.shake=8;say('K.O.!',0.9,0.5)},
  update(){
    if(this.paused){this.updatePause();return}
    if(!this.online&&(pressed.start||(this.two&&pressed2.start))&&this.phase==='play'){this.paused=true;this.psel=0;SFX.ok();return}
    if(this.cine){if(++this.cine.t>=this.cine.n)this.cine=null;return}
    // freezes (hit-stop, super flash, slow-mo): presses still go into the buffer, and the buffer doesn't age
    const frozen=this.hitstop>0||this.superFlash>0||(this.slow>0&&(this.slow-1)%3);
    if(frozen){for(const f of[this.p1,this.p2]){for(const k of['bufA','bufB','tapF','tapB'])if(f[k]!=null)f[k]++}
      if(this.phase==='play'){if(pressed.a){this.p1.bufA=this.p1.lastA=frameNo}if(pressed.b){this.p1.bufB=this.p1.lastB=frameNo}
        if(this.two){if(pressed2.a){this.p2.bufA=this.p2.lastA=frameNo}if(pressed2.b){this.p2.bufB=this.p2.lastB=frameNo}}}
      if(this.hitstop>0)this.hitstop--;else if(this.superFlash>0)this.superFlash--;else this.slow--;return}
    if(this.slow>0)this.slow--;
    this.pt++;const p1=this.p1,p2=this.p2;
    if(this.phase==='intro'){if(this.pt===80){SFX.special();say('Fight!',1.1,0.6)}if(this.pt>=105)this.phase='play'}
    const none={l:0,r:0,u:0,d:0,aP:0,bP:0,sp:0,sp2:0,sp3:0,dash:0};
    const pin=this.phase==='play'?p1.cpu?aiInput(p1,p2):{l:held.left,r:held.right,u:held.up,d:held.down,aP:pressed.a,bP:pressed.b,sp:0}:none;
    if(this.training&&!this.trial&&pressed.select){this.dummy=DUMMY[(DUMMY.indexOf(this.dummy||'STAND')+1)%DUMMY.length];SFX.move()}
    const away=p1.x>p2.x?'l':'r',dm=this.dummy||'STAND';
    const cin=this.phase!=='play'?none:this.two?{l:held2.left,r:held2.right,u:held2.up,d:held2.down,aP:pressed2.a,bP:pressed2.b,sp:0}
      :this.training?(dm==='STAND'?none:dm==='CROUCH'?{...none,d:1}:{...none,[away]:1,d:dm==='LOW BLOCK'?1:0}):aiInput(p2,p1);
    if(this.training&&this.phase==='play'){this.time=99;if(p2.state==='idle'&&p1.comboT===0&&p2.hp<p2.mhp){p2.hp=p2.trail=p2.mhp}if(p1.hp<30)p1.hp=p1.trail=p1.mhp;if(p1.state==='idle')p1.meter=100}
    if(this.training&&this.phase==='play')this.logInput(pin);
    if(this.trial&&this.phase==='play')this.updateTrial();
    control(p1,p2,pin);control(p2,p1,cin);
    updateF(p1,p2);updateF(p2,p1);separate(p1,p2);updateProj();
    for(const p of this.parts){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.l--}this.parts=this.parts.filter(p=>p.l>0);
    this.texts.forEach(t=>{t.l--;t.y-=0.4});this.texts=this.texts.filter(t=>t.l>0);this.hitFx.forEach(h=>h.l--);this.hitFx=this.hitFx.filter(h=>h.l>0);
    if(this.camFlash>0)this.camFlash--;
    if(this.comboShow&&--this.comboShow.l<=0)this.comboShow=null;if(this.shake>0)this.shake*=0.85;if(this.shake<0.3)this.shake=0;
    if(this.phase==='play'&&!this.training){if(++this.tf>=60){this.tf=0;this.time--;if(this.time<=10&&this.time>0)SFX.tick();if(this.time<=0){this.phase='time';this.pt=0;say('Time!');
      this.winner=p1.hp>p2.hp?0:p2.hp>p1.hp?1:-1}}}
    if(this.phase==='ko'){const w=this.koSide,wf=w?p2:p1;if(this.pt===70&&['idle','walk','crouch','land','block'].includes(wf.state)){wf.state='win';wf.st=0}
      if(this.pt===72){this.celebrate(w);fighterVoice(wf,'win')}
      if(this.pt===40&&wf.hp>=wf.mhp){say('Perfect!');if(!wf.cpu&&!this.training)badge('perfect')}if(this.pt>=170)this.endRound(w)}
    if(this.phase==='time'){const w=this.winner;if(this.pt===60&&w>=0){const wf=w?p2:p1;wf.state='win';wf.st=0;this.celebrate(w);fighterVoice(wf,'win',0.5)}if(this.pt>=160)this.endRound(w)}},
  celebrate(w){if(this.training||w<0||(w!==0&&!this.two))return;if(this.wins[w]+1>=2)CEL.start(1);else CEL.burst(46)},
  // input display (training / trials): the last 12 directions and buttons, newest at the top
  logInput(pin){const f=this.p1,d=f.hist[f.hist.length-1]||5,L=this.inLog,top=L[0];
    if(top&&top.d===d&&!pin.aP&&!pin.bP){top.n++;return}L.unshift({d,a:!!pin.aP,b:!!pin.bP,n:1});if(L.length>12)L.pop()},
  drawInputs(){const L=this.inLog;if(!L||!L.length)return;ctx.fillStyle='rgba(0,0,10,.45)';ctx.fillRect(1,44,30,L.length*9+3);
    L.forEach((e,i)=>{const y=46+i*9,cx=8,cy=y+3;ctx.fillStyle=i?'#9ab':'#fff';
      if(e.d===5)ctx.fillRect(cx-1,cy-1,2,2);else{const dx=((e.d-1)%3)-1,dy=1-Math.floor((e.d-1)/3);
        for(let k=-3;k<=3;k++)ctx.fillRect(Math.round(cx+dx*k*.8)-1,Math.round(cy+dy*k*.8)-1,2,2);ctx.fillRect(cx+dx*3-1+(dy?-1:0),cy+dy*3-1+(dx?-1:0),dx?2:4,dy?2:4)}
      if(e.a)drawText('A',16,y,'#ff9a6a',1,{shadow:false});if(e.b)drawText('B',23,y,'#7ad8ff',1,{shadow:false})})},
  updateTrial(){const T=this.trial,seq=TRIALS[this.p1.c.id];
    if(T.clear>0&&--T.clear===0){T.i++;T.step=0;T.lastId=null;if(T.i>=seq.length){T.i=seq.length;T.done=true;REC.trials[this.p1.c.id]=seq.length;saveRec();badge('trials');CEL.start(1)}}
    if(!T.clear&&!T.done&&this.p1.comboT===0&&T.step>0&&this.p1.state!=='special')T.step=0;
    if(pressed.select&&!T.done){T.i=(T.i+1)%seq.length;T.step=0;T.clear=0;SFX.move()}},
  drawTrial(){const T=this.trial,seq=TRIALS[this.p1.c.id];box(14,32,228,34,'rgba(10,10,30,.85)','#3ae8ff');
    if(T.done){drawText('ALL TRIALS CLEAR!',128,44,'#fff',1,{align:'center',grad:FIRE,outline:'#200'});return}
    const st=seq[T.i];drawText(T.clear?`TRIAL ${T.i+1}/${seq.length}  CLEAR!`:`TRIAL ${T.i+1}/${seq.length}: LAND EVERY HIT IN ONE COMBO`,128,34,T.clear?'#7aff8a':'#ffe66a',1,{align:'center',shadow:false});
    const cells=st.map(k=>{const nm=TNAME[k]||k,ky=TKEY[k]||'';return{nm,ky,w:Math.max(textW(nm),textW(ky))}}),tot=cells.reduce((a,c)=>a+c.w,0)+(cells.length-1)*14;let x=128-tot/2;
    cells.forEach((c,i)=>{const done=T.clear||i<T.step,cx=x+c.w/2;drawText(c.nm,cx,45,done?'#7aff8a':i===T.step?'#ffffff':'#aab',1,{align:'center',shadow:false});
      drawText(c.ky,cx,55,done?'#3a8a4a':'#ff9a3a',1,{align:'center',shadow:false});x+=c.w;if(i<cells.length-1){drawText('>',x+4,50,'#667',1,{shadow:false});x+=14}});
    drawText('SELECT: NEXT TRIAL',128,172,'#9ad',1,{align:'center',outline:'#000'})},
  endRound(w){if(this.phase==='done')return;this.phase='done';this.meters=[this.p1.meter,this.p2.meter];
    if(w>=0)this.wins[w]++;else if(++this.draws>=2){this.wins[1]=2;w=1}
    const need=RUN&&RUN.mode==='story'?1:2;
    if(this.wins[0]>=need||this.wins[1]>=need){const pw=this.wins[0]>=need?0:1;goFade(()=>go(Result,pw,this.cfg));return}
    goFade(()=>{this.round++;this.startRound()})},
  updatePause(){if(pressed.up){this.psel=(this.psel+2)%3;SFX.move()}if(pressed.down){this.psel=(this.psel+1)%3;SFX.move()}if(pressed.start||(pressed.a&&this.psel===0)||pressed.b){this.paused=false;SFX.back();return}
    if(pressed.a&&this.psel===2){SHOWBOX=!SHOWBOX;SFX.ok();return}
    if(pressed.a&&this.psel===1){this.paused=false;goFade(()=>{go(Title);Title.ph='menu'})}},
  draw(){const sh=this.shake,ox=sh?Math.round(rnd(-sh,sh)):0,oy=sh?Math.round(rnd(-sh,sh)):0;const c=CH[this.cfg.stage];
    ctx.save();ctx.translate(ox,oy);ctx.drawImage(padStage(c.stage),-4,-4);
    const g=ctx.createLinearGradient(0,0,0,40);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-4,-4,W+8,44);
    if(this.superFlash>0){ctx.fillStyle='rgba(0,0,20,.55)';ctx.fillRect(-4,-4,W+8,H+8)}
    for(const f of[this.p1,this.p2])if(arch(f.c).rhythm&&f.y<=0){const m=frameNo%BEAT;if(m<8){ctx.globalAlpha=(1-m/8)*.7;ctx.strokeStyle=f.c.col.aura;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(f.x,GY+1,18+m*2,3+m*.4,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1}}
    for(const f of[this.p1,this.p2]){const s=Math.max(.35,1-f.y/110);ctx.fillStyle='rgba(0,0,0,.32)';ctx.beginPath();ctx.ellipse(f.x,GY+1,22*s,3.5*s,0,0,Math.PI*2);ctx.fill()}
    const order=(this.p2.state==='attack'||this.p2.state==='special'||this.p2.state==='slamming')?[this.p1,this.p2]:[this.p2,this.p1];
    order.forEach(drawFighter);
    for(const p of this.proj)p.kind==='prong'?drawProng(p):p.kind==='wave'?drawWave(p):p.kind==='quake'?drawQuake(p):p.kind==='bball'?drawBBall(p):p.kind?drawBall(p):drawStar(p);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='bassdrop'&&f.st>=10&&f.st<24)drawRing(f.x,f.st-10,f.c.col.aura,14);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='super')drawSuperFx(f);
    for(const f of[this.p1,this.p2])if(f.cuffed>0)drawCuffs(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='flash'&&f.sp.lx!=null&&f.st<24)drawReticle(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='laser')drawLaser(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='bless'&&f.st>6){const a=Math.min(.35,(f.st-6)/40)*(f.st>70?(78-f.st)/8:1);
      const g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,'rgba(255,230,140,0)');g.addColorStop(1,`rgba(255,230,140,${a})`);ctx.fillStyle=g;ctx.fillRect(Math.round(f.x-22),0,44,GY)}
    // LONG-RANGE (Marcus): a visible sound wave fills the gap from his fist/foot to the end of his reach
    for(const f of[this.p1,this.p2])if(arch(f.c).amp&&f.atk&&(f.state==='attack'||f.state==='jump')&&phaseOf(f)==='active'&&f.atk.tip!=null){const a=f.atk,fc=f.face,
      x0=f.x+fc*a.tip,x1=f.x+fc*a.reach,yc=GY-f.y-(a.y1+a.y2)/2,hh=Math.max(6,(a.y2-a.y1)/2),k=(frameNo>>1)&1;
      ctx.fillStyle='rgba(255,74,106,.22)';ctx.beginPath();ctx.moveTo(x0,yc-3);ctx.lineTo(x1,yc-hh);ctx.lineTo(x1,yc+hh);ctx.lineTo(x0,yc+3);ctx.fill();
      for(let i=0;i<3;i++){const p=(i+1+k*.5)/3.5,x=x0+(x1-x0)*p,r=3+p*(hh-2);ctx.lineWidth=2;ctx.strokeStyle=i===2?'#ffffff':'#ff4a6a';ctx.beginPath();ctx.arc(Math.round(x-fc*r),Math.round(yc),r,fc>0?-1.1:Math.PI-1.1,fc>0?1.1:Math.PI+1.1);ctx.stroke()}}
    if(SHOWBOX){ctx.lineWidth=1;for(const f of[this.p1,this.p2]){const h=f.hurt();ctx.strokeStyle='#3a8aff';ctx.strokeRect(Math.round(h.x1)+.5,Math.round(GY-h.y2)+.5,Math.round(h.x2-h.x1),Math.round(h.y2-h.y1))}
      ctx.strokeStyle='#ff3a3a';for(const f of[this.p1,this.p2])if(f.atk&&(f.state==='attack'||f.state==='jump')&&phaseOf(f)==='active'){const A=f.atk,h=f.H*(A.crouch?.7:1),cy=f.y+h*A.hy,x1=f.face>0?f.x:f.x-A.reach,y2=A.y1!=null?f.y+A.y2:cy+A.hh/2,y1=A.y1!=null?f.y+A.y1:cy-A.hh/2;
        ctx.strokeRect(Math.round(x1)+.5,Math.round(GY-y2)+.5,Math.round(A.reach),Math.round(y2-y1))}
      ctx.strokeStyle='#ff3a3a';for(const b of this.dbg||[])if(frameNo-b.f<=2)ctx.strokeRect(Math.round(b.x1)+.5,Math.round(GY-b.y2)+.5,Math.round(b.x2-b.x1),Math.round(b.y2-b.y1));
      if(this.dbg&&this.dbg.length>40)this.dbg=this.dbg.filter(b=>frameNo-b.f<=2);drawText('HITBOXES',4,40,'#ff3a3a',1,{outline:'#000'})}
    for(const h of this.hitFx)drawHitFx(h);
    for(const p of this.parts){ctx.fillStyle=p.c;ctx.globalAlpha=p.dust?Math.min(1,p.l/12)*.7:1;const s=p.dust?3:2;ctx.fillRect(p.x|0,p.y|0,s,s)}ctx.globalAlpha=1;
    ctx.restore();
    CEL.draw();
    for(const t of this.texts){ctx.globalAlpha=Math.min(1,t.l/12);drawText(t.s,t.x,t.y,'#fff',1,{align:'center',grad:FIRE,outline:'#200'});ctx.globalAlpha=1}
    const rp=[this.p1,this.p2].find(f=>f.state==='special'&&f.sp&&f.sp.kind==='replay'&&f.st<22);
    if(rp){ctx.fillStyle='rgba(40,200,255,.08)';ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(0,0,0,.18)';for(let y=(frameNo*2)%4;y<H;y+=4)ctx.fillRect(0,y,W,1);
      const jy=(frameNo*7)%H;ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(0,jy,W,3);if((frameNo>>3)&1)drawText('<< REPLAY',rp.side?248:8,44,'#fff',1,{align:rp.side?'right':'left',outline:'#036'})}
    if(this.camFlash>0){ctx.fillStyle=`rgba(255,255,255,${Math.min(1,this.camFlash/5)})`;ctx.fillRect(0,0,W,H)}
    if(!this.paused)this.drawHUD();if(this.cine)this.drawCine();this.drawBanner();if(this.paused)this.drawPause()},
  drawCine(){const C=this.cine,f=C.by,t=C.t,k=Math.min(1,t/6),out=t>C.n-8?(C.n-t)/8:1;ctx.fillStyle=`rgba(0,0,12,${.6*out})`;ctx.fillRect(0,0,W,H);
    ctx.save();ctx.globalAlpha=out;const bandY=58,bandH=74;ctx.fillStyle=f.c.col.aura;ctx.globalAlpha=.85*out;ctx.beginPath();ctx.moveTo(0,bandY+10);ctx.lineTo(W,bandY);ctx.lineTo(W,bandY+bandH-10);ctx.lineTo(0,bandY+bandH);ctx.fill();
    ctx.globalAlpha=out;ctx.fillStyle='rgba(0,0,0,.45)';for(let y=bandY;y<bandY+bandH;y+=3)ctx.fillRect(0,y,W,1);
    ctx.beginPath();ctx.moveTo(0,bandY+10);ctx.lineTo(W,bandY);ctx.lineTo(W,bandY+bandH-10);ctx.lineTo(0,bandY+bandH);ctx.clip();
    const img=f.c.porm,side=f.side,px=side?Math.round(W-img.width+8+(1-k)*120):Math.round(-8-(1-k)*120);if(side)drawMirror(img,px,bandY+bandH-img.height+16);else ctx.drawImage(img,px,bandY+bandH-img.height+16);
    ctx.restore();const nm=SUPER_NAME[f.c.id],sx=side?96:160,tx=Math.round(sx+(1-k)*(side?-60:60));
    drawText('SUPER',tx,bandY+18,'#fff',2,{align:'center',grad:FIRE,outline:'#200'});drawText(nm,tx,bandY+40,'#fff',textW(nm,2)>150?1:2,{align:'center',outline:'#200'});
    if(t<4){ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillRect(0,0,W,H)}},
  drawHUD(){const p=[this.p1,this.p2];
    p.forEach((f,i)=>{const bx=i?146:26,bw=84,by=6;ctx.fillStyle='#000';ctx.fillRect(bx-1,by-1,bw+2,10);ctx.fillStyle='#ffd23a';ctx.fillRect(bx-2,by-2,bw+4,1);ctx.fillRect(bx-2,by+9,bw+4,1);
      ctx.fillStyle='#401018';ctx.fillRect(bx,by,bw,8);const tw=Math.round(bw*f.trail/f.mhp),hw=Math.round(bw*f.hp/f.mhp);
      ctx.fillStyle='#e02a2a';i?ctx.fillRect(bx+bw-tw,by,tw,8):ctx.fillRect(bx,by,tw,8);
      const low=f.hp<25&&(frameNo>>3)&1;ctx.fillStyle=low?'#ff7a3a':'#ffd23a';i?ctx.fillRect(bx+bw-hw,by,hw,8):ctx.fillRect(bx,by,hw,8);ctx.fillStyle=low?'#ffc090':'#fff3a0';i?ctx.fillRect(bx+bw-hw,by,hw,2):ctx.fillRect(bx,by,hw,2);
      {const sl=[[f.c.special,f.spCD,'#ff9a3a','#ffd9a0'],[f.c.special2,f.spCD2,'#3ae8ff','#bff6ff'],[f.c.special3,f.spCD3,'#ff4a5a','#ffc0c8']].filter(q=>q[0]),n=sl.length,g=2,sw=Math.floor((bw-g*(n-1))/n);
        ctx.fillStyle='#000';ctx.fillRect(bx-1,by+9,bw+2,5);
        sl.forEach(([k,cd,c1,c2],j)=>{const sx=i?bx+bw-(j+1)*sw-j*g:bx+j*(sw+g),fr=1-Math.max(0,cd||0)/(SPCD[k]||90),mw=Math.round(sw*fr),rdy=!(cd>0);
          ctx.fillStyle='#22203a';ctx.fillRect(sx,by+10,sw,3);ctx.fillStyle=rdy?((frameNo>>3)&1?c1:c2):c1+'88';i?ctx.fillRect(sx+sw-mw,by+10,mw,3):ctx.fillRect(sx,by+10,mw,3)})}
      const ix=i?232:2;ctx.fillStyle='#ffd23a';ctx.fillRect(ix-1,3,24,24);ctx.imageSmoothingEnabled=true;
      if(i){ctx.save();ctx.translate(ix+22,4);ctx.scale(-1,1);ctx.drawImage(f.c.head,0,0,22,22);ctx.restore()}else ctx.drawImage(f.c.head,ix,4,22,22);ctx.imageSmoothingEnabled=false;
      drawText(f.c.name+(f.alt?' 2':''),i?bx+bw:bx,by+15,'#fff',1,{align:i?'right':'left',outline:'#000'});
      const nw=textW(f.c.name+(f.alt?' 2':''))+6,lo=nw+18>58;for(let k=0;k<this.wins[i];k++){const sx=lo?(i?bx+bw-6-k*9:bx+k*9):(i?bx+bw-nw-6-k*9:bx+nw+k*9);drawText('*',sx,by+(lo?25:15),'#ffd23a',1,{outline:'#000'})}});
    ctx.fillStyle='#000';ctx.fillRect(114,2,28,20);ctx.fillStyle='#ffd23a';ctx.fillRect(115,3,26,18);ctx.fillStyle='#1a1430';ctx.fillRect(116,4,24,16);
    drawText(String(Math.max(0,this.time)).padStart(2,'0'),128,6,this.time<=10?'#ff5a4a':'#fff',2,{align:'center',shadow:false});
    [this.p1,this.p2].forEach((f,i)=>{const w=66,x=i?W-6-w:6,y=185,full=f.meter>=100,mw=Math.round(w*f.meter/100);
      ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,w+2,6);ctx.fillStyle='#1a1638';ctx.fillRect(x,y,w,4);
      ctx.fillStyle=full?((frameNo>>2)&1?'#ffffff':'#ff4ad8'):'#b03adf';i?ctx.fillRect(x+w-mw,y,mw,4):ctx.fillRect(x,y,mw,4);
      drawText(full?'SUPER!':'SUPER',i?x-4:x+w+4,y-2,full?((frameNo>>3)&1?'#ffe66a':'#ff8ad8'):'#7a6aa0',1,{align:i?'right':'left',outline:'#000'});
      if(this.online){const me=i===(NET.role==='host'?0:1);drawText(me?'YOU':'',i?W-10:10,30,'#7aff8a',1,{align:i?'right':'left',outline:'#000'})}
      else if(this.two)drawText(i?'2P':'1P',i?W-10:10,30,i?'#5ab4ff':'#ff5a5a',1,{align:i?'right':'left',outline:'#000'})});
    if(this.cinema){}else if(this.trial){this.drawTrial();this.drawInputs()}
    else if(this.training){this.drawInputs();box(60,26,136,14,'rgba(10,10,30,.75)','#3ae8ff');drawText(`HITS ${this.tHits}  DMG ${Math.round(this.tDmg)}  BEST ${this.tBest}`,128,29,'#fff',1,{align:'center',shadow:false});
      if(!this.cinema)drawText('SELECT: DUMMY '+(this.dummy||'STAND'),128,172,'#9ad',1,{align:'center',outline:'#000'})}
    if(this.comboShow){const c=this.comboShow,tr=this.training;const x=c.side?248:tr?36:8;drawText(c.n+' HITS!',x,tr?54:44,'#fff',1,{align:c.side?'right':'left',grad:FIRE,outline:'#300'})}},
  winText(w){if(this.online)return w===(NET.role==='host'?0:1)?'YOU WIN':'YOU LOSE';return this.two?`P${w+1} WINS`:w===0?'YOU WIN':'YOU LOSE'},
  drawBanner(){const pt=this.pt;let s=null,sc=3,grad=FIRE;
    if(this.phase==='intro'){const fin=this.wins[0]===1&&this.wins[1]===1;if(pt<78)s=fin?'FINAL ROUND':'ROUND '+this.round;else s='FIGHT!';sc=pt<78?(fin?2:3):4}
    else if(this.phase==='ko'){if(pt<100)s='K.O.';else{const wf=this.koSide?this.p2:this.p1;s=wf.hp>=wf.mhp?'PERFECT!':this.winText(this.koSide);sc=s==='PERFECT!'?3:3}if(pt<100)sc=5}
    else if(this.phase==='time'){s=pt<80?'TIME OVER':this.winner<0?'DRAW GAME':this.winText(this.winner);sc=2}
    if(!s)return;if(this.phase==='ko'&&pt<100)grad=['#fff','#ffd0d0','#ff9a9a','#ff5a5a','#e02a2a','#b01a1a','#800'];
    let k=1;if(this.phase==='intro'){const lt=pt<78?pt:pt-78;k=lt<6?2-lt/6:1}
    const s2=Math.max(1,Math.round(sc*k));drawText(s,128,84-s2*3.5,'#fff',s2,{align:'center',grad,outline:'#200',ow:1})},
  drawPause(){ctx.fillStyle='rgba(0,0,10,.75)';ctx.fillRect(0,0,W,H);drawText('PAUSE',128,4,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});drawText('V'+VER,252,184,'#667',1,{align:'right',shadow:false});
    const c=this.p1.c;
    const m=[['PUNCH / KICK','A / B'],['LOW PUNCH / SWEEP','DOWN + A / B'],['JUMP ATTACK','UP/JUMP, THEN A OR B'],['BLOCK','HOLD BACK'],['DASH','TAP FWD OR BACK TWICE'],[c.spName,'SP'],...(c.sp2Name?[[c.sp2Name,'DOWN+SP']]:[]),...(c.sp3Name?[[c.sp3Name,'BACK+SP']]:[]),[SUPER_NAME[c.id],'FWD+SP, FULL BAR'],['THROW','FWD/BACK+B CLOSE'],...(arch(c).type?[[arch(c).type,arch(c).trait]]:[]),['COMBO',BNB[c.id]||'']];
    const bh=18+m.length*9;box(12,22,232,bh);drawText('MOVES - '+c.name,128,26,'#ffe66a',1,{align:'center'});this.pmy=22+bh+6;
    m.forEach(([k,v],i)=>{const y=38+i*9,cm=k==='COMBO';drawText(k,18,y,cm?'#ffe66a':'#ff9a6a',1,{shadow:false});drawText(v,238,y,cm?'#ffe66a':'#fff',1,{align:'right',shadow:false})});
    ['RESUME','QUIT TO TITLE','HITBOXES: '+(SHOWBOX?'ON':'OFF')].forEach((s,i)=>drawText((this.psel===i?'> ':'  ')+s,128,this.pmy+i*11,this.psel===i?'#ffe66a':'#99a',1,{align:'center'}))}};

// ---- frame-animated fighters ----
// Key frames per animation: pk = frame where the strike lands; jump = [prep, rise, apex, fall, land];
// special = [[tick,frame],...] piecewise map over the move's own timeline. Per-fighter overrides in CH[id].ak.
const AK={punch:{pk:4},kick:{pk:4},sweep:{pk:4},lowkick:{pk:3},cpunch:{pk:2},airkick:{pk:2},airpunch:{pk:2},jump:{prep:2,rise:3,apex:5,fall:6,land:7},fall:{air:4},
  special:{rush:[[0,0],[7,3]],shuriken:[[0,0],[9,6],[18,8]],slam:[[0,0],[10,8]],spin:[[0,0],[40,99]],flash:[[0,0],[17,3],[18,4],[26,7],[36,8]],tome:[[0,0],[13,6],[14,7],[22,7],[34,8]],taser:[[0,0],[7,5],[8,6],[14,7],[30,8]],strike:[[0,0],[10,7],[28,8]],takeover:[[0,0],[5,2],[7,3],[11,4],[30,7]],bassdrop:[[0,0],[9,4],[10,5],[13,6],[22,7],[34,8]],throwB:[[0,0],[10,5],[12,7],[26,8]],bounce:[[0,0],[9,4],[11,6],[28,8]],charge:[[0,0],[24,5],[27,6],[30,7],[60,7],[78,8]]}};
// the strike frame shown while a move is active = the frame its hitbox was measured on (fully extended)
const HB_ANIM={punch:'jab',kick:'kick',cpunch:'cjab',lowkick:'sweep',airpunch:'jpunch',airkick:'jkick'};
function akOf(c,k){const o=(c.ak&&c.ak[k])||AK[k],m=c.anim&&c.anim[k],h=HB_ANIM[k]&&HBX[c.id]&&HBX[c.id].moves[HB_ANIM[k]];
  if(h&&m&&!c.skinKey)return{...o,pk:Math.min(h.frame,m.n-1)};return m&&m.pk!=null?{...o,pk:m.pk}:o}
function kf(t,pts){if(t<=pts[0][0])return pts[0][1];for(let i=1;i<pts.length;i++){const[a,fa]=pts[i-1],[b,fb]=pts[i];if(t<=b)return Math.round(fa+(fb-fa)*(t-a)/(b-a))}return pts[pts.length-1][1]}
function pose(f){const A=f.c.anim,t=f.st,fc=f.face;if(!A)return null;const n=k=>A[k].n,last=k=>A[k].n-1,P=(k,i)=>A[k]?{k,i:clamp(Math.floor(i),0,last(k))}:null;
  const strike=(k,a,tt)=>{const pk=akOf(f.c,k).pk,N=n(k);if(tt<a.s)return P(k,pk*tt/a.s);if(tt<a.s+a.a||!a.r)return P(k,pk);return P(k,pk+1+(N-pk-1)*(tt-a.s-a.a)/a.r)};
  switch(f.state){
    case'idle':return P('idle',((frameNo+f.side*17)/7)%n('idle'));
    case'walk':{if(!A.walk)return P('idle',0);const fwd=Math.sign(f.vx)===fc,i=Math.floor(frameNo/5)%n('walk');return P('walk',fwd?i:last('walk')-i)}
    case'dash':{if(!A.walk)return P('idle',0);const i=Math.floor(t/1.6)%n('walk');return P('walk',f.dashDir>0?i:last('walk')-i)}
    case'crouch':return A.crouch?P('crouch',Math.min(t/2,last('crouch'))):null;
    case'prejump':return A.jump?P('jump',akOf(f.c,'jump').prep):null;
    case'land':return A.jump?P('jump',akOf(f.c,'jump').land):null;
    case'jump':{const a=f.atk;if(a){const k=a.name==='jkick'?(A.airkick?'airkick':'kick'):(A.airpunch?'airpunch':'punch');if(A[k])return strike(k,a,f.ast)}
      if(!A.jump)return null;const j=akOf(f.c,'jump');return P('jump',f.vy>2?j.rise:f.vy>-1.5?j.apex:j.fall)}
    case'attack':{const a=f.atk;const k={jab:'punch',kick:'kick',sweep:A.lowkick?'lowkick':'sweep',cjab:A.cpunch?'cpunch':null}[a.name];
      if(k&&A[k])return strike(k,a,t);if(a.crouch&&A.crouch)return{...P('crouch',last('crouch')),limbs:true};return null}
    case'hurt':if(f.hurtK==='crouch'&&A.crouch)return P('crouch',last('crouch'));return A.hurt?P('hurt',Math.min(t/3,last('hurt'))):null;
    case'grabbed':return A.hurt?P('hurt',last('hurt')):null;
    case'throwing':{if(!A.punch)return null;const pk=akOf(f.c,'punch').pk;return P('punch',f.thr?pk:Math.min(t/1.4,last('punch')))}
    case'block':return A.block?P('block',Math.min(t,last('block'))):null;
    case'knock':{const fa=akOf(f.c,'fall');if(fa.hurtAir&&A.hurt)return P('hurt',last('hurt'));return A.fall?P('fall',Math.min(t/4,fa.air)):null}
    case'down':case'ko':return A.fall?P('fall',Math.min(akOf(f.c,'fall').air+(f.state==='ko'?t:t)/3,last('fall'))):null;
    case'rise':return A.fall?P('fall',last('fall')*(1-t/12)):null;
    case'win':return A.win?P('win',t<n('win')*7?t/7:last('win')-(Math.floor(t/12)%2)):P('idle',(frameNo/7)%n('idle'));
    case'special':{const s=f.sp;if(s&&s.kind==='super'&&s.pa&&A[s.pa])return P(s.pa,s.loop?s.pf%n(s.pa):s.pf);
      if(s&&s.kind==='super'){if(!s.hits)return A.walk?P('walk',Math.floor(t/1.4)%n('walk')):null;
        if(s.hits>=99)return P('idle',0);if(s.hits>=6)return A.special?P('special',last('special')):null;
        const k=s.hits%2?'kick':'punch';return A[k]?P(k,akOf(f.c,k).pk):null}
      if(s&&(s.two||s.kind==='laser')){const k=s.kind;
        if(k==='step'){if(!A.walk)return null;return t<4?(A.crouch?P('crouch',2):P('idle',0)):P('walk',Math.floor(t/1.5)%n('walk'))}
        if(k==='counter'){if(s.trig==null)return A.block?P('block',Math.min(t,last('block'))):null;const kk=t-s.trig;return A.kick?P('kick',kf(kk,[[0,1],[7,4],[16,5],[24,7]])):null}
        if(k==='charge')return A.special?P('special',t<8?t/8*5:t<30?7+((t>>2)&1):8):null;
        if(k==='rising'){const a=A.airkick?'airkick':'kick';return A[a]?P(a,kf(t,[[0,0],[4,2],[14,last(a)],[26,last(a)]])):null}
        if(k==='replay')return P('idle',last('idle')-(Math.floor(t/1.5)%n('idle')));
        if(k==='cuff')return A.special2?P('special2',kf(t,[[0,0],[4,2],[12,5],[34,last('special2')]])):null;
        if(k==='laser'){const a=A.special3?'special3':A.special2?'special2':null;return a?P(a,a==='special3'?kf(t,[[0,0],[8,5],[9,6],[13,7],[26,8],[34,4]]):kf(t,[[0,0],[12,Math.min(5,last(a))],[34,last(a)]])):null}
        if(k==='crossover')return A.special2?P('special2',t<8?t/8*2:2+Math.floor((t-8)/2)%(n('special2')-2)):null;
        if(k==='miccheck')return A.special2?P('special2',kf(t,[[0,0],[10,5],[30,last('special2')]])):null;
        if(k==='powersuit')return A.special2?P('special2',kf(t,[[0,0],[30,last('special2')]])):null;
        if(k==='split')return A.special2?P('special2',kf(t,[[0,0],[16,6],[36,last('special2')]])):null;
        if(k==='bless')return A.special2?P('special2',kf(t,[[0,0],[10,4],[66,last('special2')-1],[78,last('special2')]])):(A.block?P('block',last('block')):null);
        return null}
      if(!A.special||!s)return null;
      if(s.kind==='rush'&&t>=7)return P('special',t<26?5+Math.floor((t-7)/3)%4:t<31?last('special'):3);// flurry loops the punch frames
      const L=last('special');return P('special',kf(t,(akOf(f.c,'special')[s.kind]||[[0,0],[36,99]]).map(([a,b])=>[a,Math.min(b,L)])))}
    case'slamming':if(f.slam&&f.slam.kind==='throw')return A.punch?P('punch',kf(t,[[0,akOf(f.c,'punch').pk],[22,last('punch')]])):null;
      return A.throw?P('throw',kf(t,[[0,0],[30,last('throw')]])):A.win?P('win',kf(t,[[0,0],[30,last('win')]])):null;}
  return null}
function blitA(img,x,y,fc,ax,ay,rot,pivotC,ox,oy,ph){ctx.save();ctx.translate(Math.round(x+ox),Math.round(GY-y+oy));
  if(rot){if(pivotC){ctx.translate(0,-ph/2);ctx.rotate(rot);ctx.translate(0,ph/2)}else ctx.rotate(rot)}
  ctx.scale(fc,1);ctx.drawImage(img,-Math.round(ax),-ay);ctx.restore()}
function drawFighter(f){const P=pose(f);if(!P)return drawFighterLegacy(f);
  const c=f.c,a=c.anim[P.k],fr=a.fr[P.i],fc=f.face,t=f.st;let img=f.shadow?sil(fr,'#1a1030'):f.hue!=null?hueOf(fr,f.hue,f.sat,f.whiten):f.alt?altOf(fr):fr;if(f.flash>0&&(f.flash&1)&&!F.cinema)img=sil(fr,'#ffffff');
  let rot=0,pivotC=false,ox=0,oy=0;if(f.state==='grabbed'){rot=f.rot||0;pivotC=true}if(f.state==='hurt'&&t<6)ox=-fc*2+(t&1?1:-1);
  // hurt reactions by where the hit landed: high = head snaps back, mid = doubles over, low = legs buckle, crouch = jolted down
  if(f.state==='hurt'){const k=Math.max(0,1-t/16),K=f.hurtK;if(K==='high')rot=-fc*.16*k;else if(K==='mid')rot=fc*.1*k;else if(K==='low'){rot=-fc*.05*k;oy=Math.round(3*k)}else if(K==='crouch'){oy=Math.round(2*k);ox=-fc*3*k+(t&1?1:-1)}}
  const B=(im,x,y)=>blitA(im,x,y,fc,a.ax,a.ay,rot,pivotC,ox,oy,f.H);
  for(const g of f.ghosts){ctx.globalAlpha=g.l/20;B(sil(fr,c.col.aura),g.x,g.y);ctx.globalAlpha=1}
  if(f.state==='special'&&t<10||F.superFlash>0&&F.superBy===f){const p=(frameNo&2)?2:1;ctx.globalAlpha=.6;for(const[dx,dy]of[[-p,0],[p,0],[0,-p]])B(sil(fr,c.col.aura),f.x+dx,f.y-dy);ctx.globalAlpha=1}
  if(f.inv>0&&f.state!=='down'&&!(f.sp&&f.sp.kind==='super')&&(frameNo&2))ctx.globalAlpha=.55;
  if(f.shadow){ctx.globalAlpha=.55;for(const[dx,dy]of[[-1,0],[1,0],[0,-1]])B(sil(fr,'#b04aff'),f.x+dx,f.y-dy);ctx.globalAlpha=1}
  B(img,f.x,f.y);ctx.globalAlpha=1;
  if(f.state==='block'){ctx.globalAlpha=.22;B(sil(fr,'#5aa8ff'),f.x,f.y);ctx.globalAlpha=1}
  if(f.zap>0&&(frameNo&2)){ctx.globalAlpha=.5;B(sil(fr,'#9ad8ff'),f.x,f.y);ctx.globalAlpha=1}
  if(P.limbs)drawLimbs(f)}
function drawFighterLegacy(f){const c=f.c;let img=f.flash>0&&(f.flash&1)?c.white:f.img;
  let sx=1,sy=1,rot=0,shear=0,ox=0,oy=0,pivotC=false;const t=f.st,fc=f.face;
  switch(f.state){
    case'idle':sy=1+Math.sin(frameNo*0.09+f.side)*0.018;break;
    case'walk':oy=-Math.abs(Math.sin(f.st*0.25))*1.5;shear=-fc*Math.sign(f.vx)*fc*0.04;break;
    case'crouch':sy=0.72;sx=1.05;break;
    case'prejump':case'land':sy=0.86;sx=1.06;break;
    case'jump':sy=f.vy>0?1.05:0.97;rot=fc*f.vx*0.03;if(f.atk&&phaseOf(f)!=='start'){rot+=fc*0.12}break;
    case'attack':{const a=f.atk,ph=phaseOf(f);const lean=ph==='active'?1:ph==='start'?t/a.s*0.6:0.5;shear=-fc*0.1*lean*(a.limb==='leg'?-0.6:1);ox=fc*lean*3;if(a.crouch){sy=0.72;sx=1.05}break}
    case'hurt':ox=-fc*2+(t<6?(t&1?1:-1):0);shear=fc*0.08;break;
    case'block':shear=fc*0.06;if(f.crouch){sy=0.72;sx=1.05}break;
    case'knock':rot=-fc*Math.min(1,t/16)*Math.PI*0.45;pivotC=true;break;
    case'down':case'ko':rot=-fc*Math.PI/2;sx=0.42;oy=-img.width*0.42/2+2;break;
    case'rise':{const p=Math.min(1,t/12);rot=-fc*Math.PI/2*(1-p);sx=lerp(0.42,1,p);oy=lerp(-img.width*0.21,0,p);break}
    case'win':oy=-Math.abs(Math.sin(t*0.12))*5;break;
    case'special':{const k=f.sp&&f.sp.kind;if(k==='spin'){rot=fc*t*0.42;pivotC=true}else if(k==='rush'){if(t<7){sy=0.85;sx=1.08}else{shear=-fc*0.22}}else if(k==='shuriken'){shear=t<9?fc*0.08:-fc*0.12}else if(k==='slam'){shear=-fc*0.12;ox=fc*3}break}
    case'slamming':shear=fc*0.15*Math.sin(Math.min(1,t/30)*Math.PI);break;
    case'grabbed':rot=f.rot||0;pivotC=true;break;}
  for(const g of f.ghosts){ctx.globalAlpha=g.l/20;blit(c.auraS,g.x,g.y,fc,1,1,0,-fc*0.22,0,0,false);ctx.globalAlpha=1}
  if(f.state==='special'&&f.st<10||F.superFlash>0&&F.superBy===f){const p=(frameNo&2)?2:1;ctx.globalAlpha=.6;for(const[dx,dy]of[[-p,0],[p,0],[0,-p]])blit(c.auraS,f.x+dx,f.y-dy,fc,sx,sy,rot,shear,ox,oy,pivotC);ctx.globalAlpha=1}
  if(f.inv>0&&f.state!=='down'&&(frameNo&2))ctx.globalAlpha=.55;
  blit(img,f.x,f.y,fc,sx,sy,rot,shear,ox,oy,pivotC);ctx.globalAlpha=1;
  if(f.state==='block'){ctx.globalAlpha=.3;blit(c.blue,f.x,f.y,fc,sx,sy,rot,shear,ox,oy,pivotC);ctx.globalAlpha=1}
  drawLimbs(f)}
function blit(img,x,y,fc,sx,sy,rot,shear,ox,oy,pivotC){ctx.save();ctx.translate(Math.round(x+ox),Math.round(GY-y+oy));
  if(pivotC){ctx.translate(0,-img.height/2);ctx.rotate(rot);ctx.translate(0,img.height/2)}else if(rot)ctx.rotate(rot);
  if(shear)ctx.transform(1,0,shear,1,0,0);ctx.scale(fc*sx,sy);ctx.drawImage(img,-(img.width>>1),-img.height);ctx.restore()}
function thick(x1,y1,x2,y2,w,col){const n=Math.max(1,Math.ceil(Math.hypot(x2-x1,y2-y1)));ctx.fillStyle=col;for(let i=0;i<=n;i++){const t=i/n;ctx.fillRect(Math.round(x1+(x2-x1)*t-w/2),Math.round(y1+(y2-y1)*t-w/2),w,w)}}
function drawLimbs(f){const c=f.c.col,fc=f.face,by=GY-f.y;let a=f.atk,prog=0,t;
  if(f.state==='win'&&f.st>8){const sx=f.x+fc*4,sy=by-f.H*f.c.sh+Math.abs(Math.sin(f.st*0.12))*-5;thick(sx,sy,sx+fc*6,sy-20,6,'#120e1e');thick(sx,sy,sx+fc*6,sy-20,4,c.skin);ctx.fillStyle='#120e1e';ctx.fillRect(sx+fc*6-4,sy-27,8,8);ctx.fillStyle=c.glove;ctx.fillRect(sx+fc*6-3,sy-26,6,6);return}
  if(!a||(f.state!=='attack'&&f.state!=='jump'))return;
  t=a.air?f.ast:f.st;prog=t<a.s?0.25+0.6*t/a.s:t<a.s+a.a?1:a.air?0.9:1-(t-a.s-a.a)/a.r;if(prog<=0.08)return;
  const hm=a.crouch?0.72:1,Hh=f.H*hm;
  if(a.limb==='arm'){const sx=f.x+fc*6,sy=by-Hh*f.c.sh,ex=f.x+fc*(10+(a.reach-14)*prog),ey=by-Hh*a.hy;
    thick(sx,sy,ex,ey,6,'#120e1e');thick(sx,sy,ex,ey,4,c.skin);ctx.fillStyle='#120e1e';ctx.fillRect(Math.round(ex-4),Math.round(ey-4),9,9);ctx.fillStyle=c.glove;ctx.fillRect(Math.round(ex-3),Math.round(ey-3),7,7);
    if(prog>=1&&t<a.s+a.a){ctx.fillStyle='rgba(255,255,255,.75)';ctx.fillRect(Math.round(ex-fc*18),Math.round(ey-1),12,1);ctx.fillRect(Math.round(ex-fc*14),Math.round(ey+2),9,1)}}
  else{const hx=f.x+fc*10,hy=by-Hh*f.c.hip,ex=f.x+fc*(8+(a.reach-12)*prog),ey=by-Hh*a.hy-(a.name==='sweep'?2:0);
    const kx=lerp(hx,ex,.45),ky=lerp(hy,ey,.45)-3;thick(hx,hy,kx,ky,11,'#120e1e');thick(kx,ky,ex,ey,8,'#120e1e');thick(hx,hy,kx,ky,9,c.leg);thick(kx,ky,ex,ey,6,c.leg);ctx.fillStyle='#120e1e';ctx.fillRect(Math.round(ex-(fc>0?1:9)),Math.round(ey-4),11,8);ctx.fillStyle=c.foot;ctx.fillRect(Math.round(ex-(fc>0?0:8)),Math.round(ey-3),9,6);
    if(prog>=1&&t<a.s+a.a){ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(Math.round(hx),Math.round(hy),Math.hypot(ex-hx,ey-hy)+4,fc>0?-0.6:Math.PI-0.2,fc>0?0.2:Math.PI+0.6);ctx.stroke()}}}
function drawProng(p){const o=p.owner,hx=Math.round(o.x+o.face*20),hy=Math.round(GY-o.y-o.H*.6),x=Math.round(p.x),y=Math.round(GY-p.y);
  ctx.strokeStyle='#c8d0e0';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(hx,hy);ctx.quadraticCurveTo((hx+x)/2,hy+4,x,y-2);ctx.moveTo(hx,hy+2);ctx.quadraticCurveTo((hx+x)/2,hy+6,x,y+2);ctx.stroke();
  ctx.fillStyle='#ffd23a';ctx.fillRect(x-2,y-3,4,2);ctx.fillRect(x-2,y+1,4,2);if(frameNo&1){ctx.fillStyle='#9ad8ff';ctx.fillRect(x+(p.vx>0?2:-4),y-4,2,8)}}
function drawCuffs(f){const x=Math.round(f.x),y=Math.round(GY-f.y-f.H-10),b=(frameNo>>4)&1;ctx.strokeStyle='#000';ctx.lineWidth=3;
  for(const dx of[-4,4]){ctx.beginPath();ctx.arc(x+dx,y+b,3,0,Math.PI*2);ctx.stroke()}ctx.strokeStyle='#d8dce8';ctx.lineWidth=1.5;for(const dx of[-4,4]){ctx.beginPath();ctx.arc(x+dx,y+b,3,0,Math.PI*2);ctx.stroke()}
  ctx.fillStyle='#d8dce8';ctx.fillRect(x-1,y+b,2,1);ctx.fillStyle='#000';ctx.fillRect(x-10,y+7,20,3);ctx.fillStyle='#c8d0e0';ctx.fillRect(x-9,y+8,Math.round(18*f.cuffed/300),1)}
function drawBall(p){if(p.kind==='lob'&&p.lx!=null){const a=(frameNo>>2)&1,w=13+a*3,X=Math.round(p.lx);ctx.fillStyle='rgba(208,74,255,.45)';ctx.beginPath();ctx.ellipse(X,GY,w,4,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#120e1e';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(X,GY,w,4,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#ff9aff';ctx.lineWidth=1.5;ctx.stroke();
    ctx.fillStyle='#120e1e';ctx.fillRect(X-3,GY-15,6,9);ctx.fillStyle='#ff9aff';ctx.fillRect(X-1,GY-14,2,6);ctx.fillRect(X-2,GY-9,4,1);ctx.fillRect(X-1,GY-8,2,1)}
  const x=Math.round(p.x),y=Math.round(GY-p.y),r=p.r||6,q=r/6;
  if(p.kind==='ball'){ctx.fillStyle='rgba(208,74,255,.35)';ctx.fillRect(x-p.vx*4-3,y+2,5,1);ctx.fillRect(x-p.vx*6-2,y-1,3,1)}
  ctx.fillStyle='#120e1e';ctx.beginPath();ctx.arc(x,y,r+1,0,Math.PI*2);ctx.fill();ctx.fillStyle='#7a1a8a';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#b03ad0';ctx.beginPath();ctx.arc(x-1,y-1,r-2,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffd0ff';ctx.fillRect(x-3,y-4,2,2);
  ctx.fillStyle='#120e1e';for(let i=0;i<3;i++){const a=p.rot+i*0.55,h=Math.max(2,Math.round(2*q));ctx.fillRect(Math.round(x+Math.cos(a)*3*q)-1,Math.round(y+Math.sin(a)*3*q)-1,h,h)}
  if(q>1){ctx.fillStyle='#ffd0ff';ctx.fillRect(x-Math.round(4*q),y-Math.round(5*q),Math.round(3*q),Math.round(2*q))}}
function drawStar(p){const x=Math.round(p.x),y=Math.round(GY-p.y);ctx.save();ctx.translate(x,y);ctx.rotate(p.rot);ctx.fillStyle='#120e1e';ctx.fillRect(-8,-2,16,4);ctx.fillRect(-2,-8,4,16);
  ctx.fillStyle='#c8c8e0';ctx.fillRect(-7,-1,14,2);ctx.fillRect(-1,-7,2,14);ctx.fillStyle='#fff';ctx.fillRect(-2,-2,4,4);ctx.fillStyle='#120e1e';ctx.fillRect(-1,-1,2,2);ctx.restore();
  ctx.fillStyle='rgba(180,140,255,.5)';ctx.fillRect(x-p.vx*3-4,y,6,1);ctx.fillRect(x-p.vx*5-3,y-2,4,1)}
function drawWave(p){const x=Math.round(p.x),y=Math.round(GY-p.y),d=Math.sign(p.vx),pul=(frameNo>>1)&1;
  ctx.fillStyle='rgba(255,74,106,.25)';ctx.beginPath();ctx.ellipse(x-d*6,y,14,18,0,0,Math.PI*2);ctx.fill();
  for(let i=0;i<3;i++){const r=8+i*5+pul,c=i===0?'#ffffff':i===1?'#ffb0c4':'#ff4a6a',a0=d>0?-1.05:Math.PI-1.05,a1=d>0?1.05:Math.PI+1.05,cx=x-d*(i*6+r-8);
    ctx.strokeStyle='#120e1e';ctx.lineWidth=4.5;ctx.beginPath();ctx.arc(cx,y,r,a0,a1);ctx.stroke();ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.stroke()}
  ctx.fillStyle='#ffe66a';if(pul){ctx.fillRect(x-d*18,y-12,2,2);ctx.fillRect(x-d*22,y+9,2,2)}else{ctx.fillRect(x-d*14,y+12,2,2);ctx.fillRect(x-d*24,y-6,2,2)}}
function drawQuake(p){const x=Math.round(p.x),d=Math.sign(p.vx),f=(frameNo>>1)&1,h=15+f*2;
  ctx.fillStyle='#120e1e';ctx.beginPath();ctx.moveTo(x-d*14,GY);ctx.quadraticCurveTo(x-d*2,GY-h-4,x+d*7,GY);ctx.closePath();ctx.fill();
  ctx.fillStyle='#5ae0ff';ctx.beginPath();ctx.moveTo(x-d*12,GY);ctx.quadraticCurveTo(x-d*2,GY-h,x+d*5,GY);ctx.closePath();ctx.fill();
  ctx.fillStyle='#ffffff';ctx.beginPath();ctx.moveTo(x-d*6,GY);ctx.quadraticCurveTo(x,GY-h*.6,x+d*3,GY);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(255,74,106,.8)';ctx.fillRect(x-d*(18+f*2),GY-3,3,2);ctx.fillRect(x-d*(24-f*2),GY-6,2,2)}
function drawBBall(p){const x=Math.round(p.x),y=Math.round(GY-p.y),r=6;ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(x-4,GY,8,1);
  ctx.fillStyle='#120e1e';ctx.beginPath();ctx.arc(x,y,r+1,0,Math.PI*2);ctx.fill();ctx.fillStyle='#e8701a';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#ffa04a';ctx.fillRect(x-3,y-4,3,2);ctx.strokeStyle='#3a1a08';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+Math.cos(p.rot)*r,y+Math.sin(p.rot)*r);ctx.lineTo(x-Math.cos(p.rot)*r,y-Math.sin(p.rot)*r);ctx.stroke();
  ctx.beginPath();ctx.arc(x,y,r-2,p.rot+.6,p.rot+2.4);ctx.stroke()}
function drawRing(x,k,col,n){if(k<0||k>n)return;const R=20+k*5,a=1-k/n;ctx.globalAlpha=a;ctx.lineWidth=3;ctx.strokeStyle='#120e1e';ctx.beginPath();ctx.ellipse(x,GY-2,R,5+k*.5,0,0,Math.PI*2);ctx.stroke();
  ctx.lineWidth=2;ctx.strokeStyle=col;ctx.stroke();ctx.lineWidth=1;ctx.strokeStyle='#fff';ctx.beginPath();ctx.ellipse(x,GY-2,R*.7,3+k*.3,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1}
function drawSuperFx(f){const s=f.sp,t=f.st;
  if(s.rings)for(const r0 of s.rings)drawRing(f.x,t-r0,f.c.col.aura,16);
  if(s.pil)for(const P of s.pil){const k=t-P.t0,x=Math.round(P.x);if(k<0||k>16)continue;
    if(k<7){ctx.fillStyle=`rgba(255,230,140,${.25+.1*(k&1)})`;ctx.fillRect(x-1,0,2,GY);ctx.fillStyle='rgba(255,230,140,.25)';ctx.beginPath();ctx.ellipse(x,GY,10,3,0,0,Math.PI*2);ctx.fill()}
    else{const w=k<12?15:Math.max(1,15-(k-12)*3),a=k<12?.9:Math.max(0,.9-(k-12)*.2);ctx.globalAlpha=a;ctx.fillStyle='rgba(255,220,110,.45)';ctx.fillRect(x-w-4,0,w*2+8,GY+2);
      ctx.fillStyle='#ffe66a';ctx.fillRect(x-w,0,w*2,GY+2);ctx.fillStyle='#fffbe0';ctx.fillRect(x-Math.ceil(w/3),0,Math.ceil(w/3)*2,GY+2);ctx.globalAlpha=1}}
  if(s.ph==='shoot'&&s.tx!=null){const x=Math.round(s.tx),y=Math.round(s.ty),r=12,L=5;ctx.fillStyle='#3ae8ff';
    for(const[a,b]of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.fillRect(x+a*r-(a>0?L:0),y+b*r,L,1);ctx.fillRect(x+a*r,y+b*r-(b>0?L:0),1,L)}
    if((frameNo>>2)&1){ctx.fillRect(x-1,y,3,1);ctx.fillRect(x,y-1,1,3)}drawText('REC',x+r+3,y-r,'#ff3a3a',1,{shadow:false})}
  if(s.ph==='laser'&&s.lx!=null&&t>=s.t0){const ex=Math.round(f.x+f.face*9),ey=Math.round(GY-f.y-f.H*.86),lx=Math.round(s.lx),ly=Math.round(s.ly);
    ctx.lineCap='round';ctx.strokeStyle='rgba(255,40,60,.45)';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(lx,ly);ctx.stroke();
    ctx.strokeStyle='#ff2a3a';ctx.lineWidth=3;ctx.stroke();ctx.strokeStyle='#ffe0e0';ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(lx,ly,3+((frameNo>>1)&1)*2,0,Math.PI*2);ctx.fill()}}
function drawLaser(f){const s=f.sp,t=f.st,ex=Math.round(f.x+f.face*9),ey=Math.round(GY-f.y-f.H*.86);
  if(t>=3&&t<9){const r=1+((t>>1)&1);ctx.fillStyle='#ff3a3a';ctx.fillRect(ex-r,ey-r-1,r*2,r);ctx.fillRect(ex-r-4*f.face,ey-r-1,r*2,r);ctx.fillStyle='#fff';ctx.fillRect(ex,ey-1,1,1)}
  if(t<9||t>=29||s.end==null)return;const x2=Math.round(s.end),a=t<27?1:(29-t)/2,w=t<11||t>24?4:6;ctx.globalAlpha=a;
  const x0=Math.min(ex,x2),len=Math.abs(x2-ex);
  ctx.fillStyle='rgba(255,40,60,.35)';ctx.fillRect(x0,ey-w-2,len,w*2+3);ctx.fillStyle='#ff2a3a';ctx.fillRect(x0,ey-Math.ceil(w/2)-1,len,w);ctx.fillStyle='#ffd0d0';ctx.fillRect(x0,ey-1,len,2);
  if(len<W-4){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x2,ey,3+((frameNo>>1)&1)*2,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}
function drawReticle(f){const t=f.st,x=Math.round(f.sp.lx),y=Math.round(GY-f.H*.55),r=Math.round(t<18?lerp(34,14,Math.min(1,(t-4)/12)):14+(t-18)*2),c=t<18?'#3ae8ff':'#ffffff',L=6;
  ctx.globalAlpha=t<18?1:Math.max(0,1-(t-18)/6);ctx.fillStyle='#062030';
  for(const[sx,sy]of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.fillRect(x+sx*r-(sx>0?L:0)-1,y+sy*r-1,L+2,3);ctx.fillRect(x+sx*r-1,y+sy*r-(sy>0?L:0)-1,3,L+2)}
  ctx.fillStyle=c;for(const[sx,sy]of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.fillRect(x+sx*r-(sx>0?L:0),y+sy*r,L,1);ctx.fillRect(x+sx*r,y+sy*r-(sy>0?L:0),1,L)}
  if((frameNo>>2)&1&&t<14){ctx.fillRect(x-1,y,3,1);ctx.fillRect(x,y-1,1,3)}ctx.globalAlpha=1}
function drawHitFx(h){const r=(8-h.l)*(h.big?3:2)+3;ctx.strokeStyle=h.l>4?'#fff':h.ips?'#3ae8ff':'#ffd23a';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4+0.3;ctx.moveTo(h.x+Math.cos(a)*r*0.4,h.y+Math.sin(a)*r*0.4);ctx.lineTo(h.x+Math.cos(a)*r,h.y+Math.sin(a)*r)}ctx.stroke();
  if(h.l>5){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(h.x,h.y,r*0.35,0,Math.PI*2);ctx.fill()}}

// ---------------- RESULT / CONTINUE / ENDING ----------------
const Result={enter(w,cfg){this.w=w;this.cfg=cfg;this.two=RUN.mode==='2p'||RUN.mode==='online';this.online=RUN.mode==='online';this.win=this.online?w===(NET.role==='host'?0:1):this.two||w===0;this.wc=w===0?skinned(cfg.p1,0):skinned(cfg.p2,1);this.lc=w===0?skinned(cfg.p2,1):skinned(cfg.p1,0);
    playMusic(this.win?'win':'lose');setTimeout(()=>{say(this.two?`Player ${w?'two':'one'} wins`:this.win?'You win!':'You lose');playVoice(this.lc.id+'_ko','f1',1.2)},300);if(this.win)CEL.start(1.2);
    if(this.two)RUN.score[w]++;else{const r=rc(cfg.p1);if(w===0){r.w++;badge('first')}else r.l++;saveRec()}
    this.menu=this.online?['REMATCH','CHARACTER SELECT','LEAVE ROOM']:(RUN.mode==='vs'||this.two)?['REMATCH','CHARACTER SELECT','MAIN MENU']:null;this.sel=0},
  update(){if(this.t<=50)return;
    if(this.menu){const n=this.menu.length;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
      if(pressed.a||pressed.start||(this.two&&(pressed2.a||pressed2.start)&&this.sel===0)){SFX.ok();const k=this.menu[this.sel];
        goFade(()=>{if(k==='REMATCH')startFight();else if(this.online&&k==='CHARACTER SELECT'){NET.lock=false;go(OnlineSelect)}else if(this.online){netQuit();go(Title);Title.ph='menu'}
          else if(k==='CHARACTER SELECT')go(Select,RUN.mode);else{go(Title);Title.ph='menu'}})}return}
    if(pressed.a||pressed.start){SFX.ok();goFade(()=>this.next())}},
  next(){if(RUN.mode==='story'){if(this.win){RUN.level++;go(StoryCard)}else go(Continue);return}
    if(RUN.mode!=='arcade'){go(Select,RUN.mode);return}if(this.win){RUN.idx++;if(RUN.idx>=RUN.ladder.length)go(Ending);else go(VS)}else go(Continue)},
  draw(){const t=this.t,c=this.wc;ctx.drawImage(CH[this.cfg.stage].stage,0,0);ctx.fillStyle='rgba(6,4,20,.7)';ctx.fillRect(0,0,W,H);
    if(this.win){ctx.fillStyle='rgba(255,210,58,.07)';for(let i=0;i<12;i++){const a=t*0.006+i*Math.PI/6;ctx.beginPath();ctx.moveTo(56,120);ctx.lineTo(56+Math.cos(a)*300,120+Math.sin(a)*300);ctx.lineTo(56+Math.cos(a+0.14)*300,120+Math.sin(a+0.14)*300);ctx.fill()}}
    const p=Math.min(1,t/16),img=c.por;ctx.drawImage(img,Math.round(-40+40*p)-6,H-img.height);
    if(this.win)CEL.draw();
    const bob=this.win?Math.round(Math.abs(Math.sin(t*.09))*-4):0;
    drawText(this.online?(this.win?'YOU WIN!':'YOU LOSE'):this.two?`P${this.w+1} WINS!`:this.win?'YOU WIN!':'YOU LOSE',186,16+bob,'#fff',2,{align:'center',grad:this.win?FIRE:ICE,outline:'#200'});
    if(this.two)drawText(`P1  ${RUN.score[0]} - ${RUN.score[1]}  P2`,186,32,'#fff',1,{align:'center',outline:'#000'});
    box(118,40,132,94);ctx.drawImage(c.logo,0,0,c.logo.width,c.logo.height,124,44,70,Math.round(c.logo.height*70/c.logo.width));
    const lines=wrap('"'+c.quote+'"',20),n=Math.min(lines.join('').length,Math.floor(t*1.2));let k=0;
    lines.forEach((l,i)=>{const s=l.slice(0,Math.max(0,n-k));k+=l.length;drawText(s,124,74+i*10,'#fff',1,{shadow:false})});
    if(this.menu){if(t>50){box(118,140,132,38);this.menu.forEach((m,i)=>drawText((i===this.sel?'> ':'  ')+m,124,145+i*11,i===this.sel?'#ffe66a':'#aab',1,{shadow:false}))}}
    else if(t>50&&(t>>4)&1)drawText('PRESS A',184,170,'#ffe66a',1,{align:'center',outline:'#000'})}};

// ---------------- ONLINE: browser-to-browser (WebRTC) with lockstep inputs and a small input delay ----------------
// The matchmaking worker (server/worker.js) only swaps connection offers by a 4-letter room code.
// During a match both games simulate the same frames from the same inputs; each sends only its button presses.
const NET_URL='https://bonfire-bash-net.thecrossroads.workers.dev';
const RTC_ICE=[{urls:'stun:stun.cloudflare.com:3478'},{urls:'stun:stun.l.google.com:19302'}];
const NET={pc:null,dc:null,role:null,status:'',lock:false,D:4,sim:0,lf:0,loc:{},rem:{},acc:0,stall:0,hashes:{},peerH:{},sess:0,desyncs:0,rtt:0};
function netReset(){try{NET.dc&&NET.dc.close()}catch(e){}try{NET.pc&&NET.pc.close()}catch(e){}
  Object.assign(NET,{pc:null,dc:null,role:null,code:'',status:'',err:'',lock:false,sim:0,lf:0,loc:{},rem:{},acc:0,stall:0,hashes:{},peerH:{},snap:null,pick:null,peerPick:null,gone:false})}
const waitIce=pc=>new Promise(r=>{if(pc.iceGatheringState==='complete')return r();const t=setTimeout(r,2500);pc.addEventListener('icegatheringstatechange',()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);r()}})});
async function api(path,body){const r=await fetch(NET_URL+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{});let j={};try{j=await r.json()}catch(e){}return{status:r.status,...j}}
function netSend(m){try{if(NET.dc&&NET.dc.readyState==='open')NET.dc.send(JSON.stringify(m))}catch(e){}}
function wireDC(dc){NET.dc=dc;dc.onopen=()=>{NET.status='connected';netPing()};dc.onclose=()=>netLost();dc.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(x){return}netMsg(m)}}
function wirePC(pc){pc.onconnectionstatechange=()=>{if(pc===NET.pc&&['failed','disconnected','closed'].includes(pc.connectionState))netLost()}}
function netPing(){netSend({t:'ping',at:performance.now()})}
async function netHost(){netReset();NET.role='host';NET.status='creating';
  try{const pc=NET.pc=new RTCPeerConnection({iceServers:RTC_ICE});wirePC(pc);wireDC(pc.createDataChannel('bonfire',{ordered:true}));
    await pc.setLocalDescription(await pc.createOffer());await waitIce(pc);
    const r=await api('/room',{offer:pc.localDescription.sdp});if(!r.code)throw new Error('no code');if(NET.pc!==pc)return;NET.code=r.code;NET.status='waiting';
    for(let i=0;i<300&&NET.pc===pc&&!pc.remoteDescription;i++){await new Promise(z=>setTimeout(z,1500));if(NET.pc!==pc)return;
      const a=await api('/room/'+r.code+'/answer');if(a.answer&&NET.pc===pc){await pc.setRemoteDescription({type:'answer',sdp:a.answer});NET.status='connecting'}}
    if(NET.pc===pc&&!pc.remoteDescription){NET.status='error';NET.err='NOBODY JOINED'}
  }catch(e){if(NET.role==='host'){NET.status='error';NET.err='CAN\'T REACH THE SERVER'}}}
async function netJoin(code){netReset();NET.role='guest';NET.code=code;NET.status='connecting';
  try{const o=await api('/room/'+code);if(!o.offer){NET.status='error';NET.err=o.error==='room full'?'THAT ROOM IS FULL':'NO ROOM WITH THAT CODE';return}
    const pc=NET.pc=new RTCPeerConnection({iceServers:RTC_ICE});wirePC(pc);pc.ondatachannel=e=>wireDC(e.channel);
    await pc.setRemoteDescription({type:'offer',sdp:o.offer});await pc.setLocalDescription(await pc.createAnswer());await waitIce(pc);
    const a=await api('/room/'+code+'/answer',{answer:pc.localDescription.sdp});if(a.error){NET.status='error';NET.err='THAT ROOM IS FULL';return}
    setTimeout(()=>{if(NET.pc===pc&&NET.status!=='connected'){NET.status='error';NET.err='COULD NOT CONNECT'}},20000)
  }catch(e){if(NET.role==='guest'){NET.status='error';NET.err='CAN\'T REACH THE SERVER'}}}
function netLost(){if(!NET.role||NET.gone)return;NET.gone=true;const inGame=NET.status==='connected';NET.lock=false;
  if(!inGame){NET.status='error';NET.err='COULD NOT CONNECT';return}
  setTimeout(()=>{netReset();fade.a=0;fade.dir=0;go(Online);Online.ph='msg';Online.msg='OPPONENT DISCONNECTED'},30)}
function netQuit(){netSend({t:'bye'});NET.gone=true;netReset()}
function netMsg(m){switch(m.t){
  case'ping':netSend({t:'pong',at:m.at});break;
  case'pong':NET.rtt=Math.round(performance.now()-m.at);NET.D=clamp(Math.ceil(NET.rtt/2/16.7)+2,3,9);break;
  case'pick':NET.peerPick=m.id?{id:m.id,skin:!!m.skin}:null;break;
  case'start':netBegin(m);break;
  case'i':if(m.s===NET.sess)NET.rem[m.f]=m.v;break;
  case'h':if(m.s===NET.sess){NET.peerH[m.f]=m.h;netCheck(m.f)}break;
  case'rq':if(NET.role==='host'&&scene===Fight&&NET.lock)netSend({t:'snap',s:NET.sess,f:NET.sim,d:snapState()});break;
  case'snap':if(m.s===NET.sess){if(NET.sim<m.f)NET.snap=m;else applySnap(m.d)}break;
  case'bye':netLost();break}}
// inputs: held directions (bits 0-3) + presses since the last sample (bits 4-11)
const NK=['left','right','up','down'],NP=['left','right','up','down','a','b','start','select'];
function edgeBits(){let v=0;NP.forEach((k,i)=>{if(pressed[k])v|=1<<(4+i)});return v}
function heldBits(){let v=0;NK.forEach((k,i)=>{if(held[k])v|=1<<i});return v}
function applyIn(v,H,P){NK.forEach((k,i)=>{H[k]=!!(v&(1<<i))});NP.forEach((k,i)=>{P[k]=!!(v&(1<<(4+i)))});H.a=P.a;H.b=P.b;H.start=P.start;H.select=P.select;H.tap=P.tap=false}
function netBegin(cfg){NET.sess=cfg.s;NET.D=cfg.D;NET.lock=true;NET.sim=0;NET.lf=cfg.D;NET.loc={};NET.rem={};NET.acc=0;NET.stall=0;NET.hashes={};NET.peerH={};NET.snap=null;
  for(let i=0;i<cfg.D;i++)NET.loc[i]=NET.rem[i]=0;frameNo=0;fade.a=0;fade.dir=0;fade.cb=null;setTwo(false);
  RUN={mode:'online',p1:cfg.p1,ladder:[cfg.p2],idx:0,cont:0,score:NET.score||[0,0],skin:cfg.skin,alt:[false,false]};NET.score=RUN.score;go(VS)}
// returns false when the opponent's input for this frame hasn't arrived yet (the game waits)
function netStep(){NET.acc|=edgeBits();
  if(NET.lf<=NET.sim+NET.D){const v=heldBits()|NET.acc;NET.acc=0;NET.loc[NET.lf]=v;netSend({t:'i',s:NET.sess,f:NET.lf,v});NET.lf++}
  const f=NET.sim,a=NET.loc[f],b=NET.rem[f];if(a===undefined||b===undefined){if(++NET.stall>600)netLost();return false}
  NET.stall=0;const host=NET.role==='host';applyIn(host?a:b,held,pressed);applyIn(host?b:a,held2,pressed2);
  delete NET.loc[f-60];delete NET.rem[f-60];NET.sim++;return true}
const SNAPF=['x','y','vx','vy','hp','trail','meter','face','stun','st','ast','inv','spCD','spCD2','spCD3','combo','comboT','cuffed','zap','buff','chain','crouch','jug','state','hitDone','dj','ko'];
function snapState(){const one=f=>{const o={};for(const k of SNAPF)o[k]=f[k];return o};return{p:[one(F.p1),one(F.p2)],g:{time:F.time,tf:F.tf,pt:F.pt,phase:F.phase,wins:F.wins,round:F.round}}}
function applySnap(d){if(!F||scene!==Fight||!d)return;[F.p1,F.p2].forEach((f,i)=>Object.assign(f,d.p[i]));Object.assign(F,d.g)}
function hashState(){return[F.p1,F.p2].map(f=>[f.x,f.y,f.hp,f.meter].map(v=>Math.round(v*100)).join(',')+f.state).join('|')+'|'+F.time+'|'+F.round}
function netCheck(f){const a=NET.hashes[f],b=NET.peerH[f];if(a===undefined||b===undefined)return;delete NET.hashes[f];delete NET.peerH[f];
  if(a!==b){NET.desyncs++;if(NET.role==='guest')netSend({t:'rq'})}}
function netAfter(){if(scene===Fight&&F&&NET.sim%60===0){const h=hashState();NET.hashes[NET.sim]=h;netSend({t:'h',s:NET.sess,f:NET.sim,h});netCheck(NET.sim)}
  if(NET.snap&&NET.sim>=NET.snap.f){applySnap(NET.snap.d);NET.snap=null}}
// room-code typing on a keyboard
window.addEventListener('keydown',e=>{if(scene!==Online||Online.ph!=='join')return;
  if(/^Key[A-Z]$/.test(e.code)){const L=e.code[3];const i=ONL.indexOf(L);if(i>=0){Online.code[Online.ci]=i;Online.ci=Math.min(3,Online.ci+1);SFX.move()}e.preventDefault();e.stopPropagation()}
  else if(e.code==='Backspace'){Online.ci=Math.max(0,Online.ci-1);e.preventDefault();e.stopPropagation()}},true);
const ONL='ABCDEFGHJKLMNPQRSTUVWXYZ';
const Online={enter(){setTwo(false);this.ph=this.ph==='msg'?'msg':'menu';this.sel=0;this.code=[0,0,0,0];this.ci=0;playMusic('select')},
  items:['HOST A GAME','JOIN A GAME','BACK'],
  update(){const ph=this.ph;
    if(ph==='menu'){const n=3;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
      if(pressed.b||((pressed.a||pressed.start)&&this.sel===2)){SFX.back();go(Title);Title.ph='menu';return}
      if(pressed.a||pressed.start){SFX.ok();if(this.sel===0){this.ph='host';netHost()}else{this.ph='join';this.ci=0}}return}
    if(ph==='join'){if(pressed.left){this.ci=Math.max(0,this.ci-1);SFX.move()}if(pressed.right){this.ci=Math.min(3,this.ci+1);SFX.move()}
      if(pressed.up){this.code[this.ci]=(this.code[this.ci]+1)%ONL.length;SFX.move()}if(pressed.down){this.code[this.ci]=(this.code[this.ci]+ONL.length-1)%ONL.length;SFX.move()}
      if(pressed.b){this.ph='menu';SFX.back();return}
      if(pressed.start||(pressed.a&&this.ci===3)){SFX.ok();this.ph='wait';netJoin(this.code.map(i=>ONL[i]).join(''))}else if(pressed.a){this.ci=Math.min(3,this.ci+1);SFX.move()}return}
    if(ph==='host'||ph==='wait'){if(NET.status==='connected'){SFX.start();goFade(()=>go(OnlineSelect));this.ph='done'}
      else if(NET.status==='error'){this.ph='msg';this.msg=NET.err;netReset()}
      if(pressed.b){SFX.back();netQuit();this.ph='menu'}return}
    if(ph==='msg'&&(pressed.a||pressed.b||pressed.start)){SFX.back();this.ph='menu'}},
  draw(){const t=this.t;stripes(t,'#101a38','#152048');drawText('ONLINE',128,8,'#fff',3,{align:'center',grad:FIRE,outline:'#300'});
    box(24,40,208,118);const ph=this.ph;
    if(ph==='menu'){this.items.forEach((it,i)=>drawText((i===this.sel?'> ':'  ')+it,70,62+i*16,i===this.sel?'#ffe66a':'#aab',1));
      drawText('PLAY A FRIEND ON ANOTHER DEVICE.',128,114,'#9ad',1,{align:'center',shadow:false});drawText('THE HOST GETS A 4-LETTER CODE,',128,124,'#9ad',1,{align:'center',shadow:false});drawText('THE OTHER PLAYER TYPES IT IN.',128,134,'#9ad',1,{align:'center',shadow:false})}
    else if(ph==='host'){drawText('YOUR ROOM CODE',128,52,'#9ad',1,{align:'center'});
      if(NET.code){drawText(NET.code,128,72,'#fff',4,{align:'center',grad:FIRE,outline:'#200'});drawText('TELL YOUR FRIEND THIS CODE.',128,114,'#fff',1,{align:'center'});
        drawText('WAITING FOR THEM TO JOIN'+'...'.slice(0,(t>>4)%4),128,130,'#ffe66a',1,{align:'center'})}
      else drawText('CREATING ROOM'+'...'.slice(0,(t>>4)%4),128,80,'#ffe66a',1,{align:'center'});drawText('B: CANCEL',128,146,'#778',1,{align:'center',shadow:false})}
    else if(ph==='join'){drawText('ENTER THE ROOM CODE',128,52,'#9ad',1,{align:'center'});
      for(let i=0;i<4;i++){const x=68+i*32,on=i===this.ci;box(x,72,26,30,on?'rgba(60,40,10,.9)':'rgba(10,10,30,.82)',on?'#ffe66a':'#556');drawText(ONL[this.code[i]],x+13,79,on?'#ffe66a':'#fff',3,{align:'center'})}
      drawText('UP/DOWN: LETTER  LEFT/RIGHT: MOVE',128,116,'#9ad',1,{align:'center',shadow:false});drawText('(OR TYPE IT)  START: JOIN  B: BACK',128,128,'#9ad',1,{align:'center',shadow:false})}
    else if(ph==='wait'||ph==='done'){drawText('CONNECTING TO '+(NET.code||''),128,80,'#ffe66a',1,{align:'center'});drawText('...'.slice(0,(t>>4)%4),128,96,'#ffe66a',2,{align:'center'})}
    else if(ph==='msg'){drawText(this.msg||'',128,82,'#ff9a6a',1,{align:'center'});drawText('A: OK',128,110,'#9ad',1,{align:'center'})}}};
const OnlineSelect={enter(){this.cur=this.cur||0;this.done=false;this.skin=false;this.started=false;NET.lock=false;NET.pick=null;netSend({t:'pick',id:null});netPing();playMusic('select')},
  update(){if(NET.status!=='connected')return;const N=ORDER.length,id=ORDER[this.cur];if(this.t%90===0)netPing();
    if(!this.done){if(pressed.left||pressed.up){this.cur=(this.cur+N-1)%N;SFX.move()}if(pressed.right||pressed.down){this.cur=(this.cur+1)%N;SFX.move()}
      if(pressed.select&&CH[id].skin2&&CH[CH[id].skin2]){this.skin=!this.skin;SFX.move()}
      if(pressed.b){SFX.back();netQuit();go(Title);Title.ph='menu';return}
      if(pressed.a||pressed.start){this.done=true;SFX.ok();sayName(id);NET.pick={id,skin:this.skin&&!!CH[id].skin2};netSend({t:'pick',...NET.pick})}}
    else if(pressed.b){this.done=false;NET.pick=null;netSend({t:'pick',id:null});SFX.back()}
    if(NET.role==='host'&&NET.pick&&NET.peerPick&&!this.started){this.started=true;
      const cfg={t:'start',s:(NET.sess||0)+1,D:NET.D,p1:NET.pick.id,p2:NET.peerPick.id,skin:[NET.pick.skin,NET.peerPick.skin]};netSend(cfg);netBegin(cfg)}},
  draw(){const t=this.t,id=ORDER[this.cur],me=CH[id],sk=this.skin&&me.skin2&&CH[me.skin2]?CH[me.skin2]:me;stripes(t,'#101a38','#152048');
    drawText('ONLINE - ROOM '+(NET.code||''),128,5,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});
    ctx.save();ctx.beginPath();ctx.rect(0,16,128,140);ctx.clip();ctx.drawImage(sk.porm,4-(this.done?0:0),156-sk.porm.height);ctx.restore();
    const pp=NET.peerPick,them=pp?(pp.skin&&CH[pp.id].skin2&&CH[CH[pp.id].skin2]?CH[CH[pp.id].skin2]:CH[pp.id]):null;
    ctx.save();ctx.beginPath();ctx.rect(128,16,128,140);ctx.clip();if(them)drawMirror(them.porm,252-them.porm.width,156-them.porm.height);else{ctx.globalAlpha=.25;drawMirror(CH[ORDER[(t>>5)%ORDER.length]].porDark,160,44);ctx.globalAlpha=1}ctx.restore();
    drawText('YOU',8,20,'#ff5a5a',1,{outline:'#000'});drawText(me.name,8,30,'#fff',1,{outline:'#000'});drawText(this.done?'READY!':'CHOOSING',8,40,this.done?'#7aff8a':'#ffe66a',1,{outline:'#000'});
    drawText('OPPONENT',248,20,'#5ab4ff',1,{align:'right',outline:'#000'});drawText(pp?CH[pp.id].name:'???',248,30,'#fff',1,{align:'right',outline:'#000'});drawText(pp?'READY!':'CHOOSING',248,40,pp?'#7aff8a':'#ffe66a',1,{align:'right',outline:'#000'});
    ORDER.forEach((oid,i)=>{const S=20,x=128-ORDER.length*(S+2)/2+i*(S+2),y=158;ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,S+2,S+2);ctx.imageSmoothingEnabled=true;ctx.drawImage(CH[oid].head,x,y,S,S);ctx.imageSmoothingEnabled=false;
      if(i===this.cur&&((t>>3)&1||this.done)){ctx.strokeStyle='#ff3a3a';ctx.lineWidth=2;ctx.strokeRect(x-2,y-2,S+4,S+4)}});
    drawText((me.skin2&&CH[me.skin2]?'SELECT: COSTUME  ':'')+(this.done?'B: CHANGE':'A: READY  B: LEAVE')+(NET.rtt?'  PING '+NET.rtt+'MS':''),128,182,'#9ad',1,{align:'center',shadow:false})}};
// ---------------- RECORDS ----------------
const Records={enter(){playMusic('select')},
  update(){if(pressed.b||pressed.a||pressed.start){SFX.back();go(Title);Title.ph='menu';Title.sel=Title.items.indexOf('RECORDS')}},
  draw(){stripes(this.t,'#120f30','#191540');drawText('RECORDS',128,6,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
    const RH=Math.min(11,Math.floor(96/ORDER.length));box(8,24,240,ORDER.length*RH+12);['FIGHTER','W-L','BEST','TRIALS'].forEach((h,i)=>drawText(h,[30,128,170,214][i],27,'#99a',1,{align:i?'center':'left',shadow:false}));
    ORDER.forEach((id,i)=>{const r=rc(id),y=36+i*RH,c=CH[id];ctx.imageSmoothingEnabled=true;ctx.drawImage(c.head,12,y-1,10,10);ctx.imageSmoothingEnabled=false;
      drawText(c.name,27,y+1,'#fff',1,{shadow:false});if(r.clear)drawText('*',100,y+1,'#ffd23a',1,{shadow:false});
      drawText(`${r.w}-${r.l}`,128,y+1,'#fff',1,{align:'center',shadow:false});drawText(r.combo?r.combo+(r.combo>1?' HITS':' HIT'):'-',170,y+1,'#fff',1,{align:'center',shadow:false});
      const tr=REC.trials[id]||0;drawText(`${tr}/${TRIALS[id].length}`,214,y+1,tr>=TRIALS[id].length?'#7aff8a':'#fff',1,{align:'center',shadow:false})});
    const got=BADGES.filter(b=>REC.badges[b[0]]).length;drawText(`BADGES ${got}/${BADGES.length}`,128,40+ORDER.length*RH,'#ffe66a',1,{align:'center'});
    BADGES.forEach((b,i)=>{const on=REC.badges[b[0]],x=i%2?132:10,y=49+ORDER.length*RH+Math.floor(i/2)*8;drawText((on?'# ':'- ')+b[1],x,y,on?'#ffd23a':'#55607a',1,{shadow:false})});
    drawText('* = ARCADE CLEARED: NEW COLOR    B: BACK',128,184,'#8a86a8',1,{align:'center',shadow:false})}};
const Continue={enter(){this.n=9;stopMusic()},
  update(){if(this.t%60===0&&this.t>0){this.n--;if(this.n<0){goFade(()=>go(GameOver));return}SFX.tick()}
    if(pressed.start||pressed.a){SFX.start();RUN.cont++;goFade(()=>startFight())}if(pressed.b&&this.t>10){this.t+=(60-this.t%60)-1}},
  draw(){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const c=CH[RUN.p1];ctx.globalAlpha=.6;ctx.drawImage(c.porm,10,H-c.porm.height);ctx.globalAlpha=1;
    drawText('CONTINUE?',160,40,'#fff',2,{align:'center',grad:ICE,outline:'#002'});
    const s=Math.max(0,this.n);drawText(String(s),160,74,'#fff',6,{align:'center',grad:FIRE,outline:'#300',ow:1});
    if((this.t>>4)&1)drawText('PRESS START',160,140,'#ffe66a',1,{align:'center'});drawText('B: SKIP',160,156,'#667',1,{align:'center'})}};
const GameOver={enter(){playMusic('lose');say('Game over',0.8,0.4)},update(){if(this.t>200||(this.t>40&&anyPress()))goFade(()=>{go(Title)})},
  draw(){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const k=Math.min(1,this.t/30);ctx.globalAlpha=k;drawText('GAME OVER',128,84,'#fff',3,{align:'center',grad:['#fff','#ddd','#bbb','#999','#777','#555','#333'],outline:'#200'});ctx.globalAlpha=1}};
const Ending={enter(){this.c=skinned(RUN.p1,0);playMusic('ending');setTimeout(()=>say('Congratulations!'),400);CEL.start(1.5);
    rc(RUN.p1).clear++;saveRec();badge('clear');if(SET.diff===2)badge('hard');if(ORDER.every(id=>rc(id).clear>0))badge('allclear')},
  update(){if(this.t>200&&anyPress())goFade(()=>go(Title),0.05)},
  draw(){const t=this.t,c=this.c;stripes(t,'#2a1206','#341808');ctx.fillStyle='rgba(255,210,58,.08)';for(let i=0;i<12;i++){const a=t*0.004+i*Math.PI/6;ctx.beginPath();ctx.moveTo(60,110);ctx.lineTo(60+Math.cos(a)*300,110+Math.sin(a)*300);ctx.lineTo(60+Math.cos(a+0.15)*300,110+Math.sin(a+0.15)*300);ctx.fill()}
    ctx.drawImage(c.por,0,H-c.por.height);CEL.draw();
    const L=['CONGRATULATIONS!','',c.name,...(c.nick?['"'+c.nick+'"']:[]),'','IS THE NEW','BONFIRE BASH','CHAMPION!','',...wrap(ENDING[c.id]||'',22),'','NEW COLOR UNLOCKED!','','THANKS FOR PLAYING','','A GAME BY MARK','','BUILT WITH CLAUDE','','SEE YOU NEXT FIGHT!'];
    const y0=Math.max(Math.min(20,96-(L.length-1)*12),H-t*0.45);L.forEach((s,i)=>{const y=y0+i*12;if(y>=0&&y<=H-20)drawText(s,190,y,'#fff',1,{align:'center',grad:i<8?FIRE:null,outline:'#200'})});
    if(t>200&&(t>>4)&1)drawText('PRESS START',190,182,'#fff',1,{align:'center',outline:'#000'})}};

// ---------------- MAIN LOOP ----------------
let ASSETS_READY=false;
// ================= STORY MODE: a side-scrolling beat 'em up (see STORY_MODE.md) =================
// Controls: move in 8 directions (up/down = depth), A = attack combo, B = jump (B then A = jump kick),
// SP (A+B) = desperation special (hits all around, costs a little health), FWD+SP with a full meter = super.
// Walk into a reeling enemy to grab them: A = knee, 3rd A (or BACK+A) = throw.
const FY=148,FZ=36;// floor band: feet at screen y FY..FY+FZ (z = depth, 0 = far)
const FOES={
  goon:{id:'goon',name:'GOON',hp:30,speed:.95,power:1,def:1,jump:1,dmg:5,reach:40,score:100,col:{aura:'#ff5a3a',skin:'#c98a5e',glove:'#222',leg:'#3d5a96',foot:'#222'},sh:.72,hip:.5,
    names:['SID','KNOX','BUZZ','DUKE','ROCCO','JAKE','MOE','VIC']},
  slinger:{id:'slinger',name:'SLINGER',hp:24,speed:1.05,power:1,def:1,jump:1,dmg:6,reach:36,score:150,ranged:true,col:{aura:'#5ad86a',skin:'#e0a070',glove:'#222',leg:'#222',foot:'#222'},sh:.72,hip:.5,
    names:['SPIKE','VINNY','ZIP','RAT','SKIDS','FLICK']},
  bruiser:{id:'bruiser',name:'BRUISER',hp:72,speed:.62,power:1.4,def:1,jump:1,dmg:9,reach:44,score:400,heavy:true,col:{aura:'#ffd23a',skin:'#8a5a3a',glove:'#111',leg:'#111',foot:'#111'},sh:.72,hip:.5,
    names:['TANK','MOOSE','BRICK','OX','BULL']}};
Object.assign(FOES,{
  blade:{id:'blade',base:'goon',hue:250,name:'BLADE',hp:26,speed:1.35,power:1,def:1,jump:1,dmg:6,reach:46,lunge:3.2,score:180,col:{aura:'#b04aff'},names:['SLICK','RAZOR','JINX','SNAKE','DASH']},
  molotov:{id:'molotov',base:'slinger',hue:150,name:'MOLOTOV',hp:28,speed:1,power:1,def:1,jump:1,dmg:5,reach:36,score:250,ranged:true,fire:true,col:{aura:'#ff7a2a'},names:['TORCH','SPARKY','BLAZE','ASH']},
  enforcer:{id:'enforcer',base:'bruiser',hue:0,sat:1,whiten:true,name:'ENFORCER',hp:96,speed:.7,power:1.5,def:1,jump:1,dmg:11,reach:46,score:700,heavy:true,windup:15,col:{aura:'#7ad8ff'},names:['TITAN','HAMMER','ATLAS','BOULDER']}});
const FALLBACK_FOE={goon:'karl',slinger:'vizor',bruiser:'ivan'};// used until a foe's own sprites exist
const LEVELS=[
  {name:'BONFIRE STREETS',bg:'story_lvl1',bgY:-38,floor:{kind:'slabs',c1:'#3c3650',c2:'#1c1828',line:'#2a2438',edge:'#8a82a0'},alt:'vizor',song:'vizor',len:768,crates:[[236,8],[476,28]],
    waves:[{at:70,foes:['goon','goon']},{at:300,foes:['goon','slinger','goon']},{at:512,foes:['goon','bruiser','slinger','goon']}]},
  {name:'THE DOCKS',bg:'story_lvl2',bgY:-38,floor:{kind:'boards',c1:'#6a5034',c2:'#2e2216',line:'#3a2a18',edge:'#a07a4a'},alt:'zeke',song:'ivan',len:768,crates:[[200,22],[430,6],[650,28]],
    waves:[{at:50,foes:['goon','slinger','blade']},{at:290,foes:['bruiser','goon','blade','slinger']},{at:512,foes:['molotov','bruiser','goon','blade','goon']}]},
  {name:'VEX TOWER',bg:'story_lvl3',alt:'vizor',song:'hecky',len:768,crates:[[180,14],[420,26],[620,10]],
    waves:[{at:60,foes:['blade','goon','molotov','goon']},{at:290,foes:['enforcer','slinger','molotov','blade']},{at:512,foes:['bruiser','blade','enforcer','molotov','goon','blade']}]},
  {name:"VEX'S PENTHOUSE",bg:'hecky_stage',alt:'hecky',song:'rex',len:256,crates:[],
    waves:[{at:0,foes:['enforcer','blade','molotov','goon']}]}];
// a gritty Christian story: temptation, the fight against your own sin, mercy instead of revenge (KJV verses)
const STORY=[
  "BONFIRE CITY IS ROTTING. VEX OWNS THE STREETS, THE FIGHTS AND THE PEOPLE. ON FINALS EVE HE STEALS THE TROPHY AND LEAVES A CARD: 'EVERY MAN HAS A PRICE.' {N} DOESN'T.",
  "A BEATEN GOON BEGS FOR MERCY. {N} HELPS HIM UP INSTEAD. 'VEX OWNS THE DOCKS,' HE WHISPERS. 'HE OWNS ME TOO.' NOBODY IS TOO FAR GONE TO BE FOUND.",
  "AT THE DOCKS: STOLEN CARGO AND BROKEN MEN. A KEY CARD READS VEX TOWER, TOP FLOOR. THE ELEVATOR IS EASY. THE STAIRS ARE NARROW. {N} TAKES THE STAIRS.",
  "VEX LOOKS DOWN ON THE CITY. 'ALL OF THIS IS YOURS IF YOU KNEEL.' {N} WON'T. THEN A SHADOW STEPS OUT: EVERY GRUDGE, EVERY SIN {N} EVER CARRIED. IT'S YOU.",
  "THE SHADOW FALLS. VEX KNEELS, WAITING FOR THE LAST BLOW. IT NEVER COMES. {N} OFFERS A HAND. BY SUNDAY THE TROPHY IS BACK AND VEX SITS IN THE FRONT PEW."];
const VERSES=["THE LIGHT SHINETH IN DARKNESS. - JOHN 1:5","THE SON OF MAN IS COME TO SAVE THAT WHICH WAS LOST. - LUKE 19:10",
  "NARROW IS THE WAY, WHICH LEADETH UNTO LIFE. - MATT. 7:14","WE WRESTLE NOT AGAINST FLESH AND BLOOD. - EPH. 6:12","HE WAS LOST, AND IS FOUND. - LUKE 15:24"];
function foeData(id){const c=FOES[id];if(c.base){const b=foeData(c.base);return{...b,...c,anim:b.anim,H:b.H,spr:b.spr,alt:b.alt,white:b.white,sh:.72,hip:.5,col:{...b.col,...c.col}}}if(c.anim)return c;const b=CH[FALLBACK_FOE[id]];return{...b,...c,anim:b.anim,H:b.H,spr:b.spr,alt:b.alt,white:b.white,fake:true}}
function startStory(p1,alt,skin){const pool=ORDER.filter(i=>i!==p1).sort(()=>Math.random()-.5);
  RUN={mode:'story',p1,ladder:[],idx:0,cont:0,alt,skin,level:0,lives:3,score:0,bosses:pool.slice(0,3)};go(StoryCard)}
const StoryCard={enter(){this.i=Math.min(RUN.level,STORY.length-1);this.txt=wrap(STORY[this.i].replace(/\{N\}/g,CH[RUN.p1].name),25);this.verse=wrap(VERSES[this.i]||'',25);this.n=0;playMusic('select')},
  update(){this.n+=0.7;if(this.t>20&&(pressed.a||pressed.start)){if(this.n<this.txt.join(' ').length){this.n=999;return}SFX.ok();
      goFade(()=>{if(RUN.level>=LEVELS.length)go(Ending);else go(Brawl)})}},
  draw(){const L=LEVELS[Math.min(RUN.level,LEVELS.length-1)],bg=IMG[L.bg]||CH[L.alt].stage;ctx.drawImage(bg,0,0,bg.width*H/bg.height,H);ctx.fillStyle='rgba(6,4,18,.78)';ctx.fillRect(0,0,W,H);
    const c=CH[RUN.p1];ctx.drawImage(c.porm,-6,H-c.porm.height);
    drawText(RUN.level>=LEVELS.length?'EPILOGUE':RUN.level===3?'FINAL CHAPTER':'CHAPTER '+(RUN.level+1),170,14,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
    if(RUN.level<LEVELS.length)drawText(L.name,170,34,'#ffe66a',1,{align:'center'});
    const vh=this.verse.length?this.verse.length*9+6:0,bh=this.txt.length*9+10+vh,by=Math.max(44,Math.round(48+(124-bh)/3));box(84,by,166,bh,'rgba(10,8,30,.9)','#d04aff');let left=Math.floor(this.n);
    this.txt.forEach((l,i)=>{const s=l.slice(0,Math.max(0,left));left-=l.length+1;drawText(s,90,by+6+i*9,'#e8e6f0',1,{shadow:false})});
    if(this.n>=this.txt.join(' ').length){const vy=by+8+this.txt.length*9;ctx.fillStyle='#5a3a7a';ctx.fillRect(90,vy-2,154,1);this.verse.forEach((l,i)=>drawText(l,90,vy+2+i*9,'#ffd96a',1,{shadow:false}))}
    if(this.n>=this.txt.join(' ').length&&(this.t>>4)&1)drawText('PRESS A',248,182,'#ffe66a',1,{align:'right',outline:'#000'})}};

const Brawl={
  enter(){const L=this.L=LEVELS[RUN.level];F=this;Object.assign(this,{cinema:false,superFlash:0,superBy:null,parts:[],texts:[],hitFx:[],proj:[],items:[],foes:[],cx:0,wi:0,wave:null,q:[],qT:0,goT:0,
      ph:'intro',pt:0,camFlash:0,paused:false,psel:0,hitstop:0,shake:0,target:null,targetT:0,doneT:0,contN:9,supT:0});
    const k=skinned(RUN.p1,0),P=this.P=new Fighter(k.skinKey||RUN.p1,0,!!RUN.bot,RUN.alt&&RUN.alt[0]);P.x=40;P.z=22;P.vz=0;P.meter=RUN.meter||0;P.inv=60;
    for(const[x,z]of L.crates)this.items.push({kind:'crate',x,z,y:0});
    if(!playTrack(L.song))stageMusic(L.song);SFX.start()},
  // ---- helpers ----
  sy(e){return FY+e.z-e.y},
  near(a,b,dz=10){return Math.abs(a.z-b.z)<=dz},
  addT(s,x,z,c){this.texts.push({s,x,y:FY+z-100,c,l:50})},
  spark(x,z,y,c,n){sparks(x,FY+z-y,c,n)},
  dust(x,z,n){for(let i=0;i<n;i++)this.parts.push({x:x+rnd(-10,10),y:FY+z-1,vx:rnd(-1,1),vy:rnd(-1,-.2),l:rnd(12,22)|0,c:'#d8cbb0',g:0.02,dust:1})},
  input(){const P=this.P;if(P.cpu)return this.bot();
    return{l:held.left,r:held.right,u:held.up,d:held.down,a:pressed.a,b:pressed.b,j:pressed.jump}},
  // a simple autoplayer for tests and the attract demo: line up with the nearest enemy and punch
  bot(){const P=this.P,o={l:0,r:0,u:0,d:0,a:0,b:0},alive=this.foes.filter(e=>!e.dead&&!e.ko&&e.state!=='down');
    const t=alive.sort((a,b)=>Math.hypot(a.x-P.x,(a.z-P.z)*2)-Math.hypot(b.x-P.x,(b.z-P.z)*2))[0];
    const crate=this.items.find(i=>i.kind!=='crate'&&Math.abs(i.x-P.x)<160);
    if(!t){if(crate){o[crate.x>P.x?'r':'l']=1;if(Math.abs(crate.z-P.z)>3)o[crate.z>P.z?'d':'u']=1}else o.r=1;return o}
    const side=P.x<t.x?-1:1,gx=t.x+side*30,dx=gx-P.x,dz=t.z-P.z;
    if(Math.abs(dx)>4)o[dx>0?'r':'l']=1;if(Math.abs(dz)>3)o[dz>0?'d':'u']=1;
    const crowd=alive.filter(e=>Math.abs(e.x-P.x)<50&&Math.abs(e.z-P.z)<16).length;
    if(crowd>=2&&P.hp>20&&frameNo%40===0){o.a=o.b=1;return o}
    if(Math.abs(t.x-P.x)<44&&Math.abs(dz)<6){o.l=o.r=0;// in range: hold position, face the target, punch
      if(Math.sign(t.x-P.x)!==P.face&&t.x!==P.x&&['idle','walk'].includes(P.state)){o[t.x>P.x?'r':'l']=1;return o}if(frameNo%7===0)o.a=1}
    return o},
  // ---- the player ----
  control(){const P=this.P,i=this.input();if(i.a)P.lastA=frameNo;if(i.b)P.lastB=frameNo;
    const fwd=P.face>0?i.r:i.l,back=P.face>0?i.l:i.r,spNow=(i.a&&frameNo-P.lastB<=4)||(i.b&&frameNo-P.lastA<=4);
    if(P.state==='throwing'&&P.thr){const e=P.thr;P.vx=0;e.x=P.x+P.face*26;e.z=P.z;e.y=0;
      if(i.a){if(back||(P.knees||0)>=2){this.toss(e,back?-P.face:P.face);return}P.knees=(P.knees||0)+1;this.hitFoe(e,3,false,P.face,'hitL');P.st=2;if(e.ko){P.thr=null;P.state='idle';P.st=0;return}}
      if(P.st>70){if(!e.ko){e.state='hurt';e.stun=10}P.thr=null;P.state='idle'}return}
    if(spNow&&['idle','walk','attack','prejump','jump'].includes(P.state)&&!(P.state==='attack'&&P.st>5)&&!(P.state==='jump'&&P.st>6)){
      if(P.meter>=100&&fwd)return this.superMove();P.state='special';P.st=0;P.vx=P.vz=0;P.y=0;P.atk=null;P.sp={kind:'desp',hits:0,id:++atkId,two:false};P.inv=14;
      SFX.special();fighterVoice(P,'sp1');this.addT(P.c.spName+'!',P.x,P.z,P.c.col.aura);return}
    if(P.state==='attack'){if(P.hitDone&&P.st>=P.atk.s&&!P.atk.fin){// A, A, A or finish early with B: the finisher knocks down
        if(i.b){this.atk(P,'kick',true);return}if(i.a&&(P.chainN||0)<2){P.chainN=(P.chainN||0)+1;this.atk(P,P.chainN===2?'kick':'jab',P.chainN===2)}}return}
    if(P.state==='jump'){if((i.a||i.b)&&!P.atk){startAtk(P,'jkick');P.hitIds={}}return}
    if(!['idle','walk'].includes(P.state))return;
    if(i.j){P.state='prejump';P.st=0;P.jdir=i.r?1:i.l?-1:0;P.vx=0;return}
    if(i.b&&!i.a){P.chainN=0;this.atk(P,'kick',false);return}
    if(i.a){// grab a reeling enemy you're standing on, else start the combo
      const g=this.foes.find(e=>!e.dead&&e.state==='hurt'&&Math.abs(e.x-P.x)<30&&this.near(P,e,6)&&Math.sign(e.x-P.x)===P.face&&!FOES[e.kind].heavy);
      if(g){P.state='throwing';P.st=0;P.thr=g;P.knees=0;g.state='grabbed';g.st=0;g.vx=0;SFX.grab();return}
      P.chainN=0;this.atk(P,'jab');return}
    P.vx=(i.r-i.l)*1.45*P.c.speed;P.vz=(i.d-i.u)*0.95;if(P.vx)P.face=Math.sign(P.vx);P.state=P.vx||P.vz?'walk':'idle'},
  atk(f,n,fin){startAtk(f,n);f.hitIds={};if(f===this.P&&n==='kick')f.atk={...f.atk,dmg:fin?8:7,fin:!!fin}},
  superMove(){const P=this.P;P.meter=0;P.state='special';P.st=0;P.vx=P.vz=0;P.atk=null;P.sp={kind:'desp',hits:0,id:++atkId,sup:true};P.inv=90;this.supT=50;
    SFX.superS();fighterVoice(P,'super')},
  toss(e,dir){const P=this.P;P.thr=null;P.state='idle';P.st=0;e.state='knock';e.st=0;e.vy=4.2;e.vx=dir*5;e.y=1;e.thrown=true;e.hp-=8;e.flash=4;SFX.slam();this.shake=6;
    if(e.hp<=0)e.ko=true;this.score(80)},
  score(n){RUN.score=(RUN.score||0)+n},
  // ---- damage ----
  hitFoe(e,dmg,knock,dir,snd){const P=this.P;if(e.dead||e.ko||e.inv>0||e.state==='down'||(e.state==='knock'&&(e.jug||0)>=1))return false;const C=FOES[e.kind];if(e.state==='knock')e.jug=(e.jug||0)+1;
    e.hp-=dmg*P.c.power*(P.buff>0?1.25:1);e.flash=4;this.target=e;this.targetT=120;P.meter=Math.min(100,P.meter+2.5);this.score(dmg*10);
    const armored=C.heavy&&!knock&&e.hp>0&&(e.state==='special'||((e.armorN=(e.armorN||0)+1)%2));
    if(e.hp<=0){e.ko=true;knock=true}
    if(knock){e.state='knock';e.st=0;e.vy=3.6;e.vx=dir*2.6;e.y=Math.max(e.y,1);e.atk=null;e.sp=null}
    else if(!armored){e.state='hurt';e.st=0;e.stun=22;e.vx=dir*1.2;e.atk=null;e.sp=null}
    this.hitstop=knock?9:5;this.shake=knock?4:2;this.spark(e.x,e.z,e.y+e.H*.6,'#ffe66a',knock?12:7);(SFX[snd]||(knock?SFX.heavy:SFX.hit))();return true},
  hurtP(dmg,knock,dir){const P=this.P;if(P.inv>0||['knock','down','rise'].includes(P.state)||this.ph!=='play'&&this.ph!=='intro')return false;
    if(P.thr){if(!P.thr.ko){P.thr.state='hurt';P.thr.stun=8}P.thr=null}
    dmg*=[0.7,1,1.25][SET.diff];P.hp=Math.max(0,P.hp-dmg);P.flash=4;P.atk=null;P.sp=null;this.hitstop=6;this.shake=3;this.spark(P.x,P.z,P.y+P.H*.6,'#ff6a5a',8);SFX.hit();
    if(P.hp<=0||knock){P.state='knock';P.st=0;P.vy=3.8;P.vx=dir*2.4;P.y=Math.max(P.y,1);if(P.hp<=0){P.ko=true;SFX.ko()}}else{P.state='hurt';P.st=0;P.stun=16;P.vx=dir*1.4;P.hurtK='mid'}return true},
  // the player's active hitbox against every enemy and crate (each enemy once per attack)
  playerHits(){const P=this.P;let reach,dmg,knock=false,air=false,id;
    if((P.state==='attack'||P.state==='jump')&&P.atk&&phaseOf(P)==='active'){const a=P.atk;reach=a.reach;dmg=a.dmg;knock=!!a.fin||a.name==='jkick';if(a.name==='kick'&&!a.fin)dmg=7;air=a.name==='jkick';id=a.id}
    else if(P.state==='special'&&P.sp&&!P.sp.sup&&P.st>=8&&P.st<=12){reach=-58;dmg=12;knock=true;id=P.sp.id}else return;
    P.hitIds=P.hitIds||{};let any=false;
    for(const e of this.foes){if(e.dead||P.hitIds[e.uid+':'+id])continue;const dx=e.x-P.x;
      const inX=reach<0?Math.abs(dx)<-reach:(P.face>0?dx>-6&&dx<reach+12:dx<6&&dx>-reach-12);
      if(inX&&this.near(P,e,reach<0?18:air?14:10)&&(air||e.y<40)){P.hitIds[e.uid+':'+id]=1;if(this.hitFoe(e,dmg,knock,Math.sign(dx)||P.face))any=true;if(P.atk)P.hitDone=true}}
    if(any&&reach<0&&P.hp>5){P.hp-=4;P.trail=P.hp}
    for(const it of this.items)if(it.kind==='crate'&&!it.broken){const dx=it.x-P.x;const inX=reach<0?Math.abs(dx)<-reach:(P.face>0?dx>-6&&dx<reach+14:dx<6&&dx>-reach-14);
      if(inX&&Math.abs(it.z-P.z)<12){it.broken=true;this.spark(it.x,it.z,8,'#c08040',12);SFX.block();this.score(50);const r=Math.random();
        this.items.push({kind:r<.45?'pizza':r<.7?'chicken':'cash',x:it.x,z:it.z,y:0,l:600})}}},
  // ---- physics for anyone on the floor band ----
  phys(e){if(e.state==='throwing'||e.state==='grabbed')return;
    if(e.y>0||e.vy){e.vy-=GRAV;e.y+=e.vy;if(e.y<=0&&e.vy<=0){e.y=0;e.vy=0;
      if(e.state==='jump'){e.state='idle';e.st=0;e.atk=null;SFX.land();this.dust(e.x,e.z,3)}
      else if(e.state==='knock'){e.state='down';e.st=0;e.vx*=.3;e.jug=0;this.shake=Math.max(this.shake,3);SFX.thud();this.dust(e.x,e.z,6);e.thrown=false}}}
    e.x+=e.vx;e.z=clamp(e.z+(e.vz||0),0,FZ);if(['hurt','down','attack','special'].includes(e.state))e.vx*=.85},
  // ---- enemy AI: only two may hold an attack token at once; the rest circle and wait ----
  foeAI(e){const P=this.P,C=FOES[e.kind],D=SET.diff,dx=P.x-e.x,dz=P.z-e.z,adx=Math.abs(dx);e.face=dx>=0?1:-1;
    const pOK=!['down','rise','knock'].includes(P.state)&&this.ph==='play';
    if(e.wait>0)e.wait--;if(e.cool>0)e.cool--;
    if(!e.tok&&e.wait<=0&&this.foes.filter(f=>f.tok&&!f.dead).length<2)e.tok=true;
    const go=(tx,tz,sp)=>{tx=clamp(tx,this.cx+14,this.cx+W-14);const ax=tx-e.x,az=tz-e.z;e.vx=Math.abs(ax)>3?Math.sign(ax)*C.speed*sp:0;e.vz=Math.abs(az)>2?Math.sign(az)*.7*C.speed*sp:0;e.state=e.vx||e.vz?'walk':'idle'};
    if(C.ranged){const side=e.x<P.x?-1:1,tx=clamp(P.x+side*118,this.cx+16,this.cx+W-16);go(tx,P.z,1);
      if(pOK&&Math.abs(dz)<5&&adx>60&&e.cool<=0&&!this.proj.some(p=>p.owner===e)){e.state='special';e.st=0;e.vx=e.vz=0;e.sp={kind:'throwB',id:++atkId};e.cool=[150,115,85][D]}return}
    if(!e.tok||!pOK){const side=e.x<P.x?-1:1;go(P.x+side*(86+e.uid%3*12),clamp(P.z+(e.uid%2?14:-14),0,FZ),.55);return}
    if(C.heavy&&e.cool<=0&&Math.abs(dz)<6&&adx>56&&adx<150){e.state='special';e.st=0;e.vx=e.vz=0;e.sp={kind:'charge',id:++atkId,hit:false};e.cool=170;return}
    const side=e.x<P.x?-1:1;go(P.x+side*30,P.z,1);
    if(adx<C.reach+4&&Math.abs(dz)<6&&e.cool<=0){e.state='attack';e.st=0;e.vx=e.vz=0;e.atk={...ATK.jab,name:'jab',s:[18,13,9][D]+(C.heavy?4:0),a:4,r:14,id:++atkId};e.hitDone=false}},
  foeUpdate(e){const P=this.P,C=FOES[e.kind];e.st++;if(e.ko&&!['knock','down'].includes(e.state)){e.state='knock';e.st=0;e.vy=Math.max(e.vy||0,2);e.y=Math.max(e.y,1);e.atk=null;e.sp=null}/* a KO'd enemy only ever falls */if(e.flash>0)e.flash--;if(e.inv>0)e.inv--;
    switch(e.state){
      case'idle':case'walk':this.foeAI(e);break;
      case'attack':{const a=e.atk;if(C.lunge&&e.st<a.s&&e.st>a.s-8)e.vx=e.face*C.lunge;if(e.st===a.s){SFX.whoosh()}if(e.st>=a.s&&e.st<a.s+a.a&&!e.hitDone){const dx=P.x-e.x;
          if(Math.sign(dx)===e.face&&Math.abs(dx)<C.reach+10&&this.near(P,e,9)&&P.y<30)e.hitDone=this.hurtP(C.dmg,C.heavy,e.face)||true}
        if(e.st>=a.s+a.a+a.r){e.state='idle';e.st=0;e.atk=null;e.tok=false;e.wait=[90,60,35][SET.diff]+rnd(0,40);e.cool=20}break}
      case'special':{const s=e.sp;
        if(s.kind==='throwB'){if(e.st===12){const tx=Math.abs(P.x-e.x);this.proj.push(C.fire?{kind:'molotov',x:e.x+e.face*16,z:e.z,y:52,vx:e.face*Math.max(1.4,tx/52),vy:2.2,owner:e,rot:0,life:200}:{kind:'bottle',x:e.x+e.face*16,z:e.z,y:52,vx:e.face*3.1,owner:e,rot:0,life:110});SFX.whoosh()}if(e.st>=26){e.state='idle';e.st=0;e.sp=null}}
        else if(s.kind==='charge'){const wu=C.windup||24;if(e.st<wu){e.vx=0;if(e.st%6<3)e.flash=2}else if(e.st<wu+36){e.vx=e.face*4.2;if(e.st%3===0)this.dust(e.x,e.z,1);
            if(!s.hit&&Math.abs(P.x-e.x)<30&&this.near(P,e,10)&&P.y<30){s.hit=true;this.hurtP(12,true,e.face);SFX.slam()}
            if(e.x<this.cx+6||e.x>this.cx+W-6)e.st=wu+36}else{e.vx*=.8;if(e.st>=wu+54){e.state='idle';e.st=0;e.sp=null;e.tok=false;e.wait=60}}}
        break}
      case'hurt':if(--e.stun<=0){e.state='idle';e.st=0}break;
      case'grabbed':break;
      case'down':if(e.ko){if(e.st>50){e.dead=true;this.score(C.score);if(Math.random()<(C.heavy?.6:.12))this.items.push({kind:Math.random()<.5?'pizza':'cash',x:e.x,z:e.z,y:0,l:600})}}
        else if(e.st>=40){e.state='rise';e.st=0;e.inv=16}break;
      case'rise':if(e.st>=12){e.state='idle';e.st=0}break}
    // a thrown enemy bowls over the others
    if(e.thrown&&e.state==='knock')for(const o of this.foes)if(o!==e&&!o.dead&&o.state!=='knock'&&Math.abs(o.x-e.x)<22&&this.near(o,e,12)){this.hitFoe(o,8,true,Math.sign(e.vx));}
    this.phys(e);
    const inside=e.x>this.cx+8&&e.x<this.cx+W-8;if(inside)e.inside=true;if(e.inside)e.x=clamp(e.x,this.cx+8,this.cx+W-8)},
  spawn(kind){const C=foeData(kind),right=this.q.length%2===0||this.cx<20,f=new Fighter('karl',1,true,false);
    f.c=C;f.img=C.spr;f.H=C.H;f.kind=kind;f.hp=f.mhp=C.hp*[0.8,1,1.2][SET.diff];f.x=right?this.cx+W+24:this.cx-24;f.z=rnd(4,FZ-4);f.vz=0;f.uid=++atkId;
    f.name=C.names[(Math.random()*C.names.length)|0];f.alt=!!C.fake||(kind==='goon'&&Math.random()<.4);if(C.hue!=null&&!C.fake){f.hue=C.hue;f.sat=C.sat||1;f.whiten=!!C.whiten;f.alt=false}f.wait=30+rnd(0,40);f.cool=0;this.foes.push(f)},
  // ---- the level: camera, waves, items ----
  update(){if(this.paused){this.updatePause();return}
    if(pressed.start&&!this.P.cpu&&this.ph!=='continue'){this.paused=true;this.psel=0;SFX.ok();return}
    if(this.supT>0){if(--this.supT===0){for(const e of this.foes)if(!e.dead&&e.x>this.cx-10&&e.x<this.cx+W+10){e.inv=0;this.hitFoe(e,26,true,Math.sign(e.x-this.P.x)||1)}F.camFlash=8;this.shake=10}return}
    if(this.hitstop>0){this.hitstop--;if(pressed.a)this.P.qA=frameNo;return}
    if(this.shake>0)this.shake--;this.pt++;const P=this.P,L=this.L;
    if(this.ph==='intro'&&this.pt>80)this.ph='play';
    if(this.ph==='continue'){if(this.pt%60===0){this.contN--;SFX.tick();if(this.contN<0){goFade(()=>go(GameOver));this.ph='over'}}
      if(pressed.a||pressed.start){RUN.lives=3;RUN.cont++;RUN.score=0;this.respawn();SFX.start()}return}
    if(this.ph==='clear'){if(++this.doneT===70){RUN.meter=P.meter;const boss=RUN.level===3?RUN.p1:RUN.bosses[RUN.level];RUN.shadow=RUN.level===3;RUN.ladder=[boss];RUN.idx=0;goFade(()=>go(VS))}return}
    // player
    if(P.qA&&frameNo-P.qA<6){pressed.a=true;P.qA=0}
    P.st++;if(P.inv>0)P.inv--;if(P.flash>0)P.flash--;if(P.buff>0)P.buff--;P.trail=P.trail>P.hp?Math.max(P.hp,P.trail-0.4):P.hp;
    P.ghosts.forEach(g=>g.l--);P.ghosts=P.ghosts.filter(g=>g.l>0);
    if(this.ph==='play'||this.ph==='intro')this.control();
    switch(P.state){
      case'prejump':if(P.st>=3){P.state='jump';P.st=0;P.vy=5.3;P.vx=P.jdir*1.8*P.c.speed;P.vz=0;SFX.jump()}break;
      case'jump':if(P.atk)P.ast++;break;
      case'attack':P.vx=0;P.vz=0;if(P.st>=P.atk.s+P.atk.a+P.atk.r){P.atk=null;P.state='idle';P.st=0;if(!P.hitDone)P.chainN=0}break;
      case'special':if(P.st>=32){P.state='idle';P.st=0;P.sp=null}break;
      case'hurt':if(--P.stun<=0){P.state='idle';P.st=0}break;
      case'down':if(P.ko){if(P.st>70)this.lose()}else if(P.st>=36){P.state='rise';P.st=0;P.inv=40}break;
      case'rise':if(P.st>=12){P.state='idle';P.st=0;P.inv=40}break}
    this.playerHits();this.phys(P);
    // camera (forward only) and the wave lock
    const lock=this.wave?this.wave.at:this.wi<L.waves.length?L.waves[this.wi].at:L.len-W;
    this.cx=clamp(Math.max(this.cx,P.x-112),0,lock);
    if(!this.wave&&this.wi<L.waves.length&&this.cx>=L.waves[this.wi].at-.5){this.wave=L.waves[this.wi];this.q=[...this.wave.foes];this.qT=0;this.goT=0}
    P.x=clamp(P.x,this.cx+12,Math.min(this.cx+W-12,L.len-10));
    if(this.wave){if(this.q.length&&--this.qT<=0&&this.foes.filter(e=>!e.dead).length<4){this.spawn(this.q.shift());this.qT=45}
      if(!this.q.length&&!this.foes.some(e=>!e.dead)){this.wave=null;this.wi++;this.goT=150;SFX.ok();if(this.wi>=L.waves.length)this.goT=400}}
    if(this.goT>0)this.goT--;
    if(!this.wave&&this.wi>=L.waves.length&&P.x>=Math.min(L.len,this.cx+W)-40&&this.ph==='play'){this.ph='clear';this.doneT=0;P.state='win';P.st=0;P.vx=P.vz=0;SFX.cheer();this.score(1000)}
    for(const e of this.foes)this.foeUpdate(e);this.foes=this.foes.filter(e=>!e.dead||e.st<0);
    // projectiles (bottles)
    for(const p of this.proj){if(p.kind==='fire'){p.life--;if(p.life%20===0&&Math.abs(p.x-P.x)<16&&Math.abs(p.z-P.z)<8&&P.y<=0)this.hurtP(4,false,1);continue}
      if(p.kind==='molotov'){p.x+=p.vx;p.y+=p.vy;p.vy-=.12;p.rot+=.3;if(p.y<=4){p.life=0;this.proj.push({kind:'fire',x:p.x,z:p.z,y:0,life:110,vx:0,rot:0});SFX.block();this.spark(p.x,p.z,4,'#ff9a3a',10)}
        else if(Math.abs(p.x-P.x)<10&&Math.abs(p.z-P.z)<8&&P.y<24&&p.y<60&&!['down','knock'].includes(P.state)&&this.hurtP(5,false,Math.sign(p.vx)))p.life=0;continue}
      p.x+=p.vx;p.rot+=.3;p.life--;if(Math.abs(p.x-P.x)<12&&Math.abs(p.z-P.z)<9&&P.y<24&&!['down','knock'].includes(P.state)){if(this.hurtP(6,false,Math.sign(p.vx)))p.life=0;
        for(let i=0;i<6;i++)this.parts.push({x:p.x,y:FY+p.z-p.y,vx:rnd(-2,2),vy:rnd(-2,0),l:14,c:'#7aff8a',g:.15})}}
    this.proj=this.proj.filter(p=>p.life>0&&p.x>this.cx-30&&p.x<this.cx+W+30);
    // pickups
    for(const it of this.items){if(it.kind==='crate'||it.taken)continue;it.l--;if(Math.abs(it.x-P.x)<14&&Math.abs(it.z-P.z)<9&&P.y<=0&&P.state!=='knock'){it.taken=true;SFX.coin();
      if(it.kind==='cash'){this.score(1000);this.addT('+1000',it.x,it.z,'#ffd23a')}else{const g=it.kind==='chicken'?60:30;P.hp=Math.min(P.mhp,P.hp+g);this.addT('+'+g+' HP',it.x,it.z,'#7aff8a')}}}
    this.items=this.items.filter(it=>!(it.taken||it.l<=0||(it.kind==='crate'&&it.broken)));
    for(const p of this.parts){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.l--}this.parts=this.parts.filter(p=>p.l>0);
    for(const t of this.texts){t.y-=.4;t.l--}this.texts=this.texts.filter(t=>t.l>0);for(const h of this.hitFx)h.l--;this.hitFx=this.hitFx.filter(h=>h.l>0);
    if(this.targetT>0)this.targetT--},
  lose(){RUN.lives--;if(RUN.lives>0)this.respawn();else{this.ph='continue';this.contN=9;this.pt=0;stopMusic()}},
  respawn(){const P=this.P;P.hp=P.trail=P.mhp;P.ko=false;P.state='idle';P.st=0;P.y=0;P.vx=P.vy=0;P.inv=150;this.ph='play';if(!TRACK.src)playTrack(this.L.song);
    for(const e of this.foes)if(!e.dead&&Math.abs(e.x-P.x)<60){this.hitFoe(e,0,true,Math.sign(e.x-P.x)||1)}},
  updatePause(){if(pressed.up||pressed.down){this.psel^=1;SFX.move()}if(pressed.start||pressed.b||(pressed.a&&this.psel===0)){this.paused=false;SFX.back();return}
    if(pressed.a&&this.psel===1){this.paused=false;goFade(()=>{go(Title);Title.ph='menu'})}},
  // ---- drawing ----
  draw(){const L=this.L,P=this.P,sh=this.shake,ox=sh?Math.round(rnd(-sh,sh)):0,oy=sh?Math.round(rnd(-sh,sh))/2:0,cx=Math.round(this.cx);
    ctx.save();ctx.translate(ox,oy);
    const bg=IMG[L.bg];if(bg&&bg.width>=L.len){ctx.drawImage(bg,-cx,L.bgY||0,bg.width,H);if(L.floor)drawFloor(L.floor,cx)}
    else{const im=bg||CH[L.alt].stage;for(let x=0;x<L.len;x+=W){const fl=(x/W)%2===1;ctx.save();ctx.translate(x-cx+(fl?W:0),0);ctx.scale(fl?-1:1,1);ctx.drawImage(im,0,0,W,H);ctx.restore()}}
    // everyone on the floor, back to front
    const ents=[P,...this.foes,...this.items].sort((a,b)=>a.z-b.z);
    for(const e of ents){const s=Math.max(.35,1-(e.y||0)/110);ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(Math.round(e.x-cx),FY+e.z+1,(e.kind&&ITEMDRAW[e.kind]?9:18)*s,3*s,0,0,Math.PI*2);ctx.fill()}
    for(const e of ents){if(ITEMDRAW[e.kind]){if(e.kind!=='crate'&&e.l<120&&(frameNo&4))continue;ITEMDRAW[e.kind](Math.round(e.x-cx),FY+e.z);continue}
      if(e.dead||(e.ko&&e.state==='down'&&e.st>20&&(frameNo&2)))continue;if(e===P&&P.inv>0&&this.ph==='play'&&(frameNo&4)&&P.state!=='special')continue;
      ctx.save();ctx.translate(-cx,FY+e.z-GY);drawFighter(e);ctx.restore();
      if(e.state==='special'&&e.sp&&e.sp.kind==='charge'&&e.st<24&&(frameNo&2)){ctx.fillStyle='#ffd23a';ctx.fillRect(e.x-cx-1,FY+e.z-e.H-12,2,6)}}
    for(const p of this.proj){if(p.kind==='fire'){const x=Math.round(p.x-cx),y=FY+p.z,a=Math.min(1,p.life/20);ctx.globalAlpha=a;for(let i=0;i<7;i++){const fx=x-12+i*4,h=4+((frameNo+i*3)%6)+(i%2)*3;
        ctx.fillStyle='#120e1e';ctx.fillRect(fx-1,y-h-1,4,h+1);ctx.fillStyle=i%2?'#ff7a2a':'#ffd23a';ctx.fillRect(fx,y-h,2,h);ctx.fillStyle='#fff3a0';ctx.fillRect(fx,y-2,2,2)}ctx.globalAlpha=1;continue}
      const x=Math.round(p.x-cx),y=Math.round(FY+p.z-p.y);ctx.save();ctx.translate(x,y);ctx.rotate(p.rot);ctx.fillStyle='#120e1e';ctx.fillRect(-5,-3,10,6);ctx.fillStyle=p.kind==='molotov'?'#a04a1a':'#3aa04a';ctx.fillRect(-4,-2,6,4);ctx.fillStyle=p.kind==='molotov'?'#ffd23a':'#7aff8a';ctx.fillRect(2,-1,3,2);ctx.restore();
      ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(x-3,FY+p.z,6,1)}
    // desperation shockwave
    if(P.state==='special'&&P.sp&&!P.sp.sup&&P.st>=8&&P.st<20){const k=P.st-8,R=14+k*4;ctx.globalAlpha=1-k/12;ctx.strokeStyle=P.c.col.aura;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(P.x-cx,FY+P.z-P.H*.4,R,R*.7,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1}
    ctx.save();ctx.translate(-cx,0);for(const h of this.hitFx)drawHitFx(h);
    for(const p of this.parts){ctx.fillStyle=p.c;ctx.globalAlpha=p.dust?Math.min(1,p.l/12)*.7:1;const s=p.dust?3:2;ctx.fillRect(p.x|0,p.y|0,s,s)}ctx.globalAlpha=1;
    for(const t of this.texts)drawText(t.s,clamp(t.x,cx+30,cx+W-30),t.y,t.c,1,{align:'center',outline:'#000'});ctx.restore();
    ctx.restore();
    if(F.camFlash>0){ctx.fillStyle=`rgba(255,255,255,${F.camFlash/10})`;ctx.fillRect(0,0,W,H);F.camFlash--}
    if(this.supT>0)this.drawSuper();
    this.drawHUD();
    if(this.paused){ctx.fillStyle='rgba(0,0,10,.75)';ctx.fillRect(0,0,W,H);drawText('PAUSE',128,40,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
      [['MOVE','D-PAD, UP/DOWN = DEPTH'],['COMBO','A, A, A  OR  A, A, B'],['KICK','B'],['JUMP KICK','JUMP, THEN A OR B'],['SPECIAL','SP (COSTS A LITTLE HP)'],['SUPER','FWD + SP, FULL BAR'],['GRAB','WALK INTO A DAZED FOE'],['THROW','GRAB, THEN A x3']]
        .forEach(([k,v],i)=>{drawText(k,22,60+i*10,'#ff9a6a',1,{shadow:false});drawText(v,234,60+i*10,'#fff',1,{align:'right',shadow:false})});
      ['RESUME','QUIT TO TITLE'].forEach((s,i)=>drawText((this.psel===i?'> ':'  ')+s,128,148+i*12,this.psel===i?'#ffe66a':'#99a',1,{align:'center'}))}},
  drawSuper(){const P=this.P,k=50-this.supT;ctx.fillStyle='rgba(0,0,20,.7)';ctx.fillRect(0,0,W,H);const c=P.c,im=c.por||CH[RUN.p1].por;
    ctx.drawImage(im,Math.round(lerp(-120,10,Math.min(1,k/10))),H-im.height);drawText(SUPER_NAME[RUN.p1]||'SUPER',170,80,'#fff',2,{align:'center',grad:FIRE,outline:'#300'})},
  drawHUD(){const P=this.P,c=P.c;ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(0,0,W,30);
    ctx.fillStyle='#ffd23a';ctx.fillRect(1,3,24,24);ctx.imageSmoothingEnabled=true;ctx.drawImage(CH[RUN.p1].head,2,4,22,22);ctx.imageSmoothingEnabled=false;
    const nm=CH[RUN.p1].name;drawText(nm,29,3,'#fff',1,{outline:'#000'});drawText('x'+Math.max(0,RUN.lives),33+textW(nm),3,'#ffe66a',1,{outline:'#000'});
    const bw=90,hw=Math.round(bw*P.hp/P.mhp),tw=Math.round(bw*P.trail/P.mhp);ctx.fillStyle='#000';ctx.fillRect(28,12,bw+2,8);ctx.fillStyle='#401018';ctx.fillRect(29,13,bw,6);
    ctx.fillStyle='#e02a2a';ctx.fillRect(29,13,tw,6);ctx.fillStyle=P.hp<P.mhp*.25&&(frameNo&8)?'#ff7a3a':'#ffd23a';ctx.fillRect(29,13,hw,6);
    const mw=Math.round(60*P.meter/100);ctx.fillStyle='#000';ctx.fillRect(28,22,62,4);ctx.fillStyle=P.meter>=100?((frameNo>>2)&1?'#fff':'#ff4ad8'):'#b03adf';ctx.fillRect(29,23,mw,2);
    if(P.meter>=100)drawText('SUPER!',94,20,'#ffe66a',1,{outline:'#000'});
    drawText('SCORE '+String(RUN.score||0).padStart(7,'0'),252,3,'#fff',1,{align:'right',outline:'#000'});
    const e=this.target;if(e&&this.targetT>0&&!e.dead){const w=60,ew=Math.max(0,Math.round(w*e.hp/e.mhp));drawText(e.name,252,13,FOES[e.kind].heavy?'#ffd23a':'#fff',1,{align:'right',outline:'#000'});
      ctx.fillStyle='#000';ctx.fillRect(252-w-2,22,w+2,6);ctx.fillStyle='#401018';ctx.fillRect(252-w-1,23,w,4);ctx.fillStyle='#ff5a3a';ctx.fillRect(252-w-1,23,ew,4)}
    if(this.goT>0&&!this.wave&&this.ph==='play'&&(frameNo>>4)&1){const fin=this.wi>=this.L.waves.length;drawText(fin?'EXIT':'GO',222,72,'#fff',2,{align:'right',grad:FIRE,outline:'#300'});
      ctx.fillStyle='#ffd23a';ctx.beginPath();ctx.moveTo(228,72);ctx.lineTo(248,80);ctx.lineTo(228,88);ctx.fill()}
    if(this.ph==='intro'){box(48,70,160,40,'rgba(10,8,30,.9)','#d04aff');drawText(RUN.level===3?'FINAL STAGE':'STAGE '+(RUN.level+1),128,76,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});drawText(this.L.name,128,96,'#ffe66a',1,{align:'center'})}
    if(this.ph==='clear')drawText('STAGE CLEAR!',128,70,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
    if(this.ph==='continue'){ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,0,W,H);drawText('CONTINUE?',128,60,'#fff',2,{align:'center',grad:ICE,outline:'#002'});
      drawText(String(Math.max(0,this.contN)),128,90,'#fff',4,{align:'center',grad:FIRE,outline:'#300'});drawText('PRESS A',128,140,'#ffe66a',1,{align:'center'})}}};
// the walkable floor band under a level backdrop: pavement slabs or dock boards, scrolling with the camera
// stage backdrop drawn 1:1 (no stretching: stretching 256->264 doubled every 32nd pixel row/column and made
// straight lines look twisted and wobble during screen shake). The 4 px border for shake repeats the edge pixels.
function padStage(img){const m=fxCache(img);if(m.pad)return m.pad;const c=document.createElement('canvas');c.width=img.width+8;c.height=img.height+8;const x=c.getContext('2d');x.imageSmoothingEnabled=false;
  const w=img.width,h=img.height;x.drawImage(img,4,4);x.drawImage(img,0,0,w,1,4,0,w,4);x.drawImage(img,0,h-1,w,1,4,h+4,w,4);x.drawImage(c,4,0,1,h+8,0,0,4,h+8);x.drawImage(c,w+3,0,1,h+8,w+4,0,4,h+8);return m.pad=c}
function drawFloor(f,cx){const y0=FY-10,g=ctx.createLinearGradient(0,y0,0,H);g.addColorStop(0,f.c1);g.addColorStop(1,f.c2);ctx.fillStyle=g;ctx.fillRect(0,y0,W,H-y0);
  ctx.fillStyle=f.edge;ctx.fillRect(0,y0,W,2);ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(0,y0+2,W,2);ctx.fillStyle=f.line;
  if(f.kind==='slabs'){for(const y of[y0+14,y0+28])ctx.fillRect(0,y,W,1);
    for(let wx=Math.floor(cx/40)*40-40;wx<cx+W+40;wx+=40)for(let y=y0+4;y<H;y++){const x=Math.round(wx-cx+(y-y0)*.45);if(x>=-1&&x<=W)ctx.fillRect(x,y,1,1)}}
  else{for(let y=y0+6;y<H;y+=6){ctx.fillRect(0,y,W,1);const r=((y-y0)/6)%2?20:0;for(let wx=Math.floor(cx/48)*48-48+r;wx<cx+W+48;wx+=48)ctx.fillRect(Math.round(wx-cx),y-5,1,5)}
    ctx.fillStyle='rgba(255,220,160,.06)';for(let y=y0+7;y<H;y+=12)ctx.fillRect(0,y,W,2)}
  ctx.fillStyle='rgba(255,255,255,.035)';for(let wx=Math.floor(cx/97)*97;wx<cx+W+97;wx+=97)ctx.fillRect(Math.round(wx-cx+30),y0+16,22,3)}
// pickups and crates, drawn in pixels
const ITEMDRAW={
  crate(x,y){ctx.fillStyle='#120e1e';ctx.fillRect(x-10,y-17,20,17);ctx.fillStyle='#a06a32';ctx.fillRect(x-9,y-16,18,15);ctx.fillStyle='#c8904a';ctx.fillRect(x-9,y-16,18,2);
    ctx.fillStyle='#6a4220';ctx.fillRect(x-9,y-9,18,1);ctx.fillRect(x-1,y-16,2,15);ctx.fillRect(x-9,y-16,1,15);ctx.fillRect(x+8,y-16,1,15)},
  pizza(x,y){ctx.fillStyle='#120e1e';ctx.beginPath();ctx.moveTo(x-8,y-2);ctx.lineTo(x+8,y-2);ctx.lineTo(x,y-14);ctx.fill();ctx.fillStyle='#ffd06a';ctx.beginPath();ctx.moveTo(x-6,y-3);ctx.lineTo(x+6,y-3);ctx.lineTo(x,y-12);ctx.fill();
    ctx.fillStyle='#c8701a';ctx.fillRect(x-7,y-4,14,2);ctx.fillStyle='#d02a2a';ctx.fillRect(x-2,y-7,2,2);ctx.fillRect(x+1,y-9,2,2);ctx.fillRect(x-1,y-5,2,1)},
  chicken(x,y){ctx.fillStyle='#120e1e';ctx.fillRect(x-8,y-9,16,8);ctx.fillStyle='#d08a3a';ctx.fillRect(x-7,y-8,11,6);ctx.fillStyle='#f0b060';ctx.fillRect(x-6,y-8,6,2);ctx.fillStyle='#fff';ctx.fillRect(x+4,y-6,4,2);ctx.fillRect(x+7,y-7,2,4)},
  cash(x,y){ctx.fillStyle='#120e1e';ctx.fillRect(x-8,y-8,16,8);ctx.fillStyle='#4ab05a';ctx.fillRect(x-7,y-7,14,6);ctx.fillStyle='#bff0b0';ctx.fillRect(x-2,y-6,4,4);ctx.fillStyle='#2a7a3a';ctx.fillRect(x-1,y-5,2,2)}};

function step(){pollInput();if(NET.lock&&!netStep()){CEL.update();return}frameNo++;CEL.update();if(TOAST&&--TOAST.l<=0)TOAST=null;
  if(fade.dir===1){fade.a+=fade.spd;if(fade.a>=1){fade.a=1;const cb=fade.cb;fade.cb=null;fade.dir=-1;cb&&cb()}return}
  if(fade.dir===-1){fade.a-=fade.spd;if(fade.a<=0){fade.a=0;fade.dir=0}}
  if(scene.update)scene.update();scene.t++;if(NET.lock)netAfter()}
function drawToast(){if(!TOAST)return;const a=Math.max(0,Math.min(1,TOAST.l/20,(170-TOAST.l)/10));ctx.globalAlpha=a;box(52,150,152,22,'rgba(30,20,0,.9)','#ffd23a');
  drawText('BADGE UNLOCKED',128,153,'#ffd23a',1,{align:'center',shadow:false});drawText(TOAST.s,128,162,'#fff',1,{align:'center',shadow:false});ctx.globalAlpha=1}
function render(){ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;scene.draw();drawToast();
  if(NET.lock&&NET.stall>20){box(58,86,140,18,'rgba(10,10,30,.9)','#5ab4ff');drawText('WAITING FOR OPPONENT'+'...'.slice(0,(performance.now()/300|0)%4),128,92,'#fff',1,{align:'center',shadow:false})}if(fade.a>0){ctx.fillStyle=`rgba(0,0,0,${fade.a})`;ctx.fillRect(0,0,W,H)}}
let last=performance.now(),acc=0;
// the game runs at 54 ticks a second (10% slower than 60): a touch heavier, less frantic
const TICK=1000/54;
function loop(now){requestAnimationFrame(loop);acc+=Math.min(100,now-last);last=now;let n=0;while(acc>=TICK&&n<4){step();acc-=TICK;n++}if(n>=4)acc=0;render();musicTick()}
go(Power);requestAnimationFrame(loop);
loadAssets().then(()=>{ASSETS_READY=true});
window.__dbg={Boot,clearToast:()=>{TOAST=null},Options,GameOver,textAudit:on=>{TA=on?{t:[],b:[]}:null;return TA},render:()=>render(),Brawl,StoryCard,startStory,LEVELS,FOES,SET,onBeat,showBox:v=>{SHOWBOX=v},NET,netHost,netJoin,netQuit,Online,OnlineSelect,ORDER,Intro,BADGE_KEYS:BADGES.map(b=>b[0]),vox:VOX,rec:REC,inp2:{held2,pressed2},setTwo,Records,startThrow,canThrow,track:TRACK,mus:MUS,inp:{held,pressed},tick:()=>{frameNo++},startSpecial,startAtk,applyHit,get scene(){return scene},get F(){return F},go,Fight,Title,Select,VS,Result,Ending,Continue,set RUN(v){RUN=v},get RUN(){return RUN},CH};

