import React from 'react';
import { View, Text, ListItem, Button, XStack } from 'tamagui';
import { Link, router } from 'expo-router';
import { FlashList } from "@shopify/flash-list";
import { useSelector } from 'react-redux';

import { IRootState } from '../../store/store';

export default function CameraList() {
  const ownedCameras = useSelector((state: IRootState) => state.gear.cameras);
  const cameraTypes = useSelector((state: IRootState) => state.gear.cameraTypes);

  const ownedCameraTypes = ownedCameras.map((camera) => {
    return {
        camera,
        cameraType: cameraTypes.find((cameraType) => cameraType.id === camera.cameraType)
    }
  });

  return (
    <View flex={1}>
        <XStack justifyContent='space-between' alignItems='center' marginBottom="$2">
            <Text
                fontWeight={"bold"}
                fontSize="$7"
                marginBottom="$2"
            >Your Cameras</Text>

            <Button onTouchStart={() => router.push('/new/camera')}>Add Camera</Button>
        </XStack>

        <FlashList
            data={ownedCameraTypes}
            renderItem={({ item }) => {
                if (!item) {
                    return null;
                }

                return (
                    <Link href={{
                        pathname: `/camera/[id]`,
                        params: { id: item.camera.id }
                    }} asChild>
                        <ListItem size="$4" borderRadius="$4" marginBottom="$2">
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