import { ScrollView, View } from "react-native";
import { Icon, iconNames } from "@/components/native/icon";
import { Text } from "@/components/native/text";
import { useTheme } from "@/components/native/theme";

export default function NativeIconDemo() {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
      <Text variant="h3">{iconNames.length} icons</Text>
      <Text variant="muted">Lucide geometry, drawn with react-native-svg.</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {iconNames.map((name) => (
          <View
            key={name}
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              backgroundColor: colors.muted,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={name} size={20} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
