import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

const Auctions: NextPage = () => {
  return (
    <>
      <Head>
        <title>MemeVerse DAO - Auctions</title>
        <meta name="description" content="Description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p={4}>Auctions page</Box>
    </>
  );
};

export default Auctions;
