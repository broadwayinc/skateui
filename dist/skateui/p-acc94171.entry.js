import{r as t,h as e,H as i,g as s}from"./p-4a37566f.js";function o(t){const e=["abort","animationend","animationiteration","animationstart","auxclick","beforecopy","beforecut","beforeinput","beforematch","beforepaste","beforexrselect","blur","cancel","canplay","canplaythrough","change","click","close","contextlost","contextmenu","contextrestored","copy","cuechange","cut","dblclick","drag","dragend","dragenter","dragleave","dragover","dragstart","drop","durationchange","emptied","ended","error","focus","formdata","fullscreenchange","fullscreenerror","gotpointercapture","input","invalid","keydown","keypress","keyup","load","loadeddata","loadedmetadata","loadstart","lostpointercapture","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","mousewheel","paste","pause","play","playing","pointercancel","pointerdown","pointerenter","pointerleave","pointermove","pointerout","pointerover","pointerrawupdate","pointerup","progress","ratechange","reset","resize","scroll","search","securitypolicyviolation","seeked","seeking","select","selectionchange","selectstart","slotchange","stalled","submit","suspend","timeupdate","toggle","transitioncancel","transitionend","transitionrun","transitionstart","volumechange","waiting","webkitanimationend","webkitanimationiteration","webkitanimationstart","webkitfullscreenchange","webkitfullscreenerror","webkittransitionend","wheel"];for(let i of e)t.addEventListener(i,(e=>{if(!e.bubbles){e.stopPropagation();let i=new Event(e.type,{bubbles:!0});t.dispatchEvent(i)}}))}function n(t=5){let e="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=i.length;for(let o=0;o<t;o++)e+=i.charAt(Math.floor(Math.random()*s));return e}function r(t){const{excludeStyle:e=[],computedStyle:i=null,excludeAttribute:s=[],trackNodes:o=!1,log:n=!1,copyStyle:r=null,appendIdToSlotElement:a=!1}=t,l=i||getComputedStyle(this.host);e.push("display","position","width","height","min-width","min-height","max-width","max-height","font");const h=(i,o)=>{const n=[];if("style"===i){let t=o.split(";");for(let i of t){if(!i)continue;let t=i.split(":"),s=t[1].split("!");!e.includes(t[0])&&(()=>{for(let i of e)if(i.includes(t[0]+"-"))return!1;return!0})()&&CSS.supports(t[0],s[0])&&(this.el.style.setProperty(t[0],s[0],s[1]||null),Array.isArray(r)&&r.includes(t[0])&&n.push(t[0]))}}else"hidden"===i||"class"===i||"id"===i||s.includes(i)||(this.el.setAttribute(i,o),"function"==typeof t.attCallback&&t.attCallback(i,o));if(r)if("function"==typeof r)r(l);else for(let t of r)n.includes(t)||!e.includes(t)&&(()=>{for(let i of e)if(i.includes(t+"-"))return!1;return!0})()&&CSS.supports(t,l[t])&&this.el.style.setProperty(t,l[t])},c=function(t){if(t){const e=t.length;return Object.keys(t).reduce(((i,s)=>{try{if(parseInt(s)<=e){const e=t[s];return Object.assign(Object.assign({},i),{[e.name]:e.value})}}catch(t){}}),{})}return{}}(this.host.attributes);for(let t in c)"on"!==t.substring(0,2)&&h(t,c[t]),"id"===t&&a&&(this.el.setAttribute(t,c[t]),this.host.removeAttribute(t)),"autofocus"===t&&this.host.focus();return this.observer=new MutationObserver((t=>{let e=t=>{if(n)return"boolean"==typeof n?console.log(t):"function"==typeof n?n(t):void 0};for(let i of t){let t=i.attributeName;if(!t&&o){"function"==typeof o&&(e({attributeName:t,mutationRecord:i}),o(i));continue}let s=i.target.getAttribute(t),n=i.oldValue;s!==n&&(e({attributeName:t,newValue:s,oldValue:n}),null!==s?h(t,s):this.el.removeAttribute(t))}})),this.observer.observe(this.host,{attributes:!0,attributeOldValue:!0,childList:!!o}),l}const a=class{constructor(e){t(this,e),this.isFormButton=(()=>this.host.closest("form"))(),this.el=(()=>{this.host.hasAttribute("disabled")||this.host.setAttribute("tabindex","0");const t=Object.assign(document.createElement("button"),{hidden:!0});return this.isFormButton||this.host.append(t),t})()}clickEventHandler(){this.host.attributes.getNamedItem("disabled")||this.isFormButton&&(this.host.parentElement.insertBefore(this.el,this.host),this.el.click(),this.el.remove())}keyEventHandler(t){"Enter"===t.key&&this.clickEventHandler()}componentDidLoad(){r.bind(this)({computedStyle:window.getComputedStyle(this.host)})}disconnectedCallback(){this.observer&&this.observer.disconnect()}render(){return e(i,null,e("slot",null))}get host(){return s(this)}};a.style=':host{-webkit-tap-highlight-color:rgba(0, 0, 0, 0);background:#293FE6;display:inline-block;color:#ffffff;border-radius:5px;vertical-align:baseline;font-size:inherit;padding:0.6em 1.2em;font-weight:bold;font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;box-sizing:border-box;cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;text-align:center;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);line-height:1.2}:host slot{display:flex;align-items:center;height:100%;justify-content:center}:host(:not([disabled]):hover){box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.65), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0px 1px rgba(0, 0, 0, 0.25), inset 0 0 1em 1em rgba(191, 191, 191, 0.16)}:host(:hover[disabled]){cursor:default}:host([disabled]){box-shadow:inset -1px -1px 2px rgba(255, 255, 255, 0.65), inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0px 1px rgba(0, 0, 0, 0.25);filter:grayscale(1) contrast(0.25) invert(1) brightness(1.3)}:host([hidden]){display:none !important}:host(:not([disabled]):active){box-shadow:inset 0 0 0px 1px rgba(128, 128, 128, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.75), inset -1px -1px 1px rgba(255, 255, 255, 0.25)}';const l=class{constructor(e){t(this,e),this.minSize=0,this.maxSize=72,this.fontSize=null,this.adjustSize=function(){const t=Number(this.computedStyle.lineHeight.replace("px",""))/this.fontSize;if(this.value){const e=()=>{if(parseFloat(this.computedStyle.height)/(this.fontSize*t)>1&&this.fontSize>this.minSize){let t=this.fontSize-1;if(this.fontSize=t>this.minSize?t:this.minSize,this.host.style.setProperty("--auto-size",`${this.fontSize}px`),this.fontSize===this.minSize)return;e()}},i=()=>{if(parseFloat(this.computedStyle.height)/(this.fontSize*t)<=1&&this.fontSize<this.maxSize){let t=this.fontSize+1;if(this.fontSize=t<this.maxSize?t:this.maxSize,this.host.style.setProperty("--auto-size",`${this.fontSize}px`),this.fontSize===this.maxSize)return;i()}};i(),e()}else this.fontSize=this.maxSize}.bind(this)}componentWillLoad(){this.maxSize=this.maxSize&&"number"!=typeof this.maxSize?Number(this.maxSize):this.maxSize,this.minSize=this.minSize&&"number"!=typeof this.minSize?Number(this.minSize):this.minSize,isNaN(this.maxSize)&&(this.maxSize=72),isNaN(this.minSize)&&(this.minSize=0)}componentDidLoad(){this.value=this.host.textContent,this.computedStyle=window.getComputedStyle(this.host),this.fontSize=Number(this.computedStyle.fontSize.replace("px","")),0===this.minSize&&(this.minSize=this.fontSize),this.minSize>this.maxSize&&(this.maxSize=this.minSize),this.adjustSize(),window.addEventListener("resize",this.adjustSize)}disconnectedCallback(){window.removeEventListener("resize",this.adjustSize)}render(){return e(i,null,e("slot",null))}get host(){return s(this)}};l.style=":host{display:block;cursor:default;font-size:var(--auto-size);line-height:1}";const h=class{constructor(e){t(this,e),this.availableTypes=["checkbox","radio","text","password","email","number","search","tel","url","reset","submit"],this.slotName=n(),this.isChecker=!1,this.isButton=!1,this.el=(()=>{var t,e;let i=this.host.getAttribute("type"),s=this.value;i&&this.availableTypes.includes(i)||(this.host.setAttribute("type","text"),i="text"),this.isButton="reset"===i||"submit"===i,this.isChecker="checkbox"===i||"radio"===i;const o=null===(t=this.host.getElementsByTagName("input"))||void 0===t?void 0:t[0];if(o&&o.hasAttribute("slot")){o.setAttribute("slot",this.slotName);const t=null===(e=this.host.getElementsByTagName("span"))||void 0===e?void 0:e[0];return t&&(t&&t.hasAttribute("slot")&&"value"===t.getAttribute("slot")&&this.isButton?t.innerHTML=s||("submit"===i?"Submit":"Reset"):t.remove()),o}const n=document.createElement("input");if(s&&n.setAttribute("value",s),n.setAttribute("slot",this.slotName),!this.availableTypes.includes(i))return this.host.prepend(n),n;const r=()=>{this.host.attributes.getNamedItem("disabled")||this.el.click()};if(this.isButton){n.setAttribute("hidden",""),this.host.hasAttribute("disabled")||this.host.setAttribute("tabindex","0"),this.host.addEventListener("keyup",(t=>{"Enter"===t.key&&r()})),this.host.addEventListener("click",r);let t=document.createElement("span");t.innerHTML=s||("submit"===i?"Submit":"Reset"),t.setAttribute("slot","value"),this.host.prepend(t)}else if(this.isChecker){n.setAttribute("hidden",""),this.host.hasAttribute("disabled")||this.host.setAttribute("tabindex","0");const t=()=>{this.host.attributes.getNamedItem("disabled")||this.el.click()};this.host.addEventListener("keyup",(e=>{"Enter"===e.key&&t()}),!0),this.host.addEventListener("click",t),n.addEventListener("change",(()=>{if("checkbox"===i&&(n.checked?this.host.setAttribute("checked",""):this.host.removeAttribute("checked")),"radio"===i){let t=document.getElementsByName(n.name);for(let e=0;e<t.length;e++)t[e]instanceof HTMLInputElement&&"radio"===t[e].getAttribute("type")&&t[e]!==n&&t[e].parentElement.removeAttribute("checked");this.host.setAttribute("checked","")}}))}else for(const[t,e]of Object.entries({"box-sizing":"border-box",display:"block","font-size":"inherit","line-height":"1.2"}))n.style.setProperty(t,e,"important");return this.host.prepend(n),n})()}valueHandler(t,e){t!==e&&(this.el.value=t)}componentDidLoad(){r.bind(this)({computedStyle:window.getComputedStyle(this.host),excludeStyle:["border","margin","padding","max","min"],copyStyle:this.isChecker||this.isButton?null:t=>{this.el.style.setProperty("border-radius",t["border-radius"],"important");let e=!1,i=[t["padding-top"],t["padding-right"],t["padding-bottom"],t["padding-left"]].map((t=>{let i=Number(t.replace("px",""));return i&&!e&&(e=!0),i}));e?((i[1]||i[3])&&this.el.style.setProperty("width",`calc(100% + ${i[1]}px + ${i[3]}px)`,"important"),this.el.style.setProperty("padding",t.padding,"important"),this.el.style.setProperty("margin",i.map((t=>t?`-${t}px`:"0px")).join(" "),"important")):this.el.style.setProperty("margin","0","important")},excludeAttribute:["value"],appendIdToSlotElement:!0}),o.bind(this)(this.el)}disconnectedCallback(){this.observer.disconnect(),this.el.remove()}render(){return e(i,null,e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"-2 -4 28 28"},e("path",{d:"M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"})),e("slot",{name:this.slotName}),e("slot",{name:"value"}))}get host(){return s(this)}static get watchers(){return{value:["valueHandler"]}}};h.style=':host{user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:bottom}:host slot{display:block}:host svg{display:none}::slotted([slot]){color:inherit;background-color:transparent;border:none}:host([type=text]),:host([type=password]),:host([type=email]),:host([type=number]),:host([type=search]),:host([type=tel]),:host([type=url]){display:inline-block;width:12em;font-size:inherit;padding:0.6em 0.66em;border-radius:4px;box-sizing:border-box;box-shadow:-1px -1px 2px -1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(255, 255, 255, 0.33), inset 0 0 0 1px rgba(0, 0, 0, 0.25);background-color:inherit;color:inherit}:host([disabled]){box-shadow:none;background-color:rgba(128, 128, 128, 0.5);filter:grayscale(1)}:host([type=checkbox]){min-height:unset;width:1em;height:1em;font-size:1em;padding:0;box-shadow:none;background-color:transparent;color:#293FE6;border:2px solid currentColor;border-radius:2px;box-sizing:border-box;text-align:center;overflow:hidden;display:inline-block}:host([type=checkbox][checked]) svg{user-select:none;pointer-events:none;width:100%;display:block;color:inherit}:host([type=radio]){min-height:unset;width:1em;height:1em;font-size:1em;padding:0;box-shadow:none;background-color:transparent;color:#293FE6;box-sizing:border-box;border:2px solid currentColor;border-radius:100%;display:inline-block}:host([type=radio])::after{content:"";user-select:none;pointer-events:none;display:block;position:relative;width:calc(100% - 4px);height:calc(100% - 4px);margin:2px;border-radius:inherit;box-shadow:none;background-color:transparent}:host([type=radio][checked])::after{box-shadow:inset 0.5px 0.5px 0px rgba(255, 255, 255, 0.5), inset -0.5px -0.5px 0px rgba(0, 0, 0, 0.25), inset 0 0 0px 0.5px rgba(0, 0, 0, 0.25);background-color:currentColor}:host(:not([disabled]):active[type=radio])::after{box-shadow:inset 0 0 0px 0.5px rgba(128, 128, 128, 0.25), inset 0.15px 0.5px 0px rgba(0, 0, 0, 0.8), inset -0.5px -0.5px 0px rgba(255, 255, 255, 0.25);background-color:currentColor}:host([type=reset]),:host([type=submit]){-webkit-tap-highlight-color:rgba(0, 0, 0, 0);background:#293FE6;display:inline-table;color:#ffffff;border-radius:5px;vertical-align:baseline;font-size:inherit;padding:0.6em 1.2em;font-weight:bold;font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;box-sizing:border-box;cursor:pointer;user-select:none;text-align:center;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);line-height:1.2}:host([type=reset]) slot,:host([type=submit]) slot{display:flex;align-items:center;height:100%;justify-content:center;vertical-align:middle}:host([type=reset]:not([disabled]):hover),:host([type=submit]:not([disabled]):hover){box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.65), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 0 1em 1em rgba(191, 191, 191, 0.16)}:host([type=reset]:hover[disabled]),:host([type=submit]:hover[disabled]){cursor:default}:host([type=reset][disabled]),:host([type=submit][disabled]){box-shadow:inset -1px -1px 2px rgba(255, 255, 255, 0.65), inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);filter:grayscale(1) contrast(0.25) invert(1) brightness(1.3)}:host([type=reset][hidden]),:host([type=submit][hidden]){display:none !important}:host([type=reset]:not([disabled]):active),:host([type=submit]:not([disabled]):active){box-shadow:inset 0 0 0 1px rgba(128, 128, 128, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.8), inset -1px -1px 1px rgba(255, 255, 255, 0.25)}';const c=class{constructor(e){t(this,e),this.scrollOffset=0,this.topOffset=0,this.offsetProp="pageYOffset",this.calcNavbarPosition=function(){window.requestAnimationFrame((()=>{const t=parseInt(this.navCss.height),e=this.parent[this.offsetProp]<0?0:this.parent[this.offsetProp],i=(this.scrollOffset-e)/this.autoHide,s=(()=>{let e=this.topOffset+i;return e<-t?-t:e>0?0:e})();this.scrollOffset=e,this.topOffset=s,this.host.style.setProperty("--nav-top",`${s}px`)}))}.bind(this)}componentWillLoad(){if(void 0!==this.autoHide&&(this.autoHide||(this.autoHide=3),this.autoHide)){if("string"==typeof this.autoHide)try{this.autoHide=JSON.parse(this.autoHide)}catch(t){this.autoHide=0}"boolean"==typeof this.autoHide?this.autoHide=this.autoHide?3:0:"number"==typeof this.autoHide?this.autoHide<0&&(this.autoHide=0):this.autoHide=0}}disconnectedCallback(){"pageYOffset"===this.offsetProp?document.removeEventListener("scroll",this.calcNavbarPosition):this.parent.removeEventListener("scroll",this.calcNavbarPosition)}componentDidLoad(){if(this.navCss=window.getComputedStyle(this.host),this.host.style.setProperty("--nav-position","sticky"),this.autoHide){let t=e=>e?e.scrollHeight>e.clientHeight&&"hidden"!==window.getComputedStyle(e).overflowY?e:t(e.parentElement):e,e=t(this.host.parentElement);e&&"html"!==e.tagName.toLowerCase()?(this.offsetProp="scrollTop",this.parent=e,this.parent.addEventListener("scroll",this.calcNavbarPosition,{passive:!0})):(this.parent=window,document.addEventListener("scroll",this.calcNavbarPosition,{passive:!0}))}}render(){return e(i,null,e("slot",null))}get host(){return s(this)}};c.style=":host{display:block;width:100%;padding:8px;transform:translateY(var(--nav-top));position:var(--nav-position);top:0;z-index:1}";const d=class{constructor(e){t(this,e),this.position="center",this.transitionTime="0.25s",this.overlayId=null}componentWillLoad(){["center","right","left","right","bottom"].includes(this.position)||(this.position="center")}createScreen(){const t={base:{"z-index":"9999",display:"flex",position:"fixed","flex-direction":"column",top:"0",right:"0",bottom:"0",left:"0","background-color":"transparent",overflow:"hidden",transition:`background-color ${this.transitionTime} ease-out`},center:{"justify-content":"center"},top:{"justify-content":"flex-start"},bottom:{"justify-content":"flex-end"},right:{"justify-content":"center","align-items":"flex-end"},left:{"justify-content":"center","align-items":"flex-start"}},e=document.createElement("div");for(let i in t.base)e.style.setProperty(i,t.base[i]);t[this.position]||(this.position="center");for(let i in t[this.position])e.style.setProperty(i,t[this.position][i]);return e.onclick=()=>{this.host.click()},"function"==typeof this.host.onclick?(document.body.style.top=`-${window.scrollY}px`,document.body.style.position="fixed"):e.style.setProperty("pointer-events","none"),this.overlayId=n(),e.id=this.overlayId,e}async close(){if(!this.overlayId)return;if("fixed"===document.body.style.position&&"function"==typeof this.host.onclick){let t=document.body.style.top;document.body.style.position="",document.body.style.top="",window.scrollTo(0,-1*parseInt(t||"0"))}const t=document.getElementById(this.overlayId),e=t.firstChild;let i={bottom:{bottom:"calc(var(--overlay-height) * -1)"},top:{bottom:"var(--overlay-height)"},right:{left:"var(--overlay-width)"},left:{left:"calc(var(--overlay-width) * -1)"},center:{opacity:"0"}};for(let t in i[this.position])e.style.setProperty(t,i[this.position][t]);t.style.setProperty("background-color","transparent");let s=0;this.transitionTime.includes("ms")?s=Number(this.transitionTime.split(",")[0].replace("ms","")):this.transitionTime.includes("s")&&(s=1e3*parseFloat(this.transitionTime.split(",")[0].replace("s","")));let o=()=>{if(e.children.length){let t=e.children.length;for(;t--;)this.host.prepend(e.children[t])}};s?setTimeout((()=>{o(),t.remove()}),s):(o(),t.remove()),this.overlayId=null}open(){return new Promise((t=>{if(this.overlayId)return;const e=this.createScreen(),i=document.createElement("div");if(this.host.children.length){let t=this.host.children.length;for(;t--;)i.prepend(this.host.children[t])}i.addEventListener("click",(t=>{t.stopPropagation()}));const s={base:{"overflow-y":"auto","overflow-x":"hidden",opacity:"0",display:"block",position:"relative","max-height":"100vh","pointer-events":"auto"},bottom:{"border-bottom-left-radius":"0","border-bottom-right-radius":"0",bottom:"calc(var(--overlay-height) * -1)",margin:"0 auto",transition:`bottom ${this.transitionTime} ease-out`},top:{"border-top-left-radius":"0","border-top-right-radius":"0",bottom:"var(--overlay-height)",margin:"0 auto",transition:`bottom ${this.transitionTime} ease-out`},right:{"border-top-right-radius":"0","border-bottom-right-radius":"0",left:"var(--overlay-width)",margin:"0",transition:`left ${this.transitionTime} ease-out`},left:{"border-top-left-radius":"0","border-bottom-left-radius":"0",left:"calc(var(--overlay-width) * -1)",margin:"0",transition:`left ${this.transitionTime} ease-out`},center:{margin:"auto",transition:`opacity ${this.transitionTime}`}};for(let t in s.base)i.style.setProperty(t,s.base[t]);for(let t in s[this.position])i.style.setProperty(t,s[this.position][t]);e.append(i),document.body.append(e),i.style.setProperty("--overlay-width",window.getComputedStyle(i).width),i.style.setProperty("--overlay-height",window.getComputedStyle(i).height),i.style.setProperty("opacity","1"),window.requestAnimationFrame((()=>{let s={center:"center",bottom:"up",top:"down",right:"left",left:"right"}[this.position];e.style.setProperty("background-color",this.host.style.getPropertyValue("background-color")),e.style.setProperty("color",this.host.style.getPropertyValue("color")),"up"===s||"down"===s?i.style.setProperty("bottom","0"):"left"!==s&&"right"!==s||i.style.setProperty("left","0"),t(null)}))}))}disconnectedCallback(){this.close()}render(){return e(i,{hidden:!0,style:{display:this.overlayId?null:"none"}},e("slot",null))}get host(){return s(this)}};d.style=":host{display:none !important}";const p=class{constructor(e){t(this,e),this.leftPadding="0px",this.rightPadding="0px",this.topPadding="0px",this.isMultiple=(()=>this.host.hasAttribute("multiple"))(),this.el=(()=>{var t;const e=this.host.getElementsByTagName("select");if(e.length){if(1!==e.length)throw new Error("<sui-select> does not allow multiple <select> elements.");return e[0]}const i=document.createElement("select");if(this.host.children.length){let t=this.host.children.length;for(;t--;)i.prepend(this.host.children[t])}this.value=(null===(t=i.getElementsByTagName("option")[i.selectedIndex||0])||void 0===t?void 0:t.textContent)||i.value||"",i.addEventListener("change",(()=>{var t;this.value=(null===(t=i.getElementsByTagName("option")[i.selectedIndex||0])||void 0===t?void 0:t.textContent)||i.value||""}));for(const[t,e]of Object.entries({background:"transparent","box-sizing":"border-box",border:"none",display:"block","font-size":"inherit","line-height":"1.2","-webkit-appearance":"none","-moz-appearance":"none",appearance:"none",cursor:this.isMultiple?"default":"pointer"}))i.style.setProperty(t,e,"important");return this.isMultiple||i.style.setProperty("opacity","0"),this.host.append(i),i})()}componentWillLoad(){r.bind(this)({computedStyle:window.getComputedStyle(this.host),copyStyle:t=>{this.el.style.setProperty("border-radius",t["border-radius"],"important");let e=!1,i=[t["padding-top"],t["padding-right"],t["padding-bottom"],t["padding-left"]].map((t=>{let i=Number(t.replace("px",""));return i&&!e&&(e=!0),i}));e?(i[0]||i[2]?(this.topPadding=`${i[0]}px`,this.el.style.setProperty("height",`calc(100% + ${i[0]}px + ${i[2]}px)`,"important")):this.isMultiple||this.el.style.setProperty("height",t.height,"important"),(i[1]||i[3])&&(this.leftPadding=`${i[3]}px`,this.rightPadding=`${i[1]}px`,this.el.style.setProperty("width",`calc(100% + ${this.leftPadding} + ${this.rightPadding})`,"important")),this.el.style.setProperty("padding",t.padding,"important"),this.el.style.setProperty("margin",i.map((t=>t?`-${t}px`:"0px")).join(" "),"important")):this.el.style.setProperty("margin","0","important")},appendIdToSlotElement:!0,excludeAttribute:this.isMultiple?[]:["size"]})}render(){return e(i,null,e("div",null,e("span",{"data-selected":this.value,style:{display:this.isMultiple?"none":"flex",width:`calc(100% - ${this.isMultiple?0:.75}em)`}}),e("svg",{style:{display:this.isMultiple?"none":"block"},fill:"currentColor",viewBox:"0 -100 700 700",xmlns:"http://www.w3.org/2000/svg"},e("path",{d:"m81.957 144.91 252.97 305.17c4.7695 5.293 10.496 7.9336 17.16 7.9336 6.1875 0 11.676-2.6445 16.438-7.9453l250.12-305.17c6.1875-8.4844 7.3984-17.746 3.5742-27.82-3.8008-10.051-10.703-15.094-20.727-15.094l-202.93 0.003906h-300.16c-9.5352 0-16.438 5.0391-20.727 15.094-3.8008 10.078-2.3672 19.355 4.2852 27.828z"})),e("slot",null)))}get host(){return s(this)}};p.style=':host([multiple]){padding:0.66em;box-shadow:-1px -1px 2px -1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(255, 255, 255, 0.33), inset 0 0 0 1px rgba(0, 0, 0, 0.25);overflow:hidden}:host{user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:bottom;display:inline-block;width:12em;line-height:1.2;font-size:inherit;padding:0.6em 0.66em;border-radius:4px;box-sizing:border-box;font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);background-color:transparent;color:inherit}:host div{position:relative;display:flex;align-items:center}:host slot option{color:black;background-color:white}:host svg{user-select:none;pointer-events:none;width:0.75em;color:inherit;position:absolute;right:0;opacity:0.88;display:block;line-height:1em}:host span{user-select:none;pointer-events:none;width:100%;position:absolute;align-items:center}:host span::after{content:attr(data-selected);display:inline-block;vertical-align:baseline;width:100%;line-height:normal;flex:1 1 auto;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}:host([disabled]){box-shadow:none;background-color:rgba(128, 128, 128, 0.5);filter:grayscale(1)}';export{a as sui_button,l as sui_flextext,h as sui_input,c as sui_nav,d as sui_overlay,p as sui_select}