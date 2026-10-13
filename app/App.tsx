import { AppFonts } from './features/results-explore/fonts';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { ResultsExplore } from './features/results-explore';

// Variant switcher until real navigation exists (issue #3).
export default function App() {
  const [loaded] = useFonts(AppFonts);
  if (!loaded) return null;
  return (
    <>
      <ResultsExplore />
      <StatusBar style="dark" />
    </>
  );
}
