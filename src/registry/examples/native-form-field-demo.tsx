import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { FormField } from "@/components/native/form-field";
import { Input } from "@/components/native/input";
import { Text } from "@/components/native/text";

export default function NativeFormFieldDemo() {
  const [username, setUsername] = React.useState("ad");
  const error = username.length < 3 ? "Use at least 3 characters." : undefined;
  return (
    <View style={{ flex: 1, padding: 24, gap: 20, justifyContent: "center" }}>
      <Text variant="h3">Create your profile</Text>
      <FormField label="Full name" required description="As it appears on your ID.">
        <Input placeholder="Jane Appleseed" />
      </FormField>
      <FormField label="Username" required error={error}>
        <Input
          leftIcon="at-sign"
          value={username}
          onChangeText={setUsername}
          invalid={!!error}
          autoCapitalize="none"
        />
      </FormField>
      <Button block disabled={!!error}>
        Continue
      </Button>
    </View>
  );
}
