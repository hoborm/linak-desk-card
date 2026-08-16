function e(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${n}`);class r{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],r=document.createTreeWalker(t.content,133,null,!1);let c=0,h=-1,u=0;const{strings:p,values:{length:g}}=e;for(;u<g;){const e=r.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)a(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=p[u],i=d.exec(t)[2],s=i.toLowerCase()+"$lit$",n=e.getAttribute(s);e.removeAttribute(s);const r=n.split(o);this.parts.push({type:"attribute",index:h,name:i,strings:r}),u+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,n=t.split(o),r=n.length-1;for(let t=0;t<r;t++){let i,o=n[t];if(""===o)i=l();else{const e=d.exec(o);null!==e&&a(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(o)}s.insertBefore(i,e),this.parts.push({type:"node",index:++h})}""===n[r]?(s.insertBefore(l(),e),i.push(e)):e.data=n[r],u+=r}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&h!==c||(h++,t.insertBefore(l(),e)),c=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(i.push(e),h--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else r.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const a=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},c=e=>-1!==e.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:i},parts:s}=e,n=document.createTreeWalker(i,133,null,!1);let o=p(s),r=s[o],a=-1,c=0;const l=[];let d=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-c,o=p(s,o),r=s[o]}l.forEach((e=>e.parentNode.removeChild(e)))}const u=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},p=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(c(t))return i}return-1};const g=new WeakMap,m=e=>"function"==typeof e&&g.has(e),f={},_={};class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let o,r=0,a=0,l=n.nextNode();for(;r<s.length;)if(o=s[r],c(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(i.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=i.pop(),l=n.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const A=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${s} `;class b{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let o=0;o<e;o++){const e=this.strings[o],r=e.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===e.indexOf("--\x3e",r+1);const a=d.exec(e);t+=null===a?e+(i?y:n):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==A&&(t=A.createHTML(t)),e.innerHTML=t,e}}const x=e=>null===e||!("object"==typeof e||"function"==typeof e),w=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!w(e))return e}let s="";for(let n=0;n<t;n++){s+=e[n];const t=i[n];if(void 0!==t){const e=t.value;if(x(e)||!w(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||x(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):w(e)?this.__commitIterable(e):e===_?(this.value=_,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const n of e)i=t[s],void 0===i&&(i=new E(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(n),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class N{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class k extends S{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends C{}let B=!1;(()=>{try{const e={get capture(){return B=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class Q{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=O(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const O=e=>e&&(B?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function j(e){let t=G.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},G.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return i=t.keyString.get(n),void 0===i&&(i=new r(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const G=new Map,D=new WeakMap;const V=new class{handleAttributeExpressions(e,t,i,s){const n=t[0];if("."===n){return new k(e,t.slice(1),i).parts}if("@"===n)return[new Q(e,t.slice(1),s.eventContext)];if("?"===n)return[new N(e,t.slice(1),i)];return new S(e,t,i).parts}handleTextExpression(e){return new E(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const z=(e,...t)=>new b(e,t,"html",V),T=(e,t)=>`${e}--${t}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const M=e=>t=>{const i=T(t.type,e);let n=G.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},G.set(i,n));let o=n.stringsArray.get(t.strings);if(void 0!==o)return o;const a=t.strings.join(s);if(o=n.keyString.get(a),void 0===o){const i=t.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,e),o=new r(t,i),n.keyString.set(a,o)}return n.stringsArray.set(t.strings,o),o},L=["html","svg"],U=new Set,R=(e,t,i)=>{U.add(e);const s=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=n[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{L.forEach((t=>{const i=G.get(T(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),h(e,i)}))}))})(e);const a=s.content;i?function(e,t,i=null){const{element:{content:s},parts:n}=e;if(null==i)return void s.appendChild(t);const o=document.createTreeWalker(s,133,null,!1);let r=p(n),a=0,c=-1;for(;o.nextNode();)for(c++,o.currentNode===i&&(a=u(t),i.parentNode.insertBefore(t,i));-1!==r&&n[r].index===c;){if(a>0){for(;-1!==r;)n[r].index+=a,r=p(n,r);return}r=p(n,r)}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),h(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const H={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},I=(e,t)=>t!==e&&(t==t||e==e),F={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:I};class $ extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=F){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const n=this[e];this[t]=s,this.requestUpdateInternal(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||F}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=I){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||H,n="function"==typeof s?s:s.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||H.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=F){const s=this.constructor,n=s._attributeNameForProperty(e,i);if(void 0!==n){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const n=this.constructor;i=i||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}$.finalized=!0;const K=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),W=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function X(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):W(e,t)}function J(e){return X({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}const Y=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol();class ee{constructor(e,t){if(t!==Z)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Y?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const i=t.reduce(((t,i,s)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1]),e[0]);return new ee(i,Z)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ie={};class se extends ${static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),s=[];i.forEach((e=>s.unshift(e))),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Y){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new ee(String(t),Z)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Y?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ie&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return ie}}se.finalized=!0,se.render=(e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,o=D.has(t),r=q&&11===t.nodeType&&!!t.host,a=r&&!U.has(n),c=a?document.createDocumentFragment():t;if(((e,t,s)=>{let n=D.get(t);void 0===n&&(i(t,t.firstChild),D.set(t,n=new E(Object.assign({templateFactory:j},s))),n.appendInto(t)),n.setValue(e),n.commit()})(e,c,Object.assign({templateFactory:M(n)},s)),a){const e=D.get(c);D.delete(c);const s=e.value instanceof v?e.value.template:void 0;R(n,c,s),i(t,t.firstChild),t.appendChild(c),D.set(t,e)}!o&&r&&window.ShadyCSS.styleElement(t.host)};var ne={version:"Version",name:"Linak Desk Card",description:"Card for controlling table height",invalid_configuration:"Invalid configuration",desk_and_height_required:"Desk and height sensor are required",min_and_max_height_required:"`min_height` and `max_height` settings are required"},oe={name:"Name (Optional)",desk:"Desk Entity (Required)",height_sensor:"Height Sensor (Required)",connection_sensor:"Connection Sensor (Required)",moving_sensor:"Moving Sensor (Required)",min_height:"Min Height (Required)",max_height:"Max Height (Required)",presets:"Presets"},re={connected:"Connected",disconnected:"Disconnected"},ae={common:ne,editor:oe,status:re},ce={version:"Версія",name:"Linak Desk Card",description:"Карточка для керування висотою стола",invalid_configuration:"Непоправна конфігурація",desk_and_height_required:"Стіл і датчик висоти є обов’язковими",min_and_max_height_required:"Потрібні налаштування `min_height` та` max_height`"},le={name:"Ім’я (Необов’язкове)",desk:"Стіл (Обов’язкове)",height_sensor:"Датчик висоти (Обов’язкове)",connection_sensor:"Датчик підключення (Обов’язкове)",moving_sensor:"Датчик руху (Обов’язкове)",min_height:"Мінімальна висота (Обов’язкове)",max_height:"Максимальна висота (Обов’язкове)",presets:"Пресети"},de={connected:"Підключенно",disconnected:"Відключенно"},he={common:ce,editor:le,status:de},ue={version:"Version",name:"Linak Schreibtisch Karte",description:"Kontrolliere die Tischhöhe mit dieser Karte",invalid_configuration:"Fehlerhafte Konfiguration",desk_and_height_required:"Tisch- und Höhensensor sind erforderlich",min_and_max_height_required:"min_height und max_height Einstellungen sind erforderlich"},pe={name:"Name (optional)",desk:"Tisch Entität (erforderlich)",height_sensor:"Höhensensor (erforderlich)",connection_sensor:"Verbindungs-Sensor (erforderlich)",moving_sensor:"Höhen-Sensor (erforderlich)",min_height:"Minimale Höhe (erforderlich)",max_height:"Maximale Höhe (erforderlich)",presets:"Voreinstellungen"},ge={connected:"Verbunden",disconnected:"Getrennt"},me={common:ue,editor:pe,status:ge},fe={version:"Version",name:"Carte bureau Linak",description:"Carte permettant de contrôler la hauteur du bureau",invalid_configuration:"Configuration invalide",desk_and_height_required:"Le bureau et la hauteur sont requis"},_e={name:"Nom (Optionel)",desk:"Entité du bureau (Requis)",height_sensor:"Capteur de hauteur (Requis)",connection_sensor:"Capteur de connexion (Requis)",moving_sensor:"Capteur de hauteur (Requis)",min_height:"Hauteur minimale (Requis)",max_height:"Hauteur maximale (Requis)",presets:"Réglages"},ve={connected:"Connecté",disconnected:"Déconnecté"},Ae={common:fe,editor:_e,status:ve},ye={version:"Wersja",name:"Karta biurka Linak",description:"Karta do kontrolowania wysokości biurka",invalid_configuration:"Niepoprawna konfiguracja",desk_and_height_required:"Sensor biurka oraz wyskości są wymagane",min_and_max_height_required:"`min_height` oraz `max_height` są wymagane"},be={name:"Nazwa (Opcjonalna)",desk:"Encja Biurka (Wymagane)",height_sensor:"Sensor wysokości biurka (Wymagane)",connection_sensor:"Sensor połączenia z biurkiem (Wymagane)",moving_sensor:"Sensor ruchu biurka (Wymagane)",min_height:"Minimalna wysokość(Wymagane)",max_height:"Maksymalna wysokość (Wymagane)",presets:"Profile"},xe={connected:"Połączono",disconnected:"Rozłączono"},we={common:ye,editor:be,status:xe};const Se={en:Object.freeze({__proto__:null,common:ne,editor:oe,status:re,default:ae}),uk:Object.freeze({__proto__:null,common:ce,editor:le,status:de,default:he}),de:Object.freeze({__proto__:null,common:ue,editor:pe,status:ge,default:me}),fr:Object.freeze({__proto__:null,common:fe,editor:_e,status:ve,default:Ae}),pl:Object.freeze({__proto__:null,common:ye,editor:be,status:xe,default:we})};function Ce(e,t="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let n;try{n=e.split(".").reduce(((e,t)=>e[t]),Se[s])}catch(t){n=e.split(".").reduce(((e,t)=>e[t]),Se.en)}return void 0===n&&(n=e.split(".").reduce(((e,t)=>e[t]),Se.en)),""!==t&&""!==i&&(n=n.replace(t,i)),n}let Ee=class extends se{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return z``;return z`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${[{name:"name",selector:{text:{}}},{name:"desk",required:!0,selector:{entity:{domain:"cover"}}},{name:"height_sensor",required:!0,selector:{entity:{domain:"sensor",device_class:"distance"}}},{name:"hide_preset_height",selector:{boolean:{}}}]}
          .computeLabel=${e=>{switch(e.name){case"name":return Ce("editor.name")||"Name";case"desk":return Ce("editor.desk")||"Desk Entity";case"height_sensor":return Ce("editor.height_sensor")||"Height Sensor";case"hide_preset_height":return Ce("editor.hide_preset_height")||"Hide preset height values";default:return e.name}}}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="palette-container">
          <div class="palette-header">
            <h4>Color palette</h4>
            <ha-button variant="outlined" @click=${this.resetColors}>
              <ha-icon icon="mdi:palette-swatch" style="margin-right: 8px;"></ha-icon>
              Reset colors
            </ha-button>
          </div>

          ${[{configValue:"gradient_top_color",label:"Gradient top",fallback:"#03a9f4"},{configValue:"gradient_bottom_color",label:"Gradient bottom",fallback:"#0288d1"},{configValue:"text_color",label:"Text",fallback:"#ffffff"}].map((e=>z`
              <div class="color-row">
                <label for=${e.configValue}>${e.label}</label>
                <input
                  id=${e.configValue}
                  type="color"
                  .value=${this._config[e.configValue]||e.fallback}
                  .configValue=${e.configValue}
                  @change=${this._colorChanged}
                />
              </div>
            `))}
        </div>

        <div class="presets-container">
          <h4>${Ce("editor.presets")||"Presets"}</h4>
          ${(this._config.presets||[]).map(((e,t)=>z`
              <div class="preset">
                <ha-input
                  .hint=${"Label"}
                  .value=${e.label}
                  .presetValue=${"label"}
                  .presetIndex=${t}
                  @input=${this._presetChanged}
                ></ha-input>
                <ha-input
                  .hint=${"Target (cm)"}
                  .value=${e.target}
                  .presetValue=${"target"}
                  .presetIndex=${t}
                  type="number"
                  @input=${this._presetChanged}
                ></ha-input>
                <ha-icon-button
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  .presetIndex=${t}
                  @click=${this.removePreset}
                ></ha-icon-button>
              </div>
            `))}
          <div class="add-preset" @click=${this.addPreset}>
            <ha-icon icon="mdi:plus"></ha-icon>
            Add Preset
          </div>
        </div>
      </div>
    `}_presetChanged(e){const t=e.target,i="number"===t.type?parseInt(t.value,10)||0:t.value,s=[...this._config.presets||[]];s[t.presetIndex]={...s[t.presetIndex],[t.presetValue]:i},this._config={...this._config,presets:s},this.fireConfigChangeEvent()}_colorChanged(e){const t=e.target;t.configValue&&(this._config={...this._config,[t.configValue]:t.value},this.fireConfigChangeEvent())}resetColors(){const e={...this._config};delete e.gradient_top_color,delete e.gradient_bottom_color,delete e.text_color,this._config=e,this.fireConfigChangeEvent()}fireConfigChangeEvent(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_valueChanged(e){this._config&&this.hass&&(this._config={...this._config,...e.detail.value},this.fireConfigChangeEvent())}addPreset(){this._config={...this._config,presets:[...this._config.presets||[],{label:"New Preset",target:62}]},this.fireConfigChangeEvent()}removePreset(e){const t=e.currentTarget.presetIndex;this._config={...this._config,presets:(this._config.presets||[]).filter(((e,i)=>i!==t))},this.fireConfigChangeEvent()}static get styles(){return te`
      .palette-container,
      .presets-container {
        margin-top: 24px;
      }

      .palette-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      .palette-header h4 {
        margin: 0;
      }

      .color-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 44px;
      }

      .color-row label {
        color: var(--primary-text-color);
      }

      .color-row input[type='color'] {
        width: 48px;
        height: 32px;
        padding: 0;
        border: 0;
        border-radius: 6px;
        background: transparent;
        cursor: pointer;
      }

      .preset {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        position: relative;
        gap: 16px;
        margin-bottom: 8px;
        padding-right: 48px;
      }

      .preset > ha-input {
        flex: 1;
      }

      ha-icon-button {
        color: var(--secondary-text-color);
        position: absolute;
        right: -8px;
        top: 8px;
        --mdc-icon-button-size: 40px;
      }

      .add-preset {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--primary-color);
        cursor: pointer;
        font-weight: 500;
        margin-top: 12px;
        padding: 8px 0;
        user-select: none;
        -webkit-user-select: none;
      }

      .add-preset:hover {
        text-decoration: underline;
      }
    `}};e([X({attribute:!1})],Ee.prototype,"hass",void 0),e([J()],Ee.prototype,"_config",void 0),Ee=e([K("linak-desk-card-editor")],Ee),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"linak-desk-card",name:Ce("common.name"),description:Ce("common.description")});const Ne={min_height:62,max_height:127,presets:[],hide_preset_height:!1};let ke=class extends se{static async getConfigElement(){return document.createElement("linak-desk-card-editor")}static getStubConfig(){return{...Ne}}setConfig(e){if(!e.desk)throw new Error("Desk cover entity is required");if(!e.height_sensor)throw new Error("Height sensor entity is required");this.config={...Ne,...e}}get desk(){return this.hass.states[this.config.desk]}get rawHeight(){var e;return parseFloat(null===(e=this.hass.states[this.config.height_sensor])||void 0===e?void 0:e.state)||0}get displayHeight(){const e=this.hass.states[this.config.height_sensor];return e&&this.hass.formatEntityState?this.hass.formatEntityState(e):`${this.rawHeight} cm`}get connected(){return this.desk&&!["unavailable","unknown"].includes(this.desk.state)}get moving(){var e;return["opening","closing"].includes(null===(e=this.desk)||void 0===e?void 0:e.state)}get alpha(){var e,t;const i=null!==(e=this.config.min_height)&&void 0!==e?e:Ne.min_height,s=null!==(t=this.config.max_height)&&void 0!==t?t:Ne.max_height;return(Math.min(Math.max(this.rawHeight,i),s)-i)/(s-i)}shouldUpdate(e){var t,i;if(!this.config)return!1;if(e.has("config"))return!0;const s=e.get("hass");return!s||(s.states[this.config.desk]!==this.hass.states[this.config.desk]||(null===(t=s.states[this.config.height_sensor])||void 0===t?void 0:t.state)!==(null===(i=this.hass.states[this.config.height_sensor])||void 0===i?void 0:i.state))}render(){const e=this.config.gradient_top_color||"var(--primary-color)",t=this.config.gradient_bottom_color||"var(--dark-primary-color)",i=this.config.text_color||"var(--text-primary-color, #ffffff)",s=!!this.config.hide_preset_height;return z`
      <ha-card .header=${this.config.name}>
        <div class="connection">
          ${Ce(this.connected?"status.connected":"status.disconnected")}
          <div class="indicator ${this.connected?"connected":"disconnected"}"></div>
        </div>

        <div
          class="preview"
          style="
            --desk-gradient-top: ${e};
            --desk-gradient-bottom: ${t};
            --desk-text-color: ${i};
          "
        >
          <img src="${"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFkCAMAAAA6+VGcAAAA8FBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3cuSuAAAAT3RSTlNeJRyioV/XQuL86sep77civrj3cUcUDHsaZQT1MxdG/YiSW/uazGvxwuGA640AfB4PxGMCjO0T/o8uROOFJOgmA3K7WpX28geeCHoZ0A4B+fRSGwAAA9dJREFUeNrt3e9yTlcYxuFQ1TZaLS1ehCotik3a4FV/05KiNPv8z4YZScR367Hu5fodwZrrw9qzZ+6ZtTKppBUEoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAV6HOhrg3bzz/PrXUHP43blmqujfRt3136dL4Iu6fovoEu6dAF0ST+DLukM6Brnc6BrnBega5xBFzmDLnJemy+DLnBe/Df/BbrA+f6VqxPoAuc7D26BLnF+NIH+7JzHg+7UeTjoXp1Hg+7WeTDofp3Hgu7YeSjonp1Hgu7aeSDovp3Hge7ceRjo3p1Hge7eeRDo/p3HgA5wHgI6wXkE6AjnAaAznPOhQ5zjoVOc06FjnMOhc5yzoYOco6GTnJOho5yDobOcc6HDnGOh05xToeOcQ6HznDOhA50joROdE6EjnQOhM53zoEOd46BTndOgY53DoHOds6CDnaOgk52ToKOdg6CznXOgw51joNOdU6DjnUOg850zoAdwjoAewTkBegjnAOgxnPuHHsS5e+h3zhfjnXuH3nFexjt3Dr3rPD+ZQFc4z5ugC5yXj0GXOP/9D+gS5wl0jTPoImfQRc6gi5xBN3feeewKdGPnGwvQJc5roGucQRc5gy5yBl3kDLrIGXRT56d7zqBbOt/fmnedQbd0vvPvvAa6wPnBC9Alzo/ugW7Yy1d7OxnQ7dpYX7zfI4Fu1eb/r/Y5g27R9pnnJ08sFvudR4Ve9NLejhF0jTPopv30fi8KumE/Hv99by8Kut21cWz+4cQEum3fnz66/O7UxjQ69O1P2r1vj2zNqw/X9x9pUOj5k/bN1388+2rjwyP5YSkKNGjQoEGDBg0aNGjQoEGDBg0aNOiPAH11uQ26AHrz7OoEuj309uH5S9Dtod86H5pAN4d+6/zFBLo59CjOvUMP49w59MFhnHuEvjD/ttPrrSG+g71CHzi7O0ZYrq5MoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoMfrDUP2z5knIU7AAAAAAElFTkSuQmCC"}" style="transform: translateY(${this.calculateOffset(90)}px);" />
          <img src="${"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFkCAMAAAA6+VGcAAAA1VBMVEXz8/Pk7fbj7fXw9fro7/f2+fzk7/b3+fzr8/jh7PXl7/by///j7PX////y+P/l7/bk7vbk7fX8/f7x9vr////////l7/Xw9vrj7vby+Pjl7vXt8/ro8vcAAADj7fX////l7vb////i7vXy8vj////k7vbk7fbl7/bI2+u40uXb5/LA1+jz9/pypc2Cr9OQuNf9/f630eXP3+2ox+D////4+vz+/v7i7PWMtda50uZjm8iSudiyzeT8/f6ArdKtyuLy9vqpyOD9/v6jxN5knMi40eX5+/3YocesAAAAKHRSTlMVybf6Yvuq+/i76BOzBCfkxIP++wMBgPqvJtTyYgDGCeACzSYHyNrqQBIiHQAAArNJREFUeNrt3dkyA0EUgOHY9y2EBEHsS+wtGARB3v+RpIzEC+jU1OT7r/r6q1On+u4UqupLBQSgQQs0aNACDVqgQYMWaNACDRq0QIMWaNCgBRq0QIMGLdCgBRo0aIEGLdCgQQs0aIEGDVqgQQs0aNACDVqgQYMWaNACDRq0QIMWaNCgBRq0QIMGLdCgBRo0aIEGLdCgQQs0aIEGDVqgQQs0aNACDVqgQYMWaNACDRq0QIMWaNCgBRq0QIMGLdCgBRo0aIEGLdCgQQs0aIEGDVqgQQs0aNACDVqgQYMWaNACDRq0Bg26Ul4tge5DmyEsgY5faeGuMQs6fovh9gp0/HneCo8J6OjVdsN1Ajp6K+vhOQEdp/2/59xheO04Jy3Q/9/eUe/TvL0T3hPQcZpZC9PltKnJ1sePs9URoYP211tIe7m/TJ1NdIQmbi56nf86m+gIhTPQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDTvtsjIPuB/RTGAXdB+hmfaMGOj50s75cqYKODt1xnq+Cjg6dD+fsQ+fEOfPQeXHOOnRunDMO/ZAb5wxCF09Puh23R/LinEHo4WLoNjaUn5O4jvuCBi3QoEEjAA1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg16QPoGtWo6xokDp0oAAAAASUVORK5CYII="}" style="transform: translateY(${this.calculateOffset(60)}px);" />
          <img src="${"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFkCAMAAAA6+VGcAAAChVBMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+///////////////////////////////////////////////2+fz////8/f7////9/v7////////////////////////////////////////////////////////////////////////////////////H2+z////////7/P7////////t8/j////K3ez////////////9/v7////////9/v7////////////+/v/////////////2+fz////////////9/v7////////////////////8/f7+/v7///////////////8AAAD////////////////////////r8vj+/v7////////////////////////////////6/P3////////////////////////////////u9fr////////////////////////////////////////////////////////+/v/////////////////////////a5/L///////////////////////////////////////////9vo8yFsNN1ps6wzOOHs9T////o8PejxN6HstSiw92xzeOEsNNmncnE2eqDr9OCr9OyzuR4qM9xpM1Cap+yAAAAxHRSTlMWS+AcVeoV8xIQ3xjCVsBXbFhtvm4KWW9wWnFbcnO7dF26drlfuK6tYWK2qqm1Y7RkswZmt7+9qPgxdfBlZ2jExbBqa7wXsv5g/lT9k5KVkZaPl5jvjiHoh5wJ0KEIjIVc/olp/Ksr/MH+n6ZP+H938Jkz+vqNXq/7NPua937IAfBF4/oFx9ILABt8N/6dgvz4A/kyfR+A/Tak64qxkOyLSKxrQqOUNfybeDCi2xQaew3J1ALJzgee/aekoIF6hHmGiKUETe+niAAA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"}" />

          <div class="height" style="transform: translateY(${this.calculateOffset(90)}px);">${this.displayHeight}</div>

          <div class="knob">
            <div
              class="knob-button"
              @touchstart=${this.goUp}
              @mousedown=${this.goUp}
              @touchend=${this.stop}
              @mouseup=${this.stop}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </div>
            <div
              class="knob-button"
              @touchstart=${this.goDown}
              @mousedown=${this.goDown}
              @touchend=${this.stop}
              @mouseup=${this.stop}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </div>
          </div>

          ${this.renderPresets(s)}
        </div>
      </ha-card>
    `}calculateOffset(e){return Math.round(e*(1-this.alpha))}renderPresets(e){return z`
      <div class="presets">
        ${(this.config.presets||[]).map((t=>z`
            <paper-button @click=${()=>this.handlePreset(t.target)}>
              ${e?t.label:`${t.label} - ${t.target} cm`}
            </paper-button>
          `))}
      </div>
    `}handlePreset(e){var t,i;const s=null!==(t=this.config.min_height)&&void 0!==t?t:Ne.min_height,n=null!==(i=this.config.max_height)&&void 0!==i?i:Ne.max_height;if(e>n||e<s)return;const o=n-s,r=Math.round((e-s)/o*100);this.callService("set_cover_position",{position:r})}goUp(){this.callService("open_cover")}goDown(){this.callService("close_cover")}stop(){this.callService("stop_cover")}callService(e,t={}){this.hass.callService("cover",e,{entity_id:this.config.desk,...t})}static get styles(){return te`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
      }

      ha-card {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        position: relative;
        padding: 0;
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }

      .preview {
        display: flex;
        flex: 1;
        position: relative;
        width: 100%;
        min-height: 365px;
        overflow: hidden;
        background: linear-gradient(to bottom, var(--desk-gradient-top), var(--desk-gradient-bottom));
      }

      .preview img {
        position: absolute;
        bottom: 0;
        transition: transform 0.2s linear;
      }

      .preview .knob {
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 20px;
        bottom: 12px;
        width: 50px;
        height: 120px;
        overflow: hidden;
        border-radius: 35px;
        background: #fff;
        box-shadow: 0 0 36px rgba(0, 0, 0, 0.3);
      }

      .preview .knob .knob-button {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      }

      .preview .knob .knob-button ha-icon {
        color: #030303;
        cursor: pointer;
      }

      .preview .knob .knob-button:active {
        background: rgba(0, 0, 0, 0.06);
      }

      .height {
        position: absolute;
        top: 60px;
        left: 30px;
        color: var(--desk-text-color);
        font-size: 32px;
        font-weight: bold;
        transition: transform 0.2s linear;
      }

      .presets {
        position: absolute;
        top: 10%;
        right: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 36%;
        min-width: 120px;
        height: 80%;
      }

      .presets > paper-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        margin-bottom: 5px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.15);
        color: var(--desk-text-color);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        transition: background-color 0.2s;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      .presets > paper-button:hover {
        background-color: rgba(255, 255, 255, 0.25);
      }

      .connection {
        position: absolute;
        top: 10px;
        right: 12px;
        z-index: 10;
        display: flex;
        align-items: center;
        color: var(--desk-text-color);
      }

      .connection .indicator {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        border-radius: 50%;
      }

      .indicator.connected {
        background-color: #4caf50;
      }

      .indicator.disconnected {
        background-color: #f44336;
      }
    `}};e([X({attribute:!1})],ke.prototype,"hass",void 0),e([J()],ke.prototype,"config",void 0),ke=e([K("linak-desk-card")],ke);export{ke as LinakDeskCard};
