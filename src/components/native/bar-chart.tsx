import * as React from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@/components/native/theme";

export type BarDatum = { label: string; value: number };

export type BarChartProps = {
  data: BarDatum[];
  height?: number;
  /** Index highlighted initially. Tapping a bar changes it. */
  defaultActive?: number;
  formatValue?: (v: number) => string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

function Bar({
  ratio,
  delay,
  active,
  color,
  muted,
  height,
}: {
  ratio: number;
  delay: number;
  active: boolean;
  color: string;
  muted: string;
  height: number;
}) {
  const grow = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(grow, {
      toValue: ratio,
      duration: 700,
      delay,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: false,
    }).start();
  }, [ratio, delay, grow]);
  return (
    <View style={[styles.slot, { height }]}>
      <Animated.View
        style={[
          styles.bar,
          {
            height: grow.interpolate({ inputRange: [0, 1], outputRange: [0, height] }),
            backgroundColor: active ? color : muted,
          },
        ]}
      />
    </View>
  );
}

export function BarChart({
  data,
  height = 160,
  defaultActive,
  formatValue = (v) => String(v),
  color,
  style,
}: BarChartProps) {
  const { colors } = useTheme();
  const [active, setActive] = React.useState(defaultActive ?? data.length - 1);
  const max = Math.max(...data.map((d) => d.value), 1);
  const tint = color ?? colors.brand;
  const current = data[active];

  return (
    <View style={style}>
      {current && (
        <View style={styles.readout}>
          <Text style={[styles.readoutValue, { color: colors.foreground }]}>
            {formatValue(current.value)}
          </Text>
          <Text style={[styles.readoutLabel, { color: colors.mutedForeground }]}>
            {current.label}
          </Text>
        </View>
      )}
      <View style={styles.chart}>
        {/* Guide lines */}
        <View pointerEvents="none" style={[styles.guides, { height }]}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.guide, { borderColor: colors.border }]} />
          ))}
        </View>
        {data.map((d, i) => (
          <Pressable
            key={d.label}
            accessibilityRole="button"
            accessibilityLabel={`${d.label}: ${formatValue(d.value)}`}
            onPress={() => setActive(i)}
            style={styles.col}
          >
            <Bar
              ratio={d.value / max}
              delay={i * 50}
              active={i === active}
              color={tint}
              muted={colors.muted}
              height={height}
            />
            <Text
              style={[
                styles.label,
                { color: i === active ? colors.foreground : colors.mutedForeground },
              ]}
            >
              {d.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  readout: { marginBottom: 16 },
  readoutValue: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.8,
    fontVariant: ["tabular-nums"],
  },
  readoutLabel: { fontSize: 13, marginTop: 1 },
  chart: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  guides: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
  },
  guide: { borderTopWidth: StyleSheet.hairlineWidth, borderStyle: "dashed" },
  col: { flex: 1, alignItems: "center", gap: 8 },
  slot: { width: "100%", justifyContent: "flex-end" },
  bar: { width: "100%", borderRadius: 8, minHeight: 4 },
  label: { fontSize: 11, fontWeight: "500" },
});
