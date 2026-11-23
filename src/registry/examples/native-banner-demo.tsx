import * as React from "react";
import { View } from "react-native";
import { Banner } from "@/components/native/banner";
import { Button } from "@/components/native/button";
import { Text } from "@/components/native/text";

export default function NativeBannerDemo() {
  const [show, setShow] = React.useState(true);
  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <Text variant="h1">Home</Text>
      {show ? (
        <Banner
          title="Meet Synapse AI"
          description="Summaries, smart replies and more, built into every chat."
          action={{ label: "Try it", onPress: () => {} }}
          onDismiss={() => setShow(false)}
        />
      ) : (
        <Button variant="secondary" onPress={() => setShow(true)}>
          Show banner
        </Button>
      )}
      <Banner
        icon="gift"
        title="Invite friends, get $20"
        description="For every friend who joins."
        colors={["#059669", "#0d9488"]}
      />
    </View>
  );
}
