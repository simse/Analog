import { Stack, useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Button, View } from "tamagui";
import { Plus, Trash } from "@tamagui/lucide-icons";
import { Alert } from "react-native";

import type { IRootState } from "@store";
import PictureList from "@features/filmRoll/PictureList";
import { deleteFilmRoll } from "@features/filmRoll/filmRollSlice";
import { getActiveSession, startSession } from "@features/session/sessionSlice";
import { nanoid } from "nanoid/non-secure";
import FilmRollMap from "@components/FilmRollMap";
import ActiveSession from "@components/ActiveSession";

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

      {!rollHasActiveSession && <Button
        marginBottom="$4"
        onTouchStart={() => {
          dispatch(startSession({
            id: nanoid(),
            paused: false,
            rollId: filmRoll.id,
            started: new Date().toISOString(),
          }))
        }}
      >
        Start Session™
      </Button>}

      <ActiveSession />

      <FilmRollMap filmRoll={filmRoll} />

      <PictureList filmRollId={id as string} />
    </View>
  );
}
