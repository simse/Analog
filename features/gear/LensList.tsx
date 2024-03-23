import React from "react";
import { View, Text, ListItem } from "tamagui";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

import { IRootState } from "@store";

export default function LensList() {
  const ownedLenses = useSelector((state: IRootState) => state.gear.lenses);
  const lensTypes = useSelector((state: IRootState) => state.gear.lensTypes);

  const ownedLensTypes = (ownedLenses || []).map((lens) => {
    return {
      lens,
      lensType: lensTypes.find((lensType) => lensType.id === lens.lensType),
    };
  });

  return (
    <View flex={1}>
      <FlashList
        data={ownedLensTypes}
        renderItem={({ item, index }) => {
          if (!item) {
            return null;
          }

          const isLast = index === ownedLensTypes.length - 1;
          const isFirst = index === 0;

          return (
            <Link
              href={{
                pathname: `/lens/[id]`,
                params: { id: item.lens.id },
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
                  {item.lensType?.make} {item.lensType?.model}
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
