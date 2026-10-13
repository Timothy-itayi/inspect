import { View } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { PHOTO_ASPECT } from './fixture';
import { t, withAlpha } from './tokens';

/**
 * Placeholder photo drawn in code, not a real or stock photo. Coordinates are a 400x300 drawing
 * that lines up with the regions in fixture.ts.
 */
export function PlaceholderPhoto({ width, label = true }: { width: number; label?: boolean }) {
  const { color, fontWeight } = t;
  return (
    <View accessible accessibilityRole="image" accessibilityLabel="Placeholder photo, drawn in code">
    <Svg width={width} height={width / PHOTO_ASPECT} viewBox="0 0 400 300">
      <Rect width={400} height={300} fill={withAlpha(color.divider, 0.55)} />
      <Rect y={270} width={400} height={30} fill={withAlpha(color.textMuted, 0.35)} />
      <Line x1={0} y1={270} x2={400} y2={270} stroke={color.textMuted} strokeWidth={2} />
      {/* ceiling mould spots */}
      <G fill={color.text} fillOpacity={0.55}>
        <Circle cx={300} cy={26} r={11} />
        <Circle cx={322} cy={20} r={7} />
        <Circle cx={282} cy={34} r={6} />
        <Circle cx={346} cy={34} r={9} />
        <Circle cx={364} cy={20} r={5} />
      </G>
      {/* left window with a blind and a looped cord */}
      <Rect x={24} y={42} width={112} height={90} fill={color.background} stroke={color.textMuted} strokeWidth={3} />
      <Rect x={28} y={46} width={104} height={70} fill={color.textMuted} fillOpacity={0.45} />
      <Path d="M128 116 L128 150 Q122 168 128 172 Q134 168 128 150" fill="none" stroke={color.text} strokeWidth={1.5} />
      {/* right window with a torn, half-hanging curtain */}
      <Rect x={208} y={72} width={144} height={132} fill={color.background} stroke={color.textMuted} strokeWidth={3} />
      <Line x1={280} y1={72} x2={280} y2={204} stroke={color.textMuted} strokeWidth={2} />
      <Path d="M208 66 L282 66 L278 120 L284 150 L272 186 L280 212 L208 212 Z" fill={color.textMuted} fillOpacity={0.4} stroke={color.text} strokeWidth={1.5} />
      <Line x1={208} y1={138} x2={352} y2={138} stroke={color.textMuted} strokeWidth={2} />
      {/* damp tide mark */}
      <Ellipse cx={76} cy={225} rx={36} ry={32} fill={color.textMuted} fillOpacity={0.3} />
      {label && (
      <SvgText
        x={392}
        y={290}
        textAnchor="end"
        fontSize={t.fontSize.footnote}
        fill={color.text}
        fontFamily="AtkinsonHyperlegibleNext_600SemiBold"
        fontWeight={String(fontWeight.semibold)}
      >
        Placeholder photo, drawn in code
      </SvgText>
      )}
    </Svg>
    </View>
  );
}
