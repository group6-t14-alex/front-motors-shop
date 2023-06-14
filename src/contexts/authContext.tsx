import { UserData, UserRequest} from "@/schemas/user.schema";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext } from "react";
import Toast from "@/components/Toasts/toast";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerUser: (userData: UserRequest) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

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
  return <AuthContext.Provider value={{ registerUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
