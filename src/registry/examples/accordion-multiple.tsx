import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    q: "Can I open several sections?",
    a: 'Use type="multiple" and any number of items can be open at once.',
  },
  {
    q: "Can I control it?",
    a: "Pass value and onValueChange to drive the open items from your own state.",
  },
  {
    q: "Can I disable an item?",
    a: "Add the disabled prop to an AccordionItem to make it non-interactive.",
  },
];

export default function AccordionMultiple() {
  return (
    <Accordion type="multiple" defaultValue={["0", "1"]} className="w-full max-w-md">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={String(i)}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
