import { Stack } from "expo-router";

import { Container } from "~/components/Container";
import { Text } from "react-native";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Me" }} />
      <Container>
        <Text>Stats</Text>
      </Container>
    </>
  );
}
