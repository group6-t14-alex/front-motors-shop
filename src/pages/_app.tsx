import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../styles/theme";
import { AuthProvider } from "@/contexts/authContext";
import { CarProvider } from "@/contexts/carsContext";
import { UserProvider } from "@/contexts/userContext";
import { CommentProvider } from '@/contexts/commentsContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <CarProvider>
            <CommentProvider>
              <Component {...pageProps} />
            </CommentProvider>
          </CarProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
