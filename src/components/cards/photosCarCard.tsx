import {
    Grid,
    GridItem,
} from '@chakra-ui/react'
import Image from 'next/image';

import carros from "../../assets/cars/fotosExample.png"

const PhotosCar = () => {

    return (
        <>
            <Grid templateColumns='repeat(3, 2fr)' gap='30px 5px' w='95%' h='230px' alignSelf='center' justifyItems='center'>

                                <GridItem w='90px' h='90px' borderRadius='4px' bg='grey.7' display='flex' alignItems='center'><Image src={carros} alt='fotos Mercedes benz A'/></GridItem>

                                <GridItem w='90px' h='90px' borderRadius='4px' bg='grey.7' display='flex' alignItems='center'><Image src={carros} alt='fotos Mercedes benz A'/></GridItem>

                                <GridItem bg='grey.7' w='90px' h='90px' borderRadius='4px' display='flex' alignItems='center'><Image src={carros} alt='fotos Mercedes benz A'/></GridItem>

                                <GridItem w='90px' h='90px' borderRadius='4px' bg='grey.7' display='flex' alignItems='center'><Image src={carros} alt='fotos Mercedes benz A'/></GridItem>

                                <GridItem w='90px' h='90px' borderRadius='4px' bg='grey.7' display='flex' alignItems='center'><Image src={carros} alt='fotos Mercedes benz A'/></GridItem>

                                <GridItem w='90px' h='90px' borderRadius='4px' bg='grey.7' display='flex' alignItems='center'><Image src={carros} alt='fotos Mercedes benz A'/></GridItem>

                        </Grid>
        </>
    )
}

export default PhotosCar