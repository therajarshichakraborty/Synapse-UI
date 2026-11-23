/**
 * Shared overlay plumbing for Dialog, Sheet, Select, Drawer…
 * - useOverlayTransition: keeps the tree mounted while the exit animation runs.
 * - useBackHandler: Android back button (Escape key on web).
 * - Backdrop: an animated, pressable scrim.
 */
import * as React from "react";
import { Animated, BackHandler, Easing, Platform, Pressable, StyleSheet } from "react-native";
import { nativeDriver, useTheme } from "@/components/native/theme";

export function useOverlayTransition(
  open: boolean,
  { enter = "spring", duration = 220 }: { enter?: "spring" | "timing"; duration?: number } = {},
) {
  const progress = React.useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = React.useState(open);
  const target = React.useRef(open ? 1 : 0);
  const alive = React.useRef(true);

  React.useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const run = React.useCallback(
    (to: 0 | 1) => {
      target.current = to;
      const anim =
        to === 1
          ? enter === "spring"
            ? Animated.spring(progress, {
                toValue: 1,
                useNativeDriver: nativeDriver,
                damping: 22,
                stiffness: 260,
                mass: 0.9,
              })
            : Animated.timing(progress, {
                toValue: 1,
                duration,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: nativeDriver,
              })
          : Animated.timing(progress, {
              toValue: 0,
              duration: Math.round(duration * 0.8),
              easing: Easing.in(Easing.cubic),
              useNativeDriver: nativeDriver,
            });

      anim.start(({ finished }) => {
        if (!alive.current || target.current !== to) return; // superseded or unmounted
        if (!finished) {
          // Interrupted, e.g. the animated views re-attached (StrictMode, portal
          // remount). Resume from the current value on the next frame.
          requestAnimationFrame(() => alive.current && target.current === to && run(to));
          return;
        }
        if (to === 0) setMounted(false);
      });
    },
    [enter, duration, progress],
  );

  React.useEffect(() => {
    if (open) {
      setMounted(true);
      run(1);
    } else if (target.current === 1) {
      run(0);
    }
  }, [open, run]);

  return { mounted, progress };
}

/** Closes on the Android hardware back button, or Escape on the web, while `active`. */
export function useBackHandler(active: boolean, onBack: () => void) {
  React.useEffect(() => {
    if (!active) return;
    if (Platform.OS === "web") {
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onBack();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onBack();
      return true;
    });
    return () => sub.remove();
  }, [active, onBack]);
}

export function Backdrop({
  progress,
  onPress,
  dismissible = true,
}: {
  progress: Animated.Value;
  onPress?: () => void;
  dismissible?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay, opacity: progress }]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        style={StyleSheet.absoluteFill}
        onPress={dismissible ? onPress : undefined}
      />
    </Animated.View>
  );
}
