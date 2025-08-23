import { View, Text, Image } from "react-native";

export function TheWizard() {
  return (
    <View className="items-center justify-center bg-white">
      <Image
        source={require("../assets/images/the_wizard.png")}
        style={{ width: 100, height: 100 }}
        className="w-24 h-24"
      />
      <Text className="text-center text-sm font-jac text-2xl">The Wizard</Text>
    </View>
  );
}
