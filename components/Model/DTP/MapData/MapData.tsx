import React, { useContext, useMemo } from 'react';
import { LatLngExpression } from 'leaflet';

import { MapItemType } from 'common/types/map-item';
import { MARKER_COLOR } from 'common/constants/colors';
import { Point } from 'components/UI/Map/Point';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

export type OKNMapDataProps = {
    id: string;
    coords: LatLngExpression;
};

export function DTPMapData({ id, coords }: OKNMapDataProps) {
    const {
        openPopup, closePopup, popupId, popupType,
    } = useContext(MapContext);
    const isOpen = useMemo(
        () => id === popupId && popupType === MapItemType.DTP,
        [id, popupId, popupType],
    );

    return (
        <Point
            key={MapItemType.DTP + id}
            id={id}
            type={MapItemType.DTP}
            color={MARKER_COLOR[MapItemType.DTP]}
            position={coords}
            preview={null}
            isOpen={isOpen}
            openPopup={openPopup}
            closePopup={closePopup}
        />
    );
}
