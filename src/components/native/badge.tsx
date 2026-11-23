import * as React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type BadgeTone = "neutral" | "brand" | "success" | "warning" | "destructive";
export type BadgeVariant = "solid" | "soft" | "outline";

export type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  icon?: IconName;
  /** Leading status dot. */
  dot?: boolean;
  size?: "sm" | "md";
  style?: StyleProp<ViewStyle>;
};

export function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  icon,
  dot,
  size = "md",
  style,
}: BadgeProps) {
  const { colors } = useTheme();
  const map = {
    neutral: {
      solid: colors.primary,
      on: colors.primaryForeground,
      soft: colors.muted,
      text: colors.foreground,
    },
    brand: {
      solid: colors.brand,
      on: colors.brandForeground,
      soft: colors.brandSoft,
      text: colors.brand,
    },
    success: {
      solid: colors.success,
      on: "#ffffff",
      soft: colors.successSoft,
      text: colors.success,
    },
    warning: {
      solid: colors.warning,
      on: "#ffffff",
      soft: colors.warningSoft,
      text: colors.warning,
    },
    destructive: {
      solid: colors.destructive,
      on: "#ffffff",
      soft: colors.destructiveSoft,
      text: colors.destructive,
    },
  }[tone];

  const fg = variant === "solid" ? map.on : map.text;
  return (
    <View
      style={[
        styles.badge,
        size === "sm" ? styles.sm : styles.md,
        variant === "solid" && { backgroundColor: map.solid },
        variant === "soft" && { backgroundColor: map.soft },
        variant === "outline" && { borderWidth: 1, borderColor: colors.border },
        style,
      ]}
    >
      {dot && (
        <View style={[styles.dot, { backgroundColor: variant === "solid" ? map.on : map.solid }]} />
      )}
      {icon && <Icon name={icon} size={size === "sm" ? 11 : 13} strokeWidth={2.4} color={fg} />}
      <Text
        style={[
          styles.text,
          {
            color: variant === "outline" ? colors.foreground : fg,
            fontSize: size === "sm" ? 11 : 12,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 5,
    borderRadius: 999,
  },
  sm: { height: 20, paddingHorizontal: 7 },
  md: { height: 24, paddingHorizontal: 10 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontWeight: "600", letterSpacing: 0.1 },
});
