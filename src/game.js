'use strict';
// ============ WORLD DOJO — a Dojo Boy fighting game ============
const W=256,H=192,GY=176,XMIN=26,XMAX=230,GRAV=0.3;
const $=id=>document.getElementById(id);
const cv=$('screen'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t;
let frameNo=0;

// ---------------- SETTINGS ----------------
const SET={diff:1,music:true,sound:true,voice:true};
try{Object.assign(SET,JSON.parse(localStorage.getItem('worlddojo')||'{}'))}catch(e){}
function saveSet(){try{localStorage.setItem('worlddojo',JSON.stringify(SET))}catch(e){}}

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
function pollInput(){for(const k of KEYS){const h=!!(touchHeld[k]||keyHeld[k]||mouseHeld[k]);pressed[k]=(h&&!prev[k])||latch[k];latch[k]=false;held[k]=h;prev[k]=h}}
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
document.addEventListener('keydown',e=>{const k=KM[e.code];if(!k)return;e.preventDefault();unlockAudio();if(!keyHeld[k])latch[k]=true;keyHeld[k]=true;updateVis()});
document.addEventListener('keyup',e=>{const k=KM[e.code];if(!k)return;keyHeld[k]=false;updateVis()});
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
  bell:()=>{T('triangle',1318,.5,.2);T('triangle',1975,.5,.1,null,.02)},
};
function say(t,rate=0.95,pitch=0.6){if(!SET.voice||!window.speechSynthesis)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=rate;u.pitch=pitch;u.volume=1;speechSynthesis.speak(u)}catch(e){}}

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
function playMusic(name,tr=0){if(MUS.name===name&&MUS.tr===tr&&MUS.s)return;const s=SONGS[name];MUS.name=name;MUS.tr=tr;MUS.step=0;MUS.next=AU.ctx?AU.ctx.currentTime+0.06:0;
  MUS.s={...s,L:s.lead.split(/\s+/),B:s.bass.split(/\s+/),D:s.drum.split('')}}
function stopMusic(){MUS.s=null;MUS.name=null}
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
  karl:{id:'karl',name:'KARL',nick:'PAPA-LÉGUAS',style:'KARATE',country:'BRAZIL',flag:'br',ht:"6'0\" (183 CM)",wt:'165 LB (75 KG)',
    speed:1.25,power:1.0,def:1.0,jump:1.0,stats:[5,3,3],special:'rush',spName:'LÉGUA RUSH',tr:0,
    col:{skin:'#e0965c',glove:'#2c2a44',leg:'#e9e7f3',foot:'#f6f6f6',aura:'#ffd23a'},sh:.72,hip:.5,
    quote:"TOO SLOW! THEY DON'T CALL ME PAPA-LÉGUAS FOR NOTHING!",lose:'I RAN OUT OF ROAD...',stageName:'CROSSROADS DOJO'},
  akira:{id:'akira',name:'AKIRA',nick:'THE SHADOW',style:'NINJUTSU',country:'JAPAN',flag:'jp',ht:"5'8\" (173 CM)",wt:'145 LB (66 KG)',
    speed:1.12,power:0.92,def:0.92,jump:1.15,stats:[4,2,5],special:'shuriken',spName:'SHURIKEN',tr:-3,
    col:{skin:'#e8a878',glove:'#3b3356',leg:'#3a3262',foot:'#25212f',aura:'#b48cff'},sh:.78,hip:.55,
    quote:'YOU NEVER SAW ME COMING. NOBODY EVER DOES.',lose:'THE SHADOW... FADES.',stageName:'MOONLIT TEMPLE'},
  ivan:{id:'ivan',name:'IVAN',nick:'THE BEAR',style:'SAMBO',country:'RUSSIA',flag:'ru',ht:"6'2\" (188 CM)",wt:'215 LB (98 KG)',
    speed:0.82,power:1.3,def:1.22,jump:0.88,stats:[2,5,4],special:'slam',spName:'BEAR SLAM',tr:-5,
    col:{skin:'#e3a272',glove:'#2e2f4a',leg:'#2b3168',foot:'#2c3a8a',aura:'#ff4a3a'},sh:.75,hip:.5,
    quote:'IN MY GYM, THE FLOOR IS MY FRIEND. SAY HELLO TO IT.',lose:'NEXT TIME... I BRING BIGGER BEAR.',stageName:'IRON GYM'},
  diego:{id:'diego',name:'DIEGO',nick:'THE RHYTHM',style:'CAPOEIRA',country:'BRAZIL',flag:'br',ht:"5'10\" (178 CM)",wt:'160 LB (73 KG)',
    speed:1.1,power:1.02,def:0.96,jump:1.1,stats:[4,3,4],special:'spin',spName:'MEIA-LUA',tr:2,
    col:{skin:'#b8743f',glove:'#f0eee8',leg:'#efedf7',foot:'#b8743f',aura:'#3fd06a'},sh:.8,hip:.55,
    quote:'THE RODA NEVER STOPS, AND NEITHER DO I!',lose:'LOST THE RHYTHM... FOR NOW.',stageName:'RIO PLAZA'},
};
const ORDER=['karl','akira','ivan','diego'];
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
    c.porDark=silhouette(c.porm,'#0a0a18')}})}

function drawFlag(code,x,y){x|=0;y|=0;ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,16,12);
  if(code==='br'){ctx.fillStyle='#1f9a3a';ctx.fillRect(x,y,14,10);ctx.fillStyle='#ffd72a';for(let r=0;r<5;r++){const w=2+r*2;ctx.fillRect(x+7-w/2-1,y+r,w+2,1);ctx.fillRect(x+7-w/2-1,y+9-r,w+2,1)}ctx.fillStyle='#2a3a9a';ctx.fillRect(x+5,y+3,4,4);ctx.fillRect(x+6,y+2,2,6);ctx.fillRect(x+4,y+4,6,2)}
  else if(code==='jp'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,10);ctx.fillStyle='#d01c2a';ctx.fillRect(x+5,y+2,4,6);ctx.fillRect(x+4,y+3,6,4)}
  else if(code==='ru'){ctx.fillStyle='#fff';ctx.fillRect(x,y,14,4);ctx.fillStyle='#2a48b0';ctx.fillRect(x,y+3,14,4);ctx.fillStyle='#d0202a';ctx.fillRect(x,y+7,14,3)}}
function drawMirror(img,x,y){ctx.save();ctx.translate(x+img.width,y);ctx.scale(-1,1);ctx.drawImage(img,0,0);ctx.restore()}
function box(x,y,w,h,bg='rgba(10,10,30,.82)',bd='#ffd23a'){ctx.fillStyle=bd;ctx.fillRect(x-1,y-1,w+2,h+2);ctx.fillStyle='#000';ctx.fillRect(x,y,w,h);ctx.fillStyle=bg;ctx.fillRect(x+1,y+1,w-2,h-2)}
function stripes(t,c1,c2){ctx.fillStyle=c1;ctx.fillRect(0,0,W,H);ctx.fillStyle=c2;for(let i=-H;i<W+H;i+=16){ctx.beginPath();const o=(i+t*0.5)%(W+H*2)-H;ctx.moveTo(o,0);ctx.lineTo(o+8,0);ctx.lineTo(o+8-H,H);ctx.lineTo(o-H,H);ctx.fill()}}

