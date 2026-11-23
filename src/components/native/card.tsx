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
import { useTheme } from "@/components/native/theme";
import { usePressScale } from "@/components/native/use-press-scale";

export type CardVariant = "outline" | "elevated" | "filled" | "ghost";

export type CardProps = {
  children: React.ReactNode;
  variant?: CardVariant;
  /** Makes the whole card pressable with spring feedback. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, variant = "outline", onPress, style }: CardProps) {
  const { colors, shadow } = useTheme();
  const press = usePressScale(0.98);

  const surface: StyleProp<ViewStyle> = [
    styles.card,
    variant === "outline" && {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
    },
    variant === "elevated" && [
      {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: StyleSheet.hairlineWidth,
      },
      shadow(2),
    ],
    variant === "filled" && { backgroundColor: colors.muted },
    variant === "ghost" && { backgroundColor: "transparent" },
    style,
  ];

  if (!onPress) return <View style={surface}>{children}</View>;
  return (
    <Animated.View style={press.style}>
      <Pressable accessibilityRole="button" onPress={onPress} {...press.handlers} style={surface}>
        {children}
      </Pressable>
    </Animated.View>
  );
}

export function CardHeader({
  title,
  description,
  right,
  style,
}: {
  title: string;
  description?: string;
  /** Content on the right, e.g. a Badge or IconButton. */
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.header, style]}>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[styles.title, { color: colors.cardForeground }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: colors.mutedForeground }]}>{description}</Text>
        )}
      </View>
      {right}
    </View>
  );
}

export function CardContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function CardFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  return <View style={[styles.footer, { borderTopColor: colors.border }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { borderRadius: 22, overflow: "hidden" },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 18,
    paddingBottom: 0,
  },
  title: { fontSize: 17, fontWeight: "600", letterSpacing: -0.3 },
  description: { fontSize: 14, lineHeight: 20 },
  content: { padding: 18 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
