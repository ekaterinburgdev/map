import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { MinMax } from 'shared/UI/RangeHistogram/types';
import { houseBase } from 'components/Layers/Houses/houseBase';
import { setFilterParams } from 'state/features/dataLayers';

import { FLOOR_FILTERS_DATA, HouseSourceType } from 'components/Layers/Houses/Houses.constants';
import { HouseBaseFilter } from '../Base/HouseBaseFilter';
import { MAX_FLOOR, MIN_FLOOR } from './HouseFloorFilter.constants';

export function HouseFloorFilter() {
    const dispatch = useDispatch();

    const getHouses = useCallback(
        async (range: MinMax) => {
            dispatch(setFilterParams({ activeFilterParams: range }));
        },
        [dispatch],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase.getFilterValues(FLOOR_FILTERS_DATA, HouseSourceType.Floors).then((values) =>
                FLOOR_FILTERS_DATA.map((floorItemData, idx) => ({
                    ...floorItemData,
                    value: values[idx],
                })),
            ),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={MIN_FLOOR}
            defaultMax={MAX_FLOOR}
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
        />
    );
}
