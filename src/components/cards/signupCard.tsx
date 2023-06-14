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
  Link, Textarea, FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {useForm} from "react-hook-form";
import {UserRequest, userSchemaRequest} from "@/schemas/user.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/contexts/authContext";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [typeUser, setTypeUser] = useState('buyer');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRequest>({
    resolver: zodResolver(userSchemaRequest)
  });

  const { registerUser  } = useAuth();

  const onFormSubmit = (formData: UserRequest) => {
    console.log(formData);
    formData.type_user = typeUser;
    registerUser(formData);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'grey9'}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack>
              <Heading fontSize={'heading5'} pb={'1.5rem'} pt={'1.5rem'}>
                Cadastro
              </Heading>
              <Text fontSize={'body1'} as={'b'} pb={'1.5rem'}>
                Informações pessoais️
              </Text>
            </Stack>
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={Boolean(errors.name)}>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  placeholder={'Ex. Samuel Leão'}
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
                  placeholder={'Ex: samuel@kenzie.com.br'}
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
                  placeholder={'000.000.000-00'}
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
                  placeholder={'(DDD) 90000-0000'}
                  {...register("phone")}
                />
              </FormControl>
              <FormControl id="birthDate">
                <FormLabel>Data de Nascimento</FormLabel>
                <Input
                  type="date"
                  placeholder={'00/00/0000'}
                  {...register("date_of_birth")}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  placeholder={'Digitar descrição'}
                  {...register("description")}
                />
              </FormControl>
              <Text fontSize={'body1'} as={'b'} pb={'1.5rem'} pt={'1.5rem'}>
                Informações de endereço️
              </Text>
              <FormControl id="cep" isInvalid={Boolean(errors.cep)}>
                <FormLabel>CEP</FormLabel>
                <Input
                  placeholder={'00000-000'}
                  {...register("cep")}
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
                      placeholder={'Digitar Estado'}
                      {...register("state")}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city" isReadOnly={true}>
                    <FormLabel>Cidade</FormLabel>
                    <Input
                      type="text"
                      placeholder={'Digitar cidade'}
                      {...register("city")}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="address" isReadOnly={true}>
                <FormLabel>Rua</FormLabel>
                <Input
                  placeholder={'Digitar logradouro'}
                  {...register("address")}
                />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="number" isInvalid={Boolean(errors.number)}>
                    <FormLabel>Número</FormLabel>
                    <Input
                      type="text"
                      placeholder={'Digitar número'}
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
                      placeholder={'Ex: apto 3307'}
                      {...register("complement")}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <Text fontSize={'body1'} as={'b'} pb={'1.5rem'} pt={'1.5rem'}>
                Tipo de conta️
              </Text>
              <Stack direction='row' spacing={4}>
                <Button
                  bg={typeUser == 'buyer' ? 'brand1' : 'white'}
                  color={typeUser == 'buyer' ? 'white' : 'grey0'}
                  variant={typeUser == 'buyer' ? 'solid' : 'outline'}
                  _hover={typeUser == 'buyer' ? { bg: "brand1" } : { bg: "grey0", color: "grey10" }}
                  _focus={typeUser == 'buyer' ? { bg: "brand1" } : { bg: "brand2", color: "grey10" }}
                  onClick={() =>
                    setTypeUser('buyer')
                  }
                >
                  Comprador
                </Button>
                <Button
                  bg={typeUser == 'seller' ? 'brand1' : 'white'}
                  color={typeUser == 'seller' ? 'white' : 'grey0'}
                  variant={typeUser == 'seller' ? 'solid' : 'outline'}
                  _hover={typeUser == 'seller' ? { bg: "brand1" } : { bg: "grey0", color: "grey10" }}
                  _focus={typeUser == 'seller' ? { bg: "brand1" } : { bg: "brand2", color: "grey10" }}
                  onClick={() =>
                    setTypeUser('seller')
                  }
                >
                  Anunciante
                </Button>
              </Stack>
              <FormControl id="password" isInvalid={Boolean(errors.password)}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={'Digitar senha'}
                    {...register("password")}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="confirmPassword" isInvalid={Boolean(errors.confirmPassword)}>
                <FormLabel>Confirmar Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={'Confirmar senha'}
                    {...register("confirmPassword")}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowConfirmPassword((showPassword) => !showPassword)
                      }>
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
                  bg={'brand1'}
                  color={'white'}
                  _hover={{ bg: "brand2"}}
                  _focus={{ bg: "brand1", color: "white"}}
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
