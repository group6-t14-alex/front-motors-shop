import {
  ComentDataUpdate,
  CommentData,
  CommentDataReturn,
} from "@/schemas/comment.schema";
import { api } from "@/services/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useToast } from "@chakra-ui/toast";
import { useAuth } from "./authContext";
import { parseCookies } from "nookies";

interface Props {
  children: ReactNode;
}

interface commentProviderData {
  createComment: (commentRequest: CommentData) => void;
  comments: CommentDataReturn[];
  setComments: React.Dispatch<React.SetStateAction<CommentDataReturn[]>>;
  updateComment: (
    data: ComentDataUpdate,
    id: number,
    onClose: () => void
  ) => Promise<void>;
  deleteComment: (id: number, onClose: () => void) => Promise<void>;
}

const CommentContext = createContext<commentProviderData>(
  {} as commentProviderData
);

export const CommentProvider = ({ children }: Props) => {
  const [comments, setComments] = useState<CommentDataReturn[]>([]);
  const toast = useToast();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const getUserComments = async () => {
      try {
        const response = await api.get(`/user/${user?.id}`);
        // console.log(response.data)
        if (response.data) {
          setUser(response.data);
        }
      } catch (errors) {
        console.log(errors);
      }
    };
    getUserComments();
  }, [comments, setUser, user]);

  const cookies = parseCookies();

  if (cookies["@MotorsShop"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
  }

  const createComment = (commentData: CommentData) => {
    api
      .post(`/comments/${commentData.carId}`, commentData)
      .then((response) => {
        setComments(response.data);
        toast({
          position: "top-right",
          title: "Sucesso",
          description: "Comentário cadastrado com sucesso!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "top-right",
          title: "Error",
          description: "Ops! tente novamente",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
    return Promise<void>;
  };

  const updateComment = async (
    data: ComentDataUpdate,
    id: number,
    onClose: () => void
  ) => {
    try {
      const response = await api.patch(`/comments/${id}`, data);

      if (response.data) {
        setComments((previous) =>
          previous.map((oldComments) => {
            if (+oldComments.id == id) {
              return response.data;
            }
            return oldComments;
          })
        );

        onClose();

        toast({
          position: "top-right",
          title: "Sucesso",
          description: "Comentário atualizado!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(data);

      toast({
        position: "top-right",
        title: "Error",
        description: "Ops! tente novamente",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const deleteComment = async (id: number, onClose: () => void) => {
    try {
      await api.delete(`/comments/${id}`);
      const commentsAtt = comments.filter((oldComments) => {
        return +oldComments.id !== id;
      });
      setComments(commentsAtt);
      toast({
        position: "top-right",
        title: "Sucesso",
        description: "Comentário excluído!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        position: "top-right",
        title: "Error",
        description: "Ops! tente novamente",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <CommentContext.Provider
      value={{
        createComment,
        comments,
        setComments,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
