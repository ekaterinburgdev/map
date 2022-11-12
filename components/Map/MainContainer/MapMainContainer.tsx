import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, ScaleControl } from 'react-leaflet';
import classNames from 'classnames/bind';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { COORDS_EKATERINBURG } from 'common/constants/coords';

import { MapLocation } from 'components/Map/Location/MapLocation';

import styles from './MapMainContainer.module.css';
import 'leaflet/dist/leaflet.css';

const cn = classNames.bind(styles);

function MapMainContainer() {
    const position: [number, number] = COORDS_EKATERINBURG;

    useEffect(() => {
        (async function init() {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
        }());
    }, []);

    return (
        <MapContainer
            center={position}
            scrollWheelZoom
            attributionControl={null}
            zoom={16}
            className={cn(styles.Map)}
        >
            <TileLayer url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />

            <ScaleControl position="topright" />

            <MapLocation />
        </MapContainer>
    );
}

export default MapMainContainer;