// ---------------- SCENES ----------------
let scene=null;const fade={a:0,dir:0,cb:null};
function go(s,...a){scene=s;s.t=0;s.enter&&s.enter(...a)}
function goFade(fn,spd=0.1){if(fade.dir)return;fade.dir=1;fade.cb=fn;fade.spd=spd}

const Power={update(){if(ASSETS_READY&&(anyPress()||pressed.b||pressed.select)){$('led').classList.add('on');go(Boot)}},
  draw(){ctx.fillStyle='#16181c';ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(255,255,255,.02)';for(let y=0;y<H;y+=3)ctx.fillRect(0,y,W,1);
    if(!ASSETS_READY){drawText('LOADING...',128,92,'#556',1,{align:'center',shadow:false});return}
    if((this.t>>5)&1)drawText('PRESS START',128,90,'#4a5260',1,{align:'center',shadow:false});drawText('TAP ANY BUTTON TO POWER ON',128,176,'#2c3038',1,{align:'center',shadow:false})}};

const Boot={update(){if(this.t===74)SFX.ding();if(this.t>160||(this.t>20&&anyPress()))goFade(()=>go(Intro))},
  draw(){ctx.fillStyle='#ebe9e1';ctx.fillRect(0,0,W,H);const y=Math.min(74,-24+this.t*1.35);
    drawText('DOJO BOY',128,y,'#2a2a6a',3,{align:'center',shadow:false});
    if(this.t>74){drawText('PIXEL FIGHT SYSTEM',128,y+30,'#8b2d6b',1,{align:'center',shadow:false});ctx.fillStyle='#8b2d6b';ctx.fillRect(70,y+26,116,1);ctx.fillStyle='#2d3a8b';ctx.fillRect(70,y+42,116,1)}}};

const Intro={enter(){this.slam=-1},
  update(){const t=this.t;if(t>10&&anyPress()){goFade(()=>go(Title));return}
    if(t===20||t===70||t===120)SFX.thud();
    if(t>=190&&t<410){const k=Math.floor((t-190)/52);if(k!==this.slam&&k<4){this.slam=k;SFX.heavy();SFX.whooshH()}}
    if(t===400)say('World Dojo!',1,0.5);
    if(t===430)goFade(()=>go(Title),0.06)},
  draw(){const t=this.t;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
    if(t<185){const lines=[['FOUR FIGHTERS.',20],['FOUR STYLES.',70],['ONE CHAMPION.',120]];
      lines.forEach(([s,st],i)=>{if(t>=st){const a=Math.min(1,(t-st)/8);ctx.globalAlpha=a;drawText(s,128,62+i*24,i===2?'#fff':'#bbb',i===2?2:1,i===2?{align:'center',grad:FIRE,outline:'#400'}:{align:'center'});ctx.globalAlpha=1}});return}
    const cols=['#7a1a1a','#2a1a5a','#1a2a6a','#1a5a2a'];
    for(let i=0;i<4;i++){const st=190+i*52;if(t<st)continue;const p=Math.min(1,(t-st)/8),c=CH[ORDER[i]],x0=i*64;
      ctx.save();ctx.beginPath();ctx.rect(x0,0,64,H);ctx.clip();ctx.fillStyle=cols[i];ctx.fillRect(x0,0,64,H);
      ctx.fillStyle='rgba(255,255,255,.07)';for(let y=(t*2)%12;y<H;y+=12)ctx.fillRect(x0,y,64,4);
      const dir=i%2?1:-1,ox=(1-p)*80*dir,img=c.porm;ctx.drawImage(img,x0+32-img.width/2+ox,H-img.height-18);
      if(t-st<4){ctx.fillStyle='rgba(255,255,255,.8)';ctx.fillRect(x0,0,64,H)}ctx.restore();
      if(p>=1){const lg=c.logo;ctx.drawImage(lg,0,0,lg.width,lg.height,x0+3,H-30,58,Math.round(lg.height*58/lg.width))}}
    ctx.fillStyle='#000';for(let i=1;i<4;i++)ctx.fillRect(i*64-1,0,2,H);
    if(t>395){ctx.fillStyle=`rgba(255,255,255,${Math.min(1,(t-395)/12)})`;ctx.fillRect(0,0,W,H)}}};

const Title={enter(){this.ph='press';this.sel=0;this.petals=Array.from({length:18},()=>({x:rnd(0,W),y:rnd(0,H),v:rnd(.3,.8),s:rnd(0,6)}));playMusic('title')},
  items:['ARCADE','VERSUS CPU','OPTIONS'],
  update(){if(this.ph==='press'){if(anyPress()){SFX.start();this.ph='menu';say('World Dojo',1,0.5)}return}
    if(pressed.up){this.sel=(this.sel+2)%3;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%3;SFX.move()}
    if(pressed.b){this.ph='press';SFX.back()}
    if(pressed.a||pressed.start){SFX.ok();const s=this.sel;if(s===2)go(Options);else goFade(()=>go(Select,s===0?'arcade':'vs'))}},
  draw(){const t=this.t;ctx.drawImage(CH.karl.stage,0,0);ctx.fillStyle='rgba(8,6,24,.55)';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ffc0d8';for(const p of this.petals){p.y+=p.v;p.x+=Math.sin((t+p.s*30)/30)*0.4-0.2;if(p.y>H){p.y=-4;p.x=rnd(0,W)}ctx.fillRect(p.x|0,p.y|0,2,2)}
    const xs=[-6,58,130,190];ORDER.forEach((id,i)=>{const im=CH[id].pors;ctx.drawImage(im,xs[i],H-im.height)});
    ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(0,H-6,W,6);
    const bob=Math.round(Math.sin(t/20)*1.5);
    drawText('WORLD',128,10+bob,'#fff',4,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});
    drawText('DOJO',128,42+bob,'#fff',5,{align:'center',grad:FIRE,outline:'#3a0808',ow:1});
    ctx.fillStyle='#d0301a';ctx.fillRect(64,80+bob,128,2);
    drawText('PIXEL FIGHTERS',128,86,'#ffe66a',1,{align:'center'});
    if(this.ph==='press'){if((t>>4)&1)drawText('PRESS START',128,100,'#fff',1,{align:'center',outline:'#000'})}
    else{box(84,97,88,40);this.items.forEach((s,i)=>{const on=i===this.sel;drawText((on?'> ':'  ')+s,92,103+i*11,on?'#ffe66a':'#aab',1)})}}};

