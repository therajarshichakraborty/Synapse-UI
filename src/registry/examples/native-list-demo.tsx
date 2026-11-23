import { ScrollView, View } from "react-native";
import { Avatar } from "@/components/native/avatar";
import { Badge } from "@/components/native/badge";
import { ListGroup, ListItem } from "@/components/native/list";
import { Switch } from "@/components/native/switch";
import { Text } from "@/components/native/text";

export default function NativeListDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
      <Text variant="h1" style={{ marginHorizontal: 4 }}>
        Settings
      </Text>
      <ListGroup>
        <ListItem
          leading={
            <Avatar
              size={52}
              name="Jamie Rivera"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
            />
          }
          title="Jamie Rivera"
          subtitle="Apple ID, iCloud+, Media & Purchases"
          onPress={() => {}}
        />
      </ListGroup>
      <ListGroup header="General">
        <ListItem
          title="Airplane Mode"
          icon="send"
          iconColor="#f59e0b"
          trailing={<Switch size="sm" />}
        />
        <ListItem title="Wi-Fi" icon="wifi" iconColor="#3b82f6" value="Home" onPress={() => {}} />
        <ListItem
          title="Notifications"
          icon="bell"
          iconColor="#ef4444"
          trailing={
            <Badge tone="destructive" variant="solid" size="sm">
              3
            </Badge>
          }
          onPress={() => {}}
        />
        <ListItem title="Privacy & Security" icon="shield" iconColor="#6366f1" onPress={() => {}} />
      </ListGroup>
      <ListGroup footer="Signing out removes this device from your account.">
        <ListItem title="Sign out" icon="log-out" destructive onPress={() => {}} chevron={false} />
      </ListGroup>
      <View style={{ height: 12 }} />
    </ScrollView>
  );
}
