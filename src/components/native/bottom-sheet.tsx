import * as React from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Backdrop, useBackHandler } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { nativeDriver, useTheme } from "@/components/native/theme";

export type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  /**
   * Heights as fractions of the screen (0–1), smallest first.
   * Omit to size the sheet to its content.
   */
  snapPoints?: number[];
  /** Extra bottom padding for the home indicator. */
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
};

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  snapPoints,
  bottomInset = 28,
  style,
}: BottomSheetProps) {
  const { colors, shadow } = useTheme();
  const [mounted, setMounted] = React.useState(open);
  const [screen, setScreen] = React.useState(0);
  const [content, setContent] = React.useState(0);
  const translate = React.useRef(new Animated.Value(2000)).current;
  const backdrop = React.useRef(new Animated.Value(0)).current;
  const snapIndex = React.useRef(0);
  const offset = React.useRef(0);
  const dragging = React.useRef(false);

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
  useBackHandler(open, close);

  // Sheet height and the translateY for each snap point (0 = fully open at the largest).
  const sheetHeight = snapPoints ? screen * snapPoints[snapPoints.length - 1] : content;
  const stops = React.useMemo(
    () => (snapPoints ? snapPoints.map((p) => sheetHeight - screen * p) : [0]),
    [snapPoints, sheetHeight, screen],
  );

  const animateTo = React.useCallback(
    (y: number, cb?: () => void) => {
      offset.current = y;
      Animated.parallel([
        Animated.spring(translate, {
          toValue: y,
          useNativeDriver: nativeDriver,
          damping: 26,
          stiffness: 260,
          mass: 0.9,
        }),
        Animated.timing(backdrop, {
          toValue: y >= sheetHeight ? 0 : 1,
          duration: 220,
          useNativeDriver: nativeDriver,
        }),
      ]).start(({ finished }) => {
        if (finished) return cb?.();
        // Interrupted by a re-attach (StrictMode, portal remount), not by the user: resume.
        if (!dragging.current && offset.current === y) {
          requestAnimationFrame(
            () => !dragging.current && offset.current === y && animateTo(y, cb),
          );
        }
      });
    },
    [translate, backdrop, sheetHeight],
  );

  React.useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  React.useEffect(() => {
    if (!mounted || !sheetHeight) return;
    if (open) {
      translate.setValue(sheetHeight);
      snapIndex.current = 0;
      animateTo(stops[0]);
    } else {
      animateTo(sheetHeight + 40, () => setMounted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mounted, sheetHeight]);

  const pan = React.useMemo(
    () =>
      PanResponder.create({
        // The grab area is a dedicated handle, so it claims the gesture on touch.
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dy) > 4 && Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderTerminationRequest: () => false,
        onPanResponderTerminate: () => {
          dragging.current = false;
          animateTo(stops[snapIndex.current] ?? 0);
        },
        onPanResponderGrant: () => {
          dragging.current = true;
          translate.stopAnimation();
        },
        onPanResponderMove: (_, g) => {
          const y = offset.current + g.dy;
          // Rubber-band above the top stop.
          translate.setValue(y < 0 ? y / 4 : y);
        },
        onPanResponderRelease: (_, g) => {
          dragging.current = false;
          const y = offset.current + g.dy + g.vy * 120;
          if (g.vy > 1.2 || y > sheetHeight * 0.85) {
            close();
            return;
          }
          let best = 0;
          stops.forEach((s, i) => {
            if (Math.abs(s - y) < Math.abs(stops[best] - y)) best = i;
          });
          snapIndex.current = best;
          animateTo(stops[best]);
        },
      }),
    [translate, stops, sheetHeight, close, animateTo],
  );

  if (!mounted) return null;

  return (
    <Portal>
      <View
        style={StyleSheet.absoluteFill}
        onLayout={(e: LayoutChangeEvent) => setScreen(e.nativeEvent.layout.height)}
      >
        <Backdrop progress={backdrop} onPress={close} />
        <Animated.View
          accessibilityViewIsModal
          style={[
            styles.sheet,
            shadow(4),
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              height: snapPoints ? sheetHeight : undefined,
              paddingBottom: bottomInset,
              transform: [{ translateY: translate }],
              opacity: sheetHeight ? 1 : 0,
            },
            style,
          ]}
          onLayout={(e) => !snapPoints && setContent(e.nativeEvent.layout.height)}
        >
          <View {...pan.panHandlers} style={styles.grabber}>
            <View style={[styles.handle, { backgroundColor: colors.borderStrong }]} />
            {(title || description) && (
              <View style={styles.header}>
                {title && <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>}
                {description && (
                  <Text style={[styles.description, { color: colors.mutedForeground }]}>
                    {description}
                  </Text>
                )}
              </View>
            )}
          </View>
          <View style={styles.body}>{children}</View>
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
  },
  grabber: {
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 20,
    userSelect: "none",
    cursor: "grab",
  } as never,
  handle: { alignSelf: "center", width: 38, height: 5, borderRadius: 3 },
  header: { marginTop: 14, gap: 4 },
  title: { fontSize: 19, fontWeight: "700", letterSpacing: -0.4 },
  description: { fontSize: 14, lineHeight: 20 },
  body: { paddingHorizontal: 20, paddingTop: 10, flexShrink: 1 },
});
