import { View } from "react-native";
import { Icon } from "@/components/native/icon";
import { ProgressRing } from "@/components/native/progress-ring";
import { Text } from "@/components/native/text";

export default function NativeProgressRingDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 32, alignItems: "center", justifyContent: "center" }}>
      <ProgressRing
        value={72}
        size={190}
        strokeWidth={16}
        colors={["#22d3ee", "#6366f1"]}
        label="Daily goal"
      />
      <View style={{ flexDirection: "row", gap: 24 }}>
        <ProgressRing value={45} size={86} strokeWidth={9} colors={["#f97316", "#ef4444"]}>
          <Icon name="flame" size={24} color="#f97316" />
        </ProgressRing>
        <ProgressRing value={88} size={86} strokeWidth={9} colors={["#10b981", "#22c55e"]}>
          <Icon name="activity" size={24} color="#10b981" />
        </ProgressRing>
        <ProgressRing value={30} size={86} strokeWidth={9}>
          <Text variant="small">3/10</Text>
        </ProgressRing>
      </View>
    </View>
  );
}
