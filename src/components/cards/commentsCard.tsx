import { Avatar, Box, Heading, List, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import CommentInputCard from './commentInputCard'
import CommentItemCard from './commentItemCard'
import { useUser } from '@/contexts/userContext'
import { useAuth } from '@/contexts/authContext'
import { useCommentContext } from '@/contexts/commentsContext'
import { useEffect } from 'react'
import { api } from '@/services/api'

const CommentsCard = ({carId} : any) => {
  const { comments } = useCommentContext();
  const { user } = useAuth();

  useEffect(() => {
    // console.log(user);
  }, [user])

  return (
    <Box display='flex' flexDirection='column' w={{cel:"95%", desk:'50%'}}>
    <Box h='845px'  w='100%'  maxWidth='1032px' borderRadius='4px' p='36px 28px' bg='grey10' marginTop='18px' display='flex' flexDirection='column' gap='13px'>
        <Heading fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1'>Comentários</Heading>

        <List h='724px' maxH='724px' display='flex' flexDirection='column' alignItems='flex-start' gap='44px' overflowY='auto'>

          {user && user.comments.map((comment: any) => {
            return (
                <CommentItemCard key={comment.id} name={user!.name} comment={comment} />
              );
            })
          }
        </List>
    </Box>
    <CommentInputCard carId={carId}/>
  </Box>

  )
}

export default CommentsCard