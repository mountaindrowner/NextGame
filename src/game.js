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
  ['hard','IRON WILL','CLEAR ARCADE ON HARD'],['trials','STUDENT','CLEAR A FIGHTER\'S TRIALS'],['allclear','WORLD CHAMPION','CLEAR ARCADE WITH EVERYONE'],['story','REDEEMED','CLEAR STORY MODE']];
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
const KEYS=['up','down','left','right','a','b','start','select','tap','jump','dl','dr'];
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
}
const anyPress=()=>pressed.start||pressed.a||pressed.tap;
const els={dpad:$('dpad'),A:$('bA'),B:$('bB'),SP:$('bSp'),J:$('bJ'),sel:$('bSel'),sta:$('bSta')};
let TOUCHY=false;
const STICK={dx:0,dy:0,on:false};// where the thumb is on the stick (for the knob)
// which control scheme the stick uses: 'fight' (zones, the far edge dashes), 'brawl' (story mode: 8-way, up/down move in depth), 'menu'
function stickMode(){return typeof scene!=='undefined'&&scene===Fight&&F&&!F.cinema?'fight':typeof scene!=='undefined'&&scene===Brawl?'brawl':'menu'}// last input came from a touch screen: buttons get a longer buffer and A+B window
function hitTest(x,y,out){
  const q=cv.getBoundingClientRect();if(x>q.left&&x<q.right&&y>q.top&&y<q.bottom){out.tap=true;return}
  const r=els.dpad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=x-cx,dy=y-cy,R=r.width/2,d=Math.hypot(dx,dy);
  const fight=stickMode()==='fight';
  if(d<R*(fight?1.75:1.4)){STICK.dx=dx/R;STICK.dy=dy/R;STICK.on=true;
    if(fight){// FIGHT ZONES (like mobile Street Fighter IV): wide left/right bands walk (back = block), the far edge dashes,
      // up jumps, down crouches (down-back = crouch block), narrow diagonals between them
      if(d>R*0.2){const a=Math.atan2(dy,dx)*180/Math.PI,h=Math.abs(a)<=32||Math.abs(a)>=148,up=a<-32&&a>-148,dn=a>32&&a<148;
        if(h){const k=Math.abs(a)<=32?'right':'left';out[k]=true;if(d>R*0.95)out[k==='right'?'dr':'dl']=true}
        else{if(up)out.up=true;if(dn)out.down=true;if(Math.abs(a)<58||Math.abs(a)>122)out[Math.abs(a)<90?'right':'left']=true}}}
    else if(d>R*0.15){const sec=Math.round(Math.atan2(dy,dx)/(Math.PI/4));
    ({0:['right'],1:['right','down'],2:['down'],3:['down','left'],4:['left'],'-4':['left'],'-3':['up','left'],'-2':['up'],'-1':['up','right']})[sec].forEach(k=>out[k]=true)}return}
  {let best=null,bd=1e9;for(const[el,k]of[[els.A,'a'],[els.B,'b'],[els.SP,'sp'],[els.J,'jump']]){if(!el)continue;const p=el.getBoundingClientRect(),R=p.width/2,dd=Math.hypot(x-p.left-R,y-p.top-R);if(dd<R*1.35&&dd<bd){bd=dd;best=k}}
    if(best){if(best==='sp'){out.a=out.b=true;out.sp=true}else out[best]=true;return}}
  for(const[el,k]of[[els.sel,'select'],[els.sta,'start']]){const p=el.getBoundingClientRect();if(x>p.left-14&&x<p.right+14&&y>p.top-16&&y<p.bottom+16){out[k]=true;return}}
}
function applyPointer(store,out){store.sp=!!out.sp;for(const k of KEYS){if(out[k]&&!store[k]){latch[k]=true;if(k!=='tap'&&navigator.vibrate)try{navigator.vibrate(6)}catch(e){}}store[k]=!!out[k]}updateVis()}
function onTouch(e){e.preventDefault();unlockAudio();TOUCHY=true;STICK.on=false;const out={};for(const t of e.touches)hitTest(t.clientX,t.clientY,out);applyPointer(touchHeld,out)}
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
  els.dpad.className='btn mode-'+stickMode()+(h('up')?' u':'')+(h('down')?' d':'')+(h('left')?' l':'')+(h('right')?' r':'')+(h('dl')||h('dr')?' dash':'');
  if(els.J){const b=els.J.querySelector('b'),w=stickMode()==='fight'?'FOCUS':'JUMP';if(b&&b.textContent!==w)b.textContent=w}
  {const kb=els.dpad.querySelector('.knob');if(kb){const on=STICK.on&&touchHeld&&Object.values(touchHeld).some(Boolean),m=Math.hypot(STICK.dx,STICK.dy),c=m>.7?.7/m:1;kb.style.transform=on?`translate(${STICK.dx*c*156}%,${STICK.dy*c*156}%)`:'translate(0,0)'}}
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
  sing:i=>{const f=[523,659,784,988,1175][i%5];T('sine',f,.6,.14);T('triangle',f*2,.45,.05,null,.02);T('sine',f*1.5,.5,.05,null,.05);N(.25,.07,3000,6000,'bandpass')},
  finale:()=>{[523,659,784,1047,1319,1568].forEach((f,i)=>T('sine',f,1.7,.1,null,i*.04));T('triangle',262,1.9,.16);T('sawtooth',131,.9,.06,262);N(1,.25,400,7000,'bandpass')},
  pew:()=>{T('square',1760,.06,.08,700);N(.06,.12,8000,3000,'highpass')},
  focus:()=>{T('sawtooth',110,.25,.1,240);N(.2,.14,700,3000,'bandpass')},
  sparkle:()=>{[2093,2637,3136,4186].forEach((f,i)=>T('triangle',f,.12,.05,null,i*.04))},
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
    speed:1.25,power:1.0,def:1.0,jump:1.0,stats:[5,3,3],special:'rush',spName:'LÉGUA RUSH',special2:'step',sp2Name:'LÉGUA STEP',skin2:'karl2',skinName:'WHITE GI',tr:0,
    col:{skin:'#e0965c',glove:'#2c2a44',leg:'#e9e7f3',foot:'#f6f6f6',aura:'#ffd23a'},sh:.72,hip:.5,
    quote:"TOO SLOW! THEY DON'T CALL ME PAPA-LÉGUAS FOR NOTHING!",lose:'I RAN OUT OF ROAD...',stageName:'CROSSROADS DOJO'},
  // Ivan isn't on the roster (not in ORDER): he's Vex's enforcer, the boss of the Docks in story mode
  ivan:{id:'ivan',name:'IVAN',nick:'THE BEAR',style:'SAMBO',country:'RUSSIA',flag:'ru',ht:"6'2\" (188 CM)",wt:'215 LB (98 KG)',
    speed:0.82,power:1.3,def:1.1,jump:0.88,stats:[2,5,4],special:'slam',spName:'BEAR SLAM',special2:'charge',sp2Name:'IRON CHARGE',tr:-5,
    col:{skin:'#e3a272',glove:'#2e2f4a',leg:'#2b3168',foot:'#2c3a8a',aura:'#ff4a3a'},sh:.75,hip:.5,
    quote:'IN MY GYM, THE FLOOR IS MY FRIEND. SAY HELLO TO IT.',lose:'NEXT TIME... I BRING BIGGER BEAR.',stageName:'IRON GYM'},
  vizor:{id:'vizor',name:'VIZOR',nick:'THE WATCHER',style:'TECH BRAWLER',country:'UNKNOWN',countryLabel:'ORIGIN',flag:'unk',ht:"5'11\" (180 CM)",wt:'190 LB (86 KG)',
    speed:1.04,power:1.134,def:1.0,jump:1.0,stats:[3,4,4],special:'flash',spName:'SHUTTER FLASH',special2:'replay',sp2Name:'INSTANT REPLAY',tr:1,
    col:{skin:'#c98a5e',glove:'#25232f',leg:'#3d5a96',foot:'#f0f0f0',aura:'#3ae8ff'},sh:.72,hip:.5,
    quote:"SMILE. YOU'RE ON CAMERA... AND YOU JUST GOT CAPTURED.",lose:'SIGNAL... LOST.',stageName:'CONTROL ROOM'},
  padre:{id:'padre',name:'SAMSON',nick:'THE SHEPHERD',style:'SACRED BOXING',country:'THE PARISH',countryLabel:'ORIGIN',flag:'cross',ht:"5'10\" (178 CM)",wt:'185 LB (84 KG)',
    speed:0.94,power:1.12,def:1.08,jump:0.95,stats:[2,5,4],special:'tome',spName:'HOLY TOME',special2:'bless',sp2Name:'BENEDICTION',tr:-2,skin2:'padreteen2',skinName:'TEEN ROCKER',
    col:{skin:'#d89a6a',glove:'#1c1a24',leg:'#24222e',foot:'#1a1820',aura:'#ffd96a'},sh:.72,hip:.5,
    quote:'THE LORD IS MY SHEPHERD. YOU, MY SON, ARE A LOST SHEEP.',lose:'FORGIVE ME... I GOT CARRIED AWAY.',stageName:'OLD CHAPEL'},
  zeke:{id:'zeke',name:'ZEKE',nick:'THE STRIKE',style:'BOWLING BRAWLER',country:'THE LANES',countryLabel:'ORIGIN',flag:'pin',ht:"5'9\" (175 CM)",wt:'205 LB (93 KG)',
    speed:0.96,power:1.1,def:1.05,jump:0.95,stats:[3,4,4],special:'strike',spName:'STRIKE BALL',special2:'split',sp2Name:'SPLIT SHOT',tr:1,skin2:'zekeidol',skinName:'IDOL ZEKE',
    col:{skin:'#c98a5e',glove:'#1c1a24',leg:'#24222e',foot:'#f0f0f0',aura:'#d04aff'},sh:.72,hip:.5,
    quote:"THAT'S A STRIKE! YOU WERE ALWAYS JUST ONE MORE PIN TO ME.",lose:'GUTTER BALL...',stageName:'STRIKE LANES'},
  hecky:{id:'hecky',name:'HECKY XAVIER',nick:'THE CLOSER',style:'DAPPER BOXING',country:'PENTHOUSE',countryLabel:'ORIGIN',flag:'tie',ht:"5'10\" (178 CM)",wt:'160 LB (73 KG)',
    speed:1.12,power:1.0,def:0.98,jump:1.02,stats:[4,3,3],special:'takeover',spName:'HOSTILE TAKEOVER',special2:'powersuit',sp2Name:'POWER SUIT',special3:'laser',sp3Name:'LASER GLARE',tr:2,skin2:'heckyfox',skinName:'FOX SKIN',
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
    speed:1.134,power:1.098,def:0.96,jump:1.12,stats:[4,3,3],special:'bounce',spName:'BOUNCE PASS',special2:'crossover',sp2Name:'ANKLE BREAKER',tr:0,
    col:{skin:'#e0a070',glove:'#1c1a24',leg:'#24202e',foot:'#f0f0f0',aura:'#ffb43a'},sh:.72,hip:.5,
    quote:"THAT'S GAME. YOU NEVER HAD A CHANCE ON MY COURT.",lose:'FOUL... THAT WAS A FOUL...',stageName:'STREET COURT'},
  keksan:{id:'keksan',name:'KEKSAN',nick:'THE TIGER',style:'MUAY THAI',country:'TIGER GYM',countryLabel:'GYM',flag:'tiger',ht:"5'10\" (178 CM)",wt:'172 LB (78 KG)',
    speed:1.02,power:1,def:1,jump:1,stats:[3,4,3],special:'knee',spName:'TIGER KNEE',special2:'clinch',sp2Name:'THAI CLINCH',special3:'teep',sp3Name:'TEEP',tr:0,
    col:{skin:'#c88a5a',glove:'#d02a2a',leg:'#1a1a22',foot:'#c88a5a',aura:'#ff3a3a'},sh:.72,hip:.5,
    quote:"RESPECT THE RING. THEN RESPECT THE TIGER.",lose:'MY GUARD... DROPPED...',stageName:'TIGER GYM'},
  estrella:{id:'estrella',name:'ESTRELLA',nick:'THE VOICE',style:'SHOWSTOPPER',country:'STARLIGHT CLUB',countryLabel:'STAGE',flag:'star',ht:"5'6\" (168 CM)",wt:'130 LB (59 KG)',
    speed:0.98,power:1.045,def:0.98,jump:1,stats:[3,3,3],special:'note',spName:'HIGH NOTE',special2:'encore',sp2Name:'ENCORE',special3:'siren',sp3Name:'SIREN SCREAM',tr:0,
    col:{skin:'#d8a070',glove:'#2a3ad0',leg:'#3a2a5a',foot:'#1a1a22',aura:'#ffd23a'},sh:.72,hip:.5,
    quote:"THAT'S A WRAP. YOU WERE A GREAT AUDIENCE.",lose:'MY VOICE... I LOST MY VOICE...',stageName:'STARLIGHT CLUB'},
  reyes:{id:'reyes',name:'REYES',nick:'THE SENTINEL',style:'SABR COMBAT',country:'SABR OUTPOST',countryLabel:'POST',flag:'sabr',ht:"6'0\" (183 CM)",wt:'198 LB (90 KG)',
    speed:1,power:.96,def:1,jump:1,stats:[3,3,3],special:'knuckle',spName:'FRONTIER KNUCKLE',special2:'drone',sp2Name:'DRONE STRIKE',special3:'eagle',sp3Name:'EAGLE RISE',airSp:'hover',airName:'ROTOR KICKS',tr:0,
    col:{skin:'#c88a5a',glove:'#2a2a3a',leg:'#5a6a2a',foot:'#7a4a2a',aura:'#a0b048'},sh:.72,hip:.5,
    quote:"AREA SECURE. NOBODY HURTS THIS CITY ON MY WATCH.",lose:'MAN DOWN... CALL IT IN...',stageName:'SUNSET OUTPOST'},
  mateo:{id:'mateo',name:'MATEO PAEZANO',nick:'THE CLOSER',style:'FASTBALL',country:'MOUNDWORKS',countryLabel:'TEAM',flag:'ball',ht:"6'2\" (188 CM)",wt:'205 LB (93 KG)',
    speed:1.05,power:1.1,def:1,jump:1,stats:[3,4,3],special:'fastball',spName:'FASTBALL',special2:'slide',sp2Name:'STEAL HOME',special3:'snag',sp3Name:'GLOVE SNAG',tr:0,
    col:{skin:'#c88a5a',glove:'#c89040',leg:'#e8e8f4',foot:'#2a4ad0',aura:'#3a7aff'},sh:.72,hip:.5,
    quote:"THAT'S BALLGAME. SHAKE IT OFF, YOU'LL GET 'EM NEXT TIME.",lose:'PULLED... FROM THE GAME...',stageName:'MOUNDWORKS FIELD'},
};
// fighters who aren't on the roster but fight in story mode (they load like everyone else)
const STORY_FIGHTERS=['ivan'];
const ORDER=['karl','keksan','vizor','padre','zeke','hecky','lawslie','rex','kai','estrella','reyes','mateo'];
// ---- archetypes: every fighter plays differently (health, reach, movement, chains) and has one unique trait ----
const ARCH={
  karl:{type:'RUSHDOWN',trait:'FAST DASH, 4-HIT CHAINS',hp:92,chain:4,dash:1.3,reach:1},
  ivan:{type:'GRAPPLER',trait:'ARMORED KICK, MOST HP',hp:118,dash:.8,armor:true,reach:1},
  vizor:{type:'ZONER',trait:'LONG REACH',hp:104,reach:1.12},
  padre:{type:'POWERHOUSE',trait:'COUNTERS KNOCK DOWN',hp:106,heavy:true,reach:1.05},
  zeke:{type:'HIGH/LOW ZONER',trait:'BLOCKED BALL: RELOAD',hp:100,spare:true,reach:1},
  hecky:{type:'TECH RUSHDOWN',trait:'PARRY: TAP FWD ON HIT',hp:92,parry:true,reach:1,dash:1.1},
  lawslie:{type:'ENFORCER',trait:'NO CHIP, BLOCK = METER',hp:100,enforcer:true,reach:1},
  kai:{type:'HIGH FLYER',trait:'DOUBLE JUMP, BIG HOPS',hp:104,dj:true,reach:1},
  estrella:{type:'AREA CONTROL',trait:'HER SOUND SLOWS FOES',hp:100,sound:true,reach:1.05},
  mateo:{type:'PITCHER',trait:'3RD PITCH IS A HEATER',hp:104,heat:true,reach:1},
  reyes:{type:'ALL-ROUNDER',trait:'STARTS WITH 1/3 SUPER',hp:92,leader:true,reach:1},
  keksan:{type:'STRIKER',trait:'SHIN KICKS: HARDER KICKS',hp:88,shin:true,reach:1},
  rex:{type:'LONG-RANGE',trait:'HUGE REACH, BEAT = +DMG',hp:104,rhythm:true,amp:true,reach:1.4,slow:2,dash:.7}};
