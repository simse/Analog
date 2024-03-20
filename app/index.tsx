import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid/non-secure";
import { View, Button, XStack } from "tamagui";
import { Plus, Settings } from "@tamagui/lucide-icons";
import { Stack, router } from "expo-router";

import { loadSystemData as loadGearData } from "@features/gear/gearSlice";
import {
  loadSystemData as loadFilmRollData,
  clearCurrentlyEditingFilmRoll,
  updateCurrentlyEditingFilmRoll,
} from "@features/filmRoll/filmRollSlice";
import { cameraTypes, lensTypes, filmStocks } from "../data";
import FilmRollList from "@features/filmRoll/FilmRollList";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadGearData({
        cameraTypes,
        lensTypes,
      })
    );

    dispatch(
      loadFilmRollData({
        filmStocks,
      })
    );
  }, []);

  return (
    <View paddingLeft="$2" paddingRight="$2" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Analog",
          headerRight: () => (
            <Button
              icon={<Plus size="$1" />}
              backgroundColor="$colorTransparent"
              onTouchStart={() => {
                const rollId = nanoid();

                dispatch(clearCurrentlyEditingFilmRoll());
                dispatch(updateCurrentlyEditingFilmRoll({ id: rollId }));

                router.navigate("/new/roll");
              }}
              padding="$2"
              color="$blue9"
            />
          ),
          headerLeft: () => (
            <Button
              icon={<Settings size="$1" />}
              backgroundColor="$colorTransparent"
              onTouchStart={() => router.navigate("/settings")}
              padding="$2"
              color="$blue9"
            />
          ),
        }}
      />

      <FilmRollList />
    </View>
  );
}
