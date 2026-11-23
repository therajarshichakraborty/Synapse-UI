import * as React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { focusRing } from "@/components/native/input";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type OtpInputProps = {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  /** Called once every cell is filled. */
  onComplete?: (code: string) => void;
  invalid?: boolean;
  autoFocus?: boolean;
  /** Insert a gap after this many cells (e.g. 3 for `123 456`). */
  groupAfter?: number;
  style?: StyleProp<ViewStyle>;
};

function Caret({ color }: { color: string }) {
  const blink = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0, duration: 500, useNativeDriver: nativeDriver }),
        Animated.timing(blink, { toValue: 1, duration: 500, useNativeDriver: nativeDriver }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [blink]);
  return <Animated.View style={[styles.caret, { backgroundColor: color, opacity: blink }]} />;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  invalid,
  autoFocus,
  groupAfter,
  style,
}: OtpInputProps) {
  const { colors } = useTheme();
  const ref = React.useRef<TextInput>(null);
  const [inner, setInner] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const code = value ?? inner;
  const shake = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!invalid) return;
    Animated.sequence(
      [10, -10, 7, -7, 3, 0].map((v) =>
        Animated.timing(shake, { toValue: v, duration: 45, useNativeDriver: nativeDriver }),
      ),
    ).start();
  }, [invalid, shake]);

  const change = (t: string) => {
    const next = t.replace(/\D/g, "").slice(0, length);
    if (value === undefined) setInner(next);
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  };

  const active = Math.min(code.length, length - 1);

  return (
    <Pressable onPress={() => ref.current?.focus()} accessibilityLabel="One-time code">
      <Animated.View style={[styles.row, { transform: [{ translateX: shake }] }, style]}>
        {Array.from({ length }).map((_, i) => {
          const isActive = focused && i === active;
          const char = code[i];
          return (
            <React.Fragment key={i}>
              {groupAfter && i === groupAfter ? (
                <View style={[styles.dash, { backgroundColor: colors.borderStrong }]} />
              ) : null}
              <View
                style={[
                  styles.cell,
                  {
                    backgroundColor: char ? colors.background : colors.surface,
                    borderColor: invalid
                      ? colors.destructive
                      : isActive
                        ? colors.brand
                        : char
                          ? colors.borderStrong
                          : colors.input,
                  },
                  isActive && focusRing(invalid ? colors.destructive : colors.brand),
                ]}
              >
                {char ? (
                  <Text style={[styles.char, { color: colors.foreground }]}>{char}</Text>
                ) : isActive ? (
                  <Caret color={colors.brand} />
                ) : null}
              </View>
            </React.Fragment>
          );
        })}
      </Animated.View>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={change}
        maxLength={length}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        caretHidden
        style={styles.hidden}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  cell: {
    width: 46,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  char: { fontSize: 24, fontWeight: "600", fontVariant: ["tabular-nums"] },
  caret: { width: 2, height: 24, borderRadius: 1 },
  dash: { width: 10, height: 2, borderRadius: 1, marginHorizontal: 2 },
  hidden: { position: "absolute", opacity: 0, width: 1, height: 1 },
});
