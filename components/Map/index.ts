import dynamic from 'next/dynamic';

export const Map = dynamic(() => import('./MainContainer/MapMainContainer'), {
    ssr: false,
});
