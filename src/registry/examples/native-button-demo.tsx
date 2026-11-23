import { View } from "react-native";
import { Button, IconButton } from "@/components/native/button";
import { Text } from "@/components/native/text";

export default function NativeButtonDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 14, justifyContent: "center" }}>
      <Text variant="overline">Buttons</Text>
      <Button rightIcon="arrow-right">Continue</Button>
      <Button variant="brand" leftIcon="sparkles">
        Generate with AI
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline" leftIcon="share">
        Share
      </Button>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button variant="ghost" style={{ flex: 1 }}>
          Ghost
        </Button>
        <Button loading style={{ flex: 1 }}>
          Saving
        </Button>
      </View>
      <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
        <IconButton icon="heart" accessibilityLabel="Like" />
        <IconButton icon="bookmark" accessibilityLabel="Save" variant="secondary" />
        <IconButton icon="plus" accessibilityLabel="Add" variant="default" shape="circle" />
        <IconButton icon="trash" accessibilityLabel="Delete" variant="destructive" />
      </View>
    </View>
  );
}
