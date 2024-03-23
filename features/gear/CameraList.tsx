import React from "react";
import { View, Text, ListItem } from "tamagui";
import { Link, router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

import type { IRootState } from "@store";

export default function CameraList() {
  const ownedCameras = useSelector((state: IRootState) => state.gear.cameras);
  const cameraTypes = useSelector(
    (state: IRootState) => state.gear.cameraTypes
  );

  const ownedCameraTypes = (ownedCameras || []).map((camera) => {
    return {
      camera,
      cameraType: cameraTypes.find(
        (cameraType) => cameraType.id === camera.cameraType
      ),
    };
  });

  return (
    <View flex={1}>
      <FlashList
        data={ownedCameraTypes}
        renderItem={({ index, item }) => {
          if (!item) {
            return null;
          }

          const isLast = index === ownedCameraTypes.length - 1;
          const isFirst = index === 0;

          return (
            <Link
              href={{
                pathname: `/camera/[id]`,
                params: { id: item.camera.id },
              }}
              asChild
            >
              <ListItem 
                size="$4"
                borderTopLeftRadius={isFirst ? "$4" : "$0"}
                borderTopRightRadius={isFirst ? "$4" : "$0"}
                borderBottomLeftRadius={isLast ? "$4" : "$0"}
                borderBottomRightRadius={isLast ? "$4" : "$0"}
              >
                <Text fontSize="$5" fontWeight="bold">
                  {item.cameraType?.make} {item.cameraType?.model}
                </Text>
              </ListItem>
            </Link>
          );
        }}
        estimatedItemSize={76}
      />
    </View>
  );
}
