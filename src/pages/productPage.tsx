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

import carro from "../assets/cars/imgExample.png"
import PhotosCar from '@/components/cards/photosCard'

const ProductPage = () => {


    return (
        <>
            <Box h='80px' w='100%' bg="grey.0">

            </Box>
            <Box h='100%' w='100%' bg='brand.4' display='flex' alignItems='center' flexDirection='column'>
                <Box w='99%' bg='brand.1' display={{ cel: "flex", desk: "grid" }} alignItems='center' flexDirection='column' bgGradient=' linear(to-b, brand.1 0%, brand.1 13.5%,brand.4 13.5%, brand.4 100%)' margin='0 auto'>
                    <Box display='flex' flexDirection='column' w={{cel:"100%", desk:'50%'}}>
                    <Box h='355px'  w='100%'  maxWidth='1032px' bg="grey.10" marginTop='45px' borderRadius='4px' display='flex' alignItems='center' justifyContent='center'>
                        <Image src={carro} alt='Mercedes benz A'/>
                    </Box>

                    <Box  w='100%'  maxWidth='1032px' h='326px' borderRadius='4px' display='flex' marginTop='17px' bg='grey.10' alignItems='flex-start' flexDirection='column' justifyContent='space-between' p='28px 48px'>
                        <Box padding='16px 0' h='224px' display='flex' flexDirection='column' justifyContent='space-between'>
                            <Text fontFamily='font.heading' fontWeight='600' fontSize='20px' color='grey.1'>Mercedes Benz A 200 CGI ADVANCE SEDAN mercedes benz A 200</Text>

                            <Box gap='32px' w={{ cel: "113px", desk: "100%" }} display='flex' flexDirection={{ cel: "column", desk: "row" }} justifyContent={{ cel: "space-between", desk: "space-between" }} alignItems='flex-start'>
                                <ButtonGroup h='30px' w='113px' display='flex' flexDirection='row' spacing='10px'>
                                    <Button size='sm' borderRadius='4px' bg='brand.4' color='brand.1'>2013</Button>
                                    <Button size='sm' bg='brand.4' color='brand.1'>0 km</Button>
                                </ButtonGroup>
                                <Text color='grey.1' fontWeight='500' fontSize='16px' fontFamily='font.heading'>R$ 00.000,00</Text>
                            </Box>
                        </Box>
                
                        <Button size='md' bg='brand.1' color='grey.10' fontWeight='600' fontSize='14px' fontFamily='font.body'>Comprar</Button>
                    </Box>

                    <Box  w='100%'  maxWidth='1032px' h='320px' borderRadius='4px' p='36px 28px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-around' bg='grey.10' marginTop='24px'>
                        <Heading fontFamily='font.heading' fontWeight='600' fontSize='20px' color='grey.1' size='md'>Descrição</Heading>

                        <Text fontFamily='font.body' fontWeight='400' fontSize='16px' color='grey.2' h='150px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                    </Box>
                    </Box>


                    <Box marginTop='45px' display= 'flex' flexDirection='column' alignItems='center' w={{ cel: "100%", desk: "40%" }} pos={{cel:'relative', desk:'absolute'}} top={{cel:'0', desk:'80px'}} right={{cel:'0px', desk:'50px'}}>
                        <Box w='100%' h='359px' borderRadius='4px' p='36px 44px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-around' bg='grey.10' gap='32px'>
                            <Heading size='md' fontFamily='font.heading' fontWeight='600' fontSize='20px' color='grey.1'>Fotos</Heading>

                            <PhotosCar /> 
                        </Box>

                        <Box w='100%' h='398px' borderRadius='4px' p='40px 28pxpx' display='flex' flexDirection='column' alignItems='center' justifyContent='space-evenly' bg='grey.10' marginTop='52px'>
                            <Box w='77px' h='77px' display='flex'  alignItems='center' justifyContent='center'>
                                <Avatar name='Samuel Leão' w='77px' h='77px'/>
                            </Box>
                            <Heading fontFamily='font.heading' fontWeight='600' fontSize='20px' color='grey.1' >
                            Samuel Leão
                            </Heading>
                            <Text fontFamily='font.body' fontWeight='400' fontSize='16px' color='grey.2' w='95%'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et enim reprehenderit quam ad quaerat voluptate aut, distinctio iste numquam.
                            </Text>
                            <Button size='md' borderRadius='4px' bg='grey.0' color='white' fontFamily='font.body' fontWeight='600' fontSize='16px'>Ver todos os anuncios</Button>
                        </Box>
                    </Box>

                    <Box display='flex' flexDirection='column' w={{cel:"100%", desk:'50%'}}>
                    <Box h='845px'  w='100%'  maxWidth='1032px' borderRadius='4px' p='36px 28px' bg='grey.10' marginTop='18px' display='flex' flexDirection='column' gap='13px'>
                        <Heading fontFamily='font.heading' fontWeight='600' fontSize='20px' color='grey.1'>Comentários</Heading>

                        <List h='724px' maxH='724px' display='flex' flexDirection='column' alignItems='flex-start' gap='44px' overflowY='auto'>

                            <ListItem w='95%' h='212px' borderRadius='4px' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around' bg='grey.10' gap='12px'>
                                <Box display='flex' flexDirection='row' alignItems='center'>
                                    <Box display='flex' flexDirection='row' alignItems='center' w='146px' h='32px' gap='8px'>
                                        <Avatar size='sm' name='Júlia Lima'/>
                                        <Heading size='sm' fontFamily='font.body' fontWeight='500' fontSize='14px' color='grey.1'> Júlia Lima </Heading> 
                                    </Box>
                        
                                    <UnorderedList>
                                        <ListItem fontFamily='font.body' fontWeight='400' fontSize='12px' color='grey.3'>há 3 dias</ListItem>
                                    </UnorderedList>
                                    
                                </Box>

                                <Text fontFamily='font.body' fontWeight='400' fontSize='14px' color='grey.2'  h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                            
                            </ListItem>

                            <ListItem w='95%' h='212px' borderRadius='4px' bg='grey.10' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around' gap='12px'>
                                <Box display='flex' flexDirection='row' alignItems='center'>
                                    <Box display='flex' flexDirection='row' alignItems='center' w='146px' h='32px' gap='8px'>
                                        <Avatar size='sm' name='Marcos Antônio'/>
                                        <Heading size='sm' fontFamily='font.body' fontWeight='500' fontSize='14px' color='grey.1'> Marcos Antônio </Heading> 
                                    </Box>
                        
                                    <UnorderedList>
                                        <ListItem fontFamily='font.body' fontWeight='400' fontSize='12px' color='grey.3'>há 7 dias</ListItem>
                                    </UnorderedList>
                                </Box>

                                <Text fontFamily='font.body' fontWeight='400' fontSize='14px' color='grey.2' h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                            </ListItem>

                            <ListItem gap='12px'
                            bg='grey.10' w='95%' h='212px' borderRadius='4px' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around'>
                                <Box display='flex' flexDirection='row' alignItems='center'>
                                    <Box display='flex' flexDirection='row' alignItems='center' w='146px' h='32px' gap='8px'>
                                        <Avatar size='sm' name='Camila Silva'/>
                                        <Heading size='sm' fontFamily='font.body' fontWeight='500' fontSize='14px' color='grey.1'> Camila Silva </Heading> 
                                    </Box>
                        
                                    <UnorderedList>
                                        <ListItem fontFamily='font.body' fontWeight='400' fontSize='12px' color='grey.3'>há 1 mês</ListItem>
                                    </UnorderedList>
                                </Box>

                                <Text fontFamily='font.body' fontWeight='400' fontSize='14px' color='grey.2' h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                            </ListItem>

                            <ListItem w='95%' h='212px' borderRadius='4px' display='flex' alignItems='flex-start' flexDirection='column' justifyContent='space-around' bg='grey.10' gap='12px'>
                                <Box display='flex' flexDirection='row' alignItems='center' h='32px'>
                                    <Box display='flex' flexDirection='row' alignItems='center' w='146px' gap='8px'>
                                        <Avatar size='sm' name='Júlia Lima'/>
                                        <Heading size='sm' fontFamily='font.body' fontWeight='500' fontSize='14px' color='grey.1'> Júlia Lima </Heading> 
                                    </Box>
                        
                                    <UnorderedList>
                                        <ListItem fontFamily='font.body' fontWeight='400' fontSize='12px' color='grey.3'>há 3 dias</ListItem>
                                    </UnorderedList>
                                    
                                </Box>

                                <Text fontFamily='font.body' fontWeight='400' fontSize='14px' color='grey.2' h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                            
                            </ListItem>

                        </List>
                    </Box>

                    <Box h='414px' w='100%' maxWidth='1032px' borderRadius='4px' bg='grey.10' p='36px 26px' marginTop='42px' display='flex' flexDirection='column' gap='24px' marginBottom='45px'>
                        <Box w='130px' h='32px' display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                            <Avatar h='32px' w='32px' name='Sammuel Leão'/>
                            <Text>Samuel Leão</Text>
                        </Box>

                        <FormControl h='275px' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-between'>
                            <Textarea bg='grey.10' outline='1px solid grey.7' borderRadius='4px' h='100px' placeholder='Carro muito confortável, foi uma ótima experiência de compra...'/>

                            <Button size='sm' bg='brand.1' color='white' fontSize='14px' fontWeight='600' fontFamily='font.body' pos={{ cel: 'relative', desk: "absolute" }} right={{desk: '11px'}} bottom={{desk: '183px'}}>Comentar</Button>
                        
                        
                            <Grid templateColumns='repeat(2, 1fr)'  alignItems='flex-start' justifyItems='start' h='76px' gap='8px'>
                                <Button fontSize='12px' fontWeight='500' fontFamily='font.body' p='0 12px' borderRadius='24px' bg='grey.7' color='grey.3'>Gostei muito!</Button>
                                <Button fontSize='12px' fontWeight='500' fontFamily='font.body' p='0 12px' borderRadius='24px' bg='grey.7' color='grey.3'>Incrível</Button>
                                <Button fontSize='12px' fontWeight='500' fontFamily='font.body' p='0 12px' borderRadius='24px' bg='grey.7' color='grey.3'>Recomendarei para meus amigos</Button>
                            </Grid>
                        
                        </FormControl>
                    </Box>
                    </Box>

                </Box>
            </Box>
            <Box h='310px' w='100%' bg="grey.0">

            </Box>
        </>
    )

}

export default ProductPage