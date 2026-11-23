import * as React from "react";
import { View } from "react-native";
import { Text } from "@/components/native/text";
import { Toggle } from "@/components/native/toggle";

export default function NativeToggleDemo() {
  const [likes, setLikes] = React.useState(128);
  return (
    <View style={{ flex: 1, padding: 24, gap: 28, justifyContent: "center" }}>
      <Text variant="overline">Tap to toggle</Text>
      <View style={{ flexDirection: "row", gap: 28, alignItems: "center" }}>
        <Toggle
          icon="heart"
          accessibilityLabel="Like"
          label={String(likes)}
          onPressedChange={(on) => setLikes((n) => n + (on ? 1 : -1))}
        />
        <Toggle icon="bookmark" accessibilityLabel="Save" />
        <Toggle icon="star" accessibilityLabel="Favorite" defaultPressed />
        <Toggle
          icon="bell"
          accessibilityLabel="Notify"
          fillWhenActive={false}
          activeColor="#2563eb"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Toggle icon="heart" bordered label="Like" accessibilityLabel="Like" />
        <Toggle
          icon="user-plus"
          bordered
          label="Follow"
          fillWhenActive={false}
          activeColor="#2563eb"
          accessibilityLabel="Follow"
        />
      </View>
    </View>
  );
}
