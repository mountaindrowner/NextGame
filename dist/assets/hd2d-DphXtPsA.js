import"./modulepreload-polyfill-B5Qt9EMX.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yl="170",Lm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Dm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},_p=0,Uh=1,xp=2,Um=3,Nm=0,eu=1,nu=2,mi=3,qi=0,bn=1,Ue=2,vi=0,Hs=1,ds=2,Nh=3,Fh=4,vp=5,ls=100,yp=101,Mp=102,Sp=103,bp=104,wp=200,Tp=201,Ep=202,Ap=203,ol=204,al=205,Cp=206,Rp=207,Pp=208,Ip=209,Lp=210,Dp=211,Up=212,Np=213,Fp=214,ll=0,cl=1,hl=2,qs=3,ul=4,dl=5,fl=6,pl=7,Vo=0,Op=1,Bp=2,Wi=0,iu=1,su=2,ru=3,Zl=4,zp=5,ou=6,au=7,Oh="attached",kp="detached",$l=300,Yi=301,fs=302,bo=303,wo=304,kr=306,Ys=1e3,Mn=1001,To=1002,Fe=1003,lu=1004,Fm=1004,Tr=1005,Om=1005,Ze=1006,fo=1007,Bm=1007,si=1008,zm=1008,bi=1009,cu=1010,hu=1011,Lr=1012,Jl=1013,Zi=1014,Nn=1015,li=1016,Kl=1017,Ql=1018,Zs=1020,uu=35902,du=1021,fu=1022,Sn=1023,pu=1024,mu=1025,Gs=1026,$s=1027,jl=1028,Ho=1029,gu=1030,tc=1031,km=1032,ec=1033,po=33776,mo=33777,go=33778,_o=33779,ml=35840,gl=35841,_l=35842,xl=35843,vl=36196,yl=37492,Ml=37496,Sl=37808,bl=37809,wl=37810,Tl=37811,El=37812,Al=37813,Cl=37814,Rl=37815,Pl=37816,Il=37817,Ll=37818,Dl=37819,Ul=37820,Nl=37821,xo=36492,Fl=36494,Ol=36495,_u=36283,Bl=36284,zl=36285,kl=36286,Vp=2200,Hp=2201,Gp=2202,Eo=2300,Vl=2301,ja=2302,Bs=2400,zs=2401,Ao=2402,nc=2500,xu=2501,Vm=0,Hm=1,Gm=2,Wp=3200,Xp=3201,Wm=3202,Xm=3203,ms=0,qp=1,zi="",Ke="srgb",js="srgb-linear",Go="linear",ye="srgb",qm=0,Us=7680,Ym=7681,Zm=7682,$m=7683,Jm=34055,Km=34056,Qm=5386,jm=512,tg=513,eg=514,ng=515,ig=516,sg=517,rg=518,Bh=519,Yp=512,Zp=513,$p=514,vu=515,Jp=516,Kp=517,Qp=518,jp=519,Co=35044,og=35048,ag=35040,lg=35045,cg=35049,hg=35041,ug=35046,dg=35050,fg=35042,pg="100",zh="300 es",xi=2e3,Ro=2001;class Ei{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fd=1234567;const Ws=Math.PI/180,Dr=180/Math.PI;function Hn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ln[s&255]+ln[s>>8&255]+ln[s>>16&255]+ln[s>>24&255]+"-"+ln[t&255]+ln[t>>8&255]+"-"+ln[t>>16&15|64]+ln[t>>24&255]+"-"+ln[e&63|128]+ln[e>>8&255]+"-"+ln[e>>16&255]+ln[e>>24&255]+ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]).toLowerCase()}function ze(s,t,e){return Math.max(t,Math.min(e,s))}function yu(s,t){return(s%t+t)%t}function mg(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function gg(s,t,e){return s!==t?(e-s)/(t-s):0}function vo(s,t,e){return(1-e)*s+e*t}function _g(s,t,e,n){return vo(s,t,1-Math.exp(-e*n))}function xg(s,t=1){return t-Math.abs(yu(s,t*2)-t)}function vg(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function yg(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Mg(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Sg(s,t){return s+Math.random()*(t-s)}function bg(s){return s*(.5-Math.random())}function wg(s){s!==void 0&&(fd=s);let t=fd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Tg(s){return s*Ws}function Eg(s){return s*Dr}function Ag(s){return(s&s-1)===0&&s!==0}function Cg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Rg(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Pg(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*p,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*p,a*l);break;case"ZYZ":s.set(c*p,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function vn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function jt(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Po={DEG2RAD:Ws,RAD2DEG:Dr,generateUUID:Hn,clamp:ze,euclideanModulo:yu,mapLinear:mg,inverseLerp:gg,lerp:vo,damp:_g,pingpong:xg,smoothstep:vg,smootherstep:yg,randInt:Mg,randFloat:Sg,randFloatSpread:bg,seededRandom:wg,degToRad:Tg,radToDeg:Eg,isPowerOfTwo:Ag,ceilPowerOfTwo:Cg,floorPowerOfTwo:Rg,setQuaternionFromProperEuler:Pg,normalize:jt,denormalize:vn};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,n,i,r,o,a,c,l){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],v=i[1],y=i[4],x=i[7],C=i[2],T=i[5],A=i[8];return r[0]=o*_+a*v+c*C,r[3]=o*g+a*y+c*T,r[6]=o*m+a*x+c*A,r[1]=l*_+h*v+u*C,r[4]=l*g+h*y+u*T,r[7]=l*m+h*x+u*A,r[2]=d*_+f*v+p*C,r[5]=d*g+f*y+p*T,r[8]=d*m+f*x+p*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,p=e*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(h*e-i*c)*_,t[5]=(i*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Uc.makeScale(t,e)),this}rotate(t){return this.premultiply(Uc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Uc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Uc=new Kt;function t0(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}const Ig={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Er(s,t){return new Ig[s](t)}function Io(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function e0(){const s=Io("canvas");return s.style.display="block",s}const pd={};function co(s){s in pd||(pd[s]=!0,console.warn(s))}function Lg(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Dg(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ug(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ce={enabled:!0,workingColorSpace:js,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ye&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ye&&(s.r=Pr(s.r),s.g=Pr(s.g),s.b=Pr(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zi?Go:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Xi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Pr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const md=[.64,.33,.3,.6,.15,.06],gd=[.2126,.7152,.0722],_d=[.3127,.329],xd=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vd=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ce.define({[js]:{primaries:md,whitePoint:_d,transfer:Go,toXYZ:xd,fromXYZ:vd,luminanceCoefficients:gd,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:md,whitePoint:_d,transfer:ye,toXYZ:xd,fromXYZ:vd,luminanceCoefficients:gd,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}});let sr;class n0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{sr===void 0&&(sr=Io("canvas")),sr.width=t.width,sr.height=t.height;const n=sr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=sr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Io("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Xi(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Xi(e[n]/255)*255):e[n]=Xi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ng=0;class ks{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=Hn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Nc(i[o].image)):r.push(Nc(i[o]))}else r=Nc(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Nc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?n0.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fg=0;class ke extends Ei{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,n=Mn,i=Mn,r=Ze,o=si,a=Sn,c=bi,l=ke.DEFAULT_ANISOTROPY,h=zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=Hn(),this.name="",this.source=new ks(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$l)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ys:t.x=t.x-Math.floor(t.x);break;case Mn:t.x=t.x<0?0:1;break;case To:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ys:t.y=t.y-Math.floor(t.y);break;case Mn:t.y=t.y<0?0:1;break;case To:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=$l;ke.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,i=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,x=(f+1)/2,C=(m+1)/2,T=(h+d)/4,A=(u+_)/4,I=(p+g)/4;return y>x&&y>C?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=T/n,r=A/n):x>C?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=T/i,r=I/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=A/r,i=I/r),this.set(n,i,r,e),this}let v=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class i0 extends Ei{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new ke(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ks(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends i0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ic extends ke{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Og extends un{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new ic(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class Mu extends ke{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bg extends un{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Mu(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class dn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=p,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==p){let g=1-a;const m=c*d+l*f+h*p+u*_,v=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const C=Math.sqrt(y),T=Math.atan2(C,m*v);g=Math.sin(g*T)/C,a=Math.sin(a*T)/C}const x=a*v;if(c=c*g+d*x,l=l*g+f*x,h=h*g+p*x,u=u*g+_*x,g===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*u+c*f-l*d,t[e+1]=c*p+h*d+l*u-a*f,t[e+2]=l*p+h*f+a*d-c*u,t[e+3]=h*p-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),f=c(i/2),p=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ze(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,n=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yd.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fc.copy(this).projectOnVector(t),this.sub(Fc)}reflect(t){return this.sub(Fc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fc=new b,yd=new dn;class wn{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(r,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ra.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ra.copy(n.boundingBox)),ra.applyMatrix4(t.matrixWorld),this.union(ra)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($r),oa.subVectors(this.max,$r),rr.subVectors(t.a,$r),or.subVectors(t.b,$r),ar.subVectors(t.c,$r),ts.subVectors(or,rr),es.subVectors(ar,or),Ms.subVectors(rr,ar);let e=[0,-ts.z,ts.y,0,-es.z,es.y,0,-Ms.z,Ms.y,ts.z,0,-ts.x,es.z,0,-es.x,Ms.z,0,-Ms.x,-ts.y,ts.x,0,-es.y,es.x,0,-Ms.y,Ms.x,0];return!Oc(e,rr,or,ar,oa)||(e=[1,0,0,0,1,0,0,0,1],!Oc(e,rr,or,ar,oa))?!1:(aa.crossVectors(ts,es),e=[aa.x,aa.y,aa.z],Oc(e,rr,or,ar,oa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Li),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Li=[new b,new b,new b,new b,new b,new b,new b,new b],Qn=new b,ra=new wn,rr=new b,or=new b,ar=new b,ts=new b,es=new b,Ms=new b,$r=new b,oa=new b,aa=new b,Ss=new b;function Oc(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Ss.fromArray(s,r);const a=i.x*Math.abs(Ss.x)+i.y*Math.abs(Ss.y)+i.z*Math.abs(Ss.z),c=t.dot(Ss),l=e.dot(Ss),h=n.dot(Ss);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const zg=new wn,Jr=new b,Bc=new b;class fn{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):zg.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Jr.subVectors(t,this.center);const e=Jr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Jr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Jr.copy(t.center).add(Bc)),this.expandByPoint(Jr.copy(t.center).sub(Bc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Di=new b,zc=new b,la=new b,ns=new b,kc=new b,ca=new b,Vc=new b;class Vr{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Di)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Di.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Di.copy(this.origin).addScaledVector(this.direction,e),Di.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){zc.copy(t).add(e).multiplyScalar(.5),la.copy(e).sub(t).normalize(),ns.copy(this.origin).sub(zc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(la),a=ns.dot(this.direction),c=-ns.dot(la),l=ns.lengthSq(),h=Math.abs(1-o*o);let u,d,f,p;if(h>0)if(u=o*c-a,d=o*a-c,p=r*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(zc).addScaledVector(la,d),f}intersectSphere(t,e){Di.subVectors(t.center,this.origin);const n=Di.dot(this.direction),i=Di.dot(Di)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Di)!==null}intersectTriangle(t,e,n,i,r){kc.subVectors(e,t),ca.subVectors(n,t),Vc.crossVectors(kc,ca);let o=this.direction.dot(Vc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ns.subVectors(this.origin,t);const c=a*this.direction.dot(ca.crossVectors(ns,ca));if(c<0)return null;const l=a*this.direction.dot(kc.cross(ns));if(l<0||c+l>o)return null;const h=-a*ns.dot(Vc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(t,e,n,i,r,o,a,c,l,h,u,d,f,p,_,g){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,h,u,d,f,p,_,g)}set(t,e,n,i,r,o,a,c,l,h,u,d,f,p,_,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/lr.setFromMatrixColumn(t,0).length(),r=1/lr.setFromMatrixColumn(t,1).length(),o=1/lr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,p=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+p*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=p+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,p=l*h,_=l*u;e[0]=d+_*a,e[4]=p*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,p=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,p=a*h,_=a*u;e[0]=c*h,e[4]=p*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,p=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=p*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+p,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*c,f=o*l,p=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kg,t,Vg)}lookAt(t,e,n){const i=this.elements;return zn.subVectors(t,e),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),is.crossVectors(n,zn),is.lengthSq()===0&&(Math.abs(n.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),is.crossVectors(n,zn)),is.normalize(),ha.crossVectors(zn,is),i[0]=is.x,i[4]=ha.x,i[8]=zn.x,i[1]=is.y,i[5]=ha.y,i[9]=zn.y,i[2]=is.z,i[6]=ha.z,i[10]=zn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],y=n[7],x=n[11],C=n[15],T=i[0],A=i[4],I=i[8],S=i[12],M=i[1],D=i[5],X=i[9],H=i[13],V=i[2],at=i[6],J=i[10],dt=i[14],j=i[3],_t=i[7],bt=i[11],Ct=i[15];return r[0]=o*T+a*M+c*V+l*j,r[4]=o*A+a*D+c*at+l*_t,r[8]=o*I+a*X+c*J+l*bt,r[12]=o*S+a*H+c*dt+l*Ct,r[1]=h*T+u*M+d*V+f*j,r[5]=h*A+u*D+d*at+f*_t,r[9]=h*I+u*X+d*J+f*bt,r[13]=h*S+u*H+d*dt+f*Ct,r[2]=p*T+_*M+g*V+m*j,r[6]=p*A+_*D+g*at+m*_t,r[10]=p*I+_*X+g*J+m*bt,r[14]=p*S+_*H+g*dt+m*Ct,r[3]=v*T+y*M+x*V+C*j,r[7]=v*A+y*D+x*at+C*_t,r[11]=v*I+y*X+x*J+C*bt,r[15]=v*S+y*H+x*dt+C*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],_=t[7],g=t[11],m=t[15];return p*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*f-n*c*f)+_*(+e*c*f-e*l*d+r*o*d-i*o*f+i*l*h-r*c*h)+g*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+m*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],_=t[13],g=t[14],m=t[15],v=u*g*l-_*d*l+_*c*f-a*g*f-u*c*m+a*d*m,y=p*d*l-h*g*l-p*c*f+o*g*f+h*c*m-o*d*m,x=h*_*l-p*u*l+p*a*f-o*_*f-h*a*m+o*u*m,C=p*u*c-h*_*c-p*a*d+o*_*d+h*a*g-o*u*g,T=e*v+n*y+i*x+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=v*A,t[1]=(_*d*r-u*g*r-_*i*f+n*g*f+u*i*m-n*d*m)*A,t[2]=(a*g*r-_*c*r+_*i*l-n*g*l-a*i*m+n*c*m)*A,t[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*f-n*c*f)*A,t[4]=y*A,t[5]=(h*g*r-p*d*r+p*i*f-e*g*f-h*i*m+e*d*m)*A,t[6]=(p*c*r-o*g*r-p*i*l+e*g*l+o*i*m-e*c*m)*A,t[7]=(o*d*r-h*c*r+h*i*l-e*d*l-o*i*f+e*c*f)*A,t[8]=x*A,t[9]=(p*u*r-h*_*r-p*n*f+e*_*f+h*n*m-e*u*m)*A,t[10]=(o*_*r-p*a*r+p*n*l-e*_*l-o*n*m+e*a*m)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=C*A,t[13]=(h*_*i-p*u*i+p*n*d-e*_*d-h*n*g+e*u*g)*A,t[14]=(p*a*i-o*_*i-p*n*c+e*_*c+o*n*g-e*a*g)*A,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,p=r*u,_=o*h,g=o*u,m=a*u,v=c*l,y=c*h,x=c*u,C=n.x,T=n.y,A=n.z;return i[0]=(1-(_+m))*C,i[1]=(f+x)*C,i[2]=(p-y)*C,i[3]=0,i[4]=(f-x)*T,i[5]=(1-(d+m))*T,i[6]=(g+v)*T,i[7]=0,i[8]=(p+y)*A,i[9]=(g-v)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=lr.set(i[0],i[1],i[2]).length();const o=lr.set(i[4],i[5],i[6]).length(),a=lr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],jn.copy(this);const l=1/r,h=1/o,u=1/a;return jn.elements[0]*=l,jn.elements[1]*=l,jn.elements[2]*=l,jn.elements[4]*=h,jn.elements[5]*=h,jn.elements[6]*=h,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,e.setFromRotationMatrix(jn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=xi){const c=this.elements,l=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,p;if(a===xi)f=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===Ro)f=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=xi){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(o-r),d=(e+t)*l,f=(n+i)*h;let p,_;if(a===xi)p=(o+r)*u,_=-2*u;else if(a===Ro)p=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const lr=new b,jn=new Wt,kg=new b(0,0,0),Vg=new b(1,1,1),is=new b,ha=new b,zn=new b,Md=new Wt,Sd=new dn;class En{constructor(t=0,e=0,n=0,i=En.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Md.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Md,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sd.setFromEuler(this),this.setFromQuaternion(Sd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}En.DEFAULT_ORDER="XYZ";class sc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hg=0;const bd=new b,cr=new dn,Ui=new Wt,ua=new b,Kr=new b,Gg=new b,Wg=new dn,wd=new b(1,0,0),Td=new b(0,1,0),Ed=new b(0,0,1),Ad={type:"added"},Xg={type:"removed"},hr={type:"childadded",child:null},Hc={type:"childremoved",child:null};class pe extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pe.DEFAULT_UP.clone();const t=new b,e=new En,n=new dn,i=new b(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Kt}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return cr.setFromAxisAngle(t,e),this.quaternion.multiply(cr),this}rotateOnWorldAxis(t,e){return cr.setFromAxisAngle(t,e),this.quaternion.premultiply(cr),this}rotateX(t){return this.rotateOnAxis(wd,t)}rotateY(t){return this.rotateOnAxis(Td,t)}rotateZ(t){return this.rotateOnAxis(Ed,t)}translateOnAxis(t,e){return bd.copy(t).applyQuaternion(this.quaternion),this.position.add(bd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wd,t)}translateY(t){return this.translateOnAxis(Td,t)}translateZ(t){return this.translateOnAxis(Ed,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ua.copy(t):ua.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(Kr,ua,this.up):Ui.lookAt(ua,Kr,this.up),this.quaternion.setFromRotationMatrix(Ui),i&&(Ui.extractRotation(i.matrixWorld),cr.setFromRotationMatrix(Ui),this.quaternion.premultiply(cr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ad),hr.child=t,this.dispatchEvent(hr),hr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xg),Hc.child=t,this.dispatchEvent(Hc),Hc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ui.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ui),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ad),hr.child=t,this.dispatchEvent(hr),hr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,t,Gg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Kr,Wg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}pe.DEFAULT_UP=new b(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ti=new b,Ni=new b,Gc=new b,Fi=new b,ur=new b,dr=new b,Cd=new b,Wc=new b,Xc=new b,qc=new b,Yc=new fe,Zc=new fe,$c=new fe;class Dn{constructor(t=new b,e=new b,n=new b){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),ti.subVectors(t,e),i.cross(ti);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){ti.subVectors(i,e),Ni.subVectors(n,e),Gc.subVectors(t,e);const o=ti.dot(ti),a=ti.dot(Ni),c=ti.dot(Gc),l=Ni.dot(Ni),h=Ni.dot(Gc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,p=(o*h-a*c)*d;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,Fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Fi.x),c.addScaledVector(o,Fi.y),c.addScaledVector(a,Fi.z),c)}static getInterpolatedAttribute(t,e,n,i,r,o){return Yc.setScalar(0),Zc.setScalar(0),$c.setScalar(0),Yc.fromBufferAttribute(t,e),Zc.fromBufferAttribute(t,n),$c.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Yc,r.x),o.addScaledVector(Zc,r.y),o.addScaledVector($c,r.z),o}static isFrontFacing(t,e,n,i){return ti.subVectors(n,e),Ni.subVectors(t,e),ti.cross(Ni).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ti.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),ti.cross(Ni).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Dn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;ur.subVectors(i,n),dr.subVectors(r,n),Wc.subVectors(t,n);const c=ur.dot(Wc),l=dr.dot(Wc);if(c<=0&&l<=0)return e.copy(n);Xc.subVectors(t,i);const h=ur.dot(Xc),u=dr.dot(Xc);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ur,o);qc.subVectors(t,r);const f=ur.dot(qc),p=dr.dot(qc);if(p>=0&&f<=p)return e.copy(r);const _=f*l-c*p;if(_<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(dr,a);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Cd.subVectors(r,i),a=(u-h)/(u-h+(f-p)),e.copy(i).addScaledVector(Cd,a);const m=1/(g+_+d);return o=_*m,a=d*m,e.copy(n).addScaledVector(ur,o).addScaledVector(dr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const s0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},da={h:0,s:0,l:0};function Jc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class lt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=yu(t,1),e=ze(e,0,1),n=ze(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Jc(o,r,t+1/3),this.g=Jc(o,r,t),this.b=Jc(o,r,t-1/3)}return ce.toWorkingColorSpace(this,i),this}setStyle(t,e=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const n=s0[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}copyLinearToSRGB(t){return this.r=Pr(t.r),this.g=Pr(t.g),this.b=Pr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return ce.fromWorkingColorSpace(cn.copy(this),t),Math.round(ze(cn.r*255,0,255))*65536+Math.round(ze(cn.g*255,0,255))*256+Math.round(ze(cn.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.fromWorkingColorSpace(cn.copy(this),e);const n=cn.r,i=cn.g,r=cn.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.fromWorkingColorSpace(cn.copy(this),e),t.r=cn.r,t.g=cn.g,t.b=cn.b,t}getStyle(t=Ke){ce.fromWorkingColorSpace(cn.copy(this),t);const e=cn.r,n=cn.g,i=cn.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ss),this.setHSL(ss.h+t,ss.s+e,ss.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ss),t.getHSL(da);const n=vo(ss.h,da.h,e),i=vo(ss.s,da.s,e),r=vo(ss.l,da.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const cn=new lt;lt.NAMES=s0;let qg=0;class pn extends Ei{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qg++}),this.uuid=Hn(),this.name="",this.blending=Hs,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ol,this.blendDst=al,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hs&&(n.blending=this.blending),this.side!==qi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ol&&(n.blendSrc=this.blendSrc),this.blendDst!==al&&(n.blendDst=this.blendDst),this.blendEquation!==ls&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class An extends pn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ki=Yg();function Yg(){const s=new ArrayBuffer(4),t=new Float32Array(s),e=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function In(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=ze(s,-65504,65504),ki.floatView[0]=s;const t=ki.uint32View[0],e=t>>23&511;return ki.baseTable[e]+((t&8388607)>>ki.shiftTable[e])}function ho(s){const t=s>>10;return ki.uint32View[0]=ki.mantissaTable[ki.offsetTable[t]+(s&1023)]+ki.exponentTable[t],ki.floatView[0]}const Zg={toHalfFloat:In,fromHalfFloat:ho},qe=new b,fa=new nt;class Me{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Co,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)fa.fromBufferAttribute(this,e),fa.applyMatrix3(t),this.setXY(e,fa.x,fa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix3(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),i=jt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),i=jt(i,this.array),r=jt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Co&&(t.usage=this.usage),t}}class $g extends Me{constructor(t,e,n){super(new Int8Array(t),e,n)}}class Jg extends Me{constructor(t,e,n){super(new Uint8Array(t),e,n)}}class Kg extends Me{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}}class Qg extends Me{constructor(t,e,n){super(new Int16Array(t),e,n)}}class Su extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class jg extends Me{constructor(t,e,n){super(new Int32Array(t),e,n)}}class bu extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class t_ extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=ho(this.array[t*this.itemSize]);return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize]=In(e),this}getY(t){let e=ho(this.array[t*this.itemSize+1]);return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+1]=In(e),this}getZ(t){let e=ho(this.array[t*this.itemSize+2]);return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+2]=In(e),this}getW(t){let e=ho(this.array[t*this.itemSize+3]);return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+3]=In(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.array[t+0]=In(e),this.array[t+1]=In(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),i=jt(i,this.array)),this.array[t+0]=In(e),this.array[t+1]=In(n),this.array[t+2]=In(i),this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),i=jt(i,this.array),r=jt(r,this.array)),this.array[t+0]=In(e),this.array[t+1]=In(n),this.array[t+2]=In(i),this.array[t+3]=In(r),this}}class It extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}}let e_=0;const Wn=new Wt,Kc=new pe,fr=new b,kn=new wn,Qr=new wn,tn=new b;class Zt extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(t0(t)?bu:Su)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Wn.makeRotationFromQuaternion(t),this.applyMatrix4(Wn),this}rotateX(t){return Wn.makeRotationX(t),this.applyMatrix4(Wn),this}rotateY(t){return Wn.makeRotationY(t),this.applyMatrix4(Wn),this}rotateZ(t){return Wn.makeRotationZ(t),this.applyMatrix4(Wn),this}translate(t,e,n){return Wn.makeTranslation(t,e,n),this.applyMatrix4(Wn),this}scale(t,e,n){return Wn.makeScale(t,e,n),this.applyMatrix4(Wn),this}lookAt(t){return Kc.lookAt(t),Kc.updateMatrix(),this.applyMatrix4(Kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new It(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];kn.setFromBufferAttribute(r),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,kn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,kn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(kn.min),this.boundingBox.expandByPoint(kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){const n=this.boundingSphere.center;if(kn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Qr.setFromBufferAttribute(a),this.morphTargetsRelative?(tn.addVectors(kn.min,Qr.min),kn.expandByPoint(tn),tn.addVectors(kn.max,Qr.max),kn.expandByPoint(tn)):(kn.expandByPoint(Qr.min),kn.expandByPoint(Qr.max))}kn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)tn.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(tn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)tn.fromBufferAttribute(a,l),c&&(fr.fromBufferAttribute(t,l),tn.add(fr)),i=Math.max(i,n.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new b,c[I]=new b;const l=new b,h=new b,u=new b,d=new nt,f=new nt,p=new nt,_=new b,g=new b;function m(I,S,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,S),p.fromBufferAttribute(r,M),h.sub(l),u.sub(l),f.sub(d),p.sub(d);const D=1/(f.x*p.y-p.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(D),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(D),a[I].add(_),a[S].add(_),a[M].add(_),c[I].add(g),c[S].add(g),c[M].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let I=0,S=v.length;I<S;++I){const M=v[I],D=M.start,X=M.count;for(let H=D,V=D+X;H<V;H+=3)m(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const y=new b,x=new b,C=new b,T=new b;function A(I){C.fromBufferAttribute(i,I),T.copy(C);const S=a[I];y.copy(S),y.sub(C.multiplyScalar(C.dot(S))).normalize(),x.crossVectors(T,S);const D=x.dot(c[I])<0?-1:1;o.setXYZW(I,y.x,y.y,y.z,D)}for(let I=0,S=v.length;I<S;++I){const M=v[I],D=M.start,X=M.count;for(let H=D,V=D+X;H<V;H+=3)A(t.getX(H+0)),A(t.getX(H+1)),A(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new b,r=new b,o=new b,a=new b,c=new b,l=new b,h=new b,u=new b;if(t)for(let d=0,f=t.count;d<f;d+=3){const p=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)tn.fromBufferAttribute(t,e),tn.normalize(),t.setXYZ(e,tn.x,tn.y,tn.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,p=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let m=0;m<h;m++)d[p++]=l[f++]}return new Me(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Zt,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rd=new Wt,bs=new Vr,pa=new fn,Pd=new b,ma=new b,ga=new b,_a=new b,Qc=new b,xa=new b,Id=new b,va=new b;class K extends pe{constructor(t=new Zt,e=new An){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){xa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Qc.fromBufferAttribute(u,t),o?xa.addScaledVector(Qc,h):xa.addScaledVector(Qc.sub(e),h))}e.add(xa)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(r),bs.copy(t.ray).recast(t.near),!(pa.containsPoint(bs.origin)===!1&&(bs.intersectSphere(pa,Pd)===null||bs.origin.distanceToSquared(Pd)>(t.far-t.near)**2))&&(Rd.copy(r).invert(),bs.copy(t.ray).applyMatrix4(Rd),!(n.boundingBox!==null&&bs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,bs)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,C=y;x<C;x+=3){const T=a.getX(x),A=a.getX(x+1),I=a.getX(x+2);i=ya(this,m,t,n,l,h,u,T,A,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=a.getX(g),y=a.getX(g+1),x=a.getX(g+2);i=ya(this,o,t,n,l,h,u,v,y,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,C=y;x<C;x+=3){const T=x,A=x+1,I=x+2;i=ya(this,m,t,n,l,h,u,T,A,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,y=g+1,x=g+2;i=ya(this,o,t,n,l,h,u,v,y,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function n_(s,t,e,n,i,r,o,a){let c;if(t.side===bn?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===qi,a),c===null)return null;va.copy(a),va.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(va);return l<e.near||l>e.far?null:{distance:l,point:va.clone(),object:s}}function ya(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,ma),s.getVertexPosition(c,ga),s.getVertexPosition(l,_a);const h=n_(s,t,e,n,ma,ga,_a,Id);if(h){const u=new b;Dn.getBarycoord(Id,ma,ga,_a,u),i&&(h.uv=Dn.getInterpolatedAttribute(i,a,c,l,u,new nt)),r&&(h.uv1=Dn.getInterpolatedAttribute(r,a,c,l,u,new nt)),o&&(h.normal=Dn.getInterpolatedAttribute(o,a,c,l,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new b,materialIndex:0};Dn.getNormal(ma,ga,_a,d.normal),h.face=d,h.barycoord=u}return h}class Ai extends Zt{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new It(l,3)),this.setAttribute("normal",new It(h,3)),this.setAttribute("uv",new It(u,2));function p(_,g,m,v,y,x,C,T,A,I,S){const M=x/A,D=C/I,X=x/2,H=C/2,V=T/2,at=A+1,J=I+1;let dt=0,j=0;const _t=new b;for(let bt=0;bt<J;bt++){const Ct=bt*D-H;for(let $t=0;$t<at;$t++){const me=$t*M-X;_t[_]=me*v,_t[g]=Ct*y,_t[m]=V,l.push(_t.x,_t.y,_t.z),_t[_]=0,_t[g]=0,_t[m]=T>0?1:-1,h.push(_t.x,_t.y,_t.z),u.push($t/A),u.push(1-bt/I),dt+=1}}for(let bt=0;bt<I;bt++)for(let Ct=0;Ct<A;Ct++){const $t=d+Ct+at*bt,me=d+Ct+at*(bt+1),st=d+(Ct+1)+at*(bt+1),pt=d+(Ct+1)+at*bt;c.push($t,me,pt),c.push(me,st,pt),j+=6}a.addGroup(f,j,S),f+=j,d+=dt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ai(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ur(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function gn(s){const t={};for(let e=0;e<s.length;e++){const n=Ur(s[e]);for(const i in n)t[i]=n[i]}return t}function i_(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function r0(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}const Nr={clone:Ur,merge:gn};var s_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,r_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class rn extends pn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=s_,this.fragmentShader=r_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ur(t.uniforms),this.uniformsGroups=i_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class rc extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=xi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rs=new b,Ld=new nt,Dd=new nt;class sn extends rc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Dr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Dr*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(rs.x,rs.y).multiplyScalar(-t/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rs.x,rs.y).multiplyScalar(-t/rs.z)}getViewSize(t,e){return this.getViewBounds(t,Ld,Dd),e.subVectors(Dd,Ld)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ws*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const pr=-90,mr=1;class o0 extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new sn(pr,mr,t,e);i.layers=this.layers,this.add(i);const r=new sn(pr,mr,t,e);r.layers=this.layers,this.add(r);const o=new sn(pr,mr,t,e);o.layers=this.layers,this.add(o);const a=new sn(pr,mr,t,e);a.layers=this.layers,this.add(a);const c=new sn(pr,mr,t,e);c.layers=this.layers,this.add(c);const l=new sn(pr,mr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===xi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ro)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Wo extends ke{constructor(t,e,n,i,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Yi,super(t,e,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class a0 extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Wo(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ai(5,5,5),r=new rn({name:"CubemapFromEquirect",uniforms:Ur(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:vi});r.uniforms.tEquirect.value=e;const o=new K(i,r),a=e.minFilter;return e.minFilter===si&&(e.minFilter=Ze),new o0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const jc=new b,o_=new b,a_=new Kt;class as{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=jc.subVectors(n,e).cross(o_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(jc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||a_.getNormalMatrix(t),i=this.coplanarPoint(jc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ws=new fn,Ma=new b;class Xo{constructor(t=new as,e=new as,n=new as,i=new as,r=new as,o=new as){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xi){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],_=i[10],g=i[11],m=i[12],v=i[13],y=i[14],x=i[15];if(n[0].setComponents(c-r,d-l,g-f,x-m).normalize(),n[1].setComponents(c+r,d+l,g+f,x+m).normalize(),n[2].setComponents(c+o,d+h,g+p,x+v).normalize(),n[3].setComponents(c-o,d-h,g-p,x-v).normalize(),n[4].setComponents(c-a,d-u,g-_,x-y).normalize(),e===xi)n[5].setComponents(c+a,d+u,g+_,x+y).normalize();else if(e===Ro)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ws.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ws.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ws)}intersectsSprite(t){return ws.center.set(0,0,0),ws.radius=.7071067811865476,ws.applyMatrix4(t.matrixWorld),this.intersectsSphere(ws)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ma.x=i.normal.x>0?t.max.x:t.min.x,Ma.y=i.normal.y>0?t.max.y:t.min.y,Ma.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ma)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function l0(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function l_(s){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const _=u[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}class be extends Zt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const v=m*d-o;for(let y=0;y<l;y++){const x=y*u-r;p.push(x,-v,0),_.push(0,0,1),g.push(y/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<a;v++){const y=v+l*m,x=v+l*(m+1),C=v+1+l*(m+1),T=v+1+l*m;f.push(y,x,T),f.push(x,C,T)}this.setIndex(f),this.setAttribute("position",new It(p,3)),this.setAttribute("normal",new It(_,3)),this.setAttribute("uv",new It(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new be(t.width,t.height,t.widthSegments,t.heightSegments)}}var c_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,h_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,u_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,p_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,m_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,g_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,__=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,x_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,v_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,y_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,M_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,S_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,b_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,w_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,T_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,E_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,A_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,C_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,R_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,P_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,I_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,L_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,D_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,U_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,N_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,F_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,O_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,B_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,z_="gl_FragColor = linearToOutputTexel( gl_FragColor );",k_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,V_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,H_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,G_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,W_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,X_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,q_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Y_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Z_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,J_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,K_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Q_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,j_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ex=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,nx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ix=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ox=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ax=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ux=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,px=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_x=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Tx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ex=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ax=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Cx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Px=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ix=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Lx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ux=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ox=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Xx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Yx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$x=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Jx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Qx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ev=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,nv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,iv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,av=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,gv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_v=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ev=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Av=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Pv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Iv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Dv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ov=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ie={alphahash_fragment:c_,alphahash_pars_fragment:h_,alphamap_fragment:u_,alphamap_pars_fragment:d_,alphatest_fragment:f_,alphatest_pars_fragment:p_,aomap_fragment:m_,aomap_pars_fragment:g_,batching_pars_vertex:__,batching_vertex:x_,begin_vertex:v_,beginnormal_vertex:y_,bsdfs:M_,iridescence_fragment:S_,bumpmap_pars_fragment:b_,clipping_planes_fragment:w_,clipping_planes_pars_fragment:T_,clipping_planes_pars_vertex:E_,clipping_planes_vertex:A_,color_fragment:C_,color_pars_fragment:R_,color_pars_vertex:P_,color_vertex:I_,common:L_,cube_uv_reflection_fragment:D_,defaultnormal_vertex:U_,displacementmap_pars_vertex:N_,displacementmap_vertex:F_,emissivemap_fragment:O_,emissivemap_pars_fragment:B_,colorspace_fragment:z_,colorspace_pars_fragment:k_,envmap_fragment:V_,envmap_common_pars_fragment:H_,envmap_pars_fragment:G_,envmap_pars_vertex:W_,envmap_physical_pars_fragment:ex,envmap_vertex:X_,fog_vertex:q_,fog_pars_vertex:Y_,fog_fragment:Z_,fog_pars_fragment:$_,gradientmap_pars_fragment:J_,lightmap_pars_fragment:K_,lights_lambert_fragment:Q_,lights_lambert_pars_fragment:j_,lights_pars_begin:tx,lights_toon_fragment:nx,lights_toon_pars_fragment:ix,lights_phong_fragment:sx,lights_phong_pars_fragment:rx,lights_physical_fragment:ox,lights_physical_pars_fragment:ax,lights_fragment_begin:lx,lights_fragment_maps:cx,lights_fragment_end:hx,logdepthbuf_fragment:ux,logdepthbuf_pars_fragment:dx,logdepthbuf_pars_vertex:fx,logdepthbuf_vertex:px,map_fragment:mx,map_pars_fragment:gx,map_particle_fragment:_x,map_particle_pars_fragment:xx,metalnessmap_fragment:vx,metalnessmap_pars_fragment:yx,morphinstance_vertex:Mx,morphcolor_vertex:Sx,morphnormal_vertex:bx,morphtarget_pars_vertex:wx,morphtarget_vertex:Tx,normal_fragment_begin:Ex,normal_fragment_maps:Ax,normal_pars_fragment:Cx,normal_pars_vertex:Rx,normal_vertex:Px,normalmap_pars_fragment:Ix,clearcoat_normal_fragment_begin:Lx,clearcoat_normal_fragment_maps:Dx,clearcoat_pars_fragment:Ux,iridescence_pars_fragment:Nx,opaque_fragment:Fx,packing:Ox,premultiplied_alpha_fragment:Bx,project_vertex:zx,dithering_fragment:kx,dithering_pars_fragment:Vx,roughnessmap_fragment:Hx,roughnessmap_pars_fragment:Gx,shadowmap_pars_fragment:Wx,shadowmap_pars_vertex:Xx,shadowmap_vertex:qx,shadowmask_pars_fragment:Yx,skinbase_vertex:Zx,skinning_pars_vertex:$x,skinning_vertex:Jx,skinnormal_vertex:Kx,specularmap_fragment:Qx,specularmap_pars_fragment:jx,tonemapping_fragment:tv,tonemapping_pars_fragment:ev,transmission_fragment:nv,transmission_pars_fragment:iv,uv_pars_fragment:sv,uv_pars_vertex:rv,uv_vertex:ov,worldpos_vertex:av,background_vert:lv,background_frag:cv,backgroundCube_vert:hv,backgroundCube_frag:uv,cube_vert:dv,cube_frag:fv,depth_vert:pv,depth_frag:mv,distanceRGBA_vert:gv,distanceRGBA_frag:_v,equirect_vert:xv,equirect_frag:vv,linedashed_vert:yv,linedashed_frag:Mv,meshbasic_vert:Sv,meshbasic_frag:bv,meshlambert_vert:wv,meshlambert_frag:Tv,meshmatcap_vert:Ev,meshmatcap_frag:Av,meshnormal_vert:Cv,meshnormal_frag:Rv,meshphong_vert:Pv,meshphong_frag:Iv,meshphysical_vert:Lv,meshphysical_frag:Dv,meshtoon_vert:Uv,meshtoon_frag:Nv,points_vert:Fv,points_frag:Ov,shadow_vert:Bv,shadow_frag:zv,sprite_vert:kv,sprite_frag:Vv},yt={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},ni={basic:{uniforms:gn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:gn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new lt(0)}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:gn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:gn([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:gn([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new lt(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:gn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:gn([yt.points,yt.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:gn([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:gn([yt.common,yt.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:gn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:gn([yt.sprite,yt.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distanceRGBA:{uniforms:gn([yt.common,yt.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distanceRGBA_vert,fragmentShader:ie.distanceRGBA_frag},shadow:{uniforms:gn([yt.lights,yt.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};ni.physical={uniforms:gn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};const Sa={r:0,b:0,g:0},Ts=new En,Hv=new Wt;function Gv(s,t,e,n,i,r,o){const a=new lt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function p(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?e:t).get(y)),y}function _(v){let y=!1;const x=p(v);x===null?m(a,c):x&&x.isColor&&(m(x,1),y=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(v,y){const x=p(y);x&&(x.isCubeTexture||x.mapping===kr)?(h===void 0&&(h=new K(new Ai(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:Ur(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ts.copy(y.backgroundRotation),Ts.x*=-1,Ts.y*=-1,Ts.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ts.y*=-1,Ts.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Hv.makeRotationFromEuler(Ts)),h.material.toneMapped=ce.getTransfer(x.colorSpace)!==ye,(u!==x||d!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new K(new be(2,2),new rn({name:"BackgroundMaterial",uniforms:Ur(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ce.getTransfer(x.colorSpace)!==ye,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,y){v.getRGB(Sa,r0(s)),n.buffers.color.setClear(Sa.r,Sa.g,Sa.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,m(a,c)},render:_,addToRenderList:g}}function Wv(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(M,D,X,H,V){let at=!1;const J=u(H,X,D);r!==J&&(r=J,l(r.object)),at=f(M,H,X,V),at&&p(M,H,X,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(at||o)&&(o=!1,x(M,D,X,H),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,D,X){const H=X.wireframe===!0;let V=n[M.id];V===void 0&&(V={},n[M.id]=V);let at=V[D.id];at===void 0&&(at={},V[D.id]=at);let J=at[H];return J===void 0&&(J=d(c()),at[H]=J),J}function d(M){const D=[],X=[],H=[];for(let V=0;V<e;V++)D[V]=0,X[V]=0,H[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:X,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,D,X,H){const V=r.attributes,at=D.attributes;let J=0;const dt=X.getAttributes();for(const j in dt)if(dt[j].location>=0){const bt=V[j];let Ct=at[j];if(Ct===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(Ct=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(Ct=M.instanceColor)),bt===void 0||bt.attribute!==Ct||Ct&&bt.data!==Ct.data)return!0;J++}return r.attributesNum!==J||r.index!==H}function p(M,D,X,H){const V={},at=D.attributes;let J=0;const dt=X.getAttributes();for(const j in dt)if(dt[j].location>=0){let bt=at[j];bt===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(bt=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(bt=M.instanceColor));const Ct={};Ct.attribute=bt,bt&&bt.data&&(Ct.data=bt.data),V[j]=Ct,J++}r.attributes=V,r.attributesNum=J,r.index=H}function _(){const M=r.newAttributes;for(let D=0,X=M.length;D<X;D++)M[D]=0}function g(M){m(M,0)}function m(M,D){const X=r.newAttributes,H=r.enabledAttributes,V=r.attributeDivisors;X[M]=1,H[M]===0&&(s.enableVertexAttribArray(M),H[M]=1),V[M]!==D&&(s.vertexAttribDivisor(M,D),V[M]=D)}function v(){const M=r.newAttributes,D=r.enabledAttributes;for(let X=0,H=D.length;X<H;X++)D[X]!==M[X]&&(s.disableVertexAttribArray(X),D[X]=0)}function y(M,D,X,H,V,at,J){J===!0?s.vertexAttribIPointer(M,D,X,V,at):s.vertexAttribPointer(M,D,X,H,V,at)}function x(M,D,X,H){_();const V=H.attributes,at=X.getAttributes(),J=D.defaultAttributeValues;for(const dt in at){const j=at[dt];if(j.location>=0){let _t=V[dt];if(_t===void 0&&(dt==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),dt==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor)),_t!==void 0){const bt=_t.normalized,Ct=_t.itemSize,$t=t.get(_t);if($t===void 0)continue;const me=$t.buffer,st=$t.type,pt=$t.bytesPerElement,N=st===s.INT||st===s.UNSIGNED_INT||_t.gpuType===Jl;if(_t.isInterleavedBufferAttribute){const L=_t.data,Q=L.stride,W=_t.offset;if(L.isInstancedInterleavedBuffer){for(let k=0;k<j.locationSize;k++)m(j.location+k,L.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let k=0;k<j.locationSize;k++)g(j.location+k);s.bindBuffer(s.ARRAY_BUFFER,me);for(let k=0;k<j.locationSize;k++)y(j.location+k,Ct/j.locationSize,st,bt,Q*pt,(W+Ct/j.locationSize*k)*pt,N)}else{if(_t.isInstancedBufferAttribute){for(let L=0;L<j.locationSize;L++)m(j.location+L,_t.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let L=0;L<j.locationSize;L++)g(j.location+L);s.bindBuffer(s.ARRAY_BUFFER,me);for(let L=0;L<j.locationSize;L++)y(j.location+L,Ct/j.locationSize,st,bt,Ct*pt,Ct/j.locationSize*L*pt,N)}}else if(J!==void 0){const bt=J[dt];if(bt!==void 0)switch(bt.length){case 2:s.vertexAttrib2fv(j.location,bt);break;case 3:s.vertexAttrib3fv(j.location,bt);break;case 4:s.vertexAttrib4fv(j.location,bt);break;default:s.vertexAttrib1fv(j.location,bt)}}}}v()}function C(){I();for(const M in n){const D=n[M];for(const X in D){const H=D[X];for(const V in H)h(H[V].object),delete H[V];delete D[X]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const D=n[M.id];for(const X in D){const H=D[X];for(const V in H)h(H[V].object),delete H[V];delete D[X]}delete n[M.id]}function A(M){for(const D in n){const X=n[D];if(X[M.id]===void 0)continue;const H=X[M.id];for(const V in H)h(H[V].object),delete H[V];delete X[M.id]}}function I(){S(),o=!0,r!==i&&(r=i,l(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function Xv(s,t,e){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<l.length;p++)o(l[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let p=0;for(let _=0;_<u;_++)p+=h[_]*d[_];e.update(p,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function qv(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==Sn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const I=A===li&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==bi&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Nn&&!I)}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=p>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:C,maxSamples:T}}function Yv(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new as,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||r&&!g)r?h(null):l();else{const v=r?0:n,y=v*4;let x=m.clippingState||null;c.value=x,x=h(p,d,y,f);for(let C=0;C!==y;++C)x[C]=e[C];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,p!==!0||g===null){const m=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,x=f;y!==_;++y,x+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Zv(s){let t=new WeakMap;function e(o,a){return a===bo?o.mapping=Yi:a===wo&&(o.mapping=fs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===bo||a===wo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new a0(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class qo extends rc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ar=4,Ud=[.125,.215,.35,.446,.526,.582],Os=20,th=new qo,Nd=new lt;let eh=null,nh=0,ih=0,sh=!1;const Ns=(1+Math.sqrt(5))/2,gr=1/Ns,Fd=[new b(-Ns,gr,0),new b(Ns,gr,0),new b(-gr,0,Ns),new b(gr,0,Ns),new b(0,Ns,-gr),new b(0,Ns,gr),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class kh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){eh=this._renderer.getRenderTarget(),nh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(eh,nh,ih),this._renderer.xr.enabled=sh,t.scissorTest=!1,ba(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Yi||t.mapping===fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),eh=this._renderer.getRenderTarget(),nh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:li,format:Sn,colorSpace:js,depthBuffer:!1},i=Od(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Od(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$v(r)),this._blurMaterial=Jv(r,t,e)}return i}_compileMaterial(t){const e=new K(this._lodPlanes[0],t);this._renderer.compile(e,th)}_sceneToCubeUV(t,e,n,i){const a=new sn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Nd),h.toneMapping=Wi,h.autoClear=!1;const f=new An({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1}),p=new K(new Ai,f);let _=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(Nd),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):v===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const y=this._cubeSize;ba(i,v*y,m>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Yi||t.mapping===fs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=zd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bd());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new K(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;ba(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,th)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Fd[(i-r-1)%Fd.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new K(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Os-1),_=r/p,g=isFinite(r)?1+Math.floor(h*_):Os;g>Os&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Os}`);const m=[];let v=0;for(let A=0;A<Os;++A){const I=A/_,S=Math.exp(-I*I/2);m.push(S),A===0?v+=S:A<g&&(v+=2*S)}for(let A=0;A<m.length;A++)m[A]=m[A]/v;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=p,d.mipInt.value=y-n;const x=this._sizeLods[i],C=3*x*(i>y-Ar?i-y+Ar:0),T=4*(this._cubeSize-x);ba(e,C,T,3*x,2*x),c.setRenderTarget(e),c.render(u,th)}}function $v(s){const t=[],e=[],n=[];let i=s;const r=s-Ar+1+Ud.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-Ar?c=Ud[o-s+Ar-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),y=new Float32Array(g*p*f),x=new Float32Array(m*p*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,I=T>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];v.set(S,_*p*T),y.set(d,g*p*T);const M=[T,T,T,T,T,T];x.set(M,m*p*T)}const C=new Zt;C.setAttribute("position",new Me(v,_)),C.setAttribute("uv",new Me(y,g)),C.setAttribute("faceIndex",new Me(x,m)),t.push(C),i>Ar&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Od(s,t,e){const n=new un(s,t,e);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ba(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Jv(s,t,e){const n=new Float32Array(Os),i=new b(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:Os,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Bd(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function zd(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function wu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Kv(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===bo||c===wo,h=c===Yi||c===fs;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new kh(s)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new kh(s)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Qv(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&co("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function jv(s,t,e,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const p in d.attributes)t.remove(d.attributes[p]);for(const p in d.morphAttributes){const _=d.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)t.remove(_[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const p in d)t.update(d[p],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const _=f[p];for(let g=0,m=_.length;g<m;g++)t.update(_[g],s.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let y=0,x=v.length;y<x;y+=3){const C=v[y+0],T=v[y+1],A=v[y+2];d.push(C,T,T,A,A,C)}}else if(p!==void 0){const v=p.array;_=p.version;for(let y=0,x=v.length/3-1;y<x;y+=3){const C=y+0,T=y+1,A=y+2;d.push(C,T,T,A,A,C)}}else return;const g=new(t0(d)?bu:Su)(d,1);g.version=_;const m=r.get(u);m&&t.remove(m),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function t1(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,p){p!==0&&(s.drawElementsInstanced(n,f,r,d*o,p),e.update(f,n,p))}function h(d,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function u(d,f,p,_){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)l(d[m]/o,f[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=f[v]*_[v];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function e1(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function n1(s,t,e){const n=new WeakMap,i=new fe;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),p===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,C=1;x>t.maxTextureSize&&(C=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const T=new Float32Array(x*C*4*u),A=new ic(T,x,C,u);A.type=Nn,A.needsUpdate=!0;const I=y*4;for(let M=0;M<u;M++){const D=g[M],X=m[M],H=v[M],V=x*C*4*M;for(let at=0;at<D.count;at++){const J=at*I;f===!0&&(i.fromBufferAttribute(D,at),T[V+J+0]=i.x,T[V+J+1]=i.y,T[V+J+2]=i.z,T[V+J+3]=0),p===!0&&(i.fromBufferAttribute(X,at),T[V+J+4]=i.x,T[V+J+5]=i.y,T[V+J+6]=i.z,T[V+J+7]=0),_===!0&&(i.fromBufferAttribute(H,at),T[V+J+8]=i.x,T[V+J+9]=i.y,T[V+J+10]=i.z,T[V+J+11]=H.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new nt(x,C)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const p=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",p),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function i1(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Tu extends ke{constructor(t,e,n,i,r,o,a,c,l,h=Gs){if(h!==Gs&&h!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Gs&&(n=Zi),n===void 0&&h===$s&&(n=Zs),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Fe,this.minFilter=c!==void 0?c:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const c0=new ke,kd=new Tu(1,1),h0=new ic,u0=new Mu,d0=new Wo,Vd=[],Hd=[],Gd=new Float32Array(16),Wd=new Float32Array(9),Xd=new Float32Array(4);function Hr(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Vd[i];if(r===void 0&&(r=new Float32Array(i),Vd[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Qe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function je(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function oc(s,t){let e=Hd[t];e===void 0&&(e=new Int32Array(t),Hd[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function s1(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function r1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;s.uniform2fv(this.addr,t),je(e,t)}}function o1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Qe(e,t))return;s.uniform3fv(this.addr,t),je(e,t)}}function a1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;s.uniform4fv(this.addr,t),je(e,t)}}function l1(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),je(e,t)}else{if(Qe(e,n))return;Xd.set(n),s.uniformMatrix2fv(this.addr,!1,Xd),je(e,n)}}function c1(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),je(e,t)}else{if(Qe(e,n))return;Wd.set(n),s.uniformMatrix3fv(this.addr,!1,Wd),je(e,n)}}function h1(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),je(e,t)}else{if(Qe(e,n))return;Gd.set(n),s.uniformMatrix4fv(this.addr,!1,Gd),je(e,n)}}function u1(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function d1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;s.uniform2iv(this.addr,t),je(e,t)}}function f1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;s.uniform3iv(this.addr,t),je(e,t)}}function p1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;s.uniform4iv(this.addr,t),je(e,t)}}function m1(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function g1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;s.uniform2uiv(this.addr,t),je(e,t)}}function _1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;s.uniform3uiv(this.addr,t),je(e,t)}}function x1(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;s.uniform4uiv(this.addr,t),je(e,t)}}function v1(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(kd.compareFunction=vu,r=kd):r=c0,e.setTexture2D(t||r,i)}function y1(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||u0,i)}function M1(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||d0,i)}function S1(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||h0,i)}function b1(s){switch(s){case 5126:return s1;case 35664:return r1;case 35665:return o1;case 35666:return a1;case 35674:return l1;case 35675:return c1;case 35676:return h1;case 5124:case 35670:return u1;case 35667:case 35671:return d1;case 35668:case 35672:return f1;case 35669:case 35673:return p1;case 5125:return m1;case 36294:return g1;case 36295:return _1;case 36296:return x1;case 35678:case 36198:case 36298:case 36306:case 35682:return v1;case 35679:case 36299:case 36307:return y1;case 35680:case 36300:case 36308:case 36293:return M1;case 36289:case 36303:case 36311:case 36292:return S1}}function w1(s,t){s.uniform1fv(this.addr,t)}function T1(s,t){const e=Hr(t,this.size,2);s.uniform2fv(this.addr,e)}function E1(s,t){const e=Hr(t,this.size,3);s.uniform3fv(this.addr,e)}function A1(s,t){const e=Hr(t,this.size,4);s.uniform4fv(this.addr,e)}function C1(s,t){const e=Hr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function R1(s,t){const e=Hr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function P1(s,t){const e=Hr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function I1(s,t){s.uniform1iv(this.addr,t)}function L1(s,t){s.uniform2iv(this.addr,t)}function D1(s,t){s.uniform3iv(this.addr,t)}function U1(s,t){s.uniform4iv(this.addr,t)}function N1(s,t){s.uniform1uiv(this.addr,t)}function F1(s,t){s.uniform2uiv(this.addr,t)}function O1(s,t){s.uniform3uiv(this.addr,t)}function B1(s,t){s.uniform4uiv(this.addr,t)}function z1(s,t,e){const n=this.cache,i=t.length,r=oc(e,i);Qe(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||c0,r[o])}function k1(s,t,e){const n=this.cache,i=t.length,r=oc(e,i);Qe(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||u0,r[o])}function V1(s,t,e){const n=this.cache,i=t.length,r=oc(e,i);Qe(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||d0,r[o])}function H1(s,t,e){const n=this.cache,i=t.length,r=oc(e,i);Qe(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||h0,r[o])}function G1(s){switch(s){case 5126:return w1;case 35664:return T1;case 35665:return E1;case 35666:return A1;case 35674:return C1;case 35675:return R1;case 35676:return P1;case 5124:case 35670:return I1;case 35667:case 35671:return L1;case 35668:case 35672:return D1;case 35669:case 35673:return U1;case 5125:return N1;case 36294:return F1;case 36295:return O1;case 36296:return B1;case 35678:case 36198:case 36298:case 36306:case 35682:return z1;case 35679:case 36299:case 36307:return k1;case 35680:case 36300:case 36308:case 36293:return V1;case 36289:case 36303:case 36311:case 36292:return H1}}class W1{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=b1(e.type)}}class X1{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=G1(e.type)}}class q1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const rh=/(\w+)(\])?(\[|\.)?/g;function qd(s,t){s.seq.push(t),s.map[t.id]=t}function Y1(s,t,e){const n=s.name,i=n.length;for(rh.lastIndex=0;;){const r=rh.exec(n),o=rh.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){qd(e,l===void 0?new W1(a,s,t):new X1(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new q1(a),qd(e,u)),e=u}}}class tl{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Y1(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Yd(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Z1=37297;let $1=0;function J1(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Zd=new Kt;function K1(s){ce._getMatrix(Zd,ce.workingColorSpace,s);const t=`mat3( ${Zd.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(s)){case Go:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function $d(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+J1(s.getShaderSource(t),o)}else return i}function Q1(s,t){const e=K1(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function j1(s,t){let e;switch(t){case iu:e="Linear";break;case su:e="Reinhard";break;case ru:e="Cineon";break;case Zl:e="ACESFilmic";break;case ou:e="AgX";break;case au:e="Neutral";break;case zp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const wa=new b;function ty(){ce.getLuminanceCoefficients(wa);const s=wa.x.toFixed(4),t=wa.y.toFixed(4),e=wa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ey(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(uo).join(`
`)}function ny(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function iy(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function uo(s){return s!==""}function Jd(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kd(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const sy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vh(s){return s.replace(sy,oy)}const ry=new Map;function oy(s,t){let e=ie[t];if(e===void 0){const n=ry.get(t);if(n!==void 0)e=ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Vh(e)}const ay=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qd(s){return s.replace(ay,ly)}function ly(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jd(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function cy(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===eu?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===nu?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===mi&&(t="SHADOWMAP_TYPE_VSM"),t}function hy(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Yi:case fs:t="ENVMAP_TYPE_CUBE";break;case kr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function uy(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case fs:t="ENVMAP_MODE_REFRACTION";break}return t}function dy(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Vo:t="ENVMAP_BLENDING_MULTIPLY";break;case Op:t="ENVMAP_BLENDING_MIX";break;case Bp:t="ENVMAP_BLENDING_ADD";break}return t}function fy(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function py(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=cy(e),l=hy(e),h=uy(e),u=dy(e),d=fy(e),f=ey(e),p=ny(r),_=i.createProgram();let g,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(uo).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(uo).join(`
`),m.length>0&&(m+=`
`)):(g=[jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uo).join(`
`),m=[jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wi?"#define TONE_MAPPING":"",e.toneMapping!==Wi?ie.tonemapping_pars_fragment:"",e.toneMapping!==Wi?j1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,Q1("linearToOutputTexel",e.outputColorSpace),ty(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(uo).join(`
`)),o=Vh(o),o=Jd(o,e),o=Kd(o,e),a=Vh(a),a=Jd(a,e),a=Kd(a,e),o=Qd(o),a=Qd(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===zh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=v+g+o,x=v+m+a,C=Yd(i,i.VERTEX_SHADER,y),T=Yd(i,i.FRAGMENT_SHADER,x);i.attachShader(_,C),i.attachShader(_,T),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(D){if(s.debug.checkShaderErrors){const X=i.getProgramInfoLog(_).trim(),H=i.getShaderInfoLog(C).trim(),V=i.getShaderInfoLog(T).trim();let at=!0,J=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(at=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,C,T);else{const dt=$d(i,C,"vertex"),j=$d(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+X+`
`+dt+`
`+j)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(H===""||V==="")&&(J=!1);J&&(D.diagnostics={runnable:at,programLog:X,vertexShader:{log:H,prefix:g},fragmentShader:{log:V,prefix:m}})}i.deleteShader(C),i.deleteShader(T),I=new tl(i,_),S=iy(i,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Z1)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$1++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}let my=0;class gy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new _y(t),e.set(t,n)),n}}class _y{constructor(t){this.id=my++,this.code=t,this.usedTimes=0}}function xy(s,t,e,n,i,r,o){const a=new sc,c=new gy,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function g(S,M,D,X,H){const V=X.fog,at=H.geometry,J=S.isMeshStandardMaterial?X.environment:null,dt=(S.isMeshStandardMaterial?e:t).get(S.envMap||J),j=dt&&dt.mapping===kr?dt.image.height:null,_t=p[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const bt=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,Ct=bt!==void 0?bt.length:0;let $t=0;at.morphAttributes.position!==void 0&&($t=1),at.morphAttributes.normal!==void 0&&($t=2),at.morphAttributes.color!==void 0&&($t=3);let me,st,pt,N;if(_t){const Se=ni[_t];me=Se.vertexShader,st=Se.fragmentShader}else me=S.vertexShader,st=S.fragmentShader,c.update(S),pt=c.getVertexShaderID(S),N=c.getFragmentShaderID(S);const L=s.getRenderTarget(),Q=s.state.buffers.depth.getReversed(),W=H.isInstancedMesh===!0,k=H.isBatchedMesh===!0,ot=!!S.map,q=!!S.matcap,tt=!!dt,P=!!S.aoMap,gt=!!S.lightMap,ut=!!S.bumpMap,Lt=!!S.normalMap,xt=!!S.displacementMap,Xt=!!S.emissiveMap,Rt=!!S.metalnessMap,R=!!S.roughnessMap,w=S.anisotropy>0,G=S.clearcoat>0,it=S.dispersion>0,ht=S.iridescence>0,rt=S.sheen>0,Ft=S.transmission>0,Mt=w&&!!S.anisotropyMap,Pt=G&&!!S.clearcoatMap,ae=G&&!!S.clearcoatNormalMap,ft=G&&!!S.clearcoatRoughnessMap,Dt=ht&&!!S.iridescenceMap,qt=ht&&!!S.iridescenceThicknessMap,Yt=rt&&!!S.sheenColorMap,Ut=rt&&!!S.sheenRoughnessMap,ue=!!S.specularMap,se=!!S.specularColorMap,Ee=!!S.specularIntensityMap,F=Ft&&!!S.transmissionMap,St=Ft&&!!S.thicknessMap,et=!!S.gradientMap,ct=!!S.alphaMap,Et=S.alphaTest>0,wt=!!S.alphaHash,ee=!!S.extensions;let Oe=Wi;S.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Oe=s.toneMapping);const an={shaderID:_t,shaderType:S.type,shaderName:S.name,vertexShader:me,fragmentShader:st,defines:S.defines,customVertexShaderID:pt,customFragmentShaderID:N,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:k,batchingColor:k&&H._colorsTexture!==null,instancing:W,instancingColor:W&&H.instanceColor!==null,instancingMorph:W&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:L===null?s.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:js,alphaToCoverage:!!S.alphaToCoverage,map:ot,matcap:q,envMap:tt,envMapMode:tt&&dt.mapping,envMapCubeUVHeight:j,aoMap:P,lightMap:gt,bumpMap:ut,normalMap:Lt,displacementMap:d&&xt,emissiveMap:Xt,normalMapObjectSpace:Lt&&S.normalMapType===qp,normalMapTangentSpace:Lt&&S.normalMapType===ms,metalnessMap:Rt,roughnessMap:R,anisotropy:w,anisotropyMap:Mt,clearcoat:G,clearcoatMap:Pt,clearcoatNormalMap:ae,clearcoatRoughnessMap:ft,dispersion:it,iridescence:ht,iridescenceMap:Dt,iridescenceThicknessMap:qt,sheen:rt,sheenColorMap:Yt,sheenRoughnessMap:Ut,specularMap:ue,specularColorMap:se,specularIntensityMap:Ee,transmission:Ft,transmissionMap:F,thicknessMap:St,gradientMap:et,opaque:S.transparent===!1&&S.blending===Hs&&S.alphaToCoverage===!1,alphaMap:ct,alphaTest:Et,alphaHash:wt,combine:S.combine,mapUv:ot&&_(S.map.channel),aoMapUv:P&&_(S.aoMap.channel),lightMapUv:gt&&_(S.lightMap.channel),bumpMapUv:ut&&_(S.bumpMap.channel),normalMapUv:Lt&&_(S.normalMap.channel),displacementMapUv:xt&&_(S.displacementMap.channel),emissiveMapUv:Xt&&_(S.emissiveMap.channel),metalnessMapUv:Rt&&_(S.metalnessMap.channel),roughnessMapUv:R&&_(S.roughnessMap.channel),anisotropyMapUv:Mt&&_(S.anisotropyMap.channel),clearcoatMapUv:Pt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:qt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&_(S.sheenRoughnessMap.channel),specularMapUv:ue&&_(S.specularMap.channel),specularColorMapUv:se&&_(S.specularColorMap.channel),specularIntensityMapUv:Ee&&_(S.specularIntensityMap.channel),transmissionMapUv:F&&_(S.transmissionMap.channel),thicknessMapUv:St&&_(S.thicknessMap.channel),alphaMapUv:ct&&_(S.alphaMap.channel),vertexTangents:!!at.attributes.tangent&&(Lt||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!at.attributes.uv&&(ot||ct),fog:!!V,useFog:S.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Q,skinning:H.isSkinnedMesh===!0,morphTargets:at.morphAttributes.position!==void 0,morphNormals:at.morphAttributes.normal!==void 0,morphColors:at.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:$t,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Oe,decodeVideoTexture:ot&&S.map.isVideoTexture===!0&&ce.getTransfer(S.map.colorSpace)===ye,decodeVideoTextureEmissive:Xt&&S.emissiveMap.isVideoTexture===!0&&ce.getTransfer(S.emissiveMap.colorSpace)===ye,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ue,flipSided:S.side===bn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ee&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&S.extensions.multiDraw===!0||k)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return an.vertexUv1s=l.has(1),an.vertexUv2s=l.has(2),an.vertexUv3s=l.has(3),l.clear(),an}function m(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const D in S.defines)M.push(D),M.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(v(M,S),y(M,S),M.push(s.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function v(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const M=p[S.type];let D;if(M){const X=ni[M];D=Nr.clone(X.uniforms)}else D=S.uniforms;return D}function C(S,M){let D;for(let X=0,H=h.length;X<H;X++){const V=h[X];if(V.cacheKey===M){D=V,++D.usedTimes;break}}return D===void 0&&(D=new py(s,M,S,r),h.push(D)),D}function T(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function A(S){c.remove(S)}function I(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:I}}function vy(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function yy(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function tf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ef(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,p,_,g){let m=s[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:_,group:g},s[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=_,m.group=g),t++,m}function a(u,d,f,p,_,g){const m=o(u,d,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(u,d,f,p,_,g){const m=o(u,d,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(u,d){e.length>1&&e.sort(u||yy),n.length>1&&n.sort(d||tf),i.length>1&&i.sort(d||tf)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function My(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new ef,s.set(n,[o])):i>=r.length?(o=new ef,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Sy(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new b,color:new lt};break;case"SpotLight":e={position:new b,direction:new b,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new b,color:new lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new b,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":e={color:new lt,position:new b,halfWidth:new b,halfHeight:new b};break}return s[t.id]=e,e}}}function by(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let wy=0;function Ty(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ey(s){const t=new Sy,e=by(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new b);const i=new b,r=new Wt,o=new Wt;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,y=0,x=0,C=0,T=0,A=0;l.sort(Ty);for(let S=0,M=l.length;S<M;S++){const D=l[S],X=D.color,H=D.intensity,V=D.distance,at=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=X.r*H,u+=X.g*H,d+=X.b*H;else if(D.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(D.sh.coefficients[J],H);A++}else if(D.isDirectionalLight){const J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const dt=D.shadow,j=e.get(D);j.shadowIntensity=dt.intensity,j.shadowBias=dt.bias,j.shadowNormalBias=dt.normalBias,j.shadowRadius=dt.radius,j.shadowMapSize=dt.mapSize,n.directionalShadow[f]=j,n.directionalShadowMap[f]=at,n.directionalShadowMatrix[f]=D.shadow.matrix,v++}n.directional[f]=J,f++}else if(D.isSpotLight){const J=t.get(D);J.position.setFromMatrixPosition(D.matrixWorld),J.color.copy(X).multiplyScalar(H),J.distance=V,J.coneCos=Math.cos(D.angle),J.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),J.decay=D.decay,n.spot[_]=J;const dt=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,dt.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[_]=dt.matrix,D.castShadow){const j=e.get(D);j.shadowIntensity=dt.intensity,j.shadowBias=dt.bias,j.shadowNormalBias=dt.normalBias,j.shadowRadius=dt.radius,j.shadowMapSize=dt.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=at,x++}_++}else if(D.isRectAreaLight){const J=t.get(D);J.color.copy(X).multiplyScalar(H),J.halfWidth.set(D.width*.5,0,0),J.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=J,g++}else if(D.isPointLight){const J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity),J.distance=D.distance,J.decay=D.decay,D.castShadow){const dt=D.shadow,j=e.get(D);j.shadowIntensity=dt.intensity,j.shadowBias=dt.bias,j.shadowNormalBias=dt.normalBias,j.shadowRadius=dt.radius,j.shadowMapSize=dt.mapSize,j.shadowCameraNear=dt.camera.near,j.shadowCameraFar=dt.camera.far,n.pointShadow[p]=j,n.pointShadowMap[p]=at,n.pointShadowMatrix[p]=D.shadow.matrix,y++}n.point[p]=J,p++}else if(D.isHemisphereLight){const J=t.get(D);J.skyColor.copy(D.color).multiplyScalar(H),J.groundColor.copy(D.groundColor).multiplyScalar(H),n.hemi[m]=J,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==p||I.spotLength!==_||I.rectAreaLength!==g||I.hemiLength!==m||I.numDirectionalShadows!==v||I.numPointShadows!==y||I.numSpotShadows!==x||I.numSpotMaps!==C||I.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,I.directionalLength=f,I.pointLength=p,I.spotLength=_,I.rectAreaLength=g,I.hemiLength=m,I.numDirectionalShadows=v,I.numPointShadows=y,I.numSpotShadows=x,I.numSpotMaps=C,I.numLightProbes=A,n.version=wy++)}function c(l,h){let u=0,d=0,f=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,v=l.length;m<v;m++){const y=l[m];if(y.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(y.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function nf(s){const t=new Ey(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Ay(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new nf(s),t.set(i,[a])):r>=o.length?(a=new nf(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Eu extends pn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Wp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Au extends pn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Cy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ry=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Py(s,t,e){let n=new Xo;const i=new nt,r=new nt,o=new fe,a=new Eu({depthPacking:Xp}),c=new Au,l={},h=e.maxTextureSize,u={[qi]:bn,[bn]:qi,[Ue]:Ue},d=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Cy,fragmentShader:Ry}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Zt;p.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new K(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eu;let m=this.type;this.render=function(T,A,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const S=s.getRenderTarget(),M=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),X=s.state;X.setBlending(vi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const H=m!==mi&&this.type===mi,V=m===mi&&this.type!==mi;for(let at=0,J=T.length;at<J;at++){const dt=T[at],j=dt.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",dt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;i.copy(j.mapSize);const _t=j.getFrameExtents();if(i.multiply(_t),r.copy(j.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/_t.x),i.x=r.x*_t.x,j.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/_t.y),i.y=r.y*_t.y,j.mapSize.y=r.y)),j.map===null||H===!0||V===!0){const Ct=this.type!==mi?{minFilter:Fe,magFilter:Fe}:{};j.map!==null&&j.map.dispose(),j.map=new un(i.x,i.y,Ct),j.map.texture.name=dt.name+".shadowMap",j.camera.updateProjectionMatrix()}s.setRenderTarget(j.map),s.clear();const bt=j.getViewportCount();for(let Ct=0;Ct<bt;Ct++){const $t=j.getViewport(Ct);o.set(r.x*$t.x,r.y*$t.y,r.x*$t.z,r.y*$t.w),X.viewport(o),j.updateMatrices(dt,Ct),n=j.getFrustum(),x(A,I,j.camera,dt,this.type)}j.isPointLightShadow!==!0&&this.type===mi&&v(j,I),j.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(S,M,D)};function v(T,A){const I=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new un(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(A,null,I,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(A,null,I,f,_,null)}function y(T,A,I,S){let M=null;const D=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)M=D;else if(M=I.isPointLight===!0?c:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const X=M.uuid,H=A.uuid;let V=l[X];V===void 0&&(V={},l[X]=V);let at=V[H];at===void 0&&(at=M.clone(),V[H]=at,A.addEventListener("dispose",C)),M=at}if(M.visible=A.visible,M.wireframe=A.wireframe,S===mi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const X=s.properties.get(M);X.light=I}return M}function x(T,A,I,S,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===mi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);const H=t.update(T),V=T.material;if(Array.isArray(V)){const at=H.groups;for(let J=0,dt=at.length;J<dt;J++){const j=at[J],_t=V[j.materialIndex];if(_t&&_t.visible){const bt=y(T,_t,S,M);T.onBeforeShadow(s,T,A,I,H,bt,j),s.renderBufferDirect(I,null,H,bt,T,j),T.onAfterShadow(s,T,A,I,H,bt,j)}}}else if(V.visible){const at=y(T,V,S,M);T.onBeforeShadow(s,T,A,I,H,at,null),s.renderBufferDirect(I,null,H,at,T,null),T.onAfterShadow(s,T,A,I,H,at,null)}}const X=T.children;for(let H=0,V=X.length;H<V;H++)x(X[H],A,I,S,M)}function C(T){T.target.removeEventListener("dispose",C);for(const I in l){const S=l[I],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Iy={[ll]:cl,[hl]:fl,[ul]:pl,[qs]:dl,[cl]:ll,[fl]:hl,[pl]:ul,[dl]:qs};function Ly(s,t){function e(){let F=!1;const St=new fe;let et=null;const ct=new fe(0,0,0,0);return{setMask:function(Et){et!==Et&&!F&&(s.colorMask(Et,Et,Et,Et),et=Et)},setLocked:function(Et){F=Et},setClear:function(Et,wt,ee,Oe,an){an===!0&&(Et*=Oe,wt*=Oe,ee*=Oe),St.set(Et,wt,ee,Oe),ct.equals(St)===!1&&(s.clearColor(Et,wt,ee,Oe),ct.copy(St))},reset:function(){F=!1,et=null,ct.set(-1,0,0,0)}}}function n(){let F=!1,St=!1,et=null,ct=null,Et=null;return{setReversed:function(wt){if(St!==wt){const ee=t.get("EXT_clip_control");St?ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.ZERO_TO_ONE_EXT):ee.clipControlEXT(ee.LOWER_LEFT_EXT,ee.NEGATIVE_ONE_TO_ONE_EXT);const Oe=Et;Et=null,this.setClear(Oe)}St=wt},getReversed:function(){return St},setTest:function(wt){wt?L(s.DEPTH_TEST):Q(s.DEPTH_TEST)},setMask:function(wt){et!==wt&&!F&&(s.depthMask(wt),et=wt)},setFunc:function(wt){if(St&&(wt=Iy[wt]),ct!==wt){switch(wt){case ll:s.depthFunc(s.NEVER);break;case cl:s.depthFunc(s.ALWAYS);break;case hl:s.depthFunc(s.LESS);break;case qs:s.depthFunc(s.LEQUAL);break;case ul:s.depthFunc(s.EQUAL);break;case dl:s.depthFunc(s.GEQUAL);break;case fl:s.depthFunc(s.GREATER);break;case pl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ct=wt}},setLocked:function(wt){F=wt},setClear:function(wt){Et!==wt&&(St&&(wt=1-wt),s.clearDepth(wt),Et=wt)},reset:function(){F=!1,et=null,ct=null,Et=null,St=!1}}}function i(){let F=!1,St=null,et=null,ct=null,Et=null,wt=null,ee=null,Oe=null,an=null;return{setTest:function(Se){F||(Se?L(s.STENCIL_TEST):Q(s.STENCIL_TEST))},setMask:function(Se){St!==Se&&!F&&(s.stencilMask(Se),St=Se)},setFunc:function(Se,Jn,Pi){(et!==Se||ct!==Jn||Et!==Pi)&&(s.stencilFunc(Se,Jn,Pi),et=Se,ct=Jn,Et=Pi)},setOp:function(Se,Jn,Pi){(wt!==Se||ee!==Jn||Oe!==Pi)&&(s.stencilOp(Se,Jn,Pi),wt=Se,ee=Jn,Oe=Pi)},setLocked:function(Se){F=Se},setClear:function(Se){an!==Se&&(s.clearStencil(Se),an=Se)},reset:function(){F=!1,St=null,et=null,ct=null,Et=null,wt=null,ee=null,Oe=null,an=null}}}const r=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,y=null,x=null,C=null,T=null,A=new lt(0,0,0),I=0,S=!1,M=null,D=null,X=null,H=null,V=null;const at=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,dt=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(dt=parseFloat(/^WebGL (\d)/.exec(j)[1]),J=dt>=1):j.indexOf("OpenGL ES")!==-1&&(dt=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),J=dt>=2);let _t=null,bt={};const Ct=s.getParameter(s.SCISSOR_BOX),$t=s.getParameter(s.VIEWPORT),me=new fe().fromArray(Ct),st=new fe().fromArray($t);function pt(F,St,et,ct){const Et=new Uint8Array(4),wt=s.createTexture();s.bindTexture(F,wt),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ee=0;ee<et;ee++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(St,0,s.RGBA,1,1,ct,0,s.RGBA,s.UNSIGNED_BYTE,Et):s.texImage2D(St+ee,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Et);return wt}const N={};N[s.TEXTURE_2D]=pt(s.TEXTURE_2D,s.TEXTURE_2D,1),N[s.TEXTURE_CUBE_MAP]=pt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),N[s.TEXTURE_2D_ARRAY]=pt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),N[s.TEXTURE_3D]=pt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),L(s.DEPTH_TEST),o.setFunc(qs),ut(!1),Lt(Uh),L(s.CULL_FACE),P(vi);function L(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function Q(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function W(F,St){return u[F]!==St?(s.bindFramebuffer(F,St),u[F]=St,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=St),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=St),!0):!1}function k(F,St){let et=f,ct=!1;if(F){et=d.get(St),et===void 0&&(et=[],d.set(St,et));const Et=F.textures;if(et.length!==Et.length||et[0]!==s.COLOR_ATTACHMENT0){for(let wt=0,ee=Et.length;wt<ee;wt++)et[wt]=s.COLOR_ATTACHMENT0+wt;et.length=Et.length,ct=!0}}else et[0]!==s.BACK&&(et[0]=s.BACK,ct=!0);ct&&s.drawBuffers(et)}function ot(F){return p!==F?(s.useProgram(F),p=F,!0):!1}const q={[ls]:s.FUNC_ADD,[yp]:s.FUNC_SUBTRACT,[Mp]:s.FUNC_REVERSE_SUBTRACT};q[Sp]=s.MIN,q[bp]=s.MAX;const tt={[wp]:s.ZERO,[Tp]:s.ONE,[Ep]:s.SRC_COLOR,[ol]:s.SRC_ALPHA,[Lp]:s.SRC_ALPHA_SATURATE,[Pp]:s.DST_COLOR,[Cp]:s.DST_ALPHA,[Ap]:s.ONE_MINUS_SRC_COLOR,[al]:s.ONE_MINUS_SRC_ALPHA,[Ip]:s.ONE_MINUS_DST_COLOR,[Rp]:s.ONE_MINUS_DST_ALPHA,[Dp]:s.CONSTANT_COLOR,[Up]:s.ONE_MINUS_CONSTANT_COLOR,[Np]:s.CONSTANT_ALPHA,[Fp]:s.ONE_MINUS_CONSTANT_ALPHA};function P(F,St,et,ct,Et,wt,ee,Oe,an,Se){if(F===vi){_===!0&&(Q(s.BLEND),_=!1);return}if(_===!1&&(L(s.BLEND),_=!0),F!==vp){if(F!==g||Se!==S){if((m!==ls||x!==ls)&&(s.blendEquation(s.FUNC_ADD),m=ls,x=ls),Se)switch(F){case Hs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ds:s.blendFunc(s.ONE,s.ONE);break;case Nh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Fh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Hs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ds:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Nh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Fh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}v=null,y=null,C=null,T=null,A.set(0,0,0),I=0,g=F,S=Se}return}Et=Et||St,wt=wt||et,ee=ee||ct,(St!==m||Et!==x)&&(s.blendEquationSeparate(q[St],q[Et]),m=St,x=Et),(et!==v||ct!==y||wt!==C||ee!==T)&&(s.blendFuncSeparate(tt[et],tt[ct],tt[wt],tt[ee]),v=et,y=ct,C=wt,T=ee),(Oe.equals(A)===!1||an!==I)&&(s.blendColor(Oe.r,Oe.g,Oe.b,an),A.copy(Oe),I=an),g=F,S=!1}function gt(F,St){F.side===Ue?Q(s.CULL_FACE):L(s.CULL_FACE);let et=F.side===bn;St&&(et=!et),ut(et),F.blending===Hs&&F.transparent===!1?P(vi):P(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const ct=F.stencilWrite;a.setTest(ct),ct&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Xt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?L(s.SAMPLE_ALPHA_TO_COVERAGE):Q(s.SAMPLE_ALPHA_TO_COVERAGE)}function ut(F){M!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),M=F)}function Lt(F){F!==_p?(L(s.CULL_FACE),F!==D&&(F===Uh?s.cullFace(s.BACK):F===xp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Q(s.CULL_FACE),D=F}function xt(F){F!==X&&(J&&s.lineWidth(F),X=F)}function Xt(F,St,et){F?(L(s.POLYGON_OFFSET_FILL),(H!==St||V!==et)&&(s.polygonOffset(St,et),H=St,V=et)):Q(s.POLYGON_OFFSET_FILL)}function Rt(F){F?L(s.SCISSOR_TEST):Q(s.SCISSOR_TEST)}function R(F){F===void 0&&(F=s.TEXTURE0+at-1),_t!==F&&(s.activeTexture(F),_t=F)}function w(F,St,et){et===void 0&&(_t===null?et=s.TEXTURE0+at-1:et=_t);let ct=bt[et];ct===void 0&&(ct={type:void 0,texture:void 0},bt[et]=ct),(ct.type!==F||ct.texture!==St)&&(_t!==et&&(s.activeTexture(et),_t=et),s.bindTexture(F,St||N[F]),ct.type=F,ct.texture=St)}function G(){const F=bt[_t];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function it(){try{s.compressedTexImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ht(){try{s.compressedTexImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function rt(){try{s.texSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ft(){try{s.texSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Mt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{s.texStorage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ft(){try{s.texStorage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Dt(){try{s.texImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function qt(){try{s.texImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Yt(F){me.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),me.copy(F))}function Ut(F){st.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),st.copy(F))}function ue(F,St){let et=l.get(St);et===void 0&&(et=new WeakMap,l.set(St,et));let ct=et.get(F);ct===void 0&&(ct=s.getUniformBlockIndex(St,F.name),et.set(F,ct))}function se(F,St){const ct=l.get(St).get(F);c.get(St)!==ct&&(s.uniformBlockBinding(St,ct,F.__bindingPointIndex),c.set(St,ct))}function Ee(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},_t=null,bt={},u={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,y=null,x=null,C=null,T=null,A=new lt(0,0,0),I=0,S=!1,M=null,D=null,X=null,H=null,V=null,me.set(0,0,s.canvas.width,s.canvas.height),st.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:L,disable:Q,bindFramebuffer:W,drawBuffers:k,useProgram:ot,setBlending:P,setMaterial:gt,setFlipSided:ut,setCullFace:Lt,setLineWidth:xt,setPolygonOffset:Xt,setScissorTest:Rt,activeTexture:R,bindTexture:w,unbindTexture:G,compressedTexImage2D:it,compressedTexImage3D:ht,texImage2D:Dt,texImage3D:qt,updateUBOMapping:ue,uniformBlockBinding:se,texStorage2D:ae,texStorage3D:ft,texSubImage2D:rt,texSubImage3D:Ft,compressedTexSubImage2D:Mt,compressedTexSubImage3D:Pt,scissor:Yt,viewport:Ut,reset:Ee}}function Dy(s,t){const e=s.image&&s.image.width?s.image.width/s.image.height:1;return e>t?(s.repeat.x=1,s.repeat.y=e/t,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=t/e,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function Uy(s,t){const e=s.image&&s.image.width?s.image.width/s.image.height:1;return e>t?(s.repeat.x=t/e,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=e/t,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function Ny(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function Hh(s,t,e,n){const i=Fy(n);switch(e){case du:return s*t;case pu:return s*t;case mu:return s*t*2;case jl:return s*t/i.components*i.byteLength;case Ho:return s*t/i.components*i.byteLength;case gu:return s*t*2/i.components*i.byteLength;case tc:return s*t*2/i.components*i.byteLength;case fu:return s*t*3/i.components*i.byteLength;case Sn:return s*t*4/i.components*i.byteLength;case ec:return s*t*4/i.components*i.byteLength;case po:case mo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case go:case _o:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case gl:case xl:return Math.max(s,16)*Math.max(t,8)/4;case ml:case _l:return Math.max(s,8)*Math.max(t,8)/2;case vl:case yl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ml:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Sl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case bl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case wl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Tl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case El:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Al:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Cl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Rl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Pl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Il:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ll:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Dl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ul:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Nl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case xo:case Fl:case Ol:return Math.ceil(s/4)*Math.ceil(t/4)*16;case _u:case Bl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case zl:case kl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Fy(s){switch(s){case bi:case cu:return{byteLength:1,components:1};case Lr:case hu:case li:return{byteLength:2,components:1};case Kl:case Ql:return{byteLength:2,components:4};case Zi:case Jl:case Nn:return{byteLength:4,components:1};case uu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}const Oy={contain:Dy,cover:Uy,fill:Ny,getByteLength:Hh};function By(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,w){return f?new OffscreenCanvas(R,w):Io("canvas")}function _(R,w,G){let it=1;const ht=Rt(R);if((ht.width>G||ht.height>G)&&(it=G/Math.max(ht.width,ht.height)),it<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const rt=Math.floor(it*ht.width),Ft=Math.floor(it*ht.height);u===void 0&&(u=p(rt,Ft));const Mt=w?p(rt,Ft):u;return Mt.width=rt,Mt.height=Ft,Mt.getContext("2d").drawImage(R,0,0,rt,Ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+rt+"x"+Ft+")."),Mt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),R;return R}function g(R){return R.generateMipmaps}function m(R){s.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(R,w,G,it,ht=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let rt=w;if(w===s.RED&&(G===s.FLOAT&&(rt=s.R32F),G===s.HALF_FLOAT&&(rt=s.R16F),G===s.UNSIGNED_BYTE&&(rt=s.R8)),w===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(rt=s.R8UI),G===s.UNSIGNED_SHORT&&(rt=s.R16UI),G===s.UNSIGNED_INT&&(rt=s.R32UI),G===s.BYTE&&(rt=s.R8I),G===s.SHORT&&(rt=s.R16I),G===s.INT&&(rt=s.R32I)),w===s.RG&&(G===s.FLOAT&&(rt=s.RG32F),G===s.HALF_FLOAT&&(rt=s.RG16F),G===s.UNSIGNED_BYTE&&(rt=s.RG8)),w===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(rt=s.RG8UI),G===s.UNSIGNED_SHORT&&(rt=s.RG16UI),G===s.UNSIGNED_INT&&(rt=s.RG32UI),G===s.BYTE&&(rt=s.RG8I),G===s.SHORT&&(rt=s.RG16I),G===s.INT&&(rt=s.RG32I)),w===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(rt=s.RGB8UI),G===s.UNSIGNED_SHORT&&(rt=s.RGB16UI),G===s.UNSIGNED_INT&&(rt=s.RGB32UI),G===s.BYTE&&(rt=s.RGB8I),G===s.SHORT&&(rt=s.RGB16I),G===s.INT&&(rt=s.RGB32I)),w===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(rt=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(rt=s.RGBA16UI),G===s.UNSIGNED_INT&&(rt=s.RGBA32UI),G===s.BYTE&&(rt=s.RGBA8I),G===s.SHORT&&(rt=s.RGBA16I),G===s.INT&&(rt=s.RGBA32I)),w===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&(rt=s.RGB9_E5),w===s.RGBA){const Ft=ht?Go:ce.getTransfer(it);G===s.FLOAT&&(rt=s.RGBA32F),G===s.HALF_FLOAT&&(rt=s.RGBA16F),G===s.UNSIGNED_BYTE&&(rt=Ft===ye?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(rt=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(rt=s.RGB5_A1)}return(rt===s.R16F||rt===s.R32F||rt===s.RG16F||rt===s.RG32F||rt===s.RGBA16F||rt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function x(R,w){let G;return R?w===null||w===Zi||w===Zs?G=s.DEPTH24_STENCIL8:w===Nn?G=s.DEPTH32F_STENCIL8:w===Lr&&(G=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Zi||w===Zs?G=s.DEPTH_COMPONENT24:w===Nn?G=s.DEPTH_COMPONENT32F:w===Lr&&(G=s.DEPTH_COMPONENT16),G}function C(R,w){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Fe&&R.minFilter!==Ze?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function T(R){const w=R.target;w.removeEventListener("dispose",T),I(w),w.isVideoTexture&&h.delete(w)}function A(R){const w=R.target;w.removeEventListener("dispose",A),M(w)}function I(R){const w=n.get(R);if(w.__webglInit===void 0)return;const G=R.source,it=d.get(G);if(it){const ht=it[w.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&S(R),Object.keys(it).length===0&&d.delete(G)}n.remove(R)}function S(R){const w=n.get(R);s.deleteTexture(w.__webglTexture);const G=R.source,it=d.get(G);delete it[w.__cacheKey],o.memory.textures--}function M(R){const w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(w.__webglFramebuffer[it]))for(let ht=0;ht<w.__webglFramebuffer[it].length;ht++)s.deleteFramebuffer(w.__webglFramebuffer[it][ht]);else s.deleteFramebuffer(w.__webglFramebuffer[it]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[it])}else{if(Array.isArray(w.__webglFramebuffer))for(let it=0;it<w.__webglFramebuffer.length;it++)s.deleteFramebuffer(w.__webglFramebuffer[it]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let it=0;it<w.__webglColorRenderbuffer.length;it++)w.__webglColorRenderbuffer[it]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[it]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const G=R.textures;for(let it=0,ht=G.length;it<ht;it++){const rt=n.get(G[it]);rt.__webglTexture&&(s.deleteTexture(rt.__webglTexture),o.memory.textures--),n.remove(G[it])}n.remove(R)}let D=0;function X(){D=0}function H(){const R=D;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),D+=1,R}function V(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function at(R,w){const G=n.get(R);if(R.isVideoTexture&&xt(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const it=R.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{st(G,R,w);return}}e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+w)}function J(R,w){const G=n.get(R);if(R.version>0&&G.__version!==R.version){st(G,R,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+w)}function dt(R,w){const G=n.get(R);if(R.version>0&&G.__version!==R.version){st(G,R,w);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+w)}function j(R,w){const G=n.get(R);if(R.version>0&&G.__version!==R.version){pt(G,R,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+w)}const _t={[Ys]:s.REPEAT,[Mn]:s.CLAMP_TO_EDGE,[To]:s.MIRRORED_REPEAT},bt={[Fe]:s.NEAREST,[lu]:s.NEAREST_MIPMAP_NEAREST,[Tr]:s.NEAREST_MIPMAP_LINEAR,[Ze]:s.LINEAR,[fo]:s.LINEAR_MIPMAP_NEAREST,[si]:s.LINEAR_MIPMAP_LINEAR},Ct={[Yp]:s.NEVER,[jp]:s.ALWAYS,[Zp]:s.LESS,[vu]:s.LEQUAL,[$p]:s.EQUAL,[Qp]:s.GEQUAL,[Jp]:s.GREATER,[Kp]:s.NOTEQUAL};function $t(R,w){if(w.type===Nn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Ze||w.magFilter===fo||w.magFilter===Tr||w.magFilter===si||w.minFilter===Ze||w.minFilter===fo||w.minFilter===Tr||w.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,_t[w.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,_t[w.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,_t[w.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,bt[w.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,bt[w.minFilter]),w.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Ct[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Fe||w.minFilter!==Tr&&w.minFilter!==si||w.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function me(R,w){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",T));const it=w.source;let ht=d.get(it);ht===void 0&&(ht={},d.set(it,ht));const rt=V(w);if(rt!==R.__cacheKey){ht[rt]===void 0&&(ht[rt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,G=!0),ht[rt].usedTimes++;const Ft=ht[R.__cacheKey];Ft!==void 0&&(ht[R.__cacheKey].usedTimes--,Ft.usedTimes===0&&S(w)),R.__cacheKey=rt,R.__webglTexture=ht[rt].texture}return G}function st(R,w,G){let it=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(it=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(it=s.TEXTURE_3D);const ht=me(R,w),rt=w.source;e.bindTexture(it,R.__webglTexture,s.TEXTURE0+G);const Ft=n.get(rt);if(rt.version!==Ft.__version||ht===!0){e.activeTexture(s.TEXTURE0+G);const Mt=ce.getPrimaries(ce.workingColorSpace),Pt=w.colorSpace===zi?null:ce.getPrimaries(w.colorSpace),ae=w.colorSpace===zi||Mt===Pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let ft=_(w.image,!1,i.maxTextureSize);ft=Xt(w,ft);const Dt=r.convert(w.format,w.colorSpace),qt=r.convert(w.type);let Yt=y(w.internalFormat,Dt,qt,w.colorSpace,w.isVideoTexture);$t(it,w);let Ut;const ue=w.mipmaps,se=w.isVideoTexture!==!0,Ee=Ft.__version===void 0||ht===!0,F=rt.dataReady,St=C(w,ft);if(w.isDepthTexture)Yt=x(w.format===$s,w.type),Ee&&(se?e.texStorage2D(s.TEXTURE_2D,1,Yt,ft.width,ft.height):e.texImage2D(s.TEXTURE_2D,0,Yt,ft.width,ft.height,0,Dt,qt,null));else if(w.isDataTexture)if(ue.length>0){se&&Ee&&e.texStorage2D(s.TEXTURE_2D,St,Yt,ue[0].width,ue[0].height);for(let et=0,ct=ue.length;et<ct;et++)Ut=ue[et],se?F&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,Ut.width,Ut.height,Dt,qt,Ut.data):e.texImage2D(s.TEXTURE_2D,et,Yt,Ut.width,Ut.height,0,Dt,qt,Ut.data);w.generateMipmaps=!1}else se?(Ee&&e.texStorage2D(s.TEXTURE_2D,St,Yt,ft.width,ft.height),F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ft.width,ft.height,Dt,qt,ft.data)):e.texImage2D(s.TEXTURE_2D,0,Yt,ft.width,ft.height,0,Dt,qt,ft.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){se&&Ee&&e.texStorage3D(s.TEXTURE_2D_ARRAY,St,Yt,ue[0].width,ue[0].height,ft.depth);for(let et=0,ct=ue.length;et<ct;et++)if(Ut=ue[et],w.format!==Sn)if(Dt!==null)if(se){if(F)if(w.layerUpdates.size>0){const Et=Hh(Ut.width,Ut.height,w.format,w.type);for(const wt of w.layerUpdates){const ee=Ut.data.subarray(wt*Et/Ut.data.BYTES_PER_ELEMENT,(wt+1)*Et/Ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,wt,Ut.width,Ut.height,1,Dt,ee)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,Ut.width,Ut.height,ft.depth,Dt,Ut.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,et,Yt,Ut.width,Ut.height,ft.depth,0,Ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else se?F&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,Ut.width,Ut.height,ft.depth,Dt,qt,Ut.data):e.texImage3D(s.TEXTURE_2D_ARRAY,et,Yt,Ut.width,Ut.height,ft.depth,0,Dt,qt,Ut.data)}else{se&&Ee&&e.texStorage2D(s.TEXTURE_2D,St,Yt,ue[0].width,ue[0].height);for(let et=0,ct=ue.length;et<ct;et++)Ut=ue[et],w.format!==Sn?Dt!==null?se?F&&e.compressedTexSubImage2D(s.TEXTURE_2D,et,0,0,Ut.width,Ut.height,Dt,Ut.data):e.compressedTexImage2D(s.TEXTURE_2D,et,Yt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?F&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,Ut.width,Ut.height,Dt,qt,Ut.data):e.texImage2D(s.TEXTURE_2D,et,Yt,Ut.width,Ut.height,0,Dt,qt,Ut.data)}else if(w.isDataArrayTexture)if(se){if(Ee&&e.texStorage3D(s.TEXTURE_2D_ARRAY,St,Yt,ft.width,ft.height,ft.depth),F)if(w.layerUpdates.size>0){const et=Hh(ft.width,ft.height,w.format,w.type);for(const ct of w.layerUpdates){const Et=ft.data.subarray(ct*et/ft.data.BYTES_PER_ELEMENT,(ct+1)*et/ft.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ct,ft.width,ft.height,1,Dt,qt,Et)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ft.width,ft.height,ft.depth,Dt,qt,ft.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Yt,ft.width,ft.height,ft.depth,0,Dt,qt,ft.data);else if(w.isData3DTexture)se?(Ee&&e.texStorage3D(s.TEXTURE_3D,St,Yt,ft.width,ft.height,ft.depth),F&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ft.width,ft.height,ft.depth,Dt,qt,ft.data)):e.texImage3D(s.TEXTURE_3D,0,Yt,ft.width,ft.height,ft.depth,0,Dt,qt,ft.data);else if(w.isFramebufferTexture){if(Ee)if(se)e.texStorage2D(s.TEXTURE_2D,St,Yt,ft.width,ft.height);else{let et=ft.width,ct=ft.height;for(let Et=0;Et<St;Et++)e.texImage2D(s.TEXTURE_2D,Et,Yt,et,ct,0,Dt,qt,null),et>>=1,ct>>=1}}else if(ue.length>0){if(se&&Ee){const et=Rt(ue[0]);e.texStorage2D(s.TEXTURE_2D,St,Yt,et.width,et.height)}for(let et=0,ct=ue.length;et<ct;et++)Ut=ue[et],se?F&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,Dt,qt,Ut):e.texImage2D(s.TEXTURE_2D,et,Yt,Dt,qt,Ut);w.generateMipmaps=!1}else if(se){if(Ee){const et=Rt(ft);e.texStorage2D(s.TEXTURE_2D,St,Yt,et.width,et.height)}F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Dt,qt,ft)}else e.texImage2D(s.TEXTURE_2D,0,Yt,Dt,qt,ft);g(w)&&m(it),Ft.__version=rt.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function pt(R,w,G){if(w.image.length!==6)return;const it=me(R,w),ht=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+G);const rt=n.get(ht);if(ht.version!==rt.__version||it===!0){e.activeTexture(s.TEXTURE0+G);const Ft=ce.getPrimaries(ce.workingColorSpace),Mt=w.colorSpace===zi?null:ce.getPrimaries(w.colorSpace),Pt=w.colorSpace===zi||Ft===Mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const ae=w.isCompressedTexture||w.image[0].isCompressedTexture,ft=w.image[0]&&w.image[0].isDataTexture,Dt=[];for(let ct=0;ct<6;ct++)!ae&&!ft?Dt[ct]=_(w.image[ct],!0,i.maxCubemapSize):Dt[ct]=ft?w.image[ct].image:w.image[ct],Dt[ct]=Xt(w,Dt[ct]);const qt=Dt[0],Yt=r.convert(w.format,w.colorSpace),Ut=r.convert(w.type),ue=y(w.internalFormat,Yt,Ut,w.colorSpace),se=w.isVideoTexture!==!0,Ee=rt.__version===void 0||it===!0,F=ht.dataReady;let St=C(w,qt);$t(s.TEXTURE_CUBE_MAP,w);let et;if(ae){se&&Ee&&e.texStorage2D(s.TEXTURE_CUBE_MAP,St,ue,qt.width,qt.height);for(let ct=0;ct<6;ct++){et=Dt[ct].mipmaps;for(let Et=0;Et<et.length;Et++){const wt=et[Et];w.format!==Sn?Yt!==null?se?F&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et,0,0,wt.width,wt.height,Yt,wt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et,ue,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):se?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et,0,0,wt.width,wt.height,Yt,Ut,wt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et,ue,wt.width,wt.height,0,Yt,Ut,wt.data)}}}else{if(et=w.mipmaps,se&&Ee){et.length>0&&St++;const ct=Rt(Dt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,St,ue,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(ft){se?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Dt[ct].width,Dt[ct].height,Yt,Ut,Dt[ct].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,ue,Dt[ct].width,Dt[ct].height,0,Yt,Ut,Dt[ct].data);for(let Et=0;Et<et.length;Et++){const ee=et[Et].image[ct].image;se?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et+1,0,0,ee.width,ee.height,Yt,Ut,ee.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et+1,ue,ee.width,ee.height,0,Yt,Ut,ee.data)}}else{se?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Yt,Ut,Dt[ct]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,ue,Yt,Ut,Dt[ct]);for(let Et=0;Et<et.length;Et++){const wt=et[Et];se?F&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et+1,0,0,Yt,Ut,wt.image[ct]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et+1,ue,Yt,Ut,wt.image[ct])}}}g(w)&&m(s.TEXTURE_CUBE_MAP),rt.__version=ht.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function N(R,w,G,it,ht,rt){const Ft=r.convert(G.format,G.colorSpace),Mt=r.convert(G.type),Pt=y(G.internalFormat,Ft,Mt,G.colorSpace),ae=n.get(w),ft=n.get(G);if(ft.__renderTarget=w,!ae.__hasExternalTextures){const Dt=Math.max(1,w.width>>rt),qt=Math.max(1,w.height>>rt);ht===s.TEXTURE_3D||ht===s.TEXTURE_2D_ARRAY?e.texImage3D(ht,rt,Pt,Dt,qt,w.depth,0,Ft,Mt,null):e.texImage2D(ht,rt,Pt,Dt,qt,0,Ft,Mt,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),Lt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,ht,ft.__webglTexture,0,ut(w)):(ht===s.TEXTURE_2D||ht>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,it,ht,ft.__webglTexture,rt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function L(R,w,G){if(s.bindRenderbuffer(s.RENDERBUFFER,R),w.depthBuffer){const it=w.depthTexture,ht=it&&it.isDepthTexture?it.type:null,rt=x(w.stencilBuffer,ht),Ft=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Mt=ut(w);Lt(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt,rt,w.width,w.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt,rt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,rt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ft,s.RENDERBUFFER,R)}else{const it=w.textures;for(let ht=0;ht<it.length;ht++){const rt=it[ht],Ft=r.convert(rt.format,rt.colorSpace),Mt=r.convert(rt.type),Pt=y(rt.internalFormat,Ft,Mt,rt.colorSpace),ae=ut(w);G&&Lt(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ae,Pt,w.width,w.height):Lt(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ae,Pt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Pt,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Q(R,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=n.get(w.depthTexture);it.__renderTarget=w,(!it.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),at(w.depthTexture,0);const ht=it.__webglTexture,rt=ut(w);if(w.depthTexture.format===Gs)Lt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ht,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ht,0);else if(w.depthTexture.format===$s)Lt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ht,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ht,0);else throw new Error("Unknown depthTexture format")}function W(R){const w=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){const it=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),it){const ht=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,it.removeEventListener("dispose",ht)};it.addEventListener("dispose",ht),w.__depthDisposeCallback=ht}w.__boundDepthTexture=it}if(R.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Q(w.__webglFramebuffer,R)}else if(G){w.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[it]),w.__webglDepthbuffer[it]===void 0)w.__webglDepthbuffer[it]=s.createRenderbuffer(),L(w.__webglDepthbuffer[it],R,!1);else{const ht=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=w.__webglDepthbuffer[it];s.bindRenderbuffer(s.RENDERBUFFER,rt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ht,s.RENDERBUFFER,rt)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),L(w.__webglDepthbuffer,R,!1);else{const it=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ht),s.framebufferRenderbuffer(s.FRAMEBUFFER,it,s.RENDERBUFFER,ht)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function k(R,w,G){const it=n.get(R);w!==void 0&&N(it.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&W(R)}function ot(R){const w=R.texture,G=n.get(R),it=n.get(w);R.addEventListener("dispose",A);const ht=R.textures,rt=R.isWebGLCubeRenderTarget===!0,Ft=ht.length>1;if(Ft||(it.__webglTexture===void 0&&(it.__webglTexture=s.createTexture()),it.__version=w.version,o.memory.textures++),rt){G.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[Mt]=[];for(let Pt=0;Pt<w.mipmaps.length;Pt++)G.__webglFramebuffer[Mt][Pt]=s.createFramebuffer()}else G.__webglFramebuffer[Mt]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let Mt=0;Mt<w.mipmaps.length;Mt++)G.__webglFramebuffer[Mt]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(Ft)for(let Mt=0,Pt=ht.length;Mt<Pt;Mt++){const ae=n.get(ht[Mt]);ae.__webglTexture===void 0&&(ae.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&Lt(R)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let Mt=0;Mt<ht.length;Mt++){const Pt=ht[Mt];G.__webglColorRenderbuffer[Mt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[Mt]);const ae=r.convert(Pt.format,Pt.colorSpace),ft=r.convert(Pt.type),Dt=y(Pt.internalFormat,ae,ft,Pt.colorSpace,R.isXRRenderTarget===!0),qt=ut(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,Dt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,G.__webglColorRenderbuffer[Mt])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),L(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(rt){e.bindTexture(s.TEXTURE_CUBE_MAP,it.__webglTexture),$t(s.TEXTURE_CUBE_MAP,w);for(let Mt=0;Mt<6;Mt++)if(w.mipmaps&&w.mipmaps.length>0)for(let Pt=0;Pt<w.mipmaps.length;Pt++)N(G.__webglFramebuffer[Mt][Pt],R,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Pt);else N(G.__webglFramebuffer[Mt],R,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);g(w)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ft){for(let Mt=0,Pt=ht.length;Mt<Pt;Mt++){const ae=ht[Mt],ft=n.get(ae);e.bindTexture(s.TEXTURE_2D,ft.__webglTexture),$t(s.TEXTURE_2D,ae),N(G.__webglFramebuffer,R,ae,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,0),g(ae)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let Mt=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Mt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Mt,it.__webglTexture),$t(Mt,w),w.mipmaps&&w.mipmaps.length>0)for(let Pt=0;Pt<w.mipmaps.length;Pt++)N(G.__webglFramebuffer[Pt],R,w,s.COLOR_ATTACHMENT0,Mt,Pt);else N(G.__webglFramebuffer,R,w,s.COLOR_ATTACHMENT0,Mt,0);g(w)&&m(Mt),e.unbindTexture()}R.depthBuffer&&W(R)}function q(R){const w=R.textures;for(let G=0,it=w.length;G<it;G++){const ht=w[G];if(g(ht)){const rt=v(R),Ft=n.get(ht).__webglTexture;e.bindTexture(rt,Ft),m(rt),e.unbindTexture()}}}const tt=[],P=[];function gt(R){if(R.samples>0){if(Lt(R)===!1){const w=R.textures,G=R.width,it=R.height;let ht=s.COLOR_BUFFER_BIT;const rt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ft=n.get(R),Mt=w.length>1;if(Mt)for(let Pt=0;Pt<w.length;Pt++)e.bindFramebuffer(s.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ft.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ft.__webglFramebuffer);for(let Pt=0;Pt<w.length;Pt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ht|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ht|=s.STENCIL_BUFFER_BIT)),Mt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ft.__webglColorRenderbuffer[Pt]);const ae=n.get(w[Pt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ae,0)}s.blitFramebuffer(0,0,G,it,0,0,G,it,ht,s.NEAREST),c===!0&&(tt.length=0,P.length=0,tt.push(s.COLOR_ATTACHMENT0+Pt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(tt.push(rt),P.push(rt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,P)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,tt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Mt)for(let Pt=0;Pt<w.length;Pt++){e.bindFramebuffer(s.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.RENDERBUFFER,Ft.__webglColorRenderbuffer[Pt]);const ae=n.get(w[Pt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ft.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.TEXTURE_2D,ae,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const w=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function ut(R){return Math.min(i.maxSamples,R.samples)}function Lt(R){const w=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function xt(R){const w=o.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function Xt(R,w){const G=R.colorSpace,it=R.format,ht=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==js&&G!==zi&&(ce.getTransfer(G)===ye?(it!==Sn||ht!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}function Rt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=X,this.setTexture2D=at,this.setTexture2DArray=J,this.setTexture3D=dt,this.setTextureCube=j,this.rebindTextures=k,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=q,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=W,this.setupFrameBufferTexture=N,this.useMultisampledRTT=Lt}function f0(s,t){function e(n,i=zi){let r;const o=ce.getTransfer(i);if(n===bi)return s.UNSIGNED_BYTE;if(n===Kl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return s.UNSIGNED_SHORT_5_5_5_1;if(n===uu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===cu)return s.BYTE;if(n===hu)return s.SHORT;if(n===Lr)return s.UNSIGNED_SHORT;if(n===Jl)return s.INT;if(n===Zi)return s.UNSIGNED_INT;if(n===Nn)return s.FLOAT;if(n===li)return s.HALF_FLOAT;if(n===du)return s.ALPHA;if(n===fu)return s.RGB;if(n===Sn)return s.RGBA;if(n===pu)return s.LUMINANCE;if(n===mu)return s.LUMINANCE_ALPHA;if(n===Gs)return s.DEPTH_COMPONENT;if(n===$s)return s.DEPTH_STENCIL;if(n===jl)return s.RED;if(n===Ho)return s.RED_INTEGER;if(n===gu)return s.RG;if(n===tc)return s.RG_INTEGER;if(n===ec)return s.RGBA_INTEGER;if(n===po||n===mo||n===go||n===_o)if(o===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ml||n===gl||n===_l||n===xl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_l)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vl||n===yl||n===Ml)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===vl||n===yl)return o===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ml)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sl||n===bl||n===wl||n===Tl||n===El||n===Al||n===Cl||n===Rl||n===Pl||n===Il||n===Ll||n===Dl||n===Ul||n===Nl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Tl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===El)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Al)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Il)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ll)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ul)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Nl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xo||n===Fl||n===Ol)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===xo)return o===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ol)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_u||n===Bl||n===zl||n===kl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===xo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===zl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class p0 extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class At extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zy={type:"move"};class oh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zy)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new At;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const ky=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Hy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new ke,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new rn({vertexShader:ky,fragmentShader:Vy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new K(new be(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gy extends Ei{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null;const _=new Hy,g=e.getContextAttributes();let m=null,v=null;const y=[],x=[],C=new nt;let T=null;const A=new sn;A.viewport=new fe;const I=new sn;I.viewport=new fe;const S=[A,I],M=new p0;let D=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let pt=y[st];return pt===void 0&&(pt=new oh,y[st]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(st){let pt=y[st];return pt===void 0&&(pt=new oh,y[st]=pt),pt.getGripSpace()},this.getHand=function(st){let pt=y[st];return pt===void 0&&(pt=new oh,y[st]=pt),pt.getHandSpace()};function H(st){const pt=x.indexOf(st.inputSource);if(pt===-1)return;const N=y[pt];N!==void 0&&(N.update(st.inputSource,st.frame,l||o),N.dispatchEvent({type:st.type,data:st.inputSource}))}function V(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",at);for(let st=0;st<y.length;st++){const pt=x[st];pt!==null&&(x[st]=null,y[st].disconnect(pt))}D=null,X=null,_.reset(),t.setRenderTarget(m),f=null,d=null,u=null,i=null,v=null,me.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){r=st,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){a=st,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(st){l=st},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(st){if(i=st,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",V),i.addEventListener("inputsourceschange",at),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const pt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,pt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new un(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let pt=null,N=null,L=null;g.depth&&(L=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=g.stencil?$s:Gs,N=g.stencil?Zs:Zi);const Q={colorFormat:e.RGBA8,depthFormat:L,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Q),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new un(d.textureWidth,d.textureHeight,{format:Sn,type:bi,depthTexture:new Tu(d.textureWidth,d.textureHeight,N,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),me.setContext(i),me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function at(st){for(let pt=0;pt<st.removed.length;pt++){const N=st.removed[pt],L=x.indexOf(N);L>=0&&(x[L]=null,y[L].disconnect(N))}for(let pt=0;pt<st.added.length;pt++){const N=st.added[pt];let L=x.indexOf(N);if(L===-1){for(let W=0;W<y.length;W++)if(W>=x.length){x.push(N),L=W;break}else if(x[W]===null){x[W]=N,L=W;break}if(L===-1)break}const Q=y[L];Q&&Q.connect(N)}}const J=new b,dt=new b;function j(st,pt,N){J.setFromMatrixPosition(pt.matrixWorld),dt.setFromMatrixPosition(N.matrixWorld);const L=J.distanceTo(dt),Q=pt.projectionMatrix.elements,W=N.projectionMatrix.elements,k=Q[14]/(Q[10]-1),ot=Q[14]/(Q[10]+1),q=(Q[9]+1)/Q[5],tt=(Q[9]-1)/Q[5],P=(Q[8]-1)/Q[0],gt=(W[8]+1)/W[0],ut=k*P,Lt=k*gt,xt=L/(-P+gt),Xt=xt*-P;if(pt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(Xt),st.translateZ(xt),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),Q[10]===-1)st.projectionMatrix.copy(pt.projectionMatrix),st.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Rt=k+xt,R=ot+xt,w=ut-Xt,G=Lt+(L-Xt),it=q*ot/R*Rt,ht=tt*ot/R*Rt;st.projectionMatrix.makePerspective(w,G,it,ht,Rt,R),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function _t(st,pt){pt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(pt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(i===null)return;let pt=st.near,N=st.far;_.texture!==null&&(_.depthNear>0&&(pt=_.depthNear),_.depthFar>0&&(N=_.depthFar)),M.near=I.near=A.near=pt,M.far=I.far=A.far=N,(D!==M.near||X!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),D=M.near,X=M.far),A.layers.mask=st.layers.mask|2,I.layers.mask=st.layers.mask|4,M.layers.mask=A.layers.mask|I.layers.mask;const L=st.parent,Q=M.cameras;_t(M,L);for(let W=0;W<Q.length;W++)_t(Q[W],L);Q.length===2?j(M,A,I):M.projectionMatrix.copy(A.projectionMatrix),bt(st,M,L)};function bt(st,pt,N){N===null?st.matrix.copy(pt.matrixWorld):(st.matrix.copy(N.matrixWorld),st.matrix.invert(),st.matrix.multiply(pt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(pt.projectionMatrix),st.projectionMatrixInverse.copy(pt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=Dr*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(st){c=st,d!==null&&(d.fixedFoveation=st),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=st)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Ct=null;function $t(st,pt){if(h=pt.getViewerPose(l||o),p=pt,h!==null){const N=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let L=!1;N.length!==M.cameras.length&&(M.cameras.length=0,L=!0);for(let W=0;W<N.length;W++){const k=N[W];let ot=null;if(f!==null)ot=f.getViewport(k);else{const tt=u.getViewSubImage(d,k);ot=tt.viewport,W===0&&(t.setRenderTargetTextures(v,tt.colorTexture,d.ignoreDepthValues?void 0:tt.depthStencilTexture),t.setRenderTarget(v))}let q=S[W];q===void 0&&(q=new sn,q.layers.enable(W),q.viewport=new fe,S[W]=q),q.matrix.fromArray(k.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray(k.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(ot.x,ot.y,ot.width,ot.height),W===0&&(M.matrix.copy(q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),L===!0&&M.cameras.push(q)}const Q=i.enabledFeatures;if(Q&&Q.includes("depth-sensing")){const W=u.getDepthInformation(N[0]);W&&W.isValid&&W.texture&&_.init(t,W,i.renderState)}}for(let N=0;N<y.length;N++){const L=x[N],Q=y[N];L!==null&&Q!==void 0&&Q.update(L,pt,l||o)}Ct&&Ct(st,pt),pt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pt}),p=null}const me=new l0;me.setAnimationLoop($t),this.setAnimationLoop=function(st){Ct=st},this.dispose=function(){}}}const Es=new En,Wy=new Wt;function Xy(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,r0(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,y,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,v,y):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===bn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===bn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=t.get(m),y=v.envMap,x=v.envMapRotation;y&&(g.envMap.value=y,Es.copy(x),Es.x*=-1,Es.y*=-1,Es.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Es.y*=-1,Es.z*=-1),g.envMapRotation.value.setFromMatrix4(Wy.makeRotationFromEuler(Es)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=y*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===bn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function qy(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const x=y.program;n.uniformBlockBinding(v,x)}function l(v,y){let x=i[v.id];x===void 0&&(p(v),x=h(v),i[v.id]=x,v.addEventListener("dispose",g));const C=y.program;n.updateUBOMapping(v,C);const T=t.render.frame;r[v.id]!==T&&(d(v),r[v.id]=T)}function h(v){const y=u();v.__bindingPointIndex=y;const x=s.createBuffer(),C=v.__size,T=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,x),x}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=i[v.id],x=v.uniforms,C=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let T=0,A=x.length;T<A;T++){const I=Array.isArray(x[T])?x[T]:[x[T]];for(let S=0,M=I.length;S<M;S++){const D=I[S];if(f(D,T,S,C)===!0){const X=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let V=0;for(let at=0;at<H.length;at++){const J=H[at],dt=_(J);typeof J=="number"||typeof J=="boolean"?(D.__data[0]=J,s.bufferSubData(s.UNIFORM_BUFFER,X+V,D.__data)):J.isMatrix3?(D.__data[0]=J.elements[0],D.__data[1]=J.elements[1],D.__data[2]=J.elements[2],D.__data[3]=0,D.__data[4]=J.elements[3],D.__data[5]=J.elements[4],D.__data[6]=J.elements[5],D.__data[7]=0,D.__data[8]=J.elements[6],D.__data[9]=J.elements[7],D.__data[10]=J.elements[8],D.__data[11]=0):(J.toArray(D.__data,V),V+=dt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,X,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,y,x,C){const T=v.value,A=y+"_"+x;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const I=C[A];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return C[A]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function p(v){const y=v.uniforms;let x=0;const C=16;for(let A=0,I=y.length;A<I;A++){const S=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,D=S.length;M<D;M++){const X=S[M],H=Array.isArray(X.value)?X.value:[X.value];for(let V=0,at=H.length;V<at;V++){const J=H[V],dt=_(J),j=x%C,_t=j%dt.boundary,bt=j+_t;x+=_t,bt!==0&&C-bt<dt.storage&&(x+=C-bt),X.__data=new Float32Array(dt.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=x,x+=dt.storage}}}const T=x%C;return T>0&&(x+=C-T),v.__size=x,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function m(){for(const v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:m}}class m0{constructor(t={}){const{canvas:e=e0(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ke,this.toneMapping=Wi,this.toneMappingExposure=1;const x=this;let C=!1,T=0,A=0,I=null,S=-1,M=null;const D=new fe,X=new fe;let H=null;const V=new lt(0);let at=0,J=e.width,dt=e.height,j=1,_t=null,bt=null;const Ct=new fe(0,0,J,dt),$t=new fe(0,0,J,dt);let me=!1;const st=new Xo;let pt=!1,N=!1;const L=new Wt,Q=new Wt,W=new b,k=new fe,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let q=!1;function tt(){return I===null?j:1}let P=n;function gt(E,O){return e.getContext(E,O)}try{const E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yl}`),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",Et,!1),e.addEventListener("webglcontextcreationerror",wt,!1),P===null){const O="webgl2";if(P=gt(O,E),P===null)throw gt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ut,Lt,xt,Xt,Rt,R,w,G,it,ht,rt,Ft,Mt,Pt,ae,ft,Dt,qt,Yt,Ut,ue,se,Ee,F;function St(){ut=new Qv(P),ut.init(),se=new f0(P,ut),Lt=new qv(P,ut,t,se),xt=new Ly(P,ut),Lt.reverseDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),Xt=new e1(P),Rt=new vy,R=new By(P,ut,xt,Rt,Lt,se,Xt),w=new Zv(x),G=new Kv(x),it=new l_(P),Ee=new Wv(P,it),ht=new jv(P,it,Xt,Ee),rt=new i1(P,ht,it,Xt),Yt=new n1(P,Lt,R),ft=new Yv(Rt),Ft=new xy(x,w,G,ut,Lt,Ee,ft),Mt=new Xy(x,Rt),Pt=new My,ae=new Ay(ut),qt=new Gv(x,w,G,xt,rt,f,c),Dt=new Py(x,rt,Lt),F=new qy(P,Xt,Lt,xt),Ut=new Xv(P,ut,Xt),ue=new t1(P,ut,Xt),Xt.programs=Ft.programs,x.capabilities=Lt,x.extensions=ut,x.properties=Rt,x.renderLists=Pt,x.shadowMap=Dt,x.state=xt,x.info=Xt}St();const et=new Gy(x,P);this.xr=et,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=ut.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ut.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(E){E!==void 0&&(j=E,this.setSize(J,dt,!1))},this.getSize=function(E){return E.set(J,dt)},this.setSize=function(E,O,Y=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=E,dt=O,e.width=Math.floor(E*j),e.height=Math.floor(O*j),Y===!0&&(e.style.width=E+"px",e.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(J*j,dt*j).floor()},this.setDrawingBufferSize=function(E,O,Y){J=E,dt=O,j=Y,e.width=Math.floor(E*Y),e.height=Math.floor(O*Y),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(Ct)},this.setViewport=function(E,O,Y,$){E.isVector4?Ct.set(E.x,E.y,E.z,E.w):Ct.set(E,O,Y,$),xt.viewport(D.copy(Ct).multiplyScalar(j).round())},this.getScissor=function(E){return E.copy($t)},this.setScissor=function(E,O,Y,$){E.isVector4?$t.set(E.x,E.y,E.z,E.w):$t.set(E,O,Y,$),xt.scissor(X.copy($t).multiplyScalar(j).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(E){xt.setScissorTest(me=E)},this.setOpaqueSort=function(E){_t=E},this.setTransparentSort=function(E){bt=E},this.getClearColor=function(E){return E.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor.apply(qt,arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha.apply(qt,arguments)},this.clear=function(E=!0,O=!0,Y=!0){let $=0;if(E){let B=!1;if(I!==null){const mt=I.texture.format;B=mt===ec||mt===tc||mt===Ho}if(B){const mt=I.texture.type,Tt=mt===bi||mt===Zi||mt===Lr||mt===Zs||mt===Kl||mt===Ql,Ot=qt.getClearColor(),Bt=qt.getClearAlpha(),Jt=Ot.r,ne=Ot.g,zt=Ot.b;Tt?(p[0]=Jt,p[1]=ne,p[2]=zt,p[3]=Bt,P.clearBufferuiv(P.COLOR,0,p)):(_[0]=Jt,_[1]=ne,_[2]=zt,_[3]=Bt,P.clearBufferiv(P.COLOR,0,_))}else $|=P.COLOR_BUFFER_BIT}O&&($|=P.DEPTH_BUFFER_BIT),Y&&($|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",Et,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),Pt.dispose(),ae.dispose(),Rt.dispose(),w.dispose(),G.dispose(),rt.dispose(),Ee.dispose(),F.dispose(),Ft.dispose(),et.dispose(),et.removeEventListener("sessionstart",rd),et.removeEventListener("sessionend",od),ys.stop()};function ct(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Et(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=Xt.autoReset,O=Dt.enabled,Y=Dt.autoUpdate,$=Dt.needsUpdate,B=Dt.type;St(),Xt.autoReset=E,Dt.enabled=O,Dt.autoUpdate=Y,Dt.needsUpdate=$,Dt.type=B}function wt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ee(E){const O=E.target;O.removeEventListener("dispose",ee),Oe(O)}function Oe(E){an(E),Rt.remove(E)}function an(E){const O=Rt.get(E).programs;O!==void 0&&(O.forEach(function(Y){Ft.releaseProgram(Y)}),E.isShaderMaterial&&Ft.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,Y,$,B,mt){O===null&&(O=ot);const Tt=B.isMesh&&B.matrixWorld.determinant()<0,Ot=Rm(E,O,Y,$,B);xt.setMaterial($,Tt);let Bt=Y.index,Jt=1;if($.wireframe===!0){if(Bt=ht.getWireframeAttribute(Y),Bt===void 0)return;Jt=2}const ne=Y.drawRange,zt=Y.attributes.position;let ge=ne.start*Jt,Ae=(ne.start+ne.count)*Jt;mt!==null&&(ge=Math.max(ge,mt.start*Jt),Ae=Math.min(Ae,(mt.start+mt.count)*Jt)),Bt!==null?(ge=Math.max(ge,0),Ae=Math.min(Ae,Bt.count)):zt!=null&&(ge=Math.max(ge,0),Ae=Math.min(Ae,zt.count));const Ce=Ae-ge;if(Ce<0||Ce===1/0)return;Ee.setup(B,$,Ot,Y,Bt);let Rn,xe=Ut;if(Bt!==null&&(Rn=it.get(Bt),xe=ue,xe.setIndex(Rn)),B.isMesh)$.wireframe===!0?(xt.setLineWidth($.wireframeLinewidth*tt()),xe.setMode(P.LINES)):xe.setMode(P.TRIANGLES);else if(B.isLine){let kt=$.linewidth;kt===void 0&&(kt=1),xt.setLineWidth(kt*tt()),B.isLineSegments?xe.setMode(P.LINES):B.isLineLoop?xe.setMode(P.LINE_LOOP):xe.setMode(P.LINE_STRIP)}else B.isPoints?xe.setMode(P.POINTS):B.isSprite&&xe.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)xe.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))xe.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const kt=B._multiDrawStarts,Ii=B._multiDrawCounts,ve=B._multiDrawCount,Kn=Bt?it.get(Bt).bytesPerElement:1,ir=Rt.get($).currentProgram.getUniforms();for(let Bn=0;Bn<ve;Bn++)ir.setValue(P,"_gl_DrawID",Bn),xe.render(kt[Bn]/Kn,Ii[Bn])}else if(B.isInstancedMesh)xe.renderInstances(ge,Ce,B.count);else if(Y.isInstancedBufferGeometry){const kt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ii=Math.min(Y.instanceCount,kt);xe.renderInstances(ge,Ce,Ii)}else xe.render(ge,Ce)};function Se(E,O,Y){E.transparent===!0&&E.side===Ue&&E.forceSinglePass===!1?(E.side=bn,E.needsUpdate=!0,sa(E,O,Y),E.side=qi,E.needsUpdate=!0,sa(E,O,Y),E.side=Ue):sa(E,O,Y)}this.compile=function(E,O,Y=null){Y===null&&(Y=E),m=ae.get(Y),m.init(O),y.push(m),Y.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),E!==Y&&E.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const $=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const mt=B.material;if(mt)if(Array.isArray(mt))for(let Tt=0;Tt<mt.length;Tt++){const Ot=mt[Tt];Se(Ot,Y,B),$.add(Ot)}else Se(mt,Y,B),$.add(mt)}),y.pop(),m=null,$},this.compileAsync=function(E,O,Y=null){const $=this.compile(E,O,Y);return new Promise(B=>{function mt(){if($.forEach(function(Tt){Rt.get(Tt).currentProgram.isReady()&&$.delete(Tt)}),$.size===0){B(E);return}setTimeout(mt,10)}ut.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Jn=null;function Pi(E){Jn&&Jn(E)}function rd(){ys.stop()}function od(){ys.start()}const ys=new l0;ys.setAnimationLoop(Pi),typeof self<"u"&&ys.setContext(self),this.setAnimationLoop=function(E){Jn=E,et.setAnimationLoop(E),E===null?ys.stop():ys.start()},et.addEventListener("sessionstart",rd),et.addEventListener("sessionend",od),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(O),O=et.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,O,I),m=ae.get(E,y.length),m.init(O),y.push(m),Q.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),st.setFromProjectionMatrix(Q),N=this.localClippingEnabled,pt=ft.init(this.clippingPlanes,N),g=Pt.get(E,v.length),g.init(),v.push(g),et.enabled===!0&&et.isPresenting===!0){const mt=x.xr.getDepthSensingMesh();mt!==null&&Dc(mt,O,-1/0,x.sortObjects)}Dc(E,O,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(_t,bt),q=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,q&&qt.addToRenderList(g,E),this.info.render.frame++,pt===!0&&ft.beginShadows();const Y=m.state.shadowsArray;Dt.render(Y,E,O),pt===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=g.opaque,B=g.transmissive;if(m.setupLights(),O.isArrayCamera){const mt=O.cameras;if(B.length>0)for(let Tt=0,Ot=mt.length;Tt<Ot;Tt++){const Bt=mt[Tt];ld($,B,E,Bt)}q&&qt.render(E);for(let Tt=0,Ot=mt.length;Tt<Ot;Tt++){const Bt=mt[Tt];ad(g,E,Bt,Bt.viewport)}}else B.length>0&&ld($,B,E,O),q&&qt.render(E),ad(g,E,O);I!==null&&(R.updateMultisampleRenderTarget(I),R.updateRenderTargetMipmap(I)),E.isScene===!0&&E.onAfterRender(x,E,O),Ee.resetDefaultState(),S=-1,M=null,y.pop(),y.length>0?(m=y[y.length-1],pt===!0&&ft.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function Dc(E,O,Y,$){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)Y=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||st.intersectsSprite(E)){$&&k.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Q);const Tt=rt.update(E),Ot=E.material;Ot.visible&&g.push(E,Tt,Ot,Y,k.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||st.intersectsObject(E))){const Tt=rt.update(E),Ot=E.material;if($&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),k.copy(E.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),k.copy(Tt.boundingSphere.center)),k.applyMatrix4(E.matrixWorld).applyMatrix4(Q)),Array.isArray(Ot)){const Bt=Tt.groups;for(let Jt=0,ne=Bt.length;Jt<ne;Jt++){const zt=Bt[Jt],ge=Ot[zt.materialIndex];ge&&ge.visible&&g.push(E,Tt,ge,Y,k.z,zt)}}else Ot.visible&&g.push(E,Tt,Ot,Y,k.z,null)}}const mt=E.children;for(let Tt=0,Ot=mt.length;Tt<Ot;Tt++)Dc(mt[Tt],O,Y,$)}function ad(E,O,Y,$){const B=E.opaque,mt=E.transmissive,Tt=E.transparent;m.setupLightsView(Y),pt===!0&&ft.setGlobalState(x.clippingPlanes,Y),$&&xt.viewport(D.copy($)),B.length>0&&ia(B,O,Y),mt.length>0&&ia(mt,O,Y),Tt.length>0&&ia(Tt,O,Y),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function ld(E,O,Y,$){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[$.id]===void 0&&(m.state.transmissionRenderTarget[$.id]=new un(1,1,{generateMipmaps:!0,type:ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float")?li:bi,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ce.workingColorSpace}));const mt=m.state.transmissionRenderTarget[$.id],Tt=$.viewport||D;mt.setSize(Tt.z,Tt.w);const Ot=x.getRenderTarget();x.setRenderTarget(mt),x.getClearColor(V),at=x.getClearAlpha(),at<1&&x.setClearColor(16777215,.5),x.clear(),q&&qt.render(Y);const Bt=x.toneMapping;x.toneMapping=Wi;const Jt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),m.setupLightsView($),pt===!0&&ft.setGlobalState(x.clippingPlanes,$),ia(E,Y,$),R.updateMultisampleRenderTarget(mt),R.updateRenderTargetMipmap(mt),ut.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let zt=0,ge=O.length;zt<ge;zt++){const Ae=O[zt],Ce=Ae.object,Rn=Ae.geometry,xe=Ae.material,kt=Ae.group;if(xe.side===Ue&&Ce.layers.test($.layers)){const Ii=xe.side;xe.side=bn,xe.needsUpdate=!0,cd(Ce,Y,$,Rn,xe,kt),xe.side=Ii,xe.needsUpdate=!0,ne=!0}}ne===!0&&(R.updateMultisampleRenderTarget(mt),R.updateRenderTargetMipmap(mt))}x.setRenderTarget(Ot),x.setClearColor(V,at),Jt!==void 0&&($.viewport=Jt),x.toneMapping=Bt}function ia(E,O,Y){const $=O.isScene===!0?O.overrideMaterial:null;for(let B=0,mt=E.length;B<mt;B++){const Tt=E[B],Ot=Tt.object,Bt=Tt.geometry,Jt=$===null?Tt.material:$,ne=Tt.group;Ot.layers.test(Y.layers)&&cd(Ot,O,Y,Bt,Jt,ne)}}function cd(E,O,Y,$,B,mt){E.onBeforeRender(x,O,Y,$,B,mt),E.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(x,O,Y,$,E,mt),B.transparent===!0&&B.side===Ue&&B.forceSinglePass===!1?(B.side=bn,B.needsUpdate=!0,x.renderBufferDirect(Y,O,$,B,E,mt),B.side=qi,B.needsUpdate=!0,x.renderBufferDirect(Y,O,$,B,E,mt),B.side=Ue):x.renderBufferDirect(Y,O,$,B,E,mt),E.onAfterRender(x,O,Y,$,B,mt)}function sa(E,O,Y){O.isScene!==!0&&(O=ot);const $=Rt.get(E),B=m.state.lights,mt=m.state.shadowsArray,Tt=B.state.version,Ot=Ft.getParameters(E,B.state,mt,O,Y),Bt=Ft.getProgramCacheKey(Ot);let Jt=$.programs;$.environment=E.isMeshStandardMaterial?O.environment:null,$.fog=O.fog,$.envMap=(E.isMeshStandardMaterial?G:w).get(E.envMap||$.environment),$.envMapRotation=$.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Jt===void 0&&(E.addEventListener("dispose",ee),Jt=new Map,$.programs=Jt);let ne=Jt.get(Bt);if(ne!==void 0){if($.currentProgram===ne&&$.lightsStateVersion===Tt)return ud(E,Ot),ne}else Ot.uniforms=Ft.getUniforms(E),E.onBeforeCompile(Ot,x),ne=Ft.acquireProgram(Ot,Bt),Jt.set(Bt,ne),$.uniforms=Ot.uniforms;const zt=$.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(zt.clippingPlanes=ft.uniform),ud(E,Ot),$.needsLights=Im(E),$.lightsStateVersion=Tt,$.needsLights&&(zt.ambientLightColor.value=B.state.ambient,zt.lightProbe.value=B.state.probe,zt.directionalLights.value=B.state.directional,zt.directionalLightShadows.value=B.state.directionalShadow,zt.spotLights.value=B.state.spot,zt.spotLightShadows.value=B.state.spotShadow,zt.rectAreaLights.value=B.state.rectArea,zt.ltc_1.value=B.state.rectAreaLTC1,zt.ltc_2.value=B.state.rectAreaLTC2,zt.pointLights.value=B.state.point,zt.pointLightShadows.value=B.state.pointShadow,zt.hemisphereLights.value=B.state.hemi,zt.directionalShadowMap.value=B.state.directionalShadowMap,zt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,zt.spotShadowMap.value=B.state.spotShadowMap,zt.spotLightMatrix.value=B.state.spotLightMatrix,zt.spotLightMap.value=B.state.spotLightMap,zt.pointShadowMap.value=B.state.pointShadowMap,zt.pointShadowMatrix.value=B.state.pointShadowMatrix),$.currentProgram=ne,$.uniformsList=null,ne}function hd(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=tl.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function ud(E,O){const Y=Rt.get(E);Y.outputColorSpace=O.outputColorSpace,Y.batching=O.batching,Y.batchingColor=O.batchingColor,Y.instancing=O.instancing,Y.instancingColor=O.instancingColor,Y.instancingMorph=O.instancingMorph,Y.skinning=O.skinning,Y.morphTargets=O.morphTargets,Y.morphNormals=O.morphNormals,Y.morphColors=O.morphColors,Y.morphTargetsCount=O.morphTargetsCount,Y.numClippingPlanes=O.numClippingPlanes,Y.numIntersection=O.numClipIntersection,Y.vertexAlphas=O.vertexAlphas,Y.vertexTangents=O.vertexTangents,Y.toneMapping=O.toneMapping}function Rm(E,O,Y,$,B){O.isScene!==!0&&(O=ot),R.resetTextureUnits();const mt=O.fog,Tt=$.isMeshStandardMaterial?O.environment:null,Ot=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:js,Bt=($.isMeshStandardMaterial?G:w).get($.envMap||Tt),Jt=$.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,ne=!!Y.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),zt=!!Y.morphAttributes.position,ge=!!Y.morphAttributes.normal,Ae=!!Y.morphAttributes.color;let Ce=Wi;$.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ce=x.toneMapping);const Rn=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,xe=Rn!==void 0?Rn.length:0,kt=Rt.get($),Ii=m.state.lights;if(pt===!0&&(N===!0||E!==M)){const Gn=E===M&&$.id===S;ft.setState($,E,Gn)}let ve=!1;$.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==Ii.state.version||kt.outputColorSpace!==Ot||B.isBatchedMesh&&kt.batching===!1||!B.isBatchedMesh&&kt.batching===!0||B.isBatchedMesh&&kt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&kt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&kt.instancing===!1||!B.isInstancedMesh&&kt.instancing===!0||B.isSkinnedMesh&&kt.skinning===!1||!B.isSkinnedMesh&&kt.skinning===!0||B.isInstancedMesh&&kt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&kt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&kt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&kt.instancingMorph===!1&&B.morphTexture!==null||kt.envMap!==Bt||$.fog===!0&&kt.fog!==mt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==ft.numPlanes||kt.numIntersection!==ft.numIntersection)||kt.vertexAlphas!==Jt||kt.vertexTangents!==ne||kt.morphTargets!==zt||kt.morphNormals!==ge||kt.morphColors!==Ae||kt.toneMapping!==Ce||kt.morphTargetsCount!==xe)&&(ve=!0):(ve=!0,kt.__version=$.version);let Kn=kt.currentProgram;ve===!0&&(Kn=sa($,O,B));let ir=!1,Bn=!1,Yr=!1;const Re=Kn.getUniforms(),pi=kt.uniforms;if(xt.useProgram(Kn.program)&&(ir=!0,Bn=!0,Yr=!0),$.id!==S&&(S=$.id,Bn=!0),ir||M!==E){xt.buffers.depth.getReversed()?(L.copy(E.projectionMatrix),Dg(L),Ug(L),Re.setValue(P,"projectionMatrix",L)):Re.setValue(P,"projectionMatrix",E.projectionMatrix),Re.setValue(P,"viewMatrix",E.matrixWorldInverse);const Qi=Re.map.cameraPosition;Qi!==void 0&&Qi.setValue(P,W.setFromMatrixPosition(E.matrixWorld)),Lt.logarithmicDepthBuffer&&Re.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Re.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,Bn=!0,Yr=!0)}if(B.isSkinnedMesh){Re.setOptional(P,B,"bindMatrix"),Re.setOptional(P,B,"bindMatrixInverse");const Gn=B.skeleton;Gn&&(Gn.boneTexture===null&&Gn.computeBoneTexture(),Re.setValue(P,"boneTexture",Gn.boneTexture,R))}B.isBatchedMesh&&(Re.setOptional(P,B,"batchingTexture"),Re.setValue(P,"batchingTexture",B._matricesTexture,R),Re.setOptional(P,B,"batchingIdTexture"),Re.setValue(P,"batchingIdTexture",B._indirectTexture,R),Re.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&Re.setValue(P,"batchingColorTexture",B._colorsTexture,R));const Zr=Y.morphAttributes;if((Zr.position!==void 0||Zr.normal!==void 0||Zr.color!==void 0)&&Yt.update(B,Y,Kn),(Bn||kt.receiveShadow!==B.receiveShadow)&&(kt.receiveShadow=B.receiveShadow,Re.setValue(P,"receiveShadow",B.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(pi.envMap.value=Bt,pi.flipEnvMap.value=Bt.isCubeTexture&&Bt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&O.environment!==null&&(pi.envMapIntensity.value=O.environmentIntensity),Bn&&(Re.setValue(P,"toneMappingExposure",x.toneMappingExposure),kt.needsLights&&Pm(pi,Yr),mt&&$.fog===!0&&Mt.refreshFogUniforms(pi,mt),Mt.refreshMaterialUniforms(pi,$,j,dt,m.state.transmissionRenderTarget[E.id]),tl.upload(P,hd(kt),pi,R)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(tl.upload(P,hd(kt),pi,R),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Re.setValue(P,"center",B.center),Re.setValue(P,"modelViewMatrix",B.modelViewMatrix),Re.setValue(P,"normalMatrix",B.normalMatrix),Re.setValue(P,"modelMatrix",B.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Gn=$.uniformsGroups;for(let Qi=0,ji=Gn.length;Qi<ji;Qi++){const dd=Gn[Qi];F.update(dd,Kn),F.bind(dd,Kn)}}return Kn}function Pm(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Im(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(E,O,Y){Rt.get(E.texture).__webglTexture=O,Rt.get(E.depthTexture).__webglTexture=Y;const $=Rt.get(E);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=Y===void 0,$.__autoAllocateDepthBuffer||ut.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const Y=Rt.get(E);Y.__webglFramebuffer=O,Y.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,Y=0){I=E,T=O,A=Y;let $=!0,B=null,mt=!1,Tt=!1;if(E){const Bt=Rt.get(E);if(Bt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),$=!1;else if(Bt.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Bt.__hasExternalTextures)R.rebindTextures(E,Rt.get(E.texture).__webglTexture,Rt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const zt=E.depthTexture;if(Bt.__boundDepthTexture!==zt){if(zt!==null&&Rt.has(zt)&&(E.width!==zt.image.width||E.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Jt=E.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(Tt=!0);const ne=Rt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ne[O])?B=ne[O][Y]:B=ne[O],mt=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?B=Rt.get(E).__webglMultisampledFramebuffer:Array.isArray(ne)?B=ne[Y]:B=ne,D.copy(E.viewport),X.copy(E.scissor),H=E.scissorTest}else D.copy(Ct).multiplyScalar(j).floor(),X.copy($t).multiplyScalar(j).floor(),H=me;if(xt.bindFramebuffer(P.FRAMEBUFFER,B)&&$&&xt.drawBuffers(E,B),xt.viewport(D),xt.scissor(X),xt.setScissorTest(H),mt){const Bt=Rt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,Bt.__webglTexture,Y)}else if(Tt){const Bt=Rt.get(E.texture),Jt=O||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.__webglTexture,Y||0,Jt)}S=-1},this.readRenderTargetPixels=function(E,O,Y,$,B,mt,Tt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=Rt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Tt!==void 0&&(Ot=Ot[Tt]),Ot){xt.bindFramebuffer(P.FRAMEBUFFER,Ot);try{const Bt=E.texture,Jt=Bt.format,ne=Bt.type;if(!Lt.textureFormatReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Lt.textureTypeReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-$&&Y>=0&&Y<=E.height-B&&P.readPixels(O,Y,$,B,se.convert(Jt),se.convert(ne),mt)}finally{const Bt=I!==null?Rt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(E,O,Y,$,B,mt,Tt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=Rt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Tt!==void 0&&(Ot=Ot[Tt]),Ot){const Bt=E.texture,Jt=Bt.format,ne=Bt.type;if(!Lt.textureFormatReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Lt.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-$&&Y>=0&&Y<=E.height-B){xt.bindFramebuffer(P.FRAMEBUFFER,Ot);const zt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,zt),P.bufferData(P.PIXEL_PACK_BUFFER,mt.byteLength,P.STREAM_READ),P.readPixels(O,Y,$,B,se.convert(Jt),se.convert(ne),0);const ge=I!==null?Rt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,ge);const Ae=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Lg(P,Ae,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,zt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,mt),P.deleteBuffer(zt),P.deleteSync(Ae),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,Y=0){E.isTexture!==!0&&(co("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const $=Math.pow(2,-Y),B=Math.floor(E.image.width*$),mt=Math.floor(E.image.height*$),Tt=O!==null?O.x:0,Ot=O!==null?O.y:0;R.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,Y,0,0,Tt,Ot,B,mt),xt.unbindTexture()},this.copyTextureToTexture=function(E,O,Y=null,$=null,B=0){E.isTexture!==!0&&(co("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,E=arguments[1],O=arguments[2],B=arguments[3]||0,Y=null);let mt,Tt,Ot,Bt,Jt,ne,zt,ge,Ae;const Ce=E.isCompressedTexture?E.mipmaps[B]:E.image;Y!==null?(mt=Y.max.x-Y.min.x,Tt=Y.max.y-Y.min.y,Ot=Y.isBox3?Y.max.z-Y.min.z:1,Bt=Y.min.x,Jt=Y.min.y,ne=Y.isBox3?Y.min.z:0):(mt=Ce.width,Tt=Ce.height,Ot=Ce.depth||1,Bt=0,Jt=0,ne=0),$!==null?(zt=$.x,ge=$.y,Ae=$.z):(zt=0,ge=0,Ae=0);const Rn=se.convert(O.format),xe=se.convert(O.type);let kt;O.isData3DTexture?(R.setTexture3D(O,0),kt=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),kt=P.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),kt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);const Ii=P.getParameter(P.UNPACK_ROW_LENGTH),ve=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Kn=P.getParameter(P.UNPACK_SKIP_PIXELS),ir=P.getParameter(P.UNPACK_SKIP_ROWS),Bn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ce.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ce.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Bt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Jt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ne);const Yr=E.isDataArrayTexture||E.isData3DTexture,Re=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const pi=Rt.get(E),Zr=Rt.get(O),Gn=Rt.get(pi.__renderTarget),Qi=Rt.get(Zr.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Gn.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Qi.__webglFramebuffer);for(let ji=0;ji<Ot;ji++)Yr&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Rt.get(E).__webglTexture,B,ne+ji),E.isDepthTexture?(Re&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Rt.get(O).__webglTexture,B,Ae+ji),P.blitFramebuffer(Bt,Jt,mt,Tt,zt,ge,mt,Tt,P.DEPTH_BUFFER_BIT,P.NEAREST)):Re?P.copyTexSubImage3D(kt,B,zt,ge,Ae+ji,Bt,Jt,mt,Tt):P.copyTexSubImage2D(kt,B,zt,ge,Ae+ji,Bt,Jt,mt,Tt);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Re?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(kt,B,zt,ge,Ae,mt,Tt,Ot,Rn,xe,Ce.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(kt,B,zt,ge,Ae,mt,Tt,Ot,Rn,Ce.data):P.texSubImage3D(kt,B,zt,ge,Ae,mt,Tt,Ot,Rn,xe,Ce):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,B,zt,ge,mt,Tt,Rn,xe,Ce.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,B,zt,ge,Ce.width,Ce.height,Rn,Ce.data):P.texSubImage2D(P.TEXTURE_2D,B,zt,ge,mt,Tt,Rn,xe,Ce);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ii),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ve),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Kn),P.pixelStorei(P.UNPACK_SKIP_ROWS,ir),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Bn),B===0&&O.generateMipmaps&&P.generateMipmap(kt),xt.unbindTexture()},this.copyTextureToTexture3D=function(E,O,Y=null,$=null,B=0){return E.isTexture!==!0&&(co("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,$=arguments[1]||null,E=arguments[2],O=arguments[3],B=arguments[4]||0),co('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,Y,$,B)},this.initRenderTarget=function(E){Rt.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),xt.unbindTexture()},this.resetState=function(){T=0,A=0,I=null,xt.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}}class Yo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new lt(t),this.density=e}clone(){return new Yo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ac{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new lt(t),this.near=e,this.far=n}clone(){return new ac(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class lc extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class cc{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Co,this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const mn=new b;class Js{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.applyMatrix4(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.applyNormalMatrix(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.transformDirection(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=vn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),i=jt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),i=jt(i,this.array),r=jt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Js(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Cu extends pn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let _r;const jr=new b,xr=new b,vr=new b,yr=new nt,to=new nt,g0=new Wt,Ta=new b,eo=new b,Ea=new b,sf=new nt,ah=new nt,rf=new nt;class _0 extends pe{constructor(t=new Cu){if(super(),this.isSprite=!0,this.type="Sprite",_r===void 0){_r=new Zt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new cc(e,5);_r.setIndex([0,1,2,0,2,3]),_r.setAttribute("position",new Js(n,3,0,!1)),_r.setAttribute("uv",new Js(n,2,3,!1))}this.geometry=_r,this.material=t,this.center=new nt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xr.setFromMatrixScale(this.matrixWorld),g0.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),vr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xr.multiplyScalar(-vr.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Aa(Ta.set(-.5,-.5,0),vr,o,xr,i,r),Aa(eo.set(.5,-.5,0),vr,o,xr,i,r),Aa(Ea.set(.5,.5,0),vr,o,xr,i,r),sf.set(0,0),ah.set(1,0),rf.set(1,1);let a=t.ray.intersectTriangle(Ta,eo,Ea,!1,jr);if(a===null&&(Aa(eo.set(-.5,.5,0),vr,o,xr,i,r),ah.set(0,1),a=t.ray.intersectTriangle(Ta,Ea,eo,!1,jr),a===null))return;const c=t.ray.origin.distanceTo(jr);c<t.near||c>t.far||e.push({distance:c,point:jr.clone(),uv:Dn.getInterpolation(jr,Ta,eo,Ea,sf,ah,rf,new nt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Aa(s,t,e,n,i,r){yr.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(to.x=r*yr.x-i*yr.y,to.y=i*yr.x+r*yr.y):to.copy(yr),s.copy(t),s.x+=to.x,s.y+=to.y,s.applyMatrix4(g0)}const Ca=new b,of=new b;class x0 extends pe{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let n=0,i=e.length;n<i;n++){const r=e[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);const i=this.levels;let r;for(r=0;r<i.length&&!(e<i[r].distance);r++);return i.splice(r,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){const e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){const i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let r=e[n].distance;if(e[n].object.visible&&(r-=r*e[n].hysteresis),t<r)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){Ca.setFromMatrixPosition(this.matrixWorld);const i=t.ray.origin.distanceTo(Ca);this.getObjectForDistance(i).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){Ca.setFromMatrixPosition(t.matrixWorld),of.setFromMatrixPosition(this.matrixWorld);const n=Ca.distanceTo(of)/t.zoom;e[0].object.visible=!0;let i,r;for(i=1,r=e.length;i<r;i++){let o=e[i].distance;if(e[i].object.visible&&(o-=o*e[i].hysteresis),n>=o)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)e[i].object.visible=!1}}toJSON(t){const e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const o=n[i];e.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return e}}const af=new b,lf=new fe,cf=new fe,Yy=new b,hf=new Wt,Ra=new b,lh=new fn,uf=new Wt,ch=new Vr;class v0 extends K{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Oh,this.bindMatrix=new Wt,this.bindMatrixInverse=new Wt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new wn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ra),this.boundingBox.expandByPoint(Ra)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ra),this.boundingSphere.expandByPoint(Ra)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lh.copy(this.boundingSphere),lh.applyMatrix4(i),t.ray.intersectsSphere(lh)!==!1&&(uf.copy(i).invert(),ch.copy(t.ray).applyMatrix4(uf),!(this.boundingBox!==null&&ch.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ch)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new fe,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Oh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===kp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;lf.fromBufferAttribute(i.attributes.skinIndex,t),cf.fromBufferAttribute(i.attributes.skinWeight,t),af.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=cf.getComponent(r);if(o!==0){const a=lf.getComponent(r);hf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Yy.copy(af).applyMatrix4(hf),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Ru extends pe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class yi extends ke{constructor(t=null,e=1,n=1,i,r,o,a,c,l=Fe,h=Fe,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const df=new Wt,Zy=new Wt;class hc{constructor(t=[],e=[]){this.uuid=Hn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Wt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Wt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Zy;df.multiplyMatrices(a,e[r]),df.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new hc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new yi(e,t,t,Sn,Nn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ru),this.bones.push(o),this.boneInverses.push(new Wt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class Fr extends Me{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Mr=new Wt,ff=new Wt,Pa=[],pf=new wn,$y=new Wt,no=new K,io=new fn;class hs extends K{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Fr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,$y)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new wn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Mr),pf.copy(t.boundingBox).applyMatrix4(Mr),this.boundingBox.union(pf)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Mr),io.copy(t.boundingSphere).applyMatrix4(Mr),this.boundingSphere.union(io)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(no.geometry=this.geometry,no.material=this.material,no.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),io.copy(this.boundingSphere),io.applyMatrix4(n),t.ray.intersectsSphere(io)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Mr),ff.multiplyMatrices(n,Mr),no.matrixWorld=ff,no.raycast(t,Pa);for(let o=0,a=Pa.length;o<a;o++){const c=Pa[o];c.instanceId=r,c.object=this,e.push(c)}Pa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Fr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new yi(new Float32Array(i*this.count),i,this.count,jl,Nn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function hh(s,t){return s-t}function Jy(s,t){return s.z-t.z}function Ky(s,t){return t.z-s.z}class Qy{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){const r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const a=r[this.index];o.push(a),this.index++,a.start=t,a.count=e,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const Pn=new Wt,jy=new lt(1,1,1),uh=new Xo,Ia=new wn,As=new fn,so=new b,mf=new b,tM=new b,dh=new Qy,hn=new K,La=[];function eM(s,t,e=0){const n=t.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==t.array.constructor){const i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)t.setComponent(r+e,o,s.getComponent(r,o))}else t.array.set(s.array,e*n);t.needsUpdate=!0}function Cs(s,t){if(s.constructor!==t.constructor){const e=Math.min(s.length,t.length);for(let n=0;n<e;n++)t[n]=s[n]}else{const e=Math.min(s.length,t.length);t.set(new s.constructor(s.buffer,0,e))}}class y0 extends K{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(t,e,n=e*2,i){super(new Zt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4),n=new yi(e,t,t,Sn,Nn);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),n=new yi(e,t,t,Ho,Zi);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),n=new yi(e,t,t,Sn,Nn);n.colorSpace=ce.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){const e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in t.attributes){const o=t.getAttribute(r),{array:a,itemSize:c,normalized:l}=o,h=new a.constructor(n*c),u=new Me(h,c,l);e.setAttribute(r,u)}if(t.getIndex()!==null){const r=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new Me(r,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=t.getAttribute(n),r=e.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);const t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const r=e[n].geometryIndex;this.getMatrixAt(n,Pn),this.getBoundingBoxAt(r,Ia).applyMatrix4(Pn),t.union(Ia)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);const t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const r=e[n].geometryIndex;this.getMatrixAt(n,Pn),this.getBoundingSphereAt(r,As).applyMatrix4(Pn),t.union(As)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:t};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(hh),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const r=this._matricesTexture;Pn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;const o=this._colorsTexture;return o&&(jy.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;const o=t.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let c;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(hh),c=this._availableGeometryIds.shift(),r[c]=i):(c=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(c,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,c}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=e.getIndex(),a=this._geometryInfo[t];if(i&&o.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const c=a.vertexStart,l=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(const h in n.attributes){const u=e.getAttribute(h),d=n.getAttribute(h);eM(u,d,c);const f=u.itemSize;for(let p=u.count,_=l;p<_;p++){const g=c+p;for(let m=0;m<f;m++)d.setComponent(g,m,0)}d.needsUpdate=!0,d.addUpdateRange(c*f,l*f)}if(i){const h=a.indexStart,u=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let d=0;d<o.count;d++)r.setX(h+d,c+o.getX(d));for(let d=o.count,f=u;d<f;d++)r.setX(h+d,c);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,e.boundingSphere!==null&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){const e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;const n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].geometryIndex===t&&this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?this:(e[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this)}optimize(){let t=0,e=0;const n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){const c=i[o],l=n[c];if(l.active!==!1){if(r.index!==null){if(l.indexStart!==e){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=l,f=r.index,p=f.array,_=t-u;for(let g=h;g<h+d;g++)p[g]=p[g]+_;f.array.copyWithin(e,h,h+d),f.addUpdateRange(e,d),l.indexStart=e}e+=l.reservedIndexCount}if(l.vertexStart!==t){const{vertexStart:h,reservedVertexCount:u}=l,d=r.attributes;for(const f in d){const p=d[f],{array:_,itemSize:g}=p;_.copyWithin(t*g,h*g,(h+u)*g),p.addUpdateRange(t*g,u*g)}l.vertexStart=t}t+=l.reservedVertexCount,l.start=r.index?l.indexStart:l.vertexStart,this._nextIndexStart=r.index?l.indexStart+l.reservedIndexCount:0,this._nextVertexStart=l.vertexStart+l.reservedVertexCount}}return this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){const r=new wn,o=n.index,a=n.attributes.position;for(let c=i.start,l=i.start+i.count;c<l;c++){let h=c;o&&(h=o.getX(h)),r.expandByPoint(so.fromBufferAttribute(a,h))}i.boundingBox=r}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){const r=new fn;this.getBoundingBoxAt(t,Ia),Ia.getCenter(r.center);const o=n.index,a=n.attributes.position;let c=0;for(let l=i.start,h=i.start+i.count;l<h;l++){let u=l;o&&(u=o.getX(u)),so.fromBufferAttribute(a,u),c=Math.max(c,r.center.distanceToSquared(so))}r.radius=Math.sqrt(c),i.boundingSphere=r}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture,r=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?this:(e.toArray(r,t*16),i.needsUpdate=!0,this)}getMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?null:e.fromArray(i,t*16)}setColorAt(t,e){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,r=this._instanceInfo;return t>=r.length||r[t].active===!1?this:(e.toArray(i,t*4),n.needsUpdate=!0,this)}getColorAt(t,e){const n=this._colorsTexture.image.data,i=this._instanceInfo;return t>=i.length||i[t].active===!1?null:e.fromArray(n,t*4)}setVisibleAt(t,e){const n=this._instanceInfo;return t>=n.length||n[t].active===!1||n[t].visible===e?this:(n[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?!1:e[t].visible}setGeometryIdAt(t,e){const n=this._instanceInfo,i=this._geometryInfo;return t>=n.length||n[t].active===!1||e>=i.length||i[e].active===!1?null:(n[t].geometryIndex=e,this)}getGeometryIdAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?-1:e[t].geometryIndex}getGeometryRangeAt(t,e={}){if(t<0||t>=this._geometryCount)return null;const n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){const e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(hh);e[e.length-1]===n.length;)n.pop(),e.pop();if(t<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);const i=new Int32Array(t),r=new Int32Array(t);Cs(this._multiDrawCounts,i),Cs(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=t;const o=this._indirectTexture,a=this._matricesTexture,c=this._colorsTexture;o.dispose(),this._initIndirectTexture(),Cs(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),Cs(a.image.data,this._matricesTexture.image.data),c&&(c.dispose(),this._initColorsTexture(),Cs(c.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(c=>c.indexStart+c.reservedIndexCount))>e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Zt,this._initializeGeometry(r));const o=this.geometry;r.index&&Cs(r.index.array,o.index.array);for(const a in r.attributes)Cs(r.attributes[a].array,o.attributes[a].array)}raycast(t,e){const n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;hn.material=this.material,hn.geometry.index=o.index,hn.geometry.attributes=o.attributes,hn.geometry.boundingBox===null&&(hn.geometry.boundingBox=new wn),hn.geometry.boundingSphere===null&&(hn.geometry.boundingSphere=new fn);for(let a=0,c=n.length;a<c;a++){if(!n[a].visible||!n[a].active)continue;const l=n[a].geometryIndex,h=i[l];hn.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,hn.matrixWorld).premultiply(r),this.getBoundingBoxAt(l,hn.geometry.boundingBox),this.getBoundingSphereAt(l,hn.geometry.boundingSphere),hn.raycast(t,La);for(let u=0,d=La.length;u<d;u++){const f=La[u];f.object=this,f.batchId=a,e.push(f)}La.length=0}hn.material=null,hn.geometry.index=null,hn.geometry.attributes={},hn.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._geometryCount=t._geometryCount,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(t,e,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._instanceInfo,l=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,p=f.image.data;d&&(Pn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),uh.setFromProjectionMatrix(Pn,t.coordinateSystem));let _=0;if(this.sortObjects){Pn.copy(this.matrixWorld).invert(),so.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Pn),mf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Pn);for(let v=0,y=c.length;v<y;v++)if(c[v].visible&&c[v].active){const x=c[v].geometryIndex;this.getMatrixAt(v,Pn),this.getBoundingSphereAt(x,As).applyMatrix4(Pn);let C=!1;if(d&&(C=!uh.intersectsSphere(As)),!C){const T=u[x],A=tM.subVectors(As.center,so).dot(mf);dh.push(T.start,T.count,A,v)}}const g=dh.list,m=this.customSort;m===null?g.sort(r.transparent?Ky:Jy):m.call(this,g,n);for(let v=0,y=g.length;v<y;v++){const x=g[v];l[_]=x.start*a,h[_]=x.count,p[_]=x.index,_++}dh.reset()}else for(let g=0,m=c.length;g<m;g++)if(c[g].visible&&c[g].active){const v=c[g].geometryIndex;let y=!1;if(d&&(this.getMatrixAt(g,Pn),this.getBoundingSphereAt(v,As).applyMatrix4(Pn),y=!uh.intersectsSphere(As)),!y){const x=u[v];l[_]=x.start*a,h[_]=x.count,p[_]=g,_++}}f.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,r,o){this.onBeforeRender(t,null,i,r,o)}}class Cn extends pn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Hl=new b,Gl=new b,gf=new Wt,ro=new Vr,Da=new fn,fh=new b,_f=new b;class ps extends pe{constructor(t=new Zt,e=new Cn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Hl.fromBufferAttribute(e,i-1),Gl.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Hl.distanceTo(Gl);t.setAttribute("lineDistance",new It(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(i),Da.radius+=r,t.ray.intersectsSphere(Da)===!1)return;gf.copy(i).invert(),ro.copy(t.ray).applyMatrix4(gf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=l){const m=h.getX(_),v=h.getX(_+1),y=Ua(this,t,ro,c,m,v);y&&e.push(y)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(f),m=Ua(this,t,ro,c,_,g);m&&e.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=l){const m=Ua(this,t,ro,c,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=Ua(this,t,ro,c,p-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ua(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(Hl.fromBufferAttribute(o,i),Gl.fromBufferAttribute(o,r),e.distanceSqToSegment(Hl,Gl,fh,_f)>n)return;fh.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(fh);if(!(c<t.near||c>t.far))return{distance:c,point:_f.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const xf=new b,vf=new b;class Ci extends ps{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)xf.fromBufferAttribute(e,i),vf.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+xf.distanceTo(vf);t.setAttribute("lineDistance",new It(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class M0 extends ps{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Zo extends pn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yf=new Wt,Gh=new Vr,Na=new fn,Fa=new b;class uc extends pe{constructor(t=new Zt,e=new Zo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(i),Na.radius+=r,t.ray.intersectsSphere(Na)===!1)return;yf.copy(i).invert(),Gh.copy(t.ray).applyMatrix4(yf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=d,_=f;p<_;p++){const g=l.getX(p);Fa.fromBufferAttribute(u,g),Mf(Fa,g,c,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,_=f;p<_;p++)Fa.fromBufferAttribute(u,p),Mf(Fa,p,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Mf(s,t,e,n,i,r,o){const a=Gh.distanceSqToPoint(s);if(a<e){const c=new b;Gh.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class nM extends ke{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:Ze,this.magFilter=r!==void 0?r:Ze,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,t.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class iM extends ke{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=Fe,this.minFilter=Fe,this.generateMipmaps=!1,this.needsUpdate=!0}}class dc extends ke{constructor(t,e,n,i,r,o,a,c,l,h,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class sM extends dc{constructor(t,e,n,i,r,o){super(t,e,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Mn,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class rM extends dc{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,Yi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class $o extends ke{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new nt:new b);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new b,i=[],r=[],o=[],a=new b,c=new Wt;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new b)}r[0]=new b,o[0]=new b;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(ze(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(ze(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class fc extends hi{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new nt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class S0 extends fc{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Pu(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Oa=new b,ph=new Pu,mh=new Pu,gh=new Pu;class b0 extends hi{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new b){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(Oa.subVectors(i[0],i[1]).add(i[0]),l=Oa);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Oa.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Oa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),ph.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,_,g),mh.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,_,g),gh.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(ph.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),mh.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),gh.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(ph.calc(c),mh.calc(c),gh.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new b().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Sf(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function oM(s,t){const e=1-s;return e*e*t}function aM(s,t){return 2*(1-s)*s*t}function lM(s,t){return s*s*t}function yo(s,t,e,n){return oM(s,t)+aM(s,e)+lM(s,n)}function cM(s,t){const e=1-s;return e*e*e*t}function hM(s,t){const e=1-s;return 3*e*e*s*t}function uM(s,t){return 3*(1-s)*s*s*t}function dM(s,t){return s*s*s*t}function Mo(s,t,e,n,i){return cM(s,t)+hM(s,e)+uM(s,n)+dM(s,i)}class Iu extends hi{constructor(t=new nt,e=new nt,n=new nt,i=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new nt){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mo(t,i.x,r.x,o.x,a.x),Mo(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class w0 extends hi{constructor(t=new b,e=new b,n=new b,i=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new b){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mo(t,i.x,r.x,o.x,a.x),Mo(t,i.y,r.y,o.y,a.y),Mo(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lu extends hi{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class T0 extends hi{constructor(t=new b,e=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Du extends hi{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(yo(t,i.x,r.x,o.x),yo(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gr extends hi{constructor(t=new b,e=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new b){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(yo(t,i.x,r.x,o.x),yo(t,i.y,r.y,o.y),yo(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uu extends hi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Sf(a,c.x,l.x,h.x,u.x),Sf(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new nt().fromArray(i))}return this}}var Wl=Object.freeze({__proto__:null,ArcCurve:S0,CatmullRomCurve3:b0,CubicBezierCurve:Iu,CubicBezierCurve3:w0,EllipseCurve:fc,LineCurve:Lu,LineCurve3:T0,QuadraticBezierCurve:Du,QuadraticBezierCurve3:Gr,SplineCurve:Uu});class E0 extends hi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Wl[i.type]().fromJSON(i))}return this}}class Lo extends E0{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Lu(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Du(this.currentPoint.clone(),new nt(t,e),new nt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Iu(this.currentPoint.clone(),new nt(t,e),new nt(n,i),new nt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Uu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){const l=new fc(t,e,n,i,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Jo extends Zt{constructor(t=[new nt(0,-.5),new nt(.5,0),new nt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=ze(i,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new b,d=new nt,f=new b,p=new b,_=new b;let g=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=e;v++){const y=n+v*h*i,x=Math.sin(y),C=Math.cos(y);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*x,u.y=t[T].y,u.z=t[T].x*C,o.push(u.x,u.y,u.z),d.x=v/e,d.y=T/(t.length-1),a.push(d.x,d.y);const A=c[3*T+0]*x,I=c[3*T+1],S=c[3*T+0]*C;l.push(A,I,S)}}for(let v=0;v<e;v++)for(let y=0;y<t.length-1;y++){const x=y+v*t.length,C=x,T=x+t.length,A=x+t.length+1,I=x+1;r.push(C,T,I),r.push(A,I,T)}this.setIndex(r),this.setAttribute("position",new It(o,3)),this.setAttribute("uv",new It(a,2)),this.setAttribute("normal",new It(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jo(t.points,t.segments,t.phiStart,t.phiLength)}}class pc extends Jo{constructor(t=1,e=1,n=4,i=8){const r=new Lo;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new pc(t.radius,t.length,t.capSegments,t.radialSegments)}}class Wr extends Zt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new b,h=new nt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new It(o,3)),this.setAttribute("normal",new It(a,3)),this.setAttribute("uv",new It(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Fn extends Zt{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new It(u,3)),this.setAttribute("normal",new It(d,3)),this.setAttribute("uv",new It(f,2));function v(){const x=new b,C=new b;let T=0;const A=(e-t)/n;for(let I=0;I<=r;I++){const S=[],M=I/r,D=M*(e-t)+t;for(let X=0;X<=i;X++){const H=X/i,V=H*c+a,at=Math.sin(V),J=Math.cos(V);C.x=D*at,C.y=-M*n+g,C.z=D*J,u.push(C.x,C.y,C.z),x.set(at,A,J).normalize(),d.push(x.x,x.y,x.z),f.push(H,1-M),S.push(p++)}_.push(S)}for(let I=0;I<i;I++)for(let S=0;S<r;S++){const M=_[S][I],D=_[S+1][I],X=_[S+1][I+1],H=_[S][I+1];(t>0||S!==0)&&(h.push(M,D,H),T+=3),(e>0||S!==r-1)&&(h.push(D,X,H),T+=3)}l.addGroup(m,T,0),m+=T}function y(x){const C=p,T=new nt,A=new b;let I=0;const S=x===!0?t:e,M=x===!0?1:-1;for(let X=1;X<=i;X++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),p++;const D=p;for(let X=0;X<=i;X++){const V=X/i*c+a,at=Math.cos(V),J=Math.sin(V);A.x=S*J,A.y=g*M,A.z=S*at,u.push(A.x,A.y,A.z),d.push(0,M,0),T.x=at*.5+.5,T.y=J*.5*M+.5,f.push(T.x,T.y),p++}for(let X=0;X<i;X++){const H=C+X,V=D+X;x===!0?h.push(V,V+1,H):h.push(V+1,V,H),I+=3}l.addGroup(m,I,x===!0?1:2),m+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gs extends Fn{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new gs(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _s extends Zt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new It(r,3)),this.setAttribute("normal",new It(r.slice(),3)),this.setAttribute("uv",new It(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new b,x=new b,C=new b;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],x),f(e[T+2],C),c(y,x,C,v)}function c(v,y,x,C){const T=C+1,A=[];for(let I=0;I<=T;I++){A[I]=[];const S=v.clone().lerp(x,I/T),M=y.clone().lerp(x,I/T),D=T-I;for(let X=0;X<=D;X++)X===0&&I===T?A[I][X]=S:A[I][X]=S.clone().lerp(M,X/D)}for(let I=0;I<T;I++)for(let S=0;S<2*(T-I)-1;S++){const M=Math.floor(S/2);S%2===0?(d(A[I][M+1]),d(A[I+1][M]),d(A[I][M])):(d(A[I][M+1]),d(A[I+1][M+1]),d(A[I+1][M]))}}function l(v){const y=new b;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(v),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){const v=new b;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const x=g(v)/2/Math.PI+.5,C=m(v)/Math.PI+.5;o.push(x,1-C)}p(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],x=o[v+2],C=o[v+4],T=Math.max(y,x,C),A=Math.min(y,x,C);T>.9&&A<.1&&(y<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),C<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,y){const x=v*3;y.x=t[x+0],y.y=t[x+1],y.z=t[x+2]}function p(){const v=new b,y=new b,x=new b,C=new b,T=new nt,A=new nt,I=new nt;for(let S=0,M=0;S<r.length;S+=9,M+=6){v.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),T.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),I.set(o[M+4],o[M+5]),C.copy(v).add(y).add(x).divideScalar(3);const D=g(C);_(T,M+0,v,D),_(A,M+2,y,D),_(I,M+4,x,D)}}function _(v,y,x,C){C<0&&v.x===1&&(o[y]=v.x-1),x.x===0&&x.z===0&&(o[y]=C/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _s(t.vertices,t.indices,t.radius,t.details)}}class wi extends _s{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new wi(t.radius,t.detail)}}const Ba=new b,za=new b,_h=new b,ka=new Dn;class A0 extends Zt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),r=Math.cos(Ws*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<c;p+=3){o?(l[0]=o.getX(p),l[1]=o.getX(p+1),l[2]=o.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);const{a:_,b:g,c:m}=ka;if(_.fromBufferAttribute(a,l[0]),g.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),ka.getNormal(_h),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let v=0;v<3;v++){const y=(v+1)%3,x=u[v],C=u[y],T=ka[h[v]],A=ka[h[y]],I=`${x}_${C}`,S=`${C}_${x}`;S in d&&d[S]?(_h.dot(d[S].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(A.x,A.y,A.z)),d[S]=null):I in d||(d[I]={index0:l[v],index1:l[y],normal:_h.clone()})}}for(const p in d)if(d[p]){const{index0:_,index1:g}=d[p];Ba.fromBufferAttribute(a,_),za.fromBufferAttribute(a,g),f.push(Ba.x,Ba.y,Ba.z),f.push(za.x,za.y,za.z)}this.setAttribute("position",new It(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class us extends Lo{constructor(t){super(t),this.uuid=Hn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Lo().fromJSON(i))}return this}}const fM={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=C0(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=xM(s,t,r,e)),s.length>80*e){a=l=s[0],c=h=s[1];for(let p=e;p<i;p+=e)u=s[p],d=s[p+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Do(r,o,e,a,c,f,0),o}};function C0(s,t,e,n,i){let r,o;if(i===RM(s,t,e,n)>0)for(r=t;r<e;r+=n)o=bf(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=bf(r,s[r],s[r+1],o);return o&&mc(o,o.next)&&(No(o),o=o.next),o}function Ks(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(mc(e,e.next)||Ne(e.prev,e,e.next)===0)){if(No(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Do(s,t,e,n,i,r,o){if(!s)return;!o&&r&&bM(s,n,i,r);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?mM(s,n,i,r):pM(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),No(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=gM(Ks(s),t,e),Do(s,t,e,n,i,r,2)):o===2&&_M(s,t,e,n,i,r):Do(Ks(s),t,e,n,i,r,1);break}}}function pM(s){const t=s.prev,e=s,n=s.next;if(Ne(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=i>r?i>o?i:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Cr(i,a,r,c,o,l,p.x,p.y)&&Ne(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function mM(s,t,e,n){const i=s.prev,r=s,o=s.next;if(Ne(i,r,o)>=0)return!1;const a=i.x,c=r.x,l=o.x,h=i.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,p=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,g=h>u?h>d?h:d:u>d?u:d,m=Wh(f,p,t,e,n),v=Wh(_,g,t,e,n);let y=s.prevZ,x=s.nextZ;for(;y&&y.z>=m&&x&&x.z<=v;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Cr(a,h,c,u,l,d,y.x,y.y)&&Ne(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Cr(a,h,c,u,l,d,x.x,x.y)&&Ne(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Cr(a,h,c,u,l,d,y.x,y.y)&&Ne(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=v;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Cr(a,h,c,u,l,d,x.x,x.y)&&Ne(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function gM(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!mc(i,r)&&R0(i,n,n.next,r)&&Uo(i,r)&&Uo(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),No(n),No(n.next),n=s=r),n=n.next}while(n!==s);return Ks(n)}function _M(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&EM(o,a)){let c=P0(o,a);o=Ks(o,o.next),c=Ks(c,c.next),Do(o,t,e,n,i,r,0),Do(c,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function xM(s,t,e,n){const i=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:s.length,l=C0(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(TM(l));for(i.sort(vM),r=0;r<i.length;r++)e=yM(i[r],e);return e}function vM(s,t){return s.x-t.x}function yM(s,t){const e=MM(s,t);if(!e)return t;const n=P0(e,s);return Ks(n,n.next),Ks(e,e.next)}function MM(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,u;e=i;do r>=e.x&&e.x>=c&&r!==e.x&&Cr(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Uo(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&SM(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function SM(s,t){return Ne(s.prev,s,t.prev)<0&&Ne(t.next,s,s.next)<0}function bM(s,t,e,n){let i=s;do i.z===0&&(i.z=Wh(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,wM(i)}function wM(s){let t,e,n,i,r,o,a,c,l=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,l*=2}while(o>1);return s}function Wh(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function TM(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Cr(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function EM(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!AM(s,t)&&(Uo(s,t)&&Uo(t,s)&&CM(s,t)&&(Ne(s.prev,s,t.prev)||Ne(s,t.prev,t))||mc(s,t)&&Ne(s.prev,s,s.next)>0&&Ne(t.prev,t,t.next)>0)}function Ne(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function mc(s,t){return s.x===t.x&&s.y===t.y}function R0(s,t,e,n){const i=Ha(Ne(s,t,e)),r=Ha(Ne(s,t,n)),o=Ha(Ne(e,n,s)),a=Ha(Ne(e,n,t));return!!(i!==r&&o!==a||i===0&&Va(s,e,t)||r===0&&Va(s,n,t)||o===0&&Va(e,s,n)||a===0&&Va(e,t,n))}function Va(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ha(s){return s>0?1:s<0?-1:0}function AM(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&R0(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Uo(s,t){return Ne(s.prev,s,s.next)<0?Ne(s,t,s.next)>=0&&Ne(s,s.prev,t)>=0:Ne(s,t,s.prev)<0||Ne(s,s.next,t)<0}function CM(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function P0(s,t){const e=new Xh(s.i,s.x,s.y),n=new Xh(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function bf(s,t,e,n){const i=new Xh(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function No(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Xh(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function RM(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Mi{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Mi.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];wf(t),Tf(n,t);let o=t.length;e.forEach(wf);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,Tf(n,e[c]);const a=fM.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function wf(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Tf(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Ko extends Zt{constructor(t=new us([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new It(i,3)),this.setAttribute("uv",new It(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:PM;let y,x=!1,C,T,A,I;m&&(y=m.getSpacedPoints(h),x=!0,d=!1,C=m.computeFrenetFrames(h,!1),T=new b,A=new b,I=new b),d||(g=0,f=0,p=0,_=0);const S=a.extractPoints(l);let M=S.shape;const D=S.holes;if(!Mi.isClockWise(M)){M=M.reverse();for(let q=0,tt=D.length;q<tt;q++){const P=D[q];Mi.isClockWise(P)&&(D[q]=P.reverse())}}const H=Mi.triangulateShape(M,D),V=M;for(let q=0,tt=D.length;q<tt;q++){const P=D[q];M=M.concat(P)}function at(q,tt,P){return tt||console.error("THREE.ExtrudeGeometry: vec does not exist"),q.clone().addScaledVector(tt,P)}const J=M.length,dt=H.length;function j(q,tt,P){let gt,ut,Lt;const xt=q.x-tt.x,Xt=q.y-tt.y,Rt=P.x-q.x,R=P.y-q.y,w=xt*xt+Xt*Xt,G=xt*R-Xt*Rt;if(Math.abs(G)>Number.EPSILON){const it=Math.sqrt(w),ht=Math.sqrt(Rt*Rt+R*R),rt=tt.x-Xt/it,Ft=tt.y+xt/it,Mt=P.x-R/ht,Pt=P.y+Rt/ht,ae=((Mt-rt)*R-(Pt-Ft)*Rt)/(xt*R-Xt*Rt);gt=rt+xt*ae-q.x,ut=Ft+Xt*ae-q.y;const ft=gt*gt+ut*ut;if(ft<=2)return new nt(gt,ut);Lt=Math.sqrt(ft/2)}else{let it=!1;xt>Number.EPSILON?Rt>Number.EPSILON&&(it=!0):xt<-Number.EPSILON?Rt<-Number.EPSILON&&(it=!0):Math.sign(Xt)===Math.sign(R)&&(it=!0),it?(gt=-Xt,ut=xt,Lt=Math.sqrt(w)):(gt=xt,ut=Xt,Lt=Math.sqrt(w/2))}return new nt(gt/Lt,ut/Lt)}const _t=[];for(let q=0,tt=V.length,P=tt-1,gt=q+1;q<tt;q++,P++,gt++)P===tt&&(P=0),gt===tt&&(gt=0),_t[q]=j(V[q],V[P],V[gt]);const bt=[];let Ct,$t=_t.concat();for(let q=0,tt=D.length;q<tt;q++){const P=D[q];Ct=[];for(let gt=0,ut=P.length,Lt=ut-1,xt=gt+1;gt<ut;gt++,Lt++,xt++)Lt===ut&&(Lt=0),xt===ut&&(xt=0),Ct[gt]=j(P[gt],P[Lt],P[xt]);bt.push(Ct),$t=$t.concat(Ct)}for(let q=0;q<g;q++){const tt=q/g,P=f*Math.cos(tt*Math.PI/2),gt=p*Math.sin(tt*Math.PI/2)+_;for(let ut=0,Lt=V.length;ut<Lt;ut++){const xt=at(V[ut],_t[ut],gt);L(xt.x,xt.y,-P)}for(let ut=0,Lt=D.length;ut<Lt;ut++){const xt=D[ut];Ct=bt[ut];for(let Xt=0,Rt=xt.length;Xt<Rt;Xt++){const R=at(xt[Xt],Ct[Xt],gt);L(R.x,R.y,-P)}}}const me=p+_;for(let q=0;q<J;q++){const tt=d?at(M[q],$t[q],me):M[q];x?(A.copy(C.normals[0]).multiplyScalar(tt.x),T.copy(C.binormals[0]).multiplyScalar(tt.y),I.copy(y[0]).add(A).add(T),L(I.x,I.y,I.z)):L(tt.x,tt.y,0)}for(let q=1;q<=h;q++)for(let tt=0;tt<J;tt++){const P=d?at(M[tt],$t[tt],me):M[tt];x?(A.copy(C.normals[q]).multiplyScalar(P.x),T.copy(C.binormals[q]).multiplyScalar(P.y),I.copy(y[q]).add(A).add(T),L(I.x,I.y,I.z)):L(P.x,P.y,u/h*q)}for(let q=g-1;q>=0;q--){const tt=q/g,P=f*Math.cos(tt*Math.PI/2),gt=p*Math.sin(tt*Math.PI/2)+_;for(let ut=0,Lt=V.length;ut<Lt;ut++){const xt=at(V[ut],_t[ut],gt);L(xt.x,xt.y,u+P)}for(let ut=0,Lt=D.length;ut<Lt;ut++){const xt=D[ut];Ct=bt[ut];for(let Xt=0,Rt=xt.length;Xt<Rt;Xt++){const R=at(xt[Xt],Ct[Xt],gt);x?L(R.x,R.y+y[h-1].y,y[h-1].x+P):L(R.x,R.y,u+P)}}}st(),pt();function st(){const q=i.length/3;if(d){let tt=0,P=J*tt;for(let gt=0;gt<dt;gt++){const ut=H[gt];Q(ut[2]+P,ut[1]+P,ut[0]+P)}tt=h+g*2,P=J*tt;for(let gt=0;gt<dt;gt++){const ut=H[gt];Q(ut[0]+P,ut[1]+P,ut[2]+P)}}else{for(let tt=0;tt<dt;tt++){const P=H[tt];Q(P[2],P[1],P[0])}for(let tt=0;tt<dt;tt++){const P=H[tt];Q(P[0]+J*h,P[1]+J*h,P[2]+J*h)}}n.addGroup(q,i.length/3-q,0)}function pt(){const q=i.length/3;let tt=0;N(V,tt),tt+=V.length;for(let P=0,gt=D.length;P<gt;P++){const ut=D[P];N(ut,tt),tt+=ut.length}n.addGroup(q,i.length/3-q,1)}function N(q,tt){let P=q.length;for(;--P>=0;){const gt=P;let ut=P-1;ut<0&&(ut=q.length-1);for(let Lt=0,xt=h+g*2;Lt<xt;Lt++){const Xt=J*Lt,Rt=J*(Lt+1),R=tt+gt+Xt,w=tt+ut+Xt,G=tt+ut+Rt,it=tt+gt+Rt;W(R,w,G,it)}}}function L(q,tt,P){c.push(q),c.push(tt),c.push(P)}function Q(q,tt,P){k(q),k(tt),k(P);const gt=i.length/3,ut=v.generateTopUV(n,i,gt-3,gt-2,gt-1);ot(ut[0]),ot(ut[1]),ot(ut[2])}function W(q,tt,P,gt){k(q),k(tt),k(gt),k(tt),k(P),k(gt);const ut=i.length/3,Lt=v.generateSideWallUV(n,i,ut-6,ut-3,ut-2,ut-1);ot(Lt[0]),ot(Lt[1]),ot(Lt[3]),ot(Lt[1]),ot(Lt[2]),ot(Lt[3])}function k(q){i.push(c[q*3+0]),i.push(c[q*3+1]),i.push(c[q*3+2])}function ot(q){r.push(q.x),r.push(q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return IM(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Wl[i.type]().fromJSON(i)),new Ko(n,t.options)}}const PM={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new nt(r,o),new nt(a,c),new nt(l,h)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],p=t[i*3+2],_=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new nt(o,1-c),new nt(l,1-u),new nt(d,1-p),new nt(_,1-m)]:[new nt(a,1-c),new nt(h,1-u),new nt(f,1-p),new nt(g,1-m)]}};function IM(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ki extends _s{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ki(t.radius,t.detail)}}class Vi extends _s{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Vi(t.radius,t.detail)}}class gc extends Zt{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/i,f=new b,p=new nt;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=r+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const v=m+g,y=v,x=v+n+1,C=v+n+2,T=v+1;a.push(y,x,T),a.push(x,C,T)}}this.setIndex(a),this.setAttribute("position",new It(c,3)),this.setAttribute("normal",new It(l,3)),this.setAttribute("uv",new It(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class _c extends Zt{constructor(t=new us([new nt(0,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new It(i,3)),this.setAttribute("normal",new It(r,3)),this.setAttribute("uv",new It(o,2));function l(h){const u=i.length/3,d=h.extractPoints(e);let f=d.shape;const p=d.holes;Mi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];Mi.isClockWise(v)===!0&&(p[g]=v.reverse())}const _=Mi.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){const v=f[g];i.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){const v=_[g],y=v[0]+u,x=v[1]+u,C=v[2]+u;n.push(y,x,C),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return LM(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const o=e[t.shapes[i]];n.push(o)}return new _c(n,t.curveSegments)}}function LM(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class on extends Zt{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new b,d=new b,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],y=m/n;let x=0;m===0&&o===0?x=.5/e:m===n&&c===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const T=C/e;u.x=-t*Math.cos(i+T*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(i+T*r)*Math.sin(o+y*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(T+x,1-y),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){const y=h[m][v+1],x=h[m][v],C=h[m+1][v],T=h[m+1][v+1];(m!==0||o>0)&&f.push(y,x,T),(m!==n-1||c<Math.PI)&&f.push(x,C,T)}this.setIndex(f),this.setAttribute("position",new It(p,3)),this.setAttribute("normal",new It(_,3)),this.setAttribute("uv",new It(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new on(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class xc extends _s{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new xc(t.radius,t.detail)}}class Tn extends Zt{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new b,u=new b,d=new b;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const _=p/i*r,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const _=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,v=(i+1)*f+p;o.push(_,g,v),o.push(g,m,v)}this.setIndex(o),this.setAttribute("position",new It(a,3)),this.setAttribute("normal",new It(c,3)),this.setAttribute("uv",new It(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class vc extends Zt{constructor(t=1,e=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],c=[],l=[],h=[],u=new b,d=new b,f=new b,p=new b,_=new b,g=new b,m=new b;for(let y=0;y<=n;++y){const x=y/n*r*Math.PI*2;v(x,r,o,t,f),v(x+.01,r,o,t,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let C=0;C<=i;++C){const T=C/i*Math.PI*2,A=-e*Math.cos(T),I=e*Math.sin(T);u.x=f.x+(A*m.x+I*_.x),u.y=f.y+(A*m.y+I*_.y),u.z=f.z+(A*m.z+I*_.z),c.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),l.push(d.x,d.y,d.z),h.push(y/n),h.push(C/i)}}for(let y=1;y<=n;y++)for(let x=1;x<=i;x++){const C=(i+1)*(y-1)+(x-1),T=(i+1)*y+(x-1),A=(i+1)*y+x,I=(i+1)*(y-1)+x;a.push(C,T,I),a.push(T,A,I)}this.setIndex(a),this.setAttribute("position",new It(c,3)),this.setAttribute("normal",new It(l,3)),this.setAttribute("uv",new It(h,2));function v(y,x,C,T,A){const I=Math.cos(y),S=Math.sin(y),M=C/x*y,D=Math.cos(M);A.x=T*(2+D)*.5*I,A.y=T*(2+D)*S*.5,A.z=T*Math.sin(M)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vc(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class tr extends Zt{constructor(t=new Gr(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,c=new b,l=new nt;let h=new b;const u=[],d=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new It(u,3)),this.setAttribute("normal",new It(d,3)),this.setAttribute("uv",new It(f,2));function _(){for(let y=0;y<e;y++)g(y);g(r===!1?e:0),v(),m()}function g(y){h=t.getPointAt(y/e,h);const x=o.normals[y],C=o.binormals[y];for(let T=0;T<=i;T++){const A=T/i*Math.PI*2,I=Math.sin(A),S=-Math.cos(A);c.x=S*x.x+I*C.x,c.y=S*x.y+I*C.y,c.z=S*x.z+I*C.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function m(){for(let y=1;y<=e;y++)for(let x=1;x<=i;x++){const C=(i+1)*(y-1)+(x-1),T=(i+1)*y+(x-1),A=(i+1)*y+x,I=(i+1)*(y-1)+x;p.push(C,T,I),p.push(T,A,I)}}function v(){for(let y=0;y<=e;y++)for(let x=0;x<=i;x++)l.x=y/e,l.y=x/i,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new tr(new Wl[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class I0 extends Zt{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,i=new b,r=new b;if(t.index!==null){const o=t.attributes.position,a=t.index;let c=t.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){const u=c[l],d=u.start,f=u.count;for(let p=d,_=d+f;p<_;p+=3)for(let g=0;g<3;g++){const m=a.getX(p+g),v=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),r.fromBufferAttribute(o,v),Ef(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){const h=3*a+l,u=3*a+(l+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),Ef(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new It(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Ef(s,t,e){const n=`${s.x},${s.y},${s.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${s.x},${s.y},${s.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}var Af=Object.freeze({__proto__:null,BoxGeometry:Ai,CapsuleGeometry:pc,CircleGeometry:Wr,ConeGeometry:gs,CylinderGeometry:Fn,DodecahedronGeometry:wi,EdgesGeometry:A0,ExtrudeGeometry:Ko,IcosahedronGeometry:Ki,LatheGeometry:Jo,OctahedronGeometry:Vi,PlaneGeometry:be,PolyhedronGeometry:_s,RingGeometry:gc,ShapeGeometry:_c,SphereGeometry:on,TetrahedronGeometry:xc,TorusGeometry:Tn,TorusKnotGeometry:vc,TubeGeometry:tr,WireframeGeometry:I0});class L0 extends pn{static get type(){return"ShadowMaterial"}constructor(t){super(),this.isShadowMaterial=!0,this.color=new lt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Nu extends rn{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class we extends pn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class D0 extends we{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class U0 extends pn{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new lt(16777215),this.specular=new lt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class N0 extends pn{static get type(){return"MeshToonMaterial"}constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new lt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class F0 extends pn{static get type(){return"MeshNormalMaterial"}constructor(t){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class Or extends pn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class O0 extends pn{static get type(){return"MeshMatcapMaterial"}constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new lt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class B0 extends Cn{static get type(){return"LineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}function Vs(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function z0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function k0(s){function t(i,r){return s[i]-s[r]}const e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function qh(s,t,e){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=e[r]*t;for(let c=0;c!==t;++c)i[o++]=s[a+c]}return i}function Fu(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push.apply(e,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=s[i++];while(r!==void 0)}function DM(s,t,e,n,i=30){const r=s.clone();r.name=t;const o=[];for(let c=0;c<r.tracks.length;++c){const l=r.tracks[c],h=l.getValueSize(),u=[],d=[];for(let f=0;f<l.times.length;++f){const p=l.times[f]*i;if(!(p<e||p>=n)){u.push(l.times[f]);for(let _=0;_<h;++_)d.push(l.values[f*h+_])}}u.length!==0&&(l.times=Vs(u,l.times.constructor),l.values=Vs(d,l.values.constructor),o.push(l))}r.tracks=o;let a=1/0;for(let c=0;c<r.tracks.length;++c)a>r.tracks[c].times[0]&&(a=r.tracks[c].times[0]);for(let c=0;c<r.tracks.length;++c)r.tracks[c].shift(-1*a);return r.resetDuration(),r}function UM(s,t=0,e=s,n=30){n<=0&&(n=30);const i=e.tracks.length,r=t/n;for(let o=0;o<i;++o){const a=e.tracks[o],c=a.ValueTypeName;if(c==="bool"||c==="string")continue;const l=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===c});if(l===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=l.getValueSize();l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=a.times.length-1;let _;if(r<=a.times[0]){const m=h,v=u-h;_=a.values.slice(m,v)}else if(r>=a.times[p]){const m=p*u+h,v=m+u-h;_=a.values.slice(m,v)}else{const m=a.createInterpolant(),v=h,y=u-h;m.evaluate(r),_=m.resultBuffer.slice(v,y)}c==="quaternion"&&new dn().fromArray(_).normalize().conjugate().toArray(_);const g=l.times.length;for(let m=0;m<g;++m){const v=m*f+d;if(c==="quaternion")dn.multiplyQuaternionsFlat(l.values,v,_,0,l.values,v);else{const y=f-d*2;for(let x=0;x<y;++x)l.values[v+x]-=_[x]}}}return s.blendMode=xu,s}const NM={convertArray:Vs,isTypedArray:z0,getKeyframeOrder:k0,sortedArray:qh,flattenJSON:Fu,subclip:DM,makeClipAdditive:UM};class Qo{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=r)){const a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class V0 extends Qo{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bs,endingEnd:Bs}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,o=t+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case zs:r=t,a=2*e-n;break;case Ao:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case zs:o=t,c=2*n-e;break;case Ao:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}const l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,v=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,y=(-1-f)*g+(1.5+f)*_+.5*p,x=f*g-f*_;for(let C=0;C!==a;++C)r[C]=m*o[h+C]+v*o[l+C]+y*o[c+C]+x*o[u+C];return r}}class Ou extends Qo{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}}class H0 extends Qo{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class ui{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Vs(e,this.TimeBufferType),this.values=Vs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Vs(t.times,Array),values:Vs(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new H0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ou(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new V0(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Eo:e=this.InterpolantFactoryMethodDiscrete;break;case Vl:e=this.InterpolantFactoryMethodLinear;break;case ja:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Eo;case this.InterpolantFactoryMethodLinear:return Vl;case this.InterpolantFactoryMethodSmooth:return ja}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&z0(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ja,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(i)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const _=e[u+p];if(_!==e[d+p]||_!==e[f+p]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}ui.prototype.TimeBufferType=Float32Array;ui.prototype.ValueBufferType=Float32Array;ui.prototype.DefaultInterpolation=Vl;class er extends ui{constructor(t,e,n){super(t,e,n)}}er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=Eo;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;class Bu extends ui{}Bu.prototype.ValueTypeName="color";class Fo extends ui{}Fo.prototype.ValueTypeName="number";class G0 extends Qo{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e);let l=t*a;for(let h=l+a;l!==h;l+=4)dn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class jo extends ui{InterpolantFactoryMethodLinear(t){return new G0(this.times,this.values,this.getValueSize(),t)}}jo.prototype.ValueTypeName="quaternion";jo.prototype.InterpolantFactoryMethodSmooth=void 0;class nr extends ui{constructor(t,e,n){super(t,e,n)}}nr.prototype.ValueTypeName="string";nr.prototype.ValueBufferType=Array;nr.prototype.DefaultInterpolation=Eo;nr.prototype.InterpolantFactoryMethodLinear=void 0;nr.prototype.InterpolantFactoryMethodSmooth=void 0;class Oo extends ui{}Oo.prototype.ValueTypeName="vector";class Bo{constructor(t="",e=-1,n=[],i=nc){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Hn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(OM(n[o]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=n.length;r!==o;++r)e.push(ui.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=k0(c);c=qh(c,1,h),l=qh(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Fo(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,_){if(f.length!==0){const g=[],m=[];Fu(f,g,m,p),g.length!==0&&_.push(new u(d,g,m))}},i=[],r=t.name||"default",o=t.fps||30,a=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let v=0;v!==d[p].morphTargets.length;++v){const y=d[p];g.push(y.time),m.push(y.morphTarget===_?1:0)}i.push(new Fo(".morphTargetInfluence["+_+"]",g,m))}c=f.length*o}else{const f=".bones["+e[u].name+"]";n(Oo,f+".position",d,"pos",i),n(jo,f+".quaternion",d,"rot",i),n(Oo,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function FM(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Fo;case"vector":case"vector2":case"vector3":case"vector4":return Oo;case"color":return Bu;case"quaternion":return jo;case"bool":case"boolean":return er;case"string":return nr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function OM(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=FM(s.type);if(s.times===void 0){const e=[],n=[];Fu(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}const Hi={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class zu{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],p=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const W0=new zu;class On{constructor(t){this.manager=t!==void 0?t:W0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}On.DEFAULT_MATERIAL_NAME="__DEFAULT";const Oi={};class BM extends Error{constructor(t,e){super(t),this.response=e}}class $i extends On{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=Hi.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Oi[t]!==void 0){Oi[t].push({onLoad:e,onProgress:n,onError:i});return}Oi[t]=[],Oi[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Oi[t],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){u.read().then(({done:y,value:x})=>{if(y)m.close();else{_+=x.byteLength;const C=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let T=0,A=h.length;T<A;T++){const I=h[T];I.onProgress&&I.onProgress(C)}m.enqueue(x),v()}},y=>{m.error(y)})}}});return new Response(g)}else throw new BM(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{Hi.add(t,l);const h=Oi[t];delete Oi[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Oi[t];if(h===void 0)throw this.manager.itemError(t),l;delete Oi[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class zM extends On{constructor(t){super(t)}load(t,e,n,i){const r=this,o=new $i(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(c){i?i(c):console.error(c),r.manager.itemError(t)}},n,i)}parse(t){const e=[];for(let n=0;n<t.length;n++){const i=Bo.parse(t[n]);e.push(i)}return e}}class kM extends On{constructor(t){super(t)}load(t,e,n,i){const r=this,o=[],a=new dc,c=new $i(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(r.withCredentials);let l=0;function h(u){c.load(t[u],function(d){const f=r.parse(d,!0);o[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},l+=1,l===6&&(f.mipmapCount===1&&(a.minFilter=Ze),a.image=o,a.format=f.format,a.needsUpdate=!0,e&&e(a))},n,i)}if(Array.isArray(t))for(let u=0,d=t.length;u<d;++u)h(u);else c.load(t,function(u){const d=r.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)o[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+_]),o[p].format=d.format,o[p].width=d.width,o[p].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=Ze),a.format=d.format,a.needsUpdate=!0,e&&e(a)},n,i);return a}}class zo extends On{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Hi.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=Io("img");function c(){h(),Hi.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class VM extends On{constructor(t){super(t)}load(t,e,n,i){const r=new Wo;r.colorSpace=Ke;const o=new zo(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function c(l){o.load(t[l],function(h){r.images[l]=h,a++,a===6&&(r.needsUpdate=!0,e&&e(r))},void 0,i)}for(let l=0;l<t.length;++l)c(l);return r}}class HM extends On{constructor(t){super(t)}load(t,e,n,i){const r=this,o=new yi,a=new $i(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,function(c){let l;try{l=r.parse(c)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:Mn,o.wrapT=l.wrapT!==void 0?l.wrapT:Mn,o.magFilter=l.magFilter!==void 0?l.magFilter:Ze,o.minFilter=l.minFilter!==void 0?l.minFilter:Ze,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=si),l.mipmapCount===1&&(o.minFilter=Ze),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,e&&e(o,l)},n,i),o}}class X0 extends On{constructor(t){super(t)}load(t,e,n,i){const r=new ke,o=new zo(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class xs extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ku extends xs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const xh=new Wt,Cf=new b,Rf=new b;class Vu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new Wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xo,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Cf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Cf),Rf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rf),e.updateMatrixWorld(),xh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class GM extends Vu{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Dr*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class q0 extends xs{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new GM}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Pf=new Wt,oo=new b,vh=new b;class WM extends Vu{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new nt(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),oo.setFromMatrixPosition(t.matrixWorld),n.position.copy(oo),vh.copy(n.position),vh.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(vh),n.updateMatrixWorld(),i.makeTranslation(-oo.x,-oo.y,-oo.z),Pf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pf)}}class Xr extends xs{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new WM}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class XM extends Vu{constructor(){super(new qo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hu extends xs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new XM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Y0 extends xs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Z0 extends xs{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}class $0{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new b)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const n=t.x,i=t.y,r=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.282095),e.addScaledVector(o[1],.488603*i),e.addScaledVector(o[2],.488603*r),e.addScaledVector(o[3],.488603*n),e.addScaledVector(o[4],1.092548*(n*i)),e.addScaledVector(o[5],1.092548*(i*r)),e.addScaledVector(o[6],.315392*(3*r*r-1)),e.addScaledVector(o[7],1.092548*(n*r)),e.addScaledVector(o[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,r=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.886227),e.addScaledVector(o[1],2*.511664*i),e.addScaledVector(o[2],2*.511664*r),e.addScaledVector(o[3],2*.511664*n),e.addScaledVector(o[4],2*.429043*n*i),e.addScaledVector(o[5],2*.429043*i*r),e.addScaledVector(o[6],.743125*r*r-.247708),e.addScaledVector(o[7],2*.429043*n*r),e.addScaledVector(o[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){const n=t.x,i=t.y,r=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*r,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*r,e[6]=.315392*(3*r*r-1),e[7]=1.092548*n*r,e[8]=.546274*(n*n-i*i)}}class J0 extends xs{constructor(t=new $0,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}class yc extends On{constructor(t){super(t),this.textures={}}load(t,e,n,i){const r=this,o=new $i(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(c){i?i(c):console.error(c),r.manager.itemError(t)}},n,i)}parse(t){const e=this.textures;function n(r){return e[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),e[r]}const i=this.createMaterialFromType(t.type);if(t.uuid!==void 0&&(i.uuid=t.uuid),t.name!==void 0&&(i.name=t.name),t.color!==void 0&&i.color!==void 0&&i.color.setHex(t.color),t.roughness!==void 0&&(i.roughness=t.roughness),t.metalness!==void 0&&(i.metalness=t.metalness),t.sheen!==void 0&&(i.sheen=t.sheen),t.sheenColor!==void 0&&(i.sheenColor=new lt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(i.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(t.emissive),t.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(t.specular),t.specularIntensity!==void 0&&(i.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(i.shininess=t.shininess),t.clearcoat!==void 0&&(i.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(i.dispersion=t.dispersion),t.iridescence!==void 0&&(i.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(i.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(i.transmission=t.transmission),t.thickness!==void 0&&(i.thickness=t.thickness),t.attenuationDistance!==void 0&&(i.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(i.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(i.fog=t.fog),t.flatShading!==void 0&&(i.flatShading=t.flatShading),t.blending!==void 0&&(i.blending=t.blending),t.combine!==void 0&&(i.combine=t.combine),t.side!==void 0&&(i.side=t.side),t.shadowSide!==void 0&&(i.shadowSide=t.shadowSide),t.opacity!==void 0&&(i.opacity=t.opacity),t.transparent!==void 0&&(i.transparent=t.transparent),t.alphaTest!==void 0&&(i.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(i.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(i.depthFunc=t.depthFunc),t.depthTest!==void 0&&(i.depthTest=t.depthTest),t.depthWrite!==void 0&&(i.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(i.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(i.blendSrc=t.blendSrc),t.blendDst!==void 0&&(i.blendDst=t.blendDst),t.blendEquation!==void 0&&(i.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(i.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(i.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(i.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(i.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(i.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(i.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(i.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(i.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(i.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(i.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(i.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(i.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(i.rotation=t.rotation),t.linewidth!==void 0&&(i.linewidth=t.linewidth),t.dashSize!==void 0&&(i.dashSize=t.dashSize),t.gapSize!==void 0&&(i.gapSize=t.gapSize),t.scale!==void 0&&(i.scale=t.scale),t.polygonOffset!==void 0&&(i.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(i.dithering=t.dithering),t.alphaToCoverage!==void 0&&(i.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(i.forceSinglePass=t.forceSinglePass),t.visible!==void 0&&(i.visible=t.visible),t.toneMapped!==void 0&&(i.toneMapped=t.toneMapped),t.userData!==void 0&&(i.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?i.vertexColors=t.vertexColors>0:i.vertexColors=t.vertexColors),t.uniforms!==void 0)for(const r in t.uniforms){const o=t.uniforms[r];switch(i.uniforms[r]={},o.type){case"t":i.uniforms[r].value=n(o.value);break;case"c":i.uniforms[r].value=new lt().setHex(o.value);break;case"v2":i.uniforms[r].value=new nt().fromArray(o.value);break;case"v3":i.uniforms[r].value=new b().fromArray(o.value);break;case"v4":i.uniforms[r].value=new fe().fromArray(o.value);break;case"m3":i.uniforms[r].value=new Kt().fromArray(o.value);break;case"m4":i.uniforms[r].value=new Wt().fromArray(o.value);break;default:i.uniforms[r].value=o.value}}if(t.defines!==void 0&&(i.defines=t.defines),t.vertexShader!==void 0&&(i.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(i.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(i.glslVersion=t.glslVersion),t.extensions!==void 0)for(const r in t.extensions)i.extensions[r]=t.extensions[r];if(t.lights!==void 0&&(i.lights=t.lights),t.clipping!==void 0&&(i.clipping=t.clipping),t.size!==void 0&&(i.size=t.size),t.sizeAttenuation!==void 0&&(i.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(i.map=n(t.map)),t.matcap!==void 0&&(i.matcap=n(t.matcap)),t.alphaMap!==void 0&&(i.alphaMap=n(t.alphaMap)),t.bumpMap!==void 0&&(i.bumpMap=n(t.bumpMap)),t.bumpScale!==void 0&&(i.bumpScale=t.bumpScale),t.normalMap!==void 0&&(i.normalMap=n(t.normalMap)),t.normalMapType!==void 0&&(i.normalMapType=t.normalMapType),t.normalScale!==void 0){let r=t.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new nt().fromArray(r)}return t.displacementMap!==void 0&&(i.displacementMap=n(t.displacementMap)),t.displacementScale!==void 0&&(i.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(i.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(i.roughnessMap=n(t.roughnessMap)),t.metalnessMap!==void 0&&(i.metalnessMap=n(t.metalnessMap)),t.emissiveMap!==void 0&&(i.emissiveMap=n(t.emissiveMap)),t.emissiveIntensity!==void 0&&(i.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(i.specularMap=n(t.specularMap)),t.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(t.specularIntensityMap)),t.specularColorMap!==void 0&&(i.specularColorMap=n(t.specularColorMap)),t.envMap!==void 0&&(i.envMap=n(t.envMap)),t.envMapRotation!==void 0&&i.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(i.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(i.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(i.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(i.lightMap=n(t.lightMap)),t.lightMapIntensity!==void 0&&(i.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(i.aoMap=n(t.aoMap)),t.aoMapIntensity!==void 0&&(i.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(i.gradientMap=n(t.gradientMap)),t.clearcoatMap!==void 0&&(i.clearcoatMap=n(t.clearcoatMap)),t.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(t.clearcoatRoughnessMap)),t.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(t.clearcoatNormalMap)),t.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new nt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(i.iridescenceMap=n(t.iridescenceMap)),t.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(t.iridescenceThicknessMap)),t.transmissionMap!==void 0&&(i.transmissionMap=n(t.transmissionMap)),t.thicknessMap!==void 0&&(i.thicknessMap=n(t.thicknessMap)),t.anisotropyMap!==void 0&&(i.anisotropyMap=n(t.anisotropyMap)),t.sheenColorMap!==void 0&&(i.sheenColorMap=n(t.sheenColorMap)),t.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(t.sheenRoughnessMap)),i}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return yc.createMaterialFromType(t)}static createMaterialFromType(t){const e={ShadowMaterial:L0,SpriteMaterial:Cu,RawShaderMaterial:Nu,ShaderMaterial:rn,PointsMaterial:Zo,MeshPhysicalMaterial:D0,MeshStandardMaterial:we,MeshPhongMaterial:U0,MeshToonMaterial:N0,MeshNormalMaterial:F0,MeshLambertMaterial:Or,MeshDepthMaterial:Eu,MeshDistanceMaterial:Au,MeshBasicMaterial:An,MeshMatcapMaterial:O0,LineDashedMaterial:B0,LineBasicMaterial:Cn,Material:pn};return new e[t]}}class Yh{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class K0 extends Zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Q0 extends On{constructor(t){super(t)}load(t,e,n,i){const r=this,o=new $i(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(c){i?i(c):console.error(c),r.manager.itemError(t)}},n,i)}parse(t){const e={},n={};function i(f,p){if(e[p]!==void 0)return e[p];const g=f.interleavedBuffers[p],m=r(f,g.buffer),v=Er(g.type,m),y=new cc(v,g.stride);return y.uuid=g.uuid,e[p]=y,y}function r(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const o=t.isInstancedBufferGeometry?new K0:new Zt,a=t.data.index;if(a!==void 0){const f=Er(a.type,a.array);o.setIndex(new Me(f,1))}const c=t.data.attributes;for(const f in c){const p=c[f];let _;if(p.isInterleavedBufferAttribute){const g=i(t.data,p.data);_=new Js(g,p.itemSize,p.offset,p.normalized)}else{const g=Er(p.type,p.array),m=p.isInstancedBufferAttribute?Fr:Me;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),o.setAttribute(f,_)}const l=t.data.morphAttributes;if(l)for(const f in l){const p=l[f],_=[];for(let g=0,m=p.length;g<m;g++){const v=p[g];let y;if(v.isInterleavedBufferAttribute){const x=i(t.data,v.data);y=new Js(x,v.itemSize,v.offset,v.normalized)}else{const x=Er(v.type,v.array);y=new Me(x,v.itemSize,v.normalized)}v.name!==void 0&&(y.name=v.name),_.push(y)}o.morphAttributes[f]=_}t.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const u=t.data.groups||t.data.drawcalls||t.data.offsets;if(u!==void 0)for(let f=0,p=u.length;f!==p;++f){const _=u[f];o.addGroup(_.start,_.count,_.materialIndex)}const d=t.data.boundingSphere;if(d!==void 0){const f=new b;d.center!==void 0&&f.fromArray(d.center),o.boundingSphere=new fn(f,d.radius)}return t.name&&(o.name=t.name),t.userData&&(o.userData=t.userData),o}}class qM extends On{constructor(t){super(t)}load(t,e,n,i){const r=this,o=this.path===""?Yh.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||o;const a=new $i(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(c){let l=null;try{l=JSON.parse(c)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+t+".",u.message);return}const h=l.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+t)),console.error("THREE.ObjectLoader: Can't load "+t);return}r.parse(l,e)},n,i)}async loadAsync(t,e){const n=this,i=this.path===""?Yh.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;const r=new $i(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);const o=await r.loadAsync(t,e),a=JSON.parse(o),c=a.metadata;if(c===void 0||c.type===void 0||c.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(a)}parse(t,e){const n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),r=this.parseGeometries(t.geometries,i),o=this.parseImages(t.images,function(){e!==void 0&&e(l)}),a=this.parseTextures(t.textures,o),c=this.parseMaterials(t.materials,a),l=this.parseObject(t.object,r,c,a,n),h=this.parseSkeletons(t.skeletons,l);if(this.bindSkeletons(l,h),this.bindLightTargets(l),e!==void 0){let u=!1;for(const d in o)if(o[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&e(l)}return l}async parseAsync(t){const e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),r=await this.parseImagesAsync(t.images),o=this.parseTextures(t.textures,r),a=this.parseMaterials(t.materials,o),c=this.parseObject(t.object,i,a,o,e),l=this.parseSkeletons(t.skeletons,c);return this.bindSkeletons(c,l),this.bindLightTargets(c),c}parseShapes(t){const e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){const r=new us().fromJSON(t[n]);e[r.uuid]=r}return e}parseSkeletons(t,e){const n={},i={};if(e.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),t!==void 0)for(let r=0,o=t.length;r<o;r++){const a=new hc().fromJSON(t[r],i);n[a.uuid]=a}return n}parseGeometries(t,e){const n={};if(t!==void 0){const i=new Q0;for(let r=0,o=t.length;r<o;r++){let a;const c=t[r];switch(c.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(c);break;default:c.type in Af?a=Af[c.type].fromJSON(c,e):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${c.type}"`)}a.uuid=c.uuid,c.name!==void 0&&(a.name=c.name),c.userData!==void 0&&(a.userData=c.userData),n[c.uuid]=a}}return n}parseMaterials(t,e){const n={},i={};if(t!==void 0){const r=new yc;r.setTextures(e);for(let o=0,a=t.length;o<a;o++){const c=t[o];n[c.uuid]===void 0&&(n[c.uuid]=r.parse(c)),i[c.uuid]=n[c.uuid]}}return i}parseAnimations(t){const e={};if(t!==void 0)for(let n=0;n<t.length;n++){const i=t[n],r=Bo.parse(i);e[r.uuid]=r}return e}parseImages(t,e){const n=this,i={};let r;function o(c){return n.manager.itemStart(c),r.load(c,function(){n.manager.itemEnd(c)},void 0,function(){n.manager.itemError(c),n.manager.itemEnd(c)})}function a(c){if(typeof c=="string"){const l=c,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(l)?l:n.resourcePath+l;return o(h)}else return c.data?{data:Er(c.type,c.data),width:c.width,height:c.height}:null}if(t!==void 0&&t.length>0){const c=new zu(e);r=new zo(c),r.setCrossOrigin(this.crossOrigin);for(let l=0,h=t.length;l<h;l++){const u=t[l],d=u.url;if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new yi(m.data,m.width,m.height)))}i[u.uuid]=new ks(f)}else{const f=a(u.url);i[u.uuid]=new ks(f)}}}return i}async parseImagesAsync(t){const e=this,n={};let i;async function r(o){if(typeof o=="string"){const a=o,c=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:e.resourcePath+a;return await i.loadAsync(c)}else return o.data?{data:Er(o.type,o.data),width:o.width,height:o.height}:null}if(t!==void 0&&t.length>0){i=new zo(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=t.length;o<a;o++){const c=t[o],l=c.url;if(Array.isArray(l)){const h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new yi(p.data,p.width,p.height)))}n[c.uuid]=new ks(h)}else{const h=await r(c.url);n[c.uuid]=new ks(h)}}}return n}parseTextures(t,e){function n(r,o){return typeof r=="number"?r:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}const i={};if(t!==void 0)for(let r=0,o=t.length;r<o;r++){const a=t[r];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),e[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const c=e[a.image],l=c.data;let h;Array.isArray(l)?(h=new Wo,l.length===6&&(h.needsUpdate=!0)):(l&&l.data?h=new yi:h=new ke,l&&(h.needsUpdate=!0)),h.source=c,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,YM)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],If),h.wrapT=n(a.wrap[1],If)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,Lf)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,Lf)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(t,e,n,i,r){let o;function a(d){return e[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),e[d]}function c(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function l(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(t.type){case"Scene":o=new lc,t.background!==void 0&&(Number.isInteger(t.background)?o.background=new lt(t.background):o.background=l(t.background)),t.environment!==void 0&&(o.environment=l(t.environment)),t.fog!==void 0&&(t.fog.type==="Fog"?o.fog=new ac(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(o.fog=new Yo(t.fog.color,t.fog.density)),t.fog.name!==""&&(o.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&(o.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(o.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&o.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":o=new sn(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(o.focus=t.focus),t.zoom!==void 0&&(o.zoom=t.zoom),t.filmGauge!==void 0&&(o.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(o.filmOffset=t.filmOffset),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"OrthographicCamera":o=new qo(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(o.zoom=t.zoom),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"AmbientLight":o=new Y0(t.color,t.intensity);break;case"DirectionalLight":o=new Hu(t.color,t.intensity),o.target=t.target||"";break;case"PointLight":o=new Xr(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":o=new Z0(t.color,t.intensity,t.width,t.height);break;case"SpotLight":o=new q0(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),o.target=t.target||"";break;case"HemisphereLight":o=new ku(t.color,t.groundColor,t.intensity);break;case"LightProbe":o=new J0().fromJSON(t);break;case"SkinnedMesh":h=a(t.geometry),u=c(t.material),o=new v0(h,u),t.bindMode!==void 0&&(o.bindMode=t.bindMode),t.bindMatrix!==void 0&&o.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(o.skeleton=t.skeleton);break;case"Mesh":h=a(t.geometry),u=c(t.material),o=new K(h,u);break;case"InstancedMesh":h=a(t.geometry),u=c(t.material);const d=t.count,f=t.instanceMatrix,p=t.instanceColor;o=new hs(h,u,d),o.instanceMatrix=new Fr(new Float32Array(f.array),16),p!==void 0&&(o.instanceColor=new Fr(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":h=a(t.geometry),u=c(t.material),o=new y0(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,u),o.geometry=h,o.perObjectFrustumCulled=t.perObjectFrustumCulled,o.sortObjects=t.sortObjects,o._drawRanges=t.drawRanges,o._reservedRanges=t.reservedRanges,o._visibility=t.visibility,o._active=t.active,o._bounds=t.bounds.map(_=>{const g=new wn;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);const m=new fn;return m.radius=_.sphereRadius,m.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:m}}),o._maxInstanceCount=t.maxInstanceCount,o._maxVertexCount=t.maxVertexCount,o._maxIndexCount=t.maxIndexCount,o._geometryInitialized=t.geometryInitialized,o._geometryCount=t.geometryCount,o._matricesTexture=l(t.matricesTexture.uuid),t.colorsTexture!==void 0&&(o._colorsTexture=l(t.colorsTexture.uuid));break;case"LOD":o=new x0;break;case"Line":o=new ps(a(t.geometry),c(t.material));break;case"LineLoop":o=new M0(a(t.geometry),c(t.material));break;case"LineSegments":o=new Ci(a(t.geometry),c(t.material));break;case"PointCloud":case"Points":o=new uc(a(t.geometry),c(t.material));break;case"Sprite":o=new _0(c(t.material));break;case"Group":o=new At;break;case"Bone":o=new Ru;break;default:o=new pe}if(o.uuid=t.uuid,t.name!==void 0&&(o.name=t.name),t.matrix!==void 0?(o.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=t.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(t.position!==void 0&&o.position.fromArray(t.position),t.rotation!==void 0&&o.rotation.fromArray(t.rotation),t.quaternion!==void 0&&o.quaternion.fromArray(t.quaternion),t.scale!==void 0&&o.scale.fromArray(t.scale)),t.up!==void 0&&o.up.fromArray(t.up),t.castShadow!==void 0&&(o.castShadow=t.castShadow),t.receiveShadow!==void 0&&(o.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(o.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(o.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(o.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(o.shadow.radius=t.shadow.radius),t.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(o.visible=t.visible),t.frustumCulled!==void 0&&(o.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(o.renderOrder=t.renderOrder),t.userData!==void 0&&(o.userData=t.userData),t.layers!==void 0&&(o.layers.mask=t.layers),t.children!==void 0){const d=t.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],e,n,i,r))}if(t.animations!==void 0){const d=t.animations;for(let f=0;f<d.length;f++){const p=d[f];o.animations.push(r[p])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(o.autoUpdate=t.autoUpdate);const d=t.levels;for(let f=0;f<d.length;f++){const p=d[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=e[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){const n=e.target,i=t.getObjectByProperty("uuid",n);i!==void 0?e.target=i:e.target=new pe}})}}const YM={UVMapping:$l,CubeReflectionMapping:Yi,CubeRefractionMapping:fs,EquirectangularReflectionMapping:bo,EquirectangularRefractionMapping:wo,CubeUVReflectionMapping:kr},If={RepeatWrapping:Ys,ClampToEdgeWrapping:Mn,MirroredRepeatWrapping:To},Lf={NearestFilter:Fe,NearestMipmapNearestFilter:lu,NearestMipmapLinearFilter:Tr,LinearFilter:Ze,LinearMipmapNearestFilter:fo,LinearMipmapLinearFilter:si};class ZM extends On{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Hi.get(t);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{e&&e(l),r.manager.itemEnd(t)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Hi.add(t,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){i&&i(l),Hi.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});Hi.add(t,c),r.manager.itemStart(t)}}let Ga;class Gu{static getContext(){return Ga===void 0&&(Ga=new(window.AudioContext||window.webkitAudioContext)),Ga}static setContext(t){Ga=t}}class $M extends On{constructor(t){super(t)}load(t,e,n,i){const r=this,o=new $i(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(c){try{const l=c.slice(0);Gu.getContext().decodeAudioData(l,function(u){e(u)}).catch(a)}catch(l){a(l)}},n,i);function a(c){i?i(c):console.error(c),r.manager.itemError(t)}}}const Df=new Wt,Uf=new Wt,Rs=new Wt;class JM{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new sn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new sn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,Rs.copy(t.projectionMatrix);const i=e.eyeSep/2,r=i*e.near/e.focus,o=e.near*Math.tan(Ws*e.fov*.5)/e.zoom;let a,c;Uf.elements[12]=-i,Df.elements[12]=i,a=-o*e.aspect+r,c=o*e.aspect+r,Rs.elements[0]=2*e.near/(c-a),Rs.elements[8]=(c+a)/(c-a),this.cameraL.projectionMatrix.copy(Rs),a=-o*e.aspect-r,c=o*e.aspect-r,Rs.elements[0]=2*e.near/(c-a),Rs.elements[8]=(c+a)/(c-a),this.cameraR.projectionMatrix.copy(Rs)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(Uf),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(Df)}}class Mc{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Nf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Nf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Nf(){return performance.now()}const Ps=new b,Ff=new dn,KM=new b,Is=new b;class QM extends pe{constructor(){super(),this.type="AudioListener",this.context=Gu.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Mc}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Ps,Ff,KM),Is.set(0,0,-1).applyQuaternion(Ff),e.positionX){const i=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Ps.x,i),e.positionY.linearRampToValueAtTime(Ps.y,i),e.positionZ.linearRampToValueAtTime(Ps.z,i),e.forwardX.linearRampToValueAtTime(Is.x,i),e.forwardY.linearRampToValueAtTime(Is.y,i),e.forwardZ.linearRampToValueAtTime(Is.z,i),e.upX.linearRampToValueAtTime(n.x,i),e.upY.linearRampToValueAtTime(n.y,i),e.upZ.linearRampToValueAtTime(n.z,i)}else e.setPosition(Ps.x,Ps.y,Ps.z),e.setOrientation(Is.x,Is.y,Is.z,n.x,n.y,n.z)}}class j0 extends pe{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}}const Ls=new b,Of=new dn,jM=new b,Ds=new b;class tS extends j0{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ls,Of,jM),Ds.set(0,0,1).applyQuaternion(Of);const e=this.panner;if(e.positionX){const n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(Ls.x,n),e.positionY.linearRampToValueAtTime(Ls.y,n),e.positionZ.linearRampToValueAtTime(Ls.z,n),e.orientationX.linearRampToValueAtTime(Ds.x,n),e.orientationY.linearRampToValueAtTime(Ds.y,n),e.orientationZ.linearRampToValueAtTime(Ds.z,n)}else e.setPosition(Ls.x,Ls.y,Ls.z),e.setOrientation(Ds.x,Ds.y,Ds.z)}}class eS{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}}class tm{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,o;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,r=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=e*this._origIndex;this._mixBufferRegion(n,i,c,1-r,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,o=i;r!==o;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){dn.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){const o=this._workIndex*r;dn.multiplyQuaternionsFlat(t,o,t,e,t,n),dn.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const c=e+a;t[c]=t[c]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,r){for(let o=0;o!==r;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const Wu="\\[\\]\\.:\\/",nS=new RegExp("["+Wu+"]","g"),Xu="[^"+Wu+"]",iS="[^"+Wu.replace("\\.","")+"]",sS=/((?:WC+[\/:])*)/.source.replace("WC",Xu),rS=/(WCOD+)?/.source.replace("WCOD",iS),oS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xu),aS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xu),lS=new RegExp("^"+sS+rS+oS+aS+"$"),cS=["material","materials","bones","map"];class hS{constructor(t,e,n){const i=n||de.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class de{constructor(t,e,n){this.path=e,this.parsedPath=n||de.parseTrackName(e),this.node=de.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new de.Composite(t,e,n):new de(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(nS,"")}static parseTrackName(t){const e=lS.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);cS.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=de.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[i];if(o===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}de.Composite=hS;de.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};de.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};de.prototype.GetterByBindingType=[de.prototype._getValue_direct,de.prototype._getValue_array,de.prototype._getValue_arrayElement,de.prototype._getValue_toArray];de.prototype.SetterByBindingTypeAndVersioning=[[de.prototype._setValue_direct,de.prototype._setValue_direct_setNeedsUpdate,de.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[de.prototype._setValue_array,de.prototype._setValue_array_setNeedsUpdate,de.prototype._setValue_array_setMatrixWorldNeedsUpdate],[de.prototype._setValue_arrayElement,de.prototype._setValue_arrayElement_setNeedsUpdate,de.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[de.prototype._setValue_fromArray,de.prototype._setValue_fromArray_setNeedsUpdate,de.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class uS{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Hn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){const t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length;let a,c=t.length,l=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let p=e[f];if(p===void 0){p=c++,e[f]=p,t.push(d);for(let _=0,g=o;_!==g;++_)r[_].push(new de(d,n[_],i[_]))}else if(p<l){a=t[p];const _=--l,g=t[_];e[g.uuid]=p,t[p]=g,e[f]=_,t[_]=d;for(let m=0,v=o;m!==v;++m){const y=r[m],x=y[_];let C=y[p];y[p]=x,C===void 0&&(C=new de(d,n[m],i[m])),y[_]=C}}else t[p]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=l}remove(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const c=arguments[o],l=c.uuid,h=e[l];if(h!==void 0&&h>=r){const u=r++,d=t[u];e[d.uuid]=h,t[h]=d,e[l]=u,t[u]=c;for(let f=0,p=i;f!==p;++f){const _=n[f],g=_[u],m=_[h];_[h]=g,_[u]=m}}}this.nCachedObjects_=r}uncache(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,o=t.length;for(let a=0,c=arguments.length;a!==c;++a){const l=arguments[a],h=l.uuid,u=e[h];if(u!==void 0)if(delete e[h],u<r){const d=--r,f=t[d],p=--o,_=t[p];e[f.uuid]=u,t[u]=f,e[_.uuid]=d,t[d]=_,t.pop();for(let g=0,m=i;g!==m;++g){const v=n[g],y=v[d],x=v[p];v[u]=y,v[d]=x,v.pop()}}else{const d=--o,f=t[d];d>0&&(e[f.uuid]=u),t[u]=f,t.pop();for(let p=0,_=i;p!==_;++p){const g=n[p];g[u]=g[d],g.pop()}}}this.nCachedObjects_=r}subscribe_(t,e){const n=this._bindingsIndicesByPath;let i=n[t];const r=this._bindings;if(i!==void 0)return r[i];const o=this._paths,a=this._parsedPaths,c=this._objects,l=c.length,h=this.nCachedObjects_,u=new Array(l);i=r.length,n[t]=i,o.push(t),a.push(e),r.push(u);for(let d=h,f=c.length;d!==f;++d){const p=c[d];u[d]=new de(p,t,e)}return u}unsubscribe_(t){const e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){const i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,c=o[a],l=t[a];e[l]=n,o[n]=c,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}}class em{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const r=e.tracks,o=r.length,a=new Array(o),c={endingStart:Bs,endingEnd:Bs};for(let l=0;l!==o;++l){const h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Hp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,r=t._clip.duration,o=r/i,a=i/r;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=t/o,l[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const c=(t-r)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case xu:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case nc:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,r=this._loopCount;const o=n===Gp;if(t===0)return r===-1?i:o&&(r&1)===1?e-i:i;if(n===Vp){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,r+=Math.abs(a);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=zs,i.endingEnd=zs):(t?i.endingStart=this.zeroSlopeAtStart?zs:Bs:i.endingStart=Ao,e?i.endingEnd=this.zeroSlopeAtEnd?zs:Bs:i.endingEnd=Ao)}_scheduleFading(t,e,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=e,a[1]=r+t,c[1]=n,this}}const dS=new Float32Array(1);class fS extends Ei{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,o=t._propertyBindings,a=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,o[u]=p;else{if(p=o[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,c,f));continue}const _=e&&e._propertyBindings[u].binding.parsedPath;p=new tm(de.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,c,f),o[u]=p}a[u].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,r=this._actionsByClip;let o=r[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=t._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Ou(new Float32Array(2),new Float32Array(2),1,dS),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const i=e||this._root,r=i.uuid;let o=typeof t=="string"?Bo.findByName(i,t):t;const a=o!==null?o.uuid:t,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=nc),c!==void 0){const u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const h=new em(this,o,e,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(t,e){const n=e||this._root,i=n.uuid,r=typeof t=="string"?Bo.findByName(n,t):t,o=r?r.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),o=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(i,t,r,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const h=l._cacheIndex,u=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class qu{constructor(t){this.value=t}clone(){return new qu(this.value.clone===void 0?this.value:this.value.clone())}}let pS=0;class mS extends Ei{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:pS++}),this.name="",this.usage=Co,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){const e=this.uniforms.indexOf(t);return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(t){this.name=t.name,this.usage=t.usage;const e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){const r=Array.isArray(e[n])?e[n]:[e[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class gS extends cc{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}class _S{constructor(t,e,n,i,r){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}const Bf=new Wt;class xS{constructor(t,e,n=0,i=1/0){this.ray=new Vr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new sc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Bf.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bf),this}intersectObject(t,e=!0,n=[]){return Zh(t,this,n,e),n.sort(zf),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Zh(t[i],this,n,e);return n.sort(zf),n}}function zf(s,t){return s.distance-t.distance}function Zh(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Zh(r[o],t,e,!0)}}class vS{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ze(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class yS{constructor(t=1,e=0,n=0){return this.radius=t,this.theta=e,this.y=n,this}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}}class Yu{constructor(t,e,n,i){Yu.prototype.isMatrix2=!0,this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}}const kf=new nt;class MS{constructor(t=new nt(1/0,1/0),e=new nt(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=kf.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kf).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Vf=new b,Wa=new b;class SS{constructor(t=new b,e=new b){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Vf.subVectors(t,this.start),Wa.subVectors(this.end,this.start);const n=Wa.dot(Wa);let r=Wa.dot(Vf)/n;return e&&(r=ze(r,0,1)),r}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Hf=new b;class bS extends pe{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";const n=new Zt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,c=32;o<c;o++,a++){const l=o/c*Math.PI*2,h=a/c*Math.PI*2;i.push(Math.cos(l),Math.sin(l),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new It(i,3));const r=new Cn({fog:!1,toneMapped:!1});this.cone=new Ci(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),Hf.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Hf),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const os=new b,Xa=new Wt,yh=new Wt;class wS extends Ci{constructor(t){const e=nm(t),n=new Zt,i=[],r=[],o=new lt(0,0,1),a=new lt(0,1,0);for(let l=0;l<e.length;l++){const h=e[l];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new It(i,3)),n.setAttribute("color",new It(r,3));const c=new Cn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,c),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position");yh.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<e.length;r++){const a=e[r];a.parent&&a.parent.isBone&&(Xa.multiplyMatrices(yh,a.matrixWorld),os.setFromMatrixPosition(Xa),i.setXYZ(o,os.x,os.y,os.z),Xa.multiplyMatrices(yh,a.parent.matrixWorld),os.setFromMatrixPosition(Xa),i.setXYZ(o+1,os.x,os.y,os.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}function nm(s){const t=[];s.isBone===!0&&t.push(s);for(let e=0;e<s.children.length;e++)t.push.apply(t,nm(s.children[e]));return t}class TS extends K{constructor(t,e,n){const i=new on(e,4,2),r=new An({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const ES=new b,Gf=new lt,Wf=new lt;class AS extends pe{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Vi(e);i.rotateY(Math.PI*.5),this.material=new An({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Me(o,3)),this.add(new K(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const e=t.geometry.getAttribute("color");Gf.copy(this.light.color),Wf.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){const r=n<i/2?Gf:Wf;e.setXYZ(n,r.r,r.g,r.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(ES.setFromMatrixPosition(this.light.matrixWorld).negate())}}class CS extends Ci{constructor(t=10,e=10,n=4473924,i=8947848){n=new lt(n),i=new lt(i);const r=e/2,o=t/e,a=t/2,c=[],l=[];for(let d=0,f=0,p=-a;d<=e;d++,p+=o){c.push(-a,0,p,a,0,p),c.push(p,0,-a,p,0,a);const _=d===r?n:i;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}const h=new Zt;h.setAttribute("position",new It(c,3)),h.setAttribute("color",new It(l,3));const u=new Cn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class RS extends Ci{constructor(t=10,e=16,n=8,i=64,r=4473924,o=8947848){r=new lt(r),o=new lt(o);const a=[],c=[];if(e>1)for(let u=0;u<e;u++){const d=u/e*(Math.PI*2),f=Math.sin(d)*t,p=Math.cos(d)*t;a.push(0,0,0),a.push(f,0,p);const _=u&1?r:o;c.push(_.r,_.g,_.b),c.push(_.r,_.g,_.b)}for(let u=0;u<n;u++){const d=u&1?r:o,f=t-t/n*u;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),c.push(d.r,d.g,d.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),c.push(d.r,d.g,d.b)}}const l=new Zt;l.setAttribute("position",new It(a,3)),l.setAttribute("color",new It(c,3));const h=new Cn({vertexColors:!0,toneMapped:!1});super(l,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Xf=new b,qa=new b,qf=new b;class PS extends pe{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let i=new Zt;i.setAttribute("position",new It([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));const r=new Cn({fog:!1,toneMapped:!1});this.lightPlane=new ps(i,r),this.add(this.lightPlane),i=new Zt,i.setAttribute("position",new It([0,0,0,0,0,1],3)),this.targetLine=new ps(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Xf.setFromMatrixPosition(this.light.matrixWorld),qa.setFromMatrixPosition(this.light.target.matrixWorld),qf.subVectors(qa,Xf),this.lightPlane.lookAt(qa),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(qa),this.targetLine.scale.z=qf.length()}}const Ya=new b,Be=new rc;class IS extends Ci{constructor(t){const e=new Zt,n=new Cn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){c(p),c(_)}function c(p){i.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}e.setAttribute("position",new It(i,3)),e.setAttribute("color",new It(r,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const l=new lt(16755200),h=new lt(16711680),u=new lt(43775),d=new lt(16777215),f=new lt(3355443);this.setColors(l,h,u,d,f)}setColors(t,e,n,i,r){const a=this.geometry.getAttribute("color");a.setXYZ(0,t.r,t.g,t.b),a.setXYZ(1,t.r,t.g,t.b),a.setXYZ(2,t.r,t.g,t.b),a.setXYZ(3,t.r,t.g,t.b),a.setXYZ(4,t.r,t.g,t.b),a.setXYZ(5,t.r,t.g,t.b),a.setXYZ(6,t.r,t.g,t.b),a.setXYZ(7,t.r,t.g,t.b),a.setXYZ(8,t.r,t.g,t.b),a.setXYZ(9,t.r,t.g,t.b),a.setXYZ(10,t.r,t.g,t.b),a.setXYZ(11,t.r,t.g,t.b),a.setXYZ(12,t.r,t.g,t.b),a.setXYZ(13,t.r,t.g,t.b),a.setXYZ(14,t.r,t.g,t.b),a.setXYZ(15,t.r,t.g,t.b),a.setXYZ(16,t.r,t.g,t.b),a.setXYZ(17,t.r,t.g,t.b),a.setXYZ(18,t.r,t.g,t.b),a.setXYZ(19,t.r,t.g,t.b),a.setXYZ(20,t.r,t.g,t.b),a.setXYZ(21,t.r,t.g,t.b),a.setXYZ(22,t.r,t.g,t.b),a.setXYZ(23,t.r,t.g,t.b),a.setXYZ(24,e.r,e.g,e.b),a.setXYZ(25,e.r,e.g,e.b),a.setXYZ(26,e.r,e.g,e.b),a.setXYZ(27,e.r,e.g,e.b),a.setXYZ(28,e.r,e.g,e.b),a.setXYZ(29,e.r,e.g,e.b),a.setXYZ(30,e.r,e.g,e.b),a.setXYZ(31,e.r,e.g,e.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0}update(){const t=this.geometry,e=this.pointMap,n=1,i=1;Be.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),He("c",e,t,Be,0,0,-1),He("t",e,t,Be,0,0,1),He("n1",e,t,Be,-n,-i,-1),He("n2",e,t,Be,n,-i,-1),He("n3",e,t,Be,-n,i,-1),He("n4",e,t,Be,n,i,-1),He("f1",e,t,Be,-n,-i,1),He("f2",e,t,Be,n,-i,1),He("f3",e,t,Be,-n,i,1),He("f4",e,t,Be,n,i,1),He("u1",e,t,Be,n*.7,i*1.1,-1),He("u2",e,t,Be,-n*.7,i*1.1,-1),He("u3",e,t,Be,0,i*2,-1),He("cf1",e,t,Be,-n,0,1),He("cf2",e,t,Be,n,0,1),He("cf3",e,t,Be,0,-i,1),He("cf4",e,t,Be,0,i,1),He("cn1",e,t,Be,-n,0,-1),He("cn2",e,t,Be,n,0,-1),He("cn3",e,t,Be,0,-i,-1),He("cn4",e,t,Be,0,i,-1),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function He(s,t,e,n,i,r,o){Ya.set(i,r,o).unproject(n);const a=t[s];if(a!==void 0){const c=e.getAttribute("position");for(let l=0,h=a.length;l<h;l++)c.setXYZ(a[l],Ya.x,Ya.y,Ya.z)}}const Za=new wn;class LS extends Ci{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),r=new Zt;r.setIndex(new Me(n,1)),r.setAttribute("position",new Me(i,3)),super(r,new Cn({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&Za.setFromObject(this.object),Za.isEmpty())return;const e=Za.min,n=Za.max,i=this.geometry.attributes.position,r=i.array;r[0]=n.x,r[1]=n.y,r[2]=n.z,r[3]=e.x,r[4]=n.y,r[5]=n.z,r[6]=e.x,r[7]=e.y,r[8]=n.z,r[9]=n.x,r[10]=e.y,r[11]=n.z,r[12]=n.x,r[13]=n.y,r[14]=e.z,r[15]=e.x,r[16]=n.y,r[17]=e.z,r[18]=e.x,r[19]=e.y,r[20]=e.z,r[21]=n.x,r[22]=e.y,r[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class DS extends Ci{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new Zt;r.setIndex(new Me(n,1)),r.setAttribute("position",new It(i,3)),super(r,new Cn({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}}class US extends ps{constructor(t,e=1,n=16776960){const i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new Zt;o.setAttribute("position",new It(r,3)),o.computeBoundingSphere(),super(o,new Cn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],c=new Zt;c.setAttribute("position",new It(a,3)),c.computeBoundingSphere(),this.add(new K(c,new An({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Yf=new b;let $a,Mh;class NS extends pe{constructor(t=new b(0,0,1),e=new b(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",$a===void 0&&($a=new Zt,$a.setAttribute("position",new It([0,0,0,0,1,0],3)),Mh=new Fn(0,.5,1,5,1),Mh.translate(0,-.5,0)),this.position.copy(e),this.line=new ps($a,new Cn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new K(Mh,new An({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,r,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Yf.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Yf,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class FS extends Ci{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Zt;i.setAttribute("position",new It(e,3)),i.setAttribute("color",new It(n,3));const r=new Cn({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(t,e,n){const i=new lt,r=this.geometry.attributes.color.array;return i.set(t),i.toArray(r,0),i.toArray(r,3),i.set(e),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class OS{constructor(){this.type="ShapePath",this.color=new lt,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new Lo,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,r,o){return this.currentPath.bezierCurveTo(t,e,n,i,r,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(m){const v=[];for(let y=0,x=m.length;y<x;y++){const C=m[y],T=new us;T.curves=C.curves,v.push(T)}return v}function n(m,v){const y=v.length;let x=!1;for(let C=y-1,T=0;T<y;C=T++){let A=v[C],I=v[T],S=I.x-A.x,M=I.y-A.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(A=v[T],S=-S,I=v[C],M=-M),m.y<A.y||m.y>I.y)continue;if(m.y===A.y){if(m.x===A.x)return!0}else{const D=M*(m.x-A.x)-S*(m.y-A.y);if(D===0)return!0;if(D<0)continue;x=!x}}else{if(m.y!==A.y)continue;if(I.x<=m.x&&m.x<=A.x||A.x<=m.x&&m.x<=I.x)return!0}}return x}const i=Mi.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,c;const l=[];if(r.length===1)return a=r[0],c=new us,c.curves=a.curves,l.push(c),l;let h=!i(r[0].getPoints());h=t?!h:h;const u=[],d=[];let f=[],p=0,_;d[p]=void 0,f[p]=[];for(let m=0,v=r.length;m<v;m++)a=r[m],_=a.getPoints(),o=i(_),o=t?!o:o,o?(!h&&d[p]&&p++,d[p]={s:new us,p:_},d[p].s.curves=a.curves,h&&p++,f[p]=[]):f[p].push({h:a,p:_[0]});if(!d[0])return e(r);if(d.length>1){let m=!1,v=0;for(let y=0,x=d.length;y<x;y++)u[y]=[];for(let y=0,x=d.length;y<x;y++){const C=f[y];for(let T=0;T<C.length;T++){const A=C[T];let I=!0;for(let S=0;S<d.length;S++)n(A.p,d[S].p)&&(y!==S&&v++,I?(I=!1,u[S].push(A)):m=!0);I&&u[y].push(A)}}v>0&&m===!1&&(f=u)}let g;for(let m=0,v=d.length;m<v;m++){c=d[m].s,l.push(c),g=f[m];for(let y=0,x=g.length;y<x;y++)c.holes.push(g[y].h)}return l}}class BS extends Ei{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class zS extends un{constructor(t=1,e=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(t,e,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yl);const kS=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Zl,AddEquation:ls,AddOperation:Bp,AdditiveAnimationBlendMode:xu,AdditiveBlending:ds,AgXToneMapping:ou,AlphaFormat:du,AlwaysCompare:jp,AlwaysDepth:cl,AlwaysStencilFunc:Bh,AmbientLight:Y0,AnimationAction:em,AnimationClip:Bo,AnimationLoader:zM,AnimationMixer:fS,AnimationObjectGroup:uS,AnimationUtils:NM,ArcCurve:S0,ArrayCamera:p0,ArrowHelper:NS,AttachedBindMode:Oh,Audio:j0,AudioAnalyser:eS,AudioContext:Gu,AudioListener:QM,AudioLoader:$M,AxesHelper:FS,BackSide:bn,BasicDepthPacking:Wp,BasicShadowMap:Nm,BatchedMesh:y0,Bone:Ru,BooleanKeyframeTrack:er,Box2:MS,Box3:wn,Box3Helper:DS,BoxGeometry:Ai,BoxHelper:LS,BufferAttribute:Me,BufferGeometry:Zt,BufferGeometryLoader:Q0,ByteType:cu,Cache:Hi,Camera:rc,CameraHelper:IS,CanvasTexture:$o,CapsuleGeometry:pc,CatmullRomCurve3:b0,CineonToneMapping:ru,CircleGeometry:Wr,ClampToEdgeWrapping:Mn,Clock:Mc,Color:lt,ColorKeyframeTrack:Bu,ColorManagement:ce,CompressedArrayTexture:sM,CompressedCubeTexture:rM,CompressedTexture:dc,CompressedTextureLoader:kM,ConeGeometry:gs,ConstantAlphaFactor:Np,ConstantColorFactor:Dp,Controls:BS,CubeCamera:o0,CubeReflectionMapping:Yi,CubeRefractionMapping:fs,CubeTexture:Wo,CubeTextureLoader:VM,CubeUVReflectionMapping:kr,CubicBezierCurve:Iu,CubicBezierCurve3:w0,CubicInterpolant:V0,CullFaceBack:Uh,CullFaceFront:xp,CullFaceFrontBack:Um,CullFaceNone:_p,Curve:hi,CurvePath:E0,CustomBlending:vp,CustomToneMapping:zp,CylinderGeometry:Fn,Cylindrical:yS,Data3DTexture:Mu,DataArrayTexture:ic,DataTexture:yi,DataTextureLoader:HM,DataUtils:Zg,DecrementStencilOp:$m,DecrementWrapStencilOp:Km,DefaultLoadingManager:W0,DepthFormat:Gs,DepthStencilFormat:$s,DepthTexture:Tu,DetachedBindMode:kp,DirectionalLight:Hu,DirectionalLightHelper:PS,DiscreteInterpolant:H0,DodecahedronGeometry:wi,DoubleSide:Ue,DstAlphaFactor:Cp,DstColorFactor:Pp,DynamicCopyUsage:dg,DynamicDrawUsage:og,DynamicReadUsage:cg,EdgesGeometry:A0,EllipseCurve:fc,EqualCompare:$p,EqualDepth:ul,EqualStencilFunc:eg,EquirectangularReflectionMapping:bo,EquirectangularRefractionMapping:wo,Euler:En,EventDispatcher:Ei,ExtrudeGeometry:Ko,FileLoader:$i,Float16BufferAttribute:t_,Float32BufferAttribute:It,FloatType:Nn,Fog:ac,FogExp2:Yo,FramebufferTexture:iM,FrontSide:qi,Frustum:Xo,GLBufferAttribute:_S,GLSL1:pg,GLSL3:zh,GreaterCompare:Jp,GreaterDepth:fl,GreaterEqualCompare:Qp,GreaterEqualDepth:dl,GreaterEqualStencilFunc:rg,GreaterStencilFunc:ig,GridHelper:CS,Group:At,HalfFloatType:li,HemisphereLight:ku,HemisphereLightHelper:AS,IcosahedronGeometry:Ki,ImageBitmapLoader:ZM,ImageLoader:zo,ImageUtils:n0,IncrementStencilOp:Zm,IncrementWrapStencilOp:Jm,InstancedBufferAttribute:Fr,InstancedBufferGeometry:K0,InstancedInterleavedBuffer:gS,InstancedMesh:hs,Int16BufferAttribute:Qg,Int32BufferAttribute:jg,Int8BufferAttribute:$g,IntType:Jl,InterleavedBuffer:cc,InterleavedBufferAttribute:Js,Interpolant:Qo,InterpolateDiscrete:Eo,InterpolateLinear:Vl,InterpolateSmooth:ja,InvertStencilOp:Qm,KeepStencilOp:Us,KeyframeTrack:ui,LOD:x0,LatheGeometry:Jo,Layers:sc,LessCompare:Zp,LessDepth:hl,LessEqualCompare:vu,LessEqualDepth:qs,LessEqualStencilFunc:ng,LessStencilFunc:tg,Light:xs,LightProbe:J0,Line:ps,Line3:SS,LineBasicMaterial:Cn,LineCurve:Lu,LineCurve3:T0,LineDashedMaterial:B0,LineLoop:M0,LineSegments:Ci,LinearFilter:Ze,LinearInterpolant:Ou,LinearMipMapLinearFilter:zm,LinearMipMapNearestFilter:Bm,LinearMipmapLinearFilter:si,LinearMipmapNearestFilter:fo,LinearSRGBColorSpace:js,LinearToneMapping:iu,LinearTransfer:Go,Loader:On,LoaderUtils:Yh,LoadingManager:zu,LoopOnce:Vp,LoopPingPong:Gp,LoopRepeat:Hp,LuminanceAlphaFormat:mu,LuminanceFormat:pu,MOUSE:Lm,Material:pn,MaterialLoader:yc,MathUtils:Po,Matrix2:Yu,Matrix3:Kt,Matrix4:Wt,MaxEquation:bp,Mesh:K,MeshBasicMaterial:An,MeshDepthMaterial:Eu,MeshDistanceMaterial:Au,MeshLambertMaterial:Or,MeshMatcapMaterial:O0,MeshNormalMaterial:F0,MeshPhongMaterial:U0,MeshPhysicalMaterial:D0,MeshStandardMaterial:we,MeshToonMaterial:N0,MinEquation:Sp,MirroredRepeatWrapping:To,MixOperation:Op,MultiplyBlending:Fh,MultiplyOperation:Vo,NearestFilter:Fe,NearestMipMapLinearFilter:Om,NearestMipMapNearestFilter:Fm,NearestMipmapLinearFilter:Tr,NearestMipmapNearestFilter:lu,NeutralToneMapping:au,NeverCompare:Yp,NeverDepth:ll,NeverStencilFunc:jm,NoBlending:vi,NoColorSpace:zi,NoToneMapping:Wi,NormalAnimationBlendMode:nc,NormalBlending:Hs,NotEqualCompare:Kp,NotEqualDepth:pl,NotEqualStencilFunc:sg,NumberKeyframeTrack:Fo,Object3D:pe,ObjectLoader:qM,ObjectSpaceNormalMap:qp,OctahedronGeometry:Vi,OneFactor:Tp,OneMinusConstantAlphaFactor:Fp,OneMinusConstantColorFactor:Up,OneMinusDstAlphaFactor:Rp,OneMinusDstColorFactor:Ip,OneMinusSrcAlphaFactor:al,OneMinusSrcColorFactor:Ap,OrthographicCamera:qo,PCFShadowMap:eu,PCFSoftShadowMap:nu,PMREMGenerator:kh,Path:Lo,PerspectiveCamera:sn,Plane:as,PlaneGeometry:be,PlaneHelper:US,PointLight:Xr,PointLightHelper:TS,Points:uc,PointsMaterial:Zo,PolarGridHelper:RS,PolyhedronGeometry:_s,PositionalAudio:tS,PropertyBinding:de,PropertyMixer:tm,QuadraticBezierCurve:Du,QuadraticBezierCurve3:Gr,Quaternion:dn,QuaternionKeyframeTrack:jo,QuaternionLinearInterpolant:G0,RED_GREEN_RGTC2_Format:zl,RED_RGTC1_Format:_u,REVISION:Yl,RGBADepthPacking:Xp,RGBAFormat:Sn,RGBAIntegerFormat:ec,RGBA_ASTC_10x10_Format:Dl,RGBA_ASTC_10x5_Format:Pl,RGBA_ASTC_10x6_Format:Il,RGBA_ASTC_10x8_Format:Ll,RGBA_ASTC_12x10_Format:Ul,RGBA_ASTC_12x12_Format:Nl,RGBA_ASTC_4x4_Format:Sl,RGBA_ASTC_5x4_Format:bl,RGBA_ASTC_5x5_Format:wl,RGBA_ASTC_6x5_Format:Tl,RGBA_ASTC_6x6_Format:El,RGBA_ASTC_8x5_Format:Al,RGBA_ASTC_8x6_Format:Cl,RGBA_ASTC_8x8_Format:Rl,RGBA_BPTC_Format:xo,RGBA_ETC2_EAC_Format:Ml,RGBA_PVRTC_2BPPV1_Format:xl,RGBA_PVRTC_4BPPV1_Format:_l,RGBA_S3TC_DXT1_Format:mo,RGBA_S3TC_DXT3_Format:go,RGBA_S3TC_DXT5_Format:_o,RGBDepthPacking:Wm,RGBFormat:fu,RGBIntegerFormat:km,RGB_BPTC_SIGNED_Format:Fl,RGB_BPTC_UNSIGNED_Format:Ol,RGB_ETC1_Format:vl,RGB_ETC2_Format:yl,RGB_PVRTC_2BPPV1_Format:gl,RGB_PVRTC_4BPPV1_Format:ml,RGB_S3TC_DXT1_Format:po,RGDepthPacking:Xm,RGFormat:gu,RGIntegerFormat:tc,RawShaderMaterial:Nu,Ray:Vr,Raycaster:xS,RectAreaLight:Z0,RedFormat:jl,RedIntegerFormat:Ho,ReinhardToneMapping:su,RenderTarget:i0,RepeatWrapping:Ys,ReplaceStencilOp:Ym,ReverseSubtractEquation:Mp,RingGeometry:gc,SIGNED_RED_GREEN_RGTC2_Format:kl,SIGNED_RED_RGTC1_Format:Bl,SRGBColorSpace:Ke,SRGBTransfer:ye,Scene:lc,ShaderChunk:ie,ShaderLib:ni,ShaderMaterial:rn,ShadowMaterial:L0,Shape:us,ShapeGeometry:_c,ShapePath:OS,ShapeUtils:Mi,ShortType:hu,Skeleton:hc,SkeletonHelper:wS,SkinnedMesh:v0,Source:ks,Sphere:fn,SphereGeometry:on,Spherical:vS,SphericalHarmonics3:$0,SplineCurve:Uu,SpotLight:q0,SpotLightHelper:bS,Sprite:_0,SpriteMaterial:Cu,SrcAlphaFactor:ol,SrcAlphaSaturateFactor:Lp,SrcColorFactor:Ep,StaticCopyUsage:ug,StaticDrawUsage:Co,StaticReadUsage:lg,StereoCamera:JM,StreamCopyUsage:fg,StreamDrawUsage:ag,StreamReadUsage:hg,StringKeyframeTrack:nr,SubtractEquation:yp,SubtractiveBlending:Nh,TOUCH:Dm,TangentSpaceNormalMap:ms,TetrahedronGeometry:xc,Texture:ke,TextureLoader:X0,TextureUtils:Oy,TorusGeometry:Tn,TorusKnotGeometry:vc,Triangle:Dn,TriangleFanDrawMode:Gm,TriangleStripDrawMode:Hm,TrianglesDrawMode:Vm,TubeGeometry:tr,UVMapping:$l,Uint16BufferAttribute:Su,Uint32BufferAttribute:bu,Uint8BufferAttribute:Jg,Uint8ClampedBufferAttribute:Kg,Uniform:qu,UniformsGroup:mS,UniformsLib:yt,UniformsUtils:Nr,UnsignedByteType:bi,UnsignedInt248Type:Zs,UnsignedInt5999Type:uu,UnsignedIntType:Zi,UnsignedShort4444Type:Kl,UnsignedShort5551Type:Ql,UnsignedShortType:Lr,VSMShadowMap:mi,Vector2:nt,Vector3:b,Vector4:fe,VectorKeyframeTrack:Oo,VideoTexture:nM,WebGL3DRenderTarget:Bg,WebGLArrayRenderTarget:Og,WebGLCoordinateSystem:xi,WebGLCubeRenderTarget:a0,WebGLMultipleRenderTargets:zS,WebGLRenderTarget:un,WebGLRenderer:m0,WebGLUtils:f0,WebGPUCoordinateSystem:Ro,WireframeGeometry:I0,WrapAroundEnding:Ao,ZeroCurvatureEnding:Bs,ZeroFactor:wp,ZeroSlopeEnding:zs,ZeroStencilOp:qm,createCanvasElement:e0},Symbol.toStringTag,{value:"Module"})),im={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class qr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const VS=new qo(-1,1,1,-1,0,1);class HS extends Zt{constructor(){super(),this.setAttribute("position",new It([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new It([0,2,0,0,2,0],2))}}const GS=new HS;class Zu{constructor(t){this._mesh=new K(GS,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,VS)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class el extends qr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof rn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Nr.clone(t.uniforms),this.material=new rn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Zu(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Zf extends qr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class WS extends qr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class XS{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new nt);this._width=n.width,this._height=n.height,e=new un(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:li}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new el(im),this.copyPass.material.blending=vi,this.clock=new Mc}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Zf!==void 0&&(o instanceof Zf?n=!0:o instanceof WS&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new nt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class qS extends qr{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new lt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const YS={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new lt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Br extends qr{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new nt(t.x,t.y):new nt(256,256),this.clearColor=new lt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new un(r,o,{type:li}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new un(r,o,{type:li});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new un(r,o,{type:li});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=YS;this.highPassUniforms=Nr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new rn({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new nt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=im;this.copyUniforms=Nr.clone(h.uniforms),this.blendMaterial=new rn({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:ds,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new lt,this.oldClearAlpha=1,this.basic=new An,this.fsQuad=new Zu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new nt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=Br.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Br.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new rn({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new nt(.5,.5)},direction:{value:new nt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new rn({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Br.BlurDirectionX=new nt(1,0);Br.BlurDirectionY=new nt(0,1);const ZS={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class $S extends qr{constructor(){super();const t=ZS;this.uniforms=Nr.clone(t.uniforms),this.material=new Nu({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Zu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ce.getTransfer(this._outputColorSpace)===ye&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===iu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===su?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ru?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Zl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ou?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===au&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const $h={uniforms:{tDiffuse:{value:null},dir:{value:new nt(1,0)},focus:{value:.46},band:{value:.1},falloff:{value:.34},maxBlur:{value:7}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 dir;
    uniform float focus, band, falloff, maxBlur;
    varying vec2 vUv;
    void main() {
      float d = abs(vUv.y - focus);
      float amt = smoothstep(band, band + falloff, d);
      float r = amt * maxBlur;
      if (r < 0.05) { gl_FragColor = texture2D(tDiffuse, vUv); return; }
      vec4 sum = vec4(0.0);
      float wsum = 0.0;
      for (int i = -6; i <= 6; i++) {
        float fi = float(i);
        float w = exp(-fi * fi / 14.0);
        sum += texture2D(tDiffuse, vUv + dir * fi * (r / 6.0)) * w;
        wsum += w;
      }
      gl_FragColor = sum / wsum;
    }`},JS={uniforms:{tDiffuse:{value:null},res:{value:new nt(1,1)},time:{value:0},dull:{value:1.35},lush:{value:1.18},vignette:{value:.42},grain:{value:.018},shadowTint:{value:new lt(.9,.97,1.08)},highTint:{value:new lt(1.07,1,.9)},lift:{value:new lt(.012,.016,.026)}},vertexShader:$h.vertexShader,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 res;
    uniform float time, dull, lush, vignette, grain;
    uniform vec3 shadowTint, highTint, lift;
    varying vec2 vUv;
    vec3 rgb2hsv(vec3 c) {
      vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
      float d = q.x - min(q.w, q.y);
      return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + 1e-10)), d / (q.x + 1e-10), q.x);
    }
    vec3 hsv2rgb(vec3 c) {
      vec3 p = abs(fract(c.xxx + vec3(0.0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0);
      return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
    }
    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      vec3 col = max(src.rgb, 0.0);
      vec3 hsv = rgb2hsv(col);
      // life over ruin: dull stays dull, vivid stays vivid
      float s = pow(clamp(hsv.y, 0.0, 1.0), dull);
      float green = smoothstep(0.14, 0.2, hsv.x) * (1.0 - smoothstep(0.42, 0.5, hsv.x));
      s = clamp(s * mix(1.0, lush, green), 0.0, 1.0);
      col = hsv2rgb(vec3(hsv.x, s, hsv.z));
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col *= mix(shadowTint, highTint, smoothstep(0.04, 0.7, l));
      col += lift * (1.0 - smoothstep(0.0, 0.3, l));
      vec2 p = vUv - 0.5; p.x *= res.x / res.y;
      col *= mix(1.0 - vignette, 1.0, smoothstep(0.98, 0.32, length(p)));
      float n = fract(sin(dot(vUv * res + time * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
      col += (n - 0.5) * grain * (0.4 + l);
      gl_FragColor = vec4(col, src.a);
    }`};function KS(s,t,e){const n=s.getDrawingBufferSize(new nt),i=new un(n.x,n.y,{type:li,samples:4}),r=new XS(s,i),o=new qS(t,e);r.addPass(o);const a=new Br(new nt(n.x,n.y),.45,.55,.82);r.addPass(a);const c=new el(JS);r.addPass(c);const l=new el($h),h=new el($h);return r.addPass(l),r.addPass(h),r.addPass(new $S),{composer:r,bloom:a,grade:c,tiltH:l,tiltV:h,resize:(d,f)=>{r.setSize(d,f);const p=s.getPixelRatio(),_=d*p,g=f*p;l.uniforms.dir.value.set(1/_,0),h.uniforms.dir.value.set(0,1/g);const m=7*(g/720);l.uniforms.maxBlur.value=m,h.uniforms.maxBlur.value=m,c.uniforms.res.value.set(_,g)},tick:d=>{c.uniforms.time.value=d},setScene:d=>{o.scene=d}}}const sm={night:!1,sun:{color:"#ffd09a",intensity:3.4,from:new b(-13,10.5,6.5)},hemi:{sky:"#a9c2d8",ground:"#5a5232",intensity:1.05},fog:{color:"#cdb895",density:.016},exposure:1.05,bloom:{strength:.42,radius:.55,threshold:.85},grade:{dull:1.35,lush:1.2,vignette:.42,shadowTint:[.9,.97,1.08],highTint:[1.07,1,.9]},sprite:[1.1,1.05,.98]},rm={night:!0,sun:{color:"#8aa6d8",intensity:.85,from:new b(-8,14,5)},hemi:{sky:"#22365a",ground:"#0b0d12",intensity:.55},fog:{color:"#101a2c",density:.03},exposure:1.15,bloom:{strength:.9,radius:.6,threshold:.6},grade:{dull:1.25,lush:1.1,vignette:.55,shadowTint:[.85,.95,1.18],highTint:[1.12,1,.86]},sprite:[.6,.68,.95]},$f={night:!0,sun:{color:"#a8b8d0",intensity:.5,from:new b(-5,14,7)},hemi:{sky:"#5a6070",ground:"#2a231b",intensity:1.35},fog:{color:"#07080b",density:.014},exposure:1.25,bloom:{strength:.7,radius:.6,threshold:.7},grade:{dull:1.25,lush:1.2,vignette:.58,shadowTint:[.86,.94,1.12],highTint:[1.12,1,.86]},sprite:[.9,.84,.8]};function QS(s,t,e,n){s.background=new lt(n.fog.color),s.fog=new Yo(n.fog.color,n.fog.density),t.toneMappingExposure=n.exposure;const i=new ku(n.hemi.sky,n.hemi.ground,n.hemi.intensity);s.add(i);const r=new Hu(n.sun.color,n.sun.intensity);r.castShadow=!0,r.shadow.mapSize.set(2048,2048);const o=15;Object.assign(r.shadow.camera,{left:-o,right:o,top:o,bottom:-o,near:1,far:60}),r.shadow.bias=-4e-4,r.shadow.normalBias=.025,s.add(r,r.target),e.bloom.strength=n.bloom.strength,e.bloom.radius=n.bloom.radius,e.bloom.threshold=n.bloom.threshold;const a=e.grade.uniforms;a.dull.value=n.grade.dull,a.lush.value=n.grade.lush,a.vignette.value=n.grade.vignette,a.shadowTint.value.setRGB(...n.grade.shadowTint),a.highTint.value.setRGB(...n.grade.highTint);const c=o*2/2048;return{sun:r,follow(l){const h=Math.round(l.x/c)*c,u=Math.round(l.z/c)*c;r.target.position.set(h,0,u),r.position.set(h+n.sun.from.x,n.sun.from.y,u+n.sun.from.z)}}}const Jf=.0243,Sc=new X0;function bc(s){return s.colorSpace=Ke,s.magFilter=Fe,s.minFilter=Fe,s.generateMipmaps=!1,s}let Sh=null;function wc(s){if(!Sh){const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(32,32,2,32,32,31);i.addColorStop(0,"rgba(0,0,0,0.55)"),i.addColorStop(.6,"rgba(0,0,0,0.3)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),Sh=new $o(e)}const t=new K(new be(s*2,s*1.3),new An({map:Sh,transparent:!0,depthWrite:!1}));return t.rotation.x=-Math.PI/2,t.renderOrder=1,t}function $u(s,t,e,n,i){const r=new be(t,e);r.translate(0,e*(n-.5),0);const o=new An({map:s,alphaTest:.5,side:Ue,color:i}),a=new K(r,o);return a.castShadow=!0,a}class Tc{constructor(t,e,n){this.meta=e,this.tex=t,t.wrapS=t.wrapT=Mn,this.mesh=$u(t,e.frameW*Jf,e.frameH*Jf,e.originY,n),this.root.add(this.mesh,wc(.34)),this.setFrame("S",0)}root=new At;mesh;tex;dir="S";t=0;moving=!1;static async load(t,e){const[n,i]=await Promise.all([Sc.loadAsync(`./world/char/${t}_walk.png`).then(bc),fetch(`./world/char/${t}_walk.meta.json`).then(r=>r.json())]);return new Tc(n,i,e)}setFrame(t,e){const{cols:n,rows:i}=this.meta,r=t==="S"?0:t==="N"?1:2,o=t==="E";this.tex.repeat.set((o?-1:1)/n,1/i),this.tex.offset.set((o?e+1:e)/n,1-(r+1)/i)}animate(t,e,n=1){e!==this.moving&&(this.t=0,this.moving=e),this.t+=t*n;const i=e?Math.floor(this.t*this.meta.fps)%this.meta.cols:0;this.setFrame(this.dir,i),this.mesh.scale.y=e?1:1+Math.sin(this.t*2.2)*.012}setTint(t){this.mesh.material.color.copy(t)}face(t,e){Math.abs(t)<1e-4&&Math.abs(e)<1e-4||(this.dir=Math.abs(t)>=Math.abs(e)*.9?t<0?"W":"E":e<0?"N":"S")}}class Ec{root=new At;body=new At;front;back;hop=0;constructor(t,e){this.front=t,this.back=e,this.back.visible=!1,this.body.add(t,e),this.root.add(this.body,wc(.36))}static async load(t,e,n=.019){const i=async a=>{const c=bc(await Sc.loadAsync(a));c.wrapS=Ys;const l=c.image,h=jS(l)/l.height;return $u(c,l.width*n,l.height*n,h,e)},[r,o]=await Promise.all([i(`./sprites/ohms/${t}_front_hd.png`),i(`./sprites/ohms/${t}_back_hd.png`)]);return new Ec(r,o)}setTint(t){for(const e of[this.front,this.back])e.material.color.copy(t)}step(t,e,n){const i=Math.hypot(e,n)>1e-4;if(i){const r=n<0&&Math.abs(n)>Math.abs(e)*.9;this.front.visible=!r,this.back.visible=r,Math.abs(e)>1e-4&&(this.front.scale.x=this.back.scale.x=e<0?-1:1),this.hop+=t*11}else this.hop=0;this.body.position.y=i?Math.abs(Math.sin(this.hop))*.09:0}}function jS(s){const t=document.createElement("canvas");t.width=s.width,t.height=s.height;const e=t.getContext("2d");e.drawImage(s,0,0);const n=e.getImageData(0,0,t.width,t.height).data;for(let i=t.height-1;i>=0;i--)for(let r=0;r<t.width;r++)if(n[(i*t.width+r)*4+3]>128)return i+1;return t.height}async function tb(s,t,e){const n=bc(await Sc.loadAsync(s)),i=n.image,r=document.createElement("canvas");r.width=i.width,r.height=i.height;const o=r.getContext("2d");o.drawImage(i,0,0);const a=o.getImageData(0,0,r.width,r.height).data;let c=r.height,l=0;for(let d=0;d<r.height;d++)for(let f=0;f<r.width;f++)a[(d*r.width+f)*4+3]>128&&(c=Math.min(c,d),l=Math.max(l,d+1));const h=t/Math.max(1,l-c),u=new At;return u.add($u(n,i.width*h,i.height*h,l/i.height,e),wc(.34)),u}const bh=["south","south-east","east","north-east","north","north-west","west","south-west"];class Ju{root=new At;body=new At;mesh;mats;dir="S";facing="south";t=0;constructor(t,e,n,i){this.mats=t;const r=new be(e,n);r.translate(0,n*(i-.5),0),this.mesh=new K(r,t.south),this.mesh.castShadow=!0,this.body.add(this.mesh),this.root.add(this.body,wc(.34))}static async load(t,e,n=1.65){const i=await Promise.all(bh.map(f=>Sc.loadAsync(`./world/styles/${t}/${f}.png`).then(bc))),r=i[0].image,o=document.createElement("canvas");o.width=r.width,o.height=r.height;const a=o.getContext("2d");a.drawImage(r,0,0);const c=a.getImageData(0,0,o.width,o.height).data;let l=o.height,h=0;for(let f=0;f<o.height;f++)for(let p=0;p<o.width;p++)c[(f*o.width+p)*4+3]>128&&(l=Math.min(l,f),h=Math.max(h,f+1));const u=n/Math.max(1,h-l),d=Object.fromEntries(bh.map((f,p)=>[f,new An({map:i[p],alphaTest:.5,side:Ue,color:e})]));return new Ju(d,r.width*u,r.height*u,h/r.height)}setTint(t){for(const e of Object.values(this.mats))e.color.copy(t)}face(t,e){if(Math.abs(t)<1e-4&&Math.abs(e)<1e-4)return;const n=Math.atan2(-t,e),i=(Math.round(n/(Math.PI/4))%8+8)%8;this.facing=bh[(8-i)%8],this.mesh.material=this.mats[this.facing],this.dir=Math.abs(t)>=Math.abs(e)*.9?t<0?"W":"E":e<0?"N":"S"}animate(t,e,n=1){if(this.t+=t*n,e){const i=Math.sin(this.t*14);this.body.position.y=Math.abs(i)*.07,this.body.scale.set(1+Math.abs(i)*.02,1-Math.abs(i)*.03,1),this.body.rotation.z=i*.035}else this.body.position.y=0,this.body.rotation.z=0,this.body.scale.set(1,1+Math.sin(this.t*2.2)*.012,1)}}const $e=(s,t,e)=>{const n=document.createElement(s);return n.className=t,e.appendChild(n),n};class eb{root;prompt;box;portrait;plate;text;more;speech=null;line=0;shown=0;onClose=null;stick={x:0,y:0};aPressed=!1;constructor(t){this.root=$e("div","ui",t),this.prompt=$e("div","prompt",this.root),this.box=$e("div","dlg",this.root),this.portrait=$e("img","dlg-portrait",this.box);const e=$e("div","dlg-panel",this.box);this.plate=$e("div","dlg-name",e),this.text=$e("div","dlg-text",e),this.more=$e("div","dlg-more",e),this.more.textContent="▼",this.box.addEventListener("pointerdown",n=>{n.preventDefault(),this.aPressed=!0}),(matchMedia("(pointer: coarse)").matches||"ontouchstart"in window)&&this.touchControls()}get talking(){return this.speech!==null}takeA(){const t=this.aPressed;return this.aPressed=!1,t}titleCard(t,e){this.root.querySelectorAll(".title-card").forEach(i=>i.remove());const n=$e("div","title-card",this.root);$e("div","tc-rule",n),$e("div","tc-title",n).textContent=t,$e("div","tc-sub",n).textContent=e,$e("div","tc-rule",n),setTimeout(()=>n.classList.add("out"),3200),setTimeout(()=>n.remove(),4600)}hint(t){const e=$e("div","hint",this.root);e.innerHTML=t,setTimeout(()=>e.classList.add("out"),9e3)}badgeEl=null;badge(t){this.badgeEl??=$e("div","badge",this.root),this.badgeEl.innerHTML=t}fadeEl=null;fade(t,e=450){this.fadeEl??=$e("div","fade",this.root);const n=this.fadeEl;return n.style.transitionDuration=`${e}ms`,n.offsetWidth,n.classList.toggle("on",t),new Promise(i=>setTimeout(i,e))}showPrompt(t,e=0,n=0){if(!t||this.talking){this.prompt.classList.remove("on");return}this.prompt.innerHTML=`<b>${"ontouchstart"in window?"A":"E"}</b>${t}`,this.prompt.style.transform=`translate(${Math.round(e)}px, ${Math.round(n)}px) translate(-50%, -100%)`,this.prompt.classList.add("on")}say(t,e){this.speech=t,this.line=0,this.onClose=e??null,this.plate.textContent=t.name??"",this.box.classList.toggle("no-name",!t.name),this.box.classList.toggle("has-portrait",!!t.portrait),t.portrait&&(this.portrait.src=t.portrait),this.box.classList.add("on"),this.startLine()}advance(){const t=this.speech;if(!t)return;const e=t.lines[this.line];if(this.shown<e.length){this.shown=e.length,this.render();return}if(++this.line<t.lines.length){this.startLine();return}this.speech=null,this.box.classList.remove("on"),this.onClose?.()}tick(t){const e=this.speech;if(!e)return;const n=e.lines[this.line];this.shown<n.length&&(this.shown=Math.min(n.length,this.shown+t*52),this.render())}startLine(){this.shown=0,this.render()}render(){const e=this.speech.lines[this.line];this.text.textContent=e.slice(0,Math.floor(this.shown)),this.more.classList.toggle("on",this.shown>=e.length)}touchControls(){const t=$e("div","stick",this.root),e=$e("div","stick-knob",t),n=46;let i=null,r=0,o=0;const a=(h,u)=>{let d=h-r,f=u-o;const p=Math.hypot(d,f);p>n&&(d*=n/p,f*=n/p),e.style.transform=`translate(${d}px, ${f}px)`,this.stick.x=d/n,this.stick.y=f/n};t.addEventListener("pointerdown",h=>{i=h.pointerId,t.setPointerCapture(i);const u=t.getBoundingClientRect();r=u.left+u.width/2,o=u.top+u.height/2,a(h.clientX,h.clientY)}),t.addEventListener("pointermove",h=>{h.pointerId===i&&a(h.clientX,h.clientY)});const c=h=>{h.pointerId===i&&(i=null,e.style.transform="",this.stick.x=this.stick.y=0)};t.addEventListener("pointerup",c),t.addEventListener("pointercancel",c);const l=$e("button","btn-a",this.root);l.textContent="A",l.addEventListener("pointerdown",h=>{h.preventDefault(),this.aPressed=!0})}}function re(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ja(s,t,e){let n=Math.imul(s,374761393)^Math.imul(t,668265263)^Math.imul(e,2246822519);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}const Kf=s=>s*s*(3-2*s);function Xe(s,t,e=1){const n=Math.floor(s),i=Math.floor(t),r=Kf(s-n),o=Kf(t-i),a=Ja(n,i,e),c=Ja(n+1,i,e),l=Ja(n,i+1,e),h=Ja(n+1,i+1,e);return a+(c-a)*r+(l-a)*o+(a-c-l+h)*r*o}function te(s,t,e=1,n=4){let i=0,r=.5,o=1,a=0;for(let c=0;c<n;c++)i+=Xe(s*o,t*o,e+c*17)*r,a+=r,r*=.5,o*=2;return i/a}const gi=16,Vt=s=>{const t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},We=(s,t,e)=>[s[0]+(t[0]-s[0])*e,s[1]+(t[1]-s[1])*e,s[2]+(t[2]-s[2])*e],en=(s,t)=>[s[0]*t,s[1]*t,s[2]*t];class Pe{constructor(t,e){this.w=t,this.h=e,this.data=new Uint8ClampedArray(t*e*4)}data;set(t,e,n,i=255){const r=(Math.floor(t)%this.w+this.w)%this.w,a=((Math.floor(e)%this.h+this.h)%this.h*this.w+r)*4;this.data[a]=n[0],this.data[a+1]=n[1],this.data[a+2]=n[2],this.data[a+3]=i}get(t,e){const n=(Math.floor(t)%this.w+this.w)%this.w,r=((Math.floor(e)%this.h+this.h)%this.h*this.w+n)*4;return[this.data[r],this.data[r+1],this.data[r+2]]}alpha(t,e){const n=(Math.floor(t)%this.w+this.w)%this.w,i=(Math.floor(e)%this.h+this.h)%this.h;return this.data[(i*this.w+n)*4+3]}fill(t){for(let e=0;e<this.h;e++)for(let n=0;n<this.w;n++)this.set(n,e,t)}canvas(){const t=document.createElement("canvas");t.width=this.w,t.height=this.h;const e=t.getContext("2d"),n=e.createImageData(this.w,this.h);return n.data.set(this.data),e.putImageData(n,0,0),t}texture(t={}){const e=new $o(this.canvas());return e.magFilter=Fe,e.minFilter=si,e.colorSpace=Ke,e.anisotropy=4,t.repeat!==!1&&(e.wrapS=e.wrapT=Ys),t.worldSize!==!1&&e.repeat.set(gi/this.w,gi/this.h),e}}const Nt={barnRed:Vt("#8b3626"),barnRedLight:Vt("#a8463a"),barnRedDark:Vt("#5e2219"),oldWood:Vt("#857865"),oldWoodDark:Vt("#4f463a"),greyBoard:Vt("#77695a"),greyBoardDark:Vt("#4a3f35"),white:Vt("#d6cfbf"),whiteShade:Vt("#9c968a"),steel:Vt("#5b6066"),steelDark:Vt("#2e3236"),rust:Vt("#8a4a26"),rustLight:Vt("#b26a32"),rustDark:Vt("#4a2614"),concrete:Vt("#a19c92"),concreteDark:Vt("#6f6b63"),moss:Vt("#4f7a2c"),mossLight:Vt("#7aa83c"),shingle:Vt("#4a4440"),shingleDark:Vt("#2c2825"),brick:Vt("#8c4733"),mortar:Vt("#9d968a"),hay:Vt("#c9a24a"),hayDark:Vt("#8a6a28"),bark:Vt("#4e3b2b"),barkDark:Vt("#2a1f17"),leaf0:Vt("#1e4a1d"),leaf1:Vt("#2f6b2a"),leaf2:Vt("#3f8a32"),leaf3:Vt("#5ea83c"),leaf4:Vt("#8cc650"),glass:Vt("#22303a"),glassSky:Vt("#6f8a98"),black:Vt("#141210"),yellow:Vt("#d9a92a")},Qf=new Map;function Ge(s,t){let e=Qf.get(s);return e||(e=t(),Qf.set(s,e)),e}function ao(s,t,e,n,i={}){const o=new Pe(32,32),a=re(s),c=i.boardPx??5,l=[];for(let h=0;h<32;h++)l.push(.86+a()*.22);for(let h=0;h<32;h++)for(let u=0;u<32;u++){const d=i.horizontal?h:u,f=i.horizontal?u:h,p=Math.floor(d/c),_=d%c===0;let g=en(t,l[p%l.length]);const m=Xe(p*7.3+.3,f*.35,s);g=We(g,m>.62?e:n,Math.abs(m-.5)*.5),i.peel&&te(u*.18,h*.18,s+3,3)>.62&&(g=We(i.peel,i.peel,1)),_?g=n:i.horizontal&&d%c===c-1&&(g=We(g,n,.45)),a()<.012&&(g=n),o.set(u,h,g)}return o}const he={barnRed:()=>Ge("barnRed",()=>ao(11,Nt.barnRed,Nt.barnRedLight,Nt.barnRedDark,{peel:Nt.oldWood}).texture()),greyBoards:()=>Ge("greyBoards",()=>ao(12,Nt.greyBoard,en(Nt.greyBoard,1.2),Nt.greyBoardDark,{horizontal:!0,boardPx:4}).texture()),whiteSiding:()=>Ge("whiteSiding",()=>ao(13,Nt.white,en(Nt.white,1.08),Nt.whiteShade,{horizontal:!0,boardPx:4,peel:Nt.greyBoard}).texture()),oldWood:()=>Ge("oldWood",()=>ao(14,Nt.oldWood,en(Nt.oldWood,1.15),Nt.oldWoodDark,{boardPx:4}).texture()),deck:()=>Ge("deck",()=>ao(15,Vt("#6b4f36"),Vt("#86654a"),Vt("#33241a"),{horizontal:!0,boardPx:4}).texture()),corrugated:()=>Ge("corrugated",()=>{const t=new Pe(32,32),e=[1.18,1,.72,.92];for(let n=0;n<32;n++)for(let i=0;i<32;i++){let r=en(Nt.steel,e[i%4]);const o=te(i*.12,n*.12,21,3);o>.5&&(r=We(r,en(o>.66?Nt.rust:Nt.rustLight,e[i%4]),Math.min(1,(o-.5)*4))),Xe(i*.9,n*.06,22)>.78&&(r=We(r,Nt.rustDark,.5)),te(i*.3,n*.3,23,2)>.83&&(r=Nt.black),t.set(i,n,r)}return t.texture()}),binRibs:()=>Ge("binRibs",()=>{const t=new Pe(32,32),e=[1.15,.95,.75,.95];for(let n=0;n<32;n++)for(let i=0;i<32;i++){let r=en(Vt("#8d9296"),e[n%4]);const o=te(i*.1,n*.14,31,3);o>.56&&(r=We(r,Nt.rust,Math.min(1,(o-.56)*4))),Xe(i*.7,n*.05,32)>.8&&(r=We(r,Nt.rustDark,.6)),n%16===0&&i%4===1&&(r=en(r,.55)),t.set(i,n,r)}return t.texture()}),concrete:()=>Ge("concrete",()=>{const t=new Pe(32,32),e=re(41);for(let n=0;n<32;n++)for(let i=0;i<32;i++){const r=te(i*.2,n*.2,41,3);let o=We(Nt.concreteDark,Nt.concrete,.55+r*.45);o=en(o,.94+e()*.1),Xe(i*.8,n*.05,42)>.74&&(o=We(o,Vt("#5e5a52"),.45)),te(i*.25,n*.25,43,2)>.72&&(o=We(o,Nt.moss,.55)),t.set(i,n,o)}for(let n=0;n<2;n++){let i=e()*32,r=e()*32;for(let o=0;o<18;o++)t.set(i,r,Nt.concreteDark.map(a=>a*.6)),i+=e()*2-.6,r+=e()*1.6-.3}return t.texture()}),shingles:()=>Ge("shingles",()=>{const t=new Pe(32,32),e=re(51);for(let n=0;n<32;n++)for(let i=0;i<32;i++){const r=Math.floor(n/4),o=r%2?3:0,a=Math.floor((i+o)/6);let c=en(Nt.shingle,.85+Xe(a*3.1,r*2.7,52)*.3);n%4===3&&(c=Nt.shingleDark),(i+o)%6===0&&(c=We(c,Nt.shingleDark,.6)),Xe(a*1.7,r*3.3,53)>.86&&(c=Vt("#3a2e24")),te(i*.2,n*.2,54,3)>.66&&(c=We(c,Nt.moss,.6)),e()<.01&&(c=Nt.mossLight),t.set(i,n,c)}return t.texture()}),brick:()=>Ge("brick",()=>{const t=new Pe(32,32),e=re(61);for(let n=0;n<32;n++)for(let i=0;i<32;i++){const r=Math.floor(n/3),o=r%2?3:0,a=Math.floor((i+o)/6);let c=en(Nt.brick,.8+Xe(a*2.3,r*1.9,62)*.35);(n%3===2||(i+o)%6===5)&&(c=Nt.mortar),e()<.03&&(c=en(c,.7)),t.set(i,n,c)}return t.texture()}),rustTank:()=>Ge("rustTank",()=>{const t=new Pe(32,32);for(let e=0;e<32;e++)for(let n=0;n<32;n++){const i=te(n*.15,e*.15,71,3);let r=We(Vt("#7c8b8e"),Nt.rust,Math.min(1,i*1.6));Xe(n*.9,e*.08,72)>.7&&(r=We(r,Nt.rustDark,.55)),e%8===0&&(r=en(r,.7)),e%8===1&&n%3===0&&(r=en(r,1.35)),t.set(n,e,r)}return t.texture()}),steel:()=>Ge("steel",()=>{const t=new Pe(32,32),e=re(81);for(let n=0;n<32;n++)for(let i=0;i<32;i++){let r=en(Nt.steel,.82+Xe(i*.08,n*1.3,81)*.3);e()<.02&&(r=en(r,1.4)),te(i*.2,n*.2,82,2)>.7&&(r=We(r,Nt.rust,.5)),t.set(i,n,r)}return t.texture()}),hazard:()=>Ge("hazard",()=>{const t=new Pe(32,32);for(let e=0;e<32;e++)for(let n=0;n<32;n++){let i=(n+e)%16<8?Nt.yellow:Nt.black;te(n*.3,e*.3,91,2)>.62&&(i=We(i,Nt.concreteDark,.7)),t.set(n,e,i)}return t.texture()}),hay:()=>Ge("hay",()=>{const t=new Pe(32,32),e=re(101);for(let n=0;n<32;n++)for(let i=0;i<32;i++){let r=en(Nt.hay,.85+e()*.25);(i*2+n)%7===0&&(r=Nt.hayDark),te(i*.2,n*.2,102,2)>.7&&(r=We(r,Vt("#6f6a3a"),.5)),t.set(i,n,r)}return t.texture()}),bark:()=>Ge("bark",()=>{const t=new Pe(32,32);for(let e=0;e<32;e++)for(let n=0;n<32;n++){const i=Xe(n*.9,e*.12,111);let r=We(Nt.barkDark,Nt.bark,i);te(n*.3,e*.15,112,2)>.68&&(r=We(r,Nt.moss,.6)),t.set(n,e,r)}return t.texture()}),leaves:()=>Ge("leaves",()=>{const t=new Pe(32,32),e=re(121),n=[Nt.leaf0,Nt.leaf1,Nt.leaf2,Nt.leaf3,Nt.leaf4];for(let i=0;i<32;i++)for(let r=0;r<32;r++){const o=te(r*.22,i*.22,121,3);let a=Math.min(4,Math.floor(o*5.2+(e()-.5)*.9));a=Math.max(0,a),t.set(r,i,n[a])}return t.texture()}),leavesOlive:()=>Ge("leavesOlive",()=>{const t=new Pe(32,32),e=re(131),n=[Vt("#2f3a1c"),Vt("#4b5a2a"),Vt("#66763a"),Vt("#86954a"),Vt("#a5ad5c")];for(let i=0;i<32;i++)for(let r=0;r<32;r++){const o=te(r*.25,i*.25,131,3),a=Math.max(0,Math.min(4,Math.floor(o*5.2+(e()-.5)*.9)));t.set(r,i,n[a])}return t.texture()}),vines:()=>Ge("vines",()=>{const t=new Pe(32,32),e=re(141),n=[Nt.leaf1,Nt.leaf2,Nt.leaf3,Nt.leaf4];for(let r=0;r<32;r++)for(let o=0;o<32;o++)te(o*.22,r*.22,141,3)+r/32*.25>.6?t.set(o,r,n[Math.min(3,Math.floor(e()*4))],255):t.set(o,r,Nt.leaf0,0);for(let r=0;r<5;r++){let o=e()*32;for(let a=31;a>0;a--)t.set(o,a,Nt.leaf0,255),o+=e()*2-1}for(let r=0;r<6;r++)t.set(e()*32,e()*32,r%2?Vt("#e9e2f0"):Vt("#d8b23a"),255);return t.texture()}),glass:()=>Ge("glass",()=>{const t=new Pe(16,16);for(let e=0;e<16;e++)for(let n=0;n<16;n++){let i=Nt.glass;(n+(16-e))%11<2&&(i=We(Nt.glass,Nt.glassSky,.6)),(n<1||e<1||n>14||e>14||n===7||n===8||e===7||e===8)&&(i=Nt.white),t.set(n,e,i)}return t.texture({repeat:!1,worldSize:!1})}),glassLit:()=>Ge("glassLit",()=>{const t=new Pe(16,16);for(let e=0;e<16;e++)for(let n=0;n<16;n++){let i=We(Vt("#ffcf7a"),Vt("#ff9f45"),e/16);(n<1||e<1||n>14||e>14||n===7||n===8||e===7||e===8)&&(i=Vt("#3a2a1a")),t.set(n,e,i)}return t.texture({repeat:!1,worldSize:!1})}),boarded:()=>Ge("boarded",()=>{const t=new Pe(16,16),e=re(151);for(let n=0;n<16;n++)for(let i=0;i<16;i++){let r=Nt.black;Math.floor((n+i*.35)/4)%2===0&&(r=en(Nt.oldWood,.8+e()*.3)),(i<1||n<1||i>14||n>14)&&(r=Nt.whiteShade),t.set(i,n,r)}return t.texture({repeat:!1,worldSize:!1})})};function Ji(s,t){const e=document.createElement("canvas");e.width=t.w,e.height=t.h;const n=e.getContext("2d");n.imageSmoothingEnabled=!1,t.bg&&(n.fillStyle=t.bg,n.fillRect(0,0,t.w,t.h)),n.fillStyle=t.fg,n.font=t.font,n.textAlign="center",n.textBaseline="middle",n.fillText(s,t.w/2,t.h/2+1);const i=n.getImageData(0,0,t.w,t.h),r=Vt(t.fg),o=t.bg?Vt(t.bg):null;for(let c=0;c<i.data.length;c+=4){const l=c/4%t.w,h=Math.floor(c/4/t.w),u=i.data[c+3],d=o?Math.abs(i.data[c]-r[0])+Math.abs(i.data[c+1]-r[1])<Math.abs(i.data[c]-o[0])+Math.abs(i.data[c+1]-o[1]):u>110,f=te(l*.3,h*.3,t.seed??7,2)<(t.worn??0),p=d&&!f?r:o;p?(i.data[c]=p[0],i.data[c+1]=p[1],i.data[c+2]=p[2],i.data[c+3]=255):i.data[c+3]=0}n.putImageData(i,0,0);const a=new $o(e);return a.magFilter=Fe,a.minFilter=Ze,a.colorSpace=Ke,a}function Ti(s,t,e){const n=new Ai(s,t,e),i=n.attributes.uv,r=[[e,t],[e,t],[s,e],[s,e],[s,t],[s,t]];for(let o=0;o<6;o++){const[a,c]=r[o];for(let l=0;l<4;l++){const h=o*4+l;i.setXY(h,i.getX(h)*a,i.getY(h)*c)}}return n}function Ve(s,t,e,n=16,i=!1){const r=new Fn(s,t,e,n,1,i),o=r.attributes.uv,a=(n+1)*2,c=Math.PI*2*Math.max(s,t);for(let l=0;l<o.count;l++)l<a?o.setXY(l,o.getX(l)*c,o.getY(l)*e):o.setXY(l,o.getX(l)*2*Math.max(s,t),o.getY(l)*2*Math.max(s,t));return r}function Ac(s,t){const e=new be(s,t),n=e.attributes.uv;for(let i=0;i<n.count;i++)n.setXY(i,n.getX(i)*s,n.getY(i)*t);return e}const Xl=new Map;function le(s,t,e={}){let n=Xl.get(s);return n||(n=new we({map:t,roughness:.92,metalness:0,...e}),Xl.set(s,n)),n}function Gt(s,t={}){const e="col:"+s+JSON.stringify(t);let n=Xl.get(e);return n||(n=new we({color:s,roughness:.9,metalness:0,...t}),Xl.set(e,n)),n}function Ht(s,t=!0,e=!0){return s.traverse(n=>{n.isMesh&&(n.castShadow=t,n.receiveShadow=e)}),s}function U(s,t,e,n,i=0,r=0,o=0){const a=new K(Ti(s,t,e),n);return a.position.set(i,r+t/2,o),Ht(a)}function oe(s,t,e,n,i=0,r=0,o=0,a=16){const c=new K(Ve(s,t,e,a),n);return c.position.set(i,r+e/2,o),Ht(c)}function Te(s,t,e,n){const i=s.distanceTo(t),r=new K(Ti(e,i,e),n);return r.position.copy(s).add(t).multiplyScalar(.5),r.quaternion.setFromUnitVectors(new b(0,1,0),t.clone().sub(s).normalize()),Ht(r)}function Cc(s,t,e){const n=new Ko(s,{depth:t,bevelEnabled:!1});return n.translate(0,0,-t/2),Ht(new K(n,e))}const ta=[],om=[];let Ir={cols:1,rows:1,cell:()=>"#",height:()=>0};function Ku(s){Ir=s,ta.length=0;for(const t of om)t()}const Qu=()=>Ir,ri=(s,t)=>s>=0&&t>=0&&s<Ir.cols&&t<Ir.rows?Ir.cell(s,t):"#",Qt=(s,t)=>Ir.height(s,t);function nb(s){om.push(s)}function vt(s,t,e,n){ta.push({x0:Math.min(s,e),z0:Math.min(t,n),x1:Math.max(s,e),z1:Math.max(t,n)})}function ib(){return ta}function ju(s,t,e){for(const n of ta)if(s+e>n.x0&&s-e<n.x1&&t+e>n.z0&&t-e<n.z1)return!0;return!1}function wh(s,t,e=.1){for(const n of ta)if(s>n.x0-e&&s<n.x1+e&&t>n.z0-e&&t<n.z1+e)return!0;return!1}const z={barn:()=>le("barnRed",he.barnRed()),grey:()=>le("greyBoards",he.greyBoards()),white:()=>le("whiteSiding",he.whiteSiding()),tin:()=>le("corrugated",he.corrugated(),{metalness:.25,roughness:.7}),shingle:()=>le("shingles",he.shingles()),concrete:()=>le("concrete",he.concrete()),steel:()=>le("steel",he.steel(),{metalness:.35,roughness:.65}),tank:()=>le("rustTank",he.rustTank(),{metalness:.25,roughness:.7}),bin:()=>le("binRibs",he.binRibs(),{metalness:.3,roughness:.7}),brick:()=>le("brick",he.brick()),deck:()=>le("deck",he.deck()),wood:()=>le("oldWood",he.oldWood()),hazard:()=>le("hazard",he.hazard()),hay:()=>le("hay",he.hay()),vine:()=>le("vines",he.vines(),{alphaTest:.5,side:Ue}),trim:()=>Gt("#cdc5b2"),dark:()=>Gt("#0d0c0b",{roughness:1}),glass:()=>le("glass",he.glass(),{roughness:.25}),boarded:()=>le("boarded",he.boarded())};let Th=null;function sb(){if(!Th){const s=new Pe(16,16);for(let t=0;t<16;t++)for(let e=0;e<16;e++){const n=e%4===0||t%4===0;s.set(e,t,[70,76,82],n?255:0)}Th=s.texture()}return le("cage",Th,{alphaTest:.5,side:Ue,metalness:.4})}function rb(s,t,e,n){const i=[[0,0],[-e/2,-n/2],[e/2,-n/2],[-e/2,n/2],[e/2,n/2]];return i.reduce((r,[o,a])=>r+Qt(s+o,t+a),0)/i.length}function Rc(s,t,e,n=z.concrete()){s.add(U(t+.12,.7,e+.12,n,0,-.62,0))}function Si(s,t,e,n,i,r,o=.09){const a=Math.hypot(e-s,n-t),c=Math.atan2(n-t,e-s),l=new K(Ti(a+.14,o,i),r);return l.position.set((s+e)/2-Math.sin(c)*o*.6,(t+n)/2+Math.cos(c)*o*.6,0),l.rotation.z=c,Ht(l)}function Pc(s){const t=new us;return s.forEach(([e,n],i)=>i?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t}function Zn(s,t,e,n,i,r,o=0,a="glass"){const c=new K(new be(i,r),a==="glass"?z.glass().clone():z.boarded()),l=new At;return l.position.set(t,e,n),l.rotation.y=o,c.position.z=.012,l.add(c),l.add(U(i+.16,.06,.08,z.trim(),0,-r/2-.06,.03)),l.add(U(i+.12,.06,.06,z.trim(),0,r/2,.02)),s.add(l),c}function Le(s,t,e,n,i,r,o=0){const a=new K(Ac(i,r),z.vine());a.position.set(t,e+r/2,n),a.rotation.y=o,a.castShadow=!0,a.receiveShadow=!0,s.add(a)}function Ri(s,t,e,n,i,r){return s.position.set(t,rb(t,e,n,i),e),r.add(s),s}function ob(s,t,e){const n=new At,i=5,r=3.2,o=2.4;Rc(n,i,r,z.wood()),n.add(U(i,o,r,z.barn()));const a=[[-i/2,o],[-1.95,3.45],[0,4.05],[1.95,3.45],[i/2,o]];n.add(Cc(Pc(a),r,z.barn()));const c=[[-i/2-.22,o-.12],...a.slice(1,4),[i/2+.22,o-.12]];for(let f=0;f<c.length-1;f++)n.add(Si(c[f][0],c[f][1],c[f+1][0],c[f+1][1],r+.5,z.tin()));for(const f of[-1,1])n.add(U(.12,o,.12,z.trim(),f*(i/2),0,r/2+.02));for(let f=0;f<a.length-1;f++){const p=new b(a[f][0],a[f][1],r/2+.04),_=new b(a[f+1][0],a[f+1][1],r/2+.04);n.add(Te(p,_,.1,z.trim()))}n.add(U(1.9,1.95,.05,z.dark(),0,.02,r/2+.01));const l=f=>{const p=new At;p.add(U(.9,1.9,.07,z.barn(),0,0,0));for(const[_,g,m,v]of[[0,0,.9,.08],[0,1.82,.9,.08],[-.41,0,.08,1.9],[.41,0,.08,1.9]])p.add(U(m,v,.09,z.trim(),_,g,.01));return p.add(Te(new b(-.4,.08,.05),new b(.4,1.82,.05),.07,z.trim())),p.add(Te(new b(.4,.08,.05),new b(-.4,1.82,.05),.07,z.trim())),p.position.set(f,.02,r/2+.07),p};n.add(l(-.47),l(1.35)),n.add(U(2.9,.07,.07,z.steel(),.45,1.98,r/2+.06)),n.add(U(.95,.85,.05,z.dark(),0,2.7,r/2+.01));const h=U(.5,.85,.06,z.barn(),0,0,0),u=new At;u.position.set(-.48,2.7,r/2+.04),h.position.set(.25,.425,0),u.add(h),u.rotation.y=-1.1,n.add(u),n.add(U(1.1,.07,.3,z.trim(),0,3.6,r/2+.05)),n.add(U(.7,.55,.7,z.barn(),0,3.95,0)),n.add(U(.72,.3,.72,z.dark(),0,4.05,0));const d=new K(Ve(.02,.62,.45,4),z.tin());d.rotation.y=Math.PI/4,d.position.set(0,4.72,0),n.add(Ht(d)),n.add(U(.03,.55,.03,z.steel(),0,4.9,0)),n.add(U(.5,.04,.04,z.steel(),.06,5.3,0)),Zn(n,-i/2-.01,1.4,.6,.6,.6,-Math.PI/2,"boarded"),Zn(n,i/2+.01,1.4,-.3,.6,.6,Math.PI/2);for(const[f,p,_]of[[-2,2.15,.2],[-1.2,2.45,-.4]]){const g=new K(Ve(.48,.48,.8,14),z.hay());g.rotation.set(0,_,Math.PI/2),g.position.set(f,.46,p),n.add(Ht(g))}return Le(n,-1.9,0,r/2+.06,1.3,2.2),Le(n,i/2+.07,0,.6,1.6,1.6,Math.PI/2),Le(n,1.9,0,r/2+.06,.8,1.1),Ri(n,t,e,i,r,s),vt(t-i/2,e-r/2,t+i/2,e+r/2),vt(t-2.5,e+r/2,t-.7,e+r/2+.95),{}}function jf(s,t,e,n,i){const r=new At,o=4.2,a=2,c=2.2,l=1,h=-l/2,u=n===0?z.grey():z.white();Rc(r,o,a+l,z.brick()),r.add(U(o,c,a,u,0,0,h));const d=Cc(Pc([[-a/2,c],[a/2,c],[0,c+1]]),o,u);d.rotation.y=Math.PI/2,d.position.z=h,r.add(d);const f=new At;f.add(Si(-a/2-.35,c-.18,0,c+1,o+.5,z.shingle())),f.add(Si(0,c+1,a/2+.35,c-.18,o+.5,z.shingle())),f.rotation.y=Math.PI/2,f.position.z=h,r.add(f);const p=U(.42,1.9,.42,z.brick(),1.25,1.6,h-.25);n===1&&(p.rotation.z=.06),r.add(p);const _=a/2+h+l/2;r.add(U(o+.2,.22,l,z.deck(),0,0,_));for(const S of[-o/2,-.7,.7,o/2])r.add(U(.12,1.95,.12,z.trim(),S,.22,_+l/2-.08));for(const S of[-1.4,1.4])r.add(U(1.3,.06,.05,z.trim(),S,.85,_+l/2-.08));const g=Si(-l/2-.3,1.95,l/2+.2,2.24,o+.4,z.shingle(),.08),m=new At;m.add(g),m.rotation.y=Math.PI/2,m.position.z=_,n===1&&(m.rotation.x=.07),r.add(m),r.add(U(1,.11,.35,z.deck(),0,0,_+l/2+.17));const v=h+a/2+.01;r.add(U(.78,1.55,.05,z.wood(),0,.22,v)),r.add(U(.9,.08,.06,z.trim(),0,1.78,v+.01));const y=[];y.push(Zn(r,-1.35,1.3,v,.7,.75,0,n===1?"boarded":"glass")),y.push(Zn(r,1.35,1.3,v,.7,.75,0,"glass")),Zn(r,-o/2-.01,1.3,h,.6,.7,-Math.PI/2,"boarded"),Zn(r,o/2+.01,1.3,h,.6,.7,Math.PI/2),r.add(oe(.26,.26,.7,z.steel(),o/2+.2,0,h+a/2+.25,10)),r.add(U(.9,.38,.32,z.wood(),-1.4,.22,_-.25)),Le(r,-o/2+.6,.2,_+l/2-.02,.9,1.9),Le(r,o/2+.07,0,h,1.4,1.7,Math.PI/2),n===1&&Le(r,.9,c-.4,v+.02,1.4,.9),Ri(r,t,e,o,a+l,s),vt(t-o/2-.1,e-(a+l)/2,t+o/2+.1,e+(a+l)/2+.3);const C=y[1].material;C.emissive=new lt("#ffb05a"),C.emissiveMap=he.glassLit(),C.emissiveIntensity=0;const T=re(n+9);let A=0,I=!1;return{update(S){i&&(S>A&&(I=!I,A=S+(I?.05+T()*.25:2.5+T()*6)),C.emissiveIntensity=I?2.2:0)}}}function ab(s,t,e){const n=new At,i=3,r=3,o=2.5;Rc(n,i,r+.6,z.concrete()),n.add(U(i,o,r,z.white(),0,0,-.3)),n.add(Cc(Pc([[-i/2,o],[i/2,o],[0,o+1.3]]),r,z.white()).translateZ(-.3));const a=new At;a.add(Si(-i/2-.25,o-.18,0,o+1.3,r+.4,z.shingle())),a.add(Si(0,o+1.3,i/2+.25,o-.18,r+.4,z.shingle())),a.position.z=-.3,n.add(a);const c=r/2-.05;n.add(U(1.1,3.6,1.1,z.white(),0,0,c));for(const[d,f]of[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]])n.add(U(.13,.8,.13,z.white(),d,3.6,c+f));const l=new K(Ve(.14,.3,.42,12),Gt("#6b5a3a",{metalness:.6,roughness:.45}));l.position.set(0,3.95,c),n.add(Ht(l)),n.add(U(1.24,.12,1.24,z.trim(),0,4.4,c));const h=new K(Ve(.02,.88,1.9,4),z.shingle());h.rotation.y=Math.PI/4,h.position.set(0,4.52+.95,c),n.add(Ht(h));const u=new At;u.add(U(.05,.5,.05,z.steel(),0,0,0)),u.add(U(.28,.05,.05,z.steel(),0,.3,0)),u.position.set(0,6.4,c),u.rotation.z=.12,n.add(u),n.add(U(.72,1.55,.05,z.wood(),0,0,c+.56)),n.add(U(.06,1.55,.06,z.dark(),0,0,c+.59));for(const d of[-1,1])Zn(n,d*(i/2+.01),1.4,-.9,.45,1,d*Math.PI/2,d<0?"boarded":"glass"),Zn(n,d*(i/2+.01),1.4,.4,.45,1,d*Math.PI/2);return Zn(n,-.95,1.4,r/2-.29,.4,.9,0),Zn(n,.95,1.4,r/2-.29,.4,.9,0,"boarded"),Le(n,-i/2-.07,0,-.3,2.6,2.4,-Math.PI/2),Le(n,-.4,0,c+.57,.7,1.4),Le(n,.55,1.8,c+.57,.5,1.1),Ri(n,t,e,i,r+.6,s),vt(t-i/2,e-r/2-.3,t+i/2,e+r/2+.5),{}}function am(s,t,e){const n=new At,i=4.1,r=[[-1.05,-1.05],[1.05,-1.05],[-1.05,1.05],[1.05,1.05]],o=(f,p)=>new b(f*.8,i,p*.8);for(const[f,p]of r)n.add(Te(new b(f,0,p),o(f,p),.13,z.steel())),n.add(U(.34,.3,.34,z.concrete(),f,-.1,p));const a=[[0,1],[1,3],[3,2],[2,0]];for(const[f,p]of a){const[_,g]=r[f],[m,v]=r[p];for(const[y,x]of[[.35,2.1],[2.1,3.9]]){const C=1-y/i*.2,T=1-x/i*.2,A=new b(_*C,y,g*C),I=new b(m*T,x,v*T),S=new b(m*C,y,v*C),M=new b(_*T,x,g*T);n.add(Te(A,I,.04,z.steel()),Te(S,M,.04,z.steel()))}}n.add(oe(1.35,1.35,1.9,z.tank(),0,i+.05,0,22));const c=new K(Ve(.06,1.5,.95,22),z.tank());c.position.set(0,i+1.95+.47,0),n.add(Ht(c)),n.add(oe(1.75,1.75,.06,z.steel(),0,i,0,22));const l=new K(new Tn(1.72,.025,4,32),z.steel());l.rotation.x=Math.PI/2,l.position.y=i+.55,n.add(Ht(l));for(let f=0;f<12;f++){const p=f/12*Math.PI*2;n.add(U(.03,.55,.03,z.steel(),Math.cos(p)*1.72,i,Math.sin(p)*1.72))}const h=new K(new Fn(1.36,1.36,.36,22,1,!0,-.9,1.8),Gt("#9aa6a2",{roughness:.8}));h.position.set(0,i+1.2,0),n.add(h);const u=.62,d=1.18;for(const f of[-.16,.16])n.add(U(.035,i,.035,z.steel(),u+f,0,d));for(let f=.3;f<i;f+=.3)n.add(U(.32,.03,.03,z.steel(),u,f,d));Le(n,-1,0,1.06,.55,2.4),Le(n,1,0,-1,.55,1.6,Math.PI),Ri(n,t,e,2.2,2.2,s);for(const[f,p]of r)vt(t+f-.2,e+p-.2,t+f+.2,e+p+.2);return{}}function lb(s,t,e){const n=new At,i=5.2,r=.65,o=.18,a=(p,_,g)=>{const m=g/i,v=r+(o-r)*m;return new b(p*v,g,_*v)},c=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[p,_]of c)n.add(Te(a(p,_,0),a(p,_,i),.07,z.steel()));const l=[.4,1.5,2.6,3.6,4.5,i];for(let p=0;p<4;p++){const[_,g]=c[p],[m,v]=c[(p+1)%4];for(const y of l)n.add(Te(a(_,g,y),a(m,v,y),.04,z.steel()));for(let y=0;y<l.length-1;y++){const x=l[y],C=l[y+1];n.add(Te(a(_,g,x),a(m,v,C),.03,z.steel()))}}n.add(U(.6,.06,.6,z.wood(),0,i,0)),n.add(U(.34,.3,.55,z.steel(),0,i+.08,0)),n.add(U(.04,i,.04,z.steel(),0,0,0)),n.add(U(.06,.06,1.4,z.steel(),0,i+.2,-.85)),n.add(U(.03,.62,.95,z.tin(),0,i+.02,-1.55));const h=new At;h.position.set(0,i+.24,.42);const u=18;for(let p=0;p<u;p++){if(p===3||p===4||p===11)continue;const _=p/u*Math.PI*2,g=new K(Ti(.16,.95,.025),z.tin());g.position.set(Math.sin(_)*.68,Math.cos(_)*.68,0),g.rotation.order="ZYX",g.rotation.set(0,.35,-_),h.add(Ht(g))}const d=new K(new Tn(1.08,.025,4,28),z.steel());h.add(Ht(d)),h.add(Ht(new K(new Tn(.36,.025,4,18),z.steel()))),h.add(Ht(new K(Ve(.09,.09,.2,8).rotateX(Math.PI/2),z.steel()))),n.add(h),n.add(oe(.75,.75,.5,z.steel(),1.25,0,.25,18));const f=new K(new Wr(.71,18),Gt("#2e4a48",{roughness:.15,metalness:.1}));return f.rotation.x=-Math.PI/2,f.position.set(1.25,.43,.25),n.add(f),Le(n,-.55,0,.6,.5,1.9),Ri(n,t,e,1.4,1.4,s),vt(t-.7,e-.7,t+.7,e+.7),vt(t+.5,e-.5,t+2,e+1),{update:p=>{h.rotation.z=-p*.55}}}function cb(s,t,e,n){const i=new At,r=4.4,o=3.6,a=3;Rc(i,r,o),i.add(U(r,a,o,z.concrete())),i.add(U(r-.3,.35,o-.3,z.concrete(),0,a,0)),i.add(U(1.3,6.4,1.5,z.concrete(),1.45,0,-.6)),i.add(Si(.7,6.4,2.2,6.75,1.7,z.tin()).translateZ(-.6));for(let _=3.6;_<6.2;_+=.9)Zn(i,1.45,_,.16,.5,.35,0,"boarded");for(const _ of[-1.25,.25]){i.add(oe(.85,.85,6,z.concrete(),_,0,-2.55,20));const g=new K(new on(.86,16,8,0,Math.PI*2,0,Math.PI/2),z.concrete());g.position.set(_,6,-2.55),i.add(Ht(g)),Le(i,_-.3,0,-1.68,.7,2.6)}i.add(U(2.9,.55,.55,z.tin(),-.25,5.55,-1.65));const c=o/2;i.add(U(1.9,2.3,.22,z.concrete(),0,0,c+.06)),i.add(U(1.5,2,.05,Gt("#ffcf8a",{emissive:"#ffb867",emissiveIntensity:n?3.2:1.6}),0,0,c+.1));for(const[_,g,m,v]of[[-.86,0,.14,2.1],[.86,0,.14,2.1],[0,2.02,1.86,.14]])i.add(U(m,v,.06,z.hazard(),_,g,c+.2));i.add(U(.74,1.98,.14,z.steel(),-.37,0,c+.18));const l=new At;l.position.set(.74,0,c+.2);const h=U(.74,1.98,.14,z.steel(),-.37,0,0);l.add(h),l.add(U(.1,.5,.06,z.steel(),-.62,.8,.09)),l.rotation.y=-1.05,i.add(l);const u=new Xr("#ffb867",n?14:6,7,1.6);u.position.set(0,1,c+.7),i.add(u);const d=new K(new be(2.4,.6),new we({map:Ji("CO-OP",{w:64,h:16,fg:"#24221c",font:"bold 14px monospace",worn:.32}),alphaTest:.5,roughness:1}));d.position.set(-.05,2.62,c+.012),d.receiveShadow=!0,i.add(d),i.add(U(.06,.06,.4,z.steel(),0,2.38,c+.2));const f=new K(new on(.08,8,6),Gt("#ffd27a",{emissive:"#ffb050",emissiveIntensity:n?6:.4}));f.position.set(0,2.3,c+.4),i.add(f),i.add(U(1.3,.55,.9,z.concrete(),-1.5,0,c+.45)),i.add(U(.5,.5,.5,z.wood(),-1.75,.55,c+.4)),i.add(U(.4,.4,.4,z.wood(),-1.25,.55,c+.55)),i.add(oe(.07,.07,a+.3,z.tank(),r/2-.05,0,c-.05,8));const p=re(404);for(let _=0;_<7;_++){const g=new K(new wi(.1+p()*.16,0),z.concrete());g.position.set(-2.1+p()*4.2,.05,c+.3+p()*.4),g.rotation.set(p()*3,p()*3,p()*3),Math.abs(g.position.x)>.95&&i.add(Ht(g))}return Le(i,-r/2-.07,0,0,3.2,2.6,-Math.PI/2),Le(i,-1.7,.55,c+.03,.9,1.9),Le(i,1.8,0,c+.03,.7,2.4),Ri(i,t,e,r,o,s),vt(t-r/2,e-o/2,t+r/2,e+o/2),vt(t-2.15,e+o/2,t-.85,e+o/2+.9),vt(t-2.2,e-3.5,t+1.2,e-1.6),{}}function hb(s,t,e){const n=new At;n.add(oe(.78,.82,4.6,z.concrete(),0,-.3,0,20));const i=new K(new on(.8,16,8,0,Math.PI*2,0,Math.PI/2),z.tin());i.position.y=4.3,n.add(Ht(i));for(const r of[-.13,.13])n.add(U(.03,4.2,.03,z.steel(),r,0,.82));for(let r=.3;r<4.2;r+=.3)n.add(U(.26,.03,.03,z.steel(),0,r,.82));return Le(n,-.55,0,.6,.8,2,-.6),Ri(n,t,e,1.6,1.6,s),vt(t-.8,e-.8,t+.8,e+.8),{}}function ub(s,t,e){const n=new At,i=(t[0]+t[t.length-1])/2;return t.forEach((r,o)=>{const a=new At;a.add(oe(.78,.78,2.6,z.bin(),0,0,0,20));const c=new K(Ve(.14,.86,.6,20),z.tin());c.position.y=2.9,a.add(Ht(c)),a.add(oe(.16,.16,.18,z.steel(),0,3.2,0,8)),a.position.x=r-i,o===1&&(a.rotation.z=.04),n.add(a)}),n.add(U(t[t.length-1]-t[0]+.6,.06,.42,z.steel(),0,3.25,0)),n.add(Te(new b(t[0]-i-2,.25,.9),new b(t[0]-i-.2,3.1,.15),.18,z.tank())),Le(n,t[0]-i-.4,0,.79,.9,1.6),Le(n,t[2]-i+.2,0,.79,.7,1.1),Ri(n,i,e,t[t.length-1]-t[0]+1.6,1.6,s),vt(t[0]-.8,e-.8,t[t.length-1]+.8,e+.8),{}}function db(s,t,e,n){const i=new At;i.add(U(1.9,.18,1.5,z.concrete(),0,-.05,0));for(const[u,d,f,p]of[[0,-.7,1.9,.12],[0,.7,1.9,.12],[-.9,0,.12,1.5],[.9,0,.12,1.5]])i.add(U(f,.04,p,z.hazard(),u,.13,d));i.add(U(1.5,.05,1.1,z.steel(),0,.12,0));const r=2.2;for(const[u,d]of[[-.7,-.5],[.7,-.5],[-.7,.5],[.7,.5]])i.add(U(.08,r,.08,z.steel(),u,.12,d));i.add(U(1.5,.1,1.1,z.steel(),0,r+.1,0));const o=sb();for(const[u,d,f,p]of[[0,-.5,0,1.4],[-.7,0,Math.PI/2,1],[.7,0,Math.PI/2,1]]){const _=new K(Ac(p,r-.1),o);_.position.set(u,.17+(r-.1)/2,d),_.rotation.y=f,_.castShadow=!0,i.add(_)}const a=new K(new Tn(.28,.05,6,16),z.steel());a.position.set(0,r+.5,0),i.add(Ht(a)),i.add(U(.06,.4,.06,z.steel(),0,r+.15,0)),i.add(U(.07,2.6,.07,z.steel(),1.15,0,.55)),i.add(U(.5,.05,.05,z.steel(),.92,2.55,.55));const c=new K(new on(.09,8,6),Gt("#ffd890",{emissive:"#ffb050",emissiveIntensity:n?7:1.2}));c.position.set(.7,2.47,.55),i.add(c);const l=new Xr("#ffb867",n?9:2.5,6,1.7);l.position.set(.7,2.3,.6),i.add(l),i.add(U(.2,.3,.12,z.steel(),-.95,.9,.55));const h=new K(new on(.03,6,4),Gt("#7dff9a",{emissive:"#3dff7a",emissiveIntensity:3}));return h.position.set(-.95,1.12,.62),i.add(h),Ri(i,t,e,1.9,1.5,s),vt(t-.8,e-.6,t+.8,e+.4),{update:u=>{h.visible=Math.floor(u*1.4)%2===0}}}function fb(s,t,e,n,i){const r=new At,o=re(808),a=[t+2,t+3.1],c=(p,_,g,m)=>{const v=Math.hypot(g-p,m-_),y=Math.ceil(v/1.1);for(let x=0;x<=y;x++){const C=p+(g-p)*x/y,T=_+(m-_)*x/y;if(_===e&&m===e&&C>a[0]&&C<a[1])continue;const A=U(.12,1.05,.12,z.wood(),C,Qt(C,T)-.05,T);if(A.rotation.z=(o()-.5)*.12,r.add(A),x===y)continue;const I=p+(g-p)*(x+1)/y,S=_+(m-_)*(x+1)/y;if(!(_===e&&m===e&&(C>a[0]-1.2&&C<a[1]||I>a[0]&&I<a[1]+1.2)))for(const M of[.42,.82]){if(o()<.12)continue;const D=new b(C,Qt(C,T)+M,T),X=new b(I,Qt(I,S)+M-(o()<.1?.3:0),S);r.add(Te(D,X,.07,z.wood()))}}};c(t,e,n,e),c(n,e,n,i),c(n,i,t,i),c(t,i,t,e);const l=new At;l.position.set(a[1],Qt(a[1],e),e);for(const p of[.35,.7,1])l.add(U(1.1,.06,.05,z.wood(),-.55,p,0));l.add(U(.06,1,.05,z.wood(),-1.08,0,0)),l.rotation.y=1.15,r.add(l);const h=t+2,u=e+1.1;r.add(U(1.4,.42,.5,z.steel(),h,Qt(h,u),u));const d=new K(Ac(1.3,.4),Gt("#2e4a48",{roughness:.15}));d.rotation.x=-Math.PI/2,d.position.set(h,Qt(h,u)+.36,u),r.add(d);for(const[p,_,g]of[[n-1,i-.8,0],[n-1,i-.8,.5],[n-1.9,i-.8,0]])r.add(U(.85,.5,.48,z.hay(),p,Qt(p,_)+g,_));s.add(r);const f=.22;return vt(t-f,e-f,a[0],e+f),vt(a[1],e-f,n+f,e+f),vt(n-f,e,n+f,i),vt(t-f,i-f,n+f,i+f),vt(t-f,e,t+f,i),vt(h-.7,u-.25,h+.7,u+.25),vt(n-2.4,i-1.1,n-.5,i-.5),{}}function pb(s){const t=new At;t.add(U(.35,1,3.4,z.concrete(),18.75,-.75,25.5));const e=new K(new Wr(.45,14),z.dark());e.rotation.y=-Math.PI/2,e.position.set(18.56,-.3,25.5),t.add(e);const n=new K(new Tn(.47,.06,6,16),z.steel());n.rotation.y=Math.PI/2,n.position.set(18.55,-.3,25.5),t.add(Ht(n));for(const i of[18.85,22.15]){for(let r=23.7;r<=27.3;r+=.9)t.add(U(.12,.7,.12,z.wood(),i,Qt(i,r)-.05,r));t.add(U(.08,.14,3.7,z.wood(),i,Qt(i,25.5)+.5,25.5))}return s.add(t),vt(22,23.6,22.3,27.4),{}}const Un=40,$n=28,zr=Array.from({length:$n},()=>Array.from({length:Un},()=>"g")),lm=(s,t)=>s>=0&&t>=0&&s<Un&&t<$n,vs=(s,t,e,n,i)=>{for(let r=t;r<t+n;r++)for(let o=s;o<s+e;o++)lm(o,r)&&(zr[r][o]=i)};for(let s=0;s<Un;s++)zr[0][s]="#",zr[$n-1][s]="#";for(let s=0;s<$n;s++)zr[s][0]="#",zr[s][Un-1]="#";vs(1,13,Un-2,3,"d");vs(19,0,3,$n-1,"d");vs(1,24,18,3,"w");vs(19,24,3,3,"d");vs(3,3,6,5,"T");vs(30,4,7,6,"T");vs(4,18,7,4,"T");vs(29,18,8,4,"T");function mb(s,t,e=0){if(s-e<.15||s+e>Un-.15||t+e>$n-.15)return!0;if(t-e<.05)return!(s>19.2&&s<21.8);for(const[n,i]of[[-e,-e],[e,-e],[-e,e],[e,e],[0,0]]){const r=ri(Math.floor(s+n),Math.floor(t+i));if(r==="#"||r==="w")return!0}return ju(s,t,e)}function Jh(s,t,e,n){const i=e-.5,r=n-.5,o=Math.floor(i),a=Math.floor(r),c=i-o,l=r-a,h=(u,d)=>s(u,d)===t?1:0;return h(o,a)*(1-c)*(1-l)+h(o+1,a)*c*(1-l)+h(o,a+1)*(1-c)*l+h(o+1,a+1)*c*l}const Kh=(s,t)=>lm(s,t)?zr[t][s]:"#";function gb(s,t){let e=(te(s*.09,t*.09,5,3)-.5)*.45;e*=1-Jh(Kh,"d",s,t)*.9,e-=Jh(Kh,"w",s,t)*.55;const n=Math.min(s,t,Un-s,$n-t);return n<1.6&&(e+=(1.6-n)*.55),t<1.6&&s>18.6&&s<22.4&&(e=Math.min(e,.05)),e}const _b=-.3,xb={cols:Un,rows:$n,cell:Kh,height:gb,openings:[{side:"n",x0:18.6,x1:22.4}],centerLine:(s,t)=>Math.abs(t-14.5)<.06&&Math.floor(s*1.2)%3!==0&&te(s*.5,2,36,2)>.38,seed:2026},_e={bark:()=>le("bark",he.bark()),wood:()=>le("oldWood",he.oldWood()),rust:()=>le("rustTank",he.rustTank(),{metalness:.25,roughness:.7}),steel:()=>le("steel",he.steel(),{metalness:.35,roughness:.65}),concrete:()=>le("concrete",he.concrete()),vine:()=>le("vines",he.vines(),{alphaTest:.5,side:Ue}),dark:()=>Gt("#0d0c0b",{roughness:1})};function ea(s,t){const e=new Ki(s,1),n=e.attributes.position,i=new b;for(let o=0;o<n.count;o++){i.fromBufferAttribute(n,o);const a=.82+Xe(i.x*2.1+t,i.y*2.1+i.z*1.3,t)*.36;i.multiplyScalar(a),i.y*=.82,n.setXYZ(o,i.x,i.y,i.z)}const r=e.attributes.uv;for(let o=0;o<r.count;o++)r.setXY(o,r.getX(o)*s*6,r.getY(o)*s*3);return e.computeVertexNormals(),e}const tp=new Map;function na(s,t=!1){const e=s+t;let n=tp.get(e);return n||(n=new we({map:t?he.leavesOlive():he.leaves(),color:s,roughness:.95,flatShading:!0}),tp.set(e,n)),n}const Ic=[];nb(()=>{Ic.length=0});function cm(s){for(const t of Ic)t.obj.rotation.z=Math.sin(s*.9+t.phase)*t.amp}function qn(s,t,e,n){const i=new At,r=re(n),o=1.7*e;i.add(oe(.13*e,.24*e,o,_e.bark(),0,-.1,0,8));const a=new At;a.position.y=o*.92;const c=["#ffffff","#e8f2d0","#d6e8b8","#f2f6dc"],l=c[Math.floor(r()*c.length)];for(let h=0;h<6;h++){const u=r()*Math.PI*2,d=(h===0?0:.55+r()*.45)*e,f=new K(ea((.62+r()*.38)*e,n+h),na(l));f.position.set(Math.cos(u)*d,(.35+r()*.75)*e,Math.sin(u)*d),a.add(Ht(f)),h>0&&r()>.4&&a.add(Te(new b(0,-.2*e,0),f.position.clone().multiplyScalar(.7),.07*e,_e.bark()))}return i.add(a),Ic.push({obj:a,phase:r()*6.28,amp:.018}),i.position.set(s,Qt(s,t),t),i}function nl(s,t,e,n){const i=new At,r=re(n),o=new At;for(let a=0;a<3;a++){const c=a/3*6.28+r(),l=new b(Math.cos(c)*.55*e,1.2*e+r()*.3,Math.sin(c)*.55*e);i.add(Te(new b(0,-.1,0),l,.1*e,_e.bark()));const h=new K(ea((.55+r()*.25)*e,n+a),na("#ffffff",!0));h.scale.y=.55,h.position.copy(l).add(new b(0,.1,0)),o.add(Ht(h))}return i.add(o),Ic.push({obj:o,phase:r()*6.28,amp:.012}),i.position.set(s,Qt(s,t),t),i}function hm(s,t,e,n){const i=new At,r=re(n),o=(c,l,h,u,d)=>{const f=c.clone().add(l.clone().multiplyScalar(h));if(i.add(Te(c,f,u,_e.bark())),d>0&&r()>.25)for(let p=0;p<2;p++){const _=l.clone().add(new b(r()-.5,r()*.3,r()-.5).multiplyScalar(1.4)).normalize();o(f,_,h*.65,u*.62,d-1)}else if(r()>.45){const p=new K(ea(.18+r()*.12,n+d),na("#ffffff"));p.position.copy(f),i.add(Ht(p))}};o(new b(0,-.1,0),new b(.05,1,0),1.6*e,.2*e,3);const a=new K(new be(.5,1.4),_e.vine());return a.position.set(0,.7,.13),i.add(a),i.position.set(s,Qt(s,t),t),i}function So(s,t,e,n,i=!1){const r=new At,o=re(n);for(let a=0;a<3;a++){const c=new K(ea((.35+o()*.2)*e,n+a*3),na("#ffffff",i));c.position.set((o()-.5)*.6*e,.22*e,(o()-.5)*.5*e),r.add(Ht(c))}return r.position.set(s,Qt(s,t),t),r}function vb(s,t,e){const n=re(515),i=[];for(const[o,a,c]of t){const l=new At;l.add(oe(.07,.1,4.3,_e.wood(),0,-.2,0,7));const h=n()<.15,u=U(1.3,.1,.1,_e.wood(),0,3.85,0);h&&(u.rotation.z=.35),l.add(u);for(const d of[-.55,0,.55])l.add(oe(.035,.035,.13,Gt("#6f8f7a",{roughness:.3}),d,3.95,0,6));l.rotation.z=c,l.position.set(o,Qt(o,a),a),l.updateMatrixWorld(!0),s.add(l),vt(o-.12,a-.12,o+.12,a+.12),i.push([-.55,0,.55].map(d=>new b(d,4.05,0).applyMatrix4(l.matrixWorld)))}const r=new An({color:"#1c1b1a"});for(const[o,a]of e)for(let c=0;c<3;c++){const l=i[o][c],h=i[a][c],u=l.clone().lerp(h,.5);u.y-=.35+l.distanceTo(h)*.035;const d=new Gr(l,u,h);s.add(new K(new tr(d,16,.014,3,!1),r))}}function um(s,t,e){const n=new At,i=Gt("#4f6a78",{roughness:.85,metalness:.2});n.add(U(1,.55,1.3,_e.rust(),-.55,.32,0)),n.add(U(.95,.42,1.25,i,.42,.32,0)),n.add(U(.82,.5,1.2,i,-.12,.87,0)),n.add(U(.05,.36,1,Gt("#26313a",{roughness:.2}),.3,.95,0)),n.add(U(1,.25,.06,_e.rust(),-.55,.87,.62)),n.add(U(1,.25,.06,_e.rust(),-.55,.87,-.62)),n.add(U(.06,.25,1.3,_e.rust(),-1.05,.87,0));for(const[a,c,l]of[[.55,.62,0],[.55,-.62,.08],[-.75,.62,.12],[-.75,-.62,0]]){const h=new K(Ve(.27,.27,.2,12),Gt("#1d1b19"));h.rotation.x=Math.PI/2,h.position.set(a,.27-l,c),n.add(Ht(h))}const r=new K(ea(.4,71),na("#ffffff"));r.position.set(-.55,1.35,0),n.add(Ht(r)),n.add(U(.06,.6,.06,_e.bark(),-.55,.7,0));const o=new K(new be(.8,.6),_e.vine());o.position.set(-.1,.62,.66),n.add(o),n.position.set(t,Qt(t,e)-.05,e),n.rotation.y=.18,s.add(n),vt(t-1.2,e-.75,t+1,e+.75)}function yb(s,t,e){const n=new At;n.add(U(.6,.6,.6,_e.wood(),0,0,0)),n.add(U(.5,.5,.5,_e.wood(),.62,0,.05)),n.add(U(.45,.45,.45,_e.wood(),.15,.6,.02).rotateY(.3)),n.add(oe(.26,.26,.75,_e.rust(),1.25,0,.1,10)),n.position.set(t,Qt(t,e),e),s.add(n),vt(t-.35,e-.35,t+1.55,e+.4)}function Mb(s,t,e){const n=new At;n.add(U(.09,1.25,.09,_e.wood(),-.5,0,0)),n.add(U(.09,1.1,.09,_e.wood(),.5,0,0));const i=new K(Ti(1.3,.5,.06),[_e.wood(),_e.wood(),_e.wood(),_e.wood(),new we({map:Ji("THE FIELD",{w:64,h:24,bg:"#7d6b52",fg:"#efe6d0",font:"bold 11px monospace",worn:.3,seed:3}),roughness:1}),_e.wood()]);i.position.set(0,1,.05),i.rotation.z=-.05,n.add(Ht(i)),n.position.set(t,Qt(t,e),e),n.rotation.y=-.25,s.add(n),vt(t-.6,e-.12,t+.6,e+.12)}function Sb(s,t,e){const n=new At;n.add(U(.1,.9,.1,_e.wood(),-.6,0,0)),n.add(U(.1,.9,.1,_e.wood(),.6,0,0)),n.add(U(1.4,.08,.08,_e.wood(),0,.82,0)),n.position.set(t,Qt(t,e),e),s.add(n),vt(t-.7,e-.1,t+.7,e+.1)}function bb(s){const t=[[8.9,23.35,.08],[9.8,23.5,-.15],[11.15,23.35,.05]];for(const[n,i,r]of t){const o=new At;o.add(U(.36,.42,.1,_e.concrete(),0,0,0));const a=new K(Ve(.18,.18,.1,10).rotateX(Math.PI/2),_e.concrete());a.position.y=.42,o.add(Ht(a)),o.rotation.z=r,o.position.set(n,Qt(n,i)-.04,i),s.add(o),vt(n-.2,i-.1,n+.2,i+.1)}const e=new At;e.add(U(.06,.7,.06,_e.wood(),0,0,0)),e.add(U(.36,.06,.06,_e.wood(),0,.48,0)),e.position.set(10.45,Qt(10.45,23.6),23.6),e.rotation.z=-.2,s.add(e)}function dm(s,t,e,n){const i=new K(new Ki(.3,1),new we({color:"#8a7246",wireframe:!0})),r=re(n);i.rotation.set(r()*3,r()*3,r()*3),i.position.set(t,Qt(t,e)+.26,e),i.castShadow=!0,s.add(i)}function wb(s){const t=re(909),e=new Fn(.012,.018,1,3).translate(0,.5,0),n=new Fn(.035,.035,.18,5).translate(0,1,0),i=160,r=new hs(e,new Or({color:"#5f7a34"}),i),o=new hs(n,new Or({color:"#5a3a22"}),i),a=new Wt,c=new dn,l=new En;for(let h=0;h<i;h++){const u=1.2+t()*17.2,d=t()<.75?23.75+t()*.45:26.8+t()*.3;l.set((t()-.5)*.25,0,(t()-.5)*.25),c.setFromEuler(l);const f=.55+t()*.5;a.compose(new b(u,Qt(u,d)-.05,d),c,new b(1,f,1)),r.setMatrixAt(h,a),o.setMatrixAt(h,a)}r.receiveShadow=o.receiveShadow=!0,s.add(r,o);for(let h=0;h<22;h++){const u=1.2+t()*17,d=23.9+t()*.3,f=new K(new wi(.1+t()*.15,0),_e.concrete());f.position.set(u,Qt(u,d),d),f.scale.y=.6,s.add(Ht(f))}}function fm(s,t){const e=t?140:220,n=new Zt,i=new Float32Array(e*3),r=new Float32Array(e*3),o=re(321);for(let l=0;l<e;l++)i[l*3]=(o()-.5)*26,i[l*3+1]=.3+o()*(t?2.2:3.5),i[l*3+2]=(o()-.5)*18;n.setAttribute("position",new Me(r,3));const a=new Zo({color:t?"#c8ff70":"#fff2c8",size:t?.09:.055,transparent:!0,opacity:t?1:.75,blending:ds,depthWrite:!1,sizeAttenuation:!0}),c=new uc(n,a);return c.frustumCulled=!1,s.add(c),(l,h)=>{for(let u=0;u<e;u++){const d=i[u*3],f=i[u*3+1],p=i[u*3+2];let _=d+Math.sin(l*.21+u)*.6+l*.12,g=p+Math.cos(l*.17+u*1.3)*.5;_=((_-h.x)%26+39)%26-13+h.x,g=((g-h.z)%18+27)%18-9+h.z,r[u*3]=_,r[u*3+1]=f+Math.sin(l*.6+u*.7)*.18,r[u*3+2]=g}n.attributes.position.needsUpdate=!0,t&&(a.opacity=.65+Math.sin(l*3.1)*.35)}}function Tb(s,t){const e=(o,a)=>{s.add(o),a&&vt(o.position.x-a[0],o.position.z-a[1],o.position.x+a[0],o.position.z+a[1])},n=[[4.5,10.5,"c",1],[13.5,5.5,"c",1.15],[27.5,7.4,"m",1.2],[37.5,16.6,"c",.95],[3.5,16.6,"m",1],[34.5,16.6,"c",.9],[6.5,8.4,"d",1],[24.5,4.5,"c",1.05],[11.6,18.4,"m",.9],[30.5,25.5,"c",1],[16.6,5,"d",1.1]];let i=1e3;for(const[o,a,c,l]of n){const h=c==="c"?qn(o,a,l,i++):c==="m"?nl(o,a,l,i++):hm(o,a,l,i++);e(h,[.25,.25])}const r=re(4242);for(let o=-6;o<Un+6;o+=1.6+r()*1.2)o>17.6&&o<23.4||(e(qn(o,-.4-r()*3.5,1.15+r()*.5,i++)),r()>.5&&e(qn(o+.8,.5+r()*.4,.8+r()*.3,i++)));for(let o=1;o<$n+2;o+=1.5+r()*1.3)e(r()>.3?qn(-.6-r()*2.5,o,1+r()*.4,i++):nl(-.5,o,1.2,i++)),e(r()>.3?qn(Un+.6+r()*2.5,o,1+r()*.4,i++):nl(Un+.5,o,1.2,i++));for(let o=0;o<Un;o+=1.1+r()*1.4)e(So(o,$n-.35+r()*.6,.9+r()*.5,i++,r()>.6));for(const[o,a,c]of[[5,12.9,.8],[9.9,12.9,.7],[14,12.85,.9],[26.3,12.8,.8],[31.6,12.75,.9],[8.4,22.2,.8],[17.9,22.6,.7],[24,21.6,.8],[33.5,22.9,.7]])e(So(o,a,c,i++));for(let o=0;o<26;o++){const a=1.5+r()*(Un-3),c=1.5+r()*($n-3);ri(Math.floor(a),Math.floor(c))==="g"&&e(So(a,c,.55+r()*.4,i++,r()>.5))}vb(s,[[2.6,12.85,.02],[10.4,12.85,-.04],[18.85,12.85,0],[25.6,12.85,.09],[33.1,12.85,.01],[38.4,12.85,-.05],[22.35,8.4,.03],[22.35,3.4,-.07]],[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7]]),um(s,7.1,16.9),yb(s,22.5,12.1),Mb(s,22.7,16.7),Sb(s,15.2,16.5),bb(s),wb(s);for(const[o,a,c]of[[26.8,16.4,1],[6.6,14.2,2],[14.4,9,3]])dm(s,o,a,c);return{update(o){cm(o)},motes:fm(s,t)}}const Yn=s=>{const t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},Eb=["#6c6a3a","#7d7a45","#8f8a52","#5c5c33"].map(Yn),Qh=["#3d6b26","#4f7f2f","#5f9536","#79ad47","#335c21"].map(Yn),ep=["#2f5420","#355f22","#41702a","#2a4a1c"].map(Yn),Ab=["#5f5c57","#6d6a64","#7a766e","#55524d"].map(Yn),pm=["#2f3a1d","#3d4a25","#4a5530","#5a5a35"].map(Yn),np=["#3f3527","#4a3f2e","#55493a"].map(Yn),ip=["#e3c34a","#ece6d6","#5e6fd0","#c4473a","#b07ad0"].map(Yn);function Cb(){const s=Qu(),t=s.cols,e=s.rows,n=t*gi,i=e*gi,r=new Pe(n,i),o=re(s.seed??2026);for(let c=0;c<i;c++)for(let l=0;l<n;l++){const h=(l+.5)/gi,u=(c+.5)/gi,d=h+(te(h*.9,u*.9,9,2)-.5)*.75,f=u+(te(h*.9,u*.9,19,2)-.5)*.75,p=ri(Math.floor(d),Math.floor(f)),_=o();let g;if(p==="d"){const m=te(h*.6,u*.6,31,3);g=Ab[Math.min(3,Math.floor(m*3.2+_*.9))];const v=te(h*.55,u*.55,33,3);(Math.abs(v-.5)<.012||Math.abs(te(h*1.3,u*1.3,34,2)-.5)<.008)&&(g=Xe(h*3,u*3,35)>.55?Qh[1+Math.floor(_*3)]:Yn("#3a3733")),s.centerLine?.(h,u)&&(g=Yn("#b49a52")),te(h*.35,u*.35,37,2)>.74&&(g=_>.5?Yn("#7d6a4c"):Yn("#6a5a40"))}else if(p==="T")g=ep[Math.floor(_*ep.length)];else if(p==="w")g=np[Math.floor(_*np.length)];else if(p==="#")g=pm[Math.min(3,Math.floor(te(h*.7,u*.7,41,2)*3+_*1.2))];else{const m=te(h*.13,u*.13,3,3),v=m>.5?Qh:Eb,y=te(h*1.4,u*1.4,4,2);g=v[Math.min(v.length-1,Math.floor(y*v.length*.9+_*1.4))],m>.55&&_>.993?g=ip[Math.floor(o()*ip.length)]:_<.006&&(g=Yn("#6a5638"))}r.set(l,c,g)}for(const c of ib())for(let l=c.z0-.4;l<c.z1+.4;l+=1/gi)for(let h=c.x0-.4;h<c.x1+.4;h+=1/gi){const u=Math.max(c.x0-h,0,h-c.x1),d=Math.max(c.z0-l,0,l-c.z1),f=Math.hypot(u,d),p=.72+Math.min(1,f/.4)*.28,_=Math.floor(h*gi),g=Math.floor(l*gi);if(_<0||g<0||_>=n||g>=i)continue;const m=r.get(_,g);r.set(_,g,[m[0]*p,m[1]*p,m[2]*p])}const a=r.texture({repeat:!1,worldSize:!1});return a.wrapS=a.wrapT=Mn,a}let Ka=null;function Rb(){if(Ka)return Ka;const s=64,t=new Pe(s,s),e=re(99);for(let n=0;n<s;n++)for(let i=0;i<s;i++){const r=te(i*.09,n*.09,98,3),o=r>.5?Qh:pm;t.set(i,n,o[Math.min(o.length-1,Math.floor(e()*1.3+r*o.length*.8))])}return Ka=t.texture(),Ka}function mm(s){const{cols:t,rows:e,openings:n=[]}=Qu(),i=new be(t,e,t*4,e*4);i.rotateX(-Math.PI/2),i.translate(t/2,0,e/2);const r=i.attributes.position;for(let f=0;f<r.count;f++)r.setY(f,Qt(r.getX(f),r.getZ(f)));i.computeVertexNormals();const o=new K(i,new we({map:Cb(),roughness:1,metalness:0}));o.receiveShadow=!0,s.add(o);const a=new we({map:Rb(),roughness:1}),c=new we({color:"#2b2419",roughness:1,side:Ue}),l=new we({color:"#5f5c57",roughness:1}),h=40,u=f=>{let p=0,_=0;for(let g=.5;g<(f==="n"||f==="s"?t:e);g+=1){const[m,v]=f==="n"?[g,0]:f==="s"?[g,e]:f==="w"?[0,g]:[t,g];p+=Qt(m,v),_++}return p/_},d=[[-h,0,0,e,u("w")],[t,0,t+h,e,u("e")]];for(const f of["n","s"]){const p=f==="n"?-h:e,_=f==="n"?0:e+h,g=u(f);let m=-h;for(const v of n.filter(y=>y.side===f).sort((y,x)=>y.x0-x.x0)){d.push([m,p,v.x0,_,g]),m=v.x1;const y=Qt((v.x0+v.x1)/2,f==="n"?.01:e-.01);for(const C of[v.x0,v.x1]){const T=new K(new be(h,Math.max(.1,g-y+.05)),c);T.rotation.y=Math.PI/2,T.position.set(C,(g+y)/2,(p+_)/2),s.add(T)}const x=new K(new be(v.x1-v.x0,h),l);x.rotation.x=-Math.PI/2,x.position.set((v.x0+v.x1)/2,y+.01,(p+_)/2),x.receiveShadow=!0,s.add(x)}d.push([m,p,t+h,_,g])}for(const[f,p,_,g,m]of d){const v=f===t?t-.5:f,y=_===0?.5:_,x=p===e?e-.5:p,C=g===0?.5:g,T=new K(Ac(y-v,C-x),a);T.rotation.x=-Math.PI/2,T.position.set((v+y)/2,m-.02,(x+C)/2),T.receiveShadow=!0,s.add(T)}}function Pb(s,t,e,n,i,r,o){const a=new rn({transparent:!0,uniforms:{uTime:{value:0},bankA:{value:n+.4},bankB:{value:r-.6},deep:{value:new lt(t?"#0b1a24":"#1d3a38")},shallow:{value:new lt(t?"#1d3346":"#4f7a6a")},sky:{value:new lt(t?"#5f7fb0":"#e8d6b0")},fogColor:{value:new lt},fogDensity:{value:0}},vertexShader:`
      varying vec3 vW; varying float vFog;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vec4 mv = viewMatrix * w;
        vFog = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform float uTime, fogDensity, bankA, bankB; uniform vec3 deep, shallow, sky, fogColor;
      varying vec3 vW; varying float vFog;
      float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec2 p = floor(vW.xz * 16.0) / 16.0; // ripples snap to the 16-texel world grid
        float rip = sin(p.x * 3.1 + uTime * 1.3 + sin(p.y * 2.0)) * 0.5 + sin(p.y * 4.3 - uTime * 0.9 + p.x) * 0.5;
        float band = smoothstep(0.78, 1.0, rip) * (0.5 + 0.5 * sin(p.x * 0.73 + p.y * 1.9 + uTime * 0.35));
        // depth: shallower near the banks (z 24 / 27)
        float edge = min(abs(p.y - bankA), abs(p.y - bankB));
        vec3 col = mix(shallow, deep, smoothstep(0.1, 1.2, edge));
        col = mix(col, sky, band * 0.1);
        // pixel-snapped sun glints
        vec2 q = floor(p * 16.0);
        float g = step(0.985, h(q + floor(uTime * 3.0))) * band;
        col += sky * g * 1.2;
        float f = 1.0 - exp(-fogDensity * fogDensity * vFog * vFog);
        col = mix(col, fogColor, f);
        gl_FragColor = vec4(col, 0.88);
      }`}),c=new be(i-e,r-n,1,1);c.rotateX(-Math.PI/2);const l=new K(c,a);return l.position.set((e+i)/2,o,(n+r)/2),s.add(l),h=>{a.uniforms.uTime.value=h;const u=s.fog;u&&(a.uniforms.fogColor.value.copy(u.color),a.uniforms.fogDensity.value=u.density)}}function Ib(){const s=[],t=[],e=[],n=new lt("#1e3a14"),i=new lt("#9fd05a");for(let o=0;o<3;o++){const a=o/3*Math.PI+.3,c=Math.cos(a)*.07,l=Math.sin(a)*.07,h=(o-1)*.08,u=[[-c,0,-l,0],[c,0,l,0],[h*.5-c*.4,.55,-l*.4,.55],[c,0,l,0],[h*.5+c*.4,.55,l*.4,.55],[h*.5-c*.4,.55,-l*.4,.55],[h*.5-c*.4,.55,-l*.4,.55],[h*.5+c*.4,.55,l*.4,.55],[h,1,0,1]];for(const[d,f,p,_]of u){s.push(d,f,p);const g=n.clone().lerp(i,_);t.push(g.r,g.g,g.b),e.push(0,1,0)}}const r=new Zt;return r.setAttribute("position",new It(s,3)),r.setAttribute("color",new It(t,3)),r.setAttribute("normal",new It(e,3)),r}function sp(s,t){const e=new Or({vertexColors:!0,side:Ue});return e.onBeforeCompile=n=>{n.uniforms.uTime=s,n.vertexShader=`uniform float uTime;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vec2 ip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
       float wv = sin(uTime * 1.5 + ip.x * 0.55 + ip.y * 0.35) * 0.6 + sin(uTime * 2.9 + ip.x * 1.7) * 0.25;
       float k = position.y * position.y * ${t.toFixed(3)};
       transformed.x += wv * k;
       transformed.z += wv * k * 0.4;`)},e}function gm(s){const t={value:0},e=re(77),n=Ib(),i=[],{cols:r,rows:o}=Qu(),a=["#cfe8a0","#e8f0b8","#b8d890","#f0e8a8"],c=["#d8e0a0","#c8d890","#e8d898","#b0c880"];for(let x=0;x<o;x++)for(let C=0;C<r;C++){const T=ri(C,x),A=T==="T"?30:T==="g"?te(C*.13,x*.13,3,3)>.5?6:3:T==="#"?5:0;for(let I=0;I<A;I++){const S=C+e(),M=x+e();if(wh(S,M))continue;const D=T==="T"||T==="#";i.push({x:S,z:M,s:D?.55+e()*.45:.22+e()*.2,c:new lt(D?a[Math.floor(e()*4)]:c[Math.floor(e()*4)])})}}for(let x=1;x<o-1;x++)for(let C=1;C<r-1;C++)if(!(ri(C,x)!=="g"||![[1,0],[-1,0],[0,1],[0,-1]].some(([A,I])=>ri(C+A,x+I)==="d")))for(let A=0;A<4;A++){const I=C+e(),S=x+e();wh(I,S)||i.push({x:I,z:S,s:.35+e()*.3,c:new lt(a[Math.floor(e()*4)])})}const l=new hs(n,sp(t,.16),i.length),h=new Wt,u=new dn,d=new En;i.forEach((x,C)=>{d.set(0,e()*Math.PI*2,0),u.setFromEuler(d),h.compose(new b(x.x,Qt(x.x,x.z)-.02,x.z),u,new b(x.s*1.1,x.s,x.s*1.1)),l.setMatrixAt(C,h),l.setColorAt(C,x.c)}),l.receiveShadow=!0,s.add(l);const f=[],p=["#5a6ee0","#d8483a","#f0c63a","#f2ece0","#b97ae0"];for(let x=0;x<900;x++){const C=1+e()*(r-2),T=1+e()*(o-2),A=ri(Math.floor(C),Math.floor(T));if(A!=="g"&&A!=="T"||te(C*.13,T*.13,3,3)<.52&&e()>.25||wh(C,T))continue;const S=Math.floor(te(C*.25,T*.25,88,2)*p.length);f.push({x:C,z:T,s:.16+e()*.1,c:new lt(p[(S+(e()>.8?1:0))%p.length])})}const _=new Ki(.11,0);_.translate(0,.32,0);const g=new Fn(.012,.012,.32,3);g.translate(0,.16,0);const m=sp(t,.5);m.vertexColors=!1;const v=new hs(_,m,f.length),y=new hs(g,new Or({color:"#3f6b28"}),f.length);return f.forEach((x,C)=>{h.compose(new b(x.x,Qt(x.x,x.z),x.z),u.identity(),new b(x.s*4,x.s*4,x.s*4)),v.setMatrixAt(C,h),v.setColorAt(C,x.c),y.setMatrixAt(C,h)}),v.receiveShadow=y.receiveShadow=!0,s.add(v,y),x=>{t.value=x}}async function td(s){return await fetch(`./world/${s}.json`).then(t=>t.json())}function ed(s){return[...s.npcs??[],...(s.trainers??[]).map(t=>({...t,lines:t.lines??(t.bark?[t.bark.replace(/^[^:]+:\s*/,"")]:[])}))]}const Lb=async(s,t)=>{Ku(xb);const e=await td("the-field"),n=[cb(s,16.4,10.8,t),hb(s,12.4,10.9),jf(s,7.5,11.1,0,t),ob(s,28.9,11),ub(s,[34,35.7,37.3],11.4),ab(s,10.3,20.9),jf(s,15.8,20.9,1,t),am(s,25.5,20.6),lb(s,32.5,21.9),fb(s,32.6,23.2,37.8,26.6),db(s,20.5,17.2,t),pb(s)],i=Tb(s,t);mm(s);const r=Pb(s,t,.6,23.7,19.2,27.3,_b),o=gm(s),a=e.signs?.[0];return{id:"field",title:"THE FIELD",sub:t?"Ohmstead surface · after dark":"Ohmstead surface",mood:t?rm:sm,sky:!0,cam:{x0:8.2,x1:Un-8.2,z0:4.2,z1:$n-4.6},blocked:(c,l,h)=>mb(c,l,h),ground:(c,l)=>Math.max(Qt(c,l),-.1),wild:(c,l)=>ri(Math.floor(c),Math.floor(l))==="T",spawns:{start:{x:e.spawn.x+.5,z:e.spawn.y+.3,face:"S"},lift:{x:20.5,z:18.3,face:"S"},north:{x:20.5,z:1.1,face:"S"}},triggers:[{x0:18.6,z0:-2,x1:22.4,z1:.3,go:{to:"farmroad",spawn:"south"}}],things:[...a?[{x:22.7,z:16.7,height:1.5,label:"Read",say:{name:"Sign",lines:[a.text]}}]:[],{x:20.5,z:17.1,height:2.6,label:"Ride down",reach:1.3,say:{lines:["The cage rattles shut. Down to Ohmstead."]},go:{to:"ohmstead",spawn:"lift"}}],npcs:ed(e),update(c,l){r(c),o(c);for(const h of n)h.update?.(c);i.update?.(c),i.motes(c,l)}}},xn=28,yn=30,cs=Array.from({length:yn},()=>Array.from({length:xn},()=>"g")),_m=(s,t)=>s>=0&&t>=0&&s<xn&&t<yn,di=(s,t,e,n,i)=>{for(let r=t;r<t+n;r++)for(let o=s;o<s+e;o++)_m(o,r)&&(cs[r][o]=i)};for(let s=0;s<yn;s++)cs[s][0]=cs[s][1]=cs[s][xn-1]=cs[s][xn-2]="#";for(let s=0;s<xn;s++)cs[0][s]="#",cs[yn-1][s]="#";di(12,yn-1,3,1,"d");di(12,22,3,8,"d");di(12,20,9,3,"d");di(18,10,3,12,"d");di(8,8,13,3,"d");di(8,1,3,9,"d");di(8,0,3,1,"d");di(4,14,6,5,"T");di(20,14,5,6,"T");di(12,4,6,4,"T");di(4,24,5,3,"T");const xm=(s,t)=>_m(s,t)?cs[t][s]:"#",oi=24.3,il=12.15,sl=14.85;function Db(s,t){let e=(te(s*.1,t*.1,15,3)-.5)*.5;e*=1-Jh(xm,"d",s,t)*.85,e-=Po.smoothstep(t,oi-.05,oi+.2)*.55;const n=Math.min(s-1.2,xn-1.2-s,t,yn-t);return n<1.4&&(e+=(1.4-n)*.5),t<1.6&&s>7.6&&s<11.4&&(e=Math.min(e,.05)),t>yn-1.6&&s>11.6&&s<15.4&&(e=Math.min(e,-.5)),e}const Ub={cols:xn,rows:yn,cell:xm,height:Db,seed:4202,openings:[{side:"n",x0:7.6,x1:11.4},{side:"s",x0:11.6,x1:15.4}]};function Nb(s,t,e,n,i){if(s-e<.15||s+e>xn-.15||t<-.2||t-e<.05&&!(s>8.2&&s<10.8)||t+e>yn-.05&&!(s>12.2&&s<14.8))return!0;for(const[r,o]of[[-e,-e],[e,-e],[-e,e],[e,e],[0,0]]){const a=t+o;if(!(a<0||a>=yn)&&ri(Math.floor(s+r),Math.floor(a))==="#")return!0}return i>=oi&&t-e*.5<oi||i<oi&&t+e*.5>=oi&&!(s>il&&s<sl)?!0:ju(s,t,e)}function Fb(s,t,e){const n=new At,i=5,r=3.2,o=2.8;n.add(U(i+.12,.6,r+.12,z.concrete(),0,-.55,0)),n.add(U(i,o,r,z.tin()));const a=Cc(Pc([[-r/2,o],[r/2,o],[0,o+1]]),i,z.tin());a.rotation.y=Math.PI/2,n.add(a);const c=new At;c.add(Si(-r/2-.3,o-.15,0,o+1,i+.4,z.tin())),c.add(Si(0,o+1,r/2+.3,o-.15,i+.4,z.tin())),c.rotation.y=Math.PI/2,n.add(c),n.add(U(1.5,5.2,1.6,z.tin(),i/2-.2,0,-.4)),n.add(Si(i/2-1.05,5.2,i/2+.65,5.55,1.8,z.tin()).translateZ(-.4)),Zn(n,i/2-.2,3.7,.41,.5,.5,0,"boarded");for(const _ of[-1.6,-.5]){const g=new K(Ve(.42,.08,1.1,14),z.steel());g.position.set(_,o+1.65,-.3),n.add(Ht(g)),n.add(oe(.42,.42,.55,z.steel(),_,o+2.2,-.3,14)),n.add(oe(.1,.1,.5,z.steel(),_,o+2.75,-.3,8))}n.add(Te(new b(-1.6,o+3.15,-.3),new b(i/2-.3,o+2.6,-.3),.16,z.tank()));const l=Te(new b(-i/2+.2,o+.4,.6),new b(-i/2-1.5,o-.3,1.6),.22,z.tank());n.add(l),n.add(oe(.14,.2,.9,z.steel(),-i/2-1.55,o-1.2,1.65,10));const h=r/2+.01;n.add(U(1.8,2.1,.04,z.dark(),-.6,0,h)),n.add(U(1,2.1,.08,z.tin(),-1.05,0,h+.04)),n.add(U(2.4,.08,.08,z.steel(),-.6,2.12,h+.06)),n.add(U(.7,1.6,.05,z.wood(),1.2,0,h));const u=new K(new be(2.6,.55),new we({map:Ji("CO-OP GIN",{w:96,h:20,fg:"#e8e0cc",font:"bold 15px monospace",worn:.45,seed:41}),transparent:!0,alphaTest:.4,roughness:1}));u.position.set(-.3,2.45,h+.02),n.add(u);const d=new At;d.add(U(1.4,.5,2.2,z.tin(),0,.35,0));for(let _=0;_<4;_++)d.add(U(.05,.6,2.2,z.steel(),-.7+_%2*1.4,.85,0));const f=Gt("#e4ddd0",{roughness:1}),p=re(77);for(let _=0;_<22;_++){const g=new K(new Ki(.18+p()*.12,1),f);g.scale.y=.7,g.position.set((p()-.5)*1.1,.95+p()*.35,(p()-.5)*1.9),d.add(Ht(g))}for(const[_,g]of[[-.6,-.9],[.6,-.9],[-.6,.9],[.6,.9]]){const m=new K(Ve(.26,.26,.15,10),Gt("#1d1b19"));m.rotation.z=Math.PI/2,m.position.set(_*1.12,.26,g),d.add(Ht(m))}d.position.set(-i/2-1.5,0,1.7),d.rotation.y=.08,n.add(d);for(const[_,g,m]of[[i/2+.75,.9,0],[i/2+.75,1.75,0],[i/2+.75,1.3,.62]])n.add(U(.75,.6,.8,Gt("#cfc6b0",{roughness:1}),_,m,g));return Le(n,-i/2-.07,0,-.5,2,2.2,-Math.PI/2),Le(n,1.9,0,h+.03,1,2.6),Le(n,i/2-.2,2.2,.42,1.1,2.4),Ri(n,t,e,i,r,s),vt(t-i/2,e-r/2,t+i/2+.2,e+r/2),vt(t-i/2-2.3,e+.4,t-i/2-.7,e+2.9),vt(t+i/2+.3,e+.4,t+i/2+1.2,e+2.2),{}}function Ob(s,t,e,n){const i=new At,r=z.wood(),o=Gt("#5a4a3c",{metalness:.5,roughness:.55}),a=re(31);for(let c=e;c<n;c+=.55){if(a()<.12)continue;const l=U(.22,.08,1.5,r,c,Qt(c,t)-.03,t+(a()-.5)*.08);l.rotation.y=(a()-.5)*.12,i.add(l)}for(const c of[-.45,.45]){const l=Math.ceil((n-e)/1.5);for(let h=0;h<l;h++){const u=e+h*1.5,d=Math.min(n,u+1.5);i.add(Te(new b(u,Qt(u,t+c)+.1,t+c),new b(d,Qt(d,t+c)+.1,t+c),.07,o))}}s.add(i)}function Bb(s,t,e){const n=new At,i=4.2,r=1.5,o=1.9;n.add(U(i,o,r,z.barn(),0,.55,0)),n.add(U(i+.1,.12,r+.1,z.tank(),0,.5,0));const a=new K(Ve(r*.62,r*.62,i,16),z.tank());a.rotation.z=Math.PI/2,a.scale.set(1,1,.3),a.position.set(0,.55+o-.05,0),n.add(Ht(a)),n.add(U(1.3,1.6,.04,z.dark(),.2,.7,r/2+.01)),n.add(U(1.3,1.6,.07,z.barn(),1.45,.7,r/2+.06));for(const l of[-1.5,1.5])for(const h of[-.5,.5]){const u=new K(Ve(.26,.26,.12,10),Gt("#2a221c",{metalness:.4}));u.rotation.x=Math.PI/2,u.position.set(l,.32,h),n.add(Ht(u))}const c=new K(new be(1.6,.4),new we({map:Ji("TEXAS & PACIFIC",{w:96,h:16,fg:"#e8dcc0",font:"bold 10px monospace",worn:.35,seed:5}),transparent:!0,alphaTest:.4,roughness:1}));c.position.set(-1.1,1.95,r/2+.02),n.add(c),Le(n,-1.9,.55,r/2+.05,1.2,1.4),Le(n,1.4,1.2,r/2+.1,.9,1.1),n.position.set(t,Qt(t,e)-.05,e),n.rotation.y=.04,s.add(n),vt(t-i/2,e-r/2,t+i/2,e+r/2)}function zb(s,t,e){const n=new At;n.add(U(.1,2.1,.1,z.steel(),0,0,0));const i=new we({map:Ji("RAILROAD",{w:64,h:12,bg:"#e8e2d2",fg:"#1d1b19",font:"bold 9px monospace",worn:.2}),roughness:1});for(const r of[.6,-.6]){const o=new K(Ti(1.2,.2,.03),[z.steel(),z.steel(),z.steel(),z.steel(),i,z.steel()]);o.position.set(0,1.75,.07),o.rotation.z=r,n.add(Ht(o))}n.position.set(t,Qt(t,e),e),n.rotation.z=.06,s.add(n),vt(t-.15,e-.15,t+.15,e+.15)}function lo(s,t,e){const n=new At,i=re(e),r=Gt("#6a6560",{metalness:.5,roughness:.6}),o=[];for(let a=0;a<t.length-1;a++){const[c,l]=t[a],[h,u]=t[a+1],d=Math.max(1,Math.round(Math.hypot(h-c,u-l)/1.4));for(let f=0;f<=d;f++){if(a>0&&f===0)continue;const p=c+(h-c)*f/d,_=l+(u-l)*f/d;o.push(new b(p,Qt(p,_),_))}}o.forEach((a,c)=>{const l=U(.09,.95,.09,z.wood(),a.x,a.y-.05,a.z);if(l.rotation.set((i()-.5)*.15,0,(i()-.5)*.18),n.add(l),c===o.length-1||i()<.08)return;const h=o[c+1];for(const u of[.3,.55,.8]){const d=a.clone().lerp(h,.5);d.y-=.07;const f=new Gr(new b(a.x,a.y+u,a.z),new b(d.x,d.y+u,d.z),new b(h.x,h.y+u,h.z));n.add(new K(new tr(f,6,.01,3,!1),r))}}),s.add(n)}function rp(s,t,e,n){const i=new At;for(const a of[-.45,.45])i.add(U(.07,1.7,.07,z.steel(),a,0,0));const r=new we({map:Ji(n,{w:64,h:20,bg:"#2f5a3a",fg:"#e8eadc",font:"bold 11px monospace",worn:.18,seed:9}),roughness:.8}),o=new K(Ti(1.3,.48,.04),[z.steel(),z.steel(),z.steel(),z.steel(),r,z.steel()]);o.position.set(0,1.55,.04),o.rotation.z=-.07,i.add(Ht(o)),Le(i,-.5,0,.06,.4,.9),i.position.set(t,Qt(t,e),e),s.add(i),vt(t-.55,e-.1,t+.55,e+.1)}function kb(s,t){const e=new At;e.add(U(2.4,.45,1.2,z.wood(),0,.5,0));const n=Gt("#d9cfb6",{roughness:1,side:Ue}),i=new K(new Fn(.66,.66,2.2,12,1,!0,-Math.PI/2,Math.PI),n);i.rotation.z=Math.PI/2,i.position.set(0,.95,0),e.add(Ht(i));for(const p of[-.75,0,.75]){const _=new K(new Tn(.67,.025,4,12,Math.PI),z.wood());_.rotation.y=Math.PI/2,_.position.set(p,.95,0),e.add(_)}e.add(U(.5,.35,.02,Gt("#a89c80",{roughness:1}),-.4,1.3,.62));for(const[p,_]of[[-.85,.62],[.85,.62],[-.85,-.62],[.85,-.62]]){const g=new K(new Tn(.33,.04,4,14),z.wood());g.position.set(p,.36,_),e.add(Ht(g));for(let m=0;m<4;m++){const v=U(.03,.62,.03,z.wood(),0,-.31,0),y=new At;y.position.set(p,.36,_),y.rotation.z=m/4*Math.PI,y.add(v),e.add(y)}}e.add(Te(new b(1.2,.55,0),new b(2.2,.1,0),.07,z.wood())),e.add(U(.5,.4,.4,z.wood(),-.6,.95,.1)),e.position.set(22.3,Qt(22.3,26.4),26.4),e.rotation.y=-.12,s.add(e),vt(21,25.7,24.6,27.1);const r=new At;r.add(U(1.5,.08,.65,Gt("#7b8a6a",{roughness:1}),0,.38,0));for(const[p,_]of[[-.68,-.28],[.68,-.28],[-.68,.28],[.68,.28]])r.add(U(.05,.38,.05,z.wood(),p,0,_));r.add(U(.45,.42,.35,z.steel(),1.15,0,-.1));const o=new K(new on(.035,6,4),Gt("#7dff9a",{emissive:"#3dff7a",emissiveIntensity:3}));o.position.set(1.15,.47,.08),r.add(o),r.add(Te(new b(.95,.2,0),new b(.6,.42,.1),.03,Gt("#151515"))),r.position.set(17.4,Qt(17.4,26.6),26.6),s.add(r),vt(16.6,26.2,18.8,27);const a=new At,c=re(9);for(let p=0;p<8;p++){const _=p/8*Math.PI*2,g=new K(new wi(.13,0),z.concrete());g.position.set(Math.cos(_)*.38,.05,Math.sin(_)*.38),g.rotation.set(c(),c(),c()),a.add(Ht(g))}for(const p of[.3,1.9,3.6]){const _=new K(Ve(.05,.05,.6,6),le("bark",he.bark()));_.rotation.set(Math.PI/2-.3,p,0),_.position.set(Math.cos(p)*.1,.1,Math.sin(p)*.1),a.add(Ht(_))}const l=new An({color:"#ffb347",transparent:!0,opacity:.9,blending:ds,depthWrite:!1,side:Ue}),h=[];for(let p=0;p<3;p++){const _=new K(new gs(.16,.55,5,1,!0),l);_.position.set((p-1)*.07,.35,0),a.add(_),h.push(_)}const u=new Xr("#ff9a40",t?10:3,6,1.6);u.position.set(0,.6,0),a.add(u);const d=19.6,f=27.75;return a.position.set(d,Qt(d,f),f),s.add(a),vt(d-.45,f-.4,d+.45,f+.4),{update(p){h.forEach((_,g)=>{const m=.75+Math.sin(p*13+g*2.1)*.15+Math.sin(p*7.3+g)*.1;_.scale.set(1,m,1)}),u.intensity=(t?10:3)*(.85+Math.sin(p*11)*.1+Math.sin(p*4.7)*.05),o.visible=Math.floor(p*1.2)%2===0}}}function Vb(s){const t=new At,e=re(24);for(let n=1.8;n<xn-1.8;n+=.32){if(n>il-.1&&n<sl+.1)continue;const i=new K(new wi(.15+e()*.1,0),z.concrete());i.position.set(n,Qt(n,oi)+.02,oi+(e()-.5)*.1),i.scale.y=.75,i.rotation.set(e()*3,e()*3,e()*3),t.add(Ht(i))}t.add(U(sl-il+.2,.55,.16,Gt("#4a4743",{roughness:1}),(il+sl)/2,Qt(13.5,oi+.3)-.02,oi+.12)),s.add(t)}const Hb=async(s,t)=>{Ku(Ub);const e=await td("farmroad"),n=[Fb(s,23,5.4),am(s,5.5,8.5),kb(s,t)];Ob(s,2.4,-4,xn+4),Bb(s,15.8,2.4),zb(s,11.6,3.4),rp(s,7.2,4.6,"RAILHEAD ^"),rp(s,15.9,27.8,"THE FIELD"),um(s,6.2,20.6),Vb(s),lo(s,[[3.6,13.6],[10.4,13.6],[10.4,19.3]],1),lo(s,[[17.6,11.2],[17.6,18.8]],2),lo(s,[[21.5,13.5],[25.4,13.5]],3),lo(s,[[11.6,3.9],[11.6,7.8],[17.8,7.8]],4),lo(s,[[3.6,23.6],[9.6,23.6]],5);const i=re(808);let r=3e3;const o=(l,h=.25)=>{s.add(l),vt(l.position.x-h,l.position.z-h,l.position.x+h,l.position.z+h)};for(let l=-2;l<yn+3;l+=1.1+i()*.9)o(qn(.6+i()*.8,l,1+i()*.45,r++)),s.add(qn(-1.2-i()*2.5,l+i(),1.1+i()*.4,r++)),o(qn(xn-.6-i()*.8,l,1+i()*.45,r++)),s.add(qn(xn+1.2+i()*2.5,l+i(),1.1+i()*.4,r++));for(let l=1;l<xn-1;l+=1.3+i()*1.1)l>7&&l<12||s.add(qn(l,-.5-i()*1.6,1.1+i()*.4,r++)),l>11&&l<16||(s.add(So(l,yn-.2+i()*.6,1+i()*.5,r++,i()>.5)),i()>.35&&s.add(qn(l+i()*.6,yn+2.3+i()*1.2,.75+i()*.3,r++)));for(const[l,h,u]of[[4.5,6.5,"m"],[23.5,12.5,"c"],[22.5,23.6,"m"],[10.5,12.5,"d"],[25,20.8,"m"],[3,11,"c"],[16.5,22.8,"c"]])o(u==="c"?qn(l,h,1,r++):u==="m"?nl(l,h,1.1,r++):hm(l,h,1,r++));for(let l=0;l<30;l++){const h=2.5+i()*(xn-5),u=1.5+i()*(yn-3);ri(Math.floor(h),Math.floor(u))!=="g"||Math.abs(u-oi)<.6||o(So(h,u,.5+i()*.45,r++,i()>.5),.15)}for(const[l,h,u]of[[14.7,24.6,1],[23,17,2],[6,21.2,3]])dm(s,l+.5,h+.5,u);mm(s);const a=gm(s),c=fm(s,t);return{id:"farmroad",title:"THE FARM ROAD",sub:"North to the Railhead",mood:t?rm:sm,sky:!0,cam:{x0:8.2,x1:xn-8.2,z0:4.4,z1:yn-4.6},blocked:Nb,ground:(l,h)=>Qt(l,h),wild:(l,h)=>ri(Math.floor(l),Math.floor(h))==="T",spawns:{start:{x:13.5,z:28.4,face:"N"},south:{x:13.5,z:28.9,face:"N"},north:{x:9.5,z:.9,face:"S"}},triggers:[{x0:11.6,z0:29.6,x1:15.4,z1:32,go:{to:"field",spawn:"north"}},{x0:7.6,z0:-2,x1:11.4,z1:.3,say:{lines:["The road runs on north to the Railhead."]}}],things:[{x:17.4,z:26.6,height:1,label:"Rest",say:{lines:["A field medic tops off your Ohms. Recharged. Stay current."]}},{x:5.5,z:9.6,height:1.8,label:"Look",reach:1.5,say:{lines:["The old water tower. Its ladder still holds — a lookout over the whole road."]}}],npcs:ed(e),update(l,h){a(l),cm(l);for(const u of n)u.update?.(l);c(l,h)}}},Je=s=>{const t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]},Ye=(s,t,e)=>[s[0]+(t[0]-s[0])*e,s[1]+(t[1]-s[1])*e,s[2]+(t[2]-s[2])*e],Ln=(s,t)=>[s[0]*t,s[1]*t,s[2]*t],De={steel:Je("#566068"),steelLight:Je("#7c8790"),steelDark:Je("#2b3136"),plate:Je("#68727a"),rust:Je("#7c4424"),rustLight:Je("#a8622e"),grime:Je("#23211d"),hazard:Je("#d2a22a"),moss:Je("#4f7a2c"),mossLight:Je("#7aa83c"),black:Je("#0b0c0e")},op=new Map,nd=(s,t)=>{let e=op.get(s);return e||(e=t(),op.set(s,e)),e};function vm(){return nd("ohm-wall",()=>{const e=new Pe(32,48),n=re(51),i=[.95,1.05,.9,1];for(let r=0;r<48;r++)for(let o=0;o<32;o++){const a=47-r,c=Math.floor(o/16)+(a>=19?2:0);let l=Ln(De.steel,i[c%4]*(.94+Xe(o*.5,r*.5,52)*.1));const h=o%16;h===0?l=De.steelDark:h===1&&(l=Ln(De.steelLight,.95)),a===19&&(l=De.steelDark),a===20&&(l=Ln(De.steelLight,.92)),a<8&&(l=Ln(De.steel,.62+(a===7?.25:0))),a<8&&(o+a)%8<1&&(l=Ln(De.steel,.5)),(h===3||h===13)&&a%6===3&&a>8&&(l=a===9?De.steelLight:Ye(De.steelLight,De.steel,.3));const u=Xe(o*1.1,r*.08,53);u>.8&&a>6&&(l=Ye(l,De.rust,(u-.8)*3));const d=te(o*.15,r*.15,54,3);a<14&&(l=Ye(l,De.grime,Math.max(0,(14-a)/14)*.45*d)),n()<.01&&(l=Ln(l,.8)),e.set(o,r,l)}return e.texture()})}function ym(){return nd("ohm-cap",()=>{const t=new Pe(16,16);for(let e=0;e<16;e++)for(let n=0;n<16;n++){const i=Ln(Je("#121417"),.85+Xe(n*.6,e*.6,55)*.3);t.set(n,e,i)}return t.texture()})}function Mm(){return nd("ohm-rock",()=>{const t=new Pe(32,32);for(let e=0;e<32;e++)for(let n=0;n<32;n++){const i=te(n*.18,e*.18,56,3);let r=Ye(Je("#3a3430"),Je("#6a5e52"),i);Math.abs(te(n*.12,e*.12,57,2)-.5)<.025&&(r=Je("#1e1a17")),i>.7&&(r=Ye(r,Je("#8a7a66"),.5)),t.set(n,e,r)}return t.texture()})}function ap(s){return s.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_MAP
      {
        mat4 im = mat4(1.0);
        #ifdef USE_INSTANCING
        im = instanceMatrix;
        #endif
        vec3 wp = (modelMatrix * im * vec4(transformed, 1.0)).xyz;
        vec3 wn = abs(normalize(mat3(modelMatrix * im) * objectNormal));
        vec2 w = wn.y > 0.5 ? wp.xz : (wn.x > 0.5 ? wp.zy : wp.xy);
        vMapUv = (mapTransform * vec3(w, 1.0)).xy;
      }
      #endif`)},s.customProgramCacheKey=()=>"worldUV",s}const Z={wall:()=>le("ohm-wall-mat",vm(),{metalness:.35,roughness:.7}),cap:()=>le("ohm-cap-mat",ym(),{roughness:1}),rock:()=>le("ohm-rock-mat",Mm(),{roughness:1}),steel:()=>le("steel",he.steel(),{metalness:.35,roughness:.65}),rust:()=>le("rustTank",he.rustTank(),{metalness:.25,roughness:.7}),wood:()=>le("oldWood",he.oldWood()),deck:()=>le("deck",he.deck()),concrete:()=>le("concrete",he.concrete()),hazard:()=>le("hazard",he.hazard()),dark:()=>Gt("#101113",{roughness:1}),paintRed:()=>Gt("#8a2e24",{roughness:.6,metalness:.3}),paintGreen:()=>Gt("#3f5a3c",{roughness:.7,metalness:.2}),paintBlue:()=>Gt("#34506a",{roughness:.7,metalness:.2}),cloth:s=>Gt(s,{roughness:1,side:Ue}),vine:()=>le("vines",he.vines(),{alphaTest:.5,side:Ue}),leaves:()=>le("leaves-flat",he.leaves(),{roughness:.95,flatShading:!0})};function lp(s=!1){const t=ap(new we({map:s?Mm():vm(),metalness:s?0:.35,roughness:s?1:.7})),e=ap(new we({map:ym(),roughness:1}));return[t,t,e,e,t,t]}function Gb(s,t,e,n){const r=s*16,o=t*16,a=new Pe(r,o),c=re(77),l=new Map;for(let u=0;u<o;u++)for(let d=0;d<r;d++){const f=(d+.5)/16,p=(u+.5)/16,_=Math.floor(f),g=Math.floor(p);if(!e(_,g)){a.set(d,u,De.black);continue}const m=Math.floor(f/2),v=Math.floor(p/2),y=v*1e3+m;let x=l.get(y);x===void 0&&(x=.86+c()*.22,l.set(y,x));const C=d%32,T=u%32;let A=Ln(De.plate,x*(.95+Xe(d*.4,u*.4,61)*.08));(m+v)%3===0&&(C+T)%6===0&&(A=Ln(A,1.18)),(m+v)%3===0&&(C-T+64)%6===0&&(A=Ln(A,.86)),C===0||T===0?A=De.steelDark:(C===1||T===1)&&(A=Ln(De.steelLight,x*.9)),(C===3||C===29)&&(T===3||T===29)&&(A=De.steelLight),(C===4||C===30)&&(T===4||T===30)&&(A=De.steelDark);const I=te(f*.35,p*.35,62,3);A=Ye(A,De.grime,Math.max(0,I-.5)*.7),te(f*.6,p*.6,63,2)>.85&&(A=Ye(A,Je("#1f1c17"),.4));const S=te(f*.25,p*.25,64,3);S>.66&&(A=Ye(A,S>.74?De.rust:De.rustLight,Math.min(1,(S-.66)*4)*.7)),(C<=1||T<=1)&&te(f*.3,p*.3,65,2)>.7&&Xe(d*.7,u*.7,66)>.55&&(A=c()<.5?De.moss:De.mossLight),a.set(d,u,n(f,p,A))}const h=a.texture({repeat:!1,worldSize:!1});return h.wrapS=h.wrapT=Mn,h}class Wb{lights=[];lamps=[];constructor(t,e=10){for(let n=0;n<e;n++){const i=new Xr("#ffffff",0,6,1.7);t.add(i),this.lights.push(i)}}add(t){this.lamps.push(t)}update(t,e){const n=this.lamps.map(i=>({l:i,d:(i.pos.x-e.x)**2+((i.pos.z-e.z)*1.3)**2})).sort((i,r)=>i.d-r.d);this.lights.forEach((i,r)=>{const o=n[r];if(!o){i.intensity=0;return}const{l:a}=o;i.position.copy(a.pos),i.color.copy(a.color),i.distance=a.dist;const c=a.flicker?1-a.flicker*(.5+.5*Math.sin(t*23+a.pos.x*7)*Math.sin(t*5.1+a.pos.z)):1,l=Po.clamp(1.6-Math.sqrt(o.d)/11,0,1);i.intensity=a.intensity*c*l})}}function _n(s,t){return Gt(s,{emissive:s,emissiveIntensity:t,roughness:.4})}function Xb(s,t,e,n,i=2.1,r=!0){s.add(U(.1,.1,.32,Z.steel(),e,i+.1,n+.16)),s.add(U(.26,.05,.26,Z.steel(),e,i+.2,n+.36));const o=new K(new on(.09,8,6),_n(r?"#ffcf7a":"#bfe8ff",5));o.position.set(e,i+.08,n+.36),s.add(o);const a=new K(new Fn(.13,.13,.22,6,1,!0),new we({color:"#202428",wireframe:!0}));a.position.set(e,i+.08,n+.36),s.add(a),t.add({pos:new b(e,i,n+.7),color:new lt(r?"#ffb35c":"#9ad8ff"),intensity:r?11:8,dist:8,flicker:Math.random()<.12?.6:0})}function qb(s,t,e,n,i=!0,r=2.5){s.add(U(.015,3.5,.015,Gt("#111214"),e,r+.2,n));const o=new K(Ve(.07,.3,.2,10,!0),Gt("#3d5248",{side:Ue,metalness:.4,roughness:.5}));o.position.set(e,r+.1,n),s.add(o);const a=new K(new on(.08,8,6),_n(i?"#ffd590":"#cfeeff",5));a.position.set(e,r-.02,n),s.add(a),t.add({pos:new b(e,r-.3,n),color:new lt(i?"#ffc477":"#a8dcff"),intensity:12,dist:9})}function Yb(s,t,e,n,i){const r=e.clone().lerp(n,.5);r.y-=.35;const o=new Gr(e,r,n);s.add(new K(new tr(o,12,.012,3,!1),Gt("#15161a")));const a=_n("#ffd590",4);for(let c=1;c<i;c++){const l=o.getPoint(c/i),h=new K(new on(.06,6,4),a);h.position.copy(l).add(new b(0,-.07,0)),s.add(h)}t.add({pos:r.clone().add(new b(0,-.2,0)),color:new lt("#ffc477"),intensity:6,dist:7})}function Eh(s,t,e,n,i,r,o){const a=i-e,c=r-n,l=(e+i)/2,h=(n+r)/2;s.add(U(a,.42,c,Z.steel(),l,0,h)),s.add(U(a-.12,.05,c-.12,Gt("#2a1f16",{roughness:1}),l,.4,h));const u=re(o),d=["#3f7f2c","#5ea83c","#2f6b2a","#79b84a","#4f8f36"];for(let f=0;f<Math.round(a*c*9);f++){const p=e+.12+u()*(a-.24),_=n+.12+u()*(c-.24),g=.15+u()*.4,m=u()<.6,v=new K(m?new Ki(.11+u()*.07,0):new gs(.07+u()*.06,g,4),Gt(d[Math.floor(u()*d.length)],{roughness:.9,flatShading:!0}));if(m&&(v.scale.y=.7),v.position.set(p,.45+(m?.08:g/2),_),v.rotation.set((u()-.5)*.5,u()*3,(u()-.5)*.5),s.add(Ht(v)),u()<.12){const y=new K(new on(.04,5,3),Gt(["#f0c63a","#d8483a","#f2ece0"][Math.floor(u()*3)]));y.position.set(p,.45+g+.02,_),s.add(y)}}for(const f of[e+.08,i-.08])s.add(U(.05,1.6,.05,Z.steel(),f,.4,h));s.add(U(a,.06,.18,Z.steel(),l,2,h)),s.add(U(a-.1,.03,.12,_n("#ffb8f0",3.5),l,1.97,h)),t.add({pos:new b(l,1.6,h),color:new lt("#ffaee8"),intensity:4,dist:4.5}),vt(e,n,i,r)}function Bi(s,t,e,n=.55,i=0,r=0){const o=U(n,n,n,Z.wood(),t,i,e);o.rotation.y=r,s.add(o);const a=U(n+.03,.06,n+.03,Z.steel(),t,i+n-.03,e);return a.rotation.y=r,s.add(a),o}function Sr(s,t,e,n=Z.rust(),i=!1){if(i){const r=new K(Ve(.26,.26,.8,12),n);r.rotation.z=Math.PI/2,r.position.set(t,.26,e),s.add(Ht(r));return}s.add(oe(.26,.26,.8,n,t,0,e,12)),s.add(oe(.27,.27,.04,Z.steel(),t,.25,e,12)),s.add(oe(.27,.27,.04,Z.steel(),t,.55,e,12))}function Qa(s,t,e,n,i,r=2,o=.5){const a=re(i);for(const h of[-n/2,n/2])for(const u of[-o/2,o/2])s.add(U(.05,r,.05,Z.steel(),t+h,0,e+u));const c=[.15,.7,1.25,1.8].filter(h=>h<r),l=["#8a6a3a","#5a6a72","#a8463a","#c9a24a","#46603c","#d8d0bc"];for(const h of c){s.add(U(n,.04,o,Z.steel(),t,h,e));let u=t-n/2+.08;for(;u<t+n/2-.15;){const d=a();if(d<.18){u+=.2;continue}if(d<.45){const f=.28+a()*.12;s.add(U(f,f*.8,o*.8,Z.wood(),u+f/2,h+.04,e)),u+=f+.04}else{const f=2+Math.floor(a()*3),p=Gt(l[Math.floor(a()*l.length)],{roughness:.6,metalness:.3});for(let _=0;_<f;_++)s.add(oe(.06,.06,.16+a()*.06,p,u+.07+_*.13,h+.04,e+(a()-.5)*.15,6));u+=f*.13+.06}}}vt(t-n/2-.05,e-o/2-.05,t+n/2+.05,e+o/2+.05)}function br(s,t,e,n,i,r=Z.wood(),o=.78){s.add(U(n,.07,i,r,t,o-.07,e));for(const a of[-1,1])for(const c of[-1,1])s.add(U(.06,o-.07,.06,Z.steel(),t+a*(n/2-.08),0,e+c*(i/2-.08)));vt(t-n/2,e-i/2,t+n/2,e+i/2)}function wr(s,t,e,n,i=!0){s.add(U(n,.06,.32,Z.wood(),t,.42,e));for(const r of[-1,1])s.add(U(.05,.42,.28,Z.steel(),t+r*(n/2-.1),0,e));i&&vt(t-n/2,e-.16,t+n/2,e+.16)}function Ah(s,t,e,n,i=Z.paintGreen()){for(let r=0;r<n;r++){const o=t+r*.46;s.add(U(.44,1.9,.45,i,o,0,e)),s.add(U(.36,.04,.02,Z.dark(),o,1.6,e+.23)),s.add(U(.36,.04,.02,Z.dark(),o,1.5,e+.23)),s.add(U(.04,.12,.03,Z.steel(),o+.13,1,e+.24))}vt(t-.23,e-.23,t+(n-1)*.46+.23,e+.23)}function cp(s,t,e,n,i,r,o){s.add(U(i,.8,.6,Z.steel(),e,0,n)),s.add(U(i,.06,.66,Z.dark(),e,.8,n+.02));const a=[],c=re(o),l=new At;l.position.set(e,.86,n-.2),l.add(U(i,.75,.22,Z.steel(),0,0,0)),r.forEach((h,u)=>{const d=(i-.2)/r.length,f=-i/2+.1+d*(u+.5),p=new K(new be(d-.06,.42),Zb(h,o+u));p.position.set(f,.4,.115),l.add(p),a.push(p)}),l.rotation.x=-.18,s.add(l);for(let h=0;h<Math.floor(i*6);h++){const u=new K(new Ai(.05,.03,.05),_n(["#ff5a4a","#7dff9a","#ffd04a"][Math.floor(c()*3)],2.5));u.position.set(e-i/2+.12+c()*(i-.24),.88,n+.05+c()*.2),s.add(u),a.push(u)}return t.add({pos:new b(e,1.4,n+.6),color:new lt(r[0]??"#7fe0c8"),intensity:2.6,dist:3.5}),vt(e-i/2,n-.35,e+i/2,n+.32),a}const hp=new Map;function Zb(s,t){const e=s+t%4;let n=hp.get(e);if(!n){const i=new Pe(24,16),r=re(t),o=Je(s);for(let c=0;c<16;c++)for(let l=0;l<24;l++){let h=Ln(o,.12);c%3===1&&l>1&&l<4+r()*18&&(h=Ln(o,.8+r()*.2)),(c===0||c===15||l===0||l===23)&&(h=Ln(o,.05)),i.set(l,c,h)}const a=i.texture({repeat:!1,worldSize:!1});a.minFilter=Fe,n=new we({map:a,emissive:"#ffffff",emissiveMap:a,emissiveIntensity:2.2,roughness:.3}),hp.set(e,n)}return n}function $b(s,t,e,n,i,r=2.4,o="#c99a2a",a="#16140f"){const c=Ji(i,{w:Math.round(r*32),h:16,bg:o,fg:a,font:"bold 12px monospace",worn:.1,seed:i.length}),l=new K(Ti(r,.5,.04),[Z.steel(),Z.steel(),Z.steel(),Z.steel(),new we({map:c,roughness:.7,metalness:.2}),Z.steel()]);l.position.set(t,e,n+.03),s.add(Ht(l));for(const h of[-r/2+.08,r/2-.08]){const u=new K(new on(.025,5,3),Z.steel());u.position.set(t+h,e,n+.06),s.add(u)}}function Jb(s,t,e,n,i,r){const o=re(r),a=[Z.rust(),Z.steel(),Gt("#5a6e52",{metalness:.3,roughness:.6})];i.forEach((l,h)=>{const u=a[h%a.length],d=new K(Ve(.06+h*.015,.06+h*.015,e-t,8),u);d.rotation.z=Math.PI/2,d.position.set((t+e)/2,l,n+.12+h*.04),s.add(Ht(d));for(let f=t+.6+o();f<e-.3;f+=1.6+o()){const p=new K(Ve(.1+h*.015,.1+h*.015,.06,8),Z.steel());p.rotation.z=Math.PI/2,p.position.set(f,l,n+.12+h*.04),s.add(Ht(p))}});const c=new K(new Tn(.12,.02,4,10),Z.paintRed());c.position.set(t+(e-t)*(.3+o()*.4),i[0]+.2,n+.25),s.add(Ht(c))}function Ch(s,t,e,n,i){const r=new K(new be(n,i),Z.vine()),o=r.geometry.attributes.uv;for(let a=0;a<o.count;a++)o.setXY(a,o.getX(a)*n,o.getY(a)*i);r.position.set(t,i/2,e+.03),r.castShadow=!0,s.add(r)}function Rh(s,t,e,n,i,r,o=1){const a=re(r),c=Gt(i,{emissive:i,emissiveIntensity:1.8,roughness:.2,transparent:!0,opacity:.92});for(let l=0;l<5;l++){const h=(.35+a()*.6)*o,u=new K(new gs(.08*o+a()*.06*o,h,5),c);u.position.set(e+(a()-.5)*.4*o,h/2,n+(a()-.5)*.3*o),u.rotation.set((a()-.5)*.7,a()*3,(a()-.5)*.7),s.add(u)}t.add({pos:new b(e,.6,n+.3),color:new lt(i),intensity:3.5,dist:3.5})}const Ph=2.7,up=.7,ei={garage:{key:"garage",x0:7,x1:19,z0:7,z1:16},bunks:{key:"bunks",x0:20,x1:31,z0:7,z1:15},infirmary:{key:"infirmary",x0:32,x1:41,z0:7,z1:15},command:{key:"command",x0:42,x1:49,z0:7,z1:16},mess:{key:"mess",x0:7,x1:19,z0:18,z1:26},commons:{key:"commons",x0:21,x1:34,z0:16,z1:27},comms:{key:"comms",x0:36,x1:49,z0:17,z1:26},works:{key:"works",x0:7,x1:20,z0:28,z1:36},stores:{key:"stores",x0:22,x1:33,z0:28,z1:36},yard:{key:"yard",x0:35,x1:49,z0:28,z1:36}},Kb=async s=>{const t=await td("ohmstead"),e=t.cols,n=t.rows,i=(N,L)=>N<0||L<0||N>=e||L>=n||t.collision[L*e+N]===1,r=new Uint8Array(e*n),o=new Uint8Array(e*n);for(let N=0;N<n;N++)for(let L=0;L<e;L++){if(o[N*e+L]||!i(L,N))continue;const Q=[],W=[[L,N]];for(;W.length;){const[k,ot]=W.pop();k<0||ot<0||k>=e||ot>=n||o[ot*e+k]||!i(k,ot)||(o[ot*e+k]=1,Q.push(ot*e+k),W.push([k+1,ot],[k-1,ot],[k,ot+1],[k,ot-1]))}if(Q.length>6)for(const k of Q)r[k]=1}const a=(N,L)=>N<0||L<0||N>=e||L>=n||r[L*e+N]===1,c=(N,L)=>!a(N,L);Ku({cols:e,rows:n,cell:(N,L)=>c(N,L)?".":"#",height:()=>0});const l=new At;s.add(l);const h=new Wb(s,12);s.background=new lt("#040506");const u=(N,L)=>a(N-1,L)&&a(N+2,L)&&c(N+1,L)||a(N-2,L)&&a(N+1,L)&&c(N-1,L)||a(N,L-1)&&a(N,L+2)&&c(N,L+1)||a(N,L-2)&&a(N,L+1)&&c(N,L-1),d=Je,f=Gb(e,n,c,(N,L,Q)=>{const W=Math.floor(N),k=Math.floor(L);if(u(W,k)&&a(W-1,k)!==a(W,k-1)){const P=Math.floor((N+L)*4)%2===0;return Ye(Q,d(P?"#c99a2a":"#1d1b17"),.75)}const ot=P=>{const gt=ei[P];return N>=gt.x0&&N<gt.x1&&L>=gt.z0&&L<gt.z1},q=te(N*.5,L*.5,71,3),tt=Xe(N*16,L*16,72);if(ot("yard")){let P=Ye(d("#4a3f33"),d("#6e604e"),q);return tt>.8&&(P=Ye(P,d("#8a7a66"),.6)),te(N*.9,L*.9,73,2)>.66&&(P=Ye(P,d("#3a3430"),.6)),P}if(ot("mess")){const P=(Math.floor(N*2)+Math.floor(L*2))%2===0;let gt=d(P?"#b8ad92":"#4f6a68");return gt=Ye(gt,d("#2a2620"),Math.max(0,q-.45)*.8),(N*2%1<.07||L*2%1<.07)&&(gt=Ye(gt,d("#1e1c18"),.5)),gt}if(ot("commons")){const P=N%1.5,gt=L%1.5;let ut=Ye(d("#8e8a80"),d("#a8a296"),Xe(Math.floor(N/1.5)*3.1,Math.floor(L/1.5)*2.7,74));return ut=Ye(ut,d("#5e5a52"),Math.max(0,q-.5)*.9),(P<.07||gt<.07)&&(ut=te(N*.4,L*.4,75,2)>.45?tt>.5?d("#4f7a2c"):d("#6a9a36"):d("#4a4740")),ut}if(ot("bunks")){const P=Math.floor(L*4);let gt=Ye(d("#6b4f36"),d("#86654a"),Xe(P*3.3,Math.floor(N/2.5+P*.37),76));return L*4%1<.12&&(gt=d("#33241a")),tt>.92&&(gt=Ye(gt,d("#2a1d14"),.5)),Ye(gt,d("#2a2620"),Math.max(0,q-.5)*.7)}return[10,11,21,22,32,33].includes(k)?Ye(Q,d("#7c868c"),.12):Q}),p=new K(new be(e,n),new we({map:f,roughness:.75,metalness:.25}));p.rotation.x=-Math.PI/2,p.position.set(e/2,0,n/2),p.receiveShadow=!0,l.add(p);const _=[];for(let N=0;N<n;N++)for(let L=0;L<e;L++){if(!a(L,N))continue;let Q=!1;for(let ot=-1;ot<=1;ot++)for(let q=-1;q<=1;q++)c(L+q,N+ot)&&(Q=!0);if(!Q)continue;const W=c(L,N-1)&&!c(L,N+1)||!c(L,N+1)&&!c(L-1,N)&&!c(L+1,N)&&(c(L-1,N-1)||c(L+1,N-1)),k=N===27&&L>=34&&L<=49;_.push({x:L,z:N,front:W,rock:k})}const g=(N,L)=>{const Q=new Ai(1.02,1,1.02);Q.translate(0,.5,0);const W=new hs(Q,L,N.length);return W.castShadow=W.receiveShadow=!0,l.add(W),W},m=_.filter(N=>!N.rock),v=_.filter(N=>N.rock),y=g(m,lp(!1)),x=g(v,lp(!0)),C=new Map;for(let N=0;N<n;N++)C.set(N,Ph);const T=new Wt,A=()=>{for(const[N,L]of[[y,m],[x,v]])L.forEach((Q,W)=>{const k=Q.front?up:C.get(Q.z);T.makeScale(1,k,1).setPosition(Q.x+.5,0,Q.z+.5),N.setMatrixAt(W,T)}),N.instanceMatrix.needsUpdate=!0,N.computeBoundingSphere()};A();const I=[],S=N=>{const L=new At;return l.add(L),I.push({row:N,obj:L}),L},M=[],D=N=>t.signs?.find(L=>L.text.startsWith(N))?.text??N,X=(N,L,Q,W,k=2.6)=>{$b(S(N.z0-1),L,2.45,N.z0,Q,k),M.push({x:L,z:N.z0+.3,height:2.7,label:"Read",reach:3,say:{name:"Sign",lines:[D(W)]}})},H=(N,L,Q=!0)=>{const W=S(N.z0-1);for(const k of L)Xb(W,h,k,N.z0,2.05,Q)},V=re(1234),at=[];{const N=ei.garage;X(N,12.6,"ELI'S GARAGE","ELI'S GARAGE",2.6),H(N,[9.5,16.3]),l.add(U(3,.08,.9,Z.deck(),9.5,.86,7.5));for(const tt of[8.1,10.9])for(const P of[7.15,7.85])l.add(U(.08,.86,.08,Z.steel(),tt,0,P));l.add(U(2.8,.05,.75,Z.steel(),9.5,.3,7.5)),l.add(U(.25,.22,.3,Z.paintBlue(),8.35,.94,7.75));for(let tt=0;tt<9;tt++){const P=.06+V()*.1;l.add(U(P,P*.6,P,V()<.5?Z.steel():Z.rust(),8.7+V()*2,.94,7.25+V()*.5))}const L=new K(new Vi(.13,0),_n("#7fd4ff",4));L.position.set(9.9,1.18,7.45),l.add(L),l.add(oe(.16,.2,.12,Z.steel(),9.9,.94,7.45,8)),h.add({pos:new b(9.9,1.4,7.9),color:new lt("#7fd4ff"),intensity:3.5,dist:3.5}),l.add(Te(new b(10.7,.94,7.3),new b(10.5,1.7,7.4),.04,Z.steel())),l.add(Te(new b(10.5,1.7,7.4),new b(10.1,1.55,7.6),.04,Z.steel()));const Q=new K(Ve(.04,.12,.14,8,!0),Z.paintGreen());Q.position.set(10.05,1.48,7.62),l.add(Q);const W=S(N.z0-1);W.add(U(2.6,1,.04,Z.wood(),9.5,1.15,7.03));for(let tt=0;tt<11;tt++){const P=8.4+tt*.22,gt=.2+V()*.35;W.add(U(.05,gt,.03,V()<.5?Z.steel():Z.paintRed(),P,1.95-gt,7.07))}M.push({x:9.5,z:8.3,height:1.6,label:"The Bench",say:{lines:["Grandpa's Bench. Your partner was built here."]}}),l.add(U(1.8,.75,.7,Z.wood(),16.3,0,7.4));const k=U(.42,.52,.05,Z.wood(),16,.75,7.2);k.rotation.x=-.15,l.add(k);const ot=new K(new be(.32,.42),new we({map:Ji("ELI",{w:16,h:20,bg:"#8a7656",fg:"#3a2e20",font:"bold 7px monospace",worn:.2}),roughness:1}));ot.position.set(16,1.02,7.24),ot.rotation.x=-.15,l.add(ot),l.add(U(.36,.07,.48,Gt("#5a3424",{roughness:.8}),16.6,.75,7.45)),l.add(oe(.035,.035,.14,Gt("#e8e0cc"),16.95,.75,7.35,6));const q=new K(new gs(.025,.07,5),_n("#ffb347",6));q.position.set(16.95,.94,7.35),l.add(q),h.add({pos:new b(16.95,1.1,7.6),color:new lt("#ffa040"),intensity:2.5,dist:3,flicker:.25}),vt(7.95,7,11.05,8),vt(15.4,7,17.2,7.8),M.push({x:16.3,z:8.1,height:1.4,label:"Eli's photo",say:{lines:["Grandpa Eli's photo, and his worn logbook, Ohm's Law. Five years gone, and the bench still smells of solder and him. The last entry just... stops mid-line."]}}),l.add(U(.7,1,.5,Z.paintRed(),18.2,0,7.4));for(let tt=0;tt<4;tt++)l.add(U(.62,.02,.02,Z.dark(),18.2,.25+tt*.22,7.66));vt(17.8,7,18.6,7.7);for(let tt=0;tt<4;tt++){const P=new K(new Tn(.28,.11,6,12),Gt("#1a1918",{roughness:1}));P.rotation.x=Math.PI/2,P.position.set(7.6,.11+tt*.22,14.9),l.add(Ht(P))}vt(7.2,14.5,8,15.3),Sr(l,8.6,15.2),Sr(l,9.2,15.4,Z.paintBlue()),vt(8.3,14.9,9.5,15.7),l.add(Te(new b(16,0,13),new b(16,2,13),.1,Z.paintRed())),l.add(Te(new b(16,2,13),new b(17.4,1.6,13),.08,Z.paintRed())),l.add(Te(new b(15.6,.05,13),new b(17.6,.05,13),.1,Z.paintRed())),l.add(Te(new b(17.4,1.6,13),new b(17.4,1.05,13),.02,Z.steel())),l.add(U(.6,.45,.45,Z.rust(),17.4,.6,13)),vt(15.6,12.7,17.8,13.3);for(const tt of[9,9.35])l.add(oe(.12,.12,1.2,tt<9.2?Z.paintGreen():Z.paintRed(),18.65,0,tt,10));vt(18.4,8.8,18.95,9.6),Bi(l,7.6,12.6,.6),Bi(l,7.6,13.3,.5,0,.3),Bi(l,7.6,12.6,.42,.6,.5),vt(7.2,12.2,8,13.6),Ch(S(N.z0-1),13.8,N.z0,1.4,2.2)}{const N=ei.bunks;X(N,25.5,"THE BUNKS","THE BUNKS",2.4),H(N,[22.2,28.8]);const L=["#6a4a3a","#44586a","#5a6a3a","#7a6a4a"];[20.7,23.3,25.9,28.5].forEach((W,k)=>{for(const ot of[-.48,.48])for(const q of[7.1,8.9])l.add(U(.06,1.95,.06,Z.steel(),W+ot,0,q));for(const ot of[.42,1.38])l.add(U(1,.08,1.9,Z.steel(),W,ot,8)),l.add(U(.92,.12,1.82,Z.cloth("#cfc6b0"),W,ot+.08,8)),l.add(U(.94,.06,1.2,Z.cloth(L[(k+(ot>1?1:0))%4]),W,ot+.2,8.35)),l.add(U(.5,.1,.3,Z.cloth("#e8e0cc"),W,ot+.2,7.3));l.add(U(.8,.4,.45,Z.paintGreen(),W,0,9.3)),vt(W-.55,7,W+.55,9.6)});const Q=new K(new be(.02,1.8),Z.cloth("#7a5a4a"));Q.scale.x=60,Q.rotation.y=Math.PI/2,Q.position.set(29.7,1,8),l.add(Q),br(l,27.6,13.3,1.2,.8),wr(l,27.6,12.65,1.1),wr(l,27.6,13.95,1.1);for(let W=0;W<6;W++)l.add(U(.1,.01,.14,Z.cloth("#e8e0cc"),27.2+V()*.8,.79,13.05+V()*.5));Ah(l,20.4,14.4,3),M.push({x:20.7,z:9.9,height:1.8,label:"Your bunk",say:{lines:["Your bunk. No time to sleep yet — there's a supply run to finish."]}}),Ch(S(N.z0-1),30.3,N.z0,.9,1.6)}{const N=ei.infirmary;X(N,36.5,"INFIRMARY","THE INFIRMARY",2.2),H(N,[33.6,39.4],!1);for(const W of[33.2,35]){l.add(U(.85,.08,1.9,Z.steel(),W,.55,8)),l.add(U(.8,.12,1.85,Z.cloth("#e6e2d6"),W,.63,8));for(const k of[-.38,.38])for(const ot of[7.15,8.85])l.add(U(.04,.55,.04,Z.steel(),W+k,0,ot));l.add(U(.5,.1,.3,Z.cloth("#f0ece2"),W,.75,7.3)),vt(W-.45,7,W+.45,9)}l.add(U(.03,1.8,.03,Z.steel(),34.1,0,9.2)),l.add(U(.16,.24,.06,Gt("#cfe8f0",{transparent:!0,opacity:.7}),34.1,1.55,9.2));const L=new K(new be(2,1.7),Z.cloth("#9fb8b0"));L.position.set(34.1,1.1,9.5),L.rotation.y=0,l.add(L),l.add(U(1.2,1.7,.4,Gt("#d8d4c8",{roughness:.6}),37.8,0,7.25)),l.add(U(.3,.08,.02,_n("#7dff9a",3),37.8,1.35,7.46)),l.add(U(.08,.3,.02,_n("#7dff9a",3),37.8,1.24,7.46)),vt(37.2,7,38.4,7.5),l.add(oe(.55,.6,.3,Z.steel(),39.6,0,9,16));const Q=new K(new Fn(.48,.48,1.3,16,1,!0),new we({color:"#9fffd0",emissive:"#3dff9a",emissiveIntensity:.6,transparent:!0,opacity:.32,roughness:.1,side:Ue}));Q.position.set(39.6,.95,9),l.add(Q),l.add(oe(.5,.5,.15,Z.steel(),39.6,1.6,9,16)),l.add(U(.7,.04,.7,_n("#7dffb0",2.2),39.6,.3,9)),h.add({pos:new b(39.6,1,9.6),color:new lt("#5dffa8"),intensity:4,dist:4}),vt(39,8.4,40.2,9.6),M.push({x:39.6,z:9.7,height:1.9,label:"Recharge",say:{lines:["Infirmary: you're all recharged — stay current."]}}),Ah(l,33,14.4,2,Z.paintBlue()),br(l,38.8,13.5,1,.6,Z.steel())}{const N=ei.command;X(N,43.8,"COMMAND","COMMAND",2),H(N,[47.6]);const L=S(N.z0-1),Q=new K(new be(2.2,1.2),new we({map:dp(),roughness:1}));Q.position.set(46.2,1.55,7.03),L.add(Q),L.add(U(2.3,1.3,.03,Z.wood(),46.2,.9,7.01)),br(l,45.6,13.4,2.2,1.3,Z.steel(),.9);const W=new K(new be(2,1.1),new we({map:dp(),roughness:1}));W.rotation.x=-Math.PI/2,W.position.set(45.6,.91,13.4),l.add(W);for(let k=0;k<5;k++)l.add(oe(.03,.03,.12,Z.paintRed(),44.8+V()*1.6,.91,13+V()*.8,5));h.add({pos:new b(45.6,2.2,13.4),color:new lt("#ffd08a"),intensity:5,dist:5}),l.add(U(.05,.6,.05,Z.steel(),45.6,2,13.4)),l.add(U(.35,.08,.35,_n("#ffd590",3),45.6,1.95,13.4)),at.push(...cp(l,h,43.4,7.5,1.6,["#7fe0c8","#ffd07a"],7)),Ah(l,48.3,9.2,1,Z.paintGreen()),Bi(l,48.3,14.8,.6),vt(47.9,14.4,48.7,15.2)}{const N=ei.mess;X(N,9.2,"THE MESS","THE MESS",2),H(N,[12.6,16.6]),l.add(U(5.2,.9,.7,Z.steel(),13.5,0,18.4)),l.add(U(5.2,.05,.75,Gt("#8a8e90",{metalness:.6,roughness:.35}),13.5,.9,18.42)),l.add(U(1.1,.9,.7,Z.dark(),17.1,0,18.4));for(const L of[-.25,.25])l.add(oe(.16,.16,.02,_n("#ff6a2a",2.2),17.1+L,.9,18.4,10));l.add(oe(.24,.22,.32,Z.steel(),16.85,.92,18.4,12)),h.add({pos:new b(17.1,1.2,18.9),color:new lt("#ff8a40"),intensity:3,dist:3.5,flicker:.15});for(let L=0;L<6;L++)l.add(oe(.09,.09,.2,Gt(["#8a6a3a","#5a6a72","#a8463a"][L%3],{metalness:.4}),11.4+L*.25,.95,18.3,8));vt(10.9,18,17.7,18.8),Qa(l,8,18.3,1.6,21,2,.45);for(const[L,Q]of[[7.9,12],[14,18.2]]){const W=(L+Q)/2,k=Q-L;br(l,W,24.3,k,.8),wr(l,W,23.6,k-.2),wr(l,W,25,k-.2);for(let ot=0;ot<5;ot++)l.add(oe(.12,.1,.06,Gt("#c8c2b0"),L+.4+V()*(k-.8),.78,24.1+V()*.4,8)),V()<.6&&l.add(oe(.04,.04,.11,Z.steel(),L+.4+V()*(k-.8),.78,24.1+V()*.4,6))}Yb(l,h,new b(7.5,2.4,22.5),new b(18.5,2.4,22.5),12),Sr(l,18.4,19.4,Z.paintGreen()),vt(18.1,19.1,18.7,19.7)}let J=null;{const N=ei.commons;X(N,23.6,"OHMSTEAD COMMONS","OHMSTEAD COMMONS",3.4),H(N,[21.4,33.1]),l.add(oe(1,1.15,.5,Z.concrete(),27,0,19.6,20)),l.add(oe(.7,.8,.25,Z.steel(),27,.5,19.6,16)),J=new K(new Vi(.5,0),new we({color:"#9fe8ff",emissive:"#4fc8ff",emissiveIntensity:1.9,roughness:.15,transparent:!0,opacity:.92})),J.scale.set(.8,1.6,.8),J.position.set(27,1.6,19.6),l.add(J);for(let k=0;k<4;k++){const ot=k/4*Math.PI*2+.4,q=new K(new Vi(.16,0),J.material);q.scale.set(.7,1.5,.7),q.position.set(27+Math.cos(ot)*.55,.95,19.6+Math.sin(ot)*.55),q.rotation.z=Math.cos(ot)*.4,l.add(q)}h.add({pos:new b(27,2,20.3),color:new lt("#6fd0ff"),intensity:9,dist:8}),vt(25.9,18.5,28.1,20.7);for(const[k,ot]of[[24.6,19.6],[29.4,19.6]]){const q=new At;q.position.set(k,0,ot),wr(q,0,0,1.2,!1),q.rotation.y=Math.PI/2,l.add(q),vt(k-.2,ot-.6,k+.2,ot+.6)}Eh(l,h,21.5,24,24.6,25.8,11),Eh(l,h,29.6,24,33.4,25.8,12),Eh(l,h,21.4,16.4,23.2,17.6,13);const L=new At;L.position.set(30.9,0,16),L.add(U(2.6,.1,1.6,Z.steel(),0,0,.8));for(const[k,ot,q,tt]of[[0,1.6,2.6,.12],[-1.25,.8,.12,1.6],[1.25,.8,.12,1.6]])L.add(U(q,.03,tt,Z.hazard(),k,.1,ot));for(const k of[-1.2,1.2])L.add(U(.16,2.7,.2,Z.hazard(),k,0,.1));L.add(U(2.56,.2,.22,Z.hazard(),0,2.5,.1)),L.add(U(2.2,2.4,.04,Z.dark(),0,.1,.02));for(const k of[-1,1])for(const ot of[.25,1.45])L.add(U(.06,2.3,.06,Z.steel(),k,.1,ot));L.add(U(2.06,.08,1.26,Z.steel(),0,2.38,.85));for(let k=.4;k<2.3;k+=.35)for(const ot of[-1,1])L.add(U(.03,.03,1.2,Z.steel(),ot,k,.85));L.add(U(2,.3,.05,Z.steel(),0,2.1,1.48));for(const k of[-.4,.4])L.add(U(.03,3,.03,Gt("#1a1a1a"),k,2.46,.85));L.add(U(.26,.4,.1,Z.steel(),1.5,1.1,.2));const Q=new K(new on(.045,6,4),_n("#ffb347",4));Q.position.set(1.5,1.42,.27),L.add(Q),at.push(Q),Ht(L),l.add(L),h.add({pos:new b(30.9,2.2,17.3),color:new lt("#ffc070"),intensity:5,dist:5}),vt(29.6,16,29.9,17.6),vt(31.9,16,32.6,17.6),M.push({x:30.9,z:17,height:2.7,label:"Ride up",reach:1.7,say:{lines:["The cage rattles shut. Up to the Field."]},go:{to:"field",spawn:"lift"}});const W=S(N.z0-1);W.add(U(1.1,.8,.04,Z.wood(),28.65,1.1,16.04));for(let k=0;k<6;k++)W.add(U(.22,.28,.01,Z.cloth(["#e8e0cc","#d8c890","#c8d8e0"][k%3]),28.3+k%3*.33,1.2+Math.floor(k/3)*.32,16.08))}{const N=ei.comms;X(N,38.6,"COMMS & ARCHIVE","COMMS & ARCHIVE",3),H(N,[41.9,47.6],!1);for(const Q of[37.1,38.9,40.7])Qa(l,Q,17.3,1.6,Math.round(Q*10),2.2,.5);at.push(...cp(l,h,44.6,17.5,2.6,["#7fe0c8","#7fe0c8","#ffd07a"],21)),l.add(U(.9,1.6,.5,Z.steel(),47.6,0,17.4));for(const Q of[1.1,1.38])for(const W of[47.4,47.8]){const k=new K(Ve(.14,.14,.04,12),Z.dark());k.rotation.x=Math.PI/2,k.position.set(W,Q,17.67),l.add(k)}vt(47.1,17.1,48.1,17.7);const L=S(N.z0-1);L.add(U(.22,2.6,.22,Z.rust(),43,0,17.12)),L.add(U(.3,.3,.3,Z.steel(),43,1.2,17.15));for(const Q of[37,37.7])l.add(U(.6,1.3,.6,Gt("#6a6a5a",{metalness:.3}),Q,0,24.8));vt(36.6,24.4,38.1,25.2),br(l,41,23.8,1.6,.9),wr(l,41,24.6,1.4);for(let Q=0;Q<4;Q++)l.add(U(.35,.05+Q*.03,.25,Z.cloth("#e0d8c0"),40.5+Q*.3,.78,23.7));Bi(l,48.2,25,.6),vt(47.8,24.6,48.6,25.4)}const dt=[];let j=null;{const N=ei.works;X(N,13.6,"THE WORKS","THE WORKS",2),H(N,[10.6,16.6]),Jb(S(N.z0-1),7,20,N.z0,[1.6,1.9,2.2],31);for(const W of[8.2,10.1]){l.add(oe(.85,.85,2.4,Z.rust(),W,0,29,18));const k=new K(new on(.86,16,6,0,Math.PI*2,0,Math.PI/2),Z.rust());k.scale.y=.35,k.position.set(W,2.4,29),l.add(Ht(k)),l.add(U(.5,.25,.04,Z.hazard(),W,1.3,29.86)),vt(W-.85,28.15,W+.85,29.85)}for(const W of[13.2,15.4]){l.add(U(1,.8,.8,Z.paintGreen(),W,0,29)),l.add(oe(.18,.18,.6,Z.steel(),W,.8,29,10));const k=new At;k.position.set(W+.62,.62,29);const ot=new K(new Tn(.42,.06,6,16),Z.steel());ot.rotation.y=Math.PI/2,k.add(Ht(ot));for(let q=0;q<4;q++){const tt=new K(Ti(.04,.8,.05),Z.steel());tt.rotation.x=q/4*Math.PI,k.add(tt)}l.add(k),dt.push(k),vt(W-.5,28.6,W+1.1,29.4)}l.add(U(2.2,1.3,1.2,Z.paintGreen(),17.9,0,29.1)),l.add(U(1.4,.5,.02,_n("#ff7a30",2.4),17.9,.4,29.71));for(let W=0;W<6;W++)l.add(U(1.4,.03,.03,Z.dark(),17.9,.45+W*.08,29.73));l.add(oe(.12,.12,1.3,Z.rust(),18.7,1.3,28.8,8)),h.add({pos:new b(17.9,.8,30.3),color:new lt("#ff8a40"),intensity:4,dist:4,flicker:.1}),vt(16.8,28.5,19,29.7),l.add(oe(.95,.95,.06,Z.steel(),9,0,33.9,18));const L=new At;L.position.set(9,.08,33.9);for(let W=0;W<5;W++){const k=new K(Ti(.22,.03,.85),Z.steel());k.position.set(0,0,.42);const ot=new At;ot.rotation.y=W/5*Math.PI*2,k.rotation.z=.35,ot.add(k),L.add(ot)}l.add(L),j=L;const Q=new K(new Tn(.95,.06,4,20),Z.hazard());Q.rotation.x=Math.PI/2,Q.position.set(9,.08,33.9),l.add(Q),vt(8,32.9,10,34.9),br(l,16.6,34.9,1.8,.7,Z.steel()),Sr(l,19.2,34.8,Z.rust()),Sr(l,19.2,34.1,Z.rust(),!0),vt(18.9,33.7,19.6,35.2),Ch(S(N.z0-1),12,N.z0,1,1.4)}{const N=ei.stores;X(N,24.4,"STORES","STORES",1.8),H(N,[22.6,32.5]);for(const L of[26.4,28.4,30.4])Qa(l,L,28.35,1.8,Math.round(L*13),2.3,.6);for(const L of[23,25])Qa(l,L,30.8,1.6,Math.round(L*17),1.8,.55);l.add(U(3.2,1,.6,Z.steel(),27.5,0,32.45)),l.add(U(3.2,.05,.65,Z.deck(),27.5,1,32.45));for(const L of[26,29])l.add(U(.06,1.3,.06,Z.steel(),L,1.05,32.2));l.add(U(3.1,.06,.06,Z.steel(),27.5,2.3,32.2));for(let L=26.2;L<29;L+=.2)(L<27.1||L>27.9)&&l.add(U(.015,1.25,.015,Z.steel(),L,1.05,32.2));l.add(U(.4,.3,.3,Z.wood(),26.6,1.05,32.5)),vt(25.9,32.15,29.1,32.75),Bi(l,32.3,34.6,.6),Bi(l,31.6,34.9,.5,0,.4),Bi(l,32.3,34.6,.45,.6,.2),vt(31.3,34.2,32.7,35.2);for(let L=0;L<3;L++)Sr(l,22.6+L*.6,34.8,L===1?Z.paintBlue():Z.rust());vt(22.3,34.5,24.1,35.1)}let _t=null;{const N=ei.yard;X(N,46.4,"THE YARD","THE YARD",1.9),H(N,[39,43.5]);for(const W of[37.2,41.6]){const k=S(N.z0-1);k.add(U(.22,2.6,.22,Z.wood(),W,0,28.15)),k.add(U(.22,2.6,.22,Z.wood(),W+2.4,0,28.15)),k.add(U(2.7,.22,.26,Z.wood(),W+1.2,2.45,28.15))}Rh(S(N.z0-1),h,38.4,28.1,"#7fd4ff",3,1),Rh(S(N.z0-1),h,47.2,28.1,"#c08cff",4,.9),Rh(l,h,42.7,28.2,"#7fffd4",5,.7);for(let W=35.2;W<47;W+=.5)l.add(U(.14,.05,1.1,Z.wood(),W,0,30.6));for(const W of[-.35,.35])l.add(U(11.8,.06,.06,Gt("#5a4a3c",{metalness:.5}),41.1,.05,30.6+W));const L=new At;L.add(U(1.1,.6,.8,Z.rust(),0,.18,0));for(const W of[-.35,.35])for(const k of[-.35,.35]){const ot=new K(Ve(.12,.12,.06,8),Z.dark());ot.rotation.x=Math.PI/2,ot.position.set(W,.14,k),L.add(ot)}for(let W=0;W<6;W++){const k=new K(new wi(.16,0),Z.rock());k.position.set((V()-.5)*.7,.8,(V()-.5)*.5),L.add(k)}const Q=new K(new Vi(.1,0),_n("#7fd4ff",3));Q.position.set(.2,.92,.1),L.add(Q),Ht(L),L.position.set(45,0,30.6),l.add(L),_t=L,vt(44.3,30.1,45.7,31.1),l.add(U(.8,.6,.6,Z.hazard(),37,0,34.6)),l.add(Te(new b(37,.6,34.6),new b(37,2.3,34.1),.12,Z.steel())),l.add(Te(new b(37,2.3,34.1),new b(37,1.2,33.6),.08,Z.steel())),vt(36.5,34.2,37.5,35);for(let W=0;W<14;W++){const k=new K(new wi(.12+V()*.2,0),Z.rock());k.position.set(35.5+V()*12.5,.06,28.5+V()*.8),k.rotation.set(V()*3,V()*3,V()*3),l.add(Ht(k))}Bi(l,47.9,34.8,.6),vt(47.5,34.4,48.3,35.2)}for(const[N,L,Q]of[[11,13.6,!0],[25,12,!0],[36.5,11.5,!1],[27,23,!0],[12.8,21.6,!0],[42.5,21.5,!1],[13.5,31.8,!0],[27.4,31,!0],[41.5,32.2,!0],[46.2,10.2,!0]])qb(l,h,N,L,Q);const bt=new lt().setRGB(...$f.sprite),Ct=await Ec.load(94,bt,.017);Ct.root.position.set(13.9,0,9),l.add(Ct.root),vt(13.5,8.6,14.3,9.4),M.push({x:13.9,z:9,height:1.7,label:"Banjo",say:{name:"Banjo",portrait:void 0,lines:["Banjo — Grandpa's old Jukeboxer — hums two notes: its hello. You hum them back."]}});const $t=new An({map:Ji("♪",{w:16,h:16,fg:"#ffd27a",font:"bold 14px serif"}),transparent:!0,depthWrite:!1,blending:ds}),me=[0,1].map(()=>{const N=new K(new be(.3,.3),$t.clone());return l.add(N),N}),st=(()=>{const L=new Zt,Q=new Float32Array(160*3),W=new Float32Array(160*3);for(let ot=0;ot<160;ot++)W[ot*3]=(V()-.5)*24,W[ot*3+1]=.3+V()*2.2,W[ot*3+2]=(V()-.5)*16;L.setAttribute("position",new Me(Q,3));const k=new uc(L,new Zo({color:"#ffe2b0",size:.04,transparent:!0,opacity:.55,blending:ds,depthWrite:!1}));return k.frustumCulled=!1,s.add(k),(ot,q)=>{for(let tt=0;tt<160;tt++){let P=W[tt*3]+Math.sin(ot*.13+tt)*.4,gt=W[tt*3+2]+Math.cos(ot*.11+tt*1.7)*.4;P=((P-q.x)%24+36)%24-12+q.x,gt=((gt-q.z)%16+24)%16-8+q.z,Q[tt*3]=P,Q[tt*3+1]=W[tt*3+1]+Math.sin(ot*.4+tt)*.15,Q[tt*3+2]=gt}L.attributes.position.needsUpdate=!0}})(),pt=(N,L,Q)=>{for(const[W,k]of[[-Q,-Q],[Q,-Q],[-Q,Q],[Q,Q],[0,0]])if(a(Math.floor(N+W),Math.floor(L+k)))return!0;return ju(N,L,Q)};return{id:"ohmstead",title:"OHMSTEAD",sub:"Home colony · beneath the Field",mood:$f,sky:!1,cam:{x0:13.5,x1:e-13.5,z0:9.5,z1:32.5},blocked:pt,ground:()=>0,spawns:{start:{x:t.spawn.x+.5,z:t.spawn.y+.5,face:"S"},lift:{x:30.9,z:18,face:"S"}},triggers:[],things:M,npcs:ed(t),update(N,L,Q){let W=!1;for(let k=0;k<n;k++){const ot=k+.5>L.z+.7?up:Ph,q=C.get(k);Math.abs(q-ot)>.002&&(C.set(k,q+(ot-q)*Math.min(1,.14)),W=!0)}W&&A();for(const k of I)k.obj.visible=C.get(k.row)>Ph*.8;h.update(N,Q),at.forEach((k,ot)=>{k.visible=Math.sin(N*(.7+ot%5*.37)+ot)>-.85}),J&&(J.rotation.y=N*.3,J.position.y=1.6+Math.sin(N*.8)*.05);for(const k of dt)k.rotation.x=N*2.4;j&&(j.rotation.y=N*3),_t&&(_t.position.y=Math.abs(Math.sin(N*9))*.004),Ct.root.position.y=Math.abs(Math.sin(N*2.2))*.03,me.forEach((k,ot)=>{const q=(N*.45+ot*.5)%1;k.position.set(13.9+(ot?.3:-.25)+Math.sin(q*6)*.08,1.4+q*.9,9.1),k.material.opacity=Math.sin(q*Math.PI)*.9}),st(N,L)}}};let Ih=null;function dp(){if(Ih)return Ih;const s=document.createElement("canvas");s.width=88,s.height=48;const t=s.getContext("2d");t.fillStyle="#c8b890",t.fillRect(0,0,88,48),t.strokeStyle="rgba(80,60,40,0.35)";for(let i=0;i<88;i+=8)t.beginPath(),t.moveTo(i+.5,0),t.lineTo(i+.5,48),t.stroke();for(let i=0;i<48;i+=8)t.beginPath(),t.moveTo(0,i+.5),t.lineTo(88,i+.5),t.stroke();t.strokeStyle="#4a6a8a",t.lineWidth=2,t.beginPath(),t.moveTo(0,30),t.bezierCurveTo(20,22,40,36,88,18),t.stroke();const e=[[14,40],[24,33],[34,36],[42,26],[50,30],[60,22],[68,14],[78,8]];t.strokeStyle="#a03028",t.lineWidth=1,t.beginPath(),e.forEach(([i,r],o)=>o?t.lineTo(i,r):t.moveTo(i,r)),t.stroke(),t.fillStyle="#a03028";for(const[i,r]of e)t.fillRect(i-1,r-1,3,3);const n=new $o(s);return n.magFilter=Fe,n.colorSpace=Ke,Ih=n,n}const Sm={ohmstead:Kb,field:Lb,farmroad:Hb},ai=new URLSearchParams(location.search),jh=ai.get("time")==="night",id=ai.get("hud")!=="0",ko=ai.get("wide")==="1",sd=document.getElementById("app");window.addEventListener("error",s=>{const t=document.createElement("pre");t.style.cssText="position:fixed;left:8px;top:8px;right:8px;color:#f88;background:#000c;padding:8px;font:12px monospace;z-index:99;white-space:pre-wrap",t.textContent=String(s.message)+`
`+(s.error?.stack??""),document.body.appendChild(t)});const fi=new m0({antialias:!1,powerPreference:"high-performance"});fi.setPixelRatio(Math.min(window.devicePixelRatio,1.5));fi.setSize(window.innerWidth,window.innerHeight);fi.shadowMap.enabled=!0;fi.shadowMap.type=nu;fi.toneMapping=Zl;fi.outputColorSpace=Ke;sd.appendChild(fi.domElement);const Gi=new sn(ko?34:30,window.innerWidth/window.innerHeight,.5,220),Qb=ko?new b(0,27,31):new b(0,12.5,14.5);let _i=new lc;const Qs=KS(fi,_i,Gi),nn=new eb(sd);let ci=null,bm=null,Xs=!0,ql=[],tu=[],rl=!1;const Vn=[],Rr=new b,fp=new b;let Lh=.46;const pp=ai.get("hero"),[Ie,ii]=await Promise.all([pp?Ju.load(pp,new lt(1,1,1)):Tc.load("sal",new lt(1,1,1)),Ec.load(7,new lt(1,1,1))]);function jb(s){s.traverse(t=>{if(t===Ie.root||t===ii.root||Ie.root.children.includes(t)||ii.root.children.includes(t))return;t.geometry?.dispose()})}function wm(s){const t=ci;return ko?s.set((t.cam.x0+t.cam.x1)/2,0,(t.cam.z0+t.cam.z1)/2+1):(s.x=Po.clamp(s.x,t.cam.x0,t.cam.x1),s.z=Po.clamp(s.z,t.cam.z0,t.cam.z1),s)}function tw(){if(!id||!ci)return;const s=t=>{const e=new URLSearchParams(location.search);return t?e.set("time","night"):e.delete("time"),`?${e}`};nn.badge(`<span>HD-2D · ${ci.title.replace(/^THE /,"")}</span>`+(ci.sky?`<a href="${s(!1)}" class="${jh?"":"on"}">Day</a><a href="${s(!0)}" class="${jh?"on":""}">Night</a>`:""))}async function Lc(s,t,e=!1){Xs=!0,e||await nn.fade(!0);const n=_i;n.remove(Ie.root,ii.root),jb(n),_i=new lc,Qs.setScene(_i);const i=await Sm[s](_i,jh);ci=i,bm=QS(_i,fi,Qs,i.mood);const r=new lt().setRGB(...i.mood.sprite);Ie.setTint(r),ii.setTint(r);const o=await Promise.all(i.npcs.map(h=>Tc.load(h.char,r)));ql=[],tu=i.things.map(h=>({...h,pos:new b(h.x,i.ground(h.x,h.z),h.z)})),i.npcs.forEach((h,u)=>{const d=o[u],f=h.col+.5,p=h.row+.5;d.root.position.set(f,i.ground(f,p),p),d.dir=h.facing?h.facing.toUpperCase():"S",d.animate(0,!1),_i.add(d.root),ql.push({w:d,pos:d.root.position}),h.lines?.length&&tu.push({x:f,z:p,height:2,label:h.name,walker:d,pos:d.root.position,say:{name:h.name,portrait:`./world/char/${h.char}_96.png`,lines:h.lines}})});const a=e&&ai.has("x")?{x:Number(ai.get("x")),z:Number(ai.get("z")),face:ai.get("face")?.toUpperCase()??"S"}:i.spawns[t]??i.spawns.start;Ie.root.position.set(a.x,i.ground(a.x,a.z),a.z),Ie.dir=a.face??"S",Ie.animate(0,!1);const c=i.blocked(a.x-.8,a.z,.25,a.x,a.z)?.8:-.8;ii.root.position.set(a.x+c,i.ground(a.x+c,a.z),a.z),_i.add(Ie.root,ii.root),Vn.length=0,Vn.push(ii.root.position.clone(),Ie.root.position.clone()),rl=!0,wm(Rr.copy(Ie.root.position).setY(.8));const l=new URLSearchParams(location.search);l.set("area",s);for(const h of["x","z","face"])l.delete(h);history.replaceState(null,"",`?${l}`),tw(),Xs=!1,e||await nn.fade(!1),id&&nn.titleCard(i.title,i.sub)}const Xn=new Set,ew=new Set(["e"," ","enter","z"]);window.addEventListener("keydown",s=>{const t=s.key.toLowerCase();Xn.add(t),ew.has(t)&&!s.repeat&&Em(),(t.startsWith("arrow")||t===" ")&&s.preventDefault()});window.addEventListener("keyup",s=>Xn.delete(s.key.toLowerCase()));window.addEventListener("blur",()=>Xn.clear());let Fs=null;function Tm(s,t){nn.say({name:s.name,portrait:s.portrait,lines:s.lines},t)}function Em(){if(Xs)return;if(nn.talking){nn.advance();return}const s=Fs;if(!s)return;s.walker&&s.walker.face(Ie.root.position.x-s.pos.x,Ie.root.position.z-s.pos.z);const t=s.go,e=t?()=>{Lc(t.to,t.spawn)}:void 0;s.say?Tm(s.say,e):e?.()}function nw(){const s=Ie.root.position,t=Ie.dir==="W"?-1:Ie.dir==="E"?1:0,e=Ie.dir==="N"?-1:Ie.dir==="S"?1:0;let n=null,i=1/0;for(const r of tu){const o=r.pos.x-s.x,a=r.pos.z-s.z,c=Math.hypot(o,a);if(c>(r.reach??1.6))continue;const l=(o*t+a*e)/(c||1);c>.95&&l<.3||c<i&&(i=c,n=r)}return n}const iw=.28;function mp(s,t,e,n){if(ci.blocked(s,t,iw,e,n))return!1;for(const i of ql)if(Math.hypot(i.pos.x-s,i.pos.z-t)<.55)return!1;return!0}function sw(s){const t=ci;let e=0,n=0;!nn.talking&&!Xs&&((Xn.has("arrowleft")||Xn.has("a"))&&(e-=1),(Xn.has("arrowright")||Xn.has("d"))&&(e+=1),(Xn.has("arrowup")||Xn.has("w"))&&(n-=1),(Xn.has("arrowdown")||Xn.has("s"))&&(n+=1),(nn.stick.x||nn.stick.y)&&(e=nn.stick.x,n=nn.stick.y)),nn.takeA()&&Em();const i=Math.min(1,Math.hypot(e,n)),r=Xn.has("shift")||i>.92,o=(r?5:3.1)*i,a=Ie.root.position;let c=!1;if(i>.12){const v=e/Math.hypot(e,n)*o*s,y=n/Math.hypot(e,n)*o*s;Ie.face(e,n),mp(a.x+v,a.z,a.x,a.z)&&(a.x+=v,c=!0),mp(a.x,a.z+y,a.x,a.z)&&(a.z+=y,c=!0),a.y=t.ground(a.x,a.z)}if(Ie.animate(s,c,r?1.5:1),!Xs){const v=t.triggers.find(y=>a.x>y.x0&&a.x<y.x1&&a.z>y.z0&&a.z<y.z1);v&&!rl?(rl=!0,v.go?Lc(v.go.to,v.go.spawn):v.say&&Tm(v.say)):v||(rl=!1)}Vn[Vn.length-1].distanceTo(a)>.08&&(Vn.push(a.clone()),Vn.length>80&&Vn.shift());let h=1.1,u=Vn.length-1,d=Vn[0];for(;u>0;u--){const v=Vn[u].distanceTo(Vn[u-1]);if(h<=v){d=Vn[u].clone().lerp(Vn[u-1],h/v);break}h-=v}const f=ii.root.position,p=f.x,_=f.z,g=Math.hypot(d.x-f.x,d.z-f.z);if(g>.04){const v=Math.min(1,(o+1.5)*s/g);f.x+=(d.x-f.x)*v,f.z+=(d.z-f.z)*v}f.y=t.ground(f.x,f.z),ii.step(s,f.x-p,f.z-_);for(const v of ql)v.w.animate(s,!1);wm(fp.copy(a).setY(.8)),Rr.lerp(fp,1-Math.exp(-s*4.5)),Gi.position.copy(Rr).add(Qb),Gi.lookAt(Rr),bm.follow(ko?Rr:a);const m=a.clone().setY(a.y+.8).project(Gi);if(Lh+=((m.y+1)/2-Lh)*(1-Math.exp(-s*6)),Qs.tiltH.uniforms.focus.value=Qs.tiltV.uniforms.focus.value=ko?.45:Lh,Fs=nn.talking||Xs?null:nw(),Fs){const v=Fs.pos.clone().setY(Fs.pos.y+Fs.height).project(Gi);nn.showPrompt(Fs.label,(v.x+1)/2*window.innerWidth,(1-v.y)/2*window.innerHeight)}else nn.showPrompt(null);nn.tick(s)}function Am(){const s=window.innerWidth,t=window.innerHeight;fi.setSize(s,t),Gi.aspect=s/t,Gi.updateProjectionMatrix(),Qs.resize(s,t)}window.addEventListener("resize",Am);Am();const rw=Sm[ai.get("area")??""]?ai.get("area"):"ohmstead";await Lc(rw,"start",!0);id&&nn.hint(matchMedia("(pointer: coarse)").matches?"Stick to move · A to talk":"<kbd>WASD</kbd>/<kbd>←↑→↓</kbd> move · <kbd>Shift</kbd> run · <kbd>E</kbd> talk");const Cm=[],ow={sal:[["a_chibi","A · Chibi adventure"],["b_16bit","B · 16-bit JRPG"],["c_handheld","C · Handheld tamer"],["d_tactics","D · Tactics RPG"],["e_indie","E · Indie action"],["f_survival","F · Gritty survival"],["g_cozy","G · Cozy life-sim"],["h_anime","H · Anime action"]],duo:[["snes8/south","B · 16-bit JRPG"],["e_pro/south","E · Indie action"]],snes8:["south","south-east","east","north-east","north","north-west","west","south-west"].map(s=>[`snes8/${s}`,s]),e_pro:["south","south-east","east","north-east","north","north-west","west","south-west"].map(s=>[`e_pro/${s}`,s]),b16:["south","south-east","east","north-east","north","north-west","west","south-west"].map(s=>[`b16/${s}`,s]),indie8:["south","south-east","east","north-east","north","north-west","west","south-west"].map(s=>[`indie8/${s}`,s])},gp=ow[ai.get("lineup")??""];if(gp){const s=gp,t=new lt().setRGB(...ci.mood.sprite),e=s.length<=2?2.2:1.5,n=Ie.root.position.x-(s.length-1)*e/2,i=Ie.root.position.z;Ie.root.visible=ii.root.visible=!1,await Promise.all(s.map(async([r,o],a)=>{const c=await tb(`./world/styles/${r}.png`,1.65,t),l=n+a*e;c.position.set(l,ci.ground(l,i),i),_i.add(c);const h=document.createElement("div");h.textContent=o,h.style.cssText='position:absolute;left:0;top:0;transform:translate(-50%,0);font:600 13px "Alegreya Sans",sans-serif;color:#f1dfb1;background:rgba(14,15,18,.82);border:1px solid rgba(201,164,92,.6);padding:2px 8px;border-radius:999px;white-space:nowrap;pointer-events:none',sd.appendChild(h),Cm.push({el:h,pos:c.position})}))}const aw=new Mc;let Dh=0;fi.setAnimationLoop(()=>{const s=Math.min(aw.getDelta(),.05);Dh+=s,ci&&!Xs&&(sw(s),ci.update(Dh,Ie.root.position,Rr));for(const t of Cm){const e=t.pos.clone().project(Gi);t.el.style.left=`${(e.x+1)/2*window.innerWidth}px`,t.el.style.top=`${(1-e.y)/2*window.innerHeight+8}px`}Qs.tick(Dh),Qs.composer.render(s)});Object.assign(window,{__ready:!0,__hd2d:{get scene(){return _i},camera:Gi,player:Ie,ohm:ii,THREE:kS,enter:Lc}});
