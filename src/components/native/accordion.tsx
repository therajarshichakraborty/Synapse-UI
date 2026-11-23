import * as React from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type AccordionItem = { value: string; title: string; content: React.ReactNode };

export type AccordionProps = {
  items: AccordionItem[];
  /** "single" closes others when one opens. */
  type?: "single" | "multiple";
  defaultValue?: string[];
  /** "separated" draws each item as its own card. */
  variant?: "plain" | "separated";
  style?: StyleProp<ViewStyle>;
};

function Section({
  item,
  open,
  onToggle,
  variant,
  last,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
  variant: "plain" | "separated";
  last: boolean;
}) {
  const { colors } = useTheme();
  const anim = React.useRef(new Animated.Value(open ? 1 : 0)).current;
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 280,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [open, anim]);

  return (
    <View
      style={[
        variant === "separated"
          ? [
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: open ? colors.borderStrong : colors.border,
              },
            ]
          : !last && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.border,
            },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        style={[styles.trigger, variant === "separated" && styles.padded]}
      >
        <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
        <Animated.View
          style={{
            transform: [
              { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }) },
            ],
          }}
        >
          <Icon name="chevron-down" size={18} color={colors.mutedForeground} />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={{
          overflow: "hidden",
          height: anim.interpolate({ inputRange: [0, 1], outputRange: [0, height] }),
          opacity: anim,
        }}
      >
        {/* Measured off-flow so the animation knows the target height. */}
        <View
          style={[
            styles.content,
            variant === "separated" && styles.paddedContent,
            { position: "absolute", left: 0, right: 0 },
          ]}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        >
          {typeof item.content === "string" ? (
            <Text style={[styles.body, { color: colors.mutedForeground }]}>{item.content}</Text>
          ) : (
            item.content
          )}
        </View>
      </Animated.View>
    </View>
  );
}

export function Accordion({
  items,
  type = "single",
  defaultValue = [],
  variant = "plain",
  style,
}: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultValue);
  const toggle = (v: string) =>
    setOpen((cur) =>
      cur.includes(v) ? cur.filter((x) => x !== v) : type === "single" ? [v] : [...cur, v],
    );

  return (
    <View style={[variant === "separated" && { gap: 10 }, style]}>
      {items.map((item, i) => (
        <Section
          key={item.value}
          item={item}
          open={open.includes(item.value)}
          onToggle={() => toggle(item.value)}
          variant={variant}
          last={i === items.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, overflow: "hidden" },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 16,
  },
  padded: { paddingHorizontal: 16 },
  title: { flex: 1, fontSize: 16, fontWeight: "600", letterSpacing: -0.2 },
  content: { paddingBottom: 16 },
  paddedContent: { paddingHorizontal: 16 },
  body: { fontSize: 15, lineHeight: 22 },
});
