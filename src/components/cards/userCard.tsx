import { Card, CardHeader, CardBody, CardFooter, Text, Box } from '@chakra-ui/react'
import image from '/public/imagem.png'
import Image from "next/image"
import { relative } from 'path'

const CardUser = ({carName, description, advertiser, tags, price, fipePrice}: any) => {
    
    const bigDeal = (price: number, fipePrice: number) => {
        if (price < fipePrice) {
            return <Text pos='absolute' right='0' top='0' fontWeight='500' color='white' bg='random.7' p='5px' borderRadius='2px' borderColor='random.7'>$</Text>
        } 
        
    }

    return (
        <Card maxW='312px' maxH='356px' display='flex' flexDirection='column' border='none' boxShadow='none' marginBottom='80px' >

            <CardHeader bgColor='grey.7' mb={1}>
                <Image src={image} alt="Car A"/>                
                {bigDeal(price, fipePrice)}
            </CardHeader>

            <CardBody bgColor='white' pl={1} pr={1} display={'flex'} flexDir={'column'} >
                <Text fontSize='body.1' fontWeight='600' color='grey.1'>{carName}</Text>
                <Text fontSize='body.2' fontWeight='400' color='grey.2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...</Text>
            </CardBody>

            <CardFooter bgColor='white' pl={1} pr={1} display='flex' flexDirection='column' gap='20px'>
                <Box display='flex' alignItems='center'>
                    <Text bgColor='brand.1' color='white' width='32px' h='32px' borderRadius='full' fontSize='body.2' display='flex' justifyContent='center' alignItems='center' marginRight='8px'>SL</Text> {/*mudar para imagem de perfil caso exista*/}
                    <Text fontSize='body.2' fontWeight='500'>Samuel Leão</Text>
                </Box>

                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Box display='flex' gap='0.75rem'>
                        <Text fontSize='body.2' bgColor='brand.4' color='brand.1' p={['8px', '4px']} fontWeight='500'>0 KM</Text>
                        <Text fontSize='body.2' bgColor='brand.4' color='brand.1' p={['8px', '4px']} fontWeight='500'>2019</Text>
                    </Box>
                    <Text fontSize='body.1' fontWeight='500' color='grey.1'>R$ 00.000,00</Text>
                </Box>
            </CardFooter>
        </Card>
    )
}

export default CardUser