import * as React from "react";
import { ScrollView, View } from "react-native";
import { Avatar } from "@/components/native/avatar";
import { IconButton } from "@/components/native/button";
import { Card, CardContent } from "@/components/native/card";
import { ChipGroup } from "@/components/native/chip";
import { ListGroup, ListItem } from "@/components/native/list";
import { NumberTicker } from "@/components/native/number-ticker";
import { Sparkline } from "@/components/native/sparkline";
import { TabBar } from "@/components/native/tab-bar";
import { Text } from "@/components/native/text";
import { toast } from "@/components/native/toast";

export default function NativeShowcase() {
  const [tab, setTab] = React.useState("home");
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 18, gap: 18, paddingBottom: 120 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Avatar
            size={42}
            name="Jamie Rivera"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces"
            status="online"
          />
          <View style={{ flex: 1 }}>
            <Text variant="muted">Good morning</Text>
            <Text variant="large">Jamie Rivera</Text>
          </View>
          <IconButton
            icon="bell"
            accessibilityLabel="Notifications"
            shape="circle"
            onPress={() => toast("No new notifications")}
          />
        </View>

        <Card variant="elevated">
          <CardContent style={{ gap: 4 }}>
            <Text variant="overline">Total balance</Text>
            <NumberTicker value={24812.4} prefix="$" decimals={2} style={{ fontSize: 38 }} />
            <Text variant="small" tone="success">
              + $1,240.20 (5.2%) this month
            </Text>
            <Sparkline
              data={[18, 22, 19, 26, 24, 31, 29, 36, 33, 41, 38, 46]}
              height={70}
              style={{ marginTop: 12, marginHorizontal: -18 }}
            />
          </CardContent>
        </Card>

        <ChipGroup
          scrollable
          defaultValue={["all"]}
          options={[
            { value: "all", label: "All" },
            { value: "income", label: "Income", icon: "arrow-down" },
            { value: "spend", label: "Spending", icon: "arrow-up" },
            { value: "subs", label: "Subscriptions", icon: "refresh-cw" },
          ]}
        />

        <ListGroup header="Recent">
          <ListItem
            title="Spotify"
            subtitle="Subscription · Today"
            icon="music"
            iconColor="#22c55e"
            value="-$11.99"
          />
          <ListItem
            title="Salary"
            subtitle="Acme Inc. · Yesterday"
            icon="wallet"
            iconColor="#3b82f6"
            value="+$4,200"
          />
          <ListItem
            title="Blue Bottle"
            subtitle="Coffee · Mon"
            icon="shopping-bag"
            iconColor="#f59e0b"
            value="-$6.50"
          />
        </ListGroup>
      </ScrollView>
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <TabBar
          value={tab}
          onValueChange={setTab}
          items={[
            { key: "home", label: "Home", icon: "home" },
            { key: "cards", label: "Cards", icon: "credit-card" },
            { key: "stats", label: "Stats", icon: "activity" },
            { key: "me", label: "Me", icon: "user" },
          ]}
        />
      </View>
    </View>
  );
}
