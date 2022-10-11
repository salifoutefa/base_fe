import "../styles/globals.css";

import {
  ChainInfoID,
  WalletManagerProvider,
  WalletType,
} from "@josefleventon/cosmodal";
import type { AppProps } from "next/app";
import { FunctionComponent, useState } from "react";
import { GasPrice } from "@cosmjs/stargate";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserContext } from "../Contexts/UserContext";

const LOCAL_STORAGE_KEY = "connectedWalletId";

const [user, setUser] = useState(null);

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <UserContext.Provider value={{ user, setUser }}>
    <ChakraProvider>
      <WalletManagerProvider
        walletConnectClientMeta={{
          name: "CosmodalExampleDApp",
          description: "A dApp using the @noahsaso/cosmodal library.",
          url: "https://noahsaso-cosmodal.vercel.app",
          icons: ["https://moonphase.is/image.svg"],
        }}
        enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
        renderLoader={() => <p>Loading...</p>}
        localStorageKey={LOCAL_STORAGE_KEY}
        defaultChainId={ChainInfoID.Stargaze1}
        getSigningCosmWasmClientOptions={(chainInfo) => ({
          gasPrice: GasPrice.fromString(
            "0.0025" + chainInfo.feeCurrencies[0].coinMinimalDenom
          ),
        })}
        getSigningStargateClientOptions={(chainInfo) => ({
          gasPrice: GasPrice.fromString(
            "0.0025" + chainInfo.feeCurrencies[0].coinMinimalDenom
          ),
        })}
      >
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Footer></Footer>
      </WalletManagerProvider>
    </ChakraProvider>
  </UserContext.Provider>
);

export default MyApp;
