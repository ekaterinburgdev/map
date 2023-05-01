import React, { useCallback } from 'react';

import { MinMax } from 'components/UI/RangeHistogram/types';
import { FilterType } from 'components/UI/Filters/Filters.types';

import { houseBase } from 'common/data/base/houseBase';
import { houseFloor } from 'common/data/houseFloor/houseFloor';

import { FLOOR_FILTERS_DATA } from '../../Houses.constants';

import { HouseBaseFilter } from '../Base/HouseBaseFilter';

import { MAX_FLOOR, MIN_FLOOR } from './HouseFloorFilter.constants';

export function HouseFloorFilter() {
    const getHouses = useCallback(
        async (range: MinMax) => houseFloor.getObjectsPolygonsByRange(range.min, range.max),
        [],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase.getFilterValues(FLOOR_FILTERS_DATA, 'Floors').then((values) =>
                FLOOR_FILTERS_DATA.map((d, idx) => ({
                    ...d,
                    value: values[idx],
                }))),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={MIN_FLOOR}
            defaultMax={MAX_FLOOR}
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
            filterType={FilterType.HouseFloor}
        />
    );
}
