var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[Object.keys(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// ../facade-client/dist/facade.js
function Z(t = []) {
  let e = [t].flat().join(`
`), r;
  try {
    r = new CSSStyleSheet(), r.replaceSync(e);
  } catch (n2) {
  }
  return { css: e, constructedSheet: r };
}
function Y(t = [], e) {
  let { css: r, constructedSheet: n2 } = Z(t);
  n2 ? e.adoptedStyleSheets = [...e.adoptedStyleSheets, n2] : (e.head ? e.head : e).appendChild(Object.assign(document.createElement("style"), { textContent: t }));
}
function gn(t, e) {
  return Array.from({ length: Math.ceil(t.length / e) }, (r, n2) => t.slice(n2 * e, n2 * e + e));
}
function Qe(t = []) {
  let e = t.length, r;
  for (; e; ) {
    let n2 = Math.floor(Math.random() * e--), i = t[e];
    r = t[e], t[n2] = r;
  }
  return t;
}
function yn(t, e, r = 0.5) {
  let n2, i = Math.round((e[0] - t[0]) * r + t[0]) * 65536 + Math.round((e[1] - t[1]) * r + t[1]) * 256 + Math.round((e[2] - t[2]) * r + t[2]);
  return t[3] > -1 && e[3] > -1 ? n2 = Math.round(((e[3] - t[3]) * r + t[3]) * 255) : e[3] > -1 ? n2 = Math.round(e[3] * 255) : t[3] > -1 ? n2 = Math.round(t[3] * 255) : n2 = 255, "#" + (4294967296 + n2 * 16777216 + i).toString(16).slice(t[3] > -1 || e[3] > -1 ? 1 : 3);
}
function mn(t, e, r = 3) {
  function n2(c, u, l2) {
    return Math.sqrt((1 - l2) * Math.pow(c, 2) + l2 * Math.pow(u, 2));
  }
  __name(n2, "n");
  s(n2, "o"), f(n2, "blendValue");
  function i(c) {
    let u = new RegExp(/(rgb\(|)(?<r>\d{1,3}),(\s*|)(?<g>\d{1,3}),(\s*|)(?<b>\d{1,3})(\)|)/), l2 = new RegExp(/^#?(?<r>[a-f\d]{2})(?<g>[a-f\d]{2})(?<b>[a-f\d]{2})$/i), v2 = c.match(u), y2 = c.match(l2);
    return v2 ? v2.groups : Object.keys(y2.groups).reduce((d2, b) => (d2[b] = parseInt(y2.groups[b], 16), d2), {});
  }
  __name(i, "i");
  s(i, "s"), f(i, "inputToRGB");
  let [o, a] = [i(t), i(e)];
  return [...Array(r).keys()].map((c) => ["r", "g", "b"].map((u) => n2(o[u], a[u], c * (1 / r))));
}
function bn(t = "") {
  let e = parseInt(t, 36).toString(16).slice(0, 6).padEnd(6, "0").match(/.{1,2}/g).map((i) => +`0x${i}`), r = Math.min.apply(Math, e), n2 = e.indexOf(Math.min.apply(Math, e));
  return e[n2] = 255, { fg: e.map((i) => Math.floor(i).toString(16)).join(""), bg: e.map((i) => Math.floor(i * 0.35).toString(16)).join("") };
}
function wn(t) {
  let e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  t.match(e) && (t = t.replace(e, (n2, i, o, a) => i + i + o + o + a + a));
  let r = t.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)];
}
function xn(t) {
  return Object.keys(t).reduce((e, r) => (e += r, e += JSON.stringify(t[r]).replace(/"/g, "").replace(/,/g, ";"), e), "");
}
function kn(t = "") {
  return parseInt(t.toUpperCase(), 36).toString(16).slice(0, 6).padEnd(6, "0");
}
function jn(t, e) {
  return Object.keys(t).reduce((r, n2) => (r[n2] = +`0x${+e[`--${t[n2]}`].replace(/#/, "")}`, r), {});
}
function ue(t, e = 2) {
  return String(t).padStart(e, 0);
}
function N(t, e = {}) {
  let r = new Date(t || Date.now()), n2 = Object.assign({}, { utc: false, padStart: 2, join: true }, e), i = n2.utc ? "UTC" : "", o = [r[`get${i}FullYear`](), r[`get${i}Month`]() + 1, r[`get${i}Date`]()].map((a) => ue(a.toString(), n2.padStart));
  return n2.join ? +o.join("") : o;
}
function Q(t, e = {}) {
  let r = new Date(t || Date.now()), n2 = Object.assign({}, { utc: false, ms: false, padStart: 2, join: true }, e), i = n2.utc ? "UTC" : "", o = [r[`get${i}Hours`](), r[`get${i}Minutes`](), r[`get${i}Seconds`](), n2.ms ? r[`get${i}Milliseconds`]() : null].filter((a) => a !== null).map((a) => ue(a.toString(), n2.padStart));
  return n2.join ? o.join("") : o;
}
function Sn(t, e = {}) {
  let r = new Date(t || Date.now()), n2 = Object.assign({}, { utc: false, ms: false, padStart: 2 }, e, { join: true });
  return +[N(t, n2), Q(t, n2)].join("");
}
function On(t, e = {}) {
  let r = new Date(t || Date.now()), n2 = Object.assign({}, { utc: false, padStart: 2, delimiter: "/" }, e);
  return N(t, Object.assign({}, n2, { join: false })).join(n2.delimiter || "");
}
function En(t, e = {}) {
  let r = new Date(t || Date.now()), n2 = Object.assign({}, { utc: false, ms: false, padStart: 2, delimiter: ":" }, e);
  return Q(t, Object.assign({}, n2, { join: false })).join(n2.delimiter || "");
}
function Cn(t, e = {}) {
  let r = new Date(t || Date.now()), n2 = Object.assign({}, { utc: false, ms: false, padStart: 2, dateDelimiter: "/", timeDelimiter: ":" }, e);
  return [N(t, Object.assign({}, n2, { join: false })).join(n2.dateDelimiter || ""), Q(t, Object.assign({}, n2, { join: false })).join(n2.timeDelimiter || "")].join(" ");
}
async function Tn(t) {
  if (!t)
    return "";
  let e = new FileReader();
  return e.readAsDataURL(t), new Promise((r) => {
    e.onloadend = () => r(e.result);
  });
}
function Pn(t, e = "png") {
  if (!t)
    return "";
  let r = (() => typeof btoa == "function" ? btoa((t.data || t).reduce((n2, i) => n2 + String.fromCharCode(i), "")) : Buffer.from(t).toString("base64"))();
  return `data:image/${e};base64,${r}`;
}
function et(t, e, r, n2) {
  let i = Math.min(r / t, n2 / e);
  return { width: t * i, height: e * i };
}
function An(t, e, r, n2 = true) {
  if (typeof document == "undefined")
    throw new Error("Must run in browser context");
  return new Promise((i) => {
    let o = f((c, u) => {
      let l2 = document.createElement("canvas"), v2 = l2.getContext("2d"), y2 = [e || c, r || u];
      return Object.assign(l2, n2 ? et(c, u, y2[0], y2[1]) : { width: y2[0], height: y2[1] }), v2.drawImage(a, 0, 0, l2.width, l2.height), l2.toDataURL();
    }, "draw"), a = new Image();
    a.src = t, a.onload = () => {
      i(o(a.width, a.height));
    };
  });
}
function tt(t, e, r) {
  return Math.max(+e, Math.min(+t, +r));
}
function qn(t, e = 1) {
  return [typeof t == "string", typeof t?.[Symbol.iterator] != "function"].some((r) => r) ? void 0 : [["number", "string"].includes(typeof e), !isNaN(e)].every((r) => r) ? Qe(Array.from(t)).slice(0, tt(Math.abs(e), 1, t.length || t.size)) : [];
}
function $n(t, e) {
  return Math.floor(Math.random() * (e - t + 1) + t);
}
function ee(t) {
  return t || (t = ""), t.replace(/([A-Z])/g, (e, r) => " " + r.toLowerCase()).replace(/[_\- ]+(.)/g, " $1").trim();
}
function D(t) {
  return ee(t).replace(/\s(.)/g, (e, r) => r.toUpperCase());
}
function ce(t) {
  return Array.isArray(t) ? t.map((e) => ce(e)) : t != null && t.constructor === Object ? Object.keys(t).reduce((e, r) => ({ ...e, [D(r)]: ce(t[r]) }), {}) : t;
}
function rt(t) {
  return ee(t).replace(/[ ]/g, "_");
}
function Mn(t, e = {}) {
  let r = {}, n2 = Object.assign({}, t, e);
  for (let i in n2)
    r[rt(i)] = n2[i];
  return r;
}
function fe(t) {
  return ee(t).replace(/[ ]/g, "-");
}
function Rn(t, e = {}) {
  let r = {}, n2 = Object.assign({}, t, e);
  for (let i in n2)
    r[fe(i)] = n2[i];
  return r;
}
function nt(t) {
  return t ? typeof t == "string" ? t : Object.keys(t).reduce((e, r) => {
    let n2 = t[r];
    return typeof n2 == "object" && n2 !== null ? e += `${r} {
${nt(n2)}}
` : (r.startsWith("--") || (r = fe(r)), e += `${r}: ${n2};
`), e;
  }, "") : "";
}
function it(t, e = []) {
  return new Proxy(t, { get(r, n2, i) {
    return typeof r[n2] == "object" ? (Object.defineProperty(r[n2], "parentPath", { get: () => e }), it(r[n2], e.concat([n2]))) : typeof r[n2] == "function" ? r[n2].bind({ get parentPath() {
      return e;
    }, ...r }) : r[n2];
  } });
}
function Dn(t = {}, e) {
  return Object.entries(t).reduce((r, [n2, i]) => (r[e(n2, i)] = i, r), {});
}
function _n(t = {}, e) {
  return new Proxy(t, { set: function(r, n2, i) {
    return typeof e == "function" && e({ property: n2, previousValue: r[n2], newValue: i }), Reflect.set(...arguments);
  }, deleteProperty: function(r, n2) {
    return e({ property: n2, previousValue: r[n2], newValue: null }), true;
  } });
}
function Hn(t) {
  let e = [];
  return D(t).replace(/^[a-z]|[A-Z]/g, (r) => {
    e.push(r);
  }), e.join("").toUpperCase();
}
function Ln(t) {
  return t || (t = ""), t.replace(/([A-Z])/g, (e, r) => " " + r.toLowerCase()).replace(/[_\- ]+(.)/g, " $1").trim().split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
function In(t = "") {
  let e = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return t.match(e);
}
function zn(t = 5, e) {
  e || (e = Fn);
  let r = [];
  for (; r.length < t; ) {
    let n2 = e.charAt(Math.floor(Math.random() * e.length));
    r.indexOf(n2) == -1 && r.push(n2);
  }
  return r.join("");
}
function at(t) {
  try {
    return !!new new Proxy(t, ot)();
  } catch (e) {
    return false;
  }
}
async function le(t = 1e3) {
  return new Promise((e) => setTimeout(e, t));
}
function Pe(t, e) {
  return oe.size === 0 && (Te = Te.then(Rs)), typeof e == "function" && Ce.push(e), oe.add(t), Te;
}
function Rs() {
  try {
    _s();
  } catch (t) {
    console.error(t);
  } finally {
    for (oe.clear(); Ce.length; )
      Ce.pop()();
  }
}
function Ds(t) {
  let e = t.shadowRoot || t, r = Fr.get(t), n2 = r || new Br(e.nodeName), { constructedSheet: i, styles: o } = t, a = [];
  if (o && (!t.shadowRoot || !i)) {
    let l2 = Ms("style", o);
    a.unshift(l2);
  } else
    t.shadowRoot && i && (t.shadowRoot.adoptedStyleSheets = [i]);
  if (t.template && (typeof t.template == "function" && (a = a.concat(t.template(t))), typeof t.template == "string" && (a = t.template)), !r && e.childNodes?.length) {
    let l2 = e.firstChild;
    for (; l2; ) {
      let v2 = l2.nextSibling;
      e.removeChild(l2), l2 = v2;
    }
  }
  !t.shadowRoot && !r && (t.innerHTML = "");
  let c = new Br(e.nodeName, null, a), u = qs(n2, c);
  $s(e, u), Fr.set(t, c);
}
function _s() {
  for (let t of oe)
    Ds(t);
}
function zr(t, e = String, r, n2 = {}) {
  let i = s(function() {
    let u = this.getAttribute(t);
    if (u === null)
      return this[D(t)] = n2.default, n2.default;
    if (e === Boolean)
      return u != null && u != "false";
    if (u && (e === Array || e === JSON))
      try {
        return JSON.parse(u);
      } catch (l2) {
        console.error(l2);
      }
    return e.prototype ? new e(u).valueOf() : u;
  }, "get"), o = s(function(u) {
    if (u == null)
      return this.removeAttribute(t);
    if (e === Array || e === JSON)
      return this.setAttribute(t, JSON.stringify(u));
    if (!e.prototype)
      return this.setAttribute(t, e(u));
    this.setAttribute(t, u);
  }, "set"), a = r.prototype.createdCallback;
  r.prototype.createdCallback = function() {
    return Object.defineProperty(this, D(t), { get: i, set: o }), a ? a.apply(this, arguments) : void 0;
  };
}
function Hs(t, e, r = {}) {
  return s(function(i) {
    return i.attributes || (i.attributes = {}), i.attributes[t] = e, zr(t, e, i, r);
  }, "assign");
}
function $e(t) {
  return s(function(r) {
    r.prototype.template = t;
  }, "assign");
}
function Me(t) {
  return s(function(r) {
    let n2 = [t || window.$facade.componentPrefix || "facade", r.name.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase())].join("");
    return r.attributes || (r.attributes = {}), Object.defineProperty(r, "observedAttributes", { get: function() {
      return Object.keys(this.attributes);
    } }), customElements.get(n2) || customElements.define(n2, r), document.createElement(n2);
  }, "define");
}
function Ls(t, e, r = {}) {
  let n2 = Symbol.for(t);
  return s(function(o) {
    Object.defineProperty(o.prototype, t, { configurable: true, get() {
      let a = this[n2];
      if (typeof a == "undefined" || a === null)
        return r.default || a;
      if (a && typeof a == "string" && (e === Array || e === JSON))
        try {
          return JSON.parse(a);
        } catch (c) {
          return a;
        }
      return a;
    }, set(a) {
      if (this[n2] === a)
        return;
      let c = Object.assign({}, { prev: this[n2], current: a }), u = this[`$${t}Changed`];
      this[n2] = a, this.render(), typeof u == "function" && u.call(this, c);
    } });
  }, "define");
}
function Re(t) {
  return s(function(r) {
    let { css: n2, constructedSheet: i } = Z(t);
    r.prototype.styles = n2, r.prototype.constructedSheet = i;
  }, "assign");
}
function Jr(t, e) {
  for (let r = 0, n2 = t.length; r < n2; ++r)
    e(t[r], r);
}
function Fs(t, e) {
  let r = 0;
  for (let n2 of t)
    Array.isArray(n2) ? e(n2[0], n2[1]) : e(n2, r++);
}
function zs(t, e) {
  let r = Object.keys(t);
  for (let n2 = 0, i = r.length; n2 < i; ++n2)
    e(t[r[n2]], r[n2]);
}
function Gs(t) {
  let e = P.init(this, t), r = P.create("slot");
  return P.attrs(r, { name: "viewport" }), P.child(e, P.element(r)), P.end(e);
}
function Is(t) {
  return function(e) {
    let r = Object.getOwnPropertyDescriptors(e.prototype);
    for (let n2 in r)
      Object.defineProperty(e, n2, r[n2]);
    return e;
  };
}
function Us(t) {
  let e = window.$facade.apiRoot || window.$facade.api || "";
  function r(n2) {
    return `${e}/${t}/${n2}`;
  }
  __name(r, "r");
  return s(r, "getPath"), function(n2) {
    n2.load = async function(i, o = {}) {
      return Gr.get(r(i), o);
    }, n2.post = async function(i, o = {}) {
      return Gr.post(r(i), o);
    }, n2.prototype.load = n2.load, n2.prototype.post = n2.post;
  };
}
function Vs(t, e, r) {
  let n2 = new CustomEvent(e, { detail: r });
  t.dispatchEvent(n2);
}
function Ws(t, e, r) {
  let n2 = this.shadowRoot, i = t;
  typeof t == "string" && (i = n2.querySelector(t)), !!i && i.addEventListener(e, (o) => r(o));
}
async function ha(t) {
  let { routes: e, styles: r } = t;
  Y(r, document), window.$facade = t, Xe(e || []), await Promise.resolve().then(() => (rn(), tn)), window.dispatchEvent(new Event("hashchange"));
}
var nn, R, Fe, sn, on, an, ze, s, j, p, un, cn, Ge, Je, X, vn, f, Un, Vn, Wn, Xs, st, Bn, Fn, ot, Gn, ut, Jn, he, te, _, pe, H, U, C, V, de, ve, W, Ot, Rt, _t, Ht, ye, be, we, Yt, Qt, rr, or, ur, ke, Se, hr, dr, gr, mr, xr, Or, Tr, _r, Lr, Ur, Ee, Wr, Br, qs, $s, Ho, Ms, Ce, oe, Fr, Te, Ae, z, qe, De, Bs, ae, He, Kr, Le, Ie, Ue, Ve, We, Be, P, Zr, Yr, Xr, Nr, Qr, en, tn, L, rn, Ke, Ze, fn, ln, hn, Ye, pn, dn, Xe, Ne, G, Gr, _e;
var init_facade = __esm({
  "../facade-client/dist/facade.js"() {
    nn = Object.create;
    R = Object.defineProperty;
    Fe = Object.getOwnPropertyDescriptor;
    sn = Object.getOwnPropertyNames;
    on = Object.getPrototypeOf;
    an = Object.prototype.hasOwnProperty;
    ze = /* @__PURE__ */ __name((t) => R(t, "__esModule", { value: true }), "ze");
    s = /* @__PURE__ */ __name((t, e) => R(t, "name", { value: e, configurable: true }), "s");
    j = /* @__PURE__ */ __name((t, e) => () => (t && (e = t(t = 0)), e), "j");
    p = /* @__PURE__ */ __name((t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), "p");
    un = /* @__PURE__ */ __name((t, e) => {
      ze(t);
      for (var r in e)
        R(t, r, { get: e[r], enumerable: true });
    }, "un");
    cn = /* @__PURE__ */ __name((t, e, r) => {
      if (e && typeof e == "object" || typeof e == "function")
        for (let n2 of sn(e))
          !an.call(t, n2) && n2 !== "default" && R(t, n2, { get: () => e[n2], enumerable: !(r = Fe(e, n2)) || r.enumerable });
      return t;
    }, "cn");
    Ge = /* @__PURE__ */ __name((t) => cn(ze(R(t != null ? nn(on(t)) : {}, "default", t && t.__esModule && "default" in t ? { get: () => t.default, enumerable: true } : { value: t, enumerable: true })), t), "Ge");
    Je = /* @__PURE__ */ __name((t, e, r, n2) => {
      for (var i = n2 > 1 ? void 0 : n2 ? Fe(e, r) : e, o = t.length - 1, a; o >= 0; o--)
        (a = t[o]) && (i = (n2 ? a(e, r, i) : a(i)) || i);
      return n2 && i && R(e, r, i), i;
    }, "Je");
    __name(Z, "Z");
    __name(Y, "Y");
    X = j(() => {
      s(Z, "constructStyles");
      s(Y, "appendStyles");
    });
    __name(gn, "gn");
    __name(Qe, "Qe");
    __name(yn, "yn");
    __name(mn, "mn");
    __name(bn, "bn");
    __name(wn, "wn");
    __name(xn, "xn");
    __name(kn, "kn");
    __name(jn, "jn");
    __name(ue, "ue");
    __name(N, "N");
    __name(Q, "Q");
    __name(Sn, "Sn");
    __name(On, "On");
    __name(En, "En");
    __name(Cn, "Cn");
    __name(Tn, "Tn");
    __name(Pn, "Pn");
    __name(et, "et");
    __name(An, "An");
    __name(tt, "tt");
    __name(qn, "qn");
    __name($n, "$n");
    __name(ee, "ee");
    __name(D, "D");
    __name(ce, "ce");
    __name(rt, "rt");
    __name(Mn, "Mn");
    __name(fe, "fe");
    __name(Rn, "Rn");
    __name(nt, "nt");
    __name(it, "it");
    __name(Dn, "Dn");
    __name(_n, "_n");
    __name(Hn, "Hn");
    __name(Ln, "Ln");
    __name(In, "In");
    __name(zn, "zn");
    __name(at, "at");
    __name(le, "le");
    he = j(() => {
      vn = Object.defineProperty, f = s((t, e) => vn(t, "name", { value: e, configurable: true }), "n");
      s(gn, "H");
      f(gn, "chunk");
      s(Qe, "C");
      f(Qe, "shuffle");
      s(yn, "I");
      f(yn, "blendHex");
      s(mn, "E");
      f(mn, "gradient");
      s(bn, "_");
      f(bn, "generateHexColor");
      s(wn, "z");
      f(wn, "hexToRGB");
      s(xn, "F");
      f(xn, "jsonToCSS");
      s(kn, "K");
      f(kn, "stringToHexColor");
      s(jn, "L");
      f(jn, "varsToHex");
      s(ue, "h");
      f(ue, "padStart");
      s(N, "f");
      f(N, "datestamp");
      s(Q, "l");
      f(Q, "timestamp");
      s(Sn, "V");
      f(Sn, "datetimestamp");
      s(On, "G");
      f(On, "prettyDate");
      s(En, "W");
      f(En, "prettyTime");
      s(Cn, "N");
      f(Cn, "prettyDateTime");
      s(Tn, "Z");
      f(Tn, "imgFromBlob");
      s(Pn, "J");
      f(Pn, "imgFromBuffer");
      s(et, "S");
      f(et, "resizeWithAspectRatio");
      s(An, "Y");
      f(An, "imgToDataUri");
      s(tt, "M");
      f(tt, "clamp");
      s(qn, "q");
      f(qn, "randomItems");
      s($n, "X");
      f($n, "randomInt");
      s(ee, "d");
      f(ee, "sentenceCase");
      s(D, "g");
      f(D, "camelCase");
      s(ce, "k");
      f(ce, "camelKeys");
      s(rt, "$");
      f(rt, "snakeCase");
      s(Mn, "Q");
      f(Mn, "snakeKeys");
      s(fe, "x");
      f(fe, "kebabCase");
      s(Rn, "ee");
      f(Rn, "kebabKeys");
      s(nt, "v");
      f(nt, "objectToStyle");
      s(it, "U");
      f(it, "objectWithPath");
      s(Dn, "te");
      f(Dn, "mapKeys");
      s(_n, "re");
      f(_n, "changedProxy");
      s(Hn, "oe");
      f(Hn, "abbreviationCase");
      s(Ln, "ne");
      f(Ln, "humanCase");
      s(In, "se");
      f(In, "validURL");
      Un = [...Array(10)].map((t, e) => String.fromCharCode(e + 48)), Vn = [...Array(26)].map((t, e) => String.fromCharCode(e + 97)), Wn = [...Array(26)].map((t, e) => String.fromCharCode(e + 65)), Xs = Un.concat(Vn).concat(Wn), st = [...Array(26)].map((t, e) => String.fromCharCode(e + 65)), Bn = [...Array(10).keys()], Fn = st.join("") + st.join("").toLowerCase() + Bn.join("");
      s(zn, "le");
      f(zn, "randomChars");
      ot = { construct() {
        return ot;
      } };
      s(at, "D");
      f(at, "isConstructor");
      Gn = s(class extends Map {
        constructor(t, e = "CacheMap", r = console) {
          super();
          at(r) ? this.logger = new r(e) : this.logger = r, this.maxSize = t, this.namespace = e;
        }
        set(t, e) {
          return this.size + 1 >= this.maxSize && (this.logger && typeof this.logger == "function" && this.logger([`Unshifting ${this.namespace} due to imminent overflow.`, `Current size: ${this.size}.`].join(" ")), this.delete(Array.from(this.keys())[0])), super.set(t, e);
        }
      }, "y");
      f(Gn, "CacheMap");
      ut = s(class {
        constructor(t) {
          this.methods = ["error", "warn", "debug", "info", "log", "table"];
          for (let e of this.methods)
            this[e] = function() {
              let r = Array.prototype.slice.call(arguments);
              return this.prefix && r.unshift(this.prefix), console[e].apply(console, r);
            };
        }
      }, "j");
      f(ut, "Logger");
      Jn = s(class extends ut {
        constructor(t = "HeapLogger") {
          super();
          this.namespace = t;
        }
        get prefix() {
          return `[${this.namespace}] [${this.heap}]`;
        }
        get relevantHeap() {
          return this.serverHeap || this.clientHeap || 0;
        }
        get heap() {
          let { value: t, unit: e } = this.bytesToUnit(this.relevantHeap);
          return `${t} ${e}`;
        }
        bytesToUnit(t, e = 2) {
          if (!t)
            return 0;
          let r = 1024, n2 = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(t) / Math.log(r));
          return { value: parseFloat((t / Math.pow(r, i)).toFixed(e)), unit: n2[i] };
        }
        get clientHeap() {
          if (typeof window == "object" && window.performance?.memory)
            return window.performance.memory.usedJSHeapSize || 0;
        }
        get serverHeap() {
          if (typeof process == "object" && process.memoryUsage)
            return process.memoryUsage().heapUsed || 0;
        }
      }, "w");
      f(Jn, "HeapLogger");
      s(le, "de");
      f(le, "wait");
    });
    te = p((Qs, ct) => {
      var Kn = Array.isArray, Zn = Object.prototype.toString;
      ct.exports = Kn || Yn;
      function Yn(t) {
        return Zn.call(t) === "[object Array]";
      }
      __name(Yn, "Yn");
      s(Yn, "isArray");
    });
    _ = p((eo, ft) => {
      ft.exports = "2";
    });
    pe = p((to, lt) => {
      var Xn = _();
      x2.NONE = 0;
      x2.VTEXT = 1;
      x2.VNODE = 2;
      x2.WIDGET = 3;
      x2.PROPS = 4;
      x2.ORDER = 5;
      x2.INSERT = 6;
      x2.REMOVE = 7;
      x2.THUNK = 8;
      lt.exports = x2;
      function x2(t, e, r) {
        this.type = Number(t), this.vNode = e, this.patch = r;
      }
      __name(x2, "x");
      s(x2, "VirtualPatch");
      x2.prototype.version = Xn;
      x2.prototype.type = "VirtualPatch";
    });
    H = p((ro, ht) => {
      var Nn = _();
      ht.exports = Qn;
      function Qn(t) {
        return t && t.type === "VirtualNode" && t.version === Nn;
      }
      __name(Qn, "Qn");
      s(Qn, "isVirtualNode");
    });
    U = p((no, pt) => {
      var ei = _();
      pt.exports = ti;
      function ti(t) {
        return t && t.type === "VirtualText" && t.version === ei;
      }
      __name(ti, "ti");
      s(ti, "isVirtualText");
    });
    C = p((io, dt) => {
      dt.exports = ri;
      function ri(t) {
        return t && t.type === "Widget";
      }
      __name(ri, "ri");
      s(ri, "isWidget");
    });
    V = p((so, vt) => {
      vt.exports = ni;
      function ni(t) {
        return t && t.type === "Thunk";
      }
      __name(ni, "ni");
      s(ni, "isThunk");
    });
    de = p((oo, mt) => {
      var ii = H(), si = U(), oi = C(), gt = V();
      mt.exports = ai;
      function ai(t, e) {
        var r = t, n2 = e;
        return gt(e) && (n2 = yt(e, t)), gt(t) && (r = yt(t, null)), { a: r, b: n2 };
      }
      __name(ai, "ai");
      s(ai, "handleThunk");
      function yt(t, e) {
        var r = t.vnode;
        if (r || (r = t.vnode = t.render(e)), !(ii(r) || si(r) || oi(r)))
          throw new Error("thunk did not return a valid node");
        return r;
      }
      __name(yt, "yt");
      s(yt, "renderThunk");
    });
    ve = p((ao, bt) => {
      "use strict";
      bt.exports = s(function(e) {
        return typeof e == "object" && e !== null;
      }, "isObject");
    });
    W = p((uo, wt) => {
      wt.exports = ui;
      function ui(t) {
        return t && (typeof t.hook == "function" && !t.hasOwnProperty("hook") || typeof t.unhook == "function" && !t.hasOwnProperty("unhook"));
      }
      __name(ui, "ui");
      s(ui, "isHook");
    });
    Ot = p((co, St) => {
      var xt = ve(), ci = W();
      St.exports = kt;
      function kt(t, e) {
        var r;
        for (var n2 in t) {
          n2 in e || (r = r || {}, r[n2] = void 0);
          var i = t[n2], o = e[n2];
          if (i !== o)
            if (xt(i) && xt(o))
              if (jt(o) !== jt(i))
                r = r || {}, r[n2] = o;
              else if (ci(o))
                r = r || {}, r[n2] = o;
              else {
                var a = kt(i, o);
                a && (r = r || {}, r[n2] = a);
              }
            else
              r = r || {}, r[n2] = o;
        }
        for (var c in e)
          c in t || (r = r || {}, r[c] = e[c]);
        return r;
      }
      __name(kt, "kt");
      s(kt, "diffProps");
      function jt(t) {
        if (Object.getPrototypeOf)
          return Object.getPrototypeOf(t);
        if (t.__proto__)
          return t.__proto__;
        if (t.constructor)
          return t.constructor.prototype;
      }
      __name(jt, "jt");
      s(jt, "getPrototype");
    });
    Rt = p((fo, Mt) => {
      var fi = te(), g2 = pe(), A2 = H(), Et = U(), re2 = C(), ne2 = V(), li = de(), hi = Ot();
      Mt.exports = Ct;
      function Ct(t, e) {
        var r = { a: t };
        return Tt(t, e, r, 0), r;
      }
      __name(Ct, "Ct");
      s(Ct, "diff");
      function Tt(t, e, r, n2) {
        if (t !== e) {
          var i = r[n2], o = false;
          if (ne2(t) || ne2(e))
            ge(t, e, r, n2);
          else if (e == null)
            re2(t) || (Pt(t, r, n2), i = r[n2]), i = S2(i, new g2(g2.REMOVE, t, e));
          else if (A2(e))
            if (A2(t))
              if (t.tagName === e.tagName && t.namespace === e.namespace && t.key === e.key) {
                var a = hi(t.properties, e.properties);
                a && (i = S2(i, new g2(g2.PROPS, t, a))), i = pi(t, e, r, i, n2);
              } else
                i = S2(i, new g2(g2.VNODE, t, e)), o = true;
            else
              i = S2(i, new g2(g2.VNODE, t, e)), o = true;
          else
            Et(e) ? Et(t) ? t.text !== e.text && (i = S2(i, new g2(g2.VTEXT, t, e))) : (i = S2(i, new g2(g2.VTEXT, t, e)), o = true) : re2(e) && (re2(t) || (o = true), i = S2(i, new g2(g2.WIDGET, t, e)));
          i && (r[n2] = i), o && Pt(t, r, n2);
        }
      }
      __name(Tt, "Tt");
      s(Tt, "walk");
      function pi(t, e, r, n2, i) {
        for (var o = t.children, a = gi(o, e.children), c = a.children, u = o.length, l2 = c.length, v2 = u > l2 ? u : l2, y2 = 0; y2 < v2; y2++) {
          var d2 = o[y2], b = c[y2];
          i += 1, d2 ? Tt(d2, b, r, i) : b && (n2 = S2(n2, new g2(g2.INSERT, null, b))), A2(d2) && d2.count && (i += d2.count);
        }
        return a.moves && (n2 = S2(n2, new g2(g2.ORDER, t, a.moves))), n2;
      }
      __name(pi, "pi");
      s(pi, "diffChildren");
      function Pt(t, e, r) {
        qt(t, e, r), At(t, e, r);
      }
      __name(Pt, "Pt");
      s(Pt, "clearState");
      function At(t, e, r) {
        if (re2(t))
          typeof t.destroy == "function" && (e[r] = S2(e[r], new g2(g2.REMOVE, t, null)));
        else if (A2(t) && (t.hasWidgets || t.hasThunks))
          for (var n2 = t.children, i = n2.length, o = 0; o < i; o++) {
            var a = n2[o];
            r += 1, At(a, e, r), A2(a) && a.count && (r += a.count);
          }
        else
          ne2(t) && ge(t, null, e, r);
      }
      __name(At, "At");
      s(At, "destroyWidgets");
      function ge(t, e, r, n2) {
        var i = li(t, e), o = Ct(i.a, i.b);
        di(o) && (r[n2] = new g2(g2.THUNK, null, o));
      }
      __name(ge, "ge");
      s(ge, "thunks");
      function di(t) {
        for (var e in t)
          if (e !== "a")
            return true;
        return false;
      }
      __name(di, "di");
      s(di, "hasPatches");
      function qt(t, e, r) {
        if (A2(t)) {
          if (t.hooks && (e[r] = S2(e[r], new g2(g2.PROPS, t, vi(t.hooks)))), t.descendantHooks || t.hasThunks)
            for (var n2 = t.children, i = n2.length, o = 0; o < i; o++) {
              var a = n2[o];
              r += 1, qt(a, e, r), A2(a) && a.count && (r += a.count);
            }
        } else
          ne2(t) && ge(t, null, e, r);
      }
      __name(qt, "qt");
      s(qt, "unhook");
      function vi(t) {
        var e = {};
        for (var r in t)
          e[r] = void 0;
        return e;
      }
      __name(vi, "vi");
      s(vi, "undefinedKeys");
      function gi(t, e) {
        var r = $t(e), n2 = r.keys, i = r.free;
        if (i.length === e.length)
          return { children: e, moves: null };
        var o = $t(t), a = o.keys, c = o.free;
        if (c.length === t.length)
          return { children: e, moves: null };
        for (var u = [], l2 = 0, v2 = i.length, y2 = 0, d2 = 0; d2 < t.length; d2++) {
          var b = t[d2], m;
          b.key ? n2.hasOwnProperty(b.key) ? (m = n2[b.key], u.push(e[m])) : (m = d2 - y2++, u.push(null)) : l2 < v2 ? (m = i[l2++], u.push(e[m])) : (m = d2 - y2++, u.push(null));
        }
        for (var q2 = l2 >= i.length ? e.length : i[l2], J2 = 0; J2 < e.length; J2++) {
          var K2 = e[J2];
          K2.key ? a.hasOwnProperty(K2.key) || u.push(K2) : J2 >= q2 && u.push(K2);
        }
        for (var O = u.slice(), k2 = 0, $2 = [], I2 = [], w2, E2 = 0; E2 < e.length; ) {
          var M2 = e[E2];
          for (w2 = O[k2]; w2 === null && O.length; )
            $2.push(ie2(O, k2, null)), w2 = O[k2];
          !w2 || w2.key !== M2.key ? M2.key ? (w2 && w2.key ? n2[w2.key] !== E2 + 1 ? ($2.push(ie2(O, k2, w2.key)), w2 = O[k2], !w2 || w2.key !== M2.key ? I2.push({ key: M2.key, to: E2 }) : k2++) : I2.push({ key: M2.key, to: E2 }) : I2.push({ key: M2.key, to: E2 }), E2++) : w2 && w2.key && $2.push(ie2(O, k2, w2.key)) : (k2++, E2++);
        }
        for (; k2 < O.length; )
          w2 = O[k2], $2.push(ie2(O, k2, w2 && w2.key));
        return $2.length === y2 && !I2.length ? { children: u, moves: null } : { children: u, moves: { removes: $2, inserts: I2 } };
      }
      __name(gi, "gi");
      s(gi, "reorder");
      function ie2(t, e, r) {
        return t.splice(e, 1), { from: e, key: r };
      }
      __name(ie2, "ie");
      s(ie2, "remove");
      function $t(t) {
        for (var e = {}, r = [], n2 = t.length, i = 0; i < n2; i++) {
          var o = t[i];
          o.key ? e[o.key] = i : r.push(i);
        }
        return { keys: e, free: r };
      }
      __name($t, "$t");
      s($t, "keyIndex");
      function S2(t, e) {
        return t ? (fi(t) ? t.push(e) : t = [t, e], t) : e;
      }
      __name(S2, "S");
      s(S2, "appendPatch");
    });
    _t = p((lo, Dt) => {
      var yi = Rt();
      Dt.exports = yi;
    });
    Ht = p(() => {
    });
    ye = p((vo, It) => {
      var Lt = typeof window != "undefined" || typeof window != "undefined" ? window : {}, mi = Ht(), B2;
      typeof document != "undefined" ? B2 = document : (B2 = Lt["__GLOBAL_DOCUMENT_CACHE@4"], B2 || (B2 = Lt["__GLOBAL_DOCUMENT_CACHE@4"] = mi));
      It.exports = B2;
    });
    be = p((go, Bt) => {
      var me = ve(), Ut = W();
      Bt.exports = bi;
      function bi(t, e, r) {
        for (var n2 in e) {
          var i = e[n2];
          i === void 0 ? Vt(t, n2, i, r) : Ut(i) ? (Vt(t, n2, i, r), i.hook && i.hook(t, n2, r ? r[n2] : void 0)) : me(i) ? wi(t, e, r, n2, i) : t[n2] = i;
        }
      }
      __name(bi, "bi");
      s(bi, "applyProperties");
      function Vt(t, e, r, n2) {
        if (n2) {
          var i = n2[e];
          if (Ut(i))
            i.unhook && i.unhook(t, e, r);
          else if (e === "attributes")
            for (var o in i)
              t.removeAttribute(o);
          else if (e === "style")
            for (var a in i)
              t.style[a] = "";
          else
            typeof i == "string" ? t[e] = "" : t[e] = null;
        }
      }
      __name(Vt, "Vt");
      s(Vt, "removeProperty");
      function wi(t, e, r, n2, i) {
        var o = r ? r[n2] : void 0;
        if (n2 === "attributes") {
          for (var a in i) {
            var c = i[a];
            c === void 0 ? t.removeAttribute(a) : t.setAttribute(a, c);
          }
          return;
        }
        if (o && me(o) && Wt(o) !== Wt(i)) {
          t[n2] = i;
          return;
        }
        me(t[n2]) || (t[n2] = {});
        var u = n2 === "style" ? "" : void 0;
        for (var l2 in i) {
          var v2 = i[l2];
          t[n2][l2] = v2 === void 0 ? u : v2;
        }
      }
      __name(wi, "wi");
      s(wi, "patchObject");
      function Wt(t) {
        if (Object.getPrototypeOf)
          return Object.getPrototypeOf(t);
        if (t.__proto__)
          return t.__proto__;
        if (t.constructor)
          return t.constructor.prototype;
      }
      __name(Wt, "Wt");
      s(Wt, "getPrototype");
    });
    we = p((yo, Gt) => {
      var Ft = ye(), xi = be(), ki = H(), ji = U(), Si = C(), Oi = de();
      Gt.exports = zt;
      function zt(t, e) {
        var r = e && e.document || Ft, n2 = e ? e.warn : null;
        if (t = Oi(t).a, Si(t))
          return t.init();
        if (ji(t))
          return r.createTextNode(t.text);
        if (!ki(t))
          return n2 && n2("Item is not a valid virtual dom node", t), null;
        var i = t.namespace === null ? r.createElement(t.tagName) : r.createElementNS(t.namespace, t.tagName), o = t.properties;
        xi(i, o);
        for (var a = t.children, c = 0; c < a.length; c++) {
          var u = zt(a[c], e);
          u && i.appendChild(u);
        }
        return i;
      }
      __name(zt, "zt");
      s(zt, "createElement");
    });
    Yt = p((mo, Zt) => {
      var Ei = {};
      Zt.exports = Ci;
      function Ci(t, e, r, n2) {
        return !r || r.length === 0 ? {} : (r.sort(Ti), Jt(t, e, r, n2, 0));
      }
      __name(Ci, "Ci");
      s(Ci, "domIndex");
      function Jt(t, e, r, n2, i) {
        if (n2 = n2 || {}, t) {
          Kt(r, i, i) && (n2[i] = t);
          var o = e.children;
          if (o)
            for (var a = t.childNodes, c = 0; c < e.children.length; c++) {
              i += 1;
              var u = o[c] || Ei, l2 = i + (u.count || 0);
              Kt(r, i, l2) && Jt(a[c], u, r, n2, i), i = l2;
            }
        }
        return n2;
      }
      __name(Jt, "Jt");
      s(Jt, "recurse");
      function Kt(t, e, r) {
        if (t.length === 0)
          return false;
        for (var n2 = 0, i = t.length - 1, o, a; n2 <= i; ) {
          if (o = (i + n2) / 2 >> 0, a = t[o], n2 === i)
            return a >= e && a <= r;
          if (a < e)
            n2 = o + 1;
          else if (a > r)
            i = o - 1;
          else
            return true;
        }
        return false;
      }
      __name(Kt, "Kt");
      s(Kt, "indexInRange");
      function Ti(t, e) {
        return t > e ? 1 : -1;
      }
      __name(Ti, "Ti");
      s(Ti, "ascending");
    });
    Qt = p((bo, Nt) => {
      var Xt = C();
      Nt.exports = Pi;
      function Pi(t, e) {
        return Xt(t) && Xt(e) ? "name" in t && "name" in e ? t.id === e.id : t.init === e.init : false;
      }
      __name(Pi, "Pi");
      s(Pi, "updateWidget");
    });
    rr = p((wo, tr) => {
      var Ai = be(), qi = C(), T = pe(), $i = Qt();
      tr.exports = Mi;
      function Mi(t, e, r) {
        var n2 = t.type, i = t.vNode, o = t.patch;
        switch (n2) {
          case T.REMOVE:
            return Ri(e, i);
          case T.INSERT:
            return Di(e, o, r);
          case T.VTEXT:
            return _i(e, i, o, r);
          case T.WIDGET:
            return Hi(e, i, o, r);
          case T.VNODE:
            return Li(e, i, o, r);
          case T.ORDER:
            return Ii(e, o), e;
          case T.PROPS:
            return Ai(e, o, i.properties), e;
          case T.THUNK:
            return Ui(e, r.patch(e, o, r));
          default:
            return e;
        }
      }
      __name(Mi, "Mi");
      s(Mi, "applyPatch");
      function Ri(t, e) {
        var r = t.parentNode;
        return r && r.removeChild(t), er(t, e), null;
      }
      __name(Ri, "Ri");
      s(Ri, "removeNode");
      function Di(t, e, r) {
        var n2 = r.render(e, r);
        return t && t.appendChild(n2), t;
      }
      __name(Di, "Di");
      s(Di, "insertNode");
      function _i(t, e, r, n2) {
        var i;
        if (t.nodeType === 3)
          t.replaceData(0, t.length, r.text), i = t;
        else {
          var o = t.parentNode;
          i = n2.render(r, n2), o && i !== t && o.replaceChild(i, t);
        }
        return i;
      }
      __name(_i, "_i");
      s(_i, "stringPatch");
      function Hi(t, e, r, n2) {
        var i = $i(e, r), o;
        i ? o = r.update(e, t) || t : o = n2.render(r, n2);
        var a = t.parentNode;
        return a && o !== t && a.replaceChild(o, t), i || er(t, e), o;
      }
      __name(Hi, "Hi");
      s(Hi, "widgetPatch");
      function Li(t, e, r, n2) {
        var i = t.parentNode, o = n2.render(r, n2);
        return i && o !== t && i.replaceChild(o, t), o;
      }
      __name(Li, "Li");
      s(Li, "vNodePatch");
      function er(t, e) {
        typeof e.destroy == "function" && qi(e) && e.destroy(t);
      }
      __name(er, "er");
      s(er, "destroyWidget");
      function Ii(t, e) {
        for (var r = t.childNodes, n2 = {}, i, o, a, c = 0; c < e.removes.length; c++)
          o = e.removes[c], i = r[o.from], o.key && (n2[o.key] = i), t.removeChild(i);
        for (var u = r.length, l2 = 0; l2 < e.inserts.length; l2++)
          a = e.inserts[l2], i = n2[a.key], t.insertBefore(i, a.to >= u++ ? null : r[a.to]);
      }
      __name(Ii, "Ii");
      s(Ii, "reorderChildren");
      function Ui(t, e) {
        return t && e && t !== e && t.parentNode && t.parentNode.replaceChild(e, t), e;
      }
      __name(Ui, "Ui");
      s(Ui, "replaceRoot");
    });
    or = p((xo, sr) => {
      var Vi = ye(), Wi = te(), Bi = we(), Fi = Yt(), nr = rr();
      sr.exports = ir;
      function ir(t, e, r) {
        return r = r || {}, r.patch = r.patch && r.patch !== ir ? r.patch : zi, r.render = r.render || Bi, r.patch(t, e, r);
      }
      __name(ir, "ir");
      s(ir, "patch");
      function zi(t, e, r) {
        var n2 = Ji(e);
        if (n2.length === 0)
          return t;
        var i = Fi(t, e.a, n2), o = t.ownerDocument;
        !r.document && o !== Vi && (r.document = o);
        for (var a = 0; a < n2.length; a++) {
          var c = n2[a];
          t = Gi(t, i[c], e[c], r);
        }
        return t;
      }
      __name(zi, "zi");
      s(zi, "patchRecursive");
      function Gi(t, e, r, n2) {
        if (!e)
          return t;
        var i;
        if (Wi(r))
          for (var o = 0; o < r.length; o++)
            i = nr(r[o], e, n2), e === t && (t = i);
        else
          i = nr(r, e, n2), e === t && (t = i);
        return t;
      }
      __name(Gi, "Gi");
      s(Gi, "applyPatch");
      function Ji(t) {
        var e = [];
        for (var r in t)
          r !== "a" && e.push(Number(r));
        return e;
      }
      __name(Ji, "Ji");
      s(Ji, "patchIndices");
    });
    ur = p((ko, ar) => {
      var Ki = or();
      ar.exports = Ki;
    });
    ke = p((jo, cr) => {
      var Zi = _(), Yi = H(), Xi = C(), Ni = V(), Qi = W();
      cr.exports = xe;
      var es = {}, ts = [];
      function xe(t, e, r, n2, i) {
        this.tagName = t, this.properties = e || es, this.children = r || ts, this.key = n2 != null ? String(n2) : void 0, this.namespace = typeof i == "string" ? i : null;
        var o = r && r.length || 0, a = 0, c = false, u = false, l2 = false, v2;
        for (var y2 in e)
          if (e.hasOwnProperty(y2)) {
            var d2 = e[y2];
            Qi(d2) && d2.unhook && (v2 || (v2 = {}), v2[y2] = d2);
          }
        for (var b = 0; b < o; b++) {
          var m = r[b];
          Yi(m) ? (a += m.count || 0, !c && m.hasWidgets && (c = true), !u && m.hasThunks && (u = true), !l2 && (m.hooks || m.descendantHooks) && (l2 = true)) : !c && Xi(m) ? typeof m.destroy == "function" && (c = true) : !u && Ni(m) && (u = true);
        }
        this.count = o + a, this.hasWidgets = c, this.hasThunks = u, this.hooks = v2, this.descendantHooks = l2;
      }
      __name(xe, "xe");
      s(xe, "VirtualNode");
      xe.prototype.version = Zi;
      xe.prototype.type = "VirtualNode";
    });
    Se = p((So, fr) => {
      var rs = _();
      fr.exports = je;
      function je(t) {
        this.text = String(t);
      }
      __name(je, "je");
      s(je, "VirtualText");
      je.prototype.version = rs;
      je.prototype.type = "VirtualText";
    });
    hr = p((Oo, lr) => {
      lr.exports = s(function(e) {
        var r = String.prototype.split, n2 = /()??/.exec("")[1] === e, i;
        return i = s(function(o, a, c) {
          if (Object.prototype.toString.call(a) !== "[object RegExp]")
            return r.call(o, a, c);
          var u = [], l2 = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.extended ? "x" : "") + (a.sticky ? "y" : ""), v2 = 0, a = new RegExp(a.source, l2 + "g"), y2, d2, b, m;
          for (o += "", n2 || (y2 = new RegExp("^" + a.source + "$(?!\\s)", l2)), c = c === e ? -1 >>> 0 : c >>> 0; (d2 = a.exec(o)) && (b = d2.index + d2[0].length, !(b > v2 && (u.push(o.slice(v2, d2.index)), !n2 && d2.length > 1 && d2[0].replace(y2, function() {
            for (var q2 = 1; q2 < arguments.length - 2; q2++)
              arguments[q2] === e && (d2[q2] = e);
          }), d2.length > 1 && d2.index < o.length && Array.prototype.push.apply(u, d2.slice(1)), m = d2[0].length, v2 = b, u.length >= c))); )
            a.lastIndex === d2.index && a.lastIndex++;
          return v2 === o.length ? (m || !a.test("")) && u.push("") : u.push(o.slice(v2)), u.length > c ? u.slice(0, c) : u;
        }, "self"), i;
      }, "split")();
    });
    dr = p((Eo, pr) => {
      "use strict";
      var ns = hr(), is = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/, ss = /^\.|#/;
      pr.exports = os;
      function os(t, e) {
        if (!t)
          return "DIV";
        var r = !e.hasOwnProperty("id"), n2 = ns(t, is), i = null;
        ss.test(n2[1]) && (i = "DIV");
        var o, a, c, u;
        for (u = 0; u < n2.length; u++)
          a = n2[u], !!a && (c = a.charAt(0), i ? c === "." ? (o = o || [], o.push(a.substring(1, a.length))) : c === "#" && r && (e.id = a.substring(1, a.length)) : i = a);
        return o && (e.className && o.push(e.className), e.className = o.join(" ")), e.namespace ? i : i.toUpperCase();
      }
      __name(os, "os");
      s(os, "parseTag");
    });
    gr = p((Co, vr) => {
      "use strict";
      vr.exports = se2;
      function se2(t) {
        if (!(this instanceof se2))
          return new se2(t);
        this.value = t;
      }
      __name(se2, "se");
      s(se2, "SoftSetHook");
      se2.prototype.hook = function(t, e) {
        t[e] !== this.value && (t[e] = this.value);
      };
    });
    mr = p((To, yr) => {
      "use strict";
      var Oe = typeof window != "undefined" || typeof window != "undefined" ? window : {};
      yr.exports = as;
      function as(t, e) {
        return t in Oe ? Oe[t] : (Oe[t] = e, e);
      }
      __name(as, "as");
      s(as, "Individual");
    });
    xr = p((Po, wr) => {
      "use strict";
      var br = mr();
      wr.exports = us;
      function us(t, e, r) {
        var n2 = "__INDIVIDUAL_ONE_VERSION_" + t, i = n2 + "_ENFORCE_SINGLETON", o = br(i, e);
        if (o !== e)
          throw new Error("Can only have one copy of " + t + `.
You already have version ` + o + ` installed.
This means you cannot install version ` + e);
        return br(n2, r);
      }
      __name(us, "us");
      s(us, "OneVersion");
    });
    Or = p((Ao, Sr) => {
      "use strict";
      var cs = xr(), kr = "7";
      cs("ev-store", kr);
      var jr = "__EV_STORE_KEY@" + kr;
      Sr.exports = fs;
      function fs(t) {
        var e = t[jr];
        return e || (e = t[jr] = {}), e;
      }
      __name(fs, "fs");
      s(fs, "EvStore");
    });
    Tr = p((qo, Cr) => {
      "use strict";
      var Er = Or();
      Cr.exports = F2;
      function F2(t) {
        if (!(this instanceof F2))
          return new F2(t);
        this.value = t;
      }
      __name(F2, "F");
      s(F2, "EvHook");
      F2.prototype.hook = function(t, e) {
        var r = Er(t), n2 = e.substr(3);
        r[n2] = this.value;
      };
      F2.prototype.unhook = function(t, e) {
        var r = Er(t), n2 = e.substr(3);
        r[n2] = void 0;
      };
    });
    _r = p(($o, Dr) => {
      "use strict";
      var Pr = te(), ls = ke(), Ar = Se(), hs = H(), ps = U(), ds = C(), qr = W(), vs = V(), gs = dr(), ys = gr(), ms = Tr();
      Dr.exports = bs;
      function bs(t, e, r) {
        var n2 = [], i, o, a, c;
        return !r && xs(e) && (r = e, o = {}), o = o || e || {}, i = gs(t, o), o.hasOwnProperty("key") && (a = o.key, o.key = void 0), o.hasOwnProperty("namespace") && (c = o.namespace, o.namespace = void 0), i === "INPUT" && !c && o.hasOwnProperty("value") && o.value !== void 0 && !qr(o.value) && (o.value = ys(o.value)), ws(o), r != null && $r(r, n2, i, o), new ls(i, o, n2, a, c);
      }
      __name(bs, "bs");
      s(bs, "h");
      function $r(t, e, r, n2) {
        if (typeof t == "string")
          e.push(new Ar(t));
        else if (typeof t == "number")
          e.push(new Ar(String(t)));
        else if (Mr(t))
          e.push(t);
        else if (Pr(t))
          for (var i = 0; i < t.length; i++)
            $r(t[i], e, r, n2);
        else {
          if (t == null)
            return;
          throw ks({ foreignObject: t, parentVnode: { tagName: r, properties: n2 } });
        }
      }
      __name($r, "$r");
      s($r, "addChild");
      function ws(t) {
        for (var e in t)
          if (t.hasOwnProperty(e)) {
            var r = t[e];
            if (qr(r))
              continue;
            e.substr(0, 3) === "ev-" && (t[e] = ms(r));
          }
      }
      __name(ws, "ws");
      s(ws, "transformProperties");
      function Mr(t) {
        return hs(t) || ps(t) || ds(t) || vs(t);
      }
      __name(Mr, "Mr");
      s(Mr, "isChild");
      function xs(t) {
        return typeof t == "string" || Pr(t) || Mr(t);
      }
      __name(xs, "xs");
      s(xs, "isChildren");
      function ks(t) {
        var e = new Error();
        return e.type = "virtual-hyperscript.unexpected.virtual-element", e.message = `Unexpected virtual child passed to h().
Expected a VNode / Vthunk / VWidget / string but:
got:
` + Rr(t.foreignObject) + `.
The parent vnode is:
` + Rr(t.parentVnode), e.foreignObject = t.foreignObject, e.parentVnode = t.parentVnode, e;
      }
      __name(ks, "ks");
      s(ks, "UnexpectedVirtualElement");
      function Rr(t) {
        try {
          return JSON.stringify(t, null, "    ");
        } catch (e) {
          return String(t);
        }
      }
      __name(Rr, "Rr");
      s(Rr, "errorString");
    });
    Lr = p((Mo, Hr) => {
      var js = _r();
      Hr.exports = js;
    });
    Ur = p((Ro, Ir) => {
      var Ss = we();
      Ir.exports = Ss;
    });
    Ee = p((Do, Vr) => {
      var Os = _t(), Es = ur(), Cs = Lr(), Ts = Ur(), Ps = ke(), As = Se();
      Vr.exports = { diff: Os, patch: Es, h: Cs, create: Ts, VNode: Ps, VText: As };
    });
    __name(Pe, "Pe");
    __name(Rs, "Rs");
    __name(Ds, "Ds");
    __name(_s, "_s");
    __name(zr, "zr");
    Ae = j(() => {
      Wr = Ge(Ee());
      he();
      ({ VNode: Br, diff: qs, patch: $s, create: Ho, h: Ms } = Wr.default), Ce = [], oe = new Set(), Fr = new WeakMap(), Te = Promise.resolve();
      s(Pe, "render");
      s(Rs, "attempt");
      s(Ds, "renderElement");
      s(_s, "apply");
      s(zr, "assignAttribute");
    });
    qe = j(() => {
      he();
      Ae();
      z = /* @__PURE__ */ __name(class extends HTMLElement {
        constructor() {
          super();
          this.createdCallback();
        }
        createdCallback() {
          this.$$created || (this.$$created = true, this.attachShadow({ mode: "open" }), this.created && this.created());
        }
        attributeChangedCallback(e, r, n2) {
          r !== n2 && this.render(), this.attributeChanged && this.attributeChanged(e, r, n2);
        }
        connectedCallback() {
          this.$$connected || (this.$$connected = true, this.render(() => {
            this.connected && this.connected();
          }));
        }
        disconnectedCallback() {
          this.disconnected && this.disconnected();
        }
        adoptedCallback() {
          this.adopted && this.adopted();
        }
        render(e) {
          return Pe(this, e);
        }
        emit(e, r = {}, n2 = { bubbles: true, composed: true }) {
          return r.detail && (n2.detail = r.detail, delete r.detail), this.dispatchEvent(Object.assign(new CustomEvent(e, n2), r)), this;
        }
        on(e, r) {
          this.addEventListener(e, (n2) => r(n2));
        }
        setState(...e) {
          return Object.assign(this, ...e), Pe(this);
        }
        async wait(e = 1e3) {
          return le(e);
        }
      }, "z");
      s(z, "FacadeComponent");
    });
    __name(Hs, "Hs");
    __name($e, "$e");
    __name(Me, "Me");
    __name(Ls, "Ls");
    __name(Re, "Re");
    De = j(() => {
      X();
      Ae();
      s(Hs, "Attribute");
      s($e, "Template");
      s(Me, "Define");
      s(Ls, "Input");
      s(Re, "Styles");
    });
    __name(Jr, "Jr");
    __name(Fs, "Fs");
    __name(zs, "zs");
    He = j(() => {
      Bs = Array.call.bind(Array.prototype.slice);
      s(Jr, "arrayIterator");
      s(Fs, "IterableIterator");
      s(zs, "objectIterator");
      ae = /* @__PURE__ */ __name(class {
        init() {
          return this.create();
        }
        create(e) {
          return { tagName: e, children: [] };
        }
        child(e, r) {
          if (!e.children)
            debugger;
          e.children.push(r);
        }
        events(e, r) {
          return r;
        }
        element(e) {
          return e;
        }
        hooks(e, r) {
          return Object.assign(e, r);
        }
        handles(e, r, n2) {
          e.handle = [r, n2];
        }
        props(e, r) {
          return Object.assign(e, r);
        }
        text(e) {
          return e != null ? e + "" : "";
        }
        attrs(e, r) {
          e.attributes || (e.attributes = {}), r.class && (r.class = this.attr(r.class));
          for (let n2 in r)
            r[n2] === false || r[n2] == null || (e.attributes[n2] = r[n2] + "");
        }
        attr(e) {
          if (!e)
            return "";
          if (Array.isArray(e))
            return e.map(this.attr, this).join(" ");
          if (typeof e == "object") {
            let r = [];
            for (let n2 in e)
              e[n2] && r.push(n2);
            return r.join(" ");
          }
          return e + "";
        }
        mixin(e, r, ...n2) {
          r.properties = Object.assign({}, r.properties, ...n2);
          let i = r.tagName.apply(r);
          for (let o of i)
            this.child(e, o);
        }
        each(e, r) {
          if (!!e)
            return Array.isArray(e) ? Jr(e, r) : Symbol.iterable in e ? Fs(e, r) : "length" in e ? Jr(Bs(e), r) : zs(e, r);
        }
        end(e) {
          return e.children;
        }
      }, "ae");
      s(ae, "PugRuntime");
    });
    Zr = j(() => {
      Kr = Ge(Ee());
      He();
      Le = /* @__PURE__ */ __name(class {
        constructor(e) {
          this.events = e;
        }
        hook(e, r, n2) {
          let i = n2 ? n2.events : [];
          for (var [o, a] of i)
            e.removeEventListener(o, a);
          for (var [o, a] of this.events)
            e.addEventListener(o, a);
        }
        unhook(e) {
          for (let [r, n2] of this.events)
            e.removeEventListener(r, n2);
        }
      }, "Le");
      s(Le, "EventHook");
      Ie = /* @__PURE__ */ __name(class {
        constructor(e) {
          this.subscribe = e;
        }
        hook(e, r, n2) {
          this.subscribe && (this.unsubscribe = this.subscribe(e, r, n2));
        }
        unhook() {
          typeof this.unsubscribe == "function" && (this.unsubscribe(), delete this.unsubscribe);
        }
      }, "Ie");
      s(Ie, "FunctionHook");
      Ue = /* @__PURE__ */ __name(class {
        constructor(e) {
          this.value = e;
        }
        hook(e, r, n2) {
          (!(n2 && n2.value) && this.value !== void 0 || e[r] !== this.value) && (e[r] = this.value);
        }
      }, "Ue");
      s(Ue, "PropertyHook");
      Ve = /* @__PURE__ */ __name(class {
        constructor(e, r) {
          this.context = e, this.names = r;
        }
        hook(e, r, n2) {
          for (let i of this.names)
            this.context[i] = e;
        }
        unhook() {
          for (let e of this.names)
            this.context[e] = null;
        }
      }, "Ve");
      s(Ve, "HandleHook");
      We = /* @__PURE__ */ __name(class {
        constructor(e) {
          this.value = e;
        }
        update(e) {
          if (!e || e.value === this.value)
            return;
          let r = this.init(e);
          return e.nodes && (e.nodes[0].replaceWith(r), this.removeNodes(e.nodes)), r;
        }
        destroy() {
          this.removeNodes(this.nodes);
        }
        removeNodes(e) {
          if (!e)
            return;
          let r = this.value && this.value.unhook;
          for (let n2 of e)
            r && this.value.unhook(n2), n2.remove();
        }
        init(e) {
          let r = document.createElement("template");
          if (r.innerHTML = this.value + "", this.nodes = Array.from(r.content.childNodes), this.value && this.value.hook)
            for (let n2 of this.nodes)
              this.value.hook(n2, "innerHTML", e && e.value);
          return r.content;
        }
        get type() {
          return "Widget";
        }
      }, "We");
      s(We, "HTMLWidget");
      Be = /* @__PURE__ */ __name(class extends ae {
        constructor(e) {
          super();
          this.h = e;
        }
        element(e) {
          let r = e.tagName, n2 = e.children;
          return delete e.tagName, delete e.children, this.h(r, e, n2);
        }
        hooks(e, r) {
          for (var [n2, r] of Object.entries(r))
            typeof r == "function" ? e[n2] = new Ie(r) : e[n2] = r;
        }
        events(e, r, n2) {
          return e.events = new Le(n2, r);
        }
        handles(e, r, n2) {
          e.handle = new Ve(r, n2);
        }
        text(e, r) {
          return e && r ? new We(e) : e && e.type === "VirtualNode" ? e : super.text(e);
        }
        attrs(e, r) {
          typeof r.style == "object" && (e.style = r.style, delete r.style), e.attributes || (e.attributes = {}), r.class && (r.class = this.attr(r.class));
          for (let n2 in r)
            r[n2] === false || r[n2] == null || (r[n2].hook && (e[n2] = r[n2]), e.attributes[n2] = r[n2] + "");
        }
        props(e, r) {
          for (let i of Object.keys(r))
            switch (i) {
              case "class":
                var n2 = this.attr(r[i]);
                if (!n2)
                  continue;
                e.attributes && e.attributes.class && (n2 = e.attributes.class + " " + n2, delete e.attributes.class), e.className && (n2 += " " + e.className), e.className = n2;
                break;
              case "style":
                e[i] = r[i];
                break;
              default:
                e[i] = new Ue(r[i]);
            }
        }
      }, "Be");
      s(Be, "VDomRuntime");
      P = new Be(Kr.h);
    });
    Yr = j(() => {
      He();
      Zr();
    });
    __name(Gs, "Gs");
    Nr = j(() => {
      Yr();
      s(Gs, "template");
      Xr = Gs;
    });
    en = j(() => {
      Qr = `:host {
  display: flex;
  box-sizing: border-box;
  width: 100%;
}
::slotted(*) {
  box-sizing: border-box;
}
`;
    });
    tn = {};
    un(tn, { default: () => L });
    rn = j(() => {
      qe();
      De();
      Nr();
      en();
      L = /* @__PURE__ */ __name(class extends z {
      }, "L");
      s(L, "Viewport"), L = Je([Me("facade"), $e(Xr), Re(Qr)], L);
    });
    Ke = new Set();
    Ze = s((t) => t.split("/").filter((e) => e)[0], "rootPath");
    fn = s(() => {
      let t;
      return location.hash ? t = location.hash.replace("#!", "") : t = location.pathname.slice(1).toLowerCase() || "/", t;
    }, "parseLocation");
    ln = s((t) => Array.from(Ke).find((e) => Ze(e.path) === Ze(t)), "findRouteByPath");
    hn = s((t) => {
      let e = t.path.split("/").slice(2), r = new Map();
      for (let [n2, i] of e.entries())
        i && i.includes(":") && r.set(n2, i.replace(/[:?]/g, ""));
      return { mappedParts: r };
    }, "paramsFor");
    Ye = s(async () => {
      let t = fn(), e = ln(t);
      if (!e)
        return;
      let { default: r } = await e.component() || {};
      if (!r)
        return;
      pn(e, r);
      let n2 = document.body.querySelector(`${window.$facade.componentPrefix}-viewport`) || document.body.querySelector("facade-viewport");
      if (!n2)
        return console.warn("No viewport found!");
      n2.innerHTML = "", r.setAttribute("slot", "viewport"), n2.appendChild(r);
    }, "router");
    pn = s((t, e) => {
      let { keys: r, mappedParts: n2 } = dn(t), i = r.next(), o = location.pathname.split("/").slice(2).filter((a) => a);
      for (; !i.done; ) {
        let a = i.value, c = n2.get(a), u = o[a];
        u && e.setAttribute(c, u), i = r.next();
      }
    }, "assignParams");
    dn = s((t) => {
      let { mappedParts: e } = hn(t);
      return { keys: e.keys(), mappedParts: e };
    }, "mapFor");
    Xe = s((t) => {
      for (let e of t)
        Ke.add(e);
    }, "initRoutes");
    window.addEventListener("hashchange", Ye);
    window.addEventListener("load", Ye);
    X();
    Ne = `:root {
  --fa-padding: 5px;
  --fa-box-shadow: 0px 8px 20px rgba(0,0,0,0.35);
  --fa-box-background: rgba(0,0,0,0.25);
  --fa-box-gap: 10px;
  --fa-box-padding: 10px;
  --fa-accent-color: #0c4753;
  --fa-accent-color-hue: #092b32;
  --fa-accent-text: #fff;
  --fa-accent-text-hue: #829da2;
  --fa-accent-border: 1px solid var(--fa-accent-color-hue);
  --fa-success: #2bd46f;
  --fa-danger: #f00;
  --fa-warning: #ff9c00;
  --fa-warning-hue: #b36e00;
  --fa-primary-text: #fff;
  --fa-primary-color: #121719;
  --fa-primary-color-hue: #283133;
  --fa-secondary-color: #fff;
  --fa-secondary-color-hue: #eee;
  --fa-secondary-text: #000;
  --fa-selected-bg: #367fce;
  --fa-selected-color: #424242;
  --fa-border-color: rgba(255,255,255,0.25);
  --fa-border: 1px solid var(--fa-primary-color-hue);
  --fa-border-radius: 2px;
  --fa-border-radius-soft: 4px;
}
`;
    qe();
    De();
    X();
    G = /* @__PURE__ */ __name(class {
      constructor() {
      }
      async get(e, r) {
        let n2 = await this.url(e, r), i = await fetch(n2), { status: o, headers: a } = i, c = a.get("content-type");
        return i.ok ? c.match(/^image\/\w*$/) ? i.blob() : i.json() : new Error(i.statusText);
      }
      async post(e, r, n2) {
        let i = await this.url(e), o = {};
        return r && Object.assign(o, { method: "POST", body: JSON.stringify(r) }), n2 ? Object.assign(o, { headers: n2 }) : Object.assign(o, { headers: { Accept: "application/json", "Content-Type": "application/json" } }), fetch(i, o).then((a) => a.json());
      }
      async url(e, r) {
        let n2;
        if (r) {
          n2 = new URLSearchParams();
          for (let i in r)
            if (typeof r[i] == "object")
              for (let o of r[i])
                n2.append(`${i}[]`, o);
            else
              n2.append(i, r[i]);
          r = n2.toString();
        }
        return `${e}${n2 ? "?" + n2.toString() : ""}`;
      }
    }, "G");
    s(G, "Api");
    Gr = new G();
    _e = /* @__PURE__ */ __name(class {
    }, "_e");
    s(_e, "Model");
    __name(Is, "Is");
    s(Is, "model");
    __name(Us, "Us");
    s(Us, "Endpoint");
    __name(Vs, "Vs");
    s(Vs, "emit");
    __name(Ws, "Ws");
    s(Ws, "listen");
    Y(Ne, document);
    window.$facade = {};
    __name(ha, "ha");
    s(ha, "bootstrap");
  }
});

// ../facade-toolbox/dist/toolbox.js
function H2(e, t) {
  return Array.from({ length: Math.ceil(e.length / t) }, (r, o) => e.slice(o * t, o * t + t));
}
function C2(e = []) {
  let t = e.length, r;
  for (; t; ) {
    let o = Math.floor(Math.random() * t--), s2 = e[t];
    r = e[t], e[o] = r;
  }
  return e;
}
function I(e, t, r = 0.5) {
  let o, s2 = Math.round((t[0] - e[0]) * r + e[0]) * 65536 + Math.round((t[1] - e[1]) * r + e[1]) * 256 + Math.round((t[2] - e[2]) * r + e[2]);
  return e[3] > -1 && t[3] > -1 ? o = Math.round(((t[3] - e[3]) * r + e[3]) * 255) : t[3] > -1 ? o = Math.round(t[3] * 255) : e[3] > -1 ? o = Math.round(e[3] * 255) : o = 255, "#" + (4294967296 + o * 16777216 + s2).toString(16).slice(e[3] > -1 || t[3] > -1 ? 1 : 3);
}
function E(e, t, r = 3) {
  function o(p2, m, c) {
    return Math.sqrt((1 - c) * Math.pow(p2, 2) + c * Math.pow(m, 2));
  }
  __name(o, "o");
  n(o, "blendValue");
  function s2(p2) {
    let m = new RegExp(/(rgb\(|)(?<r>\d{1,3}),(\s*|)(?<g>\d{1,3}),(\s*|)(?<b>\d{1,3})(\)|)/), c = new RegExp(/^#?(?<r>[a-f\d]{2})(?<g>[a-f\d]{2})(?<b>[a-f\d]{2})$/i), b = p2.match(m), u = p2.match(c);
    return b ? b.groups : Object.keys(u.groups).reduce((O, T) => (O[T] = parseInt(u.groups[T], 16), O), {});
  }
  __name(s2, "s");
  n(s2, "inputToRGB");
  let [a, i] = [s2(e), s2(t)];
  return [...Array(r).keys()].map((p2) => ["r", "g", "b"].map((m) => o(a[m], i[m], p2 * (1 / r))));
}
function _2(e = "") {
  let r = parseInt(e, 36).toString(16).slice(0, 6).padEnd(6, "0").match(/.{1,2}/g).map((a) => +`0x${a}`), o = Math.min.apply(Math, r), s2 = r.indexOf(Math.min.apply(Math, r));
  return r[s2] = 255, { fg: r.map((a) => Math.floor(a).toString(16)).join(""), bg: r.map((a) => Math.floor(a * 0.35).toString(16)).join("") };
}
function z2(e) {
  let t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  e.match(t) && (e = e.replace(t, (o, s2, a, i) => s2 + s2 + a + a + i + i));
  let r = e.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)];
}
function F(e) {
  return Object.keys(e).reduce((t, r) => (t += r, t += JSON.stringify(e[r]).replace(/"/g, "").replace(/,/g, ";"), t), "");
}
function K(e = "") {
  return parseInt(e.toUpperCase(), 36).toString(16).slice(0, 6).padEnd(6, "0");
}
function L2(e, t) {
  return Object.keys(e).reduce((r, o) => (r[o] = +`0x${+t[`--${e[o]}`].replace(/#/, "")}`, r), {});
}
function h(e, t = 2) {
  return String(e).padStart(t, 0);
}
function f2(e, t = {}) {
  let r = new Date(e || Date.now()), o = Object.assign({}, { utc: false, padStart: 2, join: true }, t), s2 = o.utc ? "UTC" : "", a = [r[`get${s2}FullYear`](), r[`get${s2}Month`]() + 1, r[`get${s2}Date`]()].map((i) => h(i.toString(), o.padStart));
  return o.join ? +a.join("") : a;
}
function l(e, t = {}) {
  let r = new Date(e || Date.now()), o = Object.assign({}, { utc: false, ms: false, padStart: 2, join: true }, t), s2 = o.utc ? "UTC" : "", a = [r[`get${s2}Hours`](), r[`get${s2}Minutes`](), r[`get${s2}Seconds`](), o.ms ? r[`get${s2}Milliseconds`]() : null].filter((i) => i !== null).map((i) => h(i.toString(), o.padStart));
  return o.join ? a.join("") : a;
}
function V2(e, t = {}) {
  let r = new Date(e || Date.now()), o = Object.assign({}, { utc: false, ms: false, padStart: 2 }, t, { join: true });
  return +[f2(e, o), l(e, o)].join("");
}
function G2(e, t = {}) {
  let r = new Date(e || Date.now()), o = Object.assign({}, { utc: false, padStart: 2, delimiter: "/" }, t);
  return f2(e, Object.assign({}, o, { join: false })).join(o.delimiter || "");
}
function W2(e, t = {}) {
  let r = new Date(e || Date.now()), o = Object.assign({}, { utc: false, ms: false, padStart: 2, delimiter: ":" }, t);
  return l(e, Object.assign({}, o, { join: false })).join(o.delimiter || "");
}
function N2(e, t = {}) {
  let r = new Date(e || Date.now()), o = Object.assign({}, { utc: false, ms: false, padStart: 2, dateDelimiter: "/", timeDelimiter: ":" }, t);
  return [f2(e, Object.assign({}, o, { join: false })).join(o.dateDelimiter || ""), l(e, Object.assign({}, o, { join: false })).join(o.timeDelimiter || "")].join(" ");
}
async function Z2(e) {
  if (!e)
    return "";
  let t = new FileReader();
  return t.readAsDataURL(e), new Promise((r) => {
    t.onloadend = () => r(t.result);
  });
}
function J(e, t = "png") {
  if (!e)
    return "";
  let r = (() => typeof btoa == "function" ? btoa((e.data || e).reduce((o, s2) => o + String.fromCharCode(s2), "")) : Buffer.from(e).toString("base64"))();
  return `data:image/${t};base64,${r}`;
}
function S(e, t, r, o) {
  let s2 = Math.min(r / e, o / t);
  return { width: e * s2, height: t * s2 };
}
function Y2(e, t, r, o = true) {
  if (typeof document == "undefined")
    throw new Error("Must run in browser context");
  return new Promise((s2) => {
    let a = n((p2, m) => {
      let c = document.createElement("canvas"), b = c.getContext("2d"), u = [t || p2, r || m];
      return Object.assign(c, o ? S(p2, m, u[0], u[1]) : { width: u[0], height: u[1] }), b.drawImage(i, 0, 0, c.width, c.height), c.toDataURL();
    }, "draw"), i = new Image();
    i.src = e, i.onload = () => {
      s2(a(i.width, i.height));
    };
  });
}
function M(e, t, r) {
  return Math.max(+t, Math.min(+e, +r));
}
function q(e, t = 1) {
  return [typeof e == "string", typeof e?.[Symbol.iterator] != "function"].some((s2) => s2) ? void 0 : [["number", "string"].includes(typeof t), !isNaN(t)].every((s2) => s2) ? C2(Array.from(e)).slice(0, M(Math.abs(t), 1, e.length || e.size)) : [];
}
function X2(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e);
}
function d(e) {
  return e || (e = ""), e.replace(/([A-Z])/g, (t, r) => " " + r.toLowerCase()).replace(/[_\- ]+(.)/g, " $1").trim();
}
function g(e) {
  return d(e).replace(/\s(.)/g, (t, r) => r.toUpperCase());
}
function k(e) {
  return Array.isArray(e) ? e.map((t) => k(t)) : e != null && e.constructor === Object ? Object.keys(e).reduce((t, r) => ({ ...t, [g(r)]: k(e[r]) }), {}) : e;
}
function $(e) {
  return d(e).replace(/[ ]/g, "_");
}
function Q2(e, t = {}) {
  let r = {}, o = Object.assign({}, e, t);
  for (let s2 in o)
    r[$(s2)] = o[s2];
  return r;
}
function x(e) {
  return d(e).replace(/[ ]/g, "-");
}
function ee2(e, t = {}) {
  let r = {}, o = Object.assign({}, e, t);
  for (let s2 in o)
    r[x(s2)] = o[s2];
  return r;
}
function v(e) {
  return e ? typeof e == "string" ? e : Object.keys(e).reduce((t, r) => {
    let o = e[r];
    return typeof o == "object" && o !== null ? t += `${r} {
${v(o)}}
` : (r.startsWith("--") || (r = x(r)), t += `${r}: ${o};
`), t;
  }, "") : "";
}
function U2(e, t = []) {
  return new Proxy(e, { get(r, o, s2) {
    return typeof r[o] == "object" ? (Object.defineProperty(r[o], "parentPath", { get: () => t }), U2(r[o], t.concat([o]))) : typeof r[o] == "function" ? r[o].bind({ get parentPath() {
      return t;
    }, ...r }) : r[o];
  } });
}
function te2(e = {}, t) {
  return Object.entries(e).reduce((r, [o, s2]) => (r[t(o, s2)] = s2, r), {});
}
function re(e = {}, t) {
  return new Proxy(e, { set: function(r, o, s2) {
    return typeof t == "function" && t({ property: o, previousValue: r[o], newValue: s2 }), Reflect.set(...arguments);
  }, deleteProperty: function(r, o) {
    return t({ property: o, previousValue: r[o], newValue: null }), true;
  } });
}
function oe2(e) {
  let t = [];
  return g(e).replace(/^[a-z]|[A-Z]/g, (r) => {
    t.push(r);
  }), t.join("").toUpperCase();
}
function ne(e) {
  return e || (e = ""), e.replace(/([A-Z])/g, (t, r) => " " + r.toLowerCase()).replace(/[_\- ]+(.)/g, " $1").trim().split(" ").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function se(e = "") {
  let t = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return e.match(t);
}
function le2(e = 5, t) {
  t || (t = fe2);
  let r = [];
  for (; r.length < e; ) {
    let o = t.charAt(Math.floor(Math.random() * t.length));
    r.indexOf(o) == -1 && r.push(o);
  }
  return r.join("");
}
function D2(e) {
  try {
    return !!new new Proxy(e, B)();
  } catch (t) {
    return false;
  }
}
async function de2(e = 1e3) {
  return new Promise((t) => setTimeout(t, e));
}
var R2, n, ie, ce2, pe2, A, P2, ue2, fe2, B, y, j2, w;
var init_toolbox = __esm({
  "../facade-toolbox/dist/toolbox.js"() {
    R2 = Object.defineProperty;
    n = /* @__PURE__ */ __name((e, t) => R2(e, "name", { value: t, configurable: true }), "n");
    __name(H2, "H");
    n(H2, "chunk");
    __name(C2, "C");
    n(C2, "shuffle");
    __name(I, "I");
    n(I, "blendHex");
    __name(E, "E");
    n(E, "gradient");
    __name(_2, "_");
    n(_2, "generateHexColor");
    __name(z2, "z");
    n(z2, "hexToRGB");
    __name(F, "F");
    n(F, "jsonToCSS");
    __name(K, "K");
    n(K, "stringToHexColor");
    __name(L2, "L");
    n(L2, "varsToHex");
    __name(h, "h");
    n(h, "padStart");
    __name(f2, "f");
    n(f2, "datestamp");
    __name(l, "l");
    n(l, "timestamp");
    __name(V2, "V");
    n(V2, "datetimestamp");
    __name(G2, "G");
    n(G2, "prettyDate");
    __name(W2, "W");
    n(W2, "prettyTime");
    __name(N2, "N");
    n(N2, "prettyDateTime");
    __name(Z2, "Z");
    n(Z2, "imgFromBlob");
    __name(J, "J");
    n(J, "imgFromBuffer");
    __name(S, "S");
    n(S, "resizeWithAspectRatio");
    __name(Y2, "Y");
    n(Y2, "imgToDataUri");
    __name(M, "M");
    n(M, "clamp");
    __name(q, "q");
    n(q, "randomItems");
    __name(X2, "X");
    n(X2, "randomInt");
    __name(d, "d");
    n(d, "sentenceCase");
    __name(g, "g");
    n(g, "camelCase");
    __name(k, "k");
    n(k, "camelKeys");
    __name($, "$");
    n($, "snakeCase");
    __name(Q2, "Q");
    n(Q2, "snakeKeys");
    __name(x, "x");
    n(x, "kebabCase");
    __name(ee2, "ee");
    n(ee2, "kebabKeys");
    __name(v, "v");
    n(v, "objectToStyle");
    __name(U2, "U");
    n(U2, "objectWithPath");
    __name(te2, "te");
    n(te2, "mapKeys");
    __name(re, "re");
    n(re, "changedProxy");
    __name(oe2, "oe");
    n(oe2, "abbreviationCase");
    __name(ne, "ne");
    n(ne, "humanCase");
    __name(se, "se");
    n(se, "validURL");
    ie = [...Array(10)].map((e, t) => String.fromCharCode(t + 48));
    ce2 = [...Array(26)].map((e, t) => String.fromCharCode(t + 97));
    pe2 = [...Array(26)].map((e, t) => String.fromCharCode(t + 65));
    A = ie.concat(ce2).concat(pe2);
    P2 = [...Array(26)].map((e, t) => String.fromCharCode(t + 65));
    ue2 = [...Array(10).keys()];
    fe2 = P2.join("") + P2.join("").toLowerCase() + ue2.join("");
    __name(le2, "le");
    n(le2, "randomChars");
    B = { construct() {
      return B;
    } };
    __name(D2, "D");
    n(D2, "isConstructor");
    y = /* @__PURE__ */ __name(class extends Map {
      constructor(t, r = "CacheMap", o = console) {
        super();
        D2(o) ? this.logger = new o(r) : this.logger = o, this.maxSize = t, this.namespace = r;
      }
      set(t, r) {
        return this.size + 1 >= this.maxSize && (this.logger && typeof this.logger == "function" && this.logger([`Unshifting ${this.namespace} due to imminent overflow.`, `Current size: ${this.size}.`].join(" ")), this.delete(Array.from(this.keys())[0])), super.set(t, r);
      }
    }, "y");
    n(y, "CacheMap");
    j2 = /* @__PURE__ */ __name(class {
      constructor(t) {
        this.methods = ["error", "warn", "debug", "info", "log", "table"];
        for (let r of this.methods)
          this[r] = function() {
            let o = Array.prototype.slice.call(arguments);
            return this.prefix && o.unshift(this.prefix), console[r].apply(console, o);
          };
      }
    }, "j");
    n(j2, "Logger");
    w = /* @__PURE__ */ __name(class extends j2 {
      constructor(t = "HeapLogger") {
        super();
        this.namespace = t;
      }
      get prefix() {
        return `[${this.namespace}] [${this.heap}]`;
      }
      get relevantHeap() {
        return this.serverHeap || this.clientHeap || 0;
      }
      get heap() {
        let { value: t, unit: r } = this.bytesToUnit(this.relevantHeap);
        return `${t} ${r}`;
      }
      bytesToUnit(t, r = 2) {
        if (!t)
          return 0;
        let o = 1024, s2 = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], a = Math.floor(Math.log(t) / Math.log(o));
        return { value: parseFloat((t / Math.pow(o, a)).toFixed(r)), unit: s2[a] };
      }
      get clientHeap() {
        if (typeof window == "object" && window.performance?.memory)
          return window.performance.memory.usedJSHeapSize || 0;
      }
      get serverHeap() {
        if (typeof process == "object" && process.memoryUsage)
          return process.memoryUsage().heapUsed || 0;
      }
    }, "w");
    n(w, "HeapLogger");
    __name(de2, "de");
    n(de2, "wait");
  }
});

// node_modules/x-is-array/index.js
var require_x_is_array = __commonJS({
  "node_modules/x-is-array/index.js"(exports, module) {
    var nativeIsArray = Array.isArray;
    var toString = Object.prototype.toString;
    module.exports = nativeIsArray || isArray;
    function isArray(obj) {
      return toString.call(obj) === "[object Array]";
    }
    __name(isArray, "isArray");
  }
});

// node_modules/virtual-dom/vnode/version.js
var require_version = __commonJS({
  "node_modules/virtual-dom/vnode/version.js"(exports, module) {
    module.exports = "2";
  }
});

// node_modules/virtual-dom/vnode/vpatch.js
var require_vpatch = __commonJS({
  "node_modules/virtual-dom/vnode/vpatch.js"(exports, module) {
    var version = require_version();
    VirtualPatch.NONE = 0;
    VirtualPatch.VTEXT = 1;
    VirtualPatch.VNODE = 2;
    VirtualPatch.WIDGET = 3;
    VirtualPatch.PROPS = 4;
    VirtualPatch.ORDER = 5;
    VirtualPatch.INSERT = 6;
    VirtualPatch.REMOVE = 7;
    VirtualPatch.THUNK = 8;
    module.exports = VirtualPatch;
    function VirtualPatch(type, vNode, patch) {
      this.type = Number(type);
      this.vNode = vNode;
      this.patch = patch;
    }
    __name(VirtualPatch, "VirtualPatch");
    VirtualPatch.prototype.version = version;
    VirtualPatch.prototype.type = "VirtualPatch";
  }
});

// node_modules/virtual-dom/vnode/is-vnode.js
var require_is_vnode = __commonJS({
  "node_modules/virtual-dom/vnode/is-vnode.js"(exports, module) {
    var version = require_version();
    module.exports = isVirtualNode;
    function isVirtualNode(x2) {
      return x2 && x2.type === "VirtualNode" && x2.version === version;
    }
    __name(isVirtualNode, "isVirtualNode");
  }
});

// node_modules/virtual-dom/vnode/is-vtext.js
var require_is_vtext = __commonJS({
  "node_modules/virtual-dom/vnode/is-vtext.js"(exports, module) {
    var version = require_version();
    module.exports = isVirtualText;
    function isVirtualText(x2) {
      return x2 && x2.type === "VirtualText" && x2.version === version;
    }
    __name(isVirtualText, "isVirtualText");
  }
});

// node_modules/virtual-dom/vnode/is-widget.js
var require_is_widget = __commonJS({
  "node_modules/virtual-dom/vnode/is-widget.js"(exports, module) {
    module.exports = isWidget;
    function isWidget(w2) {
      return w2 && w2.type === "Widget";
    }
    __name(isWidget, "isWidget");
  }
});

// node_modules/virtual-dom/vnode/is-thunk.js
var require_is_thunk = __commonJS({
  "node_modules/virtual-dom/vnode/is-thunk.js"(exports, module) {
    module.exports = isThunk;
    function isThunk(t) {
      return t && t.type === "Thunk";
    }
    __name(isThunk, "isThunk");
  }
});

// node_modules/virtual-dom/vnode/handle-thunk.js
var require_handle_thunk = __commonJS({
  "node_modules/virtual-dom/vnode/handle-thunk.js"(exports, module) {
    var isVNode = require_is_vnode();
    var isVText = require_is_vtext();
    var isWidget = require_is_widget();
    var isThunk = require_is_thunk();
    module.exports = handleThunk;
    function handleThunk(a, b) {
      var renderedA = a;
      var renderedB = b;
      if (isThunk(b)) {
        renderedB = renderThunk(b, a);
      }
      if (isThunk(a)) {
        renderedA = renderThunk(a, null);
      }
      return {
        a: renderedA,
        b: renderedB
      };
    }
    __name(handleThunk, "handleThunk");
    function renderThunk(thunk, previous) {
      var renderedThunk = thunk.vnode;
      if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous);
      }
      if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
      }
      return renderedThunk;
    }
    __name(renderThunk, "renderThunk");
  }
});

