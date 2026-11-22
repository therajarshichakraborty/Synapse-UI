import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <p className="flex items-center gap-1.5">
        Press
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
        to open the command menu
      </p>
    </div>
  );
}
