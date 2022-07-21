import { Box } from "@chakra-ui/react";
import { suggestion } from "./NavBar";

interface Props {
  items: Array<suggestion>;
  onSelect: Function;
}
const InputSuggestions = ({ items, onSelect }: Props) => {
  return (
    <Box
      position="absolute"
      left="0px"
      top="100%"
      bg="#fff"
      zIndex="tooltip"
      w="90%"
    >
      {items.map((element, index) => (
        <Box
          border="1px"
          bg="white"
          borderColor="#d4d4d4"
          key={index}
          p={2}
          cursor="pointer"
          _hover={{
            background: "gray.100",
          }}
          onClick={() => onSelect(element.id)}
        >
          {element.displayName}
        </Box>
      ))}
    </Box>
  );
};

export default InputSuggestions;
