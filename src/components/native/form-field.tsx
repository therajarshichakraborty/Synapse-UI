import * as React from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Icon } from "@/components/native/icon";
import { useTheme } from "@/components/native/theme";

export type FormFieldProps = {
  label?: string;
  /** Helper text under the control. Hidden while `error` is set. */
  description?: string;
  error?: string;
  required?: boolean;
  /** Content to the right of the label, e.g. a "Forgot?" link. */
  labelRight?: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function FormField({
  label,
  description,
  error,
  required,
  labelRight,
  children,
  style,
}: FormFieldProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.field, style]}>
      {(label || labelRight) && (
        <View style={styles.labelRow}>
          {label && (
            <Text style={[styles.label, { color: colors.foreground }]}>
              {label}
              {required && <Text style={{ color: colors.destructive }}> *</Text>}
            </Text>
          )}
          {labelRight}
        </View>
      )}
      {children}
      {error ? (
        <View style={styles.message} accessibilityLiveRegion="polite">
          <Icon name="alert-circle" size={14} color={colors.destructive} />
          <Text style={[styles.messageText, { color: colors.destructive }]}>{error}</Text>
        </View>
      ) : description ? (
        <Text style={[styles.messageText, { color: colors.mutedForeground }]}>{description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  labelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontSize: 14, fontWeight: "600", letterSpacing: -0.1 },
  message: { flexDirection: "row", alignItems: "center", gap: 6 },
  messageText: { fontSize: 13, lineHeight: 18 },
});
