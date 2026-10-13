import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cardShadow, MIN_TOUCH, t, text } from './tokens';

/** A white card with a soft shadow. */
export function Card({ children, flush }: { children: ReactNode; flush?: boolean }) {
  return <View style={[styles.card, !flush && { padding: t.space[5] }]}>{children}</View>;
}

export function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable testID="back" accessibilityRole="button" accessibilityLabel="Back to variants" onPress={onPress} style={styles.back}>
      <Text style={[text.body('body', true), { flexShrink: 1 }]}>Back</Text>
    </Pressable>
  );
}

export function ScreenTitle({ children }: { children: string }) {
  return <Text style={[text.heading('title1'), { marginBottom: t.space[4] }]}>{children}</Text>;
}

export const rule = { height: 1, backgroundColor: t.color.divider };

const styles = StyleSheet.create({
  card: { backgroundColor: t.color.background, borderRadius: t.radius.card, ...cardShadow },
  back: { minHeight: MIN_TOUCH, minWidth: MIN_TOUCH, justifyContent: 'center', alignSelf: 'flex-start', paddingVertical: t.space[1] },
});
