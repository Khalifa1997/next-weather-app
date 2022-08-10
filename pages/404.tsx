import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import image404 from "../public/404.jpg";
import { useRouter } from "next/router";
const Custom404 = () => {
  const router = useRouter();

  return (
    <Flex
      flexDir="column"
      minHeight="100%"
      justifyContent="center"
      alignItems="center"
      minWidth="100%"
    >
      <Image src={image404} height={900} width={900} alt="404" />
      <Text fontSize="4xl" my="3">
        The Page you requested could not be found.
      </Text>
      <Button size="lg" onClick={() => router.back()}>
        Go back
      </Button>
    </Flex>
  );
};

export default Custom404;
