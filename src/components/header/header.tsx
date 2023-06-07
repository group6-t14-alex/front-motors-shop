"use client";

import logoMotors from "../../assets/logoMotors.png";
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
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
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { Link as LinkDom } from "react-router-dom";

export const Header = () => {
  const { isOpen } = useDisclosure();
  return (
    <>
      <Flex flexDirection={"row"} borderBottom={"2px solid #dee2e6"}>
        <Container
          minWidth={"80vw"}
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
                  isActive={isOpen}
                  as={Button}
                  size={"md"}
                  variant={"ghost"}
                  bg={"transparent"}
                  _hover={{ bg: "transparent" }}
                  display={{ cel: "flex", desk: "none" }}
                >
                  {isOpen ? (
                    <CloseIcon bg={"transparent"} />
                  ) : (
                    <HamburgerIcon bg={"transparent"} />
                  )}
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
                  _hover={{ bg: "transparent", borderColor: "transparent" }}
                  _before={{ bg: "transparent", borderColor: "transparent" }}
                  _after={{ bg: "transparent", borderColor: "transparent" }}
                  _checked={{ bg: "transparent", borderColor: "transparent" }}
                >
                  <MenuItem
                    fontFamily={"body"}
                    fontSize={"body1"}
                    fontWeight={"600"}
                    color={"grey2"}
                    height={"3rem"}
                    _hover={{ bg: "transparent", borderColor: "transparent" }}
                    _before={{ bg: "transparent", borderColor: "transparent" }}
                    _after={{ bg: "transparent", borderColor: "transparent" }}
                    _checked={{ bg: "transparent", borderColor: "transparent" }}
                  >
                    Fazer Login
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color={"grey0"}
                      fontFamily={"body"}
                      fontSize={"body1"}
                      variant={"outline"}
                      fontWeight={"600"}
                      width={"100%"}
                    >
                      Cadastrar
                    </Button>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <Box display={{ cel: "none", desk: "flex" }} gap={"2.75"}>
            <Button
              fontFamily={"body"}
              fontSize={"body1"}
              fontWeight={"600"}
              color={"grey2"}
              variant={"ghost"}
            >
              Fazer Login
            </Button>
            <Button
              color={"grey0"}
              fontFamily={"body"}
              fontSize={"body1"}
              variant={"outline"}
              fontWeight={"600"}
            >
              Cadastrar
            </Button>
          </Box>
        </Container>
      </Flex>
    </>
  );
};
