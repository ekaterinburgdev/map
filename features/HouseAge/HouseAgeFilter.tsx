import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MinMax } from 'shared/UI/RangeHistogram/types';
import { houseBase } from 'features/Buildings/houseBase';
import { AGE_FILTERS_DATA, HouseSourceType } from 'features/Buildings/Houses.constants';
import { setFilterParams } from 'state/features/dataLayers';
import { HouseBaseFilter } from '../Buildings/Filter/HouseBaseFilter';

export const EKATERINBURG_FOUNDATION_YEAR = 1723;

export const CURRENT_YEAR = new Date().getFullYear();

export function HouseAgeFilter() {
    const dispatch = useDispatch();

    const getHouses = useCallback(
        async (range: MinMax) => {
            dispatch(setFilterParams({ activeFilterParams: range }));
        },
        [dispatch],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase.getFilterValues(AGE_FILTERS_DATA, HouseSourceType.Year).then((values) =>
                AGE_FILTERS_DATA.map((ageItemData, idx) => ({
                    ...ageItemData,
                    value: values[idx],
                })),
            ),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={EKATERINBURG_FOUNDATION_YEAR}
            defaultMax={CURRENT_YEAR}
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
        />
    );
}
