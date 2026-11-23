import * as React from "react";
import { View } from "react-native";
import { AlertDialog } from "@/components/native/alert-dialog";
import { Button } from "@/components/native/button";
import { toast } from "@/components/native/toast";

export default function NativeAlertDialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Button variant="destructive" leftIcon="trash" onPress={() => setOpen(true)}>
        Delete account
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        destructive
        title="Delete your account?"
        description="All of your projects and files will be permanently removed. This can't be undone."
        confirmLabel="Delete account"
        onConfirm={async () => {
          await new Promise<void>((r) => setTimeout(r, 1200));
          toast("Account deleted");
        }}
      />
    </View>
  );
}
