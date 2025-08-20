import { Stack } from "expo-router";

import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";

export default function Settings() {
  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <Container>
        <ScreenContent
          path="app/(drawer)/(tabs)/settings.tsx"
          title="Settings"
        />
        <ThemeSwitcher />
      </Container>
    </>
  );
}
