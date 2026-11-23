import * as React from "react";
import { Animated, Easing, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type SpinnerProps = {
  size?: "sm" | "md" | "lg" | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const sizes = { sm: 16, md: 24, lg: 36 };

export function Spinner({ size = "md", color, style }: SpinnerProps) {
  const { colors } = useTheme();
  const spin = React.useRef(new Animated.Value(0)).current;
  const px = typeof size === "number" ? size : sizes[size];
  const stroke = Math.max(2, px / 9);
  const r = (px - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tint = color ?? colors.foreground;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: nativeDriver,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  return (
    <View accessibilityRole="progressbar" accessibilityLabel="Loading" style={style}>
      <Animated.View
        style={{
          width: px,
          height: px,
          transform: [
            { rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) },
          ],
        }}
      >
        <Svg width={px} height={px}>
          <Circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            stroke={tint}
            strokeOpacity={0.15}
            strokeWidth={stroke}
            fill="none"
          />
          <Circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            stroke={tint}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${c * 0.28} ${c}`}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
