import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ButtonAsChild() {
  return (
    <Button asChild variant="outline">
      <Link href="/docs/installation">Read the docs</Link>
    </Button>
  );
}
