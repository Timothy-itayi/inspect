import { GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native';
import { issueLabel } from './accessibility';
import { PHOTO_ASPECT, type Issue } from './fixture';
import { PenCircle } from './PenCircle';
import { PlaceholderPhoto } from './PlaceholderPhoto';
import { MIN_TOUCH, t } from './tokens';

// The pen circle sits a little outside the region so it rings the evidence rather than cutting it.
const CIRCLE_GROW = 1.2;

type Props = {
  width: number;
  issues: Issue[];
  /** When set, the photo is interactive: a tap picks the circle whose centre is nearest. */
  onPressIssue?: (issue: Issue) => void;
  selected?: Issue['issueType'];
  /** Test ID prefix; only used when the photo is interactive. */
  idPrefix?: string;
  /** Draw the "Placeholder photo" text inside the image. */
  label?: boolean;
};

export function PhotoCanvas({ width, issues, onPressIssue, selected, idPrefix, label }: Props) {
  const height = width / PHOTO_ASPECT;
  const centres = issues.map((i) => ({
    issue: i,
    cx: (i.region.x + i.region.w / 2) * width,
    cy: (i.region.y + i.region.h / 2) * height,
  }));

  // One touch surface over the photo resolves a tap to the nearest centre, so overlapping circles are never ambiguous.
  const onTap = (e: GestureResponderEvent) => {
    if (!onPressIssue) return;
    const { locationX: x, locationY: y } = e.nativeEvent;
    let best = centres[0];
    for (const c of centres) {
      if (Math.hypot(c.cx - x, c.cy - y) < Math.hypot(best.cx - x, best.cy - y)) best = c;
    }
    onPressIssue(best.issue);
  };

  return (
    <View style={{ width, height }}>
      <PlaceholderPhoto width={width} label={label} />
      {issues.map((issue, i) => {
        const { w, h } = issue.region;
        const cw = Math.max(w * width * CIRCLE_GROW, t.annotation.stroke * 4);
        const ch = Math.max(h * height * CIRCLE_GROW, t.annotation.stroke * 4);
        const { cx, cy } = centres[i];
        const box = { left: cx - cw / 2, top: cy - ch / 2, width: cw, height: ch };
        const circle = <PenCircle width={cw} height={ch} seed={i} />;
        if (!onPressIssue) {
          return (
            <View key={issue.issueType} style={[styles.abs, box]} pointerEvents="none">
              {circle}
            </View>
          );
        }
        // VoiceOver reaches each issue through its own element; double-tap fires onAccessibilityTap, no geometry needed.
        return (
          <View
            key={issue.issueType}
            testID={`${idPrefix}-${issue.issueType}`}
            accessible
            accessibilityRole="button"
            accessibilityLabel={issueLabel(issue)}
            accessibilityState={{ selected: selected === issue.issueType }}
            onAccessibilityTap={() => onPressIssue(issue)}
            pointerEvents="none"
            style={[styles.abs, box, { minWidth: MIN_TOUCH, minHeight: MIN_TOUCH }]}
          >
            {circle}
          </View>
        );
      })}
      {onPressIssue && <Pressable accessible={false} onPress={onTap} style={StyleSheet.absoluteFill} />}
    </View>
  );
}

const styles = StyleSheet.create({
  abs: { position: 'absolute' },
});
