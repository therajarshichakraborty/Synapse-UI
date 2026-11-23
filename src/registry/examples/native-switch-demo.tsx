import { View } from "react-native";
import { ListGroup, ListItem } from "@/components/native/list";
import { Switch } from "@/components/native/switch";
import { Text } from "@/components/native/text";

export default function NativeSwitchDemo() {
  return (
    <View style={{ flex: 1, padding: 20, gap: 22 }}>
      <Text variant="h1">Settings</Text>
      <ListGroup header="Preferences" footer="Focus mode silences notifications while you work.">
        <ListItem
          title="Notifications"
          icon="bell"
          iconColor="#ef4444"
          trailing={<Switch defaultValue />}
        />
        <ListItem title="Focus mode" icon="moon" iconColor="#6366f1" trailing={<Switch />} />
        <ListItem
          title="Wi-Fi"
          icon="wifi"
          iconColor="#0ea5e9"
          trailing={<Switch defaultValue tint="brand" />}
        />
      </ListGroup>
      <Switch
        label="Share analytics"
        description="Help us improve by sending anonymous usage data."
        defaultValue
      />
      <Switch label="Disabled" disabled />
    </View>
  );
}
