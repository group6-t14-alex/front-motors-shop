import { AuthContext } from "@/contexts/authContext";
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
  MenuOptionGroup,
  Text,
  useDisclosure,
  Avatar,
  MenuItem,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import LogOutButon from "../modals/logOut";
import { useRouter } from "next/router";
import EditProfileButton from "../modals/editProfie";
import EditAddressButton from "../modals/editAddressUser";

// import { Link as LinkDom } from "react-router-dom";

export const HeaderLogged = () => {
  const { isOpen } = useDisclosure();
  const { user } = useContext(AuthContext);
  const router = useRouter();

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
                  {/* <MenuItem
                  fontFamily={"body"}
                  fontSize={"body1"}
                  fontWeight={"600"}
                  color={"grey2"}
                  height={"3rem"}
                  isChecked={false}
                  _hover={{ bg: "transparent" }}
                  _after={{ bg: "transparent" }}
                  _before={{ bg: "transparent" }}
                  >
                    Editar perfil
                  </MenuItem> */}

                  <EditProfileButton userData={user} />

                  {/* <MenuItem
                  fontFamily={"body"}
                  fontSize={"body1"}
                  fontWeight={"600"}
                  color={"grey2"}
                  height={"3rem"}
                  isChecked={false}
                  _hover={{ bg: "transparent" }}
                  _after={{ bg: "transparent" }}
                  _before={{ bg: "transparent" }}
                  >
                    Editar endereço
                  </MenuItem> */}

                  <EditAddressButton userData={user} />

                  {user?.type_user == "anunciante" ? (
                    <MenuItem
                      _hover={{ bg: "none" }}
                      onClick={() => router.push("/profile")}
                      // fontFamily={"body"}
                      // fontSize={"body1"}
                      // fontWeight={"600"}
                      // color={"grey2"}
                      // height={"3rem"}
                      // isChecked={false}
                      // _hover={{ bg: "transparent" }}
                      // _after={{ bg: "transparent" }}
                      // _before={{ bg: "transparent" }}
                    >
                      Meus anúncios
                    </MenuItem>
                  ) : (
                    <></>
                  )}
                  {/* <MenuItem
                  fontFamily={"body"}
                  fontSize={"body1"}
                  fontWeight={"600"}
                  color={"grey2"}
                  height={"3rem"}
                  isChecked={false}
                  _hover={{ bg: "transparent" }}
                  _after={{ bg: "transparent" }}
                  _before={{ bg: "transparent" }}
                  >
                    Sair
                  </MenuItem> */}
                  <LogOutButon />
                </MenuList>
              </>
            )}
          </Menu>
          <Menu>
            <Box
              display={{ cel: "none", desk: "flex" }}
              gap={"0.5rem"}
              borderLeftColor={"grey6"}
              borderLeftWidth={"2px"}
              height={"100%"}
              alignItems={"center"}
              paddingLeft={"2.75rem"}
              justifyContent={"center"}
            >
              <MenuButton width={"100%"} display={"flex"} alignItems="center">
                <Flex gap={"0.5rem"} alignItems="center">
                  <Avatar name={user?.name} />
                  <Text
                    color={"grey2"}
                    fontFamily={"body"}
                    fontWeight={"400"}
                    fontSize={"body1"}
                  >
                    {user?.name}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList
                borderRadius={"3px"}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                padding={"1rem"}
              >
                <EditProfileButton userData={user} />

                <EditAddressButton userData={user} />

                {user?.type_user == "anunciante" ? (
                  <MenuItem
                    _hover={{ bg: "none" }}
                    onClick={() => router.push("/profile")}
                  >
                    Meus anuncios
                  </MenuItem>
                ) : (
                  <></>
                )}
                <LogOutButon />
              </MenuList>
            </Box>
          </Menu>
        </Container>
      </Flex>
    </>
  );
};
