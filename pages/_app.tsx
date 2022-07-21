import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Script from "next/script";
const theme = extendTheme({
  colors: {
    primary: {
      100: "#f9f8fe",
      200: "#E7E9FE",
      300: "#D6DAFE",
      400: "#C4CBFE",
      500: "#B2BDFE",
      600: "#A0AEFE",
      700: "#8F9FFE",
      800: "#7D90FE",
      900: "#6B81FE",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
