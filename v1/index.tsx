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
    const [hasDistricts, setHasDistricts] = useState(true);

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
                        id="ekb-dtp-source"
                        type="geojson"
                        data="https://cartography-zeta.vercel.app/dtp.geojson"
                    >
                        <Layer
                            id="dtp"
                            type="circle"
                            source="ekb-dtp-source"
                            // source-layer="dtp"
                            paint={{
                                'circle-radius': 2,
                                'circle-color': [
                                    'case',
                                    ['==', ['get', 'severity'], 'Легкий'],
                                    '#36ccaa',
                                    ['==', ['get', 'severity'], 'Тяжёлый'],
                                    '#fdcf4e',
                                    ['==', ['get', 'severity'], 'С погибшими'],
                                    '#ff0000',
                                    '#007cbf',
                                ],
                            }}
                        />
                    </Source>
                )}

                {hasDistricts && (
                    <Source id="ekb-district-style" type="geojson" data="/ekb-districts.json">
                        <Layer
                            id="district"
                            type="line"
                            source="ekb-district-style"
                            paint={{
                                'line-color': '#FFF',
                                'line-width': 2,
                                'line-opacity': 1,
                                'line-dasharray': [0.7, 2],
                            }}
                        />
                        <Layer
                            id="district2"
                            type="symbol"
                            source="ekb-district-style"
                            layout={{
                                'text-field': '{name}',
                                'text-size': 12,
                                'text-font': ['Iset Sans Regular'],
                            }}
                            paint={{
                                'text-color': '#FFF',
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
                    <label
                        htmlFor="districts"
                        style={{
                            display: 'flex',
                            marginTop: '20px',
                            gap: '4px',
                            alignItems: 'center',
                        }}
                    >
                        Районы
                        <input
                            id="districts"
                            type="checkbox"
                            checked={hasDistricts}
                            onChange={() => setHasDistricts(!hasDistricts)}
                        />
                    </label>
                </div>
            </div>
        </MapProvider>
    );
}
