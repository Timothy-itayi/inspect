import { issueName, type Issue } from './fixture';
import { positionPhrase } from './region';
import { t } from './tokens';

/** e.g. "Possible signs of damp. Confidence: possible. Lower left of photo." */
export function issueLabel(issue: Issue): string {
  const word = t.confidence[issue.confidence].label.toLowerCase();
  return `${issueName(issue.issueType)}. Confidence: ${word}. ${positionPhrase(issue.region)}.`;
}
