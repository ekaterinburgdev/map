import React from 'react';
import { AppProps } from 'next/app';

import 'styles/globals.css';
import 'ekb/style.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
