import { View } from "react-native";
import { Carousel } from "@/components/native/carousel";
import { MediaCard } from "@/components/native/media-card";
import { Text } from "@/components/native/text";

const places = [
  {
    title: "Kyoto, Japan",
    subtitle: "Temples & tea houses",
    price: "$1,240",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  },
  {
    title: "Santorini, Greece",
    subtitle: "Cliffside sunsets",
    price: "$980",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
  },
  {
    title: "Banff, Canada",
    subtitle: "Turquoise lakes",
    price: "$760",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
  },
  {
    title: "Marrakech, Morocco",
    subtitle: "Souks & riads",
    price: "$690",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80",
  },
];

export default function NativeCarouselDemo() {
  return (
    <View style={{ flex: 1, paddingTop: 12, gap: 18 }}>
      <View style={{ paddingHorizontal: 20, gap: 4 }}>
        <Text variant="overline">Discover</Text>
        <Text variant="h2">Trending trips</Text>
      </View>
      <Carousel
        data={places}
        renderItem={(p) => (
          <MediaCard
            image={p.image}
            title={p.title}
            subtitle={p.subtitle}
            meta={p.price}
            eyebrow="Popular"
          />
        )}
      />
    </View>
  );
}
