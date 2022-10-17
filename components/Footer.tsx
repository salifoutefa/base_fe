import {
  Box,
  chakra,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import React from "react";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  return (
    <>
      <Box>
        <Divider
          w="95%"
          mx="auto"
          color="gray.600"
          _dark={{
            color: "#F9FAFB",
          }}
          h="3.5px"
        />
        <VStack py={3}>
          <HStack justify="center">
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"Discord"} href={"#"}>
              <FaDiscord />
            </SocialButton>
            <SocialButton label={"Telegram"} href={"#"}>
              <FaTelegram />
            </SocialButton>
          </HStack>

          {/*<Text
            textAlign="center"
            fontSize="smaller"
            _dark={{
              color: "white",
            }}
          >
            &copy;Copyright. All rights reserved.
          </Text>*/}
        </VStack>
      </Box>
      ;
    </>
  );
};

export default Footer;
