'use client';
import { Footer } from "@/components/footer/footer"
import { HeaderLogged } from "@/components/header/headerLogged"
import CreateAd from "@/components/modals/createAd";
import {Avatar, Box, Button, Heading, Link, List, Text} from "@chakra-ui/react"
import CardUser from "@/components/cards/userCard";
import { useContext, useEffect, useState } from 'react'
import { NextPage, GetServerSideProps } from "next";
import nookies, {parseCookies} from "nookies"
import { AuthContext } from '@/contexts/authContext'
import { useCarContext } from '@/contexts/carsContext'
import { api } from '@/services/api'
import { CarDataReturn } from '@/schemas/car.schema'
              
export const getServerSideProps: GetServerSideProps = async (props) => {
  const cookies = parseCookies(props)
//   const cookies = nookies.get(props)
    if(!cookies["@MotorsShop"]) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    };
  
  if (cookies['@MotorsShop']) {
    api.defaults.headers.common.authorization = `Bearer ${cookies['@MotorsShop']}`
  }

  const response = await api.get<CarDataReturn[]>('/cars')
  return {
    props: { cars: response.data }
  }
}

interface ProfileInterface {
  cars: CarDataReturn[]
}


const Profile: NextPage<any> = ({ cars }) => {

    // const cookiesLadoCliente = parseCookies()
    // console.log("cliente", cookiesLadoCliente)

    
    const { user }: any = useContext(AuthContext)
    console.log(user)
    console.log(cars)

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
                cel: 'linear(to-b, brand1 0%, brand1 23%,brand4 23%, brand4 100%)', 
                desk:'linear(to-b, brand1 0%, brand1 11%,brand4 11%, brand4 100%)'
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
                      gap={'16px'}>
                        <Avatar size={'xl'} name={user.name}/>

                        <Box display={'flex'} flexDirection={'row'} gap={'15px'}>
                            <Heading 
                              fontFamily={'heading'} 
                              fontWeight={'600'} 
                              fontSize={'heading6'} 
                              color={'grey1'}
                             >
                              {user.name}
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
                              {user.type_user}
                             </Text>
                        </Box>
                            <Text color={'grey2'} fontFamily={'body'} fontWeight={'400'} fontSize={'body1'}>
                                {user.description}
                            </Text>
                    </Box>

                    <CreateAd />
                </Box>

                <Box maxWidth='1032px' display='flex'
                     flexWrap={{desk:'wrap', cel: 'nowrap'}}
                     justifyContent='space-around'
                     width={'100%'} maxW={{desk: '1400px', cel: '100%'}}
                     minW={'302px'} minH={'388px'}
                     overflowX={{cel: 'auto'}} gap={{cel: '12px'}}>
                    <CardUser carName={'Maserati - Ghibli'} price={10000} fipePrice={6000} userName={'Douglas Diniz'}/>
                    <CardUser carName={'Brasília'} price={2000} fipePrice={5000} userName={'Edson Kokado'}/>
                    <CardUser carName={'Fusca'} price={5000} fipePrice={4000} userName={'Lilian Dias'}/>
                    <CardUser carName={'Opala'} price={4000} fipePrice={8000} userName={'Fernanda Bolinger'}/>
                    <CardUser carName={'Kadet'} price={5000} fipePrice={2000} userName={'Samir Dourado'}/>
                    <CardUser carName={'Passat'} price={6000} fipePrice={7000} userName={'Alex'}/>
                    <CardUser carName={'Passat'} price={6000} fipePrice={7000} userName={'Alex'}/>
                    <CardUser carName={'Passat'} price={6000} fipePrice={7000} userName={'Alex'}/>
                </Box>
            </Box>
            <Text
              color={'grey2'}
              fontFamily={'body'}
              fontWeight={'400'}
              fontSize={'body1'}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
              maxime possimus debitis, quae earum aliquid, quo aspernatur nobis
              laborum alias assumenda eligendi necessitatibus repellat accusamus
              nemo voluptatibus sit beatae et.
            </Text>
          </Box>

          <CreateAd />
        </Box>

        <Box
          maxWidth='1032px'
          display='flex'
          flexWrap={{ desk: 'wrap', cel: 'nowrap' }}
          justifyContent='space-around'
          width={'100%'}
          maxW={{ desk: '1400px', cel: '100%' }}
          minW={'302px'}
          minH={'388px'}
          overflowX={{ cel: 'auto' }}
          gap={{ cel: '12px' }}
        >
          {cars.map((car: any) => {
            return (
              <CardUser
                key={car.id}
                carName={car.name}
                price={car.price}
                fipePrice={car.priceFipe}
                userName={car.brand}
                description={car.description}
                year={car.year}
                km={car.km}
              />
            )
          })}
        </Box>
      </Box>
      <Footer />
    </>
  )
}

<!-- export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const cookies = nookies.get(ctx)
    if(!cookies["@MotorsShop"]) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    };

    return {
        props: {}
    };    
}; -->

export default Profile
