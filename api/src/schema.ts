// The fixed format every AI answer must follow. An answer either fits or is thrown away.
// The app imports this file by relative path; keep it free of Worker-only code.

// The v1 allowlist from docs/research/issue-types.md. IDs are internal; users see a label.
export const ISSUE_TYPES = [
	'mould-signs',
	'damp-signs',
	'crack-signs',
	'water-entry-signs',
	'blind-cord-loop',
	'window-covering-damage',
] as const;
// Stored as a level, never display text. Matches design/tokens.json.
export const CONFIDENCE_LEVELS = ['likely', 'possible', 'unsure'] as const;

// Size limits: the AI's answer is untrusted, so cap how much we accept.
export const MAX_ISSUES = 20;
export const MAX_TEXT = 300;

export type IssueType = (typeof ISSUE_TYPES)[number];
export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];
/** Normalised to the photo: 0..1 from the top-left corner. */
export type Region = { x: number; y: number; w: number; h: number };
export type Issue = {
	issueType: IssueType;
	confidence: ConfidenceLevel;
	region: Region;
	evidence: string;
	suggestedQuestion: string;
};
export type Answer = { issues: Issue[] };

const text = { type: 'string', minLength: 1, maxLength: MAX_TEXT, pattern: '\\S' }; // pattern: not blank
const unit = { type: 'number', minimum: 0, maximum: 1 };
/** JSON schema handed to the AI later. Built from the same two lists as the types. */
export const ANSWER_JSON_SCHEMA = {
	type: 'object',
	additionalProperties: false,
	required: ['issues'],
	properties: {
		issues: {
			type: 'array',
			maxItems: MAX_ISSUES,
			items: {
				type: 'object',
				additionalProperties: false,
				required: ['issueType', 'confidence', 'region', 'evidence', 'suggestedQuestion'],
				properties: {
					issueType: { type: 'string', enum: [...ISSUE_TYPES] },
					confidence: { type: 'string', enum: [...CONFIDENCE_LEVELS] },
					region: {
						type: 'object',
						additionalProperties: false,
						required: ['x', 'y', 'w', 'h'],
						properties: { x: unit, y: unit, w: { ...unit, exclusiveMinimum: 0 }, h: { ...unit, exclusiveMinimum: 0 } },
					},
					evidence: text,
					suggestedQuestion: text,
				},
			},
		},
	},
} as const;

export type CheckResult = { ok: true; answer: Answer } | { ok: false; reasons: string[] };

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Checks what the AI returned (after JSON parsing). Returns the typed answer or readable reasons. */
export function checkAnswer(input: unknown): CheckResult {
	const reasons: string[] = [];
	const extras = (o: Record<string, unknown>, allowed: string[], where: string) => {
		for (const k of Object.keys(o)) if (!allowed.includes(k)) reasons.push(`${where}: unknown field "${k}"`);
	};
	if (!isObj(input)) return { ok: false, reasons: ['answer must be an object like {"issues": [...]}'] };
	extras(input, ['issues'], 'answer');
	if (!Array.isArray(input.issues)) return { ok: false, reasons: [...reasons, 'answer.issues must be a list'] };

	if (input.issues.length > MAX_ISSUES) {
		return { ok: false, reasons: [...reasons, `answer.issues: ${input.issues.length} issues is more than the limit of ${MAX_ISSUES}`] };
	}
	input.issues.forEach((item: unknown, i) => {
		const at = `issues[${i}]`;
		if (!isObj(item)) return void reasons.push(`${at}: must be an object`);
		extras(item, ['issueType', 'confidence', 'region', 'evidence', 'suggestedQuestion'], at);
		if (!(ISSUE_TYPES as readonly unknown[]).includes(item.issueType)) {
			reasons.push(`${at}.issueType: "${String(item.issueType)}" is not one of ${ISSUE_TYPES.join(', ')}`);
		}
		if (!(CONFIDENCE_LEVELS as readonly unknown[]).includes(item.confidence)) {
			reasons.push(`${at}.confidence: "${String(item.confidence)}" is not one of ${CONFIDENCE_LEVELS.join(', ')}`);
		}
		for (const k of ['evidence', 'suggestedQuestion'] as const) {
			if (typeof item[k] !== 'string' || item[k].trim() === '') reasons.push(`${at}.${k}: must be non-empty text`);
			else if (item[k].length > MAX_TEXT) reasons.push(`${at}.${k}: text is longer than ${MAX_TEXT} characters`);
		}
		const r = item.region;
		if (!isObj(r)) return void reasons.push(`${at}.region: must be a box {x, y, w, h}`);
		extras(r, ['x', 'y', 'w', 'h'], `${at}.region`);
		const n = ['x', 'y', 'w', 'h'].map((k) => r[k]);
		if (!n.every((v) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1)) {
			return void reasons.push(`${at}.region: x, y, w and h must each be a number from 0 to 1`);
		}
		const [x, y, w, h] = n as number[];
		if (w <= 0 || h <= 0) reasons.push(`${at}.region: box has no size (w and h must be above 0)`);
		if (x + w > 1 || y + h > 1) reasons.push(`${at}.region: box spills off the photo (x+w and y+h must be at most 1)`);
	});
	return reasons.length ? { ok: false, reasons } : { ok: true, answer: input as Answer };
}
