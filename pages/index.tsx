import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MemeVerse DAO</title>
        <meta name="description" content="Shill Your Meme" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
