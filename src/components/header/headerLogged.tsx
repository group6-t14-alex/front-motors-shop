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
} from "@chakra-ui/react";

import { Link as LinkDom } from "react-router-dom";

export const HeaderLogged = () => {
  const { isOpen } = useDisclosure();
  return (
    <>
      <Flex flexDirection={"row"} borderBottom={"2px solid #dee2e6"}>
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
            <MenuButton
              size={"lg"}
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant={"ghost"}
              bg={"transparent"}
              display={{ cel: "flex", desk: "none" }}
            />
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
                fontFamily={"body"}
                fontSize={"body1"}
                fontWeight={"600"}
                color={"grey2"}
                height={"3rem"}
                isChecked={false}
              >
                Fazer Login
              </MenuItemOption>
              <MenuItemOption>
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
              </MenuItemOption>
            </MenuList>
          </Menu>
          <Box
            display={{ cel: "none", desk: "flex" }}
            gap={"0.5rem"}
            borderLeftColor={"grey6"}
            borderLeftWidth={"2px"}
            height={"100%"}
            alignItems={"center"}
            paddingLeft={"2.75rem"}
          >
            <Avatar name="Samuel Leão" />
            <Text
              color={"grey2"}
              fontFamily={"body"}
              fontWeight={"400"}
              fontSize={"body1"}
            >
              Samuel Leão
            </Text>
          </Box>
        </Container>
      </Flex>
    </>
  );
};
