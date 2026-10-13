import { expect, it } from 'vitest';
import { confidenceSteps } from './confidenceSteps';
import type { ConfidenceLevel } from './tokens';

it('fills more steps for higher confidence', () => {
  expect(['likely', 'possible', 'unsure'].map((l) => confidenceSteps(l as ConfidenceLevel))).toEqual([3, 2, 1]);
});
