import { describe, expect, it } from 'vitest';
import { issues, type Issue } from './fixture';
import { nearestIssue, positionPhrase, regionPosition } from './region';

describe('regionPosition', () => {
  it('names the corners, edges and centre by region centre', () => {
    expect(regionPosition({ x: 0.06, y: 0.62, w: 0.26, h: 0.26 })).toBe('lower left');
    expect(regionPosition({ x: 0.7, y: 0.0, w: 0.2, h: 0.2 })).toBe('upper right');
    expect(regionPosition({ x: 0.4, y: 0.0, w: 0.2, h: 0.2 })).toBe('top');
    expect(regionPosition({ x: 0.0, y: 0.4, w: 0.2, h: 0.2 })).toBe('left');
    expect(regionPosition({ x: 0.4, y: 0.4, w: 0.2, h: 0.2 })).toBe('centre');
  });

  it('puts a centre at exactly 1/3 or 2/3 in the middle band', () => {
    expect(regionPosition({ x: 1 / 3, y: 1 / 3, w: 0, h: 0 })).toBe('centre');
    expect(regionPosition({ x: 2 / 3, y: 2 / 3, w: 0, h: 0 })).toBe('centre');
    expect(regionPosition({ x: 0.3333, y: 0.3333, w: 0, h: 0 })).toBe('upper left');
    expect(regionPosition({ x: 0.6667, y: 0.6667, w: 0, h: 0 })).toBe('lower right');
  });

  it('phrases the fixture damp issue for the accessible label', () => {
    const damp = issues.find((i) => i.issueType === 'damp-signs')!;
    expect(positionPhrase(damp.region)).toBe('Lower left of photo');
  });
});

describe('nearestIssue', () => {
  const at = (issueType: Issue['issueType'], x: number, y: number, w = 0.2, h = 0.2): Issue => ({
    ...issues[0],
    issueType,
    region: { x, y, w, h },
  });
  // Centres (0.2, 0.5) and (0.4, 0.5); the circles overlap.
  const left = at('damp-signs', 0.1, 0.4);
  const right = at('mould-signs', 0.3, 0.4);

  it('picks the circle a tap lands inside', () => {
    expect(nearestIssue(0.12, 0.45, [left, right])).toBe(left);
  });

  it('picks the nearer centre where circles overlap', () => {
    // Drawn circles reach 0.6 x the region size from the centre (PhotoCanvas CIRCLE_GROW 1.2), so 0.24 here.
    // Centres (0.2, 0.5) and (0.4, 0.5) are 0.2 apart: the circles overlap.
    const a = at('damp-signs', 0, 0.3, 0.4, 0.4);
    const b = at('mould-signs', 0.2, 0.3, 0.4, 0.4);
    // Tap (0.33, 0.5) is 0.13 from a's centre and 0.07 from b's: inside both circles, nearer b.
    expect(nearestIssue(0.33, 0.5, [a, b])).toBe(b);
    expect(nearestIssue(0.27, 0.5, [a, b])).toBe(a);
  });

  it('uses straight-line distance, not across-plus-down', () => {
    // Tap (0.25, 0.25). far-across is 0.5 away in a line (Manhattan 0.5); diagonal is 0.495 straight (Manhattan 0.7).
    const acrossOnly = at('damp-signs', 0.65, 0.15);
    const diagonal = at('mould-signs', 0.5, 0.5);
    expect(nearestIssue(0.25, 0.25, [acrossOnly, diagonal])).toBe(diagonal);
  });

  it('picks the first in the list on an exact tie, whatever the order', () => {
    // Centres 0.25 and 0.75 are exact in binary, so the tap at 0.5 is a true tie.
    const a = at('damp-signs', 0, 0.4, 0.5);
    const b = at('mould-signs', 0.5, 0.4, 0.5);
    expect(nearestIssue(0.5, 0.5, [a, b])).toBe(a);
    expect(nearestIssue(0.5, 0.5, [b, a])).toBe(b);
  });

  it('picks the nearest even when the tap is outside every circle', () => {
    expect(nearestIssue(0.99, 0.99, [left, right])).toBe(right);
    expect(nearestIssue(0, 0, [left, right])).toBe(left);
  });

  it('returns nothing for an empty list', () => {
    expect(nearestIssue(0.5, 0.5, [])).toBeUndefined();
  });

  it('measures distance in pixels on a wide photo', () => {
    // Distance is measured on the photo as drawn on screen (4:3), so a vertical gap counts for less than the same number in 0-1 units.
    // Tap (0.5, 0.5): `high` is 0.4 away vertically, `side` is 0.35 away sideways.
    const side = at('mould-signs', 0.75, 0.4);
    const high = at('damp-signs', 0.4, 0);
    expect(nearestIssue(0.5, 0.5, [side, high])).toBe(side);
    expect(nearestIssue(0.5, 0.5, [side, high], 4 / 3)).toBe(high);
  });
});
