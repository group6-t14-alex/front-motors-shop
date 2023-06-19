import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../styles/theme";
import {AuthProvider} from "@/contexts/authContext";
import { CarProvider } from "@/contexts/carsContext";


function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CarProvider>
          <Component {...pageProps} />
        </CarProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
