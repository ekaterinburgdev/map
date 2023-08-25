import React, { useEffect, useState } from 'react';
import { Source, Layer, useMap, Marker } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'types/Filters.types';
import { MapItemType } from 'types/map-item';
import { usePopup } from 'components/Map/providers/usePopup';
import { CameraMarker } from 'components/Layers/Cameras/CameraMarker';
import useMapObjectState from '../providers/useMapObjectState';
import cameras from '../../../public/ekb-cameras.json';

export const EKB_CAMERAS_SOURCE_ID = 'ekb-camera-source';
export const EKB_CAMERAS_LAYER_ID = 'ekb-camera-layer';

export function CameraSource() {
    const ekbMap = useMap();
    const { popupId, openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const [hoveredId, setIsHovered] = useState<string>();

    useMapObjectState(EKB_CAMERAS_LAYER_ID);

    useEffect(() => {
        ekbMap?.current?.on?.('click', EKB_CAMERAS_LAYER_ID, (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item.properties?.id, MapItemType.Camera);
        });
    }, [ekbMap, openPopup]);

    if (activeFilter !== FilterType.Camera) {
        return null;
    }

    const fakeClickableMarkersLayerStyle: CircleLayer = {
        type: 'circle',
        id: EKB_CAMERAS_LAYER_ID,
        source: EKB_CAMERAS_SOURCE_ID,
        paint: {
            'circle-color': 'transparent',
            'circle-radius': 30,
        },
    };

    return (
        <Source id="ekb-camera-source" type="geojson" data="/ekb-cameras.json" generateId>
            <Layer {...fakeClickableMarkersLayerStyle} />
            {cameras.features.map((feature) => {
                const isActive = popupId === feature.properties.id;
                const isHovered = hoveredId === feature.properties.id;

                const getTransform = () => {
                    if (isActive) {
                        return 'scale(1.4)';
                    }

                    if (isHovered) {
                        return 'scale(1.1)';
                    }

                    return undefined;
                };

                return (
                    <Marker
                        key={feature.properties.id}
                        latitude={feature.geometry.coordinates[1]}
                        longitude={feature.geometry.coordinates[0]}
                    >
                        <div
                            style={{
                                transition: 'all .1s',
                                rotate: `${feature.properties.angle}deg`,
                                transform: getTransform(),
                            }}
                            onMouseEnter={() => setIsHovered(feature.properties.id)}
                            onMouseLeave={() => setIsHovered(feature.properties.id)}
                        >
                            <CameraMarker isActive={isActive} />
                        </div>
                    </Marker>
                );
            })}
        </Source>
    );
}
