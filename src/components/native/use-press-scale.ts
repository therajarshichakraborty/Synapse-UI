import * as React from "react";
import { Animated } from "react-native";
import { nativeDriver } from "@/components/native/theme";

/**
 * Springy press feedback. Spread `handlers` on a Pressable and apply `style`
 * to an Animated.View inside (or around) it.
 */
export function usePressScale(to = 0.97) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const animate = React.useCallback(
    (value: number) =>
      Animated.spring(scale, {
        toValue: value,
        useNativeDriver: nativeDriver,
        speed: 40,
        bounciness: value === 1 ? 6 : 0,
      }).start(),
    [scale],
  );

  return {
    style: { transform: [{ scale }] },
    handlers: {
      onPressIn: () => animate(to),
      onPressOut: () => animate(1),
    },
  };
}
