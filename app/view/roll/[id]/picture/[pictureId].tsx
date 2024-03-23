import { H1, View, Text, ScrollView } from "tamagui";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

import { getPicture } from "@features/filmRoll/filmRollSlice";
import { IRootState } from "@store";

const ViewPicturePage = () => {
  const { id: filmRollId, pictureId } = useLocalSearchParams();
  if (!filmRollId || !pictureId) {
    return null;
  }

  const filmRoll = useSelector((state: IRootState) =>
    state.filmRoll.filmRolls.find((filmRoll) => filmRoll.id === filmRollId)
  );

  const picture = useSelector((state: IRootState) =>
    getPicture(state, filmRollId as string, pictureId as string)
  );

  // figure out index of picture in filmRoll
  const pictureIndex = (filmRoll?.pictures.findIndex(
    (picture) => picture.id === pictureId
  ) || 0) + 1;

  return (
    <ScrollView>
      <View paddingLeft="$4" paddingRight="$4" paddingTop="$4" flex={1}>
        <Stack.Screen
          options={{
            title: `Picture ${pictureIndex}`,
          }}
        />

        <H1 marginBottom="$2">Picture {pictureIndex}</H1>

        {picture?.latitude && picture.longitude && <View
          height={250}
          width="100%"
          position="relative"
          borderRadius="$4"
          overflow="hidden"
          backgroundColor="$gray4"
          marginBottom="$4"
        >
          <MapView
            initialRegion={{
              latitude: picture?.latitude,
              longitude: picture?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.005,
            }}
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
                latitude: picture?.latitude,
                longitude: picture?.longitude,
              }}
            />
          </MapView>
        </View>}

        <View marginBottom="$4">
          <Text fontSize="$6" fontWeight="bold" marginBottom="$2">Aperture</Text>
          <Text fontSize="$5">{picture?.aperture}</Text>
        </View>

        <View marginBottom="$4">
          <Text fontSize="$6" fontWeight="bold" marginBottom="$2">Shutter Speed</Text>
          <Text fontSize="$5">{picture?.shutterSpeed}</Text>
        </View>

        <View>
          <Text fontSize="$6" fontWeight="bold" marginBottom="$2">Film Stock</Text>
          <Text fontSize="$5">{filmRoll?.filmType.name}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewPicturePage;
