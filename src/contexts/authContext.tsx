import {UserRequest, LoginData} from "@/schemas/user.schema";
import {api} from "@/services/api";
import {useRouter} from "next/router";
import {createContext, ReactNode, useContext, useState} from "react";
import {useToast} from "@chakra-ui/toast";
import jwt_decode from "jwt-decode"
import { UserInterface } from "@/interfaces/user.interface";
import { setCookie } from "nookies";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerUser: (userData: UserRequest) => void;
  loginUser: (loginData: LoginData) => void;
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
  // setToken: (value: string) => void;
  // token: string | undefined;
}

export const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<UserInterface | null>(null)

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

  
  const loginUser = async (loginData: LoginData) => {

    try {
      const response = await api.post("/login", loginData);      
      const token: any = jwt_decode(response.data.token);
      const user = await api.get(`/user/${token.sub}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      });
      setCookie(null, "@MotorsShop", response.data.token, {
        maxAge: 60 * 60 * 1,
        path: "/"
      });
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "usuário logado com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      router.push("/profile");      
      setUser(user.data)
    } catch (error) {
      console.log(error)
      toast({
        position: "top-right",
        title: "Erro",
        description: "Falha no login!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }

    // api
    //   .post("/login", loginData)
    //   .then((response) => {
    //     setCookie(null, "@MotorsShop", response.data.token, {
    //       maxAge: 60 * 60 * 1,
    //       path: "/"
    //     });
    //     setUser(response.data.user)
    //     console.log(response)
    //     console.log(response.data.user)

    //   })
    //   .then(() => {
    //     toast({
    //       position: "top-right",
    //       title: "Sucesso",
    //       description: "usuário logado com sucesso!",
    //       status: "success",
    //       duration: 6000,
    //       isClosable: true,
    //     });
    //     router.push("/profile");
    //   })
    //   .catch((err) => {
    //     console.log(err);      
    //     toast({
    //       position: "top-right",
    //       title: "Erro",
    //       description: "Falha no login!",
    //       status: "error",
    //       duration: 6000,
    //       isClosable: true,
    //     });
    //   });   
  };

  return <AuthContext.Provider value={{ registerUser, loginUser, user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
