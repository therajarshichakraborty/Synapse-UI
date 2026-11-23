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
import { Icon } from "@/components/native/icon";
import { alpha, nativeDriver, useTheme } from "@/components/native/theme";

export type Plan = {
  id: string;
  name: string;
  price: string;
  /** e.g. "/month" */
  period?: string;
  description?: string;
  features?: string[];
  /** Pill in the corner, e.g. "Save 40%". */
  badge?: string;
};

export type PlanCardProps = {
  plan: Plan;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PlanCard({ plan, selected, onPress, style }: PlanCardProps) {
  const { colors } = useTheme();
  const anim = React.useRef(new Animated.Value(selected ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: nativeDriver,
      speed: 24,
      bounciness: 10,
    }).start();
  }, [selected, anim]);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: !!selected }}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: selected ? alpha(colors.brand, 0.06) : colors.card,
          borderColor: selected ? colors.brand : colors.border,
          borderWidth: selected ? 2 : 1,
          padding: selected ? 17 : 18,
        },
        style,
      ]}
    >
      <View style={styles.head}>
        <View
          style={[styles.radio, { borderColor: selected ? colors.brand : colors.borderStrong }]}
        >
          <Animated.View
            style={[
              styles.radioFill,
              { backgroundColor: colors.brand, opacity: anim, transform: [{ scale: anim }] },
            ]}
          >
            <Icon name="check" size={12} strokeWidth={3.5} color="#ffffff" />
          </Animated.View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.foreground }]}>{plan.name}</Text>
            {plan.badge && (
              <View style={[styles.badge, { backgroundColor: colors.brand }]}>
                <Text style={styles.badgeText}>{plan.badge}</Text>
              </View>
            )}
          </View>
          {plan.description && (
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              {plan.description}
            </Text>
          )}
        </View>
        <View style={styles.priceWrap}>
          <Text style={[styles.price, { color: colors.foreground }]}>{plan.price}</Text>
          {plan.period && (
            <Text style={[styles.period, { color: colors.mutedForeground }]}>{plan.period}</Text>
          )}
        </View>
      </View>
      {plan.features && plan.features.length > 0 && (
        <View style={[styles.features, { borderTopColor: colors.border }]}>
          {plan.features.map((f) => (
            <View key={f} style={styles.feature}>
              <Icon
                name="check"
                size={15}
                strokeWidth={2.75}
                color={selected ? colors.brand : colors.success}
              />
              <Text style={[styles.featureText, { color: colors.foreground }]}>{f}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 22 },
  head: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioFill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  name: { fontSize: 17, fontWeight: "600", letterSpacing: -0.3 },
  badge: { height: 20, paddingHorizontal: 8, borderRadius: 10, justifyContent: "center" },
  badgeText: { color: "#ffffff", fontSize: 11, fontWeight: "700" },
  description: { fontSize: 13, lineHeight: 18, marginTop: 2 },
  priceWrap: { alignItems: "flex-end" },
  price: { fontSize: 22, fontWeight: "700", letterSpacing: -0.6 },
  period: { fontSize: 12 },
  features: { marginTop: 16, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth, gap: 9 },
  feature: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { fontSize: 14 },
});
