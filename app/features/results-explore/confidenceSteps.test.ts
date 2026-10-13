import { expect, it } from 'vitest';
import { confidenceSteps } from './confidenceSteps';

it('fills more steps for higher confidence', () => {
  expect(['likely', 'possible', 'unsure'].map((l) => confidenceSteps(l as 'likely'))).toEqual([3, 2, 1]);
});
