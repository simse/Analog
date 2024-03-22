import "@tamagui/core/reset.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { TamaguiProvider } from "@tamagui/core";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import { tamaguiConfig } from "../tamagui.config";
import { persistor, store } from "../store/store";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={colorScheme || undefined}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="index" />
              <Stack.Screen
                name="new/camera"
                options={{ title: "Add Camera", presentation: "modal" }}
              />
              <Stack.Screen
                name="new/lens"
                options={{ title: "Add Lens", presentation: "modal" }}
              />
              <Stack.Screen
                name="new/picture"
                options={{ title: "Log Picture", presentation: "modal" }}
              />
            </Stack>
          </ThemeProvider>
        </TamaguiProvider>
      </PersistGate>
    </Provider>
  );
}
