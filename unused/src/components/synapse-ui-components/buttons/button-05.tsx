import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button05Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button05({
  className,
  children = "Glowing Button",
  ...props
}: Button05Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-cyan-500 dark:bg-cyan-600",
        "text-white",
        "hover:bg-cyan-600 dark:hover:bg-cyan-700",
        "rounded-lg",
        "transition-all duration-300",
        "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
        "hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]",
        "overflow-hidden",
        "before:content-['']",
        "before:absolute",
        "before:inset-0",
        "before:bg-white/20",
        "before:opacity-0",
        "hover:before:opacity-100",
        "before:transition-opacity",
        "before:duration-300",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
