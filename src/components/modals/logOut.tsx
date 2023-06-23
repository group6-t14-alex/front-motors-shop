import { useAuth } from "@/contexts/authContext";
import {
  Modal,
  Button,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";

const LogOutButon = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logOut } = useAuth();

  return (
    <>
      <Button
        border={"none"}
        fontWeight={"normal"}
        cursor="pointer"
        alignSelf={"start"}
        onClick={onOpen}
        bg={"none"}
        borderRadius={"none"}
        _hover={{ bg: "none" }}
      >
        Sair
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sair</ModalHeader>
          <ModalCloseButton color="grey4" />
          <ModalBody>Deseja realmente sair?</ModalBody>
          <ModalFooter>
            <Box width={"70%"} display={"flex"} justifyContent={"space-around"}>
              <Button
                onClick={() => logOut()}
                width={"40%"}
                color="alert1"
                bg="alert2"
                _hover={{ bg: "alert1", color: "white" }}
                transition={"0.5s"}
              >
                Sair
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogOutButon;
