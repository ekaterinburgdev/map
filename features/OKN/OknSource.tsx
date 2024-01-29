import { Source, Layer, useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { CircleLayer, FillLayer, LineLayer, Marker } from 'react-map-gl';
import classNames from 'classnames';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { AREA_CONFIG, OBJECTS_CONFIG } from 'features/OKN/Okn.constants';
import { FilterType } from 'types/Filters.types';
import { getLayerStyle } from 'features/Map/helpers/getFeatureState';
import { OknAreaType } from 'features/OKN/oknConstants';
import { MapItemType } from 'types/Content.types';
import { usePopup } from 'features/Map/providers/usePopup';
import useMapObjectState from 'features/Map/helpers/useMapObjectState';
import geojson from 'public/okn-static/placemarks.json';
import styles from './OknMarker.module.css';

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

const OKN_MARKER_CLICKABLE_SIZE = 15;
const OKN_MARKER_IMAGE_SIZE = (OKN_MARKER_CLICKABLE_SIZE + 2) * 2;
// because the main marker larger than the image marker

const isOneObject = (coordinates: number[] | number[][]): coordinates is number[] => {
    return typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number';
};

export function OknSource() {
    const ekbMap = useMap();
    const { openPopup, popupId } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useMapObjectState(LAYERS.points.layerId);
    useMapObjectState(LAYERS.protect.layerId);
    useMapObjectState(LAYERS.security.layerId);
    useMapObjectState(LAYERS.objects.layerId);

    useEffect(() => {
        const map = ekbMap.current;

        const handlePointClick = (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item?.properties?.id, MapItemType.OKN);
        };

        map.on('click', 'ekb-okn-layer', handlePointClick);

        return () => {
            map.off('click', 'ekb-okn-layer', handlePointClick);
        };
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

    const layerStyle: CircleLayer = {
        id: LAYERS.points.layerId,
        type: 'circle',
        source: LAYERS.points.sourceId,
        paint: {
            'circle-radius': getLayerStyle<number>({
                initial: OKN_MARKER_CLICKABLE_SIZE,
                hover: OKN_MARKER_CLICKABLE_SIZE * 1.4,
                active: OKN_MARKER_CLICKABLE_SIZE * 1.7,
            }),
            // @ts-ignore
            'circle-opacity': 0,
        },
    };

    const getZoneStyle = (type: string): FillLayer => ({
        id: LAYERS[type].layerId,
        type: 'fill',
        source: LAYERS[type].sourceId,
        paint: {
            'fill-color': AREA_CONFIG[LAYERS[type].zone].color,
            'fill-opacity': getLayerStyle<number>({
                initial: 0.5,
                hover: 0.8,
                active: 0.8,
            }),
        },
    });

    const getZoneOutlineStyle = (type: string): LineLayer => ({
        id: `${LAYERS[type].layerId}-outline`,
        type: 'line',
        source: LAYERS[type].sourceId,
        paint: {
            'line-color': AREA_CONFIG[LAYERS[type].zone].color,
            'line-width': 3,
            'line-dasharray': [2, 2],
        },
    });

    const items = geojson.filter((item) => activeFilterParams[item.properties.category].value);

    return (
        <>
            {Object.keys(LAYERS).map(
                (layerKey, i) =>
                    activeFilterParams[LAYERS[layerKey].zone]?.value && (
                        <Source
                            key={i}
                            id={LAYERS[layerKey].sourceId}
                            data={LAYERS[layerKey].dataPath}
                            type="geojson"
                            generateId
                        >
                            <Layer {...getZoneStyle(layerKey)} />
                            <Layer {...getZoneOutlineStyle(layerKey)} />
                        </Source>
                    ),
            )}
            <Source
                id={LAYERS.points.sourceId}
                data={LAYERS.points.dataPath}
                type="geojson"
                generateId
            >
                <Layer {...layerStyle} />
                {items.map((feature) => {
                    if (isOneObject(feature.geometry.coordinates)) {
                        const props = {
                            className: classNames(styles.marker, {
                                [styles.marker_open]: popupId === String(feature.properties.id),
                            }),
                            style: {
                                color: OBJECTS_CONFIG[feature.properties.category].color,
                                width: OKN_MARKER_IMAGE_SIZE,
                                height: OKN_MARKER_IMAGE_SIZE,
                            },
                        };

                        return (
                            <Marker
                                key={feature.properties.id}
                                latitude={feature.geometry.coordinates[1]}
                                longitude={feature.geometry.coordinates[0]}
                            >
                                {feature.preview?.s.src ? (
                                    <img
                                        {...props}
                                        src={feature.preview?.s.src}
                                        alt={feature.properties.name}
                                    />
                                ) : (
                                    <div {...props} />
                                )}
                            </Marker>
                        );
                    }
                })}
            </Source>
        </>
    );
}