const Options={enter(){this.sel=0},
  rows(){return[['DIFFICULTY',['EASY','NORMAL','HARD'][SET.diff]],['MUSIC',SET.music?'ON':'OFF'],['SOUND FX',SET.sound?'ON':'OFF'],['ANNOUNCER',SET.voice?'ON':'OFF'],['BACK','']]},
  update(){const n=5;if(pressed.up){this.sel=(this.sel+n-1)%n;SFX.move()}if(pressed.down){this.sel=(this.sel+1)%n;SFX.move()}
    const ch=pressed.left?-1:pressed.right||pressed.a?1:0;
    if(pressed.b||((pressed.a||pressed.start)&&this.sel===4)){saveSet();SFX.back();go(Title);Title.ph='menu';Title.sel=2;return}
    if(ch){if(this.sel===0)SET.diff=(SET.diff+3+ch)%3;if(this.sel===1){SET.music=!SET.music}if(this.sel===2)SET.sound=!SET.sound;if(this.sel===3){SET.voice=!SET.voice;if(SET.voice)say('Announcer on')}SFX.move();saveSet()}},
  draw(){stripes(this.t,'#14123a','#1b1848');drawText('OPTIONS',128,16,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});box(30,46,196,108);
    this.rows().forEach(([k,v],i)=>{const on=i===this.sel,y=58+i*18;drawText((on?'> ':'  ')+k,40,y,on?'#ffe66a':'#aab');if(v)drawText((on?'< ':'')+v+(on?' >':''),214,y,on?'#fff':'#889',1,{align:'right'})});
    drawText('LEFT/RIGHT: CHANGE   B: BACK',128,172,'#778',1,{align:'center'})}};

// ---------------- SELECT ----------------
let RUN=null;
const Select={enter(mode){this.mode=mode;this.ph='p1';this.cur=this.cur||0;this.p1=null;this.done=0;this.slide=20;playMusic('select')},
  update(){if(this.done){if(++this.done>50){goFade(()=>this.finish())}return}
    if(pressed.left){this.cur=(this.cur+3)%4;this.slide=16;SFX.move()}if(pressed.right){this.cur=(this.cur+1)%4;this.slide=16;SFX.move()}
    if(pressed.up||pressed.down){this.cur=(this.cur+2)%4;this.slide=16;SFX.move()}
    if(pressed.b){SFX.back();if(this.ph==='p2'){this.ph='p1';this.cur=ORDER.indexOf(this.p1)}else goFade(()=>{go(Title);Title.ph='menu'});return}
    if(pressed.a||pressed.start){const id=ORDER[this.cur];SFX.ok();say(CH[id].name.toLowerCase(),1,0.6);
      if(this.ph==='p1'){this.p1=id;if(this.mode==='vs'){this.ph='p2';this.cur=(this.cur+1)%4}else this.done=1}else{this.p2=id;this.done=1}}
    if(this.slide>0)this.slide-=2},
  finish(){if(this.mode==='arcade'){const opp=ORDER.filter(i=>i!==this.p1).sort(()=>Math.random()-.5);RUN={mode:'arcade',p1:this.p1,ladder:opp,idx:0,cont:0}}
    else RUN={mode:'vs',p1:this.p1,ladder:[this.p2],idx:0,cont:0};go(VS)},
  draw(){const t=this.t,id=ORDER[this.cur],c=CH[id];stripes(t,'#120f30','#191540');
    drawText(this.ph==='p1'?'SELECT YOUR FIGHTER':'CHOOSE YOUR OPPONENT',128,5,'#fff',1,{align:'center',grad:FIRE,outline:'#300'});
    ctx.fillStyle='#d0301a';ctx.fillRect(40,14,176,1);
    // portrait
    ctx.save();ctx.beginPath();ctx.rect(0,20,104,H-20);ctx.clip();ctx.fillStyle='rgba(255,255,255,.04)';ctx.fillRect(0,20,104,H);
    const pm=c.porm,px=Math.round(-6-this.slide*2);if(this.ph==='p2')drawMirror(pm,px+6,H-pm.height-4);else ctx.drawImage(pm,px,H-pm.height-4);
    if(this.done&&this.done<8){ctx.globalAlpha=.7;ctx.drawImage(silhouette(pm,'#fff'),px,H-pm.height-4);ctx.globalAlpha=1}ctx.restore();
    // panel
    box(106,20,146,112);const lw=84,lh=Math.round(c.logo.height*lw/c.logo.width);ctx.drawImage(c.logo,0,0,c.logo.width,c.logo.height,112,24,lw,lh);drawText(c.nick,114,58,'#ffe66a');
    const L=[['STYLE',c.style],['COUNTRY',c.country],['HEIGHT',c.ht],['WEIGHT',c.wt]];
    L.forEach(([k,v],i)=>{const y=70+i*10;drawText(k,112,y,'#99a',1,{shadow:false});drawText(':',154,y,'#99a',1,{shadow:false});drawText(v,160,y,'#fff',1,{shadow:false})});
    drawFlag(c.flag,204,79);
    drawText('SPECIAL: '+c.spName,112,111,'#ff9a6a',1,{shadow:false});
    // stats
    ['SPD','PWR','DEF'].forEach((k,i)=>{const x=112+i*46;drawText(k,x,121,'#99a',1,{shadow:false});for(let j=0;j<5;j++){ctx.fillStyle=j<c.stats[i]?'#ffd23a':'#333';ctx.fillRect(x+20+j*4,122,3,5)}});
    // icons
    ORDER.forEach((oid,i)=>{const x=110+i*36,y=140;ctx.fillStyle='#000';ctx.fillRect(x-1,y-1,34,34);ctx.drawImage(CH[oid].head,x,y);
      if(this.ph==='p2'&&oid===this.p1){ctx.fillStyle='#e03030';ctx.fillRect(x,y+26,12,6);drawText('1P',x+1,y+26,'#fff',1,{shadow:false})}
      if(i===this.cur&&((t>>3)&1||this.done)){ctx.strokeStyle=this.ph==='p1'?'#ff3a3a':'#3aa0ff';ctx.lineWidth=2;ctx.strokeRect(x-2,y-2,36,36);
        drawText(this.ph==='p1'?'1P':(this.mode==='vs'?'CPU':'2P'),x+16,y-9,this.ph==='p1'?'#ff5a5a':'#5ab4ff',1,{align:'center'})}});
    drawText('A+B = SPECIAL MOVE',180,180,'#8a86a8',1,{align:'center',shadow:false})}};

// ---------------- VS SCREEN ----------------
const VS={enter(){this.a=CH[RUN.p1];this.b=CH[RUN.ladder[RUN.idx]];playMusic('select');say(`${this.a.name.toLowerCase()} versus ${this.b.name.toLowerCase()}`,1,0.55)},
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
  this.x=side?180:76;this.y=0;this.vx=0;this.vy=0;this.face=side?-1:1;this.hp=this.mhp=100;this.trail=100;this.state='idle';this.st=0;this.atk=null;this.ast=0;
  this.stun=0;this.crouch=false;this.inv=0;this.combo=0;this.comboT=0;this.spCD=0;this.flash=0;this.hist=[];this.ghosts=[];this.lastA=-99;this.lastB=-99;this.ai={t:0,dur:0,plan:null};this.sp=null;this.hitDone=false}
  get h(){return this.crouch?this.H*.7:this.H}
  hurt(){return{x1:this.x-15,x2:this.x+15,y1:this.y,y2:this.y+this.h}}}
