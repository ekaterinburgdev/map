import React, { useEffect, useState } from 'react';
import { getAllPlacemarks } from 'pages/api/dataRepository';

import { Card } from './UI/Card';
import { Copyright } from './UI/Copyright/Copyright';
import { Filter } from './UI/Filter/Filter';
import { Footer } from './UI/Footer/Footer';
import { MapContextProvider } from './UI/Map/providers/MapProvider';
import MapMainContainer from './UI/Map/MainContainer/MapMainContainer';

export default function App() {
    const [placemarks, setPlacemarks] = useState([]);

    useEffect(() => {
        (async function getData() {
            const data = await getAllPlacemarks();
            setPlacemarks(data);
        }());
    });

    return (
        <>
            <MapContextProvider>
                <Filter />
                <MapMainContainer placemarksData={placemarks} />
                <Card />
            </MapContextProvider>

            <Copyright />
            <Footer />
        </>
    );
}