// node_modules/is-object/index.js
var require_is_object = __commonJS({
  "node_modules/is-object/index.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ __name(function isObject(x2) {
      return typeof x2 === "object" && x2 !== null;
    }, "isObject");
  }
});

// node_modules/virtual-dom/vnode/is-vhook.js
var require_is_vhook = __commonJS({
  "node_modules/virtual-dom/vnode/is-vhook.js"(exports, module) {
    module.exports = isHook;
    function isHook(hook) {
      return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
    }
    __name(isHook, "isHook");
  }
});

// node_modules/virtual-dom/vtree/diff-props.js
var require_diff_props = __commonJS({
  "node_modules/virtual-dom/vtree/diff-props.js"(exports, module) {
    var isObject = require_is_object();
    var isHook = require_is_vhook();
    module.exports = diffProps;
    function diffProps(a, b) {
      var diff;
      for (var aKey in a) {
        if (!(aKey in b)) {
          diff = diff || {};
          diff[aKey] = void 0;
        }
        var aValue = a[aKey];
        var bValue = b[aKey];
        if (aValue === bValue) {
          continue;
        } else if (isObject(aValue) && isObject(bValue)) {
          if (getPrototype(bValue) !== getPrototype(aValue)) {
            diff = diff || {};
            diff[aKey] = bValue;
          } else if (isHook(bValue)) {
            diff = diff || {};
            diff[aKey] = bValue;
          } else {
            var objectDiff = diffProps(aValue, bValue);
            if (objectDiff) {
              diff = diff || {};
              diff[aKey] = objectDiff;
            }
          }
        } else {
          diff = diff || {};
          diff[aKey] = bValue;
        }
      }
      for (var bKey in b) {
        if (!(bKey in a)) {
          diff = diff || {};
          diff[bKey] = b[bKey];
        }
      }
      return diff;
    }
    __name(diffProps, "diffProps");
    function getPrototype(value) {
      if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
      } else if (value.__proto__) {
        return value.__proto__;
      } else if (value.constructor) {
        return value.constructor.prototype;
      }
    }
    __name(getPrototype, "getPrototype");
  }
});

