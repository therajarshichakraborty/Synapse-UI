import { View } from "react-native";
import { Skeleton, SkeletonText } from "@/components/native/skeleton";

function Row() {
  return (
    <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
      <Skeleton circle={44} />
      <View style={{ flex: 1, gap: 8 }}>
        <Skeleton height={12} width="55%" />
        <Skeleton height={10} width="80%" />
      </View>
    </View>
  );
}

export default function NativeSkeletonDemo() {
  return (
    <View style={{ flex: 1, padding: 20, gap: 22 }}>
      <Skeleton height={190} radius={22} />
      <SkeletonText lines={3} />
      <View style={{ gap: 18, marginTop: 6 }}>
        <Row />
        <Row />
        <Row />
      </View>
    </View>
  );
}
