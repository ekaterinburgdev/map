import React, { useCallback } from 'react';

import { MinMax } from 'components/UI/RangeHistogram/types';
import { FilterType } from 'components/UI/Filters/Filters.types';

import { houseBase } from 'common/data/base/houseBase';
import { houseAge } from 'common/data/houseAge/houseAge';

import { AGE_FILTERS_DATA } from '../../Houses.constants';

import { HouseBaseFilter } from '../Base/HouseBaseFilter';

import { CURRENT_YEAR, EKATERINBURG_FOUNDATION_YEAR } from './HouseAgeFilter.constants';

export function HouseAgeFilter() {
    const getHouses = useCallback(
        async (range: MinMax) => houseAge.getObjectsPolygonsByRange(range.min, range.max),
        [],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase.getFilterValues(AGE_FILTERS_DATA, 'Year').then((values) =>
                AGE_FILTERS_DATA.map((ageItemData, idx) => ({
                    ...ageItemData,
                    value: values[idx],
                }))),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={EKATERINBURG_FOUNDATION_YEAR}
            defaultMax={CURRENT_YEAR}
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
            filterType={FilterType.HouseAge}
        />
    );
}
