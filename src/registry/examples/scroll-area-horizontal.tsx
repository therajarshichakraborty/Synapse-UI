import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const gradients = [
  "from-cyan-400 to-blue-600",
  "from-blue-500 to-indigo-600",
  "from-indigo-500 to-violet-600",
  "from-sky-400 to-cyan-600",
  "from-blue-400 to-blue-800",
  "from-teal-400 to-sky-600",
];

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-full max-w-md rounded-xl border border-border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {gradients.map((g, i) => (
          <figure key={g} className="shrink-0">
            <div className={`h-36 w-28 rounded-lg bg-gradient-to-br ${g}`} />
            <figcaption className="pt-2 text-xs text-muted-foreground">Artwork {i + 1}</figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