// node_modules/virtual-dom/vtree/diff.js
var require_diff = __commonJS({
  "node_modules/virtual-dom/vtree/diff.js"(exports, module) {
    var isArray = require_x_is_array();
    var VPatch = require_vpatch();
    var isVNode = require_is_vnode();
    var isVText = require_is_vtext();
    var isWidget = require_is_widget();
    var isThunk = require_is_thunk();
    var handleThunk = require_handle_thunk();
    var diffProps = require_diff_props();
    module.exports = diff;
    function diff(a, b) {
      var patch = { a };
      walk(a, b, patch, 0);
      return patch;
    }
    __name(diff, "diff");
    function walk(a, b, patch, index) {
      if (a === b) {
        return;
      }
      var apply = patch[index];
      var applyClear = false;
      if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index);
      } else if (b == null) {
        if (!isWidget(a)) {
          clearState(a, patch, index);
          apply = patch[index];
        }
        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
      } else if (isVNode(b)) {
        if (isVNode(a)) {
          if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
            var propsPatch = diffProps(a.properties, b.properties);
            if (propsPatch) {
              apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
            }
            apply = diffChildren(a, b, patch, apply, index);
          } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
            applyClear = true;
          }
        } else {
          apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
          applyClear = true;
        }
      } else if (isVText(b)) {
        if (!isVText(a)) {
          apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
          applyClear = true;
        } else if (a.text !== b.text) {
          apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
        }
      } else if (isWidget(b)) {
        if (!isWidget(a)) {
          applyClear = true;
        }
        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
      }
      if (apply) {
        patch[index] = apply;
      }
      if (applyClear) {
        clearState(a, patch, index);
      }
    }
    __name(walk, "walk");
    function diffChildren(a, b, patch, apply, index) {
      var aChildren = a.children;
      var orderedSet = reorder(aChildren, b.children);
      var bChildren = orderedSet.children;
      var aLen = aChildren.length;
      var bLen = bChildren.length;
      var len = aLen > bLen ? aLen : bLen;
      for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i];
        var rightNode = bChildren[i];
        index += 1;
        if (!leftNode) {
          if (rightNode) {
            apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
          }
        } else {
          walk(leftNode, rightNode, patch, index);
        }
        if (isVNode(leftNode) && leftNode.count) {
          index += leftNode.count;
        }
      }
      if (orderedSet.moves) {
        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
      }
      return apply;
    }
    __name(diffChildren, "diffChildren");
    function clearState(vNode, patch, index) {
      unhook(vNode, patch, index);
      destroyWidgets(vNode, patch, index);
    }
    __name(clearState, "clearState");
    function destroyWidgets(vNode, patch, index) {
      if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
          patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
        }
      } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children;
        var len = children.length;
        for (var i = 0; i < len; i++) {
          var child = children[i];
          index += 1;
          destroyWidgets(child, patch, index);
          if (isVNode(child) && child.count) {
            index += child.count;
          }
        }
      } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
      }
    }
    __name(destroyWidgets, "destroyWidgets");
    function thunks(a, b, patch, index) {
      var nodes = handleThunk(a, b);
      var thunkPatch = diff(nodes.a, nodes.b);
      if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
      }
    }
    __name(thunks, "thunks");
    function hasPatches(patch) {
      for (var index in patch) {
        if (index !== "a") {
          return true;
        }
      }
      return false;
    }
    __name(hasPatches, "hasPatches");
    function unhook(vNode, patch, index) {
      if (isVNode(vNode)) {
        if (vNode.hooks) {
          patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
        }
        if (vNode.descendantHooks || vNode.hasThunks) {
          var children = vNode.children;
          var len = children.length;
          for (var i = 0; i < len; i++) {
            var child = children[i];
            index += 1;
            unhook(child, patch, index);
            if (isVNode(child) && child.count) {
              index += child.count;
            }
          }
        }
      } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
      }
    }
    __name(unhook, "unhook");
    function undefinedKeys(obj) {
      var result = {};
      for (var key in obj) {
        result[key] = void 0;
      }
      return result;
    }
    __name(undefinedKeys, "undefinedKeys");
    function reorder(aChildren, bChildren) {
      var bChildIndex = keyIndex(bChildren);
      var bKeys = bChildIndex.keys;
      var bFree = bChildIndex.free;
      if (bFree.length === bChildren.length) {
        return {
          children: bChildren,
          moves: null
        };
      }
      var aChildIndex = keyIndex(aChildren);
      var aKeys = aChildIndex.keys;
      var aFree = aChildIndex.free;
      if (aFree.length === aChildren.length) {
        return {
          children: bChildren,
          moves: null
        };
      }
      var newChildren = [];
      var freeIndex = 0;
      var freeCount = bFree.length;
      var deletedItems = 0;
      for (var i = 0; i < aChildren.length; i++) {
        var aItem = aChildren[i];
        var itemIndex;
        if (aItem.key) {
          if (bKeys.hasOwnProperty(aItem.key)) {
            itemIndex = bKeys[aItem.key];
            newChildren.push(bChildren[itemIndex]);
          } else {
            itemIndex = i - deletedItems++;
            newChildren.push(null);
          }
        } else {
          if (freeIndex < freeCount) {
            itemIndex = bFree[freeIndex++];
            newChildren.push(bChildren[itemIndex]);
          } else {
            itemIndex = i - deletedItems++;
            newChildren.push(null);
          }
        }
      }
      var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
      for (var j3 = 0; j3 < bChildren.length; j3++) {
        var newItem = bChildren[j3];
        if (newItem.key) {
          if (!aKeys.hasOwnProperty(newItem.key)) {
            newChildren.push(newItem);
          }
        } else if (j3 >= lastFreeIndex) {
          newChildren.push(newItem);
        }
      }
      var simulate = newChildren.slice();
      var simulateIndex = 0;
      var removes = [];
      var inserts = [];
      var simulateItem;
      for (var k2 = 0; k2 < bChildren.length; ) {
        var wantedItem = bChildren[k2];
        simulateItem = simulate[simulateIndex];
        while (simulateItem === null && simulate.length) {
          removes.push(remove(simulate, simulateIndex, null));
          simulateItem = simulate[simulateIndex];
        }
        if (!simulateItem || simulateItem.key !== wantedItem.key) {
          if (wantedItem.key) {
            if (simulateItem && simulateItem.key) {
              if (bKeys[simulateItem.key] !== k2 + 1) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key));
                simulateItem = simulate[simulateIndex];
                if (!simulateItem || simulateItem.key !== wantedItem.key) {
                  inserts.push({ key: wantedItem.key, to: k2 });
                } else {
                  simulateIndex++;
                }
              } else {
                inserts.push({ key: wantedItem.key, to: k2 });
              }
            } else {
              inserts.push({ key: wantedItem.key, to: k2 });
            }
            k2++;
          } else if (simulateItem && simulateItem.key) {
            removes.push(remove(simulate, simulateIndex, simulateItem.key));
          }
        } else {
          simulateIndex++;
          k2++;
        }
      }
      while (simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex];
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
      }
      if (removes.length === deletedItems && !inserts.length) {
        return {
          children: newChildren,
          moves: null
        };
      }
      return {
        children: newChildren,
        moves: {
          removes,
          inserts
        }
      };
    }
    __name(reorder, "reorder");
    function remove(arr, index, key) {
      arr.splice(index, 1);
      return {
        from: index,
        key
      };
    }
    __name(remove, "remove");
    function keyIndex(children) {
      var keys = {};
      var free = [];
      var length = children.length;
      for (var i = 0; i < length; i++) {
        var child = children[i];
        if (child.key) {
          keys[child.key] = i;
        } else {
          free.push(i);
        }
      }
      return {
        keys,
        free
      };
    }
    __name(keyIndex, "keyIndex");
    function appendPatch(apply, patch) {
      if (apply) {
        if (isArray(apply)) {
          apply.push(patch);
        } else {
          apply = [apply, patch];
        }
        return apply;
      } else {
        return patch;
      }
    }
    __name(appendPatch, "appendPatch");
  }
});

