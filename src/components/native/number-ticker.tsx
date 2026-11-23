import * as React from "react";
import { Animated, Easing, Text, type StyleProp, type TextStyle } from "react-native";
import { useTheme } from "@/components/native/theme";

export type NumberTickerProps = {
  value: number;
  /** Start from this value on mount. */
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Uses Intl grouping, e.g. 12,480. */
  grouping?: boolean;
  style?: StyleProp<TextStyle>;
};

function format(n: number, decimals: number, grouping: boolean) {
  const fixed = n.toFixed(decimals);
  if (!grouping) return fixed;
  const [int, dec] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${grouped}.${dec}` : grouped;
}

export function NumberTicker({
  value,
  from = 0,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  grouping = true,
  style,
}: NumberTickerProps) {
  const { colors } = useTheme();
  const anim = React.useRef(new Animated.Value(from)).current;
  const [shown, setShown] = React.useState(from);

  React.useEffect(() => {
    const id = anim.addListener(({ value: v }) => setShown(v));
    Animated.timing(anim, {
      toValue: value,
      duration,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
    return () => anim.removeListener(id);
  }, [value, duration, anim]);

  return (
    <Text
      accessibilityLabel={`${prefix}${format(value, decimals, grouping)}${suffix}`}
      style={[
        {
          color: colors.foreground,
          fontSize: 40,
          fontWeight: "700",
          letterSpacing: -1.2,
          fontVariant: ["tabular-nums"],
        },
        style,
      ]}
    >
      {prefix}
      {format(shown, decimals, grouping)}
      {suffix}
    </Text>
  );
}
