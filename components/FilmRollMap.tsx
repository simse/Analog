import { View } from "tamagui";
import MapView, { Marker } from "react-native-maps";

import { FilmRoll } from "@types";

interface FilmRollMapProps {
  filmRoll: FilmRoll;
}

export default function FilmRollMap({ filmRoll }: FilmRollMapProps) {
  // find north, south, east, west bounds of pictures in filmRoll
  const bounds = filmRoll.pictures.reduce(
    (bounds, picture) => {
      if (!picture.latitude || !picture.longitude) {
        return bounds;
      }

      return {
        north: Math.max(bounds.north, picture.latitude),
        south: Math.min(bounds.south, picture.latitude),
        east: Math.max(bounds.east, picture.longitude),
        west: Math.min(bounds.west, picture.longitude),
      };
    },
    {
      north: -Infinity,
      south: Infinity,
      east: -Infinity,
      west: Infinity,
    }
  );

  // center map on the middle of the bounds
  const center = {
    latitude: (bounds.north + bounds.south) / 2,
    longitude: (bounds.east + bounds.west) / 2,
  };

  // calculate delta based on the bounds
  const delta = {
    latitude: bounds.north - bounds.south + 0.01,
    longitude: bounds.east - bounds.west + 0.005,
  };

  if (!filmRoll.pictures.length) {
    return null;
  }

  return (
    <View
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
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: delta.latitude,
          longitudeDelta: delta.longitude,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {filmRoll.pictures.map((picture) => {
          if (!picture.latitude || !picture.longitude) {
            return null;
          }

          return (
            <Marker
              key={picture.id}
              coordinate={{
                latitude: picture.latitude,
                longitude: picture.longitude,
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}
