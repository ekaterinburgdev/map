/* eslint-disable */

import React, {useEffect, useMemo, useState} from 'react';
import L from 'leaflet';
import {MapContainer, ScaleControl, TileLayer} from 'react-leaflet';
import classNames from 'classnames/bind';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import {COORDS_EKATERINBURG} from 'common/constants/coords';

import {MapLocation} from 'components/Map/Location/MapLocation';

import styles from './MapMainContainer.module.css';
import 'leaflet/dist/leaflet.css';
import {Marker} from "../Marker";
import {MapItemType} from "../../../common/types/map-item";

const cn = classNames.bind(styles);

function MapMainContainer() {
    const position: [number, number] = COORDS_EKATERINBURG;
    const [okns, setOkns] = useState<any>();

    useEffect(() => {
        (async function init() {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
        }());
    }, []);
    
    useEffect(() => {
        // load okns
        fetch("https://map-api.ekaterinburg.io/api/okns?populate=geometry,data&pagination[pageSize]=60")
            .then(async (x) => JSON.parse(await x.text()).data)
            .then((x) => setOkns(x));
    }, [])

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
            {okns && okns.map((x) => {
                let preview = x.attributes.data.img.split(",")[0].slice(8, -1) ?? null;
                return <Marker id={x.id} name={x.attributes.data.name} type={MapItemType["Таблички ОКН"]}
                        x={x.attributes.geometry.coordinates[1]}
                        y={x.attributes.geometry.coordinates[0]}
                        preview={preview}
                        isOpen={false}
                        openPopup={(t) => {alert(x.attributes.data.name)}}
                        closePopup={() => {}}/>
            })}
        </MapContainer>
    );
}

export default MapMainContainer;
