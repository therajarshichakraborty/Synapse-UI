import { AnimatedTooltip } from "@/components/animated/animated-tooltip";

// Placeholder people. Replace with your team.
const people = [
  { id: 1, name: "Alex Placeholder", designation: "Software Engineer" },
  { id: 2, name: "Sam Sample", designation: "Product Manager" },
  { id: 3, name: "Jordan Demo", designation: "Data Scientist" },
  { id: 4, name: "Taylor Test", designation: "UX Designer" },
  { id: 5, name: "Riley Example", designation: "Founder" },
];

export default function AnimatedTooltipDemo() {
  return (
    <div className="flex w-full justify-center pt-16">
      <AnimatedTooltip items={people} />
    </div>
  );
}
