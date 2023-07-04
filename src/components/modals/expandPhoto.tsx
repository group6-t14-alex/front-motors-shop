import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Button,
    Heading,
    Image,
    Box
} from '@chakra-ui/react'

import carro from "../../assets/cars/imgExample.png"
import { useCarContext } from '@/contexts/carsContext'

const ExpandPhotoModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { car } = useCarContext()

    return(
        <>
            <Button
                height={"auto"}
                minH='22.1875rem'
                maxH='22.1875rem'
                w='100%'  
                maxWidth='1025px' 
                minWidth='320px' 
                bg="grey10"
                marginTop='45px' 
                borderRadius='4px' 
                display='flex' 
                alignItems='center' 
                justifyContent='center' 
                onClick={onOpen}
                overflow={'hidden'}
                objectFit={"cover"}  
                p={'0'}
            >
                <Image 
                    src={car ? car.imageUrl : carro} 
                    alt={car ? car.model : 'Mercedes benz A'} 
                    width={'100%'} 
                    minW={'280px'}
                    maxW={'64.0625rem'}
                    height={'auto'}
                    objectFit={"cover"}                    
                />
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>

                <ModalContent>

                    <ModalHeader alignSelf="flex-start">
                        <Heading color="grey1" fontSize="heading7" fontFamily="heading" fontWeight='500' >Imagem do veículo</Heading>
                        <ModalCloseButton color={"grey4"} border={"1px solid grey4"}/>
                    </ModalHeader>
                    <ModalBody display="flex" alignItems="center" bg={'grey7'} borderRadius='4px' marginBottom="28px" w="100%">
                        <Image src={car ? car.imageUrl : carro} alt={car ? car.model : 'Mercedes benz A'}/>
                    </ModalBody>

                </ModalContent>

            </Modal>
        </> 
    )
}

export default ExpandPhotoModal