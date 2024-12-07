import { Stack, useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Button, ScrollView, View, Text } from "tamagui";
import { Plus, Share, Trash } from "@tamagui/lucide-icons";
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import slugify from "slugify";
import { nanoid } from "nanoid/non-secure";

import type { IRootState } from "@store";
import PictureList from "@features/filmRoll/PictureList";
import { clearCurrentlyEditingFilmRoll, deleteFilmRoll, updateCurrentlyEditingFilmRoll } from "@features/filmRoll/filmRollSlice";
import { getActiveSession, startSession } from "@features/session/sessionSlice";
import FilmRollMap from "@components/FilmRollMap";
import ActiveSession from "@features/session/ActiveSession";
import { startSessionActivity } from "@features/session/sessionLiveActivity";

export default function Page() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const filmRoll = useSelector((state: IRootState) =>
    state.filmRoll.filmRolls.find((filmRoll) => filmRoll.id === id)
  );

  const activeSession = useSelector(getActiveSession);
  const rollHasActiveSession = activeSession?.rollId === filmRoll?.id;

  if (!filmRoll) {
    return null;
  }

  const exportFilmRoll = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }

    const fileName = slugify(filmRoll.name || "Film Roll", {
      lower: true,
    }) + '-' + nanoid(4);

    const fileUri = FileSystem.documentDirectory + fileName + '.json';

    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(filmRoll), {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const UTI = 'public.text';

    Sharing.shareAsync(fileUri, {UTI}).catch((error) => {
      console.log(error);
    }).finally(() => {
      FileSystem.deleteAsync(fileUri);
    });
  };

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: filmRoll.name || "Film Roll",
          headerRight: () => (
            <Button
              icon={<Trash size="$1" />}
              color="$red9"
              size="$1"
              backgroundColor="$colorTransparent"
              onTouchStart={() => {
                Alert.alert(
                  "Delete Film Roll",
                  `Do you want delete this film roll?`,
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => {
                        dispatch(deleteFilmRoll(filmRoll.id));
                        router.back();
                      },
                      style: "destructive",
                    },
                  ]
                );
              }}
            />
          ),
        }}
      />

      <Button
        position="absolute"
        bottom={24}
        right={24}
        icon={<Plus size="$1.5" />}
        borderRadius={999}
        height={48}
        width={48}
        zIndex={20}
        backgroundColor="$blue8"
        onTouchStart={() =>
          router.navigate({
            pathname: "/new/picture",
            params: {
              filmRollId: id,
            },
          })
        }
      />

      <ScrollView>
        {!rollHasActiveSession && (
          <Button
            marginBottom="$4"
            onTouchStart={() => {
              dispatch(
                startSession({
                  id: nanoid(),
                  paused: false,
                  rollId: filmRoll.id,
                  started: new Date().toISOString(),
                })
              );

              startSessionActivity(
                filmRoll.name || "Session",
                filmRoll.pictures.length + 1,
                filmRoll.length
              );
            }}
          >
            Start Session™
          </Button>
        )}

        <ActiveSession />

        <FilmRollMap filmRoll={filmRoll} />

        <View
          borderRadius="$4"
          backgroundColor="$gray1"
          marginBottom="$4"
          padding="$3"
        >
          <Text fontSize="$5">Selected Camera</Text>
          <Text fontWeight="bold" fontSize="$5" marginBottom="$3">
            {filmRoll.selectedCameraType.make}{" "}
            {filmRoll.selectedCameraType.model}
          </Text>

          <Text fontSize="$5">Selected Lens</Text>
          <Text
            fontWeight="bold"
            fontSize="$5"
            marginBottom="$1"
            marginRight="$2"
          >
            {filmRoll.selectedLensType.make} {filmRoll.selectedLensType.model}
          </Text>

          <Button
            size="$2"
            borderRadius={999}
            marginBottom="$3"
            fontWeight="bold"
            fontSize="$3"
            width={200}
            onTouchEnd={() => {
              dispatch(clearCurrentlyEditingFilmRoll());
              dispatch(updateCurrentlyEditingFilmRoll(filmRoll));
              router.navigate({
                pathname: "/select/lens",
                params: {
                  commitOnSelect: true
                },
              });
            }}
          >
            Change Lens
          </Button>

          <Text fontSize="$5">Film Stock</Text>
          <Text fontWeight="bold" fontSize="$5">
            {filmRoll.filmType.name}
          </Text>
        </View>

        <PictureList filmRollId={id as string} />

        <Button
          marginBottom="$4"
          borderRadius={999}
          icon={<Share size="$1" />}
          onTouchEnd={exportFilmRoll}
        >
          Export
        </Button>
      </ScrollView>
    </View>
  );
}
