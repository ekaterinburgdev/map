import React, { useState } from 'react';
import { MapProvider, Map, Layer, Source } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { AGE_FILTERS_DATA, FLOOR_FILTERS_DATA } from 'components/Model/Houses/Houses.constants';
import 'maplibre-gl/dist/maplibre-gl.css';
import asideStyles from './views/Aside/Aside.module.css';
import { OsmBuildingFilter } from './views/Filters';

const ageRangeData = AGE_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));
const levelsRangeData = FLOOR_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));

export default function App() {
    const [loading, setLoading] = useState(true);
    const [hasDtp, setHasDtp] = useState(false);

    return (
        <MapProvider>
            <Map
                id="ekbMap"
                initialViewState={{
                    latitude: COORDS_EKATERINBURG[0],
                    longitude: COORDS_EKATERINBURG[1],
                    zoom: 12,
                    pitch: 25,
                }}
                minZoom={10}
                maxZoom={20}
                hash
                style={{ width: '100vw', height: '100vh', color: 'black' }}
                mapStyle="https://cartography-zeta.vercel.app/style.json"
                mapLib={maplibregl}
                reuseMaps
                onLoad={() => setLoading(false)}
                onClick={(e) => {
                    // Получить все объекты под указателем мыши
                    const features = e.target.queryRenderedFeatures(e.point);
                    // const features = e.target.queryRenderedFeatures(e.point, {
                    // layers: ['dtp']
                    // });

                    // Если есть хотя бы один объект, показать всплывающее окно
                    if (features.length) {
                        const feature = features[0];

                        new maplibregl.Popup({ offset: 25 })
                            .setLngLat(e.lngLat)
                            .setHTML(JSON.stringify(feature.properties, null, 2))
                            .addTo(e.target as any);
                    }
                }}
            >
                {hasDtp && (
                    <Source
                        id="my-source"
                        type="vector"
                        tiles={['https://cartography-zeta.vercel.app/dtp/{z}/{x}/{y}.pbf']}
                    >
                        <Layer
                            id="dtp"
                            // type="heatmap"
                            type="circle"
                            source="my-source"
                            source-layer="dtp"
                            paint={{
                                'circle-color': 'blue',
                                // 'heatmap-radius':
                                // ['interpolate', ['linear'], ['zoom'], 0, 2, 4, 10],
                                // 'heatmap-intensity':
                                // ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
                                // 'heatmap-color': [
                                //     'interpolate',
                                //     ['linear'],
                                //     ['heatmap-density'],
                                //     0,
                                //     'rgba(33,102,172,0)',
                                //     0.2,
                                //     'rgb(103,169,207)',
                                //     0.4,
                                //     'rgb(209,229,240)',
                                //     0.6,
                                //     'rgb(253,219,199)',
                                //     0.8,
                                //     'rgb(239,138,98)',
                                //     1,
                                //     'rgb(178,24,43)',
                                // ],
                            }}
                        />
                    </Source>
                )}
            </Map>
            <div className={asideStyles.aside}>
                <div style={{ position: 'relative' }}>
                    <OsmBuildingFilter
                        loading={loading}
                        field="building:height"
                        rangeData={levelsRangeData}
                    />
                    <OsmBuildingFilter
                        loading={loading}
                        field="building:year"
                        rangeData={ageRangeData}
                    />
                    <label
                        htmlFor="dtp"
                        style={{
                            display: 'flex',
                            marginTop: '20px',
                            gap: '4px',
                            alignItems: 'center',
                        }}
                    >
                        ДТП
                        <input
                            id="dtp"
                            type="checkbox"
                            checked={hasDtp}
                            onChange={() => setHasDtp(!hasDtp)}
                        />
                    </label>
                </div>
            </div>
        </MapProvider>
    );
}
