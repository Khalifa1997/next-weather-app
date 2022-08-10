import { Text, Flex, Box, Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import accessDenied from "../public/access_denied.jpg";
const unauthorized = () => {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      height="100vh"
      mx={["5", "5", "10"]}
    >
      <Head>
        <title>Unauthorized</title>
      </Head>
      <Box>
        <Text fontSize={["xl", "3xl", "8xl"]} color="primary.900">
          Unauthorized!
        </Text>
        <Text fontSize={["md", "xl", "2xl"]} color="primary.600">
          Looks like you&apos;re trying to access a page you&apos;re not allowed
          to visit
        </Text>
        <Link href="/" passHref>
          <Button
            mt="12"
            borderRadius={10}
            size={["md", "md", "lg"]}
            bgColor="primary.800"
            color="white"
            _hover={{ bgColor: "primary.800" }}
            _active={{
              bg: "primary.800",
              transform: "scale(0.95)",
            }}
          >
            Back to Home
          </Button>
        </Link>
      </Box>
      <Image alt="access denied" src={accessDenied} height="975" width="750" />
    </Flex>
  );
};

export default unauthorized;
