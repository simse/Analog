import React from 'react';
import { View, Text, ListItem, Button, XStack, Separator } from 'tamagui';
import { Link, router } from 'expo-router';
import { FlashList } from "@shopify/flash-list";
import { useSelector } from 'react-redux';

import type { IRootState } from '@store';

export default function CameraList() {
  const ownedCameras = useSelector((state: IRootState) => state.gear.cameras);
  const cameraTypes = useSelector((state: IRootState) => state.gear.cameraTypes);

  const ownedCameraTypes = (ownedCameras || []).map((camera) => {
    return {
        camera,
        cameraType: cameraTypes.find((cameraType) => cameraType.id === camera.cameraType)
    }
  });

  return (
    <View flex={1}>
        <FlashList
            data={ownedCameraTypes}
            renderItem={({ index, item }) => {
                if (!item) {
                    return null;
                }

                return (
                    <Link href={{
                        pathname: `/camera/[id]`,
                        params: { id: item.camera.id }
                    }} asChild>
                        <ListItem 
                            size="$4"
                            
                        >
                            <Text fontSize="$4">{item.cameraType?.make} {item.cameraType?.model}</Text>
                        </ListItem>
                    </Link>
                
                );
            }}
            estimatedItemSize={76}
        />
    </View>
  );
}