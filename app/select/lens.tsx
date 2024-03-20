import { useSelector, useDispatch } from "react-redux";
import { View, Button } from "tamagui";
import { Stack, router } from "expo-router";
import { Plus } from "@tamagui/lucide-icons";

import { updateCurrentlyEditingFilmRoll } from "@features/filmRoll/filmRollSlice";
import type { IRootState } from "@store";
import SearchList from "@components/SearchList";

export default function Page() {
  const lenses = useSelector(
    (state: IRootState) => state.gear.lenses
  );
  const dispatch = useDispatch();


  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Select Lens",
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

      <SearchList
        items={lenses || []}
        searchKeys={["displayName"]}
        listItemTitle={(item) => `${item.displayName}`}
        onSelect={(lens) => {
          dispatch(
            updateCurrentlyEditingFilmRoll({
              selectedLens: lens.id,
            })
          );
          router.dismiss();
        }}
      />
    </View>
  );
}
