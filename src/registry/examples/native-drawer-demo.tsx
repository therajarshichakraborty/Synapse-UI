import * as React from "react";
import { View } from "react-native";
import { Avatar } from "@/components/native/avatar";
import { IconButton } from "@/components/native/button";
import { Drawer, DrawerItem } from "@/components/native/drawer";
import { Separator } from "@/components/native/separator";
import { Text } from "@/components/native/text";

const nav = [
  { key: "home", label: "Home", icon: "home" as const },
  { key: "inbox", label: "Inbox", icon: "inbox" as const, badge: 12 },
  { key: "calendar", label: "Calendar", icon: "calendar" as const },
  { key: "files", label: "Files", icon: "file-text" as const },
];

export default function NativeDrawerDemo() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("home");
  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <IconButton
          icon="menu"
          variant="ghost"
          accessibilityLabel="Open menu"
          onPress={() => setOpen(true)}
        />
        <Text variant="h3">{nav.find((n) => n.key === active)?.label}</Text>
      </View>
      <Text variant="muted">Open the menu, then swipe it closed.</Text>

      <Drawer open={open} onOpenChange={setOpen}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
        >
          <Avatar
            size={44}
            name="Jamie Rivera"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop"
          />
          <View>
            <Text variant="large">Jamie Rivera</Text>
            <Text variant="muted">jamie@synapse.dev</Text>
          </View>
        </View>
        <View style={{ gap: 2 }}>
          {nav.map((n) => (
            <DrawerItem
              key={n.key}
              label={n.label}
              icon={n.icon}
              badge={n.badge}
              active={active === n.key}
              onPress={() => {
                setActive(n.key);
                setOpen(false);
              }}
            />
          ))}
        </View>
        <Separator style={{ marginVertical: 14 }} />
        <DrawerItem label="Settings" icon="settings" />
        <DrawerItem label="Help" icon="help-circle" />
      </Drawer>
    </View>
  );
}
