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
import { Icon, type IconName } from "@/components/native/icon";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type ToggleProps = {
  icon: IconName;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  /** Color when on. Defaults to red for hearts, the foreground otherwise. */
  activeColor?: string;
  /** Fill the icon while on (hearts, stars, bookmarks). */
  fillWhenActive?: boolean;
  /** Text next to the icon, e.g. a like count. */
  label?: string;
  /** Draw a bordered button around the icon. */
  bordered?: boolean;
  size?: number;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({
  icon,
  pressed,
  defaultPressed = false,
  onPressedChange,
  activeColor,
  fillWhenActive = true,
  label,
  bordered,
  size = 22,
  accessibilityLabel,
  style,
}: ToggleProps) {
  const { colors } = useTheme();
  const [inner, setInner] = React.useState(defaultPressed);
  const on = pressed ?? inner;
  const scale = React.useRef(new Animated.Value(1)).current;
  const burst = React.useRef(new Animated.Value(0)).current;
  const tint =
    activeColor ?? (icon === "heart" ? "#ef4444" : icon === "star" ? "#f5a524" : colors.foreground);

  const toggle = () => {
    const next = !on;
    if (pressed === undefined) setInner(next);
    onPressedChange?.(next);
    scale.setValue(next ? 0.6 : 0.9);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: nativeDriver,
      speed: 14,
      bounciness: 18,
    }).start();
    if (next) {
      burst.setValue(0);
      Animated.timing(burst, { toValue: 1, duration: 450, useNativeDriver: nativeDriver }).start();
    }
  };

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={accessibilityLabel}
      onPress={toggle}
      hitSlop={6}
      style={[
        styles.root,
        bordered && [
          styles.bordered,
          { borderColor: on ? tint : colors.border, backgroundColor: colors.card },
        ],
        style,
      ]}
    >
      <View>
        {/* Ring burst on activation */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.burst,
            {
              borderColor: tint,
              opacity: burst.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0.6, 0] }),
              transform: [
                { scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2] }) },
              ],
            },
          ]}
        />
        <Animated.View style={{ transform: [{ scale }] }}>
          <Icon
            name={icon}
            size={size}
            color={on ? tint : colors.mutedForeground}
            fill={on && fillWhenActive ? tint : "none"}
          />
        </Animated.View>
      </View>
      {label != null && (
        <Text style={[styles.label, { color: on ? tint : colors.mutedForeground }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start" },
  bordered: { height: 40, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1 },
  burst: { borderRadius: 999, borderWidth: 2 },
  label: { fontSize: 14, fontWeight: "600", fontVariant: ["tabular-nums"] },
});
