import { RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <Alert className="max-w-lg">
      <RocketIcon />
      <AlertTitle>Deployment complete</AlertTitle>
      <AlertDescription>
        Your changes are live on production. It may take a minute for caches to update.
      </AlertDescription>
    </Alert>
  );
}
