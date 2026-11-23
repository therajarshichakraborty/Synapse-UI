import { View } from "react-native";
import { Icon, type IconName } from "@/components/native/icon";
import { Text } from "@/components/native/text";
import { useTheme } from "@/components/native/theme";
import { Tooltip } from "@/components/native/tooltip";

function Tile({ icon }: { icon: IconName }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name={icon} size={22} />
    </View>
  );
}

export default function NativeTooltipDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 30, alignItems: "center", justifyContent: "center" }}>
      <Text variant="muted">Long-press an icon</Text>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Tooltip content="Add to favorites">
          <Tile icon="star" />
        </Tooltip>
        <Tooltip content="Share with your team">
          <Tile icon="share" />
        </Tooltip>
        <Tooltip content="Download a copy">
          <Tile icon="download" />
        </Tooltip>
      </View>
      <Tooltip content="Tooltips can open on tap too" trigger="press">
        <Text tone="brand" weight="600">
          Tap me
        </Text>
      </Tooltip>
    </View>
  );
}
