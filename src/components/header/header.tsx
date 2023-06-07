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
} from "@chakra-ui/react";

// import { Link as LinkDom } from "react-router-dom";

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
