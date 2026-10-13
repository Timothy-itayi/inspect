import { StyleSheet, Text, View } from 'react-native';
import { issueLabel } from './accessibility';
import { ConfidenceMark } from './ConfidenceMark';
import { issueName, issues, PHOTO_ASPECT, type Issue } from './fixture';
import { PhotoCanvas } from './PhotoCanvas';
import { rule, ScreenTitle, Sheet } from './shared';
import { t, text } from './tokens';

const THUMB_W = t.space[12] * 2; // 96
const THUMB_H = THUMB_W / PHOTO_ASPECT;

/** Crops the photo around the region (about twice its width) so the circled evidence is legible at thumbnail size. */
function Thumb({ issue, index }: { issue: Issue; index: number }) {
  const { x, y, w, h } = issue.region;
  const crop = Math.min(1, Math.max(w * 2, h * 2, 0.4)); // fraction of photo width shown; height shown is the same fraction
  const left = Math.min(1 - crop, Math.max(0, x + w / 2 - crop / 2));
  const top = Math.min(1 - crop, Math.max(0, y + h / 2 - crop / 2));
  const full = THUMB_W / crop;
  const fullH = full / PHOTO_ASPECT;
  return (
    <View style={{ width: THUMB_W, gap: t.space[1] }}>
      <View style={styles.thumb}>
        <View style={{ position: 'absolute', left: -left * full, top: -top * fullH }}>
          <PhotoCanvas width={full} issues={[issue]} idPrefix={`thumb${index}`} />
        </View>
      </View>
      {/* The crop hides the in-photo notice, so the badge sits outside it. */}
      <Text style={[text.body('caption'), { color: t.color.inkMuted }]}>{t.placeholder.badge}</Text>
    </View>
  );
}

export function ListVariant() {
  return (
    <>
      <ScreenTitle>List</ScreenTitle>
      <Sheet>
        {issues.map((issue, i) => (
          <View key={issue.issueType} testID={`row-${issue.issueType}`}>
            {i > 0 && <View style={[rule, { marginVertical: t.space[4] }]} />}
            <View accessible accessibilityLabel={issueLabel(issue)} style={styles.head}>
              <Thumb issue={issue} index={i} />
              <View style={styles.headText}>
                <Text style={text.heading('title3')}>{issueName(issue.issueType)}</Text>
                <ConfidenceMark level={issue.confidence} />
              </View>
            </View>
            <Text style={[text.body('footnote'), styles.evidence]}>{issue.evidence}</Text>
            <Text style={[text.body(), styles.question]}>{issue.suggestedQuestion}</Text>
          </View>
        ))}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', gap: t.space[3], alignItems: 'flex-start' },
  headText: { flex: 1, gap: t.space[2] },
  thumb: { width: THUMB_W, height: THUMB_H, borderRadius: t.radius.photo, overflow: 'hidden' },
  evidence: { color: t.color.inkMuted, marginTop: t.space[3] },
  question: { marginTop: t.space[2] },
});
