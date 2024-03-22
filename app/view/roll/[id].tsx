import { Stack, useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Button, Text, View } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";

import type { IRootState } from "@store";
import { FlashList } from "@shopify/flash-list";
import PictureList from "@features/filmRoll/PictureList";

export default function Page() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  
  const filmRoll = useSelector((state: IRootState) =>
    state.filmRoll.filmRolls.find((filmRoll) => filmRoll.id === id)
  );

  if (!filmRoll) {
    return null;
  }

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: filmRoll.name || 'Film Roll',
          /*headerRight: () => (
            <Button 
              icon={<Plus size="$1" />}
              backgroundColor="$colorTransparent"
              
              padding="$2"
              color="$blue9"
            />
          )*/
        }}
      />

      <Button
        position="absolute"
        bottom={24}
        right={24}
        icon={<Plus size="$1.5" />}
        borderRadius={999}
        height={48}
        width={48}
        zIndex={20}
        backgroundColor="$blue8"
        onTouchStart={() => router.navigate({
          pathname: '/new/picture',
          params: {
            filmRollId: id
          }
        })}
      />

      <PictureList filmRollId={id as string} />
    </View>
  );
}
