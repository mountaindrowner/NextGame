import"./modulepreload-polyfill-B5Qt9EMX.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _l="170",_m={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},xm={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pf=0,qc=1,mf=2,vm=3,ym=0,ch=1,hh=2,Jn=3,Mi=0,hn=1,tn=2,jn=0,gs=1,Kr=2,Yc=3,Zc=4,gf=5,Oi=100,_f=101,xf=102,vf=103,yf=104,Mf=200,Sf=201,bf=202,wf=203,Ia=204,La=205,Tf=206,Ef=207,Af=208,Cf=209,Rf=210,Pf=211,If=212,Lf=213,Df=214,Da=0,Ua=1,Na=2,Ms=3,Fa=4,Oa=5,Ba=6,za=7,_o=0,Uf=1,Nf=2,vi=0,uh=1,dh=2,fh=3,xl=4,Ff=5,ph=6,mh=7,$c="attached",Of="detached",vl=300,Si=301,Vi=302,Qr=303,jr=304,mr=306,Ss=1e3,vn=1001,to=1002,Ue=1003,gh=1004,Mm=1004,Qs=1005,Sm=1005,Fe=1006,Vr=1007,bm=1007,Hn=1008,wm=1008,ni=1009,_h=1010,xh=1011,sr=1012,yl=1013,bi=1014,yn=1015,Wn=1016,Ml=1017,Sl=1018,bs=1020,vh=35902,yh=1021,Mh=1022,cn=1023,Sh=1024,bh=1025,_s=1026,ws=1027,bl=1028,xo=1029,wh=1030,wl=1031,Tm=1032,Tl=1033,Hr=33776,Gr=33777,Wr=33778,Xr=33779,ka=35840,Va=35841,Ha=35842,Ga=35843,Wa=36196,Xa=37492,qa=37496,Ya=37808,Za=37809,$a=37810,Ja=37811,Ka=37812,Qa=37813,ja=37814,tl=37815,el=37816,nl=37817,il=37818,sl=37819,rl=37820,ol=37821,qr=36492,al=36494,ll=36495,Th=36283,cl=36284,hl=36285,ul=36286,Bf=2200,zf=2201,kf=2202,eo=2300,dl=2301,Ca=2302,ds=2400,fs=2401,no=2402,El=2500,Eh=2501,Em=0,Am=1,Cm=2,Vf=3200,Hf=3201,Rm=3202,Pm=3203,Gi=0,Gf=1,mi="",We="srgb",Cs="srgb-linear",vo="linear",he="srgb",Im=0,ls=7680,Lm=7681,Dm=7682,Um=7683,Nm=34055,Fm=34056,Om=5386,Bm=512,zm=513,km=514,Vm=515,Hm=516,Gm=517,Wm=518,Jc=519,Wf=512,Xf=513,qf=514,Ah=515,Yf=516,Zf=517,$f=518,Jf=519,io=35044,Xm=35048,qm=35040,Ym=35045,Zm=35049,$m=35041,Jm=35046,Km=35050,Qm=35042,jm="100",Kc="300 es",Qn=2e3,so=2001;class ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yu=1234567;const xs=Math.PI/180,rr=180/Math.PI;function Cn(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[r&255]+Je[r>>8&255]+Je[r>>16&255]+Je[r>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function Re(r,t,e){return Math.max(t,Math.min(e,r))}function Ch(r,t){return(r%t+t)%t}function t0(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function e0(r,t,e){return r!==t?(e-r)/(t-r):0}function Yr(r,t,e){return(1-e)*r+e*t}function n0(r,t,e,n){return Yr(r,t,1-Math.exp(-e*n))}function i0(r,t=1){return t-Math.abs(Ch(r,t*2)-t)}function s0(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function r0(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function o0(r,t){return r+Math.floor(Math.random()*(t-r+1))}function a0(r,t){return r+Math.random()*(t-r)}function l0(r){return r*(.5-Math.random())}function c0(r){r!==void 0&&(yu=r);let t=yu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function h0(r){return r*xs}function u0(r){return r*rr}function d0(r){return(r&r-1)===0&&r!==0}function f0(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function p0(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function m0(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),f=s((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*p,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*p,a*c);break;case"ZYZ":r.set(l*p,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ln(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Yt(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Qc={DEG2RAD:xs,RAD2DEG:rr,generateUUID:Cn,clamp:Re,euclideanModulo:Ch,mapLinear:t0,inverseLerp:e0,lerp:Yr,damp:n0,pingpong:i0,smoothstep:s0,smootherstep:r0,randInt:o0,randFloat:a0,randFloatSpread:l0,seededRandom:c0,degToRad:h0,radToDeg:u0,isPowerOfTwo:d0,ceilPowerOfTwo:f0,floorPowerOfTwo:p0,setQuaternionFromProperEuler:m0,normalize:Yt,denormalize:ln};class q{constructor(t=0,e=0){q.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,n,i,s,o,a,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],v=i[1],x=i[4],y=i[7],P=i[2],E=i[5],C=i[8];return s[0]=o*_+a*v+l*P,s[3]=o*g+a*x+l*E,s[6]=o*m+a*y+l*C,s[1]=c*_+h*v+u*P,s[4]=c*g+h*x+u*E,s[7]=c*m+h*y+u*C,s[2]=d*_+f*v+p*P,s[5]=d*g+f*x+p*E,s[8]=d*m+f*y+p*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,p=e*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Kl.makeScale(t,e)),this}rotate(t){return this.premultiply(Kl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Kl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kl=new Xt;function Kf(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}const g0={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function js(r,t){return new g0[r](t)}function ro(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Qf(){const r=ro("canvas");return r.style.display="block",r}const Mu={};function Or(r){r in Mu||(Mu[r]=!0,console.warn(r))}function _0(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function x0(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function v0(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:Cs,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===he&&(r.r=yi(r.r),r.g=yi(r.g),r.b=yi(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===he&&(r.r=nr(r.r),r.g=nr(r.g),r.b=nr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===mi?vo:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function yi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function nr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Su=[.64,.33,.3,.6,.15,.06],bu=[.2126,.7152,.0722],wu=[.3127,.329],Tu=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Eu=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[Cs]:{primaries:Su,whitePoint:wu,transfer:vo,toXYZ:Tu,fromXYZ:Eu,luminanceCoefficients:bu,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:Su,whitePoint:wu,transfer:he,toXYZ:Tu,fromXYZ:Eu,luminanceCoefficients:bu,outputColorSpaceConfig:{drawingBufferColorSpace:We}}});let Us;class jf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Us===void 0&&(Us=ro("canvas")),Us.width=t.width,Us.height=t.height;const n=Us.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Us}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ro("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=yi(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yi(e[n]/255)*255):e[n]=yi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let y0=0;class ps{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=Cn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Ql(i[o].image)):s.push(Ql(i[o]))}else s=Ql(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Ql(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?jf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let M0=0;class Pe extends ri{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=vn,i=vn,s=Fe,o=Hn,a=cn,l=ni,c=Pe.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=Cn(),this.name="",this.source=new ps(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new q(0,0),this.repeat=new q(1,1),this.center=new q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ss:t.x=t.x-Math.floor(t.x);break;case vn:t.x=t.x<0?0:1;break;case to:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ss:t.y=t.y-Math.floor(t.y);break;case vn:t.y=t.y<0?0:1;break;case to:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=vl;Pe.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,i=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,y=(f+1)/2,P=(m+1)/2,E=(h+d)/4,C=(u+_)/4,R=(p+g)/4;return x>y&&x>P?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=E/n,s=C/n):y>P?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=E/i,s=R/i):P<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(P),n=C/s,i=R/s),this.set(n,i,s,e),this}let v=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tp extends ri{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Pe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ps(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class en extends tp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Al extends Pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class S0 extends en{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Al(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class Rh extends Pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class b0 extends en{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Rh(null,t,e,n),this.texture.isRenderTargetTexture=!0}}class nn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],p=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=p,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==p){let g=1-a;const m=l*d+c*f+h*p+u*_,v=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const P=Math.sqrt(x),E=Math.atan2(P,m*v);g=Math.sin(g*E)/P,a=Math.sin(a*E)/P}const y=a*v;if(l=l*g+d*y,c=c*g+f*y,h=h*g+p*y,u=u*g+_*y,g===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],p=s[o+3];return t[e]=a*p+h*u+l*f-c*d,t[e+1]=l*p+h*d+c*u-a*f,t[e+2]=c*p+h*f+a*d-l*u,t[e+3]=h*p-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),p=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Re(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(t=0,e=0,n=0){T.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Au.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Au.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return jl.copy(this).projectOnVector(t),this.sub(jl)}reflect(t){return this.sub(jl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jl=new T,Au=new nn;class un{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,On):On.fromBufferAttribute(s,o),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),No.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),No.copy(n.boundingBox)),No.applyMatrix4(t.matrixWorld),this.union(No)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(br),Fo.subVectors(this.max,br),Ns.subVectors(t.a,br),Fs.subVectors(t.b,br),Os.subVectors(t.c,br),Ri.subVectors(Fs,Ns),Pi.subVectors(Os,Fs),$i.subVectors(Ns,Os);let e=[0,-Ri.z,Ri.y,0,-Pi.z,Pi.y,0,-$i.z,$i.y,Ri.z,0,-Ri.x,Pi.z,0,-Pi.x,$i.z,0,-$i.x,-Ri.y,Ri.x,0,-Pi.y,Pi.x,0,-$i.y,$i.x,0];return!tc(e,Ns,Fs,Os,Fo)||(e=[1,0,0,0,1,0,0,0,1],!tc(e,Ns,Fs,Os,Fo))?!1:(Oo.crossVectors(Ri,Pi),e=[Oo.x,Oo.y,Oo.z],tc(e,Ns,Fs,Os,Fo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ci=[new T,new T,new T,new T,new T,new T,new T,new T],On=new T,No=new un,Ns=new T,Fs=new T,Os=new T,Ri=new T,Pi=new T,$i=new T,br=new T,Fo=new T,Oo=new T,Ji=new T;function tc(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ji.fromArray(r,s);const a=i.x*Math.abs(Ji.x)+i.y*Math.abs(Ji.y)+i.z*Math.abs(Ji.z),l=t.dot(Ji),c=e.dot(Ji),h=n.dot(Ji);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const w0=new un,wr=new T,ec=new T;class sn{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):w0.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;wr.subVectors(t,this.center);const e=wr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(wr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ec.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(wr.copy(t.center).add(ec)),this.expandByPoint(wr.copy(t.center).sub(ec))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hi=new T,nc=new T,Bo=new T,Ii=new T,ic=new T,zo=new T,sc=new T;class gr{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,hi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=hi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(hi.copy(this.origin).addScaledVector(this.direction,e),hi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){nc.copy(t).add(e).multiplyScalar(.5),Bo.copy(e).sub(t).normalize(),Ii.copy(this.origin).sub(nc);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Bo),a=Ii.dot(this.direction),l=-Ii.dot(Bo),c=Ii.lengthSq(),h=Math.abs(1-o*o);let u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=s*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(nc).addScaledVector(Bo,d),f}intersectSphere(t,e){hi.subVectors(t.center,this.origin);const n=hi.dot(this.direction),i=hi.dot(hi)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,hi)!==null}intersectTriangle(t,e,n,i,s){ic.subVectors(e,t),zo.subVectors(n,t),sc.crossVectors(ic,zo);let o=this.direction.dot(sc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ii.subVectors(this.origin,t);const l=a*this.direction.dot(zo.crossVectors(Ii,zo));if(l<0)return null;const c=a*this.direction.dot(ic.cross(Ii));if(c<0||l+c>o)return null;const h=-a*Ii.dot(sc);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ft{constructor(t,e,n,i,s,o,a,l,c,h,u,d,f,p,_,g){Ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,d,f,p,_,g)}set(t,e,n,i,s,o,a,l,c,h,u,d,f,p,_,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ft().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Bs.setFromMatrixColumn(t,0).length(),s=1/Bs.setFromMatrixColumn(t,1).length(),o=1/Bs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,f=o*u,p=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+p*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,p=c*h,_=c*u;e[0]=d+_*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,p=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,p=a*h,_=a*u;e[0]=l*h,e[4]=p*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=p*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+p,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(T0,t,E0)}lookAt(t,e,n){const i=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Li.crossVectors(n,wn),Li.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Li.crossVectors(n,wn)),Li.normalize(),ko.crossVectors(wn,Li),i[0]=Li.x,i[4]=ko.x,i[8]=wn.x,i[1]=Li.y,i[5]=ko.y,i[9]=wn.y,i[2]=Li.z,i[6]=ko.z,i[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],x=n[7],y=n[11],P=n[15],E=i[0],C=i[4],R=i[8],b=i[12],M=i[1],L=i[5],k=i[9],O=i[13],V=i[2],J=i[6],H=i[10],st=i[14],G=i[3],ht=i[7],xt=i[11],Tt=i[15];return s[0]=o*E+a*M+l*V+c*G,s[4]=o*C+a*L+l*J+c*ht,s[8]=o*R+a*k+l*H+c*xt,s[12]=o*b+a*O+l*st+c*Tt,s[1]=h*E+u*M+d*V+f*G,s[5]=h*C+u*L+d*J+f*ht,s[9]=h*R+u*k+d*H+f*xt,s[13]=h*b+u*O+d*st+f*Tt,s[2]=p*E+_*M+g*V+m*G,s[6]=p*C+_*L+g*J+m*ht,s[10]=p*R+_*k+g*H+m*xt,s[14]=p*b+_*O+g*st+m*Tt,s[3]=v*E+x*M+y*V+P*G,s[7]=v*C+x*L+y*J+P*ht,s[11]=v*R+x*k+y*H+P*xt,s[15]=v*b+x*O+y*st+P*Tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],_=t[7],g=t[11],m=t[15];return p*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+_*(+e*l*f-e*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+g*(+e*c*u-e*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+m*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],_=t[13],g=t[14],m=t[15],v=u*g*c-_*d*c+_*l*f-a*g*f-u*l*m+a*d*m,x=p*d*c-h*g*c-p*l*f+o*g*f+h*l*m-o*d*m,y=h*_*c-p*u*c+p*a*f-o*_*f-h*a*m+o*u*m,P=p*u*l-h*_*l-p*a*d+o*_*d+h*a*g-o*u*g,E=e*v+n*x+i*y+s*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return t[0]=v*C,t[1]=(_*d*s-u*g*s-_*i*f+n*g*f+u*i*m-n*d*m)*C,t[2]=(a*g*s-_*l*s+_*i*c-n*g*c-a*i*m+n*l*m)*C,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*C,t[4]=x*C,t[5]=(h*g*s-p*d*s+p*i*f-e*g*f-h*i*m+e*d*m)*C,t[6]=(p*l*s-o*g*s-p*i*c+e*g*c+o*i*m-e*l*m)*C,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*f+e*l*f)*C,t[8]=y*C,t[9]=(p*u*s-h*_*s-p*n*f+e*_*f+h*n*m-e*u*m)*C,t[10]=(o*_*s-p*a*s+p*n*c-e*_*c-o*n*m+e*a*m)*C,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*f-e*a*f)*C,t[12]=P*C,t[13]=(h*_*i-p*u*i+p*n*d-e*_*d-h*n*g+e*u*g)*C,t[14]=(p*a*i-o*_*i-p*n*l+e*_*l+o*n*g-e*a*g)*C,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,p=s*u,_=o*h,g=o*u,m=a*u,v=l*c,x=l*h,y=l*u,P=n.x,E=n.y,C=n.z;return i[0]=(1-(_+m))*P,i[1]=(f+y)*P,i[2]=(p-x)*P,i[3]=0,i[4]=(f-y)*E,i[5]=(1-(d+m))*E,i[6]=(g+v)*E,i[7]=0,i[8]=(p+x)*C,i[9]=(g-v)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Bs.set(i[0],i[1],i[2]).length();const o=Bs.set(i[4],i[5],i[6]).length(),a=Bs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Bn.copy(this);const c=1/s,h=1/o,u=1/a;return Bn.elements[0]*=c,Bn.elements[1]*=c,Bn.elements[2]*=c,Bn.elements[4]*=h,Bn.elements[5]*=h,Bn.elements[6]*=h,Bn.elements[8]*=u,Bn.elements[9]*=u,Bn.elements[10]*=u,e.setFromRotationMatrix(Bn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Qn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,p;if(a===Qn)f=-(o+s)/(o-s),p=-2*o*s/(o-s);else if(a===so)f=-o/(o-s),p=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Qn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*c,f=(n+i)*h;let p,_;if(a===Qn)p=(o+s)*u,_=-2*u;else if(a===so)p=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Bs=new T,Bn=new Ft,T0=new T(0,0,0),E0=new T(1,1,1),Li=new T,ko=new T,wn=new T,Cu=new Ft,Ru=new nn;class fn{constructor(t=0,e=0,n=0,i=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Re(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Re(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Cu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ru.setFromEuler(this),this.setFromQuaternion(Ru,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class Cl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let A0=0;const Pu=new T,zs=new nn,ui=new Ft,Vo=new T,Tr=new T,C0=new T,R0=new nn,Iu=new T(1,0,0),Lu=new T(0,1,0),Du=new T(0,0,1),Uu={type:"added"},P0={type:"removed"},ks={type:"childadded",child:null},rc={type:"childremoved",child:null};class se extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:A0++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=se.DEFAULT_UP.clone();const t=new T,e=new fn,n=new nn,i=new T(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ft},normalMatrix:{value:new Xt}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return zs.setFromAxisAngle(t,e),this.quaternion.multiply(zs),this}rotateOnWorldAxis(t,e){return zs.setFromAxisAngle(t,e),this.quaternion.premultiply(zs),this}rotateX(t){return this.rotateOnAxis(Iu,t)}rotateY(t){return this.rotateOnAxis(Lu,t)}rotateZ(t){return this.rotateOnAxis(Du,t)}translateOnAxis(t,e){return Pu.copy(t).applyQuaternion(this.quaternion),this.position.add(Pu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Iu,t)}translateY(t){return this.translateOnAxis(Lu,t)}translateZ(t){return this.translateOnAxis(Du,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vo.copy(t):Vo.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Tr,Vo,this.up):ui.lookAt(Vo,Tr,this.up),this.quaternion.setFromRotationMatrix(ui),i&&(ui.extractRotation(i.matrixWorld),zs.setFromRotationMatrix(ui),this.quaternion.premultiply(zs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uu),ks.child=t,this.dispatchEvent(ks),ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(P0),rc.child=t,this.dispatchEvent(rc),rc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ui.multiply(t.parent.matrixWorld)),t.applyMatrix4(ui),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uu),ks.child=t,this.dispatchEvent(ks),ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,t,C0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,R0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}se.DEFAULT_UP=new T(0,1,0);se.DEFAULT_MATRIX_AUTO_UPDATE=!0;se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new T,di=new T,oc=new T,fi=new T,Vs=new T,Hs=new T,Nu=new T,ac=new T,lc=new T,cc=new T,hc=new ie,uc=new ie,dc=new ie;class xn{constructor(t=new T,e=new T,n=new T){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),zn.subVectors(t,e),i.cross(zn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){zn.subVectors(i,e),di.subVectors(n,e),oc.subVectors(t,e);const o=zn.dot(zn),a=zn.dot(di),l=zn.dot(oc),c=di.dot(di),h=di.dot(oc),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return s.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fi.x),l.addScaledVector(o,fi.y),l.addScaledVector(a,fi.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return hc.setScalar(0),uc.setScalar(0),dc.setScalar(0),hc.fromBufferAttribute(t,e),uc.fromBufferAttribute(t,n),dc.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(hc,s.x),o.addScaledVector(uc,s.y),o.addScaledVector(dc,s.z),o}static isFrontFacing(t,e,n,i){return zn.subVectors(n,e),di.subVectors(t,e),zn.cross(di).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),zn.cross(di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Vs.subVectors(i,n),Hs.subVectors(s,n),ac.subVectors(t,n);const l=Vs.dot(ac),c=Hs.dot(ac);if(l<=0&&c<=0)return e.copy(n);lc.subVectors(t,i);const h=Vs.dot(lc),u=Hs.dot(lc);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Vs,o);cc.subVectors(t,s);const f=Vs.dot(cc),p=Hs.dot(cc);if(p>=0&&f<=p)return e.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Hs,a);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Nu.subVectors(s,i),a=(u-h)/(u-h+(f-p)),e.copy(i).addScaledVector(Nu,a);const m=1/(g+_+d);return o=_*m,a=d*m,e.copy(n).addScaledVector(Vs,o).addScaledVector(Hs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ep={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Ho={h:0,s:0,l:0};function fc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class it{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=Ch(t,1),e=Re(e,0,1),n=Re(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=fc(o,s,t+1/3),this.g=fc(o,s,t),this.b=fc(o,s,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=We){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){const n=ep[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yi(t.r),this.g=yi(t.g),this.b=yi(t.b),this}copyLinearToSRGB(t){return this.r=nr(t.r),this.g=nr(t.g),this.b=nr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return jt.fromWorkingColorSpace(Ke.copy(this),t),Math.round(Re(Ke.r*255,0,255))*65536+Math.round(Re(Ke.g*255,0,255))*256+Math.round(Re(Ke.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Ke.copy(this),e);const n=Ke.r,i=Ke.g,s=Ke.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=We){jt.fromWorkingColorSpace(Ke.copy(this),t);const e=Ke.r,n=Ke.g,i=Ke.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Di),this.setHSL(Di.h+t,Di.s+e,Di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Di),t.getHSL(Ho);const n=Yr(Di.h,Ho.h,e),i=Yr(Di.s,Ho.s,e),s=Yr(Di.l,Ho.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ke=new it;it.NAMES=ep;let I0=0;class rn extends ri{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=Cn(),this.name="",this.blending=gs,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=La,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ls,this.stencilZFail=ls,this.stencilZPass=ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==Mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ia&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ls&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ls&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ls&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Un extends rn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=_o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const gi=L0();function L0(){const r=new ArrayBuffer(4),t=new Float32Array(r),e=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function _n(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=Re(r,-65504,65504),gi.floatView[0]=r;const t=gi.uint32View[0],e=t>>23&511;return gi.baseTable[e]+((t&8388607)>>gi.shiftTable[e])}function Br(r){const t=r>>10;return gi.uint32View[0]=gi.mantissaTable[gi.offsetTable[t]+(r&1023)]+gi.exponentTable[t],gi.floatView[0]}const D0={toHalfFloat:_n,fromHalfFloat:Br},Ne=new T,Go=new q;class pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=io,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Go.fromBufferAttribute(this,e),Go.applyMatrix3(t),this.setXY(e,Go.x,Go.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Yt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==io&&(t.usage=this.usage),t}}class U0 extends pe{constructor(t,e,n){super(new Int8Array(t),e,n)}}class N0 extends pe{constructor(t,e,n){super(new Uint8Array(t),e,n)}}class F0 extends pe{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}}class O0 extends pe{constructor(t,e,n){super(new Int16Array(t),e,n)}}class Ph extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class B0 extends pe{constructor(t,e,n){super(new Int32Array(t),e,n)}}class Ih extends pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class z0 extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=Br(this.array[t*this.itemSize]);return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize]=_n(e),this}getY(t){let e=Br(this.array[t*this.itemSize+1]);return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+1]=_n(e),this}getZ(t){let e=Br(this.array[t*this.itemSize+2]);return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+2]=_n(e),this}getW(t){let e=Br(this.array[t*this.itemSize+3]);return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+3]=_n(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array)),this.array[t+0]=_n(e),this.array[t+1]=_n(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array)),this.array[t+0]=_n(e),this.array[t+1]=_n(n),this.array[t+2]=_n(i),this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array)),this.array[t+0]=_n(e),this.array[t+1]=_n(n),this.array[t+2]=_n(i),this.array[t+3]=_n(s),this}}class Mt extends pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let k0=0;const In=new Ft,pc=new se,Gs=new T,Tn=new un,Er=new un,Ve=new T;class Wt extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kf(t)?Ih:Ph)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Xt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return pc.lookAt(t),pc.updateMatrix(),this.applyMatrix4(pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gs).negate(),this.translate(Gs.x,Gs.y,Gs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Mt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){const n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Er.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(Tn.min,Er.min),Tn.expandByPoint(Ve),Ve.addVectors(Tn.max,Er.max),Tn.expandByPoint(Ve)):(Tn.expandByPoint(Er.min),Tn.expandByPoint(Er.max))}Tn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Ve.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ve));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ve.fromBufferAttribute(a,c),l&&(Gs.fromBufferAttribute(t,c),Ve.add(Gs)),i=Math.max(i,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new T,l[R]=new T;const c=new T,h=new T,u=new T,d=new q,f=new q,p=new q,_=new T,g=new T;function m(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,b),p.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const L=1/(f.x*p.y-p.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(L),a[R].add(_),a[b].add(_),a[M].add(_),l[R].add(g),l[b].add(g),l[M].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let R=0,b=v.length;R<b;++R){const M=v[R],L=M.start,k=M.count;for(let O=L,V=L+k;O<V;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const x=new T,y=new T,P=new T,E=new T;function C(R){P.fromBufferAttribute(i,R),E.copy(P);const b=a[R];x.copy(b),x.sub(P.multiplyScalar(P.dot(b))).normalize(),y.crossVectors(E,b);const L=y.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,L)}for(let R=0,b=v.length;R<b;++R){const M=v[R],L=M.start,k=M.count;for(let O=L,V=L+k;O<V;O+=3)C(t.getX(O+0)),C(t.getX(O+1)),C(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new T,s=new T,o=new T,a=new T,l=new T,c=new T,h=new T,u=new T;if(t)for(let d=0,f=t.count;d<f;d+=3){const p=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new pe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Wt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fu=new Ft,Ki=new gr,Wo=new sn,Ou=new T,Xo=new T,qo=new T,Yo=new T,mc=new T,Zo=new T,Bu=new T,$o=new T;class ft extends se{constructor(t=new Wt,e=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Zo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(mc.fromBufferAttribute(u,t),o?Zo.addScaledVector(mc,h):Zo.addScaledVector(mc.sub(e),h))}e.add(Zo)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(s),Ki.copy(t.ray).recast(t.near),!(Wo.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(Wo,Ou)===null||Ki.origin.distanceToSquared(Ou)>(t.far-t.near)**2))&&(Fu.copy(s).invert(),Ki.copy(t.ray).applyMatrix4(Fu),!(n.boundingBox!==null&&Ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ki)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,P=x;y<P;y+=3){const E=a.getX(y),C=a.getX(y+1),R=a.getX(y+2);i=Jo(this,m,t,n,c,h,u,E,C,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=Jo(this,o,t,n,c,h,u,v,x,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){const g=d[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,P=x;y<P;y+=3){const E=y,C=y+1,R=y+2;i=Jo(this,m,t,n,c,h,u,E,C,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,x=g+1,y=g+2;i=Jo(this,o,t,n,c,h,u,v,x,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function V0(r,t,e,n,i,s,o,a){let l;if(t.side===hn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Mi,a),l===null)return null;$o.copy(a),$o.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo($o);return c<e.near||c>e.far?null:{distance:c,point:$o.clone(),object:r}}function Jo(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Xo),r.getVertexPosition(l,qo),r.getVertexPosition(c,Yo);const h=V0(r,t,e,n,Xo,qo,Yo,Bu);if(h){const u=new T;xn.getBarycoord(Bu,Xo,qo,Yo,u),i&&(h.uv=xn.getInterpolatedAttribute(i,a,l,c,u,new q)),s&&(h.uv1=xn.getInterpolatedAttribute(s,a,l,c,u,new q)),o&&(h.normal=xn.getInterpolatedAttribute(o,a,l,c,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new T,materialIndex:0};xn.getNormal(Xo,qo,Yo,d.normal),h.face=d,h.barycoord=u}return h}class Wi extends Wt{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,e,t,o,s,0),p("z","y","x",1,-1,n,e,-t,o,s,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(u,2));function p(_,g,m,v,x,y,P,E,C,R,b){const M=y/C,L=P/R,k=y/2,O=P/2,V=E/2,J=C+1,H=R+1;let st=0,G=0;const ht=new T;for(let xt=0;xt<H;xt++){const Tt=xt*L-O;for(let qt=0;qt<J;qt++){const ae=qt*M-k;ht[_]=ae*v,ht[g]=Tt*x,ht[m]=V,c.push(ht.x,ht.y,ht.z),ht[_]=0,ht[g]=0,ht[m]=E>0?1:-1,h.push(ht.x,ht.y,ht.z),u.push(qt/C),u.push(1-xt/R),st+=1}}for(let xt=0;xt<R;xt++)for(let Tt=0;Tt<C;Tt++){const qt=d+Tt+J*xt,ae=d+Tt+J*(xt+1),$=d+(Tt+1)+J*(xt+1),ot=d+(Tt+1)+J*xt;l.push(qt,ae,ot),l.push(ae,$,ot),G+=6}a.addGroup(f,G,b),f+=G,d+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function or(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function an(r){const t={};for(let e=0;e<r.length;e++){const n=or(r[e]);for(const i in n)t[i]=n[i]}return t}function H0(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function np(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const ar={clone:or,merge:an};var G0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,W0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qe extends rn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=G0,this.fragmentShader=W0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=or(t.uniforms),this.uniformsGroups=H0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Rl extends se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=Qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new T,zu=new q,ku=new q;class Xe extends Rl{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rr*2*Math.atan(Math.tan(xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z)}getViewSize(t,e){return this.getViewBounds(t,zu,ku),e.subVectors(ku,zu)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ws=-90,Xs=1;class ip extends se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Xe(Ws,Xs,t,e);i.layers=this.layers,this.add(i);const s=new Xe(Ws,Xs,t,e);s.layers=this.layers,this.add(s);const o=new Xe(Ws,Xs,t,e);o.layers=this.layers,this.add(o);const a=new Xe(Ws,Xs,t,e);a.layers=this.layers,this.add(a);const l=new Xe(Ws,Xs,t,e);l.layers=this.layers,this.add(l);const c=new Xe(Ws,Xs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===so)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class yo extends Pe{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Si,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class sp extends en{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new yo(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Fe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Wi(5,5,5),s=new qe({name:"CubemapFromEquirect",uniforms:or(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:hn,blending:jn});s.uniforms.tEquirect.value=e;const o=new ft(i,s),a=e.minFilter;return e.minFilter===Hn&&(e.minFilter=Fe),new ip(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const gc=new T,X0=new T,q0=new Xt;class Fi{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=gc.subVectors(n,e).cross(X0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(gc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||q0.getNormalMatrix(t),i=this.coplanarPoint(gc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qi=new sn,Ko=new T;class Mo{constructor(t=new Fi,e=new Fi,n=new Fi,i=new Fi,s=new Fi,o=new Fi){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Qn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],_=i[10],g=i[11],m=i[12],v=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,g-f,y-m).normalize(),n[1].setComponents(l+s,d+c,g+f,y+m).normalize(),n[2].setComponents(l+o,d+h,g+p,y+v).normalize(),n[3].setComponents(l-o,d-h,g-p,y-v).normalize(),n[4].setComponents(l-a,d-u,g-_,y-x).normalize(),e===Qn)n[5].setComponents(l+a,d+u,g+_,y+x).normalize();else if(e===so)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(t){return Qi.center.set(0,0,0),Qi.radius=.7071067811865476,Qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ko.x=i.normal.x>0?t.max.x:t.min.x,Ko.y=i.normal.y>0?t.max.y:t.min.y,Ko.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ko)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function rp(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Y0(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const _=u[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class Ye extends Wt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const v=m*d-o;for(let x=0;x<c;x++){const y=x*u-s;p.push(y,-v,0),_.push(0,0,1),g.push(x/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){const x=v+c*m,y=v+c*(m+1),P=v+1+c*(m+1),E=v+1+c*m;f.push(x,y,E),f.push(y,P,E)}this.setIndex(f),this.setAttribute("position",new Mt(p,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ye(t.width,t.height,t.widthSegments,t.heightSegments)}}var Z0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$0=`#ifdef USE_ALPHAHASH
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
#endif`,J0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,K0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,j0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tg=`#ifdef USE_AOMAP
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
#endif`,eg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ng=`#ifdef USE_BATCHING
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
#endif`,ig=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,og=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ag=`#ifdef USE_IRIDESCENCE
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
#endif`,lg=`#ifdef USE_BUMPMAP
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
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ug=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,_g=`#define PI 3.141592653589793
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
} // validated`,xg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vg=`vec3 transformedNormal = objectNormal;
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
#endif`,yg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Eg=`#ifdef USE_ENVMAP
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
#endif`,Ag=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cg=`#ifdef USE_ENVMAP
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
#endif`,Rg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pg=`#ifdef USE_ENVMAP
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
#endif`,Ig=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ug=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ng=`#ifdef USE_GRADIENTMAP
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
}`,Fg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Og=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zg=`uniform bool receiveShadow;
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
#endif`,kg=`#ifdef USE_ENVMAP
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
#endif`,Vg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xg=`PhysicalMaterial material;
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
#endif`,qg=`struct PhysicalMaterial {
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
}`,Yg=`
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
#endif`,Zg=`#if defined( RE_IndirectDiffuse )
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
#endif`,$g=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,t_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,e_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,i_=`#if defined( USE_POINTS_UV )
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
#endif`,s_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,r_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,o_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,a_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,l_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c_=`#ifdef USE_MORPHTARGETS
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
#endif`,h_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,d_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,f_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,g_=`#ifdef USE_NORMALMAP
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
#endif`,__=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,x_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,v_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,M_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,S_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,b_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,w_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,T_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,E_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,C_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,R_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,P_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,I_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,L_=`float getShadowMask() {
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
}`,D_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,U_=`#ifdef USE_SKINNING
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
#endif`,N_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,F_=`#ifdef USE_SKINNING
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
#endif`,O_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,B_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,k_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,V_=`#ifdef USE_TRANSMISSION
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
#endif`,H_=`#ifdef USE_TRANSMISSION
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
#endif`,G_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Z_=`uniform sampler2D t2D;
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
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,K_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Q_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j_=`#include <common>
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
}`,tx=`#if DEPTH_PACKING == 3200
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
}`,ex=`#define DISTANCE
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
}`,nx=`#define DISTANCE
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`uniform float scale;
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
}`,ox=`uniform vec3 diffuse;
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
}`,ax=`#include <common>
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
}`,lx=`uniform vec3 diffuse;
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
}`,cx=`#define LAMBERT
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
}`,hx=`#define LAMBERT
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
}`,ux=`#define MATCAP
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
}`,dx=`#define MATCAP
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
}`,fx=`#define NORMAL
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
}`,px=`#define NORMAL
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
}`,mx=`#define PHONG
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
}`,gx=`#define PHONG
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
}`,_x=`#define STANDARD
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
}`,xx=`#define STANDARD
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
}`,vx=`#define TOON
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
}`,yx=`#define TOON
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
}`,Mx=`uniform float size;
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
}`,Sx=`uniform vec3 diffuse;
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
}`,bx=`#include <common>
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
}`,wx=`uniform vec3 color;
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
}`,Tx=`uniform float rotation;
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
}`,Ex=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:Z0,alphahash_pars_fragment:$0,alphamap_fragment:J0,alphamap_pars_fragment:K0,alphatest_fragment:Q0,alphatest_pars_fragment:j0,aomap_fragment:tg,aomap_pars_fragment:eg,batching_pars_vertex:ng,batching_vertex:ig,begin_vertex:sg,beginnormal_vertex:rg,bsdfs:og,iridescence_fragment:ag,bumpmap_pars_fragment:lg,clipping_planes_fragment:cg,clipping_planes_pars_fragment:hg,clipping_planes_pars_vertex:ug,clipping_planes_vertex:dg,color_fragment:fg,color_pars_fragment:pg,color_pars_vertex:mg,color_vertex:gg,common:_g,cube_uv_reflection_fragment:xg,defaultnormal_vertex:vg,displacementmap_pars_vertex:yg,displacementmap_vertex:Mg,emissivemap_fragment:Sg,emissivemap_pars_fragment:bg,colorspace_fragment:wg,colorspace_pars_fragment:Tg,envmap_fragment:Eg,envmap_common_pars_fragment:Ag,envmap_pars_fragment:Cg,envmap_pars_vertex:Rg,envmap_physical_pars_fragment:kg,envmap_vertex:Pg,fog_vertex:Ig,fog_pars_vertex:Lg,fog_fragment:Dg,fog_pars_fragment:Ug,gradientmap_pars_fragment:Ng,lightmap_pars_fragment:Fg,lights_lambert_fragment:Og,lights_lambert_pars_fragment:Bg,lights_pars_begin:zg,lights_toon_fragment:Vg,lights_toon_pars_fragment:Hg,lights_phong_fragment:Gg,lights_phong_pars_fragment:Wg,lights_physical_fragment:Xg,lights_physical_pars_fragment:qg,lights_fragment_begin:Yg,lights_fragment_maps:Zg,lights_fragment_end:$g,logdepthbuf_fragment:Jg,logdepthbuf_pars_fragment:Kg,logdepthbuf_pars_vertex:Qg,logdepthbuf_vertex:jg,map_fragment:t_,map_pars_fragment:e_,map_particle_fragment:n_,map_particle_pars_fragment:i_,metalnessmap_fragment:s_,metalnessmap_pars_fragment:r_,morphinstance_vertex:o_,morphcolor_vertex:a_,morphnormal_vertex:l_,morphtarget_pars_vertex:c_,morphtarget_vertex:h_,normal_fragment_begin:u_,normal_fragment_maps:d_,normal_pars_fragment:f_,normal_pars_vertex:p_,normal_vertex:m_,normalmap_pars_fragment:g_,clearcoat_normal_fragment_begin:__,clearcoat_normal_fragment_maps:x_,clearcoat_pars_fragment:v_,iridescence_pars_fragment:y_,opaque_fragment:M_,packing:S_,premultiplied_alpha_fragment:b_,project_vertex:w_,dithering_fragment:T_,dithering_pars_fragment:E_,roughnessmap_fragment:A_,roughnessmap_pars_fragment:C_,shadowmap_pars_fragment:R_,shadowmap_pars_vertex:P_,shadowmap_vertex:I_,shadowmask_pars_fragment:L_,skinbase_vertex:D_,skinning_pars_vertex:U_,skinning_vertex:N_,skinnormal_vertex:F_,specularmap_fragment:O_,specularmap_pars_fragment:B_,tonemapping_fragment:z_,tonemapping_pars_fragment:k_,transmission_fragment:V_,transmission_pars_fragment:H_,uv_pars_fragment:G_,uv_pars_vertex:W_,uv_vertex:X_,worldpos_vertex:q_,background_vert:Y_,background_frag:Z_,backgroundCube_vert:$_,backgroundCube_frag:J_,cube_vert:K_,cube_frag:Q_,depth_vert:j_,depth_frag:tx,distanceRGBA_vert:ex,distanceRGBA_frag:nx,equirect_vert:ix,equirect_frag:sx,linedashed_vert:rx,linedashed_frag:ox,meshbasic_vert:ax,meshbasic_frag:lx,meshlambert_vert:cx,meshlambert_frag:hx,meshmatcap_vert:ux,meshmatcap_frag:dx,meshnormal_vert:fx,meshnormal_frag:px,meshphong_vert:mx,meshphong_frag:gx,meshphysical_vert:_x,meshphysical_frag:xx,meshtoon_vert:vx,meshtoon_frag:yx,points_vert:Mx,points_frag:Sx,shadow_vert:bx,shadow_frag:wx,sprite_vert:Tx,sprite_frag:Ex},ut={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},Vn={basic:{uniforms:an([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:an([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new it(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:an([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:an([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:an([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new it(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:an([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:an([ut.points,ut.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:an([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:an([ut.common,ut.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:an([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:an([ut.sprite,ut.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:an([ut.common,ut.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:an([ut.lights,ut.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Vn.physical={uniforms:an([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Qo={r:0,b:0,g:0},ji=new fn,Ax=new Ft;function Cx(r,t,e,n,i,s,o){const a=new it(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function p(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?e:t).get(x)),x}function _(v){let x=!1;const y=p(v);y===null?m(a,l):y&&y.isColor&&(m(y,1),x=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(v,x){const y=p(x);y&&(y.isCubeTexture||y.mapping===mr)?(h===void 0&&(h=new ft(new Wi(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:or(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ji.copy(x.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(ji)),h.material.toneMapped=jt.getTransfer(y.colorSpace)!==he,(u!==y||d!==y.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ft(new Ye(2,2),new qe({name:"BackgroundMaterial",uniforms:or(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=jt.getTransfer(y.colorSpace)!==he,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,x){v.getRGB(Qo,np(r)),n.buffers.color.setClear(Qo.r,Qo.g,Qo.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(a,l)},render:_,addToRenderList:g}}function Rx(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(M,L,k,O,V){let J=!1;const H=u(O,k,L);s!==H&&(s=H,c(s.object)),J=f(M,O,k,V),J&&p(M,O,k,V),V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,y(M,L,k,O),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,L,k){const O=k.wireframe===!0;let V=n[M.id];V===void 0&&(V={},n[M.id]=V);let J=V[L.id];J===void 0&&(J={},V[L.id]=J);let H=J[O];return H===void 0&&(H=d(l()),J[O]=H),H}function d(M){const L=[],k=[],O=[];for(let V=0;V<e;V++)L[V]=0,k[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:k,attributeDivisors:O,object:M,attributes:{},index:null}}function f(M,L,k,O){const V=s.attributes,J=L.attributes;let H=0;const st=k.getAttributes();for(const G in st)if(st[G].location>=0){const xt=V[G];let Tt=J[G];if(Tt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(Tt=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(Tt=M.instanceColor)),xt===void 0||xt.attribute!==Tt||Tt&&xt.data!==Tt.data)return!0;H++}return s.attributesNum!==H||s.index!==O}function p(M,L,k,O){const V={},J=L.attributes;let H=0;const st=k.getAttributes();for(const G in st)if(st[G].location>=0){let xt=J[G];xt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(xt=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(xt=M.instanceColor));const Tt={};Tt.attribute=xt,xt&&xt.data&&(Tt.data=xt.data),V[G]=Tt,H++}s.attributes=V,s.attributesNum=H,s.index=O}function _(){const M=s.newAttributes;for(let L=0,k=M.length;L<k;L++)M[L]=0}function g(M){m(M,0)}function m(M,L){const k=s.newAttributes,O=s.enabledAttributes,V=s.attributeDivisors;k[M]=1,O[M]===0&&(r.enableVertexAttribArray(M),O[M]=1),V[M]!==L&&(r.vertexAttribDivisor(M,L),V[M]=L)}function v(){const M=s.newAttributes,L=s.enabledAttributes;for(let k=0,O=L.length;k<O;k++)L[k]!==M[k]&&(r.disableVertexAttribArray(k),L[k]=0)}function x(M,L,k,O,V,J,H){H===!0?r.vertexAttribIPointer(M,L,k,V,J):r.vertexAttribPointer(M,L,k,O,V,J)}function y(M,L,k,O){_();const V=O.attributes,J=k.getAttributes(),H=L.defaultAttributeValues;for(const st in J){const G=J[st];if(G.location>=0){let ht=V[st];if(ht===void 0&&(st==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),st==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor)),ht!==void 0){const xt=ht.normalized,Tt=ht.itemSize,qt=t.get(ht);if(qt===void 0)continue;const ae=qt.buffer,$=qt.type,ot=qt.bytesPerElement,At=$===r.INT||$===r.UNSIGNED_INT||ht.gpuType===yl;if(ht.isInterleavedBufferAttribute){const lt=ht.data,Nt=lt.stride,Vt=ht.offset;if(lt.isInstancedInterleavedBuffer){for(let zt=0;zt<G.locationSize;zt++)m(G.location+zt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let zt=0;zt<G.locationSize;zt++)g(G.location+zt);r.bindBuffer(r.ARRAY_BUFFER,ae);for(let zt=0;zt<G.locationSize;zt++)x(G.location+zt,Tt/G.locationSize,$,xt,Nt*ot,(Vt+Tt/G.locationSize*zt)*ot,At)}else{if(ht.isInstancedBufferAttribute){for(let lt=0;lt<G.locationSize;lt++)m(G.location+lt,ht.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let lt=0;lt<G.locationSize;lt++)g(G.location+lt);r.bindBuffer(r.ARRAY_BUFFER,ae);for(let lt=0;lt<G.locationSize;lt++)x(G.location+lt,Tt/G.locationSize,$,xt,Tt*ot,Tt/G.locationSize*lt*ot,At)}}else if(H!==void 0){const xt=H[st];if(xt!==void 0)switch(xt.length){case 2:r.vertexAttrib2fv(G.location,xt);break;case 3:r.vertexAttrib3fv(G.location,xt);break;case 4:r.vertexAttrib4fv(G.location,xt);break;default:r.vertexAttrib1fv(G.location,xt)}}}}v()}function P(){R();for(const M in n){const L=n[M];for(const k in L){const O=L[k];for(const V in O)h(O[V].object),delete O[V];delete L[k]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const k in L){const O=L[k];for(const V in O)h(O[V].object),delete O[V];delete L[k]}delete n[M.id]}function C(M){for(const L in n){const k=n[L];if(k[M.id]===void 0)continue;const O=k[M.id];for(const V in O)h(O[V].object),delete O[V];delete k[M.id]}}function R(){b(),o=!0,s!==i&&(s=i,c(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function Px(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)o(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let _=0;_<u;_++)p+=h[_]*d[_];e.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ix(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==cn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const R=C===Wn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==ni&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==yn&&!R)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=p>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:P,maxSamples:E}}function Lx(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Fi,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):c();else{const v=s?0:n,x=v*4;let y=m.clippingState||null;l.value=y,y=h(p,d,x,f);for(let P=0;P!==x;++P)y[P]=e[P];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,y=f;x!==_;++x,y+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Dx(r){let t=new WeakMap;function e(o,a){return a===Qr?o.mapping=Si:a===jr&&(o.mapping=Vi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Qr||a===jr)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new sp(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class So extends Rl{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const tr=4,Vu=[.125,.215,.35,.446,.526,.582],us=20,_c=new So,Hu=new it;let xc=null,vc=0,yc=0,Mc=!1;const cs=(1+Math.sqrt(5))/2,qs=1/cs,Gu=[new T(-cs,qs,0),new T(cs,qs,0),new T(-qs,0,cs),new T(qs,0,cs),new T(0,cs,-qs),new T(0,cs,qs),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class jc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){xc=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(xc,vc,yc),this._renderer.xr.enabled=Mc,t.scissorTest=!1,jo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===Vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xc=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:Wn,format:cn,colorSpace:Cs,depthBuffer:!1},i=Wu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wu(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ux(s)),this._blurMaterial=Nx(s,t,e)}return i}_compileMaterial(t){const e=new ft(this._lodPlanes[0],t);this._renderer.compile(e,_c)}_sceneToCubeUV(t,e,n,i){const a=new Xe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Hu),h.toneMapping=vi,h.autoClear=!1;const f=new Un({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),p=new ft(new Wi,f);let _=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(Hu),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):v===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;jo(i,v*x,m>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Si||t.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=qu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xu());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new ft(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;jo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,_c)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Gu[(i-s-1)%Gu.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ft(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*us-1),_=s/p,g=isFinite(s)?1+Math.floor(h*_):us;g>us&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${us}`);const m=[];let v=0;for(let C=0;C<us;++C){const R=C/_,b=Math.exp(-R*R/2);m.push(b),C===0?v+=b:C<g&&(v+=2*b)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=p,d.mipInt.value=x-n;const y=this._sizeLods[i],P=3*y*(i>x-tr?i-x+tr:0),E=4*(this._cubeSize-y);jo(e,P,E,3*y,2*y),l.setRenderTarget(e),l.render(u,_c)}}function Ux(r){const t=[],e=[],n=[];let i=r;const s=r-tr+1+Vu.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-tr?l=Vu[o-r+tr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),x=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,R=E>2?0:-1,b=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];v.set(b,_*p*E),x.set(d,g*p*E);const M=[E,E,E,E,E,E];y.set(M,m*p*E)}const P=new Wt;P.setAttribute("position",new pe(v,_)),P.setAttribute("uv",new pe(x,g)),P.setAttribute("faceIndex",new pe(y,m)),t.push(P),i>tr&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wu(r,t,e){const n=new en(r,t,e);return n.texture.mapping=mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jo(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Nx(r,t,e){const n=new Float32Array(us),i=new T(0,1,0);return new qe({name:"SphericalGaussianBlur",defines:{n:us,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Lh(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Xu(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lh(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function qu(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Lh(){return`

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
	`}function Fx(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Qr||l===jr,h=l===Si||l===Vi;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new jc(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new jc(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ox(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Or("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Bx(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const p in d.attributes)t.remove(d.attributes[p]);for(const p in d.morphAttributes){const _=d.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)t.remove(_[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)t.update(d[p],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const _=f[p];for(let g=0,m=_.length;g<m;g++)t.update(_[g],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,y=v.length;x<y;x+=3){const P=v[x+0],E=v[x+1],C=v[x+2];d.push(P,E,E,C,C,P)}}else if(p!==void 0){const v=p.array;_=p.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const P=x+0,E=x+1,C=x+2;d.push(P,E,E,C,C,P)}}else return;const g=new(Kf(d)?Ih:Ph)(d,1);g.version=_;const m=s.get(u);m&&t.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function zx(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function c(d,f,p){p!==0&&(r.drawElementsInstanced(n,f,s,d*o,p),e.update(f,n,p))}function h(d,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function u(d,f,p,_){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=f[v]*_[v];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function kx(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Vx(r,t,e){const n=new WeakMap,i=new ie;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),p===!0&&(x=2),_===!0&&(x=3);let y=a.attributes.position.count*x,P=1;y>t.maxTextureSize&&(P=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const E=new Float32Array(y*P*4*u),C=new Al(E,y,P,u);C.type=yn,C.needsUpdate=!0;const R=x*4;for(let M=0;M<u;M++){const L=g[M],k=m[M],O=v[M],V=y*P*4*M;for(let J=0;J<L.count;J++){const H=J*R;f===!0&&(i.fromBufferAttribute(L,J),E[V+H+0]=i.x,E[V+H+1]=i.y,E[V+H+2]=i.z,E[V+H+3]=0),p===!0&&(i.fromBufferAttribute(k,J),E[V+H+4]=i.x,E[V+H+5]=i.y,E[V+H+6]=i.z,E[V+H+7]=0),_===!0&&(i.fromBufferAttribute(O,J),E[V+H+8]=i.x,E[V+H+9]=i.y,E[V+H+10]=i.z,E[V+H+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new q(y,P)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Hx(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Dh extends Pe{constructor(t,e,n,i,s,o,a,l,c,h=_s){if(h!==_s&&h!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===_s&&(n=bi),n===void 0&&h===ws&&(n=bs),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ue,this.minFilter=l!==void 0?l:Ue,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const op=new Pe,Yu=new Dh(1,1),ap=new Al,lp=new Rh,cp=new yo,Zu=[],$u=[],Ju=new Float32Array(16),Ku=new Float32Array(9),Qu=new Float32Array(4);function _r(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Zu[i];if(s===void 0&&(s=new Float32Array(i),Zu[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function ze(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function ke(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Pl(r,t){let e=$u[t];e===void 0&&(e=new Int32Array(t),$u[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Gx(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Wx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2fv(this.addr,t),ke(e,t)}}function Xx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;r.uniform3fv(this.addr,t),ke(e,t)}}function qx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4fv(this.addr,t),ke(e,t)}}function Yx(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Qu.set(n),r.uniformMatrix2fv(this.addr,!1,Qu),ke(e,n)}}function Zx(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Ku.set(n),r.uniformMatrix3fv(this.addr,!1,Ku),ke(e,n)}}function $x(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Ju.set(n),r.uniformMatrix4fv(this.addr,!1,Ju),ke(e,n)}}function Jx(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Kx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2iv(this.addr,t),ke(e,t)}}function Qx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3iv(this.addr,t),ke(e,t)}}function jx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4iv(this.addr,t),ke(e,t)}}function tv(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function ev(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2uiv(this.addr,t),ke(e,t)}}function nv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3uiv(this.addr,t),ke(e,t)}}function iv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4uiv(this.addr,t),ke(e,t)}}function sv(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Yu.compareFunction=Ah,s=Yu):s=op,e.setTexture2D(t||s,i)}function rv(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||lp,i)}function ov(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||cp,i)}function av(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||ap,i)}function lv(r){switch(r){case 5126:return Gx;case 35664:return Wx;case 35665:return Xx;case 35666:return qx;case 35674:return Yx;case 35675:return Zx;case 35676:return $x;case 5124:case 35670:return Jx;case 35667:case 35671:return Kx;case 35668:case 35672:return Qx;case 35669:case 35673:return jx;case 5125:return tv;case 36294:return ev;case 36295:return nv;case 36296:return iv;case 35678:case 36198:case 36298:case 36306:case 35682:return sv;case 35679:case 36299:case 36307:return rv;case 35680:case 36300:case 36308:case 36293:return ov;case 36289:case 36303:case 36311:case 36292:return av}}function cv(r,t){r.uniform1fv(this.addr,t)}function hv(r,t){const e=_r(t,this.size,2);r.uniform2fv(this.addr,e)}function uv(r,t){const e=_r(t,this.size,3);r.uniform3fv(this.addr,e)}function dv(r,t){const e=_r(t,this.size,4);r.uniform4fv(this.addr,e)}function fv(r,t){const e=_r(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function pv(r,t){const e=_r(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function mv(r,t){const e=_r(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function gv(r,t){r.uniform1iv(this.addr,t)}function _v(r,t){r.uniform2iv(this.addr,t)}function xv(r,t){r.uniform3iv(this.addr,t)}function vv(r,t){r.uniform4iv(this.addr,t)}function yv(r,t){r.uniform1uiv(this.addr,t)}function Mv(r,t){r.uniform2uiv(this.addr,t)}function Sv(r,t){r.uniform3uiv(this.addr,t)}function bv(r,t){r.uniform4uiv(this.addr,t)}function wv(r,t,e){const n=this.cache,i=t.length,s=Pl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),ke(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||op,s[o])}function Tv(r,t,e){const n=this.cache,i=t.length,s=Pl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),ke(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||lp,s[o])}function Ev(r,t,e){const n=this.cache,i=t.length,s=Pl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),ke(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||cp,s[o])}function Av(r,t,e){const n=this.cache,i=t.length,s=Pl(e,i);ze(n,s)||(r.uniform1iv(this.addr,s),ke(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||ap,s[o])}function Cv(r){switch(r){case 5126:return cv;case 35664:return hv;case 35665:return uv;case 35666:return dv;case 35674:return fv;case 35675:return pv;case 35676:return mv;case 5124:case 35670:return gv;case 35667:case 35671:return _v;case 35668:case 35672:return xv;case 35669:case 35673:return vv;case 5125:return yv;case 36294:return Mv;case 36295:return Sv;case 36296:return bv;case 35678:case 36198:case 36298:case 36306:case 35682:return wv;case 35679:case 36299:case 36307:return Tv;case 35680:case 36300:case 36308:case 36293:return Ev;case 36289:case 36303:case 36311:case 36292:return Av}}class Rv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lv(e.type)}}class Pv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Cv(e.type)}}class Iv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Sc=/(\w+)(\])?(\[|\.)?/g;function ju(r,t){r.seq.push(t),r.map[t.id]=t}function Lv(r,t,e){const n=r.name,i=n.length;for(Sc.lastIndex=0;;){const s=Sc.exec(n),o=Sc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ju(e,c===void 0?new Rv(a,r,t):new Pv(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new Iv(a),ju(e,u)),e=u}}}class Ra{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Lv(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function td(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Dv=37297;let Uv=0;function Nv(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ed=new Xt;function Fv(r){jt._getMatrix(ed,jt.workingColorSpace,r);const t=`mat3( ${ed.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(r)){case vo:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function nd(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Nv(r.getShaderSource(t),o)}else return i}function Ov(r,t){const e=Fv(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Bv(r,t){let e;switch(t){case uh:e="Linear";break;case dh:e="Reinhard";break;case fh:e="Cineon";break;case xl:e="ACESFilmic";break;case ph:e="AgX";break;case mh:e="Neutral";break;case Ff:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ta=new T;function zv(){jt.getLuminanceCoefficients(ta);const r=ta.x.toFixed(4),t=ta.y.toFixed(4),e=ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kv(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zr).join(`
`)}function Vv(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Hv(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function zr(r){return r!==""}function id(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sd(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Gv=/^[ \t]*#include +<([\w\d./]+)>/gm;function th(r){return r.replace(Gv,Xv)}const Wv=new Map;function Xv(r,t){let e=Jt[t];if(e===void 0){const n=Wv.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return th(e)}const qv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rd(r){return r.replace(qv,Yv)}function Yv(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function od(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Zv(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ch?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===hh?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Jn&&(t="SHADOWMAP_TYPE_VSM"),t}function $v(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Si:case Vi:t="ENVMAP_TYPE_CUBE";break;case mr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Jv(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Vi:t="ENVMAP_MODE_REFRACTION";break}return t}function Kv(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case _o:t="ENVMAP_BLENDING_MULTIPLY";break;case Uf:t="ENVMAP_BLENDING_MIX";break;case Nf:t="ENVMAP_BLENDING_ADD";break}return t}function Qv(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function jv(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Zv(e),c=$v(e),h=Jv(e),u=Kv(e),d=Qv(e),f=kv(e),p=Vv(s),_=i.createProgram();let g,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(zr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(zr).join(`
`),m.length>0&&(m+=`
`)):(g=[od(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zr).join(`
`),m=[od(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vi?"#define TONE_MAPPING":"",e.toneMapping!==vi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==vi?Bv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Ov("linearToOutputTexel",e.outputColorSpace),zv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(zr).join(`
`)),o=th(o),o=id(o,e),o=sd(o,e),a=th(a),a=id(a,e),a=sd(a,e),o=rd(o),a=rd(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=v+g+o,y=v+m+a,P=td(i,i.VERTEX_SHADER,x),E=td(i,i.FRAGMENT_SHADER,y);i.attachShader(_,P),i.attachShader(_,E),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(L){if(r.debug.checkShaderErrors){const k=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(P).trim(),V=i.getShaderInfoLog(E).trim();let J=!0,H=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(J=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,P,E);else{const st=nd(i,P,"vertex"),G=nd(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+st+`
`+G)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||V==="")&&(H=!1);H&&(L.diagnostics={runnable:J,programLog:k,vertexShader:{log:O,prefix:g},fragmentShader:{log:V,prefix:m}})}i.deleteShader(P),i.deleteShader(E),R=new Ra(i,_),b=Hv(i,_)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Dv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Uv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=E,this}let ty=0;class ey{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ny(t),e.set(t,n)),n}}class ny{constructor(t){this.id=ty++,this.code=t,this.usedTimes=0}}function iy(r,t,e,n,i,s,o){const a=new Cl,l=new ey,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,L,k,O){const V=k.fog,J=O.geometry,H=b.isMeshStandardMaterial?k.environment:null,st=(b.isMeshStandardMaterial?e:t).get(b.envMap||H),G=st&&st.mapping===mr?st.image.height:null,ht=p[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const xt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Tt=xt!==void 0?xt.length:0;let qt=0;J.morphAttributes.position!==void 0&&(qt=1),J.morphAttributes.normal!==void 0&&(qt=2),J.morphAttributes.color!==void 0&&(qt=3);let ae,$,ot,At;if(ht){const fe=Vn[ht];ae=fe.vertexShader,$=fe.fragmentShader}else ae=b.vertexShader,$=b.fragmentShader,l.update(b),ot=l.getVertexShaderID(b),At=l.getFragmentShaderID(b);const lt=r.getRenderTarget(),Nt=r.state.buffers.depth.getReversed(),Vt=O.isInstancedMesh===!0,zt=O.isBatchedMesh===!0,ee=!!b.map,Q=!!b.matcap,rt=!!st,I=!!b.aoMap,Lt=!!b.lightMap,et=!!b.bumpMap,St=!!b.normalMap,ct=!!b.displacementMap,Ot=!!b.emissiveMap,vt=!!b.metalnessMap,A=!!b.roughnessMap,S=b.anisotropy>0,F=b.clearcoat>0,Y=b.dispersion>0,j=b.iridescence>0,Z=b.sheen>0,Ct=b.transmission>0,dt=S&&!!b.anisotropyMap,yt=F&&!!b.clearcoatMap,Qt=F&&!!b.clearcoatNormalMap,nt=F&&!!b.clearcoatRoughnessMap,bt=j&&!!b.iridescenceMap,Bt=j&&!!b.iridescenceThicknessMap,kt=Z&&!!b.sheenColorMap,wt=Z&&!!b.sheenRoughnessMap,te=!!b.specularMap,Kt=!!b.specularColorMap,_e=!!b.specularIntensityMap,D=Ct&&!!b.transmissionMap,pt=Ct&&!!b.thicknessMap,X=!!b.gradientMap,K=!!b.alphaMap,_t=b.alphaTest>0,mt=!!b.alphaHash,Zt=!!b.extensions;let Ae=vi;b.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(Ae=r.toneMapping);const $e={shaderID:ht,shaderType:b.type,shaderName:b.name,vertexShader:ae,fragmentShader:$,defines:b.defines,customVertexShaderID:ot,customFragmentShaderID:At,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:zt,batchingColor:zt&&O._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&O.instanceColor!==null,instancingMorph:Vt&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:lt===null?r.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:Cs,alphaToCoverage:!!b.alphaToCoverage,map:ee,matcap:Q,envMap:rt,envMapMode:rt&&st.mapping,envMapCubeUVHeight:G,aoMap:I,lightMap:Lt,bumpMap:et,normalMap:St,displacementMap:d&&ct,emissiveMap:Ot,normalMapObjectSpace:St&&b.normalMapType===Gf,normalMapTangentSpace:St&&b.normalMapType===Gi,metalnessMap:vt,roughnessMap:A,anisotropy:S,anisotropyMap:dt,clearcoat:F,clearcoatMap:yt,clearcoatNormalMap:Qt,clearcoatRoughnessMap:nt,dispersion:Y,iridescence:j,iridescenceMap:bt,iridescenceThicknessMap:Bt,sheen:Z,sheenColorMap:kt,sheenRoughnessMap:wt,specularMap:te,specularColorMap:Kt,specularIntensityMap:_e,transmission:Ct,transmissionMap:D,thicknessMap:pt,gradientMap:X,opaque:b.transparent===!1&&b.blending===gs&&b.alphaToCoverage===!1,alphaMap:K,alphaTest:_t,alphaHash:mt,combine:b.combine,mapUv:ee&&_(b.map.channel),aoMapUv:I&&_(b.aoMap.channel),lightMapUv:Lt&&_(b.lightMap.channel),bumpMapUv:et&&_(b.bumpMap.channel),normalMapUv:St&&_(b.normalMap.channel),displacementMapUv:ct&&_(b.displacementMap.channel),emissiveMapUv:Ot&&_(b.emissiveMap.channel),metalnessMapUv:vt&&_(b.metalnessMap.channel),roughnessMapUv:A&&_(b.roughnessMap.channel),anisotropyMapUv:dt&&_(b.anisotropyMap.channel),clearcoatMapUv:yt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Qt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:wt&&_(b.sheenRoughnessMap.channel),specularMapUv:te&&_(b.specularMap.channel),specularColorMapUv:Kt&&_(b.specularColorMap.channel),specularIntensityMapUv:_e&&_(b.specularIntensityMap.channel),transmissionMapUv:D&&_(b.transmissionMap.channel),thicknessMapUv:pt&&_(b.thicknessMap.channel),alphaMapUv:K&&_(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(St||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!J.attributes.uv&&(ee||K),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Nt,skinning:O.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:qt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ae,decodeVideoTexture:ee&&b.map.isVideoTexture===!0&&jt.getTransfer(b.map.colorSpace)===he,decodeVideoTextureEmissive:Ot&&b.emissiveMap.isVideoTexture===!0&&jt.getTransfer(b.emissiveMap.colorSpace)===he,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===tn,flipSided:b.side===hn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Zt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&b.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e}function m(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(v(M,b),x(M,b),M.push(r.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function v(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function x(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){const M=p[b.type];let L;if(M){const k=Vn[M];L=ar.clone(k.uniforms)}else L=b.uniforms;return L}function P(b,M){let L;for(let k=0,O=h.length;k<O;k++){const V=h[k];if(V.cacheKey===M){L=V,++L.usedTimes;break}}return L===void 0&&(L=new jv(r,M,b,s),h.push(L)),L}function E(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:P,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:R}}function sy(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function ry(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function ad(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function ld(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,p,_,g){let m=r[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:_,group:g},r[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=_,m.group=g),t++,m}function a(u,d,f,p,_,g){const m=o(u,d,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(u,d,f,p,_,g){const m=o(u,d,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||ry),n.length>1&&n.sort(d||ad),i.length>1&&i.sort(d||ad)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function oy(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new ld,r.set(n,[o])):i>=s.length?(o=new ld,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function ay(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new it};break;case"SpotLight":e={position:new T,direction:new T,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new it,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new it,groundColor:new it};break;case"RectAreaLight":e={color:new it,position:new T,halfWidth:new T,halfHeight:new T};break}return r[t.id]=e,e}}}function ly(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let cy=0;function hy(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function uy(r){const t=new ay,e=ly(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);const i=new T,s=new Ft,o=new Ft;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,x=0,y=0,P=0,E=0,C=0;c.sort(hy);for(let b=0,M=c.length;b<M;b++){const L=c[b],k=L.color,O=L.intensity,V=L.distance,J=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=k.r*O,u+=k.g*O,d+=k.b*O;else if(L.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(L.sh.coefficients[H],O);C++}else if(L.isDirectionalLight){const H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const st=L.shadow,G=e.get(L);G.shadowIntensity=st.intensity,G.shadowBias=st.bias,G.shadowNormalBias=st.normalBias,G.shadowRadius=st.radius,G.shadowMapSize=st.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=J,n.directionalShadowMatrix[f]=L.shadow.matrix,v++}n.directional[f]=H,f++}else if(L.isSpotLight){const H=t.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(k).multiplyScalar(O),H.distance=V,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,n.spot[_]=H;const st=L.shadow;if(L.map&&(n.spotLightMap[P]=L.map,P++,st.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[_]=st.matrix,L.castShadow){const G=e.get(L);G.shadowIntensity=st.intensity,G.shadowBias=st.bias,G.shadowNormalBias=st.normalBias,G.shadowRadius=st.radius,G.shadowMapSize=st.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=J,y++}_++}else if(L.isRectAreaLight){const H=t.get(L);H.color.copy(k).multiplyScalar(O),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=H,g++}else if(L.isPointLight){const H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){const st=L.shadow,G=e.get(L);G.shadowIntensity=st.intensity,G.shadowBias=st.bias,G.shadowNormalBias=st.normalBias,G.shadowRadius=st.radius,G.shadowMapSize=st.mapSize,G.shadowCameraNear=st.camera.near,G.shadowCameraFar=st.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=J,n.pointShadowMatrix[p]=L.shadow.matrix,x++}n.point[p]=H,p++}else if(L.isHemisphereLight){const H=t.get(L);H.skyColor.copy(L.color).multiplyScalar(O),H.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[m]=H,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==p||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==m||R.numDirectionalShadows!==v||R.numPointShadows!==x||R.numSpotShadows!==y||R.numSpotMaps!==P||R.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,R.directionalLength=f,R.pointLength=p,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=m,R.numDirectionalShadows=v,R.numPointShadows=x,R.numSpotShadows=y,R.numSpotMaps=P,R.numLightProbes=C,n.version=cy++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const x=c[m];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(x.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function cd(r){const t=new uy(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function dy(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new cd(r),t.set(i,[a])):s>=o.length?(a=new cd(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Uh extends rn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Vf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Nh extends rn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,py=`uniform sampler2D shadow_pass;
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
}`;function my(r,t,e){let n=new Mo;const i=new q,s=new q,o=new ie,a=new Uh({depthPacking:Hf}),l=new Nh,c={},h=e.maxTextureSize,u={[Mi]:hn,[hn]:Mi,[tn]:tn},d=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new q},radius:{value:4}},vertexShader:fy,fragmentShader:py}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Wt;p.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ft(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ch;let m=this.type;this.render=function(E,C,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const b=r.getRenderTarget(),M=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),k=r.state;k.setBlending(jn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const O=m!==Jn&&this.type===Jn,V=m===Jn&&this.type!==Jn;for(let J=0,H=E.length;J<H;J++){const st=E[J],G=st.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const ht=G.getFrameExtents();if(i.multiply(ht),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ht.x),i.x=s.x*ht.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ht.y),i.y=s.y*ht.y,G.mapSize.y=s.y)),G.map===null||O===!0||V===!0){const Tt=this.type!==Jn?{minFilter:Ue,magFilter:Ue}:{};G.map!==null&&G.map.dispose(),G.map=new en(i.x,i.y,Tt),G.map.texture.name=st.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const xt=G.getViewportCount();for(let Tt=0;Tt<xt;Tt++){const qt=G.getViewport(Tt);o.set(s.x*qt.x,s.y*qt.y,s.x*qt.z,s.y*qt.w),k.viewport(o),G.updateMatrices(st,Tt),n=G.getFrustum(),y(C,R,G.camera,st,this.type)}G.isPointLightShadow!==!0&&this.type===Jn&&v(G,R),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(b,M,L)};function v(E,C){const R=t.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new en(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(C,null,R,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(C,null,R,f,_,null)}function x(E,C,R,b){let M=null;const L=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)M=L;else if(M=R.isPointLight===!0?l:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const k=M.uuid,O=C.uuid;let V=c[k];V===void 0&&(V={},c[k]=V);let J=V[O];J===void 0&&(J=M.clone(),V[O]=J,C.addEventListener("dispose",P)),M=J}if(M.visible=C.visible,M.wireframe=C.wireframe,b===Jn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const k=r.properties.get(M);k.light=R}return M}function y(E,C,R,b,M){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Jn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const O=t.update(E),V=E.material;if(Array.isArray(V)){const J=O.groups;for(let H=0,st=J.length;H<st;H++){const G=J[H],ht=V[G.materialIndex];if(ht&&ht.visible){const xt=x(E,ht,b,M);E.onBeforeShadow(r,E,C,R,O,xt,G),r.renderBufferDirect(R,null,O,xt,E,G),E.onAfterShadow(r,E,C,R,O,xt,G)}}}else if(V.visible){const J=x(E,V,b,M);E.onBeforeShadow(r,E,C,R,O,J,null),r.renderBufferDirect(R,null,O,J,E,null),E.onAfterShadow(r,E,C,R,O,J,null)}}const k=E.children;for(let O=0,V=k.length;O<V;O++)y(k[O],C,R,b,M)}function P(E){E.target.removeEventListener("dispose",P);for(const R in c){const b=c[R],M=E.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const gy={[Da]:Ua,[Na]:Ba,[Fa]:za,[Ms]:Oa,[Ua]:Da,[Ba]:Na,[za]:Fa,[Oa]:Ms};function _y(r,t){function e(){let D=!1;const pt=new ie;let X=null;const K=new ie(0,0,0,0);return{setMask:function(_t){X!==_t&&!D&&(r.colorMask(_t,_t,_t,_t),X=_t)},setLocked:function(_t){D=_t},setClear:function(_t,mt,Zt,Ae,$e){$e===!0&&(_t*=Ae,mt*=Ae,Zt*=Ae),pt.set(_t,mt,Zt,Ae),K.equals(pt)===!1&&(r.clearColor(_t,mt,Zt,Ae),K.copy(pt))},reset:function(){D=!1,X=null,K.set(-1,0,0,0)}}}function n(){let D=!1,pt=!1,X=null,K=null,_t=null;return{setReversed:function(mt){if(pt!==mt){const Zt=t.get("EXT_clip_control");pt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);const Ae=_t;_t=null,this.setClear(Ae)}pt=mt},getReversed:function(){return pt},setTest:function(mt){mt?lt(r.DEPTH_TEST):Nt(r.DEPTH_TEST)},setMask:function(mt){X!==mt&&!D&&(r.depthMask(mt),X=mt)},setFunc:function(mt){if(pt&&(mt=gy[mt]),K!==mt){switch(mt){case Da:r.depthFunc(r.NEVER);break;case Ua:r.depthFunc(r.ALWAYS);break;case Na:r.depthFunc(r.LESS);break;case Ms:r.depthFunc(r.LEQUAL);break;case Fa:r.depthFunc(r.EQUAL);break;case Oa:r.depthFunc(r.GEQUAL);break;case Ba:r.depthFunc(r.GREATER);break;case za:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}K=mt}},setLocked:function(mt){D=mt},setClear:function(mt){_t!==mt&&(pt&&(mt=1-mt),r.clearDepth(mt),_t=mt)},reset:function(){D=!1,X=null,K=null,_t=null,pt=!1}}}function i(){let D=!1,pt=null,X=null,K=null,_t=null,mt=null,Zt=null,Ae=null,$e=null;return{setTest:function(fe){D||(fe?lt(r.STENCIL_TEST):Nt(r.STENCIL_TEST))},setMask:function(fe){pt!==fe&&!D&&(r.stencilMask(fe),pt=fe)},setFunc:function(fe,Nn,ai){(X!==fe||K!==Nn||_t!==ai)&&(r.stencilFunc(fe,Nn,ai),X=fe,K=Nn,_t=ai)},setOp:function(fe,Nn,ai){(mt!==fe||Zt!==Nn||Ae!==ai)&&(r.stencilOp(fe,Nn,ai),mt=fe,Zt=Nn,Ae=ai)},setLocked:function(fe){D=fe},setClear:function(fe){$e!==fe&&(r.clearStencil(fe),$e=fe)},reset:function(){D=!1,pt=null,X=null,K=null,_t=null,mt=null,Zt=null,Ae=null,$e=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,x=null,y=null,P=null,E=null,C=new it(0,0,0),R=0,b=!1,M=null,L=null,k=null,O=null,V=null;const J=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,st=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=st>=1):G.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=st>=2);let ht=null,xt={};const Tt=r.getParameter(r.SCISSOR_BOX),qt=r.getParameter(r.VIEWPORT),ae=new ie().fromArray(Tt),$=new ie().fromArray(qt);function ot(D,pt,X,K){const _t=new Uint8Array(4),mt=r.createTexture();r.bindTexture(D,mt),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Zt=0;Zt<X;Zt++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(pt,0,r.RGBA,1,1,K,0,r.RGBA,r.UNSIGNED_BYTE,_t):r.texImage2D(pt+Zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,_t);return mt}const At={};At[r.TEXTURE_2D]=ot(r.TEXTURE_2D,r.TEXTURE_2D,1),At[r.TEXTURE_CUBE_MAP]=ot(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[r.TEXTURE_2D_ARRAY]=ot(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),At[r.TEXTURE_3D]=ot(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(r.DEPTH_TEST),o.setFunc(Ms),et(!1),St(qc),lt(r.CULL_FACE),I(jn);function lt(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function Nt(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Vt(D,pt){return u[D]!==pt?(r.bindFramebuffer(D,pt),u[D]=pt,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=pt),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=pt),!0):!1}function zt(D,pt){let X=f,K=!1;if(D){X=d.get(pt),X===void 0&&(X=[],d.set(pt,X));const _t=D.textures;if(X.length!==_t.length||X[0]!==r.COLOR_ATTACHMENT0){for(let mt=0,Zt=_t.length;mt<Zt;mt++)X[mt]=r.COLOR_ATTACHMENT0+mt;X.length=_t.length,K=!0}}else X[0]!==r.BACK&&(X[0]=r.BACK,K=!0);K&&r.drawBuffers(X)}function ee(D){return p!==D?(r.useProgram(D),p=D,!0):!1}const Q={[Oi]:r.FUNC_ADD,[_f]:r.FUNC_SUBTRACT,[xf]:r.FUNC_REVERSE_SUBTRACT};Q[vf]=r.MIN,Q[yf]=r.MAX;const rt={[Mf]:r.ZERO,[Sf]:r.ONE,[bf]:r.SRC_COLOR,[Ia]:r.SRC_ALPHA,[Rf]:r.SRC_ALPHA_SATURATE,[Af]:r.DST_COLOR,[Tf]:r.DST_ALPHA,[wf]:r.ONE_MINUS_SRC_COLOR,[La]:r.ONE_MINUS_SRC_ALPHA,[Cf]:r.ONE_MINUS_DST_COLOR,[Ef]:r.ONE_MINUS_DST_ALPHA,[Pf]:r.CONSTANT_COLOR,[If]:r.ONE_MINUS_CONSTANT_COLOR,[Lf]:r.CONSTANT_ALPHA,[Df]:r.ONE_MINUS_CONSTANT_ALPHA};function I(D,pt,X,K,_t,mt,Zt,Ae,$e,fe){if(D===jn){_===!0&&(Nt(r.BLEND),_=!1);return}if(_===!1&&(lt(r.BLEND),_=!0),D!==gf){if(D!==g||fe!==b){if((m!==Oi||y!==Oi)&&(r.blendEquation(r.FUNC_ADD),m=Oi,y=Oi),fe)switch(D){case gs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Kr:r.blendFunc(r.ONE,r.ONE);break;case Yc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Zc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case gs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Kr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Yc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Zc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,x=null,P=null,E=null,C.set(0,0,0),R=0,g=D,b=fe}return}_t=_t||pt,mt=mt||X,Zt=Zt||K,(pt!==m||_t!==y)&&(r.blendEquationSeparate(Q[pt],Q[_t]),m=pt,y=_t),(X!==v||K!==x||mt!==P||Zt!==E)&&(r.blendFuncSeparate(rt[X],rt[K],rt[mt],rt[Zt]),v=X,x=K,P=mt,E=Zt),(Ae.equals(C)===!1||$e!==R)&&(r.blendColor(Ae.r,Ae.g,Ae.b,$e),C.copy(Ae),R=$e),g=D,b=!1}function Lt(D,pt){D.side===tn?Nt(r.CULL_FACE):lt(r.CULL_FACE);let X=D.side===hn;pt&&(X=!X),et(X),D.blending===gs&&D.transparent===!1?I(jn):I(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const K=D.stencilWrite;a.setTest(K),K&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ot(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?lt(r.SAMPLE_ALPHA_TO_COVERAGE):Nt(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){M!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),M=D)}function St(D){D!==pf?(lt(r.CULL_FACE),D!==L&&(D===qc?r.cullFace(r.BACK):D===mf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Nt(r.CULL_FACE),L=D}function ct(D){D!==k&&(H&&r.lineWidth(D),k=D)}function Ot(D,pt,X){D?(lt(r.POLYGON_OFFSET_FILL),(O!==pt||V!==X)&&(r.polygonOffset(pt,X),O=pt,V=X)):Nt(r.POLYGON_OFFSET_FILL)}function vt(D){D?lt(r.SCISSOR_TEST):Nt(r.SCISSOR_TEST)}function A(D){D===void 0&&(D=r.TEXTURE0+J-1),ht!==D&&(r.activeTexture(D),ht=D)}function S(D,pt,X){X===void 0&&(ht===null?X=r.TEXTURE0+J-1:X=ht);let K=xt[X];K===void 0&&(K={type:void 0,texture:void 0},xt[X]=K),(K.type!==D||K.texture!==pt)&&(ht!==X&&(r.activeTexture(X),ht=X),r.bindTexture(D,pt||At[D]),K.type=D,K.texture=pt)}function F(){const D=xt[ht];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Qt(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Bt(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function kt(D){ae.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),ae.copy(D))}function wt(D){$.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),$.copy(D))}function te(D,pt){let X=c.get(pt);X===void 0&&(X=new WeakMap,c.set(pt,X));let K=X.get(D);K===void 0&&(K=r.getUniformBlockIndex(pt,D.name),X.set(D,K))}function Kt(D,pt){const K=c.get(pt).get(D);l.get(pt)!==K&&(r.uniformBlockBinding(pt,K,D.__bindingPointIndex),l.set(pt,K))}function _e(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ht=null,xt={},u={},d=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,x=null,y=null,P=null,E=null,C=new it(0,0,0),R=0,b=!1,M=null,L=null,k=null,O=null,V=null,ae.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:lt,disable:Nt,bindFramebuffer:Vt,drawBuffers:zt,useProgram:ee,setBlending:I,setMaterial:Lt,setFlipSided:et,setCullFace:St,setLineWidth:ct,setPolygonOffset:Ot,setScissorTest:vt,activeTexture:A,bindTexture:S,unbindTexture:F,compressedTexImage2D:Y,compressedTexImage3D:j,texImage2D:bt,texImage3D:Bt,updateUBOMapping:te,uniformBlockBinding:Kt,texStorage2D:Qt,texStorage3D:nt,texSubImage2D:Z,texSubImage3D:Ct,compressedTexSubImage2D:dt,compressedTexSubImage3D:yt,scissor:kt,viewport:wt,reset:_e}}function xy(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function vy(r,t){const e=r.image&&r.image.width?r.image.width/r.image.height:1;return e>t?(r.repeat.x=t/e,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=e/t,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function yy(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function eh(r,t,e,n){const i=My(n);switch(e){case yh:return r*t;case Sh:return r*t;case bh:return r*t*2;case bl:return r*t/i.components*i.byteLength;case xo:return r*t/i.components*i.byteLength;case wh:return r*t*2/i.components*i.byteLength;case wl:return r*t*2/i.components*i.byteLength;case Mh:return r*t*3/i.components*i.byteLength;case cn:return r*t*4/i.components*i.byteLength;case Tl:return r*t*4/i.components*i.byteLength;case Hr:case Gr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Wr:case Xr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Va:case Ga:return Math.max(r,16)*Math.max(t,8)/4;case ka:case Ha:return Math.max(r,8)*Math.max(t,8)/2;case Wa:case Xa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case qa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Za:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case $a:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case ja:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case tl:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case el:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case nl:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case il:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case sl:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case rl:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ol:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case qr:case al:case ll:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Th:case cl:return Math.ceil(r/4)*Math.ceil(t/4)*8;case hl:case ul:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function My(r){switch(r){case ni:case _h:return{byteLength:1,components:1};case sr:case xh:case Wn:return{byteLength:2,components:1};case Ml:case Sl:return{byteLength:2,components:4};case bi:case yl:case yn:return{byteLength:4,components:1};case vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}const Sy={contain:xy,cover:vy,fill:yy,getByteLength:eh};function by(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new q,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,S){return f?new OffscreenCanvas(A,S):ro("canvas")}function _(A,S,F){let Y=1;const j=vt(A);if((j.width>F||j.height>F)&&(Y=F/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(Y*j.width),Ct=Math.floor(Y*j.height);u===void 0&&(u=p(Z,Ct));const dt=S?p(Z,Ct):u;return dt.width=Z,dt.height=Ct,dt.getContext("2d").drawImage(A,0,0,Z,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Z+"x"+Ct+")."),dt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){r.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(A,S,F,Y,j=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=S;if(S===r.RED&&(F===r.FLOAT&&(Z=r.R32F),F===r.HALF_FLOAT&&(Z=r.R16F),F===r.UNSIGNED_BYTE&&(Z=r.R8)),S===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(Z=r.R8UI),F===r.UNSIGNED_SHORT&&(Z=r.R16UI),F===r.UNSIGNED_INT&&(Z=r.R32UI),F===r.BYTE&&(Z=r.R8I),F===r.SHORT&&(Z=r.R16I),F===r.INT&&(Z=r.R32I)),S===r.RG&&(F===r.FLOAT&&(Z=r.RG32F),F===r.HALF_FLOAT&&(Z=r.RG16F),F===r.UNSIGNED_BYTE&&(Z=r.RG8)),S===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(Z=r.RG8UI),F===r.UNSIGNED_SHORT&&(Z=r.RG16UI),F===r.UNSIGNED_INT&&(Z=r.RG32UI),F===r.BYTE&&(Z=r.RG8I),F===r.SHORT&&(Z=r.RG16I),F===r.INT&&(Z=r.RG32I)),S===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(Z=r.RGB8UI),F===r.UNSIGNED_SHORT&&(Z=r.RGB16UI),F===r.UNSIGNED_INT&&(Z=r.RGB32UI),F===r.BYTE&&(Z=r.RGB8I),F===r.SHORT&&(Z=r.RGB16I),F===r.INT&&(Z=r.RGB32I)),S===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(Z=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(Z=r.RGBA16UI),F===r.UNSIGNED_INT&&(Z=r.RGBA32UI),F===r.BYTE&&(Z=r.RGBA8I),F===r.SHORT&&(Z=r.RGBA16I),F===r.INT&&(Z=r.RGBA32I)),S===r.RGB&&F===r.UNSIGNED_INT_5_9_9_9_REV&&(Z=r.RGB9_E5),S===r.RGBA){const Ct=j?vo:jt.getTransfer(Y);F===r.FLOAT&&(Z=r.RGBA32F),F===r.HALF_FLOAT&&(Z=r.RGBA16F),F===r.UNSIGNED_BYTE&&(Z=Ct===he?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(Z=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(Z=r.RGB5_A1)}return(Z===r.R16F||Z===r.R32F||Z===r.RG16F||Z===r.RG32F||Z===r.RGBA16F||Z===r.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function y(A,S){let F;return A?S===null||S===bi||S===bs?F=r.DEPTH24_STENCIL8:S===yn?F=r.DEPTH32F_STENCIL8:S===sr&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===bi||S===bs?F=r.DEPTH_COMPONENT24:S===yn?F=r.DEPTH_COMPONENT32F:S===sr&&(F=r.DEPTH_COMPONENT16),F}function P(A,S){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ue&&A.minFilter!==Fe?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function E(A){const S=A.target;S.removeEventListener("dispose",E),R(S),S.isVideoTexture&&h.delete(S)}function C(A){const S=A.target;S.removeEventListener("dispose",C),M(S)}function R(A){const S=n.get(A);if(S.__webglInit===void 0)return;const F=A.source,Y=d.get(F);if(Y){const j=Y[S.__cacheKey];j.usedTimes--,j.usedTimes===0&&b(A),Object.keys(Y).length===0&&d.delete(F)}n.remove(A)}function b(A){const S=n.get(A);r.deleteTexture(S.__webglTexture);const F=A.source,Y=d.get(F);delete Y[S.__cacheKey],o.memory.textures--}function M(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let j=0;j<S.__webglFramebuffer[Y].length;j++)r.deleteFramebuffer(S.__webglFramebuffer[Y][j]);else r.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)r.deleteFramebuffer(S.__webglFramebuffer[Y]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const F=A.textures;for(let Y=0,j=F.length;Y<j;Y++){const Z=n.get(F[Y]);Z.__webglTexture&&(r.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(F[Y])}n.remove(A)}let L=0;function k(){L=0}function O(){const A=L;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),L+=1,A}function V(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function J(A,S){const F=n.get(A);if(A.isVideoTexture&&ct(A),A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){const Y=A.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(F,A,S);return}}e.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+S)}function H(A,S){const F=n.get(A);if(A.version>0&&F.__version!==A.version){$(F,A,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+S)}function st(A,S){const F=n.get(A);if(A.version>0&&F.__version!==A.version){$(F,A,S);return}e.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+S)}function G(A,S){const F=n.get(A);if(A.version>0&&F.__version!==A.version){ot(F,A,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+S)}const ht={[Ss]:r.REPEAT,[vn]:r.CLAMP_TO_EDGE,[to]:r.MIRRORED_REPEAT},xt={[Ue]:r.NEAREST,[gh]:r.NEAREST_MIPMAP_NEAREST,[Qs]:r.NEAREST_MIPMAP_LINEAR,[Fe]:r.LINEAR,[Vr]:r.LINEAR_MIPMAP_NEAREST,[Hn]:r.LINEAR_MIPMAP_LINEAR},Tt={[Wf]:r.NEVER,[Jf]:r.ALWAYS,[Xf]:r.LESS,[Ah]:r.LEQUAL,[qf]:r.EQUAL,[$f]:r.GEQUAL,[Yf]:r.GREATER,[Zf]:r.NOTEQUAL};function qt(A,S){if(S.type===yn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Fe||S.magFilter===Vr||S.magFilter===Qs||S.magFilter===Hn||S.minFilter===Fe||S.minFilter===Vr||S.minFilter===Qs||S.minFilter===Hn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,ht[S.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,ht[S.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,ht[S.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,xt[S.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,xt[S.minFilter]),S.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,Tt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ue||S.minFilter!==Qs&&S.minFilter!==Hn||S.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ae(A,S){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",E));const Y=S.source;let j=d.get(Y);j===void 0&&(j={},d.set(Y,j));const Z=V(S);if(Z!==A.__cacheKey){j[Z]===void 0&&(j[Z]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,F=!0),j[Z].usedTimes++;const Ct=j[A.__cacheKey];Ct!==void 0&&(j[A.__cacheKey].usedTimes--,Ct.usedTimes===0&&b(S)),A.__cacheKey=Z,A.__webglTexture=j[Z].texture}return F}function $(A,S,F){let Y=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=r.TEXTURE_3D);const j=ae(A,S),Z=S.source;e.bindTexture(Y,A.__webglTexture,r.TEXTURE0+F);const Ct=n.get(Z);if(Z.version!==Ct.__version||j===!0){e.activeTexture(r.TEXTURE0+F);const dt=jt.getPrimaries(jt.workingColorSpace),yt=S.colorSpace===mi?null:jt.getPrimaries(S.colorSpace),Qt=S.colorSpace===mi||dt===yt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);let nt=_(S.image,!1,i.maxTextureSize);nt=Ot(S,nt);const bt=s.convert(S.format,S.colorSpace),Bt=s.convert(S.type);let kt=x(S.internalFormat,bt,Bt,S.colorSpace,S.isVideoTexture);qt(Y,S);let wt;const te=S.mipmaps,Kt=S.isVideoTexture!==!0,_e=Ct.__version===void 0||j===!0,D=Z.dataReady,pt=P(S,nt);if(S.isDepthTexture)kt=y(S.format===ws,S.type),_e&&(Kt?e.texStorage2D(r.TEXTURE_2D,1,kt,nt.width,nt.height):e.texImage2D(r.TEXTURE_2D,0,kt,nt.width,nt.height,0,bt,Bt,null));else if(S.isDataTexture)if(te.length>0){Kt&&_e&&e.texStorage2D(r.TEXTURE_2D,pt,kt,te[0].width,te[0].height);for(let X=0,K=te.length;X<K;X++)wt=te[X],Kt?D&&e.texSubImage2D(r.TEXTURE_2D,X,0,0,wt.width,wt.height,bt,Bt,wt.data):e.texImage2D(r.TEXTURE_2D,X,kt,wt.width,wt.height,0,bt,Bt,wt.data);S.generateMipmaps=!1}else Kt?(_e&&e.texStorage2D(r.TEXTURE_2D,pt,kt,nt.width,nt.height),D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt.width,nt.height,bt,Bt,nt.data)):e.texImage2D(r.TEXTURE_2D,0,kt,nt.width,nt.height,0,bt,Bt,nt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Kt&&_e&&e.texStorage3D(r.TEXTURE_2D_ARRAY,pt,kt,te[0].width,te[0].height,nt.depth);for(let X=0,K=te.length;X<K;X++)if(wt=te[X],S.format!==cn)if(bt!==null)if(Kt){if(D)if(S.layerUpdates.size>0){const _t=eh(wt.width,wt.height,S.format,S.type);for(const mt of S.layerUpdates){const Zt=wt.data.subarray(mt*_t/wt.data.BYTES_PER_ELEMENT,(mt+1)*_t/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,mt,wt.width,wt.height,1,bt,Zt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,0,wt.width,wt.height,nt.depth,bt,wt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,X,kt,wt.width,wt.height,nt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?D&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,0,wt.width,wt.height,nt.depth,bt,Bt,wt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,X,kt,wt.width,wt.height,nt.depth,0,bt,Bt,wt.data)}else{Kt&&_e&&e.texStorage2D(r.TEXTURE_2D,pt,kt,te[0].width,te[0].height);for(let X=0,K=te.length;X<K;X++)wt=te[X],S.format!==cn?bt!==null?Kt?D&&e.compressedTexSubImage2D(r.TEXTURE_2D,X,0,0,wt.width,wt.height,bt,wt.data):e.compressedTexImage2D(r.TEXTURE_2D,X,kt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?D&&e.texSubImage2D(r.TEXTURE_2D,X,0,0,wt.width,wt.height,bt,Bt,wt.data):e.texImage2D(r.TEXTURE_2D,X,kt,wt.width,wt.height,0,bt,Bt,wt.data)}else if(S.isDataArrayTexture)if(Kt){if(_e&&e.texStorage3D(r.TEXTURE_2D_ARRAY,pt,kt,nt.width,nt.height,nt.depth),D)if(S.layerUpdates.size>0){const X=eh(nt.width,nt.height,S.format,S.type);for(const K of S.layerUpdates){const _t=nt.data.subarray(K*X/nt.data.BYTES_PER_ELEMENT,(K+1)*X/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,nt.width,nt.height,1,bt,Bt,_t)}S.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,bt,Bt,nt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,kt,nt.width,nt.height,nt.depth,0,bt,Bt,nt.data);else if(S.isData3DTexture)Kt?(_e&&e.texStorage3D(r.TEXTURE_3D,pt,kt,nt.width,nt.height,nt.depth),D&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,bt,Bt,nt.data)):e.texImage3D(r.TEXTURE_3D,0,kt,nt.width,nt.height,nt.depth,0,bt,Bt,nt.data);else if(S.isFramebufferTexture){if(_e)if(Kt)e.texStorage2D(r.TEXTURE_2D,pt,kt,nt.width,nt.height);else{let X=nt.width,K=nt.height;for(let _t=0;_t<pt;_t++)e.texImage2D(r.TEXTURE_2D,_t,kt,X,K,0,bt,Bt,null),X>>=1,K>>=1}}else if(te.length>0){if(Kt&&_e){const X=vt(te[0]);e.texStorage2D(r.TEXTURE_2D,pt,kt,X.width,X.height)}for(let X=0,K=te.length;X<K;X++)wt=te[X],Kt?D&&e.texSubImage2D(r.TEXTURE_2D,X,0,0,bt,Bt,wt):e.texImage2D(r.TEXTURE_2D,X,kt,bt,Bt,wt);S.generateMipmaps=!1}else if(Kt){if(_e){const X=vt(nt);e.texStorage2D(r.TEXTURE_2D,pt,kt,X.width,X.height)}D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,bt,Bt,nt)}else e.texImage2D(r.TEXTURE_2D,0,kt,bt,Bt,nt);g(S)&&m(Y),Ct.__version=Z.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ot(A,S,F){if(S.image.length!==6)return;const Y=ae(A,S),j=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+F);const Z=n.get(j);if(j.version!==Z.__version||Y===!0){e.activeTexture(r.TEXTURE0+F);const Ct=jt.getPrimaries(jt.workingColorSpace),dt=S.colorSpace===mi?null:jt.getPrimaries(S.colorSpace),yt=S.colorSpace===mi||Ct===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const Qt=S.isCompressedTexture||S.image[0].isCompressedTexture,nt=S.image[0]&&S.image[0].isDataTexture,bt=[];for(let K=0;K<6;K++)!Qt&&!nt?bt[K]=_(S.image[K],!0,i.maxCubemapSize):bt[K]=nt?S.image[K].image:S.image[K],bt[K]=Ot(S,bt[K]);const Bt=bt[0],kt=s.convert(S.format,S.colorSpace),wt=s.convert(S.type),te=x(S.internalFormat,kt,wt,S.colorSpace),Kt=S.isVideoTexture!==!0,_e=Z.__version===void 0||Y===!0,D=j.dataReady;let pt=P(S,Bt);qt(r.TEXTURE_CUBE_MAP,S);let X;if(Qt){Kt&&_e&&e.texStorage2D(r.TEXTURE_CUBE_MAP,pt,te,Bt.width,Bt.height);for(let K=0;K<6;K++){X=bt[K].mipmaps;for(let _t=0;_t<X.length;_t++){const mt=X[_t];S.format!==cn?kt!==null?Kt?D&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,mt.width,mt.height,kt,mt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,te,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,mt.width,mt.height,kt,wt,mt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,te,mt.width,mt.height,0,kt,wt,mt.data)}}}else{if(X=S.mipmaps,Kt&&_e){X.length>0&&pt++;const K=vt(bt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,pt,te,K.width,K.height)}for(let K=0;K<6;K++)if(nt){Kt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,bt[K].width,bt[K].height,kt,wt,bt[K].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,te,bt[K].width,bt[K].height,0,kt,wt,bt[K].data);for(let _t=0;_t<X.length;_t++){const Zt=X[_t].image[K].image;Kt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,Zt.width,Zt.height,kt,wt,Zt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,te,Zt.width,Zt.height,0,kt,wt,Zt.data)}}else{Kt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,kt,wt,bt[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,te,kt,wt,bt[K]);for(let _t=0;_t<X.length;_t++){const mt=X[_t];Kt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,kt,wt,mt.image[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,te,kt,wt,mt.image[K])}}}g(S)&&m(r.TEXTURE_CUBE_MAP),Z.__version=j.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function At(A,S,F,Y,j,Z){const Ct=s.convert(F.format,F.colorSpace),dt=s.convert(F.type),yt=x(F.internalFormat,Ct,dt,F.colorSpace),Qt=n.get(S),nt=n.get(F);if(nt.__renderTarget=S,!Qt.__hasExternalTextures){const bt=Math.max(1,S.width>>Z),Bt=Math.max(1,S.height>>Z);j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?e.texImage3D(j,Z,yt,bt,Bt,S.depth,0,Ct,dt,null):e.texImage2D(j,Z,yt,bt,Bt,0,Ct,dt,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),St(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,j,nt.__webglTexture,0,et(S)):(j===r.TEXTURE_2D||j>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,j,nt.__webglTexture,Z),e.bindFramebuffer(r.FRAMEBUFFER,null)}function lt(A,S,F){if(r.bindRenderbuffer(r.RENDERBUFFER,A),S.depthBuffer){const Y=S.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,Z=y(S.stencilBuffer,j),Ct=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=et(S);St(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,dt,Z,S.width,S.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,dt,Z,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Z,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ct,r.RENDERBUFFER,A)}else{const Y=S.textures;for(let j=0;j<Y.length;j++){const Z=Y[j],Ct=s.convert(Z.format,Z.colorSpace),dt=s.convert(Z.type),yt=x(Z.internalFormat,Ct,dt,Z.colorSpace),Qt=et(S);F&&St(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Qt,yt,S.width,S.height):St(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Qt,yt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,yt,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Nt(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(S.depthTexture);Y.__renderTarget=S,(!Y.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J(S.depthTexture,0);const j=Y.__webglTexture,Z=et(S);if(S.depthTexture.format===_s)St(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(S.depthTexture.format===ws)St(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Vt(A){const S=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const j=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),S.__depthDisposeCallback=j}S.__boundDepthTexture=Y}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Nt(S.__webglFramebuffer,A)}else if(F){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=r.createRenderbuffer(),lt(S.__webglDepthbuffer[Y],A,!1);else{const j=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,Z),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),lt(S.__webglDepthbuffer,A,!1);else{const Y=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,Y,r.RENDERBUFFER,j)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function zt(A,S,F){const Y=n.get(A);S!==void 0&&At(Y.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&Vt(A)}function ee(A){const S=A.texture,F=n.get(A),Y=n.get(S);A.addEventListener("dispose",C);const j=A.textures,Z=A.isWebGLCubeRenderTarget===!0,Ct=j.length>1;if(Ct||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=S.version,o.memory.textures++),Z){F.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[dt]=[];for(let yt=0;yt<S.mipmaps.length;yt++)F.__webglFramebuffer[dt][yt]=r.createFramebuffer()}else F.__webglFramebuffer[dt]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let dt=0;dt<S.mipmaps.length;dt++)F.__webglFramebuffer[dt]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(Ct)for(let dt=0,yt=j.length;dt<yt;dt++){const Qt=n.get(j[dt]);Qt.__webglTexture===void 0&&(Qt.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&St(A)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let dt=0;dt<j.length;dt++){const yt=j[dt];F.__webglColorRenderbuffer[dt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[dt]);const Qt=s.convert(yt.format,yt.colorSpace),nt=s.convert(yt.type),bt=x(yt.internalFormat,Qt,nt,yt.colorSpace,A.isXRRenderTarget===!0),Bt=et(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Bt,bt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,F.__webglColorRenderbuffer[dt])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),lt(F.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){e.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),qt(r.TEXTURE_CUBE_MAP,S);for(let dt=0;dt<6;dt++)if(S.mipmaps&&S.mipmaps.length>0)for(let yt=0;yt<S.mipmaps.length;yt++)At(F.__webglFramebuffer[dt][yt],A,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+dt,yt);else At(F.__webglFramebuffer[dt],A,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);g(S)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let dt=0,yt=j.length;dt<yt;dt++){const Qt=j[dt],nt=n.get(Qt);e.bindTexture(r.TEXTURE_2D,nt.__webglTexture),qt(r.TEXTURE_2D,Qt),At(F.__webglFramebuffer,A,Qt,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,0),g(Qt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let dt=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(dt=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(dt,Y.__webglTexture),qt(dt,S),S.mipmaps&&S.mipmaps.length>0)for(let yt=0;yt<S.mipmaps.length;yt++)At(F.__webglFramebuffer[yt],A,S,r.COLOR_ATTACHMENT0,dt,yt);else At(F.__webglFramebuffer,A,S,r.COLOR_ATTACHMENT0,dt,0);g(S)&&m(dt),e.unbindTexture()}A.depthBuffer&&Vt(A)}function Q(A){const S=A.textures;for(let F=0,Y=S.length;F<Y;F++){const j=S[F];if(g(j)){const Z=v(A),Ct=n.get(j).__webglTexture;e.bindTexture(Z,Ct),m(Z),e.unbindTexture()}}}const rt=[],I=[];function Lt(A){if(A.samples>0){if(St(A)===!1){const S=A.textures,F=A.width,Y=A.height;let j=r.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=n.get(A),dt=S.length>1;if(dt)for(let yt=0;yt<S.length;yt++)e.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+yt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+yt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let yt=0;yt<S.length;yt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=r.STENCIL_BUFFER_BIT)),dt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);const Qt=n.get(S[yt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Qt,0)}r.blitFramebuffer(0,0,F,Y,0,0,F,Y,j,r.NEAREST),l===!0&&(rt.length=0,I.length=0,rt.push(r.COLOR_ATTACHMENT0+yt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(rt.push(Z),I.push(Z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),dt)for(let yt=0;yt<S.length;yt++){e.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+yt,r.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);const Qt=n.get(S[yt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Ct.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+yt,r.TEXTURE_2D,Qt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function et(A){return Math.min(i.maxSamples,A.samples)}function St(A){const S=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ct(A){const S=o.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function Ot(A,S){const F=A.colorSpace,Y=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==Cs&&F!==mi&&(jt.getTransfer(F)===he?(Y!==cn||j!==ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function vt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=k,this.setTexture2D=J,this.setTexture2DArray=H,this.setTexture3D=st,this.setTextureCube=G,this.rebindTextures=zt,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=St}function hp(r,t){function e(n,i=mi){let s;const o=jt.getTransfer(i);if(n===ni)return r.UNSIGNED_BYTE;if(n===Ml)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Sl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===vh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===_h)return r.BYTE;if(n===xh)return r.SHORT;if(n===sr)return r.UNSIGNED_SHORT;if(n===yl)return r.INT;if(n===bi)return r.UNSIGNED_INT;if(n===yn)return r.FLOAT;if(n===Wn)return r.HALF_FLOAT;if(n===yh)return r.ALPHA;if(n===Mh)return r.RGB;if(n===cn)return r.RGBA;if(n===Sh)return r.LUMINANCE;if(n===bh)return r.LUMINANCE_ALPHA;if(n===_s)return r.DEPTH_COMPONENT;if(n===ws)return r.DEPTH_STENCIL;if(n===bl)return r.RED;if(n===xo)return r.RED_INTEGER;if(n===wh)return r.RG;if(n===wl)return r.RG_INTEGER;if(n===Tl)return r.RGBA_INTEGER;if(n===Hr||n===Gr||n===Wr||n===Xr)if(o===he)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Hr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Hr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===Va||n===Ha||n===Ga)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ka)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ha)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ga)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wa||n===Xa||n===qa)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Wa||n===Xa)return o===he?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===qa)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ya||n===Za||n===$a||n===Ja||n===Ka||n===Qa||n===ja||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ya)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Za)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$a)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ja)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ka)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Qa)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ja)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===tl)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===el)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nl)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===il)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sl)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rl)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ol)return o===he?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qr||n===al||n===ll)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===qr)return o===he?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===al)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ll)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Th||n===cl||n===hl||n===ul)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===qr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===cl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===hl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ul)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class up extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Gt extends se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wy={type:"move"};class bc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wy)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Gt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ty=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ey=`
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

}`;class Ay{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Pe,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new qe({vertexShader:Ty,fragmentShader:Ey,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ft(new Ye(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Cy extends ri{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const _=new Ay,g=e.getContextAttributes();let m=null,v=null;const x=[],y=[],P=new q;let E=null;const C=new Xe;C.viewport=new ie;const R=new Xe;R.viewport=new ie;const b=[C,R],M=new up;let L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ot=x[$];return ot===void 0&&(ot=new bc,x[$]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function($){let ot=x[$];return ot===void 0&&(ot=new bc,x[$]=ot),ot.getGripSpace()},this.getHand=function($){let ot=x[$];return ot===void 0&&(ot=new bc,x[$]=ot),ot.getHandSpace()};function O($){const ot=y.indexOf($.inputSource);if(ot===-1)return;const At=x[ot];At!==void 0&&(At.update($.inputSource,$.frame,c||o),At.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",J);for(let $=0;$<x.length;$++){const ot=y[$];ot!==null&&(y[$]=null,x[$].disconnect(ot))}L=null,k=null,_.reset(),t.setRenderTarget(m),f=null,d=null,u=null,i=null,v=null,ae.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",V),i.addEventListener("inputsourceschange",J),g.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(P),i.renderState.layers===void 0){const ot={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,ot),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new en(f.framebufferWidth,f.framebufferHeight,{format:cn,type:ni,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let ot=null,At=null,lt=null;g.depth&&(lt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=g.stencil?ws:_s,At=g.stencil?bs:bi);const Nt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Nt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new en(d.textureWidth,d.textureHeight,{format:cn,type:ni,depthTexture:new Dh(d.textureWidth,d.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ae.setContext(i),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function J($){for(let ot=0;ot<$.removed.length;ot++){const At=$.removed[ot],lt=y.indexOf(At);lt>=0&&(y[lt]=null,x[lt].disconnect(At))}for(let ot=0;ot<$.added.length;ot++){const At=$.added[ot];let lt=y.indexOf(At);if(lt===-1){for(let Vt=0;Vt<x.length;Vt++)if(Vt>=y.length){y.push(At),lt=Vt;break}else if(y[Vt]===null){y[Vt]=At,lt=Vt;break}if(lt===-1)break}const Nt=x[lt];Nt&&Nt.connect(At)}}const H=new T,st=new T;function G($,ot,At){H.setFromMatrixPosition(ot.matrixWorld),st.setFromMatrixPosition(At.matrixWorld);const lt=H.distanceTo(st),Nt=ot.projectionMatrix.elements,Vt=At.projectionMatrix.elements,zt=Nt[14]/(Nt[10]-1),ee=Nt[14]/(Nt[10]+1),Q=(Nt[9]+1)/Nt[5],rt=(Nt[9]-1)/Nt[5],I=(Nt[8]-1)/Nt[0],Lt=(Vt[8]+1)/Vt[0],et=zt*I,St=zt*Lt,ct=lt/(-I+Lt),Ot=ct*-I;if(ot.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ot),$.translateZ(ct),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Nt[10]===-1)$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const vt=zt+ct,A=ee+ct,S=et-Ot,F=St+(lt-Ot),Y=Q*ee/A*vt,j=rt*ee/A*vt;$.projectionMatrix.makePerspective(S,F,Y,j,vt,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ht($,ot){ot===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ot.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ot=$.near,At=$.far;_.texture!==null&&(_.depthNear>0&&(ot=_.depthNear),_.depthFar>0&&(At=_.depthFar)),M.near=R.near=C.near=ot,M.far=R.far=C.far=At,(L!==M.near||k!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,k=M.far),C.layers.mask=$.layers.mask|2,R.layers.mask=$.layers.mask|4,M.layers.mask=C.layers.mask|R.layers.mask;const lt=$.parent,Nt=M.cameras;ht(M,lt);for(let Vt=0;Vt<Nt.length;Vt++)ht(Nt[Vt],lt);Nt.length===2?G(M,C,R):M.projectionMatrix.copy(C.projectionMatrix),xt($,M,lt)};function xt($,ot,At){At===null?$.matrix.copy(ot.matrixWorld):($.matrix.copy(At.matrixWorld),$.matrix.invert(),$.matrix.multiply(ot.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=rr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Tt=null;function qt($,ot){if(h=ot.getViewerPose(c||o),p=ot,h!==null){const At=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let lt=!1;At.length!==M.cameras.length&&(M.cameras.length=0,lt=!0);for(let Vt=0;Vt<At.length;Vt++){const zt=At[Vt];let ee=null;if(f!==null)ee=f.getViewport(zt);else{const rt=u.getViewSubImage(d,zt);ee=rt.viewport,Vt===0&&(t.setRenderTargetTextures(v,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(v))}let Q=b[Vt];Q===void 0&&(Q=new Xe,Q.layers.enable(Vt),Q.viewport=new ie,b[Vt]=Q),Q.matrix.fromArray(zt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(zt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(ee.x,ee.y,ee.width,ee.height),Vt===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),lt===!0&&M.cameras.push(Q)}const Nt=i.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const Vt=u.getDepthInformation(At[0]);Vt&&Vt.isValid&&Vt.texture&&_.init(t,Vt,i.renderState)}}for(let At=0;At<x.length;At++){const lt=y[At],Nt=x[At];lt!==null&&Nt!==void 0&&Nt.update(lt,ot,c||o)}Tt&&Tt($,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),p=null}const ae=new rp;ae.setAnimationLoop(qt),this.setAnimationLoop=function($){Tt=$},this.dispose=function(){}}}const ts=new fn,Ry=new Ft;function Py(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,np(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,x,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,v,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===hn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===hn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=t.get(m),x=v.envMap,y=v.envMapRotation;x&&(g.envMap.value=x,ts.copy(y),ts.x*=-1,ts.y*=-1,ts.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ts.y*=-1,ts.z*=-1),g.envMapRotation.value.setFromMatrix4(Ry.makeRotationFromEuler(ts)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=x*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===hn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Iy(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const y=x.program;n.uniformBlockBinding(v,y)}function c(v,x){let y=i[v.id];y===void 0&&(p(v),y=h(v),i[v.id]=y,v.addEventListener("dispose",g));const P=x.program;n.updateUBOMapping(v,P);const E=t.render.frame;s[v.id]!==E&&(d(v),s[v.id]=E)}function h(v){const x=u();v.__bindingPointIndex=x;const y=r.createBuffer(),P=v.__size,E=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,P,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=i[v.id],y=v.uniforms,P=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let E=0,C=y.length;E<C;E++){const R=Array.isArray(y[E])?y[E]:[y[E]];for(let b=0,M=R.length;b<M;b++){const L=R[b];if(f(L,E,b,P)===!0){const k=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let V=0;for(let J=0;J<O.length;J++){const H=O[J],st=_(H);typeof H=="number"||typeof H=="boolean"?(L.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,k+V,L.__data)):H.isMatrix3?(L.__data[0]=H.elements[0],L.__data[1]=H.elements[1],L.__data[2]=H.elements[2],L.__data[3]=0,L.__data[4]=H.elements[3],L.__data[5]=H.elements[4],L.__data[6]=H.elements[5],L.__data[7]=0,L.__data[8]=H.elements[6],L.__data[9]=H.elements[7],L.__data[10]=H.elements[8],L.__data[11]=0):(H.toArray(L.__data,V),V+=st.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,x,y,P){const E=v.value,C=x+"_"+y;if(P[C]===void 0)return typeof E=="number"||typeof E=="boolean"?P[C]=E:P[C]=E.clone(),!0;{const R=P[C];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return P[C]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function p(v){const x=v.uniforms;let y=0;const P=16;for(let C=0,R=x.length;C<R;C++){const b=Array.isArray(x[C])?x[C]:[x[C]];for(let M=0,L=b.length;M<L;M++){const k=b[M],O=Array.isArray(k.value)?k.value:[k.value];for(let V=0,J=O.length;V<J;V++){const H=O[V],st=_(H),G=y%P,ht=G%st.boundary,xt=G+ht;y+=ht,xt!==0&&P-xt<st.storage&&(y+=P-xt),k.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=st.storage}}}const E=y%P;return E>0&&(y+=P-E),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function g(v){const x=v.target;x.removeEventListener("dispose",g);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class dp{constructor(t={}){const{canvas:e=Qf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const v=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=We,this.toneMapping=vi,this.toneMappingExposure=1;const y=this;let P=!1,E=0,C=0,R=null,b=-1,M=null;const L=new ie,k=new ie;let O=null;const V=new it(0);let J=0,H=e.width,st=e.height,G=1,ht=null,xt=null;const Tt=new ie(0,0,H,st),qt=new ie(0,0,H,st);let ae=!1;const $=new Mo;let ot=!1,At=!1;const lt=new Ft,Nt=new Ft,Vt=new T,zt=new ie,ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function rt(){return R===null?G:1}let I=n;function Lt(w,U){return e.getContext(w,U)}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_l}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",mt,!1),I===null){const U="webgl2";if(I=Lt(U,w),I===null)throw Lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let et,St,ct,Ot,vt,A,S,F,Y,j,Z,Ct,dt,yt,Qt,nt,bt,Bt,kt,wt,te,Kt,_e,D;function pt(){et=new Ox(I),et.init(),Kt=new hp(I,et),St=new Ix(I,et,t,Kt),ct=new _y(I,et),St.reverseDepthBuffer&&d&&ct.buffers.depth.setReversed(!0),Ot=new kx(I),vt=new sy,A=new by(I,et,ct,vt,St,Kt,Ot),S=new Dx(y),F=new Fx(y),Y=new Y0(I),_e=new Rx(I,Y),j=new Bx(I,Y,Ot,_e),Z=new Hx(I,j,Y,Ot),kt=new Vx(I,St,A),nt=new Lx(vt),Ct=new iy(y,S,F,et,St,_e,nt),dt=new Py(y,vt),yt=new oy,Qt=new dy(et),Bt=new Cx(y,S,F,ct,Z,f,l),bt=new my(y,Z,St),D=new Iy(I,Ot,St,ct),wt=new Px(I,et,Ot),te=new zx(I,et,Ot),Ot.programs=Ct.programs,y.capabilities=St,y.extensions=et,y.properties=vt,y.renderLists=yt,y.shadowMap=bt,y.state=ct,y.info=Ot}pt();const X=new Cy(y,I);this.xr=X,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=et.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=et.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(H,st,!1))},this.getSize=function(w){return w.set(H,st)},this.setSize=function(w,U,B=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=w,st=U,e.width=Math.floor(w*G),e.height=Math.floor(U*G),B===!0&&(e.style.width=w+"px",e.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(H*G,st*G).floor()},this.setDrawingBufferSize=function(w,U,B){H=w,st=U,G=B,e.width=Math.floor(w*B),e.height=Math.floor(U*B),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(Tt)},this.setViewport=function(w,U,B,z){w.isVector4?Tt.set(w.x,w.y,w.z,w.w):Tt.set(w,U,B,z),ct.viewport(L.copy(Tt).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(qt)},this.setScissor=function(w,U,B,z){w.isVector4?qt.set(w.x,w.y,w.z,w.w):qt.set(w,U,B,z),ct.scissor(k.copy(qt).multiplyScalar(G).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(w){ct.setScissorTest(ae=w)},this.setOpaqueSort=function(w){ht=w},this.setTransparentSort=function(w){xt=w},this.getClearColor=function(w){return w.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(w=!0,U=!0,B=!0){let z=0;if(w){let N=!1;if(R!==null){const at=R.texture.format;N=at===Tl||at===wl||at===xo}if(N){const at=R.texture.type,gt=at===ni||at===bi||at===sr||at===bs||at===Ml||at===Sl,Rt=Bt.getClearColor(),Pt=Bt.getClearAlpha(),Ht=Rt.r,$t=Rt.g,It=Rt.b;gt?(p[0]=Ht,p[1]=$t,p[2]=It,p[3]=Pt,I.clearBufferuiv(I.COLOR,0,p)):(_[0]=Ht,_[1]=$t,_[2]=It,_[3]=Pt,I.clearBufferiv(I.COLOR,0,_))}else z|=I.COLOR_BUFFER_BIT}U&&(z|=I.DEPTH_BUFFER_BIT),B&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),yt.dispose(),Qt.dispose(),vt.dispose(),S.dispose(),F.dispose(),Z.dispose(),_e.dispose(),D.dispose(),Ct.dispose(),X.dispose(),X.removeEventListener("sessionstart",du),X.removeEventListener("sessionend",fu),Zi.stop()};function K(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const w=Ot.autoReset,U=bt.enabled,B=bt.autoUpdate,z=bt.needsUpdate,N=bt.type;pt(),Ot.autoReset=w,bt.enabled=U,bt.autoUpdate=B,bt.needsUpdate=z,bt.type=N}function mt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Zt(w){const U=w.target;U.removeEventListener("dispose",Zt),Ae(U)}function Ae(w){$e(w),vt.remove(w)}function $e(w){const U=vt.get(w).programs;U!==void 0&&(U.forEach(function(B){Ct.releaseProgram(B)}),w.isShaderMaterial&&Ct.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,B,z,N,at){U===null&&(U=ee);const gt=N.isMesh&&N.matrixWorld.determinant()<0,Rt=pm(w,U,B,z,N);ct.setMaterial(z,gt);let Pt=B.index,Ht=1;if(z.wireframe===!0){if(Pt=j.getWireframeAttribute(B),Pt===void 0)return;Ht=2}const $t=B.drawRange,It=B.attributes.position;let re=$t.start*Ht,xe=($t.start+$t.count)*Ht;at!==null&&(re=Math.max(re,at.start*Ht),xe=Math.min(xe,(at.start+at.count)*Ht)),Pt!==null?(re=Math.max(re,0),xe=Math.min(xe,Pt.count)):It!=null&&(re=Math.max(re,0),xe=Math.min(xe,It.count));const ye=xe-re;if(ye<0||ye===1/0)return;_e.setup(N,z,Rt,B,Pt);let mn,le=wt;if(Pt!==null&&(mn=Y.get(Pt),le=te,le.setIndex(mn)),N.isMesh)z.wireframe===!0?(ct.setLineWidth(z.wireframeLinewidth*rt()),le.setMode(I.LINES)):le.setMode(I.TRIANGLES);else if(N.isLine){let Dt=z.linewidth;Dt===void 0&&(Dt=1),ct.setLineWidth(Dt*rt()),N.isLineSegments?le.setMode(I.LINES):N.isLineLoop?le.setMode(I.LINE_LOOP):le.setMode(I.LINE_STRIP)}else N.isPoints?le.setMode(I.POINTS):N.isSprite&&le.setMode(I.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)le.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))le.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Dt=N._multiDrawStarts,li=N._multiDrawCounts,ce=N._multiDrawCount,Fn=Pt?Y.get(Pt).bytesPerElement:1,Ds=vt.get(z).currentProgram.getUniforms();for(let bn=0;bn<ce;bn++)Ds.setValue(I,"_gl_DrawID",bn),le.render(Dt[bn]/Fn,li[bn])}else if(N.isInstancedMesh)le.renderInstances(re,ye,N.count);else if(B.isInstancedBufferGeometry){const Dt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,li=Math.min(B.instanceCount,Dt);le.renderInstances(re,ye,li)}else le.render(re,ye)};function fe(w,U,B){w.transparent===!0&&w.side===tn&&w.forceSinglePass===!1?(w.side=hn,w.needsUpdate=!0,Uo(w,U,B),w.side=Mi,w.needsUpdate=!0,Uo(w,U,B),w.side=tn):Uo(w,U,B)}this.compile=function(w,U,B=null){B===null&&(B=w),m=Qt.get(B),m.init(U),x.push(m),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),w!==B&&w.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights();const z=new Set;return w.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const at=N.material;if(at)if(Array.isArray(at))for(let gt=0;gt<at.length;gt++){const Rt=at[gt];fe(Rt,B,N),z.add(Rt)}else fe(at,B,N),z.add(at)}),x.pop(),m=null,z},this.compileAsync=function(w,U,B=null){const z=this.compile(w,U,B);return new Promise(N=>{function at(){if(z.forEach(function(gt){vt.get(gt).currentProgram.isReady()&&z.delete(gt)}),z.size===0){N(w);return}setTimeout(at,10)}et.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Nn=null;function ai(w){Nn&&Nn(w)}function du(){Zi.stop()}function fu(){Zi.start()}const Zi=new rp;Zi.setAnimationLoop(ai),typeof self<"u"&&Zi.setContext(self),this.setAnimationLoop=function(w){Nn=w,X.setAnimationLoop(w),w===null?Zi.stop():Zi.start()},X.addEventListener("sessionstart",du),X.addEventListener("sessionend",fu),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,U,R),m=Qt.get(w,x.length),m.init(U),x.push(m),Nt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Nt),At=this.localClippingEnabled,ot=nt.init(this.clippingPlanes,At),g=yt.get(w,v.length),g.init(),v.push(g),X.enabled===!0&&X.isPresenting===!0){const at=y.xr.getDepthSensingMesh();at!==null&&Jl(at,U,-1/0,y.sortObjects)}Jl(w,U,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ht,xt),Q=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Q&&Bt.addToRenderList(g,w),this.info.render.frame++,ot===!0&&nt.beginShadows();const B=m.state.shadowsArray;bt.render(B,w,U),ot===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=g.opaque,N=g.transmissive;if(m.setupLights(),U.isArrayCamera){const at=U.cameras;if(N.length>0)for(let gt=0,Rt=at.length;gt<Rt;gt++){const Pt=at[gt];mu(z,N,w,Pt)}Q&&Bt.render(w);for(let gt=0,Rt=at.length;gt<Rt;gt++){const Pt=at[gt];pu(g,w,Pt,Pt.viewport)}}else N.length>0&&mu(z,N,w,U),Q&&Bt.render(w),pu(g,w,U);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(y,w,U),_e.resetDefaultState(),b=-1,M=null,x.pop(),x.length>0?(m=x[x.length-1],ot===!0&&nt.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function Jl(w,U,B,z){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||$.intersectsSprite(w)){z&&zt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Nt);const gt=Z.update(w),Rt=w.material;Rt.visible&&g.push(w,gt,Rt,B,zt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||$.intersectsObject(w))){const gt=Z.update(w),Rt=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),zt.copy(w.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),zt.copy(gt.boundingSphere.center)),zt.applyMatrix4(w.matrixWorld).applyMatrix4(Nt)),Array.isArray(Rt)){const Pt=gt.groups;for(let Ht=0,$t=Pt.length;Ht<$t;Ht++){const It=Pt[Ht],re=Rt[It.materialIndex];re&&re.visible&&g.push(w,gt,re,B,zt.z,It)}}else Rt.visible&&g.push(w,gt,Rt,B,zt.z,null)}}const at=w.children;for(let gt=0,Rt=at.length;gt<Rt;gt++)Jl(at[gt],U,B,z)}function pu(w,U,B,z){const N=w.opaque,at=w.transmissive,gt=w.transparent;m.setupLightsView(B),ot===!0&&nt.setGlobalState(y.clippingPlanes,B),z&&ct.viewport(L.copy(z)),N.length>0&&Do(N,U,B),at.length>0&&Do(at,U,B),gt.length>0&&Do(gt,U,B),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function mu(w,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[z.id]===void 0&&(m.state.transmissionRenderTarget[z.id]=new en(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?Wn:ni,minFilter:Hn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const at=m.state.transmissionRenderTarget[z.id],gt=z.viewport||L;at.setSize(gt.z,gt.w);const Rt=y.getRenderTarget();y.setRenderTarget(at),y.getClearColor(V),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),Q&&Bt.render(B);const Pt=y.toneMapping;y.toneMapping=vi;const Ht=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),m.setupLightsView(z),ot===!0&&nt.setGlobalState(y.clippingPlanes,z),Do(w,B,z),A.updateMultisampleRenderTarget(at),A.updateRenderTargetMipmap(at),et.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let It=0,re=U.length;It<re;It++){const xe=U[It],ye=xe.object,mn=xe.geometry,le=xe.material,Dt=xe.group;if(le.side===tn&&ye.layers.test(z.layers)){const li=le.side;le.side=hn,le.needsUpdate=!0,gu(ye,B,z,mn,le,Dt),le.side=li,le.needsUpdate=!0,$t=!0}}$t===!0&&(A.updateMultisampleRenderTarget(at),A.updateRenderTargetMipmap(at))}y.setRenderTarget(Rt),y.setClearColor(V,J),Ht!==void 0&&(z.viewport=Ht),y.toneMapping=Pt}function Do(w,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,at=w.length;N<at;N++){const gt=w[N],Rt=gt.object,Pt=gt.geometry,Ht=z===null?gt.material:z,$t=gt.group;Rt.layers.test(B.layers)&&gu(Rt,U,B,Pt,Ht,$t)}}function gu(w,U,B,z,N,at){w.onBeforeRender(y,U,B,z,N,at),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.onBeforeRender(y,U,B,z,w,at),N.transparent===!0&&N.side===tn&&N.forceSinglePass===!1?(N.side=hn,N.needsUpdate=!0,y.renderBufferDirect(B,U,z,N,w,at),N.side=Mi,N.needsUpdate=!0,y.renderBufferDirect(B,U,z,N,w,at),N.side=tn):y.renderBufferDirect(B,U,z,N,w,at),w.onAfterRender(y,U,B,z,N,at)}function Uo(w,U,B){U.isScene!==!0&&(U=ee);const z=vt.get(w),N=m.state.lights,at=m.state.shadowsArray,gt=N.state.version,Rt=Ct.getParameters(w,N.state,at,U,B),Pt=Ct.getProgramCacheKey(Rt);let Ht=z.programs;z.environment=w.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(w.isMeshStandardMaterial?F:S).get(w.envMap||z.environment),z.envMapRotation=z.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Ht===void 0&&(w.addEventListener("dispose",Zt),Ht=new Map,z.programs=Ht);let $t=Ht.get(Pt);if($t!==void 0){if(z.currentProgram===$t&&z.lightsStateVersion===gt)return xu(w,Rt),$t}else Rt.uniforms=Ct.getUniforms(w),w.onBeforeCompile(Rt,y),$t=Ct.acquireProgram(Rt,Pt),Ht.set(Pt,$t),z.uniforms=Rt.uniforms;const It=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(It.clippingPlanes=nt.uniform),xu(w,Rt),z.needsLights=gm(w),z.lightsStateVersion=gt,z.needsLights&&(It.ambientLightColor.value=N.state.ambient,It.lightProbe.value=N.state.probe,It.directionalLights.value=N.state.directional,It.directionalLightShadows.value=N.state.directionalShadow,It.spotLights.value=N.state.spot,It.spotLightShadows.value=N.state.spotShadow,It.rectAreaLights.value=N.state.rectArea,It.ltc_1.value=N.state.rectAreaLTC1,It.ltc_2.value=N.state.rectAreaLTC2,It.pointLights.value=N.state.point,It.pointLightShadows.value=N.state.pointShadow,It.hemisphereLights.value=N.state.hemi,It.directionalShadowMap.value=N.state.directionalShadowMap,It.directionalShadowMatrix.value=N.state.directionalShadowMatrix,It.spotShadowMap.value=N.state.spotShadowMap,It.spotLightMatrix.value=N.state.spotLightMatrix,It.spotLightMap.value=N.state.spotLightMap,It.pointShadowMap.value=N.state.pointShadowMap,It.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=$t,z.uniformsList=null,$t}function _u(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=Ra.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function xu(w,U){const B=vt.get(w);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function pm(w,U,B,z,N){U.isScene!==!0&&(U=ee),A.resetTextureUnits();const at=U.fog,gt=z.isMeshStandardMaterial?U.environment:null,Rt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Cs,Pt=(z.isMeshStandardMaterial?F:S).get(z.envMap||gt),Ht=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,$t=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),It=!!B.morphAttributes.position,re=!!B.morphAttributes.normal,xe=!!B.morphAttributes.color;let ye=vi;z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ye=y.toneMapping);const mn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,le=mn!==void 0?mn.length:0,Dt=vt.get(z),li=m.state.lights;if(ot===!0&&(At===!0||w!==M)){const Pn=w===M&&z.id===b;nt.setState(z,w,Pn)}let ce=!1;z.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==li.state.version||Dt.outputColorSpace!==Rt||N.isBatchedMesh&&Dt.batching===!1||!N.isBatchedMesh&&Dt.batching===!0||N.isBatchedMesh&&Dt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Dt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Dt.instancing===!1||!N.isInstancedMesh&&Dt.instancing===!0||N.isSkinnedMesh&&Dt.skinning===!1||!N.isSkinnedMesh&&Dt.skinning===!0||N.isInstancedMesh&&Dt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Dt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Dt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Dt.instancingMorph===!1&&N.morphTexture!==null||Dt.envMap!==Pt||z.fog===!0&&Dt.fog!==at||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==nt.numPlanes||Dt.numIntersection!==nt.numIntersection)||Dt.vertexAlphas!==Ht||Dt.vertexTangents!==$t||Dt.morphTargets!==It||Dt.morphNormals!==re||Dt.morphColors!==xe||Dt.toneMapping!==ye||Dt.morphTargetsCount!==le)&&(ce=!0):(ce=!0,Dt.__version=z.version);let Fn=Dt.currentProgram;ce===!0&&(Fn=Uo(z,U,N));let Ds=!1,bn=!1,Mr=!1;const Me=Fn.getUniforms(),$n=Dt.uniforms;if(ct.useProgram(Fn.program)&&(Ds=!0,bn=!0,Mr=!0),z.id!==b&&(b=z.id,bn=!0),Ds||M!==w){ct.buffers.depth.getReversed()?(lt.copy(w.projectionMatrix),x0(lt),v0(lt),Me.setValue(I,"projectionMatrix",lt)):Me.setValue(I,"projectionMatrix",w.projectionMatrix),Me.setValue(I,"viewMatrix",w.matrixWorldInverse);const Ai=Me.map.cameraPosition;Ai!==void 0&&Ai.setValue(I,Vt.setFromMatrixPosition(w.matrixWorld)),St.logarithmicDepthBuffer&&Me.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Me.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,bn=!0,Mr=!0)}if(N.isSkinnedMesh){Me.setOptional(I,N,"bindMatrix"),Me.setOptional(I,N,"bindMatrixInverse");const Pn=N.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),Me.setValue(I,"boneTexture",Pn.boneTexture,A))}N.isBatchedMesh&&(Me.setOptional(I,N,"batchingTexture"),Me.setValue(I,"batchingTexture",N._matricesTexture,A),Me.setOptional(I,N,"batchingIdTexture"),Me.setValue(I,"batchingIdTexture",N._indirectTexture,A),Me.setOptional(I,N,"batchingColorTexture"),N._colorsTexture!==null&&Me.setValue(I,"batchingColorTexture",N._colorsTexture,A));const Sr=B.morphAttributes;if((Sr.position!==void 0||Sr.normal!==void 0||Sr.color!==void 0)&&kt.update(N,B,Fn),(bn||Dt.receiveShadow!==N.receiveShadow)&&(Dt.receiveShadow=N.receiveShadow,Me.setValue(I,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&($n.envMap.value=Pt,$n.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&($n.envMapIntensity.value=U.environmentIntensity),bn&&(Me.setValue(I,"toneMappingExposure",y.toneMappingExposure),Dt.needsLights&&mm($n,Mr),at&&z.fog===!0&&dt.refreshFogUniforms($n,at),dt.refreshMaterialUniforms($n,z,G,st,m.state.transmissionRenderTarget[w.id]),Ra.upload(I,_u(Dt),$n,A)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ra.upload(I,_u(Dt),$n,A),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Me.setValue(I,"center",N.center),Me.setValue(I,"modelViewMatrix",N.modelViewMatrix),Me.setValue(I,"normalMatrix",N.normalMatrix),Me.setValue(I,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Pn=z.uniformsGroups;for(let Ai=0,Ci=Pn.length;Ai<Ci;Ai++){const vu=Pn[Ai];D.update(vu,Fn),D.bind(vu,Fn)}}return Fn}function mm(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function gm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,U,B){vt.get(w.texture).__webglTexture=U,vt.get(w.depthTexture).__webglTexture=B;const z=vt.get(w);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const B=vt.get(w);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,B=0){R=w,E=U,C=B;let z=!0,N=null,at=!1,gt=!1;if(w){const Pt=vt.get(w);if(Pt.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(I.FRAMEBUFFER,null),z=!1;else if(Pt.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(Pt.__hasExternalTextures)A.rebindTextures(w,vt.get(w.texture).__webglTexture,vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const It=w.depthTexture;if(Pt.__boundDepthTexture!==It){if(It!==null&&vt.has(It)&&(w.width!==It.image.width||w.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}const Ht=w.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(gt=!0);const $t=vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray($t[U])?N=$t[U][B]:N=$t[U],at=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?N=vt.get(w).__webglMultisampledFramebuffer:Array.isArray($t)?N=$t[B]:N=$t,L.copy(w.viewport),k.copy(w.scissor),O=w.scissorTest}else L.copy(Tt).multiplyScalar(G).floor(),k.copy(qt).multiplyScalar(G).floor(),O=ae;if(ct.bindFramebuffer(I.FRAMEBUFFER,N)&&z&&ct.drawBuffers(w,N),ct.viewport(L),ct.scissor(k),ct.setScissorTest(O),at){const Pt=vt.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,Pt.__webglTexture,B)}else if(gt){const Pt=vt.get(w.texture),Ht=U||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Pt.__webglTexture,B||0,Ht)}b=-1},this.readRenderTargetPixels=function(w,U,B,z,N,at,gt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&gt!==void 0&&(Rt=Rt[gt]),Rt){ct.bindFramebuffer(I.FRAMEBUFFER,Rt);try{const Pt=w.texture,Ht=Pt.format,$t=Pt.type;if(!St.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-z&&B>=0&&B<=w.height-N&&I.readPixels(U,B,z,N,Kt.convert(Ht),Kt.convert($t),at)}finally{const Pt=R!==null?vt.get(R).__webglFramebuffer:null;ct.bindFramebuffer(I.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(w,U,B,z,N,at,gt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&gt!==void 0&&(Rt=Rt[gt]),Rt){const Pt=w.texture,Ht=Pt.format,$t=Pt.type;if(!St.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-z&&B>=0&&B<=w.height-N){ct.bindFramebuffer(I.FRAMEBUFFER,Rt);const It=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,It),I.bufferData(I.PIXEL_PACK_BUFFER,at.byteLength,I.STREAM_READ),I.readPixels(U,B,z,N,Kt.convert(Ht),Kt.convert($t),0);const re=R!==null?vt.get(R).__webglFramebuffer:null;ct.bindFramebuffer(I.FRAMEBUFFER,re);const xe=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await _0(I,xe,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,It),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,at),I.deleteBuffer(It),I.deleteSync(xe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,B=0){w.isTexture!==!0&&(Or("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const z=Math.pow(2,-B),N=Math.floor(w.image.width*z),at=Math.floor(w.image.height*z),gt=U!==null?U.x:0,Rt=U!==null?U.y:0;A.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,B,0,0,gt,Rt,N,at),ct.unbindTexture()},this.copyTextureToTexture=function(w,U,B=null,z=null,N=0){w.isTexture!==!0&&(Or("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,w=arguments[1],U=arguments[2],N=arguments[3]||0,B=null);let at,gt,Rt,Pt,Ht,$t,It,re,xe;const ye=w.isCompressedTexture?w.mipmaps[N]:w.image;B!==null?(at=B.max.x-B.min.x,gt=B.max.y-B.min.y,Rt=B.isBox3?B.max.z-B.min.z:1,Pt=B.min.x,Ht=B.min.y,$t=B.isBox3?B.min.z:0):(at=ye.width,gt=ye.height,Rt=ye.depth||1,Pt=0,Ht=0,$t=0),z!==null?(It=z.x,re=z.y,xe=z.z):(It=0,re=0,xe=0);const mn=Kt.convert(U.format),le=Kt.convert(U.type);let Dt;U.isData3DTexture?(A.setTexture3D(U,0),Dt=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(A.setTexture2DArray(U,0),Dt=I.TEXTURE_2D_ARRAY):(A.setTexture2D(U,0),Dt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const li=I.getParameter(I.UNPACK_ROW_LENGTH),ce=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Fn=I.getParameter(I.UNPACK_SKIP_PIXELS),Ds=I.getParameter(I.UNPACK_SKIP_ROWS),bn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ye.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ye.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Pt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ht),I.pixelStorei(I.UNPACK_SKIP_IMAGES,$t);const Mr=w.isDataArrayTexture||w.isData3DTexture,Me=U.isDataArrayTexture||U.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const $n=vt.get(w),Sr=vt.get(U),Pn=vt.get($n.__renderTarget),Ai=vt.get(Sr.__renderTarget);ct.bindFramebuffer(I.READ_FRAMEBUFFER,Pn.__webglFramebuffer),ct.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let Ci=0;Ci<Rt;Ci++)Mr&&I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,vt.get(w).__webglTexture,N,$t+Ci),w.isDepthTexture?(Me&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,vt.get(U).__webglTexture,N,xe+Ci),I.blitFramebuffer(Pt,Ht,at,gt,It,re,at,gt,I.DEPTH_BUFFER_BIT,I.NEAREST)):Me?I.copyTexSubImage3D(Dt,N,It,re,xe+Ci,Pt,Ht,at,gt):I.copyTexSubImage2D(Dt,N,It,re,xe+Ci,Pt,Ht,at,gt);ct.bindFramebuffer(I.READ_FRAMEBUFFER,null),ct.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Me?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(Dt,N,It,re,xe,at,gt,Rt,mn,le,ye.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(Dt,N,It,re,xe,at,gt,Rt,mn,ye.data):I.texSubImage3D(Dt,N,It,re,xe,at,gt,Rt,mn,le,ye):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,N,It,re,at,gt,mn,le,ye.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,N,It,re,ye.width,ye.height,mn,ye.data):I.texSubImage2D(I.TEXTURE_2D,N,It,re,at,gt,mn,le,ye);I.pixelStorei(I.UNPACK_ROW_LENGTH,li),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ce),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Fn),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ds),I.pixelStorei(I.UNPACK_SKIP_IMAGES,bn),N===0&&U.generateMipmaps&&I.generateMipmap(Dt),ct.unbindTexture()},this.copyTextureToTexture3D=function(w,U,B=null,z=null,N=0){return w.isTexture!==!0&&(Or("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,w=arguments[2],U=arguments[3],N=arguments[4]||0),Or('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,B,z,N)},this.initRenderTarget=function(w){vt.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),ct.unbindTexture()},this.resetState=function(){E=0,C=0,R=null,ct.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class bo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new it(t),this.density=e}clone(){return new bo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Il{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new it(t),this.near=e,this.far=n}clone(){return new Il(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Fh extends se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ll{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=io,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const on=new T;class Ts{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyMatrix4(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyNormalMatrix(t),this.setXYZ(e,on.x,on.y,on.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.transformDirection(t),this.setXYZ(e,on.x,on.y,on.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Yt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ts(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Oh extends rn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ys;const Ar=new T,Zs=new T,$s=new T,Js=new q,Cr=new q,fp=new Ft,ea=new T,Rr=new T,na=new T,hd=new q,wc=new q,ud=new q;class pp extends se{constructor(t=new Oh){if(super(),this.isSprite=!0,this.type="Sprite",Ys===void 0){Ys=new Wt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ll(e,5);Ys.setIndex([0,1,2,0,2,3]),Ys.setAttribute("position",new Ts(n,3,0,!1)),Ys.setAttribute("uv",new Ts(n,2,3,!1))}this.geometry=Ys,this.material=t,this.center=new q(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Zs.setFromMatrixScale(this.matrixWorld),fp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),$s.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Zs.multiplyScalar(-$s.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;ia(ea.set(-.5,-.5,0),$s,o,Zs,i,s),ia(Rr.set(.5,-.5,0),$s,o,Zs,i,s),ia(na.set(.5,.5,0),$s,o,Zs,i,s),hd.set(0,0),wc.set(1,0),ud.set(1,1);let a=t.ray.intersectTriangle(ea,Rr,na,!1,Ar);if(a===null&&(ia(Rr.set(-.5,.5,0),$s,o,Zs,i,s),wc.set(0,1),a=t.ray.intersectTriangle(ea,na,Rr,!1,Ar),a===null))return;const l=t.ray.origin.distanceTo(Ar);l<t.near||l>t.far||e.push({distance:l,point:Ar.clone(),uv:xn.getInterpolation(Ar,ea,Rr,na,hd,wc,ud,new q),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ia(r,t,e,n,i,s){Js.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Cr.x=s*Js.x-i*Js.y,Cr.y=i*Js.x+s*Js.y):Cr.copy(Js),r.copy(t),r.x+=Cr.x,r.y+=Cr.y,r.applyMatrix4(fp)}const sa=new T,dd=new T;class mp extends se{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let n=0,i=e.length;n<i;n++){const s=e[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);const i=this.levels;let s;for(s=0;s<i.length&&!(e<i[s].distance);s++);return i.splice(s,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){const e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){const i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let s=e[n].distance;if(e[n].object.visible&&(s-=s*e[n].hysteresis),t<s)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){sa.setFromMatrixPosition(this.matrixWorld);const i=t.ray.origin.distanceTo(sa);this.getObjectForDistance(i).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){sa.setFromMatrixPosition(t.matrixWorld),dd.setFromMatrixPosition(this.matrixWorld);const n=sa.distanceTo(dd)/t.zoom;e[0].object.visible=!0;let i,s;for(i=1,s=e.length;i<s;i++){let o=e[i].distance;if(e[i].object.visible&&(o-=o*e[i].hysteresis),n>=o)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)e[i].object.visible=!1}}toJSON(t){const e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const o=n[i];e.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return e}}const fd=new T,pd=new ie,md=new ie,Ly=new T,gd=new Ft,ra=new T,Tc=new sn,_d=new Ft,Ec=new gr;class gp extends ft{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=$c,this.bindMatrix=new Ft,this.bindMatrixInverse=new Ft,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new un),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ra),this.boundingBox.expandByPoint(ra)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new sn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ra),this.boundingSphere.expandByPoint(ra)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tc.copy(this.boundingSphere),Tc.applyMatrix4(i),t.ray.intersectsSphere(Tc)!==!1&&(_d.copy(i).invert(),Ec.copy(t.ray).applyMatrix4(_d),!(this.boundingBox!==null&&Ec.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Ec)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ie,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===$c?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Of?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;pd.fromBufferAttribute(i.attributes.skinIndex,t),md.fromBufferAttribute(i.attributes.skinWeight,t),fd.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=md.getComponent(s);if(o!==0){const a=pd.getComponent(s);gd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Ly.copy(fd).applyMatrix4(gd),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Bh extends se{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ti extends Pe{constructor(t=null,e=1,n=1,i,s,o,a,l,c=Ue,h=Ue,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xd=new Ft,Dy=new Ft;class Dl{constructor(t=[],e=[]){this.uuid=Cn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ft)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ft;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=t.length;s<o;s++){const a=t[s]?t[s].matrixWorld:Dy;xd.multiplyMatrices(a,e[s]),xd.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Dl(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new ti(e,t,t,cn,yn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let o=e[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Bh),this.bones.push(o),this.boneInverses.push(new Ft().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class lr extends pe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ks=new Ft,vd=new Ft,oa=[],yd=new un,Uy=new Ft,Pr=new ft,Ir=new sn;class vs extends ft{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new lr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Uy)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new un),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ks),yd.copy(t.boundingBox).applyMatrix4(Ks),this.boundingBox.union(yd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new sn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ks),Ir.copy(t.boundingSphere).applyMatrix4(Ks),this.boundingSphere.union(Ir)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Pr.geometry=this.geometry,Pr.material=this.material,Pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ir.copy(this.boundingSphere),Ir.applyMatrix4(n),t.ray.intersectsSphere(Ir)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ks),vd.multiplyMatrices(n,Ks),Pr.matrixWorld=vd,Pr.raycast(t,oa);for(let o=0,a=oa.length;o<a;o++){const l=oa[o];l.instanceId=s,l.object=this,e.push(l)}oa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new lr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ti(new Float32Array(i*this.count),i,this.count,bl,yn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Ac(r,t){return r-t}function Ny(r,t){return r.z-t.z}function Fy(r,t){return t.z-r.z}class Oy{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){const s=this.pool,o=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const a=s[this.index];o.push(a),this.index++,a.start=t,a.count=e,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const gn=new Ft,By=new it(1,1,1),Cc=new Mo,aa=new un,es=new sn,Lr=new T,Md=new T,zy=new T,Rc=new Oy,Qe=new ft,la=[];function ky(r,t,e=0){const n=t.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==t.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let o=0;o<n;o++)t.setComponent(s+e,o,r.getComponent(s,o))}else t.array.set(r.array,e*n);t.needsUpdate=!0}function ns(r,t){if(r.constructor!==t.constructor){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++)t[n]=r[n]}else{const e=Math.min(r.length,t.length);t.set(new r.constructor(r.buffer,0,e))}}class _p extends ft{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(t,e,n=e*2,i){super(new Wt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4),n=new ti(e,t,t,cn,yn);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),n=new ti(e,t,t,xo,bi);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),n=new ti(e,t,t,cn,yn);n.colorSpace=jt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){const e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in t.attributes){const o=t.getAttribute(s),{array:a,itemSize:l,normalized:c}=o,h=new a.constructor(n*l),u=new pe(h,l,c);e.setAttribute(s,u)}if(t.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new pe(s,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=t.getAttribute(n),s=e.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);const t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,gn),this.getBoundingBoxAt(s,aa).applyMatrix4(gn),t.union(aa)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sn);const t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const s=e[n].geometryIndex;this.getMatrixAt(n,gn),this.getBoundingSphereAt(s,es).applyMatrix4(gn),t.union(es)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:t};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Ac),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;gn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const o=this._colorsTexture;return o&&(By.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;const o=t.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Ac),l=this._availableGeometryIds.shift(),s[l]=i):(l=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(l,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),o=e.getIndex(),a=this._geometryInfo[t];if(i&&o.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(const h in n.attributes){const u=e.getAttribute(h),d=n.getAttribute(h);ky(u,d,l);const f=u.itemSize;for(let p=u.count,_=c;p<_;p++){const g=l+p;for(let m=0;m<f;m++)d.setComponent(g,m,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){const h=a.indexStart,u=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let d=0;d<o.count;d++)s.setX(h+d,l+o.getX(d));for(let d=o.count,f=u;d<f;d++)s.setX(h+d,l);s.needsUpdate=!0,s.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,e.boundingSphere!==null&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){const e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].geometryIndex===t&&this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?this:(e[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this)}optimize(){let t=0,e=0;const n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),s=this.geometry;for(let o=0,a=n.length;o<a;o++){const l=i[o],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==e){const{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=s.index,p=f.array,_=t-u;for(let g=h;g<h+d;g++)p[g]=p[g]+_;f.array.copyWithin(e,h,h+d),f.addUpdateRange(e,d),c.indexStart=e}e+=c.reservedIndexCount}if(c.vertexStart!==t){const{vertexStart:h,reservedVertexCount:u}=c,d=s.attributes;for(const f in d){const p=d[f],{array:_,itemSize:g}=p;_.copyWithin(t*g,h*g,(h+u)*g),p.addUpdateRange(t*g,u*g)}c.vertexStart=t}t+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){const s=new un,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;o&&(h=o.getX(h)),s.expandByPoint(Lr.fromBufferAttribute(a,h))}i.boundingBox=s}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){const s=new sn;this.getBoundingBoxAt(t,aa),aa.getCenter(s.center);const o=n.index,a=n.attributes.position;let l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;o&&(u=o.getX(u)),Lr.fromBufferAttribute(a,u),l=Math.max(l,s.center.distanceToSquared(Lr))}s.radius=Math.sqrt(l),i.boundingSphere=s}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture,s=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?this:(e.toArray(s,t*16),i.needsUpdate=!0,this)}getMatrixAt(t,e){const n=this._instanceInfo,i=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?null:e.fromArray(i,t*16)}setColorAt(t,e){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,s=this._instanceInfo;return t>=s.length||s[t].active===!1?this:(e.toArray(i,t*4),n.needsUpdate=!0,this)}getColorAt(t,e){const n=this._colorsTexture.image.data,i=this._instanceInfo;return t>=i.length||i[t].active===!1?null:e.fromArray(n,t*4)}setVisibleAt(t,e){const n=this._instanceInfo;return t>=n.length||n[t].active===!1||n[t].visible===e?this:(n[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?!1:e[t].visible}setGeometryIdAt(t,e){const n=this._instanceInfo,i=this._geometryInfo;return t>=n.length||n[t].active===!1||e>=i.length||i[e].active===!1?null:(n[t].geometryIndex=e,this)}getGeometryIdAt(t){const e=this._instanceInfo;return t>=e.length||e[t].active===!1?-1:e[t].geometryIndex}getGeometryRangeAt(t,e={}){if(t<0||t>=this._geometryCount)return null;const n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){const e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(Ac);e[e.length-1]===n.length;)n.pop(),e.pop();if(t<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);const i=new Int32Array(t),s=new Int32Array(t);ns(this._multiDrawCounts,i),ns(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=t;const o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),ns(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),ns(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),ns(l.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Wt,this._initializeGeometry(s));const o=this.geometry;s.index&&ns(s.index.array,o.index.array);for(const a in s.attributes)ns(s.attributes[a].array,o.attributes[a].array)}raycast(t,e){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,o=this.geometry;Qe.material=this.material,Qe.geometry.index=o.index,Qe.geometry.attributes=o.attributes,Qe.geometry.boundingBox===null&&(Qe.geometry.boundingBox=new un),Qe.geometry.boundingSphere===null&&(Qe.geometry.boundingSphere=new sn);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;const c=n[a].geometryIndex,h=i[c];Qe.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Qe.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Qe.geometry.boundingBox),this.getBoundingSphereAt(c,Qe.geometry.boundingSphere),Qe.raycast(t,la);for(let u=0,d=la.length;u<d;u++){const f=la[u];f.object=this,f.batchId=a,e.push(f)}la.length=0}Qe.material=null,Qe.geometry.index=null,Qe.geometry.attributes={},Qe.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._geometryCount=t._geometryCount,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(t,e,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,p=f.image.data;d&&(gn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Cc.setFromProjectionMatrix(gn,t.coordinateSystem));let _=0;if(this.sortObjects){gn.copy(this.matrixWorld).invert(),Lr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(gn),Md.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(gn);for(let v=0,x=l.length;v<x;v++)if(l[v].visible&&l[v].active){const y=l[v].geometryIndex;this.getMatrixAt(v,gn),this.getBoundingSphereAt(y,es).applyMatrix4(gn);let P=!1;if(d&&(P=!Cc.intersectsSphere(es)),!P){const E=u[y],C=zy.subVectors(es.center,Lr).dot(Md);Rc.push(E.start,E.count,C,v)}}const g=Rc.list,m=this.customSort;m===null?g.sort(s.transparent?Fy:Ny):m.call(this,g,n);for(let v=0,x=g.length;v<x;v++){const y=g[v];c[_]=y.start*a,h[_]=y.count,p[_]=y.index,_++}Rc.reset()}else for(let g=0,m=l.length;g<m;g++)if(l[g].visible&&l[g].active){const v=l[g].geometryIndex;let x=!1;if(d&&(this.getMatrixAt(g,gn),this.getBoundingSphereAt(v,es).applyMatrix4(gn),x=!Cc.intersectsSphere(es)),!x){const y=u[v];c[_]=y.start*a,h[_]=y.count,p[_]=g,_++}}f.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,s,o){this.onBeforeRender(t,null,i,s,o)}}class pn extends rn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const fl=new T,pl=new T,Sd=new Ft,Dr=new gr,ca=new sn,Pc=new T,bd=new T;class Hi extends se{constructor(t=new Wt,e=new pn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)fl.fromBufferAttribute(e,i-1),pl.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=fl.distanceTo(pl);t.setAttribute("lineDistance",new Mt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ca.copy(n.boundingSphere),ca.applyMatrix4(i),ca.radius+=s,t.ray.intersectsSphere(ca)===!1)return;Sd.copy(i).invert(),Dr.copy(t.ray).applyMatrix4(Sd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=h.getX(_),v=h.getX(_+1),x=ha(this,t,Dr,l,m,v);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(f),m=ha(this,t,Dr,l,_,g);m&&e.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=ha(this,t,Dr,l,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=ha(this,t,Dr,l,p-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ha(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(fl.fromBufferAttribute(o,i),pl.fromBufferAttribute(o,s),e.distanceSqToSegment(fl,pl,Pc,bd)>n)return;Pc.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Pc);if(!(l<t.near||l>t.far))return{distance:l,point:bd.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const wd=new T,Td=new T;class oi extends Hi{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)wd.fromBufferAttribute(e,i),Td.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+wd.distanceTo(Td);t.setAttribute("lineDistance",new Mt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xp extends Hi{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Ul extends rn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ed=new Ft,nh=new gr,ua=new sn,da=new T;class zh extends se{constructor(t=new Wt,e=new Ul){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(i),ua.radius+=s,t.ray.intersectsSphere(ua)===!1)return;Ed.copy(i).invert(),nh.copy(t.ray).applyMatrix4(Ed);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,_=f;p<_;p++){const g=c.getX(p);da.fromBufferAttribute(u,g),Ad(da,g,l,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,_=f;p<_;p++)da.fromBufferAttribute(u,p),Ad(da,p,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ad(r,t,e,n,i,s,o){const a=nh.distanceSqToPoint(r);if(a<e){const l=new T;nh.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Vy extends Pe{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:Fe,this.magFilter=s!==void 0?s:Fe,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,t.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class Hy extends Pe{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=Ue,this.minFilter=Ue,this.generateMipmaps=!1,this.needsUpdate=!0}}class Nl extends Pe{constructor(t,e,n,i,s,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class Gy extends Nl{constructor(t,e,n,i,s,o){super(t,e,n,s,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=vn,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wy extends Nl{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,Si),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class Fl extends Pe{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new q:new T);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new T,i=[],s=[],o=[],a=new T,l=new Ft;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new T)}s[0]=new T,o[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Re(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(Re(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let p=1;p<=t;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ol extends qn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new q){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class vp extends Ol{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function kh(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const fa=new T,Ic=new kh,Lc=new kh,Dc=new kh;class yp extends qn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new T){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(fa.subVectors(i[0],i[1]).add(i[0]),c=fa);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(fa.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=fa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Ic.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,_,g),Lc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,_,g),Dc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Ic.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Lc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Dc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ic.calc(l),Lc.calc(l),Dc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new T().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Cd(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function Xy(r,t){const e=1-r;return e*e*t}function qy(r,t){return 2*(1-r)*r*t}function Yy(r,t){return r*r*t}function Zr(r,t,e,n){return Xy(r,t)+qy(r,e)+Yy(r,n)}function Zy(r,t){const e=1-r;return e*e*e*t}function $y(r,t){const e=1-r;return 3*e*e*r*t}function Jy(r,t){return 3*(1-r)*r*r*t}function Ky(r,t){return r*r*r*t}function $r(r,t,e,n,i){return Zy(r,t)+$y(r,e)+Jy(r,n)+Ky(r,i)}class Vh extends qn{constructor(t=new q,e=new q,n=new q,i=new q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new q){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set($r(t,i.x,s.x,o.x,a.x),$r(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Mp extends qn{constructor(t=new T,e=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new T){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set($r(t,i.x,s.x,o.x,a.x),$r(t,i.y,s.y,o.y,a.y),$r(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Hh extends qn{constructor(t=new q,e=new q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new q){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sp extends qn{constructor(t=new T,e=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new T){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new T){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gh extends qn{constructor(t=new q,e=new q,n=new q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new q){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Zr(t,i.x,s.x,o.x),Zr(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bl extends qn{constructor(t=new T,e=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new T){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Zr(t,i.x,s.x,o.x),Zr(t,i.y,s.y,o.y),Zr(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wh extends qn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new q){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Cd(a,l.x,c.x,h.x,u.x),Cd(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new q().fromArray(i))}return this}}var ml=Object.freeze({__proto__:null,ArcCurve:vp,CatmullRomCurve3:yp,CubicBezierCurve:Vh,CubicBezierCurve3:Mp,EllipseCurve:Ol,LineCurve:Hh,LineCurve3:Sp,QuadraticBezierCurve:Gh,QuadraticBezierCurve3:Bl,SplineCurve:Wh});class bp extends qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ml[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ml[i.type]().fromJSON(i))}return this}}class oo extends bp{constructor(t){super(),this.type="Path",this.currentPoint=new q,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Hh(this.currentPoint.clone(),new q(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new Gh(this.currentPoint.clone(),new q(t,e),new q(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new Vh(this.currentPoint.clone(),new q(t,e),new q(n,i),new q(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Wh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new Ol(t,e,n,i,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class wo extends Wt{constructor(t=[new q(0,-.5),new q(.5,0),new q(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Re(i,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/e,u=new T,d=new q,f=new T,p=new T,_=new T;let g=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=e;v++){const x=n+v*h*i,y=Math.sin(x),P=Math.cos(x);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*y,u.y=t[E].y,u.z=t[E].x*P,o.push(u.x,u.y,u.z),d.x=v/e,d.y=E/(t.length-1),a.push(d.x,d.y);const C=l[3*E+0]*y,R=l[3*E+1],b=l[3*E+0]*P;c.push(C,R,b)}}for(let v=0;v<e;v++)for(let x=0;x<t.length-1;x++){const y=x+v*t.length,P=y,E=y+t.length,C=y+t.length+1,R=y+1;s.push(P,E,R),s.push(C,R,E)}this.setIndex(s),this.setAttribute("position",new Mt(o,3)),this.setAttribute("uv",new Mt(a,2)),this.setAttribute("normal",new Mt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wo(t.points,t.segments,t.phiStart,t.phiLength)}}class zl extends wo{constructor(t=1,e=1,n=4,i=8){const s=new oo;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new zl(t.radius,t.length,t.capSegments,t.radialSegments)}}class xr extends Wt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new T,h=new q;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(a,3)),this.setAttribute("uv",new Mt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Xn extends Wt{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const _=[],g=n/2;let m=0;v(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Mt(u,3)),this.setAttribute("normal",new Mt(d,3)),this.setAttribute("uv",new Mt(f,2));function v(){const y=new T,P=new T;let E=0;const C=(e-t)/n;for(let R=0;R<=s;R++){const b=[],M=R/s,L=M*(e-t)+t;for(let k=0;k<=i;k++){const O=k/i,V=O*l+a,J=Math.sin(V),H=Math.cos(V);P.x=L*J,P.y=-M*n+g,P.z=L*H,u.push(P.x,P.y,P.z),y.set(J,C,H).normalize(),d.push(y.x,y.y,y.z),f.push(O,1-M),b.push(p++)}_.push(b)}for(let R=0;R<i;R++)for(let b=0;b<s;b++){const M=_[b][R],L=_[b+1][R],k=_[b+1][R+1],O=_[b][R+1];(t>0||b!==0)&&(h.push(M,L,O),E+=3),(e>0||b!==s-1)&&(h.push(L,k,O),E+=3)}c.addGroup(m,E,0),m+=E}function x(y){const P=p,E=new q,C=new T;let R=0;const b=y===!0?t:e,M=y===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),p++;const L=p;for(let k=0;k<=i;k++){const V=k/i*l+a,J=Math.cos(V),H=Math.sin(V);C.x=b*H,C.y=g*M,C.z=b*J,u.push(C.x,C.y,C.z),d.push(0,M,0),E.x=J*.5+.5,E.y=H*.5*M+.5,f.push(E.x,E.y),p++}for(let k=0;k<i;k++){const O=P+k,V=L+k;y===!0?h.push(V,V+1,O):h.push(V+1,V,O),R+=3}c.addGroup(m,R,y===!0?1:2),m+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class kl extends Xn{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new kl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xi extends Wt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Mt(s,3)),this.setAttribute("normal",new Mt(s.slice(),3)),this.setAttribute("uv",new Mt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const x=new T,y=new T,P=new T;for(let E=0;E<e.length;E+=3)f(e[E+0],x),f(e[E+1],y),f(e[E+2],P),l(x,y,P,v)}function l(v,x,y,P){const E=P+1,C=[];for(let R=0;R<=E;R++){C[R]=[];const b=v.clone().lerp(y,R/E),M=x.clone().lerp(y,R/E),L=E-R;for(let k=0;k<=L;k++)k===0&&R===E?C[R][k]=b:C[R][k]=b.clone().lerp(M,k/L)}for(let R=0;R<E;R++)for(let b=0;b<2*(E-R)-1;b++){const M=Math.floor(b/2);b%2===0?(d(C[R][M+1]),d(C[R+1][M]),d(C[R][M])):(d(C[R][M+1]),d(C[R+1][M+1]),d(C[R+1][M]))}}function c(v){const x=new T;for(let y=0;y<s.length;y+=3)x.x=s[y+0],x.y=s[y+1],x.z=s[y+2],x.normalize().multiplyScalar(v),s[y+0]=x.x,s[y+1]=x.y,s[y+2]=x.z}function h(){const v=new T;for(let x=0;x<s.length;x+=3){v.x=s[x+0],v.y=s[x+1],v.z=s[x+2];const y=g(v)/2/Math.PI+.5,P=m(v)/Math.PI+.5;o.push(y,1-P)}p(),u()}function u(){for(let v=0;v<o.length;v+=6){const x=o[v+0],y=o[v+2],P=o[v+4],E=Math.max(x,y,P),C=Math.min(x,y,P);E>.9&&C<.1&&(x<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),P<.2&&(o[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,x){const y=v*3;x.x=t[y+0],x.y=t[y+1],x.z=t[y+2]}function p(){const v=new T,x=new T,y=new T,P=new T,E=new q,C=new q,R=new q;for(let b=0,M=0;b<s.length;b+=9,M+=6){v.set(s[b+0],s[b+1],s[b+2]),x.set(s[b+3],s[b+4],s[b+5]),y.set(s[b+6],s[b+7],s[b+8]),E.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),R.set(o[M+4],o[M+5]),P.copy(v).add(x).add(y).divideScalar(3);const L=g(P);_(E,M+0,v,L),_(C,M+2,x,L),_(R,M+4,y,L)}}function _(v,x,y,P){P<0&&v.x===1&&(o[x]=v.x-1),y.x===0&&y.z===0&&(o[x]=P/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xi(t.vertices,t.indices,t.radius,t.details)}}class vr extends Xi{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vr(t.radius,t.detail)}}const pa=new T,ma=new T,Uc=new T,ga=new xn;class wp extends Wt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),s=Math.cos(xs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:_,b:g,c:m}=ga;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),ga.getNormal(Uc),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let v=0;v<3;v++){const x=(v+1)%3,y=u[v],P=u[x],E=ga[h[v]],C=ga[h[x]],R=`${y}_${P}`,b=`${P}_${y}`;b in d&&d[b]?(Uc.dot(d[b].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(C.x,C.y,C.z)),d[b]=null):R in d||(d[R]={index0:c[v],index1:c[x],normal:Uc.clone()})}}for(const p in d)if(d[p]){const{index0:_,index1:g}=d[p];pa.fromBufferAttribute(a,_),ma.fromBufferAttribute(a,g),f.push(pa.x,pa.y,pa.z),f.push(ma.x,ma.y,ma.z)}this.setAttribute("position",new Mt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class ki extends oo{constructor(t){super(t),this.uuid=Cn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new oo().fromJSON(i))}return this}}const Qy={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=Tp(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,d,f;if(n&&(s=iM(r,t,s,e)),r.length>80*e){a=c=r[0],l=h=r[1];for(let p=e;p<i;p+=e)u=r[p],d=r[p+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return ao(s,o,e,a,l,f,0),o}};function Tp(r,t,e,n,i){let s,o;if(i===pM(r,t,e,n)>0)for(s=t;s<e;s+=n)o=Rd(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=Rd(s,r[s],r[s+1],o);return o&&Vl(o,o.next)&&(co(o),o=o.next),o}function Es(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Vl(e,e.next)||Ee(e.prev,e,e.next)===0)){if(co(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ao(r,t,e,n,i,s,o){if(!r)return;!o&&s&&lM(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?tM(r,n,i,s):jy(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(c.i/e|0),co(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=eM(Es(r),t,e),ao(r,t,e,n,i,s,2)):o===2&&nM(r,t,e,n,i,s):ao(Es(r),t,e,n,i,s,1);break}}}function jy(r){const t=r.prev,e=r,n=r.next;if(Ee(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<s?i<o?i:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,d=i>s?i>o?i:o:s>o?s:o,f=a>l?a>c?a:c:l>c?l:c;let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&er(i,a,s,l,o,c,p.x,p.y)&&Ee(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function tM(r,t,e,n){const i=r.prev,s=r,o=r.next;if(Ee(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,h=i.y,u=s.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,p=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,m=ih(f,p,t,e,n),v=ih(_,g,t,e,n);let x=r.prevZ,y=r.nextZ;for(;x&&x.z>=m&&y&&y.z<=v;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&er(a,h,l,u,c,d,x.x,x.y)&&Ee(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&er(a,h,l,u,c,d,y.x,y.y)&&Ee(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&er(a,h,l,u,c,d,x.x,x.y)&&Ee(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=v;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&er(a,h,l,u,c,d,y.x,y.y)&&Ee(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function eM(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!Vl(i,s)&&Ep(i,n,n.next,s)&&lo(i,s)&&lo(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),co(n),co(n.next),n=r=s),n=n.next}while(n!==r);return Es(n)}function nM(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&uM(o,a)){let l=Ap(o,a);o=Es(o,o.next),l=Es(l,l.next),ao(o,t,e,n,i,s,0),ao(l,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function iM(r,t,e,n){const i=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=Tp(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(hM(c));for(i.sort(sM),s=0;s<i.length;s++)e=rM(i[s],e);return e}function sM(r,t){return r.x-t.x}function rM(r,t){const e=oM(r,t);if(!e)return t;const n=Ap(e,r);return Es(n,n.next),Es(e,e.next)}function oM(r,t){let e=t,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===s))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;e=i;do s>=e.x&&e.x>=l&&s!==e.x&&er(o<c?s:n,o,l,c,o<c?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),lo(e,r)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&aM(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function aM(r,t){return Ee(r.prev,r,t.prev)<0&&Ee(t.next,r,r.next)<0}function lM(r,t,e,n){let i=r;do i.z===0&&(i.z=ih(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,cM(i)}function cM(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function ih(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function hM(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function er(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function uM(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!dM(r,t)&&(lo(r,t)&&lo(t,r)&&fM(r,t)&&(Ee(r.prev,r,t.prev)||Ee(r,t.prev,t))||Vl(r,t)&&Ee(r.prev,r,r.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Vl(r,t){return r.x===t.x&&r.y===t.y}function Ep(r,t,e,n){const i=xa(Ee(r,t,e)),s=xa(Ee(r,t,n)),o=xa(Ee(e,n,r)),a=xa(Ee(e,n,t));return!!(i!==s&&o!==a||i===0&&_a(r,e,t)||s===0&&_a(r,n,t)||o===0&&_a(e,r,n)||a===0&&_a(e,t,n))}function _a(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function xa(r){return r>0?1:r<0?-1:0}function dM(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Ep(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function lo(r,t){return Ee(r.prev,r,r.next)<0?Ee(r,t,r.next)>=0&&Ee(r,r.prev,t)>=0:Ee(r,t,r.prev)<0||Ee(r,r.next,t)<0}function fM(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Ap(r,t){const e=new sh(r.i,r.x,r.y),n=new sh(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Rd(r,t,e,n){const i=new sh(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function co(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function sh(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function pM(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class ei{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return ei.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];Pd(t),Id(n,t);let o=t.length;e.forEach(Pd);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,Id(n,e[l]);const a=Qy.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Pd(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Id(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class To extends Wt{constructor(t=new ki([new q(.5,.5),new q(-.5,.5),new q(-.5,-.5),new q(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Mt(i,3)),this.setAttribute("uv",new Mt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:mM;let x,y=!1,P,E,C,R;m&&(x=m.getSpacedPoints(h),y=!0,d=!1,P=m.computeFrenetFrames(h,!1),E=new T,C=new T,R=new T),d||(g=0,f=0,p=0,_=0);const b=a.extractPoints(c);let M=b.shape;const L=b.holes;if(!ei.isClockWise(M)){M=M.reverse();for(let Q=0,rt=L.length;Q<rt;Q++){const I=L[Q];ei.isClockWise(I)&&(L[Q]=I.reverse())}}const O=ei.triangulateShape(M,L),V=M;for(let Q=0,rt=L.length;Q<rt;Q++){const I=L[Q];M=M.concat(I)}function J(Q,rt,I){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(rt,I)}const H=M.length,st=O.length;function G(Q,rt,I){let Lt,et,St;const ct=Q.x-rt.x,Ot=Q.y-rt.y,vt=I.x-Q.x,A=I.y-Q.y,S=ct*ct+Ot*Ot,F=ct*A-Ot*vt;if(Math.abs(F)>Number.EPSILON){const Y=Math.sqrt(S),j=Math.sqrt(vt*vt+A*A),Z=rt.x-Ot/Y,Ct=rt.y+ct/Y,dt=I.x-A/j,yt=I.y+vt/j,Qt=((dt-Z)*A-(yt-Ct)*vt)/(ct*A-Ot*vt);Lt=Z+ct*Qt-Q.x,et=Ct+Ot*Qt-Q.y;const nt=Lt*Lt+et*et;if(nt<=2)return new q(Lt,et);St=Math.sqrt(nt/2)}else{let Y=!1;ct>Number.EPSILON?vt>Number.EPSILON&&(Y=!0):ct<-Number.EPSILON?vt<-Number.EPSILON&&(Y=!0):Math.sign(Ot)===Math.sign(A)&&(Y=!0),Y?(Lt=-Ot,et=ct,St=Math.sqrt(S)):(Lt=ct,et=Ot,St=Math.sqrt(S/2))}return new q(Lt/St,et/St)}const ht=[];for(let Q=0,rt=V.length,I=rt-1,Lt=Q+1;Q<rt;Q++,I++,Lt++)I===rt&&(I=0),Lt===rt&&(Lt=0),ht[Q]=G(V[Q],V[I],V[Lt]);const xt=[];let Tt,qt=ht.concat();for(let Q=0,rt=L.length;Q<rt;Q++){const I=L[Q];Tt=[];for(let Lt=0,et=I.length,St=et-1,ct=Lt+1;Lt<et;Lt++,St++,ct++)St===et&&(St=0),ct===et&&(ct=0),Tt[Lt]=G(I[Lt],I[St],I[ct]);xt.push(Tt),qt=qt.concat(Tt)}for(let Q=0;Q<g;Q++){const rt=Q/g,I=f*Math.cos(rt*Math.PI/2),Lt=p*Math.sin(rt*Math.PI/2)+_;for(let et=0,St=V.length;et<St;et++){const ct=J(V[et],ht[et],Lt);lt(ct.x,ct.y,-I)}for(let et=0,St=L.length;et<St;et++){const ct=L[et];Tt=xt[et];for(let Ot=0,vt=ct.length;Ot<vt;Ot++){const A=J(ct[Ot],Tt[Ot],Lt);lt(A.x,A.y,-I)}}}const ae=p+_;for(let Q=0;Q<H;Q++){const rt=d?J(M[Q],qt[Q],ae):M[Q];y?(C.copy(P.normals[0]).multiplyScalar(rt.x),E.copy(P.binormals[0]).multiplyScalar(rt.y),R.copy(x[0]).add(C).add(E),lt(R.x,R.y,R.z)):lt(rt.x,rt.y,0)}for(let Q=1;Q<=h;Q++)for(let rt=0;rt<H;rt++){const I=d?J(M[rt],qt[rt],ae):M[rt];y?(C.copy(P.normals[Q]).multiplyScalar(I.x),E.copy(P.binormals[Q]).multiplyScalar(I.y),R.copy(x[Q]).add(C).add(E),lt(R.x,R.y,R.z)):lt(I.x,I.y,u/h*Q)}for(let Q=g-1;Q>=0;Q--){const rt=Q/g,I=f*Math.cos(rt*Math.PI/2),Lt=p*Math.sin(rt*Math.PI/2)+_;for(let et=0,St=V.length;et<St;et++){const ct=J(V[et],ht[et],Lt);lt(ct.x,ct.y,u+I)}for(let et=0,St=L.length;et<St;et++){const ct=L[et];Tt=xt[et];for(let Ot=0,vt=ct.length;Ot<vt;Ot++){const A=J(ct[Ot],Tt[Ot],Lt);y?lt(A.x,A.y+x[h-1].y,x[h-1].x+I):lt(A.x,A.y,u+I)}}}$(),ot();function $(){const Q=i.length/3;if(d){let rt=0,I=H*rt;for(let Lt=0;Lt<st;Lt++){const et=O[Lt];Nt(et[2]+I,et[1]+I,et[0]+I)}rt=h+g*2,I=H*rt;for(let Lt=0;Lt<st;Lt++){const et=O[Lt];Nt(et[0]+I,et[1]+I,et[2]+I)}}else{for(let rt=0;rt<st;rt++){const I=O[rt];Nt(I[2],I[1],I[0])}for(let rt=0;rt<st;rt++){const I=O[rt];Nt(I[0]+H*h,I[1]+H*h,I[2]+H*h)}}n.addGroup(Q,i.length/3-Q,0)}function ot(){const Q=i.length/3;let rt=0;At(V,rt),rt+=V.length;for(let I=0,Lt=L.length;I<Lt;I++){const et=L[I];At(et,rt),rt+=et.length}n.addGroup(Q,i.length/3-Q,1)}function At(Q,rt){let I=Q.length;for(;--I>=0;){const Lt=I;let et=I-1;et<0&&(et=Q.length-1);for(let St=0,ct=h+g*2;St<ct;St++){const Ot=H*St,vt=H*(St+1),A=rt+Lt+Ot,S=rt+et+Ot,F=rt+et+vt,Y=rt+Lt+vt;Vt(A,S,F,Y)}}}function lt(Q,rt,I){l.push(Q),l.push(rt),l.push(I)}function Nt(Q,rt,I){zt(Q),zt(rt),zt(I);const Lt=i.length/3,et=v.generateTopUV(n,i,Lt-3,Lt-2,Lt-1);ee(et[0]),ee(et[1]),ee(et[2])}function Vt(Q,rt,I,Lt){zt(Q),zt(rt),zt(Lt),zt(rt),zt(I),zt(Lt);const et=i.length/3,St=v.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);ee(St[0]),ee(St[1]),ee(St[3]),ee(St[1]),ee(St[2]),ee(St[3])}function zt(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function ee(Q){s.push(Q.x),s.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return gM(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ml[i.type]().fromJSON(i)),new To(n,t.options)}}const mM={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new q(s,o),new q(a,l),new q(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],p=t[i*3+2],_=t[s*3],g=t[s*3+1],m=t[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new q(o,1-l),new q(c,1-u),new q(d,1-p),new q(_,1-m)]:[new q(a,1-l),new q(h,1-u),new q(f,1-p),new q(g,1-m)]}};function gM(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Rs extends Xi{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Rs(t.radius,t.detail)}}class Eo extends Xi{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Eo(t.radius,t.detail)}}class Hl extends Wt{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new T,p=new q;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=s+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const v=m+g,x=v,y=v+n+1,P=v+n+2,E=v+1;a.push(x,y,E),a.push(y,P,E)}}this.setIndex(a),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Gl extends Wt{constructor(t=new ki([new q(0,.5),new q(-.5,-.5),new q(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Mt(i,3)),this.setAttribute("normal",new Mt(s,3)),this.setAttribute("uv",new Mt(o,2));function c(h){const u=i.length/3,d=h.extractPoints(e);let f=d.shape;const p=d.holes;ei.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];ei.isClockWise(v)===!0&&(p[g]=v.reverse())}const _=ei.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){const v=f[g];i.push(v.x,v.y,0),s.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){const v=_[g],x=v[0]+u,y=v[1]+u,P=v[2]+u;n.push(x,y,P),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return _M(e,t)}static fromJSON(t,e){const n=[];for(let i=0,s=t.shapes.length;i<s;i++){const o=e[t.shapes[i]];n.push(o)}return new Gl(n,t.curveSegments)}}function _M(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){const i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}class ii extends Wt{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new T,d=new T,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],x=m/n;let y=0;m===0&&o===0?y=.5/e:m===n&&l===Math.PI&&(y=-.5/e);for(let P=0;P<=e;P++){const E=P/e;u.x=-t*Math.cos(i+E*s)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+E*s)*Math.sin(o+x*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(E+y,1-x),v.push(c++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){const x=h[m][v+1],y=h[m][v],P=h[m+1][v],E=h[m+1][v+1];(m!==0||o>0)&&f.push(x,y,E),(m!==n-1||l<Math.PI)&&f.push(y,P,E)}this.setIndex(f),this.setAttribute("position",new Mt(p,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ii(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Wl extends Xi{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Wl(t.radius,t.detail)}}class wi extends Wt{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new T,u=new T,d=new T;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const _=p/i*s,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const _=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,v=(i+1)*f+p;o.push(_,g,v),o.push(g,m,v)}this.setIndex(o),this.setAttribute("position",new Mt(a,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Xl extends Wt{constructor(t=1,e=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],h=[],u=new T,d=new T,f=new T,p=new T,_=new T,g=new T,m=new T;for(let x=0;x<=n;++x){const y=x/n*s*Math.PI*2;v(y,s,o,t,f),v(y+.01,s,o,t,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let P=0;P<=i;++P){const E=P/i*Math.PI*2,C=-e*Math.cos(E),R=e*Math.sin(E);u.x=f.x+(C*m.x+R*_.x),u.y=f.y+(C*m.y+R*_.y),u.z=f.z+(C*m.z+R*_.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(x/n),h.push(P/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){const P=(i+1)*(x-1)+(y-1),E=(i+1)*x+(y-1),C=(i+1)*x+y,R=(i+1)*(x-1)+y;a.push(P,E,R),a.push(E,C,R)}this.setIndex(a),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(h,2));function v(x,y,P,E,C){const R=Math.cos(x),b=Math.sin(x),M=P/y*x,L=Math.cos(M);C.x=E*(2+L)*.5*R,C.y=E*(2+L)*b*.5,C.z=E*Math.sin(M)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xl(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class Ao extends Wt{constructor(t=new Bl(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new T,l=new T,c=new q;let h=new T;const u=[],d=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Mt(u,3)),this.setAttribute("normal",new Mt(d,3)),this.setAttribute("uv",new Mt(f,2));function _(){for(let x=0;x<e;x++)g(x);g(s===!1?e:0),v(),m()}function g(x){h=t.getPointAt(x/e,h);const y=o.normals[x],P=o.binormals[x];for(let E=0;E<=i;E++){const C=E/i*Math.PI*2,R=Math.sin(C),b=-Math.cos(C);l.x=b*y.x+R*P.x,l.y=b*y.y+R*P.y,l.z=b*y.z+R*P.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function m(){for(let x=1;x<=e;x++)for(let y=1;y<=i;y++){const P=(i+1)*(x-1)+(y-1),E=(i+1)*x+(y-1),C=(i+1)*x+y,R=(i+1)*(x-1)+y;p.push(P,E,R),p.push(E,C,R)}}function v(){for(let x=0;x<=e;x++)for(let y=0;y<=i;y++)c.x=x/e,c.y=y/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ao(new ml[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Cp extends Wt{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,i=new T,s=new T;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],d=u.start,f=u.count;for(let p=d,_=d+f;p<_;p+=3)for(let g=0;g<3;g++){const m=a.getX(p+g),v=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),s.fromBufferAttribute(o,v),Ld(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;i.fromBufferAttribute(o,h),s.fromBufferAttribute(o,u),Ld(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new Mt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Ld(r,t,e){const n=`${r.x},${r.y},${r.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${r.x},${r.y},${r.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}var Dd=Object.freeze({__proto__:null,BoxGeometry:Wi,CapsuleGeometry:zl,CircleGeometry:xr,ConeGeometry:kl,CylinderGeometry:Xn,DodecahedronGeometry:vr,EdgesGeometry:wp,ExtrudeGeometry:To,IcosahedronGeometry:Rs,LatheGeometry:wo,OctahedronGeometry:Eo,PlaneGeometry:Ye,PolyhedronGeometry:Xi,RingGeometry:Hl,ShapeGeometry:Gl,SphereGeometry:ii,TetrahedronGeometry:Wl,TorusGeometry:wi,TorusKnotGeometry:Xl,TubeGeometry:Ao,WireframeGeometry:Cp});class Rp extends rn{static get type(){return"ShadowMaterial"}constructor(t){super(),this.isShadowMaterial=!0,this.color=new it(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Xh extends qe{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class An extends rn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gi,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Pp extends An{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new q(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Re(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new it(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new it(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new it(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Ip extends rn{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new it(16777215),this.specular=new it(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gi,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=_o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Lp extends rn{static get type(){return"MeshToonMaterial"}constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new it(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gi,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Dp extends rn{static get type(){return"MeshNormalMaterial"}constructor(t){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gi,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class cr extends rn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gi,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=_o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Up extends rn{static get type(){return"MeshMatcapMaterial"}constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new it(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gi,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Np extends pn{static get type(){return"LineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}function ms(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Fp(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Op(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function rh(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let l=0;l!==t;++l)i[o++]=r[a+l]}return i}function qh(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push.apply(e,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=r[i++];while(s!==void 0)}function xM(r,t,e,n,i=30){const s=r.clone();s.name=t;const o=[];for(let l=0;l<s.tracks.length;++l){const c=s.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){const p=c.times[f]*i;if(!(p<e||p>=n)){u.push(c.times[f]);for(let _=0;_<h;++_)d.push(c.values[f*h+_])}}u.length!==0&&(c.times=ms(u,c.times.constructor),c.values=ms(d,c.values.constructor),o.push(c))}s.tracks=o;let a=1/0;for(let l=0;l<s.tracks.length;++l)a>s.tracks[l].times[0]&&(a=s.tracks[l].times[0]);for(let l=0;l<s.tracks.length;++l)s.tracks[l].shift(-1*a);return s.resetDuration(),s}function vM(r,t=0,e=r,n=30){n<=0&&(n=30);const i=e.tracks.length,s=t/n;for(let o=0;o<i;++o){const a=e.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=r.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0;const u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0;const f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const p=a.times.length-1;let _;if(s<=a.times[0]){const m=h,v=u-h;_=a.values.slice(m,v)}else if(s>=a.times[p]){const m=p*u+h,v=m+u-h;_=a.values.slice(m,v)}else{const m=a.createInterpolant(),v=h,x=u-h;m.evaluate(s),_=m.resultBuffer.slice(v,x)}l==="quaternion"&&new nn().fromArray(_).normalize().conjugate().toArray(_);const g=c.times.length;for(let m=0;m<g;++m){const v=m*f+d;if(l==="quaternion")nn.multiplyQuaternionsFlat(c.values,v,_,0,c.values,v);else{const x=f-d*2;for(let y=0;y<x;++y)c.values[v+y]-=_[y]}}}return r.blendMode=Eh,r}const yM={convertArray:ms,isTypedArray:Fp,getKeyframeOrder:Op,sortedArray:rh,flattenJSON:qh,subclip:xM,makeClipAdditive:vM};class Co{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Bp extends Co{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ds,endingEnd:ds}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case fs:s=t,a=2*e-n;break;case no:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case fs:o=t,l=2*n-e;break;case no:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,v=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,x=(-1-f)*g+(1.5+f)*_+.5*p,y=f*g-f*_;for(let P=0;P!==a;++P)s[P]=m*o[h+P]+v*o[c+P]+x*o[l+P]+y*o[u+P];return s}}class Yh extends Co{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class zp extends Co{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Yn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ms(e,this.TimeBufferType),this.values=ms(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ms(t.times,Array),values:ms(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new zp(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Yh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Bp(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case eo:e=this.InterpolantFactoryMethodDiscrete;break;case dl:e=this.InterpolantFactoryMethodLinear;break;case Ca:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return eo;case this.InterpolantFactoryMethodLinear:return dl;case this.InterpolantFactoryMethodSmooth:return Ca}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Fp(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ca,s=t.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const _=e[u+p];if(_!==e[d+p]||_!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=dl;class Ps extends Yn{constructor(t,e,n){super(t,e,n)}}Ps.prototype.ValueTypeName="bool";Ps.prototype.ValueBufferType=Array;Ps.prototype.DefaultInterpolation=eo;Ps.prototype.InterpolantFactoryMethodLinear=void 0;Ps.prototype.InterpolantFactoryMethodSmooth=void 0;class Zh extends Yn{}Zh.prototype.ValueTypeName="color";class ho extends Yn{}ho.prototype.ValueTypeName="number";class kp extends Co{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e);let c=t*a;for(let h=c+a;c!==h;c+=4)nn.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Ro extends Yn{InterpolantFactoryMethodLinear(t){return new kp(this.times,this.values,this.getValueSize(),t)}}Ro.prototype.ValueTypeName="quaternion";Ro.prototype.InterpolantFactoryMethodSmooth=void 0;class Is extends Yn{constructor(t,e,n){super(t,e,n)}}Is.prototype.ValueTypeName="string";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=eo;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;class uo extends Yn{}uo.prototype.ValueTypeName="vector";class fo{constructor(t="",e=-1,n=[],i=El){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Cn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(SM(n[o]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(Yn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=Op(l);l=rh(l,1,h),c=rh(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ho(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,_){if(f.length!==0){const g=[],m=[];qh(f,g,m,p),g.length!==0&&_.push(new u(d,g,m))}},i=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let _=0;_<d[p].morphTargets.length;_++)f[d[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let v=0;v!==d[p].morphTargets.length;++v){const x=d[p];g.push(x.time),m.push(x.morphTarget===_?1:0)}i.push(new ho(".morphTargetInfluence["+_+"]",g,m))}l=f.length*o}else{const f=".bones["+e[u].name+"]";n(uo,f+".position",d,"pos",i),n(Ro,f+".quaternion",d,"rot",i),n(uo,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function MM(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ho;case"vector":case"vector2":case"vector3":case"vector4":return uo;case"color":return Zh;case"quaternion":return Ro;case"bool":case"boolean":return Ps;case"string":return Is}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function SM(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=MM(r.type);if(r.times===void 0){const e=[],n=[];qh(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const _i={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class $h{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const Vp=new $h;class Sn{constructor(t){this.manager=t!==void 0?t:Vp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Sn.DEFAULT_MATERIAL_NAME="__DEFAULT";const pi={};class bM extends Error{constructor(t,e){super(t),this.response=e}}class Ti extends Sn{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=_i.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(pi[t]!==void 0){pi[t].push({onLoad:e,onProgress:n,onError:i});return}pi[t]=[],pi[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=pi[t],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){u.read().then(({done:x,value:y})=>{if(x)m.close();else{_+=y.byteLength;const P=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let E=0,C=h.length;E<C;E++){const R=h[E];R.onProgress&&R.onProgress(P)}m.enqueue(y),v()}},x=>{m.error(x)})}}});return new Response(g)}else throw new bM(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{_i.add(t,c);const h=pi[t];delete pi[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=pi[t];if(h===void 0)throw this.manager.itemError(t),c;delete pi[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class wM extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Ti(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e=[];for(let n=0;n<t.length;n++){const i=fo.parse(t[n]);e.push(i)}return e}}class TM extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=this,o=[],a=new Nl,l=new Ti(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(s.withCredentials);let c=0;function h(u){l.load(t[u],function(d){const f=s.parse(d,!0);o[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=Fe),a.image=o,a.format=f.format,a.needsUpdate=!0,e&&e(a))},n,i)}if(Array.isArray(t))for(let u=0,d=t.length;u<d;++u)h(u);else l.load(t,function(u){const d=s.parse(u,!0);if(d.isCubemap){const f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)o[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+_]),o[p].format=d.format,o[p].width=d.width,o[p].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=Fe),a.format=d.format,a.needsUpdate=!0,e&&e(a)},n,i);return a}}class po extends Sn{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=_i.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=ro("img");function l(){h(),_i.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class EM extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=new yo;s.colorSpace=We;const o=new po(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(t[c],function(h){s.images[c]=h,a++,a===6&&(s.needsUpdate=!0,e&&e(s))},void 0,i)}for(let c=0;c<t.length;++c)l(c);return s}}class AM extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new ti,a=new Ti(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(t,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:vn,o.wrapT=c.wrapT!==void 0?c.wrapT:vn,o.magFilter=c.magFilter!==void 0?c.magFilter:Fe,o.minFilter=c.minFilter!==void 0?c.minFilter:Fe,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Hn),c.mipmapCount===1&&(o.minFilter=Fe),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,e&&e(o,c)},n,i),o}}class Hp extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=new Pe,o=new po(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class qi extends se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new it(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Jh extends qi{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new it(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Nc=new Ft,Ud=new T,Nd=new T;class Kh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new q(512,512),this.map=null,this.mapPass=null,this.matrix=new Ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mo,this._frameExtents=new q(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ud.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ud),Nd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nd),e.updateMatrixWorld(),Nc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Nc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class CM extends Kh{constructor(){super(new Xe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=rr*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Gp extends qi{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.target=new se,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new CM}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Fd=new Ft,Ur=new T,Fc=new T;class RM extends Kh{constructor(){super(new Xe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new q(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ur.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ur),Fc.copy(n.position),Fc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Fc),n.updateMatrixWorld(),i.makeTranslation(-Ur.x,-Ur.y,-Ur.z),Fd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fd)}}class ql extends qi{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new RM}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class PM extends Kh{constructor(){super(new So(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qh extends qi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.target=new se,this.shadow=new PM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Wp extends qi{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Xp extends qi{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}class qp{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new T)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const n=t.x,i=t.y,s=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.282095),e.addScaledVector(o[1],.488603*i),e.addScaledVector(o[2],.488603*s),e.addScaledVector(o[3],.488603*n),e.addScaledVector(o[4],1.092548*(n*i)),e.addScaledVector(o[5],1.092548*(i*s)),e.addScaledVector(o[6],.315392*(3*s*s-1)),e.addScaledVector(o[7],1.092548*(n*s)),e.addScaledVector(o[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){const n=t.x,i=t.y,s=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.886227),e.addScaledVector(o[1],2*.511664*i),e.addScaledVector(o[2],2*.511664*s),e.addScaledVector(o[3],2*.511664*n),e.addScaledVector(o[4],2*.429043*n*i),e.addScaledVector(o[5],2*.429043*i*s),e.addScaledVector(o[6],.743125*s*s-.247708),e.addScaledVector(o[7],2*.429043*n*s),e.addScaledVector(o[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){const n=t.x,i=t.y,s=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*s,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*s,e[6]=.315392*(3*s*s-1),e[7]=1.092548*n*s,e[8]=.546274*(n*n-i*i)}}class Yp extends qi{constructor(t=new qp,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}class Yl extends Sn{constructor(t){super(t),this.textures={}}load(t,e,n,i){const s=this,o=new Ti(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e=this.textures;function n(s){return e[s]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",s),e[s]}const i=this.createMaterialFromType(t.type);if(t.uuid!==void 0&&(i.uuid=t.uuid),t.name!==void 0&&(i.name=t.name),t.color!==void 0&&i.color!==void 0&&i.color.setHex(t.color),t.roughness!==void 0&&(i.roughness=t.roughness),t.metalness!==void 0&&(i.metalness=t.metalness),t.sheen!==void 0&&(i.sheen=t.sheen),t.sheenColor!==void 0&&(i.sheenColor=new it().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(i.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(t.emissive),t.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(t.specular),t.specularIntensity!==void 0&&(i.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(i.shininess=t.shininess),t.clearcoat!==void 0&&(i.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(i.dispersion=t.dispersion),t.iridescence!==void 0&&(i.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(i.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(i.transmission=t.transmission),t.thickness!==void 0&&(i.thickness=t.thickness),t.attenuationDistance!==void 0&&(i.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(i.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(i.fog=t.fog),t.flatShading!==void 0&&(i.flatShading=t.flatShading),t.blending!==void 0&&(i.blending=t.blending),t.combine!==void 0&&(i.combine=t.combine),t.side!==void 0&&(i.side=t.side),t.shadowSide!==void 0&&(i.shadowSide=t.shadowSide),t.opacity!==void 0&&(i.opacity=t.opacity),t.transparent!==void 0&&(i.transparent=t.transparent),t.alphaTest!==void 0&&(i.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(i.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(i.depthFunc=t.depthFunc),t.depthTest!==void 0&&(i.depthTest=t.depthTest),t.depthWrite!==void 0&&(i.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(i.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(i.blendSrc=t.blendSrc),t.blendDst!==void 0&&(i.blendDst=t.blendDst),t.blendEquation!==void 0&&(i.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(i.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(i.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(i.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(i.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(i.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(i.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(i.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(i.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(i.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(i.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(i.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(i.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(i.rotation=t.rotation),t.linewidth!==void 0&&(i.linewidth=t.linewidth),t.dashSize!==void 0&&(i.dashSize=t.dashSize),t.gapSize!==void 0&&(i.gapSize=t.gapSize),t.scale!==void 0&&(i.scale=t.scale),t.polygonOffset!==void 0&&(i.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(i.dithering=t.dithering),t.alphaToCoverage!==void 0&&(i.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(i.forceSinglePass=t.forceSinglePass),t.visible!==void 0&&(i.visible=t.visible),t.toneMapped!==void 0&&(i.toneMapped=t.toneMapped),t.userData!==void 0&&(i.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?i.vertexColors=t.vertexColors>0:i.vertexColors=t.vertexColors),t.uniforms!==void 0)for(const s in t.uniforms){const o=t.uniforms[s];switch(i.uniforms[s]={},o.type){case"t":i.uniforms[s].value=n(o.value);break;case"c":i.uniforms[s].value=new it().setHex(o.value);break;case"v2":i.uniforms[s].value=new q().fromArray(o.value);break;case"v3":i.uniforms[s].value=new T().fromArray(o.value);break;case"v4":i.uniforms[s].value=new ie().fromArray(o.value);break;case"m3":i.uniforms[s].value=new Xt().fromArray(o.value);break;case"m4":i.uniforms[s].value=new Ft().fromArray(o.value);break;default:i.uniforms[s].value=o.value}}if(t.defines!==void 0&&(i.defines=t.defines),t.vertexShader!==void 0&&(i.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(i.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(i.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)i.extensions[s]=t.extensions[s];if(t.lights!==void 0&&(i.lights=t.lights),t.clipping!==void 0&&(i.clipping=t.clipping),t.size!==void 0&&(i.size=t.size),t.sizeAttenuation!==void 0&&(i.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(i.map=n(t.map)),t.matcap!==void 0&&(i.matcap=n(t.matcap)),t.alphaMap!==void 0&&(i.alphaMap=n(t.alphaMap)),t.bumpMap!==void 0&&(i.bumpMap=n(t.bumpMap)),t.bumpScale!==void 0&&(i.bumpScale=t.bumpScale),t.normalMap!==void 0&&(i.normalMap=n(t.normalMap)),t.normalMapType!==void 0&&(i.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new q().fromArray(s)}return t.displacementMap!==void 0&&(i.displacementMap=n(t.displacementMap)),t.displacementScale!==void 0&&(i.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(i.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(i.roughnessMap=n(t.roughnessMap)),t.metalnessMap!==void 0&&(i.metalnessMap=n(t.metalnessMap)),t.emissiveMap!==void 0&&(i.emissiveMap=n(t.emissiveMap)),t.emissiveIntensity!==void 0&&(i.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(i.specularMap=n(t.specularMap)),t.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(t.specularIntensityMap)),t.specularColorMap!==void 0&&(i.specularColorMap=n(t.specularColorMap)),t.envMap!==void 0&&(i.envMap=n(t.envMap)),t.envMapRotation!==void 0&&i.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(i.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(i.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(i.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(i.lightMap=n(t.lightMap)),t.lightMapIntensity!==void 0&&(i.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(i.aoMap=n(t.aoMap)),t.aoMapIntensity!==void 0&&(i.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(i.gradientMap=n(t.gradientMap)),t.clearcoatMap!==void 0&&(i.clearcoatMap=n(t.clearcoatMap)),t.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(t.clearcoatRoughnessMap)),t.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(t.clearcoatNormalMap)),t.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new q().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(i.iridescenceMap=n(t.iridescenceMap)),t.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(t.iridescenceThicknessMap)),t.transmissionMap!==void 0&&(i.transmissionMap=n(t.transmissionMap)),t.thicknessMap!==void 0&&(i.thicknessMap=n(t.thicknessMap)),t.anisotropyMap!==void 0&&(i.anisotropyMap=n(t.anisotropyMap)),t.sheenColorMap!==void 0&&(i.sheenColorMap=n(t.sheenColorMap)),t.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(t.sheenRoughnessMap)),i}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return Yl.createMaterialFromType(t)}static createMaterialFromType(t){const e={ShadowMaterial:Rp,SpriteMaterial:Oh,RawShaderMaterial:Xh,ShaderMaterial:qe,PointsMaterial:Ul,MeshPhysicalMaterial:Pp,MeshStandardMaterial:An,MeshPhongMaterial:Ip,MeshToonMaterial:Lp,MeshNormalMaterial:Dp,MeshLambertMaterial:cr,MeshDepthMaterial:Uh,MeshDistanceMaterial:Nh,MeshBasicMaterial:Un,MeshMatcapMaterial:Up,LineDashedMaterial:Np,LineBasicMaterial:pn,Material:rn};return new e[t]}}class oh{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Zp extends Wt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class $p extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Ti(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(l){i?i(l):console.error(l),s.manager.itemError(t)}},n,i)}parse(t){const e={},n={};function i(f,p){if(e[p]!==void 0)return e[p];const g=f.interleavedBuffers[p],m=s(f,g.buffer),v=js(g.type,m),x=new Ll(v,g.stride);return x.uuid=g.uuid,e[p]=x,x}function s(f,p){if(n[p]!==void 0)return n[p];const g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const o=t.isInstancedBufferGeometry?new Zp:new Wt,a=t.data.index;if(a!==void 0){const f=js(a.type,a.array);o.setIndex(new pe(f,1))}const l=t.data.attributes;for(const f in l){const p=l[f];let _;if(p.isInterleavedBufferAttribute){const g=i(t.data,p.data);_=new Ts(g,p.itemSize,p.offset,p.normalized)}else{const g=js(p.type,p.array),m=p.isInstancedBufferAttribute?lr:pe;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),o.setAttribute(f,_)}const c=t.data.morphAttributes;if(c)for(const f in c){const p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){const v=p[g];let x;if(v.isInterleavedBufferAttribute){const y=i(t.data,v.data);x=new Ts(y,v.itemSize,v.offset,v.normalized)}else{const y=js(v.type,v.array);x=new pe(y,v.itemSize,v.normalized)}v.name!==void 0&&(x.name=v.name),_.push(x)}o.morphAttributes[f]=_}t.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const u=t.data.groups||t.data.drawcalls||t.data.offsets;if(u!==void 0)for(let f=0,p=u.length;f!==p;++f){const _=u[f];o.addGroup(_.start,_.count,_.materialIndex)}const d=t.data.boundingSphere;if(d!==void 0){const f=new T;d.center!==void 0&&f.fromArray(d.center),o.boundingSphere=new sn(f,d.radius)}return t.name&&(o.name=t.name),t.userData&&(o.userData=t.userData),o}}class IM extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=this,o=this.path===""?oh.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||o;const a=new Ti(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+t+".",u.message);return}const h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+t)),console.error("THREE.ObjectLoader: Can't load "+t);return}s.parse(c,e)},n,i)}async loadAsync(t,e){const n=this,i=this.path===""?oh.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;const s=new Ti(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const o=await s.loadAsync(t,e),a=JSON.parse(o),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(a)}parse(t,e){const n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,i),o=this.parseImages(t.images,function(){e!==void 0&&e(c)}),a=this.parseTextures(t.textures,o),l=this.parseMaterials(t.materials,a),c=this.parseObject(t.object,s,l,a,n),h=this.parseSkeletons(t.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),e!==void 0){let u=!1;for(const d in o)if(o[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&e(c)}return c}async parseAsync(t){const e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),s=await this.parseImagesAsync(t.images),o=this.parseTextures(t.textures,s),a=this.parseMaterials(t.materials,o),l=this.parseObject(t.object,i,a,o,e),c=this.parseSkeletons(t.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(t){const e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){const s=new ki().fromJSON(t[n]);e[s.uuid]=s}return e}parseSkeletons(t,e){const n={},i={};if(e.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),t!==void 0)for(let s=0,o=t.length;s<o;s++){const a=new Dl().fromJSON(t[s],i);n[a.uuid]=a}return n}parseGeometries(t,e){const n={};if(t!==void 0){const i=new $p;for(let s=0,o=t.length;s<o;s++){let a;const l=t[s];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in Dd?a=Dd[l.type].fromJSON(l,e):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${l.type}"`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(t,e){const n={},i={};if(t!==void 0){const s=new Yl;s.setTextures(e);for(let o=0,a=t.length;o<a;o++){const l=t[o];n[l.uuid]===void 0&&(n[l.uuid]=s.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(t){const e={};if(t!==void 0)for(let n=0;n<t.length;n++){const i=t[n],s=fo.parse(i);e[s.uuid]=s}return e}parseImages(t,e){const n=this,i={};let s;function o(l){return n.manager.itemStart(l),s.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:js(l.type,l.data),width:l.width,height:l.height}:null}if(t!==void 0&&t.length>0){const l=new $h(e);s=new po(l),s.setCrossOrigin(this.crossOrigin);for(let c=0,h=t.length;c<h;c++){const u=t[c],d=u.url;if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new ti(m.data,m.width,m.height)))}i[u.uuid]=new ps(f)}else{const f=a(u.url);i[u.uuid]=new ps(f)}}}return i}async parseImagesAsync(t){const e=this,n={};let i;async function s(o){if(typeof o=="string"){const a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:e.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:js(o.type,o.data),width:o.width,height:o.height}:null}if(t!==void 0&&t.length>0){i=new po(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=t.length;o<a;o++){const l=t[o],c=l.url;if(Array.isArray(c)){const h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=await s(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new ti(p.data,p.width,p.height)))}n[l.uuid]=new ps(h)}else{const h=await s(l.url);n[l.uuid]=new ps(h)}}}return n}parseTextures(t,e){function n(s,o){return typeof s=="number"?s:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",s),o[s])}const i={};if(t!==void 0)for(let s=0,o=t.length;s<o;s++){const a=t[s];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),e[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);const l=e[a.image],c=l.data;let h;Array.isArray(c)?(h=new yo,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new ti:h=new Pe,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,LM)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],Od),h.wrapT=n(a.wrap[1],Od)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,Bd)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,Bd)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(t,e,n,i,s){let o;function a(d){return e[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),e[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){const f=[];for(let p=0,_=d.length;p<_;p++){const g=d[p];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(t.type){case"Scene":o=new Fh,t.background!==void 0&&(Number.isInteger(t.background)?o.background=new it(t.background):o.background=c(t.background)),t.environment!==void 0&&(o.environment=c(t.environment)),t.fog!==void 0&&(t.fog.type==="Fog"?o.fog=new Il(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(o.fog=new bo(t.fog.color,t.fog.density)),t.fog.name!==""&&(o.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&(o.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(o.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&o.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":o=new Xe(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(o.focus=t.focus),t.zoom!==void 0&&(o.zoom=t.zoom),t.filmGauge!==void 0&&(o.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(o.filmOffset=t.filmOffset),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"OrthographicCamera":o=new So(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(o.zoom=t.zoom),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"AmbientLight":o=new Wp(t.color,t.intensity);break;case"DirectionalLight":o=new Qh(t.color,t.intensity),o.target=t.target||"";break;case"PointLight":o=new ql(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":o=new Xp(t.color,t.intensity,t.width,t.height);break;case"SpotLight":o=new Gp(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),o.target=t.target||"";break;case"HemisphereLight":o=new Jh(t.color,t.groundColor,t.intensity);break;case"LightProbe":o=new Yp().fromJSON(t);break;case"SkinnedMesh":h=a(t.geometry),u=l(t.material),o=new gp(h,u),t.bindMode!==void 0&&(o.bindMode=t.bindMode),t.bindMatrix!==void 0&&o.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(o.skeleton=t.skeleton);break;case"Mesh":h=a(t.geometry),u=l(t.material),o=new ft(h,u);break;case"InstancedMesh":h=a(t.geometry),u=l(t.material);const d=t.count,f=t.instanceMatrix,p=t.instanceColor;o=new vs(h,u,d),o.instanceMatrix=new lr(new Float32Array(f.array),16),p!==void 0&&(o.instanceColor=new lr(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":h=a(t.geometry),u=l(t.material),o=new _p(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,u),o.geometry=h,o.perObjectFrustumCulled=t.perObjectFrustumCulled,o.sortObjects=t.sortObjects,o._drawRanges=t.drawRanges,o._reservedRanges=t.reservedRanges,o._visibility=t.visibility,o._active=t.active,o._bounds=t.bounds.map(_=>{const g=new un;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);const m=new sn;return m.radius=_.sphereRadius,m.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:m}}),o._maxInstanceCount=t.maxInstanceCount,o._maxVertexCount=t.maxVertexCount,o._maxIndexCount=t.maxIndexCount,o._geometryInitialized=t.geometryInitialized,o._geometryCount=t.geometryCount,o._matricesTexture=c(t.matricesTexture.uuid),t.colorsTexture!==void 0&&(o._colorsTexture=c(t.colorsTexture.uuid));break;case"LOD":o=new mp;break;case"Line":o=new Hi(a(t.geometry),l(t.material));break;case"LineLoop":o=new xp(a(t.geometry),l(t.material));break;case"LineSegments":o=new oi(a(t.geometry),l(t.material));break;case"PointCloud":case"Points":o=new zh(a(t.geometry),l(t.material));break;case"Sprite":o=new pp(l(t.material));break;case"Group":o=new Gt;break;case"Bone":o=new Bh;break;default:o=new se}if(o.uuid=t.uuid,t.name!==void 0&&(o.name=t.name),t.matrix!==void 0?(o.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=t.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(t.position!==void 0&&o.position.fromArray(t.position),t.rotation!==void 0&&o.rotation.fromArray(t.rotation),t.quaternion!==void 0&&o.quaternion.fromArray(t.quaternion),t.scale!==void 0&&o.scale.fromArray(t.scale)),t.up!==void 0&&o.up.fromArray(t.up),t.castShadow!==void 0&&(o.castShadow=t.castShadow),t.receiveShadow!==void 0&&(o.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(o.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(o.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(o.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(o.shadow.radius=t.shadow.radius),t.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(o.visible=t.visible),t.frustumCulled!==void 0&&(o.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(o.renderOrder=t.renderOrder),t.userData!==void 0&&(o.userData=t.userData),t.layers!==void 0&&(o.layers.mask=t.layers),t.children!==void 0){const d=t.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],e,n,i,s))}if(t.animations!==void 0){const d=t.animations;for(let f=0;f<d.length;f++){const p=d[f];o.animations.push(s[p])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(o.autoUpdate=t.autoUpdate);const d=t.levels;for(let f=0;f<d.length;f++){const p=d[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=e[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){const n=e.target,i=t.getObjectByProperty("uuid",n);i!==void 0?e.target=i:e.target=new se}})}}const LM={UVMapping:vl,CubeReflectionMapping:Si,CubeRefractionMapping:Vi,EquirectangularReflectionMapping:Qr,EquirectangularRefractionMapping:jr,CubeUVReflectionMapping:mr},Od={RepeatWrapping:Ss,ClampToEdgeWrapping:vn,MirroredRepeatWrapping:to},Bd={NearestFilter:Ue,NearestMipmapNearestFilter:gh,NearestMipmapLinearFilter:Qs,LinearFilter:Fe,LinearMipmapNearestFilter:Vr,LinearMipmapLinearFilter:Hn};class DM extends Sn{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=_i.get(t);if(o!==void 0){if(s.manager.itemStart(t),o.then){o.then(c=>{e&&e(c),s.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return _i.add(t,c),e&&e(c),s.manager.itemEnd(t),c}).catch(function(c){i&&i(c),_i.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});_i.add(t,l),s.manager.itemStart(t)}}let va;class jh{static getContext(){return va===void 0&&(va=new(window.AudioContext||window.webkitAudioContext)),va}static setContext(t){va=t}}class UM extends Sn{constructor(t){super(t)}load(t,e,n,i){const s=this,o=new Ti(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(l){try{const c=l.slice(0);jh.getContext().decodeAudioData(c,function(u){e(u)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i?i(l):console.error(l),s.manager.itemError(t)}}}const zd=new Ft,kd=new Ft,is=new Ft;class NM{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Xe,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Xe,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,is.copy(t.projectionMatrix);const i=e.eyeSep/2,s=i*e.near/e.focus,o=e.near*Math.tan(xs*e.fov*.5)/e.zoom;let a,l;kd.elements[12]=-i,zd.elements[12]=i,a=-o*e.aspect+s,l=o*e.aspect+s,is.elements[0]=2*e.near/(l-a),is.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(is),a=-o*e.aspect-s,l=o*e.aspect-s,is.elements[0]=2*e.near/(l-a),is.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(is)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(kd),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(zd)}}class Zl{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Vd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Vd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Vd(){return performance.now()}const ss=new T,Hd=new nn,FM=new T,rs=new T;class OM extends se{constructor(){super(),this.type="AudioListener",this.context=jh.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Zl}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(ss,Hd,FM),rs.set(0,0,-1).applyQuaternion(Hd),e.positionX){const i=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(ss.x,i),e.positionY.linearRampToValueAtTime(ss.y,i),e.positionZ.linearRampToValueAtTime(ss.z,i),e.forwardX.linearRampToValueAtTime(rs.x,i),e.forwardY.linearRampToValueAtTime(rs.y,i),e.forwardZ.linearRampToValueAtTime(rs.z,i),e.upX.linearRampToValueAtTime(n.x,i),e.upY.linearRampToValueAtTime(n.y,i),e.upZ.linearRampToValueAtTime(n.z,i)}else e.setPosition(ss.x,ss.y,ss.z),e.setOrientation(rs.x,rs.y,rs.z,n.x,n.y,n.z)}}class Jp extends se{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}}const os=new T,Gd=new nn,BM=new T,as=new T;class zM extends Jp{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(os,Gd,BM),as.set(0,0,1).applyQuaternion(Gd);const e=this.panner;if(e.positionX){const n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(os.x,n),e.positionY.linearRampToValueAtTime(os.y,n),e.positionZ.linearRampToValueAtTime(os.z,n),e.orientationX.linearRampToValueAtTime(as.x,n),e.orientationY.linearRampToValueAtTime(as.y,n),e.orientationZ.linearRampToValueAtTime(as.z,n)}else e.setPosition(os.x,os.y,os.z),e.setOrientation(as.x,as.y,as.z)}}class kM{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}}class Kp{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,o;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-s,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,o=i;s!==o;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){nn.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const o=this._workIndex*s;nn.multiplyQuaternionsFlat(t,o,t,e,t,n),nn.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=e+a;t[l]=t[l]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,s){for(let o=0;o!==s;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const tu="\\[\\]\\.:\\/",VM=new RegExp("["+tu+"]","g"),eu="[^"+tu+"]",HM="[^"+tu.replace("\\.","")+"]",GM=/((?:WC+[\/:])*)/.source.replace("WC",eu),WM=/(WCOD+)?/.source.replace("WCOD",HM),XM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",eu),qM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",eu),YM=new RegExp("^"+GM+WM+XM+qM+"$"),ZM=["material","materials","bones","map"];class $M{constructor(t,e,n){const i=n||ne.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ne{constructor(t,e,n){this.path=e,this.parsedPath=n||ne.parseTrackName(e),this.node=ne.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ne.Composite(t,e,n):new ne(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(VM,"")}static parseTrackName(t){const e=YM.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);ZM.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=ne.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[i];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ne.Composite=$M;ne.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ne.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ne.prototype.GetterByBindingType=[ne.prototype._getValue_direct,ne.prototype._getValue_array,ne.prototype._getValue_arrayElement,ne.prototype._getValue_toArray];ne.prototype.SetterByBindingTypeAndVersioning=[[ne.prototype._setValue_direct,ne.prototype._setValue_direct_setNeedsUpdate,ne.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_array,ne.prototype._setValue_array_setNeedsUpdate,ne.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_arrayElement,ne.prototype._setValue_arrayElement_setNeedsUpdate,ne.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_fromArray,ne.prototype._setValue_fromArray_setNeedsUpdate,ne.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class JM{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Cn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){const t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,o=s.length;let a,l=t.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){const d=arguments[h],f=d.uuid;let p=e[f];if(p===void 0){p=l++,e[f]=p,t.push(d);for(let _=0,g=o;_!==g;++_)s[_].push(new ne(d,n[_],i[_]))}else if(p<c){a=t[p];const _=--c,g=t[_];e[g.uuid]=p,t[p]=g,e[f]=_,t[_]=d;for(let m=0,v=o;m!==v;++m){const x=s[m],y=x[_];let P=x[p];x[p]=y,P===void 0&&(P=new ne(d,n[m],i[m])),x[_]=P}}else t[p]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const l=arguments[o],c=l.uuid,h=e[c];if(h!==void 0&&h>=s){const u=s++,d=t[u];e[d.uuid]=h,t[h]=d,e[c]=u,t[u]=l;for(let f=0,p=i;f!==p;++f){const _=n[f],g=_[u],m=_[h];_[h]=g,_[u]=m}}}this.nCachedObjects_=s}uncache(){const t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,o=t.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],h=c.uuid,u=e[h];if(u!==void 0)if(delete e[h],u<s){const d=--s,f=t[d],p=--o,_=t[p];e[f.uuid]=u,t[u]=f,e[_.uuid]=d,t[d]=_,t.pop();for(let g=0,m=i;g!==m;++g){const v=n[g],x=v[d],y=v[p];v[u]=x,v[d]=y,v.pop()}}else{const d=--o,f=t[d];d>0&&(e[f.uuid]=u),t[u]=f,t.pop();for(let p=0,_=i;p!==_;++p){const g=n[p];g[u]=g[d],g.pop()}}}this.nCachedObjects_=s}subscribe_(t,e){const n=this._bindingsIndicesByPath;let i=n[t];const s=this._bindings;if(i!==void 0)return s[i];const o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=s.length,n[t]=i,o.push(t),a.push(e),s.push(u);for(let d=h,f=l.length;d!==f;++d){const p=l[d];u[d]=new ne(p,t,e)}return u}unsubscribe_(t){const e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){const i=this._paths,s=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=t[a];e[c]=n,o[n]=l,o.pop(),s[n]=s[a],s.pop(),i[n]=i[a],i.pop()}}}class Qp{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,o=s.length,a=new Array(o),l={endingStart:ds,endingEnd:ds};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=zf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,o=s/i,a=i/s;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const l=(t-s)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Eh:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case El:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const o=n===kf;if(t===0)return s===-1?i:o&&(s&1)===1?e-i:i;if(n===Bf){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=fs,i.endingEnd=fs):(t?i.endingStart=this.zeroSlopeAtStart?fs:ds:i.endingStart=no,e?i.endingEnd=this.zeroSlopeAtEnd?fs:ds:i.endingEnd=no)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=e,a[1]=s+t,l[1]=n,this}}const KM=new Float32Array(1);class QM extends ri{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,o[u]=p;else{if(p=o[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const _=e&&e._propertyBindings[u].binding.parsedPath;p=new Kp(ne.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[u]=p}a[u].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let o=s[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Yh(new Float32Array(2),new Float32Array(2),1,KM),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let o=typeof t=="string"?fo.findByName(i,t):t;const a=o!==null?o.uuid:t,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=El),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new Qp(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?fo.findByName(n,t):t,o=s?s.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class nu{constructor(t){this.value=t}clone(){return new nu(this.value.clone===void 0?this.value:this.value.clone())}}let jM=0;class tS extends ri{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:jM++}),this.name="",this.usage=io,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){const e=this.uniforms.indexOf(t);return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(t){this.name=t.name,this.usage=t.usage;const e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){const s=Array.isArray(e[n])?e[n]:[e[n]];for(let o=0;o<s.length;o++)this.uniforms.push(s[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class eS extends Ll{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}class nS{constructor(t,e,n,i,s){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=s,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}const Wd=new Ft;class iS{constructor(t,e,n=0,i=1/0){this.ray=new gr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Cl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wd),this}intersectObject(t,e=!0,n=[]){return ah(t,this,n,e),n.sort(Xd),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)ah(t[i],this,n,e);return n.sort(Xd),n}}function Xd(r,t){return r.distance-t.distance}function ah(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)ah(s[o],t,e,!0)}}class sS{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Re(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class rS{constructor(t=1,e=0,n=0){return this.radius=t,this.theta=e,this.y=n,this}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}}class iu{constructor(t,e,n,i){iu.prototype.isMatrix2=!0,this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}}const qd=new q;class oS{constructor(t=new q(1/0,1/0),e=new q(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=qd.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qd).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Yd=new T,ya=new T;class aS{constructor(t=new T,e=new T){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Yd.subVectors(t,this.start),ya.subVectors(this.end,this.start);const n=ya.dot(ya);let s=ya.dot(Yd)/n;return e&&(s=Re(s,0,1)),s}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const Zd=new T;class lS extends se{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";const n=new Wt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Mt(i,3));const s=new pn({fog:!1,toneMapped:!1});this.cone=new oi(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),Zd.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Zd),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Ni=new T,Ma=new Ft,Oc=new Ft;class cS extends oi{constructor(t){const e=jp(t),n=new Wt,i=[],s=[],o=new it(0,0,1),a=new it(0,1,0);for(let c=0;c<e.length;c++){const h=e[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(o.r,o.g,o.b),s.push(a.r,a.g,a.b))}n.setAttribute("position",new Mt(i,3)),n.setAttribute("color",new Mt(s,3));const l=new pn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){const e=this.bones,n=this.geometry,i=n.getAttribute("position");Oc.copy(this.root.matrixWorld).invert();for(let s=0,o=0;s<e.length;s++){const a=e[s];a.parent&&a.parent.isBone&&(Ma.multiplyMatrices(Oc,a.matrixWorld),Ni.setFromMatrixPosition(Ma),i.setXYZ(o,Ni.x,Ni.y,Ni.z),Ma.multiplyMatrices(Oc,a.parent.matrixWorld),Ni.setFromMatrixPosition(Ma),i.setXYZ(o+1,Ni.x,Ni.y,Ni.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}function jp(r){const t=[];r.isBone===!0&&t.push(r);for(let e=0;e<r.children.length;e++)t.push.apply(t,jp(r.children[e]));return t}class hS extends ft{constructor(t,e,n){const i=new ii(e,4,2),s=new Un({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const uS=new T,$d=new it,Jd=new it;class dS extends se{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Eo(e);i.rotateY(Math.PI*.5),this.material=new Un({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),o=new Float32Array(s.count*3);i.setAttribute("color",new pe(o,3)),this.add(new ft(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const e=t.geometry.getAttribute("color");$d.copy(this.light.color),Jd.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){const s=n<i/2?$d:Jd;e.setXYZ(n,s.r,s.g,s.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(uS.setFromMatrixPosition(this.light.matrixWorld).negate())}}class fS extends oi{constructor(t=10,e=10,n=4473924,i=8947848){n=new it(n),i=new it(i);const s=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,f=0,p=-a;d<=e;d++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);const _=d===s?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const h=new Wt;h.setAttribute("position",new Mt(l,3)),h.setAttribute("color",new Mt(c,3));const u=new pn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class pS extends oi{constructor(t=10,e=16,n=8,i=64,s=4473924,o=8947848){s=new it(s),o=new it(o);const a=[],l=[];if(e>1)for(let u=0;u<e;u++){const d=u/e*(Math.PI*2),f=Math.sin(d)*t,p=Math.cos(d)*t;a.push(0,0,0),a.push(f,0,p);const _=u&1?s:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let u=0;u<n;u++){const d=u&1?s:o,f=t-t/n*u;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),l.push(d.r,d.g,d.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),l.push(d.r,d.g,d.b)}}const c=new Wt;c.setAttribute("position",new Mt(a,3)),c.setAttribute("color",new Mt(l,3));const h=new pn({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Kd=new T,Sa=new T,Qd=new T;class mS extends se{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let i=new Wt;i.setAttribute("position",new Mt([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));const s=new pn({fog:!1,toneMapped:!1});this.lightPlane=new Hi(i,s),this.add(this.lightPlane),i=new Wt,i.setAttribute("position",new Mt([0,0,0,0,0,1],3)),this.targetLine=new Hi(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Kd.setFromMatrixPosition(this.light.matrixWorld),Sa.setFromMatrixPosition(this.light.target.matrixWorld),Qd.subVectors(Sa,Kd),this.lightPlane.lookAt(Sa),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Sa),this.targetLine.scale.z=Qd.length()}}const ba=new T,Ce=new Rl;class gS extends oi{constructor(t){const e=new Wt,n=new pn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){i.push(0,0,0),s.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}e.setAttribute("position",new Mt(i,3)),e.setAttribute("color",new Mt(s,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const c=new it(16755200),h=new it(16711680),u=new it(43775),d=new it(16777215),f=new it(3355443);this.setColors(c,h,u,d,f)}setColors(t,e,n,i,s){const a=this.geometry.getAttribute("color");a.setXYZ(0,t.r,t.g,t.b),a.setXYZ(1,t.r,t.g,t.b),a.setXYZ(2,t.r,t.g,t.b),a.setXYZ(3,t.r,t.g,t.b),a.setXYZ(4,t.r,t.g,t.b),a.setXYZ(5,t.r,t.g,t.b),a.setXYZ(6,t.r,t.g,t.b),a.setXYZ(7,t.r,t.g,t.b),a.setXYZ(8,t.r,t.g,t.b),a.setXYZ(9,t.r,t.g,t.b),a.setXYZ(10,t.r,t.g,t.b),a.setXYZ(11,t.r,t.g,t.b),a.setXYZ(12,t.r,t.g,t.b),a.setXYZ(13,t.r,t.g,t.b),a.setXYZ(14,t.r,t.g,t.b),a.setXYZ(15,t.r,t.g,t.b),a.setXYZ(16,t.r,t.g,t.b),a.setXYZ(17,t.r,t.g,t.b),a.setXYZ(18,t.r,t.g,t.b),a.setXYZ(19,t.r,t.g,t.b),a.setXYZ(20,t.r,t.g,t.b),a.setXYZ(21,t.r,t.g,t.b),a.setXYZ(22,t.r,t.g,t.b),a.setXYZ(23,t.r,t.g,t.b),a.setXYZ(24,e.r,e.g,e.b),a.setXYZ(25,e.r,e.g,e.b),a.setXYZ(26,e.r,e.g,e.b),a.setXYZ(27,e.r,e.g,e.b),a.setXYZ(28,e.r,e.g,e.b),a.setXYZ(29,e.r,e.g,e.b),a.setXYZ(30,e.r,e.g,e.b),a.setXYZ(31,e.r,e.g,e.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,s.r,s.g,s.b),a.setXYZ(41,s.r,s.g,s.b),a.setXYZ(42,s.r,s.g,s.b),a.setXYZ(43,s.r,s.g,s.b),a.setXYZ(44,s.r,s.g,s.b),a.setXYZ(45,s.r,s.g,s.b),a.setXYZ(46,s.r,s.g,s.b),a.setXYZ(47,s.r,s.g,s.b),a.setXYZ(48,s.r,s.g,s.b),a.setXYZ(49,s.r,s.g,s.b),a.needsUpdate=!0}update(){const t=this.geometry,e=this.pointMap,n=1,i=1;Ce.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Ie("c",e,t,Ce,0,0,-1),Ie("t",e,t,Ce,0,0,1),Ie("n1",e,t,Ce,-n,-i,-1),Ie("n2",e,t,Ce,n,-i,-1),Ie("n3",e,t,Ce,-n,i,-1),Ie("n4",e,t,Ce,n,i,-1),Ie("f1",e,t,Ce,-n,-i,1),Ie("f2",e,t,Ce,n,-i,1),Ie("f3",e,t,Ce,-n,i,1),Ie("f4",e,t,Ce,n,i,1),Ie("u1",e,t,Ce,n*.7,i*1.1,-1),Ie("u2",e,t,Ce,-n*.7,i*1.1,-1),Ie("u3",e,t,Ce,0,i*2,-1),Ie("cf1",e,t,Ce,-n,0,1),Ie("cf2",e,t,Ce,n,0,1),Ie("cf3",e,t,Ce,0,-i,1),Ie("cf4",e,t,Ce,0,i,1),Ie("cn1",e,t,Ce,-n,0,-1),Ie("cn2",e,t,Ce,n,0,-1),Ie("cn3",e,t,Ce,0,-i,-1),Ie("cn4",e,t,Ce,0,i,-1),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Ie(r,t,e,n,i,s,o){ba.set(i,s,o).unproject(n);const a=t[r];if(a!==void 0){const l=e.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],ba.x,ba.y,ba.z)}}const wa=new un;class _S extends oi{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),s=new Wt;s.setIndex(new pe(n,1)),s.setAttribute("position",new pe(i,3)),super(s,new pn({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&wa.setFromObject(this.object),wa.isEmpty())return;const e=wa.min,n=wa.max,i=this.geometry.attributes.position,s=i.array;s[0]=n.x,s[1]=n.y,s[2]=n.z,s[3]=e.x,s[4]=n.y,s[5]=n.z,s[6]=e.x,s[7]=e.y,s[8]=n.z,s[9]=n.x,s[10]=e.y,s[11]=n.z,s[12]=n.x,s[13]=n.y,s[14]=e.z,s[15]=e.x,s[16]=n.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=n.x,s[22]=e.y,s[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class xS extends oi{constructor(t,e=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Wt;s.setIndex(new pe(n,1)),s.setAttribute("position",new Mt(i,3)),super(s,new pn({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}}class vS extends Hi{constructor(t,e=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new Wt;o.setAttribute("position",new Mt(s,3)),o.computeBoundingSphere(),super(o,new pn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Wt;l.setAttribute("position",new Mt(a,3)),l.computeBoundingSphere(),this.add(new ft(l,new Un({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const jd=new T;let Ta,Bc;class yS extends se{constructor(t=new T(0,0,1),e=new T(0,0,0),n=1,i=16776960,s=n*.2,o=s*.2){super(),this.type="ArrowHelper",Ta===void 0&&(Ta=new Wt,Ta.setAttribute("position",new Mt([0,0,0,0,1,0],3)),Bc=new Xn(0,.5,1,5,1),Bc.translate(0,-.5,0)),this.position.copy(e),this.line=new Hi(Ta,new pn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ft(Bc,new Un({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{jd.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(jd,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class MS extends oi{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Wt;i.setAttribute("position",new Mt(e,3)),i.setAttribute("color",new Mt(n,3));const s=new pn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(t,e,n){const i=new it,s=this.geometry.attributes.color.array;return i.set(t),i.toArray(s,0),i.toArray(s,3),i.set(e),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class SS{constructor(){this.type="ShapePath",this.color=new it,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new oo,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,o){return this.currentPath.bezierCurveTo(t,e,n,i,s,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(m){const v=[];for(let x=0,y=m.length;x<y;x++){const P=m[x],E=new ki;E.curves=P.curves,v.push(E)}return v}function n(m,v){const x=v.length;let y=!1;for(let P=x-1,E=0;E<x;P=E++){let C=v[P],R=v[E],b=R.x-C.x,M=R.y-C.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(C=v[E],b=-b,R=v[P],M=-M),m.y<C.y||m.y>R.y)continue;if(m.y===C.y){if(m.x===C.x)return!0}else{const L=M*(m.x-C.x)-b*(m.y-C.y);if(L===0)return!0;if(L<0)continue;y=!y}}else{if(m.y!==C.y)continue;if(R.x<=m.x&&m.x<=C.x||C.x<=m.x&&m.x<=R.x)return!0}}return y}const i=ei.isClockWise,s=this.subPaths;if(s.length===0)return[];let o,a,l;const c=[];if(s.length===1)return a=s[0],l=new ki,l.curves=a.curves,c.push(l),c;let h=!i(s[0].getPoints());h=t?!h:h;const u=[],d=[];let f=[],p=0,_;d[p]=void 0,f[p]=[];for(let m=0,v=s.length;m<v;m++)a=s[m],_=a.getPoints(),o=i(_),o=t?!o:o,o?(!h&&d[p]&&p++,d[p]={s:new ki,p:_},d[p].s.curves=a.curves,h&&p++,f[p]=[]):f[p].push({h:a,p:_[0]});if(!d[0])return e(s);if(d.length>1){let m=!1,v=0;for(let x=0,y=d.length;x<y;x++)u[x]=[];for(let x=0,y=d.length;x<y;x++){const P=f[x];for(let E=0;E<P.length;E++){const C=P[E];let R=!0;for(let b=0;b<d.length;b++)n(C.p,d[b].p)&&(x!==b&&v++,R?(R=!1,u[b].push(C)):m=!0);R&&u[x].push(C)}}v>0&&m===!1&&(f=u)}let g;for(let m=0,v=d.length;m<v;m++){l=d[m].s,c.push(l),g=f[m];for(let x=0,y=g.length;x<y;x++)l.holes.push(g[x].h)}return c}}class bS extends ri{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class wS extends en{constructor(t=1,e=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" parameter to enable MRT.'),super(t,e,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_l}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_l);const TS=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:xl,AddEquation:Oi,AddOperation:Nf,AdditiveAnimationBlendMode:Eh,AdditiveBlending:Kr,AgXToneMapping:ph,AlphaFormat:yh,AlwaysCompare:Jf,AlwaysDepth:Ua,AlwaysStencilFunc:Jc,AmbientLight:Wp,AnimationAction:Qp,AnimationClip:fo,AnimationLoader:wM,AnimationMixer:QM,AnimationObjectGroup:JM,AnimationUtils:yM,ArcCurve:vp,ArrayCamera:up,ArrowHelper:yS,AttachedBindMode:$c,Audio:Jp,AudioAnalyser:kM,AudioContext:jh,AudioListener:OM,AudioLoader:UM,AxesHelper:MS,BackSide:hn,BasicDepthPacking:Vf,BasicShadowMap:ym,BatchedMesh:_p,Bone:Bh,BooleanKeyframeTrack:Ps,Box2:oS,Box3:un,Box3Helper:xS,BoxGeometry:Wi,BoxHelper:_S,BufferAttribute:pe,BufferGeometry:Wt,BufferGeometryLoader:$p,ByteType:_h,Cache:_i,Camera:Rl,CameraHelper:gS,CanvasTexture:Fl,CapsuleGeometry:zl,CatmullRomCurve3:yp,CineonToneMapping:fh,CircleGeometry:xr,ClampToEdgeWrapping:vn,Clock:Zl,Color:it,ColorKeyframeTrack:Zh,ColorManagement:jt,CompressedArrayTexture:Gy,CompressedCubeTexture:Wy,CompressedTexture:Nl,CompressedTextureLoader:TM,ConeGeometry:kl,ConstantAlphaFactor:Lf,ConstantColorFactor:Pf,Controls:bS,CubeCamera:ip,CubeReflectionMapping:Si,CubeRefractionMapping:Vi,CubeTexture:yo,CubeTextureLoader:EM,CubeUVReflectionMapping:mr,CubicBezierCurve:Vh,CubicBezierCurve3:Mp,CubicInterpolant:Bp,CullFaceBack:qc,CullFaceFront:mf,CullFaceFrontBack:vm,CullFaceNone:pf,Curve:qn,CurvePath:bp,CustomBlending:gf,CustomToneMapping:Ff,CylinderGeometry:Xn,Cylindrical:rS,Data3DTexture:Rh,DataArrayTexture:Al,DataTexture:ti,DataTextureLoader:AM,DataUtils:D0,DecrementStencilOp:Um,DecrementWrapStencilOp:Fm,DefaultLoadingManager:Vp,DepthFormat:_s,DepthStencilFormat:ws,DepthTexture:Dh,DetachedBindMode:Of,DirectionalLight:Qh,DirectionalLightHelper:mS,DiscreteInterpolant:zp,DodecahedronGeometry:vr,DoubleSide:tn,DstAlphaFactor:Tf,DstColorFactor:Af,DynamicCopyUsage:Km,DynamicDrawUsage:Xm,DynamicReadUsage:Zm,EdgesGeometry:wp,EllipseCurve:Ol,EqualCompare:qf,EqualDepth:Fa,EqualStencilFunc:km,EquirectangularReflectionMapping:Qr,EquirectangularRefractionMapping:jr,Euler:fn,EventDispatcher:ri,ExtrudeGeometry:To,FileLoader:Ti,Float16BufferAttribute:z0,Float32BufferAttribute:Mt,FloatType:yn,Fog:Il,FogExp2:bo,FramebufferTexture:Hy,FrontSide:Mi,Frustum:Mo,GLBufferAttribute:nS,GLSL1:jm,GLSL3:Kc,GreaterCompare:Yf,GreaterDepth:Ba,GreaterEqualCompare:$f,GreaterEqualDepth:Oa,GreaterEqualStencilFunc:Wm,GreaterStencilFunc:Hm,GridHelper:fS,Group:Gt,HalfFloatType:Wn,HemisphereLight:Jh,HemisphereLightHelper:dS,IcosahedronGeometry:Rs,ImageBitmapLoader:DM,ImageLoader:po,ImageUtils:jf,IncrementStencilOp:Dm,IncrementWrapStencilOp:Nm,InstancedBufferAttribute:lr,InstancedBufferGeometry:Zp,InstancedInterleavedBuffer:eS,InstancedMesh:vs,Int16BufferAttribute:O0,Int32BufferAttribute:B0,Int8BufferAttribute:U0,IntType:yl,InterleavedBuffer:Ll,InterleavedBufferAttribute:Ts,Interpolant:Co,InterpolateDiscrete:eo,InterpolateLinear:dl,InterpolateSmooth:Ca,InvertStencilOp:Om,KeepStencilOp:ls,KeyframeTrack:Yn,LOD:mp,LatheGeometry:wo,Layers:Cl,LessCompare:Xf,LessDepth:Na,LessEqualCompare:Ah,LessEqualDepth:Ms,LessEqualStencilFunc:Vm,LessStencilFunc:zm,Light:qi,LightProbe:Yp,Line:Hi,Line3:aS,LineBasicMaterial:pn,LineCurve:Hh,LineCurve3:Sp,LineDashedMaterial:Np,LineLoop:xp,LineSegments:oi,LinearFilter:Fe,LinearInterpolant:Yh,LinearMipMapLinearFilter:wm,LinearMipMapNearestFilter:bm,LinearMipmapLinearFilter:Hn,LinearMipmapNearestFilter:Vr,LinearSRGBColorSpace:Cs,LinearToneMapping:uh,LinearTransfer:vo,Loader:Sn,LoaderUtils:oh,LoadingManager:$h,LoopOnce:Bf,LoopPingPong:kf,LoopRepeat:zf,LuminanceAlphaFormat:bh,LuminanceFormat:Sh,MOUSE:_m,Material:rn,MaterialLoader:Yl,MathUtils:Qc,Matrix2:iu,Matrix3:Xt,Matrix4:Ft,MaxEquation:yf,Mesh:ft,MeshBasicMaterial:Un,MeshDepthMaterial:Uh,MeshDistanceMaterial:Nh,MeshLambertMaterial:cr,MeshMatcapMaterial:Up,MeshNormalMaterial:Dp,MeshPhongMaterial:Ip,MeshPhysicalMaterial:Pp,MeshStandardMaterial:An,MeshToonMaterial:Lp,MinEquation:vf,MirroredRepeatWrapping:to,MixOperation:Uf,MultiplyBlending:Zc,MultiplyOperation:_o,NearestFilter:Ue,NearestMipMapLinearFilter:Sm,NearestMipMapNearestFilter:Mm,NearestMipmapLinearFilter:Qs,NearestMipmapNearestFilter:gh,NeutralToneMapping:mh,NeverCompare:Wf,NeverDepth:Da,NeverStencilFunc:Bm,NoBlending:jn,NoColorSpace:mi,NoToneMapping:vi,NormalAnimationBlendMode:El,NormalBlending:gs,NotEqualCompare:Zf,NotEqualDepth:za,NotEqualStencilFunc:Gm,NumberKeyframeTrack:ho,Object3D:se,ObjectLoader:IM,ObjectSpaceNormalMap:Gf,OctahedronGeometry:Eo,OneFactor:Sf,OneMinusConstantAlphaFactor:Df,OneMinusConstantColorFactor:If,OneMinusDstAlphaFactor:Ef,OneMinusDstColorFactor:Cf,OneMinusSrcAlphaFactor:La,OneMinusSrcColorFactor:wf,OrthographicCamera:So,PCFShadowMap:ch,PCFSoftShadowMap:hh,PMREMGenerator:jc,Path:oo,PerspectiveCamera:Xe,Plane:Fi,PlaneGeometry:Ye,PlaneHelper:vS,PointLight:ql,PointLightHelper:hS,Points:zh,PointsMaterial:Ul,PolarGridHelper:pS,PolyhedronGeometry:Xi,PositionalAudio:zM,PropertyBinding:ne,PropertyMixer:Kp,QuadraticBezierCurve:Gh,QuadraticBezierCurve3:Bl,Quaternion:nn,QuaternionKeyframeTrack:Ro,QuaternionLinearInterpolant:kp,RED_GREEN_RGTC2_Format:hl,RED_RGTC1_Format:Th,REVISION:_l,RGBADepthPacking:Hf,RGBAFormat:cn,RGBAIntegerFormat:Tl,RGBA_ASTC_10x10_Format:sl,RGBA_ASTC_10x5_Format:el,RGBA_ASTC_10x6_Format:nl,RGBA_ASTC_10x8_Format:il,RGBA_ASTC_12x10_Format:rl,RGBA_ASTC_12x12_Format:ol,RGBA_ASTC_4x4_Format:Ya,RGBA_ASTC_5x4_Format:Za,RGBA_ASTC_5x5_Format:$a,RGBA_ASTC_6x5_Format:Ja,RGBA_ASTC_6x6_Format:Ka,RGBA_ASTC_8x5_Format:Qa,RGBA_ASTC_8x6_Format:ja,RGBA_ASTC_8x8_Format:tl,RGBA_BPTC_Format:qr,RGBA_ETC2_EAC_Format:qa,RGBA_PVRTC_2BPPV1_Format:Ga,RGBA_PVRTC_4BPPV1_Format:Ha,RGBA_S3TC_DXT1_Format:Gr,RGBA_S3TC_DXT3_Format:Wr,RGBA_S3TC_DXT5_Format:Xr,RGBDepthPacking:Rm,RGBFormat:Mh,RGBIntegerFormat:Tm,RGB_BPTC_SIGNED_Format:al,RGB_BPTC_UNSIGNED_Format:ll,RGB_ETC1_Format:Wa,RGB_ETC2_Format:Xa,RGB_PVRTC_2BPPV1_Format:Va,RGB_PVRTC_4BPPV1_Format:ka,RGB_S3TC_DXT1_Format:Hr,RGDepthPacking:Pm,RGFormat:wh,RGIntegerFormat:wl,RawShaderMaterial:Xh,Ray:gr,Raycaster:iS,RectAreaLight:Xp,RedFormat:bl,RedIntegerFormat:xo,ReinhardToneMapping:dh,RenderTarget:tp,RepeatWrapping:Ss,ReplaceStencilOp:Lm,ReverseSubtractEquation:xf,RingGeometry:Hl,SIGNED_RED_GREEN_RGTC2_Format:ul,SIGNED_RED_RGTC1_Format:cl,SRGBColorSpace:We,SRGBTransfer:he,Scene:Fh,ShaderChunk:Jt,ShaderLib:Vn,ShaderMaterial:qe,ShadowMaterial:Rp,Shape:ki,ShapeGeometry:Gl,ShapePath:SS,ShapeUtils:ei,ShortType:xh,Skeleton:Dl,SkeletonHelper:cS,SkinnedMesh:gp,Source:ps,Sphere:sn,SphereGeometry:ii,Spherical:sS,SphericalHarmonics3:qp,SplineCurve:Wh,SpotLight:Gp,SpotLightHelper:lS,Sprite:pp,SpriteMaterial:Oh,SrcAlphaFactor:Ia,SrcAlphaSaturateFactor:Rf,SrcColorFactor:bf,StaticCopyUsage:Jm,StaticDrawUsage:io,StaticReadUsage:Ym,StereoCamera:NM,StreamCopyUsage:Qm,StreamDrawUsage:qm,StreamReadUsage:$m,StringKeyframeTrack:Is,SubtractEquation:_f,SubtractiveBlending:Yc,TOUCH:xm,TangentSpaceNormalMap:Gi,TetrahedronGeometry:Wl,Texture:Pe,TextureLoader:Hp,TextureUtils:Sy,TorusGeometry:wi,TorusKnotGeometry:Xl,Triangle:xn,TriangleFanDrawMode:Cm,TriangleStripDrawMode:Am,TrianglesDrawMode:Em,TubeGeometry:Ao,UVMapping:vl,Uint16BufferAttribute:Ph,Uint32BufferAttribute:Ih,Uint8BufferAttribute:N0,Uint8ClampedBufferAttribute:F0,Uniform:nu,UniformsGroup:tS,UniformsLib:ut,UniformsUtils:ar,UnsignedByteType:ni,UnsignedInt248Type:bs,UnsignedInt5999Type:vh,UnsignedIntType:bi,UnsignedShort4444Type:Ml,UnsignedShort5551Type:Sl,UnsignedShortType:sr,VSMShadowMap:Jn,Vector2:q,Vector3:T,Vector4:ie,VectorKeyframeTrack:uo,VideoTexture:Vy,WebGL3DRenderTarget:b0,WebGLArrayRenderTarget:S0,WebGLCoordinateSystem:Qn,WebGLCubeRenderTarget:sp,WebGLMultipleRenderTargets:wS,WebGLRenderTarget:en,WebGLRenderer:dp,WebGLUtils:hp,WebGPUCoordinateSystem:so,WireframeGeometry:Cp,WrapAroundEnding:no,ZeroCurvatureEnding:ds,ZeroFactor:Mf,ZeroSlopeEnding:fs,ZeroStencilOp:Im,createCanvasElement:Qf},Symbol.toStringTag,{value:"Module"})),tm={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class yr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ES=new So(-1,1,1,-1,0,1);class AS extends Wt{constructor(){super(),this.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Mt([0,2,0,0,2,0],2))}}const CS=new AS;class su{constructor(t){this._mesh=new ft(CS,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,ES)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Pa extends yr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof qe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ar.clone(t.uniforms),this.material=new qe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new su(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class tf extends yr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class RS extends yr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class PS{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new q);this._width=n.width,this._height=n.height,e=new en(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Wn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Pa(tm),this.copyPass.material.blending=jn,this.clock=new Zl}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}tf!==void 0&&(o instanceof tf?n=!0:o instanceof RS&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class IS extends yr{constructor(t,e,n=null,i=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new it}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const LS={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new it(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class hr extends yr{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new q(t.x,t.y):new q(256,256),this.clearColor=new it(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new en(s,o,{type:Wn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new en(s,o,{type:Wn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new en(s,o,{type:Wn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const a=LS;this.highPassUniforms=ar.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new qe({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new q(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=tm;this.copyUniforms=ar.clone(h.uniforms),this.blendMaterial=new qe({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Kr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new it,this.oldClearAlpha=1,this.basic=new Un,this.fsQuad=new su(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new q(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=hr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=hr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new qe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new q(.5,.5)},direction:{value:new q(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new qe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}hr.BlurDirectionX=new q(1,0);hr.BlurDirectionY=new q(0,1);const DS={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class US extends yr{constructor(){super();const t=DS;this.uniforms=ar.clone(t.uniforms),this.material=new Xh({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new su(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},jt.getTransfer(this._outputColorSpace)===he&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===uh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===dh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===fh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===xl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ph?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===mh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const lh={uniforms:{tDiffuse:{value:null},dir:{value:new q(1,0)},focus:{value:.46},band:{value:.1},falloff:{value:.34},maxBlur:{value:7}},vertexShader:`
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
    }`},NS={uniforms:{tDiffuse:{value:null},res:{value:new q(1,1)},time:{value:0},dull:{value:1.35},lush:{value:1.18},vignette:{value:.42},grain:{value:.018},shadowTint:{value:new it(.9,.97,1.08)},highTint:{value:new it(1.07,1,.9)},lift:{value:new it(.012,.016,.026)}},vertexShader:lh.vertexShader,fragmentShader:`
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
    }`};function FS(r,t,e){const n=r.getDrawingBufferSize(new q),i=new en(n.x,n.y,{type:Wn,samples:4}),s=new PS(r,i);s.addPass(new IS(t,e));const o=new hr(new q(n.x,n.y),.45,.55,.82);s.addPass(o);const a=new Pa(NS);s.addPass(a);const l=new Pa(lh),c=new Pa(lh);return s.addPass(l),s.addPass(c),s.addPass(new US),{composer:s,bloom:o,grade:a,tiltH:l,tiltV:c,resize:(u,d)=>{s.setSize(u,d);const f=r.getPixelRatio(),p=u*f,_=d*f;l.uniforms.dir.value.set(1/p,0),c.uniforms.dir.value.set(0,1/_);const g=7*(_/720);l.uniforms.maxBlur.value=g,c.uniforms.maxBlur.value=g,a.uniforms.res.value.set(p,_)},tick:u=>{a.uniforms.time.value=u}}}const OS={sun:{color:"#ffd09a",intensity:3.4,from:new T(-13,10.5,6.5)},hemi:{sky:"#a9c2d8",ground:"#5a5232",intensity:1.05},fog:{color:"#cdb895",density:.016},exposure:1.05,bloom:{strength:.42,radius:.55,threshold:.85},grade:{dull:1.35,lush:1.2,vignette:.42,shadowTint:[.9,.97,1.08],highTint:[1.07,1,.9]}},BS={sun:{color:"#8aa6d8",intensity:.85,from:new T(-8,14,5)},hemi:{sky:"#22365a",ground:"#0b0d12",intensity:.55},fog:{color:"#101a2c",density:.03},exposure:1.15,bloom:{strength:.9,radius:.6,threshold:.6},grade:{dull:1.25,lush:1.1,vignette:.55,shadowTint:[.85,.95,1.18],highTint:[1.12,1,.86]}};function zS(r,t,e,n){r.background=new it(n.fog.color),r.fog=new bo(n.fog.color,n.fog.density),t.toneMappingExposure=n.exposure;const i=new Jh(n.hemi.sky,n.hemi.ground,n.hemi.intensity);r.add(i);const s=new Qh(n.sun.color,n.sun.intensity);s.castShadow=!0,s.shadow.mapSize.set(2048,2048);const o=15;Object.assign(s.shadow.camera,{left:-o,right:o,top:o,bottom:-o,near:1,far:60}),s.shadow.bias=-4e-4,s.shadow.normalBias=.025,r.add(s,s.target),e.bloom.strength=n.bloom.strength,e.bloom.radius=n.bloom.radius,e.bloom.threshold=n.bloom.threshold;const a=e.grade.uniforms;a.dull.value=n.grade.dull,a.lush.value=n.grade.lush,a.vignette.value=n.grade.vignette,a.shadowTint.value.setRGB(...n.grade.shadowTint),a.highTint.value.setRGB(...n.grade.highTint);const l=o*2/2048;return{sun:s,follow(c){const h=Math.round(c.x/l)*l,u=Math.round(c.z/l)*l;s.target.position.set(h,0,u),s.position.set(h+n.sun.from.x,n.sun.from.y,u+n.sun.from.z)}}}function we(r){let t=r>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ea(r,t,e){let n=Math.imul(r,374761393)^Math.imul(t,668265263)^Math.imul(e,2246822519);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}const ef=r=>r*r*(3-2*r);function En(r,t,e=1){const n=Math.floor(r),i=Math.floor(t),s=ef(r-n),o=ef(t-i),a=Ea(n,i,e),l=Ea(n+1,i,e),c=Ea(n,i+1,e),h=Ea(n+1,i+1,e);return a+(l-a)*s+(c-a)*o+(a-l-c+h)*s*o}function ue(r,t,e=1,n=4){let i=0,s=.5,o=1,a=0;for(let l=0;l<n;l++)i+=En(r*o,t*o,e+l*17)*s,a+=s,s*=.5,o*=2;return i/a}const Kn=16,Ut=r=>{const t=parseInt(r.slice(1),16);return[t>>16&255,t>>8&255,t&255]},De=(r,t,e)=>[r[0]+(t[0]-r[0])*e,r[1]+(t[1]-r[1])*e,r[2]+(t[2]-r[2])*e],Ge=(r,t)=>[r[0]*t,r[1]*t,r[2]*t];class Oe{constructor(t,e){this.w=t,this.h=e,this.data=new Uint8ClampedArray(t*e*4)}data;set(t,e,n,i=255){const s=(Math.floor(t)%this.w+this.w)%this.w,a=((Math.floor(e)%this.h+this.h)%this.h*this.w+s)*4;this.data[a]=n[0],this.data[a+1]=n[1],this.data[a+2]=n[2],this.data[a+3]=i}get(t,e){const n=(Math.floor(t)%this.w+this.w)%this.w,s=((Math.floor(e)%this.h+this.h)%this.h*this.w+n)*4;return[this.data[s],this.data[s+1],this.data[s+2]]}alpha(t,e){const n=(Math.floor(t)%this.w+this.w)%this.w,i=(Math.floor(e)%this.h+this.h)%this.h;return this.data[(i*this.w+n)*4+3]}fill(t){for(let e=0;e<this.h;e++)for(let n=0;n<this.w;n++)this.set(n,e,t)}canvas(){const t=document.createElement("canvas");t.width=this.w,t.height=this.h;const e=t.getContext("2d"),n=e.createImageData(this.w,this.h);return n.data.set(this.data),e.putImageData(n,0,0),t}texture(t={}){const e=new Fl(this.canvas());return e.magFilter=Ue,e.minFilter=Hn,e.colorSpace=We,e.anisotropy=4,t.repeat!==!1&&(e.wrapS=e.wrapT=Ss),t.worldSize!==!1&&e.repeat.set(Kn/this.w,Kn/this.h),e}}const Et={barnRed:Ut("#8b3626"),barnRedLight:Ut("#a8463a"),barnRedDark:Ut("#5e2219"),oldWood:Ut("#857865"),oldWoodDark:Ut("#4f463a"),greyBoard:Ut("#77695a"),greyBoardDark:Ut("#4a3f35"),white:Ut("#d6cfbf"),whiteShade:Ut("#9c968a"),steel:Ut("#5b6066"),steelDark:Ut("#2e3236"),rust:Ut("#8a4a26"),rustLight:Ut("#b26a32"),rustDark:Ut("#4a2614"),concrete:Ut("#a19c92"),concreteDark:Ut("#6f6b63"),moss:Ut("#4f7a2c"),mossLight:Ut("#7aa83c"),shingle:Ut("#4a4440"),shingleDark:Ut("#2c2825"),brick:Ut("#8c4733"),mortar:Ut("#9d968a"),hay:Ut("#c9a24a"),hayDark:Ut("#8a6a28"),bark:Ut("#4e3b2b"),barkDark:Ut("#2a1f17"),leaf0:Ut("#1e4a1d"),leaf1:Ut("#2f6b2a"),leaf2:Ut("#3f8a32"),leaf3:Ut("#5ea83c"),leaf4:Ut("#8cc650"),glass:Ut("#22303a"),glassSky:Ut("#6f8a98"),black:Ut("#141210"),yellow:Ut("#d9a92a")},nf=new Map;function Le(r,t){let e=nf.get(r);return e||(e=t(),nf.set(r,e)),e}function Nr(r,t,e,n,i={}){const o=new Oe(32,32),a=we(r),l=i.boardPx??5,c=[];for(let h=0;h<32;h++)c.push(.86+a()*.22);for(let h=0;h<32;h++)for(let u=0;u<32;u++){const d=i.horizontal?h:u,f=i.horizontal?u:h,p=Math.floor(d/l),_=d%l===0;let g=Ge(t,c[p%c.length]);const m=En(p*7.3+.3,f*.35,r);g=De(g,m>.62?e:n,Math.abs(m-.5)*.5),i.peel&&ue(u*.18,h*.18,r+3,3)>.62&&(g=De(i.peel,i.peel,1)),_?g=n:i.horizontal&&d%l===l-1&&(g=De(g,n,.45)),a()<.012&&(g=n),o.set(u,h,g)}return o}const ve={barnRed:()=>Le("barnRed",()=>Nr(11,Et.barnRed,Et.barnRedLight,Et.barnRedDark,{peel:Et.oldWood}).texture()),greyBoards:()=>Le("greyBoards",()=>Nr(12,Et.greyBoard,Ge(Et.greyBoard,1.2),Et.greyBoardDark,{horizontal:!0,boardPx:4}).texture()),whiteSiding:()=>Le("whiteSiding",()=>Nr(13,Et.white,Ge(Et.white,1.08),Et.whiteShade,{horizontal:!0,boardPx:4,peel:Et.greyBoard}).texture()),oldWood:()=>Le("oldWood",()=>Nr(14,Et.oldWood,Ge(Et.oldWood,1.15),Et.oldWoodDark,{boardPx:4}).texture()),deck:()=>Le("deck",()=>Nr(15,Ut("#6b4f36"),Ut("#86654a"),Ut("#33241a"),{horizontal:!0,boardPx:4}).texture()),corrugated:()=>Le("corrugated",()=>{const t=new Oe(32,32),e=[1.18,1,.72,.92];for(let n=0;n<32;n++)for(let i=0;i<32;i++){let s=Ge(Et.steel,e[i%4]);const o=ue(i*.12,n*.12,21,3);o>.5&&(s=De(s,Ge(o>.66?Et.rust:Et.rustLight,e[i%4]),Math.min(1,(o-.5)*4))),En(i*.9,n*.06,22)>.78&&(s=De(s,Et.rustDark,.5)),ue(i*.3,n*.3,23,2)>.83&&(s=Et.black),t.set(i,n,s)}return t.texture()}),binRibs:()=>Le("binRibs",()=>{const t=new Oe(32,32),e=[1.15,.95,.75,.95];for(let n=0;n<32;n++)for(let i=0;i<32;i++){let s=Ge(Ut("#8d9296"),e[n%4]);const o=ue(i*.1,n*.14,31,3);o>.56&&(s=De(s,Et.rust,Math.min(1,(o-.56)*4))),En(i*.7,n*.05,32)>.8&&(s=De(s,Et.rustDark,.6)),n%16===0&&i%4===1&&(s=Ge(s,.55)),t.set(i,n,s)}return t.texture()}),concrete:()=>Le("concrete",()=>{const t=new Oe(32,32),e=we(41);for(let n=0;n<32;n++)for(let i=0;i<32;i++){const s=ue(i*.2,n*.2,41,3);let o=De(Et.concreteDark,Et.concrete,.55+s*.45);o=Ge(o,.94+e()*.1),En(i*.8,n*.05,42)>.74&&(o=De(o,Ut("#5e5a52"),.45)),ue(i*.25,n*.25,43,2)>.72&&(o=De(o,Et.moss,.55)),t.set(i,n,o)}for(let n=0;n<2;n++){let i=e()*32,s=e()*32;for(let o=0;o<18;o++)t.set(i,s,Et.concreteDark.map(a=>a*.6)),i+=e()*2-.6,s+=e()*1.6-.3}return t.texture()}),shingles:()=>Le("shingles",()=>{const t=new Oe(32,32),e=we(51);for(let n=0;n<32;n++)for(let i=0;i<32;i++){const s=Math.floor(n/4),o=s%2?3:0,a=Math.floor((i+o)/6);let l=Ge(Et.shingle,.85+En(a*3.1,s*2.7,52)*.3);n%4===3&&(l=Et.shingleDark),(i+o)%6===0&&(l=De(l,Et.shingleDark,.6)),En(a*1.7,s*3.3,53)>.86&&(l=Ut("#3a2e24")),ue(i*.2,n*.2,54,3)>.66&&(l=De(l,Et.moss,.6)),e()<.01&&(l=Et.mossLight),t.set(i,n,l)}return t.texture()}),brick:()=>Le("brick",()=>{const t=new Oe(32,32),e=we(61);for(let n=0;n<32;n++)for(let i=0;i<32;i++){const s=Math.floor(n/3),o=s%2?3:0,a=Math.floor((i+o)/6);let l=Ge(Et.brick,.8+En(a*2.3,s*1.9,62)*.35);(n%3===2||(i+o)%6===5)&&(l=Et.mortar),e()<.03&&(l=Ge(l,.7)),t.set(i,n,l)}return t.texture()}),rustTank:()=>Le("rustTank",()=>{const t=new Oe(32,32);for(let e=0;e<32;e++)for(let n=0;n<32;n++){const i=ue(n*.15,e*.15,71,3);let s=De(Ut("#7c8b8e"),Et.rust,Math.min(1,i*1.6));En(n*.9,e*.08,72)>.7&&(s=De(s,Et.rustDark,.55)),e%8===0&&(s=Ge(s,.7)),e%8===1&&n%3===0&&(s=Ge(s,1.35)),t.set(n,e,s)}return t.texture()}),steel:()=>Le("steel",()=>{const t=new Oe(32,32),e=we(81);for(let n=0;n<32;n++)for(let i=0;i<32;i++){let s=Ge(Et.steel,.82+En(i*.08,n*1.3,81)*.3);e()<.02&&(s=Ge(s,1.4)),ue(i*.2,n*.2,82,2)>.7&&(s=De(s,Et.rust,.5)),t.set(i,n,s)}return t.texture()}),hazard:()=>Le("hazard",()=>{const t=new Oe(32,32);for(let e=0;e<32;e++)for(let n=0;n<32;n++){let i=(n+e)%16<8?Et.yellow:Et.black;ue(n*.3,e*.3,91,2)>.62&&(i=De(i,Et.concreteDark,.7)),t.set(n,e,i)}return t.texture()}),hay:()=>Le("hay",()=>{const t=new Oe(32,32),e=we(101);for(let n=0;n<32;n++)for(let i=0;i<32;i++){let s=Ge(Et.hay,.85+e()*.25);(i*2+n)%7===0&&(s=Et.hayDark),ue(i*.2,n*.2,102,2)>.7&&(s=De(s,Ut("#6f6a3a"),.5)),t.set(i,n,s)}return t.texture()}),bark:()=>Le("bark",()=>{const t=new Oe(32,32);for(let e=0;e<32;e++)for(let n=0;n<32;n++){const i=En(n*.9,e*.12,111);let s=De(Et.barkDark,Et.bark,i);ue(n*.3,e*.15,112,2)>.68&&(s=De(s,Et.moss,.6)),t.set(n,e,s)}return t.texture()}),leaves:()=>Le("leaves",()=>{const t=new Oe(32,32),e=we(121),n=[Et.leaf0,Et.leaf1,Et.leaf2,Et.leaf3,Et.leaf4];for(let i=0;i<32;i++)for(let s=0;s<32;s++){const o=ue(s*.22,i*.22,121,3);let a=Math.min(4,Math.floor(o*5.2+(e()-.5)*.9));a=Math.max(0,a),t.set(s,i,n[a])}return t.texture()}),leavesOlive:()=>Le("leavesOlive",()=>{const t=new Oe(32,32),e=we(131),n=[Ut("#2f3a1c"),Ut("#4b5a2a"),Ut("#66763a"),Ut("#86954a"),Ut("#a5ad5c")];for(let i=0;i<32;i++)for(let s=0;s<32;s++){const o=ue(s*.25,i*.25,131,3),a=Math.max(0,Math.min(4,Math.floor(o*5.2+(e()-.5)*.9)));t.set(s,i,n[a])}return t.texture()}),vines:()=>Le("vines",()=>{const t=new Oe(32,32),e=we(141),n=[Et.leaf1,Et.leaf2,Et.leaf3,Et.leaf4];for(let s=0;s<32;s++)for(let o=0;o<32;o++)ue(o*.22,s*.22,141,3)+s/32*.25>.6?t.set(o,s,n[Math.min(3,Math.floor(e()*4))],255):t.set(o,s,Et.leaf0,0);for(let s=0;s<5;s++){let o=e()*32;for(let a=31;a>0;a--)t.set(o,a,Et.leaf0,255),o+=e()*2-1}for(let s=0;s<6;s++)t.set(e()*32,e()*32,s%2?Ut("#e9e2f0"):Ut("#d8b23a"),255);return t.texture()}),glass:()=>Le("glass",()=>{const t=new Oe(16,16);for(let e=0;e<16;e++)for(let n=0;n<16;n++){let i=Et.glass;(n+(16-e))%11<2&&(i=De(Et.glass,Et.glassSky,.6)),(n<1||e<1||n>14||e>14||n===7||n===8||e===7||e===8)&&(i=Et.white),t.set(n,e,i)}return t.texture({repeat:!1,worldSize:!1})}),glassLit:()=>Le("glassLit",()=>{const t=new Oe(16,16);for(let e=0;e<16;e++)for(let n=0;n<16;n++){let i=De(Ut("#ffcf7a"),Ut("#ff9f45"),e/16);(n<1||e<1||n>14||e>14||n===7||n===8||e===7||e===8)&&(i=Ut("#3a2a1a")),t.set(n,e,i)}return t.texture({repeat:!1,worldSize:!1})}),boarded:()=>Le("boarded",()=>{const t=new Oe(16,16),e=we(151);for(let n=0;n<16;n++)for(let i=0;i<16;i++){let s=Et.black;Math.floor((n+i*.35)/4)%2===0&&(s=Ge(Et.oldWood,.8+e()*.3)),(i<1||n<1||i>14||n>14)&&(s=Et.whiteShade),t.set(i,n,s)}return t.texture({repeat:!1,worldSize:!1})})};function em(r,t){const e=document.createElement("canvas");e.width=t.w,e.height=t.h;const n=e.getContext("2d");n.imageSmoothingEnabled=!1,t.bg&&(n.fillStyle=t.bg,n.fillRect(0,0,t.w,t.h)),n.fillStyle=t.fg,n.font=t.font,n.textAlign="center",n.textBaseline="middle",n.fillText(r,t.w/2,t.h/2+1);const i=n.getImageData(0,0,t.w,t.h),s=Ut(t.fg),o=t.bg?Ut(t.bg):null;for(let l=0;l<i.data.length;l+=4){const c=l/4%t.w,h=Math.floor(l/4/t.w),u=i.data[l+3],d=o?Math.abs(i.data[l]-s[0])+Math.abs(i.data[l+1]-s[1])<Math.abs(i.data[l]-o[0])+Math.abs(i.data[l+1]-o[1]):u>110,f=ue(c*.3,h*.3,t.seed??7,2)<(t.worn??0),p=d&&!f?s:o;p?(i.data[l]=p[0],i.data[l+1]=p[1],i.data[l+2]=p[2],i.data[l+3]=255):i.data[l+3]=0}n.putImageData(i,0,0);const a=new Fl(e);return a.magFilter=Ue,a.minFilter=Fe,a.colorSpace=We,a}function Po(r,t,e){const n=new Wi(r,t,e),i=n.attributes.uv,s=[[e,t],[e,t],[r,e],[r,e],[r,t],[r,t]];for(let o=0;o<6;o++){const[a,l]=s[o];for(let c=0;c<4;c++){const h=o*4+c;i.setXY(h,i.getX(h)*a,i.getY(h)*l)}}return n}function si(r,t,e,n=16,i=!1){const s=new Xn(r,t,e,n,1,i),o=s.attributes.uv,a=(n+1)*2,l=Math.PI*2*Math.max(r,t);for(let c=0;c<o.count;c++)c<a?o.setXY(c,o.getX(c)*l,o.getY(c)*e):o.setXY(c,o.getX(c)*2*Math.max(r,t),o.getY(c)*2*Math.max(r,t));return s}function ru(r,t){const e=new Ye(r,t),n=e.attributes.uv;for(let i=0;i<n.count;i++)n.setXY(i,n.getX(i)*r,n.getY(i)*t);return e}const gl=new Map;function be(r,t,e={}){let n=gl.get(r);return n||(n=new An({map:t,roughness:.92,metalness:0,...e}),gl.set(r,n)),n}function dn(r,t={}){const e="col:"+r+JSON.stringify(t);let n=gl.get(e);return n||(n=new An({color:r,roughness:.9,metalness:0,...t}),gl.set(e,n)),n}function de(r,t=!0,e=!0){return r.traverse(n=>{n.isMesh&&(n.castShadow=t,n.receiveShadow=e)}),r}function tt(r,t,e,n,i=0,s=0,o=0){const a=new ft(Po(r,t,e),n);return a.position.set(i,s+t/2,o),de(a)}function Rn(r,t,e,n,i=0,s=0,o=0,a=16){const l=new ft(si(r,t,e,a),n);return l.position.set(i,s+e/2,o),de(l)}function Mn(r,t,e,n){const i=r.distanceTo(t),s=new ft(Po(e,i,e),n);return s.position.copy(r).add(t).multiplyScalar(.5),s.quaternion.setFromUnitVectors(new T(0,1,0),t.clone().sub(r).normalize()),de(s)}function ou(r,t,e){const n=new To(r,{depth:t,bevelEnabled:!1});return n.translate(0,0,-t/2),de(new ft(n,e))}const Se=40,Te=28,ur=Array.from({length:Te},()=>Array.from({length:Se},()=>"g")),nm=(r,t)=>r>=0&&t>=0&&r<Se&&t<Te,Yi=(r,t,e,n,i)=>{for(let s=t;s<t+n;s++)for(let o=r;o<r+e;o++)nm(o,s)&&(ur[s][o]=i)};for(let r=0;r<Se;r++)ur[0][r]="#",ur[Te-1][r]="#";for(let r=0;r<Te;r++)ur[r][0]="#",ur[r][Se-1]="#";Yi(1,13,Se-2,3,"d");Yi(19,0,3,Te-1,"d");Yi(1,24,18,3,"w");Yi(19,24,3,3,"d");Yi(3,3,6,5,"T");Yi(30,4,7,6,"T");Yi(4,18,7,4,"T");Yi(29,18,8,4,"T");const xi=(r,t)=>nm(r,t)?ur[t][r]:"#",au=[];function me(r,t,e,n){au.push({x0:Math.min(r,e),z0:Math.min(t,n),x1:Math.max(r,e),z1:Math.max(t,n)})}function im(){return au}function kS(r,t,e=0){if(r-e<.15||r+e>Se-.15||t+e>Te-.15)return!0;if(t-e<.05)return!(r>19.2&&r<21.8);for(const[n,i]of[[-e,-e],[e,-e],[-e,e],[e,e],[0,0]]){const s=xi(Math.floor(r+n),Math.floor(t+i));if(s==="#"||s==="w")return!0}for(const n of au)if(r+e>n.x0&&r-e<n.x1&&t+e>n.z0&&t-e<n.z1)return!0;return!1}function VS(r,t){const e=r-.5,n=t-.5,i=Math.floor(e),s=Math.floor(n),o=e-i,a=n-s,l=(c,h)=>xi(c,h)==="w"?1:0;return l(i,s)*(1-o)*(1-a)+l(i+1,s)*o*(1-a)+l(i,s+1)*(1-o)*a+l(i+1,s+1)*o*a}function HS(r,t){const e=r-.5,n=t-.5,i=Math.floor(e),s=Math.floor(n),o=e-i,a=n-s,l=(c,h)=>xi(c,h)==="d"?1:0;return l(i,s)*(1-o)*(1-a)+l(i+1,s)*o*(1-a)+l(i,s+1)*(1-o)*a+l(i+1,s+1)*o*a}function ge(r,t){let e=(ue(r*.09,t*.09,5,3)-.5)*.45;e*=1-HS(r,t)*.9,e-=VS(r,t)*.55;const n=Math.min(r,t,Se-r,Te-t);return n<1.6&&(e+=(1.6-n)*.55),t<1.6&&r>18.6&&r<22.4&&(e=Math.min(e,.05)),e}const GS=-.3,W={barn:()=>be("barnRed",ve.barnRed()),grey:()=>be("greyBoards",ve.greyBoards()),white:()=>be("whiteSiding",ve.whiteSiding()),tin:()=>be("corrugated",ve.corrugated(),{metalness:.25,roughness:.7}),shingle:()=>be("shingles",ve.shingles()),concrete:()=>be("concrete",ve.concrete()),steel:()=>be("steel",ve.steel(),{metalness:.35,roughness:.65}),tank:()=>be("rustTank",ve.rustTank(),{metalness:.25,roughness:.7}),bin:()=>be("binRibs",ve.binRibs(),{metalness:.3,roughness:.7}),brick:()=>be("brick",ve.brick()),deck:()=>be("deck",ve.deck()),wood:()=>be("oldWood",ve.oldWood()),hazard:()=>be("hazard",ve.hazard()),hay:()=>be("hay",ve.hay()),vine:()=>be("vines",ve.vines(),{alphaTest:.5,side:tn}),trim:()=>dn("#cdc5b2"),dark:()=>dn("#0d0c0b",{roughness:1}),glass:()=>be("glass",ve.glass(),{roughness:.25}),boarded:()=>be("boarded",ve.boarded())};let zc=null;function WS(){if(!zc){const r=new Oe(16,16);for(let t=0;t<16;t++)for(let e=0;e<16;e++){const n=e%4===0||t%4===0;r.set(e,t,[70,76,82],n?255:0)}zc=r.texture()}return be("cage",zc,{alphaTest:.5,side:tn,metalness:.4})}function XS(r,t,e,n){const i=[[0,0],[-e/2,-n/2],[e/2,-n/2],[-e/2,n/2],[e/2,n/2]];return i.reduce((s,[o,a])=>s+ge(r+o,t+a),0)/i.length}function $l(r,t,e,n=W.concrete()){r.add(tt(t+.12,.7,e+.12,n,0,-.62,0))}function ys(r,t,e,n,i,s,o=.09){const a=Math.hypot(e-r,n-t),l=Math.atan2(n-t,e-r),c=new ft(Po(a+.14,o,i),s);return c.position.set((r+e)/2-Math.sin(l)*o*.6,(t+n)/2+Math.cos(l)*o*.6,0),c.rotation.z=l,de(c)}function lu(r){const t=new ki;return r.forEach(([e,n],i)=>i?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t}function Gn(r,t,e,n,i,s,o=0,a="glass"){const l=new ft(new Ye(i,s),a==="glass"?W.glass().clone():W.boarded()),c=new Gt;return c.position.set(t,e,n),c.rotation.y=o,l.position.z=.012,c.add(l),c.add(tt(i+.16,.06,.08,W.trim(),0,-s/2-.06,.03)),c.add(tt(i+.12,.06,.06,W.trim(),0,s/2,.02)),r.add(c),l}function Be(r,t,e,n,i,s,o=0){const a=new ft(ru(i,s),W.vine());a.position.set(t,e+s/2,n),a.rotation.y=o,a.castShadow=!0,a.receiveShadow=!0,r.add(a)}function Ei(r,t,e,n,i,s){return r.position.set(t,XS(t,e,n,i),e),s.add(r),r}function qS(r,t,e){const n=new Gt,i=5,s=3.2,o=2.4;$l(n,i,s,W.wood()),n.add(tt(i,o,s,W.barn()));const a=[[-i/2,o],[-1.95,3.45],[0,4.05],[1.95,3.45],[i/2,o]];n.add(ou(lu(a),s,W.barn()));const l=[[-i/2-.22,o-.12],...a.slice(1,4),[i/2+.22,o-.12]];for(let f=0;f<l.length-1;f++)n.add(ys(l[f][0],l[f][1],l[f+1][0],l[f+1][1],s+.5,W.tin()));for(const f of[-1,1])n.add(tt(.12,o,.12,W.trim(),f*(i/2),0,s/2+.02));for(let f=0;f<a.length-1;f++){const p=new T(a[f][0],a[f][1],s/2+.04),_=new T(a[f+1][0],a[f+1][1],s/2+.04);n.add(Mn(p,_,.1,W.trim()))}n.add(tt(1.9,1.95,.05,W.dark(),0,.02,s/2+.01));const c=f=>{const p=new Gt;p.add(tt(.9,1.9,.07,W.barn(),0,0,0));for(const[_,g,m,v]of[[0,0,.9,.08],[0,1.82,.9,.08],[-.41,0,.08,1.9],[.41,0,.08,1.9]])p.add(tt(m,v,.09,W.trim(),_,g,.01));return p.add(Mn(new T(-.4,.08,.05),new T(.4,1.82,.05),.07,W.trim())),p.add(Mn(new T(.4,.08,.05),new T(-.4,1.82,.05),.07,W.trim())),p.position.set(f,.02,s/2+.07),p};n.add(c(-.47),c(1.35)),n.add(tt(2.9,.07,.07,W.steel(),.45,1.98,s/2+.06)),n.add(tt(.95,.85,.05,W.dark(),0,2.7,s/2+.01));const h=tt(.5,.85,.06,W.barn(),0,0,0),u=new Gt;u.position.set(-.48,2.7,s/2+.04),h.position.set(.25,.425,0),u.add(h),u.rotation.y=-1.1,n.add(u),n.add(tt(1.1,.07,.3,W.trim(),0,3.6,s/2+.05)),n.add(tt(.7,.55,.7,W.barn(),0,3.95,0)),n.add(tt(.72,.3,.72,W.dark(),0,4.05,0));const d=new ft(si(.02,.62,.45,4),W.tin());d.rotation.y=Math.PI/4,d.position.set(0,4.72,0),n.add(de(d)),n.add(tt(.03,.55,.03,W.steel(),0,4.9,0)),n.add(tt(.5,.04,.04,W.steel(),.06,5.3,0)),Gn(n,-i/2-.01,1.4,.6,.6,.6,-Math.PI/2,"boarded"),Gn(n,i/2+.01,1.4,-.3,.6,.6,Math.PI/2);for(const[f,p,_]of[[-2,2.15,.2],[-1.2,2.45,-.4]]){const g=new ft(si(.48,.48,.8,14),W.hay());g.rotation.set(0,_,Math.PI/2),g.position.set(f,.46,p),n.add(de(g))}return Be(n,-1.9,0,s/2+.06,1.3,2.2),Be(n,i/2+.07,0,.6,1.6,1.6,Math.PI/2),Be(n,1.9,0,s/2+.06,.8,1.1),Ei(n,t,e,i,s,r),me(t-i/2,e-s/2,t+i/2,e+s/2),me(t-2.5,e+s/2,t-.7,e+s/2+.95),{}}function sf(r,t,e,n,i){const s=new Gt,o=4.2,a=2,l=2.2,c=1,h=-c/2,u=n===0?W.grey():W.white();$l(s,o,a+c,W.brick()),s.add(tt(o,l,a,u,0,0,h));const d=ou(lu([[-a/2,l],[a/2,l],[0,l+1]]),o,u);d.rotation.y=Math.PI/2,d.position.z=h,s.add(d);const f=new Gt;f.add(ys(-a/2-.35,l-.18,0,l+1,o+.5,W.shingle())),f.add(ys(0,l+1,a/2+.35,l-.18,o+.5,W.shingle())),f.rotation.y=Math.PI/2,f.position.z=h,s.add(f);const p=tt(.42,1.9,.42,W.brick(),1.25,1.6,h-.25);n===1&&(p.rotation.z=.06),s.add(p);const _=a/2+h+c/2;s.add(tt(o+.2,.22,c,W.deck(),0,0,_));for(const b of[-o/2,-.7,.7,o/2])s.add(tt(.12,1.95,.12,W.trim(),b,.22,_+c/2-.08));for(const b of[-1.4,1.4])s.add(tt(1.3,.06,.05,W.trim(),b,.85,_+c/2-.08));const g=ys(-c/2-.3,1.95,c/2+.2,2.24,o+.4,W.shingle(),.08),m=new Gt;m.add(g),m.rotation.y=Math.PI/2,m.position.z=_,n===1&&(m.rotation.x=.07),s.add(m),s.add(tt(1,.11,.35,W.deck(),0,0,_+c/2+.17));const v=h+a/2+.01;s.add(tt(.78,1.55,.05,W.wood(),0,.22,v)),s.add(tt(.9,.08,.06,W.trim(),0,1.78,v+.01));const x=[];x.push(Gn(s,-1.35,1.3,v,.7,.75,0,n===1?"boarded":"glass")),x.push(Gn(s,1.35,1.3,v,.7,.75,0,"glass")),Gn(s,-o/2-.01,1.3,h,.6,.7,-Math.PI/2,"boarded"),Gn(s,o/2+.01,1.3,h,.6,.7,Math.PI/2),s.add(Rn(.26,.26,.7,W.steel(),o/2+.2,0,h+a/2+.25,10)),s.add(tt(.9,.38,.32,W.wood(),-1.4,.22,_-.25)),Be(s,-o/2+.6,.2,_+c/2-.02,.9,1.9),Be(s,o/2+.07,0,h,1.4,1.7,Math.PI/2),n===1&&Be(s,.9,l-.4,v+.02,1.4,.9),Ei(s,t,e,o,a+c,r),me(t-o/2-.1,e-(a+c)/2,t+o/2+.1,e+(a+c)/2+.3);const P=x[1].material;P.emissive=new it("#ffb05a"),P.emissiveMap=ve.glassLit(),P.emissiveIntensity=0;const E=we(n+9);let C=0,R=!1;return{update(b){i&&(b>C&&(R=!R,C=b+(R?.05+E()*.25:2.5+E()*6)),P.emissiveIntensity=R?2.2:0)}}}function YS(r,t,e){const n=new Gt,i=3,s=3,o=2.5;$l(n,i,s+.6,W.concrete()),n.add(tt(i,o,s,W.white(),0,0,-.3)),n.add(ou(lu([[-i/2,o],[i/2,o],[0,o+1.3]]),s,W.white()).translateZ(-.3));const a=new Gt;a.add(ys(-i/2-.25,o-.18,0,o+1.3,s+.4,W.shingle())),a.add(ys(0,o+1.3,i/2+.25,o-.18,s+.4,W.shingle())),a.position.z=-.3,n.add(a);const l=s/2-.05;n.add(tt(1.1,3.6,1.1,W.white(),0,0,l));for(const[d,f]of[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]])n.add(tt(.13,.8,.13,W.white(),d,3.6,l+f));const c=new ft(si(.14,.3,.42,12),dn("#6b5a3a",{metalness:.6,roughness:.45}));c.position.set(0,3.95,l),n.add(de(c)),n.add(tt(1.24,.12,1.24,W.trim(),0,4.4,l));const h=new ft(si(.02,.88,1.9,4),W.shingle());h.rotation.y=Math.PI/4,h.position.set(0,4.52+.95,l),n.add(de(h));const u=new Gt;u.add(tt(.05,.5,.05,W.steel(),0,0,0)),u.add(tt(.28,.05,.05,W.steel(),0,.3,0)),u.position.set(0,6.4,l),u.rotation.z=.12,n.add(u),n.add(tt(.72,1.55,.05,W.wood(),0,0,l+.56)),n.add(tt(.06,1.55,.06,W.dark(),0,0,l+.59));for(const d of[-1,1])Gn(n,d*(i/2+.01),1.4,-.9,.45,1,d*Math.PI/2,d<0?"boarded":"glass"),Gn(n,d*(i/2+.01),1.4,.4,.45,1,d*Math.PI/2);return Gn(n,-.95,1.4,s/2-.29,.4,.9,0),Gn(n,.95,1.4,s/2-.29,.4,.9,0,"boarded"),Be(n,-i/2-.07,0,-.3,2.6,2.4,-Math.PI/2),Be(n,-.4,0,l+.57,.7,1.4),Be(n,.55,1.8,l+.57,.5,1.1),Ei(n,t,e,i,s+.6,r),me(t-i/2,e-s/2-.3,t+i/2,e+s/2+.5),{}}function ZS(r,t,e){const n=new Gt,i=4.1,s=[[-1.05,-1.05],[1.05,-1.05],[-1.05,1.05],[1.05,1.05]],o=(f,p)=>new T(f*.8,i,p*.8);for(const[f,p]of s)n.add(Mn(new T(f,0,p),o(f,p),.13,W.steel())),n.add(tt(.34,.3,.34,W.concrete(),f,-.1,p));const a=[[0,1],[1,3],[3,2],[2,0]];for(const[f,p]of a){const[_,g]=s[f],[m,v]=s[p];for(const[x,y]of[[.35,2.1],[2.1,3.9]]){const P=1-x/i*.2,E=1-y/i*.2,C=new T(_*P,x,g*P),R=new T(m*E,y,v*E),b=new T(m*P,x,v*P),M=new T(_*E,y,g*E);n.add(Mn(C,R,.04,W.steel()),Mn(b,M,.04,W.steel()))}}n.add(Rn(1.35,1.35,1.9,W.tank(),0,i+.05,0,22));const l=new ft(si(.06,1.5,.95,22),W.tank());l.position.set(0,i+1.95+.47,0),n.add(de(l)),n.add(Rn(1.75,1.75,.06,W.steel(),0,i,0,22));const c=new ft(new wi(1.72,.025,4,32),W.steel());c.rotation.x=Math.PI/2,c.position.y=i+.55,n.add(de(c));for(let f=0;f<12;f++){const p=f/12*Math.PI*2;n.add(tt(.03,.55,.03,W.steel(),Math.cos(p)*1.72,i,Math.sin(p)*1.72))}const h=new ft(new Xn(1.36,1.36,.36,22,1,!0,-.9,1.8),dn("#9aa6a2",{roughness:.8}));h.position.set(0,i+1.2,0),n.add(h);const u=.62,d=1.18;for(const f of[-.16,.16])n.add(tt(.035,i,.035,W.steel(),u+f,0,d));for(let f=.3;f<i;f+=.3)n.add(tt(.32,.03,.03,W.steel(),u,f,d));Be(n,-1,0,1.06,.55,2.4),Be(n,1,0,-1,.55,1.6,Math.PI),Ei(n,t,e,2.2,2.2,r);for(const[f,p]of s)me(t+f-.2,e+p-.2,t+f+.2,e+p+.2);return{}}function $S(r,t,e){const n=new Gt,i=5.2,s=.65,o=.18,a=(p,_,g)=>{const m=g/i,v=s+(o-s)*m;return new T(p*v,g,_*v)},l=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[p,_]of l)n.add(Mn(a(p,_,0),a(p,_,i),.07,W.steel()));const c=[.4,1.5,2.6,3.6,4.5,i];for(let p=0;p<4;p++){const[_,g]=l[p],[m,v]=l[(p+1)%4];for(const x of c)n.add(Mn(a(_,g,x),a(m,v,x),.04,W.steel()));for(let x=0;x<c.length-1;x++){const y=c[x],P=c[x+1];n.add(Mn(a(_,g,y),a(m,v,P),.03,W.steel()))}}n.add(tt(.6,.06,.6,W.wood(),0,i,0)),n.add(tt(.34,.3,.55,W.steel(),0,i+.08,0)),n.add(tt(.04,i,.04,W.steel(),0,0,0)),n.add(tt(.06,.06,1.4,W.steel(),0,i+.2,-.85)),n.add(tt(.03,.62,.95,W.tin(),0,i+.02,-1.55));const h=new Gt;h.position.set(0,i+.24,.42);const u=18;for(let p=0;p<u;p++){if(p===3||p===4||p===11)continue;const _=p/u*Math.PI*2,g=new ft(Po(.16,.95,.025),W.tin());g.position.set(Math.sin(_)*.68,Math.cos(_)*.68,0),g.rotation.order="ZYX",g.rotation.set(0,.35,-_),h.add(de(g))}const d=new ft(new wi(1.08,.025,4,28),W.steel());h.add(de(d)),h.add(de(new ft(new wi(.36,.025,4,18),W.steel()))),h.add(de(new ft(si(.09,.09,.2,8).rotateX(Math.PI/2),W.steel()))),n.add(h),n.add(Rn(.75,.75,.5,W.steel(),1.25,0,.25,18));const f=new ft(new xr(.71,18),dn("#2e4a48",{roughness:.15,metalness:.1}));return f.rotation.x=-Math.PI/2,f.position.set(1.25,.43,.25),n.add(f),Be(n,-.55,0,.6,.5,1.9),Ei(n,t,e,1.4,1.4,r),me(t-.7,e-.7,t+.7,e+.7),me(t+.5,e-.5,t+2,e+1),{update:p=>{h.rotation.z=-p*.55}}}function JS(r,t,e,n){const i=new Gt,s=4.4,o=3.6,a=3;$l(i,s,o),i.add(tt(s,a,o,W.concrete())),i.add(tt(s-.3,.35,o-.3,W.concrete(),0,a,0)),i.add(tt(1.3,6.4,1.5,W.concrete(),1.45,0,-.6)),i.add(ys(.7,6.4,2.2,6.75,1.7,W.tin()).translateZ(-.6));for(let _=3.6;_<6.2;_+=.9)Gn(i,1.45,_,.16,.5,.35,0,"boarded");for(const _ of[-1.25,.25]){i.add(Rn(.85,.85,6,W.concrete(),_,0,-2.55,20));const g=new ft(new ii(.86,16,8,0,Math.PI*2,0,Math.PI/2),W.concrete());g.position.set(_,6,-2.55),i.add(de(g)),Be(i,_-.3,0,-1.68,.7,2.6)}i.add(tt(2.9,.55,.55,W.tin(),-.25,5.55,-1.65));const l=o/2;i.add(tt(1.9,2.3,.22,W.concrete(),0,0,l+.06)),i.add(tt(1.5,2,.05,dn("#ffcf8a",{emissive:"#ffb867",emissiveIntensity:n?3.2:1.6}),0,0,l+.1));for(const[_,g,m,v]of[[-.86,0,.14,2.1],[.86,0,.14,2.1],[0,2.02,1.86,.14]])i.add(tt(m,v,.06,W.hazard(),_,g,l+.2));i.add(tt(.74,1.98,.14,W.steel(),-.37,0,l+.18));const c=new Gt;c.position.set(.74,0,l+.2);const h=tt(.74,1.98,.14,W.steel(),-.37,0,0);c.add(h),c.add(tt(.1,.5,.06,W.steel(),-.62,.8,.09)),c.rotation.y=-1.05,i.add(c);const u=new ql("#ffb867",n?14:6,7,1.6);u.position.set(0,1,l+.7),i.add(u);const d=new ft(new Ye(2.4,.6),new An({map:em("CO-OP",{w:64,h:16,fg:"#24221c",font:"bold 14px monospace",worn:.32}),alphaTest:.5,roughness:1}));d.position.set(-.05,2.62,l+.012),d.receiveShadow=!0,i.add(d),i.add(tt(.06,.06,.4,W.steel(),0,2.38,l+.2));const f=new ft(new ii(.08,8,6),dn("#ffd27a",{emissive:"#ffb050",emissiveIntensity:n?6:.4}));f.position.set(0,2.3,l+.4),i.add(f),i.add(tt(1.3,.55,.9,W.concrete(),-1.5,0,l+.45)),i.add(tt(.5,.5,.5,W.wood(),-1.75,.55,l+.4)),i.add(tt(.4,.4,.4,W.wood(),-1.25,.55,l+.55)),i.add(Rn(.07,.07,a+.3,W.tank(),s/2-.05,0,l-.05,8));const p=we(404);for(let _=0;_<7;_++){const g=new ft(new vr(.1+p()*.16,0),W.concrete());g.position.set(-2.1+p()*4.2,.05,l+.3+p()*.4),g.rotation.set(p()*3,p()*3,p()*3),Math.abs(g.position.x)>.95&&i.add(de(g))}return Be(i,-s/2-.07,0,0,3.2,2.6,-Math.PI/2),Be(i,-1.7,.55,l+.03,.9,1.9),Be(i,1.8,0,l+.03,.7,2.4),Ei(i,t,e,s,o,r),me(t-s/2,e-o/2,t+s/2,e+o/2),me(t-2.15,e+o/2,t-.85,e+o/2+.9),me(t-2.2,e-3.5,t+1.2,e-1.6),{}}function KS(r,t,e){const n=new Gt;n.add(Rn(.78,.82,4.6,W.concrete(),0,-.3,0,20));const i=new ft(new ii(.8,16,8,0,Math.PI*2,0,Math.PI/2),W.tin());i.position.y=4.3,n.add(de(i));for(const s of[-.13,.13])n.add(tt(.03,4.2,.03,W.steel(),s,0,.82));for(let s=.3;s<4.2;s+=.3)n.add(tt(.26,.03,.03,W.steel(),0,s,.82));return Be(n,-.55,0,.6,.8,2,-.6),Ei(n,t,e,1.6,1.6,r),me(t-.8,e-.8,t+.8,e+.8),{}}function QS(r,t,e){const n=new Gt,i=(t[0]+t[t.length-1])/2;return t.forEach((s,o)=>{const a=new Gt;a.add(Rn(.78,.78,2.6,W.bin(),0,0,0,20));const l=new ft(si(.14,.86,.6,20),W.tin());l.position.y=2.9,a.add(de(l)),a.add(Rn(.16,.16,.18,W.steel(),0,3.2,0,8)),a.position.x=s-i,o===1&&(a.rotation.z=.04),n.add(a)}),n.add(tt(t[t.length-1]-t[0]+.6,.06,.42,W.steel(),0,3.25,0)),n.add(Mn(new T(t[0]-i-2,.25,.9),new T(t[0]-i-.2,3.1,.15),.18,W.tank())),Be(n,t[0]-i-.4,0,.79,.9,1.6),Be(n,t[2]-i+.2,0,.79,.7,1.1),Ei(n,i,e,t[t.length-1]-t[0]+1.6,1.6,r),me(t[0]-.8,e-.8,t[t.length-1]+.8,e+.8),{}}function jS(r,t,e,n){const i=new Gt;i.add(tt(1.9,.18,1.5,W.concrete(),0,-.05,0));for(const[u,d,f,p]of[[0,-.7,1.9,.12],[0,.7,1.9,.12],[-.9,0,.12,1.5],[.9,0,.12,1.5]])i.add(tt(f,.04,p,W.hazard(),u,.13,d));i.add(tt(1.5,.05,1.1,W.steel(),0,.12,0));const s=2.2;for(const[u,d]of[[-.7,-.5],[.7,-.5],[-.7,.5],[.7,.5]])i.add(tt(.08,s,.08,W.steel(),u,.12,d));i.add(tt(1.5,.1,1.1,W.steel(),0,s+.1,0));const o=WS();for(const[u,d,f,p]of[[0,-.5,0,1.4],[-.7,0,Math.PI/2,1],[.7,0,Math.PI/2,1]]){const _=new ft(ru(p,s-.1),o);_.position.set(u,.17+(s-.1)/2,d),_.rotation.y=f,_.castShadow=!0,i.add(_)}const a=new ft(new wi(.28,.05,6,16),W.steel());a.position.set(0,s+.5,0),i.add(de(a)),i.add(tt(.06,.4,.06,W.steel(),0,s+.15,0)),i.add(tt(.07,2.6,.07,W.steel(),1.15,0,.55)),i.add(tt(.5,.05,.05,W.steel(),.92,2.55,.55));const l=new ft(new ii(.09,8,6),dn("#ffd890",{emissive:"#ffb050",emissiveIntensity:n?7:1.2}));l.position.set(.7,2.47,.55),i.add(l);const c=new ql("#ffb867",n?9:2.5,6,1.7);c.position.set(.7,2.3,.6),i.add(c),i.add(tt(.2,.3,.12,W.steel(),-.95,.9,.55));const h=new ft(new ii(.03,6,4),dn("#7dff9a",{emissive:"#3dff7a",emissiveIntensity:3}));return h.position.set(-.95,1.12,.62),i.add(h),Ei(i,t,e,1.9,1.5,r),me(t-.8,e-.6,t+.8,e+.4),{update:u=>{h.visible=Math.floor(u*1.4)%2===0}}}function tb(r,t,e,n,i){const s=new Gt,o=we(808),a=[t+2,t+3.1],l=(p,_,g,m)=>{const v=Math.hypot(g-p,m-_),x=Math.ceil(v/1.1);for(let y=0;y<=x;y++){const P=p+(g-p)*y/x,E=_+(m-_)*y/x;if(_===e&&m===e&&P>a[0]&&P<a[1])continue;const C=tt(.12,1.05,.12,W.wood(),P,ge(P,E)-.05,E);if(C.rotation.z=(o()-.5)*.12,s.add(C),y===x)continue;const R=p+(g-p)*(y+1)/x,b=_+(m-_)*(y+1)/x;if(!(_===e&&m===e&&(P>a[0]-1.2&&P<a[1]||R>a[0]&&R<a[1]+1.2)))for(const M of[.42,.82]){if(o()<.12)continue;const L=new T(P,ge(P,E)+M,E),k=new T(R,ge(R,b)+M-(o()<.1?.3:0),b);s.add(Mn(L,k,.07,W.wood()))}}};l(t,e,n,e),l(n,e,n,i),l(n,i,t,i),l(t,i,t,e);const c=new Gt;c.position.set(a[1],ge(a[1],e),e);for(const p of[.35,.7,1])c.add(tt(1.1,.06,.05,W.wood(),-.55,p,0));c.add(tt(.06,1,.05,W.wood(),-1.08,0,0)),c.rotation.y=1.15,s.add(c);const h=t+2,u=e+1.1;s.add(tt(1.4,.42,.5,W.steel(),h,ge(h,u),u));const d=new ft(ru(1.3,.4),dn("#2e4a48",{roughness:.15}));d.rotation.x=-Math.PI/2,d.position.set(h,ge(h,u)+.36,u),s.add(d);for(const[p,_,g]of[[n-1,i-.8,0],[n-1,i-.8,.5],[n-1.9,i-.8,0]])s.add(tt(.85,.5,.48,W.hay(),p,ge(p,_)+g,_));r.add(s);const f=.22;return me(t-f,e-f,a[0],e+f),me(a[1],e-f,n+f,e+f),me(n-f,e,n+f,i),me(t-f,i-f,n+f,i+f),me(t-f,e,t+f,i),me(h-.7,u-.25,h+.7,u+.25),me(n-2.4,i-1.1,n-.5,i-.5),{}}function eb(r){const t=new Gt;t.add(tt(.35,1,3.4,W.concrete(),18.75,-.75,25.5));const e=new ft(new xr(.45,14),W.dark());e.rotation.y=-Math.PI/2,e.position.set(18.56,-.3,25.5),t.add(e);const n=new ft(new wi(.47,.06,6,16),W.steel());n.rotation.y=Math.PI/2,n.position.set(18.55,-.3,25.5),t.add(de(n));for(const i of[18.85,22.15]){for(let s=23.7;s<=27.3;s+=.9)t.add(tt(.12,.7,.12,W.wood(),i,ge(i,s)-.05,s));t.add(tt(.08,.14,3.7,W.wood(),i,ge(i,25.5)+.5,25.5))}return r.add(t),me(22,23.6,22.3,27.4),{}}const oe={bark:()=>be("bark",ve.bark()),wood:()=>be("oldWood",ve.oldWood()),rust:()=>be("rustTank",ve.rustTank(),{metalness:.25,roughness:.7}),steel:()=>be("steel",ve.steel(),{metalness:.35,roughness:.65}),concrete:()=>be("concrete",ve.concrete()),vine:()=>be("vines",ve.vines(),{alphaTest:.5,side:tn}),dark:()=>dn("#0d0c0b",{roughness:1})};function Io(r,t){const e=new Rs(r,1),n=e.attributes.position,i=new T;for(let o=0;o<n.count;o++){i.fromBufferAttribute(n,o);const a=.82+En(i.x*2.1+t,i.y*2.1+i.z*1.3,t)*.36;i.multiplyScalar(a),i.y*=.82,n.setXYZ(o,i.x,i.y,i.z)}const s=e.attributes.uv;for(let o=0;o<s.count;o++)s.setXY(o,s.getX(o)*r*6,s.getY(o)*r*3);return e.computeVertexNormals(),e}const rf=new Map;function Lo(r,t=!1){const e=r+t;let n=rf.get(e);return n||(n=new An({map:t?ve.leavesOlive():ve.leaves(),color:r,roughness:.95,flatShading:!0}),rf.set(e,n)),n}const cu=[];function Fr(r,t,e,n){const i=new Gt,s=we(n),o=1.7*e;i.add(Rn(.13*e,.24*e,o,oe.bark(),0,-.1,0,8));const a=new Gt;a.position.y=o*.92;const l=["#ffffff","#e8f2d0","#d6e8b8","#f2f6dc"],c=l[Math.floor(s()*l.length)];for(let h=0;h<6;h++){const u=s()*Math.PI*2,d=(h===0?0:.55+s()*.45)*e,f=new ft(Io((.62+s()*.38)*e,n+h),Lo(c));f.position.set(Math.cos(u)*d,(.35+s()*.75)*e,Math.sin(u)*d),a.add(de(f)),h>0&&s()>.4&&a.add(Mn(new T(0,-.2*e,0),f.position.clone().multiplyScalar(.7),.07*e,oe.bark()))}return i.add(a),cu.push({obj:a,phase:s()*6.28,amp:.018}),i.position.set(r,ge(r,t),t),i}function kc(r,t,e,n){const i=new Gt,s=we(n),o=new Gt;for(let a=0;a<3;a++){const l=a/3*6.28+s(),c=new T(Math.cos(l)*.55*e,1.2*e+s()*.3,Math.sin(l)*.55*e);i.add(Mn(new T(0,-.1,0),c,.1*e,oe.bark()));const h=new ft(Io((.55+s()*.25)*e,n+a),Lo("#ffffff",!0));h.scale.y=.55,h.position.copy(c).add(new T(0,.1,0)),o.add(de(h))}return i.add(o),cu.push({obj:o,phase:s()*6.28,amp:.012}),i.position.set(r,ge(r,t),t),i}function nb(r,t,e,n){const i=new Gt,s=we(n),o=(l,c,h,u,d)=>{const f=l.clone().add(c.clone().multiplyScalar(h));if(i.add(Mn(l,f,u,oe.bark())),d>0&&s()>.25)for(let p=0;p<2;p++){const _=c.clone().add(new T(s()-.5,s()*.3,s()-.5).multiplyScalar(1.4)).normalize();o(f,_,h*.65,u*.62,d-1)}else if(s()>.45){const p=new ft(Io(.18+s()*.12,n+d),Lo("#ffffff"));p.position.copy(f),i.add(de(p))}};o(new T(0,-.1,0),new T(.05,1,0),1.6*e,.2*e,3);const a=new ft(new Ye(.5,1.4),oe.vine());return a.position.set(0,.7,.13),i.add(a),i.position.set(r,ge(r,t),t),i}function Vc(r,t,e,n,i=!1){const s=new Gt,o=we(n);for(let a=0;a<3;a++){const l=new ft(Io((.35+o()*.2)*e,n+a*3),Lo("#ffffff",i));l.position.set((o()-.5)*.6*e,.22*e,(o()-.5)*.5*e),s.add(de(l))}return s.position.set(r,ge(r,t),t),s}function ib(r,t,e){const n=we(515),i=[];for(const[o,a,l]of t){const c=new Gt;c.add(Rn(.07,.1,4.3,oe.wood(),0,-.2,0,7));const h=n()<.15,u=tt(1.3,.1,.1,oe.wood(),0,3.85,0);h&&(u.rotation.z=.35),c.add(u);for(const d of[-.55,0,.55])c.add(Rn(.035,.035,.13,dn("#6f8f7a",{roughness:.3}),d,3.95,0,6));c.rotation.z=l,c.position.set(o,ge(o,a),a),c.updateMatrixWorld(!0),r.add(c),me(o-.12,a-.12,o+.12,a+.12),i.push([-.55,0,.55].map(d=>new T(d,4.05,0).applyMatrix4(c.matrixWorld)))}const s=new Un({color:"#1c1b1a"});for(const[o,a]of e)for(let l=0;l<3;l++){const c=i[o][l],h=i[a][l],u=c.clone().lerp(h,.5);u.y-=.35+c.distanceTo(h)*.035;const d=new Bl(c,u,h);r.add(new ft(new Ao(d,16,.014,3,!1),s))}}function sb(r,t,e){const n=new Gt,i=dn("#4f6a78",{roughness:.85,metalness:.2});n.add(tt(1,.55,1.3,oe.rust(),-.55,.32,0)),n.add(tt(.95,.42,1.25,i,.42,.32,0)),n.add(tt(.82,.5,1.2,i,-.12,.87,0)),n.add(tt(.05,.36,1,dn("#26313a",{roughness:.2}),.3,.95,0)),n.add(tt(1,.25,.06,oe.rust(),-.55,.87,.62)),n.add(tt(1,.25,.06,oe.rust(),-.55,.87,-.62)),n.add(tt(.06,.25,1.3,oe.rust(),-1.05,.87,0));for(const[a,l,c]of[[.55,.62,0],[.55,-.62,.08],[-.75,.62,.12],[-.75,-.62,0]]){const h=new ft(si(.27,.27,.2,12),dn("#1d1b19"));h.rotation.x=Math.PI/2,h.position.set(a,.27-c,l),n.add(de(h))}const s=new ft(Io(.4,71),Lo("#ffffff"));s.position.set(-.55,1.35,0),n.add(de(s)),n.add(tt(.06,.6,.06,oe.bark(),-.55,.7,0));const o=new ft(new Ye(.8,.6),oe.vine());o.position.set(-.1,.62,.66),n.add(o),n.position.set(t,ge(t,e)-.05,e),n.rotation.y=.18,r.add(n),me(t-1.2,e-.75,t+1,e+.75)}function rb(r,t,e){const n=new Gt;n.add(tt(.6,.6,.6,oe.wood(),0,0,0)),n.add(tt(.5,.5,.5,oe.wood(),.62,0,.05)),n.add(tt(.45,.45,.45,oe.wood(),.15,.6,.02).rotateY(.3)),n.add(Rn(.26,.26,.75,oe.rust(),1.25,0,.1,10)),n.position.set(t,ge(t,e),e),r.add(n),me(t-.35,e-.35,t+1.55,e+.4)}function ob(r,t,e){const n=new Gt;n.add(tt(.09,1.25,.09,oe.wood(),-.5,0,0)),n.add(tt(.09,1.1,.09,oe.wood(),.5,0,0));const i=new ft(Po(1.3,.5,.06),[oe.wood(),oe.wood(),oe.wood(),oe.wood(),new An({map:em("THE FIELD",{w:64,h:24,bg:"#7d6b52",fg:"#efe6d0",font:"bold 11px monospace",worn:.3,seed:3}),roughness:1}),oe.wood()]);i.position.set(0,1,.05),i.rotation.z=-.05,n.add(de(i)),n.position.set(t,ge(t,e),e),n.rotation.y=-.25,r.add(n),me(t-.6,e-.12,t+.6,e+.12)}function ab(r,t,e){const n=new Gt;n.add(tt(.1,.9,.1,oe.wood(),-.6,0,0)),n.add(tt(.1,.9,.1,oe.wood(),.6,0,0)),n.add(tt(1.4,.08,.08,oe.wood(),0,.82,0)),n.position.set(t,ge(t,e),e),r.add(n),me(t-.7,e-.1,t+.7,e+.1)}function lb(r){const t=[[8.9,23.35,.08],[9.8,23.5,-.15],[11.15,23.35,.05]];for(const[n,i,s]of t){const o=new Gt;o.add(tt(.36,.42,.1,oe.concrete(),0,0,0));const a=new ft(si(.18,.18,.1,10).rotateX(Math.PI/2),oe.concrete());a.position.y=.42,o.add(de(a)),o.rotation.z=s,o.position.set(n,ge(n,i)-.04,i),r.add(o),me(n-.2,i-.1,n+.2,i+.1)}const e=new Gt;e.add(tt(.06,.7,.06,oe.wood(),0,0,0)),e.add(tt(.36,.06,.06,oe.wood(),0,.48,0)),e.position.set(10.45,ge(10.45,23.6),23.6),e.rotation.z=-.2,r.add(e)}function cb(r,t,e,n){const i=new ft(new Rs(.3,1),new An({color:"#8a7246",wireframe:!0})),s=we(n);i.rotation.set(s()*3,s()*3,s()*3),i.position.set(t,ge(t,e)+.26,e),i.castShadow=!0,r.add(i)}function hb(r){const t=we(909),e=new Xn(.012,.018,1,3).translate(0,.5,0),n=new Xn(.035,.035,.18,5).translate(0,1,0),i=160,s=new vs(e,new cr({color:"#5f7a34"}),i),o=new vs(n,new cr({color:"#5a3a22"}),i),a=new Ft,l=new nn,c=new fn;for(let h=0;h<i;h++){const u=1.2+t()*17.2,d=t()<.75?23.75+t()*.45:26.8+t()*.3;c.set((t()-.5)*.25,0,(t()-.5)*.25),l.setFromEuler(c);const f=.55+t()*.5;a.compose(new T(u,ge(u,d)-.05,d),l,new T(1,f,1)),s.setMatrixAt(h,a),o.setMatrixAt(h,a)}s.receiveShadow=o.receiveShadow=!0,r.add(s,o);for(let h=0;h<22;h++){const u=1.2+t()*17,d=23.9+t()*.3,f=new ft(new vr(.1+t()*.15,0),oe.concrete());f.position.set(u,ge(u,d),d),f.scale.y=.6,r.add(de(f))}}function ub(r,t){const e=t?140:220,n=new Wt,i=new Float32Array(e*3),s=new Float32Array(e*3),o=we(321);for(let c=0;c<e;c++)i[c*3]=(o()-.5)*26,i[c*3+1]=.3+o()*(t?2.2:3.5),i[c*3+2]=(o()-.5)*18;n.setAttribute("position",new pe(s,3));const a=new Ul({color:t?"#c8ff70":"#fff2c8",size:t?.09:.055,transparent:!0,opacity:t?1:.75,blending:Kr,depthWrite:!1,sizeAttenuation:!0}),l=new zh(n,a);return l.frustumCulled=!1,r.add(l),(c,h)=>{for(let u=0;u<e;u++){const d=i[u*3],f=i[u*3+1],p=i[u*3+2];let _=d+Math.sin(c*.21+u)*.6+c*.12,g=p+Math.cos(c*.17+u*1.3)*.5;_=((_-h.x)%26+39)%26-13+h.x,g=((g-h.z)%18+27)%18-9+h.z,s[u*3]=_,s[u*3+1]=f+Math.sin(c*.6+u*.7)*.18,s[u*3+2]=g}n.attributes.position.needsUpdate=!0,t&&(a.opacity=.65+Math.sin(c*3.1)*.35)}}function db(r,t){const e=(o,a)=>{r.add(o),a&&me(o.position.x-a[0],o.position.z-a[1],o.position.x+a[0],o.position.z+a[1])},n=[[4.5,10.5,"c",1],[13.5,5.5,"c",1.15],[27.5,7.4,"m",1.2],[37.5,16.6,"c",.95],[3.5,16.6,"m",1],[34.5,16.6,"c",.9],[6.5,8.4,"d",1],[24.5,4.5,"c",1.05],[11.6,18.4,"m",.9],[30.5,25.5,"c",1],[16.6,5,"d",1.1]];let i=1e3;for(const[o,a,l,c]of n){const h=l==="c"?Fr(o,a,c,i++):l==="m"?kc(o,a,c,i++):nb(o,a,c,i++);e(h,[.25,.25])}const s=we(4242);for(let o=-6;o<Se+6;o+=1.6+s()*1.2)o>17.6&&o<23.4||(e(Fr(o,-.4-s()*3.5,1.15+s()*.5,i++)),s()>.5&&e(Fr(o+.8,.5+s()*.4,.8+s()*.3,i++)));for(let o=1;o<Te+2;o+=1.5+s()*1.3)e(s()>.3?Fr(-.6-s()*2.5,o,1+s()*.4,i++):kc(-.5,o,1.2,i++)),e(s()>.3?Fr(Se+.6+s()*2.5,o,1+s()*.4,i++):kc(Se+.5,o,1.2,i++));for(let o=0;o<Se;o+=1.1+s()*1.4)e(Vc(o,Te-.35+s()*.6,.9+s()*.5,i++,s()>.6));for(const[o,a,l]of[[5,12.9,.8],[9.9,12.9,.7],[14,12.85,.9],[26.3,12.8,.8],[31.6,12.75,.9],[8.4,22.2,.8],[17.9,22.6,.7],[24,21.6,.8],[33.5,22.9,.7]])e(Vc(o,a,l,i++));for(let o=0;o<26;o++){const a=1.5+s()*(Se-3),l=1.5+s()*(Te-3);xi(Math.floor(a),Math.floor(l))==="g"&&e(Vc(a,l,.55+s()*.4,i++,s()>.5))}ib(r,[[2.6,12.85,.02],[10.4,12.85,-.04],[18.85,12.85,0],[25.6,12.85,.09],[33.1,12.85,.01],[38.4,12.85,-.05],[22.35,8.4,.03],[22.35,3.4,-.07]],[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7]]),sb(r,7.1,16.9),rb(r,22.5,12.1),ob(r,22.7,16.7),ab(r,15.2,16.5),lb(r),hb(r);for(const[o,a,l]of[[26.8,16.4,1],[6.6,14.2,2],[14.4,9,3]])cb(r,o,a,l);return{update(o){for(const a of cu)a.obj.rotation.z=Math.sin(o*.9+a.phase)*a.amp},motes:ub(r,t)}}const Dn=r=>{const t=parseInt(r.slice(1),16);return[t>>16&255,t>>8&255,t&255]},fb=["#6c6a3a","#7d7a45","#8f8a52","#5c5c33"].map(Dn),of=["#3d6b26","#4f7f2f","#5f9536","#79ad47","#335c21"].map(Dn),af=["#2f5420","#355f22","#41702a","#2a4a1c"].map(Dn),pb=["#5f5c57","#6d6a64","#7a766e","#55524d"].map(Dn),mb=["#2f3a1d","#3d4a25","#4a5530","#5a5a35"].map(Dn),lf=["#3f3527","#4a3f2e","#55493a"].map(Dn),cf=["#e3c34a","#ece6d6","#5e6fd0","#c4473a","#b07ad0"].map(Dn);function gb(){const r=Se*Kn,t=Te*Kn,e=new Oe(r,t),n=we(2026);for(let s=0;s<t;s++)for(let o=0;o<r;o++){const a=(o+.5)/Kn,l=(s+.5)/Kn,c=a+(ue(a*.9,l*.9,9,2)-.5)*.75,h=l+(ue(a*.9,l*.9,19,2)-.5)*.75,u=xi(Math.floor(c),Math.floor(h)),d=n();let f;if(u==="d"){const p=ue(a*.6,l*.6,31,3);f=pb[Math.min(3,Math.floor(p*3.2+d*.9))];const _=ue(a*.55,l*.55,33,3);(Math.abs(_-.5)<.012||Math.abs(ue(a*1.3,l*1.3,34,2)-.5)<.008)&&(f=En(a*3,l*3,35)>.55?of[1+Math.floor(d*3)]:Dn("#3a3733")),Math.abs(l-14.5)<.06&&Math.floor(a*1.2)%3!==0&&ue(a*.5,2,36,2)>.38&&(f=Dn("#b49a52")),ue(a*.35,l*.35,37,2)>.74&&(f=d>.5?Dn("#7d6a4c"):Dn("#6a5a40"))}else if(u==="T")f=af[Math.floor(d*af.length)];else if(u==="w")f=lf[Math.floor(d*lf.length)];else if(u==="#")f=mb[Math.min(3,Math.floor(ue(a*.7,l*.7,41,2)*3+d*1.2))];else{const p=ue(a*.13,l*.13,3,3),_=p>.5?of:fb,g=ue(a*1.4,l*1.4,4,2);f=_[Math.min(_.length-1,Math.floor(g*_.length*.9+d*1.4))],p>.55&&d>.993?f=cf[Math.floor(n()*cf.length)]:d<.006&&(f=Dn("#6a5638"))}e.set(o,s,f)}for(const s of im())for(let o=s.z0-.4;o<s.z1+.4;o+=1/Kn)for(let a=s.x0-.4;a<s.x1+.4;a+=1/Kn){const l=Math.max(s.x0-a,0,a-s.x1),c=Math.max(s.z0-o,0,o-s.z1),h=Math.hypot(l,c),u=.72+Math.min(1,h/.4)*.28,d=Math.floor(a*Kn),f=Math.floor(o*Kn);if(d<0||f<0||d>=r||f>=t)continue;const p=e.get(d,f);e.set(d,f,[p[0]*u,p[1]*u,p[2]*u])}const i=e.texture({repeat:!1,worldSize:!1});return i.wrapS=i.wrapT=vn,i}function _b(r){const t=new Ye(Se,Te,Se*4,Te*4);t.rotateX(-Math.PI/2),t.translate(Se/2,0,Te/2);const e=t.attributes.position;for(let a=0;a<e.count;a++)e.setY(a,ge(e.getX(a),e.getZ(a)));t.computeVertexNormals();const n=new ft(t,new An({map:gb(),roughness:1,metalness:0}));n.receiveShadow=!0,r.add(n);const i=new An({color:"#34401f",roughness:1}),s=40;for(const a of[18.6,22.4]){const l=new ft(new Ye(s,.85),new An({color:"#2b2419",roughness:1,side:tn}));l.rotation.y=Math.PI/2,l.position.set(a,.45,-s/2),r.add(l)}for(const[a,l,c,h]of[[-s,-s,18.6,0],[22.4,-s,Se+s,0],[-s,Te,Se+s,Te+s],[-s,0,0,Te],[Se,0,Se+s,Te]]){const u=new ft(new Ye(c-a,h-l),i);u.rotation.x=-Math.PI/2,u.position.set((a+c)/2,.86,(l+h)/2),u.receiveShadow=!0,r.add(u)}const o=new ft(new Ye(3,s),new An({color:"#5f5c57",roughness:1}));o.rotation.x=-Math.PI/2,o.position.set(20.5,.06,-s/2),o.receiveShadow=!0,r.add(o)}function xb(r,t){const e=new qe({transparent:!0,uniforms:{uTime:{value:0},deep:{value:new it(t?"#0b1a24":"#1d3a38")},shallow:{value:new it(t?"#1d3346":"#4f7a6a")},sky:{value:new it(t?"#5f7fb0":"#e8d6b0")},fogColor:{value:new it},fogDensity:{value:0}},vertexShader:`
      varying vec3 vW; varying float vFog;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vec4 mv = viewMatrix * w;
        vFog = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform float uTime, fogDensity; uniform vec3 deep, shallow, sky, fogColor;
      varying vec3 vW; varying float vFog;
      float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec2 p = floor(vW.xz * 16.0) / 16.0; // ripples snap to the 16-texel world grid
        float rip = sin(p.x * 3.1 + uTime * 1.3 + sin(p.y * 2.0)) * 0.5 + sin(p.y * 4.3 - uTime * 0.9 + p.x) * 0.5;
        float band = smoothstep(0.78, 1.0, rip) * (0.5 + 0.5 * sin(p.x * 0.73 + p.y * 1.9 + uTime * 0.35));
        // depth: shallower near the banks (z 24 / 27)
        float edge = min(abs(p.y - 24.0), abs(p.y - 27.0));
        vec3 col = mix(shallow, deep, smoothstep(0.1, 1.2, edge));
        col = mix(col, sky, band * 0.1);
        // pixel-snapped sun glints
        vec2 q = floor(p * 16.0);
        float g = step(0.985, h(q + floor(uTime * 3.0))) * band;
        col += sky * g * 1.2;
        float f = 1.0 - exp(-fogDensity * fogDensity * vFog * vFog);
        col = mix(col, fogColor, f);
        gl_FragColor = vec4(col, 0.88);
      }`}),n=new Ye(18.6,3.6,1,1);n.rotateX(-Math.PI/2);const i=new ft(n,e);return i.position.set(.6+18.6/2,GS,25.5),r.add(i),s=>{e.uniforms.uTime.value=s;const o=r.fog;o&&(e.uniforms.fogColor.value.copy(o.color),e.uniforms.fogDensity.value=o.density)}}function vb(){const r=[],t=[],e=[],n=new it("#1e3a14"),i=new it("#9fd05a");for(let o=0;o<3;o++){const a=o/3*Math.PI+.3,l=Math.cos(a)*.07,c=Math.sin(a)*.07,h=(o-1)*.08,u=[[-l,0,-c,0],[l,0,c,0],[h*.5-l*.4,.55,-c*.4,.55],[l,0,c,0],[h*.5+l*.4,.55,c*.4,.55],[h*.5-l*.4,.55,-c*.4,.55],[h*.5-l*.4,.55,-c*.4,.55],[h*.5+l*.4,.55,c*.4,.55],[h,1,0,1]];for(const[d,f,p,_]of u){r.push(d,f,p);const g=n.clone().lerp(i,_);t.push(g.r,g.g,g.b),e.push(0,1,0)}}const s=new Wt;return s.setAttribute("position",new Mt(r,3)),s.setAttribute("color",new Mt(t,3)),s.setAttribute("normal",new Mt(e,3)),s}function hf(r,t){const e=new cr({vertexColors:!0,side:tn});return e.onBeforeCompile=n=>{n.uniforms.uTime=r,n.vertexShader=`uniform float uTime;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vec2 ip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
       float wv = sin(uTime * 1.5 + ip.x * 0.55 + ip.y * 0.35) * 0.6 + sin(uTime * 2.9 + ip.x * 1.7) * 0.25;
       float k = position.y * position.y * ${t.toFixed(3)};
       transformed.x += wv * k;
       transformed.z += wv * k * 0.4;`)},e}function Hc(r,t,e=.1){for(const n of im())if(r>n.x0-e&&r<n.x1+e&&t>n.z0-e&&t<n.z1+e)return!0;return!1}function yb(r){const t={value:0},e=we(77),n=vb(),i=[],s=["#cfe8a0","#e8f0b8","#b8d890","#f0e8a8"],o=["#d8e0a0","#c8d890","#e8d898","#b0c880"];for(let v=0;v<Te;v++)for(let x=0;x<Se;x++){const y=xi(x,v),P=y==="T"?30:y==="g"?ue(x*.13,v*.13,3,3)>.5?6:3:y==="#"?5:0;for(let E=0;E<P;E++){const C=x+e(),R=v+e();if(Hc(C,R))continue;const b=y==="T"||y==="#";i.push({x:C,z:R,s:b?.55+e()*.45:.22+e()*.2,c:new it(b?s[Math.floor(e()*4)]:o[Math.floor(e()*4)])})}}for(let v=1;v<Te-1;v++)for(let x=1;x<Se-1;x++)if(!(xi(x,v)!=="g"||![[1,0],[-1,0],[0,1],[0,-1]].some(([P,E])=>xi(x+P,v+E)==="d")))for(let P=0;P<4;P++){const E=x+e(),C=v+e();Hc(E,C)||i.push({x:E,z:C,s:.35+e()*.3,c:new it(s[Math.floor(e()*4)])})}const a=new vs(n,hf(t,.16),i.length),l=new Ft,c=new nn,h=new fn;i.forEach((v,x)=>{h.set(0,e()*Math.PI*2,0),c.setFromEuler(h),l.compose(new T(v.x,ge(v.x,v.z)-.02,v.z),c,new T(v.s*1.1,v.s,v.s*1.1)),a.setMatrixAt(x,l),a.setColorAt(x,v.c)}),a.receiveShadow=!0,r.add(a);const u=[],d=["#5a6ee0","#d8483a","#f0c63a","#f2ece0","#b97ae0"];for(let v=0;v<900;v++){const x=1+e()*(Se-2),y=1+e()*(Te-2),P=xi(Math.floor(x),Math.floor(y));if(P!=="g"&&P!=="T"||ue(x*.13,y*.13,3,3)<.52&&e()>.25||Hc(x,y))continue;const C=Math.floor(ue(x*.25,y*.25,88,2)*d.length);u.push({x,z:y,s:.16+e()*.1,c:new it(d[(C+(e()>.8?1:0))%d.length])})}const f=new Rs(.11,0);f.translate(0,.32,0);const p=new Xn(.012,.012,.32,3);p.translate(0,.16,0);const _=hf(t,.5);_.vertexColors=!1;const g=new vs(f,_,u.length),m=new vs(p,new cr({color:"#3f6b28"}),u.length);return u.forEach((v,x)=>{l.compose(new T(v.x,ge(v.x,v.z),v.z),c.identity(),new T(v.s*4,v.s*4,v.s*4)),g.setMatrixAt(x,l),g.setColorAt(x,v.c),m.setMatrixAt(x,l)}),g.receiveShadow=m.receiveShadow=!0,r.add(g,m),v=>{t.value=v}}function Mb(r,t){const e=[JS(r,16.4,10.8,t),KS(r,12.4,10.9),sf(r,7.5,11.1,0,t),qS(r,28.9,11),QS(r,[34,35.7,37.3],11.4),YS(r,10.3,20.9),sf(r,15.8,20.9,1,t),ZS(r,25.5,20.6),$S(r,32.5,21.9),tb(r,32.6,23.2,37.8,26.6),jS(r,20.5,17.2,t),eb(r)],n=db(r,t);_b(r);const i=xb(r,t),s=yb(r);return{update(o,a){i(o),s(o);for(const l of e)l.update?.(o);n.update?.(o),n.motes(o,a)}}}const uf=.0243,sm=new Hp;function rm(r){return r.colorSpace=We,r.magFilter=Ue,r.minFilter=Ue,r.generateMipmaps=!1,r}let Gc=null;function om(r){if(!Gc){const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d"),i=n.createRadialGradient(32,32,2,32,32,31);i.addColorStop(0,"rgba(0,0,0,0.55)"),i.addColorStop(.6,"rgba(0,0,0,0.3)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),Gc=new Fl(e)}const t=new ft(new Ye(r*2,r*1.3),new Un({map:Gc,transparent:!0,depthWrite:!1}));return t.rotation.x=-Math.PI/2,t.renderOrder=1,t}function Sb(r){return r?new it().setRGB(.6,.68,.95):new it().setRGB(1.1,1.05,.98)}function am(r,t,e,n,i){const s=new Ye(t,e);s.translate(0,e*(n-.5),0);const o=new Un({map:r,alphaTest:.5,side:tn,color:i}),a=new ft(s,o);return a.castShadow=!0,a}class Jr{constructor(t,e,n){this.meta=e,this.tex=t,t.wrapS=t.wrapT=vn,this.mesh=am(t,e.frameW*uf,e.frameH*uf,e.originY,n),this.root.add(this.mesh,om(.34)),this.setFrame("S",0)}root=new Gt;mesh;tex;dir="S";t=0;moving=!1;static async load(t,e){const[n,i]=await Promise.all([sm.loadAsync(`./world/char/${t}_walk.png`).then(rm),fetch(`./world/char/${t}_walk.meta.json`).then(s=>s.json())]);return new Jr(n,i,e)}setFrame(t,e){const{cols:n,rows:i}=this.meta,s=t==="S"?0:t==="N"?1:2,o=t==="E";this.tex.repeat.set((o?-1:1)/n,1/i),this.tex.offset.set((o?e+1:e)/n,1-(s+1)/i)}animate(t,e,n=1){e!==this.moving&&(this.t=0,this.moving=e),this.t+=t*n;const i=e?Math.floor(this.t*this.meta.fps)%this.meta.cols:0;this.setFrame(this.dir,i),this.mesh.scale.y=e?1:1+Math.sin(this.t*2.2)*.012}face(t,e){Math.abs(t)<1e-4&&Math.abs(e)<1e-4||(this.dir=Math.abs(t)>=Math.abs(e)*.9?t<0?"W":"E":e<0?"N":"S")}}class hu{root=new Gt;body=new Gt;front;back;hop=0;constructor(t,e){this.front=t,this.back=e,this.back.visible=!1,this.body.add(t,e),this.root.add(this.body,om(.36))}static async load(t,e,n=.019){const i=async a=>{const l=rm(await sm.loadAsync(a));l.wrapS=Ss;const c=l.image,h=bb(c)/c.height;return am(l,c.width*n,c.height*n,h,e)},[s,o]=await Promise.all([i(`./sprites/ohms/${t}_front_hd.png`),i(`./sprites/ohms/${t}_back_hd.png`)]);return new hu(s,o)}step(t,e,n){const i=Math.hypot(e,n)>1e-4;if(i){const s=n<0&&Math.abs(n)>Math.abs(e)*.9;this.front.visible=!s,this.back.visible=s,Math.abs(e)>1e-4&&(this.front.scale.x=this.back.scale.x=e<0?-1:1),this.hop+=t*11}else this.hop=0;this.body.position.y=i?Math.abs(Math.sin(this.hop))*.09:0}}function bb(r){const t=document.createElement("canvas");t.width=r.width,t.height=r.height;const e=t.getContext("2d");e.drawImage(r,0,0);const n=e.getImageData(0,0,t.width,t.height).data;for(let i=t.height-1;i>=0;i--)for(let s=0;s<t.width;s++)if(n[(i*t.width+s)*4+3]>128)return i+1;return t.height}const He=(r,t,e)=>{const n=document.createElement(r);return n.className=t,e.appendChild(n),n};class wb{root;prompt;box;portrait;plate;text;more;speech=null;line=0;shown=0;onClose=null;stick={x:0,y:0};aPressed=!1;constructor(t){this.root=He("div","ui",t),this.prompt=He("div","prompt",this.root),this.box=He("div","dlg",this.root),this.portrait=He("img","dlg-portrait",this.box);const e=He("div","dlg-panel",this.box);this.plate=He("div","dlg-name",e),this.text=He("div","dlg-text",e),this.more=He("div","dlg-more",e),this.more.textContent="▼",this.box.addEventListener("pointerdown",n=>{n.preventDefault(),this.aPressed=!0}),(matchMedia("(pointer: coarse)").matches||"ontouchstart"in window)&&this.touchControls()}get talking(){return this.speech!==null}takeA(){const t=this.aPressed;return this.aPressed=!1,t}titleCard(t,e){const n=He("div","title-card",this.root);He("div","tc-rule",n),He("div","tc-title",n).textContent=t,He("div","tc-sub",n).textContent=e,He("div","tc-rule",n),setTimeout(()=>n.classList.add("out"),3200),setTimeout(()=>n.remove(),4600)}hint(t){const e=He("div","hint",this.root);e.innerHTML=t,setTimeout(()=>e.classList.add("out"),9e3)}badge(t){const e=He("div","badge",this.root);return e.innerHTML=t,e}showPrompt(t,e=0,n=0){if(!t||this.talking){this.prompt.classList.remove("on");return}this.prompt.innerHTML=`<b>${"ontouchstart"in window?"A":"E"}</b>${t}`,this.prompt.style.transform=`translate(${Math.round(e)}px, ${Math.round(n)}px) translate(-50%, -100%)`,this.prompt.classList.add("on")}say(t,e){this.speech=t,this.line=0,this.onClose=e??null,this.plate.textContent=t.name,this.box.classList.toggle("has-portrait",!!t.portrait),t.portrait&&(this.portrait.src=t.portrait),this.box.classList.add("on"),this.startLine()}advance(){const t=this.speech;if(!t)return;const e=t.lines[this.line];if(this.shown<e.length){this.shown=e.length,this.render();return}if(++this.line<t.lines.length){this.startLine();return}this.speech=null,this.box.classList.remove("on"),this.onClose?.()}tick(t){const e=this.speech;if(!e)return;const n=e.lines[this.line];this.shown<n.length&&(this.shown=Math.min(n.length,this.shown+t*52),this.render())}startLine(){this.shown=0,this.render()}render(){const e=this.speech.lines[this.line];this.text.textContent=e.slice(0,Math.floor(this.shown)),this.more.classList.toggle("on",this.shown>=e.length)}touchControls(){const t=He("div","stick",this.root),e=He("div","stick-knob",t),n=46;let i=null,s=0,o=0;const a=(h,u)=>{let d=h-s,f=u-o;const p=Math.hypot(d,f);p>n&&(d*=n/p,f*=n/p),e.style.transform=`translate(${d}px, ${f}px)`,this.stick.x=d/n,this.stick.y=f/n};t.addEventListener("pointerdown",h=>{i=h.pointerId,t.setPointerCapture(i);const u=t.getBoundingClientRect();s=u.left+u.width/2,o=u.top+u.height/2,a(h.clientX,h.clientY)}),t.addEventListener("pointermove",h=>{h.pointerId===i&&a(h.clientX,h.clientY)});const l=h=>{h.pointerId===i&&(i=null,e.style.transform="",this.stick.x=this.stick.y=0)};t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l);const c=He("button","btn-a",this.root);c.textContent="A",c.addEventListener("pointerdown",h=>{h.preventDefault(),this.aPressed=!0})}}const dr=new URLSearchParams(location.search),ir=dr.get("time")==="night",Tb=ir?BS:OS,lm=document.getElementById("app");window.addEventListener("error",r=>{const t=document.createElement("pre");t.style.cssText="position:fixed;left:8px;top:8px;right:8px;color:#f88;background:#000c;padding:8px;font:12px monospace;z-index:99;white-space:pre-wrap",t.textContent=String(r.message)+`
`+(r.error?.stack??""),document.body.appendChild(t)});const Zn=new dp({antialias:!1,powerPreference:"high-performance"});Zn.setPixelRatio(Math.min(window.devicePixelRatio,1.5));Zn.setSize(window.innerWidth,window.innerHeight);Zn.shadowMap.enabled=!0;Zn.shadowMap.type=hh;Zn.toneMapping=xl;Zn.outputColorSpace=We;lm.appendChild(Zn.domElement);const Ls=new Fh,mo=dr.get("wide")==="1",Bi=new Xe(mo?34:30,window.innerWidth/window.innerHeight,.5,220),Eb=mo?new T(0,27,31):new T(0,12.5,14.5),fr=FS(Zn,Ls,Bi),Ab=zS(Ls,Zn,fr,Tb),Cb=Mb(Ls,ir),je=new wb(lm),Aa=Sb(ir),As=await fetch("./world/the-field.json").then(r=>r.json()),[Ze,go,...cm]=await Promise.all([Jr.load("sal",Aa),hu.load(7,Aa),...As.npcs.map(r=>Jr.load(r.char,Aa)),...As.trainers.map(r=>Jr.load(r.char,Aa))]),pr=(r,t)=>Math.max(ge(r,t),-.1),uu=[],hm=[];[...As.npcs,...As.trainers].forEach((r,t)=>{const e=cm[t],n=r.col+.5,i=r.row+.5;e.root.position.set(n,pr(n,i),i),e.dir=r.facing?r.facing.toUpperCase():"S",e.animate(0,!1),Ls.add(e.root),hm.push(e.root.position);const s=r.lines??(r.bark?[r.bark.replace(/^[^:]+:\s*/,"")]:["…"]);uu.push({pos:e.root.position,height:2,label:r.name,walker:e,speech:{name:r.name,portrait:`./world/char/${r.char}_96.png`,lines:s}})});for(const r of As.signs){const t=new T(22.7,pr(22.7,16.7),16.7);uu.push({pos:t,height:1.5,label:"Read",speech:{name:"Sign",lines:[r.text]}})}const zi=new T(Number(dr.get("x")??As.spawn.x+.5),0,Number(dr.get("z")??As.spawn.y+.3));Ze.root.position.set(zi.x,pr(zi.x,zi.z),zi.z);Ze.dir=dr.get("face")?.toUpperCase()??"S";Ls.add(Ze.root);go.root.position.set(zi.x-.9,pr(zi.x-.9,zi.z+.4),zi.z+.4);Ls.add(go.root);const Ln=new Set,Rb=new Set(["e"," ","enter","z"]);window.addEventListener("keydown",r=>{const t=r.key.toLowerCase();Ln.add(t),Rb.has(t)&&!r.repeat&&um(),(t.startsWith("arrow")||t===" ")&&r.preventDefault()});window.addEventListener("keyup",r=>Ln.delete(r.key.toLowerCase()));window.addEventListener("blur",()=>Ln.clear());let hs=null;function um(){if(je.talking){je.advance();return}const r=hs;r&&(r.walker&&r.walker.face(Ze.root.position.x-r.pos.x,Ze.root.position.z-r.pos.z),je.say(r.speech))}function Pb(){const r=Ze.root.position,t=Ze.dir==="W"?-1:Ze.dir==="E"?1:0,e=Ze.dir==="N"?-1:Ze.dir==="S"?1:0;let n=null,i=1/0;for(const s of uu){const o=s.pos.x-r.x,a=s.pos.z-r.z,l=Math.hypot(o,a);if(l>1.6)continue;const c=(o*t+a*e)/(l||1);l>.95&&c<.3||l<i&&(i=l,n=s)}return n}const Ib=.28,df=(r,t)=>{if(kS(r,t,Ib))return!1;for(const e of hm)if(Math.hypot(e.x-r,e.z-t)<.55)return!1;return!0},kn=[Ze.root.position.clone()],kr=new T,ff=new T;let Wc=.46;function dm(r){return mo?r.set(Se/2,0,Te/2+1):(r.x=Qc.clamp(r.x,8.2,Se-8.2),r.z=Qc.clamp(r.z,4.2,Te-4.6),r)}dm(kr.copy(Ze.root.position).setY(.8));function Lb(r){let t=0,e=0;je.talking||((Ln.has("arrowleft")||Ln.has("a"))&&(t-=1),(Ln.has("arrowright")||Ln.has("d"))&&(t+=1),(Ln.has("arrowup")||Ln.has("w"))&&(e-=1),(Ln.has("arrowdown")||Ln.has("s"))&&(e+=1),(je.stick.x||je.stick.y)&&(t=je.stick.x,e=je.stick.y)),je.takeA()&&um();const n=Math.min(1,Math.hypot(t,e)),i=Ln.has("shift")||n>.92,s=(i?5:3.1)*n,o=Ze.root.position;let a=!1;if(n>.12){const m=t/Math.hypot(t,e)*s*r,v=e/Math.hypot(t,e)*s*r;Ze.face(t,e),df(o.x+m,o.z)&&(o.x+=m,a=!0),df(o.x,o.z+v)&&(o.z+=v,a=!0),o.y=pr(o.x,o.z)}Ze.animate(r,a,i?1.5:1),kn[kn.length-1].distanceTo(o)>.08&&(kn.push(o.clone()),kn.length>80&&kn.shift());let c=1.1,h=kn.length-1,u=kn[0];for(;h>0;h--){const m=kn[h].distanceTo(kn[h-1]);if(c<=m){u=kn[h].clone().lerp(kn[h-1],c/m);break}c-=m}const d=go.root.position,f=d.x,p=d.z,_=Math.hypot(u.x-d.x,u.z-d.z);if(_>.04){const m=Math.min(1,(s+1.5)*r/_);d.x+=(u.x-d.x)*m,d.z+=(u.z-d.z)*m}d.y=pr(d.x,d.z),go.step(r,d.x-f,d.z-p);for(const m of cm)m.animate(r,!1);dm(ff.copy(o).setY(.8)),kr.lerp(ff,1-Math.exp(-r*4.5)),Bi.position.copy(kr).add(Eb),Bi.lookAt(kr),Ab.follow(mo?kr:o);const g=o.clone().setY(o.y+.8).project(Bi);if(Wc+=((g.y+1)/2-Wc)*(1-Math.exp(-r*6)),fr.tiltH.uniforms.focus.value=fr.tiltV.uniforms.focus.value=mo?.45:Wc,hs=je.talking?null:Pb(),hs){const m=hs.pos.clone().setY(hs.pos.y+hs.height).project(Bi);je.showPrompt(hs.label,(m.x+1)/2*window.innerWidth,(1-m.y)/2*window.innerHeight)}else je.showPrompt(null);je.tick(r)}function fm(){const r=window.innerWidth,t=window.innerHeight;Zn.setSize(r,t),Bi.aspect=r/t,Bi.updateProjectionMatrix(),fr.resize(r,t)}window.addEventListener("resize",fm);fm();if(dr.get("hud")!=="0"){je.titleCard("THE FIELD",ir?"Ohmstead surface · after dark":"Ohmstead surface"),je.hint(matchMedia("(pointer: coarse)").matches?"Stick to move · A to talk":"<kbd>WASD</kbd>/<kbd>←↑→↓</kbd> move · <kbd>Shift</kbd> run · <kbd>E</kbd> talk");const r=t=>{const e=new URLSearchParams(location.search);return t?e.set("time","night"):e.delete("time"),`?${e}`};je.badge(`<span>HD-2D · B</span><a href="${r(!1)}" class="${ir?"":"on"}">Day</a><a href="${r(!0)}" class="${ir?"on":""}">Night</a>`)}const Db=new Zl;let Xc=0;Zn.setAnimationLoop(()=>{const r=Math.min(Db.getDelta(),.05);Xc+=r,Lb(r),Cb.update(Xc,Ze.root.position),fr.tick(Xc),fr.composer.render(r)});Object.assign(window,{__ready:!0,__hd2d:{scene:Ls,camera:Bi,player:Ze,ohm:go,THREE:TS}});
