import type { Issue, Region } from './fixture';

// Boundaries are inclusive of the middle band: a centre at exactly 1/3 or 2/3 is middle/centre.
const bands = <T extends string>(v: number, low: T, mid: T, high: T): T =>
  v < 1 / 3 ? low : v > 2 / 3 ? high : mid;

/** Where a region sits on the photo, from its centre: "lower left", "top", "centre". */
export function regionPosition(r: Region): string {
  const row = bands(r.y + r.h / 2, 'upper', 'middle', 'lower');
  const col = bands(r.x + r.w / 2, 'left', 'centre', 'right');
  if (row === 'middle' && col === 'centre') return 'centre';
  if (col === 'centre') return row === 'upper' ? 'top' : 'bottom';
  if (row === 'middle') return col;
  return `${row} ${col}`;
}

const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function positionPhrase(r: Region): string {
  return `${sentence(regionPosition(r))} of photo`;
}

/**
 * The issue whose region centre is nearest a tap (normalised 0-1). Ties keep the first in the list.
 * `aspect` is photo width/height, so distance is measured in screen pixels, not stretched units.
 */
export function nearestIssue(tapX: number, tapY: number, issues: Issue[], aspect = 1): Issue | undefined {
  const dist = (i: Issue) =>
    Math.hypot(i.region.x + i.region.w / 2 - tapX, (i.region.y + i.region.h / 2 - tapY) / aspect);
  let best = issues[0];
  for (const i of issues) if (dist(i) < dist(best)) best = i;
  return best;
}
