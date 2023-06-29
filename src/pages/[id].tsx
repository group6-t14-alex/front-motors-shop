"use client";
import { HeaderLogged } from "@/components/header/headerLogged";
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { Box, Avatar, Heading, Text, FormControl, Textarea, Grid, ListItem, UnorderedList, List, Button } from "@chakra-ui/react";
import { Footer } from "@/components/footer/footer";
import CardUser from "@/components/cards/userCard";
import { AuthContext } from "@/contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { UserInterface } from "@/interfaces/user.interface";
import { api } from "@/services/api";
import { AuthRoute } from "@/util/authComponent";
import nookies, { parseCookies } from "nookies";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/router";
import { useCarContext } from "@/contexts/carsContext";

interface AdvertiserPageProps {
  userData: UserInterface;
}


const AdvertiserDetail: NextPage<AdvertiserPageProps> = () => {
  const { asPath } = useRouter();
  console.log(asPath);
  const { idUser, setIdUser, userList, setUserList } = useUser();
  // const { user }: any = useContext(AuthContext);

  // useEffect(() => {
  //   if (query.id) {
  //     setIdUser(query.id as string);
  //     const id = idUser;
  //   }
  // // }, [query.id, setIdUser, idUser]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    const cookies = parseCookies();
    const id: string = cookies["@userCardId"];
    if (id) {
      // setIdUser(id as string);
      console.log(id);
      api
        .get<UserInterface>(`/user/${id}`)

        .then((response) => {
          setUserList(response.data);
          console.log(response.data);
        })
        .then(() => {
          setLoading(false);
        });
    }
    // setIdUser(asPath.slice(-1));
    // setLoading(false);
    // console.log(idUser);
    // if (userList) {
    //   setLoading(false);
    //   console.log(idUser);
    // }
  }, []);

  return (
    <>
      {loading ? (  
        <h1>carregando</h1>
      ) : (
        <>
          <HeaderLogged />
          <Box
            h="100%"
            w="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            bgGradient={{
              cel: "linear(to-b, brand1 0%, brand1 23%,brand4 23%, brand4 100%)",
              desk: "linear(to-b, brand1 0%, brand1 11%,brand4 11%, brand4 100%)",
            }}
          >
            <Box
              w={{ cel: "92%", desk: "80%" }}
              h={{ cel: "465px", desk: "400px" }}
              p={"40px 29px"}
              marginTop={{ cel: "65px", desk: "75px" }}
              borderRadius={"4px"}
              display={{ cel: "flex", desk: "flex" }}
              flexDirection={{ cel: "column", desk: "column" }}
              alignItems={{ cel: "flex-start", desk: "flex-start" }}
              bg={"grey10"}
              gap={"16px"}
              justifyContent={"space-between"}
              marginBottom={"12px"}
            >
              <Box
                h={"317px"}
                display={"flex"}
                flexDirection={"column"}
                gap={"16px"}
              >
                <Avatar size={"xl"} name={userList.name} />
                <Box display={"flex"} flexDirection={"row"} gap={"15px"}>
                  <Heading
                    fontFamily={"heading"}
                    fontWeight={"600"}
                    fontSize={"heading6"}
                    color={"grey1"}
                  >
                    {userList.name}
                  </Heading>
                  <Text
                    p={"4px 8px"}
                    bg={"brand4"}
                    color={"brand1"}
                    fontFamily={"body"}
                    fontWeight={"500"}
                    fontSize={"body2"}
                    borderRadius={"4px"}
                  >
                    {userList.type_user}
                  </Text>
                </Box>
                <Text
                  color={"grey2"}
                  fontFamily={"body"}
                  fontWeight={"400"}
                  fontSize={"body1"}
                >
                  {userList.description}
                </Text>
              </Box>
            </Box>
            <Box
              maxWidth="1032px"
              display="flex"
              flexWrap={{ desk: "wrap", cel: "nowrap" }}
              justifyContent="space-around"
              width={"100%"}
              maxW={{ desk: "1400px", cel: "100%" }}
              minW={"302px"}
              minH={"388px"}
              overflowX={{ cel: "auto" }}
              gap={{ cel: "12px" }}
            >
              {userList.car.map((car: any) => {
                return (
                  <CardUser
                    key={car.id}
                    carName={car.model}
                    carImage={car.imageUrl}
                    price={car.price}
                    fipePrice={car.priceFipe}
                    userName={userList.name}
                    description={car.description}
                    year={car.year}
                    km={car.km}
                    userId={idUser}
                  />
                );
              })}
            </Box>
            {/* <Box display='flex' flexDirection='column' w={{cel:"95%", desk:'50%'}}>
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

                                    <Text fontFamily='body' fontWeight='400' fontSize='body2' color='grey2' h='168px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
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
                    </Box> */}

            </Box>
          <Footer />{" "}
        </>
      )}
    </>
  );
};


