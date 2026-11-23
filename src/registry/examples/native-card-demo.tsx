import { ScrollView, View } from "react-native";
import { AvatarGroup } from "@/components/native/avatar";
import { Badge } from "@/components/native/badge";
import { Button, IconButton } from "@/components/native/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/native/card";
import { Progress } from "@/components/native/progress";
import { Text } from "@/components/native/text";

export default function NativeCardDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
      <Card variant="elevated">
        <CardHeader
          title="Website redesign"
          description="Marketing site refresh for Q3 launch."
          right={
            <Badge tone="brand" dot>
              Active
            </Badge>
          }
        />
        <CardContent style={{ gap: 14 }}>
          <Progress value={68} label="Progress" showValue />
          <AvatarGroup
            size={30}
            people={[
              {
                name: "Ava M",
                src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
              },
              {
                name: "Noah K",
                src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
              },
              { name: "Mia J" },
              { name: "Liam C" },
              { name: "Zoe P" },
            ]}
          />
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="secondary" style={{ flex: 1 }}>
            Details
          </Button>
          <Button size="sm" style={{ flex: 1 }}>
            Open board
          </Button>
        </CardFooter>
      </Card>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Card variant="filled" style={{ flex: 1 }} onPress={() => {}}>
          <CardContent style={{ gap: 6 }}>
            <Text variant="overline">Filled</Text>
            <Text variant="large">Pressable</Text>
            <Text variant="muted">Springs on touch.</Text>
          </CardContent>
        </Card>
        <Card style={{ flex: 1 }}>
          <CardContent style={{ gap: 6 }}>
            <Text variant="overline">Outline</Text>
            <Text variant="large">Static</Text>
            <Text variant="muted">Hairline border.</Text>
          </CardContent>
        </Card>
      </View>

      <Card>
        <CardHeader
          title="Upgrade to Pro"
          description="Unlock unlimited projects and AI credits."
          right={<IconButton icon="x" size="sm" variant="ghost" accessibilityLabel="Dismiss" />}
        />
        <CardContent>
          <Button variant="brand" block leftIcon="sparkles">
            Start free trial
          </Button>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
