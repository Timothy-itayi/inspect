import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';
import type { ConfidenceLevel } from './tokens';
import { hairline, t, text } from './tokens';

const SIZE = t.space[6];

/** Hatch swatch from design/style.md: solid (likely), dense hatch (possible), sparse hatch + dotted outline (unsure). */
export function ConfidenceSwatch({ level }: { level: ConfidenceLevel }) {
  const c = t.confidence[level];
  const lines: number[] = [];
  if ('line' in c) {
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
        fill={c.pattern === 'solid' ? t.color.text : 'none'}
        stroke={t.color.text}
        strokeWidth={hairline}
        strokeLinecap={unsure ? 'round' : undefined}
        strokeDasharray={unsure ? `0 ${'outlineDotGap' in c ? c.outlineDotGap : 0}` : undefined}
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

export function ConfidenceMark({ level }: { level: ConfidenceLevel }) {
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
});
