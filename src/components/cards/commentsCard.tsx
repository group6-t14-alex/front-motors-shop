import {
  Avatar,
  Box,
  Heading,
  List,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import CommentInputCard from "./commentInputCard";
import CommentItemCard from "./commentItemCard";
import { useUser } from "@/contexts/userContext";
import { useAuth } from "@/contexts/authContext";
import { useCommentContext } from "@/contexts/commentsContext";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { EditAndDeleteComentsButton } from "../modals/editAndDeleteComents";

const CommentsCard = ({ carId }: any) => {
  const { user } = useAuth();
  const [carComments, setCarComments] = useState<any>([]);

  // useEffect(() => {}, [user]);
  
  useEffect(() => {
    const searchCar: any = async () => {    
      const response = await api.get(`/cars/${carId}`)
      setCarComments(response.data.comments)
    }
    searchCar()
  
  }, []);  

  return (
    <Box display="flex" flexDirection="column" w={{ cel: "95%", desk: "50%" }}>
      <Box
        minHeight={"260px"}
        w="100%"
        maxWidth="1032px"
        borderRadius="4px"
        p="36px 28px"
        bg="grey10"
        marginTop="18px"
        display="flex"
        flexDirection="column"
        gap="13px"
      >
        <Heading
          fontFamily="heading"
          fontWeight="600"
          fontSize="heading6"
          color="grey1"
        >
          Comentários
        </Heading>

        <List
          minH="150px"
          maxH="724px"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="44px"
          overflowY="auto"
        >
          
          {carComments ? (
            carComments?.map((comment: any) => {
              // {console.log(comment)}
              return (
                <CommentItemCard
                  key={comment.id}
                  name={user?.name}
                  comment={comment.comment}
                  user={user}
                />
              );
            })
          ) : (
            <>
              <Heading size={"md"} alignSelf={"center"} p={"2rem"}>
                Nenhum comentário no momento.
              </Heading>{" "}
            </>
          )}
        </List>
      </Box>
      <CommentInputCard carId={carId} />
    </Box>
  );
};

export default CommentsCard;
