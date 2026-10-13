import { describe, expect, it } from 'vitest';
import { readReduceMotion } from './reduceMotion';

describe('readReduceMotion', () => {
  it('passes the setting through', async () => {
    expect(await readReduceMotion(async () => true)).toBe(true);
  });
  it('falls back to false when the read rejects', async () => {
    expect(await readReduceMotion(() => Promise.reject(new Error('nope')))).toBe(false);
  });
});
