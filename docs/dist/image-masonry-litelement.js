!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},n={},r={},o=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${o}--\x3e`,h=new RegExp(`${o}|${a}`),c="$lit$";class l{constructor(t,e){this.parts=[],this.element=e;const s=[],i=[],n=document.createTreeWalker(e.content,133,null,!1);let r=0,a=-1,l=0;const{strings:u,values:{length:_}}=t;for(;l<_;){const t=n.nextNode();if(null!==t){if(a++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)d(e[t].name,c)&&i++;for(;i-- >0;){const e=u[l],s=m.exec(e)[2],i=s.toLowerCase()+c,n=t.getAttribute(i);t.removeAttribute(i);const r=n.split(h);this.parts.push({type:"attribute",index:a,name:s,strings:r}),l+=r.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(o)>=0){const i=t.parentNode,n=e.split(h),r=n.length-1;for(let e=0;e<r;e++){let s,r=n[e];if(""===r)s=p();else{const t=m.exec(r);null!==t&&d(t[2],c)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-c.length)+t[3]),s=document.createTextNode(r)}i.insertBefore(s,t),this.parts.push({type:"node",index:++a})}""===n[r]?(i.insertBefore(p(),t),s.push(t)):t.data=n[r],l+=r}}else if(8===t.nodeType)if(t.data===o){const e=t.parentNode;null!==t.previousSibling&&a!==r||(a++,e.insertBefore(p(),t)),r=a,this.parts.push({type:"node",index:a}),null===t.nextSibling?t.data="":(s.push(t),a--),l++}else{let e=-1;for(;-1!==(e=t.data.indexOf(o,e+1));)this.parts.push({type:"node",index:-1}),l++}}else n.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const d=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},u=t=>-1!==t.index,p=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,h=n.nextNode();for(;o<i.length;)if(r=i[o],u(r)){for(;a<r.index;)a++,"TEMPLATE"===h.nodeName&&(e.push(h),n.currentNode=h.content),null===(h=n.nextNode())&&(n.currentNode=e.pop(),h=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(h.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(h,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}const g=` ${o} `;class f{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],n=t.lastIndexOf("\x3c!--");s=(n>-1||s)&&-1===t.indexOf("--\x3e",n+1);const r=m.exec(t);e+=null===r?t+(s?g:a):t.substr(0,r.index)+r[1]+r[2]+c+r[3]+o}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>null===t||!("object"==typeof t||"function"==typeof t),v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class w{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(y(t)||!v(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===n||y(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class x{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(p()),this.endNode=t.appendChild(p())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=p()),t.__insert(this.endNode=p())}insertAfterPart(t){t.__insert(this.startNode=p()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}const t=this.__pendingValue;t!==n&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof f?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===r?(this.value=r,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const s=new _(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)void 0===(s=e[i])&&(s=new x(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class b{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=n}}class C extends w{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends S{}let N=!1;try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class E{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=this.__pendingValue,s=this.value,i=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),r=null!=t&&(null==s||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=n}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const A=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];if("."===n){return new C(t,e.slice(1),s).parts}return"@"===n?[new E(t,e.slice(1),i.eventContext)]:"?"===n?[new b(t,e.slice(1),s)]:new w(t,e,s).parts}handleTextExpression(t){return new x(t)}};function L(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(o);return void 0===(s=e.keyString.get(i))&&(s=new l(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const V=new Map,k=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const z=(t,...e)=>new f(t,e,"html",A),R=133;function U(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,R,null,!1);let r=O(i),o=i[r],a=-1,h=0;const c=[];let l=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===l&&(l=null),e.has(t)&&(c.push(t),null===l&&(l=t)),null!==l&&h++;void 0!==o&&o.index===a;)o.index=null!==l?-1:o.index-h,o=i[r=O(i,r)]}c.forEach(t=>t.parentNode.removeChild(t))}const M=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,R,null,!1);for(;s.nextNode();)e++;return e},O=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(u(e))return s}return-1};const F=(t,e)=>`${t}--${e}`;let $=!0;void 0===window.ShadyCSS?$=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),$=!1);const W=t=>e=>{const s=F(e.type,t);let i=V.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},V.set(s,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(o);if(void 0===(n=i.keyString.get(r))){const s=e.getTemplateElement();$&&window.ShadyCSS.prepareTemplateDom(s,t),n=new l(e,s),i.keyString.set(r,n)}return i.stringsArray.set(e.strings,n),n},q=["html","svg"],H=new Set,I=(t,e,s)=>{H.add(t);const i=s?s.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{q.forEach(e=>{const s=V.get(F(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),U(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,R,null,!1);let o=O(n),a=0,h=-1;for(;r.nextNode();){for(h++,r.currentNode===s&&(a=M(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===h;){if(a>0){for(;-1!==o;)n[o].index+=a,o=O(n,o);return}o=O(n,o)}}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const h=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==h)e.insertBefore(h.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),U(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const j={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),D={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:B},J=Promise.resolve(!0),Z=1,G=4,Q=8,Y=16,K=32,X="finalized";class tt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=J,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=D){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const i=this[t];this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(X)||t.finalize(),this[X]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=B){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||j,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||j.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|K,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=D){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|Q,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~Q}}_attributeToProperty(t,e){if(this._updateState&Q)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||D;this._updateState=this._updateState|Y,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Y}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,n=i._classProperties.get(t)||D;i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|G;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&K}get _hasRequestedUpdate(){return this._updateState&G}get hasUpdated(){return this._updateState&Z}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&Z||(this._updateState=this._updateState|Z,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~G}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}tt[X]=!0;const et="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol();class it{constructor(t,e){if(e!==st)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(et?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const nt=t=>new it(String(t),st),rt=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof it)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new it(s,st)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const ot=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let i=0,n=e.length;i<n;i++){const n=e[i];Array.isArray(n)?t(n,s):s.push(n)}return s}(t);class at extends tt{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ot(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?et?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}at.finalized=!0,at.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,r=k.has(e),o=$&&11===e.nodeType&&!!e.host,a=o&&!H.has(n),h=a?document.createDocumentFragment():e;if(((t,e,s)=>{let n=k.get(e);void 0===n&&(i(e,e.firstChild),k.set(e,n=new x(Object.assign({templateFactory:L},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,h,Object.assign({templateFactory:W(n)},s)),a){const t=k.get(h);k.delete(h);const s=t.value instanceof _?t.value.template:void 0;I(n,h,s),i(e,e.firstChild),e.appendChild(h),k.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)};const ht={single_source_shortest_paths:function(t,e,s){var i={},n={};n[e]=0;var r,o,a,h,c,l,d=new ct((function(t){return t.cost}));for(d.push({value:e,cost:0});d.size();)for(var u in o=(r=d.pop()).value,a=r.cost,h=t(o)||{})c=a+h[u],l=n[u],(void 0===n[u]||l>c)&&(n[u]=c,d.push({value:u,cost:c}),i[u]=o);if(void 0===n[s]){var p=["Could not find a path from ",e," to ",s,"."].join("");throw new Error(p)}return i},extract_shortest_path_from_predecessor_list:function(t,e){for(var s=[],i=e;i;)s.push(i),t[i],i=t[i];return s.reverse(),s},find_path:function(t,e,s){var i=ht.single_source_shortest_paths(t,e,s);return ht.extract_shortest_path_from_predecessor_list(i,s)}};function ct(t){this.content=[],this.scoreFunction=t}function lt(t,e){return e/t}function dt(t,e){return t/e}function ut(t,e,s){return function(t,e){return t*e}(e,lt(t.reduce((t,{scaledWidth:e})=>t+e,0),s))}function pt(t,e,s,i,n){const r=ut(t.slice(e,s),i,n);return Math.pow(Math.abs(r-n),2)}function mt(t,e,s,i=8,n=!1){const r=t.map(t=>{const e=lt(t.width,t.height);return{...t,ratio:e,scaledWidth:dt(s,e),scaledHeight:s,scaledWidthPc:0}}),o=ht.find_path(t=>{const n={};n[t=+t]=0;for(let o=t+1;o<r.length+1&&!(o-t>i);++o)n[""+o]=pt(r,t,o,e,s);return n},"0",r.length),a=[],h=[];for(let t=0;t<o.length;t++)if(o[t+1]){const i=r.slice(+o[t],+o[t+1]),n=ut(i,e,s);i.forEach(t=>{t.scaledWidth=dt(n,t.ratio),t.scaledHeight=n,t.scaledWidthPc=t.scaledWidth/e*100,h.push(t)}),a.push(i)}return n?a:h}function _t(t){var e=t.target||t.srcElement;e.__resizeRAF__&&cancelAnimationFrame(e.__resizeRAF__),e.__resizeRAF__=requestAnimationFrame((function(){var s=e.__resizeTrigger__,i=s&&s.__resizeListeners__;i&&i.forEach((function(e){e.call(s,t)}))}))}ct.prototype={push:function(t){this.content.push(t),this.bubbleUp(this.content.length-1)},pop:function(){var t=this.content[0],e=this.content.pop();return this.content.length>0&&(this.content[0]=e,this.sinkDown(0)),t},remove:function(t){for(var e=this.content.length,s=0;s<e;s++)if(this.content[s]===t){var i=this.content.pop();return void(s!==e-1&&(this.content[s]=i,this.scoreFunction(i)<this.scoreFunction(t)?this.bubbleUp(s):this.sinkDown(s)))}throw new Error("Node not found.")},size:function(){return this.content.length},bubbleUp:function(t){for(var e=this.content[t];t>0;){var s=Math.floor((t+1)/2)-1,i=this.content[s];if(!(this.scoreFunction(e)<this.scoreFunction(i)))break;this.content[s]=e,this.content[t]=i,t=s}},sinkDown:function(t){for(var e=this.content.length,s=this.content[t],i=this.scoreFunction(s);;){var n=2*(t+1),r=n-1,o=null;if(r<e){var a=this.content[r],h=this.scoreFunction(a);h<i&&(o=r)}if(n<e){var c=this.content[n];this.scoreFunction(c)<(null===o?i:h)&&(o=n)}if(null==o)break;this.content[t]=this.content[o],this.content[o]=s,t=o}}};var gt=function(t,e){var s,i=this.document,n=i.attachEvent;if("undefined"!=typeof navigator&&(s=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!t.__resizeListeners__)if(t.__resizeListeners__=[],n)t.__resizeTrigger__=t,t.attachEvent("onresize",_t);else{"static"===getComputedStyle(t).position&&(t.style.position="relative");var r=t.__resizeTrigger__=i.createElement("object");r.setAttribute("style","position: absolute; top: 0; left: 0; height: 100%; width: 100%; pointer-events: none; z-index: -1; opacity: 0;"),r.setAttribute("class","resize-sensor"),r.setAttribute("tabindex","-1"),r.__resizeElement__=t,r.onload=function(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",_t)},r.type="text/html",s&&t.appendChild(r),r.data="about:blank",s||t.appendChild(r)}t.__resizeListeners__.push(e)},ft="undefined"==typeof window?gt:gt.bind(window),yt=function(t,e){var s=document.attachEvent,i=t.__resizeListeners__||[];if(e){var n=i.indexOf(e);-1!==n&&i.splice(n,1)}else i=t.__resizeListeners__=[];if(!i.length){if(s)t.detachEvent("onresize",_t);else if(t.__resizeTrigger__){var r=t.__resizeTrigger__.contentDocument,o=r&&r.defaultView;o&&(o.removeEventListener("resize",_t),delete o.__resizeTrigger__),t.__resizeTrigger__=!t.removeChild(t.__resizeTrigger__)}delete t.__resizeListeners__}};ft.unbind=yt;var vt=".image-masonry {\r\n  box-sizing: border-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.image-masonry-item {\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  padding: 1px\r\n}\r\n\r\n.image-masonry-item img {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n";customElements.define("image-masonry",class extends at{static get properties(){return{images:{type:Array},scaledImages:{type:Array},width:{type:Number},targetRowHeight:{type:Number},imageTemplate:{type:Function},imageStyle:{type:String}}}constructor(){super(),this.scaledImages=[],this.width=0,this.targetRowHeight=220}static get styles(){return rt`
      :host {
        display: block;
      }
      ${nt(vt)}
    `}firstUpdated(){const t=()=>{this.width=this.getBoundingClientRect().width,this.scaledImages=mt(this.images,this.width,this.targetRowHeight)};ft(this.shadowRoot.querySelector(".image-masonry"),()=>{Math.round(this.width)!==Math.round(this.getBoundingClientRect().width)&&t()}),t()}updated(t){(t.get("images")||t.get("targetRowHeight"))&&(this.scaledImages=mt(this.images,this.width,this.targetRowHeight))}makeStyle({scaledWidthPc:t,scaledHeight:e}){return`width:${t}%; height:${e}px;`}handleClick(t,e){const s=new CustomEvent("image-click",{detail:{index:t,event:e,image:this.images[t]}});this.dispatchEvent(s)}render(){return z`
      ${this.imageStyle?z`<style>${this.imageStyle}</style>`:""}
      <div class="image-masonry">
        ${this.scaledImages.map((t,e)=>z`
          <div class="image-masonry-item" style="${this.makeStyle(t)}" @click="${t=>this.handleClick(e,t)}">
            <img src="${t.src}" alt="${t.alt||""}" />
            ${this.imageTemplate&&this.imageTemplate(t,e)}
          </div>
        `)}
      </div>
    `}disconnectedCallback(){const t=this.shadowRoot.querySelector(".image-masonry");t&&yt(t),super.disconnectedCallback()}});var wt=[{src:"https://source.unsplash.com/V6TWE6h8gyg/800x600",width:800,height:600,title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},{src:"https://source.unsplash.com/dtaPArYUDg4/800x600",width:800,height:600,title:"Lorem ipsum dolor sit amet"},{src:"https://source.unsplash.com/R_kik2MoltU/600x799",width:600,height:799,title:"Lorem ipsum"},{src:"https://source.unsplash.com/8LPgWfHgcMg/600x799",width:600,height:799,title:"Lorem ipsum dolor sit amet"},{src:"https://source.unsplash.com/mC_puQe4V3g/600x800",width:600,height:800,title:"Lorem ipsum"},{src:"https://source.unsplash.com/_LuLiJc1cdo/800x600",width:800,height:600,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/v7daTKlZzaw/800x599",width:800,height:599,title:"Lorem ipsum"},{src:"https://source.unsplash.com/s7qZayMy6Go/600x799",width:600,height:799,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/rB-4G58XFt0/600x800",width:600,height:800,title:"Lorem ipsum"},{src:"https://source.unsplash.com/fg6g2u5oklo/1000x300",width:1e3,height:400,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/eVwzKfnEGDg/800x600",width:800,height:600,title:"Lorem ipsum"},{src:"https://source.unsplash.com/F_eLtGyrlNY/600x800",width:600,height:800,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/9270-pFGVTU/800x600",width:800,height:600,title:"Lorem ipsum"},{src:"https://source.unsplash.com/R4y_E5ZQDPg/800x599",width:800,height:599,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/-QTa5xYxDCs/800x599",width:800,height:599,title:"Lorem ipsum"},{src:"https://source.unsplash.com/Sfs_64L9UHE/600x800",width:600,height:800,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/pR166OP_l6g/800x600",width:800,height:600,title:"Lorem ipsum"},{src:"https://source.unsplash.com/hlvtJ4JkVfc/800x600",width:800,height:600,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/AUYr7ptqSRQ/800x400",width:800,height:400,title:"Lorem ipsum"},{src:"https://source.unsplash.com/E7PlRr9ZfoM/800x600",width:800,height:600,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/GhlotfzelR4/800x600",width:800,height:600,title:"Lorem ipsum"},{src:"https://source.unsplash.com/Xvlc79bu9MA/800x600",width:800,height:600,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/txRO7-0I8wU/600x800",width:600,height:800,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/e2uTOpgW5Ec/1000x300",width:1e3,height:300,title:"Lorem ipsum"},{src:"https://source.unsplash.com/5BsNkTMbZZ0/800x600",width:800,height:600,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/_31y-mxvRWI/600x800",width:600,height:800,title:"Lorem ipsum dolor"},{src:"https://source.unsplash.com/VrrZAVkzfWE/800x600",width:800,height:600,title:"Lorem ipsum"}];customElements.define("image-masonry-example",class extends at{static get properties(){return{images:{type:Array}}}constructor(){super(),this.images=wt}render(){return z`
      <image-masonry .images=${this.images}></image-masonry>
    `}})}));
//# sourceMappingURL=image-masonry-litelement.js.map
