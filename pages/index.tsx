/* eslint-disable */
import dynamic from 'next/dynamic';

export const App = dynamic(() => import('../components/App'), {
    ssr: false,
});

export default function Home() {
    return <App />;
}
