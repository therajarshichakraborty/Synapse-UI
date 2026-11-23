import { View } from "react-native";
import { Separator } from "@/components/native/separator";
import { Text } from "@/components/native/text";

export default function NativeSeparatorDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 20, justifyContent: "center" }}>
      <View style={{ gap: 4 }}>
        <Text variant="large">Synapse UI Native</Text>
        <Text variant="muted">Beautiful components for Expo.</Text>
      </View>
      <Separator />
      <View style={{ flexDirection: "row", gap: 14, height: 20, alignItems: "center" }}>
        <Text variant="small">Docs</Text>
        <Separator orientation="vertical" />
        <Text variant="small">Components</Text>
        <Separator orientation="vertical" />
        <Text variant="small">GitHub</Text>
      </View>
      <Separator label="or continue with" />
    </View>
  );
}
