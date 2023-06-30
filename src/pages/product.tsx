"use client";
import Image from 'next/image';
import {
    Text,
    Box,
    Button,
    ButtonGroup,
    Heading,
    Grid,
    Avatar,
    ListItem,
    List,
    UnorderedList,
    Textarea,
    FormControl
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


const ProductPage = () => {
    const { idUser, setIdUser, userList, setUserList } = useUser();
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();
    const id = router.query.id;

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
          } catch (error) {
            console.log(error);
          }
        };
        getLocalToken();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    

    return (
        <>
            <HeaderLogged />
            <Box h='100%' w='100%' display='flex' alignItems='center' flexDirection='column' bgGradient={{cel: 'linear(to-b, brand1 0%, brand1 13.5%,brand4 13.5%, brand4 100%)', desk:'linear(to-b, brand1 0%, brand1 25%,brand4 25%, brand4 100%)'}}>
                <Box w='95%' display={{ cel: "flex", desk: "grid" }} alignItems='center' flexDirection='column'>
                    <Box display='flex' flexDirection='column' w={{cel:"95%", desk:'50%'}}>
                        <ExpandPhotoModal />
                    
                        <Box  w='100%'  maxWidth='1032px' h='326px' borderRadius='4px' display='flex' marginTop='17px' bg='grey10' alignItems='flex-start' flexDirection='column' justifyContent='space-between' p='28px 48px'>
                            <Box padding='16px 0' h='224px' display='flex' flexDirection='column' justifyContent='space-between'>
                                <Heading fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1'>Mercedes Benz A 200 CGI ADVANCE SEDAN mercedes benz A 200</Heading>

                                <Box gap='32px' w={{ cel: "113px", desk: "100%" }} display='flex' flexDirection={{ cel: "column", desk: "row" }} justifyContent={{ cel: "space-between", desk: "space-between" }} alignItems='flex-start'>
                                    <ButtonGroup h='30px' w='113px' display='flex' flexDirection='row' spacing='10px'>
                                        <Button size='sm' borderRadius='4px' bg='brand4' color='brand1'>2013</Button>
                                        <Button size='sm' bg='brand4' color='brand1'>0 km</Button>
                                    </ButtonGroup>
                                    <Text color='grey1' fontWeight='500' fontSize='body1' fontFamily='heading'>R$ 00.000,00</Text>
                                </Box>
                            </Box>
                
                        <Button size='md' bg='brand1' _hover={{bg:'brand2'}} color='grey10' fontWeight='600' fontSize='14px' fontFamily='body'>Comprar</Button>
                        </Box>

                        <Box  w='100%'  maxWidth='1032px' h='320px' borderRadius='4px' p='36px 28px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-around' bg='grey10' marginTop='24px'>
                            <Heading fontFamily='heading' fontWeight='600' fontSize='20px' color='grey1' size='md'>Descrição</Heading>

                            <Text fontFamily='body' fontWeight='400' fontSize='heading7' color='grey2' h='150px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </Box>
                    </Box>

                    <Box marginTop='45px' display= 'flex' flexDirection='column' alignItems='center' w={{ cel: "95%", desk: "40%" }} pos={{cel:'relative', desk:'absolute'}} top={{cel:'0', desk:'80px'}} right={{cel:'0px', desk:'50px'}}>
                        <Box w='100%' h='359px' borderRadius='4px' p='36px 44px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-around' bg='grey10' gap='32px'>
                            <Heading size='md' fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1'>Fotos</Heading>

                            <PhotosCar /> 
                        </Box>

                        <Box w='100%' h='398px' borderRadius='4px' p='40px 28pxpx' display='flex' flexDirection='column' alignItems='center' justifyContent='space-evenly' bg='grey10' marginTop='52px'>
                            <Box w='77px' h='77px' display='flex'  alignItems='center' justifyContent='center'>
                                <Avatar name='Samuel Leão' w='77px' h='77px'/>
                            </Box>
                            <Heading fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1' >
                            Samuel Leão
                            </Heading>
                            <Text fontFamily='body' fontWeight='400' fontSize='heading7' color='grey2' w='95%'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et enim reprehenderit quam ad quaerat voluptate aut, distinctio iste numquam.
                            </Text>
                            <Button size='md' borderRadius='4px' bg='grey0' _hover={{bg:'grey1'}} color='white' fontFamily='body' fontWeight='600' fontSize='body1'>Ver todos os anuncios</Button>
                        </Box>
                    </Box>

                    <Box display='flex' flexDirection='column' w={{cel:"95%", desk:'50%'}}>
                        <Box h='845px'  w='100%'  maxWidth='1032px' borderRadius='4px' p='36px 28px' bg='grey10' marginTop='18px' display='flex' flexDirection='column' gap='13px'>
                            <Heading fontFamily='heading' fontWeight='600' fontSize='heading6' color='grey1'>Comentários</Heading>

                            <List h='724px' maxH='724px' display='flex' flexDirection='column' alignItems='flex-start' gap='44px' overflowY='auto'>

                                <ListItem w='95%' h='212px' borderRadius='4px' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around' bg='grey10' gap='body3'>
                                    <Box display='flex' flexDirection='row' alignItems='center'>
                                        <Box display='flex' flexDirection='row' alignItems='center' w='146px' h='32px' gap='8px'>
                                            <Avatar size='sm' name='Júlia Lima'/>
                                            <Heading size='sm' fontFamily='body' fontWeight='500' fontSize='body2' color='grey1'> Júlia Lima </Heading> 
                                        </Box>
                        
                                        <UnorderedList>
                                            <ListItem fontFamily='body' fontWeight='400' fontSize='body3' color='grey3'>há 3 dias</ListItem>
                                        </UnorderedList>
                                    
                                    </Box>

                                <Text fontFamily='body' fontWeight='400' fontSize='body2' color='grey2'  h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                            
                                </ListItem>

                                <ListItem w='95%' h='212px' borderRadius='4px' bg='grey10' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around' gap='body3'>
                                    <Box display='flex' flexDirection='row' alignItems='center'>
                                        <Box display='flex' flexDirection='row' alignItems='center' w='146px' h='32px' gap='8px'>
                                            <Avatar size='sm' name='Marcos Antônio'/>
                                            <Heading size='sm' fontFamily='body' fontWeight='500' fontSize='body2' color='grey1'> Marcos Antônio </Heading> 
                                        </Box>
                        
                                        <UnorderedList>
                                            <ListItem fontFamily='body' fontWeight='400' fontSize='body3' color='grey3'>há 7 dias</ListItem>
                                        </UnorderedList>
                                    </Box>

                                    <Text fontFamily='body' fontWeight='400' fontSize='body2' color='grey.2' h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </ListItem>

                                <ListItem gap='body3'
                            bg='grey10' w='95%' h='212px' borderRadius='4px' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around'>
                                    <Box display='flex' flexDirection='row' alignItems='center'>
                                        <Box display='flex' flexDirection='row' alignItems='center' w='146px' h='32px' gap='8px'>
                                            <Avatar size='sm' name='Camila Silva'/>
                                            <Heading size='sm' fontFamily='body' fontWeight='500' fontSize='body2' color='grey1'> Camila Silva </Heading> 
                                        </Box>
                        
                                        <UnorderedList>
                                            <ListItem fontFamily='body' fontWeight='400' fontSize='body3' color='grey3'>há 1 mês</ListItem>
                                        </UnorderedList>
                                    </Box>

                                    any      <Text fontFamily='body' fontWeight='400' fontSize='body2' color='grey2' h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </ListItem>

                                <ListItem w='95%' h='212px' borderRadius='4px' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around' bg='grey10' gap='body3'>
                                    <Box display='flex' flexDirection='row' alignItems='center' h='32px'>
                                        <Box display='flex' flexDirection='row' alignItems='center' w='146px' gap='8px'>
                                            <Avatar size='sm' name='Júlia Lima'/>
                                            <Heading size='sm' fontFamily='body' fontWeight='500' fontSize='body2' color='grey1'> Júlia Lima </Heading> 
                                        </Box>
                        
                                        <UnorderedList>
                                            <ListItem fontFamily='body' fontWeight='400' fontSize='body3' color='grey3'>há 3 dias</ListItem>
                                        </UnorderedList>
                                    
                                    </Box>

                                    <Text fontFamily='body' fontWeight='400' fontSize='body2' color='grey2' h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                            
                                </ListItem>

                            </List>
                        </Box>

                        <Box h='414px' w='100%' maxWidth='1032px' borderRadius='4px' bg='grey10' p='36px 26px' marginTop='42px' display='flex' flexDirection='column' gap='24px' marginBottom='45px'>
                            <Box w='130px' h='32px' display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                                <Avatar h='32px' w='32px' name='Sammuel Leão'/>
                                <Text fontSize='body2' fontWeight='500'>Samuel Leão</Text>
                            </Box>

                            <FormControl h='275px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-between'>
                                <Textarea bg='grey10' outline='1px solid grey7' borderRadius='4px' h='100px' placeholder='Carro muito confortável, foi uma ótima experiência de compra...'/>

                       
                                <Button size='sm' bg='brand1' color='white' fontSize='body2' fontWeight='600' fontFamily='body' pos={{ cel: 'relative', desk: "absolute" }} right={{desk: '11px'}} bottom={{desk: '183px'}} _hover={{bg:'brand2'}}>Comentar</Button>
               
                        
                        
                                <Grid templateColumns='repeat(2, 1fr)'  alignItems='flex-start' justifyItems='start' h='76px' gap='8px'>
                                    <Button fontSize='body3' fontWeight='500' fontFamily='body' p='0 12px' borderRadius='24px' bg='grey7' color='grey3'>Gostei muito!</Button>
                                    <Button fontSize='body3' fontWeight='500' fontFamily='body' p='0 12px' borderRadius='24px' bg='grey7' color='grey3'>Incrível</Button>
                                    <Button fontSize='body3' fontWeight='500' fontFamily='body' p='0 12px' borderRadius='24px' bg='grey7' color='grey3'>Recomendarei para meus amigos</Button>
                                </Grid>
                        
                            </FormControl>
                        </Box>
                    </Box>

                    <CommentsCard carId={id}/>
         
                </Box>
            </Box>
            <Footer/>
        </>
    )

}

export default ProductPage