import * as React from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { PageIndicator } from "@/components/native/page-indicator";

export type CarouselProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Item width as a fraction of the container, < 1 to peek at neighbours. */
  itemWidth?: number;
  gap?: number;
  /** Scale down items that are not centered. */
  scaleInactive?: boolean;
  showIndicator?: boolean;
  onIndexChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
};

export function Carousel<T>({
  data,
  renderItem,
  itemWidth = 0.84,
  gap = 12,
  scaleInactive = true,
  showIndicator = true,
  onIndexChange,
  style,
}: CarouselProps<T>) {
  const [width, setWidth] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<ScrollView>(null);
  const index = React.useRef(0);

  const item = width * itemWidth;
  const snap = item + gap;
  const inset = (width - item) / 2;
  const page = React.useMemo(() => Animated.divide(scrollX, snap || 1), [scrollX, snap]);

  return (
    <View style={style} onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}>
      {width > 0 && (
        <Animated.ScrollView
          ref={ref as never}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={snap}
          snapToAlignment="start"
          disableIntervalMomentum
          contentContainerStyle={{ paddingHorizontal: inset, gap }}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
            listener: (e: { nativeEvent: { contentOffset: { x: number } } }) => {
              const i = Math.round(e.nativeEvent.contentOffset.x / snap);
              if (i !== index.current && i >= 0 && i < data.length) {
                index.current = i;
                onIndexChange?.(i);
              }
            },
          })}
        >
          {data.map((d, i) => {
            const range = [(i - 1) * snap, i * snap, (i + 1) * snap];
            return (
              <Animated.View
                key={i}
                style={{
                  width: item,
                  transform: scaleInactive
                    ? [
                        {
                          scale: scrollX.interpolate({
                            inputRange: range,
                            outputRange: [0.92, 1, 0.92],
                            extrapolate: "clamp",
                          }),
                        },
                      ]
                    : undefined,
                  opacity: scaleInactive
                    ? scrollX.interpolate({
                        inputRange: range,
                        outputRange: [0.7, 1, 0.7],
                        extrapolate: "clamp",
                      })
                    : 1,
                }}
              >
                {renderItem(d, i)}
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      )}
      {showIndicator && data.length > 1 && (
        <PageIndicator
          count={data.length}
          progress={page}
          onPress={(i) => ref.current?.scrollTo({ x: i * snap, animated: true })}
          style={styles.indicator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: { marginTop: 16 },
});
