import React from 'react';
import { View, Text, ListItem, Button, XStack } from 'tamagui';
import { Link, router } from 'expo-router';
import { FlashList } from "@shopify/flash-list";
import { useSelector } from 'react-redux';

import { IRootState } from '@store';

export default function LensList() {
  const ownedLenses = useSelector((state: IRootState) => state.gear.lenses);
  const lensTypes = useSelector((state: IRootState) => state.gear.lensTypes);

  const ownedLensTypes = (ownedLenses || []).map((lens) => {
    return {
        lens,
        lensType: lensTypes.find((lensType) => lensType.id === lens.lensType)
    }
  });

  return (
    <View flex={1}>
        <XStack justifyContent='space-between' alignItems='center' marginBottom="$2">
            <Text
                fontWeight={"bold"}
                fontSize="$7"
                marginBottom="$2"
            >Your Lenses</Text>

            <Button onTouchStart={() => router.push('/new/lens')}>Add Lens</Button>
        </XStack>

        <FlashList
            data={ownedLensTypes}
            renderItem={({ item }) => {
                if (!item) {
                    return null;
                }

                return (
                    <Link href={{
                        pathname: `/lens/[id]`,
                        params: { id: item.lens.id }
                    }} asChild>
                        <ListItem size="$4" borderRadius="$4" marginBottom="$2">
                            <Text fontSize="$4">{item.lensType?.make} {item.lensType?.model}</Text>
                        </ListItem>
                    </Link>
                
                );
            }}
            estimatedItemSize={76}
        />
    </View>
  );
}