import * as React from "react";
import { Animated, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type StepsProps = {
  steps: string[];
  /** Zero-based index of the active step. */
  current: number;
  /** "dots" shows labels under numbered nodes; "bar" shows segmented progress. */
  variant?: "dots" | "bar";
  style?: StyleProp<ViewStyle>;
};

function Connector({ done }: { done: boolean }) {
  const { colors } = useTheme();
  const anim = React.useRef(new Animated.Value(done ? 1 : 0)).current;
  React.useEffect(() => {
    Animated.timing(anim, { toValue: done ? 1 : 0, duration: 360, useNativeDriver: false }).start();
  }, [done, anim]);
  return (
    <View style={[styles.connector, { backgroundColor: colors.border }]}>
      <Animated.View
        style={[
          styles.connectorFill,
          {
            backgroundColor: colors.primary,
            width: anim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
          },
        ]}
      />
    </View>
  );
}

export function Steps({ steps, current, variant = "dots", style }: StepsProps) {
  const { colors } = useTheme();

  if (variant === "bar") {
    return (
      <View style={style} accessibilityLabel={`Step ${current + 1} of ${steps.length}`}>
        <View style={styles.barHead}>
          <Text style={[styles.barStep, { color: colors.mutedForeground }]}>
            Step {current + 1} of {steps.length}
          </Text>
          <Text style={[styles.barTitle, { color: colors.foreground }]}>{steps[current]}</Text>
        </View>
        <View style={styles.segments}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.segment,
                { backgroundColor: i <= current ? colors.primary : colors.muted },
              ]}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.row, style]} accessibilityLabel={`Step ${current + 1} of ${steps.length}`}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            {i > 0 && <Connector done={i <= current} />}
            <View style={styles.item}>
              <View
                style={[
                  styles.node,
                  done && { backgroundColor: colors.primary, borderColor: colors.primary },
                  active && {
                    borderColor: colors.primary,
                    backgroundColor: colors.background,
                    borderWidth: 2,
                  },
                  !done && !active && { borderColor: colors.border, backgroundColor: colors.muted },
                ]}
              >
                {done ? (
                  <Icon name="check" size={14} strokeWidth={3} color={colors.primaryForeground} />
                ) : (
                  <Text
                    style={[
                      styles.num,
                      { color: active ? colors.foreground : colors.mutedForeground },
                    ]}
                  >
                    {i + 1}
                  </Text>
                )}
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  { color: active || done ? colors.foreground : colors.mutedForeground },
                ]}
              >
                {label}
              </Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start" },
  item: { alignItems: "center", gap: 8, width: 64 },
  node: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  num: { fontSize: 13, fontWeight: "600" },
  label: { fontSize: 12, fontWeight: "500" },
  connector: {
    flex: 1,
    height: 2,
    borderRadius: 1,
    marginTop: 14,
    marginHorizontal: -14,
    overflow: "hidden",
  },
  connectorFill: { height: "100%" },
  barHead: { gap: 2, marginBottom: 12 },
  barStep: { fontSize: 12, fontWeight: "600", letterSpacing: 0.4, textTransform: "uppercase" },
  barTitle: { fontSize: 18, fontWeight: "600", letterSpacing: -0.3 },
  segments: { flexDirection: "row", gap: 6 },
  segment: { flex: 1, height: 4, borderRadius: 2 },
});
