import React, { useEffect } from 'react';
import { useMap, Source, Layer, Marker, CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { DESIGN_CODE_ITEMS_COLORS } from 'components/Layers/DesignCode/DesignCode.constants';
import { MapItemType } from 'types/map-item';
import { DESIGN_MAP_HOST } from 'components/Layers/DesignCode/designCode';
import styles from 'helpers/DesignCodeMarker.module.css';
import { getLayerStyle } from 'components/Map/helpers/getFeatureState';
import { usePopup } from '../providers/usePopup';
import geojson from '../../../public/ekb-design-code.json';
import useMapObjectState from '../providers/useMapObjectState';

const DESIGN_CODE_LAYER_ID = 'design-code-point';

const DESIGN_CODE_MARKER_CLICKABLE_SIZE = 22;
const DESIGN_CODE_MARKER_IMAGE_SIZE = 40;

export function DesignCodeSource() {
    const ekbMap = useMap();
    const { popupId, openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useMapObjectState(DESIGN_CODE_LAYER_ID);

    useEffect(() => {
        ekbMap?.current?.on?.('click', DESIGN_CODE_LAYER_ID, (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item.properties?.id, MapItemType.DesignCode);
        });
    }, [ekbMap, openPopup]);

    if (activeFilter !== FilterType.DesignCode || !activeFilterParams) {
        return null;
    }

    const items = geojson.features.filter((item) => activeFilterParams[item.properties.type]);

    const fakeClickableMarkersLayerStyle: CircleLayer = {
        id: DESIGN_CODE_LAYER_ID,
        type: 'circle',
        source: 'ekb-design-code-source',
        paint: {
            'circle-radius': getLayerStyle<number>({
                initial: DESIGN_CODE_MARKER_CLICKABLE_SIZE,
                hover: DESIGN_CODE_MARKER_CLICKABLE_SIZE * 1.2,
                active: DESIGN_CODE_MARKER_CLICKABLE_SIZE * 1.3,
            }),
            'circle-opacity': 1,
        },
    };

    return (
        <Source type="geojson" generateId data="/ekb-design-code.json">
            <Layer {...fakeClickableMarkersLayerStyle} />
            {items.map((feature) => (
                <Marker
                    key={feature.properties.id}
                    latitude={feature.geometry.coordinates[1]}
                    longitude={feature.geometry.coordinates[0]}
                >
                    <img
                        className={classNames(styles.marker, {
                            [styles.marker_open]: popupId === feature.properties.id,
                        })}
                        style={{ color: DESIGN_CODE_ITEMS_COLORS[feature.properties.type] }}
                        width={DESIGN_CODE_MARKER_IMAGE_SIZE}
                        height={DESIGN_CODE_MARKER_IMAGE_SIZE}
                        src={DESIGN_MAP_HOST + feature.properties.preview}
                        alt={feature.properties.description}
                    />
                </Marker>
            ))}
        </Source>
    );
}