const ground=f=>f.y<=0&&f.state!=='jump'&&f.state!=='knock';
const canAct=f=>['idle','walk','crouch'].includes(f.state)||(f.state==='land'&&f.st>2);
const overlap=(a,b)=>a.x1<b.x2&&a.x2>b.x1&&a.y1<b.y2&&a.y2>b.y1;
function phaseOf(f){const a=f.atk;if(!a)return null;const t=a.air?f.ast:f.st;return t<a.s?'start':t<a.s+a.a?'active':'rec'}
function setS(f,s){if(f.state!==s){f.state=s;f.st=0}}
function qcf(h){let st=0;for(let i=Math.max(0,h.length-16);i<h.length;i++){const d=h[i];if(st===0&&d===2)st=1;else if(st===1&&(d===3||d===6))st=d===6?3:2;else if(st===2&&d===6)st=3}return st===3}
function control(f,o,inp){
  const fwd=f.face>0?inp.r:inp.l,back=f.face>0?inp.l:inp.r;
  f.hist.push(inp.d?(fwd?3:back?1:2):inp.u?(fwd?9:back?7:8):fwd?6:back?4:5);if(f.hist.length>24)f.hist.shift();
  if(inp.aP)f.lastA=frameNo;if(inp.bP)f.lastB=frameNo;
  const btn=inp.aP||inp.bP,wantSp=inp.sp||(btn&&Math.abs(f.lastA-f.lastB)<=4)||(btn&&qcf(f.hist));
  f.holdBack=!!back&&!inp.u;f.holdDown=!!inp.d;
  if(wantSp&&f.spCD<=0&&f.state==='attack'&&f.st<5){startSpecial(f,o);return}
  if(f.state==='jump'){if(!f.atk&&btn)startAtk(f,inp.bP?'jkick':'jpunch');return}
  if(!canAct(f))return;
  if(wantSp&&f.spCD<=0){startSpecial(f,o);return}
  if(inp.aP){startAtk(f,inp.d?'cjab':'jab');return}
  if(inp.bP){startAtk(f,inp.d?'sweep':'kick');return}
  if(inp.u){setS(f,'prejump');f.crouch=false;f.jdir=fwd?1:back?-1:0;f.vx=0;return}
  if(inp.d){f.crouch=true;setS(f,'crouch');f.vx=0;return}
  f.crouch=false;
  if(fwd){setS(f,'walk');f.vx=f.face*1.35*f.c.speed}else if(back){setS(f,'walk');f.vx=-f.face*1.05*f.c.speed}else{setS(f,'idle');f.vx=0}}
function startAtk(f,n){f.atk={...ATK[n],name:n,id:++atkId};f.hitDone=false;if(f.atk.air)f.ast=0;else{f.state='attack';f.st=0;f.vx=0;f.crouch=!!f.atk.crouch}
  (n==='kick'||n==='sweep'||n==='jkick'?SFX.whooshH:SFX.whoosh)()}
function startSpecial(f,o){f.state='special';f.st=0;f.vx=0;f.crouch=false;f.atk=null;f.sp={kind:f.c.special,hits:0,last:-99,id:++atkId};f.spCD=75;
  F.superFlash=10;F.superBy=f;SFX.special();addText(f.c.spName+'!',f.x,GY-f.H-14,f.c.col.aura);
  if(f.side===0&&!f.cpu)say(f.c.spName.replace('É','e').toLowerCase(),1.15,0.7)}
function updateSpecial(f,o){const s=f.sp,t=f.st;
  if(s.kind==='rush'){if(t<7){f.vx=0}else if(t<26){f.vx=s.hits?f.face*1.4:f.face*6.6;if(t%2===0)f.ghosts.push({x:f.x,y:f.y,l:10});if(t===7)SFX.rush();
      if(s.hits<3&&t-s.last>=6){const hb={x1:f.face>0?f.x:f.x-44,x2:f.face>0?f.x+44:f.x,y1:f.y+f.H*.25,y2:f.y+f.H*.85};const fin=s.hits===2;
        const r=tryHit(f,o,hb,{dmg:fin?8:5,stun:22,bs:10,kb:fin?3:0.8,lv:'mid',chip:1,knock:fin,heavy:fin});if(r){s.hits++;s.last=t;if(r==='block'){s.hits=3;f.vx=-f.face*2;f.st=Math.max(t,24)}}}}
    else{f.vx*=.8;if(t>=36)endSpecial(f)}}
  else if(s.kind==='shuriken'){if(t===9){if(!F.proj.some(p=>p.owner===f)){F.proj.push({x:f.x+f.face*22,y:f.y+f.H*.66,vx:f.face*4.4,owner:f,rot:0,life:90});SFX.star()}}if(t>=30)endSpecial(f)}
  else if(s.kind==='slam'){if(t>=5&&t<=10&&!s.hits){const hb={x1:f.face>0?f.x:f.x-54,x2:f.face>0?f.x+54:f.x,y1:f.y+10,y2:f.y+f.H*.9};
      if(o.y<=2&&o.inv<=0&&!['down','rise','ko','knock','grabbed'].includes(o.state)&&overlap(hb,o.hurt())){s.hits=1;SFX.grab();f.state='slamming';f.st=0;o.state='grabbed';o.st=0;o.atk=null;o.sp=null;o.crouch=false;f.grabbed=o;F.hitstop=6}}
    if(t>=34)endSpecial(f)}
  else if(s.kind==='spin'){f.y=Math.max(0,Math.sin(Math.min(1,t/36)*Math.PI)*10);f.vx=t>3&&t<32?f.face*3.1:f.vx*.8;
    if(t>3&&t<32&&s.hits<3&&t-s.last>=9){const hb={x1:f.x-48,x2:f.x+48,y1:f.y+f.H*.2,y2:f.y+f.H*.95};const fin=s.hits===2;
      const r=tryHit(f,o,hb,{dmg:fin?7:4,stun:20,bs:10,kb:fin?3:1,lv:'mid',chip:1,knock:fin,heavy:fin});if(r){s.hits++;s.last=t;if(r==='block')s.hits=3}}
    if(t%6===0&&t<32)SFX.whoosh();if(t>=42){f.y=0;endSpecial(f)}}}
function endSpecial(f){f.sp=null;f.state='idle';f.st=0;f.vx=0}
function updateSlam(f,o){const t=f.st,T=30;if(t<=T){const p=t/T,th=Math.PI*p;o.x=f.x+f.face*30*Math.cos(th);o.y=Math.sin(th)*64;o.rot=-f.face*Math.PI*p*1.2;}
  if(t===T){o.y=0;o.rot=0;const dmg=17*f.c.power/o.c.def;o.hp=Math.max(0,o.hp-dmg);F.shake=9;F.hitstop=12;SFX.slam();dust(o.x,10);sparks(o.x,GY-6,'#fff',14);
    o.x=clamp(o.x,XMIN,XMAX);f.face=-f.face;f.combo=1;o.flash=6;if(o.hp<=0){o.state='ko';o.st=0;F.onKO(f,o)}else{o.state='down';o.st=0}}
  if(t>=48){f.state='idle';f.st=0;f.sp=null;f.grabbed=null}}
function tryHit(att,def,hb,d){if(def.inv>0||['down','ko','rise','grabbed'].includes(def.state)||F.phase!=='play')return false;if(!overlap(hb,def.hurt()))return false;
  const cx=(Math.max(hb.x1,def.x-15)+Math.min(hb.x2,def.x+15))/2,cy=GY-(Math.max(hb.y1,def.y)+Math.min(hb.y2,def.y+def.h))/2;return applyHit(att,def,d,cx,cy)}
