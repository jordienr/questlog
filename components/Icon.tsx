// Icon.tsx
import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

// Each require() returns a React component (via react-native-svg-transformer)
const ICON_MAP = {
  script: require("../assets/icons/solid-script-text.svg").default,
  chart: require("../assets/icons/solid-chart.svg").default,
  lightbulb: require("../assets/icons/solid-lightbulb.svg").default,
  circle: require("../assets/icons/circle.svg").default,
  bookOpen: require("../assets/icons/solid-book-open.svg").default,
  diamond: require("../assets/icons/diamond.svg").default,
  diamondFilled: require("../assets/icons/diamond-filled.svg").default,
} as const;

type IconName = keyof typeof ICON_MAP;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#000000",
  style,
}) => {
  const SvgImport = ICON_MAP[name];
  const Svg = SvgImport?.default ?? SvgImport;

  if (!Svg) return <View style={[{ width: size, height: size }, style]} />;

  // Pass width/height and fill directly to the component
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} color={color} />
    </View>
  );
};
