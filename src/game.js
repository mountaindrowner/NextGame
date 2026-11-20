'use strict';
const VER=typeof GAME_VERSION!=='undefined'?GAME_VERSION:'DEV';
try{document.getElementById('ver').textContent='v'+VER}catch(e){}
// ============ BONFIRE BASH — a Dojo Boy fighting game ============
const W=256,H=192,GY=176,XMIN=26,XMAX=230,GRAV=0.3;
const $=id=>document.getElementById(id);
const cv=$('screen'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t;
let frameNo=0;

// ---------------- SETTINGS ----------------
const SET={diff:1,music:true,sound:true,voice:true};
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
function textW(s,sc=1){return String(s).length*6*sc-sc}
function drawText(s,x,y,col='#fff',sc=1,o={}){
  s=String(s).toUpperCase();
  if(o.align==='center')x-=textW(s,sc)/2;else if(o.align==='right')x-=textW(s,sc);
  x=Math.round(x);y=Math.round(y);
  const pass=(dx,dy,c,grad)=>{for(let i=0;i<s.length;i++){let ch=s[i],acc=false;if(ch==='É'){ch='E';acc=true}const g=GL[ch];if(!g)continue;const gx=x+i*6*sc+dx;
    for(let r=0;r<7;r++){const bits=g[r];if(!bits)continue;ctx.fillStyle=grad?grad[r]:c;for(let b=0;b<5;b++)if(bits&(16>>b))ctx.fillRect(gx+b*sc,y+r*sc+dy,sc,sc)}
    if(acc){ctx.fillStyle=grad?grad[0]:c;ctx.fillRect(gx+2*sc,y-2*sc+dy,sc,sc);ctx.fillRect(gx+3*sc,y-3*sc+dy,sc,sc)}}};
  if(o.outline){const w=o.ow||1;for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1],[0,2],[1,2]])pass(dx*w,dy*w,o.outline)}
  else if(o.shadow!==false)pass(1,1,o.shadow||'#000');
  pass(0,0,col,o.grad);
}
function wrap(s,n){const out=[];let line='';for(const w of s.split(' ')){if((line+' '+w).trim().length>n){out.push(line);line=w}else line=(line+' '+w).trim()}if(line)out.push(line);return out}

// ---------------- INPUT ----------------
const KEYS=['up','down','left','right','a','b','start','select','tap'];
const held={},prev={},pressed={},latch={},touchHeld={},keyHeld={},mouseHeld={};
KEYS.forEach(k=>{held[k]=prev[k]=pressed[k]=latch[k]=false});
// player 2 (2-player mode): its own keys and gamepad
const held2={},prev2={},pressed2={},latch2={},keyHeld2={};KEYS.forEach(k=>{held2[k]=prev2[k]=pressed2[k]=latch2[k]=false});
let TWO=false;// true while a 2-player match is being set up or played: keyboard splits into two sides
function setTwo(v){if(TWO===v)return;TWO=v;for(const k of KEYS){keyHeld[k]=keyHeld2[k]=false}}
function padState(g){const o={};if(!g)return o;const b=i=>!!(g.buttons[i]&&g.buttons[i].pressed),ax=g.axes||[];
  o.left=b(14)||ax[0]<-.5;o.right=b(15)||ax[0]>.5;o.up=b(12)||ax[1]<-.5;o.down=b(13)||ax[1]>.5;o.a=b(0)||b(2);o.b=b(1)||b(3);o.start=b(9);o.select=b(8);return o}
function pollInput(){const gp=navigator.getGamepads?[...navigator.getGamepads()].filter(Boolean):[];
  // one pad in a 2-player match goes to player 2 (player 1 has the keyboard); two pads: one each
  const g1=TWO&&gp.length===1?{}:padState(gp[0]),g2=TWO?padState(gp.length===1?gp[0]:gp[1]):{};
  for(const k of KEYS){const h=!!(touchHeld[k]||keyHeld[k]||mouseHeld[k]||g1[k]);pressed[k]=(h&&!prev[k])||latch[k];latch[k]=false;held[k]=h;prev[k]=h;
    const h2=!!(keyHeld2[k]||g2[k]);pressed2[k]=(h2&&!prev2[k])||latch2[k];latch2[k]=false;held2[k]=h2;prev2[k]=h2}}
