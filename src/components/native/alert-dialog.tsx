import * as React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/native/button";
import { Icon, type IconName } from "@/components/native/icon";
import { Backdrop, useOverlayTransition } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { useTheme } from "@/components/native/theme";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: IconName;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Styles the confirm button and icon in red. */
  destructive?: boolean;
  /** May return a promise; the button shows a spinner until it settles. */
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
};

/** Requires an explicit choice: no backdrop dismissal, no close button. */
export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  destructive,
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  const { colors, shadow } = useTheme();
  const { mounted, progress } = useOverlayTransition(open);
  const [busy, setBusy] = React.useState(false);

  if (!mounted) return null;

  const confirm = async () => {
    try {
      setBusy(true);
      await onConfirm();
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };

  const tone = destructive ? colors.destructive : colors.brand;
  const soft = destructive ? colors.destructiveSoft : colors.brandSoft;

  return (
    <Portal>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Backdrop progress={progress} dismissible={false} />
        <Animated.View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={[
            styles.panel,
            shadow(4),
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: progress,
              transform: [
                { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1.08, 1] }) },
              ],
            },
          ]}
        >
          <View style={[styles.icon, { backgroundColor: soft }]}>
            <Icon name={icon ?? (destructive ? "trash" : "alert-circle")} size={24} color={tone} />
          </View>
          <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
          {description && (
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              {description}
            </Text>
          )}
          <View style={styles.actions}>
            <Button
              block
              variant={destructive ? "destructive" : "default"}
              loading={busy}
              onPress={confirm}
            >
              {confirmLabel}
            </Button>
            <Button
              block
              variant="ghost"
              disabled={busy}
              onPress={() => {
                onCancel?.();
                onOpenChange(false);
              }}
            >
              {cancelLabel}
            </Button>
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", padding: 28 },
  panel: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 30,
    paddingTop: 26,
    paddingHorizontal: 22,
    paddingBottom: 14,
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: { fontSize: 19, fontWeight: "700", letterSpacing: -0.4, textAlign: "center" },
  description: { fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 8 },
  actions: { alignSelf: "stretch", gap: 4, marginTop: 22 },
});
