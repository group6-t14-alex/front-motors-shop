import { useUser } from "@/contexts/userContext";
import {
  userSchemaRequestUpdate,
  userSchemaRequestUpdateData,
} from "@/schemas/user.schema";
import { apiCep } from "@/services/api";
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
  FormErrorMessage,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

const EditAddressButton = ({ userData }: any) => {
  const { updateUserAddress } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<userSchemaRequestUpdateData>({
    resolver: zodResolver(userSchemaRequestUpdate),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const findCep = async (cep: string) => {
    cep = cep.replace(/[^0-9]/gi, "");
    if (cep.length == 8) {
      await apiCep
        .get(`/${cep}/json/`)
        .then((response) => {
          setValue("address", response.data.logradouro);
          setValue("city", response.data.localidade);
          setValue("state", response.data.uf);
          setFocus("number");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCep = (event: any) => findCep(event.target.value);

  const onFormSubmit = (formData: userSchemaRequestUpdateData) => {
    updateUserAddress(formData, userData?.id, onClose);
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
        Editar endereço
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar endereço</ModalHeader>
          <ModalCloseButton color="grey4" />
          <ModalBody fontWeight={"bold"} color={"#000000"}>
            Informações de endereço
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Stack spacing={4}>
                <FormControl
                  mt={"1rem"}
                  id="cep"
                  isInvalid={Boolean(errors.cep)}
                >
                  <FormLabel>CEP</FormLabel>
                  <Input
                    placeholder={"00000-000"}
                    {...register("cep")}
                    onChange={handleCep}
                    defaultValue={userData?.cep}
                  />
                  <FormErrorMessage>
                    {errors.cep && errors.cep.message}
                  </FormErrorMessage>
                </FormControl>
                <HStack>
                  <Box>
                    <FormControl id="state" isReadOnly={true}>
                      <FormLabel>Estado</FormLabel>
                      <Input
                        type="text"
                        placeholder={"Digitar Estado"}
                        {...register("state")}
                        defaultValue={userData?.state}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="city" isReadOnly={true}>
                      <FormLabel>Cidade</FormLabel>
                      <Input
                        type="text"
                        placeholder={"Digitar cidade"}
                        {...register("city")}
                        defaultValue={userData?.city}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="address" isReadOnly={true}>
                  <FormLabel>Rua</FormLabel>
                  <Input
                    placeholder={"Digitar logradouro"}
                    {...register("address")}
                    defaultValue={userData?.address}
                  />
                </FormControl>
                <HStack>
                  <Box>
                    <FormControl id="number" isInvalid={Boolean(errors.number)}>
                      <FormLabel>Número</FormLabel>
                      <Input
                        type="text"
                        placeholder={"Digitar número"}
                        {...register("number")}
                        defaultValue={userData?.number}
                      />
                      <FormErrorMessage>
                        {errors.number && errors.number.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      isInvalid={Boolean(errors.complement)}
                      id="complement"
                    >
                      <FormLabel>Complemento</FormLabel>
                      <Input
                        type="text"
                        placeholder={"Ex: apto 3307"}
                        {...register("complement")}
                        defaultValue={userData?.complement}
                      />
                    </FormControl>
                  </Box>
                </HStack>
              </Stack>
              <ModalFooter
                display={"flex"}
                justifyContent={"flex-end"}
                mt={"1rem"}
                padding={"0"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignContent={"end"}
                  width={{ cel: "100%", desk: "85%" }}
                >
                  <Button onClick={onClose} size={{ cel: "md", desk: "lg" }}>
                    Cancelar
                  </Button>
                  <Button
                    color={"white"}
                    bg={"brand1"}
                    type="submit"
                    size={{ cel: "md", desk: "lg" }}
                  >
                    Salvar alterações
                  </Button>
                </Box>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditAddressButton;
