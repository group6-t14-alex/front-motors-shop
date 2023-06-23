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
import { LoginData, loginSchema } from "@/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from "@/contexts/authContext";


const LoginForm: NextPage = () => {
    const [showPassword, setShowPassword] = useState(false);    

    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting}
     } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const { loginUser } = useAuth();

    const onFormSubmit = (formData: LoginData) => {        
        loginUser(formData)
    };

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
        <form onSubmit={handleSubmit(onFormSubmit)}>
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
            <FormControl id={"email"} isInvalid={Boolean(errors.email)}>
            <FormLabel>Email</FormLabel>
                <Input
                 type={'email'} 
                 placeholder={"Digitar email"}
                 {...register("email")}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>            
            </FormControl>

            <FormControl id={"password"} isInvalid={Boolean(errors.password)}>
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

            <Link as={NextLink} href='resetPassword' 
            // Criar página para recuperar senha
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
                _hover={{ bg: "brand2"}}
                _focus={{ bg: "brand1", color: "white"}}
                mb={"1.5rem"}
            >
                Entrar
            </Button>
        </Stack>
        
        
        <Box display={"flex"} flexDirection={"column"} gap={"1.6rem"} width={"100%"} alignItems={"center"} justifyContent={"center"}>
            <Text>Ainda não possui conta ?</Text>
            <Link as={NextLink} href='signup'                
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
                bgColor={"white"}
                _hover={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
                _focus={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
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