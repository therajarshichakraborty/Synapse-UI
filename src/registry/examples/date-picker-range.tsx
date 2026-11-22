"use client";

import { addDays } from "date-fns";
import { DateRangePicker } from "@/components/ui/date-picker";

export default function DatePickerRange() {
  const today = new Date();
  return <DateRangePicker defaultValue={{ from: today, to: addDays(today, 7) }} />;
}
