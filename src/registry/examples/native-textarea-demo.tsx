import { View } from "react-native";
import { Button } from "@/components/native/button";
import { FormField } from "@/components/native/form-field";
import { Text } from "@/components/native/text";
import { Textarea } from "@/components/native/textarea";

export default function NativeTextareaDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 18, justifyContent: "center" }}>
      <Text variant="h3">Send feedback</Text>
      <FormField label="What can we improve?" description="We read every message.">
        <Textarea
          placeholder="Tell us what you think…"
          maxLength={280}
          showCount
          defaultValue="The new dashboard is great, but I'd love "
        />
      </FormField>
      <Button block leftIcon="send">
        Send
      </Button>
    </View>
  );
}
