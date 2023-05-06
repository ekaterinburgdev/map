import React, { useContext, useMemo } from 'react';
import { LatLngExpression } from 'leaflet';

import { MapItemType } from 'common/types/map-item';
import { Shape } from 'components/UI/Map/Shape/Shape';
import { Point, Sizes } from 'components/UI/Map/Point';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

import { AREA_CONFIG, OBJECTS_CONFIG } from '../Okn.constants';

import { OKNMapDataProps } from './MapData.types';

export function OKNMapData({ id, coords, type, preview, unclickable = false }: OKNMapDataProps) {
    const { openPopup, closePopup, popupId, popupType } = useContext(MapContext);
    const isOpen = useMemo(
        () => id?.toString() === popupId?.toString() && popupType === MapItemType.OKN,
        [id, popupId, popupType],
    );
    const color = useMemo(() => {
        const config = [...AREA_CONFIG, ...OBJECTS_CONFIG].find(
            (configItem) => configItem.label === type,
        );

        return config.color;
    }, [type]);

    return (
        <>
            {Array.isArray(coords[0]) ? (
                <Shape
                    openModal={!unclickable ? openPopup : undefined}
                    id={id}
                    type={MapItemType.OKN}
                    positions={coords as LatLngExpression[]}
                    color={color}
                    fillOpacity={0.3}
                    weight={2}
                    dashed
                />
            ) : (
                <Point
                    key={MapItemType.OKN + id}
                    id={id}
                    type={MapItemType.OKN}
                    color={color}
                    position={coords as LatLngExpression}
                    preview={preview}
                    isOpen={isOpen}
                    size={Sizes.S}
                    openPopup={!unclickable ? openPopup : undefined}
                    closePopup={closePopup}
                />
            )}
        </>
    );
}
