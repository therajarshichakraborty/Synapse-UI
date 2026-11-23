import * as React from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { Icon, type IconName } from "@/components/native/icon";
import { nativeDriver, useTheme } from "@/components/native/theme";
import { usePressScale } from "@/components/native/use-press-scale";

export type MediaCardProps = {
  image: string;
  title: string;
  subtitle?: string;
  /** Small pill in the top-left, e.g. "Featured". */
  eyebrow?: string;
  /** Top-right round action, e.g. heart or bookmark. */
  action?: { icon: IconName; label: string; active?: boolean; onPress: () => void };
  /** Bottom-right content, e.g. a price. */
  meta?: string;
  aspectRatio?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

let gid = 0;

export function MediaCard({
  image,
  title,
  subtitle,
  eyebrow,
  action,
  meta,
  aspectRatio = 4 / 5,
  onPress,
  style,
}: MediaCardProps) {
  const { colors, shadow } = useTheme();
  const press = usePressScale(0.97);
  const id = React.useRef(`scrim-${++gid}`).current;
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  return (
    <Animated.View style={[press.style, shadow(3), styles.shadowWrap, style]}>
      <Pressable
        accessibilityRole={onPress ? "button" : undefined}
        onPress={onPress}
        disabled={!onPress}
        {...press.handlers}
        onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
        style={[styles.card, { aspectRatio, backgroundColor: colors.muted }]}
      >
        <Image
          source={{ uri: image }}
          alt={title}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        {size.w > 0 && (
          <Svg width={size.w} height={size.h} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0.35" stopColor="#000" stopOpacity={0} />
                <Stop offset="1" stopColor="#000" stopOpacity={0.78} />
              </LinearGradient>
            </Defs>
            <Rect width={size.w} height={size.h} fill={`url(#${id})`} />
          </Svg>
        )}
        <View style={styles.top}>
          {eyebrow ? (
            <View style={styles.eyebrow}>
              <Text style={styles.eyebrowText}>{eyebrow}</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.bottom}>
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
          {meta && <Text style={styles.meta}>{meta}</Text>}
        </View>
      </Pressable>
      {/* A sibling of the card pressable, never nested inside it. */}
      {action && <CardAction {...action} />}
    </Animated.View>
  );
}

function CardAction({ icon, label, active, onPress }: NonNullable<MediaCardProps["action"]>) {
  const pop = React.useRef(new Animated.Value(1)).current;
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    pop.setValue(active ? 0.55 : 0.85);
    Animated.spring(pop, {
      toValue: 1,
      useNativeDriver: nativeDriver,
      speed: 16,
      bounciness: 18,
    }).start();
  }, [active, pop]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.action, { opacity: pressed ? 0.8 : 1 }]}
    >
      <Animated.View style={{ transform: [{ scale: pop }] }}>
        <Icon
          name={icon}
          size={18}
          color={active ? "#ef4444" : "#ffffff"}
          fill={active ? "#ef4444" : "none"}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadowWrap: { borderRadius: 26 },
  card: { borderRadius: 26, overflow: "hidden", justifyContent: "space-between" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 },
  eyebrow: {
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 13,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.35)",
  },
  eyebrowText: { color: "#ffffff", fontSize: 12, fontWeight: "600" },
  action: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  bottom: { flexDirection: "row", alignItems: "flex-end", gap: 12, padding: 18 },
  title: { color: "#ffffff", fontSize: 21, fontWeight: "700", letterSpacing: -0.5, lineHeight: 26 },
  subtitle: { color: "rgba(255,255,255,0.78)", fontSize: 14 },
  meta: { color: "#ffffff", fontSize: 17, fontWeight: "700" },
});
