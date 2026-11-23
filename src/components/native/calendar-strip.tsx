import * as React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@/components/native/theme";

export type CalendarStripProps = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  /** First date in the strip. Defaults to the start of the selected week. */
  start?: Date;
  /** Number of days to show. */
  days?: number;
  /** Dates (YYYY-MM-DD) that get an event dot. */
  marked?: string[];
  locale?: string;
  style?: StyleProp<ViewStyle>;
};

const key = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const same = (a: Date, b: Date) => key(a) === key(b);

function startOfWeek(d: Date) {
  const s = new Date(d);
  s.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // Monday
  s.setHours(0, 0, 0, 0);
  return s;
}

export function CalendarStrip({
  value,
  defaultValue,
  onValueChange,
  start,
  days = 14,
  marked = [],
  locale = "en-US",
  style,
}: CalendarStripProps) {
  const { colors } = useTheme();
  const [today] = React.useState(() => new Date());
  const [inner, setInner] = React.useState(defaultValue ?? today);
  const selected = value ?? inner;
  const first = start ?? startOfWeek(selected);
  const list = Array.from({ length: days }, (_, i) => {
    const d = new Date(first);
    d.setDate(first.getDate() + i);
    return d;
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={style}
    >
      {list.map((d) => {
        const active = same(d, selected);
        const isToday = same(d, today);
        const dot = marked.includes(key(d));
        return (
          <Pressable
            key={key(d)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={d.toLocaleDateString(locale, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
            onPress={() => {
              if (value === undefined) setInner(d);
              onValueChange?.(d);
            }}
            style={({ pressed }) => [
              styles.day,
              {
                backgroundColor: active ? colors.primary : pressed ? colors.accent : colors.card,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.weekday,
                { color: active ? colors.primaryForeground : colors.mutedForeground },
              ]}
            >
              {d.toLocaleDateString(locale, { weekday: "short" }).slice(0, 3)}
            </Text>
            <Text
              style={[
                styles.date,
                { color: active ? colors.primaryForeground : colors.foreground },
              ]}
            >
              {d.getDate()}
            </Text>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: dot
                    ? active
                      ? colors.primaryForeground
                      : colors.brand
                    : isToday && !active
                      ? colors.borderStrong
                      : "transparent",
                },
              ]}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingHorizontal: 2 },
  day: {
    width: 52,
    height: 76,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  weekday: { fontSize: 12, fontWeight: "500" },
  date: { fontSize: 19, fontWeight: "700", fontVariant: ["tabular-nums"] },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
});