const arch=c=>ARCH[c.id]||{};
// RHYTHM trait: a steady 128-ish bpm beat on the shared frame counter (same on both sides online)
const BEAT=28,onBeat=()=>{const m=frameNo%BEAT;return m<4||m>BEAT-4};
const SUPER_NAME={"karl": "MIL LÉGUAS", "ivan": "SIBERIAN STORM", "vizor": "FULL EXPOSURE", "padre": "FINAL SERMON", "zeke": "PERFECT GAME", "hecky": "GOLDEN PARACHUTE", "lawslie": "FULL ARREST", "rex": "STAGE DIVE", "kai": "FAST BREAK", "keksan": "EIGHT LIMBS", "estrella": "GRAND FINALE", "reyes": "AIR SUPPORT", "mateo": "STRIKEOUT"};
const ENDING={"mateo": "MATEO THREW THE FIRST PITCH AT THE BONFIRE BASH CHAMPIONS GAME. NINETY-EIGHT MILES AN HOUR. NOBODY EVEN SWUNG.", "reyes": "AGENT REYES FILED THE BONFIRE BASH REPORT IN TRIPLICATE, THEN TOOK HIS WHOLE SQUAD OUT FOR BURGERS. MISSION ACCOMPLISHED.", "estrella": "ESTRELLA TURNED DOWN EVERY RECORD DEAL WITH STRINGS ON IT. SHE SINGS IN THE CHAPEL CHOIR ON SUNDAYS, AND THE WHOLE STREET COMES TO LISTEN.", "keksan": "KEKSAN HUNG THE BONFIRE BASH TROPHY OVER THE TIGER GYM DOOR AND OPENED IT TO EVERY KID IN THE CITY. FREE CLASSES EVERY NIGHT. RESPECT FIRST, THEN FISTS.", "kai": "DEVANTE TOOK THE BONFIRE BASH TROPHY TO THE STREET COURT AND RAN A MIDNIGHT TOURNAMENT. NOBODY COULD GUARD HIM. NOBODY EVER WILL.", "rex": "MARCUS PLAYED THE BONFIRE BASH VICTORY SHOW TO A SOLD-OUT CROWD. THE CROWN STAYED ON FOR THE ENCORE, AND THE ENCORE, AND THE ENCORE.", "lawslie": "OFFICER LAWSLIE CLOSED THE BONFIRE BASH CASE FILE: EVERY FIGHTER BOOKED, EVERY TROPHY ACCOUNTED FOR. THE CHIEF MADE HER DETECTIVE BY MORNING.", "hecky": "HECKY XAVIER BOUGHT THE BONFIRE BASH TOURNAMENT THE NEXT MORNING. NEXT YEAR'S TROPHY IS GOLD-PLATED, AND SO IS THE PENTHOUSE.", "zeke": "ZEKE BOWLED A PERFECT 300 AT THE CHAMPIONS PARTY, THEN BOUGHT EVERYONE NACHOS. THE STRIKE LANES ARE NOW THE MOST FAMOUS ALLEY ON EARTH.", "karl": "PAPA-LEGUAS RAN STRAIGHT FROM THE FINAL FIGHT TO HIS DOJO AND HUNG UP A SIGN: EVERYONE WELCOME. JUST KEEP UP.", "vizor": "VIZOR REPLAYED EVERY FIGHT FRAME BY FRAME. THE FOOTAGE BECAME THE MOST WATCHED VIDEO ON EARTH.", "padre": "SAMSON RANG THE OLD CHAPEL BELL FOR THE FIRST TIME IN YEARS. EVEN HIS RIVALS CAME TO LISTEN."};
// combo trials: each step is the move that must hit, in order, inside one combo
// trials: the basics, the bread-and-butter, an overhead link, the fighter's signature link (where their frame data has one), a super cancel
const TRIALS={
  karl:[['jab','kick'],['jab','jab','kick','sp1'],['leap','jab','kick','sp1'],['leap','jab','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  vizor:[['jab','kick'],['jab','kick','sp1'],['leap','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  padre:[['jab','kick'],['jab','kick','sp1'],['leap','jab','kick','sp1'],['kick','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  zeke:[['jab','kick'],['jab','kick','sp1'],['leap','jab','kick','sp1'],['cjab','cjab','sweep'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  hecky:[['jab','kick'],['cjab','jab','kick','sp1'],['leap','jab','kick','sp1'],['cjab','cjab','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  lawslie:[['jab','kick'],['jab','kick','sp1'],['leap','jab','kick','sp1'],['jab','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  rex:[['jab','kick'],['jab','kick','sp2'],['leap','jab','kick','sp2'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp2'],['sp2','super']],
  kai:[['jab','kick'],['jab','kick','sp1'],['leap','jab','kick','sp1'],['jab','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  keksan:[['jab','kick'],['jab','kick','sp1'],['leap','jab','kick','sp1'],['jab','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  estrella:[['jab','kick'],['jab','kick','sp3'],['leap','jab','kick','sp3'],['cjab','jab','kick','sp3'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp3'],['sp3','super']],
  reyes:[['jab','kick'],['jab','kick','sp1'],['leap','jab','kick','sp1'],['jab','jab','kick','sp1'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp1'],['sp1','super']],
  mateo:[['jab','kick'],['jab','kick','sp2'],['leap','jab','kick','sp2'],['kick','jab','kick','sp2'],['cmd'],['jab','kick','tc'],['focus','jab','kick','sp2'],['sp2','super']]};
// every fighter: an EX special to cash out a basic chain (second to last, before the super trial)
for(const k in TRIALS)TRIALS[k].splice(TRIALS[k].length-1,0,['jab','kick','ex']);
const TKEY={focus:'HOLD FOCUS',leap:'FWD+A',jab:'A',kick:'B',cjab:'DN+A',sweep:'DN+B',jpunch:'JUMP+A',jkick:'JUMP+B',sp1:'SP',sp2:'DN+SP',sp3:'BK+SP',super:'FWD+SP',throw:'FWD+B',ex:'FOCUS+SP'};
const TNAME={focus:'FOCUS',leap:'OVERHEAD',jab:'JAB',kick:'KICK',cjab:'LOW JAB',sweep:'SWEEP',jpunch:'JUMP PUNCH',jkick:'JUMP KICK',sp1:'SPECIAL',sp2:'SPECIAL 2',sp3:'SPECIAL 3',super:'SUPER',throw:'THROW',ex:'EX SPECIAL'};
// bread-and-butter combos shown in the pause menu
const BNB={karl:'JAB, JAB, KICK > SP',vizor:'JAB, KICK > SP',padre:'JAB, KICK > SP (OVERHEAD)',zeke:'JAB, KICK > SP',hecky:'LOW JAB, JAB, KICK > SP',lawslie:'JAB, KICK > SP (TASER)',rex:'JAB, KICK > DN+SP',kai:'JAB, KICK > SP',keksan:'JAB, KICK > SP (KNEE)',estrella:'JAB, KICK > BK+SP (SCREAM)',reyes:'JAB, KICK > SP (KNUCKLE)',mateo:'JAB, KICK > DN+SP (SLIDE)'};
// cooldown (frames) per special; second specials are stronger tools with longer cooldowns
const SPCD={fastball:60,slide:110,snag:100,knuckle:100,drone:300,eagle:105,hover:70,rush:75,shuriken:75,slam:110,spin:75,flash:110,tome:75,strike:75,split:120,takeover:100,powersuit:720,laser:130,taser:80,cuff:240,bassdrop:80,miccheck:150,bounce:80,crossover:200,knee:90,clinch:260,teep:150,note:80,encore:150,siren:120,step:80,counter:110,charge:120,rising:70,replay:480,bless:600};
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
  for(const id of [...ORDER,...STORY_FIGHTERS]){const c=CH[id],s=IMG[id+'_spr'];c.spr=s;c.white=silhouette(s,'#ffffff');c.blue=silhouette(s,'#5aa8ff');c.auraS=silhouette(s,c.col.aura);
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
// ---- henchman variety: every spawn gets its own size, shirt and trouser colours, headgear and maybe a weapon.
// The extras are drawn onto each animation frame once (cached), found from the frame's own pixels: the head is the
// top rows of the figure, the fist the front-most pixel in the arm band. Frames face east; the game mirrors them.
function frameInfo(fr){const m=fxCache(fr);if(m.info)return m.info;const w=fr.width,h=fr.height,c=mk(w,h),x=c.getContext('2d');x.drawImage(fr,0,0);
  const d=x.getImageData(0,0,w,h).data,A=(i,j)=>d[(j*w+i)*4+3]>60;let y0=-1,y1=-1;for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(A(i,j)){if(y0<0)y0=j;y1=j;break}
  const bh=Math.max(1,y1-y0+1),hh=Math.max(5,Math.round(bh*.12));let hx0=w,hx1=0,sx=0,n=0;for(let j=y0;j<y0+hh&&j<h;j++)for(let i=0;i<w;i++)if(A(i,j)){hx0=Math.min(hx0,i);hx1=Math.max(hx1,i);sx+=i;n++}
  let fx=0,fy=0;const b0=Math.round(y0+bh*.24),b1=Math.round(y0+bh*.56);for(let j=b0;j<=b1&&j<h;j++)for(let i=w-1;i>fx;i--)if(A(i,j)){fx=i;fy=j;break}
  return m.info={y0,y1,bh,hh,hx0,hx1,hc:n?sx/n:w/2,hw:hx1-hx0+1,fx,fy}}
const PADX=22,PADY=8;
function hslShift(d,i,deg){const r=d[i]/255,g=d[i+1]/255,b=d[i+2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,dl=mx-mn;if(dl<=0||l<.07)return;
  const s2=dl/(1-Math.abs(2*l-1)||1);let h=mx===r?((g-b)/dl+6)%6:mx===g?(b-r)/dl+2:(r-g)/dl+4;h*=60;if(h<=52&&s2>.12&&l>.1&&l<.93)return;// keep skin
  h=(h+deg)%360/360;const q=l<.5?l*(1+s2):l+s2-l*s2,p=2*l-q,f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p};
  d[i]=f(h+1/3)*255;d[i+1]=f(h)*255;d[i+2]=f(h-1/3)*255}
function dressed(src,fr,V,k,i,pk,H){const m=fxCache(src),key='v'+V.key+k+i;if(m[key])return m[key];const I=frameInfo(fr),w=src.width,h=src.height;
  const c=mk(w+PADX*2,h+PADY),x=c.getContext('2d');c.padX=PADX;c.padY=PADY;
  if(V.top!=null||V.bot!=null){const t=mk(w,h),tx=t.getContext('2d');tx.drawImage(src,0,0);const D=tx.getImageData(0,0,w,h),d=D.data,stand=I.bh>H*.6,waist=I.y0+I.bh*.47;
    for(let j=0;j<h;j++){const deg=stand&&j>waist?V.bot:V.top;if(deg==null||!deg)continue;for(let q=0;q<w;q++){const o=(j*w+q)*4;if(d[o+3])hslShift(d,o,deg)}}tx.putImageData(D,0,0);x.drawImage(t,PADX,PADY)}
  else x.drawImage(src,PADX,PADY);
  const OL='#120e1e',X=PADX,Y=PADY,R=(a,b,ww,hh2,col)=>{x.fillStyle=col;x.fillRect(X+a,Y+b,ww,hh2)};
  if(V.hat!=='none'&&I.hw<=22&&I.bh>H*.6){const y0=I.y0,l=I.hx0,r=I.hx1,hd=V.hc;
    if(V.hat==='cap'){R(l-1,y0-2,r-l+3,5,OL);R(r,y0+1,5,3,OL);R(l,y0-1,r-l+1,3,hd);R(r,y0+2,4,1,hd);R(l+1,y0-1,r-l-1,1,'rgba(255,255,255,.35)')}
    else if(V.hat==='beanie'){R(l,y0-4,r-l+1,7,OL);R(l-1,y0-2,r-l+3,5,OL);R(l+1,y0-3,r-l-1,5,hd);R(l,y0-1,r-l+1,3,hd);R(l,y0+1,r-l+1,1,'rgba(255,255,255,.4)');R(Math.round((l+r)/2)-1,y0-6,3,3,OL);R(Math.round((l+r)/2),y0-5,1,1,'#fff')}
    else if(V.hat==='bandana'){const by=y0+Math.round(I.hh*.35);R(l-1,by-1,r-l+3,4,OL);R(l,by,r-l+1,2,hd);R(l-4,by+1,4,4,OL);R(l-3,by+2,2,2,hd)}
    if(V.shades){const ey=y0+Math.round(I.hh*.62);R(Math.round(I.hc),ey,r-Math.round(I.hc)+1,3,OL);R(r-1,ey,1,1,'#9ad8ff')}}
  if(V.w&&k!=='fall'){const{fx,fy}=I;let ang=k==='punch'?(i<pk?125:i<=pk+1?4:40):k==='hurt'?100:72;if(V.w==='knife')ang=k==='punch'&&i>=pk&&i<=pk+1?0:20;
    const W2={pipe:{L:19,c:'#9aa2b2',hi:'#e0e6f0',t:2},bat:{L:21,c:'#b07a3a',hi:'#e0b070',t:2},knife:{L:7,c:'#d8dce8',hi:'#fff',t:1}}[V.w],ca=Math.cos(ang*Math.PI/180),sa=-Math.sin(ang*Math.PI/180);
    for(const pass of[0,1])for(let t=-2;t<=W2.L;t+=.5){const px=X+fx+ca*t,py=Y+fy+sa*t,th=W2.t+(V.w==='bat'&&t>W2.L*.6?1:0)+(pass?0:2);x.fillStyle=pass?(t<1?'#5a3a2a':t>W2.L-2?W2.hi:W2.c):OL;x.fillRect(Math.round(px-th/2),Math.round(py-th/2),th,th)}}
  return m[key]=c}
const pickOf=a=>a[(Math.random()*a.length)|0];
function rollVariant(C){const VR=C.vary;if(!VR)return null;const v={sc:pickOf(VR.sc||[1]),top:null,bot:null,hat:VR.hats?pickOf(VR.hats):'none',shades:!!VR.hats&&Math.random()<.3,
    hc:pickOf(['#d02a2a','#2a5ad0','#e0c020','#26262e','#2aa04a','#e07a1a','#8a3ad0']),w:VR.weapon||(VR.weapons&&Math.random()<(VR.wchance||.35)?pickOf(VR.weapons):null)};
  if(VR.outfit){const H=[0,0,45,100,150,200,250,300];if(Math.random()<.75)v.top=pickOf(H);if(Math.random()<.65)v.bot=pickOf(H)}
  v.key=[v.top,v.bot,v.hat,v.shades?1:0,v.hc,v.w].join('');return v}

function drawFlag(code,x,y){x|=0;y|=0;ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,16,12);
  if(code==='br'){ctx.fillStyle='#1f9a3a';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd72a';for(let r=0;r<5;r++){const w=2+r*2;ctx.fillRect(x+7-w/2-1,y+r,w+2,1);ctx.fillRect(x+7-w/2-1,y+9-r,w+2,1)}ctx.fillStyle='#2a3a9a';ctx.fillRect(x+5,y+3,4,4);ctx.fillRect(x+6,y+2,2,6);ctx.fillRect(x+4,y+4,6,2)}
  else if(code==='jp'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,10);ctx.fillStyle='#d01c2a';ctx.fillRect(x+5,y+2,4,6);ctx.fillRect(x+4,y+3,6,4)}
  else if(code==='badge'){ctx.fillStyle='#1c2450';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd23a';ctx.fillRect(x+5,y+1,4,1);ctx.fillRect(x+4,y+2,6,5);ctx.fillRect(x+5,y+7,4,1);ctx.fillRect(x+6,y+8,2,1);ctx.fillStyle='#1c2450';ctx.fillRect(x+6,y+4,2,1)}
  else if(code==='tie'){ctx.fillStyle='#e8e6ee';ctx.fillRect(x,y,14,10);ctx.fillStyle='#1a1820';ctx.fillRect(x+6,y+1,2,2);ctx.fillRect(x+5,y+3,4,5);ctx.fillRect(x+6,y+8,2,1);ctx.fillStyle='#ffd23a';ctx.fillRect(x+1,y+1,1,8);ctx.fillRect(x+12,y+1,1,8)}
  else if(code==='pin'){ctx.fillStyle='#2a1640';ctx.fillRect(x,y,14,10);ctx.fillStyle='#fff';ctx.fillRect(x+6,y+1,2,2);ctx.fillRect(x+5,y+3,4,6);ctx.fillRect(x+6,y+9,2,1);ctx.fillStyle='#e02a2a';ctx.fillRect(x+5,y+4,4,1)}
  else if(code==='star'){ctx.fillStyle='#2a3ad0';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd23a';ctx.fillRect(x+6,y+1,2,8);ctx.fillRect(x+3,y+4,8,2);ctx.fillRect(x+5,y+3,4,4)}
  else if(code==='ball'){ctx.fillStyle='#2a4ad0';ctx.fillRect(x,y,14,10);ctx.fillStyle='#fff';ctx.fillRect(x+4,y+1,6,8);ctx.fillRect(x+3,y+2,8,6);ctx.fillStyle='#e02a2a';ctx.fillRect(x+4,y+3,1,4);ctx.fillRect(x+9,y+3,1,4)}
  else if(code==='sabr'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,10);ctx.fillStyle='#d02020';for(let i=0;i<5;i+=2)ctx.fillRect(x,y+i*2,14,2);ctx.fillStyle='#2a3a9a';ctx.fillRect(x,y,6,6);ctx.fillStyle='#fff';ctx.fillRect(x+2,y+2,2,2)}
  else if(code==='tiger'){ctx.fillStyle='#ff8a1a';ctx.fillRect(x,y,14,10);ctx.fillStyle='#120e1e';for(const sx of[2,6,10])ctx.fillRect(x+sx,y,2,4+(sx%4));ctx.fillRect(x+4,y+7,2,3);ctx.fillRect(x+9,y+6,2,4);ctx.fillStyle='#fff3e0';ctx.fillRect(x,y+8,14,2)}
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
function go(s,...a){CEL.stop();scene=s;s.t=0;s.enter&&s.enter(...a);if(typeof updateVis==='function')try{updateVis()}catch(e){}}
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

// The attract intro: three title beats, then a spotlight for each fighter (stage, portrait, logo, nickname, style and
// their in-game sprite in its victory pose, the announcer calling the name), then everyone together and the logo.
const CARD=46,SPOT0=190;
const Intro={enter(){this.slam=-1;if(!F)F={superFlash:0,cinema:false,superBy:null};this.act={};this.crowd=null},
  actor(id,state){const a=this.act[id]||(this.act[id]=mkActor(id,id,0,-1));if(state&&a.state!==state){a.state=state;a.st=0}return a},
  update(){const t=this.t,N=ORDER.length,FIN=SPOT0+N*CARD;if(t>10&&anyPress()){goFade(()=>go(Title));return}
    if(t===20||t===70||t===120)SFX.thud();
    if(t>=SPOT0&&t<FIN){const k=Math.floor((t-SPOT0)/CARD);if(k!==this.slam){this.slam=k;SFX.heavy();SFX.whooshH();sayName(ORDER[k]);this.actor(ORDER[k],'win')}}
    for(const id in this.act)this.act[id].st++;
    if(t===FIN){SFX.heavy();this.crowd=ORDER.map((id,i)=>{const a=this.actor(id,'idle');return a})}
    if(t===FIN+22){SFX.slam();say('Bonfire Bash!',1,0.5)}
    if(t===FIN+140)goFade(()=>go(Title),0.06)},
  draw(){const t=this.t,N=ORDER.length,FIN=SPOT0+N*CARD;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
    if(t<SPOT0-5){const NW=['','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN'][N]||N,lines=[[NW+' FIGHTERS.',20],[NW+' STYLES.',70],['ONE CHAMPION.',120]];
      lines.forEach(([s,st],i)=>{if(t>=st){const a=Math.min(1,(t-st)/8);ctx.globalAlpha=a;drawText(s,128,62+i*24,i===2?'#fff':'#bbb',i===2?2:1,i===2?{align:'center',grad:FIRE,outline:'#400'}:{align:'center'});ctx.globalAlpha=1}});return}
    if(t<FIN){if(t<SPOT0)return;const k=Math.floor((t-SPOT0)/CARD),u=(t-SPOT0)%CARD,c=CH[ORDER[k]],ease=x=>1-Math.pow(1-Math.min(1,Math.max(0,x)),3);
      // backdrop: their stage, darkened, with a band of their colour and speed lines
      ctx.drawImage(c.stage,Math.round(-u*.4),0);ctx.fillStyle='rgba(6,4,16,.55)';ctx.fillRect(0,0,W,H);
      ctx.save();ctx.beginPath();ctx.moveTo(118,0);ctx.lineTo(W,0);ctx.lineTo(W,H);ctx.lineTo(78,H);ctx.closePath();ctx.clip();
      ctx.globalAlpha=.28;ctx.fillStyle=c.col.aura;ctx.fillRect(0,0,W,H);ctx.globalAlpha=.12;ctx.fillStyle='#fff';
      for(let i=-4;i<14;i++){const x=((i*28-u*6)%(W+60)+W+60)%(W+60)-30;ctx.fillRect(x,0,10,H)}ctx.restore();ctx.globalAlpha=1;
      ctx.fillStyle=c.col.aura;ctx.beginPath();ctx.moveTo(116,0);ctx.lineTo(119,0);ctx.lineTo(79,H);ctx.lineTo(76,H);ctx.fill();
      // the in-game fighter, celebrating
      const a=this.actor(ORDER[k]);a.x=200;ctx.save();ctx.translate(0,186-GY);drawFighter(a);ctx.restore();
      // portrait slides in from the left
      const im=c.por,px=Math.round(-im.width+(im.width+2)*ease(u/9));ctx.drawImage(im,px,H-im.height);
      // logo, nickname, style
      const lw=144,lx=Math.round(W+10-(W+10-104)*ease((u-3)/9)),lh=Math.round(c.logo.height*lw/c.logo.width);ctx.drawImage(c.logo,0,0,c.logo.width,c.logo.height,lx,18,lw,lh);
      if(u>9){const al=Math.min(1,(u-9)/6);ctx.globalAlpha=al;if(c.nick)drawText('"'+c.nick+'"',176,22+lh+2,'#ffe66a',1,{align:'center',outline:'#000'});
        drawText(c.style,176,32+lh+2,'#ffffff',1,{align:'center',outline:'#000'});ctx.globalAlpha=1}
      drawText((k+1)+'/'+N,250,182,'#ffffffaa',1,{align:'right',shadow:false});
      if(u<3){ctx.fillStyle=`rgba(255,255,255,${.85-u*.28})`;ctx.fillRect(0,0,W,H)}return}
    // everyone together, then the logo slams in
    const u=t-FIN;ctx.drawImage(CH.karl.stage,0,0);ctx.fillStyle='rgba(6,4,16,.6)';ctx.fillRect(0,0,W,H);
    const g=ctx.createRadialGradient(128,150,10,128,150,150);g.addColorStop(0,'rgba(255,140,40,.35)');g.addColorStop(1,'rgba(255,140,40,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    const back=ORDER.slice(0,5),front=ORDER.slice(5);
    const row=(ids,y,x0,dx,d)=>ids.forEach((id,i)=>{const a=this.actor(id),dl=Math.max(0,1-(u-d-i*3)/10);if(u<d+i*3)return;a.x=x0+i*dx;a.face=a.x<128?1:-1;
      ctx.globalAlpha=.4;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(a.x,y+1,16,3,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.save();ctx.translate(0,y-GY-Math.round(dl*30));drawFighter(a);ctx.restore()});
    row(back,156,30,49,0);ctx.fillStyle='rgba(6,4,16,.35)';ctx.fillRect(0,0,W,H);row(front,190,54,49,8);
    if(u>=22){const k=Math.min(1,(u-22)/6),sc=1+(1-k)*1.5;ctx.save();ctx.translate(128,34);ctx.scale(sc,sc);ctx.globalAlpha=k;
      drawText('BONFIRE',0,-28,'#fff',3,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});drawText('BASH',0,-4,'#fff',4,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});ctx.restore();ctx.globalAlpha=1;
      if(u<28){ctx.fillStyle=`rgba(255,255,255,${(28-u)/8})`;ctx.fillRect(0,0,W,H)}}
    if(u<4){ctx.fillStyle=`rgba(255,255,255,${.9-u*.22})`;ctx.fillRect(0,0,W,H)}
    if(u>125){ctx.fillStyle=`rgba(0,0,0,${Math.min(1,(u-125)/15)})`;ctx.fillRect(0,0,W,H)}}};

const Title={enter(){setTwo(false);this.ph='press';this.sel=0;if(!F)F={superFlash:0,cinema:false,superBy:null};this.duo(0);this.petals=Array.from({length:18},()=>({x:rnd(0,W),y:rnd(0,H),v:rnd(.3,.8),s:rnd(0,6)}));playMusic('title')},
  items:['STORY','ARCADE','VERSUS CPU','ONLINE','TRAINING','TRIALS','RECORDS','OPTIONS'],
  // two fighters at a time face each other on the left one's stage; the pair changes every few seconds
  duo(i){const N=ORDER.length;this.pi=i%N;this.pt=0;const a=ORDER[this.pi],b=ORDER[(this.pi+1)%N];this.pair=[mkActor('a',a,42,1,{state:'win'}),mkActor('b',b,214,-1,{state:'win'})]},
  update(){this.pt=(this.pt||0)+1;for(const a of this.pair||[]){a.st++;if(a.state==='win'&&a.st>90){a.state='idle';a.st=0}}if(this.pt>=260)this.duo(this.pi+2);if(this.ph==='press'){if(anyPress()){SFX.start();this.ph='menu';say('Bonfire Bash',1,0.5)}return}
    const n=this.items.length;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
    if(pressed.b){this.ph='press';SFX.back()}
    if(pressed.a||pressed.start){SFX.ok();const s=this.sel;const it=this.items[s];if(it==='OPTIONS')go(Options);else if(it==='RECORDS')go(Records);else if(it==='ONLINE'){Online.ph='menu';goFade(()=>go(Online))}else goFade(()=>go(Select,{STORY:'story',ARCADE:'arcade','VERSUS CPU':'vs',TRAINING:'training',TRIALS:'trials'}[it]))}},
  draw(){const t=this.t,st=CH[ORDER[this.pi||0]].stage;ctx.drawImage(st,0,0);ctx.fillStyle='rgba(8,6,24,.55)';ctx.fillRect(0,0,W,H);
    if(this.ph==='menu'){this.drawMenu();return}
    ctx.fillStyle='#ffc0d8';for(const p of this.petals){p.y+=p.v;p.x+=Math.sin((t+p.s*30)/30)*0.4-0.2;if(p.y>H){p.y=-4;p.x=rnd(0,W)}ctx.fillRect(p.x|0,p.y|0,2,2)}
    for(const a of this.pair||[]){ctx.globalAlpha=.45;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(a.x,185,18,3,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.save();ctx.translate(0,184-GY);drawFighter(a);ctx.restore()}
    if(this.pt<6){ctx.fillStyle=`rgba(255,255,255,${(6-this.pt)/10})`;ctx.fillRect(0,0,W,H)}
    const bob=Math.round(Math.sin(t/20)*1.5);
    drawText('BONFIRE',128,10+bob,'#fff',4,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});
    drawText('BASH',128,42+bob,'#fff',5,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});
    ctx.fillStyle='#d0301a';ctx.fillRect(64,80+bob,128,2);
    drawText('PIXEL FIGHTERS',128,86,'#ffe66a',1,{align:'center'});
    if(this.ph==='press'){const v='VERSION '+VER,w=textW(v)+8;ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(128-w/2,H-12,w,11);drawText(v,128,H-10,'#ffe66a',1,{align:'center',shadow:false})}
    if(this.ph==='press'){if((t>>4)&1)drawText('PRESS START',128,100,'#fff',1,{align:'center',outline:'#000'})}
},
  // the main menu: grouped, slanted buttons on the left, an info card for the highlighted mode on the right
  MENU:[{g:'PLAY',c:'#ff5a3a',items:[['STORY','FIGHT THROUGH BONFIRE CITY AND SAVE IT FROM VEX.','story'],['ARCADE','BEAT EVERY RIVAL IN A ROW AND WIN THE TROPHY.','trophy'],
      ['VERSUS CPU','ONE FIGHT. ANY FIGHTER, ANY STAGE.','versus'],['ONLINE','JOIN THE LOBBY AND CHALLENGE PLAYERS.','globe']]},
    {g:'PRACTICE',c:'#5ab4ff',items:[['TRAINING','A DUMMY TO PRACTISE COMBOS ON.','dummy'],['TRIALS','LEARN EACH FIGHTER\'S COMBOS STEP BY STEP.','star']]},
    {g:'MORE',c:'#ffd23a',items:[['RECORDS','WINS, BEST COMBOS, TRIALS AND BADGES.','medal'],['OPTIONS','DIFFICULTY, MUSIC, SOUND, ANNOUNCER.','gear']]}],
  drawMenu(){const t=this.t,b=this.pair&&this.pair[1];
    // the featured fighter, bottom right
    if(b){ctx.globalAlpha=.45;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(b.x,185,18,3,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.save();ctx.translate(0,184-GY);drawFighter(b);ctx.restore()}
    // a dark slanted panel behind the buttons, and the top bar with the logo
    ctx.fillStyle='rgba(4,3,12,.72)';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(160,0);ctx.lineTo(130,H);ctx.lineTo(0,H);ctx.fill();
    ctx.fillStyle='#d0301a';ctx.beginPath();ctx.moveTo(160,0);ctx.lineTo(162,0);ctx.lineTo(132,H);ctx.lineTo(130,H);ctx.fill();
    drawText('BONFIRE BASH',8,6,'#fff',2,{grad:FIRE,outline:'#3a0808'});
    let y=26,i=0,cur=null;this.mx=this.mx||0;
    for(const G of this.MENU){drawText(G.g,8,y,G.c,1,{shadow:false});ctx.fillStyle=G.c;ctx.fillRect(8+textW(G.g)+4,y+3,40,1);y+=10;
      for(const[name,desc,icon]of G.items){const on=i===this.sel,slant=4,w=on?118+Math.round(Math.sin(t/8))*0:104,x0=on?6:0;
        ctx.fillStyle=on?G.c:'rgba(255,255,255,.07)';ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x0+w+slant,y);ctx.lineTo(x0+w,y+12);ctx.lineTo(x0,y+12);ctx.fill();
        if(on){ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(x0,y,w+slant-1,1);ctx.fillStyle='#120e1e';ctx.fillRect(x0,y+12,w,1);cur={name,desc,icon,c:G.c};
          if((t>>3)&1){ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(x0+w+6,y+2);ctx.lineTo(x0+w+11,y+6);ctx.lineTo(x0+w+6,y+10);ctx.fill()}}
        drawText(name,x0+10,y+3,on?'#120e1e':'#c8c8d8',1,{shadow:false});y+=14;i++}
      y+=4}
    drawText('A: OK   B: BACK',8,182,'#8888a0',1,{shadow:false});
    // info card for the highlighted mode
    if(cur){const X=160,Y=26,Wc=92,Hc=74;ctx.fillStyle='rgba(8,6,20,.88)';ctx.fillRect(X,Y,Wc,Hc);ctx.fillStyle=cur.c;ctx.fillRect(X,Y,Wc,2);ctx.fillRect(X,Y+Hc-1,Wc,1);
      ctx.fillStyle='rgba(255,255,255,.06)';ctx.fillRect(X+4,Y+6,24,24);menuIcon(cur.icon,X+16,Y+18,cur.c,t);
      drawText(cur.name.split(' ')[0],X+32,Y+8,'#fff',1,{shadow:false});if(cur.name.includes(' '))drawText(cur.name.split(' ').slice(1).join(' '),X+32,Y+18,'#fff',1,{shadow:false});
      wrap(cur.desc,14).slice(0,4).forEach((l,k)=>drawText(l,X+5,Y+36+k*9,'#c8c4e0',1,{shadow:false}))}}};
// small pixel icons for the menu's info card (centred on cx, cy)
function menuIcon(k,cx,cy,col,t){const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(cx+x,cy+y,w,h)},O='#120e1e';
  if(k==='story'){R(-9,-8,18,16,O);R(-8,-7,7,14,'#e8e0d0');R(1,-7,7,14,'#e8e0d0');R(-1,-7,2,14,'#8a5a3a');R(3,-4,1,7,'#d02a2a');R(2,-2,3,1,'#d02a2a')}
  else if(k==='trophy')drawTrophy(cx,cy+10);
  else if(k==='versus'){R(-10,-4,8,8,O);R(-9,-3,6,6,'#ff9a6a');R(2,-4,8,8,O);R(3,-3,6,6,'#7ad8ff');R(-2,-7,4,14,O);R(-1,-6,2,12,'#ffe66a')}
  else if(k==='globe'){ctx.fillStyle=O;ctx.beginPath();ctx.arc(cx,cy,9,0,Math.PI*2);ctx.fill();ctx.fillStyle='#3a8ad0';ctx.beginPath();ctx.arc(cx,cy,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#5ad86a';R(-5,-5,5,4,'#5ad86a');R(1,1,5,4,'#5ad86a');R(-3,3,3,2,'#5ad86a');const a=t/10;R(Math.round(Math.cos(a)*11)-1,Math.round(Math.sin(a)*11)-1,3,3,'#ffe66a')}
  else if(k==='dummy'){R(-4,-10,8,8,O);R(-3,-9,6,6,'#c8a070');R(-6,-2,12,10,O);R(-5,-1,10,8,'#a07040');R(-1,8,2,3,O);R(-5,0,10,1,'#d02a2a');R(-5,4,10,1,'#d02a2a')}
  else if(k==='star'){ctx.fillStyle=O;ctx.beginPath();for(let i=0;i<10;i++){const r=i%2?4:10,a=-Math.PI/2+i*Math.PI/5;ctx.lineTo(cx+Math.cos(a)*(r+1),cy+Math.sin(a)*(r+1))}ctx.fill();
    ctx.fillStyle='#ffe66a';ctx.beginPath();for(let i=0;i<10;i++){const r=i%2?3:9,a=-Math.PI/2+i*Math.PI/5;ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}ctx.fill()}
  else if(k==='medal'){R(-5,-10,4,8,'#d02a2a');R(1,-10,4,8,'#3a6ad0');ctx.fillStyle=O;ctx.beginPath();ctx.arc(cx,cy+3,7,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffd23a';ctx.beginPath();ctx.arc(cx,cy+3,6,0,Math.PI*2);ctx.fill();R(-1,0,2,6,'#c8902a')}
  else if(k==='gear'){ctx.save();ctx.translate(cx,cy);ctx.rotate(t/40);ctx.fillStyle=O;for(let i=0;i<8;i++){ctx.rotate(Math.PI/4);ctx.fillRect(-2,-11,4,5)}ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#a0a8b8';for(let i=0;i<8;i++){ctx.rotate(Math.PI/4);ctx.fillRect(-1,-10,2,4)}ctx.beginPath();ctx.arc(0,0,7,0,Math.PI*2);ctx.fill();ctx.fillStyle=O;ctx.beginPath();ctx.arc(0,0,3,0,Math.PI*2);ctx.fill();ctx.restore()}}

const Options={enter(){this.sel=0},
  rows(){return[['DIFFICULTY',['EASY','NORMAL','HARD'][SET.diff]],['MUSIC',SET.music?'ON':'OFF'],['SOUND FX',SET.sound?'ON':'OFF'],['ANNOUNCER',SET.voice?'ON':'OFF'],['CONTROLS','SHOW'],['BACK','']]},
  update(){const n=6;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
    const ch=pressed.left?-1:pressed.right||pressed.a?1:0;
    if((pressed.a||pressed.start)&&this.sel===4){SFX.ok();go(Controls);return}
    if(pressed.b||((pressed.a||pressed.start)&&this.sel===5)){saveSet();SFX.back();go(Title);Title.ph='menu';Title.sel=Title.items.indexOf('OPTIONS');return}
    if(ch&&this.sel<4){if(this.sel===0)SET.diff=(SET.diff+3+ch)%3;if(this.sel===1){SET.music=!SET.music;if(TRACK.gain)TRACK.gain.gain.value=SET.music?0.5:0}if(this.sel===2)SET.sound=!SET.sound;if(this.sel===3){SET.voice=!SET.voice;if(SET.voice)say('Announcer on')}SFX.move();saveSet()}},
  draw(){stripes(this.t,'#14123a','#1b1848');drawText('OPTIONS',128,16,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});box(30,46,196,108);
    this.rows().forEach(([k,v],i)=>{const on=i===this.sel,y=56+i*16;drawText((on?'> ':'  ')+k,40,y,on?'#ffe66a':'#aab');if(v)drawText((on?'< ':'')+v+(on?' >':''),214,y,on?'#fff':'#889',1,{align:'right'})});
    drawText('LEFT/RIGHT: CHANGE   B: BACK',128,172,'#778',1,{align:'center'});drawText('BONFIRE BASH V'+VER,128,182,'#556',1,{align:'center',shadow:false})}};

// CONTROLS: the touch stick's zones for fights, and story mode's 8-way stick (left/right switches page)
const Controls={enter(){this.pg=0},
  update(){if(pressed.left||pressed.right){this.pg^=1;SFX.move()}if(pressed.b||pressed.a||pressed.start){SFX.back();go(Options);Options.sel=4}},
  draw(){const t=this.t;stripes(t,'#14123a','#1b1848');drawText(this.pg?'STORY CONTROLS':'FIGHT CONTROLS',128,6,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
    const cx=58,cy=80,R0=9,R1=28,R2=42,rad=a=>a*Math.PI/180,arc=(a0,a1,r0,r1,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(cx,cy,r1,rad(a0),rad(a1));ctx.arc(cx,cy,r0,rad(a1),rad(a0),true);ctx.fill()};
    const spoke=a=>{ctx.beginPath();ctx.moveTo(cx+Math.cos(rad(a))*R0,cy+Math.sin(rad(a))*R0);ctx.lineTo(cx+Math.cos(rad(a))*R2,cy+Math.sin(rad(a))*R2);ctx.stroke()};
    const key=(c,s,x,y)=>{ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,9,9);ctx.fillStyle=c;ctx.fillRect(x,y,7,7);drawText(s,x+11,y,'#fff',1,{shadow:false})};
    const list=(rows,dy)=>rows.forEach(([k,v],i)=>{drawText(k,124,34+i*dy,'#ffe66a',1,{shadow:false});drawText(v,252,34+i*dy,'#fff',1,{align:'right',shadow:false})});
    ctx.strokeStyle='#000';ctx.lineWidth=1;
    if(!this.pg){
      arc(-148,-32,R0,R2,'#2a6ad0');arc(32,148,R0,R2,'#2a6ad0');arc(-32,32,R0,R1,'#2a9a5a');arc(148,212,R0,R1,'#2a9a5a');arc(-32,32,R1,R2,'#d0a020');arc(148,212,R1,R2,'#d0a020');
      ctx.globalAlpha=.6;arc(122,212,R0,R2+3,'#d02020');ctx.globalAlpha=1;for(const a of[-148,-122,-58,-32,32,58,122,148])spoke(a);
      ctx.fillStyle='#d02020';ctx.beginPath();ctx.arc(cx,cy,R0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ff8a8a';ctx.fillRect(cx-3,cy-4,2,2);
      key('#2a6ad0','UP: JUMP',8,128);key('#2a6ad0','DOWN: CROUCH',8,139);key('#2a9a5a','LEFT/RIGHT: WALK',8,150);key('#d0a020','THE EDGE: DASH',8,161);key('#d02020','BACK: BLOCK',8,172);
      list([['A','PUNCH'],['B','KICK'],['SP','SPECIAL'],['FOCUS','HOLD, LET GO'],['FWD+B','THROW (CLOSE)'],['FWD+A','OVERHEAD'],['BACK+A','COMMAND'],['DOWN+SP','SPECIAL 2'],['BACK+SP','SPECIAL 3'],['FWD+SP','SUPER'],['FOCUS+SP','EX SPECIAL'],['KICK, A/B','TARGET COMBO']],11)}
    else{arc(0,360,R0,R2,'#2a9a5a');for(let a=22.5;a<360;a+=45)spoke(a);
      ctx.fillStyle='#d02020';ctx.beginPath();ctx.arc(cx,cy,R0,0,Math.PI*2);ctx.fill();
      key('#2a9a5a','MOVE: 8 WAYS',8,128);drawText('UP / DOWN: IN / OUT',8,139,'#99a',1,{shadow:false});drawText('NO DASH ZONE',8,150,'#99a',1,{shadow:false});
      list([['A','PUNCH COMBO'],['A, A, B','FINISHER'],['B','KICK'],['JUMP','JUMP'],['SP','SPECIAL'],['FWD+SP','SUPER'],['A, CLOSE','GRAB'],['A, BY A FOE','HELP UP']],12)}
    drawText('< '+(this.pg?'FIGHT':'STORY')+' >   B: BACK',128,183,'#778',1,{align:'center'})}};

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
    else if(this.mode==='trials')RUN={mode:'trials',p1:this.p1,ladder:[this.p1==='karl'?'vizor':'karl'],idx:0,cont:0,alt,skin};
    else RUN={mode:this.mode,p1:this.p1,ladder:[this.p2],idx:0,cont:0,alt,skin,score:[0,0]};
    if(this.mode==='training'||this.mode==='trials')startFight();else go(VS)},
  draw(){const t=this.t,id=ORDER[this.cur],c=CH[id],pi=this.ph==='p1'?0:1,sk=c.skin2&&this.skin[pi]&&CH[c.skin2]?CH[c.skin2]:c,A=arch(c);stripes(t,'#120f30','#191540');
    const title=this.ph==='p1'?'SELECT YOUR FIGHTER':'CHOOSE YOUR OPPONENT';drawText(title,128,4,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});ctx.fillStyle='#d0301a';ctx.fillRect(40,13,176,1);
    const unl=rc(id).clear>0,hint=c.skin2&&CH[c.skin2]?'SELECT: '+(this.skin[pi]?c.skinName:'COSTUME 1'):unl?'SELECT: COLOR '+(this.alt[pi]?'2':'1'):'';
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
const FDATA={
  karl:{jab:{s:3},cjab:{s:3},kick:{s:6,dmg:6},leap:{s:13}},                          // rushdown: fastest buttons
  keksan:{kick:{dmg:8,stun:23},sweep:{dmg:9}},                          // striker: the shin kick is +2
  vizor:{kick:{r:13,stun:21},jab:{dmg:5}},                                         // zoner: safer pokes, fewer links
  padre:{jab:{s:5,dmg:5},kick:{s:9,dmg:9,stun:27,bs:13},leap:{s:16,dmg:9}},        // powerhouse: slow, and the big kick links
  zeke:{kick:{s:8,dmg:8,stun:22},cjab:{stun:18}},                                    // the low jab links into itself
  hecky:{cjab:{stun:17}},                                               // tech rushdown: low jab, low jab, jab...
  lawslie:{jab:{bs:11},kick:{bs:14},cjab:{bs:10}},                                    // enforcer: safe on block
  rex:{kick:{stun:25},leap:{stun:24}},                                                               // long range (already +2 startup)
  kai:{leap:{s:11,dmg:6},jab:{s:3},cjab:{s:3},kick:{s:6}},                                                  // high flyer: the fastest overhead
  estrella:{cjab:{stun:18},jab:{dmg:5}},                                              // the low jab links into her jab
  reyes:{kick:{stun:22},jab:{stun:19}},                                               // all-rounder: a bit of everything
  mateo:{kick:{s:8,dmg:8,stun:27},jab:{s:5,dmg:5}}};                                  // pitcher: heavy, the kick links
const ATK={
  jab:{s:4,a:3,r:9,dmg:4,reach:48,hy:.7,hh:16,stun:18,bs:10,kb:1.6,limb:'arm',lv:'mid'},
  kick:{s:7,a:5,r:15,dmg:7,reach:60,hy:.5,hh:18,stun:21,bs:12,kb:2.4,limb:'leg',lv:'mid'},
  cjab:{s:4,a:3,r:9,dmg:4,reach:46,hy:.62,hh:14,stun:16,bs:9,kb:1.4,limb:'arm',lv:'low',crouch:true},
  // universal overhead (forward + A): a short leaping punch that must be blocked standing; +6 on hit, so it links into a jab
  leap:{s:14,a:4,r:10,dmg:7,reach:46,hy:.55,hh:26,stun:21,bs:12,kb:1.6,limb:'arm',lv:'high',leap:true},
  sweep:{s:8,a:6,r:20,dmg:8,reach:62,hy:.1,hh:14,stun:0,bs:12,kb:2,limb:'leg',lv:'low',knock:true,crouch:true},
  jpunch:{s:3,a:10,r:0,dmg:6,reach:44,hy:.42,hh:22,stun:17,bs:9,kb:2,limb:'arm',lv:'high',air:true},
  jkick:{s:4,a:12,r:0,dmg:8,reach:52,hy:.22,hh:22,stun:19,bs:10,kb:2.6,limb:'leg',lv:'high',air:true},
};
// TIER 2: every fighter's own COMMAND NORMAL (back + A) and TARGET COMBO (a kick that connects, then the listed button).
// Each reuses one of the fighter's animation strips (anim, peak frame pk). Extra properties: step (moves forward),
// hop (small jump), multi/every (several hits), lastKnock, launch, knock, cuff (no specials), flash.
ATK.focus={s:6,a:4,r:18,dmg:6,reach:54,hy:.6,hh:28,stun:20,bs:12,kb:2.4,limb:'arm',lv:'mid'};
ATK.cmd={s:8,a:4,r:14,dmg:6,reach:56,hy:.6,hh:22,stun:20,bs:11,kb:2,limb:'arm',lv:'mid'};
ATK.tc={s:6,a:4,r:16,dmg:7,reach:56,hy:.55,hh:24,stun:22,bs:12,kb:2.6,limb:'leg',lv:'mid'};
const CMD={
  karl:{nm:'DOUBLE JAB',anim:'punch',pk:4,s:4,a:9,r:10,dmg:3,stun:19,multi:2,every:6,step:1.6,reach:50},          // two quick advancing jabs
  keksan:{nm:'STEP KNEE',anim:'special2',pk:6,s:8,a:4,r:16,dmg:7,reach:44,hy:.55,hh:34,launch:true,knock:true,step:2}, // launcher
  vizor:{nm:'PALM SHOT',anim:'special',pk:4,s:10,a:4,r:14,dmg:6,reach:74,hy:.72,stun:20},                           // long poke
  padre:{nm:'BOOK SWAT',anim:'special',pk:6,s:7,a:5,r:16,dmg:8,reach:46,hy:.95,hh:44},                              // anti-air
  zeke:{nm:'BALL LIFT',anim:'special2',pk:5,s:8,a:4,r:18,dmg:7,reach:44,hy:.75,hh:40,launch:true,knock:true},      // anti-air launcher
  hecky:{nm:'SHORT UPPER',anim:'special',pk:4,s:6,a:4,r:15,dmg:6,reach:42,hy:.9,hh:40},                             // anti-air
  lawslie:{nm:'STRAIGHT ARM',anim:'special',pk:6,s:9,a:4,r:12,dmg:6,reach:66,kb:4.5,bs:14},                         // long poke, pushes away
  rex:{nm:'BASS SWEEP',anim:'special',pk:6,s:9,a:5,r:16,dmg:6,reach:72,hy:.12,hh:16,lv:'low',stun:20},              // long low
  kai:{nm:'LOW DRIVE',anim:'special2',pk:4,s:8,a:5,r:14,dmg:6,reach:48,hy:.2,hh:20,lv:'low',step:3},                // advancing low
  estrella:{nm:'STAGE SLAM',anim:'special2',pk:5,s:9,a:4,r:16,dmg:6,reach:46,hy:.12,hh:16,lv:'low'},                // low slam
  reyes:{nm:'BREACH',anim:'special',pk:7,s:9,a:4,r:14,dmg:8,reach:58,step:3,kb:3},                                   // advancing punch
  mateo:{nm:'GLOVE SWAT',anim:'special3',pk:5,s:6,a:5,r:15,dmg:6,reach:42,hy:.95,hh:44}};                            // anti-air
const TCM={
  karl:{btn:'a',m:{nm:'LÉGUA FINISH',anim:'special',pk:7,s:4,a:14,r:14,dmg:3,multi:3,every:5,lastKnock:true,stun:20,step:2.4,reach:58,kb:1}},
  keksan:{btn:'b',m:{nm:'SWITCH KICK',anim:'kick',pk:4,s:7,a:4,r:16,dmg:9,stun:24,kb:3.6,knock:true,heavy:true}},
  vizor:{btn:'a',m:{nm:'REC FLASH',anim:'special',pk:5,s:6,a:4,r:12,dmg:5,stun:32,flash:true,reach:62}},          // +9: links into his kick
  padre:{btn:'a',m:{nm:'SERMON',anim:'special',pk:7,s:9,a:4,r:16,dmg:9,lv:'high',knock:true,heavy:true}},         // overhead finisher
  zeke:{btn:'b',m:{nm:'GUTTER SWEEP',anim:'lowkick',pk:3,s:6,a:5,r:18,dmg:7,lv:'low',hy:.1,hh:14,knock:true}},
  hecky:{btn:'a',m:{nm:'MARGIN CALL',anim:'special3',pk:6,s:6,a:4,r:12,dmg:5,stun:30,flash:true}},                // +8: links
  lawslie:{btn:'a',m:{nm:'CUFF SNAP',anim:'special2',pk:6,s:7,a:4,r:16,dmg:4,cuff:150}},                           // no specials for 2.8 s
  rex:{btn:'a',m:{nm:'FEEDBACK',anim:'special2',pk:6,s:8,a:4,r:16,dmg:7,kb:5.5,knock:true,reach:64}},
  kai:{btn:'b',m:{nm:'POSTERIZE',anim:'airkick',pk:3,s:7,a:5,r:14,dmg:8,hop:3,launch:true,knock:true}},
  estrella:{btn:'a',m:{nm:'HIGH C',anim:'special3',pk:6,s:6,a:9,r:14,dmg:4,multi:2,every:6,kb:1,reach:60}},
  reyes:{btn:'a',m:{nm:'SALUTE',anim:'special3',pk:6,s:6,a:4,r:16,dmg:7,hy:.8,hh:40,launch:true,knock:true}},
  mateo:{btn:'a',m:{nm:'TAG OUT',anim:'special3',pk:8,s:6,a:4,r:16,dmg:8,knock:true,heavy:true}}};
// PER-FIGHTER FRAME DATA: each fighter's normals differ from the shared ATK table (startup s, active a, recovery r,
// damage, hit-stun, block-stun). Advantage on hit = stun - a - r - 1 (see tools/framedata.js); a move links into
// another when its advantage on hit is at least the next move's startup + 1 (checked by tools/links.js).
let F=null,atkId=0;
class Fighter{constructor(id,side,cpu,alt){const c=CH[id];this.c=c;this.side=side;this.cpu=cpu;this.alt=alt;this.img=alt?c.alt:c.spr;this.H=c.H;
  this.x=side?180:76;this.y=0;this.vx=0;this.vy=0;this.face=side?-1:1;this.hp=this.mhp=(ARCH[c.id]&&ARCH[c.id].hp)||100;this.trail=this.mhp;this.state='idle';this.st=0;this.atk=null;this.ast=0;
  this.stun=0;this.crouch=false;this.inv=0;this.combo=0;this.comboT=0;this.spCD=0;this.spCD2=0;this.spCD3=0;this.meter=0;this.flash=0;this.hist=[];this.ghosts=[];this.lastA=-99;this.lastB=-99;this.ai={t:0,dur:0,plan:null};this.sp=null;this.hitDone=false}
  get h(){if(this.state==='special'&&this.sp&&this.sp.kind==='slide'&&this.st>=8&&this.st<30)return this.H*.36;return this.crouch?this.H*(arch(this.c).crouchH||.7):this.H}
  hurt(){const hw=(HBX[this.c.id]&&HBX[this.c.id].hw)||15;return{x1:this.x-hw,x2:this.x+hw,y1:this.y,y2:this.y+this.h}}}
// hitboxes measured from each fighter's own sprites (tools/hitboxes.py): reach to the fist/foot + 4 px, and the height band the limb covers.
// The archetype's reach and hh multiply the measured box (LONG REACH fighters hit a little past the fist); LONG-RANGE (amp) uses the wider of the two.
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
  if(inp.aP){f.lastA=frameNo;f.bufA=frameNo}if(inp.bP){f.lastB=frameNo;f.bufB=frameNo}if(inp.fP)f.bufF=frameNo;
  const tch=TOUCHY&&!f.cpu&&!NET.lock&&f.side===0&&!TWO,BF=tch?BUF+4:BUF;// touch: 11-frame buffer, 6-frame A+B window
  const bA=frameNo-(f.bufA??-99)<=BF,bB=frameNo-(f.bufB??-99)<=BF,bF=frameNo-(f.bufF??-99)<=BF,btn=bA||bB,use=()=>{f.bufA=f.bufB=-99};
  const both=Math.abs(f.lastA-f.lastB)<=(tch?6:4)&&frameNo-Math.max(f.lastA,f.lastB)<=BF;
  // BURST: A or B (buffered, so a press during hit-stop counts) breaks out of a detected loop
  if(f.burstOK){if(!['hurt','knock'].includes(f.state)||!o.ips||o.state==='slamming'||(o.sp&&o.sp.kind==='super'))f.burstOK=false;else if(btn){use();burst(f,o);return}}
  const wantSp2=!(f.cuffed>0)&&f.c.special2&&(inp.sp2||(btn&&both&&inp.d)||(inp.bP&&qcb(f.hist)&&!both));// A+B pressed together goes by the direction held, not an old motion
  const wantSp3=!(f.cuffed>0)&&!wantSp2&&f.c.special3&&(inp.sp3||(btn&&both&&back&&!inp.d));
  const wantSp=!(f.cuffed>0)&&!wantSp2&&!wantSp3&&(inp.sp||(btn&&both)||((inp.aP||inp.bP)&&qcf(f.hist)));
  // double-tap dash detection (edges of forward/back)
  const fe=fwd&&!f.pf,be=back&&!f.pb;f.pf=fwd;f.pb=back;
  let dash=0;if(f.cpu)dash=inp.dash||0;else if(inp.dz)dash=inp.dz===f.face?1:-1;else{if(fe){dash=frameNo-(f.tapF??-99)<=10?1:0;f.tapF=frameNo}if(be){dash=frameNo-(f.tapB??-99)<=10?-1:dash;f.tapB=frameNo}}
  f.holdBack=!!back&&!inp.u;f.holdDown=!!inp.d;
  // EX SPECIAL: hold FOCUS and press SP (or press FOCUS just after SP) for a third of the super bar.
  // It works even while that special is on cooldown: more damage, more hit-stun, and it shrugs off one hit.
  if(f.state==='focus'&&(wantSp||wantSp2||wantSp3)&&f.meter>=EXC&&f.y<=0){use();f.fArm=0;startSpecial(f,o,wantSp2?2:wantSp3?4:1,true);return}
  if(f.state==='special'&&f.sp&&f.sp.kind!=='super'&&!f.sp.ex&&!f.sp.fly&&f.st<=6&&f.sp.conn==null&&bF&&f.meter>=EXC&&!(f.cuffed>0)){f.bufF=-99;exify(f);return}
  if(f.state==='focus'){if(dash&&!inp.d){f.fArm=0;doDash(f,dash);addText('DASH CANCEL',f.x,GY-f.H-14,'#7ad8ff');return}
    if(!inp.fh||f.st>=FOCUS.lv3){const lv=f.st>=FOCUS.lv3?3:f.st>=FOCUS.lv2?2:1;f.fArm=0;startAtk(f,'focus');f.atk.lvl=lv;if(lv>1)Object.assign(f.atk,{dmg:lv===3?10:8,crumple:true,unblockable:lv===3});SFX.whooshH()}return}
  if(f.state==='special'&&f.sp&&f.sp.kind!=='super'&&bF&&f.meter>=50&&f.y<=0&&!f.sp.fly){f.meter-=50;addText('FOCUS CANCEL!',f.x,GY-f.H-22,'#7ad8ff');f.bufF=-99;startFocus(f);return}
  // throw break: press A or B while being grabbed, before the throw goes off
  if(f.state==='grabbed'){if(btn&&o.state==='throwing'&&o.thr===f&&o.st<15){use();techThrow(o,f)}return}
  // super: forward + A+B with a full meter
  const cuffed=f.cuffed>0,wantSup=!cuffed&&f.meter>=100&&(inp.sup||(btn&&both&&fwd&&!inp.d));
  if(f.state==='special'&&f.sp&&f.sp.kind!=='super'&&f.sp.conn!=null&&frameNo-f.sp.conn<=30&&f.y<=0&&!f.sp.fly&&wantSup){use();
    addText('SUPER CANCEL!',f.x,GY-f.H-22,'#ffe66a');F.camFlash=Math.max(F.camFlash,2);if(o.state==='hurt')o.stun=Math.max(o.stun,36);/* held for the super's first hit */startSpecial(f,o,3);return}
  if(f.state==='attack'){const a=f.atk;
    if(a.name==='focus'&&dash&&!inp.d&&f.hitDone){doDash(f,dash);return}
    if(wantSup&&(f.st<5||cancelOk(f))){use();startSpecial(f,o,3);return}
    // A+B pressed together: the first button's normal is cancelled straight into the special (kara cancel),
    // or any connected normal is special-cancelled.
    if(wantSp&&f.spCD<=0&&a.name!=='sweep'&&(f.st<5||cancelOk(f))){use();startSpecial(f,o);return}
    if(wantSp2&&f.spCD2<=0&&a.name!=='sweep'&&(f.st<5||cancelOk(f))){use();startSpecial(f,o,2);return}
    if(wantSp3&&f.spCD3<=0&&a.name!=='sweep'&&(f.st<5||cancelOk(f))){use();startSpecial(f,o,4);return}
    {const T=TCM[f.c.id];if(T&&a.name==='kick'&&(T.btn==='a'?bA:bB)&&cancelOk(f)&&!inp.d){use();startAtk(f,'tc');return}}
    if(btn&&cancelOk(f)&&(f.chain||0)<(arch(f.c).chain||MAXCHAIN)){const want=bA?(inp.d?'cjab':'jab'):(inp.d?'sweep':'kick');
      if((CHAIN[a.name]||[]).includes(want)){use();f.chain=(f.chain||0)+1;startAtk(f,want);return}}
    return}
  if(f.state==='jump'&&upE&&arch(f.c).dj&&!f.dj&&f.st>5&&!f.atk){f.dj=1;f.vy=4.8;f.vx=(fwd?1:back?-1:0)*f.face*1.9*f.c.speed;SFX.jump();f.ghosts.push({x:f.x,y:f.y,l:12});return}
  if(f.state==='jump'&&f.c.airSp&&wantSp&&!f.hov&&!(f.spCDA>0)&&f.y>14&&(!f.atk||f.ast<4)){use();startAir(f,o);return}
  if(f.state==='jump'){if(btn){if(!f.atk){use();startAtk(f,bB?'jkick':'jpunch')}else if(bB&&cancelOk(f)&&f.atk.name==='jpunch'){use();startAtk(f,'jkick')}}return}
  if(!canAct(f))return;
  f.chain=0;
  if(bF&&f.y<=0){f.bufF=-99;startFocus(f);return}
  if(wantSup){use();startSpecial(f,o,3);return}
  if(wantSp2&&f.spCD2<=0){use();startSpecial(f,o,2);return}
  if(wantSp3&&f.spCD3<=0){use();startSpecial(f,o,4);return}
  if(wantSp&&f.spCD<=0){use();startSpecial(f,o);return}
  // throw: forward or back + B right next to a grounded opponent who isn't reeling
  if(bB&&(fwd||back)&&!inp.d&&canThrow(f,o)){use();startThrow(f,o,!!back);return}
  if(bA){use();startAtk(f,inp.d?'cjab':fwd?'leap':back&&CMD[f.c.id]?'cmd':'jab');return}
  if(bB){use();startAtk(f,inp.d?'sweep':'kick');return}
  if(dash&&!inp.d&&!inp.u){doDash(f,dash);return}
  if(inp.u){setS(f,'prejump');f.crouch=false;f.jdir=fwd?1:back?-1:0;f.vx=0;return}
  if(inp.d){f.crouch=true;setS(f,'crouch');f.vx=0;return}
  f.crouch=false;
  const slow=inSound(f)?.7:1;
  if(fwd){setS(f,'walk');f.vx=f.face*1.35*f.c.speed*(f.buff>0?1.2:1)*slow}else if(back){setS(f,'walk');f.vx=-f.face*1.05*f.c.speed*slow}else{setS(f,'idle');f.vx=0}}
// AREA CONTROL trait: an opponent near one of her notes or sound rings moves at 70% speed
const inSound=f=>F.proj.some(p=>p.owner!==f&&(p.kind==='note'||p.kind==='zone')&&arch(p.owner.c).sound&&Math.abs(p.x-f.x)<(p.kind==='zone'?40:34)&&(p.kind==='zone'||Math.abs(p.y-f.y-f.H*.5)<46));
// FOCUS: hold to charge (absorbs one hit), let go to strike; level 2 (18 frames) crumples, level 3 (42, auto) is unblockable
const FOCUS={lv2:18,lv3:42};
function startFocus(f){f.state='focus';f.st=0;f.vx=0;f.atk=null;f.sp=null;f.fArm=0;f.crouch=false;SFX.focus()}
function doDash(f,dash){setS(f,'dash');f.st=0;f.dashDir=dash;f.vx=f.face*dash*(dash>0?4.6:4.0)*Math.min(1.15,f.c.speed)*(arch(f.c).dash||1);f.crouch=false;if(dash<0)f.inv=7;SFX.whoosh();dust(f.x,3)}
function startAtk(f,n){f.atk={...ATK[n],...(n==='cmd'?CMD[f.c.id]:n==='tc'?TCM[f.c.id].m:FDATA[f.c.id]&&FDATA[f.c.id][n]),name:n,id:++atkId};f.mh=0;if(f.atk.leap){f.vy=2.7;f.y=Math.max(f.y,.5)}if(f.atk.hop){f.vy=f.atk.hop;f.y=Math.max(f.y,.5)}f.atk.reach*=arch(f.c).reach||1;f.atk.hh*=arch(f.c).hh||1;
  {const m=HBX[f.c.id]&&HBX[f.c.id].moves[n];if(m){const A=arch(f.c),R=A.reach||1,K=A.hh||1,c=(m.y1+m.y2)/2,h=(m.y2-m.y1)/2*K;f.atk.tip=m.reach-6;f.atk.reach=A.amp?Math.max(m.reach,f.atk.reach):Math.round(m.reach*R);f.atk.y1=c-h;f.atk.y2=c+h}}if(arch(f.c).slow){f.atk.s+=arch(f.c).slow;f.atk.r+=2}f.hitDone=false;if(f.atk.air)f.ast=0;else{f.state='attack';f.st=0;f.vx=0;f.crouch=!!f.atk.crouch}
  (n==='kick'||n==='sweep'||n==='jkick'?SFX.whooshH:SFX.whoosh)()}
const canThrow=(f,o)=>Math.abs(o.x-f.x)<48&&o.y<=0&&f.y<=0&&o.inv<=0&&!(o.throwInv>0)&&['idle','walk','crouch','attack','land','dash','prejump'].includes(o.state)&&!(o.state==='attack'&&phaseOf(o)==='active');
function startThrow(f,o,back){f.state='throwing';f.st=0;f.vx=0;f.atk=null;f.crouch=false;f.thBack=back;f.thr=null;f.thrId=++atkId;SFX.whoosh()}
function techThrow(a,d){a.thr=null;a.grabbed=null;for(const f of[a,d]){f.state='block';f.st=0;f.stun=14;f.vx=-f.face*3.2;f.rot=0;f.y=0;f.throwInv=30}
  addText('THROW BREAK!',(a.x+d.x)/2,GY-a.H-12,'#7ad8ff');sparks((a.x+d.x)/2,GY-a.H*.6,'#ffffff',10);SFX.block();F.hitstop=6;if(!d.cpu)badge('tech')}
function startSpecial(f,o,which=1,ex=false){if(which===3)return startSuper(f,o);const kind=which===4?f.c.special3:which===2?f.c.special2:f.c.special,name=which===4?f.c.sp3Name:which===2?f.c.sp2Name:f.c.spName;
  const R=(f.rep||(f.rep={}))[kind]||{n:-1,t:-999};R.n=frameNo-R.t<300?R.n+1:0;R.t=frameNo;f.rep[kind]=R;
  f.state='special';f.st=0;f.vx=0;f.crouch=false;f.atk=null;f.sp={kind,two:which===2,hits:0,last:-99,id:++atkId,dim:Math.max(.55,1-.15*R.n)};
  if(which===4)f.spCD3=SPCD[kind]||120;else if(which===2)f.spCD2=SPCD[kind]||90;else f.spCD=SPCD[kind]||75;
  if(kind==='strike')f.spCD2=Math.max(f.spCD2||0,40);if(kind==='split')f.spCD=Math.max(f.spCD||0,40);// Zeke: no instant low -> overhead switch
  F.superFlash=10;F.superBy=f;SFX.special();addText(name+'!',f.x,GY-f.H-14,f.c.col.aura);
  if(kind==='step')f.inv=20;if(kind==='eagle')f.inv=8;if(kind==='knee')f.inv=6;if(kind==='rising')f.inv=7;if(kind==='takeover')f.inv=6;if(kind==='powersuit')f.inv=16;if(kind==='replay'){f.inv=24;f.sp.path=(f.rh||[]).slice(-90).reverse();SFX.rewind()}
  if(kind==='charge')f.sp.armor=1;
  fighterVoice(f,which===4?'sp3':which===2?'sp2':'sp1');if(ex)exify(f)}
const EXC=34;// EX special cost (the meter runs 0-100, so a third of the bar)
function exify(f){const s=f.sp;f.meter-=EXC;s.ex=1;s.dim*=1.3;s.exArm=1;F.superFlash=Math.max(F.superFlash,6);F.superBy=f;F.camFlash=Math.max(F.camFlash||0,1);SFX.superS();
  addText('EX!',f.x,GY-f.H-26,'#5ae8ff');for(let i=0;i<14;i++){const a=i/14*Math.PI*2;F.parts.push({x:f.x+Math.cos(a)*8,y:GY-f.H*.5+Math.sin(a)*8,vx:Math.cos(a)*2.4,vy:Math.sin(a)*2.4,l:16,c:i%2?'#5ae8ff':'#ffffff',g:0})}}
// PITCHER: every pitch counts; the 3rd in a row (or the next one after a Glove Snag) is a 98 MPH heater
const CATCHABLE=q=>!['giant','zone','drone','wave','quake','bolt','prong'].includes(q.kind);
function pitch(f,x,y,o={}){const heat=o.heat??(arch(f.c).heat&&((f.pitchN||0)>=2||f.heatNext));if(!o.call){f.pitchN=heat?0:(f.pitchN||0)+1;f.heatNext=0}
  F.proj.push({kind:'pitch',x,y,vx:f.face*(heat?7.2:5.4),owner:f,rot:0,life:90,lv:'mid',dmg:heat?11:7,stun:o.call?46:heat?26:20,kb:o.call&&!heat?.6:heat?3:1.8,knock:heat,tag:o.tag||'sp1',heat,call:o.call});
  SFX.whooshH();if(heat){SFX.rush();addText('98 MPH!',f.x+f.face*20,GY-f.H-14,'#ff9a3a');if(!o.call)fighterVoice(f,'heat')}}
function startAir(f,o){f.state='special';f.st=0;f.atk=null;f.vy=0;f.hov=1;f.spCDA=SPCD[f.c.airSp]||70;f.sp={kind:f.c.airSp,fly:1,hits:0,last:-99,id:++atkId,dim:1};
  F.superFlash=6;F.superBy=f;SFX.special();addText(f.c.airName+'!',f.x,GY-f.y-f.H-14,f.c.col.aura);fighterVoice(f,'air')}
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
        if((canGrab(o)||(o.state==='hurt'&&o.y<=2&&o.inv<=0))&&overlap({x1:fc>0?f.x:f.x-44,x2:fc>0?f.x+44:f.x,y1:f.y+8,y2:f.y+f.H},o.hurt())){grab(f,o,s,t);SFX.cuff()}}else{f.vx*=.7;if(t>30)supEnd(f,s,t,0)}return}
    if(s.ph==='hold'){const k=t-s.t0;s.loop=0;o.x=clamp(f.x+fc*28,XMIN,XMAX);o.y=0;
      if(k<10){s.pa='special2';s.pf=kf(k,[[0,2],[10,6]])}else{s.pa='special';s.pf=(k>>2)&1?7:6}
      if(k===10||k===18||k===26){SH(f,o,4,{unblockable:true});o.zap=24;SFX.zap();if(!KO_D(o)){o.state='grabbed';o.st=0}}
      if(k===40){SH(f,o,12,{unblockable:true,knock:true,heavy:true,kb:3});if(o.hp>0){o.cuffed=480;addText('ARRESTED!',o.x,GY-o.H-16,'#c8d0e0')}SFX.cuff();F.shake=8;supEnd(f,s,t)}
      else if(o.ko)supEnd(f,s,t);return}
    s.pa='special2';s.pf=99;s.loop=0;supEnd(f,s,t)},
  estrella(f,o,s,t){// GRAND FINALE: lights down, one spotlight, then she holds one huge note: rings of sound roll across the
    // whole stage (a sung note each, the floor's equalizer pumping), and the last ring ends the show with fireworks
    f.vx=0;s.loop=0;s.rings=s.rings||[];s.notes=s.notes||[];
    // her pose: wind up, the glow ignites, she sings, the big finish, then she takes it in (win pose)
    if(t<12){s.pa='special';s.pf=Math.min(2,t/4)}else if(t<22){s.pa='special';s.pf=3}else if(t<74){s.pa='special';s.pf=4+((t>>2)%3)}
    else if(t<90){s.pa='special';s.pf=t<82?7:8}else{s.pa='win';s.pf=Math.min(8,(t-90)/3)}
    if(t===2)SFX.sparkle();if(t===14){F.camFlash=3;SFX.sparkle()}
    if(s.r0==null)s.r0=o.state==='hurt'||o.state==='knock'?6:22;/* a super cancel: the rings start sooner, before they recover */const r0=s.r0;
    if(t>=r0&&t<=r0+48&&(t-r0)%12===0){const i=s.rings.length,fin=t===r0+48;s.rings.push({r:10,hit:false,c:['#ffd23a','#ff4aa8','#3ae8ff','#b04aff','#ffd23a'][i%5],fin});s.beat=t;
      SFX.whooshH();SFX.sing(i);F.shake=Math.max(F.shake,fin?6:2);if(fin){SFX.finale();F.camFlash=4}}
    // glitter falling through her spotlight, music notes streaming off the mic
    if(t>=6&&t<100&&t%2===0)F.parts.push({x:f.x+rnd(-24,24),y:rnd(-2,50),vx:rnd(-.2,.2),vy:rnd(.4,1),l:rnd(30,60)|0,c:['#fff3a0','#ffffff','#ffd23a','#ffb0e0'][(t>>1)%4],g:.01});
    if(t>=22&&t<74&&t%5===0)s.notes.push({x:f.x+f.face*14,y:GY-f.y-f.H*.72,vx:f.face*rnd(.6,1.7),vy:rnd(-1.5,-.4),l:50,c:['#ffd23a','#ff4aa8','#3ae8ff'][(t/5|0)%3]});
    for(const n of s.notes){n.x+=n.vx;n.y+=n.vy;n.vy+=.01;n.l--}s.notes=s.notes.filter(n=>n.l>0);
    for(const r of s.rings){r.r+=5;if(!r.hit&&Math.abs(Math.abs(o.x-f.x)-r.r)<14&&!KO_D(o)){r.hit=true;const blk=o.state==='block';
        SH(f,o,blk?2:r.fin?10:5,r.fin?{knock:true,heavy:true,kb:3.4}:{stun:40});sparks(o.x,GY-o.y-o.H*.6,r.c,8);
        if(r.fin){F.shake=12;F.camFlash=5;F.hitstop=10;addText('BRAVO!',o.x,GY-o.H-14,'#ffd23a');s.bravo=1}}}
    if(t===80){CEL.burst(s.bravo?50:24);CEL.rocket();SFX.cheer()}if(t===92&&s.bravo)CEL.rocket();
    if(t>=118){s.rings=[];s.notes=[];supEnd(f,s,t,0)}},
  mateo(f,o,s,t){// STRIKEOUT: three pitches with the umpire's call; strike three is a blazing heater
    f.vx=0;s.loop=0;const T=[0,26,52],i=t<26?0:t<52?1:2,k=t-T[i];s.pa='special';s.pf=kf(k,[[0,0],[6,3],[10,6],[12,7],[20,8]]);
    if(k===12&&i<3&&!(s.thrown>i)){s.thrown=i+1;pitch(f,f.x+f.face*24,f.H*.66,{heat:i===2,tag:'super',call:i+1});if(i===2){F.camFlash=3;F.shake=4}}
    if(t>=96)supEnd(f,s,t,0)},
  reyes(f,o,s,t){const fc=f.face;// AIR SUPPORT: a dashing knuckle; on a hit he calls in his drone squadron to strafe them, then Eagle Rise sends them up
    if(!s.ph){s.pa='special';s.loop=0;s.pf=t<6?t:Math.min(8,6+(t-6)/4);
      if(t>=6&&t<24){f.vx=fc*6.6;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:12});
        const r=tryHit(f,o,{x1:fc>0?f.x:f.x-48,x2:fc>0?f.x+48:f.x,y1:f.y+f.H*.2,y2:f.y+f.H*.95},{dmg:3,stun:60,bs:14,kb:0,lv:'mid',chip:3,tag:'super',minScale:.7});
        if(r==='hit'){s.ph='call';s.t0=t;f.vx=0;f.inv=200;F.shake=6;sparks(o.x,GY-o.y-o.H*.6,'#ff9a3a',12)}else if(r==='block'){f.vx=-fc*2;supEnd(f,s,t)}}
      else if(t>=24){f.vx*=.7;supEnd(f,s,t)}return}
    if(s.ph==='call'){const k=t-s.t0;f.vx=0;o.vx=0;s.pa='special2';s.pf=Math.min(8,k/3);if(k===4){SFX.lock();addText('AIR SUPPORT!',f.x,GY-f.H-16,'#b8c860')}
      s.dr=[0,1,2].map(i=>{const q=Math.min(1,Math.max(0,(k-6-i*4)/14));return{x:lerp(fc>0?-24:W+24,o.x-fc*(14-i*14),q),y:lerp(140,96-i*12,q),flash:0}});
      if(k>=22&&k<=46&&(k-22)%6===0){const i=((k-22)/6)%3;s.zap={i,k};SH(f,o,3.5,{unblockable:true});F.shake=Math.max(F.shake,4);SFX.pew();
        sparks(o.x+rnd(-6,6),GY-o.y-o.H*rnd(.3,.8),'#ff5a3a',6);if(KO_D(o)){s.dr=null;supEnd(f,s,t);return}}
      if(k>=52){s.ph='rise';s.t0=t;s.fly=1}return}
    if(s.ph==='rise'){const k=t-s.t0;s.pa='special3';s.pf=Math.min(8,3+k/3);f.y=Math.sin(Math.min(1,k/22)*Math.PI)*60;f.vx=fc*1.2;if(k%2===0)f.ghosts.push({x:f.x,y:f.y,l:10});
      if(s.dr)for(const d of s.dr){d.y+=3;d.x+=fc*2}
      if(k===4){SH(f,o,12,{knock:true,heavy:true,kb:3,launch:true});F.shake=12;F.hitstop=12;F.camFlash=5;SFX.slam();sparks(o.x,GY-o.y-o.H*.6,'#ffffff',18);
        for(let i=0;i<24;i++){const a=i/24*Math.PI*2;F.parts.push({x:o.x,y:GY-o.y-o.H*.6,vx:Math.cos(a)*3,vy:Math.sin(a)*3-1,l:24,c:['#ff3a3a','#ffffff','#3a6aff'][i%3],g:.06})}
        addText('MISSION COMPLETE!',o.x,GY-o.H-18,'#ffd23a')}
      if(k>=22){f.y=0;s.fly=0;s.ph='end';s.t0=t;s.dr=null}return}
    f.y=0;s.fly=0;s.pa='win';s.pf=Math.min(8,(t-s.t0)/3);supEnd(f,s,t,26)},
  keksan(f,o,s,t){const fc=f.face;// EIGHT LIMBS: dash in, then fists, knees, elbows and shins (eight strikes), and a flying knee to finish
    if(!s.ph){s.pa='walk';s.loop=1;s.pf=Math.floor(t/1.4);if(t<22){f.vx=fc*6.6;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:12});
        const r=tryHit(f,o,{x1:fc>0?f.x:f.x-46,x2:fc>0?f.x+46:f.x,y1:f.y+f.H*.15,y2:f.y+f.H*.95},{dmg:3,stun:60,bs:14,kb:0,lv:'mid',chip:3,tag:'super',minScale:.7});
        if(r==='hit'){s.ph='limbs';s.t0=t;s.hits=0;f.vx=0;f.inv=170}else if(r==='block'){f.vx=-fc*2;supEnd(f,s,t)}}else{f.vx*=.7;supEnd(f,s,t)}return}
    if(s.ph==='limbs'){const k=t-s.t0,i=Math.min(7,Math.floor(k/7)),seq=['punch','punch','special2','special2','punch','punch','kick','kick'],nm=['FIST','FIST','KNEE','KNEE','ELBOW','ELBOW','SHIN','SHIN'];
      f.vx=0;o.vx=0;s.loop=0;s.pa=seq[i];s.pf=s.pa==='special2'?6:akOf(f.c,s.pa).pk;if(k%7===0)f.ghosts.push({x:f.x,y:f.y,l:8});
      if(k%7===3&&s.hits<8){SH(f,o,3.5);s.hits++;SFX.whoosh();if(i%2===0)addText(nm[i],o.x+fc*10,GY-o.H-10,'#ff9a6a');if(KO_D(o)){supEnd(f,s,t);return}}
      if(k>=56){s.ph='knee';s.t0=t;s.fly=1}return}
    if(s.ph==='knee'){const k=t-s.t0;s.pa='special';s.pf=Math.min(6,k/2);f.y=Math.sin(Math.min(1,k/18)*Math.PI)*34;f.vx=fc*1.6;
      if(k===8){SH(f,o,12,{knock:true,heavy:true,kb:3.6,launch:true});F.shake=12;F.hitstop=12;F.camFlash=5;sparks(o.x,GY-o.y-o.H*.6,'#ff3a3a',18);SFX.slam();addText('TIGER KNEE!',o.x,GY-o.H-18,'#ff3a3a')}
      if(k>=18){f.y=0;s.fly=0;s.ph='end';s.t0=t}return}
    f.y=0;s.fly=0;s.pa='win';s.pf=Math.min(8,(t-s.t0)/3);supEnd(f,s,t,26)},
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
    if(!s.ph){if(s.x0==null){s.x0=f.x;s.tx=o.x;f.inv=40;s.T=o.state==='hurt'||o.state==='knock'?18:32}const T=s.T,hm=T<32?5:.8;/* a super cancel (they're still reeling): a faster dive that homes in harder */s.fly=1;s.tx+=clamp(o.x-s.tx,-hm,hm);const p=Math.min(1,t/T);
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
function updateSpecial(f,o){const s=f.sp,t=f.st;if(s.kind==='super')return updateSuper(f,o);if(s.ex&&t%3===0)f.ghosts.push({x:f.x,y:f.y,l:12,c:'#5ae8ff'});if(s.two)return updateSpecial2(f,o);
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
  else if(s.kind==='knee'){// Tiger Knee: a leaping flying knee; it clears low attacks and launches on a hit (juggle after)
    if(t<5)f.vx=0;else if(t<24){const k=(t-5)/19;f.y=Math.sin(k*Math.PI)*38;f.vx=f.face*(s.hits?1.2:5.2);if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:10});if(t===5)SFX.whooshH();
      if(!s.hits&&t>=7){const hb={x1:f.face>0?f.x-4:f.x-40,x2:f.face>0?f.x+40:f.x+4,y1:f.y+f.H*.3,y2:f.y+f.H*.95};
        const r=tryHit(f,o,hb,{dmg:10,stun:22,bs:12,kb:2.2,lv:'mid',chip:2,knock:true,launch:true,heavy:true});if(r){s.hits=1;if(r==='hit'){F.shake=Math.max(F.shake,6);sparks(o.x,GY-o.y-o.H*.6,'#ff3a3a',12)}}}}
    else{f.y=0;f.vx*=.6}
    if(t>=36){f.y=0;endSpecial(f)}}
  else if(s.kind==='teep'){// Teep: a long push kick that shoves them across the screen; near a wall they bounce off it into a juggle
    if(t<7)f.vx=0;if(t===7)SFX.whooshH();
    if(t>=7&&t<12&&!s.hits){const hb={x1:f.face>0?f.x:f.x-62,x2:f.face>0?f.x+62:f.x,y1:f.y+f.H*.3,y2:f.y+f.H*.72};
      const r=tryHit(f,o,hb,{dmg:6,stun:24,bs:10,kb:6.5,lv:'mid',chip:1,tag:'sp3'});if(r){s.hits=1;if(r==='hit'){F.shake=Math.max(F.shake,5);dust(o.x,6)}}}
    if(s.hits&&!s.wb&&t<34&&o.state==='hurt'&&(o.x<=XMIN+3||o.x>=XMAX-3)){s.wb=1;
      applyHit(f,o,{dmg:3,stun:30,bs:8,kb:-2.6,lv:'mid',unblockable:true,knock:true,launch:true,heavy:true,tag:'sp3'},o.x,GY-o.H*.5);
      F.shake=10;F.hitstop=10;SFX.slam();sparks(o.x,GY-o.H*.5,'#ffffff',14);addText('WALL BOUNCE!',o.x,GY-o.H-14,'#ff3a3a')}
    if(t>=32)endSpecial(f)}
  else if(s.kind==='fastball'){// Fastball: windup, leg kick, and a fast straight pitch
    f.vx=0;if(t===14)pitch(f,f.x+f.face*24,f.H*.66);if(t>=30)endSpecial(f)}
  else if(s.kind==='snag'){// Glove Snag: the glove goes up; catch a projectile and fire it straight back as a heater
    f.vx=0;if(!s.caught&&t>=2&&t<=22){const x1=f.face>0?f.x-4:f.x-44,x2=f.face>0?f.x+44:f.x+4;
      const q=F.proj.find(q=>q.owner!==f&&q.life>0&&CATCHABLE(q)&&q.x>x1&&q.x<x2&&q.y<f.H*1.15);
      if(q){q.life=0;s.caught=t;f.inv=12;SFX.cuff();F.hitstop=5;addText('CAUGHT!',f.x,GY-f.H-14,'#7ad8ff');sparks(q.x,GY-q.y,'#fff',8)}}
    if(s.caught&&t===s.caught+8)pitch(f,f.x+f.face*20,f.H*.62,{heat:true,tag:'sp3'});
    if(t>=(s.caught?s.caught+24:36))endSpecial(f)}
  else if(s.kind==='knuckle'){// Frontier Knuckle: a dashing, flaming straight right; knocks down on a hit
    if(t<6)f.vx=0;else if(t<22&&!s.hits){f.vx=f.face*6;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:10});if(t===6)SFX.rush()}else f.vx*=.6;
    if(t>=8&&t<22&&!s.hits){const hb={x1:f.face>0?f.x:f.x-46,x2:f.face>0?f.x+46:f.x,y1:f.y+f.H*.35,y2:f.y+f.H*.85};
      const r=tryHit(f,o,hb,{dmg:10,stun:22,bs:14,kb:3.2,lv:'mid',chip:2,knock:true,heavy:true});
      if(r){s.hits=1;f.vx=r==='block'?-f.face*3:0;if(r==='hit'){F.shake=Math.max(F.shake,7);sparks(o.x-f.face*6,GY-o.y-o.H*.6,'#ff9a3a',14)}}}
    if(t>=34)endSpecial(f)}
  else if(s.kind==='eagle'){// Eagle Rise: an invincible rising uppercut, two hits; the anti-air
    s.fly=1;f.y=t<30?Math.sin(Math.min(1,t/30)*Math.PI)*58:0;f.vx=t<16?f.face*1.3:f.vx*.8;if(t%2===0&&t<24)f.ghosts.push({x:f.x,y:f.y,l:10});if(t===3)SFX.whooshH();
    if(t>=3&&t<20&&s.hits<2&&t-s.last>=7){const fin=s.hits===1,hb={x1:f.face>0?f.x-6:f.x-42,x2:f.face>0?f.x+42:f.x+6,y1:f.y+f.H*.3,y2:f.y+f.H*1.35};
      const r=tryHit(f,o,hb,{dmg:fin?7:5,stun:22,bs:12,kb:fin?2.6:.4,lv:'mid',chip:1,...(fin?{knock:true,launch:true,heavy:true}:{})});
      if(r){s.hits++;s.last=t;if(r==='block')s.hits=2;if(r==='hit')sparks(o.x,GY-o.y-o.H*.7,fin?'#ffffff':'#ff3a3a',fin?12:6)}}
    if(t>=38){f.y=0;s.fly=0;endSpecial(f)}}
  else if(s.kind==='hover'){// Rotor Kicks (in the air): he hangs there flutter-kicking and floats up a little; up to five hits up close
    f.vy=0;f.y+=t<14?.7:.05;f.vx=f.face*.9;if(t%6===0)SFX.whoosh();
    if(t>=4&&t<40&&s.hits<5&&t-s.last>=7){const fin=s.hits===4,hb={x1:f.face>0?f.x-2:f.x-40,x2:f.face>0?f.x+40:f.x+2,y1:f.y-4,y2:f.y+f.H*.7};
      const r=tryHit(f,o,hb,{dmg:fin?5:3,stun:18,bs:10,kb:fin?2.6:.5,lv:'high',chip:1,...(fin?{knock:true,heavy:true}:{})});
      if(r){s.hits++;s.last=t;if(r==='hit')sparks(o.x-f.face*8,GY-o.y-o.H*.5,'#ffffff',5)}}
    if(t>=42){f.sp=null;f.state='jump';f.st=20;f.vy=.4;f.atk=null}}
  else if(s.kind==='note'){// High Note: a glowing music note that drifts slowly forward and hangs in the air, taking space
    if(t===10&&!F.proj.some(p=>p.owner===f&&p.kind==='note')){F.proj.push({kind:'note',x:f.x+f.face*24,y:f.H*.62,y0:f.H*.62,vx:f.face*.95,owner:f,rot:0,life:220,lv:'mid',dmg:8,stun:22,kb:1.6,tag:'sp1'});SFX.ding();SFX.sparkle();
      F.hitFx.push({x:f.x+f.face*24,y:GY-f.H*.62,l:8,big:true});sparks(f.x+f.face*24,GY-f.H*.62,'#ffd23a',10)}
    if(t>=28)endSpecial(f)}
  else if(s.kind==='siren'){// Siren Scream: a close-range sound cone, 3 hits with pushback; it shatters projectiles in front of her
    if(t<4)f.vx=0;if(t===4)SFX.whooshH();
    if(t>=5&&t<28){const x1=f.face>0?f.x+6:f.x-84,x2=f.face>0?f.x+84:f.x-6;
      for(const q of F.proj)if(q.owner!==f&&q.kind!=='giant'&&q.kind!=='zone'&&q.life>0&&q.x>x1&&q.x<x2&&q.y<f.H*1.2){q.life=0;sparks(q.x,GY-q.y,'#ffd23a',8)}
      if(s.hits<3&&t-s.last>=7){const fin=s.hits===2,r=tryHit(f,o,{x1,x2,y1:f.y+f.H*.2,y2:f.y+f.H*1.1},{dmg:fin?6:4,stun:20,bs:10,kb:fin?4.2:.3,lv:'mid',chip:1,tag:'sp3'});
        if(r){s.hits++;s.last=t;F.shake=Math.max(F.shake,r==='hit'?(fin?6:3):2);if(r==='hit')sparks(o.x-f.face*8,GY-o.y-o.H*.6,'#3ae8ff',fin?12:6);if(r==='block')s.hits=3}}}
    if(t>=38)endSpecial(f)}
  else if(s.kind==='bounce'){// Bounce Pass: a bouncing basketball; on a hit it rebounds to Kai (catch it = quick recharge)
    if(t===10&&!F.proj.some(p=>p.owner===f&&p.kind==='bball')){F.proj.push({kind:'bball',x:f.x+f.face*20,y:f.H*.5,vx:f.face*4.1,vy:-1.2,owner:f,rot:0,life:150,lv:'mid',dmg:8,stun:22,kb:2.2,tag:'sp1',bounces:0});SFX.whoosh()}
    if(t>=28)endSpecial(f)}
  else if(s.kind==='flash'){// Shutter Flash: lock a reticle on the target zone, then the flash hits whatever is inside it
    if(t===4){const d=(o.x-f.x)*f.face;s.lx=f.x+f.face*clamp(d>20?d:80,34,128);SFX.lock()}
    if(t===18){SFX.flash();F.camFlash=7;const hb={x1:s.lx-18,x2:s.lx+18,y1:4,y2:f.H*1.05};
      tryHit(f,o,hb,{dmg:7,stun:22,bs:12,kb:2.2,lv:'mid',chip:1,heavy:true})}
    if(t>=38)endSpecial(f)}}
function endSpecial(f){f.sp=null;f.state='idle';f.st=0;f.vx=0}
function updateSpecial2(f,o){const s=f.sp,t=f.st;
  if(s.kind==='slide'){// Steal Home: two running steps, then a feet-first slide; low, slides under projectiles and high attacks, knocks down
    if(t<8){f.vx=f.face*3.2;if(t===2)SFX.whoosh()}else if(t<30){f.vx=f.face*Math.max(1,6-(t-8)*.22);if(t%3===0)dust(f.x-f.face*10,1);if(t===8){SFX.whooshH();dust(f.x,4)}
      if(!s.hits){const r=tryHit(f,o,{x1:f.face>0?f.x-4:f.x-40,x2:f.face>0?f.x+40:f.x+4,y1:0,y2:f.H*.32},{dmg:9,stun:22,bs:12,kb:2.6,lv:'low',chip:1,knock:true,heavy:true,tag:'sp2'});
        if(r){s.hits=1;if(r==='hit'){addText('SAFE!',f.x,GY-f.H*.6,'#ffffff');dust(o.x,6)}else f.vx=0}}}
    else f.vx*=.6;if(t>=40)endSpecial(f);return}
  if(s.kind==='drone'){// Drone Strike: launches his SABR drone; it flies out ahead of him, hovers, and fires three aimed laser bolts
    if(t===10&&!F.proj.some(p=>p.owner===f&&p.kind==='drone')){F.proj.push({kind:'drone',x:f.x+f.face*8,y:f.H*.95,owner:f,rot:0,life:170,vx:0,shots:0,tag:'sp2'});SFX.lock()}
    if(t>=30)endSpecial(f);return}
  if(s.kind==='step'){// Légua Step: invincible blur dash straight through the opponent
    if(t<4)f.vx=0;else if(t<17){f.vx=f.face*7.4;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:12});if(t===4)SFX.rush()}else f.vx*=.7;if(t>=24)endSpecial(f)}
  else if(s.kind==='counter'){// Shadow Counter: a stance; getting hit triggers the counter (see applyHit)
    if(s.trig!=null){const k=t-s.trig;if(k===7&&!s.hits){const hb={x1:f.face>0?f.x:f.x-50,x2:f.face>0?f.x+50:f.x,y1:f.y+f.H*.2,y2:f.y+f.H};
        if(tryHit(f,o,hb,{dmg:12,stun:24,bs:12,kb:3,lv:'mid',knock:true,heavy:true}))s.hits=1}
      if(k>=24)endSpecial(f)}
    else if(t>=34)endSpecial(f)}
  else if(s.kind==='clinch'){// Thai Clinch: a short-range command grab (unblockable); three knees in the plum, the last shoves them away
    if(!s.ph){f.vx=t<6?f.face*1.6:0;
      if(t>=4&&t<=10&&o.y<=2&&o.inv<=0&&!['down','rise','ko','knock','grabbed','hurt'].includes(o.state)&&overlap({x1:f.face>0?f.x:f.x-42,x2:f.face>0?f.x+42:f.x,y1:f.y+10,y2:f.y+f.H*.9},o.hurt())){
        s.ph='hold';s.t0=t;o.state='grabbed';o.st=0;o.atk=null;o.sp=null;o.crouch=false;o.vx=0;o.y=0;f.inv=70;SFX.grab();F.hitstop=5}
      else if(t>=42)endSpecial(f);return}// a whiffed clinch leaves him open
    const k=t-s.t0;f.vx=0;
    if(s.ph==='hold'){if(KO_D(o)){s.ph='let';s.t0=t;return}o.state='grabbed';o.vx=0;o.y=0;o.x=clamp(f.x+f.face*24,XMIN,XMAX);
      if(k===12||k===24||k===36){const fin=k===36;applyHit(f,o,{dmg:fin?8:4,stun:30,bs:10,kb:fin?3.4:0,lv:'mid',unblockable:true,tag:'sp2',...(fin?{knock:true,heavy:true}:{})},o.x-f.face*6,GY-o.H*.45);
        F.shake=Math.max(F.shake,fin?8:4);sparks(o.x-f.face*6,GY-o.H*.45,'#ff3a3a',fin?14:7);if(fin){s.ph='let';s.t0=t}else if(!KO_D(o))o.state='grabbed'}}
    else if(k>=16){f.inv=0;endSpecial(f)}}
  else if(s.kind==='encore'){// Encore: she sings a ring of sound onto the floor ahead; it pulses low hits for three seconds
    if(t===12&&!F.proj.some(p=>p.owner===f&&p.kind==='zone')){const zx=clamp(f.x+f.face*86,XMIN,XMAX);F.proj.push({kind:'zone',x:zx,y:2,vx:0,owner:f,rot:0,life:170,lv:'low',dmg:5,stun:22,kb:1.2,tag:'sp2'});SFX.whoosh();SFX.sparkle();
      sparks(zx,GY-4,'#ff4aa8',10);dust(zx,6)}
    if(t>=30)endSpecial(f)}
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
     (def.cpu?!(def.state==='block'&&def.stun>0)&&Math.random()<lerp(.02,.1,[0.15,0.45,0.75][SET.diff]):frameNo-(def.tapF??-99)<=8)){def.tapF=-99;
    def.state='idle';def.st=0;def.stun=0;def.vx=0;def.meter=Math.min(100,def.meter+8);F.hitstop=14;sparks(cx,cy,'#7ad8ff',12);SFX.parry();
    addText('PARRY!',def.x,GY-def.H-10,'#7ad8ff');return'block'}
  if(def.state==='focus'&&!def.fArm&&!d.unblockable&&d.tag!=='super'){def.fArm=1;def.hp=Math.max(1,def.hp-d.dmg*att.c.power/def.c.def*.5);def.flash=4;F.hitstop=7;
    sparks(cx,cy,'#ffffff',10);SFX.block();addText('ABSORB!',def.x,GY-def.H-10,'#ffffff');return'hit'}
  const ds=def.state==='special'&&def.sp;
  if(ds&&def.sp.kind==='counter'&&def.sp.trig==null&&def.st>=2&&def.st<=28){// Shadow Counter triggers: vanish and reappear behind the attacker
    def.sp.trig=def.st;def.inv=20;for(let i=0;i<12;i++)F.parts.push({x:def.x+rnd(-12,12),y:GY-rnd(0,def.H),vx:rnd(-1,1),vy:rnd(-1,.2),l:rnd(14,24)|0,c:'#6a5a8a',g:0,dust:1});
    def.x=clamp(att.x-att.face*30,XMIN,XMAX);def.face=att.x>def.x?1:-1;F.hitstop=8;SFX.lock();addText('COUNTER!',def.x,GY-def.H-10,def.c.col.aura);return'block'}
  if(ds&&def.sp.kind==='charge'&&def.sp.armor>0&&def.st<32){def.sp.armor--;const dm=d.dmg*att.c.power/def.c.def*.5;def.hp=Math.max(1,def.hp-dm);def.flash=4;F.hitstop=7;
    sparks(cx,cy,'#ff9a3a',10);SFX.block();addText('ARMOR!',def.x,GY-def.H-10,'#ff9a3a');return'hit'}
  if(ds&&def.sp.ex&&def.sp.exArm>0&&def.st<20&&!d.unblockable&&d.tag!=='super'){def.sp.exArm--;def.hp=Math.max(1,def.hp-d.dmg*att.c.power/def.c.def*.5);def.flash=4;F.hitstop=7;
    sparks(cx,cy,'#5ae8ff',10);SFX.block();addText('EX ARMOR!',def.x,GY-def.H-10,'#5ae8ff');return'hit'}
  const exHit=d.ex||(d.tag!=='super'&&att.state==='special'&&att.sp&&att.sp.ex);if(exHit&&!d.ex)d={...d,stun:(d.stun||0)+6};
  if(att.state==='special'&&att.sp&&att.sp.kind!=='super')att.sp.conn=frameNo;
  const canBlock=!d.unblockable&&def.holdBack&&def.y<=0&&['idle','walk','crouch','block'].includes(def.state)&&(d.lv==='low'?def.crouch:d.lv==='high'?!def.crouch:true);
  const dim=d.tag==='super'?1:d.dim!=null?d.dim:(att.state==='special'&&att.sp&&att.sp.dim)||1;
  if(d.tag!=='super'){att.meter=Math.min(100,att.meter+(canBlock?3:d.heavy?10:7));def.meter=Math.min(100,def.meter+(canBlock?2:5))}
  if(canBlock){def.state='block';def.st=0;def.stun=d.bs;def.vx=push*Math.max(1.5,d.kb);if(A.enforcer)def.meter=Math.min(100,def.meter+6);else def.hp=Math.max(1,def.hp-(d.chip||0));F.hitstop=4;SFX.block();sparks(cx,cy,'#7ac8ff',6);
    if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*1.6;return'block'}
  let dmg=d.dmg*att.c.power/def.c.def*(att.buff>0?1.25:1)*dim*(att.shadow?1.15:1)*(arch(att.c).shin&&!d.tag&&att.state!=='special'&&att.atk&&['kick','sweep','jkick'].includes(att.atk.name)?1.15:1);if(att.cpu)dmg*=[0.75,0.95,1.1][SET.diff];
  if(arch(att.c).rhythm&&onBeat()){dmg*=1.25;if(!F.texts.some(x=>x.s==='ON BEAT!'&&x.l>34))addText('ON BEAT!',def.x,GY-def.y-def.H-20,'#ff4a6a')}
  const inCombo=(def.state==='hurt'&&def.stun>0)||def.state==='knock'||(def.state==='grabbed'&&att.comboT>0);
  if(inCombo)att.combo++;else att.combo=1;
  // INFINITE PROTECTION (Skullgirls-style): the same move landing for a 4th time in one combo is a loop;
  // sparks turn blue and the defender can BURST out with A or B
  if(!inCombo){att.cseq={};att.ips=false}
  {const key=d.tag||(att.state==='special'&&att.sp?(att.sp.two?'sp2':'sp1'):att.atk?att.atk.name:'?'),iid=d.tid||(att.sp&&att.sp.id)||(att.atk&&att.atk.id);
    if(key!=='super'){const m=att.cseq||(att.cseq={}),q=m[key]||(m[key]={n:0,id:null});if(q.id!==iid){q.n++;q.id=iid}
      if(q.n>=4&&!att.ips){att.ips=true;def.burstOK=true;addText('LOOP! PRESS A/B: BURST',def.x,GY-def.H-24,'#3ae8ff')}}}att.comboT=60;if(att.combo>=2)addCombo(att);
  dmg*=d.minScale?Math.max(d.minScale,SCALE[Math.min(SCALE.length-1,att.combo-1)]):SCALE[Math.min(SCALE.length-1,att.combo-1)];
  if(!att.cpu&&F.p1){const r=rc(att.c.id);if(att.combo>r.combo){r.combo=att.combo;saveRec()}if(att.combo>=5)badge('combo5')}
  if(F.trial&&att===F.p1)trialHit(att,exHit?'ex':d.tag||(att.state==='special'&&att.sp?(att.sp.two?'sp2':'sp1'):att.atk?att.atk.name:'?'),d.tid||(att.sp&&att.sp.id)||(att.atk&&att.atk.id));
  // counter hit: tagging an opponent during their attack's start-up
  const counter=!inCombo&&((def.state==='attack'&&phaseOf(def)==='start')||(def.state==='special'&&def.st<8));
  if(counter){dmg*=1.2;d={...d,stun:(d.stun||0)+8,...(arch(att.c).heavy&&att.atk&&(att.atk.name==='kick'||att.atk.name==='sweep')?{knock:true,heavy:true}:{})};addText('COUNTER!',def.x,GY-def.H-10,'#ff5a5a');SFX.block()}
  if(def.state==='knock'||def.y>0)def.jug=(def.jug||0)+1;
  def.hp=Math.max(0,def.hp-dmg);def.atk=null;def.sp=null;def.flash=4;def.crouch=d.lv==='low'?false:def.crouch&&def.state==='crouch';
  if(F.training){if(att===F.p1){if(att.combo===1)F.tDmg=0;F.tDmg+=dmg;F.tHits=att.combo;F.tBest=Math.max(F.tBest,att.combo)}def.hp=Math.max(1,def.hp)}
  if(def.hp<=0){def.state='knock';def.st=0;def.ko=true;def.vy=4.2;def.vx=push*2.6;def.y=Math.max(def.y,1);F.onKO(att,def)}
  else if(d.knock||def.y>0){def.crumple=0;def.state='knock';def.st=0;def.vy=d.launch?6.6:3.8;def.vx=push*(d.launch?0.9:2.4);def.y=Math.max(def.y,1);def.stun=1}
  else{def.state='hurt';def.st=0;def.stun=d.stun;def.vx=push*d.kb;
    const rel=(GY-cy-def.y)/Math.max(1,def.h);def.hurtK=def.crouch?'crouch':d.lv==='low'||d.crouch||rel<.3?'low':rel>.62?'high':'mid'}
  if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*d.kb*0.7;
  // hit feel: the freeze scales with the damage that landed (heavier = longer), plus shake and a 3-tier sound
  F.hitstop=clamp(Math.round(4+dmg*.7),5,12);if(d.heavy)F.hitstop=Math.max(F.hitstop,10);F.shake=d.heavy?5:dmg>=7?3:2;
  sparks(cx,cy,att.ips?'#3ae8ff':'#ffe66a',d.heavy?14:8);F.hitFx.push({x:cx,y:cy,l:8,big:!!d.heavy,ips:!!att.ips});(d.heavy||dmg>=9?SFX.heavy:dmg>=5?SFX.hit:SFX.hitL)();
  if(!att.cpu&&navigator.vibrate)try{navigator.vibrate(d.heavy?40:18)}catch(e){}
  return'hit'}
function updateF(f,o){f.st++;if(f.buff>0){f.buff--;if(frameNo%4===0)F.parts.push({x:f.x+rnd(-14,14),y:GY-f.y-rnd(4,f.H),vx:0,vy:-.6,l:16,c:Math.random()<.5?'#ffd23a':'#fff3a0',g:0})}if(f.spCD>0)f.spCD--;if(f.spCD2>0)f.spCD2--;if(f.spCD3>0)f.spCD3--;if(f.spCDA>0)f.spCDA--;if(f.cuffed>0)f.cuffed--;if(f.zap>0){f.zap--;if(f.zap%3===0)F.parts.push({x:f.x+rnd(-12,12),y:GY-f.y-rnd(8,f.H),vx:rnd(-1,1),vy:rnd(-1,1),l:8,c:Math.random()<.5?'#fff':'#7ad8ff',g:0})}if(f.throwInv>0)f.throwInv--;
  if(!(f.state==='special'&&f.sp&&f.sp.kind==='replay')){(f.rh||(f.rh=[])).push({x:f.x,hp:f.hp});if(f.rh.length>100)f.rh.shift()}if(f.flash>0)f.flash--;if(f.inv>0)f.inv--;if(f.comboT>0&&--f.comboT===0)f.combo=0;
  f.trail=f.trail>f.hp?Math.max(f.hp,f.trail-0.4):f.hp;f.ghosts.forEach(g=>g.l--);f.ghosts=f.ghosts.filter(g=>g.l>0);
  switch(f.state){
    case'prejump':if(f.st>=3){f.state='jump';f.st=0;f.vy=5.4*f.c.jump;f.vx=f.jdir*f.face*1.8*f.c.speed;SFX.jump()}break;
    case'jump':if(f.atk){f.ast++;if(phaseOf(f)==='active'&&!f.hitDone){const a=f.atk,cy=f.y+f.H*a.hy;if(tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:a.y1!=null?f.y+a.y1:cy-a.hh/2,y2:a.y1!=null?f.y+a.y2:cy+a.hh/2},{...a,heavy:false}))f.hitDone=true}}break;
    case'land':f.vx=0;if(f.st>=5)setS(f,'idle');break;
    case'dash':f.vx*=0.88;if(f.st>=(f.dashDir>0?13:15)){f.vx=0;setS(f,'idle')}break;
    case'attack':{const a=f.atk,ph=phaseOf(f);if(ph==='active'&&!f.hitDone){const h=f.H*(a.crouch?.7:1),cy=f.y+h*a.hy;
        const last=a.multi&&f.mh===a.multi-1,r=tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:a.y1!=null?f.y+a.y1:cy-a.hh/2,y2:a.y1!=null?f.y+a.y2:cy+a.hh/2},a.lastKnock&&last?{...a,knock:true,heavy:true,kb:3}:a);
        if(r==='hit'&&a.crumple&&o.y<=0&&o.state==='hurt'){o.stun=Math.max(o.stun,52);o.crumple=1;addText(a.lvl===3?'UNBLOCKABLE CRUMPLE!':'CRUMPLE!',o.x,GY-o.H-14,'#ffb03a');F.hitstop=Math.max(F.hitstop,10)}
        if(r){f.hitDone=true;f.mh++;f.mhT=f.st;if(r==='hit'&&a.nm&&(f.mh===1)&&a.name==='tc')addText(a.nm+'!',o.x,GY-o.H-12,f.c.col.aura);
          if(r==='hit'&&a.cuff&&o.hp>0){o.cuffed=Math.max(o.cuffed||0,a.cuff);addText('CUFFED!',o.x,GY-o.H-22,'#c8d0e0');SFX.cuff()}if(a.flash){F.camFlash=Math.max(F.camFlash,2);SFX.flash()}}}
      if(a.multi&&f.hitDone&&f.mh<a.multi&&f.st-f.mhT>=a.every&&ph==='active')f.hitDone=false;
      if(a.leap&&f.st<a.s+a.a)f.vx=f.face*1.7;else if(a.step&&f.st<a.s+a.a)f.vx=f.face*a.step;else f.vx*=.75;if(f.st>=a.s+a.a+a.r+(f.hitDone?0:WHIFF)){f.atk=null;f.state=a.crouch&&f.holdDown?'crouch':'idle';f.st=0;if(f.state==='idle')f.crouch=false}}break;
    case'hurt':f.vx*=.86;if(--f.stun<=0){if(f.crumple){f.crumple=0;f.state='down';f.st=0;f.jug=0;SFX.thud();dust(f.x,6)}else{f.state='idle';f.st=0}}break;
    case'focus':f.vx=0;if(f.st===FOCUS.lv2||f.st===FOCUS.lv3){SFX.lock();sparks(f.x,GY-f.H*.6,f.st===FOCUS.lv3?'#ff3a3a':'#ffb03a',8)}
      if(f.st%4===0)F.parts.push({x:f.x+rnd(-16,16),y:GY-rnd(4,f.H),vx:0,vy:-rnd(.4,1),l:14,c:f.st<FOCUS.lv2?'#ffffff':f.st<FOCUS.lv3?'#ffb03a':'#ff3a3a',g:0});break;
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
  if(f.state!=='grabbed'&&f.state!=='slamming'&&!(f.state==='special'&&f.sp&&(f.sp.kind==='spin'||f.sp.kind==='rising'||f.sp.kind==='knee'||f.sp.fly))){
    if(f.y>0||f.vy!==0){f.vy-=GRAV;f.y+=f.vy}
    if(f.y<=0&&f.vy<=0&&(f.state==='jump'||f.state==='knock'||f.vy<0)){f.y=0;f.vy=0;
      if(f.state==='jump'){f.state='land';f.st=0;f.dj=0;f.hov=0;f.atk=null;SFX.land();dust(f.x,4)}
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
function updateProj(){for(const p of F.proj){if(p.dim==null){p.dim=(p.owner.sp&&p.owner.sp.dim)||1;if(p.owner.sp&&p.owner.sp.ex){p.ex=1;p.stun=(p.stun||18)+6;if(p.vx&&p.kind!=='drone'&&p.kind!=='zone')p.vx*=1.2}}if(p.kind==='giant'){updateGiant(p,p.owner===F.p1?F.p2:F.p1);continue}
    if(p.kind==='wave')for(const q of F.proj)if(q.owner!==p.owner&&q.kind!=='giant'&&q.kind!=='wave'&&q.kind!=='zone'&&q.kind!=='drone'&&q.life>0&&Math.abs(q.x-p.x)<16&&q.y<p.y+24){// Mic Check bats it back
      if(q.kind==='prong')q.life=0;else{q.owner=p.owner;q.vx=-q.vx*1.2;q.id=null;q.life=Math.max(q.life,60)}sparks(q.x,GY-q.y,'#ff4a6a',10);SFX.parry();addText('REFLECT!',q.x,GY-q.y-14,'#ff4a6a')}
    if(p.kind==='drone'){p.life--;const o=p.owner===F.p1?F.p2:F.p1,ow=p.owner,k=170-p.life,hx=clamp(ow.x+ow.face*64,XMIN,XMAX);
      if(p.life>22){p.x+=(hx-p.x)*.08;p.y+=(74-p.y)*.08}else{p.y+=2.5;p.x+=ow.face*.6}// it peels off and leaves at the end
      if(k>=36&&(k-36)%36===0&&p.shots<3&&!KO_D(o)){p.shots++;const dx=o.x-p.x,dy=(o.y+o.H*.5)-p.y,d=Math.hypot(dx,dy)||1;
        F.proj.push({kind:'bolt',x:p.x,y:p.y-3,vx:dx/d*3.6,vy:dy/d*3.6,owner:ow,rot:0,life:80,lv:'mid',dmg:4,stun:16,kb:.8,tag:'sp2'});SFX.pew();p.flash=4}
      if(p.flash>0)p.flash--;continue}
    if(p.kind==='zone'){p.life--;const o=p.owner===F.p1?F.p2:F.p1,k=170-p.life;if(p.glow>0)p.glow--;if(k%40===12){p.pulse=8;p.glow=12;p.id=++atkId;SFX.whoosh();SFX.sing(k/40|0);p.fx=p.fx||[];for(let i=0;i<3;i++)p.fx.push({x:p.x+(i-1)*14,y:GY-10,vy:-rnd(.7,1.3),l:40,c:['#ffd23a','#ff4aa8','#3ae8ff'][i]})}
      if(p.fx){for(const n of p.fx){n.y+=n.vy;n.x+=Math.sin(n.l*.3)*.4;n.l--}p.fx=p.fx.filter(n=>n.l>0)}
      if(p.pulse>0){p.pulse--;const r=tryHit(p.owner,o,{x1:p.x-30,x2:p.x+30,y1:0,y2:34},{dmg:p.dmg,stun:p.stun,bs:8,kb:p.kb,lv:'low',chip:1,tag:'sp2',dim:p.dim,tid:p.id,ex:p.ex});if(r)p.pulse=0}continue}
    if(p.kind==='note'){p.y=p.y0+Math.sin(p.life/9)*5;if(p.life<60)p.vx*=.97;
      if(p.life%3===0)F.parts.push({x:p.x-Math.sign(p.vx)*6+rnd(-2,2),y:GY-p.y+rnd(-5,5),vx:-p.vx*.3,vy:rnd(-.3,.3),l:rnd(14,24)|0,c:['#ffd23a','#fff3a0','#ff9ad8'][(p.life/3|0)%3],g:0})}
    p.x+=p.vx;if(p.kind==='quake'&&frameNo%4===0)dust(p.x,1);
    if(p.kind==='pitch'){p.rot+=.6;if(p.heat&&frameNo%2===0)F.parts.push({x:p.x-Math.sign(p.vx)*5,y:GY-p.y+rnd(-2,2),vx:-p.vx*.15,vy:rnd(-.6,.2),l:rnd(8,14)|0,c:Math.random()<.5?'#ff9a3a':'#ffe066',g:0})}
    if(p.kind==='bolt'){p.y+=p.vy;if(p.y<=3){p.life=0;sparks(p.x,GY-3,'#ff5a3a',5);continue}}
    if(p.kind==='bball'){p.vy-=.32;p.y+=p.vy;if(p.y<=5&&p.vy<0){p.y=5;p.vy=Math.max(3.2,-p.vy*.82);p.bounces++;SFX.land()}
      if(p.ret){const ow=p.owner;p.vx=Math.sign(ow.x-p.x)*4.6;if(Math.abs(ow.x-p.x)<14){p.life=0;ow.spCD=Math.min(ow.spCD,18);addText('CAUGHT!',ow.x,GY-ow.H-14,'#ffb43a');SFX.ok()}continue}}p.rot+=p.kind?p.vx*0.14:0.5;p.life--;const o=p.owner===F.p1?F.p2:F.p1;
    if(p.g){p.y+=p.vy;p.vy-=p.g;if(p.y<=4&&p.vy<0){p.life=0;dust(p.x,8);SFX.land();F.shake=Math.max(F.shake,2)}}
    const R2=p.kind==='note'?10:p.kind?7:6,RY=p.kind==='note'?10:p.kind==='wave'?15:p.kind==='quake'?10:R2,r=tryHit(p.owner,o,{x1:p.x-R2,x2:p.x+R2,y1:p.y-RY,y2:p.y+RY},{dmg:p.dmg||9,stun:p.stun||18,bs:12,kb:p.kb||2.4,lv:p.lv||'mid',chip:2,knock:!!p.knock,heavy:!!p.knock,tag:p.tag||'sp1',dim:p.dim,ex:p.ex,tid:p.id||(p.id=++atkId)});
    if(r==='block'&&p.kind==='ball'&&arch(p.owner.c).spare){p.owner.spCD=Math.min(p.owner.spCD,25);addText('SPARE!',p.owner.x,GY-p.owner.H-14,'#d04aff');SFX.ok()}
    if(r&&p.kind==='bball'){p.ret=true;p.vy=Math.max(p.vy,3);if(r==='hit')SFX.thud()}
    else if(r&&p.kind==='quake'){p.life=0;if(r==='hit')sparks(p.x,GY-p.y-4,'#5ae0ff',8)}
    else if(r&&p.kind==='wave'){p.life=0;if(r==='hit')o.vx=Math.sign(p.vx)*5.2}
    else if(r&&p.kind==='prong'){p.life=0;if(r==='hit'){o.zap=46;SFX.zap()}}
    else if(r&&p.kind==='pitch'){p.life=0;sparks(p.x,GY-p.y,p.heat?'#ff9a3a':'#ffffff',p.heat?14:8);
      if(p.call){const C=['STRIKE ONE!','STRIKE TWO!',"STRIKE THREE! YOU'RE OUT!"];addText(r==='block'?'FOUL BALL!':C[p.call-1],o.x,GY-o.H-14-(p.call-1)*6,r==='block'?'#ffffff':'#ffd23a');SFX.bell();if(p.call===3&&r==='hit'){F.shake=12;F.camFlash=6;F.hitstop=12;CEL.burst(20)}}
      else if(r==='hit'){SFX.thud();if(p.heat)F.shake=Math.max(F.shake,7)}}
    else if(r&&p.kind==='note'){p.life=0;sparks(p.x,GY-p.y,'#ffd23a',12);if(r==='hit')SFX.thud()}
    else if(r){p.life=0;if(r==='hit'&&p.kind){SFX.thud();for(let i=0;i<6;i++)F.parts.push({x:p.x,y:GY-p.y,vx:rnd(-2,2),vy:rnd(-3,-1),l:rnd(12,20)|0,c:i%2?'#ffffff':'#e02a2a',g:.15})}}}
  if(F.proj.length===2&&F.proj.some(p=>p.kind==='giant')){const g=F.proj.find(p=>p.kind==='giant'),q=F.proj.find(p=>p!==g);if(q&&Math.abs(g.x-q.x)<g.r+6&&Math.abs(g.y-q.y)<g.r+8){q.life=0;sparks(q.x,GY-q.y,'#fff',8)}}
  else if(F.proj.length===2&&!F.proj.some(p=>p.kind==='wave'||p.kind==='zone'||p.kind==='drone')&&Math.abs(F.proj[0].x-F.proj[1].x)<10&&Math.abs(F.proj[0].y-F.proj[1].y)<14){sparks(F.proj[0].x,GY-F.proj[0].y,'#fff',10);SFX.block();
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
const SUP_RANGE={mateo:230,reyes:100,estrella:240,keksan:100,kai:120,ivan:50,lawslie:110,vizor:230,zeke:220,padre:230,karl:130,rex:190};
function aiSnap(o){return{x:o.x,y:o.y,vy:o.vy,state:o.state,st:o.st,atk:o.atk,ph:phaseOf(o),sp:o.sp,crouch:o.crouch}}
function drawCard(cards){let t=0;for(const c of cards)if(c[0]>0)t+=c[0];let r=Math.random()*t;for(const c of cards){if(c[0]<=0)continue;if((r-=c[0])<=0){c[1]();return c[2]}}return null}
// CPU EX: now and then it spends a third of the bar to power up a special (more often to finish a combo)
function aiInput(f,o){const inp=aiInput0(f,o);if((inp.sp||inp.sp2||inp.sp3)&&!inp.sup&&f.meter>=EXC&&!(f.cuffed>0)){const L=[0,.5,1][SET.diff],combo=o.state==='hurt'||o.state==='knock';
    if(Math.random()<(combo?.15+.35*L:.04+.12*L)*(f.meter>=67?1.5:1))f.bufF=frameNo}return inp}
function aiInput0(f,o){const inp={l:0,r:0,u:0,d:0,aP:0,bP:0,sp:0,sp2:0,sp3:0,sup:0},ai=f.ai;
  const L=clamp([0.15,0.45,0.75][SET.diff]+(RUN&&RUN.mode==='arcade'?RUN.idx*0.1:0),0,1);
  if(ai.focusT>0){ai.focusT--;inp.fh=1;return inp}
  if(f.state==='special'&&f.sp&&f.sp.kind!=='super'&&f.sp.conn!=null&&f.meter>=100&&frameNo-f.sp.conn<14&&f.sp.conn===frameNo-6&&Math.random()<.15+.5*L){inp.sup=1;return inp}
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
      else if(n==='kick'&&TCM[f.c.id]&&Math.random()<.35){inp[TCM[f.c.id].btn+'P']=1}
      else if(n==='kick'){if(f.c.id==='rex'&&rdy2)inp.sp2=1;else if(rdy&&sp!=='slam'&&sp!=='bassdrop')inp.sp=1}}
    return inp}
  // AIR
  if(f.state==='jump'){if(arch(f.c).dj&&!f.dj&&f.vy<1&&f.st>6&&Math.random()<.05){inp.u=1;inp[tw]=1;return inp}
    if(f.c.airSp&&!f.hov&&!(f.spCDA>0)&&!f.atk&&dist<64&&f.y>24&&Math.random()<.08+.2*L){inp.sp=1;return inp}
    if(!f.atk&&dist<60&&f.vy<1.5&&Math.random()<0.15+L*0.5)inp.bP=1;return inp}
  // follow-up on a hit I can see
  if(canAct(f)&&o.state==='hurt'&&dist<48&&Math.random()<L*0.35){Math.random()<.5?inp.aP=1:inp.bP=1;return inp}
  // ANTI-AIR deck: one decision per jump, fired when they come down in range
  if(canAct(f)&&O.state==='jump'&&dist<100){const id=frameNo-O.st;
    if(ai.aa!==id){ai.aa=id;ai.aaMove=null;const cards=[[lerp(.35,.1,L),()=>{},'let it land'],[lerp(.2,.4,L),plan('guard',22),'block'],[.12+.25*L,()=>{ai.aaMove='kick'},'standing kick'],[.08+.15*L,()=>{ai.aaMove='jump'},'air-to-air']];
      if(s2==='rising'&&rdy2)cards.push([lerp(.1,.9,L),()=>{ai.aaMove='sp2'},'martelo']);
      if(sp==='takeover'&&rdy)cards.push([lerp(.1,.45,L),()=>{ai.aaMove='sp'},'hostile takeover']);
      if(sp==='knee'&&rdy)cards.push([lerp(.1,.7,L),()=>{ai.aaMove='sp'},'tiger knee']);
      if(CMD[f.c.id]&&CMD[f.c.id].hy>=.75)cards.push([lerp(.08,.4,L),()=>{ai.aaMove='cmd'},'anti-air '+CMD[f.c.id].nm.toLowerCase()]);
      if(s3==='eagle'&&rdy3)cards.push([lerp(.1,.85,L),()=>{ai.aaMove='sp3'},'eagle rise']);
      if(s3==='siren'&&rdy3)cards.push([lerp(.1,.6,L),()=>{ai.aaMove='sp3'},'siren scream']);
      if(s3==='laser'&&rdy3)cards.push([.1+.2*L,()=>{ai.aaMove='sp3'},'laser glare']);
      card('antiair',cards)}
    if(ai.aaMove&&O.vy<1.5&&dist<(ai.aaMove==='kick'?72:ai.aaMove==='jump'?90:85)){const m=ai.aaMove;ai.aaMove=null;
      if(m==='jump'){inp.u=1;inp[tw]=1}else if(exec()){if(m==='kick')inp.bP=1;else if(m==='cmd'){inp[aw]=1;inp.aP=1}else inp[m]=1}return inp}
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
      if(oa&&!incoming&&dist<75&&canAct(f))cards.push([.04+.1*L,()=>{ai.react='focus'},'focus']);
      if(oa&&O.ph==='start'&&s2==='counter'&&rdy2)cards.push([lerp(.03,.5,L),()=>{ai.react='sp2'},'shadow counter']);
      if(oa&&O.ph==='start'&&sp==='takeover'&&rdy&&dist<70)cards.push([.03+.2*L,()=>{ai.react='sp'},'reversal']);
      card('defend',cards)}
    const R=ai.react;
    if(R==='block'){inp[aw]=1;const lo=(O.atk&&O.atk.lv==='low')||(O.sp&&O.sp.kind==='bassdrop')||(incoming&&incoming.lv==='low'),
        hi=(O.atk&&O.atk.lv==='high')||(O.sp&&O.sp.kind==='tome')||(incoming&&incoming.lv==='high');
      if(lo||hi?(ai.read?lo:hi):ai.crouchy)inp.d=1;return inp}
    if(R==='jump'){ai.react='done';inp.u=1;return inp}
    if(R==='focus'){ai.react='done';ai.focusT=Math.random()<.5?8:22;inp.fP=1;inp.fh=1;return inp}
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
  if(s3==='snag'&&rdy3&&F.proj.some(q=>q.owner!==f&&q.life>0&&CATCHABLE(q)&&Math.abs(q.x-f.x)<75&&Math.sign(f.x-q.x)===Math.sign(q.vx||0)))C.push([3+4*L,SPC('sp3'),'glove snag']);
  if(s2==='replay'&&rdy2&&f.rh&&f.rh.length>=90&&f.rh[f.rh.length-90].hp-f.hp>12)C.push([.5,SPC('sp2'),'instant replay']);
  if(s2==='bless'&&rdy2&&dist>115&&f.hp<f.mhp*.8)C.push([.4,SPC('sp2'),'benediction']);
  if(s2==='powersuit'&&rdy2&&dist>100)C.push([.2,SPC('sp2'),'power suit']);
  if(arch(f.c).amp){// LONG-RANGE: poke at the tip, zone, back off
    if(rdy&&dist>90)C.push([.2+.15*L,SPC('sp'),'bass drop']);if(dist>64&&dist<88&&O.y<=0)C.push([.3+.25*L,hold('bP'),'tip kick']);
    if(dist<50)C.push([.2+.15*L,()=>{inp.dash=-1},'backdash']);if(dist>130)C.push([1,plan('guard',8+wait/2),'hold space']);
    if(rdy2&&dist>90)C.push([.05,SPC('sp2'),'mic check'])}
  if(dist>110){// FAR deck
    C.push([1,plan('walkF',14+wait),'walk in'],[.12*rage,both('u',tw),'jump in'],[.07*(.5+L),()=>{inp.dash=1},'dash in']);
    if(rdy&&sp==='bounce')C.push([.6,SPC('sp'),'bounce pass']);if(rdy&&sp==='note')C.push([.55,SPC('sp'),'high note']);if(rdy&&sp==='fastball')C.push([.55+.2*L,SPC('sp'),'fastball']);if(rdy2&&s2==='drone'&&!F.proj.some(p=>p.owner===f&&p.kind==='drone'))C.push([.35+.2*L,SPC('sp2'),'drone strike']);if(rdy2&&s2==='encore'&&dist<200)C.push([.25+.2*L,SPC('sp2'),'encore']);if(rdy&&(sp==='shuriken'||sp==='strike'))C.push([(sp==='strike'?.55:.8)*(ai.lastBall==='strike'?.4:1),()=>{SPC('sp')();ai.lastBall='strike'},'projectile']);if(rdy&&sp==='rush'&&dist<150)C.push([.4*rage,SPC('sp'),'rush']);
    if(rdy3&&s3==='laser'&&O.state!=='crouch')C.push([.15+.15*L,SPC('sp3'),'laser glare']);if(rdy2&&s2==='split'&&dist<150)C.push([(.15+.2*L)*(ai.lastBall==='strike'?3:1),()=>{SPC('sp2')();ai.lastBall='split'},'split shot']);
    if(rdy2&&s2==='charge'&&dist<140)C.push([.1+.1*L,SPC('sp2'),'iron charge']);return card('far',C)}
  if(dist>58){// MID deck (footsies)
    C.push([.32,plan('walkF',10+wait/2),'walk in'],[.12*rage,both('u',tw),'jump in'],[.08,plan('walkB',10),'walk back'],[.22,plan('guard',wait),'guard']);
    if(dist<64)C.push([.14,hold('bP'),'poke']);if(rdy&&!['slam','bassdrop','shuriken','strike'].includes(sp))C.push([.12*rage,SPC('sp'),'special']);
    if(rdy&&sp==='flash'&&dist<125)C.push([.3,SPC('sp'),'shutter flash']);if(rdy&&sp==='taser'&&dist<115)C.push([.06+.08*L,SPC('sp'),'taser']);if(rdy&&sp==='fastball')C.push([.12+.1*L,SPC('sp'),'fastball']);if(rdy2&&s2==='slide'&&dist<120&&O.y<=0)C.push([.06+.1*L,SPC('sp2'),'steal home']);if(rdy&&sp==='knuckle'&&dist<110&&O.state!=='attack')C.push([.06+.1*L,SPC('sp'),'frontier knuckle']);if(rdy2&&s2==='drone'&&!F.proj.some(p=>p.owner===f&&p.kind==='drone'))C.push([.08+.08*L,SPC('sp2'),'drone strike']);
    if(rdy&&sp==='takeover'&&dist<105&&O.state!=='attack')C.push([.03+.05*L,SPC('sp'),'takeover rush']);
    if(rdy2&&s2==='charge')C.push([.06+.1*L,SPC('sp2'),'iron charge']);if(rdy2&&s2==='split')C.push([(.08+.1*L)*(ai.lastBall==='strike'?3:1),()=>{SPC('sp2')();ai.lastBall='split'},'split shot']);
    if(rdy&&sp==='strike')C.push([(.1+.1*L)*(ai.lastBall==='split'?3:1),()=>{SPC('sp')();ai.lastBall='strike'},'strike ball']);
    if(rdy3&&s3==='laser'&&O.state!=='crouch')C.push([.06+.08*L,SPC('sp3'),'laser glare']);if(rdy3&&s3==='teep'&&dist<90)C.push([.06+.08*L,SPC('sp3'),'teep']);if(rdy3&&s3==='siren'&&dist<80)C.push([.12+.14*L,SPC('sp3'),'siren scream']);
    return card('mid',C)}
  // CLOSE deck (pressure)
  if(CMD[f.c.id])C.push([.08+.06*L,both(aw,'aP'),CMD[f.c.id].nm.toLowerCase()]);
  C.push([.06+.1*L+(O.state==='crouch'||O.crouch?.15:0),both(tw,'aP'),'overhead'],[.28,hold('aP'),'jab'],[.2,hold('bP'),'kick'],[.12,both('d','bP'),'sweep'],[.07,both('d','aP'),'low jab'],[.1,plan('walkB',12),'back off'],[.16,plan('guard',wait),'guard']);
  if(rdy&&sp==='slam')C.push([.32*(0.5+L),SPC('sp'),'bear slam']);if(rdy2&&s2==='clinch')C.push([.26*(0.5+L),SPC('sp2'),'thai clinch']);if(rdy&&!['shuriken','slam','bassdrop'].includes(sp))C.push([.07*rage,SPC('sp'),'special']);
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
    const k1=skinned(c.p1,0),k2=skinned(c.p2,1);this.p1=new Fighter(k1.skinKey||c.p1,0,false,a1);this.p2=new Fighter(k2.skinKey||c.p2,1,!this.two,c.p1===c.p2&&k1!==k2?false:a2);if(this.meters){this.p1.meter=this.meters[0];this.p2.meter=this.meters[1]}for(const f of[this.p1,this.p2])if(arch(f.c).leader)f.meter=Math.max(f.meter,34);
    // story mode: carry the super meter into the boss duel; the final boss is your own SHADOW (tougher, hits harder)
    if(RUN&&RUN.mode==='story'){if(RUN.meter)this.p1.meter=RUN.meter;if(this.p2.c.id==='ivan'&&!ORDER.includes('ivan')){this.p2.hp=this.p2.mhp=this.p2.trail=Math.round(this.p2.mhp*1.15);this.p2.boss=true}
      if(RUN.shadow){this.p2.shadow=true;this.p2.alt=false;this.p2.hp=this.p2.mhp=this.p2.trail=Math.round(this.p2.mhp*1.25)}}
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
    // hit-stop: buffered presses stay fresh; presses made during this freeze (lastA/B >= frz) do too, so A+B pressed
    // during a special's hit-stop still counts as A+B (super cancel), while presses from before it age normally
    if(frozen){if(this.frz==null)this.frz=frameNo;for(const f of[this.p1,this.p2]){for(const k of['bufA','bufB','bufF','tapF','tapB'])if(f[k]!=null)f[k]++;for(const k of['lastA','lastB'])if(f[k]>=this.frz)f[k]++}
      if(this.phase==='play'){if(pressed.a){this.p1.bufA=this.p1.lastA=frameNo}if(pressed.b){this.p1.bufB=this.p1.lastB=frameNo}if(pressed.jump)this.p1.bufF=frameNo;
        if(this.two){if(pressed2.a){this.p2.bufA=this.p2.lastA=frameNo}if(pressed2.b){this.p2.bufB=this.p2.lastB=frameNo}}}
      if(this.hitstop>0)this.hitstop--;else if(this.superFlash>0)this.superFlash--;else this.slow--;return}
    this.frz=null;
    if(this.slow>0)this.slow--;
    this.pt++;const p1=this.p1,p2=this.p2;
    if(this.phase==='intro'){if(this.pt===80){SFX.special();say('Fight!',1.1,0.6)}if(this.pt>=105)this.phase='play'}
    const none={l:0,r:0,u:0,d:0,aP:0,bP:0,sp:0,sp2:0,sp3:0,dash:0};
    const pin=this.phase==='play'?p1.cpu?aiInput(p1,p2):{l:held.left,r:held.right,u:held.up,d:held.down,aP:pressed.a,bP:pressed.b,sp:0,dz:pressed.dr?1:pressed.dl?-1:0,fh:held.jump,fP:pressed.jump}:none;
    if(this.training&&!this.trial&&pressed.select){this.dummy=DUMMY[(DUMMY.indexOf(this.dummy||'STAND')+1)%DUMMY.length];SFX.move()}
    const away=p1.x>p2.x?'l':'r',dm=this.dummy||'STAND';
    const cin=this.phase!=='play'?none:this.two?{l:held2.left,r:held2.right,u:held2.up,d:held2.down,aP:pressed2.a,bP:pressed2.b,sp:0,dz:pressed2.dr?1:pressed2.dl?-1:0,fh:held2.jump,fP:pressed2.jump}
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
    const id=this.p1.c.id,cells=st.map(k=>{const nm=k==='cmd'?CMD[id].nm:k==='tc'?TCM[id].m.nm:TNAME[k]||k,ky=k==='cmd'?'BACK+A':k==='tc'?'THEN '+TCM[id].btn.toUpperCase():TKEY[k]||'';return{nm,ky,w:Math.max(textW(nm),textW(ky))}}),tot=cells.reduce((a,c)=>a+c.w,0)+(cells.length-1)*14;let x=128-tot/2;
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
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='super'&&f.c.id==='estrella')drawFinaleBack(f);
    order.forEach(drawFighter);
    for(const p of this.proj)p.kind==='pitch'?drawPitch(p):p.kind==='drone'?drawDrone(p):p.kind==='bolt'?drawBolt(p):p.kind==='note'?drawNote(p):p.kind==='zone'?drawZone(p):p.kind==='prong'?drawProng(p):p.kind==='wave'?drawWave(p):p.kind==='quake'?drawQuake(p):p.kind==='bball'?drawBBall(p):p.kind?drawBall(p):drawStar(p);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='bassdrop'&&f.st>=10&&f.st<24)drawRing(f.x,f.st-10,f.c.col.aura,14);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='super')drawSuperFx(f);
    for(const f of[this.p1,this.p2])if(f.c.id==='reyes'&&f.state==='special'&&f.sp)drawReyesFx(f);
    for(const f of[this.p1,this.p2])if(f.c.id==='mateo')drawMateoFx(f);
    for(const f of[this.p1,this.p2])if(f.cuffed>0)drawCuffs(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='flash'&&f.sp.lx!=null&&f.st<24)drawReticle(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&f.sp.kind==='laser')drawLaser(f);
    for(const f of[this.p1,this.p2])if(f.state==='special'&&f.sp&&(f.sp.kind==='siren'||f.sp.kind==='note'||f.sp.kind==='encore'||(f.sp.kind==='super'&&f.c.id==='estrella')))drawSound(f);
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
      ctx.fillStyle='#000';for(const q of[EXC,2*EXC]){const tx=Math.round(i?x+w-w*q/100:x+w*q/100);ctx.fillRect(tx,y,1,4)}// EX costs one section
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
    const m=[['PUNCH / KICK','A / B (DOWN: LOW)'],['OVERHEAD','FWD + A (BLOCK STANDING)'],...(CMD[c.id]?[[CMD[c.id].nm,'BACK + A']]:[]),...(TCM[c.id]?[[TCM[c.id].m.nm,'KICK, THEN '+TCM[c.id].btn.toUpperCase()]]:[]),['BLOCK / DASH','HOLD BACK / TAP TWICE'],[c.spName,'SP'],...(c.sp2Name?[[c.sp2Name,'DOWN+SP']]:[]),...(c.sp3Name?[[c.sp3Name,'BACK+SP']]:[]),[SUPER_NAME[c.id],'FWD+SP, FULL BAR'],['SUPER CANCEL','SP HITS > FWD+SP'],['FOCUS','HOLD JUMP, LET GO'],['EX SPECIAL','FOCUS+SP, 1/3 BAR'],...(arch(c).type?[[arch(c).type,arch(c).trait]]:[]),['COMBO',BNB[c.id]||'']];
    const bh=18+m.length*9;box(12,22,232,bh);drawText('MOVES - '+c.name,128,26,'#ffe66a',1,{align:'center'});this.pmy=22+bh+6;
    m.forEach(([k,v],i)=>{const y=38+i*9,cm=k==='COMBO';drawText(k,18,y,cm?'#ffe66a':'#ff9a6a',1,{shadow:false});drawText(v,238,y,cm?'#ffe66a':'#fff',1,{align:'right',shadow:false})});
    ['RESUME','QUIT TO TITLE','HITBOXES: '+(SHOWBOX?'ON':'OFF')].forEach((s,i)=>drawText((this.psel===i?'> ':'  ')+s,128,this.pmy+i*11,this.psel===i?'#ffe66a':'#99a',1,{align:'center'}))}};

