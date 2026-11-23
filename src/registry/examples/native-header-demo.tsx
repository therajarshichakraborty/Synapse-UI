import * as React from "react";
import { Animated, View } from "react-native";
import { Header } from "@/components/native/header";
import { ListGroup, ListItem } from "@/components/native/list";

const items = Array.from({ length: 14 }, (_, i) => `Note ${i + 1}`);

export default function NativeHeaderDemo() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Notes"
        eyebrow="Monday, June 9"
        scrollY={scrollY}
        actions={[
          { icon: "search", label: "Search" },
          { icon: "bell", label: "Notifications", badge: true },
        ]}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        contentContainerStyle={{ padding: 16 }}
      >
        <ListGroup header="Scroll to collapse the title">
          {items.map((t) => (
            <ListItem
              key={t}
              title={t}
              subtitle="Edited just now"
              icon="file-text"
              onPress={() => {}}
            />
          ))}
        </ListGroup>
      </Animated.ScrollView>
    </View>
  );
}
