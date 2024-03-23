import { Stack, useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Button, H1, View, Text } from "tamagui";
import { Trash } from "@tamagui/lucide-icons";
import { Alert } from "react-native";

import { deleteCamera } from "@features/gear/gearSlice";
import type { IRootState } from "@store";

export default function Page() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const camera = useSelector((state: IRootState) =>
    (state.gear.cameras || []).find((camera) => camera.id === id)
  );

  const { cameraType: cameraTypeId } = camera || {};
  const cameraType = useSelector((state: IRootState) =>
    state.gear.cameraTypes.find((cameraType) => cameraType.id === cameraTypeId)
  );

  if (!camera || !cameraType) {
    return null;
  }

  const attributes = [
    {
      key: "Make",
      value: cameraType.make,
    },
    {
      key: "Model",
      value: cameraType.model,
    },
    {
      key: "Type",
      value: cameraType.type,
    },
    {
      key: "Format",
      value: cameraType.halfFrame ? "Half Frame" : "Full Frame",
    },
    {
      key: "Disposable",
      value: cameraType.disposable ? "Disposable" : "Not Disposable",
    },
    {
      key: "Lens Mount",
      value: cameraType.mount,
    },
    {
      key: "Film Format",
      value: cameraType.filmFormat,
    },
    {
      key: "Max Shutter Speed",
      value: cameraType.maxShutterSpeed,
    },
    {
      key: "Min Shutter Speed",
      value: cameraType.minShutterSpeed,
    },
  ];

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

      <H1 marginBottom="$4">{camera.displayName}</H1>

      <View
        borderRadius="$4"
        backgroundColor="$gray1"
        padding="$3"
        
      >
        {attributes.map((attribute) => (
          <View key={attribute.key} marginBottom="$2">
            <Text fontSize="$5" fontWeight="bold">{attribute.key}</Text>
            <Text fontSize="$5">{attribute.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
