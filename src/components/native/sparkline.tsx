import * as React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { useTheme } from "@/components/native/theme";

export type SparklineProps = {
  data: number[];
  height?: number;
  color?: string;
  strokeWidth?: number;
  /** Gradient area under the line. */
  fill?: boolean;
  /** Dot on the last point. */
  showEnd?: boolean;
  style?: StyleProp<ViewStyle>;
};

let gid = 0;

/** Smooth path through points using a Catmull-Rom → Bézier conversion. */
function smooth(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export function Sparkline({
  data,
  height = 56,
  color,
  strokeWidth = 2,
  fill = true,
  showEnd = true,
  style,
}: SparklineProps) {
  const { colors } = useTheme();
  const [width, setWidth] = React.useState(0);
  const id = React.useRef(`spark-${++gid}`).current;
  const tint = color ?? colors.brand;

  const pad = strokeWidth + 3;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts: [number, number][] = data.map((v, i) => [
    (i / Math.max(data.length - 1, 1)) * width,
    pad + (1 - (v - min) / span) * (height - pad * 2),
  ]);
  const line = smooth(pts);
  const area = width ? `${line} L ${width} ${height} L 0 ${height} Z` : "";
  const end = pts[pts.length - 1];

  return (
    <View style={[{ height }, style]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {width > 0 && (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={tint} stopOpacity={0.28} />
              <Stop offset="1" stopColor={tint} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          {fill && <Path d={area} fill={`url(#${id})`} />}
          <Path
            d={line}
            stroke={tint}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {showEnd && end && (
            <>
              <Circle
                cx={Math.min(end[0], width - 5)}
                cy={end[1]}
                r={5}
                fill={tint}
                opacity={0.2}
              />
              <Circle cx={Math.min(end[0], width - 5)} cy={end[1]} r={2.75} fill={tint} />
            </>
          )}
        </Svg>
      )}
    </View>
  );
}
