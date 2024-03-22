import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid/non-secure";
import { View, Text, Separator, Button, H1 } from "tamagui";
import { Stack, Link, router, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import type { IRootState } from "@store";
import HorizontalSelect from "@components/HorizontalSelect";
import { addPictureToFilmRoll } from "@features/filmRoll/filmRollSlice";

export default function Page() {
  const { filmRollId } = useLocalSearchParams();
  const filmRoll = useSelector((state: IRootState) =>
    state.filmRoll.filmRolls.find((filmRoll) => filmRoll.id === filmRollId)
  );
  const dispatch = useDispatch();

  const lastPicture = filmRoll?.pictures[filmRoll.pictures.length - 1];

  const [canSave, setCanSave] = useState(false);
  const [selectedShutterSpeed, setSelectedShutterSpeed] = useState(lastPicture?.shutterSpeed || "1/60");
  const [selectedAperture, setSelectedAperture] = useState(lastPicture?.aperture || "f/2.8");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  if (!filmRoll) {
    return null;
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (selectedShutterSpeed && selectedAperture) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [selectedShutterSpeed, selectedAperture]);

  // if the current modal is not presented, return to index page
  // this can happen if the app is reloaded while the modal is open
  const isPresented = router.canGoBack();

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Log Picture",
          presentation: "modal",
          headerLeft: () => {
            if (!isPresented) {
              return (
                <Link href="/" replace asChild>
                  <Text fontWeight="bold" fontSize="$4" color="$blue9">
                    Dismiss
                  </Text>
                </Link>
              );
            }
          },
          headerRight: () => {
            return (
              <Button
                disabled={!canSave}
                onTouchStart={() => {
                  // Save film roll
                  dispatch(
                    addPictureToFilmRoll({
                      filmRollId: filmRollId as string,
                      picture: {
                        id: nanoid(),
                        aperture: selectedAperture,
                        shutterSpeed: selectedShutterSpeed,
                        camera: filmRoll.selectedCameraType,
                        cameraId: filmRoll.selectedCamera,
                        lens: filmRoll.selectedLensType,
                        lensId: filmRoll.selectedLens,
                        date: new Date().toISOString(),
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                      },
                    })
                  );
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

      <H1 marginBottom="$4">Picture {filmRoll.pictures.length + 1}</H1>

      <View
        height={150}
        width="100%"
        position="relative"
        borderRadius="$4"
        overflow="hidden"
        backgroundColor="$gray4"
        marginBottom="$4"
      >
        {location && <MapView
          initialRegion={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005,
          }}
          
          cacheEnabled={true}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Marker
            coordinate={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            }}
            title="Picture Location"
          />
        </MapView>}
      </View>

      <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
        Camera Settings
      </Text>
      <View borderRadius="$3" backgroundColor="$gray2" padding="$2">
        <HorizontalSelect
          options={[
            "1",
            "1/2",
            "1/4",
            "1/8",
            "1/15",
            "1/30",
            "1/60",
            "1/125",
            "1/250",
            "1/500",
            "1/1000",
          ]}
          selectedOption={selectedShutterSpeed}
          setSelectedOption={(option) => setSelectedShutterSpeed(option)}
        />

        <Separator marginBottom="$3" />

        <HorizontalSelect
          options={[
            "f/1.4",
            "f/2",
            "f/2.8",
            "f/4",
            "f/5.6",
            "f/8",
            "f/11",
            "f/16",
            "f/22",
          ]}
          selectedOption={selectedAperture}
          setSelectedOption={(option) => setSelectedAperture(option)}
        />

        <Separator />
      </View>
    </View>
  );
}
