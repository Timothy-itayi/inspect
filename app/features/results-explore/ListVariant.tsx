import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { issueLabel } from './accessibility';
import { ConfidenceMark, type ConfidenceDisplay } from './ConfidenceMark';
import { issueName, issues, PHOTO_ASPECT, type Issue } from './fixture';
import { PhotoCanvas } from './PhotoCanvas';
import { Card, ScreenTitle } from './shared';
import { t, text } from './tokens';

/** Wide crop of the photo centred on the region, with room round it so the pen circle sits fully inside. */
function Thumb({ issue, width }: { issue: Issue; width: number }) {
  const { x, y, w, h } = issue.region;
  const aspectRatio = t.photo.cardAspect;
  const cw = Math.min(1, Math.max(w * 1.5, h * 2, 0.4)); // fraction of photo width shown
  const ch = cw * (PHOTO_ASPECT / aspectRatio); // fraction of photo height shown
  const left = Math.min(1 - cw, Math.max(0, x + w / 2 - cw / 2));
  const top = Math.min(1 - ch, Math.max(0, y + h / 2 - ch / 2));
  const full = width / cw;
  const fullH = full / PHOTO_ASPECT;
  return (
    <View>
      <View style={{ width, aspectRatio, borderRadius: t.radius.photo, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', left: -left * full, top: -top * fullH }}>
          <PhotoCanvas width={full} issues={[issue]} label={false} />
        </View>
      </View>
      {/* The crop hides the in-photo notice, so the badge sits outside it. */}
      <Text style={[text.body('caption'), styles.badge]}>{t.placeholder.badge}</Text>
    </View>
  );
}

export function ListVariant({ gutter, confidenceDisplay = 'both' }: { gutter: number; confidenceDisplay?: ConfidenceDisplay }) {
  const { width } = useWindowDimensions();
  const photoWidth = width - gutter * 2 - t.space[3] * 2;
  return (
    <>
      <ScreenTitle>List</ScreenTitle>
      <View style={styles.list}>
        {issues.map((issue) => (
          <View key={issue.issueType} testID={`row-${issue.issueType}`}>
            <Card flush>
              <View style={styles.inner}>
                <View accessible accessibilityLabel={issueLabel(issue)} style={styles.head}>
                  <Thumb issue={issue} width={photoWidth} />
                  <View style={styles.headText}>
                    <Text style={text.heading('title2')}>{issueName(issue.issueType)}</Text>
                    <ConfidenceMark level={issue.confidence} display={confidenceDisplay} />
                  </View>
                </View>
                <Text style={[text.body('footnote'), styles.evidence]}>{issue.evidence}</Text>
                <Text style={[text.body('body', true), styles.question]}>{issue.suggestedQuestion}</Text>
              </View>
            </Card>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: { gap: t.space[6] },
  inner: { padding: t.space[3], paddingBottom: t.space[5] },
  head: { gap: t.space[3] },
  headText: { gap: t.space[2], paddingHorizontal: t.space[2] },
  badge: { color: t.color.textMuted, marginTop: t.space[1], paddingHorizontal: t.space[2] },
  evidence: { color: t.color.textMuted, marginTop: t.space[3], paddingHorizontal: t.space[2] },
  question: { marginTop: t.space[2], paddingHorizontal: t.space[2] },
});
