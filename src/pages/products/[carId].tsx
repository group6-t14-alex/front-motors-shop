"use client";
import Image from 'next/image';
import {
    Text,
    Box,
    Button,
    ButtonGroup,
    Heading,    
    Avatar,
    Link,    
} from '@chakra-ui/react'

import PhotosCar from '@/components/cards/photosCarCard'
import { Footer } from '@/components/footer/footer';
import { HeaderLogged } from '@/components/header/headerLogged';
import ExpandPhotoModal from '@/components/modals/expandPhoto';
import CommentsCard from '@/components/cards/commentsCard'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import jwt_decode from "jwt-decode";
import { api } from '@/services/api'
import { useUser } from '@/contexts/userContext'
import { useRouter } from 'next/router'
import { useCarContext } from '@/contexts/carsContext'
import { useAuth } from '@/contexts/authContext';


const ProductPage = () => {
    const { idUser, setIdUser, userList, setUserList } = useUser();
    const [loading, setLoading] = useState(true);    
    const router = useRouter();
    
    const { asPath } = useRouter();
    const {car, setCar} = useCarContext()
    const { user } = useAuth();
    // console.log(user?.phone, car.model)
    
    const carId = router.query.carId;    

    useEffect(() => {        
        const getLocalToken = async () => {
            try {
            const tokenLocal = parseCookies();
            if (!tokenLocal) {
              return {
                redirect: {
                  destination: "/login",
                  permanent: false,
                },
              };
            }
            const token: any = jwt_decode(tokenLocal["@MotorsShop"]);
    
            api.get(`/user/${+token.sub}`, {
              headers: {
                Authorization: `Bearer ${tokenLocal["@MotorsShop"]}`,
              },
            })
            .then((response) => {
              setUserList(response.data);              
            })
            .then(() => {
                setLoading(false);
            });

            api.get(`/cars/${carId}`, {
            headers: {
                Authorization: `Bearer ${tokenLocal["@MotorsShop"]}`,
            },
            })
            .then((response) => {
                setCar(response.data);                
            });

        } catch (error) {
            console.log(error);
          }
        };
        getLocalToken();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleWhatsApp = (userName: string | undefined, userPhone: string | undefined, carModel: string) => {        
        const urlMessage = `Olá, ${userName} vi o seu anúncio do veículo ${carModel} no site Motors Shop! Ainda está disponível ?`;
        const urlWhatsApp = `https://wa.me/55${userPhone}/?text=${urlMessage}`;
        window.open(urlWhatsApp, '_blank');
      };
      

    return (
        <>
            <HeaderLogged />
            <Box h='100%' w='100%' display='flex' alignItems='center' flexDirection='column' bgGradient={{cel: 'linear(to-b, brand1 0%, brand1 13.5%,brand4 13.5%, brand4 100%)', desk:'linear(to-b, brand1 0%, brand1 25%,brand4 25%, brand4 100%)'}}>
                <Box w='95%' display={{ cel: "flex", desk: "grid" }} alignItems='center' flexDirection='column'>
                    <Box display='flex' flexDirection='column' w={{cel:"95%", desk:'50%'}}>
                        <ExpandPhotoModal />
                    
                        <Box  w='100%'  maxWidth='1032px' h='326px' borderRadius='4px' display='flex' marginTop='17px' bg='grey10' alignItems='flex-start' flexDirection='column' justifyContent='space-between' p='28px 48px'>
                            <Box padding='16px 0' h='224px' display='flex' flexDirection='column' justifyContent='space-between'>
                                <Heading fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1'>{car ? car.model : 'Mercedes Benz A 200 CGI ADVANCE SEDAN mercedes benz A 200'}</Heading>

                                <Box gap='32px' w={{ cel: "113px", desk: "100%" }} display='flex' flexDirection={{ cel: "column", desk: "row" }} justifyContent={{ cel: "space-between", desk: "space-between" }} alignItems='flex-start'>
                                    <ButtonGroup h='30px' w='113px' display='flex' flexDirection='row' spacing='10px'>
                                        <Button size='sm' borderRadius='4px' bg='brand4' color='brand1'>{car ? car.year : 2013}</Button>
                                        <Button size='sm' bg='brand4' color='brand1'>{car ? car.km : "0"} km</Button>
                                    </ButtonGroup>
                                    <Text color='grey1' fontWeight='500' fontSize='body1' fontFamily='heading'>R$ {car ? car.price : "00.000,00"}</Text>
                                </Box>
                            </Box>
                                           
                           <Button as={Link} onClick={() => handleWhatsApp(user?.name, user?.phone, car.model)} size='md' bg='brand1' _hover={{bg:'brand2'}} color='grey10' fontWeight='600' fontSize='14px' fontFamily='body'>Comprar</Button>
                        </Box>

                        <Box  w='100%'  maxWidth='1032px' h='320px' borderRadius='4px' p='36px 28px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-around' bg='grey10' marginTop='24px'>
                            <Heading fontFamily='heading' fontWeight='600' fontSize='20px' color='grey1' size='md'>Descrição</Heading>

                            <Text fontFamily='body' fontWeight='400' fontSize='heading7' color='grey2' h='150px'>{car ? car.description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}</Text>
                        </Box>
                    </Box>

                    <Box marginTop='45px' display= 'flex' flexDirection='column' alignItems='center' w={{ cel: "95%", desk: "40%" }} pos={{cel:'relative', desk:'absolute'}} top={{cel:'0', desk:'80px'}} right={{cel:'0px', desk:'50px'}}>
                        <Box w='100%' h='359px' borderRadius='4px' p='36px 44px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-around' bg='grey10' gap='32px'>
                            <Heading size='md' fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1'>Fotos</Heading>

                            <PhotosCar /> 
                        </Box>

                        <Box w='100%' h='398px' borderRadius='4px' p='40px 28pxpx' display='flex' flexDirection='column' alignItems='center' justifyContent='space-evenly' bg='grey10' marginTop='52px'>
                            <Box w='77px' h='77px' display='flex'  alignItems='center' justifyContent='center'>
                                <Avatar name={user?.name} w='77px' h='77px'/>
                            </Box>
                            <Heading fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1' >
                            {user?.name}
                            </Heading>
                            <Text fontFamily='body' fontWeight='400' fontSize='heading7' color='grey2' w='95%'>
                            {user?.description}
                            </Text>
                            <Button size='md' borderRadius='4px' bg='grey0' _hover={{bg:'grey1'}} color='white' fontFamily='body' fontWeight='600' fontSize='body1'>Ver todos os anuncios</Button>
                        </Box>
                    </Box>

                    <CommentsCard carId={carId}/>
                </Box>
            </Box>
            <Footer/>
        </>
    )

}

export default ProductPage