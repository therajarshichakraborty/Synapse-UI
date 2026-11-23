import * as React from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";
import { usePressScale } from "@/components/native/use-press-scale";

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  /** Shows a remove button. */
  onRemove?: () => void;
  count?: number;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, selected, onPress, icon, onRemove, count, style }: ChipProps) {
  const { colors } = useTheme();
  const press = usePressScale(0.94);
  const fg = selected ? colors.primaryForeground : colors.foreground;

  // The remove button is a sibling of the main pressable (never nested),
  // so it stays a separate, valid touch target on every platform.
  return (
    <Animated.View
      style={[
        press.style,
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : colors.background,
          borderColor: selected ? colors.primary : colors.border,
        },
        onRemove && styles.removable,
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={onPress}
        disabled={!onPress && !!onRemove}
        {...press.handlers}
        style={styles.main}
      >
        {selected && !icon ? (
          <Icon name="check" size={14} strokeWidth={3} color={fg} />
        ) : icon ? (
          <Icon name={icon} size={15} color={fg} />
        ) : null}
        <Text style={[styles.label, { color: fg }]}>{label}</Text>
        {count != null && (
          <View
            style={[
              styles.count,
              { backgroundColor: selected ? "rgba(255,255,255,0.18)" : colors.muted },
            ]}
          >
            <Text style={[styles.countText, { color: selected ? fg : colors.mutedForeground }]}>
              {count}
            </Text>
          </View>
        )}
      </Pressable>
      {onRemove && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          hitSlop={8}
          onPress={onRemove}
          style={({ pressed }) => [
            styles.remove,
            {
              backgroundColor: pressed
                ? selected
                  ? "rgba(255,255,255,0.2)"
                  : colors.muted
                : "transparent",
            },
          ]}
        >
          <Icon
            name="x"
            size={13}
            strokeWidth={2.5}
            color={selected ? fg : colors.mutedForeground}
          />
        </Pressable>
      )}
    </Animated.View>
  );
}

export type ChipGroupProps = {
  options: { value: string; label: string; icon?: IconName; count?: number }[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Allow more than one selection. */
  multiple?: boolean;
  /** Lay out in a single horizontally scrolling row. */
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ChipGroup({
  options,
  value,
  defaultValue = [],
  onValueChange,
  multiple = false,
  scrollable = false,
  style,
}: ChipGroupProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;

  const toggle = (v: string) => {
    const has = current.includes(v);
    const next = multiple
      ? has
        ? current.filter((x) => x !== v)
        : [...current, v]
      : has
        ? []
        : [v];
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };

  const chips = options.map((o) => (
    <Chip
      key={o.value}
      label={o.label}
      icon={o.icon}
      count={o.count}
      selected={current.includes(o.value)}
      onPress={() => toggle(o.value)}
    />
  ));

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        style={style}
      >
        {chips}
      </ScrollView>
    );
  }
  return <View style={[styles.wrap, style]}>{chips}</View>;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: "100%",
    paddingHorizontal: 14,
  },
  removable: { paddingRight: 4 },
  remove: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  label: { fontSize: 14, fontWeight: "500" },
  count: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: { fontSize: 11, fontWeight: "600" },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  scroll: { gap: 8, paddingHorizontal: 2 },
});
