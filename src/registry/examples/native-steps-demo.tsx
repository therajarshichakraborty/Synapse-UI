import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { Steps } from "@/components/native/steps";

const steps = ["Account", "Profile", "Payment", "Done"];

export default function NativeStepsDemo() {
  const [step, setStep] = React.useState(1);
  return (
    <View style={{ flex: 1, padding: 24, gap: 40, justifyContent: "center" }}>
      <Steps steps={steps} current={step} />
      <Steps steps={steps} current={step} variant="bar" />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          variant="secondary"
          style={{ flex: 1 }}
          disabled={step === 0}
          onPress={() => setStep((s) => s - 1)}
        >
          Back
        </Button>
        <Button
          style={{ flex: 1 }}
          disabled={step === steps.length - 1}
          onPress={() => setStep((s) => s + 1)}
        >
          Next
        </Button>
      </View>
    </View>
  );
}