const anyPress=()=>pressed.start||pressed.a||pressed.tap;
const els={dpad:$('dpad'),A:$('bA'),B:$('bB'),sel:$('bSel'),sta:$('bSta')};
function hitTest(x,y,out){
  const q=cv.getBoundingClientRect();if(x>q.left&&x<q.right&&y>q.top&&y<q.bottom){out.tap=true;return}
  const r=els.dpad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=x-cx,dy=y-cy,R=r.width/2,d=Math.hypot(dx,dy);
  if(d<R*1.4){if(d>R*0.15){const sec=Math.round(Math.atan2(dy,dx)/(Math.PI/4));
    ({0:['right'],1:['right','down'],2:['down'],3:['down','left'],4:['left'],'-4':['left'],'-3':['up','left'],'-2':['up'],'-1':['up','right']})[sec].forEach(k=>out[k]=true)}return}
  const ra=els.A.getBoundingClientRect(),rb=els.B.getBoundingClientRect(),rr=ra.width/2;
  const ca=[ra.left+ra.width/2,ra.top+ra.height/2],cb=[rb.left+rb.width/2,rb.top+rb.height/2];
  const da=Math.hypot(x-ca[0],y-ca[1]),db=Math.hypot(x-cb[0],y-cb[1]);
  if(Math.hypot(x-(ca[0]+cb[0])/2,y-(ca[1]+cb[1])/2)<rr*0.5){out.a=out.b=true;return}
  if(da<rr*1.45&&da<=db){out.a=true;return}if(db<rr*1.45){out.b=true;return}
  for(const[el,k]of[[els.sel,'select'],[els.sta,'start']]){const p=el.getBoundingClientRect();if(x>p.left-14&&x<p.right+14&&y>p.top-16&&y<p.bottom+16){out[k]=true;return}}
}
function applyPointer(store,out){for(const k of KEYS){if(out[k]&&!store[k]){latch[k]=true;if(k!=='tap'&&navigator.vibrate)try{navigator.vibrate(6)}catch(e){}}store[k]=!!out[k]}updateVis()}
function onTouch(e){e.preventDefault();unlockAudio();const out={};for(const t of e.touches)hitTest(t.clientX,t.clientY,out);applyPointer(touchHeld,out)}
['touchstart','touchmove','touchend','touchcancel'].forEach(ev=>document.addEventListener(ev,onTouch,{passive:false}));
let mDown=false;
document.addEventListener('mousedown',e=>{mDown=true;unlockAudio();const o={};hitTest(e.clientX,e.clientY,o);applyPointer(mouseHeld,o)});
document.addEventListener('mousemove',e=>{if(!mDown)return;const o={};hitTest(e.clientX,e.clientY,o);applyPointer(mouseHeld,o)});
document.addEventListener('mouseup',()=>{mDown=false;applyPointer(mouseHeld,{})});
const KM={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right',KeyJ:'b',KeyK:'a',KeyZ:'b',KeyX:'a',Enter:'start',Space:'start',ShiftRight:'select',Backspace:'select'};
// 2-player keyboard: P1 = WASD + F/G (or C/V), P2 = arrows + K/L (or numpad 1/2, comma/period)
const KM_P1={KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right',KeyF:'a',KeyG:'b',KeyC:'a',KeyV:'b',Enter:'start',Space:'start',Tab:'select'};
const KM_P2={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyK:'a',KeyL:'b',Numpad1:'a',Numpad2:'b',Comma:'a',Period:'b',NumpadEnter:'start',ShiftRight:'select',Backspace:'select'};
function keyRoute(c){if(TWO)return KM_P1[c]?[1,KM_P1[c]]:KM_P2[c]?[2,KM_P2[c]]:null;return KM[c]?[1,KM[c]]:null}
document.addEventListener('keydown',e=>{const r=keyRoute(e.code);if(!r)return;e.preventDefault();unlockAudio();const[pl,k]=r;
  if(pl===1){if(!keyHeld[k])latch[k]=true;keyHeld[k]=true}else{if(!keyHeld2[k])latch2[k]=true;keyHeld2[k]=true}updateVis()});
document.addEventListener('keyup',e=>{const r=keyRoute(e.code);if(!r)return;if(r[0]===1)keyHeld[r[1]]=false;else keyHeld2[r[1]]=false;updateVis()});
document.addEventListener('contextmenu',e=>e.preventDefault());
function updateVis(){const h=k=>touchHeld[k]||keyHeld[k]||mouseHeld[k];
  els.dpad.className='btn'+(h('up')?' u':'')+(h('down')?' d':'')+(h('left')?' l':'')+(h('right')?' r':'');
  els.A.classList.toggle('on',!!h('a'));els.B.classList.toggle('on',!!h('b'));els.sel.classList.toggle('on',!!h('select'));els.sta.classList.toggle('on',!!h('start'))}

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
  hit:()=>{N(.12,.55,3000,200);T('square',220,.08,.22,70);T('sine',110,.14,.5,40)},
  heavy:()=>{N(.22,.7,2500,120);T('square',160,.14,.28,45);T('sine',80,.25,.6,30)},
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
function playMusic(name,tr=0){if(name==='title'&&playTrack('title'))return;if(MUS.name===name&&MUS.tr===tr&&MUS.s)return;stopTrack();const s=SONGS[name];MUS.name=name;MUS.tr=tr;MUS.step=0;MUS.next=AU.ctx?AU.ctx.currentTime+0.06:0;
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
    speed:0.82,power:1.3,def:1.22,jump:0.88,stats:[2,5,4],special:'slam',spName:'BEAR SLAM',special2:'charge',sp2Name:'IRON CHARGE',tr:-5,
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
    speed:1.06,power:1.0,def:0.98,jump:1.02,stats:[4,3,3],special:'takeover',spName:'HOSTILE TAKEOVER',special2:'powersuit',sp2Name:'POWER SUIT',special3:'laser',sp3Name:'LASER GLARE',tr:2,skin2:'heckyfox',
    col:{skin:'#e8a878',glove:'#e8a878',leg:'#f0eef6',foot:'#1a1820',aura:'#ffd23a'},sh:.72,hip:.5,
    quote:"DON'T TAKE IT PERSONALLY. IT'S JUST BUSINESS.",lose:"I'LL HAVE MY LAWYERS CALL YOU.",stageName:'PENTHOUSE'},
  lawslie:{id:'lawslie',name:'LAWSLIE',nick:'THE LAW',style:'POLICE DEFENSE',country:'PRECINCT 9',countryLabel:'ORIGIN',flag:'badge',ht:"5'7\" (170 CM)",wt:'140 LB (64 KG)',
    speed:1.02,power:0.98,def:1.04,jump:1.0,stats:[3,3,5],special:'taser',spName:'TASER',special2:'cuff',sp2Name:"CUFF 'EM",tr:0,
    col:{skin:'#d89a6a',glove:'#1c1a24',leg:'#283068',foot:'#1a1820',aura:'#5ab4ff'},sh:.72,hip:.5,
    quote:'YOU HAVE THE RIGHT TO REMAIN SILENT. I SUGGEST YOU USE IT.',lose:'OFFICER DOWN... CALL IT IN.',stageName:'PRECINCT 9'},
};
const ORDER=['karl','ivan','vizor','padre','zeke','hecky','lawslie'];
// ---- archetypes: every fighter plays differently (health, reach, movement, chains) and has one unique trait ----
const ARCH={
  karl:{type:'RUSHDOWN',trait:'FAST DASH, 4-HIT CHAINS',hp:92,chain:4,dash:1.3,reach:1},
  ivan:{type:'GRAPPLER',trait:'ARMORED KICK, MOST HP',hp:118,dash:.8,armor:true,reach:1},
  vizor:{type:'ZONER',trait:'LONGEST REACH',hp:98,reach:1.25},
  padre:{type:'POWERHOUSE',trait:'COUNTERS KNOCK DOWN',hp:106,heavy:true,reach:1.05},
  zeke:{type:'HIGH/LOW ZONER',trait:'BLOCKED BALL = RELOAD',hp:104,spare:true,reach:1},
  hecky:{type:'TECHNICIAN',trait:'PARRY: TAP FWD ON HIT',hp:98,parry:true,reach:1.05},
  lawslie:{type:'ENFORCER',trait:'NO CHIP, BLOCK = METER',hp:100,enforcer:true,reach:1}};
const arch=c=>ARCH[c.id]||{};
const SUPER_NAME={"karl": "MIL LÉGUAS", "ivan": "SIBERIAN STORM", "vizor": "FULL EXPOSURE", "padre": "FINAL SERMON", "zeke": "PERFECT GAME", "hecky": "GOLDEN PARACHUTE", "lawslie": "FULL ARREST"};
const ENDING={"lawslie": "OFFICER LAWSLIE CLOSED THE BONFIRE BASH CASE FILE: EVERY FIGHTER BOOKED, EVERY TROPHY ACCOUNTED FOR. THE CHIEF MADE HER DETECTIVE BY MORNING.", "hecky": "HECKY XAVIER BOUGHT THE BONFIRE BASH TOURNAMENT THE NEXT MORNING. NEXT YEAR'S TROPHY IS GOLD-PLATED, AND SO IS THE PENTHOUSE.", "zeke": "ZEKE BOWLED A PERFECT 300 AT THE CHAMPIONS PARTY, THEN BOUGHT EVERYONE NACHOS. THE STRIKE LANES ARE NOW THE MOST FAMOUS ALLEY ON EARTH.", "karl": "PAPA-LEGUAS RAN STRAIGHT FROM THE FINAL FIGHT TO HIS DOJO AND HUNG UP A SIGN: EVERYONE WELCOME. JUST KEEP UP.", "ivan": "IVAN CARRIED THE TROPHY HOME ON ONE SHOULDER. THE IRON GYM HAS A NEW RULE: NOBODY LEAVES WITHOUT A BEAR HUG.", "vizor": "VIZOR REPLAYED EVERY FIGHT FRAME BY FRAME. THE FOOTAGE BECAME THE MOST WATCHED VIDEO ON EARTH.", "padre": "SAMSON RANG THE OLD CHAPEL BELL FOR THE FIRST TIME IN YEARS. EVEN HIS RIVALS CAME TO LISTEN."};
// combo trials: each step is the move that must hit, in order, inside one combo
const TRIALS={karl:[['jab','kick'],['jab','jab','kick','sp1'],['jab','kick','super']],
  ivan:[['jab','kick'],['jkick','jab','kick'],['cjab','sweep']],
  vizor:[['jab','kick'],['jab','kick','sp1'],['jab','kick','super']],padre:[['jab','kick'],['jab','kick','sp1'],['cjab','cjab','sweep']],
  zeke:[['jab','kick'],['jab','kick','sp1'],['jab','kick','super']],
  hecky:[['jab','kick'],['cjab','jab','kick','sp1'],['jab','kick','super']],
  lawslie:[['jab','kick'],['jab','kick','sp1'],['jab','kick','super']]};
const TNAME={jab:'JAB',kick:'KICK',cjab:'LOW JAB',sweep:'SWEEP',jpunch:'JUMP PUNCH',jkick:'JUMP KICK',sp1:'SPECIAL',sp2:'SPECIAL 2',super:'SUPER',throw:'THROW'};
// bread-and-butter combos shown in the pause menu
const BNB={karl:'JAB, JAB, KICK > A+B',ivan:'JUMP KICK, JAB, KICK',vizor:'JAB, KICK > A+B',padre:'JAB, KICK > A+B (OVERHEAD)',zeke:'JAB, KICK > A+B',hecky:'LOW JAB, JAB, KICK > A+B',lawslie:'JAB, KICK > A+B (TASER)'};
// cooldown (frames) per special; second specials are stronger tools with longer cooldowns
const SPCD={rush:75,shuriken:75,slam:75,spin:75,flash:75,tome:75,strike:75,split:90,takeover:70,powersuit:720,laser:150,taser:80,cuff:240,step:80,counter:110,charge:120,rising:70,replay:480,bless:600};
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
function altOf(img){const m=fxCache(img);return m.alt||(m.alt=altVersion(img))}

function drawFlag(code,x,y){x|=0;y|=0;ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,16,12);
  if(code==='br'){ctx.fillStyle='#1f9a3a';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd72a';for(let r=0;r<5;r++){const w=2+r*2;ctx.fillRect(x+7-w/2-1,y+r,w+2,1);ctx.fillRect(x+7-w/2-1,y+9-r,w+2,1)}ctx.fillStyle='#2a3a9a';ctx.fillRect(x+5,y+3,4,4);ctx.fillRect(x+6,y+2,2,6);ctx.fillRect(x+4,y+4,6,2)}
  else if(code==='jp'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,10);ctx.fillStyle='#d01c2a';ctx.fillRect(x+5,y+2,4,6);ctx.fillRect(x+4,y+3,6,4)}
  else if(code==='badge'){ctx.fillStyle='#1c2450';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd23a';ctx.fillRect(x+5,y+1,4,1);ctx.fillRect(x+4,y+2,6,5);ctx.fillRect(x+5,y+7,4,1);ctx.fillRect(x+6,y+8,2,1);ctx.fillStyle='#1c2450';ctx.fillRect(x+6,y+4,2,1)}
  else if(code==='tie'){ctx.fillStyle='#e8e6ee';ctx.fillRect(x,y,14,10);ctx.fillStyle='#1a1820';ctx.fillRect(x+6,y+1,2,2);ctx.fillRect(x+5,y+3,4,5);ctx.fillRect(x+6,y+8,2,1);ctx.fillStyle='#ffd23a';ctx.fillRect(x+1,y+1,1,8);ctx.fillRect(x+12,y+1,1,8)}
  else if(code==='pin'){ctx.fillStyle='#2a1640';ctx.fillRect(x,y,14,10);ctx.fillStyle='#fff';ctx.fillRect(x+6,y+1,2,2);ctx.fillRect(x+5,y+3,4,6);ctx.fillRect(x+6,y+9,2,1);ctx.fillStyle='#e02a2a';ctx.fillRect(x+5,y+4,4,1)}
  else if(code==='cross'){ctx.fillStyle='#4a1626';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd23a';ctx.fillRect(x+6,y+1,2,8);ctx.fillRect(x+3,y+3,8,2)}
  else if(code==='unk'){ctx.fillStyle='#2a2f3a';ctx.fillRect(x,y,14,10);ctx.fillStyle='#3ae8ff';ctx.fillRect(x+5,y+2,4,1);ctx.fillRect(x+8,y+3,1,2);ctx.fillRect(x+6,y+5,2,1);ctx.fillRect(x+6,y+6,1,1);ctx.fillRect(x+6,y+8,1,1)}
  else if(code==='ru'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,4);ctx.fillStyle='#2a48b0';ctx.fillRect(x,y+3,14,4);ctx.fillStyle='#d0202a';ctx.fillRect(x,y+7,14,3)}}
function drawMirror(img,x,y){ctx.save();ctx.translate(x+img.width,y);ctx.scale(-1,1);ctx.drawImage(img,0,0);ctx.restore()}
function box(x,y,w,h,bg='rgba(10,10,30,.82)',bd='#ffd23a'){ctx.fillStyle=bd;ctx.fillRect(x-1,y-1,w+2,h+2);ctx.fillStyle='#000';ctx.fillRect(x,y,w,h);ctx.fillStyle=bg;ctx.fillRect(x+1,y+1,w-2,h-2)}
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
    if(this.t>74){drawText('PIXEL FIGHT SYSTEM',128,y+30,'#8b2d6b',1,{align:'center',shadow:false});drawText('BONFIRE BASH V'+VER,128,y+50,'#2a2a6a',1,{align:'center',shadow:false});ctx.fillStyle='#8b2d6b';ctx.fillRect(70,y+26,116,1);ctx.fillStyle='#2d3a8b';ctx.fillRect(70,y+42,116,1)}}};

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
  items:['ARCADE','VERSUS CPU','2 PLAYERS','TRAINING','TRIALS','RECORDS','OPTIONS'],
  update(){if(this.ph==='press'){if(anyPress()){SFX.start();this.ph='menu';say('Bonfire Bash',1,0.5)}return}
    const n=this.items.length;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
    if(pressed.b){this.ph='press';SFX.back()}
    if(pressed.a||pressed.start){SFX.ok();const s=this.sel;const it=this.items[s];if(it==='OPTIONS')go(Options);else if(it==='RECORDS')go(Records);else goFade(()=>go(Select,{ARCADE:'arcade','VERSUS CPU':'vs','2 PLAYERS':'2p',TRAINING:'training',TRIALS:'trials'}[it]))}},
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
const Select={enter(mode){this.mode=mode;setTwo(mode==='2p');this.ph='p1';this.cur=this.cur||0;this.p1=null;this.done=0;this.slide=20;this.alt=[false,false];this.skin=[false,false];playMusic('select')},
  solo(){return this.mode==='arcade'||this.mode==='trials'},
  update(){if(this.done){if(++this.done>50){goFade(()=>this.finish())}return}
    // in 2-player mode, player 2 picks with their own controls
    const P=this.ph==='p2'&&this.mode==='2p'?pressed2:pressed,N=ORDER.length,pi=this.ph==='p1'?0:1;
    if(P.left||P.up){this.cur=(this.cur+N-1)%N;this.slide=16;SFX.move()}if(P.right||P.down){this.cur=(this.cur+1)%N;this.slide=16;SFX.move()}
    if(P.select&&CH[ORDER[this.cur]].skin2&&CH[CH[ORDER[this.cur]].skin2]){this.skin[pi]=!this.skin[pi];SFX.move()}
    else if(P.select&&rc(ORDER[this.cur]).clear>0){this.alt[pi]=!this.alt[pi];SFX.move()}// unlocked by clearing arcade
    if(P.b){SFX.back();if(this.ph==='p2'){this.ph='p1';this.cur=ORDER.indexOf(this.p1)}else goFade(()=>{go(Title);Title.ph='menu'});return}
    if(P.a||P.start){const id=ORDER[this.cur];SFX.ok();sayName(id);
      if(this.ph==='p1'){this.p1=id;if(!this.solo()){this.ph='p2';this.cur=(this.cur+1)%ORDER.length}else this.done=1}else{this.p2=id;this.done=1}}
    if(this.slide>0)this.slide-=2},
  finish(){const alt=[this.alt[0]&&rc(this.p1).clear>0,!!(this.p2&&this.alt[1]&&rc(this.p2).clear>0)],skin=[this.skin[0]&&!!CH[this.p1].skin2,!!(this.p2&&this.skin[1]&&CH[this.p2].skin2)];
    if(this.mode==='arcade'){const opp=ORDER.filter(i=>i!==this.p1).sort(()=>Math.random()-.5);RUN={mode:'arcade',p1:this.p1,ladder:opp,idx:0,cont:0,alt,skin}}
    else if(this.mode==='trials')RUN={mode:'trials',p1:this.p1,ladder:[this.p1==='ivan'?'karl':'ivan'],idx:0,cont:0,alt,skin};
    else RUN={mode:this.mode,p1:this.p1,ladder:[this.p2],idx:0,cont:0,alt,skin,score:[0,0]};
    if(this.mode==='training'||this.mode==='trials')startFight();else go(VS)},
  draw(){const t=this.t,id=ORDER[this.cur],c=CH[id];stripes(t,'#120f30','#191540');
    drawText(this.ph==='p1'?'SELECT YOUR FIGHTER':'CHOOSE YOUR OPPONENT',128,5,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});
    ctx.fillStyle='#d0301a';ctx.fillRect(40,14,176,1);
    // portrait
    ctx.save();ctx.beginPath();ctx.rect(0,20,104,H-20);ctx.clip();ctx.fillStyle='rgba(255,255,255,.04)';ctx.fillRect(0,20,104,H);
    const pi0=this.ph==='p1'?0:1,pm=(c.skin2&&this.skin[pi0]&&CH[c.skin2]?CH[c.skin2]:c).porm,px=Math.round(-6-this.slide*2);if(this.ph==='p2')drawMirror(pm,px+6,H-pm.height-4);else ctx.drawImage(pm,px,H-pm.height-4);
    if(this.done&&this.done<8){ctx.globalAlpha=.7;ctx.drawImage(silhouette(pm,'#fff'),px,H-pm.height-4);ctx.globalAlpha=1}ctx.restore();
    // panel
    box(106,20,146,112);const lw=84,lh=Math.round(c.logo.height*lw/c.logo.width);ctx.drawImage(c.logo,0,0,c.logo.width,c.logo.height,112,24,lw,lh);drawText(c.nick,114,58,'#ffe66a');
    const L=[['STYLE',c.style],[c.countryLabel||'COUNTRY',c.country],['TYPE',arch(c).type||'-']];
    if(arch(c).trait)drawText(arch(c).trait,112,94,'#7aff8a',1,{shadow:false});
    L.forEach(([k,v],i)=>{const y=67+i*9;drawText(k,112,y,'#99a',1,{shadow:false});drawText(':',154,y,'#99a',1,{shadow:false});drawText(v,160,y,'#fff',1,{shadow:false})});
    drawFlag(c.flag,226,76);
    drawText('A+B : '+c.spName,112,104,'#ff9a6a',1,{shadow:false});if(c.sp2Name)drawText('DN+A+B: '+c.sp2Name,112,113,'#7ad8ff',1,{shadow:false});
    // stats
    ['SPD','PWR','DEF'].forEach((k,i)=>{const x=112+i*46;drawText(k,x,123,'#99a',1,{shadow:false});for(let j=0;j<5;j++){ctx.fillStyle=j<c.stats[i]?'#ffd23a':'#333';ctx.fillRect(x+20+j*4,124,3,5)}});
    // icons
    ORDER.forEach((oid,i)=>{const N=ORDER.length,S=N>8?14:N>7?16:N>6?19:N>5?22:27,x=108+i*(S+2),y=142+(27-S);ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,S+2,S+2);ctx.imageSmoothingEnabled=true;ctx.drawImage(CH[oid].head,x,y,S,S);ctx.imageSmoothingEnabled=false;
      if(this.ph==='p2'&&oid===this.p1){ctx.fillStyle='#e03030';ctx.fillRect(x,y+S-6,12,6);drawText('1P',x+1,y+S-6,'#fff',1,{shadow:false})}
      if(rc(oid).clear>0)drawText('*',x+S-5,y+1,'#ffd23a',1,{outline:'#000'});
      if(i===this.cur&&((t>>3)&1||this.done)){ctx.strokeStyle=this.ph==='p1'?'#ff3a3a':'#3aa0ff';ctx.lineWidth=2;ctx.strokeRect(x-2,y-2,S+4,S+4);
        drawText(this.ph==='p1'?'1P':({vs:'CPU',training:'DMY'}[this.mode]||'2P'),x+S/2,y-9,this.ph==='p1'?'#ff5a5a':'#5ab4ff',1,{align:'center'})}});
    const unl=rc(id).clear>0,pi=this.ph==='p1'?0:1;
    if(c.skin2&&CH[c.skin2])drawText('SELECT: COSTUME '+(this.skin[pi]?'2 (FOX)':'1'),180,182,'#ffe66a',1,{align:'center',shadow:false});else drawText(unl?('SELECT: COLOR '+(this.alt[pi]?'2':'1')):'CLEAR ARCADE: NEW COLOR',180,182,unl?'#ffe66a':'#6a6688',1,{align:'center',shadow:false});
    if(this.mode==='2p')drawText(this.ph==='p1'?'PLAYER 1 PICKS':'PLAYER 2 PICKS',52,22,this.ph==='p1'?'#ff5a5a':'#5ab4ff',1,{align:'center',outline:'#000'})}};

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
const ATK={
  jab:{s:4,a:4,r:8,dmg:4,reach:48,hy:.7,hh:16,stun:15,bs:9,kb:2,limb:'arm',lv:'mid'},
  kick:{s:7,a:5,r:14,dmg:7,reach:60,hy:.5,hh:18,stun:19,bs:11,kb:3,limb:'leg',lv:'mid'},
  cjab:{s:4,a:4,r:8,dmg:4,reach:46,hy:.62,hh:14,stun:14,bs:8,kb:1.8,limb:'arm',lv:'mid',crouch:true},
  sweep:{s:8,a:6,r:20,dmg:8,reach:62,hy:.1,hh:14,stun:0,bs:12,kb:2,limb:'leg',lv:'low',knock:true,crouch:true},
  jpunch:{s:3,a:10,r:0,dmg:6,reach:44,hy:.42,hh:22,stun:17,bs:9,kb:2,limb:'arm',lv:'high',air:true},
  jkick:{s:4,a:12,r:0,dmg:8,reach:52,hy:.22,hh:22,stun:19,bs:10,kb:2.6,limb:'leg',lv:'high',air:true},
};
let F=null,atkId=0;
class Fighter{constructor(id,side,cpu,alt){const c=CH[id];this.c=c;this.side=side;this.cpu=cpu;this.alt=alt;this.img=alt?c.alt:c.spr;this.H=c.H;
  this.x=side?180:76;this.y=0;this.vx=0;this.vy=0;this.face=side?-1:1;this.hp=this.mhp=(ARCH[c.id]&&ARCH[c.id].hp)||100;this.trail=this.mhp;this.state='idle';this.st=0;this.atk=null;this.ast=0;
  this.stun=0;this.crouch=false;this.inv=0;this.combo=0;this.comboT=0;this.spCD=0;this.spCD2=0;this.spCD3=0;this.meter=0;this.flash=0;this.hist=[];this.ghosts=[];this.lastA=-99;this.lastB=-99;this.ai={t:0,dur:0,plan:null};this.sp=null;this.hitDone=false}
  get h(){return this.crouch?this.H*(arch(this.c).crouchH||.7):this.H}
  hurt(){return{x1:this.x-15,x2:this.x+15,y1:this.y,y2:this.y+this.h}}}
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
function control(f,o,inp){
  const fwd=f.face>0?inp.r:inp.l,back=f.face>0?inp.l:inp.r,upE=inp.u&&!f.pu;f.pu=inp.u;
  f.hist.push(inp.d?(fwd?3:back?1:2):inp.u?(fwd?9:back?7:8):fwd?6:back?4:5);if(f.hist.length>24)f.hist.shift();
  if(inp.aP){f.lastA=frameNo;f.bufA=frameNo}if(inp.bP){f.lastB=frameNo;f.bufB=frameNo}
  const bA=frameNo-(f.bufA??-99)<=BUF,bB=frameNo-(f.bufB??-99)<=BUF,btn=bA||bB,use=()=>{f.bufA=f.bufB=-99};
  const both=Math.abs(f.lastA-f.lastB)<=4&&frameNo-Math.max(f.lastA,f.lastB)<=BUF;
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
function startAtk(f,n){f.atk={...ATK[n],name:n,id:++atkId};f.atk.reach*=arch(f.c).reach||1;f.hitDone=false;if(f.atk.air)f.ast=0;else{f.state='attack';f.st=0;f.vx=0;f.crouch=!!f.atk.crouch}
  (n==='kick'||n==='sweep'||n==='jkick'?SFX.whooshH:SFX.whoosh)()}
const canThrow=(f,o)=>Math.abs(o.x-f.x)<48&&o.y<=0&&f.y<=0&&o.inv<=0&&!(o.throwInv>0)&&['idle','walk','crouch','attack','land','dash','prejump'].includes(o.state)&&!(o.state==='attack'&&phaseOf(o)==='active');
function startThrow(f,o,back){f.state='throwing';f.st=0;f.vx=0;f.atk=null;f.crouch=false;f.thBack=back;f.thr=null;f.thrId=++atkId;SFX.whoosh()}
function techThrow(a,d){a.thr=null;a.grabbed=null;for(const f of[a,d]){f.state='block';f.st=0;f.stun=14;f.vx=-f.face*3.2;f.rot=0;f.y=0;f.throwInv=30}
  addText('THROW BREAK!',(a.x+d.x)/2,GY-a.H-12,'#7ad8ff');sparks((a.x+d.x)/2,GY-a.H*.6,'#ffffff',10);SFX.block();F.hitstop=6;if(!d.cpu)badge('tech')}
function startSpecial(f,o,which=1){if(which===3)return startSuper(f,o);const kind=which===4?f.c.special3:which===2?f.c.special2:f.c.special,name=which===4?f.c.sp3Name:which===2?f.c.sp2Name:f.c.spName;
  f.state='special';f.st=0;f.vx=0;f.crouch=false;f.atk=null;f.sp={kind,two:which===2,hits:0,last:-99,id:++atkId};
  if(which===4)f.spCD3=SPCD[kind]||120;else if(which===2)f.spCD2=SPCD[kind]||90;else f.spCD=SPCD[kind]||75;
  F.superFlash=10;F.superBy=f;SFX.special();addText(name+'!',f.x,GY-f.H-14,f.c.col.aura);
  if(kind==='step')f.inv=20;if(kind==='rising')f.inv=7;if(kind==='replay'){f.inv=24;f.sp.path=(f.rh||[]).slice(-90).reverse();SFX.rewind()}
  if(kind==='charge')f.sp.armor=1;
  fighterVoice(f,which===4?'sp3':which===2?'sp2':'sp1')}
// ---- SUPER: cinematic freeze, then a dash that locks into a 6-hit flurry ----
function startSuper(f,o){f.meter=0;f.state='special';f.st=0;f.vx=0;f.crouch=false;f.atk=null;f.sp={kind:'super',hits:0,last:-99,id:++atkId};
  F.cine={by:f,t:0,n:46};f.inv=18;SFX.superS();fighterVoice(f,'super')}
function trialHit(att,tag,id){const T=F.trial;if(!T||T.clear||T.done)return;const seq=TRIALS[att.c.id][T.i];if(!seq||id===T.lastId)return;T.lastId=id;
  if(att.combo<=1)T.step=0;
  if(seq[T.step]===tag){T.step++;if(T.step>=seq.length){T.clear=80;SFX.start();CEL.burst(30);addText('CLEAR!',att.x,GY-att.H-14,'#7aff8a')}}else T.step=seq[0]===tag?1:0}
function updateSuper(f,o){const s=f.sp,t=f.st;
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
  else if(s.kind==='slam'){if(t>=5&&t<=10&&!s.hits){const hb={x1:f.face>0?f.x:f.x-54,x2:f.face>0?f.x+54:f.x,y1:f.y+10,y2:f.y+f.H*.9};
      if(o.y<=2&&o.inv<=0&&!['down','rise','ko','knock','grabbed','hurt'].includes(o.state)&&overlap(hb,o.hurt())){s.hits=1;SFX.grab();f.state='slamming';f.st=0;f.slam={T:30,dmg:17,back:true,h:64,kind:'grab'};o.state='grabbed';o.st=0;o.atk=null;o.sp=null;o.crouch=false;f.grabbed=o;F.hitstop=6}}
    if(t>=34)endSpecial(f)}
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
    if(t===10&&!F.proj.some(p=>p.owner===f)){F.proj.push({kind:'ball',x:f.x+f.face*22,y:5,vx:f.face*3.6,owner:f,rot:0,life:110,lv:'low',dmg:10,kb:2.6,knock:true,tag:'sp1'});SFX.whooshH();dust(f.x+f.face*22,4)}
    if(t>=28)endSpecial(f)}
  else if(s.kind==='takeover'){// Hostile Takeover: rising uppercut that LAUNCHES the opponent for a juggle
    if(t<5)f.vx=0;else if(t<12)f.vx=f.face*3.2;else f.vx*=.6;if(t===5)SFX.whooshH();
    if(t>=6&&t<13&&!s.hits){const hb={x1:f.face>0?f.x-4:f.x-42,x2:f.face>0?f.x+42:f.x+4,y1:f.y+f.H*.3,y2:f.y+f.H*1.25};
      if(tryHit(f,o,hb,{dmg:9,stun:20,bs:12,kb:1,lv:'mid',knock:true,launch:true,heavy:true}))s.hits=1}
    if(t>=30)endSpecial(f)}
  else if(s.kind==='laser'){// Laser Glare: eye beams across the screen at head height (crouch under it, or block standing)
    if(t===4)SFX.lock();if(t===12)SFX.laser();
    if(t>=12&&t<24){s.ey=f.y+f.H*.86;s.end=f.face>0?W+8:-8;
      if(s.hits<2&&t-s.last>=5){const hb={x1:f.face>0?f.x+8:-8,x2:f.face>0?W+8:f.x-8,y1:s.ey-3,y2:s.ey+3};
        const r=tryHit(f,o,hb,{dmg:6,stun:16,bs:10,kb:1.6,lv:'mid',chip:1,tag:'sp3'});if(r){s.hits++;s.last=t;s.end=o.x;if(r==='block')s.hits=2}}
      if(Math.abs(o.x-f.x)>0&&o.y+o.h>s.ey-3&&o.y<s.ey+3&&!['down','ko'].includes(o.state))s.end=o.x}
    if(t>=34)endSpecial(f)}
  else if(s.kind==='taser'){// Taser: short-range prongs; a hit stuns for a long time (free follow-up)
    if(t===8&&!F.proj.some(p=>p.owner===f)){F.proj.push({kind:'prong',x:f.x+f.face*24,y:f.H*.6,vx:f.face*6.2,owner:f,rot:0,life:17,lv:'mid',dmg:7,stun:46,kb:0.6,tag:'sp1'});SFX.taser()}
    if(t>=30)endSpecial(f)}
  else if(s.kind==='flash'){// Shutter Flash: lock a reticle on the target zone, then the flash hits whatever is inside it
    if(t===4){const d=(o.x-f.x)*f.face;s.lx=f.x+f.face*clamp(d>20?d:80,34,128);SFX.lock()}
    if(t===14){SFX.flash();F.camFlash=7;const hb={x1:s.lx-22,x2:s.lx+22,y1:4,y2:f.H*1.05};
      tryHit(f,o,hb,{dmg:11,stun:26,bs:14,kb:2.4,lv:'mid',chip:2,knock:true,heavy:true})}
    if(t>=32)endSpecial(f)}}
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
    if(t===12&&!F.proj.some(p=>p.owner===f)){const x0=f.x+f.face*16,y0=f.H*.6,vy=4.6,g=0.2,T=(vy+Math.sqrt(vy*vy+2*g*(y0-4)))/g,d=clamp(Math.abs(o.x-x0),40,150);
      F.proj.push({kind:'lob',x:x0,y:y0,vx:f.face*d/T,vy,g,owner:f,rot:0,life:140,lv:'high',dmg:10,stun:24,kb:2,tag:'sp2'});SFX.whoosh()}
    if(t>=32)endSpecial(f)}
  else if(s.kind==='cuff'){// Cuffed!: a lunging grab; cuffed opponents can't use specials or super for 5 seconds
    if(t<4)f.vx=0;else if(t<12)f.vx=f.face*3.4;else f.vx*=.6;
    if(t>=4&&t<=12&&!s.hits){const hb={x1:f.face>0?f.x:f.x-46,x2:f.face>0?f.x+46:f.x,y1:f.y+10,y2:f.y+f.H*.9};
      if(o.y<=2&&o.inv<=0&&!['down','rise','ko','knock','grabbed','hurt'].includes(o.state)&&overlap(hb,o.hurt())){s.hits=1;f.vx=0;
        applyHit(f,o,{dmg:8,stun:34,bs:0,kb:1,lv:'mid',unblockable:true,tag:'sp2'},o.x-f.face*8,GY-o.H*.5);if(o.hp>0){o.cuffed=300;SFX.cuff();addText('CUFFED!',o.x,GY-o.H-14,'#c8d0e0')}F.hitstop=10}}
    if(t>=34)endSpecial(f)}
  else if(s.kind==='powersuit'){// Power Suit: a 7-second power-up (+25% damage, faster)
    if(t===14){f.buff=420;SFX.bless();addText('POWER UP!',f.x,GY-f.H-14,'#ffd23a')}if(t>=30)endSpecial(f)}
  else if(s.kind==='bless'){// Benediction: pray to heal; any hit interrupts it
    if(t>8&&t<70){f.hp=Math.min(f.mhp,f.hp+0.26);f.trail=Math.max(f.trail,f.hp);if(t%3===0)F.parts.push({x:f.x+rnd(-16,16),y:GY-rnd(0,f.H*.8),vx:0,vy:rnd(-1.2,-.5),l:rnd(14,26)|0,c:Math.random()<.5?'#fff3a0':'#ffd23a',g:0})}
    if(t===10)SFX.bless();if(t>=78)endSpecial(f)}}
