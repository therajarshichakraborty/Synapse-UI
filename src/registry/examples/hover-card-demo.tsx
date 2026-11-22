import { CalendarDaysIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm text-muted-foreground">
              The React framework, created and maintained by @vercel.
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDaysIcon className="size-3.5" /> Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
