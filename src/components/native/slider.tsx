import * as React from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@/components/native/theme";

export type SliderProps = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  /** Fires once when the user lets go. */
  onSlidingComplete?: (value: number) => void;
  /** Show a floating value bubble while dragging. */
  showValue?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const THUMB = 26;

export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingComplete,
  showValue = true,
  formatValue = (v) => String(v),
  disabled,
  style,
}: SliderProps) {
  const { colors, shadow } = useTheme();
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const [width, setWidth] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const bubble = React.useRef(new Animated.Value(0)).current;
  const startX = React.useRef(0);
  const latest = React.useRef(current);
  latest.current = current;

  const range = max - min || 1;
  const ratio = (current - min) / range;
  const usable = Math.max(width - THUMB, 0);

  const setFromX = React.useCallback(
    (x: number) => {
      const r = Math.min(Math.max(x / (usable || 1), 0), 1);
      const raw = min + r * range;
      const next = Math.round(raw / step) * step;
      const clamped = Math.min(Math.max(Number(next.toFixed(6)), min), max);
      if (clamped !== latest.current) {
        latest.current = clamped;
        if (value === undefined) setInner(clamped);
        onValueChange?.(clamped);
      }
    },
    [usable, min, range, step, max, value, onValueChange],
  );

  const showBubble = (v: number) =>
    Animated.spring(bubble, {
      toValue: v,
      useNativeDriver: false,
      speed: 30,
      bounciness: 8,
    }).start();

  const pan = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (e) => {
          startX.current = e.nativeEvent.locationX - THUMB / 2;
          setFromX(startX.current);
          setDragging(true);
          showBubble(1);
        },
        onPanResponderMove: (_, g) => setFromX(startX.current + g.dx),
        onPanResponderRelease: () => {
          setDragging(false);
          showBubble(0);
          onSlidingComplete?.(latest.current);
        },
        onPanResponderTerminate: () => {
          setDragging(false);
          showBubble(0);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, setFromX, onSlidingComplete],
  );

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: current }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e) => {
        const delta = e.nativeEvent.actionName === "increment" ? step : -step;
        const next = Math.min(Math.max(current + delta, min), max);
        if (value === undefined) setInner(next);
        onValueChange?.(next);
      }}
      style={[styles.root, disabled && { opacity: 0.5 }, style]}
      {...pan.panHandlers}
    >
      <View pointerEvents="none" style={[styles.track, { backgroundColor: colors.muted }]}>
        <View
          style={[
            styles.fill,
            { backgroundColor: colors.primary, width: ratio * usable + THUMB / 2 },
          ]}
        />
      </View>
      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          shadow(2),
          {
            left: ratio * usable,
            backgroundColor: "#ffffff",
            borderColor: colors.border,
            transform: [{ scale: dragging ? 1.08 : 1 }],
          },
        ]}
      />
      {showValue && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.bubble,
            {
              left: ratio * usable + THUMB / 2 - 24,
              backgroundColor: colors.primary,
              opacity: bubble,
              transform: [
                { translateY: bubble.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }) },
                { scale: bubble.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
              ],
            },
          ]}
        >
          <Text style={[styles.bubbleText, { color: colors.primaryForeground }]}>
            {formatValue(current)}
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { height: THUMB + 12, justifyContent: "center" },
  // Children ignore touches so locationX is always relative to the root.
  track: { height: 6, borderRadius: 3, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 3 },
  thumb: {
    position: "absolute",
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  bubble: {
    position: "absolute",
    top: -30,
    width: 48,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleText: { fontSize: 13, fontWeight: "600", fontVariant: ["tabular-nums"] },
});
