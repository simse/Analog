import { Button, View, Text } from "tamagui";
import { Link, Stack } from "expo-router";
import { useDispatch } from "react-redux";
import { clearSessions } from "@features/session/sessionSlice";
import { clearCameras, clearLenses } from "@features/gear/gearSlice";
import { clearFilmRolls } from "@features/filmRoll/filmRollSlice";

export default function Page() {
  const dispatch = useDispatch();

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />

      <Link href="/cameras" asChild>
        <Button>Cameras</Button>
      </Link>

      <Link href="/lenses" asChild>
        <Button>Lenses</Button>
      </Link>

      <Text fontSize="$5" fontWeight="bold" marginBottom="$2" marginTop="$5">
        Debug
      </Text>

      <Button
        color="$red10"
        fontWeight="bold"
        onTouchStart={() => {
          dispatch(clearCameras());
        }}
      >
        Clear Owned Cameras
      </Button>

      <Button
        color="$red10"
        fontWeight="bold"
        onTouchStart={() => {
          dispatch(clearLenses());
        }}
      >
        Clear Owned Lenses
      </Button>

      <Button
        color="$red10"
        fontWeight="bold"
        onTouchStart={() => {
          dispatch(clearFilmRolls());
        }}
      >
        Clear Film Rolls
      </Button>

      <Button
        color="$red10"
        fontWeight="bold"
        onTouchStart={() => {
          dispatch(clearSessions());
        }}
      >
        Clear Sessions
      </Button>

      <Button
        color="$red10"
        fontWeight="bold"
        onTouchStart={() => {
          dispatch(clearCameras());
          dispatch(clearLenses());
          dispatch(clearFilmRolls());
          dispatch(clearSessions());
        }}
      >
        Clear All Data
      </Button>
    </View>
  );
}
