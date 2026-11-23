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
import { nativeDriver, useTheme } from "@/components/native/theme";

export type StepperProps = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  /** Suffix shown after the number, e.g. "guests". */
  unit?: string;
  size?: "sm" | "md";
  style?: StyleProp<ViewStyle>;
};

function useRepeat(action: () => void) {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = React.useRef(action);
  ref.current = action;
  const stop = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const start = React.useCallback(() => {
    let delay = 380;
    const tick = () => {
      ref.current();
      delay = Math.max(60, delay * 0.78);
      timer.current = setTimeout(tick, delay);
    };
    timer.current = setTimeout(tick, delay);
  }, []);
  React.useEffect(() => stop, [stop]);
  return { start, stop };
}

export function Stepper({
  value,
  defaultValue = 0,
  min = 0,
  max = 99,
  step = 1,
  onValueChange,
  unit,
  size = "md",
  style,
}: StepperProps) {
  const { colors } = useTheme();
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const latest = React.useRef(current);
  latest.current = current;
  const bump = React.useRef(new Animated.Value(0)).current;

  const set = (next: number) => {
    const clamped = Math.min(Math.max(next, min), max);
    if (clamped === latest.current) return;
    bump.setValue(clamped > latest.current ? -1 : 1);
    Animated.spring(bump, {
      toValue: 0,
      useNativeDriver: nativeDriver,
      speed: 28,
      bounciness: 8,
    }).start();
    latest.current = clamped;
    if (value === undefined) setInner(clamped);
    onValueChange?.(clamped);
  };

  const inc = useRepeat(() => set(latest.current + step));
  const dec = useRepeat(() => set(latest.current - step));
  const h = size === "sm" ? 34 : 42;

  const btn = (
    icon: "minus" | "plus",
    disabled: boolean,
    onPress: () => void,
    repeat: typeof inc,
  ) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={icon === "plus" ? "Increase" : "Decrease"}
      disabled={disabled}
      onPress={onPress}
      onLongPress={repeat.start}
      onPressOut={repeat.stop}
      delayLongPress={300}
      style={({ pressed }) => [
        styles.btn,
        {
          width: h,
          height: h,
          backgroundColor: pressed ? colors.accent : "transparent",
          opacity: disabled ? 0.35 : 1,
        },
      ]}
    >
      <Icon name={icon} size={size === "sm" ? 16 : 18} strokeWidth={2.4} />
    </Pressable>
  );

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: current }}
      style={[
        styles.root,
        { borderColor: colors.border, backgroundColor: colors.card, borderRadius: h / 2 + 4 },
        style,
      ]}
    >
      {btn("minus", current <= min, () => set(current - step), dec)}
      <View style={styles.valueWrap}>
        <Animated.Text
          style={[
            styles.value,
            {
              color: colors.foreground,
              fontSize: size === "sm" ? 15 : 17,
              transform: [
                { translateY: bump.interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] }) },
              ],
              opacity: bump.interpolate({ inputRange: [-1, 0, 1], outputRange: [0.2, 1, 0.2] }),
            },
          ]}
        >
          {current}
        </Animated.Text>
        {unit && <Text style={[styles.unit, { color: colors.mutedForeground }]}>{unit}</Text>}
      </View>
      {btn("plus", current >= max, () => set(current + step), inc)}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    padding: 3,
  },
  btn: { borderRadius: 999, alignItems: "center", justifyContent: "center" },
  valueWrap: { minWidth: 44, alignItems: "center", paddingHorizontal: 6, overflow: "hidden" },
  value: { fontWeight: "600", fontVariant: ["tabular-nums"] },
  unit: { fontSize: 11, marginTop: -1 },
});
