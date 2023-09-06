'use client';

import React, { useContext } from 'react';

import MapGl from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { COORDS_EKATERINBURG } from 'constants/coords';

import { BuildingSource } from './layers/BuildingSource';
import { OknSource } from './layers/OknSource';
import { DtpSource } from './layers/DtpSource';
import { LinesSource } from './layers/LinesSource';
import { DesignCodeSource } from './layers/DesignCodeSource';
import { QuarterSource } from './layers/QuarterSource';
import { MapContext } from './providers/MapProvider';

import 'maplibre-gl/dist/maplibre-gl.css';

function MapLayers() {
    return (
        <>
            <BuildingSource />
            <OknSource />
            <DtpSource />
            <LinesSource />
            <DesignCodeSource />
            <QuarterSource />
        </>
    );
}

export function Map() {
    const { loading, setLoading } = useContext(MapContext);

    return (
        <MapGl
            id="ekbMap"
            initialViewState={{
                latitude: COORDS_EKATERINBURG[1],
                longitude: COORDS_EKATERINBURG[0],
                zoom: 15,
                pitch: 30,
            }}
            minZoom={11}
            maxZoom={20}
            // hash
            style={{ width: '100vw', height: '100vh', color: 'black' }}
            mapStyle="https://map-backend.netlify.app/style.json"
            // @ts-ignore
            mapLib={maplibregl}
            antialias
            reuseMaps
            onLoad={() => setLoading(false)}
            // Disable RTL plugin
            RTLTextPlugin={null}
        >
            {!loading && <MapLayers />}
        </MapGl>
    );
}
