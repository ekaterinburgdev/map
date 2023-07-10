import React from 'react';
import { Source, Layer } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { OBJECTS_CONFIG } from 'components/Model/OKN/Okn.constants';

export function OknSource() {
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    if (activeFilter !== FilterType.OKN || !activeFilterParams) {
        return null;
    }

    const colors = Object.entries(activeFilterParams)
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, { value, type }]) => value && type === 'objects')
        .map(([category]) => [
            ['==', ['get', 'category'], category],
            OBJECTS_CONFIG[category].color,
        ]);

    const strokeColors = Object.entries(activeFilterParams)
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, { value, type }]) => value && type === 'objects')
        .map(([category]) => [['==', ['get', 'category'], category], '#000']);

    const layerStyle: CircleLayer = {
        id: 'point',
        type: 'circle',
        source: 'ekb-okn-source',
        paint: {
            'circle-radius': 8,
            // @ts-ignore
            'circle-color': ['case'].concat(...colors).concat(['rgba(0, 0, 0, 0)']),
            'circle-stroke-width': 1,
            // @ts-ignore
            'circle-stroke-color': ['case'].concat(...strokeColors).concat(['rgba(0, 0, 0, 0)']),
        },
    };

    return (
        <>
            <Source id="ekb-okn-source" type="geojson" data="/ekb-okn.geojson">
                <Layer {...layerStyle} />
            </Source>
        </>
    );
}
