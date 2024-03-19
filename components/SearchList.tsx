import { useState } from "react";
import Fuse from "fuse.js";
import { FlashList } from "@shopify/flash-list";
import { Input, ListItem, Text } from "tamagui";

interface SearchListProps<T> {
  items: T[];
  searchKeys: string[];
  onSelect: (item: T) => void;
  listItemTitle: (item: T) => string;
  listItemSubtitle?: (item: T) => string;
}

export default function SearchList<T>({
  items,
  onSelect,
  searchKeys,
  listItemTitle,
  listItemSubtitle,
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
    <>
      <Input
        placeholder="Search for a camera..."
        borderWidth="$0"
        marginBottom="$4"
        fontSize="$5"
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="none"
      />

      <FlashList
        data={results}
        renderItem={({ item }) => {
          return (
            <ListItem
              size="$4"
              borderRadius="$4"
              flexDirection="column"
              alignItems="flex-start"
              onTouchStart={() => onSelect(item)}
            >
              <Text fontSize="$5" fontWeight="bold">
                {listItemTitle(item)}
              </Text>
              {listItemSubtitle && <Text fontSize="$4">
                {listItemSubtitle(item)}
              </Text>}
            </ListItem>
          );
        }}
        estimatedItemSize={90}
      />
    </>
  );
}
