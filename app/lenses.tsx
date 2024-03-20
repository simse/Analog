import { View, Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { Stack, router } from 'expo-router';
import LensList from '@features/gear/LensList';

export default function Page() {
  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
        <Stack.Screen
          options={{
            title: 'Your Lenses',
            headerRight: () => (
              <Button 
                icon={<Plus size="$1" />}
                backgroundColor="$colorTransparent"
                onTouchStart={() => router.navigate('/new/lens')}
                padding="$2"
                color="$blue9"
              />
            )
          }}
        />

      <LensList />
    </View>
  );
}