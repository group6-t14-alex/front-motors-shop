"use client";
import { Footer } from "@/components/footer/footer";
import { HeaderLogged } from "@/components/header/headerLogged";
import CreateAd from "@/components/modals/createAd";
import {Avatar, Box, Heading, Grid, Text, List, Button, Link,} from "@chakra-ui/react"
import { useContext, useEffect, useState } from 'react'
import { NextPage, GetServerSideProps } from "next";
import nookies, { parseCookies } from "nookies";
import { useToast } from "@chakra-ui/toast";
import { UserInterface } from "@/interfaces/user.interface";
import CardUser from "@/components/cards/userCard";
import { AuthContext } from '@/contexts/authContext'
import { useCarContext } from '@/contexts/carsContext'
import { api } from '@/services/api'
import { CarDataReturn } from '@/schemas/car.schema'
import ProfileCardUser from "@/components/cards/profileUserCards";              

export const getServerSideProps: GetServerSideProps = async (props) => {
  const cookies = parseCookies(props);
  
  if (!cookies["@MotorsShop"]) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (cookies["@MotorsShop"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
  }

  const response = await api.get<CarDataReturn[]>("/cars");
  return {
    props: { cars: response.data },
  };
};

interface ProfileInterface {
  cars: CarDataReturn[];
}

const Profile: NextPage<any> = ({ cars }) => {
  const { user }: any = useContext(AuthContext);
  const { userCars, setUserCars }: any = useCarContext();

  useEffect(() => {

    const getUserCars = async () => {
        try {
            const response = await api.get(`/user/${user?.id}`)                
            
            if(response.data){
                setUserCars(response.data.car)
            }
  
        } catch (errors) {
            console.log(errors)
        }
    }

    getUserCars()

}, [user, setUserCars])

  return (
      <>
        <HeaderLogged />
        <Box 
          h='100%' 
          w='100%' 
          display='flex' 
          alignItems='center' 
          flexDirection='column' 
          bgGradient={{
            cel: 'linear(to-b, brand1 0%, brand1 250px,brand4 250px, brand4 100%)', 
            desk:'linear(to-b, brand1 0%, brand1 260px,brand4 260px, brand4 100%)'
            }}
        >
        <Box 
          w={{cel:'92%', desk:'80%'}}
          h={{cel:'465px', desk:'400px'}} 
          p={'40px 29px'} 
          marginTop={{cel: '65px', desk:'75px'}} 
          borderRadius={'4px'} 
          display={{cel: 'flex', desk:'flex'}} 
          flexDirection={{cel: 'column', desk:'column'}} 
          alignItems={{cel: 'flex-start', desk:'flex-start'}}
          bg={'grey10'} 
          gap={'16px'} 
          justifyContent={'space-between'} 
          marginBottom={'12px'}
          >
          <Box
            h={'317px'} 
            display={'flex'} 
            flexDirection={'column'}
            gap={'16px'}
          >
          <Avatar size={'xl'} name={ user?.name }/>

          <Box display={'flex'} flexDirection={'row'} gap={'15px'}>
          <Heading 
            fontFamily={'heading'} 
            fontWeight={'600'} 
            fontSize={'heading6'} 
            color={'grey1'}
          >
            { user?.name }
          </Heading>
          <Text 
            p={'4px 8px'} 
            bg={'brand4'} 
            color={'brand1'}
            fontFamily={'body'} 
            fontWeight={'500'} 
            fontSize={'body2'} 
            borderRadius={'4px'}
          >
            { user?.type_user }
          </Text>
        </Box>
        <Text color={'grey2'} fontFamily={'body'} fontWeight={'400'} fontSize={'body1'}        
        overflowY= "hidden"
        text-overflow= "ellipsis"        
        maxH={{desk: '6rem'}}
        minH={{desk: '6rem'}}
        >
            { user?.description }
        </Text>


          </Box>
          {user?.type_user === "anunciante" ? <CreateAd/> : <></>}          
        </Box>

        <Box 
          maxWidth='1032px' display='flex'
          flexWrap={{desk:'wrap', cel: 'nowrap'}}
          justifyContent='space-around'
          width={'100%'} maxW={{desk: '1400px', cel: '100%'}}
          minW={'302px'} minH={'388px'}
          overflowX={{cel: 'auto'}} p={'50px 0'} gap={{cel: '12px'}}
        >

        <List w={'90%'} display={'grid'} gridTemplateColumns={{cel: 'repeat()',desk:'repeat(2, 1fr)', pc:'repeat(3, 1fr)', full:'repeat(4, 1fr)'}} gap={'16px'}>
          {userCars.map((car: any) => {
            return (
              <ProfileCardUser
              key={car.id}
              carName={car.model}
              carImage={car.imageUrl}
              price={car.price}
              fipePrice={car.priceFipe}
              userName={user?.name}
              description={car.description}
              year={car.year}
              km={car.km}
              active={car.isActive}
            />
            )
          })}
        </List>
            
        </Box>
    </Box>
    <Footer />
            
    </>
  );
};

export default Profile;
