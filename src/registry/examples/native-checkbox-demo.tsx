import * as React from "react";
import { View } from "react-native";
import { Checkbox } from "@/components/native/checkbox";
import { Separator } from "@/components/native/separator";
import { Text } from "@/components/native/text";

const tasks = ["Design review", "Ship v2.0", "Update docs"];

export default function NativeCheckboxDemo() {
  const [done, setDone] = React.useState<string[]>(["Design review"]);
  const all = done.length === tasks.length ? true : done.length ? "indeterminate" : false;

  return (
    <View style={{ flex: 1, padding: 24, gap: 18, justifyContent: "center" }}>
      <Checkbox
        label="Terms of service"
        description="I agree to the terms and privacy policy."
        defaultChecked
      />
      <Separator />
      <Text variant="overline">Today</Text>
      <Checkbox
        label="Select all"
        checked={all}
        onCheckedChange={(on) => setDone(on ? tasks : [])}
      />
      <View style={{ gap: 14, paddingLeft: 34 }}>
        {tasks.map((t) => (
          <Checkbox
            key={t}
            shape="round"
            label={t}
            checked={done.includes(t)}
            onCheckedChange={(on) => setDone((d) => (on ? [...d, t] : d.filter((x) => x !== t)))}
          />
        ))}
      </View>
      <Separator />
      <Checkbox label="Disabled option" disabled />
    </View>
  );
}
