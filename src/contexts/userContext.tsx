import { api } from "@/services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";
import { useAuth } from "./authContext";
import { userSchemaRequestUpdateData } from "@/schemas/user.schema";
import { useToast } from "@chakra-ui/toast";

interface Props {
  children: ReactNode;
}

interface userProviderData {
  updateUserAddress: (
    dataUser: userSchemaRequestUpdateData,
    id: number,
    onClose: () => void
  ) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUserInfos: (
    data: userSchemaRequestUpdateData,
    id: number,
    onClose: () => void
  ) => Promise<void>;
}

const UserContext = createContext<userProviderData>({} as userProviderData);

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const cookies = parseCookies();
  if (cookies["@MotorsShop"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
  }
  const { user, setUser } = useAuth();
  const toast = useToast();

  const updateUserInfos = async (
    data: userSchemaRequestUpdateData,
    id: number,
    onClose: () => void
  ) => {
    try {
      const response = await api.patch(`/user/${id}`, data);

      setUser(response.data);
      onClose();
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "Usuário editado com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        position: "top-right",
        title: "Erro",
        description: "Ocorreu um erro!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const updateUserAddress = async (
    dataUser: userSchemaRequestUpdateData,
    id: number,
    onClose: () => void
  ) => {
    try {
      const response = await api.patch(`/user/${id}`, dataUser);

      setUser(response.data);
      onClose();
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "Endereço editado com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        position: "top-right",
        title: "Erro",
        description: "Ocorreu um erro!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/user/${id}`);
      const token: any = parseCookies();
      setCookie(null, "@MotorsShop", token, { maxAge: 0, path: "/" });
      setUser(null);
      router.push("/");
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "usuário deletado!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        position: "top-right",
        title: "Erro",
        description: "Ocorreu um erro!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{ updateUserInfos, deleteUser, updateUserAddress }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