// ---- frame-animated fighters ----
// Key frames per animation: pk = frame where the strike lands; jump = [prep, rise, apex, fall, land];
// special = [[tick,frame],...] piecewise map over the move's own timeline. Per-fighter overrides in CH[id].ak.
const AK={punch:{pk:4},kick:{pk:4},sweep:{pk:4},lowkick:{pk:3},cpunch:{pk:2},airkick:{pk:2},airpunch:{pk:2},jump:{prep:2,rise:3,apex:5,fall:6,land:7},fall:{air:4},
  special:{fastball:[[0,0],[6,3],[12,6],[14,7],[22,8],[30,8]],knuckle:[[0,0],[6,5],[8,6],[22,7],[34,8]],note:[[0,0],[10,5],[20,7],[28,8]],knee:[[0,0],[5,3],[9,6],[22,6],[32,8]],rush:[[0,0],[7,3]],shuriken:[[0,0],[9,6],[18,8]],slam:[[0,0],[10,8]],spin:[[0,0],[40,99]],flash:[[0,0],[17,3],[18,4],[26,7],[36,8]],tome:[[0,0],[13,6],[14,7],[22,7],[34,8]],taser:[[0,0],[7,5],[8,6],[14,7],[30,8]],strike:[[0,0],[10,7],[28,8]],takeover:[[0,0],[5,2],[7,3],[11,4],[30,7]],bassdrop:[[0,0],[9,4],[10,5],[13,6],[22,7],[34,8]],throwB:[[0,0],[10,5],[12,7],[26,8]],bounce:[[0,0],[9,4],[11,6],[28,8]],charge:[[0,0],[24,5],[27,6],[30,7],[60,7],[78,8]]}};
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
    case'attack':{const a=f.atk;if(a.anim&&A[a.anim])return P(a.anim,kf(t,[[0,0],[a.s,a.pk],[a.s+a.a,a.pk],[a.s+a.a+a.r,last(a.anim)]]));
      const k={jab:'punch',kick:'kick',leap:A.airpunch?'airpunch':'punch',sweep:A.lowkick?'lowkick':'sweep',cjab:A.cpunch?'cpunch':null}[a.name];
      if(k&&A[k])return strike(k,a,t);if(a.crouch&&A.crouch)return{...P('crouch',last('crouch')),limbs:true};return null}
    case'focus':return A.block?P('block',Math.min(last('block'),t/3)):null;
    case'hurt':if(f.crumple&&A.fall)return P('fall',Math.min(3,t/14));if(f.hurtK==='crouch'&&A.crouch)return P('crouch',last('crouch'));return A.hurt?P('hurt',Math.min(t/3,last('hurt'))):null;
    case'yield':if(A.kneel)return P('kneel',Math.min(t/4,last('kneel')));return A.hurt?P('hurt',last('hurt')):null;
    case'kneel':return A.kneel?P('kneel',Math.min(t/4,last('kneel'))):A.hurt?P('hurt',last('hurt')):null;
    case'taunt':return A.taunt?P('taunt',(t/6)%n('taunt')):P('idle',(frameNo/7)%n('idle'));
    case'grabbed':return A.hurt?P('hurt',last('hurt')):null;
    case'leave':return f.st<60||!A.walk?P('idle',0):P('walk',Math.floor(frameNo/6)%n('walk'));
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
      if(s&&(s.two||s.kind==='laser'||s.kind==='teep'||s.kind==='siren'||s.kind==='eagle'||s.kind==='hover'||s.kind==='snag')){const k=s.kind;
        if(k==='slide')return A.special2?P('special2',kf(t,[[0,0],[8,4],[10,5],[28,7],[40,8]])):null;
        if(k==='snag')return A.special3?P('special3',s.caught?kf(t-s.caught,[[0,5],[6,7],[16,8]]):kf(t,[[0,0],[4,3],[22,4],[36,5]])):null;
        if(k==='eagle')return A.special3?P('special3',kf(t,[[0,0],[4,4],[8,6],[20,7],[34,8]])):null;
        if(k==='hover')return A.hover?P('hover',t<4?t/2:2+((t>>1)%(n('hover')-2))):A.airkick?P('airkick',akOf(f.c,'airkick').pk):null;
        if(k==='drone')return A.special2?P('special2',kf(t,[[0,0],[10,4],[26,8]])):null;
        if(k==='siren')return A.special3?P('special3',kf(t,[[0,0],[5,4],[28,6],[38,8]])):null;
        if(k==='encore')return A.special2?P('special2',kf(t,[[0,0],[12,5],[30,8]])):null;
        if(k==='teep')return A.special3?P('special3',kf(t,[[0,0],[6,3],[8,4],[18,6],[30,8]])):null;
        if(k==='step'){if(!A.walk)return null;return t<4?(A.crouch?P('crouch',2):P('idle',0)):P('walk',Math.floor(t/1.5)%n('walk'))}
        if(k==='counter'){if(s.trig==null)return A.block?P('block',Math.min(t,last('block'))):null;const kk=t-s.trig;return A.kick?P('kick',kf(kk,[[0,1],[7,4],[16,5],[24,7]])):null}
        if(k==='charge')return A.special?P('special',t<8?t/8*5:t<30?7+((t>>2)&1):8):null;
        if(k==='rising'){const a=A.airkick?'airkick':'kick';return A[a]?P(a,kf(t,[[0,0],[4,2],[14,last(a)],[26,last(a)]])):null}
        if(k==='replay')return P('idle',last('idle')-(Math.floor(t/1.5)%n('idle')));
        if(k==='cuff')return A.special2?P('special2',kf(t,[[0,0],[4,2],[12,5],[34,last('special2')]])):null;
        if(k==='laser'){const a=A.special3?'special3':A.special2?'special2':null;return a?P(a,a==='special3'?kf(t,[[0,0],[8,5],[9,6],[13,7],[26,8],[34,4]]):kf(t,[[0,0],[12,Math.min(5,last(a))],[34,last(a)]])):null}
        if(k==='clinch')return A.special2?P('special2',s.ph==='hold'?3+((t-s.t0)%12)/12*4:s.ph==='let'?8:Math.min(3,t/3)):null;
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
function blitA(img,x,y,fc,ax,ay,rot,pivotC,ox,oy,ph,sc=1){ctx.save();ctx.translate(Math.round(x+ox),Math.round(GY-y+oy));
  if(rot){if(pivotC){ctx.translate(0,-ph/2);ctx.rotate(rot);ctx.translate(0,ph/2)}else ctx.rotate(rot)}
  ctx.scale(fc*sc,sc);ctx.drawImage(img,-Math.round(ax),-ay);ctx.restore()}
const A0=(f,k)=>!!(f.c.anim&&f.c.anim[k]);
function drawFighter(f){const P=pose(f);if(!P)return drawFighterLegacy(f);
  const c=f.c,a=c.anim[P.k],fr=a.fr[P.i],fc=f.face,t=f.st;let img=f.shadow?sil(fr,'#1a1030'):f.hue!=null?hueOf(fr,f.hue,f.sat,f.whiten):f.alt?altOf(fr):fr;if(f.flash>0&&(f.flash&1)&&!F.cinema)img=sil(fr,'#ffffff');
  let rot=0,pivotC=false,ox=0,oy=0;if(f.state==='grabbed'){rot=f.rot||0;pivotC=true}if(f.state==='hurt'&&t<6)ox=-fc*2+(t&1?1:-1);if(f.state==='yield'&&!A0(f,'kneel'))oy=3;
  // hurt reactions by where the hit landed: high = head snaps back, mid = doubles over, low = legs buckle, crouch = jolted down
  if(f.state==='hurt'){const k=Math.max(0,1-t/16),K=f.hurtK;if(K==='high')rot=-fc*.16*k;else if(K==='mid')rot=fc*.1*k;else if(K==='low'){rot=-fc*.05*k;oy=Math.round(3*k)}else if(K==='crouch'){oy=Math.round(2*k);ox=-fc*3*k+(t&1?1:-1)}}
  if(f.vari&&!f.shadow&&!(f.flash>0&&(f.flash&1)&&!F.cinema))img=dressed(img,fr,f.vari,P.k,P.i,P.k==='punch'&&A0(f,'punch')?akOf(f.c,'punch').pk:-1,f.c.H);
  const sc=f.vari?f.vari.sc:1,B=(im,x,y)=>blitA(im,x,y,fc,a.ax+(im.padX||0),a.ay+(im.padY||0),rot,pivotC,ox,oy,f.H,sc);
  for(const g of f.ghosts){ctx.globalAlpha=g.l/20;B(sil(fr,g.c||c.col.aura),g.x,g.y);ctx.globalAlpha=1}
  if(f.state==='special'&&(t<10||f.sp&&f.sp.ex)||F.superFlash>0&&F.superBy===f||f.state==='focus'){const p=(frameNo&2)?2:1,col=f.state==='focus'?(t<FOCUS.lv2?'#ffffff':t<FOCUS.lv3?'#ffb03a':'#ff3a3a'):f.sp&&f.sp.ex?((frameNo>>2)&1?'#5ae8ff':'#ffffff'):c.col.aura;ctx.globalAlpha=f.state==='focus'?.45+.25*((frameNo>>1)&1):.6;for(const[dx,dy]of[[-p,0],[p,0],[0,-p]])B(sil(fr,col),f.x+dx,f.y-dy);ctx.globalAlpha=1}
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
function miniNote(x,y,c,a=1){x=Math.round(x);y=Math.round(y);ctx.globalAlpha=a;ctx.fillStyle='#120e1e';ctx.fillRect(x-3,y,5,4);ctx.fillRect(x+1,y-6,2,8);ctx.fillRect(x+1,y-7,5,3);
  ctx.fillStyle=c;ctx.fillRect(x-2,y+1,3,2);ctx.fillRect(x+2,y-5,1,6);ctx.fillRect(x+2,y-6,3,1);ctx.globalAlpha=1}
function twinkle(x,y,r,c,a=1){x=Math.round(x);y=Math.round(y);ctx.globalAlpha=a;ctx.fillStyle=c;ctx.fillRect(x-r,y,r*2+1,1);ctx.fillRect(x,y-r,1,r*2+1);ctx.fillStyle='#fff';ctx.fillRect(x-1,y-1,3,3);ctx.fillRect(x,y,1,1);ctx.globalAlpha=1}
function drawFinaleBack(f){const s=f.sp,t=f.st,out=t>100?Math.max(0,(118-t)/18):1,cx=Math.round(f.x),cy=Math.round(GY-f.H*.55);
  ctx.fillStyle=`rgba(6,0,18,${Math.min(.72,t/14*.72)*out})`;ctx.fillRect(-4,-4,W+8,H+8);
  if(t>=16){const a0=Math.min(1,(t-16)/8)*out,C=['255,74,168','58,232,255','255,210,58','176,74,255'];
    for(let i=0;i<4;i++){const bx=24+i*70,gx=bx+Math.sin(t*.06+i*1.9)*90,g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,`rgba(${C[i]},${.4*a0})`);g.addColorStop(1,`rgba(${C[i]},0)`);
      ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(bx-3,-4);ctx.lineTo(bx+3,-4);ctx.lineTo(gx+22,GY);ctx.lineTo(gx-22,GY);ctx.fill()}}
  const kick=s.beat!=null?Math.max(0,1-(t-s.beat)/10):0,sr=Math.min(1,t/22)*44*(1+kick*.18);
  if(sr>1){ctx.save();ctx.translate(cx,cy);ctx.rotate(t*.025);ctx.globalAlpha=.4*out;const gl=ctx.createRadialGradient(0,0,2,0,0,sr*1.3);gl.addColorStop(0,'rgba(255,230,140,.9)');gl.addColorStop(1,'rgba(255,230,140,0)');
    ctx.fillStyle=gl;ctx.beginPath();ctx.arc(0,0,sr*1.3,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.6*out;ctx.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?sr*.45:sr;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}
    ctx.closePath();ctx.fillStyle='rgba(255,200,60,.35)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#ffd23a';ctx.stroke();ctx.restore();ctx.globalAlpha=1}
  const sa=Math.min(1,t/10)*out,g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,`rgba(255,245,200,${.5*sa})`);g.addColorStop(1,`rgba(255,245,200,${.12*sa})`);
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(cx-7,-4);ctx.lineTo(cx+7,-4);ctx.lineTo(cx+34,GY);ctx.lineTo(cx-34,GY);ctx.fill();
  ctx.fillStyle=`rgba(255,245,200,${.3*sa})`;ctx.beginPath();ctx.ellipse(cx,GY+1,36,6,0,0,Math.PI*2);ctx.fill();
  if(t>=22&&t<108){const a=out*Math.min(1,(t-22)/6);
    for(let i=0;i<32;i++){const x=i*8+2,h=Math.round(3+Math.abs(Math.sin(t*.21+i*1.37))*6+kick*(10+Math.abs(Math.sin(i*2.3+t*.05))*16)),c=i<11?'#ff4aa8':i<22?'#ffd23a':'#3ae8ff';
      ctx.globalAlpha=.55*a;ctx.fillStyle=c;ctx.fillRect(x,GY-h,6,h);ctx.globalAlpha=.9*a;ctx.fillStyle='#fff';ctx.fillRect(x,GY-h,6,1)}ctx.globalAlpha=1}}
