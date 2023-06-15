import { LoginData, UserData, UserRequest} from "@/schemas/user.schema";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import Toast from "@/components/Toasts/toast";
import jwt_decode from "jwt-decode"

interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerUser: (userData: UserRequest) => void;
  loginUser: (loginData: LoginData) => void;
  user: any | null; //tipar com a interface de iUserData vindo da interface de profile -  user: iUserData | null;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [ user, setUser ] = useState(null) //tipar o useState <iUserData | null> ver linha 16

  const registerUser = (userRequest: UserRequest) => {
    api
      .post("/user", userRequest)
      .then(() => {
        Toast({ message: "usuário cadastrado com sucesso!", isSucess: true });
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao criar usuário, tente utilizar outro e-mail!" });
      });
  };

  const loginUser = async (loginData: LoginData) => {
    
    try {
      const response = await api.post("/login", loginData);
      console.log(response)
      const token: any = jwt_decode(response.data.token);
      console.log(token)
      const user = await api.get(`/user/${token.sub}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      });
      localStorage.setItem("motorsShop", response.data.token);
      Toast({ message: "Login realizadocom sucesso!", isSucess: true });
      // router.push("/profile");
      console.log(user)
      setUser(user.data)
    } catch (err) {
      console.log(err);      
      Toast({ message: "Falha no login, tente novamente." });
    }
    
  };

  return <AuthContext.Provider value={{ registerUser, loginUser, user }}>{children}</AuthContext.Provider>;
};



export const useAuth = () => useContext(AuthContext);
