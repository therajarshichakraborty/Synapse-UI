import * as React from "react";
import { View } from "react-native";
import { ListGroup, ListItem } from "@/components/native/list";
import { SearchBar } from "@/components/native/search-bar";
import { Text } from "@/components/native/text";

const people = [
  { name: "Ava Martinez", role: "Design" },
  { name: "Noah Kim", role: "Engineering" },
  { name: "Mia Johnson", role: "Marketing" },
  { name: "Liam Chen", role: "Engineering" },
  { name: "Zoe Patel", role: "Product" },
];

export default function NativeSearchBarDemo() {
  const [q, setQ] = React.useState("");
  const results = people.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <Text variant="h1">Contacts</Text>
      <SearchBar value={q} onChangeText={setQ} placeholder="Search people" />
      <ListGroup>
        {results.map((p) => (
          <ListItem key={p.name} title={p.name} subtitle={p.role} icon="user" onPress={() => {}} />
        ))}
      </ListGroup>
      {results.length === 0 && (
        <Text variant="muted" align="center">
          No matches for “{q}”
        </Text>
      )}
    </View>
  );
}