// Reyes: the SABR drone (a little quadcopter with spinning rotors and a blinking light), its laser bolts, his move effects
function drawDrone(p){const X=Math.round(p.x),Y=Math.round(GY-p.y),b=(frameNo>>1)&1;
  ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(X,GY+1,12,2,0,0,Math.PI*2);ctx.fill();ctx.save();ctx.translate(X,Y);ctx.scale(1.5,1.5);const x=0,y=0;
  ctx.fillStyle='#14161c';ctx.fillRect(x-10,y-2,20,2);ctx.fillRect(x-11,y-4,2,3);ctx.fillRect(x+9,y-4,2,3);
  ctx.fillStyle='rgba(220,226,236,.85)';ctx.fillRect(x-15+b*2,y-5,10-b*4,1);ctx.fillRect(x+5+b*2,y-5,10-b*4,1);
  ctx.fillStyle='#3a3e48';ctx.fillRect(x-5,y-3,10,6);ctx.fillStyle='#6a7a30';ctx.fillRect(x-4,y-2,8,2);ctx.fillStyle='#fff';ctx.fillRect(x-1,y-2,2,1);
  ctx.fillStyle='#14161c';ctx.fillRect(x-1,y+3,3,2);if(p.flash>0){ctx.fillStyle='#ffe0a0';ctx.fillRect(x-2,y+4,5,3)}
  ctx.fillStyle=(frameNo>>3)&1?'#ff3a3a':'#3a8aff';ctx.fillRect((frameNo>>3)&1?x+4:x-5,y-4,1,1);ctx.restore()}
