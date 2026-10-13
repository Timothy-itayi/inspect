# Inspect design system

## Concept

An inspector's clipboard. The screen is the kraft board; content sits on paper sheets clipped to it. Field notes, written in a hurry, careful about evidence.

## Colour roles

| Role | Hex | Use |
|---|---|---|
| board | #C9B58C | Screen background and chrome; only full ink text on it, never muted ink |
| paper | #F3EFE2 | Sheets: lists, results, questions |
| ink | #1E2B45 | Ballpoint blue-black; all primary text, icons, pen annotations |
| inkMuted | #55607A | Secondary text, on paper only |
| rule | #B9C3D6 | Faint ruled lines and dividers on paper; decorative, never carries meaning |
| highlight | #F5E64A | Highlighter fill behind ink text or over a flagged photo region; never a text colour |
| danger | #9E2A1F | Errors and destructive actions only, always with a word |

## Contrast

All text pairings meet WCAG AA (4.5:1).

| Pair | Ratio | Level |
|---|---|---|
| ink / paper | 12.28 | AA |
| inkMuted / paper | 5.47 | AA |
| ink / highlight | 10.96 | AA |
| ink / board | 7.04 | AA |
| danger / paper | 6.51 | AA |

inkMuted/board fails at 3.13: never use it. highlight/paper is 1.12, so highlight is never the only signal; a flagged region always also gets an ink pen circle.

## Type

Headings: Alegreya (humanist calligraphic serif, OFL, @expo-google-fonts/alegreya), weights 500 and 700. Body and UI: Atkinson Hyperlegible Next (OFL, chosen for legibility in dim, crowded hallways), weights 400 and 600.

Scale in px, iOS base 17, approximately 1.25 ratio:

- caption: 13
- footnote: 15
- body: 17
- title3: 21
- title2: 26
- title1: 33

Line height: body 1.45, headings 1.2. Sentence case everywhere; no all-caps labels.

## Confidence

Every issue shows a word label plus a hatch swatch. Likely shows solid ink fill; Possible shows dense 45° hatch (2px lines, 4px gap); Unsure shows sparse 45° hatch (1px lines, 8px gap) plus dotted outline.

Words: "Likely", "Possible", "Unsure". Findings are phrased "possible issue, worth asking about"; never claim a legal breach.

## Signature element

Circled annotations on photos: a hand-drawn-looking ink ellipse (2.5px stroke, slightly irregular, not closed perfectly) around the evidence region, with the highlight at 35% opacity inside. This is the one bold element; everything around it stays quiet.

## Shape

Paper sheets radius 2 (paper corners), photos radius 4, buttons and inputs radius 10. Sheet edge gets a 1px ink at 12% border, no drop shadows except the clip at the top of the active sheet.

## Spacing

4px grid; screen gutter 16; sheet padding 20.

## Motion

One moment only: the pen circle draws itself (stroke animation, 400ms) when an issue is first shown. Respect reduce-motion: show it already drawn.

## Voice

Plain, active, sentence case. Buttons say exactly what happens ("Take photo", "Ask about this", "Not an issue"). Offline: "Saved. Will analyse when you're back online." Errors explain what happened and what to do; no apologies.

## Don't

REA or Domain colours or logos; colour alone for confidence; terracotta or clay accents; extra accent colours.
