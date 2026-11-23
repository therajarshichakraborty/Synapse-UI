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

export type KeypadProps = {
  /** PIN length; shows that many dots. Set 0 to hide the dots (amount entry). */
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  /** Shakes the dots and clears them. Toggle back to false afterwards. */
  error?: boolean;
  /** Bottom-left key, e.g. biometrics or a decimal point. */
  extraKey?: { label?: string; icon?: "shield-check" | "smile"; onPress: () => void };
  style?: StyleProp<ViewStyle>;
};

const KEYS = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
];

function Key({
  children,
  onPress,
  label,
}: {
  children: React.ReactNode;
  onPress: () => void;
  label: string;
}) {
  const { colors } = useTheme();
  const flash = React.useRef(new Animated.Value(0)).current;
  const to = (v: number) =>
    Animated.timing(flash, { toValue: v, duration: v ? 40 : 260, useNativeDriver: false }).start();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      style={styles.keyWrap}
    >
      <Animated.View
        style={[
          styles.key,
          {
            backgroundColor: flash.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.muted, colors.borderStrong],
            }),
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export function Keypad({
  length = 4,
  value,
  onChange,
  onComplete,
  error,
  extraKey,
  style,
}: KeypadProps) {
  const { colors } = useTheme();
  const [inner, setInner] = React.useState("");
  const code = value ?? inner;
  const shake = React.useRef(new Animated.Value(0)).current;

  const set = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
    if (length > 0 && next.length === length) onComplete?.(next);
  };

  React.useEffect(() => {
    if (!error) return;
    Animated.sequence(
      [14, -14, 10, -10, 5, 0].map((v) =>
        Animated.timing(shake, { toValue: v, duration: 45, useNativeDriver: nativeDriver }),
      ),
    ).start(() => set(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const press = (d: string) => {
    if (length > 0 && code.length >= length) return;
    set(code + d);
  };

  return (
    <View style={[styles.root, style]}>
      {length > 0 && (
        <Animated.View style={[styles.dots, { transform: [{ translateX: shake }] }]}>
          {Array.from({ length }).map((_, i) => {
            const filled = i < code.length;
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    borderColor: error ? colors.destructive : colors.foreground,
                    backgroundColor: filled
                      ? error
                        ? colors.destructive
                        : colors.foreground
                      : "transparent",
                  },
                ]}
              />
            );
          })}
        </Animated.View>
      )}
      <View style={styles.grid}>
        {KEYS.map(([d, letters]) => (
          <Key key={d} label={d} onPress={() => press(d)}>
            <Text style={[styles.digit, { color: colors.foreground }]}>{d}</Text>
            {letters ? (
              <Text style={[styles.letters, { color: colors.mutedForeground }]}>{letters}</Text>
            ) : null}
          </Key>
        ))}
        {extraKey ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={extraKey.label ?? "Biometrics"}
            onPress={extraKey.onPress}
            style={[styles.keyWrap, styles.plain]}
          >
            {extraKey.icon ? (
              <Icon name={extraKey.icon} size={26} />
            ) : (
              <Text style={[styles.digit, { color: colors.foreground }]}>{extraKey.label}</Text>
            )}
          </Pressable>
        ) : (
          <View style={styles.keyWrap} />
        )}
        <Key label="0" onPress={() => press("0")}>
          <Text style={[styles.digit, { color: colors.foreground }]}>0</Text>
        </Key>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete"
          onPress={() => set(code.slice(0, -1))}
          onLongPress={() => set("")}
          style={[styles.keyWrap, styles.plain]}
        >
          <Icon name="arrow-left" size={24} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", gap: 36 },
  dots: { flexDirection: "row", gap: 18 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 3 * 78 + 2 * 24,
    rowGap: 16,
    columnGap: 24,
  },
  keyWrap: { width: 78, height: 78, alignItems: "center", justifyContent: "center" },
  key: { width: 78, height: 78, borderRadius: 39, alignItems: "center", justifyContent: "center" },
  plain: { borderRadius: 39 },
  digit: { fontSize: 30, fontWeight: "400", lineHeight: 34 },
  letters: { fontSize: 10, fontWeight: "600", letterSpacing: 1.6, marginTop: -1 },
});
