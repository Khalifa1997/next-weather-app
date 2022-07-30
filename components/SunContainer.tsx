import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import InfoContainer from "./InfoContainer";
import { BsWind, BsSunrise, BsSunset, BsSun } from "react-icons/bs";

interface Props {
  humidity: number;
  sunset: string;
  UV: number;
  sunrise: string;
}

const SunContainer = ({ humidity, UV, sunrise, sunset }: Props) => {
  return (
    <InfoContainer>
      <Grid
        templateColumns="180px 5px 180px"
        rowGap={3}
        columnGap={4}
        alignItems="center"
        justifyContent="center"
      >
        <GridItem h="10">
          <Flex justify="center">
            <BsWind
              style={{ marginTop: "auto", marginBottom: "auto" }}
              size={40}
              color="#6B81FE"
            />

            <Box ml={2}>
              <Text fontSize="xl">Humidity</Text>
              <Text as="b">{humidity}%</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem rowSpan={2} width={4}>
          <Box
            m="auto"
            height={[50, 100, 200]}
            borderLeft="2px"
            width={3}
            borderColor="gray.400"
          ></Box>
        </GridItem>
        <GridItem h="10">
          <Flex justify="center">
            <BsSunset
              style={{ marginTop: "auto", marginBottom: "auto" }}
              size={40}
              color="#6B81FE"
            />
            <Box ml={2}>
              <Text fontSize="xl">Sunset</Text>
              <Text as="b">7:00PM</Text>
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
            <Box ml={2}>
              <Text fontSize="xl">UV Index</Text>
              <Text as="b">{UV}</Text>
            </Box>
          </Flex>
        </GridItem>

        <GridItem h="10">
          <Flex justify="center">
            <BsSunrise
              style={{ marginTop: "auto", marginBottom: "auto" }}
              size={40}
              color="#6B81FE"
            />
            <Box ml={2}>
              <Text fontSize="xl">Sunrise</Text>
              <Text as="b">6:00AM</Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </InfoContainer>
  );
};

export default SunContainer;
