import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid/non-secure";
import { View, Text } from "tamagui";
import { Stack, router } from "expo-router";

import { addCamera } from "@features/gear/gearSlice";
import type { IRootState } from "@store";
import SearchList from "@components/SearchList";
import { HeaderBackButton } from "@components/HeaderBackButton";

export default function Page() {
  const cameraTypes = useSelector(
    (state: IRootState) => state.gear.cameraTypes
  );
  const dispatch = useDispatch();

  // if the current modal is not presented, return to index page
  // this can happen if the app is reloaded while the modal is open
  const isPresented = router.canGoBack();

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Add Camera",
          presentation: "modal",
          headerLeft: () => <HeaderBackButton isPresented={isPresented} text="Dismiss" />,
        }}
      />

      <SearchList
        items={cameraTypes}
        searchKeys={["make", "model"]}
        listItemTitle={(item) => `${item.make} ${item.model}`}
        listItemSubtitle={(item) => `${item.type} - ${item.filmFormat}`}
        onSelect={(cameraType) => {
          const cameraId = nanoid();
          dispatch(addCamera({
            id: cameraId,
            type: cameraType,
          }));
          router.back();
          // router.navigate(`/camera/${cameraId}`);
        }}
      />
    </View>
  );
}
