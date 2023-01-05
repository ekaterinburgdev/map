/* eslint-disable */

import React, {useEffect, useState} from 'react';
import { Map } from 'components/Map';
import { MapContextProvider } from 'components/Map/providers/MapProvider';
import {getAllPlacemarks} from "./api/dataRepository";

export default function Widget() {
    const [placemarks, setPlacemarks] = useState([]);

    useEffect(() => {
        async function getData(){
            const data = await getAllPlacemarks();
            setPlacemarks(data);
        }
        void getData();
    })
    
    return (
        <MapContextProvider>
            <Map placemarksData={placemarks} showFilterHeading={false} />
        </MapContextProvider>
    );
}