function updateSlam(f,o){const S=f.slam||{T:30,dmg:17,back:true,h:64},t=f.st,T=S.T;
  if(t<=T){const p=t/T,th=Math.PI*p;if(S.back){o.x=f.x+f.face*30*Math.cos(th);o.rot=-f.face*Math.PI*p*1.2}else{o.x=f.x+f.face*(30+44*p);o.rot=f.face*Math.PI*p}o.y=Math.sin(th)*S.h}
  if(t===T){o.y=0;o.rot=0;const dmg=S.dmg*f.c.power/o.c.def;if(F.trial&&f===F.p1)trialHit(f,S.kind==='throw'?'throw':'sp1',f.sp?f.sp.id:f.thrId);if(S.kind==='throw'&&!f.cpu)badge('throw');
    f.meter=Math.min(100,f.meter+12);o.meter=Math.min(100,o.meter+6);o.hp=Math.max(F.training?1:0,o.hp-dmg);F.shake=9;F.hitstop=12;SFX.slam();dust(o.x,10);sparks(o.x,GY-6,'#fff',14);
    o.x=clamp(o.x,XMIN,XMAX);if(S.back)f.face=-f.face;f.combo=1;o.flash=6;if(o.hp<=0){o.state='ko';o.st=0;F.onKO(f,o)}else{o.state='down';o.st=0}}
  if(t>=T+18){f.state='idle';f.st=0;f.sp=null;f.grabbed=null;f.slam=null}}
