import { View } from "react-native";
import { EmptyState } from "@/components/native/empty-state";
import { toast } from "@/components/native/toast";

export default function NativeEmptyStateDemo() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <EmptyState
        icon="inbox"
        title="You're all caught up"
        description="New messages from your team will show up here."
        action={{ label: "Start a conversation", onPress: () => toast("New conversation") }}
        secondaryAction={{ label: "Invite teammates", onPress: () => {} }}
      />
    </View>
  );
}
