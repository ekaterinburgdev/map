import React, { useContext, useMemo } from 'react';

import { HouseClient } from 'common/data/base/houseBase';
import { MapItemType } from 'common/types/map-item';
import { MARKER_COLOR } from 'common/constants/colors';
import { Shape } from 'components/UI/Map/Shape/Shape';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

import { AGE_FILTERS_DATA } from '../Houses.constants';

const DEFAULT_COLOR = MARKER_COLOR[MapItemType.Houses];

export function HousesMapData({ borders, id, year }: HouseClient) {
    const { openPopup } = useContext(MapContext);

    const houseColor = useMemo(
        () =>
            AGE_FILTERS_DATA.find(({ from, to }) => from <= year && year <= to)?.color
            || DEFAULT_COLOR,
        [year],
    );

    return (
        <Shape
            openModal={openPopup}
            id={id}
            type={MapItemType.Houses}
            positions={borders}
            color={houseColor}
        />
    );
}
