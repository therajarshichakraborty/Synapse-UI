import * as React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { alpha, useTheme } from "@/components/native/theme";

export type InputProps = Omit<TextInputProps, "style"> & {
  leftIcon?: IconName;
  rightIcon?: IconName;
  /** Show a clear button while there is text. */
  clearable?: boolean;
  /** Show an eye toggle for `secureTextEntry` fields. */
  revealable?: boolean;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const heights = { sm: 40, md: 48, lg: 56 };

/** A soft 3pt halo around a focused field. */
export function focusRing(color: string): ViewStyle {
  return Platform.OS === "web"
    ? ({ boxShadow: `0 0 0 3px ${alpha(color, 0.18)}` } as ViewStyle)
    : { outlineColor: alpha(color, 0.22), outlineWidth: 3, outlineStyle: "solid" };
}

export const Input = React.forwardRef<TextInput, InputProps>(function Input(
  {
    leftIcon,
    rightIcon,
    clearable,
    revealable,
    invalid,
    size = "md",
    disabled,
    secureTextEntry,
    value,
    defaultValue,
    onChangeText,
    onFocus,
    onBlur,
    style,
    ...props
  },
  ref,
) {
  const { colors } = useTheme();
  const [focused, setFocused] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const text = value ?? inner;
  const inputRef = React.useRef<TextInput>(null);
  React.useImperativeHandle(ref, () => inputRef.current as TextInput);

  const change = (t: string) => {
    if (value === undefined) setInner(t);
    onChangeText?.(t);
  };

  const ring = invalid ? colors.destructive : colors.brand;

  return (
    <View
      style={[
        styles.wrap,
        {
          height: heights[size],
          borderRadius: size === "lg" ? 16 : 13,
          backgroundColor: disabled ? colors.muted : colors.background,
          borderColor: invalid ? colors.destructive : focused ? ring : colors.input,
          opacity: disabled ? 0.6 : 1,
        },
        focused && focusRing(ring),
        style,
      ]}
    >
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={18}
          color={focused ? colors.foreground : colors.mutedForeground}
        />
      )}
      <TextInput
        ref={inputRef}
        editable={!disabled}
        value={text}
        onChangeText={change}
        secureTextEntry={secureTextEntry && hidden}
        placeholderTextColor={colors.subtle}
        selectionColor={colors.brand}
        cursorColor={colors.brand}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        aria-invalid={invalid}
        style={[styles.input, { color: colors.foreground, fontSize: size === "sm" ? 14 : 16 }]}
        {...props}
      />
      {clearable && text.length > 0 && !disabled && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear text"
          hitSlop={10}
          onPress={() => {
            change("");
            inputRef.current?.focus();
          }}
          style={[styles.clear, { backgroundColor: colors.subtle }]}
        >
          <Icon name="x" size={11} strokeWidth={3} color={colors.background} />
        </Pressable>
      )}
      {secureTextEntry && revealable && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? "Show password" : "Hide password"}
          hitSlop={10}
          onPress={() => setHidden((h) => !h)}
        >
          <Icon name={hidden ? "eye" : "eye-off"} size={18} color={colors.mutedForeground} />
        </Pressable>
      )}
      {rightIcon && <Icon name={rightIcon} size={18} color={colors.mutedForeground} />}
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  input: { flex: 1, height: "100%", paddingVertical: 0, outlineStyle: "none" } as never,
  clear: { width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" },
});
