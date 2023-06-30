import { AuthContext } from "@/contexts/authContext";
import logoMotors from "../../assets/logoMotors.png";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,  
  Container,
  Flex,  
  IconButton,
  Image,
  Menu,
  MenuButton,  
  MenuList,  
  Text,
  useDisclosure,
  Avatar,
  MenuItem,
} from "@chakra-ui/react";
import { useContext,  } from "react";
import LogOutButon from "../modals/logOut";
import { useRouter } from "next/router";
import EditProfileButton from "../modals/editProfie";
import EditAddressButton from "../modals/editAddressUser";



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
            onClick={() => {
              router.push(`/`);
            }}
            cursor={"pointer"}
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
                  <EditProfileButton userData={user} />                  

                  <EditAddressButton userData={user} />

                  {user?.type_user == "anunciante" ? (
                    <MenuItem
                      _hover={{ bg: "none" }}
                      onClick={() => router.push("/profile")}                      
                    >
                      Meus anúncios
                    </MenuItem>
                  ) : (
                    <></>
                  )}                  
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
