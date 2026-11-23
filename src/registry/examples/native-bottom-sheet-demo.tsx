import * as React from "react";
import { View } from "react-native";
import { BottomSheet } from "@/components/native/bottom-sheet";
import { Button } from "@/components/native/button";
import { ListGroup, ListItem } from "@/components/native/list";
import { Text } from "@/components/native/text";

export default function NativeBottomSheetDemo() {
  const [share, setShare] = React.useState(false);
  const [details, setDetails] = React.useState(false);
  return (
    <View style={{ flex: 1, padding: 24, gap: 12, justifyContent: "center" }}>
      <Button leftIcon="share" onPress={() => setShare(true)}>
        Share (fits content)
      </Button>
      <Button variant="outline" onPress={() => setDetails(true)}>
        Details (snap points)
      </Button>

      <BottomSheet
        open={share}
        onOpenChange={setShare}
        title="Share"
        description="Drag the handle down to close."
      >
        <ListGroup>
          <ListItem title="Copy link" icon="link" onPress={() => setShare(false)} />
          <ListItem
            title="Message"
            icon="message-circle"
            iconColor="#22c55e"
            onPress={() => setShare(false)}
          />
          <ListItem title="Mail" icon="mail" iconColor="#3b82f6" onPress={() => setShare(false)} />
        </ListGroup>
      </BottomSheet>

      <BottomSheet
        open={details}
        onOpenChange={setDetails}
        snapPoints={[0.45, 0.85]}
        title="Trip details"
      >
        <View style={{ gap: 12 }}>
          <Text variant="muted">Drag up to expand to 85%, or down to collapse and close.</Text>
          {[
            ["Flight", "SFO → KIX · 7:40 AM · #4821"],
            ["Hotel", "Kyoto machiya · 3 nights · #7302"],
            ["Car rental", "Compact · pick up 10:00 · #1196"],
            ["Activities", "Tea ceremony · day 2 · #5584"],
          ].map(([title, detail]) => (
            <View key={title} style={{ paddingVertical: 6 }}>
              <Text variant="large">{title}</Text>
              <Text variant="muted">{detail}</Text>
            </View>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
}
