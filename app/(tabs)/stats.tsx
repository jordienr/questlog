import { Stack } from "expo-router";

import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Stats" }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/stats.tsx" title="Stats" />
      </Container>
    </>
  );
}
