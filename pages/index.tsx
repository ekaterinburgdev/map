/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { Map } from 'components/UI/Map';
import { Footer } from 'components/Footer/Footer';
import { MapContextProvider } from 'components/UI/Map/providers/MapProvider';
import { getAllPlacemarks } from "./api/dataRepository";

export default function Home() {
    const [placemarks, setPlacemarks] = useState([]);
    
    useEffect(() => {
        async function getData(){
            const data = await getAllPlacemarks();
            setPlacemarks(data);
        }
        void getData();
    })
    
    return (
        <>
            <MapContextProvider>
                <Map placemarksData={placemarks} />
            </MapContextProvider>

            <Footer />
        </>
    );
}