const JUGGLE=2,SCALE=[1,1,.85,.75,.65,.55,.5];
function tryHit(att,def,hb,d){if(def.inv>0||['down','ko','rise','grabbed'].includes(def.state)||F.phase!=='play')return false;
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
  if(d.tag!=='super'){att.meter=Math.min(100,att.meter+(canBlock?3:d.heavy?10:7));def.meter=Math.min(100,def.meter+(canBlock?2:5))}
  if(canBlock){def.state='block';def.st=0;def.stun=d.bs;def.vx=push*Math.max(1.5,d.kb);if(A.enforcer)def.meter=Math.min(100,def.meter+6);else def.hp=Math.max(1,def.hp-(d.chip||0));F.hitstop=4;SFX.block();sparks(cx,cy,'#7ac8ff',6);
    if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*1.6;return'block'}
  let dmg=d.dmg*att.c.power/def.c.def*(att.buff>0?1.25:1);if(att.cpu)dmg*=[0.75,0.95,1.1][SET.diff];
  const inCombo=(def.state==='hurt'&&def.stun>0)||def.state==='knock';
  if(inCombo)att.combo++;else att.combo=1;att.comboT=60;if(att.combo>=2)addCombo(att);
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
  else{def.state='hurt';def.st=0;def.stun=d.stun;def.vx=push*d.kb}
  if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*d.kb*0.7;
  F.hitstop=d.heavy?10:6;F.shake=d.heavy?5:2;sparks(cx,cy,'#ffe66a',d.heavy?14:8);F.hitFx.push({x:cx,y:cy,l:8,big:!!d.heavy});(d.heavy||d.dmg>=7?SFX.heavy:SFX.hit)();
  if(!att.cpu&&navigator.vibrate)try{navigator.vibrate(d.heavy?40:18)}catch(e){}
  return'hit'}
function updateF(f,o){f.st++;if(f.buff>0){f.buff--;if(frameNo%4===0)F.parts.push({x:f.x+rnd(-14,14),y:GY-f.y-rnd(4,f.H),vx:0,vy:-.6,l:16,c:Math.random()<.5?'#ffd23a':'#fff3a0',g:0})}if(f.spCD>0)f.spCD--;if(f.spCD2>0)f.spCD2--;if(f.spCD3>0)f.spCD3--;if(f.cuffed>0)f.cuffed--;if(f.zap>0){f.zap--;if(f.zap%3===0)F.parts.push({x:f.x+rnd(-12,12),y:GY-f.y-rnd(8,f.H),vx:rnd(-1,1),vy:rnd(-1,1),l:8,c:Math.random()<.5?'#fff':'#7ad8ff',g:0})}if(f.throwInv>0)f.throwInv--;
  if(!(f.state==='special'&&f.sp&&f.sp.kind==='replay')){(f.rh||(f.rh=[])).push({x:f.x,hp:f.hp});if(f.rh.length>100)f.rh.shift()}if(f.flash>0)f.flash--;if(f.inv>0)f.inv--;if(f.comboT>0&&--f.comboT===0)f.combo=0;
  f.trail=f.trail>f.hp?Math.max(f.hp,f.trail-0.4):f.hp;f.ghosts.forEach(g=>g.l--);f.ghosts=f.ghosts.filter(g=>g.l>0);
  switch(f.state){
    case'prejump':if(f.st>=3){f.state='jump';f.st=0;f.vy=5.4*f.c.jump;f.vx=f.jdir*f.face*1.8*f.c.speed;SFX.jump()}break;
    case'jump':if(f.atk){f.ast++;if(phaseOf(f)==='active'&&!f.hitDone){const a=f.atk,cy=f.y+f.H*a.hy;if(tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:cy-a.hh/2,y2:cy+a.hh/2},{...a,heavy:false}))f.hitDone=true}}break;
    case'land':f.vx=0;if(f.st>=5)setS(f,'idle');break;
    case'dash':f.vx*=0.88;if(f.st>=(f.dashDir>0?13:15)){f.vx=0;setS(f,'idle')}break;
    case'attack':{const a=f.atk,ph=phaseOf(f);if(ph==='active'&&!f.hitDone){const h=f.H*(a.crouch?.7:1),cy=f.y+h*a.hy;
        if(tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:cy-a.hh/2,y2:cy+a.hh/2},a))f.hitDone=true}
      f.vx*=.75;if(f.st>=a.s+a.a+a.r){f.atk=null;f.state=a.crouch&&f.holdDown?'crouch':'idle';f.st=0;if(f.state==='idle')f.crouch=false}}break;
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
  if(f.state!=='grabbed'&&f.state!=='slamming'&&!(f.state==='special'&&f.sp&&(f.sp.kind==='spin'||f.sp.kind==='rising'))){
    if(f.y>0||f.vy!==0){f.vy-=GRAV;f.y+=f.vy}
    if(f.y<=0&&f.vy<=0&&(f.state==='jump'||f.state==='knock'||f.vy<0)){f.y=0;f.vy=0;
      if(f.state==='jump'){f.state='land';f.st=0;f.dj=0;f.atk=null;SFX.land();dust(f.x,4)}
      else if(f.state==='knock'){f.state=f.ko?'ko':'down';f.st=0;f.jug=0;f.vx*=.4;F.shake=Math.max(F.shake,3);SFX.thud();dust(f.x,8)}}}
  if(f.state!=='grabbed')f.x=clamp(f.x+f.vx,XMIN,XMAX);
  if(['idle','walk','crouch','prejump','land'].includes(f.state)&&Math.abs(o.x-f.x)>3)f.face=o.x>f.x?1:-1}
