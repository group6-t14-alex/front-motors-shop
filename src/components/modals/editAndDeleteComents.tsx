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
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {
  comentSchemaRequestUpdate,
  ComentDataUpdate,
} from "@/schemas/comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DeleteComment } from "./deleteComment";
import { useCommentContext } from "@/contexts/commentsContext";

export const EditAndDeleteComentsButton = ({ comment }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComentDataUpdate>({
    resolver: zodResolver(comentSchemaRequestUpdate),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateComment } = useCommentContext();

  const submitHandler = (data: ComentDataUpdate) => {
    updateComment(data, comment.id, onClose);
  };

  return (
    <>
      <Button onClick={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar comentário</ModalHeader>
          <ModalCloseButton color="grey4" />
          <ModalBody>
            informações do comentário
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormControl mt={"1rem"}>
                <Textarea
                  {...register("comment")}
                  isInvalid={Boolean(errors.comment)}
                  bg="grey10"
                  outline="1px solid grey7"
                  borderRadius="4px"
                  h="100px"
                  placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                />
              </FormControl>
              <ModalFooter
                mt={"1rem"}
                padding={"0"}
                gap={"1rem"}
                display={"flex"}
                flexDirection={"row"}
                flexWrap={{ desk: "nowrap", cel: "wrap" }}
                justifyContent={"center"}
              >
                <Button onClick={onClose}>Cancelar</Button>

                <DeleteComment comment={comment} />
                <Button color={"white"} bg={"brand1"} type="submit">
                  Salvar alterações
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
