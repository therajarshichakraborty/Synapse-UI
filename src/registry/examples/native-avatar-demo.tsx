import { ScrollView, View } from "react-native";
import { Avatar, AvatarGroup } from "@/components/native/avatar";
import { Text } from "@/components/native/text";

const img = (id: string) => `https://images.unsplash.com/${id}?w=200&h=200&fit=crop&crop=faces`;

const stories = [
  { name: "Your story", src: img("photo-1500648767791-00dcc994a43e") },
  { name: "Ava", src: img("photo-1494790108377-be9c29b29330") },
  { name: "Noah", src: img("photo-1507003211169-0a1dd7228f2d") },
  { name: "Mia", src: img("photo-1438761681033-6461ffad8d80") },
  { name: "Liam Chen" },
];

export default function NativeAvatarDemo() {
  return (
    <View style={{ flex: 1, padding: 20, gap: 28, justifyContent: "center" }}>
      <View style={{ gap: 12 }}>
        <Text variant="overline">Stories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 14 }}
        >
          {stories.map((s, i) => (
            <View key={s.name} style={{ alignItems: "center", gap: 6 }}>
              <Avatar src={s.src} name={s.name} size={58} ring={i > 0} />
              <Text variant="caption">{s.name.split(" ")[0]}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ gap: 12 }}>
        <Text variant="overline">Status & fallback</Text>
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Avatar src={stories[1].src} name="Ava" status="online" size={52} />
          <Avatar src={stories[2].src} name="Noah" status="away" size={52} />
          <Avatar name="Sam Lee" status="busy" size={52} />
          <Avatar name="Robin Park" shape="rounded" size={52} />
        </View>
      </View>
      <View style={{ gap: 12 }}>
        <Text variant="overline">Group</Text>
        <AvatarGroup people={[...stories, { name: "Kai" }, { name: "Eli" }]} max={4} />
      </View>
    </View>
  );
}