// node_modules/virtual-dom/diff.js
var require_diff2 = __commonJS({
  "node_modules/virtual-dom/diff.js"(exports, module) {
    var diff = require_diff();
    module.exports = diff;
  }
});

// (disabled):node_modules/min-document/index.js
var require_min_document = __commonJS({
  "(disabled):node_modules/min-document/index.js"() {
  }
});

// node_modules/global/document.js
var require_document = __commonJS({
  "node_modules/global/document.js"(exports, module) {
    var topLevel = typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : {};
    var minDoc = require_min_document();
    var doccy;
    if (typeof document !== "undefined") {
      doccy = document;
    } else {
      doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
      if (!doccy) {
        doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
      }
    }
    module.exports = doccy;
  }
});

// node_modules/virtual-dom/vdom/apply-properties.js
var require_apply_properties = __commonJS({
  "node_modules/virtual-dom/vdom/apply-properties.js"(exports, module) {
    var isObject = require_is_object();
    var isHook = require_is_vhook();
    module.exports = applyProperties;
    function applyProperties(node, props, previous) {
      for (var propName in props) {
        var propValue = props[propName];
        if (propValue === void 0) {
          removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
          removeProperty(node, propName, propValue, previous);
          if (propValue.hook) {
            propValue.hook(node, propName, previous ? previous[propName] : void 0);
          }
        } else {
          if (isObject(propValue)) {
            patchObject(node, props, previous, propName, propValue);
          } else {
            node[propName] = propValue;
          }
        }
      }
    }
    __name(applyProperties, "applyProperties");
    function removeProperty(node, propName, propValue, previous) {
      if (previous) {
        var previousValue = previous[propName];
        if (!isHook(previousValue)) {
          if (propName === "attributes") {
            for (var attrName in previousValue) {
              node.removeAttribute(attrName);
            }
          } else if (propName === "style") {
            for (var i in previousValue) {
              node.style[i] = "";
            }
          } else if (typeof previousValue === "string") {
            node[propName] = "";
          } else {
            node[propName] = null;
          }
        } else if (previousValue.unhook) {
          previousValue.unhook(node, propName, propValue);
        }
      }
    }
    __name(removeProperty, "removeProperty");
    function patchObject(node, props, previous, propName, propValue) {
      var previousValue = previous ? previous[propName] : void 0;
      if (propName === "attributes") {
        for (var attrName in propValue) {
          var attrValue = propValue[attrName];
          if (attrValue === void 0) {
            node.removeAttribute(attrName);
          } else {
            node.setAttribute(attrName, attrValue);
          }
        }
        return;
      }
      if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue;
        return;
      }
      if (!isObject(node[propName])) {
        node[propName] = {};
      }
      var replacer = propName === "style" ? "" : void 0;
      for (var k2 in propValue) {
        var value = propValue[k2];
        node[propName][k2] = value === void 0 ? replacer : value;
      }
    }
    __name(patchObject, "patchObject");
    function getPrototype(value) {
      if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
      } else if (value.__proto__) {
        return value.__proto__;
      } else if (value.constructor) {
        return value.constructor.prototype;
      }
    }
    __name(getPrototype, "getPrototype");
  }
});

