import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Box,
    Stack,
    Input,
    Button,
    Link
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { SendingEmailData, sendingEmailSchema } from '@/schemas/user.schema';
import { useAuth } from '@/contexts/authContext';

export const RecoveryEmailForm = () => {

    const { 
        register,
        handleSubmit,
        formState: { errors}
     } = useForm<SendingEmailData>({
        resolver: zodResolver(sendingEmailSchema)
    });

    const { sendEmail } = useAuth();

    const onFormSubmit = (formData: SendingEmailData) => {        
        sendEmail(formData);
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
                mb={"1.9rem"}>Encontre sua conta</Heading>
                <Box height={"90%"} width={"100%"} >
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <Stack height={"14rem"} display={'flex'} flexDir={'column'} justifyContent={'space-around'}>
                            <FormControl id={"email"} isInvalid={Boolean(errors.email)} h={'6rem'} gap={"body3"}>
                                <FormLabel>Insira seu e-mail para a recuperação da senha</FormLabel>
                                <Input type={'email'} placeholder={"Digitar email"} {...register("email")}/>
                                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>            
                            </FormControl>

                            <Box display={'flex'} justifyContent={'flex-end'}
                            gap={'1rem'} alignItems={'center'}>
                                <Link as={NextLink} href='login' fontFamily={"inter"} fontWeight={"600"}fontSize={"body1"} color={"grey2"} _hover={{ fontStyle: "none" }}>Cancelar</Link>
                                <Button type='submit' bg={'brand1'} fontFamily={"inter"} color={'white'} _hover={{ bg: "brand2"}} _focus={{ bg: "brand1", color: "white"}}>Enviar</Button>
                            </Box>
                            
                        </Stack>
                    </form>
                </Box>
            </Box>
        </>
    )
}
