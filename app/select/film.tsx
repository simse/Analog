import { useSelector, useDispatch } from "react-redux";
import { View } from "tamagui";
import { Stack, router } from "expo-router";

import { updateCurrentlyEditingFilmRoll } from "@features/filmRoll/filmRollSlice";
import type { IRootState } from "@store";
import SearchList from "@components/SearchList";

export default function Page() {
  const filmStocks = useSelector(
    (state: IRootState) => state.filmRoll.filmStocks
  );
  const dispatch = useDispatch();


  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Select Film Stock",
        }}
      />

      <SearchList
        items={filmStocks}
        searchKeys={["name", "iso"]}
        listItemTitle={(item) => `${item.name}`}
        onSelect={(filmStock) => {
          dispatch(
            updateCurrentlyEditingFilmRoll({
              filmType: filmStock,
            })
          );
          router.dismiss();
        }}
      />
    </View>
  );
}
