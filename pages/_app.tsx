import React, { useEffect } from 'react';
import { AppProps } from 'next/app';

import 'styles/globals.css';
import 'ekb/style.css';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((serviceWorker) => {
                    // eslint-disable-next-line no-console
                    console.debug('Service Worker registered: ', serviceWorker);
                })
                .catch((error) => {
                    console.error('Error registering the Service Worker: ', error);
                });
        }
    }, []);

    return <Component {...pageProps} />;
}
