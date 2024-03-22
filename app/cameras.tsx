import { View, Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { Stack, router } from 'expo-router';
import CameraList from '@features/gear/CameraList';

export default function Page() {
  
  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
        <Stack.Screen
          options={{
            title: 'Your Cameras',
            headerRight: () => (
              <Button 
                icon={<Plus size="$1" />}
                backgroundColor="$colorTransparent"
                onTouchStart={() => router.navigate('/new/camera')}
                padding="$2"
                color="$blue9"
              />
            )
          }}
        />

      <CameraList />
    </View>
  );
}