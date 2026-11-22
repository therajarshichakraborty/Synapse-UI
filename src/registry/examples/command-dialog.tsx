"use client";

import * as React from "react";
import { FileIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open palette
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>J</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Jump to..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => setOpen(false)}>
                <LayoutDashboardIcon /> Dashboard
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <FileIcon /> Documents
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <SettingsIcon /> Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
