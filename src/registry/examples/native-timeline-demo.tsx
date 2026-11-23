import { ScrollView } from "react-native";
import { Card, CardContent, CardHeader } from "@/components/native/card";
import { Timeline } from "@/components/native/timeline";

export default function NativeTimelineDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <CardHeader title="Order #2048" description="Arriving Thursday, Jun 12" />
        <CardContent>
          <Timeline
            events={[
              { title: "Order placed", description: "We've received your order.", time: "9:41 AM" },
              {
                title: "Packed",
                description: "Your items are ready to ship.",
                time: "1:12 PM",
                icon: "package",
              },
              {
                title: "In transit",
                description: "Departed San Francisco hub.",
                time: "Now",
                status: "current",
              },
              { title: "Out for delivery", status: "upcoming", icon: "map-pin" },
              { title: "Delivered", status: "upcoming", icon: "home" },
            ]}
          />
        </CardContent>
      </Card>
    </ScrollView>
  );
}
