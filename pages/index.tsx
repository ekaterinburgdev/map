/* eslint-disable */

import React from 'react';
import Head from 'next/head';
import { Map } from 'components/Map';

export default function Home() {
    return (
        <>
            <Head>
                <title>Ekaterinburg Map</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Map />
        </>
    );
}
