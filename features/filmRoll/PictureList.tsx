import React from "react";
import { View, Text, ListItem, XStack } from "tamagui";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

import type { IRootState } from "@store";

interface PictureListProps {
  filmRollId: string;
}

export default function PictureList({
  filmRollId,
}: PictureListProps) {
  const filmRoll = useSelector((state: IRootState) =>
    state.filmRoll.filmRolls.find((filmRoll) => filmRoll.id === filmRollId)
  );

  if (!filmRoll) {
    return null;
  }

  return (
    <View flex={1}>
      <FlashList
        data={filmRoll.pictures}
        renderItem={({ index, item }) => {
          if (!item) {
            return null;
          }

          return (
            <Link
              href={{
                pathname: `/view/roll/[id]/picture[pictureId]`,
                params: { id: filmRoll.id, pictureId: item.id},
              }}
              asChild
            >
              <ListItem
                size="$4"
                borderRadius="$4"
                marginBottom="$2"
                flexDirection="row"
              >
                <Text>Picture {index + 1}</Text>
              </ListItem>
            </Link>
          );
        }}
        estimatedItemSize={76}
      />
    </View>
  );
}
