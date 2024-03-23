import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ListItem } from "tamagui";
import { Link } from "expo-router";

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
    <View flex={1} paddingBottom="$4">
      {filmRoll.pictures.map((picture, index) => (
        <Link
          key={picture.id}
          href={{
            pathname: `/view/roll/[id]/picture/[pictureId]`,
            params: { id: filmRoll.id, pictureId: picture.id},
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
      ))}
    </View>
  );
}
