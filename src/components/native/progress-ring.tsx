import * as React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { useTheme } from "@/components/native/theme";

export type ProgressRingProps = {
  /** 0–100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  /** Two colors draw a gradient arc. */
  colors?: [string, string];
  /** Center content. Defaults to the percentage. */
  children?: React.ReactNode;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

let gid = 0;

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  colors: gradient,
  children,
  label,
  style,
}: ProgressRingProps) {
  const { colors } = useTheme();
  const anim = React.useRef(new Animated.Value(0)).current;
  const [shown, setShown] = React.useState(0);
  const id = React.useRef(`ring-${++gid}`).current;

  React.useEffect(() => {
    // SVG props are animated through a listener so it works on every platform.
    const sub = anim.addListener(({ value: v }) => setShown(v));
    Animated.timing(anim, {
      toValue: Math.min(Math.max(value, 0), 100),
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => anim.removeListener(sub);
  }, [value, anim]);

  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const [from, to] = gradient ?? [colors.brand, colors.brand];

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value) }}
      style={[{ width: size, height: size }, style]}
    >
      <View style={{ transform: [{ rotate: "-90deg" }] }}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={from} />
              <Stop offset="1" stopColor={to} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={colors.muted}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={`url(#${id})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${c} ${c}`}
            strokeDashoffset={c * (1 - shown / 100)}
          />
        </Svg>
      </View>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        {children ?? (
          <>
            <Text style={[styles.value, { color: colors.foreground, fontSize: size * 0.22 }]}>
              {Math.round(shown)}
              <Text style={{ fontSize: size * 0.12, color: colors.mutedForeground }}>%</Text>
            </Text>
            {label && (
              <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  value: { fontWeight: "700", letterSpacing: -1, fontVariant: ["tabular-nums"] },
  label: { fontSize: 12, marginTop: 2, fontWeight: "500" },
});
