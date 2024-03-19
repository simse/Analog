import { Stack, useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Button, H1, View } from "tamagui";
import { Trash } from "@tamagui/lucide-icons";
import { Alert } from "react-native";

import { deleteLens } from "@features/gear/gearSlice";
import type { IRootState } from "@store";

export default function Page() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const lens = useSelector((state: IRootState) =>
    (state.gear.lenses || []).find((lens) => lens.id === id)
  );

  const { lensType: lensTypeId } = lens || {};
  const lensType = useSelector((state: IRootState) =>
    state.gear.lensTypes.find((lensType) => lensType.id === lensTypeId)
  );

  if (!lens || !lensType) {
    return null;
  }

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: `${lensType?.make} ${lensType?.model}`,
          headerRight: () => (
            <Button 
              icon={<Trash size="$1" />}
              color="$red9"
              size="$1"
              backgroundColor="$colorTransparent"
              onTouchStart={() => {
                Alert.alert(
                  'Delete Lens',
                  `Do you want remove ${lensType?.make} ${lensType?.model} from your gear?`,
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete', onPress: () => {
                        dispatch(deleteLens(lens.id));
                        router.back();
                      },
                      style: 'destructive'
                    },
                  ]
                );
              }}
            />
          )
        }}
      />

      <H1>Lens {id}</H1>
    </View>
  );
}
