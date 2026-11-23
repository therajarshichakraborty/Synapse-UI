import * as React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type ChatInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  onSend?: (text: string) => void;
  placeholder?: string;
  /** Shows a stop button instead of send. */
  busy?: boolean;
  onStop?: () => void;
  /** Leading action buttons, e.g. attach or camera. */
  actions?: { icon: IconName; label: string; onPress?: () => void }[];
  maxLines?: number;
  style?: StyleProp<ViewStyle>;
};

export function ChatInput({
  value,
  onChangeText,
  onSend,
  placeholder = "Message",
  busy,
  onStop,
  actions = [{ icon: "plus", label: "Add attachment" }],
  maxLines = 6,
  style,
}: ChatInputProps) {
  const { colors, shadow } = useTheme();
  const [inner, setInner] = React.useState("");
  const [height, setHeight] = React.useState(22);
  const text = value ?? inner;
  const canSend = text.trim().length > 0;
  const pop = React.useRef(new Animated.Value(canSend || busy ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(pop, {
      toValue: canSend || busy ? 1 : 0,
      useNativeDriver: nativeDriver,
      speed: 22,
      bounciness: 10,
    }).start();
  }, [canSend, busy, pop]);

  const change = (t: string) => {
    if (value === undefined) setInner(t);
    onChangeText?.(t);
  };

  const send = () => {
    if (busy) return onStop?.();
    if (!canSend) return;
    onSend?.(text.trim());
    change("");
    setHeight(22);
  };

  return (
    <View
      style={[
        styles.wrap,
        shadow(2),
        { backgroundColor: colors.card, borderColor: colors.border },
        style,
      ]}
    >
      {actions.map((a) => (
        <Pressable
          key={a.label}
          accessibilityRole="button"
          accessibilityLabel={a.label}
          onPress={a.onPress}
          style={({ pressed }) => [
            styles.action,
            { backgroundColor: pressed ? colors.accent : colors.muted },
          ]}
        >
          <Icon name={a.icon} size={18} color={colors.foreground} />
        </Pressable>
      ))}
      <TextInput
        multiline
        value={text}
        onChangeText={change}
        placeholder={placeholder}
        placeholderTextColor={colors.subtle}
        selectionColor={colors.brand}
        onContentSizeChange={(e) =>
          setHeight(Math.min(e.nativeEvent.contentSize.height, maxLines * 22))
        }
        onSubmitEditing={send}
        style={[styles.input, { color: colors.foreground, height: Math.max(22, height) }]}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={busy ? "Stop" : "Send"}
        onPress={send}
      >
        <Animated.View
          style={[
            styles.send,
            {
              backgroundColor: canSend || busy ? colors.primary : colors.muted,
              transform: [
                { scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.86, 1] }) },
              ],
            },
          ]}
        >
          {busy ? (
            <View style={[styles.stop, { backgroundColor: colors.primaryForeground }]} />
          ) : (
            <Icon
              name="arrow-up"
              size={18}
              strokeWidth={2.5}
              color={canSend ? colors.primaryForeground : colors.subtle}
            />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    padding: 7,
    borderRadius: 26,
    borderWidth: StyleSheet.hairlineWidth,
  },
  action: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    paddingTop: 7,
    paddingBottom: 7,
    minHeight: 36,
    outlineStyle: "none",
  } as never,
  send: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  stop: { width: 12, height: 12, borderRadius: 3 },
});
