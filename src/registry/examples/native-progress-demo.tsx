import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { Progress } from "@/components/native/progress";
import { Text } from "@/components/native/text";

export default function NativeProgressDemo() {
  const [value, setValue] = React.useState(36);
  return (
    <View style={{ flex: 1, padding: 24, gap: 26, justifyContent: "center" }}>
      <Progress value={value} label="Uploading photos" showValue />
      <Progress value={82} label="Storage" showValue tone="warning" size="lg" />
      <Progress value={100} label="Backup complete" tone="success" size="sm" />
      <View style={{ gap: 8 }}>
        <Text variant="small">Indeterminate</Text>
        <Progress tone="brand" />
      </View>
      <Button
        variant="secondary"
        onPress={() => setValue((v) => (v >= 100 ? 0 : Math.min(100, v + 16)))}
      >
        Advance
      </Button>
    </View>
  );
}
