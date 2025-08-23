import { TextInput, View } from "react-native";
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
      className="flex-row items-center gap-2 border h-14"
      style={{
        borderColor: theme.border,
      }}
    >
      <TextInput
        className="font-silk p-2 min-w-[200px] placeholder:text-gray-500/50"
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
