import * as React from "react";
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from "react-native";
import { fontFamily, useTheme } from "@/components/native/theme";

export type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "lead"
  | "body"
  | "large"
  | "small"
  | "muted"
  | "caption"
  | "overline"
  | "code";

const variants: Record<TextVariant, TextStyle> = {
  display: { fontSize: 44, lineHeight: 48, fontWeight: "700", letterSpacing: -1.4 },
  h1: { fontSize: 34, lineHeight: 40, fontWeight: "700", letterSpacing: -0.9 },
  h2: { fontSize: 28, lineHeight: 34, fontWeight: "600", letterSpacing: -0.6 },
  h3: { fontSize: 22, lineHeight: 28, fontWeight: "600", letterSpacing: -0.4 },
  h4: { fontSize: 18, lineHeight: 24, fontWeight: "600", letterSpacing: -0.2 },
  lead: { fontSize: 18, lineHeight: 27 },
  body: { fontSize: 16, lineHeight: 24 },
  large: { fontSize: 17, lineHeight: 24, fontWeight: "600" },
  small: { fontSize: 14, lineHeight: 20, fontWeight: "500" },
  muted: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
  overline: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  code: { fontSize: 13, lineHeight: 18, fontFamily: fontFamily.mono },
};

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  /** Override the color token. */
  tone?: "default" | "muted" | "brand" | "success" | "warning" | "destructive";
  align?: TextStyle["textAlign"];
  weight?: TextStyle["fontWeight"];
};

export function Text({ variant = "body", tone, align, weight, style, ...props }: TextProps) {
  const { colors } = useTheme();
  const muted =
    variant === "muted" || variant === "caption" || variant === "lead" || variant === "overline";
  const color = {
    default: colors.foreground,
    muted: colors.mutedForeground,
    brand: colors.brand,
    success: colors.success,
    warning: colors.warning,
    destructive: colors.destructive,
  }[tone ?? (muted ? "muted" : "default")];

  return (
    <RNText
      style={[
        variants[variant],
        { color },
        variant === "code" && {
          backgroundColor: colors.muted,
          borderRadius: 6,
          paddingHorizontal: 5,
          paddingVertical: 1,
        },
        align ? { textAlign: align } : null,
        weight ? { fontWeight: weight } : null,
        style,
      ]}
      {...props}
    />
  );
}
