import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import sunny from "../public/sunny.jpg";
import Thunderstorm from "../public/Thunderstorm.jpg";
import rain from "../public/drizzle.jpg";

import { BsSunFill, BsCloudRainFill, BsSnow } from "react-icons/bs";
import { convertTime, weekday } from "../commons";
type Props = {
  weather?: string;
  temperature: number;
  location?: string;
  time?: number;
};
const WeatherForecast = ({ weather, temperature, location, time }: Props) => {
  const dayName = weekday[new Date(time!).getDay() % 7];
  return (
    <Box
      minH={450}
      maxH={700}
      bgColor="primary.f9f8fe"
      w="95%"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundImage={`url(${rain.src})`}
      borderRadius="6px"
      position="relative"
    >
      <Flex
        flexDirection="row"
        position="absolute"
        bottom="10px"
        left="0px"
        w="100%"
        justifyContent="space-between"
      >
        <Box position="absolute" bottom="0px" left="20px">
          <BsSnow color="white" size={55} />

          <Text color="whiteAlpha.800" fontSize="5xl">
            {Math.round(temperature)}
          </Text>
          <Text color="whiteAlpha.800" fontSize="2xl">
            {location}
          </Text>
        </Box>
        <Box position="absolute" bottom="0px" right="20px" textAlign="right">
          <Text color="whiteAlpha.900" fontSize="2xl" width="100%">
            {convertTime(time!).hours}:{convertTime(time!).mins}
          </Text>
          <Text color="whiteAlpha.700" fontSize="2xl">
            {dayName}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default WeatherForecast;
