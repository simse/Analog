import { View, Button, ScrollView, XStack } from "tamagui";

interface HorizontalSelectProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const HorizontalSelect = ({
  options,
  selectedOption,
  onSelect,
}: HorizontalSelectProps) => {
  return (
    <ScrollView
      maxWidth="100%"
      horizontal
      
    >

      {options.map((option) => (
        <Button
          key={option}
          backgroundColor={selectedOption === option ? "$blue8" : "$gray6"}
          padding="$2"
          borderRadius={999}
          size="$3"
          marginRight="$1.5"
          paddingHorizontal="$3"
          fontWeight="bold"
          onPress={() => onSelect(option)}
        >
          {option}
        </Button>
      ))}

    </ScrollView>
  );
};

export default HorizontalSelect;
