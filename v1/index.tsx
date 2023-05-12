import React, { useState } from 'react';
import { MapProvider, Map } from 'react-map-gl';
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

    return (
        <MapProvider>
            <Map
                id="ekbMap"
                initialViewState={{
                    latitude: COORDS_EKATERINBURG[0],
                    longitude: COORDS_EKATERINBURG[1],
                    zoom: 14,
                    pitch: 60,
                }}
                minZoom={11}
                maxZoom={16}
                hash
                style={{ width: '100vw', height: '100vh' }}
                mapStyle="http://localhost:9000/style.json"
                mapLib={maplibregl}
                reuseMaps
                onLoad={() => setLoading(false)}
            />
            <div className={asideStyles.aside}>
                <div style={{ position: 'relative' }}>
                    <OsmBuildingFilter
                        loading={loading}
                        field="building:year"
                        rangeData={ageRangeData}
                    />
                    <OsmBuildingFilter
                        loading={loading}
                        field="building:height"
                        rangeData={levelsRangeData}
                    />
                </div>
            </div>
        </MapProvider>
    );
}
