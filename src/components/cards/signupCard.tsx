import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { UserRequest, userSchemaRequest } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";
import { useToast } from "@chakra-ui/toast";
import { apiCep } from "@/services/api";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [typeUser, setTypeUser] = useState("comprador");

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<UserRequest>({
    resolver: zodResolver(userSchemaRequest),
  });

  const handleCep = (event: any) => findCep(event.target.value);

  const { registerUser } = useAuth();
  const toast = useToast();

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

  const onFormSubmit = (formData: UserRequest) => {
    if (formData.password != formData.confirmPassword) {
      toast({
        position: "top-right",
        title: "Erro",
        description: "Erro na Confirmação de senha!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      formData.type_user = typeUser;

      registerUser(formData);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"grey9"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack>
              <Heading fontSize={"heading5"} pb={"1.5rem"} pt={"1.5rem"}>
                Cadastro
              </Heading>
              <Text fontSize={"body1"} as={"b"} pb={"1.5rem"}>
                Informações pessoais️
              </Text>
            </Stack>
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={Boolean(errors.name)}>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  placeholder={"Ex. Samuel Leão"}
                  {...register("name")}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={Boolean(errors.email)}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder={"Ex: samuel@kenzie.com.br"}
                  {...register("email")}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="cpf" isInvalid={Boolean(errors.cpf)}>
                <FormLabel>CPF</FormLabel>
                <Input
                  type="text"
                  placeholder={"000.000.000-00"}
                  {...register("cpf")}
                />
                <FormErrorMessage>
                  {errors.cpf && errors.cpf.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Celular</FormLabel>
                <Input
                  type="text"
                  placeholder={"(DDD) 90000-0000"}
                  {...register("phone")}
                />
              </FormControl>
              <FormControl id="birthDate">
                <FormLabel>Data de Nascimento</FormLabel>
                <Input
                  type="date"
                  placeholder={"00/00/0000"}
                  {...register("date_of_birth")}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  placeholder={"Digitar descrição"}
                  {...register("description")}
                />
              </FormControl>
              <Text fontSize={"body1"} as={"b"} pb={"1.5rem"} pt={"1.5rem"}>
                Informações de endereço️
              </Text>
              <FormControl id="cep" isInvalid={Boolean(errors.cep)}>
                <FormLabel>CEP</FormLabel>
                <Input
                  placeholder={"00000-000"}
                  {...register("cep")}
                  onChange={handleCep}
                />
                <FormErrorMessage>
                  {errors.cep && errors.cep.message}
                </FormErrorMessage>
              </FormControl>
              <HStack>
                <Box>
                  <FormControl isReadOnly id="state">
                    <FormLabel>Estado</FormLabel>
                    <Input
                      type="text"
                      placeholder={"Digitar Estado"}
                      {...register("state")}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isReadOnly id="city">
                    <FormLabel>Cidade</FormLabel>
                    <Input
                      type="text"
                      placeholder={"Digitar cidade"}
                      {...register("city")}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="address">
                <FormLabel>Rua</FormLabel>
                <Input
                  placeholder={"Digitar logradouro"}
                  {...register("address")}
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
                    />
                    <FormErrorMessage>
                      {errors.number && errors.number.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="complement">
                    <FormLabel>Complemento</FormLabel>
                    <Input
                      type="text"
                      placeholder={"Ex: apto 3307"}
                      {...register("complement")}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <Text fontSize={"body1"} as={"b"} pb={"1.5rem"} pt={"1.5rem"}>
                Tipo de conta️
              </Text>
              <Stack direction="row" spacing={4}>
                <Button
                  bg={typeUser == "comprador" ? "brand1" : "white"}
                  color={typeUser == "comprador" ? "white" : "grey0"}
                  variant={typeUser == "comprador" ? "solid" : "outline"}
                  _hover={
                    typeUser == "comprador"
                      ? { bg: "brand1" }
                      : { bg: "grey0", color: "grey10" }
                  }
                  _focus={
                    typeUser == "comprador"
                      ? { bg: "brand1" }
                      : { bg: "brand2", color: "grey10" }
                  }
                  onClick={() => setTypeUser("comprador")}
                >
                  Comprador
                </Button>
                <Button
                  bg={typeUser == "anunciante" ? "brand1" : "white"}
                  color={typeUser == "anunciante" ? "white" : "grey0"}
                  variant={typeUser == "anunciante" ? "solid" : "outline"}
                  _hover={
                    typeUser == "anunciante"
                      ? { bg: "brand1" }
                      : { bg: "grey0", color: "grey10" }
                  }
                  _focus={
                    typeUser == "anunciante"
                      ? { bg: "brand1" }
                      : { bg: "brand2", color: "grey10" }
                  }
                  onClick={() => setTypeUser("anunciante")}
                >
                  Anunciante
                </Button>
              </Stack>
              <FormControl id="password" isInvalid={Boolean(errors.password)}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={"Digitar senha"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="confirmPassword"
                isInvalid={Boolean(errors.confirmPassword)}
              >
                <FormLabel>Confirmar Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={"Confirmar senha"}
                    {...register("confirmPassword")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword((showPassword) => !showPassword)
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"brand1"}
                  color={"white"}
                  _hover={{ bg: "brand2" }}
                  _focus={{ bg: "brand1", color: "white" }}
                  type="submit"
                >
                  Finalizar cadastro
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
