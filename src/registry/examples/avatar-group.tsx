import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

const people = ["shadcn", "vercel", "nextjs", "tailwindlabs"];

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      {people.map((p) => (
        <Avatar key={p}>
          <AvatarImage src={`https://github.com/${p}.png`} alt={p} />
          <AvatarFallback>{p.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+8</AvatarGroupCount>
    </AvatarGroup>
  );
}
