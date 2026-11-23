import * as React from "react";
import { View } from "react-native";
import { EmptyState } from "@/components/native/empty-state";
import { TabBar } from "@/components/native/tab-bar";
import type { IconName } from "@/components/native/icon";

const tabs: { key: string; label: string; icon: IconName; badge?: number }[] = [
  { key: "home", label: "Home", icon: "home" },
  { key: "search", label: "Search", icon: "search" },
  { key: "inbox", label: "Inbox", icon: "message-circle", badge: 3 },
  { key: "profile", label: "Profile", icon: "user" },
];

export default function NativeTabBarDemo() {
  const [tab, setTab] = React.useState("home");
  const current = tabs.find((t) => t.key === tab)!;
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <EmptyState icon={current.icon} title={current.label} description="Tap the tabs below." />
      </View>
      <TabBar items={tabs} value={tab} onValueChange={setTab} />
    </View>
  );
}
