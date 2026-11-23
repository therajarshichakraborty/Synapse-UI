import * as React from "react";
import { View } from "react-native";
import { Avatar } from "@/components/native/avatar";
import { ListItem } from "@/components/native/list";
import { SwipeableRow } from "@/components/native/swipeable-row";
import { Text } from "@/components/native/text";
import { useTheme } from "@/components/native/theme";
import { toast } from "@/components/native/toast";

const initial = [
  { id: 1, name: "Ava Martinez", text: "Can you review the deck before 3?" },
  { id: 2, name: "Noah Kim", text: "Pushed the fix, CI is green ✅" },
  { id: 3, name: "Mia Johnson", text: "Lunch tomorrow?" },
  { id: 4, name: "Liam Chen", text: "Invoice attached" },
];

export default function NativeSwipeableRowDemo() {
  const { colors } = useTheme();
  const [mail, setMail] = React.useState(initial);
  return (
    <View style={{ flex: 1, paddingTop: 12 }}>
      <Text variant="h1" style={{ paddingHorizontal: 20, marginBottom: 6 }}>
        Inbox
      </Text>
      <Text variant="muted" style={{ paddingHorizontal: 20, marginBottom: 14 }}>
        Swipe a row left or right.
      </Text>
      <View style={{ borderTopWidth: 0.5, borderColor: colors.border }}>
        {mail.map((m) => (
          <SwipeableRow
            key={m.id}
            style={{ borderBottomWidth: 0.5, borderColor: colors.border }}
            leftActions={[{ label: "Read", icon: "check", onPress: () => toast("Marked as read") }]}
            rightActions={[
              {
                label: "Archive",
                icon: "archive",
                color: "#f59e0b",
                onPress: () => toast("Archived"),
              },
              {
                label: "Delete",
                icon: "trash",
                onPress: () => setMail((x) => x.filter((y) => y.id !== m.id)),
              },
            ]}
          >
            <ListItem
              leading={<Avatar name={m.name} size={42} />}
              title={m.name}
              subtitle={m.text}
            />
          </SwipeableRow>
        ))}
      </View>
    </View>
  );
}
