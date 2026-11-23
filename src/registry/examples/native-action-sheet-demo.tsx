import * as React from "react";
import { View } from "react-native";
import { ActionSheet } from "@/components/native/action-sheet";
import { Button } from "@/components/native/button";
import { toast } from "@/components/native/toast";

export default function NativeActionSheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Button variant="outline" leftIcon="image" onPress={() => setOpen(true)}>
        Change photo
      </Button>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        title="Profile photo"
        message="Choose how to update your profile picture."
        options={[
          { label: "Take photo", icon: "camera", onPress: () => toast("Camera") },
          { label: "Choose from library", icon: "image", onPress: () => toast("Library") },
          {
            label: "Remove photo",
            icon: "trash",
            destructive: true,
            onPress: () => toast.error("Photo removed"),
          },
        ]}
      />
    </View>
  );
}
