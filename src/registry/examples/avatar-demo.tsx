import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-6">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback className="bg-primary/15 text-primary">SU</AvatarFallback>
        <AvatarBadge className="bg-success" />
      </Avatar>
    </div>
  );
}