// node_modules/virtual-dom/vdom/create-element.js
var require_create_element = __commonJS({
  "node_modules/virtual-dom/vdom/create-element.js"(exports, module) {
    var document2 = require_document();
    var applyProperties = require_apply_properties();
    var isVNode = require_is_vnode();
    var isVText = require_is_vtext();
    var isWidget = require_is_widget();
    var handleThunk = require_handle_thunk();
    module.exports = createElement;
    function createElement(vnode, opts) {
      var doc = opts ? opts.document || document2 : document2;
      var warn = opts ? opts.warn : null;
      vnode = handleThunk(vnode).a;
      if (isWidget(vnode)) {
        return vnode.init();
      } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text);
      } else if (!isVNode(vnode)) {
        if (warn) {
          warn("Item is not a valid virtual dom node", vnode);
        }
        return null;
      }
      var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
      var props = vnode.properties;
      applyProperties(node, props);
      var children = vnode.children;
      for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts);
        if (childNode) {
          node.appendChild(childNode);
        }
      }
      return node;
    }
    __name(createElement, "createElement");
  }
});

// node_modules/virtual-dom/vdom/dom-index.js
var require_dom_index = __commonJS({
  "node_modules/virtual-dom/vdom/dom-index.js"(exports, module) {
    var noChild = {};
    module.exports = domIndex;
    function domIndex(rootNode, tree, indices, nodes) {
      if (!indices || indices.length === 0) {
        return {};
      } else {
        indices.sort(ascending);
        return recurse(rootNode, tree, indices, nodes, 0);
      }
    }
    __name(domIndex, "domIndex");
    function recurse(rootNode, tree, indices, nodes, rootIndex) {
      nodes = nodes || {};
      if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
          nodes[rootIndex] = rootNode;
        }
        var vChildren = tree.children;
        if (vChildren) {
          var childNodes = rootNode.childNodes;
          for (var i = 0; i < tree.children.length; i++) {
            rootIndex += 1;
            var vChild = vChildren[i] || noChild;
            var nextIndex = rootIndex + (vChild.count || 0);
            if (indexInRange(indices, rootIndex, nextIndex)) {
              recurse(childNodes[i], vChild, indices, nodes, rootIndex);
            }
            rootIndex = nextIndex;
          }
        }
      }
      return nodes;
    }
    __name(recurse, "recurse");
    function indexInRange(indices, left, right) {
      if (indices.length === 0) {
        return false;
      }
      var minIndex = 0;
      var maxIndex = indices.length - 1;
      var currentIndex;
      var currentItem;
      while (minIndex <= maxIndex) {
        currentIndex = (maxIndex + minIndex) / 2 >> 0;
        currentItem = indices[currentIndex];
        if (minIndex === maxIndex) {
          return currentItem >= left && currentItem <= right;
        } else if (currentItem < left) {
          minIndex = currentIndex + 1;
        } else if (currentItem > right) {
          maxIndex = currentIndex - 1;
        } else {
          return true;
        }
      }
      return false;
    }
    __name(indexInRange, "indexInRange");
    function ascending(a, b) {
      return a > b ? 1 : -1;
    }
    __name(ascending, "ascending");
  }
});

// node_modules/virtual-dom/vdom/update-widget.js
var require_update_widget = __commonJS({
  "node_modules/virtual-dom/vdom/update-widget.js"(exports, module) {
    var isWidget = require_is_widget();
    module.exports = updateWidget;
    function updateWidget(a, b) {
      if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
          return a.id === b.id;
        } else {
          return a.init === b.init;
        }
      }
      return false;
    }
    __name(updateWidget, "updateWidget");
  }
});

// node_modules/virtual-dom/vdom/patch-op.js
var require_patch_op = __commonJS({
  "node_modules/virtual-dom/vdom/patch-op.js"(exports, module) {
    var applyProperties = require_apply_properties();
    var isWidget = require_is_widget();
    var VPatch = require_vpatch();
    var updateWidget = require_update_widget();
    module.exports = applyPatch;
    function applyPatch(vpatch, domNode, renderOptions) {
      var type = vpatch.type;
      var vNode = vpatch.vNode;
      var patch = vpatch.patch;
      switch (type) {
        case VPatch.REMOVE:
          return removeNode(domNode, vNode);
        case VPatch.INSERT:
          return insertNode(domNode, patch, renderOptions);
        case VPatch.VTEXT:
          return stringPatch(domNode, vNode, patch, renderOptions);
        case VPatch.WIDGET:
          return widgetPatch(domNode, vNode, patch, renderOptions);
        case VPatch.VNODE:
          return vNodePatch(domNode, vNode, patch, renderOptions);
        case VPatch.ORDER:
          reorderChildren(domNode, patch);
          return domNode;
        case VPatch.PROPS:
          applyProperties(domNode, patch, vNode.properties);
          return domNode;
        case VPatch.THUNK:
          return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
        default:
          return domNode;
      }
    }
    __name(applyPatch, "applyPatch");
    function removeNode(domNode, vNode) {
      var parentNode = domNode.parentNode;
      if (parentNode) {
        parentNode.removeChild(domNode);
      }
      destroyWidget(domNode, vNode);
      return null;
    }
    __name(removeNode, "removeNode");
    function insertNode(parentNode, vNode, renderOptions) {
      var newNode = renderOptions.render(vNode, renderOptions);
      if (parentNode) {
        parentNode.appendChild(newNode);
      }
      return parentNode;
    }
    __name(insertNode, "insertNode");
    function stringPatch(domNode, leftVNode, vText, renderOptions) {
      var newNode;
      if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text);
        newNode = domNode;
      } else {
        var parentNode = domNode.parentNode;
        newNode = renderOptions.render(vText, renderOptions);
        if (parentNode && newNode !== domNode) {
          parentNode.replaceChild(newNode, domNode);
        }
      }
      return newNode;
    }
    __name(stringPatch, "stringPatch");
    function widgetPatch(domNode, leftVNode, widget, renderOptions) {
      var updating = updateWidget(leftVNode, widget);
      var newNode;
      if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode;
      } else {
        newNode = renderOptions.render(widget, renderOptions);
      }
      var parentNode = domNode.parentNode;
      if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
      }
      if (!updating) {
        destroyWidget(domNode, leftVNode);
      }
      return newNode;
    }
    __name(widgetPatch, "widgetPatch");
    function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
      var parentNode = domNode.parentNode;
      var newNode = renderOptions.render(vNode, renderOptions);
      if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
      }
      return newNode;
    }
    __name(vNodePatch, "vNodePatch");
    function destroyWidget(domNode, w2) {
      if (typeof w2.destroy === "function" && isWidget(w2)) {
        w2.destroy(domNode);
      }
    }
    __name(destroyWidget, "destroyWidget");
    function reorderChildren(domNode, moves) {
      var childNodes = domNode.childNodes;
      var keyMap = {};
      var node;
      var remove;
      var insert;
      for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i];
        node = childNodes[remove.from];
        if (remove.key) {
          keyMap[remove.key] = node;
        }
        domNode.removeChild(node);
      }
      var length = childNodes.length;
      for (var j3 = 0; j3 < moves.inserts.length; j3++) {
        insert = moves.inserts[j3];
        node = keyMap[insert.key];
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
      }
    }
    __name(reorderChildren, "reorderChildren");
    function replaceRoot(oldRoot, newRoot) {
      if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot);
      }
      return newRoot;
    }
    __name(replaceRoot, "replaceRoot");
  }
});

// node_modules/virtual-dom/vdom/patch.js
var require_patch = __commonJS({
  "node_modules/virtual-dom/vdom/patch.js"(exports, module) {
    var document2 = require_document();
    var isArray = require_x_is_array();
    var render = require_create_element();
    var domIndex = require_dom_index();
    var patchOp = require_patch_op();
    module.exports = patch;
    function patch(rootNode, patches, renderOptions) {
      renderOptions = renderOptions || {};
      renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
      renderOptions.render = renderOptions.render || render;
      return renderOptions.patch(rootNode, patches, renderOptions);
    }
    __name(patch, "patch");
    function patchRecursive(rootNode, patches, renderOptions) {
      var indices = patchIndices(patches);
      if (indices.length === 0) {
        return rootNode;
      }
      var index = domIndex(rootNode, patches.a, indices);
      var ownerDocument = rootNode.ownerDocument;
      if (!renderOptions.document && ownerDocument !== document2) {
        renderOptions.document = ownerDocument;
      }
      for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i];
        rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
      }
      return rootNode;
    }
    __name(patchRecursive, "patchRecursive");
    function applyPatch(rootNode, domNode, patchList, renderOptions) {
      if (!domNode) {
        return rootNode;
      }
      var newNode;
      if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
          newNode = patchOp(patchList[i], domNode, renderOptions);
          if (domNode === rootNode) {
            rootNode = newNode;
          }
        }
      } else {
        newNode = patchOp(patchList, domNode, renderOptions);
        if (domNode === rootNode) {
          rootNode = newNode;
        }
      }
      return rootNode;
    }
    __name(applyPatch, "applyPatch");
    function patchIndices(patches) {
      var indices = [];
      for (var key in patches) {
        if (key !== "a") {
          indices.push(Number(key));
        }
      }
      return indices;
    }
    __name(patchIndices, "patchIndices");
  }
});

