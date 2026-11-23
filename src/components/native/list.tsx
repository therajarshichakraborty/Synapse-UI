import * as React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type ListGroupProps = {
  /** Small uppercase heading above the group. */
  header?: string;
  /** Helper text below the group. */
  footer?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** An inset, rounded group of rows, like iOS Settings. Separators are added for you. */
export function ListGroup({ header, footer, children, style }: ListGroupProps) {
  const { colors } = useTheme();
  const rows = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={style}>
      {header && <Text style={[styles.header, { color: colors.mutedForeground }]}>{header}</Text>}
      <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {rows.map((row, i) => (
          <React.Fragment key={i}>
            {i > 0 && <View style={[styles.separator, { backgroundColor: colors.border }]} />}
            {row}
          </React.Fragment>
        ))}
      </View>
      {footer && <Text style={[styles.footer, { color: colors.mutedForeground }]}>{footer}</Text>}
    </View>
  );
}

export type ListItemProps = {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** Background of the icon tile, e.g. "#3b82f6". */
  iconColor?: string;
  /** Custom leading element (Avatar, image). Overrides `icon`. */
  leading?: React.ReactNode;
  /** Value text on the right. */
  value?: string;
  /** Custom trailing element, e.g. a Switch. */
  trailing?: React.ReactNode;
  onPress?: () => void;
  /** Shows a chevron. Defaults to true when pressable and no trailing element. */
  chevron?: boolean;
  destructive?: boolean;
};

export function ListItem({
  title,
  subtitle,
  icon,
  iconColor,
  leading,
  value,
  trailing,
  onPress,
  chevron,
  destructive,
}: ListItemProps) {
  const { colors } = useTheme();
  const showChevron = chevron ?? (!!onPress && !trailing);

  const content = (pressed: boolean) => (
    <View style={[styles.row, pressed && { backgroundColor: colors.accent }]}>
      {leading ??
        (icon && (
          <View style={[styles.iconTile, { backgroundColor: iconColor ?? colors.muted }]}>
            <Icon
              name={icon}
              size={17}
              color={iconColor ? "#ffffff" : colors.foreground}
              strokeWidth={2.2}
            />
          </View>
        ))}
      <View style={styles.text}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: destructive ? colors.destructive : colors.foreground }]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text numberOfLines={2} style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {value && <Text style={[styles.value, { color: colors.mutedForeground }]}>{value}</Text>}
      {trailing}
      {showChevron && <Icon name="chevron-right" size={18} color={colors.subtle} />}
    </View>
  );

  if (!onPress) return content(false);
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginLeft: 16,
    marginBottom: 8,
  },
  footer: { fontSize: 13, lineHeight: 18, marginHorizontal: 16, marginTop: 8 },
  group: { borderRadius: 18, overflow: "hidden", borderWidth: StyleSheet.hairlineWidth },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: 60 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  iconTile: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: 2 },
  title: { fontSize: 16 },
  subtitle: { fontSize: 13, lineHeight: 18 },
  value: { fontSize: 15 },
});
