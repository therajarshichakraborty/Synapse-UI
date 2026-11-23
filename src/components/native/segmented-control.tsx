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

export type SegmentedControlProps = {
  options: (string | { value: string; label?: string; icon?: IconName })[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md";
  style?: StyleProp<ViewStyle>;
};

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  style,
}: SegmentedControlProps) {
  const { colors, shadow, scheme } = useTheme();
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const [inner, setInner] = React.useState(defaultValue ?? opts[0]?.value);
  const current = value ?? inner;
  const index = Math.max(
    0,
    opts.findIndex((o) => o.value === current),
  );
  const [width, setWidth] = React.useState(0);
  const x = React.useRef(new Animated.Value(index)).current;
  const pad = 3;
  const seg = (width - pad * 2) / opts.length;
  const h = size === "sm" ? 32 : 40;

  React.useEffect(() => {
    Animated.spring(x, {
      toValue: index,
      useNativeDriver: false,
      damping: 20,
      stiffness: 260,
    }).start();
  }, [index, x]);

  return (
    <View
      accessibilityRole="tablist"
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={[
        styles.root,
        { height: h, backgroundColor: colors.muted, borderRadius: h / 2.6 },
        style,
      ]}
    >
      {width > 0 && (
        <Animated.View
          style={[
            styles.thumb,
            shadow(1),
            {
              width: seg,
              borderRadius: h / 2.6 - 2,
              backgroundColor: scheme === "dark" ? colors.borderStrong : colors.background,
              transform: [{ translateX: Animated.add(Animated.multiply(x, seg), pad) }],
            },
          ]}
        />
      )}
      {opts.map((o, i) => {
        const active = i === index;
        return (
          <React.Fragment key={o.value}>
            {i > 0 && (
              <View
                style={[
                  styles.divider,
                  {
                    backgroundColor: colors.borderStrong,
                    opacity: active || i === index + 1 ? 0 : 1,
                  },
                ]}
              />
            )}
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={o.label ?? o.value}
              onPress={() => {
                if (value === undefined) setInner(o.value);
                onValueChange?.(o.value);
              }}
              style={styles.segment}
            >
              {o.icon && (
                <Icon
                  name={o.icon}
                  size={15}
                  color={active ? colors.foreground : colors.mutedForeground}
                />
              )}
              {o.label && (
                <Text
                  numberOfLines={1}
                  style={[
                    styles.label,
                    {
                      color: active ? colors.foreground : colors.mutedForeground,
                      fontWeight: active ? "600" : "500",
                      fontSize: size === "sm" ? 13 : 14,
                    },
                  ]}
                >
                  {o.label}
                </Text>
              )}
            </Pressable>
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: "row", alignItems: "center", padding: 3 },
  thumb: { position: "absolute", left: 0, top: 3, bottom: 3 },
  segment: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  label: { letterSpacing: -0.1 },
  divider: { width: StyleSheet.hairlineWidth, height: "45%" },
});
