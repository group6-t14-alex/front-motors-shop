import {
    Text,
    Box,
    Image,
    ListItem,
    ButtonGroup,
    Button
} from '@chakra-ui/react'

  
const ProfileCardUser = ({
    carName,
    carImage,
    description,
    price,
    year,
    km,
    active
}: any) => {

    const adIsActive = (act: boolean) => {
      if (act === true) {
        return (
          <Text
            pos={'absolute'}
            left={'10px'}
            top={'10px'}
            fontWeight={'500'}
            color={'white'}
            bg={'brand1'}
            p={'5px'}
            borderRadius={'2px'}
            borderColor={'random7'}
          >
            Ativo
          </Text>
        )
      }else{
        return (
          <Text
            pos={'absolute'}
            left={'10px'}
            top={'10px'}
            fontWeight={'500'}
            color={'white'}
            bg={'grey4'}
            p={'5px'}
            borderRadius={'2px'}
            borderColor={'random7'}
          >
            Inativo
          </Text>
        )
      }
    }
  
    return (
      <ListItem
        w={'312px'}
        h={'356px'}
        display={'flex'}
        flexDirection={'column'}
        border={'none'}
        boxShadow={'none'}
        bgColor={'grey7'}
        m={'0 auto'}
      >
        <Box 
          bgColor={'grey7'} 
          mb={1} 
          maxH={"150px"}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          p={"0"}
          pos={'relative'}
        >
          <Image
            src={carImage}
            alt={carName}          
            height={'auto'}
            objectFit={'cover'}
            w={'90%'}
            h={'150px'}
          />
          {adIsActive(active)}
        </Box>
  
        <Box
          bgColor={'grey7'}
          pl={1}
          pr={1}
          display={'flex'}
          flexDir={'column'}
        >
          <Text 
            fontSize={'body1'} 
            fontWeight={'600'} 
            color={'grey1'} 
            white-space={"nowrap"}
            width={"100%"}
            maxH={"22px"}
            overflow={"hidden"}
            text-overflow={"ellipsis"}
            mb={"1rem"}          
           >
            {carName}
          </Text>
          <Text fontSize={'body2'} fontWeight={'400'} color={'grey2'} minH={"50px"} maxH={"50px"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          mb={"1rem"} maxW={'280px'} whiteSpace={'nowrap'} >
            {description}
          </Text>
        </Box>
  
        <Box
          bgColor={'grey7'}
          pl={1}
          pr={1}
          display={'flex'}
          flexDirection={'column'}
          gap={'20px'}
        >

          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} gap={'0.75rem'}>
              <Text
                fontSize={'body2'}
                bgColor={'brand4'}
                color={'brand1'}
                p={['8px', '4px']}
                fontWeight={'500'}
              >
                {km} KM
              </Text>
              <Text
                fontSize={'body2'}
                bgColor={'brand4'}
                color={'brand1'}
                p={['8px', '4px']}
                fontWeight={'500'}
              >
                {year}
              </Text>
            </Box>
            <Text fontSize={'body1'} fontWeight={'500'} color={'grey1'}>
              R$ {price}
            </Text>
          </Box>
          <ButtonGroup>
            <Button colorScheme='grey1' variant='outline'>Editar</Button>
            <Button colorScheme='grey1' variant='outline'>Ver detalhes</Button>
          </ButtonGroup>
        </Box>
      </ListItem>
    )
  }
  
  export default ProfileCardUser
  