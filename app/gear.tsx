import { H1, View, YStack } from 'tamagui';
import { Stack } from 'expo-router';
import CameraList from '../features/gear/CameraList';
import LensList from '../features/gear/LensList';

export default function Page() {
  

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
        <Stack.Screen
          options={{
            title: 'Gear',
            // headerTransparent: true,
          }}
        />

      <CameraList />

      <LensList />
    </View>
  );
}