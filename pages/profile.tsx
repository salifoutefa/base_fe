import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>MemeVerse DAO - Profile</title>
        <meta name="description" content="Shill Your Meme" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <h1>Profile</h1>
      </Box>
    </>
  );
};

export default Profile;
