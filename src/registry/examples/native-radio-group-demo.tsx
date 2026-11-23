import { ScrollView } from "react-native";
import { RadioGroup } from "@/components/native/radio-group";
import { Separator } from "@/components/native/separator";
import { Text } from "@/components/native/text";

export default function NativeRadioGroupDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 18 }}>
      <Text variant="overline">Delivery</Text>
      <RadioGroup
        variant="card"
        defaultValue="express"
        options={[
          {
            value: "standard",
            label: "Standard",
            description: "3–5 business days · Free",
            icon: "package",
          },
          {
            value: "express",
            label: "Express",
            description: "Tomorrow by 9pm · $9.99",
            icon: "zap",
          },
          { value: "pickup", label: "Pickup", description: "Ready in 2 hours", icon: "map-pin" },
        ]}
      />
      <Separator />
      <Text variant="overline">Notifications</Text>
      <RadioGroup
        defaultValue="mentions"
        options={[
          { value: "all", label: "All new messages" },
          { value: "mentions", label: "Direct messages and mentions" },
          { value: "none", label: "Nothing" },
        ]}
      />
    </ScrollView>
  );
}
