import { ScrollView, View } from "react-native";
import { StatCard } from "@/components/native/stat-card";
import { Text } from "@/components/native/text";

export default function NativeStatCardDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text variant="h2" style={{ marginBottom: 4 }}>
        Overview
      </Text>
      <StatCard
        label="Revenue"
        value="$48,290"
        delta={12.4}
        caption="vs last month"
        icon="wallet"
        trend={[12, 18, 15, 22, 19, 28, 26, 34, 31, 40]}
      />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatCard style={{ flex: 1 }} label="Users" value="2,814" delta={4.2} icon="users" />
        <StatCard style={{ flex: 1 }} label="Churn" value="1.8%" delta={-0.6} icon="activity" />
      </View>
      <StatCard
        label="Refunds"
        value="$1,204"
        delta={-3.1}
        caption="this week"
        trend={[30, 26, 28, 22, 24, 18, 20, 15]}
      />
    </ScrollView>
  );
}
