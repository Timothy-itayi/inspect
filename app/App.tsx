import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { AppFonts } from './features/results-explore/fonts';
import { ResultsExplore } from './features/results-explore';
import { t } from './features/results-explore/tokens';

// Variant switcher until real navigation exists (issue #3).
export default function App() {
  const [loaded, error] = useFonts(AppFonts);
  // On a font error we render anyway; unloaded families fall back to the system font.
  if (!loaded && !error) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={t.color.ink} accessibilityLabel="Loading" />
      </View>
    );
  }
  return (
    <>
      <ResultsExplore />
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: t.color.board, alignItems: 'center', justifyContent: 'center' },
});
