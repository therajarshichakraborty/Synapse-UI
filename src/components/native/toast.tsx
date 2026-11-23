/**
 * Toast: an imperative, sonner-style notification stack.
 *
 *   <Toaster />                  // once, near the root (inside <PortalHost> if you use one)
 *   toast.success("Saved")       // anywhere
 */
import * as React from "react";
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { nativeDriver, useTheme } from "@/components/native/theme";

type ToastType = "default" | "success" | "error" | "warning" | "info" | "loading";

export type ToastOptions = {
  description?: string;
  /** Milliseconds. `Infinity` keeps it until dismissed. */
  duration?: number;
  action?: { label: string; onPress: () => void };
  icon?: IconName;
};

type ToastItem = ToastOptions & { id: number; title: string; type: ToastType };

let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<(t: ToastItem[]) => void>();
const emit = () => listeners.forEach((l) => l(items));

function push(type: ToastType, title: string, options: ToastOptions = {}) {
  const id = nextId++;
  items = [{ id, title, type, ...options }, ...items].slice(0, 3);
  emit();
  return id;
}

export function dismiss(id?: number) {
  items = id == null ? [] : items.filter((t) => t.id !== id);
  emit();
}

function update(id: number, type: ToastType, title: string, options: ToastOptions = {}) {
  items = items.map((t) => (t.id === id ? { ...t, ...options, title, type } : t));
  emit();
}

export const toast = Object.assign((title: string, o?: ToastOptions) => push("default", title, o), {
  success: (title: string, o?: ToastOptions) => push("success", title, o),
  error: (title: string, o?: ToastOptions) => push("error", title, o),
  warning: (title: string, o?: ToastOptions) => push("warning", title, o),
  info: (title: string, o?: ToastOptions) => push("info", title, o),
  loading: (title: string, o?: ToastOptions) =>
    push("loading", title, { duration: Infinity, ...o }),
  /** Show a loading toast that resolves into success or error. */
  promise<T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string | ((v: T) => string); error: string },
  ) {
    const id = push("loading", msgs.loading, { duration: Infinity });
    promise
      .then((v) =>
        update(id, "success", typeof msgs.success === "function" ? msgs.success(v) : msgs.success, {
          duration: 3000,
        }),
      )
      .catch(() => update(id, "error", msgs.error, { duration: 4000 }));
    return promise;
  },
  dismiss,
});

function ToastCard({ item, index }: { item: ToastItem; index: number }) {
  const { colors, shadow } = useTheme();
  const enter = React.useRef(new Animated.Value(0)).current;
  const drag = React.useRef(new Animated.Value(0)).current;
  const depth = React.useRef(new Animated.Value(index)).current;

  const close = React.useCallback(() => {
    Animated.timing(enter, { toValue: 0, duration: 180, useNativeDriver: nativeDriver }).start(() =>
      dismiss(item.id),
    );
  }, [enter, item.id]);

  React.useEffect(() => {
    Animated.spring(enter, {
      toValue: 1,
      useNativeDriver: nativeDriver,
      damping: 18,
      stiffness: 220,
      mass: 0.9,
    }).start();
  }, [enter]);

  React.useEffect(() => {
    Animated.spring(depth, {
      toValue: index,
      useNativeDriver: nativeDriver,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [depth, index]);

  React.useEffect(() => {
    if (item.type === "loading") return;
    const ms = item.duration ?? 3500;
    if (!Number.isFinite(ms)) return;
    const t = setTimeout(close, ms);
    return () => clearTimeout(t);
  }, [item.type, item.duration, item.title, close]);

  const pan = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6,
        onPanResponderMove: (_, g) => drag.setValue(Math.min(g.dy, 24)),
        onPanResponderRelease: (_, g) => {
          if (g.dy < -30 || g.vy < -0.6) close();
          else Animated.spring(drag, { toValue: 0, useNativeDriver: nativeDriver }).start();
        },
      }),
    [close, drag],
  );

  const tone = {
    default: { icon: item.icon, color: colors.foreground },
    success: { icon: "check-circle" as IconName, color: colors.success },
    error: { icon: "x-circle" as IconName, color: colors.destructive },
    warning: { icon: "alert-triangle" as IconName, color: colors.warning },
    info: { icon: "info" as IconName, color: colors.brand },
    loading: { icon: "loader" as IconName, color: colors.mutedForeground },
  }[item.type];

  return (
    <Animated.View
      {...pan.panHandlers}
      style={[
        styles.card,
        shadow(3),
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          zIndex: 10 - index,
          opacity: Animated.multiply(
            enter,
            depth.interpolate({ inputRange: [0, 1, 2, 3], outputRange: [1, 0.9, 0.7, 0] }),
          ),
          transform: [
            {
              translateY: Animated.add(
                Animated.add(
                  enter.interpolate({ inputRange: [0, 1], outputRange: [-80, 0] }),
                  depth.interpolate({ inputRange: [0, 3], outputRange: [0, 30] }),
                ),
                drag,
              ),
            },
            { scale: depth.interpolate({ inputRange: [0, 3], outputRange: [1, 0.88] }) },
          ],
        },
        index > 0 && styles.stacked,
      ]}
    >
      {/* Cards behind the front one only peek as edges; their content fades out. */}
      <Animated.View
        style={[
          styles.content,
          { opacity: depth.interpolate({ inputRange: [0, 0.6, 1], outputRange: [1, 0, 0] }) },
        ]}
      >
        {tone.icon && (
          <View style={styles.icon}>
            <Icon name={tone.icon} size={18} color={tone.color} />
          </View>
        )}
        <View style={styles.body}>
          <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>
            {item.title}
          </Text>
          {item.description && (
            <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
        {item.action && (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              item.action?.onPress();
              close();
            }}
            style={({ pressed }) => [
              styles.action,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styles.actionText, { color: colors.primaryForeground }]}>
              {item.action.label}
            </Text>
          </Pressable>
        )}
      </Animated.View>
    </Animated.View>
  );
}

export function Toaster({ offset = 56 }: { /** Distance from the top edge. */ offset?: number }) {
  const [list, setList] = React.useState<ToastItem[]>(items);
  React.useEffect(() => {
    listeners.add(setList);
    return () => {
      listeners.delete(setList);
    };
  }, []);

  if (!list.length) return null;
  return (
    <View pointerEvents="box-none" style={[styles.viewport, { top: offset }]}>
      {list.map((item, i) => (
        <ToastCard key={item.id} item={item} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: { position: "absolute", left: 12, right: 12, alignItems: "stretch" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 56,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
  content: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  stacked: { position: "absolute", left: 0, right: 0, top: 0 },
  icon: { width: 22, alignItems: "center" },
  body: { flex: 1, gap: 2 },
  title: { fontSize: 15, fontWeight: "600", letterSpacing: -0.1 },
  description: { fontSize: 13, lineHeight: 18 },
  action: { paddingHorizontal: 12, height: 30, borderRadius: 9, justifyContent: "center" },
  actionText: { fontSize: 13, fontWeight: "600" },
});
