import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

export const App = dynamic(() => import('../components/App'), { ssr: false });

export default function Home() {
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

    return <App />;
}
