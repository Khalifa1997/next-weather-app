import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import sunny from "../public/sunny.jpg";
import thunderstorm from "../public/Thunderstorm.jpg";
import rain from "../public/rain.jpg";
import drizzle from "../public/drizzle.jpg";
import snow from "../public/snow.jpg";
import cloud from "../public/cloud.jpg";

import {
  BsSunFill,
  BsSnow,
  BsFillCloudRainHeavyFill,
  BsCloudDrizzleFill,
  BsFillCloudLightningRainFill,
  BsCloudsFill,
} from "react-icons/bs";
import { formatTime, weekday } from "../commons";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
type Props = {
  weather?: string;
  temperature: number;
  location?: string;
  time?: string;
  condition: string;
};
const WeatherForecast = ({
  weather,
  temperature,
  location,
  time,
  condition,
}: Props) => {
  const date = new Date(JSON.parse(time!));
  const dayName = weekday[date.getDay() % 7];
  const hours = formatTime(date.getHours());
  const mins = formatTime(date.getMinutes());
  let src = "";
  let icon: ReactJSXElement;

  if (condition.toLowerCase().includes("rain")) {
    src = rain.src;
    icon = <BsFillCloudRainHeavyFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("drizzle")) {
    src = drizzle.src;
    icon = <BsCloudDrizzleFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("snow")) {
    src = snow.src;
    icon = <BsSnow color="white" size={55} />;
  } else if (
    condition.toLowerCase().includes("sunny") ||
    condition.toLowerCase().includes("clear")
  ) {
    src = sunny.src;
    icon = <BsSunFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("thunderstorm")) {
    src = thunderstorm.src;
    icon = <BsFillCloudLightningRainFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("cloud")) {
    src = cloud.src;
    icon = <BsCloudsFill color="white" size={55} />;
  } else {
    src = cloud.src;
    icon = <BsCloudsFill color="white" size={55} />;
  }
  return (
    <Box
      minH={350}
      maxH={600}
      bgColor="primary.f9f8fe"
      w="95%"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundImage={`url(${src})`}
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
          {icon}

          <Text color="whiteAlpha.800" fontSize="5xl">
            {Math.round(temperature)}
          </Text>
          <Text color="whiteAlpha.800" fontSize="2xl">
            {location}
          </Text>
        </Box>
        <Box position="absolute" bottom="0px" right="20px" textAlign="right">
          <Text color="whiteAlpha.900" fontSize="2xl" width="100%">
            {hours}:{mins}
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
