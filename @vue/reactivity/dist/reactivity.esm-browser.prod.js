function t(t,e){const n=Object.create(null),s=t.split(",");for(let i=0;i<s.length;i++)n[s[i]]=!0;return e?t=>!!n[t.toLowerCase()]:t=>!!n[t]}const e=()=>{},n=Object.assign,s=Object.prototype.hasOwnProperty,i=(t,e)=>s.call(t,e),r=Array.isArray,c=t=>"[object Map]"===l(t),o=t=>"function"==typeof t,u=t=>"symbol"==typeof t,h=t=>null!==t&&"object"==typeof t,a=Object.prototype.toString,l=t=>a.call(t),f=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,_=(t,e)=>!Object.is(t,e);let d;class p{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=d,!t&&d&&(this.index=(d.scopes||(d.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=d;try{return d=this,t()}finally{d=e}}}on(){d=this}off(){d=this.parent}stop(t){if(this._active){let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function v(t){return new p(t)}function g(t,e=d){e&&e.active&&e.effects.push(t)}function y(){return d}function w(t){d&&d.cleanups.push(t)}const b=t=>{const e=new Set(t);return e.w=0,e.n=0,e},R=t=>(t.w&O)>0,m=t=>(t.n&O)>0,S=new WeakMap;let k=0,O=1;let j;const x=Symbol(""),P=Symbol("");class E{constructor(t,e=null,n){this.fn=t,this.scheduler=e,this.active=!0,this.deps=[],this.parent=void 0,g(this,n)}run(){if(!this.active)return this.fn();let t=j,e=V;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=j,j=this,V=!0,O=1<<++k,k<=30?(({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=O})(this):M(this),this.fn()}finally{k<=30&&(t=>{const{deps:e}=t;if(e.length){let n=0;for(let s=0;s<e.length;s++){const i=e[s];R(i)&&!m(i)?i.delete(t):e[n++]=i,i.w&=~O,i.n&=~O}e.length=n}})(this),O=1<<--k,j=this.parent,V=e,this.parent=void 0,this.deferStop&&this.stop()}}stop(){j===this?this.deferStop=!0:this.active&&(M(this),this.onStop&&this.onStop(),this.active=!1)}}function M(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}function z(t,e){t.effect&&(t=t.effect.fn);const s=new E(t);e&&(n(s,e),e.scope&&g(s,e.scope)),e&&e.lazy||s.run();const i=s.run.bind(s);return i.effect=s,i}function W(t){t.effect.stop()}let V=!0;const N=[];function A(){N.push(V),V=!1}function I(){N.push(V),V=!0}function K(){const t=N.pop();V=void 0===t||t}function C(t,e,n){if(V&&j){let e=S.get(t);e||S.set(t,e=new Map);let s=e.get(n);s||e.set(n,s=b()),L(s)}}function L(t,e){let n=!1;k<=30?m(t)||(t.n|=O,n=!R(t)):n=!t.has(j),n&&(t.add(j),j.deps.push(t))}function q(t,e,n,s,i,o){const u=S.get(t);if(!u)return;let h=[];if("clear"===e)h=[...u.values()];else if("length"===n&&r(t)){const t=Number(s);u.forEach(((e,n)=>{("length"===n||n>=t)&&h.push(e)}))}else switch(void 0!==n&&h.push(u.get(n)),e){case"add":r(t)?f(n)&&h.push(u.get("length")):(h.push(u.get(x)),c(t)&&h.push(u.get(P)));break;case"delete":r(t)||(h.push(u.get(x)),c(t)&&h.push(u.get(P)));break;case"set":c(t)&&h.push(u.get(x))}if(1===h.length)h[0]&&B(h[0]);else{const t=[];for(const e of h)e&&t.push(...e);B(b(t))}}function B(t,e){const n=r(t)?t:[...t];for(const s of n)s.computed&&D(s);for(const s of n)s.computed||D(s)}function D(t,e){(t!==j||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const F=t("__proto__,__v_isRef,__isVue"),G=new Set(Object.getOwnPropertyNames(Symbol).filter((t=>"arguments"!==t&&"caller"!==t)).map((t=>Symbol[t])).filter(u)),H=Z(),J=Z(!1,!0),Q=Z(!0),T=Z(!0,!0),U=X();function X(){const t={};return["includes","indexOf","lastIndexOf"].forEach((e=>{t[e]=function(...t){const n=qt(this);for(let e=0,i=this.length;e<i;e++)C(n,0,e+"");const s=n[e](...t);return-1===s||!1===s?n[e](...t.map(qt)):s}})),["push","pop","shift","unshift","splice"].forEach((e=>{t[e]=function(...t){A();const n=qt(this)[e].apply(this,t);return K(),n}})),t}function Y(t){const e=qt(this);return C(e,0,t),e.hasOwnProperty(t)}function Z(t=!1,e=!1){return function(n,s,c){if("__v_isReactive"===s)return!t;if("__v_isReadonly"===s)return t;if("__v_isShallow"===s)return e;if("__v_raw"===s&&c===(t?e?Et:Pt:e?xt:jt).get(n))return n;const o=r(n);if(!t){if(o&&i(U,s))return Reflect.get(U,s,c);if("hasOwnProperty"===s)return Y}const a=Reflect.get(n,s,c);return(u(s)?G.has(s):F(s))?a:(t||C(n,0,s),e?a:Jt(a)?o&&f(s)?a:a.value:h(a)?t?Vt(a):zt(a):a)}}function $(t=!1){return function(e,n,s,c){let o=e[n];if(Kt(o)&&Jt(o)&&!Jt(s))return!1;if(!t&&(Ct(s)||Kt(s)||(o=qt(o),s=qt(s)),!r(e)&&Jt(o)&&!Jt(s)))return o.value=s,!0;const u=r(e)&&f(n)?Number(n)<e.length:i(e,n),h=Reflect.set(e,n,s,c);return e===qt(c)&&(u?_(s,o)&&q(e,"set",n,s):q(e,"add",n,s)),h}}const tt={get:H,set:$(),deleteProperty:function(t,e){const n=i(t,e),s=Reflect.deleteProperty(t,e);return s&&n&&q(t,"delete",e,void 0),s},has:function(t,e){const n=Reflect.has(t,e);return u(e)&&G.has(e)||C(t,0,e),n},ownKeys:function(t){return C(t,0,r(t)?"length":x),Reflect.ownKeys(t)}},et={get:Q,set:(t,e)=>!0,deleteProperty:(t,e)=>!0},nt=n({},tt,{get:J,set:$(!0)}),st=n({},et,{get:T}),it=t=>t,rt=t=>Reflect.getPrototypeOf(t);function ct(t,e,n=!1,s=!1){const i=qt(t=t.__v_raw),r=qt(e);n||(e!==r&&C(i,0,e),C(i,0,r));const{has:c}=rt(i),o=s?it:n?Ft:Dt;return c.call(i,e)?o(t.get(e)):c.call(i,r)?o(t.get(r)):void(t!==i&&t.get(e))}function ot(t,e=!1){const n=this.__v_raw,s=qt(n),i=qt(t);return e||(t!==i&&C(s,0,t),C(s,0,i)),t===i?n.has(t):n.has(t)||n.has(i)}function ut(t,e=!1){return t=t.__v_raw,!e&&C(qt(t),0,x),Reflect.get(t,"size",t)}function ht(t){t=qt(t);const e=qt(this);return rt(e).has.call(e,t)||(e.add(t),q(e,"add",t,t)),this}function at(t,e){e=qt(e);const n=qt(this),{has:s,get:i}=rt(n);let r=s.call(n,t);r||(t=qt(t),r=s.call(n,t));const c=i.call(n,t);return n.set(t,e),r?_(e,c)&&q(n,"set",t,e):q(n,"add",t,e),this}function lt(t){const e=qt(this),{has:n,get:s}=rt(e);let i=n.call(e,t);i||(t=qt(t),i=n.call(e,t)),s&&s.call(e,t);const r=e.delete(t);return i&&q(e,"delete",t,void 0),r}function ft(){const t=qt(this),e=0!==t.size,n=t.clear();return e&&q(t,"clear",void 0,void 0),n}function _t(t,e){return function(n,s){const i=this,r=i.__v_raw,c=qt(r),o=e?it:t?Ft:Dt;return!t&&C(c,0,x),r.forEach(((t,e)=>n.call(s,o(t),o(e),i)))}}function dt(t,e,n){return function(...s){const i=this.__v_raw,r=qt(i),o=c(r),u="entries"===t||t===Symbol.iterator&&o,h="keys"===t&&o,a=i[t](...s),l=n?it:e?Ft:Dt;return!e&&C(r,0,h?P:x),{next(){const{value:t,done:e}=a.next();return e?{value:t,done:e}:{value:u?[l(t[0]),l(t[1])]:l(t),done:e}},[Symbol.iterator](){return this}}}}function pt(t){return function(...e){return"delete"!==t&&this}}function vt(){const t={get(t){return ct(this,t)},get size(){return ut(this)},has:ot,add:ht,set:at,delete:lt,clear:ft,forEach:_t(!1,!1)},e={get(t){return ct(this,t,!1,!0)},get size(){return ut(this)},has:ot,add:ht,set:at,delete:lt,clear:ft,forEach:_t(!1,!0)},n={get(t){return ct(this,t,!0)},get size(){return ut(this,!0)},has(t){return ot.call(this,t,!0)},add:pt("add"),set:pt("set"),delete:pt("delete"),clear:pt("clear"),forEach:_t(!0,!1)},s={get(t){return ct(this,t,!0,!0)},get size(){return ut(this,!0)},has(t){return ot.call(this,t,!0)},add:pt("add"),set:pt("set"),delete:pt("delete"),clear:pt("clear"),forEach:_t(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((i=>{t[i]=dt(i,!1,!1),n[i]=dt(i,!0,!1),e[i]=dt(i,!1,!0),s[i]=dt(i,!0,!0)})),[t,n,e,s]}const[gt,yt,wt,bt]=vt();function Rt(t,e){const n=e?t?bt:wt:t?yt:gt;return(e,s,r)=>"__v_isReactive"===s?!t:"__v_isReadonly"===s?t:"__v_raw"===s?e:Reflect.get(i(n,s)&&s in e?n:e,s,r)}const mt={get:Rt(!1,!1)},St={get:Rt(!1,!0)},kt={get:Rt(!0,!1)},Ot={get:Rt(!0,!0)},jt=new WeakMap,xt=new WeakMap,Pt=new WeakMap,Et=new WeakMap;function Mt(t){return t.__v_skip||!Object.isExtensible(t)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((t=>l(t).slice(8,-1))(t))}function zt(t){return Kt(t)?t:At(t,!1,tt,mt,jt)}function Wt(t){return At(t,!1,nt,St,xt)}function Vt(t){return At(t,!0,et,kt,Pt)}function Nt(t){return At(t,!0,st,Ot,Et)}function At(t,e,n,s,i){if(!h(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const r=i.get(t);if(r)return r;const c=Mt(t);if(0===c)return t;const o=new Proxy(t,2===c?s:n);return i.set(t,o),o}function It(t){return Kt(t)?It(t.__v_raw):!(!t||!t.__v_isReactive)}function Kt(t){return!(!t||!t.__v_isReadonly)}function Ct(t){return!(!t||!t.__v_isShallow)}function Lt(t){return It(t)||Kt(t)}function qt(t){const e=t&&t.__v_raw;return e?qt(e):t}function Bt(t){return((t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})})(t,"__v_skip",!0),t}const Dt=t=>h(t)?zt(t):t,Ft=t=>h(t)?Vt(t):t;function Gt(t){V&&j&&L((t=qt(t)).dep||(t.dep=b()))}function Ht(t,e){const n=(t=qt(t)).dep;n&&B(n)}function Jt(t){return!(!t||!0!==t.__v_isRef)}function Qt(t){return Ut(t,!1)}function Tt(t){return Ut(t,!0)}function Ut(t,e){return Jt(t)?t:new Xt(t,e)}class Xt{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:qt(t),this._value=e?t:Dt(t)}get value(){return Gt(this),this._value}set value(t){const e=this.__v_isShallow||Ct(t)||Kt(t);t=e?t:qt(t),_(t,this._rawValue)&&(this._rawValue=t,this._value=e?t:Dt(t),Ht(this))}}function Yt(t){Ht(t)}function Zt(t){return Jt(t)?t.value:t}function $t(t){return o(t)?t():Zt(t)}const te={get:(t,e,n)=>Zt(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Jt(i)&&!Jt(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};function ee(t){return It(t)?t:new Proxy(t,te)}class ne{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:e,set:n}=t((()=>Gt(this)),(()=>Ht(this)));this._get=e,this._set=n}get value(){return this._get()}set value(t){this._set(t)}}function se(t){return new ne(t)}function ie(t){const e=r(t)?new Array(t.length):{};for(const n in t)e[n]=ue(t,n);return e}class re{constructor(t,e,n){this._object=t,this._key=e,this._defaultValue=n,this.__v_isRef=!0}get value(){const t=this._object[this._key];return void 0===t?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return t=qt(this._object),e=this._key,null==(n=S.get(t))?void 0:n.get(e);var t,e,n}}class ce{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function oe(t,e,n){return Jt(t)?t:o(t)?new ce(t):h(t)&&arguments.length>1?ue(t,e,n):Qt(t)}function ue(t,e,n){const s=t[e];return Jt(s)?s:new re(t,e,n)}class he{constructor(t,e,n,s){this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new E(t,(()=>{this._dirty||(this._dirty=!0,Ht(this))})),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const t=qt(this);return Gt(t),!t._dirty&&t._cacheable||(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function ae(t,n,s=!1){let i,r;const c=o(t);c?(i=t,r=e):(i=t.get,r=t.set);return new he(i,r,c||!r,s)}const le=Promise.resolve(),fe=[];let _e=!1;const de=()=>{for(let t=0;t<fe.length;t++)fe[t]();fe.length=0,_e=!1};class pe{constructor(t){let e;this.dep=void 0,this._dirty=!0,this.__v_isRef=!0,this.__v_isReadonly=!0;let n=!1,s=!1;this.effect=new E(t,(t=>{if(this.dep){if(t)e=this._value,n=!0;else if(!s){const t=n?e:this._value;s=!0,n=!1,fe.push((()=>{this.effect.active&&this._get()!==t&&Ht(this),s=!1})),_e||(_e=!0,le.then(de))}for(const t of this.dep)t.computed instanceof pe&&t.scheduler(!0)}this._dirty=!0})),this.effect.computed=this}_get(){return this._dirty?(this._dirty=!1,this._value=this.effect.run()):this._value}get value(){return Gt(this),qt(this)._get()}}function ve(t){return new pe(t)}export{p as EffectScope,x as ITERATE_KEY,E as ReactiveEffect,ae as computed,se as customRef,ve as deferredComputed,z as effect,v as effectScope,I as enableTracking,y as getCurrentScope,Lt as isProxy,It as isReactive,Kt as isReadonly,Jt as isRef,Ct as isShallow,Bt as markRaw,w as onScopeDispose,A as pauseTracking,ee as proxyRefs,zt as reactive,Vt as readonly,Qt as ref,K as resetTracking,Wt as shallowReactive,Nt as shallowReadonly,Tt as shallowRef,W as stop,qt as toRaw,oe as toRef,ie as toRefs,$t as toValue,C as track,q as trigger,Yt as triggerRef,Zt as unref};
