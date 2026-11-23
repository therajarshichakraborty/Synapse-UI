import * as React from "react";
import { View } from "react-native";
import { CalendarStrip } from "@/components/native/calendar-strip";
import { Timeline } from "@/components/native/timeline";
import { Text } from "@/components/native/text";

export default function NativeCalendarStripDemo() {
  const [date, setDate] = React.useState(() => new Date());
  const iso = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };
  return (
    <View style={{ flex: 1, paddingTop: 8, gap: 20 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text variant="overline">
          {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </Text>
        <Text variant="h2">Schedule</Text>
      </View>
      <CalendarStrip
        value={date}
        onValueChange={setDate}
        marked={[iso(0), iso(2), iso(5)]}
        style={{ paddingLeft: 18 }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Timeline
          events={[
            { title: "Standup", time: "9:30", description: "Daily sync with the team" },
            { title: "Design critique", time: "11:00", status: "current" },
            { title: "Lunch with Ava", time: "13:00", status: "upcoming" },
          ]}
        />
      </View>
    </View>
  );
}
