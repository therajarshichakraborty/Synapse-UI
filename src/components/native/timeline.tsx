import * as React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type TimelineEvent = {
  title: string;
  description?: string;
  time?: string;
  icon?: IconName;
  status?: "done" | "current" | "upcoming";
};

export type TimelineProps = { events: TimelineEvent[]; style?: StyleProp<ViewStyle> };

export function Timeline({ events, style }: TimelineProps) {
  const { colors } = useTheme();
  return (
    <View style={style}>
      {events.map((e, i) => {
        const status = e.status ?? "done";
        const last = i === events.length - 1;
        const done = status === "done";
        const current = status === "current";
        return (
          <View key={i} style={styles.row}>
            <View style={styles.rail}>
              <View
                style={[
                  styles.node,
                  done && { backgroundColor: colors.primary, borderColor: colors.primary },
                  current && {
                    backgroundColor: colors.background,
                    borderColor: colors.brand,
                    borderWidth: 2,
                  },
                  status === "upcoming" && {
                    backgroundColor: colors.background,
                    borderColor: colors.borderStrong,
                  },
                ]}
              >
                {current && <View style={[styles.pulse, { backgroundColor: colors.brand }]} />}
                {done && (
                  <Icon
                    name={e.icon ?? "check"}
                    size={12}
                    strokeWidth={3}
                    color={colors.primaryForeground}
                  />
                )}
                {status === "upcoming" && e.icon && (
                  <Icon name={e.icon} size={12} color={colors.subtle} />
                )}
              </View>
              {!last && (
                <View
                  style={[styles.line, { backgroundColor: done ? colors.primary : colors.border }]}
                />
              )}
            </View>
            <View style={[styles.body, !last && { paddingBottom: 22 }]}>
              <View style={styles.head}>
                <Text
                  style={[
                    styles.title,
                    { color: status === "upcoming" ? colors.mutedForeground : colors.foreground },
                  ]}
                >
                  {e.title}
                </Text>
                {e.time && <Text style={[styles.time, { color: colors.subtle }]}>{e.time}</Text>}
              </View>
              {e.description && (
                <Text style={[styles.description, { color: colors.mutedForeground }]}>
                  {e.description}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 14 },
  rail: { alignItems: "center", width: 24 },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  pulse: { width: 8, height: 8, borderRadius: 4 },
  line: { width: 2, flex: 1, borderRadius: 1, marginVertical: 4 },
  body: { flex: 1, paddingTop: 2 },
  head: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: 8 },
  title: { flex: 1, fontSize: 15, fontWeight: "600" },
  time: { fontSize: 12, fontVariant: ["tabular-nums"] },
  description: { fontSize: 14, lineHeight: 20, marginTop: 3 },
});
