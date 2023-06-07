import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Filter from "../filter/filter";

const ButtonSeeFilters = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        width="75%"
        size="lg"
        colorScheme="white"
        variant="solid"
        bg="brand2"
        cursor="pointer"
        fontWeight="normal"
        display={{ cel: "flex", desk: "none" }}
      >
        Filtros
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="grey1" fontSize="heading7">
            Filtro
          </ModalHeader>
          <ModalCloseButton color="grey4" />
          <ModalBody>
            <Filter />
          </ModalBody>
          <ModalFooter marginTop="1.5rem" justifyContent="center">
            <Button
              width="80%"
              size="lg"
              colorScheme="white"
              variant="solid"
              bg="brand2"
              cursor="pointer"
              onClick={onClose}
              fontWeight="normal"
            >
              Ver anúncios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonSeeFilters;
