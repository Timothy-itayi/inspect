// Hand-drawn-looking ellipse: a wobbly radius, a slow spiral so the ends don't meet,
// and a small overshoot. Deterministic per seed so renders are stable.
export function penPath(width: number, height: number, seed: number) {
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2;
  const ry = height / 2;
  const start = -0.5 + seed * 0.7;
  const sweep = Math.PI * 2 + 0.35;
  const steps = 56;
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const a = start + sweep * p;
    const wobble = 1 + 0.04 * Math.sin(2 * a + seed * 2.1) + 0.03 * Math.sin(3 * a + seed * 1.3);
    const grow = 0.86 + 0.08 * p; // stays inside the box, so the SVG never clips the stroke
    pts.push([cx + rx * wobble * grow * Math.cos(a), cy + ry * wobble * grow * Math.sin(a)]);
  }
  let length = 0;
  for (let i = 1; i < pts.length; i++) {
    length += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return { d, fillD: `${d} Z`, length };
}
