
import { Box, Image, Text } from "@chakra-ui/react";
import photoHero from "../../assets/photoHero.png";

export const Hero = () => {
  return (
    <>
      <Box width={"100%"} height={"30rem"}>
        <Image
          width={"100vw"}
          height={"30rem"}
          objectFit={"cover"}
          position={"absolute"}
          top={"0"}
          left={"0"}
          src={photoHero.src}
          alt="carro azul"
        />
        <Box
          position={"relative"}
          padding={"0 1rem 0 1rem"}
          //   height={"30rem"}
          top={"50%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            fontFamily={"heading"}
            fontSize={{ cel: "heading3 ", desk: "heading1" }}
            fontWeight={{ cel: "500", desk: "700" }}
            color={"grey10"}
            textAlign={"center"}
          >
            Motors Shop
          </Text>
          <Text
            fontFamily={"heading"}
            fontSize={{ cel: "heading5", desk: "heading2" }}
            fontWeight={{ cel: "500", desk: "600" }}
            color={"grey10"}
            textAlign={"center"}
          >
            A melhor plataforma de anúncios de carros do país
          </Text>
        </Box>
      </Box>
    </>
  );
};
