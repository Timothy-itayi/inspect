import raw from '../../../design/tokens.json';

// Everything visual comes from design/tokens.json. The only values defined here are the
// ones design/style.md states in prose but tokens.json doesn't carry yet.
export const t = raw;
export type ConfidenceLevel = keyof typeof raw.confidence;

// shortcut: style.md says "1px ink at 12% border" and tokens.json has no entry for it. Move into tokens.json when the design system next changes.
export const sheetBorder = { width: 1, opacity: 0.12 };
// Apple HIG minimum touch target in points; the issue's acceptance criteria require it.
export const MIN_TOUCH = 44;

export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
}

// Loaded family names from @expo-google-fonts, keyed by the weights in tokens.json.
const headingFamilies: Record<number, string> = {
  [raw.fontWeight.headingRegular]: 'Alegreya_500Medium',
  [raw.fontWeight.headingBold]: 'Alegreya_700Bold',
};
const bodyFamilies: Record<number, string> = {
  [raw.fontWeight.body]: 'AtkinsonHyperlegibleNext_400Regular',
  [raw.fontWeight.bodyStrong]: 'AtkinsonHyperlegibleNext_600SemiBold',
};

export const text = {
  heading: (size: keyof typeof raw.fontSize, bold = true) => ({
    fontFamily: headingFamilies[bold ? raw.fontWeight.headingBold : raw.fontWeight.headingRegular],
    fontSize: raw.fontSize[size],
    lineHeight: raw.fontSize[size] * raw.lineHeight.heading,
    color: raw.color.ink,
  }),
  body: (size: keyof typeof raw.fontSize = 'body', strong = false) => ({
    fontFamily: bodyFamilies[strong ? raw.fontWeight.bodyStrong : raw.fontWeight.body],
    fontSize: raw.fontSize[size],
    lineHeight: raw.fontSize[size] * raw.lineHeight.body,
    color: raw.color.ink,
  }),
};
