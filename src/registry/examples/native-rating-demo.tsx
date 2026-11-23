import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { Rating } from "@/components/native/rating";
import { Text } from "@/components/native/text";

const labels = ["", "Terrible", "Bad", "Okay", "Good", "Amazing"];

export default function NativeRatingDemo() {
  const [value, setValue] = React.useState(4);
  return (
    <View style={{ flex: 1, padding: 24, gap: 24, justifyContent: "center", alignItems: "center" }}>
      <Text variant="h3" align="center">
        How was your stay?
      </Text>
      <Rating value={value} onValueChange={setValue} size={40} />
      <Text variant="large">{labels[value]}</Text>
      <Button block style={{ alignSelf: "stretch" }}>
        Submit review
      </Button>
      <View style={{ marginTop: 12, alignItems: "center", gap: 6 }}>
        <Text variant="muted">Read-only, fractional</Text>
        <Rating readOnly value={4.6} size={18} showValue count="2.4k" />
      </View>
    </View>
  );
}
