import * as React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "@/components/native/theme";

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  /** Centered text, e.g. "or continue with". */
  label?: string;
  /** Left inset, for lists with leading icons. */
  inset?: number;
  style?: StyleProp<ViewStyle>;
};

export function Separator({ orientation = "horizontal", label, inset = 0, style }: SeparatorProps) {
  const { colors } = useTheme();
  const line = { backgroundColor: colors.border };

  if (orientation === "vertical") {
    return <View accessibilityRole="none" style={[styles.vertical, line, style]} />;
  }
  if (!label) {
    return (
      <View
        accessibilityRole="none"
        style={[styles.horizontal, line, { marginLeft: inset }, style]}
      />
    );
  }
  return (
    <View style={[styles.row, style]}>
      <View style={[styles.horizontal, styles.flex, line]} />
      <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>
      <View style={[styles.horizontal, styles.flex, line]} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: { height: StyleSheet.hairlineWidth, alignSelf: "stretch" },
  vertical: { width: StyleSheet.hairlineWidth, alignSelf: "stretch" },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  flex: { flex: 1 },
  label: { fontSize: 12, fontWeight: "500", letterSpacing: 0.2 },
});
