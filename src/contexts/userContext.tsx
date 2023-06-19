import { api } from "@/services/api";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactNode, useState, createContext, useContext } from "react";
import { UserInterface } from "@/interfaces/user.interface";


interface Props {
    children: ReactNode;
};

interface userProviderData {
    
};

const UserContext = createContext<userProviderData>({} as userProviderData);

export const UserProvider = ({ children }: Props) => {
    const router = useRouter();
    const cookies = parseCookies();
    if (cookies["@MotorsShop"]) {
        api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
    }
    const [user, setUser] = useState<UserInterface | null>()

    
    
    
    return <UserContext.Provider value={{ }} >{ children }</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
