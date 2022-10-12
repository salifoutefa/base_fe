import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

const Gallery: NextPage = () => {
  return (
    <>
      <Head>
        <title>MemeVerse DAO - Galery</title>
        <meta name="description" content="Description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <h1>Gallery</h1>
      </Box>
    </>
  );
};

export default Gallery;
