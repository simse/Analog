import React from 'react';
import { View, Text, ListItem} from 'tamagui';
import { Link, router } from 'expo-router';
import { FlashList } from "@shopify/flash-list";
import { useSelector } from 'react-redux';

import type { IRootState } from '@store';

export default function FilmRollList() {
  const filmRolls = useSelector((state: IRootState) => state.filmRoll.filmRolls);

  return (
    <View flex={1}>
        <FlashList
            data={filmRolls}
            renderItem={({ index, item }) => {
                if (!item) {
                    return null;
                }

                return (
                    <Link href={{
                        pathname: `/roll/[id]`,
                        params: { id: item.id }
                    }} asChild>
                        <ListItem 
                            size="$4"
                            
                        >
                            <Text fontSize="$4">{item.name}</Text>
                        </ListItem>
                    </Link>
                
                );
            }}
            estimatedItemSize={76}
        />
    </View>
  );
}