function applyHit(att,def,d,cx,cy){const push=def.x>=att.x?1:-1;
  const canBlock=def.holdBack&&def.y<=0&&['idle','walk','crouch','block'].includes(def.state)&&(d.lv==='low'?def.crouch:d.lv==='high'?!def.crouch:true);
  if(canBlock){def.state='block';def.st=0;def.stun=d.bs;def.vx=push*Math.max(1.5,d.kb);def.hp=Math.max(1,def.hp-(d.chip||0));F.hitstop=4;SFX.block();sparks(cx,cy,'#7ac8ff',6);
    if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*1.6;return'block'}
  let dmg=d.dmg*att.c.power/def.c.def;if(att.cpu)dmg*=[0.75,0.95,1.1][SET.diff];
  if(def.stun>0&&(def.state==='hurt'||def.state==='knock'))att.combo++;else att.combo=1;att.comboT=60;if(att.combo>=2)addCombo(att);
  def.hp=Math.max(0,def.hp-dmg);def.atk=null;def.sp=null;def.flash=4;def.crouch=d.lv==='low'?false:def.crouch&&def.state==='crouch';
  if(def.hp<=0){def.state='knock';def.st=0;def.ko=true;def.vy=4.2;def.vx=push*2.6;def.y=Math.max(def.y,1);F.onKO(att,def)}
  else if(d.knock||def.y>0){def.state='knock';def.st=0;def.vy=3.8;def.vx=push*2.4;def.y=Math.max(def.y,1);def.stun=1}
  else{def.state='hurt';def.st=0;def.stun=d.stun;def.vx=push*d.kb}
  if((def.x<=XMIN+1&&push<0)||(def.x>=XMAX-1&&push>0))att.vx=-push*d.kb*0.7;
  F.hitstop=d.heavy?10:6;F.shake=d.heavy?5:2;sparks(cx,cy,'#ffe66a',d.heavy?14:8);F.hitFx.push({x:cx,y:cy,l:8,big:!!d.heavy});(d.heavy||d.dmg>=7?SFX.heavy:SFX.hit)();
  if(!att.cpu&&navigator.vibrate)try{navigator.vibrate(d.heavy?40:18)}catch(e){}
  return'hit'}
function updateF(f,o){f.st++;if(f.spCD>0)f.spCD--;if(f.flash>0)f.flash--;if(f.inv>0)f.inv--;if(f.comboT>0&&--f.comboT===0)f.combo=0;
  f.trail=f.trail>f.hp?Math.max(f.hp,f.trail-0.4):f.hp;f.ghosts.forEach(g=>g.l--);f.ghosts=f.ghosts.filter(g=>g.l>0);
  switch(f.state){
    case'prejump':if(f.st>=3){f.state='jump';f.st=0;f.vy=5.4*f.c.jump;f.vx=f.jdir*f.face*1.8*f.c.speed;SFX.jump()}break;
    case'jump':if(f.atk){f.ast++;if(phaseOf(f)==='active'&&!f.hitDone){const a=f.atk,cy=f.y+f.H*a.hy;if(tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:cy-a.hh/2,y2:cy+a.hh/2},{...a,heavy:false}))f.hitDone=true}}break;
    case'land':f.vx=0;if(f.st>=5)setS(f,'idle');break;
    case'attack':{const a=f.atk,ph=phaseOf(f);if(ph==='active'&&!f.hitDone){const h=f.H*(a.crouch?.7:1),cy=f.y+h*a.hy;
        if(tryHit(f,o,{x1:f.face>0?f.x:f.x-a.reach,x2:f.face>0?f.x+a.reach:f.x,y1:cy-a.hh/2,y2:cy+a.hh/2},a))f.hitDone=true}
      f.vx*=.75;if(f.st>=a.s+a.a+a.r){f.atk=null;f.state=a.crouch&&f.holdDown?'crouch':'idle';f.st=0;if(f.state==='idle')f.crouch=false}}break;
    case'hurt':f.vx*=.86;if(--f.stun<=0){f.state='idle';f.st=0}break;
    case'block':f.vx*=.84;if(--f.stun<=0){f.state=f.crouch?'crouch':'idle';f.st=0}break;
    case'down':f.vx*=.8;if(f.st>=40){f.state='rise';f.st=0;f.inv=14}break;
    case'rise':if(f.st>=12){f.state='idle';f.st=0;f.inv=8;f.stun=0}break;
    case'special':updateSpecial(f,o);break;
    case'slamming':f.vx=0;updateSlam(f,o);break;
    case'ko':case'win':f.vx*=.85;break;}
  if(f.state!=='grabbed'&&f.state!=='slamming'&&!(f.state==='special'&&f.sp&&f.sp.kind==='spin')){
    if(f.y>0||f.vy!==0){f.vy-=GRAV;f.y+=f.vy}
    if(f.y<=0&&f.vy<=0&&(f.state==='jump'||f.state==='knock'||f.vy<0)){f.y=0;f.vy=0;
      if(f.state==='jump'){f.state='land';f.st=0;f.atk=null;SFX.land();dust(f.x,4)}
      else if(f.state==='knock'){f.state=f.ko?'ko':'down';f.st=0;f.vx*=.4;F.shake=Math.max(F.shake,3);SFX.thud();dust(f.x,8)}}}
  if(f.state!=='grabbed')f.x=clamp(f.x+f.vx,XMIN,XMAX);
  if(['idle','walk','crouch','prejump','land'].includes(f.state)&&Math.abs(o.x-f.x)>3)f.face=o.x>f.x?1:-1}
function separate(a,b){if(a.state==='grabbed'||b.state==='grabbed'||a.state==='slamming'||b.state==='slamming')return;if(Math.abs(a.y-b.y)>a.H*.7)return;
  const minD=40,dx=b.x-a.x;if(Math.abs(dx)>=minD)return;const s=dx===0?a.face:Math.sign(dx),ov=(minD-Math.abs(dx))/2;
  a.x-=s*ov;b.x+=s*ov;if(a.x<XMIN){b.x+=XMIN-a.x;a.x=XMIN}if(a.x>XMAX){b.x-=a.x-XMAX;a.x=XMAX}if(b.x<XMIN){a.x+=XMIN-b.x;b.x=XMIN}if(b.x>XMAX){a.x-=b.x-XMAX;b.x=XMAX}}
function updateProj(){for(const p of F.proj){p.x+=p.vx;p.rot+=0.5;p.life--;const o=p.owner===F.p1?F.p2:F.p1;
    const r=tryHit(p.owner,o,{x1:p.x-6,x2:p.x+6,y1:p.y-6,y2:p.y+6},{dmg:9,stun:18,bs:12,kb:2.4,lv:'mid',chip:2});if(r)p.life=0}
  if(F.proj.length===2&&Math.abs(F.proj[0].x-F.proj[1].x)<10){sparks(F.proj[0].x,GY-F.proj[0].y,'#fff',10);SFX.block();F.proj.forEach(p=>p.life=0)}
  F.proj=F.proj.filter(p=>p.life>0&&p.x>-10&&p.x<W+10)}
