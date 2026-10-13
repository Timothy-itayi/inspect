import { useState } from 'react';
import { AccessibilityInfo, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ConfidenceMark } from './ConfidenceMark';
import { issueName, issues, type Issue } from './fixture';
import { issueLabel } from './accessibility';
import { PhotoCanvas } from './PhotoCanvas';
import { positionPhrase } from './region';
import { ScreenTitle, Sheet } from './shared';
import { t, text } from './tokens';

export function OverlayVariant({ gutter }: { gutter: number }) {
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<Issue | null>(null);
  const sheetBorderAllowance = 2; // the sheet's 1px border each side
  const photoWidth = width - gutter * 2 - sheetBorderAllowance;
  return (
    <>
      <ScreenTitle>On the photo</ScreenTitle>
      <Sheet flush>
        <PhotoCanvas
          width={photoWidth}
          issues={issues}
          idPrefix="circle"
          selected={selected?.issueType}
          onPressIssue={(issue) => {
            setSelected(issue);
            AccessibilityInfo.announceForAccessibility(`${issueLabel(issue)} ${issue.suggestedQuestion}`);
          }}
        />
        <View style={styles.detail} testID="issue-detail">
          {selected ? (
            <>
              <Text style={text.heading('title3')}>{issueName(selected.issueType)}</Text>
              <View style={styles.meta}>
                <ConfidenceMark level={selected.confidence} />
                <Text style={[text.body('footnote'), { color: t.color.inkMuted, flexShrink: 1 }]}>{positionPhrase(selected.region)}</Text>
              </View>
              <Text style={text.body()}>{selected.evidence}</Text>
              <Text style={text.body('body', true)}>{selected.suggestedQuestion}</Text>
            </>
          ) : (
            <Text style={[text.body(), { color: t.color.inkMuted }]}>Tap a circle to see the possible issue and the question to ask.</Text>
          )}
        </View>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  detail: { padding: t.space[5], gap: t.space[2] },
  meta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', columnGap: t.space[3], rowGap: t.space[1] },
});
