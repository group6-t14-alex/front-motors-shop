import { Box, Image, Text, Button, Link } from "@chakra-ui/react";
import logoBranca from "../../assets/logoBranca.png";
import { ChevronUpIcon } from "@chakra-ui/icons";
import NextLink from "next/link";


export const Footer = () => {

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, '');
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box
        bg={"grey0"}
        height={{ cel: "20rem", desk: "8.75rem" }}
        width={"100%"}
        minW={"20rem"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          minWidth={"80%"}
          display={"flex"}
          flexDirection={{ cel: "column", desk: "row" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={{ cel: "3.75rem", desk: "none" }}
        >
          <Image
            width={"153px"}
            height={"26px"}
            src={logoBranca.src}
            alt="logo shop motors"
          />
          <Text
            color={"white"}
            fontFamily={"body"}
            fontSize={"body2"}
            fontWeight={"400"}
          >
            © 2022 - Todos os direitos reservados.
          </Text>
          
          <Link as={NextLink} href='#topo'
            width={"3.313rem"}
            height={"3.125rem"}
            bg={"grey1"}
            borderRadius={"4px"}            
            onClick={handleScroll}
            display={"flex"}
            justifyContent={"center"}            
            alignItems={"center"}
          >
            <ChevronUpIcon fontWeight={"semibold"} color={"white"} />
          </Link>          
        </Box>
      </Box>
    </>
  );
};
