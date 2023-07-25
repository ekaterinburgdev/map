'use client';

import React, { useContext } from 'react';

import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { COORDS_EKATERINBURG } from 'common/constants/coords';

import { BuildingSource } from './VectorMap/BuildingSource';
import { OknSource } from './VectorMap/OknSource';
import { DtpSource } from './VectorMap/DtpSource';
import { LinesSource } from './VectorMap/LinesSource';
import { DesignCodeSource } from './VectorMap/DesignCodeSource';
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
        </>
    );
}

export function VectorMap() {
    const { loading, setLoading } = useContext(MapContext);

    return (
        <Map
            id="ekbMap"
            initialViewState={{
                latitude: COORDS_EKATERINBURG[0],
                longitude: COORDS_EKATERINBURG[1],
                zoom: 15,
                pitch: 30,
            }}
            minZoom={12}
            maxZoom={20}
            // hash
            style={{ width: '100vw', height: '100vh', color: 'black' }}
            mapStyle="https://cartography-zeta.vercel.app/style.json"
            // @ts-ignore
            mapLib={maplibregl}
            antialias
            reuseMaps
            onLoad={() => setLoading(false)}
        >
            {!loading && <MapLayers />}
        </Map>
    );
}
