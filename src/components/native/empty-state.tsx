import * as React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Button } from "@/components/native/button";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: IconName;
  action?: { label: string; onPress: () => void };
  secondaryAction?: { label: string; onPress: () => void };
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({
  title,
  description,
  icon = "inbox",
  action,
  secondaryAction,
  style,
}: EmptyStateProps) {
  const { colors, shadow } = useTheme();
  return (
    <View style={[styles.root, style]}>
      <View style={styles.art}>
        {/* Stacked tiles behind the icon for depth. */}
        <View
          style={[
            styles.tile,
            styles.tileBack,
            { backgroundColor: colors.muted, transform: [{ rotate: "-10deg" }] },
          ]}
        />
        <View
          style={[
            styles.tile,
            styles.tileBack,
            { backgroundColor: colors.muted, transform: [{ rotate: "10deg" }] },
          ]}
        />
        <View
          style={[
            styles.tile,
            shadow(2),
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Icon name={icon} size={28} color={colors.foreground} strokeWidth={1.75} />
        </View>
      </View>
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      {description && (
        <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text>
      )}
      {(action || secondaryAction) && (
        <View style={styles.actions}>
          {action && <Button onPress={action.onPress}>{action.label}</Button>}
          {secondaryAction && (
            <Button variant="ghost" onPress={secondaryAction.onPress}>
              {secondaryAction.label}
            </Button>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", paddingHorizontal: 24, paddingVertical: 32 },
  art: { width: 96, height: 96, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  tile: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
  },
  tileBack: { width: 64, height: 64, opacity: 0.9 },
  title: { fontSize: 20, fontWeight: "600", letterSpacing: -0.4, textAlign: "center" },
  description: { fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 8, maxWidth: 290 },
  actions: { marginTop: 24, gap: 6, alignItems: "center" },
});
