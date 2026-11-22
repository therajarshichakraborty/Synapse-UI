"use client";

import * as React from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export default function DatePickerForm() {
  const [date, setDate] = React.useState<Date | undefined>();
  return (
    <div className="grid gap-2">
      <Label htmlFor="dob">Date of birth</Label>
      <DatePicker
        id="dob"
        value={date}
        onValueChange={setDate}
        placeholder="Select your birthday"
      />
      <p className="text-[13px] text-muted-foreground">
        {date ? `Selected ${date.toDateString()}` : "Used to calculate your age."}
      </p>
    </div>
  );
}