// node_modules/virtual-dom/patch.js
var require_patch2 = __commonJS({
  "node_modules/virtual-dom/patch.js"(exports, module) {
    var patch = require_patch();
    module.exports = patch;
  }
});

// node_modules/virtual-dom/vnode/vnode.js
var require_vnode = __commonJS({
  "node_modules/virtual-dom/vnode/vnode.js"(exports, module) {
    var version = require_version();
    var isVNode = require_is_vnode();
    var isWidget = require_is_widget();
    var isThunk = require_is_thunk();
    var isVHook = require_is_vhook();
    module.exports = VirtualNode;
    var noProperties = {};
    var noChildren = [];
    function VirtualNode(tagName, properties, children, key, namespace) {
      this.tagName = tagName;
      this.properties = properties || noProperties;
      this.children = children || noChildren;
      this.key = key != null ? String(key) : void 0;
      this.namespace = typeof namespace === "string" ? namespace : null;
      var count = children && children.length || 0;
      var descendants = 0;
      var hasWidgets = false;
      var hasThunks = false;
      var descendantHooks = false;
      var hooks;
      for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
          var property = properties[propName];
          if (isVHook(property) && property.unhook) {
            if (!hooks) {
              hooks = {};
            }
            hooks[propName] = property;
          }
        }
      }
      for (var i = 0; i < count; i++) {
        var child = children[i];
        if (isVNode(child)) {
          descendants += child.count || 0;
          if (!hasWidgets && child.hasWidgets) {
            hasWidgets = true;
          }
          if (!hasThunks && child.hasThunks) {
            hasThunks = true;
          }
          if (!descendantHooks && (child.hooks || child.descendantHooks)) {
            descendantHooks = true;
          }
        } else if (!hasWidgets && isWidget(child)) {
          if (typeof child.destroy === "function") {
            hasWidgets = true;
          }
        } else if (!hasThunks && isThunk(child)) {
          hasThunks = true;
        }
      }
      this.count = count + descendants;
      this.hasWidgets = hasWidgets;
      this.hasThunks = hasThunks;
      this.hooks = hooks;
      this.descendantHooks = descendantHooks;
    }
    __name(VirtualNode, "VirtualNode");
    VirtualNode.prototype.version = version;
    VirtualNode.prototype.type = "VirtualNode";
  }
});

// node_modules/virtual-dom/vnode/vtext.js
var require_vtext = __commonJS({
  "node_modules/virtual-dom/vnode/vtext.js"(exports, module) {
    var version = require_version();
    module.exports = VirtualText;
    function VirtualText(text) {
      this.text = String(text);
    }
    __name(VirtualText, "VirtualText");
    VirtualText.prototype.version = version;
    VirtualText.prototype.type = "VirtualText";
  }
});

// node_modules/browser-split/index.js
var require_browser_split = __commonJS({
  "node_modules/browser-split/index.js"(exports, module) {
    module.exports = (/* @__PURE__ */ __name(function split(undef) {
      var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, self;
      self = /* @__PURE__ */ __name(function(str, separator, limit) {
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
          return nativeSplit.call(str, separator, limit);
        }
        var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0, separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
        str += "";
        if (!compliantExecNpcg) {
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        limit = limit === undef ? -1 >>> 0 : limit >>> 0;
        while (match = separator.exec(str)) {
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function() {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undef) {
                    match[i] = undef;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < str.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++;
          }
        }
        if (lastLastIndex === str.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      }, "self");
      return self;
    }, "split"))();
  }
});

// node_modules/virtual-dom/virtual-hyperscript/parse-tag.js
var require_parse_tag = __commonJS({
  "node_modules/virtual-dom/virtual-hyperscript/parse-tag.js"(exports, module) {
    "use strict";
    var split = require_browser_split();
    var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
    var notClassId = /^\.|#/;
    module.exports = parseTag;
    function parseTag(tag, props) {
      if (!tag) {
        return "DIV";
      }
      var noId = !props.hasOwnProperty("id");
      var tagParts = split(tag, classIdSplit);
      var tagName = null;
      if (notClassId.test(tagParts[1])) {
        tagName = "DIV";
      }
      var classes, part, type, i;
      for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];
        if (!part) {
          continue;
        }
        type = part.charAt(0);
        if (!tagName) {
          tagName = part;
        } else if (type === ".") {
          classes = classes || [];
          classes.push(part.substring(1, part.length));
        } else if (type === "#" && noId) {
          props.id = part.substring(1, part.length);
        }
      }
      if (classes) {
        if (props.className) {
          classes.push(props.className);
        }
        props.className = classes.join(" ");
      }
      return props.namespace ? tagName : tagName.toUpperCase();
    }
    __name(parseTag, "parseTag");
  }
});

// node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js
var require_soft_set_hook = __commonJS({
  "node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js"(exports, module) {
    "use strict";
    module.exports = SoftSetHook;
    function SoftSetHook(value) {
      if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
      }
      this.value = value;
    }
    __name(SoftSetHook, "SoftSetHook");
    SoftSetHook.prototype.hook = function(node, propertyName) {
      if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
      }
    };
  }
});

// node_modules/individual/index.js
var require_individual = __commonJS({
  "node_modules/individual/index.js"(exports, module) {
    "use strict";
    var root = typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : {};
    module.exports = Individual;
    function Individual(key, value) {
      if (key in root) {
        return root[key];
      }
      root[key] = value;
      return value;
    }
    __name(Individual, "Individual");
  }
});

// node_modules/individual/one-version.js
var require_one_version = __commonJS({
  "node_modules/individual/one-version.js"(exports, module) {
    "use strict";
    var Individual = require_individual();
    module.exports = OneVersion;
    function OneVersion(moduleName, version, defaultValue) {
      var key = "__INDIVIDUAL_ONE_VERSION_" + moduleName;
      var enforceKey = key + "_ENFORCE_SINGLETON";
      var versionValue = Individual(enforceKey, version);
      if (versionValue !== version) {
        throw new Error("Can only have one copy of " + moduleName + ".\nYou already have version " + versionValue + " installed.\nThis means you cannot install version " + version);
      }
      return Individual(key, defaultValue);
    }
    __name(OneVersion, "OneVersion");
  }
});

// node_modules/ev-store/index.js
var require_ev_store = __commonJS({
  "node_modules/ev-store/index.js"(exports, module) {
    "use strict";
    var OneVersionConstraint = require_one_version();
    var MY_VERSION = "7";
    OneVersionConstraint("ev-store", MY_VERSION);
    var hashKey = "__EV_STORE_KEY@" + MY_VERSION;
    module.exports = EvStore;
    function EvStore(elem) {
      var hash = elem[hashKey];
      if (!hash) {
        hash = elem[hashKey] = {};
      }
      return hash;
    }
    __name(EvStore, "EvStore");
  }
});

// node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js
var require_ev_hook = __commonJS({
  "node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js"(exports, module) {
    "use strict";
    var EvStore = require_ev_store();
    module.exports = EvHook;
    function EvHook(value) {
      if (!(this instanceof EvHook)) {
        return new EvHook(value);
      }
      this.value = value;
    }
    __name(EvHook, "EvHook");
    EvHook.prototype.hook = function(node, propertyName) {
      var es = EvStore(node);
      var propName = propertyName.substr(3);
      es[propName] = this.value;
    };
    EvHook.prototype.unhook = function(node, propertyName) {
      var es = EvStore(node);
      var propName = propertyName.substr(3);
      es[propName] = void 0;
    };
  }
});

// node_modules/virtual-dom/virtual-hyperscript/index.js
var require_virtual_hyperscript = __commonJS({
  "node_modules/virtual-dom/virtual-hyperscript/index.js"(exports, module) {
    "use strict";
    var isArray = require_x_is_array();
    var VNode = require_vnode();
    var VText = require_vtext();
    var isVNode = require_is_vnode();
    var isVText = require_is_vtext();
    var isWidget = require_is_widget();
    var isHook = require_is_vhook();
    var isVThunk = require_is_thunk();
    var parseTag = require_parse_tag();
    var softSetHook = require_soft_set_hook();
    var evHook = require_ev_hook();
    module.exports = h4;
    function h4(tagName, properties, children) {
      var childNodes = [];
      var tag, props, key, namespace;
      if (!children && isChildren(properties)) {
        children = properties;
        props = {};
      }
      props = props || properties || {};
      tag = parseTag(tagName, props);
      if (props.hasOwnProperty("key")) {
        key = props.key;
        props.key = void 0;
      }
      if (props.hasOwnProperty("namespace")) {
        namespace = props.namespace;
        props.namespace = void 0;
      }
      if (tag === "INPUT" && !namespace && props.hasOwnProperty("value") && props.value !== void 0 && !isHook(props.value)) {
        props.value = softSetHook(props.value);
      }
      transformProperties(props);
      if (children !== void 0 && children !== null) {
        addChild(children, childNodes, tag, props);
      }
      return new VNode(tag, props, childNodes, key, namespace);
    }
    __name(h4, "h");
    function addChild(c, childNodes, tag, props) {
      if (typeof c === "string") {
        childNodes.push(new VText(c));
      } else if (typeof c === "number") {
        childNodes.push(new VText(String(c)));
      } else if (isChild(c)) {
        childNodes.push(c);
      } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
          addChild(c[i], childNodes, tag, props);
        }
      } else if (c === null || c === void 0) {
        return;
      } else {
        throw UnexpectedVirtualElement({
          foreignObject: c,
          parentVnode: {
            tagName: tag,
            properties: props
          }
        });
      }
    }
    __name(addChild, "addChild");
    function transformProperties(props) {
      for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
          var value = props[propName];
          if (isHook(value)) {
            continue;
          }
          if (propName.substr(0, 3) === "ev-") {
            props[propName] = evHook(value);
          }
        }
      }
    }
    __name(transformProperties, "transformProperties");
    function isChild(x2) {
      return isVNode(x2) || isVText(x2) || isWidget(x2) || isVThunk(x2);
    }
    __name(isChild, "isChild");
    function isChildren(x2) {
      return typeof x2 === "string" || isArray(x2) || isChild(x2);
    }
    __name(isChildren, "isChildren");
    function UnexpectedVirtualElement(data) {
      var err = new Error();
      err.type = "virtual-hyperscript.unexpected.virtual-element";
      err.message = "Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / VWidget / string but:\ngot:\n" + errorString(data.foreignObject) + ".\nThe parent vnode is:\n" + errorString(data.parentVnode);
      "\nSuggested fix: change your `h(..., [ ... ])` callsite.";
      err.foreignObject = data.foreignObject;
      err.parentVnode = data.parentVnode;
      return err;
    }
    __name(UnexpectedVirtualElement, "UnexpectedVirtualElement");
    function errorString(obj) {
      try {
        return JSON.stringify(obj, null, "    ");
      } catch (e) {
        return String(obj);
      }
    }
    __name(errorString, "errorString");
  }
});

// node_modules/virtual-dom/h.js
var require_h = __commonJS({
  "node_modules/virtual-dom/h.js"(exports, module) {
    var h4 = require_virtual_hyperscript();
    module.exports = h4;
  }
});

// node_modules/virtual-dom/create-element.js
var require_create_element2 = __commonJS({
  "node_modules/virtual-dom/create-element.js"(exports, module) {
    var createElement = require_create_element();
    module.exports = createElement;
  }
});

// node_modules/virtual-dom/index.js
var require_virtual_dom = __commonJS({
  "node_modules/virtual-dom/index.js"(exports, module) {
    var diff = require_diff2();
    var patch = require_patch2();
    var h4 = require_h();
    var create2 = require_create_element2();
    var VNode = require_vnode();
    var VText = require_vtext();
    module.exports = {
      diff,
      patch,
      h: h4,
      create: create2,
      VNode,
      VText
    };
  }
});

// client/components/virtual-scroll/virtual-scroll.styl
var virtual_scroll_default;
var init_virtual_scroll = __esm({
  "client/components/virtual-scroll/virtual-scroll.styl"() {
    virtual_scroll_default = ``;
  }
});

// client/components/virtual-scroll/virtual-scroll.js
var import_virtual_dom, VirtualScrollWidget, VirtualScroll;
var init_virtual_scroll2 = __esm({
  "client/components/virtual-scroll/virtual-scroll.js"() {
    init_facade();
    import_virtual_dom = __toModule(require_virtual_dom());
    init_virtual_scroll();
    VirtualScrollWidget = class {
      constructor(list) {
        this.type = "Widget";
        this.list = list;
      }
      init() {
        console.log(1, this.list.assignedElements()?.[0]?.children);
        return this.list;
      }
      update(prev, node) {
        console.log(2, { prev, node }, this.list.assignedElements(), this.list.assignedNodes());
        return this.init();
      }
      destroy() {
      }
    };
    __name(VirtualScrollWidget, "VirtualScrollWidget");
    VirtualScroll = class extends z {
      created() {
        const observer = new MutationObserver(() => {
          this.render();
        });
        observer.observe(this, {
          characterData: true,
          attributes: true,
          childList: true,
          subtree: true
        });
      }
      connected() {
        this.render();
      }
      getSlot() {
        return this.shadowRoot.querySelector("slot");
      }
    };
    __name(VirtualScroll, "VirtualScroll");
    VirtualScroll = __decorateClass([
      Me("ss"),
      $e(function() {
        return [new VirtualScrollWidget(this.getSlot() || (0, import_virtual_dom.create)((0, import_virtual_dom.h)("slot")))];
      }),
      Re(virtual_scroll_default)
    ], VirtualScroll);
  }
});

// ../facade-builder/runtimes/pug/pug.js
function arrayIterator(array, callback) {
  for (let i = 0, l2 = array.length; i < l2; ++i) {
    callback(array[i], i);
  }
}
function IterableIterator(iterator, callback) {
  let index = 0;
  for (const item of iterator) {
    if (Array.isArray(item)) {
      callback(item[0], item[1]);
    } else {
      callback(item, index++);
    }
  }
}
function objectIterator(object, callback) {
  const keys = Object.keys(object);
  for (let i = 0, l2 = keys.length; i < l2; ++i) {
    callback(object[keys[i]], keys[i]);
  }
}
var slice, PugRuntime;
var init_pug = __esm({
  "../facade-builder/runtimes/pug/pug.js"() {
    slice = Array.call.bind(Array.prototype.slice);
    __name(arrayIterator, "arrayIterator");
    __name(IterableIterator, "IterableIterator");
    __name(objectIterator, "objectIterator");
    PugRuntime = class {
      init() {
        return this.create();
      }
      create(tagName) {
        return {
          tagName,
          children: []
        };
      }
      child(parent, node) {
        if (!parent.children)
          debugger;
        parent.children.push(node);
      }
      events(context, value) {
        return value;
      }
      element(properties) {
        return properties;
      }
      hooks(target, source) {
        return Object.assign(target, source);
      }
      handles(value, context, name) {
        value.handle = [context, name];
      }
      props(target, source) {
        return Object.assign(target, source);
      }
      text(text) {
        return text != null ? text + "" : "";
      }
      attrs(target, attrs) {
        target.attributes || (target.attributes = {});
        if (attrs.class) {
          attrs.class = this.attr(attrs.class);
        }
        for (const attr in attrs) {
          if (attrs[attr] === false || attrs[attr] == null)
            continue;
          target.attributes[attr] = attrs[attr] + "";
        }
      }
      attr(value) {
        if (!value)
          return "";
        if (Array.isArray(value))
          return value.map(this.attr, this).join(" ");
        if (typeof value === "object") {
          const result = [];
          for (const key in value) {
            if (value[key]) {
              result.push(key);
            }
          }
          return result.join(" ");
        }
        return value + "";
      }
      mixin(context, node, ...props) {
        node.properties = Object.assign({}, node.properties, ...props);
        const nodes = node.tagName.apply(node);
        for (const child of nodes) {
          this.child(context, child);
        }
      }
      each(iterable, callback) {
        if (!iterable)
          return;
        if (Array.isArray(iterable)) {
          return arrayIterator(iterable, callback);
        } else if (Symbol.iterable in iterable) {
          return IterableIterator(iterable, callback);
        } else if ("length" in iterable) {
          return arrayIterator(slice(iterable), callback);
        } else {
          return objectIterator(iterable, callback);
        }
      }
      end(result) {
        return result.children;
      }
    };
    __name(PugRuntime, "PugRuntime");
  }
});

// ../facade-builder/node_modules/x-is-array/index.js
var require_x_is_array2 = __commonJS({
  "../facade-builder/node_modules/x-is-array/index.js"(exports, module) {
    var nativeIsArray = Array.isArray;
    var toString = Object.prototype.toString;
    module.exports = nativeIsArray || isArray;
    function isArray(obj) {
      return toString.call(obj) === "[object Array]";
    }
    __name(isArray, "isArray");
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/version.js
var require_version2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/version.js"(exports, module) {
    module.exports = "2";
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/vpatch.js
var require_vpatch2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/vpatch.js"(exports, module) {
    var version = require_version2();
    VirtualPatch.NONE = 0;
    VirtualPatch.VTEXT = 1;
    VirtualPatch.VNODE = 2;
    VirtualPatch.WIDGET = 3;
    VirtualPatch.PROPS = 4;
    VirtualPatch.ORDER = 5;
    VirtualPatch.INSERT = 6;
    VirtualPatch.REMOVE = 7;
    VirtualPatch.THUNK = 8;
    module.exports = VirtualPatch;
    function VirtualPatch(type, vNode, patch) {
      this.type = Number(type);
      this.vNode = vNode;
      this.patch = patch;
    }
    __name(VirtualPatch, "VirtualPatch");
    VirtualPatch.prototype.version = version;
    VirtualPatch.prototype.type = "VirtualPatch";
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/is-vnode.js
var require_is_vnode2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/is-vnode.js"(exports, module) {
    var version = require_version2();
    module.exports = isVirtualNode;
    function isVirtualNode(x2) {
      return x2 && x2.type === "VirtualNode" && x2.version === version;
    }
    __name(isVirtualNode, "isVirtualNode");
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/is-vtext.js
var require_is_vtext2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/is-vtext.js"(exports, module) {
    var version = require_version2();
    module.exports = isVirtualText;
    function isVirtualText(x2) {
      return x2 && x2.type === "VirtualText" && x2.version === version;
    }
    __name(isVirtualText, "isVirtualText");
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/is-widget.js
var require_is_widget2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/is-widget.js"(exports, module) {
    module.exports = isWidget;
    function isWidget(w2) {
      return w2 && w2.type === "Widget";
    }
    __name(isWidget, "isWidget");
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/is-thunk.js
var require_is_thunk2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/is-thunk.js"(exports, module) {
    module.exports = isThunk;
    function isThunk(t) {
      return t && t.type === "Thunk";
    }
    __name(isThunk, "isThunk");
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/handle-thunk.js
var require_handle_thunk2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/handle-thunk.js"(exports, module) {
    var isVNode = require_is_vnode2();
    var isVText = require_is_vtext2();
    var isWidget = require_is_widget2();
    var isThunk = require_is_thunk2();
    module.exports = handleThunk;
    function handleThunk(a, b) {
      var renderedA = a;
      var renderedB = b;
      if (isThunk(b)) {
        renderedB = renderThunk(b, a);
      }
      if (isThunk(a)) {
        renderedA = renderThunk(a, null);
      }
      return {
        a: renderedA,
        b: renderedB
      };
    }
    __name(handleThunk, "handleThunk");
    function renderThunk(thunk, previous) {
      var renderedThunk = thunk.vnode;
      if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous);
      }
      if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
      }
      return renderedThunk;
    }
    __name(renderThunk, "renderThunk");
  }
});

// ../facade-builder/node_modules/is-object/index.js
var require_is_object2 = __commonJS({
  "../facade-builder/node_modules/is-object/index.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ __name(function isObject(x2) {
      return typeof x2 === "object" && x2 !== null;
    }, "isObject");
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/is-vhook.js
var require_is_vhook2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/is-vhook.js"(exports, module) {
    module.exports = isHook;
    function isHook(hook) {
      return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
    }
    __name(isHook, "isHook");
  }
});

// ../facade-builder/node_modules/virtual-dom/vtree/diff-props.js
var require_diff_props2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vtree/diff-props.js"(exports, module) {
    var isObject = require_is_object2();
    var isHook = require_is_vhook2();
    module.exports = diffProps;
    function diffProps(a, b) {
      var diff;
      for (var aKey in a) {
        if (!(aKey in b)) {
          diff = diff || {};
          diff[aKey] = void 0;
        }
        var aValue = a[aKey];
        var bValue = b[aKey];
        if (aValue === bValue) {
          continue;
        } else if (isObject(aValue) && isObject(bValue)) {
          if (getPrototype(bValue) !== getPrototype(aValue)) {
            diff = diff || {};
            diff[aKey] = bValue;
          } else if (isHook(bValue)) {
            diff = diff || {};
            diff[aKey] = bValue;
          } else {
            var objectDiff = diffProps(aValue, bValue);
            if (objectDiff) {
              diff = diff || {};
              diff[aKey] = objectDiff;
            }
          }
        } else {
          diff = diff || {};
          diff[aKey] = bValue;
        }
      }
      for (var bKey in b) {
        if (!(bKey in a)) {
          diff = diff || {};
          diff[bKey] = b[bKey];
        }
      }
      return diff;
    }
    __name(diffProps, "diffProps");
    function getPrototype(value) {
      if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
      } else if (value.__proto__) {
        return value.__proto__;
      } else if (value.constructor) {
        return value.constructor.prototype;
      }
    }
    __name(getPrototype, "getPrototype");
  }
});

