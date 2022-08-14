import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  Divider,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { FormEventHandler, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import bg from "../public/bacakground.png";
import { getSession, signIn, useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { checkValidEmail, checkValidPassword } from "../commons";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(process.env.NEXTAUTH_URL);

  if (session)
    return {
      redirect: {
        destination: "/cairo",
        permanent: false,
      },
    };
  return {
    props: {},
  };
};
const Index = () => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const { data } = useSession();
  const handlePasswordClick = () => {
    setShow((state) => !state);
  };
  const handleLogin: FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setEmailError(!checkValidEmail(email));
    setPasswordError(!checkValidPassword(password));
    if (emailError || passwordError) return;

    const res = await signIn("credentials", {
      email,
      password,
    });
    if (!res?.ok) setSignInError(true);
    else setSignInError(false);
  };
  return (
    <Flex
      height="100vh"
      width="100vw"
      position="relative"
      backgroundColor="#fefefe"
    >
      <Head>
        <title>Home</title>
      </Head>
      <Box
        backgroundImage={`url(${bg.src})`}
        backgroundSize="100% 100%"
        backgroundRepeat="no-repeat"
        width="100%"
        maxWidth="55%"
        display={["none", "none", "block"]}
        height="auto"
      ></Box>
      <Flex
        marginY="auto"
        mr="auto"
        ml={["auto", "auto", "20px"]}
        direction="column"
        backgroundColor="#fefefe"
        mx={[2, 3, 4]}
      >
        <Text textAlign="center" fontSize="4xl">
          Log in
        </Text>
        <Flex direction="column">
          <Text textAlign="left" fontSize="medium" marginY="2">
            Email
          </Text>
          <Input
            borderRadius="20px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={emailError}
            errorBorderColor="crimson"
            type="email"
          />
          <Text textAlign="left" fontSize="medium" marginY="2">
            Password
          </Text>
          <InputGroup>
            <Input
              borderRadius="20px"
              value={password}
              isInvalid={passwordError}
              errorBorderColor="crimson"
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="3.5rem">
              <Button h="1.5rem" size="xs" onClick={handlePasswordClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {signInError && (
            <Text color="#f80404" mt={5}>
              Error, please enter the correct Email and Password
            </Text>
          )}
          <Button
            size="lg"
            mt={signInError ? "20px" : "40px"}
            backgroundColor="#006eb9"
            borderRadius="20px"
            color="#f7fdfb"
            _hover={{ bg: "#1193ec" }}
            _active={{
              bg: "#1193ec",
              transform: "scale(0.95)",
            }}
            _focus={{
              boxShadow:
                "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Flex
            gap={["20px", "20px", "40px"]}
            flexDirection={["column", "row", "row"]}
            justifyContent="center"
            alignItems="center"
            mt="25px"
          >
            <Checkbox ml={["0px", "10px", "20px"]} size="md">
              Keep me logged in
            </Checkbox>
            <Text mr={["0px", "20px", "20px"]} color="#5f9fcf">
              Forgot Password or Email?
            </Text>
          </Flex>
          <Flex align="center">
            <Divider />
            <Text padding="2" width={["350px", "300px"]}>
              Or Login With
            </Text>
            <Divider />
          </Flex>
          <HStack marginX="auto">
            <Button
              variant="outline"
              onClick={() => signIn("google")}
              leftIcon={<BsGoogle />}
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => signIn("github")}
              leftIcon={<BsGithub />}
            >
              Github
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Index;
