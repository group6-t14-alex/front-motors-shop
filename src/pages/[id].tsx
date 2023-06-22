"use client"
import { HeaderLogged } from "@/components/header/headerLogged";
import { GetServerSideProps, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { Box, Avatar, Heading, Text } from "@chakra-ui/react";
import { Footer } from "@/components/footer/footer";
import CardUser from "@/components/cards/userCard";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import { UserInterface } from "@/interfaces/user.interface";
import { api } from "@/services/api";
import { AuthRoute } from "@/util/authComponent";
import nookies, { parseCookies } from "nookies";

interface AdvertiserPageProps {
  userData: UserInterface;
}

const AdvertiserDetail: NextPage<AdvertiserPageProps> = ({
  userData,
}: AdvertiserPageProps) => {
  const { user }: any = useContext(AuthContext);

  return (
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
            <Avatar size={"xl"} name={userData.name} />

            <Box display={"flex"} flexDirection={"row"} gap={"15px"}>
              <Heading
                fontFamily={"heading"}
                fontWeight={"600"}
                fontSize={"heading6"}
                color={"grey1"}
              >
                {userData.name}
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
                {userData.type_user}
              </Text>
            </Box>
            <Text
              color={"grey2"}
              fontFamily={"body"}
              fontWeight={"400"}
              fontSize={"body1"}
            >
              {userData.description}
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
          {userData.car.map((car: any) => {
            return (
              <CardUser
                key={car.id}
                carName={car.model}
                carImage={car.imageUrl}
                price={car.price}
                fipePrice={car.priceFipe}
                userName={userData.name}
                description={car.description}
                year={car.year}
                km={car.km}
              />
            );
          })}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<AdvertiserPageProps> = async (ctx) => {
  // const cookies = nookies.get(ctx);
  //   api.defaults.headers.common.authorization = `Bearer ${cookies["@MotorsShop"]}`;
  
  const id = ctx.params!.id;
  console.log(id);
  
  if (!id) {
    console.log("id nulo")
  }  

  const response = await api.get<UserInterface>(`/user/${id}`, {
    // headers: { Authorization: `Bearer ${cookies["@MotorsShop"]}` },
  });
  console.log(response.data);

  return { props: { userData: response.data } };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "1" }
      }
    ],
    fallback: "blocking"
  };
};


export default AdvertiserDetail;
