import { View } from "react-native";
import { Avatar } from "@/components/native/avatar";
import { IconButton } from "@/components/native/button";
import { DropdownMenu } from "@/components/native/dropdown-menu";
import { Text } from "@/components/native/text";
import { toast } from "@/components/native/toast";

export default function NativeDropdownMenuDemo() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Avatar
          size={40}
          name="Jamie Rivera"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop"
        />
        <View style={{ flex: 1 }}>
          <Text variant="large">Jamie Rivera</Text>
          <Text variant="muted">Posted 2h ago</Text>
        </View>
        <DropdownMenu
          items={[
            { type: "label", label: "Post" },
            { label: "Edit", icon: "edit", onPress: () => toast("Edit") },
            { label: "Copy link", icon: "link", onPress: () => toast.success("Link copied") },
            { label: "Bookmark", icon: "bookmark", onPress: () => toast("Saved") },
            { type: "separator" },
            {
              label: "Delete",
              icon: "trash",
              destructive: true,
              onPress: () => toast.error("Deleted"),
            },
          ]}
        >
          {(open) => (
            <IconButton
              icon="more-horizontal"
              variant="ghost"
              accessibilityLabel="More"
              onPress={open}
            />
          )}
        </DropdownMenu>
      </View>
      <Text style={{ marginTop: 14 }}>
        Just shipped the new onboarding flow. Tap the menu to see the dropdown anchored to its
        trigger.
      </Text>
    </View>
  );
}
