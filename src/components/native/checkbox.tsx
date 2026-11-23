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

export type CheckedState = boolean | "indeterminate";

export type CheckboxProps = {
  checked?: CheckedState;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
  /** "round" draws a circular check, popular for to-do lists. */
  shape?: "square" | "round";
  style?: StyleProp<ViewStyle>;
};

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  disabled,
  invalid,
  shape = "square",
  style,
}: CheckboxProps) {
  const { colors } = useTheme();
  const [inner, setInner] = React.useState(defaultChecked);
  const state = checked ?? inner;
  const on = state !== false;
  const anim = React.useRef(new Animated.Value(on ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: on ? 1 : 0,
      useNativeDriver: nativeDriver,
      speed: 26,
      bounciness: 12,
    }).start();
  }, [on, anim]);

  const toggle = () => {
    const next = state !== true;
    if (checked === undefined) setInner(next);
    onCheckedChange?.(next);
  };

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: state === "indeterminate" ? "mixed" : state, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={toggle}
      hitSlop={6}
      style={[styles.row, disabled && styles.disabled, style]}
    >
      <View
        style={[
          styles.box,
          {
            borderRadius: shape === "round" ? 11 : 7,
            borderColor: invalid ? colors.destructive : on ? colors.primary : colors.borderStrong,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.fill,
            {
              borderRadius: shape === "round" ? 11 : 6,
              backgroundColor: colors.primary,
              opacity: anim,
              transform: [
                { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) },
              ],
            },
          ]}
        >
          {state === "indeterminate" ? (
            <View style={[styles.dash, { backgroundColor: colors.primaryForeground }]} />
          ) : (
            <Icon name="check" size={14} strokeWidth={3.25} color={colors.primaryForeground} />
          )}
        </Animated.View>
      </View>
      {(label || description) && (
        <View style={styles.text}>
          {label && <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>}
          {description && (
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  disabled: { opacity: 0.5 },
  box: { width: 22, height: 22, borderWidth: 1.5, marginTop: 1 },
  fill: { alignItems: "center", justifyContent: "center", margin: -1.5 },
  dash: { width: 10, height: 2.5, borderRadius: 2 },
  text: { flex: 1, gap: 2 },
  label: { fontSize: 15, fontWeight: "500", lineHeight: 22 },
  description: { fontSize: 13, lineHeight: 18 },
});
