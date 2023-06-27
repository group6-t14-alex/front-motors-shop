import { Avatar, Box, Heading, List, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import CommentInputCard from './commentInputCard'
import CommentItemCard from './commentItemCard'

const CommentsCard = ({ userList, runningTime }: any) => {
  return (
    <Box display='flex' flexDirection='column' w={{cel:"95%", desk:'50%'}}>
    <Box h='845px'  w='100%'  maxWidth='1032px' borderRadius='4px' p='36px 28px' bg='grey10' marginTop='18px' display='flex' flexDirection='column' gap='13px'>
        <Heading fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1'>Comentários</Heading>

        <List h='724px' maxH='724px' display='flex' flexDirection='column' alignItems='flex-start' gap='44px' overflowY='auto'>

          <CommentItemCard name={'Júlia Lima'} runningTime={runningTime} comment={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
          <CommentItemCard name={'Marcos Antônio'} runningTime={runningTime} comment={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
          <CommentItemCard name={'Camila Silva'} runningTime={runningTime} comment={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
          <CommentItemCard name={'Júlia Lima'} runningTime={runningTime} comment={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
        </List>
    </Box>
    <CommentInputCard />
  </Box>

  )
}

export default CommentsCard