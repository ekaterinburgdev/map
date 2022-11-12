import React, { useEffect, useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { COORDS_EKATERINBURG } from 'common/constants/coords';

export function MapLocation() {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    const map = useMapEvents({
        locationfound(e) {
            if (!position) {
                map.setView(e.latlng, map.getZoom());
            }

            setPosition(e.latlng);
        },
        locationerror(e) {
            console.error(e);
        },
    });

    useEffect(() => {
        map.locate({ watch: true, maxZoom: 16 });

        return () => {
            map.stopLocate();
        };
    }, [map]);

    return (
        <Marker position={position || COORDS_EKATERINBURG}>
            <Popup>Your location</Popup>
        </Marker>
    );
}
