import {UserRequest, LoginData} from "@/schemas/user.schema";
import {api} from "@/services/api";
import {useRouter} from "next/router";
import {createContext, ReactNode, useContext, useState} from "react";
import {useToast} from "@chakra-ui/toast";
import jwt_decode from "jwt-decode"
import { iUserData } from "./profileContext";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerUser: (userData: UserRequest) => void;
  loginUser: (loginData: LoginData) => void;
  user: iUserData | null;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<iUserData | null>(null)

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
      localStorage.setItem("motorsShop", response.data.token);
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "usuário logado com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      router.push("/profile");
      console.log(user.data)
      setUser(user.data)
    } catch (err) {
      console.log(err);      
      toast({
        position: "top-right",
        title: "Erro",
        description: "Falha no login!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  }
  return <AuthContext.Provider value={{ registerUser, loginUser, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
