import * as React from "react";
import { ScrollView, View } from "react-native";
import { MediaCard } from "@/components/native/media-card";

export default function NativeMediaCardDemo() {
  const [liked, setLiked] = React.useState(true);
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
      <MediaCard
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
        eyebrow="Editor's pick"
        title="Dolomites Hut-to-Hut"
        subtitle="7 days · Italy"
        meta="$1,890"
        aspectRatio={1}
        action={{ icon: "heart", label: "Save", active: liked, onPress: () => setLiked((l) => !l) }}
        onPress={() => {}}
      />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <MediaCard
          style={{ flex: 1 }}
          image="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80"
          title="Lakeside cabins"
          subtitle="Norway"
          aspectRatio={3 / 4}
        />
        <MediaCard
          style={{ flex: 1 }}
          image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80"
          title="Desert nights"
          subtitle="Utah"
          aspectRatio={3 / 4}
        />
      </View>
    </ScrollView>
  );
}
