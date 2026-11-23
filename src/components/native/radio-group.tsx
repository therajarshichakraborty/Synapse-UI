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
import { alpha, nativeDriver, useTheme } from "@/components/native/theme";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  icon?: IconName;
  disabled?: boolean;
};

export type RadioGroupProps = {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** "list" is compact; "card" draws a bordered tile per option. */
  variant?: "list" | "card";
  style?: StyleProp<ViewStyle>;
};

function Dot({ selected }: { selected: boolean }) {
  const { colors } = useTheme();
  const anim = React.useRef(new Animated.Value(selected ? 1 : 0)).current;
  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: nativeDriver,
      speed: 24,
      bounciness: 14,
    }).start();
  }, [selected, anim]);
  return (
    <View style={[styles.ring, { borderColor: selected ? colors.primary : colors.borderStrong }]}>
      <Animated.View
        style={[styles.dot, { backgroundColor: colors.primary, transform: [{ scale: anim }] }]}
      />
    </View>
  );
}

export function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  variant = "list",
  style,
}: RadioGroupProps) {
  const { colors } = useTheme();
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;

  return (
    <View accessibilityRole="radiogroup" style={[{ gap: variant === "card" ? 10 : 16 }, style]}>
      {options.map((o) => {
        const selected = o.value === current;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected, disabled: o.disabled }}
            disabled={o.disabled}
            onPress={() => {
              if (value === undefined) setInner(o.value);
              onValueChange?.(o.value);
            }}
            style={({ pressed }) => [
              styles.option,
              variant === "card" && [
                styles.card,
                {
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: selected ? alpha(colors.primary, 0.03) : colors.card,
                  borderWidth: selected ? 1.5 : 1,
                  margin: selected ? 0 : 0.5,
                },
              ],
              pressed && { opacity: 0.85 },
              o.disabled && { opacity: 0.45 },
            ]}
          >
            {variant === "card" && o.icon && (
              <View style={[styles.iconWrap, { backgroundColor: colors.muted }]}>
                <Icon name={o.icon} size={18} />
              </View>
            )}
            <View style={styles.text}>
              <Text style={[styles.label, { color: colors.foreground }]}>{o.label}</Text>
              {o.description && (
                <Text style={[styles.description, { color: colors.mutedForeground }]}>
                  {o.description}
                </Text>
              )}
            </View>
            <Dot selected={selected} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: { flexDirection: "row", alignItems: "center", gap: 12 },
  card: { padding: 14, borderRadius: 16 },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: 2 },
  label: { fontSize: 15, fontWeight: "500" },
  description: { fontSize: 13, lineHeight: 18 },
  ring: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