// ../facade-builder/node_modules/virtual-dom/vtree/diff.js
var require_diff3 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vtree/diff.js"(exports, module) {
    var isArray = require_x_is_array2();
    var VPatch = require_vpatch2();
    var isVNode = require_is_vnode2();
    var isVText = require_is_vtext2();
    var isWidget = require_is_widget2();
    var isThunk = require_is_thunk2();
    var handleThunk = require_handle_thunk2();
    var diffProps = require_diff_props2();
    module.exports = diff;
    function diff(a, b) {
      var patch = { a };
      walk(a, b, patch, 0);
      return patch;
    }
    __name(diff, "diff");
    function walk(a, b, patch, index) {
      if (a === b) {
        return;
      }
      var apply = patch[index];
      var applyClear = false;
      if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index);
      } else if (b == null) {
        if (!isWidget(a)) {
          clearState(a, patch, index);
          apply = patch[index];
        }
        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
      } else if (isVNode(b)) {
        if (isVNode(a)) {
          if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
            var propsPatch = diffProps(a.properties, b.properties);
            if (propsPatch) {
              apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
            }
            apply = diffChildren(a, b, patch, apply, index);
          } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
            applyClear = true;
          }
        } else {
          apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
          applyClear = true;
        }
      } else if (isVText(b)) {
        if (!isVText(a)) {
          apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
          applyClear = true;
        } else if (a.text !== b.text) {
          apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
        }
      } else if (isWidget(b)) {
        if (!isWidget(a)) {
          applyClear = true;
        }
        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
      }
      if (apply) {
        patch[index] = apply;
      }
      if (applyClear) {
        clearState(a, patch, index);
      }
    }
    __name(walk, "walk");
    function diffChildren(a, b, patch, apply, index) {
      var aChildren = a.children;
      var orderedSet = reorder(aChildren, b.children);
      var bChildren = orderedSet.children;
      var aLen = aChildren.length;
      var bLen = bChildren.length;
      var len = aLen > bLen ? aLen : bLen;
      for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i];
        var rightNode = bChildren[i];
        index += 1;
        if (!leftNode) {
          if (rightNode) {
            apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
          }
        } else {
          walk(leftNode, rightNode, patch, index);
        }
        if (isVNode(leftNode) && leftNode.count) {
          index += leftNode.count;
        }
      }
      if (orderedSet.moves) {
        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
      }
      return apply;
    }
    __name(diffChildren, "diffChildren");
    function clearState(vNode, patch, index) {
      unhook(vNode, patch, index);
      destroyWidgets(vNode, patch, index);
    }
    __name(clearState, "clearState");
    function destroyWidgets(vNode, patch, index) {
      if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
          patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
        }
      } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children;
        var len = children.length;
        for (var i = 0; i < len; i++) {
          var child = children[i];
          index += 1;
          destroyWidgets(child, patch, index);
          if (isVNode(child) && child.count) {
            index += child.count;
          }
        }
      } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
      }
    }
    __name(destroyWidgets, "destroyWidgets");
    function thunks(a, b, patch, index) {
      var nodes = handleThunk(a, b);
      var thunkPatch = diff(nodes.a, nodes.b);
      if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
      }
    }
    __name(thunks, "thunks");
    function hasPatches(patch) {
      for (var index in patch) {
        if (index !== "a") {
          return true;
        }
      }
      return false;
    }
    __name(hasPatches, "hasPatches");
    function unhook(vNode, patch, index) {
      if (isVNode(vNode)) {
        if (vNode.hooks) {
          patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
        }
        if (vNode.descendantHooks || vNode.hasThunks) {
          var children = vNode.children;
          var len = children.length;
          for (var i = 0; i < len; i++) {
            var child = children[i];
            index += 1;
            unhook(child, patch, index);
            if (isVNode(child) && child.count) {
              index += child.count;
            }
          }
        }
      } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
      }
    }
    __name(unhook, "unhook");
    function undefinedKeys(obj) {
      var result = {};
      for (var key in obj) {
        result[key] = void 0;
      }
      return result;
    }
    __name(undefinedKeys, "undefinedKeys");
    function reorder(aChildren, bChildren) {
      var bChildIndex = keyIndex(bChildren);
      var bKeys = bChildIndex.keys;
      var bFree = bChildIndex.free;
      if (bFree.length === bChildren.length) {
        return {
          children: bChildren,
          moves: null
        };
      }
      var aChildIndex = keyIndex(aChildren);
      var aKeys = aChildIndex.keys;
      var aFree = aChildIndex.free;
      if (aFree.length === aChildren.length) {
        return {
          children: bChildren,
          moves: null
        };
      }
      var newChildren = [];
      var freeIndex = 0;
      var freeCount = bFree.length;
      var deletedItems = 0;
      for (var i = 0; i < aChildren.length; i++) {
        var aItem = aChildren[i];
        var itemIndex;
        if (aItem.key) {
          if (bKeys.hasOwnProperty(aItem.key)) {
            itemIndex = bKeys[aItem.key];
            newChildren.push(bChildren[itemIndex]);
          } else {
            itemIndex = i - deletedItems++;
            newChildren.push(null);
          }
        } else {
          if (freeIndex < freeCount) {
            itemIndex = bFree[freeIndex++];
            newChildren.push(bChildren[itemIndex]);
          } else {
            itemIndex = i - deletedItems++;
            newChildren.push(null);
          }
        }
      }
      var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
      for (var j3 = 0; j3 < bChildren.length; j3++) {
        var newItem = bChildren[j3];
        if (newItem.key) {
          if (!aKeys.hasOwnProperty(newItem.key)) {
            newChildren.push(newItem);
          }
        } else if (j3 >= lastFreeIndex) {
          newChildren.push(newItem);
        }
      }
      var simulate = newChildren.slice();
      var simulateIndex = 0;
      var removes = [];
      var inserts = [];
      var simulateItem;
      for (var k2 = 0; k2 < bChildren.length; ) {
        var wantedItem = bChildren[k2];
        simulateItem = simulate[simulateIndex];
        while (simulateItem === null && simulate.length) {
          removes.push(remove(simulate, simulateIndex, null));
          simulateItem = simulate[simulateIndex];
        }
        if (!simulateItem || simulateItem.key !== wantedItem.key) {
          if (wantedItem.key) {
            if (simulateItem && simulateItem.key) {
              if (bKeys[simulateItem.key] !== k2 + 1) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key));
                simulateItem = simulate[simulateIndex];
                if (!simulateItem || simulateItem.key !== wantedItem.key) {
                  inserts.push({ key: wantedItem.key, to: k2 });
                } else {
                  simulateIndex++;
                }
              } else {
                inserts.push({ key: wantedItem.key, to: k2 });
              }
            } else {
              inserts.push({ key: wantedItem.key, to: k2 });
            }
            k2++;
          } else if (simulateItem && simulateItem.key) {
            removes.push(remove(simulate, simulateIndex, simulateItem.key));
          }
        } else {
          simulateIndex++;
          k2++;
        }
      }
      while (simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex];
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
      }
      if (removes.length === deletedItems && !inserts.length) {
        return {
          children: newChildren,
          moves: null
        };
      }
      return {
        children: newChildren,
        moves: {
          removes,
          inserts
        }
      };
    }
    __name(reorder, "reorder");
    function remove(arr, index, key) {
      arr.splice(index, 1);
      return {
        from: index,
        key
      };
    }
    __name(remove, "remove");
    function keyIndex(children) {
      var keys = {};
      var free = [];
      var length = children.length;
      for (var i = 0; i < length; i++) {
        var child = children[i];
        if (child.key) {
          keys[child.key] = i;
        } else {
          free.push(i);
        }
      }
      return {
        keys,
        free
      };
    }
    __name(keyIndex, "keyIndex");
    function appendPatch(apply, patch) {
      if (apply) {
        if (isArray(apply)) {
          apply.push(patch);
        } else {
          apply = [apply, patch];
        }
        return apply;
      } else {
        return patch;
      }
    }
    __name(appendPatch, "appendPatch");
  }
});

// ../facade-builder/node_modules/virtual-dom/diff.js
var require_diff4 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/diff.js"(exports, module) {
    var diff = require_diff3();
    module.exports = diff;
  }
});

// (disabled):../facade-builder/node_modules/min-document/index.js
var require_min_document2 = __commonJS({
  "(disabled):../facade-builder/node_modules/min-document/index.js"() {
  }
});

// ../facade-builder/node_modules/global/document.js
var require_document2 = __commonJS({
  "../facade-builder/node_modules/global/document.js"(exports, module) {
    var topLevel = typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : {};
    var minDoc = require_min_document2();
    var doccy;
    if (typeof document !== "undefined") {
      doccy = document;
    } else {
      doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
      if (!doccy) {
        doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
      }
    }
    module.exports = doccy;
  }
});

// ../facade-builder/node_modules/virtual-dom/vdom/apply-properties.js
var require_apply_properties2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vdom/apply-properties.js"(exports, module) {
    var isObject = require_is_object2();
    var isHook = require_is_vhook2();
    module.exports = applyProperties;
    function applyProperties(node, props, previous) {
      for (var propName in props) {
        var propValue = props[propName];
        if (propValue === void 0) {
          removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
          removeProperty(node, propName, propValue, previous);
          if (propValue.hook) {
            propValue.hook(node, propName, previous ? previous[propName] : void 0);
          }
        } else {
          if (isObject(propValue)) {
            patchObject(node, props, previous, propName, propValue);
          } else {
            node[propName] = propValue;
          }
        }
      }
    }
    __name(applyProperties, "applyProperties");
    function removeProperty(node, propName, propValue, previous) {
      if (previous) {
        var previousValue = previous[propName];
        if (!isHook(previousValue)) {
          if (propName === "attributes") {
            for (var attrName in previousValue) {
              node.removeAttribute(attrName);
            }
          } else if (propName === "style") {
            for (var i in previousValue) {
              node.style[i] = "";
            }
          } else if (typeof previousValue === "string") {
            node[propName] = "";
          } else {
            node[propName] = null;
          }
        } else if (previousValue.unhook) {
          previousValue.unhook(node, propName, propValue);
        }
      }
    }
    __name(removeProperty, "removeProperty");
    function patchObject(node, props, previous, propName, propValue) {
      var previousValue = previous ? previous[propName] : void 0;
      if (propName === "attributes") {
        for (var attrName in propValue) {
          var attrValue = propValue[attrName];
          if (attrValue === void 0) {
            node.removeAttribute(attrName);
          } else {
            node.setAttribute(attrName, attrValue);
          }
        }
        return;
      }
      if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue;
        return;
      }
      if (!isObject(node[propName])) {
        node[propName] = {};
      }
      var replacer = propName === "style" ? "" : void 0;
      for (var k2 in propValue) {
        var value = propValue[k2];
        node[propName][k2] = value === void 0 ? replacer : value;
      }
    }
    __name(patchObject, "patchObject");
    function getPrototype(value) {
      if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
      } else if (value.__proto__) {
        return value.__proto__;
      } else if (value.constructor) {
        return value.constructor.prototype;
      }
    }
    __name(getPrototype, "getPrototype");
  }
});

// ../facade-builder/node_modules/virtual-dom/vdom/create-element.js
var require_create_element3 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vdom/create-element.js"(exports, module) {
    var document2 = require_document2();
    var applyProperties = require_apply_properties2();
    var isVNode = require_is_vnode2();
    var isVText = require_is_vtext2();
    var isWidget = require_is_widget2();
    var handleThunk = require_handle_thunk2();
    module.exports = createElement;
    function createElement(vnode, opts) {
      var doc = opts ? opts.document || document2 : document2;
      var warn = opts ? opts.warn : null;
      vnode = handleThunk(vnode).a;
      if (isWidget(vnode)) {
        return vnode.init();
      } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text);
      } else if (!isVNode(vnode)) {
        if (warn) {
          warn("Item is not a valid virtual dom node", vnode);
        }
        return null;
      }
      var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
      var props = vnode.properties;
      applyProperties(node, props);
      var children = vnode.children;
      for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts);
        if (childNode) {
          node.appendChild(childNode);
        }
      }
      return node;
    }
    __name(createElement, "createElement");
  }
});

// ../facade-builder/node_modules/virtual-dom/vdom/dom-index.js
var require_dom_index2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vdom/dom-index.js"(exports, module) {
    var noChild = {};
    module.exports = domIndex;
    function domIndex(rootNode, tree, indices, nodes) {
      if (!indices || indices.length === 0) {
        return {};
      } else {
        indices.sort(ascending);
        return recurse(rootNode, tree, indices, nodes, 0);
      }
    }
    __name(domIndex, "domIndex");
    function recurse(rootNode, tree, indices, nodes, rootIndex) {
      nodes = nodes || {};
      if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
          nodes[rootIndex] = rootNode;
        }
        var vChildren = tree.children;
        if (vChildren) {
          var childNodes = rootNode.childNodes;
          for (var i = 0; i < tree.children.length; i++) {
            rootIndex += 1;
            var vChild = vChildren[i] || noChild;
            var nextIndex = rootIndex + (vChild.count || 0);
            if (indexInRange(indices, rootIndex, nextIndex)) {
              recurse(childNodes[i], vChild, indices, nodes, rootIndex);
            }
            rootIndex = nextIndex;
          }
        }
      }
      return nodes;
    }
    __name(recurse, "recurse");
    function indexInRange(indices, left, right) {
      if (indices.length === 0) {
        return false;
      }
      var minIndex = 0;
      var maxIndex = indices.length - 1;
      var currentIndex;
      var currentItem;
      while (minIndex <= maxIndex) {
        currentIndex = (maxIndex + minIndex) / 2 >> 0;
        currentItem = indices[currentIndex];
        if (minIndex === maxIndex) {
          return currentItem >= left && currentItem <= right;
        } else if (currentItem < left) {
          minIndex = currentIndex + 1;
        } else if (currentItem > right) {
          maxIndex = currentIndex - 1;
        } else {
          return true;
        }
      }
      return false;
    }
    __name(indexInRange, "indexInRange");
    function ascending(a, b) {
      return a > b ? 1 : -1;
    }
    __name(ascending, "ascending");
  }
});

// ../facade-builder/node_modules/virtual-dom/vdom/update-widget.js
var require_update_widget2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vdom/update-widget.js"(exports, module) {
    var isWidget = require_is_widget2();
    module.exports = updateWidget;
    function updateWidget(a, b) {
      if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
          return a.id === b.id;
        } else {
          return a.init === b.init;
        }
      }
      return false;
    }
    __name(updateWidget, "updateWidget");
  }
});

// ../facade-builder/node_modules/virtual-dom/vdom/patch-op.js
var require_patch_op2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vdom/patch-op.js"(exports, module) {
    var applyProperties = require_apply_properties2();
    var isWidget = require_is_widget2();
    var VPatch = require_vpatch2();
    var updateWidget = require_update_widget2();
    module.exports = applyPatch;
    function applyPatch(vpatch, domNode, renderOptions) {
      var type = vpatch.type;
      var vNode = vpatch.vNode;
      var patch = vpatch.patch;
      switch (type) {
        case VPatch.REMOVE:
          return removeNode(domNode, vNode);
        case VPatch.INSERT:
          return insertNode(domNode, patch, renderOptions);
        case VPatch.VTEXT:
          return stringPatch(domNode, vNode, patch, renderOptions);
        case VPatch.WIDGET:
          return widgetPatch(domNode, vNode, patch, renderOptions);
        case VPatch.VNODE:
          return vNodePatch(domNode, vNode, patch, renderOptions);
        case VPatch.ORDER:
          reorderChildren(domNode, patch);
          return domNode;
        case VPatch.PROPS:
          applyProperties(domNode, patch, vNode.properties);
          return domNode;
        case VPatch.THUNK:
          return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
        default:
          return domNode;
      }
    }
    __name(applyPatch, "applyPatch");
    function removeNode(domNode, vNode) {
      var parentNode = domNode.parentNode;
      if (parentNode) {
        parentNode.removeChild(domNode);
      }
      destroyWidget(domNode, vNode);
      return null;
    }
    __name(removeNode, "removeNode");
    function insertNode(parentNode, vNode, renderOptions) {
      var newNode = renderOptions.render(vNode, renderOptions);
      if (parentNode) {
        parentNode.appendChild(newNode);
      }
      return parentNode;
    }
    __name(insertNode, "insertNode");
    function stringPatch(domNode, leftVNode, vText, renderOptions) {
      var newNode;
      if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text);
        newNode = domNode;
      } else {
        var parentNode = domNode.parentNode;
        newNode = renderOptions.render(vText, renderOptions);
        if (parentNode && newNode !== domNode) {
          parentNode.replaceChild(newNode, domNode);
        }
      }
      return newNode;
    }
    __name(stringPatch, "stringPatch");
    function widgetPatch(domNode, leftVNode, widget, renderOptions) {
      var updating = updateWidget(leftVNode, widget);
      var newNode;
      if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode;
      } else {
        newNode = renderOptions.render(widget, renderOptions);
      }
      var parentNode = domNode.parentNode;
      if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
      }
      if (!updating) {
        destroyWidget(domNode, leftVNode);
      }
      return newNode;
    }
    __name(widgetPatch, "widgetPatch");
    function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
      var parentNode = domNode.parentNode;
      var newNode = renderOptions.render(vNode, renderOptions);
      if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
      }
      return newNode;
    }
    __name(vNodePatch, "vNodePatch");
    function destroyWidget(domNode, w2) {
      if (typeof w2.destroy === "function" && isWidget(w2)) {
        w2.destroy(domNode);
      }
    }
    __name(destroyWidget, "destroyWidget");
    function reorderChildren(domNode, moves) {
      var childNodes = domNode.childNodes;
      var keyMap = {};
      var node;
      var remove;
      var insert;
      for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i];
        node = childNodes[remove.from];
        if (remove.key) {
          keyMap[remove.key] = node;
        }
        domNode.removeChild(node);
      }
      var length = childNodes.length;
      for (var j3 = 0; j3 < moves.inserts.length; j3++) {
        insert = moves.inserts[j3];
        node = keyMap[insert.key];
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
      }
    }
    __name(reorderChildren, "reorderChildren");
    function replaceRoot(oldRoot, newRoot) {
      if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot);
      }
      return newRoot;
    }
    __name(replaceRoot, "replaceRoot");
  }
});

// ../facade-builder/node_modules/virtual-dom/vdom/patch.js
var require_patch3 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vdom/patch.js"(exports, module) {
    var document2 = require_document2();
    var isArray = require_x_is_array2();
    var render = require_create_element3();
    var domIndex = require_dom_index2();
    var patchOp = require_patch_op2();
    module.exports = patch;
    function patch(rootNode, patches, renderOptions) {
      renderOptions = renderOptions || {};
      renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
      renderOptions.render = renderOptions.render || render;
      return renderOptions.patch(rootNode, patches, renderOptions);
    }
    __name(patch, "patch");
    function patchRecursive(rootNode, patches, renderOptions) {
      var indices = patchIndices(patches);
      if (indices.length === 0) {
        return rootNode;
      }
      var index = domIndex(rootNode, patches.a, indices);
      var ownerDocument = rootNode.ownerDocument;
      if (!renderOptions.document && ownerDocument !== document2) {
        renderOptions.document = ownerDocument;
      }
      for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i];
        rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
      }
      return rootNode;
    }
    __name(patchRecursive, "patchRecursive");
    function applyPatch(rootNode, domNode, patchList, renderOptions) {
      if (!domNode) {
        return rootNode;
      }
      var newNode;
      if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
          newNode = patchOp(patchList[i], domNode, renderOptions);
          if (domNode === rootNode) {
            rootNode = newNode;
          }
        }
      } else {
        newNode = patchOp(patchList, domNode, renderOptions);
        if (domNode === rootNode) {
          rootNode = newNode;
        }
      }
      return rootNode;
    }
    __name(applyPatch, "applyPatch");
    function patchIndices(patches) {
      var indices = [];
      for (var key in patches) {
        if (key !== "a") {
          indices.push(Number(key));
        }
      }
      return indices;
    }
    __name(patchIndices, "patchIndices");
  }
});

// ../facade-builder/node_modules/virtual-dom/patch.js
var require_patch4 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/patch.js"(exports, module) {
    var patch = require_patch3();
    module.exports = patch;
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/vnode.js
var require_vnode2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/vnode.js"(exports, module) {
    var version = require_version2();
    var isVNode = require_is_vnode2();
    var isWidget = require_is_widget2();
    var isThunk = require_is_thunk2();
    var isVHook = require_is_vhook2();
    module.exports = VirtualNode;
    var noProperties = {};
    var noChildren = [];
    function VirtualNode(tagName, properties, children, key, namespace) {
      this.tagName = tagName;
      this.properties = properties || noProperties;
      this.children = children || noChildren;
      this.key = key != null ? String(key) : void 0;
      this.namespace = typeof namespace === "string" ? namespace : null;
      var count = children && children.length || 0;
      var descendants = 0;
      var hasWidgets = false;
      var hasThunks = false;
      var descendantHooks = false;
      var hooks;
      for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
          var property = properties[propName];
          if (isVHook(property) && property.unhook) {
            if (!hooks) {
              hooks = {};
            }
            hooks[propName] = property;
          }
        }
      }
      for (var i = 0; i < count; i++) {
        var child = children[i];
        if (isVNode(child)) {
          descendants += child.count || 0;
          if (!hasWidgets && child.hasWidgets) {
            hasWidgets = true;
          }
          if (!hasThunks && child.hasThunks) {
            hasThunks = true;
          }
          if (!descendantHooks && (child.hooks || child.descendantHooks)) {
            descendantHooks = true;
          }
        } else if (!hasWidgets && isWidget(child)) {
          if (typeof child.destroy === "function") {
            hasWidgets = true;
          }
        } else if (!hasThunks && isThunk(child)) {
          hasThunks = true;
        }
      }
      this.count = count + descendants;
      this.hasWidgets = hasWidgets;
      this.hasThunks = hasThunks;
      this.hooks = hooks;
      this.descendantHooks = descendantHooks;
    }
    __name(VirtualNode, "VirtualNode");
    VirtualNode.prototype.version = version;
    VirtualNode.prototype.type = "VirtualNode";
  }
});

// ../facade-builder/node_modules/virtual-dom/vnode/vtext.js
var require_vtext2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/vnode/vtext.js"(exports, module) {
    var version = require_version2();
    module.exports = VirtualText;
    function VirtualText(text) {
      this.text = String(text);
    }
    __name(VirtualText, "VirtualText");
    VirtualText.prototype.version = version;
    VirtualText.prototype.type = "VirtualText";
  }
});

