import React from 'react';
import { Source, Layer } from 'react-map-gl';
import type { CircleLayer, LineLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { LINES_CONFIG } from 'components/Model/Lines/Lines.constants';

export function LinesSource() {
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    if (activeFilter !== FilterType.Line || !activeFilterParams) {
        return null;
    }

    const activeItems = Object.entries(activeFilterParams)
        .filter(([_, value]) => value)
        .map(([type]) => [type, LINES_CONFIG[type]]);

    const colors = activeItems.map(([type, { color }]) => [['==', ['get', 'type'], type], color]);

    const strokeColors = activeItems.map(([type]) => [['==', ['get', 'type'], type], '#000']);

    const pointLayerStyle: CircleLayer = {
        id: 'point',
        type: 'circle',
        source: 'ekb-lines-source',
        paint: {
            'circle-radius': 8,
            // @ts-ignore
            'circle-color': ['case'].concat(...colors).concat(['rgba(0, 0, 0, 0)']),
            'circle-stroke-width': 1,
            // @ts-ignore
            'circle-stroke-color': ['case'].concat(...strokeColors).concat(['rgba(0, 0, 0, 0)']),
        },
    };

    const linesLayerStyle: LineLayer = {
        id: 'lines',
        type: 'line',
        source: 'ekb-points-source',
        paint: {
            // @ts-ignore
            'line-color': ['case'].concat(...colors).concat(['rgba(0, 0, 0, 0)']),
            'line-width': 3,
        },
    };

    return (
        <>
            <Source id="ekb-lines-source" type="geojson" data="/ekb-color-lines.geojson">
                <Layer {...linesLayerStyle} />
            </Source>
            <Source id="ekb-points-source" type="geojson" data="/ekb-color-points.geojson">
                <Layer {...pointLayerStyle} />
            </Source>
        </>
    );
}