function drawBolt(p){const x=p.x,y=GY-p.y,l=Math.hypot(p.vx,p.vy)||1,ux=p.vx/l,uy=-p.vy/l;ctx.lineCap='round';
  ctx.strokeStyle='rgba(255,60,40,.35)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x-ux*12,y-uy*12);ctx.lineTo(x,y);ctx.stroke();
  ctx.strokeStyle='#ff4a2a';ctx.lineWidth=2;ctx.stroke();ctx.strokeStyle='#fff0c0';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-ux*6,y-uy*6);ctx.lineTo(x,y);ctx.stroke()}
function drawPitch(p){const x=Math.round(p.x),y=Math.round(GY-p.y),d=Math.sign(p.vx);
  if(p.heat){for(let i=0;i<6;i++){ctx.fillStyle=i<2?'rgba(255,240,160,.9)':i<4?'rgba(255,150,40,.7)':'rgba(255,60,20,.45)';ctx.beginPath();ctx.arc(x-d*i*4,y+Math.sin(frameNo*.9+i)*1.2,Math.max(1,5-i*.6),0,Math.PI*2);ctx.fill()}}
  else{ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(Math.min(x,x-d*14),y-1,14,1);ctx.fillRect(Math.min(x,x-d*9),y+1,9,1)}
  ctx.fillStyle='#120e1e';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#e02a2a';const a=p.rot;ctx.fillRect(Math.round(x+Math.cos(a)*2)-1,Math.round(y+Math.sin(a)*2),1,1);ctx.fillRect(Math.round(x-Math.cos(a)*2),Math.round(y-Math.sin(a)*2),1,1)}
// the pitcher's tells: a flame over his cap when the next pitch is a heater, the glove's catch flash
function drawMateoFx(f){if((f.pitchN>=2||f.heatNext)&&!(f.state==='special'&&f.sp&&f.sp.kind==='super')){const x=Math.round(f.x),y=Math.round(GY-f.y-f.H-6),k=(frameNo>>2)&1;
    ctx.fillStyle='#ff5a1a';ctx.fillRect(x-2,y-3-k,5,5+k);ctx.fillStyle='#ffd23a';ctx.fillRect(x-1,y-1-k,3,3+k);ctx.fillStyle='#fff8c0';ctx.fillRect(x,y,1,2)}
  const s=f.sp;if(f.state==='special'&&s&&s.kind==='snag'&&s.caught&&f.st-s.caught<8)twinkle(f.x+f.face*16,GY-f.y-f.H*.75,4,'#7ad8ff',1-(f.st-s.caught)/8)}
function drawReyesFx(f){const s=f.sp,t=f.st,fc=f.face;
  if(s.kind==='knuckle'||(s.kind==='super'&&!s.ph)){if(t<6||t>=26)return;const fx=f.x+fc*30,fy=GY-f.y-f.H*.6,a=t>20?(26-t)/6:1;
    for(let i=0;i<7;i++){const d=i*5,r=6-i*.7,c=i<2?'255,250,210':i<4?'255,190,60':'255,80,30';ctx.fillStyle=`rgba(${c},${a*(1-i/8)})`;ctx.beginPath();ctx.arc(fx-fc*d,fy+Math.sin((t+i)*1.3)*1.5,Math.max(1,r),0,Math.PI*2);ctx.fill()}return}
  if(s.kind==='eagle'||(s.kind==='super'&&s.ph==='rise')){const k=s.kind==='eagle'?t:t-s.t0;if(k>=26)return;const a=k>18?(26-k)/8:1;
    for(let i=0;i<3;i++){ctx.fillStyle=['rgba(255,58,58,','rgba(255,255,255,','rgba(58,106,255,'][i]+(a*.7)+')';ctx.fillRect(Math.round(f.x-6+i*4-fc*2),Math.round(GY-f.y),3,Math.round(Math.min(40,f.y+6)))}
    if((k>>1)&1)twinkle(f.x+fc*10,GY-f.y-f.H*1.05,3,'#ffd23a',a);return}
  if(s.kind==='hover'){const lx=Math.round(f.x+fc*14),ly=Math.round(GY-f.y-f.H*.22),ph=(t>>1)&1;ctx.lineWidth=2;
    for(let i=0;i<2;i++){ctx.strokeStyle=i===ph?'rgba(255,255,255,.8)':'rgba(255,120,90,.55)';ctx.beginPath();ctx.arc(lx-fc*4,ly+i*6,12+i*3,fc>0?-1.1:Math.PI-1.1+0,fc>0?1.1:Math.PI+1.1);ctx.stroke()}
    ctx.fillStyle='rgba(220,230,240,.45)';for(let i=0;i<4;i++){const dy=((t*3+i*9)%24);ctx.fillRect(Math.round(f.x-12+i*8),Math.round(GY-f.y+4+dy),1,4)}return}
  if(s.kind==='super'&&s.dr){for(const d of s.dr)drawDrone({x:d.x,y:d.y,flash:s.zap&&d===s.dr[s.zap.i]&&t-s.t0-s.zap.k<3?2:0});
    const o=f===F.p1?F.p2:F.p1;if(s.zap&&s.ph==='call'&&t-s.t0-s.zap.k<3){const d=s.dr[s.zap.i];ctx.lineCap='round';ctx.strokeStyle='rgba(255,60,40,.4)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(d.x,GY-d.y+4);ctx.lineTo(o.x,GY-o.y-o.H*.55);ctx.stroke();ctx.strokeStyle='#ffe0c0';ctx.lineWidth=1.5;ctx.stroke()}}}
// Estrella's sound: a gold music note, a ring of sound on the floor, the scream cone, the super's spotlight and rings
function drawNote(p){const x=Math.round(p.x),y=Math.round(GY-p.y),a=Math.min(1,p.life/30),hr=15+Math.sin(p.life*.25)*3;ctx.globalAlpha=a;
  const g=ctx.createRadialGradient(x,y,1,x,y,hr);g.addColorStop(0,'rgba(255,220,90,.6)');g.addColorStop(.6,'rgba(255,120,200,.18)');g.addColorStop(1,'rgba(255,120,200,0)');ctx.fillStyle=g;ctx.fillRect(x-hr,y-hr,hr*2,hr*2);
  twinkle(x+Math.cos(p.life*.2)*12,y+Math.sin(p.life*.2)*8,2,'#fff3a0',a);twinkle(x-Math.cos(p.life*.2)*12,y-Math.sin(p.life*.2)*8,1,'#ff9ad8',a);ctx.globalAlpha=a;
  ctx.fillStyle='#120e1e';ctx.fillRect(x-5,y+1,7,6);ctx.fillRect(x+1,y-9,3,12);ctx.fillRect(x+1,y-10,7,4);
  ctx.fillStyle='#ffd23a';ctx.fillRect(x-4,y+2,5,4);ctx.fillRect(x+2,y-8,1,11);ctx.fillRect(x+2,y-9,5,2);ctx.fillStyle='#fff3a0';ctx.fillRect(x-3,y+2,2,1);ctx.globalAlpha=1}
function drawZone(p){const x=Math.round(p.x),a=Math.min(1,p.life/20),pu=(p.glow||0)*8/12;ctx.globalAlpha=a*.95;
  ctx.fillStyle=`rgba(255,74,168,${.12+pu*.03})`;ctx.beginPath();ctx.ellipse(x,GY-2,30,5,0,0,Math.PI*2);ctx.fill();
  for(let i=0;i<3;i++){const rw=26+i*5+(pu?(8-pu)*2:0)+((frameNo>>3)&1);ctx.strokeStyle=i===0?'#ffd23a':i===1?'#ff4aa8':'rgba(90,122,255,.7)';ctx.lineWidth=pu?3:2;ctx.beginPath();ctx.ellipse(x,GY-2,rw,4+i,0,0,Math.PI*2);ctx.stroke()}
  if(pu){const g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,'rgba(255,240,190,0)');g.addColorStop(1,`rgba(255,240,190,${pu/8*.4})`);ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-8,0);ctx.lineTo(x+8,0);ctx.lineTo(x+30,GY);ctx.lineTo(x-30,GY);ctx.fill();
    for(let i=0;i<7;i++){const h=Math.round(pu/8*(8+((i*5)%3)*6+(i===3?8:0))),c=i<2?'#ff4aa8':i<5?'#ffd23a':'#3ae8ff';ctx.fillStyle=c;ctx.fillRect(x-24+i*7,GY-2-h,5,h);ctx.fillStyle='#fff';ctx.fillRect(x-24+i*7,GY-2-h,5,1)}}
  ctx.globalAlpha=1;for(const n of p.fx||[])miniNote(n.x,n.y,n.c,Math.min(a,n.l/12))}
function drawSound(f){const s=f.sp,t=f.st,fc=f.face,mx=Math.round(f.x+fc*14),my=Math.round(GY-f.y-f.H*.72);
  if(s.kind==='note'){if(t>=3&&t<16)twinkle(mx+fc*4,my,Math.min(7,t-2),'#ffd23a',t<12?1:(16-t)/4);return}
  if(s.kind==='encore'){if(t>=4&&t<14)twinkle(mx,my,Math.min(6,t-3),'#ff4aa8',t<10?1:(14-t)/4);return}
  if(s.kind==='siren'){if(t<5||t>=30)return;const a0=t>24?(30-t)/6:1;twinkle(mx,my,4+((t>>1)&1)*2,'#3ae8ff',a0);
    for(let i=0;i<4;i++){const r=((t-5)*5+i*16)%72+6,a=Math.max(0,1-r/76)*a0,s0=fc>0?-.62:Math.PI-.62,s1=fc>0?.62:Math.PI+.62;
      ctx.globalAlpha=a*.3;ctx.lineWidth=7;ctx.strokeStyle=i%2?'#5a7aff':'#ffd23a';ctx.beginPath();ctx.arc(mx,my,r,s0,s1);ctx.stroke();
      ctx.globalAlpha=a;ctx.lineWidth=2;ctx.strokeStyle='#3ae8ff';ctx.beginPath();ctx.arc(mx-fc,my,r,s0,s1);ctx.stroke();
      ctx.strokeStyle='#ff4aa8';ctx.beginPath();ctx.arc(mx+fc,my,r,s0,s1);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(mx,my,r,s0,s1);ctx.stroke()}
    ctx.globalAlpha=.55*a0;ctx.fillStyle='#ffffff';for(let i=0;i<5;i++){const d=((t*7+i*23)%60)+10,yy=my+(i-2)*7*(d/50);ctx.fillRect(Math.round(mx+fc*d),Math.round(yy),fc*Math.round(8+d/8),1)}ctx.globalAlpha=1;return}
  // GRAND FINALE (in front of the fighters): thick glowing rings of sound with notes riding them, notes off the mic
  for(const r of s.rings||[]){const a=Math.max(0,1-r.r/280),cy=GY-f.H*.5,ry=r.r*.55,w=r.fin?1.6:1;
    ctx.globalAlpha=a*.25;ctx.strokeStyle=r.fin?'#ffffff':r.c;ctx.lineWidth=10*w;ctx.beginPath();ctx.ellipse(f.x,cy,r.r,ry,0,0,Math.PI*2);ctx.stroke();
    ctx.globalAlpha=a*.8;ctx.lineWidth=4*w;ctx.strokeStyle=r.fin?'#ffe66a':r.c;ctx.stroke();ctx.globalAlpha=a;ctx.lineWidth=1.5;ctx.strokeStyle='#ffffff';ctx.stroke();
    for(let i=0;i<6;i++){const an=i*Math.PI/3+r.r*.012;miniNote(f.x+Math.cos(an)*r.r,cy+Math.sin(an)*ry,r.c,a)}}ctx.globalAlpha=1;
  for(const n of s.notes||[])miniNote(n.x,n.y,n.c,Math.min(1,n.l/15));
  if(t>=14&&t<74)twinkle(mx,my,3+((t>>1)&3),'#fff3a0',1)}
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
  next(){if(RUN.mode==='story'){if(this.win){RUN.level++;go(Cutscene,SCENE_AT[Math.min(RUN.level,4)])}else go(Continue);return}
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
// the matchmaking server; ?net=http://localhost:PORT points a dev build at a local copy (localhost only)
const NET_URL=(()=>{const q=new URLSearchParams(location.search).get('net');return q&&/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(q)?q:'https://bonfire-bash-net.thecrossroads.workers.dev'})();
const RTC_ICE=[{urls:'stun:stun.cloudflare.com:3478'},{urls:'stun:stun.l.google.com:19302'}];
const NET={noP2P:/[?&]relay=1/.test(location.search),pc:null,dc:null,ws:null,via:'',relayPeer:false,vsName:'',role:null,status:'',lock:false,D:4,sim:0,lf:0,loc:{},rem:{},acc:0,stall:0,hashes:{},peerH:{},sess:0,desyncs:0,rtt:0};
function netReset(){try{NET.dc&&NET.dc.close()}catch(e){}try{NET.pc&&NET.pc.close()}catch(e){}try{NET.ws&&NET.ws.close()}catch(e){}
  Object.assign(NET,{pc:null,dc:null,ws:null,via:'',relayPeer:false,vsName:'',role:null,code:'',status:'',err:'',lock:false,sim:0,lf:0,loc:{},rem:{},acc:0,stall:0,hashes:{},peerH:{},snap:null,pick:null,peerPick:null,gone:false})}
const waitIce=pc=>new Promise(r=>{if(pc.iceGatheringState==='complete')return r();const t=setTimeout(r,2500);pc.addEventListener('icegatheringstatechange',()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);r()}})});
async function api(path,body){const r=await fetch(NET_URL+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{});let j={};try{j=await r.json()}catch(e){}return{status:r.status,...j}}
// two ways to talk: a direct browser-to-browser channel (WebRTC), or the server relay (a WebSocket through the room).
// Both open at once; the direct link wins if it comes up within RELAY_WAIT, else the match runs over the relay
// (phones on mobile data often can't make direct links). Messages are accepted from either.
const RELAY_WAIT=7000,dcOpen=()=>!!(NET.dc&&NET.dc.readyState==='open'),relayOK=()=>!!(NET.ws&&NET.ws.readyState===1&&NET.relayPeer);
function netSend(m){try{const s=JSON.stringify(m);if(dcOpen())NET.dc.send(s);else if(NET.ws&&NET.ws.readyState===1)NET.ws.send(s)}catch(e){}}
function toRelay(){NET.via='relay';if(NET.status!=='connected'){NET.status='connected';netPing()}}
function wireDC(dc){if(NET.noP2P)return;NET.dc=dc;dc.onopen=()=>{NET.via='direct';NET.status='connected';netPing()};dc.onclose=()=>{if(dc!==NET.dc)return;if(relayOK())toRelay();else netLost()};dc.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(x){return}netMsg(m)}}
function wirePC(pc){pc.onconnectionstatechange=()=>{if(pc!==NET.pc||!['failed','disconnected','closed'].includes(pc.connectionState))return;
    if(relayOK())toRelay();else if(!(NET.ws&&NET.ws.readyState<=1&&NET.status!=='connected'))netLost()}}
function relayOpen(code,role){if(!window.WebSocket)return;let ws;try{ws=new WebSocket(NET_URL.replace(/^http/,'ws')+'/room/'+code+'/ws?role='+role)}catch(e){return}NET.ws=ws;
  ws.onmessage=e=>{if(NET.ws!==ws)return;let m;try{m=JSON.parse(e.data)}catch(x){return}
    if(m.t==='peer'){NET.relayPeer=true;setTimeout(()=>{if(NET.ws===ws&&NET.status!=='connected'&&!dcOpen())toRelay()},NET.noP2P?300:RELAY_WAIT);return}
    if(m.t==='peerleft'){NET.relayPeer=false;setTimeout(()=>{if(NET.ws===ws&&NET.via==='relay'&&!dcOpen())netLost()},1500);return}
    netMsg(m)};
  ws.onclose=()=>{if(NET.ws!==ws)return;NET.ws=null;NET.relayPeer=false;if(NET.via==='relay'&&!dcOpen())netLost()}}
function netPing(){netSend({t:'ping',at:performance.now()})}
async function netHost(){netReset();NET.role='host';NET.status='creating';
  try{const pc=NET.pc=new RTCPeerConnection({iceServers:RTC_ICE});wirePC(pc);wireDC(pc.createDataChannel('bonfire',{ordered:true}));
    await pc.setLocalDescription(await pc.createOffer());await waitIce(pc);
    const r=await api('/room',{offer:pc.localDescription.sdp});if(!r.code)throw new Error('no code');if(NET.pc!==pc)return;NET.code=r.code;NET.status='waiting';relayOpen(r.code,'host');
    for(let i=0;i<300&&NET.pc===pc&&!pc.remoteDescription;i++){await new Promise(z=>setTimeout(z,1500));if(NET.pc!==pc)return;
      const a=await api('/room/'+r.code+'/answer');if(a.answer&&NET.pc===pc){await pc.setRemoteDescription({type:'answer',sdp:a.answer});if(NET.status!=='connected')NET.status='connecting'}}
    if(NET.pc===pc&&!pc.remoteDescription){NET.status='error';NET.err='NOBODY JOINED'}
  }catch(e){if(NET.role==='host'){NET.status='error';NET.err='CAN\'T REACH THE SERVER'}}}
async function netJoin(code){netReset();NET.role='guest';NET.code=code;NET.status='connecting';
  try{const o=await api('/room/'+code);if(!o.offer){NET.status='error';NET.err=o.error==='room full'?'THAT ROOM IS FULL':'NO ROOM WITH THAT CODE';return}
    relayOpen(code,'guest');const pc=NET.pc=new RTCPeerConnection({iceServers:RTC_ICE});wirePC(pc);pc.ondatachannel=e=>wireDC(e.channel);
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
  case'pick':NET.peerPick=m.id&&CH[m.id]&&ORDER.includes(m.id)?{id:m.id,skin:!!m.skin}:null;break;// ignore fighters this version doesn't have
  case'start':if(CH[m.p1]&&CH[m.p2])netBegin(m);break;
  case'i':if(m.s===NET.sess)NET.rem[m.f]=m.v;break;
  case'h':if(m.s===NET.sess){NET.peerH[m.f]=m.h;netCheck(m.f)}break;
  case'rq':if(NET.role==='host'&&scene===Fight&&NET.lock)netSend({t:'snap',s:NET.sess,f:NET.sim,d:snapState()});break;
  case'snap':if(m.s===NET.sess){if(NET.sim<m.f)NET.snap=m;else applySnap(m.d)}break;
  case'bye':netLost();break}}
// inputs: held directions (bits 0-3) + presses since the last sample (bits 4-11)
const NK=['left','right','up','down'],NP=['left','right','up','down','a','b','start','select'];
function edgeBits(){let v=0;NP.forEach((k,i)=>{if(pressed[k])v|=1<<(4+i)});if(pressed.dl)v|=1<<13;if(pressed.dr)v|=1<<14;if(pressed.jump)v|=1<<15;return v}
function heldBits(){let v=0;NK.forEach((k,i)=>{if(held[k])v|=1<<i});if(held.jump)v|=1<<12;return v}
function applyIn(v,H,P){NK.forEach((k,i)=>{H[k]=!!(v&(1<<i))});NP.forEach((k,i)=>{P[k]=!!(v&(1<<(4+i)))});H.a=P.a;H.b=P.b;H.start=P.start;H.select=P.select;H.tap=P.tap=false;H.jump=!!(v&(1<<12));P.dl=!!(v&(1<<13));P.dr=!!(v&(1<<14));P.jump=!!(v&(1<<15))}
function netBegin(cfg){NET.sess=cfg.s;NET.D=cfg.D;NET.lock=true;NET.sim=0;NET.lf=cfg.D;NET.loc={};NET.rem={};NET.acc=0;NET.stall=0;NET.hashes={};NET.peerH={};NET.snap=null;
  for(let i=0;i<cfg.D;i++)NET.loc[i]=NET.rem[i]=0;frameNo=0;fade.a=0;fade.dir=0;fade.cb=null;setTwo(false);
  RUN={mode:'online',p1:cfg.p1,ladder:[cfg.p2],idx:0,cont:0,score:NET.score||[0,0],skin:cfg.skin,alt:[false,false]};NET.score=RUN.score;go(VS)}
