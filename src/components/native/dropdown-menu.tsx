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
import { Icon, type IconName } from "@/components/native/icon";
import { useBackHandler, useOverlayTransition } from "@/components/native/overlay";
import { Portal } from "@/components/native/portal";
import { useTheme } from "@/components/native/theme";

export type MenuItem =
  | {
      type?: "item";
      label: string;
      icon?: IconName;
      shortcut?: string;
      destructive?: boolean;
      disabled?: boolean;
      onPress: () => void;
    }
  | { type: "separator" }
  | { type: "label"; label: string };

export type DropdownMenuProps = {
  items: MenuItem[];
  /** The trigger; receives an `open` function. */
  children: (open: () => void) => React.ReactNode;
  /** Horizontal alignment relative to the trigger. */
  align?: "start" | "end";
  width?: number;
  style?: StyleProp<ViewStyle>;
};

type Rect = { x: number; y: number; width: number; height: number };

export function DropdownMenu({
  items,
  children,
  align = "end",
  width = 230,
  style,
}: DropdownMenuProps) {
  const { colors, shadow } = useTheme();
  const anchor = React.useRef<View>(null);
  const host = React.useRef<View>(null);
  const [open, setOpen] = React.useState(false);
  const [rect, setRect] = React.useState<Rect | null>(null);
  const [hostRect, setHostRect] = React.useState<Rect | null>(null);
  const { mounted, progress } = useOverlayTransition(open, { duration: 160 });
  const close = React.useCallback(() => setOpen(false), []);
  useBackHandler(open, close);

  const show = () => {
    anchor.current?.measureInWindow((x, y, w, h) => {
      setRect({ x, y, width: w, height: h });
      setOpen(true);
    });
  };

  // Position relative to the portal host so it works inside any container.
  const top = rect && hostRect ? rect.y - hostRect.y + rect.height + 8 : 0;
  const left =
    rect && hostRect
      ? Math.max(
          8,
          Math.min(
            align === "end" ? rect.x - hostRect.x + rect.width - width : rect.x - hostRect.x,
            hostRect.width - width - 8,
          ),
        )
      : 0;

  return (
    <>
      <View ref={anchor} collapsable={false} style={style}>
        {children(show)}
      </View>
      {mounted && rect && (
        <Portal>
          <View
            ref={host}
            style={StyleSheet.absoluteFill}
            onLayout={() =>
              host.current?.measureInWindow((x, y, w, h) =>
                setHostRect({ x, y, width: w, height: h }),
              )
            }
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={close}
              accessibilityLabel="Close menu"
            />
            {hostRect && (
              <Animated.View
                accessibilityRole="menu"
                style={[
                  styles.menu,
                  shadow(4),
                  {
                    top,
                    left,
                    width,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: progress,
                    transform: [
                      {
                        translateY: progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-6, 0],
                        }),
                      },
                      {
                        scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }),
                      },
                    ],
                    transformOrigin: align === "end" ? "top right" : "top left",
                  },
                ]}
              >
                {items.map((item, i) => {
                  if (item.type === "separator") {
                    return (
                      <View key={i} style={[styles.sep, { backgroundColor: colors.border }]} />
                    );
                  }
                  if (item.type === "label") {
                    return (
                      <Text key={i} style={[styles.label, { color: colors.mutedForeground }]}>
                        {item.label}
                      </Text>
                    );
                  }
                  const tint = item.destructive ? colors.destructive : colors.foreground;
                  return (
                    <Pressable
                      key={i}
                      accessibilityRole="menuitem"
                      disabled={item.disabled}
                      onPress={() => {
                        close();
                        item.onPress();
                      }}
                      style={({ pressed }) => [
                        styles.item,
                        pressed && {
                          backgroundColor: item.destructive
                            ? colors.destructiveSoft
                            : colors.accent,
                        },
                        item.disabled && { opacity: 0.4 },
                      ]}
                    >
                      {item.icon && <Icon name={item.icon} size={17} color={tint} />}
                      <Text style={[styles.itemText, { color: tint }]}>{item.label}</Text>
                      {item.shortcut && (
                        <Text style={[styles.shortcut, { color: colors.subtle }]}>
                          {item.shortcut}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </Animated.View>
            )}
          </View>
        </Portal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    borderRadius: 18,
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    height: 42,
    paddingHorizontal: 11,
    borderRadius: 12,
  },
  itemText: { flex: 1, fontSize: 15, fontWeight: "500" },
  shortcut: { fontSize: 13 },
  sep: { height: StyleSheet.hairlineWidth, marginVertical: 5, marginHorizontal: -5 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 11,
    paddingTop: 8,
    paddingBottom: 4,
  },
});
