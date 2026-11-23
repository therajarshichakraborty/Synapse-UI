import { View } from "react-native";
import { Badge } from "@/components/native/badge";
import { Text } from "@/components/native/text";

const tones = ["neutral", "brand", "success", "warning", "destructive"] as const;

export default function NativeBadgeDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 22, justifyContent: "center" }}>
      {(["solid", "soft", "outline"] as const).map((variant) => (
        <View key={variant} style={{ gap: 10 }}>
          <Text variant="overline">{variant}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {tones.map((tone) => (
              <Badge key={tone} tone={tone} variant={variant}>
                {tone[0].toUpperCase() + tone.slice(1)}
              </Badge>
            ))}
          </View>
        </View>
      ))}
      <View style={{ gap: 10 }}>
        <Text variant="overline">With icon & dot</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <Badge tone="success" dot>
            Online
          </Badge>
          <Badge tone="brand" icon="sparkles">
            New
          </Badge>
          <Badge tone="warning" icon="clock">
            Pending
          </Badge>
          <Badge size="sm" variant="solid">
            v2.4
          </Badge>
        </View>
      </View>
    </View>
  );
}
