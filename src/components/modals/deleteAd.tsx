import { useCarContext } from '@/contexts/carsContext'
import { CarRequestEdit, carEditSchemaReturn, } from '@/schemas/car.schema'
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    Text,
    FormLabel,
    Box,
    FormControl,
    Input,
    Textarea,
    ModalFooter,
    Stack,
    FormErrorMessage,
} from '@chakra-ui/react'


import { useState } from 'react'

const DeleteAd = ({ car, }: any) => {
    const OverlayOne = () => (
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
      );
      const [overlay, setOverlay] = useState(<OverlayOne />);
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteAd, } = useCarContext()   
         

    return (
        <>
            
            <Button 
                onClick={ () => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                }} 
                w={{cel:'48%', desk:'126px'}} 
                size={'md'} 
                bg={'grey6'} 
                color={"grey2"} 
                fontSize={"body2"} 
                fontFamily={"body"} 
                fontWeight={'600'}
            >
                Excluir Anúncio
            </Button>
            
            <Modal motionPreset='slideInBottom' onClose={onClose} isOpen={isOpen} isCentered>
                {overlay}
                <ModalOverlay/>

                <ModalContent display={'flex'} alignItems={'center'} bg={'white'}>

                    <ModalHeader alignSelf={"flex-start"}>
                        <Heading color={"grey1"} fontSize={"heading7" }fontFamily={"heading"} fontWeight={'500'}>Excluir anúncio</Heading>
                        <ModalCloseButton color={"grey4"} border={"1px solid grey4"}/>
                    </ModalHeader>
                    <ModalBody p={'0px'} display={"flex"} flexDirection={'column'} alignItems={"flex-start"} borderRadius='4px' marginTop={"28px"} bg={'white'} gap={'24px'} w={'90%'}>
                        <Text color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Tem certeza que deseja remover este anúncio?</Text>
                        Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores.
                    </ModalBody>
                    <ModalFooter 
                        marginBottom={'32px'} 
                        w={'100%'} 
                        justifyContent={{cel:'space-between', desk: 'flex-end'}} 
                        gap={{desk:'0.5rem'}}
                    >
                        <Button 
                            onClick={onClose} 
                            type='button' 
                            w={{cel:'48%', desk:'193px'}} 
                            size={'md'} 
                            bg={'grey6'} 
                            color={"grey2"} 
                            fontSize={"body2"} 
                            fontFamily={"body"} 
                            fontWeight={'600'} 
                            _hover={{bg:'grey5', color:'grey2'}}
                            transition={'0.3s ease-in'}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            onClick={() => deleteAd(car.id, onClose)}                            
                            type='button' 
                            w={{cel:'48%', desk:'193px'}} 
                            size={'md'} 
                            bg={'alert2'} 
                            color={"alert1"} 
                            fontSize={"body2"} 
                            fontFamily={"body"} 
                            fontWeight={'600'} 
                            _hover={{bg:'alert1', color:'alert2'}}
                            transition={'0.3s ease-in'}
                        >
                            Sim, excluir anúncio
                        </Button>
                    </ModalFooter>

                </ModalContent>

            </Modal>
        </>
    )
}

export default DeleteAd

