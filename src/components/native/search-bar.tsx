import * as React from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { Icon } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type SearchBarProps = Omit<TextInputProps, "style"> & {
  /** Label of the cancel button that slides in while focused. */
  cancelLabel?: string;
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SearchBar({
  cancelLabel = "Cancel",
  onCancel,
  value,
  defaultValue,
  onChangeText,
  placeholder = "Search",
  style,
  ...props
}: SearchBarProps) {
  const { colors } = useTheme();
  const ref = React.useRef<TextInput>(null);
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const [focused, setFocused] = React.useState(false);
  const [cancelWidth, setCancelWidth] = React.useState(0);
  const text = value ?? inner;
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: focused ? 1 : 0,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [focused, progress]);

  const change = (t: string) => {
    if (value === undefined) setInner(t);
    onChangeText?.(t);
  };

  return (
    <View style={[styles.row, style]}>
      <View style={[styles.field, { backgroundColor: colors.muted }]}>
        <Icon name="search" size={17} color={colors.mutedForeground} />
        <TextInput
          ref={ref}
          value={text}
          onChangeText={change}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          selectionColor={colors.brand}
          returnKeyType="search"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, { color: colors.foreground }]}
          {...props}
        />
        {text.length > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={10}
            onPress={() => change("")}
            style={[styles.clear, { backgroundColor: colors.subtle }]}
          >
            <Icon name="x" size={11} strokeWidth={3} color={colors.muted} />
          </Pressable>
        )}
      </View>
      <Animated.View
        style={{
          overflow: "hidden",
          width: progress.interpolate({ inputRange: [0, 1], outputRange: [0, cancelWidth + 12] }),
          opacity: progress,
        }}
      >
        <Pressable
          accessibilityRole="button"
          onLayout={(e) => setCancelWidth(e.nativeEvent.layout.width)}
          onPress={() => {
            change("");
            ref.current?.blur();
            onCancel?.();
          }}
          style={styles.cancel}
        >
          <Text numberOfLines={1} style={[styles.cancelText, { color: colors.brand }]}>
            {cancelLabel}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  field: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 42,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    height: "100%",
    outlineStyle: "none",
  } as never,
  clear: { width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  cancel: { position: "absolute", left: 12, paddingVertical: 8 },
  cancelText: { fontSize: 16, fontWeight: "500" },
});
