import { CheckIcon } from "lucide-react";
import { CardSpotlight } from "@/components/animated/card-spotlight";

export default function CardSpotlightDemo() {
  return (
    <CardSpotlight className="w-full max-w-sm">
      <h3 className="text-lg font-semibold tracking-tight">Authentication steps</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {[
          "Enter your email address",
          "Create a strong password",
          "Set up two-factor authentication",
          "Verify your identity",
        ].map((s) => (
          <li key={s} className="flex items-center gap-2">
            <CheckIcon className="size-4 text-primary" /> {s}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">Move your cursor over the card.</p>
    </CardSpotlight>
  );
}
