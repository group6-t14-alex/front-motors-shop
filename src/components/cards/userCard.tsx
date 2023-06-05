import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'
import cardImageTeste from '/public/imagem pra teste.png'
import Image from "next/image"

const CardUser = () => {
    return (
        <Card>
            <CardHeader>
                <Image src={cardImageTeste} alt="Car A"> </Image>
            </CardHeader>
            <CardBody>
                {/* <Text fontSize='lg' as='b'>Maserati - Ghibli</Text> */}
                <p>Maserati - Ghibli</p>
                <Text fontSize='md'>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
                <div>
                    <Text>SL</Text> {/*mudar para imagem de perfil caso exista*/}
                    <Text fontSize='md'>Samuel Leão</Text>
                </div>
                <div>
                    <Text fontSize='md'>0 KM</Text>
                    <Text fontSize='md'>2019</Text>
                    <Text fontSize='md' as='b'>R$ 00.000,00</Text>
                </div>
            </CardFooter>
        </Card>
    )
}

export default CardUser