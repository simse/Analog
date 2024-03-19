import '@tamagui/core/reset.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { TamaguiProvider } from '@tamagui/core';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
    SplashScreen,
    Slot,
    Stack
  } from 'expo-router';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';

import { tamaguiConfig } from '../tamagui.config';
import { useEffect } from 'react';
import { persistor, store } from '../store/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'Figtree': require('../assets/fonts/Figtree-Regular.otf'),
    'Figtree-Italic': require('../assets/fonts/Figtree-Italic.otf'),
    'Figtree-Bold': require('../assets/fonts/Figtree-Bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    console.error('Failed to load fonts:', fontError);
    return null;
  }

  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme || undefined}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack>
                      <Stack.Screen name="new/camera" options={{ title: 'Add Camera', presentation: 'modal' }} />
                      <Stack.Screen name="new/lens" options={{ title: 'Add Lens', presentation: 'modal' }} />
                    </Stack>
                </ThemeProvider>
            </TamaguiProvider>
        </PersistGate>
    </Provider>
  );
}
