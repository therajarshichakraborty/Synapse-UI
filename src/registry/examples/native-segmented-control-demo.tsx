import * as React from "react";
import { View } from "react-native";
import { SegmentedControl } from "@/components/native/segmented-control";
import { Text } from "@/components/native/text";

export default function NativeSegmentedControlDemo() {
  const [range, setRange] = React.useState("Week");
  return (
    <View style={{ flex: 1, padding: 24, gap: 24, justifyContent: "center" }}>
      <View style={{ gap: 10 }}>
        <Text variant="overline">Range</Text>
        <SegmentedControl
          options={["Day", "Week", "Month", "Year"]}
          value={range}
          onValueChange={setRange}
        />
        <Text variant="muted">Showing {range.toLowerCase()} view</Text>
      </View>
      <View style={{ gap: 10 }}>
        <Text variant="overline">With icons</Text>
        <SegmentedControl
          options={[
            { value: "list", label: "List", icon: "list" },
            { value: "grid", label: "Grid", icon: "grid" },
            { value: "map", label: "Map", icon: "map-pin" },
          ]}
        />
      </View>
      <View style={{ gap: 10 }}>
        <Text variant="overline">Small</Text>
        <SegmentedControl size="sm" options={["Light", "Dark", "Auto"]} defaultValue="Auto" />
      </View>
    </View>
  );
}
