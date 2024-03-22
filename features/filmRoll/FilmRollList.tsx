import React from "react";
import { View, Text, ListItem, XStack, Button } from "tamagui";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

import type { IRootState } from "@store";

interface FilmRollListProps {
  onNewFilmRollClick?: () => void;
}

export default function FilmRollList({
  onNewFilmRollClick,
}: FilmRollListProps) {
  const filmRolls = useSelector((state: IRootState) => state.filmRoll.filmRolls);

  // sort film rolls by date without mutating
  const sortedFilmRolls = [...filmRolls].sort((a, b) => {
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
      {filmRolls.length > 0 ? (
        <FlashList
          data={sortedFilmRolls}
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
      ) : (
        <View
          justifyContent="center"
          alignItems="center"
          minHeight={200}
          width="100%"
          borderRadius="$4"
          backgroundColor="$gray1"
        >
          <Text fontWeight="bold" fontSize="$6" marginBottom="$2">
            No film rolls yet
          </Text>

          {onNewFilmRollClick && (
            <Button
              color="$blue10"
              fontWeight="bold"
              fontSize="$5"
              onTouchStart={() => onNewFilmRollClick()}
            >
              Register Film Roll
            </Button>
          )}
        </View>
      )}
    </View>
  );
}
