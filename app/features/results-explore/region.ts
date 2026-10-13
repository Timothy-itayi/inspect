import type { Region } from './fixture';

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
