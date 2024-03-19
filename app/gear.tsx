import { H1, View } from 'tamagui';
import { Stack } from 'expo-router';
import CameraList from '../features/gear/CameraList';

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
    </View>
  );
}