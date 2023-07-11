/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Source, Layer, useMap } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { DESIGN_CODE_ITEMS_COLORS } from 'components/Model/DesignCode/DesignCode.constants';
import { MapItemType } from 'common/types/map-item';
import { usePopup } from '../providers/usePopup';

const DESIGN_CODE_LAYER_ID = 'design-code-point';

export function DesignCodeSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useEffect(() => {
        ekbMap?.current?.on?.('click', DESIGN_CODE_LAYER_ID, (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item.properties?.id, MapItemType.DesignCode);
        });
    }, [ekbMap, openPopup]);

    if (activeFilter !== FilterType.DesignCode || !activeFilterParams) {
        return null;
    }

    const activeItems = Object.entries(activeFilterParams)
        .filter(([_, value]) => value)
        .map(([type]) => [type, DESIGN_CODE_ITEMS_COLORS[type]]);

    const colors = activeItems.map(([type, color]) => [['==', ['get', 'type'], type], color]);

    const strokeColors = activeItems.map(([type]) => [['==', ['get', 'type'], type], '#000']);

    const pointLayerStyle: CircleLayer = {
        id: DESIGN_CODE_LAYER_ID,
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
