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
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { Icon, type IconName } from "@/components/native/icon";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type BannerProps = {
  title: string;
  description?: string;
  icon?: IconName;
  action?: { label: string; onPress: () => void };
  /** Shows a close button; the banner animates out before calling this. */
  onDismiss?: () => void;
  /** Gradient colors. Defaults to the brand blue → violet. */
  colors?: [string, string];
  style?: StyleProp<ViewStyle>;
};

let gid = 0;

export function Banner({
  title,
  description,
  icon = "sparkles",
  action,
  onDismiss,
  colors: gradient = ["#2563eb", "#7c3aed"],
  style,
}: BannerProps) {
  const { shadow } = useTheme();
  const anim = React.useRef(new Animated.Value(0)).current;
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const id = React.useRef(`banner-${++gid}`).current;

  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: nativeDriver,
      damping: 18,
      stiffness: 180,
    }).start();
  }, [anim]);

  const dismiss = () =>
    Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: nativeDriver }).start(() =>
      onDismiss?.(),
    );

  return (
    <Animated.View
      onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
      style={[
        styles.banner,
        shadow(3),
        {
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] }) },
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1] }) },
          ],
        },
        style,
      ]}
    >
      {size.w > 0 && (
        <Svg width={size.w} height={size.h} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={gradient[0]} />
              <Stop offset="1" stopColor={gradient[1]} />
            </LinearGradient>
          </Defs>
          <Rect width={size.w} height={size.h} fill={`url(#${id})`} />
        </Svg>
      )}
      {/* Soft light bloom in the corner. */}
      <View style={styles.bloom} />
      <View style={styles.icon}>
        <Icon name={icon} size={18} color="#ffffff" />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {action && (
          <Pressable
            accessibilityRole="button"
            onPress={action.onPress}
            style={({ pressed }) => [styles.action, { opacity: pressed ? 0.85 : 1 }]}
          >
            <Text style={[styles.actionText, { color: gradient[0] }]}>{action.label}</Text>
            <Icon name="arrow-right" size={14} strokeWidth={2.5} color={gradient[0]} />
          </Pressable>
        )}
      </View>
      {onDismiss && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={10}
          onPress={dismiss}
        >
          <Icon name="x" size={16} color="rgba(255,255,255,0.8)" />
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#2563eb",
  },
  bloom: {
    position: "absolute",
    right: -40,
    top: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1, gap: 3 },
  title: { color: "#ffffff", fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  description: { color: "rgba(255,255,255,0.82)", fontSize: 14, lineHeight: 20 },
  action: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    marginTop: 10,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: "#ffffff",
  },
  actionText: { fontSize: 14, fontWeight: "600" },
});
