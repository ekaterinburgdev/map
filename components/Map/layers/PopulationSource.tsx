import { Source, Layer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import React from 'react';
import type { FillLayer } from 'react-map-gl';
import { activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'types/Filters.types';
import useMapObjectState from '../providers/useMapObjectState';

const layerId = 'ekb-population-layer';
const sourceId = 'ekb-population-source';

export function PopulationSource() {
    const activeFilter = useSelector(activeFilterSelector);

    useMapObjectState(layerId);

    if (activeFilter !== FilterType.Population) {
        return null;
    }

    const layerStyle: FillLayer = {
        id: layerId,
        type: 'fill',
        source: sourceId,
        paint: {
            // @ts-ignore
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'population'],
                0,
                'green',
                8000,
                'red',
            ],
            'fill-opacity': 0.5,
        },
    };

    return (
        <Source
            id={sourceId}
            data="https://map-backend.netlify.app/kontur-population.json"
            type="geojson"
            generateId
        >
            <Layer {...layerStyle} />
        </Source>
    );
}
