import { createElementBlock as L, openBlock as D, createElementVNode as $, withDirectives as z, withKeys as I, vModelText as E, Fragment as T, renderList as V, normalizeStyle as K, normalizeClass as M, createCommentVNode as R, toDisplayString as A, ref as b, onMounted as W, nextTick as B } from "vue";
const N = (o, t) => Math.abs(o.row - t.row) + Math.abs(o.col - t.col), j = (o, t, r) => !!(r.row < t.row && o[r.row][r.col].horizontalLine || r.row > t.row && o[t.row][t.col].horizontalLine || r.col < t.col && o[r.row][r.col].verticalLine || r.col > t.col && o[t.row][t.col].verticalLine), J = (o, t, r, l) => {
  const { row: i, col: u } = o, p = [], c = [
    { row: -1, col: 0 },
    // Up
    { row: 0, col: 1 },
    // Right
    { row: 1, col: 0 },
    // Down
    { row: 0, col: -1 }
    // Left
  ];
  for (const d of c) {
    const g = i + d.row, y = u + d.col;
    if (g >= 0 && g < r && y >= 0 && y < l) {
      const k = t[g][y];
      if (k.type === "open-area" || k.type === "parking-space") {
        const C = { row: i, col: u }, v = { row: g, col: y };
        j(t, C, v) || p.push(v);
      }
    }
  }
  return p;
}, U = (o, t, r, l, i) => {
  if (!o || !t)
    return null;
  const u = r[o.row][o.col], p = r[t.row][t.col];
  if (!((u.type === "open-area" || u.type === "parking-space") && (p.type === "open-area" || p.type === "parking-space")))
    return null;
  const c = [o], d = /* @__PURE__ */ new Set(), g = {}, y = {}, k = {};
  for (let v = 0; v < l; v++)
    for (let w = 0; w < i; w++) {
      const S = `${v}-${w}`;
      y[S] = 1 / 0, k[S] = 1 / 0;
    }
  const C = `${o.row}-${o.col}`;
  for (y[C] = 0, k[C] = N(o, t); c.length > 0; ) {
    let v = 0;
    for (let h = 1; h < c.length; h++) {
      const f = `${c[h].row}-${c[h].col}`, P = `${c[v].row}-${c[v].col}`;
      k[f] < k[P] && (v = h);
    }
    const w = c[v], S = `${w.row}-${w.col}`;
    if (w.row === t.row && w.col === t.col) {
      const h = [];
      let f = w;
      for (; g[`${f.row}-${f.col}`]; )
        h.push(f), f = g[`${f.row}-${f.col}`];
      return h.push(o), h.reverse();
    }
    c.splice(v, 1), d.add(S);
    const O = J(w, r, l, i);
    for (const h of O) {
      const f = `${h.row}-${h.col}`;
      if (d.has(f))
        continue;
      const P = y[S] + 1;
      if (!c.some(
        (e) => e.row === h.row && e.col === h.col
      ))
        c.push(h);
      else if (P >= y[f])
        continue;
      g[f] = w, y[f] = P, k[f] = y[f] + N(h, t);
    }
  }
  return null;
}, q = (o) => {
  if (!o)
    return [];
  const t = o.split(`
`).filter((l) => l.trim() !== ""), r = [];
  for (let l = 0; l < t.length; l++) {
    const i = t[l].split(",").map((u) => u.trim());
    r.push(i);
  }
  return r;
}, x = (o, t, r) => {
  if (!o || !Array.isArray(o) || o.length === 0)
    return null;
  if (t >= 0 && t < o.length && r >= 0 && o[t] && r < o[t].length) {
    const l = o[t][r];
    return l && l !== "" ? l : null;
  }
  return null;
}, H = (o, t) => {
  const r = o.__vccOpts || o;
  for (const [l, i] of t)
    r[l] = i;
  return r;
}, Q = {
  name: "ParkingTable",
  setup() {
    const r = b([]), l = b([]), i = b(null), u = b(null), p = b([]), c = b(!1), d = b(""), g = (e = null) => {
      if (e && Array.isArray(e) && e.length === 20 && e[0].length === 30)
        return e;
      const a = [];
      for (let n = 0; n < 20; n++) {
        const s = [];
        for (let m = 0; m < 30; m++)
          s.push({
            type: "open-area",
            horizontalLine: !1,
            verticalLine: !1
          });
        a.push(s);
      }
      return a;
    }, y = async () => {
      try {
        const e = await fetch("/src/assets/parking-lot-design.csv");
        if (!e.ok) {
          console.error("Failed to load CSV file:", e.statusText);
          return;
        }
        const a = await e.text();
        l.value = q(a), console.log("Parking spot IDs loaded from CSV:", l.value);
      } catch (e) {
        console.error("Error loading parking spot IDs from CSV:", e);
      }
    }, k = (e, a) => x(l.value, e, a), C = () => {
      if (!d.value.trim()) return;
      const e = d.value.trim(), a = [];
      for (let n = 0; n < r.value.length; n++)
        for (let s = 0; s < r.value[n].length; s++)
          r.value[n][s].number === e && a.push({ row: n, col: s });
      if (a.length === 0) {
        for (let n = 0; n < l.value.length; n++)
          if (l.value[n]) {
            for (let s = 0; s < l.value[n].length; s++)
              if (l.value[n][s] === e && n < r.value.length && s < r.value[n].length) {
                const m = r.value[n][s];
                (m.type === "parking-space" || m.type === "open-area") && a.push({ row: n, col: s });
              }
          }
      }
      a.length > 0 ? (u.value = a[0], i.value && (v(), c.value = !0), alert(`End point set to spot "${e}" successfully!`)) : alert(`No spot with ID "${e}" found!`);
    }, v = () => {
      i.value && u.value && (p.value = [], B(() => {
        const e = U(
          i.value,
          u.value,
          r.value,
          20,
          30
        );
        p.value = e || [];
      }));
    }, w = async () => {
      try {
        await y();
        const e = await fetch("/src/assets/parking-lot-design.json");
        if (!e.ok) {
          console.error("Failed to load JSON file:", e.statusText);
          return;
        }
        const a = await e.json();
        r.value = g(a.grid), i.value = { row: 18, col: 27 }, u.value = null, p.value = [], c.value = !1, console.log("Parking lot design loaded successfully");
      } catch (e) {
        console.error("Error loading parking lot design:", e);
      }
    }, S = (e, a, n) => {
      const s = ["grid-cell"];
      n.type && s.push(n.type), n.horizontalLine && s.push("parking-line-h"), n.verticalLine && s.push("parking-line-v");
      const m = _(e, a, n) !== null;
      return i.value && i.value.row === e && i.value.col === a && (s.push("start-point"), m && s.push("with-number")), u.value && u.value.row === e && u.value.col === a && (s.push("end-point"), m && s.push("with-number")), h(e, a) && !(i.value && i.value.row === e && i.value.col === a) && !(u.value && u.value.row === e && u.value.col === a) && (m ? s.push("path-with-number") : s.push("path")), s;
    }, O = (e, a) => h(e, a) && !(i.value && i.value.row === e && i.value.col === a) && !(u.value && u.value.row === e && u.value.col === a) ? {
      "animation-delay": P(e, a)
    } : {}, h = (e, a) => c.value && p.value.some((n) => n.row === e && n.col === a), f = (e, a) => p.value.findIndex(
      (n) => n.row === e && n.col === a
    ), P = (e, a) => {
      const n = f(e, a);
      if (n === -1) return 0;
      const s = p.value.length;
      if (s <= 1) return 0;
      const m = 0.3 / (s - 1), F = n * m;
      return Math.min(F, 0.3).toFixed(3) + "s";
    }, _ = (e, a, n) => n.type !== "parking-space" && n.type !== "open-area" ? null : n.number ? n.number : k(e, a);
    return W(() => {
      w();
    }), {
      grid: r,
      startPoint: i,
      endPoint: u,
      path: p,
      isPathVisible: c,
      spotIdToSearch: d,
      handleSpotSearch: C,
      getCellClasses: S,
      getCellStyles: O,
      getDisplayParkingNumber: _
    };
  }
}, X = { class: "parking-table" }, Y = { class: "search-container" }, Z = { class: "grid-container" }, G = {
  key: 0,
  class: "parking-number"
};
function ee(o, t, r, l, i, u) {
  return D(), L("div", X, [
    $("div", Y, [
      z($("input", {
        type: "text",
        class: "spot-search-input",
        "onUpdate:modelValue": t[0] || (t[0] = (p) => l.spotIdToSearch = p),
        placeholder: "Enter license plate...",
        onKeyup: t[1] || (t[1] = I((...p) => l.handleSpotSearch && l.handleSpotSearch(...p), ["enter"]))
      }, null, 544), [
        [E, l.spotIdToSearch]
      ]),
      $("button", {
        class: "search-button",
        onClick: t[2] || (t[2] = (...p) => l.handleSpotSearch && l.handleSpotSearch(...p))
      }, " Find Route ")
    ]),
    $("div", Z, [
      (D(!0), L(T, null, V(l.grid, (p, c) => (D(), L(T, { key: c }, [
        (D(!0), L(T, null, V(p, (d, g) => (D(), L("div", {
          key: `${c}-${g}`,
          class: M(l.getCellClasses(c, g, d)),
          style: K(l.getCellStyles(c, g))
        }, [
          l.getDisplayParkingNumber(c, g, d) ? (D(), L("span", G, A(l.getDisplayParkingNumber(c, g, d)), 1)) : R("", !0)
        ], 6))), 128))
      ], 64))), 128))
    ])
  ]);
}
const te = /* @__PURE__ */ H(Q, [["render", ee]]), oe = {
  install(o) {
    o.component("ParkingTable", te);
  }
};
export {
  oe as VueParkingTablePlugin,
  te as default,
  U as findPath,
  x as getSpotIdFromCSV,
  q as parseCSV
};