// FX
function sparks(x,y,col,n){for(let i=0;i<n;i++){const a=rnd(0,Math.PI*2),v=rnd(1,3.2);F.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,l:rnd(10,20)|0,c:Math.random()<.5?'#fff':col,g:0.12})}}
function dust(x,n){for(let i=0;i<n;i++)F.parts.push({x:x+rnd(-12,12),y:GY-1,vx:rnd(-1,1),vy:rnd(-1,-.2),l:rnd(12,22)|0,c:'#d8cbb0',g:0.02,dust:1})}
function addText(s,x,y,c){F.texts.push({s,x:clamp(x,40,216),y,c,l:50})}
function addCombo(att){F.comboShow={side:att.side,n:att.combo,l:70}}

// AI
function aiInput(f,o){const inp={l:0,r:0,u:0,d:0,aP:0,bP:0,sp:0},ai=f.ai,dist=Math.abs(o.x-f.x),tw=o.x>f.x?'r':'l',aw=tw==='r'?'l':'r';
  const L=clamp([0.15,0.45,0.75][SET.diff]+(RUN&&RUN.mode==='arcade'?RUN.idx*0.1:0),0,1);
  const oa=o.atk&&o.state==='attack'&&phaseOf(o)!=='rec'&&dist<o.atk.reach+22;
  const threat=oa||(o.state==='special'&&dist<90&&o.sp&&o.sp.kind!=='shuriken')||(o.state==='jump'&&dist<70&&o.vy<1)||F.proj.some(p=>p.owner===o&&Math.abs(p.x-f.x)<70&&Math.sign(p.vx)===Math.sign(f.x-p.x));
  const tid=(o.atk&&o.atk.id)||(o.sp&&o.sp.id)||(F.proj[0]&&'p')||'j'+Math.floor(frameNo/40);
  if(threat&&canAct(f)){if(ai.tid!==tid){ai.tid=tid;ai.block=Math.random()<lerp(0.15,0.82,L);ai.delay=Math.round(lerp(9,1,L))}
    if(ai.block){if(ai.delay>0)ai.delay--;else{inp[aw]=1;if(o.atk&&o.atk.lv==='low')inp.d=1;return inp}}}
  if(f.state==='jump'){if(!f.atk&&dist<60&&f.vy<1.5&&Math.random()<0.15+L*0.5)inp.bP=1;return inp}
  // punish / combo follow-up
  if(canAct(f)&&o.state==='hurt'&&dist<48&&Math.random()<L*0.35){Math.random()<.5?inp.aP=1:inp.bP=1;return inp}
  if(ai.dur>0){ai.dur--;const p=ai.plan;if(p==='walkF')inp[tw]=1;else if(p==='walkB')inp[aw]=1;else if(p==='guard'){inp[aw]=1}else if(p==='crouch')inp.d=1;return inp}
  if(!canAct(f))return inp;
  const r=Math.random(),sp=f.c.special,ready=f.spCD<=0,wait=Math.round(lerp(26,6,L)),plan=(p,d)=>{ai.plan=p;ai.dur=d};
  if(o.state==='down'||o.state==='rise'){if(dist>60)plan('walkF',10);else plan('guard',12);return inp}
  if(dist>100){if(sp==='shuriken'&&ready&&r<.4)inp.sp=1;else if(sp==='rush'&&ready&&dist<150&&r<.22)inp.sp=1;else if(r<.12){inp.u=1;inp[tw]=1}else plan('walkF',14+wait)}
  else if(dist>58){if(r<.32)plan('walkF',10+wait/2);else if(r<.46&&dist<62)inp.bP=1;else if(r<.58){inp.u=1;inp[tw]=1}else if(r<.66)plan('walkB',10);
    else if(ready&&r<.78&&sp!=='slam')inp.sp=1;else plan('guard',wait)}
  else{if(sp==='slam'&&ready&&r<.32*(0.5+L))inp.sp=1;else if(r<.28)inp.aP=1;else if(r<.48)inp.bP=1;else if(r<.6){inp.d=1;inp.bP=1}else if(r<.67){inp.d=1;inp.aP=1}
    else if(ready&&r<.74&&sp!=='shuriken')inp.sp=1;else if(r<.84)plan('walkB',12);else plan('guard',wait)}
  return inp}

