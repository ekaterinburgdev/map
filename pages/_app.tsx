/* eslint-disable */
import React from 'react';
import Head from 'next/head';

import 'styles/globals.css';
import 'ekb/style.css';

type AppProps<PropsType extends object> = {
    Component: React.ComponentType<PropsType>;
    pageProps: PropsType;
};

function App({ Component, pageProps }: AppProps<any>) {
    const siteTitle = 'Карта объектов Дизайн-кода Екатеринбурга';

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
