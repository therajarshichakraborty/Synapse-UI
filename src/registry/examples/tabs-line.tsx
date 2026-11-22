import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsLine() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      {["overview", "analytics", "reports"].map((v) => (
        <TabsContent key={v} value={v} className="pt-4 text-sm text-muted-foreground capitalize">
          {v} content goes here.
        </TabsContent>
      ))}
    </Tabs>
  );
}
