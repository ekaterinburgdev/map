import { Source, Layer, useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import type { CircleLayer, FillLayer, LineLayer } from 'react-map-gl';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { AREA_CONFIG, OBJECTS_CONFIG } from 'components/Model/OKN/Okn.constants';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { getLayerActiveStyle } from 'components/helpers/activeObject';
import { MapItemType } from 'common/types/map-item';
import { OknAreaType } from 'common/data/okn/oknConstants';
import { usePopup } from '../providers/usePopup';
import useMapHoverObject from '../providers/useMapHoverObject';

const LAYERS = {
    points: {
        data: '/ekb-okn.json',
        layer: 'ekb-okn-layer',
        source: 'ekb-okn-source',
        zone: null,
    },
    protect: {
        data: '/ekb-okn-protect.json',
        layer: 'ekb-okn-protect-layer',
        source: 'ekb-okn-protect-source',
        zone: OknAreaType.ProtectZone,
    },
    security: {
        data: '/ekb-okn-security.json',
        layer: 'ekb-okn-security-layer',
        source: 'ekb-okn-security-source',
        zone: OknAreaType.SecurityZone,
    },
    objects: {
        data: '/ekb-okn-objects.json',
        layer: 'ekb-okn-objects-layer',
        source: 'ekb-okn-objects-source',
        zone: OknAreaType.ObjectZone,
    },
};

export function OknSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useMapHoverObject(LAYERS.points.layer, LAYERS.points.source);
    useMapHoverObject(LAYERS.protect.layer, LAYERS.protect.source);
    useMapHoverObject(LAYERS.security.layer, LAYERS.security.source);
    useMapHoverObject(LAYERS.objects.layer, LAYERS.objects.source);

    useEffect(() => {
        const map = ekbMap.current;

        const handlePointClick = (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item?.properties?.id, MapItemType.OKN);
        };

        map.on('click', 'ekb-okn-layer', handlePointClick);

        return () => { map.off('click', 'ekb-okn-layer', handlePointClick); };
    }, [ekbMap, openPopup]);

    if (activeFilter !== FilterType.OKN || !activeFilterParams) {
        return null;
    }

    const activeItems = Object.entries(activeFilterParams)
    // @ts-ignore
        .filter(([, { value, type }]) => value && type === 'objects');

    if (activeItems.length === 0) {
        return null;
    }

    const colors = activeItems
        .map(([category]) => [['==', ['get', 'category'], category], OBJECTS_CONFIG[category].color]);

    const strokeColors = activeItems
        .map(([category]) => [['==', ['get', 'category'], category], '#000']);

    const layerStyle: CircleLayer = {
        id: LAYERS.points.layer,
        type: 'circle',
        source: LAYERS.points.source,
        paint: {
            // @ts-ignore
            'circle-radius': getLayerActiveStyle(10, 12),
            // @ts-ignore
            'circle-color': ['case'].concat(...colors).concat(['rgba(0, 0, 0, 0)']),
            'circle-stroke-width': 1,
            // @ts-ignore
            'circle-stroke-color': ['case'].concat(...strokeColors).concat(['rgba(0, 0, 0, 0)']),
        },
    };

    const getZoneStyle = (type: string): FillLayer => ({
        id: LAYERS[type].layer,
        type: 'fill',
        source: LAYERS[type].source,
        paint: {
            'fill-color': AREA_CONFIG[LAYERS[type].zone].color,
            // @ts-ignore
            'fill-opacity': getLayerActiveStyle(0.5, 0.8),
        },
    });

    const getZoneOutlineStyle = (type: string): LineLayer => ({
        id: `${LAYERS[type].layer}-outline`,
        type: 'line',
        source: LAYERS[type].source,
        paint: {
            'line-color': AREA_CONFIG[LAYERS[type].zone].color,
            'line-width': 3,
            'line-dasharray': [2, 2],
        },
    });

    return (
        <>
            <Source id={LAYERS.points.source} data={LAYERS.points.data} type="geojson" generateId>
                <Layer {...layerStyle} />
            </Source>

            {Object.keys(LAYERS).map((layerId) => (
                activeFilterParams[LAYERS[layerId].zone]?.value && (
                    <Source id={LAYERS[layerId].source} data={LAYERS[layerId].data} type="geojson" generateId>
                        <Layer {...getZoneStyle(layerId)} />
                        <Layer {...getZoneOutlineStyle(layerId)} />
                    </Source>
                )
            ))}
        </>
    );
}
