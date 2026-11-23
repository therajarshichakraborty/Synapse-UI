import { View } from "react-native";
import { Spinner } from "@/components/native/spinner";
import { Text } from "@/components/native/text";

export default function NativeSpinnerDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 36, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", gap: 28, alignItems: "center" }}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="lg" color="#2563eb" />
      </View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Spinner size="sm" />
        <Text variant="muted">Syncing your library…</Text>
      </View>
    </View>
  );
}
