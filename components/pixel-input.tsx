import { Text, TextInput, View } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export function PixelInput({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  const theme = useThemeColors();

  return (
    <View
      className="flex-row items-center gap-2 border-2 border-dashed h-14"
      style={{
        borderColor: theme.accent,
      }}
    >
      <Text
        className="text-center font-silk text-sm px-2 opacity-50"
        style={{
          color: theme.primary,
        }}
      >
        {">"}
      </Text>
      <TextInput
        className="font-silk p-2 min-w-[200px]"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={{
          color: theme.primary,
        }}
      />
    </View>
  );
}
