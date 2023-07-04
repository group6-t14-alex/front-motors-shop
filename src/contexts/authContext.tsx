import {
  UserRequest,
  LoginData,
  SendingEmailData,
  RecoveryPasswordData,
} from "@/schemas/user.schema";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useToast } from "@chakra-ui/toast";
import jwt_decode from "jwt-decode";
import { UserInterface } from "@/interfaces/user.interface";
import { setCookie, parseCookies } from "nookies";
import { useUser } from './userContext'

interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerUser: (userData: UserRequest) => void;
  loginUser: (loginData: LoginData) => void;
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  logOut: () => Promise<void>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  sendEmail: (email: SendingEmailData) => void;
  newPassword: (password: RecoveryPasswordData, token: string) => void;
}

export const AuthContext = createContext<authProviderData>(
  {} as authProviderData
);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLogged, setIsLogged] = useState(false);  

  useEffect(() => {

    const getLocalToken = async () => {
      try {
        const tokenLocal = parseCookies();
        if (!tokenLocal["@MotorsShop"]) {
          setIsLogged(false)
          return {
            redirect: {
              destination: "/login",
              permanent: false,
            },
          };
        }
        const token: any = jwt_decode(tokenLocal["@MotorsShop"]);

        const userData = await api.get(`/user/${+token.sub}`, {
          headers: {
            Authorization: `Bearer ${tokenLocal["@MotorsShop"]}`,
          },
        });
        setUser(userData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLocalToken();
  }, []);

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
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      setCookie(null, "@MotorsShop", response.data.token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      api.defaults.headers.common.authorization = `Bearer ${response.data.token}`;
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "usuário logado com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      router.push("/profile");
      setUser(userData.data);      
      setIsLogged(true);
    } catch (error) {
      console.log(error);
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

  const logOut = async () => {
    try {
      const token: any = parseCookies();

      setCookie(null, "@MotorsShop", token, { maxAge: 0, path: "/" });
      setUser(null);
      setIsLogged(false);
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "Logout feito com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        position: "top-right",
        title: "Erro",
        description: "Ocorreu algum erro, tente novamente!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const sendEmail = (email: SendingEmailData) => {
    try {
      const getEmail = api.post("/user/resetPassword", email);

      toast({
        position: "top-right",
        title: "Sucesso",
        description: "Email enviado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        position: "top-right",
        title: "Erro",
        description: "Erro ao enviar email, tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const newPassword = (resetPassword: RecoveryPasswordData, token: string) => {
    try {
      const getPass = api.patch(`/user/resetPassword/${token}`, {
        password: resetPassword.password,
      });

      toast({
        position: "top-right",
        title: "Sucesso",
        description: "Senha atualizada com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast({
        position: "top-right",
        title: "Erro",
        description: "Erro ao atualizar senha, tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        user,
        setUser,
        logOut,
        sendEmail,
        newPassword,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
