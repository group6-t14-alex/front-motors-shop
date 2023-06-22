import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";

interface PropsUtils {
  children: ReactNode;
}

export const AuthRoute = ({ children }: PropsUtils) => {
  const { isLogged } = useContext(AuthContext);
  const router = useRouter();

  if (!isLogged) {
    router.push("/login");

    return null;
  }
  return <>{children}</>;
};
