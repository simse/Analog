import { useSelector, useDispatch } from "react-redux";
import { View, Button } from "tamagui";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Plus } from "@tamagui/lucide-icons";

import { commitCurrentlyEditingFilmRoll, updateCurrentlyEditingFilmRoll } from "@features/filmRoll/filmRollSlice";
import type { IRootState } from "@store";
import SearchList from "@components/SearchList";

export default function Page() {
  const lenses = useSelector(
    (state: IRootState) => state.gear.lenses
  );
  const lensTypes = useSelector(
    (state: IRootState) => state.gear.lensTypes
  );
  const dispatch = useDispatch();
  const currentlyEditingFilmRoll = useSelector(
    (state: IRootState) => state.filmRoll.currentlyEditingFilmRoll
  );

  const { commitOnSelect } = useLocalSearchParams();
  const commitOnSelectBool = commitOnSelect === "true";

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
        items={(lenses || []).filter(lens => {
          const lensType = lensTypes.find(lensType => lensType.id === lens.lensType);

          if (!lensType) {
            return true;
          }

          return lensType.mount === currentlyEditingFilmRoll?.selectedCameraType?.mount;
        })}
        searchKeys={["displayName"]}
        listItemTitle={(item) => `${item.displayName}`}
        onSelect={(lens) => {
          dispatch(
            updateCurrentlyEditingFilmRoll({
              selectedLens: lens.id,
              selectedLensType: lensTypes.find((lensType) => lensType.id === lens.lensType),
            })
          );
          if (commitOnSelectBool) {
            dispatch(commitCurrentlyEditingFilmRoll());
          }
          router.dismiss();
        }}
      />
    </View>
  );
}
