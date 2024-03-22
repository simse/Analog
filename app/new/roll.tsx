import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Button, Input, XStack } from "tamagui";
import { Stack, Link, router } from "expo-router";
import { ChevronRight } from "@tamagui/lucide-icons";

import {
  updateCurrentlyEditingFilmRoll,
  commitCurrentlyEditingFilmRoll,
} from "@features/filmRoll/filmRollSlice";

import type { IRootState } from "@store";

const SelectButton = ({
  selectText,
  href,
  selectedValue,
}: {
  selectText: string;
  href: string;
  selectedValue?: string;
}) => {
  return (
    <Link href={href} asChild>
      <Button
        borderRadius={0}
        backgroundColor="$gray1"
        borderWidth="$0"
        borderBottomWidth={1}
        borderColor="$gray4"
        justifyContent="space-between"
        iconAfter={<ChevronRight size="$1" marginRight="$-2" color="$gray8" />}
        color={selectedValue ? "$white" : "$gray8"}
      >
        {selectedValue || selectText}
      </Button>
    </Link>
  );
};

export default function Page() {
  const [canSave, setCanSave] = useState(false);
  const dispatch = useDispatch();

  const currentFilmRoll = useSelector(
    (state: IRootState) => state.filmRoll.currentlyEditingFilmRoll
  );

  const selectedFilmStock = currentFilmRoll?.filmType;

  const selectedCamera = useSelector((state: IRootState) =>
    state.gear.cameras?.find(
      (camera) => camera.id === currentFilmRoll?.selectedCamera
    )
  );

  const selectedLens = useSelector((state: IRootState) =>
    state.gear.lenses?.find((lens) => lens.id === currentFilmRoll?.selectedLens)
  );

  useEffect(() => {
    if (currentFilmRoll) {
      setCanSave(
        currentFilmRoll.selectedCamera !== undefined &&
          currentFilmRoll.selectedLens !== undefined &&
          currentFilmRoll.filmType !== undefined &&
          currentFilmRoll.length !== undefined
      );
    }
  }, [currentFilmRoll]);

  if (!currentFilmRoll) {
    return null;
  }

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Register Film Roll",
          headerRight: () => {
            return (
              <Button
                disabled={!canSave}
                onTouchStart={() => {
                  // Save film roll
                  dispatch(commitCurrentlyEditingFilmRoll());
                  router.back();
                }}
                backgroundColor="$colorTransparent"
                fontWeight="bold"
                fontSize="$5"
                color={canSave ? "$blue9" : "$gray6"}
              >
                Save
              </Button>
            );
          },
        }}
      />

      <Input
        placeholder="Nickname (optional)"
        value={currentFilmRoll.name}
        autoComplete="off"
        autoCorrect={false}
        borderWidth="$0"
        borderBottomWidth={1}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        onChangeText={(name) => {
          dispatch(
            updateCurrentlyEditingFilmRoll({
              name,
            })
          );
        }}
      />

      <SelectButton
        selectText="Select Camera"
        selectedValue={selectedCamera?.displayName}
        href="/select/camera"
      />

      <SelectButton
        selectText="Select Lens"
        selectedValue={selectedLens?.displayName}
        href="/select/lens"
      />

      <SelectButton
        selectText="Select Film Stock"
        selectedValue={selectedFilmStock?.name}
        href="/select/film"
      />

      <XStack
        backgroundColor="$gray1"
        borderBottomEndRadius="$2"
        borderBottomStartRadius="$2"
        alignItems="center"
        paddingLeft="$3"
      >
        {[24, 36].map((length) => (
          <Button
            key={`length-${length}`}
            backgroundColor={
              currentFilmRoll.length === length ? "$blue8" : "$gray6"
            }
            borderRadius={999}
            size="$2"
            marginRight="$1.5"
            paddingHorizontal="$3"
            fontWeight="bold"
            onPress={() => {
              dispatch(
                updateCurrentlyEditingFilmRoll({
                  length: length,
                })
              );
            }}
          >
            <Text>{length}</Text>
          </Button>
        ))}

        <Input
          placeholder="Custom"
          value={currentFilmRoll.length?.toString() || ""}
          autoComplete="off"
          autoCorrect={false}
          borderWidth="$0"
          onChangeText={(length) => {
            dispatch(
              updateCurrentlyEditingFilmRoll({
                length: parseInt(length),
              })
            );
          }}
        />
      </XStack>

      <Text color="$black9" marginTop={8}>
        {currentFilmRoll.id}
      </Text>
    </View>
  );
}
