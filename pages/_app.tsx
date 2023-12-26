import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import 'styles/globals.css';
import 'ekb/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Инфокарта Екатеринбурга</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
