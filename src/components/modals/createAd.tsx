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
    Text
} from '@chakra-ui/react'
import CreateAdForm from '../forms/createAdForm';

const CreateAd = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button size={'lg'} colorScheme={'brand1'} borderRadius={'4px'} color={'brand1'} fontFamily={'body'} fontWeight={'600'} fontSize={'body1'} variant='outline' _hover={{bg:'brand4'}} onClick={onOpen}>Criar anuncio</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>

                <ModalContent display={'flex'} alignItems={'center'} bg={'white'} mt={'80px'}>

                    <ModalHeader alignSelf={"flex-start"}>
                        <Heading color={"grey1"} fontSize={"heading7" }fontFamily={"heading"} fontWeight={'500'}>Criar anúncio</Heading>
                        <ModalCloseButton color={"grey4"} border={"1px solid grey4"}/>
                    </ModalHeader>
                    <ModalBody p={'0px'} display={"flex"} flexDirection={'column'} alignItems={"flex-start"} borderRadius='4px' marginTop={"28px"} bg={'white'} gap={'24px'} w={'90%'}>
                        <Text color={"grey1"} fontSize={"body2"} fontFamily={"body"} fontWeight={'500'}>Informações do veículo</Text>

                        <CreateAdForm/>
                    </ModalBody>

                </ModalContent>

            </Modal>
        </>
    )
}

export default CreateAd