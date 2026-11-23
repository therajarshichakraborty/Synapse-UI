import { View } from "react-native";
import { Badge } from "@/components/native/badge";
import { ListGroup, ListItem } from "@/components/native/list";
import { Sparkline } from "@/components/native/sparkline";
import { Text } from "@/components/native/text";

const stocks = [
  { sym: "AAPL", name: "Apple", price: "$214.30", d: 1.8, data: [10, 12, 11, 14, 13, 16, 18] },
  { sym: "NVDA", name: "NVIDIA", price: "$131.02", d: 3.4, data: [8, 9, 12, 11, 15, 17, 20] },
  { sym: "TSLA", name: "Tesla", price: "$182.47", d: -2.1, data: [20, 18, 19, 15, 16, 13, 12] },
];

export default function NativeSparklineDemo() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 20 }}>
      <View style={{ paddingHorizontal: 4, gap: 4 }}>
        <Text variant="overline">Portfolio</Text>
        <Text variant="h1">$24,812</Text>
      </View>
      <Sparkline
        data={[18, 22, 19, 26, 24, 31, 29, 36, 33, 41, 38, 46]}
        height={120}
        strokeWidth={2.5}
      />
      <ListGroup header="Watchlist">
        {stocks.map((s) => (
          <ListItem
            key={s.sym}
            title={s.sym}
            subtitle={s.name}
            trailing={
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Sparkline
                  data={s.data}
                  height={30}
                  fill={false}
                  showEnd={false}
                  color={s.d > 0 ? "#16a34a" : "#dc2626"}
                  style={{ width: 64 }}
                />
                <View style={{ alignItems: "flex-end", gap: 3 }}>
                  <Text variant="small">{s.price}</Text>
                  <Badge size="sm" tone={s.d > 0 ? "success" : "destructive"}>
                    {`${s.d > 0 ? "+" : ""}${s.d}%`}
                  </Badge>
                </View>
              </View>
            }
          />
        ))}
      </ListGroup>
    </View>
  );
}
