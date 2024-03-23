import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid/non-secure";
import { View } from "tamagui";
import { Stack } from "expo-router";
import { router } from "expo-router";

import { addLens } from "@features/gear/gearSlice";
import type { IRootState } from "@store";
import SearchList from "@components/SearchList";
import { HeaderBackButton } from "@components/HeaderBackButton";

export default function Page() {
  const lensTypes = useSelector(
    (state: IRootState) => state.gear.lensTypes
  );
  const dispatch = useDispatch();

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Add Lens",
          presentation: "modal",
          headerLeft: () => <HeaderBackButton isPresented={router.canGoBack()} text="Dismiss" />,
        }}
      />

      <SearchList
        items={lensTypes}
        searchKeys={["make", "model"]}
        listItemTitle={(item) => `${item.make} ${item.model}`}
        listItemSubtitle={(item) => `${item.mount}-mount` || item.type}
        onSelect={(lensType) => {
          const lensId = nanoid();
          dispatch(addLens({
            id: lensId,
            type: lensType,
          }));
          router.back();
        }}
      />
    </View>
  );
}
