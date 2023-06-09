import Image from 'next/image';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Button,
    Heading
} from '@chakra-ui/react'

import carro from "../../assets/cars/imgExample.png"

const ExpandPhotoModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <>
            <Button h='355px'  w='100%'  maxWidth='1032px' bg="grey10" marginTop='45px' borderRadius='4px' display='flex' alignItems='center' justifyContent='center' onClick={onOpen}>
                <Image src={carro} alt='Mercedes benz A'/>
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>

                <ModalContent>

                    <ModalHeader alignSelf="flex-start">
                        <Heading color="grey1" fontSize="heading7" fontFamily="heading" fontWeight='500' >Imagem do veículo</Heading>
                        <ModalCloseButton color={"grey4"} border={"1px solid grey4"}/>
                    </ModalHeader>
                    <ModalBody display="flex" alignItems="center" bg={'grey7'} borderRadius='4px' marginBottom="28px" w="312px">
                        <Image src={carro} alt='Mercedes benz A'/>
                    </ModalBody>

                </ModalContent>

            </Modal>
        </> 
    )
}

export default ExpandPhotoModal