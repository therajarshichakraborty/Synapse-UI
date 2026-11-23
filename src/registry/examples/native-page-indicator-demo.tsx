import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/native/button";
import { Icon, type IconName } from "@/components/native/icon";
import { PageIndicator } from "@/components/native/page-indicator";
import { Text } from "@/components/native/text";
import { useTheme } from "@/components/native/theme";

const pages: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "sparkles",
    title: "Meet your new workspace",
    body: "Everything your team needs, in one beautiful app.",
  },
  {
    icon: "zap",
    title: "Move faster",
    body: "Shortcuts, automations and AI that does the busywork.",
  },
  {
    icon: "shield-check",
    title: "Private by design",
    body: "End-to-end encryption on every plan.",
  },
];

export default function NativePageIndicatorDemo() {
  const { colors } = useTheme();
  const [page, setPage] = React.useState(0);
  const p = pages[page];
  return (
    <View style={{ flex: 1, padding: 28, justifyContent: "center", alignItems: "center", gap: 22 }}>
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 36,
          backgroundColor: colors.brandSoft,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={p.icon} size={52} color={colors.brand} strokeWidth={1.75} />
      </View>
      <Text variant="h2" align="center">
        {p.title}
      </Text>
      <Text variant="lead" align="center">
        {p.body}
      </Text>
      <PageIndicator
        count={pages.length}
        progress={page}
        onPress={setPage}
        style={{ marginVertical: 12 }}
      />
      <Button
        block
        size="lg"
        style={{ alignSelf: "stretch" }}
        onPress={() => setPage((i) => (i + 1) % pages.length)}
      >
        {page === pages.length - 1 ? "Get started" : "Next"}
      </Button>
    </View>
  );
}
