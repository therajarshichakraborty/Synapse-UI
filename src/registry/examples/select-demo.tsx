import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[220px]" aria-label="Region">
        <SelectValue placeholder="Select a region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="iad1">Washington, D.C. (iad1)</SelectItem>
          <SelectItem value="sfo1">San Francisco (sfo1)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="fra1">Frankfurt (fra1)</SelectItem>
          <SelectItem value="lhr1">London (lhr1)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="bom1">Mumbai (bom1)</SelectItem>
          <SelectItem value="hnd1" disabled>
            Tokyo (hnd1)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
