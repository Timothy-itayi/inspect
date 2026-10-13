import type { ConfidenceLevel } from './tokens';

// shortcut: this type is local to the prototype. It moves to api/src/schema.ts in Build.
// The v1 allowlist from docs/research/issue-types.md (issue-1-issue-types branch). IDs are internal; users see the label.
export type IssueType =
  | 'mould-signs'
  | 'damp-signs'
  | 'crack-signs'
  | 'water-entry-signs'
  | 'blind-cord-loop'
  | 'window-covering-damage';

/** Normalised to the photo: 0..1 from the top-left corner. */
export type Region = { x: number; y: number; w: number; h: number };

export type Issue = {
  issueType: IssueType;
  confidence: ConfidenceLevel;
  region: Region;
  evidence: string;
  suggestedQuestion: string;
};

// "Shown to the renter as" labels, in checklist order.
export const V1_TYPES: { issueType: IssueType; name: string }[] = [
  { issueType: 'mould-signs', name: 'Possible signs of mould' },
  { issueType: 'damp-signs', name: 'Possible signs of damp' },
  { issueType: 'crack-signs', name: 'Possible cracking worth asking about' },
  { issueType: 'water-entry-signs', name: 'Possible signs water gets in' },
  { issueType: 'blind-cord-loop', name: 'Possible loose blind cord' },
  { issueType: 'window-covering-damage', name: 'Possibly damaged curtain or blind' },
];

export const issueName = (type: IssueType) => V1_TYPES.find((v) => v.issueType === type)!.name;

/** Photo shape: width over height. The placeholder is drawn in code at this ratio. */
export const PHOTO_ASPECT = 4 / 3;

export const issues: Issue[] = [
  {
    issueType: 'mould-signs',
    confidence: 'likely',
    region: { x: 0.6, y: 0.04, w: 0.34, h: 0.18 },
    evidence: 'Dark spotting along the ceiling corner above the window.',
    suggestedQuestion: 'Has there been mould in this room? What was done about the cause?',
  },
  {
    issueType: 'damp-signs',
    confidence: 'possible',
    region: { x: 0.06, y: 0.62, w: 0.26, h: 0.26 },
    evidence: 'A pale tide mark on the wall above the skirting.',
    suggestedQuestion: 'Is there a damp problem here, and has the cause been fixed?',
  },
  {
    issueType: 'blind-cord-loop',
    confidence: 'unsure',
    region: { x: 0.24, y: 0.14, w: 0.14, h: 0.46 },
    evidence: 'A looped cord hangs from the blind. No wall anchor is visible.',
    suggestedQuestion: 'Can the blind cords be anchored before move-in?',
  },
  {
    issueType: 'window-covering-damage',
    confidence: 'likely',
    region: { x: 0.52, y: 0.24, w: 0.36, h: 0.44 },
    evidence: 'A curtain hangs torn and only half covers the window.',
    suggestedQuestion: 'Will this blind or curtain be fixed or replaced?',
  },
];
