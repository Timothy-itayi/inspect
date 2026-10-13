# Inspect design system

## Concept

Clean and calm. White space instead of lines, the photo leads every card, headings are bold and near-black. One accent colour, deep teal, appears only on the main action and on the pen circle drawn round each possible issue. The only hand-made touch is that pen circle; everything around it stays quiet.

## Colour roles

| Role | Hex | Use |
|---|---|---|
| background | #FFFFFF | Screen background and cards |
| surface | #F7F7F7 | Muted areas, photo placeholders, secondary panels |
| text | #222222 | All primary text, icons, headings, confidence swatches, outlined button borders |
| textMuted | #6A6A6A | Secondary text |
| divider | #DDDDDD | Thin dividers; decoration only, never carries meaning |
| accent | #0E6B6B | Filled main button, pen circle, small highlights; nothing else |
| accentTint | #E6F2F1 | Light tint behind small accent highlights, with text colour on it |
| danger | #B42318 | Errors and destructive actions only, always with a word |

## Contrast

All text pairings meet WCAG AA (4.5:1).

| Pair | Ratio | Level |
|---|---|---|
| text / background | 15.91 | AAA |
| textMuted / background | 5.41 | AA |
| text / surface | 14.85 | AAA |
| textMuted / surface | 5.05 | AA |
| background (white) / accent | 6.30 | AA |
| accent / background | 6.30 | AA |
| text / accentTint | 13.89 | AAA |
| danger / background | 6.57 | AA |

divider / background is 1.36: it is decoration only and never the only signal. The pen circle (accent, with a white halo) is a graphic, so it needs 3:1: accent / background is 6.30.

## Type

One family for everything: Atkinson Hyperlegible Next (OFL, chosen for legibility in dim, crowded hallways). Weights 400 (body), 600 (buttons, labels) and 700 (headings). Headings are bold and larger, in the same family.

Scale in px, iOS base 17, approximately 1.25 ratio:

- caption: 13
- footnote: 15
- body: 17
- title3: 21
- title2: 26
- title1: 33

Line height: body 1.45, headings 1.2. Sentence case everywhere; no all-caps labels.

## Confidence

Every issue shows a word label plus a hatch swatch, drawn in text colour, never colour alone. Likely shows solid fill; Possible shows dense 45° hatch (2px lines, 4px gap); Unsure shows sparse 45° hatch (1px lines, 8px gap) plus dotted outline (3px gap between dots).

Exploration for #6 (not the style yet): the two halves shown apart. Words only is the word in a pill tag (accentTint background, text colour, bold). Scale only is three equal steps in a row (swatch size, space 1 gap): likely fills 3, possible 2, unsure 1, filled steps use that level's hatch, empty steps are an outline only in divider colour. No new tokens.

Words: "Likely", "Possible", "Unsure". Findings are phrased "possible issue, worth asking about"; never claim a legal breach.

## Signature element

Circled annotations on photos: a hand-drawn-looking teal ellipse (3px stroke, slightly irregular, not closed perfectly) around the evidence region, with a thin white halo underneath so it shows on dark mould and pale walls alike, and the accent at 15% opacity inside.

## Shape

Cards radius 16 with a soft shadow instead of a border. Photos radius 12. Buttons and inputs radius 8. Chips are fully rounded (pill). Thin dividers only where white space is not enough.

## Layout

The photo leads each card. A sticky bottom bar holds the main action: a filled teal button with white text. Secondary buttons are outlined in text colour. Tap targets are at least 44pt.

## Spacing

4px grid; screen gutter 16; card padding 20.

## Motion

One moment only: the pen circle draws itself (stroke animation, 400ms) when an issue is first shown. Respect reduce-motion: show it already drawn.

## Voice

Plain, active, sentence case. Buttons say exactly what happens ("Take photo", "Ask about this", "Not an issue"). Offline: "Saved. Will analyse when you're back online." Errors explain what happened and what to do; no apologies. Never claim a property breaches the law; say "possible issue, worth asking about".

## Don't

Airbnb or REA/Domain colours, logos or fonts; colour alone for confidence; extra accent colours; teal on anything but main actions, the pen circle and small highlights.
