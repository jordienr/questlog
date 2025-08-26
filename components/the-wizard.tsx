import { useEffect } from "react";
import { Image, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

export function TheWizard() {
  const glow = useSharedValue(1);

  useEffect(() => {
    // Create a continuous pulsing animation
    glow.value = withRepeat(
      withSequence(
        withTiming(0.3, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        }),
        withTiming(1.0, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        }),
      ),
      -1, // -1 means infinite repetition
      false, // don't reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(glow.value, {
        duration: 500,
        easing: Easing.bezier(0.1, 0.1, 0.1, 1.0),
      }),
    };
  });

  return (
    <Animated.View className="relative overflow-hidden  items-end pt-4">
      <Animated.View
        style={[
          {
            backgroundColor: "#ff8904",
            position: "absolute",
            inset: 0,
          },
          animatedStyle,
        ]}
      />
      <View className="w-4 h-4 bg-blue-300 absolute top-10 left-4 rotate-45" />
      <Image
        source={require("../assets/images/the_wizard.png")}
        className="-mb-2 size-28"
      />
    </Animated.View>
  );
}
