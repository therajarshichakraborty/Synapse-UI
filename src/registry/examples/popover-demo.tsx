import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="mt-3 grid gap-2">
          {[
            ["width", "100%"],
            ["max-width", "300px"],
            ["height", "25px"],
          ].map(([id, value]) => (
            <div key={id} className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={`pop-${id}`} className="capitalize">
                {id.replace("-", " ")}
              </Label>
              <Input id={`pop-${id}`} defaultValue={value} className="col-span-2 h-8" />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
