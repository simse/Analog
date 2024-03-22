import { useSelector, useDispatch } from "react-redux";
import { View, Button } from "tamagui";
import { Stack, router } from "expo-router";
import { Plus } from "@tamagui/lucide-icons";

import { updateCurrentlyEditingFilmRoll } from "@features/filmRoll/filmRollSlice";
import type { IRootState } from "@store";
import SearchList from "@components/SearchList";

export default function Page() {
  const cameras = useSelector(
    (state: IRootState) => state.gear.cameras
  );
  const cameraTypes = useSelector(
    (state: IRootState) => state.gear.cameraTypes
  );
  const dispatch = useDispatch();

  if (!cameras || !cameraTypes) {
    return null;
  }

  const camerasWithTypes = cameras.map((camera) => {
    const type = cameraTypes.find((cameraType) => cameraType.id === camera.cameraType);

    if (!type) {
      return null;
    }

    return {
      ...camera,
      cameraType: type,
    };
  }).filter(camera => camera !== null);

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Select Camera",
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

      <SearchList
        items={camerasWithTypes}
        searchKeys={["cameraType.name", "name"]}
        listItemTitle={(item) => `${item?.cameraType.make} ${item?.cameraType.model}`}
        onSelect={(camera) => {
          dispatch(
            updateCurrentlyEditingFilmRoll({
              selectedCamera: camera.id,
              selectedCameraType: camera.cameraType,
            })
          );
          router.dismiss();
        }}
      />
    </View>
  );
}
