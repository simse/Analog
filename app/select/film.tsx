import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "tamagui";
import { Stack, Link, router } from "expo-router";

import { updateCurrentlyEditingFilmRoll } from "@features/filmRoll/filmRollSlice";
import type { IRootState } from "@store";
import SearchList from "@components/SearchList";

export default function Page() {
  const filmStocks = useSelector(
    (state: IRootState) => state.filmRoll.filmStocks
  );
  const dispatch = useDispatch();

  const isPresented = router.canGoBack();

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Select Film Stock",
          /*headerLeft: () => (
            <Link
              href={isPresented ? "../" : "/"}
              replace={!isPresented}
              asChild
            >
              <Text fontWeight="bold" fontSize="$5" color="$blue9">
                Dismiss
              </Text>
            </Link>
          ),*/
        }}
      />

      <SearchList
        items={filmStocks}
        searchKeys={["name", "iso"]}
        listItemTitle={(item) => `${item.name}`}
        onSelect={(filmStock) => {
          dispatch(
            updateCurrentlyEditingFilmRoll({
              filmType: filmStock.id,
            })
          );
          router.dismiss();
        }}
      />
    </View>
  );
}
