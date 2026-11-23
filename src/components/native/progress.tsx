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
import { useTheme } from "@/components/native/theme";

export type ProgressProps = {
  /** 0–100. Omit for an indeterminate bar. */
  value?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "primary" | "brand" | "success" | "warning" | "destructive";
  style?: StyleProp<ViewStyle>;
};

const heights = { sm: 4, md: 8, lg: 12 };

export function Progress({
  value,
  label,
  showValue,
  size = "md",
  tone = "primary",
  style,
}: ProgressProps) {
  const { colors } = useTheme();
  const anim = React.useRef(new Animated.Value(0)).current;
  const indet = React.useRef(new Animated.Value(0)).current;
  const [width, setWidth] = React.useState(0);
  const indeterminate = value == null;

  React.useEffect(() => {
    if (indeterminate) return;
    Animated.timing(anim, {
      toValue: Math.min(Math.max(value!, 0), 100),
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, indeterminate, anim]);

  React.useEffect(() => {
    if (!indeterminate) return;
    const loop = Animated.loop(
      Animated.timing(indet, {
        toValue: 1,
        duration: 1300,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [indeterminate, indet]);

  const h = heights[size];
  const color = colors[tone];

  return (
    <View style={[{ gap: 8 }, style]}>
      {(label || showValue) && (
        <View style={styles.labels}>
          {label && <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>}
          {showValue && !indeterminate && (
            <Text style={[styles.value, { color: colors.mutedForeground }]}>
              {Math.round(value!)}%
            </Text>
          )}
        </View>
      )}
      <View
        accessibilityRole="progressbar"
        accessibilityValue={indeterminate ? undefined : { min: 0, max: 100, now: value }}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        style={[styles.track, { height: h, borderRadius: h / 2, backgroundColor: colors.muted }]}
      >
        <Animated.View
          style={[
            styles.bar,
            { borderRadius: h / 2, backgroundColor: color },
            indeterminate
              ? {
                  width: "40%",
                  transform: [
                    {
                      translateX: indet.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-width * 0.4, width],
                      }),
                    },
                  ],
                }
              : { width: anim.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labels: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { fontSize: 14, fontWeight: "500" },
  value: { fontSize: 13, fontVariant: ["tabular-nums"] },
  track: { overflow: "hidden" },
  bar: { height: "100%" },
});
