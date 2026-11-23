import * as React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useOverlayTransition } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { useTheme } from "@/components/native/theme";

export type TooltipProps = {
  content: string;
  children: React.ReactNode;
  /** Open on long press (default) or tap. */
  trigger?: "longPress" | "press";
  /** Auto-hide after this many ms. */
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

type Rect = { x: number; y: number; width: number; height: number };

export function Tooltip({
  content,
  children,
  trigger = "longPress",
  duration = 1800,
  style,
}: TooltipProps) {
  const { colors } = useTheme();
  const anchor = React.useRef<View>(null);
  const host = React.useRef<View>(null);
  const [open, setOpen] = React.useState(false);
  const [rect, setRect] = React.useState<Rect | null>(null);
  const [hostRect, setHostRect] = React.useState<Rect | null>(null);
  const [tipWidth, setTipWidth] = React.useState(0);
  const { mounted, progress } = useOverlayTransition(open, { duration: 150 });

  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(t);
  }, [open, duration]);

  const show = () =>
    anchor.current?.measureInWindow((x, y, width, height) => {
      setRect({ x, y, width, height });
      setOpen(true);
    });

  const cx = rect && hostRect ? rect.x - hostRect.x + rect.width / 2 : 0;
  const top = rect && hostRect ? rect.y - hostRect.y - 44 : 0;
  const left = hostRect
    ? Math.max(8, Math.min(cx - tipWidth / 2, hostRect.width - tipWidth - 8))
    : 0;

  return (
    <>
      <Pressable
        ref={anchor}
        accessibilityHint={content}
        onLongPress={trigger === "longPress" ? show : undefined}
        onPress={trigger === "press" ? show : undefined}
        delayLongPress={350}
        style={style}
      >
        {children}
      </Pressable>
      {mounted && rect && (
        <Portal>
          <View
            ref={host}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
            onLayout={() =>
              host.current?.measureInWindow((x, y, w, h) =>
                setHostRect({ x, y, width: w, height: h }),
              )
            }
          >
            {hostRect && (
              <Animated.View
                onLayout={(e) => setTipWidth(e.nativeEvent.layout.width)}
                style={[
                  styles.tip,
                  {
                    top,
                    left,
                    backgroundColor: colors.primary,
                    opacity: progress,
                    transform: [
                      {
                        translateY: progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [4, 0],
                        }),
                      },
                      {
                        scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={[styles.text, { color: colors.primaryForeground }]}>{content}</Text>
                <View
                  style={[
                    styles.arrow,
                    {
                      left: Math.max(10, Math.min(cx - left - 5, tipWidth - 20)),
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </Animated.View>
            )}
          </View>
        </Portal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tip: {
    position: "absolute",
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    maxWidth: 260,
  },
  text: { fontSize: 13, fontWeight: "500" },
  arrow: {
    position: "absolute",
    bottom: -4,
    width: 10,
    height: 10,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
  },
});
