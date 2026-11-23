import * as React from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { focusRing } from "@/components/native/input";
import { Backdrop, useBackHandler, useOverlayTransition } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { useTheme } from "@/components/native/theme";

export type SelectOption = { value: string; label: string; description?: string; icon?: IconName };

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Title of the picker sheet. */
  title?: string;
  /** Adds a filter field to the sheet. Defaults to true with 8+ options. */
  searchable?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  title,
  searchable,
  invalid,
  disabled,
  style,
}: SelectProps) {
  const { colors, shadow } = useTheme();
  const [inner, setInner] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const current = value ?? inner;
  const selected = options.find((o) => o.value === current);
  const { mounted, progress } = useOverlayTransition(open);
  const close = React.useCallback(() => setOpen(false), []);
  useBackHandler(open, close);

  const canSearch = searchable ?? options.length >= 8;
  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const choose = (v: string) => {
    if (value === undefined) setInner(v);
    onValueChange?.(v);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <Pressable
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[
          styles.trigger,
          {
            backgroundColor: disabled ? colors.muted : colors.background,
            borderColor: invalid ? colors.destructive : open ? colors.brand : colors.input,
            opacity: disabled ? 0.6 : 1,
          },
          open && focusRing(colors.brand),
          style,
        ]}
      >
        {selected?.icon && <Icon name={selected.icon} size={18} />}
        <Text
          numberOfLines={1}
          style={[styles.triggerText, { color: selected ? colors.foreground : colors.subtle }]}
        >
          {selected?.label ?? placeholder}
        </Text>
        <Icon name="chevrons-up-down" size={16} color={colors.mutedForeground} />
      </Pressable>

      {mounted && (
        <Portal>
          <View style={[StyleSheet.absoluteFill, styles.end]}>
            <Backdrop progress={progress} onPress={close} />
            <Animated.View
              accessibilityViewIsModal
              style={[
                styles.sheet,
                shadow(4),
                {
                  backgroundColor: colors.card,
                  transform: [
                    {
                      translateY: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [420, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={[styles.handle, { backgroundColor: colors.borderStrong }]} />
              {title && <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>}
              {canSearch && (
                <View style={[styles.search, { backgroundColor: colors.muted }]}>
                  <Icon name="search" size={16} color={colors.mutedForeground} />
                  <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search"
                    placeholderTextColor={colors.mutedForeground}
                    style={[styles.searchInput, { color: colors.foreground }]}
                  />
                </View>
              )}
              <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
                {filtered.map((o) => {
                  const active = o.value === current;
                  return (
                    <Pressable
                      key={o.value}
                      accessibilityRole="menuitem"
                      accessibilityState={{ selected: active }}
                      onPress={() => choose(o.value)}
                      style={({ pressed }) => [
                        styles.option,
                        { backgroundColor: pressed || active ? colors.accent : "transparent" },
                      ]}
                    >
                      {o.icon && <Icon name={o.icon} size={18} />}
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.optionText, { color: colors.foreground }]}>
                          {o.label}
                        </Text>
                        {o.description && (
                          <Text style={[styles.optionDesc, { color: colors.mutedForeground }]}>
                            {o.description}
                          </Text>
                        )}
                      </View>
                      {active && (
                        <Icon name="check" size={18} strokeWidth={2.5} color={colors.brand} />
                      )}
                    </Pressable>
                  );
                })}
                {filtered.length === 0 && (
                  <Text style={[styles.empty, { color: colors.mutedForeground }]}>No results</Text>
                )}
              </ScrollView>
            </Animated.View>
          </View>
        </Portal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 48,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  triggerText: { flex: 1, fontSize: 16 },
  end: { justifyContent: "flex-end" },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 28,
    maxHeight: "75%",
  },
  handle: { alignSelf: "center", width: 36, height: 5, borderRadius: 3, marginBottom: 10 },
  title: { fontSize: 17, fontWeight: "600", textAlign: "center", marginBottom: 12 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  searchInput: { flex: 1, fontSize: 15, height: "100%", outlineStyle: "none" } as never,
  list: { flexGrow: 0 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    minHeight: 50,
    paddingVertical: 10,
    borderRadius: 14,
  },
  optionText: { fontSize: 16 },
  optionDesc: { fontSize: 13, marginTop: 1 },
  empty: { textAlign: "center", paddingVertical: 24, fontSize: 14 },
});
