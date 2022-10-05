import {
  WalletConnectionStatus,
  useWallet,
  useWalletManager,
} from "@josefleventon/cosmodal";
import type { NextPage } from "next";
import { useCallback, useState } from "react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
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

  return (
    <>
      {walletStatus === WalletConnectionStatus.Connected ? (
        <>
          <p>
            Name: <b>{name}</b>
          </p>
          <p>
            Address: <b>{address}</b>
          </p>
          <button
            onClick={disconnect}
            className="px-3 py-2 bg-gray-200 border rounded-md border-gray hover:opacity-70"
          >
            Disconnect
          </button>

          <h1 className="mt-4 text-lg">Execute Smart Contract</h1>
          <input
            type="text"
            placeholder="Contract Address"
            className="px-4 py-2 rounded-md outline"
            value={contractAddress}
            onChange={(event) => setContractAddress(event.target.value)}
          />

          <h2 className="mt-2 text-lg">Message</h2>
          <textarea
            className="p-4 font-mono rounded-md outline"
            rows={10}
            value={msg}
            onChange={(event) => setMsg(event.target.value)}
          />

          <button
            onClick={execute}
            className="px-3 py-2 mt-4 bg-gray-200 border rounded-md border-gray hover:opacity-70"
          >
            Execute
          </button>

          {status && (
            <pre className="mt-2 overflow-scroll text-xs">{status}</pre>
          )}
        </>
      ) : (
        <>
          <Navbar></Navbar>
          <button
            onClick={connect}
            className="px-3 py-2 bg-gray-200 border rounded-md border-gray hover:opacity-70"
          >
            Connect
          </button>
          {error ? (
            <p>{error instanceof Error ? error.message : `${error}`}</p>
          ) : undefined}
        </>
      )}
    </>
  );
};

export default Home;
