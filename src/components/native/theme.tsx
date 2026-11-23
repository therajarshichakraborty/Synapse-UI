/**
 * Synapse UI Native: design tokens and theme.
 *
 * Every native component reads its colors from `useTheme()`. Wrap your app in
 * <ThemeProvider> to force a scheme or override colors; without it the system
 * color scheme is used.
 */
import * as React from "react";
import { Platform, useColorScheme, type ViewStyle } from "react-native";

export const palette = {
  light: {
    background: "#ffffff",
    foreground: "#0a0a0b",
    card: "#ffffff",
    cardForeground: "#0a0a0b",
    surface: "#fafafa",
    surfaceStrong: "#f4f4f5",
    muted: "#f4f4f5",
    mutedForeground: "#71717a",
    subtle: "#a1a1aa",
    border: "#e7e7ea",
    borderStrong: "#d4d4d8",
    input: "#e4e4e7",
    ring: "#a1a1aa",
    primary: "#18181b",
    primaryForeground: "#fafafa",
    secondary: "#f4f4f5",
    secondaryForeground: "#18181b",
    accent: "#f4f4f5",
    accentForeground: "#18181b",
    brand: "#2563eb",
    brandForeground: "#ffffff",
    brandSoft: "#eff4ff",
    success: "#16a34a",
    successSoft: "#ecfdf3",
    warning: "#d97706",
    warningSoft: "#fffaeb",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    destructiveSoft: "#fef2f2",
    overlay: "rgba(9, 9, 11, 0.42)",
    shadow: "#0a0a0b",
  },
  dark: {
    background: "#09090b",
    foreground: "#f4f4f5",
    card: "#111113",
    cardForeground: "#f4f4f5",
    surface: "#111113",
    surfaceStrong: "#18181b",
    muted: "#18181b",
    mutedForeground: "#a1a1aa",
    subtle: "#71717a",
    border: "#232327",
    borderStrong: "#2e2e33",
    input: "#27272a",
    ring: "#52525b",
    primary: "#f4f4f5",
    primaryForeground: "#09090b",
    secondary: "#1c1c1f",
    secondaryForeground: "#f4f4f5",
    accent: "#1f1f23",
    accentForeground: "#f4f4f5",
    brand: "#3b82f6",
    brandForeground: "#ffffff",
    brandSoft: "#172036",
    success: "#4ade80",
    successSoft: "#0f2418",
    warning: "#fbbf24",
    warningSoft: "#2a2110",
    destructive: "#f87171",
    destructiveForeground: "#0a0a0b",
    destructiveSoft: "#2a1414",
    overlay: "rgba(0, 0, 0, 0.62)",
    shadow: "#000000",
  },
};

export type ThemeColors = typeof palette.light;
export type ColorScheme = "light" | "dark";

export const radius = { xs: 6, sm: 8, md: 12, lg: 16, xl: 20, "2xl": 24, "3xl": 32, full: 9999 };

/** 4pt spacing scale: space(4) === 16. */
export const space = (n: number) => n * 4;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
};

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const fontFamily = {
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "ui-monospace, Menlo, monospace",
  }),
};

/** Animated: use the native driver everywhere except react-native-web. */
export const nativeDriver = Platform.OS !== "web";

/** Cross-platform elevation. Level 0–4. */
export function shadow(level: 0 | 1 | 2 | 3 | 4, scheme: ColorScheme = "light"): ViewStyle {
  if (level === 0) return {};
  const dark = scheme === "dark";
  const y = [0, 1, 4, 10, 18][level];
  const blur = [0, 3, 12, 28, 44][level];
  const alpha = (dark ? [0, 0.4, 0.5, 0.55, 0.6] : [0, 0.06, 0.08, 0.12, 0.16])[level];
  if (Platform.OS === "web") {
    return { boxShadow: `0px ${y}px ${blur}px rgba(0,0,0,${alpha})` } as ViewStyle;
  }
  return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: y },
    shadowOpacity: alpha,
    shadowRadius: blur / 2,
    elevation: level * 3,
  };
}

/** Hex color to rgba(). */
export function alpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

type ThemeValue = {
  scheme: ColorScheme;
  colors: ThemeColors;
  radius: typeof radius;
  space: typeof space;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  shadow: (level: 0 | 1 | 2 | 3 | 4) => ViewStyle;
};

const ThemeContext = React.createContext<{
  scheme?: ColorScheme;
  colors?: Partial<Record<ColorScheme, Partial<ThemeColors>>>;
} | null>(null);

export function ThemeProvider({
  scheme,
  colors,
  children,
}: {
  /** Force a scheme. Defaults to the device setting. */
  scheme?: ColorScheme;
  /** Override tokens per scheme, e.g. `{ light: { brand: "#7c3aed" } }`. */
  colors?: Partial<Record<ColorScheme, Partial<ThemeColors>>>;
  children: React.ReactNode;
}) {
  const value = React.useMemo(() => ({ scheme, colors }), [scheme, colors]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = React.useContext(ThemeContext);
  const system = useColorScheme();
  const scheme: ColorScheme = ctx?.scheme ?? (system === "dark" ? "dark" : "light");
  return React.useMemo(
    () => ({
      scheme,
      colors: { ...palette[scheme], ...(ctx?.colors?.[scheme] ?? {}) },
      radius,
      space,
      fontSize,
      fontWeight,
      shadow: (level: 0 | 1 | 2 | 3 | 4) => shadow(level, scheme),
    }),
    [scheme, ctx?.colors],
  );
}
