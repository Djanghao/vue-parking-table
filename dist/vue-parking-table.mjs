import { createElementBlock as m, openBlock as w, createElementVNode as E, withDirectives as N, withKeys as V, vModelText as $, Fragment as B, renderList as P, normalizeStyle as _, normalizeClass as T, createCommentVNode as K, toDisplayString as R, ref as d, onMounted as I, nextTick as J } from "vue";
const O = (i, e) => Math.abs(i.row - e.row) + Math.abs(i.col - e.col), M = (i, e, o) => !!(o.row < e.row && i[o.row][o.col].horizontalLine || o.row > e.row && i[e.row][e.col].horizontalLine || o.col < e.col && i[o.row][o.col].verticalLine || o.col > e.col && i[e.row][e.col].verticalLine), A = (i, e, o, n) => {
  const { row: L, col: f } = i, p = [], t = [
    { row: -1, col: 0 },
    // Up
    { row: 0, col: 1 },
    // Right
    { row: 1, col: 0 },
    // Down
    { row: 0, col: -1 }
    // Left
  ];
  for (const v of t) {
    const c = L + v.row, g = f + v.col;
    if (c >= 0 && c < o && g >= 0 && g < n) {
      const C = e[c][g];
      if (C.type === "open-area" || C.type === "parking-space") {
        const S = { row: L, col: f }, z = { row: c, col: g };
        M(e, S, z) || p.push(z);
      }
    }
  }
  return p;
}, W = (i, e, o, n, L) => {
  if (!i || !e)
    return null;
  const f = o[i.row][i.col], p = o[e.row][e.col];
  if (!((f.type === "open-area" || f.type === "parking-space") && (p.type === "open-area" || p.type === "parking-space")))
    return null;
  const t = [i], v = /* @__PURE__ */ new Set(), c = {}, g = {}, C = {};
  for (let z = 0; z < n; z++)
    for (let u = 0; u < L; u++) {
      const D = `${z}-${u}`;
      g[D] = 1 / 0, C[D] = 1 / 0;
    }
  const S = `${i.row}-${i.col}`;
  for (g[S] = 0, C[S] = O(i, e); t.length > 0; ) {
    let z = 0;
    for (let h = 1; h < t.length; h++) {
      const y = `${t[h].row}-${t[h].col}`, a = `${t[z].row}-${t[z].col}`;
      C[y] < C[a] && (z = h);
    }
    const u = t[z], D = `${u.row}-${u.col}`;
    if (u.row === e.row && u.col === e.col) {
      const h = [];
      let y = u;
      for (; c[`${y.row}-${y.col}`]; )
        h.push(y), y = c[`${y.row}-${y.col}`];
      return h.push(i), h.reverse();
    }
    t.splice(z, 1), v.add(D);
    const F = A(u, o, n, L);
    for (const h of F) {
      const y = `${h.row}-${h.col}`;
      if (v.has(y))
        continue;
      const a = g[D] + 1;
      if (!t.some(
        (l) => l.row === h.row && l.col === h.col
      ))
        t.push(h);
      else if (a >= g[y])
        continue;
      c[y] = u, g[y] = a, C[y] = g[y] + O(h, e);
    }
  }
  return null;
}, j = (i) => {
  if (!i)
    return [];
  const e = i.split(`
`).filter((n) => n.trim() !== ""), o = [];
  for (let n = 0; n < e.length; n++) {
    const L = e[n].split(",").map((f) => f.trim());
    o.push(L);
  }
  return o;
}, U = (i, e, o) => {
  if (!i || !Array.isArray(i) || i.length === 0)
    return null;
  if (e >= 0 && e < i.length && o >= 0 && i[e] && o < i[e].length) {
    const n = i[e][o];
    return n && n !== "" ? n : null;
  }
  return null;
}, Z = /* @__PURE__ */ JSON.parse('[[{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"facility","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"facility","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"parking-space","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":true},{"type":"parking-space","horizontalLine":true,"verticalLine":true},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":true,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}],[{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false},{"type":"open-area","horizontalLine":false,"verticalLine":false}]]'), q = { row: 18, col: 27 }, H = { row: 9, col: 6 }, Q = "1.0", X = "2025-03-22T22:38:42.529Z", Y = {
  grid: Z,
  startPoint: q,
  endPoint: H,
  version: Q,
  exportDate: X
}, G = ` ,,,,,,,,,,,,,,,,,,,\r
,,,,,,,,,,,,,,,,,,,\r
,,,,,,,,,,,,,,,,,,,\r
,,,B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,B16,B17,B18\r
,,,B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,B16,B17,B18\r
,,,C2,C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13,C14,C15,C16,C17,C18\r
,,,C2,C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13,C14,C15,C16,C17,C18\r
,,,,,,,,,,,,,,,,,,,\r
,,,,,,,,,,,,,,,,,,,\r
,,,D2,D3,D4,D5,D6,D7,D8,D9,D10,D11,D12,D13,D14,D15,D16,D17,D18\r
,,,D2,D3,D4,D5,D6,D7,D8,D9,D10,D11,D12,D13,D14,D15,D16,D17,D18\r
,,,,,,,,,,,,,,,,,,,\r
,,,,,,,,,,,,,,,,,,,\r
,,,E2,E3,E4,E5,E6,E7,E8,E9,E10,E11,E12,E13,E14,E15,E16,E17,E18\r
,,,E2,E3,E4,E5,E6,E7,E8,E9,E10,E11,E12,E13,E14,E15,E16,E17,E18\r
,,,,,,,,,,,,,,,,,,,\r
,,,,,,,,,,,,,,,,,,,\r
,,,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,F16,F17,F18\r
,,,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,F16,F17,F18`, x = (i, e) => {
  const o = i.__vccOpts || i;
  for (const [n, L] of e)
    o[n] = L;
  return o;
}, ee = {
  name: "ParkingTable",
  props: {
    // Allow overriding default files
    customDesignJSON: {
      type: Object,
      default: null
    },
    customDesignCSV: {
      type: String,
      default: null
    }
  },
  setup(i) {
    const n = d([]), L = d([]), f = d(null), p = d(null), t = d([]), v = d(!1), c = d(""), g = (a = null) => {
      if (a && Array.isArray(a) && a.length === 20 && a[0].length === 30)
        return a;
      const s = [];
      for (let l = 0; l < 20; l++) {
        const r = [];
        for (let k = 0; k < 30; k++)
          r.push({
            type: "open-area",
            horizontalLine: !1,
            verticalLine: !1
          });
        s.push(r);
      }
      return s;
    }, C = () => {
      try {
        const a = i.customDesignCSV || G;
        L.value = j(a), console.log("Parking spot IDs loaded from CSV:", L.value);
      } catch (a) {
        console.error("Error loading parking spot IDs from CSV:", a);
      }
    }, S = (a, s) => U(L.value, a, s), z = () => {
      if (!c.value.trim()) return;
      const a = c.value.trim(), s = [];
      for (let l = 0; l < n.value.length; l++)
        for (let r = 0; r < n.value[l].length; r++)
          n.value[l][r].number === a && s.push({ row: l, col: r });
      if (s.length === 0) {
        for (let l = 0; l < L.value.length; l++)
          if (L.value[l]) {
            for (let r = 0; r < L.value[l].length; r++)
              if (L.value[l][r] === a && l < n.value.length && r < n.value[l].length) {
                const k = n.value[l][r];
                (k.type === "parking-space" || k.type === "open-area") && s.push({ row: l, col: r });
              }
          }
      }
      s.length > 0 ? (p.value = s[0], f.value && (u(), v.value = !0), alert(`End point set to spot "${a}" successfully!`)) : alert(`No spot with ID "${a}" found!`);
    }, u = () => {
      f.value && p.value && (t.value = [], J(() => {
        const a = W(
          f.value,
          p.value,
          n.value,
          20,
          30
        );
        t.value = a || [];
      }));
    }, D = () => {
      try {
        C();
        const a = i.customDesignJSON || Y;
        n.value = g(a.grid), a.startPoint ? f.value = a.startPoint : f.value = { row: 18, col: 27 }, p.value = null, t.value = [], v.value = !1, console.log("Parking lot design loaded successfully");
      } catch (a) {
        console.error("Error loading parking lot design:", a);
      }
    }, F = (a, s, l) => {
      const r = ["grid-cell"];
      l.type && r.push(l.type), l.horizontalLine && r.push("parking-line-h"), l.verticalLine && r.push("parking-line-v");
      const k = y(a, s, l) !== null;
      return f.value && f.value.row === a && f.value.col === s && (r.push("start-point"), k && r.push("with-number")), p.value && p.value.row === a && p.value.col === s && (r.push("end-point"), k && r.push("with-number")), v.value && t.value.length > 0 && t.value.some(
        (b) => b.row === a && b.col === s
      ) && (r.push("path-cell"), t.value[0].row === a && t.value[0].col === s ? r.push("path-start") : t.value[t.value.length - 1].row === a && t.value[t.value.length - 1].col === s ? r.push("path-end") : r.push("path-middle")), r;
    }, h = (a, s) => {
      const l = {};
      if (v.value && t.value.length > 0) {
        const r = t.value.findIndex(
          (k) => k.row === a && k.col === s
        );
        r >= 0 && (l.animationDelay = `${r * 0.1}s`);
      }
      return l;
    }, y = (a, s, l) => l.number ? l.number : S(a, s);
    return I(() => {
      D();
    }), {
      grid: n,
      parkingSpotIds: L,
      startPoint: f,
      endPoint: p,
      path: t,
      isPathVisible: v,
      spotIdToSearch: c,
      handleSpotSearch: z,
      calculatePath: u,
      getCellClasses: F,
      getCellStyles: h,
      getDisplayParkingNumber: y
    };
  }
}, ae = { class: "parking-table" }, ie = { class: "search-container" }, ne = { class: "grid-container" }, te = {
  key: 0,
  class: "parking-number"
};
function le(i, e, o, n, L, f) {
  return w(), m("div", ae, [
    E("div", ie, [
      N(E("input", {
        type: "text",
        class: "spot-search-input",
        "onUpdate:modelValue": e[0] || (e[0] = (p) => n.spotIdToSearch = p),
        placeholder: "Enter license plate...",
        onKeyup: e[1] || (e[1] = V((...p) => n.handleSpotSearch && n.handleSpotSearch(...p), ["enter"]))
      }, null, 544), [
        [$, n.spotIdToSearch]
      ]),
      E("button", {
        class: "search-button",
        onClick: e[2] || (e[2] = (...p) => n.handleSpotSearch && n.handleSpotSearch(...p))
      }, " Find Route ")
    ]),
    E("div", ne, [
      (w(!0), m(B, null, P(n.grid, (p, t) => (w(), m(B, { key: t }, [
        (w(!0), m(B, null, P(p, (v, c) => (w(), m("div", {
          key: `${t}-${c}`,
          class: T(n.getCellClasses(t, c, v)),
          style: _(n.getCellStyles(t, c))
        }, [
          n.getDisplayParkingNumber(t, c, v) ? (w(), m("span", te, R(n.getDisplayParkingNumber(t, c, v)), 1)) : K("", !0)
        ], 6))), 128))
      ], 64))), 128))
    ])
  ]);
}
const re = /* @__PURE__ */ x(ee, [["render", le]]), se = {
  install(i) {
    i.component("ParkingTable", re);
  }
};
export {
  se as VueParkingTablePlugin,
  re as default,
  G as defaultDesignCSV,
  Y as defaultDesignJSON,
  W as findPath,
  U as getSpotIdFromCSV,
  j as parseCSV
};
