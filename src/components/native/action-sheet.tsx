import * as React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { Backdrop, useBackHandler, useOverlayTransition } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { useTheme } from "@/components/native/theme";

export type ActionSheetOption = {
  label: string;
  icon?: IconName;
  destructive?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export type ActionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
  bottomInset?: number;
};

export function ActionSheet({
  open,
  onOpenChange,
  title,
  message,
  options,
  cancelLabel = "Cancel",
  bottomInset = 24,
}: ActionSheetProps) {
  const { colors } = useTheme();
  const { mounted, progress } = useOverlayTransition(open);
  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
  useBackHandler(open, close);

  if (!mounted) return null;

  const row = (o: ActionSheetOption, i: number) => (
    <React.Fragment key={o.label}>
      {(i > 0 || title || message) && (
        <View style={[styles.sep, { backgroundColor: colors.border }]} />
      )}
      <Pressable
        accessibilityRole="button"
        disabled={o.disabled}
        onPress={() => {
          close();
          o.onPress();
        }}
        style={({ pressed }) => [
          styles.option,
          pressed && { backgroundColor: colors.accent },
          o.disabled && { opacity: 0.4 },
        ]}
      >
        {o.icon && (
          <Icon
            name={o.icon}
            size={20}
            color={o.destructive ? colors.destructive : colors.foreground}
          />
        )}
        <Text
          style={[
            styles.optionText,
            { color: o.destructive ? colors.destructive : colors.foreground },
          ]}
        >
          {o.label}
        </Text>
      </Pressable>
    </React.Fragment>
  );

  return (
    <Portal>
      <View style={[StyleSheet.absoluteFill, styles.end, { paddingBottom: bottomInset }]}>
        <Backdrop progress={progress} onPress={close} />
        <Animated.View
          accessibilityViewIsModal
          style={{
            gap: 8,
            transform: [
              { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [400, 0] }) },
            ],
          }}
        >
          <View style={[styles.group, { backgroundColor: colors.card }]}>
            {(title || message) && (
              <View style={styles.head}>
                {title && (
                  <Text style={[styles.title, { color: colors.mutedForeground }]}>{title}</Text>
                )}
                {message && (
                  <Text style={[styles.message, { color: colors.mutedForeground }]}>{message}</Text>
                )}
              </View>
            )}
            {options.map(row)}
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={close}
            style={({ pressed }) => [
              styles.group,
              styles.cancel,
              { backgroundColor: pressed ? colors.accent : colors.card },
            ]}
          >
            <Text style={[styles.cancelText, { color: colors.foreground }]}>{cancelLabel}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  end: { justifyContent: "flex-end", paddingHorizontal: 10 },
  group: { borderRadius: 22, overflow: "hidden" },
  head: { alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, gap: 3 },
  title: { fontSize: 13, fontWeight: "600" },
  message: { fontSize: 13, textAlign: "center", lineHeight: 18 },
  sep: { height: StyleSheet.hairlineWidth },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 58,
  },
  optionText: { fontSize: 17, fontWeight: "500" },
  cancel: { height: 58, alignItems: "center", justifyContent: "center" },
  cancelText: { fontSize: 17, fontWeight: "600" },
});
