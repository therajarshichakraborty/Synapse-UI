import * as React from "react";
import { View } from "react-native";
import { Icon } from "@/components/native/icon";
import { Slider } from "@/components/native/slider";
import { Text } from "@/components/native/text";
import { useTheme } from "@/components/native/theme";

export default function NativeSliderDemo() {
  const { colors } = useTheme();
  const [volume, setVolume] = React.useState(64);
  const [price, setPrice] = React.useState(250);
  return (
    <View style={{ flex: 1, padding: 24, gap: 40, justifyContent: "center" }}>
      <View style={{ gap: 14 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant="small">Volume</Text>
          <Text variant="muted">{volume}%</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Icon name="minus" size={16} color={colors.mutedForeground} />
          <Slider
            style={{ flex: 1 }}
            value={volume}
            onValueChange={setVolume}
            formatValue={(v) => `${v}%`}
          />
          <Icon name="plus" size={16} color={colors.mutedForeground} />
        </View>
      </View>
      <View style={{ gap: 14 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant="small">Max price</Text>
          <Text variant="muted">${price}</Text>
        </View>
        <Slider
          min={0}
          max={1000}
          step={50}
          value={price}
          onValueChange={setPrice}
          formatValue={(v) => `$${v}`}
        />
      </View>
    </View>
  );
}
