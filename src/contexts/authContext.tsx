import {UserRequest} from "@/schemas/user.schema";
import {api} from "@/services/api";
import {useRouter} from "next/router";
import {createContext, ReactNode, useContext} from "react";
import {useToast} from "@chakra-ui/toast";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerUser: (userData: UserRequest) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const toast = useToast();

  const registerUser = (userRequest: UserRequest) => {
    api
      .post("/user", userRequest)
      .then(() => {
        toast({
          position: "top-right",
          title: "Sucesso",
          description: "usuário cadastrado com sucesso!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "top-right",
          title: "Erro",
          description: "Erro ao criar usuário, tente utilizar outro e-mail!",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };
  return <AuthContext.Provider value={{ registerUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
