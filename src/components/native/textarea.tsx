import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { focusRing } from "@/components/native/input";
import { useTheme } from "@/components/native/theme";

export type TextareaProps = Omit<TextInputProps, "style" | "multiline"> & {
  /** Visible lines before the field scrolls. */
  rows?: number;
  invalid?: boolean;
  disabled?: boolean;
  /** Show `count / maxLength` in the corner. */
  showCount?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Textarea({
  rows = 4,
  invalid,
  disabled,
  showCount,
  maxLength,
  value,
  defaultValue,
  onChangeText,
  style,
  ...props
}: TextareaProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = React.useState(false);
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const text = value ?? inner;
  const ring = invalid ? colors.destructive : colors.brand;
  const near = maxLength != null && text.length >= maxLength * 0.9;

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: disabled ? colors.muted : colors.background,
          borderColor: invalid ? colors.destructive : focused ? ring : colors.input,
          opacity: disabled ? 0.6 : 1,
        },
        focused && focusRing(ring),
        style,
      ]}
    >
      <TextInput
        multiline
        editable={!disabled}
        value={text}
        maxLength={maxLength}
        onChangeText={(t) => {
          if (value === undefined) setInner(t);
          onChangeText?.(t);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={colors.subtle}
        selectionColor={colors.brand}
        textAlignVertical="top"
        style={[
          styles.input,
          { color: colors.foreground, minHeight: rows * 22 + 4, maxHeight: rows * 22 * 2 },
        ]}
        {...props}
      />
      {showCount && (
        <Text
          style={[styles.count, { color: near ? colors.warning : colors.subtle }]}
          accessibilityLiveRegion="polite"
        >
          {text.length}
          {maxLength != null ? ` / ${maxLength}` : ""}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
  input: { fontSize: 16, lineHeight: 22, padding: 0, outlineStyle: "none" } as never,
  count: { alignSelf: "flex-end", fontSize: 12, marginTop: 6, fontVariant: ["tabular-nums"] },
});
