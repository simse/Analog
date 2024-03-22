import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid/non-secure";
import { View, Text, Separator, Button, H1, TextArea } from "tamagui";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import type { IRootState } from "@store";
import { HeaderBackButton } from "@components/HeaderBackButton";
import HorizontalSelect from "@components/HorizontalSelect";
import { addPictureToFilmRoll } from "@features/filmRoll/filmRollSlice";
import {
  generateApertures,
  generateShutterSpeeds,
} from "@features/gear/smartValues";

export default function Page() {
  const { filmRollId } = useLocalSearchParams();
  const filmRoll = useSelector((state: IRootState) =>
    state.filmRoll.filmRolls.find((filmRoll) => filmRoll.id === filmRollId)
  );
  const dispatch = useDispatch();

  const lastPicture = filmRoll?.pictures[filmRoll.pictures.length - 1];

  const [canSave, setCanSave] = useState(false);
  const [selectedShutterSpeed, setSelectedShutterSpeed] = useState(
    lastPicture?.shutterSpeed || "1/60"
  );
  const [selectedAperture, setSelectedAperture] = useState(
    lastPicture?.aperture || "f/2.8"
  );
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());

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

  // calculate valid shutter speeds and apertures
  const shutterSpeeds = generateShutterSpeeds(
    filmRoll.selectedCameraType.maxShutterSpeed,
    filmRoll.selectedCameraType.minShutterSpeed
  );
  const apertures = generateApertures(
    filmRoll.selectedLensType.maxAperture,
    filmRoll.selectedLensType.minAperture
  );

  return (
    <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
      <Stack.Screen
        options={{
          title: "Log Picture",
          presentation: "modal",
          headerLeft: () => (
            <HeaderBackButton isPresented={isPresented} text="Cancel" />
          ),
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
                        date: date.toISOString(),
                        notes: notes,
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

      <View marginBottom="$4">
        <H1>Picture {filmRoll.pictures.length + 1}</H1>

        <Text fontSize="$5" fontWeight="bold" color="$gray10">
          {date.toLocaleString()}
        </Text>
      </View>

      <View
        height={150}
        width="100%"
        position="relative"
        borderRadius="$4"
        overflow="hidden"
        backgroundColor="$gray4"
        marginBottom="$4"
      >
        {location && (
          <MapView
            initialRegion={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.005,
            }}
            cacheEnabled={true}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <Marker
              coordinate={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              }}
              title="Picture Location"
            />
          </MapView>
        )}
      </View>

      <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
        Camera Settings
      </Text>
      <View
        borderRadius="$3"
        backgroundColor="$gray2"
        padding="$2"
        marginBottom="$4"
      >
        <HorizontalSelect
          options={shutterSpeeds}
          selectedOption={selectedShutterSpeed}
          onSelect={(option) => setSelectedShutterSpeed(option)}
        />

        <Separator marginBottom="$3" />

        <HorizontalSelect
          options={apertures}
          selectedOption={selectedAperture}
          onSelect={(option) => setSelectedAperture(option)}
        />
      </View>

      <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
        Notes
      </Text>
      <TextArea
        value={notes}
        borderWidth="$0"
        onChangeText={(text) => setNotes(text)}
      />
    </View>
  );
}
