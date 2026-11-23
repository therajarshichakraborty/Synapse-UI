import * as React from "react";
import { ScrollView } from "react-native";
import { Alert } from "@/components/native/alert";

export default function NativeAlertDemo() {
  const [shown, setShown] = React.useState(true);
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      <Alert
        title="Update available"
        description="Version 2.4 brings offline mode and faster sync."
        action={{ label: "Update now", onPress: () => {} }}
      />
      <Alert tone="success" title="Payment received" description="$1,240.00 from Acme Inc." />
      <Alert
        tone="warning"
        title="Storage almost full"
        description="You've used 92% of your 5 GB."
      />
      <Alert
        tone="destructive"
        title="Card declined"
        description="Check your card details or use another method."
      />
      {shown && (
        <Alert
          tone="neutral"
          title="Tip"
          description="Long-press any message to react."
          onDismiss={() => setShown(false)}
        />
      )}
    </ScrollView>
  );
}
