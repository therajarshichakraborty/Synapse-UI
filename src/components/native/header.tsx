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
import { useTheme } from "@/components/native/theme";

export type HeaderAction = { icon: IconName; label: string; onPress?: () => void; badge?: boolean };

export type HeaderProps = {
  title: string;
  /** Small text above the large title, e.g. a date. */
  eyebrow?: string;
  onBack?: () => void;
  backLabel?: string;
  actions?: HeaderAction[];
  /**
   * Pass the ScrollView's animated scrollY to collapse the large title
   * into the compact bar as the user scrolls.
   */
  scrollY?: Animated.Value;
  /** Hide the large title and show only the compact bar. */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

const COLLAPSE = 48;

export function Header({
  title,
  eyebrow,
  onBack,
  backLabel = "Back",
  actions = [],
  scrollY,
  compact,
  style,
}: HeaderProps) {
  const { colors } = useTheme();
  const y = React.useRef(new Animated.Value(0)).current;
  const s = scrollY ?? y;

  const smallOpacity = compact
    ? 1
    : s.interpolate({
        inputRange: [COLLAPSE - 12, COLLAPSE + 4],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });
  const largeOpacity = s.interpolate({
    inputRange: [0, COLLAPSE - 8],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const largeScale = s.interpolate({
    inputRange: [-80, 0],
    outputRange: [1.08, 1],
    extrapolate: "clamp",
  });
  const borderOpacity = compact
    ? 1
    : s.interpolate({
        inputRange: [COLLAPSE, COLLAPSE + 16],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });

  return (
    <View style={[{ backgroundColor: colors.background }, style]}>
      <View style={styles.bar}>
        <View style={styles.side}>
          {onBack && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={backLabel}
              onPress={onBack}
              hitSlop={8}
              style={styles.back}
            >
              <Icon name="chevron-left" size={24} color={colors.brand} strokeWidth={2.4} />
              <Text style={[styles.backText, { color: colors.brand }]}>{backLabel}</Text>
            </Pressable>
          )}
        </View>
        <Animated.Text
          numberOfLines={1}
          style={[styles.smallTitle, { color: colors.foreground, opacity: smallOpacity }]}
        >
          {title}
        </Animated.Text>
        <View style={[styles.side, styles.actions]}>
          {actions.map((a) => (
            <Pressable
              key={a.label}
              accessibilityRole="button"
              accessibilityLabel={a.label}
              onPress={a.onPress}
              style={({ pressed }) => [
                styles.action,
                { backgroundColor: pressed ? colors.accent : colors.muted },
              ]}
            >
              <Icon name={a.icon} size={18} />
              {a.badge && (
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: colors.destructive, borderColor: colors.muted },
                  ]}
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>
      {!compact && (
        <Animated.View
          style={[
            styles.large,
            { opacity: largeOpacity, transform: [{ scale: largeScale }], transformOrigin: "left" },
          ]}
        >
          {eyebrow && (
            <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>{eyebrow}</Text>
          )}
          <Text style={[styles.largeTitle, { color: colors.foreground }]} numberOfLines={1}>
            {title}
          </Text>
        </Animated.View>
      )}
      <Animated.View
        style={[styles.border, { backgroundColor: colors.border, opacity: borderOpacity }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { height: 48, flexDirection: "row", alignItems: "center", paddingHorizontal: 12 },
  side: { flex: 1, flexDirection: "row", alignItems: "center" },
  actions: { justifyContent: "flex-end", gap: 8 },
  back: { flexDirection: "row", alignItems: "center", marginLeft: -6 },
  backText: { fontSize: 17 },
  smallTitle: { fontSize: 17, fontWeight: "600", letterSpacing: -0.3, maxWidth: "50%" },
  action: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: 7,
    right: 8,
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  large: { paddingHorizontal: 20, paddingBottom: 10 },
  eyebrow: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  largeTitle: { fontSize: 34, fontWeight: "700", letterSpacing: -1 },
  border: { height: StyleSheet.hairlineWidth },
});
