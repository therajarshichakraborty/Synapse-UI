import { View } from "react-native";
import { Avatar } from "@/components/native/avatar";
import { Text } from "@/components/native/text";
import { TypingIndicator } from "@/components/native/typing-indicator";

export default function NativeTypingIndicatorDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 28, justifyContent: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
        <Avatar
          size={32}
          name="Ava Martinez"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop"
        />
        <TypingIndicator />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TypingIndicator bubble={false} />
        <Text variant="muted">Noah is typing…</Text>
      </View>
    </View>
  );
}
