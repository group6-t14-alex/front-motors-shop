import { useUser } from "@/contexts/userContext";
import {
  userSchemaRequestUpdate,
  userSchemaRequestUpdateData,
} from "@/schemas/user.schema";
import {
  Button,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Modal,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DeleteProfile from "./deleteProfile";

const EditProfileButton = ({ userData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userSchemaRequestUpdateData>({
    resolver: zodResolver(userSchemaRequestUpdate),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { updateUserInfos } = useUser();

  const submitHandle = (formData: userSchemaRequestUpdateData) => {
    updateUserInfos(formData, userData.id, onClose);
  };
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
        Editar perfil
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar perfil</ModalHeader>
          <ModalCloseButton color="grey4" />
          <ModalBody fontWeight={"bold"} color={"#000000"}>
            Informações pessoais
            <form onSubmit={handleSubmit(submitHandle)}>
              <FormControl isInvalid={Boolean(errors.name)} mt={"1rem"}>
                <FormLabel>Nome</FormLabel>
                <Input
                  {...register("name")}
                  defaultValue={userData?.name}
                  placeholder={userData?.name}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.email)} mt={"1rem"}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("email")}
                  defaultValue={userData?.email}
                  placeholder={userData?.email}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.cpf)} mt={"1rem"}>
                <FormLabel>CPF</FormLabel>
                <Input
                  {...register("cpf")}
                  defaultValue={userData?.cpf}
                  placeholder={userData?.cpf}
                />
                <FormErrorMessage>
                  {errors.cpf && errors.cpf.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.phone)} mt={"1rem"}>
                <FormLabel>Celular</FormLabel>
                <Input
                  {...register("phone")}
                  defaultValue={userData?.phone}
                  placeholder={userData?.phone}
                />
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.date_of_birth)}
                mt={"1rem"}
              >
                <FormLabel>Data de nascimento</FormLabel>
                <Input
                  {...register("date_of_birth")}
                  type="date"
                  defaultValue={userData?.date_of_birth}
                  placeholder={userData?.date_of_birth}
                />
                <FormErrorMessage>
                  {errors.date_of_birth && errors.date_of_birth.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.description)} mt={"1rem"}>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  {...register("description")}
                  defaultValue={userData?.description}
                  placeholder={userData?.description}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <ModalFooter
                mt={"1rem"}
                padding={"0"}
                gap={"1rem"}
                display={"flex"}
                flexDirection={"row"}
                flexWrap={{ desk: "nowrap", cel: "wrap" }}
                justifyContent={'center'}
              >                
                <Button onClick={onClose}>Cancelar</Button>
                <DeleteProfile userData={userData} />               
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

export default EditProfileButton;
