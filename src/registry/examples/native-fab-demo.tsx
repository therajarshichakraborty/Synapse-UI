import { View } from "react-native";
import { Fab } from "@/components/native/fab";
import { Text } from "@/components/native/text";
import { toast } from "@/components/native/toast";

export default function NativeFabDemo() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text variant="h2">Notes</Text>
      <Text variant="muted" style={{ marginTop: 6 }}>
        Tap the button to open the speed dial.
      </Text>
      <Fab
        offset={36}
        actions={[
          { icon: "camera", label: "Scan document", onPress: () => toast("Camera opened") },
          { icon: "mic", label: "Voice memo", onPress: () => toast("Recording…") },
          { icon: "edit", label: "New note", onPress: () => toast.success("Note created") },
        ]}
      />
    </View>
  );
}
