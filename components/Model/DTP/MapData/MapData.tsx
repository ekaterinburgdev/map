import React, { useContext, useMemo } from 'react';

import { MapItemType } from 'common/types/map-item';
import { Point } from 'components/UI/Map/Point';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

import { SEVERITY_CONFIG } from '../DTP.constants';

import { DTPMapDataProps } from './MapData.types';

export function DTPMapData({ id, coords, severityType }: DTPMapDataProps) {
    const { openPopup, closePopup, popupId, popupType } = useContext(MapContext);
    const isOpen = useMemo(
        () => id.toString() === popupId && popupType === MapItemType.DTP,
        [id, popupId, popupType],
    );

    return (
        <Point
            key={MapItemType.DTP + id}
            id={id}
            type={MapItemType.DTP}
            color={SEVERITY_CONFIG[severityType].color}
            position={coords}
            isOpen={isOpen}
            openPopup={openPopup}
            closePopup={closePopup}
        />
    );
}
