import * as React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { Sparkline } from "@/components/native/sparkline";
import { useTheme } from "@/components/native/theme";

export type StatCardProps = {
  label: string;
  value: string;
  /** Percent change, e.g. 12.4 or -3.1. */
  delta?: number;
  /** Caption next to the delta, e.g. "vs last week". */
  caption?: string;
  icon?: IconName;
  /** Data for an inline sparkline. */
  trend?: number[];
  style?: StyleProp<ViewStyle>;
};

export function StatCard({ label, value, delta, caption, icon, trend, style }: StatCardProps) {
  const { colors } = useTheme();
  const up = (delta ?? 0) >= 0;
  const tone = up ? colors.success : colors.destructive;

  return (
    <View
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}
    >
      <View style={styles.top}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>
        {icon && (
          <View style={[styles.icon, { backgroundColor: colors.muted }]}>
            <Icon name={icon} size={15} />
          </View>
        )}
      </View>
      <Text
        style={[styles.value, { color: colors.foreground }]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {value}
      </Text>
      <View style={styles.bottom}>
        {delta != null && (
          <View
            style={[
              styles.delta,
              { backgroundColor: up ? colors.successSoft : colors.destructiveSoft },
            ]}
          >
            <Icon
              name={up ? "trending-up" : "trending-down"}
              size={13}
              strokeWidth={2.5}
              color={tone}
            />
            <Text style={[styles.deltaText, { color: tone }]}>
              {up ? "+" : ""}
              {delta.toFixed(1)}%
            </Text>
          </View>
        )}
        {caption && (
          <Text style={[styles.caption, { color: colors.mutedForeground }]}>{caption}</Text>
        )}
      </View>
      {trend && trend.length > 1 && (
        <Sparkline data={trend} height={44} color={tone} style={styles.spark} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 22, borderWidth: 1, padding: 16, gap: 6, overflow: "hidden" },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontSize: 13, fontWeight: "500" },
  icon: { width: 28, height: 28, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  value: { fontSize: 30, fontWeight: "700", letterSpacing: -1, fontVariant: ["tabular-nums"] },
  bottom: { flexDirection: "row", alignItems: "center", gap: 8 },
  delta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    height: 22,
    borderRadius: 11,
  },
  deltaText: { fontSize: 12, fontWeight: "700", fontVariant: ["tabular-nums"] },
  caption: { fontSize: 12 },
  spark: { marginTop: 8, marginHorizontal: -16, marginBottom: -16 },
});
