"use client";

import * as React from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("");
  return (
    <div className="grid justify-items-center gap-3">
      <InputOTP
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={setValue}
        aria-label="Verification code"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-[13px] text-muted-foreground" aria-live="polite">
        {value.length === 4 ? `Code ${value} entered` : "Enter the 4-digit code we sent you."}
      </p>
    </div>
  );
}
