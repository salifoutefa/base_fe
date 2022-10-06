import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MemeVerse DAO</title>
        <meta name="description" content="Description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
    </>
  );
};

export default Home;
