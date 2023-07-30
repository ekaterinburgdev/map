import React, { useEffect } from 'react';
import { useMap, Marker } from 'react-map-gl';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { DESIGN_CODE_ITEMS_COLORS } from 'components/Model/DesignCode/DesignCode.constants';
import { MapItemType } from 'common/types/map-item';
import { DESIGN_MAP_HOST } from 'common/data/designCode/designCode';
import styles from 'common/data/designCode/DesignCodeMarker.module.css';
import { usePopup } from '../providers/usePopup';
import geojson from '../../../../public/ekb-design-code.json';

const DESIGN_CODE_LAYER_ID = 'design-code-point';

export function DesignCodeSource() {
    const ekbMap = useMap();
    const { popupId, openPopup } = usePopup();
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

    const items = geojson.features.filter((item) => activeFilterParams[item.properties.type]);

    return (
        <>
            {items.map((feature) => (
                <Marker
                    key={feature.properties.id}
                    latitude={feature.geometry.coordinates[1]}
                    longitude={feature.geometry.coordinates[0]}
                    onClick={() => openPopup(feature.properties.id, MapItemType.DesignCode)}
                >
                    <img
                        className={classNames(styles.marker, {
                            [styles.marker_open]: popupId === feature.properties.id,
                        })}
                        style={{ color: DESIGN_CODE_ITEMS_COLORS[feature.properties.type] }}
                        width={40}
                        height={40}
                        src={DESIGN_MAP_HOST + feature.properties.preview}
                        alt={feature.properties.description}
                    />
                </Marker>
            ))}
        </>
    );
}
