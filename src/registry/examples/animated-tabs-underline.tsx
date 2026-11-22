"use client";

import * as React from "react";
import { AnimatedTabs } from "@/components/animated/animated-tabs";

export default function AnimatedTabsUnderline() {
  const [tab, setTab] = React.useState("overview");
  return (
    <div className="w-full max-w-md">
      <AnimatedTabs
        variant="underline"
        value={tab}
        onValueChange={setTab}
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "activity", label: "Activity" },
          { value: "settings", label: "Settings" },
        ]}
      />
      <p className="mt-4 text-sm text-muted-foreground">
        Active tab: <span className="font-medium text-foreground">{tab}</span>
      </p>
    </div>
  );
}
