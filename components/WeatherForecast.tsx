import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import sunny from "../public/sunny.jpg";
import Thunderstorm from "../public/Thunderstorm.jpg";
import rain from "../public/drizzle.jpg";

import { BsSunFill, BsCloudRainFill, BsSnow } from "react-icons/bs";
import { convertTime } from "../commons";
interface props {
  weather?: string;
  temperature: number;
  location?: string;
  time?: number;
  day?: string;
}
const WeatherForecast = ({
  weather,
  temperature,
  location,
  time,
  day,
}: props) => {
  const dateNow=new Date();
  
  return (
    <Box
      minH={350}
      maxH={400}
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
            {convertTime(time!).hours}:{convertTime(Math.floor(dateNow / 1000)).mins}
          </Text>
          <Text color="whiteAlpha.700" fontSize="2xl">
            Sunset time, Monday
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default WeatherForecast;
