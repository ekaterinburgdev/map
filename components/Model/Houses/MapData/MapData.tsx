import React, { useContext } from 'react';

import { MapItemType } from 'common/types/map-item';
import { MARKER_COLOR } from 'common/constants/colors';
import { Shape } from 'components/UI/Map/Shape/Shape';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

import { HousesMapDataProps } from './MapData.types';

export function HousesMapData({ borders, id }: HousesMapDataProps) {
    const { openPopup } = useContext(MapContext);

    return (
        <Shape
            openModal={openPopup}
            id={id}
            type={MapItemType.Houses}
            positions={borders}
            color={MARKER_COLOR[MapItemType.Houses]}
        />
    );
}
