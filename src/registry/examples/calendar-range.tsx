"use client";

import * as React from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const from = new Date();
    return { from, to: addDays(from, 6) };
  });
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-xl border border-border shadow-sm"
    />
  );
}
