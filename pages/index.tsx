import React from 'react';
import dynamic from 'next/dynamic';

export const App = dynamic(() => import('../features/App'), { ssr: false });

export default function Home() {
    return <App />;
}
