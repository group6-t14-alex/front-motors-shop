import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Box, Button, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Heading,
    Link
  } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const LoginForm: NextPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const handleInputEmailChange = (e: any) => setEmailInput(e.target.value)
    const handlePasswordChange = (e: any) => setPasswordInput(e.target.value)

    const isError = emailInput === ''

    return (
        <>        
        <Box
            bgColor={"white"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}            
            width={"100%"}
            minW={"20rem"}
            maxW={"25.75rem"}
            height={"33.9rem"}
            margin={"0 auto"}
            p={"3rem"}
            mt={{cel: "3.1rem", desk: "7.5rem"}}
            mb={{cel: "4.4rem", desk: "7.5rem"}}
            boxShadow={'lg'}
        >
        <form>
        <Heading
            alignSelf={"flex-start"} 
            fontSize={"heading5"} 
            fontWeight={"500"}
            fontFamily={"body"}
            lineHeight={"30px"}
            mb={"1.9rem"}
        >Login
        </Heading>
        
        <Stack spacing={4} display={"flex"} width={"100%"}>
            <FormControl id={"email"} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type={'email'} placeholder={"Digitar email"} 
            //   value={emailInput} onChange={handleInputEmailChange}
            />
            {/* {!isError ? (
                <FormHelperText>
                Enter the ema
                </FormHelperText>
            ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
            )}            */}
            </FormControl>

            <FormControl id={"password"} isRequired>
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

            <Link
              fontFamily={"inter"}
              fontWeight={"500"}
              fontSize={"body2"}
              alignSelf={"flex-end"}
              color={"grey2"}
              _hover={{ fontStyle: "none" }}
            >Esqueci minha senha
            </Link>
            
            <Button
                type={"submit"}
                bgColor={"brand1"}
                border={"solid 1.5px brand1"}
                width={"100%"}
                height={"3rem"}
                color={"white"}
                _hover={{ bg: "brand1"}}
                mb={"1.5rem"}
            >
                Entrar
            </Button>
        </Stack>
        
        
        <Box display={"flex"} flexDirection={"column"} gap={"1.6rem"} width={"100%"} alignItems={"center"} justifyContent={"center"}>
            <Text>Ainda não possui conta ?</Text>
            <Link as={NextLink} href='/'                
                border={"solid 1.5px #adb5bd"}
                borderRadius={"4px"}            
                p={"12px 28px"}
                width={"100%"}                
                textAlign={"center"}
                textDecoration={"none"}
                fontWeight={"600"}
                fontSize={"heading7"}
                fontFamily={"body"}
                fontStyle={"normal"}
                _hover={{ fontStyle: "none" }}
            >
                Cadastrar
            </Link>
        </Box>
        </form>
        </Box>
        </>
    )
}

export default LoginForm