const passing=f=>f.state==='special'&&f.sp&&(f.sp.kind==='step'||(f.sp.kind==='counter'&&f.sp.trig!=null));
function separate(a,b){if(a.state==='grabbed'||b.state==='grabbed'||a.state==='slamming'||b.state==='slamming'||passing(a)||passing(b))return;if(Math.abs(a.y-b.y)>a.H*.7)return;
  const minD=40,dx=b.x-a.x;if(Math.abs(dx)>=minD)return;const s=dx===0?a.face:Math.sign(dx),ov=(minD-Math.abs(dx))/2;
  a.x-=s*ov;b.x+=s*ov;if(a.x<XMIN){b.x+=XMIN-a.x;a.x=XMIN}if(a.x>XMAX){b.x-=a.x-XMAX;a.x=XMAX}if(b.x<XMIN){a.x+=XMIN-b.x;b.x=XMIN}if(b.x>XMAX){a.x-=b.x-XMAX;b.x=XMAX}}
function updateProj(){for(const p of F.proj){p.x+=p.vx;p.rot+=p.kind?p.vx*0.14:0.5;p.life--;const o=p.owner===F.p1?F.p2:F.p1;
    if(p.g){p.y+=p.vy;p.vy-=p.g;if(p.y<=4&&p.vy<0){p.life=0;dust(p.x,8);SFX.land();F.shake=Math.max(F.shake,2)}}
    const R2=p.kind?7:6,r=tryHit(p.owner,o,{x1:p.x-R2,x2:p.x+R2,y1:p.y-R2,y2:p.y+R2},{dmg:p.dmg||9,stun:p.stun||18,bs:12,kb:p.kb||2.4,lv:p.lv||'mid',chip:2,knock:!!p.knock,heavy:!!p.knock,tag:p.tag||'sp1',tid:p.id||(p.id=++atkId)});
    if(r==='block'&&p.kind==='ball'&&arch(p.owner.c).spare){p.owner.spCD=0;addText('SPARE!',p.owner.x,GY-p.owner.H-14,'#d04aff');SFX.ok()}
    if(r&&p.kind==='prong'){p.life=0;if(r==='hit'){o.zap=46;SFX.zap()}}
    else if(r){p.life=0;if(r==='hit'&&p.kind){SFX.thud();for(let i=0;i<6;i++)F.parts.push({x:p.x,y:GY-p.y,vx:rnd(-2,2),vy:rnd(-3,-1),l:rnd(12,20)|0,c:i%2?'#ffffff':'#e02a2a',g:.15})}}}
  if(F.proj.length===2&&Math.abs(F.proj[0].x-F.proj[1].x)<10&&Math.abs(F.proj[0].y-F.proj[1].y)<14){sparks(F.proj[0].x,GY-F.proj[0].y,'#fff',10);SFX.block();
    // HIGH/LOW ZONER trait: a bowling ball smashes through any other projectile
    F.proj.forEach(p=>{const other=F.proj.find(q=>q!==p);if(!(arch(p.owner.c).heavyBalls&&p.kind&&!(other&&other.kind)))p.life=0})}
  F.proj=F.proj.filter(p=>p.life>0&&p.x>-10&&p.x<W+10)}
// FX
function sparks(x,y,col,n){for(let i=0;i<n;i++){const a=rnd(0,Math.PI*2),v=rnd(1,3.2);F.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,l:rnd(10,20)|0,c:Math.random()<.5?'#fff':col,g:0.12})}}
function dust(x,n){for(let i=0;i<n;i++)F.parts.push({x:x+rnd(-12,12),y:GY-1,vx:rnd(-1,1),vy:rnd(-1,-.2),l:rnd(12,22)|0,c:'#d8cbb0',g:0.02,dust:1})}
function addText(s,x,y,c){F.texts.push({s,x:clamp(x,40,216),y,c,l:50})}
function addCombo(att){F.comboShow={side:att.side,n:att.combo,l:70}}

// AI
function aiInput(f,o){const inp={l:0,r:0,u:0,d:0,aP:0,bP:0,sp:0,sp2:0,sp3:0,sup:0},ai=f.ai,dist=Math.abs(o.x-f.x),tw=o.x>f.x?'r':'l',aw=tw==='r'?'l':'r';
  const L=clamp([0.15,0.45,0.75][SET.diff]+(RUN&&RUN.mode==='arcade'?RUN.idx*0.1:0),0,1);
  if(f.state==='grabbed'){if(o.state==='throwing'&&ai.tg!==o.thrId){ai.tg=o.thrId;ai.tech=Math.random()<lerp(.08,.6,L);ai.tdel=1+((Math.random()*7)|0)}
    if(ai.tech&&--ai.tdel===0)inp.aP=1;return inp}
  if(f.meter>=100&&f.state==='attack'&&f.hitDone&&cancelOk(f)&&o.state==='hurt'&&Math.random()<lerp(.2,.8,L)){inp.sup=1;return inp}
  // hit-confirm into a combo: chain/cancel when the last normal connected
  if(f.state==='attack'&&f.hitDone&&cancelOk(f)&&o.state==='hurt'){const n=f.atk.name;
    if(ai.cid!==f.atk.id){ai.cid=f.atk.id;ai.go=Math.random()<lerp(0.15,0.9,L)}
    if(ai.go){if(n==='jab'){if((f.chain||0)<1&&Math.random()<.35)inp.aP=1;else inp.bP=1}else if(n==='cjab'){inp.d=1;if(Math.random()<.5)inp.aP=1;else inp.bP=1}
      else if(n==='kick'&&f.spCD<=0&&f.c.special!=='slam')inp.sp=1}
    return inp}
  if(canAct(f)&&f.meter>=100&&Math.abs(o.x-f.x)<90&&o.state!=='jump'&&Math.random()<.004+.02*L){inp.sup=1;return inp}
  if(canAct(f)&&canThrow(f,o)&&Math.random()<(o.state==='crouch'||o.state==='idle'?.05:.02)*(0.4+L)){inp.bP=1;inp[o.x>f.x?'r':'l']=1;return inp}
  // second specials, each used for what it is good at
  const s2=f.c.special2,r2=Math.random();
  if(s2&&f.spCD2<=0&&canAct(f)){
    if(s2==='rising'&&o.state==='jump'&&dist<85&&o.vy<1.5&&r2<lerp(.06,.55,L)){inp.sp2=1;return inp}
    if(s2==='counter'&&o.state==='attack'&&phaseOf(o)==='start'&&dist<75&&r2<lerp(.03,.4,L)){inp.sp2=1;return inp}
    if(s2==='charge'&&dist>60&&dist<140&&o.state!=='jump'&&r2<.01+.025*L){inp.sp2=1;return inp}
    if(s2==='step'&&dist<70&&o.state!=='attack'&&r2<.006+.014*L){inp.sp2=1;return inp}
    if(s2==='replay'&&f.rh&&f.rh.length>=90&&f.rh[f.rh.length-90].hp-f.hp>12&&r2<.1){inp.sp2=1;return inp}
    if(f.c.special3==='laser'&&f.spCD3<=0&&dist>70&&o.state!=='crouch'&&o.state!=='jump'&&r2<.012+.02*L){inp.sp3=1;return inp}
    if(s2==='cuff'&&dist<55&&!['hurt','jump'].includes(o.state)&&r2<.03+.05*L){inp.sp2=1;return inp}
    if(s2==='powersuit'&&dist>100&&r2<.02){inp.sp2=1;return inp}
    if(s2==='split'&&dist>70&&dist<150&&(o.state==='crouch'||r2<.5)&&r2<.02+.04*L){inp.sp2=1;return inp}
    if(s2==='bless'&&dist>115&&f.hp<f.mhp*.8&&r2<.04){inp.sp2=1;return inp}}
  const oa=o.atk&&o.state==='attack'&&phaseOf(o)!=='rec'&&dist<o.atk.reach+22;
  const threat=oa||(o.state==='special'&&dist<(o.sp&&o.sp.kind==='flash'?135:90)&&o.sp&&!['shuriken','strike','split'].includes(o.sp.kind))||(o.state==='jump'&&dist<70&&o.vy<1)||F.proj.some(p=>p.owner===o&&Math.abs(p.x-f.x)<70&&Math.sign(p.vx)===Math.sign(f.x-p.x));
  const tid=(o.atk&&o.atk.id)||(o.sp&&o.sp.id)||(F.proj[0]&&'p')||'j'+Math.floor(frameNo/40);
  if(threat&&canAct(f)){if(ai.tid!==tid){ai.tid=tid;ai.block=Math.random()<lerp(0.15,0.82,L);ai.delay=Math.round(lerp(9,1,L))}
    if(ai.block){if(ai.delay>0)ai.delay--;else{inp[aw]=1;if((o.atk&&o.atk.lv==='low')||F.proj.some(p=>p.owner===o&&p.lv==='low'&&Math.abs(p.x-f.x)<90))inp.d=1;return inp}}}
  if(f.state==='jump'&&arch(f.c).dj&&!f.dj&&f.vy<1&&f.st>6&&Math.random()<.05){inp.u=1;inp[tw]=1;return inp}
  if(f.state==='jump'){if(!f.atk&&dist<60&&f.vy<1.5&&Math.random()<0.15+L*0.5)inp.bP=1;return inp}
  // punish / combo follow-up
  if(canAct(f)&&o.state==='hurt'&&dist<48&&Math.random()<L*0.35){Math.random()<.5?inp.aP=1:inp.bP=1;return inp}
  if(ai.dur>0){ai.dur--;const p=ai.plan;if(p==='walkF')inp[tw]=1;else if(p==='walkB')inp[aw]=1;else if(p==='guard'){inp[aw]=1}else if(p==='crouch')inp.d=1;return inp}
  if(!canAct(f))return inp;
  const r=Math.random(),sp=f.c.special,ready=f.spCD<=0,wait=Math.round(lerp(26,6,L)),plan=(p,d)=>{ai.plan=p;ai.dur=d};
  if(o.state==='down'||o.state==='rise'){if(dist>60)plan('walkF',10);else plan('guard',12);return inp}
  if(sp==='flash'&&ready&&dist>60&&dist<125&&r<.3){inp.sp=1;return inp}
  if(dist>110&&r<.07*(0.5+L)){inp.dash=1;return inp}
  if(dist<50&&o.state==='attack'&&r<.05*L){inp.dash=-1;return inp}
  if(sp==='taser'&&ready&&dist>50&&dist<115&&r<.06+.08*L){inp.sp=1;return inp}
  if(dist>100){if((sp==='shuriken'||sp==='strike')&&ready&&r<.4)inp.sp=1;else if(sp==='rush'&&ready&&dist<150&&r<.22)inp.sp=1;else if(r<.12){inp.u=1;inp[tw]=1}else plan('walkF',14+wait)}
  else if(dist>58){if(r<.32)plan('walkF',10+wait/2);else if(r<.46&&dist<62)inp.bP=1;else if(r<.58){inp.u=1;inp[tw]=1}else if(r<.66)plan('walkB',10);
    else if(ready&&r<.78&&sp!=='slam')inp.sp=1;else plan('guard',wait)}
  else{if(sp==='slam'&&ready&&r<.32*(0.5+L))inp.sp=1;else if(r<.28)inp.aP=1;else if(r<.48)inp.bP=1;else if(r<.6){inp.d=1;inp.bP=1}else if(r<.67){inp.d=1;inp.aP=1}
    else if(ready&&r<.74&&sp!=='shuriken')inp.sp=1;else if(r<.84)plan('walkB',12);else plan('guard',wait)}
  return inp}

