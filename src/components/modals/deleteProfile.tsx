import { useUser } from "@/contexts/userContext";
import {
  Button,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from "@chakra-ui/react";
import React from "react";

const DeleteProfile = ({ userData }: any) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteUser } = useUser();

  return (
    <>
      <Button
        width={"40%"}
        color="alert1"
        bg="alert2"
        _hover={{ bg: "alert1", color: "white" }}
        transition={"0.5s"}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Excluir perfil
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir perfil</ModalHeader>
          <ModalCloseButton color="grey4" />
          <ModalBody>
            Tem certeza que deseja excluir seu perfil, {userData?.name}? todos
            os seus dados serão perdidos!
            <ModalFooter display={"flex"} gap={"1rem"}>
              <Button
                width={"40%"}
                color="alert1"
                bg="alert2"
                _hover={{ bg: "alert1", color: "white" }}
                transition={"0.5s"}
                onClick={() => deleteUser(userData?.id)}
              >
                Excluir
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProfile;
