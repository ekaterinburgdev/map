import React from 'react';
import dynamic from 'next/dynamic';

export const App = dynamic(() => import('../features/Index/App'), { ssr: false });

export default function Home() {
    return <App />;
}
