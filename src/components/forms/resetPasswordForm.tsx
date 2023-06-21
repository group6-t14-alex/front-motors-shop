import {
    FormControl,
    FormLabel,
    Heading,
    Box,
    Stack,
    Input,
    Button
} from '@chakra-ui/react'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { RecoveryPasswordData, recoveryPasswordSchema} from '@/schemas/user.schema';
import { useAuth } from '@/contexts/authContext';

interface ResetPasswordProps {
    token: string;
  }

export const ResetPasswordForm = ({token}:ResetPasswordProps) => {

    const { 
        register,
        handleSubmit
     } = useForm<RecoveryPasswordData>({
        resolver: zodResolver(recoveryPasswordSchema)
    });

    const { newPassword } = useAuth();

    const onFormSubmit = (password: RecoveryPasswordData) => {
        console.log(password);
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
                            <FormControl id={"email"} h={'6rem'} gap={"body3"}>
                                <FormLabel>Insira sua nova senha</FormLabel>
                                <Input placeholder={"Digite sua nova senha"} {...register("password")}/>         
                            </FormControl>

                            <FormControl id={"email"} h={'6rem'} gap={"body3"}>
                                <FormLabel>Confirmação de senha</FormLabel>
                                <Input placeholder={"Digite novamente a senha"} {...register("confirmPassword")}/>         
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