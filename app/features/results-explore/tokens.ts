import raw from '../../../design/tokens.json';

// Everything visual comes from design/tokens.json. The only values defined here are the
// ones design/style.md states in prose but tokens.json doesn't carry yet.
export const t = raw;
/** Annotation colours are named roles in tokens.json; this resolves them to hex. */
export const roleColor = (role: string) => raw.color[role as keyof typeof raw.color];
export type ConfidenceLevel = keyof typeof raw.confidence;

export const MIN_TOUCH = raw.touch.min;
/** Thin strokes (swatch outline, checklist boxes, control borders) use the hatch line width. */
export const hairline = raw.confidence.unsure.line;

/** Soft card shadow from the shadow token (iOS shadow props plus Android elevation). */
export const cardShadow = {
  shadowColor: raw.shadow.color,
  shadowOpacity: raw.shadow.opacity,
  shadowOffset: { width: 0, height: raw.shadow.offsetY },
  shadowRadius: raw.shadow.blur,
  elevation: raw.shadow.elevation,
};

export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
}

// Loaded family names from @expo-google-fonts, keyed by the weights in tokens.json.
const families: Record<number, string> = {
  [raw.fontWeight.regular]: 'AtkinsonHyperlegibleNext_400Regular',
  [raw.fontWeight.semibold]: 'AtkinsonHyperlegibleNext_600SemiBold',
  [raw.fontWeight.bold]: 'AtkinsonHyperlegibleNext_700Bold',
};

export const text = {
  heading: (size: keyof typeof raw.fontSize) => ({
    fontFamily: families[raw.fontWeight.bold],
    fontSize: raw.fontSize[size],
    lineHeight: raw.fontSize[size] * raw.lineHeight.heading,
    color: raw.color.text,
  }),
  body: (size: keyof typeof raw.fontSize = 'body', strong = false) => ({
    fontFamily: families[strong ? raw.fontWeight.semibold : raw.fontWeight.regular],
    fontSize: raw.fontSize[size],
    lineHeight: raw.fontSize[size] * raw.lineHeight.body,
    color: raw.color.text,
  }),
};