// returns false when the opponent's input for this frame hasn't arrived yet (the game waits)
function netStep(){NET.acc|=edgeBits();
  if(NET.lf<=NET.sim+NET.D){const v=heldBits()|NET.acc;NET.acc=0;NET.loc[NET.lf]=v;netSend({t:'i',s:NET.sess,f:NET.lf,v});NET.lf++}
  const f=NET.sim,a=NET.loc[f],b=NET.rem[f];if(a===undefined||b===undefined){if(++NET.stall>600)netLost();return false}
  NET.stall=0;const host=NET.role==='host';applyIn(host?a:b,held,pressed);applyIn(host?b:a,held2,pressed2);
  delete NET.loc[f-60];delete NET.rem[f-60];NET.sim++;return true}
const SNAPF=['x','y','vx','vy','hp','trail','meter','face','stun','st','ast','inv','spCD','spCD2','spCD3','combo','comboT','cuffed','zap','buff','chain','crouch','jug','state','hitDone','dj','ko','fArm','crumple'];
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
// ---- the lobby: who's online right now; challenge anyone who's free (server/worker.js keeps the list) ----
// names come from two word lists (the server only accepts these), so nobody types anything and there's nothing to moderate
const LOBBY_ADJ=['IRON','SWIFT','BRAVE','MIGHTY','GOLDEN','SILENT','ROYAL','LUCKY','NEON','STEEL','WILD','HUMBLE','BOLD','TRUE','NOBLE','QUICK','STORM','FIRE','STONE','BRIGHT'];
const LOBBY_NOUN=['TIGER','LION','EAGLE','BEAR','FIST','DRAGON','FALCON','WOLF','RAM','SHIELD','HAMMER','COMET','KNIGHT','RAVEN','BISON','SHARK','HAWK','MONK','OX','FOX'];
const LOB={id:null,key:null,name:'',players:[],n:0,gen:0,out:null,inc:null,vs:null,note:'',noteT:0,err:'',rename:null};
const pick=a=>a[(Math.random()*a.length)|0],lobbyName=()=>pick(LOBBY_ADJ)+' '+pick(LOBBY_NOUN);
async function lobbyApi(path,extra){try{return await api('/lobby/'+path,{id:LOB.id,key:LOB.key,...(extra||{})})}catch(e){return{status:0,error:'net'}}}
function lobbyNote(s){LOB.note=s;LOB.noteT=200}
function lobbyStart(){const g=++LOB.gen;Object.assign(LOB,{id:null,key:null,players:[],n:0,out:null,inc:null,vs:null,err:'',rename:null});
  if(!LOB.name){try{LOB.name=localStorage.getItem('bb_lobby_name')||''}catch(e){}if(!LOB.name)LOB.name=lobbyName()}
  (async()=>{let fails=0;while(g===LOB.gen){
      if(!LOB.id){const r=await lobbyApi('join',{name:LOB.name});if(g!==LOB.gen)return;
        if(r.id){Object.assign(LOB,{id:r.id,key:r.key,name:r.name,err:''});lobbyView(r);fails=0}else{fails++;LOB.err=r.error==='full'?'THE LOBBY IS FULL, TRYING AGAIN':'CAN\'T REACH THE SERVER'}}
      else{const x={};if(LOB.rename){x.name=LOB.rename;LOB.rename=null}const r=await lobbyApi('beat',x);if(g!==LOB.gen)return;
        if(r.status===410){LOB.id=null;continue}if(r.players){if(r.name&&!LOB.rename)LOB.name=r.name;lobbyView(r);fails=0;LOB.err=''}else if(++fails>2)LOB.err='CAN\'T REACH THE SERVER'}
      await new Promise(z=>setTimeout(z,LOB.out||LOB.inc||LOB.vs?1000:3000))}})()}
function lobbyStop(){LOB.gen++;if(LOB.id){const b={id:LOB.id,key:LOB.key};api('/lobby/leave',b).catch(()=>{})}LOB.id=null;LOB.out=LOB.inc=LOB.vs=null}
function lobbyRejoin(){lobbyStop();lobbyStart()}// a failed match: leave and come back so nobody stays marked busy
function lobbyView(r){LOB.players=r.players||[];LOB.n=r.n||0;for(const m of r.inbox||[])lobbyMsg(m)}
function lobbyMsg(m){const who=(LOB.players.find(p=>p.id===m.from)||{}).name||'THEY';
  if(m.t==='challenge'){if(LOB.inc||LOB.out||LOB.vs){lobbyApi('reply',{to:m.from,accept:false});return}LOB.inc={id:m.from,name:m.name,t:performance.now()};try{SFX.bell()}catch(e){SFX.ok()}}
  else if(m.t==='cancel'){if(LOB.inc&&LOB.inc.id===m.from){LOB.inc=null;lobbyNote(who+' CALLED IT OFF')}}
  else if(m.t==='decline'){if(LOB.out&&LOB.out.id===m.from){lobbyNote(LOB.out.name+' SAID NO THANKS');LOB.out=null}}
  else if(m.t==='accept'){if(LOB.out&&LOB.out.id===m.from){LOB.vs={id:m.from,name:m.name,role:'host',t:performance.now()};LOB.out=null;SFX.start();lobbyHostMatch()}}
  else if(m.t==='code'){const v=LOB.vs;if(v&&v.id===m.from&&v.role==='guest'&&!v.code){v.code=m.code;netJoin(m.code);NET.vsName=v.name}}}
// the challenger hosts: make a room the usual way, then hand its code to the opponent through the lobby
async function lobbyHostMatch(){const v=LOB.vs;netHost();NET.vsName=v.name;
  for(let i=0;i<60&&LOB.vs===v;i++){await new Promise(z=>setTimeout(z,250));if(NET.code){lobbyApi('code',{to:v.id,code:NET.code});return}}}
const Online={enter(){setTwo(false);this.ph=this.ph==='msg'?'msg':'menu';this.sel=0;this.ls=0;this.code=[0,0,0,0];this.ci=0;playMusic('select')},
  items:['LOBBY','HOST WITH A CODE','JOIN WITH A CODE','BACK'],
  update(){const ph=this.ph;if(LOB.noteT>0)LOB.noteT--;
    if(ph==='menu'){const n=this.items.length;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
      if(pressed.b||((pressed.a||pressed.start)&&this.sel===3)){SFX.back();go(Title);Title.ph='menu';return}
      if(pressed.a||pressed.start){SFX.ok();if(this.sel===0){this.ph='lobby';this.ls=0;lobbyStart()}else if(this.sel===1){this.ph='host';netHost()}else{this.ph='join';this.ci=0}}return}
    if(ph==='lobby'){this.lobbyUpdate();return}
    if(ph==='join'){if(pressed.left){this.ci=Math.max(0,this.ci-1);SFX.move()}if(pressed.right){this.ci=Math.min(3,this.ci+1);SFX.move()}
      if(pressed.up){this.code[this.ci]=(this.code[this.ci]+1)%ONL.length;SFX.move()}if(pressed.down){this.code[this.ci]=(this.code[this.ci]+ONL.length-1)%ONL.length;SFX.move()}
      if(pressed.b){this.ph='menu';SFX.back();return}
      if(pressed.start||(pressed.a&&this.ci===3)){SFX.ok();this.ph='wait';netJoin(this.code.map(i=>ONL[i]).join(''))}else if(pressed.a){this.ci=Math.min(3,this.ci+1);SFX.move()}return}
    if(ph==='host'||ph==='wait'){if(NET.status==='connected'){SFX.start();goFade(()=>go(OnlineSelect));this.ph='done'}
      else if(NET.status==='error'){this.ph='msg';this.msg=NET.err;netReset()}
      if(pressed.b){SFX.back();netQuit();this.ph='menu'}return}
    if(ph==='msg'&&(pressed.a||pressed.b||pressed.start)){SFX.back();this.ph='menu'}},
  lobbyUpdate(){const now=performance.now();
    if(LOB.vs){const v=LOB.vs;// setting up the match
      if(NET.status==='connected'){lobbyStop();SFX.start();goFade(()=>go(OnlineSelect));this.ph='done';return}
      const fail=NET.status==='error'||(v.role==='guest'&&!v.code&&now-v.t>25000);
      if(fail||pressed.b){netQuit();netReset();lobbyRejoin();if(fail)lobbyNote('COULD NOT CONNECT. TRY AGAIN');SFX.back()}return}
    if(LOB.inc){const c=LOB.inc;if(pressed.a){LOB.inc=null;LOB.vs={id:c.id,name:c.name,role:'guest',t:now};SFX.start();lobbyApi('reply',{to:c.id,accept:true}).then(r=>{if(r.error&&LOB.vs&&LOB.vs.id===c.id){LOB.vs=null;lobbyNote(c.name+' LEFT')}})}
      else if(pressed.b||now-c.t>20000){LOB.inc=null;lobbyApi('reply',{to:c.id,accept:false});SFX.back()}return}
    if(LOB.out){if(pressed.b||now-LOB.out.t>30000){if(!pressed.b)lobbyNote('NO ANSWER FROM '+LOB.out.name);LOB.out=null;lobbyApi('cancel');SFX.back()}return}
    const n=LOB.players.length+1;this.ls=Math.min(this.ls,n-1);if(pressed.up){this.ls=(this.ls+n-1)%n;SFX.move()}if(pressed.down){this.ls=(this.ls+1)%n;SFX.move()}
    if(pressed.b){SFX.back();lobbyStop();this.ph='menu';return}
    if((pressed.a||pressed.start)&&LOB.id){if(this.ls===0){let nm;do nm=lobbyName();while(nm===LOB.name||LOB.players.some(p=>p.name===nm));LOB.name=LOB.rename=nm;try{localStorage.setItem('bb_lobby_name',nm)}catch(e){}SFX.move();return}
      const p=LOB.players[this.ls-1];if(!p)return;if(p.busy){lobbyNote(p.name+' IS BUSY');SFX.back();return}
      LOB.out={id:p.id,name:p.name,t:now};SFX.ok();lobbyApi('challenge',{to:p.id}).then(r=>{if(r.error&&LOB.out&&LOB.out.id===p.id){LOB.out=null;lobbyNote(r.error==='busy'?p.name+' IS BUSY':p.name+' LEFT')}})}},
  drawLobby(){const t=this.t,now=performance.now();box(8,36,240,140);
    drawText('LOBBY',16,40,'#ffe66a',1,{shadow:false});drawText(LOB.id?LOB.n+' ONLINE':'',240,40,'#9ad',1,{align:'right',shadow:false});ctx.fillStyle='#334';ctx.fillRect(14,50,228,1);
    if(!LOB.id){drawText(LOB.err||'JOINING THE LOBBY'+'...'.slice(0,(t>>4)%4),128,92,LOB.err?'#ff9a6a':'#ffe66a',1,{align:'center',shadow:false});drawText('B: BACK',128,160,'#778',1,{align:'center',shadow:false});return}
    const popup=LOB.vs||LOB.inc||LOB.out,rows=popup?[]:[{you:1},...LOB.players],R=8,top=clamp(this.ls-R+1,0,Math.max(0,rows.length-R));
    rows.slice(top,top+R).forEach((p,k)=>{const i=top+k,y=55+k*11,on=i===this.ls;if(on){ctx.fillStyle='rgba(255,230,106,.12)';ctx.fillRect(12,y-2,232,11)}
      if(p.you){drawText((on?'> ':'  ')+'YOU: '+LOB.name,14,y,on?'#ffe66a':'#fff',1,{shadow:false});drawText(on?'A: NEW NAME':'',242,y,'#9ad',1,{align:'right',shadow:false});return}
      drawText((on?'> ':'  ')+p.name,14,y,on?'#ffe66a':'#dde',1,{shadow:false});drawText(p.busy?'BUSY':on?'A: CHALLENGE':'READY',242,y,p.busy?'#778':on?'#ffe66a':'#7aff8a',1,{align:'right',shadow:false})});
    if(!popup&&!LOB.players.length){['NOBODY ELSE IS HERE YET.','STAY ON THIS SCREEN: NEW PLAYERS','SHOW UP HERE BY THEMSELVES.'].forEach((s,i)=>drawText(s,128,82+i*11,'#9ad',1,{align:'center',shadow:false}))}
    const nt=LOB.noteT>0?LOB.note:LOB.err;if(nt)drawText(nt,128,152,'#ff9a6a',1,{align:'center',shadow:false});
    drawText('UP/DOWN: PICK  A: CHALLENGE  B: LEAVE',128,164,'#778',1,{align:'center',shadow:false});
    const pop=(a,b,c,d)=>{box(36,80,184,60,'rgba(12,10,34,.97)','#ffe66a');drawText(a,128,87,'#9ad',1,{align:'center',shadow:false});drawText(b,128,99,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});
      drawText(c,128,113,'#ffe66a',1,{align:'center',shadow:false});drawText(d,128,127,'#9ad',1,{align:'center',shadow:false})};
    if(LOB.vs)pop(LOB.vs.role==='host'?'THEY SAID YES!':'YOU SAID YES!',LOB.vs.name,'CONNECTING'+'...'.slice(0,(t>>4)%4),'B: CANCEL');
    else if(LOB.inc)pop('A CHALLENGER!',LOB.inc.name,'WANTS TO FIGHT YOU',`A: ACCEPT  B: NO (${Math.max(0,Math.ceil(20-(now-LOB.inc.t)/1000))})`);
    else if(LOB.out)pop('CHALLENGING',LOB.out.name,'WAITING FOR AN ANSWER'+'...'.slice(0,(t>>4)%4),'B: CANCEL')},
  draw(){const t=this.t;stripes(t,'#101a38','#152048');drawText('ONLINE',128,8,'#fff',3,{align:'center',grad:FIRE,outline:'#300'});const ph=this.ph;
    if(ph==='lobby'){this.drawLobby();return}
    box(24,40,208,118);
    if(ph==='menu'){this.items.forEach((it,i)=>drawText((i===this.sel?'> ':'  ')+it,62,54+i*14,i===this.sel?'#ffe66a':'#aab',1));
      const tip=[['SEE WHO\'S ONLINE AND','CHALLENGE ANYONE WHO\'S FREE.'],['GET A 4-LETTER CODE','TO SEND A FRIEND.'],['TYPE IN A FRIEND\'S CODE.',''],['','']][this.sel];
      tip.forEach((s,i)=>drawText(s,128,118+i*10,'#9ad',1,{align:'center',shadow:false}))}
    else if(ph==='host'){drawText('YOUR ROOM CODE',128,52,'#9ad',1,{align:'center'});
      if(NET.code){drawText(NET.code,128,72,'#fff',4,{align:'center',grad:FIRE,outline:'#200'});drawText('TELL YOUR FRIEND THIS CODE.',128,114,'#fff',1,{align:'center'});
        drawText('WAITING FOR THEM TO JOIN'+'...'.slice(0,(t>>4)%4),128,130,'#ffe66a',1,{align:'center'})}
      else drawText('CREATING ROOM'+'...'.slice(0,(t>>4)%4),128,80,'#ffe66a',1,{align:'center'});drawText('B: CANCEL',128,146,'#778',1,{align:'center',shadow:false})}
    else if(ph==='join'){drawText('ENTER THE ROOM CODE',128,52,'#9ad',1,{align:'center'});
      for(let i=0;i<4;i++){const x=68+i*32,on=i===this.ci;box(x,72,26,30,on?'rgba(60,40,10,.9)':'rgba(10,10,30,.82)',on?'#ffe66a':'#556');drawText(ONL[this.code[i]],x+13,79,on?'#ffe66a':'#fff',3,{align:'center'})}
      drawText('UP/DOWN: LETTER  LEFT/RIGHT: MOVE',128,116,'#9ad',1,{align:'center',shadow:false});drawText('(OR TYPE IT)  START: JOIN  B: BACK',128,128,'#9ad',1,{align:'center',shadow:false})}
    else if(ph==='wait'||ph==='done'){drawText(NET.vsName?'CONNECTING TO '+NET.vsName:'CONNECTING TO '+(NET.code||''),128,80,'#ffe66a',1,{align:'center'});drawText('...'.slice(0,(t>>4)%4),128,96,'#ffe66a',2,{align:'center'})}
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
    drawText('ONLINE - '+(NET.vsName?'VS '+NET.vsName:'ROOM '+(NET.code||'')),128,5,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});
    ctx.save();ctx.beginPath();ctx.rect(0,16,128,140);ctx.clip();ctx.drawImage(sk.porm,4-(this.done?0:0),156-sk.porm.height);ctx.restore();
    const pp=NET.peerPick,them=pp?(pp.skin&&CH[pp.id].skin2&&CH[CH[pp.id].skin2]?CH[CH[pp.id].skin2]:CH[pp.id]):null;
    ctx.save();ctx.beginPath();ctx.rect(128,16,128,140);ctx.clip();if(them)drawMirror(them.porm,252-them.porm.width,156-them.porm.height);else{ctx.globalAlpha=.25;drawMirror(CH[ORDER[(t>>5)%ORDER.length]].porDark,160,44);ctx.globalAlpha=1}ctx.restore();
    drawText('YOU',8,20,'#ff5a5a',1,{outline:'#000'});drawText(me.name,8,30,'#fff',1,{outline:'#000'});drawText(this.done?'READY!':'CHOOSING',8,40,this.done?'#7aff8a':'#ffe66a',1,{outline:'#000'});
    drawText('OPPONENT',248,20,'#5ab4ff',1,{align:'right',outline:'#000'});drawText(pp?CH[pp.id].name:'???',248,30,'#fff',1,{align:'right',outline:'#000'});drawText(pp?'READY!':'CHOOSING',248,40,pp?'#7aff8a':'#ffe66a',1,{align:'right',outline:'#000'});if(NET.via)drawText((NET.via==='relay'?'VIA SERVER':'DIRECT')+(NET.rtt?' '+NET.rtt+'MS':''),248,50,'#9ad',1,{align:'right',outline:'#000'});
    ORDER.forEach((oid,i)=>{const S=20,x=128-ORDER.length*(S+2)/2+i*(S+2),y=158;ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,S+2,S+2);ctx.imageSmoothingEnabled=true;ctx.drawImage(CH[oid].head,x,y,S,S);ctx.imageSmoothingEnabled=false;
      if(i===this.cur&&((t>>3)&1||this.done)){ctx.strokeStyle='#ff3a3a';ctx.lineWidth=2;ctx.strokeRect(x-2,y-2,S+4,S+4)}});
    drawText((me.skin2&&CH[me.skin2]?'SELECT: COSTUME  ':'')+(this.done?'B: CHANGE':'A: READY  B: LEAVE'),128,182,'#9ad',1,{align:'center',shadow:false})}};
