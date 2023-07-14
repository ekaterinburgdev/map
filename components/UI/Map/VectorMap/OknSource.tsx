import React, { useEffect } from 'react';
import { Source, Layer, useMap } from 'react-map-gl';
import type { CircleLayer, FillLayer, LineLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { AREA_CONFIG, OBJECTS_CONFIG } from 'components/Model/OKN/Okn.constants';
import { MapItemType } from 'common/types/map-item';
import { OknAreaType } from 'common/data/okn/oknConstants';
import { usePopup } from '../providers/usePopup';

const OKN_LAYER_ID = 'ekb-okn-layer';

export function OknSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useEffect(() => {
        let activeObject = null;

        ekbMap?.current?.on?.('click', OKN_LAYER_ID, (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item.properties?.id, MapItemType.OKN);
        });

        ekbMap?.current?.on('mousemove', 'ekb-okn-protect-polygon-layer', (e) => {
            if (e.features.length > 0) {
                if (activeObject !== null) {
                    ekbMap?.current?.setFeatureState(
                        { source: 'ekb-okn-protect-source', id: activeObject },
                        { hover: false },
                    );
                }
                activeObject = e.features[0].id;
                ekbMap?.current?.setFeatureState(
                    { source: 'ekb-okn-protect-source', id: activeObject },
                    { hover: true },
                );
            }
        });

        ekbMap?.current?.on('mouseleave', 'ekb-okn-protect-polygon-layer', () => {
            if (activeObject !== null) {
                ekbMap.current.setFeatureState(
                    { source: 'ekb-okn-protect-source', id: activeObject },
                    { hover: false },
                );
            }
            activeObject = null;
        });
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

    const getZoneStyle = (source: string, type: string, zone: OknAreaType): FillLayer => ({
        id: `ekb-okn-${type}-polygon-layer`,
        type: 'fill',
        source,
        paint: {
            'fill-color': AREA_CONFIG[zone].color,
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.8,
                0.5,
            ],
        },
    });

    const getZoneOutlineStyle = (source: string, type: string, zone: OknAreaType): LineLayer => ({
        id: `ekb-okn-${type}-outline-layer`,
        type: 'line',
        source,
        paint: {
            'line-color': AREA_CONFIG[zone].color,
            'line-width': 3,
            'line-dasharray': [2, 2],
        },
    });

    return (
        <>
            <Source id="ekb-okn-source" type="geojson" data="/ekb-okn.json">
                <Layer {...layerStyle} />
            </Source>
            {activeFilterParams[OknAreaType.ProtectZone]?.value && (
                <Source id="ekb-okn-protect-source" type="geojson" data="/ekb-okn-protect.json">
                    <Layer
                        {...getZoneStyle(
                            'ekb-okn-protect-source',
                            'protect',
                            OknAreaType.ProtectZone,
                        )}
                    />
                    <Layer
                        {...getZoneOutlineStyle(
                            'ekb-okn-protect-source',
                            'protect',
                            OknAreaType.ProtectZone,
                        )}
                    />
                </Source>
            )}
            {activeFilterParams[OknAreaType.SecurityZone]?.value && (
                <Source id="ekb-okn-security-source" type="geojson" data="/ekb-okn-security.json">
                    <Layer
                        {...getZoneStyle(
                            'ekb-okn-security-source',
                            'security',
                            OknAreaType.SecurityZone,
                        )}
                    />
                    <Layer
                        {...getZoneOutlineStyle(
                            'ekb-okn-security-source',
                            'security',
                            OknAreaType.SecurityZone,
                        )}
                    />
                </Source>
            )}
            {activeFilterParams[OknAreaType.ObjectZone]?.value && (
                <Source id="ekb-okn-objects-source" type="geojson" data="/ekb-okn-objects.json">
                    <Layer
                        {...getZoneStyle(
                            'ekb-okn-objects-source',
                            'objects',
                            OknAreaType.ObjectZone,
                        )}
                    />
                    <Layer
                        {...getZoneOutlineStyle(
                            'ekb-okn-objects-source',
                            'objects',
                            OknAreaType.ObjectZone,
                        )}
                    />
                </Source>
            )}
        </>
    );
}
