import * as React from "react";
import { View } from "react-native";
import { Chip, ChipGroup } from "@/components/native/chip";
import { Text } from "@/components/native/text";

export default function NativeChipDemo() {
  const [tags, setTags] = React.useState(["React Native", "Expo", "TypeScript"]);
  return (
    <View style={{ flex: 1, padding: 20, gap: 26, justifyContent: "center" }}>
      <View style={{ gap: 10 }}>
        <Text variant="overline">Category</Text>
        <ChipGroup
          scrollable
          defaultValue={["all"]}
          options={[
            { value: "all", label: "All", count: 48 },
            { value: "design", label: "Design", icon: "layers" },
            { value: "music", label: "Music", icon: "music" },
            { value: "travel", label: "Travel", icon: "globe" },
            { value: "food", label: "Food", icon: "flame" },
          ]}
        />
      </View>
      <View style={{ gap: 10 }}>
        <Text variant="overline">Interests (multi-select)</Text>
        <ChipGroup
          multiple
          defaultValue={["photo", "hiking"]}
          options={[
            { value: "photo", label: "Photography" },
            { value: "hiking", label: "Hiking" },
            { value: "coffee", label: "Coffee" },
            { value: "film", label: "Film" },
            { value: "yoga", label: "Yoga" },
            { value: "books", label: "Books" },
          ]}
        />
      </View>
      <View style={{ gap: 10 }}>
        <Text variant="overline">Removable</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {tags.map((t) => (
            <Chip key={t} label={t} onRemove={() => setTags((x) => x.filter((y) => y !== t))} />
          ))}
        </View>
      </View>
    </View>
  );
}
