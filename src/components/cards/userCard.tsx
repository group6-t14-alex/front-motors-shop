import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Image,
  Avatar
} from '@chakra-ui/react'
import image from '/public/imagem.png'

const CardUser = ({
  carName,
  description,
  advertiser,
  tags,
  price,
  fipePrice,
  year,
  km,
  userName
}: any) => {
  const bigDeal = (price: number, fipePrice: number) => {
    if (price < fipePrice) {
      return (
        <Text
          pos={'absolute'}
          right={'0'}
          top={'0'}
          fontWeight={'500'}
          color={'white'}
          bg={'random7'}
          p={'5px'}
          borderRadius={'2px'}
          borderColor={'random7'}
        >
          $
        </Text>
      )
    }
  }

  return (
    <Card
      maxW={'312px'}
      maxH={'356px'}
      minW={'312px'}
      display={'flex'}
      flexDirection={'column'}
      border={'none'}
      boxShadow={'none'}
      marginBottom={'80px'}
    >
      <CardHeader bgColor={'grey7'} mb={1}>
        <Image
          src={image.src}
          alt={'Car A'}
          width={'100%'}
          maxW={'262px'}
          height={'auto'}
          objectFit={'cover'}
        />
        {bigDeal(price, fipePrice)}
      </CardHeader>

      <CardBody
        bgColor={'white'}
        pl={1}
        pr={1}
        display={'flex'}
        flexDir={'column'}
      >
        <Text fontSize={'body1'} fontWeight={'600'} color={'grey1'}>
          {carName}
        </Text>
        <Text fontSize={'body2'} fontWeight={'400'} color={'grey2'}>
          {description}
        </Text>
      </CardBody>

      <CardFooter
        bgColor={'white'}
        pl={1}
        pr={1}
        display={'flex'}
        flexDirection={'column'}
        gap={'20px'}
      >
        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
          <Avatar name={userName} size={'sm'} />
          <Text fontSize={'body2'} fontWeight={'500'}>
            {userName}
          </Text>
        </Box>

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
      </CardFooter>
    </Card>
  )
}

export default CardUser
