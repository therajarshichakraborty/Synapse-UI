import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { NumberTicker } from "@/components/native/number-ticker";
import { Text } from "@/components/native/text";

export default function NativeNumberTickerDemo() {
  const [balance, setBalance] = React.useState(12480.5);
  return (
    <View style={{ flex: 1, padding: 24, gap: 10, justifyContent: "center", alignItems: "center" }}>
      <Text variant="overline">Total balance</Text>
      <NumberTicker value={balance} prefix="$" decimals={2} style={{ fontSize: 48 }} />
      <Text variant="muted">+ $1,240.20 this month</Text>
      <View style={{ flexDirection: "row", gap: 28, marginTop: 28 }}>
        <View style={{ alignItems: "center" }}>
          <NumberTicker value={98} suffix="%" style={{ fontSize: 28 }} />
          <Text variant="caption">Uptime</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <NumberTicker value={2841} style={{ fontSize: 28 }} />
          <Text variant="caption">Users</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <NumberTicker value={4.9} decimals={1} style={{ fontSize: 28 }} />
          <Text variant="caption">Rating</Text>
        </View>
      </View>
      <Button
        variant="secondary"
        style={{ marginTop: 32 }}
        leftIcon="plus"
        onPress={() => setBalance((b) => b + 500)}
      >
        Add $500
      </Button>
    </View>
  );
}
