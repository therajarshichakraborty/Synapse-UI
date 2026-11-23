import * as React from "react";
import { Animated, Easing, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type TypingIndicatorProps = {
  /** Wrap the dots in a chat bubble. */
  bubble?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function TypingIndicator({ bubble = true, color, style }: TypingIndicatorProps) {
  const { colors } = useTheme();
  const dots = React.useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  React.useEffect(() => {
    const loops = dots.map((d, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(d, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: nativeDriver,
          }),
          Animated.timing(d, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.quad),
            useNativeDriver: nativeDriver,
          }),
          Animated.delay((2 - i) * 150 + 250),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [dots]);

  const tint = color ?? colors.mutedForeground;

  return (
    <View
      accessibilityLabel="Typing"
      style={[styles.row, bubble && [styles.bubble, { backgroundColor: colors.muted }], style]}
    >
      {dots.map((d, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: tint,
              opacity: d.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }),
              transform: [
                { translateY: d.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start" },
  bubble: { height: 40, paddingHorizontal: 16, borderRadius: 20, borderBottomLeftRadius: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
