import React, { useContext, useMemo } from 'react';
import { LatLngExpression } from 'leaflet';

import { MapItemType } from 'common/types/map-item';
import { MARKER_COLOR } from 'common/constants/colors';
import { Shape } from 'components/UI/Map/Shape/Shape';
import { Point } from 'components/UI/Map/Point';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

import { OKNMapDataProps } from './MapData.types';

export function OKNMapData({ id, coords }: OKNMapDataProps) {
    const {
        openPopup, closePopup, popupId, popupType,
    } = useContext(MapContext);
    const isOpen = useMemo(
        () => id === popupId && popupType === MapItemType.OKN,
        [id, popupId, popupType],
    );

    return (
        <>
            {Array.isArray(coords[0]) ? (
                <Shape
                    openModal={openPopup}
                    id={id}
                    type={MapItemType.OKN}
                    positions={coords as LatLngExpression[]}
                    color={MARKER_COLOR[MapItemType.OKN]}
                    fillOpacity={0.3}
                    weight={3}
                    dashed
                />
            ) : (
                <Point
                    key={MapItemType.OKN + id}
                    id={id}
                    type={MapItemType.OKN}
                    color={MARKER_COLOR[MapItemType.OKN]}
                    position={coords as LatLngExpression}
                    preview={null}
                    isOpen={isOpen}
                    openPopup={openPopup}
                    closePopup={closePopup}
                />
            )}
        </>
    );
}
