import * as React from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";
import { usePressScale } from "@/components/native/use-press-scale";

export type ButtonVariant =
  | "default"
  | "brand"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<PressableProps, "style" | "children"> & {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Icon before the label. */
  leftIcon?: IconName;
  /** Icon after the label. */
  rightIcon?: IconName;
  /** Stretch to the parent width. */
  block?: boolean;
  style?: StyleProp<ViewStyle>;
};

const sizes = {
  sm: { height: 36, px: 14, font: 14, icon: 16, radius: 10, gap: 6 },
  md: { height: 46, px: 18, font: 15, icon: 18, radius: 13, gap: 8 },
  lg: { height: 54, px: 22, font: 16, icon: 20, radius: 16, gap: 10 },
};

export function Button({
  children,
  variant = "default",
  size = "md",
  loading,
  disabled,
  leftIcon,
  rightIcon,
  block,
  style,
  ...props
}: ButtonProps) {
  const { colors, shadow } = useTheme();
  const press = usePressScale(variant === "link" ? 1 : 0.97);
  const s = sizes[size];

  const palette: Record<ButtonVariant, { bg: string; fg: string; border?: string }> = {
    default: { bg: colors.primary, fg: colors.primaryForeground },
    brand: { bg: colors.brand, fg: colors.brandForeground },
    secondary: { bg: colors.secondary, fg: colors.secondaryForeground },
    outline: { bg: colors.background, fg: colors.foreground, border: colors.borderStrong },
    ghost: { bg: "transparent", fg: colors.foreground },
    destructive: { bg: colors.destructive, fg: colors.destructiveForeground },
    link: { bg: "transparent", fg: colors.brand },
  };
  const p = palette[variant];
  const inactive = disabled || loading;

  return (
    <Animated.View style={[press.style, block && styles.block, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!inactive, busy: !!loading }}
        disabled={inactive}
        {...press.handlers}
        {...props}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.base,
              {
                height: s.height,
                paddingHorizontal: variant === "link" ? 0 : s.px,
                borderRadius: s.radius,
                backgroundColor: p.bg,
                gap: s.gap,
                opacity: inactive ? 0.5 : pressed ? 0.88 : 1,
              },
              p.border && { borderWidth: 1, borderColor: p.border },
              (variant === "default" || variant === "brand" || variant === "destructive") &&
                shadow(1),
              variant === "ghost" && pressed && { backgroundColor: colors.accent },
            ]}
          >
            {/* Subtle top highlight for solid buttons. */}
            {(variant === "default" || variant === "brand") && (
              <View
                pointerEvents="none"
                style={[
                  styles.highlight,
                  { borderRadius: s.radius, borderColor: "rgba(255,255,255,0.14)" },
                ]}
              />
            )}
            {loading ? (
              <ActivityIndicator size="small" color={p.fg} />
            ) : leftIcon ? (
              <Icon name={leftIcon} size={s.icon} color={p.fg} />
            ) : null}
            {children != null && (
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  { color: p.fg, fontSize: s.font },
                  variant === "link" && pressed && styles.underline,
                ]}
              >
                {children}
              </Text>
            )}
            {rightIcon && !loading && <Icon name={rightIcon} size={s.icon} color={p.fg} />}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export type IconButtonProps = Omit<ButtonProps, "children" | "leftIcon" | "rightIcon" | "block"> & {
  icon: IconName;
  /** Required for screen readers. */
  accessibilityLabel: string;
  shape?: "rounded" | "circle";
};

export function IconButton({
  icon,
  size = "md",
  variant = "outline",
  shape = "rounded",
  style,
  ...props
}: IconButtonProps) {
  const { colors } = useTheme();
  const press = usePressScale(0.92);
  const s = sizes[size];
  const palette = {
    default: { bg: colors.primary, fg: colors.primaryForeground, border: undefined },
    brand: { bg: colors.brand, fg: colors.brandForeground, border: undefined },
    secondary: { bg: colors.secondary, fg: colors.secondaryForeground, border: undefined },
    outline: { bg: colors.background, fg: colors.foreground, border: colors.border },
    ghost: { bg: "transparent", fg: colors.foreground, border: undefined },
    destructive: { bg: colors.destructiveSoft, fg: colors.destructive, border: undefined },
    link: { bg: "transparent", fg: colors.brand, border: undefined },
  }[variant];

  return (
    <Animated.View style={[press.style, style]}>
      <Pressable accessibilityRole="button" {...press.handlers} {...props}>
        {({ pressed }) => (
          <View
            style={[
              styles.icon,
              {
                width: s.height,
                height: s.height,
                borderRadius: shape === "circle" ? s.height / 2 : s.radius,
                backgroundColor: pressed && variant !== "default" ? colors.accent : palette.bg,
                opacity: props.disabled ? 0.5 : 1,
              },
              palette.border && { borderWidth: 1, borderColor: palette.border },
            ]}
          >
            <Icon name={icon} size={s.icon} color={palette.fg} />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: { alignSelf: "stretch" },
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  highlight: { ...StyleSheet.absoluteFillObject, borderTopWidth: 1 },
  label: { fontWeight: "600", letterSpacing: -0.1 },
  underline: { textDecorationLine: "underline" },
  icon: { alignItems: "center", justifyContent: "center" },
});
