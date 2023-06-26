"use client";
import { HeaderLogged } from "@/components/header/headerLogged";
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { Box, Avatar, Heading, Text } from "@chakra-ui/react";
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
