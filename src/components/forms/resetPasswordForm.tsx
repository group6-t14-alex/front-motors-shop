import {
    FormControl,
    FormLabel,
    Heading,
    Box,
    Stack,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { RecoveryPasswordData, recoveryPasswordSchema} from '@/schemas/user.schema';
import { useAuth } from '@/contexts/authContext';
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";

interface ResetPasswordProps {
    token: string;
  }

export const ResetPasswordForm = ({token}:ResetPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();

    const { 
        register,
        handleSubmit,        
        formState: { errors },
     } = useForm<RecoveryPasswordData>({
        resolver: zodResolver(recoveryPasswordSchema)
    });

    const { newPassword } = useAuth();

    const onFormSubmit = (password: RecoveryPasswordData) => {
        console.log(password);
        if (password.password != password.confirmPassword) {
            console.log("senhas diferentes");
            toast({
                position: "top-right",
                title: "Erro",
                description: "As senhas precisam ser iguais!",
                status: "error",
                duration: 6000,
                isClosable: true,
              });
        }
        console.log(password, token);
        newPassword(password, token);
      };


    return (
        <>
            <Box bgColor={"white"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}            
            width={"100%"}
            minW={{cel: "90%",desk:"24rem"}}
            maxW={{cel: "90%",desk:"34rem"}}
            height={"24rem"}
            margin={"0 auto"}
            p={"3rem"}
            mt={{cel: "3rem", desk: "7rem"}}
            mb={{cel: "4rem", desk: "7rem"}}
            boxShadow={'lg'}>
                <Heading alignSelf={"flex-start"} 
                fontSize={"heading5"} 
                fontWeight={"500"}
                fontFamily={"body"}
                lineHeight={"30px"}
                mb={"1.9rem"}>Recuperação da senha</Heading>
                <Box height={"90%"} width={"100%"} >
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <Stack height={"14rem"} display={'flex'} flexDir={'column'} justifyContent={'space-around'}>
                            {/* <FormControl id={"password"} h={'6rem'} gap={"body3"}>
                                <FormLabel>Insira sua nova senha</FormLabel>
                                <Input placeholder={"Digite sua nova senha"} {...register("password")}/>         
                            </FormControl> */}

                            {/* <FormControl id={"confirmPassword"} h={'6rem'} gap={"body3"}>
                                <FormLabel>Confirmação de senha</FormLabel>
                                <Input placeholder={"Digite novamente a senha"} {...register("confirmPassword")}/>         
                            </FormControl> */}

                        <FormControl id="password" isInvalid={Boolean(errors.password)} h={'6rem'} gap={"body3"}>
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
                            h={'6rem'} gap={"body3"}
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

                            <Box display={'flex'} justifyContent={'flex-end'}
                            gap={'1rem'} alignItems={'center'}>
                                <Button type='submit' bg={'brand1'} fontFamily={"inter"} color={'white'} _hover={{ bg: "brand2"}} _focus={{ bg: "brand1", color: "white"}}>Atualizar senha</Button>
                            </Box>
                            
                        </Stack>
                    </form>
                </Box>
            </Box>
        </>
    )
}