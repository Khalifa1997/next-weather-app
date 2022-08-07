import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
type Props = {
  children?: ReactNode;
  bgColor?: string;
  padding?: number;
};

const InfoContainer = ({ children, bgColor, padding }: Props): JSX.Element => {
  return (
    <Box
      bg={bgColor ? bgColor : "white"}
      border="2px"
      borderColor="gray.400"
      borderRadius="md"
      width="inherit"
      m={4}
    >
      {children}
    </Box>
  );
};

export default InfoContainer;
