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

export type TabBarItem = { key: string; label: string; icon: IconName; badge?: number };

export type TabBarProps = {
  items: TabBarItem[];
  value: string;
  onValueChange: (key: string) => void;
  /** "floating" is a rounded pill above the content; "docked" spans the bottom edge. */
  variant?: "floating" | "docked";
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Works standalone or as a custom `tabBar` for Expo Router / React Navigation:
 *   tabBar={({ state, navigation }) => <TabBar value={state.routes[state.index].name} … />}
 */
export function TabBar({
  items,
  value,
  onValueChange,
  variant = "floating",
  bottomInset = 20,
  style,
}: TabBarProps) {
  const { colors, shadow } = useTheme();
  const [width, setWidth] = React.useState(0);
  const index = Math.max(
    0,
    items.findIndex((i) => i.key === value),
  );
  const x = React.useRef(new Animated.Value(index)).current;
  const pad = 6;
  const slot = (width - pad * 2) / items.length;
  const floating = variant === "floating";

  React.useEffect(() => {
    Animated.spring(x, {
      toValue: index,
      useNativeDriver: false,
      damping: 18,
      stiffness: 200,
      mass: 0.8,
    }).start();
  }, [index, x]);

  return (
    <View
      accessibilityRole="tablist"
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={[
        styles.bar,
        floating
          ? [
              styles.floating,
              shadow(4),
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                marginBottom: bottomInset,
              },
            ]
          : [
              styles.docked,
              {
                backgroundColor: colors.background,
                borderTopColor: colors.border,
                paddingBottom: bottomInset,
              },
            ],
        style,
      ]}
    >
      {width > 0 && floating && (
        <Animated.View
          style={[
            styles.pill,
            {
              width: slot,
              backgroundColor: colors.muted,
              transform: [{ translateX: Animated.add(Animated.multiply(x, slot), pad) }],
            },
          ]}
        />
      )}
      {items.map((item) => {
        const active = item.key === value;
        const tint = active ? colors.foreground : colors.subtle;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            onPress={() => onValueChange(item.key)}
            style={styles.tab}
          >
            <View>
              <Icon name={item.icon} size={22} color={tint} strokeWidth={active ? 2.3 : 2} />
              {item.badge != null && item.badge > 0 && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: colors.destructive,
                      borderColor: floating ? colors.card : colors.background,
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>{item.badge > 9 ? "9+" : item.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, { color: tint, fontWeight: active ? "600" : "500" }]}>
              {item.label}
            </Text>
            {!floating && active && (
              <View style={[styles.underline, { backgroundColor: colors.foreground }]} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", alignItems: "center" },
  floating: {
    marginHorizontal: 16,
    height: 66,
    borderRadius: 33,
    paddingHorizontal: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  docked: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 8 },
  pill: { position: "absolute", left: 0, top: 6, bottom: 6, borderRadius: 27 },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3, height: 54 },
  label: { fontSize: 11 },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#ffffff", fontSize: 9, fontWeight: "800" },
  underline: { position: "absolute", top: -8, width: 22, height: 2.5, borderRadius: 2 },
});
