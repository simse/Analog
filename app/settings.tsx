import { Button, View } from 'tamagui';
import { Link, Stack } from 'expo-router';

export default function Page() {
  

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: 'Settings',
        }}
      />

      <Link href="/cameras" asChild>
        <Button>Cameras</Button>
      </Link>

      <Link href="/lenses" asChild>
        <Button>Lenses</Button>
      </Link>
    </View>
  );
}