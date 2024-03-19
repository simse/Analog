import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import { nanoid } from "nanoid/non-secure";
import { View, ListItem, Text, Input } from "tamagui";
import { Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

import { addCamera } from "../../features/gear/gearSlice";
import { IRootState } from "../../store/store";

export default function Page() {
  const [search, setSearch] = useState("");
  const cameraTypes = useSelector(
    (state: IRootState) => state.gear.cameraTypes
  );
  const dispatch = useDispatch();

  // search logic
  const fuse = new Fuse(cameraTypes, {
    keys: ["make", "model"],
  });

  // if there is no search term, show all cameras
  const results =
    search === ""
      ? cameraTypes
      : fuse.search(search).map((result) => result.item);

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Add Camera",
          presentation: "modal",
        }}
      />

      <Input
        placeholder="Search for a camera..."
        borderWidth="$0"
        marginBottom="$4"
        fontSize="$5"
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="none"
      />

      <FlashList
        data={results}
        renderItem={({ item: camera }) => {
          return (
            <ListItem
              size="$4"
              borderRadius="$4"
              flexDirection="column"
              alignItems="flex-start"
              onTouchStart={() => {
                const cameraId = nanoid();
                dispatch(addCamera({
                  id: cameraId,
                  type: camera,
                }));
                router.back();
                router.navigate(`/camera/${cameraId}`);
              }}
            >
              <Text fontSize="$5" fontWeight="bold">
                {camera.make} {camera.model}
              </Text>
              <Text fontSize="$4">
                {camera.type} - {camera.releaseDate}
              </Text>
            </ListItem>
          );
        }}
        estimatedItemSize={90}
      />
    </View>
  );
}
