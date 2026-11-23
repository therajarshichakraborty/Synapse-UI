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
import { useTheme } from "@/components/native/theme";

export type SwipeAction = {
  label: string;
  icon: IconName;
  /** Background color; defaults by position. */
  color?: string;
  onPress: () => void;
};

export type SwipeableRowProps = {
  children: React.ReactNode;
  /** Revealed when swiping left. */
  rightActions?: SwipeAction[];
  /** Revealed when swiping right. */
  leftActions?: SwipeAction[];
  actionWidth?: number;
  style?: StyleProp<ViewStyle>;
};

export function SwipeableRow({
  children,
  rightActions = [],
  leftActions = [],
  actionWidth = 76,
  style,
}: SwipeableRowProps) {
  const { colors } = useTheme();
  const x = React.useRef(new Animated.Value(0)).current;
  const offset = React.useRef(0);
  const rightW = rightActions.length * actionWidth;
  const leftW = leftActions.length * actionWidth;

  const settle = React.useCallback(
    (to: number) => {
      offset.current = to;
      Animated.spring(x, {
        toValue: to,
        useNativeDriver: false,
        damping: 22,
        stiffness: 240,
      }).start();
    },
    [x],
  );

  const pan = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (_, g) => {
          let next = offset.current + g.dx;
          // Resist beyond the revealed actions.
          if (next < -rightW) next = -rightW + (next + rightW) / 3;
          if (next > leftW) next = leftW + (next - leftW) / 3;
          if (!leftW && next > 0) next = next / 4;
          if (!rightW && next < 0) next = next / 4;
          x.setValue(next);
        },
        onPanResponderRelease: (_, g) => {
          const end = offset.current + g.dx + g.vx * 60;
          if (rightW && end < -rightW / 2) settle(-rightW);
          else if (leftW && end > leftW / 2) settle(leftW);
          else settle(0);
        },
      }),
    [x, rightW, leftW, settle],
  );

  const renderActions = (list: SwipeAction[], side: "left" | "right") => (
    <View style={[styles.actions, side === "left" ? { left: 0 } : { right: 0 }]}>
      {list.map((a, i) => {
        const bg =
          a.color ??
          (side === "right"
            ? i === list.length - 1
              ? colors.destructive
              : colors.subtle
            : colors.brand);
        return (
          <Pressable
            key={a.label}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            onPress={() => {
              settle(0);
              a.onPress();
            }}
            style={[styles.action, { width: actionWidth, backgroundColor: bg }]}
          >
            <Icon name={a.icon} size={20} color="#ffffff" />
            <Text style={styles.actionText}>{a.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View
      style={[styles.root, { backgroundColor: colors.muted }, style]}
      accessibilityActions={[...leftActions, ...rightActions].map((a) => ({
        name: a.label,
        label: a.label,
      }))}
      onAccessibilityAction={(e) =>
        [...leftActions, ...rightActions]
          .find((a) => a.label === e.nativeEvent.actionName)
          ?.onPress()
      }
    >
      {leftActions.length > 0 && renderActions(leftActions, "left")}
      {rightActions.length > 0 && renderActions(rightActions, "right")}
      <Animated.View
        {...pan.panHandlers}
        style={[{ backgroundColor: colors.card, transform: [{ translateX: x }] }, noSelect]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

/** Dragging should never start a text selection (web). */
const noSelect = { userSelect: "none" } as object;

const styles = StyleSheet.create({
  root: { overflow: "hidden" },
  actions: { position: "absolute", top: 0, bottom: 0, flexDirection: "row" },
  action: { alignItems: "center", justifyContent: "center", gap: 4 },
  actionText: { color: "#ffffff", fontSize: 12, fontWeight: "600" },
});
