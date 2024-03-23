import { useState } from "react";
import Fuse from "fuse.js";
import { FlashList } from "@shopify/flash-list";
import { Input, ListItem, Separator, Text, View } from "tamagui";
import { Pressable } from "react-native";

interface SearchListProps<T> {
  items: T[];
  searchKeys: string[];
  onSelect: (item: T) => void;
  listItemTitle: (item: T) => string;
  listItemSubtitle?: (item: T) => string;
  searchPlaceholder?: string;
}

export default function SearchList<T>({
  items,
  onSelect,
  searchKeys,
  listItemTitle,
  listItemSubtitle,
  searchPlaceholder,
}: SearchListProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  // search logic
  const fuse = new Fuse(items, {
    keys: searchKeys,
  });

  // if there is no search term, show all cameras
  const results =
    searchTerm === ""
      ? items
      : fuse.search(searchTerm).map((result) => result.item);

  return (
    <View flex={1} marginBottom="$4">
      <Input
        placeholder={searchPlaceholder || "Search"}
        borderWidth="$0"
        borderBottomWidth="$1"
        marginBottom="$0"
        borderBottomLeftRadius={"$0"}
        borderBottomRightRadius={"$0"}
        fontSize="$5"
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="none"
      />

      <FlashList
        data={results}
        renderItem={({ index, item }) => {
          const isLastItem = index === results.length - 1;

          return (
            <Pressable onPress={() => onSelect(item)}>
              <ListItem
                paddingTop="$3"
                paddingBottom="$3"
                borderBottomWidth={!isLastItem ? "$1" : undefined}
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                borderBottomLeftRadius={isLastItem ? "$4" : undefined}
                borderBottomRightRadius={isLastItem ? "$4" : undefined}
              >
                <Text fontSize="$5" fontWeight="bold">
                  {listItemTitle(item)}
                </Text>
                
                {listItemSubtitle && (
                  <Text fontSize="$2" color="$gray11">
                    {listItemSubtitle(item)}
                  </Text>
                )}
                <Separator />
              </ListItem>
            </Pressable>
          );
        }}
        estimatedItemSize={90}
      />
    </View>
  );
}
