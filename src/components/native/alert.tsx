import * as React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type AlertTone = "info" | "success" | "warning" | "destructive" | "neutral";

export type AlertProps = {
  title: string;
  description?: string;
  tone?: AlertTone;
  icon?: IconName;
  action?: { label: string; onPress: () => void };
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Alert({
  title,
  description,
  tone = "info",
  icon,
  action,
  onDismiss,
  style,
}: AlertProps) {
  const { colors } = useTheme();
  const t = {
    info: { fg: colors.brand, bg: colors.brandSoft, icon: "info" as IconName },
    success: { fg: colors.success, bg: colors.successSoft, icon: "check-circle" as IconName },
    warning: { fg: colors.warning, bg: colors.warningSoft, icon: "alert-triangle" as IconName },
    destructive: {
      fg: colors.destructive,
      bg: colors.destructiveSoft,
      icon: "alert-circle" as IconName,
    },
    neutral: { fg: colors.foreground, bg: colors.muted, icon: "info" as IconName },
  }[tone];

  return (
    <View
      accessibilityRole="alert"
      style={[styles.alert, { backgroundColor: t.bg, borderColor: colors.border }, style]}
    >
      <View style={[styles.accent, { backgroundColor: t.fg }]} />
      <Icon name={icon ?? t.icon} size={18} color={t.fg} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text>
        )}
        {action && (
          <Pressable accessibilityRole="button" onPress={action.onPress} hitSlop={6}>
            <Text style={[styles.action, { color: t.fg }]}>{action.label}</Text>
          </Pressable>
        )}
      </View>
      {onDismiss && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={10}
          onPress={onDismiss}
        >
          <Icon name="x" size={16} color={colors.mutedForeground} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    paddingLeft: 16,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  accent: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3 },
  body: { flex: 1, gap: 3, marginTop: -1 },
  title: { fontSize: 15, fontWeight: "600", lineHeight: 20 },
  description: { fontSize: 14, lineHeight: 20 },
  action: { fontSize: 14, fontWeight: "600", marginTop: 6 },
});