// ---- FIGHT SCENE ----
function startFight(){const opp=RUN.ladder[RUN.idx];go(Fight,{p1:RUN.p1,p2:opp,stage:opp})}
const Fight={enter(cfg){this.cfg=cfg;this.wins=[0,0];this.round=1;this.draws=0;F=this;playMusic('fight',CH[cfg.stage].tr);this.startRound()},
  startRound(){const c=this.cfg;this.p1=new Fighter(c.p1,0,false,false);this.p2=new Fighter(c.p2,1,true,c.p1===c.p2);this.proj=[];this.parts=[];this.texts=[];this.hitFx=[];
    this.time=60;this.tf=0;this.phase='intro';this.pt=0;this.hitstop=0;this.shake=0;this.slow=0;this.superFlash=0;this.comboShow=null;this.paused=false;this.winner=-1;this.banner=null;
    const final=this.wins[0]===1&&this.wins[1]===1;setTimeout(()=>say(final?'Final round':`Round ${['one','two','three','four','five'][this.round-1]||this.round}`),200);SFX.bell()},
  onKO(att,def){if(this.phase!=='play')return;this.phase='ko';this.pt=0;this.slow=50;this.koSide=att.side;SFX.ko();this.shake=8;say('K.O.!',0.9,0.5)},
  update(){
    if(this.paused){this.updatePause();return}
    if(pressed.start&&this.phase==='play'){this.paused=true;this.psel=0;SFX.ok();return}
    if(this.hitstop>0){this.hitstop--;return}
    if(this.superFlash>0){this.superFlash--;return}
    if(this.slow>0){this.slow--;if(this.slow%3)return}
    this.pt++;const p1=this.p1,p2=this.p2;
    if(this.phase==='intro'){if(this.pt===80){SFX.special();say('Fight!',1.1,0.6)}if(this.pt>=105)this.phase='play'}
    const none={l:0,r:0,u:0,d:0,aP:0,bP:0,sp:0};
    const pin=this.phase==='play'?{l:held.left,r:held.right,u:held.up,d:held.down,aP:pressed.a,bP:pressed.b,sp:0}:none;
    const cin=this.phase==='play'?aiInput(p2,p1):none;
    control(p1,p2,pin);control(p2,p1,cin);
    updateF(p1,p2);updateF(p2,p1);separate(p1,p2);updateProj();
    for(const p of this.parts){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.l--}this.parts=this.parts.filter(p=>p.l>0);
    this.texts.forEach(t=>{t.l--;t.y-=0.4});this.texts=this.texts.filter(t=>t.l>0);this.hitFx.forEach(h=>h.l--);this.hitFx=this.hitFx.filter(h=>h.l>0);
    if(this.comboShow&&--this.comboShow.l<=0)this.comboShow=null;if(this.shake>0)this.shake*=0.85;if(this.shake<0.3)this.shake=0;
    if(this.phase==='play'){if(++this.tf>=60){this.tf=0;this.time--;if(this.time<=10&&this.time>0)SFX.tick();if(this.time<=0){this.phase='time';this.pt=0;say('Time!');
      this.winner=p1.hp>p2.hp?0:p2.hp>p1.hp?1:-1}}}
    if(this.phase==='ko'){const w=this.koSide,wf=w?p2:p1;if(this.pt===70&&['idle','walk','crouch','land','block'].includes(wf.state)){wf.state='win';wf.st=0}
      if(this.pt===75&&wf.hp>=wf.mhp)say('Perfect!');if(this.pt>=170)this.endRound(w)}
    if(this.phase==='time'){const w=this.winner;if(this.pt===60&&w>=0){const wf=w?p2:p1;wf.state='win';wf.st=0}if(this.pt>=160)this.endRound(w)}},
  endRound(w){if(this.phase==='done')return;this.phase='done';
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
    for(const p of this.proj)drawStar(p);
    for(const h of this.hitFx)drawHitFx(h);
    for(const p of this.parts){ctx.fillStyle=p.c;ctx.globalAlpha=p.dust?Math.min(1,p.l/12)*.7:1;const s=p.dust?3:2;ctx.fillRect(p.x|0,p.y|0,s,s)}ctx.globalAlpha=1;
    ctx.restore();
    for(const t of this.texts){ctx.globalAlpha=Math.min(1,t.l/12);drawText(t.s,t.x,t.y,'#fff',1,{align:'center',grad:FIRE,outline:'#200'});ctx.globalAlpha=1}
    this.drawHUD();this.drawBanner();if(this.paused)this.drawPause()},
  drawHUD(){const p=[this.p1,this.p2];
    p.forEach((f,i)=>{const bx=i?146:26,bw=84,by=6;ctx.fillStyle='#000';ctx.fillRect(bx-1,by-1,bw+2,10);ctx.fillStyle='#ffd23a';ctx.fillRect(bx-2,by-2,bw+4,1);ctx.fillRect(bx-2,by+9,bw+4,1);
      ctx.fillStyle='#401018';ctx.fillRect(bx,by,bw,8);const tw=Math.round(bw*f.trail/f.mhp),hw=Math.round(bw*f.hp/f.mhp);
      ctx.fillStyle='#e02a2a';i?ctx.fillRect(bx+bw-tw,by,tw,8):ctx.fillRect(bx,by,tw,8);
      const low=f.hp<25&&(frameNo>>3)&1;ctx.fillStyle=low?'#ff7a3a':'#ffd23a';i?ctx.fillRect(bx+bw-hw,by,hw,8):ctx.fillRect(bx,by,hw,8);ctx.fillStyle=low?'#ffc090':'#fff3a0';i?ctx.fillRect(bx+bw-hw,by,hw,2):ctx.fillRect(bx,by,hw,2);
      const ix=i?232:2;ctx.fillStyle='#ffd23a';ctx.fillRect(ix-1,3,24,24);ctx.imageSmoothingEnabled=true;
      if(i){ctx.save();ctx.translate(ix+22,4);ctx.scale(-1,1);ctx.drawImage(f.c.head,0,0,22,22);ctx.restore()}else ctx.drawImage(f.c.head,ix,4,22,22);ctx.imageSmoothingEnabled=false;
      drawText(f.c.name+(f.alt?' 2':''),i?bx+bw:bx,by+12,'#fff',1,{align:i?'right':'left',outline:'#000'});
      for(let k=0;k<this.wins[i];k++){const sx=i?bx+bw-60-k*9:bx+52+k*9;drawText('*',sx,by+12,'#ffd23a',1,{outline:'#000'})}});
    ctx.fillStyle='#000';ctx.fillRect(114,2,28,20);ctx.fillStyle='#ffd23a';ctx.fillRect(115,3,26,18);ctx.fillStyle='#1a1430';ctx.fillRect(116,4,24,16);
    drawText(String(Math.max(0,this.time)).padStart(2,'0'),128,6,this.time<=10?'#ff5a4a':'#fff',2,{align:'center',shadow:false});
    if(this.comboShow){const c=this.comboShow;const x=c.side?248:8;drawText(c.n+' HITS!',x,44,'#fff',1,{align:c.side?'right':'left',grad:FIRE,outline:'#300'})}},
  drawBanner(){const pt=this.pt;let s=null,sc=3,grad=FIRE;
    if(this.phase==='intro'){const fin=this.wins[0]===1&&this.wins[1]===1;if(pt<78)s=fin?'FINAL ROUND':'ROUND '+this.round;else s='FIGHT!';sc=pt<78?(fin?2:3):4}
    else if(this.phase==='ko'){if(pt<100)s='K.O.';else{const wf=this.koSide?this.p2:this.p1;s=wf.hp>=wf.mhp?'PERFECT!':this.koSide===0?'YOU WIN':'YOU LOSE';sc=s==='PERFECT!'?3:3}if(pt<100)sc=5}
    else if(this.phase==='time'){s=pt<80?'TIME OVER':this.winner<0?'DRAW GAME':this.winner===0?'YOU WIN':'YOU LOSE';sc=2}
    if(!s)return;if(this.phase==='ko'&&pt<100)grad=['#fff','#ffd0d0','#ff9a9a','#ff5a5a','#e02a2a','#b01a1a','#800'];
    let k=1;if(this.phase==='intro'){const lt=pt<78?pt:pt-78;k=lt<6?2-lt/6:1}
    const s2=Math.max(1,Math.round(sc*k));drawText(s,128,84-s2*3.5,'#fff',s2,{align:'center',grad,outline:'#200',ow:1})},
  drawPause(){ctx.fillStyle='rgba(0,0,10,.75)';ctx.fillRect(0,0,W,H);drawText('PAUSE',128,14,'#fff',2,{align:'center',grad:FIRE,outline:'#300'});
    const c=this.p1.c;box(16,36,224,100);drawText('MOVES - '+c.name,128,42,'#ffe66a',1,{align:'center'});
    const m=[['PUNCH','A'],['KICK','B'],['LOW PUNCH','DOWN + A'],['SWEEP','DOWN + B'],['JUMP ATTACK','UP, THEN A OR B'],['BLOCK','HOLD BACK'],[c.spName,'A+B OR DOWN,FWD+A']];
    m.forEach(([k,v],i)=>{drawText(k,24,56+i*11,'#ff9a6a',1,{shadow:false});drawText(v,232,56+i*11,'#fff',1,{align:'right',shadow:false})});
    ['RESUME','QUIT TO TITLE'].forEach((s,i)=>drawText((this.psel===i?'> ':'  ')+s,128,148+i*12,this.psel===i?'#ffe66a':'#99a',1,{align:'center'}))}};

