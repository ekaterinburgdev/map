import Head from "next/head";

import Map from "../components/Map";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Map />
    </>
  );
}
