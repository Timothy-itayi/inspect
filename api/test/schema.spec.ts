import { describe, it, expect } from 'vitest';
import { checkAnswer, ISSUE_TYPES, CONFIDENCE_LEVELS, MAX_ISSUES, MAX_TEXT, ANSWER_JSON_SCHEMA } from '../src/schema';

const issue = {
	issueType: 'mould-signs',
	confidence: 'likely',
	region: { x: 0.1, y: 0.1, w: 0.3, h: 0.2 },
	evidence: 'Dark spots on the ceiling.',
	suggestedQuestion: 'Has there been mould here?',
};
const withIssue = (change: Record<string, unknown>) => ({ issues: [{ ...issue, ...change }] });
const reasonsFor = (v: unknown) => {
	const r = checkAnswer(v);
	if (r.ok) throw new Error('expected a rejection');
	return r.reasons.join(' | ');
};

describe('the lists', () => {
	it('hold exactly the approved values in order', () => {
		expect([...ISSUE_TYPES]).toEqual(['mould-signs', 'damp-signs', 'crack-signs', 'water-entry-signs', 'blind-cord-loop', 'window-covering-damage']);
		expect([...CONFIDENCE_LEVELS]).toEqual(['likely', 'possible', 'unsure']);
	});
	it('feed the JSON schema', () => {
		const item = ANSWER_JSON_SCHEMA.properties.issues.items.properties;
		expect(item.issueType.enum).toEqual([...ISSUE_TYPES]);
		expect(item.confidence.enum).toEqual([...CONFIDENCE_LEVELS]);
	});
});

describe('checkAnswer accepts', () => {
	it('a correct answer', () => {
		expect(checkAnswer({ issues: [issue] })).toEqual({ ok: true, answer: { issues: [issue] } });
	});
	it('a clean photo with no issues', () => {
		expect(checkAnswer({ issues: [] }).ok).toBe(true);
	});
	it('a box that exactly touches the photo edge', () => {
		expect(checkAnswer(withIssue({ region: { x: 0.5, y: 0.5, w: 0.5, h: 0.5 } })).ok).toBe(true);
	});
});

describe('checkAnswer rejects', () => {
	it('an unknown issue type', () => expect(reasonsFor(withIssue({ issueType: 'ghosts' }))).toMatch(/issueType: "ghosts"/));
	it('an unknown confidence level', () => expect(reasonsFor(withIssue({ confidence: 'certain' }))).toMatch(/confidence: "certain"/));
	it('a missing field', () => {
		const { evidence, ...rest } = issue;
		expect(reasonsFor({ issues: [rest] })).toContain('evidence');
	});
	it('empty evidence', () => expect(reasonsFor(withIssue({ evidence: '  ' }))).toContain('evidence'));
	it('an empty question', () => expect(reasonsFor(withIssue({ suggestedQuestion: '' }))).toContain('suggestedQuestion'));
	it('a box outside 0 to 1', () => {
		expect(reasonsFor(withIssue({ region: { x: -0.1, y: 0, w: 0.2, h: 0.2 } }))).toContain('0 to 1');
		expect(reasonsFor(withIssue({ region: { x: 0, y: 0, w: 1.5, h: 0.2 } }))).toContain('0 to 1');
	});
	it('a box spilling off the photo', () => {
		expect(reasonsFor(withIssue({ region: { x: 0.8, y: 0, w: 0.3, h: 0.2 } }))).toContain('spills off');
	});
	it('a box with no size', () => {
		expect(reasonsFor(withIssue({ region: { x: 0.1, y: 0.1, w: 0, h: 0.2 } }))).toContain('no size');
	});
	it('extra unknown fields', () => {
		expect(reasonsFor(withIssue({ mood: 'sad' }))).toContain('unknown field "mood"');
		expect(reasonsFor({ issues: [], note: 'hi' })).toContain('unknown field "note"');
		expect(reasonsFor(withIssue({ region: { x: 0, y: 0, w: 0.1, h: 0.1, z: 1 } }))).toContain('unknown field "z"');
	});
	it.each([['text', 'hello', /object/], ['null', null, /object/], ['a bare list', [issue], /object/], ['issues not a list', { issues: 'no' }, /issues must be a list/]])(
		'something that is not an answer: %s',
		(_n, v, why) => expect(reasonsFor(v)).toMatch(why),
	);
	it('too many issues, with one reason only', () => {
		const r = reasonsFor({ issues: Array(MAX_ISSUES + 1).fill({ ...issue, issueType: 'bad' }) });
		expect(r).toMatch(/more than the limit of 20/);
		expect(r).not.toMatch(/issueType/);
	});
	it('text that is too long', () => {
		expect(reasonsFor(withIssue({ evidence: 'a'.repeat(MAX_TEXT + 1) }))).toMatch(/evidence: text is longer than 300/);
		expect(reasonsFor(withIssue({ suggestedQuestion: 'a'.repeat(MAX_TEXT + 1) }))).toMatch(/suggestedQuestion: text is longer/);
	});
});
