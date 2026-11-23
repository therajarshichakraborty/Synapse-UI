import { View } from "react-native";
import { Button } from "@/components/native/button";
import { FormField } from "@/components/native/form-field";
import { Input } from "@/components/native/input";
import { Separator } from "@/components/native/separator";
import { Text } from "@/components/native/text";

export default function NativeInputDemo() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 18, justifyContent: "center" }}>
      <View style={{ gap: 6, marginBottom: 6 }}>
        <Text variant="h2">Welcome back</Text>
        <Text variant="muted">Sign in to continue to Synapse.</Text>
      </View>
      <FormField label="Email">
        <Input
          leftIcon="mail"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          clearable
        />
      </FormField>
      <FormField
        label="Password"
        labelRight={
          <Text variant="small" tone="brand">
            Forgot?
          </Text>
        }
      >
        <Input leftIcon="lock" placeholder="••••••••" secureTextEntry revealable />
      </FormField>
      <Button size="lg" block>
        Sign in
      </Button>
      <Separator label="or" />
      <Button size="lg" variant="outline" block leftIcon="globe">
        Continue with Google
      </Button>
    </View>
  );
}
