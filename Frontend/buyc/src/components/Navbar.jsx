import React from "react";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../Contexts/AuthContext";
import {  useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const { authUser, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>BUYC Corp.</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {authUser.isAuth ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    {authUser.image ? (
                      <Avatar size={"sm"} src={authUser.image} />
                    ) : (
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    )}
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      {authUser.image ? (
                        <Avatar size={"sm"} src={authUser.image} />
                      ) : (
                        <Avatar
                          size={"sm"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      )}
                    </Center>
                    <br />
                    <Center>
                      {authUser.name ? <p>{authUser.name}</p> : null}
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button colorScheme="teal" variant="outline" onClick={()=>navigate("/signup")}>
                    Sign up
                  </Button>
                  <Button colorScheme="teal" variant="outline" onClick={()=>navigate("/login")}>
                    Log in 
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
