import React from "react";
import { View, Text, ListItem, XStack } from "tamagui";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

import type { IRootState } from "@store";

export default function FilmRollList() {
  let filmRolls = useSelector(
    (state: IRootState) => state.filmRoll.filmRolls
  );

  // sort film rolls by date
  filmRolls.sort((a, b) => {
    if (new Date(a.started) < new Date(b.started)) {
      return 1;
    }
    if (new Date(a.started) > new Date(b.started)) {
      return -1;
    }
    return 0;
  });

  return (
    <View flex={1}>
      <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
        Your Film Rolls
      </Text>

      <FlashList
        data={filmRolls}
        renderItem={({ item }) => {
          if (!item) {
            return null;
          }

          return (
            <Link
              href={{
                pathname: `/view/roll/[id]`,
                params: { id: item.id },
              }}
              asChild
            >
              <ListItem
                size="$4"
                borderRadius="$4"
                marginBottom="$2"
                flexDirection="row"
              >
                <XStack
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Text fontSize="$5" fontWeight="bold">
                    {item.name || item.filmType.name}
                  </Text>
                  <Text fontFamily="$mono" fontWeight="bold">
                    {item.pictures.length} / {item.length}
                  </Text>
                </XStack>
                <Text></Text>
              </ListItem>
            </Link>
          );
        }}
        estimatedItemSize={76}
      />
    </View>
  );
}
