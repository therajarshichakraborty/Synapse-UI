import { ScrollView, View } from "react-native";
import { Text } from "@/components/native/text";

export default function NativeTextDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 18 }}>
      <Text variant="overline">Typography</Text>
      <Text variant="display">Ship faster.</Text>
      <Text variant="h1">Heading One</Text>
      <Text variant="h2">Heading Two</Text>
      <Text variant="h3">Heading Three</Text>
      <Text variant="lead">
        A lead paragraph introduces a screen with a slightly larger, softer voice.
      </Text>
      <Text>
        Body text is set at 16 points with a 24 point line height, comfortable for long reads on any
        device.
      </Text>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Text variant="small">Run</Text>
        <Text variant="code">npx expo start</Text>
      </View>
      <Text variant="muted">Muted text for secondary information.</Text>
      <View style={{ flexDirection: "row", gap: 14 }}>
        <Text tone="brand" weight="600">
          Brand
        </Text>
        <Text tone="success" weight="600">
          Success
        </Text>
        <Text tone="warning" weight="600">
          Warning
        </Text>
        <Text tone="destructive" weight="600">
          Error
        </Text>
      </View>
    </ScrollView>
  );
}
