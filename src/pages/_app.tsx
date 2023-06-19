import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../styles/theme";
import {AuthProvider} from "@/contexts/authContext";
import { CarProvider } from "@/contexts/carsContext";


function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {/* <UserContext> */}

        <CarProvider>
          <Component {...pageProps} />
        </CarProvider>
        {/* </UserContext> */}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