// ---------------- RECORDS ----------------
const Records={enter(){playMusic('select')},
  update(){if(pressed.b||pressed.a||pressed.start){SFX.back();go(Title);Title.ph='menu';Title.sel=Title.items.indexOf('RECORDS')}},
  draw(){stripes(this.t,'#120f30','#191540');drawText('RECORDS',128,6,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
    const RH=Math.min(11,Math.floor(84/ORDER.length));box(8,24,240,ORDER.length*RH+13);['FIGHTER','W-L','BEST','TRIALS'].forEach((h,i)=>drawText(h,[30,128,170,214][i],27,'#99a',1,{align:i?'center':'left',shadow:false}));
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
    names:['SID','KNOX','BUZZ','DUKE','ROCCO','JAKE','MOE','NICKY'],vary:{sc:[.9,1,1,1.08,1.18],hats:['cap','beanie','bandana','none','none'],outfit:true,weapons:['pipe','bat','knife']}},
  slinger:{id:'slinger',name:'SLINGER',hp:24,speed:1.05,power:1,def:1,jump:1,dmg:6,reach:36,score:150,ranged:true,col:{aura:'#5ad86a',skin:'#e0a070',glove:'#222',leg:'#222',foot:'#222'},sh:.72,hip:.5,
    names:['SPIKE','VINNY','ZIP','RAT','SKIDS','FLICK'],vary:{sc:[.94,1,1.06],hats:['cap','beanie','none'],outfit:true}},
  bruiser:{id:'bruiser',name:'BRUISER',hp:72,speed:.62,power:1.4,def:1,jump:1,dmg:9,reach:44,score:400,heavy:true,col:{aura:'#ffd23a',skin:'#8a5a3a',glove:'#111',leg:'#111',foot:'#111'},sh:.72,hip:.5,
    names:['TANK','MOOSE','BRICK','OX','BULL'],vary:{sc:[1,1.08,1.15],hats:['beanie','none','none'],outfit:true,weapons:['pipe','bat'],wchance:.3}}};
Object.assign(FOES,{
  blade:{id:'blade',base:'goon',hue:250,name:'BLADE',hp:26,speed:1.35,power:1,def:1,jump:1,dmg:6,reach:46,lunge:3.2,score:180,col:{aura:'#b04aff'},names:['SLICK','RAZOR','JINX','SNAKE','DASH'],vary:{sc:[.92,1,1.05],hats:['bandana','cap','none'],weapon:'knife'}},
  molotov:{id:'molotov',base:'slinger',hue:150,name:'MOLOTOV',hp:28,speed:1,power:1,def:1,jump:1,dmg:5,reach:36,score:250,ranged:true,fire:true,col:{aura:'#ff7a2a'},names:['TORCH','SPARKY','BLAZE','ASH'],vary:{sc:[.95,1,1.05],hats:['beanie','none']}},
  enforcer:{id:'enforcer',base:'bruiser',hue:0,sat:1,whiten:true,name:'ENFORCER',hp:96,speed:.7,power:1.5,def:1,jump:1,dmg:11,reach:46,score:700,heavy:true,windup:15,col:{aura:'#7ad8ff'},names:['TITAN','HAMMER','ATLAS','BOULDER'],vary:{sc:[1,1.1],hats:['none'],weapons:['pipe'],wchance:.25}}});
Object.assign(FOES,{
  chain:{id:'chain',name:'CHAIN',hp:34,speed:.9,power:1,def:1,jump:1,dmg:8,reach:60,windupA:7,score:250,col:{aura:'#7aff3a',skin:'#d09a6a',glove:'#222',leg:'#4a5a2a',foot:'#c02020'},sh:.72,hip:.5,
    names:['LINK','RUST','SCRAP','DIESEL','BOLT','GRIT'],vary:{sc:[.95,1,1.06],hats:['none'],outfit:true}},
  kicker:{id:'kicker',name:'KICKER',hp:30,speed:1.25,power:1,def:1,jump:1,dmg:7,reach:46,atkName:'kick',flyer:true,score:300,col:{aura:'#c04aff',skin:'#d8a070',glove:'#fff',leg:'#222',foot:'#fff'},sh:.72,hip:.5,
    names:['JADE','ROXY','NIKKI','KAT','VIOLET','REN'],vary:{sc:[.95,1,1.04],outfit:true}},
  // the boss of Bonfire City: cane strikes and a ground shockwave; beaten, he kneels instead of falling
  vex:{id:'vex',name:'VEX',hp:240,speed:.75,power:1.6,def:1,jump:1,dmg:12,reach:58,windupA:4,heavy:true,boss:true,score:5000,col:{aura:'#b04aff',skin:'#d8a070',glove:'#222',leg:'#3a1a4a',foot:'#111'},sh:.72,hip:.5,names:['VEX']}});
const FALLBACK_FOE={goon:'karl',slinger:'vizor',bruiser:'padre',chain:'zeke',kicker:'lawslie',vex:'hecky'};// used until a foe's own sprites exist
const LEVELS=[
  {name:'BONFIRE STREETS',bg:'story_lvl1',bgY:-38,floor:{kind:'slabs',c1:'#3c3650',c2:'#1c1828',line:'#2a2438',edge:'#8a82a0'},alt:'vizor',song:'vizor',len:768,crates:[[236,8],[476,28]],
    waves:[{at:70,foes:['goon','goon']},{at:300,foes:['goon','slinger','goon']},{at:512,foes:['goon','bruiser','chain','goon']}]},
  {name:'THE DOCKS',bg:'story_lvl2',bgY:-38,floor:{kind:'boards',c1:'#6a5034',c2:'#2e2216',line:'#3a2a18',edge:'#a07a4a'},alt:'zeke',song:'ivan',len:768,crates:[[200,22],[430,6],[650,28]],
    waves:[{at:50,foes:['goon','slinger','blade']},{at:290,foes:['bruiser','chain','blade','slinger']},{at:512,foes:['molotov','bruiser','kicker','blade','goon']}]},
  {name:'VEX TOWER',bg:'story_lvl3',alt:'vizor',song:'hecky',len:768,crates:[[180,14],[420,26],[620,10]],
    waves:[{at:60,foes:['blade','kicker','molotov','goon']},{at:290,foes:['enforcer','chain','molotov','blade']},{at:512,foes:['bruiser','kicker','enforcer','molotov','chain','blade']}]},
  {name:"VEX'S PENTHOUSE",bg:'hecky_stage',alt:'hecky',song:'rex',len:256,crates:[],
    waves:[{at:0,foes:['enforcer','blade','molotov','goon']},{at:0,foes:['vex','chain','kicker']}]}];
// The story: a city held hostage by fear, one fighter who stands up for its people (not for revenge), and mercy
// that wins where fists can't. KJV verses close each chapter.
// A scene is a list of beats:
//   {shot:{bg,cx,rain,dawn,trophy,actors:[[id,who,x,face,{state,hidden}]]}}  sets the stage: characters acted out on the backdrop
//   {s:SPEAKER,t:TEXT,do:[[id,'walk',x]|[id,'anim',state]|[id,'fade']|[id,'in',x]|[id,'face',dir]],skipIf:p1,onlyIf:p1}
//   {verse,ref}   {choice}  (waits for A)   {bg,title,sub}  (a new place: title card)
// Speakers: P = your fighter, VEX, VIC = Vex once he's turned back (Victor), FOE = the man you spared, SAM = Samson,
// N = narration. Actors (who): 'P', 'SHD' (your shadow), 'FOE', 'padre', or any henchman kind ('goon', 'chain', 'vex'...).
// {N} = your fighter's name, {F} = the spared man's name.
const SCENES={
  intro:{title:'PROLOGUE',sub:'BONFIRE CITY',beats:[
    {shot:{bg:'story_lvl1',cx:60,rain:1,actors:[['g1','goon',150,-1],['g2','chain',186,-1],['vex','vex',290,-1,{prop:'trophy'}],['P','P',-40,1]]}},
    {s:'N',t:"BONFIRE CITY. FAMILIES LOCK THEIR DOORS AT SUNDOWN. SHOPS PAY VEX TO STAY OPEN. NOBODY CALLS THE POLICE ANY MORE.",do:[['vex','walk',222]]},
    {s:'N',t:"ON THE EVE OF THE BONFIRE BASH FINALS, VEX TAKES THE ONE THING THIS CITY STILL CHEERED FOR.",do:[['P','walk',62]]},
    {s:'VEX',t:"THE BONFIRE BASH TROPHY. SOLID GOLD. TOMORROW IT WAS GOING TO BE YOURS, CHAMP. TONIGHT IT'S MINE.",do:[['vex','anim','taunt']]},
    {s:'VEX',t:"EVERY MAN HAS A PRICE. NAME YOURS. MONEY? A TITLE? A CUT OF THE WHOLE CITY?",do:[['vex','anim','idle']]},
    {s:'P',t:"I'M NOT FOR SALE. AND NEITHER ARE THE PEOPLE OF THIS CITY."},
    {s:'VEX',t:"EVERYBODY SAYS THAT ONCE. COME UP TO MY PENTHOUSE AND SAY IT AGAIN... IF YOU MAKE IT.",do:[['vex','walk',330],['g1','walk',330],['g2','walk',330]]},
    {bg:'padre_stage',title:'THAT NIGHT',sub:'THE OLD CHAPEL'},
    {shot:{bg:'padre_stage',actors:[['sam','padre',176,-1],['P','P',84,1]]},skipIf:'padre'},
    {shot:{bg:'padre_stage',actors:[['P','P',128,1]]},onlyIf:'padre'},
    {s:'SAM',t:"THEY TOOK MORE THAN A TROPHY. THEY TOOK THIS CITY'S HOPE. PEOPLE ARE AFRAID TO WALK THEIR OWN STREETS.",skipIf:'padre'},
    {arc:'why'},
    {s:'P',t:"THEN I'LL GIVE THE STREETS BACK TO THEM. ONE BLOCK AT A TIME.",skipIf:'padre'},
    {s:'SAM',t:"GO FOR THE PEOPLE, NOT FOR REVENGE. HATE CAN'T DRIVE OUT HATE. AND REMEMBER: EVEN VEX WAS SOMEBODY'S SON.",skipIf:'padre'},
    {verse:"THE LIGHT SHINETH IN DARKNESS, AND THE DARKNESS COMPREHENDED IT NOT.",ref:'JOHN 1:5'}]},
  ch2:{title:'CHAPTER 2',sub:'THE DOCKS',beats:[
    {shot:{bg:'story_lvl2',cx:40,actors:[['P','P',70,1],['foe','FOE',300,-1]]}},
    {s:'N',t:"THE DOCKS. MEN WHO OWE VEX MONEY UNLOAD HIS STOLEN CARGO ALL NIGHT, PAYING OFF DEBTS THEY CAN NEVER CLEAR.",do:[['foe','walk',168]]},
    {s:'FOE',t:"HEY... YOU. YOU COULD HAVE FINISHED ME BACK THERE. WHY DIDN'T YOU?"},
    {s:'P',t:"BECAUSE YOU'RE NOT MY ENEMY. YOU'RE ONE OF THE PEOPLE I CAME TO FIGHT FOR."},
    {s:'FOE',t:"VEX PAYS MY RENT. HE PAYS EVERYBODY'S RENT. THAT'S HOW HE OWNS YOU."},
    {s:'FOE',t:"HE MOVES HIS STOLEN CARGO THROUGH HERE. YOUR TROPHY CAME DOWN TO THE DOCKS LAST NIGHT."},
    {s:'P',t:"THEN THAT'S WHERE I'M GOING. AND YOU DON'T HAVE TO GO BACK TO HIM."},
    {s:'FOE',t:"...THE OLD CHAPEL ON 5TH STREET STILL LEAVES ITS DOORS OPEN, RIGHT? MAYBE I'LL GO AND SEE.",do:[['foe','walk',330]]},
    {verse:"FOR THE SON OF MAN IS COME TO SEEK AND TO SAVE THAT WHICH WAS LOST.",ref:'LUKE 19:10'}]},
  ivan:{title:'THE END OF THE PIER',sub:'VEX\'S ENFORCER',beats:[
    {shot:{bg:'story_lvl2',cx:380,actors:[['P','P',60,1],['ivan','ivan',330,-1]]}},
    {s:'N',t:"AT THE END OF THE PIER, A GIANT CRACKS HIS KNUCKLES. THE DOCK WORKERS STOP AND STARE.",do:[['ivan','walk',190]]},
    {s:'IVAN',t:"SO YOU ARE THE ONE MAKING NOISE ON MY DOCKS. VEX SAID YOU WOULD COME."},
    {s:'P',t:"THESE MEN WORK ALL NIGHT TO PAY DEBTS THAT NEVER END. LET THEM GO HOME."},
    {s:'IVAN',t:"BACK HOME I FOUGHT FOR MEDALS. HERE I FIGHT FOR RENT. IT IS NOTHING PERSONAL, LITTLE ONE."},
    {s:'P',t:"THEN LET'S SEE WHO'S FIGHTING FOR SOMETHING REAL."}]},
  ch3:{title:'THE DOCKS',sub:'AFTER THE FIGHT',beats:[
    {shot:{bg:'story_lvl2',cx:380,actors:[['P','P',96,1],['ivan','ivan',176,-1,{state:'down'}]]}},
    {s:'IVAN',t:"...YOU HAD ME DOWN. YOU COULD HAVE KEPT HITTING. WHY DID YOU STOP?"},
    {s:'P',t:"BECAUSE I CAME HERE TO FREE PEOPLE. THAT INCLUDES YOU."},
    {s:'IVAN',t:"VEX HOLDS MY PASSPORT. HE SAID I WOULD WORK HERE UNTIL I DIED. MAYBE I AM DONE WORKING FOR HIM.",do:[['ivan','anim','idle']]},
    {s:'IVAN',t:"GO. CLIMB HIS TOWER. I WILL SEND THESE MEN HOME TONIGHT. NOBODY WILL STOP THEM. NOT WHILE I AM HERE."},
    {bg:'story_lvl3',title:'CHAPTER 3',sub:'VEX TOWER'},
    {shot:{bg:'story_lvl3',actors:[['P','P',-40,1]]}},
    {s:'N',t:"THE DOCK WORKERS WALK HOME UNDER IVAN'S WATCH. WORD SPREADS ACROSS THE CITY: SOMEBODY IS FINALLY STANDING UP TO VEX.",do:[['P','walk',100]]},
    {s:'N',t:"IN A CONTAINER AT THE DOCKS: STOLEN GOLD, AND A KEY CARD. VEX TOWER, TOP FLOOR."},
    {s:'VEX',t:"(ON THE RADIO) YOU'RE TOUGHER THAN YOU LOOK. I RESPECT THAT. SO I SENT THE ELEVATOR DOWN FOR YOU."},
    {s:'VEX',t:"RIDE UP, SHAKE MY HAND, TAKE A SEAT AT MY TABLE. NO MORE FIGHTING. IT'S THE EASY WAY."},
    {s:'P',t:"THE EASY WAY IS HOW YOU GOT EVERYBODY IN THIS CITY. I'LL TAKE THE STAIRS.",do:[['P','walk',300]]},
    {s:'VEX',t:"THEN CLIMB, CHAMP. FORTY FLOORS, AND MY BEST MEN ARE WAITING ON EVERY ONE."},
    {verse:"STRAIT IS THE GATE, AND NARROW IS THE WAY, WHICH LEADETH UNTO LIFE.",ref:'MATTHEW 7:14'}]},
  final:{title:'FINAL CHAPTER',sub:"VEX'S PENTHOUSE",beats:[
    {shot:{bg:'hecky_stage',trophy:132,actors:[['vex','vex',196,-1],['P','P',-40,1]]}},
    {s:'N',t:"THE TOP FLOOR. THE WHOLE CITY GLITTERS BELOW. THE TROPHY SITS ON A GLASS TABLE.",do:[['P','walk',64]]},
    {s:'VEX',t:"LOOK AT IT. EVERY LIGHT DOWN THERE ANSWERS TO ME. ALL OF THIS CAN BE YOURS.",do:[['vex','anim','taunt']]},
    {s:'VEX',t:"ALL YOU HAVE TO DO IS KNEEL.",do:[['vex','anim','idle']]},
    {s:'P',t:"THOSE LIGHTS ARE PEOPLE'S HOMES. THEY WERE NEVER YOURS TO GIVE. NO."},
    {s:'VEX',t:"THEN I'LL BREAK YOU MYSELF. MEN!"}]},
  shadow:{beats:[
    {shot:{bg:'hecky_stage',actors:[['P','P',72,1],['shd','SHD',140,-1,{hidden:1}],['vex','vex',204,-1,{state:'kneel'}]]}},
    {s:'VEX',t:"YOU THINK YOU'RE BETTER THAN ME? EVERYBODY HAS A DARK SIDE, CHAMP. LET'S SEE YOURS."},
    {s:'N',t:"A SHADOW STEPS OUT OF THE DARK. EVERY GRUDGE. EVERY LIE. IT MOVES LIKE {N}. IT FIGHTS LIKE {N}.",do:[['shd','fade']]},
    {arc:'shadow'},
    {s:'N',t:"TO SAVE THIS CITY, {N} HAS TO BEAT THE ONE ENEMY NO FIST CAN REACH."},
    {verse:"FOR WE WRESTLE NOT AGAINST FLESH AND BLOOD, BUT AGAINST THE RULERS OF THE DARKNESS OF THIS WORLD.",ref:'EPHESIANS 6:12'}]},
  ending:{title:'EPILOGUE',sub:'THE LAST BLOW',beats:[
    {shot:{bg:'hecky_stage',trophy:40,actors:[['P','P',92,1],['vex','vex',176,-1,{state:'kneel'}]]}},
    {s:'N',t:"THE SHADOW BREAKS APART LIKE SMOKE. VEX'S MEN ARE GONE. IT'S JUST THE TWO OF YOU NOW."},
    {s:'VEX',t:"GO ON. FINISH IT. THAT'S HOW THIS CITY WORKS. THAT'S WHAT I WOULD DO."},
    {choice:'OFFER YOUR HAND',do:[['P','walk',124]]},
    {s:'VEX',t:"...WHY?",do:[['vex','anim','idle']]},
    {s:'P',t:"BECAUSE NOBODY IS TOO FAR GONE. NOT THAT GOON ON THE STREET. NOT ME. NOT EVEN YOU."},
    {s:'VEX',t:"I'VE HURT A LOT OF PEOPLE. I DON'T KNOW HOW TO BE ANYTHING ELSE."},
    {s:'P',t:"THEN START BY GIVING BACK WHAT YOU TOOK. ALL OF IT. AND COME ON SUNDAY. THE CHAPEL DOORS ARE OPEN."},
    {bg:'padre_stage',title:'SUNDAY MORNING',sub:'THE OLD CHAPEL'},
    {shot:{bg:'padre_stage',trophy:172,actors:[['P','P',24,1],['foe','FOE',78,1],['vex','vex',128,1,{state:'kneel'}],['sam','padre',220,-1]]},skipIf:'padre'},
    {shot:{bg:'padre_stage',trophy:172,actors:[['foe','FOE',40,1],['vex','vex',110,1,{state:'kneel'}],['P','P',220,-1]]},onlyIf:'padre'},
    {s:'N',t:"BELLS RING OVER BONFIRE CITY. THE TROPHY IS BACK ON THE ALTAR, WHERE THE TOURNAMENT BEGAN."},
    {s:'SAM',t:"FIFTY YEARS THESE DOORS HAVE STAYED OPEN. I'VE NEVER SEEN THEM DO SO MUCH GOOD IN ONE WEEK."},
    {s:'FOE',t:"I TOLD YOU I'D COME AND SEE. FRONT ROW, TOO."},
    {s:'N',t:"VEX GAVE IT ALL BACK: THE MONEY, THE DEBTS, THE DEEDS TO HALF THE STREET. NOBODY CALLS HIM VEX ANY MORE."},
    {s:'VIC',t:"MY NAME IS VICTOR. ALL MY LIFE I SAID EVERY MAN HAS A PRICE. I WAS RIGHT. MINE WAS PAID FOR ME.",do:[['vex','anim','idle']]},
    {bg:'story_lvl1',title:'ONE MONTH LATER',sub:'BONFIRE CITY'},
    {shot:{bg:'story_lvl1',cx:60,dawn:1,rivals:1,actors:[['foe','FOE',-30,1],['P','P',106,1],['vex','vex',300,-1],['ivan','ivan',330,-1]]}},
    {s:'N',t:"THE SHOPS ON 5TH STREET STAY OPEN AFTER DARK NOW. KIDS PLAY BALL IN THE STREETS AGAIN. THE CITY IS WAKING UP.",arc:'rivalsIn',do:[['foe','walk',62],['vex','walk',150]]},
    {s:'N',t:"IVAN GOT HIS PASSPORT BACK, AND STAYED. HE TEACHES WRESTLING TO DOCK KIDS FOR FREE. NOBODY CALLS HIM AN ENFORCER NOW.",do:[['ivan','walk',238]]},
    {arc:'end'},
    {s:'N',t:"NEXT WEEK, THE FINALS. TONIGHT, FOR THE FIRST TIME IN YEARS, BONFIRE CITY SLEEPS IN PEACE."},
    {verse:"FOR THIS MY SON WAS DEAD, AND IS ALIVE AGAIN. HE WAS LOST, AND IS FOUND.",ref:'LUKE 15:24'}]}};
const SCENE_AT=['intro','post1','ch3','post3','ending'];// the scene after each duel (post1/post3 lead into ch2/final), and the ending
// Every fighter's own story: why they're in it (a talk with Samson at the chapel), the two rivals whose roads cross
// theirs (a face-off before each duel, a turn after it), what their shadow knows about them, and where they end up.
// Lines use speakers P (you), SAM (Samson), N (narration) or a fighter id ('keksan', 'hecky'...).
const ARCS={
  mateo:{why:[['SAM',"MATEO. THEY SAY YOU HAVE THE BEST ARM IN BONFIRE CITY."],['P',"VEX BOUGHT MOUNDWORKS FIELD, PADRE. HE'LL KEEP IT OPEN IF I SIGN WITH HIS TEAM."],
      ['SAM',"YOUR ARM IS A GIFT, SON. DON'T SELL WHAT YOU WERE GIVEN."]],
    r1:'kai',pre1:[['kai',"MATEO! VEX SAYS ONLY ONE OF US KEEPS OUR FIELD. MY COURT OR YOUR BALLPARK."],['P',"THEN I'M SORRY, DEVANTE. I'M PITCHING TONIGHT."]],
    post1:[['kai',"...HE PLAYED US AGAINST EACH OTHER."],['P',"THE COURT AND THE BALLPARK. WE SAVE BOTH, OR NEITHER."]],
    r3:'zeke',pre3:[['zeke',"PAEZANO, BUDDY. I'VE GOT A LOT OF MONEY ON YOUR NEXT GAME. AND YOU'RE LOSING IT."],['P',"I DON'T THROW GAMES, ZEKE."]],
    post3:[['zeke',"...I'M IN DEEP WITH VEX. I DON'T KNOW HOW TO GET OUT."],['P',"YOU COME CLEAN. AND I'LL STAND RIGHT NEXT TO YOU WHEN YOU DO."]],
    shadow:"SIGN THE CONTRACT, MATEO. THE BIG LEAGUES ARE ONE SIGNATURE AWAY.",
    end:"MATEO TORE UP VEX'S CONTRACT AND KEPT MOUNDWORKS FIELD OPEN. SUNDAY GAMES ARE FREE, AND THE KIDS FROM DEVANTE'S COURT PLAY CENTER FIELD."},
  reyes:{why:[['SAM',"AGENT REYES. THE REGENCY SENT YOU TO SHUT DOWN VEX'S SMUGGLING RING."],['P',"AND I WILL. ALONE. I DON'T NEED A SQUAD, PADRE. I HAVE MY DRONES."],
      ['SAM',"A LEADER WHO TRUSTS NO ONE IS JUST A MAN STANDING BY HIMSELF, SON."]],
    r1:'vizor',pre1:[['vizor',"YOUR DRONES SEE A LOT, AGENT. MY CAMERAS SEE MORE. AND MINE ARE FOR SALE."],['P',"THEN CONSIDER THEM CONFISCATED."]],
    post1:[['vizor',"...FINE. VEX MOVES HIS CARGO THROUGH THE DOCKS AT MIDNIGHT. YOU DIDN'T HEAR IT FROM ME."],['P',"I NEED EYES ON THE CITY. YOU'RE HIRED."]],
    r3:'lawslie',pre3:[['lawslie',"THIS IS MY CITY, REYES. YOUR REGENCY DOESN'T GET TO KICK DOWN DOORS HERE."],['P',"THEN STAY OUT OF MY WAY, OFFICER."]],
    post3:[['P',"...YOU KNOW THESE STREETS. I DON'T. I COULD USE A PARTNER."],['lawslie',"NOW YOU SOUND LIKE A LEADER."]],
    shadow:"YOU DON'T NEED ANYONE, AGENT. TRUST NO ONE. FINISH THE MISSION ALONE.",
    end:"AGENT REYES TURNED DOWN HIS TRANSFER AND STAYED IN BONFIRE CITY. HIS SQUAD IS A COP, A CAMERAMAN AND A PRIEST, AND HE TRUSTS EVERY ONE OF THEM."},
  estrella:{why:[['SAM',"ESTRELLA. YOU USED TO SING IN THIS CHOIR EVERY SUNDAY."],['P',"NOW I SING IN VEX'S CLUB EVERY NIGHT. HE SAYS HE'LL MAKE ME A STAR."],
      ['SAM',"YOU WERE ALREADY SINGING TO SOMEONE BIGGER THAN A CROWD, MIJA."]],
    r1:'rex',pre1:[['rex',"ESTRELLA? VEX SAYS ONLY ONE OF US HEADLINES HIS FINALS PARTY."],['P',"THEN I GUESS IT'S ME, MARCUS."]],
    post1:[['rex',"...HE SET US UP TO FIGHT OVER HIS STAGE."],['P',"THEN LET'S BUILD OUR OWN. TOGETHER."]],
    r3:'lawslie',pre3:[['lawslie',"ESTRELLA. VEX'S CLUB IS A FRONT. YOU KNOW WHAT GOES ON BACKSTAGE."],['P',"I JUST SING. I DON'T ASK."],['lawslie',"THAT'S THE PROBLEM."]],
    post3:[['P',"...YOU'RE RIGHT. I SAW THINGS. I'LL TELL YOU ALL OF IT."],['lawslie',"THAT TOOK MORE COURAGE THAN ANY SHOW."]],
    shadow:"SING FOR THE CROWD, ESTRELLA. THE APPLAUSE IS ALL THAT MATTERS.",
    end:"ESTRELLA TURNED DOWN VEX'S RECORD DEAL AND CAME HOME TO THE CHAPEL CHOIR. ON SUNDAYS THE WHOLE STREET COMES TO HEAR HER."},
  karl:{why:[['SAM',"PAPA-LÉGUAS. I HAVEN'T SEEN YOU SINCE YOUR FATHER'S FUNERAL."],['P',"I'VE BEEN BUSY. ONE CITY TO THE NEXT. I NEVER STAY ANYWHERE LONG."],
      ['SAM',"HIS DOJO HAS BEEN EMPTY FOR TWO YEARS. VEX WANTS THE BUILDING. MAYBE IT'S TIME YOU STOPPED RUNNING."]],
    r1:'keksan',pre1:[['keksan',"THEY SAY YOU RUN A THOUSAND LEAGUES, PAPA-LÉGUAS. TRY RUNNING FROM THIS."],['P',"KEKSAN? YOU FIGHT FOR VEX NOW?"],['keksan',"HE PAYS THE TIGER GYM'S RENT. SAME AS EVERYBODY."]],
    post1:[['keksan',"...YOUR FATHER TAUGHT ME MY FIRST KICK, YOU KNOW."],['P',"THEN HELP ME OPEN HIS DOJO AGAIN. NO CAGE. NO VEX."],['keksan',"...I'D LIKE THAT."]],
    r3:'hecky',pre3:[['hecky',"THE CROSSROADS DOJO? I SIGNED IT OVER TO VEX LAST MONTH. NOTHING PERSONAL. JUST BUSINESS."],['P',"MY FATHER BUILT THAT PLACE WITH HIS OWN HANDS."]],
    post3:[['hecky',"...I'LL TEAR UP THE DEED. CALL IT A REFUND."],['P',"WHY?"],['hecky',"BECAUSE YOU STOPPED RUNNING. MAYBE I CAN STOP SELLING."]],
    shadow:"RUN, LITTLE ROAD RUNNER. THAT'S ALL YOU HAVE EVER DONE.",
    end:"PAPA-LÉGUAS STOPPED RUNNING. THE CROSSROADS DOJO OPENS AT SIX EVERY MORNING, AND HE'S ALWAYS THE FIRST ONE IN."},
  keksan:{why:[['SAM',"KEKSAN. I SAW YOU FIGHT IN VEX'S CAGE LAST WEEK. YOU WON. YOU DIDN'T SMILE."],['P',"THE TIGER GYM NEEDED THE MONEY. THE KIDS NEED SOMEWHERE TO GO AT NIGHT."],
      ['SAM',"THEN FIGHT FOR THEM IN THE OPEN, SON. NOT IN HIS CAGE."]],
    r1:'karl',pre1:[['P',"PAPA-LÉGUAS? I THOUGHT YOU LEFT THIS CITY FOR GOOD."],['karl',"I CAME BACK FOR MY FATHER'S DOJO. VEX SAYS YOU GUARD HIS STREETS NOW."],['P',"I GUARD WHAT PAYS. MOVE."]],
    post1:[['karl',"YOU'RE BETTER THAN HIS CAGE, KEKSAN. YOU ALWAYS WERE."],['P',"...THE KIDS AT MY GYM SAY THE SAME THING."]],
    r3:'lawslie',pre3:[['lawslie',"KEKSAN. YOU'RE ON MY LIST: ILLEGAL CAGE FIGHTS, THREE COUNTS."],['P',"I'M DONE WITH THE CAGE. I'M HERE FOR VEX."],['lawslie',"TELL IT TO THE JUDGE."]],
    post3:[['lawslie',"...YOU PULLED THAT LAST KNEE. YOU COULD HAVE HURT ME."],['P',"RESPECT FIRST. THEN FISTS."],['lawslie',"GO ON. I'LL WRITE IT UP AS A WARNING."]],
    shadow:"YOU LOVED THE CAGE, TIGER. THE CROWD. THE MONEY. ADMIT IT.",
    end:"KEKSAN NEVER WENT BACK TO THE CAGE. THE TIGER GYM IS FREE FOR EVERY KID IN THE CITY, AND EVERY CLASS STARTS WITH A BOW."},
  vizor:{why:[['SAM',"VIZOR. YOUR CAMERAS ARE ON EVERY CORNER OF THIS CITY. WHO ARE YOU WATCHING FOR?"],['P',"WHOEVER PAYS. VEX PAID BEST. UNTIL HE STARTED WATCHING ME BACK."],
      ['SAM',"THE TRUTH ISN'T A THING TO SELL, SON. IT'S A THING TO TELL."]],
    r1:'zeke',pre1:[['zeke',"VIZOR! YOU'VE GOT FOOTAGE OF ME AT VEX'S TABLES. HAND IT OVER."],['P',"THAT TAPE IS WORTH A LOT TO SOME PEOPLE."]],
    post1:[['P',"HERE. TAKE IT. I'M DONE SELLING PEOPLE'S WORST NIGHTS."],['zeke',"...THANKS, MAN. I THINK."]],
    r3:'lawslie',pre3:[['lawslie',"I KNOW YOU HAVE THE TAPES ON VEX. EVERY DEAL HE MADE. EVERY COP HE PAID."],['P',"AND IF I DON'T WANT TO HAND THEM OVER?"],['lawslie',"THEN I TAKE THEM."]],
    post3:[['P',"TAKE THEM. ALL OF THEM. EVEN THE ONES WITH ME IN THEM."],['lawslie',"THAT'S THE FIRST HONEST THING YOU EVER RECORDED."]],
    shadow:"I'VE SEEN EVERYTHING YOU EVER DID, VIZOR. EVERY TAPE. EVERY LIE.",
    end:"VIZOR TURNED THE CAMERAS AROUND. NOW HE FILMS THE CITY'S GOOD NEWS: OPEN SHOPS, FULL COURTS, THE CHAPEL CHOIR. EVERYBODY WATCHES."},
  padre:{why:[['N',"SAMSON WAS A PRIZEFIGHTER ONCE, BEFORE HE WAS A PRIEST. HE SWORE HE WOULD NEVER FIGHT AGAIN."],
      ['N',"FORTY YEARS AGO HE BAPTIZED A LITTLE BOY NAMED VICTOR IN THIS CHAPEL. TONIGHT THE CITY CALLS THAT BOY VEX."],
      ['P',"LORD, I SAID I WAS DONE WITH FIGHTING. GIVE ME STRENGTH ENOUGH. AND MERCY ENOUGH."]],
    r1:'rex',pre1:[['rex',"FATHER SAMSON? VEX BOOKED ME FOR HIS PARTY TONIGHT. HE'S PAYING TRIPLE."],['P',"AND WHAT IS HE REALLY PAYING YOU FOR, MARCUS?"]],
    post1:[['rex',"...YOU USED TO LET ME PRACTISE BASS IN THE CHAPEL BASEMENT."],['P',"THE DOOR'S STILL UNLOCKED, SON."]],
    r3:'hecky',pre3:[['hecky',"PADRE. I SOLD VEX THE BUILDINGS ON 5TH STREET. HALF YOUR FLOCK LIVES THERE."],['P',"THEN YOU SOLD HIM PEOPLE, HECKY."]],
    post3:[['hecky',"...HOW MUCH WOULD IT COST TO BUY THEM BACK?"],['P',"LESS THAN YOU THINK. MORE THAN MONEY."]],
    shadow:"REMEMBER THE RING, CHAMPION? THE ROAR WHEN THEY FELL? YOU MISSED IT.",
    end:"SAMSON HUNG HIS GLOVES BACK ON THE CHAPEL WALL. THE DOORS STAY OPEN, AND ON SUNDAYS VICTOR READS THE FIRST LESSON."},
  zeke:{why:[['SAM',"ZEKE. YOU OWE VEX, DON'T YOU?"],['P',"I BET ON MY OWN MATCHES. THEN I BET ON LOSING THEM. NOW HE OWNS THE STRIKE LANES."],
      ['SAM',"THEN THE FIRST THING TO WIN BACK ISN'T THE ALLEY. IT'S THE TRUTH."]],
    r1:'vizor',pre1:[['P',"VIZOR. YOU'VE GOT THE TAPE OF ME THROWING THE FINAL."],['vizor',"FIVE THOUSAND AND IT DISAPPEARS."],['P',"NAH. I'M DONE PAYING TO HIDE."]],
    post1:[['vizor',"...THE TAPE IS YOURS. WHAT WILL YOU DO WITH IT?"],['P',"SHOW IT TO EVERYONE I LIED TO."]],
    r3:'kai',pre3:[['kai',"ZEKE, VEX SAYS IF I BEAT YOU, MY DEBT IS GONE."],['P',"HE TOLD ME THE SAME ABOUT YOU, KID."]],
    post3:[['P',"HE'LL NEVER CLEAR YOUR DEBT, DEVANTÉ. HE NEEDS YOU OWING."],['kai',"...THEN WE GO UP THERE TOGETHER."]],
    shadow:"ONE MORE BET, ZEKE. JUST ONE. YOU'RE DUE.",
    end:"ZEKE OWNED UP TO EVERY THROWN MATCH. HE LOST HIS TITLE AND KEPT HIS FRIENDS. THE LANES HAVE A NEW SIGN: NO BETTING."},
  hecky:{why:[['SAM',"MR. XAVIER. YOU'RE A LONG WAY FROM YOUR PENTHOUSE."],['P',"VEX BOUGHT IT FROM ME. GOOD PRICE. I DIDN'T ASK WHERE THE MONEY CAME FROM."],
      ['P',"NOW HE RUNS THE CITY FROM MY OLD LIVING ROOM. I'D LIKE IT BACK. AND I'D LIKE TO SLEEP AT NIGHT."]],
    r1:'lawslie',pre1:[['lawslie',"HECKY XAVIER. YOUR SIGNATURE IS ON EVERY BUILDING VEX TOOK."],['P',"LEGALLY ACQUIRED, OFFICER. I HAVE VERY GOOD LAWYERS."]],
    post1:[['P',"...FINE. EVERY CONTRACT WILL BE ON YOUR DESK BY MONDAY."],['lawslie',"AND?"],['P',"AND I'LL TESTIFY."]],
    r3:'karl',pre3:[['karl',"YOU SOLD MY FATHER'S DOJO, XAVIER."],['P',"IT WAS A GOOD DEAL."],['karl',"FOR WHO?"]],
    post3:[['P',"...I'LL BUY IT BACK AND GIVE IT TO YOU. NO CONTRACT."],['karl',"JUST LIKE THAT?"],['P',"JUST LIKE THAT. IT'S A NEW THING I'M TRYING."]],
    shadow:"EVERYTHING HAS A PRICE, HECKY. YOU TAUGHT VEX THAT.",
    end:"HECKY GAVE THE 5TH STREET BUILDINGS BACK TO THE FAMILIES WHO LIVED THERE. HE KEPT ONE SUIT, AND HE WEARS IT TO CHURCH."},
  lawslie:{why:[['SAM',"OFFICER LAWSLIE. OFF DUTY?"],['P',"SUSPENDED. I ASKED WHY HALF THE PRECINCT DRIVES NEW CARS. THE CHIEF TOLD ME TO LOOK AWAY."],
      ['P',"I CAN'T. BUT I'M SO ANGRY I'M SCARED OF WHAT I'LL DO."],['SAM',"AN ANGRY HEART THAT KNOWS IT'S ANGRY CAN STILL CHOOSE MERCY."]],
    r1:'hecky',pre1:[['P',"XAVIER. YOUR NAME IS ON EVERY DEED VEX OWNS."],['hecky',"OFFICER, I HAVE VERY GOOD LAWYERS."]],
    post1:[['hecky',"...ALL RIGHT. YOU'LL HAVE THE CONTRACTS."],['P',"AND YOUR TESTIMONY."],['hecky',"...AND MY TESTIMONY."]],
    r3:'vizor',pre3:[['vizor',"I HAVE TAPES OF YOUR CHIEF TAKING VEX'S MONEY. WHAT ARE THEY WORTH TO YOU?"],['P',"NOTHING. EVIDENCE ISN'T FOR SALE."]],
    post3:[['vizor',"TAKE THEM. ALL OF THEM."],['P',"...THANK YOU. I MEAN IT."]],
    shadow:"YOU DON'T WANT JUSTICE. YOU WANT TO WATCH THEM SUFFER.",
    end:"LAWSLIE TOOK THE TAPES TO A JUDGE, NOT A NEWSPAPER. THE CHIEF RESIGNED. SHE TURNED DOWN HIS JOB AND WALKS THE 5TH STREET BEAT."},
  rex:{why:[['SAM',"MARCUS. STILL WEARING THE CROWN, I SEE."],['P',"VEX OWNS MY RECORD CONTRACT. EVERY SONG I WRITE, HE SELLS. EVERY SHOW I PLAY, HE TAKES THE DOOR."],
      ['P',"SOMETIMES THE CROWN IS ALL I'VE GOT LEFT."],['SAM',"THE CROWN WAS NEVER WHAT MADE YOU WORTH SOMETHING, SON."]],
    r1:'kai',pre1:[['kai',"MARCUS! VEX SAID HE'D SIGN ME IF I BRING YOU IN."],['P',"LITTLE BROTHER, HE SIGNED ME TOO. LOOK WHERE IT GOT ME."]],
    post1:[['kai',"...SO WHAT DO WE DO?"],['P',"WE GO TAKE OUR NAMES BACK. TOGETHER."]],
    r3:'zeke',pre3:[['zeke',"MARCUS! VEX WILL CLEAR MY DEBT IF I STOP YOU."],['P',"THEN HE'LL OWN YOU FOREVER, ZEKE. LIKE HE OWNS ME."]],
    post3:[['zeke',"...YOU'RE RIGHT. I'M DONE."],['P',"COME TO THE SHOW. FRONT ROW."]],
    shadow:"WITHOUT THE CROWN, YOU'RE NOBODY. AND YOU KNOW IT.",
    end:"MARCUS BOUGHT BACK HIS SONGS AND PLAYED A FREE SHOW ON THE CHAPEL STEPS. HE PLAYED ALL NIGHT WITHOUT THE CROWN."},
  kai:{why:[['SAM',"DEVANTÉ. THEY SAY A SCOUT CAME TO WATCH YOU PLAY."],['P',"A SCOUT FROM VEX. A WAY OUT OF HERE, IF I LOSE A FEW GAMES WHEN HE SAYS."],
      ['SAM',"MAYBE THE COURTS NEED YOU MORE THAN YOU NEED A WAY OUT."]],
    r1:'rex',pre1:[['P',"MARCUS? YOU'RE PLAYING VEX'S PARTY?"],['rex',"HE OWNS MY CONTRACT, LITTLE BROTHER. DON'T LET HIM OWN YOU TOO."]],
    post1:[['rex',"...YOU GOT BETTER."],['P',"YOU TAUGHT ME. NOW COME WITH ME."]],
    r3:'zeke',pre3:[['zeke',"KID, VEX SAYS IF I BEAT YOU, MY DEBT IS GONE."],['P',"HE SAID THE SAME TO ME ABOUT YOU."]],
    post3:[['P',"HE'LL NEVER LET EITHER OF US GO, ZEKE."],['zeke',"THEN WE STOP PLAYING HIS GAME."]],
    shadow:"TAKE THE DEAL, DEVANTÉ. LOSE A FEW GAMES. WHO WOULD EVER KNOW?",
    end:"DEVANTÉ TURNED DOWN EVERY DEAL WITH STRINGS ON IT. HE RUNS A FREE LEAGUE ON THE STREET COURT, AND THE SCOUTS COME TO HIM NOW."}};
// a fighter's scenes, built from their arc
const beatsOf=lines=>lines.map(([s,t])=>({s,t}));
function storyScene(k){const A=ARCS[RUN.p1],b=SCENES[k];
  if(k==='rival1'||k==='rival3'){const r=k==='rival1'?A.r1:A.r3,lv=k==='rival1';
    return{title:CH[r].name,sub:CH[r].nick?'"'+CH[r].nick+'"':CH[r].style,beats:[{shot:lv?{bg:'story_lvl1',cx:420,actors:[['P','P',70,1],['r',r,320,-1]]}:{bg:'story_lvl3',actors:[['P','P',70,1],['r',r,320,-1]]}},
      {s:'N',t:lv?"AT THE END OF THE STREET, SOMEONE {N} KNOWS IS WAITING.":"ONE FLOOR FROM THE TOP, ONE MORE FAMILIAR FACE.",do:[['r','walk',178]]},...beatsOf(lv?A.pre1:A.pre3)]}}
  if(k==='post1'||k==='post3'){const r=k==='post1'?A.r1:A.r3,lv=k==='post1';
    return{beats:[{shot:lv?{bg:'story_lvl1',cx:420,actors:[['P','P',96,1],['r',r,178,-1,{state:'down'}]]}:{bg:'story_lvl3',actors:[['P','P',96,1],['r',r,178,-1,{state:'down'}]]}},
      ...beatsOf(lv?A.post1:A.post3).map((x,i)=>i===0?{...x,do:[['r','anim','idle']]}:x)]}}
  const out=[];for(const x of b.beats){
    if(x.arc==='why')out.push(...beatsOf(A.why));
    else if(x.arc==='shadow')out.push({s:'SHD',t:A.shadow});
    else if(x.arc==='end')out.push({s:'N',t:A.end});
    else if(x.shot&&x.shot.rivals)out.push({...x,shot:{...x.shot,actors:[...x.shot.actors,['r1',A.r1,-40,1],['r3',A.r3,300,-1]]}});
    else if(x.arc==='rivalsIn')out.push({...x,do:[...(x.do||[]),['r1','walk',20],['r3','walk',194]]});
    else out.push(x)}
  return{...b,beats:out}}

function foeData(id){const c=FOES[id];if(c.base){const b=foeData(c.base);return{...b,...c,anim:b.anim,H:b.H,spr:b.spr,alt:b.alt,white:b.white,sh:.72,hip:.5,col:{...b.col,...c.col}}}if(c.anim)return c;const b=CH[FALLBACK_FOE[id]];return{...b,...c,anim:b.anim,H:b.H,spr:b.spr,alt:b.alt,white:b.white,fake:true}}
function startStory(p1,alt,skin){const pool=ORDER.filter(i=>i!==p1).sort(()=>Math.random()-.5);
  RUN={mode:'story',p1,ladder:[],idx:0,cont:0,alt,skin,level:0,lives:3,score:0,bosses:ARCS[p1]?[ARCS[p1].r1,'ivan',ARCS[p1].r3]:[pool[0],'ivan',pool[1]],mercy:null,vexLit:false};go(Cutscene,'intro')}
// a bust portrait (93x112) cut from an in-game sprite frame, for characters with no portrait art: the upper body, scaled up
function bust(fr,key,eyes,rim){const m=fxCache(fr);if(m['bust'+key])return m['bust'+key];
  const w=fr.width,h=fr.height,t=mk(w,h),tx=t.getContext('2d');tx.drawImage(fr,0,0);const d=tx.getImageData(0,0,w,h).data,A=(x,y)=>d[(y*w+x)*4+3]>40;
  let y0=h,y1=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(A(x,y)){y0=Math.min(y0,y);y1=y;break}
  const bh=Math.max(8,y1-y0+1),hh=Math.max(4,Math.round(bh*.16));let sx=0,n=0,hx1=0;for(let y=y0;y<y0+hh;y++)for(let x=0;x<w;x++)if(A(x,y)){sx+=x;n++;hx1=Math.max(hx1,x)}
  const hc=n?sx/n:w/2,s=clamp(Math.floor(112/(bh*.62)),2,4),c=mk(93,112),x=c.getContext('2d');x.imageSmoothingEnabled=false;
  const ox=Math.round(46-hc*s),oy=Math.round(12-y0*s);if(rim){const r=sil(fr,rim);for(const[dx,dy]of[[-1,0],[1,0],[0,-1]])x.drawImage(r,ox+dx*s,oy+dy*s,w*s,h*s)}x.drawImage(fr,ox,oy,w*s,h*s);
  if(eyes){x.fillStyle=eyes;const ey=oy+Math.round((y0+hh*.5)*s),ex=ox+Math.round((hx1-2.5)*s);x.fillRect(ex,ey,s*2,s);x.globalAlpha=.35;x.fillRect(ex-s,ey-s,s*4,s*3);x.globalAlpha=1}
  // fade the cut-off bottom edge into the dialogue box
  const g=x.createLinearGradient(0,86,0,112);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(6,4,18,.9)');x.globalCompositeOperation='source-atop';x.fillStyle=g;x.fillRect(0,86,93,26);
  return m['bust'+key]=c}
// Vex: his own PixelLab sprite (a silhouette fallback if it's missing); a gold edge once he's turned back
function vexPor(lit){const C=foeData('vex');if(!C.fake){const fr=C.anim.idle.fr[0];return lit?bust(fr,'lit',null,'#ffd23a'):bust(fr,'dark')}
  const fr=foeData('bruiser').anim.idle.fr[0];return lit?bust(hueOf(fr,130,1.2),'lit',null,'#ffd23a'):bust(sil(fr,'#0b0714'),'dark','#ff3a3a','#8a3aff')}
function foePor(){const M=RUN.mercy||{kind:'goon'},C=foeData(M.kind),fr=C.anim.idle.fr[0];
  let src=M.hue!=null?hueOf(fr,M.hue,M.sat,M.whiten):M.alt?altOf(fr):fr,k='f'+(M.hue!=null?M.hue+''+M.whiten:M.alt?'a':'');
  if(M.vari){const V={...M.vari,w:null,key:M.vari.key+'nw'};src=dressed(src,fr,V,'idle',0,-1,C.H);k+=V.key}return bust(src,k)}
// your shadow: your own portrait, black with a violet edge
function shadowPor(im){const m=fxCache(im);if(m.shd)return m.shd;const c=mk(im.width,im.height),x=c.getContext('2d'),r=sil(im,'#b04aff');
  for(const[dx,dy]of[[-2,0],[2,0],[0,-2]])x.drawImage(r,dx,dy);x.drawImage(sil(im,'#100818'),0,0);return m.shd=c}
function bgImg(k){return IMG[k]||(CH[k.replace(/_stage$/,'')]||{}).stage||(LEVELS.find(L=>L.bg===k)?CH[LEVELS.find(L=>L.bg===k).alt].stage:CH.karl.stage)}
function drawTrophy(x,y){const g=(frameNo>>3)%12;ctx.fillStyle='#120e1e';ctx.fillRect(x-9,y-26,18,27);
  ctx.fillStyle='#6a4a1a';ctx.fillRect(x-7,y-4,14,4);ctx.fillStyle='#c8902a';ctx.fillRect(x-2,y-10,4,6);ctx.fillRect(x-5,y-11,10,2);
  ctx.fillStyle='#ffd23a';ctx.fillRect(x-7,y-24,14,12);ctx.fillRect(x-9,y-22,2,6);ctx.fillRect(x+7,y-22,2,6);ctx.fillStyle='#fff3a0';ctx.fillRect(x-5,y-23,2,8);
  if(g<3){ctx.fillStyle='#fff';ctx.fillRect(x+3,y-27+g,1,5-g*2>0?5-g*2:1);ctx.fillRect(x+1,y-25,5,1)}}
// a cutscene actor: a real game character (your fighter, Samson, any henchman, Vex) walking and acting on the backdrop
function mkActor(id,who,x,face,o={}){let a;
  if(who==='P'||who==='SHD'){const k=skinned(RUN.p1,0);a=new Fighter(k.skinKey||RUN.p1,0,false,RUN.alt&&RUN.alt[0]);if(who==='SHD')a.shadow=true}
  else if(CH[who])a=new Fighter(who,1,false,false);
  else{const M=who==='FOE'?(RUN.mercy||{kind:'goon'}):{kind:who},C=foeData(M.kind);a=new Fighter('karl',1,true,false);a.c=C;a.img=C.spr;a.H=C.H;a.kind=M.kind;
    if(who==='FOE'){if(M.hue!=null){a.hue=M.hue;a.sat=M.sat;a.whiten=M.whiten}else a.alt=!!M.alt;if(M.vari)a.vari={...M.vari,w:null,key:M.vari.key+'nw'}}
    else if(C.hue!=null&&!C.fake){a.hue=C.hue;a.sat=C.sat||1;a.whiten=!!C.whiten}}
  Object.assign(a,{id,x,y:0,z:0,face,state:o.state||'idle',st:0,vx:0,vy:0,flash:0,inv:0,ghosts:[],atk:null,sp:null,alpha:o.hidden?0:1,to:null,prop:o.prop});return a}
const Cutscene={
  enter(k){this.k=k;const S=this.S=storyScene(k);this.i=0;this.title=S.title;this.sub=S.sub;this.flash=0;this.shot=null;this.actors=[];this.rain=[];
    if(!F)F={superFlash:0,cinema:false,superBy:null};this.card=S.title?110:0;this.n=0;this.prep();playMusic(k==='ending'?'ending':'select')},
  // speaker info: name, face, colour
  who(s){if(s==='SAM'&&RUN.p1==='padre')s='P';const c=CH[RUN.p1];
    return{P:{n:c.name,im:skinned(RUN.p1,0).porm,c:c.col.aura},VEX:{n:'VEX',im:vexPor(RUN.vexLit),c:RUN.vexLit?'#ffd23a':'#e0a0ff'},VIC:{n:'VICTOR',im:vexPor(true),c:'#ffd23a'},
      FOE:{n:(RUN.mercy&&RUN.mercy.name)||'SID',im:foePor(),c:'#ff9a6a'},SAM:{n:'SAMSON',im:CH.padre.porm,c:'#7ad8ff'},IVAN:{n:'IVAN',im:CH.ivan.porm,c:'#ff5a3a'},SHD:{n:'SHADOW',im:shadowPor(c.porm),c:'#b04aff'},N:{}}[s]||(CH[s]?{n:CH[s].name,im:CH[s].porm,c:CH[s].col.aura}:{})},
  fill(s){const c=CH[RUN.p1];return s.replace(/\{N\}/g,c.name).replace(/\{F\}/g,(RUN.mercy&&RUN.mercy.name)||'SID')},
  skip(b){return!!b&&((b.skipIf&&b.skipIf===RUN.p1)||(b.onlyIf&&b.onlyIf!==RUN.p1))},
  shows(b){return!!b&&!b.bg&&!b.shot&&!this.skip(b)},// beats the player reads (the test counts these)
  sp(b){const s=Array.isArray(b)?b[0]:b.s;return s==='SAM'&&RUN.p1==='padre'?'P':s},
  setShot(sh){this.shot=sh;this.actors=sh.actors.map(([id,who,x,face,o])=>mkActor(id,who,x,face,o));this.rain=sh.rain?Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,v:5+Math.random()*3})):[]},
  act(cmds){for(const[id,c,v]of cmds||[]){const a=this.actors.find(x=>x.id===id);if(!a)continue;
    if(c==='walk')a.to=v;else if(c==='anim'){a.state=v;a.st=0}else if(c==='fade')a.fadeIn=1;else if(c==='in'){a.alpha=1;a.x=v}else if(c==='face')a.face=v}},
  prep(){let b=this.S.beats[this.i];while(b&&(this.skip(b)||b.bg||b.shot)){
      if(!this.skip(b)){if(b.bg){this.title=b.title;this.sub=b.sub;this.card=110;this.shot=null;this.actors=[];if(b.bg==='padre_stage')try{SFX.bell()}catch(e){}}if(b.shot)this.setShot(b.shot)}
      b=this.S.beats[++this.i]}
    if(!b)return;this.n=0;const t=Array.isArray(b)?b[1]:b.t;
    this.lines=t?wrap(this.fill(t),this.sp(b)==='N'?38:31):b.verse?[...wrap(b.verse,38),'- '+b.ref]:[];if(!b.choice)this.act(b.do)},
  beat(){return this.S.beats[this.i]},
  len(){return this.lines.join(' ').length},
  done(){const k=this.k;if(k==='ending')goFade(()=>go(StoryEnd));else if(k==='shadow'||k==='ivan'||k==='rival1'||k==='rival3')goFade(()=>go(VS));
    else if(k==='post1'||k==='post3')goFade(()=>go(Cutscene,k==='post1'?'ch2':'final'));else goFade(()=>go(Brawl))},
  next(){this.i++;if(this.i>=this.S.beats.length){this.done();return}this.prep();if(this.i>=this.S.beats.length)this.done()},
  update(){if(this.flash>0)this.flash--;
    for(const a of this.actors){a.st++;if(a.fadeIn)a.alpha=Math.min(1,a.alpha+.02);
      if(a.to!=null){const d=a.to-a.x;if(Math.abs(d)<1.4){a.x=a.to;a.to=null;a.vx=0;a.state='idle';a.st=0}else{a.vx=Math.sign(d)*1.3;a.x+=a.vx;a.face=Math.sign(d);a.state='walk'}}}
    for(const r of this.rain){r.y+=r.v;r.x-=1.4;if(r.y>H){r.y=-6;r.x=Math.random()*(W+40)}}
    if(this.card>0){this.card--;if(this.t>15&&(pressed.a||pressed.start))this.card=0;return}
    const b=this.beat();if(!b)return;
    if(pressed.start&&this.t>20){if(this.S.beats.some(x=>x.choice))RUN.vexLit=true;SFX.back();this.i=this.S.beats.length;this.done();return}
    if(b.choice){if(pressed.a){RUN.vexLit=true;this.flash=24;try{SFX.bless()}catch(e){SFX.ok()}this.act(b.do);this.next()}return}
    this.n+=1.3;if(pressed.a||pressed.b){if(this.n<this.len()){this.n=999;return}SFX.move();this.next()}},
  // the stage: backdrop, floor, characters, rain; ground line at GL
  drawShot(){const sh=this.shot,t=this.t,L=LEVELS.find(l=>l.bg===sh.bg),bg=bgImg(sh.bg);let GL;
    if(L&&L.floor&&IMG[sh.bg]){const cx=(sh.cx||0)+Math.min(40,t*.05);ctx.fillStyle=L.floor.c2;ctx.fillRect(0,0,W,H);ctx.save();ctx.translate(0,-30);ctx.drawImage(bg,-Math.round(cx),L.bgY||0,bg.width,H);drawFloor(L.floor,cx);ctx.restore();GL=FY+12-30}
    else{ctx.fillStyle='#0a0814';ctx.fillRect(0,0,W,H);ctx.drawImage(bg,0,-40,W,H);GL=GY-40}
    ctx.fillStyle=sh.dawn?'rgba(255,160,80,.16)':this.rain.length?'rgba(10,14,40,.3)':'rgba(6,4,18,.15)';ctx.fillRect(0,0,W,H);
    if(sh.trophy){const x=sh.trophy,g=ctx.createRadialGradient(x,GL-34,3,x,GL-34,34);g.addColorStop(0,'rgba(255,220,120,.5)');g.addColorStop(1,'rgba(255,220,120,0)');ctx.fillStyle=g;ctx.fillRect(x-36,GL-70,72,72);
      ctx.fillStyle='#120e1e';ctx.fillRect(x-11,GL-14,22,14);ctx.fillStyle=sh.bg==='padre_stage'?'#e8e0d0':'#9ad8ff';ctx.fillRect(x-10,GL-13,20,3);ctx.fillStyle=sh.bg==='padre_stage'?'#8a5a3a':'rgba(154,216,255,.35)';ctx.fillRect(x-8,GL-10,16,10);drawTrophy(x,GL-14)}
    for(const a of this.actors){if(a.alpha<=0)continue;ctx.globalAlpha=a.alpha*.4;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(Math.round(a.x),GL+1,16,3,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1}
    for(const a of this.actors){if(a.alpha<=0)continue;ctx.save();ctx.globalAlpha=a.alpha;
      if(a.id==='vex'&&RUN.vexLit){const g=ctx.createRadialGradient(a.x,GL-40,4,a.x,GL-40,44);g.addColorStop(0,'rgba(255,210,90,.35)');g.addColorStop(1,'rgba(255,210,90,0)');ctx.fillStyle=g;ctx.fillRect(a.x-46,GL-90,92,92)}
      ctx.translate(0,GL-GY);drawFighter(a);ctx.restore();if(a.prop==='trophy'&&a.alpha>0)drawTrophy(Math.round(a.x+a.face*16),Math.round(GL-a.H*.42))}
    ctx.fillStyle='rgba(170,190,255,.45)';for(const r of this.rain)ctx.fillRect(Math.round(r.x),Math.round(r.y),1,5);
    ctx.fillStyle='#000';ctx.fillRect(0,0,W,14)},
  draw(){const t=this.t;
    if(this.shot)this.drawShot();else{ctx.fillStyle='#05040c';ctx.fillRect(0,0,W,H)}
    if(this.card>0||!this.beat()){this.drawCard();return}
    const b=this.beat(),sp=this.sp(b),BY=140,verse=!!b.verse,choice=!!b.choice;
    if(this.title)drawText(this.title+(this.sub?' - '+this.sub:''),128,3,'#ffe66a',1,{align:'center',shadow:false});
    box(8,BY,240,44,verse?'rgba(30,20,4,.93)':'rgba(10,8,30,.9)',verse?'#ffd23a':choice?'#ffffff':'#d04aff');
    const face=sp&&sp!=='N'&&this.who(sp);
    if(face){const im=face.im;ctx.save();ctx.beginPath();ctx.rect(12,BY+4,34,36);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(12,BY+4,34,36);ctx.drawImage(im,Math.round((im.width-64)/2),0,64,68,12,BY+4,34,36);ctx.restore();
      ctx.strokeStyle=face.c;ctx.lineWidth=1;ctx.strokeRect(11.5,BY+3.5,35,37);const nw=textW(face.n)+8;box(8,BY-11,nw,9,'rgba(10,8,30,.95)',face.c);drawText(face.n,12,BY-10,face.c,1,{shadow:false})}
    if(choice){drawText('A: '+b.choice,128,BY+12,(t>>3)&1?'#ffe66a':'#ffffff',2,{align:'center',outline:'#000'});drawText('HE WAITS FOR THE LAST BLOW.',128,BY+33,'#99a',1,{align:'center',shadow:false})}
    else{let left=Math.floor(this.n);const col=verse?'#ffd96a':sp==='N'?'#c8c4e0':'#ffffff',y0=BY+4+Math.round((4-this.lines.length)*4.5),tx=face?52:12;
      this.lines.forEach((l,i)=>{const s=l.slice(0,Math.max(0,left));left-=l.length+1;drawText(s,verse?128:tx,y0+i*9,i===this.lines.length-1&&verse?'#ffb43a':col,1,{shadow:false,align:verse?'center':'left'})});
      if(verse){ctx.fillStyle='#ffd23a';ctx.fillRect(126,BY-22,3,14);ctx.fillRect(122,BY-18,11,3)}
      if(this.n>=this.len()&&(t>>4)&1){ctx.fillStyle='#ffe66a';ctx.beginPath();ctx.moveTo(240,BY+38);ctx.lineTo(246,BY+38);ctx.lineTo(243,BY+41);ctx.fill()}}
    drawText('START: SKIP',252,H-6,'#667',1,{align:'right',shadow:false});
    if(this.flash>0){ctx.fillStyle=`rgba(255,240,200,${this.flash/24})`;ctx.fillRect(0,0,W,H)}},
  drawCard(){const k=Math.min(1,(110-this.card)/20);ctx.globalAlpha=k;ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(0,62,W,52);
    drawText(this.title||'',128,70,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});if(this.sub)drawText(this.sub,128,94,'#ffe66a',1,{align:'center',outline:'#000'});ctx.globalAlpha=1}};
