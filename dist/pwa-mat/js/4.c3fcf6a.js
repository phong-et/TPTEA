(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"1MBn":function(t,e,n){var r=n("DVgA"),i=n("JiEa"),o=n("UqcF");t.exports=function(t){var e=r(t),n=i.f;if(n){var s,a=n(t),c=o.f,l=0;while(a.length>l)c.call(t,s=a[l++])&&e.push(s)}return e}},N8g3:function(t,e,n){e.f=n("K0xU")},O3Xf:function(t,e,n){"use strict";var r,i;
/**
 * vivus - JavaScript library to make drawing animation on SVG
 * @version v0.4.4
 * @link https://github.com/maxwellito/vivus
 * @license MIT
 */
/**
 * vivus - JavaScript library to make drawing animation on SVG
 * @version v0.4.4
 * @link https://github.com/maxwellito/vivus
 * @license MIT
 */
(function(){function n(t){if("undefined"===typeof t)throw new Error('Pathformer [constructor]: "element" parameter is required');if(t.constructor===String&&(t=document.getElementById(t),!t))throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');if(!(t instanceof window.SVGElement||t instanceof window.SVGGElement||/^svg$/i.test(t.nodeName)))throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');this.el=t,this.scan(t)}var o,s,a,c;function l(t,e,n){o(),this.isReady=!1,this.setElement(t,e),this.setOptions(e),this.setCallback(n),this.isReady&&this.init()}n.prototype.TYPES=["line","ellipse","circle","polygon","polyline","rect"],n.prototype.ATTR_WATCH=["cx","cy","points","r","rx","ry","x","x1","x2","y","y1","y2"],n.prototype.scan=function(t){for(var e,n,r,i,o=t.querySelectorAll(this.TYPES.join(",")),s=0;s<o.length;s++)n=o[s],e=this[n.tagName.toLowerCase()+"ToPath"],r=e(this.parseAttr(n.attributes)),i=this.pathMaker(n,r),n.parentNode.replaceChild(i,n)},n.prototype.lineToPath=function(t){var e={},n=t.x1||0,r=t.y1||0,i=t.x2||0,o=t.y2||0;return e.d="M"+n+","+r+"L"+i+","+o,e},n.prototype.rectToPath=function(t){var e={},n=parseFloat(t.x)||0,r=parseFloat(t.y)||0,i=parseFloat(t.width)||0,o=parseFloat(t.height)||0;if(t.rx||t.ry){var s=parseInt(t.rx,10)||-1,a=parseInt(t.ry,10)||-1;s=Math.min(Math.max(s<0?a:s,0),i/2),a=Math.min(Math.max(a<0?s:a,0),o/2),e.d="M "+(n+s)+","+r+" L "+(n+i-s)+","+r+" A "+s+","+a+",0,0,1,"+(n+i)+","+(r+a)+" L "+(n+i)+","+(r+o-a)+" A "+s+","+a+",0,0,1,"+(n+i-s)+","+(r+o)+" L "+(n+s)+","+(r+o)+" A "+s+","+a+",0,0,1,"+n+","+(r+o-a)+" L "+n+","+(r+a)+" A "+s+","+a+",0,0,1,"+(n+s)+","+r}else e.d="M"+n+" "+r+" L"+(n+i)+" "+r+" L"+(n+i)+" "+(r+o)+" L"+n+" "+(r+o)+" Z";return e},n.prototype.polylineToPath=function(t){var e,n,r={},i=t.points.trim().split(" ");if(-1===t.points.indexOf(",")){var o=[];for(e=0;e<i.length;e+=2)o.push(i[e]+","+i[e+1]);i=o}for(n="M"+i[0],e=1;e<i.length;e++)-1!==i[e].indexOf(",")&&(n+="L"+i[e]);return r.d=n,r},n.prototype.polygonToPath=function(t){var e=n.prototype.polylineToPath(t);return e.d+="Z",e},n.prototype.ellipseToPath=function(t){var e={},n=parseFloat(t.rx)||0,r=parseFloat(t.ry)||0,i=parseFloat(t.cx)||0,o=parseFloat(t.cy)||0,s=i-n,a=o,c=parseFloat(i)+parseFloat(n),l=o;return e.d="M"+s+","+a+"A"+n+","+r+" 0,1,1 "+c+","+l+"A"+n+","+r+" 0,1,1 "+s+","+l,e},n.prototype.circleToPath=function(t){var e={},n=parseFloat(t.r)||0,r=parseFloat(t.cx)||0,i=parseFloat(t.cy)||0,o=r-n,s=i,a=parseFloat(r)+parseFloat(n),c=i;return e.d="M"+o+","+s+"A"+n+","+n+" 0,1,1 "+a+","+c+"A"+n+","+n+" 0,1,1 "+o+","+c,e},n.prototype.pathMaker=function(t,e){var n,r,i=document.createElementNS("http://www.w3.org/2000/svg","path");for(n=0;n<t.attributes.length;n++)r=t.attributes[n],-1===this.ATTR_WATCH.indexOf(r.name)&&i.setAttribute(r.name,r.value);for(n in e)i.setAttribute(n,e[n]);return i},n.prototype.parseAttr=function(t){for(var e,n={},r=0;r<t.length;r++){if(e=t[r],-1!==this.ATTR_WATCH.indexOf(e.name)&&-1!==e.value.indexOf("%"))throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");n[e.name]=e.value}return n},l.LINEAR=function(t){return t},l.EASE=function(t){return-Math.cos(t*Math.PI)/2+.5},l.EASE_OUT=function(t){return 1-Math.pow(1-t,3)},l.EASE_IN=function(t){return Math.pow(t,3)},l.EASE_OUT_BOUNCE=function(t){var e=1-Math.cos(t*(.5*Math.PI)),n=Math.pow(e,1.5),r=Math.pow(1-t,2),i=1-Math.abs(Math.cos(n*(2.5*Math.PI)));return 1-r+i*r},l.prototype.setElement=function(t,e){var n;if("undefined"===typeof t)throw new Error('Vivus [constructor]: "element" parameter is required');if(t.constructor===String&&(t=document.getElementById(t),!t))throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');if(this.parentEl=t,e&&e.file){var r=this;n=function(t){var n=document.createElement("div");n.innerHTML=this.responseText;var i=n.querySelector("svg");if(!i)throw new Error("Vivus [load]: Cannot find the SVG in the loaded file : "+e.file);r.el=i,r.el.setAttribute("width","100%"),r.el.setAttribute("height","100%"),r.parentEl.appendChild(r.el),r.isReady=!0,r.init(),r=null};var i=new window.XMLHttpRequest;return i.addEventListener("load",n),i.open("GET",e.file),void i.send()}switch(t.constructor){case window.SVGSVGElement:case window.SVGElement:case window.SVGGElement:this.el=t,this.isReady=!0;break;case window.HTMLObjectElement:r=this,n=function(e){if(!r.isReady){if(r.el=t.contentDocument&&t.contentDocument.querySelector("svg"),!r.el&&e)throw new Error("Vivus [constructor]: object loaded does not contain any SVG");r.el&&(t.getAttribute("built-by-vivus")&&(r.parentEl.insertBefore(r.el,t),r.parentEl.removeChild(t),r.el.setAttribute("width","100%"),r.el.setAttribute("height","100%")),r.isReady=!0,r.init(),r=null)}},n()||t.addEventListener("load",n);break;default:throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)')}},l.prototype.setOptions=function(t){var e=["delayed","sync","async","nsync","oneByOne","scenario","scenario-sync"],n=["inViewport","manual","autostart"];if(void 0!==t&&t.constructor!==Object)throw new Error('Vivus [constructor]: "options" parameter must be an object');if(t=t||{},t.type&&-1===e.indexOf(t.type))throw new Error("Vivus [constructor]: "+t.type+" is not an existing animation `type`");if(this.type=t.type||e[0],t.start&&-1===n.indexOf(t.start))throw new Error("Vivus [constructor]: "+t.start+" is not an existing `start` option");if(this.start=t.start||n[0],this.isIE=-1!==window.navigator.userAgent.indexOf("MSIE")||-1!==window.navigator.userAgent.indexOf("Trident/")||-1!==window.navigator.userAgent.indexOf("Edge/"),this.duration=c(t.duration,120),this.delay=c(t.delay,null),this.dashGap=c(t.dashGap,1),this.forceRender=t.hasOwnProperty("forceRender")?!!t.forceRender:this.isIE,this.reverseStack=!!t.reverseStack,this.selfDestroy=!!t.selfDestroy,this.onReady=t.onReady,this.map=[],this.frameLength=this.currentFrame=this.delayUnit=this.speed=this.handle=null,this.ignoreInvisible=!!t.hasOwnProperty("ignoreInvisible")&&!!t.ignoreInvisible,this.animTimingFunction=t.animTimingFunction||l.LINEAR,this.pathTimingFunction=t.pathTimingFunction||l.LINEAR,this.delay>=this.duration)throw new Error("Vivus [constructor]: delay must be shorter than duration")},l.prototype.setCallback=function(t){if(t&&t.constructor!==Function)throw new Error('Vivus [constructor]: "callback" parameter must be a function');this.callback=t||function(){}},l.prototype.mapping=function(){var t,e,n,r,i,o,s,a;for(a=o=s=0,e=this.el.querySelectorAll("path"),t=0;t<e.length;t++)n=e[t],this.isInvisible(n)||(i={el:n,length:Math.ceil(n.getTotalLength())},isNaN(i.length)?window.console&&console.warn&&console.warn("Vivus [mapping]: cannot retrieve a path element length",n):(this.map.push(i),n.style.strokeDasharray=i.length+" "+(i.length+2*this.dashGap),n.style.strokeDashoffset=i.length+this.dashGap,i.length+=this.dashGap,o+=i.length,this.renderPath(t)));for(o=0===o?1:o,this.delay=null===this.delay?this.duration/3:this.delay,this.delayUnit=this.delay/(e.length>1?e.length-1:1),this.reverseStack&&this.map.reverse(),t=0;t<this.map.length;t++){switch(i=this.map[t],this.type){case"delayed":i.startAt=this.delayUnit*t,i.duration=this.duration-this.delay;break;case"oneByOne":i.startAt=s/o*this.duration,i.duration=i.length/o*this.duration;break;case"sync":case"async":case"nsync":i.startAt=0,i.duration=this.duration;break;case"scenario-sync":n=i.el,r=this.parseAttr(n),i.startAt=a+(c(r["data-delay"],this.delayUnit)||0),i.duration=c(r["data-duration"],this.duration),a=void 0!==r["data-async"]?i.startAt:i.startAt+i.duration,this.frameLength=Math.max(this.frameLength,i.startAt+i.duration);break;case"scenario":n=i.el,r=this.parseAttr(n),i.startAt=c(r["data-start"],this.delayUnit)||0,i.duration=c(r["data-duration"],this.duration),this.frameLength=Math.max(this.frameLength,i.startAt+i.duration);break}s+=i.length,this.frameLength=this.frameLength||this.duration}},l.prototype.drawer=function(){var t=this;if(this.currentFrame+=this.speed,this.currentFrame<=0)this.stop(),this.reset();else{if(!(this.currentFrame>=this.frameLength))return this.trace(),void(this.handle=s(function(){t.drawer()}));this.stop(),this.currentFrame=this.frameLength,this.trace(),this.selfDestroy&&this.destroy()}this.callback(this),this.instanceCallback&&(this.instanceCallback(this),this.instanceCallback=null)},l.prototype.trace=function(){var t,e,n,r;for(r=this.animTimingFunction(this.currentFrame/this.frameLength)*this.frameLength,t=0;t<this.map.length;t++)n=this.map[t],e=(r-n.startAt)/n.duration,e=this.pathTimingFunction(Math.max(0,Math.min(1,e))),n.progress!==e&&(n.progress=e,n.el.style.strokeDashoffset=Math.floor(n.length*(1-e)),this.renderPath(t))},l.prototype.renderPath=function(t){if(this.forceRender&&this.map&&this.map[t]){var e=this.map[t],n=e.el.cloneNode(!0);e.el.parentNode.replaceChild(n,e.el),e.el=n}},l.prototype.init=function(){this.frameLength=0,this.currentFrame=0,this.map=[],new n(this.el),this.mapping(),this.starter(),this.onReady&&this.onReady(this)},l.prototype.starter=function(){switch(this.start){case"manual":return;case"autostart":this.play();break;case"inViewport":var t=this,e=function(){t.isInViewport(t.parentEl,1)&&(t.play(),window.removeEventListener("scroll",e))};window.addEventListener("scroll",e),e();break}},l.prototype.getStatus=function(){return 0===this.currentFrame?"start":this.currentFrame===this.frameLength?"end":"progress"},l.prototype.reset=function(){return this.setFrameProgress(0)},l.prototype.finish=function(){return this.setFrameProgress(1)},l.prototype.setFrameProgress=function(t){return t=Math.min(1,Math.max(0,t)),this.currentFrame=Math.round(this.frameLength*t),this.trace(),this},l.prototype.play=function(t,e){if(this.instanceCallback=null,t&&"function"===typeof t)this.instanceCallback=t,t=null;else if(t&&"number"!==typeof t)throw new Error("Vivus [play]: invalid speed");return e&&"function"===typeof e&&!this.instanceCallback&&(this.instanceCallback=e),this.speed=t||1,this.handle||this.drawer(),this},l.prototype.stop=function(){return this.handle&&(a(this.handle),this.handle=null),this},l.prototype.destroy=function(){var t,e;for(this.stop(),t=0;t<this.map.length;t++)e=this.map[t],e.el.style.strokeDashoffset=null,e.el.style.strokeDasharray=null,this.renderPath(t)},l.prototype.isInvisible=function(t){var e,n=t.getAttribute("data-ignore");return null!==n?"false"!==n:!!this.ignoreInvisible&&(e=t.getBoundingClientRect(),!e.width&&!e.height)},l.prototype.parseAttr=function(t){var e,n={};if(t&&t.attributes)for(var r=0;r<t.attributes.length;r++)e=t.attributes[r],n[e.name]=e.value;return n},l.prototype.isInViewport=function(t,e){var n=this.scrollY(),r=n+this.getViewportH(),i=t.getBoundingClientRect(),o=i.height,s=n+i.top,a=s+o;return e=e||0,s+o*e<=r&&a>=n},l.prototype.getViewportH=function(){var t=this.docElem.clientHeight,e=window.innerHeight;return t<e?e:t},l.prototype.scrollY=function(){return window.pageYOffset||this.docElem.scrollTop},o=function(){l.prototype.docElem||(l.prototype.docElem=window.document.documentElement,s=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),a=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t)}}())},c=function(t,e){var n=parseInt(t,10);return n>=0?n:e},r=[],i=function(){return l}.apply(e,r),void 0===i||(t.exports=i)})()},OnI7:function(t,e,n){var r=n("dyZX"),i=n("g3g5"),o=n("LQAc"),s=n("N8g3"),a=n("hswa").f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:s.f(t)})}},W1XH:function(t,e,n){},Z6vF:function(t,e,n){var r=n("ylqs")("meta"),i=n("0/R4"),o=n("aagx"),s=n("hswa").f,a=0,c=Object.isExtensible||function(){return!0},l=!n("eeVq")(function(){return c(Object.preventExtensions({}))}),h=function(t){s(t,r,{value:{i:"O"+ ++a,w:{}}})},u=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!c(t))return"F";if(!e)return"E";h(t)}return t[r].i},d=function(t,e){if(!o(t,r)){if(!c(t))return!0;if(!e)return!1;h(t)}return t[r].w},f=function(t){return l&&p.NEED&&c(t)&&!o(t,r)&&h(t),t},p=t.exports={KEY:r,NEED:!1,fastKey:u,getWeak:d,onFreeze:f}},e7yV:function(t,e,n){var r=n("aCFj"),i=n("kJMx").f,o={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(t){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==o.call(t)?a(t):i(r(t))}},ioFf:function(t,e,n){"use strict";var r=n("dyZX"),i=n("aagx"),o=n("nh4g"),s=n("XKFU"),a=n("KroJ"),c=n("Z6vF").KEY,l=n("eeVq"),h=n("VTer"),u=n("fyDq"),d=n("ylqs"),f=n("K0xU"),p=n("N8g3"),m=n("OnI7"),g=n("1MBn"),w=n("EWmC"),y=n("y3w9"),v=n("0/R4"),F=n("aCFj"),b=n("apmT"),k=n("RjD/"),C=n("Kuth"),E=n("e7yV"),M=n("EemH"),x=n("hswa"),A=n("DVgA"),S=M.f,z=x.f,L=E.f,V=r.Symbol,O=r.JSON,T=O&&O.stringify,P="prototype",q=f("_hidden"),I=f("toPrimitive"),R={}.propertyIsEnumerable,N=h("symbol-registry"),j=h("symbols"),D=h("op-symbols"),G=Object[P],_="function"==typeof V,H=r.QObject,U=!H||!H[P]||!H[P].findChild,B=o&&l(function(){return 7!=C(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=S(G,e);r&&delete G[e],z(t,e,n),r&&t!==G&&z(G,e,r)}:z,J=function(t){var e=j[t]=C(V[P]);return e._k=t,e},K=_&&"symbol"==typeof V.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof V},W=function(t,e,n){return t===G&&W(D,e,n),y(t),e=b(e,!0),y(n),i(j,e)?(n.enumerable?(i(t,q)&&t[q][e]&&(t[q][e]=!1),n=C(n,{enumerable:k(0,!1)})):(i(t,q)||z(t,q,k(1,{})),t[q][e]=!0),B(t,e,n)):z(t,e,n)},X=function(t,e){y(t);var n,r=g(e=F(e)),i=0,o=r.length;while(o>i)W(t,n=r[i++],e[n]);return t},Y=function(t,e){return void 0===e?C(t):X(C(t),e)},Z=function(t){var e=R.call(this,t=b(t,!0));return!(this===G&&i(j,t)&&!i(D,t))&&(!(e||!i(this,t)||!i(j,t)||i(this,q)&&this[q][t])||e)},Q=function(t,e){if(t=F(t),e=b(e,!0),t!==G||!i(j,e)||i(D,e)){var n=S(t,e);return!n||!i(j,e)||i(t,q)&&t[q][e]||(n.enumerable=!0),n}},$=function(t){var e,n=L(F(t)),r=[],o=0;while(n.length>o)i(j,e=n[o++])||e==q||e==c||r.push(e);return r},tt=function(t){var e,n=t===G,r=L(n?D:F(t)),o=[],s=0;while(r.length>s)!i(j,e=r[s++])||n&&!i(G,e)||o.push(j[e]);return o};_||(V=function(){if(this instanceof V)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===G&&e.call(D,n),i(this,q)&&i(this[q],t)&&(this[q][t]=!1),B(this,t,k(1,n))};return o&&U&&B(G,t,{configurable:!0,set:e}),J(t)},a(V[P],"toString",function(){return this._k}),M.f=Q,x.f=W,n("kJMx").f=E.f=$,n("UqcF").f=Z,n("JiEa").f=tt,o&&!n("LQAc")&&a(G,"propertyIsEnumerable",Z,!0),p.f=function(t){return J(f(t))}),s(s.G+s.W+s.F*!_,{Symbol:V});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)f(et[nt++]);for(var rt=A(f.store),it=0;rt.length>it;)m(rt[it++]);s(s.S+s.F*!_,"Symbol",{for:function(t){return i(N,t+="")?N[t]:N[t]=V(t)},keyFor:function(t){if(!K(t))throw TypeError(t+" is not a symbol!");for(var e in N)if(N[e]===t)return e},useSetter:function(){U=!0},useSimple:function(){U=!1}}),s(s.S+s.F*!_,"Object",{create:Y,defineProperty:W,defineProperties:X,getOwnPropertyDescriptor:Q,getOwnPropertyNames:$,getOwnPropertySymbols:tt}),O&&s(s.S+s.F*(!_||l(function(){var t=V();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){var e,n,r=[t],i=1;while(arguments.length>i)r.push(arguments[i++]);if(n=e=r[1],(v(e)||void 0!==t)&&!K(t))return w(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!K(e))return e}),r[1]=e,T.apply(O,r)}}),V[P][I]||n("Mukb")(V[P],I,V[P].valueOf),u(V,"Symbol"),u(Math,"Math",!0),u(r.JSON,"JSON",!0)},rE2o:function(t,e,n){n("OnI7")("asyncIterator")},"xvc/":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",{staticClass:"et-login center",attrs:{square:""}},[n("q-card-media",[n("svg",{staticClass:"center",attrs:{id:"logo",viewBox:"0 0 483 483",width:"128px",height:"128px"},domProps:{innerHTML:t._s(t.getLoginLogo)}})]),n("q-card-title",{staticClass:"text-brown-6"},[t._v("\n    TP@Tea HongKong\n    "),n("div",{staticClass:"row items-center",attrs:{slot:"right"},slot:"right"},[n("q-icon",{staticClass:"q-mr-sm",attrs:{name:"card_membership"},on:{click:function(e){t.alert()}}}),t._v("Memberships\n    ")],1)]),n("q-card-main",{staticClass:"q-mb-md"},[n("q-input",{staticClass:"q-mb-lg",attrs:{clearable:"","float-label":"Username",color:"light-green-9"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),n("q-input",{attrs:{"float-label":"Password",color:"red-9",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("q-card-actions",[n("div",{staticClass:"row justify-center",staticStyle:{height:"160px",width:"100%"}},[n("q-btn",{staticClass:"text-brown-6 q-ma-sm col-10",attrs:{loading:t.getIsLoading,color:"amber-3",label:"Sign In"},on:{click:function(e){t.loginCustomer({username:t.username,password:t.password})}}},[n("q-spinner-pie",{attrs:{slot:"loading",size:"25px"},slot:"loading"})],1),n("q-btn",{staticClass:"text-grey-8 q-ma-sm col-10",attrs:{color:"grey-2",label:"Visit Facebook"}}),n("q-btn",{staticClass:"text-grey-8 q-ma-sm col-10",attrs:{color:"grey-2",label:"Visit Instagram"}})],1)])],1)},i=[];r._withStripped=!0;n("rE2o"),n("ioFf"),n("rGqo");var o=n("MVZn"),s=n.n(o),a={Digitalizer:'<g>\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M259.476,280.364V247.5c0-12.958-10.542-23.5-23.5-23.5s-23.5,10.542-23.5,23.5v29.672   c0,35.757-13.173,70.087-37.094,96.665l-32.981,36.646c-2.771,3.079-2.521,7.821,0.558,10.593c3.078,2.771,7.82,2.521,10.592-0.558   l32.981-36.646c26.403-29.338,40.944-67.231,40.944-106.7V247.5c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5v32.864   c0,44.003-16.301,86.167-45.901,118.727l-32.149,35.364c-2.786,3.064-2.56,7.809,0.505,10.595c1.437,1.307,3.242,1.95,5.042,1.95   c2.04,0,4.072-0.827,5.552-2.455l32.148-35.364C241.789,373.854,259.476,328.106,259.476,280.364z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M291.476,247.5c0-30.603-24.897-55.5-55.5-55.5s-55.5,24.897-55.5,55.5v29.672c0,27.839-10.256,54.566-28.879,75.258   l-23.447,26.053c-2.771,3.079-2.521,7.821,0.558,10.593c3.079,2.771,7.82,2.519,10.592-0.558l23.447-26.053   c21.106-23.451,32.73-53.742,32.73-85.293V247.5c0-22.332,18.168-40.5,40.5-40.5c22.332,0,40.5,18.168,40.5,40.5v32.864   c0,51.979-19.256,101.789-54.223,140.252l-27.125,29.839c-2.787,3.064-2.561,7.809,0.504,10.595c1.437,1.307,3.242,1.95,5.042,1.95   c2.04,0,4.072-0.827,5.552-2.455l27.126-29.839c37.481-41.23,58.123-94.622,58.123-150.342V247.5z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M323.476,247.5c0-48.248-39.252-87.5-87.5-87.5s-87.5,39.252-87.5,87.5v29.672c0,19.92-7.339,39.045-20.665,53.851   l-21.112,23.458c-2.771,3.079-2.521,7.821,0.558,10.593c3.078,2.771,7.821,2.519,10.592-0.558l21.112-23.458   c15.809-17.565,24.515-40.254,24.515-63.886V247.5c0-39.977,32.523-72.5,72.5-72.5s72.5,32.523,72.5,72.5v32.864   c0,59.958-22.212,117.412-62.545,161.777l-7.507,8.258c-2.786,3.065-2.56,7.809,0.505,10.595c1.437,1.306,3.243,1.95,5.042,1.95   c2.04,0,4.072-0.827,5.552-2.455l7.506-8.258c42.848-47.133,66.446-108.169,66.446-171.867V247.5z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M116.476,247.5c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5c0-25.255,9.169-49.651,25.819-68.695   c16.495-18.867,39.134-31.205,63.746-34.741c4.1-0.589,6.946-4.391,6.357-8.49c-0.589-4.1-4.394-6.942-8.49-6.357   c-28.16,4.046-54.052,18.15-72.906,39.716C126.962,190.71,116.476,218.613,116.476,247.5z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M131.476,277.172c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5c0,12.002-4.421,23.523-12.449,32.443l-18.779,20.867   c-2.771,3.078-2.521,7.82,0.558,10.592c1.434,1.29,3.227,1.925,5.015,1.925c2.052,0,4.097-0.838,5.577-2.483l18.779-20.866   C125.687,307.971,131.476,292.886,131.476,277.172z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M340.755,344.123c-4.009-1.044-8.105,1.351-9.155,5.357c-2.769,10.579-6.213,21.096-10.24,31.258   c-1.526,3.851,0.359,8.21,4.21,9.735c0.907,0.359,1.841,0.529,2.761,0.529c2.985,0,5.808-1.795,6.975-4.739   c4.249-10.725,7.884-21.822,10.806-32.986C347.16,349.271,344.761,345.172,340.755,344.123z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M315.791,158.632c-3.081-2.771-7.823-2.517-10.592,0.563s-2.517,7.822,0.563,10.591   c22.061,19.832,34.713,48.157,34.713,77.714v32.864c0,12.473-0.86,25.042-2.557,37.359c-0.565,4.104,2.303,7.888,6.406,8.453   c0.347,0.048,0.692,0.071,1.033,0.071c3.688,0,6.903-2.722,7.42-6.478c1.79-12.993,2.698-26.251,2.698-39.406V247.5   C355.476,213.695,341.011,181.304,315.791,158.632z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M280.729,153.076c1.041,0.496,2.138,0.73,3.219,0.73c2.803,0,5.492-1.579,6.777-4.278c1.781-3.739,0.192-8.215-3.547-9.995   c-10.806-5.145-22.291-8.616-34.136-10.317c-4.106-0.585-7.901,2.258-8.49,6.357s2.257,7.901,6.357,8.49   C261.257,145.55,271.289,148.582,280.729,153.076z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M235.976,96c-2.806,0-5.644,0.078-8.437,0.232c-4.136,0.228-7.304,3.766-7.076,7.901c0.229,4.136,3.763,7.321,7.902,7.075   c2.519-0.139,5.079-0.209,7.61-0.209c75.266,0,136.5,61.233,136.5,136.5v32.864c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5V247.5   C387.476,163.963,319.513,96,235.976,96z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M153.972,136.693c1.477,0,2.97-0.436,4.275-1.343c12.478-8.677,26.182-15.155,40.733-19.258   c3.987-1.124,6.308-5.268,5.184-9.254s-5.269-6.304-9.254-5.184c-16.16,4.556-31.376,11.749-45.226,21.379   c-3.401,2.365-4.241,7.039-1.876,10.439C149.265,135.57,151.599,136.693,153.972,136.693z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M99.476,277.172V247.5c0-34.89,13.213-68.118,37.205-93.565c2.841-3.014,2.702-7.76-0.312-10.602   s-7.761-2.701-10.602,0.312C99.14,171.886,84.476,208.77,84.476,247.5v29.672c0,4.083-1.504,8.002-4.234,11.035l-9.248,10.275   c-2.771,3.079-2.521,7.821,0.558,10.592c1.433,1.291,3.227,1.926,5.015,1.926c2.052,0,4.096-0.837,5.577-2.482l9.248-10.275   C96.605,292.449,99.476,284.966,99.476,277.172z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M409.951,189.104c-8.226-24.446-21.299-46.531-38.856-65.642c-2.803-3.05-7.547-3.252-10.597-0.449   c-3.05,2.803-3.251,7.547-0.449,10.598c16.127,17.554,28.134,37.834,35.686,60.276c1.054,3.133,3.976,5.11,7.107,5.11   c0.793,0,1.6-0.127,2.393-0.394C409.16,197.282,411.272,193.029,409.951,189.104z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M295.247,73.822c-3.917-1.341-8.183,0.748-9.524,4.668c-1.341,3.919,0.749,8.183,4.668,9.523   c16.538,5.659,32.065,13.857,46.15,24.369c1.347,1.005,2.92,1.489,4.48,1.489c2.286,0,4.544-1.041,6.017-3.015   c2.478-3.319,1.794-8.019-1.525-10.496C330.176,88.916,313.264,79.986,295.247,73.822z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M119.442,125.908C150.991,95.659,192.377,79,235.976,79c8.096,0,16.237,0.583,24.196,1.731   c4.103,0.598,7.903-2.252,8.495-6.352c0.592-4.1-2.251-7.902-6.351-8.494C253.648,64.635,244.786,64,235.976,64   c-47.487,0-92.56,18.141-126.915,51.081c-34.248,32.838-54.277,76.905-56.397,124.084c-0.186,4.138,3.018,7.644,7.155,7.829   c0.115,0.006,0.229,0.008,0.343,0.008c3.987,0,7.306-3.14,7.487-7.163C69.594,196.527,87.988,156.066,119.442,125.908z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M235.976,32c-16.772,0-33.485,1.944-49.674,5.778c-4.031,0.954-6.524,4.996-5.57,9.026c0.955,4.03,4.997,6.524,9.027,5.569   C204.817,48.809,220.366,47,235.976,47c54.996,0,106.332,21.911,144.55,61.695c1.473,1.533,3.439,2.305,5.41,2.305   c1.869,0,3.741-0.694,5.195-2.091c2.987-2.87,3.083-7.618,0.213-10.604c-19.913-20.729-43.304-37.036-69.522-48.465   C294.666,38.002,265.783,32,235.976,32z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M67.507,125.404c1.372,1.074,3.001,1.595,4.619,1.595c2.227,0,4.431-0.987,5.91-2.876   c21.375-27.302,49.515-48.717,81.377-61.932c3.826-1.587,5.642-5.975,4.055-9.801s-5.977-5.644-9.801-4.055   c-34.241,14.201-64.478,37.21-87.441,66.539C63.672,118.137,64.246,122.851,67.507,125.404z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M131.983,38.725c1.094,0,2.205-0.24,3.255-0.748C166.816,22.73,200.709,15,235.976,15c18.378,0,36.682,2.162,54.401,6.426   c4.025,0.966,8.077-1.51,9.046-5.537c0.969-4.027-1.51-8.078-5.538-9.047C275.019,2.302,255.535,0,235.976,0   c-37.544,0-73.631,8.232-107.259,24.469c-3.73,1.801-5.294,6.285-3.493,10.015C126.517,37.163,129.195,38.725,131.983,38.725z" />\n    <path fill="none" stroke="#C09552" stroke-width="6" d="M321.724,31.383c7.732,3.079,15.385,6.619,22.746,10.52c1.119,0.594,2.321,0.875,3.505,0.875   c2.688,0,5.287-1.449,6.633-3.99c1.939-3.66,0.545-8.199-3.115-10.139c-7.837-4.153-15.986-7.922-24.22-11.201   c-3.849-1.533-8.21,0.345-9.743,4.192C315.998,25.488,317.876,29.851,321.724,31.383z" />\n    </svg>',Keytronic:'<g>\n\t<g>\n\t\t<path fill="none" stroke-width="6" d="M478.665,72c0-39.704-32.296-72-72-72c-19.704,0-38.496,8.184-52,22.288C341.161,8.184,322.369,0,302.665,0    c-39.704,0-72,32.296-72,72c0,24.752,12.456,47.36,33.376,60.688L275.353,144L134.665,284.688l-26.344-26.344    c-3.128-3.128-8.184-3.128-11.312,0l-32,32c-3.128,3.128-3.128,8.184,0,11.312L91.353,328l-12.688,12.688l-26.344-26.344    c-3.128-3.128-8.184-3.128-11.312,0l-33,33c-3.128,3.128-3.128,8.184,0,11.312L34.353,385L4.345,415.008    c-3.128,3.128-3.128,8.184,0,11.312l52,52c1.56,1.56,3.608,2.344,5.656,2.344s4.096-0.784,5.656-2.344l51.008-51.008    l26.344,26.344c3.128,3.128,8.184,3.128,11.312,0l40-40c3.128-3.128,3.128-8.184,0-11.312L169.977,376l168.688-168.688    l7.312,7.312C359.305,235.544,381.913,248,406.665,248c39.704,0,72-32.296,72-72c0-19.704-8.184-38.496-22.288-52    C470.481,110.496,478.665,91.704,478.665,72z M462.665,176c0,30.872-25.128,56-56,56c-19.488,0-37.272-9.944-47.584-26.6    c-0.328-0.52-0.712-1.008-1.152-1.448l-13.608-13.608c-3.128-3.128-8.184-3.128-11.312,0l-180,180    c-3.128,3.128-3.128,8.184,0,11.312L179.353,408l-28.688,28.688l-26.344-26.344c-3.128-3.128-8.184-3.128-11.312,0l-51.008,51.008    l-40.688-40.688l30.008-30.008c3.128-3.128,3.128-8.184,0-11.312L24.977,353l21.688-21.688l26.344,26.344    c3.128,3.128,8.184,3.128,11.312,0l24-24c3.128-3.128,3.128-8.184,0-11.312L81.977,296l20.688-20.688l26.344,26.344    c3.128,3.128,8.184,3.128,11.312,0l152-152c3.128-3.128,3.128-8.184,0-11.312l-17.608-17.608c-0.44-0.44-0.92-0.824-1.448-1.152    c-16.656-10.312-26.6-28.096-26.6-47.584c0-30.872,25.128-56,56-56c17.96,0,34.968,8.768,45.504,23.456c3,4.184,10,4.184,13,0    C371.697,24.768,388.705,16,406.665,16c30.872,0,56,25.128,56,56c0,17.96-8.768,34.968-23.456,45.504    c-2.096,1.504-3.336,3.92-3.336,6.496s1.24,5,3.336,6.496C453.897,141.032,462.665,158.04,462.665,176z" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<rect fill="none" stroke-width="6" x="173.811" y="228.009" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -91.1265 252.0189)" width="169.678" height="16" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<rect fill="none" stroke-width="6" x="163.35" y="311.983" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -175.1045 217.2252)" width="22.624" height="16" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path fill="none" stroke-width="6" d="M406.665,40c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S424.313,40,406.665,40z M406.665,88    c-8.824,0-16-7.176-16-16s7.176-16,16-16c8.824,0,16,7.176,16,16S415.489,88,406.665,88z" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<rect fill="none" stroke-width="6" x="310.663" y="92.674" transform="matrix(0.7071 -0.7071 0.7071 0.7071 19.8046 255.7854)" width="16" height="22.624" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<rect fill="none" stroke-width="6" x="342.661" y="124.674" transform="matrix(0.7071 -0.7071 0.7071 0.7071 6.5493 287.7842)" width="16" height="22.624" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<rect fill="none" stroke-width="6" x="374.659" y="156.674" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.706 319.7831)" width="16" height="22.624" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path fill="none" stroke-width="6" d="M470.665,344h-14.032c-0.44-1.112-0.896-2.216-1.392-3.328l9.928-9.928c3.128-3.128,3.128-8.184,0-11.312l-33.936-33.936    c-3.128-3.128-8.184-3.128-11.312,0l-9.928,9.928c-1.112-0.496-2.216-0.952-3.328-1.392V280c0-4.424-3.576-8-8-8h-48    c-4.424,0-8,3.576-8,8v14.032c-1.112,0.44-2.216,0.896-3.328,1.392l-9.928-9.928c-3.128-3.128-8.184-3.128-11.312,0    l-33.936,33.936c-3.128,3.128-3.128,8.184,0,11.312l9.928,9.928c-0.496,1.112-0.952,2.216-1.392,3.328h-14.032    c-4.424,0-8,3.576-8,8v48c0,4.424,3.576,8,8,8h14.032c0.44,1.112,0.896,2.216,1.392,3.328l-9.928,9.928    c-3.128,3.128-3.128,8.184,0,11.312l33.936,33.936c3.128,3.128,8.184,3.128,11.312,0l9.928-9.928    c1.112,0.496,2.216,0.952,3.328,1.392V472c0,4.424,3.576,8,8,8h48c4.424,0,8-3.576,8-8v-14.032    c1.112-0.44,2.216-0.896,3.328-1.392l9.928,9.928c3.128,3.128,8.184,3.128,11.312,0l33.936-33.936    c3.128-3.128,3.128-8.184,0-11.312l-9.928-9.928c0.496-1.112,0.952-2.216,1.392-3.328h14.032c4.424,0,8-3.576,8-8v-48    C478.665,347.576,475.089,344,470.665,344z M462.665,392h-11.672c-3.496,0-6.576,2.264-7.632,5.592    c-1.216,3.864-2.856,7.8-4.88,11.672c-1.616,3.104-1.032,6.888,1.44,9.36l8.288,8.288l-22.624,22.624l-8.288-8.288    c-2.472-2.472-6.256-3.056-9.36-1.44c-3.872,2.024-7.808,3.664-11.672,4.88c-3.336,1.064-5.6,4.144-5.6,7.64V464h-32v-11.672    c0-3.496-2.264-6.576-5.592-7.632c-3.864-1.216-7.8-2.856-11.672-4.88c-3.104-1.616-6.88-1.032-9.36,1.44l-8.288,8.288    l-22.624-22.624l8.288-8.288c2.472-2.472,3.056-6.256,1.44-9.36c-2.024-3.872-3.664-7.808-4.88-11.672    c-1.064-3.336-4.144-5.6-7.64-5.6h-11.672v-32h11.672c3.496,0,6.576-2.264,7.632-5.592c1.216-3.864,2.856-7.8,4.88-11.672    c1.616-3.104,1.032-6.888-1.44-9.36l-8.288-8.288l22.624-22.624l8.288,8.288c2.48,2.48,6.256,3.048,9.36,1.44    c3.872-2.024,7.808-3.664,11.672-4.88c3.336-1.064,5.6-4.144,5.6-7.64V288h32v11.672c0,3.496,2.264,6.576,5.592,7.632    c3.864,1.216,7.8,2.856,11.672,4.88c3.104,1.608,6.888,1.04,9.36-1.44l8.288-8.288l22.624,22.624l-8.288,8.288    c-2.472,2.472-3.056,6.256-1.44,9.36c2.024,3.872,3.664,7.808,4.88,11.672c1.064,3.336,4.144,5.6,7.64,5.6h11.672V392z" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path fill="none" stroke-width="6" d="M374.665,328c-26.472,0-48,21.528-48,48s21.528,48,48,48s48-21.528,48-48S401.137,328,374.665,328z M374.665,408    c-17.648,0-32-14.352-32-32s14.352-32,32-32s32,14.352,32,32S392.313,408,374.665,408z" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path fill="none" stroke-width="6" d="M54.665,168h-16c0,13.232-10.768,24-24,24v16c13.232,0,24,10.768,24,24h16c0-13.232,10.768-24,24-24v-16    C65.433,192,54.665,181.232,54.665,168z M46.665,208.248c-2.336-3.144-5.104-5.912-8.248-8.248    c3.144-2.336,5.912-5.104,8.248-8.248c2.336,3.144,5.104,5.912,8.248,8.248C51.769,202.336,49.001,205.104,46.665,208.248z" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path fill="none" stroke-width="6" d="M150.665,120h-16c0,13.232-10.768,24-24,24v16c13.232,0,24,10.768,24,24h16c0-13.232,10.768-24,24-24v-16    C161.433,144,150.665,133.232,150.665,120z M142.665,160.248c-2.336-3.144-5.104-5.912-8.248-8.248    c3.144-2.336,5.912-5.104,8.248-8.248c2.336,3.144,5.104,5.912,8.248,8.248C147.769,154.336,145.001,157.104,142.665,160.248z" stroke="#FFFFFF"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path fill="none" stroke-width="6" d="M70.665,48h-16c0,13.232-10.768,24-24,24v16c13.232,0,24,10.768,24,24h16c0-13.232,10.768-24,24-24V72    C81.433,72,70.665,61.232,70.665,48z M62.665,88.248c-2.336-3.144-5.104-5.912-8.248-8.248c3.144-2.336,5.912-5.104,8.248-8.248    c2.336,3.144,5.104,5.912,8.248,8.248C67.769,82.336,65.001,85.104,62.665,88.248z" stroke="#FFFFFF"/>\n\t</g>\n</g>\n  ',Molectron:'\n    <path stroke="#FFFFFF" fill="none" stroke-width="6" d="m398.559,166.02c-8.85-3.404-18.292-6.493-28.22-9.265 2.563-9.984 4.609-19.706 6.087-29.073 7.689-48.757-0.808-82.959-23.925-96.306-6.72-3.88-14.443-5.848-22.954-5.848-26.882,0-60.85,19.965-95.118,53.681-7.486-7.352-15.006-14.105-22.502-20.167-38.379-31.038-72.25-40.781-95.365-27.434-14.856,8.577-23.891,26.093-26.126,50.652-0.376,4.125 2.664,7.773 6.789,8.148 4.138,0.382 7.772-2.664 8.148-6.789 1.238-13.594 5.484-31.398 18.688-39.021 17.11-9.881 45.699-0.365 78.434,26.106 7.143,5.776 14.314,12.217 21.461,19.233-14.373,15.293-28.676,32.894-42.41,52.347-24.16,2.199-47.172,5.888-68.291,10.948-3.698-14.376-6.238-28.093-7.491-40.827-0.405-4.122-4.059-7.134-8.198-6.729-4.122,0.405-7.135,4.076-6.729,8.198 1.326,13.474 4.008,27.966 7.917,43.133-9.596,2.706-18.73,5.712-27.311,9.012-46.072,17.72-71.443,42.18-71.443,68.873s25.371,51.153 71.441,68.872c8.85,3.404 18.292,6.493 28.22,9.265-2.563,9.984-4.609,19.706-6.087,29.073-7.689,48.757 0.808,82.959 23.925,96.306 6.72,3.88 14.443,5.848 22.954,5.848 26.573,0 60.071-19.516 93.938-52.531 7.255,7.086 14.54,13.609 21.803,19.482 27.161,21.966 52.059,33.266 72.489,33.265 8.438-0.001 16.119-1.93 22.876-5.831 23.117-13.347 31.614-47.549 23.925-96.306-1.477-9.366-3.523-19.087-6.086-29.07 15.439-4.252 29.64-9.26 42.218-14.96 3.773-1.71 5.445-6.154 3.735-9.927-1.71-3.773-6.155-5.446-9.927-3.735-11.912,5.398-25.377,10.15-40.042,14.192-6.063-20.261-14.137-41.412-23.976-62.808 10.281-22.122 18.685-44.004 24.943-64.936 55.665,15.586 88.651,40.202 88.651,63.801 0,15.247-13.296,27.827-24.45,35.694-3.385,2.388-4.193,7.067-1.806,10.452 2.388,3.386 7.067,4.193 10.452,1.806 20.153-14.215 30.804-30.797 30.804-47.952 0-26.693-25.371-51.153-71.441-68.872zm-69.013-125.491c5.844,7.10543e-15 11.044,1.291 15.454,3.838 17.112,9.88 23.166,39.396 16.607,80.979-1.405,8.907-3.35,18.159-5.789,27.669-21.207-5.028-44.299-8.68-68.532-10.835-13.596-19.242-27.866-36.839-42.375-52.253 2.655-2.618 5.312-5.158 7.964-7.602 29.252-26.953 56.48-41.796 76.671-41.796zm-95.096,60.152c11.317,12.062 22.5,25.517 33.323,40.102-10.769-0.587-21.712-0.891-32.773-0.891-11.431,0-22.738,0.321-33.855,0.947 10.808-14.56 22.006-28.07 33.305-40.158zm-.053,269.657c-11.718-12.42-23.296-26.341-34.486-41.466 11.514,0.674 23.234,1.02 35.089,1.02 11.419,0 22.732-0.333 33.871-0.969-11.18,15.064-22.777,29.01-34.474,41.415zm.603-55.446c-16.115,0-31.578-0.624-46.314-1.784-8.277-12.076-16.284-24.78-23.907-37.984-7.503-12.995-14.405-26.107-20.657-39.155 6.49-13.661 13.707-27.412 21.596-41.077 7.64-13.232 15.75-26.063 24.177-38.307 14.374-1.099 29.429-1.693 45.105-1.693 15.273,0 29.956,0.564 43.994,1.609 8.434,12.267 16.59,25.185 24.349,38.623 7.85,13.597 15.034,27.279 21.5,40.873-6.219,12.942-13.091,25.957-20.56,38.894-7.625,13.207-15.72,26.015-24.13,38.239-14.716,1.158-29.83,1.762-45.153,1.762zm-65.615-3.655c-18.453-2.132-35.582-5.129-51.205-8.81 4.744-15.789 10.758-32.16 17.929-48.79 4.898,9.688 10.128,19.373 15.679,28.987 5.668,9.818 11.549,19.371 17.597,28.613zm1.19-152.829c-6.111,9.318-12.078,18.991-17.847,28.984-5.933,10.276-11.499,20.61-16.677,30.928-7.543-17.318-13.858-34.376-18.788-50.749 16.203-3.859 34.042-6.983 53.312-9.163zm-155.575,76.484c0-23.472 32.634-47.951 87.757-63.55 6.235,20.802 14.601,42.62 24.805,64.647-9.813,21.362-17.865,42.477-23.913,62.705-55.663-15.587-88.649-40.203-88.649-63.802zm125.454,194.363c-5.844,0-11.044-1.291-15.454-3.838-17.112-9.88-23.166-39.396-16.607-80.979 1.405-8.907 3.35-18.159 5.789-27.669 20.518,4.865 42.8,8.441 66.173,10.619 13.951,19.807 28.618,37.883 43.53,53.648-2.254,2.201-4.509,4.348-6.76,6.423-29.252,26.954-56.48,41.796-76.671,41.796zm220.214-84.584c6.559,41.583 0.505,71.099-16.607,80.979-17.113,9.879-45.699,0.364-78.434-26.106-6.893-5.574-13.814-11.767-20.712-18.499 14.761-15.578 29.462-33.603 43.563-53.579 23.432-2.151 45.822-5.697 66.389-10.509 2.445,9.526 4.394,18.793 5.801,27.714zm-9.83-42.153c-16.064,3.733-33.311,6.67-51.339,8.745 6.085-9.283 12.027-18.918 17.773-28.871 5.517-9.556 10.713-19.161 15.579-28.757 7.195,16.66 13.228,33.063 17.987,48.883zm-17.918-84.145c-5.152-10.259-10.688-20.532-16.587-30.749-5.818-10.078-11.859-19.878-18.077-29.348 19.355,2.146 37.276,5.243 53.564,9.081-4.955,16.493-11.302,33.623-18.9,51.016z"/>\n    <path stroke="#FFFFFF" fill="none" stroke-width="6" d="m235,197.392c-20.678,0-37.5,16.822-37.5,37.5s16.822,37.5 37.5,37.5 37.5-16.822 37.5-37.5-16.822-37.5-37.5-37.5zm0,60c-12.406,0-22.5-10.094-22.5-22.5s10.094-22.5 22.5-22.5 22.5,10.094 22.5,22.5-10.094,22.5-22.5,22.5z"/>\n  '},c=n("O3Xf"),l=n.n(c),h=n("L2JU"),u={data:function(){return{logo:"Digitalizer",vivus:"",username:"",password:""}},mounted:function(){this.startAnimation()},computed:s()({getLoginLogo:function(){return a[this.logo]}},Object(h["c"])("customer",["getIsLoading"])),methods:s()({},Object(h["b"])("customer",["loginCustomer"]),{startAnimation:function(){this.vivus=new l.a("logo",{duration:400,forceRender:!1},function(t){var e=!0,n=!1,r=void 0;try{for(var i,o=t.el.children[0].children[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var s=i.value;s.setAttribute("style","fill:white")}}catch(t){n=!0,r=t}finally{try{e||null==o.return||o.return()}finally{if(n)throw r}}})}})},d=u,f=(n("z/Qx"),n("KHd+")),p=Object(f["a"])(d,r,i,!1,null,null,null);e["default"]=p.exports},"z/Qx":function(t,e,n){"use strict";var r=n("W1XH"),i=n.n(r);i.a}}]);