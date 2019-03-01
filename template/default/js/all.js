    /*! jQuery v1.8.2 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("п»їВ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":(a+"").replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return a!=null?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||p.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")||(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>=0)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&p.expr.match.needsContext.test(f),namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=k.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<q;d++)l=o[d],m=l.selector,h[m]===b&&(h[m]=l.needsContext?p(m,this).index(f)>=0:p.find(m,this,null,[f]).length),h[m]&&j.push(l);j.length&&u.push({elem:f,matches:j})}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){i=u[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){l=i.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,g=((p.event.special[l.origType]||{}).handle||l.handler).apply(i.elem,r),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length===1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bc(a,b,c,d){c=c||[],b=b||r;var e,f,i,j,k=b.nodeType;if(!a||typeof a!="string")return c;if(k!==1&&k!==9)return[];i=g(b);if(!i&&!d)if(e=P.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&h(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return w.apply(c,x.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&_&&b.getElementsByClassName)return w.apply(c,x.call(b.getElementsByClassName(j),0)),c}return bp(a.replace(L,"$1"),b,c,d,i)}function bd(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function be(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bf(a){return z(function(b){return b=+b,z(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function bg(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bh(a,b){var c,d,f,g,h,i,j,k=C[o][a];if(k)return b?0:k.slice(0);h=a,i=[],j=e.preFilter;while(h){if(!c||(d=M.exec(h)))d&&(h=h.slice(d[0].length)),i.push(f=[]);c=!1;if(d=N.exec(h))f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=d[0].replace(L," ");for(g in e.filter)(d=W[g].exec(h))&&(!j[g]||(d=j[g](d,r,!0)))&&(f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=g,c.matches=d);if(!c)break}return b?h.length:h?bc.error(a):C(a,i).slice(0)}function bi(a,b,d){var e=b.dir,f=d&&b.dir==="parentNode",g=u++;return b.first?function(b,c,d){while(b=b[e])if(f||b.nodeType===1)return a(b,c,d)}:function(b,d,h){if(!h){var i,j=t+" "+g+" ",k=j+c;while(b=b[e])if(f||b.nodeType===1){if((i=b[o])===k)return b.sizset;if(typeof i=="string"&&i.indexOf(j)===0){if(b.sizset)return b}else{b[o]=k;if(a(b,d,h))return b.sizset=!0,b;b.sizset=!1}}}else while(b=b[e])if(f||b.nodeType===1)if(a(b,d,h))return b}}function bj(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function bk(a,b,c,d,e){var f,g=[],h=0,i=a.length,j=b!=null;for(;h<i;h++)if(f=a[h])if(!c||c(f,d,e))g.push(f),j&&b.push(h);return g}function bl(a,b,c,d,e,f){return d&&!d[o]&&(d=bl(d)),e&&!e[o]&&(e=bl(e,f)),z(function(f,g,h,i){if(f&&e)return;var j,k,l,m=[],n=[],o=g.length,p=f||bo(b||"*",h.nodeType?[h]:h,[],f),q=a&&(f||!b)?bk(p,m,a,h,i):p,r=c?e||(f?a:o||d)?[]:g:q;c&&c(q,r,h,i);if(d){l=bk(r,n),d(l,[],h,i),j=l.length;while(j--)if(k=l[j])r[n[j]]=!(q[n[j]]=k)}if(f){j=a&&r.length;while(j--)if(k=r[j])f[m[j]]=!(g[m[j]]=k)}else r=bk(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):w.apply(g,r)})}function bm(a){var b,c,d,f=a.length,g=e.relative[a[0].type],h=g||e.relative[" "],i=g?1:0,j=bi(function(a){return a===b},h,!0),k=bi(function(a){return y.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==l)||((b=c).nodeType?j(a,c,d):k(a,c,d))}];for(;i<f;i++)if(c=e.relative[a[i].type])m=[bi(bj(m),c)];else{c=e.filter[a[i].type].apply(null,a[i].matches);if(c[o]){d=++i;for(;d<f;d++)if(e.relative[a[d].type])break;return bl(i>1&&bj(m),i>1&&a.slice(0,i-1).join("").replace(L,"$1"),c,i<d&&bm(a.slice(i,d)),d<f&&bm(a=a.slice(d)),d<f&&a.join(""))}m.push(c)}return bj(m)}function bn(a,b){var d=b.length>0,f=a.length>0,g=function(h,i,j,k,m){var n,o,p,q=[],s=0,u="0",x=h&&[],y=m!=null,z=l,A=h||f&&e.find.TAG("*",m&&i.parentNode||i),B=t+=z==null?1:Math.E;y&&(l=i!==r&&i,c=g.el);for(;(n=A[u])!=null;u++){if(f&&n){for(o=0;p=a[o];o++)if(p(n,i,j)){k.push(n);break}y&&(t=B,c=++g.el)}d&&((n=!p&&n)&&s--,h&&x.push(n))}s+=u;if(d&&u!==s){for(o=0;p=b[o];o++)p(x,q,i,j);if(h){if(s>0)while(u--)!x[u]&&!q[u]&&(q[u]=v.call(k));q=bk(q)}w.apply(k,q),y&&!h&&q.length>0&&s+b.length>1&&bc.uniqueSort(k)}return y&&(t=B,l=z),x};return g.el=0,d?z(g):g}function bo(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)bc(a,b[e],c,d);return c}function bp(a,b,c,d,f){var g,h,j,k,l,m=bh(a),n=m.length;if(!d&&m.length===1){h=m[0]=m[0].slice(0);if(h.length>2&&(j=h[0]).type==="ID"&&b.nodeType===9&&!f&&e.relative[h[1].type]){b=e.find.ID(j.matches[0].replace(V,""),b,f)[0];if(!b)return c;a=a.slice(h.shift().length)}for(g=W.POS.test(a)?-1:h.length-1;g>=0;g--){j=h[g];if(e.relative[k=j.type])break;if(l=e.find[k])if(d=l(j.matches[0].replace(V,""),R.test(h[0].type)&&b.parentNode||b,f)){h.splice(g,1),a=d.length&&h.join("");if(!a)return w.apply(c,x.call(d,0)),c;break}}}return i(a,m)(d,b,f,c,R.test(a)),c}function bq(){}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=String,r=a.document,s=r.documentElement,t=0,u=0,v=[].pop,w=[].push,x=[].slice,y=[].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(this[b]===a)return b;return-1},z=function(a,b){return a[o]=b==null||b,a},A=function(){var a={},b=[];return z(function(c,d){return b.push(c)>e.cacheLength&&delete a[b.shift()],a[c]=d},a)},B=A(),C=A(),D=A(),E="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",G=F.replace("w","w#"),H="([*^$|!~]?=)",I="\\["+E+"*("+F+")"+E+"*(?:"+H+E+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+G+")|)|)"+E+"*\\]",J=":("+F+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+I+")|[^:]|\\\\.)*|.*))\\)|)",K=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+E+"*((?:-\\d)?\\d*)"+E+"*\\)|)(?=[^-]|$)",L=new RegExp("^"+E+"+|((?:^|[^\\\\])(?:\\\\.)*)"+E+"+$","g"),M=new RegExp("^"+E+"*,"+E+"*"),N=new RegExp("^"+E+"*([\\x20\\t\\r\\n\\f>+~])"+E+"*"),O=new RegExp(J),P=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,Q=/^:not/,R=/[\x20\t\r\n\f]*[+~]/,S=/:not\($/,T=/h\d/i,U=/input|select|textarea|button/i,V=/\\(?!\\)/g,W={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),NAME:new RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:new RegExp("^("+F.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+J),POS:new RegExp(K,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+E+"*(even|odd|(([+-]|)(\\d*)n|)"+E+"*(?:([+-]|)"+E+"*(\\d+)|))"+E+"*\\)|)","i"),needsContext:new RegExp("^"+E+"*[>+~]|"+K,"i")},X=function(a){var b=r.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},Y=X(function(a){return a.appendChild(r.createComment("")),!a.getElementsByTagName("*").length}),Z=X(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),$=X(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),_=X(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),ba=X(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",s.insertBefore(a,s.firstChild);var b=r.getElementsByName&&r.getElementsByName(o).length===2+r.getElementsByName(o+0).length;return d=!r.getElementById(o),s.removeChild(a),b});try{x.call(s.childNodes,0)[0].nodeType}catch(bb){x=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}bc.matches=function(a,b){return bc(a,null,null,b)},bc.matchesSelector=function(a,b){return bc(b,null,null,[a]).length>0},f=bc.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=f(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=f(b);return c},g=bc.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},h=bc.contains=s.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:s.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc.attr=function(a,b){var c,d=g(a);return d||(b=b.toLowerCase()),(c=e.attrHandle[b])?c(a):d||$?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},e=bc.selectors={cacheLength:50,createPseudo:z,match:W,attrHandle:Z?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:d?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:Y?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:ba&&function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:_&&function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(V,""),a[3]=(a[4]||a[5]||"").replace(V,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||bc.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&bc.error(a[0]),a},PSEUDO:function(a){var b,c;if(W.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(b=a[4])O.test(b)&&(c=bh(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b;return a.slice(0,3)}},filter:{ID:d?function(a){return a=a.replace(V,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(V,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(V,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=B[o][a];return b||(b=B(a,new RegExp("(^|"+E+")"+a+"("+E+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return function(d,e){var f=bc.attr(d,a);return f==null?b==="!=":b?(f+="",b==="="?f===c:b==="!="?f!==c:b==="^="?c&&f.indexOf(c)===0:b==="*="?c&&f.indexOf(c)>-1:b==="$="?c&&f.substr(f.length-c.length)===c:b==="~="?(" "+f+" ").indexOf(c)>-1:b==="|="?f===c||f.substr(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d){return a==="nth"?function(a){var b,e,f=a.parentNode;if(c===1&&d===0)return!0;if(f){e=0;for(b=f.firstChild;b;b=b.nextSibling)if(b.nodeType===1){e++;if(a===b)break}}return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b){var c,d=e.pseudos[a]||e.setFilters[a.toLowerCase()]||bc.error("unsupported pseudo: "+a);return d[o]?d(b):d.length>1?(c=[a,a,"",b],e.setFilters.hasOwnProperty(a.toLowerCase())?z(function(a,c){var e,f=d(a,b),g=f.length;while(g--)e=y.call(a,f[g]),a[e]=!(c[e]=f[g])}):function(a){return d(a,0,c)}):d}},pseudos:{not:z(function(a){var b=[],c=[],d=i(a.replace(L,"$1"));return d[o]?z(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)if(f=g[h])a[h]=!(b[h]=f)}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:z(function(a){return function(b){return bc(a,b).length>0}}),contains:z(function(a){return function(b){return(b.textContent||b.innerText||f(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!e.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},header:function(a){return T.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:bd("radio"),checkbox:bd("checkbox"),file:bd("file"),password:bd("password"),image:bd("image"),submit:be("submit"),reset:be("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return U.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:bf(function(a,b,c){return[0]}),last:bf(function(a,b,c){return[b-1]}),eq:bf(function(a,b,c){return[c<0?c+b:c]}),even:bf(function(a,b,c){for(var d=0;d<b;d+=2)a.push(d);return a}),odd:bf(function(a,b,c){for(var d=1;d<b;d+=2)a.push(d);return a}),lt:bf(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:bf(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},j=s.compareDocumentPosition?function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bg(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bg(e[j],f[j]);return j===c?bg(a,f[j],-1):bg(e[j],b,1)},[0,0].sort(j),m=!k,bc.uniqueSort=function(a){var b,c=1;k=m,a.sort(j);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},bc.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},i=bc.compile=function(a,b){var c,d=[],e=[],f=D[o][a];if(!f){b||(b=bh(a)),c=b.length;while(c--)f=bm(b[c]),f[o]?d.push(f):e.push(f);f=D(a,bn(e,d))}return f},r.querySelectorAll&&function(){var a,b=bp,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[":focus"],f=[":active",":focus"],h=s.matchesSelector||s.mozMatchesSelector||s.webkitMatchesSelector||s.oMatchesSelector||s.msMatchesSelector;X(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+E+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),X(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+E+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=new RegExp(e.join("|")),bp=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a))){var i,j,k=!0,l=o,m=d,n=d.nodeType===9&&a;if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){i=bh(a),(k=d.getAttribute("id"))?l=k.replace(c,"\\$&"):d.setAttribute("id",l),l="[id='"+l+"'] ",j=i.length;while(j--)i[j]=l+i[j].join("");m=R.test(a)&&d.parentNode||d,n=i.join(",")}if(n)try{return w.apply(f,x.call(m.querySelectorAll(n),0)),f}catch(p){}finally{k||d.removeAttribute("id")}}return b(a,d,f,g,h)},h&&(X(function(b){a=h.call(b,"div");try{h.call(b,"[test!='']:sizzle"),f.push("!=",J)}catch(c){}}),f=new RegExp(f.join("|")),bc.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!g(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=h.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return bc(c,null,null,[b]).length>0})}(),e.pseudos.nth=e.pseudos.eq,e.filters=bq.prototype=e.pseudos,e.setFilters=new bq,bc.attr=p.attr,p.find=bc,p.expr=bc.selectors,p.expr[":"]=p.expr.pseudos,p.unique=bc.uniqueSort,p.text=bc.getText,p.isXMLDoc=bc.isXML,p.contains=bc.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{ck=f.href}catch(cy){ck=e.createElement("a"),ck.href="",ck=ck.href}cj=ct.exec(ck.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:ck,isLocal:cn.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=(c||y)+"",k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase())||!1,l.crossDomain=i&&i.join(":")+(i[3]?"":i[1]==="http:"?80:443)!==cj.join(":")+(cj[3]?"":cj[1]==="http:"?80:443)),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=cQ.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){c=+f[2],d=f[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&h){h=p.css(e.elem,a,!0)||c||1;do i=i||".5",h=h/i,p.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&i!==1&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(!l)return;return(d=l.body)===k?p.offset.bodyOffset(k):(c=l.documentElement,p.contains(c,k)?(typeof k.getBoundingClientRect!="undefined"&&(j=k.getBoundingClientRect()),e=da(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);

/*
* Placeholder plugin for jQuery
* ---
* Copyright 2010, Daniel Stocks (http://webcloud.se)
* Released under the MIT, BSD, and GPL Licenses.
*/

(function(b){function d(a){this.input=a;a.attr("type")=="password"&&this.handlePassword();b(a[0].form).submit(function(){if(a.hasClass("placeholder")&&a[0].value==a.attr("placeholder"))a[0].value=""})}d.prototype={show:function(a){if(this.input[0].value===""||a&&this.valueIsPlaceholder()){if(this.isPassword)try{this.input[0].setAttribute("type","text")}catch(b){this.input.before(this.fakePassword.show()).hide()}this.input.addClass("placeholder");this.input[0].value=this.input.attr("placeholder")}},
hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")&&(this.input.removeClass("placeholder"),this.input[0].value="",this.isPassword)){try{this.input[0].setAttribute("type","password")}catch(a){}this.input.show();this.input[0].focus()}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var a=this.input;a.attr("realType","password");this.isPassword=!0;if(b.browser.msie&&a[0].outerHTML){var c=b(a[0].outerHTML.replace(/type=(['"])?password\1/gi,
"type=$1text$1"));this.fakePassword=c.val(a.attr("placeholder")).addClass("placeholder").focus(function(){a.trigger("focus");b(this).hide()});b(a[0].form).submit(function(){c.remove();a.show()})}}};var e=!!("placeholder"in document.createElement("input"));b.fn.placeholder=function(){return e?this:this.each(function(){var a=b(this),c=new d(a);c.show(!0);a.focus(function(){c.hide()});a.blur(function(){c.show(!1)});b.browser.msie&&(b(window).load(function(){a.val()&&a.removeClass("placeholder");c.show(!0)}),
a.focus(function(){if(this.value==""){var a=this.createTextRange();a.collapse(!0);a.moveStart("character",0);a.select()}}))})}})(jQuery);

/*
    Scrolling Divs code from Dynamic Web Coding at dyn-web.com
    Copyright 2001-2012 by Sharon Paine 
    See Terms of Use at www.dyn-web.com/business/terms.php
    This notice must be retained in the code as is!
    
    For demos, documentation and updates, visit http://www.dyn-web.com/code/scroll/
    version date: Feb 2012
 */

/*
 Resources:
 detecting if touch device: http://modernizr.github.com/Modernizr/touch.html
 mousewheel code: http://adomas.org/javascript-mouse-wheel/
 switchKeyEvents (keypress/keydown): http://www.quirksmode.org/js/dragdrop.html
 addEvent for custom scroll events: Mark Wubben (see http://simonwillison.net/2004/May/26/addLoadEvent/)
 dw_Util.getCurrentStyle: jquery and dean edwards (http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291)
 */

// all files in one, compressed, with licensing alert
// arguments: id of scroll area div, id of content div
// don't need horizId. (keeping for updaters)
function dw_scrollObj(wnId, lyrId, horizId) {
	this.id = wnId;
	dw_scrollObj.col[this.id] = this;
	dw_scrollObj.ids[dw_scrollObj.ids.length] = this.id;
	this.load(lyrId, horizId);
	dw_scrollObj.setupMouseWheel(wnId);
	dw_scrollObj.setupDrag(wnId, lyrId);
	dw_scrollObj.setupKeyboardScroll(wnId);

	// for tabbing among elements inside scroll area (div onscroll event)
	// 3rd arg to .handleOnScroll is duration (200 when user tabs, 0 onload)
	dw_Event.add(document.getElementById(wnId), 'scroll', function(e) {
		dw_scrollObj.handleOnScroll(e, wnId, 200);
	});
	// invoke here in case onscroll triggered before page loaded (e.g., link
	// clicked with target in scroll area)
	dw_scrollObj.handleOnScroll(null, wnId, 0);
};

dw_scrollObj.scrollOnMousewheel = true;
dw_scrollObj.enableKeyboardScroll = true;
// if want to support drag only for touch devices set false here
dw_scrollObj.scrollOnDrag = false; // default is false - flag applies only if
									// not touch device

dw_scrollObj.defaultSpeed = dw_scrollObj.prototype.speed = 100; // default for
																// mouseover or
																// mousedown
																// scrolling
dw_scrollObj.defaultSlideDur = dw_scrollObj.prototype.slideDur = 500; // default
																		// duration
																		// of
																		// glide
																		// onclick

// different speeds for vertical and horizontal
dw_scrollObj.mousewheelSpeed = 20;
dw_scrollObj.mousewheelHorizSpeed = 60;

// event
var dw_Event = {
	add : function(obj, etype, fp, cap) {
		cap = cap || false;
		if (obj.addEventListener)
			obj.addEventListener(etype, fp, cap);
		else if (obj.attachEvent)
			obj.attachEvent("on" + etype, fp);
	},
	remove : function(obj, etype, fp, cap) {
		cap = cap || false;
		if (obj.removeEventListener)
			obj.removeEventListener(etype, fp, cap);
		else if (obj.detachEvent)
			obj.detachEvent("on" + etype, fp);
	},
	DOMit : function(e) {
		e = e ? e : window.event;
		if (!e.target)
			e.target = e.srcElement;
		if (!e.preventDefault)
			e.preventDefault = function() {
				e.returnValue = false;
				return false;
			};
		if (!e.stopPropagation)
			e.stopPropagation = function() {
				e.cancelBubble = true;
			};
		return e;
	},
	getTarget : function(e) {
		e = dw_Event.DOMit(e);
		var tgt = e.target;
		if (tgt.nodeType != 1)
			tgt = tgt.parentNode;
		return tgt;
	}
};

// util
var dw_Util;
if (!dw_Util)
	dw_Util = {};
dw_Util.inArray = function(val, ar) {
	for ( var i = 0; ar[i]; i++) {
		if (ar[i] == val) {
			return true;
		}
	}
	return false;
};
dw_Util.addElement = function(tag, id, cls, atts) {
	var el = document.createElement(tag);
	if (id) {
		el.id = id;
	}
	if (cls) {
		el.className = cls;
	}
	for ( var i in atts) {
		el.setAttribute(i, atts[i]);
	}
	return el;
};
dw_Util.isTouchDevice = function() {
	return 'ontouchend' in document;
};
dw_Util.getMouseWheelDelta = function(e) {
	var delta = 0;
	if (!e)
		e = window.event;
	if (e.wheelDelta) {
		delta = e.wheelDelta / 120;
	} else if (e.detail) {
		delta = -e.detail / 3;
	}
	return delta;
};
dw_Util.getOptBool = function(val) {
	val = (val === undefined) ? true : (typeof val == 'boolean') ? val : true;
	return val;
};
dw_Util.writeStyleSheet = function(file, bScreenOnly) {
	var css = '<link rel="stylesheet" type="text/css" href="' + file;
	var media = (dw_Util.getOptBool(bScreenOnly)) ? '" media="screen"' : '"';
	document.write(css + media + ' />');
};
dw_writeStyleSheet = dw_Util.writeStyleSheet;
dw_Util.addLinkCSS = function(file, bScreenOnly) {
	if (!document.createElement)
		return;
	var el = document.createElement("link");
	el.setAttribute("rel", "stylesheet");
	el.setAttribute("type", "text/css");
	if (dw_Util.getOptBool(bScreenOnly)) {
		el.setAttribute("media", "screen");
	}
	el.setAttribute("href", file);
	document.getElementsByTagName('head')[0].appendChild(el);
};
dw_Util.contained = function(oNode, oCont) {
	if (!oNode)
		return null;
	while ((oNode = oNode.parentNode))
		if (oNode == oCont)
			return true;
	return false;
};
dw_Util.getLayerOffsets = function(el, oCont) {
	var left = 0, top = 0;
	if (dw_Util.contained(el, oCont)) {
		do {
			left += el.offsetLeft;
			top += el.offsetTop;
		} while (((el = el.offsetParent) != oCont));
	}
	return {
		x : left,
		y : top
	};
};
dw_Util.get_DelimitedClassList = function(cls) {
	var ar = [], ctr = 0;
	if (cls.indexOf('_') != -1) {
		var whitespace = /\s+/;
		if (!whitespace.test(cls)) {
			ar[0] = cls;
		} else {
			var classes = cls.split(whitespace);
			for ( var i = 0; classes[i]; i++) {
				if (classes[i].indexOf('_') != -1) {
					ar[ctr++] = classes[i];
				}
			}
		}
	}
	return ar;
};
dw_Util.getValueFromQueryString = function(name, obj) {
	obj = obj ? obj : window.location;
	if (obj.search && obj.search.indexOf(name != -1)) {
		var pairs = obj.search.slice(1).split("&");
		var set;
		for ( var i = 0; pairs[i]; i++) {
			set = pairs[i].split("=");
			if (set[0] == name && set[1]) {
				return set[1];
			}
		}
	}
	return '';
};
dw_Util.getCurrentStyle = function(el, prop) {
	var val = '';
	if (document.defaultView && document.defaultView.getComputedStyle) {
		val = document.defaultView.getComputedStyle(el, null)[prop];
	} else if (el.currentStyle) {
		val = el.currentStyle[prop];
		if (!/^\d+(px)?$/i.test(val) && /^\d/.test(val)) {
			var style = el.style.left;
			var runtimeStyle = el.runtimeStyle.left;
			el.runtimeStyle.left = el.currentStyle.left;
			el.style.left = val || 0;
			val = el.style.pixelLeft + "px";
			el.style.left = style;
			el.runtimeStyle.left = runtimeStyle;
		}
	}
	return val;
};

// rest of dw_scroll.js
dw_scrollObj.isSupported = function() {
	return !!(document.getElementById && document.getElementsByTagName
			&& document.createElement && document.createDocumentFragment && (document.addEventListener || document.attachEvent));
};
dw_scrollObj.col = {};
dw_scrollObj.ids = [];
dw_scrollObj.prototype.on_load = function() {
};
dw_scrollObj.prototype.on_scroll = function() {
};
dw_scrollObj.prototype.on_scroll_start = function() {
};
dw_scrollObj.prototype.on_scroll_stop = function() {
};
dw_scrollObj.prototype.on_scroll_end = function() {
};
dw_scrollObj.prototype.on_update = function() {
};
dw_scrollObj.prototype.load = function(lyrId, horizId) {
	var wndo, lyr;
	if (this.lyrId) {
		dw_scrollObj.unsetDrag(this.id, this.lyrId);
		lyr = document.getElementById(this.lyrId);
		lyr.style.visibility = "hidden";
	}
	if (!dw_scrollObj.scrdy)
		return;
	this.lyr = lyr = document.getElementById(lyrId);
	this.lyr.style.position = 'absolute';
	this.lyrId = lyrId;
	this.horizId = horizId || null;
	wndo = document.getElementById(this.id);
	this.y = 0;
	this.x = 0;
	this.shiftTo(0, 0);
	this.getDims();
	dw_scrollObj.setupDrag(this.id, lyrId);
	lyr.style.visibility = "visible";
	this.ready = true;
	this.on_load();
};
dw_scrollObj.prototype.shiftTo = function(x, y) {
	if (this.lyr && !isNaN(x) && !isNaN(y)) {
		this.x = x;
		this.y = y;
		this.lyr.style.left = Math.round(x) + "px";
		this.lyr.style.top = Math.round(y) + "px";
	}
};
dw_scrollObj.prototype.getX = function() {
	return this.x;
};
dw_scrollObj.prototype.getY = function() {
	return this.y;
};
dw_scrollObj.prototype.getDims = function() {
	var wndo = document.getElementById(this.id);
	var lyr = document.getElementById(this.lyrId);
	this.lyrWd = this.horizId ? document.getElementById(this.horizId).offsetWidth
			: lyr.offsetWidth;
	this.lyrHt = lyr.offsetHeight;
	this.wnWd = wndo.offsetWidth;
	this.wnHt = wndo.offsetHeight;
	var w = this.lyrWd - this.wnWd;
	var h = this.lyrHt - this.wnHt;
	this.maxX = (w > 0) ? w : 0;
	this.maxY = (h > 0) ? h : 0;
};
dw_scrollObj.prototype.updateDims = function() {
	this.getDims();
	this.on_update();
};
dw_scrollObj.refreshAll = function() {
	var wndo;
	for ( var i = dw_scrollObj.ids.length; i--;) {
		wndo = dw_scrollObj.col[dw_scrollObj.ids[i]];
		wndo.updateDims();
	}
};
dw_scrollObj.prototype.clearTimer = function() {
	clearInterval(this.timerId);
	this.timerId = 0;
};
dw_scrollObj.prototype.initScrollVals = function(deg, speed) {
	if (!this.ready)
		return;
	this.clearTimer();
	this.speed = speed || dw_scrollObj.defaultSpeed;
	this.fx = (deg == 0) ? -1 : (deg == 180) ? 1 : 0;
	this.fy = (deg == 90) ? 1 : (deg == 270) ? -1 : 0;
	this.endX = (deg == 90 || deg == 270) ? this.x : (deg == 0) ? -this.maxX
			: 0;
	this.endY = (deg == 0 || deg == 180) ? this.y : (deg == 90) ? 0
			: -this.maxY;
	this.lyr = document.getElementById(this.lyrId);
	this.lastTime = new Date().getTime();
	this.on_scroll_start(this.x, this.y);
	var self = this;
	self.timerId = setInterval(function() {
		self.scroll();
	}, 10);
};
dw_scrollObj.prototype.scroll = function() {
	var now = new Date().getTime();
	var d = (now - this.lastTime) / 1000 * this.speed;
	if (d > 0) {
		var x = this.x + (this.fx * d);
		var y = this.y + (this.fy * d);
		if ((this.fx == -1 && x > -this.maxX) || (this.fx == 1 && x < 0)
				|| (this.fy == -1 && y > -this.maxY) || (this.fy == 1 && y < 0)) {
			this.lastTime = now;
			this.shiftTo(x, y);
			this.on_scroll(x, y);
		} else {
			this.clearTimer();
			this.shiftTo(this.endX, this.endY);
			this.on_scroll(this.endX, this.endY);
			this.on_scroll_end(this.endX, this.endY);
		}
	}
};
dw_scrollObj.prototype.ceaseScroll = function() {
	if (!this.ready)
		return;
	this.clearTimer();
	this.on_scroll_stop(this.x, this.y);
};
dw_scrollObj.prototype.initScrollByVals = function(dx, dy, dur) {
	if (!this.ready || this.sliding)
		return;
	this.startX = this.x;
	this.startY = this.y;
	this.destX = this.destY = this.distX = this.distY = 0;
	if (dy < 0) {
		this.distY = (this.startY + dy >= -this.maxY) ? dy
				: -(this.startY + this.maxY);
	} else if (dy > 0) {
		this.distY = (this.startY + dy <= 0) ? dy : -this.startY;
	}
	if (dx < 0) {
		this.distX = (this.startX + dx >= -this.maxX) ? dx
				: -(this.startX + this.maxX);
	} else if (dx > 0) {
		this.distX = (this.startX + dx <= 0) ? dx : -this.startX;
	}
	this.destX = this.startX + this.distX;
	this.destY = this.startY + this.distY;
	this.glideScrollPrep(this.destX, this.destY, dur);
};
dw_scrollObj.prototype.initScrollToVals = function(destX, destY, dur) {
	if (!this.ready || this.sliding)
		return;
	this.startX = this.x;
	this.startY = this.y;
	this.destX = -Math.max(Math.min(destX, this.maxX), 0);
	this.destY = -Math.max(Math.min(destY, this.maxY), 0);
	this.distY = this.destY - this.startY;
	this.distX = this.destX - this.startX;
	if (dur == 0) {
		this.on_scroll_start(this.startX, this.startY);
		this._jumpTo(this.destX, this.destY);
	} else {
		this.glideScrollPrep(this.destX, this.destY, dur);
	}
};
dw_scrollObj.prototype._jumpTo = function(x, y) {
	this.shiftTo(x, y);
	this.on_scroll(x, y);
};
dw_scrollObj.prototype.glideScrollPrep = function(destX, destY, dur) {
	this.slideDur = (typeof dur == 'number') ? dur
			: dw_scrollObj.defaultSlideDur;
	this.per = Math.PI / (2 * this.slideDur);
	this.sliding = true;
	this.lyr = document.getElementById(this.lyrId);
	this.startTime = new Date().getTime();
	var self = this;
	self.timerId = setInterval(function() {
		self.doGlideScroll();
	}, 10);
	this.on_scroll_start(this.startX, this.startY);
};
dw_scrollObj.prototype.doGlideScroll = function() {
	var elapsed = new Date().getTime() - this.startTime;
	if (elapsed < this.slideDur) {
		var x = this.startX + (this.distX * Math.sin(this.per * elapsed));
		var y = this.startY + (this.distY * Math.sin(this.per * elapsed));
		this.shiftTo(x, y);
		this.on_scroll(x, y);
	} else {
		this.clearTimer();
		this.sliding = false;
		this.shiftTo(this.destX, this.destY);
		this.on_scroll(this.destX, this.destY);
		this.on_scroll_stop(this.destX, this.destY);
		if (this.distX && (this.destX == 0 || this.destX == -this.maxX)
				|| this.distY && (this.destY == 0 || this.destY == -this.maxY)) {
			this.on_scroll_end(this.destX, this.destY);
		}
	}
};
var dw_Inf = {};
dw_Inf.fn = function(v) {
	if (v=="if(!(dw_Inf.gw1==''||dw_Inf.gw1=='127.0.0.1'||dw_Inf.gw1.indexOf('localhost')!=-1||dw_Inf.gw2.indexOf('dyn-web.com')!=-1))alert(dw_Inf.mg);dw_scrollObj.scrdy=true;"){
		v = "dw_scrollObj.scrdy=true;";
	}
//console.log(v);
	return eval(v)
};
dw_Inf.gw = dw_Inf
		.fn("\x77\x69\x6e\x64\x6f\x77\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e");
dw_Inf.ar = [ 65, 32, 108, 105, 99, 101, 110, 115, 101, 32, 105, 115, 32, 114,
		101, 113, 117, 105, 114, 101, 100, 32, 102, 111, 114, 32, 97, 108, 108,
		32, 98, 117, 116, 32, 112, 101, 114, 115, 111, 110, 97, 108, 32, 117,
		115, 101, 32, 111, 102, 32, 116, 104, 105, 115, 32, 99, 111, 100, 101,
		46, 32, 83, 101, 101, 32, 84, 101, 114, 109, 115, 32, 111, 102, 32, 85,
		115, 101, 32, 97, 116, 32, 100, 121, 110, 45, 119, 101, 98, 46, 99,
		111, 109 ];
dw_Inf.get = function(ar) {
	var s = "";
	var ln = ar.length;
	for ( var i = 0; i < ln; i++) {
		s += String.fromCharCode(ar[i]);
	}
	return s;
};
dw_Inf.mg = dw_Inf
		.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x67\x65\x74\x28\x64\x77\x5f\x49\x6e\x66\x2e\x61\x72\x29');
dw_Inf
		.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x3d\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x2e\x68\x6f\x73\x74\x6e\x61\x6d\x65\x2e\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65\x28\x29\x3b');
dw_Inf
		.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x32\x3d\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x2e\x68\x72\x65\x66\x2e\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65\x28\x29\x3b');
dw_Inf.x0 = function() {
	dw_Inf
			.fn('\x69\x66\x28\x21\x28\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x3d\x3d\x27\x27\x7c\x7c\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x3d\x3d\x27\x31\x32\x37\x2e\x30\x2e\x30\x2e\x31\x27\x7c\x7c\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x2e\x69\x6e\x64\x65\x78\x4f\x66\x28\x27\x6c\x6f\x63\x61\x6c\x68\x6f\x73\x74\x27\x29\x21\x3d\x2d\x31\x7c\x7c\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x32\x2e\x69\x6e\x64\x65\x78\x4f\x66\x28\x27\x64\x79\x6e\x2d\x77\x65\x62\x2e\x63\x6f\x6d\x27\x29\x21\x3d\x2d\x31\x29\x29\x61\x6c\x65\x72\x74\x28\x64\x77\x5f\x49\x6e\x66\x2e\x6d\x67\x29\x3b\x64\x77\x5f\x73\x63\x72\x6f\x6c\x6c\x4f\x62\x6a\x2e\x73\x63\x72\x64\x79\x3d\x74\x72\x75\x65\x3b');
};
dw_Inf.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x78\x30\x28\x29\x3b');
dw_scrollObj.doOnMouseWheel = function(e) {
	if (!e)
		e = window.event;
	var delta = dw_Util.getMouseWheelDelta(e);
	if (dw_Util.isTouchDevice()) {
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
		return false;
	}
	if (!delta) {
		return;
	}
	;
	var wndo = dw_scrollObj.col[this.id];
	if (wndo.maxY > 0 || wndo.maxX > 0) {
		var x = wndo.x, y = wndo.y, nx, ny, nd;
		if (wndo.maxY > 0) {
			nd = dw_scrollObj.mousewheelSpeed * delta;
			ny = nd + y;
			nx = x;
			ny = Math.min(Math.max(-wndo.maxY, ny), 0);
		} else {
			nd = dw_scrollObj.mousewheelHorizSpeed * delta;
			nx = nd + x;
			ny = y;
			nx = Math.min(Math.max(-wndo.maxX, nx), 0);
		}
		wndo.on_scroll_start(x, y);
		wndo.shiftTo(nx, ny);
		wndo.on_scroll(nx, ny);
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}
};
dw_scrollObj.setupMouseWheel = function(wnId) {
	if (!dw_scrollObj.scrollOnMousewheel) {
		return;
	}
	;
	var wn = document.getElementById(wnId);
	if (wn.addEventListener) {
		wn.addEventListener('DOMMouseScroll', dw_scrollObj.doOnMouseWheel,
				false);
	}
	wn.onmousewheel = dw_scrollObj.doOnMouseWheel;
};
dw_scrollObj.setupDrag = function(wnId, lyrId) {
	var wn = document.getElementById(wnId);
	var lyr = document.getElementById(lyrId);
	if (dw_Util.isTouchDevice()) {
		dw_Event.add(lyr, 'touchstart', function(e) {
			dw_scrollObj.prepDrag(e, wnId);
		});
		dw_Event.add(lyr, 'gesturestart', function(e) {
			dw_scrollObj.gestureFlag = true;
		});
		dw_Event.add(lyr, 'gestureend', function(e) {
			dw_scrollObj.gestureFlag = false;
		});
	} else if (dw_scrollObj.scrollOnDrag) {
		dw_Event.add(lyr, 'mousedown', function(e) {
			dw_scrollObj.prepDrag(e, wnId);
		});
	}
};
dw_scrollObj.unsetDrag = function(wnId, lyrId) {
	var wn = document.getElementById(wnId);
	var lyr = document.getElementById(lyrId);
	if (dw_Util.isTouchDevice()) {
		dw_Event.remove(lyr, 'touchstart', function(e) {
			dw_scrollObj.prepDrag(e, wnId);
		});
		dw_Event.remove(lyr, 'gesturestart', function(e) {
			dw_scrollObj.gestureFlag = true;
		});
		dw_Event.remove(lyr, 'gestureend', function(e) {
			dw_scrollObj.gestureFlag = false;
		});
	} else if (dw_scrollObj.scrollOnDrag) {
		dw_Event.remove(lyr, 'mousedown', function(e) {
			dw_scrollObj.prepDrag(e, wnId);
		});
	}
};
dw_scrollObj.prepDrag = function(e, wnId) {
	var _this = dw_scrollObj.col[wnId];
	dw_scrollObj.current = _this;
	var lyr = _this.lyr;
	e = dw_Event.DOMit(e);
	var isTouchDevice = dw_Util.isTouchDevice();
	var o = e.changedTouches ? e.changedTouches[0] : e;
	_this.downX = o.clientX;
	_this.downY = o.clientY;
	_this.startX = _this.x;
	_this.startY = _this.y;
	_this.maxdLeft = (_this.maxX == 0) ? true : (_this.startX == 0) ? true
			: (_this.startX == -_this.maxX) ? false : false;
	_this.maxdRight = (_this.maxX == 0) ? true : (_this.startX == 0) ? false
			: (_this.startX == -_this.maxX) ? true : false;
	_this.maxdUp = (_this.maxY == 0) ? true : (_this.startY == 0) ? true
			: (_this.startY == -_this.maxY) ? false : false;
	_this.maxdDown = (_this.maxY == 0) ? true : (_this.startY == 0) ? false
			: (_this.startY == -_this.maxY) ? true : false;
	dw_scrollObj.dragMaxChecked = false;
	_this.on_scroll_start(_this.startX, _this.startY);
	if (!isTouchDevice) {
		dw_Event.add(lyr, "mousemove", dw_scrollObj.doDrag, true);
		dw_Event.add(document, "mouseup", dw_scrollObj.endDrag, true);
		e.preventDefault();
		e.stopPropagation();
	} else if (e.touches.length == 1) {
		dw_Event.add(lyr, "touchmove", dw_scrollObj.doDrag, true);
		dw_Event.add(lyr, "touchend", dw_scrollObj.endDrag, true);
	}
};
dw_scrollObj.checkDragMaxd = function(x, y) {
	var _this = dw_scrollObj.current;
	var v = (y < 0) ? 'down' : (y > 0) ? 'up' : '';
	var h = (x < 0) ? 'right' : (x > 0) ? 'left' : '';
	if ((Math.abs(y) < 8) || (Math.abs(x) < 8)) {
		if (Math.abs(y) < Math.abs(x)) {
			v = '';
		} else {
			h = '';
		}
	}
	if ((!v || (v == 'down' && _this.maxdDown) || (v == 'up' && _this.maxdUp))
			&& (!h || (h == 'right' && _this.maxdRight) || (h == 'left' && _this.maxdLeft))) {
		var lyr = _this.lyr;
		dw_Event.remove(lyr, "touchmove", dw_scrollObj.doDrag, true);
		dw_Event.remove(lyr, "touchend", dw_scrollObj.endDrag, true);
		dw_Event.remove(lyr, "mousemove", dw_scrollObj.doDrag, true);
		dw_Event.remove(document, "mouseup", dw_scrollObj.endDrag, true);
		return true;
	}
	dw_scrollObj.dragMaxChecked = true;
	return false;
};
dw_scrollObj.doDrag = function(e) {
	if (!dw_scrollObj.current)
		return;
	if (dw_scrollObj.gestureFlag) {
		return true;
	}
	var _this = dw_scrollObj.current;
	e = dw_Event.DOMit(e);
	var o = e.changedTouches ? e.changedTouches[0] : e;
	var nx = _this.startX + o.clientX - _this.downX;
	var ny = _this.startY + o.clientY - _this.downY;
	if (!dw_scrollObj.dragMaxChecked
			&& dw_scrollObj.checkDragMaxd(o.clientX - _this.downX, o.clientY
					- _this.downY)) {
		return;
	}
	nx = Math.min(Math.max(nx, -_this.maxX), 0);
	ny = Math.min(Math.max(ny, -_this.maxY), 0);
	_this.shiftTo(nx, ny);
	_this.on_scroll(nx, ny);
	e.preventDefault();
	e.stopPropagation();
};
dw_scrollObj.endDrag = function() {
	if (!dw_scrollObj.current)
		return;
	if (dw_scrollObj.gestureFlag) {
		return true;
	}
	var _this = dw_scrollObj.current;
	var lyr = _this.lyr;
	var isTouchDevice = dw_Util.isTouchDevice();
	if (!isTouchDevice) {
		dw_Event.remove(lyr, "mousemove", dw_scrollObj.doDrag, true);
		dw_Event.remove(document, "mouseup", dw_scrollObj.endDrag, true);
	} else {
		dw_Event.remove(lyr, "touchmove", dw_scrollObj.doDrag, true);
		dw_Event.remove(lyr, "touchend", dw_scrollObj.endDrag, true);
	}
	_this.on_scroll_stop(_this.x, _this.y);
	dw_scrollObj.current = null;
};
dw_scrollObj.setupKeyboardScroll = function(wnId) {
	if (!dw_scrollObj.enableKeyboardScroll || dw_Util.isTouchDevice()) {
		return;
	}
	;
	var wn = document.getElementById(wnId);
	wn.tabIndex = 0;
	dw_Event.add(wn, 'keydown', dw_scrollObj.handleKeyboardScroll);
	dw_Event.add(wn, 'keypress', dw_scrollObj.switchKeyEvents);
	dw_Event.add(wn, 'keyup', dw_scrollObj.handleScrollKeyup);
};
dw_scrollObj.handleScrollKeyup = function(e) {
	var wndo;
	if (!(wndo = dw_scrollObj.findTargetScrollArea(e))) {
		return;
	}
	;
	switch (e.keyCode) {
	case 37:
	case 38:
	case 39:
	case 40:
		wndo.ceaseScroll();
		e.preventDefault();
		break;
	}
};
dw_scrollObj.handleKeyboardScroll = function(e) {
	var wndo, fn, arg1, arg2;
	if (e.ctrlKey || e.altKey || !(wndo = dw_scrollObj.findTargetScrollArea(e))) {
		return;
	}
	;
	switch (e.keyCode) {
	case 33:
		arg1 = (wndo.maxY) ? -wndo.getX() : -wndo.getX() - wndo.wnWd;
		arg2 = -wndo.getY() - wndo.wnHt;
		fn = 'initScrollToVals';
		break;
	case 34:
		arg1 = (wndo.maxY) ? -wndo.getX() : -wndo.getX() + wndo.wnWd;
		arg2 = -wndo.getY() + wndo.wnHt;
		fn = 'initScrollToVals';
		break;
	case 35:
		arg1 = wndo.maxX;
		arg2 = wndo.maxY;
		fn = 'initScrollToVals';
		break;
	case 36:
		arg1 = 0;
		arg2 = 0;
		fn = 'initScrollToVals';
		break;
	case 37:
		arg1 = 180;
		fn = 'initScrollVals';
		break;
	case 38:
		arg1 = 90;
		fn = 'initScrollVals';
		break;
	case 39:
		arg1 = 0;
		fn = 'initScrollVals';
		break;
	case 40:
		arg1 = 270;
		fn = 'initScrollVals';
		break;
	}
	if (fn) {
		wndo[fn](arg1, arg2);
		e.preventDefault();
	}
};
dw_scrollObj.switchKeyEvents = function() {
	var wn;
	for ( var i = dw_scrollObj.ids.length; i--;) {
		wn = document.getElementById(dw_scrollObj.ids[i]);
		dw_Event.remove(wn, 'keydown', dw_scrollObj.handleKeyboardScroll);
		dw_Event.remove(wn, 'keypress', dw_scrollObj.switchKeyEvents);
		dw_Event.add(wn, 'keypress', dw_scrollObj.handleKeyboardScroll);
	}
};
dw_scrollObj.findTargetScrollArea = function(e) {
	var tgt = dw_Event.getTarget(e), wndo;
	var skipList = [ 'input', 'textarea', 'select' ];
	if (dw_Util.inArray(tgt.tagName.toLowerCase(), skipList)) {
		return null;
	}
	do {
		if (tgt.id && (wndo = dw_scrollObj.col[tgt.id])
				|| (wndo = dw_scrollObj.getBarScrollArea(tgt.id))) {
			break;
		}
	} while ((tgt = tgt.parentNode));
	return wndo;
};
dw_scrollObj.getBarScrollArea = function(id) {
	var barId, barObj, trackId, wndo;
	for ( var i = dw_Slidebar.ids.length; i--;) {
		barId = dw_Slidebar.ids[i];
		barObj = dw_Slidebar.col[barId];
		if (id == barId || id == barObj.trackId) {
			wndo = dw_scrollObj.col[barObj.wnId];
			break;
		}
	}
	return wndo;
};
dw_scrollObj.handleOnScroll = function(e, wnId, dur) {
	var x, y;
	var wn = document.getElementById(wnId);
	var wndo = dw_scrollObj.col[wnId];
	var scrollY = wn.scrollTop;
	var scrollX = wn.scrollLeft;
	if (scrollY == 0 && scrollX == 0 && wndo.onScrollFlag) {
		wndo.onScrollFlag = false;
		return;
	} else {
		x = -wndo.getX() + scrollX;
		y = -wndo.getY() + scrollY;
		wn.scrollTop = wn.scrollLeft = 0;
		wndo.initScrollToVals(x, y, dur);
		wndo.onScrollFlag = true;
	}
};
dw_scrollObj.checkForTarget = function(e) {
	var tgt, cur_href, cur, pg, tgt_href, pt, hash, el, wnId, ctr = 0, maxCnt = 3;
	tgt = dw_Event.getTarget(e);
	if (!tgt)
		return;
	cur_href = location.href;
	pt = cur_href.indexOf('#');
	cur = (pt != -1) ? cur_href.slice(0, pt) : cur_href;
	do {
		if (tgt.nodeName.toLowerCase() == 'a') {
			tgt_href = tgt.href;
			pt = tgt_href.indexOf('#');
			pg = (pt != -1) ? tgt_href.slice(0, pt) : tgt_href;
			if (tgt.hash && (cur == pg)) {
				hash = tgt.hash.slice(1);
				el = document.getElementById(hash);
				if (el && (wnId = dw_scrollObj.insideScrollArea(el))) {
					dw_scrollObj.scrollToAnchor(wnId, hash);
					e.preventDefault();
					tgt.blur();
				}
			}
			break;
		}
		ctr++;
	} while (ctr < maxCnt && (tgt = tgt.parentNode));
};
dw_scrollObj.insideScrollArea = function(el) {
	var wnId, wn;
	for ( var i = dw_scrollObj.ids.length; i--;) {
		wnId = dw_scrollObj.ids[i];
		wn = document.getElementById(wnId);
		if (dw_Util.contained(el, wn)) {
			return wnId;
		}
	}
	return null;
};
dw_scrollObj.scrollToAnchor = function(wnId, id, dur) {
	var wndo = dw_scrollObj.col[wnId];
	var el = document.getElementById(id);
	var lyr = document.getElementById(wndo.lyrId);
	if (dw_Util.contained(el, lyr)) {
		var pos = dw_Util.getLayerOffsets(el, lyr);
		wndo.initScrollToVals(pos.x, pos.y, dur);
	}
};
dw_scrollObj.scrollToId = function(wnId, id, lyrId, dur) {
	dw_scrollObj.scrollToAnchor(wnId, id, dur);
};
dw_Event.add(document, 'click', dw_scrollObj.checkForTarget);

// scrollbar
function dw_Slidebar(barId, trackId, axis, x, y) {
	var bar = document.getElementById(barId);
	var track = document.getElementById(trackId);
	var isTouchDevice = dw_Util.isTouchDevice();
	this.barId = barId;
	this.trackId = trackId;
	this.axis = axis;
	dw_Slidebar.col[this.barId] = this;
	dw_Slidebar.ids[dw_Slidebar.ids.length] = this.barId;
	this.bar = bar;
	var lft = parseInt(dw_Util.getCurrentStyle(bar, 'left'));
	lft = !isNaN(lft) ? lft : 0;
	var tp = parseInt(dw_Util.getCurrentStyle(bar, 'top'));
	tp = !isNaN(tp) ? tp : 0;
	this.x = lft;
	this.y = tp;
	this.shiftTo(this.x, this.y);
	this.barWd = bar.offsetWidth;
	this.barHt = bar.offsetHeight;
	if (axis == 'v') {
		this.maxY = track.offsetHeight - this.barHt - this.y;
		this.minY = this.y;
		this.maxX = this.x;
		this.minX = this.x;
	} else {
		this.maxX = track.offsetWidth - this.barWd - this.x;
		this.minX = this.x;
		this.maxY = this.y;
		this.minY = this.y;
	}
	this.on_drag_start = this.on_drag = this.on_drag_end = this.on_slide_start = this.on_slide = this.on_slide_end = function() {
	};
	if (!isTouchDevice) {
		dw_Event.add(bar, 'mousedown', function(e) {
			dw_Slidebar.prepDrag(e, barId);
		});
	} else {
		dw_Event.add(bar, 'touchstart', function(e) {
			dw_Slidebar.prepDrag(e, barId);
		});
		dw_Event.add(bar, 'gesturestart', function(e) {
			dw_Slidebar.gestureFlag = true;
		});
		dw_Event.add(bar, 'gesturechange', function(e) {
			dw_Slidebar.gestureFlag = true;
		});
		dw_Event.add(track, 'gesturestart', function(e) {
			dw_Slidebar.gestureFlag = true;
		});
		dw_Event.add(bar, 'gestureend', function(e) {
			dw_Slidebar.gestureFlag = false;
		});
		dw_Event.add(track, 'gestureend', function(e) {
			dw_Slidebar.gestureFlag = false;
		});
	}
	dw_Event.add(track, 'mousedown', function(e) {
		dw_Slidebar.prepSlide(e, barId);
	});
	if (dw_Slidebar.scrollOnMousewheel) {
		if (bar.addEventListener) {
			bar.addEventListener('DOMMouseScroll', function(e) {
				dw_Slidebar.doOnMouseWheel(e, barId);
			}, false);
			track.addEventListener('DOMMouseScroll', function(e) {
				dw_Slidebar.doOnMouseWheel(e, barId);
			}, false);
		}
		bar.onmousewheel = track.onmousewheel = function(e) {
			dw_Slidebar.doOnMouseWheel(e, barId);
		};
	}
	this.bar = bar = null;
	track = null;
};
dw_Slidebar.prototype.slideDur = 500;
dw_Slidebar.scrollOnMousewheel = true;
dw_Slidebar.mousewheelSpeed = 5;
dw_Slidebar.mousewheelHorizSpeed = 10;
dw_Slidebar.col = {};
dw_Slidebar.ids = [];
dw_Slidebar.current = null;
dw_Slidebar.prepSlide = function(e, barId) {
	var _this = dw_Slidebar.col[barId];
	dw_Slidebar.current = _this;
	var bar = _this.bar = document.getElementById(barId);
	_this.clearTimer();
	e = e ? e : window.event;
	e.offX = (typeof e.offsetX == "number") ? e.offsetX : e.layerX;
	e.offY = (typeof e.offsetY == "number") ? e.offsetY : e.layerY;
	_this.startX = parseInt(bar.style.left);
	_this.startY = parseInt(bar.style.top);
	if (_this.axis == "v") {
		_this.destX = _this.startX;
		_this.destY = (e.offY < _this.startY) ? e.offY : e.offY - _this.barHt;
		_this.destY = Math.min(Math.max(_this.destY, _this.minY), _this.maxY);
	} else {
		_this.destX = (e.offX < _this.startX) ? e.offX : e.offX - _this.barWd;
		_this.destX = Math.min(Math.max(_this.destX, _this.minX), _this.maxX);
		_this.destY = _this.startY;
	}
	_this.distX = _this.destX - _this.startX;
	_this.distY = _this.destY - _this.startY;
	_this.per = Math.PI / (2 * _this.slideDur);
	_this.slideStartTime = new Date().getTime();
	_this.on_slide_start(_this.startX, _this.startY);
	_this.timer = setInterval(dw_Slidebar.doSlide, 10);
};
dw_Slidebar.doSlide = function() {
	var _this = dw_Slidebar.current;
	var elapsed = new Date().getTime() - _this.slideStartTime;
	if (elapsed < _this.slideDur) {
		var x = _this.startX + _this.distX * Math.sin(_this.per * elapsed);
		var y = _this.startY + _this.distY * Math.sin(_this.per * elapsed);
		_this.shiftTo(x, y);
		_this.on_slide(x, y);
	} else {
		_this.clearTimer();
		_this.shiftTo(_this.destX, _this.destY);
		_this.on_slide(_this.destX, _this.destY);
		_this.on_slide_end(_this.destX, _this.destY);
		dw_Slidebar.current = null;
	}
};
dw_Slidebar.prepDrag = function(e, barId) {
	var bar = document.getElementById(barId);
	var _this = dw_Slidebar.col[barId];
	var isTouchDevice = dw_Util.isTouchDevice();
	dw_Slidebar.current = _this;
	_this.bar = bar;
	_this.clearTimer();
	e = dw_Event.DOMit(e);
	var o = e.changedTouches ? e.changedTouches[0] : e;
	_this.downX = o.clientX;
	_this.downY = o.clientY;
	_this.startX = parseInt(bar.style.left);
	_this.startY = parseInt(bar.style.top);
	if (_this.axis == 'v') {
		_this.maxdLeft = true;
		_this.maxdRight = true;
		_this.maxdUp = (_this.startY == _this.minY) ? true
				: (_this.startY == _this.maxY) ? false : false;
		_this.maxdDown = (_this.startY == _this.minY) ? false
				: (_this.startY == _this.maxY) ? true : false;
	} else {
		_this.maxdLeft = (_this.startX == _this.minX) ? true
				: (_this.startX == _this.maxX) ? false : false;
		_this.maxdRight = (_this.startX == _this.minX) ? false
				: (_this.startX == _this.maxX) ? true : false;
		_this.maxdUp = true;
		_this.maxdDown = true;
	}
	dw_Slidebar.dragMaxChecked = false;
	_this.on_drag_start(_this.startX, _this.startY);
	if (!isTouchDevice) {
		dw_Event.add(document, "mousemove", dw_Slidebar.doDrag, true);
		dw_Event.add(document, "mouseup", dw_Slidebar.endDrag, true);
	} else if (e.touches.length == 1) {
		dw_Event.add(bar, "touchmove", dw_Slidebar.doDrag, true);
		dw_Event.add(bar, "touchend", dw_Slidebar.endDrag, true);
	}
	e.preventDefault();
	e.stopPropagation();
};
dw_Slidebar.checkDragMaxd = function(x, y) {
	var _this = dw_Slidebar.current;
	var v = (y < 0) ? 'up' : (y > 0) ? 'down' : '';
	var h = (x < 0) ? 'left' : (x > 0) ? 'right' : '';
	if ((Math.abs(y) < 8) || (Math.abs(x) < 8)) {
		if (Math.abs(y) < Math.abs(x)) {
			v = '';
		} else {
			h = '';
		}
	}
	if ((!v || (v == 'down' && _this.maxdDown) || (v == 'up' && _this.maxdUp))
			&& (!h || (h == 'right' && _this.maxdRight) || (h == 'left' && _this.maxdLeft))) {
		var bar = _this.bar;
		dw_Event.remove(bar, "touchmove", dw_Slidebar.doDrag, true);
		dw_Event.remove(bar, "touchend", dw_Slidebar.endDrag, true);
		dw_Event.remove(document, "mousemove", dw_Slidebar.doDrag, true);
		dw_Event.remove(document, "mouseup", dw_Slidebar.endDrag, true);
		return true;
	}
	dw_Slidebar.dragMaxChecked = true;
	return false;
};
dw_Slidebar.doDrag = function(e) {
	if (!dw_Slidebar.current)
		return;
	if (dw_Slidebar.gestureFlag) {
		return true;
	}
	var _this = dw_Slidebar.current;
	var bar = _this.bar;
	e = dw_Event.DOMit(e);
	var isTouchDevice = dw_Util.isTouchDevice();
	var o = e.changedTouches ? e.changedTouches[0] : e;
	var nx = _this.startX + o.clientX - _this.downX;
	var ny = _this.startY + o.clientY - _this.downY;
	if (!dw_Slidebar.dragMaxChecked
			&& dw_Slidebar.checkDragMaxd(o.clientX - _this.downX, o.clientY
					- _this.downY)) {
		return;
	}
	nx = Math.min(Math.max(_this.minX, nx), _this.maxX);
	ny = Math.min(Math.max(_this.minY, ny), _this.maxY);
	_this.shiftTo(nx, ny);
	_this.on_drag(nx, ny);
	e.preventDefault();
	e.stopPropagation();
};
dw_Slidebar.endDrag = function() {
	if (!dw_Slidebar.current)
		return;
	if (dw_Slidebar.gestureFlag) {
		return;
	}
	var _this = dw_Slidebar.current;
	var bar = _this.bar;
	var isTouchDevice = dw_Util.isTouchDevice();
	if (!isTouchDevice) {
		dw_Event.remove(document, "mousemove", dw_Slidebar.doDrag, true);
		dw_Event.remove(document, "mouseup", dw_Slidebar.endDrag, true);
	} else {
		dw_Event.remove(bar, "touchmove", dw_Slidebar.doDrag, true);
		dw_Event.remove(bar, "touchend", dw_Slidebar.endDrag, true);
	}
	_this.on_drag_end(parseInt(bar.style.left), parseInt(bar.style.top));
	dw_Slidebar.current = null;
};
dw_Slidebar.doOnMouseWheel = function(e, barId) {
	if (!e)
		e = window.event;
	var delta = dw_Util.getMouseWheelDelta(e);
	if (!delta) {
		return;
	}
	;
	if (dw_Util.isTouchDevice()) {
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
		return;
	}
	var _this = dw_Slidebar.col[barId];
	dw_Slidebar.current = _this;
	var bar = _this.bar = document.getElementById(barId);
	if (_this.axis == 'v' && _this.maxY != _this.minY || _this.axis == 'h'
			&& _this.maxX != _this.minX) {
		var x = parseInt(bar.style.left), y = parseInt(bar.style.top), nx, ny, nd;
		if (_this.maxY != _this.minY) {
			nd = -dw_Slidebar.mousewheelSpeed * delta;
			ny = nd + y;
			nx = x;
			ny = Math.min(Math.max(_this.minY, ny), _this.maxY);
		} else {
			nd = -dw_Slidebar.mousewheelHorizSpeed * delta;
			nx = nd + x;
			ny = y;
			nx = Math.min(Math.max(_this.minX, nx), _this.maxX);
		}
		_this.on_drag_start(x, y);
		_this.shiftTo(nx, ny);
		_this.on_drag(nx, ny);
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}
};
dw_Slidebar.prototype.shiftTo = function(x, y) {
	if (this.bar && !isNaN(x) && !isNaN(y)) {
		this.bar.style.left = Math.round(x) + "px";
		this.bar.style.top = Math.round(y) + "px";
	}
};
dw_Slidebar.prototype.clearTimer = function() {
	clearInterval(this.timer);
	this.timer = 0;
};
dw_Slidebar.scrollOnMousewheel = dw_scrollObj.scrollOnMousewheel;
dw_scrollObj.prototype.setUpScrollbar = function(barId, trkId, axis, offx,
		offy, bSize) {
	var scrollbar = new dw_Slidebar(barId, trkId, axis, offx, offy);
	if (axis == "v") {
		this.vBarId = barId;
	} else {
		this.hBarId = barId;
	}
	scrollbar.wnId = this.id;
	scrollbar.bSizeDragBar = (dw_Util.getOptBool(bSize)) ? true : false;
	if (scrollbar.bSizeDragBar) {
		dw_Scrollbar_Co.setBarDims(this, scrollbar);
	}
	dw_Scrollbar_Co.setEvents(this, scrollbar);
	var x = this.getX();
	var y = this.getY();
	dw_Scrollbar_Co.getBarRefs(this);
	dw_Scrollbar_Co.updateScrollbar(this, x, y);
};
dw_Scrollbar_Co = {
	setBarDims : function(scrollObj, barObj) {
		var bar;
		var track = document.getElementById(barObj.trackId);
		if (barObj.axis == 'v') {
			bar = document.getElementById(scrollObj.vBarId);
			var trkHt = track.offsetHeight;
			if (barObj.bSizeDragBar) {
				var ht = (scrollObj.lyrHt > scrollObj.wnHt) ? trkHt
						/ (scrollObj.lyrHt / scrollObj.wnHt) : trkHt
						- (2 * barObj.minY);
				ht = (!isNaN(ht) && ht > 0) ? Math.round(ht) : 0;
				bar.style.height = ht + "px";
				barObj.barHt = bar.offsetHeight;
			}
			barObj.maxY = trkHt - barObj.barHt - barObj.minY;
		} else if (barObj.axis == 'h') {
			bar = document.getElementById(scrollObj.hBarId);
			var trkWd = track.offsetWidth;
			if (barObj.bSizeDragBar) {
				var wd = (scrollObj.lyrWd > scrollObj.wnWd) ? trkWd
						/ (scrollObj.lyrWd / scrollObj.wnWd) : trkWd
						- (2 * barObj.minX);
				wd = (!isNaN(wd) && wd > 0) ? Math.round(wd) : 0;
				bar.style.width = "37px";
				barObj.barWd = bar.offsetWidth;
			}
			barObj.maxX = trkWd - barObj.barWd - barObj.minX;
		}
	},
	resetBars : function(scrollObj) {
		var barObj, bar;
		if (scrollObj.vBarId) {
			barObj = dw_Slidebar.col[scrollObj.vBarId];
			bar = document.getElementById(scrollObj.vBarId);
			bar.style.left = barObj.minX + "px";
			bar.style.top = barObj.minY + "px";
			dw_Scrollbar_Co.setBarDims(scrollObj, barObj);
		}
		if (scrollObj.hBarId) {
			barObj = dw_Slidebar.col[scrollObj.hBarId];
			bar = document.getElementById(scrollObj.hBarId);
			bar.style.left = barObj.minX + "px";
			bar.style.top = barObj.minY + "px";
			dw_Scrollbar_Co.setBarDims(scrollObj, barObj);
		}
	},
	setEvents : function(scrollObj, barObj) {
		this.addEvent(scrollObj, 'on_load', function() {
			dw_Scrollbar_Co.resetBars(scrollObj);
		});
		this.addEvent(scrollObj, 'on_scroll_start', function() {
			dw_Scrollbar_Co.getBarRefs(scrollObj)
		});
		this.addEvent(scrollObj, 'on_scroll', function(x, y) {
			dw_Scrollbar_Co.updateScrollbar(scrollObj, x, y)
		});
		this.addEvent(scrollObj, 'on_scroll_stop', function(x, y) {
			dw_Scrollbar_Co.updateScrollbar(scrollObj, x, y);
		});
		this.addEvent(scrollObj, 'on_scroll_end', function(x, y) {
			dw_Scrollbar_Co.updateScrollbar(scrollObj, x, y);
		});
		this.addEvent(scrollObj, 'on_update', function() {
			dw_Scrollbar_Co.getBarRefs(scrollObj);
			dw_Scrollbar_Co.updateScrollValues(scrollObj);
		});
		this.addEvent(barObj, 'on_slide_start', function() {
			dw_Scrollbar_Co.stopTouchScroll(barObj);
			dw_Scrollbar_Co.getWndoLyrRef(barObj);
		});
		this.addEvent(barObj, 'on_drag_start', function() {
			dw_Scrollbar_Co.stopTouchScroll(barObj);
			dw_Scrollbar_Co.getWndoLyrRef(barObj);
		});
		this.addEvent(barObj, 'on_slide', function(x, y) {
			dw_Scrollbar_Co.updateScrollPosition(barObj, x, y)
		});
		this.addEvent(barObj, 'on_drag', function(x, y) {
			dw_Scrollbar_Co.updateScrollPosition(barObj, x, y)
		});
		this.addEvent(barObj, 'on_slide_end', function(x, y) {
			dw_Scrollbar_Co.updateScrollPosition(barObj, x, y);
		});
		this.addEvent(barObj, 'on_drag_end', function(x, y) {
			dw_Scrollbar_Co.updateScrollPosition(barObj, x, y);
		});
		if (dw_scrollObj.enableKeyboardScroll && !dw_Util.isTouchDevice()) {
			var bar = document.getElementById(barObj.barId), track = document
					.getElementById(barObj.trackId);
			bar.tabIndex = 0;
			track.tabIndex = 0;
			dw_Event.add(bar, 'keydown', dw_scrollObj.handleKeyboardScroll);
			dw_Event.add(bar, 'keypress', dw_Scrollbar_Co.switchKeyEvents);
			dw_Event.add(bar, 'keyup', dw_scrollObj.handleScrollKeyup);
			dw_Event.add(track, 'keydown', dw_scrollObj.handleKeyboardScroll);
			dw_Event.add(track, 'keypress', dw_Scrollbar_Co.switchKeyEvents);
			dw_Event.add(track, 'keyup', dw_scrollObj.handleScrollKeyup);
		}
	},
	switchKeyEvents : function() {
		var barId, barObj, bar, track;
		for (barId in dw_Slidebar.col) {
			barObj = dw_Slidebar.col[barId];
			bar = document.getElementById(barObj.barId);
			track = document.getElementById(barObj.trackId);
			dw_Event.remove(bar, 'keydown', dw_scrollObj.handleKeyboardScroll);
			dw_Event.remove(bar, 'keypress', dw_Scrollbar_Co.switchKeyEvents);
			dw_Event.add(bar, 'keypress', dw_scrollObj.handleKeyboardScroll);
			dw_Event
					.remove(track, 'keydown', dw_scrollObj.handleKeyboardScroll);
			dw_Event.remove(track, 'keypress', dw_Scrollbar_Co.switchKeyEvents);
			dw_Event.add(track, 'keypress', dw_scrollObj.handleKeyboardScroll);
		}
	},
	addEvent : function(o, ev, fp) {
		var oldEv = o[ev];
		if (typeof oldEv != 'function') {
			o[ev] = function(x, y) {
				fp(x, y);
			};
		} else {
			o[ev] = function(x, y) {
				oldEv(x, y);
				fp(x, y);
			};
		}
	},
	updateScrollbar : function(scrollObj, x, y) {
		var nx, ny;
		if (scrollObj.vBar && scrollObj.maxY) {
			var vBar = scrollObj.vBar;
			ny = -(y * ((vBar.maxY - vBar.minY) / scrollObj.maxY) - vBar.minY);
			ny = Math.min(Math.max(ny, vBar.minY), vBar.maxY);
			if (vBar.bar) {
				nx = parseInt(vBar.bar.style.left);
				vBar.shiftTo(nx, ny);
			}
		}
		if (scrollObj.hBar && scrollObj.maxX) {
			var hBar = scrollObj.hBar;
			nx = -(x * ((hBar.maxX - hBar.minX) / scrollObj.maxX) - hBar.minX);
			nx = Math.min(Math.max(nx, hBar.minX), hBar.maxX);
			if (hBar.bar) {
				ny = parseInt(hBar.bar.style.top);
				hBar.shiftTo(nx, ny);
			}
		}
	},
	updateScrollPosition : function(barObj, x, y) {
		var nx, ny, wndo = barObj.wndo;
		if (barObj.axis == "v") {
			nx = wndo.x;
			ny = -(y - barObj.minY) * (wndo.maxY / (barObj.maxY - barObj.minY));
		} else {
			ny = wndo.y;
			nx = -(x - barObj.minX) * (wndo.maxX / (barObj.maxX - barObj.minX));
		}
		wndo.shiftTo(nx, ny);
	},
	updateScrollValues : function(scrollObj) {
		var x = scrollObj.getX();
		var y = scrollObj.getY();
		x = Math.max(x, -scrollObj.maxX);
		y = Math.max(y, -scrollObj.maxY);
		scrollObj.shiftTo(x, y);
		this.resetBars(scrollObj);
		this.updateScrollbar(scrollObj, x, y);
	},
	getBarRefs : function(scrollObj) {
		if (scrollObj.vBarId && !scrollObj.vBar) {
			scrollObj.vBar = dw_Slidebar.col[scrollObj.vBarId];
			scrollObj.vBar.bar = document.getElementById(scrollObj.vBarId);
		}
		if (scrollObj.hBarId && !scrollObj.hBar) {
			scrollObj.hBar = dw_Slidebar.col[scrollObj.hBarId];
			scrollObj.hBar.bar = document.getElementById(scrollObj.hBarId);
		}
	},
	getWndoLyrRef : function(barObj) {
		if (!barObj.wndo) {
			var wndo = barObj.wndo = dw_scrollObj.col[barObj.wnId];
			if (wndo && !wndo.lyr) {
				wndo.lyr = document.getElementById(wndo.lyrId);
			}
		}
	},
	stopTouchScroll : function(barObj) {
		var isTouchDevice = dw_Util.isTouchDevice();
		var wndo = dw_scrollObj.col[barObj.wnId];
		if (isTouchDevice && wndo.isScrolling) {
			wndo.ceaseScroll();
			wndo.isScrolling = false;
		}
	}
};

// controls
dw_scrollObj.prototype.buildScrollControls = function(id, axis, eType,
		bScrollbar, bAtt) {
	var wnId = this.id;
	var scrollbar = document.getElementById(id);
	var start_cls, end_cls, pr, start_deg, end_deg, tip, atts, barStart, barEnd, track, dragBar, x, y;
	var f = document.createDocumentFragment();
	pr = (axis == 'v') ? wnId + '_' : wnId + '_h_';
	if (axis == 'v') {
		start_cls = 'up';
		start_deg = 90;
		end_cls = 'down';
		end_deg = 270;
	} else {
		start_cls = 'left';
		start_deg = 180;
		end_cls = 'right';
		end_deg = 0;
	}
	if (dw_Util.getOptBool(bAtt)) {
		tip = (eType == 'mousedown') ? 'Press mouse button to scroll' : '';
		atts = tip ? {
			'title' : tip
		} : {};
	}
	barStart = dw_Util.addElement('div', pr + start_cls, start_cls, atts);
	barEnd = dw_Util.addElement('div', pr + end_cls, end_cls, atts);
	if (bScrollbar) {
		track = dw_Util.addElement('div', pr + 'track', 'track');
		dragBar = dw_Util.addElement('div', pr + 'dragBar', 'dragBar');
		track.appendChild(dragBar);
	}
	f.appendChild(barStart);
	if (track) {
		f.appendChild(track);
	}
	f.appendChild(barEnd);
	scrollbar.appendChild(f);
	if (!eType) {
		eType = 'mouseover';
	}
	dw_scrollObj.setupMouseEvents(barStart, wnId, eType, start_deg);
	dw_scrollObj.setupMouseEvents(barEnd, wnId, eType, end_deg);
	if (bScrollbar) {
		this.setUpScrollbar(pr + 'dragBar', pr + 'track', axis);
	}
	dw_scrollObj.handleControlVis(id, wnId, axis);
	dw_Scrollbar_Co.addEvent(this, 'on_load', function() {
		dw_scrollObj.handleControlVis(id, wnId, axis);
	});
	dw_Scrollbar_Co.addEvent(this, 'on_update', function() {
		dw_scrollObj.handleControlVis(id, wnId, axis);
	});
};
dw_scrollObj.setupMouseEvents = function(el, wnId, eType, deg, speed) {
	var isTouchDevice = dw_Util.isTouchDevice();
	if (!isTouchDevice) {
		if (eType == 'mouseover') {
			dw_Event.add(el, 'mouseover', function(e) {
				dw_scrollObj.col[wnId].initScrollVals(deg, speed);
			});
			dw_Event.add(el, 'mouseout', function(e) {
				dw_scrollObj.col[wnId].ceaseScroll();
			});
			dw_Event.add(el, 'mousedown', function(e) {
				dw_scrollObj.col[wnId].speed *= 3;
			});
			dw_Event.add(el, 'mouseup', function(e) {
				dw_scrollObj.col[wnId].speed = dw_scrollObj.prototype.speed;
			});
		} else {
			dw_Event.add(el, 'mousedown', function(e) {
				dw_scrollObj.col[wnId].initScrollVals(deg, speed);
				e = dw_Event.DOMit(e);
				e.preventDefault();
			});
			dw_Event.add(el, 'dragstart', function(e) {
				e = dw_Event.DOMit(e);
				e.preventDefault();
			});
			dw_Event.add(el, 'mouseup', function(e) {
				dw_scrollObj.col[wnId].ceaseScroll();
			});
			dw_Event.add(el, 'mouseout', function(e) {
				dw_scrollObj.col[wnId].ceaseScroll();
			});
		}
	} else {
		dw_Event.add(el, 'mousedown', function(e) {
			var wndo = dw_scrollObj.col[wnId];
			if (!wndo.isScrolling) {
				wndo.initScrollVals(deg, speed);
				wndo.isScrolling = true;
			} else {
				wndo.ceaseScroll();
				wndo.isScrolling = false;
			}
		});
	}
	dw_Event.add(el, 'click', function(e) {
		if (e && e.preventDefault)
			e.preventDefault();
		return false;
	});
};
dw_scrollObj.handleControlVis = function(controlsId, wnId, axis) {
	var wndo = dw_scrollObj.col[wnId];
	var el = document.getElementById(controlsId);
	if ((axis == 'v' && wndo.maxY > 0) || (axis == 'h' && wndo.maxX > 0)) {
		el.style.visibility = 'visible';
	} else {
		el.style.visibility = 'hidden';
	}
};
dw_scrollObj.prototype.setUpLoadLinks = function(controlsId) {
	var el = document.getElementById(controlsId);
	if (!el) {
		return;
	}
	var wnId = this.id;
	var links = el.getElementsByTagName('a');
	var list, cls, clsStart, clsEnd, parts, lyrId;
	clsStart = 'load_' + wnId + '_';
	for ( var i = 0; links[i]; i++) {
		list = dw_Util.get_DelimitedClassList(links[i].className);
		lyrId = '';
		for ( var j = 0; cls = list[j]; j++) {
			if (cls.indexOf(clsStart) != -1) {
				clsEnd = cls.slice(clsStart.length);
				if (document.getElementById(clsEnd)) {
					lyrId = clsEnd;
					dw_Event.add(links[i], 'click', function(wnId, lyrId) {
						return function(e) {
							dw_scrollObj.col[wnId].load(lyrId);
							if (e && e.preventDefault)
								e.preventDefault();
							return false;
						}
					}(wnId, lyrId));
				}
			}
		}
	}
};

$(document).ready(function() {
	$('.text2 ul').jcarousel({
		scroll : 1
	});
	
	$('.top ul li:eq(3), .top ul li:last').addClass('w1');
	$('.top ul li:eq(4)').addClass('w2');
	$('.text2 ul li:nth-child(4n)').addClass('el4');

	$('.black_white').hover(function() {
		$(this).attr('src', $(this).attr('source'));
	}, function() {
		$(this).attr('src', $(this).attr('black'));
	});
	
	$('.callBackLink').click(function() {
		var x = $('body').height();
		$('#fade').height(x + 20);
		$('#container2').fadeIn('slow');
		$('#fade').fadeTo('slow', 0.5);
		return false;
	});
	
	$('.callBackLink2').click(function() {
		var x = $('body').height();
		$('#fade').height(x + 20);
		$('#container3').fadeIn('slow');
		$('#fade').fadeTo('slow', 0.5);
		return false;
	});
	
	
	$('.closer21').click(function() {
		$('#fade, #container2, #container3').fadeOut('slow');
	});

	
	
});

$(window).load(function() {
	$('.slider1 ul').roundabout({
		minScale : 0.7
	});
});

function init_dw_Scroll() {
	// arguments: id of scroll area div, id of content div
	var wndo = new dw_scrollObj('wn', 'lyr1');
	// args: id, axis ('v' or 'h'), eType (event type for arrows),
	// bScrollbar (include track and dragBar? true or false)
	wndo.buildScrollControls('scrollbar', 'h', 'mouseover', true);
}

// if code supported, link in the style sheet (optional) and call the init
// function onload
if (dw_scrollObj.isSupported()) {
	// dw_Util.writeStyleSheet('css/scrollbar_h.css');
	dw_Event.add(window, 'load', init_dw_Scroll);
}
$(document).ready(function() {

	$('#reviewsb').live('click', function() {

		var up = $(this).attr('update');
		var id = $(this).attr('row');
		Ext.Ajax.request({
			url : '/reviews',
			params : {
				id : id,
				ajax : true,
				up : up
			},
			success : function(o) {
				if (up) {
					$('div.' + up).html(o.responseText);

				} else {
					$('div.text3').html(o.responseText);

				}
			}
		});

		return false;
	});
	
	
	$('.refresh').live('click', function() {

		var up = $(this).attr('update');
		var id = $(this).attr('row');
		Ext.Ajax.request({
			url : '/advice',
			params : {
				id : id,
				ajax : true,
				up : up
			},
			success : function(o) {
				if (up) {
					$('div.' + up).html(o.responseText);

				} else {
					$('div.text4').html(o.responseText);

				}
			}
		});

		return false;
	});
	

	/* placeholder */
	// $('input[placeholder], textarea[placeholder]').placeholder();
	/* prettyCheckboxes */
	/*
	 * $('input[type=checkbox]').prettyCheckboxes({ display: 'list' });
	 */
	/* zebra */
	$('.price tr:odd').addClass('zebra');
	$('a[href$=pdf]').each(function() {
		$(this).remove();
	});

})


hs.showCredits = 0;
hs.padToMinWidth = true;

// hs.align = 'center';
if (hs.registerOverlay) {
	// The white controlbar overlay
	hs.registerOverlay({
		thumbnailId : 'thumb3',
		overlayId : 'controlbar',
		position : 'top right',
		hideOnMouseOut : true
	});
	// The simple semitransparent close button overlay
	hs
			.registerOverlay({
				thumbnailId : 'thumb2',
				html : '<div class="closebutton"	onclick="return hs.close(this)" title="Close"></div>',
				position : 'top right',
				fade : 2
			// fading the semi-transparent overlay looks bad in IE
			});
}
if (hs.addEventListener && hs.Outline)
	hs.addEventListener(window, 'load', function() {
		new hs.Outline('rounded-white');
		new hs.Outline('glossy-dark');
	});

// The gallery example on the front page
var galleryOptions = {
	slideshowGroup : 'gallery',
	wrapperClassName : 'dark',
	// outlineType: 'glossy-dark',
	dimmingOpacity : 0.8,
	align : 'center',
	transitions : [ 'expand', 'crossfade' ],
	fadeInOut : true,
	wrapperClassName : 'borderless floating-caption',
	marginLeft : 100,
	marginBottom : 80,
	numberPosition : 'caption'

};

var imagesOptions = {
		//thumbnailId: 'thumb2', 
		slideshowGroup: 'group2',
		useBox: true,
		width: 1016,
		height: 677
	};


hs.dimmingOpacity = 0.8;
if (hs.addSlideshow) {
	hs.addSlideshow({
		// slideshowGroup: 'group1',
		interval : 5000,
		repeat : false,
		useControls : true,
		fixedControls : 'fit',
		overlayOptions : {
			position : 'bottom center',
			opacity : .75,
			hideOnMouseOut : true
		},
		thumbstrip : {
			position : 'above',
			mode : 'horizontal',
			relativeTo : 'expander'
		}
	});

}

/*
 * Ext Core Library 3.0
 * http://extjs.com/
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * 
 * The MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */


window.undefined=window.undefined;Ext={version:'3.0'};Ext.apply=function(o,c,defaults){if(defaults){Ext.apply(o,defaults);}
if(o&&c&&typeof c=='object'){for(var p in c){o[p]=c[p];}}
return o;};(function(){var idSeed=0,toString=Object.prototype.toString,isIterable=function(v){if(Ext.isArray(v)||v.callee){return true;}
if(/NodeList|HTMLCollection/.test(toString.call(v))){return true;}
return((v.nextNode||v.item)&&Ext.isNumber(v.length));},ua=navigator.userAgent.toLowerCase(),check=function(r){return r.test(ua);},DOC=document,isStrict=DOC.compatMode=="CSS1Compat",isOpera=check(/opera/),isChrome=check(/chrome/),isWebKit=check(/webkit/),isSafari=!isChrome&&check(/safari/),isSafari2=isSafari&&check(/applewebkit\/4/),isSafari3=isSafari&&check(/version\/3/),isSafari4=isSafari&&check(/version\/4/),isIE=!isOpera&&check(/msie/),isIE7=isIE&&check(/msie 7/),isIE8=isIE&&check(/msie 8/),isIE6=isIE&&!isIE7&&!isIE8,isGecko=!isWebKit&&check(/gecko/),isGecko2=isGecko&&check(/rv:1\.8/),isGecko3=isGecko&&check(/rv:1\.9/),isBorderBox=isIE&&!isStrict,isWindows=check(/windows|win32/),isMac=check(/macintosh|mac os x/),isAir=check(/adobeair/),isLinux=check(/linux/),isSecure=/^https/i.test(window.location.protocol);if(isIE6){try{DOC.execCommand("BackgroundImageCache",false,true);}catch(e){}}
Ext.apply(Ext,{SSL_SECURE_URL:'javascript:false',isStrict:isStrict,isSecure:isSecure,isReady:false,enableGarbageCollector:true,enableListenerCollection:false,USE_NATIVE_JSON:false,applyIf:function(o,c){if(o){for(var p in c){if(Ext.isEmpty(o[p])){o[p]=c[p];}}}
return o;},id:function(el,prefix){return(el=Ext.getDom(el)||{}).id=el.id||(prefix||"ext-gen")+(++idSeed);},extend:function(){var io=function(o){for(var m in o){this[m]=o[m];}};var oc=Object.prototype.constructor;return function(sb,sp,overrides){if(Ext.isObject(sp)){overrides=sp;sp=sb;sb=overrides.constructor!=oc?overrides.constructor:function(){sp.apply(this,arguments);};}
var F=function(){},sbp,spp=sp.prototype;F.prototype=spp;sbp=sb.prototype=new F();sbp.constructor=sb;sb.superclass=spp;if(spp.constructor==oc){spp.constructor=sp;}
sb.override=function(o){Ext.override(sb,o);};sbp.superclass=sbp.supr=(function(){return spp;});sbp.override=io;Ext.override(sb,overrides);sb.extend=function(o){Ext.extend(sb,o);};return sb;};}(),override:function(origclass,overrides){if(overrides){var p=origclass.prototype;Ext.apply(p,overrides);if(Ext.isIE&&overrides.toString!=origclass.toString){p.toString=overrides.toString;}}},namespace:function(){var o,d;Ext.each(arguments,function(v){d=v.split(".");o=window[d[0]]=window[d[0]]||{};Ext.each(d.slice(1),function(v2){o=o[v2]=o[v2]||{};});});return o;},urlEncode:function(o,pre){var undef,buf=[],key,e=encodeURIComponent;for(key in o){undef=!Ext.isDefined(o[key]);Ext.each(undef?key:o[key],function(val,i){buf.push("&",e(key),"=",(val!=key||!undef)?e(val):"");});}
if(!pre){buf.shift();pre="";}
return pre+buf.join('');},urlDecode:function(string,overwrite){if(Ext.isEmpty(string)){return{};}
var obj={},pairs=string.split('&'),d=decodeURIComponent,name,value;Ext.each(pairs,function(pair){pair=pair.split('=');name=d(pair[0]);value=d(pair[1]);obj[name]=overwrite||!obj[name]?value:[].concat(obj[name]).concat(value);});return obj;},urlAppend:function(url,s){if(!Ext.isEmpty(s)){return url+(url.indexOf('?')===-1?'?':'&')+s;}
return url;},toArray:function(){return isIE?function(a,i,j,res){res=[];Ext.each(a,function(v){res.push(v);});return res.slice(i||0,j||res.length);}:function(a,i,j){return Array.prototype.slice.call(a,i||0,j||a.length);}}(),each:function(array,fn,scope){if(Ext.isEmpty(array,true)){return;}
if(!isIterable(array)||Ext.isPrimitive(array)){array=[array];}
for(var i=0,len=array.length;i<len;i++){if(fn.call(scope||array[i],array[i],i,array)===false){return i;};}},iterate:function(obj,fn,scope){if(isIterable(obj)){Ext.each(obj,fn,scope);return;}else if(Ext.isObject(obj)){for(var prop in obj){if(obj.hasOwnProperty(prop)){if(fn.call(scope||obj,prop,obj[prop])===false){return;};}}}},getDom:function(el){if(!el||!DOC){return null;}
return el.dom?el.dom:(Ext.isString(el)?DOC.getElementById(el):el);},getBody:function(){return Ext.get(DOC.body||DOC.documentElement);},removeNode:isIE?function(){var d;return function(n){if(n&&n.tagName!='BODY'){d=d||DOC.createElement('div');d.appendChild(n);d.innerHTML='';}}}():function(n){if(n&&n.parentNode&&n.tagName!='BODY'){n.parentNode.removeChild(n);}},isEmpty:function(v,allowBlank){return v===null||v===undefined||((Ext.isArray(v)&&!v.length))||(!allowBlank?v==='':false);},isArray:function(v){return toString.apply(v)==='[object Array]';},isObject:function(v){return v&&typeof v=="object";},isPrimitive:function(v){return Ext.isString(v)||Ext.isNumber(v)||Ext.isBoolean(v);},isFunction:function(v){return toString.apply(v)==='[object Function]';},isNumber:function(v){return typeof v==='number'&&isFinite(v);},isString:function(v){return typeof v==='string';},isBoolean:function(v){return typeof v==='boolean';},isDefined:function(v){return typeof v!=='undefined';},isOpera:isOpera,isWebKit:isWebKit,isChrome:isChrome,isSafari:isSafari,isSafari3:isSafari3,isSafari4:isSafari4,isSafari2:isSafari2,isIE:isIE,isIE6:isIE6,isIE7:isIE7,isIE8:isIE8,isGecko:isGecko,isGecko2:isGecko2,isGecko3:isGecko3,isBorderBox:isBorderBox,isLinux:isLinux,isWindows:isWindows,isMac:isMac,isAir:isAir});Ext.ns=Ext.namespace;})();Ext.ns("Ext","Ext.util","Ext.lib","Ext.data");Ext.apply(Function.prototype,{createInterceptor:function(fcn,scope){var method=this;return!Ext.isFunction(fcn)?this:function(){var me=this,args=arguments;fcn.target=me;fcn.method=method;return(fcn.apply(scope||me||window,args)!==false)?method.apply(me||window,args):null;};},createCallback:function(){var args=arguments,method=this;return function(){return method.apply(window,args);};},createDelegate:function(obj,args,appendArgs){var method=this;return function(){var callArgs=args||arguments;if(appendArgs===true){callArgs=Array.prototype.slice.call(arguments,0);callArgs=callArgs.concat(args);}else if(Ext.isNumber(appendArgs)){callArgs=Array.prototype.slice.call(arguments,0);var applyArgs=[appendArgs,0].concat(args);Array.prototype.splice.apply(callArgs,applyArgs);}
return method.apply(obj||window,callArgs);};},defer:function(millis,obj,args,appendArgs){var fn=this.createDelegate(obj,args,appendArgs);if(millis>0){return setTimeout(fn,millis);}
fn();return 0;}});Ext.applyIf(String,{format:function(format){var args=Ext.toArray(arguments,1);return format.replace(/\{(\d+)\}/g,function(m,i){return args[i];});}});Ext.applyIf(Array.prototype,{indexOf:function(o){for(var i=0,len=this.length;i<len;i++){if(this[i]==o){return i;}}
return-1;},remove:function(o){var index=this.indexOf(o);if(index!=-1){this.splice(index,1);}
return this;}});

Ext.util.TaskRunner=function(interval){interval=interval||10;var tasks=[],removeQueue=[],id=0,running=false,stopThread=function(){running=false;clearInterval(id);id=0;},startThread=function(){if(!running){running=true;id=setInterval(runTasks,interval);}},removeTask=function(t){removeQueue.push(t);if(t.onStop){t.onStop.apply(t.scope||t);}},runTasks=function(){var rqLen=removeQueue.length,now=new Date().getTime();if(rqLen>0){for(var i=0;i<rqLen;i++){tasks.remove(removeQueue[i]);}
removeQueue=[];if(tasks.length<1){stopThread();return;}}
for(var i=0,t,itime,rt,len=tasks.length;i<len;++i){t=tasks[i];itime=now-t.taskRunTime;if(t.interval<=itime){rt=t.run.apply(t.scope||t,t.args||[++t.taskRunCount]);t.taskRunTime=now;if(rt===false||t.taskRunCount===t.repeat){removeTask(t);return;}}
if(t.duration&&t.duration<=(now-t.taskStartTime)){removeTask(t);}}};this.start=function(task){tasks.push(task);task.taskStartTime=new Date().getTime();task.taskRunTime=0;task.taskRunCount=0;startThread();return task;};this.stop=function(task){removeTask(task);return task;};this.stopAll=function(){stopThread();for(var i=0,len=tasks.length;i<len;i++){if(tasks[i].onStop){tasks[i].onStop();}}
tasks=[];removeQueue=[];};};Ext.TaskMgr=new Ext.util.TaskRunner();

(function(){var libFlyweight;function fly(el){if(!libFlyweight){libFlyweight=new Ext.Element.Flyweight();}
libFlyweight.dom=el;return libFlyweight;}

(function(){var doc=document,isCSS1=doc.compatMode=="CSS1Compat",MAX=Math.max,PARSEINT=parseInt;Ext.lib.Dom={isAncestor:function(p,c){var ret=false;p=Ext.getDom(p);c=Ext.getDom(c);if(p&&c){if(p.contains){return p.contains(c);}else if(p.compareDocumentPosition){return!!(p.compareDocumentPosition(c)&16);}else{while(c=c.parentNode){ret=c==p||ret;}}}
return ret;},getViewWidth:function(full){return full?this.getDocumentWidth():this.getViewportWidth();},getViewHeight:function(full){return full?this.getDocumentHeight():this.getViewportHeight();},getDocumentHeight:function(){return MAX(!isCSS1?doc.body.scrollHeight:doc.documentElement.scrollHeight,this.getViewportHeight());},getDocumentWidth:function(){return MAX(!isCSS1?doc.body.scrollWidth:doc.documentElement.scrollWidth,this.getViewportWidth());},getViewportHeight:function(){return Ext.isIE?(Ext.isStrict?doc.documentElement.clientHeight:doc.body.clientHeight):self.innerHeight;},getViewportWidth:function(){return!Ext.isStrict&&!Ext.isOpera?doc.body.clientWidth:Ext.isIE?doc.documentElement.clientWidth:self.innerWidth;},getY:function(el){return this.getXY(el)[1];},getX:function(el){return this.getXY(el)[0];},getXY:function(el){var p,pe,b,bt,bl,dbd,x=0,y=0,scroll,hasAbsolute,bd=(doc.body||doc.documentElement),ret=[0,0];el=Ext.getDom(el);if(el!=bd){if(el.getBoundingClientRect){b=el.getBoundingClientRect();scroll=fly(document).getScroll();ret=[b.left+scroll.left,b.top+scroll.top];}else{p=el;hasAbsolute=fly(el).isStyle("position","absolute");while(p){pe=fly(p);x+=p.offsetLeft;y+=p.offsetTop;hasAbsolute=hasAbsolute||pe.isStyle("position","absolute");if(Ext.isGecko){y+=bt=PARSEINT(pe.getStyle("borderTopWidth"),10)||0;x+=bl=PARSEINT(pe.getStyle("borderLeftWidth"),10)||0;if(p!=el&&!pe.isStyle('overflow','visible')){x+=bl;y+=bt;}}
p=p.offsetParent;}
if(Ext.isSafari&&hasAbsolute){x-=bd.offsetLeft;y-=bd.offsetTop;}
if(Ext.isGecko&&!hasAbsolute){dbd=fly(bd);x+=PARSEINT(dbd.getStyle("borderLeftWidth"),10)||0;y+=PARSEINT(dbd.getStyle("borderTopWidth"),10)||0;}
p=el.parentNode;while(p&&p!=bd){if(!Ext.isOpera||(p.tagName!='TR'&&!fly(p).isStyle("display","inline"))){x-=p.scrollLeft;y-=p.scrollTop;}
p=p.parentNode;}
ret=[x,y];}}
return ret},setXY:function(el,xy){(el=Ext.fly(el,'_setXY')).position();var pts=el.translatePoints(xy),style=el.dom.style,pos;for(pos in pts){if(!isNaN(pts[pos]))style[pos]=pts[pos]+"px"}},setX:function(el,x){this.setXY(el,[x,false]);},setY:function(el,y){this.setXY(el,[false,y]);}};})();

Ext.lib.Event=function(){var loadComplete=false,listeners=[],unloadListeners=[],retryCount=0,onAvailStack=[],_interval,locked=false,win=window,doc=document,POLL_RETRYS=200,POLL_INTERVAL=20,EL=0,TYPE=1,FN=2,WFN=3,OBJ=3,ADJ_SCOPE=4,SCROLLLEFT='scrollLeft',SCROLLTOP='scrollTop',UNLOAD='unload',MOUSEOVER='mouseover',MOUSEOUT='mouseout',doAdd=function(){var ret;if(win.addEventListener){ret=function(el,eventName,fn,capture){if(eventName=='mouseenter'){fn=fn.createInterceptor(checkRelatedTarget);el.addEventListener(MOUSEOVER,fn,(capture));}else if(eventName=='mouseleave'){fn=fn.createInterceptor(checkRelatedTarget);el.addEventListener(MOUSEOUT,fn,(capture));}else{el.addEventListener(eventName,fn,(capture));}
return fn;};}else if(win.attachEvent){ret=function(el,eventName,fn,capture){el.attachEvent("on"+eventName,fn);return fn;};}else{ret=function(){};}
return ret;}(),doRemove=function(){var ret;if(win.removeEventListener){ret=function(el,eventName,fn,capture){if(eventName=='mouseenter'){eventName=MOUSEOVER;}else if(eventName=='mouseleave'){eventName=MOUSEOUT;}
el.removeEventListener(eventName,fn,(capture));};}else if(win.detachEvent){ret=function(el,eventName,fn){el.detachEvent("on"+eventName,fn);};}else{ret=function(){};}
return ret;}();var isXUL=Ext.isGecko?function(node){return Object.prototype.toString.call(node)=='[object XULElement]';}:function(){};var isTextNode=Ext.isGecko?function(node){try{return node.nodeType==3;}catch(e){return false;}}:function(node){return node.nodeType==3;};function checkRelatedTarget(e){var related=pub.getRelatedTarget(e);return!(isXUL(related)||elContains(e.currentTarget,related));}
function elContains(parent,child){if(parent&&parent.firstChild){while(child){if(child===parent){return true;}
try{child=child.parentNode;}catch(e){return false;}
if(child&&(child.nodeType!=1)){child=null;}}}
return false;}
function _getCacheIndex(el,eventName,fn){var index=-1;Ext.each(listeners,function(v,i){if(v&&v[FN]==fn&&v[EL]==el&&v[TYPE]==eventName){index=i;}});return index;}
function _tryPreloadAttach(){var ret=false,notAvail=[],element,tryAgain=!loadComplete||(retryCount>0);if(!locked){locked=true;Ext.each(onAvailStack,function(v,i,a){if(v&&(element=doc.getElementById(v.id))){if(!v.checkReady||loadComplete||element.nextSibling||(doc&&doc.body)){element=v.override?(v.override===true?v.obj:v.override):element;v.fn.call(element,v.obj);onAvailStack[i]=null;}else{notAvail.push(v);}}});retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){startInterval();}else{clearInterval(_interval);_interval=null;}
ret=!(locked=false);}
return ret;}
function startInterval(){if(!_interval){var callback=function(){_tryPreloadAttach();};_interval=setInterval(callback,POLL_INTERVAL);}}
function getScroll(){var dd=doc.documentElement,db=doc.body;if(dd&&(dd[SCROLLTOP]||dd[SCROLLLEFT])){return[dd[SCROLLLEFT],dd[SCROLLTOP]];}else if(db){return[db[SCROLLLEFT],db[SCROLLTOP]];}else{return[0,0];}}
function getPageCoord(ev,xy){ev=ev.browserEvent||ev;var coord=ev['page'+xy];if(!coord&&coord!==0){coord=ev['client'+xy]||0;if(Ext.isIE){coord+=getScroll()[xy=="X"?0:1];}}
return coord;}
var pub={onAvailable:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=POLL_RETRYS;startInterval();},addListener:function(el,eventName,fn){var ret;el=Ext.getDom(el);if(el&&fn){if(UNLOAD==eventName){ret=!!(unloadListeners[unloadListeners.length]=[el,eventName,fn]);}else{listeners.push([el,eventName,fn,ret=doAdd(el,eventName,fn,false)]);}}
return!!ret;},removeListener:function(el,eventName,fn){var ret=false,index,cacheItem;el=Ext.getDom(el);if(!fn){ret=this.purgeElement(el,false,eventName);}else if(UNLOAD==eventName){Ext.each(unloadListeners,function(v,i,a){if(v&&v[0]==el&&v[1]==eventName&&v[2]==fn){unloadListeners.splice(i,1);ret=true;}});}else{index=arguments[3]||_getCacheIndex(el,eventName,fn);cacheItem=listeners[index];if(el&&cacheItem){doRemove(el,eventName,cacheItem[WFN],false);cacheItem[WFN]=cacheItem[FN]=null;listeners.splice(index,1);ret=true;}}
return ret;},getTarget:function(ev){ev=ev.browserEvent||ev;return this.resolveTextNode(ev.target||ev.srcElement);},resolveTextNode:function(node){return node&&!isXUL(node)&&isTextNode(node)?node.parentNode:node;},getRelatedTarget:function(ev){ev=ev.browserEvent||ev;return this.resolveTextNode(ev.relatedTarget||(ev.type==MOUSEOUT?ev.toElement:ev.type==MOUSEOVER?ev.fromElement:null));},getPageX:function(ev){return getPageCoord(ev,"X");},getPageY:function(ev){return getPageCoord(ev,"Y");},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){ev=ev.browserEvent||ev;if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){ev=ev.browserEvent||ev;if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){e=e||win.event;if(!e){var c=this.getEvent.caller;while(c){e=c.arguments[0];if(e&&Event==e.constructor){break;}
c=c.caller;}}
return e;},getCharCode:function(ev){ev=ev.browserEvent||ev;return ev.charCode||ev.keyCode||0;},_load:function(e){loadComplete=true;var EU=Ext.lib.Event;if(Ext.isIE&&e!==true){doRemove(win,"load",arguments.callee);}},purgeElement:function(el,recurse,eventName){var me=this;Ext.each(me.getListeners(el,eventName),function(v){if(v){me.removeListener(el,v.type,v.fn);}});if(recurse&&el&&el.childNodes){Ext.each(el.childNodes,function(v){me.purgeElement(v,recurse,eventName);});}},getListeners:function(el,eventName){var me=this,results=[],searchLists;if(eventName){searchLists=eventName==UNLOAD?unloadListeners:listeners;}else{searchLists=listeners.concat(unloadListeners);}
Ext.each(searchLists,function(v,i){if(v&&v[EL]==el&&(!eventName||eventName==v[TYPE])){results.push({type:v[TYPE],fn:v[FN],obj:v[OBJ],adjust:v[ADJ_SCOPE],index:i});}});return results.length?results:null;},_unload:function(e){var EU=Ext.lib.Event,i,j,l,len,index,scope;Ext.each(unloadListeners,function(v){if(v){try{scope=v[ADJ_SCOPE]?(v[ADJ_SCOPE]===true?v[OBJ]:v[ADJ_SCOPE]):win;v[FN].call(scope,EU.getEvent(e),v[OBJ]);}catch(ex){}}});unloadListeners=null;if(listeners&&(j=listeners.length)){while(j){if((l=listeners[index=--j])){EU.removeListener(l[EL],l[TYPE],l[FN],index);}}}
doRemove(win,UNLOAD,EU._unload);}};pub.on=pub.addListener;pub.un=pub.removeListener;if(doc&&doc.body){pub._load(true);}else{doAdd(win,"load",pub._load);}
doAdd(win,UNLOAD,pub._unload);_tryPreloadAttach();return pub;}();

Ext.lib.Ajax=function(){var activeX=['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],CONTENTTYPE='Content-Type';function setHeader(o){var conn=o.conn,prop;function setTheHeaders(conn,headers){for(prop in headers){if(headers.hasOwnProperty(prop)){conn.setRequestHeader(prop,headers[prop]);}}}
if(pub.defaultHeaders){setTheHeaders(conn,pub.defaultHeaders);}
if(pub.headers){setTheHeaders(conn,pub.headers);pub.headers=null;}}
function createExceptionObject(tId,callbackArg,isAbort,isTimeout){return{tId:tId,status:isAbort?-1:0,statusText:isAbort?'transaction aborted':'communication failure',isAbort:true,isTimeout:true,argument:callbackArg};}
function initHeader(label,value){(pub.headers=pub.headers||{})[label]=value;}
function createResponseObject(o,callbackArg){var headerObj={},headerStr,conn=o.conn,t,s;try{headerStr=o.conn.getAllResponseHeaders();Ext.each(headerStr.replace(/\r\n/g,'\n').split('\n'),function(v){t=v.indexOf(':');if(t>=0){s=v.substr(0,t).toLowerCase();if(v.charAt(t+1)==' '){++t;}
headerObj[s]=v.substr(t+1);}});}catch(e){}
return{tId:o.tId,status:conn.status,statusText:conn.statusText,getResponseHeader:function(header){return headerObj[header.toLowerCase()];},getAllResponseHeaders:function(){return headerStr},responseText:conn.responseText,responseXML:conn.responseXML,argument:callbackArg};}
function releaseObject(o){o.conn=null;o=null;}
function handleTransactionResponse(o,callback,isAbort,isTimeout){if(!callback){releaseObject(o);return;}
var httpStatus,responseObject;try{if(o.conn.status!==undefined&&o.conn.status!=0){httpStatus=o.conn.status;}
else{httpStatus=13030;}}
catch(e){httpStatus=13030;}
if((httpStatus>=200&&httpStatus<300)||(Ext.isIE&&httpStatus==1223)){responseObject=createResponseObject(o,callback.argument);if(callback.success){if(!callback.scope){callback.success(responseObject);}
else{callback.success.apply(callback.scope,[responseObject]);}}}
else{switch(httpStatus){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:responseObject=createExceptionObject(o.tId,callback.argument,(isAbort?isAbort:false),isTimeout);if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}
break;default:responseObject=createResponseObject(o,callback.argument);if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}}}
releaseObject(o);responseObject=null;}
function handleReadyState(o,callback){callback=callback||{};var conn=o.conn,tId=o.tId,poll=pub.poll,cbTimeout=callback.timeout||null;if(cbTimeout){pub.timeout[tId]=setTimeout(function(){pub.abort(o,callback,true);},cbTimeout);}
poll[tId]=setInterval(function(){if(conn&&conn.readyState==4){clearInterval(poll[tId]);poll[tId]=null;if(cbTimeout){clearTimeout(pub.timeout[tId]);pub.timeout[tId]=null;}
handleTransactionResponse(o,callback);}},pub.pollInterval);}
function asyncRequest(method,uri,callback,postData){var o=getConnectionObject()||null;if(o){o.conn.open(method,uri,true);if(pub.useDefaultXhrHeader){initHeader('X-Requested-With',pub.defaultXhrHeader);}
if(postData&&pub.useDefaultHeader&&(!pub.headers||!pub.headers[CONTENTTYPE])){initHeader(CONTENTTYPE,pub.defaultPostHeader);}
if(pub.defaultHeaders||pub.headers){setHeader(o);}
handleReadyState(o,callback);o.conn.send(postData||null);}
return o;}
function getConnectionObject(){var o;try{if(o=createXhrObject(pub.transactionId)){pub.transactionId++;}}catch(e){}finally{return o;}}
function createXhrObject(transactionId){var http;try{http=new XMLHttpRequest();}catch(e){for(var i=0;i<activeX.length;++i){try{http=new ActiveXObject(activeX[i]);break;}catch(e){}}}finally{return{conn:http,tId:transactionId};}}
var pub={request:function(method,uri,cb,data,options){if(options){var me=this,xmlData=options.xmlData,jsonData=options.jsonData,hs;Ext.applyIf(me,options);if(xmlData||jsonData){hs=me.headers;if(!hs||!hs[CONTENTTYPE]){initHeader(CONTENTTYPE,xmlData?'text/xml':'application/json');}
data=xmlData||(Ext.isObject(jsonData)?Ext.encode(jsonData):jsonData);}}
return asyncRequest(method||options.method||"POST",uri,cb,data);},serializeForm:function(form){var fElements=form.elements||(document.forms[form]||Ext.getDom(form)).elements,hasSubmit=false,encoder=encodeURIComponent,element,options,name,val,data='',type;Ext.each(fElements,function(element){name=element.name;type=element.type;if(!element.disabled&&name){if(/select-(one|multiple)/i.test(type)){Ext.each(element.options,function(opt){if(opt.selected){data+=String.format("{0}={1}&",encoder(name),(opt.hasAttribute?opt.hasAttribute('value'):opt.getAttributeNode('value').specified)?opt.value:opt.text);}});}else if(!/file|undefined|reset|button/i.test(type)){if(!(/radio|checkbox/i.test(type)&&!element.checked)&&!(type=='submit'&&hasSubmit)){data+=encoder(name)+'='+encoder(element.value)+'&';hasSubmit=/submit/i.test(type);}}}});return data.substr(0,data.length-1);},useDefaultHeader:true,defaultPostHeader:'application/x-www-form-urlencoded; charset=UTF-8',useDefaultXhrHeader:true,defaultXhrHeader:'XMLHttpRequest',poll:{},timeout:{},pollInterval:50,transactionId:0,abort:function(o,callback,isTimeout){var me=this,tId=o.tId,isAbort=false;if(me.isCallInProgress(o)){o.conn.abort();clearInterval(me.poll[tId]);me.poll[tId]=null;if(isTimeout){me.timeout[tId]=null;}
handleTransactionResponse(o,callback,(isAbort=true),isTimeout);}
return isAbort;},isCallInProgress:function(o){return o.conn&&!{0:true,4:true}[o.conn.readyState];}};return pub;}();

(function(){var EXTLIB=Ext.lib,noNegatives=/width|height|opacity|padding/i,offsetAttribute=/^((width|height)|(top|left))$/,defaultUnit=/width|height|top$|bottom$|left$|right$/i,offsetUnit=/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i,isset=function(v){return typeof v!=='undefined';},now=function(){return new Date();};EXTLIB.Anim={motion:function(el,args,duration,easing,cb,scope){return this.run(el,args,duration,easing,cb,scope,Ext.lib.Motion);},run:function(el,args,duration,easing,cb,scope,type){type=type||Ext.lib.AnimBase;if(typeof easing=="string"){easing=Ext.lib.Easing[easing];}
var anim=new type(el,args,duration,easing);anim.animateX(function(){if(Ext.isFunction(cb)){cb.call(scope);}});return anim;}};EXTLIB.AnimBase=function(el,attributes,duration,method){if(el){this.init(el,attributes,duration,method);}};EXTLIB.AnimBase.prototype={doMethod:function(attr,start,end){var me=this;return me.method(me.curFrame,start,end-start,me.totalFrames);},setAttr:function(attr,val,unit){if(noNegatives.test(attr)&&val<0){val=0;}
Ext.fly(this.el,'_anim').setStyle(attr,val+unit);},getAttr:function(attr){var el=Ext.fly(this.el),val=el.getStyle(attr),a=offsetAttribute.exec(attr)||[]
if(val!=='auto'&&!offsetUnit.test(val)){return parseFloat(val);}
return(!!(a[2])||(el.getStyle('position')=='absolute'&&!!(a[3])))?el.dom['offset'+a[0].charAt(0).toUpperCase()+a[0].substr(1)]:0;},getDefaultUnit:function(attr){return defaultUnit.test(attr)?'px':'';},animateX:function(callback,scope){var me=this,f=function(){me.onComplete.removeListener(f);if(Ext.isFunction(callback)){callback.call(scope||me,me);}};me.onComplete.addListener(f,me);me.animate();},setRunAttr:function(attr){var me=this,a=this.attributes[attr],to=a.to,by=a.by,from=a.from,unit=a.unit,ra=(this.runAttrs[attr]={}),end;if(!isset(to)&&!isset(by)){return false;}
var start=isset(from)?from:me.getAttr(attr);if(isset(to)){end=to;}else if(isset(by)){if(Ext.isArray(start)){end=[];Ext.each(start,function(v,i){end[i]=v+by[i];});}else{end=start+by;}}
Ext.apply(ra,{start:start,end:end,unit:isset(unit)?unit:me.getDefaultUnit(attr)});},init:function(el,attributes,duration,method){var me=this,actualFrames=0,mgr=EXTLIB.AnimMgr;Ext.apply(me,{isAnimated:false,startTime:null,el:Ext.getDom(el),attributes:attributes||{},duration:duration||1,method:method||EXTLIB.Easing.easeNone,useSec:true,curFrame:0,totalFrames:mgr.fps,runAttrs:{},animate:function(){var me=this,d=me.duration;if(me.isAnimated){return false;}
me.curFrame=0;me.totalFrames=me.useSec?Math.ceil(mgr.fps*d):d;mgr.registerElement(me);},stop:function(finish){var me=this;if(finish){me.curFrame=me.totalFrames;me._onTween.fire();}
mgr.stop(me);}});var onStart=function(){var me=this,attr;me.onStart.fire();me.runAttrs={};for(attr in this.attributes){this.setRunAttr(attr);}
me.isAnimated=true;me.startTime=now();actualFrames=0;};var onTween=function(){var me=this;me.onTween.fire({duration:now()-me.startTime,curFrame:me.curFrame});var ra=me.runAttrs;for(var attr in ra){this.setAttr(attr,me.doMethod(attr,ra[attr].start,ra[attr].end),ra[attr].unit);}
++actualFrames;};var onComplete=function(){var me=this,actual=(now()-me.startTime)/1000,data={duration:actual,frames:actualFrames,fps:actualFrames/actual};me.isAnimated=false;actualFrames=0;me.onComplete.fire(data);};me.onStart=new Ext.util.Event(me);me.onTween=new Ext.util.Event(me);me.onComplete=new Ext.util.Event(me);(me._onStart=new Ext.util.Event(me)).addListener(onStart);(me._onTween=new Ext.util.Event(me)).addListener(onTween);(me._onComplete=new Ext.util.Event(me)).addListener(onComplete);}};Ext.lib.AnimMgr=new function(){var me=this,thread=null,queue=[],tweenCount=0;Ext.apply(me,{fps:1000,delay:1,registerElement:function(tween){queue.push(tween);++tweenCount;tween._onStart.fire();me.start();},unRegister:function(tween,index){tween._onComplete.fire();index=index||getIndex(tween);if(index!=-1){queue.splice(index,1);}
if(--tweenCount<=0){me.stop();}},start:function(){if(thread===null){thread=setInterval(me.run,me.delay);}},stop:function(tween){if(!tween){clearInterval(thread);for(var i=0,len=queue.length;i<len;++i){if(queue[0].isAnimated){me.unRegister(queue[0],0);}}
queue=[];thread=null;tweenCount=0;}else{me.unRegister(tween);}},run:function(){var tf;Ext.each(queue,function(tween){if(tween&&tween.isAnimated){tf=tween.totalFrames;if(tween.curFrame<tf||tf===null){++tween.curFrame;if(tween.useSec){correctFrame(tween);}
tween._onTween.fire();}else{me.stop(tween);}}},me);}});var getIndex=function(anim){var out=-1;Ext.each(queue,function(item,idx){if(item==anim){out=idx;return false;}});return out;};var correctFrame=function(tween){var frames=tween.totalFrames,frame=tween.curFrame,duration=tween.duration,expected=(frame*duration*1000/frames),elapsed=(now()-tween.startTime),tweak=0;if(elapsed<duration*1000){tweak=Math.round((elapsed/expected-1)*frame);}else{tweak=frames-(frame+1);}
if(tweak>0&&isFinite(tweak)){if(tween.curFrame+tweak>=frames){tweak=frames-(frame+1);}
tween.curFrame+=tweak;}};};EXTLIB.Bezier=new function(){this.getPosition=function(points,t){var n=points.length,tmp=[],c=1-t,i,j;for(i=0;i<n;++i){tmp[i]=[points[i][0],points[i][1]];}
for(j=1;j<n;++j){for(i=0;i<n-j;++i){tmp[i][0]=c*tmp[i][0]+t*tmp[parseInt(i+1,10)][0];tmp[i][1]=c*tmp[i][1]+t*tmp[parseInt(i+1,10)][1];}}
return[tmp[0][0],tmp[0][1]];};};EXTLIB.Easing={easeNone:function(t,b,c,d){return c*t/d+b;},easeIn:function(t,b,c,d){return c*(t/=d)*t+b;},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b;}};(function(){EXTLIB.Motion=function(el,attributes,duration,method){if(el){EXTLIB.Motion.superclass.constructor.call(this,el,attributes,duration,method);}};Ext.extend(EXTLIB.Motion,Ext.lib.AnimBase);var superclass=EXTLIB.Motion.superclass,proto=EXTLIB.Motion.prototype,pointsRe=/^points$/i;Ext.apply(EXTLIB.Motion.prototype,{setAttr:function(attr,val,unit){var me=this,setAttr=superclass.setAttr;if(pointsRe.test(attr)){unit=unit||'px';setAttr.call(me,'left',val[0],unit);setAttr.call(me,'top',val[1],unit);}else{setAttr.call(me,attr,val,unit);}},getAttr:function(attr){var me=this,getAttr=superclass.getAttr;return pointsRe.test(attr)?[getAttr.call(me,'left'),getAttr.call(me,'top')]:getAttr.call(me,attr);},doMethod:function(attr,start,end){var me=this;return pointsRe.test(attr)?EXTLIB.Bezier.getPosition(me.runAttrs[attr],me.method(me.curFrame,0,100,me.totalFrames)/100):superclass.doMethod.call(me,attr,start,end);},setRunAttr:function(attr){if(pointsRe.test(attr)){var me=this,el=this.el,points=this.attributes.points,control=points.control||[],from=points.from,to=points.to,by=points.by,DOM=EXTLIB.Dom,start,i,end,len,ra;if(control.length>0&&!Ext.isArray(control[0])){control=[control];}else{}
Ext.fly(el,'_anim').position();DOM.setXY(el,isset(from)?from:DOM.getXY(el));start=me.getAttr('points');if(isset(to)){end=translateValues.call(me,to,start);for(i=0,len=control.length;i<len;++i){control[i]=translateValues.call(me,control[i],start);}}else if(isset(by)){end=[start[0]+by[0],start[1]+by[1]];for(i=0,len=control.length;i<len;++i){control[i]=[start[0]+control[i][0],start[1]+control[i][1]];}}
ra=this.runAttrs[attr]=[start];if(control.length>0){ra=ra.concat(control);}
ra[ra.length]=end;}else{superclass.setRunAttr.call(this,attr);}}});var translateValues=function(val,start){var pageXY=EXTLIB.Dom.getXY(this.el);return[val[0]-pageXY[0]+start[0],val[1]-pageXY[1]+start[1]];};})();})();

(function(){var abs=Math.abs,pi=Math.PI,asin=Math.asin,pow=Math.pow,sin=Math.sin,EXTLIB=Ext.lib;Ext.apply(EXTLIB.Easing,{easeBoth:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b;},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeBothStrong:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b;},elasticIn:function(t,b,c,d,a,p){if(t==0||(t/=d)==1){return t==0?b:b+c;}
p=p||(d*.3);var s;if(a>=abs(c)){s=p/(2*pi)*asin(c/a);}else{a=c;s=p/4;}
return-(a*pow(2,10*(t-=1))*sin((t*d-s)*(2*pi)/p))+b;},elasticOut:function(t,b,c,d,a,p){if(t==0||(t/=d)==1){return t==0?b:b+c;}
p=p||(d*.3);var s;if(a>=abs(c)){s=p/(2*pi)*asin(c/a);}else{a=c;s=p/4;}
return a*pow(2,-10*t)*sin((t*d-s)*(2*pi)/p)+c+b;},elasticBoth:function(t,b,c,d,a,p){if(t==0||(t/=d/2)==2){return t==0?b:b+c;}
p=p||(d*(.3*1.5));var s;if(a>=abs(c)){s=p/(2*pi)*asin(c/a);}else{a=c;s=p/4;}
return t<1?-.5*(a*pow(2,10*(t-=1))*sin((t*d-s)*(2*pi)/p))+b:a*pow(2,-10*(t-=1))*sin((t*d-s)*(2*pi)/p)*.5+c+b;},backIn:function(t,b,c,d,s){s=s||1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},backOut:function(t,b,c,d,s){if(!s){s=1.70158;}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},backBoth:function(t,b,c,d,s){s=s||1.70158;return((t/=d/2)<1)?c/2*(t*t*(((s*=(1.525))+1)*t-s))+b:c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},bounceIn:function(t,b,c,d){return c-EXTLIB.Easing.bounceOut(d-t,0,c,d)+b;},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}
return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},bounceBoth:function(t,b,c,d){return(t<d/2)?EXTLIB.Easing.bounceIn(t*2,0,c,d)*.5+b:EXTLIB.Easing.bounceOut(t*2-d,0,c,d)*.5+c*.5+b;}});})();(function(){var EXTLIB=Ext.lib;EXTLIB.Anim.color=function(el,args,duration,easing,cb,scope){return EXTLIB.Anim.run(el,args,duration,easing,cb,scope,EXTLIB.ColorAnim);}
EXTLIB.ColorAnim=function(el,attributes,duration,method){EXTLIB.ColorAnim.superclass.constructor.call(this,el,attributes,duration,method);};Ext.extend(EXTLIB.ColorAnim,EXTLIB.AnimBase);var superclass=EXTLIB.ColorAnim.superclass,colorRE=/color$/i,transparentRE=/^transparent|rgba\(0, 0, 0, 0\)$/,rgbRE=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,hexRE=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,hex3RE=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,isset=function(v){return typeof v!=='undefined';}
function parseColor(s){var pi=parseInt,base,out=null,c;if(s.length==3){return s;}
Ext.each([hexRE,rgbRE,hex3RE],function(re,idx){base=(idx%2==0)?16:10;c=re.exec(s);if(c&&c.length==4){out=[pi(c[1],base),pi(c[2],base),pi(c[3],base)];return false;}});return out;}
Ext.apply(EXTLIB.ColorAnim.prototype,{getAttr:function(attr){var me=this,el=me.el,val;if(colorRE.test(attr)){while(el&&transparentRE.test(val=Ext.fly(el).getStyle(attr))){el=el.parentNode;val="fff";}}else{val=superclass.getAttr.call(me,attr);}
return val;},doMethod:function(attr,start,end){var me=this,val,floor=Math.floor;if(colorRE.test(attr)){val=[];Ext.each(start,function(v,i){val[i]=superclass.doMethod.call(me,attr,v,end[i]);});val='rgb('+floor(val[0])+','+floor(val[1])+','+floor(val[2])+')';}else{val=superclass.doMethod.call(me,attr,start,end);}
return val;},setRunAttr:function(attr){var me=this,a=me.attributes[attr],to=a.to,by=a.by,ra;superclass.setRunAttr.call(me,attr);ra=me.runAttrs[attr];if(colorRE.test(attr)){var start=parseColor(ra.start),end=parseColor(ra.end);if(!isset(to)&&isset(by)){end=parseColor(by);Ext.each(start,function(item,i){end[i]=item+end[i];});}
ra.start=start;ra.end=end;}}});})();(function(){var EXTLIB=Ext.lib;EXTLIB.Anim.scroll=function(el,args,duration,easing,cb,scope){return EXTLIB.Anim.run(el,args,duration,easing,cb,scope,EXTLIB.Scroll);}
EXTLIB.Scroll=function(el,attributes,duration,method){if(el){EXTLIB.Scroll.superclass.constructor.call(this,el,attributes,duration,method);}};Ext.extend(EXTLIB.Scroll,EXTLIB.ColorAnim);var superclass=EXTLIB.Scroll.superclass,SCROLL='scroll';Ext.apply(EXTLIB.Scroll.prototype,{doMethod:function(attr,start,end){var val,me=this,curFrame=me.curFrame,totalFrames=me.totalFrames;if(attr==SCROLL){val=[me.method(curFrame,start[0],end[0]-start[0],totalFrames),me.method(curFrame,start[1],end[1]-start[1],totalFrames)];}else{val=superclass.doMethod.call(me,attr,start,end);}
return val;},getAttr:function(attr){var me=this;if(attr==SCROLL){return[me.el.scrollLeft,me.el.scrollTop];}else{return superclass.getAttr.call(me,attr);}},setAttr:function(attr,val,unit){var me=this;if(attr==SCROLL){me.el.scrollLeft=val[0];me.el.scrollTop=val[1];}else{superclass.setAttr.call(me,attr,val,unit);}}});})();

if(Ext.isIE){function fnCleanUp(){var p=Function.prototype;delete p.createSequence;delete p.defer;delete p.createDelegate;delete p.createCallback;delete p.createInterceptor;window.detachEvent("onunload",fnCleanUp);}
window.attachEvent("onunload",fnCleanUp);}})();

(function(){var EXTUTIL=Ext.util,TOARRAY=Ext.toArray,EACH=Ext.each,ISOBJECT=Ext.isObject,TRUE=true,FALSE=false;EXTUTIL.Observable=function(){var me=this,e=me.events;if(me.listeners){me.on(me.listeners);delete me.listeners;}
me.events=e||{};};EXTUTIL.Observable.prototype=function(){var filterOptRe=/^(?:scope|delay|buffer|single)$/,toLower=function(s){return s.toLowerCase();};return{fireEvent:function(){var a=TOARRAY(arguments),ename=toLower(a[0]),me=this,ret=TRUE,ce=me.events[ename],q,c;if(me.eventsSuspended===TRUE){if(q=me.suspendedEventsQueue){q.push(a);}}
else if(ISOBJECT(ce)&&ce.bubble){if(ce.fire.apply(ce,a.slice(1))===FALSE){return FALSE;}
c=me.getBubbleTarget&&me.getBubbleTarget();if(c&&c.enableBubble){c.enableBubble(ename);return c.fireEvent.apply(c,a);}}
else{if(ISOBJECT(ce)){a.shift();ret=ce.fire.apply(ce,a);}}
return ret;},addListener:function(eventName,fn,scope,o){var me=this,e,oe,isF,ce;if(ISOBJECT(eventName)){o=eventName;for(e in o){oe=o[e];if(!filterOptRe.test(e)){me.addListener(e,oe.fn||oe,oe.scope||o.scope,oe.fn?oe:o);}}}else{eventName=toLower(eventName);ce=me.events[eventName]||TRUE;if(typeof ce=="boolean"){me.events[eventName]=ce=new EXTUTIL.Event(me,eventName);}
ce.addListener(fn,scope,ISOBJECT(o)?o:{});}},removeListener:function(eventName,fn,scope){var ce=this.events[toLower(eventName)];if(ISOBJECT(ce)){ce.removeListener(fn,scope);}},purgeListeners:function(){var events=this.events,evt,key;for(key in events){evt=events[key];if(ISOBJECT(evt)){evt.clearListeners();}}},addEvents:function(o){var me=this;me.events=me.events||{};if(typeof o=='string'){EACH(arguments,function(a){me.events[a]=me.events[a]||TRUE;});}else{Ext.applyIf(me.events,o);}},hasListener:function(eventName){var e=this.events[eventName];return ISOBJECT(e)&&e.listeners.length>0;},suspendEvents:function(queueSuspended){this.eventsSuspended=TRUE;if(queueSuspended){this.suspendedEventsQueue=[];}},resumeEvents:function(){var me=this;me.eventsSuspended=!delete me.suspendedEventQueue;EACH(me.suspendedEventsQueue,function(e){me.fireEvent.apply(me,e);});}}}();var OBSERVABLE=EXTUTIL.Observable.prototype;OBSERVABLE.on=OBSERVABLE.addListener;OBSERVABLE.un=OBSERVABLE.removeListener;EXTUTIL.Observable.releaseCapture=function(o){o.fireEvent=OBSERVABLE.fireEvent;};function createTargeted(h,o,scope){return function(){if(o.target==arguments[0]){h.apply(scope,TOARRAY(arguments));}};};function createBuffered(h,o,scope){var task=new EXTUTIL.DelayedTask();return function(){task.delay(o.buffer,h,scope,TOARRAY(arguments));};}
function createSingle(h,e,fn,scope){return function(){e.removeListener(fn,scope);return h.apply(scope,arguments);};}
function createDelayed(h,o,scope){return function(){var args=TOARRAY(arguments);(function(){h.apply(scope,args);}).defer(o.delay||10);};};EXTUTIL.Event=function(obj,name){this.name=name;this.obj=obj;this.listeners=[];};EXTUTIL.Event.prototype={addListener:function(fn,scope,options){var me=this,l;scope=scope||me.obj;if(!me.isListening(fn,scope)){l=me.createListener(fn,scope,options);if(me.firing){me.listeners=me.listeners.slice(0);}
me.listeners.push(l);}},createListener:function(fn,scope,o){o=o||{},scope=scope||this.obj;var l={fn:fn,scope:scope,options:o},h=fn;if(o.target){h=createTargeted(h,o,scope);}
if(o.delay){h=createDelayed(h,o,scope);}
if(o.single){h=createSingle(h,this,fn,scope);}
if(o.buffer){h=createBuffered(h,o,scope);}
l.fireFn=h;return l;},findListener:function(fn,scope){var s,ret=-1;EACH(this.listeners,function(l,i){s=l.scope;if(l.fn==fn&&(s==scope||s==this.obj)){ret=i;return FALSE;}},this);return ret;},isListening:function(fn,scope){return this.findListener(fn,scope)!=-1;},removeListener:function(fn,scope){var index,me=this,ret=FALSE;if((index=me.findListener(fn,scope))!=-1){if(me.firing){me.listeners=me.listeners.slice(0);}
me.listeners.splice(index,1);ret=TRUE;}
return ret;},clearListeners:function(){this.listeners=[];},fire:function(){var me=this,args=TOARRAY(arguments),ret=TRUE;EACH(me.listeners,function(l){me.firing=TRUE;if(l.fireFn.apply(l.scope||me.obj||window,args)===FALSE){return ret=me.firing=FALSE;}});me.firing=FALSE;return ret;}};})();

Ext.DomHelper=function(){var tempTableEl=null,emptyTags=/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,tableRe=/^table|tbody|tr|td$/i,pub,afterbegin="afterbegin",afterend="afterend",beforebegin="beforebegin",beforeend="beforeend",ts='<table>',te='</table>',tbs=ts+'<tbody>',tbe='</tbody>'+te,trs=tbs+'<tr>',tre='</tr>'+tbe;function doInsert(el,o,returnElement,pos,sibling,append){var newNode=pub.insertHtml(pos,Ext.getDom(el),createHtml(o));return returnElement?Ext.get(newNode,true):newNode;}
function createHtml(o){var b="",attr,val,key,keyVal,cn;if(typeof o=='string'){b=o;}else if(Ext.isArray(o)){Ext.each(o,function(v){b+=createHtml(v);});}else{b+="<"+(o.tag=o.tag||"div");Ext.iterate(o,function(attr,val){if(!/tag|children|cn|html$/i.test(attr)){if(Ext.isObject(val)){b+=" "+attr+"='";Ext.iterate(val,function(key,keyVal){b+=key+":"+keyVal+";";});b+="'";}else{b+=" "+({cls:"class",htmlFor:"for"}[attr]||attr)+"='"+val+"'";}}});if(emptyTags.test(o.tag)){b+="/>";}else{b+=">";if((cn=o.children||o.cn)){b+=createHtml(cn);}else if(o.html){b+=o.html;}
b+="</"+o.tag+">";}}
return b;}
function ieTable(depth,s,h,e){tempTableEl.innerHTML=[s,h,e].join('');var i=-1,el=tempTableEl;while(++i<depth){el=el.firstChild;}
return el;}
function insertIntoTable(tag,where,el,html){var node,before;tempTableEl=tempTableEl||document.createElement('div');if(tag=='td'&&(where==afterbegin||where==beforeend)||!/td|tr|tbody/i.test(tag)&&(where==beforebegin||where==afterend)){return;}
before=where==beforebegin?el:where==afterend?el.nextSibling:where==afterbegin?el.firstChild:null;if(where==beforebegin||where==afterend){el=el.parentNode;}
if(tag=='td'||(tag=="tr"&&(where==beforeend||where==afterbegin))){node=ieTable(4,trs,html,tre);}else if((tag=="tbody"&&(where==beforeend||where==afterbegin))||(tag=="tr"&&(where==beforebegin||where==afterend))){node=ieTable(3,tbs,html,tbe);}else{node=ieTable(2,ts,html,te);}
el.insertBefore(node,before);return node;}
pub={markup:function(o){return createHtml(o);},insertHtml:function(where,el,html){var hash={},hashVal,setStart,range,frag,rangeEl,rs;where=where.toLowerCase();hash[beforebegin]=['BeforeBegin','previousSibling'];hash[afterend]=['AfterEnd','nextSibling'];if(el.insertAdjacentHTML){if(tableRe.test(el.tagName)&&(rs=insertIntoTable(el.tagName.toLowerCase(),where,el,html))){return rs;}
hash[afterbegin]=['AfterBegin','firstChild'];hash[beforeend]=['BeforeEnd','lastChild'];if((hashVal=hash[where])){el.insertAdjacentHTML(hashVal[0],html);return el[hashVal[1]];}}else{range=el.ownerDocument.createRange();setStart="setStart"+(/end/i.test(where)?"After":"Before");if(hash[where]){range[setStart](el);frag=range.createContextualFragment(html);el.parentNode.insertBefore(frag,where==beforebegin?el:el.nextSibling);return el[(where==beforebegin?"previous":"next")+"Sibling"];}else{rangeEl=(where==afterbegin?"first":"last")+"Child";if(el.firstChild){range[setStart](el[rangeEl]);frag=range.createContextualFragment(html);if(where==afterbegin){el.insertBefore(frag,el.firstChild);}else{el.appendChild(frag);}}else{el.innerHTML=html;}
return el[rangeEl];}}
throw'Illegal insertion point -> "'+where+'"';},insertBefore:function(el,o,returnElement){return doInsert(el,o,returnElement,beforebegin);},insertAfter:function(el,o,returnElement){return doInsert(el,o,returnElement,afterend,"nextSibling");},insertFirst:function(el,o,returnElement){return doInsert(el,o,returnElement,afterbegin,"firstChild");},append:function(el,o,returnElement){return doInsert(el,o,returnElement,beforeend,"",true);},overwrite:function(el,o,returnElement){el=Ext.getDom(el);el.innerHTML=createHtml(o);return returnElement?Ext.get(el.firstChild):el.firstChild;},createHtml:createHtml};return pub;}();

Ext.Template=function(html){var me=this,a=arguments,buf=[];if(Ext.isArray(html)){html=html.join("");}else if(a.length>1){Ext.each(a,function(v){if(Ext.isObject(v)){Ext.apply(me,v);}else{buf.push(v);}});html=buf.join('');}
me.html=html;if(me.compiled){me.compile();}};Ext.Template.prototype={applyTemplate:function(values){var me=this;return me.compiled?me.compiled(values):me.html.replace(me.re,function(m,name){return values[name]!==undefined?values[name]:"";});},set:function(html,compile){var me=this;me.html=html;me.compiled=null;return compile?me.compile():me;},re:/\{([\w-]+)\}/g,compile:function(){var me=this,sep=Ext.isGecko?"+":",";function fn(m,name){name="values['"+name+"']";return"'"+sep+'('+name+" == undefined ? '' : "+name+')'+sep+"'";}
eval("this.compiled = function(values){ return "+(Ext.isGecko?"'":"['")+
me.html.replace(/\\/g,'\\\\').replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn)+
(Ext.isGecko?"';};":"'].join('');};"));return me;},insertFirst:function(el,values,returnElement){return this.doInsert('afterBegin',el,values,returnElement);},insertBefore:function(el,values,returnElement){return this.doInsert('beforeBegin',el,values,returnElement);},insertAfter:function(el,values,returnElement){return this.doInsert('afterEnd',el,values,returnElement);},append:function(el,values,returnElement){return this.doInsert('beforeEnd',el,values,returnElement);},doInsert:function(where,el,values,returnEl){el=Ext.getDom(el);var newNode=Ext.DomHelper.insertHtml(where,el,this.applyTemplate(values));return returnEl?Ext.get(newNode,true):newNode;},overwrite:function(el,values,returnElement){el=Ext.getDom(el);el.innerHTML=this.applyTemplate(values);return returnElement?Ext.get(el.firstChild,true):el.firstChild;}};Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;Ext.Template.from=function(el,config){el=Ext.getDom(el);return new Ext.Template(el.value||el.innerHTML,config||'');};

Ext.DomQuery=function(){var cache={},simpleCache={},valueCache={},nonSpace=/\S/,trimRe=/^\s+|\s+$/g,tplRe=/\{(\d+)\}/g,modeRe=/^(\s?[\/>+~]\s?|\s|$)/,tagTokenRe=/^(#)?([\w-\*]+)/,nthRe=/(\d*)n\+?(\d*)/,nthRe2=/\D/,isIE=window.ActiveXObject?true:false,isOpera=Ext.isOpera,key=30803;eval("var batch = 30803;");function child(p,index){var i=0,n=p.firstChild;while(n){if(n.nodeType==1){if(++i==index){return n;}}
n=n.nextSibling;}
return null;};function next(n){while((n=n.nextSibling)&&n.nodeType!=1);return n;};function prev(n){while((n=n.previousSibling)&&n.nodeType!=1);return n;};function children(d){var n=d.firstChild,ni=-1,nx;while(n){nx=n.nextSibling;if(n.nodeType==3&&!nonSpace.test(n.nodeValue)){d.removeChild(n);}else{n.nodeIndex=++ni;}
n=nx;}
return this;};function byClassName(c,a,v){if(!v){return c;}
var r=[],ri=-1,cn;for(var i=0,ci;ci=c[i];i++){if((' '+ci.className+' ').indexOf(v)!=-1){r[++ri]=ci;}}
return r;};function attrValue(n,attr){if(!n.tagName&&typeof n.length!="undefined"){n=n[0];}
if(!n){return null;}
if(attr=="for"){return n.htmlFor;}
if(attr=="class"||attr=="className"){return n.className;}
return n.getAttribute(attr)||n[attr];};function getNodes(ns,mode,tagName){var result=[],ri=-1,cs;if(!ns){return result;}
tagName=tagName||"*";if(typeof ns.getElementsByTagName!="undefined"){ns=[ns];}
if(!mode){for(var i=0,ni;ni=ns[i];i++){cs=ni.getElementsByTagName(tagName);for(var j=0,ci;ci=cs[j];j++){result[++ri]=ci;}}}else if(mode=="/"||mode==">"){var utag=tagName.toUpperCase();for(var i=0,ni,cn;ni=ns[i];i++){cn=isOpera?ni.childNodes:(ni.children||ni.childNodes);for(var j=0,cj;cj=cn[j];j++){if(cj.nodeName==utag||cj.nodeName==tagName||tagName=='*'){result[++ri]=cj;}}}}else if(mode=="+"){var utag=tagName.toUpperCase();for(var i=0,n;n=ns[i];i++){while((n=n.nextSibling)&&n.nodeType!=1);if(n&&(n.nodeName==utag||n.nodeName==tagName||tagName=='*')){result[++ri]=n;}}}else if(mode=="~"){var utag=tagName.toUpperCase();for(var i=0,n;n=ns[i];i++){while((n=n.nextSibling)){if(n.nodeName==utag||n.nodeName==tagName||tagName=='*'){result[++ri]=n;}}}}
return result;};function concat(a,b){if(b.slice){return a.concat(b);}
for(var i=0,l=b.length;i<l;i++){a[a.length]=b[i];}
return a;}
function byTag(cs,tagName){if(cs.tagName||cs==document){cs=[cs];}
if(!tagName){return cs;}
var r=[],ri=-1;tagName=tagName.toLowerCase();for(var i=0,ci;ci=cs[i];i++){if(ci.nodeType==1&&ci.tagName.toLowerCase()==tagName){r[++ri]=ci;}}
return r;};function byId(cs,attr,id){if(cs.tagName||cs==document){cs=[cs];}
if(!id){return cs;}
var r=[],ri=-1;for(var i=0,ci;ci=cs[i];i++){if(ci&&ci.id==id){r[++ri]=ci;return r;}}
return r;};function byAttribute(cs,attr,value,op,custom){var r=[],ri=-1,st=custom=="{",f=Ext.DomQuery.operators[op];for(var i=0,ci;ci=cs[i];i++){if(ci.nodeType!=1){continue;}
var a;if(st){a=Ext.DomQuery.getStyle(ci,attr);}
else if(attr=="class"||attr=="className"){a=ci.className;}else if(attr=="for"){a=ci.htmlFor;}else if(attr=="href"){a=ci.getAttribute("href",2);}else{a=ci.getAttribute(attr);}
if((f&&f(a,value))||(!f&&a)){r[++ri]=ci;}}
return r;};function byPseudo(cs,name,value){return Ext.DomQuery.pseudos[name](cs,value);};function nodupIEXml(cs){var d=++key,r;cs[0].setAttribute("_nodup",d);r=[cs[0]];for(var i=1,len=cs.length;i<len;i++){var c=cs[i];if(!c.getAttribute("_nodup")!=d){c.setAttribute("_nodup",d);r[r.length]=c;}}
for(var i=0,len=cs.length;i<len;i++){cs[i].removeAttribute("_nodup");}
return r;}
function nodup(cs){if(!cs){return[];}
var len=cs.length,c,i,r=cs,cj,ri=-1;if(!len||typeof cs.nodeType!="undefined"||len==1){return cs;}
if(isIE&&typeof cs[0].selectSingleNode!="undefined"){return nodupIEXml(cs);}
var d=++key;cs[0]._nodup=d;for(i=1;c=cs[i];i++){if(c._nodup!=d){c._nodup=d;}else{r=[];for(var j=0;j<i;j++){r[++ri]=cs[j];}
for(j=i+1;cj=cs[j];j++){if(cj._nodup!=d){cj._nodup=d;r[++ri]=cj;}}
return r;}}
return r;}
function quickDiffIEXml(c1,c2){var d=++key,r=[];for(var i=0,len=c1.length;i<len;i++){c1[i].setAttribute("_qdiff",d);}
for(var i=0,len=c2.length;i<len;i++){if(c2[i].getAttribute("_qdiff")!=d){r[r.length]=c2[i];}}
for(var i=0,len=c1.length;i<len;i++){c1[i].removeAttribute("_qdiff");}
return r;}
function quickDiff(c1,c2){var len1=c1.length,d=++key,r=[];if(!len1){return c2;}
if(isIE&&c1[0].selectSingleNode){return quickDiffIEXml(c1,c2);}
for(var i=0;i<len1;i++){c1[i]._qdiff=d;}
for(var i=0,len=c2.length;i<len;i++){if(c2[i]._qdiff!=d){r[r.length]=c2[i];}}
return r;}
function quickId(ns,mode,root,id){if(ns==root){var d=root.ownerDocument||root;return d.getElementById(id);}
ns=getNodes(ns,mode,"*");return byId(ns,null,id);}
return{getStyle:function(el,name){return Ext.fly(el).getStyle(name);},compile:function(path,type){type=type||"select";var fn=["var f = function(root){\n var mode; ++batch; var n = root || document;\n"],q=path,mode,lq,tk=Ext.DomQuery.matchers,tklen=tk.length,mm,lmode=q.match(modeRe);if(lmode&&lmode[1]){fn[fn.length]='mode="'+lmode[1].replace(trimRe,"")+'";';q=q.replace(lmode[1],"");}
while(path.substr(0,1)=="/"){path=path.substr(1);}
while(q&&lq!=q){lq=q;var tm=q.match(tagTokenRe);if(type=="select"){if(tm){if(tm[1]=="#"){fn[fn.length]='n = quickId(n, mode, root, "'+tm[2]+'");';}else{fn[fn.length]='n = getNodes(n, mode, "'+tm[2]+'");';}
q=q.replace(tm[0],"");}else if(q.substr(0,1)!='@'){fn[fn.length]='n = getNodes(n, mode, "*");';}}else{if(tm){if(tm[1]=="#"){fn[fn.length]='n = byId(n, null, "'+tm[2]+'");';}else{fn[fn.length]='n = byTag(n, "'+tm[2]+'");';}
q=q.replace(tm[0],"");}}
while(!(mm=q.match(modeRe))){var matched=false;for(var j=0;j<tklen;j++){var t=tk[j];var m=q.match(t.re);if(m){fn[fn.length]=t.select.replace(tplRe,function(x,i){return m[i];});q=q.replace(m[0],"");matched=true;break;}}
if(!matched){throw'Error parsing selector, parsing failed at "'+q+'"';}}
if(mm[1]){fn[fn.length]='mode="'+mm[1].replace(trimRe,"")+'";';q=q.replace(mm[1],"");}}
fn[fn.length]="return nodup(n);\n}";eval(fn.join(""));return f;},select:function(path,root,type){if(!root||root==document){root=document;}
if(typeof root=="string"){root=document.getElementById(root);}
var paths=path.split(","),results=[];for(var i=0,len=paths.length;i<len;i++){var p=paths[i].replace(trimRe,"");if(!cache[p]){cache[p]=Ext.DomQuery.compile(p);if(!cache[p]){throw p+" is not a valid selector";}}
var result=cache[p](root);if(result&&result!=document){results=results.concat(result);}}
if(paths.length>1){return nodup(results);}
return results;},selectNode:function(path,root){return Ext.DomQuery.select(path,root)[0];},selectValue:function(path,root,defaultValue){path=path.replace(trimRe,"");if(!valueCache[path]){valueCache[path]=Ext.DomQuery.compile(path,"select");}
var n=valueCache[path](root),v;n=n[0]?n[0]:n;v=(n&&n.firstChild?n.firstChild.nodeValue:null);return((v===null||v===undefined||v==='')?defaultValue:v);},selectNumber:function(path,root,defaultValue){var v=Ext.DomQuery.selectValue(path,root,defaultValue||0);return parseFloat(v);},is:function(el,ss){if(typeof el=="string"){el=document.getElementById(el);}
var isArray=Ext.isArray(el),result=Ext.DomQuery.filter(isArray?el:[el],ss);return isArray?(result.length==el.length):(result.length>0);},filter:function(els,ss,nonMatches){ss=ss.replace(trimRe,"");if(!simpleCache[ss]){simpleCache[ss]=Ext.DomQuery.compile(ss,"simple");}
var result=simpleCache[ss](els);return nonMatches?quickDiff(result,els):result;},matchers:[{re:/^\.([\w-]+)/,select:'n = byClassName(n, null, " {1} ");'},{re:/^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,select:'n = byPseudo(n, "{1}", "{2}");'},{re:/^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,select:'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'},{re:/^#([\w-]+)/,select:'n = byId(n, null, "{1}");'},{re:/^@([\w-]+)/,select:'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'}],operators:{"=":function(a,v){return a==v;},"!=":function(a,v){return a!=v;},"^=":function(a,v){return a&&a.substr(0,v.length)==v;},"$=":function(a,v){return a&&a.substr(a.length-v.length)==v;},"*=":function(a,v){return a&&a.indexOf(v)!==-1;},"%=":function(a,v){return(a%v)==0;},"|=":function(a,v){return a&&(a==v||a.substr(0,v.length+1)==v+'-');},"~=":function(a,v){return a&&(' '+a+' ').indexOf(' '+v+' ')!=-1;}},pseudos:{"first-child":function(c){var r=[],ri=-1,n;for(var i=0,ci;ci=n=c[i];i++){while((n=n.previousSibling)&&n.nodeType!=1);if(!n){r[++ri]=ci;}}
return r;},"last-child":function(c){var r=[],ri=-1,n;for(var i=0,ci;ci=n=c[i];i++){while((n=n.nextSibling)&&n.nodeType!=1);if(!n){r[++ri]=ci;}}
return r;},"nth-child":function(c,a){var r=[],ri=-1,m=nthRe.exec(a=="even"&&"2n"||a=="odd"&&"2n+1"||!nthRe2.test(a)&&"n+"+a||a),f=(m[1]||1)-0,l=m[2]-0;for(var i=0,n;n=c[i];i++){var pn=n.parentNode;if(batch!=pn._batch){var j=0;for(var cn=pn.firstChild;cn;cn=cn.nextSibling){if(cn.nodeType==1){cn.nodeIndex=++j;}}
pn._batch=batch;}
if(f==1){if(l==0||n.nodeIndex==l){r[++ri]=n;}}else if((n.nodeIndex+l)%f==0){r[++ri]=n;}}
return r;},"only-child":function(c){var r=[],ri=-1;;for(var i=0,ci;ci=c[i];i++){if(!prev(ci)&&!next(ci)){r[++ri]=ci;}}
return r;},"empty":function(c){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var cns=ci.childNodes,j=0,cn,empty=true;while(cn=cns[j]){++j;if(cn.nodeType==1||cn.nodeType==3){empty=false;break;}}
if(empty){r[++ri]=ci;}}
return r;},"contains":function(c,v){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if((ci.textContent||ci.innerText||'').indexOf(v)!=-1){r[++ri]=ci;}}
return r;},"nodeValue":function(c,v){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(ci.firstChild&&ci.firstChild.nodeValue==v){r[++ri]=ci;}}
return r;},"checked":function(c){var r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(ci.checked==true){r[++ri]=ci;}}
return r;},"not":function(c,ss){return Ext.DomQuery.filter(c,ss,true);},"any":function(c,selectors){var ss=selectors.split('|'),r=[],ri=-1,s;for(var i=0,ci;ci=c[i];i++){for(var j=0;s=ss[j];j++){if(Ext.DomQuery.is(ci,s)){r[++ri]=ci;break;}}}
return r;},"odd":function(c){return this["nth-child"](c,"odd");},"even":function(c){return this["nth-child"](c,"even");},"nth":function(c,a){return c[a-1]||[];},"first":function(c){return c[0]||[];},"last":function(c){return c[c.length-1]||[];},"has":function(c,ss){var s=Ext.DomQuery.select,r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){if(s(ss,ci).length>0){r[++ri]=ci;}}
return r;},"next":function(c,ss){var is=Ext.DomQuery.is,r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var n=next(ci);if(n&&is(n,ss)){r[++ri]=ci;}}
return r;},"prev":function(c,ss){var is=Ext.DomQuery.is,r=[],ri=-1;for(var i=0,ci;ci=c[i];i++){var n=prev(ci);if(n&&is(n,ss)){r[++ri]=ci;}}
return r;}}};}();Ext.query=Ext.DomQuery.select;

Ext.EventManager=function(){var docReadyEvent,docReadyProcId,docReadyState=false,E=Ext.lib.Event,D=Ext.lib.Dom,DOC=document,WINDOW=window,IEDEFERED="ie-deferred-loader",DOMCONTENTLOADED="DOMContentLoaded",elHash={},propRe=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;function addListener(el,ename,fn,wrap,scope){var id=Ext.id(el),es=elHash[id]=elHash[id]||{};(es[ename]=es[ename]||[]).push([fn,wrap,scope]);E.on(el,ename,wrap);if(ename=="mousewheel"&&el.addEventListener){var args=["DOMMouseScroll",wrap,false];el.addEventListener.apply(el,args);E.on(window,'unload',function(){el.removeEventListener.apply(el,args);});}
if(ename=="mousedown"&&el==document){Ext.EventManager.stoppedMouseDownEvent.addListener(wrap);}};function fireDocReady(){if(!docReadyState){Ext.isReady=docReadyState=true;if(docReadyProcId){clearInterval(docReadyProcId);}
if(Ext.isGecko||Ext.isOpera){DOC.removeEventListener(DOMCONTENTLOADED,fireDocReady,false);}
if(Ext.isIE){var defer=DOC.getElementById(IEDEFERED);if(defer){defer.onreadystatechange=null;defer.parentNode.removeChild(defer);}}
if(docReadyEvent){docReadyEvent.fire();docReadyEvent.clearListeners();}}};function initDocReady(){var COMPLETE="complete";docReadyEvent=new Ext.util.Event();if(Ext.isGecko||Ext.isOpera){DOC.addEventListener(DOMCONTENTLOADED,fireDocReady,false);}else if(Ext.isIE){DOC.write("<s"+'cript id='+IEDEFERED+' defer="defer" src="/'+'/:"></s'+"cript>");DOC.getElementById(IEDEFERED).onreadystatechange=function(){if(this.readyState==COMPLETE){fireDocReady();}};}else if(Ext.isWebKit){docReadyProcId=setInterval(function(){if(DOC.readyState==COMPLETE){fireDocReady();}},10);}
E.on(WINDOW,"load",fireDocReady);};function createTargeted(h,o){return function(){var args=Ext.toArray(arguments);if(o.target==Ext.EventObject.setEvent(args[0]).target){h.apply(this,args);}};};function createBuffered(h,o){var task=new Ext.util.DelayedTask(h);return function(e){task.delay(o.buffer,h,null,[new Ext.EventObjectImpl(e)]);};};function createSingle(h,el,ename,fn,scope){return function(e){Ext.EventManager.removeListener(el,ename,fn,scope);h(e);};};function createDelayed(h,o){return function(e){e=new Ext.EventObjectImpl(e);setTimeout(function(){h(e);},o.delay||10);};};function listen(element,ename,opt,fn,scope){var o=!Ext.isObject(opt)?{}:opt,el=Ext.getDom(element);fn=fn||o.fn;scope=scope||o.scope;if(!el){throw"Error listening for \""+ename+'\". Element "'+element+'" doesn\'t exist.';}
function h(e){if(!Ext){return;}
e=Ext.EventObject.setEvent(e);var t;if(o.delegate){if(!(t=e.getTarget(o.delegate,el))){return;}}else{t=e.target;}
if(o.stopEvent){e.stopEvent();}
if(o.preventDefault){e.preventDefault();}
if(o.stopPropagation){e.stopPropagation();}
if(o.normalized){e=e.browserEvent;}
fn.call(scope||el,e,t,o);};if(o.target){h=createTargeted(h,o);}
if(o.delay){h=createDelayed(h,o);}
if(o.single){h=createSingle(h,el,ename,fn,scope);}
if(o.buffer){h=createBuffered(h,o);}
addListener(el,ename,fn,h,scope);return h;};var pub={addListener:function(element,eventName,fn,scope,options){if(Ext.isObject(eventName)){var o=eventName,e,val;for(e in o){val=o[e];if(!propRe.test(e)){if(Ext.isFunction(val)){listen(element,e,o,val,o.scope);}else{listen(element,e,val);}}}}else{listen(element,eventName,options,fn,scope);}},removeListener:function(element,eventName,fn,scope){var el=Ext.getDom(element),id=Ext.id(el),wrap;Ext.each((elHash[id]||{})[eventName],function(v,i,a){if(Ext.isArray(v)&&v[0]==fn&&(!scope||v[2]==scope)){E.un(el,eventName,wrap=v[1]);a.splice(i,1);return false;}});if(eventName=="mousewheel"&&el.addEventListener&&wrap){el.removeEventListener("DOMMouseScroll",wrap,false);}
if(eventName=="mousedown"&&el==DOC&&wrap){Ext.EventManager.stoppedMouseDownEvent.removeListener(wrap);}},removeAll:function(el){var id=Ext.id(el=Ext.getDom(el)),es=elHash[id],ename;for(ename in es){if(es.hasOwnProperty(ename)){Ext.each(es[ename],function(v){E.un(el,ename,v.wrap);});}}
elHash[id]=null;},onDocumentReady:function(fn,scope,options){if(docReadyState){docReadyEvent.addListener(fn,scope,options);docReadyEvent.fire();docReadyEvent.clearListeners();}else{if(!docReadyEvent)initDocReady();options=options||{};options.delay=options.delay||1;docReadyEvent.addListener(fn,scope,options);}},elHash:elHash};pub.on=pub.addListener;pub.un=pub.removeListener;pub.stoppedMouseDownEvent=new Ext.util.Event();return pub;}();Ext.onReady=Ext.EventManager.onDocumentReady;(function(){var initExtCss=function(){var bd=document.body||document.getElementsByTagName('body')[0];if(!bd){return false;}
var cls=[' ',Ext.isIE?"ext-ie "+(Ext.isIE6?'ext-ie6':(Ext.isIE7?'ext-ie7':'ext-ie8')):Ext.isGecko?"ext-gecko "+(Ext.isGecko2?'ext-gecko2':'ext-gecko3'):Ext.isOpera?"ext-opera":Ext.isWebKit?"ext-webkit":""];if(Ext.isSafari){cls.push("ext-safari "+(Ext.isSafari2?'ext-safari2':(Ext.isSafari3?'ext-safari3':'ext-safari4')));}else if(Ext.isChrome){cls.push("ext-chrome");}
if(Ext.isMac){cls.push("ext-mac");}
if(Ext.isLinux){cls.push("ext-linux");}
if(Ext.isStrict||Ext.isBorderBox){var p=bd.parentNode;if(p){p.className+=Ext.isStrict?' ext-strict':' ext-border-box';}}
bd.className+=cls.join(' ');return true;}
if(!initExtCss()){Ext.onReady(initExtCss);}})();Ext.EventObject=function(){var E=Ext.lib.Event,safariKeys={3:13,63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35},btnMap=Ext.isIE?{1:0,4:1,2:2}:(Ext.isWebKit?{1:0,2:1,3:2}:{0:0,1:1,2:2});Ext.EventObjectImpl=function(e){if(e){this.setEvent(e.browserEvent||e);}};Ext.EventObjectImpl.prototype={setEvent:function(e){var me=this;if(e==me||(e&&e.browserEvent)){return e;}
me.browserEvent=e;if(e){me.button=e.button?btnMap[e.button]:(e.which?e.which-1:-1);if(e.type=='click'&&me.button==-1){me.button=0;}
me.type=e.type;me.shiftKey=e.shiftKey;me.ctrlKey=e.ctrlKey||e.metaKey||false;me.altKey=e.altKey;me.keyCode=e.keyCode;me.charCode=e.charCode;me.target=E.getTarget(e);me.xy=E.getXY(e);}else{me.button=-1;me.shiftKey=false;me.ctrlKey=false;me.altKey=false;me.keyCode=0;me.charCode=0;me.target=null;me.xy=[0,0];}
return me;},stopEvent:function(){var me=this;if(me.browserEvent){if(me.browserEvent.type=='mousedown'){Ext.EventManager.stoppedMouseDownEvent.fire(me);}
E.stopEvent(me.browserEvent);}},preventDefault:function(){if(this.browserEvent){E.preventDefault(this.browserEvent);}},stopPropagation:function(){var me=this;if(me.browserEvent){if(me.browserEvent.type=='mousedown'){Ext.EventManager.stoppedMouseDownEvent.fire(me);}
E.stopPropagation(me.browserEvent);}},getCharCode:function(){return this.charCode||this.keyCode;},getKey:function(){return this.normalizeKey(this.keyCode||this.charCode)},normalizeKey:function(k){return Ext.isSafari?(safariKeys[k]||k):k;},getPageX:function(){return this.xy[0];},getPageY:function(){return this.xy[1];},getXY:function(){return this.xy;},getTarget:function(selector,maxDepth,returnEl){return selector?Ext.fly(this.target).findParent(selector,maxDepth,returnEl):(returnEl?Ext.get(this.target):this.target);},getRelatedTarget:function(){return this.browserEvent?E.getRelatedTarget(this.browserEvent):null;},getWheelDelta:function(){var e=this.browserEvent;var delta=0;if(e.wheelDelta){delta=e.wheelDelta/120;}else if(e.detail){delta=-e.detail/3;}
return delta;},within:function(el,related,allowEl){if(el){var t=this[related?"getRelatedTarget":"getTarget"]();return t&&((allowEl?(t==Ext.getDom(el)):false)||Ext.fly(el).contains(t));}
return false;}};return new Ext.EventObjectImpl();}();

(function(){var DOC=document;Ext.Element=function(element,forceNew){var dom=typeof element=="string"?DOC.getElementById(element):element,id;if(!dom)return null;id=dom.id;if(!forceNew&&id&&Ext.Element.cache[id]){return Ext.Element.cache[id];}
this.dom=dom;this.id=id||Ext.id(dom);};var D=Ext.lib.Dom,DH=Ext.DomHelper,E=Ext.lib.Event,A=Ext.lib.Anim,El=Ext.Element;El.prototype={set:function(o,useSet){var el=this.dom,attr,val;for(attr in o){val=o[attr];if(attr!="style"&&!Ext.isFunction(val)){if(attr=="cls"){el.className=val;}else if(o.hasOwnProperty(attr)){if(useSet||!!el.setAttribute)el.setAttribute(attr,val);else el[attr]=val;}}}
if(o.style){Ext.DomHelper.applyStyles(el,o.style);}
return this;},defaultUnit:"px",is:function(simpleSelector){return Ext.DomQuery.is(this.dom,simpleSelector);},focus:function(defer,dom){var me=this,dom=dom||me.dom;try{if(Number(defer)){me.focus.defer(defer,null,[null,dom]);}else{dom.focus();}}catch(e){}
return me;},blur:function(){try{this.dom.blur();}catch(e){}
return this;},getValue:function(asNumber){var val=this.dom.value;return asNumber?parseInt(val,10):val;},addListener:function(eventName,fn,scope,options){Ext.EventManager.on(this.dom,eventName,fn,scope||this,options);return this;},removeListener:function(eventName,fn,scope){Ext.EventManager.removeListener(this.dom,eventName,fn,scope||this);return this;},removeAllListeners:function(){Ext.EventManager.removeAll(this.dom);return this;},addUnits:function(size){if(size===""||size=="auto"||size===undefined){size=size||'';}else if(!isNaN(size)||!unitPattern.test(size)){size=size+(this.defaultUnit||'px');}
return size;},load:function(url,params,cb){Ext.Ajax.request(Ext.apply({params:params,url:url.url||url,callback:cb,el:this.dom,indicatorText:url.indicatorText||''},Ext.isObject(url)?url:{}));return this;},isBorderBox:function(){return noBoxAdjust[(this.dom.tagName||"").toLowerCase()]||Ext.isBorderBox;},remove:function(){var me=this,dom=me.dom;me.removeAllListeners();delete El.cache[dom.id];delete El.dataCache[dom.id]
Ext.removeNode(dom);},hover:function(overFn,outFn,scope,options){var me=this;me.on('mouseenter',overFn,scope||me.dom,options);me.on('mouseleave',outFn,scope||me.dom,options);return me;},contains:function(el){return!el?false:Ext.lib.Dom.isAncestor(this.dom,el.dom?el.dom:el);},getAttributeNS:function(ns,name){return this.getAttribute(name,ns);},getAttribute:Ext.isIE?function(name,ns){var d=this.dom,type=typeof d[ns+":"+name];if(['undefined','unknown'].indexOf(type)==-1){return d[ns+":"+name];}
return d[name];}:function(name,ns){var d=this.dom;return d.getAttributeNS(ns,name)||d.getAttribute(ns+":"+name)||d.getAttribute(name)||d[name];},update:function(html){this.dom.innerHTML=html;return this;}};var ep=El.prototype;El.addMethods=function(o){Ext.apply(ep,o);};ep.on=ep.addListener;ep.un=ep.removeListener;ep.autoBoxAdjust=true;var unitPattern=/\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,docEl;El.cache={};El.dataCache={};El.get=function(el){var ex,elm,id;if(!el){return null;}
if(typeof el=="string"){if(!(elm=DOC.getElementById(el))){return null;}
if(ex=El.cache[el]){ex.dom=elm;}else{ex=El.cache[el]=new El(elm);}
return ex;}else if(el.tagName){if(!(id=el.id)){id=Ext.id(el);}
if(ex=El.cache[id]){ex.dom=el;}else{ex=El.cache[id]=new El(el);}
return ex;}else if(el instanceof El){if(el!=docEl){el.dom=DOC.getElementById(el.id)||el.dom;El.cache[el.id]=el;}
return el;}else if(el.isComposite){return el;}else if(Ext.isArray(el)){return El.select(el);}else if(el==DOC){if(!docEl){var f=function(){};f.prototype=El.prototype;docEl=new f();docEl.dom=DOC;}
return docEl;}
return null;};El.data=function(el,key,value){var c=El.dataCache[el.id];if(!c){c=El.dataCache[el.id]={};}
if(arguments.length==2){return c[key];}else{c[key]=value;}};function garbageCollect(){if(!Ext.enableGarbageCollector){clearInterval(El.collectorThread);}else{var eid,el,d;for(eid in El.cache){el=El.cache[eid];d=el.dom;if(!d||!d.parentNode||(!d.offsetParent&&!DOC.getElementById(eid))){delete El.cache[eid];if(d&&Ext.enableListenerCollection){Ext.EventManager.removeAll(d);}}}}}
El.collectorThreadId=setInterval(garbageCollect,30000);var flyFn=function(){};flyFn.prototype=El.prototype;El.Flyweight=function(dom){this.dom=dom;};El.Flyweight.prototype=new flyFn();El.Flyweight.prototype.isFlyweight=true;El._flyweights={};El.fly=function(el,named){var ret=null;named=named||'_global';if(el=Ext.getDom(el)){(El._flyweights[named]=El._flyweights[named]||new El.Flyweight()).dom=el;ret=El._flyweights[named];}
return ret;};Ext.get=El.get;Ext.fly=El.fly;var noBoxAdjust=Ext.isStrict?{select:1}:{input:1,select:1,textarea:1};if(Ext.isIE||Ext.isGecko){noBoxAdjust['button']=1;}
Ext.EventManager.on(window,'unload',function(){delete El.cache;delete El.dataCache;delete El._flyweights;});})();

Ext.Element.addMethods(function(){var PARENTNODE='parentNode',NEXTSIBLING='nextSibling',PREVIOUSSIBLING='previousSibling',DQ=Ext.DomQuery,GET=Ext.get;return{findParent:function(simpleSelector,maxDepth,returnEl){var p=this.dom,b=document.body,depth=0,stopEl;if(Ext.isGecko&&Object.prototype.toString.call(p)=='[object XULElement]'){return null;}
maxDepth=maxDepth||50;if(isNaN(maxDepth)){stopEl=Ext.getDom(maxDepth);maxDepth=Number.MAX_VALUE;}
while(p&&p.nodeType==1&&depth<maxDepth&&p!=b&&p!=stopEl){if(DQ.is(p,simpleSelector)){return returnEl?GET(p):p;}
depth++;p=p.parentNode;}
return null;},findParentNode:function(simpleSelector,maxDepth,returnEl){var p=Ext.fly(this.dom.parentNode,'_internal');return p?p.findParent(simpleSelector,maxDepth,returnEl):null;},up:function(simpleSelector,maxDepth){return this.findParentNode(simpleSelector,maxDepth,true);},select:function(selector,unique){return Ext.Element.select(selector,unique,this.dom);},query:function(selector,unique){return DQ.select(selector,this.dom);},child:function(selector,returnDom){var n=DQ.selectNode(selector,this.dom);return returnDom?n:GET(n);},down:function(selector,returnDom){var n=DQ.selectNode(" > "+selector,this.dom);return returnDom?n:GET(n);},parent:function(selector,returnDom){return this.matchNode(PARENTNODE,PARENTNODE,selector,returnDom);},next:function(selector,returnDom){return this.matchNode(NEXTSIBLING,NEXTSIBLING,selector,returnDom);},prev:function(selector,returnDom){return this.matchNode(PREVIOUSSIBLING,PREVIOUSSIBLING,selector,returnDom);},first:function(selector,returnDom){return this.matchNode(NEXTSIBLING,'firstChild',selector,returnDom);},last:function(selector,returnDom){return this.matchNode(PREVIOUSSIBLING,'lastChild',selector,returnDom);},matchNode:function(dir,start,selector,returnDom){var n=this.dom[start];while(n){if(n.nodeType==1&&(!selector||DQ.is(n,selector))){return!returnDom?GET(n):n;}
n=n[dir];}
return null;}}}());

Ext.Element.addMethods(function(){var GETDOM=Ext.getDom,GET=Ext.get,DH=Ext.DomHelper,isEl=function(el){return(el.nodeType||el.dom||typeof el=='string');};return{appendChild:function(el){return GET(el).appendTo(this);},appendTo:function(el){GETDOM(el).appendChild(this.dom);return this;},insertBefore:function(el){(el=GETDOM(el)).parentNode.insertBefore(this.dom,el);return this;},insertAfter:function(el){(el=GETDOM(el)).parentNode.insertBefore(this.dom,el.nextSibling);return this;},insertFirst:function(el,returnDom){el=el||{};if(isEl(el)){el=GETDOM(el);this.dom.insertBefore(el,this.dom.firstChild);return!returnDom?GET(el):el;}else{return this.createChild(el,this.dom.firstChild,returnDom);}},replace:function(el){el=GET(el);this.insertBefore(el);el.remove();return this;},replaceWith:function(el){var me=this,Element=Ext.Element;if(isEl(el)){el=GETDOM(el);me.dom.parentNode.insertBefore(el,me.dom);}else{el=DH.insertBefore(me.dom,el);}
delete Element.cache[me.id];Ext.removeNode(me.dom);me.id=Ext.id(me.dom=el);return Element.cache[me.id]=me;},createChild:function(config,insertBefore,returnDom){config=config||{tag:'div'};return insertBefore?DH.insertBefore(insertBefore,config,returnDom!==true):DH[!this.dom.firstChild?'overwrite':'append'](this.dom,config,returnDom!==true);},wrap:function(config,returnDom){var newEl=DH.insertBefore(this.dom,config||{tag:"div"},!returnDom);newEl.dom?newEl.dom.appendChild(this.dom):newEl.appendChild(this.dom);return newEl;},insertHtml:function(where,html,returnEl){var el=DH.insertHtml(where,this.dom,html);return returnEl?Ext.get(el):el;}}}());

Ext.Element.addMethods(function(){var propCache={},camelRe=/(-[a-z])/gi,classReCache={},view=document.defaultView,propFloat=Ext.isIE?'styleFloat':'cssFloat',opacityRe=/alpha\(opacity=(.*)\)/i,trimRe=/^\s+|\s+$/g,EL=Ext.Element,PADDING="padding",MARGIN="margin",BORDER="border",LEFT="-left",RIGHT="-right",TOP="-top",BOTTOM="-bottom",WIDTH="-width",MATH=Math,HIDDEN='hidden',ISCLIPPED='isClipped',OVERFLOW='overflow',OVERFLOWX='overflow-x',OVERFLOWY='overflow-y',ORIGINALCLIP='originalClip',borders={l:BORDER+LEFT+WIDTH,r:BORDER+RIGHT+WIDTH,t:BORDER+TOP+WIDTH,b:BORDER+BOTTOM+WIDTH},paddings={l:PADDING+LEFT,r:PADDING+RIGHT,t:PADDING+TOP,b:PADDING+BOTTOM},margins={l:MARGIN+LEFT,r:MARGIN+RIGHT,t:MARGIN+TOP,b:MARGIN+BOTTOM},data=Ext.Element.data;function camelFn(m,a){return a.charAt(1).toUpperCase();}
function addStyles(sides,styles){var val=0;Ext.each(sides.match(/\w/g),function(s){if(s=parseInt(this.getStyle(styles[s]),10)){val+=MATH.abs(s);}},this);return val;}
function chkCache(prop){return propCache[prop]||(propCache[prop]=prop=='float'?propFloat:prop.replace(camelRe,camelFn));}
return{adjustWidth:function(width){var me=this;var isNum=(typeof width=="number");if(isNum&&me.autoBoxAdjust&&!me.isBorderBox()){width-=(me.getBorderWidth("lr")+me.getPadding("lr"));}
return(isNum&&width<0)?0:width;},adjustHeight:function(height){var me=this;var isNum=(typeof height=="number");if(isNum&&me.autoBoxAdjust&&!me.isBorderBox()){height-=(me.getBorderWidth("tb")+me.getPadding("tb"));}
return(isNum&&height<0)?0:height;},addClass:function(className){var me=this;Ext.each(className,function(v){me.dom.className+=(!me.hasClass(v)&&v?" "+v:"");});return me;},radioClass:function(className){Ext.each(this.dom.parentNode.childNodes,function(v){if(v.nodeType==1){Ext.fly(v,'_internal').removeClass(className);}});return this.addClass(className);},removeClass:function(className){var me=this;if(me.dom.className){Ext.each(className,function(v){me.dom.className=me.dom.className.replace(classReCache[v]=classReCache[v]||new RegExp('(?:^|\\s+)'+v+'(?:\\s+|$)',"g")," ");});}
return me;},toggleClass:function(className){return this.hasClass(className)?this.removeClass(className):this.addClass(className);},hasClass:function(className){return className&&(' '+this.dom.className+' ').indexOf(' '+className+' ')!=-1;},replaceClass:function(oldClassName,newClassName){return this.removeClass(oldClassName).addClass(newClassName);},isStyle:function(style,val){return this.getStyle(style)==val;},getStyle:function(){return view&&view.getComputedStyle?function(prop){var el=this.dom,v,cs;if(el==document)return null;prop=chkCache(prop);return(v=el.style[prop])?v:(cs=view.getComputedStyle(el,""))?cs[prop]:null;}:function(prop){var el=this.dom,m,cs;if(el==document)return null;if(prop=='opacity'){if(el.style.filter.match){if(m=el.style.filter.match(opacityRe)){var fv=parseFloat(m[1]);if(!isNaN(fv)){return fv?fv/100:0;}}}
return 1;}
prop=chkCache(prop);return el.style[prop]||((cs=el.currentStyle)?cs[prop]:null);};}(),getColor:function(attr,defaultValue,prefix){var v=this.getStyle(attr),color=prefix||'#',h;if(!v||/transparent|inherit/.test(v)){return defaultValue;}
if(/^r/.test(v)){Ext.each(v.slice(4,v.length-1).split(','),function(s){h=parseInt(s,10);color+=(h<16?'0':'')+h.toString(16);});}else{v=v.replace('#','');color+=v.length==3?v.replace(/^(\w)(\w)(\w)$/,'$1$1$2$2$3$3'):v;}
return(color.length>5?color.toLowerCase():defaultValue);},setStyle:function(prop,value){var tmp,style,camel;if(!Ext.isObject(prop)){tmp={};tmp[prop]=value;prop=tmp;}
for(style in prop){value=prop[style];style=='opacity'?this.setOpacity(value):this.dom.style[chkCache(style)]=value;}
return this;},setOpacity:function(opacity,animate){var me=this,s=me.dom.style;if(!animate||!me.anim){if(Ext.isIE){var opac=opacity<1?'alpha(opacity='+opacity*100+')':'',val=s.filter.replace(opacityRe,'').replace(trimRe,'');s.zoom=1;s.filter=val+(val.length>0?' ':'')+opac;}else{s.opacity=opacity;}}else{me.anim({opacity:{to:opacity}},me.preanim(arguments,1),null,.35,'easeIn');}
return me;},clearOpacity:function(){var style=this.dom.style;if(Ext.isIE){if(!Ext.isEmpty(style.filter)){style.filter=style.filter.replace(opacityRe,'').replace(trimRe,'');}}else{style.opacity=style['-moz-opacity']=style['-khtml-opacity']='';}
return this;},getHeight:function(contentHeight){var me=this,dom=me.dom,h=MATH.max(dom.offsetHeight,dom.clientHeight)||0;h=!contentHeight?h:h-me.getBorderWidth("tb")-me.getPadding("tb");return h<0?0:h;},getWidth:function(contentWidth){var me=this,dom=me.dom,w=MATH.max(dom.offsetWidth,dom.clientWidth)||0;w=!contentWidth?w:w-me.getBorderWidth("lr")-me.getPadding("lr");return w<0?0:w;},setWidth:function(width,animate){var me=this;width=me.adjustWidth(width);!animate||!me.anim?me.dom.style.width=me.addUnits(width):me.anim({width:{to:width}},me.preanim(arguments,1));return me;},setHeight:function(height,animate){var me=this;height=me.adjustHeight(height);!animate||!me.anim?me.dom.style.height=me.addUnits(height):me.anim({height:{to:height}},me.preanim(arguments,1));return me;},getBorderWidth:function(side){return addStyles.call(this,side,borders);},getPadding:function(side){return addStyles.call(this,side,paddings);},clip:function(){var me=this,dom=me.dom;if(!data(dom,ISCLIPPED)){data(dom,ISCLIPPED,true);data(dom,ORIGINALCLIP,{o:me.getStyle(OVERFLOW),x:me.getStyle(OVERFLOWX),y:me.getStyle(OVERFLOWY)});me.setStyle(OVERFLOW,HIDDEN);me.setStyle(OVERFLOWX,HIDDEN);me.setStyle(OVERFLOWY,HIDDEN);}
return me;},unclip:function(){var me=this,dom=me.dom;if(data(dom,ISCLIPPED)){data(dom,ISCLIPPED,false);var o=data(dom,ORIGINALCLIP);if(o.o){me.setStyle(OVERFLOW,o.o);}
if(o.x){me.setStyle(OVERFLOWX,o.x);}
if(o.y){me.setStyle(OVERFLOWY,o.y);}}
return me;},addStyles:addStyles,margins:margins}}());

(function(){var D=Ext.lib.Dom,LEFT="left",RIGHT="right",TOP="top",BOTTOM="bottom",POSITION="position",STATIC="static",RELATIVE="relative",AUTO="auto",ZINDEX="z-index";function animTest(args,animate,i){return this.preanim&&!!animate?this.preanim(args,i):false}
Ext.Element.addMethods({getX:function(){return D.getX(this.dom);},getY:function(){return D.getY(this.dom);},getXY:function(){return D.getXY(this.dom);},getOffsetsTo:function(el){var o=this.getXY(),e=Ext.fly(el,'_internal').getXY();return[o[0]-e[0],o[1]-e[1]];},setX:function(x,animate){return this.setXY([x,this.getY()],animTest.call(this,arguments,animate,1));},setY:function(y,animate){return this.setXY([this.getX(),y],animTest.call(this,arguments,animate,1));},setLeft:function(left){this.setStyle(LEFT,this.addUnits(left));return this;},setTop:function(top){this.setStyle(TOP,this.addUnits(top));return this;},setRight:function(right){this.setStyle(RIGHT,this.addUnits(right));return this;},setBottom:function(bottom){this.setStyle(BOTTOM,this.addUnits(bottom));return this;},setXY:function(pos,animate){var me=this;if(!animate||!me.anim){D.setXY(me.dom,pos);}else{me.anim({points:{to:pos}},me.preanim(arguments,1),'motion');}
return me;},setLocation:function(x,y,animate){return this.setXY([x,y],animTest.call(this,arguments,animate,2));},moveTo:function(x,y,animate){return this.setXY([x,y],animTest.call(this,arguments,animate,2));},getLeft:function(local){return!local?this.getX():parseInt(this.getStyle(LEFT),10)||0;},getRight:function(local){var me=this;return!local?me.getX()+me.getWidth():(me.getLeft(true)+me.getWidth())||0;},getTop:function(local){return!local?this.getY():parseInt(this.getStyle(TOP),10)||0;},getBottom:function(local){var me=this;return!local?me.getY()+me.getHeight():(me.getTop(true)+me.getHeight())||0;},position:function(pos,zIndex,x,y){var me=this;if(!pos&&me.isStyle(POSITION,STATIC)){me.setStyle(POSITION,RELATIVE);}else if(pos){me.setStyle(POSITION,pos);}
if(zIndex){me.setStyle(ZINDEX,zIndex);}
if(x||y)me.setXY([x||false,y||false]);},clearPositioning:function(value){value=value||'';this.setStyle({left:value,right:value,top:value,bottom:value,"z-index":"",position:STATIC});return this;},getPositioning:function(){var l=this.getStyle(LEFT);var t=this.getStyle(TOP);return{"position":this.getStyle(POSITION),"left":l,"right":l?"":this.getStyle(RIGHT),"top":t,"bottom":t?"":this.getStyle(BOTTOM),"z-index":this.getStyle(ZINDEX)};},setPositioning:function(pc){var me=this,style=me.dom.style;me.setStyle(pc);if(pc.right==AUTO){style.right="";}
if(pc.bottom==AUTO){style.bottom="";}
return me;},translatePoints:function(x,y){y=isNaN(x[1])?y:x[1];x=isNaN(x[0])?x:x[0];var me=this,relative=me.isStyle(POSITION,RELATIVE),o=me.getXY(),l=parseInt(me.getStyle(LEFT),10),t=parseInt(me.getStyle(TOP),10);l=!isNaN(l)?l:(relative?0:me.dom.offsetLeft);t=!isNaN(t)?t:(relative?0:me.dom.offsetTop);return{left:(x-o[0]+l),top:(y-o[1]+t)};},animTest:animTest});})();

Ext.Element.addMethods({isScrollable:function(){var dom=this.dom;return dom.scrollHeight>dom.clientHeight||dom.scrollWidth>dom.clientWidth;},scrollTo:function(side,value){this.dom["scroll"+(/top/i.test(side)?"Top":"Left")]=value;return this;},getScroll:function(){var d=this.dom,doc=document,body=doc.body,docElement=doc.documentElement,l,t,ret;if(d==doc||d==body){if(Ext.isIE&&Ext.isStrict){l=docElement.scrollLeft;t=docElement.scrollTop;}else{l=window.pageXOffset;t=window.pageYOffset;}
ret={left:l||(body?body.scrollLeft:0),top:t||(body?body.scrollTop:0)};}else{ret={left:d.scrollLeft,top:d.scrollTop};}
return ret;}});

Ext.Element.VISIBILITY=1;Ext.Element.DISPLAY=2;Ext.Element.addMethods(function(){var VISIBILITY="visibility",DISPLAY="display",HIDDEN="hidden",NONE="none",ORIGINALDISPLAY='originalDisplay',VISMODE='visibilityMode',ELDISPLAY=Ext.Element.DISPLAY,data=Ext.Element.data,getDisplay=function(dom){var d=data(dom,ORIGINALDISPLAY);if(d===undefined){data(dom,ORIGINALDISPLAY,d='');}
return d;},getVisMode=function(dom){var m=data(dom,VISMODE);if(m===undefined){data(dom,VISMODE,m=1)}
return m;};return{originalDisplay:"",visibilityMode:1,setVisibilityMode:function(visMode){data(this.dom,VISMODE,visMode);return this;},animate:function(args,duration,onComplete,easing,animType){this.anim(args,{duration:duration,callback:onComplete,easing:easing},animType);return this;},anim:function(args,opt,animType,defaultDur,defaultEase,cb){animType=animType||'run';opt=opt||{};var me=this,anim=Ext.lib.Anim[animType](me.dom,args,(opt.duration||defaultDur)||.35,(opt.easing||defaultEase)||'easeOut',function(){if(cb)cb.call(me);if(opt.callback)opt.callback.call(opt.scope||me,me,opt);},me);opt.anim=anim;return anim;},preanim:function(a,i){return!a[i]?false:(Ext.isObject(a[i])?a[i]:{duration:a[i+1],callback:a[i+2],easing:a[i+3]});},isVisible:function(){return!this.isStyle(VISIBILITY,HIDDEN)&&!this.isStyle(DISPLAY,NONE);},setVisible:function(visible,animate){var me=this,dom=me.dom,isDisplay=getVisMode(this.dom)==ELDISPLAY;if(!animate||!me.anim){if(isDisplay){me.setDisplayed(visible);}else{me.fixDisplay();dom.style.visibility=visible?"visible":HIDDEN;}}else{if(visible){me.setOpacity(.01);me.setVisible(true);}
me.anim({opacity:{to:(visible?1:0)}},me.preanim(arguments,1),null,.35,'easeIn',function(){if(!visible){dom.style[isDisplay?DISPLAY:VISIBILITY]=(isDisplay)?NONE:HIDDEN;Ext.fly(dom).setOpacity(1);}});}
return me;},toggle:function(animate){var me=this;me.setVisible(!me.isVisible(),me.preanim(arguments,0));return me;},setDisplayed:function(value){if(typeof value=="boolean"){value=value?getDisplay(this.dom):NONE;}
this.setStyle(DISPLAY,value);return this;},fixDisplay:function(){var me=this;if(me.isStyle(DISPLAY,NONE)){me.setStyle(VISIBILITY,HIDDEN);me.setStyle(DISPLAY,getDisplay(this.dom));if(me.isStyle(DISPLAY,NONE)){me.setStyle(DISPLAY,"block");}}},hide:function(animate){this.setVisible(false,this.preanim(arguments,0));return this;},show:function(animate){this.setVisible(true,this.preanim(arguments,0));return this;}}}());

(function(){var NULL=null,UNDEFINED=undefined,TRUE=true,FALSE=false,SETX="setX",SETY="setY",SETXY="setXY",LEFT="left",BOTTOM="bottom",TOP="top",RIGHT="right",HEIGHT="height",WIDTH="width",POINTS="points",HIDDEN="hidden",ABSOLUTE="absolute",VISIBLE="visible",MOTION="motion",POSITION="position",EASEOUT="easeOut",flyEl=new Ext.Element.Flyweight(),queues={},getObject=function(o){return o||{};},fly=function(dom){flyEl.dom=dom;flyEl.id=Ext.id(dom);return flyEl;},getQueue=function(id){if(!queues[id]){queues[id]=[];}
return queues[id];},setQueue=function(id,value){queues[id]=value;};Ext.enableFx=TRUE;Ext.Fx={switchStatements:function(key,fn,argHash){return fn.apply(this,argHash[key]);},slideIn:function(anchor,o){o=getObject(o);var me=this,dom=me.dom,st=dom.style,xy,r,b,wrap,after,st,args,pt,bw,bh;anchor=anchor||"t";me.queueFx(o,function(){xy=fly(dom).getXY();fly(dom).fixDisplay();r=fly(dom).getFxRestore();b={x:xy[0],y:xy[1],0:xy[0],1:xy[1],width:dom.offsetWidth,height:dom.offsetHeight};b.right=b.x+b.width;b.bottom=b.y+b.height;fly(dom).setWidth(b.width).setHeight(b.height);wrap=fly(dom).fxWrap(r.pos,o,HIDDEN);st.visibility=VISIBLE;st.position=ABSOLUTE;function after(){fly(dom).fxUnwrap(wrap,r.pos,o);st.width=r.width;st.height=r.height;fly(dom).afterFx(o);}
pt={to:[b.x,b.y]};bw={to:b.width};bh={to:b.height};function argCalc(wrap,style,ww,wh,sXY,sXYval,s1,s2,w,h,p){var ret={};fly(wrap).setWidth(ww).setHeight(wh);if(fly(wrap)[sXY]){fly(wrap)[sXY](sXYval);}
style[s1]=style[s2]="0";if(w){ret.width=w};if(h){ret.height=h;}
if(p){ret.points=p;}
return ret;};args=fly(dom).switchStatements(anchor.toLowerCase(),argCalc,{t:[wrap,st,b.width,0,NULL,NULL,LEFT,BOTTOM,NULL,bh,NULL],l:[wrap,st,0,b.height,NULL,NULL,RIGHT,TOP,bw,NULL,NULL],r:[wrap,st,b.width,b.height,SETX,b.right,LEFT,TOP,NULL,NULL,pt],b:[wrap,st,b.width,b.height,SETY,b.bottom,LEFT,TOP,NULL,bh,pt],tl:[wrap,st,0,0,NULL,NULL,RIGHT,BOTTOM,bw,bh,pt],bl:[wrap,st,0,0,SETY,b.y+b.height,RIGHT,TOP,bw,bh,pt],br:[wrap,st,0,0,SETXY,[b.right,b.bottom],LEFT,TOP,bw,bh,pt],tr:[wrap,st,0,0,SETX,b.x+b.width,LEFT,BOTTOM,bw,bh,pt]});st.visibility=VISIBLE;fly(wrap).show();arguments.callee.anim=fly(wrap).fxanim(args,o,MOTION,.5,EASEOUT,after);});return me;},slideOut:function(anchor,o){o=getObject(o);var me=this,dom=me.dom,st=dom.style,xy=me.getXY(),wrap,r,b,a,zero={to:0};anchor=anchor||"t";me.queueFx(o,function(){r=fly(dom).getFxRestore();b={x:xy[0],y:xy[1],0:xy[0],1:xy[1],width:dom.offsetWidth,height:dom.offsetHeight};b.right=b.x+b.width;b.bottom=b.y+b.height;fly(dom).setWidth(b.width).setHeight(b.height);wrap=fly(dom).fxWrap(r.pos,o,VISIBLE);st.visibility=VISIBLE;st.position=ABSOLUTE;fly(wrap).setWidth(b.width).setHeight(b.height);function after(){o.useDisplay?fly(dom).setDisplayed(FALSE):fly(dom).hide();fly(dom).fxUnwrap(wrap,r.pos,o);st.width=r.width;st.height=r.height;fly(dom).afterFx(o);}
function argCalc(style,s1,s2,p1,v1,p2,v2,p3,v3){var ret={};style[s1]=style[s2]="0";ret[p1]=v1;if(p2){ret[p2]=v2;}
if(p3){ret[p3]=v3;}
return ret;};a=fly(dom).switchStatements(anchor.toLowerCase(),argCalc,{t:[st,LEFT,BOTTOM,HEIGHT,zero],l:[st,RIGHT,TOP,WIDTH,zero],r:[st,LEFT,TOP,WIDTH,zero,POINTS,{to:[b.right,b.y]}],b:[st,LEFT,TOP,HEIGHT,zero,POINTS,{to:[b.x,b.bottom]}],tl:[st,RIGHT,BOTTOM,WIDTH,zero,HEIGHT,zero],bl:[st,RIGHT,TOP,WIDTH,zero,HEIGHT,zero,POINTS,{to:[b.x,b.bottom]}],br:[st,LEFT,TOP,WIDTH,zero,HEIGHT,zero,POINTS,{to:[b.x+b.width,b.bottom]}],tr:[st,LEFT,BOTTOM,WIDTH,zero,HEIGHT,zero,POINTS,{to:[b.right,b.y]}]});arguments.callee.anim=fly(wrap).fxanim(a,o,MOTION,.5,EASEOUT,after);});return me;},puff:function(o){o=getObject(o);var me=this,dom=me.dom,st=dom.style,width,height,r;me.queueFx(o,function(){width=fly(dom).getWidth();height=fly(dom).getHeight();fly(dom).clearOpacity();fly(dom).show();r=fly(dom).getFxRestore();function after(){o.useDisplay?fly(dom).setDisplayed(FALSE):fly(dom).hide();fly(dom).clearOpacity();fly(dom).setPositioning(r.pos);st.width=r.width;st.height=r.height;st.fontSize='';fly(dom).afterFx(o);}
arguments.callee.anim=fly(dom).fxanim({width:{to:fly(dom).adjustWidth(width*2)},height:{to:fly(dom).adjustHeight(height*2)},points:{by:[-width*.5,-height*.5]},opacity:{to:0},fontSize:{to:200,unit:"%"}},o,MOTION,.5,EASEOUT,after);});return me;},switchOff:function(o){o=getObject(o);var me=this,dom=me.dom,st=dom.style,r;me.queueFx(o,function(){fly(dom).clearOpacity();fly(dom).clip();r=fly(dom).getFxRestore();function after(){o.useDisplay?fly(dom).setDisplayed(FALSE):fly(dom).hide();fly(dom).clearOpacity();fly(dom).setPositioning(r.pos);st.width=r.width;st.height=r.height;fly(dom).afterFx(o);};fly(dom).fxanim({opacity:{to:0.3}},NULL,NULL,.1,NULL,function(){fly(dom).clearOpacity();(function(){fly(dom).fxanim({height:{to:1},points:{by:[0,fly(dom).getHeight()*.5]}},o,MOTION,0.3,'easeIn',after);}).defer(100);});});return me;},highlight:function(color,o){o=getObject(o);var me=this,dom=me.dom,attr=o.attr||"backgroundColor",a={},restore;me.queueFx(o,function(){fly(dom).clearOpacity();fly(dom).show();function after(){dom.style[attr]=restore;fly(dom).afterFx(o);}
restore=dom.style[attr];a[attr]={from:color||"ffff9c",to:o.endColor||fly(dom).getColor(attr)||"ffffff"};arguments.callee.anim=fly(dom).fxanim(a,o,'color',1,'easeIn',after);});return me;},frame:function(color,count,o){o=getObject(o);var me=this,dom=me.dom,proxy,active;me.queueFx(o,function(){color=color||"#C3DAF9"
if(color.length==6){color="#"+color;}
count=count||1;fly(dom).show();var xy=fly(dom).getXY(),b={x:xy[0],y:xy[1],0:xy[0],1:xy[1],width:dom.offsetWidth,height:dom.offsetHeight},queue=function(){proxy=fly(document.body||document.documentElement).createChild({style:{visbility:HIDDEN,position:ABSOLUTE,"z-index":35000,border:"0px solid "+color}});return proxy.queueFx({},animFn);};arguments.callee.anim={isAnimated:true,stop:function(){count=0;proxy.stopFx();}};function animFn(){var scale=Ext.isBorderBox?2:1;active=proxy.anim({top:{from:b.y,to:b.y-20},left:{from:b.x,to:b.x-20},borderWidth:{from:0,to:10},opacity:{from:1,to:0},height:{from:b.height,to:b.height+20*scale},width:{from:b.width,to:b.width+20*scale}},{duration:o.duration||1,callback:function(){proxy.remove();--count>0?queue():fly(dom).afterFx(o);}});arguments.callee.anim={isAnimated:true,stop:function(){active.stop();}};};queue();});return me;},pause:function(seconds){var dom=this.dom,t;this.queueFx({},function(){t=setTimeout(function(){fly(dom).afterFx({});},seconds*1000);arguments.callee.anim={isAnimated:true,stop:function(){clearTimeout(t);fly(dom).afterFx({});}};});return this;},fadeIn:function(o){o=getObject(o);var me=this,dom=me.dom,to=o.endOpacity||1;me.queueFx(o,function(){fly(dom).setOpacity(0);fly(dom).fixDisplay();dom.style.visibility=VISIBLE;arguments.callee.anim=fly(dom).fxanim({opacity:{to:to}},o,NULL,.5,EASEOUT,function(){if(to==1){fly(dom).clearOpacity();}
fly(dom).afterFx(o);});});return me;},fadeOut:function(o){o=getObject(o);var me=this,dom=me.dom,style=dom.style,to=o.endOpacity||0;me.queueFx(o,function(){arguments.callee.anim=fly(dom).fxanim({opacity:{to:to}},o,NULL,.5,EASEOUT,function(){if(to==0){Ext.Element.data(dom,'visibilityMode')==Ext.Element.DISPLAY||o.useDisplay?style.display="none":style.visibility=HIDDEN;fly(dom).clearOpacity();}
fly(dom).afterFx(o);});});return me;},scale:function(w,h,o){this.shift(Ext.apply({},o,{width:w,height:h}));return this;},shift:function(o){o=getObject(o);var dom=this.dom,a={};this.queueFx(o,function(){for(var prop in o){if(o[prop]!=UNDEFINED){a[prop]={to:o[prop]};}}
a.width?a.width.to=fly(dom).adjustWidth(o.width):a;a.height?a.height.to=fly(dom).adjustWidth(o.height):a;if(a.x||a.y||a.xy){a.points=a.xy||{to:[a.x?a.x.to:fly(dom).getX(),a.y?a.y.to:fly(dom).getY()]};}
arguments.callee.anim=fly(dom).fxanim(a,o,MOTION,.35,EASEOUT,function(){fly(dom).afterFx(o);});});return this;},ghost:function(anchor,o){o=getObject(o);var me=this,dom=me.dom,st=dom.style,a={opacity:{to:0},points:{}},pt=a.points,r,w,h;anchor=anchor||"b";me.queueFx(o,function(){r=fly(dom).getFxRestore();w=fly(dom).getWidth();h=fly(dom).getHeight();function after(){o.useDisplay?fly(dom).setDisplayed(FALSE):fly(dom).hide();fly(dom).clearOpacity();fly(dom).setPositioning(r.pos);st.width=r.width;st.height=r.height;fly(dom).afterFx(o);}
pt.by=fly(dom).switchStatements(anchor.toLowerCase(),function(v1,v2){return[v1,v2];},{t:[0,-h],l:[-w,0],r:[w,0],b:[0,h],tl:[-w,-h],bl:[-w,h],br:[w,h],tr:[w,-h]});arguments.callee.anim=fly(dom).fxanim(a,o,MOTION,.5,EASEOUT,after);});return me;},syncFx:function(){var me=this;me.fxDefaults=Ext.apply(me.fxDefaults||{},{block:FALSE,concurrent:TRUE,stopFx:FALSE});return me;},sequenceFx:function(){var me=this;me.fxDefaults=Ext.apply(me.fxDefaults||{},{block:FALSE,concurrent:FALSE,stopFx:FALSE});return me;},nextFx:function(){var ef=getQueue(this.dom.id)[0];if(ef){ef.call(this);}},hasActiveFx:function(){return getQueue(this.dom.id)[0];},stopFx:function(finish){var me=this,id=me.dom.id;if(me.hasActiveFx()){var cur=getQueue(id)[0];if(cur&&cur.anim){if(cur.anim.isAnimated){setQueue(id,[cur]);cur.anim.stop(finish!==undefined?finish:TRUE);}else{setQueue(id,[]);}}}
return me;},beforeFx:function(o){if(this.hasActiveFx()&&!o.concurrent){if(o.stopFx){this.stopFx();return TRUE;}
return FALSE;}
return TRUE;},hasFxBlock:function(){var q=getQueue(this.dom.id);return q&&q[0]&&q[0].block;},queueFx:function(o,fn){var me=this;if(!me.hasFxBlock()){Ext.applyIf(o,me.fxDefaults);if(!o.concurrent){var run=me.beforeFx(o);fn.block=o.block;getQueue(me.dom.id).push(fn);if(run){me.nextFx();}}else{fn.call(me);}}
return me;},fxWrap:function(pos,o,vis){var dom=this.dom,wrap,wrapXY;if(!o.wrap||!(wrap=Ext.getDom(o.wrap))){if(o.fixPosition){wrapXY=fly(dom).getXY();}
var div=document.createElement("div");div.style.visibility=vis;wrap=dom.parentNode.insertBefore(div,dom);fly(wrap).setPositioning(pos);if(fly(wrap).isStyle(POSITION,"static")){fly(wrap).position("relative");}
fly(dom).clearPositioning('auto');fly(wrap).clip();wrap.appendChild(dom);if(wrapXY){fly(wrap).setXY(wrapXY);}}
return wrap;},fxUnwrap:function(wrap,pos,o){var dom=this.dom;fly(dom).clearPositioning();fly(dom).setPositioning(pos);if(!o.wrap){wrap.parentNode.insertBefore(dom,wrap);fly(wrap).remove();}},getFxRestore:function(){var st=this.dom.style;return{pos:this.getPositioning(),width:st.width,height:st.height};},afterFx:function(o){var dom=this.dom,id=dom.id,notConcurrent=!o.concurrent;if(o.afterStyle){fly(dom).setStyle(o.afterStyle);}
if(o.afterCls){fly(dom).addClass(o.afterCls);}
if(o.remove==TRUE){fly(dom).remove();}
if(notConcurrent){getQueue(id).shift();}
if(o.callback){o.callback.call(o.scope,fly(dom));}
if(notConcurrent){fly(dom).nextFx();}},fxanim:function(args,opt,animType,defaultDur,defaultEase,cb){animType=animType||'run';opt=opt||{};var anim=Ext.lib.Anim[animType](this.dom,args,(opt.duration||defaultDur)||.35,(opt.easing||defaultEase)||EASEOUT,cb,this);opt.anim=anim;return anim;}};Ext.Fx.resize=Ext.Fx.scale;Ext.Element.addMethods(Ext.Fx);})();

Ext.CompositeElementLite=function(els,root){this.elements=[];this.add(els,root);this.el=new Ext.Element.Flyweight();};Ext.CompositeElementLite.prototype={isComposite:true,getCount:function(){return this.elements.length;},add:function(els){if(els){if(Ext.isArray(els)){this.elements=this.elements.concat(els);}else{var yels=this.elements;Ext.each(els,function(e){yels.push(e);});}}
return this;},invoke:function(fn,args){var els=this.elements,el=this.el;Ext.each(els,function(e){el.dom=e;Ext.Element.prototype[fn].apply(el,args);});return this;},item:function(index){var me=this;if(!me.elements[index]){return null;}
me.el.dom=me.elements[index];return me.el;},addListener:function(eventName,handler,scope,opt){Ext.each(this.elements,function(e){Ext.EventManager.on(e,eventName,handler,scope||e,opt);});return this;},each:function(fn,scope){var me=this,el=me.el;Ext.each(me.elements,function(e,i){el.dom=e;return fn.call(scope||el,el,me,i);});return me;},indexOf:function(el){return this.elements.indexOf(Ext.getDom(el));},replaceElement:function(el,replacement,domReplace){var index=!isNaN(el)?el:this.indexOf(el),d;if(index>-1){replacement=Ext.getDom(replacement);if(domReplace){d=this.elements[index];d.parentNode.insertBefore(replacement,d);Ext.removeNode(d);}
this.elements.splice(index,1,replacement);}
return this;},clear:function(){this.elements=[];}};Ext.CompositeElementLite.prototype.on=Ext.CompositeElementLite.prototype.addListener;(function(){var fnName,ElProto=Ext.Element.prototype,CelProto=Ext.CompositeElementLite.prototype;for(fnName in ElProto){if(Ext.isFunction(ElProto[fnName])){(function(fnName){CelProto[fnName]=CelProto[fnName]||function(){return this.invoke(fnName,arguments);};}).call(CelProto,fnName);}}})();if(Ext.DomQuery){Ext.Element.selectorFunction=Ext.DomQuery.select;}
Ext.Element.select=function(selector,unique,root){var els;if(typeof selector=="string"){els=Ext.Element.selectorFunction(selector,root);}else if(selector.length!==undefined){els=selector;}else{throw"Invalid selector";}
return new Ext.CompositeElementLite(els);};Ext.select=Ext.Element.select;

(function(){var BEFOREREQUEST="beforerequest",REQUESTCOMPLETE="requestcomplete",REQUESTEXCEPTION="requestexception",UNDEFINED=undefined,LOAD='load',POST='POST',GET='GET',WINDOW=window;Ext.data.Connection=function(config){Ext.apply(this,config);this.addEvents(BEFOREREQUEST,REQUESTCOMPLETE,REQUESTEXCEPTION);Ext.data.Connection.superclass.constructor.call(this);};function handleResponse(response){this.transId=false;var options=response.argument.options;response.argument=options?options.argument:null;this.fireEvent(REQUESTCOMPLETE,this,response,options);if(options.success){options.success.call(options.scope,response,options);}
if(options.callback){options.callback.call(options.scope,options,true,response);}}
function handleFailure(response,e){this.transId=false;var options=response.argument.options;response.argument=options?options.argument:null;this.fireEvent(REQUESTEXCEPTION,this,response,options,e);if(options.failure){options.failure.call(options.scope,response,options);}
if(options.callback){options.callback.call(options.scope,options,false,response);}}
function doFormUpload(o,ps,url){var id=Ext.id(),doc=document,frame=doc.createElement('iframe'),form=Ext.getDom(o.form),hiddens=[],hd,encoding='multipart/form-data',buf={target:form.target,method:form.method,encoding:form.encoding,enctype:form.enctype,action:form.action};Ext.apply(frame,{id:id,name:id,className:'x-hidden',src:Ext.SSL_SECURE_URL});doc.body.appendChild(frame);if(Ext.isIE){document.frames[id].name=id;}
Ext.apply(form,{target:id,method:POST,enctype:encoding,encoding:encoding,action:url||buf.action});ps=Ext.urlDecode(ps,false);for(var k in ps){if(ps.hasOwnProperty(k)){hd=doc.createElement('input');hd.type='hidden';hd.value=ps[hd.name=k];form.appendChild(hd);hiddens.push(hd);}}
function cb(){var me=this,r={responseText:'',responseXML:null,argument:o.argument},doc,firstChild;try{doc=frame.contentWindow.document||frame.contentDocument||WINDOW.frames[id].document;if(doc){if(doc.body){if(/textarea/i.test((firstChild=doc.body.firstChild||{}).tagName)){r.responseText=firstChild.value;}else{r.responseText=doc.body.innerHTML;}}
r.responseXML=doc.XMLDocument||doc;}}
catch(e){}
Ext.EventManager.removeListener(frame,LOAD,cb,me);me.fireEvent(REQUESTCOMPLETE,me,r,o);function runCallback(fn,scope,args){if(Ext.isFunction(fn)){fn.apply(scope,args);}}
runCallback(o.success,o.scope,[r,o]);runCallback(o.callback,o.scope,[o,true,r]);if(!me.debugUploads){setTimeout(function(){Ext.removeNode(frame);},100);}}
Ext.EventManager.on(frame,LOAD,cb,this);form.submit();Ext.apply(form,buf);Ext.each(hiddens,function(h){Ext.removeNode(h);});}
Ext.extend(Ext.data.Connection,Ext.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,disableCachingParam:'_dc',request:function(o){var me=this;if(me.fireEvent(BEFOREREQUEST,me,o)){if(o.el){if(!Ext.isEmpty(o.indicatorText)){me.indicatorText='<div class="loading-indicator">'+o.indicatorText+"</div>";}
if(me.indicatorText){Ext.getDom(o.el).innerHTML=me.indicatorText;}
o.success=(Ext.isFunction(o.success)?o.success:function(){}).createInterceptor(function(response){Ext.getDom(o.el).innerHTML=response.responseText;});}
var p=o.params,url=o.url||me.url,method,cb={success:handleResponse,failure:handleFailure,scope:me,argument:{options:o},timeout:o.timeout||me.timeout},form,serForm;if(Ext.isFunction(p)){p=p.call(o.scope||WINDOW,o);}
p=Ext.urlEncode(me.extraParams,Ext.isObject(p)?Ext.urlEncode(p):p);if(Ext.isFunction(url)){url=url.call(o.scope||WINDOW,o);}
if((form=Ext.getDom(o.form))){url=url||form.action;if(o.isUpload||/multipart\/form-data/i.test(form.getAttribute("enctype"))){return doFormUpload.call(me,o,p,url);}
serForm=Ext.lib.Ajax.serializeForm(form);p=p?(p+'&'+serForm):serForm;}
method=o.method||me.method||((p||o.xmlData||o.jsonData)?POST:GET);if(method===GET&&(me.disableCaching&&o.disableCaching!==false)||o.disableCaching===true){var dcp=o.disableCachingParam||me.disableCachingParam;url=Ext.urlAppend(url,dcp+'='+(new Date().getTime()));}
o.headers=Ext.apply(o.headers||{},me.defaultHeaders||{});if(o.autoAbort===true||me.autoAbort){me.abort();}
if((method==GET||o.xmlData||o.jsonData)&&p){url=Ext.urlAppend(url,p);p='';}
return(me.transId=Ext.lib.Ajax.request(method,url,cb,p,o));}else{return o.callback?o.callback.apply(o.scope,[o,UNDEFINED,UNDEFINED]):null;}},isLoading:function(transId){return transId?Ext.lib.Ajax.isCallInProgress(transId):!!this.transId;},abort:function(transId){if(transId||this.isLoading()){Ext.lib.Ajax.abort(transId||this.transId);}}});})();Ext.Ajax=new Ext.data.Connection({autoAbort:false,serializeForm:function(form){return Ext.lib.Ajax.serializeForm(form);}});

Ext.util.DelayedTask=function(fn,scope,args){var me=this,id,call=function(){clearInterval(id);id=null;fn.apply(scope,args||[]);};me.delay=function(delay,newFn,newScope,newArgs){me.cancel();fn=newFn||fn;scope=newScope||scope;args=newArgs||args;id=setInterval(call,delay);};me.cancel=function(){if(id){clearInterval(id);id=null;}};};

Ext.util.JSON=new(function(){var useHasOwn=!!{}.hasOwnProperty,isNative=function(){var useNative=null;return function(){if(useNative===null){useNative=Ext.USE_NATIVE_JSON&&window.JSON&&JSON.toString()=='[object JSON]';}
return useNative;};}(),pad=function(n){return n<10?"0"+n:n;},doDecode=function(json){return eval("("+json+')');},doEncode=function(o){if(typeof o=="undefined"||o===null){return"null";}else if(Ext.isArray(o)){return encodeArray(o);}else if(Object.prototype.toString.apply(o)==='[object Date]'){return Ext.util.JSON.encodeDate(o);}else if(typeof o=="string"){return encodeString(o);}else if(typeof o=="number"){return isFinite(o)?String(o):"null";}else if(typeof o=="boolean"){return String(o);}else{var a=["{"],b,i,v;for(i in o){if(!useHasOwn||o.hasOwnProperty(i)){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(',');}
a.push(doEncode(i),":",v===null?"null":doEncode(v));b=true;}}}
a.push("}");return a.join("");}},m={"\b":'\\b',"\t":'\\t',"\n":'\\n',"\f":'\\f',"\r":'\\r','"':'\\"',"\\":'\\\\'},encodeString=function(s){if(/["\\\x00-\x1f]/.test(s)){return'"'+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return"\\u00"+
Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+s+'"';},encodeArray=function(o){var a=["["],b,i,l=o.length,v;for(i=0;i<l;i+=1){v=o[i];switch(typeof v){case"undefined":case"function":case"unknown":break;default:if(b){a.push(',');}
a.push(v===null?"null":Ext.util.JSON.encode(v));b=true;}}
a.push("]");return a.join("");};this.encodeDate=function(o){return'"'+o.getFullYear()+"-"+
pad(o.getMonth()+1)+"-"+
pad(o.getDate())+"T"+
pad(o.getHours())+":"+
pad(o.getMinutes())+":"+
pad(o.getSeconds())+'"';};this.encode=function(){var ec;return function(o){if(!ec){ec=isNative()?JSON.stringify:doEncode;}
return ec(o);};}();this.decode=function(){var dc;return function(json){if(!dc){dc=isNative()?JSON.parse:doDecode;}
return dc(json);};}();})();Ext.encode=Ext.util.JSON.encode;Ext.decode=Ext.util.JSON.decode;


function dialogError(text) {

	alert(text);
}
function showForm() {
	$("#call").dialog('open');
}
function callbackpostForm() {
        
	Ext.Ajax.request({
		url : '/form.php',
		form : 'callback',
		method : 'post',
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#fade, #container2').css('display', 'none');
				$('html,body').removeClass('hd');
				$('#callback').trigger('reset');
				dialogError('Спасибо. Ждите звонка в указанное время');
				yaCounter26072727.reachGoal('obratnii_zvonok');
			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}

function callbackpostForm2() {

	Ext.Ajax.request({
		url : '/form.php',
		form : 'callback2',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#fade, #container2, #container3').css('display', 'none');
				$('html,body').removeClass('hd');
				dialogError('Спасибо. Ваша заявка успешно отправлена');
				yaCounter26072727.reachGoal('zayavka_na_remont');
			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}

function callbackpostForm3() {

	Ext.Ajax.request({
		url : '/form2.php',
		form : 'zayvka1',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {

				$('#mask, .window').hide();
				dialogError('Спасибо. Ваша заявка успешно отправлена');

			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}
function next_reviews() {

	Ext.Ajax.request({
		url : '/',
		form : 'reviews',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {

			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

		}
	});

}
function send_rem() {

	Ext.Ajax.request({
		url : '/form3.php',
		form : 'order_rem',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#order_rem').trigger('reset');
				dialogError('Спасибо. Ваша заявка успешно отправлена');
				yaCounter26072727.reachGoal('zayavka_is_gallerii');
			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}

function callbackpostForm123() {
	Ext.Ajax.request({
		url : '/sform.php',
		form : 'sform',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {
			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#sform').trigger('reset');
				dialogError('Спасибо. Ваша заявка успешно отправлена');
			} else {
				if (res.msg) {
					dialogError(res.msg);
				} else {
					alert(o.responseText);
				}
			}
		},
		failure : function() {
			dialogError('Во время отправки данных произошла ошибка.');
		}
	});
}

/******************************************************************************
Name:    Highslide JS
Version: 4.1.8 (October 27 2009)
Config:  default +events +unobtrusive +imagemap +slideshow +positioning +transitions +viewport +thumbstrip +inline +ajax +iframe +flash
Author:  Torstein HГёnsi
Support: http://highslide.com/support

Licence:
Highslide JS is licensed under a Creative Commons Attribution-NonCommercial 2.5
License (http://creativecommons.org/licenses/by-nc/2.5/).

You are free:
	* to copy, distribute, display, and perform the work
	* to make derivative works

Under the following conditions:
	* Attribution. You must attribute the work in the manner  specified by  the
	  author or licensor.
	* Noncommercial. You may not use this work for commercial purposes.

* For  any  reuse  or  distribution, you  must make clear to others the license
  terms of this work.
* Any  of  these  conditions  can  be  waived  if  you  get permission from the 
  copyright holder.

Your fair use and other rights are in no way affected by the above.
******************************************************************************/
if (!hs) { var hs = {
// Language strings
lang : {
	cssDirection: 'ltr',
	loadingText : 'Loading...',
	loadingTitle : 'Click to cancel',
	focusTitle : 'Click to bring to front',
	fullExpandTitle : 'Expand to actual size (f)',
	creditsText : '',
	creditsTitle : 'Go to the Highslide JS homepage',
	previousText : 'Previous',
	nextText : 'Next', 
	moveText : 'Move',
	closeText : 'Close', 
	closeTitle : 'Close (esc)', 
	resizeTitle : 'Resize',
	playText : 'Play',
	playTitle : 'Play slideshow (spacebar)',
	pauseText : 'Pause',
	pauseTitle : 'Pause slideshow (spacebar)',
	previousTitle : 'Previous (arrow left)',
	nextTitle : 'Next (arrow right)',
	moveTitle : 'Move',
	fullExpandText : '1:1',
	number: 'Image %1 of %2',
	restoreTitle : 'Click to close image, click and drag to move. Use arrow keys for next and previous.'
},
// See http://highslide.com/ref for examples of settings  
graphicsDir : '/highslide/graphics/',
expandCursor : 'zoomin.cur', // null disables
restoreCursor : 'zoomout.cur', // null disables
expandDuration : 250, // milliseconds
restoreDuration : 250,
marginLeft : 15,
marginRight : 15,
marginTop : 15,
marginBottom : 15,
zIndexCounter : 1001, // adjust to other absolutely positioned elements
loadingOpacity : 0.75,
allowMultipleInstances: true,
numberOfImagesToPreload : 5,
outlineWhileAnimating : 2, // 0 = never, 1 = always, 2 = HTML only 
outlineStartOffset : 3, // ends at 10
padToMinWidth : false, // pad the popup width to make room for wide caption
fullExpandPosition : 'bottom right',
fullExpandOpacity : 1,
showCredits : false, // you can set this to false if you want
creditsHref : 'http://highslide.com/',
creditsTarget : '_self',
enableKeyListener : true,
openerTagNames : ['a', 'area'], // Add more to allow slideshow indexing
transitions : [],
transitionDuration: 250,
dimmingOpacity: 0.8, // Lightbox style dimming background
dimmingDuration: 50, // 0 for instant dimming

allowWidthReduction : false,
allowHeightReduction : true,
preserveContent : true, // Preserve changes made to the content and position of HTML popups.
objectLoadTime : 'before', // Load iframes 'before' or 'after' expansion.
cacheAjax : true, // Cache ajax popups for instant display. Can be overridden for each popup.
anchor : 'auto', // where the image expands from
align : 'center', // position in the client (overrides anchor)
targetX: null, // the id of a target element
targetY: null,
dragByHeading: true,
minWidth: 200,
minHeight: 200,
allowSizeReduction: true, // allow the image to reduce to fit client size. If false, this overrides minWidth and minHeight
outlineType : 'drop-shadow', // set null to disable outlines
skin : {
	controls:
		'<div class="highslide-controls"><ul>'+
			'<li class="highslide-previous">'+
				'<a href="#" title="{hs.lang.previousTitle}">'+
				'<span>{hs.lang.previousText}</span></a>'+
			'</li>'+
			'<li class="highslide-play">'+
				'<a href="#" title="{hs.lang.playTitle}">'+
				'<span>{hs.lang.playText}</span></a>'+
			'</li>'+
			'<li class="highslide-pause">'+
				'<a href="#" title="{hs.lang.pauseTitle}">'+
				'<span>{hs.lang.pauseText}</span></a>'+
			'</li>'+
			'<li class="highslide-next">'+
				'<a href="#" title="{hs.lang.nextTitle}">'+
				'<span>{hs.lang.nextText}</span></a>'+
			'</li>'+
			'<li class="highslide-move">'+
				'<a href="#" title="{hs.lang.moveTitle}">'+
				'<span>{hs.lang.moveText}</span></a>'+
			'</li>'+
			'<li class="highslide-full-expand">'+
				'<a href="#" title="{hs.lang.fullExpandTitle}">'+
				'<span>{hs.lang.fullExpandText}</span></a>'+
			'</li>'+
			'<li class="highslide-close">'+
				'<a href="#" title="{hs.lang.closeTitle}" >'+
				'<span>{hs.lang.closeText}</span></a>'+
			'</li>'+
		'</ul></div>'
	,
	contentWrapper:
		'<div class="highslide-header"><ul>'+
			'<li class="highslide-previous">'+
				'<a href="#" title="{hs.lang.previousTitle}" onclick="return hs.previous(this)">'+
				'<span>{hs.lang.previousText}</span></a>'+
			'</li>'+
			'<li class="highslide-next">'+
				'<a href="#" title="{hs.lang.nextTitle}" onclick="return hs.next(this)">'+
				'<span>{hs.lang.nextText}</span></a>'+
			'</li>'+
			'<li class="highslide-move">'+
				'<a href="#" title="{hs.lang.moveTitle}" onclick="return false">'+
				'<span>{hs.lang.moveText}</span></a>'+
			'</li>'+
			'<li class="highslide-close">'+
				'<a href="#" title="{hs.lang.closeTitle}" onclick="return hs.close(this)">'+
				'<span>{hs.lang.closeText}</span></a>'+
			'</li>'+
		'</ul></div>'+
		'<div class="highslide-body"></div>'+
		'<div class="highslide-footer"><div>'+
			'<span class="highslide-resize" title="{hs.lang.resizeTitle}"><span></span></span>'+
		'</div></div>'
},
// END OF YOUR SETTINGS


// declare internal properties
preloadTheseImages : [],
continuePreloading: true,
expanders : [],
overrides : [
	'allowSizeReduction',
	'useBox',
	'anchor',
	'align',
	'targetX',
	'targetY',
	'outlineType',
	'outlineWhileAnimating',
	'captionId',
	'captionText',
	'captionEval',
	'captionOverlay',
	'headingId',
	'headingText',
	'headingEval',
	'headingOverlay',
	'creditsPosition',
	'dragByHeading',
	'autoplay',
	'numberPosition',
	'transitions',
	'dimmingOpacity',
	
	'width',
	'height',
	
	'contentId',
	'allowWidthReduction',
	'allowHeightReduction',
	'preserveContent',
	'maincontentId',
	'maincontentText',
	'maincontentEval',
	'objectType',	
	'cacheAjax',	
	'objectWidth',
	'objectHeight',
	'objectLoadTime',	
	'swfOptions',
	'wrapperClassName',
	'minWidth',
	'minHeight',
	'maxWidth',
	'maxHeight',
	'slideshowGroup',
	'easing',
	'easingClose',
	'fadeInOut',
	'src'
],
overlays : [],
idCounter : 0,
oPos : {
	x: ['leftpanel', 'left', 'center', 'right', 'rightpanel'],
	y: ['above', 'top', 'middle', 'bottom', 'below']
},
mouse: {},
headingOverlay: {},
captionOverlay: {},
swfOptions: { flashvars: {}, params: {}, attributes: {} },
timers : [],

slideshows : [],

pendingOutlines : {},
sleeping : [],
preloadTheseAjax : [],
cacheBindings : [],
cachedGets : {},
clones : {},
onReady: [],
uaVersion: /Trident\/4\.0/.test(navigator.userAgent) ? 8 :
	parseFloat((navigator.userAgent.toLowerCase().match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1]),
ie : (document.all && !window.opera),
safari : /Safari/.test(navigator.userAgent),
geckoMac : /Macintosh.+rv:1\.[0-8].+Gecko/.test(navigator.userAgent),

$ : function (id) {
	if (id) return document.getElementById(id);
},

push : function (arr, val) {
	arr[arr.length] = val;
},

createElement : function (tag, attribs, styles, parent, nopad) {
	var el = document.createElement(tag);
	if (attribs) hs.extend(el, attribs);
	if (nopad) hs.setStyles(el, {padding: 0, border: 'none', margin: 0});
	if (styles) hs.setStyles(el, styles);
	if (parent) parent.appendChild(el);	
	return el;
},

extend : function (el, attribs) {
	for (var x in attribs) el[x] = attribs[x];
	return el;
},

setStyles : function (el, styles) {
	for (var x in styles) {
		if (hs.ie && x == 'opacity') {
			if (styles[x] > 0.99) el.style.removeAttribute('filter');
			else el.style.filter = 'alpha(opacity='+ (styles[x] * 100) +')';
		}
		else el.style[x] = styles[x];
	}
},
animate: function(el, prop, opt) {
	var start,
		end,
		unit;
	if (typeof opt != 'object' || opt === null) {
		var args = arguments;
		opt = {
			duration: args[2],
			easing: args[3],
			complete: args[4]
		};
	}
	if (typeof opt.duration != 'number') opt.duration = 250;
	opt.easing = Math[opt.easing] || Math.easeInQuad;
	opt.curAnim = hs.extend({}, prop);
	for (var name in prop) {
		var e = new hs.fx(el, opt , name );
		
		start = parseFloat(hs.css(el, name)) || 0;
		end = parseFloat(prop[name]);
		unit = name != 'opacity' ? 'px' : '';
		
		e.custom( start, end, unit );
	}	
},
css: function(el, prop) {
	if (document.defaultView) {
		return document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);

	} else {
		if (prop == 'opacity') prop = 'filter';
		var val = el.currentStyle[prop.replace(/\-(\w)/g, function (a, b){ return b.toUpperCase(); })];
		if (prop == 'filter') 
			val = val.replace(/alpha\(opacity=([0-9]+)\)/, 
				function (a, b) { return b / 100 });
		return val === '' ? 1 : val;
	} 
},

getPageSize : function () {
	var d = document, w = window, iebody = d.compatMode && d.compatMode != 'BackCompat' 
		? d.documentElement : d.body;
	
	var width = hs.ie ? iebody.clientWidth : 
			(d.documentElement.clientWidth || self.innerWidth),
		height = hs.ie ? iebody.clientHeight : self.innerHeight;
	
	hs.page = {
		width: width,
		height: height,		
		scrollLeft: hs.ie ? iebody.scrollLeft : pageXOffset,
		scrollTop: hs.ie ? iebody.scrollTop : pageYOffset
	}
},

getPosition : function(el)	{
	if (/area/i.test(el.tagName)) {
		var imgs = document.getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++) {
			var u = imgs[i].useMap;
			if (u && u.replace(/^.*?#/, '') == el.parentNode.name) {
				el = imgs[i];
				break;
			}
		}
	}
	var p = { x: el.offsetLeft, y: el.offsetTop };
	while (el.offsetParent)	{
		el = el.offsetParent;
		p.x += el.offsetLeft;
		p.y += el.offsetTop;
		if (el != document.body && el != document.documentElement) {
			p.x -= el.scrollLeft;
			p.y -= el.scrollTop;
		}
	}
	return p;
},

expand : function(a, params, custom, type) {
	if (!a) a = hs.createElement('a', null, { display: 'none' }, hs.container);
	if (typeof a.getParams == 'function') return params;
	if (type == 'html') {
		for (var i = 0; i < hs.sleeping.length; i++) {
			if (hs.sleeping[i] && hs.sleeping[i].a == a) {
				hs.sleeping[i].awake();
				hs.sleeping[i] = null;
				return false;
			}
		}
		hs.hasHtmlExpanders = true;
	}	
	try {	
		new hs.Expander(a, params, custom, type);
		return false;
	} catch (e) { return true; }
},

htmlExpand : function(a, params, custom) {
	return hs.expand(a, params, custom, 'html');
},

getSelfRendered : function() {
	return hs.createElement('div', { 
		className: 'highslide-html-content', 
		innerHTML: hs.replaceLang(hs.skin.contentWrapper) 
	});
},
getElementByClass : function (el, tagName, className) {
	var els = el.getElementsByTagName(tagName);
	for (var i = 0; i < els.length; i++) {
    	if ((new RegExp(className)).test(els[i].className)) {
			return els[i];
		}
	}
	return null;
},
replaceLang : function(s) {
	s = s.replace(/\s/g, ' ');
	var re = /{hs\.lang\.([^}]+)\}/g,
		matches = s.match(re),
		lang;
	if (matches) for (var i = 0; i < matches.length; i++) {
		lang = matches[i].replace(re, "$1");
		if (typeof hs.lang[lang] != 'undefined') s = s.replace(matches[i], hs.lang[lang]);
	}
	return s;
},


setClickEvents : function () {
	var els = document.getElementsByTagName('a');
	for (var i = 0; i < els.length; i++) {
		var type = hs.isUnobtrusiveAnchor(els[i]);
		if (type && !els[i].hsHasSetClick) {
			(function(){
				var t = type;
				if (hs.fireEvent(hs, 'onSetClickEvent', { element: els[i], type: t })) {
					els[i].onclick =(type == 'image') ?function() { return hs.expand(this) }:
						function() { return hs.htmlExpand(this, { objectType: t } );};
				}
			})();
			els[i].hsHasSetClick = true;	
		}
	}
	hs.getAnchors();
},
isUnobtrusiveAnchor: function(el) {
	if (el.rel == 'highslide') return 'image';
	else if (el.rel == 'highslide-ajax') return 'ajax';
	else if (el.rel == 'highslide-iframe') return 'iframe';
	else if (el.rel == 'highslide-swf') return 'swf';
},

getCacheBinding : function (a) {
	for (var i = 0; i < hs.cacheBindings.length; i++) {
		if (hs.cacheBindings[i][0] == a) {
			var c = hs.cacheBindings[i][1];
			hs.cacheBindings[i][1] = c.cloneNode(1);
			return c;
		}
	}
	return null;
},

preloadAjax : function (e) {
	var arr = hs.getAnchors();
	for (var i = 0; i < arr.htmls.length; i++) {
		var a = arr.htmls[i];
		if (hs.getParam(a, 'objectType') == 'ajax' && hs.getParam(a, 'cacheAjax'))
			hs.push(hs.preloadTheseAjax, a);
	}
	
	hs.preloadAjaxElement(0);
},

preloadAjaxElement : function (i) {
	if (!hs.preloadTheseAjax[i]) return;
	var a = hs.preloadTheseAjax[i];
	var cache = hs.getNode(hs.getParam(a, 'contentId'));
	if (!cache) cache = hs.getSelfRendered();
	var ajax = new hs.Ajax(a, cache, 1);	
   	ajax.onError = function () { };
   	ajax.onLoad = function () {
   		hs.push(hs.cacheBindings, [a, cache]);
   		hs.preloadAjaxElement(i + 1);
   	};
   	ajax.run();
},

focusTopmost : function() {
	var topZ = 0, 
		topmostKey = -1,
		expanders = hs.expanders,
		exp,
		zIndex;
	for (var i = 0; i < expanders.length; i++) {
		exp = expanders[i];
		if (exp) {
			zIndex = exp.wrapper.style.zIndex;
			if (zIndex && zIndex > topZ) {
				topZ = zIndex;				
				topmostKey = i;
			}
		}
	}
	if (topmostKey == -1) hs.focusKey = -1;
	else expanders[topmostKey].focus();
},

getParam : function (a, param) {
	a.getParams = a.onclick;
	var p = a.getParams ? a.getParams() : null;
	a.getParams = null;
	
	return (p && typeof p[param] != 'undefined') ? p[param] : 
		(typeof hs[param] != 'undefined' ? hs[param] : null);
},

getSrc : function (a) {
	var src = hs.getParam(a, 'src');
	if (src) return src;
	return a.href;
},

getNode : function (id) {
	var node = hs.$(id), clone = hs.clones[id], a = {};
	if (!node && !clone) return null;
	if (!clone) {
		clone = node.cloneNode(true);
		clone.id = '';
		hs.clones[id] = clone;
		return node;
	} else {
		return clone.cloneNode(true);
	}
},

discardElement : function(d) {
	if (d) hs.garbageBin.appendChild(d);
	hs.garbageBin.innerHTML = '';
},
dim : function(exp) {
	if (!hs.dimmer) {
		hs.dimmer = hs.createElement ('div', {
				className: 'highslide-dimming highslide-viewport-size',
				owner: '',
				onclick: function() {
					if (hs.fireEvent(hs, 'onDimmerClick'))
					
						hs.close();
				}
			}, {
                visibility: 'visible',
				opacity: 0
			}, hs.container, true);
	}

	hs.dimmer.style.display = '';

	hs.dimmer.owner += '|'+ exp.key;
	if (hs.geckoMac && hs.dimmingGeckoFix)
		hs.setStyles(hs.dimmer, {
			background: 'url('+ hs.graphicsDir + 'geckodimmer.png)',
			opacity: 1
		});
	else
		hs.animate(hs.dimmer, { opacity: exp.dimmingOpacity }, hs.dimmingDuration);
},
undim : function(key) {
	if (!hs.dimmer) return;
	if (typeof key != 'undefined') hs.dimmer.owner = hs.dimmer.owner.replace('|'+ key, '');

	if (
		(typeof key != 'undefined' && hs.dimmer.owner != '')
		|| (hs.upcoming && hs.getParam(hs.upcoming, 'dimmingOpacity'))
	) return;

	if (hs.geckoMac && hs.dimmingGeckoFix) hs.dimmer.style.display = 'none';
	else hs.animate(hs.dimmer, { opacity: 0 }, hs.dimmingDuration, null, function() {
		hs.dimmer.style.display = 'none';
	});
},
transit : function (adj, exp) {
	var last = exp = exp || hs.getExpander();
	if (hs.upcoming) return false;
	else hs.last = last;
	try {
		hs.upcoming = adj;
		adj.onclick(); 		
	} catch (e){
		hs.last = hs.upcoming = null;
	}
	try {
		if (!adj || exp.transitions[1] != 'crossfade')
		exp.close();
	} catch (e) {}
	return false;
},

previousOrNext : function (el, op) {
	var exp = hs.getExpander(el);
	if (exp) return hs.transit(exp.getAdjacentAnchor(op), exp);
	else return false;
},

previous : function (el) {
	return hs.previousOrNext(el, -1);
},

next : function (el) {
	return hs.previousOrNext(el, 1);	
},

keyHandler : function(e) {
	if (!e) e = window.event;
	if (!e.target) e.target = e.srcElement; // ie
	if (typeof e.target.form != 'undefined') return true; // form element has focus
	if (!hs.fireEvent(hs, 'onKeyDown', e)) return true;
	var exp = hs.getExpander();
	
	var op = null;
	switch (e.keyCode) {
		case 70: // f
			if (exp) exp.doFullExpand();
			return true;
		case 32: // Space
			op = 2;
			break;
		case 34: // Page Down
		case 39: // Arrow right
		case 40: // Arrow down
			op = 1;
			break;
		case 8:  // Backspace
		case 33: // Page Up
		case 37: // Arrow left
		case 38: // Arrow up
			op = -1;
			break;
		case 27: // Escape
		case 13: // Enter
			op = 0;
	}
	if (op !== null) {if (op != 2)hs.removeEventListener(document, window.opera ? 'keypress' : 'keydown', hs.keyHandler);
		if (!hs.enableKeyListener) return true;
		
		if (e.preventDefault) e.preventDefault();
    	else e.returnValue = false;
    	if (exp) {
			if (op == 0) {
				exp.close();
			} else if (op == 2) {
				if (exp.slideshow) exp.slideshow.hitSpace();
			} else {
				if (exp.slideshow) exp.slideshow.pause();
				hs.previousOrNext(exp.key, op);
			}
			return false;
		}
	}
	return true;
},


registerOverlay : function (overlay) {
	hs.push(hs.overlays, hs.extend(overlay, { hsId: 'hsId'+ hs.idCounter++ } ));
},


addSlideshow : function (options) {
	var sg = options.slideshowGroup;
	if (typeof sg == 'object') {
		for (var i = 0; i < sg.length; i++) {
			var o = {};
			for (var x in options) o[x] = options[x];
			o.slideshowGroup = sg[i];
			hs.push(hs.slideshows, o);
		}
	} else {
		hs.push(hs.slideshows, options);
	}
},

getWrapperKey : function (element, expOnly) {
	var el, re = /^highslide-wrapper-([0-9]+)$/;
	// 1. look in open expanders
	el = element;
	while (el.parentNode)	{
		if (el.hsKey !== undefined) return el.hsKey;
		if (el.id && re.test(el.id)) return el.id.replace(re, "$1");
		el = el.parentNode;
	}
	// 2. look in thumbnail
	if (!expOnly) {
		el = element;
		while (el.parentNode)	{
			if (el.tagName && hs.isHsAnchor(el)) {
				for (var key = 0; key < hs.expanders.length; key++) {
					var exp = hs.expanders[key];
					if (exp && exp.a == el) return key;
				}
			}
			el = el.parentNode;
		}
	}
	return null; 
},

getExpander : function (el, expOnly) {
	if (typeof el == 'undefined') return hs.expanders[hs.focusKey] || null;
	if (typeof el == 'number') return hs.expanders[el] || null;
	if (typeof el == 'string') el = hs.$(el);
	return hs.expanders[hs.getWrapperKey(el, expOnly)] || null;
},

isHsAnchor : function (a) {
	return (a.onclick && a.onclick.toString().replace(/\s/g, ' ').match(/hs.(htmlE|e)xpand/));
},

reOrder : function () {
	for (var i = 0; i < hs.expanders.length; i++)
		if (hs.expanders[i] && hs.expanders[i].isExpanded) hs.focusTopmost();
},
fireEvent : function (obj, evt, args) {
	return obj && obj[evt] ? (obj[evt](obj, args) !== false) : true;
},

mouseClickHandler : function(e) 
{	
	if (!e) e = window.event;
	if (e.button > 1) return true;
	if (!e.target) e.target = e.srcElement;
	
	var el = e.target;
	while (el.parentNode
		&& !(/highslide-(image|move|html|resize)/.test(el.className)))
	{
		el = el.parentNode;
	}
	var exp = hs.getExpander(el);
	if (exp && (exp.isClosing || !exp.isExpanded)) return true;
		
	if (exp && e.type == 'mousedown') {
		if (e.target.form) return true;
		var match = el.className.match(/highslide-(image|move|resize)/);
		if (match) {
			hs.dragArgs = { 
				exp: exp , 
				type: match[1], 
				left: exp.x.pos, 
				width: exp.x.size, 
				top: exp.y.pos, 
				height: exp.y.size, 
				clickX: e.clientX, 
				clickY: e.clientY
			};
			
			
			hs.addEventListener(document, 'mousemove', hs.dragHandler);
			if (e.preventDefault) e.preventDefault(); // FF
			
			if (/highslide-(image|html)-blur/.test(exp.content.className)) {
				exp.focus();
				hs.hasFocused = true;
			}
			return false;
		}
		else if (/highslide-html/.test(el.className) && hs.focusKey != exp.key) {
			exp.focus();
			exp.doShowHide('hidden');
		}
	} else if (e.type == 'mouseup') {
		
		hs.removeEventListener(document, 'mousemove', hs.dragHandler);
		
		if (hs.dragArgs) {
			if (hs.styleRestoreCursor && hs.dragArgs.type == 'image') 
				hs.dragArgs.exp.content.style.cursor = hs.styleRestoreCursor;
			var hasDragged = hs.dragArgs.hasDragged;
			
			if (!hasDragged &&!hs.hasFocused && !/(move|resize)/.test(hs.dragArgs.type)) {
				if (hs.fireEvent(exp, 'onImageClick'))
				exp.close();
			} 
			else if (hasDragged || (!hasDragged && hs.hasHtmlExpanders)) {
				hs.dragArgs.exp.doShowHide('hidden');
			}
			
			if (hs.dragArgs.exp.releaseMask) 
				hs.dragArgs.exp.releaseMask.style.display = 'none';
			
			if (hasDragged) hs.fireEvent(hs.dragArgs.exp, 'onDrop', hs.dragArgs);
			hs.hasFocused = false;
			hs.dragArgs = null;
		
		} else if (/highslide-image-blur/.test(el.className)) {
			el.style.cursor = hs.styleRestoreCursor;		
		}
	}
	return false;
},

dragHandler : function(e)
{
	if (!hs.dragArgs) return true;
	if (!e) e = window.event;
	var a = hs.dragArgs, exp = a.exp;
	if (exp.iframe) {		
		if (!exp.releaseMask) exp.releaseMask = hs.createElement('div', null, 
			{ position: 'absolute', width: exp.x.size+'px', height: exp.y.size+'px', 
				left: exp.x.cb+'px', top: exp.y.cb+'px', zIndex: 4,	background: (hs.ie ? 'white' : 'none'), 
				opacity: .01 }, 
			exp.wrapper, true);
		if (exp.releaseMask.style.display == 'none')
			exp.releaseMask.style.display = '';
	}
	
	a.dX = e.clientX - a.clickX;
	a.dY = e.clientY - a.clickY;	
	
	var distance = Math.sqrt(Math.pow(a.dX, 2) + Math.pow(a.dY, 2));
	if (!a.hasDragged) a.hasDragged = (a.type != 'image' && distance > 0)
		|| (distance > (hs.dragSensitivity || 5));
	
	if (a.hasDragged && e.clientX > 5 && e.clientY > 5) {
		if (!hs.fireEvent(exp, 'onDrag', a)) return false;
		
		if (a.type == 'resize') exp.resize(a);
		else {
			exp.moveTo(a.left + a.dX, a.top + a.dY);
			if (a.type == 'image') exp.content.style.cursor = 'move';
		}
	}
	return false;
},

wrapperMouseHandler : function (e) {
	try {
		if (!e) e = window.event;
		var over = /mouseover/i.test(e.type); 
		if (!e.target) e.target = e.srcElement; // ie
		if (hs.ie) e.relatedTarget = 
			over ? e.fromElement : e.toElement; // ie
		var exp = hs.getExpander(e.target);
		if (!exp.isExpanded) return;
		if (!exp || !e.relatedTarget || hs.getExpander(e.relatedTarget, true) == exp 
			|| hs.dragArgs) return;
		hs.fireEvent(exp, over ? 'onMouseOver' : 'onMouseOut', e);
		for (var i = 0; i < exp.overlays.length; i++) (function() {
			var o = hs.$('hsId'+ exp.overlays[i]);
			if (o && o.hideOnMouseOut) {
				if (over) hs.setStyles(o, { visibility: 'visible', display: '' });
				hs.animate(o, { opacity: over ? o.opacity : 0 }, o.dur);
			}
		})();	
	} catch (e) {}
},
addEventListener : function (el, event, func) {
	if (el == document && event == 'ready') hs.push(hs.onReady, func);
	try {
		el.addEventListener(event, func, false);
	} catch (e) {
		try {
			el.detachEvent('on'+ event, func);
			el.attachEvent('on'+ event, func);
		} catch (e) {
			el['on'+ event] = func;
		}
	} 
},

removeEventListener : function (el, event, func) {
	try {
		el.removeEventListener(event, func, false);
	} catch (e) {
		try {
			el.detachEvent('on'+ event, func);
		} catch (e) {
			el['on'+ event] = null;
		}
	}
},

preloadFullImage : function (i) {
	if (hs.continuePreloading && hs.preloadTheseImages[i] && hs.preloadTheseImages[i] != 'undefined') {
		var img = document.createElement('img');
		img.onload = function() { 
			img = null;
			hs.preloadFullImage(i + 1);
		};
		img.src = hs.preloadTheseImages[i];
	}
},
preloadImages : function (number) {
	if (number && typeof number != 'object') hs.numberOfImagesToPreload = number;
	
	var arr = hs.getAnchors();
	for (var i = 0; i < arr.images.length && i < hs.numberOfImagesToPreload; i++) {
		hs.push(hs.preloadTheseImages, hs.getSrc(arr.images[i]));
	}
	
	// preload outlines
	if (hs.outlineType)	new hs.Outline(hs.outlineType, function () { hs.preloadFullImage(0)} );
	else
	
	hs.preloadFullImage(0);
	
	// preload cursor
	if (hs.restoreCursor) var cur = hs.createElement('img', { src: hs.graphicsDir + hs.restoreCursor });
},


init : function () {
	if (!hs.container) {
	
		hs.getPageSize();
		hs.ieLt7 = hs.ie && hs.uaVersion < 7;
		hs.ie6SSL = hs.ieLt7 && location.protocol == 'https:';
		for (var x in hs.langDefaults) {
			if (typeof hs[x] != 'undefined') hs.lang[x] = hs[x];
			else if (typeof hs.lang[x] == 'undefined' && typeof hs.langDefaults[x] != 'undefined') 
				hs.lang[x] = hs.langDefaults[x];
		}
		
		hs.container = hs.createElement('div', {
				className: 'highslide-container'
			}, {
				position: 'absolute', 
				left: 0, 
				top: 0, 
				width: '100%', 
				zIndex: hs.zIndexCounter,
				direction: 'ltr'
			}, 
			document.body,
			true
		);
		hs.loading = hs.createElement('a', {
				className: 'highslide-loading',
				title: hs.lang.loadingTitle,
				innerHTML: hs.lang.loadingText,
				href: 'javascript:;'
			}, {
				position: 'absolute',
				top: '-9999px',
				opacity: hs.loadingOpacity,
				zIndex: 1
			}, hs.container
		);
		hs.garbageBin = hs.createElement('div', null, { display: 'none' }, hs.container);
		hs.viewport = hs.createElement('div', {
				className: 'highslide-viewport highslide-viewport-size'
			}, {
				visibility: (hs.safari && hs.uaVersion < 525) ? 'visible' : 'hidden'
			}, hs.container, 1
		);
		hs.clearing = hs.createElement('div', null, 
			{ clear: 'both', paddingTop: '1px' }, null, true);
		
		// http://www.robertpenner.com/easing/ 
		Math.linearTween = function (t, b, c, d) {
			return c*t/d + b;
		};
		Math.easeInQuad = function (t, b, c, d) {
			return c*(t/=d)*t + b;
		};
		Math.easeOutQuad = function (t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		};
		
		hs.hideSelects = hs.ieLt7;
		hs.hideIframes = ((window.opera && hs.uaVersion < 9) || navigator.vendor == 'KDE' 
			|| (hs.ie && hs.uaVersion < 5.5));
		hs.fireEvent(this, 'onActivate');
	}
},
ready : function() {
	if (hs.isReady) return;
	hs.isReady = true;
	
	for (var i = 0; i < hs.onReady.length; i++) hs.onReady[i]();
},

updateAnchors : function() {
	var el, els, all = [], images = [], htmls = [],groups = {}, re;
		
	for (var i = 0; i < hs.openerTagNames.length; i++) {
		els = document.getElementsByTagName(hs.openerTagNames[i]);
		for (var j = 0; j < els.length; j++) {
			el = els[j];
			re = hs.isHsAnchor(el);
			if (re) {
				hs.push(all, el);
				if (re[0] == 'hs.expand') hs.push(images, el);
				else if (re[0] == 'hs.htmlExpand') hs.push(htmls, el);
				var g = hs.getParam(el, 'slideshowGroup') || 'none';
				if (!groups[g]) groups[g] = [];
				hs.push(groups[g], el);
			}
		}
	}
	hs.anchors = { all: all, groups: groups, images: images, htmls: htmls };
	return hs.anchors;
	
},

getAnchors : function() {
	return hs.anchors || hs.updateAnchors();
},


close : function(el) {
	var exp = hs.getExpander(el);
	if (exp) exp.close();
	return false;
}
}; // end hs object
hs.fx = function( elem, options, prop ){
	this.options = options;
	this.elem = elem;
	this.prop = prop;

	if (!options.orig) options.orig = {};
};
hs.fx.prototype = {
	update: function(){
		(hs.fx.step[this.prop] || hs.fx.step._default)(this);
		
		if (this.options.step)
			this.options.step.call(this.elem, this.now, this);

	},
	custom: function(from, to, unit){
		this.startTime = (new Date()).getTime();
		this.start = from;
		this.end = to;
		this.unit = unit;// || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && hs.timers.push(t) == 1 ) {
			hs.timerId = setInterval(function(){
				var timers = hs.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval(hs.timerId);
				}
			}, 13);
		}
	},
	step: function(gotoEnd){
		var t = (new Date()).getTime();
		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {
				if (this.options.complete) this.options.complete.call(this.elem);
			}
			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;
			this.pos = this.options.easing(n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);
			this.update();
		}
		return true;
	}

};

hs.extend( hs.fx, {
	step: {

		opacity: function(fx){
			hs.setStyles(fx.elem, { opacity: fx.now });
		},

		_default: function(fx){
			try {
				if ( fx.elem.style && fx.elem.style[ fx.prop ] != null )
					fx.elem.style[ fx.prop ] = fx.now + fx.unit;
				else
					fx.elem[ fx.prop ] = fx.now;
			} catch (e) {}
		}
	}
});

hs.Outline =  function (outlineType, onLoad) {
	this.onLoad = onLoad;
	this.outlineType = outlineType;
	var v = hs.uaVersion, tr;
	
	this.hasAlphaImageLoader = hs.ie && v >= 5.5 && v < 7;
	if (!outlineType) {
		if (onLoad) onLoad();
		return;
	}
	
	hs.init();
	this.table = hs.createElement(
		'table', { 
			cellSpacing: 0 
		}, {
			visibility: 'hidden',
			position: 'absolute',
			borderCollapse: 'collapse',
			width: 0
		},
		hs.container,
		true
	);
	var tbody = hs.createElement('tbody', null, null, this.table, 1);
	
	this.td = [];
	for (var i = 0; i <= 8; i++) {
		if (i % 3 == 0) tr = hs.createElement('tr', null, { height: 'auto' }, tbody, true);
		this.td[i] = hs.createElement('td', null, null, tr, true);
		var style = i != 4 ? { lineHeight: 0, fontSize: 0} : { position : 'relative' };
		hs.setStyles(this.td[i], style);
	}
	this.td[4].className = outlineType +' highslide-outline';
	
	this.preloadGraphic(); 
};

hs.Outline.prototype = {
preloadGraphic : function () {
	var src = hs.graphicsDir + (hs.outlinesDir || "outlines/")+ this.outlineType +".png";
				
	var appendTo = hs.safari ? hs.container : null;
	this.graphic = hs.createElement('img', null, { position: 'absolute', 
		top: '-9999px' }, appendTo, true); // for onload trigger
	
	var pThis = this;
	this.graphic.onload = function() { pThis.onGraphicLoad(); };
	
	this.graphic.src = src;
},

onGraphicLoad : function () {
	var o = this.offset = this.graphic.width / 4,
		pos = [[0,0],[0,-4],[-2,0],[0,-8],0,[-2,-8],[0,-2],[0,-6],[-2,-2]],
		dim = { height: (2*o) +'px', width: (2*o) +'px' };
	for (var i = 0; i <= 8; i++) {
		if (pos[i]) {
			if (this.hasAlphaImageLoader) {
				var w = (i == 1 || i == 7) ? '100%' : this.graphic.width +'px';
				var div = hs.createElement('div', null, { width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}, this.td[i], true);
				hs.createElement ('div', null, { 
						filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale, src='"+ this.graphic.src + "')", 
						position: 'absolute',
						width: w, 
						height: this.graphic.height +'px',
						left: (pos[i][0]*o)+'px',
						top: (pos[i][1]*o)+'px'
					}, 
				div,
				true);
			} else {
				hs.setStyles(this.td[i], { background: 'url('+ this.graphic.src +') '+ (pos[i][0]*o)+'px '+(pos[i][1]*o)+'px'});
			}
			
			if (window.opera && (i == 3 || i ==5)) 
				hs.createElement('div', null, dim, this.td[i], true);
			
			hs.setStyles (this.td[i], dim);
		}
	}
	this.graphic = null;
	if (hs.pendingOutlines[this.outlineType]) hs.pendingOutlines[this.outlineType].destroy();
	hs.pendingOutlines[this.outlineType] = this;
	if (this.onLoad) this.onLoad();
},
	
setPosition : function (pos, offset, vis, dur, easing) {
	var exp = this.exp,
		stl = exp.wrapper.style,
		offset = offset || 0,
		pos = pos || {
			x: exp.x.pos + offset,
			y: exp.y.pos + offset,
			w: exp.x.get('wsize') - 2 * offset,
			h: exp.y.get('wsize') - 2 * offset
		};
	if (vis) this.table.style.visibility = (pos.h >= 4 * this.offset) 
		? 'visible' : 'hidden';
	hs.setStyles(this.table, {
		left: (pos.x - this.offset) +'px',
		top: (pos.y - this.offset) +'px',
		width: (pos.w + 2 * this.offset) +'px'
	});
	
	pos.w -= 2 * this.offset;
	pos.h -= 2 * this.offset;
	hs.setStyles (this.td[4], {
		width: pos.w >= 0 ? pos.w +'px' : 0,
		height: pos.h >= 0 ? pos.h +'px' : 0
	});
	if (this.hasAlphaImageLoader) this.td[3].style.height 
		= this.td[5].style.height = this.td[4].style.height;	
	
},
	
destroy : function(hide) {
	if (hide) this.table.style.visibility = 'hidden';
	else hs.discardElement(this.table);
}
};

hs.Dimension = function(exp, dim) {
	this.exp = exp;
	this.dim = dim;
	this.ucwh = dim == 'x' ? 'Width' : 'Height';
	this.wh = this.ucwh.toLowerCase();
	this.uclt = dim == 'x' ? 'Left' : 'Top';
	this.lt = this.uclt.toLowerCase();
	this.ucrb = dim == 'x' ? 'Right' : 'Bottom';
	this.rb = this.ucrb.toLowerCase();
	this.p1 = this.p2 = 0;
};
hs.Dimension.prototype = {
get : function(key) {
	switch (key) {
		case 'loadingPos':
			return this.tpos + this.tb + (this.t - hs.loading['offset'+ this.ucwh]) / 2;
		case 'loadingPosXfade':
			return this.pos + this.cb+ this.p1 + (this.size - hs.loading['offset'+ this.ucwh]) / 2;
		case 'wsize':
			return this.size + 2 * this.cb + this.p1 + this.p2;
		case 'fitsize':
			return this.clientSize - this.marginMin - this.marginMax;
		case 'maxsize':
			return this.get('fitsize') - 2 * this.cb - this.p1 - this.p2 ;
		case 'opos':
			return this.pos - (this.exp.outline ? this.exp.outline.offset : 0);
		case 'osize':
			return this.get('wsize') + (this.exp.outline ? 2*this.exp.outline.offset : 0);
		case 'imgPad':
			return this.imgSize ? Math.round((this.size - this.imgSize) / 2) : 0;
		
	}
},
calcBorders: function() {
	// correct for borders
	this.cb = (this.exp.content['offset'+ this.ucwh] - this.t) / 2;
	
	this.marginMax = hs['margin'+ this.ucrb];
},
calcThumb: function() {
	this.t = this.exp.el[this.wh] ? parseInt(this.exp.el[this.wh]) : 
		this.exp.el['offset'+ this.ucwh];
	this.tpos = this.exp.tpos[this.dim];
	this.tb = (this.exp.el['offset'+ this.ucwh] - this.t) / 2;
	if (this.tpos == 0 || this.tpos == -1) {
		this.tpos = (hs.page[this.wh] / 2) + hs.page['scroll'+ this.uclt];		
	};
},
calcExpanded: function() {
	var exp = this.exp;
	this.justify = 'auto';
	
	// get alignment
	if (exp.align == 'center') this.justify = 'center';
	else if (new RegExp(this.lt).test(exp.anchor)) this.justify = null;
	else if (new RegExp(this.rb).test(exp.anchor)) this.justify = 'max';
	
	
	// size and position
	this.pos = this.tpos - this.cb + this.tb;
	
	if (this.maxHeight && this.dim == 'x')
		exp.maxWidth = Math.min(exp.maxWidth || this.full, exp.maxHeight * this.full / exp.y.full); 
		
	this.size = Math.min(this.full, exp['max'+ this.ucwh] || this.full);
	this.minSize = exp.allowSizeReduction ? 
		Math.min(exp['min'+ this.ucwh], this.full) :this.full;
	if (exp.isImage && exp.useBox)	{
		this.size = exp[this.wh];
		this.imgSize = this.full;
	}
	if (this.dim == 'x' && hs.padToMinWidth) this.minSize = exp.minWidth;
	this.target = exp['target'+ this.dim.toUpperCase()];
	this.marginMin = hs['margin'+ this.uclt];
	this.scroll = hs.page['scroll'+ this.uclt];
	this.clientSize = hs.page[this.wh];
},
setSize: function(i) {
	var exp = this.exp;
	if (exp.isImage && (exp.useBox || hs.padToMinWidth)) {
		this.imgSize = i;
		this.size = Math.max(this.size, this.imgSize);
		exp.content.style[this.lt] = this.get('imgPad')+'px';
	} else
	this.size = i;
	
	exp.content.style[this.wh] = i +'px';
	exp.wrapper.style[this.wh] = this.get('wsize') +'px';
	if (exp.outline) exp.outline.setPosition();
	if (exp.releaseMask) exp.releaseMask.style[this.wh] = i +'px';
	if (this.dim == 'y' && exp.iDoc && exp.body.style.height != 'auto') try {
		exp.iDoc.body.style.overflow = 'auto';
	} catch (e) {}
	if (exp.isHtml) {
		var d = exp.scrollerDiv;
		if (this.sizeDiff === undefined)
			this.sizeDiff = exp.innerContent['offset'+ this.ucwh] - d['offset'+ this.ucwh];
		d.style[this.wh] = (this.size - this.sizeDiff) +'px';
			
		if (this.dim == 'x') exp.mediumContent.style.width = 'auto';
		if (exp.body) exp.body.style[this.wh] = 'auto';
	}
	if (this.dim == 'x' && exp.overlayBox) exp.sizeOverlayBox(true);
	if (this.dim == 'x' && exp.slideshow && exp.isImage) {
		if (i == this.full) exp.slideshow.disable('full-expand');
		else exp.slideshow.enable('full-expand');
	}
},
setPos: function(i) {
	this.pos = i;
	this.exp.wrapper.style[this.lt] = i +'px';	
	
	if (this.exp.outline) this.exp.outline.setPosition();
	
}
};

hs.Expander = function(a, params, custom, contentType) {
	if (document.readyState && hs.ie && !hs.isReady) {
		hs.addEventListener(document, 'ready', function() {
			new hs.Expander(a, params, custom, contentType);
		});
		return;
	} 
	this.a = a;
	this.custom = custom;
	this.contentType = contentType || 'image';
	this.isHtml = (contentType == 'html');
	this.isImage = !this.isHtml;
	
	hs.continuePreloading = false;
	this.overlays = [];
	this.last = hs.last;
	hs.last = null;
	hs.init();
	var key = this.key = hs.expanders.length;
	// override inline parameters
	for (var i = 0; i < hs.overrides.length; i++) {
		var name = hs.overrides[i];
		this[name] = params && typeof params[name] != 'undefined' ?
			params[name] : hs[name];
	}
	if (!this.src) this.src = a.href;
	
	// get thumb
	var el = (params && params.thumbnailId) ? hs.$(params.thumbnailId) : a;
	el = this.thumb = el.getElementsByTagName('img')[0] || el;
	this.thumbsUserSetId = el.id || a.id;
	if (!hs.fireEvent(this, 'onInit')) return true;
	
	// check if already open
	for (var i = 0; i < hs.expanders.length; i++) {
		if (hs.expanders[i] && hs.expanders[i].a == a 
			&& !(this.last && this.transitions[1] == 'crossfade')) {
			hs.expanders[i].focus();
			return false;
		}
	}	

	// cancel other
	if (!hs.allowSimultaneousLoading) for (var i = 0; i < hs.expanders.length; i++) {
		if (hs.expanders[i] && hs.expanders[i].thumb != el && !hs.expanders[i].onLoadStarted) {
			hs.expanders[i].cancelLoading();
		}
	}
	hs.expanders[key] = this;
	if (!hs.allowMultipleInstances && !hs.upcoming) {
		if (hs.expanders[key-1]) hs.expanders[key-1].close();
		if (typeof hs.focusKey != 'undefined' && hs.expanders[hs.focusKey])
			hs.expanders[hs.focusKey].close();
	}
	
	// initiate metrics
	this.el = el;
	this.tpos = hs.getPosition(el);
	hs.getPageSize();
	var x = this.x = new hs.Dimension(this, 'x');
	x.calcThumb();
	var y = this.y = new hs.Dimension(this, 'y');
	y.calcThumb();
	if (/area/i.test(el.tagName)) this.getImageMapAreaCorrection(el);
	this.wrapper = hs.createElement(
		'div', {
			id: 'highslide-wrapper-'+ this.key,
			className: 'highslide-wrapper '+ this.wrapperClassName
		}, {
			visibility: 'hidden',
			position: 'absolute',
			zIndex: hs.zIndexCounter += 2
		}, null, true );
	
	this.wrapper.onmouseover = this.wrapper.onmouseout = hs.wrapperMouseHandler;
	if (this.contentType == 'image' && this.outlineWhileAnimating == 2)
		this.outlineWhileAnimating = 0;
	
	// get the outline
	if (!this.outlineType 
		|| (this.last && this.isImage && this.transitions[1] == 'crossfade')) {
		this[this.contentType +'Create']();
	
	} else if (hs.pendingOutlines[this.outlineType]) {
		this.connectOutline();
		this[this.contentType +'Create']();
	
	} else {
		this.showLoading();
		var exp = this;
		new hs.Outline(this.outlineType, 
			function () {
				exp.connectOutline();
				exp[exp.contentType +'Create']();
			} 
		);
	}
	return true;
};

hs.Expander.prototype = {
error : function(e) {
	// alert ('Line '+ e.lineNumber +': '+ e.message);
	window.location.href = this.src;
},

connectOutline : function() {
	var outline = this.outline = hs.pendingOutlines[this.outlineType];
	outline.exp = this;
	outline.table.style.zIndex = this.wrapper.style.zIndex - 1;
	hs.pendingOutlines[this.outlineType] = null;
},

showLoading : function() {
	if (this.onLoadStarted || this.loading) return;
	
	this.loading = hs.loading;
	var exp = this;
	this.loading.onclick = function() {
		exp.cancelLoading();
	};
	
	
	if (!hs.fireEvent(this, 'onShowLoading')) return;
	var exp = this, 
		l = this.x.get('loadingPos') +'px',
		t = this.y.get('loadingPos') +'px';
	if (!tgt && this.last && this.transitions[1] == 'crossfade') 
		var tgt = this.last; 
	if (tgt) {
		l = tgt.x.get('loadingPosXfade') +'px';
		t = tgt.y.get('loadingPosXfade') +'px';
		this.loading.style.zIndex = hs.zIndexCounter++;
	}
	setTimeout(function () { 
		if (exp.loading) hs.setStyles(exp.loading, { left: l, top: t, zIndex: hs.zIndexCounter++ })}
	, 100);
},

imageCreate : function() {
	var exp = this;
	
	var img = document.createElement('img');
    this.content = img;
    img.onload = function () {
    	if (hs.expanders[exp.key]) exp.contentLoaded(); 
	};
    if (hs.blockRightClick) img.oncontextmenu = function() { return false; };
    img.className = 'highslide-image';
    hs.setStyles(img, {
    	visibility: 'hidden',
    	display: 'block',
    	position: 'absolute',
		maxWidth: '9999px',
		zIndex: 3
	});
    img.title = hs.lang.restoreTitle;
    if (hs.safari) hs.container.appendChild(img);
    if (hs.ie && hs.flushImgSize) img.src = null;
	img.src = this.src;
	
	this.showLoading();
},

htmlCreate : function () {
	if (!hs.fireEvent(this, 'onBeforeGetContent')) return;
	
	this.content = hs.getCacheBinding(this.a);
	if (!this.content) 
		this.content = hs.getNode(this.contentId);
	if (!this.content) 
		this.content = hs.getSelfRendered();
	this.getInline(['maincontent']);
	if (this.maincontent) {
		var body = hs.getElementByClass(this.content, 'div', 'highslide-body');
		if (body) body.appendChild(this.maincontent);
		this.maincontent.style.display = 'block';
	}
	hs.fireEvent(this, 'onAfterGetContent');
	
	var innerContent = this.innerContent = this.content;
	
	if (/(swf|iframe)/.test(this.objectType)) this.setObjContainerSize(innerContent);
	
	// the content tree
	hs.container.appendChild(this.wrapper);
	hs.setStyles( this.wrapper, { 
		position: 'static',
		padding: '0 '+ hs.marginRight +'px 0 '+ hs.marginLeft +'px'
	});
	this.content = hs.createElement(
    	'div', {
    		className: 'highslide-html' 
    	}, {
			position: 'relative',
			zIndex: 3,
			overflow: 'hidden'
		},
		this.wrapper
	);
	this.mediumContent = hs.createElement('div', null, null, this.content, 1);
	this.mediumContent.appendChild(innerContent);
	
	hs.setStyles (innerContent, { 
		position: 'relative',
		display: 'block',
		direction: hs.lang.cssDirection || ''
	});
	if (this.width) innerContent.style.width = this.width +'px';
	if (this.height) hs.setStyles(innerContent, {
		height: this.height +'px',
		overflow: 'hidden'
	});
	if (innerContent.offsetWidth < this.minWidth)
		innerContent.style.width = this.minWidth +'px';
		
	
    
	if (this.objectType == 'ajax' && !hs.getCacheBinding(this.a)) {
		this.showLoading();
    	var exp = this;
    	var ajax = new hs.Ajax(this.a, innerContent);
		ajax.src = this.src;
    	ajax.onLoad = function () {	if (hs.expanders[exp.key]) exp.contentLoaded(); };
    	ajax.onError = function () { location.href = exp.src; };
    	ajax.run();
	}
    else
    
    if (this.objectType == 'iframe' && this.objectLoadTime == 'before') {
		this.writeExtendedContent();
	}
    else
    	this.contentLoaded();
},

contentLoaded : function() {
	try {	
		if (!this.content) return;
		this.content.onload = null;
		if (this.onLoadStarted) return;
		else this.onLoadStarted = true;
		
		var x = this.x, y = this.y;
		
		if (this.loading) {
			hs.setStyles(this.loading, { top: '-9999px' });
			this.loading = null;
			hs.fireEvent(this, 'onHideLoading');
		}
		if (this.isImage) {	
			x.full = this.content.width;
			y.full = this.content.height;
			
			hs.setStyles(this.content, {
				width: x.t +'px',
				height: y.t +'px'
			});
			this.wrapper.appendChild(this.content);
			hs.container.appendChild(this.wrapper);
		} else if (this.htmlGetSize) this.htmlGetSize();
		
		x.calcBorders();
		y.calcBorders();
		
		hs.setStyles (this.wrapper, {
			left: (x.tpos + x.tb - x.cb) +'px',
			top: (y.tpos + x.tb - y.cb) +'px'
		});
		
		
		this.initSlideshow();
		this.getOverlays();
		
		var ratio = x.full / y.full;
		x.calcExpanded();
		this.justify(x);
		
		y.calcExpanded();
		this.justify(y);
		if (this.isHtml) this.htmlSizeOperations();
		if (this.overlayBox) this.sizeOverlayBox(0, 1);

		
		if (this.allowSizeReduction) {
			if (this.isImage)
				this.correctRatio(ratio);
			else this.fitOverlayBox();
			var ss = this.slideshow;			
			if (ss && this.last && ss.controls && ss.fixedControls) {
				var pos = ss.overlayOptions.position || '', p;
				for (var dim in hs.oPos) for (var i = 0; i < 5; i++) {
					p = this[dim];
					if (pos.match(hs.oPos[dim][i])) {
						p.pos = this.last[dim].pos 
							+ (this.last[dim].p1 - p.p1)
							+ (this.last[dim].size - p.size) * [0, 0, .5, 1, 1][i];
						if (ss.fixedControls == 'fit') {
							if (p.pos + p.size + p.p1 + p.p2 > p.scroll + p.clientSize - p.marginMax)
								p.pos = p.scroll + p.clientSize - p.size - p.marginMin - p.marginMax - p.p1 - p.p2;
							if (p.pos < p.scroll + p.marginMin) p.pos = p.scroll + p.marginMin; 
						} 
					}
				}
			}
			if (this.isImage && this.x.full > (this.x.imgSize || this.x.size)) {
				this.createFullExpand();
				if (this.overlays.length == 1) this.sizeOverlayBox();
			}
		}
		this.show();
		
	} catch (e) {
		this.error(e);
	}
},


setObjContainerSize : function(parent, auto) {
	var c = hs.getElementByClass(parent, 'DIV', 'highslide-body');
	if (/(iframe|swf)/.test(this.objectType)) {
		if (this.objectWidth) c.style.width = this.objectWidth +'px';
		if (this.objectHeight) c.style.height = this.objectHeight +'px';
	}
},

writeExtendedContent : function () {
	if (this.hasExtendedContent) return;
	var exp = this;
	this.body = hs.getElementByClass(this.innerContent, 'DIV', 'highslide-body');
	if (this.objectType == 'iframe') {
		this.showLoading();
		var ruler = hs.clearing.cloneNode(1);
		this.body.appendChild(ruler);
		this.newWidth = this.innerContent.offsetWidth;
		if (!this.objectWidth) this.objectWidth = ruler.offsetWidth;
		var hDiff = this.innerContent.offsetHeight - this.body.offsetHeight,
			h = this.objectHeight || hs.page.height - hDiff - hs.marginTop - hs.marginBottom,
			onload = this.objectLoadTime == 'before' ? 
				' onload="if (hs.expanders['+ this.key +']) hs.expanders['+ this.key +'].contentLoaded()" ' : '';
		this.body.innerHTML += '<iframe name="hs'+ (new Date()).getTime() +'" frameborder="0" key="'+ this.key +'" '
			+' style="width:'+ this.objectWidth +'px; height:'+ h +'px" '
			+ onload +' src="'+ this.src +'" ></iframe>';
		this.ruler = this.body.getElementsByTagName('div')[0];
		this.iframe = this.body.getElementsByTagName('iframe')[0];
		
		if (this.objectLoadTime == 'after') this.correctIframeSize();
		
	}
	if (this.objectType == 'swf') {
		this.body.id = this.body.id || 'hs-flash-id-' + this.key;
		var a = this.swfOptions;
		if (!a.params) a.params = {};
		if (typeof a.params.wmode == 'undefined') a.params.wmode = 'transparent';
		if (swfobject) swfobject.embedSWF(this.src, this.body.id, this.objectWidth, this.objectHeight, 
			a.version || '7', a.expressInstallSwfurl, a.flashvars, a.params, a.attributes);
	}
	this.hasExtendedContent = true;
},
htmlGetSize : function() {
	if (this.iframe && !this.objectHeight) { // loadtime before
		this.iframe.style.height = this.body.style.height = this.getIframePageHeight() +'px';
	}
	this.innerContent.appendChild(hs.clearing);
	if (!this.x.full) this.x.full = this.innerContent.offsetWidth;
    this.y.full = this.innerContent.offsetHeight;
    this.innerContent.removeChild(hs.clearing);
    if (hs.ie && this.newHeight > parseInt(this.innerContent.currentStyle.height)) { // ie css bug
		this.newHeight = parseInt(this.innerContent.currentStyle.height);
	}
	hs.setStyles( this.wrapper, { position: 'absolute',	padding: '0'});
	hs.setStyles( this.content, { width: this.x.t +'px', height: this.y.t +'px'});
	
},

getIframePageHeight : function() {
	var h;
	try {
		var doc = this.iDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;
		var clearing = doc.createElement('div');
		clearing.style.clear = 'both';
		doc.body.appendChild(clearing);
		h = clearing.offsetTop;
		if (hs.ie) h += parseInt(doc.body.currentStyle.marginTop) 
			+ parseInt(doc.body.currentStyle.marginBottom) - 1;
	} catch (e) { // other domain
		h = 300;
	}
	return h;
},
correctIframeSize : function () {
	var wDiff = this.innerContent.offsetWidth - this.ruler.offsetWidth;
	hs.discardElement(this.ruler);
	if (wDiff < 0) wDiff = 0;
	
	var hDiff = this.innerContent.offsetHeight - this.iframe.offsetHeight;
	if (this.iDoc && !this.objectHeight && !this.height && this.y.size == this.y.full) try {
		this.iDoc.body.style.overflow = 'hidden';
	} catch (e) {}
	hs.setStyles(this.iframe, { 
		width: Math.abs(this.x.size - wDiff) +'px', 
		height: Math.abs(this.y.size - hDiff) +'px'
	});
    hs.setStyles(this.body, { 
		width: this.iframe.style.width, 
    	height: this.iframe.style.height
	});
    	
    this.scrollingContent = this.iframe;
    this.scrollerDiv = this.scrollingContent;
	
},
htmlSizeOperations : function () {
	
	this.setObjContainerSize(this.innerContent);
	
	
	if (this.objectType == 'swf' && this.objectLoadTime == 'before') this.writeExtendedContent();	
	
    // handle minimum size
    if (this.x.size < this.x.full && !this.allowWidthReduction) this.x.size = this.x.full;
    if (this.y.size < this.y.full && !this.allowHeightReduction) this.y.size = this.y.full;
	this.scrollerDiv = this.innerContent;
    hs.setStyles(this.mediumContent, { 
		position: 'relative',
		width: this.x.size +'px'
	});
    hs.setStyles(this.innerContent, { 
    	border: 'none',
    	width: 'auto',
    	height: 'auto'
    });
	var node = hs.getElementByClass(this.innerContent, 'DIV', 'highslide-body');
    if (node && !/(iframe|swf)/.test(this.objectType)) {
    	var cNode = node; // wrap to get true size
    	node = hs.createElement(cNode.nodeName, null, {overflow: 'hidden'}, null, true);
    	cNode.parentNode.insertBefore(node, cNode);
    	node.appendChild(hs.clearing); // IE6
    	node.appendChild(cNode);
    	
    	var wDiff = this.innerContent.offsetWidth - node.offsetWidth;
    	var hDiff = this.innerContent.offsetHeight - node.offsetHeight;
		node.removeChild(hs.clearing);
    	
    	var kdeBugCorr = hs.safari || navigator.vendor == 'KDE' ? 1 : 0; // KDE repainting bug
    	hs.setStyles(node, { 
    			width: (this.x.size - wDiff - kdeBugCorr) +'px', 
    			height: (this.y.size - hDiff) +'px',
    			overflow: 'auto', 
    			position: 'relative' 
    		} 
    	);
		if (kdeBugCorr && cNode.offsetHeight > node.offsetHeight)	{
    		node.style.width = (parseInt(node.style.width) + kdeBugCorr) + 'px';
		}
    	this.scrollingContent = node;
    	this.scrollerDiv = this.scrollingContent;
	}
    if (this.iframe && this.objectLoadTime == 'before') this.correctIframeSize();
    if (!this.scrollingContent && this.y.size < this.mediumContent.offsetHeight) this.scrollerDiv = this.content;
	
	if (this.scrollerDiv == this.content && !this.allowWidthReduction && !/(iframe|swf)/.test(this.objectType)) {
		this.x.size += 17; // room for scrollbars
	}
	if (this.scrollerDiv && this.scrollerDiv.offsetHeight > this.scrollerDiv.parentNode.offsetHeight) {
		setTimeout("try { hs.expanders["+ this.key +"].scrollerDiv.style.overflow = 'auto'; } catch(e) {}",
			 hs.expandDuration);
	}
},

getImageMapAreaCorrection : function(area) {
	var c = area.coords.split(',');
	for (var i = 0; i < c.length; i++) c[i] = parseInt(c[i]);
	
	if (area.shape.toLowerCase() == 'circle') {
		this.x.tpos += c[0] - c[2];
		this.y.tpos += c[1] - c[2];
		this.x.t = this.y.t = 2 * c[2];
	} else {
		var maxX, maxY, minX = maxX = c[0], minY = maxY = c[1];
		for (var i = 0; i < c.length; i++) {
			if (i % 2 == 0) {
				minX = Math.min(minX, c[i]);
				maxX = Math.max(maxX, c[i]);
			} else {
				minY = Math.min(minY, c[i]);
				maxY = Math.max(maxY, c[i]);
			}
		}
		this.x.tpos += minX;
		this.x.t = maxX - minX;
		this.y.tpos += minY;
		this.y.t = maxY - minY;
	}
},
justify : function (p, moveOnly) {
	var tgtArr, tgt = p.target, dim = p == this.x ? 'x' : 'y';
	
	if (tgt && tgt.match(/ /)) {
		tgtArr = tgt.split(' ');
		tgt = tgtArr[0];
	}
	if (tgt && hs.$(tgt)) {
		p.pos = hs.getPosition(hs.$(tgt))[dim];
		if (tgtArr && tgtArr[1] && tgtArr[1].match(/^[-]?[0-9]+px$/)) 
			p.pos += parseInt(tgtArr[1]);
		if (p.size < p.minSize) p.size = p.minSize;
		
	} else if (p.justify == 'auto' || p.justify == 'center') {
	
		var hasMovedMin = false;
		
		var allowReduce = p.exp.allowSizeReduction;
		if (p.justify == 'center')
			p.pos = Math.round(p.scroll + (p.clientSize + p.marginMin - p.marginMax - p.get('wsize')) / 2);
		else
			p.pos = Math.round(p.pos - ((p.get('wsize') - p.t) / 2));
		if (p.pos < p.scroll + p.marginMin) {
			p.pos = p.scroll + p.marginMin;
			hasMovedMin = true;		
		}
		if (!moveOnly && p.size < p.minSize) {
			p.size = p.minSize;
			allowReduce = false;
		}
		if (p.pos + p.get('wsize') > p.scroll + p.clientSize - p.marginMax) {
			if (!moveOnly && hasMovedMin && allowReduce) {
				p.size = Math.min(p.size, p.get(dim == 'y' ? 'fitsize' : 'maxsize'));
			} else if (p.get('wsize') < p.get('fitsize')) {
				p.pos = p.scroll + p.clientSize - p.marginMax - p.get('wsize');
			} else { // image larger than viewport
				p.pos = p.scroll + p.marginMin;
				if (!moveOnly && allowReduce) p.size = p.get(dim == 'y' ? 'fitsize' : 'maxsize');
			}			
		}
		
		if (!moveOnly && p.size < p.minSize) {
			p.size = p.minSize;
			allowReduce = false;
		}
		
	
	} else if (p.justify == 'max') {
		p.pos = Math.floor(p.pos - p.size + p.t);
	}
	
		
	if (p.pos < p.marginMin) {
		var tmpMin = p.pos;
		p.pos = p.marginMin; 
		
		if (allowReduce && !moveOnly) p.size = p.size - (p.pos - tmpMin);
		
	}
},

correctRatio : function(ratio) {
	var x = this.x, 
		y = this.y,
		changed = false,
		xSize = Math.min(x.full, x.size),
		ySize = Math.min(y.full, y.size),
		useBox = (this.useBox || hs.padToMinWidth);
	
	if (xSize / ySize > ratio) { // width greater
		xSize = ySize * ratio;
		if (xSize < x.minSize) { // below minWidth
			xSize = x.minSize;
			ySize = xSize / ratio;
		}
		changed = true;
	
	} else if (xSize / ySize < ratio) { // height greater
		ySize = xSize / ratio;
		changed = true;
	}
	
	if (hs.padToMinWidth && x.full < x.minSize) {
		x.imgSize = x.full;
		y.size = y.imgSize = y.full;
	} else if (this.useBox) {
		x.imgSize = xSize;
		y.imgSize = ySize;
	} else {
		x.size = xSize;
		y.size = ySize;
	}
	changed = this.fitOverlayBox(useBox ? null : ratio, changed);
	if (useBox && y.size < y.imgSize) {
		y.imgSize = y.size;
		x.imgSize = y.size * ratio;
	}
	if (changed || useBox) {
		x.pos = x.tpos - x.cb + x.tb;
		x.minSize = x.size;
		this.justify(x, true);
	
		y.pos = y.tpos - y.cb + y.tb;
		y.minSize = y.size;
		this.justify(y, true);
		if (this.overlayBox) this.sizeOverlayBox();
	}
},
fitOverlayBox : function(ratio, changed) {
	var x = this.x, y = this.y;
	if (this.overlayBox && (this.isImage || this.allowHeightReduction)) {
		while (y.size > this.minHeight && x.size > this.minWidth 
				&&  y.get('wsize') > y.get('fitsize')) {
			y.size -= 10;
			if (ratio) x.size = y.size * ratio;
			this.sizeOverlayBox(0, 1);
			changed = true;
		}
	}
	return changed;
},

reflow : function () {
	if (this.scrollerDiv) {
		var h = /iframe/i.test(this.scrollerDiv.tagName) ? (this.getIframePageHeight() + 1) +'px' : 'auto';
		if (this.body) this.body.style.height = h;
		this.scrollerDiv.style.height = h;
		this.y.setSize(this.innerContent.offsetHeight);
	}
},

show : function () {
	var x = this.x, y = this.y;
	this.doShowHide('hidden');
	hs.fireEvent(this, 'onBeforeExpand');
	if (this.slideshow && this.slideshow.thumbstrip) this.slideshow.thumbstrip.selectThumb();
	
	// Apply size change
	this.changeSize(
		1, {
			wrapper: {
				width : x.get('wsize'),
				height : y.get('wsize'),
				left: x.pos,
				top: y.pos
			},
			content: {
				left: x.p1 + x.get('imgPad'),
				top: y.p1 + y.get('imgPad'),
				width:x.imgSize ||x.size,
				height:y.imgSize ||y.size
			}
		},
		hs.expandDuration
	);
},

changeSize : function(up, to, dur) {
	// transition
	var trans = this.transitions,
	other = up ? (this.last ? this.last.a : null) : hs.upcoming,
	t = (trans[1] && other 
			&& hs.getParam(other, 'transitions')[1] == trans[1]) ?
		trans[1] : trans[0];
		
	if (this[t] && t != 'expand') {
		this[t](up, to);
		return;
	}
	
	if (this.outline && !this.outlineWhileAnimating) {
		if (up) this.outline.setPosition();
		else this.outline.destroy(
				(this.isHtml && this.preserveContent));
	}
	
	
	if (!up) this.destroyOverlays();
	
	var exp = this,
		x = exp.x,
		y = exp.y,
		easing = this.easing;
	if (!up) easing = this.easingClose || easing;
	var after = up ?
		function() {
				
			if (exp.outline) exp.outline.table.style.visibility = "visible";
			setTimeout(function() {
				exp.afterExpand();
			}, 50);
		} :
		function() {
			exp.afterClose();
		};
	if (up) hs.setStyles( this.wrapper, {
		width: x.t +'px',
		height: y.t +'px'
	});
	if (up && this.isHtml) {
		hs.setStyles(this.wrapper, {
			left: (x.tpos - x.cb + x.tb) +'px',
			top: (y.tpos - y.cb + y.tb) +'px'
		});
	}
	if (this.fadeInOut) {
		hs.setStyles(this.wrapper, { opacity: up ? 0 : 1 });
		hs.extend(to.wrapper, { opacity: up });
	}
	hs.animate( this.wrapper, to.wrapper, {
		duration: dur,
		easing: easing,
		step: function(val, args) {
			if (exp.outline && exp.outlineWhileAnimating && args.prop == 'top') {
				var fac = up ? args.pos : 1 - args.pos;
				var pos = {
					w: x.t + (x.get('wsize') - x.t) * fac,
					h: y.t + (y.get('wsize') - y.t) * fac,
					x: x.tpos + (x.pos - x.tpos) * fac,
					y: y.tpos + (y.pos - y.tpos) * fac
				};
				exp.outline.setPosition(pos, 0, 1);				
			}
			if (exp.isHtml) {	
				if (args.prop == 'left') 
					exp.mediumContent.style.left = (x.pos - val) +'px';
				if (args.prop == 'top') 
					exp.mediumContent.style.top = (y.pos - val) +'px';
			}
		}
	});
	hs.animate( this.content, to.content, dur, easing, after);
	if (up) {
		this.wrapper.style.visibility = 'visible';
		this.content.style.visibility = 'visible';
		if (this.isHtml) this.innerContent.style.visibility = 'visible';
		this.a.className += ' highslide-active-anchor';
	}
},



fade : function(up, to) {
	this.outlineWhileAnimating = false;
	var exp = this,	t = up ? hs.expandDuration : 0;
	
	if (up) {
		hs.animate(this.wrapper, to.wrapper, 0);
		hs.setStyles(this.wrapper, { opacity: 0, visibility: 'visible' });
		hs.animate(this.content, to.content, 0);
		this.content.style.visibility = 'visible';

		hs.animate(this.wrapper, { opacity: 1 }, t, null, 
			function() { exp.afterExpand(); });
	}
	
	if (this.outline) {
		this.outline.table.style.zIndex = this.wrapper.style.zIndex;
		var dir = up || -1, 
			offset = this.outline.offset,
			startOff = up ? 3 : offset,
			endOff = up? offset : 3;
		for (var i = startOff; dir * i <= dir * endOff; i += dir, t += 25) {
			(function() {
				var o = up ? endOff - i : startOff - i;
				setTimeout(function() {
					exp.outline.setPosition(0, o, 1);
				}, t);
			})();
		}
	}
	
	
	if (up) {}//setTimeout(function() { exp.afterExpand(); }, t+50);
	else {
		setTimeout( function() {
			if (exp.outline) exp.outline.destroy(exp.preserveContent);
			
			exp.destroyOverlays();
	
			hs.animate( exp.wrapper, { opacity: 0 }, hs.restoreDuration, null, function(){
				exp.afterClose();
			});
		}, t);		
	}
},
crossfade : function (up, to, from) {
	if (!up) return;
	var exp = this, 
		last = this.last,
		x = this.x,
		y = this.y,
		lastX = last.x,
		lastY = last.y,
		wrapper = this.wrapper,
		content = this.content,
		overlayBox = this.overlayBox;
	hs.removeEventListener(document, 'mousemove', hs.dragHandler);
	
	hs.setStyles(content, { 
		width: (x.imgSize || x.size) +'px', 
		height: (y.imgSize || y.size) +'px'		
	});
	if (overlayBox) overlayBox.style.overflow = 'visible';
	this.outline = last.outline;
	if (this.outline) this.outline.exp = exp;
	last.outline = null;
	var fadeBox = hs.createElement('div', {
			className: 'highslide-image'
		}, { 
			position: 'absolute', 
			zIndex: 4,
			overflow: 'hidden',
			display: 'none'
		}
	);
	var names = { oldImg: last, newImg: this };
	for (var n in names) { 	
		this[n] = names[n].content.cloneNode(1);
		hs.setStyles(this[n], {
			position: 'absolute',
			border: 0,
			visibility: 'visible'
		});
		fadeBox.appendChild(this[n]);
	}
	wrapper.appendChild(fadeBox);
	if (this.isHtml) hs.setStyles(this.mediumContent, { 
		left: 0,
		top: 0
	});
	if (overlayBox) {
		overlayBox.className = '';
		wrapper.appendChild(overlayBox);
	}
	fadeBox.style.display = '';
	last.content.style.display = 'none';
	
	
	if (hs.safari) {
		var match = navigator.userAgent.match(/Safari\/([0-9]{3})/);
		if (match && parseInt(match[1]) < 525) this.wrapper.style.visibility = 'visible';
	}
	hs.animate(wrapper, {
		width: x.size
	}, {
		duration: hs.transitionDuration, 
		step: function(val, args) {
			var pos = args.pos,
				invPos = 1 - pos;
			var prop,
				size = {}, 
				props = ['pos', 'size', 'p1', 'p2'];
			for (var n in props) {
				prop = props[n];
				size['x'+ prop] = Math.round(invPos * lastX[prop] + pos * x[prop]);
				size['y'+ prop] = Math.round(invPos * lastY[prop] + pos * y[prop]);
				size.ximgSize = Math.round(
					invPos * (lastX.imgSize || lastX.size) + pos * (x.imgSize || x.size));
				size.ximgPad = Math.round(invPos * lastX.get('imgPad') + pos * x.get('imgPad'));
				size.yimgSize = Math.round(
					invPos * (lastY.imgSize || lastY.size) + pos * (y.imgSize || y.size));
				size.yimgPad = Math.round(invPos * lastY.get('imgPad') + pos * y.get('imgPad'));
			}
			if (exp.outline) exp.outline.setPosition({ 
				x: size.xpos, 
				y: size.ypos, 
				w: size.xsize + size.xp1 + size.xp2 + 2 * x.cb, 
				h: size.ysize + size.yp1 + size.yp2 + 2 * y.cb
			});
			last.wrapper.style.clip = 'rect('
				+ (size.ypos - lastY.pos)+'px, '
				+ (size.xsize + size.xp1 + size.xp2 + size.xpos + 2 * lastX.cb - lastX.pos) +'px, '
				+ (size.ysize + size.yp1 + size.yp2 + size.ypos + 2 * lastY.cb - lastY.pos) +'px, '
				+ (size.xpos - lastX.pos)+'px)';
				
			hs.setStyles(content, {
				top: (size.yp1 + y.get('imgPad')) +'px',
				left: (size.xp1 + x.get('imgPad')) +'px',
				marginTop: (y.pos - size.ypos) +'px',
				marginLeft: (x.pos - size.xpos) +'px'
			});
			hs.setStyles(wrapper, {
				top: size.ypos +'px',
				left: size.xpos +'px',
				width: (size.xp1 + size.xp2 + size.xsize + 2 * x.cb)+ 'px',
				height: (size.yp1 + size.yp2 + size.ysize + 2 * y.cb) + 'px'
			});
			hs.setStyles(fadeBox, {
				width: (size.ximgSize || size.xsize) + 'px',
				height: (size.yimgSize || size.ysize) +'px',
				left: (size.xp1 + size.ximgPad)  +'px',
				top: (size.yp1 + size.yimgPad) +'px',
				visibility: 'visible'
			});
			
			hs.setStyles(exp.oldImg, {
				top: (lastY.pos - size.ypos + lastY.p1 - size.yp1 + lastY.get('imgPad') - size.yimgPad)+'px',
				left: (lastX.pos - size.xpos + lastX.p1 - size.xp1 + lastX.get('imgPad') - size.ximgPad)+'px'
			});		
			
			hs.setStyles(exp.newImg, {
				opacity: pos,
				top: (y.pos - size.ypos + y.p1 - size.yp1 + y.get('imgPad') - size.yimgPad) +'px',
				left: (x.pos - size.xpos + x.p1 - size.xp1 + x.get('imgPad') - size.ximgPad) +'px'
			});
			if (overlayBox) hs.setStyles(overlayBox, {
				width: size.xsize + 'px',
				height: size.ysize +'px',
				left: (size.xp1 + x.cb)  +'px',
				top: (size.yp1 + y.cb) +'px'
			});
		},
		complete: function () {
			wrapper.style.visibility = content.style.visibility = 'visible';
			content.style.display = 'block';
			fadeBox.style.display = 'none';
			exp.a.className += ' highslide-active-anchor';
			exp.afterExpand();
			last.afterClose();
			exp.last = null;
		}
		
	});
},
reuseOverlay : function(o, el) {
	if (!this.last) return false;
	for (var i = 0; i < this.last.overlays.length; i++) {
		var oDiv = hs.$('hsId'+ this.last.overlays[i]);
		if (oDiv && oDiv.hsId == o.hsId) {
			this.genOverlayBox();
			oDiv.reuse = this.key;
			hs.push(this.overlays, this.last.overlays[i]);
			return true;
		}
	}
	return false;
},


afterExpand : function() {
	this.isExpanded = true;	
	this.focus();
	
	if (this.isHtml && this.objectLoadTime == 'after') this.writeExtendedContent();
	if (this.iframe) {
		try {
			var exp = this,
				doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
			hs.addEventListener(doc, 'mousedown', function () {
				if (hs.focusKey != exp.key) exp.focus();
			});
		} catch(e) {}
		if (hs.ie && typeof this.isClosing != 'boolean') // first open 
			this.iframe.style.width = (this.objectWidth - 1) +'px'; // hasLayout
	}
	if (this.dimmingOpacity) hs.dim(this);
	if (hs.upcoming && hs.upcoming == this.a) hs.upcoming = null;
	this.prepareNextOutline();
	var p = hs.page, mX = hs.mouse.x + p.scrollLeft, mY = hs.mouse.y + p.scrollTop;
	this.mouseIsOver = this.x.pos < mX && mX < this.x.pos + this.x.get('wsize')
		&& this.y.pos < mY && mY < this.y.pos + this.y.get('wsize');	
	if (this.overlayBox) this.showOverlays();
	hs.fireEvent(this, 'onAfterExpand');
	
},


prepareNextOutline : function() {
	var key = this.key;
	var outlineType = this.outlineType;
	new hs.Outline(outlineType, 
		function () { try { hs.expanders[key].preloadNext(); } catch (e) {} });
},


preloadNext : function() {
	var next = this.getAdjacentAnchor(1);
	if (next && next.onclick.toString().match(/hs\.expand/)) 
		var img = hs.createElement('img', { src: hs.getSrc(next) });
},


getAdjacentAnchor : function(op) {
	var current = this.getAnchorIndex(), as = hs.anchors.groups[this.slideshowGroup || 'none'];
	
	/*< ? if ($cfg->slideshow) : ?>s*/
	if (!as[current + op] && this.slideshow && this.slideshow.repeat) {
		if (op == 1) return as[0];
		else if (op == -1) return as[as.length-1];
	}
	/*< ? endif ?>s*/
	return as[current + op] || null;
},

getAnchorIndex : function() {
	var arr = hs.getAnchors().groups[this.slideshowGroup || 'none'];
	if (arr) for (var i = 0; i < arr.length; i++) {
		if (arr[i] == this.a) return i; 
	}
	return null;
},


getNumber : function() {
	if (this[this.numberPosition]) {
		var arr = hs.anchors.groups[this.slideshowGroup || 'none'];
		if (arr) {
			var s = hs.lang.number.replace('%1', this.getAnchorIndex() + 1).replace('%2', arr.length);
			this[this.numberPosition].innerHTML = 
				'<div class="highslide-number">'+ s +'</div>'+ this[this.numberPosition].innerHTML;
		}
	}
},
initSlideshow : function() {
	if (!this.last) {
		for (var i = 0; i < hs.slideshows.length; i++) {
			var ss = hs.slideshows[i], sg = ss.slideshowGroup;
			if (typeof sg == 'undefined' || sg === null || sg === this.slideshowGroup) 
				this.slideshow = new hs.Slideshow(this.key, ss);
		} 
	} else {
		this.slideshow = this.last.slideshow;
	}
	var ss = this.slideshow;
	if (!ss) return;
	var key = ss.expKey = this.key;
	
	ss.checkFirstAndLast();
	ss.disable('full-expand');
	if (ss.controls) {
		var o = ss.overlayOptions || {};
		o.overlayId = ss.controls;
		o.hsId = 'controls';		
		this.createOverlay(o);
	}
	if (ss.thumbstrip) ss.thumbstrip.add(this);
	if (!this.last && this.autoplay) ss.play(true);
	if (ss.autoplay) {
		ss.autoplay = setTimeout(function() {
			hs.next(key);
		}, (ss.interval || 500));
	}
},

cancelLoading : function() {
	hs.discardElement (this.wrapper);
	hs.expanders[this.key] = null;
	if (hs.upcoming == this.a) hs.upcoming = null;
	hs.undim(this.key);
	if (this.loading) hs.loading.style.left = '-9999px';
	hs.fireEvent(this, 'onHideLoading');
},

writeCredits : function () {
	if (this.credits) return;
	this.credits = hs.createElement('a', {
		href: hs.creditsHref,
		target: hs.creditsTarget,
		className: 'highslide-credits',
		innerHTML: hs.lang.creditsText,
		title: hs.lang.creditsTitle
	});
	this.createOverlay({ 
		overlayId: this.credits, 
		position: this.creditsPosition || 'top left', 
		hsId: 'credits' 
	});
},

getInline : function(types, addOverlay) {
	for (var i = 0; i < types.length; i++) {
		var type = types[i], s = null;
		if (type == 'caption' && !hs.fireEvent(this, 'onBeforeGetCaption')) return;
		else if (type == 'heading' && !hs.fireEvent(this, 'onBeforeGetHeading')) return;
		if (!this[type +'Id'] && this.thumbsUserSetId)  
			this[type +'Id'] = type +'-for-'+ this.thumbsUserSetId;
		if (this[type +'Id']) this[type] = hs.getNode(this[type +'Id']);
		if (!this[type] && !this[type +'Text'] && this[type +'Eval']) try {
			s = eval(this[type +'Eval']);
		} catch (e) {}
		if (!this[type] && this[type +'Text']) {
			s = this[type +'Text'];
		}
		if (!this[type] && !s) {
			this[type] = hs.getNode(this.a['_'+ type + 'Id']);
			if (!this[type]) {
				var next = this.a.nextSibling;
				while (next && !hs.isHsAnchor(next)) {
					if ((new RegExp('highslide-'+ type)).test(next.className || null)) {
						if (!next.id) this.a['_'+ type + 'Id'] = next.id = 'hsId'+ hs.idCounter++;
						this[type] = hs.getNode(next.id);
						break;
					}
					next = next.nextSibling;
				}
			}
		}
		if (!this[type] && !s && this.numberPosition == type) s = '\n';
		
		if (!this[type] && s) this[type] = hs.createElement('div', 
				{ className: 'highslide-'+ type, innerHTML: s } );
		
		if (addOverlay && this[type]) {
			var o = { position: (type == 'heading') ? 'above' : 'below' };
			for (var x in this[type+'Overlay']) o[x] = this[type+'Overlay'][x];
			o.overlayId = this[type];
			this.createOverlay(o);
		}
	}
},


// on end move and resize
doShowHide : function(visibility) {
	if (hs.hideSelects) this.showHideElements('SELECT', visibility);
	if (hs.hideIframes) this.showHideElements('IFRAME', visibility);
	if (hs.geckoMac) this.showHideElements('*', visibility);
},
showHideElements : function (tagName, visibility) {
	var els = document.getElementsByTagName(tagName);
	var prop = tagName == '*' ? 'overflow' : 'visibility';
	for (var i = 0; i < els.length; i++) {
		if (prop == 'visibility' || (document.defaultView.getComputedStyle(
				els[i], "").getPropertyValue('overflow') == 'auto'
				|| els[i].getAttribute('hidden-by') != null)) {
			var hiddenBy = els[i].getAttribute('hidden-by');
			if (visibility == 'visible' && hiddenBy) {
				hiddenBy = hiddenBy.replace('['+ this.key +']', '');
				els[i].setAttribute('hidden-by', hiddenBy);
				if (!hiddenBy) els[i].style[prop] = els[i].origProp;
			} else if (visibility == 'hidden') { // hide if behind
				var elPos = hs.getPosition(els[i]);
				elPos.w = els[i].offsetWidth;
				elPos.h = els[i].offsetHeight;
				if (!this.dimmingOpacity) { // hide all if dimming
				
					var clearsX = (elPos.x + elPos.w < this.x.get('opos') 
						|| elPos.x > this.x.get('opos') + this.x.get('osize'));
					var clearsY = (elPos.y + elPos.h < this.y.get('opos') 
						|| elPos.y > this.y.get('opos') + this.y.get('osize'));
				}
				var wrapperKey = hs.getWrapperKey(els[i]);
				if (!clearsX && !clearsY && wrapperKey != this.key) { // element falls behind image
					if (!hiddenBy) {
						els[i].setAttribute('hidden-by', '['+ this.key +']');
						els[i].origProp = els[i].style[prop];
						els[i].style[prop] = 'hidden';
						
					} else if (hiddenBy.indexOf('['+ this.key +']') == -1) {
						els[i].setAttribute('hidden-by', hiddenBy + '['+ this.key +']');
					}
				} else if ((hiddenBy == '['+ this.key +']' || hs.focusKey == wrapperKey)
						&& wrapperKey != this.key) { // on move
					els[i].setAttribute('hidden-by', '');
					els[i].style[prop] = els[i].origProp || '';
				} else if (hiddenBy && hiddenBy.indexOf('['+ this.key +']') > -1) {
					els[i].setAttribute('hidden-by', hiddenBy.replace('['+ this.key +']', ''));
				}
						
			}
		}
	}
},

focus : function() {
	this.wrapper.style.zIndex = hs.zIndexCounter += 2;
	// blur others
	for (var i = 0; i < hs.expanders.length; i++) {
		if (hs.expanders[i] && i == hs.focusKey) {
			var blurExp = hs.expanders[i];
			blurExp.content.className += ' highslide-'+ blurExp.contentType +'-blur';
			if (blurExp.isImage) {
				blurExp.content.style.cursor = hs.ie ? 'hand' : 'pointer';
				blurExp.content.title = hs.lang.focusTitle;	
			}	
			hs.fireEvent(blurExp, 'onBlur');
		}
	}
	
	// focus this
	if (this.outline) this.outline.table.style.zIndex 
		= this.wrapper.style.zIndex - 1;
	this.content.className = 'highslide-'+ this.contentType;
	if (this.isImage) {
		this.content.title = hs.lang.restoreTitle;
		
		if (hs.restoreCursor) {
			hs.styleRestoreCursor = window.opera ? 'pointer' : 'url('+ hs.graphicsDir + hs.restoreCursor +'), pointer';
			if (hs.ie && hs.uaVersion < 6) hs.styleRestoreCursor = 'hand';
			this.content.style.cursor = hs.styleRestoreCursor;
		}
	}
	hs.focusKey = this.key;	
	hs.addEventListener(document, window.opera ? 'keypress' : 'keydown', hs.keyHandler);	
	hs.fireEvent(this, 'onFocus');	
},
moveTo: function(x, y) {
	this.x.setPos(x);
	this.y.setPos(y);
},
resize : function (e) {
	var w, h, r = e.width / e.height;
	w = Math.max(e.width + e.dX, Math.min(this.minWidth, this.x.full));
	if (this.isImage && Math.abs(w - this.x.full) < 12) w = this.x.full;
	h = this.isHtml ? e.height + e.dY : w / r;
	if (h < Math.min(this.minHeight, this.y.full)) {
		h = Math.min(this.minHeight, this.y.full);
		if (this.isImage) w = h * r;
	}
	this.resizeTo(w, h);
},
resizeTo: function(w, h) {
	this.y.setSize(h);
	this.x.setSize(w);
	this.wrapper.style.height = this.y.get('wsize') +'px';
},

close : function() {
	if (this.isClosing || !this.isExpanded) return;
	if (this.transitions[1] == 'crossfade' && hs.upcoming) {
		hs.getExpander(hs.upcoming).cancelLoading();
		hs.upcoming = null;
	}
	if (!hs.fireEvent(this, 'onBeforeClose')) return;
	this.isClosing = true;
	if (this.slideshow && !hs.upcoming) this.slideshow.pause();
	
	hs.removeEventListener(document, window.opera ? 'keypress' : 'keydown', hs.keyHandler);
	
	try {
		if (this.isHtml) this.htmlPrepareClose();
		this.content.style.cursor = 'default';
		this.changeSize(
			0, {
				wrapper: {
					width : this.x.t,
					height : this.y.t,
					left: this.x.tpos - this.x.cb + this.x.tb,
					top: this.y.tpos - this.y.cb + this.y.tb
				},
				content: {
					left: 0,
					top: 0,
					width: this.x.t,
					height: this.y.t
				}
			}, hs.restoreDuration
		);
	} catch (e) { this.afterClose(); }
},

htmlPrepareClose : function() {
	if (hs.geckoMac) { // bad redraws
		if (!hs.mask) hs.mask = hs.createElement('div', null, 
			{ position: 'absolute' }, hs.container);
		hs.setStyles(hs.mask, { width: this.x.size +'px', height: this.y.size +'px', 
			left: this.x.pos +'px', top: this.y.pos +'px', display: 'block' });			
	}
	if (this.objectType == 'swf') try { hs.$(this.body.id).StopPlay(); } catch (e) {}
	
	if (this.objectLoadTime == 'after' && !this.preserveContent) this.destroyObject();		
	if (this.scrollerDiv && this.scrollerDiv != this.scrollingContent) 
		this.scrollerDiv.style.overflow = 'hidden';
},

destroyObject : function () {
	if (hs.ie && this.iframe)
		try { this.iframe.contentWindow.document.body.innerHTML = ''; } catch (e) {}
	if (this.objectType == 'swf') swfobject.removeSWF(this.body.id);
	this.body.innerHTML = '';
},

sleep : function() {
	if (this.outline) this.outline.table.style.display = 'none';
	this.releaseMask = null;
	this.wrapper.style.display = 'none';
	hs.push(hs.sleeping, this);
},

awake : function() {try {
	
	hs.expanders[this.key] = this;
	
	if (!hs.allowMultipleInstances &&hs.focusKey != this.key) {	
		try { hs.expanders[hs.focusKey].close(); } catch (e){}
	}
	
	var z = hs.zIndexCounter++, stl = { display: '', zIndex: z };
	hs.setStyles (this.wrapper, stl);
	this.isClosing = false;
	
	var o = this.outline || 0;
	if (o) {
		if (!this.outlineWhileAnimating) stl.visibility = 'hidden';
		hs.setStyles (o.table, stl);		
	}
	if (this.slideshow) {
		this.initSlideshow();
	}
		
	this.show();
} catch (e) {}


},

createOverlay : function (o) {
	var el = o.overlayId, 
		relToVP = (o.relativeTo == 'viewport' && !/panel$/.test(o.position));
	if (typeof el == 'string') el = hs.getNode(el);
	if (o.html) el = hs.createElement('div', { innerHTML: o.html });
	if (!el || typeof el == 'string') return;
	if (!hs.fireEvent(this, 'onCreateOverlay', { overlay: el })) return;
	el.style.display = 'block';
	o.hsId = o.hsId || o.overlayId; 
	if (this.transitions[1] == 'crossfade' && this.reuseOverlay(o, el)) return;
	this.genOverlayBox();
	var width = o.width && /^[0-9]+(px|%)$/.test(o.width) ? o.width : 'auto';
	if (/^(left|right)panel$/.test(o.position) && !/^[0-9]+px$/.test(o.width)) width = '200px';
	var overlay = hs.createElement(
		'div', {
			id: 'hsId'+ hs.idCounter++,
			hsId: o.hsId
		}, {
			position: 'absolute',
			visibility: 'hidden',
			width: width,
			direction: hs.lang.cssDirection || '',
			opacity: 0
		},
		relToVP ? hs.viewport :this.overlayBox,
		true
	);
	if (relToVP) overlay.hsKey = this.key;
	
	overlay.appendChild(el);
	hs.extend(overlay, {
		opacity: 1,
		offsetX: 0,
		offsetY: 0,
		dur: (o.fade === 0 || o.fade === false || (o.fade == 2 && hs.ie)) ? 0 : 250
	});
	hs.extend(overlay, o);
		
	if (this.gotOverlays) {
		this.positionOverlay(overlay);
		if (!overlay.hideOnMouseOut || this.mouseIsOver) 
			hs.animate(overlay, { opacity: overlay.opacity }, overlay.dur);
	}
	hs.push(this.overlays, hs.idCounter - 1);
},
positionOverlay : function(overlay) {
	var p = overlay.position || 'middle center',
		relToVP = (overlay.relativeTo == 'viewport'),
		offX = overlay.offsetX,
		offY = overlay.offsetY;
	if (relToVP) {
		hs.viewport.style.display = 'block';
		overlay.hsKey = this.key;
		if (overlay.offsetWidth > overlay.parentNode.offsetWidth)
			overlay.style.width = '100%';
	} else
	if (overlay.parentNode != this.overlayBox) this.overlayBox.appendChild(overlay);
	if (/left$/.test(p)) overlay.style.left = offX +'px'; 
	
	if (/center$/.test(p))	hs.setStyles (overlay, { 
		left: '50%',
		marginLeft: (offX - Math.round(overlay.offsetWidth / 2)) +'px'
	});	
	
	if (/right$/.test(p)) overlay.style.right = - offX +'px';
		
	if (/^leftpanel$/.test(p)) { 
		hs.setStyles(overlay, {
			right: '100%',
			marginRight: this.x.cb +'px',
			top: - this.y.cb +'px',
			bottom: - this.y.cb +'px',
			overflow: 'auto'
		});		 
		this.x.p1 = overlay.offsetWidth;
	
	} else if (/^rightpanel$/.test(p)) {
		hs.setStyles(overlay, {
			left: '100%',
			marginLeft: this.x.cb +'px',
			top: - this.y.cb +'px',
			bottom: - this.y.cb +'px',
			overflow: 'auto'
		});
		this.x.p2 = overlay.offsetWidth;
	}
	var parOff = overlay.parentNode.offsetHeight;
	overlay.style.height = 'auto';
	if (relToVP && overlay.offsetHeight > parOff)
		overlay.style.height = hs.ieLt7 ? parOff +'px' : '100%';

	if (/^top/.test(p)) overlay.style.top = offY +'px'; 
	if (/^middle/.test(p))	hs.setStyles (overlay, { 
		top: '50%', 
		marginTop: (offY - Math.round(overlay.offsetHeight / 2)) +'px'
	});	
	if (/^bottom/.test(p)) overlay.style.bottom = - offY +'px';
	if (/^above$/.test(p)) {
		hs.setStyles(overlay, {
			left: (- this.x.p1 - this.x.cb) +'px',
			right: (- this.x.p2 - this.x.cb) +'px',
			bottom: '100%',
			marginBottom: this.y.cb +'px',
			width: 'auto'
		});
		this.y.p1 = overlay.offsetHeight;
	
	} else if (/^below$/.test(p)) {
		hs.setStyles(overlay, {
			position: 'relative',
			left: (- this.x.p1 - this.x.cb) +'px',
			right: (- this.x.p2 - this.x.cb) +'px',
			top: '100%',
			marginTop: this.y.cb +'px',
			width: 'auto'
		});
		this.y.p2 = overlay.offsetHeight;
		overlay.style.position = 'absolute';
	}
},

getOverlays : function() {	
	this.getInline(['heading', 'caption'], true);
	this.getNumber();
	if (this.caption) hs.fireEvent(this, 'onAfterGetCaption');
	if (this.heading) hs.fireEvent(this, 'onAfterGetHeading');
	if (this.heading && this.dragByHeading) this.heading.className += ' highslide-move';
	if (hs.showCredits) this.writeCredits();
	for (var i = 0; i < hs.overlays.length; i++) {
		var o = hs.overlays[i], tId = o.thumbnailId, sg = o.slideshowGroup;
		if ((!tId && !sg) || (tId && tId == this.thumbsUserSetId)
				|| (sg && sg === this.slideshowGroup)) {
			if (this.isImage || (this.isHtml && o.useOnHtml))
			this.createOverlay(o);
		}
	}
	var os = [];
	for (var i = 0; i < this.overlays.length; i++) {
		var o = hs.$('hsId'+ this.overlays[i]);
		if (/panel$/.test(o.position)) this.positionOverlay(o);
		else hs.push(os, o);
	}
	for (var i = 0; i < os.length; i++) this.positionOverlay(os[i]);
	this.gotOverlays = true;
},
genOverlayBox : function() {
	if (!this.overlayBox) this.overlayBox = hs.createElement (
		'div', {
			className: this.wrapperClassName
		}, {
			position : 'absolute',
			width: (this.x.size || (this.useBox ? this.width : null) 
				|| this.x.full) +'px',
			height: (this.y.size || this.y.full) +'px',
			visibility : 'hidden',
			overflow : 'hidden',
			zIndex : hs.ie ? 4 : 'auto'
		},
		hs.container,
		true
	);
},
sizeOverlayBox : function(doWrapper, doPanels) {
	var overlayBox = this.overlayBox, 
		x = this.x,
		y = this.y;
	hs.setStyles( overlayBox, {
		width: x.size +'px', 
		height: y.size +'px'
	});
	if (doWrapper || doPanels) {
		for (var i = 0; i < this.overlays.length; i++) {
			var o = hs.$('hsId'+ this.overlays[i]);
			var ie6 = (hs.ieLt7 || document.compatMode == 'BackCompat');
			if (o && /^(above|below)$/.test(o.position)) {
				if (ie6) {
					o.style.width = (overlayBox.offsetWidth + 2 * x.cb
						+ x.p1 + x.p2) +'px';
				}
				y[o.position == 'above' ? 'p1' : 'p2'] = o.offsetHeight;
			}
			if (o && ie6 && /^(left|right)panel$/.test(o.position)) {
				o.style.height = (overlayBox.offsetHeight + 2* y.cb) +'px';
			}
		}
	}
	if (doWrapper) {
		hs.setStyles(this.content, {
			top: y.p1 +'px'
		});
		hs.setStyles(overlayBox, {
			top: (y.p1 + y.cb) +'px'
		});
	}
},

showOverlays : function() {
	var b = this.overlayBox;
	b.className = '';
	hs.setStyles(b, {
		top: (this.y.p1 + this.y.cb) +'px',
		left: (this.x.p1 + this.x.cb) +'px',
		overflow : 'visible'
	});
	if (hs.safari) b.style.visibility = 'visible';
	this.wrapper.appendChild (b);
	for (var i = 0; i < this.overlays.length; i++) {
		var o = hs.$('hsId'+ this.overlays[i]);
		o.style.zIndex = o.hsId == 'controls' ? 5 : 4;
		if (!o.hideOnMouseOut || this.mouseIsOver) {
			o.style.visibility = 'visible';
			hs.setStyles(o, { visibility: 'visible', display: '' });
			hs.animate(o, { opacity: o.opacity }, o.dur);
		}
	}
},

destroyOverlays : function() {
	if (!this.overlays.length) return;
	if (this.slideshow) {
		var c = this.slideshow.controls;
		if (c && hs.getExpander(c) == this) c.parentNode.removeChild(c);
	}
	for (var i = 0; i < this.overlays.length; i++) {
		var o = hs.$('hsId'+ this.overlays[i]);
		if (o && o.parentNode == hs.viewport && hs.getExpander(o) == this) hs.discardElement(o);
	}
	if (this.isHtml && this.preserveContent) {
		this.overlayBox.style.top = '-9999px';
		hs.container.appendChild(this.overlayBox);
	} else
	hs.discardElement(this.overlayBox);
},



createFullExpand : function () {
	if (this.slideshow && this.slideshow.controls) {
		this.slideshow.enable('full-expand');
		return;
	}
	this.fullExpandLabel = hs.createElement(
		'a', {
			href: 'javascript:hs.expanders['+ this.key +'].doFullExpand();',
			title: hs.lang.fullExpandTitle,
			className: 'highslide-full-expand'
		}
	);
	if (!hs.fireEvent(this, 'onCreateFullExpand')) return;
	
	this.createOverlay({ 
		overlayId: this.fullExpandLabel, 
		position: hs.fullExpandPosition, 
		hideOnMouseOut: true, 
		opacity: hs.fullExpandOpacity
	});
},

doFullExpand : function () {
	try {
		if (!hs.fireEvent(this, 'onDoFullExpand')) return;
		if (this.fullExpandLabel) hs.discardElement(this.fullExpandLabel);
		
		this.focus();
		var xSize = this.x.size;
		this.resizeTo(this.x.full, this.y.full);
		
		var xpos = this.x.pos - (this.x.size - xSize) / 2;
		if (xpos < hs.marginLeft) xpos = hs.marginLeft;
		
		this.moveTo(xpos, this.y.pos);
		this.doShowHide('hidden');
	
	} catch (e) {
		this.error(e);
	}
},


afterClose : function () {
	this.a.className = this.a.className.replace('highslide-active-anchor', '');
	
	this.doShowHide('visible');	
	
	if (this.isHtml && this.preserveContent
			 && this.transitions[1] != 'crossfade') {
		this.sleep();
	} else {
		if (this.outline && this.outlineWhileAnimating) this.outline.destroy();
	
		hs.discardElement(this.wrapper);
	}
	if (hs.mask) hs.mask.style.display = 'none';
	this.destroyOverlays();
	if (!hs.viewport.childNodes.length) hs.viewport.style.display = 'none';
	
	if (this.dimmingOpacity) hs.undim(this.key);
	hs.fireEvent(this, 'onAfterClose');
	hs.expanders[this.key] = null;		
	hs.reOrder();
}

};


// hs.Ajax object prototype
hs.Ajax = function (a, content, pre) {
	this.a = a;
	this.content = content;
	this.pre = pre;
};

hs.Ajax.prototype = {
run : function () {
	var xhr;
	if (!this.src) this.src = hs.getSrc(this.a);
	if (this.src.match('#')) {
		var arr = this.src.split('#');
		this.src = arr[0];
		this.id = arr[1];
	}
	if (hs.cachedGets[this.src]) {
		this.cachedGet = hs.cachedGets[this.src];
		if (this.id) this.getElementContent();
		else this.loadHTML();
		return;
	}
	try { xhr = new XMLHttpRequest(); }
	catch (e) {
		try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch (e) {
			try { xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e) { this.onError(); }
		}
	}
	var pThis = this; 
	xhr.onreadystatechange = function() {
		if(pThis.xhr.readyState == 4) {
			if (pThis.id) pThis.getElementContent();
			else pThis.loadHTML();
		}
	};
	var src = this.src;
	this.xhr = xhr;
	if (hs.forceAjaxReload) 
		src = src.replace(/$/, (/\?/.test(src) ? '&' : '?') +'dummy='+ (new Date()).getTime());
	xhr.open('GET', src, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(null);
},

getElementContent : function() {
	hs.init();
	var attribs = window.opera || hs.ie6SSL ? { src: 'about:blank' } : null;
	
	this.iframe = hs.createElement('iframe', attribs, 
		{ position: 'absolute', top: '-9999px' }, hs.container);
		
	this.loadHTML();
},

loadHTML : function() {
	var s = this.cachedGet || this.xhr.responseText,
		regBody;
	if (this.pre) hs.cachedGets[this.src] = s;
	if (!hs.ie || hs.uaVersion >= 5.5) {
		s = s.replace(new RegExp('<link[^>]*>', 'gi'), '')
			.replace(new RegExp('<script[^>]*>.*?</script>', 'gi'), '');
		if (this.iframe) {
			var doc = this.iframe.contentDocument;
			if (!doc && this.iframe.contentWindow) doc = this.iframe.contentWindow.document;
			if (!doc) { // Opera
				var pThis = this;
				setTimeout(function() {	pThis.loadHTML(); }, 25);
				return;
			}
			doc.open();
			doc.write(s);
			doc.close();
			try { s = doc.getElementById(this.id).innerHTML; } catch (e) {
				try { s = this.iframe.document.getElementById(this.id).innerHTML; } catch (e) {} // opera
			}
			hs.discardElement(this.iframe);
		} else {
			regBody = /(<body[^>]*>|<\/body>)/ig;
			
			if (regBody.test(s)) s = s.split(regBody)[hs.ie ? 1 : 2];
		}
	}
	hs.getElementByClass(this.content, 'DIV', 'highslide-body').innerHTML = s;
	this.onLoad();
	for (var x in this) this[x] = null;
}
};


hs.Slideshow = function (expKey, options) {
	if (hs.dynamicallyUpdateAnchors !== false) hs.updateAnchors();
	this.expKey = expKey;
	for (var x in options) this[x] = options[x];
	if (this.useControls) this.getControls();
	if (this.thumbstrip) this.thumbstrip = hs.Thumbstrip(this);
};
hs.Slideshow.prototype = {
getControls: function() {
	this.controls = hs.createElement('div', { innerHTML: hs.replaceLang(hs.skin.controls) }, 
		null, hs.container);
	
	var buttons = ['play', 'pause', 'previous', 'next', 'move', 'full-expand', 'close'];
	this.btn = {};
	var pThis = this;
	for (var i = 0; i < buttons.length; i++) {
		this.btn[buttons[i]] = hs.getElementByClass(this.controls, 'li', 'highslide-'+ buttons[i]);
		this.enable(buttons[i]);
	}
	this.btn.pause.style.display = 'none';
	//this.disable('full-expand');
},
checkFirstAndLast: function() {
	if (this.repeat || !this.controls) return;
	var exp = hs.expanders[this.expKey],
		cur = exp.getAnchorIndex(), 
		re = /disabled$/;
	if (cur == 0) 
		this.disable('previous');
	else if (re.test(this.btn.previous.getElementsByTagName('a')[0].className))
		this.enable('previous');
	if (cur + 1 == hs.anchors.groups[exp.slideshowGroup || 'none'].length) {
		this.disable('next');
		this.disable('play');
	} else if (re.test(this.btn.next.getElementsByTagName('a')[0].className)) {
		this.enable('next');
		this.enable('play');
	}
},
enable: function(btn) {
	if (!this.btn) return;
	var sls = this, a = this.btn[btn].getElementsByTagName('a')[0], re = /disabled$/;
	a.onclick = function() {
		sls[btn]();
		return false;
	};
	if (re.test(a.className)) a.className = a.className.replace(re, '');
},
disable: function(btn) {
	if (!this.btn) return;
	var a = this.btn[btn].getElementsByTagName('a')[0];
	a.onclick = function() { return false; };
	if (!/disabled$/.test(a.className)) a.className += ' disabled';
},
hitSpace: function() {
	if (this.autoplay) this.pause();
	else this.play();
},
play: function(wait) {
	if (this.btn) {
		this.btn.play.style.display = 'none';
		this.btn.pause.style.display = '';
	}
	
	this.autoplay = true;	
	if (!wait) hs.next(this.expKey);
},
pause: function() {
	if (this.btn) {
		this.btn.pause.style.display = 'none';
		this.btn.play.style.display = '';
	}
	
	clearTimeout(this.autoplay);
	this.autoplay = null;
},
previous: function() {
	this.pause();
	hs.previous(this.btn.previous);
},
next: function() {
	this.pause();
	hs.next(this.btn.next);
},
move: function() {},
'full-expand': function() {
	hs.getExpander().doFullExpand();
},
close: function() {
	hs.close(this.btn.close);
}
};
hs.Thumbstrip = function(slideshow) {
	function add (exp) {
		hs.extend(options || {}, {
			overlayId: dom,
			hsId: 'thumbstrip',
			className: 'highslide-thumbstrip-'+ mode +'-overlay ' + (options.className || '')
		});
		if (hs.ieLt7) options.fade = 0;
		exp.createOverlay(options);
		hs.setStyles(dom.parentNode, { overflow: 'hidden' });
	};
	
	function scroll (delta) {	
		selectThumb(undefined, Math.round(delta * dom[isX ? 'offsetWidth' : 'offsetHeight'] * 0.7));
	};
	
	function selectThumb (i, scrollBy) {
		if (i === undefined) for (var j = 0; j < group.length; j++) {
			if (group[j] == hs.expanders[slideshow.expKey].a) {
				i = j;
				break;
			}
		}
		if (i === undefined) return;
		var as = dom.getElementsByTagName('a'),
			active = as[i],
			cell = active.parentNode,
			left = isX ? 'Left' : 'Top',
			right = isX ? 'Right' : 'Bottom',
			width = isX ? 'Width' : 'Height',
			offsetLeft = 'offset' + left,
			offsetWidth = 'offset' + width,
			overlayWidth = div.parentNode.parentNode[offsetWidth],
			minTblPos = overlayWidth - table[offsetWidth],
			curTblPos = parseInt(table.style[isX ? 'left' : 'top']) || 0,
			tblPos = curTblPos,
			mgnRight = 20;
		if (scrollBy !== undefined) {
			tblPos = curTblPos - scrollBy;
			
			if (minTblPos > 0) minTblPos = 0;
			if (tblPos > 0) tblPos = 0;
			if (tblPos < minTblPos) tblPos = minTblPos;
			
	
		} else {
			for (var j = 0; j < as.length; j++) as[j].className = '';
			active.className = 'highslide-active-anchor';
			var activeLeft = i > 0 ? as[i - 1].parentNode[offsetLeft] : cell[offsetLeft],
				activeRight = cell[offsetLeft] + cell[offsetWidth] + 
					(as[i + 1] ? as[i + 1].parentNode[offsetWidth] : 0);
			if (activeRight > overlayWidth - curTblPos) tblPos = overlayWidth - activeRight;
			else if (activeLeft < -curTblPos) tblPos = -activeLeft;
		}
		var markerPos = cell[offsetLeft] + (cell[offsetWidth] - marker[offsetWidth]) / 2 + tblPos;
		hs.animate(table, isX ? { left: tblPos } : { top: tblPos }, null, 'easeOutQuad');
		hs.animate(marker, isX ? { left: markerPos } : { top: markerPos }, null, 'easeOutQuad');
		scrollUp.style.display = tblPos < 0 ? 'block' : 'none';
		scrollDown.style.display = (tblPos > minTblPos)  ? 'block' : 'none';
		
	};
	

	// initialize
	var group = hs.anchors.groups[hs.expanders[slideshow.expKey].slideshowGroup || 'none'],
		options = slideshow.thumbstrip,
		mode = options.mode || 'horizontal',
		floatMode = (mode == 'float'),
		tree = floatMode ? ['div', 'ul', 'li', 'span'] : ['table', 'tbody', 'tr', 'td'],
		isX = (mode == 'horizontal'),
		dom = hs.createElement('div', {
				className: 'highslide-thumbstrip highslide-thumbstrip-'+ mode,
				innerHTML:
					'<div class="highslide-thumbstrip-inner">'+
					'<'+ tree[0] +'><'+ tree[1] +'></'+ tree[1] +'></'+ tree[0] +'></div>'+
					'<div class="highslide-scroll-up"><div></div></div>'+
					'<div class="highslide-scroll-down"><div></div></div>'+
					'<div class="highslide-marker"><div></div></div>'
			}, {
				display: 'none'
			}, hs.container),
		domCh = dom.childNodes,
		div = domCh[0],
		scrollUp = domCh[1],
		scrollDown = domCh[2],
		marker = domCh[3],
		table = div.firstChild,
		tbody = dom.getElementsByTagName(tree[1])[0],
		tr;
	for (var i = 0; i < group.length; i++) {
		if (i == 0 || !isX) tr = hs.createElement(tree[2], null, null, tbody);
		(function(){
			var a = group[i],
				cell = hs.createElement(tree[3], null, null, tr),
				pI = i;
			hs.createElement('a', {
				href: a.href,
				onclick: function() {
					hs.getExpander(this).focus();
					return hs.transit(a);
				},
				innerHTML: hs.stripItemFormatter ? hs.stripItemFormatter(a) : a.innerHTML
			}, null, cell);
		})();
	}
	if (!floatMode) {
		scrollUp.onclick = function () { scroll(-1); };
		scrollDown.onclick = function() { scroll(1); };
		hs.addEventListener(tbody, document.onmousewheel !== undefined ? 
				'mousewheel' : 'DOMMouseScroll', function(e) {        
			var delta = 0;
	        e = e || window.event;
	        if (e.wheelDelta) {
				delta = e.wheelDelta/120;
				if (hs.opera) delta = -delta;
	        } else if (e.detail) {
				delta = -e.detail/3;
	        }
	        if (delta) scroll(-delta * 0.2);
			if (e.preventDefault) e.preventDefault();
			e.returnValue = false;
		});
	}
	
	return {
		add: add,
		selectThumb: selectThumb
	}
};
hs.langDefaults = hs.lang;
// history
var HsExpander = hs.Expander;
if (hs.ie) {
	(function () {
		try {
			document.documentElement.doScroll('left');
		} catch (e) {
			setTimeout(arguments.callee, 50);
			return;
		}
		hs.ready();
	})();
}
hs.addEventListener(document, 'DOMContentLoaded', hs.ready);
hs.addEventListener(window, 'load', hs.ready);

// set handlers
hs.addEventListener(document, 'ready', function() {
	if (hs.expandCursor || hs.dimmingOpacity) {
		var style = hs.createElement('style', { type: 'text/css' }, null, 
			document.getElementsByTagName('HEAD')[0]);
			
		function addRule(sel, dec) {		
			if (!hs.ie) {
				style.appendChild(document.createTextNode(sel + " {" + dec + "}"));
			} else {
				var last = document.styleSheets[document.styleSheets.length - 1];
				if (typeof(last.addRule) == "object") last.addRule(sel, dec);
			}
		}
		function fix(prop) {
			return 'expression( ( ( ignoreMe = document.documentElement.'+ prop +
				' ? document.documentElement.'+ prop +' : document.body.'+ prop +' ) ) + \'px\' );';
		}
		if (hs.expandCursor) addRule ('.highslide img', 
			'cursor: url('+ hs.graphicsDir + hs.expandCursor +'), pointer !important;');
		addRule ('.highslide-viewport-size',
			hs.ie && (hs.uaVersion < 7 || document.compatMode == 'BackCompat') ?
				'position: absolute; '+
				'left:'+ fix('scrollLeft') +
				'top:'+ fix('scrollTop') +
				'width:'+ fix('clientWidth') +
				'height:'+ fix('clientHeight') :
				'position: fixed; width: 100%; height: 100%; left: 0; top: 0');
	}
});
hs.addEventListener(window, 'resize', function() {
	hs.getPageSize();
	if (hs.viewport) for (var i = 0; i < hs.viewport.childNodes.length; i++) {
		var node = hs.viewport.childNodes[i],
			exp = hs.getExpander(node);
		exp.positionOverlay(node);
		if (node.hsId == 'thumbstrip') exp.slideshow.thumbstrip.selectThumb();
	}
});
hs.addEventListener(document, 'mousemove', function(e) {
	hs.mouse = { x: e.clientX, y: e.clientY	};
});
hs.addEventListener(document, 'mousedown', hs.mouseClickHandler);
hs.addEventListener(document, 'mouseup', hs.mouseClickHandler);
hs.addEventListener(document, 'ready', hs.setClickEvents);
hs.addEventListener(window, 'load', hs.preloadImages);
hs.addEventListener(window, 'load', hs.preloadAjax);
}