// ../facade-builder/node_modules/browser-split/index.js
var require_browser_split2 = __commonJS({
  "../facade-builder/node_modules/browser-split/index.js"(exports, module) {
    module.exports = (/* @__PURE__ */ __name(function split(undef) {
      var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, self;
      self = /* @__PURE__ */ __name(function(str, separator, limit) {
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
          return nativeSplit.call(str, separator, limit);
        }
        var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0, separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
        str += "";
        if (!compliantExecNpcg) {
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        limit = limit === undef ? -1 >>> 0 : limit >>> 0;
        while (match = separator.exec(str)) {
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function() {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undef) {
                    match[i] = undef;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < str.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++;
          }
        }
        if (lastLastIndex === str.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      }, "self");
      return self;
    }, "split"))();
  }
});

// ../facade-builder/node_modules/virtual-dom/virtual-hyperscript/parse-tag.js
var require_parse_tag2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/virtual-hyperscript/parse-tag.js"(exports, module) {
    "use strict";
    var split = require_browser_split2();
    var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
    var notClassId = /^\.|#/;
    module.exports = parseTag;
    function parseTag(tag, props) {
      if (!tag) {
        return "DIV";
      }
      var noId = !props.hasOwnProperty("id");
      var tagParts = split(tag, classIdSplit);
      var tagName = null;
      if (notClassId.test(tagParts[1])) {
        tagName = "DIV";
      }
      var classes, part, type, i;
      for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];
        if (!part) {
          continue;
        }
        type = part.charAt(0);
        if (!tagName) {
          tagName = part;
        } else if (type === ".") {
          classes = classes || [];
          classes.push(part.substring(1, part.length));
        } else if (type === "#" && noId) {
          props.id = part.substring(1, part.length);
        }
      }
      if (classes) {
        if (props.className) {
          classes.push(props.className);
        }
        props.className = classes.join(" ");
      }
      return props.namespace ? tagName : tagName.toUpperCase();
    }
    __name(parseTag, "parseTag");
  }
});

// ../facade-builder/node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js
var require_soft_set_hook2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js"(exports, module) {
    "use strict";
    module.exports = SoftSetHook;
    function SoftSetHook(value) {
      if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
      }
      this.value = value;
    }
    __name(SoftSetHook, "SoftSetHook");
    SoftSetHook.prototype.hook = function(node, propertyName) {
      if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
      }
    };
  }
});

// ../facade-builder/node_modules/individual/index.js
var require_individual2 = __commonJS({
  "../facade-builder/node_modules/individual/index.js"(exports, module) {
    "use strict";
    var root = typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : {};
    module.exports = Individual;
    function Individual(key, value) {
      if (key in root) {
        return root[key];
      }
      root[key] = value;
      return value;
    }
    __name(Individual, "Individual");
  }
});

// ../facade-builder/node_modules/individual/one-version.js
var require_one_version2 = __commonJS({
  "../facade-builder/node_modules/individual/one-version.js"(exports, module) {
    "use strict";
    var Individual = require_individual2();
    module.exports = OneVersion;
    function OneVersion(moduleName, version, defaultValue) {
      var key = "__INDIVIDUAL_ONE_VERSION_" + moduleName;
      var enforceKey = key + "_ENFORCE_SINGLETON";
      var versionValue = Individual(enforceKey, version);
      if (versionValue !== version) {
        throw new Error("Can only have one copy of " + moduleName + ".\nYou already have version " + versionValue + " installed.\nThis means you cannot install version " + version);
      }
      return Individual(key, defaultValue);
    }
    __name(OneVersion, "OneVersion");
  }
});

// ../facade-builder/node_modules/ev-store/index.js
var require_ev_store2 = __commonJS({
  "../facade-builder/node_modules/ev-store/index.js"(exports, module) {
    "use strict";
    var OneVersionConstraint = require_one_version2();
    var MY_VERSION = "7";
    OneVersionConstraint("ev-store", MY_VERSION);
    var hashKey = "__EV_STORE_KEY@" + MY_VERSION;
    module.exports = EvStore;
    function EvStore(elem) {
      var hash = elem[hashKey];
      if (!hash) {
        hash = elem[hashKey] = {};
      }
      return hash;
    }
    __name(EvStore, "EvStore");
  }
});

// ../facade-builder/node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js
var require_ev_hook2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js"(exports, module) {
    "use strict";
    var EvStore = require_ev_store2();
    module.exports = EvHook;
    function EvHook(value) {
      if (!(this instanceof EvHook)) {
        return new EvHook(value);
      }
      this.value = value;
    }
    __name(EvHook, "EvHook");
    EvHook.prototype.hook = function(node, propertyName) {
      var es = EvStore(node);
      var propName = propertyName.substr(3);
      es[propName] = this.value;
    };
    EvHook.prototype.unhook = function(node, propertyName) {
      var es = EvStore(node);
      var propName = propertyName.substr(3);
      es[propName] = void 0;
    };
  }
});

// ../facade-builder/node_modules/virtual-dom/virtual-hyperscript/index.js
var require_virtual_hyperscript2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/virtual-hyperscript/index.js"(exports, module) {
    "use strict";
    var isArray = require_x_is_array2();
    var VNode = require_vnode2();
    var VText = require_vtext2();
    var isVNode = require_is_vnode2();
    var isVText = require_is_vtext2();
    var isWidget = require_is_widget2();
    var isHook = require_is_vhook2();
    var isVThunk = require_is_thunk2();
    var parseTag = require_parse_tag2();
    var softSetHook = require_soft_set_hook2();
    var evHook = require_ev_hook2();
    module.exports = h4;
    function h4(tagName, properties, children) {
      var childNodes = [];
      var tag, props, key, namespace;
      if (!children && isChildren(properties)) {
        children = properties;
        props = {};
      }
      props = props || properties || {};
      tag = parseTag(tagName, props);
      if (props.hasOwnProperty("key")) {
        key = props.key;
        props.key = void 0;
      }
      if (props.hasOwnProperty("namespace")) {
        namespace = props.namespace;
        props.namespace = void 0;
      }
      if (tag === "INPUT" && !namespace && props.hasOwnProperty("value") && props.value !== void 0 && !isHook(props.value)) {
        props.value = softSetHook(props.value);
      }
      transformProperties(props);
      if (children !== void 0 && children !== null) {
        addChild(children, childNodes, tag, props);
      }
      return new VNode(tag, props, childNodes, key, namespace);
    }
    __name(h4, "h");
    function addChild(c, childNodes, tag, props) {
      if (typeof c === "string") {
        childNodes.push(new VText(c));
      } else if (typeof c === "number") {
        childNodes.push(new VText(String(c)));
      } else if (isChild(c)) {
        childNodes.push(c);
      } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
          addChild(c[i], childNodes, tag, props);
        }
      } else if (c === null || c === void 0) {
        return;
      } else {
        throw UnexpectedVirtualElement({
          foreignObject: c,
          parentVnode: {
            tagName: tag,
            properties: props
          }
        });
      }
    }
    __name(addChild, "addChild");
    function transformProperties(props) {
      for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
          var value = props[propName];
          if (isHook(value)) {
            continue;
          }
          if (propName.substr(0, 3) === "ev-") {
            props[propName] = evHook(value);
          }
        }
      }
    }
    __name(transformProperties, "transformProperties");
    function isChild(x2) {
      return isVNode(x2) || isVText(x2) || isWidget(x2) || isVThunk(x2);
    }
    __name(isChild, "isChild");
    function isChildren(x2) {
      return typeof x2 === "string" || isArray(x2) || isChild(x2);
    }
    __name(isChildren, "isChildren");
    function UnexpectedVirtualElement(data) {
      var err = new Error();
      err.type = "virtual-hyperscript.unexpected.virtual-element";
      err.message = "Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / VWidget / string but:\ngot:\n" + errorString(data.foreignObject) + ".\nThe parent vnode is:\n" + errorString(data.parentVnode);
      "\nSuggested fix: change your `h(..., [ ... ])` callsite.";
      err.foreignObject = data.foreignObject;
      err.parentVnode = data.parentVnode;
      return err;
    }
    __name(UnexpectedVirtualElement, "UnexpectedVirtualElement");
    function errorString(obj) {
      try {
        return JSON.stringify(obj, null, "    ");
      } catch (e) {
        return String(obj);
      }
    }
    __name(errorString, "errorString");
  }
});

// ../facade-builder/node_modules/virtual-dom/h.js
var require_h2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/h.js"(exports, module) {
    var h4 = require_virtual_hyperscript2();
    module.exports = h4;
  }
});

// ../facade-builder/node_modules/virtual-dom/create-element.js
var require_create_element4 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/create-element.js"(exports, module) {
    var createElement = require_create_element3();
    module.exports = createElement;
  }
});

// ../facade-builder/node_modules/virtual-dom/index.js
var require_virtual_dom2 = __commonJS({
  "../facade-builder/node_modules/virtual-dom/index.js"(exports, module) {
    var diff = require_diff4();
    var patch = require_patch4();
    var h4 = require_h2();
    var create2 = require_create_element4();
    var VNode = require_vnode2();
    var VText = require_vtext2();
    module.exports = {
      diff,
      patch,
      h: h4,
      create: create2,
      VNode,
      VText
    };
  }
});

// ../facade-builder/runtimes/pug/vdom.js
var import_virtual_dom2, EventHook, FunctionHook, PropertyHook, HandleHook, HTMLWidget, VDomRuntime, vdom_default;
var init_vdom = __esm({
  "../facade-builder/runtimes/pug/vdom.js"() {
    import_virtual_dom2 = __toModule(require_virtual_dom2());
    init_pug();
    EventHook = class {
      constructor(events) {
        this.events = events;
      }
      hook(node, prop, self) {
        const previous = self ? self.events : [];
        for (var [event, callback] of previous) {
          node.removeEventListener(event, callback);
        }
        for (var [event, callback] of this.events) {
          node.addEventListener(event, callback);
        }
      }
      unhook(node) {
        for (const [event, callback] of this.events) {
          node.removeEventListener(event, callback);
        }
      }
    };
    __name(EventHook, "EventHook");
    FunctionHook = class {
      constructor(subscribe) {
        this.subscribe = subscribe;
      }
      hook(node, propertyName, previousValue) {
        if (this.subscribe) {
          this.unsubscribe = this.subscribe(node, propertyName, previousValue);
        }
      }
      unhook() {
        if (typeof this.unsubscribe === "function") {
          this.unsubscribe();
          delete this.unsubscribe;
        }
      }
    };
    __name(FunctionHook, "FunctionHook");
    PropertyHook = class {
      constructor(value) {
        this.value = value;
      }
      hook(node, property, self) {
        const previous = self && self.value;
        if (!previous && this.value !== void 0 || node[property] !== this.value) {
          node[property] = this.value;
        }
      }
    };
    __name(PropertyHook, "PropertyHook");
    HandleHook = class {
      constructor(context, names) {
        this.context = context;
        this.names = names;
      }
      hook(node, prop, previous) {
        for (const name of this.names) {
          this.context[name] = node;
        }
      }
      unhook() {
        for (const name of this.names) {
          this.context[name] = null;
        }
      }
    };
    __name(HandleHook, "HandleHook");
    HTMLWidget = class {
      constructor(value) {
        this.value = value;
      }
      update(prev) {
        if (!prev || prev.value === this.value)
          return;
        const next = this.init(prev);
        if (!prev.nodes)
          return next;
        prev.nodes[0].replaceWith(next);
        this.removeNodes(prev.nodes);
        return next;
      }
      destroy() {
        this.removeNodes(this.nodes);
      }
      removeNodes(nodes) {
        if (!nodes)
          return;
        const unhook = this.value && this.value.unhook;
        for (const node of nodes) {
          if (unhook)
            this.value.unhook(node);
          node.remove();
        }
      }
      init(prev) {
        const el = document.createElement("template");
        el.innerHTML = this.value + "";
        this.nodes = Array.from(el.content.childNodes);
        if (this.value && this.value.hook) {
          for (const node of this.nodes) {
            this.value.hook(node, "innerHTML", prev && prev.value);
          }
        }
        return el.content;
      }
      get type() {
        return "Widget";
      }
    };
    __name(HTMLWidget, "HTMLWidget");
    VDomRuntime = class extends PugRuntime {
      constructor(h4) {
        super();
        this.h = h4;
      }
      element(properties) {
        const tagName = properties.tagName;
        const children = properties.children;
        delete properties.tagName;
        delete properties.children;
        return this.h(tagName, properties, children);
      }
      hooks(context, value) {
        for (var [key, value] of Object.entries(value)) {
          if (typeof value === "function") {
            context[key] = new FunctionHook(value);
          } else {
            context[key] = value;
          }
        }
      }
      events(value, context, events) {
        return value.events = new EventHook(events, context);
      }
      handles(value, context, name) {
        value.handle = new HandleHook(context, name);
      }
      text(text, unescape) {
        if (text && unescape) {
          return new HTMLWidget(text);
        }
        if (text && text.type === "VirtualNode") {
          return text;
        }
        return super.text(text);
      }
      attrs(context, value) {
        if (typeof value.style === "object") {
          context.style = value.style;
          delete value.style;
        }
        context.attributes || (context.attributes = {});
        if (value.class) {
          value.class = this.attr(value.class);
        }
        for (const attr in value) {
          if (value[attr] === false || value[attr] == null)
            continue;
          if (value[attr].hook)
            context[attr] = value[attr];
          context.attributes[attr] = value[attr] + "";
        }
      }
      props(context, value) {
        for (const key of Object.keys(value)) {
          switch (key) {
            case "class":
              var className = this.attr(value[key]);
              if (!className)
                continue;
              if (context.attributes && context.attributes.class) {
                className = context.attributes.class + " " + className;
                delete context.attributes.class;
              }
              if (context.className) {
                className += " " + context.className;
              }
              context.className = className;
              break;
            case "style":
              context[key] = value[key];
              break;
            default:
              context[key] = new PropertyHook(value[key]);
          }
        }
      }
    };
    __name(VDomRuntime, "VDomRuntime");
    vdom_default = new VDomRuntime(import_virtual_dom2.h);
  }
});

// ../facade-builder/index.js
var init_facade_builder = __esm({
  "../facade-builder/index.js"() {
    init_pug();
    init_vdom();
  }
});

// client/components/list-test/list-test.pug
function template(__INIT__) {
  let __RESULT__ = vdom_default.init(this, __INIT__);
  let e$0 = vdom_default.create("div");
  vdom_default.attrs(e$0, { "id": "content" });
  let e$1 = vdom_default.create("ss-virtual-scroll");
  let e$2 = vdom_default.create("table");
  vdom_default.attrs(e$2, { "id": "list" });
  vdom_default.each(this.rows, (rowIndex) => {
    let e$3 = vdom_default.create("tr");
    vdom_default.attrs(e$3, { "data-row-index": rowIndex });
    vdom_default.events(e$3, this, [["click", (e) => this.toggleSelected(rowIndex)]]);
    let e$4 = vdom_default.create("td");
    vdom_default.attrs(e$4, { "class": "info" });
    let e$5 = vdom_default.create("button");
    let e$6 = vdom_default.create("span");
    vdom_default.child(e$6, vdom_default.text(`i`));
    vdom_default.child(e$5, vdom_default.element(e$6));
    vdom_default.child(e$4, vdom_default.element(e$5));
    vdom_default.child(e$3, vdom_default.element(e$4));
    let e$7 = vdom_default.create("td");
    vdom_default.attrs(e$7, { "class": "player" });
    let e$8 = vdom_default.create("img");
    vdom_default.attrs(e$8, { "class": "icon", "src": `icons/${this.randomInt(0, 14)}.svg` });
    vdom_default.child(e$7, vdom_default.element(e$8));
    let e$9 = vdom_default.create("span");
    vdom_default.attrs(e$9, { "class": "name" });
    vdom_default.child(e$9, vdom_default.text(`${rowIndex} Firstname Lastname`));
    vdom_default.child(e$7, vdom_default.element(e$9));
    let e$10 = vdom_default.create("span");
    vdom_default.attrs(e$10, { "class": "teams" });
    let e$11 = vdom_default.create("b");
    vdom_default.child(e$11, vdom_default.text(this.randomChars().toUpperCase()));
    vdom_default.child(e$10, vdom_default.element(e$11));
    let e$12 = vdom_default.create("span");
    vdom_default.child(e$12, vdom_default.text(`-`));
    vdom_default.child(e$10, vdom_default.element(e$12));
    let e$13 = vdom_default.create("span");
    vdom_default.child(e$13, vdom_default.text(this.randomChars().toUpperCase()));
    vdom_default.child(e$10, vdom_default.element(e$13));
    vdom_default.child(e$7, vdom_default.element(e$10));
    vdom_default.child(e$3, vdom_default.element(e$7));
    let e$14 = vdom_default.create("td");
    vdom_default.attrs(e$14, { "class": "point" });
    let e$15 = vdom_default.create("span");
    vdom_default.child(e$15, vdom_default.text(this.randomInt(1, 100)));
    vdom_default.child(e$14, vdom_default.element(e$15));
    vdom_default.child(e$3, vdom_default.element(e$14));
    let e$16 = vdom_default.create("td");
    vdom_default.attrs(e$16, { "class": "point" });
    let e$17 = vdom_default.create("span");
    vdom_default.child(e$17, vdom_default.text(this.randomInt(1, 100)));
    vdom_default.child(e$16, vdom_default.element(e$17));
    vdom_default.child(e$3, vdom_default.element(e$16));
    let e$18 = vdom_default.create("td");
    vdom_default.attrs(e$18, { "class": "point" });
    let e$19 = vdom_default.create("span");
    vdom_default.child(e$19, vdom_default.text(this.randomInt(1, 100)));
    vdom_default.child(e$18, vdom_default.element(e$19));
    vdom_default.child(e$3, vdom_default.element(e$18));
    vdom_default.child(e$2, vdom_default.element(e$3));
  });
  vdom_default.child(e$1, vdom_default.element(e$2));
  vdom_default.child(e$0, vdom_default.element(e$1));
  vdom_default.child(__RESULT__, vdom_default.element(e$0));
  let e$20 = vdom_default.create("small");
  vdom_default.attrs(e$20, { "id": "debug" });
  let e$21 = vdom_default.create("span");
  vdom_default.child(e$21, vdom_default.text(`page: ${this.page}`));
  vdom_default.child(e$20, vdom_default.element(e$21));
  vdom_default.child(__RESULT__, vdom_default.element(e$20));
  return vdom_default.end(__RESULT__);
}
var list_test_default;
var init_list_test = __esm({
  "client/components/list-test/list-test.pug"() {
    init_facade_builder();
    __name(template, "template");
    list_test_default = template;
  }
});

// client/components/list-test/list-test.styl
var list_test_default2;
var init_list_test2 = __esm({
  "client/components/list-test/list-test.styl"() {
    list_test_default2 = `#debug {
  position: fixed;
  bottom: 0;
  right: 0;
  background: #555;
  color: #fff;
  z-index: 5;
  padding: 2px 2px;
  display: grid;
  grid-gap: 5px;
  line-height: 10px;
}
#content {
  overflow-x: auto;
  max-height: 100vh;
}
#list {
  border-collapse: collapse;
}
tr[data-observable-row] {
  background: #444;
}
tr[data-visible] {
  outline: 1px solid #f00;
}
tr:not(last-of-type) {
  border-bottom: 1px solid #444;
}
td {
  text-align: center;
  box-sizing: border-box;
  font-size: 0.9em;
  padding: 0.5em 0px;
  user-select: none;
  contain: content;
}
td:last-child {
  padding-right: 1em;
}
tr.selected {
  background: #0f0;
  color: #000;
}
.info {
  display: inline-flex;
  padding: 0px;
  width: 32px;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  font-size: 0.9em;
}
.info button {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  padding: 18px 0;
  background: transparent;
  border: none;
}
.info span {
  display: flex;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  overflow: hidden;
  position: relative;
  background: #666;
  color: #fff;
  justify-content: center;
}
.icon {
  width: 34px;
  z-index: 1;
  display: inline-flex;
  position: relative;
  grid-row: span 2/auto;
  align-self: flex-end;
  padding: 0px;
}
.player {
  display: inline-grid;
  text-align: start;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 0px 0.25em;
  overflow-x: visible;
  vertical-align: top;
}
.name {
  display: block;
  font-weight: 700;
  grid-column: 3/auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  max-width: 90px;
}
.name::before {
  display: block;
  content: "";
  position: absolute;
  cursor: pointer;
  left: 0px;
  width: 100%;
  height: 100%;
}
.teams {
  grid-column: 3/auto;
  display: flex;
}
.point {
  width: 3.5em;
  vertical-align: top;
}
`;
  }
});

// client/components/list-test/list-test.js
var list_test_exports = {};
__export(list_test_exports, {
  default: () => ListTest
});
var LIMIT, ListTest;
var init_list_test3 = __esm({
  "client/components/list-test/list-test.js"() {
    init_facade();
    init_toolbox();
    init_virtual_scroll2();
    init_list_test();
    init_list_test2();
    LIMIT = 20;
    ListTest = class extends z {
      created() {
        this.page = 0;
        this.rows = [];
        this.allRows = [...Array(1e3).keys()];
        this.chunks = H2(this.allRows, LIMIT);
      }
      connected() {
        this.content = this.shadowRoot.querySelector("#content");
        this.table = this.shadowRoot.querySelector("#list");
        this.debug = this.shadowRoot.querySelector("#debug");
        this.makeChunks();
      }
      async makeChunks() {
        const startChunk = this.page ? this.page - 1 : this.page;
        this.rows = this.chunks.slice(startChunk, startChunk + 2).flat();
        await this.render();
        this.tableRows = this.shadowRoot.querySelectorAll("#list tr");
        for (const row of Array.from(this.tableRows)) {
        }
      }
      toggleSelected(rowIndex) {
        this.table.querySelector(`[data-row-index=${rowIndex}]`).classList.toggle("selected");
      }
      get randomChars() {
        return le2;
      }
      get randomInt() {
        return X2;
      }
      get limit() {
        return LIMIT;
      }
    };
    __name(ListTest, "ListTest");
    ListTest = __decorateClass([
      Me("ss"),
      $e(list_test_default),
      Re(list_test_default2)
    ], ListTest);
  }
});

// client/index.js
init_facade();
ha({
  routes: [
    {
      name: "list-test",
      path: "/",
      async component() {
        return Promise.resolve().then(() => (init_list_test3(), list_test_exports));
      }
    }
  ],
  componentPrefix: "ss"
});
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */
