import { View, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

export function TextBubble({ text }: { text: string }) {
  // Split by newlines first, then by characters
  const lines = text.split("\n");
  const characters = lines.flatMap((line, lineIndex) =>
    line.split("").map((char) => ({ char, lineIndex })),
  );

  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);
  const animationRefs = useRef<Animated.Value[]>([]);

  useEffect(() => {
    // Initialize animated values for each character
    const values = characters.map(() => new Animated.Value(0));
    setAnimatedValues(values);
    animationRefs.current = values;

    // Create staggered animation
    const animations = values.map((value, index) =>
      Animated.timing(value, {
        toValue: 1,
        duration: 100, // Duration for each character
        delay: index * 50, // Stagger delay between characters
        useNativeDriver: true,
      }),
    );

    // Start all animations
    Animated.parallel(animations).start();
  }, [text]);

  return (
    <View className="p-2">
      {lines.map((line, lineIndex) => (
        <View key={lineIndex} className="flex flex-row">
          {line.split("").map((char, charIndex) => {
            const globalIndex = characters.findIndex(
              (item) => item.char === char && item.lineIndex === lineIndex,
            );
            return (
              <Animated.Text
                key={`${lineIndex}-${charIndex}`}
                className="text-black text-center font-silk"
                style={{
                  opacity: animatedValues[globalIndex] || 0,
                }}
              >
                {char}
              </Animated.Text>
            );
          })}
        </View>
      ))}
    </View>
  );
}
