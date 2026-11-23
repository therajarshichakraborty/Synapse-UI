import * as React from "react";
import { View } from "react-native";
import { Avatar } from "@/components/native/avatar";
import { Keypad } from "@/components/native/keypad";
import { Text } from "@/components/native/text";
import { toast } from "@/components/native/toast";

export default function NativeKeypadDemo() {
  const [error, setError] = React.useState(false);
  return (
    <View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 28 }}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Avatar
          name="Jamie Rivera"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
          size={56}
        />
        <Text variant="h4">Enter passcode</Text>
        <Text variant="muted">Hint: 1234</Text>
      </View>
      <Keypad
        error={error}
        onChange={() => setError(false)}
        onComplete={(pin) => {
          if (pin === "1234") toast.success("Unlocked");
          else setError(true);
        }}
        extraKey={{ icon: "smile", label: "Face ID", onPress: () => toast("Face ID") }}
      />
    </View>
  );
}
