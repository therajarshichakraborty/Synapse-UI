import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertVariants() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>A new version of the CLI is available.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2Icon />
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Your invoice has been paid in full.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Usage at 90%</AlertTitle>
        <AlertDescription>You are close to your monthly build minutes limit.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>
          Type errors were found in 3 files. Check the logs for details.
        </AlertDescription>
      </Alert>
    </div>
  );
}
