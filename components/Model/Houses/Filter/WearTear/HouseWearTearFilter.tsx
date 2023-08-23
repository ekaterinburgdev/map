import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HouseBaseFilter } from 'components/Model/Houses/Filter/Base/HouseBaseFilter';
import { houseBase } from 'common/data/base/houseBase';
import { WEAR_TEAR_FILTERS_DATA } from 'components/Model/Houses/Houses.constants';
import { MinMax } from 'components/UI/RangeHistogram/types';
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
            houseBase.getFilterValues(WEAR_TEAR_FILTERS_DATA, 'WearAndTear').then((values) =>
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
