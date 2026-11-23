import type { ReactNode } from "react";
import { View } from "react-native";
import { Card, CardContent } from "@/components/native/card";
import { Separator } from "@/components/native/separator";
import { Stepper } from "@/components/native/stepper";
import { Text } from "@/components/native/text";

function Row({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <View style={{ flex: 1 }}>
        <Text variant="large">{title}</Text>
        <Text variant="muted">{subtitle}</Text>
      </View>
      {children}
    </View>
  );
}

export default function NativeStepperDemo() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 16 }}>
      <Text variant="h3">{"Who's coming?"}</Text>
      <Card>
        <CardContent style={{ gap: 16 }}>
          <Row title="Adults" subtitle="Ages 13 or above">
            <Stepper defaultValue={2} min={1} max={16} />
          </Row>
          <Separator />
          <Row title="Children" subtitle="Ages 2–12">
            <Stepper defaultValue={0} max={8} />
          </Row>
          <Separator />
          <Row title="Pets" subtitle="Hold to repeat">
            <Stepper defaultValue={1} size="sm" />
          </Row>
        </CardContent>
      </Card>
    </View>
  );
}
