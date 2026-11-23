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

export type RatingProps = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  size?: number;
  /** Display only, supports fractional values like 4.5. */
  readOnly?: boolean;
  /** Show the numeric value and an optional count, e.g. "4.8 (2.1k)". */
  showValue?: boolean;
  count?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

function Star({
  fill,
  size,
  color,
  empty,
  pop,
}: {
  fill: number;
  size: number;
  color: string;
  empty: string;
  pop: Animated.Value;
}) {
  return (
    <Animated.View style={{ width: size, height: size, transform: [{ scale: pop }] }}>
      <Icon name="star" size={size} color={empty} fill={empty} strokeWidth={1.5} />
      {fill > 0 && (
        <View style={[StyleSheet.absoluteFill, { width: size * fill, overflow: "hidden" }]}>
          <Icon name="star" size={size} color={color} fill={color} strokeWidth={1.5} />
        </View>
      )}
    </Animated.View>
  );
}

export function Rating({
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  size = 28,
  readOnly,
  showValue,
  count,
  color = "#f5a524",
  style,
}: RatingProps) {
  const { colors } = useTheme();
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const pops = React.useRef(Array.from({ length: max }, () => new Animated.Value(1))).current;

  const choose = (n: number) => {
    if (readOnly) return;
    if (value === undefined) setInner(n);
    onValueChange?.(n);
    pops.slice(0, n).forEach((p, i) => {
      p.setValue(0.6);
      Animated.spring(p, {
        toValue: 1,
        delay: i * 40,
        useNativeDriver: nativeDriver,
        speed: 18,
        bounciness: 16,
      }).start();
    });
  };

  return (
    <View
      accessibilityRole={readOnly ? "text" : "adjustable"}
      accessibilityLabel={`Rating ${current} of ${max}`}
      style={[styles.row, style]}
    >
      <View style={[styles.row, { gap: size * 0.14 }]}>
        {Array.from({ length: max }).map((_, i) => {
          const fill = Math.min(Math.max(current - i, 0), 1);
          const star = (
            <Star fill={fill} size={size} color={color} empty={colors.muted} pop={pops[i]} />
          );
          return readOnly ? (
            <View key={i}>{star}</View>
          ) : (
            <Pressable
              key={i}
              hitSlop={4}
              onPress={() => choose(i + 1)}
              accessibilityLabel={`${i + 1} stars`}
            >
              {star}
            </Pressable>
          );
        })}
      </View>
      {showValue && (
        <Text
          style={[styles.value, { color: colors.foreground, fontSize: Math.max(13, size * 0.55) }]}
        >
          {current.toFixed(1)}
          {count && (
            <Text style={{ color: colors.mutedForeground, fontWeight: "400" }}> ({count})</Text>
          )}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  value: { marginLeft: 8, fontWeight: "600", fontVariant: ["tabular-nums"] },
});
