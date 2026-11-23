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
import { nativeDriver, useTheme } from "@/components/native/theme";

export type FabAction = { icon: IconName; label: string; onPress: () => void };

export type FabProps = {
  icon?: IconName;
  /** Extended FAB text. */
  label?: string;
  onPress?: () => void;
  /** Speed-dial actions. When set, pressing toggles the menu. */
  actions?: FabAction[];
  /** Absolute placement in the parent. */
  position?: "bottom-right" | "bottom-center" | "none";
  offset?: number;
  style?: StyleProp<ViewStyle>;
};

export function Fab({
  icon = "plus",
  label,
  onPress,
  actions,
  position = "bottom-right",
  offset = 24,
  style,
}: FabProps) {
  const { colors, shadow } = useTheme();
  const [open, setOpen] = React.useState(false);
  const anim = React.useRef(new Animated.Value(0)).current;
  const press = React.useRef(new Animated.Value(1)).current;
  const hasMenu = !!actions?.length;

  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: open ? 1 : 0,
      useNativeDriver: nativeDriver,
      damping: 16,
      stiffness: 200,
    }).start();
  }, [open, anim]);

  const pressTo = (v: number) =>
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: nativeDriver,
      speed: 40,
      bounciness: 8,
    }).start();

  const place: ViewStyle =
    position === "bottom-right"
      ? { position: "absolute", right: offset, bottom: offset }
      : position === "bottom-center"
        ? { position: "absolute", bottom: offset, alignSelf: "center" }
        : {};

  return (
    <>
      {hasMenu && open && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setOpen(false)}
          accessibilityLabel="Close menu"
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: colors.background, opacity: Animated.multiply(anim, 0.72) },
            ]}
          />
        </Pressable>
      )}
      <View pointerEvents="box-none" style={[styles.wrap, place, style]}>
        {hasMenu &&
          actions!.map((a, i) => {
            const n = actions!.length - i;
            return (
              <Animated.View
                key={a.label}
                pointerEvents={open ? "auto" : "none"}
                style={[
                  styles.actionRow,
                  {
                    opacity: anim,
                    transform: [
                      {
                        translateY: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20 * n, 0],
                        }),
                      },
                      { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.actionLabel,
                    shadow(2),
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <Text style={[styles.actionLabelText, { color: colors.foreground }]}>
                    {a.label}
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={a.label}
                  onPress={() => {
                    setOpen(false);
                    a.onPress();
                  }}
                  style={({ pressed }) => [
                    styles.mini,
                    shadow(2),
                    {
                      backgroundColor: pressed ? colors.accent : colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Icon name={a.icon} size={20} />
                </Pressable>
              </Animated.View>
            );
          })}
        <Animated.View style={{ transform: [{ scale: press }] }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              label ?? (hasMenu ? (open ? "Close actions" : "Open actions") : "Action")
            }
            accessibilityState={hasMenu ? { expanded: open } : undefined}
            onPressIn={() => pressTo(0.92)}
            onPressOut={() => pressTo(1)}
            onPress={() => (hasMenu ? setOpen((o) => !o) : onPress?.())}
            style={[
              styles.fab,
              shadow(4),
              label ? styles.extended : null,
              { backgroundColor: colors.primary },
            ]}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "135deg"],
                    }),
                  },
                ],
              }}
            >
              <Icon name={icon} size={24} strokeWidth={2.4} color={colors.primaryForeground} />
            </Animated.View>
            {label && (
              <Text style={[styles.label, { color: colors.primaryForeground }]}>{label}</Text>
            )}
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "flex-end", gap: 14 },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  extended: { width: undefined, paddingHorizontal: 22 },
  label: { fontSize: 16, fontWeight: "600" },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 12, marginRight: 6 },
  actionLabel: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  actionLabelText: { fontSize: 14, fontWeight: "600" },
  mini: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
