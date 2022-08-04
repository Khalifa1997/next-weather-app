import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import InfoContainer from "./InfoContainer";
import { BsWind, BsSunrise, BsSunset, BsSun } from "react-icons/bs";
import { convertTime } from "../commons";

type Props = {
  humidity: number;
  sunset: number;
  UV: number;
  sunrise: number;
};

const SunContainer = ({ humidity, UV, sunrise, sunset }: Props) => {
  const sunriseTime = convertTime(sunrise);
  const sunsetTime = convertTime(sunset);

  return (
    <InfoContainer>
      <Grid
        templateColumns="180px 5px 180px"
        rowGap={3}
        columnGap={4}
        alignItems="center"
        justifyContent="center"
        minHeight={200}
      >
        <GridItem h="10">
          <Flex justify="center">
            <BsWind
              style={{ marginTop: "auto", marginBottom: "auto" }}
              size={40}
              color="#6B81FE"
            />

            <Box ml={4}>
              <Text fontSize="xl">Humidity</Text>
              <Text as="b">{humidity}%</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem rowSpan={2} width={4}>
          <Box
            m="auto"
            height={[50, 100, 150]}
            borderLeft="1px"
            width={3}
            borderColor="gray.300"
          ></Box>
        </GridItem>
        <GridItem h="10">
          <Flex justify="center">
            <BsSunrise
              style={{ marginTop: "auto", marginBottom: "auto" }}
              size={40}
              color="#6B81FE"
            />
            <Box ml={4}>
              <Text fontSize="xl">Sunrise</Text>
              <Text as="b">
                {sunriseTime.hours}:{sunriseTime.mins}
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem h="10">
          <Flex justify="center">
            <BsSun
              style={{ marginTop: "auto", marginBottom: "auto" }}
              size={40}
              color="#6B81FE"
            />
            <Box ml={4}>
              <Text fontSize="xl">UV Index</Text>
              <Text as="b">{UV.toFixed(2)}</Text>
            </Box>
          </Flex>
        </GridItem>

        <GridItem h="10">
          <Flex justify="center">
            <BsSunset
              style={{ marginTop: "auto", marginBottom: "auto" }}
              size={40}
              color="#6B81FE"
            />
            <Box ml={4}>
              <Text fontSize="xl">Sunset</Text>
              <Text as="b">
                {sunsetTime.hours}:{sunsetTime.mins}
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </InfoContainer>
  );
};

export default SunContainer;
