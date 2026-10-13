import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MIN_TOUCH, sheetBorder, t, text, withAlpha } from './tokens';

/** A paper sheet on the kraft board. */
export function Sheet({ children, flush }: { children: ReactNode; flush?: boolean }) {
  return <View style={[styles.sheet, !flush && { padding: t.space[5] }]}>{children}</View>;
}

export function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable testID="back" accessibilityRole="button" accessibilityLabel="Back to variants" onPress={onPress} style={styles.back}>
      <Text style={text.body('body', true)}>Back</Text>
    </Pressable>
  );
}

export function ScreenTitle({ children }: { children: string }) {
  return <Text style={[text.heading('title2'), { marginBottom: t.space[3] }]}>{children}</Text>;
}

export const rule = { height: 1, backgroundColor: t.color.rule };

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: t.color.paper,
    borderRadius: t.radius.sheet,
    borderWidth: sheetBorder.width,
    borderColor: withAlpha(t.color.ink, sheetBorder.opacity),
    overflow: 'hidden',
  },
  back: { minHeight: MIN_TOUCH, minWidth: MIN_TOUCH, justifyContent: 'center', alignSelf: 'flex-start' },
});
