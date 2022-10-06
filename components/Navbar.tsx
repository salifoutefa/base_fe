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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["Launchpad", "Marketplace", "Stake", "Governance"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={6}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
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
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image
              src={"/logo.png"}
              h="80px"
              fallbackSrc="https://via.placeholder.com/60"
              alt="Logo"
            />
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

            <HStack spacing="5" display={{ base: "none", md: "flex" }}>
              {walletStatus !== WalletConnectionStatus.Connected ? (
                <Stack direction={"row"} spacing="5" padding={5}>
                  <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Disconnect"
                    onClick={disconnect}
                  />
                  <Stat>
                    <StatLabel>Name: {name}</StatLabel>
                    <StatNumber>£0.00</StatNumber>
                  </Stat>
                </Stack>
              ) : (
                <>
                  <Button
                    variant={"solid"}
                    colorScheme={"teal"}
                    size={"sm"}
                    mr={4}
                    onClick={connect}
                  >
                    Connect Wallet
                  </Button>
                  {error ? (
                    <p>{error instanceof Error ? error.message : `${error}`}</p>
                  ) : undefined}
                </>
              )}
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
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
