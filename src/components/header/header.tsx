import logoMotors from "../../assets/logoMotors.png";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link"

export const Header = () => {
  const { isOpen } = useDisclosure();
  return (
    <>
      <Flex flexDirection={"row"} borderBottom={"2px solid #dee2e6"} id="topo">
        <Container
          minWidth={"90vw"}
          display={"flex"}
          justifyContent={"space-between"}
          height={"5rem"}
          alignItems={"center"}
        >
          <Image
            height={"26px"}
            width={"153px"}
            src={logoMotors.src}
            alt="Logo motors shop"
            
          />
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  size={"lg"}
                  as={IconButton}
                  aria-label="Options"
                  variant={"ghost"}
                  bg={"transparent"}
                  display={{ cel: "flex", desk: "none" }}
                  isActive={isOpen}
                  _hover={{ bg: "transpatent" }}
                  _after={{ bg: "transpatent" }}
                >
                  {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                </MenuButton>
                <MenuList
                  width={"100vw"}
                  borderRadius={"none"}
                  borderColor={"transparent"}
                  marginTop={"3"}
                  alignSelf={"center"}
                  display={{ cel: "flex", desk: "none" }}
                  flexDirection={"column"}
                  gap={"1.5rem"}
                >
                  <MenuItemOption
                    as={NextLink} href='login'
                    fontFamily={"body"}
                    fontSize={"body1"}
                    fontWeight={"600"}
                    color={"brand1"}
                    height={"3rem"}
                    isChecked={false}
                    _hover={{ bg: "transparent" }}
                    _after={{ bg: "transparent" }}
                    _before={{ bg: "transparent" }}
                  >
                    Fazer Login
                  </MenuItemOption>                  
                  <MenuItemOption 
                    color={"grey0"}
                    fontFamily={"body"}
                    fontSize={"body1"}
                    fontWeight={"600"}
                    width={"100%"}
                    as={NextLink} href={"/signup"}
                    _hover={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
                    _focus={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
                  >
                    Cadastrar
                  </MenuItemOption>
                </MenuList>
              </>
            )}
          </Menu>
          <Box
            display={{ cel: "none", desk: "flex" }}
            gap={"2.75"}
            borderLeftColor={"grey6"}
            borderLeftWidth={"2px"}
            height={"100%"}
            alignItems={"center"}
          >
            <Button 
              as={NextLink} href='login'
              fontFamily={"body"}
              fontSize={"body1"}
              fontWeight={"600"}
              color={"brand1"}
              variant={"ghost"}
            >
              Fazer Login
            </Button>
            <Button
              as={NextLink} href='signup'
              color={"grey0"}
              fontFamily={"body"}
              fontSize={"body1"}
              variant={"outline"}
              fontWeight={"600"}
              _hover={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
              _focus={{ bg: "grey0", color: "grey10", fontStyle: "none"}}
            >
              Cadastrar
            </Button>
          </Box>
        </Container>
      </Flex>
    </>
  );
};
