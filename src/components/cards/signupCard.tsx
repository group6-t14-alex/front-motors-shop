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
  Link, Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [typeUser, setTypeUser] = useState('buyer');

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'grey9'}>
      <form >
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
              <FormControl id="name" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input type="text" placeholder={'Ex. Samuel Leão'}/>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder={'Ex: samuel@kenzie.com.br'} />
              </FormControl>
              <FormControl id="cpf" isRequired>
                <FormLabel>CPF</FormLabel>
                <Input type="text" placeholder={'000.000.000-00'} />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Celular</FormLabel>
                <Input type="text" placeholder={'(DDD) 90000-0000'}/>
              </FormControl>
              <FormControl id="birthDate" isRequired>
                <FormLabel>Data de Nascimento</FormLabel>
                <Input type="date" placeholder={'00/00/0000'}/>
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Descrição</FormLabel>
                <Textarea placeholder={'Digitar descrição'}/>
              </FormControl>
              <Text fontSize={'body1'} as={'b'} pb={'1.5rem'} pt={'1.5rem'}>
                Informações de endereço️
              </Text>
              <FormControl id="cep" isRequired>
                <FormLabel>CEP</FormLabel>
                <Input placeholder={'00000-000'}/>
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="state" isRequired>
                    <FormLabel>Estado</FormLabel>
                    <Input type="text" placeholder={'Digitar Estado'} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city">
                    <FormLabel>Cidade</FormLabel>
                    <Input type="text" placeholder={'Digitar cidade'} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="address" isRequired>
                <FormLabel>Rua</FormLabel>
                <Input placeholder={'Digitar logradouro'}/>
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="number" isRequired>
                    <FormLabel>Número</FormLabel>
                    <Input type="text" placeholder={'Digitar número'} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="complement">
                    <FormLabel>Complemento</FormLabel>
                    <Input type="text" placeholder={'Ex: apto 3307'} />
                  </FormControl>
                </Box>
              </HStack>
              <Text fontSize={'body1'} as={'b'} pb={'1.5rem'} pt={'1.5rem'}>
                Tipo de conta️
              </Text>
              <Stack direction='row' spacing={4}>
                <Button
                  bg={typeUser == 'buyer' ? 'brand1' : 'white'}
                  color={typeUser == 'buyer' ? 'white' : 'black'}
                  variant={typeUser == 'buyer' ? 'solid' : 'outline'}
                  onClick={() =>
                    setTypeUser('buyer')
                  }
                >
                  Comprador
                </Button>
                <Button
                  bg={typeUser == 'seller' ? 'brand1' : 'white'}
                  color={typeUser == 'seller' ? 'white' : 'black'}
                  variant={typeUser == 'seller' ? 'solid' : 'outline'}
                  onClick={() =>
                    setTypeUser('seller')
                  }
                >
                  Anunciante
                </Button>
              </Stack>
              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} placeholder={'Digitar senha'} />
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
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirmar Senha</FormLabel>
                <InputGroup>
                  <Input type={showConfirmPassword ? 'text' : 'password'} placeholder={'Confirmar senha'}/>
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
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'brand1'}
                  color={'white'}
                  _hover={{
                    bg: 'brand3',
                  }}>
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
