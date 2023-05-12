import React from 'react';
import dynamic from 'next/dynamic';

export const App = dynamic(() => import('../v1'), {
    ssr: false,
});

export default function Home() {
    return <App />;
}
