import { describe, expect, it } from 'vitest';
import { issues } from './fixture';
import { positionPhrase, regionPosition } from './region';

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
