import { Avatar, Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const calculateRunningTime = ( date: Date) => {
  const now: Date = new Date();
  const outher: Date = new Date(date);
  const diffMilissegundos = now.getTime() - outher.getTime();
  const diffSegundos = diffMilissegundos / 1000;
  const diffMinutos = diffSegundos / 60;
  const diffHoras = diffMinutos / 60;
  const diffDias = diffHoras / 24;
  const diffMeses = diffDias / 30;

  if (diffMeses >= 1) {
    return `${Number(diffMeses.toFixed(0))} meses`
  } else if (diffDias >= 1) {
    return `${Number(diffDias.toFixed(0))} dias`      
  } else if (diffHoras >= 1) {
    return `${Number(diffHoras.toFixed(0))} horas`
  } else if (diffMinutos >= 1) {
    return `${Number(diffMinutos.toFixed(0))} minutos`      
  } else if (diffSegundos >= 1) {
    return `${Number(diffSegundos.toFixed(0))} segundos`      
  } else {
    return `0 segundos`
  }
}

const CommentItemCard = ({name, comment}: any) => {
  const [runningTime, setRunningTime] = useState(calculateRunningTime(comment.created_at))

  useEffect(() => {
    setRunningTime(calculateRunningTime(comment.created_at));
    // console.log(comment);
    // console.log("Calculate time", calculateRunningTime(comment.created_at));
  }, [comment])

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
      <Text fontFamily='body' fontWeight='400' fontSize='body2' color='grey2'  h='168px'>{`${comment.comment}`}</Text>
    </ListItem>
  );
}

export default CommentItemCard;