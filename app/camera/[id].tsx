import { Stack, useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Button, H1, View } from "tamagui";
import { Trash } from "@tamagui/lucide-icons";
import { Alert } from "react-native";

import { deleteCamera } from "../../features/gear/gearSlice";
import { IRootState } from "../../store/store";

export default function Page() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const camera = useSelector((state: IRootState) =>
    state.gear.cameras.find((camera) => camera.id === id)
  );

  const { cameraType: cameraTypeId } = camera || {};
  const cameraType = useSelector((state: IRootState) =>
    state.gear.cameraTypes.find((cameraType) => cameraType.id === cameraTypeId)
  );

  if (!camera || !cameraType) {
    return null;
  }

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: `${cameraType?.make} ${cameraType?.model}`,
          headerRight: () => (
            <Button 
              icon={<Trash size="$1" />}
              color="$red9"
              size="$1"
              backgroundColor="$colorTransparent"
              onTouchStart={() => {
                Alert.alert(
                  'Delete Camera',
                  `Do you want remove ${cameraType?.make} ${cameraType?.model} from your gear?`,
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete', onPress: () => {
                        dispatch(deleteCamera(camera.id));
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

      <H1>Camera {id}</H1>
    </View>
  );
}