// export const getStaticProps: GetStaticProps<AdvertiserPageProps> = async (
//   ctx
// ) => {
//   // const cookies = nookies.get(ctx);
//   //   api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;


//   const id = ctx.params!.id;

//   if (!id) {
//     console.log("id nulo");
//   }

//   const response = await api.get<UserInterface>(`/user/${id}`, {
//     // headers: { Authorization: `Bearer ${cookies["@MotorsShop"]}` },
//   });
//   console.log(response.data);

//   return { props: { userData: response.data } };
// };

// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: { id:  }
//       }
//     ],
//     fallback: "blocking"
//   };
// };

// export const getServerSideProps: GetServerSideProps<
//   AdvertiserPageProps
// > = async (ctx) => {
//   const id = ctx.params!.id;

//   const response = await api.get<UserInterface>(`/user/${id}`, {});

//   console.log(response.data);

//   return { props: { userData: response.data } };
// };

export default AdvertiserDetail;

// const AdvertiserDetail: NextPage<AdvertiserPageProps> = () => {
//   const { asPath } = useRouter();
//   console.log(asPath);
//   const { idUser, setIdUser, userList, setUserList } = useUser();
  
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const id = router.query.id;

//   useEffect(() => {
//     const getLocalToken = async () => {
//       try {
//         const tokenLocal = parseCookies();
//         if (!tokenLocal) {
//           return {
//             redirect: {
//               destination: "/login",
//               permanent: false,
//             },
//           };
//         }
//         const token: any = jwt_decode(tokenLocal["@MotorsShop"]);

//         api.get(`/user/${+token.sub}`, {
//           headers: {
//             Authorization: `Bearer ${tokenLocal["@MotorsShop"]}`,
//           },
//         })
//         .then((response) => {
//           setUserList(response.data);
//         })
//         .then(() => {
//           setLoading(false);
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getLocalToken();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <h1>carregando</h1>
//       ) : (
//         <>
//           <HeaderLogged />
//           <Box
//             h="100%"
//             w="100%"
//             display="flex"
//             alignItems="center"
//             flexDirection="column"
//             bgGradient={{
//               cel: "linear(to-b, brand1 0%, brand1 23%,brand4 23%, brand4 100%)",
//               desk: "linear(to-b, brand1 0%, brand1 11%,brand4 11%, brand4 100%)",
//             }}
//           >
//             <Box
//               w={{ cel: "92%", desk: "80%" }}
//               h={{ cel: "465px", desk: "400px" }}
//               p={"40px 29px"}
//               marginTop={{ cel: "65px", desk: "75px" }}
//               borderRadius={"4px"}
//               display={{ cel: "flex", desk: "flex" }}
//               flexDirection={{ cel: "column", desk: "column" }}
//               alignItems={{ cel: "flex-start", desk: "flex-start" }}
//               bg={"grey10"}
//               gap={"16px"}
//               justifyContent={"space-between"}
//               marginBottom={"12px"}
//             >
//               <Box
//                 h={"317px"}
//                 display={"flex"}
//                 flexDirection={"column"}
//                 gap={"16px"}
//               >
//                 <Avatar size={"xl"} name={userList.name} />

//                 <Box display={"flex"} flexDirection={"row"} gap={"15px"}>
//                   <Heading
//                     fontFamily={"heading"}
//                     fontWeight={"600"}
//                     fontSize={"heading6"}
//                     color={"grey1"}
//                   >
//                     {userList.name}
//                   </Heading>
//                   <Text
//                     p={"4px 8px"}
//                     bg={"brand4"}
//                     color={"brand1"}
//                     fontFamily={"body"}
//                     fontWeight={"500"}
//                     fontSize={"body2"}
//                     borderRadius={"4px"}
//                   >
//                     {userList.type_user}
//                   </Text>
//                 </Box>
//                 <Text
//                   color={"grey2"}
//                   fontFamily={"body"}
//                   fontWeight={"400"}
//                   fontSize={"body1"}
//                 >
//                   {userList.description}
//                 </Text>
//               </Box>
//             </Box>

//             <Box
//               maxWidth="1032px"
//               display="flex"
//               flexWrap={{ desk: "wrap", cel: "nowrap" }}
//               justifyContent="space-around"
//               width={"100%"}
//               maxW={{ desk: "1400px", cel: "100%" }}
//               minW={"302px"}
//               minH={"388px"}
//               overflowX={{ cel: "auto" }}
//               gap={{ cel: "12px" }}
//             >
//               {userList.car.map((car: any) => {
//                 return (
//                   <CardUser
//                     key={car.id}
//                     carName={car.model}
//                     carImage={car.imageUrl}
//                     price={car.price}
//                     fipePrice={car.priceFipe}
//                     userName={userList.name}
//                     description={car.description}
//                     year={car.year}
//                     km={car.km}
//                     userId={idUser}
//                   />
//                 );
//               })}
//             </Box>

//           </Box>
//           <Footer />{" "}
//         </>
//       )}
//     </>
//   );
// };


// export default AdvertiserDetail;
