import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { Dialog } from "@/components/native/dialog";
import { FormField } from "@/components/native/form-field";
import { Input } from "@/components/native/input";
import { toast } from "@/components/native/toast";

export default function NativeDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("Synapse Mobile");
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Button onPress={() => setOpen(true)} leftIcon="edit">
        Rename project
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Rename project"
        description="This name is visible to everyone in your workspace."
        footer={
          <>
            <Button variant="secondary" style={{ flex: 1 }} onPress={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              style={{ flex: 1 }}
              onPress={() => {
                setOpen(false);
                toast.success("Project renamed", { description: name });
              }}
            >
              Save
            </Button>
          </>
        }
      >
        <FormField label="Project name">
          <Input value={name} onChangeText={setName} clearable autoFocus />
        </FormField>
      </Dialog>
    </View>
  );
}
