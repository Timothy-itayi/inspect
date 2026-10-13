import { Pressable, StyleSheet, View } from 'react-native';
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
  /** Tap handler; when set, each circle is a button with a 44pt minimum target. */
  onPressIssue?: (issue: Issue) => void;
  selected?: Issue['issueType'];
  idPrefix: string;
};

export function PhotoCanvas({ width, issues, onPressIssue, selected, idPrefix }: Props) {
  const height = width / PHOTO_ASPECT;
  return (
    <View style={{ width, height }}>
      <PlaceholderPhoto width={width} />
      {issues.map((issue, i) => {
        const { x, y, w, h } = issue.region;
        const cw = Math.max(w * width * CIRCLE_GROW, t.annotation.stroke * 4);
        const ch = Math.max(h * height * CIRCLE_GROW, t.annotation.stroke * 4);
        const cx = (x + w / 2) * width;
        const cy = (y + h / 2) * height;
        const hitW = Math.max(cw, MIN_TOUCH);
        const hitH = Math.max(ch, MIN_TOUCH);
        const box = { left: cx - hitW / 2, top: cy - hitH / 2, width: hitW, height: hitH };
        const circle = (
          <View style={styles.center}>
            <PenCircle width={cw} height={ch} seed={i} />
          </View>
        );
        if (!onPressIssue) {
          return (
            <View key={issue.issueType} style={[styles.abs, box]} pointerEvents="none">
              {circle}
            </View>
          );
        }
        return (
          <Pressable
            key={issue.issueType}
            testID={`${idPrefix}-${issue.issueType}`}
            accessibilityRole="button"
            accessibilityLabel={issueLabel(issue)}
            accessibilityState={{ selected: selected === issue.issueType }}
            onPress={() => onPressIssue(issue)}
            style={[styles.abs, box]}
          >
            {circle}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  abs: { position: 'absolute' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
