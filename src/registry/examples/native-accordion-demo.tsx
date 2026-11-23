import { ScrollView } from "react-native";
import { Accordion } from "@/components/native/accordion";
import { Text } from "@/components/native/text";

const faqs = [
  {
    value: "expo",
    title: "Does it work with Expo?",
    content:
      "Yes. Every component uses core React Native APIs plus react-native-svg, which ships with Expo.",
  },
  {
    value: "theme",
    title: "Can I change the colors?",
    content:
      "Wrap your app in ThemeProvider and override any token per scheme, for example the brand color.",
  },
  {
    value: "dark",
    title: "Is dark mode supported?",
    content:
      "Components follow the device color scheme automatically, or a scheme you force via ThemeProvider.",
  },
];

export default function NativeAccordionDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
      <Text variant="h3">FAQ</Text>
      <Accordion items={faqs} defaultValue={["expo"]} />
      <Text variant="overline" style={{ marginTop: 12 }}>
        Separated
      </Text>
      <Accordion items={faqs} variant="separated" type="multiple" />
    </ScrollView>
  );
}