// the credits after the story: the cast, Vex's men, your score, THE END
const StoryEnd={
  enter(){playMusic('ending');const c=CH[RUN.p1],r=rc(RUN.p1);r.clear++;r.story=(r.story||0)+1;saveRec();badge('story');if(ORDER.every(id=>rc(id).clear>0))badge('allclear');
    const M=(RUN.mercy&&RUN.mercy.name)||'SID',L=[['BONFIRE BASH',1],['STORY MODE',2],[''],['STARRING',3],[c.name,1],...(c.nick?[['"'+c.nick+'"',2]]:[]),[''],
      ['AND',3],['VICTOR',1],['WHO USED TO BE VEX',2],[''],['WITH',3],...(RUN.p1!=='padre'?[['SAMSON',1],['THE SHEPHERD',2]]:[]),[M,1],['WHO GOT BACK UP',2],
      ['IVAN',1],['THE BEAR, WHO SENT THEM HOME',2],...RUN.bosses.filter(b=>b!=='ivan').map(b=>[CH[b].name,1]),['THE RIVALS',2],['THE SHADOW',1],['EVERY GRUDGE YOU EVER CARRIED',2],[''],['VEX\'S MEN',3],
      ['GOONS  SLINGERS  BRUISERS',1],['BLADES  MOLOTOVS  ENFORCERS',1],[''],['FINAL SCORE',3],[String(RUN.score||0).padStart(7,'0'),1],[''],
      ['A GAME BY MARK',1],['BUILT WITH CLAUDE',2],['ART MADE WITH PIXELLAB',2],[''],['HE WAS LOST, AND IS FOUND.',3],[''],['THANK YOU FOR PLAYING',1]];
    this.L=L;this.stop=Math.ceil((H+10-(52-(L.length-1)*11))/.45)},
  update(){if(this.t>60&&(pressed.start||pressed.a)){if(this.t<this.stop){this.t=this.stop;return}goFade(()=>go(Title),.05)}},
  draw(){const t=this.t;ctx.drawImage(bgImg('padre_stage'),0,0,W,H);ctx.fillStyle='rgba(8,4,14,.78)';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,210,58,.06)';for(let i=0;i<10;i++){const a=t*.003+i*Math.PI/5;ctx.beginPath();ctx.moveTo(128,-20);ctx.lineTo(128+Math.cos(a)*300,-20+Math.abs(Math.sin(a))*300);ctx.lineTo(128+Math.cos(a+.12)*300,-20+Math.abs(Math.sin(a+.12))*300);ctx.fill()}
    const y0=Math.max(52-(this.L.length-1)*11,H+10-Math.min(t,this.stop)*.45);
    this.L.forEach(([s,k],i)=>{const y=Math.round(y0+i*11);if(!s||y<0||y>H-14)return;ctx.globalAlpha=clamp(y/24,0,1);
      drawText(s,128,y,k===1?'#ffffff':k===2?'#99a0c0':'#ffd23a',1,{align:'center',outline:'#000'});ctx.globalAlpha=1});
    if(t>=this.stop){const k=Math.min(1,(t-this.stop)/40);ctx.globalAlpha=k;drawText('THE END',128,82,'#fff',3,{align:'center',grad:FIRE,outline:'#300'});ctx.globalAlpha=1;
      if((t>>4)&1&&t>this.stop+40)drawText('PRESS START',128,170,'#ffe66a',1,{align:'center',outline:'#000'})}}};

const Brawl={
  enter(){const L=this.L=LEVELS[RUN.level];F=this;Object.assign(this,{cinema:false,superFlash:0,superBy:null,parts:[],texts:[],hitFx:[],proj:[],items:[],foes:[],cx:0,wi:0,wave:null,q:[],qT:0,goT:0,
      ph:'intro',pt:0,mercyOn:false,bossDown:null,camFlash:0,paused:false,psel:0,hitstop:0,shake:0,target:null,targetT:0,doneT:0,contN:9,supT:0});
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
  bot(){const P=this.P,o={l:0,r:0,u:0,d:0,a:0,b:0},alive=this.foes.filter(e=>!e.dead&&!e.ko&&e.state!=='down'&&e.state!=='leave'&&!(e.state==='yield'&&FOES[e.kind].boss));
    const t=alive.sort((a,b)=>Math.hypot(a.x-P.x,(a.z-P.z)*2)-Math.hypot(b.x-P.x,(b.z-P.z)*2))[0];
    const crate=this.items.find(i=>i.kind!=='crate'&&Math.abs(i.x-P.x)<160);
    if(!t){if(crate){o[crate.x>P.x?'r':'l']=1;if(Math.abs(crate.z-P.z)>3)o[crate.z>P.z?'d':'u']=1}else o.r=1;return o}
    const side=P.x<t.x?-1:1,gx=t.x+side*(t.state==='yield'?22:30),dx=gx-P.x,dz=t.z-P.z;
    if(t.state==='yield'&&Math.abs(t.x-P.x)<46&&Math.abs(dz)<10){if(frameNo%9===0)o.a=1;return o}
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
    if(i.a){const y=this.foes.find(e=>e.state==='yield'&&!FOES[e.kind].boss&&Math.abs(e.x-P.x)<50&&Math.abs(e.z-P.z)<14);if(y){this.helpUp(y);return}
      // grab a reeling enemy you're standing on, else start the combo
      const g=this.foes.find(e=>!e.dead&&e.state==='hurt'&&Math.abs(e.x-P.x)<30&&this.near(P,e,6)&&Math.sign(e.x-P.x)===P.face&&!FOES[e.kind].heavy);
      if(g){P.state='throwing';P.st=0;P.thr=g;P.knees=0;g.state='grabbed';g.st=0;g.vx=0;SFX.grab();return}
      P.chainN=0;this.atk(P,'jab');return}
    P.vx=(i.r-i.l)*1.45*P.c.speed;P.vz=(i.d-i.u)*0.95;if(P.vx)P.face=Math.sign(P.vx);P.state=P.vx||P.vz?'walk':'idle'},
  atk(f,n,fin){startAtk(f,n);f.hitIds={};if(f===this.P&&n==='kick')f.atk={...f.atk,dmg:fin?8:7,fin:!!fin};
    if(f===this.P&&f.wpn&&n==='jab'){const kn=f.wpn.kind==='knife';f.atk={...f.atk,reach:f.atk.reach+(kn?6:16),dmg:f.atk.dmg+(kn?3:5),wpn:true};SFX.whooshH&&SFX.whooshH()}},
  superMove(){const P=this.P;P.meter=0;P.state='special';P.st=0;P.vx=P.vz=0;P.atk=null;P.sp={kind:'desp',hits:0,id:++atkId,sup:true};P.inv=90;this.supT=50;
    SFX.superS();fighterVoice(P,'super')},
  toss(e,dir){const P=this.P;P.thr=null;P.state='idle';P.st=0;e.state='knock';e.st=0;e.vy=4.2;e.vx=dir*5;e.y=1;e.thrown=true;e.hp-=8;e.flash=4;SFX.slam();this.shake=6;
    if(e.hp<=0){if(this.mercyOK(e)){e.hp=1;e.yieldNext=true;this.mercyOn=true}else e.ko=true}this.score(80)},
  // Stage 1's last man standing begs for mercy; walk up and press A to help him up (he's the one who points you to the docks)
  mercyOK(e){return RUN.level===0&&!RUN.mercy&&!this.mercyOn&&this.wave&&this.wi===this.L.waves.length-1&&!this.q.length&&!this.foes.some(f=>f!==e&&!f.dead&&!f.ko)},
  helpUp(e){const P=this.P;e.state='leave';e.st=0;e.face=P.x>e.x?1:-1;RUN.mercy={kind:e.kind,name:e.name,hue:e.hue,sat:e.sat,whiten:e.whiten,alt:e.alt,vari:e.vari};
    P.state='idle';P.st=0;P.vx=P.vz=0;this.score(2000);this.addT('MERCY +2000',e.x,e.z,'#ffd23a');try{SFX.bless()}catch(x){SFX.ok()}},
  score(n){RUN.score=(RUN.score||0)+n},
  // weapons: a henchman drops his when knocked down; walk over one to pick it up (A swings it, it breaks after a few hits)
  dropWeapon(e){const v=e.vari;if(!v||!v.w||(e.c.vary&&e.c.vary.weapon))return;this.items.push({kind:'w_'+v.w,x:e.x,z:e.z,y:0,l:900});e.vari={...v,w:null,key:v.key+'x'};e.reachB=Math.round((v.sc-1)*30);e.dmgM=v.sc},
  wpnBreak(P,drop){const k=P.wpn.kind;if(drop)this.items.push({kind:'w_'+k,x:P.x,z:P.z,y:0,l:600});else{this.addT(k.toUpperCase()+' BROKE!',P.x,P.z,'#ff9a6a');this.spark(P.x+P.face*20,P.z,40,'#c8c8d0',10);SFX.block()}P.wpn=null;P.vari=null},
  // ---- damage ----
  hitFoe(e,dmg,knock,dir,snd){const P=this.P;if(e.dead||e.ko||e.inv>0||e.state==='down'||e.state==='yield'||e.state==='leave'||e.yieldNext||(e.state==='knock'&&(e.jug||0)>=1))return false;const C=FOES[e.kind];if(e.state==='knock')e.jug=(e.jug||0)+1;
    e.hp-=dmg*P.c.power*(P.buff>0?1.25:1);e.flash=4;this.target=e;this.targetT=120;P.meter=Math.min(100,P.meter+2.5);this.score(dmg*10);
    const armored=C.heavy&&!knock&&e.hp>0&&(e.state==='special'||((e.armorN=(e.armorN||0)+1)%2));
    if(e.hp<=0&&C.boss){e.hp=1;e.yieldNext=true;this.bossDown=e;this.q=[];this.addT('VEX IS DOWN! HIS MEN RUN!',e.x,e.z,'#ffd23a');SFX.cheer();
      for(const o of this.foes)if(o!==e&&!o.dead&&!o.ko){o.state='leave';o.st=60;o.atk=null;o.sp=null}knock=true}
    else if(e.hp<=0){if(this.mercyOK(e)){e.hp=1;e.yieldNext=true;this.mercyOn=true}else e.ko=true;knock=true}
    if(knock){e.state='knock';e.st=0;e.vy=3.6;e.vx=dir*2.6;e.y=Math.max(e.y,1);e.atk=null;e.sp=null;this.dropWeapon(e)}
    else if(!armored){e.state='hurt';e.st=0;e.stun=22;e.vx=dir*1.2;e.atk=null;e.sp=null}
    this.hitstop=knock?9:5;this.shake=knock?4:2;this.spark(e.x,e.z,e.y+e.H*.6,'#ffe66a',knock?12:7);(SFX[snd]||(knock?SFX.heavy:SFX.hit))();return true},
  hurtP(dmg,knock,dir){const P=this.P;if(P.inv>0||['knock','down','rise'].includes(P.state)||this.ph!=='play'&&this.ph!=='intro')return false;
    if(P.thr){if(!P.thr.ko){P.thr.state='hurt';P.thr.stun=8}P.thr=null}
    dmg*=[0.7,1,1.25][SET.diff];P.hp=Math.max(0,P.hp-dmg);P.flash=4;P.atk=null;P.sp=null;this.hitstop=6;this.shake=3;this.spark(P.x,P.z,P.y+P.H*.6,'#ff6a5a',8);SFX.hit();
    if((P.hp<=0||knock)&&P.wpn)this.wpnBreak(P,true);
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
    if(any&&P.atk&&P.atk.wpn&&P.wpn&&--P.wpn.uses<=0)this.wpnBreak(P,false);
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
    const go=(tx,tz,sp)=>{sp*=e.spd||1;tx=clamp(tx,this.cx+14,this.cx+W-14);const ax=tx-e.x,az=tz-e.z;e.vx=Math.abs(ax)>3?Math.sign(ax)*C.speed*sp:0;e.vz=Math.abs(az)>2?Math.sign(az)*.7*C.speed*sp:0;e.state=e.vx||e.vz?'walk':'idle'};
    if(C.ranged){const side=e.x<P.x?-1:1,tx=clamp(P.x+side*118,this.cx+16,this.cx+W-16);go(tx,P.z,1);
      if(pOK&&Math.abs(dz)<5&&adx>60&&e.cool<=0&&!this.proj.some(p=>p.owner===e)){e.state='special';e.st=0;e.vx=e.vz=0;e.sp={kind:'throwB',id:++atkId};e.cool=[150,115,85][D]}return}
    if(!e.tok||!pOK){const side=e.x<P.x?-1:1;go(P.x+side*(86+e.uid%3*12),clamp(P.z+(e.uid%2?14:-14),0,FZ),.55);return}
    if(C.boss&&e.cool<=0&&Math.abs(dz)<14&&adx>46&&adx<170){e.state='special';e.st=0;e.vx=e.vz=0;e.sp={kind:'slam',id:++atkId};e.cool=[200,160,120][D];return}
    if(C.flyer&&e.cool<=0&&Math.abs(dz)<5&&adx>56&&adx<120){e.state='special';e.st=0;e.vx=e.vz=0;e.sp={kind:'fly',id:++atkId,hit:false};e.cool=[170,140,110][D];return}
    if(C.heavy&&!C.boss&&e.cool<=0&&Math.abs(dz)<6&&adx>56&&adx<150){e.state='special';e.st=0;e.vx=e.vz=0;e.sp={kind:'charge',id:++atkId,hit:false};e.cool=170;return}
    const side=e.x<P.x?-1:1;go(P.x+side*30,P.z,1);
    if(adx<C.reach+(e.reachB||0)+4&&Math.abs(dz)<6&&e.cool<=0){e.state='attack';e.st=0;e.vx=e.vz=0;e.atk={...ATK.jab,name:C.atkName||'jab',s:[18,13,9][D]+(C.heavy?4:0)+(C.windupA||0),a:4,r:14,id:++atkId};e.hitDone=false}},
  foeUpdate(e){const P=this.P,C=FOES[e.kind];e.st++;if(e.ko&&!['knock','down'].includes(e.state)){e.state='knock';e.st=0;e.vy=Math.max(e.vy||0,2);e.y=Math.max(e.y,1);e.atk=null;e.sp=null}/* a KO'd enemy only ever falls */if(e.flash>0)e.flash--;if(e.inv>0)e.inv--;
    switch(e.state){
      case'idle':case'walk':this.foeAI(e);break;
      case'attack':{const a=e.atk;if(C.lunge&&e.st<a.s&&e.st>a.s-8)e.vx=e.face*C.lunge;if(e.st===a.s){SFX.whoosh()}if(e.st>=a.s&&e.st<a.s+a.a&&!e.hitDone){const dx=P.x-e.x;
          if(Math.sign(dx)===e.face&&Math.abs(dx)<C.reach+(e.reachB||0)+10&&this.near(P,e,9)&&P.y<30)e.hitDone=this.hurtP(C.dmg*(e.dmgM||1),C.heavy,e.face)||true}
        if(e.st>=a.s+a.a+a.r){e.state='idle';e.st=0;e.atk=null;e.tok=false;e.wait=[90,60,35][SET.diff]+rnd(0,40);e.cool=20}break}
      case'special':{const s=e.sp;
        if(s.kind==='throwB'){if(e.st===12){const tx=Math.abs(P.x-e.x);this.proj.push(C.fire?{kind:'molotov',x:e.x+e.face*16,z:e.z,y:52,vx:e.face*Math.max(1.4,tx/52),vy:2.2,owner:e,rot:0,life:200}:{kind:'bottle',x:e.x+e.face*16,z:e.z,y:52,vx:e.face*3.1,owner:e,rot:0,life:110});SFX.whoosh()}if(e.st>=26){e.state='idle';e.st=0;e.sp=null}}
        else if(s.kind==='slam'){if(e.st<22){if(e.st%6<3)e.flash=2}else if(e.st===22){SFX.slam();this.shake=8;this.dust(e.x+e.face*20,e.z,8);
            this.proj.push({kind:'wave',x:e.x+e.face*22,z:e.z,y:0,vx:e.face*3.2,owner:e,rot:0,life:80});if(Math.abs(P.x-e.x)<34&&this.near(P,e,10)&&P.y<20)this.hurtP(14,true,e.face)}
          else if(e.st>=50){e.state='idle';e.st=0;e.sp=null;e.tok=false;e.wait=50}}
        else if(s.kind==='fly'){if(e.st===9){e.vy=3.9;e.y=1;SFX.whoosh()}if(e.st>=9&&e.y>0){e.vx=e.face*3.4;if(!s.hit&&Math.abs(P.x-e.x)<26&&this.near(P,e,9)&&P.y<34){s.hit=true;this.hurtP(9,true,e.face)}}
          if(e.st>12&&e.y<=0){e.vx*=.6;if(e.st>44){e.state='idle';e.st=0;e.sp=null;e.tok=false;e.wait=[80,55,35][SET.diff]}}}
        else if(s.kind==='charge'){const wu=C.windup||24;if(e.st<wu){e.vx=0;if(e.st%6<3)e.flash=2}else if(e.st<wu+36){e.vx=e.face*4.2;if(e.st%3===0)this.dust(e.x,e.z,1);
            if(!s.hit&&Math.abs(P.x-e.x)<30&&this.near(P,e,10)&&P.y<30){s.hit=true;this.hurtP(12,true,e.face);SFX.slam()}
            if(e.x<this.cx+6||e.x>this.cx+W-6)e.st=wu+36}else{e.vx*=.8;if(e.st>=wu+54){e.state='idle';e.st=0;e.sp=null;e.tok=false;e.wait=60}}}
        break}
      case'hurt':if(--e.stun<=0){e.state='idle';e.st=0}break;
      case'grabbed':break;
      case'down':if(e.ko){if(e.st>50){e.dead=true;this.score(C.score);if(Math.random()<(C.heavy?.6:.12))this.items.push({kind:Math.random()<.5?'pizza':'cash',x:e.x,z:e.z,y:0,l:600})}}
        else if(e.st>=40&&!e.yieldNext){e.state='rise';e.st=0;e.inv=16}break;
      case'rise':if(e.st>=12){e.state='idle';e.st=0}break;
      case'yield':e.vx=e.vz=0;e.face=P.x>e.x?1:-1;if(e.st===2)this.addT(C.boss?'...ENOUGH.':'PLEASE... I GIVE UP!',e.x,e.z,'#fff');break;
      case'leave':if(e.st===36)this.addT('THANK YOU...',e.x,e.z,'#fff');if(e.st<60)e.vx=0;else{e.face=e.x<this.cx+W/2?-1:1;e.vx=e.face*1.3;if(e.x<this.cx-30||e.x>this.cx+W+30)e.dead=true}break}
    if(e.yieldNext&&e.state==='down'&&e.st>=34){e.yieldNext=false;e.state='yield';e.st=0;e.inv=0;e.x=clamp(e.x,this.cx+40,this.cx+W-40)}
    // a thrown enemy bowls over the others
    if(e.thrown&&e.state==='knock')for(const o of this.foes)if(o!==e&&!o.dead&&o.state!=='knock'&&Math.abs(o.x-e.x)<22&&this.near(o,e,12)){this.hitFoe(o,8,true,Math.sign(e.vx));}
    this.phys(e);
    const inside=e.x>this.cx+8&&e.x<this.cx+W-8;if(inside)e.inside=true;if(e.inside&&e.state!=='leave')e.x=clamp(e.x,this.cx+8,this.cx+W-8)},
  spawn(kind){const C=foeData(kind),right=this.q.length%2===0||this.cx<20,f=new Fighter('karl',1,true,false);
    f.c=C;f.img=C.spr;f.H=C.H;f.kind=kind;f.hp=f.mhp=C.hp*[0.8,1,1.2][SET.diff];f.x=right?this.cx+W+24:this.cx-24;f.z=rnd(4,FZ-4);f.vz=0;f.uid=++atkId;
    f.name=C.names[(Math.random()*C.names.length)|0];f.alt=!!C.fake||(kind==='goon'&&Math.random()<.4);if(C.hue!=null&&!C.fake){f.hue=C.hue;f.sat=C.sat||1;f.whiten=!!C.whiten;f.alt=false}f.wait=30+rnd(0,40);f.cool=0;
    const v=C.fake?null:rollVariant(C);if(v){f.vari=v;if(v.top!=null||v.bot!=null)f.alt=false;f.hp=f.mhp=Math.round(f.hp*Math.pow(v.sc,1.6));f.spd=1/Math.sqrt(v.sc);f.dmgM=v.sc*(v.w?1.25:1);
      f.reachB=Math.round((v.sc-1)*30)+(v.w==='pipe'||v.w==='bat'?14:v.w==='knife'?4:0);f.H=C.H*v.sc;if(v.sc>=1.15)f.name='BIG '+f.name}
    if(C.boss){f.x=this.cx+W-40;f.wait=90;this.addT('ENOUGH. I\'LL DO THIS MYSELF.',f.x,f.z,'#e0a0ff');f.name='VEX'}
    this.foes.push(f)},
  // ---- the level: camera, waves, items ----
  update(){if(this.paused){this.updatePause();return}
    if(pressed.start&&!this.P.cpu&&this.ph!=='continue'){this.paused=true;this.psel=0;SFX.ok();return}
    if(this.supT>0){if(--this.supT===0){for(const e of this.foes)if(!e.dead&&e.x>this.cx-10&&e.x<this.cx+W+10){e.inv=0;this.hitFoe(e,26,true,Math.sign(e.x-this.P.x)||1)}F.camFlash=8;this.shake=10}return}
    if(this.hitstop>0){this.hitstop--;if(pressed.a)this.P.qA=frameNo;return}
    if(this.shake>0)this.shake--;this.pt++;const P=this.P,L=this.L;
    if(this.ph==='intro'&&this.pt>80)this.ph='play';
    if(this.ph==='continue'){if(this.pt%60===0){this.contN--;SFX.tick();if(this.contN<0){goFade(()=>go(GameOver));this.ph='over'}}
      if(pressed.a||pressed.start){RUN.lives=3;RUN.cont++;RUN.score=0;this.respawn();SFX.start()}return}
    if(this.ph==='clear'){if(++this.doneT===70){RUN.meter=P.meter;const boss=RUN.level===3?RUN.p1:RUN.bosses[RUN.level];RUN.shadow=RUN.level===3;RUN.ladder=[boss];RUN.idx=0;goFade(()=>RUN.shadow?go(Cutscene,'shadow'):boss==='ivan'?go(Cutscene,'ivan'):ARCS[RUN.p1]?go(Cutscene,RUN.level===0?'rival1':'rival3'):go(VS))}return}
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
    if(this.bossDown&&this.bossDown.state==='yield'&&this.bossDown.st>80&&this.ph==='play'){this.wave=null;this.wi=L.waves.length;this.ph='clear';this.doneT=0;P.state='win';P.st=0;P.vx=P.vz=0;this.score(5000)}
    if(!this.wave&&this.wi>=L.waves.length&&P.x>=Math.min(L.len,this.cx+W)-40&&this.ph==='play'){this.ph='clear';this.doneT=0;P.state='win';P.st=0;P.vx=P.vz=0;SFX.cheer();this.score(1000)}
    for(const e of this.foes)this.foeUpdate(e);this.foes=this.foes.filter(e=>!e.dead||e.st<0);
    // projectiles (bottles)
    for(const p of this.proj){if(p.kind==='wave'){p.x+=p.vx;p.life--;if(p.life%3===0)this.dust(p.x,p.z,1);if(Math.abs(p.x-P.x)<12&&Math.abs(p.z-P.z)<10&&P.y<8&&this.hurtP(10,true,Math.sign(p.vx)))p.life=0;continue}
      if(p.kind==='fire'){p.life--;if(p.life%20===0&&Math.abs(p.x-P.x)<16&&Math.abs(p.z-P.z)<8&&P.y<=0)this.hurtP(4,false,1);continue}
      if(p.kind==='molotov'){p.x+=p.vx;p.y+=p.vy;p.vy-=.12;p.rot+=.3;if(p.y<=4){p.life=0;this.proj.push({kind:'fire',x:p.x,z:p.z,y:0,life:110,vx:0,rot:0});SFX.block();this.spark(p.x,p.z,4,'#ff9a3a',10)}
        else if(Math.abs(p.x-P.x)<10&&Math.abs(p.z-P.z)<8&&P.y<24&&p.y<60&&!['down','knock'].includes(P.state)&&this.hurtP(5,false,Math.sign(p.vx)))p.life=0;continue}
      p.x+=p.vx;p.rot+=.3;p.life--;if(Math.abs(p.x-P.x)<12&&Math.abs(p.z-P.z)<9&&P.y<24&&!['down','knock'].includes(P.state)){if(this.hurtP(6,false,Math.sign(p.vx)))p.life=0;
        for(let i=0;i<6;i++)this.parts.push({x:p.x,y:FY+p.z-p.y,vx:rnd(-2,2),vy:rnd(-2,0),l:14,c:'#7aff8a',g:.15})}}
    this.proj=this.proj.filter(p=>p.life>0&&p.x>this.cx-30&&p.x<this.cx+W+30);
    // pickups
    for(const it of this.items){if(it.kind==='crate'||it.taken)continue;it.l--;if(!(it.kind[0]==='w'&&P.wpn)&&Math.abs(it.x-P.x)<14&&Math.abs(it.z-P.z)<9&&P.y<=0&&P.state!=='knock'){it.taken=true;SFX.coin();
      if(it.kind[0]==='w'){const k=it.kind.slice(2);P.wpn={kind:k,uses:k==='knife'?12:8};P.vari={sc:1,top:null,bot:null,hat:'none',shades:false,w:k,key:'P'+k};this.addT(k.toUpperCase()+'!',it.x,it.z,'#fff')}
      else if(it.kind==='cash'){this.score(1000);this.addT('+1000',it.x,it.z,'#ffd23a')}else{const g=it.kind==='chicken'?60:30;P.hp=Math.min(P.mhp,P.hp+g);this.addT('+'+g+' HP',it.x,it.z,'#7aff8a')}}}
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
    for(const p of this.proj){if(p.kind==='wave'){const x=Math.round(p.x-cx),y=FY+p.z;ctx.globalAlpha=Math.min(1,p.life/20);for(let i=0;i<4;i++){const h=10-i*2+((frameNo+i)&3);ctx.fillStyle=i%2?'#b04aff':'#e0a0ff';ctx.fillRect(x-i*5*Math.sign(p.vx)-2,y-h,3,h)}ctx.globalAlpha=1;continue}
      if(p.kind==='fire'){const x=Math.round(p.x-cx),y=FY+p.z,a=Math.min(1,p.life/20);ctx.globalAlpha=a;for(let i=0;i<7;i++){const fx=x-12+i*4,h=4+((frameNo+i*3)%6)+(i%2)*3;
        ctx.fillStyle='#120e1e';ctx.fillRect(fx-1,y-h-1,4,h+1);ctx.fillStyle=i%2?'#ff7a2a':'#ffd23a';ctx.fillRect(fx,y-h,2,h);ctx.fillStyle='#fff3a0';ctx.fillRect(fx,y-2,2,2)}ctx.globalAlpha=1;continue}
      const x=Math.round(p.x-cx),y=Math.round(FY+p.z-p.y);ctx.save();ctx.translate(x,y);ctx.rotate(p.rot);ctx.fillStyle='#120e1e';ctx.fillRect(-5,-3,10,6);ctx.fillStyle=p.kind==='molotov'?'#a04a1a':'#3aa04a';ctx.fillRect(-4,-2,6,4);ctx.fillStyle=p.kind==='molotov'?'#ffd23a':'#7aff8a';ctx.fillRect(2,-1,3,2);ctx.restore();
      ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(x-3,FY+p.z,6,1)}
    // desperation shockwave
    if(P.state==='special'&&P.sp&&!P.sp.sup&&P.st>=8&&P.st<20){const k=P.st-8,R=14+k*4;ctx.globalAlpha=1-k/12;ctx.strokeStyle=P.c.col.aura;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(P.x-cx,FY+P.z-P.H*.4,R,R*.7,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1}
    ctx.save();ctx.translate(-cx,0);for(const h of this.hitFx)drawHitFx(h);
    for(const p of this.parts){ctx.fillStyle=p.c;ctx.globalAlpha=p.dust?Math.min(1,p.l/12)*.7:1;const s=p.dust?3:2;ctx.fillRect(p.x|0,p.y|0,s,s)}ctx.globalAlpha=1;
    for(const t of this.texts){const hw=textW(t.s)/2+4;drawText(t.s,clamp(t.x,cx+hw,cx+W-hw),t.y,t.c,1,{align:'center',outline:'#000'})}
    for(const e of this.foes)if(e.state==='yield'&&e.st>50&&!FOES[e.kind].boss){const near=Math.abs(e.x-P.x)<50&&Math.abs(e.z-P.z)<14;if(near||(frameNo>>4)&1)drawText('A: HELP HIM UP',clamp(e.x,cx+48,cx+W-48),FY+e.z-e.H-16,near?'#ffe66a':'#fff',1,{align:'center',outline:'#000'})}ctx.restore();
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
    if(P.wpn)drawText(P.wpn.kind.toUpperCase()+' '+P.wpn.uses,136,20,'#c8d0e0',1,{outline:'#000'});
    drawText('SCORE '+String(RUN.score||0).padStart(7,'0'),252,3,'#fff',1,{align:'right',outline:'#000'});
    const e=this.target;if(e&&this.targetT>0&&!e.dead){const w=60,ew=Math.max(0,Math.round(w*e.hp/e.mhp));drawText(e.name,252,13,FOES[e.kind].heavy?'#ffd23a':'#fff',1,{align:'right',outline:'#000'});
      ctx.fillStyle='#000';ctx.fillRect(252-w-2,22,w+2,6);ctx.fillStyle='#401018';ctx.fillRect(252-w-1,23,w,4);ctx.fillStyle='#ff5a3a';ctx.fillRect(252-w-1,23,ew,4)}
    const bz=this.foes.find(e=>FOES[e.kind].boss&&!e.dead&&e.state!=='yield');if(bz){const w=170,bw=Math.max(0,Math.round(w*bz.hp/bz.mhp));drawText('VEX',43,176,'#e0a0ff',1,{outline:'#000'});
      ctx.fillStyle='#000';ctx.fillRect(64,176,w+2,8);ctx.fillStyle='#301040';ctx.fillRect(65,177,w,6);ctx.fillStyle='#b04aff';ctx.fillRect(65,177,bw,6);ctx.fillStyle='#e0a0ff';ctx.fillRect(65,177,bw,1)}
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
  w_pipe(x,y){ctx.fillStyle='#120e1e';ctx.fillRect(x-11,y-5,22,4);ctx.fillStyle='#9aa2b2';ctx.fillRect(x-10,y-4,20,2);ctx.fillStyle='#e0e6f0';ctx.fillRect(x-10,y-4,20,1)},
  w_bat(x,y){ctx.fillStyle='#120e1e';ctx.fillRect(x-11,y-6,23,5);ctx.fillStyle='#b07a3a';ctx.fillRect(x-10,y-4,8,2);ctx.fillRect(x-2,y-5,13,3);ctx.fillStyle='#e0b070';ctx.fillRect(x-2,y-5,13,1);ctx.fillStyle='#5a3a2a';ctx.fillRect(x-10,y-4,3,2)},
  w_knife(x,y){ctx.fillStyle='#120e1e';ctx.fillRect(x-6,y-5,13,4);ctx.fillStyle='#5a3a2a';ctx.fillRect(x-5,y-4,4,2);ctx.fillStyle='#d8dce8';ctx.fillRect(x-1,y-4,7,2);ctx.fillStyle='#fff';ctx.fillRect(x-1,y-4,7,1)},
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
window.__dbg={poll:()=>pollInput(),Controls,CMD,TCM,TRIALS,ATK,ARCH,SPCD,Boot,clearToast:()=>{TOAST=null},Options,GameOver,textAudit:on=>{TA=on?{t:[],b:[]}:null;return TA},render:()=>render(),Brawl,Cutscene,StoryEnd,SCENES,ARCS,startStory,LEVELS,FOES,SET,onBeat,showBox:v=>{SHOWBOX=v},NET,LOB,netHost,netJoin,netQuit,Online,OnlineSelect,ORDER,Intro,BADGE_KEYS:BADGES.map(b=>b[0]),vox:VOX,rec:REC,inp2:{held2,pressed2},setTwo,Records,startThrow,canThrow,track:TRACK,mus:MUS,inp:{held,pressed},tick:()=>{frameNo++},startSpecial,startAtk,applyHit,get scene(){return scene},get F(){return F},go,Fight,Title,Select,VS,Result,Ending,Continue,set RUN(v){RUN=v},get RUN(){return RUN},CH};

