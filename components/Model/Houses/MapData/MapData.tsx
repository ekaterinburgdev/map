import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { State } from 'common/types/state';
import { HouseClient } from 'common/data/base/houseBase';
import { MapItemType } from 'common/types/map-item';
import { MARKER_COLOR } from 'common/constants/colors';

import { Shape } from 'components/UI/Map/Shape/Shape';
import { MapContext } from 'components/UI/Map/providers/MapProvider';
import { FilterType } from 'components/UI/Filters/Filters.types';

import { AGE_FILTERS_DATA, FLOOR_FILTERS_DATA, WEAR_TEAR_FILTERS_DATA } from '../Houses.constants';

const DEFAULT_COLOR = MARKER_COLOR[MapItemType.Houses];

export function HousesMapData({ borders, id, year, floors, wearAndTear }: HouseClient) {
    const { openPopup } = useContext(MapContext);
    const activeFilter = useSelector((state: State) => state.dataLayer.activeFilter);

    const houseColor = useMemo(() => {
        if (activeFilter === FilterType.HouseAge) {
            return (
                AGE_FILTERS_DATA.find(({ from, to }) => from <= year && year <= to)?.color
                || DEFAULT_COLOR
            );
        }

        if (activeFilter === FilterType.HouseFloor) {
            return (
                FLOOR_FILTERS_DATA.find(({ from, to }) => from <= floors && floors <= to)?.color
                || DEFAULT_COLOR
            );
        }

        if (activeFilter === FilterType.HouseWearTear) {
            return (
                WEAR_TEAR_FILTERS_DATA.find(
                    ({ from, to }) => from <= wearAndTear && wearAndTear <= to,
                )?.color || DEFAULT_COLOR
            );
        }

        return DEFAULT_COLOR;
    }, [year, floors, wearAndTear, activeFilter]);

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
