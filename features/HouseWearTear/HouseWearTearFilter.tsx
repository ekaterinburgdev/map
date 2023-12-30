import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HouseBaseFilter } from 'features/Buildings/Filter/HouseBaseFilter';
import { houseBase } from 'features/Buildings/houseBase';
import { HouseSourceType, WEAR_TEAR_FILTERS_DATA } from 'features/Buildings/Houses.constants';
import { MinMax } from 'shared/UI/RangeHistogram/types';
import { setFilterParams } from 'state/features/dataLayers';

export function HouseWearTearFilter() {
    const dispatch = useDispatch();

    const getHouses = useCallback(
        async (range: MinMax) => {
            dispatch(setFilterParams({ activeFilterParams: range }));
        },
        [dispatch],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase
                .getFilterValues(WEAR_TEAR_FILTERS_DATA, HouseSourceType.WearAndTear)
                .then((values) =>
                    WEAR_TEAR_FILTERS_DATA.map((floorItemData, idx) => ({
                        ...floorItemData,
                        value: values[idx],
                    })),
                ),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={0}
            defaultMax={100}
            units="%"
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
        />
    );
}
