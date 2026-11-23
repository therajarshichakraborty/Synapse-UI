import * as React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  /** Shortcut for a circle of this diameter. */
  circle?: number;
  style?: StyleProp<ViewStyle>;
};

/** One shared clock keeps every skeleton on screen pulsing in sync. */
const clock = new Animated.Value(0);
let users = 0;
let loop: Animated.CompositeAnimation | null = null;

function useClock() {
  React.useEffect(() => {
    users++;
    if (!loop) {
      loop = Animated.loop(
        Animated.timing(clock, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: nativeDriver,
        }),
      );
      loop.start();
    }
    return () => {
      users--;
      if (users === 0 && loop) {
        loop.stop();
        loop = null;
        clock.setValue(0);
      }
    };
  }, []);
  return clock;
}

export function Skeleton({
  width = "100%",
  height = 16,
  radius = 8,
  circle,
  style,
}: SkeletonProps) {
  const { colors } = useTheme();
  const t = useClock();
  const size = circle
    ? { width: circle, height: circle, borderRadius: circle / 2 }
    : { width, height, borderRadius: radius };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[styles.base, size, { backgroundColor: colors.muted }, style]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors.borderStrong,
            opacity: t.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.55, 0] }),
          },
        ]}
      />
    </View>
  );
}

/** A few lines of text-shaped skeletons; the last is shorter. */
export function SkeletonText({ lines = 3, gap = 10 }: { lines?: number; gap?: number }) {
  return (
    <View style={{ gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={12} width={i === lines - 1 ? "62%" : "100%"} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: "hidden" },
});
