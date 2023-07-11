import React, { useEffect } from 'react';
import { Source, Layer, useMap } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { OBJECTS_CONFIG } from 'components/Model/OKN/Okn.constants';
import { MapItemType } from 'common/types/map-item';
import { usePopup } from '../providers/usePopup';

const OKN_LAYER_ID = 'ekb-okn-source';

export function OknSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useEffect(() => {
        ekbMap?.current?.on?.('click', OKN_LAYER_ID, (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item.properties?.id, MapItemType.OKN);
        });
    }, [ekbMap, openPopup]);

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
        id: OKN_LAYER_ID,
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
