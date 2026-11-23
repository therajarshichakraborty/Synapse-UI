import * as React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon } from "@/components/native/icon";
import { Backdrop, useBackHandler, useOverlayTransition } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { useTheme } from "@/components/native/theme";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  /** Buttons row at the bottom. */
  footer?: React.ReactNode;
  /** Close on backdrop press and back button. */
  dismissible?: boolean;
  showClose?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  dismissible = true,
  showClose = true,
  style,
}: DialogProps) {
  const { colors, shadow } = useTheme();
  const { mounted, progress } = useOverlayTransition(open);
  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
  useBackHandler(open && dismissible, close);

  if (!mounted) return null;

  return (
    <Portal>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Backdrop progress={progress} onPress={close} dismissible={dismissible} />
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
                { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) },
                { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
              ],
            },
            style,
          ]}
        >
          {showClose && dismissible && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={10}
              onPress={close}
              style={[styles.close, { backgroundColor: colors.muted }]}
            >
              <Icon name="x" size={15} strokeWidth={2.5} color={colors.mutedForeground} />
            </Pressable>
          )}
          {(title || description) && (
            <View style={styles.header}>
              {title && <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>}
              {description && (
                <Text style={[styles.description, { color: colors.mutedForeground }]}>
                  {description}
                </Text>
              )}
            </View>
          )}
          {children}
          {footer && <View style={styles.footer}>{footer}</View>}
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", padding: 20 },
  panel: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 28,
    padding: 22,
    borderWidth: StyleSheet.hairlineWidth,
  },
  close: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  header: { gap: 6, marginBottom: 16, paddingRight: 36 },
  title: { fontSize: 20, fontWeight: "700", letterSpacing: -0.4 },
  description: { fontSize: 15, lineHeight: 22 },
  footer: { flexDirection: "row", gap: 10, marginTop: 20 },
});
