import { View } from "react-native";
import { BarChart } from "@/components/native/bar-chart";
import { Card, CardContent, CardHeader } from "@/components/native/card";
import { SegmentedControl } from "@/components/native/segmented-control";

export default function NativeBarChartDemo() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 16, justifyContent: "center" }}>
      <SegmentedControl options={["Steps", "Calories", "Sleep"]} />
      <Card>
        <CardHeader title="Activity" description="Tap a bar for details" />
        <CardContent>
          <BarChart
            formatValue={(v) => `${v.toLocaleString()} steps`}
            data={[
              { label: "Mon", value: 6400 },
              { label: "Tue", value: 8200 },
              { label: "Wed", value: 5100 },
              { label: "Thu", value: 9600 },
              { label: "Fri", value: 7300 },
              { label: "Sat", value: 11200 },
              { label: "Sun", value: 4300 },
            ]}
            defaultActive={5}
          />
        </CardContent>
      </Card>
    </View>
  );
}
