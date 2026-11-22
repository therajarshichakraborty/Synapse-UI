import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  { id: "INV001", status: "Paid", method: "Credit card", amount: 250 },
  { id: "INV002", status: "Pending", method: "PayPal", amount: 150 },
  { id: "INV003", status: "Unpaid", method: "Bank transfer", amount: 350 },
  { id: "INV004", status: "Paid", method: "Credit card", amount: 450 },
];

const variant = { Paid: "success", Pending: "warning", Unpaid: "destructive" } as const;

export default function TableDemo() {
  const total = invoices.reduce((sum, i) => sum + i.amount, 0);
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border">
      <Table>
        <TableCaption className="pb-4">A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[110px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>
                <Badge variant={variant[inv.status as keyof typeof variant]}>{inv.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{inv.method}</TableCell>
              <TableCell className="text-right tabular-nums">${inv.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right tabular-nums">${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