function drawFighter(f){const c=f.c;let img=f.flash>0&&(f.flash&1)?c.white:f.img;
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
function drawStar(p){const x=Math.round(p.x),y=Math.round(GY-p.y);ctx.save();ctx.translate(x,y);ctx.rotate(p.rot);ctx.fillStyle='#120e1e';ctx.fillRect(-8,-2,16,4);ctx.fillRect(-2,-8,4,16);
  ctx.fillStyle='#c8c8e0';ctx.fillRect(-7,-1,14,2);ctx.fillRect(-1,-7,2,14);ctx.fillStyle='#fff';ctx.fillRect(-2,-2,4,4);ctx.fillStyle='#120e1e';ctx.fillRect(-1,-1,2,2);ctx.restore();
  ctx.fillStyle='rgba(180,140,255,.5)';ctx.fillRect(x-p.vx*3-4,y,6,1);ctx.fillRect(x-p.vx*5-3,y-2,4,1)}
function drawHitFx(h){const r=(8-h.l)*(h.big?3:2)+3;ctx.strokeStyle=h.l>4?'#fff':'#ffd23a';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4+0.3;ctx.moveTo(h.x+Math.cos(a)*r*0.4,h.y+Math.sin(a)*r*0.4);ctx.lineTo(h.x+Math.cos(a)*r,h.y+Math.sin(a)*r)}ctx.stroke();
  if(h.l>5){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(h.x,h.y,r*0.35,0,Math.PI*2);ctx.fill()}}

// ---------------- RESULT / CONTINUE / ENDING ----------------
const Result={enter(w,cfg){this.w=w;this.cfg=cfg;this.win=w===0;this.wc=CH[w===0?cfg.p1:cfg.p2];this.lc=CH[w===0?cfg.p2:cfg.p1];playMusic(this.win?'win':'lose');setTimeout(()=>say(this.win?'You win!':'You lose'),300)},
  update(){if(this.t>50&&(pressed.a||pressed.start)){SFX.ok();goFade(()=>this.next())}},
  next(){if(RUN.mode==='vs'){go(Select,'vs');return}if(this.win){RUN.idx++;if(RUN.idx>=RUN.ladder.length)go(Ending);else go(VS)}else go(Continue)},
  draw(){const t=this.t,c=this.wc;ctx.drawImage(CH[this.cfg.stage].stage,0,0);ctx.fillStyle='rgba(6,4,20,.7)';ctx.fillRect(0,0,W,H);
    const p=Math.min(1,t/16),img=c.por;ctx.drawImage(img,Math.round(-40+40*p)-6,H-img.height);
    drawText(this.win?'YOU WIN!':'YOU LOSE',186,14,'#fff',2,{align:'center',grad:this.win?FIRE:ICE,outline:'#200'});
    box(118,40,132,94);ctx.drawImage(c.logo,0,0,c.logo.width,c.logo.height,124,44,70,Math.round(c.logo.height*70/c.logo.width));
    const lines=wrap('"'+c.quote+'"',20),n=Math.min(lines.join('').length,Math.floor(t*1.2));let k=0;
    lines.forEach((l,i)=>{const s=l.slice(0,Math.max(0,n-k));k+=l.length;drawText(s,124,74+i*10,'#fff',1,{shadow:false})});
    if(t>50&&(t>>4)&1)drawText('PRESS A',184,170,'#ffe66a',1,{align:'center',outline:'#000'})}};
const Continue={enter(){this.n=9;stopMusic()},
  update(){if(this.t%60===0&&this.t>0){this.n--;if(this.n<0){goFade(()=>go(GameOver));return}SFX.tick()}
    if(pressed.start||pressed.a){SFX.start();RUN.cont++;goFade(()=>startFight())}if(pressed.b&&this.t>10){this.t+=(60-this.t%60)-1}},
  draw(){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const c=CH[RUN.p1];ctx.globalAlpha=.6;ctx.drawImage(c.porm,10,H-c.porm.height);ctx.globalAlpha=1;
    drawText('CONTINUE?',160,40,'#fff',2,{align:'center',grad:ICE,outline:'#002'});
    const s=Math.max(0,this.n);drawText(String(s),160,74,'#fff',6,{align:'center',grad:FIRE,outline:'#300',ow:1});
    if((this.t>>4)&1)drawText('PRESS START',160,140,'#ffe66a',1,{align:'center'});drawText('B: SKIP',160,156,'#667',1,{align:'center'})}};
const GameOver={enter(){playMusic('lose');say('Game over',0.8,0.4)},update(){if(this.t>200||(this.t>40&&anyPress()))goFade(()=>{go(Title)})},
  draw(){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const k=Math.min(1,this.t/30);ctx.globalAlpha=k;drawText('GAME OVER',128,84,'#fff',3,{align:'center',grad:['#fff','#ddd','#bbb','#999','#777','#555','#333'],outline:'#200'});ctx.globalAlpha=1}};
const Ending={enter(){this.c=CH[RUN.p1];playMusic('ending');setTimeout(()=>say('Congratulations!'),400)},
  update(){if(this.t>360&&anyPress())goFade(()=>go(Title),0.05)},
  draw(){const t=this.t,c=this.c;stripes(t,'#2a1206','#341808');ctx.fillStyle='rgba(255,210,58,.08)';for(let i=0;i<12;i++){const a=t*0.004+i*Math.PI/6;ctx.beginPath();ctx.moveTo(60,110);ctx.lineTo(60+Math.cos(a)*300,110+Math.sin(a)*300);ctx.lineTo(60+Math.cos(a+0.15)*300,110+Math.sin(a+0.15)*300);ctx.fill()}
    ctx.drawImage(c.por,0,H-c.por.height);
    const L=['CONGRATULATIONS!','',c.name,'"'+c.nick+'"','','IS THE NEW','WORLD DOJO','CHAMPION!','','','THANKS FOR PLAYING','','A GAME BY MARK','','BUILT WITH CLAUDE','','SEE YOU NEXT FIGHT!'];
    const y0=Math.max(20,H-t*0.45);L.forEach((s,i)=>{const y=y0+i*12;if(y>-10&&y<H)drawText(s,190,y,'#fff',1,{align:'center',grad:i<8?FIRE:null,outline:'#200'})});
    if(t>360&&(t>>4)&1)drawText('PRESS START',190,182,'#fff',1,{align:'center',outline:'#000'})}};

// ---------------- MAIN LOOP ----------------
let ASSETS_READY=false;
function step(){pollInput();frameNo++;
  if(fade.dir===1){fade.a+=fade.spd;if(fade.a>=1){fade.a=1;const cb=fade.cb;fade.cb=null;fade.dir=-1;cb&&cb()}return}
  if(fade.dir===-1){fade.a-=fade.spd;if(fade.a<=0){fade.a=0;fade.dir=0}}
  if(scene.update)scene.update();scene.t++}
function render(){ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;scene.draw();if(fade.a>0){ctx.fillStyle=`rgba(0,0,0,${fade.a})`;ctx.fillRect(0,0,W,H)}}
let last=performance.now(),acc=0;
function loop(now){requestAnimationFrame(loop);acc+=Math.min(100,now-last);last=now;let n=0;while(acc>=1000/60&&n<4){step();acc-=1000/60;n++}if(n>=4)acc=0;render();musicTick()}
go(Power);requestAnimationFrame(loop);
loadAssets().then(()=>{ASSETS_READY=true});
window.__dbg={startSpecial,startAtk,applyHit,get scene(){return scene},get F(){return F},go,Fight,Title,Select,VS,Result,Ending,Continue,set RUN(v){RUN=v},get RUN(){return RUN},CH};

