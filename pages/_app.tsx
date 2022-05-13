import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ReservationProvider from "context/reservations-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ReservationProvider>
        <Component {...pageProps} />
      </ReservationProvider>
    </ChakraProvider>
  );
}

export default MyApp;
