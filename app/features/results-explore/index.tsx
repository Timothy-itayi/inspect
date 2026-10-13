import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChecklistVariant } from './ChecklistVariant';
import { ListVariant } from './ListVariant';
import { OverlayVariant } from './OverlayVariant';
import { BackButton, ScreenTitle, Sheet } from './shared';
import { MIN_TOUCH, t, text } from './tokens';

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
    <ScrollView style={styles.board} contentContainerStyle={styles.content}>
      {variant === null ? (
        <>
          <ScreenTitle>Results screen, three ways</ScreenTitle>
          <Sheet>
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
          </Sheet>
        </>
      ) : (
        <>
          <BackButton onPress={() => setVariant(null)} />
          {variant === 'list' && <ListVariant />}
          {variant === 'overlay' && <OverlayVariant gutter={GUTTER} />}
          {variant === 'checklist' && <ChecklistVariant />}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  board: { flex: 1, backgroundColor: t.color.board },
  content: { paddingTop: TOP_INSET, paddingHorizontal: GUTTER, paddingBottom: t.space[10] },
  choice: {
    minHeight: MIN_TOUCH,
    justifyContent: 'center',
    paddingHorizontal: t.space[4],
    borderWidth: 1.5,
    borderColor: t.color.ink,
    borderRadius: t.radius.control,
  },
});
