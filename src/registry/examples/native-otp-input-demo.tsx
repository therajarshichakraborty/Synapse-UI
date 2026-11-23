import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { Icon } from "@/components/native/icon";
import { OtpInput } from "@/components/native/otp-input";
import { Text } from "@/components/native/text";
import { useTheme } from "@/components/native/theme";
import { toast } from "@/components/native/toast";

export default function NativeOtpInputDemo() {
  const { colors } = useTheme();
  const [code, setCode] = React.useState("");
  const [invalid, setInvalid] = React.useState(false);

  return (
    <View style={{ flex: 1, padding: 24, gap: 28, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          backgroundColor: colors.brandSoft,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="shield-check" size={30} color={colors.brand} />
      </View>
      <View style={{ gap: 8, alignItems: "center" }}>
        <Text variant="h3">Verify your phone</Text>
        <Text variant="muted" align="center">
          Enter the 6-digit code sent to +1 (555) 012-3456. Try 123456.
        </Text>
      </View>
      <OtpInput
        value={code}
        groupAfter={3}
        invalid={invalid}
        onChange={(c) => {
          setCode(c);
          setInvalid(false);
        }}
        onComplete={(c) => {
          if (c === "123456") toast.success("Phone verified");
          else setInvalid(true);
        }}
      />
      <Button variant="link">Resend code</Button>
    </View>
  );
}
