import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, XStack, Separator, Button } from "tamagui";
import * as Location from "expo-location";
import CircularProgress from "react-native-circular-progress-indicator";
import { nanoid } from "nanoid/non-secure";

import { finishSession, getActiveSession } from "@features/session/sessionSlice";
import { IRootState } from "@store";
import {
  generateApertures,
  generateShutterSpeeds,
} from "@features/gear/smartValues";
import HorizontalSelect from "./HorizontalSelect";
import { addPictureToFilmRoll } from "@features/filmRoll/filmRollSlice";

interface ActiveSessionProps {}

export default function ActiveSession({}: ActiveSessionProps) {
  const activeSession = useSelector(getActiveSession);
  const activeSessionRoll = useSelector((state: IRootState) =>
    state.filmRoll.filmRolls.find(
      (filmRoll) => filmRoll.id === activeSession?.rollId
    )
  );
  const dispatch = useDispatch();

  const [shutterSpeed, setShutterSpeed] = useState("1/60");
  const [aperture, setAperture] = useState("f/2.8");
  const [timeoutCountdown, setTimeoutCountdown] = useState<number | null>(null);
  const [saveButtonText, setSaveButtonText] = useState("Save");

  useEffect(() => {
    if (timeoutCountdown === 0) {
      commitPicture();
      return;
    }

    if (!timeoutCountdown) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeoutCountdown(timeoutCountdown - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeoutCountdown]);

  if (!activeSession || !activeSessionRoll) {
    return null;
  }

  const shutterSpeeds = generateShutterSpeeds(
    activeSessionRoll.selectedCameraType.maxShutterSpeed,
    activeSessionRoll.selectedCameraType.minShutterSpeed
  );

  const apertures = generateApertures(
    activeSessionRoll.selectedLensType.maxAperture,
    activeSessionRoll.selectedLensType.minAperture
  );

  const onChange = () => {
    setTimeoutCountdown(5);
  };

  const commitPicture = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    dispatch(
      addPictureToFilmRoll({
        filmRollId: activeSession.rollId,
        picture: {
          id: nanoid(),
          aperture,
          shutterSpeed,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          date: new Date().toISOString(),
          cameraId: activeSessionRoll.selectedCamera,
          camera: activeSessionRoll.selectedCameraType,
          lensId: activeSessionRoll.selectedLens,
          lens: activeSessionRoll.selectedLensType,
        },
      })
    );

    setSaveButtonText("Saved!");
    setTimeoutCountdown(null);
    setTimeout(() => {
      setSaveButtonText("Save");
    }, 2000);
  };

  return (
    <View
      backgroundColor="$gray1"
      borderRadius="$4"
      marginBottom="$2"
      padding="$3"
    >
      <XStack alignItems="center" marginBottom="$4">
        <CircularProgress
          value={activeSessionRoll.pictures.length + 1}
          maxValue={activeSessionRoll.length}
          activeStrokeWidth={12}
          progressValueColor={"#ecf0f1"}
          inActiveStrokeColor="#000"
          showProgressValue={false}
          radius={24}
        />
        <View marginLeft="$3">
          <Text marginBottom="$1" fontWeight="bold">
            {activeSessionRoll.name || "Current Session"}
          </Text>
          <Text fontWeight="bold" fontSize="$6">
            Picture {activeSessionRoll.pictures.length + 1} out of{" "}
            {activeSessionRoll.length}
          </Text>
        </View>
      </XStack>

      <View>
        <HorizontalSelect
          options={shutterSpeeds}
          selectedOption={shutterSpeed}
          onSelect={(value) => {
            setShutterSpeed(value);
            onChange();
          }}
        />

        <Separator marginVertical="$2" borderWidth="$0" />

        <HorizontalSelect
          options={apertures}
          selectedOption={aperture}
          onSelect={(value) => {
            setAperture(value);
            onChange();
          }}
        />

        <Separator marginVertical="$2" borderWidth="$0" />
      </View>

      <XStack gap="$2">
        <Button
          borderRadius={999}
          fontWeight="bold"
          backgroundColor="$blue8"
          flex={2}
          onTouchEnd={commitPicture}
        >
          {timeoutCountdown ? `Saving in ${timeoutCountdown}` : saveButtonText}
        </Button>

        <Button
          flex={1}
          borderRadius={999}
          onTouchEnd={() => {
            dispatch(finishSession(activeSession.id));
          }}
        >
          End Session
        </Button>
      </XStack>
    </View>
  );
}
