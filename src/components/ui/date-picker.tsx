"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** date-fns format string. */
  displayFormat?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
};

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  displayFormat = "PPP",
  disabled,
  className,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue);
  const date = value !== undefined ? value : internal;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          disabled={disabled}
          data-empty={!date}
          className={cn(
            "w-[240px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon />
          {date ? format(date, displayFormat) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(d) => {
            setInternal(d);
            onValueChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

type DateRangePickerProps = {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  numberOfMonths?: number;
  className?: string;
};

function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  numberOfMonths = 2,
  className,
}: DateRangePickerProps) {
  const [internal, setInternal] = React.useState<DateRange | undefined>(defaultValue);
  const range = value !== undefined ? value : internal;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!range?.from}
          className={cn(
            "w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
              </>
            ) : (
              format(range.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          numberOfMonths={numberOfMonths}
          onSelect={(r) => {
            setInternal(r);
            onValueChange?.(r);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker };
export type { DatePickerProps, DateRangePickerProps };
