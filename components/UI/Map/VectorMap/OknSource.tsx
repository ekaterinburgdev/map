import { Source, Layer, useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import type { CircleLayer, FillLayer, LineLayer } from 'react-map-gl';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { AREA_CONFIG, OBJECTS_CONFIG } from 'components/Model/OKN/Okn.constants';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { getLayerStyle } from 'components/helpers/getLayerStyle';
import { MapItemType } from 'common/types/map-item';
import { OknAreaType } from 'common/data/okn/oknConstants';
import { usePopup } from '../providers/usePopup';
import useMapHoverObject from '../providers/useMapHoverObject';

const LAYERS = {
    points: {
        dataPath: '/ekb-okn.json',
        layerId: 'ekb-okn-layer',
        sourceId: 'ekb-okn-source',
        zone: null,
    },
    protect: {
        dataPath: '/ekb-okn-protect.json',
        layerId: 'ekb-okn-protect-layer',
        sourceId: 'ekb-okn-protect-source',
        zone: OknAreaType.ProtectZone,
    },
    security: {
        dataPath: '/ekb-okn-security.json',
        layerId: 'ekb-okn-security-layer',
        sourceId: 'ekb-okn-security-source',
        zone: OknAreaType.SecurityZone,
    },
    objects: {
        dataPath: '/ekb-okn-objects.json',
        layerId: 'ekb-okn-objects-layer',
        sourceId: 'ekb-okn-objects-source',
        zone: OknAreaType.ObjectZone,
    },
};

export function OknSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useMapHoverObject(LAYERS.points.layerId);
    useMapHoverObject(LAYERS.protect.layerId);
    useMapHoverObject(LAYERS.security.layerId);
    useMapHoverObject(LAYERS.objects.layerId);

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
        id: LAYERS.points.layerId,
        type: 'circle',
        source: LAYERS.points.sourceId,
        paint: {
            'circle-radius': getLayerStyle<number>({ initial: 10, active: 12 }),
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
        source: LAYERS[type].sourceId,
        paint: {
            'fill-color': AREA_CONFIG[LAYERS[type].zone].color,
            'fill-opacity': getLayerStyle<number>({ initial: 0.5, active: 0.8 }),
        },
    });

    const getZoneOutlineStyle = (type: string): LineLayer => ({
        id: `${LAYERS[type].layer}-outline`,
        type: 'line',
        source: LAYERS[type].sourceId,
        paint: {
            'line-color': AREA_CONFIG[LAYERS[type].zone].color,
            'line-width': 3,
            'line-dasharray': [2, 2],
        },
    });

    return (
        <>
            <Source id={LAYERS.points.sourceId} data={LAYERS.points.dataPath} type="geojson" generateId>
                <Layer {...layerStyle} />
            </Source>

            {Object.keys(LAYERS).map((layerKey) => (
                activeFilterParams[LAYERS[layerKey].zone]?.value && (
                    <Source id={LAYERS[layerKey].sourceId} data={LAYERS[layerKey].data} type="geojson" generateId>
                        <Layer {...getZoneStyle(layerKey)} />
                        <Layer {...getZoneOutlineStyle(layerKey)} />
                    </Source>
                )
            ))}
        </>
    );
}
