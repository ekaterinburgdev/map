'use client';

import React, { useState } from 'react';

import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { COORDS_EKATERINBURG } from 'common/constants/coords';

import { BuildingSource } from './VectorMap/BuildingSource';
import { OknSource } from './VectorMap/OknSource';
import { DtpSource } from './VectorMap/DtpSource';
import { LinesSource } from './VectorMap/LinesSource';
import { DesignCodeSource } from './VectorMap/DesignCodeSource';

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
    const [loading, setLoading] = useState(true);

    return (
        <Map
            id="ekbMap"
            initialViewState={{
                latitude: COORDS_EKATERINBURG[0],
                longitude: COORDS_EKATERINBURG[1],
                zoom: 15,
                pitch: 0,
            }}
            minZoom={10}
            maxZoom={20}
            // hash
            style={{ width: '100vw', height: '100vh', color: 'black' }}
            mapStyle="https://cartography-zeta.vercel.app/style.json"
            // @ts-ignore
            mapLib={maplibregl}
            reuseMaps
            onLoad={() => setLoading(false)}
            // onClick={(e) => {
            //     try {
            //         // Получить все объекты под указателем мыши
            //         const features = e.target.queryRenderedFeatures(e.point);
            //         // const features = e.target.queryRenderedFeatures(e.point, {
            //         // layers: ['dtp']
            //         // });

            //         // Если есть хотя бы один объект, показать всплывающее окно
            //         if (features.length) {
            //             const feature = features[0];

            //             new maplibregl.Popup({ offset: 25 })
            //                 .setLngLat(e.lngLat)
            //                 .setHTML(JSON.stringify(feature.properties, null, 2))
            //                 .addTo(e.target as any);
            //         }
            //     } catch (e) {
            //         console.log(e);
            //     }
            // }}
        >
            {!loading && <MapLayers />}
        </Map>
    );
}
