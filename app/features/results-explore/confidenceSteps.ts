import type { ConfidenceLevel } from './tokens';

/** How many of the three scale steps are filled: likely 3, possible 2, unsure 1. */
export const confidenceSteps = (level: ConfidenceLevel): number => ({ likely: 3, possible: 2, unsure: 1 })[level];
