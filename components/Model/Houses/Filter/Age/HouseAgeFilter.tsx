import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { MinMax } from 'components/UI/RangeHistogram/types';

import { houseBase } from 'common/data/base/houseBase';

import { setFilterParams } from 'state/features/dataLayers';

import { AGE_FILTERS_DATA } from '../../Houses.constants';

import { HouseBaseFilter } from '../Base/HouseBaseFilter';

import { CURRENT_YEAR, EKATERINBURG_FOUNDATION_YEAR } from './HouseAgeFilter.constants';

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
            houseBase.getFilterValues(AGE_FILTERS_DATA, 'Year').then((values) =>
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
