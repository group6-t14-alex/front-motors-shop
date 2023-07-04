import Head from "next/head";
import { Inter } from "next/font/google";
import CardWrapper from "@/components/cards/cardWrapper";
import ButtonSeeFilters from "@/components/modals/buttonsFilter";
import FilterDesk from "@/components/filter/filterDesk";
import { Header } from "@/components/header/header";
import { Box, Button, Text } from "@chakra-ui/react";
import { Hero } from "@/components/hero/hero";
import { Footer } from "@/components/footer/footer";
import { GetServerSideProps, NextPage } from "next";
import { api } from "@/services/api";
import { useCarContext } from "@/contexts/carsContext";
import { useEffect } from "react";
import { CarDataReturn } from "@/schemas/car.schema";
import { AuthContext, useAuth } from "@/contexts/authContext";
import { HeaderLogged } from "@/components/header/headerLogged";

interface HomeProps {
  cars: CarDataReturn;
}

const Home: NextPage<HomeProps> = ({ cars }) => {

  const { setCars, filtredCars, filterOptions, setFiltredCars }: any = useCarContext();

  
  useEffect(() => {
    
    setCars(cars);
    setFiltredCars(cars);
    filterOptions(cars);    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLogged } = useAuth();

  return (
    <>
      <Head>
        <title>Motors Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display={"flex"} flexDir={"column"} justifyContent={"center"}>
        {isLogged ? <HeaderLogged /> : <Header />}

        <Hero />
      </Box>

      <Box
        bgColor={"white"}
        display={"flex"}
        flexDir={"row-reverse"}
        justifyContent={"space-between"}
        margin={"0 auto"}
        width={"100%"}
        maxW={"1570px"}
        gap={{ desk: "1rem" }}
        mt={"3.75rem"}
        p={"0.5"}
      >

        <CardWrapper />

        <FilterDesk />
      </Box>
      <ButtonSeeFilters />

      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"60px"}
        margin={"0 auto"}
        width={"100%"}
        maxW={"1570px"}
      >
        <Text>1 de 2</Text>
        <Button>{"Seguinte >"} </Button>
      </Box>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<CarDataReturn[]>("/cars");

  return {
    props: { cars: response.data },
  };
};

export default Home;