// ---- FIGHT SCENE ----
function startFight(){const opp=RUN.ladder[RUN.idx];go(Fight,{p1:RUN.p1,p2:opp,stage:opp})}
const DUMMY=['STAND','BLOCK','LOW BLOCK','CROUCH'];
const Fight={enter(cfg){this.cfg=cfg;this.wins=[0,0];this.round=1;this.draws=0;this.meters=null;this.trial=null;F=this;stageMusic(cfg.stage);this.startRound()},
  startRound(){const c=this.cfg,m=RUN&&RUN.mode;this.two=m==='2p';this.training=m==='training'||m==='trials';this.trial=m==='trials'?(this.trial||{i:0,step:0,clear:0}):null;
    this.tDmg=0;this.tHits=0;this.tBest=this.tBest||0;this.inLog=[];
    const a1=!!(RUN&&RUN.alt&&RUN.alt[0]),a2=c.p1===c.p2?!a1:!!(RUN&&RUN.alt&&RUN.alt[1]);
    const k1=skinned(c.p1,0),k2=skinned(c.p2,1);this.p1=new Fighter(k1.skinKey||c.p1,0,false,a1);this.p2=new Fighter(k2.skinKey||c.p2,1,!this.two,c.p1===c.p2&&k1!==k2?false:a2);if(this.meters){this.p1.meter=this.meters[0];this.p2.meter=this.meters[1]}this.cine=null;this.proj=[];this.parts=[];this.texts=[];this.hitFx=[];
    this.time=60;this.tf=0;this.phase='intro';this.pt=0;this.hitstop=0;this.shake=0;this.slow=0;this.superFlash=0;this.camFlash=0;this.comboShow=null;this.paused=false;this.winner=-1;this.banner=null;
    const final=this.wins[0]===1&&this.wins[1]===1;setTimeout(()=>say(final?'Final round':`Round ${['one','two','three','four','five'][this.round-1]||this.round}`),200);SFX.bell()},
  onKO(att,def){if(this.phase!=='play')return;if(!att.cpu&&!this.training&&att.state==='special'&&att.sp&&att.sp.kind==='super')badge('super');this.phase='ko';this.pt=0;this.slow=50;this.koSide=att.side;SFX.ko();this.shake=8;say('K.O.!',0.9,0.5)},
  update(){
    if(this.paused){this.updatePause();return}
    if((pressed.start||(this.two&&pressed2.start))&&this.phase==='play'){this.paused=true;this.psel=0;SFX.ok();return}
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
    const pin=this.phase==='play'?{l:held.left,r:held.right,u:held.up,d:held.down,aP:pressed.a,bP:pressed.b,sp:0}:none;
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
  drawTrial(){const T=this.trial,seq=TRIALS[this.p1.c.id];box(18,26,220,24,'rgba(10,10,30,.8)','#3ae8ff');
    if(T.done){drawText('ALL TRIALS CLEAR!',128,34,'#fff',1,{align:'center',grad:FIRE,outline:'#200'});return}
    const st=seq[T.i];drawText(`TRIAL ${T.i+1}/${seq.length}`+(T.clear?'  CLEAR!':''),128,28,T.clear?'#7aff8a':'#ffe66a',1,{align:'center',shadow:false});
    const parts=st.map(k=>TNAME[k]||k),txt=parts.join(' > ');let x=128-textW(txt)/2;
    parts.forEach((w,i)=>{const done=T.clear||i<T.step;drawText(w,x,38,done?'#7aff8a':'#ffffff',1,{shadow:false});x+=textW(w)+6;if(i<parts.length-1){drawText('>',x,38,'#667',1,{shadow:false});x+=12}});
    drawText('SELECT: NEXT TRIAL',128,172,'#9ad',1,{align:'center',outline:'#000'})},
  endRound(w){if(this.phase==='done')return;this.phase='done';this.meters=[this.p1.meter,this.p2.meter];
    if(w>=0)this.wins[w]++;else if(++this.draws>=2){this.wins[1]=2;w=1}
    if(this.wins[0]>=2||this.wins[1]>=2){const pw=this.wins[0]>=2?0:1;goFade(()=>go(Result,pw,this.cfg));return}
    goFade(()=>{this.round++;this.startRound()})},
  updatePause(){if(pressed.up||pressed.down){this.psel^=1;SFX.move()}if(pressed.start||(pressed.a&&this.psel===0)||pressed.b){this.paused=false;SFX.back();return}
    if(pressed.a&&this.psel===1){this.paused=false;goFade(()=>{go(Title);Title.ph='menu'})}},
  draw(){const sh=this.shake,ox=sh?Math.round(rnd(-sh,sh)):0,oy=sh?Math.round(rnd(-sh,sh)):0;const c=CH[this.cfg.stage];
    ctx.save();ctx.translate(ox,oy);ctx.drawImage(c.stage,-4,-4,W+8,H+8);
    const g=ctx.createLinearGradient(0,0,0,40);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-4,-4,W+8,44);
    if(this.superFlash>0){ctx.fillStyle='rgba(0,0,20,.55)';ctx.fillRect(-4,-4,W+8,H+8)}
    for(const f of[this.p1,this.p2]){const s=Math.max(.35,1-f.y/110);ctx.fillStyle='rgba(0,0,0,.32)';ctx.beginPath();ctx.ellipse(f.x,GY+1,22*s,3.5*s,0,0,Math.PI*2);ctx.fill()}
    const order=(this.p2.state==='attack'||this.p2.state==='special'||this.p2.state==='slamming')?[this.p1,this.p2]:[this.p2,this.p1];
    order.forEach(drawFighter);
    for(const p of this.proj)p.kind==='prong'?drawProng(p):p.kind?drawBall(p):drawStar(p);
    for(const f of[this.p1,this.p2])if(f.cuffed>0)drawCuffs(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='flash'&&f.sp.lx!=null&&f.st<20)drawReticle(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='laser')drawLaser(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='bless'&&f.st>6){const a=Math.min(.35,(f.st-6)/40)*(f.st>70?(78-f.st)/8:1);
      const g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,'rgba(255,230,140,0)');g.addColorStop(1,`rgba(255,230,140,${a})`);ctx.fillStyle=g;ctx.fillRect(Math.round(f.x-22),0,44,GY)}
    for(const h of this.hitFx)drawHitFx(h);
    for(const p of this.parts){ctx.fillStyle=p.c;ctx.globalAlpha=p.dust?Math.min(1,p.l/12)*.7:1;const s=p.dust?3:2;ctx.fillRect(p.x|0,p.y|0,s,s)}ctx.globalAlpha=1;
    ctx.restore();
    CEL.draw();
    for(const t of this.texts){ctx.globalAlpha=Math.min(1,t.l/12);drawText(t.s,t.x,t.y,'#fff',1,{align:'center',grad:FIRE,outline:'#200'});ctx.globalAlpha=1}
    const rp=[this.p1,this.p2].find(f=>f.state==='special'&&f.sp&&f.sp.kind==='replay'&&f.st<22);
    if(rp){ctx.fillStyle='rgba(40,200,255,.08)';ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(0,0,0,.18)';for(let y=(frameNo*2)%4;y<H;y+=4)ctx.fillRect(0,y,W,1);
      const jy=(frameNo*7)%H;ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(0,jy,W,3);if((frameNo>>3)&1)drawText('<< REPLAY',rp.side?248:8,44,'#fff',1,{align:rp.side?'right':'left',outline:'#036'})}
    if(this.camFlash>0){ctx.fillStyle=`rgba(255,255,255,${Math.min(1,this.camFlash/5)})`;ctx.fillRect(0,0,W,H)}
    this.drawHUD();if(this.cine)this.drawCine();this.drawBanner();if(this.paused)this.drawPause()},
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
      if(f.c.special2){const cd=SPCD[f.c.special2]||90,fr=1-f.spCD2/cd,mw=Math.round(bw*fr),rdy=f.spCD2<=0;ctx.fillStyle='#000';ctx.fillRect(bx-1,by+9,bw+2,3);
        ctx.fillStyle=rdy?((frameNo>>3)&1?'#3ae8ff':'#bff6ff'):'#2a5a8a';i?ctx.fillRect(bx+bw-mw,by+10,mw,1):ctx.fillRect(bx,by+10,mw,1)}
      const ix=i?232:2;ctx.fillStyle='#ffd23a';ctx.fillRect(ix-1,3,24,24);ctx.imageSmoothingEnabled=true;
      if(i){ctx.save();ctx.translate(ix+22,4);ctx.scale(-1,1);ctx.drawImage(f.c.head,0,0,22,22);ctx.restore()}else ctx.drawImage(f.c.head,ix,4,22,22);ctx.imageSmoothingEnabled=false;
      drawText(f.c.name+(f.alt?' 2':''),i?bx+bw:bx,by+12,'#fff',1,{align:i?'right':'left',outline:'#000'});
      const nw=textW(f.c.name+(f.alt?' 2':''))+6,lo=nw+18>58;for(let k=0;k<this.wins[i];k++){const sx=lo?(i?bx+bw-6-k*9:bx+k*9):(i?bx+bw-nw-6-k*9:bx+nw+k*9);drawText('*',sx,by+(lo?22:12),'#ffd23a',1,{outline:'#000'})}});
    ctx.fillStyle='#000';ctx.fillRect(114,2,28,20);ctx.fillStyle='#ffd23a';ctx.fillRect(115,3,26,18);ctx.fillStyle='#1a1430';ctx.fillRect(116,4,24,16);
    drawText(String(Math.max(0,this.time)).padStart(2,'0'),128,6,this.time<=10?'#ff5a4a':'#fff',2,{align:'center',shadow:false});
    [this.p1,this.p2].forEach((f,i)=>{const w=66,x=i?W-6-w:6,y=185,full=f.meter>=100,mw=Math.round(w*f.meter/100);
      ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,w+2,6);ctx.fillStyle='#1a1638';ctx.fillRect(x,y,w,4);
      ctx.fillStyle=full?((frameNo>>2)&1?'#ffffff':'#ff4ad8'):'#b03adf';i?ctx.fillRect(x+w-mw,y,mw,4):ctx.fillRect(x,y,mw,4);
      drawText(full?'SUPER!':'SUPER',i?x-4:x+w+4,y-2,full?((frameNo>>3)&1?'#ffe66a':'#ff8ad8'):'#7a6aa0',1,{align:i?'right':'left',outline:'#000'});
      if(this.two)drawText(i?'2P':'1P',i?W-10:10,30,i?'#5ab4ff':'#ff5a5a',1,{align:i?'right':'left',outline:'#000'})});
    if(this.cinema){}else if(this.trial){this.drawTrial();this.drawInputs()}
    else if(this.training){this.drawInputs();box(60,26,136,14,'rgba(10,10,30,.75)','#3ae8ff');drawText(`HITS ${this.tHits}  DMG ${Math.round(this.tDmg)}  BEST ${this.tBest}`,128,29,'#fff',1,{align:'center',shadow:false});
      if(!this.cinema)drawText('SELECT: DUMMY '+(this.dummy||'STAND'),128,172,'#9ad',1,{align:'center',outline:'#000'})}
    if(this.comboShow){const c=this.comboShow,tr=this.training;const x=c.side?248:tr?36:8;drawText(c.n+' HITS!',x,tr?54:44,'#fff',1,{align:c.side?'right':'left',grad:FIRE,outline:'#300'})}},
  winText(w){return this.two?`P${w+1} WINS`:w===0?'YOU WIN':'YOU LOSE'},
  drawBanner(){const pt=this.pt;let s=null,sc=3,grad=FIRE;
    if(this.phase==='intro'){const fin=this.wins[0]===1&&this.wins[1]===1;if(pt<78)s=fin?'FINAL ROUND':'ROUND '+this.round;else s='FIGHT!';sc=pt<78?(fin?2:3):4}
    else if(this.phase==='ko'){if(pt<100)s='K.O.';else{const wf=this.koSide?this.p2:this.p1;s=wf.hp>=wf.mhp?'PERFECT!':this.winText(this.koSide);sc=s==='PERFECT!'?3:3}if(pt<100)sc=5}
    else if(this.phase==='time'){s=pt<80?'TIME OVER':this.winner<0?'DRAW GAME':this.winText(this.winner);sc=2}
    if(!s)return;if(this.phase==='ko'&&pt<100)grad=['#fff','#ffd0d0','#ff9a9a','#ff5a5a','#e02a2a','#b01a1a','#800'];
    let k=1;if(this.phase==='intro'){const lt=pt<78?pt:pt-78;k=lt<6?2-lt/6:1}
    const s2=Math.max(1,Math.round(sc*k));drawText(s,128,84-s2*3.5,'#fff',s2,{align:'center',grad,outline:'#200',ow:1})},
  drawPause(){ctx.fillStyle='rgba(0,0,10,.75)';ctx.fillRect(0,0,W,H);drawText('PAUSE',128,14,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});drawText('V'+VER,252,184,'#667',1,{align:'right',shadow:false});
    const c=this.p1.c;box(16,34,224,108);drawText('MOVES - '+c.name,128,38,'#ffe66a',1,{align:'center'});
    const m=[['PUNCH / KICK','A / B'],['LOW PUNCH / SWEEP','DOWN + A / B'],['JUMP ATTACK','UP, THEN A OR B'],['BLOCK','HOLD BACK'],['DASH','TAP FWD OR BACK TWICE'],[c.spName,'A+B OR DOWN,FWD+A'],...(c.sp2Name?[[c.sp2Name,'DN+A+B / DN,BK+B']]:[]),...(c.sp3Name?[[c.sp3Name,'BACK+A+B']]:[]),[SUPER_NAME[c.id],'FWD+A+B (FULL BAR)'],['THROW','FWD/BACK+B CLOSE'],...(arch(c).type?[[arch(c).type,arch(c).trait]]:[]),['COMBO',BNB[c.id]||'']];
    m.forEach(([k,v],i)=>{const y=45+i*8,cm=k==='COMBO';drawText(k,22,y,cm?'#ffe66a':'#ff9a6a',1,{shadow:false});drawText(v,234,y,cm?'#ffe66a':'#fff',1,{align:'right',shadow:false})});
    ['RESUME','QUIT TO TITLE'].forEach((s,i)=>drawText((this.psel===i?'> ':'  ')+s,128,148+i*12,this.psel===i?'#ffe66a':'#99a',1,{align:'center'}))}};

