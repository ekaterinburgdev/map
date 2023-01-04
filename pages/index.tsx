import React, {useState} from 'react';
import {Map} from 'components/Map';
import {Footer} from 'components/Footer/Footer';
import {MapContextProvider} from 'components/Map/providers/MapProvider';
import {MapItem, MapItemType} from "../common/types/map-item";
// import placemarks from 'public/notion-static/placemarks.json';

export default function Home() {
    const ex : MapItem = {
        coords: [50, 55],
        description: "",
        id: "",
        images: [],
        name: "",
        preview: undefined,
        street: "",
        type: MapItemType['Светофор']

    }
    const [placemarks, setPlacemarks] = useState([ex]);
    return (
        <>
            <MapContextProvider>
                <Map placemarksData={placemarks} />
            </MapContextProvider>

            <Footer />
        </>
    );
}
