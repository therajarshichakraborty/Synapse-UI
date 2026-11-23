import * as React from "react";
import { Animated, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon } from "@/components/native/icon";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type ChatBubbleProps = {
  children: React.ReactNode;
  /** "me" aligns right with the brand color. */
  from?: "me" | "them";
  time?: string;
  status?: "sending" | "sent" | "read";
  /** Draw the tail. Turn off for grouped messages that follow one another. */
  tail?: boolean;
  /** Animate in when mounted. */
  animate?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ChatBubble({
  children,
  from = "them",
  time,
  status,
  tail = true,
  animate = true,
  style,
}: ChatBubbleProps) {
  const { colors } = useTheme();
  const me = from === "me";
  const anim = React.useRef(new Animated.Value(animate ? 0 : 1)).current;

  React.useEffect(() => {
    if (!animate) return;
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: nativeDriver,
      damping: 16,
      stiffness: 220,
    }).start();
  }, [animate, anim]);

  const bg = me ? colors.brand : colors.muted;
  const fg = me ? colors.brandForeground : colors.foreground;
  const r = 20;

  return (
    <Animated.View
      style={[
        styles.row,
        me ? styles.end : styles.start,
        {
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) },
          ],
        },
        style,
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: bg,
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
            borderBottomLeftRadius: !me && tail ? 6 : r,
            borderBottomRightRadius: me && tail ? 6 : r,
          },
        ]}
      >
        {typeof children === "string" ? (
          <Text style={[styles.text, { color: fg }]}>{children}</Text>
        ) : (
          children
        )}
        {(time || status) && (
          <View style={styles.meta}>
            {time && (
              <Text
                style={[
                  styles.time,
                  { color: me ? "rgba(255,255,255,0.72)" : colors.mutedForeground },
                ]}
              >
                {time}
              </Text>
            )}
            {me && status === "sending" && (
              <Icon name="clock" size={12} color="rgba(255,255,255,0.72)" />
            )}
            {me && status === "sent" && (
              <Icon name="check" size={13} strokeWidth={2.5} color="rgba(255,255,255,0.72)" />
            )}
            {me && status === "read" && (
              <View style={styles.read}>
                <Icon name="check" size={13} strokeWidth={2.5} color="#ffffff" />
                <View style={{ marginLeft: -8 }}>
                  <Icon name="check" size={13} strokeWidth={2.5} color="#ffffff" />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginVertical: 2 },
  start: { justifyContent: "flex-start", paddingRight: 56 },
  end: { justifyContent: "flex-end", paddingLeft: 56 },
  bubble: { paddingHorizontal: 14, paddingTop: 9, paddingBottom: 8, maxWidth: "100%" },
  text: { fontSize: 16, lineHeight: 22 },
  meta: { flexDirection: "row", alignItems: "center", alignSelf: "flex-end", gap: 4, marginTop: 2 },
  time: { fontSize: 11, fontVariant: ["tabular-nums"] },
  read: { flexDirection: "row" },
});