// ---- frame-animated fighters ----
// Key frames per animation: pk = frame where the strike lands; jump = [prep, rise, apex, fall, land];
// special = [[tick,frame],...] piecewise map over the move's own timeline. Per-fighter overrides in CH[id].ak.
const AK={punch:{pk:4},kick:{pk:4},sweep:{pk:4},lowkick:{pk:3},cpunch:{pk:2},airkick:{pk:2},airpunch:{pk:2},jump:{prep:2,rise:3,apex:5,fall:6,land:7},fall:{air:4},
  special:{rush:[[0,0],[7,3]],shuriken:[[0,0],[9,6],[18,8]],slam:[[0,0],[10,8]],spin:[[0,0],[40,99]],flash:[[0,0],[13,3],[14,4],[22,7],[32,8]],tome:[[0,0],[13,6],[14,7],[22,7],[34,8]],taser:[[0,0],[7,5],[8,6],[14,7],[30,8]],strike:[[0,0],[10,7],[28,8]],takeover:[[0,0],[5,2],[7,3],[11,4],[30,7]]}};
function akOf(c,k){const o=(c.ak&&c.ak[k])||AK[k],m=c.anim&&c.anim[k];return m&&m.pk!=null?{...o,pk:m.pk}:o}
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
    case'hurt':return A.hurt?P('hurt',Math.min(t/3,last('hurt'))):null;
    case'grabbed':return A.hurt?P('hurt',last('hurt')):null;
    case'throwing':{if(!A.punch)return null;const pk=akOf(f.c,'punch').pk;return P('punch',f.thr?pk:Math.min(t/1.4,last('punch')))}
    case'block':return A.block?P('block',Math.min(t,last('block'))):null;
    case'knock':{const fa=akOf(f.c,'fall');if(fa.hurtAir&&A.hurt)return P('hurt',last('hurt'));return A.fall?P('fall',Math.min(t/4,fa.air)):null}
    case'down':case'ko':return A.fall?P('fall',Math.min(akOf(f.c,'fall').air+(f.state==='ko'?t:t)/3,last('fall'))):null;
    case'rise':return A.fall?P('fall',last('fall')*(1-t/12)):null;
    case'win':return A.win?P('win',t<n('win')*7?t/7:last('win')-(Math.floor(t/12)%2)):P('idle',(frameNo/7)%n('idle'));
    case'special':{const s=f.sp;if(s&&s.kind==='super'){if(!s.hits)return A.walk?P('walk',Math.floor(t/1.4)%n('walk')):null;
        if(s.hits>=99)return P('idle',0);if(s.hits>=6)return A.special?P('special',last('special')):null;
        const k=s.hits%2?'kick':'punch';return A[k]?P(k,akOf(f.c,k).pk):null}
      if(s&&(s.two||s.kind==='laser')){const k=s.kind;
        if(k==='step'){if(!A.walk)return null;return t<4?(A.crouch?P('crouch',2):P('idle',0)):P('walk',Math.floor(t/1.5)%n('walk'))}
        if(k==='counter'){if(s.trig==null)return A.block?P('block',Math.min(t,last('block'))):null;const kk=t-s.trig;return A.kick?P('kick',kf(kk,[[0,1],[7,4],[16,5],[24,7]])):null}
        if(k==='charge')return A.special?P('special',t<8?t/8*5:t<30?7+((t>>2)&1):8):null;
        if(k==='rising'){const a=A.airkick?'airkick':'kick';return A[a]?P(a,kf(t,[[0,0],[4,2],[14,last(a)],[26,last(a)]])):null}
        if(k==='replay')return P('idle',last('idle')-(Math.floor(t/1.5)%n('idle')));
        if(k==='cuff')return A.special2?P('special2',kf(t,[[0,0],[4,2],[12,5],[34,last('special2')]])):null;
        if(k==='laser'){const a=A.special3?'special3':A.special2?'special2':null;return a?P(a,a==='special3'?kf(t,[[0,0],[11,5],[12,6],[16,7],[24,8],[34,4]]):kf(t,[[0,0],[12,Math.min(5,last(a))],[34,last(a)]])):null}
        if(k==='powersuit')return A.special2?P('special2',kf(t,[[0,0],[30,last('special2')]])):null;
        if(k==='split')return A.special2?P('special2',kf(t,[[0,0],[12,6],[32,last('special2')]])):null;
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
  const c=f.c,a=c.anim[P.k],fr=a.fr[P.i],fc=f.face,t=f.st;let img=f.alt?altOf(fr):fr;if(f.flash>0&&(f.flash&1)&&!F.cinema)img=sil(fr,'#ffffff');
  let rot=0,pivotC=false,ox=0;if(f.state==='grabbed'){rot=f.rot||0;pivotC=true}if(f.state==='hurt'&&t<6)ox=-fc*2+(t&1?1:-1);
  const B=(im,x,y)=>blitA(im,x,y,fc,a.ax,a.ay,rot,pivotC,ox,0,f.H);
  for(const g of f.ghosts){ctx.globalAlpha=g.l/20;B(sil(fr,c.col.aura),g.x,g.y);ctx.globalAlpha=1}
  if(f.state==='special'&&t<10||F.superFlash>0&&F.superBy===f){const p=(frameNo&2)?2:1;ctx.globalAlpha=.6;for(const[dx,dy]of[[-p,0],[p,0],[0,-p]])B(sil(fr,c.col.aura),f.x+dx,f.y-dy);ctx.globalAlpha=1}
  if(f.inv>0&&f.state!=='down'&&(frameNo&2))ctx.globalAlpha=.55;
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
function drawBall(p){const x=Math.round(p.x),y=Math.round(GY-p.y),r=6;
  if(p.kind==='ball'){ctx.fillStyle='rgba(208,74,255,.35)';ctx.fillRect(x-p.vx*4-3,y+2,5,1);ctx.fillRect(x-p.vx*6-2,y-1,3,1)}
  ctx.fillStyle='#120e1e';ctx.beginPath();ctx.arc(x,y,r+1,0,Math.PI*2);ctx.fill();ctx.fillStyle='#7a1a8a';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#b03ad0';ctx.beginPath();ctx.arc(x-1,y-1,r-2,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffd0ff';ctx.fillRect(x-3,y-4,2,2);
  ctx.fillStyle='#120e1e';for(let i=0;i<3;i++){const a=p.rot+i*0.55;ctx.fillRect(Math.round(x+Math.cos(a)*3)-1,Math.round(y+Math.sin(a)*3)-1,2,2)}}
function drawStar(p){const x=Math.round(p.x),y=Math.round(GY-p.y);ctx.save();ctx.translate(x,y);ctx.rotate(p.rot);ctx.fillStyle='#120e1e';ctx.fillRect(-8,-2,16,4);ctx.fillRect(-2,-8,4,16);
  ctx.fillStyle='#c8c8e0';ctx.fillRect(-7,-1,14,2);ctx.fillRect(-1,-7,2,14);ctx.fillStyle='#fff';ctx.fillRect(-2,-2,4,4);ctx.fillStyle='#120e1e';ctx.fillRect(-1,-1,2,2);ctx.restore();
  ctx.fillStyle='rgba(180,140,255,.5)';ctx.fillRect(x-p.vx*3-4,y,6,1);ctx.fillRect(x-p.vx*5-3,y-2,4,1)}
function drawLaser(f){const s=f.sp,t=f.st,ex=Math.round(f.x+f.face*9),ey=Math.round(GY-f.y-f.H*.86);
  if(t>=4&&t<12){const r=1+((t>>1)&1);ctx.fillStyle='#ff3a3a';ctx.fillRect(ex-r,ey-r-1,r*2,r);ctx.fillRect(ex-r-4*f.face,ey-r-1,r*2,r);ctx.fillStyle='#fff';ctx.fillRect(ex,ey-1,1,1)}
  if(t<12||t>=26||s.end==null)return;const x2=Math.round(s.end),a=t<24?1:(26-t)/2,w=t<14||t>21?3:5;ctx.globalAlpha=a;
  const x0=Math.min(ex,x2),len=Math.abs(x2-ex);
  ctx.fillStyle='rgba(255,40,60,.35)';ctx.fillRect(x0,ey-w-2,len,w*2+3);ctx.fillStyle='#ff2a3a';ctx.fillRect(x0,ey-Math.ceil(w/2)-1,len,w);ctx.fillStyle='#ffd0d0';ctx.fillRect(x0,ey-1,len,2);
  if(len<W-4){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x2,ey,3+((frameNo>>1)&1)*2,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}
function drawReticle(f){const t=f.st,x=Math.round(f.sp.lx),y=Math.round(GY-f.H*.55),r=Math.round(t<14?lerp(34,14,Math.min(1,(t-4)/8)):14+(t-14)*2),c=t<14?'#3ae8ff':'#ffffff',L=6;
  ctx.globalAlpha=t<14?1:Math.max(0,1-(t-14)/6);ctx.fillStyle='#062030';
  for(const[sx,sy]of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.fillRect(x+sx*r-(sx>0?L:0)-1,y+sy*r-1,L+2,3);ctx.fillRect(x+sx*r-1,y+sy*r-(sy>0?L:0)-1,3,L+2)}
  ctx.fillStyle=c;for(const[sx,sy]of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.fillRect(x+sx*r-(sx>0?L:0),y+sy*r,L,1);ctx.fillRect(x+sx*r,y+sy*r-(sy>0?L:0),1,L)}
  if((frameNo>>2)&1&&t<14){ctx.fillRect(x-1,y,3,1);ctx.fillRect(x,y-1,1,3)}ctx.globalAlpha=1}
function drawHitFx(h){const r=(8-h.l)*(h.big?3:2)+3;ctx.strokeStyle=h.l>4?'#fff':'#ffd23a';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4+0.3;ctx.moveTo(h.x+Math.cos(a)*r*0.4,h.y+Math.sin(a)*r*0.4);ctx.lineTo(h.x+Math.cos(a)*r,h.y+Math.sin(a)*r)}ctx.stroke();
  if(h.l>5){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(h.x,h.y,r*0.35,0,Math.PI*2);ctx.fill()}}

// ---------------- RESULT / CONTINUE / ENDING ----------------
const Result={enter(w,cfg){this.w=w;this.cfg=cfg;this.two=RUN.mode==='2p';this.win=this.two||w===0;this.wc=w===0?skinned(cfg.p1,0):skinned(cfg.p2,1);this.lc=w===0?skinned(cfg.p2,1):skinned(cfg.p1,0);
    playMusic(this.win?'win':'lose');setTimeout(()=>{say(this.two?`Player ${w?'two':'one'} wins`:this.win?'You win!':'You lose');playVoice(this.lc.id+'_ko','f1',1.2)},300);if(this.win)CEL.start(1.2);
    if(this.two)RUN.score[w]++;else{const r=rc(cfg.p1);if(w===0){r.w++;badge('first')}else r.l++;saveRec()}
    this.menu=(RUN.mode==='vs'||this.two)?['REMATCH','CHARACTER SELECT','MAIN MENU']:null;this.sel=0},
  update(){if(this.t<=50)return;
    if(this.menu){const n=this.menu.length;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
      if(pressed.a||pressed.start||(this.two&&(pressed2.a||pressed2.start)&&this.sel===0)){SFX.ok();const k=this.menu[this.sel];
        goFade(()=>{if(k==='REMATCH')startFight();else if(k==='CHARACTER SELECT')go(Select,RUN.mode);else{go(Title);Title.ph='menu'}})}return}
    if(pressed.a||pressed.start){SFX.ok();goFade(()=>this.next())}},
  next(){if(RUN.mode!=='arcade'){go(Select,RUN.mode);return}if(this.win){RUN.idx++;if(RUN.idx>=RUN.ladder.length)go(Ending);else go(VS)}else go(Continue)},
  draw(){const t=this.t,c=this.wc;ctx.drawImage(CH[this.cfg.stage].stage,0,0);ctx.fillStyle='rgba(6,4,20,.7)';ctx.fillRect(0,0,W,H);
    if(this.win){ctx.fillStyle='rgba(255,210,58,.07)';for(let i=0;i<12;i++){const a=t*0.006+i*Math.PI/6;ctx.beginPath();ctx.moveTo(56,120);ctx.lineTo(56+Math.cos(a)*300,120+Math.sin(a)*300);ctx.lineTo(56+Math.cos(a+0.14)*300,120+Math.sin(a+0.14)*300);ctx.fill()}}
    const p=Math.min(1,t/16),img=c.por;ctx.drawImage(img,Math.round(-40+40*p)-6,H-img.height);
    if(this.win)CEL.draw();
    const bob=this.win?Math.round(Math.abs(Math.sin(t*.09))*-4):0;
    drawText(this.two?`P${this.w+1} WINS!`:this.win?'YOU WIN!':'YOU LOSE',186,16+bob,'#fff',2,{align:'center',grad:this.win?FIRE:ICE,outline:'#200'});
    if(this.two)drawText(`P1  ${RUN.score[0]} - ${RUN.score[1]}  P2`,186,32,'#fff',1,{align:'center',outline:'#000'});
    box(118,40,132,94);ctx.drawImage(c.logo,0,0,c.logo.width,c.logo.height,124,44,70,Math.round(c.logo.height*70/c.logo.width));
    const lines=wrap('"'+c.quote+'"',20),n=Math.min(lines.join('').length,Math.floor(t*1.2));let k=0;
    lines.forEach((l,i)=>{const s=l.slice(0,Math.max(0,n-k));k+=l.length;drawText(s,124,74+i*10,'#fff',1,{shadow:false})});
    if(this.menu){if(t>50){box(118,140,132,38);this.menu.forEach((m,i)=>drawText((i===this.sel?'> ':'  ')+m,124,145+i*11,i===this.sel?'#ffe66a':'#aab',1,{shadow:false}))}}
    else if(t>50&&(t>>4)&1)drawText('PRESS A',184,170,'#ffe66a',1,{align:'center',outline:'#000'})}};
// ---------------- RECORDS ----------------
const Records={enter(){playMusic('select')},
  update(){if(pressed.b||pressed.a||pressed.start){SFX.back();go(Title);Title.ph='menu';Title.sel=Title.items.indexOf('RECORDS')}},
  draw(){stripes(this.t,'#120f30','#191540');drawText('RECORDS',128,6,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
    box(8,24,240,96);['FIGHTER','W-L','BEST','TRIALS'].forEach((h,i)=>drawText(h,[30,128,170,214][i],27,'#99a',1,{align:i?'center':'left',shadow:false}));
    ORDER.forEach((id,i)=>{const r=rc(id),y=35+i*9,c=CH[id];ctx.imageSmoothingEnabled=true;ctx.drawImage(c.head,12,y-1,8,8);ctx.imageSmoothingEnabled=false;
      drawText(c.name,27,y+1,'#fff',1,{shadow:false});if(r.clear)drawText('*',96,y+1,'#ffd23a',1,{shadow:false});
      drawText(`${r.w}-${r.l}`,128,y+1,'#fff',1,{align:'center',shadow:false});drawText(r.combo?r.combo+(r.combo>1?' HITS':' HIT'):'-',170,y+1,'#fff',1,{align:'center',shadow:false});
      const tr=REC.trials[id]||0;drawText(`${tr}/${TRIALS[id].length}`,214,y+1,tr>=TRIALS[id].length?'#7aff8a':'#fff',1,{align:'center',shadow:false})});
    const got=BADGES.filter(b=>REC.badges[b[0]]).length;drawText(`BADGES ${got}/${BADGES.length}`,128,124,'#ffe66a',1,{align:'center'});
    BADGES.forEach((b,i)=>{const on=REC.badges[b[0]],x=i%2?132:10,y=133+Math.floor(i/2)*9;drawText((on?'# ':'- ')+b[1],x,y,on?'#ffd23a':'#55607a',1,{shadow:false})});
    drawText('* = ARCADE CLEARED: NEW COLOR    B: BACK',128,182,'#8a86a8',1,{align:'center',shadow:false})}};
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
  update(){if(this.t>520&&anyPress())goFade(()=>go(Title),0.05)},
  draw(){const t=this.t,c=this.c;stripes(t,'#2a1206','#341808');ctx.fillStyle='rgba(255,210,58,.08)';for(let i=0;i<12;i++){const a=t*0.004+i*Math.PI/6;ctx.beginPath();ctx.moveTo(60,110);ctx.lineTo(60+Math.cos(a)*300,110+Math.sin(a)*300);ctx.lineTo(60+Math.cos(a+0.15)*300,110+Math.sin(a+0.15)*300);ctx.fill()}
    ctx.drawImage(c.por,0,H-c.por.height);CEL.draw();
    const L=['CONGRATULATIONS!','',c.name,...(c.nick?['"'+c.nick+'"']:[]),'','IS THE NEW','BONFIRE BASH','CHAMPION!','',...wrap(ENDING[c.id]||'',22),'','NEW COLOR UNLOCKED!','','THANKS FOR PLAYING','','A GAME BY MARK','','BUILT WITH CLAUDE','','SEE YOU NEXT FIGHT!'];
    const y0=Math.max(20,H-t*0.45);L.forEach((s,i)=>{const y=y0+i*12;if(y>-10&&y<H)drawText(s,190,y,'#fff',1,{align:'center',grad:i<8?FIRE:null,outline:'#200'})});
    if(t>520&&(t>>4)&1)drawText('PRESS START',190,182,'#fff',1,{align:'center',outline:'#000'})}};

// ---------------- MAIN LOOP ----------------
let ASSETS_READY=false;
function step(){pollInput();frameNo++;CEL.update();if(TOAST&&--TOAST.l<=0)TOAST=null;
  if(fade.dir===1){fade.a+=fade.spd;if(fade.a>=1){fade.a=1;const cb=fade.cb;fade.cb=null;fade.dir=-1;cb&&cb()}return}
  if(fade.dir===-1){fade.a-=fade.spd;if(fade.a<=0){fade.a=0;fade.dir=0}}
  if(scene.update)scene.update();scene.t++}
function drawToast(){if(!TOAST)return;const a=Math.max(0,Math.min(1,TOAST.l/20,(170-TOAST.l)/10));ctx.globalAlpha=a;box(52,150,152,22,'rgba(30,20,0,.9)','#ffd23a');
  drawText('BADGE UNLOCKED',128,153,'#ffd23a',1,{align:'center',shadow:false});drawText(TOAST.s,128,162,'#fff',1,{align:'center',shadow:false});ctx.globalAlpha=1}
function render(){ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;scene.draw();drawToast();if(fade.a>0){ctx.fillStyle=`rgba(0,0,0,${fade.a})`;ctx.fillRect(0,0,W,H)}}
let last=performance.now(),acc=0;
function loop(now){requestAnimationFrame(loop);acc+=Math.min(100,now-last);last=now;let n=0;while(acc>=1000/60&&n<4){step();acc-=1000/60;n++}if(n>=4)acc=0;render();musicTick()}
go(Power);requestAnimationFrame(loop);
loadAssets().then(()=>{ASSETS_READY=true});
window.__dbg={ORDER,Intro,BADGE_KEYS:BADGES.map(b=>b[0]),vox:VOX,rec:REC,inp2:{held2,pressed2},setTwo,Records,startThrow,canThrow,track:TRACK,mus:MUS,inp:{held,pressed},tick:()=>{frameNo++},startSpecial,startAtk,applyHit,get scene(){return scene},get F(){return F},go,Fight,Title,Select,VS,Result,Ending,Continue,set RUN(v){RUN=v},get RUN(){return RUN},CH};

