import { View } from "react-native";
import { Button } from "@/components/native/button";
import { Text } from "@/components/native/text";
import { toast } from "@/components/native/toast";

export default function NativeToastDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 10, justifyContent: "center" }}>
      <Text variant="muted" style={{ marginBottom: 8 }}>
        Toasts stack at the top. Swipe up to dismiss.
      </Text>
      <Button onPress={() => toast.success("Saved to Photos", { description: "IMG_2048.HEIC" })}>
        Success
      </Button>
      <Button
        variant="secondary"
        onPress={() => toast.error("Upload failed", { description: "Check your connection." })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast("Message archived", {
            icon: "archive",
            action: { label: "Undo", onPress: () => toast("Restored") },
          })
        }
      >
        With action
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1800)), {
            loading: "Publishing…",
            success: "Published to App Store",
            error: "Couldn't publish",
          })
        }
      >
        Promise
      </Button>
    </View>
  );
}
