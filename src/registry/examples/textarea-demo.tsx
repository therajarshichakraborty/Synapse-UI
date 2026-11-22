import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="feedback">Feedback</Label>
      <Textarea
        id="feedback"
        placeholder="Tell us what you think..."
        aria-describedby="feedback-hint"
      />
      <p id="feedback-hint" className="text-[13px] text-muted-foreground">
        Your feedback is shared with the team.
      </p>
    </div>
  );
}
