import {UserRequest, LoginData} from "@/schemas/user.schema";
import {api} from "@/services/api";
import {useRouter} from "next/router";
import {createContext, ReactNode, useContext, useState, useEffect} from "react";
import {useToast} from "@chakra-ui/toast";
import jwt_decode from "jwt-decode"
import { UserInterface } from "@/interfaces/user.interface";
import { setCookie, parseCookies } from "nookies";


interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerUser: (userData: UserRequest) => void;
  loginUser: (loginData: LoginData) => void;
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}

export const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    
    const getLocalToken = async () => {
      try {
        const tokenLocal = parseCookies();
        if (!tokenLocal) {
          return {
            redirect: {
              destination: "/login",
              permanent: false
            }
          };
        }
        const token: any = jwt_decode(tokenLocal["@MotorsShop"])
        
        const userData = await api.get(`/user/${+token.sub}`, {
          headers: {
            Authorization: `Bearer ${tokenLocal["@MotorsShop"]}`
          }
        })

        setUser(userData.data)        
      } catch (error) {
        console.log(error)        
      }
    }    
    getLocalToken();
  
  },[]);

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
      const userData = await api.get(`/user/${token.sub}`, {
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
      setUser(userData.data)
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
  
  };

  return <AuthContext.Provider value={{ registerUser, loginUser, user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
