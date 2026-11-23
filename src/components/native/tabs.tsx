import * as React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutRectangle,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type TabItem = { value: string; label: string; icon?: IconName; badge?: number };

export type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** "underline" for content sections, "pill" for compact filters. */
  variant?: "underline" | "pill";
  /** Stretch tabs to fill the width. */
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = "underline",
  fill = true,
  style,
}: TabsProps) {
  const { colors, shadow } = useTheme();
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
  const current = value ?? inner;
  const [layouts, setLayouts] = React.useState<Record<string, LayoutRectangle>>({});
  const x = React.useRef(new Animated.Value(0)).current;
  const w = React.useRef(new Animated.Value(0)).current;
  const ready = React.useRef(false);

  React.useEffect(() => {
    const l = layouts[current ?? ""];
    if (!l) return;
    if (!ready.current) {
      x.setValue(l.x);
      w.setValue(l.width);
      ready.current = true;
      return;
    }
    Animated.parallel([
      Animated.spring(x, { toValue: l.x, useNativeDriver: false, damping: 20, stiffness: 220 }),
      Animated.spring(w, { toValue: l.width, useNativeDriver: false, damping: 20, stiffness: 220 }),
    ]).start();
  }, [current, layouts, x, w]);

  const pill = variant === "pill";

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.list,
        pill
          ? [styles.pillList, { backgroundColor: colors.muted }]
          : { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
        style,
      ]}
    >
      <Animated.View
        style={[
          pill
            ? [styles.pillIndicator, shadow(1), { backgroundColor: colors.background }]
            : [styles.underline, { backgroundColor: colors.foreground }],
          { left: x, width: w, opacity: ready.current || Object.keys(layouts).length ? 1 : 0 },
        ]}
      />
      {items.map((item) => {
        const active = item.value === current;
        return (
          <Pressable
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onLayout={(e) => {
              const l = e.nativeEvent.layout;
              setLayouts((p) => ({ ...p, [item.value]: l }));
            }}
            onPress={() => {
              if (value === undefined) setInner(item.value);
              onValueChange?.(item.value);
            }}
            style={[styles.tab, fill && styles.fill, pill && styles.pillTab]}
          >
            {item.icon && (
              <Icon
                name={item.icon}
                size={16}
                color={active ? colors.foreground : colors.mutedForeground}
              />
            )}
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: active ? colors.foreground : colors.mutedForeground,
                  fontWeight: active ? "600" : "500",
                },
              ]}
            >
              {item.label}
            </Text>
            {item.badge != null && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: active ? colors.brand : colors.borderStrong },
                ]}
              >
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { flexDirection: "row", alignItems: "center" },
  pillList: { padding: 3, borderRadius: 14 },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 44,
    paddingHorizontal: 14,
  },
  pillTab: { height: 36, borderRadius: 11 },
  fill: { flex: 1 },
  label: { fontSize: 14 },
  underline: {
    position: "absolute",
    bottom: -StyleSheet.hairlineWidth,
    height: 2,
    borderRadius: 1,
  },
  pillIndicator: { position: "absolute", top: 3, bottom: 3, borderRadius: 11 },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#ffffff", fontSize: 10, fontWeight: "700" },
});
