import { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { penPath } from './penPath';
import { roleColor, t, withAlpha } from './tokens';
import { useReduceMotion } from './useReduceMotion';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = { width: number; height: number; seed: number };

/** Teal pen ellipse with a thin white halo and a 15% teal fill. Draws once over drawMs; already drawn under Reduce Motion. */
export function PenCircle({ width, height, seed }: Props) {
  const halo = t.annotation.stroke + t.annotation.haloExtra * 2;
  const pad = halo;
  const { d, fillD, length } = useMemo(() => penPath(width - pad * 2, height - pad * 2, seed), [width, height, seed, pad]);
  const reduce = useReduceMotion();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduce === null) return;
    if (reduce) {
      progress.setValue(1);
      return;
    }
    progress.setValue(0);
    Animated.timing(progress, { toValue: 1, duration: t.annotation.drawMs, useNativeDriver: false }).start();
  }, [reduce, progress]);

  const offset = progress.interpolate({ inputRange: [0, 1], outputRange: [length, 0] });

  return (
    <Svg width={width} height={height} pointerEvents="none">
      <Path
        d={fillD}
        transform={`translate(${pad} ${pad})`}
        fill={roleColor(t.annotation.fill)}
        fillOpacity={reduce === null ? 0 : t.annotation.fillOpacity}
      />
      {[
        { color: roleColor(t.annotation.haloColor), width: halo },
        { color: roleColor(t.annotation.color), width: t.annotation.stroke },
      ].map((s) => (
        <AnimatedPath
          key={s.width}
          d={d}
          transform={`translate(${pad} ${pad})`}
          fill="none"
          stroke={reduce === null ? withAlpha(s.color, 0) : s.color}
          strokeWidth={s.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${length} ${length}`}
          strokeDashoffset={offset}
        />
      ))}
    </Svg>
  );
}
