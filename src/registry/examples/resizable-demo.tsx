import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[220px] max-w-lg rounded-xl border border-border"
    >
      <ResizablePanel defaultSize="40%">
        <div className="flex h-full items-center justify-center p-6 text-sm font-medium">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="60%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="50%">
            <div className="flex h-full items-center justify-center p-6 text-sm font-medium">
              Editor
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50%">
            <div className="flex h-full items-center justify-center p-6 text-sm font-medium">
              Terminal
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
