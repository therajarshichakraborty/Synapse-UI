import { TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  { label: "Monthly revenue", value: "$48,295", delta: "+12.4%" },
  { label: "Active users", value: "12,840", delta: "+4.1%" },
];

export default function CardStats() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardHeader>
            <CardDescription>{s.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">{s.value}</CardTitle>
            <CardAction>
              <Badge variant="success">
                <TrendingUpIcon data-icon="inline-start" />
                {s.delta}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-[13px] text-muted-foreground">
            Compared to last month
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
