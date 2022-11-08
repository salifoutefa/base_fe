import { Box, Tooltip, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

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
      
        <NextLink href={"/upload"}>
          <Link>
          Upload Meme
          </Link>
        </NextLink>
      </Box>
    </>
  );
};

export default Profile;
