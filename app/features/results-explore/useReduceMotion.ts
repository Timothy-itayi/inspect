import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { readReduceMotion } from './reduceMotion';

/** null until known; callers wait for it so a circle never flashes then redraws. */
export function useReduceMotion(): boolean | null {
  const [reduce, setReduce] = useState<boolean | null>(null);
  useEffect(() => {
    let live = true;
    readReduceMotion(() => AccessibilityInfo.isReduceMotionEnabled()).then((v) => live && setReduce(v));
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduce);
    return () => {
      live = false;
      sub.remove();
    };
  }, []);
  return reduce;
}
