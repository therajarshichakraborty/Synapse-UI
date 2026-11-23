import * as React from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { Backdrop, useBackHandler, useOverlayTransition } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { useTheme } from "@/components/native/theme";

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  /** Width as a fraction of the screen. */
  size?: number;
  children: React.ReactNode;
  topInset?: number;
  style?: StyleProp<ViewStyle>;
};

export function Drawer({
  open,
  onOpenChange,
  side = "left",
  size = 0.82,
  children,
  topInset = 56,
  style,
}: DrawerProps) {
  const { colors, shadow } = useTheme();
  const { mounted, progress } = useOverlayTransition(open);
  const [width, setWidth] = React.useState(0);
  const drag = React.useRef(new Animated.Value(0)).current;
  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
  useBackHandler(open, close);
  const dir = side === "left" ? -1 : 1;
  const panelWidth = width * size;

  React.useEffect(() => {
    if (open) drag.setValue(0);
  }, [open, drag]);

  const pan = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderMove: (_, g) => {
          const d = g.dx * dir; // positive = toward closing
          drag.setValue(Math.max(0, d) * dir);
        },
        onPanResponderRelease: (_, g) => {
          const d = g.dx * dir;
          if (d > panelWidth * 0.3 || g.vx * dir > 0.6) close();
          else Animated.spring(drag, { toValue: 0, useNativeDriver: false }).start();
        },
      }),
    [dir, drag, panelWidth, close],
  );

  if (!mounted) return null;

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <Backdrop progress={progress} onPress={close} />
        {width > 0 && (
          <Animated.View
            accessibilityViewIsModal
            {...pan.panHandlers}
            style={[
              styles.panel,
              shadow(4),
              side === "left"
                ? { left: 0, borderTopRightRadius: 28, borderBottomRightRadius: 28 }
                : { right: 0, borderTopLeftRadius: 28, borderBottomLeftRadius: 28 },
              {
                width: panelWidth,
                paddingTop: topInset,
                backgroundColor: colors.card,
                transform: [
                  {
                    translateX: Animated.add(
                      progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [panelWidth * dir, 0],
                      }),
                      drag,
                    ),
                  },
                ],
              },
              style,
            ]}
          >
            {children}
          </Animated.View>
        )}
      </View>
    </Portal>
  );
}

export function DrawerItem({
  label,
  icon,
  active,
  badge,
  onPress,
}: {
  label: string;
  icon?: IconName;
  active?: boolean;
  badge?: string | number;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: active ? colors.accent : pressed ? colors.muted : "transparent" },
      ]}
    >
      {icon && (
        <Icon name={icon} size={19} color={active ? colors.foreground : colors.mutedForeground} />
      )}
      <Text
        style={[styles.itemText, { color: colors.foreground, fontWeight: active ? "600" : "500" }]}
      >
        {label}
      </Text>
      {badge != null && (
        <View style={[styles.badge, { backgroundColor: colors.brand }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 28,
    userSelect: "none",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  itemText: { flex: 1, fontSize: 16 },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#ffffff", fontSize: 12, fontWeight: "700" },
});
