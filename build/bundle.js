var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function i(t,e,n){t.$$.on_destroy.push(c(e,n))}function l(t,e,n,o){if(t){const s=a(t,e,n,o);return t[0](s)}}function a(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function u(t,e,n,o,s,r,c){const i=function(t,e,n,o){if(t[2]&&o){const s=t[2](o(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|s[o];return t}return e.dirty|s}return e.dirty}(e,o,s,r);if(i){const s=a(e,n,o,c);t.p(s,i)}}function d(t,e,n=e){return t.set(n),e}let f,h=!1;function p(t,e,n,o){for(;t<e;){const s=t+(e-t>>1);n(s)<=o?t=s+1:e=s}return t}function $(t,e){h?(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;const e=t.childNodes,n=new Int32Array(e.length+1),o=new Int32Array(e.length);n[0]=-1;let s=0;for(let t=0;t<e.length;t++){const r=p(1,s+1,(t=>e[n[t]].claim_order),e[t].claim_order)-1;o[t]=n[r]+1;const c=r+1;n[c]=t,s=Math.max(c,s)}const r=[],c=[];let i=e.length-1;for(let t=n[s]+1;0!=t;t=o[t-1]){for(r.push(e[t-1]);i>=t;i--)c.push(e[i]);i--}for(;i>=0;i--)c.push(e[i]);r.reverse(),c.sort(((t,e)=>t.claim_order-e.claim_order));for(let e=0,n=0;e<c.length;e++){for(;n<r.length&&c[e].claim_order>=r[n].claim_order;)n++;const o=n<r.length?r[n]:null;t.insertBefore(c[e],o)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild),e!==t.actual_end_child?t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling):e.parentNode!==t&&t.appendChild(e)}function g(t,e,n){h&&!n?$(t,e):(e.parentNode!==t||n&&e.nextSibling!==n)&&t.insertBefore(e,n||null)}function m(t){t.parentNode.removeChild(t)}function b(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function y(){return v(" ")}function w(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function _(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function x(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function j(t,e,n){t.classList[n?"add":"remove"](e)}function T(t){f=t}function O(t){(function(){if(!f)throw new Error("Function called outside component initialization");return f})().$$.on_destroy.push(t)}function C(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t.call(this,e)))}const S=[],E=[],L=[],M=[],N=Promise.resolve();let A=!1;function P(t){L.push(t)}let q=!1;const D=new Set;function G(){if(!q){q=!0;do{for(let t=0;t<S.length;t+=1){const e=S[t];T(e),H(e.$$)}for(T(null),S.length=0;E.length;)E.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];D.has(e)||(D.add(e),e())}L.length=0}while(S.length);for(;M.length;)M.pop()();A=!1,q=!1,D.clear()}}function H(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const I=new Set;let R;function z(){R={r:0,c:[],p:R}}function F(){R.r||o(R.c),R=R.p}function U(t,e){t&&t.i&&(I.delete(t),t.i(e))}function W(t,e,n,o){if(t&&t.o){if(I.has(t))return;I.add(t),R.c.push((()=>{I.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function B(t,e){W(t,1,1,(()=>{e.delete(t.key)}))}function J(t,e,n,o,s,r,c,i,l,a,u,d){let f=t.length,h=r.length,p=f;const $={};for(;p--;)$[t[p].key]=p;const g=[],m=new Map,b=new Map;for(p=h;p--;){const t=d(s,r,p),i=n(t);let l=c.get(i);l?o&&l.p(t,e):(l=a(i,t),l.c()),m.set(i,g[p]=l),i in $&&b.set(i,Math.abs(p-$[i]))}const v=new Set,y=new Set;function w(t){U(t,1),t.m(i,u),c.set(t.key,t),u=t.first,h--}for(;f&&h;){const e=g[h-1],n=t[f-1],o=e.key,s=n.key;e===n?(u=e.first,f--,h--):m.has(s)?!c.has(o)||v.has(o)?w(e):y.has(s)?f--:b.get(o)>b.get(s)?(y.add(o),w(e)):(v.add(s),f--):(l(n,c),f--)}for(;f--;){const e=t[f];m.has(e.key)||l(e,c)}for(;h;)w(g[h-1]);return g}function K(t){t&&t.c()}function Q(t,n,r,c){const{fragment:i,on_mount:l,on_destroy:a,after_update:u}=t.$$;i&&i.m(n,r),c||P((()=>{const n=l.map(e).filter(s);a?a.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(P)}function V(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function X(t,e){-1===t.$$.dirty[0]&&(S.push(t),A||(A=!0,N.then(G)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(e,s,r,c,i,l,a=[-1]){const u=f;T(e);const d=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:s.context||[]),callbacks:n(),dirty:a,skip_bound:!1};let p=!1;if(d.ctx=r?r(e,s.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return d.ctx&&i(d.ctx[t],d.ctx[t]=s)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](s),p&&X(e,t)),n})):[],d.update(),p=!0,o(d.before_update),d.fragment=!!c&&c(d.ctx),s.target){if(s.hydrate){h=!0;const t=function(t){return Array.from(t.childNodes)}(s.target);d.fragment&&d.fragment.l(t),t.forEach(m)}else d.fragment&&d.fragment.c();s.intro&&U(e.$$.fragment),Q(e,s.target,s.anchor,s.customElement),h=!1,G()}T(u)}class Z{$destroy(){V(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function tt(t){let e,n,o,s,r,c,i,a,d,f;const h=t[4].default,p=l(h,t,t[3],null);return{c(){e=b("div"),n=b("button"),o=b("span"),s=y(),r=v(t[1]),c=y(),i=b("div"),p&&p.c(),k(o,"class","tree-menu icon icon-inline icon-c-clickable icon-tree-menu svelte-13ydmi1"),k(n,"class","section-title nobutton svelte-13ydmi1"),k(i,"class","panel svelte-13ydmi1"),k(e,"class","container svelte-13ydmi1"),j(e,"closed",t[0])},m(l,u){g(l,e,u),$(e,n),$(n,o),$(n,s),$(n,r),$(e,c),$(e,i),p&&p.m(i,null),a=!0,d||(f=w(n,"click",t[2]),d=!0)},p(t,[n]){(!a||2&n)&&x(r,t[1]),p&&p.p&&(!a||8&n)&&u(p,h,t,t[3],a?n:-1,null,null),1&n&&j(e,"closed",t[0])},i(t){a||(U(p,t),a=!0)},o(t){W(p,t),a=!1},d(t){t&&m(e),p&&p.d(t),d=!1,f()}}}function et(t,e,n){let{$$slots:o={},$$scope:s}=e,{title:r}=e,{closed:c=!1}=e;return t.$$set=t=>{"title"in t&&n(1,r=t.title),"closed"in t&&n(0,c=t.closed),"$$scope"in t&&n(3,s=t.$$scope)},[c,r,function(){n(0,c=!c)},s,o]}class nt extends Z{constructor(t){super(),Y(this,t,et,tt,r,{title:1,closed:0})}}function ot(t){const e=Object.create(null);for(const[n,o]of t)e[n]=o;return e}const st=Symbol("watchers key");function rt(t,e){return null==t&&null==e||Object.is(t,e)}function ct(t){return null==t?null:t}class it{constructor(t,e){this._path=[],this._stateManager=t;for(const t of e)".."===t?this._path.pop():"."===t||this._path.push(t)}ref(...t){return new it(this._stateManager,[...this._path,...t])}watch(t,e){return this._stateManager.watch(t,e,this._path.join("/")),t}unwatch(t){this._stateManager.unwatch(t)}replace(t){return this._stateManager.update({[this._path.join("/")]:t})}subscribe(t){const e=this.watch(((e,n,o)=>t(o)),!0);return()=>this.unwatch(e)}set(t){this.replace(t)}}class lt{constructor(){this._data=null,this._watchers=new Map,this._watcherTreeRoot=Object.create(null)}ref(...t){return new it(this,t)}get(...t){let e=this._data;for(const n of t){if(null==e)break;if(n.includes("/"))throw Error('Path cannot contain "/", split into varargs.');e=e[n]}return ct(e)}watch(t,e,...n){let o=this._watchers.get(t);null==o&&(o=new Set,this._watchers.set(t,o));for(const o of n)this._watchPattern(t,e,o);return t}unwatch(t){if(!this._watchers.has(t))throw Error("Cannot find watcher.");const e=this._watchers.get(t);this._watchers.delete(t);for(const n of e)if(!lt._unwatchPattern(t,this._watcherTreeRoot,n.split("/")))throw Error(`Failed to remove watcher from pattern: ${n}.`)}update(t){if("object"!=typeof t)throw Error(`Invalid update object: ${t}`);let e=!1;const n=[],o=[];for(const[s,r]of Object.entries(t)){if(0>=s.length)throw Error("Update key cannot be empty.");const t=s.split("/"),{data:c,redo:i,undo:l}=lt._updateInternal(this._data,r,t,[],[this._watcherTreeRoot]);rt(this._data,c)||(e=!0,this._data=c,n.push(...i),o.push(...l))}return e?{redo:ot(n),undo:ot(o)}:null}_watchPattern(t,e,n){if(!n||0>=n.length)throw Error(`Pattern cannot be empty: ${n}.`);const o=n.split("/");let s=this._watcherTreeRoot;for(const t of o)Object.prototype.hasOwnProperty.call(s,t)||(s[t]=Object.create(null)),s=s[t];(s[st]||(s[st]=new Set)).add(t),e&&lt._triggerNow(this._data,o,[],t)}static _unwatchPattern(t,e,n){if(0===n.length){const n=e[st];return null!=n&&(!!n.delete(t)&&(0>=n.size&&delete e[st],!0))}const[o,...s]=n;return!!Object.prototype.hasOwnProperty.call(e,o)&&(!!this._unwatchPattern(t,e[o],s)&&(0>=Object.keys(e[o]).length&&null==e[st]&&delete e[o],!0))}static _triggerNow(t,e,n,o){if(null==t)return;if(0>=e.length)return void o(n,null,t);if("object"!=typeof t)return;const[s,...r]=e;if("*"===s)for(const[e,s]of Object.entries(t))this._triggerNow(s,r,[...n,e],o);else Object.prototype.hasOwnProperty.call(t,s)&&this._triggerNow(t[s],r,[...n,s],o)}static _updateInternal(t,e,n,o,s){const r=0>=n.length,c="object"==typeof t?t:null,i="object"==typeof e?e:null,{data:l,redo:a,undo:u}=(()=>{if(r){if(null==c&&null==i)return{data:e,undo:[],redo:[]};const n=new Set([...Object.keys(c||{}),...Object.keys(i||{})]);let r=!1;const l=Object.create(null),a=[],u=[];for(const t of n){const e=c?ct(c[t]):null,n=i?ct(i[t]):null,d=lt._nextWatcherTrees(t,s),{data:f,redo:h,undo:p}=lt._updateInternal(e,n,[],[...o,t],d);rt(e,f)||(r=!0,a.push(...h),u.push(...p),null!=i&&Object.prototype.hasOwnProperty.call(i,t)&&null!=f&&(l[t]=f))}return r?0>=Object.keys(l).length?{data:e,redo:a,undo:u}:{data:Object.assign(Object.create(null),c,l),redo:a,undo:u}:{data:t,redo:a,undo:u}}const[l,...a]=n,u=c?ct(c[l]):null,d=lt._nextWatcherTrees(l,s),{data:f,redo:h,undo:p}=lt._updateInternal(u,e,a,[...o,l],d);if(rt(u,f))return{data:t,redo:h,undo:p};const $=Object.assign(Object.create(null),c,{[l]:f});return Object.values($).every((t=>null==t))?{data:null,redo:h,undo:p}:{data:$,redo:h,undo:p}})();if(!rt(t,l)){if(null==t){if(null==l)throw"N/A";"object"==typeof l||(a.length=0,a.push([o.join("/"),l]),u.length=0,u.push([o.join("/"),null]))}else"object"==typeof t?null==l||"object"==typeof l||(a.length=0,a.push([o.join("/"),l])):null==l?(a.length=0,a.push([o.join("/"),null]),u.length=0,u.push([o.join("/"),t])):"object"==typeof l?(u.length=0,u.push([o.join("/"),t])):(a.length=0,a.push([o.join("/"),null]),u.length=0,u.push([o.join("/"),t]));for(const e of s)for(const n of e[st]||[])n(o,t,l);return{data:l,undo:u,redo:a}}return{data:t,undo:u,redo:a}}static _nextWatcherTrees(t,e){const n=[];for(const o of e)o["*"]&&n.push(o["*"]),o[t]&&n.push(o[t]);return n}}const at=[];const ut=function(e,n=t){let o;const s=[];function c(t){if(r(e,t)&&(e=t,o)){const t=!at.length;for(let t=0;t<s.length;t+=1){const n=s[t];n[1](),at.push(n,e)}if(t){for(let t=0;t<at.length;t+=2)at[t][0](at[t+1]);at.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(r,i=t){const l=[r,i];return s.push(l),1===s.length&&(o=n(c)||t),r(e),()=>{const t=s.indexOf(l);-1!==t&&s.splice(t,1),0===s.length&&(o(),o=null)}}}}();function dt(t){let e,n,o;return{c(){e=b("input"),k(e,"class","radio-select-button svelte-erye1b"),k(e,"type","radio"),k(e,"id","local-radio-"+ ++$t),e.__value=t[0],e.value=e.__value,k(e,"name","selectedTool"),t[10][0].push(e)},m(s,r){g(s,e,r),e.checked=e.__value===t[6],n||(o=w(e,"change",t[9]),n=!0)},p(t,n){1&n&&(e.__value=t[0],e.value=e.__value),64&n&&(e.checked=e.__value===t[6])},d(s){s&&m(e),t[10][0].splice(t[10][0].indexOf(e),1),n=!1,o()}}}function ft(t){let e,n;return{c(){e=b("span"),n=v(t[1]),k(e,"class","name svelte-erye1b"),j(e,"unused",t[2])},m(t,o){g(t,e,o),$(e,n)},p(t,o){2&o&&x(n,t[1]),4&o&&j(e,"unused",t[2])},d(t){t&&m(e)}}}function ht(t){let e,n;return{c(){e=b("label"),n=v(t[1]),k(e,"class","name clickable svelte-erye1b"),k(e,"for","local-radio-"+$t),j(e,"unused",t[2])},m(t,o){g(t,e,o),$(e,n)},p(t,o){2&o&&x(n,t[1]),4&o&&j(e,"unused",t[2])},d(t){t&&m(e)}}}function pt(t){let e,n,r,c,i,a,d,f,h,p,v=t[3]&&dt(t);function x(t,e){return t[3]?ht:ft}let j=x(t),T=j(t);const O=t[8].default,C=l(O,t,t[7],null);return{c(){e=b("div"),v&&v.c(),n=y(),r=b("div"),c=b("button"),c.innerHTML='<span class="icon icon-inline icon-c-clickable icon-trash"></span>',i=y(),T.c(),a=y(),d=b("div"),C&&C.c(),k(c,"class","nobutton"),k(r,"class","constraint-row-left svelte-erye1b"),k(d,"class","constraint-row-right svelte-erye1b"),k(e,"class","constraint-row svelte-erye1b"),k(e,"role","button")},m(o,l){g(o,e,l),v&&v.m(e,null),$(e,n),$(e,r),$(r,c),$(r,i),T.m(r,null),$(e,a),$(e,d),C&&C.m(d,null),f=!0,h||(p=[w(c,"click",_((function(){s(t[5])&&t[5].apply(this,arguments)}))),w(e,"click",_((function(){s(t[4])&&t[4].apply(this,arguments)})))],h=!0)},p(o,[s]){(t=o)[3]?v?v.p(t,s):(v=dt(t),v.c(),v.m(e,n)):v&&(v.d(1),v=null),j===(j=x(t))&&T?T.p(t,s):(T.d(1),T=j(t),T&&(T.c(),T.m(r,null))),C&&C.p&&(!f||128&s)&&u(C,O,t,t[7],f?s:-1,null,null)},i(t){f||(U(C,t),f=!0)},o(t){W(C,t),f=!1},d(t){t&&m(e),v&&v.d(),T.d(),C&&C.d(t),h=!1,o(p)}}}window.selectedTool=ut;let $t=0;function gt(t,e,n){let o;i(t,ut,(t=>n(6,o=t)));let{$$slots:s={},$$scope:r}=e,{id:c}=e,{name:l}=e,{unused:a}=e,{isLocal:u=!1}=e,{onClick:f=(u?()=>d(ut,o=c,o):void 0)}=e,{onTrash:h}=e;return t.$$set=t=>{"id"in t&&n(0,c=t.id),"name"in t&&n(1,l=t.name),"unused"in t&&n(2,a=t.unused),"isLocal"in t&&n(3,u=t.isLocal),"onClick"in t&&n(4,f=t.onClick),"onTrash"in t&&n(5,h=t.onTrash),"$$scope"in t&&n(7,r=t.$$scope)},[c,l,a,u,f,h,o,r,s,function(){o=this.__value,ut.set(o)},[[]]]}class mt extends Z{constructor(t){super(),Y(this,t,gt,pt,r,{id:0,name:1,unused:2,isLocal:3,onClick:4,onTrash:5})}}function bt(e){let n,s,r,c,i,l,a,u,d,f,h;return{c(){n=b("div"),s=b("label"),r=b("span"),i=y(),l=b("span"),a=v(e[0]),u=y(),d=b("input"),k(r,"class",c="icon icon-inline icon-c-text icon-"+e[1]+" svelte-1ns67sk"),k(l,"class","sr-only"),k(s,"for","checkbox-"+ ++vt),k(s,"title",e[0]),k(s,"class","clickable"),k(d,"id","checkbox-"+vt),k(d,"type","checkbox"),k(n,"class","constraint-checkbox svelte-1ns67sk")},m(t,o){g(t,n,o),$(n,s),$(s,r),$(s,i),$(s,l),$(l,a),$(n,u),$(n,d),d.checked=e[3],f||(h=[w(d,"change",e[5]),w(n,"click",_(e[4]))],f=!0)},p(t,[e]){2&e&&c!==(c="icon icon-inline icon-c-text icon-"+t[1]+" svelte-1ns67sk")&&k(r,"class",c),1&e&&x(a,t[0]),1&e&&k(s,"title",t[0]),8&e&&(d.checked=t[3])},i:t,o:t,d(t){t&&m(n),f=!1,o(h)}}}let vt=0;function yt(e,n,o){let s,r=t,i=()=>(r(),r=c(u,(t=>o(3,s=t))),u);e.$$.on_destroy.push((()=>r()));let{name:l}=n,{icon:a}=n,{checked:u}=n;return i(),e.$$set=t=>{"name"in t&&o(0,l=t.name),"icon"in t&&o(1,a=t.icon),"checked"in t&&i(o(2,u=t.checked))},[l,a,u,s,function(t){C.call(this,e,t)},function(){s=this.checked,u.set(s)}]}class wt extends Z{constructor(t){super(),Y(this,t,yt,bt,r,{name:0,icon:1,checked:2})}}function _t(e){let n,o,s,r;return n=new wt({props:{name:"Toggle Positive Diagonal",icon:"positive-diagonal",checked:e[4]}}),s=new wt({props:{name:"Toggle Negative Diagonal",icon:"negative-diagonal",checked:e[5]}}),{c(){K(n.$$.fragment),o=y(),K(s.$$.fragment)},m(t,e){Q(n,t,e),g(t,o,e),Q(s,t,e),r=!0},p:t,i(t){r||(U(n.$$.fragment,t),U(s.$$.fragment,t),r=!0)},o(t){W(n.$$.fragment,t),W(s.$$.fragment,t),r=!1},d(t){V(n,t),t&&m(o),V(s,t)}}}function kt(t){let e,n;return e=new mt({props:{id:t[0],name:"Diagonals",unused:!t[2]&&!t[3],onClick:t[6],$$slots:{default:[_t]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),12&n&&(o.unused=!t[2]&&!t[3]),256&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function xt(e,n,o){let s,r,l,a=t,u=()=>(a(),a=c(h,(t=>o(7,l=t))),h);e.$$.on_destroy.push((()=>a()));let{id:f}=n,{ref:h}=n;u();const p=h.ref("positive");i(e,p,(t=>o(2,s=t)));const $=h.ref("negative");return i(e,$,(t=>o(3,r=t))),e.$$set=t=>{"id"in t&&o(0,f=t.id),"ref"in t&&u(o(1,h=t.ref))},[f,h,s,r,p,$,function(){const t=!s||!r;d(h,l={positive:t,negative:t},l)}]}function jt(t){let e,n;return e=new wt({props:{name:"Toggle Antiknight Constraint",icon:"knight",checked:t[1]}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.checked=t[1]),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Tt(t){let e,n;return e=new mt({props:{id:t[0],name:"Antiknight",unused:!t[2],onClick:t[3],$$slots:{default:[jt]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),4&n&&(o.unused=!t[2]),4&n&&(o.onClick=t[3]),18&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Ot(e,n,o){let s,r=t,i=()=>(r(),r=c(a,(t=>o(2,s=t))),a);e.$$.on_destroy.push((()=>r()));let{id:l}=n,{ref:a}=n;i();return e.$$set=t=>{"id"in t&&o(0,l=t.id),"ref"in t&&i(o(1,a=t.ref))},[l,a,s,()=>d(a,s=!s,s)]}function Ct(t){let e,n;return e=new wt({props:{name:"Toggle Antiking Constraint",icon:"king",checked:t[1]}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.checked=t[1]),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function St(t){let e,n;return e=new mt({props:{id:t[0],name:"Antiking",unused:!t[2],onClick:t[3],$$slots:{default:[Ct]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),4&n&&(o.unused=!t[2]),4&n&&(o.onClick=t[3]),18&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Et(e,n,o){let s,r=t,i=()=>(r(),r=c(a,(t=>o(2,s=t))),a);e.$$.on_destroy.push((()=>r()));let{id:l}=n,{ref:a}=n;i();return e.$$set=t=>{"id"in t&&o(0,l=t.id),"ref"in t&&i(o(1,a=t.ref))},[l,a,s,()=>d(a,s=!s,s)]}function Lt(t){let e,n;return e=new wt({props:{name:"Toggle Disjoint Groups Constraint",icon:"disjoint",checked:t[1]}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.checked=t[1]),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Mt(t){let e,n;return e=new mt({props:{id:t[0],name:"Disjoint Groups",unused:!t[2],onClick:t[3],$$slots:{default:[Lt]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),4&n&&(o.unused=!t[2]),4&n&&(o.onClick=t[3]),18&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Nt(e,n,o){let s,r=t,i=()=>(r(),r=c(a,(t=>o(2,s=t))),a);e.$$.on_destroy.push((()=>r()));let{id:l}=n,{ref:a}=n;i();return e.$$set=t=>{"id"in t&&o(0,l=t.id),"ref"in t&&i(o(1,a=t.ref))},[l,a,s,()=>d(a,s=!s,s)]}function At(t){let e,n;return e=new wt({props:{name:"Toggle Nonconsecutive Constraint",icon:"nonconsecutive",checked:t[1]}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.checked=t[1]),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Pt(t){let e,n;return e=new mt({props:{id:t[0],name:"Nonconsecutive",unused:!t[2],onClick:t[3],$$slots:{default:[At]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),4&n&&(o.unused=!t[2]),4&n&&(o.onClick=t[3]),18&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function qt(e,n,o){let s,r=t,i=()=>(r(),r=c(a,(t=>o(2,s=t))),a);e.$$.on_destroy.push((()=>r()));let{id:l}=n,{ref:a}=n;i();return e.$$set=t=>{"id"in t&&o(0,l=t.id),"ref"in t&&i(o(1,a=t.ref))},[l,a,s,()=>d(a,s=!s,s)]}function Dt(t){let e;return{c(){e=b("span"),k(e,"class","icon icon-inline icon-c-clickable icon-given")},m(t,n){g(t,e,n)},d(t){t&&m(e)}}}function Gt(t){let e,n;return e=new mt({props:{id:t[0],name:"Givens",unused:!1,isLocal:!0,$$slots:{default:[Dt]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),8&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Ht(e,n,o){let s=t,r=()=>(s(),s=c(l,(t=>o(2,t))),l);e.$$.on_destroy.push((()=>s()));let{id:i}=n,{ref:l}=n;return r(),e.$$set=t=>{"id"in t&&o(0,i=t.id),"ref"in t&&r(o(1,l=t.ref))},[i,l]}function It(t){let e;return{c(){e=b("span"),k(e,"class","icon icon-inline icon-c-clickable icon-thermo")},m(t,n){g(t,e,n)},d(t){t&&m(e)}}}function Rt(t){let e,n;return e=new mt({props:{id:t[0],name:"Thermos",unused:!1,isLocal:!0,$$slots:{default:[It]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),8&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function zt(e,n,o){let s=t,r=()=>(s(),s=c(l,(t=>o(2,t))),l);e.$$.on_destroy.push((()=>s()));let{id:i}=n,{ref:l}=n;return r(),e.$$set=t=>{"id"in t&&o(0,i=t.id),"ref"in t&&r(o(1,l=t.ref))},[i,l]}function Ft(t){let e;return{c(){e=b("span"),k(e,"class","icon icon-inline icon-c-clickable icon-arrow")},m(t,n){g(t,e,n)},d(t){t&&m(e)}}}function Ut(t){let e,n;return e=new mt({props:{id:t[0],name:"Arrows",unused:!1,isLocal:!0,$$slots:{default:[Ft]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),8&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Wt(e,n,o){let s=t,r=()=>(s(),s=c(l,(t=>o(2,t))),l);e.$$.on_destroy.push((()=>s()));let{id:i}=n,{ref:l}=n;return r(),e.$$set=t=>{"id"in t&&o(0,i=t.id),"ref"in t&&r(o(1,l=t.ref))},[i,l]}function Bt(t){let e;return{c(){e=b("span"),k(e,"class","icon icon-inline icon-c-clickable icon-sandwich")},m(t,n){g(t,e,n)},d(t){t&&m(e)}}}function Jt(t){let e,n;return e=new mt({props:{id:t[0],name:"Sandwich",unused:!1,isLocal:!0,$$slots:{default:[Bt]},$$scope:{ctx:t}}}),{c(){K(e.$$.fragment)},m(t,o){Q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.id=t[0]),8&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){V(e,t)}}}function Kt(e,n,o){let s=t,r=()=>(s(),s=c(l,(t=>o(2,t))),l);e.$$.on_destroy.push((()=>s()));let{id:i}=n,{ref:l}=n;return r(),e.$$set=t=>{"id"in t&&o(0,i=t.id),"ref"in t&&r(o(1,l=t.ref))},[i,l]}const Qt=window.boardState=new lt,Vt={diagonal:!0,knight:!0,king:!0,disjointGroups:!0,consecutive:!0,given:!1,thermo:!1,arrow:!1,sandwich:!1},Xt={diagonal:class extends Z{constructor(t){super(),Y(this,t,xt,kt,r,{id:0,ref:1})}},knight:class extends Z{constructor(t){super(),Y(this,t,Ot,Tt,r,{id:0,ref:1})}},king:class extends Z{constructor(t){super(),Y(this,t,Et,St,r,{id:0,ref:1})}},disjointGroups:class extends Z{constructor(t){super(),Y(this,t,Nt,Mt,r,{id:0,ref:1})}},consecutive:class extends Z{constructor(t){super(),Y(this,t,qt,Pt,r,{id:0,ref:1})}},given:class extends Z{constructor(t){super(),Y(this,t,Ht,Gt,r,{id:0,ref:1})}},thermo:class extends Z{constructor(t){super(),Y(this,t,zt,Rt,r,{id:0,ref:1})}},arrow:class extends Z{constructor(t){super(),Y(this,t,Wt,Ut,r,{id:0,ref:1})}},sandwich:class extends Z{constructor(t){super(),Y(this,t,Kt,Jt,r,{id:0,ref:1})}}};function Yt(t,e,n){const o=t.slice();return o[2]=e[n].id,o[3]=e[n].ref,o[4]=e[n].component,o}function Zt(t,e,n){const o=t.slice();return o[2]=e[n].id,o[3]=e[n].ref,o[4]=e[n].component,o}function te(t){let e;return{c(){e=v("Nothing Here!")},m(t,n){g(t,e,n)},d(t){t&&m(e)}}}function ee(t,e){let n,o,s,r;var c=e[4];function i(t){return{props:{id:t[2],ref:t[3]}}}return c&&(o=new c(i(e))),{key:t,first:null,c(){n=b("li"),o&&K(o.$$.fragment),s=y(),this.first=n},m(t,e){g(t,n,e),o&&Q(o,n,null),$(n,s),r=!0},p(t,r){if(c!==(c=(e=t)[4])){if(o){z();const t=o;W(t.$$.fragment,1,0,(()=>{V(t,1)})),F()}c?(o=new c(i(e)),K(o.$$.fragment),U(o.$$.fragment,1),Q(o,n,s)):o=null}},i(t){r||(o&&U(o.$$.fragment,t),r=!0)},o(t){o&&W(o.$$.fragment,t),r=!1},d(t){t&&m(n),o&&V(o)}}}function ne(t){let e,n,o=[],s=new Map,r=t[0];const c=t=>t[2];for(let e=0;e<r.length;e+=1){let n=Zt(t,r,e),i=c(n);s.set(i,o[e]=ee(i,n))}return{c(){e=b("ul");for(let t=0;t<o.length;t+=1)o[t].c();k(e,"class","nolist")},m(t,s){g(t,e,s);for(let t=0;t<o.length;t+=1)o[t].m(e,null);n=!0},p(t,n){1&n&&(r=t[0],z(),o=J(o,n,c,1,t,r,s,e,B,ee,null,Zt),F())},i(t){if(!n){for(let t=0;t<r.length;t+=1)U(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)W(o[t]);n=!1},d(t){t&&m(e);for(let t=0;t<o.length;t+=1)o[t].d()}}}function oe(t,e){let n,o,s,r;var c=e[4];function i(t){return{props:{id:t[2],ref:t[3]}}}return c&&(o=new c(i(e))),{key:t,first:null,c(){n=b("li"),o&&K(o.$$.fragment),s=y(),this.first=n},m(t,e){g(t,n,e),o&&Q(o,n,null),$(n,s),r=!0},p(t,r){if(c!==(c=(e=t)[4])){if(o){z();const t=o;W(t.$$.fragment,1,0,(()=>{V(t,1)})),F()}c?(o=new c(i(e)),K(o.$$.fragment),U(o.$$.fragment,1),Q(o,n,s)):o=null}},i(t){r||(o&&U(o.$$.fragment,t),r=!0)},o(t){o&&W(o.$$.fragment,t),r=!1},d(t){t&&m(n),o&&V(o)}}}function se(t){let e,n,o=[],s=new Map,r=t[1];const c=t=>t[2];for(let e=0;e<r.length;e+=1){let n=Yt(t,r,e),i=c(n);s.set(i,o[e]=oe(i,n))}return{c(){e=b("ul");for(let t=0;t<o.length;t+=1)o[t].c();k(e,"class","nolist")},m(t,s){g(t,e,s);for(let t=0;t<o.length;t+=1)o[t].m(e,null);n=!0},p(t,n){2&n&&(r=t[1],z(),o=J(o,n,c,1,t,r,s,e,B,oe,null,Yt),F())},i(t){if(!n){for(let t=0;t<r.length;t+=1)U(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)W(o[t]);n=!1},d(t){t&&m(e);for(let t=0;t<o.length;t+=1)o[t].d()}}}function re(t){let e;return{c(){e=v("Nothing Here!")},m(t,n){g(t,e,n)},d(t){t&&m(e)}}}function ce(t){let e,n,o,s,r,c,i,l,a,u,d,f,h;return o=new nt({props:{title:"Solver Panel",$$slots:{default:[te]},$$scope:{ctx:t}}}),c=new nt({props:{title:"Global Constraints",$$slots:{default:[ne]},$$scope:{ctx:t}}}),a=new nt({props:{title:"Local Constraints",$$slots:{default:[se]},$$scope:{ctx:t}}}),f=new nt({props:{title:"Cosmetic Tools",$$slots:{default:[re]},$$scope:{ctx:t}}}),{c(){e=b("ul"),n=b("li"),K(o.$$.fragment),s=y(),r=b("li"),K(c.$$.fragment),i=y(),l=b("li"),K(a.$$.fragment),u=y(),d=b("li"),K(f.$$.fragment),k(e,"class","nolist")},m(t,p){g(t,e,p),$(e,n),Q(o,n,null),$(e,s),$(e,r),Q(c,r,null),$(e,i),$(e,l),Q(a,l,null),$(e,u),$(e,d),Q(f,d,null),h=!0},p(t,[e]){const n={};512&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n);const s={};512&e&&(s.$$scope={dirty:e,ctx:t}),c.$set(s);const r={};512&e&&(r.$$scope={dirty:e,ctx:t}),a.$set(r);const i={};512&e&&(i.$$scope={dirty:e,ctx:t}),f.$set(i)},i(t){h||(U(o.$$.fragment,t),U(c.$$.fragment,t),U(a.$$.fragment,t),U(f.$$.fragment,t),h=!0)},o(t){W(o.$$.fragment,t),W(c.$$.fragment,t),W(a.$$.fragment,t),W(f.$$.fragment,t),h=!1},d(t){t&&m(e),V(o),V(c),V(a),V(f)}}}function ie(t){const e=[],n=[];return Qt.ref("constraints/*").watch((([t,o],s,r)=>{if(null==r){const t=Vt[s.type]?e:n,r=t.findIndex((({id:t})=>o===t));if(0>r)throw Error(`Failed to find constraint with id ${o}.`);delete t[r]}else{const c=Vt[r.type]?e:n,i=Xt[r.type];if(null==i)return void console.error(`Unknown constraint type: ${r.type}.`);null==s?c.push({id:o,ref:Qt.ref(t,o,"value"),component:i}):s.type!==r.type&&console.error("Cannot change type of constraint!")}}),!0),[e,n]}Qt.update({grid:{width:9,height:9},constraints:{10800:{type:"diagonal",value:{positive:!0,negative:!1},meta:{order:0}},10090:{type:"knight",value:!1,meta:{order:1}},10100:{type:"king",value:!1,meta:{order:2}},10110:{type:"disjointGroups",value:!1,meta:{order:3}},10120:{type:"consecutive",value:!1,meta:{order:4}},10130:{type:"given",value:{12:3,13:4,39:4,40:1,64:3}},10140:{type:"thermo",value:{110:{0:"3",1:"13",2:"23"},120:{0:"29",1:"20",2:"21"}}},10150:{type:"arrow",value:{110:{head:{0:"27"},body:{0:"28",1:"29"}}}}}});class le extends Z{constructor(t){super(),Y(this,t,ie,ce,r,{})}}function ae(e){let n,s,r,c,i,l,a,u;return{c(){n=b("div"),s=b("div"),s.innerHTML='<div class="mode-pad-container svelte-n6htjt"><div class="mode-pad svelte-n6htjt"><button class="padbutton svelte-n6htjt">1</button> \n                <button class="padbutton svelte-n6htjt" style="font-size: 50%;">123</button> \n                <button class="padbutton svelte-n6htjt">m</button> \n                <button class="padbutton svelte-n6htjt">c</button></div></div> \n        <div class="right-container svelte-n6htjt"><div class="right svelte-n6htjt"><div class="num-pad svelte-n6htjt"><button class="padbutton svelte-n6htjt" style="grid-area: 1 / 1 / 2 / 2">1</button> \n                    <button class="padbutton svelte-n6htjt" style="grid-area: 1 / 2 / 2 / 3">2</button> \n                    <button class="padbutton svelte-n6htjt" style="grid-area: 1 / 3 / 2 / 4">3</button> \n\n                    <button class="padbutton svelte-n6htjt" style="grid-area: 2 / 1 / 3 / 2">4</button> \n                    <button class="padbutton svelte-n6htjt" style="grid-area: 2 / 2 / 3 / 3">5</button> \n                    <button class="padbutton svelte-n6htjt" style="grid-area: 2 / 3 / 3 / 4">6</button> \n\n                    <button class="padbutton svelte-n6htjt" style="grid-area: 3 / 1 / 4 / 2">7</button> \n                    <button class="padbutton svelte-n6htjt" style="grid-area: 3 / 2 / 4 / 3">8</button> \n                    <button class="padbutton svelte-n6htjt" style="grid-area: 3 / 3 / 4 / 4">9</button> \n\n                    <button class="padbutton svelte-n6htjt" style="grid-area: 4 / 1 / 5 / 2">0</button> \n                    <button class="padbutton svelte-n6htjt" style="grid-area: 4 / 2 / 5 / 4; border-radius: 7.5% / 15%" title="Delete" aria-label="Delete"><span class="icon icon-inline icon-c-textinv icon-delete"></span></button></div> \n                <div class="ctrl-pad svelte-n6htjt"><button class="padbutton svelte-n6htjt" title="Undo" aria-label="Undo"><span class="icon icon-inline icon-c-textinv icon-undo"></span></button> \n                    <button class="padbutton svelte-n6htjt" title="Redo" aria-label="Redo"><span class="icon icon-inline icon-c-textinv icon-undo redo svelte-n6htjt"></span></button> \n                    <button class="padbutton svelte-n6htjt" title="Take Screenshot" aria-label="Take Screenshot"><span class="icon icon-inline icon-c-textinv icon-screenshot"></span></button></div></div></div>',r=y(),c=b("h4"),c.textContent="Rules",i=y(),l=b("textarea"),k(s,"class","entry-pad svelte-n6htjt"),k(c,"class","rules svelte-n6htjt"),k(l,"class","rules-text svelte-n6htjt"),k(l,"spellcheck","false"),l.value="Normal sudoku rules do not apply. In each row, column, and box, place eight of the nine digits from 1-9, and repeat one of them; one digit in each set must be missing.\n\nNo two rows, no two columns, and no two boxes may share the same repeated or missing digit.\n\nThe clues (sandwich sums) outside the grid indicate the sum of the digits between any 1 and any 9 in the appropriate row or column: at least one set must sum correctly. Such a row or column must have at least one 1 and at least one 9.\n\nThe sum of the cells on an arrow is the digit placed in its circle; digits may repeat along an arrow if allowed by the other rules.",k(n,"class","entry-column svelte-n6htjt")},m(t,o){g(t,n,o),$(n,s),e[1](s),$(n,r),$(n,c),$(n,i),$(n,l),a||(u=[w(l,"focus",ue),w(l,"blur",ue)],a=!0)},p:t,i:t,o:t,d(t){t&&m(n),e[1](null),a=!1,o(u)}}}function ue(t){t.currentTarget.setAttribute("spellcheck",`${document.activeElement===t.currentTarget}`)}function de(t,e,n){let o;function s(){n(0,o.style.fontSize=.12*o.clientWidth+"px",o)}return window.addEventListener("resize",s),O((()=>window.removeEventListener("resize",s))),requestAnimationFrame(s),[o,function(t){E[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class fe extends Z{constructor(t){super(),Y(this,t,de,ae,r,{})}}function he(e){let n,o,s,r,c;return{c(){n=b("div"),n.innerHTML='<ul class="header-buttons left svelte-tt0eff"><li>Solving/Setting</li> \n        <li>New Grid</li> \n        <li>Export</li></ul>',o=y(),s=b("div"),s.innerHTML='<h1 class="svelte-tt0eff">Double Agent</h1> \n    <div class="setter svelte-tt0eff">by echoes and TauCeti Deichmann</div>',r=y(),c=b("div"),c.innerHTML='<ul class="header-buttons right svelte-tt0eff"><li>Light/dark</li> \n        <li>Help</li> \n        <li>Settings</li></ul>',k(n,"class","header-left svelte-tt0eff"),k(s,"class","header-center svelte-tt0eff"),k(c,"class","header-right svelte-tt0eff")},m(t,e){g(t,n,e),g(t,o,e),g(t,s,e),g(t,r,e),g(t,c,e)},p:t,i:t,o:t,d(t){t&&m(n),t&&m(o),t&&m(s),t&&m(r),t&&m(c)}}}class pe extends Z{constructor(t){super(),Y(this,t,null,he,r,{})}}function $e(e){let n,o,s,r,c,i,l,a,u,d,f,h,p,v,w,_,x,j;return r=new pe({}),d=new le({}),w=new fe({}),{c(){n=b("header"),o=b("div"),s=b("div"),K(r.$$.fragment),c=y(),i=b("main"),l=b("div"),a=b("div"),u=b("div"),K(d.$$.fragment),f=y(),h=b("div"),h.innerHTML='<img src="svg/example-grid.svg" alt="Sudoku Grid"/>',p=y(),v=b("div"),K(w.$$.fragment),_=y(),x=b("footer"),x.textContent="SudokuStudio",k(s,"class","content-row"),k(o,"class","content"),k(n,"class","svelte-q96pc2"),k(u,"class","left-panel svelte-q96pc2"),k(h,"class","center-panel svelte-q96pc2"),k(v,"class","right-panel svelte-q96pc2"),k(a,"class","content-row svelte-q96pc2"),k(l,"class","content svelte-q96pc2"),k(i,"class","svelte-q96pc2"),k(x,"class","svelte-q96pc2")},m(t,e){g(t,n,e),$(n,o),$(o,s),Q(r,s,null),g(t,c,e),g(t,i,e),$(i,l),$(l,a),$(a,u),Q(d,u,null),$(a,f),$(a,h),$(a,p),$(a,v),Q(w,v,null),g(t,_,e),g(t,x,e),j=!0},p:t,i(t){j||(U(r.$$.fragment,t),U(d.$$.fragment,t),U(w.$$.fragment,t),j=!0)},o(t){W(r.$$.fragment,t),W(d.$$.fragment,t),W(w.$$.fragment,t),j=!1},d(t){t&&m(n),V(r),t&&m(c),t&&m(i),V(d),V(w),t&&m(_),t&&m(x)}}}return new class extends Z{constructor(t){super(),Y(this,t,null,$e,r,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
