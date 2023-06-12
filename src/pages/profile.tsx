'use client';
import { Footer } from "@/components/footer/footer"
import { HeaderLogged } from "@/components/header/headerLogged"
import CreateAd from "@/components/modals/createAd";
import { Avatar, Box, Button, Heading, List, Text } from "@chakra-ui/react"

const Profile = () => {

    return (
        <>
            <HeaderLogged />
            <Box h='100%' w='100%' display='flex' alignItems='center' flexDirection='column' bgGradient={{cel: 'linear(to-b, brand1 0%, brand1 23%,brand4 23%, brand4 100%)', desk:'linear(to-b, brand1 0%, brand1 11%,brand4 11%, brand4 100%)'}}>
                <Box w={{cel:'92%', desk:'80%'}} h={{cel:'465px', desk:'400px'}} p={'40px 29px'} marginTop={{cel: '65px', desk:'75px'}} borderRadius={'4px'} display={{cel: 'flex', desk:'flex'}} flexDirection={{cel: 'column', desk:'column'}} alignItems={{cel: 'flex-start', desk:'flex-start'}} bg={'grey10'} gap={'16px'} justifyContent={'space-between'} marginBottom={'12px'}>
                    <Box h={'317px'} display={'flex'} flexDirection={'column'} gap={'16px'}>
                        <Avatar size={'xl'} name="Samuel Leão"/>

                        <Box display={'flex'} flexDirection={'row'} gap={'15px'}>
                            <Heading fontFamily={'heading'} fontWeight={'600'} fontSize={'heading6'} color={'grey1'}>Samuel Leão</Heading>
                            <Text p={'4px 8px'} bg={'brand4'} color={'brand1'}fontFamily={'body'} fontWeight={'500'} fontSize={'body2'} borderRadius={'4px'}>Anunciante</Text>
                        </Box>
                            <Text color={'grey2'} fontFamily={'body'} fontWeight={'400'} fontSize={'body1'}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim maxime possimus debitis, quae earum aliquid, quo aspernatur nobis laborum alias assumenda eligendi necessitatibus repellat accusamus nemo voluptatibus sit beatae et.
                            </Text>
                    </Box>
                    
                    <CreateAd />
                </Box>

                <Box h={{cel:'498px', desk:'1900px'}}>
                    <List>

                    </List>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Profile