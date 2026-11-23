import * as React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@/components/native/theme";

export type PageIndicatorProps = {
  count: number;
  /**
   * Current page. Pass an Animated value (e.g. scrollX / pageWidth) for dots
   * that track the finger, or a number for discrete updates.
   */
  progress: Animated.Value | Animated.AnimatedInterpolation<number> | number;
  onPress?: (index: number) => void;
  /** Colors default to the theme foreground. */
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
};

const DOT = 7;
const ACTIVE = 22;

export function PageIndicator({
  count,
  progress,
  onPress,
  activeColor,
  inactiveColor,
  style,
}: PageIndicatorProps) {
  const { colors } = useTheme();
  const numeric = typeof progress === "number";
  const driver = React.useRef(new Animated.Value(numeric ? (progress as number) : 0)).current;

  React.useEffect(() => {
    if (numeric) {
      Animated.spring(driver, {
        toValue: progress as number,
        useNativeDriver: false,
        damping: 18,
        stiffness: 200,
      }).start();
    }
  }, [numeric, progress, driver]);

  const p = numeric ? driver : (progress as Animated.Value);
  const on = activeColor ?? colors.foreground;
  const off = inactiveColor ?? colors.borderStrong;

  return (
    <View
      style={[styles.row, style]}
      accessibilityRole="adjustable"
      accessibilityLabel={`Page indicator, ${count} pages`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const range = [i - 1, i, i + 1];
        const dot = (
          <Animated.View
            style={[
              styles.dot,
              {
                width: p.interpolate({
                  inputRange: range,
                  outputRange: [DOT, ACTIVE, DOT],
                  extrapolate: "clamp",
                }),
                backgroundColor: p.interpolate({
                  inputRange: range,
                  outputRange: [off, on, off],
                  extrapolate: "clamp",
                }),
              },
            ]}
          />
        );
        return onPress ? (
          <Pressable
            key={i}
            hitSlop={6}
            onPress={() => onPress(i)}
            accessibilityLabel={`Go to page ${i + 1}`}
          >
            {dot}
          </Pressable>
        ) : (
          <View key={i}>{dot}</View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  dot: { height: DOT, borderRadius: DOT / 2 },
});
