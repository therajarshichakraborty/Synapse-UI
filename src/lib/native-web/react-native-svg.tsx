/**
 * Docs-only stand-in for `react-native-svg` on the web.
 *
 * The native components in `src/components/native` are written against the real
 * `react-native-svg` API. When the docs render them through react-native-web,
 * next.config.mjs aliases the package to this file, which maps each element to
 * its DOM counterpart. Consumers never ship this file.
 */
import * as React from "react";
import { StyleSheet } from "react-native";

type AnyProps = Record<string, unknown> & { children?: React.ReactNode; style?: unknown };

function clean({ style, ...props }: AnyProps) {
  const out: Record<string, unknown> = { ...props };
  if (style) out.style = StyleSheet.flatten(style as never);
  // react-native-svg accepts numeric strings and `fillOpacity` etc. as-is, the DOM does too.
  delete out.onPress;
  return out;
}

function make<T extends keyof React.JSX.IntrinsicElements>(tag: T, displayName: string) {
  const C = React.forwardRef<Element, AnyProps>(function SvgElement(props, ref) {
    return React.createElement(tag, { ...clean(props), ref });
  });
  C.displayName = displayName;
  return C;
}

const Svg = React.forwardRef<SVGSVGElement, AnyProps>(function Svg(props, ref) {
  const { width, height, ...rest } = clean(props);
  return React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width,
    height,
    ...rest,
    style: { display: "block", flexShrink: 0, ...((rest.style as object) ?? {}) },
    ref,
  });
});
Svg.displayName = "Svg";

export default Svg;
export { Svg };
export const Path = make("path", "Path");
export const Circle = make("circle", "Circle");
export const Rect = make("rect", "Rect");
export const Line = make("line", "Line");
export const Polyline = make("polyline", "Polyline");
export const Polygon = make("polygon", "Polygon");
export const Ellipse = make("ellipse", "Ellipse");
export const G = make("g", "G");
export const Defs = make("defs", "Defs");
export const LinearGradient = make("linearGradient", "LinearGradient");
export const RadialGradient = make("radialGradient", "RadialGradient");
export const Stop = make("stop", "Stop");
export const ClipPath = make("clipPath", "ClipPath");
export const Mask = make("mask", "Mask");
export const Text = make("text", "SvgText");
