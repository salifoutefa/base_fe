import {
  WalletConnectionStatus,
  useWallet,
  useWalletManager,
} from "@josefleventon/cosmodal";
import { useCallback, useState } from "react";
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Center,
  Link,
  Button,
  HStack,
  //Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  useColorMode,
  useBreakpointValue,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tooltip,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  CloseIcon,
  LockIcon,
  ViewIcon,
  CopyIcon,
} from "@chakra-ui/icons";

import NextLink from "next/link";

const Links = ["Votes", "Auctions", "Gallery", "Backmarket"];

function truncate(str: String, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <NextLink href={"/" + children?.toString().toLowerCase()} passHref>
    <Link
      px={6}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //-- Connect Wallet requirements
  const { connect, disconnect } = useWalletManager();
  const {
    status: walletStatus,
    error,
    name,
    address,
    signingCosmWasmClient,
  } = useWallet();

  const [contractAddress, setContractAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  const execute = useCallback(async () => {
    if (!address || !signingCosmWasmClient) return;

    setStatus("Loading...");

    try {
      // Parse message.
      const msgObject = JSON.parse(msg);

      // Execute message.
      const result = await signingCosmWasmClient.execute(
        address,
        contractAddress,
        msgObject,
        "auto"
      );

      console.log(result);
      setStatus(`Executed. TX: ${result.transactionHash}`);
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err instanceof Error ? err.message : `${err}`}`);
    }
  }, [address, contractAddress, msg, signingCosmWasmClient]);
  //End Connect wallet requirements --

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image src={"/logo.png"} h="80px" alt="Logo" />
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontSize="2xl"
              fontWeight="bold"
              color={useColorModeValue("gray.900", "white")}
            >
              MEMEVERSE
            </Text>
          </HStack>

          <Center as={"nav"} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Center>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing="5" padding={5}>
              <Button onClick={toggleColorMode} className="border-spacing-5">
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>

            <HStack
              direction={"row"}
              spacing="5"
              display={{ base: "none", md: "flex" }}
            ></HStack>
            <HStack>
              {walletStatus === WalletConnectionStatus.Connected ? (
                <HStack shadow={"dark-lg"} h={16}>
                  <Stack direction={"row"} spacing="5" padding={5}>
                    <Stat>
                      <StatLabel>Name: {name}</StatLabel>
                      <StatNumber fontSize={"-moz-initial"}>
                        {address}
                      </StatNumber>
                    </Stat>
                  </Stack>
                  <Stack direction={"row"} spacing="5" padding={5}>
                    <NextLink href={"/profile"} passHref>
                      <Tooltip label="Profile">
                        <Link>
                          <ViewIcon color={"orange"} />
                        </Link>
                      </Tooltip>
                    </NextLink>
                    <Tooltip label="Copy Address">
                      <Link onClick={disconnect}>
                        <CopyIcon />
                      </Link>
                    </Tooltip>
                    <Tooltip label="Disconnect">
                      <Link onClick={disconnect}>
                        <LockIcon />
                      </Link>
                    </Tooltip>
                  </Stack>
                </HStack>
              ) : (
                <Stack>
                  <Button
                    variant={"solid"}
                    colorScheme={"orange"}
                    size={"sm"}
                    mr={4}
                    onClick={connect}
                  >
                    Connect Wallet
                  </Button>
                  {error ? (
                    <p>{error instanceof Error ? error.message : `${error}`}</p>
                  ) : undefined}
                </Stack>
              )}
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Content here</Box>
    </>
  );
}
