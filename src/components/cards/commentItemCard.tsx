import { Avatar, Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const CommentItemCard = ({name, runningTime, comment}: any) => {
  return (
    <ListItem w='95%' h='212px' borderRadius='4px' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around' bg='grey10' gap='body3'>
      <Box display='flex' flexDirection='row' alignItems='center'>
          <Box display='flex' flexDirection='row' alignItems='center' w='146px' h='32px' gap='8px'>
              <Avatar size='sm' name={`${name}`}/>
              <Heading size='sm' fontFamily='body' fontWeight='500' fontSize='body2' color='grey1'> {`${name}`} </Heading> 
          </Box>

          <UnorderedList>
              <ListItem fontFamily='body' fontWeight='400' fontSize='body3' color='grey3'>{`há ${runningTime}`}</ListItem>
          </UnorderedList>      
      </Box>
      <Text fontFamily='body' fontWeight='400' fontSize='body2' color='grey2'  h='168px'>{`${comment}`}</Text>
    </ListItem>
  );
}

export default CommentItemCard;