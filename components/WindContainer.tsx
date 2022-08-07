import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowUp, BsFillArrowUpCircleFill } from "react-icons/bs";
import InfoContainer from "./InfoContainer";

type Props = {
  windDir: number;
  windSpeed: number;
};
const WindContainer = ({ windDir, windSpeed }: Props) => {
  return (
    <InfoContainer>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight={200}
      >
        <Text mb="5" fontSize="xx-large">
          Wind
        </Text>
        <BsFillArrowUpCircleFill
          color="#7D90FE"
          size={60}
          style={{ transform: `rotate(${-windDir}deg)` }}
        />

        <Text as="i" mt="2">
          {(windSpeed * 3.6).toFixed(1)} Km/h
        </Text>
      </Flex>
    </InfoContainer>
  );
};

export default WindContainer;
