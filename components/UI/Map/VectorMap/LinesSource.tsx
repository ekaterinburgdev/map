import React, { useEffect } from 'react';
import { Source, Layer, useMap } from 'react-map-gl';
import type { CircleLayer, LineLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { LINES_CONFIG } from 'components/Model/Lines/Lines.constants';
import { MapItemType } from 'common/types/map-item';
import { usePopup } from 'components/UI/Map/providers/usePopup';
import { LineType } from 'common/data/lines/lineType';
import { getLayerStyle } from 'components/helpers/getLayerStyle';
import useMapHoverObject from '../providers/useMapHoverObject';

export function LinesSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useMapHoverObject('ekb-points-layer');

    useEffect(() => {
        ekbMap?.current?.on?.('click', 'ekb-points-layer', (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            const lineType = item.properties.type;
            if (lineType === LineType.RedLine) {
                openPopup(item.properties?.id, MapItemType.RedLines);
            }
            if (lineType === LineType.PurpleLine) {
                openPopup(item.properties?.id, MapItemType.PinkLines);
            }
            if (lineType === LineType.BlueLine) {
                openPopup(item.properties?.id, MapItemType.BlueLines);
            }
        });
    }, [ekbMap, openPopup]);

    if (activeFilter !== FilterType.Line || !activeFilterParams) {
        return null;
    }

    const activeItems = Object.entries(activeFilterParams)
        .filter(([, value]) => value)
        .map(([type]) => [type, LINES_CONFIG[type]]);

    const colors = activeItems.map(([type, { color }]) => [['==', ['get', 'type'], type], color]);

    const strokeColors = activeItems.map(([type]) => [['==', ['get', 'type'], type], '#000']);

    const pointLayerStyle: CircleLayer = {
        id: 'ekb-points-layer',
        type: 'circle',
        source: 'ekb-points-source',
        paint: {
            'circle-radius': getLayerStyle<number>({ initial: 8, active: 10 }),
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
        source: 'ekb-lines-source',
        paint: {
            // @ts-ignore
            'line-color': ['case'].concat(...colors).concat(['rgba(0, 0, 0, 0)']),
            'line-width': 3,
        },
    };

    return (
        <>
            <Source id="ekb-lines-source" type="geojson" data="/ekb-color-lines.json">
                <Layer {...linesLayerStyle} />
            </Source>
            <Source id="ekb-points-source" type="geojson" data="/ekb-color-points.json" generateId>
                <Layer {...pointLayerStyle} />
            </Source>
        </>
    );
}
