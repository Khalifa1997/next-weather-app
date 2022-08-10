import { Button, Flex } from "@chakra-ui/react";
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
      <Image src={image404} height={900} width={900} />

      <Button size="lg" onClick={() => router.back()}>
        Go back
      </Button>
    </Flex>
  );
};

export default Custom404;
