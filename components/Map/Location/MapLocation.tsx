import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';

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

    return null;
}
