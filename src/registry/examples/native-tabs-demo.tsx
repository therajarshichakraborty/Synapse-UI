import * as React from "react";
import { View } from "react-native";
import { EmptyState } from "@/components/native/empty-state";
import { Tabs } from "@/components/native/tabs";
import { Text } from "@/components/native/text";

export default function NativeTabsDemo() {
  const [tab, setTab] = React.useState("inbox");
  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      <Text variant="h1">Mail</Text>
      <Tabs
        value={tab}
        onValueChange={setTab}
        items={[
          { value: "inbox", label: "Inbox", badge: 4 },
          { value: "sent", label: "Sent" },
          { value: "archive", label: "Archive" },
        ]}
      />
      <EmptyState
        icon={tab === "inbox" ? "inbox" : tab === "sent" ? "send" : "archive"}
        title={`No ${tab} mail`}
        description="Pull to refresh."
      />
      <Text variant="overline">Pill</Text>
      <Tabs
        variant="pill"
        defaultValue="week"
        items={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
    </View>
  );
}
