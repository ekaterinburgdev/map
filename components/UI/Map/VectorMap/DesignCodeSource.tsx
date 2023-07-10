import React from 'react';
import { Source, Layer } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { DESIGN_CODE_ITEMS_COLORS } from 'components/Model/DesignCode/DesignCode.constants';

export function DesignCodeSource() {
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    if (activeFilter !== FilterType.DesignCode || !activeFilterParams) {
        return null;
    }

    const activeItems = Object.entries(activeFilterParams)
        .filter(([_, value]) => value)
        .map(([type]) => [type, DESIGN_CODE_ITEMS_COLORS[type]]);

    const colors = activeItems.map(([type, color]) => [['==', ['get', 'type'], type], color]);

    const strokeColors = activeItems.map(([type]) => [['==', ['get', 'type'], type], '#000']);

    const pointLayerStyle: CircleLayer = {
        id: 'point',
        type: 'circle',
        source: 'ekb-design-code-source',
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
            <Source id="ekb-design-code-source" type="geojson" data="/ekb-design-code.json">
                <Layer {...pointLayerStyle} />
            </Source>
        </>
    );
}
