import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';
import type { ConfidenceLevel } from './tokens';
import { confidenceSteps } from './confidenceSteps';
import { hairline, t, text } from './tokens';

const SIZE = t.space[6];

/** Hatch swatch from design/style.md: solid (likely), dense hatch (possible), sparse hatch + dotted outline (unsure). */
export function ConfidenceSwatch({ level, empty }: { level: ConfidenceLevel; empty?: boolean }) {
  const c = t.confidence[level];
  const lines: number[] = [];
  if (!empty && 'line' in c) {
    const step = (c.line + c.gap) * Math.SQRT2; // spacing along the x axis for 45 degree lines
    for (let x = -SIZE; x < SIZE * 2; x += step) lines.push(x);
  }
  const unsure = level === 'unsure';
  return (
    <Svg width={SIZE} height={SIZE} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Rect
        x={hairline / 2}
        y={hairline / 2}
        width={SIZE - hairline}
        height={SIZE - hairline}
        fill={!empty && c.pattern === 'solid' ? t.color.text : 'none'}
        stroke={empty ? t.color.divider : t.color.text}
        strokeWidth={hairline}
        strokeLinecap={unsure && !empty ? 'round' : undefined}
        strokeDasharray={unsure && !empty ? `0 ${'outlineDotGap' in c ? c.outlineDotGap : 0}` : undefined}
      />
      {lines.map((x) => (
        <Line
          key={x}
          x1={x}
          y1={SIZE}
          x2={x + SIZE}
          y2={0}
          stroke={t.color.text}
          strokeWidth={'line' in c ? c.line : 1}
        />
      ))}
    </Svg>
  );
}

/** Design A: the word in a pill tag, no swatch. */
function WordsTag({ level }: { level: ConfidenceLevel }) {
  return (
    <View style={styles.tag}>
      <Text style={text.heading('footnote')}>{t.confidence[level].label}</Text>
    </View>
  );
}

/** Design B: three steps; filled ones use the level's hatch. Hidden from VoiceOver; the row label carries the word. */
function ScaleBar({ level }: { level: ConfidenceLevel }) {
  const filled = confidenceSteps(level);
  return (
    <View style={styles.row} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {[1, 2, 3].map((n) => (
        <ConfidenceSwatch key={n} level={level} empty={n > filled} />
      ))}
    </View>
  );
}

export type ConfidenceDisplay = 'both' | 'words' | 'scale';

export function ConfidenceMark({ level, display = 'both' }: { level: ConfidenceLevel; display?: ConfidenceDisplay }) {
  if (display === 'words') return <WordsTag level={level} />;
  if (display === 'scale') return <ScaleBar level={level} />;
  return (
    <View style={styles.row}>
      <ConfidenceSwatch level={level} />
      <Text style={[text.body('footnote', true), styles.word]}>{t.confidence[level].label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[2], flexWrap: 'wrap' },
  word: { flexShrink: 1 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: t.color.accentTint,
    borderRadius: t.radius.pill,
    paddingHorizontal: t.space[3],
    paddingVertical: t.space[1],
  },
});
