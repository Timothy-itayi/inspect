import { describe, it, expect } from 'vitest';
import { checkAnswer } from '../src/schema';

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
	it('an unknown issue type', () => expect(reasonsFor(withIssue({ issueType: 'ghosts' }))).toContain('issueType'));
	it('an unknown confidence level', () => expect(reasonsFor(withIssue({ confidence: 'certain' }))).toContain('confidence'));
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
	it.each([['text', 'hello'], ['null', null], ['a bare list', [issue]], ['issues not a list', { issues: 'no' }]])(
		'something that is not an answer: %s',
		(_n, v) => expect(checkAnswer(v).ok).toBe(false),
	);
});
