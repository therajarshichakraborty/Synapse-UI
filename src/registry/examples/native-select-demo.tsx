import { View } from "react-native";
import { FormField } from "@/components/native/form-field";
import { Select } from "@/components/native/select";
import { Text } from "@/components/native/text";

const countries = [
  "Australia",
  "Brazil",
  "Canada",
  "France",
  "Germany",
  "India",
  "Japan",
  "Mexico",
  "Spain",
  "United Kingdom",
  "United States",
].map((c) => ({ value: c, label: c }));

export default function NativeSelectDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 20, justifyContent: "center" }}>
      <Text variant="h3">Shipping</Text>
      <FormField label="Country">
        <Select title="Select country" options={countries} placeholder="Choose a country" />
      </FormField>
      <FormField label="Plan" description="You can change this any time.">
        <Select
          title="Choose a plan"
          defaultValue="pro"
          options={[
            { value: "free", label: "Free", description: "For side projects", icon: "smile" },
            { value: "pro", label: "Pro", description: "$12 / month", icon: "zap" },
            { value: "team", label: "Team", description: "$29 / seat", icon: "users" },
          ]}
        />
      </FormField>
    </View>
  );
}
