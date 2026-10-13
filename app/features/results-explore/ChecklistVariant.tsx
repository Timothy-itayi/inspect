import { StyleSheet, Text, View } from 'react-native';
import { ConfidenceMark } from './ConfidenceMark';
import { issues, V1_TYPES } from './fixture';
import { rule, ScreenTitle, Sheet } from './shared';
import { MIN_TOUCH, t, text } from './tokens';

export function ChecklistVariant() {
  return (
    <>
      <ScreenTitle>Checklist</ScreenTitle>
      <Sheet>
        {V1_TYPES.map(({ issueType, name }, i) => {
          const issue = issues.find((x) => x.issueType === issueType);
          const label = issue
            ? `Worth asking: ${name}. Confidence: ${t.confidence[issue.confidence].label.toLowerCase()}. ${issue.evidence}`
            : `${name}. Nothing spotted in these photos.`;
          return (
            <View key={issueType} testID={`check-${issueType}`}>
              {i > 0 && <View style={[rule, { marginVertical: t.space[3] }]} />}
              <View accessible accessibilityLabel={label} style={styles.row}>
                <View style={[styles.box, issue && styles.boxFlagged]}>
                  {issue && <Text style={text.body('body', true)}>?</Text>}
                </View>
                <View style={styles.rowText}>
                  <Text style={text.heading('title3')}>{name}</Text>
                  {issue ? (
                    <>
                      <View style={styles.flag}>
                        <Text style={text.body('footnote', true)}>Worth asking</Text>
                      </View>
                      <ConfidenceMark level={issue.confidence} />
                      <Text style={[text.body('footnote'), { color: t.color.inkMuted }]}>{issue.evidence}</Text>
                    </>
                  ) : (
                    <Text style={[text.body('footnote'), { color: t.color.inkMuted }]}>Nothing spotted in these photos</Text>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: t.space[3], minHeight: MIN_TOUCH },
  box: {
    width: t.space[6],
    height: t.space[6],
    marginTop: t.space[1],
    borderWidth: 1.5,
    borderColor: t.color.ink,
    borderRadius: t.radius.sheet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFlagged: { backgroundColor: t.color.highlight },
  rowText: { flex: 1, gap: t.space[1] },
  flag: { alignSelf: 'flex-start', backgroundColor: t.color.highlight, paddingHorizontal: t.space[2], borderRadius: t.radius.sheet },
});
