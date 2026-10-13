import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChecklistVariant } from './ChecklistVariant';
import { ListVariant } from './ListVariant';
import { OverlayVariant } from './OverlayVariant';
import { BackButton, ScreenTitle } from './shared';
import { hairline, MIN_TOUCH, t, text } from './tokens';

type Variant = 'list' | 'overlay' | 'checklist';

const choices: { id: Variant; label: string }[] = [
  { id: 'list', label: 'List' },
  { id: 'overlay', label: 'On the photo' },
  { id: 'checklist', label: 'Checklist' },
];

const GUTTER = t.space[4];
// shortcut: no safe-area package yet, so a fixed top inset clears the notch. Replace when real navigation lands.
const TOP_INSET = t.space[12] + t.space[3];

export function ResultsExplore() {
  const [variant, setVariant] = useState<Variant | null>(null);
  return (
    <View style={styles.board}>
      {/* Opaque strip so scrolled content never draws under the status bar. */}
      <View style={styles.statusStrip} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {variant === null ? (
        <>
          <ScreenTitle>Results screen, three ways</ScreenTitle>
          <Text style={[text.body(), { marginBottom: t.space[4] }]}>
            The same photo and four possible issues, shown three ways. Pick one to compare.
          </Text>
          <View style={{ gap: t.space[3] }}>
            {choices.map((c) => (
              <Pressable
                key={c.id}
                testID={`variant-${c.id}`}
                accessibilityRole="button"
                onPress={() => setVariant(c.id)}
                style={styles.choice}
              >
                <Text style={text.body('body', true)}>{c.label}</Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : (
        <>
          <BackButton onPress={() => setVariant(null)} />
          {variant === 'list' && <ListVariant gutter={GUTTER} />}
          {variant === 'overlay' && <OverlayVariant gutter={GUTTER} />}
          {variant === 'checklist' && <ChecklistVariant />}
        </>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  board: { flex: 1, backgroundColor: t.color.background },
  statusStrip: { height: TOP_INSET, backgroundColor: t.color.background },
  scroll: { flex: 1 },
  content: { paddingTop: t.space[2], paddingHorizontal: GUTTER, paddingBottom: t.space[10] },
  choice: {
    minHeight: MIN_TOUCH,
    justifyContent: 'center',
    paddingHorizontal: t.space[4],
    borderWidth: hairline,
    borderColor: t.color.text,
    borderRadius: t.radius.control,
  },
});
