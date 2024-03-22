import { Link } from "expo-router";
import { Text } from "tamagui";

interface HeaderBackButtonProps {
  isPresented: boolean;
  text: string;
}

export const HeaderBackButton = ({
  isPresented,
  text,
}: HeaderBackButtonProps) => {
  if (!isPresented) {
    return (
      <Link href="/" replace asChild>
        <Text fontWeight="bold" fontSize="$5" color="$blue9">
          {text}
        </Text>
      </Link>
    );
  } else {
    return (
      <Link href="../" asChild>
        <Text fontWeight="bold" fontSize="$5" color="$blue9">
          {text}
        </Text>
      </Link>
    );
  }
};
