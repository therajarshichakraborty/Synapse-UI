import { BackgroundBeams } from "@/components/animated/background-beams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BackgroundBeamsDemo() {
  return (
    <div className="relative flex h-[26rem] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-background px-6">
      <BackgroundBeams />
      <div className="relative z-10 max-w-md text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Join the waitlist</h2>
        <p className="mt-3 text-sm text-muted-foreground">Be first to try Synapse Pro templates.</p>
        <form className="mt-6 flex gap-2">
          <Input type="email" placeholder="you@company.com" aria-label="Email" />
          <Button type="submit">Join</Button>
        </form>
      </div>
    </div>
  );
}
