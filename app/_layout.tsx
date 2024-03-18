import '@tamagui/core/reset.css';
import { TamaguiProvider } from '@tamagui/core';
import { View } from '@tamagui/core';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
    SplashScreen,
    // This example uses a basic Layout component, but you can use any Layout.
    Slot,
  } from 'expo-router';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tamaguiConfig } from '../tamagui.config';
import { useEffect } from 'react';

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
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme || undefined}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <View backgroundColor="$background" flex={1}>
                <SafeAreaView>
                    <StatusBar style="auto" />
                    <Slot />
                </SafeAreaView>
            </View>
        </ThemeProvider>
    </TamaguiProvider>
  );
}
