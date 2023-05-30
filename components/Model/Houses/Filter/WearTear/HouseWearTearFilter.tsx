import React, { useCallback } from 'react';
import { HouseBaseFilter } from 'components/Model/Houses/Filter/Base/HouseBaseFilter';
import { houseBase } from 'common/data/base/houseBase';
import { WEAR_TEAR_FILTERS_DATA } from 'components/Model/Houses/Houses.constants';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { MinMax } from 'components/UI/RangeHistogram/types';
import { houseWearTear } from 'common/data/houseWearTear/houseWearTear';

export function HouseWearTearFilter() {
    const getHouses = useCallback(
        async (range: MinMax) => houseWearTear.getObjectsPolygonsByRange(range.min, range.max),
        [],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase.getFilterValues(WEAR_TEAR_FILTERS_DATA, 'WearAndTear').then((values) =>
                WEAR_TEAR_FILTERS_DATA.map((floorItemData, idx) => ({
                    ...floorItemData,
                    value: values[idx],
                }))),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={0}
            defaultMax={100}
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
            filterType={FilterType.HouseWearTear}
        />
    );
}
