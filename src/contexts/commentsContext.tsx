import { CommentData, CommentDataReturn } from '@/schemas/comment.schema'
import { api } from '@/services/api'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {useToast} from "@chakra-ui/toast";
import { useAuth } from './authContext'
import { parseCookies } from 'nookies'

interface Props {
  children: ReactNode;
}

interface commentProviderData {
  createComment: (commentRequest: CommentData) => void;
  comments: CommentDataReturn[];
  setComments: React.Dispatch<React.SetStateAction<CommentDataReturn[]>>;
}

const CommentContext = createContext<commentProviderData>({} as commentProviderData);

export const CommentProvider = ({children}: Props) => {
  const [comments, setComments] = useState<CommentDataReturn[]>([]);
  const toast = useToast();
  const { user, setUser } = useAuth();
  
  useEffect(() => {
    const getUserComments = async () => {
      try {
          const response = await api.get(`/user/${user!.id}`)                
          if(response.data){
              // setComments(response.data.comments);
              setUser(response.data)
          }
      } catch (errors) {
          console.log(errors)
      }
    }
    getUserComments()
  }, [comments, setUser, user])

  const cookies = parseCookies();

  if (cookies["@MotorsShop"]) {
      api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
  }

  const createComment = (commentData: CommentData) => {      
    api.post(`/comments/${commentData.carId}`, commentData)
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

  return (
    <CommentContext.Provider value={{createComment, comments, setComments}}>
        {children}
    </CommentContext.Provider>
  );
}

export const useCommentContext = () => {
  return useContext(CommentContext);
};