import * as React from "react";
import { Image, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "@/components/native/theme";

export type AvatarProps = {
  src?: string;
  /** Used for initials and the accessibility label. */
  name?: string;
  size?: number;
  status?: "online" | "away" | "busy" | "offline";
  /** Gradient-free colored ring, like a story indicator. */
  ring?: boolean;
  shape?: "circle" | "rounded";
  style?: StyleProp<ViewStyle>;
};

const tints = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function Avatar({
  src,
  name,
  size = 44,
  status,
  ring,
  shape = "circle",
  style,
}: AvatarProps) {
  const { colors } = useTheme();
  const [failed, setFailed] = React.useState(false);
  const r = shape === "circle" ? size / 2 : size * 0.3;
  const tint = tints[hash(name ?? "") % tints.length];
  const statusColor = {
    online: colors.success,
    away: colors.warning,
    busy: colors.destructive,
    offline: colors.subtle,
  };
  const dot = Math.max(10, size * 0.26);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={name}
      style={[
        { width: size, height: size },
        ring && {
          padding: 2.5,
          borderRadius: r + 4,
          borderWidth: 2,
          borderColor: colors.brand,
          width: size + 9,
          height: size + 9,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            width: size,
            height: size,
            borderRadius: r,
            backgroundColor: src && !failed ? colors.muted : tint,
          },
        ]}
      >
        {src && !failed ? (
          <Image
            source={{ uri: src }}
            alt={name ?? ""}
            onError={() => setFailed(true)}
            style={{ width: size, height: size }}
            resizeMode="cover"
          />
        ) : (
          <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials(name)}</Text>
        )}
      </View>
      {status && (
        <View
          style={[
            styles.dot,
            {
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              backgroundColor: statusColor[status],
              borderColor: colors.background,
              right: ring ? 3 : -1,
              bottom: ring ? 3 : -1,
            },
          ]}
        />
      )}
    </View>
  );
}

export type AvatarGroupProps = {
  people: { src?: string; name: string }[];
  size?: number;
  /** Max avatars before collapsing into a "+N" bubble. */
  max?: number;
  style?: StyleProp<ViewStyle>;
};

export function AvatarGroup({ people, size = 36, max = 4, style }: AvatarGroupProps) {
  const { colors } = useTheme();
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  const overlap = size * 0.32;
  const bordered = { borderWidth: 2, borderColor: colors.background, borderRadius: size / 2 + 2 };

  return (
    <View style={[styles.group, style]} accessibilityLabel={`${people.length} people`}>
      {shown.map((p, i) => (
        <View
          key={p.name + i}
          style={[bordered, { marginLeft: i ? -overlap : 0, zIndex: max - i }]}
        >
          <Avatar src={p.src} name={p.name} size={size} />
        </View>
      ))}
      {rest > 0 && (
        <View
          style={[
            bordered,
            styles.more,
            {
              marginLeft: -overlap,
              width: size + 4,
              height: size + 4,
              backgroundColor: colors.muted,
            },
          ]}
        >
          <Text style={[styles.moreText, { color: colors.foreground, fontSize: size * 0.34 }]}>
            +{rest}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inner: { overflow: "hidden", alignItems: "center", justifyContent: "center" },
  initials: { color: "#ffffff", fontWeight: "600", letterSpacing: 0.3 },
  dot: { position: "absolute", borderWidth: 2 },
  group: { flexDirection: "row", alignItems: "center" },
  more: { alignItems: "center", justifyContent: "center" },
  moreText: { fontWeight: "600" },
});
