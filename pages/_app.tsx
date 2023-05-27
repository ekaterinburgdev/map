import React from 'react';
import dynamic from 'next/dynamic';

import 'styles/globals.css';
import 'ekb/style.css';

export const App = dynamic(() => import('../components/App'), { ssr: false });

export default function Home() {
    return <App />;
}
