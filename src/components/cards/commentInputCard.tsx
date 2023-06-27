import { Avatar, Box, Button, FormControl, Grid, Text, Textarea } from '@chakra-ui/react'

const CommentInputCard = () => {
  return (
    <Box h='414px' w='100%' maxWidth='1032px' borderRadius='4px' bg='grey10' p='36px 26px' marginTop='42px' display='flex' flexDirection='column' gap='24px' marginBottom='45px'>
    <Box w='130px' h='32px' display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Avatar h='32px' w='32px' name='Sammuel Leão'/>
        <Text fontSize='body2' fontWeight='500'>Samuel Leão</Text>
    </Box>

    <FormControl h='275px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-between'>
        <Textarea bg='grey10' outline='1px solid grey7' borderRadius='4px' h='100px' placeholder='Carro muito confortável, foi uma ótima experiência de compra...'/>


        <Button size='sm' bg='brand1' color='white' fontSize='body2' fontWeight='600' fontFamily='body' pos={{ cel: 'relative', desk: "absolute" }} right={{desk: '11px'}} bottom={{desk: '183px'}} _hover={{bg:'brand2'}}>Comentar</Button>



        <Grid templateColumns='repeat(2, 1fr)'  alignItems='flex-start' justifyItems='start' h='76px' gap='8px'>
            <Button fontSize='body3' fontWeight='500' fontFamily='body' p='0 12px' borderRadius='24px' bg='grey7' color='grey3'>Gostei muito!</Button>
            <Button fontSize='body3' fontWeight='500' fontFamily='body' p='0 12px' borderRadius='24px' bg='grey7' color='grey3'>Incrível</Button>
            <Button fontSize='body3' fontWeight='500' fontFamily='body' p='0 12px' borderRadius='24px' bg='grey7' color='grey3'>Recomendarei para meus amigos</Button>
        </Grid>

    </FormControl>
</Box>

  )
}

export default CommentInputCard;