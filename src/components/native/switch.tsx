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
import { useTheme } from "@/components/native/theme";

export type SwitchProps = {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  /** Track color when on. Defaults to the success token, iOS-style. */
  tint?: "success" | "brand" | "primary";
  label?: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
};

const dims = { sm: { w: 40, h: 24 }, md: { w: 51, h: 31 } };

export function Switch({
  value,
  defaultValue = false,
  onValueChange,
  disabled,
  size = "md",
  tint = "success",
  label,
  description,
  style,
}: SwitchProps) {
  const { colors, shadow } = useTheme();
  const [inner, setInner] = React.useState(defaultValue);
  const on = value ?? inner;
  const anim = React.useRef(new Animated.Value(on ? 1 : 0)).current;
  const press = React.useRef(new Animated.Value(0)).current;
  const { w, h } = dims[size];
  const knob = h - 4;

  React.useEffect(() => {
    // Colors can't use the native driver, so the whole switch runs on JS.
    Animated.spring(anim, {
      toValue: on ? 1 : 0,
      useNativeDriver: false,
      damping: 16,
      stiffness: 240,
    }).start();
  }, [on, anim]);

  const pressTo = (v: number) =>
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: false,
      speed: 30,
      bounciness: 0,
    }).start();

  const toggle = () => {
    if (value === undefined) setInner(!on);
    onValueChange?.(!on);
  };

  const track = (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: on, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={toggle}
      onPressIn={() => pressTo(1)}
      onPressOut={() => pressTo(0)}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: w,
            height: h,
            borderRadius: h / 2,
            opacity: disabled ? 0.5 : 1,
            backgroundColor: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.input, colors[tint]],
            }),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.knob,
            shadow(2),
            {
              height: knob,
              borderRadius: knob / 2,
              // Stretch while pressed, like iOS.
              width: press.interpolate({ inputRange: [0, 1], outputRange: [knob, knob + 6] }),
              transform: [
                {
                  translateX: Animated.add(
                    anim.interpolate({ inputRange: [0, 1], outputRange: [2, w - knob - 2] }),
                    Animated.multiply(
                      press,
                      anim.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }),
                    ),
                  ),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );

  if (!label && !description) return <View style={style}>{track}</View>;

  return (
    <Pressable onPress={toggle} disabled={disabled} style={[styles.row, style]}>
      <View style={styles.text}>
        {label && <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>}
        {description && (
          <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text>
        )}
      </View>
      {track}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { justifyContent: "center" },
  knob: { position: "absolute", left: 0, backgroundColor: "#ffffff" },
  row: { flexDirection: "row", alignItems: "center", gap: 16 },
  text: { flex: 1, gap: 2 },
  label: { fontSize: 15, fontWeight: "500" },
  description: { fontSize: 13, lineHeight: 18 },
});
