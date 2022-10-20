import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import MemeGalery from "../components/MemeGalery";

const Gallery: NextPage = () => {
  const [count, setCount] = useState(6);
  return (
    <>
      <Head>
        <title>MemeVerse DAO - Galery</title>
        <meta name="description" content="Description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <MemeGalery count={count} setCount={setCount} />
      </Box>
    </>
  );
};

export default Gallery;
